export { resetProfileValidationErrors, enableValidation, resetNewPlaceValidationErrors, buttonElementAdd, buttonElement };

// Инициализация для формы "Редактировать профиль"
const formElement = document.querySelector('form[name="edit-profile"]');
const buttonElement = formElement.querySelector(".popup__button");

// Инициализация для формы "Новое место"
const formElementAdd = document.querySelector('form[name="new-place"]');
const buttonElementAdd = formElementAdd.querySelector(".popup__button");


const isValid = (inputElement) => {
    const validPattern = /^[a-zA-Zа-яА-ЯёЁ0-9\s-]+$/;
    const urlPattern = /^(https?:\/\/.+\..+)$/;

    // Проверка на обязательность поля
    if (inputElement.validity.valueMissing) {
        inputElement.setCustomValidity(inputElement.dataset.errorEmpty);
    } 
    // Валидация для имени места
    else if (inputElement.name === 'place-name') {
        if (!validPattern.test(inputElement.value)) {
            inputElement.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
        } else {
            inputElement.setCustomValidity(""); // Сбрасываем ошибку
        }
    } 
    // Валидация для ссылки
    else if (inputElement.name === 'link') {
        if (!urlPattern.test(inputElement.value)) {
            inputElement.setCustomValidity("Введите адрес сайта."); // Сообщение для некорректного URL
        } else {
            inputElement.setCustomValidity(""); // Сбрасываем ошибку
        }
    } 
    // Валидация для других полей
    else if (!validPattern.test(inputElement.value)) {
        inputElement.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
    } else {
        inputElement.setCustomValidity(""); // Сбрасываем ошибку
    }
};

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

// удалить классы с ошибками
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const validateInput = (formElement, inputElement, inputErrorClass, errorClass) => {
    isValid(inputElement);
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

const setEventListeners = (formElement, buttonElement, inputList, inactiveButtonClass, inputErrorClass, errorClass) => {
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            validateInput(formElement, inputElement, inputErrorClass, errorClass);
            toggleSaveButton(inputList, buttonElement, inactiveButtonClass);
        });
    });
};

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        const buttonElement = formElement.querySelector(submitButtonSelector);
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));

        setEventListeners(formElement, buttonElement, inputList, inactiveButtonClass, inputErrorClass, errorClass);
    });
};

// Проверка на наличие невалидных инпутов
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleSaveButton = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
};

// Универсальная функция для сброса ошибок валидации
const resetValidationErrors = (formElement, buttonElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach(inputElement => {
        hideInputError(formElement, inputElement);
        inputElement.value = ""; // Очищаем значения инпутов
        inputElement.setCustomValidity(""); // Сбрасываем все кастомные сообщения
    });
    toggleSaveButton(inputList, buttonElement);
};

// Использование универсальной функции для сброса ошибок
const resetProfileValidationErrors = () => {
    resetValidationErrors(formElement, buttonElement);
};

const resetNewPlaceValidationErrors = () => {
    resetValidationErrors(formElementAdd, buttonElementAdd);
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});