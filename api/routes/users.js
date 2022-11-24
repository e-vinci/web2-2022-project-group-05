const express = require('express');
const userData = require('../models/users');

const router = express.Router();

/* GET users listing. */ 
router.get('/', (req, res, next) => {
  return res.json(userData.getAllUsers());
}); 

/* GET one user by its id */
router.get('/:id', (req, res, next) => {
  const user = userData.getUserById(req.params.id);
  if (!user) return res.sendStatus(404);
  return res.json(user);
}); 

/* GET user balance */
router.patch('/balance/:id', (req, res, next) => {
  const balance = req?.body?.balance;
  const operator = req?.body?.operator;
  if (!balance || !operator || parseInt(balance,10) === 0 || (operator !== '+' && operator !== '-')) return res.sendStatus(404);
  const updatedBalance = userData.updateBalance(operator, balance, req.params.id);
  console.log(updatedBalance);
  if (!updatedBalance) return res.sendStatus(404);
  return res.json(updatedBalance);
}); 

/* GET user highest score */
router.patch('/highscore/:id', (req, res, next) => {
  const updatedBalance = userData.updateProperty('highscore', 200);
  if (!updatedBalance) return res.sendStatus(404);

  return res.json(updatedBalance);
}); 
module.exports = router;