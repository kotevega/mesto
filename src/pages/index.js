import './index.css'; 
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { FormValidator } from "../components/FormValidator.js";
import { config, initialCards } from "../utils/constants.js";

const buttonEditPtofile = document.querySelector(".profile__edit-button");
const popupNameInput = document.querySelector("#popup-name");
const popupJobInput = document.querySelector("#popup-occupation");
const buttonEditPlace = document.querySelector(".profile__add-button");
const formElementUser = document.forms["popup_form_user"];
const formPlace = document.forms["popup_form_place"];

const placeFormValidation = new FormValidator(formPlace, config);
const profileFormValidation = new FormValidator(formElementUser, config);
profileFormValidation.enableValidation();
placeFormValidation.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__occupation",
});

const popupProfile = new PopupWithForm({
  popupSelector: ".popup_type-user",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
  },
});

popupProfile.setEventListeners();

buttonEditPtofile.addEventListener("click", () => {
  popupProfile.open();
  popupNameInput.value = userInfo.getUserInfo().name;
  popupJobInput.value = userInfo.getUserInfo().occupation;
  profileFormValidation.resetValidation();
  profileFormValidation.disableButton();
});

const popupPlace = new PopupWithForm({
  popupSelector: ".popup_type-place",
  handleFormSubmit: (formData) => {
    const createNewCard = {
      name: formData.imageName,
      link: formData.imageLink,
    };
    renderCard(createNewCard);
  },
});

popupPlace.setEventListeners();

buttonEditPlace.addEventListener("click", () => {
  popupPlace.open();
  placeFormValidation.resetValidation();
  placeFormValidation.disableButton();
});

const popupImage = new PopupWithImage(".popup_type-zoom");
popupImage.setEventListeners();

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

function renderCard(card) {
  const newCard = new Card(card, ".element-template", (name, link) =>
    handleCardClick(name, link)
  );
  const cardElement = newCard.createCard();
  section.addItem(cardElement);
}

const section = new Section(
  { items: initialCards, renderer: renderCard },
  ".element"
);

section.renderItems();
