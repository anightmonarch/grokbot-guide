---
title: 手机端
description: "Grok Bot 手机端的系统要求、桌面与手机的能力对照、邮件与 Slack 草稿卡、例程的暂停与恢复，以及必须在桌面端完成的事。"
eyebrow: START · 07
verified: 2026-10-20
---

::: source
[docs.x.ai/grok-bot/mobile](https://docs.x.ai/grok-bot/mobile) · [docs.x.ai/grok-bot/overview](https://docs.x.ai/grok-bot/overview) · [docs.x.ai/grok-bot/faq](https://docs.x.ai/grok-bot/faq) · [docs.x.ai/grok-bot/chat-and-collaboration](https://docs.x.ai/grok-bot/chat-and-collaboration)
:::

手机端连的是同一批 Bot、同一批对话、同一批例程、同一台云电脑。应用关掉，云端任务照常继续。它适合做三件事：把活派出去、看结果、点同意。

## 1. 要求与安装

- iPhone 需 iOS 18 或更高版本，iPad 需 iPadOS 18 或更高版本。
- Android 需 9 或更高版本。
- 需要联网，也需要可用方案，方案与桌面端一致，见[订阅与资格](/start/plans/)。

在 App Store 或 Google Play 下载 Grok Bot。首次打开选 **Log In or Sign Up**，在浏览器里完成 Cursor 身份验证后回到应用；如果权限来自 SuperGrok 订阅，按提示先选 **Link Grok Account**，在浏览器里完成关联，再选 **Finished Linking? Refresh My Status**。新用户可以走完首次引导、选一个 Bot，等共享电脑在后台设置好；老用户直接进入同步过来的 Bot 列表。

想第一时间知道 Bot 有结果、有提问或请求审批，就在 Bot 的设置里打开 **Notifications**，并允许系统通知。两处都得允许：设备权限和 Bot 的通知开关。

## 2. 桌面端与手机端的能力对照

| 事情 | 手机端 | 桌面端 |
| --- | --- | --- |
| 发文字、**Start dictation** 口述、**Start voice chat** 语音对话 | 可以 | 可以 |
| 播放 Bot 发来的语音备忘 | 可以 | 可以 |
| 拍照、选图片与文件、群内 @ 其他 Bot 或 @everyone、回线程、加表情 | 可以 | 可以 |
| 审批 Bot 的动作、回复问题 | 可以 | 可以 |
| 打开云电脑、观看、接管、**I'm done** 交回控制权 | 可以 | 可以 |
| 新建 Bot 与群聊；编辑 Bot 资料、管理群成员；置顶或隐藏对话；删除 Bot | 可以 | 可以 |
| 查看例程的排期、下次运行、说明与 **Run history** | 可以 | 可以 |
| 用 **Active** 暂停或恢复例程 | 可以 | 可以 |
| 搜索 **Messages**、**Bots**、**Group Chats**、**Files**、**Routines** | 可以 | 分类项以桌面端为准 |
| 编辑例程的时间表和说明 | 不可以 | 可以 |
| 给例程做 **Test run** | 不可以 | 可以 |
| **Teach a task** 录制示范流程 | 不可以 | 可以 |
| 部分高级设置 | 不可以 | 可以 |

一句话记法：手机上管「让它跑、看结果、点同意」，例程的改与测留给桌面端。

<div class="g-phones is-single">

![Grok Bot 手机端 Bot 列表：按分组折叠，未读有蓝点](/mobile/bot-list-groups.webp)

</div>
<p class="g-phones-cap">手机端 Bot 列表：分组、标签、未读和电脑端同步</p>

还有一层区别值得留意：本地执行是桌面端的能力，要在设置里打开、要逐次批准。手机上看得到 Bot 在本机做了什么、可以点同意，但它本身不会去改你手机上的东西。

## 3. 草稿卡：New Email / New Slack Message

当 Bot 准备好一封邮件或一条 Slack 消息时，对话里会出现一张可编辑的草稿卡：邮件是 **New Email**，Slack 是 **New Slack Message**。

卡上三个选择：

- **Send Email** / **Send Message** — 确认发出。
- **Discard** — 丢弃。

发之前看清楚收件人和正文。手机上的按钮是大写形式，桌面上对应的是 **Send email** 和 **Send message**，**Discard** 相同。



![手机草稿卡线框](/tutorial/mobile-draft-card.png)

## 4. 例程：查看、暂停与恢复

打开一个 Bot 的资料页就能看到它名下的例程。你可以查看排期、下次运行时间、说明和 **Run history**，用 **Active** 暂停或恢复某条例程，也可以从资料页删除例程。

暂停是手机端最实用的一个开关：某个数据源变了、某个流程暂时不该再跑，先在手机上把它按停，回到电脑前再恢复。

删除例程是立即生效且没有撤销的；删掉一个 Bot，它名下的例程也会一起消失。要停不要删的时候，就用 **Active**。

<div class="g-phones">

![Bot 资料页：编码、定时任务、资料库、电脑与通知开关](/mobile/bot-profile.webp)
![资料页里的定时任务列表，每条右侧是启用开关](/mobile/routines-list.webp)

</div>
<p class="g-phones-cap">左：Bot 资料页（通知开关也在这里）；右：点「定时任务」进入的例程列表</p>

## 5. 也能在手机上接管

从对话里打开电脑，你可以看浏览器或桌面上的动作、在需要密码、双重验证码或 CAPTCHA 时接管、查看当前屏幕，然后用 **I'm done** 把控制权交回去。屏幕是账号下所有 Bot 共用的那台云电脑。

<div class="g-phones is-single">

![手机上打开写作助理的电脑：横向显示云电脑桌面](/mobile/cloud-desktop-on-phone.webp)

</div>
<p class="g-phones-cap">手机上查看 Bot 的电脑，桌面横向铺在屏幕中间</p>

同样地，不要把密码或一次性验证码发进普通对话。

## 6. 顺手提两个细节

- iPhone 可以用系统分享面板把照片、文件、链接或文字送进某个对话：选 **Grok Bot**，选一个聊天，再选 **Attach**，内容会落到那个对话的输入框里，你可以补一句再发。Android 的分享面板目前只接受文本。
- 离开对话时草稿按对话分别保存，回到原处还在。

## 7. 手机上随手自检

- [ ] 能用 Cursor 账号登录，看到和电脑端一样的 Bot 列表。
- [ ] 给某个 Bot 发过一条消息并收到回复。
- [ ] 系统通知打开，Bot 的 **Notifications** 也打开。
- [ ] 打开过云电脑视图，知道它在哪一步等你接管。
- [ ] 例程的 **Run history** 看过了，暂停/恢复按钮按过一次。

## 下一步

- [创建第一个 Bot](/start/first-bot/) — 你的第一个 Bot 应该从哪个职责开始。
- [云电脑与接管](/start/computer/) — 手机上接管的那台共享电脑到底是什么边界。
- [安装与登录](/start/install/) — 桌面端还空着的话，从这里开始。

延伸阅读： [入门总览](/start/) · [本地执行](/start/local-exec/) · [常见问题](/faq/)

<!-- TODO: 截图：手机端草稿卡。 -->
