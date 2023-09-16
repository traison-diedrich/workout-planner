from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated, List
from sqlmodel import Session, select
from jose import JWTError, jwt
import os
from dotenv import load_dotenv

from database.database import create_db_and_tables, get_session
from database.models import (Workout, WorkoutRead)
from .routers import exercises, exercise_info, workouts


origins = [
    'https://workout-plannet.fit',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
]


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(exercises.router)
app.include_router(exercise_info.router)
app.include_router(workouts.router)

load_dotenv()
ALGORITHM = "HS256"
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[
                             ALGORITHM], audience="authenticated")
        user_id = payload.get('sub')
    except JWTError:
        raise credentials_exception
    return user_id


@app.get("/")
async def root():
    return {"message": "Welcome to the Workout Planner API (WPI)"}


@app.get("/users/workouts/", response_model=List[WorkoutRead])
async def read_user_workouts(*, session: Session = Depends(get_session), user_id: str = Depends(get_current_user)):
    workouts = session.exec(select(Workout).where(
        Workout.user_id == user_id)).all()
    return workouts
