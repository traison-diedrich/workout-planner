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


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
async def root():
    return {"message": "Welcome to the Workout Planner API (WPI)"}
