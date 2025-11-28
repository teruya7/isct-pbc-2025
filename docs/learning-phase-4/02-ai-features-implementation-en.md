# AI Feature Implementation

**Programming Boot Camp - Learning Phase 4**

Next, we'll add three AI features to the pet management app.

---

## Features to Implement

1. **Breed Auto-identification** - Identify breed from images
2. **Healthcare Advisor** - AI chatbot
3. **Child Image Generation** - Generate images of offspring from two pets

---

## Introduction to AI APIs We'll Use

### Google Gemini API

#### Overview

Google Gemini API is Google's latest **multimodal AI model**.

> **What is Multimodal AI?**
> "Modal" refers to types or formats of data. Multimodal AI can understand **multiple types of data** (text, images, video, audio, etc.) simultaneously.
>
> - **Traditional AI**: Processes only text, or only images
> - **Multimodal AI**: Can answer questions like "Tell me about this image" when shown an image
>
> Example: Image + Text → "What breed is this dog?" → "It's a Golden Retriever"

Gemini API can understand and process various types of data including text, images, and video.

#### Key Features

- **Image Understanding**: Detailed analysis and description of image content
- **Text Generation**: Natural, human-like text generation
- **Conversation**: Context-aware dialogue capabilities
- **Multilingual Support**: Supports over 100 languages including Japanese

#### Available Models

Google Gemini API has multiple models, but we'll use **Gemini 2.5 Flash** for this lecture.

##### Gemini 2.5 Flash (Used & Recommended for this Lecture) 🏆

**Model Name**: `gemini-2.5-flash`

- ⚡ **Fastest**: Extremely fast response times (optimal for real-time processing)
- 🎯 **High Accuracy**: Latest improvements enhance image recognition and text generation accuracy
- 💰 **Low Cost**: Most affordable with generous free tier
- 🖼️ **Multimodal**: Supports text, images, video, and audio
- 📝 **Long Context**: Up to 1 million tokens (about 750,000 words)

**Free Tier**:
- 15 RPM (Requests Per Minute) per month
- 1,500 RPD (Requests Per Day) per month
- Effectively over 100 requests per day for free

**Why Choose 2.5 Flash?**
- ✅ Optimal performance and cost balance for learning
- ✅ Sufficient accuracy for breed identification
- ✅ Ideal response speed for chatbots
- ✅ Large free tier, perfect for practice

##### Gemini 2.5 Pro (Reference)

**Model Name**: `gemini-2.5-pro`

- 🧠 **Highest Performance**: Handles more complex reasoning tasks, model with thinking processes
- 📚 **Ultra-long Context**: Up to 1 million tokens (2 million token support planned)
- 🎓 **High Accuracy**: Top performance in math and science benchmarks
- 💰 **High Cost**: Limited free tier (about 2 RPM per month)

**Use Case**: For complex medical diagnosis or detailed analysis needs. 2.5 Flash is sufficient for this lecture.

#### Pricing

- **Free Tier**: 15 RPM per month (Gemini 2.5 Flash)
- **Paid Plan**: Pay-as-you-go (check Google AI Studio for details)

#### Use Cases in This Lecture

1. **Breed Auto-identification**: Analyze images with Gemini 2.5 Flash to identify breeds (dogs, cats, birds, fish, etc.)
2. **Healthcare Advisor**: Answer pet health questions with Gemini 2.5 Flash

---

### Hugging Face Inference API

#### Overview

Hugging Face is a machine learning model sharing platform. The Inference API allows easy access to tens of thousands of published AI models.

#### Key Features

- **Image Generation**: Generate images from text (Stable Diffusion, SDXL, FLUX.1, etc.)
- **Text Generation**: Large language models (Llama, Mistral, etc.)
- **Speech Recognition**: Convert speech to text (Whisper, etc.)
- **Object Detection**: Detect objects in images (YOLO, etc.)
- **Image Editing**: Background removal, upscaling, etc.

#### Available Image Generation Models

Multiple image generation models are available on Hugging Face Inference API. We'll use **Stable Diffusion XL Base 1.0** for this lecture.

##### Stable Diffusion XL Base 1.0 (Recommended) 🏆

**Model Name**: `stabilityai/stable-diffusion-xl-base-1.0`

