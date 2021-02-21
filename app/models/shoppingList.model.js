const { sequelize, Sequelize } = require('.');

module.exports = (sequelize, Sequelize) => {
  const ShoppingList = sequelize.define('shoppingList', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    items: {
      type: Sequelize.JSONB,
    },
  });
};
