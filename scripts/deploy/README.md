# 部署到 Cloudflare Pages（grokbotguide）

生产站点：<https://grokbotguide.pages.dev>，Pages 项目名固定为 `grokbotguide`（见 `config.mjs`，改成别的会直接报错；旧项目 `grokbot-guide` 已停用，不要往那里部署）。

## 方式 A：Direct Upload（无需本机 API Token）

```bash
pnpm docs:build
node scripts/deploy/prep.mjs                 # 1. 生成 .deploy/manifest.json 与 payload.json
# 2. 用 Cloudflare MCP execute 取上传令牌：
#    GET /accounts/{account_id}/pages/projects/grokbotguide/upload-token  → result.jwt
CF_UPLOAD_JWT=<jwt> node scripts/deploy/upload.mjs
node scripts/deploy/gen-create-deployment.mjs # 3. 生成 .deploy/create-deployment.js
# 4. 把 .deploy/create-deployment.js 的内容交给 Cloudflare MCP execute 运行 → 返回 deployment id / url
```

上传令牌是短期凭据，只放在环境变量里，不要写进文件或提交；`.deploy/` 已在 `.gitignore` 中。

## 方式 B：wrangler（本机有 `CLOUDFLARE_API_TOKEN` 时）

```bash
pnpm docs:build
npx wrangler pages deploy docs/.vuepress/dist --project-name grokbotguide --branch main
```

## 部署后自检

```bash
curl -s https://grokbotguide.pages.dev/ | grep -o 'assets/app-[^"]*\.js'
```
