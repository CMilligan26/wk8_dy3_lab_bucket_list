const ListItems = require('./models/list_items.js');
const ListItemView = require('./views/list_item_view.js');
const ListItemFormView = require('./views/list_item_form_view.js');

document.addEventListener('DOMContentLoaded', () => {
  listItems = new ListItems();
  listItems.getData();
  listItems.bindEvents();
  listItemView = new ListItemView(document.querySelector('#list_items'));
  listItemView.bindEvents();
  listItemFormView = new ListItemFormView();
  listItemFormView.bindEvents();
});
