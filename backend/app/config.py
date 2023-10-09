import os
from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    db_url: str = Field(..., env="DB_URL")
    secret_key: str = Field(..., env="JWT_SECRET_KEY")
    algorithm: str = Field(..., env="JWT_ALGORITHM")


settings = Settings()
