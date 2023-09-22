import os
from sqlmodel import Session, create_engine, SQLModel
from ..config import settings

engine = create_engine(settings.db_url)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
