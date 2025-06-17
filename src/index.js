import "./index.css";
import initialCards from "./components/cards";

// место, куда эти карточки класть
const placesList = document.querySelector(".places__list");

// находим сам шаблон
const cardTemplate = document.querySelector("#card-template");

// функция для удаления карточки
function deleteCard(evt) {
  const cardDelete = evt.target.closest(".card");
  if (cardDelete) {
    cardDelete.remove();
  }
}

// создаем функцию для одной карточки
function createCard(initialCards, deleteCard) {
  // создаем одну карточку и клонируем ее
  const initialCard = cardTemplate.content.cloneNode(true);

  // находим данные и меняем
  const imageCard = initialCard.querySelector(".card__image");
  const titleCard = initialCard.querySelector(".card__title");
  imageCard.src = initialCards.link;
  imageCard.alt = initialCards.name;
  titleCard.textContent = initialCards.name;

  const deleteButton = initialCard.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  // Добавляем обработчик события для открытия попапа с изображением
  imageCard.addEventListener("click", () =>
    openPopupImage(imageCard.src, titleCard.textContent)
  );

  // возвращаем созданную одну карточку
  return initialCard;
}

// перебираем весь массив и выводим все карточки
initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard);
  placesList.append(cardElement);
});


// то, что ниже, перейдет в файл modal.js

// кнопка "редактировать"
const openEditPopupButton = document.querySelector(".profile__edit-button");
// кнопка "+"
const openAddPopupButton = document.querySelector(".profile__add-button");
// закрытие попапа
const closeButtons = document.querySelectorAll(".popup__close");

// попап редактирования
const editPopup = document.querySelector(".popup_type_edit");
// попап добавления контента
const addPopup = document.querySelector(".popup_type_new-card");
// попап открытия изображений
const imagePopup = document.querySelector(".popup_type_image");

// функция для открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");

  document.addEventListener("keydown", buttonEsc); // открытие с помощью Esc
}
// функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  /* popup.classList.remove('popup_is-animated'); */

  document.removeEventListener("keydown", buttonEsc); // закрытие с помощью Esc
}

// Открытие попапа редактирования профиля
openEditPopupButton.addEventListener("click", () => {
  openPopup(editPopup);
});

// Открытие попапа добавления новой карточки
openAddPopupButton.addEventListener("click", () => {
  openPopup(addPopup);
});

// Закрытие попапов по кнопкам закрытия
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

// Закрытие попапа по клику вне его контента
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.target);
  }
});

// Функция обработки нажатия клавиши Esc
function buttonEsc(evt) {
  if (evt.key === "Escape") {
    // проверяем, нажата ли клавиша Esc
    const activePopup = document.querySelector(".popup_is-opened");
    if (activePopup) {
      closePopup(activePopup);
    }
  }
}


// то, что ниже, перейдет в файл card.js

// находим попап изображения
const popupImage = document.querySelector('.popup__image');
// и надпись к нему
const popupCaption = document.querySelector('.popup__caption');


function openPopupImage(imageSrc, caption) {
  popupImage.src = imageSrc; // устанавливаем src для изображения
  popupCaption.textContent = caption; // устанавливаем подпись

  const imagePopup = document.querySelector('.popup_type_image');
  openPopup(imagePopup); // Открываем попап с изображением
}