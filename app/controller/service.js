const BACK_URL_DEV = "http://localhost:8000"
const BACK_URL_PRD = "http://commentsection-env-1.eba-w7bqwdmq.us-east-1.elasticbeanstalk.com/comment-app"
const backendUrl = BACK_URL_DEV + "/index.php"

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
    // mode: 'cors',
    method: "POST",
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    body: data
  });
  
  return response
}
