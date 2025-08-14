from fastapi import FastAPI
from database import Base, engine
from routers import task

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="To-do List API",
    description="API feita com FastAPI para gerenciar uma lista de tarefas com frontend em ReactJS",
)

app.include_router(task.router, tags=["task"])
