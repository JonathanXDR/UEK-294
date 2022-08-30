import React, { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import ITask from './models/Task';
import AddTask from './components/AddTask';
import axios from 'axios';
import LoginPage from './components/LoginPage';

const defaultTasks: Array<ITask> = [];
const baseURL = 'http://127.0.0.1:3000';

function App() {
  const [tasks, setTasks] = useState(defaultTasks);

  const token = localStorage.getItem('token');

  React.useEffect(() => {
    axios
      .post(`${baseURL}/auth/jwt/sign`, {
        email: 'irgendeine@email.adresse',
        password: 'm294',
      })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${baseURL}/auth/jwt/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  if (!tasks) return null;

  function addTask(task: ITask) {
    const body = {
      id: task.id,
      title: task.title,
      completed: task.completed,
    };

    let highestId = 0;
    for (let i = 0; i < tasks.length; i++) {
      let currentId = tasks[i].id ?? 0;
      if (currentId > highestId) {
        highestId = currentId;
      }
    }

    task.id = highestId + 1;
    // console.log(task);

    axios
      .post(`${baseURL}/auth/jwt/tasks`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // console.log(token);
        setTasks([...tasks, task]);
      })
      .catch((error) => {
        console.log(error);
      });

    if (!task) return 'No post!';
  }

  function updateTask(task: ITask) {
    console.log(task.title);

    const body = {
      id: task.id,
      title: task.title,
      completed: task.completed,
    };

    axios
      .put(`${baseURL}/auth/jwt/tasks/${task.id}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTasks(
          tasks.map((t) => {
            if (t.id === task.id) {
              return task;
            }
            return t;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteTask(task: ITask) {
    let nonDeletedTasks = tasks.filter(
      (currentTask) => task.id !== currentTask.id
    );

    axios
      .delete(`${baseURL}/auth/jwt/task/${task.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Task successfully deleted!');
        setTasks(nonDeletedTasks);
      })
      .catch((error) => {
        console.log(error);
      });

    if (!tasks) return 'No post!';
  }

  return (
    <div className="App container margin-top-4">
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        editTask={updateTask}
      ></TaskList>
      <AddTask add={addTask}></AddTask>
      {/* <LoginPage /> */}
    </div>
  );
}

export default App;
