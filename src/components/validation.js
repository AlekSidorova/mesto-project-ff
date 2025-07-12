export { resetValidationErrors, enableValidation };

const formElement = document.querySelector(".popup__form");
const saveButton = formElement.querySelector(".popup__button");

// регулярное сообщение
const validPattern = /^[a-zA-Zа-яА-ЯёЁ0-9\s-]+$/;

const isValid = (formElement, inputElement) => {
    if (inputElement.validity.valueMissing) {
        inputElement.setCustomValidity(inputElement.dataset.errorEmpty); // если пусто - сообщение из data-error-message
    } 
    else if (!validPattern.test(inputElement.value)) {
        inputElement.setCustomValidity("Допустимы только латинские и кириллические буквы, пробелы и дефисы."); // если не соответствует паттерну
    } 
    else {
        inputElement.setCustomValidity("");
    }

    // проверка валидности
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
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

const setEventListeners = (formElement) => {
    // все инпуты переведем в массив
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            // вызовем isValid, передав ей форму и проверяемый элемент
            isValid(formElement, inputElement);
            toggleSaveButton();
        });
    });
};

const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = [formElement]; // Array.from(formElement)

    formList.forEach((formElement) => {
        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        setEventListeners(formElement);
    });
};

const toggleSaveButton = () => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const isFormValid = inputList.every(input => input.validity.valid);
    saveButton.disabled = !isFormValid; // проверяем состояние всех полей
    if (saveButton.disabled) {
        saveButton.classList.add('popup__button_disabled');
    } else {
        saveButton.classList.remove('popup__button_disabled');
    }
};

// функция для сброса ошибок валидации
const resetValidationErrors = () => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach(inputElement => {
        hideInputError(formElement, inputElement);
    });
};




