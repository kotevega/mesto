import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._heading = this._popup.querySelector(".popup__heading");
  }

  open(name, link) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._heading.textContent = name;
  }
}
