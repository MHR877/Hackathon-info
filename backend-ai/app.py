from flask import Flask, request, jsonify
import joblib
from processe import preprocess_darija


app = Flask(__name__)

# Load model + vectorizer
model = joblib.load("svm_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

@app.post("/predict")
def predict():
    data = request.json

    if "text" not in data:
        return jsonify({"error": "Missing 'text' field"}), 400

    text = data["text"]

    # Preprocess text
    processed = preprocess_darija(text)

    # Vectorize
    vec = vectorizer.transform([processed])

    pred = model.predict(vec)[0]

    return jsonify({
        "prediction": "Fake" if pred == 0 else "True",
        "processed_text": processed
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
