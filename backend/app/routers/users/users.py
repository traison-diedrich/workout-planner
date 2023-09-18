from fastapi import APIRouter, Depends

from app.dependencies import user_authenticated
from . import exercises, workouts

router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(user_authenticated)],
    responses={404: {"description": "Not found"}},
)

router.include_router(exercises.router)
router.include_router(workouts.router)
