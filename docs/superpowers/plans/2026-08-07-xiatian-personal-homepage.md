# Xia Tian 个人主页 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个纯黑白、单页滚动的 Xia Tian 个人主页,首屏全屏视频背景,12 章节叙事,动画体系对齐 showcase(framer-motion 滚动驱动)。

**Architecture:** Vite + React 18 + TypeScript 单页应用。CSS Modules + 设计 token。framer-motion 驱动滚动视差与逐行揭示。Hero 为全屏 `<video>`(内含主标题),滚出后过渡到 `#050505` 纯暗背景。复用 showcase 的 hooks 与组件骨架,将生物电青强调色替换为纯白。

**Tech Stack:** React 18.3, TypeScript 5.6, Vite 6, framer-motion 12, CSS Modules, vitest 4(测试)。

## Global Constraints

- 配色严格黑白:仅 `#050505 / #1A1A1A / #F5F5F7 / #A1A1A6 / #6E6E73 / #FFFFFF` 及其透明度变体,**禁止任何彩色**。强调色 `--accent: #FFFFFF`。
- 视频背景仅 Hero 首屏;视频内已含巨型主标题,Hero **不叠加任何竞争文字**。
- 中英文:章节大标题中文,英文作上方 mono kicker。
- PEYT logo 用纯文字 `>_ PleaseEnterYourText`(SF Mono),不用图形 SVG。
- 所有动画在 `prefers-reduced-motion` 下降级为静态。
- 视频文件路径 `public/Xiatian.mp4`(从工作目录根移入)。
- 验收门:`npm run build`(=`tsc -b && vite build`)通过,无类型错误。
- 参考源(showcase)路径:`/Users/xiatian/Desktop/EEGdata/showcase`。可直接复制同名文件的位置会在任务中注明。
- 工作目录:`/Users/xiatian/Desktop/个人主页`(含 `Xiatian.mp4`)。

## File Structure

```
个人主页/
├── public/
│   ├── Xiatian.mp4                      # Task 1 移入
│   └── projects/{peyt-chat,bonnext,continuum,brain-computing}.png  # Task 10 生成
├── src/
│   ├── components/
│   │   ├── ChapterMark.tsx + .module.css     # Task 4
│   │   ├── Nav.tsx + .module.css             # Task 4
│   │   ├── ScrollProgress.tsx                # Task 4 (copy from showcase)
│   │   ├── SectionDots.tsx + .module.css     # Task 4 (copy from showcase)
│   │   ├── VideoHero.tsx + .module.css       # Task 5
│   │   ├── Blockquote.tsx + .module.css      # Task 6
│   │   ├── MonoTable.tsx + .module.css       # Task 6
│   │   └── TwoCol.tsx + .module.css          # Task 6
│   ├── hooks/
│   │   ├── useScrollReveal.ts                # Task 3 (copy)
│   │   ├── useCountUp.ts                     # Task 3 (copy)
│   │   └── useTypewriter.ts                  # Task 3 (copy)
│   ├── sections/
│   │   ├── Hero.tsx + .module.css            # Task 5
│   │   ├── Intro.tsx + .module.css           # Task 7
│   │   ├── Philosophy.tsx + .module.css      # Task 7
│   │   ├── Studio.tsx + .module.css          # Task 8
│   │   ├── Mission.tsx + .module.css         # Task 8
│   │   ├── Research.tsx + .module.css        # Task 9
│   │   ├── Projects.tsx + .module.css        # Task 10
│   │   ├── Engineering.tsx + .module.css     # Task 11
│   │   ├── TechStack.tsx + .module.css       # Task 11
│   │   ├── BeyondCode.tsx + .module.css      # Task 11
│   │   ├── Vision.tsx + .module.css          # Task 12
│   │   └── Footer.tsx + .module.css          # Task 12
│   ├── styles/
│   │   ├── tokens.css                        # Task 2
│   │   └── global.css                        # Task 2
│   ├── App.tsx                               # Task 13
│   ├── main.tsx                              # Task 1
│   ├── test-setup.ts                         # Task 1
│   └── vite-env.d.ts                         # Task 1
├── index.html                                # Task 1
├── package.json                              # Task 1
├── tsconfig.json                             # Task 1
├── tsconfig.node.json                        # Task 1
└── vite.config.ts                            # Task 1
```

**职责边界:** `components/` 是可复用 UI 单元(无业务内容);`sections/` 是章节级内容块(消费 components);`hooks/` 是纯逻辑;`styles/` 是全局 token 与 base。每个 section 文件只负责自身章节的内容与布局,通过 props 消费 components。

---

### Task 1: 项目脚手架与配置

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`
- Create: `src/main.tsx`, `src/vite-env.d.ts`, `src/test-setup.ts`
- Move: `Xiatian.mp4` → `public/Xiatian.mp4`

**Interfaces:**
- Produces: 可运行的空 Vite 项目(`npm install && npm run dev` 启动空白页),为后续任务提供基础。

- [ ] **Step 1: 创建 `package.json`**

```json
{
  "name": "xiatian-homepage",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "framer-motion": "^12.40.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.4",
    "jsdom": "^29.1.1",
    "typescript": "~5.6.2",
    "vite": "^6.0.3",
    "vitest": "^4.1.7"
  }
}
```

- [ ] **Step 2: 创建 `tsconfig.json`**(从 showcase 复制后无需改动)

Run: `cp /Users/xiatian/Desktop/EEGdata/showcase/tsconfig.json /Users/xiatian/Desktop/个人主页/tsconfig.json`

- [ ] **Step 3: 创建 `tsconfig.node.json`**

Run: `cp /Users/xiatian/Desktop/EEGdata/showcase/tsconfig.node.json /Users/xiatian/Desktop/个人主页/tsconfig.node.json`

- [ ] **Step 4: 创建 `vite.config.ts`**(从 showcase 复制)

Run: `cp /Users/xiatian/Desktop/EEGdata/showcase/vite.config.ts /Users/xiatian/Desktop/个人主页/vite.config.ts`

打开确认内容包含 `@vitejs/plugin-react` 与 vitest 的 `test: { environment: 'jsdom', setupFiles: './src/test-setup.ts' }`。若 showcase 版本引用了 `gaussian-splats-3d` 等 alias,删除该 alias 行。

- [ ] **Step 5: 创建 `index.html`**

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Xia Tian — 独立开发者、系统设计者、PleaseEnterYourText 创始人。探索智能、系统与人类创造力的交汇点。" />
    <title>Xia Tian · PleaseEnterYourText</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: 创建 `src/vite-env.d.ts`**

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 7: 创建 `src/test-setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 8: 创建 `src/main.tsx`**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 9: 创建占位 `src/App.tsx`**(Task 13 替换)

```tsx
export function App() {
  return <main style={{ minHeight: '100vh', background: '#050505' }} />;
}
```

- [ ] **Step 10: 移动视频到 public**

Run: `mkdir -p /Users/xiatian/Desktop/个人主页/public && mv /Users/xiatian/Desktop/个人主页/Xiatian.mp4 /Users/xiatian/Desktop/个人主页/public/Xiatian.mp4`

- [ ] **Step 11: 安装依赖并验证启动**

Run: `cd /Users/xiatian/Desktop/个人主页 && npm install`
Run: `npm run dev` (后台启动,确认无报错后停止)
Expected: Vite 启动,浏览器打开空白黑底页。

- [ ] **Step 12: 验证构建**

Run: `npm run build`
Expected: `tsc -b && vite build` 通过,生成 `dist/`。

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "chore: scaffold vite + react + ts project"
```

---

### Task 2: 设计 Token 与全局样式(纯黑白)

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/global.css`

**Interfaces:**
- Produces: 全局 CSS 变量(`--accent: #FFFFFF` 等)与 base reset;所有后续 `.module.css` 消费这些变量。

