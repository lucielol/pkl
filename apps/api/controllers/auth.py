from datetime import timedelta
from core.security import hash_password, verify_password
from typing import Optional
from fastapi import HTTPException, status
from jose import jwt
from apps.api.deps import db
from apps.api.core.jwt import create_token, verify_token


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


async def login(email: str, password: str, remember: bool = False):
	user = await db.user.find_unique(where={"email": email})
	if not user or not verify_password(password, user.password):
		return {"error": "INVALID_CREDENTIALS"}

	expire_minutes = 60 * 24 * 7 if remember else 60

	token = create_token(
		{"sub": email}, expires_delta=timedelta(minutes=expire_minutes)
	)
	return {"access_token": token, "user": {"email": user.email}}


async def get_me(token: str):
	try:
		payload = verify_token(token)
		email = payload.get("sub")

		if not email:
			raise HTTPException(status_code=401, detail="Invalid token payload")

		user = await db.user.find_unique(
			where={"email": email},
			include={"Account": True},
		)

		if not user:
			raise HTTPException(status_code=404, detail="User not found")

		return {
			"email": user.email,
			"fullname": user.Account.fullname if user.Account else None,
			"phone": user.Account.phone if user.Account else None,
			"address": user.Account.address if user.Account else None,
		}

	except HTTPException as e:
		raise e

	except Exception as e:
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail="Internal server error",
		)
