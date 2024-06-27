import { getComments } from "../controller/service.js";
import { createComment } from "../view/comment.js";

export class Comments{
    static async getAllComments(user){
        getComments()
        .then(response => response.json())
        .then(data => {
            const section = document.querySelector('section.layer');
            data.forEach(comment => {
                const commentElement = createComment(comment, user);
                section.appendChild(commentElement);
            })}
        )
    }
}