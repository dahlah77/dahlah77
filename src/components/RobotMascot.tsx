import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const RobotMascot = () => {
  const reduce = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const floatY = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const haloScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    if (reduce) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      setPointer({ x, y });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduce]);

  const headOffset = useMemo(
    () => ({
      x: reduce ? 0 : pointer.x * 7,
      y: reduce ? 0 : pointer.y * 5
    }),
    [pointer, reduce]
  );

  return (
    <motion.div style={{ y: reduce ? 0 : floatY }} className="relative mx-auto h-[360px] w-[300px] sm:h-[420px] sm:w-[340px]">
      <motion.div
        style={{ scale: reduce ? 1 : haloScale }}
        animate={reduce ? undefined : { opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-cyan-400/30 via-violet-500/20 to-transparent blur-3xl"
      />

      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0], rotateZ: [0, 1.2, 0, -1.2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-12 h-52 w-52 -translate-x-1/2 rounded-[42%] border border-cyan-200/30 bg-gradient-to-b from-slate-200/10 to-slate-900/70 p-4 shadow-glow backdrop-blur"
      >
        <motion.div
          style={headOffset}
          className="relative h-full w-full rounded-[38%] border border-cyan-100/30 bg-gradient-to-b from-slate-100/20 to-slate-900/80"
        >
          <div className="absolute left-1/2 top-12 flex -translate-x-1/2 gap-4">
            {[0, 1].map((eye) => (
              <motion.div
                key={eye}
                animate={reduce ? undefined : { opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5 + eye * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                className="h-8 w-8 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(50,217,255,0.8)]"
              />
            ))}
          </div>
          <motion.div
            animate={reduce ? undefined : { scaleX: [0.9, 1.15, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-10 left-1/2 h-2 w-20 -translate-x-1/2 rounded-full bg-cyan-200/80"
          />
        </motion.div>
      </motion.div>

      <motion.div
        animate={reduce ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 h-44 w-56 -translate-x-1/2 rounded-[36%] border border-violet-200/20 bg-gradient-to-b from-slate-200/10 to-slate-950/85 p-6 shadow-violet"
      >
        <div className="grid h-full grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((chip) => (
            <div
              key={chip}
              className="rounded-xl border border-cyan-100/15 bg-slate-900/70 shadow-[inset_0_0_18px_rgba(143,107,255,0.2)]"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
