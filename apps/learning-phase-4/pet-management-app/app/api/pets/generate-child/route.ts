import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const hfApiKey = process.env.HUGGINGFACE_API_KEY;
    const geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (!hfApiKey || !geminiApiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const { parent1, parent2 } = await request.json();

    if (!parent1 || !parent2) {
      return NextResponse.json(
        { error: "Two parents are required" },
        { status: 400 }
      );
    }

    // カテゴリーが同じかチェック
    const sameCategory = parent1.category === parent2.category;

    // Gemini APIで両親の画像から特徴を抽出
    let prompt = sameCategory
      ? `A cute baby ${parent1.category.toLowerCase()}`
      : `A creature that is a mix of a ${parent1.category.toLowerCase()} and a ${parent2.category.toLowerCase()}`;

    // 両親に画像がある場合、Geminiで特徴を分析
    if (parent1.imageUrl && parent2.imageUrl) {
      try {
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // 画像をfetch
        const [img1Response, img2Response] = await Promise.all([
          fetch(parent1.imageUrl),
          fetch(parent2.imageUrl),
        ]);

        const [img1Buffer, img2Buffer] = await Promise.all([
          img1Response.arrayBuffer(),
          img2Response.arrayBuffer(),
        ]);

        const img1Base64 = Buffer.from(img1Buffer).toString("base64");
        const img2Base64 = Buffer.from(img2Buffer).toString("base64");

        // Geminiで両親の特徴を分析
        const analysisPrompt = `これら2匹のペットの画像を見て、それぞれの視覚的特徴（毛色、模様、目の色、体格など）を簡潔に英語で説明してください。

1枚目: ${parent1.name} (${parent1.breed || parent1.category})
2枚目: ${parent2.name} (${parent2.breed || parent2.category})

以下の形式で回答してください：
Parent 1: [毛色], [模様の特徴], [その他の特徴]
Parent 2: [毛色], [模様の特徴], [その他の特徴]
Child (mix): [2匹の特徴を組み合わせた子供の想像される見た目]`;

        const result = await model.generateContent([
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: img1Base64,
            },
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: img2Base64,
            },
          },
          analysisPrompt,
        ]);

        const analysis = result.response.text();
        console.log("Gemini analysis:", analysis);

        // 分析結果からChild部分を抽出
        const childMatch = analysis.match(/Child.*?:(.*?)(?:\n|$)/i);
        if (childMatch) {
          const childDescription = childMatch[1].trim();
          // 品種情報を追加
          const breed1 = parent1.breed || parent1.category;
          const breed2 = parent2.breed || parent2.category;
          const breedInfo = `mix of ${breed1} and ${breed2}`;

          if (sameCategory) {
            prompt = `A cute baby ${parent1.category.toLowerCase()} (${breedInfo}), ${childDescription}, adorable, fluffy, high quality, professional photo, cute face, detailed fur texture`;
          } else {
            prompt = `A creature that is a mix of a ${parent1.category.toLowerCase()} and a ${parent2.category.toLowerCase()} (${breedInfo}), ${childDescription}, adorable, high quality, professional photo, detailed fur texture`;
          }
        }
      } catch (error) {
        console.error("Gemini analysis error:", error);
        // エラーの場合はフォールバック
        if (sameCategory) {
          prompt = `A cute baby ${parent1.category.toLowerCase()} that is a mix between a ${parent1.breed || parent1.category} and a ${parent2.breed || parent2.category}, adorable, fluffy, high quality, professional photo`;
        } else {
          prompt = `A creature that is a mix of a ${parent1.category.toLowerCase()} and a ${parent2.category.toLowerCase()}, combining features of a ${parent1.breed || parent1.category} and a ${parent2.breed || parent2.category}, adorable, high quality, professional photo`;
        }
      }
    } else {
      // 画像がない場合は品種名ベース
      if (sameCategory) {
        prompt = `A cute baby ${parent1.category.toLowerCase()} that is a mix between a ${parent1.breed || parent1.category} and a ${parent2.breed || parent2.category}, adorable, fluffy, high quality, professional photo`;
      } else {
        prompt = `A creature that is a mix of a ${parent1.category.toLowerCase()} and a ${parent2.category.toLowerCase()}, combining features of a ${parent1.breed || parent1.category} and a ${parent2.breed || parent2.category}, adorable, high quality, professional photo`;
      }
    }

    console.log("Final prompt:", prompt);

    // Hugging Face Inference API呼び出し（SDXL Base 1.0）
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hfApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            negative_prompt: "ugly, deformed, low quality, blurry, distorted",
            num_inference_steps: 30,
            width: 1024,
            height: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Hugging Face API error:", response.status, errorText);
      throw new Error(
        `Failed to generate image: ${response.status} - ${errorText}`
      );
    }

    // 画像データを取得
    const imageBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate child image" },
      { status: 500 }
    );
  }
}
