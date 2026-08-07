import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
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
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="research" className="section section-lg" ref={ref}>
      <div className="container">
        <ChapterMark num="06" title="Research" />
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          研究方向
        </motion.h2>
        <motion.div
          className={styles.list}
          style={prefersReducedMotion ? undefined : { y: gridY }}
        >
          {DIRECTIONS.map((d, i) => (
            <motion.div
              key={d.en}
              className={styles.direction}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
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
        </motion.div>
      </div>
    </section>
  );
}
