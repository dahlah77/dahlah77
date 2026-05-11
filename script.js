const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const counters = document.querySelectorAll('[data-target]');
const countUp = (el) => {
  const target = Number(el.dataset.target);
  let n = 0;
  const step = Math.max(1, Math.floor(target / 90));
  const timer = setInterval(() => {
    n += step;
    if (n >= target) {
      el.textContent = target.toLocaleString('id-ID');
      clearInterval(timer);
    } else {
      el.textContent = n.toLocaleString('id-ID');
    }
  }, 16);
};

const countObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      countUp(e.target);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.7 });
counters.forEach((c) => countObserver.observe(c));

for (const card of document.querySelectorAll('.tilt')) {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = 'none');
}

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  themeToggle.querySelector('span').textContent = document.documentElement.classList.contains('light') ? 'Mode Gelap' : 'Mode Malam';
});

const parallaxNodes = document.querySelectorAll('[data-speed]');
let parallaxTicking = false;
function handleParallax() {
  const y = window.scrollY;
  parallaxNodes.forEach((el) => {
    const speed = Number(el.dataset.speed) || 0.03;
    el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
  });
  parallaxTicking = false;
}
window.addEventListener('scroll', () => {
  if (!parallaxTicking) {
    requestAnimationFrame(handleParallax);
    parallaxTicking = true;
  }
});

const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let w, h, particles;

function setup() {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
  particles = Array.from({ length: Math.min(80, Math.floor(w / 20)) }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    r: Math.random() * 2 + 0.7,
  }));
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(120,190,255,.75)';
  for (const p of particles) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(draw);
}

addEventListener('resize', setup);
setup();
draw();
