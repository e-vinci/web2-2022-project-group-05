const express = require('express');
const path = require('node:path');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/pizzas.json');

const MENU = [
  {
    id: 1,
    title: '4 fromages',
    content: 'Gruyère, Sérac, Appenzel, Gorgonzola, Tomates',
  },
  {
    id: 2,
    title: 'Vegan',
    content: 'Tomates, Courgettes, Oignons, Aubergines, Poivrons',
  },
  {
    id: 3,
    title: 'Vegetarian',
    content: 'Mozarella, Tomates, Oignons, Poivrons, Champignons, Olives',
  },
  {
    id: 4,
    title: 'Alpage',
    content: 'Gruyère, Mozarella, Lardons, Tomates',
  },
  {
    id: 5,
    title: 'Diable',
    content: 'Tomates, Mozarella, Chorizo piquant, Jalapenos',
  },
];

/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res) => {
  const orderByTitle = req?.query?.order?.includes('title')
    ? req.query.order
    : undefined;
  let orderedMenu;
  const pizzas = parse(jsonDbPath, MENU);
  if (orderByTitle) orderedMenu = [...pizzas].sort((a, b) => a.title.localeCompare(b.title));
  if (orderByTitle === '-title') orderedMenu = orderedMenu.reverse();

  return res.json(orderedMenu ?? pizzas);
});

// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
  const pizzas = parse(jsonDbPath, MENU);
  const idInRequest = parseInt(req.params.id, 10);
  const indexOfPizzaFound = pizzas.findIndex((pizza) => pizza.id === idInRequest);

  if (indexOfPizzaFound < 0) return res.sendStatus(404);

  return res.json(pizzas[indexOfPizzaFound]);
});

// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;

  if (!title || !content) return res.sendStatus(400); // error code '400 Bad request'

  const pizzas = parse(jsonDbPath, MENU);
  const lastItemIndex = pizzas?.length !== 0 ? pizzas.length - 1 : undefined;
  const lastId = lastItemIndex ? pizzas[lastItemIndex]?.id : undefined;
  const nextId = lastItemIndex !== 0 ? lastId + 1 : 1;

  const newPizza = {
    id: nextId,
    title,
    content,
  };

  pizzas.push(newPizza);

  serialize(jsonDbPath, pizzas);

  return res.json(newPizza);
});

// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
  const pizzas = parse(jsonDbPath, MENU);
  const idInRequest = parseInt(req.params.id, 10);
  const foundIndex = pizzas.findIndex((pizza) => pizza.id === idInRequest);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromMenu = pizzas.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];

  serialize(jsonDbPath, pizzas);

  return res.json(itemRemoved);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  const title = req?.body?.title;
  const content = req?.body?.content;

  if ((!title && !content) || title?.length === 0 || content?.length === 0) {
    return res.sendStatus(400);
  }

  const pizzas = parse(jsonDbPath, MENU);
  const idInRequest = parseInt(req.params.id, 10);
  const foundIndex = pizzas.findIndex((pizza) => pizza.id === idInRequest);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedPizza = { ...pizzas[foundIndex], ...req.body };

  pizzas[foundIndex] = updatedPizza;

  serialize(jsonDbPath, pizzas);

  return res.json(updatedPizza);
});

module.exports = router;
