var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');


/*Declaration de chaque element dans la base de donnes par type*/
const PetsSchema = new mongoose.Schema({
    Id_Pets: Number,
    Name: String,
    Ricover: String,
    Vet: String,
    Status: String,
    Photo: String,
    Chip_number: String,
    Age: Number,
    Vaccination: String,
    Species: String,
    Breed: String,
    GPS_coordinates: String,
    Description: String,
    Date_time: String,
    Finder: String,

}, {
    collection: 'Pets',
    versionKey: false
});
const Pets = mongoose.model('Pets', PetsSchema)



/*CRUD pour ajoute une nouvelle pet (CREATE) */
router.post('/pets', async (req, res) => {
    try {
        const pet = new Pets(req.body);
        const data = await pet.save();
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

/* CRUD c'est pour lire en liste les archives provenants de la base de donnes (READ) */
router.get('/pets', async (req, res) => {
    try {
        const data = await Pets.find();

        if (!data.length) {
            return res.status(404).json({
                message: "Aucune pet trouve avec notre recherche"
            });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

/* CRUD c'est pour lire une par une les archives provenants de la base de donnes (READ) */
router.get('/pets/:id', async (req, res) => {
    try {
        const data = await Pets.findById(req.params.id);
        if (!data) {
            return res.status(404).json({
                message: "Aucune pet trouve avec notre recherche"
            });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

/* CRUD actualiser pet (UPDATE)*/
router.put('/pets/:id', async (req, res) => {
    try {
        const data = await Pets.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true })
        if (!data) {
            return res.status(404).json({
                message: "Aucune pet trouve avec notre recherche"
            });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

/*CRUD delete une pet(DELETE) */
router.delete('/pets/:id', async (req, res) => {
    try {
        const data = await Pets.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "Pet non trouvé"
            });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

/* Pour faire la triage de animal pedu */
router.get('./pets/trouve', async (req, res) => {
    try {
        const data = await Pets.find({ status: 'trouve' });
        if (!data) {
            return res.status(404).json({
                message: "Pet non trouvé"
            })
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

module.exports = router;