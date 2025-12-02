from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from processe import preprocess_darija

app = Flask(__name__)
CORS(app)

# Load model + vectorizer
try:
    model = joblib.load("svm_model.pkl")
    vectorizer = joblib.load("vectorizer.pkl")
    print("Models loaded successfully!")
except Exception as e:
    print(f"Error loading models: {e}")
    model = None
    vectorizer = None

@app.route('/predict', methods=['POST'])
def predict():
    if not model or not vectorizer:
        return jsonify({"error": "Models not loaded correctly"}), 500

    try:
        data = request.json
        if not data or "text" not in data:
            return jsonify({"error": "Missing 'text' field"}), 400

        text = data["text"]
        
        # Preprocess text
        processed = preprocess_darija(text)
        
        # Vectorize
        vec = vectorizer.transform([processed])
        
        # Predict
        pred = model.predict(vec)[0]

        return jsonify({
            "prediction": "Fake" if pred == 0 else "True",
            "processed_text": processed
        })
    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)
