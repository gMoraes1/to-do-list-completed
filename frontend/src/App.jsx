import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useTask } from "./hooks/useTask";

function App() {
  const { tasks, addTask, editTask, removeTask } = useTask();

  
  const handleToggleComplete = (id, completed) => {
    const task = tasks.find(t => t.id === id);
    editTask(id, { ...task, completed });
  };

  return (
    <div className="bubbles">
      {[...Array(100)].map((_, i) => (
        <span key={i} className={`bubble bubble${i + 1}`}></span>
      ))}

      <div className="container">
        <h1>To-Do List ✅</h1>

        
        <TaskForm onAdd={addTask} />

        
        <TaskList
          tasks={tasks}
          onEdit={editTask}
          onDelete={removeTask}
          onToggleComplete={handleToggleComplete}
        />
      </div>
    </div>
  );
}

export default App;
