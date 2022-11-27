const express = require('express');
const userData = require('../models/users');

const router = express.Router();

/* GET users listing. */ 
router.get('/', (req, res) => {
  const usersPotentiallyOrdered = userData.getAllUsers(req?.query?.order);
  return res.json(usersPotentiallyOrdered);
});

/* GET one user by its id */
router.get('/:id', (req, res) => {
  const user = userData.getUserById(req.params.id);
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