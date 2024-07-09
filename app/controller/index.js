import { createForm } from "../view/form.js";
import { addComment } from "../controller/service.js";
import { Comments } from "../model/Comment.js";

let user 

const userInfo = localStorage.getItem('user');
if(userInfo){
    user = JSON.parse(userInfo)
} else {
    location.replace("http://127.0.0.1:5500/login.html");
}

if(user){
    document.querySelectorAll('[data-nav]').forEach(link => {
        if(link.dataset.nav === 'login'){
            link.classList.add('invisible')
            link.classList.remove('visible')
        } else {
            link.classList.add('visible')
            link.classList.remove('invisible')
        }
    })
} else {
    document.querySelectorAll('[data-nav]').forEach(link => {
        if(link.dataset.nav === 'login'){
            link.classList.add('visible')
            link.classList.remove('invisible')
        } else {
            link.classList.add('invisible')
            link.classList.remove('visible')
        }
    })
}

Comments.getAllComments(user);

// Create Form on reply
document.querySelectorAll('button.btn--reply').forEach(button => 
    button.addEventListener('click', () => {
        let formExists = document.querySelectorAll('form.comment-form');
        if(!formExists || formExists.length === 0){
            const form = createForm({
                image: './assets/images/avatars/image-juliusomo.webp',
                username: 'test'
            })
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const comment = document.querySelector('#comment').value 
                const formData = new FormData();
                formData.append('comment', comment)
                formData.append('userId', user.id)
                await addComment(formData);
                // document.querySelector('main').removeChild(e.target)
            })
            document.querySelector('main').appendChild(form);
        }
    })
)

document.querySelector(['[data-nav="logout"]']).addEventListener('click',() => {
    localStorage.removeItem('user');
    location.replace("http://127.0.0.1:5500/login.html");
})