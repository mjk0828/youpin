let mlogin = document.querySelector('.m-no-login');
let username = getCookie('login');
console.log(username);
if (username) {
    mlogin.innerHTML = username;
}

let toTop = document.querySelector('.toTop');
toTop.onclick = function() {
    scrollTo(0, 0)
}