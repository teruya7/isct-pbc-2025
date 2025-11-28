# Developing Applications with AI Integration

**Programming Boot Camp - Learning Phase 4**

---

## Today's Agenda

### Learning Objectives
- Experience developing applications with AI integration
- Become able to implement AI features independently through hands-on exercises

### Timeline

| Time | Content |
|------|------|
| 10:00-10:30 | Introduction & Environment Setup |
| 10:30-12:00 | Base Application Explanation & Operation Check |
| 12:00-13:00 | Lunch Break |
| 13:00-16:00 | AI Feature Implementation (Hands-on) |
| 16:00-18:00 | Free Exercise |
| 18:00-19:00 | Presentation & Wrap-up |

---

## Introduction

**Before diving into implementation, let's first understand the basic concepts.**


### The Meaning of Integrating AI into Applications

In traditional application development, programmers wrote logic one by one in code.<br>
However, by integrating AI, applications gain the ability to **learn, infer, and create**.

**For example:**
- 📸 **Traditional**: Just upload and display images
- ✨ **AI**: Understand image content and automatically tag and categorize

- 💬 **Traditional**: Just display frequently asked questions (FAQ)
- ✨ **AI**: Understand user questions and generate context-appropriate responses

- 🎨 **Traditional**: Just display and edit existing images
- ✨ **AI**: Create new images from text or other images

### Why AI Now?

#### 1. AI Has Become Accessible

Previously, using AI required advanced machine learning knowledge and powerful computers. But now:

- **Easy to use via API** - Add AI features with just a few lines of code
- **Generous free tiers** - Can be used for free for learning and small-scale projects
- **Japanese support** - Capable of questions and answers in Japanese

#### 2. Dramatically Improved User Experience

By integrating AI:

- **Personalization**: AI responds instead of predetermined logic, providing an experience optimized for each individual
- **Automation**: Automatically processes complex and tedious tasks
- **Intelligence**: Understands and behaves like a human


### What AI Can and Cannot Do

#### ✅ What AI Can Do

1. **Image Recognition & Understanding**
   - Identification of objects, people, places
   - Image content description
   - Quality checking

2. **Natural Language Processing**
   - Answering questions
   - Text summarization
   - Translation
   - Sentiment analysis

3. **Content Generation**
   - Text creation
   - Image generation
   - Music generation
   - Code generation

4. **Prediction & Recommendation**
   - Learning user preferences
   - Optimal suggestions
   - Anomaly detection

#### ❌ What AI Struggles With

1. **Tasks Requiring Perfect Accuracy**
   - AI sometimes makes mistakes (hallucination)
   - Important decisions should have final human verification

2. **Adapting to Real-time Changes**
   - Doesn't always have the latest information
   - Knowledge up to the point of training data

3. **Ethical Judgments**
   - Moral judgments
   - Cultural considerations
   - Privacy considerations

### Real-world Application Examples

#### Image & Video AI

- **Google Photos**: Automatically categorizes and searches by "dog", "cat", "food", etc. with AI image recognition
- **Adobe Firefly**: Generates images from text (built into Photoshop)
- **YouTube**: Automatic caption generation (speech recognition AI)

#### Text & Conversation AI

- **ChatGPT**: Conversational answers to questions, text creation
- **Gmail Smart Compose**: Automatically generates and completes email content
- **Notion AI**: Page summarization, text generation, translation

#### Voice AI

- **Google Assistant / Siri**: Voice operation and question answering
- **Spotify DJ**: AI selects and introduces music
- **Microsoft Copilot**: Operates Office apps with voice

#### Recommendation

- **YouTube**: Recommends next videos based on viewing history
- **Netflix**: Recommends shows and movies matching preferences
- **Amazon**: Suggests products based on purchase history


### Significance of What We're Learning Today

#### 1. Experience Using AI APIs

You don't need difficult specialized knowledge to use AI. By using existing AI APIs, you can add AI features with just web application development knowledge.

#### 2. Practical Skills

The three features we're implementing today are commonly used in actual applications:

- **Image Recognition**: Product search for EC sites, medical diagnosis support
- **Chatbot**: Customer support, educational apps
- **Image Generation**: Design tools, games, entertainment

### Important Considerations When Working with AI APIs

#### 1. Be Cost-Conscious

- APIs have usage limits and charges
- Know how to use within the free tier
- Monitor usage in production environments

#### 2. Privacy and Security

- Be careful when sending user personal information to AI APIs

#### 3. User Experience

- AI processing takes time (good to provide loading displays, etc.)
- Handle errors appropriately
- Present results in a form users can understand

---
<br>

**You should now have a better understanding of AI integration. Next, let's get hands-on with actual implementation! Let's start by preparing the development environment.**

<br>

## Project Preparation

In this section, we'll obtain the base code for the pet management app where we'll be adding features during this lecture.

**The steps differ depending on whether you've already taken the second lecture (Learning Phase 2).**

### Case 1: For Those Who Have Taken the Second Lecture

If you've already forked and cloned the repository, you just need to get the latest code.

1. Open the `isct-pbc-2025` folder in VS Code

