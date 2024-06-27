export function addElementOptions(element, options){
    const optionKeys = Object.keys(options);

    optionKeys.forEach(key => {
        if(key === 'text'){
            options[key] ? element.innerText = options[key] : null;
        }
        else if(key === 'attrs'){
            options[key] ? options[key].forEach(attr => {
                element.setAttribute(attr.name, attr.value);
            }) : null;
        }
        else if(key === 'classes'){
            options[key] ? options[key].forEach(elClass => {
                element.classList.add(elClass);
            }) : null;

        }
    })
}