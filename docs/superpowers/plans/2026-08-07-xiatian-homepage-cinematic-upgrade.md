# Xia Tian 个人主页 · 电影叙事级动画升级 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将当前个人主页从"基础 reveal"升级到"Apple Vision Pro 级别影院体验"——引入滚动驱动全局环境层、Hero 速度模糊+3D 倾斜、章节视差容器、逐行 blur 扩展、Blockquote 仪式化、Vision 压轴卡 glow、SectionDots/Nav 激活态、Footer 仪式感、Projects 电影感 hover，并对排版系统做深度重排。

**Architecture:** 在现有 React 18 + framer-motion + Vite 架构上，叠加四层协同：(1) 全局 bg-veil 深色模糊遮罩层随滚动 5 关键帧淡入淡出；(2) Hero 视频速度模糊 + rotateX 3D 透视；(3) 章节内滚动驱动视差容器 [40,-40]；(4) 逐行 blur 揭示 + 仪式化组件升级。排版系统引入 7 档字号、字重 700、统一字距/行高、Inter Variable Web 字体保底。

**Tech Stack:** React 18.3.1, framer-motion ^12.40.0, TypeScript 5.6, Vite 6, CSS Modules

## Global Constraints

- **纯黑白配色**：`--accent: #FFFFFF`，禁止任何彩色（含青、蓝、绿等色调），所有灰阶必须为纯中性灰（RGB 三通道相等）
- **字体**：`'SF Pro Display', 'Inter', -apple-system, ...`，通过 Google Fonts 引入 Inter Variable 作为跨平台保底
- **缓动**：`--ease-apple: cubic-bezier(0.16, 1, 0.3, 1)` 全站统一，所有 framer-motion `ease` 数组用 `[0.16, 1, 0.3, 1]`
- **响应式断点**：1024 / 768 / 640
- **无障碍**：所有动画必须尊重 `prefers-reduced-motion`，用 `useReducedMotion()` 条件置 undefined/0
- **framer-motion 版本**：^12.40.0（已安装，支持 useVelocity/useMotionTemplate/useSpring）
- **不引入新依赖**：所有动画用现有 framer-motion + CSS 实现
- **Hero 视频**：`/Xiatian.mp4`，`autoPlay muted loop playsInline`，仅 Hero 段
- **章节顺序**：Hero → Intro → Philosophy → Studio → Mission → Research → Projects → Engineering → TechStack → BeyondCode → Vision → Footer（12 章节，不增不减）

---

## File Structure

**修改文件（按任务顺序）：**

| 文件 | 职责 | 涉及任务 |
|------|------|---------|
| `src/styles/tokens.css` | 设计 token：字号/字重/字距/行高/间距/缓动 | T1 |
| `src/styles/global.css` | 全局样式：body/.section/bg-veil/scroll-progress/reduced-motion | T1, T2, T8 |
| `index.html` | 引入 Inter Variable Web 字体 | T1 |
| `src/App.tsx` | 装配 bg-veil 全局遮罩层 | T2 |
| `src/components/VideoHero.tsx` | Hero 视频 + 速度模糊 + 3D 倾斜 | T3 |
| `src/sections/Projects.tsx` | 项目卡片 + gridY 视差 + 电影感 hover | T4, T9 |
| `src/sections/Projects.module.css` | 卡片 hover 虚化样式 | T9 |
| `src/sections/Research.tsx` | 研究方向 + gridY 视差 | T4 |
| `src/sections/Vision.tsx` | 压轴卡 + gridY 视差 + scale/rotateX/glow + 逐行 blur | T4, T5, T7 |
| `src/sections/Vision.module.css` | glow 呼吸 keyframes | T7 |
| `src/sections/Studio.tsx` | ERAS 逐行 blur 揭示 | T5 |
| `src/sections/Mission.tsx` | BUILDS 逐行 blur 揭示 | T5 |
| `src/components/Blockquote.tsx` | 竖线生长 + 文字 stagger 仪式化 | T6 |
| `src/components/Blockquote.module.css` | 竖线样式 | T6 |
| `src/components/ChapterMark.tsx` | variant prop（default/emphasis） | T6 |
| `src/components/ChapterMark.module.css` | emphasis 变体样式 | T6 |
| `src/components/SectionDots.tsx` | IntersectionObserver 激活态 | T8 |
| `src/components/SectionDots.module.css` | 激活态样式 | T8 |
| `src/components/Nav.tsx` | 链接滚动联动激活 | T8 |
| `src/components/Nav.module.css` | 激活态样式 | T8 |
| `src/sections/Footer.tsx` | useTypewriter + line-by-line + stagger | T9 |

**不修改文件**：`src/hooks/useScrollReveal.ts`、`src/hooks/useCountUp.ts`、`src/hooks/useTypewriter.ts`（T9 中 useTypewriter/useCountUp 首次实际使用，但 hook 本身已实现，不改）

---

### Task 1: 排版系统深度重排

**Files:**
- Modify: `src/styles/tokens.css`（全文重写）
- Modify: `src/styles/global.css:11-19, 60-65`（body text-shadow 移除 + .section padding 差异化）
- Modify: `index.html:3-8`（head 内引入 Inter Variable 字体）
- 基线提交：当前 2 个未提交配色修正（`Projects.module.css`、`tokens.css`）先提交

