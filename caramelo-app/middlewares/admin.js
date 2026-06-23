function admin(req, res, next) {
  if (req.user.profile !== 'admin') {
    return res.status(403).json({ message: "Accès réservé aux administrateurs" });
  }
  next();
}

module.exports = admin;