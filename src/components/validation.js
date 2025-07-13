export { resetValidationErrors, enableValidation, resetValidationErrorsAdd, enableValidationNewPlace, buttonElementAdd };

// все для формы "Редактировать профиль"
const formElement = document.querySelector('form[name="edit-profile"]');
const buttonElement = formElement.querySelector(".popup__button");

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

            // Вызовем toggleSaveButton и передадим ей массив полей и кнопку
            toggleSaveButton(inputList, buttonElement);
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

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true

        return !inputElement.validity.valid;
    })
};

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleSaveButton = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.disabled = true;
        buttonElement.classList.add('popup__button_disabled');
    } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button_disabled');
    }
};

// функция для сброса ошибок валидации
const resetValidationErrors = () => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach(inputElement => {
        hideInputError(formElement, inputElement);
        // Сбрасываем валидность инпута
        inputElement.setCustomValidity("");
    });
    toggleSaveButton(inputList, buttonElement);
};


// все для формы "Новое место"
const formElementAdd = document.querySelector('form[name="new-place"]'); // сама форма
const buttonElementAdd = formElementAdd.querySelector(".popup__button"); // Определение кнопки в форме добавления

const nameValidPattern = /^[a-zA-Zа-яА-ЯёЁ0-9\s-]+$/; 

const isValidAdd = (formElement, inputElement) => {
    if (inputElement.validity.valueMissing) {
        inputElement.setCustomValidity(inputElement.dataset.errorEmpty); // Если пусто - кастомное сообщение
    } else if (inputElement.name === 'place-name') {
        if (!nameValidPattern.test(inputElement.value)) {
            inputElement.setCustomValidity("Название должно содержать только латинские и кириллические буквы, пробелы и дефисы.");
        } else {
            inputElement.setCustomValidity(""); // Сбрасываем ошибку
        }

    //проверка ссылки
    } else if (inputElement.name === 'link') {
        const urlPattern = /^(https?:\/\/.+\..+)$/; // Пример простой проверки URL
        // Проверяем только на наличие значения
        if (inputElement.validity.valueMissing) {
            inputElement.setCustomValidity(inputElement.dataset.errorEmpty);
        } else if (!urlPattern.test(inputElement.value)) {
            inputElement.setCustomValidity("Введите адрес сайта."); // Сообщение для некорректного URL
        } else {
            inputElement.setCustomValidity(""); // Сбрасываем ошибку
        }
    }

    // Проверка валидности
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

// Обновляем обработчики событий для формы добавления места
const setEventListenersAdd = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValidAdd(formElement, inputElement); // Проверяем валидность
            toggleSaveButton(inputList, buttonElementAdd); // Проверяем состояние кнопки
        });
    });
};

// Обновлено для сброса ошибок валидации
const resetValidationErrorsAdd = () => {
    const inputList = Array.from(formElementAdd.querySelectorAll('.popup__input'));

    inputList.forEach(inputElement => {
        hideInputError(formElementAdd, inputElement);
        inputElement.value = ""; // Очищаем значения инпутов
        inputElement.setCustomValidity(""); // Сбрасываем все кастомные сообщения
    });
    toggleSaveButton(inputList, buttonElementAdd); // Убедимся, что кнопка неактивна
};

// Вызов функции для инициализации валидации новой формы
const enableValidationNewPlace = () => {
    setEventListenersAdd(formElementAdd);
};