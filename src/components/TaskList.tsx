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
              <tr key={task.taskId}>
                <td>{task.taskId}</td>
                <td>{task.taskDescription}</td>
                <td>{task.completed}</td>
                <sdx-button
                  label="Delete"
                  onClick={() => props.deleteTask(task)}
                ></sdx-button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
