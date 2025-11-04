import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parents[2]
ENV_PATH = BASE_DIR / ".env"

load_dotenv(dotenv_path=ENV_PATH)


class Settings:
	API_NAME: str = "PKL FastAPI"
	DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"
	SECRET_KEY: str = os.getenv("SECRET_KEY", "devsecret")
	ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
	ACCESS_TOKEN_EXPIRE: int = int(os.getenv("ACCESS_TOKEN_EXPIRE", 60))
	REFRESH_TOKEN_EXPIRE: int = int(os.getenv("REFRESH_TOKEN_EXPIRE", 60 * 24 * 7))
	DATABASE_URL: str = os.getenv("DATABASE_URL")
	NEXT_PUBLIC_API_URL: str = os.getenv("NEXT_PUBLIC_API_URL")
	COOKIE_SECURE: bool = os.getenv("COOKIE_SECURE", "false").lower() == "true"
	COOKIE_SAMESITE: str = os.getenv("COOKIE_SAMESITE", "lax")


settings = Settings()
