const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/usersJSON');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Route pour la connexion avec google
router.post('/google', async (req, res) => {
    try {
        const { token } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { sub: googleID, email, name, picture } = payload;

        let user = await User.findOne({ googleID: googleId });
        if (!user) {
            user = await User.create({
                googleID: googleId,
                email,
                firstname: given_name || name,
                surname: family_name || '',
                profile: 'utilisateur'
            });
        }

        const appToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ token: appToken, user });
    } catch (err) {
        console.error('erreur détaillée:', err.message);
        res.status(401).json({ error: 'Authentification Google invalide' });
    }
});

module.exports = router;