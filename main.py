from dotenv import load_dotenv
from google import genai
from google.genai.errors import ClientError
from flask import Flask, request, jsonify
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

client = genai.Client()

chat = client.chats.create(
    model="gemini-3-flash-preview",
    history=[
        {
            "role": "user",
            "parts": [{"text": "You are a astronaut mental health assistant, keep your responses short and concise. Astronauts will reach out with mental health issues please help them."}]
        }
    ]
)


@app.get("/api/health")
def health():
    return jsonify(ok=True)


@app.route("/api/chat", methods=["POST"])
def chat_api():
    data = request.json or {}
    message = data.get("message") or ""

    try:
        response = chat.send_message(message)
        return jsonify({"reply": response.text})
    except ClientError as e:
        if getattr(e, "code", None) == 429:
            return jsonify({"reply": "Rate limit reached. Please try again in a moment."}), 429
        return jsonify({"reply": "Something went wrong. Please try again."}), 502
    except Exception:
        return jsonify({"reply": "Something went wrong. Please try again."}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)