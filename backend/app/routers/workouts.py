from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from database.models import (
    Workout, WorkoutRead, Exercise, ExerciseReadWithInfo, WorkoutReadWithExercises)
from database.database import get_session

router = APIRouter(
    prefix="/workouts",
    tags=["workouts"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[WorkoutRead])
async def read_workouts(*, session: Session = Depends(get_session)):
    workouts = session.exec(select(Workout)).all()
    return workouts


@router.get("/{workout_id}", response_model=WorkoutReadWithExercises)
async def read_workout(*, session: Session = Depends(get_session), workout_id: int):
    workout = session.get(Workout, workout_id)
    if not workout:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Workout not found")
    return workout


@router.get("/{workout_id}/exercises", response_model=List[ExerciseReadWithInfo])
async def read_workout_exercises(*, session: Session = Depends(get_session), workout_id: int):
    exercises = session.exec(select(Exercise).where(
        Exercise.workout_id == workout_id).order_by(Exercise.exercise_order)).all()
    return exercises
