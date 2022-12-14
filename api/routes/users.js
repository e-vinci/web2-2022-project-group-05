const express = require('express');
const userData = require('../models/users');

const router = express.Router();

/* GET users listing. */ 
router.get('/', (req, res) => {
  const usersPotentiallyOrdered = userData.getAllUsers(req?.query?.order);
  return res.json(usersPotentiallyOrdered);
});

/* GET one user by its username */
router.get('/user', (req, res) => {
  let user;
  if (req?.query?.username) user = userData.readOneUserFromUsername(req.query.username);
  if (!user) return res.sendStatus(404);
  return res.json(user);
}); 

/* GET user balance */
router.patch('/balance', (req, res) => {
  let user;
  if (req?.query?.username) user = userData.readOneUserFromUsername(req.query.username);
  const balance = req?.body?.balance;
  const operator = req?.body?.operator;
  if (!balance || !operator || parseInt(balance,10) === 0 || (operator !== '+' && operator !== '-')) return res.sendStatus(404);
  const updatedBalance = userData.updateBalance(operator, balance, user.username);
  
  if (!updatedBalance) return res.json();
  return res.json(updatedBalance);
}); 

/* GET user highest score */
router.patch('/highscore', (req, res) => {
  let user;
  if (req?.query?.username) user = userData.readOneUserFromUsername(req.query.username);
  const highscore = req?.body?.highscore;
  if (!highscore || parseInt(highscore, 10) < 0) return res.sendStatus(404);
  const updatedHighscore = userData.updateHighscore(highscore, user.username);
  
  if (!updatedHighscore) return res.json(); // empty json
  return res.json(updatedHighscore);
}); 

/* PATCH add one skin to the user's skins */
router.patch('/skins', (req, res) => {
  let user;
  if (req?.query?.username) user = userData.readOneUserFromUsername(req.query.username);
  const skinId = req?.body?.id;
  if (!skinId) return res.sendStatus(404);
  
  const newLenght = userData.addSkinToUser(skinId, user.username);
  if (!newLenght) return res.json(); // empty json
  return res.json(newLenght);
}); 

/* PATCH replace the user's current skin */
router.patch('/currentSkin', (req,res) => {
  let user;
  if (req?.query?.username) user = userData.readOneUserFromUsername(req.query.username);
  const newSkin = req?.body?.id;
  if (!newSkin) return res.sendStatus(404);

  const newCurrentSkin = userData.changeCurrentSkin(parseInt(newSkin,10),user);
  return res.json(newCurrentSkin);
});

module.exports = router;