require('dotenv').config();
const knex = require('knex');
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB2_URL,
});

function getItemsContainText(searchTerm) {
  knexInstance
    .select('*')
    .from('shopping-list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then((result) => {
      console.log(result);
    });
}
function getItemsPaginate(pageNumber) {
  const productsPerPage = 6;
  const offset = productsPerPage * (page - 1);
  knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .limit(productsPerPage)
    .offset(offset)
    .then((result) => {
      console.log(result);
    });
}

function getItemsAddedAfter(date) {
  knexInstance
    .select('id', 'name', 'price', 'category', 'date_added', 'checked')
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days' ::INTERVAL`, daysAgo),
    )
    .then((result) => console.log(result));
}
function totalCostFromCategory() {
  knexInstance
    .select('category')
    .sum('price AS total')
    .from('shopping_list')
    .groupBy('category')
    .then((result) => console.log(result));
}

getItemsContainText('kale');
getItemsPaginate(4);
getItemsAddedAfter(10);
getTotalCostofEachCategory();
