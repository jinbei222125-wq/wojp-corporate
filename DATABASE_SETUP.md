# データベース設定ガイド

このプロジェクトはMySQLデータベースを使用します。以下の手順でデータベースを設定してください。

## 1. MySQLのインストール確認

MySQLがインストールされているか確認します：

```bash
mysql --version
```

インストールされていない場合は、以下のコマンドでインストールできます（macOSの場合）：

```bash
brew install mysql
brew services start mysql
```

## 2. データベースの作成

MySQLに接続してデータベースを作成します：

```bash
mysql -u root -p
```

MySQLプロンプトで以下を実行：

```sql
CREATE DATABASE wojp_corporate CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

## 3. 環境変数の設定

プロジェクトルートの`.env`ファイルを編集して、データベース接続情報を設定します：

```env
# Database Configuration
# MySQL接続文字列の形式: mysql://ユーザー名:パスワード@ホスト:ポート/データベース名
DATABASE_URL=mysql://root:your_password@localhost:3306/wojp_corporate

# JWT Secret for session cookies
# 本番環境ではランダムな文字列を生成してください
JWT_SECRET=your-secret-key-here

# OAuth Configuration (開発環境ではオプション)
OAUTH_SERVER_URL=
VITE_APP_ID=
OWNER_OPEN_ID=

# Forge API Configuration (オプション)
BUILT_IN_FORGE_API_URL=
BUILT_IN_FORGE_API_KEY=
```

**重要**: `your_password`と`your-secret-key-here`を実際の値に置き換えてください。

## 4. データベースマイグレーションの実行

スキーマをデータベースに適用します：

```bash
pnpm db:push
```

このコマンドは以下を実行します：
- スキーマからマイグレーションファイルを生成
- データベースにマイグレーションを適用

## 5. 接続確認

サーバーを起動して、データベース接続が正常に動作するか確認します：

```bash
pnpm dev
```

サーバーのログにデータベース接続エラーが表示されなければ、設定は完了です。

## トラブルシューティング

### 接続エラーが発生する場合

1. MySQLが起動しているか確認：
   ```bash
   brew services list  # macOSの場合
   ```

2. データベース名、ユーザー名、パスワードが正しいか確認

3. ポート番号が正しいか確認（デフォルトは3306）

### マイグレーションエラーが発生する場合

既存のテーブルがある場合は、一度データベースを削除して再作成するか、マイグレーションファイルを確認してください。

```sql
DROP DATABASE wojp_corporate;
CREATE DATABASE wojp_corporate CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 開発用の簡単な設定

開発環境で簡単にテストする場合は、以下のような設定でも動作します：

```env
DATABASE_URL=mysql://root:@localhost:3306/wojp_corporate
JWT_SECRET=dev-secret-key
```

（パスワードが空の場合は`:`の後に何も書かない）

## NEWS 公開/非公開機能（isPublished）のマイグレーション

NEWS に「公開/非公開」を追加した場合は、以下でマイグレーションを適用してください。

```bash
pnpm db:push
```

または、マイグレーションのみ実行する場合：

```bash
drizzle-kit migrate
```

既存の NEWS は自動的に「公開」になります。
