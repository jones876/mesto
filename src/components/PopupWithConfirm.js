import Popup from './Popup';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.form');
    this._submitButton = this._popupForm.querySelector('.form__btn');
    // this._submit = submit;
    this._handleFormSubmit = handleFormSubmit;
  }
  open(cardElement, cardId) {
    super.open();
    this.id = cardId;
    this.card = cardElement;
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
  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => {
      this._handleFormSubmit(this.id, this.card);
    });
  }
}
