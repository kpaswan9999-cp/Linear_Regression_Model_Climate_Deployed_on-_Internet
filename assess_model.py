import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib

# Load data
df = pd.read_csv('Climate Dataset new.csv')

# Use correct column names from the actual file
features = ['Temperature_Max (°C)', 'Temperature_Min (°C)', 'Humidity (%)', 
            'Rainfall (mm)', 'Wind_Speed (km/h)', 'AQI', 
            'Pressure (hPa)', 'Cloud_Cover (%)']
target = 'Temperature_Avg (°C)'

# Fill NaN with median (basic cleanup for the model)
for col in features + [target]:
    if col in df.columns:
        df[col] = pd.to_numeric(df[col], errors='coerce')
        df[col] = df[col].fillna(df[col].median())

X = df[features]
y = df[target]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

train_score = model.score(X_train, y_train)
test_score = model.score(X_test, y_test)

with open('model_assessment.txt', 'w', encoding='utf-8') as f:
    f.write(f"Train R2: {train_score}\n")
    f.write(f"Test R2: {test_score}\n")
    if train_score - test_score > 0.05:
        f.write("Assessment: Potential overfitting detected (difference > 0.05).\n")
    else:
        f.write("Assessment: Model looks stable.\n")

# Save the model and feature list for the Flask app
joblib.dump(model, 'model.pkl')
joblib.dump(features, 'features.pkl')

print("Assessment complete. model.pkl and features.pkl saved.")
