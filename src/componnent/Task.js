import React, { useContext } from 'react'
import {TaskListContext} from '../context/TaskListContext'

const Task = ({task}) => {
    // const {remove_Task} = useContext(TaskListContext)
    const {remove_Task,find_Item} = useContext(TaskListContext)
    return (
        <li className="list-item">
            <span>{task.title}</span>
            <div>
                <button className="task-btn btn-delete" onClick={()=>remove_Task(task.id)}>
                    <i className="fas fa-trash-alt"></i>
                </button>
                <button className="task-btn btn-edit" onClick={()=>find_Item(task.id)}>
                    <i className="fas fa-pen   "></i>
                </button>
            </div>
            
        </li>
    )
}

export default Task
