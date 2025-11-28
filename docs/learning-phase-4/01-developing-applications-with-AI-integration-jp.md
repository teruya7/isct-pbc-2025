# AIを組み込んだアプリ開発

**Programming Boot Camp - Learning Phase 4**

---

## 本日の内容

### 学習目標
- AIを組み込んだアプリ開発を体験する
- 演習を通じてAI機能を自分で実装できるようになる

### タイムライン

| 時間 | 内容 |
|------|------|
| 10:00-10:30 | イントロダクション・環境セットアップ |
| 10:30-12:00 | ベースアプリの説明と動作確認 |
| 12:00-13:00 | お昼休憩 |
| 13:00-16:00 | AI機能の実装（ハンズオン） |
| 16:00-18:00 | 自由演習 |
| 18:00-19:00 | 発表・まとめ |

---

## イントロダクション

**実装に入る前に、まず基本的な考え方を理解しましょう。**


### アプリケーションにAIを組み込む意味

従来のアプリケーション開発では、プログラマーがロジックを一つ一つコードで書いていました。<br>
しかし、AIを組み込むことで、アプリケーションは**学習し、推測し、創造する**能力を持つようになります。

**例えば：**
- 📸 **従来**: 画像をアップロードして表示するだけ
- ✨ **AI**: 画像の内容を理解し、自動でタグ付けや分類を行う

- 💬 **従来**: よくある質問（FAQ）を表示するだけ
- ✨ **AI**: ユーザーの質問を理解し、文脈に応じた回答を生成

- 🎨 **従来**: 既存の画像を表示・編集するだけ
- ✨ **AI**: テキストや他の画像から新しい画像を創造

### なぜ今、AIなのか？

#### 1. AIが身近になった

以前は、AIを使うには高度な機械学習の知識や強力なコンピューターが必要でした。しかし今は：

- **APIで簡単に利用できる** - 数行のコードでAI機能を追加
- **無料枠が充実** - 学習や小規模なプロジェクトなら無料で使える
- **日本語対応** - 日本語での質問や回答が可能

#### 2. ユーザー体験が劇的に向上

AIを組み込むことで：

- **パーソナライズ**: 事前に決められたロジックではなくAIが対応することで、一人ひとりに最適化された体験を提供
- **自動化**: 複雑で面倒な作業を自動で処理
- **インテリジェント**: まるで人間のように理解し、ふるまう


### AIにできること・できないこと

#### ✅ AIができること

1. **画像認識・理解**
   - 物体、人物、場所の識別
   - 画像の内容説明
   - 品質チェック

2. **自然言語処理**
   - 質問への回答
   - 文章の要約
   - 翻訳
   - 感情分析

3. **コンテンツ生成**
   - 文章作成
   - 画像生成
   - 音楽生成
   - コード生成

4. **予測・推薦**
   - ユーザーの好みを学習
   - 最適な提案
   - 異常検知

#### ❌ AIが苦手なこと

1. **完璧な正確性が求められるタスク**
   - AIは時々間違える（ハルシネーション）
   - 重要な判断は人間が最終確認すべき

2. **リアルタイムの変化への対応**
   - 最新情報を常に持っているわけではない
   - 学習データの時点までの知識

3. **倫理的判断**
   - 善悪の判断
   - 文化的な配慮
   - プライバシーへの配慮

### 実際のアプリケーション例

#### 画像・動画AI

- **Google フォト**: AI画像認識で「犬」「猫」「食べ物」などを自動分類・検索
- **Adobe Firefly**: テキストから画像を生成（Photoshopに内蔵）
- **YouTube**: 自動字幕生成（音声認識AI）

#### テキスト・会話AI

- **ChatGPT**: 質問に対話形式で回答、文章作成
- **Gmail Smart Compose**: メール本文を自動生成・補完
- **Notion AI**: ページ要約、文章生成、翻訳

#### 音声AI

- **Google アシスタント / Siri**: 音声での操作・質問応答
- **Spotify DJ**: AIが音楽を選曲・紹介
- **Microsoft Copilot**: 音声でOfficeアプリを操作

#### レコメンデーション（推薦）

- **YouTube**: 視聴履歴から次の動画を推薦
- **Netflix**: 好みに合った番組・映画を推薦
- **Amazon**: 購入履歴から商品を提案


### 今日学ぶことの意義

#### 1. AI APIの使い方を体験

