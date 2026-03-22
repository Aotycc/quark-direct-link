<!-- /home/user/quark-direct-link/README.md -->
# ⚡ 夸克网盘直链解析

通过 Cookie 获取夸克网盘文件并解析下载直链，部署在 Cloudflare Pages 上。

## 功能

- 🔑 Cookie 登录验证
- 📁 浏览网盘文件（支持文件夹导航）
- 📥 获取文件下载直链
- 🔗 解析分享链接
- 📋 一键复制链接
- 📱 响应式设计

## 部署到 Cloudflare Pages

### 方法：通过 GitHub 部署

1. Fork 或推送本项目到你的 GitHub 仓库
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
3. 进入 **Workers & Pages** → **Create application** → **Pages**
4. 选择 **Connect to Git**，选择你的 GitHub 仓库
5. 设置：
   - **Build command**: 留空（不需要构建）
   - **Build output directory**: `public`
6. 点击 **Save and Deploy**

部署完成后会得到一个 `*.pages.dev` 的域名。

## 本地开发

```bash
npm install
npm run dev
