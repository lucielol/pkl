from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel
from typing import Optional
from apps.api.deps import lifespan
from apps.api.controllers.auth import login, register, get_me

router = APIRouter(prefix="/auth", tags=["Authentication"], lifespan=lifespan)


class RegisterUser(BaseModel):
	email: str
	password: str
	fullname: str
	phone: str
	address: Optional[str] = None


class LoginUser(BaseModel):
	email: str
	password: str
	remember: Optional[bool] = None


@router.post("/login")
async def login_user(user: LoginUser):
	result = await login(user.email, user.password)
	if "error" in result:
		raise HTTPException(status_code=401, detail="Invalid Credentials")
	return result


@router.post("/register")
async def register_user(user: RegisterUser):
	result = await register(
		user.email,
		user.password,
		user.fullname,
		user.phone,
		user.address,
	)
	if "error" in result:
		if result["error"] == "EMAIL_TAKEN":
			raise HTTPException(status_code=400, detail="Email already taken")
	return {"message": "User created"}


@router.get("/me")
async def get_current_user(authorization: Optional[str] = Header(None)):
	if not authorization:
		raise HTTPException(status_code=401, detail="Missing Authorization header")

	parts = authorization.split()
	if len(parts) != 2 or parts[0].lower() != "bearer":
		raise HTTPException(status_code=401, detail="Invalid Authorization header")

	token = parts[1]
	user = await get_me(token)
	return user
