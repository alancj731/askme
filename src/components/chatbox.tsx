import { default as Myself } from "@/components/myself";
import { Message, useChat } from "@ai-sdk/react";
import { useEffect, useState, useRef } from "react";
import { User } from "lucide-react";

const initMessage: Message = {
  id: "1",
  role: "assistant",
  content: "Hi, I'm Jian. How are you doing today?",
};

export default function ChatBox() {
  const { setMessages, messages, input, handleInputChange, handleSubmit } =
    useChat();
  const [typingIndex, setTypingIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const [typingOutput, setTypingOutput] = useState<string>("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(90vh-2rem)] md:w-1/2 scrollbar-hide">
      <div
        ref={messagesContainerRef}
        className="z-15 flex-1 overflow-y-auto max-h-[calc(90vh-4rem)] scrollbar-hide md:w-full mb-4 md:max-w-3xl md:mx-auto scrollbar-none"
      >
        <div className="mx-auto">
          <div className="flex flex-col space-y-2">
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
                  <div className="flex mt-1 justify-center items-center h-10 w-10 rounded-full bg-accent">
                    <User />
                  </div>
                )}
                <div className="py-2 leading-8">
                  {typing && index === typingIndex ? typingOutput : m.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-10 bg-background pt-4 pb-4 shadow-lg mx-auto w-full">
        <form onSubmit={myHandleSubmit} className="flex justify-center">
          <input
            className="z-20 p-2 w-full rounded border border-zinc-300 shadow-xl md:max-w-3xl dark:border-zinc-800 dark:bg-zinc-900"
            value={input}
            placeholder="Anything about me ..."
            onChange={myHandleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
