from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from database.models import (
    ExerciseInfo, ExerciseInfoRead)
from database.database import get_session


router = APIRouter(
    prefix="/exercise-info",
    tags=["exercise-info"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[ExerciseInfoRead])
async def read_exercise_infos(*, session: Session = Depends(get_session)):
    exercise_infos = session.exec(select(ExerciseInfo)).all()
    return exercise_infos


@router.get("/{exercise_info_id}", response_model=ExerciseInfoRead)
async def read_exercise_info(*, session: Session = Depends(get_session), exercise_info_id: int):
    exercise_info = session.get(ExerciseInfo, exercise_info_id)
    if not exercise_info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="ExerciseInfo not found")
    return exercise_info
