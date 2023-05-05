import { Object } from 'core-js';
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.form');
    this._popupInputs = Array.from(
      this._popup.querySelectorAll('.form__input')
    );
    this._submitButton = this._popupForm.querySelector('.form__btn');
  }

  _getInputValues() {
    this._formValues = {};
    this._popupInputs.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  viewLoader(load, text) {
    if (!this._submitButton) return;
    if (load) {
      this.defaultText = this._submitButton.textContent;
      this._submitButton.textContent = text;
    } else {
      this._submitButton.textContent = this.defaultText;
    }
  }

  setInputValues = (data) => {
    this._popupInputs.forEach((input, i) => {
      input.value = Object.values(data)[i];
    });
  };
}
