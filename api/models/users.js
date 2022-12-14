// const escape = require('escape-html');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jwtSecret = 'myRealNameIsOTTO';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

const jsonDbPath = path.join(__dirname, '/../data/users.json');

const defaultUsers = [
  {
    username: 'user',
    password: bcrypt.hashSync('user', saltRounds),
    balance: 1000,
    highscore: 2000,
    skins: [1,2],
    currentSkins: 1,
  },
];

async function login(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (!userFound) return undefined;

  const passwordMatch = await bcrypt.compare(password, userFound.password);
  if (!passwordMatch) return undefined;

  const token = jwt.sign(
    { username },
    jwtSecret,
    { expiresIn: lifetimeJwt },
  );

  const authenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

async function register(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (userFound) return undefined;

  await createOneUser(username, password);


  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

function readOneUserFromUsername(username) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.username === username);
  if (indexOfUserFound < 0) return undefined;

  return users[indexOfUserFound];
}

async function createOneUser(username, password) {
  const users = parse(jsonDbPath, defaultUsers);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createdUser = {
    username,
    password: hashedPassword,
    balance: 0,
    highscore: 0,
    skins: [1],
    currentSkin: 1,
  };

  users.push(createdUser);

  serialize(jsonDbPath, users);

  return createdUser;
}

function getAllUsers(orderBy){
  const orderByScore = orderBy?.includes('score') ? orderBy : undefined;
  let orderedLeaderboard; 
  const users = parse(jsonDbPath,defaultUsers);

  if (orderByScore) orderedLeaderboard = [...users].sort((a, b) => b.highscore-a.highscore);

  const usersPotentiallyOrdered = orderedLeaderboard ?? users;
  return usersPotentiallyOrdered;
}

function updateBalance(operator, balance, username){
  const users = parse(jsonDbPath, defaultUsers);
  const index = users.findIndex((user) => user.username === username);
  if (index < 0) return undefined;
  
  let updatedUser;
  if (operator === '+') updatedUser = {...users[index], balance: users[index].balance + parseInt(balance,10)};
  else if (users[index].balance >= balance) updatedUser = {...users[index], balance: users[index].balance - parseInt(balance,10)}

  if(!updatedUser) return undefined; 

  users[index] = updatedUser;
  serialize(jsonDbPath, users);

  return updatedUser;
}

function updateHighscore(highscore, username){
  const users = parse(jsonDbPath, defaultUsers);
  const index = users.findIndex((user) => user.username === username);
  if (index < 0) return undefined;
  
  
  if (users[index].highscore >= parseInt(highscore,10)) return undefined; 
  
  const updatedUser = {...users[index], highscore: parseInt(highscore,10)};
  users[index] = updatedUser;
  serialize(jsonDbPath, users);
  return updatedUser;
}

function addSkinToUser(skinId, username){
  const users = parse(jsonDbPath, defaultUsers);
  const index = users.findIndex((user) => user.username === username);
  if (index < 0) return undefined;
  
  if (users[index].skins.includes(skinId)) return undefined; 

  const newLenght = users[index].skins.push(skinId);

  serialize(jsonDbPath, users);
  return newLenght;
}

function changeCurrentSkin(skinId, username){
  const users = parse(jsonDbPath, defaultUsers);
  const index = users.findIndex((user) => user.username === username);
  if (index < 0) return undefined;
  
  const newSkin = parseInt(skinId,10);
  if (parseInt(users[index].currentSkin,10) === newSkin || !users[index].skins.findIndex((skin) => skin === newSkin)) return undefined; 
  
  users[index].currentSkin = newSkin;

  serialize(jsonDbPath, users);
  return users[index].currentSkin;
}

module.exports = {
  login,
  register,
  readOneUserFromUsername,
  getAllUsers,
  updateBalance,
  updateHighscore,
  addSkinToUser,
  changeCurrentSkin
};

