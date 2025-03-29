export default function Loading() {
  return (
    <div className="flex space-x-2 items-center">
      <div
        className="typing-dot w-2 h-2 rounded-full bg-gray-400"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="typing-dot w-2 h-2 rounded-full bg-gray-400"
        style={{ animationDelay: "150ms" }}
      />
      <div
        className="typing-dot w-2 h-2 rounded-full bg-gray-400"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
}