- 🎨 **High Quality**: Generates 1024x1024 high-resolution images
- 🎯 **High Accuracy**: Improved prompt understanding
- 📝 **Detailed Expression**: Handles more complex prompts
- 🆓 **Free**: Available for free with Inference API

**Why We Chose This**:
- ✅ Accurately expresses pet characteristics
- ✅ Available in free tier

##### Stable Diffusion 2.1 (Alternative Option)

**Model Name**: `stabilityai/stable-diffusion-2-1`

- ⚡ **Fast**: Faster processing than Stable Diffusion XL Base 1.0
- 💾 **Lightweight**: Smaller model size
- 📐 **512x512**: Standard resolution

**Use Case**: When fast generation is needed or to avoid model loading wait times

##### FLUX.1 Schnell (Latest & High Performance)

**Model Name**: `black-forest-labs/FLUX.1-schnell`

- ⭐ **Highest Quality**: Latest high-performance model
- 🎯 **Ultra-high Accuracy**: Photo-realistic images
- ⚡ **Fast**: schnell means "fast" in German

**Note**: Free tier may have long loading times

#### Pricing

##### Free Tier
- **Completely Free**: Only API key required
- **Limits**:
  - Request rate: About 30 requests/minute
  - Model loading: 20-30 seconds first time (cached afterwards)
  - Timeout: 60 seconds

##### Pro Plan ($9/month)
- **Fast**: Priority processing
- **Always Active**: Models kept loaded
- **More Requests**: Relaxed rate limits
- **Dedicated Endpoint**: Stable performance

#### Use Cases in This Lecture
- **Child Image Generation**: Generate images combining characteristics of two pets

---

## Why We Selected These APIs

### Why Did We Choose These APIs?

#### 1. Optimal for Learning

**Google Gemini API (Gemini 2.5 Flash)**
- ✅ **Generous Free Tier** - Up to 1,500 requests per day for free (sufficient for learning)
- ✅ **Multimodal** - Process both images and text with one API
- ✅ **Simple API** - Easy for beginners to understand
- ✅ **Fast Response** - Optimal speed for real-time processing
- ✅ **Excellent Japanese Support** - Natural Japanese questions and answers

**Hugging Face Inference API**
- ✅ **Free to Use** - Optimal for learning environment (specific limits undisclosed, but hundreds of requests per hour)
- ✅ **Rich Model Selection** - Choose from tens of thousands of models
- ✅ **Active Community** - Abundant problem-solving information
- ✅ **Open Source** - Learn about model mechanisms from published information

#### 2. High Practical Value

These APIs are widely used in actual development:

**Google Gemini API**
- Enterprise AI assistants
- Content generation tools
- Image analysis services

**Hugging Face**
- Startup prototype development
- Model evaluation in research institutions
- AI application development

### Comparison with Other Options

#### OpenAI API

**Advantages**:
- Very high performance
- Rich documentation

**Disadvantages**:
- ❌ **No Free Tier** - Immediate billing required
- ❌ **High Cost** - Heavy burden for learning
- ❌ **Phone Verification Required** - Need phone number for API key

➡️ Not suitable for learning environment

#### Claude API (Anthropic)

**Advantages**:
- High-performance language model
- Strong long text processing

**Disadvantages**:
- ❌ **Limited Free Tier**

➡️ Insufficient for our use case

### Summary: Our Selection

| Item | Google Gemini | Hugging Face |
|------|---------------|--------------|
| Free Tier | ⭐⭐⭐⭐ Generous | ⭐⭐⭐⭐⭐ Completely Free |
| Japanese Support | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐ Average |
| Setup | ⭐⭐⭐⭐⭐ Easy | ⭐⭐⭐⭐ Easy |
| Documentation | ⭐⭐⭐⭐ Rich | ⭐⭐⭐⭐ Rich |
| Learning Suitability | ⭐⭐⭐⭐⭐ Optimal | ⭐⭐⭐⭐⭐ Optimal |

Our selected APIs have **excellent balance of learning purpose, free tier, ease of use, and practicality**.

---

<br>

**Now let's implement AI features using these APIs! First, we'll obtain access keys for each API.**

<br>


## Preparation: Obtaining API Keys

