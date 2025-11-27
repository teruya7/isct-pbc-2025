# AI機能の実装ガイド

**Programming Boot Camp - Learning Phase 4**

このガイドでは、ペット管理アプリに3つのAI機能を追加します。

---

## 実装する機能

1. **犬種/猫種自動識別** - 画像から品種を判定
2. **ヘルスケアアドバイザー** - AIチャットボット
3. **子供イメージ画像生成** - 2匹のペットから子供の画像を生成

---

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

---

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
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

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
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

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

---

## 機能3: 子供イメージ画像生成

### 概要

2匹のペットを選択して、その子供の姿をAIで生成します。

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

    // Hugging Face Inference API呼び出し
    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            negative_prompt: 'ugly, deformed, low quality, blurry',
            num_inference_steps: 30,
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

**注意**: 初回は Hugging Face のモデルが読み込まれるため、時間がかかる場合があります（20〜30秒程度）。

---

## まとめ

### 実装した機能

1. ✅ 犬種/猫種自動識別
2. ✅ ヘルスケアアドバイザーチャットボット
3. ✅ 子供イメージ画像生成

### 使用したAPI

- **Google Gemini API**: 画像認識、テキスト生成
- **Hugging Face Inference API**: 画像生成

### 学んだこと

- AI APIの統合方法
- 画像データの扱い方
- チャットボットの実装
- 画像生成AIの活用

---

## 次のステップ：自由演習

以下のような機能を追加してみましょう：

1. **ペットの写真を複数枚登録できるようにする**
2. **ペットの健康記録を保存する機能**
3. **他のAI APIを試す**（例：OpenAI、Claude）
4. **音声入力でチャットできるようにする**
5. **生成した画像を保存できるようにする**

---

**実装お疲れ様でした！**
