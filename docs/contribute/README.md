---
title: 共建
description: "内容原则、参与方式、场景提交字段与 Bot 模板提交方式。"
eyebrow: CONTRIBUTE
verified: 2026-10-20
---

::: source
[docs.x.ai/grok-bot/overview](https://docs.x.ai/grok-bot/overview) · [docs.x.ai/grok-bot/bots](https://docs.x.ai/grok-bot/bots) · [docs.x.ai/grok-bot/get-started](https://docs.x.ai/grok-bot/get-started)
:::

本站是中文社区的 Grok Bot 实践手册。内容以官方文档为唯一事实来源，社区经验单独标注。

## 1. 三条原则

- 事实优先：每条结论都要能对上一条官方链接；页首的 `::: source` 列出用到的官方页面。
- 不写付费内容：不接付费代搭建、扫码送会员、源码反编译这类导流内容。
- 标明性质：官方文档、社区实践、个人实践要能分辨。个人做法写成「个人实践」，社区反馈给出出处。

## 2. 参与方式

1. Fork 仓库，从 main 切出分支。
2. 只改 Markdown 文件，即 `docs/` 下的页面。样式与组件改动请单独开 PR。
3. 本地预览：`pnpm install`，然后 `pnpm docs:dev`，默认 http://localhost:8080。
4. 提交前逐条自检：官方链接是否可打开、界面标签是否与文档一致、有没有出现未经核实的数字或功能、内部链接是否指向存在的页面。
5. 发 PR，描述里写清改了什么、依据哪一条官方文档。

## 3. 提交一个场景

场景库按固定字段收录，提交时附上这些信息：

| 字段 | 说明 |
| --- | --- |
| title | 一句话说清这个场景做什么 |
| scenario | 具体到输入、动作和产出 |
| sources | 用到的官方页面链接 |
| difficulty | 难度分级 |
| approval_required | 是否涉及发送、支付、删除或本地执行 |
| date | 记录日期 |

## 4. 提交一个 Bot 模板

Bot 模板馆里的每个 Bot 需要：

| 字段 | 说明 |
| --- | --- |
| name | Bot 名字 |
| role | 一句话角色 |
| job | 它负责的那件事 |
| bubble | 它的口头禅 |
| shareId | x.ai/bot 分享链接里的真实 id |

shareId 从 Bot 的分享链接里取：打开 **Share menu**，选 **Create template**，链接准备好后用 **Copy link**。分享链接可以公开，但链接暴露的是 Bot 的完整配置：不要把密钥、内部地址、客户数据放进去。

![导入模板：点导入会唤起桌面客户端](/tutorial/flow-import-template.jpg)

模板数据在 `docs/.vuepress/data/bots.ts`，新增时保持字段顺序一致。

## 5. 校对也是一种贡献

指出哪句描述与官方文档对不上、哪个界面标签写错了，都算。请在 PR 里写明对应的官方页面和段落。

延伸阅读： [关于本站](/about/) · [Bot 馆](/bots/)
