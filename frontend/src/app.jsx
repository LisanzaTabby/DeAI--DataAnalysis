import React, { useState, useRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import botImg from '../public/ai.png';
import userImg from '../public/ai.png';
import '../index.css';

const Sidebar = ({ history, onSelect, onNewChat }) => (
  <div className="w-64 border-r p-4 overflow-y-auto h-full flex flex-col">
    <div className="text-xl font-bold text-blue-600 mb-6 text-center">🤖 DataMind</div>

    <button
      onClick={onNewChat}
      className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      ➕ New Chat
    </button>

    <h2 className="text-lg font-semibold text-gray-700 mb-2">Previous Sessions</h2>
    <ul className="space-y-2 flex-1 overflow-y-auto">
      {history.map((chatItem, idx) => (
        <li
          key={idx}
          onClick={() => onSelect(chatItem)}
          className="cursor-pointer p-2 rounded hover:bg-blue-100 text-sm transition"
        >
          Chat {idx + 1}
        </li>
      ))}
    </ul>
  </div>
);

const App = () => {
  const initialPrompt = [
    { system: { content: "I'm a sovereign AI agent living on the Internet Computer. Ask me anything." } }
  ];

  const [chat, setChat] = useState(initialPrompt);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [history, setHistory] = useState([]);
  const chatBoxRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const saved = Cookies.get('chatHistory');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse cookies:', err);
      }
    }
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  const formatDate = (date) => {
    const h = '0' + date.getHours();
    const m = '0' + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { user: { content: inputValue } };
    const thinkingMessage = { system: { content: 'Thinking ...' } };

    setChat((prev) => [...prev, userMessage, thinkingMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const response = {
        system: {
          content: `🧠 Insight: "${inputValue}" looks interesting. Upload a dataset to dive deeper.`
        }
      };
      const updatedChat = [...chat, userMessage, response];
      setChat(updatedChat);
      updateHistory(updatedChat);
      setIsLoading(false);
    }, 1500);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadedMsg = { user: { content: `📁 Uploaded file: ${file.name}` } };
    const thinkingMsg = { system: { content: 'Analyzing your dataset...' } };

    setFileName(file.name);
    setIsLoading(true);
    const tempChat = [...chat, uploadedMsg, thinkingMsg];
    setChat(tempChat);

    setTimeout(() => {
      const aiResponse = {
        system: {
          content:
            "✅ AI Insight: Your dataset contains null values in column 'age' and duplicate entries in 'email'."
        }
      };
      const updatedChat = [...tempChat.slice(0, -1), aiResponse];
      setChat(updatedChat);
      updateHistory(updatedChat);
      setIsLoading(false);
    }, 2000);
  };

  const updateHistory = (session) => {
    if (session.length <= 1) return;
    const newHistory = [...history, session];
    setHistory(newHistory);
    Cookies.set('chatHistory', JSON.stringify(newHistory), { expires: 7 });
  };

  const loadHistory = (session) => {
    setChat(session);
  };

  const startNewChat = () => {
    if (chat.length > 1) updateHistory(chat);
    setChat(initialPrompt);
    setFileName('');
    setInputValue('');
  };

  return (
    <div className="min-h-screen flex text-sm">
      <Sidebar history={history} onSelect={loadHistory} onNewChat={startNewChat} />

      <div className="flex flex-col flex-1 items-center py-6 px-4">
        <h1 className="text-2xl font-semibold text-blue-600 mb-4">🤖 Hi! I am DataMind, how can I help you?</h1>

        <div
          ref={chatBoxRef}
          className="w-full max-w-3xl h-[28rem] overflow-y-auto space-y-4 mb-4"
        >
          {chat.map((msg, i) => {
            const isUser = 'user' in msg;
            const text = isUser ? msg.user.content : msg.system.content;
            const img = isUser ? userImg : botImg;
            const name = isUser ? 'You' : 'Agent';

            return (
              <div key={i} className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && <img src={img} className="h-6 w-6 mt-1" alt="bot" />}
                <div className={`${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} px-3 py-2 rounded-xl max-w-[80%]`}>
                  <div className="text-[10px] text-gray-500 mb-1">{name} • {formatDate(new Date())}</div>
                  <div className="whitespace-pre-wrap">{text}</div>
                </div>
                {isUser && <img src={img} className="h-6 w-6 mt-1" alt="user" />}
              </div>
            );
          })}
        </div>

        <form className="w-full max-w-3xl flex items-center gap-2" onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="text-xl text-blue-600 font-bold px-3 py-2 border border-blue-600 rounded hover:bg-blue-100"
            title="Upload CSV/XLSX"
          >
            📎
          </button>
          <input
            type="file"
            accept=".csv, .xlsx"
            onChange={handleUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 px-4 py-2 rounded focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
          >
            Send
          </button>
        </form>

        {fileName && (
          <p className="mt-2 text-xs text-gray-500">
            Last uploaded: <strong>{fileName}</strong>
          </p>
        )}

        {isLoading && (
          <p className="mt-2 text-blue-500 italic text-sm">⏳ Processing...</p>
        )}
      </div>
    </div>
  );
};

export default App;