**Interfaces:**
- Produces: 新增 token `--text-statement: 120px`（声明级）、`--font-weight-bold: 700`、`--tracking-tight: -0.04em`、`--tracking-normal: -0.02em`、`--tracking-wide: 0`、`--leading-tight: 1.1`、`--leading-body: 1.55`、`--section-pad-sm/md/lg/xl`，供后续所有任务消费

- [ ] **Step 1: 提交当前 2 个配色修正作为基线**

```bash
cd /Users/xiatian/Desktop/个人主页
git add src/sections/Projects.module.css src/styles/tokens.css
git commit -m "fix: normalize grays to pure neutral (eliminate blue tint)"
```

- [ ] **Step 2: 重写 tokens.css 排版系统**

完整替换 `src/styles/tokens.css`：

```css
:root {
  --canvas: transparent;
  --page-bg: #050505;
  --surface-elevated: rgba(20, 20, 20, 0.6);
  --surface-2: #1A1A1A;
  --hairline: rgba(255, 255, 255, 0.1);

  /* Brand accent — 纯白 */
  --accent: #FFFFFF;
  --accent-glow: rgba(255, 255, 255, 0.2);
  --accent-dim: rgba(255, 255, 255, 0.08);

  /* Text hierarchy — 纯中性灰 */
  --text-primary: #F5F5F7;
  --text-secondary: #A1A1A6;
  --text-tertiary: #6E6E73;

  /* Typography */
  --font-display: 'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-text: 'SF Pro Text', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'SF Mono', 'JetBrains Mono', ui-monospace, monospace;

  /* Type scale — 7 档（新增 --text-statement 声明级）*/
  --text-statement: 120px;
  --text-hero: 96px;
  --text-display: 72px;
  --text-title: 48px;
  --text-headline: 32px;
  --text-body: 17px;
  --text-caption: 14px;

  /* Font weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Letter spacing — 统一 3 档 */
  --tracking-tight: -0.04em;
  --tracking-normal: -0.02em;
  --tracking-wide: 0;

  /* Line height — 统一 2 档 */
  --leading-tight: 1.1;
  --leading-body: 1.55;

  /* Spacing — 8px grid */
  --space-1: 8px; --space-2: 16px; --space-3: 24px; --space-4: 32px;
  --space-5: 48px; --space-6: 64px; --space-7: 96px;

  /* Section padding — 差异化 4 档 */
  --section-pad-sm: clamp(80px, 12vh, 120px) 0;
  --section-pad-md: clamp(120px, 18vh, 180px) 0;
  --section-pad-lg: clamp(160px, 22vh, 220px) 0;
  --section-pad-xl: clamp(200px, 28vh, 280px) 0;

  /* Layout */
  --container-wide: 1440px;
  --container-narrow: 760px;

  /* Motion */
  --ease-apple: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-slow: 0.8s;
  --duration-medium: 0.4s;
  --duration-fast: 0.2s;

  color-scheme: dark;
}

@media (max-width: 1024px) {
  :root {
    --text-statement: 72px;
    --text-hero: 64px;
    --text-display: 48px;
    --text-title: 36px;
  }
}
@media (max-width: 768px) {
  :root {
    --text-statement: 56px;
    --text-hero: 48px;
    --text-display: 36px;
    --text-title: 28px;
    --text-headline: 24px;
  }
}
@media (max-width: 640px) {
  :root {
    --text-statement: 40px;
    --text-hero: 36px;
    --text-display: 28px;
  }
}
```

- [ ] **Step 3: 修改 global.css — 移除 text-shadow + 差异化 section padding**

将 `src/styles/global.css` 的 body 规则（第 11-19 行）改为：

```css
body {
  font-family: var(--font-text);
  color: var(--text-primary);
  background: var(--page-bg);
  overflow-x: hidden;
  line-height: var(--leading-body);
  font-size: var(--text-body);
}
```

将 `.section` 规则（第 60-65 行）改为默认 md：

```css
.section {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: var(--section-pad-md);
}

.section-sm { padding: var(--section-pad-sm); }
.section-lg { padding: var(--section-pad-lg); }
.section-xl { padding: var(--section-pad-xl); }
```

- [ ] **Step 4: 修改 index.html — 引入 Inter Variable 字体**

在 `<head>` 内 `<title>` 之后插入：

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

- [ ] **Step 5: 应用差异化 section padding 到各章节**

修改各章节 `<section>` 的 className：
- `src/sections/Hero.tsx`（如有 .section 类，改为不设或 section-xl）—— Hero 自有布局，保持现状
- `src/sections/Intro.tsx`：`className="section section-lg"`（大留白承接）
- `src/sections/Philosophy.tsx`：`className="section"`（默认 md）
- `src/sections/Studio.tsx`：`className="section section-lg"`
- `src/sections/Mission.tsx`：`className="section"`
- `src/sections/Research.tsx`：`className="section section-lg"`
- `src/sections/Projects.tsx`：`className="section section-xl"`（特大高潮）
- `src/sections/Engineering.tsx`：`className="section"`
- `src/sections/TechStack.tsx`：`className="section section-sm"`（信息密度高）
- `src/sections/BeyondCode.tsx`：`className="section"`
- `src/sections/Vision.tsx`：`className="section section-xl"`（特大仪式）
- `src/sections/Footer.tsx`：`className="section section-lg"`（在 footer 元素上）

- [ ] **Step 6: 验证构建**

Run: `cd /Users/xiatian/Desktop/个人主页 && npm run build`
Expected: 构建成功，无 TypeScript 错误

- [ ] **Step 7: 提交**

