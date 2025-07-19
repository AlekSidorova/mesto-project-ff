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

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        const buttonElement = formElement.querySelector(submitButtonSelector);
        setEventListeners(formElement, buttonElement);
    });
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

const clearValidation = (formElement, { inputSelector, submitButtonSelector, inactiveButtonClass }) => {
    const buttonElement = formElement.querySelector(submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));

    inputList.forEach(inputElement => {
        hideInputError(formElement, inputElement);
        inputElement.setCustomValidity(""); 
    });

    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
};

export { enableValidation, clearValidation };