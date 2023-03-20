export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: ".popup__input-error_type_",
  errorClass: "popup__input-error",
  inputVisibleError: "popup__input_visible-error",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
};

const showInputError = (
  inputElement,
  errorTextElement,
  validationMessage,
  errorClass,
  inputVisibleError
) => {
  errorTextElement.textContent = validationMessage;
  errorTextElement.classList.add(errorClass);
  inputElement.classList.add(inputVisibleError);
};

const hideInputError = (
  inputElement,
  errorTextElement,
  errorClass,
  inputVisibleError
) => {
  errorTextElement.textContent = "";
  errorTextElement.classList.remove(errorClass);
  inputElement.classList.remove(inputVisibleError);
};

const disableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
};

const enableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
};

const checkInputValidity = (
  inputElement,
  inputErrorClass,
  errorClass,
  inputVisibleError
) => {
  const errorTextElement = document.querySelector(
    `${inputErrorClass}${inputElement.name}`
  );

  if (!inputElement.validity.valid) {
    showInputError(
      inputElement,
      errorTextElement,
      inputElement.validationMessage,
      errorClass,
      inputVisibleError
    );
  } else {
    hideInputError(
      inputElement,
      errorTextElement,
      errorClass,
      inputVisibleError
    );
  }
};

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some(
    (inputElement) => !inputElement.validity.valid
  );
};

const toggleButtonState = (submitButton, inactiveButtonClass, inputList) => {
  if (!hasInvalidInput(inputList)) {
    disableButton(submitButton, inactiveButtonClass);
  } else {
    enableButton(submitButton, inactiveButtonClass);
  }
};

const setEventListener = (
  inputList,
  submitButton,
  inputErrorClass,
  errorClass,
  inputVisibleError,
  inactiveButtonClass
) => {
  inputList.forEach((inputElement) => {
    toggleButtonState(submitButton, inactiveButtonClass, inputList);
    inputElement.addEventListener("input", () => {
      checkInputValidity(
        inputElement,
        inputErrorClass,
        errorClass,
        inputVisibleError
      );
      toggleButtonState(submitButton, inactiveButtonClass, inputList);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const submitButton = formElement.querySelector(config.submitButtonSelector);
    setEventListener(
      inputList,
      submitButton,
      config.inputErrorClass,
      config.errorClass,
      config.inputVisibleError,
      config.inactiveButtonClass
    );
  });
};

export const cleanInputError = (formElement, config) => {
  const errorList = Array.from(
    formElement.querySelectorAll(`.${config.errorClass}`)
  );
  errorList.forEach((error) => {
    error.textContent = "";
  });
  const inputList = Array.from(
    formElement.querySelectorAll(`${config.inputSelector}`)
  );
  inputList.forEach((input) => {
    input.classList.remove(config.inputVisibleError);
  });
};

enableValidation(config);
