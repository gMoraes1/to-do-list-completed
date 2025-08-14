from sqlalchemy.orm import Session
from models.task import Task
from schemas.task import TaskCreate, TaskUpdate

def create_task(db: Session, task_data: TaskCreate) -> Task:
    new_task = Task(**task_data.model_dump())
    db.add(new_task)
    db.commit() 
    db.refresh(new_task)    
    return new_task

def get_task(db: Session, task_id: int) -> Task:
    return db.query(Task).filter(task_id == Task.id).first()


def get_tasks(db:Session):
    return db.query(Task).all()


def update_task(db: Session, task_id: int, task_data: TaskUpdate) -> Task:
    task = db.query(Task).filter(task_id == Task.id).first()
    if task:
        for key, value in task_data.model_dump().items():
            setattr(task, key, value)

        db.commit()
        db.refresh(task)
    return task 

def delete_task(db: Session, task_id: int):
    task = db.query(Task).filter(Task.id == task_id).first()
    if task:
        db.delete(task)
        db.commit()
    return task

