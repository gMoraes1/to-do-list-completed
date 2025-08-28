import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService"; 

export function useTask(){
    const [tasks, setTasks] = useState([]); 
    const fetchTasks = async () => {
        try {
            const res = await getTasks();
            setTasks(Array.isArray(res.data) ? res.data : res.data.tasks || []);
            } catch (error){
                console.error("Error fetching tasks:", error);  
            }
        };

    const addTask = async (title, description) => {
        await createTask({title, description});
        fetchTasks();
    };

    const editTask = async (id, data) => {
        await updateTask(id, data);
        fetchTasks();   
    };

    const removeTask = async (id) => {
        await deleteTask(id);
        fetchTasks();
    };
    useEffect(() => {
        fetchTasks();
    }, []); 
    return { tasks, addTask, editTask, removeTask}
}

