import { getComments, addComment, deleteComment } from "../controller/service.js";
import { createComment, createSection } from "../view/comment.js";

export class Comments{
    static async getAllComments(user){
        document.querySelector('main').innerHTML = '';
        getComments()
        .then(response => response.json())
        .then(data => {
            data.filter(comment => comment.parentId === null)
                .forEach(comment => {
                    const section = createSection(comment.id);
                    const commentElement = createComment(comment, user);
                    section.appendChild(commentElement);
                    
                    // get replies
                    data.filter(reply => String(reply.parentId) === String(comment.id))
                        .forEach(secondary => {
                            const secondaryElement = createComment(secondary, user);
                            section.appendChild(secondaryElement);
                        });
                    
                    document.querySelector('main').appendChild(section);
                });
        })
    }

    static async addReply(data){
        addComment(data)
        .then(() => Comments.getAllComments());
    }

    static async delComment(data){
        const query = `commentId=${data.commentId}&loginId=${data.loginId}&commentUserId=${data.commentUserId}`;
        deleteComment(query)
        .then(() => Comments.getAllComments());
    }
}