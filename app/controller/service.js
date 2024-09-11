const backendUrl = "http://localhost/comment-app/routes.php"

export async function getComments(){
  return await fetch(`${backendUrl}/comments`)
}

export async function getUserInfo(id){
  return await fetch(`${backendUrl}/userInfo?id=${id}`)
}

export async function addComment(data){

    const response = await fetch(`${backendUrl}/addComment`, {
        method: "POST", 
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: data
      });

    return response;
}

export async function editScore(data){
  const response = await fetch(`${backendUrl}/editScore`,{
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: data
  });
  
  return response
}

/* User Requests */
export async function login(data){
  const response = await fetch(`${backendUrl}/login`,{
    method: "POST",
    body: data
  });
  
  return response
}
