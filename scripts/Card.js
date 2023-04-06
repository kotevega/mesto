export { initialCards, Card };

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

class Card {
  constructor(data, templateSelector, openPopup) {
    this._name = data.name;
    this._image = data.link;
    this._selector = templateSelector;
    this._openPopup = openPopup;
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
      this._handleZoomImageOpen()
    );
  }

  _handleLikeButtonClick() {
    this._likeCardButton.classList.toggle("element__like-button_active");
  }

  _handleDeleteButtonClick() {
    this._element.remove();
  }

  _handleZoomImageOpen() {
    this._openPopup(document.querySelector(".popup_type-zoom"));
    document.querySelector(".popup__image").src = this._image;
    document.querySelector(".popup__image").alt = this._name;
    document.querySelector(".popup__heading").textContent = this._name;
  }
}
