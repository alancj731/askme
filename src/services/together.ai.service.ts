import { createTogetherAI, type TogetherAIProvider } from "@ai-sdk/togetherai";
import { generateText, streamText } from "ai";

const apiKey = process.env.NEXT_PUBLIC_TOGETHER_AI_API_KEY || "";
const MODEL =

  process.env.TOGETHER_MODEL || "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free";

  

export class TogetherAiService {
  static instace: TogetherAiService | null = null;
  public togetherai: TogetherAIProvider | null = null;
  private apiKey: string;

  static getInstance() {
    if (!TogetherAiService.instace) {
      TogetherAiService.instace = new TogetherAiService();
    }
    return TogetherAiService.instace;
  }

  constructor() {
    if (apiKey === "") {
      throw new Error("API key is required");
    } else {
      this.apiKey = apiKey;
      this.togetherai = createTogetherAI({ apiKey: this.apiKey });
      console.log("TogetherAiService initialized");
    }
  }

  async textFromAI(prompt: string) {
    if (!this.togetherai) {
      throw new Error("TogetherAi is not initialized");
    }
    try {
      const { text } = await generateText({
        model: this.togetherai(MODEL),
        messages: [{ role: "user", content: prompt }],
      });

      if (text) {
        return text;
      } else {
        throw new Error("No response from AI");
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async streamTextFromAI(messages: any[]) {
    if (!this.togetherai) {
      throw new Error("TogetherAi is not initialized");
    }
    try{
      const result = streamText({
        model: this.togetherai(MODEL),
        messages: messages,
      }); 

      const readableStream = result.toDataStreamResponse().body;
      
      if(MODEL !== "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free")
      {
        return readableStream;
      }
      
      const textDecoder = new TextDecoder();
      let thinkFinished = false;

      // remove think information from the stream
      const transformStream = new TransformStream({
        async transform(chunk, controller) {
          if (thinkFinished){
            controller.enqueue(chunk);
          }
          const chunkStr = textDecoder.decode(chunk);
          if(chunkStr.includes("</think>")){
            thinkFinished = true;
          }
        }
      });

      return readableStream?.pipeThrough(transformStream);

    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
