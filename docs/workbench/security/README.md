---
title: 安全与审批
description: "审批卡三选择、无人值守过期、Auto Review、最小权限，以及共享电脑不是隔离边界。"
eyebrow: WORKBENCH · 06
verified: 2026-10-20
---

::: source
[docs.x.ai/grok-bot/approvals-security-and-privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy) · [docs.x.ai/grok-bot/security](https://docs.x.ai/grok-bot/security) · [docs.x.ai/grok-bot/settings-and-notifications](https://docs.x.ai/grok-bot/settings-and-notifications) · [docs.x.ai/grok-bot/computer-and-apps](https://docs.x.ai/grok-bot/computer-and-apps)
:::

审批是 Grok Bot 把关动作的最后一道人工环节。外发、付款、删除、发布、改生产配置，都应先停在卡片上。

## 1. 三种选择

需要审批时，对话里会显示准备执行的操作和它的参数。

| 选项 | 含义 |
| --- | --- |
| **Allow once** | 只放行这一次 |
| **Always allow** | 可存下一条匹配规则，以后同类动作自动过 |
| **Deny** | 拦住，不执行 |

手机上的控件相同。不要批准一个你说不清目标或影响的动作。让 Bot 用平常话解释，或先出草稿。审批只控制这一个动作，不会撤销已经完成的工作。

::: approval
发送外部邮件、发帖、开 PR 合并、购买、删除生产数据——一律等人点头。写进 Bot 描述，再靠审批卡双保险。
:::

## 2. 无人值守时的过期

由例程、触发器或其他 Bot 发起的工作，其审批大约十分钟后过期，卡片显示 **Expired**，动作不会执行。过期卡片可能提供 **Always allow this in the future**：它只是把规则加进 **Allow automatically**，**不会**补做那次动作。要让任务继续，让 Bot 再试一次。

不要把「过期了」误读成「已经发过了」——过期等于没放行。回来后先看对话里的卡片状态，再决定是否重跑。

## 3. Auto Review

在 **Settings → General → Auto-review** 里配置（侧边栏左下账号入口，或桌面快捷键打开设置；见[设置 · 电脑](/workbench/settings/computer/) 同级的通用页）。

- **Ask first** 规则总是拦下匹配的动作。  
- **Allow automatically** 规则只在自动审查没发现别的问题时放行。  
- 两类规则冲突时，**Ask first** 优先。  

规则要窄，围绕具体动作和范围写，不要写「浏览器里的一切都允许」。团队管理员启用强制后，团队规则不可编辑，个人规则只能让行为更严格。

Auto Review 是模型辅助的审查层，应与描述里的禁令、人工点头配合，而不是单独依赖。个人规则存在当前桌面并同步到其云侧会话——换设备后以客户端实际可见规则为准。

![设置 · 通用页签（含 Auto-review）](/settings/general-tab.png)

![Auto-review 规则开关示意](/tutorial/auto-review-rules.png)


## 4. 本地执行的审批

在本机跑命令时，审批卡会显示完整命令。模式包括 **Ask every time**（默认）、**Always allow**、**Never allow**。范围一放宽就不好回溯——除非有明确理由，保持逐条询问。本机执行与云电脑内的 Auto Review 是两套闸门：前者管「你笔记本上的命令」，后者管「托管电脑里的工具调用」。详见[本地执行](/start/local-exec/)与[设置 · 电脑](/workbench/settings/computer/)。

## 5. 共享电脑不是隔离

账号下所有 Bot 共用一台云电脑：文件、浏览器会话、命令行凭证都在上面。为一个 Bot 登录的网站，其他 Bot 同样能用。不要拿「换一个 Bot」当安全边界。

最小权限做法：

1. 只连接工作需要的工具。  
2. 先从只读任务和草稿开始。  
3. 发送、发布、购买、删除、生产变更留在审批后面。  
4. 临时敏感文件用完从 `/workspace` 删掉。  
5. 不再用的服务在电脑上退出登录，并在源站撤销授权。  
6. 定期回顾已装连接器与启用中的例程。  

官方说明：云电脑目前运行在美国。公司项目是否允许上云，按你所在组织的合规要求决定；个人项目可试，公司代码需谨慎。

密码、通行密钥、二次验证码与验证码类步骤：用 **Take over** 由你亲手完成，或走官方安全请求控件；**不要**把密码或一次性验证码贴进普通聊天。

## 6. 移除访问（逐步）

不再让 Grok Bot 触达某类数据时，按官方「Remove access and working data」顺序处理：

1. **暂停或删除**相关例程（避免它半夜还去碰旧系统）。  
2. 在共享电脑上**退出**相关网站登录。  
3. 在 **Connect apps** 卸载连接器，并到源服务（Google、GitHub、Slack 等）里**撤销**授权。  
4. 从 `/workspace` **删除**敏感项目文件与自建密钥目录。  
5. **Hide** 或 **Delete** 不应再出现的 Bot（删 Bot 不会清掉共享电脑上的文件与会话）。  
6. 若要彻底关掉账号，再走 Cursor 账号设置里的删除流程（以客户端与条款为准）。  

具体控件名以 [Approvals, security, and privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy) 为准；本站不编造未核验的权限开关名。

![审批卡三选择与过期门槛：Allow once / Always allow / Deny](/tutorial/flow-approval-gate.jpg)


## 7. 硬件密钥与账号安全

官方支持用硬件安全密钥等更强的登录保护（以你账号实际可用选项为准；设置里可见 **Security keys** 一类入口时再启用）。共享或演示屏幕时，注意审批卡和草稿卡上可能出现的地址、附件名与命令全文。

发现异常自动化时：先暂停相关例程，再在 Auto Review 里收紧 **Ask first**，必要时按「移除访问」顺序断开连接器。不要用「再开一个 Bot」代替撤销授权。

## 8. 和场景库的对应

- [外发前一律过审批守门](/scenarios/approval-gate/)  
- [收藏进选题库，停在审批卡](/scenarios/topic-inbox/)  
- [Cloud Agent 开带预览的 PR](/scenarios/cloud-agent-pr/)（合并仍需你点头）  
- [邮件 / Slack 草稿卡](/workbench/channels/)（人点发送之前不会出去）  

## 你要检查什么

- 描述里是否写了外发/付款禁令。  
- Auto Review 规则是否过宽。  
- 过期卡是否被误当成「已经发过」。  
- 共享电脑上是否残留不该共享的登录。  
- 本机执行是否仍默认 **Ask every time**（除非你有明确理由放宽）。  

## 常见坑

- 给「发送任何外部消息」一类过宽的 **Always allow**。  
- 以为换一个 Bot 就隔离开登录态。  
- 删了 Bot 却忘了在源站撤销 OAuth。  
- 过期卡上点「以后总是允许」却以为会补发那一次。  
- 把密码贴进对话「省事」——应用 **Take over**。  

## 延伸阅读

- [场景：外发前一律过审批守门](/scenarios/approval-gate/)
- [新手坑点](/faq/pitfalls/)
- [本地执行](/start/local-exec/)
- [设置 · 电脑](/workbench/settings/computer/)
- [Channels（渠道）](/workbench/channels/)
