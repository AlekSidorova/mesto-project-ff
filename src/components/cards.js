import { initialCards } from "./image";
import { closePopup, openPopupImage } from "./modal";
import { placesList } from "../index";

export { createCard, openPopupImage, initialCards, deleteCard, likeCard };


const formElementAdd = document.querySelector('form[name="new-place"]'); // сама форма

// создаем функцию для одной карточки
function createCard(initialCards, deleteCard, likeCard) {
  // создаем одну карточку и клонируем ее
  const cardTemplate = document.querySelector("#card-template");
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
}

// функция для удаления карточки
function deleteCard(evt) {
  const cardDelete = evt.target.closest(".card");
  cardDelete.remove();
}

// Функция для лайка карточки
function likeCard(evt) {
  const cardLike = evt.target;
  cardLike.classList.toggle("card__like-button_is-active");
}

// новая карточка
formElementAdd.addEventListener("submit", (evt) => {
  const nameInput = formElementAdd.querySelector('input[name="place-name"]'); // "Название"
  const linkInput = formElementAdd.querySelector('input[name="link"]'); // "Ссылка на картинку"

  evt.preventDefault();

  // берем значения из полей
  const initialCards = {
    name: nameInput.value,
    link: linkInput.value,
  };

  // создаем карточку и добавляем её
  const newCardElement = createCard(initialCards, deleteCard, likeCard);
  placesList.prepend(newCardElement);

  closePopup(document.querySelector(".popup_type_new-card"));
  formElementAdd.reset(); // очищаем поля
});
