const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js')

const ListItems = function () {
  this.requestHelper = new RequestHelper('http://localhost:3000/api/list-items');
};

ListItems.prototype.bindEvents = function () {
  PubSub.subscribe('ListItemsGridView:delete-button-pressed', (event) => {
    this.deleteItem(event.detail);
  });
  PubSub.subscribe('ListItemFormView:data-submitted', (event) => {
    this.createItem(event.detail);
  });
  PubSub.subscribe('ListItemsGridView:checkbox-pressed', (event) => {
    this.updateItem(event.detail);
  })
};

ListItems.prototype.getData = function () {
  this.requestHelper.get()
  .then((items) => {
    PubSub.publish('ListItems: list-data-loaded', items);
  });
};

ListItems.prototype.createItem = function (data) {
  this.requestHelper.post(data)
  .then((items) => {
    PubSub.publish('ListItems: list-data-loaded', items);
  });
};

ListItems.prototype.updateItem = function (data) {
  dataId = data.id;
  delete data.id;
  this.requestHelper.put(dataId, data)
  .then((items) => {
    PubSub.publish('ListItems: list-data-loaded', items);
  });
};


ListItems.prototype.deleteItem = function (id) {
  this.requestHelper.delete(id)
  .then((items) => {
    PubSub.publish('ListItems: list-data-loaded', items);
  });
};

module.exports = ListItems;
