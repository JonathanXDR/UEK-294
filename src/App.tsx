import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskList from './components/TaskList';
import ITask from './models/Task';
import AddTask from './components/AddTask';

const defaultTasks: Array<ITask> = [
  { taskDescription: 'Feed the cats', completed: false, taskId: 1 },
  { taskDescription: 'Test the software', completed: false, taskId: 2 },
];

function App() {
  const [tasks, setTasks] = useState(defaultTasks);

  function addTask(task: ITask) {
    let highestId = 0;
    for (let i = 0; i < tasks.length; i++) {
      let currentId = tasks[i].taskId ?? 0;
      if (currentId > highestId) {
        highestId = currentId;
      }
    }
    task.taskId = highestId + 1;
    setTasks([...tasks, task]);
  }

  function deleteTask(task: ITask) {
    let nonDeletedTasks = tasks.filter(
      (currentTask) => task.taskId !== currentTask.taskId
    );
    setTasks(nonDeletedTasks);
  }

  return (
    <div className="App">
      <TaskList tasks={tasks} deleteTask={deleteTask}></TaskList>
      <AddTask add={addTask}></AddTask>
    </div>
  );
}

export default App;
