import { Comments } from "../model/Comment.js";

let user;

const userInfo = localStorage.getItem('user');
if(userInfo){
    user = JSON.parse(userInfo);
} else {
    location.replace("http://127.0.0.1:5500/login.html");
}

if(user){
    document.querySelectorAll('[data-nav]').forEach(link => {
        if(link.dataset.nav === 'login'){
            link.classList.add('invisible');
            link.classList.remove('visible');
        } else {
            link.classList.add('visible');
            link.classList.remove('invisible');
        }
    })
} else {
    document.querySelectorAll('[data-nav]').forEach(link => {
        if(link.dataset.nav === 'login'){
            link.classList.add('visible');
            link.classList.remove('invisible');
        } else {
            link.classList.add('invisible');
            link.classList.remove('visible');
        }
    })
}

Comments.getAllComments(user);

document.querySelector(['[data-nav="logout"]']).addEventListener('click',() => {
    localStorage.removeItem('user');
    location.replace("http://127.0.0.1:5500/login.html");
})