import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { config, initialCards } from "./constants.js";

const buttonEditPtofile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type-user");

const profileNameInput = document.querySelector("#profile-name");
const profileJobInput = document.querySelector("#profile-occupation");
const popupNameInput = document.querySelector("#popup-user-name");
const popupJobInput = document.querySelector("#popup-user-job");

const buttonEditPlace = document.querySelector(".profile__add-button");
const popupEditPlace = document.querySelector(".popup_type-place");
const imageName = document.querySelector("#input-place-name-image");
const imageLink = document.querySelector("#input-place-link-image");

const formElementUser = document.forms["popup_form_user"];
const formPlace = document.forms["popup_form_place"];

const popupList = Array.from(document.querySelectorAll(".popup"));
const elemetContainer = document.querySelector(".element");

const placeFormValidation = new FormValidator(formPlace, config);
const profileFormValidation = new FormValidator(formElementUser, config);
profileFormValidation.enableValidation();
placeFormValidation.enableValidation();

popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

const openPopup = (popupElement) => {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEscape);
};

const closePopup = (popupElement) => {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscape);
};

const closePopupByEscape = (evt) => {
  if (evt.code === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

buttonEditPtofile.addEventListener("click", () => {
  openPopup(popupEditProfile);
  popupNameInput.value = profileNameInput.textContent;
  popupJobInput.value = profileJobInput.textContent;
  profileFormValidation.resetValidation();
  profileFormValidation.disableButton();
});

formElementUser.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileNameInput.textContent = popupNameInput.value;
  profileJobInput.textContent = popupJobInput.value;
  closePopup(popupEditProfile);
});

buttonEditPlace.addEventListener("click", () => {
  openPopup(popupEditPlace);
  placeFormValidation.resetValidation();
  placeFormValidation.disableButton();
});

const madeCard = (card) => {
  const newCard = new Card(card, ".element-template", openPopup);
  const cardElement = newCard.createCard();
  return cardElement;
};

initialCards.forEach((item) => {
  elemetContainer.prepend(madeCard(item));
});

formPlace.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const imageNameNewCard = imageName.value;
  const imageLinkNewCard = imageLink.value;
  const createNewCard = {
    name: imageNameNewCard,
    link: imageLinkNewCard,
  };
  elemetContainer.prepend(madeCard(createNewCard));
  closePopup(popupEditPlace);
  formPlace.reset();
});
