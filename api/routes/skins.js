const express = require('express');
const skinsData = require('../models/skins');

const router = express.Router();

/* GET skins listing. */ 
router.get('/', (req, res) => {
    const skinsPotentiallyOrdered = skinsData.getAllSkins(req?.query?.order);
    return res.json(skinsPotentiallyOrdered);
  });

/* GET one skin by its id */
router.get('/skinId', (req, res) => {
    let skin;
    if (req?.query?.id) skin = skinsData.readOneSkinFromSkinId(req.query.id);
    if (!skin) return res.sendStatus(404);
    return res.json(skin);
  }); 

  /* GET one skin by its name */
router.get('/skinName', (req, res) => {
  let skin;
  if (req?.query?.name) skin = skinsData.readOneSkinFromSkinName(req.query.name);
  if (!skin) return res.sendStatus(404);
  return res.json(skin);
}); 

  module.exports = router;