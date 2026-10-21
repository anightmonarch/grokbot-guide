---
title: 外发前一律过审批守门
description: "邮件、发帖、开 PR 统一排队成审批卡：先看目标与参数再点 Allow once，Always allow 只给写窄的动作。"
eyebrow: SCENARIO · 安全
verified: 2026-10-20
---

::: source
[docs.x.ai/grok-bot/approvals-security-and-privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy) · [docs.x.ai/grok-bot/security](https://docs.x.ai/grok-bot/security) · [docs.x.ai/grok-bot/settings-and-notifications](https://docs.x.ai/grok-bot/settings-and-notifications) · [docs.x.ai/grok-bot/chat-and-collaboration](https://docs.x.ai/grok-bot/chat-and-collaboration)
:::

把会离开你这台机器的动作统一排队，是最省心的一条规则：Bot 照常干活，只是每一步都在等你点头。官方的做法不是加一层「安全提示」，而是两件事——请求里写清边界，Auto Review 里写窄规则。这一篇把这条守门逻辑落成你能照抄的配置。

## 适用

- 你的 Bot 会碰外部动作：发邮件、发消息、发帖、开 PR、提交表单。
- 你希望这些动作**默认排队**，而不是每条单独交代一遍。
- 你的账号可能同时有多个 Bot，共享同一台云电脑、同一批登录态。
- 你愿意在关键动作上多花一次点击的时间。

不适用：完全不涉及外发的只读工作——那种任务用最小权限装好连接器就够了，不需要额外一层「守门 Bot」。

## 准备

**Bot。** 建一位专职守门的 Bot，描述第一句就写死：「未经批准不得对外发送任何消息」。也可以导入 [批签 · 审批守门](/bots/piqian/) 模板，它的默认职责就是把外发动作排进审批。

要清楚一点：**审批卡是产品机制，不是这个 Bot 提供的功能**。守门 Bot 的价值在于把「哪些动作算外发」写清楚，而不是替代审批。

**连接器。** 用 **Connect apps** 装上邮件、发帖、GitHub 这类真正会外发的连接器。官方建议优先用连接器而不是浏览器点击，连接器通常更可靠。装好之后在对话里用 `@` 挂载。

**Auto Review 规则。** 在 **Settings → General → Auto-review** 里加规则。两类：

- **Ask first**：永远停住等你确认。
- **Allow automatically**：只有在自动审查没有发现别的停手理由时才放行。

两类规则同时命中时，**Ask first** 赢。官方举的例子就是「发送任何外部邮件前先问」「改生产看板前先问」这种窄写法，还有像「在 `/workspace/reports` 里跑 `git status` 可以自动放行」这种更窄的。官方同时点名一种反面写法：不要写「浏览器里的一切都允许」——网站和工具的行为会变。

![设置 · 通用页签（含 Auto-review）](/settings/general-tab.png)

![Auto-review 规则开关示意](/tutorial/auto-review-rules.png)


**本地执行。** 保持默认的 **Ask every time**。本地执行的审批卡会显示将要执行的确切命令，批准前读一遍命令本身，比读摘要可靠。

## 步骤

1. **在 Bot 描述里划边界。** 官方建议对这几类动作给出明确边界：发送消息或邀请、发布内容、购买与财务转账、删除或覆盖数据、改变权限、生产变更、接受法律条款。

2. **用五要素下第一单，先只要草稿。**

::: example 第一单：只要草稿
```text
结果：准备一份要发给合作方的邮件草稿。
来源：这 3 条信息（见附件）和我们的历史沟通口径。
约束：只出草稿，不发送；不要抄送任何人；不要改附件里的收件人。
交付物：对话里的一张可编辑草稿卡，含收件人、主题、正文。
停下来等我的节点：草稿出现在对话里就停下，等我点 Send。
```
:::

3. **审草稿。** 官方描述：Bot 准备好邮件或 Slack 消息时，对话里会出现一张**可编辑的草稿卡**。核对收件人与正文，然后选 **Send email** / **Send message**，或者 **Discard**。手机上同样的卡片写作 **Send Email** / **Send Message** 与 **Discard**。

![可编辑邮件草稿卡示意](/tutorial/draft-card-email.png)


4. **审动作卡。** 需要审批时，对话里显示提议的操作和它的输入。看三样东西：目标是**谁**、范围是**多大**、值是什么。官方明确建议：不要批准一个你识别不出目标或影响的动作——让 Bot 用平实语言解释清楚，或者先给你一份草稿。

5. **选一个。** **Allow once** 让它继续这一步；**Always allow** 可以存下一条匹配规则；**Deny** 直接拦下。

![审批卡三选择：Allow once / Always allow / Deny](/tutorial/flow-approval-gate.jpg)

6. **把规则收紧到具体动作。** 长期放行时，别整类网站都放行；写成「向 <某个联系人> 发邮件可以自动发」这种粒度。

7. **例程也走同一条门。** 例程、事件触发、别的 Bot 转过来的任务产生的审批，同样以卡片形式出现——但你不在场时大约十分钟后会过期。

## 审批边界

::: approval
审批只管这一个提议的动作，不会撤销已经完成的工作。所以外发类规则要提前写进 Bot 描述和例程的确认项，别等出了事再补。

**Always allow** 是写进规则的持久授权，不是这一次性的按钮。官方提醒 Auto Review 是模型驱动的，它应当补充、而不是替代最小权限和显式的审批边界——所以在开 **Always allow** 之前，先确认你确实需要这个动作长期自动通过。

个人 Auto Review 规则存在当前这台桌面上，并同步到它的云电脑；换一台桌面安装，需要自己再设一份。
:::

## 你要检查什么

守门规则上线后，隔几天做一次这几项复核：

- 每张审批卡的目标、范围、数值，你能不能在**不查原始资料**的情况下判断它该不该放行。
- **Always allow** 的规则列表里，有没有你已经忘了、或者范围过宽的条目。
- 有没有出现过「目标识别不出」却被点掉的卡片——出现一次就该让 Bot 把它的说法写得更平实。
- 草稿卡里收件人、抄送、附件是不是和你预期一致；正文里有没有被塞进你没提过的链接或联系方式。
- 被拒的动作有没有真的没发生——**Deny** 之后去源系统确认一下。
- 连接器清单里有没有你已经不需要的插件；不需要就去 **Connect apps** 卸载，并在源服务里撤销授权。

官方还提醒一件容易忽略的事：**所有 Bot 共享同一台云电脑**——浏览器 cookie、文件、命令行凭据都是共享的。所以不要把不同 Bot 当成安全边界，也别在共享电脑上放你不希望别的 Bot 看到的东西。

需要彻底收回访问权时，按官方的六步走：暂停或删除相关例程 → 在共享电脑上登出网站 → 卸载连接器并在源服务里撤销授权 → 从 `/workspace` 删除敏感项目文件 → 隐藏或删除不该再出现的 Bot → 需要时用账号设置流程删除 Cursor 账号。注意：**删掉 Bot 不会**清空共享电脑上的文件与登录态。

## 相关

- [批签 · 审批守门](/bots/piqian/) — 这套流程对应的 Bot 模板。
- [安全与审批](/workbench/security/) — 三种选择、过期、Auto Review、移除访问。
- [创建第一个窄职责 Bot](/start/first-bot/) — 把边界写进描述。
- [本地执行](/start/local-exec/) — 命令审批卡上看到的是完整命令。
- [场景：Cloud Agent 开带预览的 PR](/scenarios/cloud-agent-pr/) — 合并为什么必须留给人。
- [场景：收藏进选题库，停在审批卡](/scenarios/topic-inbox/) — 外发前停下来的日常版本。

## 复现日期

2026-10-20 按官方文档整理。审批卡的三个选项、约十分钟的过期机制、Auto Review 两类规则与「Ask first 优先」、个人规则存在本地桌面并同步、最小权限清单、移除访问的六步，均出自当时的官方文档。

## 出处说明

本文全部依据 docs.x.ai 的 Approvals, security, and privacy、Security、Settings and notifications、Message and collaborate 四页写成，未引用社区帖作为事实依据，也没有照抄任何第三方教程的措辞。模板页 [批签 · 审批守门](/bots/piqian/) 是本站整理的导入模板；「守门 Bot」的说法是本站对这个模式的称呼，官方文档里并没有这个角色名。
