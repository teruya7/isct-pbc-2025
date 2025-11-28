# AI機能の実装

**Programming Boot Camp - Learning Phase 4**

続いて、ペット管理アプリに3つのAI機能を追加します。

---

## 実装する機能

1. **犬種/猫種自動識別** - 画像から品種を判定
2. **ヘルスケアアドバイザー** - AIチャットボット
3. **子供イメージ画像生成** - 2匹のペットから子供の画像を生成

---

## 使用するAI APIの紹介

### Google Gemini API

#### 概要

Google Gemini APIは、Googleが提供する最新のマルチモーダルAIモデルです。テキスト、画像、動画など、さまざまな形式のデータを理解し、処理できます。

#### 主な機能

- **画像理解**: 画像の内容を詳細に分析・説明
- **テキスト生成**: 自然で人間らしい文章を生成
- **会話**: 文脈を理解した対話が可能
- **多言語対応**: 日本語を含む100以上の言語に対応

#### 利用可能なモデル

Google Gemini APIには複数のモデルがありますが、本講義では**Gemini 2.5 Flash**を使用します。

##### Gemini 2.5 Flash（本講義で使用・推奨）🏆

**モデル名**: `gemini-2.5-flash`

- ⚡ **最速**: 応答速度が非常に速い（リアルタイム処理に最適）
- 🎯 **高精度**: 最新の改善により、画像認識・テキスト生成の精度が向上
- 💰 **低コスト**: 最も安価で無料枠も充実
- 🖼️ **マルチモーダル**: テキスト、画像、動画、音声すべてに対応
- 📝 **長文対応**: 最大100万トークン（約75万語）

**無料枠**:
- 月15 RPM（Requests Per Minute）
- 月1,500 RPD（Requests Per Day）
- 実質的に1日100リクエスト以上無料で使える

**なぜ2.5 Flashを選ぶのか？**
- ✅ 学習に最適な性能とコストバランス
- ✅ 犬種/猫種識別に十分な精度
- ✅ チャットボットに最適な応答速度
- ✅ 無料枠が大きく、練習に最適

##### Gemini 1.5 Pro（参考）

**モデル名**: `gemini-1.5-pro`

- 🧠 **最高性能**: より複雑な推論タスクに対応
- 📚 **超長文**: 最大200万トークン
- 💰 **高コスト**: 無料枠が少ない（月2 RPM程度）

**用途**: 複雑な医療診断や詳細な分析が必要な場合のみ使用

#### 料金

- **無料枠**: 月15 RPM（Gemini 2.5 Flash）
- **有料プラン**: 従量課金制（詳細はGoogle AI Studioで確認）

#### 本講義での用途

1. **犬種/猫種自動識別**: Gemini 2.5 Flashで画像を分析し、品種を判定
2. **ヘルスケアアドバイザー**: Gemini 2.5 Flashでペットの健康に関する質問に回答

---

### Hugging Face Inference API

#### 概要

Hugging Faceは、機械学習モデルの共有プラットフォームです。Inference APIを使うと、公開されている数万のAIモデルを簡単に利用できます。

#### 主な機能

- **画像生成**: テキストから画像を生成（Stable Diffusion、SDXL、FLUX.1 など）
- **テキスト生成**: 大規模言語モデル（Llama、Mistral など）
- **音声認識**: 音声をテキストに変換（Whisper など）
- **物体検出**: 画像内の物体を検出（YOLO など）
- **画像編集**: 背景除去、高解像度化など

#### 利用可能な画像生成モデル

Hugging Face Inference APIでは、複数の画像生成モデルが利用可能です。本講義では**Stable Diffusion XL Base 1.0**を推奨します。

##### Stable Diffusion XL Base 1.0（推奨）🏆

**モデル名**: `stabilityai/stable-diffusion-xl-base-1.0`

- 🎨 **高品質**: 1024x1024の高解像度画像生成
- 🎯 **高精度**: プロンプトの理解が向上
- 📝 **詳細な表現**: より複雑なプロンプトに対応
- 🆓 **無料**: Inference APIで無料利用可能

**本講義での採用理由**:
- ✅ 旧版（2.1）より画質が大幅に向上
- ✅ ペットの特徴をより正確に表現
- ✅ 無料枠で利用可能

