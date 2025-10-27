from fastapi import FastAPI  # pyright: ignore[reportMissingImports]
from pydantic import BaseModel
import joblib  # pyright: ignore[reportMissingImports]
import pandas as pd  # pyright: ignore[reportMissingImports]
from sklearn.neighbors import KNeighborsClassifier  # pyright: ignore[reportMissingImports]
from sklearn.preprocessing import LabelEncoder  # pyright: ignore[reportMissingImports]

# Initialize FastAPI
app = FastAPI(title="Prediksi Rehabilitasi ML API", version="1.0")

# Load model
try:
  model = joblib.load("model_rehab.pkl")
except:
  model = None

# Schema input
class InputData(BaseModel):
  usia: int
  lama_rehab: int
  tingkat_stres: int
  dukungan_keluarga: str
  riwayat_kambuh: str
  jenis_narkotika: str

@app.get("/")
def read_root():
  return {"message": "API working"}

@app.post("/predict")
def predict(data: InputData):
  if model is None:
    return {"error": "Model not trained"}

  df = pd.DataFrame([data.model_dump()])
  features = ["usia", "lama_rehab", "tingkat_stres",
             "dukungan_keluarga", "riwayat_kambuh", "jenis_narkotika"]
  df = df[features]

  prediction = model.predict(df)[0]
  probability = model.predict_proba(df)[0][1]
  result = "Success" if prediction == 1 else "Failed"

  return {"prediction": result, "probability": round(float(probability), 2)}

@app.get("/train")
def train(data: list[dict]):
  df = pd.DataFrame(data)
  le = LabelEncoder()
  for c in ["dukungan_keluarga","riwayat_kambuh","jenis_narkotika"]:
    df[c] = le.fit_transform(df[c])

  X = df.drop("keberhasilan", axis=1)
  y = df["keberhasilan"]
  model = KNeighborsClassifier(n_neighbors=3)
  model.fit(X, y)
  joblib.dump(model, "model_rehab.pkl")
