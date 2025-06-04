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


  // возвращаем созданную одну карточку
  return initialCard;
}

// перебираем весь массив и выводим все карточки
initialCards.forEach(card => {
  const cardElement = createCard(card, deleteCard);
  placesList.append(cardElement);
});

