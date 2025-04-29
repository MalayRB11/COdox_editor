"use client";
import { useState, useRef /* removed useEffect */ } from "react";

export const SidebarBox = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify([...messages, userMessage]),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ❌ Removed autoscroll
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  return (
    <div className="bg-white/10 rounded-xl p-4 w-80 h-[500px] text-white flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2
          className="text-xl font-semibold text-white"
          style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.8)" }}
        >
          Chat Assistant
        </h2>
        <button
          onClick={() => setMessages([])}
          className="text-sm bg-red-500 px-2 py-1 rounded hover:bg-red-600 transition"
        >
          Clear
        </button>
      </div>
  
      {/* ✅ Scrollable only inside this div */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-2 pr-1 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`text-sm p-2 rounded whitespace-pre-line ${
              m.role === "user"
                ? "bg-[rgba(147,197,253,0.6)] text-black ml-auto"     // soft blue with 60% opacity
                : "bg-[rgba(229,231,235,0.6)] text-black mr-auto"  // soft gray with 60% opacity
            }`}
          >
            <strong>{m.role === "user" ? "You" : "AI"}:</strong> {m.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
        {loading && (
          <div className="text-sm text-gray-500 flex items-center gap-1">
            Typing
            <span className="animate-bounce1 delay-[0ms]">.</span>
            <span className="animate-bounce1 delay-[200ms]">.</span>
            <span className="animate-bounce1 delay-[400ms]">.</span>
          </div>
        )}
      </div>
  
      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 px-2 py-1 text-black rounded bg-white"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
  
};
