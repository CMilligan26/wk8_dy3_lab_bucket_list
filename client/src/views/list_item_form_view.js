const PubSub = require('../helpers/pub_sub.js');

const ListItemFormView = function () {

}

ListItemFormView.prototype.bindEvents = function () {
  const form = document.querySelector('#item-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = this.formatData(event.target)
    PubSub.publish('ListItemFormView:data-submitted', data);
    event.target.reset();
  })
};

ListItemFormView.prototype.formatData = function (dataToFormat) {
  const formattedData = {
    title: dataToFormat.title.value,
    category: dataToFormat.category.value,
    description: dataToFormat.description.value,
    status: false
  };
  return formattedData;
};

module.exports = ListItemFormView;
