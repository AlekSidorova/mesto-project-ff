// место, куда эти карточки класть
const placesList = document.querySelector('.places__list');

// находим сам шаблон
const cardTemplate = document.querySelector('#card-template');

// функция для удаления карточки
function deleteCard(evt) {
  // находим ближайшего родителя
  const cardDelete = evt.target.closest('.card');
  if (cardDelete) {
    // удаляем карточку
    cardDelete.remove();
  }
};

// создаем функцию для одной карточки
function createCard(initialCards){
  // создаем одну карточку и клонируем ее
  const initialCard = cardTemplate.content.cloneNode(true);

  // находим данные, которые нужно поменять
  const imageCard = initialCard.querySelector('.card__image');
  const titleCard = initialCard.querySelector('.card__title');

  // находим кнопку удаления
  const deleteButton = initialCard.querySelector('.card__delete-button');

  // меняем данные
  imageCard.src = initialCards.link; 
  titleCard.textContent = initialCards.name;

  // добавляем обработчик на кнопку удаления
  deleteButton.addEventListener('click', deleteCard);

  // ставим карточку в общий список
  placesList.append(initialCard);
};

// перебираем весь массив и выводим все карточки
initialCards.forEach(createCard);


