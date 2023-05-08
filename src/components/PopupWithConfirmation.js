import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._buttonSubmit = this._popup.querySelector(".popup__submit-button");
  }

  open(idCard, card) {
    super.open();
    this.id = idCard;
    this.card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.id, this.card);
    });
  }
}
