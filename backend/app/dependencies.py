from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from .config import settings

ALGORITHM = settings.algorithm
SECRET_KEY = settings.secret_key
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def user_authenticated(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        print(SECRET_KEY)
        payload = jwt.decode(token, SECRET_KEY, algorithms=[
                             ALGORITHM], audience="authenticated")
    except JWTError:
        raise credentials_exception
    return payload


async def get_current_user_id(payload: Annotated[str, Depends(user_authenticated)]):
    return payload.get("sub")