##### Stable Diffusion 2.1（代替オプション）

**モデル名**: `stabilityai/stable-diffusion-2-1`

- ⚡ **高速**: XLより処理が速い
- 💾 **軽量**: モデルサイズが小さい
- 📐 **512x512**: 標準解像度

**用途**: 高速な生成が必要な場合や、モデル読み込み待ち時間を避けたい場合

##### FLUX.1 Schnell（最新・高性能）

**モデル名**: `black-forest-labs/FLUX.1-schnell`

- ⭐ **最高品質**: 最新の高性能モデル
- 🎯 **超高精度**: 写真のようなリアルな画像
- ⚡ **高速**: schnellは「速い」という意味

**注意**: 無料枠では読み込みに時間がかかる場合があります

#### 料金

##### 無料枠
- **完全無料**: APIキーのみで利用可能
- **制限**:
  - リクエストレート: 約30リクエスト/分
  - モデル読み込み: 初回20-30秒（キャッシュされる）
  - タイムアウト: 60秒

##### Pro プラン（$9/月）
- **高速**: 優先的に処理される
- **常時起動**: モデルが常に読み込まれた状態
- **より多くのリクエスト**: レート制限が緩和
- **専用エンドポイント**: 安定した性能

#### 本講義での用途

- **子供イメージ画像生成**: 2匹のペットの特徴を組み合わせた画像を生成
- **推奨モデル**: `stabilityai/stable-diffusion-xl-base-1.0`（高品質かつ無料）

---

## APIの選定理由

### なぜこれらのAPIを選んだのか？

#### 1. 学習に最適

**Google Gemini API（Gemini 2.5 Flash）**
- ✅ **日本語対応が優れている** - 日本語での質問・回答が自然
- ✅ **無料枠が充実** - 学習用途なら十分な無料枠（月1,500リクエスト/日）
- ✅ **マルチモーダル** - 画像とテキストの両方を1つのAPIで処理可能
- ✅ **シンプルなAPI** - 初心者でも理解しやすい設計
- ✅ **最新モデル** - Gemini 2.5 Flashで最新のAI技術を体験できる
- ✅ **高速応答** - リアルタイム処理に最適な速度

**Hugging Face Inference API**
- ✅ **完全無料** - 学習環境で課金の心配なし
- ✅ **豊富なモデル** - 数万のモデルから選択可能
- ✅ **コミュニティが活発** - 問題解決の情報が豊富
- ✅ **オープンソース** - モデルの仕組みを学べる

#### 2. 実用性が高い

これらのAPIは実際の開発現場でも広く使われています：

**Google Gemini API**
- 企業向けのAIアシスタント
- コンテンツ生成ツール
- 画像分析サービス

**Hugging Face**
- スタートアップのプロトタイプ開発
- 研究機関でのモデル評価
- AIアプリケーションの開発

### 他の選択肢との比較

#### OpenAI API（GPT-4、DALL-E）

**メリット**:
- 非常に高性能
- 豊富なドキュメント

**デメリット**:
- ❌ **無料枠がない** - 即座に課金が必要
- ❌ **コストが高い** - 学習用途では負担大
- ❌ **APIキー取得に電話番号認証が必要**

➡️ 学習環境には不向き

#### Claude API（Anthropic）

**メリット**:
- 高性能な言語モデル
- 長文処理に強い

**デメリット**:
- ❌ **無料枠が限定的**
- ❌ **画像生成機能がない**
- ❌ **日本からの利用に制限がある場合も**

➡️ 今回の用途には不十分

#### AWS Rekognition / Azure Computer Vision

**メリット**:
- 企業向けの信頼性
- 豊富な機能

**デメリット**:
- ❌ **セットアップが複雑** - AWSアカウント、課金設定など
- ❌ **学習曲線が急** - クラウドサービスの知識が必要
- ❌ **無料枠に制限が多い**

➡️ 初学者には複雑すぎる

### まとめ：今回の選定

