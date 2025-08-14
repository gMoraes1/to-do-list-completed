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
