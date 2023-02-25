const editProfileBtn = document.querySelector(".profile__edit-btn");
const popup = document.querySelector(".popup");
const closeEditBtn = document.querySelector(".popup__close-btn");
const userName = document.querySelector(".profile__name");
const inputUserName = document.querySelector(".form__input_type_name");
const userInfo = document.querySelector(".profile__description");
const inputUserInfo = document.querySelector(".form__input_type_info");
const formElement = document.querySelector(".form");
const addCardBtn = document.querySelector(".profile__add-btn");
const editProf = document.querySelector(".popup-edit-profile");
const addCard = document.querySelector(".popup-add-card");
const closeAddBtn = document.querySelector(".popup__close-add");
const cardContainer = document.querySelector(".elements__list");
const showImg = document.querySelector(".popup__show-image");
const fullImg = document.querySelector(".popup__img");
const closeImgBtn = document.querySelector(".popup__close-img");
const imgTitle = document.querySelector(".popup__img-title");
const inputCardName = document.querySelector(".form__input_type_title");
const inputCardLink = document.querySelector(".form__input_type_link");
const formElementAdd = document.querySelector(".form__add");

addCardBtn.addEventListener("click", () => {
  openPopup(addCard);
});
closeAddBtn.addEventListener("click", () => {
  closePopup(addCard);
});
function openPopup(evt) {
  evt.classList.add("popup_opened");
  inputUserName.value = userName.textContent;
  inputUserInfo.value = userInfo.textContent;
};

editProfileBtn.addEventListener("click", () => {
  openPopup(editProf);
});

function closePopup(evt) {
  evt.classList.remove("popup_opened");
};

closeEditBtn.addEventListener("click", () => {
  closePopup(editProf);
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = inputUserName.value;
  userInfo.textContent = inputUserInfo.value;
  closePopup(editProf);
};
formElement.addEventListener("submit", handleFormSubmit);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];


function createCard(item) {
  const cardTemplate = document
    .querySelector("#template-card")
    .content.cloneNode(true);
  const newCard = cardTemplate.querySelector(".elements__item");
  const cardTitle = newCard.querySelector(".elements__title");
  cardTitle.textContent = item.name;
  const cardImage = newCard.querySelector(".elements__image");
  cardImage.setAttribute("src", item.link);
  cardImage.setAttribute("alt", item.name);
  const deleteBtn = newCard.querySelector(".elements__del-btn");
  cardImage.addEventListener("click", function () {
    showImage(item);
  });
  const likeBtn = newCard.querySelector(".elements__like-btn");
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("elements__like-btn_active");
  });
  const delCardBtn = newCard.querySelector(".elements__del-btn");
  delCardBtn.addEventListener("click", () => {
    newCard.remove();
  });
  return newCard;
};

function renderCards(items) {
  items.forEach(addNewCard);
};

renderCards(initialCards);

function addNewCard(newCard) {
  const anotherCard = createCard(newCard);
  cardContainer.prepend(anotherCard);
};


function showImage(item) {
  openPopup(showImg);
  imgTitle.textContent = item.name;
  fullImg.setAttribute("src", item.link);
  fullImg.setAttribute("alt", item.name);
};

closeImgBtn.addEventListener("click", function () {
  closePopup(showImg);
});


function addFormSubmit(evt) {
  evt.preventDefault();
  const item = { name: inputCardName.value, link: inputCardLink.value };
  addNewCard(item);
  closePopup(addCard);
};

formElementAdd.addEventListener("submit", addFormSubmit);
