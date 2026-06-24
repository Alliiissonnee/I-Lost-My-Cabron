// Pour vérifier les token

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: "Token manquant" });
    }
    const token = authHeader.split(' ')[1];

    try {
        // compare le token à JWT_secret (.env)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide ou expiré" });
    }
}

module.exports = authMiddleware;