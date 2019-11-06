const shoppingListService = {
  getAllItems(knex) {
    return knex.select('*').from('shopping_list');
  },
  getItemById(knex, id) {
    return knex
      .from('shopping_list')
      .select('*')
      .where('id', id)
      .first();
  },
  deleteItemById(knex, id) {
    return knex
      .from('shopping_list')
      .where({ id })
      .delete();
  },
  updateItemById(knex, id, newData) {
    return knex
      .from('shopping_list')
      .where({ id })
      .update(newData);
  },
  insertItem(knex, item) {
    return knex
      .insert(item)
      .into('shopping_list')
      .returning('*')
      .then((rows) => rows[0]);
  },
};

module.exports = shoppingListService;
