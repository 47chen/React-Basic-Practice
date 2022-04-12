import Task from "./Task";

export const Tasks = ({ tasks, onDelte, onToggle }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelte}
          onToggle={onToggle}
        />
      ))}
    </>
  );
};

export default Tasks;
