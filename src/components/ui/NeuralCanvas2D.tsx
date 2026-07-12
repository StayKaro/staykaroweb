"use client";

import { useEffect, useRef } from "react";

// ─── TYPES & INTERFACES ──────────────────────────────────────────────────────
interface BrainNode {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
  brightness: number;
}

interface BrainPulse {
  fromNode: BrainNode;
  toNode: BrainNode;
  t: number;
  speed: number;
}

interface FloatNode {
  name: string;
  x: number;
  y: number;
  baseY: number;
  phase: number;
  speed: number;
  pulseIntensity: number;
  color: string;
}

interface CurveData {
  fromX: number;
  fromY: number;
  nodeIndex: number;
  phase: number;
  speed: number;
  pulseTimer: number;
}

interface BinaryStream {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  opacity: number;
}

// ─── BEZIER HELPER ──────────────────────────────────────────────────────────
// Computes cubic bezier point at t (0 to 1)
function getBezierPoint(
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number }
) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;

  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
  };
}

// ─── HEAD PATH DRAWING HELPER ────────────────────────────────────────────────
function drawHeadPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.beginPath();
  ctx.moveTo(cx + 0.05 * s, cy - 0.50 * s);
  ctx.bezierCurveTo(cx + 0.25 * s, cy - 0.52 * s, cx + 0.43 * s, cy - 0.38 * s, cx + 0.45 * s, cy - 0.15 * s);
  ctx.bezierCurveTo(cx + 0.46 * s, cy + 0.08 * s, cx + 0.40 * s, cy + 0.28 * s, cx + 0.30 * s, cy + 0.40 * s);
  ctx.bezierCurveTo(cx + 0.22 * s, cy + 0.52 * s, cx + 0.18 * s, cy + 0.60 * s, cx + 0.16 * s, cy + 0.64 * s);
  ctx.bezierCurveTo(cx + 0.04 * s, cy + 0.66 * s, cx - 0.04 * s, cy + 0.66 * s, cx - 0.10 * s, cy + 0.62 * s);
  ctx.bezierCurveTo(cx - 0.20 * s, cy + 0.55 * s, cx - 0.26 * s, cy + 0.44 * s, cx - 0.28 * s, cy + 0.30 * s);
  ctx.bezierCurveTo(cx - 0.30 * s, cy + 0.14 * s, cx - 0.32 * s, cy + 0.05 * s, cx - 0.34 * s, cy - 0.01 * s);
  ctx.bezierCurveTo(cx - 0.37 * s, cy - 0.06 * s, cx - 0.38 * s, cy - 0.11 * s, cx - 0.35 * s, cy - 0.14 * s);
  ctx.bezierCurveTo(cx - 0.42 * s, cy - 0.17 * s, cx - 0.45 * s, cy - 0.23 * s, cx - 0.38 * s, cy - 0.30 * s);
  ctx.bezierCurveTo(cx - 0.32 * s, cy - 0.37 * s, cx - 0.29 * s, cy - 0.43 * s, cx - 0.26 * s, cy - 0.46 * s);
  ctx.bezierCurveTo(cx - 0.16 * s, cy - 0.52 * s, cx - 0.06 * s, cy - 0.52 * s, cx + 0.05 * s, cy - 0.50 * s);
  ctx.closePath();
}

const connectionPairs = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 0],
  [0, 3], [1, 5], [2, 7], [4, 8], [6, 9], [3, 7]
];

interface NeuralCanvas2DProps {
  className?: string;
}