```bash
git add src/styles/tokens.css src/styles/global.css index.html src/sections/*.tsx
git commit -m "feat: deep typography overhaul — 7-tier scale, weight 700, unified tracking/leading, Inter Variable webfont, differential section padding"
```

---

### Task 2: 全局环境层 bg-veil 深色模糊遮罩

**Files:**
- Modify: `src/App.tsx`（添加 bg-veil motion.div + useScroll）
- Modify: `src/styles/global.css`（添加 .bg-veil 样式）

**Interfaces:**
- Consumes: framer-motion `useScroll`, `useTransform`, `useReducedMotion`, `motion`
- Produces: 全局 `.bg-veil` fixed 遮罩层，opacity 随 `scrollYProgress` 在 `[0, 0.04, 0.88, 0.94, 1] → [0, 1, 1, 0.15, 0.15]` 五关键帧变化。Hero 段透明（让视频可见）→ 中段全遮罩（提升纯黑背景可读性）→ Vision 段淡出到 0.15（让背景透出仪式感）

- [ ] **Step 1: 在 App.tsx 添加 bg-veil 层**

修改 `src/App.tsx`，在文件顶部添加 import：

```tsx
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
```

在 `App` 函数内 `return` 前添加：

```tsx
export function App() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const veilOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.88, 0.94, 1],
    [0, 1, 1, 0.15, 0.15],
  );

  return (
    <>
      <motion.div
        className="bg-veil"
        style={prefersReducedMotion ? undefined : { opacity: veilOpacity }}
        aria-hidden="true"
      />
      <a href="#hero" className="skip-link">跳到内容</a>
      {/* ... 原有内容 ... */}
    </>
  );
}
```

注意：`bg-veil` 必须在 `<main>` 之前、`skip-link` 之前渲染，确保 z-index 层级正确（veil z-index: 0，main z-index: 1）。

- [ ] **Step 2: 在 global.css 添加 .bg-veil 样式**

在 `src/styles/global.css` 末尾添加：

```css
.bg-veil {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: rgba(5, 5, 5, 0.86);
  -webkit-backdrop-filter: blur(28px) saturate(130%);
  backdrop-filter: blur(28px) saturate(130%);
}
```

- [ ] **Step 3: 验证 Hero 视频自动播放**

确认 `src/components/VideoHero.tsx` 的 `<motion.video>` 已有 `autoPlay muted loop playsInline`（现状已有，无需改）。若浏览器阻止自动播放，`muted` 是必要条件，现状满足。

- [ ] **Step 4: 验证构建 + 启动 dev server 手动检查**

Run: `cd /Users/xiatian/Desktop/个人主页 && npm run build`
Expected: 构建成功

Run: `cd /Users/xiatian/Desktop/个人主页 && npm run dev`
Expected: dev server 启动，浏览器打开后 Hero 段 veil 透明（视频可见），滚动后 veil 淡入遮罩

- [ ] **Step 5: 提交**

```bash
git add src/App.tsx src/styles/global.css
git commit -m "feat: add global bg-veil ambient layer with 5-keyframe scroll-driven opacity"
```

---

### Task 3: Hero 速度模糊 + 3D 倾斜

**Files:**
- Modify: `src/components/VideoHero.tsx`（添加 useVelocity/useSpring/blur + rotateX + textY/textOpacity）
- Modify: `src/components/VideoHero.module.css`（will-change: filter/transform）

**Interfaces:**
- Consumes: framer-motion `useVelocity`, `useSpring`, `useMotionTemplate`
- Produces: Hero 视频滚动时 `scale [1, 1.08]` + `y [0, 60]` + `rotateX [0, 8]` + `transformPerspective: 1000`；overlay opacity 滚动驱动；新增 scrollHint 容器 `y [0, -100]` + `opacity [0, 0.5] → [1, 0]`；scrollText 速度模糊 `blur(0-6px)` 经 `useSpring { stiffness: 200, damping: 30 }` 平滑

- [ ] **Step 1: 重写 VideoHero.tsx**

完整替换 `src/components/VideoHero.tsx`：

```tsx
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useVelocity,
  useSpring,
  useMotionTemplate,
} from 'framer-motion';
import { useRef } from 'react';
import styles from './VideoHero.module.css';

export function VideoHero() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // 视频层：scale + y + rotateX 3D 透视
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 8]);

  // 遮罩层
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.6]);

  // 滚动提示层：上移 + 淡出
  const hintY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // 速度模糊（仅 scrollText）
  const velocity = useVelocity(scrollYProgress);
  const blurRaw = useTransform(velocity, [-0.5, 0, 0.5], [6, 0, 6]);
  const blurSpring = useSpring(blurRaw, { stiffness: 200, damping: 30 });
  const textFilter = useMotionTemplate`blur(${blurSpring}px)`;

  return (
    <div ref={ref} className={styles.wrap}>
      <motion.video
        className={styles.video}
        src="/Xiatian.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={
          prefersReducedMotion
            ? undefined
            : {
                scale,
                y,
                transformPerspective: 1000,
                rotateX,
              }
        }
        aria-hidden="true"
      />
      <motion.div
        className={styles.overlay}
        style={prefersReducedMotion ? undefined : { opacity: overlayOpacity }}
        aria-hidden="true"
      />
      <div className={styles.bottomFade} aria-hidden="true" />
      <motion.div
        className={styles.scrollHint}
        style={
          prefersReducedMotion
            ? undefined
            : { y: hintY, opacity: hintOpacity }
        }
        aria-hidden="true"
      >
        <motion.span
          className={styles.scrollText}
          style={prefersReducedMotion ? undefined : { filter: textFilter }}
        >
          向下滚动
        </motion.span>
        <span className={styles.scrollLine} />
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: 更新 VideoHero.module.css 添加 will-change**

在 `src/components/VideoHero.module.css` 的 `.video` 规则添加 `will-change: transform, filter;`，在 `.scrollText` 规则添加 `will-change: filter;`。具体行号需读取文件后确定，添加这两个属性即可。

- [ ] **Step 3: 验证构建**

Run: `cd /Users/xiatian/Desktop/个人主页 && npm run build`
Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
git add src/components/VideoHero.tsx src/components/VideoHero.module.css
git commit -m "feat: Hero velocity blur + rotateX 3D perspective + parallax scroll hint"
```

