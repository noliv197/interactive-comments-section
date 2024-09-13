
export function createForm(user){
    const form = document.createElement('form');
    form.classList.add('comment-form');
    form.id = "form-reply";   
    // Create image
    const img = document.createElement('img');
    img.src = user.image;
    img.alt = user.username;
    
    // Create textarea input    
    const message = document.createElement('textarea');
    message.id = 'comment-reply';
    message.name = 'comment';
    message.placeholder = 'Add a comment...';
    message.required = true;
    
    // Create button
    const button = document.createElement('button');
    button.type = 'submit';
    button.classList.add('btn--submit');
    button.innerText = 'send';

    // Append components to form
    form.appendChild(img);
    form.appendChild(message);
    form.appendChild(button);
    
    return form;
}