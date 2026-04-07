import { motion, useMotionValue, useSpring } from 'framer-motion';
import { AnchorHTMLAttributes, MouseEvent, PropsWithChildren, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

type MagneticButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'ghost';
};

export const MagneticButton = ({ children, variant = 'primary', className = '', ...props }: PropsWithChildren<MagneticButtonProps>) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 16 });
  const springY = useSpring(y, { stiffness: 200, damping: 16 });

  const onMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.2);
    y.set(dy * 0.2);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variantClasses =
    variant === 'primary'
      ? 'bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 shadow-glow'
      : 'border border-cyan-300/30 bg-slate-900/40 text-cyan-100';

  return (
    <motion.a
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={reduce ? undefined : { x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300 hover:brightness-110 ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  );
};
