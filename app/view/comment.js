import { timeAgo } from "../helpers/functions.js";
import { addElementOptions } from "../helpers/elements.js";
import { createForm } from "./form.js";
import { Comments } from "../model/Comment.js";


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

    addButton.addEventListener('click', (e) => {
        let output = e.target.nextSibling
        output.value = Number(output.value) + 1;
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

    subtractButton.addEventListener('click', (e) => {
        let output = e.target.previousSibling;
        output.value = Number(output.value) > 0 ? Number(output.value)  - 1 : 0;
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
        )

        deleteBtn.addEventListener(`click`, async () => {
            const data = {
                'commentId': comment.id,
                'commentUserId': comment.user.id,
                'loginId': comment.id,
            };
            await Comments.delComment(data);
        });

        const editBtn = document.createElement('button');
        addElementOptions(editBtn,
            {
                text: "Edit",
                attrs: [{name:'data-button', value: 'edit'}], 
                classes: ['btn--edit']
            }           
        );

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

        replyBtn.addEventListener('click', () => {
            let formExists = document.querySelectorAll('form.comment-form');
            if(!formExists || formExists.length === 0){
                const form = createForm({
                    image: user.image.webp ? user.image.webp : user.image.png,
                    username: user.username
                });

                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const message = document.querySelector('#comment').value;
                    const formData = new FormData();
                    formData.append('comment', message);
                    formData.append('userId', user.id);
                    formData.append('parentId', comment.id);

                    await Comments.addReply(formData);
                    document.querySelector('main').removeChild(e.target)
                })
                document.querySelector('main').appendChild(form);
            }
        })

        leftDiv.appendChild(username);
        rightDiv.appendChild(replyBtn);
    }

    leftDiv.appendChild(time);

    header.appendChild(leftDiv);
    header.appendChild(rightDiv);
    return header;
}