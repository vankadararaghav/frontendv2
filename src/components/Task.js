import React from "react";
import "./Task.css"
import {useState} from "react";
import axios from "axios";


function Task(props){
    // var Navigate = useNavigate();
     //const [value,setValue] = useState(props.task);
    const [editvalue, setEditValue] = useState(props.task);
    console.log("propValues: ", props.task);
    function editValueChange(event){
      setEditValue(event.target.value);
      //  console.log(editvalue);
    }

    async function edit(event){
      // alert("request is going to send");
      // alert(editvalue);
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
        alert('[updateValue][Error]: ' + response.data.message);
      }
    }
    else{
       alert("Enter some value");
    }
    }

    async function remove(){
      console.log(props.id);  
      var response = await axios.delete("/removetask/"+props.id);
      if (response.data.status){
          alert(response.data.message);
          props.removeTask(props.id);
      }
      else {
          alert(response.data.message);
      }
    }
    return (
      <div className="task-container">
          <input className="task-input" type="text" value={props.task} id={props.id}/>
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