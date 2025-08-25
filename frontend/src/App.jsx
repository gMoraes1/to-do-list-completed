import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    axios
      .get(`${API_URL}/tasks`)
      .then((res) => {
        console.log("API response:", res.data);
        if (Array.isArray(res.data)) {
          setTasks(res.data);
        } else if (Array.isArray(res.data.tasks)) {
          setTasks(res.data.tasks);
        } else {
          setTasks([]);
        }
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  };

  

  const createTask = async (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/tasks`, { title, description }) // corrigido aqui
      .then(() => {
        setTitle("");
        setDescription("");
        fetchTasks();
      })
      .catch((err) => console.error("Error creating task:", err));
  };

  const deleteTask = async (id) => {
    axios
      .delete(`${API_URL}/tasks/${id}`) // usando API_URL
      .then(() => fetchTasks())
      .catch((err) => console.error("Error deleting task:", err));
  };

  const toggleTask = (id, completed, title, description) => {
    axios
      .put(`${API_URL}/tasks/${id}`, {title, description, completed: !completed }) // usando API_URL
      .then(() => fetchTasks())
      .catch((err) => console.error("Error updating task:", err));
  };

  return (
    <div className="bubbles">
    {[...Array(100)].map((_, i) => (
        <span key={i} className={`bubble bubble${i + 1}`}></span>
    ))}
    <div className="container">
      <h1>To-Do List ✅</h1>
      <form onSubmit={createTask}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Adicionar Task</button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <div>
              <strong>{task.title}</strong> - {task.description}
            </div>
            <div className="actions">
              <button onClick={() => toggleTask(task.id, task.completed, task.title, task.description)}>
                {task.completed ? "Desmarcar" : "Completar"}
              </button>
              <button
                className="delete"
                onClick={() => deleteTask(task.id)}
              >
                Deletar
              </button>
              <button className="edit" onClick={() => {
                const newTitle = prompt("Editar título:", task.title);
                const newDescription = prompt("Editar descrição:", task.description);
                if (newTitle !== null && newDescription !== null) {
                  toggleTask(task.id, task.completed, newTitle, newDescription);
                }           
              }}>
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default App;
