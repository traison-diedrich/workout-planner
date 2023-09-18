from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from database.models import (
    Exercise, ExerciseReadWithInfo, ExerciseCreate, ExerciseUpdate)
from database.database import get_session

router = APIRouter(
    prefix="/exercises",
    responses={404: {"description": "Not found"}},
)


@router.post("/", response_model=ExerciseReadWithInfo)
async def create_exercise(*, session: Session = Depends(get_session), exercise: ExerciseCreate):
    db_exercise = Exercise.from_orm(exercise)
    session.add(db_exercise)
    session.commit()
    session.refresh(db_exercise)
    return db_exercise


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


@router.patch("/{exercise_id}", response_model=ExerciseReadWithInfo)
async def update_exercise(*, session: Session = Depends(get_session), exercise_id: int, exercise: ExerciseUpdate):
    db_exercise = session.get(Exercise, exercise_id)
    if not db_exercise:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Exercise not found")
    exercise_data = exercise.dict(exclude_unset=True)
    for key, value in exercise_data.items():
        setattr(db_exercise, key, value)
    session.add(db_exercise)
    session.commit()
    session.refresh(db_exercise)
    return db_exercise


@router.delete("/{exercise_id}")
async def delete_exercise(*, session: Session = Depends(get_session), exercise_id: int):
    exercise = session.get(Exercise, exercise_id)
    if not exercise:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Exercise not found")
    session.delete(exercise)
    session.commit()
    return {"ok": True}
