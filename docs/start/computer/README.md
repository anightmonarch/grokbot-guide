---
title: 云电脑与接管
description: "Bot 共用一台云电脑的工作模型、屏幕不等于安全边界、接管时机与步骤、/workspace 文件约定，以及电脑不可达时的恢复顺序表。"
eyebrow: START · 05
verified: 2026-10-20
---

::: source
[docs.x.ai/grok-bot/computer-and-apps](https://docs.x.ai/grok-bot/computer-and-apps) · [docs.x.ai/grok-bot/overview](https://docs.x.ai/grok-bot/overview) · [docs.x.ai/grok-bot/troubleshooting](https://docs.x.ai/grok-bot/troubleshooting) · [docs.x.ai/grok-bot/approvals-security-and-privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy) · [docs.x.ai/grok-bot/files-and-results](https://docs.x.ai/grok-bot/files-and-results) · [docs.x.ai/grok-bot/security](https://docs.x.ai/grok-bot/security)
:::

Bot 的工作发生在一台云端电脑上。这台电脑一直开着，有浏览器、文件系统和命令行；你合上笔记本、锁屏手机，它照样继续跑任务。理解它的边界，能解释大部分「它为什么能做、或不能做某件事」的疑问。

## 1. 一台电脑，所有 Bot 共用

你的账号下所有 Bot 用的是同一台云电脑：

- 浏览器 Cookie 和已登录会话共享
- 文件对每个 Bot 可见
- 命令行凭证共享
- 一个 Bot 可以接着另一个 Bot 保存的工作继续做

电脑分配给你的用户账号，不属于某个 Bot。官方对这条规则的表述很直接：不要把某个凭证或文件放上去，如果你不希望同账号下的其他 Bot 也能用到它。

每个 Bot 有自己的一块屏幕，可以并行使用浏览器和桌面工具，但同一时刻一个 Bot 的屏幕上只能跑一个 computer-use 任务。要紧的一句是：**这些屏幕是独立的工作面，不是独立的安全边界**。换句话说，多建几个 Bot 并不等于多了几道隔离。

## 2. 看着它干活

从对话里打开电脑，就能看到共享桌面：点击、输入、页面跳转和当前状态都会显示。你可以关掉预览让工作继续；关掉 Grok Bot 应用或合上笔记本，云端任务也不停。

![Grok Bot 对话内云电脑预览右侧「电脑」页签可见共享桌面](/tutorial/cloud-computer-preview.png)

右侧 **电脑** 页签下的预览窗就是共享桌面；各 Bot 屏幕分开，但文件与登录态仍共用。

这也是判断「它是不是卡住了」最快的办法：屏幕上停在登录框、人机验证，或者一个空白的加载页，你一眼就能看出来。

预览里的画面是实时的，但它只是「看」——你看到的是云端那台共享电脑。除非你为本地执行开了授权，否则它和你面前这台机器互不相干。

## 3. 什么时候接管

遇到这些情况，Bot 会请你自己上手：

- 密码或通行密钥
- 双重身份验证
- CAPTCHA
- 支付或身份核验
- 明确要求人工操作的网站

官方给的交接动作是：在对话里的请求上选 **Take over**，或者打开电脑后选 **Take control**；你只完成被卡住的那一步，然后选 **I'm done** 交回控制权，再告诉 Bot 从当前页面继续。

![电脑预览底部：Take control / I'm done](/tutorial/take-over-bar.png)


::: approval
不要把密码或一次性验证码贴在对话框里。密码、验证码、通行密钥都该由你亲手输入到页面中。
:::

对于支持的连接，Bot 可能弹出一个安全请求（secure secret request）。这时候把值填在那个请求里：它会被遮蔽，不进对话记录，也不会展示给模型。但它不是一个通用密码管理器，别指望它替你存东西。

如果你用硬件安全密钥（例如 YubiKey），Bot 的浏览器可以使用插在你电脑上的密钥，前提是 **Settings → General → Security Key** 下的 **Use hardware security keys** 是打开的。这个开关在 macOS 和 Windows 上默认开启，Linux 目前还不支持；每次使用都要你批准。

网页会话是持久的，通常不用每个任务都登录一次。因为浏览器共享，为一个 Bot 登录的会话对其他 Bot 同样可用。反过来也一样：某个服务不该再被用到时，记得在那台共享电脑上登出。

## 4. 文件放在 /workspace

那台电脑有一个共享工作区 `/workspace`。官方的建议是：让 Bot 把需要长期保留的项目文件放在那里，并使用清晰的项目文件夹。

几个配套的要点：

- Bot 可以读取其他 Bot 存在 `/workspace` 里的文件，所以交接用文件夹和清晰命名会可靠得多。
- 共享工作区适合放中间材料，但**最终结果仍然要出现在对话里**，或者给出明确的链接。
- 文件、浏览器状态和受支持的登录态，设计上能扛过正常的电脑更新与恢复；临时目录、手动装的包、没提交的应用状态则属于可随时替换的部分。重要结果要复制进 `/workspace`，或者直接附到对话里。

换句话说：`/workspace` 是交接的中转站，不是结果的存档处。

一个具体的用法：让 Bot 把中间产物按项目分文件夹放在 `/workspace`，最终报告既写进文件夹，也附到对话里。这样另一个 Bot 能接手继续做，你也能在对话里直接看到成品。

## 5. 电脑连不上时

按破坏性从小到大恢复。官方排障文档里的顺序是：

![设置 · 电脑页签](/settings/computer-tab.png)

| 顺序 | 做什么 | 在哪里 | 数据影响 |
| --- | --- | --- | --- |
| 1 | 选 **Retry**，或重新打开对话 | 错误状态 / 对话 | 无 |
| 2 | 重启 Grok Bot 应用 | 桌面端 | 无 |
| 3 | 选 **Recover computer**（确认框里叫 **Recover Grok Bot's Computer**） | 只在电脑不可达的状态里出现，Settings 里没有这个入口 | 保留持久文件和登录状态 |
| 4 | 选 **Update Bot's Computer** | **Settings → Computer** | 保留持久文件和登录状态；装最新软件，文件原地保留 |
| 5 | 等新的电脑就绪 | — | — |
| 6 | 选 **Reset Bot's Computer** | **Settings → Computer**（手机上是 **Settings → Bot → Bot Computer** 里的 **Reset Computer**） | 回到上一次保存的快照，最近或未同步的工作可能丢失 |

两条要记住的规则：

- **Reset 只在前面都失败、并且你接受丢掉最近未同步的工作时使用。**
- 恢复前尽量让正在进行的任务先跑完。官方排障的提醒是：电脑暂时不可达时，你的 Bot 资料和已保存的对话并不一定丢了，先别急着重装。

另外，应用更新和电脑更新是两次独立的事：更新桌面应用不会重置云电脑。

## 6. 使用提醒

远程操作这台电脑时画面会有延迟，用久了通常会习惯。

公司的项目最好不要复制到云电脑上。官方安全文档写明，Grok Bot 的电脑目前运行在美国——这不等于一份正式的数据驻留承诺，有驻留要求的组织需要联系账户团队。数据驻留与加密控制的细节见[安全与审批](/workbench/security/)。

## 7. 这台电脑你需要记住的三件事

- [ ] **它是一台，不是每个 Bot 一台。** 浏览器会话、文件、命令行凭证都跨 Bot 共享。不要把不同 Bot 当成安全隔离来用。
- [ ] **屏幕分开，边界不分开。** 并行工作面不等于并行权限；共用凭证和共用文件才是常态。
- [ ] **要停的地方让它停。** 登录、人机验证、支付、身份核验都交回给你；对外发送和改动交回给你。

## 下一步

- [本地执行](/start/local-exec/) — 另一套独立的权限：让它在你自己的电脑上跑命令。
- [安全与审批](/workbench/security/) — 审批规则怎么写，共享电脑的边界在哪里。
- [小夜 · 选题主编](/bots/xiaoye/) — 一个停在审批卡的 Bot 示例。

延伸阅读： [Connectors](/workbench/connectors/) · [安全与审批](/workbench/security/) · [常见问题](/faq/)

<!-- TODO: Take over / I'm done 控件条真机截图仍待补。 -->


设置里的更新 / 重置 / 转发流量见[设置 · 电脑](/workbench/settings/computer/)。
