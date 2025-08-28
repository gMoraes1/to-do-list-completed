function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
    return (
      <li className={task.completed ? "completed" : ""}>
        <div>
          <strong>{task.title}</strong> - {task.description}
        </div>
        <div className="actions">
          <button onClick={() => onToggleComplete(task.id, !task.completed)}>
            {task.completed ? "Desmarcar" : "Completar"}
          </button>
          <button className="edit" onClick={onEdit}>Editar</button>
          <button className="delete" onClick={() => onDelete(task.id)}>
            Deletar
          </button>
        </div>
      </li>
    );
  }
  
  export default TaskItem;
  