| 項目 | Google Gemini | Hugging Face |
|------|---------------|--------------|
| 無料枠 | ⭐⭐⭐⭐ 充実 | ⭐⭐⭐⭐⭐ 完全無料 |
| 日本語対応 | ⭐⭐⭐⭐⭐ 優秀 | ⭐⭐⭐ 普通 |
| セットアップ | ⭐⭐⭐⭐⭐ 簡単 | ⭐⭐⭐⭐ 簡単 |
| ドキュメント | ⭐⭐⭐⭐ 充実 | ⭐⭐⭐⭐ 充実 |
| 学習適性 | ⭐⭐⭐⭐⭐ 最適 | ⭐⭐⭐⭐⭐ 最適 |

今回選定したAPIは、**学習目的、無料枠、使いやすさ、実用性のバランスが最も優れています**。

---

**それでは、これらのAPIを使ってAI機能を実装していきましょう！まずは各APIのアクセスキーを取得します。**

## 事前準備：APIキーの取得

### Google Gemini API キーの取得

犬種識別とチャットボットで使用します。

1. Google AI Studio にアクセス：https://aistudio.google.com/

2. Googleアカウントでログイン

3. 左サイドバーの「Get API key」をクリック

4. 「Create API key」をクリック

5. 既存のGoogle Cloudプロジェクトを選択、または新規作成

6. API キーが表示されるのでコピーして保存

**無料枠**: 月60リクエスト/分まで無料

---

### Hugging Face API キーの取得

画像生成で使用します。

1. Hugging Face にアクセス：https://huggingface.co/

2. 「Sign Up」からアカウント作成（GitHubアカウントでも可）

3. 右上のアイコン → 「Settings」をクリック

4. 左サイドバーの「Access Tokens」をクリック

5. 「New token」をクリック
   - **Name**: `pet-app`
   - **Role**: `Read` を選択

6. 「Generate a token」をクリック

7. トークンが表示されるのでコピーして保存

**無料枠**: 完全無料（制限あり）

---

### 環境変数への追加

`.env.local`ファイルに以下を追加：

```env
# AI API Keys
GOOGLE_GEMINI_API_KEY=ここにGemini APIキーを貼り付け
HUGGINGFACE_API_KEY=ここにHugging Face APIキーを貼り付け
```

**保存したら、必ず開発サーバーを再起動してください**（環境変数の反映のため）。

---

**準備が整いました！それでは、3つのAI機能を順番に実装していきましょう。**

## 機能1: 犬種/猫種自動識別

### 概要

ペット登録時に画像をアップロードすると、AIが自動的に犬種や猫種を判定し、Breedフィールドに自動入力します。

### 1-1. 必要なパッケージのインストール

```bash
npm install @google/generative-ai
```

### 1-2. APIルートの作成

