// eslint-disable-next-line import/no-import-module-exports
const animalArray = require('../data/animalArray')

function getRandomAnimal(){
    const a = animalArray[Math.floor(Math.random()*animalArray.length)];
    return a;
}

module.exports = {
 getRandomAnimal
};