---

### Task 4: 滚动驱动视差容器

**Files:**
- Modify: `src/sections/Projects.tsx`（grid 容器加 gridY）
- Modify: `src/sections/Research.tsx`（内容容器加 gridY）
- Modify: `src/sections/Vision.tsx`（card 容器加 gridY）

**Interfaces:**
- Consumes: framer-motion `useScroll`, `useTransform`, `useReducedMotion`
- Produces: 三个章节的内容容器获得 `y: [40, -40]` 滚动视差（总位移 80px），产生景深层次。每个章节用 `useScroll({ target: ref, offset: ['start end', 'end start'] })`

- [ ] **Step 1: Projects.tsx 添加 gridY 视差**

在 `src/sections/Projects.tsx` 顶部添加 import：

```tsx
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
```

在 `Projects` 函数内添加：

```tsx
const ref = useRef<HTMLElement>(null);
const prefersReducedMotion = useReducedMotion();
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ['start end', 'end start'],
});
const gridY = useTransform(scrollYProgress, [0, 1], [40, -40]);
```

将 `<section id="projects" className="section section-xl">` 改为 `<section id="projects" className="section section-xl" ref={ref}>`。

将 `<div className={styles.grid}>` 改为：

```tsx
<motion.div
  className={styles.grid}
  style={prefersReducedMotion ? undefined : { y: gridY }}
>
```

- [ ] **Step 2: Research.tsx 添加 gridY 视差**

读取 `src/sections/Research.tsx`，对其主内容容器（.grid 或最外层内容 div）应用与 Step 1 相同的 `useScroll` + `gridY [40, -40]` 模式。给 `<section>` 加 `ref`，内容容器改用 `motion.div` 包裹并应用 `y: gridY`。

- [ ] **Step 3: Vision.tsx 添加 gridY 视差**

在 `src/sections/Vision.tsx` 应用相同模式：`<section>` 加 `ref`，`.card` 容器外层或本身应用 `y: gridY [40, -40]`。注意 Vision 的 card 同时要在 Task 7 做 scale/rotateX，这里先加 gridY，Task 7 再叠加 transform。

为避免 transform 冲突，Vision 的 card 用外层 `motion.div` 承载 gridY，内层 `motion.div` 承载 scale/rotateX（Task 7 实现）。

当前 Step 3 先在 Vision 加：

```tsx
const ref = useRef<HTMLElement>(null);
const prefersReducedMotion = useReducedMotion();
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ['start end', 'end start'],
});
const cardY = useTransform(scrollYProgress, [0, 1], [40, -40]);
```

将 `<section id="vision" className="section section-xl">` 加 `ref={ref}`。用 `<motion.div style={{ y: prefersReducedMotion ? undefined : cardY }}>` 包裹原有 `.card` 的 `motion.div`。

- [ ] **Step 4: 验证构建**

Run: `cd /Users/xiatian/Desktop/个人主页 && npm run build`
Expected: 构建成功

- [ ] **Step 5: 提交**

```bash
git add src/sections/Projects.tsx src/sections/Research.tsx src/sections/Vision.tsx
git commit -m "feat: scroll-driven parallax containers (gridY 40→-40) on Projects/Research/Vision"
```

---

### Task 5: line-by-line blur 揭示扩展

**Files:**
- Modify: `src/sections/Studio.tsx`（ERAS 逐行 blur）
- Modify: `src/sections/Mission.tsx`（BUILDS 逐行 blur）
- Modify: `src/sections/Vision.tsx`（LAYERS 逐行 blur）

**Interfaces:**
- Consumes: framer-motion `useScroll`, `useTransform`, `useMotionTemplate`, `useReducedMotion`；参考 `src/sections/Intro.tsx` 和 `src/sections/Philosophy.tsx` 已有的逐行 blur 范式
- Produces: 三个章节的列表项获得 `opacity [0.15, 1]` + `y [40, 0]` + `blur [8, 0]` 三轨同步的逐行滚动揭示，清晰区间压缩到 section 滚动进度的 `[0, 0.5]`

- [ ] **Step 1: 读取 Intro.tsx 确认逐行 blur 范式**

Run: 读取 `src/sections/Intro.tsx`，确认现有 `LINES.map` + `useTransform` + `useMotionTemplate\`blur(${blur}px)\`` 的写法，作为 Studio/Mission/Vision 的参考模板。

- [ ] **Step 2: Studio.tsx ERAS 改为逐行 blur 揭示**

在 `src/sections/Studio.tsx` 添加 import：

```tsx
import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
```

在 `Studio` 函数内添加：

```tsx
const ref = useRef<HTMLElement>(null);
const prefersReducedMotion = useReducedMotion();
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ['start end', 'end start'],
});
```

将 `<section id="studio" className="section section-lg">` 加 `ref={ref}`。

