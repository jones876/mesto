import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards, formValidationSettings} from "./constants.js";


const profileEditButton = document.querySelector('.profile__edit-btn');
const profileCloseButton = document.querySelector('.popup__close-btn');
const userName = document.querySelector('.profile__name');
const userNameInput = document.querySelector('.form__input_type_name');
const userInfo = document.querySelector('.profile__description');
const userInfoInput = document.querySelector('.form__input_type_info');
const formEditProfile = document.forms['edit-form'];
const cardAddButton = document.querySelector('.profile__add-btn');
const profileEditPopup = document.querySelector('.popup-edit-profile');
const cardAddPopup = document.querySelector('.popup-add-card');
const popupAddCloseButton = document.querySelector('.popup__close-add');
const cardContainer = document.querySelector('.elements__list');
const imageShowPopup = document.querySelector('.popup-show-image');
const popupFullImage = document.querySelector('.popup__img');
const imageCloseButton = document.querySelector('.popup__close-img');
const popupImageTitle = document.querySelector('.popup__img-title');
const nameCardInput = document.querySelector('.form__input_type_title');
const linkCardInput = document.querySelector('.form__input_type_link');
const formAddElement = document.forms['add-card'];
const cardSubmitButton = document.querySelector('.form__btn-add');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  document.addEventListener('mousedown', closePopupOverlay);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  document.removeEventListener('mousedown', closePopupOverlay);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}
function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userInfo.textContent = userInfoInput.value;
  closePopup(profileEditPopup);
}

function createCard(data, templateSelector) {
  const newCard = new Card(data, templateSelector);
  return newCard.generateCard()
}

function addNewCard(newCard) {
  const recentCard = createCard(newCard, '#template-card');
  cardContainer.prepend(recentCard);
}
function renderCards(items) {
  items.forEach(addNewCard);
}



export function showImage(item) {
  openPopup(imageShowPopup);
  popupImageTitle.textContent = item.name;
  popupFullImage.setAttribute('src', item.link);
  popupFullImage.setAttribute('alt', item.name);
}
function submitAddCardForm(evt) {
  evt.preventDefault();
  const item = { name: nameCardInput.value, link: linkCardInput.value };
  addNewCard(item);
  closePopup(cardAddPopup);
  evt.target.reset();
}

profileEditButton.addEventListener('click', () => {
  openPopup(profileEditPopup);
  userNameInput.value = userName.textContent;
  userInfoInput.value = userInfo.textContent;
});
profileCloseButton.addEventListener('click', () => {
  closePopup(profileEditPopup);
});

cardAddButton.addEventListener('click', () => {
  openPopup(cardAddPopup);
});
popupAddCloseButton.addEventListener('click', () => {
  closePopup(cardAddPopup);
});

formEditProfile.addEventListener('submit', submitEditProfileForm);
renderCards(initialCards);
imageCloseButton.addEventListener('click', function () {
  closePopup(imageShowPopup);
});

formAddElement.addEventListener('submit', submitAddCardForm);



const validatorEditProfile = new FormValidator(formValidationSettings, formEditProfile);
const validatorAddCard = new FormValidator(formValidationSettings, formAddElement);

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();
