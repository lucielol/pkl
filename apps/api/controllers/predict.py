# controllers/predict.py
import joblib
import numpy as np
import os
from typing import Dict
from sklearn.preprocessing import LabelEncoder

# Path model
MODEL_PATH = os.path.join(
	os.path.dirname(__file__), "../models/model_rehab_xgboost.pkl"
)

# Load model XGBoost
model = joblib.load(MODEL_PATH)

# Encoder untuk kolom kategorikal (harus sama urutan seperti training)
encoders = {
	"dukungan_keluarga": LabelEncoder().fit(["rendah", "sedang", "tinggi"]),
	"riwayat_kambuh": LabelEncoder().fit(["tidak", "ya"]),
	"jenis_narkotika": LabelEncoder().fit(["ganja", "sabu", "ekstasi", "heroin"]),
	"kehadiran_konseling": LabelEncoder().fit(["jarang", "sering", "selalu"]),
}


def predict_rehab(data: Dict):
	try:
		usia = data["usia"]
		lama_rehab = data["lama_rehab"]
		tingkat_stres = data["tingkat_stres"]
		dukungan_keluarga = encoders["dukungan_keluarga"].transform(
			[data["dukungan_keluarga"].lower()]
		)[0]
		riwayat_kambuh = encoders["riwayat_kambuh"].transform(
			[data["riwayat_kambuh"].lower()]
		)[0]
		jenis_narkotika = encoders["jenis_narkotika"].transform(
			[data["jenis_narkotika"].lower()]
		)[0]
		kehadiran_konseling = encoders["kehadiran_konseling"].transform(
			[data["kehadiran_konseling"].lower()]
		)[0]

		# Urutan fitur harus sama dengan saat training
		features = np.array(
			[
				[
					usia,
					lama_rehab,
					tingkat_stres,
					dukungan_keluarga,
					riwayat_kambuh,
					jenis_narkotika,
					kehadiran_konseling,
				]
			]
		)

		prediction = model.predict(features)[0]
		probability = model.predict_proba(features)[0][int(prediction)]

		return {
			"status": "success",
			"prediction": int(prediction),
			"probability": round(float(probability) * 100, 2),
			"result": "Berhasil sembuh"
			if prediction == 1
			else "Kemungkinan gagal rehabilitasi",
			"explanation": (
				"Peserta diprediksi akan berhasil menyelesaikan program rehabilitasi dengan tingkat keyakinan "
				f"{round(float(probability) * 100, 2)}%."
				if prediction == 1
				else "Peserta diprediksi berisiko gagal atau kambuh kembali berdasarkan faktor yang dimiliki."
			),
		}
	except Exception as e:
		return {"status": "error", "message": str(e)}
