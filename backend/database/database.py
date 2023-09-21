import os
from sqlmodel import Session, create_engine, SQLModel

engine = create_engine(os.environ['DB_ENGINE'])


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
