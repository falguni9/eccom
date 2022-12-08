//variables

const showLoginBtn = getElement('showloginBtn')
const showSignupBtn = getElement('showSignupBtn')
const loginForm = getElement('loginForm')
const signupForm = getElement('signupForm')
const signupBtn = getElement('signupBtn')
const loginBtn = getElement('loginBtn')
const signupUsername = getElement('signupUsername')
const loginUsername = getElement('loginUsername')
const signupPassword = getElement('signupPassword')
const loginPassword = getElement('loginPassword')
const signupEmail = getElement('signupEmail')

const authErrMsg = getElement('authErrMsg')
const authErrMsgg = getElement('authErrMsgg')
const succErrMsg = getElement('succErrMsg')


// event listeners

showSignupBtn.addEventListener('click', showSignup)
showLoginBtn.addEventListener('click', showLogin)
loginBtn.addEventListener('click', loginFn)
signupBtn.addEventListener('click', signupFn)




//functions
function showSignup() {
    // Event.preventDefualt()
    signupForm.style.display = "block";
    loginForm.style.display = "none";

}
function showLogin() {

    signupForm.style.display = "none";
    loginForm.style.display = "block";


    // signupForm.classList.add('d-none')
    // loginForm.classList.remove('d-none')


}

function signupFn() {
    
    if (signupUsername.value == "") {
        updateAuthErrorMsgg('Username should not be empty')
    } else if (signupPassword.value == "") {
        updateAuthErrorMsgg('Password should not be empty')
    } else if(signupEmail.value == ""){
        updateAuthErrorMsgg('Email Id should not be empty')
    } else{
        const data = {
            username: signupUsername.value,
            password: signupPassword.value,
            email: signupEmail.value
        }

        // const BASE_URL = "https://ecommce-be.herokuapp.com/ecomm/api/v1"
        console.log(data)
        fetch(`http://localhost:3000/ecomm/api/v1/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then(response => response.json()).then(data => {
            console.log("data", data)
            updateSuccErrorMsg(data.message)
        }).catch((error) => console.log('Error:', error))



    }

}
// cart id for user creation function


function createCart(){
	const userId = localStorage.getItem('userId');
	const token = localStorage.getItem('token');
	console.log(userId,token,"33");
	const headers = { 
		'Content-Type': 'application/json',
		'x-access-token': `${token}` };
		fetch( 'http://localhost:3000/ecomm/api/v1/addProduct', {
			method: 'POST', headers:headers,
			body : JSON.stringify({userId}),
		}).then(response => response.json() )
		.then(data =>
			{console.log(data);
                localStorage.setItem("cartId",data.data);
			window.location.href = "index.html";
        }
            
			
		).catch((error) => {
			console.error('Error:', error);
		});
		
  }



function loginFn() {
    console.log('working')
    if (loginUsername.value == "") {
        updateAuthErrorMsg('Username should not be empty')
    } else if (loginPassword.value == "") {
        updateAuthErrorMsg('Password should not be empty')
    } else {
        const data = {
            email: loginUsername.value,
            password: loginPassword.value,
        }
        console.log(data)

        fetch(`http://localhost:3000/ecomm/api/v1/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            // credentials: "same-origin",
        }).then(response => response.json()).then(data => {
            console.log("data", data)

            if (data.token) {
                localStorage.setItem('username', data.data.username);
                localStorage.setItem('userId', data.data.id);
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', data.data.email);
                createCart()
                // redirectToHome()
            } else {
                updateAuthErrorMsg(data.msg)
            }

        }).catch((error) => console.log('Error:', error))

    }
}
function redirectToHome() {
    window.location.href = 'index.html'
}
function updateSuccErrorMsg(msg) {
    succErrMsg.innerText = msg
}
function updateAuthErrorMsg(msg) {
    authErrMsg.innerText = msg
}
function updateAuthErrorMsgg(msg) {
    authErrMsgg.innerText = msg
}
function getElement(id) {
    return document.getElementById(id)
}


if (localStorage.getItem('username')) {
    window.location.href = 'index.html'
}