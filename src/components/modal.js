export { openPopup, closePopup, handleFormSubmit };


// функция для открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", buttonEsc);
};

// функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", buttonEsc); // закрытие с помощью Esc
};

// Обработчик «отправки» формы
function handleFormSubmit(evt, profileName, profileDescription, nameInput, descriptionInput, editPopup) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  // Закрываем попап
  closePopup(editPopup);
}

// Закрытие попапов по кнопкам закрытия
const closeButtons = document.querySelectorAll(".popup__close");
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



