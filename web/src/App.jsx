import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", text: "HelpNaut Operational, what can I help you with?" },
  ]);

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setThinking(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json().catch(() => ({}));
      const reply = data.reply || "Something went wrong. Please try again.";

      if (!response.ok) {
        setMessages((prev) => [...prev, { role: "ai", text: reply }]);
        return;
      }
      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", text: "Connection error. Please try again." }]);
    } finally {
      setThinking(false);
    }
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
    {thinking && (
      <div className="Thinking">
        <span className="ThinkingLabel">HelpNaut: </span>
        <div className="ThinkingBar"><div className="ThinkingBarFill" /></div>
      </div>
    )}
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