`app/api/pets/identify/route.ts`を作成：

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // ファイルをBase64に変換
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString('base64')

    // Gemini API呼び出し
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = category === 'Dog'
      ? 'この犬の画像を見て、犬種を特定してください。犬種名のみを日本語で回答してください。複数の可能性がある場合は最も可能性の高いものを1つだけ答えてください。'
      : category === 'Cat'
      ? 'この猫の画像を見て、猫種を特定してください。猫種名のみを日本語で回答してください。複数の可能性がある場合は最も可能性の高いものを1つだけ答えてください。'
      : 'この動物の種類を特定してください。種類名のみを日本語で回答してください。'

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: file.type,
          data: base64Image,
        },
      },
      prompt,
    ])

    const breed = result.response.text().trim()

    return NextResponse.json({ breed })
  } catch (error) {
    console.error('Identify error:', error)
    return NextResponse.json(
      { error: 'Failed to identify breed' },
      { status: 500 }
    )
  }
}
```

### 1-3. フロントエンドの更新

`app/my-pets/new/page.tsx`を更新して、画像アップロード時に自動識別を実行します。

既存の`handleImageUpload`関数を以下のように変更：

```typescript
const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  setUploading(true)

  try {
    // 画像をアップロード
    const uploadFormData = new FormData()
    uploadFormData.append('file', file)

    const uploadResponse = await fetch('/api/pets/upload', {
      method: 'POST',
      headers: {
        'x-user-id': user.id,
      },
      body: uploadFormData,
    })

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload image')
    }

    const uploadData = await uploadResponse.json()
    setFormData((prev) => ({ ...prev, imageUrl: uploadData.imageUrl }))

    // カテゴリーが選択されている場合、品種を自動識別
    if (formData.category && (formData.category === 'Dog' || formData.category === 'Cat')) {
      setIdentifying(true)

      const identifyFormData = new FormData()
      identifyFormData.append('file', file)
      identifyFormData.append('category', formData.category)

      const identifyResponse = await fetch('/api/pets/identify', {
        method: 'POST',
        body: identifyFormData,
      })

      if (identifyResponse.ok) {
        const identifyData = await identifyResponse.json()
        setFormData((prev) => ({ ...prev, breed: identifyData.breed }))
      }

      setIdentifying(false)
    }
  } catch (error) {
    console.error('Upload error:', error)
    alert('Failed to upload image')
  } finally {
    setUploading(false)
  }
}
```

コンポーネントの先頭に状態を追加：

```typescript
const [identifying, setIdentifying] = useState(false)
```

Breedフィールドの下に識別中の表示を追加：

```typescript
{identifying && (
  <p className="text-sm text-blue-600">AIが品種を識別中...</p>
)}
```

### 1-4. 動作確認

1. ペット登録ページで「Category」を「Dog」または「Cat」に設定
2. ペットの画像をアップロード
3. 数秒後、「Breed」フィールドに自動的に品種名が入力される

---

### Gitでの進捗管理について

これから3つの機能を実装していきますが、**各機能が完成したらGitでコミット・プッシュ**することをお勧めします。

**なぜコミット・プッシュが重要？**

1. **進捗の記録**: どこまで実装したか記録できる
2. **バックアップ**: PCが故障してもGitHubにコードが残る
3. **間違えても安全**: 前の状態に戻せる
4. **実務の練習**: 実際の開発現場でも同じ流れ

それでは、機能1の進捗を保存しましょう。

---

### 1-5. Gitでコミット・プッシュ

**VSCodeのSource Control（左サイドバーのアイコン）を使う場合：**

1. 左サイドバーの「Source Control」アイコン（ブランチマーク）をクリック
2. 「Changes」の横の「+」ボタンで全ファイルをステージング
3. メッセージ欄に「Add pet breed identification feature」と入力
4. 「✓ Commit」ボタンをクリック
5. 「Sync Changes」または「Publish Branch」をクリック

**ターミナルを使う場合：**

```bash
git add .
git commit -m "Add pet breed identification feature"
git push
```

**これで機能1の実装が記録されました！**

---

**機能1の実装、お疲れ様でした！次は、ペットの健康相談ができるチャットボットを作りましょう。**

## 機能2: ヘルスケアアドバイザーチャットボット

### 概要

ペット詳細ページにチャットボタンを追加し、ペットの健康に関する質問ができます。

### 2-1. APIルートの作成

`app/api/pets/chat/route.ts`を作成：

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const { message, petInfo } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Gemini API呼び出し
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const systemPrompt = `あなたはペットの健康アドバイザーです。以下のペット情報を参考に、飼い主からの質問に親切に答えてください。

ペット情報：
- 名前: ${petInfo.name}
- 種類: ${petInfo.category}
- 品種: ${petInfo.breed || '不明'}
- 性別: ${petInfo.gender || '不明'}
- 年齢: ${petInfo.age || '不明'}

注意事項：
- 一般的なアドバイスのみを提供してください
- 緊急性が高い症状の場合は、必ず獣医に相談するよう促してください
- 診断や処方は行わないでください
- 優しく、わかりやすい言葉で説明してください`

    const result = await model.generateContent([
      systemPrompt,
      `質問: ${message}`,
    ])

    const response = result.response.text()

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Failed to get response' },
      { status: 500 }
    )
  }
}
```

### 2-2. チャットコンポーネントの作成

`components/pets/health-chat.tsx`を作成：

