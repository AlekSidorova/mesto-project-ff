export { openPopup };

const openEditPopupButton = document.querySelector(".profile__edit-button");
const openAddPopupButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");

const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");

const formElementEdit = document.querySelector('form[name="edit-profile"]');
const nameInput = formElementEdit.querySelector('input[name="name"]');
const descriptionInput = formElementEdit.querySelector('input[name="description"]');

const profileName = document.querySelector(".profile__title"); // Элемент для имени профиля
const profileDescription = document.querySelector(".profile__description"); // Элемент для занятия

const formElementAdd = document.querySelector('form[name="new-place"]');


// функция для открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");

  document.addEventListener("keydown", buttonEsc);
}
// функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.remove("popup_is-animated");

  document.removeEventListener("keydown", buttonEsc); // закрытие с помощью Esc
}

// Открытие попапа редактирования профиля
openEditPopupButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent; // заполняем поле "Имя"
  descriptionInput.value = profileDescription.textContent; // заполняем поле "Занятие"
  openPopup(editPopup);
});

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  profileName.textContent = nameInput.value; 
  profileDescription.textContent = descriptionInput.value; 

  // Закрываем попап
  closePopup(editPopup);
}

formElementEdit.addEventListener("submit", handleFormSubmit);

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
