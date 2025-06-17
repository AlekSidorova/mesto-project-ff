import { openPopup } from "./modal"
export { openPopupImage, initialCards };

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

// находим попап изображения
const popupImage = document.querySelector('.popup__image');
// и надпись к нему
const popupCaption = document.querySelector('.popup__caption');

function openPopupImage(imageSrc, caption) {
  popupImage.src = imageSrc; // src для изображения
  popupCaption.textContent = caption; // подпись

  // попап открытия изображений
  const imagePopup = document.querySelector('.popup_type_image');
  openPopup(imagePopup); // открываем попап с изображением
};

