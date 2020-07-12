import React from 'react'
import Task from './Task'
import { useSubscription } from "@apollo/react-hooks";
import gql from 'graphql-tag'
import Spinner from '../componnent/Spinner'

const GET_TASKS=gql`
subscription MySubscription {
  tasks(order_by: {created_at: desc}) {
    created_at
    id
    title
  }
}

`
const TaskList = () => {
    const {data,error,loading} = useSubscription(GET_TASKS)
    if(loading){
        return <Spinner />
    }
    if(error){
        return <div>Error...</div>
    }
    return (
        <div>
            {data.tasks.length ? ( <ul className="list">
                
                {data.tasks.map((task) =>{
                    return (<Task task={task} key={task.id}  />)
                })}
               
           </ul>) :  (<div className='no-tasks'>No Tasks</div>)}
           
        </div>
    )
}

export default TaskList
