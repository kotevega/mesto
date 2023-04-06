import { initialCards, Card } from "./card.js";
import { config, FormValidator } from "./FormValidator.js";

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
}

const closePopup = (popupElement) => {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscape);
}

const closePopupByEscape = (evt) => {
  if (evt.code === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

buttonEditPtofile.addEventListener("click", () => {
  openPopup(popupEditProfile);
  popupNameInput.value = profileNameInput.textContent;
  popupJobInput.value = profileJobInput.textContent;
  const profileFormValidation = new FormValidator(formElementUser, config);
  profileFormValidation.resetValidation();
  profileFormValidation.enableValidation();
});

formElementUser.addEventListener("submit", () => {
  profileNameInput.textContent = popupNameInput.value;
  profileJobInput.textContent = popupJobInput.value;
  closePopup(popupEditProfile);
});

buttonEditPlace.addEventListener("click", () => {
  openPopup(popupEditPlace);
  const placeFormValidation = new FormValidator(formPlace, config);
  placeFormValidation.resetValidation();
  placeFormValidation.enableValidation();
});

const renderCard = (card) => {
  document.querySelector(".element").prepend(card);
}

initialCards.forEach((item) => {
  const newCard = new Card(item, ".element-template", openPopup);
  const cardElement = newCard.createCard();
  renderCard(cardElement);
});

formPlace.addEventListener("submit", () => {
  const imageNameNewCard = imageName.value;
  const imageLinkNewCard = imageLink.value;
  const createNewCard = {
    name: imageNameNewCard,
    link: imageLinkNewCard,
  };
  const newCard = new Card(createNewCard, ".element-template", openPopup);
  const cardElement = newCard.createCard();
  renderCard(cardElement);
  closePopup(popupEditPlace);
  formPlace.reset();
});
