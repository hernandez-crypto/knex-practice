const shoppingListService = require('../src/shopping-list-service');

describe('Shopping list service service object', function() {
  let db;

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });
  describe('Shopping list service object', () => {
    it('resolves all items from shopping-list table', () => {});
  });
});
