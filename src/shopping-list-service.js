const shoppingListService = {
  getAllItems(knex) {
    return knex.select('*').from('shopping_list');
  },
  // getItemById(knex,id) {
  //     return knex
  //     .from('shopping-list')
  // }
  // deleteItemById(knex,id){
  //     return knex
  //     .from('shopping-list')
  // }
  // updateItemById(knex,id){
  //     return knex
  //     .from('shopping-list')
  // }
  // insertItem(knex,id){
  //     return knex
  //     .from('shopping-list')
  // }
};

module.exports = shoppingListService;
