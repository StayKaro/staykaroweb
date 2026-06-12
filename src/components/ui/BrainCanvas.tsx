"use client";

import { useEffect, useRef } from "react";

interface Node3D {
  ox: number; oy: number; oz: number;
  sx: number; sy: number;
  size: number;
  baseAlpha: number;
  pulsePhase: number;
  isHub: boolean;
}

interface DataPulse { ci: number; t: number; speed: number; }

// ─── setup receives explicitly typed non-null canvas + ctx ───────────────────
function setup(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
): () => void {
  const raf = { id: 0 };
  let W = 0, H = 0;
  let nodes: Node3D[] = [];
  let conns: [number, number][] = [];
  let connDists: number[] = [];
  let pulses: DataPulse[] = [];
  let rotY = 0;

  const FOCAL = 750, RX = 160, RY = 128, RZ = 118;
  const N_NODES = 210, N_HUBS = 18, C_DIST = 82, N_PULSE = 38;

  function inBrain(x: number, y: number, z: number) {
    const l = (x + 55) ** 2 / RX ** 2 + y ** 2 / RY ** 2 + z ** 2 / RZ ** 2;
    const r = (x - 55) ** 2 / RX ** 2 + y ** 2 / RY ** 2 + z ** 2 / RZ ** 2;
    const s = x ** 2 / 28 ** 2 + (y - 88) ** 2 / 44 ** 2 + z ** 2 / 22 ** 2;
    return l < 1 || r < 1 || s < 1;
  }

  function init() {
    nodes = [];
    let tries = 0;
    while (nodes.length < N_NODES && tries < N_NODES * 30) {
      tries++;
      const x = (Math.random() - 0.5) * (RX * 2 + 80);
      const y = (Math.random() - 0.5) * (RY * 2 + 80);
      const z = (Math.random() - 0.5) * (RZ * 2 + 80);
      if (inBrain(x, y, z)) {
        nodes.push({ ox: x, oy: y, oz: z, sx: 0, sy: 0, size: Math.random() * 1.4 + 0.8, baseAlpha: Math.random() * 0.35 + 0.65, pulsePhase: Math.random() * Math.PI * 2, isHub: false });
      }
    }
    for (let i = 0; i < N_HUBS; i++) {
      const idx = Math.floor(Math.random() * nodes.length);
      nodes[idx].isHub = true;
      nodes[idx].size = Math.random() * 2.5 + 3.5;
    }
    conns = []; connDists = [];
    for (let i = 0; i < nodes.length; i++) {
      let c = 0;
      for (let j = i + 1; j < nodes.length && c < 7; j++) {
        const dx = nodes[i].ox - nodes[j].ox;
        const dy = nodes[i].oy - nodes[j].oy;
        const dz = nodes[i].oz - nodes[j].oz;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < C_DIST) { conns.push([i, j]); connDists.push(d); c++; }
      }
    }
    pulses = Array.from({ length: N_PULSE }, () => newPulse());
  }

  function newPulse(): DataPulse {
    return { ci: Math.floor(Math.random() * conns.length), t: Math.random(), speed: 0.003 + Math.random() * 0.009 };
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width  = W * devicePixelRatio;
    canvas.height = H * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }

  function drawTraces() {
    ctx.lineWidth = 1;
    ctx.fillStyle = "rgba(204,26,26,0.22)";
    const lines: [number, number, number, number, number, number][] = [
      [40, 120, 160, 120, 160,  60],
      [40, 160, 120, 160, 120, 220],
      [W - 40, 130, W - 170, 130, W - 170,  70],
      [W - 40, 170, W - 130, 170, W - 130, 230],
      [50, H - 100, 170, H - 100, 170, H - 50],
      [W - 50, H - 110, W - 160, H - 110, W - 160, H - 55],
    ];
    lines.forEach(([x1, y1, x2, y2, x3, y3]) => {
      ctx.strokeStyle = "rgba(204,26,26,0.12)";
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3); ctx.stroke();
      ctx.beginPath(); ctx.arc(x2, y2, 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x1, y1, 1.5, 0, Math.PI * 2); ctx.fill();
    });
  }

  function draw(time: number) {
    ctx.clearRect(0, 0, W, H);
    rotY += 0.0035;
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const cx = W / 2, cy = H / 2 - 20;

    nodes.forEach(n => {
      const rx = n.ox * cosY - n.oz * sinY;
      const rz = n.ox * sinY + n.oz * cosY;
      const scale = FOCAL / (FOCAL + rz);
      n.sx = cx + rx * scale;
      n.sy = cy + n.oy * scale;
    });

    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.52);
    g.addColorStop(0,   "rgba(204,26,26,0.18)");
    g.addColorStop(0.45,"rgba(204,26,26,0.06)");
    g.addColorStop(1,   "transparent");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    drawTraces();

    conns.forEach(([i, j], ci) => {
      const na = nodes[i], nb = nodes[j];
      const depth = ((na.ox * sinY + na.oz * cosY + nb.ox * sinY + nb.oz * cosY) / 2 + 200) / 400;
      const a = (1 - connDists[ci] / C_DIST) * 0.22 * Math.max(0.15, Math.min(1, depth));
      ctx.beginPath(); ctx.moveTo(na.sx, na.sy); ctx.lineTo(nb.sx, nb.sy);
      ctx.strokeStyle = `rgba(204,26,26,${a})`; ctx.lineWidth = 0.6; ctx.stroke();
    });

    pulses.forEach((p, i) => {
      p.t += p.speed;
      if (p.t > 1 || p.ci >= conns.length) { pulses[i] = newPulse(); return; }
      const [ai, bi] = conns[p.ci];
      const na = nodes[ai], nb = nodes[bi];
      const px = na.sx + (nb.sx - na.sx) * p.t;
      const py = na.sy + (nb.sy - na.sy) * p.t;
      ctx.beginPath(); ctx.arc(px, py, 2.8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,200,200,1)";
      ctx.shadowBlur = 16; ctx.shadowColor = "rgba(204,26,26,0.95)";
      ctx.fill(); ctx.shadowBlur = 0;
    });

    const sorted = nodes.map((n, i) => [i, n.ox * sinY + n.oz * cosY] as [number, number]).sort((a, b) => a[1] - b[1]);
    const t = time * 0.001;
    sorted.forEach(([i]) => {
      const n = nodes[i];
      const pulse = 0.72 + 0.28 * Math.sin(t + n.pulsePhase);
      const depth = Math.max(0.12, Math.min(1, (n.ox * sinY + n.oz * cosY + 220) / 440));
      const sz = n.size * pulse * (0.4 + depth * 0.6);

      if (n.isHub) {
        ctx.beginPath(); ctx.arc(n.sx, n.sy, sz * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(204,26,26,${0.07 * depth * pulse})`; ctx.fill();
        ctx.beginPath(); ctx.arc(n.sx, n.sy, sz * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,120,120,${0.4 * depth * pulse})`;
        ctx.shadowBlur = 22; ctx.shadowColor = "rgba(204,26,26,1)";
        ctx.fill(); ctx.shadowBlur = 0;
      }

      ctx.beginPath(); ctx.arc(n.sx, n.sy, Math.max(0.3, sz), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,160,160,${n.baseAlpha * depth * pulse})`;
      if (sz > 1) { ctx.shadowBlur = 7; ctx.shadowColor = "rgba(204,26,26,0.75)"; }
      ctx.fill(); ctx.shadowBlur = 0;
    });

    raf.id = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  init();
  raf.id = requestAnimationFrame(draw);

  return () => {
    window.removeEventListener("resize", resize);
    cancelAnimationFrame(raf.id);
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function BrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    return setup(canvas, ctx);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
