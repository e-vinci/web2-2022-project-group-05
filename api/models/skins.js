const path = require('node:path');
const { parse } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/skins.json');

const defaultSkins = [
  {  
    name: 'seal',
    price: 0,
  },
  {
    name: 'panda',
    price: 100,
  },
  {
    name: 'tiger',
    price: 200,
  },
];

function getAllSkins(orderBy) {
    const orderByPrice = orderBy?.includes('price') ? orderBy : undefined;
  let orderedSkins;
  const skins = parse(jsonDbPath, defaultSkins);

  if (orderByPrice) orderedSkins = [...skins].sort((a, b) => b.price - a.price);

  const skinsPotentiallyOrdered = orderedSkins ?? skins;
  return skinsPotentiallyOrdered;
}



function readOneSkinFromSkinName(name) {
  const skins = parse(jsonDbPath, defaultSkins);
  const indexOfSkinFound = skins.findIndex((skin) => skin.name === name);
  if (indexOfSkinFound < 0) return undefined;

  return skins[indexOfSkinFound];
}

module.exports = {
  getAllSkins,
  readOneSkinFromSkinName,
};
