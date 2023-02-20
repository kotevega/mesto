let editPtofileButton = document.querySelector("#profile-edit-button");
let editPopup = document.querySelector("#popup");
let closePopup = document.querySelector("#close-popup");
let profileNameInput = document.querySelector("#profile-name");
let profileJobInput = document.querySelector("#profile-occupation");
let popupNameInput = document.querySelector("#popup-user-name");
let popupJobInput = document.querySelector("#popup-user-job");
let formElement = document.querySelector(".popup__container");

editPtofileButton.addEventListener("click", function () {
  editPopup.classList.add("popup_opened");
  popupNameInput.value = profileNameInput.textContent;
  popupJobInput.value = profileJobInput.textContent;
});

closePopup.addEventListener("click", closePopupUser);

function closePopupUser() {
  editPopup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileNameInput.textContent = popupNameInput.value;
  profileJobInput.textContent = popupJobInput.value;
  closePopupUser();
}
formElement.addEventListener("submit", handleFormSubmit);
