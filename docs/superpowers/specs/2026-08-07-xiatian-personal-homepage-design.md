# Xia Tian 个人主页 — 设计规格

> 日期: 2026-08-07
> 状态: 设计已批准,待实现计划
> 参考: `/Users/xiatian/Desktop/EEGdata/showcase`(技术栈与动画体系来源)

## 1. 项目定位

为 Xia Tian(独立开发者、系统设计者、PleaseEnterYourText 创始人)构建一个单页滚动个人主页。不是"个人介绍",而是塑造**年轻技术创造者、独立研究者、未来科技工作室创始人**的完整叙事。

核心叙事逻辑:
**Xia Tian(个人)→ PleaseEnterYourText(组织)→ Research(思想)→ Projects(创造)→ Vision(未来)**

语言风格:顶级科技公司创始人介绍页 + 独立研究实验室主页 + 开源项目创始人 Profile。

## 2. 已确认的关键决策

| 决策项 | 选择 |
|--------|------|
| 配色 | **纯黑白**(仅黑/白/灰阶,强调色 = 纯白 `#FFFFFF`,辅以反色 chip) |
| 视频背景范围 | **仅 Hero 首屏**(视频内已含巨型主标题,滚出后过渡到 `#050505` 纯暗背景) |
| 中英文 | **中文为主 + 英文 kicker**(章节大标题中文,英文作为上方 mono 小字 kicker) |
| Hero 主标题 | **视频内已做好**,首屏不叠加竞争文字 |
| 项目卡片视觉 | **生成 4 张现代抽象几何纹理封面图(黑白)** |
| PEYT Logo | **纯文字 `>_ PleaseEnterYourText`**(SF Mono,不用图形 SVG) |

## 3. 技术栈

完全对齐 showcase,保证动画体系一致:

- **React 18.3** + **TypeScript 5.6** + **Vite 6**
- **framer-motion 12**(motion / useScroll / useTransform / useSpring / useVelocity / useMotionTemplate / useReducedMotion)
- **CSS Modules**(每组件一个 `.module.css`)
- 设计 token 体系(`tokens.css` + `global.css`)
- 单页滚动,无路由
- `prefers-reduced-motion` 全局尊重

复用 showcase 的 hooks:`useScrollReveal`、`useCountUp`、`useTypewriter`。
复用组件骨架:`ScrollProgress`、`SectionDots`、`Nav`、`ChapterMark`。

## 4. 设计 Token(纯黑白改造)

基于 showcase `tokens.css`,将生物电青替换为纯白:

```css
:root {
  --canvas: transparent;              /* Hero 透明露出视频 */
  --page-bg: #050505;                 /* 内容区近黑 */
  --surface-elevated: rgba(20, 20, 22, 0.6);
  --surface-2: #1A1A1A;
  --hairline: rgba(255, 255, 255, 0.1);

  /* Brand accent — 纯白(替换原 #32D8E0)*/
  --accent: #FFFFFF;
  --accent-glow: rgba(255, 255, 255, 0.2);
  --accent-dim: rgba(255, 255, 255, 0.08);

  /* Text hierarchy */
  --text-primary: #F5F5F7;
  --text-secondary: #A1A1A6;
  --text-tertiary: #6E6E73;

  /* Typography — 沿用 */
  --font-display: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  --font-text: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  --font-mono: 'SF Mono', 'JetBrains Mono', ui-monospace, monospace;

  /* Type scale — Apple 9 级,沿用 */
  --text-hero: 96px; --text-display: 72px; --text-title: 48px;
  --text-headline: 32px; --text-body: 17px; --text-caption: 14px;

  /* Spacing 8px grid,沿用 */
  --space-1..7: 8/16/24/32/48/64/96px;

  /* Layout */
  --container-wide: 1440px;
  --container-narrow: 760px;

  /* Motion — 沿用 */
  --ease-apple: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-slow: 0.8s; --duration-medium: 0.4s; --duration-fast: 0.2s;

  color-scheme: dark;
}
```

强调层次策略(B&W 下避免单调):
1. **纯白 `#FFFFFF`**:章节竖线、stat 数值、mono 技术栈字、链接 hover。
2. **反色 chip**(白底 `#FFFFFF` + 黑字 `#000000`):kicker 标签、项目 tag、关键 chip。PEYT logo 不包裹 chip(见 §7.04)。
3. **字号 + 字重 + mono**:用字体差异(显示体 vs mono)区分层次,而非颜色。
4. **引言块**:左侧 2px 白色竖线 + 大号 display 体 + 略亮字色。

