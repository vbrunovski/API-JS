//Подключаем HTTP-клиент для выполнения запросов к API.
const axios = require("axios");

//Создаём отдельный экземпляр axios, чтобы не дублировать настройки в каждом запросе.
const api = axios.create({
    baseURL: "http://localhost:9001/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});

//Функция регистрации пользователя. Принимает данные, ничего не знает о внешнем состоянии.
const register = function (payload) {
    //Отправляем POST-запрос на /register с телом запроса + Обрабатываем успешный HTTP-ответ.
    return api.post("/register", payload).then(function (r) {
        //Возвращаем только полезные данные, а не весь ответ axios.
        return r.data;
    });
};

//Функция логина. Принимает креды, не хранит токены внутри себя.
const login = function (payload) {
    //POST-запрос на эндпоинт аутентификации. + Обработка ответа сервера.
    return api.post("/login", payload).then(function (r) {
        //Возвращаем только токен, а не весь объект ответа.
        return r.data.token;
    });
};

//Функция получения профиля. Явно требует токен — скрытой магии нет.
const getUser = function (token) {
    //GET-запрос к защищённому эндпоинту.
    return api.get("/profile", {
        //Локальные заголовки именно для этого запроса.
        headers: {
            //Передаём JWT в стандартном формате Bearer.
            Authorization: "Bearer " + token
        }
        //Обрабатываем успешный ответ.
    }).then(function (r) {
        return r.data;
    });
};

//Сценарий выполнения. Здесь описан порядок действий, а не логика запросов.
const flow = async function () {
    //Регистрируем пользователя и ждём завершения операции.
    await register({
        username: "vitalib",
        email: "valid@email.com",
        password: "pass123",
        role: "user"
    });

    //Логинимся и сохраняем результат — токен.
    const token = await login({
        username: "vitalib",
        password: "pass123"
    });

    //Передаём токен дальше и возвращаем Promise с профилем.
    return getUser(token);
};

//Запускаем сценарий.
flow()
    //Обрабатываем успешный результат выполнения всего сценария.
    .then(function (user) {
        //Выводим данные пользователя.
        console.log(user);
    })
    //Глобальный перехват ошибок.
    .catch(function (err) {
        console.log(err.response ? err.response.data : err);
    });
