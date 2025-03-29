import { NextRequest } from "next/server";
import { TogetherAiService } from "@/services/together.ai.service";
import { sysInfo } from "@/data/sysinfo";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { messages } = body;

  if (!messages || messages.length === 0) {
    return new Response("No messages provided", { status: 400 });
  }

  const sysPrompt1 = 
  `You are a candidate for a job opening, try to answer questions about yourself based on the following background information.
    
          BEGIN OF BACKGROUND INFORMATION
          =====================
          ${sysInfo}
          =====================
          END OF BACKGROUND INFORMATION
  `;

  const template = {
    role: "system",

    content: sysPrompt1,
  };

  messages.push(template);

  try {
    const readableStream =
      await TogetherAiService.getInstance().streamTextFromAI(messages);

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error getting openAi response:", error);
    return new Response("Error getting openAi response", { status: 500 });
  }
}
