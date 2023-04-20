export class Section {
  constructor({ items, renderer }, selectorCard) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selectorCard);
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(itemHtml) {
    this._container.prepend(itemHtml);
  }
}
