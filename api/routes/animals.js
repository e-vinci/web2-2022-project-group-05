const express = require('express');
const animals = require('../models/animals');

const router = express.Router();


router.get('/', (req,res) => res.json({ animal: animals.getRandomAnimal()})
)

module.exports = router;