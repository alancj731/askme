import Myself from "@/components/myself";
import { Message, useChat } from "@ai-sdk/react";
import { useEffect, useState, useRef } from "react";
import { User } from "lucide-react";

const initMessage: Message = {
  id: "1",
  role: "assistant",
  content: "Hi, there. How are you doing today?",
};

export default function ChatBox() {
  const { setMessages, messages, input, handleInputChange, handleSubmit } =
    useChat();
  const [typingIndex, setTypingIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const [typingOutput, setTypingOutput] = useState<string>("");

  useEffect(() => {
    setMessages([initMessage]);
    function TypingText() {
      let index = 0;
      const interval = 100;
      const target = initMessage.content;
      const timer = setInterval(() => {
        if (index < target.length) {
          const current = index;
          setTypingOutput((prev) => prev + target[current]);
          index++;
        } else {
          setTyping(false);
          setTypingOutput("");
          clearInterval(timer);
        }
      }, interval);
    }
    TypingText();

    return () => {
      setMessages([]);
      setTypingOutput("");
    };
  }, []);

  const myHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
  };

  const myHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }, [messages]);

  return (
    <div className="overflow-hidden items-between space-y-2 stretch z-15 flex h-[640px] w-full flex-col justify-between text-xl md:px-10">

      <div className="md:w-1/2 md:self-center">
        <div className="items-betweeb flex-col">
          {messages.map((m, index) => (
            <div
              key={"message-" + index}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              } items-start gap-2 p-2`}
            >
              {m.role === "assistant" && (
                <div className="flex items-center mt-2">
                  <Myself />
                </div>
              )}
              {m.role === "user" && (
                <div className="flex mt-1 justify-center items-center h-10 w-10 rounded-full bg-accent ">
                  <User />
                </div>
              )}
              <div className="py-2">
                {typing && index === typingIndex ? typingOutput : m.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form
        onSubmit={myHandleSubmit}
        className="flex justify-center overflow-y-auto"
      >
        <input
          className="z-10 w-full rounded border border-zinc-300 shadow-xl md:w-1/2 dark:border-zinc-800 dark:bg-zinc-900"
          value={input}
          placeholder="Anything about me ..."
          onChange={myHandleInputChange}
        />
      </form>
    </div>
  );
}
