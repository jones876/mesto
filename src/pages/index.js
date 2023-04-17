import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWIthForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards, formValidationSettings} from "../utils/constants.js";


const profileEditButton = document.querySelector('.profile__edit-btn');

const userName = document.querySelector('.profile__name');
const userNameInput = document.querySelector('.form__input_type_name');
const userInfo = document.querySelector('.profile__description');
const userInfoInput = document.querySelector('.form__input_type_info');
const formEditProfile = document.forms['edit-form'];
const cardAddButton = document.querySelector('.profile__add-btn');
const profileEditPopup = document.querySelector('.popup-edit-profile');
const cardAddPopup = document.querySelector('.popup-add-card');

const cardContainer = document.querySelector('.elements__list');
const imageShowPopup = document.querySelector('.popup-show-image');

const formAddElement = document.forms['add-card'];




function createCard(data, templateSelector) {
  const newCard = new Card(data, templateSelector, handleCardClick);
  return newCard.generateCard()
}


const popupOpenImage = new PopupWithImage(imageShowPopup);
function handleCardClick(name, link) {
 popupOpenImage.open(name, link);
}
popupOpenImage.setEventListeners();



const validatorEditProfile = new FormValidator(formValidationSettings, formEditProfile);
const validatorAddCard = new FormValidator(formValidationSettings, formAddElement);

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();


const section = new Section({
  items: initialCards,
  renderer: renderCard
}, cardContainer);
section.renderItems();

function renderCard(newCard) {
  const recentCard = createCard(newCard, '#template-card');
  section.addItem(recentCard);
}

const user = new UserInfo({
  userNameSelector: userName,
  userInfoSelector: userInfo
});

const popupEdit = new PopupWIthForm({
  popupSelector: profileEditPopup,
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
  popupSelector: cardAddPopup,
  handleFormSubmit: (data) => {
    renderCard({name:data.card_name, link:data.card_link});
    popupCardAdd.close();
  }
});
popupCardAdd.setEventListeners();
cardAddButton.addEventListener('click', () => {
  popupCardAdd.open();
});
