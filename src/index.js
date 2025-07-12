import "./index.css";

import {
  initialCards,
  createCard,
  deleteCard,
  likeCard,
} from "./components/cards.js";
import { openPopup, closePopup, initializePopupCloseButtons, initializePopupClickOutside } from "./components/modal.js";
import { resetValidationErrors, enableValidation} from "./components/validation.js"

const placesList = document.querySelector(".places__list");

const openAddPopupButton = document.querySelector(".profile__add-button");
const openEditPopupButton = document.querySelector(".profile__edit-button");

const addPopup = document.querySelector(".popup_type_new-card");
const editPopup = document.querySelector(".popup_type_edit");

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const formElementEdit = document.querySelector('form[name="edit-profile"]');
const nameInput = formElementEdit.querySelector('input[name="name"]');
const descriptionInput = formElementEdit.querySelector(
  'input[name="description"]'
);
const profileName = document.querySelector(".profile__title"); // Элемент для имени профиля
const profileDescription = document.querySelector(".profile__description"); // Элемент для занятия

const formElementAdd = document.querySelector('form[name="new-place"]'); // сама форма
const placeName = formElementAdd.querySelector('input[name="place-name"]'); // "Название"
const linkInput = formElementAdd.querySelector('input[name="link"]'); // "Ссылка на картинку"


// перебираем весь массив и выводим все карточки
initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard, likeCard, openPopupImage);
  placesList.append(cardElement);
});


// открытие попапа с изображением
function openPopupImage(imageSrc, imageAlt, caption) {
  popupImage.src = imageSrc; // src для изображения
  popupImage.alt = imageAlt; // alt
  popupCaption.textContent = caption; // подпись

  openPopup(imagePopup);
}

// Открытие попапа добавления новой карточки
openAddPopupButton.addEventListener("click", () => {
  openPopup(addPopup);
});

// Открытие попапа редактирования профиля
openEditPopupButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent; // заполняем поле "Имя"
  descriptionInput.value = profileDescription.textContent; // заполняем поле "Занятие"
  openPopup(editPopup);
  resetValidationErrors();
});


// Обработчик «отправки» формы редактирования профиля
function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  // Закрываем попап
  closePopup(editPopup);
};
formElementEdit.addEventListener("submit", handleEditProfileSubmit);

// Обработчик «отправки» формы добавления новой карточки
function handleNewPlaceSubmit(evt) {
  evt.preventDefault();

  // берем значения из полей
  const initialCard = {
    name: placeName.value,
    link: linkInput.value,
  };

  // создаем карточку и добавляем её
  const newCardElement = createCard(
    initialCard,
    deleteCard,
    likeCard,
    openPopupImage
  );
  placesList.prepend(newCardElement);

  closePopup(addPopup);
  formElementAdd.reset(); // очищаем поля
};
formElementAdd.addEventListener("submit", handleNewPlaceSubmit);

initializePopupCloseButtons();
initializePopupClickOutside();

enableValidation();