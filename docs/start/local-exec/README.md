---
title: 本地执行
description: "Bot 在你自己电脑上运行命令的开关、三种审批模式（默认逐次询问）、审批卡上先看完整命令，以及多设备中转用法。"
eyebrow: START · 06
verified: 2026-10-20
requires: 需桌面 App
---

::: source
[docs.x.ai/grok-bot/approvals-security-and-privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy) · [docs.x.ai/grok-bot/security](https://docs.x.ai/grok-bot/security) · [docs.x.ai/grok-bot/settings-and-notifications](https://docs.x.ai/grok-bot/settings-and-notifications) · [docs.x.ai/grok-bot/troubleshooting](https://docs.x.ai/grok-bot/troubleshooting) · [docs.x.ai/grok-bot/computer-and-apps](https://docs.x.ai/grok-bot/computer-and-apps)
:::

云电脑上的工作，和你面前这台电脑上的工作，是两套独立的权限。本页讲后者：它是什么、怎么授权、每次审批你会看到什么，以及如何用它串起多台设备。

## 1. 本地执行是什么

官方的描述是：通过桌面端，Bot 可以在你自己的机器上运行命令、读取文件，并在云电脑和本机之间搬运文件。它与云电脑里的工作分开管理，也和 Auto Review 不同——Auto Review 管的是云电脑里的动作。

几个必须分清的点：

- 它需要你在桌面端打开，是一项单独的能力，不是云电脑的默认权限。
- 你的个人 Auto Review 规则存在当前这台桌面上，并同步到它的 Grok Bot 电脑；换一台桌面安装，就需要自己再设一份。
- **Execution on Local Computer** 是按电脑设的，不是按 Bot 设的。

本地设置不会影响 Bot 使用云电脑；关掉本地执行，任务照样能在云端跑。反过来，如果某个任务明确需要读取你本机的文件或命令，这才是打开它的理由。

怎么判断该不该开：

- 任务只跟网页、云端应用、`/workspace` 里的文件有关——不需要本地执行，关着。
- 任务要读你本机的项目目录、跑本机的开发工具、看本机日志——需要本地执行，按策略逐次批准。
- 任务两边都要——先让它在云端把准备工作做完，再只把必须碰本机的那一步放行。

一句话：本地执行是给「必须碰到我这张桌子上的东西」的任务用的，不是默认通路。

## 2. 三种审批模式

桌面设置里对应控件是 **在这台电脑上执行**（官方英文 **Execution on Local Computer**）。多机账号下常见位置是 **Settings → 电脑**；部分版本也可能出现在 General → Bot。截图示例选自 **设置 → 电脑**，下拉为 **始终允许**：

![Grok Bot 设置 · 电脑页在这台电脑上执行为始终允许](/tutorial/local-exec.png)

完整电脑页控件说明见[设置 · 电脑](/workbench/settings/computer/)。下拉可选：

| 选项 | 含义 | 适合谁 |
| --- | --- | --- |
| **Ask every time** | 每次要跑命令都问你；官方默认项 | 大多数人，尤其是第一次开这个能力时 |
| **Always allow** | 把本地执行设为常开，命令不再逐次问你 | 只在你清楚范围、且范围足够窄时 |
| **Never allow** | 一律不允许在本机跑命令 | 任务其实都在云端时 |

![Grok Bot 设置 · 电脑页本机执行下拉展开（始终允许 / 从不允许）](/tutorial/local-exec-modes.png)

**在这台电脑上执行** 下拉展开态；图中可见 **始终允许** 与 **从不允许**。默认与表中的 **Ask every time** 以你客户端实际选项为准。

账号登记过多台电脑后，这个设置会移到 **Settings → Computer → Computers**，每台电脑有各自的 **Execution on this computer**。

Bot 第一次请求在你电脑上运行命令时，对话里会出现一张卡片：**Allow Grok Bot and all Bots to run commands on your local computer?**，选项是 **Always allow**、**Allow once**、**Never** 和 **Deny once**（Esc）。**Always allow** 与 **Never** 会为所有 Bot 设定本地执行，之后可以在设置里改。

团队管理员可以设定更严格的上限：管理员设了更严的上限时，**Always allow** 不可用；团队策略比你的设置更严时，按团队的来。

## 3. 审批卡上看到完整命令

本地执行的审批卡会显示将要执行的确切命令。批准前先读一遍命令本身，再决定是否放行——这是本地执行唯一可靠的防线，因为放行之后跑的就是你看不到的脚本。

![本地执行审批卡：完整命令与 Allow once / Always / Deny](/tutorial/local-exec-approval-card.png)


读命令时盯三个地方：

- **路径**：它打算读或写哪个目录？在你意料之外的路径上动手，就该先问一句。
- **改动**：有没有删除、覆盖、上传这类不可逆的动作？
- **外发**：命令会不会把数据带到别处——推送到远端、调用外部服务、发请求？

官方给的实用建议是：把规则写窄。**Ask first** 规则永远拦下匹配的动作；**Allow automatically** 只在自动审查没有发现别的停手理由时才放行；两类规则同时命中时，**Ask first** 赢。

::: approval
不要为了省事就选 **Always allow**。命令的范围一放宽，出错时不好回溯，误操作也难追责。除非有明确理由，保持 **Ask every time** 或 **Never allow**。
:::

## 4. 多台电脑的中转用法

可以把多台电脑和手机串在一起用：所有设备登录同一个账号，手机上就能远程操作这些电脑，让它们各自去跑任务；文件也能在机器之间搬动。一种常见做法是：手机当遥控器，云电脑当中转站——A 电脑上的文件可以直接复制到 B 电脑，本机文件也能上传到那台云电脑上。

前提是：**在电脑端的设置里允许授权**，手机才操作得了那台电脑。官方文档对多设备协同的描述以云电脑为主，上述串法属于个人实践，不是官方单独产品名。

::: example 口头提醒
「目前我是连了 3 台电脑 1 部手机，不知道有没有上限，目前对于我来说是够用了。」
:::

设备数量有没有上限，官方文档没有写明；如果你要照着搭，先按两三台试，别把方案押在未确认的数字上。

## 5. 本地执行被拒绝时

按官方排障的顺序查：

1. 打开 **Settings → General → Bot → Execution on Local Computer**，或 **Settings → Computer → Computers** 里这台电脑对应的那一行。
2. 确认策略没有被改成 **Never allow**。
3. 团队账号的话，确认管理员没有把上限压到更严。
4. 如果之前弹过那张首次授权卡，选过 **Deny once** 的话，下次它会重新问；选 **Never** 则是所有 Bot 都不再问。

官方同时提醒：除非任务确实需要本机的文件或命令，否则保持本地访问关闭。

## 6. 这几条别忘

- 关闭本地执行不影响 Bot 用云电脑。
- 本地执行是账号级授权，开了之后你这台电脑上的所有 Bot 都能用。
- 命令写在审批卡上，批准前看完整条。
- 团队策略更严时以团队为准。

控件位置：[设置 · 电脑](/workbench/settings/computer/) 的「在这台电脑上执行」。

## 下一步

- [云电脑与接管](/start/computer/) — 另一侧：任务在云端跑的时候，共享边界在哪里。
- [安全与审批](/workbench/security/) — Auto Review 规则怎么写才不误伤。
- [手机端](/start/mobile/) — 手机上能看到的审批卡长什么样。

延伸阅读： [入门总览](/start/) · [新手坑点](/faq/pitfalls/)

<!-- 首次授权卡片真机截图仍待补；本机执行开关已接真机图。 -->
