
export function createForm(user){
    const form = document.createElement('form');
    form.id = "comment-form";   
    // Create image
    const img = document.createElement('img');
    img.src = user.image;
    img.alt = user.username;
    
    // Create textarea input    
    const message = document.createElement('textarea');
    message.name = 'comment';
    message.id = 'comment';
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