```typescript
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Send, X } from "lucide-react"

interface HealthChatProps {
  petInfo: {
    name: string
    category: string
    breed?: string
    gender?: string
    age?: number
  }
}

export function HealthChat({ petInfo }: HealthChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch('/api/pets/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          petInfo,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'エラーが発生しました。もう一度お試しください。' },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="fixed bottom-4 right-4">
        <MessageCircle className="mr-2 h-4 w-4" />
        健康相談
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[500px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>ヘルスケアアドバイザー</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.length === 0 && (
            <p className="text-sm text-gray-600">
              {petInfo.name}の健康について、何でもお聞きください！
            </p>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-100 ml-auto max-w-[80%]'
                  : 'bg-gray-100 mr-auto max-w-[80%]'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          ))}
          {loading && (
            <div className="bg-gray-100 p-3 rounded-lg mr-auto max-w-[80%]">
              <p className="text-sm">考え中...</p>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="質問を入力..."
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

### 2-3. ペット詳細ページへの追加

`app/my-pets/[id]/page.tsx`に以下を追加：

インポート：
```typescript
import { HealthChat } from "@/components/pets/health-chat"
```

return文の最後に追加：
```typescript
<HealthChat
  petInfo={{
    name: pet.name,
    category: pet.category,
    breed: pet.breed,
    gender: pet.gender,
    age: pet.birthday ? calculateAge(pet.birthday) : undefined,
  }}
/>
```

### 2-4. 動作確認

1. ペット詳細ページにアクセス
2. 右下に「健康相談」ボタンが表示される
3. クリックしてチャットウィンドウを開く
4. 質問を入力（例：「散歩の頻度はどのくらいがいいですか？」）
5. AIが回答を返す

### 2-5. Gitでコミット・プッシュ

機能が正常に動作したら、進捗を保存しましょう。

**VSCodeのSource Control（左サイドバーのアイコン）を使う場合：**

1. 左サイドバーの「Source Control」アイコン（ブランチマーク）をクリック
2. 「Changes」の横の「+」ボタンで全ファイルをステージング
3. メッセージ欄に「Add healthcare advisor chatbot feature」と入力
4. 「✓ Commit」ボタンをクリック
5. 「Sync Changes」または「Publish Branch」をクリック

**ターミナルを使う場合：**

```bash
git add .
git commit -m "Add healthcare advisor chatbot feature"
git push
```

**これで機能2の実装が記録されました！**

---

**機能2も完成しました！最後は、画像生成AIを使った楽しい機能を実装しましょう。**

## 機能3: 子供イメージ画像生成

### 概要

2匹のペットを選択して、その子供の姿をAIで生成します。

**使用モデル**: Stable Diffusion XL Base 1.0
- 高品質な1024x1024画像を生成
- 2つのペットの特徴を組み合わせたプロンプトから画像を生成

**⚠️ 注意**: 初回実行時はモデルの読み込みに20-30秒かかる場合があります。2回目以降はキャッシュされて高速になります。

### 3-1. APIルートの作成

`app/api/pets/generate-child/route.ts`を作成：

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.HUGGINGFACE_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const { parent1, parent2 } = await request.json()

    if (!parent1 || !parent2) {
      return NextResponse.json(
        { error: 'Two parents are required' },
        { status: 400 }
      )
    }

    // プロンプト生成
    const prompt = `A cute baby ${parent1.category.toLowerCase()} that is a mix between a ${parent1.breed || parent1.category} and a ${parent2.breed || parent2.category}, adorable, fluffy, high quality, professional photo`

    // Hugging Face Inference API呼び出し（SDXL Base 1.0）
    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            negative_prompt: 'ugly, deformed, low quality, blurry, distorted',
            num_inference_steps: 30,
            width: 1024,
            height: 1024,
          },
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to generate image')
    }

    // 画像データを取得
    const imageBuffer = await response.arrayBuffer()
    const base64Image = Buffer.from(imageBuffer).toString('base64')
    const imageUrl = `data:image/jpeg;base64,${base64Image}`

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json(
      { error: 'Failed to generate child image' },
      { status: 500 }
    )
  }
}
```

### 3-2. 画像生成ページの作成

`app/my-pets/generate/page.tsx`を作成：

