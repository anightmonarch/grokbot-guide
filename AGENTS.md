# 项目约定

- 本项目为 VuePress 中文指南；站点源码在 `docs/.vuepress/`，教程正文在 `docs/` 各栏目。
- 本次工作仅对齐官方 Logo、头像与动画；用户追加授权放大导航 Logo、导航品牌标题字号及首页 Bot 头像，其余布局、字体、按钮和正文保持原样。
- 头像公共入口为 `theme/components/BotMark.vue`；官方资源与来源说明放在 `theme/botmark/`，静态图标放在 `public/`。
- 工作计划及验收记录放在 `scripts/`，不作为教程页面发布；临时下载、分析文件放在 `/tmp/`。
- 验证使用 `pnpm docs:build`，并以本地真实浏览器检查首页、Bot 馆、详情、场景及学习路线。
- 保留现有头像容器布局，按用户要求调整导航及首页头像尺寸；使用矢量图保证高清显示。每个头像独立播放，离屏暂停，卸载清理，支持减少动态效果。
- 不自动提交、推送或部署；不修改密钥、环境变量和发布配置。

## README 展示

- 用户授权美化仓库根 README，使用当前本地站点的真实截图；本次不调整站点界面。
- 首页全页截图放在 `docs/.vuepress/public/homepage-preview.png`，保留导航、完整 Bot 卡片和页尾，不含浏览器工具栏；首页视觉变化后按需更新。
- 验收检查图片尺寸、README 本地资源与站内链接、Git 差异；不自动提交或部署。

- README 横向预览使用 `public/homepage-banner.jpg`；六位 Bot 展示使用 `public/readme-bots.svg`，由现有头像引擎静止帧生成，配色与角色对应 `data/bots.ts`。整页截图保留为备用，不再嵌入 README。
