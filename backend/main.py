from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uvicorn

# Initialize FastAPI application
app = FastAPI(
    title="Todo API",
    description="Simple Todo application API",
    version="1.0.0"
)

# CORS settings (allow frontend access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Data models
class TodoBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200, description="Title")
    description: Optional[str] = Field(None, max_length=1000, description="Description")
    completed: bool = Field(default=False, description="Completion status")
    category: Optional[str] = Field(None, max_length=50, description="Category")
    due_date: Optional[datetime] = Field(None, description="Due date")

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    completed: Optional[bool] = None
    category: Optional[str] = Field(None, max_length=50)
    due_date: Optional[datetime] = None

class Todo(TodoBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    email: str = Field(..., description="Email address")
    password: str = Field(..., min_length=8, description="Password (8+ characters)")
    name: str = Field(..., min_length=1, max_length=100, description="Name")

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    created_at: datetime

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# In-memory database (for development)
# Use PostgreSQL in production
todos_db = []
users_db = []
todo_id_counter = 1
user_id_counter = 1

# Health check
@app.get("/", tags=["Health"])
async def root():
    """
    API health check
    """
    return {
        "status": "healthy",
        "message": "Todo API is running!",
        "version": "1.0.0"
    }

@app.get("/health", tags=["Health"])
async def health_check():
    """
    Detailed health check
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "todos_count": len(todos_db),
        "users_count": len(users_db)
    }

# Authentication endpoints
@app.post("/api/auth/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED, tags=["Auth"])
async def register(user: UserCreate):
    """
    Register new user
    """
    global user_id_counter
    
    # Check for duplicate email
    if any(u["email"] == user.email for u in users_db):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    new_user = {
        "id": user_id_counter,
        "email": user.email,
        "password": user.password,  # NOTE: Hash password in production
        "name": user.name,
        "created_at": datetime.now()
    }
    users_db.append(new_user)
    user_id_counter += 1
    
    return new_user

@app.post("/api/auth/login", response_model=Token, tags=["Auth"])
async def login(credentials: UserLogin):
    """
    User login
    """
    # Authenticate user
    user = next((u for u in users_db if u["email"] == credentials.email and u["password"] == credentials.password), None)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # NOTE: Use JWT token in production
    # Mock token for development
    token = f"mock_token_user_{user['id']}"
    
    return {"access_token": token, "token_type": "bearer"}

# Todo CRUD endpoints
@app.get("/api/todos", response_model=List[Todo], tags=["Todos"])
async def get_todos(
    completed: Optional[bool] = None,
    category: Optional[str] = None,
    search: Optional[str] = None
):
    """
    Get todo list (with filtering and search)
    """
    result = todos_db.copy()
    
    # Filter by completion status
    if completed is not None:
        result = [todo for todo in result if todo["completed"] == completed]
    
    # Filter by category
    if category:
        result = [todo for todo in result if todo.get("category") == category]
    
    # Search in title and description
    if search:
        search_lower = search.lower()
        result = [
            todo for todo in result
            if search_lower in todo["title"].lower() or
               (todo.get("description") and search_lower in todo["description"].lower())
        ]
    
    return result

@app.get("/api/todos/{todo_id}", response_model=Todo, tags=["Todos"])
async def get_todo(todo_id: int):
    """
    Get specific todo
    """
    todo = next((todo for todo in todos_db if todo["id"] == todo_id), None)
    
    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    
    return todo

@app.post("/api/todos", response_model=Todo, status_code=status.HTTP_201_CREATED, tags=["Todos"])
async def create_todo(todo: TodoCreate):
    """
    Create new todo
    """
    global todo_id_counter
    
    now = datetime.now()
    new_todo = {
        "id": todo_id_counter,
        "title": todo.title,
        "description": todo.description,
        "completed": todo.completed,
        "category": todo.category,
        "due_date": todo.due_date,
        "created_at": now,
        "updated_at": now
    }
    
    todos_db.append(new_todo)
    todo_id_counter += 1
    
    return new_todo

@app.put("/api/todos/{todo_id}", response_model=Todo, tags=["Todos"])
async def update_todo(todo_id: int, todo_update: TodoUpdate):
    """
    Update todo
    """
    todo = next((todo for todo in todos_db if todo["id"] == todo_id), None)
    
    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    
    # Apply updates
    update_data = todo_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        todo[key] = value
    
    todo["updated_at"] = datetime.now()
    
    return todo

@app.delete("/api/todos/{todo_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Todos"])
async def delete_todo(todo_id: int):
    """
    Delete todo
    """
    global todos_db
    
    todo = next((todo for todo in todos_db if todo["id"] == todo_id), None)
    
    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    
    todos_db = [todo for todo in todos_db if todo["id"] != todo_id]
    
    return None

# Statistics endpoint
@app.get("/api/todos/stats/summary", tags=["Stats"])
async def get_stats():
    """
    Get todo statistics
    """
    total = len(todos_db)
    completed = sum(1 for todo in todos_db if todo["completed"])
    pending = total - completed
    
    # Count by category
    categories = {}
    for todo in todos_db:
        cat = todo.get("category", "Uncategorized")
        categories[cat] = categories.get(cat, 0) + 1
    
    return {
        "total": total,
        "completed": completed,
        "pending": pending,
        "completion_rate": round(completed / total * 100, 2) if total > 0 else 0,
        "categories": categories
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
