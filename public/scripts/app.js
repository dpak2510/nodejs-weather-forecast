const weatherForm = document.querySelector('form');
const searched = document.querySelector('input');
const p1 = document.querySelector('#message-1');
const p2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searched.value;
    p1.textContent = 'Loading...';
    p2.textContent = '';
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error)
                return p1.textContent = data.error;
            p1.textContent = data.location;
            p2.textContent = data.forecast;
        })
    }).catch((err) => {
        p1.textContent = err;
    })
})