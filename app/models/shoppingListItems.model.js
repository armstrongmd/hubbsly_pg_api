const { sequelize, sequelize, Sequelize } = require('.');

module.exports = (sequelize, Sequelize) => {
  const ShoppingListItem = sequelize.define('shoppingListItem', {
    id: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.TEXT,
    },
    imageId: {},
  });

  return ShoppingListItem;
};
