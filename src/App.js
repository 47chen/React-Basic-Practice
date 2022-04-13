import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState } from "react";
const App = () => {
  // putting into App becomes global state and then we can pass to our components
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Add Task
  const addTask = (task) => {
    // give a random new Id, and create a newTask within Id
    // setTasks([]) is an array then we want to keep our previous tasks and then add a new task
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task }; // is an new object within Id
    setTasks([...tasks, newTask]);
  };

  // Delete Task func
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      {/*onAdd & showAdd in here are props you can name it whatever you want */}
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {/* onAdd is props that need to pass, addTask is object as function */}
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelte={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Tasks to show"
      )}
    </div>
  );
};

export default App;
