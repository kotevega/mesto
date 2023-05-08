import "./index.css";
import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { FormValidator } from "../components/FormValidator.js";
import { config } from "../utils/constants.js";

const formElementUser = document.forms["popup_form_user"];
const formAvatar = document.forms["popup_form_avatar"];
const formPlace = document.forms["popup_form_place"];

const buttonEditPtofile = document.querySelector(".profile__edit-button");
const buttonEditAvatar = document.querySelector(".profile__edit-avatar");
const buttonEditPlace = document.querySelector(".profile__add-button");

const popupNameInput = document.querySelector("#popup-name");
const popupJobInput = document.querySelector("#popup-about");

const avatarFormValidation = new FormValidator(formAvatar, config);
const placeFormValidation = new FormValidator(formPlace, config);
const profileFormValidation = new FormValidator(formElementUser, config);
let userNowId;

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "efafdb7e-dc8f-4c7a-ad89-5ae9b99df990",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfoFromApi(), api.getInitialCardsApi()])
  .then(([responseUser, responseCard]) => {
    userNowId = responseUser._id;
    userInfo.setUserInfo(responseUser);
    userInfo.setUserAvatar(responseUser);
    section.renderItems(responseCard, userNowId);
  })
  .catch((err) => console.log(`Ошибка: ${err}`));

const renderCard = (data, user) => {
  const newCard = new Card({
    data: data,
    userId: user,
    templateSelector: ".element-template",

    handleClickDeleteButton: (id, card) => {
      popupDeleteAccept.open(id, card);
    },

    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    },

    handleLikeButtonClick: (cardId) => {
      api
        .putCardLikeToApi(cardId)
        .then((res) => {
          newCard.countLikes(res);
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    },

    handleLikeDelete: (cardId) => {
      api
        .deleteCardLikeFromApi(cardId)
        .then((res) => {
          newCard.countLikes(res);
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    },
  });
  return newCard.createCard();
};

const section = new Section(
  {
    renderer: (items, userId) => {
      section.addItem(renderCard(items, userId));
    },
  },
  ".element"
);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__occupation",
  avatarSelector: ".profile__avatar",
});

const popupAvatar = new PopupWithForm({
  popupSelector: ".popup_type-avatar",
  handleFormSubmit: (data) => {
    popupAvatar.renderLoader(true, "Сохранение...");
    api
      .patchUserAvatarToApi(data)
      .then((resUser) => {
        userInfo.setUserAvatar(resUser);
        popupAvatar.close();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        popupAvatar.renderLoader(false);
      });
  },
});

const popupProfile = new PopupWithForm({
  popupSelector: ".popup_type-user",
  handleFormSubmit: (formData) => {
    popupProfile.renderLoader(true, "Сохранение...");
    api
      .patchUserInfoToApi(formData)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupProfile.close();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        popupProfile.renderLoader(false);
      });
  },
});

const popupPlace = new PopupWithForm({
  popupSelector: ".popup_type-place",
  handleFormSubmit: (formData) => {
    popupPlace.renderLoader(true, "Сохранение...");
    api
      .postNewCardApi(formData.imageName, formData.imageLink)
      .then((newCardFromPopup) => {
        section.addItem(renderCard(newCardFromPopup, userNowId));
        popupPlace.close();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        popupPlace.renderLoader(false);
      });
  },
});

const popupDeleteAccept = new PopupWithConfirmation({
  popupSelector: ".popup_type-accept",
  handleFormSubmit: (id, card) => {
    popupDeleteAccept.renderLoader(true, "Сохранение...");
    api
      .deleteCardFromApi(id)
      .then(() => {
        card.remove();
        card = null;
        popupDeleteAccept.close();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        popupDeleteAccept.renderLoader(false);
      });
  },
});

const popupImage = new PopupWithImage(".popup_type-zoom");

avatarFormValidation.enableValidation();
profileFormValidation.enableValidation();
placeFormValidation.enableValidation();

popupAvatar.setEventListeners();
popupProfile.setEventListeners();
popupImage.setEventListeners();
popupPlace.setEventListeners();
popupDeleteAccept.setEventListeners();

buttonEditAvatar.addEventListener("click", () => {
  popupAvatar.open();
  avatarFormValidation.resetValidation();
  avatarFormValidation.disableButton();
});

buttonEditPtofile.addEventListener("click", () => {
  popupProfile.open();
  popupNameInput.value = userInfo.getUserInfo().name;
  popupJobInput.value = userInfo.getUserInfo().about;
  profileFormValidation.resetValidation();
  profileFormValidation.disableButton();
});

buttonEditPlace.addEventListener("click", () => {
  popupPlace.open();
  placeFormValidation.resetValidation();
  placeFormValidation.disableButton();
});
