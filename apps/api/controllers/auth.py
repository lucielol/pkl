import os
from core.security import hash_password, verify_password
from typing import Optional
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
from jose import jwt
from apps.api.deps import db

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE = int(os.getenv("ACCESS_TOKEN_EXPIRE"))


def create_access_token(data: dict):
	to_encode = data.copy()
	expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE)
	to_encode.update({"exp": expire})
	return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


async def register(
	email: str, password: str, fullname: str, phone: str, address: Optional[str] = None
):
	existing_user = await db.user.find_unique(where={"email": email})
	if existing_user:
		return {"error": "EMAIL_TAKEN"}

	hashed_password = hash_password(password)

	await db.user.create(
		data={
			"email": email,
			"password": hashed_password,
			"Account": {
				"create": {
					"fullname": fullname,
					"phone": phone,
					"address": address or None,
				}
			},
		}
	)
	return {"success": True, "message": "account created"}


async def login(email: str, password: str):
	user = await db.user.find_unique(where={"email": email})
	if not user or not verify_password(password, user.password):
		return {"error": "INVALID_CREDENTIALS"}
	token = create_access_token({"sub": email})
	return {"access_token": token, "token_type": "bearer"}