### Obtaining Google Gemini API Key

Used for breed identification and chatbot.

1. Access Google AI Studio: https://aistudio.google.com/

2. Login with Google account

3. Click "Get API key" in the left sidebar

4. Click "Create API key"

5. Select an existing Google Cloud project or create new one

6. Copy and save the displayed API key

---

### Obtaining Hugging Face API Key

Used for image generation.

1. Access Hugging Face: https://huggingface.co/

2. Create account from "Sign Up" (or use GitHub account)

3. Click icon in upper right → Click "Settings"

4. Click "Access Tokens" in left sidebar

5. Click "Create new token"
   - **Token type**: Select `Read` (choose from Fine-grained, Read, Write)
   - **Token name**: Enter `pet-management-app`

6. Scroll to bottom and click "Create token"

7. Copy and save the displayed token

---

### Adding to Environment Variables

Add to `.env.local` file:

```env
# AI API Keys
GOOGLE_GEMINI_API_KEY=paste Gemini API key here
HUGGINGFACE_API_KEY=paste Hugging Face API key here
```

**After saving, be sure to restart the development server** (to apply environment variables).

---

**Preparation complete! Now let's implement the three AI features in order.**

## Feature 1: Breed Auto-identification

### Overview

When uploading an image during pet registration, AI automatically identifies the breed and auto-fills the Breed field. Supports all pet categories including dogs, cats, birds, and fish, with highest accuracy for dogs and cats.

### 1-1. Install Required Packages

```bash
npm install @google/generative-ai
```

### 1-2. Create API Route

Create `app/api/pets/identify/route.ts`:

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

    // Convert file to Base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString('base64')

    // Call Gemini API
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = category === 'Dog'
      ? 'Look at this dog image and identify the breed. Please respond with only the breed name in English. If there are multiple possibilities, answer with only the most likely one.'
      : category === 'Cat'
      ? 'Look at this cat image and identify the breed. Please respond with only the breed name in English. If there are multiple possibilities, answer with only the most likely one.'
      : 'Identify the species of this animal. Please respond with only the species name in English.'

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

### 1-3. Update Frontend

Update `app/my-pets/new/page.tsx` to run auto-identification when images are uploaded.

Modify the existing `handleImageUpload` function as follows:

```typescript
const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  setUploading(true)

  try {
    // Upload image
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

    // If category is selected, auto-identify breed
    if (formData.category) {
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

Add to `app/my-pets/new/page.tsx`:

```typescript
const [identifying, setIdentifying] = useState(false)
```

**Add Location:**
```typescript
export default function NewPetPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [identifying, setIdentifying] = useState(false) // ← Add here
  const [formData, setFormData] = useState({
    // ...
  })
```

Also add to `app/my-pets/new/page.tsx`:
```typescript
{identifying && (
  <p className="text-sm text-blue-600">AI is identifying breed...</p>
)}
```

**Add Location:**
```typescript
<div className="space-y-2">
  <Label htmlFor="breed">Breed</Label>
  <Input
    id="breed"
    value={formData.breed}
    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
  />
</div>

{/* ↓ Add here */}
{identifying && (
  <p className="text-sm text-blue-600">AI is identifying breed...</p>
)}

<div className="space-y-2">
  <Label htmlFor="birthday">Birthday</Label>
  {/* ... */}
```

### 1-4. Operation Verification

1. Select "Category" on pet registration page (Dog, Cat, Bird, Fish, etc.)
2. Upload pet image
3. After a few seconds, breed name is automatically entered in "Breed" field

> **Hint**: Try pets other than dogs and cats (birds, fish, etc.)! See how well AI can recognize them. Dogs and cats have the highest accuracy.

---

### About Progress Management with Git

When implementing features, we recommend **committing and pushing to Git after completing each feature**.

**Why Commit & Push is Important?**

1. **Record Progress**: Track how far you've implemented
2. **Backup**: Code remains on GitHub even if PC fails
3. **Safe Even if You Make Mistakes**: Can revert to previous state

Now let's save the progress for Feature 1.

---

### 1-5. Git Commit & Push

**Using Source Control in VS Code (left sidebar icon):**

1. Click "Source Control" icon (branch mark) in left sidebar
2. Stage all files with "+" button next to "Changes"
3. Enter "Add pet breed identification feature" in message field
4. Click "✓ Commit" button
5. Click "Sync Changes" or "Publish Branch"

**Using Terminal:**

```bash
git add .
git commit -m "Add pet breed identification feature"
git push
```

**Feature 1 implementation is now recorded!**

---

**Great job implementing Feature 1! Next, let's create a chatbot for pet health consultations.**

## Feature 2: Healthcare Advisor Chatbot

### Overview

Add a chat button to the pet detail page to ask questions about pet health.

### 2-1. Create API Route

Create `app/api/pets/chat/route.ts`:

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

    // Call Gemini API
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const systemPrompt = `You are a pet health advisor. Please kindly answer the owner's questions based on the following pet information.

