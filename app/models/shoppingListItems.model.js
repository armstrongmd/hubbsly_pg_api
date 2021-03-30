const { sequelize, Sequelize } = require('.');

module.exports = (sequelize, Sequelize) => {
  const ShoppingListItem = sequelize.define('shoppingListItem', {
    id: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.TEXT,
    },
    imageId: {
      type: Sequelize.TEXT,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
    },
    itemTags: {
      type: Sequelize.JSONB,
    },
  });

  return ShoppingListItem;
};
