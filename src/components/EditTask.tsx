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

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.add(formValue);
    setFormValue({ ...formValue, title: '' });
  }

  return (
    <div className="addTask margin-top-4">
      <form className="formAdd" onSubmit={onFormSubmit}>
        <sdx-input
          type="text"
          placeholder="Add Task"
          name="title"
          value={formValue.title}
          onInput={onInputChange}
        ></sdx-input>
        <sdx-button theme="primary" label="Add" type="submit"></sdx-button>
      </form>
    </div>
  );
}

export default AddTask;
