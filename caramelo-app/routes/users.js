var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const User = require('../models/usersJSON');
const authMiddleware = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const crypto = require('crypto');
const sendResetEmail = require('../automatisation/email');
const { profile } = require('console');

// Route inscription utilisateur
router.post('/register', async function (req, res) {
  try {
    const newUser = new User({
      profile: 'utilisateur',
      surname: req.body.surname,
      firstname: req.body.firstname,
      email: req.body.email,
      password: req.body.password,
      phone_number: req.body.phone_number
    });

    await newUser.save();

    res.status(201).json({
      message: "Utilisateur créé",
      user: newUser
    });

  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).json({ message: "Cet email est déja utilisé" });
    }
    res.status(500).json({ message: 'Erreur', error: error.message });
  }
})

// Route connexion utilisateur
router.post('/login', async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" })
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" })
    }

    // Mise à jour de la dernière connection de l'utilisateur
    user.lastConnection = new Date();
    await user.save();

    // Création du token JWT
    const token = jwt.sign(
      // Info qu'on veut encoder
      { id: user._id, profile: user.profile },
      process.env.JWT_SECRET,
      // Le token expire après 7 jours
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: "Connexion réussie",
      token: token,
      user: {
        id: user._id,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email,
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
});

// Route pour le comtpe invité (anonyme)

function generateCode() {
  return Math.floor(10000 + Math.random() * 90000).toString();
  // génération du code à 5 chiffres qui sera envoyé à la création d'un compte invité
}
router.post('/guest', async function (req, res) {
  try {
    let code;
    let codeExists = true;
    while (codeExists) {
      code = generateCode();
      codeExists = await User.findOne({ trackingCode: code });
    }
    const guest = new User({
      profile: 'anonyme',
      trackingCode: code
    });
    await guest.save();

    const token = jwt.sign(
      { id: guest._id, profile: guest.profile },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.status(201).json({
      message: "Compte invité créé",
      token: token,
      user: {
        id: guest._id,
        profile: guest.profile,
        trackingCode: code
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message })
  }
});

// Route pour se connecter avec le code compte invité
router.post('/guest-login', async function (req, res) {
  try {
    const user = await User.findOne({
      trackingCode: req.body.code,
      profile: 'anonyme'
    });
    if (!user) {
      return res.status(404).json({ message: "Code invalide" });
    }
    const token = jwt.sign(
      { id: user._id, profile: user.profile },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.status(200).json({
      message: "Connexion invité réussie",
      token: token,
      user: {
        id: user._id,
        profile: user.profile,
        trackingCode: user.trackkingCode
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
});

// Route pour supprimer son propre compte (pour chaque utilisateurs)
router.delete('/me', authMiddleware, async function (req, res) {
  try {
    const deletUser = await User.findByIdAndDelete(req.user.id);
    if (!deletUser) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    res.status(200).json({ message: "Votre compte a été supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
});

// Synchronisation des données utilisateurs avec la base de donnée
router.get('/me', authMiddleware, async function (req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password -resetPasswordToken -resetPasswordExpires');
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    } res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
});

// Route pour lister tous les utilisateurs (admins uniquement) par verification du token authMiddleware puis si c'est un admin
router.get('/', authMiddleware, admin, async function (req, res) {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
});

// Route pour supprimer un utilisateur par son ID (réservé aux admins)
router.delete('/:id', authMiddleware, admin, async function (req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
});

// Route demande de réinitialisation de mot de passe
router.post('/forgot-password', async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({ message: "Si cet email existe, un lien a été envoyé" });
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    await sendResetEmail(user.email, resetToken);
    res.status(200).json({ message: "Si cet email existe, un lien a été envoyé." });
  } catch (error) {
    console.error("ERREUR FORGOT PASSWORD :", error);
    return res.status(500).json({ message: "Erreur", error: error.message });
  }
});

// Route réinitialisation effective avec le token reçu par email
router.post('/reset-password/:token', async function (req, res) {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).json({ message: "Lien invalide ou expiré" });
    }
    user.password = req.body.password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
});


module.exports = router;
