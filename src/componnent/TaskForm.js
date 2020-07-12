import React, { useState,useContext } from 'react'
import {TaskListContext} from '../context/TaskListContext'
import { useEffect } from 'react'

const TaskForm = () => {
    const {add_Task,clear_Tasks,editItem,edit_Task} = useContext(TaskListContext)

    const [title,setTitle] = useState('')
    const handleSubmit = (e)=>{

        e.preventDefault()
        if(!editItem){
             add_Task(title);
            setTitle('');
        }else {
             edit_Task(editItem.id,title)
        }
           
    }
    useEffect(() => {
        if (editItem) {
          setTitle(editItem.title)
        } else {
          setTitle('')
        }
      }, [editItem])
   
    return (
        <form className="form" onSubmit={handleSubmit}>
            <input className="task-input" 
            type="text" 
            placeholder="Add Task .."
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
             />
             <div className="buttons">
                 <button  type="submit" className="btn add-task-btn" >
                     {editItem? 'Edit Task' : 'Add Task'}
                     </button>
                 <button type="reset" className="btn clear-btn" onClick={clear_Tasks}>Clear</button>

             </div>
        </form>
    )
}

export default TaskForm
