export { openPopup, closePopup, initializePopupCloseButtons, initializePopupClickOutside };


// функция для открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
};

// функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose); // закрытие с помощью Esc
};

// Функция обработки нажатия клавиши Esc
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    // проверяем, нажата ли клавиша Esc
    const activePopup = document.querySelector(".popup_is-opened");
    if (activePopup) {
      closePopup(activePopup);
    };
  };
};

// Закрытие попапов по кнопкам закрытия
function initializePopupCloseButtons() {
  const closeButtons = document.querySelectorAll(".popup__close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const popup = button.closest(".popup");
      closePopup(popup);
    });
  });
}

// Закрытие попапа по клику вне его контента 
function initializePopupClickOutside() {
  document.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(evt.target);
    }
  });
} 