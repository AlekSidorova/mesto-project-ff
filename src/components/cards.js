export { createCard, deleteCard, likeCard };


const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];


// создаем функцию для одной карточки
function createCard(initialCard, deleteCard, likeCard, openPopupImage) { 
  // создаем одну карточку и клонируем ее
  const cardTemplate = document.querySelector("#card-template");
  const elementCard = cardTemplate.content.querySelector(".card").cloneNode(true); 

  const imageCard = elementCard.querySelector(".card__image");
  const titleCard = elementCard.querySelector(".card__title");

  imageCard.src = initialCard.link; 
  imageCard.alt = initialCard.name; 
  titleCard.textContent = initialCard.name; 

  const likeButton = elementCard.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard); 

  const deleteButton = elementCard.querySelector(".card__delete-button"); 
  deleteButton.addEventListener("click", deleteCard);
  
  // Обработчик события для открытия попапа с изображением
  imageCard.addEventListener("click", () =>
    openPopupImage(imageCard.src, imageCard.alt, titleCard.textContent)
  );

  return elementCard; 
};

// функция для удаления карточки
function deleteCard(evt) {
  const cardDelete = evt.target.closest(".card");
  cardDelete.remove();
};

// Функция для лайка карточки
function likeCard(evt) {
  const cardLike = evt.target;
  cardLike.classList.toggle("card__like-button_is-active");
};


