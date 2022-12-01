const express = require('express');
const animals = require('../models/animals');

const router = express.Router();


// eslint-disable-next-line no-unused-vars
router.get('/', (req, res) => res.json({ animal: animals.getRandomAnimal()})
)

module.exports = router;