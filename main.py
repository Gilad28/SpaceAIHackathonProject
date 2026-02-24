from dotenv import load_dotenv
from google import genai

load_dotenv()

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

while True:
    message = input("Astronaut: ")
    if message.lower() == "exit":
        break

    response = chat.send_message(message)

    print("AI:", response.text)