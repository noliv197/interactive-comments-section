import { Comments } from "../model/Comment.js";

let user;

const userInfo = localStorage.getItem('user');
const URL_DEV = "http://127.0.0.1:5500"
const URL_PRD = "https://interactive-comments-section-git-main-noliv197s-projects.vercel.app"
const URL = URL_PRD

if(userInfo){
    user = JSON.parse(userInfo);
} else {
    location.replace(URL + "/login.html");
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

document.querySelector(['[data-nav="logout"]']).addEventListener('click', () => {
    localStorage.removeItem('user');
    location.replace(URL + "/login.html");
})

document.querySelector('#form-new').addEventListener('submit', async (e) => {

    e.preventDefault();
    const formData = new FormData();

    const message = document.querySelector('#comment-new').value;
    formData.append('comment', message);
    formData.append('userId', user.id);

    await Comments.add(formData, user);
    document.querySelector('#comment-new').value = '';

})