import React, { useState, useRef, useEffect } from "react";
import botImg from "/bot.svg";
import userImg from "/user.svg";

export default function App() {
  const [messages, setMessages] = useState([
    { sender: "system", text: "I'm a sovereign AI agent living on the Internet Computer. Ask me anything." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [insight, setInsight] = useState(null);
  const [fileName, setFileName] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botReply = {
        sender: "bot",
        text: `You said: "${newMessage.text}". I’m still learning. Try uploading data for deeper analysis.`,
      };
      setMessages((prev) => [...prev, botReply]);
      setIsLoading(false);
    }, 1000);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setIsLoading(true);

    // Simulate file processing
    setTimeout(() => {
      setInsight("✅ Analysis complete! Your data has missing values in column 'age' and duplicated rows.");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-6 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">🤖 DeAI — Agent Launcher</h1>

        {/* Chat Area */}
        <div className="h-72 overflow-y-auto space-y-4 mb-4 p-2 bg-gray-50 rounded border">
          {messages.map((msg, i) => (
            <div key={i} className="flex items-start gap-2">
              {msg.sender === "user" ? (
                <>
                  <img src={userImg} alt="User" className="w-6 h-6 mt-1" />
                  <div className="bg-blue-500 text-white px-3 py-2 rounded-md ml-auto max-w-[80%]">
                    {msg.text}
                  </div>
                </>
              ) : msg.sender === "bot" ? (
                <>
                  <img src={botImg} alt="Bot" className="w-6 h-6 mt-1" />
                  <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md max-w-[80%]">
                    {msg.text}
                  </div>
                </>
              ) : (
                <div className="text-gray-500 italic w-full text-sm">{msg.text}</div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Chat Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything ..."
            className="flex-1 border border-gray-300 px-3 py-2 rounded focus:outline-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>

        {/* File Upload */}
        <div className="mt-6">
          <label className="block font-medium mb-1">📁 Upload dataset for analysis:</label>
          <input
            type="file"
            onChange={handleUpload}
            className="border border-gray-300 p-2 rounded w-full"
          />
          {fileName && (
            <p className="text-sm text-gray-600 mt-1">Uploaded: <strong>{fileName}</strong></p>
          )}
        </div>

        {/* AI Insight */}
        {insight && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded shadow-sm">
            <h3 className="font-semibold mb-1">📊 AI Insights:</h3>
            <p>{insight}</p>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <p className="mt-4 text-sm text-blue-600 italic">⏳ Processing...</p>
        )}
      </div>
    </div>
  );
}
