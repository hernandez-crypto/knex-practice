/* eslint-disable quotes */
const shoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('Shopping list service service object', function() {
  let db;

  let listTestItems = [
    {
      id: 1,
      name: '1 item',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      price: '41.00',
      category: 'Main',
      checked: false,
    },
    {
      id: 2,
      name: '2 item',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      price: '42.00',
      category: 'Lunch',
      checked: false,
    },
    {
      id: 3,
      name: '3 item',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      price: '43.00',
      category: 'Breakfast',
      checked: false,
    },
    {
      id: 4,
      name: '4 item',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      price: '44.00',
      category: 'Lunch',
      checked: false,
    },
    {
      id: 5,
      name: '5 item',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      price: '45.00',
      category: 'Snack',
      checked: false,
    },
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB2_URL,
    });
  });

  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context(`'shopping_list' has data`, () => {
    beforeEach(() => {
      return db.into('shopping_list').insert(listTestItems);
    });
    it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
      return shoppingListService.getAllItems(db).then((actual) => {
        expect(actual).to.eql(listTestItems);
      });
    });
    it(`getItemById() resolves an item by id from 'shopping_list' table`, () => {
      const tempId = 5;
      const fifthTestItem = listTestItems[tempId - 1];
      return shoppingListService.getItemById(db, tempId).then((actual) => {
        expect(actual).to.eql({
          id: tempId,
          name: fifthTestItem.name,
          price: fifthTestItem.price,
          category: fifthTestItem.category,
          checked: fifthTestItem.checked,
          date_added: fifthTestItem.date_added,
        });
      });
    });
    it(`updateItemById() updates an item from the 'shopping_list' table`, () => {
      const idOfItemBeingUpdated = 3;
      const newItemData = {
        name: 'update',
        price: '4.00',
        category: 'Lunch',
        checked: false,
        date_added: new Date(),
      };
      return shoppingListService
        .updateItemById(db, idOfItemBeingUpdated, newItemData)
        .then(() => shoppingListService.getItemById(db, idOfItemBeingUpdated))
        .then((item) => {
          expect(item).to.eql({
            id: idOfItemBeingUpdated,
            ...newItemData,
          });
        });
    });
    it(`deleteItemById() deletes an item by id from 'shopping_list' table`, () => {
      const itemId = 1;
      return shoppingListService
        .deleteItemById(db, itemId)
        .then(() => shoppingListService.getAllItems(db))
        .then((allItems) => {
          [
            {
              id: 2,
              name: 'item 2',
              price: '19.99',
              category: 'Breakfast',
              checked: false,
              date_added: new Date('2029-01-22T16:28:32.615Z'),
            },
            {
              id: 3,
              name: 'item 3',
              price: '1919.99',
              category: 'Snack',
              checked: true,
              date_added: new Date('2029-01-22T16:28:32.615Z'),
            },
          ];
          const expected = listTestItems.filter((item) => item.id !== itemId);
          expect(allItems).to.eql(expected);
        });
    });
  });

  context(`Given 'shopping_list' has no data`, () => {
    it(`getAllItems() resolves an empty array`, () => {
      return shoppingListService.getAllItems(db).then((actual) => {
        expect(actual).to.eql([]);
      });
    });
    it(`insertItem() inserts a new item and resolves the new item with an 'id'`, () => {
      const newItem = {
        name: 'new',
        price: '6.00',
        category: 'Breakfast',
        checked: true,
        date_added: new Date('2029-01-22T16:28:32.615Z'),
      };
      return shoppingListService.insertItem(db, newItem).then((actual) => {
        expect(actual).to.eql({
          id: 1,
          name: newItem.name,
          price: newItem.price,
          category: newItem.category,
          checked: newItem.checked,
          date_added: newItem.date_added,
        });
      });
    });
  });

  describe('Shopping list service object', () => {
    it('resolves all items from shopping-list table', () => {});
  });
});
