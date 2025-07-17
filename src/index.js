import "./index.css";

import { createCard } from "./components/cards.js";
import { openPopup, closePopup, initializePopupCloseButtons, initializePopupClickOutside } from "./components/modal.js";
import { enableValidation, resetValidationErrors, clearValidation } from "./components/validation.js";
import { loadUserInfo, getCards, editingProfile, addingNewCard, updateAvatar } from "./components/api.js"

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
const buttonElement = formElementEdit.querySelector(".popup__button");

const formElementAdd = document.querySelector('form[name="new-place"]'); // сама форма
const placeName = formElementAdd.querySelector('input[name="place-name"]'); // "Название"
const linkInput = formElementAdd.querySelector('input[name="link"]'); // "Ссылка на картинку"
const buttonElementAdd = formElementAdd.querySelector(".popup__button");

let userData;

// аватар
const profileImageContainer = document.querySelector('.profile__image-container');
const avatarPopup = document.querySelector('.popup_type_avatar');
const urlInput = document.getElementById('avatar-url-input'); 
const formElementAvatar = document.querySelector('form[name="edit-avatar"]');

// Функция для загрузки данных о пользователе и карточках
const loadData = () => {
  Promise.all([loadUserInfo(), getCards()])
    .then(([userData, cards]) => {
      if (!userData || !Array.isArray(cards)) {
        throw new Error("Не удалось загрузить данные пользователя или карточки.");
      }

      // Устанавливаем данные пользователя на странице
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      document.querySelector('.profile__image').src = userData.avatar;

      // Перебираем массив карточек и отображаем их
      cards.forEach(card => {
        const cardElement = createCard(
          {
            name: card.name,
            link: card.link,
            likes: card.likes,
            _id: card._id,
            owner: card.owner 
          },
          userData._id
        );
        
        // Добавляем обработчик для открытия попапа
        const imageCard = cardElement.querySelector(".card__image");
        imageCard.addEventListener("click", () => {
          openPopupImage(card.link, card.name, card.name);
        });

        placesList.append(cardElement);
      });
    })
    .catch(err => {
      console.error("Ошибка загрузки данных:", err);
    });
};

// открытие попапа с изображением
function openPopupImage(imageSrc, imageAlt, caption) {
  popupImage.src = imageSrc; // src для изображения
  popupImage.alt = imageAlt; // alt
  popupCaption.textContent = caption; // подпись

  openPopup(imagePopup);
}

// Открытие попапа добавления новой карточки
openAddPopupButton.addEventListener("click", () => {
  placeName.value = '';
  linkInput.value = '';
  clearValidation(formElementAdd, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled'
  });

  buttonElementAdd.disabled = true; // Делаем кнопку неактивной
  buttonElementAdd.classList.add('popup__button_disabled'); // Добавляем класс для визуального эффекта

  openPopup(addPopup);
});

// Открытие попапа редактирования профиля
openEditPopupButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent; // заполняем поле "Имя"
  descriptionInput.value = profileDescription.textContent; // заполняем поле "Занятие"
  clearValidation(formElementEdit, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
  });

  buttonElement.disabled = false; // Делаем кнопку активной
  buttonElement.classList.remove('popup__button_disabled'); // Убираем класс для визуального эффекта

  openPopup(editPopup);
});


// Обработчик «отправки» формы редактирования профиля
function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value; // Получаем новое имя из поля
  const newAbout = descriptionInput.value; // Получаем новое описание

  // Вызов функции редактирования профиля
  editingProfile(newName, newAbout)
    .then(data => {
      // Если все прошло успешно, обновляем данные на странице
      profileName.textContent = data.name; // Обновляем имя
      profileDescription.textContent = data.about; // Обновляем описание
      document.querySelector('.profile__image').src = data.avatar; // Обновляем аватар

      closePopup(editPopup); // Закрываем попап
    })
    .catch(err => {
      console.error("Ошибка редактирования профиля:", err); // Обработка ошибок
    });
};
formElementEdit.addEventListener("submit", handleEditProfileSubmit);

// Обработчик «отправки» формы добавления новой карточки
function handleNewPlaceSubmit(evt) {
  evt.preventDefault();

  const placeNameValue = placeName.value; 
  const linkInputValue = linkInput.value; 

  addingNewCard(placeNameValue, linkInputValue)
    .then(data => {
      const ownerId = data.owner ? data.owner._id : userData._id;

      const newCardElement = createCard(
        {
          name: data.name,
          link: data.link,
          likes: data.likes || [], 
          _id: data._id, 
          owner: data.owner || { _id: ownerId }
        },
        ownerId
      );

      // Добавьте обработчик клика для новой карточки
      const imageCard = newCardElement.querySelector(".card__image");
      imageCard.addEventListener("click", () => {
        openPopupImage(data.link, data.name, data.name);
      });

      placesList.prepend(newCardElement);

      closePopup(addPopup);
      formElementAdd.reset();
      resetValidationErrors(formElementAdd, buttonElementAdd);
    })
    .catch(err => {
      console.error("Ошибка добавления карточки:", err);
    });
}
formElementAdd.addEventListener("submit", handleNewPlaceSubmit);

// Обработчик клика по аватару
profileImageContainer.addEventListener('click', () => {
  openPopup(avatarPopup);
  urlInput.value = ''; // Очищаем поле URL
  clearValidation(formElementAvatar, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled'
  }); 
  formElementAvatar.reset();
});

// Обработчик отправки формы
formElementAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault(); 

  const newAvatarUrl = urlInput.value; 
  
  // Вызов функции обновления аватара из api.js
  updateAvatar(newAvatarUrl)
    .then(data => {
      document.querySelector('.profile__image').style.backgroundImage = `url(${data.avatar})`; // Обновляем аватар на странице
      closePopup(avatarPopup); // Закрываем попап
    })
    .catch(err => {
      console.error("Ошибка обновления аватара:", err); // Обработка ошибо
    });

});



initializePopupCloseButtons();
initializePopupClickOutside();

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});


// Вызов функции для загрузки информации
loadData();
