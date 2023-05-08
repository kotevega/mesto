export class Card {
  constructor({
    data,
    userId,
    templateSelector,
    handleClickDeleteButton,
    handleCardClick,
    handleLikeButtonClick,
    handleLikeDelete,
  }) {
    this._dataCard = data;
    this._name = data.name;
    this._imageLink = data.link;
    this._idCard = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._selector = templateSelector;
    this._handleClickDeleteButton = handleClickDeleteButton;
    this._handleCardClick = handleCardClick;
    this._handleLikeButton = handleLikeButtonClick;
    this._handleLikeDelete = handleLikeDelete;
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
    this._elementLikeCounter = this._element.querySelector(".element__counter");
    this._elementCaption.textContent = this._name;
    this._elementImage.src = this._imageLink;
    this._elementImage.alt = this._name;

    if (this._ownerId !== this._userId) {
      this._buttonDeleteCard.remove();
    }

    this.countLikes(this._dataCard);
    this._setEventListeners();

    return this._element;
  }

  _handleLikeButtonClick(card) {
    if (this._checkLikes()) {
      this._handleLikeDelete(card);
    } else {
      this._handleLikeButton(card);
    }
  }

  _setEventListeners() {
    this._likeCardButton.addEventListener("click", () =>
      this._handleLikeButtonClick(this._idCard)
    );
    this._popupOpenImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._imageLink)
    );
    this._buttonDeleteCard.addEventListener("click", () =>
      this._handleClickDeleteButton(this._idCard, this._element)
    );
  }

  _checkLikes() {
    return this._likes.some((item) => item._id === this._userId);
  }

  countLikes(dataCard) {
    this._likes = dataCard.likes;
    if (this._likes.length === 0) {
      this._elementLikeCounter.textContent = "0";
    } else {
      this._elementLikeCounter.textContent = this._likes.length;
    }
    if (this._checkLikes()) {
      this._likeCardButton.classList.add("element__like-button_active");
    } else {
      this._likeCardButton.classList.remove("element__like-button_active");
    }
  }
}
