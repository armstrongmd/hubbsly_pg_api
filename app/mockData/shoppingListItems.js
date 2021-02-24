function loadShoppingItems() {
  ShoppingItems.create({
    id: 1,
    itemName: 'Dove',
    itemTags: ['bathsoap', 'soap', 'personal care'],
    isActive: true,
  });
  ShoppingItems.create({
    id: 2,
    itemName: 'eggs',
    itemTags: ['grocery', 'cold', 'protein'],
    isActive: true,
  });
  ShoppingItems.create({
    id: 3,
    itemName: 'bread',
    itemTags: ['grocery', 'bakery', 'starch'],
    isActive: true,
  });
  ShoppingItems.create({
    id: 4,
    itemName: 'beer',
    itemTags: ['grocery', 'alcohol', 'beverage'],
    isActive: true,
  });
}
