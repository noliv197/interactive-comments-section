import { login } from "../controller/service.js";

const URL_DEV = "http://127.0.0.1:5500"
const URL_PRD = "https://interactive-comments-section-git-main-noliv197s-projects.vercel.app"
const URL = URL_PRD

if(localStorage.getItem('user')){
    location.replace(URL);
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
                location.replace(URL);
            } else {
                const alert = document.querySelector('.alert');
                alert.textContent = 'Username or password wrong';
                alert.classList.add('visible');
                alert.classList.remove('invisible');
                
            }
        })
})