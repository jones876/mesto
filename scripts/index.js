

const editProfileBtn = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
editProfileBtn.addEventListener('click', function(){
  popup.classList.add('popup_opened');
});

const closeEditBtn = document.querySelector('.form__close-btn');
closeEditBtn.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

const userName = document.querySelector('.profile__name');
const inputUserName = document.querySelector('.form__input-name');
inputUserName.value = userName.textContent;
const userInfo = document.querySelector('.profile__description');
const inputUserInfo = document.querySelector('.form__input-info');
inputUserInfo.value = userInfo.textContent;

const formElement = document.querySelector('.form');
function handleFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = inputUserName.value;
  userInfo.textContent = inputUserInfo.value
  popup.classList.remove('popup_opened');
}
formElement.addEventListener('submit', handleFormSubmit);
