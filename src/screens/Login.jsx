import React from "react";
import {useState} from "react";
import "./Login.css";
import shoppingImg from "../images/shopping.png"
import {Link}  from "react-router-dom";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {setHeaders} from "../config/axiosBaseUrl.js";

function Login(){

    const Navigate  = useNavigate();
    const [user,setUser] = useState({
        email : "",
        password : ""
    });

async function sendLoginRequest(){
 
         var error = "";
         if(user.email === "")
         {
            error = error + "   Email is Not Entered.";
         }
         if(user.password === "")
         {
             error = error + "  Password is not entered";
         }
         if(error==="")
         {
              var response = await axios.post("/login",user);
              console.log(response.data);
              if(response.data.status)
              {
                  setHeaders(response.data.id);
                  Navigate("/App");
              }
              else{ 
                document.getElementById("login-error").style.visibility="visible";
                document.getElementById("login-error").innerHTML= response.data.message;
                document.getElementById("login-error").style.color = "red"
              }

         }
         else{
            alert(error);
            document.getElementById("login-error").style.visibility="visible";
            document.getElementById("login-error").innerHTML=error;
            document.getElementById("login-error").style.color = "red";
         }
    }

function LoginDetails(event){

          setUser({
            ...user,[event.target.name]: event.target.value
          })
          console.log(user);
    }

    return (
        <div className="container">
            <div className="logo">
                <img src={shoppingImg} width="80%"alt=" NoImage" />
            </div>
            <div className="login">
                <div className="login-info">
                   <p style={{fontWeight:"bold"}}>Login To <span style={{color:"green",fontSize:"20px"}}>SuperShopping</span> </p>

                   <input onChange={LoginDetails} className="input" type="text" name="email" placeholder="Email Address"/>

                   <input onChange={LoginDetails} className="input" type="password" name="password" placeholder="password" />

                   <p>Don't have an account <Link to="/">SignUp</Link></p>

                   <p style={{visibility:"hidden"}} id="login-error"></p>

                   <button onClick={sendLoginRequest}id="login" >Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;