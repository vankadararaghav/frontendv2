import React from "react";
import "./Task.css"
import {useState} from "react";
import axios from "axios";
import "./Task.css";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function Task(props){
    const Navigate = useNavigate();
     //const [value,setValue] = useState(props.task);
    const [editvalue, setEditValue] = useState(props.task);
    const [check,setCheck] = useState(props.isDone);

    useEffect(()=>{
       document.getElementById(props.id).checked= check;
       if(check===true)
       {
         document.getElementById("p"+props.id).style.textDecoration="line-through";
       }
       if(check===false)
       {
        document.getElementById("p"+props.id).style.textDecoration="none";
       }
       console.log("useEffect",check);
    },[check]);

    console.log("propValues: ", props.task);
    function editValueChange(event){
      setEditValue(event.target.value);
      
    }
    async function toggleCheck(){
         
         var response = await axios.put("/checkbox",{
          "task_id": props.id,
           "checked": !check,
         });
         if(response.data.status)
         {   
             setCheck(!check);
         }
         else{
          if(response.data.message==="Please Login")
          {
            Navigate("/");
          }
          else{
            alert(response.data.message);
          }
         }
    }
    async function edit(event){
      if(editvalue){
      var response = await axios.put("/editdata",{
                                          "task": editvalue,
                                          "id": props.id
                                        });
      if(response.data.status) {
        console.log('[Task.js][Sending Data to App.js]' + editvalue);
        props.updateTask(props.id,editvalue);
      }
      else {
        if(response.data.message==="Please Login")
        {
          Navigate("/");
        }
        else{
          alert('[updateValue][Error]: ' + response.data.message);
        }
        
      }
    }
    else{
       alert("Enter some value");
    }
    }

    async function remove(){
      console.log(props.id);  
      var response = await axios.delete("/removetask/"+props.id+"/"+props.currentPage);
      if (response.data.status){
          console.log("after successful Removing" , response.data);
          var response_data = await axios.get("/pages/"+props.currentPage+"/"+props.id);
          console.log("data after deleting",response.data.data);
          if(response_data.data.status){
            console.log("response after deleting",response_data);
            props.removeTask(props.id,response_data.data.data,response.data.nPages);
          }
          else{
            if(response_data.data.message==="Please Login")
            {
               Navigate("/");
            }
        else{
          alert(response.data.message);
        }
             
          }
         
      }
      else {
        if(response.data.message==="Please Login")
        {
          Navigate("/");
        }
        else{
          alert(response.data.message);
        }
      }
    }
    return (
      <div className="task-container">
          <input onChange={toggleCheck}  type="checkbox"  id={props.id} className="checkbox-input" />
          <p style={{fontSize:"20px"}} id={"p"+props.id}className="task-input" >{props.task}</p>
          {/* <input className="task-input" type="text" value={props.task} id={props.id}/> */}
          <button  className="todo-button" data-toggle="modal" data-target={"#x"+props.id}>Edit</button>
          <div className="modal fade" id={"x"+props.id} role="dialog">
             <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <label className="form-label">Edit the value</label>
                    <input value={editvalue} onChange={editValueChange} type="text" className="form-control" />
                  </div>
                  <div className="modal-footer">
                    {/* //<button className="btn btn-primary" data-dismiss="modal">close</button> */}
                    <button className="btn btn-primary" onClick={edit} data-dismiss="modal">edit</button>
                  </div>
                </div>
             </div>
            
          </div>

          <button onClick={remove} className="todo-button" >Remove</button>

      </div>
    );
}
export default Task;