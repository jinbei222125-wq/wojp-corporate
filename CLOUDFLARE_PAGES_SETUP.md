# Cloudflare Pages 設定手順

## Cloudflare Pages ダッシュボードでの設定

### 1. プロジェクト作成後の設定

Cloudflare Pagesで「Select repository」から `wojp-corporate` を選択した後、以下の設定を行ってください：

### ビルド設定

- **Framework preset**: `Vite` を選択
- **Build command**: `pnpm install && pnpm build`
- **Build output directory**: `dist/public`
- **Root directory**: `/`（ルートディレクトリ）

### 環境変数（必要に応じて）

「Environment variables」タブで以下を設定：

**ビルド時（Build）:**
- `NODE_ENV`: `production`

**本番環境（Production）:**
- `VITE_APP_ID`: （OAuth用アプリID）
- `VITE_OAUTH_PORTAL_URL`: （OAuthポータルURL）
- その他必要な環境変数

### 2. デプロイ

設定を保存すると、自動的にデプロイが開始されます。

---

## 重要な注意事項

### ⚠️ Cloudflare Pagesは静的ファイルのみをホストします

このプロジェクトは **Express + Vite のフルスタックアプリ** ですが、Cloudflare Pagesでは以下が**動作しません**：

- ❌ Expressサーバー（`/api/trpc/*` エンドポイント）
- ❌ OAuth認証（`/api/oauth/callback`）
- ❌ データベース接続
- ❌ 管理画面のAPIアクセス

### 静的サイトとして動作するもの

- ✅ フロントエンド（Reactページ）
- ✅ クライアントサイドのルーティング
- ✅ 静的アセット（画像、CSS、JS）

### 解決策

**オプション1: Cloudflare Pages + Cloudflare Workers（推奨）**

1. Cloudflare Pagesでフロントエンドをホスト
2. Cloudflare Workers（Pages Functions）でAPIエンドポイントを実装
3. データベースは外部サービス（PlanetScale、Supabase等）を使用

**オプション2: Railway/Renderなどでフルスタックデプロイ**

- RailwayやRenderでExpressサーバーごとデプロイ
- バックエンドとフロントエンドが同じドメインで動作
- 詳しくは `DEPLOY.md` を参照

---

## 現在の状況（静的サイトとして）

Cloudflare Pagesでデプロイした場合：
- トップページ、About、Contact等の静的ページは表示されます
- ただし、APIエンドポイントが呼ばれるとエラーになります
- 管理画面（`/admin`）は動作しません（APIが必要なため）

もしフルスタックアプリとして動作させたい場合は、RailwayやRenderを使用することをお勧めします。
