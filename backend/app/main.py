from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi import Request, status
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database.database import create_db_and_tables
from app.routers import exercises, exercise_info, workouts
from app.routers.users import users
from app.routers.admin import admin


origins = [
    'https://workout-plannet.fit',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
]

description = """
WPI gives free and open access to the data collected by [Workout Planner](https://workout-planner.fit)

## Public Endpoints

### Workouts

* Read user workouts

### Exercises

* Read user created exercises

### Exercise Information

* Read information about specific exercises
"""

app = FastAPI(
    title="WPI",
    description=description,
    summary="The Workout Planner API (WPI)",
    version="0.1.0",
    contact={
        "name": "Traison Diedrich",
        "url": "https://traiiison.com",
        "email": "trais.diedrich@gmail.com",
    },
    license_info={
        "name": "License - MIT",
        "url": "https://github.com/traison-diedrich/workout-planner/blob/main/LICENSE",
    },
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin.router)
app.include_router(users.router)
app.include_router(exercises.router)
app.include_router(exercise_info.router)
app.include_router(workouts.router)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    exc_str = f'{exc}'.replace('\n', ' ').replace('   ', ' ')
    logging.error(f"{request}: {exc_str}")
    content = {'status_code': 10422, 'message': exc_str, 'data': None}
    return JSONResponse(content=content, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
async def root():
    return {"message": "Welcome to the Workout Planner API (WPI)"}
