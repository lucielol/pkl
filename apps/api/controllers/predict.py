# controllers/predict.py
import joblib
import numpy as np
import os
from typing import Dict
from sklearn.preprocessing import LabelEncoder

MODEL_PATH = os.path.join(
	os.path.dirname(__file__), "../models/model_rehab_xgboost.pkl"
)

model = joblib.load(MODEL_PATH)

encoders = {
	"dukungan_keluarga": LabelEncoder().fit(["rendah", "sedang", "tinggi"]),
	"riwayat_kambuh": LabelEncoder().fit(["tidak", "ya"]),
	"jenis_narkotika": LabelEncoder().fit(["ganja", "sabu", "ekstasi", "heroin"]),
	"kehadiran_konseling": LabelEncoder().fit(["jarang", "sering", "selalu"]),
}


def estimated_rehab_duration(
	tingkat_stres: int,
	dukungan_keluarga: str,
	riwayat_kambuh: str,
	kehadiran_konseling: str,
):
	"""Hitung estimasi lama rehabilitasi (bulan) berdasarkan faktor-faktor."""
	base = 3

	# Faktor tingkat stres
	if tingkat_stres >= 8:
		base += 3
	elif tingkat_stres >= 5:
		base += 2
	elif tingkat_stres >= 3:
		base += 1

	# Faktor dukungan keluarga
	if dukungan_keluarga.lower() == "rendah":
		base += 2
	elif dukungan_keluarga.lower() == "sedang":
		base += 1

	# Faktor riwayat kambuh
	if riwayat_kambuh.lower() == "ya":
		base += 3

	# Faktor kehadiran konseling
	if kehadiran_konseling.lower() == "jarang":
		base += 2
	elif kehadiran_konseling.lower() == "sering":
		base += 1

	return base


def predict_rehab(data: Dict):
	try:
		usia = data["usia"]
		lama_rehab = data["lama_rehab"]
		tingkat_stres = data["tingkat_stres"]
		dukungan_keluarga = data["dukungan_keluarga"]
		riwayat_kambuh = data["riwayat_kambuh"]
		jenis_narkotika = data["jenis_narkotika"]
		kehadiran_konseling = data["kehadiran_konseling"]

		X = np.array(
			[
				[
					usia,
					lama_rehab,
					tingkat_stres,
					encoders["dukungan_keluarga"].transform(
						[dukungan_keluarga.lower()]
					)[0],
					encoders["riwayat_kambuh"].transform([riwayat_kambuh.lower()])[0],
					encoders["jenis_narkotika"].transform([jenis_narkotika.lower()])[0],
					encoders["kehadiran_konseling"].transform(
						[kehadiran_konseling.lower()]
					)[0],
				]
			]
		)

		prediction = model.predict(X)[0]
		probability = model.predict_proba(X)[0][int(prediction)]

		estimated_duration = estimated_rehab_duration(
			tingkat_stres, dukungan_keluarga, riwayat_kambuh, kehadiran_konseling
		)

		return {
			"status": "success",
			"prediction": int(prediction),
			"probability": round(float(probability) * 100, 2),
			"result": "Berhasil sembuh"
			if prediction == 1
			else "Kemungkinan gagal rehabilitasi",
			"estimated_duration_months": estimated_duration,
			"explanation": (
				f"Peserta diprediksi akan berhasil menyelesaikan program rehabilitasi dalam sekitar {estimated_duration} bulan "
				f"dengan tingkat keyakinan {round(float(probability) * 100, 2)}%."
				if prediction == 1
				else f"Peserta diprediksi membutuhkan sekitar {estimated_duration} bulan rehabilitasi tambahan "
				f"untuk meningkatkan peluang keberhasilan."
			),
		}

	except Exception as e:
		return {"status": "error", "message": str(e)}
