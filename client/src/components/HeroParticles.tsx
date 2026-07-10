import { useEffect, useRef } from "react";

/**
 * Particules animées pour les sections hero.
 *
 * - 100 particules, 2 couleurs de marque (#0047AB / #00A86B)
 * - Lignes de connexion entre particules à distance < 150 px
 * - Repulsion + glow + lignes lumineuses au curseur (uniquement sur survol du hero)
 * - Couvre uniquement le parent (parent doit être `position: relative`)
 * - Respecte `prefers-reduced-motion`
 * - S'adapte à la taille du parent via ResizeObserver
 */

const PARTICLE_COUNT = 100;
const CONNECTION_DISTANCE = 150;
const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
const MOUSE_RADIUS = 120;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
const MOUSE_FORCE = 3;
const MOUSE_LINE_RADIUS = MOUSE_RADIUS * 1.5;
const MOUSE_LINE_RADIUS_SQ = MOUSE_LINE_RADIUS * MOUSE_LINE_RADIUS;
const FRICTION = 0.98;
const MIN_SPEED_SQ = 0.09; // 0.3²
const COLOR_BLUE = "#0047AB";
const COLOR_GREEN = "#00A86B";

type Particle = {
  x: number;
  y: number;
  sx: number;
  sy: number;
  size: number;
  alpha: number;
  color: string;
};

export function HeroParticles({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        sx: (Math.random() - 0.5) * 0.5,
        sy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? COLOR_BLUE : COLOR_GREEN,
      });
    }

    // Suivi du curseur — coordonnées relatives au parent.
    const mouse = { x: 0, y: 0, active: false };
    const onMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onMouseLeave = () => {
      mouse.active = false;
    };
    parent.addEventListener("mousemove", onMouseMove, { passive: true });
    parent.addEventListener("mouseleave", onMouseLeave, { passive: true });

    let visible = true;
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) raf = requestAnimationFrame(animate);
    };
    document.addEventListener("visibilitychange", onVisibility);

    let raf = 0;
    const animate = (timestamp: number = 0) => {
      if (!visible) return;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Repulsion souris
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < MOUSE_RADIUS_SQ && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * MOUSE_FORCE;
            p.sx += (dx / dist) * force * 0.1;
            p.sy += (dy / dist) * force * 0.1;
          }
        }

        // Friction
        p.sx *= FRICTION;
        p.sy *= FRICTION;

        // Vitesse minimum maintenue par micro-impulsions
        if (p.sx * p.sx + p.sy * p.sy < MIN_SPEED_SQ) {
          p.sx += (Math.random() - 0.5) * 0.1;
          p.sy += (Math.random() - 0.5) * 0.1;
        }

        p.x += p.sx;
        p.y += p.sy;

        // Rebond sur les bords
        if (p.x < 0) { p.x = 0; p.sx *= -1; }
        else if (p.x > width) { p.x = width; p.sx *= -1; }
        if (p.y < 0) { p.y = 0; p.sy *= -1; }
        else if (p.y > height) { p.y = height; p.sy *= -1; }

        // Dessin
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      // Glow + lignes vers la souris
      if (mouse.active) {
        const time = timestamp * 0.003;
        const pulse = 0.5 + Math.sin(time) * 0.3;
        const glowRadius = MOUSE_RADIUS * (0.6 + Math.sin(time * 0.7) * 0.15);

        const glow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRadius
        );
        glow.addColorStop(0, `rgba(77, 159, 255, ${0.12 * pulse})`);
        glow.addColorStop(0.4, `rgba(0, 232, 143, ${0.06 * pulse})`);
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        const core = ctx.createRadialGradient(
          mouse.x, mouse.y, 0, mouse.x, mouse.y, 8
        );
        core.addColorStop(0, `rgba(255, 255, 255, ${0.4 * pulse})`);
        core.addColorStop(0.5, `rgba(77, 159, 255, ${0.2 * pulse})`);
        core.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.lineWidth = 0.6;
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < MOUSE_LINE_RADIUS_SQ) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = ((MOUSE_LINE_RADIUS - dist) / MOUSE_LINE_RADIUS) * 0.25;
            ctx.stroke();
          }
        }
      }

      // Connexions inter-particules
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECTION_DISTANCE_SQ) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = a.color;
            ctx.globalAlpha = ((CONNECTION_DISTANCE - dist) / CONNECTION_DISTANCE) * 0.15;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      parent.removeEventListener("mousemove", onMouseMove);
      parent.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}
