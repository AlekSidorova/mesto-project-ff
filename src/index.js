import "./index.css";
import { initialCards } from "./components/image.js";
import { openPopup } from "./components/modal.js";
import { createCard, deleteCard, likeCard } from "./components/cards.js";

export { placesList };


const placesList = document.querySelector(".places__list");
const openAddPopupButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");

// перебираем весь массив и выводим все карточки
initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard, likeCard);
  placesList.append(cardElement);
});

// Открытие попапа добавления новой карточки
openAddPopupButton.addEventListener("click", () => {
  openPopup(addPopup);
});
