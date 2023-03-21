import { initialCards } from "./cards.js";

const buttonEditPtofile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type-user");

const profileNameInput = document.querySelector("#profile-name");
const profileJobInput = document.querySelector("#profile-occupation");
const popupNameInput = document.querySelector("#popup-user-name");
const popupJobInput = document.querySelector("#popup-user-job");
const formElementUser = document.forms["popup_form_user"];

const buttonEditPlace = document.querySelector(".profile__add-button");
const popupEditPlace = document.querySelector(".popup_type-place");

const formPlace = document.forms["popup_form_place"];

const popupZoomImage = document.querySelector(".popup_type-zoom");
const imageZoom = document.querySelector(".popup__image");
const headingZoom = document.querySelector(".popup__heading");

const element = document.querySelector(".element");
const cardTemplate = document
  .querySelector("#element-template")
  .content.querySelector(".element__list");
const imageName = document.querySelector("#input-place-name-image");
const imageLink = document.querySelector("#input-place-link-image");

function closePopupByEscape(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.code === "Escape") {
    closePopup(openedPopup);
  }
}

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

const submitButtonDisabled = (popupElement) => {
  const submitButton = popupElement.querySelector(".popup__submit-button");
  submitButton?.classList.add("popup__submit-button_disabled");
  submitButton.setAttribute("disabled", true);
};

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEscape);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscape);
}

buttonEditPtofile.addEventListener("click", function () {
  openPopup(popupEditProfile);
  popupNameInput.value = profileNameInput.textContent;
  popupJobInput.value = profileJobInput.textContent;
});

function handleFormUserSubmit() {
  profileNameInput.textContent = popupNameInput.value;
  profileJobInput.textContent = popupJobInput.value;
  closePopup(popupEditProfile);
}

formElementUser.addEventListener("submit", handleFormUserSubmit);

buttonEditPlace.addEventListener("click", function () {
  openPopup(popupEditPlace);
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
  formPlace.reset();
  submitButtonDisabled(popupEditPlace);
}

formPlace.addEventListener("submit", handleFormPlaceSubmit);

function handleLikeButtonClick(newElement) {
  newElement.classList.toggle("element__like-button_active");
}

function handleDeleteButtonClick(newElement) {
  newElement.remove();
}