Pet Information:
- Name: ${petInfo.name}
- Category: ${petInfo.category}
- Breed: ${petInfo.breed || 'Unknown'}
- Gender: ${petInfo.gender || 'Unknown'}
- Age: ${petInfo.age || 'Unknown'}

Important Notes:
- Provide only general advice
- If symptoms are urgent, always encourage consulting a veterinarian
- Do not provide diagnoses or prescriptions
- Explain in gentle, easy-to-understand language`

    const result = await model.generateContent([
      systemPrompt,
      `Question: ${message}`,
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

### 2-2. Create Chat Component

Create `components/pets/health-chat.tsx`:

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
        { role: 'assistant', content: 'An error occurred. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="fixed bottom-4 right-4">
        <MessageCircle className="mr-2 h-4 w-4" />
        Health Consultation
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[500px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Healthcare Advisor</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
          {messages.length === 0 && (
            <p className="text-sm text-gray-600">
              Ask me anything about {petInfo.name}'s health!
            </p>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg break-words ${
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
              <p className="text-sm">Thinking...</p>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Enter your question..."
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

### 2-3. Add to Pet Detail Page

Update `app/my-pets/[id]/page.tsx`.

**① Add Import Statement**

Add after existing imports at top of file (after `import { format } from "date-fns"`):

```typescript
import { Navbar } from "@/components/layout/navbar"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { HealthChat } from "@/components/pets/health-chat" // ← Add here
```

**② Add HealthChat Component**

Add above the last `</div>` in return statement:

```typescript
return (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* ... Existing Card elements, etc. ... */}
    </div>

    {/* ↓ Add here (outside container, inside min-h-screen) */}
    <HealthChat
      petInfo={{
        name: pet.name,
        category: pet.category,
        breed: pet.breed,
        gender: pet.gender,
        age: pet.birthday ? calculateAge(pet.birthday) : undefined,
      }}
    />
  </div>
)
```

### 2-4. Operation Verification

1. Access pet detail page
2. "Health Consultation" button appears in bottom right
3. Click to open chat window
4. Enter question (e.g., "How often should I walk them?")
5. AI returns answer

### 2-5. Git Commit & Push

Once the feature works properly, save your progress.

**Using Source Control in VS Code (left sidebar icon):**

1. Click "Source Control" icon (branch mark) in left sidebar
2. Stage all files with "+" button next to "Changes"
3. Enter "Add healthcare advisor chatbot feature" in message field
4. Click "✓ Commit" button
5. Click "Sync Changes" or "Publish Branch"

**Using Terminal:**

```bash
git add .
git commit -m "Add healthcare advisor chatbot feature"
git push
```

**Feature 2 implementation is now recorded!**

---

**Feature 2 complete! Finally, let's implement a fun feature using image generation AI.**

## Feature 3: Child Image Generation

### Overview

Select two pets and AI generates an image of their offspring.

**Features**:
- Same species (dog×dog, cat×cat, etc.): Generates realistic offspring
- **Different species (dog×cat, etc.)**: Generates fantasy "hybrid creatures" 🦄

> **About Chimera (Hybrid) Generation**
> In this app, selecting different species lets AI use its creativity to generate imaginary creatures with characteristics of both. Experience AI's creativity!

### 3-1. Create API Route

Create `app/api/pets/generate-child/route.ts`:

This feature **combines two AIs** to generate more accurate child images:
1. **Gemini API**: Analyzes visual characteristics from parent images
2. **Stable Diffusion XL**: Generates child image based on analysis

Additionally, when parents are different categories (dog×cat, etc.), generates as a hybrid creature with both characteristics.

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  try {
    const hfApiKey = process.env.HUGGINGFACE_API_KEY
    const geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY

    if (!hfApiKey || !geminiApiKey) {
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

    // Check if categories match
    const sameCategory = parent1.category === parent2.category

    // Extract features from parent images with Gemini API
    let prompt = sameCategory
      ? `A cute baby ${parent1.category.toLowerCase()}`
      : `A creature that is a mix of a ${parent1.category.toLowerCase()} and a ${parent2.category.toLowerCase()}`

    // If parents have images, analyze features with Gemini
    if (parent1.imageUrl && parent2.imageUrl) {
      try {
        const genAI = new GoogleGenerativeAI(geminiApiKey)
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

        // Fetch images
        const [img1Response, img2Response] = await Promise.all([
          fetch(parent1.imageUrl),
          fetch(parent2.imageUrl),
        ])

        const [img1Buffer, img2Buffer] = await Promise.all([
          img1Response.arrayBuffer(),
          img2Response.arrayBuffer(),
        ])

        const img1Base64 = Buffer.from(img1Buffer).toString('base64')
        const img2Base64 = Buffer.from(img2Buffer).toString('base64')

        // Analyze parent features with Gemini
        const analysisPrompt = `Look at these two pet images and describe their visual characteristics (fur color, patterns, eye color, body type, etc.) concisely in English.

