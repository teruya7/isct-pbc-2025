# ペット管理アプリ セットアップガイド

このガイドでは、ペット管理アプリを自分のPCで動作させるための手順を説明します。

## 📋 前提条件

以下がインストールされていることを確認してください：

- **Node.js 18以上** - [https://nodejs.org/](https://nodejs.org/) からダウンロード
- **Git** - バージョン管理ツール
- **テキストエディタ** - VS Codeを推奨
- **Webブラウザ** - Chrome、Firefox、Safariなど

## 🚀 セットアップ手順

### ステップ1: プロジェクトのダウンロードと依存パッケージのインストール

1. ターミナル（またはコマンドプロンプト）を開く

2. プロジェクトのディレクトリに移動
   ```bash
   cd pet-management-app
   ```

3. 依存パッケージをインストール
   ```bash
   npm install
   ```

   **注意**: インストールには数分かかる場合があります。完了するまで待ちましょう。

---

### ステップ2: Supabaseアカウントとプロジェクトの作成

Supabaseは、データベースと認証機能を提供するサービスです（無料枠あり）。

#### 2-1. アカウント作成

1. ブラウザで [https://supabase.com/](https://supabase.com/) にアクセス

2. 「Start your project」をクリック

3. GitHubアカウントでサインインするか、メールアドレスで登録
   - **推奨**: GitHubアカウントでのサインイン（より簡単）

#### 2-2. プロジェクト作成

1. ダッシュボードが表示されたら、「New Project」をクリック

2. 以下の情報を入力：
   - **Name**: `pet-management-app`（任意の名前でOK）
   - **Database Password**:
     - 強力なパスワードを設定してください
     - **重要**: このパスワードは後で使うので、必ずメモしておいてください！
   - **Region**: `Northeast Asia (Tokyo)` を選択（日本に最も近いサーバー）
   - **Pricing Plan**: `Free` を選択

3. 「Create new project」をクリック

4. プロジェクトの準備に **2〜3分** かかります
   - 「Setting up project...」と表示されている間は待ちましょう
   - 完了すると、プロジェクトのダッシュボードが表示されます

---

### ステップ3: API認証情報の取得

#### 3-1. Project URLとAPI Keysの取得

1. 左サイドバーの **⚙️ Settings** をクリック

2. **API** タブをクリック

3. 以下の3つの値をコピーしてメモ帳などに保存してください：

   **① Project URL**
   - `URL`の欄に表示されている値
   - 例: `https://xxxxxxxxxxxxx.supabase.co`

   **② anon public key**
   - `Project API keys`セクションの`anon`の`public`の値
   - 長い文字列（JWT形式）

   **③ service_role key**
   - `Project API keys`セクションの`service_role`の`secret`の値
   - 「Reveal」をクリックすると表示されます
   - **注意**: この値は秘密情報です。他人に見せないでください

#### 3-2. データベース接続文字列の取得

1. 左サイドバーの **⚙️ Settings** をクリック

2. **Database** タブをクリック

3. **Connection string**セクションで、「URI」タブを選択

4. 表示されている接続文字列をコピー
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@xxx.pooler.supabase.com:6543/postgres
   ```

5. `[YOUR-PASSWORD]`の部分を、ステップ2-2で設定したDatabase Passwordに置き換えます

6. **パスワードに特殊文字が含まれる場合の重要な注意点**:
   - パスワードに `!` が含まれる場合 → `%21` に置き換える
   - パスワードに `@` が含まれる場合 → `%40` に置き換える
   - パスワードに `#` が含まれる場合 → `%23` に置き換える

   **例**: パスワードが `abc!123` の場合
   ```
   postgresql://postgres.xxxxx:abc%21123@xxx.pooler.supabase.com:6543/postgres
   ```

---

### ステップ4: Storageバケットの作成（画像保存用）

#### 4-1. バケット作成

1. 左サイドバーの **Storage** をクリック

2. 「Create a new bucket」をクリック

3. 以下を入力：
   - **Name**: `pet-images`（この名前は変更しないでください）
   - **Public bucket**: ✅ チェックを入れる

4. 「Create bucket」をクリック

#### 4-2. アップロード用ポリシーの設定

画像をアップロードするために、アクセス権限を設定します。

1. 作成した `pet-images` バケットをクリック

2. 右上の **⚙️** アイコンをクリック → 「Policies」を選択

3. 「New Policy」をクリック

4. 一番下の「**Create a policy**」（カスタムポリシー）をクリック

5. 以下を入力：
   - **Policy name**: `Allow authenticated users to upload`
   - **Allowed operation**: `INSERT` に**チェック**
   - **Target roles**: `authenticated` を選択
   - **Policy definition**: 自動で `bucket_id = 'pet-images'` と入力されます

6. 「Review」→「Save policy」をクリック

これで画像のアップロードが可能になります。

---

### ステップ5: 環境変数の設定

取得した認証情報をアプリに設定します。

#### 5-1. .env.localファイルの作成

1. プロジェクトのルートディレクトリで、`.env.local`という名前のファイルを作成

2. 以下の内容をコピーして貼り付け：

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

3. 各項目に、ステップ3で取得した値を貼り付けます

#### 5-2. .envファイルの作成（Prisma用）

1. プロジェクトのルートディレクトリで、`.env`という名前のファイルを作成

2. 以下の内容をコピーして貼り付け：

   ```env
   # Database (for Prisma)
   DATABASE_URL="ここにデータベース接続文字列を貼り付け"
   ```

3. データベース接続文字列を貼り付けます

**設定例**（参考）:
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...（長い文字列）
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...（長い文字列）
DATABASE_URL="postgresql://postgres.xxxxx:password123@db.abcdefghijk.supabase.co:5432/postgres"
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### ステップ6: データベースのセットアップ

#### 6-1. Prismaクライアントの生成

ターミナルで以下のコマンドを実行：

```bash
npm run prisma:generate
```

成功すると、以下のようなメッセージが表示されます：
```
✔ Generated Prisma Client
```

#### 6-2. データベースマイグレーションの実行

データベースに「Pet」テーブルを作成します：

```bash
npm run prisma:migrate
```

成功すると、以下のようなメッセージが表示されます：
```
Your database is now in sync with your schema.
```

---

### ステップ7: 開発サーバーの起動

1. ターミナルで以下のコマンドを実行：

   ```bash
   npm run dev
   ```

2. 以下のようなメッセージが表示されれば成功です：

   ```
   ▲ Next.js 14.2.33
   - Local:        http://localhost:3000

   ✓ Ready in 2.6s
   ```

3. ブラウザで [http://localhost:3000](http://localhost:3000) にアクセス

4. ペット管理アプリのトップページが表示されれば成功です！

---

## 🧪 動作確認

以下の機能を順番に試してみましょう。

### 1. ユーザー登録

1. トップページで「Sign Up」をクリック

2. メールアドレスとパスワードを入力
   - パスワードは6文字以上

3. 「Sign Up」ボタンをクリック

4. ログインページにリダイレクトされます

### 2. ログイン

1. 登録したメールアドレスとパスワードでログイン

2. ログインに成功すると「My Pets」ページに移動します

### 3. ペット登録

1. 「Add New Pet」ボタンをクリック

2. 以下の情報を入力：
   - **Pet Name**: ペットの名前（必須）
   - **Category**: Dog、Cat、Birdなどから選択（必須）
   - **Breed**: 犬種・猫種など（任意）
   - **Birthday**: 誕生日（任意）
   - **Gender**: Male、Female、Unknown（任意）
   - **Photo**: ペットの写真（任意）

3. 「Create Pet」をクリック

4. 登録が成功すると、ペット一覧ページに戻ります

### 4. ペット一覧の確認

- 登録したペットがカード形式で表示されます
- ペット名、種類、写真が表示されます

### 5. ペット詳細の表示

1. ペットカードをクリック

2. 詳細情報が表示されます：
   - 名前、種類、性別
   - 誕生日と年齢（自動計算）
   - 写真

### 6. ペットの編集

1. 詳細ページで「Edit」ボタンをクリック

2. 情報を変更して「Save Changes」をクリック

3. 変更が反映されます

### 7. ペットの削除

1. 詳細ページで「Delete」ボタンをクリック

2. 確認ダイアログが表示されます

3. 「Delete」をクリックすると削除されます

---

## ❓ よくあるエラーと解決方法

### エラー1: `npm install`が失敗する

**症状**: パッケージのインストール中にエラーが発生

**解決方法**:
1. Node.jsのバージョンを確認
   ```bash
   node --version
   ```
   18以上であることを確認

2. npmのキャッシュをクリア
   ```bash
   npm cache clean --force
   ```

3. 再度インストール
   ```bash
   npm install
   ```

---

### エラー2: データベース接続エラー

**症状**: `prisma migrate`実行時に以下のエラー
```
Error: P1013: The provided database string is invalid
```

**原因**: DATABASE_URLの形式が間違っている

**解決方法**:
1. `.env`ファイルのDATABASE_URLを確認
2. パスワードに特殊文字が含まれている場合は、URLエンコードしてください：
   - `!` → `%21`
   - `@` → `%40`
   - `#` → `%23`

---

### エラー3: 画像アップロードができない

**症状**: 画像を選択すると「Failed to upload file」というエラー

**原因**: Storageのポリシー設定が不足

**解決方法**:
1. Supabaseダッシュボード → Storage → pet-images → Policies を確認
2. 「Allow authenticated users to upload」ポリシーが作成されているか確認
3. なければ、ステップ4-2を再度実行

---

### エラー4: ログインできない

**症状**: ログインボタンを押してもエラーになる

**原因**: 環境変数の設定ミス

**解決方法**:
1. `.env.local`ファイルの以下を確認：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. すべて正しくコピーされているか確認

3. ファイルを保存して、開発サーバーを再起動
   ```bash
   # Ctrl+C で停止
   npm run dev
   ```

---

### エラー5: 他人のペットが見える

**症状**: 自分以外のユーザーが登録したペットが表示される

**原因**: データベースに複数のユーザーのデータが混在している

**これは正常です**:
- 開発環境では、複数のユーザーが同じデータベースを共有する場合があります
- 本番環境では、各ユーザーは自分のペットのみ表示されます

---

## 🔧 開発コマンド一覧

```bash
# 開発サーバー起動
npm run dev

# ビルド（本番環境用）
npm run build

# 本番サーバー起動
npm start

# コードのリント
npm run lint

# Prismaクライアント生成
npm run prisma:generate

# データベースマイグレーション
npm run prisma:migrate

# Prisma Studio（データベースGUI）起動
npm run prisma:studio
```

---

## 📚 参考リンク

- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [Supabase公式ドキュメント](https://supabase.com/docs)
- [Prisma公式ドキュメント](https://www.prisma.io/docs)
- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/docs)

---

## 💡 ヒント

### データベースの中身を確認したい場合

Prisma Studioを使うと、GUIでデータベースの内容を確認・編集できます：

```bash
npm run prisma:studio
```

ブラウザで自動的に開き、Petテーブルのレコードを確認できます。

### 開発サーバーの停止方法

ターミナルで `Ctrl + C`（Macの場合は `Cmd + C`）を押す

---

**セットアップで困ったことがあれば、メンターに質問してください！**
