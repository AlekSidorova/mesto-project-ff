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

// показать класс с ошибками
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

// удалить классы с ошибками
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove("popup__input_type_error");
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

// Проверка валидности инпута и отображение ошибок
const validateInput = (formElement, inputElement) => {
    isValid(inputElement);
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement, buttonElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            validateInput(formElement, inputElement);
            toggleSaveButton(inputList, buttonElement);
        });
    });
};

// Инициализация слушателей для форм
const enableValidation = () => {
    setEventListeners(formElement, buttonElement);
    setEventListeners(formElementAdd, buttonElementAdd);
};

// Проверка на наличие невалидных инпутов
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

// Управление состоянием кнопки "Сохранить"
const toggleSaveButton = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('popup__button_disabled');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button_disabled');
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
