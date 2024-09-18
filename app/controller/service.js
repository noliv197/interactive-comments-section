const BACK_URL_DEV = "http://localhost/comment-app/routes.php"
const BACK_URL_PRD = "https://comment-section-backend-glwybi4w4-noliv197s-projects.vercel.app"
const backendUrl = BACK_URL_PRD + "/routes.php"

export async function getComments(){
  return await fetch(`${backendUrl}/comments`)
}

export async function getUserInfo(id){
  return await fetch(`${backendUrl}/userInfo?id=${id}`)
}

export async function addComment(data){

    const response = await fetch(`${backendUrl}/addComment`, {
        method: "POST", 
        body: data
      });

    return response;
}

export async function editComment(data){
  const response = await fetch(`${backendUrl}/editComment`,{
    method: "POST",
    body: data
  });
  
  return response;
}
export async function deleteComment(query){
  const response = await fetch(`${backendUrl}/deleteComment?${query}`,{
    method: "DELETE"
  });
  
  return response;
}

/* User Requests */
export async function login(data){
  const response = await fetch(`${backendUrl}/login`,{
    method: "POST",
    body: data
  });
  
  return response
}
