# 🚀 デプロイ手順

このプロジェクトは **Vercel** でデプロイします。

## デプロイ方法

### 初回デプロイ（Web UI）

1. **https://vercel.com** にアクセス
2. GitHubアカウントでログイン
3. **Add New Project** をクリック
4. GitHubリポジトリ `wojp-corporate` を選択
5. 設定を確認（通常は自動検出されます）：
   - **Framework Preset**: `Vite`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `pnpm install`
6. **Deploy** をクリック

### 初回デプロイ（CLI）

```bash
# Vercel CLIをインストール
npm i -g vercel

# プロジェクトディレクトリに移動
cd wojp-corporate

# Vercelにログイン
vercel login

# デプロイ
vercel

# 本番環境にデプロイ
vercel --prod
```

## 自動デプロイ

GitHubにプッシュすると、自動的にVercelでデプロイされます。

```bash
git add .
git commit -m "変更内容"
git push
```

## 設定ファイル

- **`vercel.json`**: Vercelの設定（SPAルーティング、ビルド設定）
- **`vite.config.ts`**: Viteの設定（ビルド出力先: `dist/public`）

## 環境変数（必要に応じて）

Vercelダッシュボード → **Settings** → **Environment Variables** で設定：

| Key | Value | 用途 |
|-----|-------|------|
| `VITE_APP_ID` | (OAuth用アプリID) | OAuth認証 |
| `VITE_OAUTH_PORTAL_URL` | (OAuthポータルURL) | OAuth認証 |

## デプロイ後のURL

デプロイが成功すると、以下のようなURLが表示されます：

```
https://wojp-corporate.vercel.app
```

またはカスタムドメインを設定することも可能です。

## トラブルシューティング

### ビルドエラー

- Vercelのビルドログを確認
- `pnpm install` が正常に実行されているか確認
- `dist/public` ディレクトリが生成されているか確認

### 404エラー

- `vercel.json` が正しく設定されているか確認
- SPAルーティングが正しく動作しているか確認
