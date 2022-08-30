import React, { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import ITask from './models/Task';
import AddTask from './components/AddTask';
import axios from 'axios';

const defaultTasks: Array<ITask> = [];
const baseURL = 'http://127.0.0.1:3000';

function App() {
  const [tasks, setTasks] = useState(defaultTasks);

  React.useEffect(() => {
    axios
      .get(`${baseURL}/auth/jwt/tasks`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!tasks) return null;

  function addTask(task: ITask) {
    let highestId = 0;
    for (let i = 0; i < tasks.length; i++) {
      let currentId = tasks[i].id ?? 0;
      if (currentId > highestId) {
        highestId = currentId;
      }
    }

    task.id = highestId + 1;
    console.log(task);

    axios
      .post(`${baseURL}/auth/jwt/tasks`, {
        id: task.id,
        title: task.title,
        completed: task.completed,
      })
      .then((response) => {
        setTasks([...tasks, task]);
      })
      .catch((error) => {
        console.log(error);
      });

    if (!task) return 'No post!';
  }

  function deleteTask(task: ITask) {
    let nonDeletedTasks = tasks.filter(
      (currentTask) => task.id !== currentTask.id
    );

    axios
      .delete(`${baseURL}/auth/jwt/task/${task.id}`)
      .then(() => {
        setTasks(nonDeletedTasks);
      })
      .catch((error) => {
        console.log(error);
      });

    if (!tasks) return 'No post!';
  }

  return (
    <div className="App">
      <TaskList tasks={tasks} deleteTask={deleteTask}></TaskList>
      <AddTask add={addTask}></AddTask>
    </div>
  );
}

export default App;