AIを使うのに、難しい専門知識は必要ありません。既存のAI APIを使えば、Webアプリ開発の知識だけでAI機能を追加できます。

#### 2. 実践的なスキル

今日実装する3つの機能は、実際のアプリでよく使われるものです：

- **画像認識**: ECサイトの商品検索、医療診断支援
- **チャットボット**: カスタマーサポート、教育アプリ
- **画像生成**: デザインツール、ゲーム、エンターテイメント

### AI APIを扱う上での注意点

#### 1. コストを意識する

- APIには利用制限や課金がある
- 無料枠の範囲内で使う方法を知る
- 本番環境では使用量を監視する

#### 2. プライバシーとセキュリティ

- ユーザーの個人情報をAI APIに送る際は注意

#### 3. ユーザー体験

- AIの処理には時間がかかる（ローディング表示などの工夫ができると良い）
- エラーハンドリングを適切に
- ユーザーが理解できる形で結果を提示

---
<br>

**AIの組み込みについて少しイメージができてきたかと思います。次は、実際に手を動かして実装していきましょう！まずは開発環境の準備から始めます。**

<br>

## プロジェクトの準備

このセクションでは、今回の講義で機能を追加していくペット管理アプリのベースのコードを取得します。

**第二回講義講義（Learning Phase 2）を受講済みかどうかで手順が異なります。**

### ケース1: 第二回講義を受講済みの方

すでにリポジトリをFork・Clone済みの場合は、最新のコードを取得するだけでOKです。

1. VSCodeで `isct-pbc-2025` フォルダを開く

2. ターミナルを開く（Terminal → New Terminal）

3. 最新のコードを取得：
```bash
git pull origin main
```

4. Learning Phase 4のプロジェクトディレクトリに移動：
```bash
cd apps/learning-phase-4/pet-management-app
```

5. 次の「セットアップ手順」に進んでください

---

### ケース2: 第二回講義を受講していない方

リポジトリを自分のGitHubアカウントにForkして、ローカルにCloneします。

#### GitHubでのFork

**Forkは、リポジトリのコピーを自分のGitHubアカウントに作成します。**

1. コースのリポジトリにアクセス：
   ```
   https://github.com/GuildWorks/isct-pbc-2025
   ```

2. 右上の **"Fork"** ボタンをクリック
   - これにより、あなたのGitHubアカウントにコピーが作成されます

3. "Create a new fork" ページが表示されます
   - **Owner**: あなたのユーザー名が選択されているはずです
   - **Repository name**: `isct-pbc-2025`（そのまま）
   - **Description**: （任意）
   - **Copy the main branch only**: ✅ チェックを入れたまま

4. **"Create fork"** をクリック

5. GitHubがForkを作成し、以下のURLにリダイレクトされます：
   ```
   https://github.com/YOUR_USERNAME/isct-pbc-2025
   ```

**これで、自由に変更できる自分専用のコピーができました！**

#### ForkしたリポジトリをCloneする

1. Forkしたリポジトリのページで、緑色の **"Code"** ボタンをクリック

2. HTTPS URLをコピー（以下のような形式）：
   ```
   https://github.com/YOUR_USERNAME/isct-pbc-2025.git
   ```

3. VSCodeのターミナルを開く

4. Forkしたリポジトリをクローン：
```bash
git clone https://github.com/YOUR_USERNAME/isct-pbc-2025.git
```

**`YOUR_USERNAME` は自分のGitHubユーザー名になります。**

これにより、Forkしたリポジトリがコンピューターにダウンロードされます。

5. VSCodeでクローンしたフォルダを開く
   - File → Open Folder → `isct-pbc-2025` を選択

6. "Yes, I trust the authors" を選択

#### プロジェクト構造

VSCodeで以下のような構造が表示されるはずです：

```
isct-pbc-2025/
├── apps/
│   ├── learning-phase-2/    # 第二回講義のアプリ
│   ├── learning-phase-4/    # 今日使用するアプリ
│   │   └── pet-management-app/
│   │       ├── app/
│   │       ├── components/
│   │       ├── lib/
│   │       ├── prisma/
│   │       ├── package.json
│   │       └── ...
│   └── ...
├── docs/                    # 講義資料
└── README.md
```

#### プロジェクトディレクトリに移動

ターミナルで、今日使用するアプリのディレクトリに移動します：

```bash
cd apps/learning-phase-4/pet-management-app
```

現在のディレクトリを確認：
```bash
pwd
```

