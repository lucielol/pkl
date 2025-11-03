from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apps.api.routes.main import router

app = FastAPI(title="FastAPI", version="1.0.0")

origins = ["http://localhost:3000", "http://127.0.0.1:3000"]

app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(router, prefix="/api", tags=["API"])


@app.get("/")
def root():
	return {"message": "halo dunia"}
