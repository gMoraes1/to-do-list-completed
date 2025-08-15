from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from schemas.task import Task, TaskCreate, TaskUpdate
from crud import task as crud_task

router = APIRouter()


@router.get("/tasks", response_model=List[Task])
def read_tasks(db: Session = Depends(get_db)):
    return crud_task.get_tasks(db)


@router.get("/tasks/{task_id}", response_model=Task)            
def read_task(task_id: int, db: Session = Depends(get_db)):
    task = crud_task.get_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task 


@router.post("/tasks", response_model=Task) 
def create_task(task_data: TaskCreate, db: Session = Depends(get_db)):  
    return crud_task.create_task(db, task_data)
    

@router.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task_data: TaskUpdate, db: Session = Depends(get_db)):
    task = crud_task.update_task(db, task_id, task_data)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.delete("/tasks/{task_id}", response_model=Task)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = crud_task.delete_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task
    

    
