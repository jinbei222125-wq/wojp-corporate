# GitHub Pages 404エラー解決方法

## 問題の原因

**エラーメッセージ**: "For root URLs (like http://example.com/) you must provide an index.html file."

**原因**:
- GitHub Pagesの設定で `folder: / (root)` を指定している
- しかし、リポジトリのルート直下に `index.html` がない
- `index.html` は `client/index.html` にあり、ビルド成果物は `dist/public/` に出力される
- ルートディレクトリからは `index.html` が見つからないため404エラーになる

## 解決方法（2つの選択肢）

### ✅ 推奨: GitHub Actionsを使う（自動ビルド・デプロイ）

既に `.github/workflows/github-pages.yml` が作成されています。

**設定手順**:

1. GitHubリポジトリの **「Settings」→「Pages」** にアクセス
2. **「Source」**で **「GitHub Actions」** を選択
3. **「Save」**をクリック

**動作**:
- GitHubにプッシュすると自動的にビルドが実行される
- `pnpm build` で `dist/public/` にビルド
- 自動的にGitHub Pagesにデプロイされる

---

### ⚠️ 非推奨: ブランチから直接デプロイ（ビルド成果物をGitに含める必要あり）

もし「Deploy from a branch」を使いたい場合：

1. ローカルでビルドを実行：
   ```bash
   pnpm build
   ```

2. `dist/public/` の内容をGitにコミット・プッシュ

3. GitHub Pagesの設定：
   - Branch: `main`
   - Folder: `dist/public` ← ルートではなくここを指定

**注意**: `dist/` は通常 `.gitignore` に含まれているため、この方法は推奨しません。

---

## 推奨される設定

### GitHub Pages設定

- **Source**: `GitHub Actions` ← これを選択
- Branch/Folder: 選択不要（GitHub Actionsが自動処理）

### 動作の流れ

1. `main`ブランチにコードをプッシュ
2. `.github/workflows/github-pages.yml` が自動実行
3. `pnpm install && pnpm build` でビルド
4. `dist/public/` をGitHub Pagesに自動デプロイ
5. サイトが公開される

---

## 確認方法

1. **「Actions」タブ**でワークフローの実行状況を確認
2. 完了後、**「Settings」→「Pages」**で公開URLを確認
3. 通常は `https://jinbei222125-wq.github.io/wojp-corporate/` でアクセス可能

---

## まとめ

- ✅ **エラーの原因は正しい**: ルート直下に `index.html` がない
- ✅ **解決方法**: GitHub Pagesの設定を「GitHub Actions」に変更
- ✅ **自動化**: これにより、ビルドとデプロイが自動化される
