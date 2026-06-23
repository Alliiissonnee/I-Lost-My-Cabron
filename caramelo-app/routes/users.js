var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const User = require('../models/usersJSON');
const authMiddleware = require('../middlewares/auth');
const admin = require('../middlewares/admin');

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

// Route pour lister tous les utilisateurs (admins uniquement)
router.get('/', authMiddleware, admin, async function (req, res) {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ users });
  } catch (error) {
res.status(500).json({message:"Erreur", error:error.message});
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



module.exports = router;
