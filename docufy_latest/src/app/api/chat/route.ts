// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY!;
const MODEL = "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"; // your selected model

export async function POST(req: NextRequest) {
  const messages = await req.json();

  const res = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${TOGETHER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: messages,
      temperature: 0.7, // adjust creativity level if needed
    }),
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "No reply";

  return NextResponse.json({ reply });
}
