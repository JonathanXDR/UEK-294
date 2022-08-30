import { useState } from 'react';
import ITask from '../models/Task';
export interface IProps {
  add: (newItem: ITask) => void;
}

const initTask = { title: '', id: 0, completed: false };
function AddTask(props: IProps) {
  const [formValue, setFormValue] = useState(initTask);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name as string]: value });
    console.log(formValue.title);
  };

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.add(formValue);
    // props.onUpdateUser(user.id, user);
    setFormValue({ ...formValue, title: '' });
  }

  return (
    <div className="addTask">
      <form className="formAdd" onSubmit={onFormSubmit}>
        {/* <sdx-input
          type="text"
          placeholder="Add Task"
          name="title"
          value={formValue.title}
          onChange={onInputChange}
        ></sdx-input> */}
        <input
          id="input"
          type="text"
          placeholder="please input name"
          name="title"
          value={formValue.title}
          onChange={onInputChange}
        />
        <sdx-button theme="primary" label="Add"></sdx-button>

        <div>
          <sdx-button theme="primary" label="Save"></sdx-button>
          <sdx-button theme="cancel" label="Cancel"></sdx-button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