`/apps/learning-phase-4/pet-management-app` で終わるパスが表示されればOKです。

---

## セットアップ手順

### 前提条件

以下がインストールされていること。第2回講義で実施済みです。

- **Node.js 18以上** - https://nodejs.org/
- **Git** - バージョン管理ツール
- **VS Code** - テキストエディタ

### ステップ1: プロジェクトのセットアップ

#### 1-1. 依存パッケージのインストール

ターミナルを開き、プロジェクトディレクトリに移動します：

```bash
cd apps/learning-phase-4/pet-management-app
```

依存パッケージをインストール：

```bash
npm install
```

**注意**: インストールには数分かかります。完了するまで待ちましょう。

---

### ステップ2: Supabaseのセットアップ

第二回講義でも紹介したSupabaseは、データベースと認証機能を提供するサービスです。無料枠を使うことができます。

#### 2-1. アカウント作成(第二回講義を受講していない方のみ)

1. ブラウザで https://supabase.com/ にアクセス

2. 「Start your project」をクリック

3. GitHubアカウントでサインイン（推奨）

#### 2-2. プロジェクト作成

1. ダッシュボードで「New Project」をクリック

2. 以下を入力：
   - **Name**: `pet-management-app`
   - **Database Password**: 強力なパスワードを設定（必ずメモ！）
   - **Region**: `Northeast Asia (Tokyo)` を選択
   - **Pricing Plan**: `Free` を選択

3. 「Create new project」をクリック

4. プロジェクトの準備を待つ（2〜3分）

---

#### 2-3. API認証情報の取得

**① Project URLとAPI Keysの取得**

1. 左サイドバーの **Settings** → **API** をクリック

2. 以下の3つの値をメモ：
   - **Project URL** (`URL`欄)
   - **anon public key** (`Project API keys`の`anon`の`public`)
   - **service_role key** (`Project API keys`の`service_role`の`secret` - 「Reveal」をクリック)

**② データベース接続文字列の取得**

1. **Settings** → **Database** をクリック

2. **Connection string**セクションで「URI」タブを選択

3. 表示されている接続文字列をコピー：
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@xxx.pooler.supabase.com:6543/postgres
   ```

4. `[YOUR-PASSWORD]`を実際のパスワードに置き換え

---

#### 2-4. Storageバケットの作成

画像を保存するための領域を作成します。

1. 左サイドバーの **Storage** をクリック

2. 「Create a new bucket」をクリック

3. 以下を入力：
   - **Name**: `pet-images`
   - **Public bucket**: チェックを入れる

4. 「Create bucket」をクリック

**ポリシーの設定**

画像のアップロードと表示のために、2つのポリシーを設定します。

**① アップロード用ポリシー**

1. 作成した `pet-images` をクリック

2. 右上のアイコン → 「Policies」を選択

3. 「New Policy」→「Create a policy」をクリック

4. 以下を入力：
   - **Policy name**: `Allow authenticated users to upload`
   - **Allowed operation**: `INSERT` にチェック
   - **Target roles**: `authenticated`
   - **Policy definition**: 自動入力される

5. 「Save policy」をクリック

**② 読み取り用ポリシー**

6. 再度「New Policy」→「Create a policy」をクリック

7. 以下を入力：
   - **Policy name**: `Allow public to read`
   - **Allowed operation**: `SELECT` にチェック
   - **Target roles**: `public`
   - **Policy definition**: 自動入力される

8. 「Save policy」をクリック

これで、認証ユーザーが画像をアップロードでき、誰でも画像を閲覧できるようになります。

---

### ステップ3: 環境変数の設定

取得した認証情報をアプリに設定します。

プロジェクトのルートに`.env.local`ファイルを作成し、以下を入力：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=ここにProject URLを貼り付け
NEXT_PUBLIC_SUPABASE_ANON_KEY=ここにanon public keyを貼り付け
SUPABASE_SERVICE_ROLE_KEY=ここにservice_role keyを貼り付け

# Database (Next.js & Prismaで使用)
DATABASE_URL="ここにデータベース接続文字列を貼り付け"

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**設定例** (`.env.local`):
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database (Next.js & Prismaで使用)
DATABASE_URL="postgresql://postgres.xxxxx:pass%21word@db.abcdefghijk.supabase.co:5432/postgres"

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### ステップ4: データベースのセットアップ

#### 4-1. Prismaクライアントの生成

```bash
npm run prisma:generate
```

成功メッセージ：
```
Generated Prisma Client
```

#### 4-2. データベースマイグレーション

データベースに「Pet」テーブルを作成：

```bash
npx prisma migrate dev --name init
```

成功メッセージ：
```
Your database is now in sync with your schema.
```

---

### ステップ5: 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 にアクセス

ペット管理アプリのトップページが表示されれば成功！

---

## 動作確認

以下の機能を順番に試してみましょう。

### 1. ユーザー登録
- 「Sign Up」からアカウント作成
- メールアドレスとパスワード（6文字以上）を入力

### 2. ログイン
- 作成したアカウントでログイン
- 「My Pets」ページに移動

### 3. ペット登録
- 「Add New Pet」をクリック
- 必要情報を入力（名前、種類は必須）
- 写真をアップロード（任意）
- 「Create Pet」をクリック

### 4. ペット一覧
- 登録したペットがカード形式で表示される

### 5. ペット詳細
- ペットカードをクリック
- 詳細情報（年齢など）が表示される

### 6. ペット編集
- 「Edit」ボタンから情報を変更
- 「Save Changes」で保存

### 7. ペット削除
- 「Delete」ボタンから削除
- 確認ダイアログで実行

---

## トラブルシューティング

### エラー例1: データベース接続エラー

**エラーメッセージ**:
```
Error: P1013: The provided database string is invalid
```

**原因**: DATABASE_URLの形式が間違っている

**解決方法**:
1. `.env`ファイルのDATABASE_URLを確認
2. パスワードに特殊文字が含まれる場合、URLエンコード(置換)が必要：
   - `!` → `%21`
   - `@` → `%40`
   - `#` → `%23`

