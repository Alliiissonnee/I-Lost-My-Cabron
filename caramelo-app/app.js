/**Installation do (dotenv) le lien est securise avec gitIGNORE dans le fichier (.env)  */
require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

/* Ajoute de la  bibliothèque Mongoose(au lieu de Monk) */
const mongoose = require('mongoose'); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var User = require('./models/usersJSON');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


/*Connection du Back-end avec la base de donnes(MongoDB) (verifier le fichier(.env)*/
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB compass connecté'))
  .catch(err => console.error('Erreur connexion:', err));

module.exports = app;
