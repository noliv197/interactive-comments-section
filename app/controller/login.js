import { login } from "../controller/service.js";

if(localStorage.getItem('user')){
    location.replace("http://127.0.0.1:5500/");
}

const form = document.querySelector(".user-form")
form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const formData = new FormData(form);
    login(formData)
        .then(
            (response) => {
                if(response.status === 200){
                    return response.json();
                } else {
                    return false;
                }
            }
        )
        .then(data => {
            if(data){
                console.log(data)
                localStorage.setItem('user', JSON.stringify(data));
                location.replace("http://127.0.0.1:5500/");
            } else {
                const alert = document.querySelector('.alert');
                alert.textContent = 'Username or password wrong';
                alert.classList.add('visible');
                alert.classList.remove('invisible');
                
            }
        })
})