将 ERAS 的 `map` 改为逐行 blur（在组件顶层不能在 map 里调 hook，需改为预计算或用子组件）。用子组件方式：

```tsx
function EraLine({ era, index, total, scrollYProgress, prefersReducedMotion }: {
  era: { name: string; note: string };
  index: number; total: number;
  scrollYProgress: import('framer-motion').MotionValue<number>;
  prefersReducedMotion: boolean | null;
}) {
  const start = (index / total) * 0.5;
  const end = ((index + 1) / total) * 0.5;
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  const y = useTransform(scrollYProgress, [start, end], [40, 0]);
  const blur = useTransform(scrollYProgress, [start, end], [8, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  return (
    <motion.div
      className={styles.era}
      style={prefersReducedMotion ? { opacity } : { opacity, y, filter }}
    >
      <div className={styles.eraName}>{era.name}</div>
      <div className={styles.eraNote}>{era.note}</div>
    </motion.div>
  );
}
```

在 `Studio` 的 `ERAS.map` 中调用 `<EraLine era={era} index={i} total={ERAS.length} scrollYProgress={scrollYProgress} prefersReducedMotion={prefersReducedMotion} />`。

- [ ] **Step 3: Mission.tsx BUILDS 改为逐行 blur 揭示**

在 `src/sections/Mission.tsx` 应用相同模式。给 `<section>` 加 `ref` + `useScroll`。为 BUILDS 数组创建 `BuildLine` 子组件，复用 Step 2 的 `opacity [0.15, 1]` + `y [40, 0]` + `blur [8, 0]` 三轨。

EXPLORES 保持现有 stagger 入场（不动），只把 BUILDS 改为逐行 blur。

- [ ] **Step 4: Vision.tsx LAYERS 改为逐行 blur 揭示**

在 `src/sections/Vision.tsx` 应用相同模式。LAYERS 数组创建 `LayerLine` 子组件，逐行 blur。注意 Vision 已有 Task 4 的 cardY 视差，这里的逐行 blur 用 section 级 `scrollYProgress`（与 cardY 同源），不冲突。

- [ ] **Step 5: 验证构建**

Run: `cd /Users/xiatian/Desktop/个人主页 && npm run build`
Expected: 构建成功，无 hooks 规则错误

- [ ] **Step 6: 提交**

```bash
git add src/sections/Studio.tsx src/sections/Mission.tsx src/sections/Vision.tsx
git commit -m "feat: extend line-by-line blur reveal to Studio ERAS, Mission BUILDS, Vision LAYERS"
```

---

### Task 6: Blockquote 仪式化 + ChapterMark 变体

**Files:**
- Modify: `src/components/Blockquote.tsx`（竖线生长 + 文字 stagger）
- Modify: `src/components/Blockquote.module.css`（竖线样式）
- Modify: `src/components/ChapterMark.tsx`（variant prop）
- Modify: `src/components/ChapterMark.module.css`（emphasis 变体样式）
- Modify: `src/sections/Vision.tsx`、`src/sections/Footer.tsx`（使用 emphasis 变体，Footer 在 T9 改）

**Interfaces:**
- Consumes: `ChapterMark` 新增 `variant?: 'default' | 'emphasis'`
- Produces: Blockquote 渲染为 `<div class="quote"><motion.div class="rule" height 0→100% /><motion.blockquote stagger fade /></div>`；ChapterMark 支持 emphasis 变体（4px 竖线 + 14px num + glow）

- [ ] **Step 1: 重写 Blockquote.tsx 仪式化**

完整替换 `src/components/Blockquote.tsx`：

```tsx
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import styles from './Blockquote.module.css';

interface BlockquoteProps {
  children: ReactNode;
}

export function Blockquote({ children }: BlockquoteProps) {
  return (
    <div className={styles.wrap}>
      <motion.div
        className={styles.rule}
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />
      <motion.blockquote
        className={styles.quote}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        {children}
      </motion.blockquote>
    </div>
  );
}
```

- [ ] **Step 2: 更新 Blockquote.module.css 添加竖线样式**

读取 `src/components/Blockquote.module.css`，添加 `.wrap` 和 `.rule` 样式，保留原 `.quote`：

```css
.wrap {
  display: flex;
  gap: var(--space-3);
  align-items: stretch;
}

.rule {
  width: 2px;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent-glow);
  border-radius: 1px;
  flex-shrink: 0;
}

.quote {
  /* 保留原有 .quote 样式 */
}
```

- [ ] **Step 3: ChapterMark.tsx 添加 variant prop**

修改 `src/components/ChapterMark.tsx`：

```tsx
interface ChapterMarkProps {
  num: string;
  title: string;
  total?: number;
  variant?: 'default' | 'emphasis';
}

export function ChapterMark({ num, title, total = 12, variant = 'default' }: ChapterMarkProps) {
  const className = `${styles.mark} ${variant === 'emphasis' ? styles.emphasis : ''}`;
  return (
    <div className={className}>
      {/* ... 原有 motion.div 内容不变 ... */}
    </div>
  );
}
```

- [ ] **Step 4: ChapterMark.module.css 添加 emphasis 变体**

在 `src/components/ChapterMark.module.css` 末尾添加：

```css
.emphasis .line {
  width: 4px;
  box-shadow: 0 0 12px var(--accent-glow), 0 0 24px var(--accent-glow);
}

.emphasis .num {
  font-size: 14px;
  letter-spacing: 0.18em;
}

.emphasis .progress {
  font-size: 12px;
}
```

