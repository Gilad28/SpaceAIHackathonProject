from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client()

while True:
    message = input("Astronaut: ")
    prompt = f"You are a astronaut mental health assistant, keep your responses short and concise. Astronauts will reach out with mental health issues please help them. The user's message is: {message}"
    if message.lower() == "exit":
        break

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=prompt
    )

    print("AI:", response.text)