import "./index.css";
import { initialCards, openPopupImage, deleteCard } from "./components/cards.js";
export { placesList, createCard };


const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template");


// создаем функцию для одной карточки
function createCard(initialCards, deleteCard) {
  // создаем одну карточку и клонируем ее
  const initialCard = cardTemplate.content.cloneNode(true);

  const imageCard = initialCard.querySelector(".card__image");
  const titleCard = initialCard.querySelector(".card__title");

  imageCard.src = initialCards.link;
  imageCard.alt = initialCards.name;
  titleCard.textContent = initialCards.name;

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
  const cardElement = createCard(card, deleteCard);
  placesList.append(cardElement);
});
