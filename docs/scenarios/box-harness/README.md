---
title: 在云电脑装 CLI 写代码
description: "在 Bot 云电脑安装命令行编码工具、拉仓库协作；公司代码需合规评估。"
eyebrow: SCENARIO · 工程
verified: 2026-10-20
---

::: source
[一宿君 · 保姆级入门 §03⑤](/about/) · [docs.x.ai/grok-bot/computer-and-apps](https://docs.x.ai/grok-bot/computer-and-apps) · [docs.x.ai/grok-bot/security](https://docs.x.ai/grok-bot/security)
:::

复杂项目目录上的长编码，不适合硬塞进「俯瞰本机」；更稳的做法是在 **Bot 云电脑**里装 CLI 工具、拉仓库、由 Bot 指挥命令行。官方写明云电脑目前在美国运行——个人项目可以随便试，公司源码上不上云，要先过你自己的合规关。

这个场景的核心姿势是：**干净沙箱 + 命令行**，而不是让 Bot 在你本机某个巨大 monorepo 里瞎点 GUI。本机更适合短改、review、盯额度（见 [watch-quota](/scenarios/watch-quota/)）；长编码与开 PR 可以接到 [Cloud Agent](/scenarios/cloud-agent-pr/) 或本页的云电脑 CLI。

## 适用

- 个人项目，或已获准上云的仓库。
- 习惯命令行工作流：clone、test、lint、开分支，比点 IDE 菜单更顺手。
- 你有一份「用不完」的 Coding Plan / CLI 额度，想放在云端跑，而不是占本机。
- 愿意把安装命令记进技能，以便 **Update Bot's Computer** 后重装。

## 什么时候不该用

- **公司项目默认不要拷贝到云电脑**——这是安全常识；云端在境外机房时尤其要评估。
- 你其实只想「开一个带预览的 PR」——优先走 [Cloud Agent 开 PR](/scenarios/cloud-agent-pr/)，不必先搭一整套 Harness。
- 仓库依赖本机 GPU、内网数据库、或只能在公司 VPN 里解析的私服——云电脑未必够得到，硬装只会烧用量。
- 你还没分清「更新桌面 App」和「Update Bot's Computer」——后者会清掉已装软件包，重要工具没有重装笔记就会空手。

## 准备

- 理解[云电脑](/start/computer/)共享机制：账号下多个 Bot **共用同一台**云电脑，浏览器 cookie、`/workspace` 文件、命令行凭据都是共享的。
- GitHub 等连接器或浏览器登录（按你环境）。官方建议能用连接器就别纯靠点击。
- 约定项目目录，例如 `/workspace/dev/<repo>`，避免把密钥散落在家目录。
- **Update Bot's Computer** 会清掉已装软件包——重要工具要有重装笔记。见[设置 · 电脑](/workbench/settings/computer/)。
- 推送、发布、生产变更的审批规则：描述里写清，Auto Review 里对 push / release 保留 **Ask first**。

## 步骤

1. 打开云电脑，确认 `/workspace` 下有项目目录约定；先只读看一眼磁盘余量与现有目录，避免覆盖别人（其实是你另一个 Bot）留下的东西。

2. 让 Bot 用包管理器安装你指定的 **CLI**（终端工具通常比纯 GUI 点击更稳）。装完必须跑 `version`（或等价命令）把输出贴给你。

![云电脑终端装 CLI 示意](/tutorial/box-terminal-cli.png)


![Grok Bot 对话内云电脑预览](/tutorial/cloud-computer-preview.png)

3. 配置凭证走安全交接，不要把密钥贴进普通聊天。登录页需要二次验证时用 **Take over** → 你自己完成 → **I'm done**。

4. 克隆**个人**仓库到约定目录，跑测试；开 PR 的合并仍留审批（可接 [Cloud Agent 开 PR](/scenarios/cloud-agent-pr/)）。

5. 跑稳后把安装与环境准备存成技能，并在描述里写：「不读本机公司目录；不把密钥写进对话；推送前先问我。」

::: example 在云电脑准备 CLI 环境
```text
在云电脑 /workspace/dev 下准备一个干净目录。
安装我指定的命令行编码工具（按官方安装文档），装完运行 version 命令把输出贴给我。
不要读取或上传我本机「公司」目录。不要把密钥写进对话。
```
:::

::: example 拉个人仓库并跑测试
```text
结果：把我的个人仓库 clone 到 /workspace/dev/<repo>，安装依赖并跑测试套件。
来源：我 @GitHub 挂载的连接器；仓库是 [owner/name]，分支 main。
约束：只动这个目录；不要 force push；不要改远程保护分支；不要读 /Users 下的公司路径。
交付物：clone 路径、测试通过/失败摘要、失败时的日志尾部 50 行。
停下来等我的节点：任何 git push、任何发布命令、任何生产配置变更。
```
:::

## 推荐顺序

按这个顺序做，出问题也容易回退：

1. **只读**：列出 `/workspace` 与磁盘余量。
2. **安装 CLI** 并 `version`，把命令记进笔记或技能草稿。
3. **克隆个人仓库**到约定目录（先小仓库练手）。
4. **跑测试**；修失败项时要求它改刚生成的产物，不要另起互不相干的副本。
5. **开 PR / 推送**走审批；合并留给人。
6. **沉淀**：安装命令 → 技能；需要定时检查依赖时再谈例程，且先 **Test run**。

## 不擅长什么

在你本机某个庞大项目目录里做深度长时改写，更稳妥的是用专用编码工具；云电脑适合「有干净沙箱 + CLI」的姿势。两者可互补：

| 姿势 | 更适合 | 更不适合 |
| --- | --- | --- |
| 本机俯瞰 + 本地执行 | 短改、盯窗口、点「继续」 | 深入巨型应用空间长时间写码 |
| 云电脑 CLI（本页） | 干净环境、可重装、指挥终端 Harness | 公司源码、强依赖内网 |
| Cloud Agent | 开 PR、挂预览、跑检查 | 替代你对合并的最终判断 |

## 失败时怎么办

- **安装命令失败 / 找不到包**：核对官方安装文档是否要求特定发行版；让 Bot 贴完整 stderr，不要只说「装好了」。
- **Update 之后工具全没了**：这是预期行为——用技能里的重装步骤再来一遍；不要把「装环境」和「写业务」混在同一次没有笔记的对话里。
- **clone 认证失败**：优先重连 GitHub 连接器；浏览器登录态过期就 **Take over** 自己登，不要把 PAT 贴进聊天。
- **测试在云上红、本机绿**：对齐 Node/Python 版本与锁文件；把环境差异写进交付物，而不是强行改测试糊弄过去。
- **误把公司目录拷上去了**：立刻停；按[安全与审批](/workbench/security/)的移除访问思路清理 `/workspace` 敏感文件，并评估是否需要轮换已暴露的密钥。

## 你要检查什么

- 是否误把公司源码拷上云。
- Update 之后工具是否需重装；技能里有没有可复制的安装命令。
- 推送 / 发布是否停在审批；有没有出现过「目标认不出」却被点掉的卡片。
- `/workspace` 里是否残留密钥明文、`.env` 未进约定忽略规则。
- 多个 Bot 是否共用这台电脑——不要把「Bot A 的沙箱」当成安全边界。

![审批卡三选择：Allow once / Always allow / Deny](/tutorial/flow-approval-gate.jpg)

## 审批边界

::: approval
公司项目默认不要拷贝到云电脑。推送、发布、生产变更必须审批。

**Always allow** 只给写得很窄的动作（例如「在 `/workspace/dev/foo` 里跑 `git status`」），不要写成「终端里的一切都允许」。审批只管这一步，不会撤销已经 clone 下来的代码——敏感内容一旦上云，清理是另一套流程。
:::

## 相关

- [云电脑与接管](/start/computer/) · [设置 · 电脑](/workbench/settings/computer/)
- [场景：Cloud Agent 开带预览的 PR](/scenarios/cloud-agent-pr/)
- [场景：盯本机编码工具额度并恢复任务](/scenarios/watch-quota/)
- [码初 · 工程搭档](/bots/machu/) · [安全与审批](/workbench/security/)

## 复现日期

2026-10-20。姿势来自个人实践整理；云电脑与安全边界来自官方 computer / security 文档。

## 出处说明

个人实践来源 + 官方 computer/security。不绑定具体第三方 CLI 商标安装步骤（以其官网为准）。未编造分享链接或截图。