- [ ] **Step 1: 创建 `src/styles/tokens.css`**

```css
:root {
  --canvas: transparent;
  --page-bg: #050505;
  --surface-elevated: rgba(20, 20, 22, 0.6);
  --surface-2: #1A1A1A;
  --hairline: rgba(255, 255, 255, 0.1);

  /* Brand accent — 纯白 */
  --accent: #FFFFFF;
  --accent-glow: rgba(255, 255, 255, 0.2);
  --accent-dim: rgba(255, 255, 255, 0.08);

  /* Text hierarchy */
  --text-primary: #F5F5F7;
  --text-secondary: #A1A1A6;
  --text-tertiary: #6E6E73;

  /* Typography */
  --font-display: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  --font-text: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  --font-mono: 'SF Mono', 'JetBrains Mono', ui-monospace, monospace;

  /* Type scale — Apple 9 级 */
  --text-hero: 96px;
  --text-display: 72px;
  --text-title: 48px;
  --text-headline: 32px;
  --text-body: 17px;
  --text-caption: 14px;

  /* Spacing — 8px grid */
  --space-1: 8px; --space-2: 16px; --space-3: 24px; --space-4: 32px;
  --space-5: 48px; --space-6: 64px; --space-7: 96px;

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
  :root { --text-hero: 64px; --text-display: 48px; --text-title: 36px; }
}
@media (max-width: 768px) {
  :root { --text-hero: 48px; --text-display: 36px; --text-title: 28px; --text-headline: 24px; }
}
@media (max-width: 640px) {
  :root { --text-hero: 36px; --text-display: 28px; }
}
```

- [ ] **Step 2: 创建 `src/styles/global.css`**

```css
@import './tokens.css';

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-text);
  color: var(--text-primary);
  background: var(--page-bg);
  overflow-x: hidden;
  line-height: 1.5;
  font-size: var(--text-body);
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.8), 0 0 24px rgba(0, 0, 0, 0.5);
}

::selection { background: var(--accent-dim); color: var(--text-primary); }
a { color: inherit; text-decoration: none; }
button { font-family: inherit; cursor: pointer; border: none; background: none; color: inherit; }
img { display: block; max-width: 100%; height: auto; }

.skip-link {
  position: absolute; top: -40px; left: 0;
  background: var(--accent); color: #000;
  padding: 8px 16px; z-index: 9999; transition: top 0.2s;
}
.skip-link:focus { top: 0; }

:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

.container {
  max-width: var(--container-wide);
  margin: 0 auto;
  padding: 0 var(--space-4);
  width: 100%;
}

.container-narrow {
  max-width: var(--container-narrow);
  margin: 0 auto;
  padding: 0 var(--space-4);
  width: 100%;
}

main, footer { position: relative; z-index: 1; }

.section {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: clamp(120px, 18vh, 200px) 0;
}

/* 顶部滚动进度条 */
motion.div[data-testid='scroll-progress'],
[data-testid='scroll-progress'] {
  position: fixed; top: 0; left: 0; right: 0;
  height: 2px; background: var(--accent);
  transform-origin: 0%; z-index: 200;
}
```

- [ ] **Step 3: 验证构建**

Run: `npm run build`
Expected: 通过(此时 App 仍是占位,但 global.css 已生效)。

- [ ] **Step 4: Commit**

```bash
git add src/styles/
git commit -m "feat: add black-and-white design tokens and global styles"
```

---

### Task 3: Hooks(从 showcase 复制)

**Files:**
- Create: `src/hooks/useScrollReveal.ts`, `src/hooks/useCountUp.ts`, `src/hooks/useTypewriter.ts`
- Test: `src/hooks/__tests__/useCountUp.test.ts`, `src/hooks/__tests__/useTypewriter.test.ts`

**Interfaces:**
- Produces:
  - `useScrollReveal<T>(options?): [RefObject<T>, boolean]`
  - `useCountUp(target: number, duration?: number, trigger?: boolean): number`
  - `useTypewriter(text: string, speed?: number, trigger?: boolean): string`

- [ ] **Step 1: 复制三个 hook(内容完全一致)**

Run:
```bash
mkdir -p /Users/xiatian/Desktop/个人主页/src/hooks
cp /Users/xiatian/Desktop/EEGdata/showcase/src/hooks/useScrollReveal.ts /Users/xiatian/Desktop/个人主页/src/hooks/
cp /Users/xiatian/Desktop/EEGdata/showcase/src/hooks/useCountUp.ts /Users/xiatian/Desktop/个人主页/src/hooks/
cp /Users/xiatian/Desktop/EEGdata/showcase/src/hooks/useTypewriter.ts /Users/xiatian/Desktop/个人主页/src/hooks/
```

- [ ] **Step 2: 复制 showcase 的对应测试**

Run:
```bash
mkdir -p /Users/xiatian/Desktop/个人主页/src/hooks/__tests__
cp /Users/xiatian/Desktop/EEGdata/showcase/src/hooks/__tests__/useCountUp.test.ts /Users/xiatian/Desktop/个人主页/src/hooks/__tests__/
cp /Users/xiatian/Desktop/EEGdata/showcase/src/hooks/__tests__/useTypewriter.test.ts /Users/xiatian/Desktop/个人主页/src/hooks/__tests__/
```

- [ ] **Step 3: 运行测试**

Run: `npm test`
Expected: useCountUp 与 useTypewriter 测试全部 PASS。

- [ ] **Step 4: Commit**

```bash
git add src/hooks/
git commit -m "feat: add scroll-reveal, count-up, typewriter hooks"
```

---

### Task 4: 导航与进度组件

**Files:**
- Create: `src/components/ScrollProgress.tsx`, `src/components/SectionDots.tsx` + `.module.css`, `src/components/Nav.tsx` + `.module.css`, `src/components/ChapterMark.tsx` + `.module.css`

**Interfaces:**
- Produces:
  - `<ScrollProgress />`(无 props)
  - `<SectionDots sections={[{id,label},...]} />`
  - `<Nav />`(无 props,链接硬编码)
  - `<ChapterMark num="02" title="Intro" total={12} />`

- [ ] **Step 1: 复制 ScrollProgress(无改动)**

Run: `cp /Users/xiatian/Desktop/EEGdata/showcase/src/components/ScrollProgress.tsx /Users/xiatian/Desktop/个人主页/src/components/ScrollProgress.tsx`

- [ ] **Step 2: 复制 SectionDots(无改动)**

Run:
```bash
cp /Users/xiatian/Desktop/EEGdata/showcase/src/components/SectionDots.tsx /Users/xiatian/Desktop/个人主页/src/components/
cp /Users/xiatian/Desktop/EEGdata/showcase/src/components/SectionDots.module.css /Users/xiatian/Desktop/个人主页/src/components/
```

- [ ] **Step 3: 创建 `src/components/Nav.tsx`**(改链接 + 文字 logo)

```tsx
import { useEffect, useState } from 'react';
import styles from './Nav.module.css';

const LINKS = [
  { href: '#hero', label: '首页' },
  { href: '#philosophy', label: '哲学' },
  { href: '#studio', label: '工作室' },
  { href: '#research', label: '研究' },
  { href: '#projects', label: '项目' },
  { href: '#vision', label: '愿景' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
            <a href={link.href} className={styles.link}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 4: 创建 `src/components/Nav.module.css`**

```css
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 32px;
  background: rgba(0, 0, 0, 0);
  transition: background var(--duration-medium) var(--ease-apple),
    backdrop-filter var(--duration-medium) var(--ease-apple);
}

.scrolled {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--hairline);
}

.logoLink {
  display: flex; align-items: center; gap: 6px;
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 500;
}

.logoPrompt { color: var(--accent); }
.logoText { color: var(--text-primary); transition: color var(--duration-fast); }
.logoLink:hover .logoText { color: var(--accent); }

