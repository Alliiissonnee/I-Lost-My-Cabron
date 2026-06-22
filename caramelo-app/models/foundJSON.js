var express = require('express');
var router = express.Router();
const mongoose = require('mongoose'); 


/*Declaration de chaque element dans la base de donnes par type*/
const FoundSchema = new mongoose.Schema({
  Id_Found: Number,
  Pet_Id: Number,
  Recover: String,
  Vet: String,
  Chip_number: String,
  GPS_coordinates: String,
  Date_time: String,
}, {
  collection: 'Found'
});

const Found = mongoose.model('found', FoundSchema)


router.get('/found', async (req, res) => {
  try {
    const animal = await Found.find();
    
    res.json(animal);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});


module.exports = router;