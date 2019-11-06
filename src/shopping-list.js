require('dotenv').config();
const knex = require('knex');
const shoppingListService = require('./shopping-list-service');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB2_URL,
});

console.log(shoppingListService.getAllItems(knexInstance));
