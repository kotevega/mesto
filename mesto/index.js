let editPtofileButton = document.querySelector(".profile__edit-button");
let editPopup = document.querySelector(".popup");
let closePopup = document.querySelector(".popup__close-button");

editPtofileButton.addEventListener("click", function () {
  editPopup.classList.add("popup");
  editPopup.classList.remove("popup_opened");
});

closePopup.addEventListener("click", function () {
  editPopup.classList.remove("popup");
  editPopup.classList.add("popup_opened");
});

let formElement = document.querySelector(".popup__container");
let popupNameInput = formElement.querySelector(".popup__name-input");
let popupJobInput = formElement.querySelector(".popup__job-input");
let profileNameInput = document.querySelector(".profile__name");
let profileJobInput = document.querySelector(".profile__occupation");

let userName = "Жак-Ив Кусто";
profileNameInput.textContent = userName;
let userJob = "Исследователь океана";
profileJobInput.textContent = userJob;

popupNameInput.value = userName;
popupJobInput.value = userJob;

popupNameInput.addEventListener("input", function (event) {
  let value = event.target.value;
  profileNameInput.textContent = value;
});

popupJobInput.addEventListener("input", function (event) {
  let value = event.target.value;
  profileJobInput.textContent = value;
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  console.log(popupNameInput.value);
  console.log(popupJobInput.value);
  profileNameInput.textContent = popupNameInput.value;
  profileJobInput.textContent = popupJobInput.value;
  let closePopup = document.querySelector(".popup__submit-button");
  closePopup.addEventListener("click", function () {
    editPopup.classList.remove("popup");
    editPopup.classList.add("popup_opened");
  });
}
formElement.addEventListener("submit", handleFormSubmit);
