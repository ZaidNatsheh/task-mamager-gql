import React, {createContext, useState } from 'react'
import { useSubscription,useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag'


const ADD_TASK=gql `
mutation MyMutation($title:String!) {
    insert_tasks(objects: {title: $title}) {
      affected_rows
      returning {
        title
        id
        created_at
      }
    }
  }`

  const CLEAR_TASKS=gql`
  mutation clear {
    delete_tasks(where: {}) {
      affected_rows
    }
  }
  `
  const REMOVE_TASK=gql`
  mutation clear_tasks($id:uuid!) {
    delete_tasks(where: {id: {_eq: $id}}){
      affected_rows
    }
  }
  
  `
  const GET_TASK=gql`
  subscription MySubscription {
    tasks {
      title
      id
    }
  }
  `

  const UPDATE_TASK=gql`
  mutation MyMutation($id:uuid!,$title:String!) {
    update_tasks(where: {id: {_eq: $id}}, _set: {title: $title}) {
      affected_rows
      returning {
        title
        id
      }
    }
  }
  
  `

export const TaskListContext = createContext()
const TaskListContextProvider = props => {

    const [editItem,setEditItem] = useState(null)

    const [removeTask] = useMutation(REMOVE_TASK,{
                        onError : ()=> console.log('Remove Task Error!'),
                        onCompleted : ()=> console.log('Remve Item Done!')
                       });

    const [addTask] = useMutation(ADD_TASK, {
                     onError: () => (error => console.error(error)), 
                     onCompleted: () => console.log('add  completed!'), 
                      }); 

    const [clear_Tasks] = useMutation(CLEAR_TASKS,{
                         onError:()=> console.log('Error...!'),
                       onCompleted : ()=> console.log('Clear Tasks Completed!')
                      })
    const [updateTask] = useMutation(UPDATE_TASK,{
                         onError:()=> console.log('Edit Error...!'),
                       onCompleted : ()=> console.log('Update Task Completed!')
                      })

    const {data} = useSubscription(GET_TASK,{
                         onError:()=> console.log('Error...!'),
                       onCompleted : ()=> console.log('Get task Completed!')
                      })
        
    const edit_Task = (id,title)=>{
        updateTask({variables:{id:id,title:title}})
        setEditItem(null)
    }  
    const find_Item =(id)=>{

        const item = data.tasks.find(task => task.id === id)
       setEditItem(item)  
       
   } 
   /*  const find_Item=(id)=>{
        const item = data.tasks.find(task => task.id = id) 
        setEditItem(item)
    } */
                      

   const add_Task =(title)=>{
        addTask({variables:{title:title}})
   }
   const remove_Task =(id) =>{
    removeTask({variables:{id:id}})
   }
  return (
    <TaskListContext.Provider
      value={   
      { 
        add_Task,
        clear_Tasks,
        remove_Task,
        find_Item,
        editItem,
        edit_Task
     }
      }  
    >
      {props.children}
    </TaskListContext.Provider>
  )
}

export default TaskListContextProvider
