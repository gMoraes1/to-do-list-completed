from fastapi import FastAPI
from database import Base, engine
from routers import task
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="To-do List API",
    description="API feita com FastAPI para gerenciar uma lista de tarefas com frontend em ReactJS",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)
app.include_router(task.router, tags=["task"])
