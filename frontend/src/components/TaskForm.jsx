import { useState } from "react";

function TaskForm({ onAdd}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;
        onAdd(title, description);
        setTitle("");
        setDescription("");
      };

    return (
        <form onSubmit={handleSubmit} className="task-form">
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
    )
}
export default TaskForm;