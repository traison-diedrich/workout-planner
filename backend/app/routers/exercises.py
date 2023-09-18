from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from database.models import (
    Exercise, ExerciseReadWithInfo)
from database.database import get_session

router = APIRouter(
    prefix="/exercises",
    tags=["exercises"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[ExerciseReadWithInfo])
async def read_exercises(*, session: Session = Depends(get_session)):
    exercises = session.exec(
        select(Exercise).order_by(Exercise.exercise_order)).all()
    return exercises


@router.get("/{exercise_id}", response_model=ExerciseReadWithInfo)
async def read_exercise(*, session: Session = Depends(get_session), exercise_id: int):
    exercise = session.get(Exercise, exercise_id)
    if not exercise:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Exercise not found")
    return exercise
