import { generateText } from "ai";
import { createGateway } from "@ai-sdk/gateway";

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY!,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const result = await generateText({
    model: gateway("gpt-4o-mini"),
    prompt,
  });
  return new Response(JSON.stringify({ text: result.text }), {
    headers: { "Content-Type": "application/json" },
  });
}
