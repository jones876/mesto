import Popup from './Popup';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.form');
    this._submitButton = this._popupForm.querySelector('.form__btn');
    this.defaultText = this._submitButton.textContent;
  }
  open(cardElement, cardId) {
    super.open();
    this.id = cardId;
    this.card = cardElement;
  }
  viewLoader(load) {
    if (load) {
      if (!this._submitButton) return;
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this.defaultText;
    }
  }
  setEventListeners() {
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleDeleteSubmit();
    });
  }
  setSubmitAction(action) {
    this._handleDeleteSubmit = action;
  }
}
