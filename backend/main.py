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
    allow_origins=["*"],  # Permite todas as origens
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos HTTP
    allow_headers=["*"],  # Permite todos os cabeçalhos HTTP    
)
app.include_router(task.router, tags=["task"])
