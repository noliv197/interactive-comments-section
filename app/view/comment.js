import { timeAgo } from "../helpers/functions.js";
import { addElementOptions } from "../helpers/elements.js";
import { createForm } from "./form.js";
import { Comments } from "../model/Comment.js";
import { createModal } from "./modal.js";


export function createSection(parentId){
    const section = document.createElement('section');
    section.classList.add('layer');
    section.setAttribute('id', `layer-${parentId}`);

    return section;
}

export function createComment(comment, user){
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('comment');
    if(comment.parentId) mainDiv.classList.add('comment--secondary');

    mainDiv.appendChild(createCommentCounter(comment, user));
    mainDiv.appendChild(createCommentBody(comment, user));
    return mainDiv;
}

// Counter Creation
function createCommentCounter(comment, user){
    const div = document.createElement('div');
    div.classList.add('container-counter');

    const counter = document.createElement('output');
    counter.innerText = comment.score;

    const addButton = document.createElement('button');
    addElementOptions(addButton,
        {
            text: '+',
            classes: ['btn--operator'],
            attrs: [
                {name:'type', value: 'button'},
                {name:'data-button', value: 'add'},
            ],
        }           
    );

    addButton.addEventListener('click', async (e) => {
        let output = e.target.nextSibling
        output.value = Number(output.value) + 1;
        
        const data = new FormData();
        data.append('id', comment.id);
        data.append('score', output.value);

        await Comments.edit(data, user);
    })
    
    const subtractButton = document.createElement('button');
    addElementOptions(subtractButton,
        {
            text: '-',
            classes: ['btn--operator'],
            attrs: [
                {name:'type', value: 'button'},
                {name:'data-button', value: 'subtract'},
            ],
        }           
    );

    subtractButton.addEventListener('click', async (e) => {
        let output = e.target.previousSibling;
        output.value = Number(output.value) > 0 ? Number(output.value)  - 1 : 0;

        const data = new FormData();
        data.append('id', comment.id);
        data.append('score', output.value);

        await Comments.edit(data, user);
    })

    // User cannot change score counter
    if(user && comment.user.id == user.id){
        addButton.setAttribute('disabled','');
        subtractButton.setAttribute('disabled','');
    }

    div.appendChild(addButton);
    div.appendChild(counter);
    div.appendChild(subtractButton);
    return div;
}

function createCommentBody(comment, user){
    const bodyDiv = document.createElement('div');
    bodyDiv.classList.add('container-comment');

    const text = document.createElement('p');
    addElementOptions(text,
        {
            text: comment.content,
            classes: ['comment--text']
        }           
    );

    bodyDiv.appendChild(createCommentHeader(comment, user));
    bodyDiv.appendChild(text);
    return bodyDiv;
}

function createCommentHeader(comment, user){
    const header = document.createElement('header');
    const leftDiv = document.createElement('div');
    const rightDiv = document.createElement('div');
    rightDiv.classList.add('container-buttons');

    const img = document.createElement('img');
    addElementOptions(img,
        {
            text: comment.user.username,
            attrs: [
                {name: 'src', value: comment.user.image.webp},
                {name: 'alt', value: comment.user.username}
            ],
        }           
    );
    leftDiv.appendChild(img);

    const username = document.createElement('p');
    addElementOptions(username,
        {
            text: comment.user.username,
            classes: ['comment--username']
        }           
    );

    const time = document.createElement('p');
    addElementOptions(time,
        {
            text: timeAgo(comment.createdAt),
            classes: ['comment--time']
        }           
    );

    if(user && comment.user.id == user.id){
        const identification = document.createElement('p');
        addElementOptions(identification,
            {
                text: 'you',
                classes: ['comment--identification']
            }           
        );

        const deleteBtn = document.createElement('button');
        addElementOptions(deleteBtn,
            {
                text: "Delete",
                attrs: [{name:'data-button', value: 'delete'}], 
                classes: ['btn--delete']
            }           
        );

        deleteBtn.addEventListener(`click`, async () => {
            createModal('delete', comment, user);
        });

        const editBtn = document.createElement('button');
        addElementOptions(editBtn,
            {
                text: "Edit",
                attrs: [{name:'data-button', value: 'edit'}], 
                classes: ['btn--edit']
            }           
        );

        editBtn.addEventListener('click', (e) => {
            const commentText = e.target.parentNode.parentNode.nextSibling.innerText;
            createModal('edit', comment, user, commentText);
        })

        leftDiv.appendChild(username);
        leftDiv.appendChild(identification);
        rightDiv.appendChild(deleteBtn);
        rightDiv.appendChild(editBtn);
    }
    else {
        const replyBtn = document.createElement('button');
        addElementOptions(replyBtn,
            {
                text: "Reply",
                attrs: [{name:'data-button', value: 'reply'}], 
                classes: ['btn--reply']
            }           
        );

        replyBtn.addEventListener('click', (e) => {
            let formExists = document.querySelectorAll('#form-reply');
            if(!formExists || formExists.length === 0){
                const form = createForm({
                    image: user.image.webp ? user.image.webp : user.image.png,
                    username: user.username
                });

                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const message = document.querySelector('#comment-reply').value;
                    const formData = new FormData();
                    formData.append('comment', message);
                    formData.append('userId', user.id);
                    formData.append('parentId', comment.id);

                    await Comments.add(formData, user);
                    document.querySelector('#comment-reply').remove();
                })

                // Insert form after the comment
                let commentDiv = e.target.closest('.comment')
                if (commentDiv.nextSibling) {
                    commentDiv.parentNode.insertBefore(form, commentDiv.nextSibling);
                } else {
                    commentDiv.parentNode.appendChild(form);
                }
            }
        })

        leftDiv.appendChild(username);
        if(!comment.parentId) rightDiv.appendChild(replyBtn);
    }

    leftDiv.appendChild(time);

    header.appendChild(leftDiv);
    header.appendChild(rightDiv);
    return header;
}