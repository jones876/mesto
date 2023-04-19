import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWIthForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards, formValidationSettings} from '../utils/constants.js';
import {
  profileEditButton,
  userNameInput,
  userInfoInput,
  formEditProfile,
  cardAddButton,
  formAddElement
} from '../utils/constants.js'


function createCard(data, templateSelector) {
  const newCard = new Card(data, templateSelector, handleCardClick);
  return newCard.generateCard()
}


const popupOpenImage = new PopupWithImage('.popup-show-image');
function handleCardClick(name, link) {
 popupOpenImage.open(name, link);
}
popupOpenImage.setEventListeners();



const validatorEditProfile = new FormValidator(formValidationSettings, formEditProfile);
const validatorAddCard = new FormValidator(formValidationSettings, formAddElement);

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();


const section = new Section({
  cards: initialCards,
  renderer: renderCard
}, '.elements__list');
section.renderItems();

function renderCard(newCard) {
  const recentCard = createCard(newCard, '#template-card');
  section.addItem(recentCard);
}

const user = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__description'
});

const popupEdit = new PopupWIthForm({
  popupSelector: '.popup-edit-profile',
  handleFormSubmit: (data) => {
    user.setUserInfo(data);
    popupEdit.close();
  }
});
popupEdit.setEventListeners();
profileEditButton.addEventListener('click', ()=>{
  const userData = user.getUserInfo();
    userNameInput.value = userData.name;
    userInfoInput.value = userData.about;
    popupEdit.open();
});


const popupCardAdd = new PopupWIthForm({
  popupSelector: '.popup-add-card',
  handleFormSubmit: (data) => {
    renderCard({name:data.card_name, link:data.card_link});
    popupCardAdd.close();
  }
});
popupCardAdd.setEventListeners();
cardAddButton.addEventListener('click', () => {
  popupCardAdd.open();
});
