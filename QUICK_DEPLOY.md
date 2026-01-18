# クイックデプロイ手順

## Railway を使用して5分でデプロイ

### ステップ1: Railwayにアクセス
1. https://railway.app/ を開く
2. 「Login」→「Login with GitHub」でGitHubアカウントでサインアップ

### ステップ2: プロジェクトを作成
1. ダッシュボードで「New Project」をクリック
2. **「Deploy from GitHub repo」**を選択
3. `Mocomi/g1st` リポジトリを選択（権限を許可）

### ステップ3: 設定を変更
1. デプロイが開始されたら、サービスをクリック
2. **「Settings」タブ**を開く
3. **「Root Directory」**を設定：
   - 値: `中橋の脳内/owjp2/wojp-corporate`
4. **「Build Command」**を設定：
   - 値: `pnpm install && pnpm build`
5. **「Start Command」**を設定：
   - 値: `pnpm start`

### ステップ4: データベースを追加
1. Railwayプロジェクトで「New」→「Database」→「MySQL」をクリック
2. データベースが作成されたら、「Variables」タブを開く
3. `DATABASE_URL` の値をコピー

### ステップ5: 環境変数を設定
メインサービス（Web Service）の「Variables」タブで以下を追加：

**必須:**
- `DATABASE_URL`: ステップ4でコピーした値を貼り付け
- `NODE_ENV`: `production`

**オプション（後で設定可）:**
- `OAUTH_SERVER_URL`: OAuthサーバーのURL
- `JWT_SECRET`: ランダムな文字列（例: `openssl rand -hex 32`で生成）
- `OWNER_OPEN_ID`: 管理者のOpenID
- `VITE_APP_ID`: アプリケーションID
- `VITE_OAUTH_PORTAL_URL`: OAuthポータルのURL

### ステップ6: マイグレーション実行
1. サービス（Web Service）の「Deployments」タブを開く
2. 最新のデプロイをクリック
3. 「View Logs」でログを確認
4. 「Terminal」タブを開く（または「Settings」→「Connect」でSSH接続）
5. 以下を実行：
   ```bash
   pnpm db:push
   ```

### ステップ7: 公開URLを取得
1. サービスの「Settings」→「Networking」タブ
2. 「Generate Domain」をクリック
3. 表示されたURLが公開URLです（例: `wojp-corporate-production.up.railway.app`）

---

## 完了！

これでサイトが公開されました。公開URLからアクセスできます。

### 管理画面にアクセス
- 公開URL + `/admin` で管理画面にアクセスできます
- ただし、OAuth設定が必要です（未設定の場合は開発用バイパスは動作しません）

### 今後のデプロイ
GitHubにプッシュするだけで自動デプロイされます！

---

## トラブルシューティング

### ビルドエラーが出る場合
- Node.jsバージョンを確認（Railwayの「Settings」→「Deploy」で設定）
- 推奨: Node.js 18以上

### データベース接続エラー
- `DATABASE_URL` が正しく設定されているか確認
- マイグレーション（`pnpm db:push`）が実行されているか確認

### ページが表示されない
- ビルドが成功しているか確認（「Deployments」タブで確認）
- 静的ファイルが正しくビルドされているか確認（`dist/public/`にファイルがあるか）
