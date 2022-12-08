const userIntro = document.getElementById('userIntro')
const logoutBtn = document.getElementById('logoutBtn')

const BASE_URL = 'http://localhost:3000'


logoutBtn.addEventListener('click', logoutFn)

function logoutFn() {
    localStorage.removeItem('username')
    window.location.href = 'log-in.html'
}

if (!localStorage.getItem('username')) {
    window.location.href = 'log-in.html'
} else {
    userIntro.innerText = 'Hi ' + localStorage.getItem('username')
}