import { openPopup, closePopup } from "./modal";
import { placesList, createCard } from "../index";
export { openPopupImage, initialCards, deleteCard };


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
    }
];

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const formElementAdd = document.querySelector('form[name="new-place"]'); // сама форма 
const nameInput = formElementAdd.querySelector('input[name="place-name"]'); // "Название"
const linkInput = formElementAdd.querySelector('input[name="link"]'); // "Ссылка на картинку"

// функция для удаления карточки
function deleteCard(evt) {
  const cardDelete = evt.target.closest(".card");
    cardDelete.remove();
};

function openPopupImage(imageSrc, caption) {
  popupImage.src = imageSrc; // src для изображения
  popupCaption.textContent = caption; // подпись

  // попап открытия изображений
  const imagePopup = document.querySelector('.popup_type_image');
  openPopup(imagePopup); // открываем попап с изображением
};


// новая карточка
formElementAdd.addEventListener('submit', (evt) => {
    evt.preventDefault(); 

    // берем значения из полей
    const initialCards = {
        name: nameInput.value, 
        link: linkInput.value 
    };

    // создаем карточку и добавляем её 
    const newCardElement = createCard(initialCards, deleteCard);
    placesList.prepend(newCardElement); 
  
    closePopup(document.querySelector('.popup_type_new-card'));
    formElementAdd.reset(); // очищаем поля 
});