```typescript
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/layout/navbar"
import { ArrowLeft, Sparkles } from "lucide-react"

interface Pet {
  id: string
  name: string
  category: string
  breed?: string
  imageUrl?: string
}

export default function GenerateChildPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [pets, setPets] = useState<Pet[]>([])
  const [parent1Id, setParent1Id] = useState<string>('')
  const [parent2Id, setParent2Id] = useState<string>('')
  const [generating, setGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    fetchPets(parsedUser.id)
  }, [router])

  const fetchPets = async (userId: string) => {
    try {
      const response = await fetch('/api/pets', {
        headers: {
          'x-user-id': userId,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch pets')
      }

      const data = await response.json()
      setPets(data.pets)
    } catch (error) {
      console.error('Fetch pets error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async () => {
    if (!parent1Id || !parent2Id) {
      alert('2匹のペットを選択してください')
      return
    }

    if (parent1Id === parent2Id) {
      alert('異なるペットを選択してください')
      return
    }

    const parent1 = pets.find((p) => p.id === parent1Id)
    const parent2 = pets.find((p) => p.id === parent2Id)

    setGenerating(true)
    setGeneratedImage(null)

    try {
      const response = await fetch('/api/pets/generate-child', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ parent1, parent2 }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate image')
      }

      const data = await response.json()
      setGeneratedImage(data.imageUrl)
    } catch (error) {
      console.error('Generate error:', error)
      alert('画像の生成に失敗しました')
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">読み込み中...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/my-pets">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ペット一覧に戻る
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5" />
              子供のイメージ画像を生成
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-gray-600">
              2匹のペットを選択すると、その子供の姿をAIが生成します。
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">親1を選択</label>
                <Select value={parent1Id} onValueChange={setParent1Id}>
                  <SelectTrigger>
                    <SelectValue placeholder="ペットを選択..." />
                  </SelectTrigger>
                  <SelectContent>
                    {pets.map((pet) => (
                      <SelectItem key={pet.id} value={pet.id}>
                        {pet.name} ({pet.breed || pet.category})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">親2を選択</label>
                <Select value={parent2Id} onValueChange={setParent2Id}>
                  <SelectTrigger>
                    <SelectValue placeholder="ペットを選択..." />
                  </SelectTrigger>
                  <SelectContent>
                    {pets.map((pet) => (
                      <SelectItem key={pet.id} value={pet.id}>
                        {pet.name} ({pet.breed || pet.category})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!parent1Id || !parent2Id || generating}
              className="w-full"
            >
              {generating ? '生成中...' : '子供の画像を生成'}
            </Button>

            {generatedImage && (
              <div className="space-y-2">
                <p className="text-sm font-medium">生成された画像:</p>
                <img
                  src={generatedImage}
                  alt="Generated child"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

### 3-3. ナビゲーションへの追加

`app/my-pets/page.tsx`に画像生成ページへのリンクを追加：

```typescript
<div className="flex justify-between items-center mb-8">
  <h1 className="text-3xl font-bold text-gray-900">My Pets</h1>
  <div className="flex gap-2">
    <Link href="/my-pets/generate">
      <Button variant="outline">
        <Sparkles className="mr-2 h-4 w-4" />
        子供を生成
      </Button>
    </Link>
    <Link href="/my-pets/new">
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add New Pet
      </Button>
    </Link>
  </div>