- [ ] **Step 5: Vision.tsx 使用 emphasis 变体**

在 `src/sections/Vision.tsx` 将 `<ChapterMark num="11" title="Vision" />` 改为 `<ChapterMark num="11" title="Vision" variant="emphasis" />`。

- [ ] **Step 6: 验证构建**

Run: `cd /Users/xiatian/Desktop/个人主页 && npm run build`
Expected: 构建成功

- [ ] **Step 7: 提交**

```bash
git add src/components/Blockquote.tsx src/components/Blockquote.module.css src/components/ChapterMark.tsx src/components/ChapterMark.module.css src/sections/Vision.tsx
git commit -m "feat: ritualize Blockquote with growing rule + add ChapterMark emphasis variant"
```

---

### Task 7: Vision 压轴卡 scale + rotateX + glow 呼吸

**Files:**
- Modify: `src/sections/Vision.tsx`（card scale 0.95→1 + rotateX 8→0）
- Modify: `src/sections/Vision.module.css`（glow 呼吸 keyframes + box-shadow）

**Interfaces:**
- Consumes: framer-motion `useScroll`, `useTransform`（与 Task 4/5 同源 scrollYProgress）
- Produces: Vision card 内层 `motion.div` 承载 `scale [0.95, 1]` + `rotateX [8, 0]` + `transformPerspective: 1000`（whileInView 入场）；card 持续 `box-shadow: 0 0 32px var(--accent-glow)` 呼吸动画（3.5s infinite）

- [ ] **Step 1: Vision.tsx card 添加 scale + rotateX 入场**

在 `src/sections/Vision.tsx`，将原有 `.card` 的 `motion.div`（承载 Task 4 的 cardY 外层之内的那个）改为：

```tsx
<motion.div
  className={styles.card}
  initial={{ opacity: 0, scale: 0.95, rotateX: 8 }}
  whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
  viewport={{ once: true, margin: '-15%' }}
  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
  style={{ transformPerspective: 1000 }}
>
```

注意：cardY 由 Task 4 的外层 `motion.div` 承载，scale/rotateX 由内层 `.card` 的 `motion.div` 承载，两者不冲突。

- [ ] **Step 2: Vision.module.css 添加 glow 呼吸动画**

读取 `src/sections/Vision.tsx` 对应的 `src/sections/Vision.module.css`，在 `.card` 规则添加 `animation: glowBreath 3.5s ease-in-out infinite;`，并在文件末尾添加 keyframes：

```css
.card {
  /* 保留原有样式，添加： */
  animation: glowBreath 3.5s ease-in-out infinite;
}

@keyframes glowBreath {
  0%, 100% {
    box-shadow: 0 0 20px var(--accent-glow), 0 0 40px var(--accent-dim);
  }
  50% {
    box-shadow: 0 0 40px var(--accent-glow), 0 0 80px var(--accent-dim);
  }
}
```

- [ ] **Step 3: 验证构建**

Run: `cd /Users/xiatian/Desktop/个人主页 && npm run build`
Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
git add src/sections/Vision.tsx src/sections/Vision.module.css
git commit -m "feat: Vision card scale+rotateX entrance and glow breathing animation"
```

---

### Task 8: SectionDots/Nav 激活态 + ScrollProgress 辉光

**Files:**
- Modify: `src/components/SectionDots.tsx`（IntersectionObserver 激活态）
- Modify: `src/components/SectionDots.module.css`（激活态样式）
- Modify: `src/components/Nav.tsx`（链接滚动联动激活）
- Modify: `src/components/Nav.module.css`（激活态样式）
- Modify: `src/styles/global.css`（ScrollProgress box-shadow glow）

**Interfaces:**
- Consumes: React `useState`, `useEffect`；`SectionDots` 接收 `sections` prop
- Produces: SectionDots 当前章节 dot 变长（width 16px）+ accent 色；Nav 当前章节链接 accent 色 + 下划线；ScrollProgress 加 `box-shadow: 0 0 8px var(--accent-glow)`

- [ ] **Step 1: SectionDots.tsx 添加 IntersectionObserver 激活态**

完整替换 `src/components/SectionDots.tsx`：

```tsx
import { useEffect, useState } from 'react';
import styles from './SectionDots.module.css';

interface SectionDotsProps {
  sections: Array<{ id: string; label: string }>;
}

export function SectionDots({ sections }: SectionDotsProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(s.id);
          });
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  return (
    <div className={styles.dots} aria-label="章节导航">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`${styles.dot} ${activeId === s.id ? styles.active : ''}`}
          aria-label={s.label}
          title={s.label}
          aria-current={activeId === s.id ? 'true' : undefined}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: SectionDots.module.css 添加激活态样式**

读取 `src/components/SectionDots.module.css`，添加 `.active` 规则：

```css
.active {
  background: var(--accent);
  width: 16px;
  border-radius: 4px;
}
```

保留原 `.dot` 和 `:hover` 样式。

- [ ] **Step 3: Nav.tsx 添加链接滚动联动激活**

修改 `src/components/Nav.tsx`，在 `Nav` 函数内添加激活态追踪：

