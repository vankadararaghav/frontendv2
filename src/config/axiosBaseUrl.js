import axios from "axios";

function baseURL(){
       axios.defaults.baseURL= "https://backendv2-production-17fe.up.railway.app/";
    // axios.defaults.baseURL = 'https://basictodo2.up.railway.app/';
}
function setHeaders(id){
   
    axios.defaults.headers.common['id'] = id;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
}
export  {baseURL,setHeaders};