</div>
```

インポートを追加：
```typescript
import { Sparkles } from "lucide-react"
```

### 3-4. 動作確認

1. ペット一覧ページで「子供を生成」ボタンをクリック
2. 2匹のペットを選択
3. 「子供の画像を生成」をクリック
4. 数秒〜数十秒後、生成された画像が表示される

**注意事項**:
- **初回実行**: Stable Diffusion XLモデルの読み込みに20〜30秒かかります
- **2回目以降**: モデルがキャッシュされるため、5〜10秒程度で生成されます
- **画質**: 1024x1024の高解像度画像が生成されます（SD 2.1の512x512より高品質）
- **タイムアウト**: 60秒以上かかる場合はエラーになります（稀）

**トラブルシューティング**:
- モデル読み込み中（503エラー）の場合: 20-30秒待ってから再試行
- 画像が表示されない場合: ブラウザのコンソールでエラーを確認

### 3-5. Gitでコミット・プッシュ

機能が正常に動作したら、進捗を保存しましょう。

**VSCodeのSource Control（左サイドバーのアイコン）を使う場合：**

1. 左サイドバーの「Source Control」アイコン（ブランチマーク）をクリック
2. 「Changes」の横の「+」ボタンで全ファイルをステージング
3. メッセージ欄に「Add child image generation feature」と入力
4. 「✓ Commit」ボタンをクリック
5. 「Sync Changes」または「Publish Branch」をクリック

**ターミナルを使う場合：**

```bash
git add .
git commit -m "Add child image generation feature"
git push
```

**これで機能3の実装が記録されました！**

---

## まとめ

### 実装した機能

1. ✅ 犬種/猫種自動識別
2. ✅ ヘルスケアアドバイザーチャットボット
3. ✅ 子供イメージ画像生成

### 使用したAPI

- **Google Gemini API（Gemini 2.5 Flash）**: 画像認識、テキスト生成
  - 犬種/猫種自動識別
  - ヘルスケアチャットボット
- **Hugging Face Inference API（Stable Diffusion XL Base 1.0）**: 画像生成
  - 子供イメージ画像生成（1024x1024高解像度）

### 学んだこと

- AI APIの統合方法
- 画像データの扱い方
- チャットボットの実装
- 画像生成AIの活用

---

**3つのAI機能の実装、お疲れ様でした！🎉**

ここまでで基本的なAI統合の流れを体験しました。次のセクションでは、さらに多くの無料AIサービスを紹介します。自由演習の時間に、興味のある機能を追加してみましょう。

## 他に試せる無料AI API

ここまでGoogle GeminiとHugging Face APIを使用してきましたが、他にも無料枠で試せるAI APIがたくさんあります。自由演習の時間に、興味のあるAPIを試してみましょう。

### 1. OpenAI API

**提供元**: OpenAI
**公式サイト**: https://platform.openai.com/

#### できること
- **テキスト生成**: GPT-4o/GPT-4o-miniなど、高性能な言語モデル
- **画像生成**: DALL-E 3による高品質な画像生成
- **音声認識**: Whisperによる音声のテキスト化
- **テキスト読み上げ**: 自然な音声生成

#### 無料枠
- 初回登録時に$5分の無料クレジット（3ヶ月間有効）
- GPT-4o-miniは非常に低コスト（入力$0.15/1M tokens、出力$0.6/1M tokens）
- **注意**: クレジットカード登録が必要

#### ペットアプリでの活用例
- ヘルスケアチャットボットの代替実装（GPT-4oでより高度な会話）
- ペットの日記を音声で入力（Whisper API）
- 健康アドバイスを音声で読み上げ（TTS API）
- 「こんなペットが欲しい」という説明文から画像生成（DALL-E 3）

#### 参考リンク
- [OpenAI API ドキュメント](https://platform.openai.com/docs)
- [料金](https://openai.com/api/pricing/)

---

### 2. Anthropic Claude API

**提供元**: Anthropic
**公式サイト**: https://console.anthropic.com/

#### できること
- **高度な推論**: 複雑な質問への回答や分析
- **長文理解**: 最大200K tokens（約15万語）の文脈を理解
- **画像理解**: Claude 3.5 Sonnetで画像の詳細な分析が可能
- **コード生成**: プログラミング支援

#### 無料枠
- 初回登録時に$5分の無料クレジット
- Claude 3.5 Haikuは低コスト（入力$0.8/1M tokens、出力$4/1M tokens）
- **注意**: クレジットカード登録が必要

#### ペットアプリでの活用例
- より詳細な健康相談（複雑な症状の分析）
- ペットの写真から詳細な状態分析
- ペットの性格分析と飼育アドバイス
- 複数のペット情報を総合的に分析

#### 参考リンク
- [Claude API ドキュメント](https://docs.anthropic.com/)
- [料金](https://www.anthropic.com/pricing)

---

### 3. Replicate

**提供元**: Replicate
**公式サイト**: https://replicate.com/

#### できること
- **様々なAIモデルへの簡単アクセス**: Stable Diffusion、LLaMA、Whisperなど
- **画像生成**: 複数の画像生成モデル（Stable Diffusion、FLUX.1など）
- **画像編集**: 背景削除、高解像度化、スタイル変換
- **動画生成**: テキストから動画を生成

#### 無料枠
- 毎月無料で使える実行時間あり
- 従量課金制で使った分だけ支払い（モデルごとに料金が異なる）
- **注意**: クレジットカード登録が必要

#### ペットアプリでの活用例
- ペット写真の背景を自動削除（remove-bg）
- 古いペット写真を高解像度化（Real-ESRGAN）
- ペットのイラスト風画像生成（Stable Diffusion）
- ペットの動画生成（テキストから）

#### 参考リンク
- [Replicate モデル一覧](https://replicate.com/explore)
- [料金](https://replicate.com/pricing)

---

### 4. Stability AI (DreamStudio)

**提供元**: Stability AI
**公式サイト**: https://dreamstudio.ai/

#### できること
- **高品質な画像生成**: Stable Diffusion 3.5の最新モデル
- **画像編集**: 既存画像の一部を編集
- **スタイル変換**: 写真をアート風に変換
- **高解像度生成**: 詳細な画像を生成

#### 無料枠
- 初回登録時に25クレジット（約25〜100枚の画像生成）
- その後は従量課金
- **注意**: クレジットカード登録が必要

#### ペットアプリでの活用例
- より高品質な子供ペット画像の生成
- ペットのプロフィール画像をアート風に
- 「理想のペット」の画像生成
- ペット写真のスタイル変換（水彩画風、油絵風など）

#### 参考リンク
- [DreamStudio](https://dreamstudio.ai/)
- [Stable Diffusion ドキュメント](https://platform.stability.ai/docs)

---

### 5. AssemblyAI

**提供元**: AssemblyAI
**公式サイト**: https://www.assemblyai.com/

#### できること
- **音声認識**: 高精度な音声のテキスト化
- **話者識別**: 誰が話しているかを識別
- **要約**: 音声内容の自動要約
- **感情分析**: 音声から感情を分析

#### 無料枠
- 毎月100時間の無料文字起こし
- すべての機能が無料枠で利用可能
- **メリット**: クレジットカード登録不要（メールアドレスのみ）

#### ペットアプリでの活用例
- 獣医との診察内容を録音して自動記録
- ペットの観察記録を音声で入力
- ペットの鳴き声を録音して分析
- 音声でチャットボットと会話

#### 参考リンク
- [AssemblyAI ドキュメント](https://www.assemblyai.com/docs)
- [料金](https://www.assemblyai.com/pricing)

---

### 6. ElevenLabs

**提供元**: ElevenLabs
**公式サイト**: https://elevenlabs.io/

#### できること
- **自然な音声生成**: テキストから人間のような音声を生成
- **多言語対応**: 29言語に対応
- **音声クローン**: 自分の声を複製（有料プラン）
- **感情表現**: 声のトーンや感情を調整

#### 無料枠
- 毎月10,000文字分の音声生成
- 3つのカスタム音声まで作成可能
- **メリット**: クレジットカード登録不要（メールアドレスのみ）

#### ペットアプリでの活用例
- 健康アドバイスを音声で読み上げ
- ペットの情報を音声で案内
- チャットボットの回答を音声化
- 多言語でのペット情報提供

#### 参考リンク
- [ElevenLabs ドキュメント](https://elevenlabs.io/docs)
- [料金](https://elevenlabs.io/pricing)

---

### API選択のポイント

興味のあるAPIを試す際は、以下を確認しましょう：

1. **無料枠の範囲**: どこまで無料で使えるか
2. **APIキーの取得方法**: クレジットカード登録が必要か
3. **レート制限**: 1分間に何回リクエストできるか
4. **ドキュメントの充実度**: 日本語ドキュメントがあるか
5. **実装の難易度**: 初心者でも使いやすいか

### 実装のヒント

新しいAPIを試す際の基本的な流れ：

1. **APIキー取得**: 各サービスで登録してAPIキーを取得
2. **環境変数設定**: `.env.local`にAPIキーを追加
3. **APIルート作成**: `/app/api/新機能/route.ts`を作成
4. **フロントエンド実装**: 既存のページに機能を追加
5. **テスト**: 動作確認と改善

---

## 次のステップ：自由演習

以下のような機能を追加してみましょう：

1. **ペットの写真を複数枚登録できるようにする**
2. **ペットの健康記録を保存する機能**
3. **上記で紹介したAI APIを試す**（音声入力、音声読み上げ、高品質画像生成など）
4. **音声入力でチャットできるようにする**（Whisper API / AssemblyAI）
5. **生成した画像を保存できるようにする**

---

**実装お疲れ様でした！**
