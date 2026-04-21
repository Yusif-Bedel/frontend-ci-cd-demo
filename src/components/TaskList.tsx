import type { Task } from "../App";

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onDelete }: Props) {
  return (
     <div>
      {tasks.map(task => (
        <div className="task" key={task.id}>
          <span>{task.text}</span>
          <button onClick={() => onDelete(task.id)}>❌</button>
        </div>
      ))}
    </div>
  );
}