.links { display: flex; gap: 24px; list-style: none; }
.link { font-size: 14px; color: var(--text-secondary); transition: color var(--duration-fast); }
.link:hover { color: var(--accent); }

@media (max-width: 640px) {
  .links { display: none; }
  .nav { padding: 12px 20px; }
}
```

- [ ] **Step 5: 创建 `src/components/ChapterMark.tsx`**(total 默认 12)

```tsx
import { motion } from 'framer-motion';
import styles from './ChapterMark.module.css';

interface ChapterMarkProps {
  num: string;
  title: string;
  total?: number;
}

export function ChapterMark({ num, title, total = 12 }: ChapterMarkProps) {
  return (
    <div className={styles.mark}>
      <motion.div
        className={styles.line}
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className={styles.meta}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <div className={styles.num}>CHAPTER {num}</div>
        <div className={styles.progress}>
          {total} 个章节中的第 {parseInt(num, 10)} 个 · {title}
        </div>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 6: 创建 `src/components/ChapterMark.module.css`**

```css
.mark { display: flex; gap: 16px; margin-bottom: var(--space-5); align-items: stretch; }

.line {
  width: 2px; background: var(--accent); flex-shrink: 0; border-radius: 1px;
  box-shadow: 0 0 8px var(--accent-glow); overflow: hidden;
}

.meta { display: flex; flex-direction: column; gap: 2px; padding-top: 2px; }

.num {
  font-family: var(--font-mono); font-size: 10px; color: var(--accent);
  letter-spacing: 0.15em; font-weight: 500;
}

.progress { font-size: 11px; color: var(--text-tertiary); letter-spacing: 0.02em; }
```

- [ ] **Step 7: 验证构建**

Run: `npm run build`
Expected: 通过(组件尚未被 App 引用,但需编译无误;若有 unused 警告可忽略,Task 13 会引用)。

- [ ] **Step 8: Commit**

```bash
git add src/components/
git commit -m "feat: add nav, scroll-progress, section-dots, chapter-mark components"
```

---

### Task 5: VideoHero 组件与 Hero 章节

**Files:**
- Create: `src/components/VideoHero.tsx` + `.module.css`
- Create: `src/sections/Hero.tsx` + `.module.css`

**Interfaces:**
- Produces: `<Hero />` 全屏视频章节,id=`hero`,含滚动视差与 scroll hint。

- [ ] **Step 1: 创建 `src/components/VideoHero.tsx`**

```tsx
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import styles from './VideoHero.module.css';

export function VideoHero() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.6]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <div ref={ref} className={styles.wrap}>
      <motion.video
        className={styles.video}
        src="/Xiatian.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={prefersReducedMotion ? undefined : { scale, y }}
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
        style={prefersReducedMotion ? undefined : { opacity: hintOpacity }}
        aria-hidden="true"
      >
        <span className={styles.scrollText}>向下滚动</span>
        <span className={styles.scrollLine} />
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: 创建 `src/components/VideoHero.module.css`**

```css
.wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
}

.overlay {
  position: absolute;
  inset: 0;
  background: #000;
  pointer-events: none;
}

.bottomFade {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 40%;
  background: linear-gradient(to bottom, transparent 0%, var(--page-bg) 100%);
  pointer-events: none;
}

.scrollHint {
  position: absolute;
  bottom: var(--space-5);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  z-index: 2;
}

.scrollText {
  font-size: 12px;
  color: var(--text-primary);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.scrollLine {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--text-primary), transparent);
}
```

- [ ] **Step 3: 创建 `src/sections/Hero.tsx`**

```tsx
import { VideoHero } from '../components/VideoHero';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <VideoHero />
    </section>
  );
}
```

- [ ] **Step 4: 创建 `src/sections/Hero.module.css`**

```css
.hero {
  position: relative;
  min-height: 100vh;
  background: var(--canvas);
  overflow: hidden;
}
```

- [ ] **Step 5: 临时接入 App 验证视频播放**

修改 `src/App.tsx`:
```tsx
import { Hero } from './sections/Hero';

export function App() {
  return (
    <main>
      <Hero />
      <div style={{ height: '100vh', background: 'var(--page-bg)' }} />
    </main>
  );
}
```

Run: `npm run dev`
Expected: 首屏视频自动播放(muted),滚动时视频微放大+暗色遮罩淡入+底部渐隐到 `#050505`,scroll hint 在前 25% 滚动内淡出。

- [ ] **Step 6: 验证构建**

Run: `npm run build`
Expected: 通过。

- [ ] **Step 7: Commit**

```bash
git add src/components/VideoHero.* src/sections/Hero.* src/App.tsx
git commit -m "feat: add video hero with scroll parallax and fade"
```

---

### Task 6: 内容布局组件(Blockquote / MonoTable / TwoCol)

**Files:**
- Create: `src/components/Blockquote.tsx` + `.module.css`
- Create: `src/components/MonoTable.tsx` + `.module.css`
- Create: `src/components/TwoCol.tsx` + `.module.css`

**Interfaces:**
- Produces:
  - `<Blockquote>{children}</Blockquote>` — 白竖线引言块
  - `<MonoTable columns={[{title, items: string[]}]} />` — 双列 mono 表
  - `<TwoCol left={node} right={node} />` — 两栏布局

- [ ] **Step 1: 创建 `src/components/Blockquote.tsx`**

```tsx
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import styles from './Blockquote.module.css';

interface BlockquoteProps {
  children: ReactNode;
}

export function Blockquote({ children }: BlockquoteProps) {
  return (
    <motion.blockquote
      className={styles.quote}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.blockquote>
  );
}
```

- [ ] **Step 2: 创建 `src/components/Blockquote.module.css`**

```css
.quote {
  position: relative;
  padding: var(--space-4) 0 var(--space-4) var(--space-4);
  border-left: 2px solid var(--accent);
  font-family: var(--font-display);
  font-size: var(--text-headline);
  font-weight: 500;
  line-height: 1.35;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  max-width: var(--container-narrow);
}

@media (max-width: 640px) {
  .quote { font-size: var(--text-body); }
}
```

- [ ] **Step 3: 创建 `src/components/MonoTable.tsx`**

```tsx
import { motion } from 'framer-motion';
import styles from './MonoTable.module.css';

interface Column {
  title: string;
  items: string[];
}

interface MonoTableProps {
  columns: Column[];
}

export function MonoTable({ columns }: MonoTableProps) {
  return (
    <div className={styles.grid}>
      {columns.map((col, ci) => (
        <motion.div
          key={col.title}
          className={styles.col}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: ci * 0.1 }}
        >
          <div className={styles.title}>{col.title}</div>
          <ul className={styles.list}>
            {col.items.map((item) => (
              <li key={item} className={styles.item}>{item}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: 创建 `src/components/MonoTable.module.css`**

```css
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-5);
  padding-top: var(--space-5);
  border-top: 1px solid var(--hairline);
}

.col { display: flex; flex-direction: column; gap: var(--space-2); }

.title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
}

.list { list-style: none; display: flex; flex-direction: column; gap: 10px; }

.item {
  font-family: var(--font-mono);
  font-size: var(--text-body);
  color: var(--accent);
}

@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; gap: var(--space-4); }
}
```

- [ ] **Step 5: 创建 `src/components/TwoCol.tsx`**

```tsx
import type { ReactNode } from 'react';
import styles from './TwoCol.module.css';

interface TwoColProps {
  left: ReactNode;
  right: ReactNode;
}

export function TwoCol({ left, right }: TwoColProps) {
  return (
    <div className={styles.row}>
      <div className={styles.col}>{left}</div>
      <div className={styles.col}>{right}</div>
    </div>
  );
}
```

- [ ] **Step 6: 创建 `src/components/TwoCol.module.css`**

```css
.row {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: var(--space-6);
  align-items: start;
}

