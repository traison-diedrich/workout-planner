from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session
from jose import JWTError, jwt
import os
from dotenv import load_dotenv

from database.database import get_session

load_dotenv()
ALGORITHM = os.getenv("JWT_ALGORITHM")
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def common_deps(session: Session = Depends(get_session)):
    return session

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
