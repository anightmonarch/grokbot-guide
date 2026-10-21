---
title: 安装与登录
description: "Grok Bot 桌面端在 macOS、Windows、Linux 上的安装步骤，登录与首次引导流程，以及安装后的三项自检。"
eyebrow: START · 02
verified: 2026-10-20
requires: 需桌面 App
---

::: source
[docs.x.ai/grok-bot/get-started](https://docs.x.ai/grok-bot/get-started) · [docs.x.ai/grok-bot/overview](https://docs.x.ai/grok-bot/overview) · [docs.x.ai/grok-bot/troubleshooting](https://docs.x.ai/grok-bot/troubleshooting) · [docs.x.ai/grok-bot/mobile](https://docs.x.ai/grok-bot/mobile)
:::

桌面端是 Grok Bot 的主入口：安装、登录、首次引导都在这里完成。手机端是补充入口，见[手机端](/start/mobile/)。这一页按「开始之前 → 安装 → 登录 → 首次引导 → 自检」的顺序走一遍。

## 1. 开始之前

先确认这三样：

- 一个可用方案：付费个人 Cursor 方案或 Cursor Teams 方案，或者把 SuperGrok 订阅关联到 Cursor 账号。详见[订阅与资格](/start/plans/)。
- Grok Bot 桌面客户端（macOS、Windows 或 Linux），安装包从 [x.ai/bot](https://x.ai/bot) 下载。
- 一个你的第一个 Bot 能派上用场的应用或网站——安装和登录只是让你能进门，真正用起来要有一个具体去处。

Grok Bot 需要云端数据存储。使用 Legacy Privacy Mode 的账号，必须先把 Cursor 的数据设置改到受支持的状态，Grok Bot 才能启动。可以在 [Cursor privacy settings](https://cursor.com/dashboard/settings?openPrivacy=true) 里查看当前设置。

## 2. 安装

打开 [x.ai/bot](https://x.ai/bot)，选择与你的电脑对应的下载包。

### macOS

1. 选择 Apple silicon 或 Intel 下载包。
2. 打开下载的磁盘映像。
3. 把 **Grok Bot** 拖到 **Applications**。
4. 打开 Grok Bot。如果 macOS 询问是否打开，选择 **Open**。

![应用程序里的 Grok Bot](/tutorial/install-app-window.png)

*应用程序里的 Grok Bot*

### Windows

1. 选择 x64 或 Arm64 下载包。
2. 运行安装程序。
3. 从开始菜单打开 Grok Bot。

### Linux

Linux 版本随每个稳定版发布，在 [x.ai/bot](https://x.ai/bot) 的 **More downloads** 里获取。

1. 按发行版格式选择 x64 或 Arm64：Debian 与 Ubuntu 用 `.deb`，Fedora 与 RHEL 用 `.rpm`，其他发行版用 AppImage。
2. 用包管理器安装 `.deb` 或 `.rpm`，或给 AppImage 加执行权限后运行。
3. 从应用启动器打开 Grok Bot。

## 3. 确认架构

下错包是最常见的开头返工，先花十秒确认：

- macOS：打开 **Apple menu → About This Mac**，有 **Chip** 字段是 Apple silicon，有 **Processor** 字段是 Intel。
- Windows：打开 **Settings → System → About → System type**。
- Linux：在终端运行 `uname -m`，`x86_64` 是 x64，`aarch64` 是 Arm64。

## 4. 登录

1. 在欢迎页选择 **Sign in**。已经在应用里时，从 Settings 使用 **Sign In with Cursor**。
2. 在打开的浏览器窗口里完成身份验证。
3. 浏览器确认登录后，回到 Grok Bot。
4. 如果权限来自 SuperGrok 订阅，按提示关联：桌面上在 **Settings → Usage & Billing** 里用 **Link SuperGrok Heavy**，标签对应你账号适用的 SuperGrok 档位；手机上先选 **Link Grok Account**，再选 **Finished Linking? Refresh My Status**。

Grok Bot 使用你的 Cursor 账号。所在组织要求 SSO 时，走组织正常的登录流程。

::: example 手机端的登录入口
手机端欢迎页的按钮是 **Log In or Sign Up**，同样在浏览器里完成 Cursor 认证；新用户接着走首次引导和云电脑准备，老用户直接进已同步的 Bot 列表。
:::

![登录完成：侧栏与对话已可用](/tutorial/login-done.png)

*登录完成态。侧栏可见，对话可用。*

## 5. 登录不成功时

按官方排障的顺序来，从最不破坏状态的动作开始：

1. 保持 Grok Bot 打开，让浏览器里的认证流程跑完。
2. 确认浏览器显示 Cursor 登录成功。
3. 如果没有自动切回应用，手动切回去。
4. 欢迎页再选一次 **Sign in**；已经在应用里就从 Settings 用 **Sign In with Cursor**。
5. 确认你的账号确实有 Grok Bot 权限。

另外两种常见情况：

- 报错提到 Legacy Privacy Mode：说明账号用的数据模式不允许 Grok Bot 需要的存储。改 Cursor 账号的数据设置，或者联系组织管理员。
- 组织要求 SSO：完成组织本身的登录流程，不要改用另一个个人账号。

官方排障里有一条容易被忽略：Bot 的云端工作不会因为桌面端或手机端断开而停下来，所以登录卡住时先别急着重装。

## 6. 首次引导：Meet a future teammate

首次使用时，Grok Bot 会介绍 Bot、共享电脑和例程，然后询问你平时用哪些工具。这些回答只影响推荐的队友，不会连接或改动那些工具。电脑安装在后台进行，最后一步是 **Meet a future teammate**：

- 在这里选一个建议的队友，直接开始。
- 或选 **Create your own**，自己写一个：给一个简短的名字、一份主要职责、一段工作方式描述。

![首次引导三步：下载 → 登录 → Meet](/tutorial/onboarding-meet.png)

建 Bot 的与逐步写法见[创建第一个 Bot](/start/first-bot/)。

::: example 一个自己写的 Bot 描述
```text
名字：Piper
职责：产品表现排查
工作方式：用我们的可观测性工具调查产品表现问题，保留链接与截图，把证据和推测分开，
先给影响最大的一条，最后附一份简短总结。永远不要改生产配置。
```
:::

细节怎么写、什么时候该拆成多个 Bot，见[创建第一个 Bot](/start/first-bot/)。

## 7. 安装后验证

装完不等于能用。按这三步自检一遍：

1. **应用能打开**：启动 Grok Bot，界面正常渲染，macOS 首次打开时若弹确认，选 **Open**。启动后卡在 **Starting your computer** 或 **Updating your computer** 属正常，首次设置可能要几分钟，保持应用开着。
2. **登录成功**：欢迎页不再出现，侧边栏能看到 Bot 列表（暂时为空也正常，你还没有建 Bot）。若仍提示无权限，回到第 5 步。
3. **能打开一个 Bot 对话并发出一条消息**：随便新建一个 Bot，发一句「用五条要点总结我贴的这段文字」，能收到回复就算打通。对话里点开电脑视图，看到浏览器和终端界面，说明云电脑也准备就绪；必要时你还能在这里 **Take over**，亲手完成一次登录或人机验证。

如果云电脑那一步卡住：先从错误状态重试，再重启 Grok Bot，再检查应用更新，还不行就在 **Settings → Computer** 里选 **Update Bot's Computer**。

## 8. 更新

Grok Bot 会自动检查更新。也可以在 **Settings → Updates** 里用 **Check for Updates**，有更新就选 **Restart to Update**。

应用和云电脑是两次独立的更新：更新桌面应用不会重置云电脑；重建云电脑要走 **Settings → Computer** → **Update Bot's Computer**。

## 9. 手机端和其他设备

桌面端装好后，手机端可以单独装：

- iPhone 需要 iOS 18 或更新版本，iPad 需要 iPadOS 18 或更新版本，从 [App Store](https://apps.apple.com/app/id6794501026) 下载。
- Android 需要 9 或更新版本，从 [Google Play](https://play.google.com/store/apps/details?id=ai.x.grok.bot) 下载。

手机和电脑登录同一个账号，Bots、对话、例程、连接器和那台共享云电脑都是同一份。手机上适合做的事是发消息、听语音备忘、看结果、点审批，以及在 Bot 请求时接管云电脑；编辑例程的时间表与指令、跑 **Test run** 目前还需要桌面端。手机端的完整用法见[手机端](/start/mobile/)。

还可以更进一步：电脑端允许授权之后，手机可以远程操作这些电脑，让它们各自去跑任务，文件也能在机器之间搬动。这是个人实践做法，官方文档对多设备协同的描述以云电脑为主。

## 装好了吗

- 应用按你的系统架构装好，并且能正常启动。
- 登录完成，账号确认有 Grok Bot 权限；如果走 SuperGrok，已经完成关联。
- 首次引导走完，**Meet a future teammate** 这一步选好了人或写好了描述。
- 侧边栏能看到 Bot 列表，你能打开一个 Bot 对话并收到回复。
- 知道云电脑在后台准备完成，并能打开电脑视图。

## 下一步

[创建第一个 Bot](/start/first-bot/) — 建一个职责窄的 Bot，把规矩写进描述，然后给它第一单。

延伸阅读： [订阅与资格](/start/plans/) · [云电脑与接管](/start/computer/) · [新手坑点](/faq/pitfalls/)

