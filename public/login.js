const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const loginEmail = loginForm['login-email'].value;
    const loginPassword = loginForm['login-password'].value;
    // console.log(loginEmail, loginPassword);
    auth.signInWithEmailAndPassword(loginEmail, loginPassword).then(() => {
        console.log('login success');
        location = "/index.html";
    }).catch(err => {
        const loginError = document.getElementById("loginError");
        loginError.innerText = err.message;
    })
})


document.querySelector('.registrate').addEventListener('click', () => {
    location = "./home.html"
})