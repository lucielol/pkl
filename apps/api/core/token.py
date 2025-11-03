import os
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from fastapi import HTTPException, status

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE = int(os.getenv("ACCESS_TOKEN_EXPIRE", 15))
REFRESH_TOKEN_EXPIRE = int(os.getenv("REFRESH_TOKEN_EXPIRE", 60 * 24 * 7))


def create_token(data: dict) -> str:
	"""
	Create an access token that has a short expiration time
	"""
	to_encode = data.copy()
	expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE)
	to_encode.update({"exp": expire})
	return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def refresh_token(data: dict) -> str:
	"""
	Create refresh tokens that are valid longer
	"""
	to_encode = data.copy()
	expire = datetime.now(timezone.utc) + timedelta(minutes=REFRESH_TOKEN_EXPIRE)
	to_encode.update({"exp": expire, "type": "refresh"})
	return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str) -> dict:
	"""
	Verify JWT validity
	"""
	try:
		payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
		return payload
	except JWTError:
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Invalid or expired token",
			headers={"WWW-Authenticate": "Bearer"},
		)


def verify_refresh_token(token: str) -> dict:
	"""
	Verify refresh token specifically
	"""
	payload = verify_token(token)
	if payload.get("type") != "refresh":
		raise HTTPException(status_code=401, detail="Invalid refresh token type")
	return payload
