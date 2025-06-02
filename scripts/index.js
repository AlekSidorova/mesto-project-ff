// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу\


// добавлен слушатель на кнопку с плюсиком
const buttonAdd = document.querySelector('.profile__add-button');

buttonAdd.addEventListener('click', function (evt) {
  console.log('нажалась кнопка с плюсиком', evt.type);
});


// место, где должны быть карточки
const placesList = document.querySelector('.places__list');

// находим шаблон
const cardTemplate = document.querySelector('#card-template');

// перебираем ВЕСЬ массив
initialCards.forEach(function (initialCards) {
  // клонируем содержимое шаблона
  const cardItem = cardTemplate.content.cloneNode(true);
  // Заполняем данные
  const imageCard = cardItem.querySelector('.card__image');
  const titleCard = cardItem.querySelector('.card__title');
 // меняем данные
  imageCard.src = initialCards.link; 
  titleCard.textContent = initialCards.name; 

  // Добавляем карточку в общий список
  placesList.appendChild(cardItem);
  });


/* // функция для ОДНОЙ карточки 
function uploadingOneCard (initialCard) {

  const li = document.createElement('li');
  li.classList.add('places__item', 'card');
  // создание карточки
  li.innerHTML = `
    <img class="card__image" src="${initialCard.link}" alt="" />
    <button type="button" class="card__delete-button"></button>
    <div class="card__description">
      <h2 class="card__title">
      ${initialCard.name}
      </h2>
      <button type="button" class="card__like-button"></button>
    </div>`
  return li;
};

// функция для вывода карточек
function appendCards (initialCard, placesList) {
  placesList.append(initialCard);
}; 

// функция для КАРТОЧЕК и КУДА
function uploadingCards (initialCards, placesList) {
  // перебираем ВСЕ карточки
  initialCards.forEach(initialCard => {
    const card = uploadingOneCard (initialCard);
    // вызываем функцию ВЫВОДА КАРТОЧЕК
    appendCards(card, placesList);
  });
};
uploadingCards(initialCards, placesList); 
 */