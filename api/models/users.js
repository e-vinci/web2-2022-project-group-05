const jwt = require('jsonwebtoken');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jwtSecret = 'myRealNameIsOTTO';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const jsonDbPath = path.join(__dirname, '/../data/users.json');

const defaultUsers = [
  {
    id: 1,
    username: 'user1',
    password: 'user1',
    balance: 1100,
    highscore: 3, 
  },
];

function login(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (!userFound) return undefined;
  if (userFound.password !== password) return undefined;

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

function register(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (userFound) return undefined;

  createOneUser(username, password);

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

function createOneUser(username, password) {
  const users = parse(jsonDbPath, defaultUsers);

  const createdUser = {
    id: getNextId(),
    username,
    password,
  };

  users.push(createdUser);

  serialize(jsonDbPath, users);

  return createdUser;
}

function getAllUsers(){
  return parse(jsonDbPath,defaultUsers);
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

