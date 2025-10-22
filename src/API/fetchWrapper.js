//const URL = "http://10.18.199.4:5001";
const URL = "http://10.18.100.112:5001";
function fetchWrapper(path, options) {
  return fetch(`${URL}/${path}`, options).then((res) => {
    if (res.ok) {
      //если статус ответа 200, возвращаем просто сообщение об успешной регистрации
      return res.json();
    } // если статус ответа не 200, раскладываем на json ответ и оборачиваем этот json в промис ошибку, чтобы ушло в catch
    return res.json().then((data) => Promise.reject(data));
  });
}
export default fetchWrapper;
