import React, { useState, useEffect } from "react";
import "./App.css";

import axios from "axios";

import Task from "./components/Task";
import {useNavigate} from "react-router-dom";

function App() {
  const Navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const nPages = Math.ceil(tasks.length / recordsPerPage);
  const data = tasks.slice(firstIndex, lastIndex);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    console.log(nPages);
    var newArray = [];
    for (let i = 1; i <= nPages; i++) {
      console.log("called");
      newArray.push(i);
    }
    setNumbers(newArray);
  }, [nPages]);

  useEffect(() => {
    async function getAllData() {
      const response = await axios.get("/getalltasks");
      if (response.data.status) {
        setTasks(response.data.data);
      } else {
        alert(response.data.message);
        Navigate("/login");
      }
    }
    getAllData();
  }, []);

  // console.log("Inside the app" );
  // console.log(tasks);

  function TaskName(event) {
    // console.log(taskName);
    setTaskName(event.target.value);
  }

  async function addToTask() {
    // console.log("hii")
    if (taskName) {
      // alert("request is going to send");
      var response = await axios.post("/addtask", {
        task: taskName,
      });

      if (response.data.status) {
        console.log("Response from Backend: ", response.data.data);
        setTasks([...tasks, response.data.data]);
      } else {
        alert("[adddToTask][Error]: ", response.data.message);
      }
    } else {
      alert("Enter some task");
    }
  }

  function updateTask(id, editValue) {
    console.log("[App.js][Values from Task.js]: " + id + editValue);
    const newTasks = tasks.map((task) => {
      if (task._id === id) {
        task.task = editValue;
        return task;
      }
      return task;
    });
    console.log("[App.js][newTask]: ", newTasks);
    setTasks(newTasks);
  }
  function removeTask(id) {
    console.log("Removing task" + id);
    setTasks((prevTasks) => {
      const newTasks = prevTasks.filter((task) => task._id !== id);
      console.log(newTasks);
      return newTasks;
    });
    console.log("Tasks after removing");
    console.log(tasks);
  }

  useEffect(() => {
    console.log("rerendering....", tasks);
  }, [tasks]);
  async function removeAll() {
    console.log("req is going to send");
    const response = await axios.delete("/removeall");
    if (response.data.status) {
      setTasks([]);
    } else {
      alert(response.data.message);
    }
  }
  function prePage(){
   
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      console.log("currentPage",currentPage);
    }

  }
  function nextPage() {
    if (currentPage !== numbers.length) {
      setCurrentPage(currentPage + 1);
      console.log("currentPage",currentPage);
    }

  }
  function changepage(n) {
    setCurrentPage(n);
    console.log("currentPage",currentPage);

  }

  return (
    <div className="todo-container">
      <div className="todo-heading">TODO LIST</div>
      <div className="todo-add">
        <input
          onChange={TaskName}
          value={taskName}
          className="todo-input"
          type="text"
          placeholder="Add Item"
        />
        <button className="todo-button" onClick={addToTask}>
          {" "}
          Add{" "}
        </button>
      </div>
      <p className="todo-desc">Here is your Todo List:{")"}</p>
      <div className="alltasks">
            {data.map((eachTask) => {
                console.log("[eachTask]: ", eachTask);
                return (
                <Task
                    key={eachTask._id}
                    task={eachTask.task}
                    id={eachTask._id}
                    updateTask={updateTask}
                    removeTask={removeTask}
                    tasks={tasks}
                />
                );
            })}
      </div>
      <div className="todo-removeAll">
        <button onClick={removeAll} className="todo-button">
          RemoveAll
        </button>
      </div>
      <div>
        <ul className="pagination">
          <li className="page-item">
            <button onClick={prePage} className="page-link">
              Prev
            </button>
          </li>
          {
            numbers.map((number,i) => (
                <li className="page-item">

                    {
                           currentPage===number ? <button style={{backgroundColor:"#1C1C4A"}} onClick={()=>{ changepage(number,i)}} id={i} className="page-link">
                        {number}
                      </button> :  <button onClick={()=>{ changepage(number,i)}} id={i} className="page-link">
                        {number}
                       </button>
                    }
                   


                </li>
            ))
          }
          <li className="page-item">
            <button onClick={nextPage} className="page-link">
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
