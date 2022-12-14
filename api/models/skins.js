const path = require('node:path');
const { parse } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/skins.json');

const defaultSkins = [
    {
      id: 1,
      name: 'seal',
      price: 0
    },
    {
        id: 2,
        name: 'panda',
        price: 100
    },
    {
        id: 3,
        name: 'tiger',
        price: 200
    },
  ];


  function getAllSkins(orderBy){
    const orderByPrice = orderBy?.includes('price') ? orderBy : undefined;
    let orderedSkins; 
    const skins = parse(jsonDbPath,defaultSkins);
  
    if (orderByPrice) orderedSkins = [...skins].sort((a, b) => b.highscore-a.highscore);
  
    const skinsPotentiallyOrdered = orderedSkins ?? skins;
    return skinsPotentiallyOrdered;
  }

  function readOneSkinFromSkinId(id) {
    const parseId = parseInt(id,10);
    const skins = parse(jsonDbPath, defaultSkins);
    const indexOfSkinFound = skins.findIndex((skin) => skin.id === parseId);
    if (indexOfSkinFound < 0) return undefined;
  
    return skins[indexOfSkinFound];
  }
  

  module.exports = {
   getAllSkins,
   readOneSkinFromSkinId,
  };