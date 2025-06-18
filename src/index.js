import "./index.css";
import { initialCards, openPopupImage, deleteCard, likeCard } from "./components/cards.js";
export { placesList, createCard };


const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template");


// создаем функцию для одной карточки
function createCard(initialCards, deleteCard, likeCard) {
  // создаем одну карточку и клонируем ее
  const initialCard = cardTemplate.content.cloneNode(true);

  const imageCard = initialCard.querySelector(".card__image");
  const titleCard = initialCard.querySelector(".card__title");

  imageCard.src = initialCards.link;
  imageCard.alt = initialCards.name;
  titleCard.textContent = initialCards.name;

  const likeButton = initialCard.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard); // Обработчик лайка

  const deleteButton = initialCard.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  // обработчик события для открытия попапа с изображением
  imageCard.addEventListener("click", () =>
    openPopupImage(imageCard.src, titleCard.textContent)
  );

  // возвращаем созданную одну карточку
  return initialCard;
};

// перебираем весь массив и выводим все карточки
initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard, likeCard);
  placesList.append(cardElement);
});
