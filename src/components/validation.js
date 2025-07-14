export { resetValidationErrors, enableValidation, resetValidationErrorsAdd, enableValidationNewPlace, buttonElementAdd };

// все для формы "Редактировать профиль"
const formElement = document.querySelector('form[name="edit-profile"]');
const buttonElement = formElement.querySelector(".popup__button");

// регулярное сообщение
const validPattern = /^[a-zA-Zа-яА-ЯёЁ0-9\s-]+$/;

const isValid = (inputElement) => {
    if (inputElement.validity.valueMissing) {
        inputElement.setCustomValidity(inputElement.dataset.errorEmpty);
    } else if (!validPattern.test(inputElement.value)) {
        inputElement.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
    } else {
        inputElement.setCustomValidity("");
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

// Установка обработчиков событий для формы
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            validateInput(formElement, inputElement);
            toggleSaveButton(inputList, buttonElement);
        });
    });
};

// Инициализация валидации для формы "Редактировать профиль"
const enableValidation = () => {
    setEventListeners(formElement);
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


// Сброс ошибок валидации
const resetValidationErrors = () => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach(inputElement => {
        hideInputError(formElement, inputElement);
        inputElement.setCustomValidity("");
    });
    toggleSaveButton(inputList, buttonElement);
};

// все для формы "Новое место"
const formElementAdd = document.querySelector('form[name="new-place"]'); // сама форма
const buttonElementAdd = formElementAdd.querySelector(".popup__button"); // Определение кнопки в форме добавления

const nameValidPattern = /^[a-zA-Zа-яА-ЯёЁ0-9\s-]+$/;

const isValidAdd = (inputElement) => {
    if (inputElement.validity.valueMissing) {
        inputElement.setCustomValidity(inputElement.dataset.errorEmpty);
    } else if (inputElement.name === 'place-name') {
        if (!nameValidPattern.test(inputElement.value)) {
            inputElement.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
        } else {
            inputElement.setCustomValidity(""); // Сбрасываем ошибку
        }

        //проверка ссылки
    } else if (inputElement.name === 'link') {
        const urlPattern = /^(https?:\/\/.+\..+)$/;
        // Проверяем только на наличие значения
        if (inputElement.validity.valueMissing) {
            inputElement.setCustomValidity(inputElement.dataset.errorEmpty);
        } else if (!urlPattern.test(inputElement.value)) {
            inputElement.setCustomValidity("Введите адрес сайта."); // Сообщение для некорректного URL
        } else {
            inputElement.setCustomValidity(""); // Сбрасываем ошибку
        }
    }
};

// Проверка валидности инпута и отображение ошибок для новой формы
const validateInputAdd = (formElement, inputElement) => {
    isValidAdd(inputElement);
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

// Установка обработчиков событий для формы добавления места
const setEventListenersAdd = (formElementAdd) => {
    const inputList = Array.from(formElementAdd.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            validateInputAdd(formElementAdd, inputElement);
            toggleSaveButton(inputList, buttonElementAdd);
        });
    });
};

// Сброс ошибок валидации для новой формы
const resetValidationErrorsAdd = () => {
    const inputList = Array.from(formElementAdd.querySelectorAll('.popup__input'));
    inputList.forEach(inputElement => {
        hideInputError(formElementAdd, inputElement);
        inputElement.value = ""; // Очищаем значения инпутов
        inputElement.setCustomValidity(""); // Сбрасываем все кастомные сообщения
    });
    toggleSaveButton(inputList, buttonElementAdd);
};

// Инициализация валидации для новой формы
const enableValidationNewPlace = () => {
    setEventListenersAdd(formElementAdd);
};
