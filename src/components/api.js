export {loadUserInfo, getCards, editingProfile, addingNewCard, toggleLike, deleteCard};

const MYTOKEN = 'e4c415db-c6a6-4869-b720-3932e0cc453d';

// инфо о пользователе 
const loadUserInfo = () => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-42/users/me`, {
    method: 'GET',
    headers: {
      authorization: MYTOKEN,
      'Content-Type': 'application/json',
    },
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    return data; // Вернуть данные
  });
};


// функция для загрузки карточек
function getCards() {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-42/cards`, {
    method: 'GET',
    headers: {
      authorization: MYTOKEN,
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json(); // Преобразование ответа в JSON
  })
};


// функция редактирования профиля
function editingProfile(name, about) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-42/users/me', {
    method: 'PATCH',
    headers: {
      authorization: MYTOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,  // передаем новое имя
      about: about, // передаем новое описание
    }),
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json(); // Преобразование ответа в JSON
  });
};


// добавление новой карточки
function addingNewCard(name, link) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-42/cards', {
    method: 'POST',
    headers: {
      authorization: MYTOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json(); // Возвращаем данные карточки
  });
};

// Отображение количества лайков карточки + Постановка и снятие лайка
function toggleLike(cardId, isLiked) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-42/cards/likes/${cardId}`, {
    method: isLiked ? 'PUT' : 'DELETE', 
    headers: {
      authorization: MYTOKEN,
      'Content-Type': 'application/json',
    },
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
};

// Функция для удаления карточки
function deleteCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-42/cards/${cardId}`, { // Используйте cardId
    method: 'DELETE',
    headers: {
      authorization: MYTOKEN,
    }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
  });
};


