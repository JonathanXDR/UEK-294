import ITask from '../models/Task';

export interface IProps {
  tasks: ITask[];
  deleteTask: (task: ITask) => void;
}

function TaskList(props: IProps) {
  return (
    <div className="list">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Titel</td>
            <td>Completed</td>
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
  );
}

export default TaskList;