响应式断点沿用 showcase:`1024 / 768 / 640`。

## 5. 章节结构(12 章)

| # | section id | 中文标题 | 英文 kicker | 布局 | 核心动画 |
|---|-----------|---------|------------|------|---------|
| 01 | `hero` | — | — | 全屏视频 | 视频视差 + 底部渐隐入 `#050505` + scroll hint |
| 02 | `intro` | Xia Tian | INTRO | narrow 容器 | 5 领域逐行 blur 揭示 + 信条 blockquote |
| 03 | `philosophy` | 哲学 | PHILOSOPHY | narrow | "面对复杂系统…" 逐行滚动揭示(opacity+y+blur) |
| 04 | `studio` | 工作室 | STUDIO | wide | `>_ PleaseEnterYourText` 反色标记 + 范式演变引言 |
| 05 | `mission` | 使命 | MISSION | wide | 4 项探索 grid + 三行结论强调 |
| 06 | `research` | 研究方向 | RESEARCH | wide | 3 子方向分栏(AI Native / Open Comm / Human Intelligence) |
| 07 | `projects` | 项目 | PROJECTS | wide | 4 卡网格(黑白抽象封面 + 文字) |
| 08 | `engineering` | 工程 | ENGINEERING | TwoCol | 理念陈述 + 4 设计支柱列表 |
| 09 | `stack` | 技术栈 | STACK | wide | Languages / Fields 双列 MonoTable |
| 10 | `beyond` | 技术之外 | BEYOND CODE | wide | 兴趣流式标签 + 工程/艺术/科学三行收束 |
| 11 | `vision` | 愿景 | VISION | wide | 大号居中结论卡(复用 Studio conclusion 模式) |
| 12 | `footer` | — | — | wide | `>_ PleaseEnterYourText` + Xia Tian 署名 |

### Nav 顶部链接(6 项)
`首页 / 哲学 / 工作室 / 研究 / 项目 / 愿景` → `#hero / #philosophy / #studio / #research / #projects / #vision`

### SectionDots 右侧
覆盖全部 12 章,带 `aria-label`。

## 6. Hero 视频处理(VideoHero 组件)

- `<video className={styles.video} src="/Xiatian.mp4" autoPlay muted loop playsInline>` 全屏(文件位于 `public/Xiatian.mp4`)。
- `position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0`。
- **不叠加任何竞争文字**(视频内已含巨型主标题)。
- 底部 `scroll hint`:居中"向下滚动"+ 1px 渐隐线,`position: absolute; bottom: 48px`。
- 视频底部叠加线性渐变 `linear-gradient(to bottom, transparent 60%, var(--page-bg) 100%)`,使视频底边平滑过渡到页面底色。
- 滚动驱动(framer-motion `useScroll` target=hero):
  - `scale: [1, 1.08]`(微放大)
  - `y: [0, 60]`(视差)
  - 顶部暗色遮罩 `opacity: [0, 0.6]` 淡入(增强"溶解"感)
  - `scroll hint` opacity `[1, 0]`(在前 30% 滚动内淡出)
- `prefers-reduced-motion`:禁用视差与遮罩,视频静态全屏。

## 7. 各章节内容映射与组件

### 02 Intro — Xia Tian
- `ChapterMark num="02" title="Intro"`
- 大标题:`探索智能、系统与人类创造力的交汇点`
- 正文:`我是一名独立开发者、系统设计者与技术探索者。` + `我关注软件、人工智能与人类认知之间的深层连接…`
- **横跨 5 领域**(逐行 blur 揭示,复用 Premise line-by-line 模式):人工智能与智能体系统 / 分布式通信架构 / 跨平台软件工程 / 人机交互设计 / 脑科学与计算认知
- **信条 blockquote**(白竖线 + display 体):
  > 技术的价值不仅在于解决已有问题,而在于重新定义未来的问题边界。

### 03 Philosophy — 哲学
- `ChapterMark num="03" title="Philosophy"`
- 标题:`From First Principles` 作英文副标,中文大标题:`从第一性原理出发`
- 逐行滚动揭示(复用 Premise):`面对一个复杂系统,我不会只关注它当前的实现,而会追问:它为什么这样存在?它解决的本质问题是什么?如果从零开始设计,是否能够构建更优雅、更开放、更强大的结构?`
- 探索方向列表(4 项,错峰入场):更开放的信息基础设施 / 更智能的软件系统 / 更自然的人机协作方式 / 更强大的创造工具

