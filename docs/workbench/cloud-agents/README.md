---
title: Cloud Agents
description: "把编码类长任务委派给云端代理、开 PR 与结果回传；合并仍需人审批。"
eyebrow: WORKBENCH · Cloud Agents
verified: 2026-10-20
---

::: source
[docs.x.ai/grok-bot/teams-and-enterprises](https://docs.x.ai/grok-bot/teams-and-enterprises) · [docs.x.ai/grok-bot/files-and-results](https://docs.x.ai/grok-bot/files-and-results) · [docs.x.ai/grok-bot/approvals-security-and-privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy)
:::

Cloud Agents 适合把较重的编码 / 仓库任务放到**另一台独立电脑**上跑：Bot 交代需求、收回结果与附件；合并 PR、生产发布仍应留在人侧。本页讲工作台入口与概念；完整可跟做复现见场景[Cloud Agent 开带预览的 PR](/scenarios/cloud-agent-pr/)。

## 1. 和本机 / 云电脑 CLI 的分工

| 方式 | 更适合 | 不适合当默认的情况 |
| --- | --- | --- |
| [本机执行](/start/local-exec/) | 点本机窗口、读本机文件、本机 CLI | 不想把公司密钥暴露给本机宽策略时 |
| [云电脑 CLI / box harness](/scenarios/box-harness/) | 在 Bot 电脑上装工具、改沙箱仓库 | 需要独立于共享云电脑的编码隔离时 |
| **Cloud Agents** | 官方委派编码路径、开 PR、结果文件回传 | 改生产配置、权限、数据迁移等高风险改动 |

一句话：日常点本机用本机执行；在 Bot 电脑里装环境用云电脑；「把这单编码外包出去再开 PR」用 Cloud Agents。三者可以配合，但边界要写进 Bot 描述——见[码初](/bots/machu/)。

共享云电脑上的登录与文件，对账号下**所有 Bot**可见。公司代码是否上云，先想清楚再委派；官方说明机制，数据安全结论见场景页出处说明（个人实践来源，需结合实际环境核验）。

## 2. 何时用、何时不用

**更适合**

- 重复性高、风险低的改动：文案统一、补测试、小范围重命名、小函数重构。
- 你有仓库访问权，愿意让 Agent **开 PR**，但审 diff 与**合并**自己来。
- 需要可核对回报：改了哪些文件、预览/截图、构建是否通过。
- 希望编码在后台跑，不占满当前对话上下文。

**更不适合**

- 触及生产配置、依赖大升级、权限或数据迁移。
- 仓库还没接进连接器 / 工作区，却想凭空写代码。
- 团队管理员已关掉 Cloud Agents 委派（见下）。

## 3. 团队开关与个人入口

官方：Bot 可以把编码任务委派给独立电脑，运行在你已有的 **Cloud Agent** 控制之下。开关在 Cursor dashboard 的 **Grok Bot** 页，团队默认常为开，管理员可关。关掉后成员 Bot 不能再 spawn 委派。

个人账号细控件文案、是否单独计量用量，以客户端与官方 plans / teams 页为准——本页不写数字。

准备清单（工作台视角）：

1. 确认团队未禁用 Cloud Agents（若在团队里）。
2. 在 **Connect apps** 装好代码托管连接器（如 GitHub），对话里用 `@` 挂上。优先连接器，再考虑浏览器点仓库。见[Connectors](/workbench/connectors/)。
3. Bot 描述写清：允许开 PR、必须贴预览证据、**禁止合并**、禁止改分支保护与密钥文件。
4. 仓库本地副本放在云端工作区时，路径约定要写进任务（常见为 `/workspace`；以你环境为准）。

![发起 Cloud Agent / 开 PR 入口三步](/tutorial/cloud-agent-entry.png)

## 4. 发起与看结果

完整逐步复现以场景页为准。工作台侧流程可记成：

1. **写边界**：描述或本条消息里固定「只开 PR、贴证据、不合并」。
2. **委派**：讲清仓库、分支、改动范围；`@` 挂连接器。Bot 决定交给 Cloud Agent 时，任务在**另一台独立电脑**跑。
3. **收回**：官方 files-and-results：Cloud Agent 结束后，Bot 把最终报告里引用的图片、视频等文件**复制回自己的电脑**，并附在回复里；桌面端对话中的 Cloud Agent 卡片显示同样文件，可点开全屏查看。
4. **你审**：看 diff 范围、预览是否为改后状态、构建/测试摘要是否诚实失败；再决定是否合并。

![PR 链接卡示意（仓库名已打码）](/tutorial/cloud-agent-pr-result.png)

::: example 委派前的五要素骨架
```text
结果：把「设置页文案统一成简体中文」做成一个 PR。
来源：仓库 <你的仓库> 的 default 分支。
约束：只改文案；不要合并；不要改分支保护；不要碰密钥文件。
交付物：PR 链接 + 文件清单 + 预览截图 + 构建/测试结果；失败则贴日志摘要到文件与行。
停下来等我的节点：PR 开好之后停下。合并由我自己来。
```
:::

官方文档没有单独描述一个名叫「开 PR」的专用按钮；开 PR 是 Bot 经连接器 / 浏览器完成的普通动作。所以「允许开、禁止合」必须由你写进描述或 Auto Review，而不是假设产品自动拦住合并。

## 5. 检查失败怎么读

回报不合格时，按这个顺序看，而不是立刻再开一单：

1. **范围**：改动文件是否超出需求？有没有顺手改 lockfile、CI、分支保护？
2. **证据**：截图/视频是否来自改后状态？Cloud Agent 卡片里能否打开附件？
3. **构建**：失败时有没有定位到文件与行，还是一句「出错了」？
4. **停止点**：是否已经合并？若已合并，说明边界或 Auto Review 过松——立刻收紧后再继续。
5. **连接器**：被团队禁用的连接器会显示为 **Disabled by team admin** 一类状态；先恢复权限再委派。

让 Bot 「修订已有产物」通常比「另开一份断开的副本」更清晰——官方也建议对已生成工件给反馈继续改。

## 6. 审批

::: approval
开 PR 可以自动化准备；**合并、生产发布、删除仓库、改分支保护**必须人确认。审批卡只覆盖这一次提议的动作，不撤销已完成的工作。「不许合并」要写进 Bot 描述，并在 **Settings → General → Auto-review** 用窄的 **Ask first** 兜住；**Ask first** 与 **Allow automatically** 同时命中时，Ask first 赢。

非你亲手发起的任务（例程、事件、别的 Bot 转来）上的审批卡可能约十分钟后显示 **Expired**，动作不会执行——要继续就让 Bot 再试。群聊里不出审批请求：合并相关确认回到一对一对话。见[安全与审批](/workbench/security/)。
:::


用量与连接器写权限以客户端 / Connect apps 显示为准，本页不写死数字。

## 7. 你要检查什么

- 团队 Cloud Agents 开关是否允许委派。
- 任务是否用 `@` 挂了代码托管连接器。
- 描述是否同时写了「可开 PR」与「不可合并」。
- 回报是否可独立核对（链接、截图、时间点），而不是只有「已完成」。
- 合并是否仍由你在托管网站上按下。

## 相关

- 场景：[cloud-agent-pr](/scenarios/cloud-agent-pr/) · [box-harness](/scenarios/box-harness/) · [bug-repro](/scenarios/bug-repro/) · [approval-gate](/scenarios/approval-gate/)
- [files-and-results 官方](https://docs.x.ai/grok-bot/files-and-results) · [码初](/bots/machu/) · [本地执行](/start/local-exec/) · [设置 · 电脑](/workbench/settings/computer/)
- [多 Bot 协作](/workbench/multi-bot/) · [按角色 · 开发者](/paths/by-role/)
