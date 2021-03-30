const Joi = require('joi');
const db = require('../models');
const ToDoItem = db.toDoItems;
const Op = db.Sequelize.Op;

// Create and save a new ToDo Item
exports.create = (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    decription: Joi.string().max(250),
    isActive: Joi.boolean()
  });

  const result = schema.validate({ name: req.body.name });

  // Validate request
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  // Create a ToDo Item
  const toDoItem = {
    name: req.body.name,
    description: req.body.description,
    isActive: req.body.isActive ? req.body.isActive : false
  };

  // Save ToDo Item
  ToDoItem.create(toDoItem)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `We're sorry, some error occured while creating the ToDo Item.`
      });
    });
};

// Retrieve all ToDo Items from the database
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  ToDoItem.findAll({ where: condition })
    .then((data) => {
      res.send(data);
      console.log('\x1b[31m%s\x1b[5m', 'hit the findAll')
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Oops Partner, we can't find any To Do Items right now.`
      });
    });
};

// Finds all ToDo Items for a user

// Finds a single ToDo Item with an Id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ToDoItem.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Oops Partner, we can't find a To Do Item with id:${id} right now!`
      });
    });
};

// Update a ToDo Item by the ID in the request
exports.update = (req, res) => {
  const id = req.params.id;

  ToDoItem.update(req.body, {
    where: { id: id }
  }).then((num) => {
    if (num == 1) {
      message: 'ToDo Item was updated successfully.';
    }
  });
};
