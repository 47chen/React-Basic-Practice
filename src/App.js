import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react";
const App = () => {
  // putting into App becomes global state and then we can pass to our components
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks(); // promise need async and await
      // and now we have our fetchTasks we can store them into our Task state
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3001/tasks");
    const data = await res.json();

    return data;
  };

  // Add Task
  const addTask = async (task) => {
    // we have our respond which is a new Task
    const res = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
    });

    // get the data from this res, data represent new task
    const data = await res.json();
    // setTask to manipulate our tasks state
    setTasks([...tasks, data]);

    // give a random new Id, and create a newTask within Id
    // setTasks([]) is an array then we want to keep our previous tasks and then add a new task
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task }; // is an new object within Id
    // setTasks([...tasks, newTask]);
  };

  // Delete Task func

  // fetch(url, object), second is a paras that tell server to do what action
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, { method: "DELETE" });
    // update the UI to filter the task which task is not equal our Id
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
