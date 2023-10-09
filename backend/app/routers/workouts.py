from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from ..database.models import (
    PublicWorkoutRead, PublicWorkoutReadWithExercises, Workout)
from ..database.database import get_session

router = APIRouter(
    prefix="/workouts",
    tags=["workouts"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[PublicWorkoutRead])
async def read_workouts(*, session: Session = Depends(get_session)):
    workouts = session.exec(select(Workout)).all()
    return workouts


@router.get("/{workout_id}", response_model=PublicWorkoutReadWithExercises)
async def read_workout(*, session: Session = Depends(get_session), workout_id: int):
    workout = session.get(Workout, workout_id)
    if not workout:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Workout not found")
    return workout
