# Grok Bot 官方头像来源

参照官网 `https://x.ai/bot`，读取日期 2026-10-21。官方视觉资源及逻辑的原始权利归其原作者；本站 Vue 生命周期适配与原有教程内容分开记录。

## 动画引擎

- 原始公开资源：`https://x.ai/_next/static/chunks/2y8az2mskx745.js?dpl=fabb8ffa2c56c81156c79a8aeeb35a2c0a350618`
- 原始文件 SHA-256：`b2a00a431f0eb207837af4b05a7249c92b538aebe9bcc6958895795dc9811a34`
- 本地文件：`official-core.js`。
- 保留原始的几何、眼睛轮廓、表情、运动轨道、弹簧插值、状态导演、SVG 输出及属性更新函数。
- 去掉 Turbopack 模块注册、Sentry 元数据与 React 生命周期包装；不加载官方分析或广告脚本，也不依赖官方线上脚本运行。
- 导出边界对应原始 `GrokBotEngineMark` 包装函数内的 motion 构造函数、director 构造函数、SVG 渲染函数和 DOM 属性更新函数；不重新绘制形状、不重写动画曲线。

## 尺寸与播放

- 官网包装逻辑：`https://x.ai/_next/static/chunks/31e5squombatv.js?dpl=fabb8ffa2c56c81156c79a8aeeb35a2c0a350618`。
- 使用官网 `ENGINE_FILL = 0.92`；引擎默认 sprite 填充率 `0.6`，外层 sprite 取 `0.92 / 0.6 = 153.333333%`，居中显示。
- 基础尺寸仍为 16 / 26 / 44 / 72 / 128 px。用户随后要求放大导航及首页：导航为桌面 40px / 手机 34px，首页卡片为 60px，顶部头像组为 82 / 52 / 140 / 52 / 82px；其他页面保持基础尺寸。始终以官方内部比例适配。
- 与官网一样，48 px 以下使用 compact idle 轨道；每个实例用独立 seed。官网随机轨道选择意味着不同实例不会逐帧同步。
- 保留官方 `idle` 状态的完整运动；不混入原来的 CSS 呼吸、果冻或跳跃动画。
- Vue 适配负责减少动态效果、离屏与后台暂停、尺寸变化及卸载清理；悬停沿用本站既有触发容器，调用官方 gaze 接口。
- 静态 logo/favicon 为同一引擎生成的官方静止帧；浏览器标签图标保持静止。

## 颜色

官方头像配色表来自 `https://x.ai/_next/static/chunks/1-irxcame1x4v.js?dpl=fabb8ffa2c56c81156c79a8aeeb35a2c0a350618` 的 `avatarColor` 导出。

| 本站 Bot | 官方颜色 | 官方形状 |
| --- | --- | --- |
| 小夜 | magenta `#EB4699` | cloud |
| 码初 | blue `#3C82F6` | hex |
| 晨号 | yellow `#F19D38` | sphere |
| 批签 | 默认黑色 `#0A0A0A` | squircle |
| 拾纸 | cyan `#54B9A6` | teardrop |
| 账青 | green `#5BC67A` | capsule |

本站 Bot 名称与职责保持原样。上表是本站角色到官方视觉变体的选择，并不声称这些中文角色来自官网。