2. Open a terminal (Terminal → New Terminal)

3. Get the latest code:
```bash
git pull origin main
```

4. Navigate to the Learning Phase 4 project directory:
```bash
cd apps/learning-phase-4/pet-management-app
```

5. Proceed to the "Setup Steps" below

---

### Case 2: For Those Who Haven't Taken the Second Lecture

Fork the repository to your own GitHub account and clone it locally.

#### Forking on GitHub

**A fork creates a copy of the repository in your GitHub account.**

1. Access the course repository:
   ```
   https://github.com/GuildWorks/isct-pbc-2025
   ```

2. Click the **"Fork"** button in the upper right
   - This creates a copy in your GitHub account

3. The "Create a new fork" page is displayed
   - **Owner**: Your username should be selected
   - **Repository name**: `isct-pbc-2025` (leave as is)
   - **Description**: (optional)
   - **Copy the main branch only**: ✅ Leave checked

4. Click **"Create fork"**

5. GitHub creates the fork and redirects to the following URL:
   ```
   https://github.com/YOUR_USERNAME/isct-pbc-2025
   ```

**Now you have your own copy that you can modify freely!**

#### Clone Your Forked Repository

1. On your forked repository page, click the green **"Code"** button

2. Copy the HTTPS URL (format like this):
   ```
   https://github.com/YOUR_USERNAME/isct-pbc-2025.git
   ```

3. Open VS Code terminal

4. Clone your forked repository:
```bash
git clone https://github.com/YOUR_USERNAME/isct-pbc-2025.git
```

**`YOUR_USERNAME` will be your GitHub username.**

This downloads the forked repository to your computer.

5. Open the cloned folder in VS Code
   - File → Open Folder → Select `isct-pbc-2025`

6. Select "Yes, I trust the authors"

#### Project Structure

You should see the following structure in VS Code:

```
isct-pbc-2025/
├── apps/
│   ├── learning-phase-2/    # Second lecture app
│   ├── learning-phase-4/    # App we're using today
│   │   └── pet-management-app/
│   │       ├── app/
│   │       ├── components/
│   │       ├── lib/
│   │       ├── prisma/
│   │       ├── package.json
│   │       └── ...
│   └── ...
├── docs/                    # Lecture materials
└── README.md
```

#### Navigate to Project Directory

In the terminal, navigate to the app directory we're using today:

```bash
cd apps/learning-phase-4/pet-management-app
```

Verify current directory:
```bash
pwd
```

If you see a path ending with `/apps/learning-phase-4/pet-management-app`, you're good.

---

## Setup Steps

### Prerequisites

The following should be installed. Already completed in the 2nd lecture.

- **Node.js 18 or higher** - https://nodejs.org/
- **Git** - Version control tool
- **VS Code** - Text editor

### Step 1: Project Setup

#### 1-1. Install Dependencies

Open a terminal and navigate to the project directory:

```bash
cd apps/learning-phase-4/pet-management-app
```

Install dependencies:

```bash
npm install
```

**Note**: Installation takes a few minutes. Wait until completion.

---

### Step 2: Supabase Setup

Supabase, introduced in the second lecture, is a service that provides database and authentication features. We can use the free tier.

#### 2-1. Create Account (Only for those who haven't taken the second lecture)

1. Access https://supabase.com/ in your browser

2. Click "Start your project"

3. Sign in with GitHub account (recommended)

#### 2-2. Create Project

1. Click "New Project" in the dashboard

2. Enter the following:
   - **Name**: `pet-management-app`
   - **Database Password**: Set a strong password (be sure to note it!)
   - **Region**: Select `Northeast Asia (Tokyo)`
   - **Pricing Plan**: Select `Free`

3. Click "Create new project"

4. Wait for project preparation (2-3 minutes)

---

#### 2-3. Obtain API Credentials

**① Get Project URL and API Keys**

1. Click **Settings** → **API** in the left sidebar

2. Note the following 3 values:
   - **Project URL** (`URL` field)
   - **anon public key** (`public` under `anon` in `Project API keys`)
   - **service_role key** (`secret` under `service_role` in `Project API keys` - click "Reveal")

**② Get Database Connection String**

1. Click **Settings** → **Database**

2. Select the "URI" tab in the **Connection string** section

