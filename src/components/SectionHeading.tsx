import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
};

export const SectionHeading = ({ eyebrow, title, subtitle }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6 }}
    className="mb-10 max-w-3xl"
  >
    <p className="mb-3 text-xs uppercase tracking-[0.35em] text-cyan-300/80">{eyebrow}</p>
    <h2 className="mb-4 text-3xl font-semibold leading-tight text-white sm:text-4xl">{title}</h2>
    {subtitle ? <p className="text-slate-300">{subtitle}</p> : null}
  </motion.div>
);
