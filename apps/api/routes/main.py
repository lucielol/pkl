from fastapi import APIRouter
from apps.api.routes import auth
from apps.api.routes import predict

router = APIRouter()
router.include_router(auth.router)
router.include_router(predict.router)
