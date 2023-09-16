from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated, List
from sqlmodel import Session, select
from jose import JWTError, jwt
import os
from dotenv import load_dotenv

from .database import create_db_and_tables, get_session
from .models import (Workout, WorkoutCreate, WorkoutRead, WorkoutUpdate,
                     WorkoutReadWithExercises, Exercise, ExerciseRead,
                     ExerciseCreate, ExerciseUpdate, ExerciseReadWithInfo,
                     ExerciseInfo, ExerciseInfoRead, ExerciseInfoCreate,
                     ExerciseInfoUpdate)


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


@app.get("/users/workouts/", response_model=List[WorkoutRead])
async def read_user_workouts(*, session: Session = Depends(get_session), user_id: str = Depends(get_current_user)):
    workouts = session.exec(select(Workout).where(
        Workout.user_id == user_id)).all()
    return workouts


@app.post("/exercises/", response_model=ExerciseReadWithInfo)
async def create_exercise(*, session: Session = Depends(get_session), exercise: ExerciseCreate):
    db_exercise = Exercise.from_orm(exercise)
    session.add(db_exercise)
    session.commit()
    session.refresh(db_exercise)
    return db_exercise


@app.get("/exercises/", response_model=List[ExerciseReadWithInfo])
async def read_exercises(*, session: Session = Depends(get_session)):
    exercises = session.exec(
        select(Exercise).order_by(Exercise.exercise_order)).all()
    return exercises


@app.get("/exercises/{exercise_id}", response_model=ExerciseReadWithInfo)
async def read_exercise(*, session: Session = Depends(get_session), exercise_id: int):
    exercise = session.get(Exercise, exercise_id)
    if not exercise:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Exercise not found")
    return exercise


@app.patch("/exercises/{exercise_id}", response_model=ExerciseReadWithInfo)
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


@app.delete("/exercises/{exercise_id}")
async def delete_exercise(*, session: Session = Depends(get_session), exercise_id: int):
    exercise = session.get(Exercise, exercise_id)
    if not exercise:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Exercise not found")
    session.delete(exercise)
    session.commit()
    return {"ok": True}


@app.post("/exercise-info/", response_model=ExerciseInfoRead)
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


@app.get("/exercise-info/", response_model=List[ExerciseInfoRead])
async def read_exercise_infos(*, session: Session = Depends(get_session)):
    exercise_infos = session.exec(select(ExerciseInfo)).all()
    return exercise_infos


@app.get("/exercise-info/{exercise_info_id}", response_model=ExerciseInfoRead)
async def read_exercise_info(*, session: Session = Depends(get_session), exercise_info_id: int):
    exercise_info = session.get(ExerciseInfo, exercise_info_id)
    if not exercise_info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="ExerciseInfo not found")
    return exercise_info


@app.patch("/exercise-info/{exercise_info_id}", response_model=ExerciseInfoRead)
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


@app.delete("/exercise-info/{exercise_info_id}")
async def delete_exercise_info(*, session: Session = Depends(get_session), exercise_info_id: int):
    exercise_info = session.get(ExerciseInfo, exercise_info_id)
    if not exercise_info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="ExerciseInfo not found")
    session.delete(exercise_info)
    session.commit()
    return {"ok": True}


@app.post("/workouts/", response_model=WorkoutRead)
async def create_workout(*, session: Session = Depends(get_session), workout: WorkoutCreate):
    db_workout = Workout.from_orm(workout)
    session.add(db_workout)
    session.commit()
    session.refresh(db_workout)
    return db_workout


@app.get("/workouts/", response_model=List[WorkoutRead])
async def read_workouts(*, session: Session = Depends(get_session)):
    workouts = session.exec(select(Workout)).all()
    return workouts


@app.get("/workouts/{workout_id}", response_model=WorkoutRead)
async def read_workout(*, session: Session = Depends(get_session), workout_id: int):
    workout = session.get(Workout, workout_id)
    if not workout:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Workout not found")
    return workout


@app.get("/workouts/{workout_id}/exercises", response_model=List[ExerciseReadWithInfo])
async def read_workout_exercises(*, session: Session = Depends(get_session), workout_id: int):
    exercises = session.exec(select(Exercise).where(
        Exercise.workout_id == workout_id).order_by(Exercise.exercise_order)).all()
    return exercises


@app.patch("/workouts/{workout_id}", response_model=WorkoutReadWithExercises)
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


@app.delete("/workouts/{workout_id}")
async def delete_workout(*, session: Session = Depends(get_session), workout_id: int):
    workout = session.get(Workout, workout_id)
    if not workout:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Workout not found")
    session.delete(workout)
    session.commit()
    return {"ok": True}
