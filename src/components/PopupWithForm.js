import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._popupForm = this._popupSelector.querySelector(".form");
  }

  _getInputValues() {
    this._popupInputs = Array.from(this._popupSelector.querySelectorAll('.form__input'));
    this._formValues = {};
    this._popupInputs.forEach(input => this._formValues[input.name] = input.value);
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
}
