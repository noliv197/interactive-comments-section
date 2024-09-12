import { addElementOptions } from "../helpers/elements.js";
import { Comments } from "../model/Comment.js";

export function createModal(type, comment, userId){
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    let modalContent;
    if(type === `delete`){
        modalContent = modalDelete(comment, userId);
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

function modalDelete(comment, userId){

    const modalContent = document.createElement('div');
    addElementOptions(modalContent,
        {
            text: 'Are you sure you want to delete this comment ?',
            classes: ['modal-card'],
        }           
    );
    
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

    btnConfirm.addEventListener(`click`, async () => {
        const data = {
            'commentId': comment.id,
            'commentUserId': comment.user.id,
            'loginId': userId,
        };
        await Comments.delComment(data);
    });
    
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
    modalContent.appendChild(btnDiv);
    return modalContent;
}