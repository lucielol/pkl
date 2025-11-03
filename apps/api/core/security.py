import bcrypt

MAX_PASSWORD_BYTES = 72


def hash_password(password: str) -> str:
	password_bytes = password.encode("utf-8")[:MAX_PASSWORD_BYTES]
	salt = bcrypt.gensalt(rounds=12)
	hashed = bcrypt.hashpw(password_bytes, salt)
	return hashed.decode("utf-8")


def verify_password(password: str, hashed_password: str) -> bool:
	password_bytes = password.encode("utf-8")[:MAX_PASSWORD_BYTES]
	hashed_bytes = hashed_password.encode("utf-8")
	return bcrypt.checkpw(password_bytes, hashed_bytes)
