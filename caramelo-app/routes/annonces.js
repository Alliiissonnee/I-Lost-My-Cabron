var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, async function(req, res) {
  res.status(201).json({ message: "Annonce créée par l'utilisateur " + req.user.id });
});

module.exports = router;