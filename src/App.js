import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from "react";
const App = () => {
  // putting into App becomes global state and then we can pass to our components
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Go Eat Dinner",
      day: "Feb 5th a 2:30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Meeting at School",
      day: "Feb 6th a 1:30pm",
      reminder: true,
    },
    {
      id: 3,
      text: "Food Shopping",
      day: "Feb 7th a 3:30pm",
      reminder: false,
    },
  ]);

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
      <Header title="Hello Task Tracker" />
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelte={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Tasks to show"
      )}
    </div>
  );
};

export default App;
