<div align="center">

<img src="docs/.vuepress/public/logo.svg" width="64" height="64" alt="GrokBot Guide" />

# GrokBot Guide

**Grok Bot 中文实践手册**

从第一个 Bot，到真正帮你把事做完。

[![MIT License](https://img.shields.io/badge/License-MIT-0A0A0A?style=flat-square)](LICENSE)
[![中文指南](https://img.shields.io/badge/指南-中文-0A0A0A?style=flat-square)](https://grokbotguide.pages.dev)

**[在线阅读 ↗](https://grokbotguide.pages.dev)** · [30 分钟入门](https://grokbotguide.pages.dev/paths/30min/) · [Bot 模板馆](https://grokbotguide.pages.dev/bots/) · [场景库](https://grokbotguide.pages.dev/scenarios/)

</div>

[![挑一位队友，立刻上岗：Grok Bot 中文指南首页实拍](docs/.vuepress/public/homepage-banner.jpg)](https://grokbotguide.pages.dev)

## 从这里开始

| 你想做什么 | 推荐入口 |
| --- | --- |
| 第一次使用，跑通一个任务 | [30 分钟入门](https://grokbotguide.pages.dev/paths/30min/) |
| 找一位能直接导入的队友 | [Bot 模板馆](https://grokbotguide.pages.dev/bots/) |
| 用 Bot 解决具体工作问题 | [场景实践](https://grokbotguide.pages.dev/scenarios/) |
| 学习技能、例程与多 Bot 协作 | [工作台](https://grokbotguide.pages.dev/workbench/) |

## 六位队友，各有分工

[![小夜·选题主编，码初·工程搭档，晨号·例程管家，批签·审批守门，拾纸·研究助理，账青·对账助手](docs/.vuepress/public/readme-bots.svg)](https://grokbotguide.pages.dev/bots/)

选题与周报、代码与 PR、每日晨报、外发审批、资料研究、CSV 对账。**[选一位队友 ↗](https://grokbotguide.pages.dev/bots/)**

## 本地开发

Node.js 22 · pnpm 10

```bash
pnpm install
pnpm docs:dev
```

打开 <http://localhost:8080>。

<details>
<summary>技术栈与构建</summary>

VuePress 2 · Vue 3 · Vite · TypeScript · 自定义主题

- 教程正文：`docs/` 各栏目
- 站点配置、数据与主题：`docs/.vuepress/`
- 构建：`pnpm docs:build`
- 构建产物：`docs/.vuepress/dist`

</details>

## 一起完善这份指南

欢迎校对教程、补充场景、贡献模板。产品说明附来源，个人实践单独标注。

[共建指南](docs/contribute/README.md) · [反馈问题](https://github.com/anightmonarch/grokbot-guide/issues) · [官方文档](https://docs.x.ai/grok-bot/overview)

---

<div align="center">

[MIT License](LICENSE) · 一宿君 & GrokBot Guide contributors

</div>