3. Copy the displayed connection string:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@xxx.pooler.supabase.com:6543/postgres
   ```

4. Replace `[YOUR-PASSWORD]` with your actual password

---

#### 2-4. Create Storage Bucket

Create an area to store images.

1. Click **Storage** in the left sidebar

2. Click "Create a new bucket"

3. Enter the following:
   - **Name**: `pet-images`
   - **Public bucket**: Check the box

4. Click "Create bucket"

**Policy Configuration**

Set up two policies for image uploads and display.

**① Upload Policy**

1. Click the created `pet-images`

2. Icon in upper right → Select "Policies"

3. Click "New Policy" → "Create a policy"

4. Enter the following:
   - **Policy name**: `Allow authenticated users to upload`
   - **Allowed operation**: Check `INSERT`
   - **Target roles**: `authenticated`
   - **Policy definition**: Automatically filled

5. Click "Save policy"

**② Read Policy**

6. Again click "New Policy" → "Create a policy"

7. Enter the following:
   - **Policy name**: `Allow public to read`
   - **Allowed operation**: Check `SELECT`
   - **Target roles**: `public`
   - **Policy definition**: Automatically filled

8. Click "Save policy"

Now authenticated users can upload images and anyone can view them.

---

### Step 3: Environment Variables Configuration

Set the obtained credentials in the app.

Create a `.env.local` file in the project root and enter the following:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=paste Project URL here
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste anon public key here
SUPABASE_SERVICE_ROLE_KEY=paste service_role key here

# Database (Used by Next.js & Prisma)
DATABASE_URL="paste database connection string here"

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Configuration Example** (`.env.local`):
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database (Used by Next.js & Prisma)
DATABASE_URL="postgresql://postgres.xxxxx:pass%21word@db.abcdefghijk.supabase.co:5432/postgres"

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### Step 4: Database Setup

#### 4-1. Generate Prisma Client

```bash
npm run prisma:generate
```

Success message:
```
Generated Prisma Client
```

#### 4-2. Database Migration

Create the "Pet" table in the database:

```bash
npx prisma migrate dev --name init
```

Success message:
```
Your database is now in sync with your schema.
```

---

### Step 5: Start Development Server

```bash
npm run dev
```

Access http://localhost:3000 in your browser

If the pet management app top page displays, it's a success!

---

## Operation Verification

Try the following features in order.

### 1. User Registration
- Create an account from "Sign Up"
- Enter email address and password (6+ characters)

### 2. Login
- Login with the created account
- Navigate to "My Pets" page

### 3. Pet Registration
- Click "Add New Pet"
- Enter required information (name and category are required)
- Upload photo (optional)
- Click "Create Pet"

### 4. Pet List
- Registered pets are displayed in card format

### 5. Pet Details
- Click on a pet card
- Detailed information (age, etc.) is displayed

### 6. Pet Edit
- Change information from "Edit" button
- Save with "Save Changes"

### 7. Pet Delete
- Delete from "Delete" button
- Execute in confirmation dialog

---

## Troubleshooting

### Error Example 1: Database Connection Error

**Error Message**:
```
Error: P1013: The provided database string is invalid
```

**Cause**: DATABASE_URL format is incorrect

**Solution**:
1. Check DATABASE_URL in `.env` file
2. If password contains special characters, URL encoding (replacement) is needed:
   - `!` → `%21`
   - `@` → `%40`
   - `#` → `%23`

---

### Error Example 2: Image Upload Fails

**Error Message**:
```
Failed to upload file
```

**Cause**: Storage policy not set

**Solution**:
1. Supabase dashboard → Storage → pet-images → Policies
2. Check if "Allow authenticated users to upload" policy exists
3. If not, re-execute step 2-4

---

### Error Example 3: Cannot Login

**Cause**: Environment variable configuration error

**Solution**:
1. Check the following in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. Restart development server:
   ```bash
   # Stop with Ctrl+C
   npm run dev
   ```

---

## Base Application Structure

### Tech Stack

| Technology | Purpose |
|------|------|
| Next.js 14 | Frontend framework |
| TypeScript | Type-safe development |
| Tailwind CSS | Styling |
| shadcn-ui | UI components |
| Prisma | ORM database access |
| Supabase | Database, authentication, storage |

### Directory Structure

```
pet-management-app/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication related pages
│   │   ├── login/
│   │   └── signup/
│   ├── api/               # API endpoints
│   │   ├── auth/          # Authentication API
│   │   └── pets/          # Pet CRUD API
│   ├── my-pets/           # Pet management screens
│   │   ├── new/           # New registration
│   │   └── [id]/          # Details/Edit
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Top page
├── components/            # React components
│   ├── ui/                # shadcn-ui components
│   └── layout/            # Layout components
├── lib/                   # Utilities
│   ├── prisma.ts          # Prisma client
│   └── supabase.ts        # Supabase connection
├── prisma/
│   └── schema.prisma      # Database schema
└── docs/                  # Documentation
```

### Data Model

```prisma
model Pet {
  id        String   @id @default(uuid())
  ownerId   String
  name      String
  category  String
  breed     String?
  birthday  DateTime?
  gender    String?
  imageUrl  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## Reference: Commonly Used Commands During Development

```bash
# Start development server
npm run dev

# Generate Prisma client
npm run prisma:generate

# Database migration
npm run prisma:migrate

# Start Prisma Studio (DB GUI)
npm run prisma:studio
```

---

## Reference Materials

- Next.js Documentation: https://nextjs.org/docs
- Supabase Documentation: https://supabase.com/docs
- Prisma Documentation: https://www.prisma.io/docs
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com/

---

## Next Steps

Once you've verified the base app works, we'll implement AI features:

1. **Breed Auto-identification** (supports all pets: dogs, cats, birds, fish, etc.)
2. **Healthcare Advisor**
3. **Image Generation**

- **Next:** [AI Feature Implementation →](02-ai-features-implementation-en.md)
---
