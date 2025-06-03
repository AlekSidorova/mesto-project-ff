// место, куда эти карточки класть
const placesList = document.querySelector('.places__list');

// находим сам шаблон
const cardTemplate = document.querySelector('#card-template');

// создаем функцию для одной карточки
function card(initialCards){
  // создаем одну карточку и клонируем ее
  const initialCard = cardTemplate.content.cloneNode(true);

  // находим данные, которые нужно поменять
  const imageCard = initialCard.querySelector('.card__image');
  const titleCard = initialCard.querySelector('.card__title');

  // меняем данные
  imageCard.src = initialCards.link; 
  titleCard.textContent = initialCards.name;

  // Добавляем карточку в общий список
  placesList.append(initialCard);
};

// перебираем весь массив 
initialCards.forEach(card);