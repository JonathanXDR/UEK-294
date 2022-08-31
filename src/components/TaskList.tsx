import ITask from '../models/Task';
import '@swisscom/sdx/dist/css/webcomponents.css';
import '@swisscom/sdx/dist/css/sdx.css';

export interface IProps {
  tasks: ITask[];
  deleteTask: (task: ITask) => void;
  editTask: (task: ITask) => void;
}

function TaskList(props: IProps) {
  return (
    <div className="table margin-top-4">
      <div
        id="my-table"
        className="table table--responsive table--highlight width100"
      >
        <h1 className="table__title">Todo App</h1>
        <div className="table__wrapper">
          <table>
            <thead>
              <tr>
                <th datatype="number">ID</th>
                <th datatype="string">Title</th>
                <th datatype="boolean">Completed</th>
                <th>Tools</th>
              </tr>
            </thead>
            <tbody>
              {props.tasks.map((task) => {
                return (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td className="title">{task.title}</td>
                    <td>
                      <sdx-input-item
                        type="checkbox"
                        checked={task.completed}
                      ></sdx-input-item>
                    </td>
                    <td className="buttons">
                      <sdx-button
                        theme="secondary"
                        label="Edit"
                        onClick={() => props.editTask(task)}
                      ></sdx-button>

                      <sdx-button
                        theme="primary"
                        label="Delete"
                        onClick={() => props.deleteTask(task)}
                      ></sdx-button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
