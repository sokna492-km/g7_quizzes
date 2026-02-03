import React, { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 180;
const REPEL_RADIUS = 200;
const REPEL_STRENGTH = 0.28;
const DRIFT = 0.03;
const DAMPING = 0.96;
const BASE_SPEED = 0.08;

// Theme-aware particle colors (opacity applied in canvas)
const LIGHT_COLORS = [
  [99, 102, 241],   // indigo
  [139, 92, 246],   // violet
  [245, 158, 11],   // amber
  [236, 72, 153],   // pink
  [34, 197, 94],    // emerald
  [59, 130, 246],   // blue
];
const DARK_COLORS = [
  [129, 140, 248],  // indigo light
  [167, 139, 250],  // violet light
  [251, 191, 36],   // amber light
  [244, 114, 182],  // pink light
  [52, 211, 153],   // emerald light
  [96, 165, 250],   // blue light
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colorIndex: number;
}

function getParticleColors(): number[][] {
  if (typeof document === 'undefined') return LIGHT_COLORS;
  return document.documentElement.getAttribute('data-theme') === 'dark'
    ? DARK_COLORS
    : LIGHT_COLORS;
}

/** Antigravity-style particle field that repels from cursor/touch. */
const FloatingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -1e4, y: -1e4 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w, h };
    };

    let { w, h } = setSize();
    const paletteLength = getParticleColors().length;

    const initParticles = () => {
      const particles: Particle[] = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * BASE_SPEED,
          vy: (Math.random() - 0.5) * BASE_SPEED,
          radius: 2 + Math.random() * 2.5,
          colorIndex: Math.floor(Math.random() * paletteLength),
        });
      }
      return particles;
    };

    if (particlesRef.current.length === 0) {
      particlesRef.current = initParticles();
    }

    const handlePointer = (clientX: number, clientY: number) => {
      pointerRef.current = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: PointerEvent) => handlePointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const resize = () => {
      const sz = setSize();
      w = sz.w;
      h = sz.h;
      particlesRef.current = initParticles();
    };
    window.addEventListener('resize', resize);

    const tick = () => {
      const opacity = document.documentElement.getAttribute('data-theme') === 'dark' ? 0.35 : 0.5;
      const px = pointerRef.current.x;
      const py = pointerRef.current.y;
      const particles = particlesRef.current;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        const dx = p.x - px;
        const dy = p.y - py;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;

        if (dist < REPEL_RADIUS) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          const f = (force * force * REPEL_STRENGTH) / dist;
          p.vx += (dx * f);
          p.vy += (dy * f);
        }

        p.vx += (Math.random() - 0.5) * DRIFT;
        p.vy += (Math.random() - 0.5) * DRIFT;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -0.8;
        if (p.y < 0 || p.y > h) p.vy *= -0.8;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));

        const palette = getParticleColors();
        const color = palette[p.colorIndex % palette.length]!;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ opacity: 0.95 }}
      aria-hidden
    />
  );
};

export default FloatingBackground;
