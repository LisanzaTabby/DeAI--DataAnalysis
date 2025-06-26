import React, { useState, useRef, useEffect } from 'react'; 
import ReactDOM from 'react-dom/client';
import { backend } from 'declarations/backend';
import botImg from '/bot.svg';
import userImg from '/user.svg';
import '/index.css';

// Components
import FileUploader from '../components/fileuploader';
import SummaryDisplay from '../components/summarydisplay';
import ChartComponent from '../components/chartcomponent';
import SummaryHistory from '../components/summaryhistory'; // adjust path if needed

const Chatbot = () => {
  const [chat, setChat] = useState([
    {
      system: { content: "I'm a sovereign AI agent living on the Internet Computer. Ask me anything." }
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);

  // New States for Data Analysis
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState('');
  //new stated for custom user AI Prompt
  const [customPrompt, setCustomPrompt] = useState('');

  const formatDate = (date) => {
    const h = '0' + date.getHours();
    const m = '0' + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
  };

  const askAgent = async (messages) => {
    try {
      const response = await backend.chat(messages);
      setChat((prevChat) => {
        const newChat = [...prevChat];
        newChat.pop();
        newChat.push({ system: { content: response } });
        return newChat;
      });
    } catch (e) {
      console.log(e);
      const eStr = String(e);
      const match = eStr.match(/(SysTransient|CanisterReject), \\+"([^\\"]+)/);
      if (match) {
        alert(match[2]);
      }
      setChat((prevChat) => {
        const newChat = [...prevChat];
        newChat.pop();
        return newChat;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      user: { content: inputValue }
    };
    const thinkingMessage = {
      system: { content: 'Thinking ...' }
    };
    setChat((prevChat) => [...prevChat, userMessage, thinkingMessage]);
    setInputValue('');
    setIsLoading(true);

    const messagesToSend = chat.slice(1).concat(userMessage);
    askAgent(messagesToSend);
  };

  const generateSummary = (parsedData) => {
  const rowCount = parsedData.length;
  const columnCount = parsedData[0] ? Object.keys(parsedData[0]).length : 0;
  const sampleKeys = Object.keys(parsedData[0] || {}).join(', ');
  return `✅ Dataset has ${rowCount} rows and ${columnCount} columns.\n📊 Columns: ${sampleKeys}`;
};

const handleAIResponse = async (aiSummary) => {
  setSummary(`🤖 AI Summary:\n${aiSummary}`); // Show in UI
  try {
    await backend.saveSummary(aiSummary); // Save to ICP backend
    console.log("✅ Summary saved to backend");
  } catch (error) {
    console.error("❌ Failed to save summary:", error);
  }
};


  const handleDataLoaded = async (parsedData) => {
  setData(parsedData);
  setSummary("⏳ Generating AI summary...");

  const rowCount = parsedData.length;
  const columnCount = parsedData[0] ? Object.keys(parsedData[0]).length : 0;
  const sampleKeys = Object.keys(parsedData[0] || {}).join(', ');
  const sampleRows = parsedData.slice(0, 5);

  try {
    const res = await fetch('http://localhost:3001/api/summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rowCount,
        columnCount,
        sampleKeys,
        sampleRows,
      })
    });

    const data = await res.json();
    if (data.summary) {
      await handleAIResponse(data.summary); // Save & display
    } else {
      setSummary("⚠️ Failed to get summary.");
    }
  } catch (err) {
    console.error("Error calling API:", err);
    setSummary("❌ Error generating summary.");
  }

  console.log("📤 Sent prompt to backend:", customPrompt);
};



  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    
    <div className="flex flex-col min-h-screen bg-teal-950 p-4 items-center justify-start">
      
      {/* Title */}
      <h1 className="text-2xl text-white font-bold mb-6"> DeAI — Data Summary Tool + Chat Agent</h1>

      {/* File Upload + Summary + Chart */}
      <div className="w-full max-w-2xl mb-8 p-4 bg-teal-800 rounded-lg shadow">
        <div className="mb-4">
        <label className="block text-white text-sm font-semibold mb-1">
          Custom AI Prompt (optional)
        </label>
        <input
          type="text"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="e.g., Summarize dataset and highlight unusual trends"
          className="w-full p-2 rounded bg-white text-black text-sm"
        />
      </div>

        <FileUploader onDataLoaded={handleDataLoaded} />
        <SummaryDisplay summary={summary} />
        <ChartComponent data={data} />

        {/* NEW: Show past summaries */}
        <SummaryHistory />

      </div>

      {/* Chat Interface */}
      
    </div>
  );
};

export default Chatbot;

