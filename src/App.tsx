import React, { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import ITask from './models/Task';
import AddTask from './components/AddTask';
import axios from 'axios';
import Login from './components/Login';

const defaultTasks: Array<ITask> = [];
const baseURL = 'http://127.0.0.1:3000';

function App() {
  const headers = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  const [tasks, setTasks] = useState(defaultTasks);
  const [token, setToken] = useState('');
  const [displayLogin, setDisplayLogin] = React.useState(true);

  const title = document.getElementsByClassName('table__title')[0];

  React.useEffect(() => {
    axios.get(`${baseURL}/auth/jwt/tasks`, headers).then((response) => {
      setTasks(response.data);
      title.innerHTML = 'You are logged in - Welcome to Todo App!';
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!tasks) return null;

  function updateToken(token: string) {
    setToken(token);
    console.log('update Token');
  }

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

    axios
      .post(`${baseURL}/auth/jwt/tasks`, body, headers)
      .then((response) => {
        alert('Task successfully created');
        setTasks([...tasks, task]);
      })
      .catch((error) => {
        alert(error);
      });

    if (!task) return 'No post!';
  }

  function updateTask(task: ITask) {
    const body = {
      id: task.id,
      title: task.title,
      completed: task.completed,
    };

    axios
      .put(`${baseURL}/auth/jwt/tasks/${task.id}`, body, headers)
      .then((response) => {
        alert('Task successfully updated');
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
        alert(error);
      });
  }

  function deleteTask(task: ITask) {
    let nonDeletedTasks = tasks.filter(
      (currentTask) => task.id !== currentTask.id
    );

    axios
      .delete(`${baseURL}/auth/jwt/task/${task.id}`, headers)
      .then(() => {
        alert('Task successfully deleted');
        setTasks(nonDeletedTasks);
      })
      .catch((error) => {
        alert(error);
      });

    if (!tasks) return 'No post!';
  }

  return (
    <div className="App container">
      <TaskList tasks={tasks} deleteTask={deleteTask}></TaskList>
      <AddTask add={addTask}></AddTask>
      {displayLogin ? (
        <Login setToken={updateToken} setDisplayLogin={setDisplayLogin} />
      ) : null}
    </div>
  );
}

export default App;
