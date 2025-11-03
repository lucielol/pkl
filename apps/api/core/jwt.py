import os
from typing import Optional
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from fastapi import HTTPException, status
from jose.exceptions import ExpiredSignatureError, JWTClaimsError, JWTError

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE = int(os.getenv("ACCESS_TOKEN_EXPIRE", 15))
REFRESH_TOKEN_EXPIRE = int(os.getenv("REFRESH_TOKEN_EXPIRE", 60 * 24 * 7))


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