export default function NeuralCanvas2D({ className }: NeuralCanvas2DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let W = 0, H = 0;
    let time = 0;

    // Mouse Parallax coordinates (eased)
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    // ─── ANCHORS AND SCALES ──────────────────────────────────────────────────
    let cx = 0; // head center X
    let cy = 0; // head center Y
    let hs = 0; // head scale
    let isMobile = false;

    // ─── DATA SYSTEM INITIALIZATION ──────────────────────────────────────────
    let brainNodes: BrainNode[] = [];
    let brainConnections: [number, number, number][] = []; // [nodeA, nodeB, baseOpacity]
    let brainPulses: BrainPulse[] = [];
    let floatNodes: FloatNode[] = [];
    let curves: CurveData[] = [];
    let binaryStreams: BinaryStream[] = [];

    // Names for 10 Floating AI Agent Nodes
    const agentNames = [
      "Voice Agent", "Workflows", "Lead Gen", "Database", "Support",
      "AI Inbox", "Analytics", "Auto-Sync", "API Gate", "Agent Host"
    ];

    // Node colors (transition from cyan/blue to warm orange-gold)
    const agentColors = [
      "#38BDF8", "#0EA5E9", "#06B6D4", "#22D3EE", "#14B8A6",
      "#059669", "#F59E0B", "#D97706", "#EA580C", "#DC2626"
    ];

    // Proximity check for placing nodes inside the brain shape
    function inBrain(x: number, y: number, hx: number, hy: number, scale: number) {
      // Brain area is centered in the upper back of the head profile
      const dx = (x - (hx + 0.12 * scale)) / (scale * 0.28);
      const dy = (y - (hy - 0.16 * scale)) / (scale * 0.22);
      return dx * dx + dy * dy < 1.0;
    }

    const init = () => {
      // Calculate responsive dimensions
      isMobile = W < 768;
      cx = isMobile ? W * 0.3 : W * 0.28;
      cy = isMobile ? H * 0.45 : H * 0.48;
      hs = isMobile ? Math.min(W, H) * 0.65 : Math.min(W, H) * 0.78;

      // 1. Initialize Brain Nodes
      brainNodes = [];
      let tries = 0;
      const targetNodeCount = isMobile ? 80 : 150;
      while (brainNodes.length < targetNodeCount && tries < 3000) {
        tries++;
        const rx = cx + (Math.random() - 0.5) * hs * 0.7;
        const ry = cy + (Math.random() - 0.5) * hs * 0.6;
        if (inBrain(rx, ry, cx, cy, hs)) {
          brainNodes.push({
            x: rx,
            y: ry,
            r: Math.random() * 2.8 + 1.2,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            phase: Math.random() * Math.PI * 2,
            brightness: Math.random() * 0.4 + 0.6,
          });
        }
      }

      // 2. Initialize Brain Connections (between close nodes)
      brainConnections = [];
      const connectDist = hs * 0.062;
      for (let i = 0; i < brainNodes.length; i++) {
        let connCount = 0;
        for (let j = i + 1; j < brainNodes.length && connCount < 4; j++) {
          const dx = brainNodes[i].x - brainNodes[j].x;
          const dy = brainNodes[i].y - brainNodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDist) {
            const alpha = 1.0 - dist / connectDist;
            brainConnections.push([i, j, alpha]);
            connCount++;
          }
        }
      }

      // 3. Initialize Internal Brain Pulses (flashing messages)
      brainPulses = Array.from({ length: isMobile ? 12 : 25 }, () => {
        const connIndex = Math.floor(Math.random() * brainConnections.length);
        const [a, b] = brainConnections[connIndex] || [0, 0];
        return {
          fromNode: brainNodes[a],
          toNode: brainNodes[b],
          t: Math.random(),
          speed: 0.006 + Math.random() * 0.012,
        };
      });

      // 4. Initialize Floating AI Agent Nodes (spaced out on the right)
      floatNodes = [];
      const nodeCount = 10;
      const rightX = isMobile ? W * 0.8 : W * 0.78;
      const vertSpacing = isMobile ? H * 0.6 : H * 0.72;
      const startY = cy - vertSpacing * 0.5;

      for (let i = 0; i < nodeCount; i++) {
        const ny = startY + (i / (nodeCount - 1)) * vertSpacing;
        const nx = rightX + (Math.random() - 0.5) * hs * 0.15;
        floatNodes.push({
          name: agentNames[i],
          x: nx,
          y: ny,
          baseY: ny,
          phase: Math.random() * Math.PI * 2,
          speed: 0.8 + Math.random() * 0.8,
          pulseIntensity: 0,
          color: agentColors[i],
        });
      }

      // 5. Initialize Waves / Splines from Brain to AI Nodes
      curves = Array.from({ length: nodeCount }, (_, i) => {
        // Find a brain node to emerge from
        const brainNodeIndex = Math.floor(Math.random() * brainNodes.length);
        const brainNode = brainNodes[brainNodeIndex] || { x: cx + hs * 0.1, y: cy - hs * 0.1 };
        return {
          fromX: brainNode.x,
          fromY: brainNode.y,
          nodeIndex: i,
          phase: Math.random() * Math.PI * 2,
          speed: 0.0035 + Math.random() * 0.004, // traveling particle speed
          pulseTimer: Math.random(),
        };
      });

      // 6. Initialize Binary/Matrix Rain columns (far right)
      binaryStreams = [];
      const cols = isMobile ? 6 : 14;
      const streamStart = isMobile ? W * 0.6 : W * 0.65;
      const colWidth = (W - streamStart) / cols;
      for (let i = 0; i < cols; i++) {
        const streamX = streamStart + i * colWidth + Math.random() * 12;
        binaryStreams.push({
          x: streamX,
          y: Math.random() * -H,
          speed: 1.5 + Math.random() * 3,
          chars: Array.from({ length: Math.floor(10 + Math.random() * 15) }, () =>
            Math.random() > 0.5 ? "1" : "0"
          ),
          opacity: 0.04 + Math.random() * 0.08,
        });
      }
    };

    // ─── RESIZE & LISTENERS ──────────────────────────────────────────────────
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      init();
    };

    const mouseMove = (e: MouseEvent) => {
      // Normalize to [-1, 1] relative to viewport center
      mouse.targetX = (e.clientX - W / 2) / (W / 2);
      mouse.targetY = (e.clientY - H / 2) / (H / 2);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", mouseMove);
    resize();

    // ─── DRAWING ROUTINES ────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      time += 0.01;

      // Smooth mouse parallax easing (lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Parallax translation amounts
      const pBgX = mouse.x * 12, pBgY = mouse.y * 12;
      const pMidX = mouse.x * 25, pMidY = mouse.y * 25;
      const pNodeX = mouse.x * 40, pNodeY = mouse.y * 40;

      // ─── A. BACKGROUND GLOUS & DIGITAL GRIDS ───────────────────────────────
      // 1. Soft glowing aura behind the head (warm orange/red)
      const headGlow = ctx.createRadialGradient(
        cx + pMidX, cy + pMidY, 0,
        cx + pMidX, cy + pMidY, hs * 0.65
      );
      headGlow.addColorStop(0, "rgba(204, 26, 26, 0.14)");
      headGlow.addColorStop(0.5, "rgba(255, 80, 20, 0.04)");
      headGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = headGlow;
      ctx.fillRect(0, 0, W, H);

      // 2. Soft glowing aura behind AI nodes (cool cyan/blue)
      const nodesGlow = ctx.createRadialGradient(
        W * 0.76 + pNodeX, cy + pNodeY, 0,
        W * 0.76 + pNodeX, cy + pNodeY, hs * 0.75
      );
      nodesGlow.addColorStop(0, "rgba(32, 224, 255, 0.08)");
      nodesGlow.addColorStop(0.5, "rgba(10, 80, 200, 0.02)");
      nodesGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = nodesGlow;
      ctx.fillRect(0, 0, W, H);

      // 3. Binary Digital Stream Rain
      ctx.font = "11px Courier, monospace";
      binaryStreams.forEach((stream) => {
        stream.y += stream.speed;
        if (stream.y > H + 100) {
          stream.y = -200;
          stream.speed = 1.5 + Math.random() * 3;
        }

        ctx.fillStyle = `rgba(32, 224, 255, ${stream.opacity})`;
        stream.chars.forEach((char, idx) => {
          const cyPos = stream.y + idx * 16 + pBgY;
          if (cyPos > 0 && cyPos < H) {
            ctx.fillText(char, stream.x + pBgX, cyPos);
          }
        });

        // Mutate chars slowly
        if (Math.random() > 0.95) {
          const randIdx = Math.floor(Math.random() * stream.chars.length);
          stream.chars[randIdx] = Math.random() > 0.5 ? "1" : "0";
        }
      });

      // 4. Undulating digital grid wave at the bottom
      ctx.save();
      ctx.strokeStyle = "rgba(32, 224, 255, 0.07)";
      ctx.lineWidth = 1;
      const bottomY = H * 0.88;
      const waveCount = 4;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const amp = 15 + w * 5;
        const speedMult = 0.5 + w * 0.25;
        for (let x = 0; x < W; x += 18) {
          const y = bottomY + w * 16 + Math.sin(x * 0.004 + time * speedMult + w) * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // ─── B. HEAD SILHOUETTE & GLASSMORPHIC PROFILE (MID-LAYER) ─────────────
      drawHeadPath(ctx, cx + pMidX, cy + pMidY, hs);
      ctx.save();
      ctx.clip();
      // Glass gradient fill inside head
      const glassGrad = ctx.createRadialGradient(
        cx + pMidX, cy + pMidY - hs * 0.15, 0,
        cx + pMidX, cy + pMidY - hs * 0.15, hs * 0.65
      );
      glassGrad.addColorStop(0, "rgba(204, 26, 26, 0.2)");
      glassGrad.addColorStop(0.5, "rgba(10, 10, 20, 0.62)");
      glassGrad.addColorStop(1, "rgba(6, 6, 12, 0.8)");
      ctx.fillStyle = glassGrad;
      ctx.fill();

      // Subtle gloss reflection
      const reflection = ctx.createLinearGradient(
        cx + pMidX - hs * 0.3, cy + pMidY - hs * 0.4,
        cx + pMidX + hs * 0.1, cy + pMidY + hs * 0.1
      );
      reflection.addColorStop(0, "rgba(255, 255, 255, 0.07)");
      reflection.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = reflection;
      ctx.fill();
      ctx.restore();

      // Border glow
      ctx.save();
      drawHeadPath(ctx, cx + pMidX, cy + pMidY, hs);
      const borderGrad = ctx.createLinearGradient(
        cx + pMidX - hs * 0.4, cy + pMidY - hs * 0.5,
        cx + pMidX + hs * 0.4, cy + pMidY + hs * 0.6
      );
      borderGrad.addColorStop(0, "#FF6666"); // orange-red brow
      borderGrad.addColorStop(0.4, "#CC1A1A"); // red crown
      borderGrad.addColorStop(0.8, "#FFaa44"); // golden nose/chin
      borderGrad.addColorStop(1, "#FF6666");

      ctx.strokeStyle = borderGrad;
      ctx.lineWidth = 1.6;
      ctx.shadowColor = "rgba(204, 26, 26, 0.45)";
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();

      // ─── C. BRAIN NEURAL NETWORK (INSIDE HEAD) ─────────────────────────────
      // Update & Draw Brain Nodes
      brainNodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce inside brain boundary bounds
        if (!inBrain(node.x, node.y, cx + pMidX, cy + pMidY, hs)) {
          node.vx *= -1;
          node.vy *= -1;
          // force shift slightly inside
          const dx = node.x - (cx + pMidX + 0.12 * hs);
          const dy = node.y - (cy + pMidY - 0.16 * hs);
          const angle = Math.atan2(dy, dx);
          node.x = cx + pMidX + 0.12 * hs + Math.cos(angle) * hs * 0.24;
          node.y = cy + pMidY - 0.16 * hs + Math.sin(angle) * hs * 0.18;
        }

        const pulseVal = 0.65 + 0.35 * Math.sin(time * 2.2 + node.phase);
        const r = node.r * pulseVal;

        // Drawing soft node glow
        const nodeGlow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4.5);
        nodeGlow.addColorStop(0, `rgba(255, 70, 20, ${0.11 * pulseVal * node.brightness})`);
        nodeGlow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = nodeGlow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Node center
        ctx.fillStyle = `rgba(255, 200, 160, ${node.brightness * pulseVal})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Connections (fading network lines)
      ctx.save();
      brainConnections.forEach(([i, j, baseA]) => {
        const na = brainNodes[i];
        const nb = brainNodes[j];
        if (!na || !nb) return;
        const pulse = 0.5 + 0.5 * Math.sin(time * 1.5 + na.phase);
        ctx.strokeStyle = `rgba(255, 80, 20, ${baseA * 0.28 * pulse})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();
      });
      ctx.restore();

      // Update & Draw Brain Pulses (glowing packet traveling on paths)
      brainPulses.forEach((pulse, pi) => {
        pulse.t += pulse.speed;
        if (pulse.t > 1) {
          // Restart on a new random connection
          const connIdx = Math.floor(Math.random() * brainConnections.length);
          const [a, b] = brainConnections[connIdx] || [0, 0];
          pulse.fromNode = brainNodes[a];
          pulse.toNode = brainNodes[b];
          pulse.t = 0;
        }

        const na = pulse.fromNode;
        const nb = pulse.toNode;
        if (na && nb) {
          const px = na.x + (nb.x - na.x) * pulse.t;
          const py = na.y + (nb.y - na.y) * pulse.t;

          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = "#FFF4E8";
          ctx.shadowColor = "#FF6622";
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.restore();
        }
      });

      // ─── D. FLOATING AI AGENT NODES (FOREGROUND LAYER) ─────────────────────
      floatNodes.forEach((node, i) => {
        // Floating float motion
        const floatY = Math.sin(time * node.speed + node.phase) * 12;
        const floatX = Math.cos(time * 0.8 * node.speed + node.phase) * 6;
        
        node.x = floatNodes[i].x + floatX + pNodeX;
        node.y = floatNodes[i].baseY + floatY + pNodeY;

        // Eased decay of pulse intensity (when energy arrives)
        node.pulseIntensity *= 0.95;

        const size = 6.5 + node.pulseIntensity * 3.5;

        // Glowing center core (cyan/blue)
        ctx.save();
        const coreGlow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 4.5);
        coreGlow.addColorStop(0, `rgba(32, 224, 255, ${0.28 + node.pulseIntensity * 0.5})`);
        coreGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size * 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Inner glowing white core
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(node.x, node.y, size * 0.45, 0, Math.PI * 2);
        ctx.fill();

        // Rotating orbit ring
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.ellipse(node.x, node.y, 14 + size, 6, time * 1.5 + node.phase, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Node Text Labels
        ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
        ctx.font = "bold 12px var(--font-body), sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(node.name, node.x + 22, node.y + 4);
      });

      // Draw Connections between floating nodes
      ctx.save();
      ctx.strokeStyle = "rgba(32, 224, 255, 0.16)";
      ctx.lineWidth = 0.8;
      connectionPairs.forEach(([a, b]) => {
        const na = floatNodes[a];
        const nb = floatNodes[b];
        if (na && nb) {
          ctx.beginPath();
          ctx.moveTo(na.x, na.y);
          ctx.lineTo(nb.x, nb.y);
          ctx.stroke();
        }
      });
      ctx.restore();

      // ─── E. SPLINE CURVES & TRAVELING ENERGY (BRAIN → NODES) ────────────────
      curves.forEach((curve, i) => {
        const node = floatNodes[curve.nodeIndex];
        if (!node) return;

        // Curves wave and breathe
        const startPt = { x: curve.fromX + pMidX, y: curve.fromY + pMidY };
        const endPt = { x: node.x, y: node.y };

        // Control points dynamic offsets
        const cpOffset1 = Math.sin(time * 1.4 + curve.phase) * 45;
        const cpOffset2 = Math.cos(time * 1.1 + curve.phase) * 55;

        const cp1 = {
          x: startPt.x + (endPt.x - startPt.x) * 0.38,
          y: startPt.y + cpOffset1,
        };
        const cp2 = {
          x: startPt.x + (endPt.x - startPt.x) * 0.75,
          y: endPt.y + cpOffset2,
        };

        // Draw spline curve with gradient (Warm orange to cool cyan/blue)
        ctx.save();
        const splineGrad = ctx.createLinearGradient(startPt.x, startPt.y, endPt.x, endPt.y);
        splineGrad.addColorStop(0, "rgba(255, 100, 40, 0.35)"); // Warm orange emerging
        splineGrad.addColorStop(0.5, "rgba(255, 200, 80, 0.2)"); // Gold middle
        splineGrad.addColorStop(1, "rgba(32, 224, 255, 0.45)"); // Cool cyan ending

        ctx.strokeStyle = splineGrad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(startPt.x, startPt.y);
        ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, endPt.x, endPt.y);
        ctx.stroke();
        ctx.restore();

        // Update & Draw Traveling Energy Pulses along the curve
        curve.pulseTimer += curve.speed;
        if (curve.pulseTimer > 1) {
          curve.pulseTimer = 0;
          // Trigger pulse on the target node!
          node.pulseIntensity = 1.0;
        }

        // Draw 2 traveling pulses per curve
        const pulseTimes = [curve.pulseTimer, (curve.pulseTimer + 0.5) % 1.0];
        pulseTimes.forEach((t) => {
          const pt = getBezierPoint(t, startPt, cp1, cp2, endPt);
          
          ctx.save();
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 3.2, 0, Math.PI * 2);

          // Color interpolations: warm on left (t < 0.5), cool on right (t >= 0.5)
          const pColor = t < 0.5 ? "#FF8040" : "#40E0FF";
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = pColor;
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.restore();
        });
      });

      // ─── F. TEXT OVERLAYS ("AI AGENTS") ─────────────────────────────────────
      ctx.save();
      ctx.textAlign = "center";
      ctx.font = "bold 15px 'Cormorant Garamond', serif";
      // Golden text overlay mirroring the reference image style
      ctx.fillStyle = "rgba(255, 200, 80, 0.28)";
      ctx.shadowColor = "rgba(255, 200, 80, 0.6)";
      ctx.shadowBlur = 10;
      const textX = isMobile ? W * 0.72 : W * 0.76;
      ctx.fillText("AI AGENTS NETWORK", textX, cy - hs * 0.45 + pNodeY);
      ctx.restore();

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          background: "transparent",
        }}
      />
    </div>
  );
}