Image 1: ${parent1.name} (${parent1.breed || parent1.category})
Image 2: ${parent2.name} (${parent2.breed || parent2.category})

Please respond in the following format:
Parent 1: [fur color], [pattern characteristics], [other features]
Parent 2: [fur color], [pattern characteristics], [other features]
Child (mix): [imagined appearance of child combining features of both]`

        const result = await model.generateContent([
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: img1Base64,
            },
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: img2Base64,
            },
          },
          analysisPrompt,
        ])

        const analysis = result.response.text()
        console.log('Gemini analysis:', analysis)

        // Extract Child part from analysis
        const childMatch = analysis.match(/Child.*?:(.*?)(?:\n|$)/i)
        if (childMatch) {
          const childDescription = childMatch[1].trim()
          // Add breed information
          const breed1 = parent1.breed || parent1.category
          const breed2 = parent2.breed || parent2.category
          const breedInfo = `mix of ${breed1} and ${breed2}`

          if (sameCategory) {
            prompt = `A cute baby ${parent1.category.toLowerCase()} (${breedInfo}), ${childDescription}, adorable, fluffy, high quality, professional photo, cute face, detailed fur texture`
          } else {
            prompt = `A creature that is a mix of a ${parent1.category.toLowerCase()} and a ${parent2.category.toLowerCase()} (${breedInfo}), ${childDescription}, adorable, high quality, professional photo, detailed fur texture`
          }
        }
      } catch (error) {
        console.error('Gemini analysis error:', error)
        // Fallback on error
        if (sameCategory) {
          prompt = `A cute baby ${parent1.category.toLowerCase()} that is a mix between a ${parent1.breed || parent1.category} and a ${parent2.breed || parent2.category}, adorable, fluffy, high quality, professional photo`
        } else {
          prompt = `A creature that is a mix of a ${parent1.category.toLowerCase()} and a ${parent2.category.toLowerCase()}, combining features of a ${parent1.breed || parent1.category} and a ${parent2.breed || parent2.category}, adorable, high quality, professional photo`
        }
      }
    } else {
      // Breed name based if no images
      if (sameCategory) {
        prompt = `A cute baby ${parent1.category.toLowerCase()} that is a mix between a ${parent1.breed || parent1.category} and a ${parent2.breed || parent2.category}, adorable, fluffy, high quality, professional photo`
      } else {
        prompt = `A creature that is a mix of a ${parent1.category.toLowerCase()} and a ${parent2.category.toLowerCase()}, combining features of a ${parent1.breed || parent1.category} and a ${parent2.breed || parent2.category}, adorable, high quality, professional photo`
      }
    }

    console.log('Final prompt:', prompt)

    // Call Hugging Face Inference API (SDXL Base 1.0)
    const response = await fetch(
      'https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hfApiKey}`,
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
      const errorText = await response.text()
      console.error('Hugging Face API error:', response.status, errorText)
      throw new Error(`Failed to generate image: ${response.status} - ${errorText}`)
    }

    // Get image data
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