.col { display: flex; flex-direction: column; gap: var(--space-3); }

@media (max-width: 900px) {
  .row { grid-template-columns: 1fr; gap: var(--space-4); }
}
```

- [ ] **Step 7: 验证构建**

Run: `npm run build`
Expected: 通过。

- [ ] **Step 8: Commit**

```bash
git add src/components/Blockquote.* src/components/MonoTable.* src/components/TwoCol.*
git commit -m "feat: add blockquote, mono-table, two-col layout components"
```

---

### Task 7: Intro 与 Philosophy 章节

**Files:**
- Create: `src/sections/Intro.tsx` + `.module.css`
- Create: `src/sections/Philosophy.tsx` + `.module.css`

**Interfaces:**
- Consumes: `ChapterMark`, `Blockquote`, framer-motion `useScroll`/`useTransform`/`useMotionTemplate`/`useReducedMotion`(逐行揭示模式,见 showcase Premise)。
- Produces: `<Intro />`(id=intro), `<Philosophy />`(id=philosophy)。

- [ ] **Step 1: 创建 `src/sections/Intro.tsx`**

```tsx
import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { ChapterMark } from '../components/ChapterMark';
import { Blockquote } from '../components/Blockquote';
import styles from './Intro.module.css';

const FIELDS = [
  '人工智能与智能体系统',
  '分布式通信架构',
  '跨平台软件工程',
  '人机交互设计',
  '脑科学与计算认知',
];

export function Intro() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section id="intro" ref={ref} className="section">
      <div className="container-narrow">
        <ChapterMark num="02" title="Intro" />
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          探索智能、系统与人类创造力的交汇点
        </motion.h2>
        <p className={styles.lede}>
          我是一名独立开发者、系统设计者与技术探索者。
        </p>
        <p className={styles.text}>
          我关注软件、人工智能与人类认知之间的深层连接,并尝试通过工程实践探索下一代计算系统的可能形态。我的工作横跨:
        </p>
        <p className={styles.fields}>
          {FIELDS.map((line, i) => {
            const start = (i / FIELDS.length) * 0.5;
            const end = ((i + 1) / FIELDS.length) * 0.5;
            const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
            const y = useTransform(scrollYProgress, [start, end], [40, 0]);
            const blur = useTransform(scrollYProgress, [start, end], [8, 0]);
            const filter = useMotionTemplate`blur(${blur}px)`;
            return (
              <motion.span
                key={i}
                className={styles.field}
                style={prefersReducedMotion ? { opacity } : { opacity, y, filter }}
              >
                {line}{' '}
              </motion.span>
            );
          })}
        </p>
        <div className={styles.spacer} />
        <Blockquote>
          技术的价值不仅在于解决已有问题,而在于重新定义未来的问题边界。
        </Blockquote>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 创建 `src/sections/Intro.module.css`**

```css
.title {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.lede {
  font-size: var(--text-headline);
  color: var(--text-secondary);
  margin-bottom: var(--space-3);
  font-weight: 400;
}

.text {
  font-size: var(--text-body);
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-4);
}

.fields {
  font-family: var(--font-display);
  font-size: var(--text-headline);
  font-weight: 500;
  line-height: 1.4;
  color: var(--text-primary);
}

.field { display: inline; }

.spacer { height: var(--space-6); }

@media (max-width: 768px) { .title { font-size: var(--text-title); } }
@media (max-width: 640px) { .fields { font-size: var(--text-body); } }
```

- [ ] **Step 3: 创建 `src/sections/Philosophy.tsx`**

```tsx
import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { ChapterMark } from '../components/ChapterMark';
import styles from './Philosophy.module.css';

const LINES = [
  '面对一个复杂系统,',
  '我不会只关注它当前的实现,',
  '而会追问:',
  '它为什么这样存在?',
  '它解决的本质问题是什么?',
  '如果从零开始设计,',
  '是否能够构建更优雅、更开放、更强大的结构?',
];

const DIRECTIONS = [
  '更开放的信息基础设施',
  '更智能的软件系统',
  '更自然的人机协作方式',
  '更强大的创造工具',
];

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section id="philosophy" ref={ref} className="section">
      <div className="container-narrow">
        <ChapterMark num="03" title="Philosophy" />
        <div className={styles.kicker}>From First Principles</div>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          从第一性原理出发
        </motion.h2>
        <p className={styles.text}>
          {LINES.map((line, i) => {
            const start = (i / LINES.length) * 0.5;
            const end = ((i + 1) / LINES.length) * 0.5;
            const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
            const y = useTransform(scrollYProgress, [start, end], [40, 0]);
            const blur = useTransform(scrollYProgress, [start, end], [8, 0]);
            const filter = useMotionTemplate`blur(${blur}px)`;
            return (
              <motion.span
                key={i}
                className={styles.line}
                style={prefersReducedMotion ? { opacity } : { opacity, y, filter }}
              >
                {line}{' '}
              </motion.span>
            );
          })}
        </p>
        <div className={styles.directions}>
          {DIRECTIONS.map((d, i) => (
            <motion.div
              key={d}
              className={styles.direction}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              {d}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: 创建 `src/sections/Philosophy.module.css`**

```css
.kicker {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.title {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: var(--space-5);
}

.text {
  font-family: var(--font-display);
  font-size: var(--text-headline);
  font-weight: 500;
  line-height: 1.4;
  color: var(--text-primary);
  margin-bottom: var(--space-6);
}

.line { display: inline; }

.directions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3) var(--space-4);
  padding-top: var(--space-5);
  border-top: 1px solid var(--hairline);
}

.direction {
  font-size: var(--text-body);
  color: var(--text-secondary);
}

@media (max-width: 768px) { .title { font-size: var(--text-title); } }
@media (max-width: 640px) {
  .text { font-size: var(--text-body); }
  .directions { grid-template-columns: 1fr; }
}
```

- [ ] **Step 5: 临时接入 App 验证**

修改 `src/App.tsx` 在 Hero 后加入 `<Intro />` 与 `<Philosophy />`。
Run: `npm run dev`
Expected: 两章节渲染,逐行 blur 揭示生效,kicker/标题层次正确,纯黑白。

- [ ] **Step 6: 验证构建**

Run: `npm run build`
Expected: 通过。

- [ ] **Step 7: Commit**

```bash
git add src/sections/Intro.* src/sections/Philosophy.* src/App.tsx
git commit -m "feat: add intro and philosophy sections with line-by-line reveal"
```

---

### Task 8: Studio 与 Mission 章节

**Files:**
- Create: `src/sections/Studio.tsx` + `.module.css`
- Create: `src/sections/Mission.tsx` + `.module.css`

**Interfaces:**
- Consumes: `ChapterMark`, `Blockquote`。
- Produces: `<Studio />`(id=studio), `<Mission />`(id=mission)。

- [ ] **Step 1: 创建 `src/sections/Studio.tsx`**

```tsx
import { motion } from 'framer-motion';
import { ChapterMark } from '../components/ChapterMark';
import { Blockquote } from '../components/Blockquote';
import styles from './Studio.module.css';

const ERAS = [
  { name: '个人计算机', note: '软件作为被动工具' },
  { name: '移动互联网', note: '软件作为随身服务' },
  { name: '人工智能时代', note: '软件作为主动协作者' },
];

