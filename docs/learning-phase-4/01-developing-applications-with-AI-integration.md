# AIを組み込んだアプリ開発

**Programming Boot Camp - Learning Phase 4**

---

## 本日の内容

### 学習目標
- ベースとなるペット管理アプリの理解
- AI APIを活用したアプリケーション開発の体験
- 実践的なAI機能の実装

### タイムライン（6時間）

| 時間 | 内容 |
|------|------|
| 30分 | イントロダクション・環境セットアップ |
| 1時間 | ベースアプリの説明と動作確認 |
| 3時間 | AI機能の実装（ハンズオン） |
| 30分 | 休憩 |
| 2時間 | 自由演習 |
| 30分 | 発表・まとめ |

---

## 今日作るもの

ペット管理アプリに以下の3つのAI機能を追加します：

1. **ペット画像から犬種/猫種を自動識別**
   - Google Gemini APIを使用
   - アップロードした画像を解析

2. **ヘルスケアアドバイザーチャットボット**
   - Google Gemini APIを使用
   - ペットの健康に関する質問に回答

3. **親ペットから子供のイメージ画像を生成**
   - Hugging Face Inference APIを使用
   - 2匹のペットを選択して子供の画像を生成

---

## セットアップ手順

### 前提条件

以下がインストールされていることを確認してください：

- **Node.js 18以上** - https://nodejs.org/
- **Git** - バージョン管理ツール
- **VS Code** - テキストエディタ（推奨）
- **Webブラウザ** - Chrome、Firefox、Safariなど

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

Supabaseは、データベースと認証機能を提供するサービスです（無料枠あり）。

#### 2-1. アカウント作成

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

5. **重要**: パスワードに特殊文字が含まれる場合：
   - `!` → `%21`
   - `@` → `%40`
   - `#` → `%23`

---

#### 2-4. Storageバケットの作成

画像を保存するための領域を作成します。

1. 左サイドバーの **Storage** をクリック

2. 「Create a new bucket」をクリック

3. 以下を入力：
   - **Name**: `pet-images`
   - **Public bucket**: チェックを入れる

4. 「Create bucket」をクリック

**アップロード用ポリシーの設定**

1. 作成した `pet-images` をクリック

2. 右上のアイコン → 「Policies」を選択

3. 「New Policy」→「Create a policy」をクリック

4. 以下を入力：
   - **Policy name**: `Allow authenticated users to upload`
   - **Allowed operation**: `INSERT` にチェック
   - **Target roles**: `authenticated`
   - **Policy definition**: 自動入力される

5. 「Save policy」をクリック

---

### ステップ3: 環境変数の設定

取得した認証情報をアプリに設定します。

#### 3-1. .env.localファイルの作成

プロジェクトのルートに`.env.local`ファイルを作成し、以下を入力：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=ここにProject URLを貼り付け
NEXT_PUBLIC_SUPABASE_ANON_KEY=ここにanon public keyを貼り付け
SUPABASE_SERVICE_ROLE_KEY=ここにservice_role keyを貼り付け

# Database
DATABASE_URL="ここにデータベース接続文字列を貼り付け"

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### 3-2. .envファイルの作成

プロジェクトのルートに`.env`ファイルを作成し、以下を入力：

```env
# Database (for Prisma)
DATABASE_URL="ここにデータベース接続文字列を貼り付け"
```

**設定例**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL="postgresql://postgres.xxxxx:pass%21word@db.abcdefghijk.supabase.co:5432/postgres"
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

### エラー1: npm installが失敗する

**解決方法**:
```bash
# Node.jsバージョン確認（18以上であること）
node --version

# キャッシュクリア
npm cache clean --force

# 再インストール
npm install
```

---

### エラー2: データベース接続エラー

**エラーメッセージ**:
```
Error: P1013: The provided database string is invalid
```

**原因**: DATABASE_URLの形式が間違っている

**解決方法**:
1. `.env`ファイルのDATABASE_URLを確認
2. パスワードの特殊文字をURLエンコード：
   - `!` → `%21`
   - `@` → `%40`
   - `#` → `%23`

---

### エラー3: 画像アップロードができない

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

### エラー4: ログインできない

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

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start

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

ベースアプリの動作確認が完了したら、次はAI機能を追加していきます：

1. **犬種/猫種自動識別機能** - Google Gemini APIの統合
2. **ヘルスケアアドバイザー** - AIチャットボットの実装
3. **画像生成機能** - Hugging Face APIの活用

準備ができたら、メンターに声をかけてください！

---

**頑張ってください！**
