import { addElementOptions } from "../helpers/elements.js";
import { Comments } from "../model/Comment.js";

export function createModal(type, comment, user, opt = ''){
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    let modalContent;
    if(type === `delete`){
        modalContent = modalDelete(comment, user);
    } else if (type === 'edit') {
        modalContent = modalEdit(comment, user, opt);
    }

    const btnClose = document.createElement('button');
    addElementOptions(btnClose,
        {
            text: 'X',
            classes: ['close-modal'],
        }           
    );

    btnClose.addEventListener('click', () => {
        document.querySelector('.modal-container').remove();
    });
   
    modalContainer.appendChild(btnClose);
    modalContainer.appendChild(modalContent);

    document.querySelector('main').appendChild(modalContainer)
}

function modalEdit(comment, user, text){

    const modalContent = document.createElement('div');
    addElementOptions(modalContent,
        {
            text: 'Edit your comment: ',
            classes: ['modal-card'],
        }           
    );

    const textarea = document.createElement('textarea');
    addElementOptions(textarea,
        {
            text: text,
            attrs: [
                {name: 'name', value: 'comment'},
                {name: 'id', value: 'comment-edit'},
                {name: 'value', value: text},
            ],
            classes: ['modal-input'],
        }           
    );


    const confirmEditComment = async () => {
        const newComment = document.querySelector('#comment-edit')?.value;
        comment.content = newComment;
 
        const data = new FormData();
        data.append('id', comment.id);
        data.append('content', newComment);

        await Comments.edit(data, user);
        document.querySelector('.modal-container').remove();
    }
    
    const btnDiv = createModalButtons(confirmEditComment);

    modalContent.appendChild(textarea);
    modalContent.appendChild(btnDiv);
    return modalContent;
}

function modalDelete(comment, user){

    const modalContent = document.createElement('div');
    addElementOptions(modalContent,
        {
            text: 'Are you sure you want to delete this comment ?',
            classes: ['modal-card'],
        }           
    );
    
    const confirmDelete = async () => {
        const data = {
            'commentId': comment.id,
            'commentUserId': comment.user.id,
            'loginId': user.id,
        };
        await Comments.delete(data, user);
        document.querySelector('.modal-container').remove();
    }

    const btnDiv = createModalButtons(confirmDelete);

    modalContent.appendChild(btnDiv);
    return modalContent;
}

function createModalButtons(confirmFunction){
    const btnDiv = document.createElement('div');
    btnDiv.classList.add('btn-container');
    
    const btnConfirm = document.createElement('button');
    addElementOptions(btnConfirm,
        {
            text: '✔ Confirm',
            classes: ['btn--confirm', 'btn--modal'],
            attrs: [{name:'type', value: 'button'}],
        }           
    );

    btnConfirm.addEventListener(`click`, async () => confirmFunction());
    
    const btnCancel = document.createElement('button');
    addElementOptions(btnCancel,
        {
            text: 'X Cancel',
            classes: ['btn--cancel', 'btn--modal'],
            attrs: [{name:'type', value: 'button'}],
        }           
    );

    btnCancel.addEventListener(`click`, (e) => {
        document.querySelector('.modal-container').remove();
    });

    btnDiv.appendChild(btnConfirm);
    btnDiv.appendChild(btnCancel);

    return btnDiv;
}