

const editProfileBtn = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const closeEditBtn = document.querySelector('.popup__close-btn');
const userName = document.querySelector('.profile__name');
const inputUserName = document.querySelector('.form__input_type_name');
const userInfo = document.querySelector('.profile__description');
const inputUserInfo = document.querySelector('.form__input_type_info');
const formElement = document.querySelector('.form');

function openPopup(){
  popup.classList.add('popup_opened');
  inputUserName.value = userName.textContent;
  inputUserInfo.value = userInfo.textContent;
}

editProfileBtn.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}

closeEditBtn.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = inputUserName.value;
  userInfo.textContent = inputUserInfo.value;
  closePopup();
}
formElement.addEventListener('submit', handleFormSubmit);