### 04 Studio — PleaseEnterYourText
- `ChapterMark num="04" title="Studio"`
- 文字标记:`>_ PleaseEnterYourText`(SF Mono,`>_` 纯白、`PleaseEnterYourText` 用 `--text-primary`;整体不包裹 chip,直接呈现在深色背景上)
- 英文副标:`Independent Technology Studio`
- 中文大标题:`构建面向未来的软件与智能系统`
- 正文 + 引言:
  > 每一次计算范式的变化,都会重新定义人与技术之间的连接方式。
- 范式演变说明:个人计算机 → 移动互联网 → 人工智能时代,软件从被动工具演变为主动协作者。

### 05 Mission — 使命
- `ChapterMark num="05" title="Mission"`
- 英文副标:`Build The Future of Digital Creation`
- 中文大标题:`构建数字创造的未来`
- 4 项探索 grid(2×2):信息如何更加自由地流动 / 人与机器如何更加自然地协作 / 个体如何拥有更强大的创造能力 / 软件如何成为人类认知的延伸
- 三行结论强调:连接人与智能的系统 / 增强创造力的工具 / 面向未来的软件基础设施

### 06 Research — 研究方向
- `ChapterMark num="06" title="Research"`
- 3 子方向分栏(垂直堆叠,每子方向带子 ChapterMark 风格的小标记):
  1. **AI Native Software** — 从工具到智能伙伴。焦点列表(mono chips):AI Agent 架构 / 长期记忆系统 / 自主任务规划 / 多智能体协作 / 人机协同工作流
  2. **Open Communication** — 重新思考互联网连接方式。焦点:去中心化身份体系 / 开放通信协议 / 用户数据自主控制 / 可扩展社区生态
  3. **Human Intelligence Computing** — 探索人类认知与机器智能的连接。焦点:脑电信号分析 / 心流状态研究 / 认知过程建模 / 人机交互优化

### 07 Projects — 项目
- `ChapterMark num="07" title="Projects"`
- 4 卡网格(响应式:4 列 → 2 列 → 1 列)。每卡:
  - 黑白抽象封面图(`<img>`,lazy)
  - tag(反色 chip):通信实验 / Minecraft 生态 / AI Agent / 脑科学
  - 项目名(显示体)
  - 描述(secondary)
  - tech(mono,纯白)
- 4 项目:
  1. **PEYT Chat** — 下一代开放通信实验。tag:通信实验。tech:IM · 频道 · Bot · 开发者生态
  2. **BonNext** — Modern Minecraft Ecosystem。tag:Minecraft 生态。tech:Rust · 跨平台 · 模块化
  3. **Continuum** — Long-Term AI Agent Architecture。tag:AI Agent。tech:长期记忆 · 状态管理 · 持续学习
  4. **Brain Computing Research** — Understanding Human Cognition Through Data。tag:脑科学。tech:EEG · 机器学习 · 认知建模

### 08 Engineering — 工程
- `ChapterMark num="08" title="Engineering"`
- TwoCol 布局:
  - 左:大号理念陈述 `Technology Should Be Invisible, But Its Impact Should Be Obvious.` + 中文 `技术应当隐形,但其影响应当显著。`
  - 右:4 设计支柱列表(错峰入场):极简主义 / 工业设计语言 / 未来科技美学 / 高性能交互体验
- 收束句:`复杂的系统应该拥有简单的表达。`

### 09 Stack — 技术栈
- `ChapterMark num="09" title="Stack"`
- 双列 MonoTable:
  - **Languages**:Rust / TypeScript / Python / C++ / Java
  - **Fields**:Distributed Systems / Artificial Intelligence / Agent Architecture / Desktop Applications / Human Computer Interaction / Neuroscience Computing / Developer Tools

### 10 Beyond — 技术之外
- `ChapterMark num="10" title="Beyond Code"`
- 兴趣流式标签(inline,mono chips):古典音乐与钢琴 / 电子游戏创造生态 / 视觉设计 / 科学探索 / 新兴技术趋势
- 三行收束(显示体,错峰):`工程给予结构,艺术给予表达,科学给予方向。`
- 引言:`我相信创造力来自不同领域之间的连接。`

