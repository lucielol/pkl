from fastapi import APIRouter
from pydantic import BaseModel
from controllers.predict import predict_rehab

router = APIRouter(prefix="/predict", tags=["Prediction"])


class PredictRequest(BaseModel):
	usia: int
	lama_rehab: int
	tingkat_stres: int
	dukungan_keluarga: str
	riwayat_kambuh: str
	jenis_narkotika: str
	kehadiran_konseling: str


@router.post("/")
async def predict(data: PredictRequest):
	result = predict_rehab(data.model_dump())
	return result
