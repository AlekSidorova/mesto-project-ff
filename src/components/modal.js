export { openPopup };

// кнопка "редактировать"
const openEditPopupButton = document.querySelector(".profile__edit-button");
// кнопка "+"
const openAddPopupButton = document.querySelector(".profile__add-button");
// кнопка закрытие попапа
const closeButtons = document.querySelectorAll(".popup__close");

// попап редактирования
const editPopup = document.querySelector(".popup_type_edit");
// попап добавления контента
const addPopup = document.querySelector(".popup_type_new-card");

// функция для открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");

  document.addEventListener("keydown", buttonEsc); 
};
// функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.remove('popup_is-animated');

  document.removeEventListener("keydown", buttonEsc); // закрытие с помощью Esc
}

// Открытие попапа редактирования профиля
openEditPopupButton.addEventListener("click", () => {
  openPopup(editPopup);
});

// Открытие попапа добавления новой карточки
openAddPopupButton.addEventListener("click", () => {
  openPopup(addPopup);
});

// Закрытие попапов по кнопкам закрытия
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

// Закрытие попапа по клику вне его контента
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.target);
  }
});

// Функция обработки нажатия клавиши Esc
function buttonEsc(evt) {
  if (evt.key === "Escape") {
    // проверяем, нажата ли клавиша Esc
    const activePopup = document.querySelector(".popup_is-opened");
    if (activePopup) {
      closePopup(activePopup);
    };
  };
};
