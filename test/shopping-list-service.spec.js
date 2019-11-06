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
    },
    {
      id: 2,
      name: '2 item',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      price: '42.00',
      category: 'Lunch',
    },
    {
      id: 3,
      name: '3 item',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      price: '43.00',
      category: 'Breakfast',
    },
    {
      id: 4,
      name: '4 item',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      price: '44.00',
      category: 'Lunch',
    },
    {
      id: 5,
      name: '5 item',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      price: '45.00',
      category: 'Snack',
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
  });

  describe('Shopping list service object', () => {
    it('resolves all items from shopping-list table', () => {});
  });
});