**Implementation Points:**

1. **Image Analysis with Gemini**: Send parent images to Gemini to extract features like fur color, patterns, eye color
2. **Dynamic Prompt Generation**: Create prompt with specific visual features using Gemini's analysis
3. **Fallback Processing**: Use breed-name-based prompt when no images or on error
4. **Error Handling**: Output detailed error logs for easier problem identification

### 3-2. Create Image Generation Page

Create `app/my-pets/generate/page.tsx`:

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
      alert('Please select two pets')
      return
    }

    if (parent1Id === parent2Id) {
      alert('Please select different pets')
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
      alert('Failed to generate image')
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
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
            Back to Pet List
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Child Image
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-gray-600">
              Select two pets and AI will generate an image of their child.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Parent 1</label>
                <Select value={parent1Id} onValueChange={setParent1Id}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a pet..." />
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
                <label className="text-sm font-medium">Select Parent 2</label>
                <Select value={parent2Id} onValueChange={setParent2Id}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a pet..." />
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
              {generating ? 'Generating...' : 'Generate Child Image'}
            </Button>

            {generatedImage && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Generated Image:</p>
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

### 3-3. Add Navigation

Update `app/my-pets/page.tsx`.

**① Add Import**

Add `Sparkles` to imports at top of file (next to `Plus`):

```typescript
import { Plus } from "lucide-react"
```
↓
```typescript
import { Plus, Sparkles } from "lucide-react"
```

**② Change Button Layout**

Change the page title and button section (around lines 72-79) as follows:

**Before:**
```typescript
<div className="flex justify-between items-center mb-8">
  <h1 className="text-3xl font-bold text-gray-900">My Pets</h1>
  <Link href="/my-pets/new">
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Add New Pet
    </Button>
  </Link>
</div>
```

**After:**
```typescript
<div className="flex justify-between items-center mb-8">
  <h1 className="text-3xl font-bold text-gray-900">My Pets</h1>
  <div className="flex gap-2">
    <Link href="/my-pets/generate">
      <Button variant="outline">
        <Sparkles className="mr-2 h-4 w-4" />
        Generate Child
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

**Changes:**
- Wrap existing `Link` element in `<div className="flex gap-2">`
- Add new "Generate Child" button link inside
- Two buttons now display side by side

### 3-4. Operation Verification

1. Click "Generate Child" button on pet list page
2. Select two pets
   - **Same species** (dog×dog, cat×cat, etc.): Realistic child image
   - **Different species** (dog×cat, cat×bird, etc.): Fantasy hybrid creature 🦄
3. Click "Generate child image"
4. Generated image displays after a few seconds to tens of seconds

**Notes**:
- **First Execution**: Stable Diffusion XL model loading takes 20-30 seconds
- **2nd+ Executions**: Model is cached, generates in 5-10 seconds
- **Timeout**: Rarely, errors if takes over 60 seconds

### 3-5. Git Commit & Push

Once the feature works properly, save your progress.

**Using Source Control in VS Code (left sidebar icon):**

1. Click "Source Control" icon (branch mark) in left sidebar
2. Stage all files with "+" button next to "Changes"
3. Enter "Add child image generation feature" in message field
4. Click "✓ Commit" button
5. Click "Sync Changes" or "Publish Branch"

**Using Terminal:**

```bash
git add .
git commit -m "Add child image generation feature"
git push
```

**Feature 3 implementation is now recorded!**

---

## Summary

### Implemented Features

1. ✅ Breed Auto-identification
2. ✅ Healthcare Advisor Chatbot
3. ✅ Child Image Generation

### APIs Used

- **Google Gemini API (Gemini 2.5 Flash)**: Image recognition, text generation
  - Breed auto-identification
  - Healthcare chatbot
  - Parent feature extraction for child image generation
- **Hugging Face Inference API (Stable Diffusion XL Base 1.0)**: Image generation
  - Child image generation

### What We Learned

- How to integrate AI APIs
- Image data identification
- Chatbot implementation
- Utilizing image generation AI

---

**Great job implementing all three AI features! 🎉**

We've now experienced the basic flow of AI integration. The next section introduces more free AI services. Try adding features that interest you during the free exercise time.

## Other Free AI APIs to Try

We've been using Google Gemini and Hugging Face APIs, but here are AI APIs that can add **new features these can't achieve**.
Try APIs that interest you during the free exercise time.

---

### 1. AssemblyAI

**Provider**: AssemblyAI
**Official Site**: https://www.assemblyai.com/

#### Differences from Gemini/Hugging Face
- **Gemini**: No speech recognition functionality
- **Hugging Face**: Has speech recognition models but accuracy and setup are difficult
- **AssemblyAI**: High-accuracy speech recognition + easy + Japanese support

#### What It Can Do
- **Speech Recognition**: High-accuracy speech-to-text conversion (audio → text)
- **Speaker Diarization**: Identify who is speaking
- **Summarization**: Automatic audio content summarization
- **Sentiment Analysis**: Analyze emotions from audio

#### Free Tier
- 100 hours of free transcription per month
- All features available in free tier
- **Benefit**: No credit card required (email address only)

#### Reference Links
- [AssemblyAI Documentation](https://www.assemblyai.com/docs)
- [Pricing](https://www.assemblyai.com/pricing)

---

### 2. ElevenLabs

**Provider**: ElevenLabs
**Official Site**: https://elevenlabs.io/

#### Differences from Gemini/Hugging Face
- **Gemini**: No voice generation functionality
- **Hugging Face**: Has voice generation models but low quality and unnatural
- **ElevenLabs**: Very natural, human-like voice generation

#### What It Can Do
- **Natural Voice Generation**: Generate human-like voice from text (text → audio)
- **Multilingual Support**: Supports 29 languages (including Japanese)
- **Voice Cloning**: Clone your own voice (paid plan)
- **Emotional Expression**: Adjust voice tone and emotion

#### Free Tier
- 10,000 characters of voice generation per month
- Create up to 3 custom voices
- **Benefit**: No credit card required (email address only)

#### Reference Links
- [ElevenLabs Documentation](https://elevenlabs.io/docs)
- [Pricing](https://elevenlabs.io/pricing)

---

### 3. Replicate

**Provider**: Replicate
**Official Site**: https://replicate.com/

#### Differences from Gemini/Hugging Face
- **Gemini**: No video generation, background removal, or upscaling functionality
- **Hugging Face**: Has these models but complex setup
- **Replicate**: Easy API calls to access various advanced models

#### What It Can Do
- **Video Generation**: Generate videos from text
- **Background Removal**: Automatically remove backgrounds from images
- **Upscaling**: Convert old images to high quality
- **Style Transfer**: Convert photos to illustration style
- **Many More**: Access to over 1000 AI models

#### Free Tier
- Small amount of free credits per month
- Pay-as-you-go (pricing varies by model)
- **Note**: Credit card registration required

#### Reference Links
- [Replicate Model List](https://replicate.com/explore)
- [Pricing](https://replicate.com/pricing)

---

### 📊 Summary: API Features

| API | Functionality | Free Tier | Credit Card |
|-----|------|--------|--------|
| **AssemblyAI** | Audio → Text | 100 hours/month | Not Required |
| **ElevenLabs** | Text → Audio | 10,000 chars/month | Not Required |
| **Replicate** | Video generation, background removal, etc. | Small amount | Required |

---

### Implementation Hints

Basic flow when trying new APIs:

1. **Obtain API Key**: Register with each service and get API key
2. **Set Environment Variables**: Add API key to `.env.local`
   ```bash
   ASSEMBLYAI_API_KEY=your_key_here
   ELEVENLABS_API_KEY=your_key_here
   REPLICATE_API_TOKEN=your_key_here
   ```
3. **Create API Route**: Create `/app/api/new-feature/route.ts`
4. **Implement Frontend**: Add functionality to existing pages
5. **Test**: Verify operation and improve

---

## Free Exercise

Try adding AI features freely.
Also OK to develop new AI apps that aren't pet management.

A few people will present at the end.

---
