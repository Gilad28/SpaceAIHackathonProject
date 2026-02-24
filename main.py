from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client()

while True:
    message = input("You: ")

    if message.lower() == "exit":
        break

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=message
    )

    print("AI:", response.text)