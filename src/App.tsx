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
import { useEffect, useState } from 'react';

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

// 5 档关键帧：首屏透明 → 滚动后不透明 → Vision 段透出仪式感
function getVeilOpacity(progress: number): number {
  if (progress <= 0.04) return progress / 0.04;
  if (progress <= 0.88) return 1;
  if (progress <= 0.94) return 1 - ((progress - 0.88) / 0.06) * 0.85;
  return 0.15;
}

export function App() {
  const [veilOpacity, setVeilOpacity] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      setVeilOpacity(getVeilOpacity(progress));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="video-bg" aria-hidden="true">
        <video
          src="/Xiatian.mp4"
          muted
          loop
          playsInline
        />
      </div>
      <div
        className="bg-veil"
        style={{ opacity: veilOpacity }}
        aria-hidden="true"
      />
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
