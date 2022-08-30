import { useState } from 'react';
import ITask from '../models/Task';
export interface IProps {
  add: (newItem: ITask) => void;
}

const initTask = { taskDescription: '', taskId: 0, completed: false };
function AddTask(props: IProps) {
  const [formValue, setFormValue] = useState(initTask);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.add(formValue);
  }

  return (
    <div className="addTask">
      <form className="formAdd" onSubmit={onFormSubmit}>
        <sdx-input
          type="text"
          placeholder="Add Task"
          value={formValue.taskDescription}
          // onChange={onInputChange}
        ></sdx-input>
        <input
          type="text"
          placeholder="please input name"
          name="taskDescription"
          value={formValue.taskDescription}
          onChange={onInputChange}
        />
        <button>Add</button>
        <sdx-button label="Add"></sdx-button>
      </form>
    </div>
  );
}

export default AddTask;
