import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const { message, petInfo } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Gemini API呼び出し
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `あなたはペットの健康アドバイザーです。以下のペット情報を参考に、飼い主からの質問に親切に答えてください。

ペット情報：
- 名前: ${petInfo.name}
- 種類: ${petInfo.category}
- 品種: ${petInfo.breed || "不明"}
- 性別: ${petInfo.gender || "不明"}
- 年齢: ${petInfo.age || "不明"}

注意事項：
- 一般的なアドバイスのみを提供してください
- 緊急性が高い症状の場合は、必ず獣医に相談するよう促してください
- 診断や処方は行わないでください
- 優しく、わかりやすい言葉で説明してください`;

    const result = await model.generateContent([
      systemPrompt,
      `質問: ${message}`,
    ]);

    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}
