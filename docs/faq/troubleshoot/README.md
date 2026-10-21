---
title: Q&A 手册
description: "从登录失败到电脑不可达、例程未跑、插件掉线：按破坏性从小到大处理。"
eyebrow: FAQ · Q&A
verified: 2026-10-20
---

::: source
[docs.x.ai/grok-bot/troubleshooting](https://docs.x.ai/grok-bot/troubleshooting) · [docs.x.ai/grok-bot/settings-and-notifications](https://docs.x.ai/grok-bot/settings-and-notifications) · [docs.x.ai/grok-bot/computer-and-apps](https://docs.x.ai/grok-bot/computer-and-apps)
:::

先做破坏性最小的一步。桌面或手机断开时，云端任务仍可能在跑——别因为 App 卡住就立刻 **Reset**。下面按官方 Troubleshooting 的顺序展开，每节补上「先看什么 / 别急着做什么」。

相关阅读：[常见问题](/faq/) · [新手坑点](/faq/pitfalls/) · [设置 · 电脑](/workbench/settings/computer/) · [安全与审批](/workbench/security/)。

## 1. 登录走不完

1. 认证在浏览器进行时保持 Grok Bot 打开。
2. 确认浏览器显示 Cursor 登录成功。
3. 若应用没抢回焦点，手动切回。
4. 欢迎页再点 **Sign in**，或 Settings 里 **Sign In with Cursor**。
5. 确认账号具备 Grok Bot 权限。

组织账号走 SSO，不要用另一个个人账号「随便登一下」混过去。Legacy Privacy Mode 报错，说明当前数据模式不允许 Grok Bot 所需的存储——先改 Cursor 账号的数据设置，或找组织管理员；硬刷新解决不了策略问题。

**别急着做**：清整个系统钥匙串、换无关浏览器扩展大扫除——先完成上面五步与 SSO / Privacy Mode 核对。

## 2. 电脑还在设置 / 更新中

初始安装与镜像更新可能要几分钟。进度还在变就等；失败或卡住再动：

1. 从错误态 **Retry**
2. 重启应用
3. 检查 App 更新（**Settings → Updates → Check for Updates**）
4. 仍不可达： **Settings → Computer → Update Bot's Computer**

**别急着做**：进度条还在动时不要连点 Reset；更新桌面 App ≠ 重置云电脑（见第 11 节）。

## 3. 电脑连不上

资料与对话不一定丢。按破坏性从小到大：

1. **Retry** 或重开对话
2. 重启应用
3. **Recover computer**（若提供；确认框可能写作 **Recover Grok Bot's Computer**）
4. **Update Bot's Computer**（手机路径见官方：Settings → Bot → Bot Computer 等；手机上常见的是 **Reset Computer** 入口，语义以客户端为准）
5. 等新电脑就绪
6. 最后才 **Reset**（可能丢最近未同步工作）

**Recover / Update** 保留持久文件与登录；**Reset** 回快照。详见[设置 · 电脑](/workbench/settings/computer/)。

排障时先问自己：云端例程是不是还在跑？侧边栏状态是否仍显示工作中？能等就先等一轮 Retry。

## 4. Bot 像卡住

- 看侧边栏与对话里的状态文案。
- 打开电脑，看是否在等页面、审批、登录、CAPTCHA、密钥请求。
- 当前路子不对就发一句短重定向；要结束就明确说停（例如「现在停下来」）。
- 同一屏幕已有 computer-use 任务时，可能要等它结束或先重定向，再开下一件。

若用量耗尽或按需花费触及上限，到账号访问页或 **Usage & Billing**（若有）查看，而不是反复重试同一烧额度的动作。

## 5. 网站反复要登录

1. **Take over** 自己登录
2. 完成二次验证或 CAPTCHA
3. 确认已登录页加载后再交还控制
4. 让 Bot 从当前页继续

不要把密码或验证码贴进普通聊天。有些站点会话短、敏感操作每次都要验证——这不一定能「一劳永逸关掉」。登录态在共享云电脑上对账号下所有 Bot 可见，不需要的站点用完就登出。

## 6. 插件装不上 / 掉线

1. **Connect apps → Your plugins**，确认列在 **Installed**
2. 打开详情页，点重新认证
3. 在浏览器里用**你打算用的那个账号**完成授权
4. 回到 Grok Bot 重试任务
5. 查是否需要组织提供的变量或管理员配置；被策略挡住时可能显示 **Disabled by team admin**

源服务里撤销了授权，就删除插件再连。连接器是账号级的：装一次所有 Bot 都能用，卸一次也要在源服务里撤销。见 [Connectors](/workbench/connectors/)。

## 7. 附件读不了

核对：

- 大小：一般文档 ≤ **25 MB**，视频 ≤ **200 MB**（以官方当时数字为准）
- 桌面一次最多 **6** 个附件
- 未加密、无密码保护（不要为了图省事拆掉违反数据策略的保护）
- 上传完成后再发送
- 类型在支持列表里

怪格式先导出为 PDF / CSV / 纯文本 / 图片。告诉 Bot「每个附件是什么、怎么用」，比丢一堆无名文件更不容易读歪。

## 8. 例程没跑

打开该例程核对：

- 是否启用
- 时间表与**时区**是否正确
- 归属 Bot 是否还在
- 所需插件是否仍登录
- 电脑能否访问源系统
- 用量或账号访问是否被暂停

看运行历史里的失败原因。**Test run** 会做真事（开网页、改文件、调工具）——只用安全输入测。事件触发还要核对频道 / 仓库与匹配规则是否仍有效；宽规则「每条新消息」出问题先关掉，见[新手坑点](/faq/pitfalls/)与 [Routines](/workbench/routines/)。

## 9. 审批卡住或过期

先读提议的目标与参数。卡片已不可操作时：

1. 能拒就拒 / 取消
2. 给 Bot 一条替代指令
3. 让它按纠正后的范围重新生成动作

同一动作反复要批，查 **Settings → General → Bot → Auto-review** 是否命中 **Ask first**（含团队强制规则）。**Ask first** 优先于 **Allow automatically**。

过期卡（约十分钟无人处理）**不会补做动作**；有时提供 **Always allow this in the future**，那只是写入规则，不会重跑那一次。见[安全与审批](/workbench/security/)。

## 10. 本机执行被拒

云电脑与本机权限分开。到 [设置 · 电脑](/workbench/settings/computer/) 或 **Settings → General → Bot → Execution on Local Computer** 查看策略。多机账号在 **Computers** 列表里逐台看 **Execution on this computer**。

无必要保持关闭。需要本机点击或读本地文件时，优先 **Ask every time**；**Always allow** 前先收窄 Auto Review。团队若设了更严上限，成员侧可能选不了 Always allow。场景示例：[本地执行](/start/local-exec/) · [盯额度恢复任务](/scenarios/watch-quota/)。

## 11. App 更新 vs 云电脑更新

| 要更新什么 | 入口 | 会怎样 |
| --- | --- | --- |
| 桌面 / 移动 App | **Settings → Updates → Check for Updates**；就绪则 **Restart to Update** | 更新客户端；**不**重置云电脑 |
| 云电脑镜像 / 环境 | **Settings → Computer → Update Bot's Computer** | 重建云电脑环境；**已装软件包会清掉**，持久文件与登录通常保留（以官方说明为准） |

两者搞混是常见慌点：App 卡住先查更新；环境脏了或工具丢了才 Update Computer；Reset 是最后手段。Update 后记得按技能笔记重装 CLI（见 [box-harness](/scenarios/box-harness/)）。

## 12. 联系支持前收集

- Grok Bot 版本
- 操作系统与版本
- 确切报错原文（别只说「坏了」）
- Bot 或例程名
- 大致时间与时区
- 完整 request / conversation ID（若界面有显示）
- 是否已试 Retry / 重启应用 / Update Bot's Computer，结果如何

把上述清单贴进工单，比来回追问快一轮。若问题出在连接器源服务（例如 GitHub 撤销授权），同时保留源服务侧的审计信息。

## 快速对照：先做哪一步

| 现象 | 先做 | 先别做 |
| --- | --- | --- |
| 登录转圈 | 保持 App 打开、确认浏览器成功、切回 Sign in | 马上 Reset 电脑 |
| 电脑设置中 | 等进度；失败再 Retry → 重启 → Update | 进度还在动就 Reset |
| 电脑不可达 | Retry → 重启 → Recover → Update → 最后 Reset | 跳过 Recover 直接 Reset |
| Bot 无响应 | 看是否在等审批 / 登录 / CAPTCHA | 连续开多个 computer-use |
| 例程静默 | 启用态、时区、插件、运行历史 | 把匹配规则改成「所有消息」 |
| 本机被拒 | 查 Execution on Local Computer | 把密钥贴进聊天「先测一下」 |

延伸阅读：[常见问题](/faq/) · [新手坑点](/faq/pitfalls/) · [设置 · 电脑](/workbench/settings/computer/) · [安全与审批](/workbench/security/) · [Routines](/workbench/routines/) · [本地执行](/start/local-exec/)。

## 复现日期

2026-10-20 按官方 Troubleshooting / Settings / Computer 文档整理。

## 出处说明

步骤顺序与控件名来自 docs.x.ai 的 Troubleshooting 等页；未添加虚构的支持渠道或工单链接。附件大小上限等数字以官方当时页面为准，若产品变更以客户端与文档为准。
