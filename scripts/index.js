// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу\


// добавлен слушатель на кнопку с плюсиком
const buttonAdd = document.querySelector('.profile__add-button')

buttonAdd.addEventListener('click', function (evt) {
  console.log('нажалась кнопка с плюсиком', evt.type);
});

// место, где должны быть карточки
const placesList = document.querySelector('.places__list');
// функция для КАРТОЧЕК и КУДА
function uploadingCards (initialCards, container) {
  console.log(initialCards);
};
uploadingCards(initialCards, placesList);

