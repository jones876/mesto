import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__img');
    this._popupTitle = this._popup.querySelector('.popup__img-title');
  }

  open(image) {
    this._popupTitle.textContent = image.name;
    this._popupImage.src = image.link;
    this._popupImage.alt = image.name;
    super.open();
  }
}
