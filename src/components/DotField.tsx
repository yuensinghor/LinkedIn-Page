import { useEffect, useRef } from 'react';

type DotFieldProps = {
  /** Main dot colour as an RGB triplet, e.g. '79, 70, 229'. */
  color?: string;
  /** Accent colour used by about one in five dots. */
  color2?: string;
  className?: string;
};

type Dot = {
  bx: number; // home position, 0..1
  by: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ph: number; // drift phase
  ds: number; // drift speed
  amp: number; // drift amplitude (px)
  r: number;
  energy: number;
  near: number;
  accent: boolean;
  placed: boolean;
};

const CONFIG = {
  radius: 150, // attraction radius (px)
  strength: 0.2, // pull toward cursor
  swirl: 0.42, // tangential force, so dots orbit instead of collapsing
  damping: 0.9, // velocity decay per frame
  spring: 0.005, // pull back to home position
  maxSpeed: 9, // px per frame cap
  dotAlpha: 0.5,
  glowScale: 5.2,
  lineDistance: 96, // connect hot dots closer than this
  lineAlpha: 0.18,
};

const TAU = Math.PI * 2;

/** Soft glow sprite, drawn once and reused every frame. */
function makeSprite(rgb: string): HTMLCanvasElement {
  const s = 64;
  const c = document.createElement('canvas');
  c.width = s;
  c.height = s;
  const g = c.getContext('2d');
  if (!g) return c;
  const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grd.addColorStop(0, `rgba(${rgb}, 1)`);
  grd.addColorStop(0.22, `rgba(${rgb}, 0.55)`);
  grd.addColorStop(0.55, `rgba(${rgb}, 0.14)`);
  grd.addColorStop(1, `rgba(${rgb}, 0)`);
  g.fillStyle = grd;
  g.beginPath();
  g.arc(s / 2, s / 2, s / 2, 0, TAU);
  g.fill();
  return c;
}

/**
 * Cursor-attract dot field. It fills the nearest positioned ancestor
 * (give that element `relative overflow-hidden`) and never blocks clicks.
 */
