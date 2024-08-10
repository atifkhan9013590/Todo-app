import React, { useContext, useState ,useRef} from 'react'
import { TodoContext } from '../context/TodoContext'
import pen from '../assets/pen.png';
import dlticon from '../assets/delete.png'
import up from '../assets/up-arrow.png'
import down from '../assets/down-arrow (1).png'
import './Todo.css'
function Todo() {
    const [NewTask,setNewTaSK] = useState('')
    const [isEditing,setisEdting] = useState(false);
    const [editindex,setEditIndex] = useState(null)
    const {state,dispatch} = useContext(TodoContext)
    const inputRef = useRef();

    const AddTask =() =>{
           if (NewTask !== "") {
             if (isEditing) {
               dispatch({
                 type: "UPDATE_TASK",
                 payload:{ index:editindex,newTask:NewTask },
               });
             setisEdting(false);
            setEditIndex(null);
             } else {
               dispatch({ type: "ADD_TASK", payload: NewTask });
             }
           setNewTaSK("");
           }
    }
    const DeleteTask = (index) =>{
        dispatch({type:"DELETE_TASK",payload:index})
    }
    const EditTask = (index,tsk) =>{
        setNewTaSK(tsk)
        setEditIndex(index)
        setisEdting(true)
        inputRef.current.focus()

    }

    const completeTask = (index) => {
      dispatch({ type: "COMPLETE_TASK", payload:index });
    };

       const MoveTaskUp = (index) => {
         dispatch({ type: "MOVE_TASK_UP", payload: index });
       };

       const MoveTaskDown = (index) => {
         dispatch({ type: "MOVE_TASK_DOWN", payload: index });
       };
    const completedTaskCount = state.Task.filter((task) => task.complete);
  return (
    <div className="todo-list">
      <h2>TODO LIST</h2>
      <h5>
        Complete Task:{completedTaskCount.length}/{state.Task.length}
      </h5>
      <div className='head'>
        <input
          className="inptask"
          ref={inputRef}
          value={NewTask}
          onChange={(e) => setNewTaSK(e.target.value)}
          placeholder="Enter Task"
        />
        <div className="addbtn" onClick={AddTask}>
          {isEditing ? "UPDATE TASK" : "ADD TASK"}
        </div>
      </div>

      {state.Task.map((tsk, index) => {
        return (
          <div key={index} className="todo">
            <div className="task-div">
              <input
                type="checkbox"
                checked={tsk.complete}
                onChange={() => completeTask(index)}
              />
              <div className={tsk.complete ? "taskcom" : "tskadd"}>
                {tsk.task}
              </div>
            </div>
            <div className="button-div">
              <img
                className="imag"
                src={dlticon}
                alt="icon"
                onClick={() => DeleteTask(index)}
              />
              <img
                className="imag"
                src={pen}
                alt="icon"
                onClick={() => EditTask(index, tsk.task)}
              />
              <img
                className="imag"
                alt="icon"
                src={up}
                onClick={() => MoveTaskUp(index)}
              />
              <img
                className="imag"
                alt="icon"
                src={down}
                onClick={() => MoveTaskDown(index)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Todo