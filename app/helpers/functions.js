export function timeAgo(timestamp) {
    const now = new Date().getTime() /1000;
    const then = new Date(timestamp).getTime();
    const diff = now - then;
  
    if (diff < 60){
        return `${Math.floor(diff)} seconds ago`;
    }
    else if( diff < 3600){
        return `${Math.floor(diff / 60)} minutes ago`;
    }
    else if( diff < 86400){
        return `${Math.floor(diff / 3600)} hours  ago`;
    }
    else if( diff < 2678400){
        return `${Math.floor(diff / 86400)} days  ago`;
    }
    else if( diff < 31104000){
        return `${Math.floor(diff / 2592000)} months ago`;
    }
    else {
        return `${Math.floor(diff / 31104000)} years ago`;
    }
        
}