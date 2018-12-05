const PubSub = require('../helpers/pub_sub.js');
const ListItemsGridView = require('./list_items_grid_view.js');

const ListItemView = function (container) {
  this.container = container;
  this.listItemsGridView = new ListItemsGridView();
}

ListItemView.prototype.bindEvents = function () {
  PubSub.subscribe('ListItems: list-data-loaded', (data) => {
    this.container.textContent = '';
    for (listItem of data.detail) {
    this.formatData(listItem);
    }
  })
};

ListItemView.prototype.formatData = function (data) {
  const formattedData = {
    id: data._id,
    title: data.title,
    category: data.category,
    description: data.description,
    status: data.status
  }
  this.showItems(formattedData)
};

ListItemView.prototype.showItems = function (data) {
  this.listItemsGridView.createItems(this.container, data);
};

module.exports = ListItemView;
