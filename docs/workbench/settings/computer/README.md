---
title: 设置 · 电脑
description: "Computer 页逐项说明：本机执行、经此电脑转发流量、其他电脑列表、更新与重置 Bot 的电脑。"
eyebrow: SETTINGS · 电脑
verified: 2026-10-20
requires: 需桌面 App
---

::: source
[docs.x.ai/grok-bot/settings-and-notifications](https://docs.x.ai/grok-bot/settings-and-notifications) · [docs.x.ai/grok-bot/computer-and-apps](https://docs.x.ai/grok-bot/computer-and-apps) · [docs.x.ai/grok-bot/approvals-security-and-privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy) · [docs.x.ai/grok-bot/troubleshooting](https://docs.x.ai/grok-bot/troubleshooting) · [docs.x.ai/grok-bot/private-networks](https://docs.x.ai/grok-bot/private-networks)
:::

**电脑**页管两类东西：你面前这台（及已注册的其他）本地电脑，以及所有 Bot 共用的那台云电脑。下面按真机界面区块讲解；插图来自站长桌面客户端截图。

![Grok Bot 设置 · 电脑页左侧四页签，右侧「你的电脑」与「Bot 的电脑」两组控件](/settings/computer-tab.png)

上图可见左侧页签：**通用**、**电脑**（当前）、**用量与账单**、**更新**。右侧分两块——**你的电脑**（本机）与 **Bot 的电脑**（云端）。

## 1. 你的电脑 vs 其他电脑

### 本机块

界面会标明当前桌面（截图示例为 **Mac**）。本机相关的两项是：

- **在这台电脑上执行**（见 §3） 
- **经此电脑转发流量**（见 §2） 

这两项都只作用于**当前这台桌面安装**，换一台电脑要分别设置。

### 其他电脑

**其他电脑**一行展示已注册机器数量，并可进入列表。截图示例显示一台机器主机名，并标注 **当前在线**。

用途可以理解为：同一账号下多台桌面 / 设备都登录过 Grok Bot 时，在这里查看它们是否在线。多端登录后，可用手机或云电脑中转操作各台本机——前提是本机设置里已允许相应权限，见[本地执行](/start/local-exec/)。

也可以直接在对话里问 Bot「你现在连着几台电脑」，它会列出哪台在线、哪台断开（常见原因是睡眠或退出了客户端），以及云电脑的状态：

<div class="g-phones is-single">

![在手机上问主 Bot 连着几台电脑：Mac 在线，另一台 MacBook 已断开，云电脑在线](/mobile/ask-connected-computers.webp)

</div>

## 2. 网络：经此电脑转发流量

界面文案大意：把 Grok Bot（云电脑）的网络流量改为经你的**本地桌面**转发，而不是只走云端；并且 **仅对新连接生效**。

官方英文名是 **Route traffic through this computer**。打开后，目标站点会看到你这台桌面的出口 IP，Bot 也能触达这台机器所在网络能访问的地址（例如内网）。详见官方 [Connect to private networks](https://docs.x.ai/grok-bot/private-networks)。

要点：

1. 开关作用于当前桌面。 
2. **已有连接不会立刻改道**——文案写明只对新连接生效；改完后如需走新路径，应新开任务 / 新连接。 
3. 企业管理员若关闭 **Allow Local Egress Routing**，开关会被关掉并锁定；官方说明活跃路由会在约五分钟内停掉，你的选择会保留，管理员重新允许后再生效。 

::: approval
打开转发等于让云电脑借你本机网络出门。公共 Wi-Fi、不信任网络上请保持关闭；公司网络是否允许，先问管理员。
:::

## 3. 在这台电脑上执行

界面标题：**在这台电脑上执行**。说明文案强调：允许 Grok Bot 在你的电脑上打开文件并运行任务，并且 **自动审核仍会先检查所有操作**。

这与官方 **Execution on Local Computer** 是同一能力：Bot 能否在你面前这台桌面上读文件、跑命令（经本机批准流程）。默认偏谨慎；截图示例里下拉选的是 **始终允许（Always Allow）**。

| 常见选项（以客户端为准） | 含义（结合官方） |
| --- | --- |
| 每次询问 / Ask every time | 默认思路：每条命令先审批 |
| 始终允许 / Always allow | 本机执行放宽；**Auto Review 仍会审** |
| 永不允许 / Never allow | 禁止本机执行 |

::: approval
即使选了「始终允许」，对话里仍可能因 Auto Review 的 **Ask first** 规则停住。不要以为本机执行等于跳过所有审批。宽权限难回溯，详见[本地执行](/start/local-exec/)与[安全与审批](/workbench/security/)。
:::

审批卡会显示完整命令。范围一放宽就不好收——没有明确理由时，优先保持逐条询问。

## 4. 更新 Bot 的电脑

**Bot 的电脑**区块里的 **更新 Bot 的电脑**，对应官方 **Update Bot's Computer**。

截图与官方共同说明：

- 更新的是**所有 Bot 共用**的那台云电脑。 
- **文件和登录信息会保留**；**已安装的应用和软件包会被移除**（需自行重装）。 
- **所有 Bot 会一起更新**。 
- 若有 Bot 正在工作，界面会提示等待；截图中 **更新** 按钮呈不可用，并提供 **停止 [某 Bot 名]**，方便先停再更。 

操作建议：

1. 尽量让正在跑的任务先结束，或点 **停止 …** 明确中断。 
2. 确认没有未保存的重要中间态仍只在内存 / 临时目录里——重要结果应已在 `/workspace` 或对话附件里。 
3. **更新** 可点后再执行；保留持久文件与登录，比重置温和。 

恢复顺序里，**Update** 排在 **Reset** 之前，见[云电脑与接管](/start/computer/)与官方 troubleshooting。

## 5. 重置 Bot 的电脑

**重置 Bot 的电脑**对应官方 **Reset Bot's Computer**。界面说明：电脑卡住时可重新开始；会从你**上次保存的快照**重建，**最近的更改可能会丢失**。按钮通常为强调色的 **重置**。

::: approval
Reset 是最后手段。先试 Retry → 重启应用 → Recover（若有）→ Update。只有这些都失败、且你能接受丢掉最近未同步工作时，再 Reset。
:::

## 6. 和「云电脑与接管」页的分工

| 问题 | 去哪读 |
| --- | --- |
| 设置里每一项开关怎么点 | **本页** |
| Take over、共享 Cookie、`/workspace`、恢复顺序概念 | [云电脑与接管](/start/computer/) |
| 本机命令审批模式与多机中转经验 | [本地执行](/start/local-exec/) |
| Auto Review 规则怎么写 | [安全与审批](/workbench/security/) |


## 7. 中英文对照（便于对照官方文档）

| 界面常见中文（截图） | 官方文档英文 |
| --- | --- |
| 在这台电脑上执行 | Execution on Local Computer |
| 经此电脑转发流量 | Route traffic through this computer |
| 其他电脑 | （已注册桌面列表；官方多写 per-desktop 行为） |
| 更新 Bot 的电脑 | Update Bot's Computer |
| 重置 Bot 的电脑 | Reset Bot's Computer |
| 始终允许 | Always allow |
| 自动审核 | Auto Review / Auto-review |

客户端语言设为英文时，以英文标签为准；本页中文取自简体界面截图。

## 你要检查什么

- 转发流量是否只在需要内网 / 本机出口时打开，并理解「仅新连接」。 
- 「在这台电脑上执行」是否故意选成始终允许；Auto Review 是否仍有窄的 Ask first。 
- 更新前是否已停止忙碌 Bot；是否接受应用需重装。 
- 是否误点了重置。 
- **其他电脑**列表里，不该再信任的机器是否还显示在线。 

## 相关

- [设置总览](/workbench/settings/) 
- [本地执行](/start/local-exec/) 
- [云电脑与接管](/start/computer/) 
- [Connectors](/workbench/connectors/) 


