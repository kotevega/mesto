const editPtofileButton = document.querySelector("#profile-edit-button");
const editPopupProfile = document.querySelector("#popup-user");
const closePopupProfile = document.querySelector("#close-popup-user");
const profileNameInput = document.querySelector("#profile-name");
const profileJobInput = document.querySelector("#profile-occupation");
const popupNameInput = document.querySelector("#popup-user-name");
const popupJobInput = document.querySelector("#popup-user-job");
const formElementUser = document.querySelector("#popup-user-container");

editPtofileButton.addEventListener("click", function () {
  editPopupProfile.classList.add("popup_opened");
  popupNameInput.value = profileNameInput.textContent;
  popupJobInput.value = profileJobInput.textContent;
});

closePopupProfile.addEventListener("click", closePopupUser);

function closePopupUser() {
  editPopupProfile.classList.remove("popup_opened");
}

function handleFormUserSubmit(evt) {
  evt.preventDefault();
  profileNameInput.textContent = popupNameInput.value;
  profileJobInput.textContent = popupJobInput.value;
  closePopupUser();
}
formElementUser.addEventListener("submit", handleFormUserSubmit);

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

const element = document.querySelector(".element");
const editPlaceButton = document.querySelector(".profile__add-button");
const editPopupPlace = document.querySelector("#popup-place");
const closePopupPlace = document.querySelector("#close-popup-place");
const closePopupImage = document.querySelector("#close-popup-image");
const formElementPlace = document.querySelector("#popup-place-container");
const formPlace = document.querySelector("#popup-form-place");
const popupZoom = document.querySelector(".zoom");
const popupImageZoom = document.querySelector(".zoom__image");
const popupZoomHeading = document.querySelector(".zoom__heading")

function createCards(card) {
  const newElement = document
    .querySelector("#element-template")
    .content.cloneNode(true);
  const elementCaption = newElement.querySelector(".element__caption");
  const elementImage = newElement.querySelector(".element__image");
  const likeCardButton = newElement.querySelector(".element__like-button");
  const deleteCardButton = newElement.querySelector(".element__delete-button");
  const openPopupImage = newElement.querySelector(".element__button-image");
  elementCaption.textContent = card.name;
  elementImage.setAttribute("src", card.link);
  elementImage.setAttribute("alt", card.name);
  likeCardButton.addEventListener("click", handleLikeButtonClick);
  deleteCardButton.addEventListener("click", handleDeleteButtonClick);
  openPopupImage.addEventListener("click", () => handleZoomImageOpen(card));
  element.prepend(newElement);
}

initialCards.forEach(createCards);

editPlaceButton.addEventListener("click", function () {
  editPopupPlace.classList.add("popup_opened");
  formPlace.reset();
});

closePopupPlace.addEventListener("click", closePopupContainerPlace);

function closePopupContainerPlace() {
  editPopupPlace.classList.remove("popup_opened");
}

function handleFormPlaceSubmit(evt) {
  evt.preventDefault();
  const imageName = document.querySelector("#input-place-name").value;
  const imageLink = document.querySelector("#input-place-link").value;
  const createNewCard = {
    name: imageName,
    link: imageLink,
  };
  createCards(createNewCard);
  closePopupContainerPlace();
}

formElementPlace.addEventListener("submit", handleFormPlaceSubmit);

function handleLikeButtonClick(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle("element__like-button_active");
}

function handleDeleteButtonClick(evt) {
  const deleteButton = evt.target;
  const cardTrash = deleteButton.closest(".element__list");
  cardTrash.remove();
}

function handleZoomImageOpen(card) {
  popupZoom.classList.add("zoom_opened");
  popupImageZoom.setAttribute("src", card.link);
  popupImageZoom.setAttribute("alt", card.name);
  popupZoomHeading.textContent = card.name;
}

closePopupImage.addEventListener("click", closePopupContainerImage);

function closePopupContainerImage() {
  popupZoom.classList.remove("zoom_opened");
}
