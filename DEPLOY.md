# デプロイ手順

このサイトをインターネット上に公開する手順です。

## Railway を使用したデプロイ（推奨）

### 1. Railway アカウントの作成
1. https://railway.app/ にアクセス
2. GitHubアカウントでサインアップ

### 2. プロジェクトの作成
1. Railwayダッシュボードで「New Project」をクリック
2. 「Deploy from GitHub repo」を選択
3. `g1st` リポジトリを選択
4. 「中橋の脳内/owjp2/wojp-corporate」ディレクトリをルートとして設定

### 3. データベースの追加
1. Railwayプロジェクトで「New」→「Database」→「MySQL」を選択
2. データベースが作成されたら、「Variables」タブで `DATABASE_URL` を確認
3. メインサービスの「Variables」に `DATABASE_URL` を追加（データベースの「Connect」タブからコピー）

### 4. 環境変数の設定
プロジェクトの「Variables」タブで以下を設定：

**必須:**
- `DATABASE_URL`: MySQLデータベースの接続URL（RailwayのMySQLから自動生成されるものを使用）
- `NODE_ENV`: `production`
- `PORT`: Railwayが自動設定（変更不要）

**OAuth関連（後で設定可能）:**
- `OAUTH_SERVER_URL`: OAuthサーバーのURL
- `JWT_SECRET`: JWT署名用の秘密鍵（ランダムな文字列）
- `OWNER_OPEN_ID`: 管理者のOpenID（OAuth設定後）

**Vite環境変数（クライアント側）:**
- `VITE_APP_ID`: アプリケーションID
- `VITE_OAUTH_PORTAL_URL`: OAuthポータルのURL

### 5. マイグレーションの実行
デプロイ後、Railwayのコンソール（ターミナル）で以下を実行：
```bash
pnpm db:push
```

または、デプロイ時に自動実行する場合：
Railwayの「Deploy」→「Settings」→「Deploy」タブで：
- Build Command: `pnpm install && pnpm build && pnpm db:push`

### 6. デプロイ
1. GitHubにコードをプッシュすると自動デプロイされます
2. または、Railwayダッシュボードで「Deploy」をクリック

### 7. 公開URLの確認
1. デプロイ完了後、「Settings」→「Networking」タブ
2. 「Generate Domain」をクリックして公開URLを取得
3. または、カスタムドメインを設定可能

---

## Render を使用したデプロイ

### 1. Render アカウントの作成
1. https://render.com/ にアクセス
2. GitHubアカウントでサインアップ

### 2. 新しいWebサービスの作成
1. 「New」→「Web Service」
2. `g1st` リポジトリを選択
3. 設定:
   - **Name**: `wojp-corporate`
   - **Root Directory**: `中橋の脳内/owjp2/wojp-corporate`
   - **Environment**: `Node`
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `pnpm start`

### 3. データベースの追加
1. 「New」→「PostgreSQL」（または外部のMySQLサービスを使用）
2. 作成後、データベースの接続情報をコピー

### 4. 環境変数の設定
「Environment」タブで環境変数を設定（Railwayと同様）

---

## 注意事項

### 開発環境での管理者アクセス
本番環境では `?devAdmin=true` の開発用バイパスは動作しません。
OAuthを正しく設定するか、本番環境用の認証方法を実装してください。

### データベース
本番環境では必ず外部データベース（Railway/RenderのMySQL/PostgreSQL、またはPlanetScale等）を使用してください。

### 環境変数
`.env` ファイルはGitに含まれないため、デプロイ先の環境変数として設定する必要があります。

### 静的ファイル
`pnpm build` でビルドされた静的ファイルは `dist/public/` に出力され、本番環境で配信されます。

---

## トラブルシューティング

### ビルドエラー
- `pnpm install` が失敗する場合: Node.jsのバージョンを確認（推奨: 18以上）

### データベース接続エラー
- `DATABASE_URL` が正しく設定されているか確認
- データベースが起動しているか確認
- マイグレーションが実行されているか確認

### OAuthエラー
- OAuth関連の環境変数が設定されているか確認
- リダイレクトURLが正しく設定されているか確認
