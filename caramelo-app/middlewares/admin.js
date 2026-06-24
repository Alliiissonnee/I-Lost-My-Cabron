function admin(req, res, next) {
  if (req.user.profile !== 'admin') {
    return res.status(403).json({ message: "Accès réservé aux administrateurs" });
  }
  next();
}

module.exports = admin;


// 401 on ne sait pas qui c'est
// 403 on sait qui c'est mais l'acces n'est pas autorisé