### 11 Vision — 愿景
- `ChapterMark num="11" title="Vision"`
- 英文副标:`Building The Next Layer of Computing`
- 结论卡(复用 Studio conclusion 模式,白边框 + 渐变背景):
  - kicker:`VISION`
  - 大标题:`未来的软件不会只是工具。`
  - 三行强调:人类认知的延伸 / 创造力的放大器 / 人与世界连接的新接口
  - 收束:`PleaseEnterYourText 希望成为探索这一未来的一部分。` + `通过代码、系统与思想,构建下一代数字世界。`

### 12 Footer
- `>_ PleaseEnterYourText` 大号 mono 标记
- `Xia Tian`
- `Founder of PleaseEnterYourText`
- `Independent Developer · System Builder · Future Explorer`

## 8. 复用与新建组件

**直接复用**(从 showcase 拷贝,仅调 token):
- `ScrollProgress.tsx`(无样式依赖,直接用)
- `SectionDots.tsx` + `.module.css`
- `Nav.tsx` + `.module.css`(改链接 + logo 为文字 `>_ PleaseEnterYourText`)
- `ChapterMark.tsx` + `.module.css`(total 改为 12)
- hooks:`useScrollReveal`、`useCountUp`、`useTypewriter`

**新建**:
- `VideoHero.tsx` + `.module.css`(视频背景 + 视差 + scroll hint)
- `Blockquote.tsx` + `.module.css`(白竖线引言块)
- `MonoTable.tsx` + `.module.css`(双列 mono 表,参考 showcase MonoTable)
- `TwoCol.tsx` + `.module.css`(两栏布局)

## 9. 项目封面图(GenerateImage 生成,4 张)

纯黑白抽象几何纹理,无文字,16:10:

1. `projects/peyt-chat.png` — 通信网络:交织线条与节点 mesh,密集网络拓扑,高对比黑白
2. `projects/bonnext.png` — 模块生态:等距立方网格、堆叠方块,几何模块化,B&W
3. `projects/continuum.png` — 长期记忆:连续流线、层叠时间地层、波形延续,B&W
4. `projects/brain-computing.png` — 神经信号:脑电波形震荡、信号痕迹、振荡线条,B&W

生成后存放 `public/projects/`。

## 10. 文件结构

```
个人主页/
├── Xiatian.mp4                         # 移入 public/
├── public/
│   ├── Xiatian.mp4
│   └── projects/
│       ├── peyt-chat.png
│       ├── bonnext.png
│       ├── continuum.png
│       └── brain-computing.png
├── src/
│   ├── components/
│   │   ├── ChapterMark.tsx + .module.css
│   │   ├── Nav.tsx + .module.css
│   │   ├── ScrollProgress.tsx
│   │   ├── SectionDots.tsx + .module.css
│   │   ├── VideoHero.tsx + .module.css
│   │   ├── Blockquote.tsx + .module.css
│   │   ├── MonoTable.tsx + .module.css
│   │   └── TwoCol.tsx + .module.css
│   ├── hooks/
│   │   ├── useScrollReveal.ts
│   │   ├── useCountUp.ts
│   │   └── useTypewriter.ts
│   ├── sections/
│   │   ├── Hero.tsx + .module.css
│   │   ├── Intro.tsx + .module.css
│   │   ├── Philosophy.tsx + .module.css
│   │   ├── Studio.tsx + .module.css
│   │   ├── Mission.tsx + .module.css
│   │   ├── Research.tsx + .module.css
│   │   ├── Projects.tsx + .module.css
│   │   ├── Engineering.tsx + .module.css
│   │   ├── TechStack.tsx + .module.css
│   │   ├── BeyondCode.tsx + .module.css
│   │   ├── Vision.tsx + .module.css
│   │   └── Footer.tsx + .module.css
│   ├── styles/
│   │   ├── tokens.css
│   │   └── global.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

`App.tsx` 结构:SceneBackground 替换为 `VideoHero`(仅 Hero);`bg-veil` 改为简单的 `page-bg` 固定 `#050505`;其余按 12 章顺序渲染 `ScrollProgress / Nav / SectionDots / main / Footer`。

## 11. 验收标准

- `npm run dev` 启动,首屏视频自动播放(muted),巨型主标题来自视频本身。
- 滚动后视频平滑过渡到 `#050505`,内容区全程纯黑白,无任何彩色。
- 12 章节全部按内容稿呈现,中文为主、英文 kicker,无遗漏段落。
- 4 张项目封面图为黑白抽象几何,加载 lazy。
- `>_ PleaseEnterYourText` 出现在 Nav 与 Footer。
- 所有动画在 `prefers-reduced-motion` 下降级为静态。
- `npm run build` 通过 TypeScript 编译,无类型错误。