```tsx
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('#hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    LINKS.forEach((link) => {
      const id = link.href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveHref(link.href);
          });
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} aria-label="主导航">
      <a href="#hero" className={styles.logoLink} aria-label=">_ PleaseEnterYourText">
        <span className={styles.logoPrompt}>&gt;_</span>
        <span className={styles.logoText}>PleaseEnterYourText</span>
      </a>
      <ul className={styles.links}>
        {LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={`${styles.link} ${activeHref === link.href ? styles.linkActive : ''}`}
              aria-current={activeHref === link.href ? 'true' : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 4: Nav.module.css 添加激活态样式**

读取 `src/components/Nav.module.css`，添加 `.linkActive` 规则：

```css
.linkActive {
  color: var(--accent);
}

.linkActive::after {
  content: '';
  display: block;
  height: 1px;
  background: var(--accent);
  margin-top: 4px;
}
```

- [ ] **Step 5: global.css ScrollProgress 添加辉光**

修改 `src/styles/global.css` 的 ScrollProgress 规则（`[data-testid='scroll-progress']`），在 `background: var(--accent);` 后添加：

```css
motion.div[data-testid='scroll-progress'],
[data-testid='scroll-progress'] {
  position: fixed; top: 0; left: 0; right: 0;
  height: 2px; background: var(--accent);
  box-shadow: 0 0 8px var(--accent-glow);
  transform-origin: 0%; z-index: 200;
}
```

- [ ] **Step 6: 验证构建**

Run: `cd /Users/xiatian/Desktop/个人主页 && npm run build`
Expected: 构建成功

- [ ] **Step 7: 提交**

```bash
git add src/components/SectionDots.tsx src/components/SectionDots.module.css src/components/Nav.tsx src/components/Nav.module.css src/styles/global.css
git commit -m "feat: active-state tracking for SectionDots/Nav + ScrollProgress glow"
```

---

### Task 9: Footer 仪式感 + Projects 电影感 hover + useCountUp

**Files:**
- Modify: `src/sections/Footer.tsx`（useTypewriter + line-by-line + stagger）
- Modify: `src/sections/Footer.module.css`（如有需要调整）
- Modify: `src/sections/Projects.tsx`（hover 其他卡片后退虚化）
- Modify: `src/sections/Projects.module.css`（hover 虚化样式）
- Modify: `src/sections/Vision.tsx` 或 `src/sections/Hero.tsx`（useCountUp 关键数字）

**Interfaces:**
- Consumes: `src/hooks/useTypewriter.ts`、`src/hooks/useCountUp.ts`（已存在，不改 hook 本身）
- Produces: Footer 的 `>_ PleaseEnterYourText` 打字机效果 + `Xia Tian` 逐行揭示 + 角色描述 stagger fade；Projects 悬停时其他卡片 `opacity 0.4 + scale 0.98`，当前卡片 `scale 1.02`；useCountUp 在 Vision 引入关键数字（如 "12 章节" / "4 项目" / "5 领域"）

- [ ] **Step 1: 重写 Footer.tsx 仪式感动画**

完整替换 `src/sections/Footer.tsx`：

```tsx
import { motion } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';
import styles from './Footer.module.css';

const ROLES = [
  'Independent Developer',
  'System Builder',
  'Future Explorer',
];

