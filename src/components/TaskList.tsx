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
    <div className="table">
      <div
        id="my-table"
        className="table table--responsive table--highlight width100"
      >
        <h2 className="table__title">Todo App</h2>
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
                    <td>{task.title}</td>
                    <td>{task.completed}</td>
                    <td>
                      <sdx-button
                        theme="primary"
                        label="Delete"
                        onClick={() => props.deleteTask(task)}
                      ></sdx-button>

                      <sdx-button
                        theme="secondary"
                        label="Edit"
                        onClick={() => props.editTask(task)}
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