export function DotField({
  color = '79, 70, 229',
  color2 = '14, 143, 158',
  className = '',
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext('2d', { alpha: true });
    if (!context) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const spriteA = makeSprite(color);
    const spriteB = makeSprite(color2);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false, init: false };
    const dots: Dot[] = [];
    let W = 0;
    let H = 0;
    let running = false;
    let visible = true;
    let last = 0;
    let raf = 0;
    let lastEvent: PointerEvent | null = null;

    const build = () => {
      const n = Math.max(40, Math.min(160, Math.round((W * H) / 9000)));
      for (let i = 0; i < n; i++) {
        dots.push({
          bx: Math.random(),
          by: Math.random(),
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          ph: Math.random() * TAU,
          ds: 0.14 + Math.random() * 0.28,
          amp: 5 + Math.random() * 15,
          r: 0.7 + Math.random() * 1.15,
          energy: 0,
          near: 0,
          accent: Math.random() < 0.2,
          placed: false,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      // lines between nearby "hot" dots
      if (pointer.active) {
        const hot = dots.filter((d) => d.near > 0.02);
        const LD = CONFIG.lineDistance;
        const LD2 = LD * LD;
        ctx.lineWidth = 1;
        for (let a = 0; a < hot.length; a++) {
          const p = hot[a];
          for (let b = a + 1; b < hot.length; b++) {
            const q = hot[b];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const dd = dx * dx + dy * dy;
            if (dd > LD2) continue;
            const alpha =
              Math.min(p.near, q.near) * (1 - Math.sqrt(dd) / LD) * CONFIG.lineAlpha;
            if (alpha < 0.005) continue;
            ctx.strokeStyle = `rgba(${color}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // dots: soft glow plus a crisp core
      for (const d of dots) {
        const e = d.energy;
        const size = d.r * CONFIG.glowScale * (1 + e * 1.5);
        ctx.globalAlpha = CONFIG.dotAlpha * (0.42 + e * 0.9);
        ctx.drawImage(d.accent ? spriteB : spriteA, d.x - size, d.y - size, size * 2, size * 2);
        ctx.globalAlpha = 0.5 + e * 0.5;
        ctx.fillStyle = `rgba(${color}, 1)`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 0.85, 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = (dt: number, time: number) => {
      // the attractor eases toward the real pointer for a bit of lag
      if (pointer.active) {
        if (!pointer.init) {
          pointer.x = pointer.tx;
          pointer.y = pointer.ty;
          pointer.init = true;
        } else {
          const k = Math.min(1, 0.2 * dt);
          pointer.x += (pointer.tx - pointer.x) * k;
          pointer.y += (pointer.ty - pointer.y) * k;
        }
      } else {
        pointer.init = false;
      }

      const R = CONFIG.radius;
      const R2 = R * R;
      const damping = Math.pow(CONFIG.damping, dt);
      const maxSq = CONFIG.maxSpeed * CONFIG.maxSpeed;

      for (const d of dots) {
        const hx = d.bx * W + Math.cos(time * d.ds + d.ph) * d.amp;
        const hy = d.by * H + Math.sin(time * d.ds * 1.17 + d.ph) * d.amp;
        let ax = (hx - d.x) * CONFIG.spring;
        let ay = (hy - d.y) * CONFIG.spring;
        let near = 0;

        if (pointer.active) {
          const dx = pointer.x - d.x;
          const dy = pointer.y - d.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const dist = Math.sqrt(d2) || 0.001;
            const fall = 1 - dist / R; // 1 at the cursor, 0 at the edge
            const f = fall * fall * CONFIG.strength;
            const nx = dx / dist;
            const ny = dy / dist;
            ax += nx * f - ny * f * CONFIG.swirl;
            ay += ny * f + nx * f * CONFIG.swirl;
            // soft repulsion so dots never stack on the cursor
            if (dist < 24) {
              const push = (1 - dist / 24) * 1.2;
              ax -= nx * push;
              ay -= ny * push;
            }
            near = fall;
          }
        }

        // energy ignites fast and cools slowly
        d.near = near;
        const rate = near > d.energy ? 0.3 : 0.05;
        d.energy += (near - d.energy) * Math.min(1, rate * dt);

        d.vx = (d.vx + ax * dt) * damping;
        d.vy = (d.vy + ay * dt) * damping;
        const sp2 = d.vx * d.vx + d.vy * d.vy;
        if (sp2 > maxSq) {
          const s = CONFIG.maxSpeed / Math.sqrt(sp2);
          d.vx *= s;
          d.vy *= s;
        }
        d.x += d.vx * dt;
        d.y += d.vy * dt;
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (dots.length === 0) build();
      for (const d of dots) {
        if (!d.placed) {
          d.x = d.bx * W;
          d.y = d.by * H;
          d.placed = true;
        } else {
          d.x = Math.min(d.x, W);
          d.y = Math.min(d.y, H);
        }
      }
      if (reduceMotion || !running) render();
    };

    const frame = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (!last) last = now;
      let dt = (now - last) / 16.667;
      last = now;
      if (dt > 3) dt = 3; // clamp after tab switches
      if (dt <= 0) return;
      step(dt, now / 1000);
      render();
    };

    const start = () => {
      if (reduceMotion || running || !visible || document.hidden) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const updatePointer = (e: PointerEvent) => {
      lastEvent = e;
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      pointer.tx = x;
      pointer.ty = y;
      pointer.active = x > -40 && x < r.width + 40 && y > -40 && y < r.height + 40;
    };
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === 'touch') pointer.active = false;
    };
    const onScroll = () => {
      // keep the attractor in the right place while the page scrolls under a still cursor
      if (lastEvent && pointer.active) updatePointer(lastEvent);
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('pointerdown', updatePointer, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('blur', onLeave);
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    // pause when the hero is scrolled out of view
    const io =
      'IntersectionObserver' in window
        ? new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (!entry) return;
            visible = entry.isIntersecting;
            if (visible) start();
            else stop();
          })
        : null;
    io?.observe(canvas);

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    resize();
    start();

    return () => {
      stop();
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('pointerdown', updatePointer);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('blur', onLeave);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      io?.disconnect();
      ro.disconnect();
    };
  }, [color, color2]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 block h-full w-full ${className}`}
    />
  );
}