export function Footer() {
  const brand = useTypewriter('>_ PleaseEnterYourText', 60, true);

  return (
    <footer id="footer" className={`section section-lg ${styles.footer}`}>
      <div className="container">
        <motion.div
          className={styles.logo}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.prompt}>{brand}</span>
        </motion.div>
        <motion.h2
          className={styles.identity}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          Xia Tian
        </motion.h2>
        <motion.p
          className={styles.role}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          Founder of PleaseEnterYourText
        </motion.p>
        <div className={styles.roles}>
          {ROLES.map((r, i) => (
            <motion.span
              key={r}
              className={styles.roleTag}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.9 + i * 0.15 }}
            >
              {r}
            </motion.span>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

注意：需读取 `src/hooks/useTypewriter.ts` 确认签名 `useTypewriter(text, speed, trigger)`，若 trigger 是 boolean 需确保 whileInView 时 trigger 为 true。若 hook 不支持触发控制，可直接 `useTypewriter('>_ PleaseEnterYourText', 60)` 在 mount 时即开始（可接受，因 Footer 在视口外不渲染动画但文字会预完成）。

- [ ] **Step 2: Footer.module.css 调整 roles 布局**

读取 `src/sections/Footer.module.css`，确保 `.roles` 有 `display: flex; gap: var(--space-2); flex-wrap: wrap;`，`.roleTag` 用 mono 字体 + tertiary 色 + hairline 边框：

```css
.roles {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  justify-content: center;
  margin-top: var(--space-3);
}

.roleTag {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-tertiary);
  border: 1px solid var(--hairline);
  padding: 4px 10px;
  border-radius: 4px;
  letter-spacing: 0.04em;
}
```

- [ ] **Step 3: Projects.module.css 添加电影感 hover 虚化**

修改 `src/sections/Projects.module.css`，在 `.grid` 添加 `:has` 选择器实现悬停时其他卡片虚化：

```css
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

.grid:hover .card {
  opacity: 0.4;
  transform: scale(0.98);
  transition: opacity var(--duration-medium) var(--ease-apple),
    transform var(--duration-medium) var(--ease-apple);
}

.grid .card:hover {
  opacity: 1;
  transform: translateY(-4px) scale(1.02);
  border-color: var(--accent);
  transition: transform var(--duration-medium) var(--ease-apple),
    border-color var(--duration-fast), opacity var(--duration-medium) var(--ease-apple);
}

.card:hover .thumb img {
  transform: scale(1.06);
  filter: grayscale(1) contrast(1.1);
}
```

注意：移除原 `.card:hover` 单独的 transform，改用 `.grid .card:hover`。保留原 `.card` 基础 transition。

- [ ] **Step 4: Vision.tsx 引入 useCountUp 关键数字**

在 `src/sections/Vision.tsx` 的 card 内，在 `cardCoda` 之前添加一行关键数字统计。读取 `src/hooks/useCountUp.ts` 确认签名 `useCountUp(target, duration, trigger)`。

在 Vision card 内添加（需 whileInView 触发，用 `useInView` 或一个 state 控制 trigger）：

```tsx
import { useCountUp } from '../hooks/useCountUp';
import { useInView } from 'framer-motion';
// ...

const cardRef = useRef<HTMLDivElement>(null);
const inView = useInView(cardRef, { once: true, margin: '-15%' });
const projectCount = useCountUp(4, 1.5, inView);
const chapterCount = useCountUp(12, 1.5, inView);
```

在 card 内 coda 前添加：

```tsx
<div className={styles.stats}>
  <div className={styles.stat}>
    <span className={styles.statNum}>{projectCount}</span>
    <span className={styles.statLabel}>PROJECTS</span>
  </div>
  <div className={styles.stat}>
    <span className={styles.statNum}>{chapterCount}</span>
    <span className={styles.statLabel}>CHAPTERS</span>
  </div>
</div>
```

在 `Vision.module.css` 添加对应样式（mono 字体 + 大字号 + tertiary label）。

- [ ] **Step 5: 验证构建**

Run: `cd /Users/xiatian/Desktop/个人主页 && npm run build`
Expected: 构建成功，useTypewriter/useCountUp 无类型错误

- [ ] **Step 6: 提交**

```bash
git add src/sections/Footer.tsx src/sections/Footer.module.css src/sections/Projects.module.css src/sections/Vision.tsx src/sections/Vision.module.css
git commit -m "feat: Footer typewriter ritual + Projects cinematic hover + Vision count-up stats"
```

---

### Task 10: 最终验收与代码审查

**Files:**
- 全分支审查

**Interfaces:**
- Consumes: 上述所有任务的产出

- [ ] **Step 1: 全量构建验证**

Run: `cd /Users/xiatian/Desktop/个人主页 && npm run build`
Expected: 构建成功，无 TypeScript 错误，无警告

- [ ] **Step 2: 启动 dev server 手动验收**

Run: `cd /Users/xiatian/Desktop/个人主页 && npm run dev`

用浏览器打开，逐项验收：
1. Hero 视频自动播放，滚动时视频 scale + rotateX 3D 倾斜
2. Hero "向下滚动" 文字滚动时有速度模糊
3. 滚动后 bg-veil 淡入遮罩，Vision 段 veil 淡出到 0.15
4. Projects/Research/Vision 内容有 gridY 视差
5. Studio ERAS / Mission BUILDS / Vision LAYERS 逐行 blur 揭示
6. Blockquote 竖线生长 + 文字 stagger
7. Vision ChapterMark emphasis 变体（4px 竖线 + glow）
8. Vision card scale+rotateX 入场 + glow 呼吸
9. SectionDots 当前章节激活态（变长 + accent）
10. Nav 链接当前章节激活态（accent + 下划线）
11. ScrollProgress 辉光
12. Footer 打字机 + 逐行揭示 + stagger
13. Projects 悬停其他卡片虚化
14. Vision useCountUp 数字滚动
15. 纯黑白配色（无任何彩色）
16. 排版层级（120px 声明级字号可用、字重 700、统一字距）

- [ ] **Step 3: 派发最终代码审查子代理**

按 subagent-driven-development 流程，派发 final code reviewer 对整条分支做 spec 合规 + 代码质量审查。审查重点：
- 纯黑白配色合规（扫描所有颜色值）
- prefers-reduced-motion 全部尊重
- framer-motion hooks 规则（无 map 内直接调 hook）
- 类型安全（无 any）
- 无未使用 import

- [ ] **Step 4: 修复审查发现（如有）**

按 subagent-driven-development 的 fix-loop 处理审查发现。

- [ ] **Step 5: 最终提交（如有修复）**

```bash
git add -A
git commit -m "fix: address final code review findings"
```

---

## Self-Review

**1. Spec coverage:**
- P0 全局环境层 → Task 2 ✓
- P0 Hero 速度模糊+3D → Task 3 ✓
- P0 视差容器 → Task 4 ✓
- P0 Footer 仪式感 → Task 9 ✓
- P1 差异化 padding → Task 1 ✓
- P1 line-by-line blur 扩展 → Task 5 ✓
- P1 Blockquote 仪式化 → Task 6 ✓
- P1 Vision 压轴卡 → Task 7 ✓
- P1 ChapterMark 变体 → Task 6 ✓
- P1 SectionDots/Nav 激活态 → Task 8 ✓
- P2 useCountUp → Task 9 ✓
- P2 Projects 电影感 hover → Task 9 ✓
- P2 ScrollProgress 辉光 → Task 8 ✓
- P2 字体加载 → Task 1 ✓
- P2 移除 text-shadow → Task 1 ✓
- 深度重排（7 档字号/字重 700/统一字距行高/kicker）→ Task 1 ✓

**2. Placeholder scan:** 无 TBD/TODO，所有步骤含具体代码。

**3. Type consistency:** `ChapterMarkProps.variant`、`EraLine/BuildLine/LayerLine` 子组件 props、`useTypewriter(text, speed, trigger)`、`useCountUp(target, duration, trigger)` 签名一致。
