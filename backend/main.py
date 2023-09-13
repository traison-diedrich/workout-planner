import os
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

origins = [
    'https://workout-plannet.fit',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_API_KEY')

supabase: Client = create_client(url, key)


@app.get('/workouts/{user_id}')
async def get_workout(user_id: str):
    workouts = supabase.table('workouts').select(
        '*, exercises(*, exercise_types(label))').eq('uid', user_id).order(column='id', desc=False).execute()
    return workouts


@app.get('/workout/{workout_id}')
async def get_workouts(workout_id: int):
    workout = supabase.table('workouts').select(
        '*, exercises(*, exercise_types(label))').eq('id', workout_id).single().execute()
    return workout


@app.get("/exercise_types/")
async def root():
    exercise_types = supabase.table('exercise_types').select('*').execute()
    return exercise_types


@app.post("/workouts/{uid}", status_code=status.HTTP_201_CREATED)
async def create_workout(uid: str):
    newWorkout = {'uid': uid}
    workout = supabase.table('workouts').insert(newWorkout).execute()
    return workout


@app.post("/exercises/{wid}", status_code=status.HTTP_201_CREATED)
async def create_exercise(wid: int):
    newExercise = {'wid': wid}
    exercise = supabase.table('exercises').insert(newExercise).execute()
    return exercise


@app.delete("/workouts/{wid}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_workout(wid: int):
    supabase.table('workouts').delete().eq('id', wid).execute()
