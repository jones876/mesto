import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm';
import PopupWIthForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { formValidationSettings } from '../utils/constants.js';
import {
  profileEditButton,
  formEditProfile,
  cardAddButton,
  formAddElement,
  avatarEditButton,
  formEditAvatar,
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'aec3d109-020b-4b05-b39f-ebe00913ccce',
    'Content-Type': 'application/json;  character=UTF-8',
  },
});
const section = new Section(
  {
    renderer: (item, userId) => {
      section.addItem(createCard(item, userId));
    },
  },
  '.elements__list'
);
let currentUserId;
const user = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar',
});
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([resUser, resCard]) => {
    currentUserId = resUser._id;
    user.setUserInfo(resUser);
    user.setUserAvatar(resUser);
    section.renderItems(resCard, currentUserId);
  })

  .catch((err) => {
    console.log(err);
  });

const popupOpenImage = new PopupWithImage('.popup-show-image');

const createCard = (data, users) => {
  const card = new Card({
    data: data,
    userId: users,
    templateSelector: '#template-card',
    handleDelCard: (cardId, cardElement) => {
      popupConfirmDelete.open(cardId, cardElement);
    },
    handleLikeCard: (cardId) => {
      api
        .addLike(cardId)
        .then((res) => {
          card.updateLikes(res);
        })

        .catch((err) => {
          console.log(err);
        });
    },
    handleCardClick: () => {
      popupOpenImage.open(data);
    },
    handleDelLike: (cardId) => {
      api
        .deleteLike(cardId)
        .then((res) => {
          card.updateLikes(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return card.generateCard();
};

const popupEdit = new PopupWIthForm('.popup-edit-profile', {
  handleFormSubmit: (data) => {
    popupEdit.viewLoader(true, 'Сохранение...');
    api
      .sendUserInfo(data)
      .then((res) => {
        user.setUserInfo(res);
        popupEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEdit.viewLoader(false);
      });
  },
});

profileEditButton.addEventListener('click', () => {
  popupEdit.setInputValues(user.getUserInfo());
  popupEdit.open();
});

const popupCardAdd = new PopupWIthForm('.popup-add-card', {
  handleFormSubmit: (data) => {
    popupCardAdd.viewLoader(true, 'Сохранение...');
    api
      .sendNewCard(data)
      .then((newCard) => {
        section.addItem(createCard(newCard, currentUserId));
        popupCardAdd.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupCardAdd.viewLoader(false);
      });
  },
});

cardAddButton.addEventListener('click', () => {
  popupCardAdd.open();
});

const popupConfirmDelete = new PopupWithConfirm('.popup-confirm-delete', {
  handleFormSubmit: (id, card) => {
    popupConfirmDelete.viewLoader(true, 'Сохранение...');
    api
      .deleteCard(id)
      .then(() => {
        card.deleteCard();
        popupConfirmDelete.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupConfirmDelete.viewLoader(false);
      });
  },
});

const popupEditAvatar = new PopupWIthForm('.popup-update-avatar', {
  handleFormSubmit: (data) => {
    popupEditAvatar.viewLoader(true, 'Сохранение...');
    api
      .updateAvatar(data)
      .then((res) => {
        user.setUserAvatar(res);
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditAvatar.viewLoader(false);
      });
  },
});
avatarEditButton.addEventListener('click', () => {
  popupEditAvatar.open();
});

popupEditAvatar.setEventListeners();
popupConfirmDelete.setEventListeners();
popupCardAdd.setEventListeners();
popupEdit.setEventListeners();
popupOpenImage.setEventListeners();

const validatorEditProfile = new FormValidator(
  formValidationSettings,
  formEditProfile
);
const validatorAddCard = new FormValidator(
  formValidationSettings,
  formAddElement
);
const validatorEditAvatar = new FormValidator(
  formValidationSettings,
  formEditAvatar
);

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();
validatorEditAvatar.enableValidation();
