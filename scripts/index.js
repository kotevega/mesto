import { initialCards } from "./cards.js";
import { config, cleanInputError } from "./validate.js";

const buttonEditPtofile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type-user");
const popupCloseButtonProfile = document.querySelector(
  ".popup__close-button_type_user"
);
const profileNameInput = document.querySelector("#profile-name");
const profileJobInput = document.querySelector("#profile-occupation");
const popupNameInput = document.querySelector("#popup-user-name");
const popupJobInput = document.querySelector("#popup-user-job");
const formElementUser = document.querySelector(".popup__form_user");

const buttonEditPlace = document.querySelector(".profile__add-button");
const popupEditPlace = document.querySelector(".popup_type-place");
const popupCloseButtonPlace = document.querySelector(
  ".popup__close-button_type_place"
);
const formPlace = document.querySelector(".popup__form-place");

const popupZoomImage = document.querySelector(".popup_type-zoom");
const popupCloseButtonImage = document.querySelector(
  ".popup__close-button_type_image"
);
const imageZoom = document.querySelector(".popup__image");
const headingZoom = document.querySelector(".popup__heading");

const element = document.querySelector(".element");
const cardTemplate = document
  .querySelector("#element-template")
  .content.querySelector(".element__list");
const imageName = document.querySelector("#input-place-name-image");
const imageLink = document.querySelector("#input-place-link-image");

const popupWindowList = Array.from(document.querySelectorAll(".popup"));
popupWindowList.forEach((popupWindow) => {
  popupWindow.addEventListener("click", (evt) => {
    if (evt.target === popupWindow) {
      closePopup(popupWindow);
    }
  });
  document.addEventListener("keydown", (evt) => {
    if (evt.code === "Escape") {
      closePopup(popupWindow);
    }
  });
});

function openPopup(popupElement) {
  cleanInputError(popupElement, config);
  popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  const submitButton = popupElement.querySelector(".popup__submit-button");
  submitButton?.classList.add("popup__submit-button_disabled");
}

buttonEditPtofile.addEventListener("click", function () {
  openPopup(popupEditProfile);
  popupNameInput.value = profileNameInput.textContent;
  popupJobInput.value = profileJobInput.textContent;
});

popupCloseButtonProfile.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

function handleFormUserSubmit() {
  profileNameInput.textContent = popupNameInput.value;
  profileJobInput.textContent = popupJobInput.value;
  closePopup(popupEditProfile);
}

formElementUser.addEventListener("submit", handleFormUserSubmit);

buttonEditPlace.addEventListener("click", function () {
  openPopup(popupEditPlace);
  formPlace.reset();
});

popupCloseButtonPlace.addEventListener("click", function () {
  closePopup(popupEditPlace);
});

function createCards(card) {
  const newElement = cardTemplate.cloneNode(true);
  const elementCaption = newElement.querySelector(".element__caption");
  const elementImage = newElement.querySelector(".element__image");
  const likeCardButton = newElement.querySelector(".element__like-button");
  const buttonDeleteCard = newElement.querySelector(".element__delete-button");
  const popupOpenImage = newElement.querySelector(".element__button-image");
  elementCaption.textContent = card.name;
  elementImage.setAttribute("src", card.link);
  elementImage.setAttribute("alt", card.name);
  likeCardButton.addEventListener("click", () =>
    handleLikeButtonClick(likeCardButton)
  );
  buttonDeleteCard.addEventListener("click", () =>
    handleDeleteButtonClick(newElement)
  );
  popupOpenImage.addEventListener("click", () => handleZoomImageOpen(card));
  return newElement;
}

initialCards.forEach((item) => {
  const newCard = createCards(item);
  renderCard(newCard);
});

function renderCard(card) {
  element.prepend(card);
}

function handleZoomImageOpen(card) {
  openPopup(popupZoomImage);
  imageZoom.setAttribute("src", card.link);
  imageZoom.setAttribute("alt", card.name);
  headingZoom.textContent = card.name;
}

popupCloseButtonImage.addEventListener("click", function closePopupZoomImage() {
  closePopup(popupZoomImage);
});

function handleFormPlaceSubmit() {
  const imageNameNewCard = imageName.value;
  const imageLinkNewCard = imageLink.value;
  const createNewCard = {
    name: imageNameNewCard,
    link: imageLinkNewCard,
  };
  const newCard = createCards(createNewCard);
  renderCard(newCard);
  closePopup(popupEditPlace);
}

formPlace.addEventListener("submit", handleFormPlaceSubmit);

function handleLikeButtonClick(newElement) {
  newElement.classList.toggle("element__like-button_active");
}

function handleDeleteButtonClick(newElement) {
  newElement.remove();
}
