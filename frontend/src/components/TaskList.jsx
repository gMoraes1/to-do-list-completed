import { useState } from "react";
import TaskItem from "./TaskItem";
import EditModal from "./EditModal";

function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSave = (updatedTask) => {
    onEdit(updatedTask.id, updatedTask);
  };

  return (
    <>
      {!tasks.length ? (
        <p>Nenhuma task cadastrada ainda.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => handleEditClick(task)} 
              onDelete={onDelete}
              onToggleComplete={onToggleComplete} 
            />
          ))}
        </ul>
      )}

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        onSave={handleSave}
      />
    </>
  );
}

export default TaskList;
