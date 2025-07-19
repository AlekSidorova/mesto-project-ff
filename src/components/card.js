import { toggleLike, deleteCard } from './api.js';


function createCard(initialCard, userId) {
  const cardTemplate = document.querySelector("#card-template");
  const elementCard = cardTemplate.content.querySelector(".card").cloneNode(true);

  const imageCard = elementCard.querySelector(".card__image");
  const titleCard = elementCard.querySelector(".card__title");
  const likeButton = elementCard.querySelector(".card__like-button");
  const likeCount = elementCard.querySelector(".card__like-count");
  const deleteButton = elementCard.querySelector(".card__delete-button");

  imageCard.src = initialCard.link;
  imageCard.alt = initialCard.name;
  titleCard.textContent = initialCard.name;

  // Устанавливаем количество лайков
  likeCount.textContent = initialCard.likes.length;

  // Проверка лайков
  const isLiked = initialCard.likes.some(user => user._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active"); // Меняем цвет сердечка
  }

  // Скрываем кнопку удаления, если карточка не ваша
  deleteButton.style.display = (initialCard.owner._id === userId) ? 'block' : 'none';

  // Обработчик события для лайка карточки
  likeButton.addEventListener("click", () => {
    const isCurrentlyLiked = likeButton.classList.contains("card__like-button_is-active");
    toggleLike(initialCard._id, !isCurrentlyLiked)
      .then(updatedCard => {
        // Обновляем количество лайков и состояние сердечка
        likeCount.textContent = updatedCard.likes.length; 

        // Смена цвета сердечка
        if (isCurrentlyLiked) {
          likeButton.classList.remove("card__like-button_is-active"); // Убираем активный класс
        } else {
          likeButton.classList.add("card__like-button_is-active"); // Добавляем активный класс
        }
      })
      .catch(err => {
        console.error("Ошибка при обработке лайка:", err);
      });
  });

  // Обработчик для кнопки удаления карточки
  deleteButton.addEventListener("click", () => {
    if (confirm("Вы уверены?")) {
      openDeleteCardPopup(initialCard._id, elementCard);
    }
  });

  return elementCard;
};

function openDeleteCardPopup(cardId, cardElement) {
  deleteCard(cardId) 
    .then(() => {
      cardElement.remove(); 
    })
    .catch(err => {
      console.error("Ошибка удаления карточки:", err); 
      alert("Не удалось удалить карточку. Попробуйте еще раз."); 
    });
};


export { createCard, openDeleteCardPopup};