---

### エラー例2: 画像アップロードができない

**エラーメッセージ**:
```
Failed to upload file
```

**原因**: Storageポリシーが未設定

**解決方法**:
1. Supabaseダッシュボード → Storage → pet-images → Policies
2. 「Allow authenticated users to upload」ポリシーが存在するか確認
3. なければステップ2-4を再実行

---

### エラー例3: ログインできない

**原因**: 環境変数の設定ミス

**解決方法**:
1. `.env.local`の以下を確認：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. 開発サーバーを再起動：
   ```bash
   # Ctrl+C で停止
   npm run dev
   ```

---

## ベースアプリの構成

### 技術スタック

| 技術 | 用途 |
|------|------|
| Next.js 14 | フロントエンドフレームワーク |
| TypeScript | 型安全な開発 |
| Tailwind CSS | スタイリング |
| shadcn-ui | UIコンポーネント |
| Prisma | ORMデータベースアクセス |
| Supabase | データベース・認証・ストレージ |

### ディレクトリ構造

```
pet-management-app/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 認証関連ページ
│   │   ├── login/
│   │   └── signup/
│   ├── api/               # APIエンドポイント
│   │   ├── auth/          # 認証API
│   │   └── pets/          # ペットCRUD API
│   ├── my-pets/           # ペット管理画面
│   │   ├── new/           # 新規登録
│   │   └── [id]/          # 詳細・編集
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # トップページ
├── components/            # Reactコンポーネント
│   ├── ui/                # shadcn-uiコンポーネント
│   └── layout/            # レイアウトコンポーネント
├── lib/                   # ユーティリティ
│   ├── prisma.ts          # Prismaクライアント
│   └── supabase.ts        # Supabase接続
├── prisma/
│   └── schema.prisma      # データベーススキーマ
└── docs/                  # ドキュメント
```

### データモデル

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

## 参考: 開発中によく使うコマンドまとめ

```bash
# 開発サーバー起動
npm run dev

# Prismaクライアント生成
npm run prisma:generate

# データベースマイグレーション
npm run prisma:migrate

# Prisma Studio（DB GUI）起動
npm run prisma:studio
```

---

## 参考資料

- Next.js Documentation: https://nextjs.org/docs
- Supabase Documentation: https://supabase.com/docs
- Prisma Documentation: https://www.prisma.io/docs
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com/

---

## 次のステップ

ベースアプリの動作確認が完了したら、次はAI機能を実装していきます：

1. **品種自動識別機能**（犬、猫、鳥、魚など全ペット対応）
2. **ヘルスケアアドバイザー**
3. **画像生成機能**

- **Next:** [AI機能の実装 →](02-ai-features-implementation-jp.md)
---