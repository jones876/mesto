export default class Card {
  constructor({
    data,
    userId,
    templateSelector,
    handleCardClick,
    handleDelCard,
    handleLikeCard,
    handleDelLike,
  }) {
    this._userId = userId;
    this.cardData = data;
    this._link = data.link;
    this._name = data.name;
    this._dataLikes = data.likes;
    this._cardId = data._id;
    this._userCardId = data.owner._id;
    this._counterLikes = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelCard = handleDelCard;
    this._handleLikeCard = handleLikeCard;
    this._handleDelLike = handleDelLike;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.elements__item')
      .cloneNode(true);
  }

  generateCard() {
    this.cardElement = this._getTemplate();
    this._cardElementTitle = this.cardElement.querySelector('.elements__title');
    this._cardElementTitle.textContent = this._name;
    this._cardElementImage = this.cardElement.querySelector('.elements__image');
    this._cardElementImage.alt = this._name;
    this._cardElementImage.src = this._link;
    this._cardElementLikeButton = this.cardElement.querySelector(
      '.elements__like-btn'
    );
    this._cardElementDeleteButton =
      this.cardElement.querySelector('.elements__del-btn');
    this._cardElementLikeCount = this.cardElement.querySelector(
      '.elements__like-counter'
    );
    if (this._userCardId !== this._userId) {
      this._cardElementDeleteButton.remove();
    }
    this._setEventListeners();
    this.updateLikes(this.cardData);
    return this.cardElement;
  }

  isLiked() {
    return this._dataLikes.some((elem) => elem._id === this._userId);
  }

  toogleLikes() {
    if (this.isLiked()) {
      this._handleDelLike(this._cardId);
    } else {
      this._handleLikeCard(this._cardId);
    }
  }
  deleteCard() {
    this.cardElement.remove();
    this.cardElement = null;
  }

  updateLikes(card) {
    this._dataLikes = card.likes;
    if (this._dataLikes.length === 0) {
      this._cardElementLikeCount.textContent = '0';
    } else {
      this._cardElementLikeCount.textContent = this._dataLikes.length;
    }
    if (this.isLiked()) {
      this._cardElementLikeButton.classList.add('elements__like-btn_active');
    } else {
      this._cardElementLikeButton.classList.remove('elements__like-btn_active');
    }
  }

  _setEventListeners() {
    this._cardElementLikeButton.addEventListener('click', () =>
      this.toogleLikes()
    );
    this._cardElementDeleteButton.addEventListener('click', () =>
      this._handleDelCard(this, this.cardId)
    );
    this._cardElementImage.addEventListener('click', () =>
      this._handleCardClick()
    );
  }
}
