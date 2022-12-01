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
    id: 1,
    username: 'user1',
    password: bcrypt.hashSync('user1', saltRounds),
    balance: 1000,
    highscore: 2000,
  },
];

async function login(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (!userFound) return undefined;

  const passwordMatch = await bcrypt.compare(password, userFound.password);
  if (!passwordMatch) return undefined;

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
    id: getNextId(),
    username,
    password: hashedPassword,
    balance: 0,
    highscore: 0
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

function getUserById(id){
  const idUser = parseInt(id, 10);
  const users = parse(jsonDbPath,defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.id === idUser);
  return (indexOfUserFound < 0 ? undefined : defaultUsers[indexOfUserFound]);
}

function getNextId() {
  const users = parse(jsonDbPath, defaultUsers);
  const lastItemIndex = users?.length !== 0 ? users.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = users[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

function updateBalance(operator, balance, userId){
  const idUser = parseInt(userId, 10);
  const users = parse(jsonDbPath, defaultUsers);
  const index = users.findIndex((user) => user.id === idUser);
  if (index < 0) return undefined;
  
  let updatedUser;
  if (operator === '+') updatedUser = {...users[index], balance: users[index].balance + parseInt(balance,10)};
  else if (users[index].balance >= balance) updatedUser = {...users[index], balance: users[index].balance - parseInt(balance,10)}

  if(!updatedUser) return undefined; 

  users[index] = updatedUser;
  serialize(jsonDbPath, users);

  return updatedUser;
}

function updateHighscore(highscore, userId){
  const idUser = parseInt(userId, 10);
  const users = parse(jsonDbPath, defaultUsers);
  const index = users.findIndex((user) => user.id === idUser);
  if (index < 0) return undefined;
  
  
  if (users[index].highscore >= parseInt(highscore,10)) return undefined; 
  
  const updatedUser = {...users[index], highscore: parseInt(highscore,10)};
  users[index] = updatedUser;
  serialize(jsonDbPath, users);

  return updatedUser;
}


module.exports = {
  login,
  register,
  readOneUserFromUsername,
  getAllUsers,
  getUserById,
  updateBalance,
  updateHighscore
};

