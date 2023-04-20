export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._image = data.link;
    this._selector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  _getElement() {
    const newElement = document
      .querySelector(this._selector)
      .content.querySelector(".element__list")
      .cloneNode(true);
    return newElement;
  }

  createCard() {
    this._element = this._getElement();
    this._elementCaption = this._element.querySelector(".element__caption");
    this._elementImage = this._element.querySelector(".element__image");
    this._likeCardButton = this._element.querySelector(".element__like-button");
    this._buttonDeleteCard = this._element.querySelector(
      ".element__delete-button"
    );
    this._popupOpenImage = this._element.querySelector(
      ".element__button-image"
    );
    this._elementCaption.textContent = this._name;
    this._elementImage.src = this._image;
    this._elementImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeCardButton.addEventListener("click", () =>
      this._handleLikeButtonClick()
    );
    this._buttonDeleteCard.addEventListener("click", () =>
      this._handleDeleteButtonClick()
    );
    this._popupOpenImage.addEventListener("click", () =>
      this.handleCardClick(this._name, this._image)
    );
  }

  _handleLikeButtonClick() {
    this._likeCardButton.classList.toggle("element__like-button_active");
  }

  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null;
  }
}
