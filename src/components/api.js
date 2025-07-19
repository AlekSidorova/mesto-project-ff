const MY_TOKEN = 'e4c415db-c6a6-4869-b720-3932e0cc453d';
const BASE_URL = 'https://nomoreparties.co/v1/wff-cohort-42';

const headers = {
  authorization: MY_TOKEN,
  'Content-Type': 'application/json',
};

// обработка ответа
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};



// Инфо о пользователе 
const loadUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: headers,
  }).then(handleResponse);
};


// Функция для загрузки карточек
const getCards = () => {
  return fetch(`${BASE_URL}/cards`, {
    method: 'GET',
    headers: headers,
  }).then(handleResponse);
};

// Функция редактирования профиля
const editingProfile = (name, about) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleResponse);
};

// Добавление новой карточки
const addingNewCard = (name, link) => {
  return fetch(`${BASE_URL}/cards`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(handleResponse);
};

// Отображение количества лайков карточки + Постановка и снятие лайка
const toggleLike = (cardId, isLiked) => {
  return fetch(`${BASE_URL}/cards/likes/${cardId}`, {
    method: isLiked ? 'PUT' : 'DELETE',
    headers: headers,
  }).then(handleResponse);
};

// Функция для удаления карточки
const deleteCard = (cardId) => {
  return fetch(`${BASE_URL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: headers,
  }).then(handleResponse);
};

// Обновление аватара
const updateAvatar = (avatar) => {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({ avatar: avatar })
  }).then(handleResponse);
};

export { loadUserInfo, getCards, editingProfile, addingNewCard, toggleLike, deleteCard, updateAvatar };
