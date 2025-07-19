import "./index.css";

import { createCard } from "./components/card.js";
import { openPopup, closePopup, initializePopupCloseButtons, initializePopupClickOutside } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
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
const descriptionInput = formElementEdit.querySelector('input[name="description"]');

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const buttonElementEdit = formElementEdit.querySelector(".popup__button");

const formElementAdd = document.querySelector('form[name="new-place"]');
const placeName = formElementAdd.querySelector('input[name="place-name"]');
const linkInput = formElementAdd.querySelector('input[name="link"]');
const buttonElementAdd = formElementAdd.querySelector(".popup__button");

const profileImageContainer = document.querySelector('.profile__image-container');
const avatarPopup = document.querySelector('.popup_type_avatar');
const urlInput = document.getElementById('avatar-url-input');
const formElementAvatar = document.querySelector('form[name="edit-avatar"]');
const buttonElementAvatar = formElementAvatar.querySelector(".popup__button");

// Функция для загрузки данных о пользователе и карточках
const loadData = () => {
  Promise.all([loadUserInfo(), getCards()])
    .then(([userData, cards]) => {
      if (!userData || !Array.isArray(cards)) {
        throw new Error("Не удалось загрузить данные пользователя или карточки.");
      }

      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      document.querySelector('.profile__image').src = userData.avatar;

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

// Открытие попапа с изображением
function openPopupImage(imageSrc, imageAlt, caption) {
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = caption;

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

  openPopup(addPopup);
});

// Открытие попапа редактирования профиля
openEditPopupButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(formElementEdit, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
  });

  buttonElementEdit.disabled = false;
  buttonElementEdit.classList.remove('popup__button_disabled');

  openPopup(editPopup);
});

// Обработчик «отправки» формы редактирования профиля
function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  buttonElementEdit.textContent = "Сохранение...";

  const newName = nameInput.value;
  const newAbout = descriptionInput.value;

  editingProfile(newName, newAbout)
    .then(data => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      document.querySelector('.profile__image').src = data.avatar;

      closePopup(editPopup);
      buttonElementEdit.textContent = "Сохранить";
    })
    .catch(err => {
      console.error("Ошибка редактирования профиля:", err);
      buttonElementEdit.textContent = "Сохранить";
    });
}
formElementEdit.addEventListener("submit", handleEditProfileSubmit);

// Обработчик «отправки» формы добавления новой карточки
function handleNewPlaceSubmit(evt) {
  evt.preventDefault();

  buttonElementAdd.textContent = "Сохранение...";

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

      const imageCard = newCardElement.querySelector(".card__image");
      imageCard.addEventListener("click", () => {
        openPopupImage(data.link, data.name, data.name);
      });

      placesList.prepend(newCardElement);

      closePopup(addPopup);
      formElementAdd.reset();
      clearValidation(formElementAvatar, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled'
      });
      buttonElementAdd.textContent = "Сохранить";
    })
    .catch(err => {
      console.error("Ошибка добавления карточки:", err);
      buttonElementAdd.textContent = "Сохранить";
    });
}
formElementAdd.addEventListener("submit", handleNewPlaceSubmit);

// Обработчик клика по аватару
profileImageContainer.addEventListener('click', () => {
  openPopup(avatarPopup);
  urlInput.value = '';
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

  buttonElementAvatar.textContent = "Сохранение...";

  const newAvatarUrl = urlInput.value;

  updateAvatar(newAvatarUrl)
    .then(data => {
      document.querySelector('.profile__image').style.backgroundImage = `url(${data.avatar})`;
      closePopup(avatarPopup);
      buttonElementAvatar.textContent = "Сохранить";
    })
    .catch(err => {
      console.error("Ошибка обновления аватара:", err);
      buttonElementAvatar.textContent = "Сохранить";
    });
});

// Загрузка данных пользователя при инициализации
loadUserInfo()
  .then(data => {
    document.querySelector('.profile__image').style.backgroundImage = `url(${data.avatar})`;
  })
  .catch(err => {
    console.error("Ошибка загрузки информации о пользователе:", err);
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


loadData();
