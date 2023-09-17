from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from database.models import (
    ExerciseInfo, ExerciseInfoRead, ExerciseInfoCreate, ExerciseInfoUpdate)
from database.database import get_session


router = APIRouter(
    prefix="/exercise-info",
    tags=["exercise-info"],
    responses={404: {"description": "Not found"}},
)


@router.post("/", response_model=ExerciseInfoRead)
async def create_exercise_info(
    *,
    session: Session = Depends(get_session),
    exercise_info: ExerciseInfoCreate
):
    db_exercise_info = ExerciseInfo.from_orm(exercise_info)
    session.add(db_exercise_info)
    session.commit()
    session.refresh(db_exercise_info)
    return db_exercise_info


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


@router.patch("/{exercise_info_id}", response_model=ExerciseInfoRead)
async def update_exercise_info(*, session: Session = Depends(get_session), exercise_info_id: int, exercise_info: ExerciseInfoUpdate):
    db_exercise_info = session.get(ExerciseInfo, exercise_info_id)
    if not db_exercise_info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Exercise information not found")
    exercise_info_data = exercise_info.dict(exclude_unset=True)
    for key, value in exercise_info_data.items():
        setattr(db_exercise_info, key, value)
    session.add(db_exercise_info)
    session.commit()
    session.refresh(db_exercise_info)
    return db_exercise_info


@router.delete("/{exercise_info_id}")
async def delete_exercise_info(*, session: Session = Depends(get_session), exercise_info_id: int):
    exercise_info = session.get(ExerciseInfo, exercise_info_id)
    if not exercise_info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="ExerciseInfo not found")
    session.delete(exercise_info)
    session.commit()
    return {"ok": True}
