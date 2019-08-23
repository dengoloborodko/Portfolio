export default function getData() {
    const goodsWrapper = document.querySelector('.goods');
    return fetch('../app/db/db.json')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(data => data)
        .catch(err => {
            console.warn(err);
            goodsWrapper.innerHTML = '<div style="color: red; font-size: 30px">Упс... Что-то пошло не так...</div>';
        });
}