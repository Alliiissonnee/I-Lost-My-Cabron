const jwt = require('jsonwebtoken');


//Vérifier le token authentique et valide
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
// verifie que le token commence par 'Bearer', erreur si ça manque
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: "Token manquant" });
    }
    // recupère le token sans espace après le Bearer
    const token = authHeader.split(' ')[1];

    try {
        // verifie le token par rapport a JWT_secret (.env)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide ou expiré" });
    }
}


module.exports = authMiddleware;