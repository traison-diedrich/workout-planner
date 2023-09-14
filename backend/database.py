import os
from sqlmodel import Session, create_engine, SQLModel
from dotenv import load_dotenv
from sqlalchemy.engine import URL

load_dotenv()

postgres_url = URL(
    drivername='postgresql',
    username="postgres",
    password=os.getenv("SUPABASE_PASSWORD"),
    host="db.cdpzduoffyderbisyajq.supabase.co",
    port=6543,
    database="postgres"
)
# connect_args = {"check_same_thread": False}
engine = create_engine(postgres_url, echo=True)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
