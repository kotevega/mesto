export class FormValidator {
  constructor(form, config) {
    this._form = form;
    this._inputElement = config.inputElement;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputVisibleError = config.inputVisibleError;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputList = Array.from(this._form.querySelectorAll(config.inputElement));
    this._submitButton = this._form.querySelector(config.submitButtonSelector);
  }

  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }

  _showInputError(input) {
    this._errorTextElement = this._form.querySelector(
      `${this._inputErrorClass}${input.name}`
    );
    this._errorTextElement.textContent = input.validationMessage;
    this._errorTextElement.classList.add(this._errorClass);
    input.classList.add(this._inputVisibleError);
  }

  _hideInputError(input) {
    this._errorTextElement = this._form.querySelector(
      `${this._inputErrorClass}${input.name}`
    );
    this._errorTextElement.textContent = "";
    this._errorTextElement.classList.remove(this._errorClass);
    input.classList.remove(this._inputVisibleError);
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return Array.from(this._inputList).some(
      (inputElement) => !inputElement.validity.valid
    );
  }

  _toggleButtonState() {
    if (!this._hasInvalidInput()) {
      this._enableButton();
    } else {
      this.disableButton();
    }
  }

  _setEventListener() {
    this._inputList.forEach((input) => {
      this._toggleButtonState();
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListener();
  }
}
