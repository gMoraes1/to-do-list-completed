from pydantic import BaseModel, Field

class TaskBase(BaseModel):
    title: str = Field(..., max_length=100)
    description: str = Field(..., max_length=500)

class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: str | None = Field(None, max_length=100)
    description: str | None = Field(None, max_length=500)
    completed: bool | None = None


class Task(TaskBase):
    id: int
    completed: bool

    class Config:
         from_attributes = True
