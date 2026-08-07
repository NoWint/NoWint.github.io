import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
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
    img: '/projects/peyt-chat.jpg',
  },
  {
    id: 'bonnext',
    name: 'BonNext',
    tag: 'Minecraft 生态',
    en: 'Modern Minecraft Ecosystem',
    desc: 'BonNext 是一个基于 Rust 构建的新一代 Minecraft 生态工具。它探索高性能桌面应用架构、跨平台软件设计、模块化系统与现代化用户体验。BonNext 不只是一个启动器,它试图重新定义玩家与创造工具之间的关系。',
    tech: 'Rust · 跨平台 · 模块化',
    img: '/projects/bonnext.jpg',
  },
  {
    id: 'continuum',
    name: 'Continuum',
    tag: 'AI Agent',
    en: 'Long-Term AI Agent Architecture',
    desc: 'Continuum 是对于下一代 AI Agent 系统的探索。当前 AI 大多停留在短周期交互,而未来的智能系统需要长期记忆、状态管理、复杂规划、持续学习与自主执行。Continuum 探索如何构建能够长期理解目标,并参与复杂创造过程的智能系统。',
    tech: '长期记忆 · 状态管理 · 持续学习',
    img: '/projects/continuum.jpg',
  },
  {
    id: 'brain-computing',
    name: 'Brain Computing Research',
    tag: '脑科学',
    en: 'Understanding Human Cognition Through Data',
    desc: '我关注神经科学与计算科学的交叉领域。通过 EEG 数据分析与机器学习方法,探索心流状态的神经机制、任务切换带来的认知成本、脑信号特征提取与计算模型辅助认知研究。希望通过计算方式理解人类思维,并探索未来人机融合的可能性。',
    tech: 'EEG · 机器学习 · 认知建模',
    img: '/projects/brain-computing.jpg',
  },
];

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="projects" className="section section-xl" ref={ref}>
      <div className="container">
        <ChapterMark num="07" title="Projects" />
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          项目
        </motion.h2>
        <motion.div
          className={styles.grid}
          style={prefersReducedMotion ? undefined : { y: gridY }}
        >
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.id}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
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
        </motion.div>
      </div>
    </section>
  );
}
