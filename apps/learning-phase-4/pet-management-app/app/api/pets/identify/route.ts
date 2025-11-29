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

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = formData.get("category") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // ファイルをBase64に変換
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    // Gemini API呼び出し
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt =
      category === "Dog"
        ? "この犬の画像を見て、犬種を特定してください。犬種名のみを日本語で回答してください。複数の可能性がある場合は最も可能性の高いものを1つだけ答えてください。"
        : category === "Cat"
          ? "この猫の画像を見て、猫種を特定してください。猫種名のみを日本語で回答してください。複数の可能性がある場合は最も可能性の高いものを1つだけ答えてください。"
          : "この動物の種類を特定してください。種類名のみを日本語で回答してください。";

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: file.type,
          data: base64Image,
        },
      },
      prompt,
    ]);

    const breed = result.response.text().trim();

    return NextResponse.json({ breed });
  } catch (error) {
    console.error("Identify error:", error);
    return NextResponse.json(
      { error: "Failed to identify breed" },
      { status: 500 }
    );
  }
}
