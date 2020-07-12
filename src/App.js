import React from 'react';
import './App.css';
import Haeder from './componnent/Haeder';
import TaskForm from './componnent/TaskForm';
import TaskList from './componnent/TaskList';
import TaskListContextProvider from './context/TaskListContext';

function App() {
  return (
    <TaskListContextProvider>
     <div className="container">
      <div className="app-wrapper">
        <div className="main">
        <Haeder />
          <TaskForm />
          <TaskList />         
        </div>

      </div>
    </div>
    </TaskListContextProvider>
  );
}

export default App;
