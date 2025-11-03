from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from apps.api.deps import lifespan
from apps.api.controllers.auth import login, register

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


@router.post("/login")
async def login_user(user: LoginUser):
	result = await login(user.email, user.password)
	if "error" in result:
		raise HTTPException(status_code=401, detail="Email atau password salah")
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
