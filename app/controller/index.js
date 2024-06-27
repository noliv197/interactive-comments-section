import { createForm } from "../view/form.js";
import { addComment } from "../controller/service.js";
import { Comments } from "../model/Comment.js";

const user = {
    username: 'amyrobson',
    id: 1
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
                console.log(formData)
                await addComment(formData);
                // document.querySelector('main').removeChild(e.target)
            })
            document.querySelector('main').appendChild(form);
        }
    })
)