export {loadUserInfo};

const loadUserInfo = () => {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-42/users/me`, {
    method: 'GET',
    headers: {
      authorization: 'e4c415db-c6a6-4869-b720-3932e0cc453d', // Ваш токен
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    // Проверка, был ли запрос успешным
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json(); // Преобразование ответа в JSON
  })
  .then(data => {
    console.log(data); // Вывод полученных данных в консоль
  })
  .catch(err => {
    console.error(err); // Обработка ошибок
  });
};


