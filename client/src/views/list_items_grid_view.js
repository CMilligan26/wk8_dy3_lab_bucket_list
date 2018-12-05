const PubSub = require('../helpers/pub_sub.js');
const ListItemsGridView = function () {

}

ListItemsGridView.prototype.createItems = function (container, data) {
  const listItem = this.createNewElement('div', 'textContent', '');
  if (data.status === true) {
    listItem.className = 'true';
  }
  else if (data.status === false) {
    listItem.className = 'false';
  };
  listItem.appendChild(this.createDeleteButton(data.id));
  listItem.appendChild(this.createNewElement('h3', 'textContent', data.title));
  listItem.appendChild(this.createNewElement('h4', 'textContent', data.category));
  listItem.appendChild(this.createNewElement('h5', 'textContent', data.description));
  listItem.appendChild(this.createCheckbox(data, listItem))
  container.appendChild(listItem);
};

ListItemsGridView.prototype.createNewElement = function (type, attr, value) {
  const newElement = document.createElement(type);
  newElement[attr] = value;
  return newElement;
};

ListItemsGridView.prototype.createDeleteButton = function (id) {
  const button = this.createNewElement('button', 'class', 'delete_button')
  button.value = id;
  button.addEventListener('click', (event) => {
    PubSub.publish('ListItemsGridView:delete-button-pressed', event.target.value)
  })
  return button;
};

ListItemsGridView.prototype.createCheckbox = function (data, container) {
  const checkBox = this.createNewElement('input', 'type', 'checkbox');
  if (data.status === true) {
    checkBox.checked = 'true'
  }
  checkBox.addEventListener('change', (event) => {
    if (event.target.checked === true)
    {
      container.className = 'true'
      data.status = true;
    }
    else if (event.target.checked === false)
    {
      container.className = 'false'
      data.status = false;
    };
    PubSub.publish('ListItemsGridView:checkbox-pressed', data)
  })
  return checkBox;
};

module.exports = ListItemsGridView;
