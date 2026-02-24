from dotenv import load_dotenv
from google import genai
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


@app.route("/api/chat", methods=["POST"])
def chat_api():
    data = request.json
    message = data.get("message")

    response = chat.send_message(message)

    return jsonify({
        "reply": response.text
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)