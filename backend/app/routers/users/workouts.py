from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from ...database.models import (
    Workout, WorkoutRead, WorkoutCreate, WorkoutUpdate, WorkoutReadWithExercises, Exercise, ExerciseReadWithInfo, ExerciseUpdate)
from ...database.database import get_session
from app.dependencies import get_current_user_id

router = APIRouter(
    prefix="/workouts",
    responses={404: {"description": "Not found"}},
)


@router.post("/", response_model=WorkoutRead)
async def create_workout(
    *,
    session: Session = Depends(get_session),
    user_id: str = Depends(get_current_user_id),
):
    db_workout = Workout.from_orm(WorkoutCreate(user_id=user_id))
    session.add(db_workout)
    session.commit()
    session.refresh(db_workout)
    return db_workout


@router.get("/", response_model=List[WorkoutReadWithExercises])
async def read_workouts(*, session: Session = Depends(get_session), user_id: str = Depends(get_current_user_id)):
    workouts = session.exec(select(Workout).where(
        Workout.user_id == user_id)).all()
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


@router.patch("/{workout_id}", response_model=WorkoutReadWithExercises)
async def update_workout(*, session: Session = Depends(get_session), workout_id: int, workout: WorkoutUpdate):
    db_workout = session.get(Workout, workout_id)
    if not db_workout:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Workout not found")
    workout_data = workout.dict(exclude_unset=True)
    for key, value in workout_data.items():
        setattr(db_workout, key, value)
    session.add(db_workout)
    session.commit()
    session.refresh(db_workout)
    return db_workout


@router.delete("/{workout_id}")
async def delete_workout(*, session: Session = Depends(get_session), workout_id: int):
    workout = session.get(Workout, workout_id)
    if not workout:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Workout not found")
    session.delete(workout)
    session.commit()
    return {"ok": True}
