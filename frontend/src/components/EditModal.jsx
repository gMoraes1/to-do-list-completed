import { useState, useEffect } from "react";

function EditModal({ isOpen, onClose, task, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);
  
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...task,
      title,
      description,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <div className="modal-actions">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose} className="cancel">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
