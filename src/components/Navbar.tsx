import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { navLinks, profile } from '../data/profile';

export const Navbar = () => {
  const [active, setActive] = useState('hero');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((link) => document.getElementById(link.id)).filter(Boolean) as HTMLElement[];
      const mid = window.scrollY + window.innerHeight * 0.35;
      const current = sections.find((section) => mid >= section.offsetTop && mid < section.offsetTop + section.offsetHeight);
      if (current) {
        setActive(current.id);
      }
    };

    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav
        className={`mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 backdrop-blur-xl transition duration-300 sm:px-6 ${
          scrolled ? 'border-cyan-300/30 bg-slate-950/75 shadow-glow' : 'border-white/10 bg-slate-900/40'
        }`}
      >
        <a href="#hero" className="text-sm font-semibold tracking-[0.2em] text-white">{profile.username}</a>
        <ul className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`text-xs uppercase tracking-[0.22em] transition ${
                  active === link.id ? 'text-cyan-300' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="rounded-full border border-cyan-200/30 px-3 py-1 text-xs text-cyan-100 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          Menu
        </button>
      </nav>

      {open ? (
        <div className="mx-auto mt-3 w-full max-w-6xl rounded-2xl border border-cyan-100/20 bg-slate-950/90 p-4 lg:hidden">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5 hover:text-cyan-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </motion.header>
  );
};
