import { NextRequest, NextResponse } from "next/server";
import { TogetherAiService } from "@/services/together.ai.service";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, messages } = body;

  if (!messages || messages.length === 0) {
    return new Response("No messages provided", { status: 400 });
  }

  const lastMessage = messages[messages.length - 1];

  const docContext = "No context provided";

  const template = {
    role: "system",

    content: `You are asking about the following question
          ---------------------
          QUESTION START 
          ${lastMessage}
          QUESTION END
          --------------------- 
          
          Here are some context documents:
          ---------------------
          CONTEXT START 
          ${docContext}
          CONTEXT END
          ---------------------
          
          If you can't find answer in the context, you need to answer based on existing knowledge.
          Don't mention the context documents in your response.
          `,
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
