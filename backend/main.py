from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from sqlmodel import Session, select

from .database import create_db_and_tables, get_session
from .models import Workout, WorkoutCreate, WorkoutRead, WorkoutUpdate, WorkoutReadWithExercises, Exercise, ExerciseRead, ExerciseCreate, ExerciseUpdate, ExerciseReadWithWorkout


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


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.post("/exercises/", response_model=ExerciseRead)
def create_exercise(*, session: Session = Depends(get_session), exercise: ExerciseCreate):
    db_exercise = Exercise.from_orm(exercise)
    session.add(db_exercise)
    session.commit()
    session.refresh(db_exercise)
    return db_exercise


@app.get("/exercises/", response_model=List[ExerciseRead])
def read_exercises(*, session: Session = Depends(get_session)):
    exercises = session.exec(select(Exercise)).all()
    return exercises


@app.get("/exercises/{exercise_id}", response_model=ExerciseReadWithWorkout)
def read_exercise(*, session: Session = Depends(get_session), exercise_id: int):
    exercise = session.get(Exercise, exercise_id)
    if not exercise:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Exercise not found")
    return exercise


@app.patch("/exercises/{exercise_id}", response_model=ExerciseRead)
def update_exercise(*, session: Session = Depends(get_session), exercise_id: int, exercise: ExerciseUpdate):
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
def delete_exercise(*, session: Session = Depends(get_session), exercise_id: int):
    exercise = session.get(Exercise, exercise_id)
    if not exercise:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Exercise not found")
    session.delete(exercise)
    session.commit()
    return {"ok": True}


@app.post("/workouts/", response_model=WorkoutRead)
def create_workout(*, session: Session = Depends(get_session), workout: WorkoutCreate):
    db_workout = Workout.from_orm(workout)
    session.add(db_workout)
    session.commit()
    session.refresh(db_workout)
    return db_workout


@app.get("/workouts/", response_model=List[WorkoutRead])
def read_workouts(*, session: Session = Depends(get_session)):
    heroes = session.exec(select(Workout)).all()
    return heroes


@app.get("/workouts/{workout_id}", response_model=WorkoutReadWithExercises)
def read_workout(*, session: Session = Depends(get_session), workout_id: int):
    workout = session.get(Workout, workout_id)
    if not workout:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Workout not found")
    return workout


@app.patch("/workouts/{workout_id}", response_model=WorkoutRead)
def update_workout(*, session: Session = Depends(get_session), workout_id: int, workout: WorkoutUpdate):
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
def delete_workout(*, session: Session = Depends(get_session), workout_id: int):
    workout = session.get(Workout, workout_id)
    if not workout:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Workout not found")
    session.delete(workout)
    session.commit()
    return {"ok": True}
