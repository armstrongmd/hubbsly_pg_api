module.exports = (app) => {
  const toDoItems = require('../controllers/toDoItem.controller');

  var router = require('express').Router();

  // Create new ToDo Item
  router.post('/', toDoItems.create);

  // Retrieve all ToDo Items
  router.get('/', toDoItems.findAll);

  app.use('/api/todoitems', router);
};
