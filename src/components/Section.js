export class Section {
  constructor({ renderer }, selectorCard) {
    this._renderer = renderer;
    this._container = document.querySelector(selectorCard);
  }
  
  renderItems(data, user) {
    data.reverse().forEach((item) => this._renderer(item, user));
  }

  addItem(itemHtml) {
    this._container.prepend(itemHtml);
  }
}
