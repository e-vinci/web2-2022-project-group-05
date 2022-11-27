const express = require('express');
const userData = require('../models/users');

const router = express.Router();

/* GET users listing. */ 
router.get('/', (req, res) => {
  const usersPotentiallyOrdered = userData.getAllUsers(req?.query?.order);
  return res.json(usersPotentiallyOrdered);
});

/* GET one user (either by its id or its username) */
router.get('/user', (req, res) => {
  let user;
  if (req?.query?.id) user = userData.getUserById(req.query.id);
  if (req?.query?.username) user = userData.readOneUserFromUsername(req.query.username);
  if (!user) return res.sendStatus(404);
  return res.json(user);
}); 

/* GET user balance */
router.patch('/balance/:id', (req, res) => {
  const balance = req?.body?.balance;
  const operator = req?.body?.operator;
  if (!balance || !operator || parseInt(balance,10) === 0 || (operator !== '+' && operator !== '-')) return res.sendStatus(404);
  const updatedBalance = userData.updateBalance(operator, balance, req.params.id);
  
  if (!updatedBalance) return res.json();
  return res.json(updatedBalance);
}); 

/* GET user highest score */
router.patch('/highscore/:id', (req, res) => {
  const highscore = req?.body?.highscore;
  if (!highscore || parseInt(highscore, 10) < 0) return res.sendStatus(404);
  const updatedHighscore = userData.updateHighscore(highscore, req.params.id);
  
  if (!updatedHighscore) return res.json(); // empty json
  return res.json(updatedHighscore);
}); 
module.exports = router;