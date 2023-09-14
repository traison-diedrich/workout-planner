from typing import List, Optional
from sqlmodel import Field, Relationship, SQLModel


class ExerciseInfoBase(SQLModel):
    name: str


class ExerciseInfo(ExerciseInfoBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class ExerciseInfoCreate(ExerciseInfoBase):
    pass


class ExerciseInfoRead(ExerciseInfoBase):
    id: int


class ExerciseInfoUpdate(SQLModel):
    name: str


class ExerciseBase(SQLModel):
    sets: Optional[int] = Field(default=3)
    reps: Optional[int] = Field(default=10)
    exercise_order: Optional[int] = Field(default=1)
    workout_id: int = Field(foreign_key="workout.id")
    exercise_info_id: Optional[int] = Field(
        default=1, foreign_key="exerciseinfo.id")


class Exercise(ExerciseBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    exercise_info: Optional[ExerciseInfo] = Relationship()


class ExerciseCreate(ExerciseBase):
    pass


class ExerciseRead(ExerciseBase):
    id: int


class ExerciseUpdate(SQLModel):
    sets: Optional[int] = None
    reps: Optional[int] = None
    exercise_info_id: Optional[int] = None
    exercise_order: Optional[int] = None


class WorkoutBase(SQLModel):
    name: Optional[str] = Field(default="My New Workout")
    user_id: str


class Workout(WorkoutBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    exercises: List["Exercise"] = Relationship()


class WorkoutCreate(WorkoutBase):
    pass


class WorkoutRead(WorkoutBase):
    id: int


class WorkoutUpdate(SQLModel):
    name: Optional[str] = None


class ExerciseReadWithInfo(ExerciseRead):
    exercise_info: Optional[ExerciseInfoRead] = None


class WorkoutReadWithExercises(WorkoutRead):
    exercises: List[ExerciseReadWithInfo] = []
