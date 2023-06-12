import React from "react";
import {useState} from "react";
import "./Login.css";
import shoppingImg from "../images/shopping.png"
import {Link}  from "react-router-dom";
import axios from "axios";


function Signup(){
    
    const  [user,setUser] = useState({
        name:"",
        email:"",
        password:""
    });


function signup(event){

              setUser(
                  {...user,[event.target.name]:event.target.value}
            )
          console.log(user);
    }

    
    
async function sendSignupRequest(){
        console.log(user.name+" " + user.email + " " + user.password + " ");
         var error="";
         if(user.name===""){
             error = error+"Name is not entered "
             console.log(error);
         }
         if(user.email===""){
             error= error+"Email is not entered "
             console.log(error);
         }
         if(user.password==="")
         {
             error = error+"passsworrd is not entered "
             console.log(error);
         }
        if(error==="")
        {
            alert("request is going to send");
            console.log("request sent");
            var response = await axios.post("/signup",user);
            console.log(response);
            alert(response.data.message);
            document.getElementById("signup-error").style.visibility="visible";
            document.getElementById("signup-error").innerHTML= " " + response.data.message;
            document.getElementById("signup-error").style.color = "green";
        }
        else{
            document.getElementById("signup-error").style.visibility="visible";
            document.getElementById("signup-error").innerHTML=error;
            document.getElementById("signup-error").style.color = "red";
        }

}



    return (

        <div className ="container">
            <div className="logo">
            <img  src={shoppingImg} alt="NoImage" width="80%" />
            </div>
            <div className="login">

                <div className="login-info">

                   <p style={{fontWeight:"bold"}}>Signup To <span style={{color:"green",fontSize:"20px"}}>TodoList</span> </p>

                   <input onChange={signup}   className="login-input" type="text" name="name" placeholder="    Name"/>

                   <input onChange={signup}   className="login-input" type="text" name="email" placeholder="   Email Address"/>

                   <input onChange={signup}   className="login-input" type="password" name="password" placeholder="   password" />

                   <p>Already Have an Account <Link to="/login">Login</Link></p>

                   <p style={{visibility:"hidden"}} id="signup-error"></p>

                   <button onClick= {sendSignupRequest} id="login" >Signup</button>
                   
                </div>

            </div>

        </div>
    )
}
export default Signup;
