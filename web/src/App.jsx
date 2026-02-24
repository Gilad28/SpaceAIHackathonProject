import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", text: "HelpNaut Operational, what can I help you with?" },
  ]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");

    // Temp till connect gemini
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Test" },
      ]);
    }, 400);
  }

  return (
   <div className="App">
    <p className="Header">Connection Successfully Established</p>
    <div className="Messages">
    {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            <span className="label">
              {m.role === "user" ? "Astronaut" : m.role === "ai" ? "HelpNaut" : "System"}
              {": "}
            </span>
            <span>{m.text}</span>
          </div>
        ))}
    </div>
    <div className="Input">
    <span className="prompt">{">"}</span>
        <input
          className="InputField"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
      </div>
    </div>
  )
}

export default App
