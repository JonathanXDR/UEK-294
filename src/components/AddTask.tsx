import { useState } from 'react';
import ITask from '../models/Task';
export interface IProps {
  add: (newItem: ITask) => void;
}

const initTask = { title: '', id: 0, completed: false };
function AddTask(props: IProps) {
  const [formValue, setFormValue] = useState(initTask);

  const onInputChange = (e: React.ChangeEvent<HTMLSdxInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name as string]: value });
  };

  function onSubmit(e: React.FormEvent<HTMLSdxButtonElement>) {
    e.preventDefault();
    props.add(formValue);
    setFormValue({ ...formValue, title: '' });
  }

  return (
    <div className="addTask margin-top-4">
      <form className="formAdd">
        <div className="margin-bottom-4">
          <label htmlFor="title">Add Task</label>
          <sdx-input
            name="title"
            type="text"
            placeholder="Enter your Tasks"
            value={formValue.title}
            onInput={onInputChange}
          ></sdx-input>
        </div>
        <sdx-button
          theme="primary"
          label="Add"
          type="submit"
          onClick={onSubmit}
        ></sdx-button>
      </form>
    </div>
  );
}

export default AddTask;
