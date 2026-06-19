var express = require('express');
var router = express.Router();

const User = require('../models/usersJSON');

// Route inscription utilisateur
router.post('/register', async function(req, res) {
  try {
    const newUser = new User({
      surname: req.body.surname,
      firstname: req.body.firstname,
      profile: req.body.profile,
      email:req.body.email,
      password: req.body.password,
      phone_number: req.body.phone_number
    });

    await newUser.save();

    res.status(201).json({
      message:"Utilisateur créé",
      user: newUser
    });

  } catch(error){
    console.error(error);
    res.status(500).json({
      message: "Erreur",
      error: error.message
    });
  }
  
})

// Route connexion utilisateur
router.post('/login', async function(req, res) {
  try {
    const user = await User.findOne({email:req.body.email});
    if (!user){
      return res.status(401).json({message:"Email ou mot de passe incorrect"})
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch){
      return res.status(401).json({message:"Email ou mot de passe incorrect"})
    }
res.status(200).json({message:"Connexion réussie", user});
  } catch(error){
    res.status(500).json({message:"Erreur", error: error.message});
  }
});



module.exports = router;