export function Studio() {
  return (
    <section id="studio" className="section">
      <div className="container">
        <ChapterMark num="04" title="Studio" />
        <div className={styles.logo}>
          <span className={styles.prompt}>&gt;_</span>
          <span className={styles.name}>PleaseEnterYourText</span>
        </div>
        <div className={styles.kicker}>Independent Technology Studio</div>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          构建面向未来的软件与智能系统
        </motion.h2>
        <p className={styles.text}>
          PleaseEnterYourText(PEYT)是一间独立技术工作室。我们探索软件、人工智能与人类创造力之间的新型关系,并尝试构建下一代数字基础设施。
        </p>
        <div className={styles.spacer} />
        <Blockquote>
          每一次计算范式的变化,都会重新定义人与技术之间的连接方式。
        </Blockquote>
        <p className={styles.text}>
          从个人计算机,到移动互联网,再到人工智能时代,软件正在从被动工具逐渐演变为主动协作者。PEYT 致力于探索这一过程中尚未被定义的可能性。
        </p>
        <div className={styles.eras}>
          {ERAS.map((era, i) => (
            <motion.div
              key={era.name}
              className={styles.era}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <div className={styles.eraName}>{era.name}</div>
              <div className={styles.eraNote}>{era.note}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 创建 `src/sections/Studio.module.css`**

```css
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 24px;
  font-weight: 500;
  margin-bottom: var(--space-2);
}

.prompt { color: var(--accent); }
.name { color: var(--text-primary); }

.kicker {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}

.title {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.text {
  font-size: var(--text-body);
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-4);
  max-width: var(--container-narrow);
}

.spacer { height: var(--space-5); }

.eras {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  margin-top: var(--space-5);
  padding-top: var(--space-5);
  border-top: 1px solid var(--hairline);
}

.era { display: flex; flex-direction: column; gap: 4px; }

.eraName {
  font-family: var(--font-display);
  font-size: var(--text-headline);
  font-weight: 600;
  color: var(--text-primary);
}

.eraNote { font-size: 14px; color: var(--text-tertiary); }

@media (max-width: 768px) { .title { font-size: var(--text-title); } }
@media (max-width: 640px) { .eras { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: 创建 `src/sections/Mission.tsx`**

```tsx
import { motion } from 'framer-motion';
import { ChapterMark } from '../components/ChapterMark';
import styles from './Mission.module.css';

const EXPLORES = [
  '信息如何更加自由地流动',
  '人与机器如何更加自然地协作',
  '个体如何拥有更强大的创造能力',
  '软件如何成为人类认知的延伸',
];

const BUILDS = [
  '连接人与智能的系统',
  '增强创造力的工具',
  '面向未来的软件基础设施',
];

export function Mission() {
  return (
    <section id="mission" className="section">
      <div className="container">
        <ChapterMark num="05" title="Mission" />
        <div className={styles.kicker}>Build The Future of Digital Creation</div>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          构建数字创造的未来
        </motion.h2>
        <p className={styles.lede}>我们的目标不是简单创造新的应用。而是探索:</p>
        <div className={styles.grid}>
          {EXPLORES.map((e, i) => (
            <motion.div
              key={e}
              className={styles.item}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              {e}
            </motion.div>
          ))}
        </div>
        <div className={styles.builds}>
          {BUILDS.map((b, i) => (
            <motion.div
              key={b}
              className={styles.build}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
            >
              {b}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: 创建 `src/sections/Mission.module.css`**

```css
.kicker {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}

.title {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.lede { font-size: var(--text-headline); color: var(--text-secondary); margin-bottom: var(--space-5); }

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3) var(--space-4);
  margin-bottom: var(--space-6);
}

.item {
  font-family: var(--font-display);
  font-size: var(--text-headline);
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.3;
}

.builds {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-top: var(--space-5);
  border-top: 1px solid var(--hairline);
}

.build {
  font-family: var(--font-display);
  font-size: var(--text-title);
  font-weight: 600;
  color: var(--accent);
  letter-spacing: -0.02em;
  line-height: 1.15;
}

@media (max-width: 768px) { .title { font-size: var(--text-title); } }
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
  .item { font-size: var(--text-body); }
  .build { font-size: var(--text-headline); }
}
```

- [ ] **Step 5: 验证构建**

Run: `npm run build`
Expected: 通过。

- [ ] **Step 6: Commit**

```bash
git add src/sections/Studio.* src/sections/Mission.*
git commit -m "feat: add studio and mission sections"
```

---

### Task 9: Research 章节(3 子方向)

**Files:**
- Create: `src/sections/Research.tsx` + `.module.css`

**Interfaces:**
- Consumes: `ChapterMark`。
- Produces: `<Research />`(id=research),含 3 个子方向分栏。

- [ ] **Step 1: 创建 `src/sections/Research.tsx`**

```tsx
import { motion } from 'framer-motion';
import { ChapterMark } from '../components/ChapterMark';
import styles from './Research.module.css';

const DIRECTIONS = [
  {
    en: 'AI Native Software',
    zh: '从工具到智能伙伴',
    intro: '未来的软件不应该只是等待用户输入指令。它应该理解目标、参与思考、协助创造。我们探索:',
    points: ['AI Agent 架构', '长期记忆系统', '自主任务规划', '多智能体协作', '人机协同工作流'],
    coda: '目标是推动软件从"执行命令"走向"共同创造"。',
  },
  {
    en: 'Open Communication',
    zh: '重新思考互联网连接方式',
    intro: '传统通信系统建立在中心化平台之上。PEYT 探索更加开放的新型通信模型:',
    points: ['去中心化身份体系', '开放通信协议', '用户数据自主控制', '可扩展社区生态'],
    coda: '我们希望探索一种更加自由、开放、属于用户的数字交流方式。',
  },
  {
    en: 'Human Intelligence Computing',
    zh: '探索人类认知与机器智能的连接',
    intro: '人工智能的发展不仅需要理解机器,也需要理解人类自身。我们关注:',
    points: ['脑电信号分析', '心流状态研究', '认知过程建模', '人机交互优化'],
    coda: '通过计算方法探索人类思维机制,并寻找未来智能系统的新方向。',
  },
];

export function Research() {
  return (
    <section id="research" className="section">
      <div className="container">
        <ChapterMark num="06" title="Research" />
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          研究方向
        </motion.h2>
        <div className={styles.list}>
          {DIRECTIONS.map((d, i) => (
            <motion.div
              key={d.en}
              className={styles.direction}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <div className={styles.head}>
                <span className={styles.index}>0{i + 1}</span>
                <div>
                  <div className={styles.en}>{d.en}</div>
                  <div className={styles.zh}>{d.zh}</div>
                </div>
              </div>
              <p className={styles.intro}>{d.intro}</p>
              <ul className={styles.points}>
                {d.points.map((p) => (
                  <li key={p} className={styles.point}>{p}</li>
                ))}
              </ul>
              <p className={styles.coda}>{d.coda}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 创建 `src/sections/Research.module.css`**

```css
.title {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: var(--space-6);
}

.list { display: flex; flex-direction: column; gap: var(--space-6); }

.direction {
  padding: var(--space-5) 0;
  border-top: 1px solid var(--hairline);
}

.head { display: flex; align-items: baseline; gap: var(--space-3); margin-bottom: var(--space-3); }

.index {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--accent);
  letter-spacing: 0.1em;
}

.en {
  font-family: var(--font-display);
  font-size: var(--text-title);
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.zh { font-size: var(--text-body); color: var(--text-secondary); margin-top: 4px; }

.intro { font-size: var(--text-body); color: var(--text-secondary); line-height: 1.7; margin-bottom: var(--space-3); max-width: var(--container-narrow); }

.points {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.point {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-primary);
  background: var(--accent-dim);
  border: 1px solid var(--hairline);
  padding: 6px 12px;
  border-radius: 4px;
}

.coda { font-size: var(--text-body); color: var(--text-tertiary); font-style: italic; max-width: var(--container-narrow); }

@media (max-width: 768px) { .title { font-size: var(--text-title); } .en { font-size: var(--text-headline); } }
```

- [ ] **Step 3: 验证构建**

Run: `npm run build`
Expected: 通过。

- [ ] **Step 4: Commit**

```bash
git add src/sections/Research.*
git commit -m "feat: add research direction section with three sub-directions"
```

---

### Task 10: Projects 章节 + 4 张黑白封面图生成

**Files:**
- Create: `src/sections/Projects.tsx` + `.module.css`
- Generate: `public/projects/peyt-chat.png`, `bonnext.png`, `continuum.png`, `brain-computing.png`

**Interfaces:**
- Consumes: `ChapterMark`, `GenerateImage`(工具)。
- Produces: `<Projects />`(id=projects),4 卡网格。

- [ ] **Step 1: 生成 4 张黑白抽象封面图(并行调用 GenerateImage 4 次)**

每张 prompt 严格遵循:纯黑白、抽象几何、无文字、16:10。调用 `GenerateImage`,path 为绝对路径,`image_size: landscape_4_3`。

1. `public/projects/peyt-chat.png`:
   prompt: `"Abstract black-and-white network topology cover art: dense intersecting thin white lines forming a mesh of nodes on a pure black background, high-contrast monochrome, minimal geometric communication web, no text, no people, cinematic, 16:10"`

2. `public/projects/bonnext.png`:
   prompt: `"Abstract black-and-white isometric modular cover art: stacked cubic blocks and grid modules floating on pure black background, geometric monochrome architecture, high-contrast, minimal, no text, 16:10"`

3. `public/projects/continuum.png`:
   prompt: `"Abstract black-and-white flowing strata cover art: continuous horizontal wave layers and stacked timeline sediment on pure black background, monochrome gradient, minimal, cinematic, no text, 16:10"`

4. `public/projects/brain-computing.png`:
   prompt: `"Abstract black-and-white neural signal waveform cover art: dense oscillating EEG-like wave traces and oscillation lines on pure black background, monochrome, minimal, scientific, no text, 16:10"`

Run: 先 `mkdir -p /Users/xiatian/Desktop/个人主页/public/projects`,再用 GenerateImage 工具分别生成到上述 4 个绝对路径。

- [ ] **Step 2: 创建 `src/sections/Projects.tsx`**

```tsx
import { motion } from 'framer-motion';
import { ChapterMark } from '../components/ChapterMark';
import styles from './Projects.module.css';

const PROJECTS = [
  {
    id: 'peyt-chat',
    name: 'PEYT Chat',
    tag: '通信实验',
    en: '下一代开放通信实验',
    desc: 'PEYT Chat 是 PEYT 工作室对于未来通信形态的探索。它尝试突破传统即时通信软件的边界,将即时通讯、社区空间、频道系统、Bot 扩展与开发者生态融合为一个更加开放的通信环境。',
    tech: 'IM · 频道 · Bot · 开发者生态',
    img: '/projects/peyt-chat.png',
  },
  {
    id: 'bonnext',
    name: 'BonNext',
    tag: 'Minecraft 生态',
    en: 'Modern Minecraft Ecosystem',
    desc: 'BonNext 是一个基于 Rust 构建的新一代 Minecraft 生态工具。它探索高性能桌面应用架构、跨平台软件设计、模块化系统与现代化用户体验。BonNext 不只是一个启动器,它试图重新定义玩家与创造工具之间的关系。',
    tech: 'Rust · 跨平台 · 模块化',
    img: '/projects/bonnext.png',
  },
  {
    id: 'continuum',
    name: 'Continuum',
    tag: 'AI Agent',
    en: 'Long-Term AI Agent Architecture',
    desc: 'Continuum 是对于下一代 AI Agent 系统的探索。当前 AI 大多停留在短周期交互,而未来的智能系统需要长期记忆、状态管理、复杂规划、持续学习与自主执行。Continuum 探索如何构建能够长期理解目标,并参与复杂创造过程的智能系统。',
    tech: '长期记忆 · 状态管理 · 持续学习',
    img: '/projects/continuum.png',
  },
  {
    id: 'brain-computing',
    name: 'Brain Computing Research',
    tag: '脑科学',
    en: 'Understanding Human Cognition Through Data',
    desc: '我关注神经科学与计算科学的交叉领域。通过 EEG 数据分析与机器学习方法,探索心流状态的神经机制、任务切换带来的认知成本、脑信号特征提取与计算模型辅助认知研究。希望通过计算方式理解人类思维,并探索未来人机融合的可能性。',
    tech: 'EEG · 机器学习 · 认知建模',
    img: '/projects/brain-computing.png',
  },
];

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <ChapterMark num="07" title="Projects" />
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          项目
        </motion.h2>
        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.id}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <div className={styles.thumb}>
                <img src={p.img} alt={p.name} loading="lazy" />
                <span className={styles.tag}>{p.tag}</span>
              </div>
              <div className={styles.body}>
                <h3 className={styles.name}>{p.name}</h3>
                <div className={styles.en}>{p.en}</div>
                <p className={styles.desc}>{p.desc}</p>
                <div className={styles.tech}>{p.tech}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: 创建 `src/sections/Projects.module.css`**

```css
.title {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: var(--space-6);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

.card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--hairline);
  border-radius: 14px;
  overflow: hidden;
  background: var(--surface-elevated);
  transition: transform var(--duration-medium) var(--ease-apple),
    border-color var(--duration-fast);
}

.card:hover { transform: translateY(-4px); border-color: var(--accent); }

.thumb { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: #0a0a0e; }

.thumb img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform var(--duration-slow) var(--ease-apple);
  filter: grayscale(1) contrast(1.05);
}

.card:hover .thumb img { transform: scale(1.04); }

.tag {
  position: absolute; top: 10px; left: 10px;
  font-family: var(--font-mono);
  font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
  color: #000; background: var(--accent);
  padding: 4px 8px; border-radius: 4px;
}

.body { padding: var(--space-3); display: flex; flex-direction: column; gap: 6px; }

.name {
  font-family: var(--font-display);
  font-size: 20px; font-weight: 600;
  color: var(--text-primary); letter-spacing: -0.01em;
}

.en { font-family: var(--font-mono); font-size: 12px; color: var(--text-tertiary); }

.desc { font-size: 13px; color: var(--text-secondary); line-height: 1.6; }

.tech { margin-top: 4px; font-family: var(--font-mono); font-size: 11px; color: var(--accent); }

@media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
@media (max-width: 768px) { .title { font-size: var(--text-title); } }
```

- [ ] **Step 4: 验证图片存在与构建**

Run: `ls /Users/xiatian/Desktop/个人主页/public/projects/`(确认 4 个 png)
Run: `npm run build`
Expected: 构建通过,`dist/` 包含图片。

- [ ] **Step 5: Commit**

```bash
git add src/sections/Projects.* public/projects/
git commit -m "feat: add projects section with four b&w abstract covers"
```

---

### Task 11: Engineering / TechStack / BeyondCode 章节

**Files:**
- Create: `src/sections/Engineering.tsx` + `.module.css`
- Create: `src/sections/TechStack.tsx` + `.module.css`
- Create: `src/sections/BeyondCode.tsx` + `.module.css`

**Interfaces:**
- Consumes: `ChapterMark`, `TwoCol`, `MonoTable`。
- Produces: `<Engineering />`(id=engineering), `<TechStack />`(id=stack), `<BeyondCode />`(id=beyond)。

- [ ] **Step 1: 创建 `src/sections/Engineering.tsx`**

```tsx
import { motion } from 'framer-motion';
import { ChapterMark } from '../components/ChapterMark';
import { TwoCol } from '../components/TwoCol';
import styles from './Engineering.module.css';

const PILLARS = ['极简主义', '工业设计语言', '未来科技美学', '高性能交互体验'];

export function Engineering() {
  return (
    <section id="engineering" className="section">
      <div className="container">
        <ChapterMark num="08" title="Engineering" />
        <TwoCol
          left={
            <>
              <div className={styles.kicker}>Technology Should Be Invisible, But Its Impact Should Be Obvious.</div>
              <motion.h2
                className={styles.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                技术应当隐形,但其影响应当显著。
              </motion.h2>
              <p className={styles.text}>
                优秀的软件应该同时拥有深度的工程能力与简洁的用户体验。我的设计理念融合:
              </p>
            </>
          }
          right={
            <ul className={styles.pillars}>
              {PILLARS.map((p, i) => (
                <motion.li
                  key={p}
                  className={styles.pillar}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                >
                  {p}
                </motion.li>
              ))}
            </ul>
          }
        />
        <motion.p
          className={styles.coda}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          复杂的系统应该拥有简单的表达。
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 创建 `src/sections/Engineering.module.css`**

```css
.kicker {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--accent);
  letter-spacing: 0.04em;
  line-height: 1.5;
  margin-bottom: var(--space-3);
}

.title {
  font-family: var(--font-display);
  font-size: var(--text-title);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.text { font-size: var(--text-body); color: var(--text-secondary); line-height: 1.7; }

.pillars { list-style: none; display: flex; flex-direction: column; gap: var(--space-2); }

.pillar {
  font-family: var(--font-display);
  font-size: var(--text-headline);
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  padding-left: var(--space-3);
  border-left: 2px solid var(--accent);
}

.coda {
  margin-top: var(--space-6);
  font-family: var(--font-display);
  font-size: var(--text-headline);
  font-weight: 500;
  color: var(--text-secondary);
  font-style: italic;
  max-width: var(--container-narrow);
}

@media (max-width: 768px) { .title { font-size: var(--text-headline); } .pillar { font-size: var(--text-body); } }
```

- [ ] **Step 3: 创建 `src/sections/TechStack.tsx`**

```tsx
import { motion } from 'framer-motion';
import { ChapterMark } from '../components/ChapterMark';
import { MonoTable } from '../components/MonoTable';
import styles from './TechStack.module.css';

const COLUMNS = [
  { title: 'Languages', items: ['Rust', 'TypeScript', 'Python', 'C++', 'Java'] },
  {
    title: 'Fields',
    items: [
      'Distributed Systems',
      'Artificial Intelligence',
      'Agent Architecture',
      'Desktop Applications',
      'Human Computer Interaction',
      'Neuroscience Computing',
      'Developer Tools',
    ],
  },
];

export function TechStack() {
  return (
    <section id="stack" className="section">
      <div className="container">
        <ChapterMark num="09" title="Stack" />
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          技术栈
        </motion.h2>
        <MonoTable columns={COLUMNS} />
      </div>
    </section>
  );
}
```

- [ ] **Step 4: 创建 `src/sections/TechStack.module.css`**

```css
.title {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

@media (max-width: 768px) { .title { font-size: var(--text-title); } }
```

- [ ] **Step 5: 创建 `src/sections/BeyondCode.tsx`**

```tsx
import { motion } from 'framer-motion';
import { ChapterMark } from '../components/ChapterMark';
import { Blockquote } from '../components/Blockquote';
import styles from './BeyondCode.module.css';

const INTERESTS = ['古典音乐与钢琴', '电子游戏创造生态', '视觉设计', '科学探索', '新兴技术趋势'];

const TRIO = [
  { word: '工程', role: '给予结构' },
  { word: '艺术', role: '给予表达' },
  { word: '科学', role: '给予方向' },
];

export function BeyondCode() {
  return (
    <section id="beyond" className="section">
      <div className="container">
        <ChapterMark num="10" title="Beyond Code" />
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          技术之外
        </motion.h2>
        <p className={styles.lede}>技术之外,我关注:</p>
        <div className={styles.tags}>
          {INTERESTS.map((t, i) => (
            <motion.span
              key={t}
              className={styles.tag}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
        <div className={styles.spacer} />
        <Blockquote>我相信创造力来自不同领域之间的连接。</Blockquote>
        <div className={styles.trio}>
          {TRIO.map((t, i) => (
            <motion.div
              key={t.word}
              className={styles.trioItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
            >
              <span className={styles.trioWord}>{t.word}</span>
              <span className={styles.trioRole}>{t.role}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: 创建 `src/sections/BeyondCode.module.css`**

```css
.title {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.lede { font-size: var(--text-headline); color: var(--text-secondary); margin-bottom: var(--space-4); }

.tags { display: flex; flex-wrap: wrap; gap: var(--space-2); }

.tag {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--text-primary);
  border: 1px solid var(--hairline);
  padding: 8px 14px;
  border-radius: 999px;
}

.spacer { height: var(--space-6); }

.trio {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  margin-top: var(--space-6);
  padding-top: var(--space-5);
  border-top: 1px solid var(--hairline);
}

.trioItem { display: flex; flex-direction: column; gap: 4px; }

.trioWord {
  font-family: var(--font-display);
  font-size: var(--text-title);
  font-weight: 700;
  color: var(--accent);
  letter-spacing: -0.02em;
}

.trioRole { font-size: var(--text-body); color: var(--text-secondary); }

@media (max-width: 768px) { .title { font-size: var(--text-title); } .trio { grid-template-columns: 1fr; } }
```

- [ ] **Step 7: 验证构建**

Run: `npm run build`
Expected: 通过。

- [ ] **Step 8: Commit**

```bash
git add src/sections/Engineering.* src/sections/TechStack.* src/sections/BeyondCode.*
git commit -m "feat: add engineering, tech-stack, beyond-code sections"
```

---

### Task 12: Vision 与 Footer 章节

**Files:**
- Create: `src/sections/Vision.tsx` + `.module.css`
- Create: `src/sections/Footer.tsx` + `.module.css`

**Interfaces:**
- Consumes: `ChapterMark`。
- Produces: `<Vision />`(id=vision), `<Footer />`(id=footer)。

- [ ] **Step 1: 创建 `src/sections/Vision.tsx`**

```tsx
import { motion } from 'framer-motion';
import { ChapterMark } from '../components/ChapterMark';
import styles from './Vision.module.css';

const LAYERS = ['人类认知的延伸', '创造力的放大器', '人与世界连接的新接口'];

export function Vision() {
  return (
    <section id="vision" className="section">
      <div className="container">
        <ChapterMark num="11" title="Vision" />
        <div className={styles.kicker}>Building The Next Layer of Computing</div>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.cardKicker}>VISION</div>
          <h2 className={styles.cardTitle}>未来的软件不会只是工具。</h2>
          <p className={styles.cardLead}>它将成为:</p>
          <ul className={styles.layers}>
            {LAYERS.map((l, i) => (
              <motion.li
                key={l}
                className={styles.layer}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
              >
                {l}
              </motion.li>
            ))}
          </ul>
          <p className={styles.cardCoda}>
            PleaseEnterYourText 希望成为探索这一未来的一部分。
          </p>
          <p className={styles.cardCoda}>
            通过代码、系统与思想,构建下一代数字世界。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 创建 `src/sections/Vision.module.css`**

```css
.kicker {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}

.card {
  max-width: 880px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-5);
  border: 1px solid var(--accent);
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, var(--surface-elevated) 100%);
  text-align: center;
}

.cardKicker {
  font-family: var(--font-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--accent);
  margin-bottom: var(--space-3);
}

.cardTitle {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.cardLead { font-size: var(--text-headline); color: var(--text-secondary); margin-bottom: var(--space-3); }

.layers { list-style: none; display: flex; flex-direction: column; gap: var(--space-2); margin-bottom: var(--space-5); }

.layer {
  font-family: var(--font-display);
  font-size: var(--text-title);
  font-weight: 600;
  color: var(--accent);
  letter-spacing: -0.02em;
}

.cardCoda { font-size: var(--text-headline); color: var(--text-secondary); line-height: 1.55; margin-bottom: var(--space-2); }

@media (max-width: 768px) { .cardTitle { font-size: var(--text-display); } .layer { font-size: var(--text-headline); } }
@media (max-width: 640px) { .cardTitle { font-size: var(--text-title); } .cardLead, .cardCoda { font-size: var(--text-body); } }
```

- [ ] **Step 3: 创建 `src/sections/Footer.tsx`**

```tsx
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className="container">
        <div className={styles.logo}>
          <span className={styles.prompt}>&gt;_</span>
          <span className={styles.name}>PleaseEnterYourText</span>
        </div>
        <h2 className={styles.identity}>Xia Tian</h2>
        <p className={styles.role}>Founder of PleaseEnterYourText</p>
        <p className={styles.roles}>Independent Developer · System Builder · Future Explorer</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: 创建 `src/sections/Footer.module.css`**

```css
.footer {
  padding: clamp(80px, 12vh, 140px) 0;
  border-top: 1px solid var(--hairline);
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 28px;
  font-weight: 500;
  margin-bottom: var(--space-5);
}

.prompt { color: var(--accent); }
.name { color: var(--text-primary); }

.identity {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin-bottom: var(--space-3);
}

.role {
  font-size: var(--text-headline);
  color: var(--text-secondary);
  margin-bottom: var(--space-1);
}

.roles {
  font-family: var(--font-mono);
  font-size: var(--text-caption);
  color: var(--text-tertiary);
  letter-spacing: 0.04em;
}

@media (max-width: 640px) { .identity { font-size: var(--text-display); } }
```

- [ ] **Step 5: 验证构建**

Run: `npm run build`
Expected: 通过。

- [ ] **Step 6: Commit**

```bash
git add src/sections/Vision.* src/sections/Footer.*
git commit -m "feat: add vision and footer sections"
```

---

### Task 13: App 装配(12 章节 + Nav + SectionDots + ScrollProgress)

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: 全部 12 章节 + `Nav` + `SectionDots` + `ScrollProgress`。
- Produces: 完整页面。

- [ ] **Step 1: 替换 `src/App.tsx` 为完整装配**

```tsx
import { Nav } from './components/Nav';
import { ScrollProgress } from './components/ScrollProgress';
import { SectionDots } from './components/SectionDots';
import { Hero } from './sections/Hero';
import { Intro } from './sections/Intro';
import { Philosophy } from './sections/Philosophy';
import { Studio } from './sections/Studio';
import { Mission } from './sections/Mission';
import { Research } from './sections/Research';
import { Projects } from './sections/Projects';
import { Engineering } from './sections/Engineering';
import { TechStack } from './sections/TechStack';
import { BeyondCode } from './sections/BeyondCode';
import { Vision } from './sections/Vision';
import { Footer } from './sections/Footer';

const SECTIONS = [
  { id: 'hero', label: '首屏' },
  { id: 'intro', label: 'Xia Tian' },
  { id: 'philosophy', label: '哲学' },
  { id: 'studio', label: '工作室' },
  { id: 'mission', label: '使命' },
  { id: 'research', label: '研究' },
  { id: 'projects', label: '项目' },
  { id: 'engineering', label: '工程' },
  { id: 'stack', label: '技术栈' },
  { id: 'beyond', label: '技术之外' },
  { id: 'vision', label: '愿景' },
  { id: 'footer', label: '署名' },
];

export function App() {
  return (
    <>
      <a href="#hero" className="skip-link">跳到内容</a>
      <ScrollProgress />
      <Nav />
      <SectionDots sections={SECTIONS} />
      <main>
        <Hero />
        <Intro />
        <Philosophy />
        <Studio />
        <Mission />
        <Research />
        <Projects />
        <Engineering />
        <TechStack />
        <BeyondCode />
        <Vision />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: 验证构建**

Run: `npm run build`
Expected: `tsc -b && vite build` 通过,无类型错误。

- [ ] **Step 3: 本地运行验证**

Run: `npm run dev`
Expected: 首屏视频自动播放;滚动经过 12 章节;Nav 链接跳转;右侧 SectionDots 12 个;顶部进度条;全程纯黑白无彩色;`>_ PleaseEnterYourText` 出现在 Nav 与 Footer。

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: assemble all 12 sections with nav, dots, scroll progress"
```

---

### Task 14: 最终验收与 reduced-motion 验证

**Files:**
- 无新文件;仅运行验证。

- [ ] **Step 1: 完整构建**

Run: `cd /Users/xiatian/Desktop/个人主页 && npm run build`
Expected: 通过,`dist/` 生成,包含 `index.html`、JS、CSS、视频与 4 张图片。

- [ ] **Step 2: 运行测试**

Run: `npm test`
Expected: hooks 测试全部 PASS。

- [ ] **Step 3: 开发服务器人工验收**

Run: `npm run dev`,逐项核对:
- [ ] 首屏视频自动播放(muted),无叠加文字主标题。
- [ ] 滚动时视频微放大 + 暗色遮罩淡入 + 底部渐隐到 `#050505`。
- [ ] 12 章节顺序正确:Xia Tian → Philosophy → Studio → Mission → Research → Projects → Engineering → TechStack → BeyondCode → Vision → Footer。
- [ ] 全程纯黑白,无任何彩色(检查 DevTools 元素颜色)。
- [ ] Nav 6 链接跳转正确;右侧 12 个 dot;顶部进度条。
- [ ] `>_ PleaseEnterYourText` 在 Nav 左上与 Footer。
- [ ] 4 张项目封面图为黑白抽象几何,加载正常。
- [ ] ChapterMark 章节标记竖线动画;逐行 blur 揭示在 Intro/Philosophy 生效。

- [ ] **Step 4: reduced-motion 验证**

在 DevTools Rendering 面板勾选 "Emulate prefers-reduced-motion: reduce",刷新:
- [ ] 视频静态全屏(无视差)。
- [ ] 所有动画即时完成(无过渡)。
- [ ] 滚动揭示内容直接可见。

- [ ] **Step 5: 响应式验证**

在 1024 / 768 / 640 三档断点检查:
- [ ] 字号缩放正确。
- [ ] 网格在窄屏降为单列。
- [ ] Nav 链接在 640 以下隐藏。

- [ ] **Step 6: 最终 Commit**

```bash
git add -A
git commit -m "chore: final verification pass"
```

---

## Self-Review 记录

**1. Spec 覆盖:** 逐项核对 spec §5 的 12 章节 → Task 5(Hero)、7(Intro/Philosophy)、8(Studio/Mission)、9(Research)、10(Projects)、11(Engineering/TechStack/BeyondCode)、12(Vision/Footer);§6 视频处理 → Task 5 VideoHero;§4 token → Task 2;§8 组件 → Task 4/6;§9 封面图 → Task 10。全部覆盖。

**2. 占位符扫描:** 无 TBD/TODO;所有代码块均为完整可执行内容。

**3. 类型一致性:** `ChapterMark` 的 `num/title/total` 在 Task 4 定义、Task 5-12 调用一致;`MonoTable` 的 `columns: {title, items}[]` 在 Task 6 定义、Task 11 调用一致;`TwoCol` 的 `left/right` 在 Task 6 定义、Task 11 调用一致;`SectionDots` 的 `sections: {id,label}[]` 在 Task 4 定义、Task 13 调用一致。

## 执行交接

计划已完成并保存至 `docs/superpowers/plans/2026-08-07-xiatian-personal-homepage.md`。有两种执行选项:

**1. Subagent 驱动（推荐）** - 我为每个任务分配一个新的 subagent，在任务之间进行审核，实现快速迭代。

**2. 内联执行** - 在当前会话中使用 `executing-plans` 执行任务，进行带有检查点的批量执行。

请选择方式?
