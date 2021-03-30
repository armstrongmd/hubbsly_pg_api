const { sequelize, Sequelize } = require('.');

module.exports = (sequelize, Sequelize) => {
  const ToDoItem = sequelize.define('toDoItem', {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    isActive: {
      type: Sequelize.BOOLEAN
    }
  });

  return ToDoItem;
};
