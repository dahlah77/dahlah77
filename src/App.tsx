import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6';
import { certificates, experience } from './data/experience';
import { gallery } from './data/gallery';
import { profile } from './data/profile';
import { projects } from './data/projects';
import { skills } from './data/skills';
import { socialLinks } from './data/social';
import { GalleryLightbox } from './components/GalleryLightbox';
import { MagneticButton } from './components/MagneticButton';
import { Navbar } from './components/Navbar';
import { RobotMascot } from './components/RobotMascot';
import { SectionHeading } from './components/SectionHeading';
import { GalleryItem } from './types/content';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 }
};

function App() {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const topSocials = useMemo(() => socialLinks.slice(0, 6), []);

  return (
    <div className="relative overflow-x-hidden bg-midnight text-white">
      <Navbar />

      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid-faint bg-[size:30px_30px] opacity-30" />
      <div className="pointer-events-none fixed left-1/2 top-0 -z-10 h-[480px] w-[800px] -translate-x-1/2 bg-gradient-to-b from-cyan-500/20 to-transparent blur-3xl" />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <section id="hero" className="relative grid min-h-[86vh] items-center gap-12 pb-16 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p className="mb-4 inline-flex rounded-full border border-cyan-200/30 bg-cyan-400/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200">
              {profile.username}
            </p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {profile.fullName}
            </h1>
            <p className="mt-5 max-w-xl text-xl text-cyan-200/90">{profile.tagline}</p>
            <p className="mt-4 max-w-xl text-slate-300">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton href="#projects">{profile.ctaPrimary}</MagneticButton>
              <MagneticButton href="#contact" variant="ghost">
                {profile.ctaSecondary}
              </MagneticButton>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-white/10 px-3 py-1">{profile.location}</span>
              <span className="rounded-full border border-cyan-400/30 px-3 py-1 text-cyan-200">{profile.availability}</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.2 }}>
            <RobotMascot />
          </motion.div>
        </section>

        <section id="about" className="py-16">
          <SectionHeading eyebrow="About" title="A cinematic digital craftsman focused on impact." subtitle="I create premium web experiences that combine strategic UX, storytelling visuals, and production-grade front-end architecture." />
        </section>

        <section id="skills" className="py-16">
          <SectionHeading eyebrow="Capabilities" title="Multi-disciplinary skill stack." />
          <div className="grid gap-6 md:grid-cols-2">
            {skills.map((group) => (
              <motion.article key={group.category} {...fadeInUp} className="rounded-2xl border border-cyan-100/15 bg-slate-900/50 p-6">
                <h3 className="mb-3 text-lg font-semibold text-cyan-200">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="projects" className="py-16">
          <SectionHeading eyebrow="Featured Projects" title="Premium products with measurable outcomes." />
          <div className="grid gap-8">
            {projects.map((project) => (
              <motion.article key={project.slug} {...fadeInUp} className="overflow-hidden rounded-3xl border border-cyan-100/15 bg-slate-900/45">
                <div className="grid lg:grid-cols-[1.05fr_1fr]">
                  <img src={project.coverImage} alt={project.title} className="h-full min-h-64 w-full object-cover" loading="lazy" />
                  <div className="p-6 sm:p-8">
                    <div className="mb-2 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-cyan-200">
                      <span>{project.category}</span>
                      <span className="rounded-full border border-violet-200/30 px-2 py-1 text-[10px]">{project.status}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{project.title}</h3>
                    <p className="mt-3 text-slate-300">{project.shortDescription}</p>
                    <p className="mt-3 text-sm text-slate-400">{project.longDescription}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="rounded-full border border-cyan-300/20 px-3 py-1 text-xs text-cyan-100">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-300">
                      {project.featureHighlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                    <div className="mt-5 flex gap-3">
                      <a href={project.demoUrl} className="inline-flex items-center gap-2 text-sm text-cyan-200 hover:text-cyan-100">
                        Live Demo <FaArrowUpRightFromSquare />
                      </a>
                      <a href={project.repositoryUrl} className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white">
                        Repository <FaGithub />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="gallery" className="py-16">
          <SectionHeading eyebrow="Gallery" title="Visual experiments and creative snapshots." />
          <div className="columns-1 gap-4 space-y-4 sm:columns-2">
            {gallery.map((item) => (
              <motion.button
                key={item.id}
                {...fadeInUp}
                onClick={() => setActiveImage(item)}
                className="group relative w-full overflow-hidden rounded-2xl border border-cyan-100/15 text-left"
              >
                <img src={item.image} alt={item.title} className="w-full transition duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 to-transparent p-4">
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="text-sm text-slate-300">{item.caption}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        <section id="experience" className="py-16">
          <SectionHeading eyebrow="Experience" title="A timeline of growth, craft, and collaboration." />
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              {experience.map((item) => (
                <motion.article key={`${item.period}-${item.role}`} {...fadeInUp} className="rounded-2xl border border-cyan-100/15 bg-slate-900/45 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">{item.period}</p>
                  <h3 className="mt-2 text-lg font-semibold">{item.role}</h3>
                  <p className="text-sm text-violet-200">{item.organization}</p>
                  <p className="mt-3 text-slate-300">{item.description}</p>
                </motion.article>
              ))}
            </div>
            <motion.aside {...fadeInUp} className="rounded-2xl border border-violet-200/20 bg-slate-900/45 p-6">
              <h3 className="mb-4 text-lg font-semibold text-violet-200">Certificates</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                {certificates.map((cert) => (
                  <li key={cert.title} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="font-medium text-white">{cert.title}</p>
                    <p>{cert.issuer}</p>
                    <p className="text-xs text-cyan-200">{cert.year}</p>
                  </li>
                ))}
              </ul>
            </motion.aside>
          </div>
        </section>

        <section id="contact" className="py-16">
          <SectionHeading eyebrow="Contact" title="Let's build something premium together." subtitle="Replace the placeholders in data/social.ts with your real links." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {socialLinks.map(({ platform, handle, url, icon: Icon }) => (
              <motion.a
                key={platform}
                {...fadeInUp}
                href={url}
                className="group rounded-2xl border border-cyan-100/15 bg-slate-900/50 p-4 transition duration-300 hover:border-cyan-300/40"
              >
                <div className="mb-3 inline-flex rounded-full bg-cyan-300/10 p-3 text-cyan-200 transition group-hover:scale-110">
                  <Icon />
                </div>
                <p className="font-medium text-white">{platform}</p>
                <p className="text-sm text-slate-300">{handle}</p>
              </motion.a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-cyan-100/10 bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold text-white">{profile.fullName}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">{profile.username}</p>
            <p className="mt-1 text-sm text-slate-300">{profile.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {topSocials.map(({ platform, url }) => (
              <a key={platform} href={url} className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-200 hover:border-cyan-300/40 hover:text-white">
                {platform}
              </a>
            ))}
            <a href="#hero" className="rounded-full border border-cyan-300/40 px-3 py-1 text-xs text-cyan-200">
              Back to top
            </a>
          </div>
        </div>
      </footer>

      <GalleryLightbox item={activeImage} onClose={() => setActiveImage(null)} />
    </div>
  );
}

export default App;
