

export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".elements__item")
      .cloneNode(true);
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElementTitle = this._cardElement.querySelector('.elements__title');
    this._cardElementTitle.textContent = this._name;
    this._cardElementImage = this._cardElement.querySelector('.elements__image');
    this._cardElementImage.alt = this._name;
    this._cardElementImage.src = this._link;
    this._cardElementLikeButton = this._cardElement.querySelector('.elements__like-btn');
    this._cardElementDeleteButton = this._cardElement.querySelector('.elements__del-btn');

    this._setEventListeners();
    return this._cardElement;
  }

  _likeCard() {
    this._cardElementLikeButton.classList.toggle('elements__like-btn_active');
  }
  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }


  _setEventListeners() {
    this._cardElementLikeButton.addEventListener('click', () => this._likeCard());
    this._cardElementDeleteButton.addEventListener('click', () => this._deleteCard());
    this._cardElementImage.addEventListener('click', () =>
      this._handleCardClick(this._name, this._link)
    );
  }
}
