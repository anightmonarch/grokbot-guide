---
title: Channels（渠道）
description: "邮件/Slack 草稿卡、@bot on X、Agent Email 概览；细控件以客户端与官方页为准。"
eyebrow: WORKBENCH · 渠道
verified: 2026-10-20
---

::: source
[docs.x.ai/grok-bot/chat-and-collaboration](https://docs.x.ai/grok-bot/chat-and-collaboration) · [docs.x.ai/grok-bot/mobile](https://docs.x.ai/grok-bot/mobile) · [docs.x.ai/grok-bot/tag-on-x](https://docs.x.ai/grok-bot/tag-on-x) · [docs.x.ai/grok-bot/teams-and-enterprises](https://docs.x.ai/grok-bot/teams-and-enterprises)
:::

「渠道」在本站指：Bot 经邮件、Slack、X 等与外部世界交接的入口。多数外发应先出**草稿卡**再等人点发送。本页讲工作台里怎么看懂这些入口；完整邮箱实操见场景[Bot 邮箱收验证码与草稿外发](/scenarios/agent-email/)，外发守门见[安全与审批](/workbench/security/)。

对话详情面板（点聊天标题旁名字，或桌面 `Cmd+Shift+I` / Windows·Linux `Ctrl+Alt+B`）里，除电脑预览与例程列表外，还可能出现 **Channels**——当有渠道类连接器可装或已接上时。细控件名以你客户端为准，本页不编造未见到的开关。

## 1. 邮件与 Slack 草稿卡

官方把「可编辑草稿」写成协作默认：Bot 拟好邮件或 Slack 消息后，对话里出现草稿卡；你核对收件人与正文，再选发送或丢弃。**人点发送之前，消息不会出去。**

### 桌面端

1. 在一对一对话里让 Bot 起草（例如「给某某写一封测试信，先出草稿」）。
2. 对话中出现可编辑草稿：核对收件人、主题、正文。
3. 选 **Send email** / **Send message**，或 **Discard**。

群聊有限制：官方说明审批请求、密钥与登录请求、以及邮件 / Slack **草稿不出现在群聊里**。真正要你点头的外发，回到与那个 Bot 的一对一对话。

### 手机端

手机与桌面共用同一批 Bot、对话与云电脑。Bot 拟好邮件或 Slack 时，对话可出现 **New Email** / **New Slack Message** 卡片；按钮文案为 **Send Email** / **Send Message**，或 **Discard**（以客户端为准）。见[手机端](/start/mobile/)。

![邮件草稿卡：收件人 / 主题 / 正文](/tutorial/draft-card-email.png)

### 和「连接器邮件」的关系

| 方式 | 身份 | 典型用途 |
| --- | --- | --- |
| **Connect apps** 里的 Gmail / Outlook 等 | 你的个人或工作邮箱 | 以你的名义写正式往来 |
| **Agent Email**（`mail.grokbot.com`） | Bot / 账号侧专属地址（若开放） | 注册第三方、收验证码、隔离私人邮箱 |

两者都可以「先草稿再发」。装连接器走[Connectors](/workbench/connectors/)；专属邮箱走下方 §3 与场景页。不要假设「装了邮件插件就可以自动群发」。

::: example 零风险草稿练习
```text
起草一封给【我的备用邮箱】的测试信，主题「渠道草稿练习」，正文三行即可。
只出草稿，不要发送。停下来等我在草稿卡上点 Discard 或 Send。
```
:::

## 2. Tag @bot on X

在 X 上发帖或回复里 **@bot**，可以把该帖交给你的 Grok Bot 当任务。@bot 在 X 上只回一句确认；真正的工作与结果留在 Grok Bot 应用里对应 Bot 的对话中。

### 前置条件（官方清单）

- Grok 账号已连接 X：在 grok.com 打开 **Settings → Account**，在 **𝕏 Account** 旁选 **Connect**。
- 同一账号具备 Grok Bot 访问，并已下载应用（见[安装与登录](/start/install/)）。
- 至少有一位**你自己的** Bot；别人分享给你的 Bot **不能**接 tagged 请求。
- X 账号所在地区支持 tagging（见下）。

X for Grok Bot 插件是**可选**的：装了之后 Bot 可搜帖、读时间线、看提及等；**不装也能**让 @bot 转发请求。公开只读搜索与登录插件的差别见[Connectors](/workbench/connectors/)。

### 地区限制

官方写明：多数国家可用；以下地区**尚未**开放——澳大利亚、英国、欧盟、冰岛、列支敦士登、挪威。判定依据是 X 账号登记的国家，与你当前所在地或 VPN **无关**。若账号只标了更宽区域（如「South Asia」）或没有国家，同样不可用；这些情况下 @bot **不回复**。

### @bot 回复分别是什么意思

| @bot 回复 | 含义 | 你做什么 |
| --- | --- | --- |
| 短句表示已把请求交给你的 Grok Bot | 主 Bot 已接到任务 | 打开 Grok Bot 跟进并审结果 |
| 「Sign up for Grok Bot…」一类 | 发帖所用 X 账号未连 Grok | 在 grok.com 连接 X，装好 Bot，再 tag |
| 「Grok Bot isn't set up yet…」一类 | 账号已连，但还没有你自己的 Bot | 新建 Bot 后再 tag |

### 何时会一直安静

常见原因：地区未开放；你在已有 @bot 的串里回复却**自己没 tag**；帖子同时 tag 了 **@grok**；帖子 / 被回复帖 / 引用帖含视频或 GIF；未通过内部审核；Grok Bot 未关联或用量用尽。本站不写用量数字——以客户端与官方 plans 页为准。

::: example 可跟做的 tag 任务
```text
@bot summarize this thread and draft key points for my Slack — do not send
```
:::

第一次 tagged 请求通过时，X 会通知你：tagged 请求会自动开工并消耗 Grok Bot 用量。之后在应用里审结果，外发仍走草稿卡。

## 3. Agent Email

团队文档里的 **Agent Email**：管理员在 Cursor dashboard 的 Grok Bot 页打开后，成员才能领取地址，Bot 才能用它读写邮件；关掉则邮件工具与相关例程停用。默认常为关。个人账号是否总能申请 `名字@mail.grokbot.com`、入口文案是否一致，以你客户端为准——详见场景页。

工作台视角只需记住：

1. 申请前让 Bot 查名字是否可用，并在确认卡上核对本地部分与完整地址。
2. 一账号通常只有一个地址、起名后不宜改（个人实践反馈；官方细项以客户端为准）。
3. 多个 Bot **共用**同一邮箱，不是「每 Bot 一个」。
4. 收验证码可以自动化；**外发仍必须草稿 + 人点发送**。

完整步骤、与连接器邮件对照表、描述里可粘贴的规矩，见[Bot 邮箱收验证码与草稿外发](/scenarios/agent-email/)。

::: todo
「对话详情 → Channels」各渠道面板的完整截图待补；本页先给地图，不编造未见到的开关名。
:::

## 4. 外发必须人点发送

::: approval
邮件、Slack、社媒帖等外发：Bot 可以准备草稿与证据；**点发送的人是你**。不要给宽泛的 **Always allow** 覆盖「发送任何外部消息」。在描述里写常驻禁令，并在 **Settings → General → Auto-review** 为 send 类动作保留窄的 **Ask first**。见[安全与审批](/workbench/security/)与场景[外发前审批守门](/scenarios/approval-gate/)。
:::

建议顺序：

1. 先用零外发任务练五要素（见[创建第一个窄职责 Bot](/start/first-bot/)）。
2. 再练「只出草稿、你点 Discard」。
3. 稳定后才在真实收件人上点 **Send**。
4. 需要重复时再存[技能](/workbench/skills/)；定时前先[例程 Test run](/workbench/routines/)。

## 5. 你要检查什么

- 草稿卡上的收件人、主题、正文是否与你意图一致；链接目标是否可信。
- 是否在**一对一**对话里审草稿（群聊不出草稿卡）。
- Tag @bot 前：X 是否已连、是否有自己的 Bot、地区是否开放、帖子是否含视频/GIF 或同时 @grok。
- Agent Email 与连接器邮件有没有搞混身份。
- Auto Review 是否仍为外发保留 **Ask first**，描述里是否有「先出草稿」常驻句。

## 常见坑

- 把「草稿出现了」当成「已经发出去了」——发出去之前必须你点发送。
- 在群聊里等审批卡或草稿卡——它们不会出现在那里。
- 地区不支持却反复 tag，误以为 Bot 坏了——先查官方地区列表。
- 把私人邮箱交给 Bot 去注册第三方站——优先评估 Agent Email 或测试站。
- 一上来定「每小时发 Slack 摘要」例程——先手动草稿跑通，再 Test run。

## 相关

- [安全与审批](/workbench/security/) · [手机端](/start/mobile/) · [Connectors](/workbench/connectors/)
- 场景：[agent-email](/scenarios/agent-email/) · [approval-gate](/scenarios/approval-gate/) · [tested-briefing](/scenarios/tested-briefing/)
- [多 Bot 协作](/workbench/multi-bot/) · [码初 / 批签等模板](/bots/)
