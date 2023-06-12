import axios from "axios";

function baseURL(){
    //    axios.defaults.baseURL= "https://backendv2-production-17fe.up.railway.app/";
    // axios.defaults.baseURL = 'https://basictodo2.up.railway.app/';
       axios.defaults.baseURL = "http://localhost:5000/";
    
}
function setHeaders(id){
    id= localStorage.getItem("id");
    console.log("id in headers:" , id);
    axios.defaults.headers.common['id'] = id;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
}
export  {baseURL,setHeaders};