const isValid = (inputElement) => {
    const validPattern = /^[a-zA-Zа-яА-ЯёЁ0-9\s-]+$/;

    // Проверка на обязательность поля
    if (inputElement.validity.valueMissing) {
        inputElement.setCustomValidity(""); 
    } 
    // Валидация по паттерну для текстовых и других полей
    else if (inputElement.type === 'text' || inputElement.type !== 'url') {
        if (!validPattern.test(inputElement.value)) {
            inputElement.setCustomValidity(inputElement.dataset.errorPattern); 
        } else {
            inputElement.setCustomValidity(""); 
        }
    } 
    // Пропускаем валидацию для URL
    else {
        inputElement.setCustomValidity(""); 
    }
};

const handleInputError = (formElement, inputElement, errorMessage, config, isVisible) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    if (isVisible) {
        // Показываем ошибку
        inputElement.classList.add(config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(config.errorClass);
    } else {
        // Убираем ошибку
        inputElement.classList.remove(config.inputErrorClass);
        errorElement.classList.remove(config.errorClass);
        errorElement.textContent = '';
    }
};

// Проверка валидности инпута и отображение ошибок
const validateInput = (formElement, inputElement, config) => {
    isValid(inputElement, config);
    handleInputError(formElement, inputElement, inputElement.validationMessage, config, !inputElement.validity.valid);
};

const setEventListeners = (formElement, buttonElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            validateInput(formElement, inputElement, config);
            toggleSaveButton(inputList, buttonElement, config);
        });
    });
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => {
        const buttonElement = formElement.querySelector(config.submitButtonSelector);
        setEventListeners(formElement, buttonElement, config); 
    });
};

// Проверка на наличие невалидных инпутов
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

// кнопка "Отправить"
const disableSubmitButton = (buttonElement, config) => {
    buttonElement.disabled = true; 
    buttonElement.classList.add(config.inactiveButtonClass);
};

// аналогичная логика для включения кнопки
const enableSubmitButton = (buttonElement, config) => {
    buttonElement.disabled = false; 
    buttonElement.classList.remove(config.inactiveButtonClass);
};

// Управление состоянием кнопки "Сохранить"
const toggleSaveButton = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        enableSubmitButton(buttonElement, config);
    }
};

const clearValidation = (formElement, config) => {
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

    inputList.forEach(inputElement => {
        handleInputError(formElement, inputElement, '', config, false);
        
        inputElement.setCustomValidity("");
    });

    disableSubmitButton(buttonElement, config);
};

export { enableValidation, clearValidation };
