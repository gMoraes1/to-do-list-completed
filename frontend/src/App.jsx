import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    axios
      .get(`${API_URL}/tasks`)
      .then((res) => setTasks(res.data))
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

  const toggleTask = (id, completed) => {
    axios
      .put(`${API_URL}/tasks/${id}`, { completed: !completed }) // usando API_URL
      .then(() => fetchTasks())
      .catch((err) => console.error("Error updating task:", err));
  };

  return (
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
              <button onClick={() => toggleTask(task.id, task.completed)}>
                {task.completed ? "Desmarcar" : "Completar"}
              </button>
              <button
                className="delete"
                onClick={() => deleteTask(task.id)}
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
