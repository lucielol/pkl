import pandas as pd  # pyright: ignore[reportMissingImports]
from sklearn.model_selection import train_test_split  # pyright: ignore[reportMissingImports]
from sklearn.neighbors import KNeighborsClassifier  # pyright: ignore[reportMissingImports]
from sklearn.preprocessing import LabelEncoder  # pyright: ignore[reportMissingImports]
import joblib  # pyright: ignore[reportMissingImports]

data = pd.DataFrame({
    "usia":[25,30,35,28,40,33],
    "lama_rehab":[3,4,2,6,5,7],
    "tingkat_stres":[5,4,8,3,7,2],
    "dukungan_keluarga":["Tinggi","Sedang","Rendah","Tinggi","Sedang","Tinggi"],
    "riwayat_kambuh":["Tidak","Ya","Ya","Tidak","Tidak","Tidak"],
    "jenis_narkotika":["Sabu","Ganja","Sabu","Heroin","Ganja","Sabu"],
    "keberhasilan":[1,0,0,1,1,1]
})

le = LabelEncoder()
for c in ["dukungan_keluarga","riwayat_kambuh","jenis_narkotika"]:
    data[c] = le.fit_transform(data[c])

X = data.drop("keberhasilan", axis=1)
y = data["keberhasilan"]

model = KNeighborsClassifier(n_neighbors=3)
model.fit(X, y)
joblib.dump(model, "model_rehab.pkl")
print("Model saved to model_rehab.pkl")
