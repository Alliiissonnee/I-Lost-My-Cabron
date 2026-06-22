var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

/* Ajoute de la  bibliothèque Mongoose(au lieu de Monk) */
const mongoose = require('mongoose'); 
/**Installation do (dotenv) le lien est securise avec gitIGNORE dans le fichier (.env)  */
require('dotenv').config();



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
/*L'ajoute de chaque variable est important pour relier avec le fichier en question*/
var petJSON = require('./models/petJSON');
var usersJSON = require('./models/usersJSON');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



/*Connection du Back-end avec la base de donnes(MongoDB) (verifier le fichier(.env)*/
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas connecté'))
  .catch(err => console.error('Erreur connexion:', err));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/*Relie pour l'utilisation du fichier*/
app.use('/petJSON', petJSON);


/*Relie pour l'utilisation du fichier
app.use('/usersJSON', usersJSON);
*/
module.exports = app;
