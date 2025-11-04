from typing import Optional
from config.env import settings
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from fastapi import HTTPException, status
from jose.exceptions import ExpiredSignatureError, JWTClaimsError, JWTError

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE = settings.ACCESS_TOKEN_EXPIRE
REFRESH_TOKEN_EXPIRE = settings.REFRESH_TOKEN_EXPIRE


def create_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
	to_encode = data.copy()
	expire = datetime.now(timezone.utc) + (
		expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE)
	)
	to_encode.update({"exp": expire})
	return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def refresh_token(data: dict) -> str:
	to_encode = data.copy()
	expire = datetime.now(timezone.utc) + timedelta(minutes=REFRESH_TOKEN_EXPIRE)
	to_encode.update({"exp": expire, "type": "refresh"})
	return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str) -> dict:
	try:
		payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
		return payload

	except ExpiredSignatureError:
		raise HTTPException(status_code=401, detail="Token expired")

	except JWTClaimsError as e:
		raise HTTPException(status_code=401, detail=f"Invalid claims: {str(e)}")

	except JWTError as e:
		raise HTTPException(
			status_code=401, detail=f"Invalid or expired token: {str(e)}"
		)


def verify_refresh_token(token: str) -> dict:
	payload = verify_token(token)
	if payload.get("type") != "refresh":
		raise HTTPException(status_code=401, detail="Invalid refresh token type")
	return payload
