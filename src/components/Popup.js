export default class Popup {
  constructor(popupSelector) {
      this._popupSelector = popupSelector;
      this._handleEscClose = this._handleEscClose.bind(this)
    }

  open() {
      this._popupSelector.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
      this._popupSelector.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose = (event)=> {
    if (event.target === event.currentTarget) {
      this.close();
  }
}
  setEventListeners() {
    this._popupSelector.querySelector('.popup__close-btn').addEventListener("click", () => {
      this.close();
    });
    this._popupSelector.addEventListener('mousedown', this._handleOverlayClose);
  }
}

