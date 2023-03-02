const profileEditButton = document.querySelector(".profile__edit-btn");
const popupCloseButton = document.querySelector(".popup__close-btn");
const userName = document.querySelector(".profile__name");
const userNameInput = document.querySelector(".form__input_type_name");
const userInfo = document.querySelector(".profile__description");
const userInfoInput = document.querySelector(".form__input_type_info");
const formEditProfile = document.querySelector(".form");
const addCardButton = document.querySelector(".profile__add-btn");
const profileEditPopup = document.querySelector(".popup-edit-profile");
const addCardPopup = document.querySelector(".popup-add-card");
const popupAddCloseButton = document.querySelector(".popup__close-add");
const cardContainer = document.querySelector(".elements__list");
const showImagePopup = document.querySelector(".popup-show-image");
const popupFullImage = document.querySelector(".popup__img");
const imageCloseButton = document.querySelector(".popup__close-img");
const popupImageTitle = document.querySelector(".popup__img-title");
const nameCardInput = document.querySelector(".form__input_type_title");
const linkCardInput = document.querySelector(".form__input_type_link");
const formAddElement = document.querySelector(".form-add");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
function submitEditProfileForm(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userInfo.textContent = userInfoInput.value;
  closePopup(profileEditPopup);
}
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
  cardImage.addEventListener("click", function () {
    showImage(item);
  });
  const likeButton = newCard.querySelector(".elements__like-btn");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("elements__like-btn_active");
  });
  const deleteCardButton = newCard.querySelector(".elements__del-btn");
  deleteCardButton.addEventListener("click", () => {
    newCard.remove();
  });
  return newCard;
}

function addNewCard(newCard) {
  const recentCard = createCard(newCard);
  cardContainer.prepend(recentCard);
}
function renderCards(items) {
  items.forEach(addNewCard);
}

function showImage(item) {
  openPopup(showImagePopup);
  popupImageTitle.textContent = item.name;
  popupFullImage.setAttribute("src", item.link);
  popupFullImage.setAttribute("alt", item.name);
}
function submitAddCardForm(evt) {
  evt.preventDefault();
  const item = { name: nameCardInput.value, link: linkCardInput.value };
  addNewCard(item);
  closePopup(addCardPopup);
  evt.target.reset();
}

profileEditButton.addEventListener("click", () => {
  openPopup(profileEditPopup);
  userNameInput.value = userName.textContent;
  userInfoInput.value = userInfo.textContent;
});
popupCloseButton.addEventListener("click", () => {
  closePopup(profileEditPopup);
});

addCardButton.addEventListener("click", () => {
  openPopup(addCardPopup);
});
popupAddCloseButton.addEventListener("click", () => {
  closePopup(addCardPopup);
});

formEditProfile.addEventListener("submit", submitEditProfileForm);
renderCards(initialCards);
imageCloseButton.addEventListener("click", function () {
  closePopup(showImagePopup);
});

formAddElement.addEventListener("submit", submitAddCardForm);
