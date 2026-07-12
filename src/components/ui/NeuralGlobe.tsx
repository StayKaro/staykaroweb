"use client";

import { useEffect, useRef } from "react";

interface SNode { ox:number;oy:number;oz:number;sx:number;sy:number;dz:number;phase:number;size:number; }
interface Pulse  { from:number;to:number;t:number;speed:number; }

// Three orbital rings: equatorial + two tilted
const RING_DEFS = [
  { tx:0,           tz:0           },  // equatorial
  { tx:Math.PI/3.5, tz:0           },  // tilted forward
  { tx:0,           tz:Math.PI/2.8 },  // tilted sideways
];

function setup(canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D):()=>void {
  let raf=0, W=0, H=0, CX=0, CY=0, SR=0;
  let nodes:SNode[]=[], conns:[number,number][]=[],pulses:Pulse[]=[];
  let ringAngs=[0,0,0];  // angle of each ring's animated dot cluster
  let rotY=0;
  const FOCAL=900, ROT_X=0.18;

  // ─── project 3-D → 2-D (rotY around Y, fixed ROT_X around X) ────────────
  function proj(x:number,y:number,z:number):[number,number,number]{
    const rx=x*Math.cos(rotY)-z*Math.sin(rotY);
    const rz=x*Math.sin(rotY)+z*Math.cos(rotY);
    const ry2=y*Math.cos(ROT_X)-rz*Math.sin(ROT_X);
    const rz2=y*Math.sin(ROT_X)+rz*Math.cos(ROT_X);
    const s=FOCAL/(FOCAL+rz2);
    return [CX+rx*s, CY+ry2*s, rz2];
  }

  // ─── tilt a ring point by (tx, tz) ───────────────────────────────────────
  function tiltPoint(x:number,y:number,z:number,tx:number,tz:number):[number,number,number]{
    if(tx){ const ny=y*Math.cos(tx)-z*Math.sin(tx),nz=y*Math.sin(tx)+z*Math.cos(tx);y=ny;z=nz; }
    if(tz){ const nx=x*Math.cos(tz)-y*Math.sin(tz),ny=x*Math.sin(tz)+y*Math.cos(tz);x=nx;y=ny; }
    return [x,y,z];
  }

  function init(){
    SR=Math.min(W,H)*0.30; CX=W/2; CY=H/2;
    nodes=[]; conns=[]; pulses=[];

    // Fibonacci lattice on sphere surface
    const golden=Math.PI*(3-Math.sqrt(5));
    const N=150;
    for(let i=0;i<N;i++){
      const y=(1-i/(N-1))*2-1, r=Math.sqrt(Math.max(0,1-y*y));
      const th=golden*i;
      nodes.push({ox:Math.cos(th)*r*SR,oy:y*SR,oz:Math.sin(th)*r*SR,sx:0,sy:0,dz:0,
        phase:Math.random()*Math.PI*2, size:Math.random()*1.8+1});
    }

    // Connections between nearby nodes
    const maxD=SR*0.52;
    for(let i=0;i<nodes.length;i++)
      for(let j=i+1;j<nodes.length;j++){
        const dx=nodes[i].ox-nodes[j].ox,dy=nodes[i].oy-nodes[j].oy,dz=nodes[i].oz-nodes[j].oz;
        if(dx*dx+dy*dy+dz*dz < maxD*maxD) conns.push([i,j]);
      }

    // Seed pulses
    pulses=Array.from({length:45},()=>{
      const ci=Math.floor(Math.random()*conns.length);
      return {from:conns[ci][0],to:conns[ci][1],t:Math.random(),speed:0.004+Math.random()*0.009};
    });
  }

  function drawRing(tx:number,tz:number,alpha:number){
    const SEGS=128, RR=SR*1.42;
    ctx.beginPath();
    for(let i=0;i<=SEGS;i++){
      const a=(i/SEGS)*Math.PI*2;
      const [px,py,pz]=tiltPoint(Math.cos(a)*RR,0,Math.sin(a)*RR,tx,tz);
      const [sx,sy,dz]=proj(px,py,pz);
      const fade=Math.max(0,(dz+SR*1.5)/(SR*3));
      if(i===0) ctx.moveTo(sx,sy);
      else       ctx.lineTo(sx,sy);
    }
    ctx.strokeStyle=`rgba(204,26,26,${alpha})`;
    ctx.lineWidth=0.9;
    ctx.stroke();
  }

  function resize(){
    W=window.innerWidth; H=window.innerHeight;
    canvas.width=W*devicePixelRatio; canvas.height=H*devicePixelRatio;
    ctx.scale(devicePixelRatio,devicePixelRatio);
    init();
  }

  function draw(time:number){
    ctx.clearRect(0,0,W,H);
    rotY+=0.0038;
    ringAngs=ringAngs.map((a,i)=>a+(0.006+i*0.002)*(i%2===0?1:-1));
    const t=time*0.001;

    // Project nodes
    nodes.forEach(n=>{
      const [sx,sy,dz]=proj(n.ox,n.oy,n.oz);
      n.sx=sx; n.sy=sy; n.dz=dz;
    });

    // ── Central atmosphere glow ──────────────────────────────────────────────
    const atm=ctx.createRadialGradient(CX,CY,0,CX,CY,SR*1.8);
    atm.addColorStop(0,"rgba(204,26,26,0.20)");
    atm.addColorStop(0.35,"rgba(150,10,10,0.08)");
    atm.addColorStop(1,"transparent");
    ctx.fillStyle=atm; ctx.fillRect(0,0,W,H);

    // ── Orbital rings ────────────────────────────────────────────────────────
    RING_DEFS.forEach(({tx,tz})=>drawRing(tx,tz,0.18));

    // ── Ring travelling dots (20 per ring) ──────────────────────────────────
    RING_DEFS.forEach(({tx,tz},ri)=>{
      for(let k=0;k<20;k++){
        const ang=ringAngs[ri]+(k/20)*Math.PI*2;
        const [px,py,pz]=tiltPoint(Math.cos(ang)*SR*1.42,0,Math.sin(ang)*SR*1.42,tx,tz);
        const [sx,sy,dz]=proj(px,py,pz);
        const fade=Math.max(0,(dz+SR*1.5)/(SR*3));
        const bloom=ctx.createRadialGradient(sx,sy,0,sx,sy,5);
        bloom.addColorStop(0,`rgba(255,180,70,${0.6*fade})`);
        bloom.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle=bloom; ctx.beginPath(); ctx.arc(sx,sy,5,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(sx,sy,1.8,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,200,100,${0.9*fade})`;
        ctx.shadowBlur=7; ctx.shadowColor="rgba(255,160,40,0.9)";
        ctx.fill(); ctx.shadowBlur=0;
      }
    });

    // ── Sphere connections ───────────────────────────────────────────────────
    conns.forEach(([i,j])=>{
      const na=nodes[i],nb=nodes[j];
      const fade=Math.max(0,((na.dz+nb.dz)/2+SR)/(SR*2));
      ctx.beginPath(); ctx.moveTo(na.sx,na.sy); ctx.lineTo(nb.sx,nb.sy);
      ctx.strokeStyle=`rgba(204,26,26,${fade*0.32})`; ctx.lineWidth=0.55; ctx.stroke();
    });

    // ── Data pulses ──────────────────────────────────────────────────────────
    pulses.forEach((p,i)=>{
      p.t+=p.speed;
      if(p.t>1){
        const ci=Math.floor(Math.random()*conns.length);
        pulses[i]={from:conns[ci][0],to:conns[ci][1],t:0,speed:0.004+Math.random()*0.009};
        return;
      }
      const na=nodes[p.from],nb=nodes[p.to];
      const px=na.sx+(nb.sx-na.sx)*p.t, py=na.sy+(nb.sy-na.sy)*p.t;
      const fade=Math.max(0.1,((na.dz+nb.dz)/2+SR)/(SR*2));
      ctx.beginPath(); ctx.arc(px,py,2.2,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,210,160,${0.95*fade})`;
      ctx.shadowBlur=14; ctx.shadowColor="rgba(255,80,20,1)";
      ctx.fill(); ctx.shadowBlur=0;
    });

    // ── Sphere nodes (back → front) ──────────────────────────────────────────
    nodes
      .map((n,i)=>[i,n.dz] as [number,number])
      .sort((a,b)=>a[1]-b[1])
      .forEach(([i])=>{
        const n=nodes[i];
        const pulse=0.7+0.3*Math.sin(t*1.6+n.phase);
        const fade=Math.max(0.05,(n.dz+SR)/(SR*2));
        const r=n.size*pulse*(0.25+fade*0.75);

        // soft bloom
        const bm=ctx.createRadialGradient(n.sx,n.sy,0,n.sx,n.sy,r*4);
        bm.addColorStop(0,`rgba(255,50,20,${0.08*fade*pulse})`);
        bm.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle=bm; ctx.beginPath(); ctx.arc(n.sx,n.sy,r*4,0,Math.PI*2); ctx.fill();

        // core dot
        ctx.beginPath(); ctx.arc(n.sx,n.sy,r,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,170,130,${fade*pulse*0.92})`;
        ctx.shadowBlur=r>1.2?7:0; ctx.shadowColor="rgba(255,60,20,0.85)";
        ctx.fill(); ctx.shadowBlur=0;
      });

    // ── Central core ─────────────────────────────────────────────────────────
    const corePulse=0.85+0.15*Math.sin(t*2.2);
    const cr=SR*0.10*corePulse;
    const cg=ctx.createRadialGradient(CX,CY,0,CX,CY,cr*3.5);
    cg.addColorStop(0,`rgba(255,230,210,${0.95*corePulse})`);
    cg.addColorStop(0.3,`rgba(255,80,40,${0.55*corePulse})`);
    cg.addColorStop(1,"transparent");
    ctx.fillStyle=cg; ctx.beginPath(); ctx.arc(CX,CY,cr*3.5,0,Math.PI*2); ctx.fill();

    raf=requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize",resize);
  raf=requestAnimationFrame(draw);
  return()=>{window.removeEventListener("resize",resize);cancelAnimationFrame(raf);};
}

export default function NeuralGlobe(){
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const c=ref.current; if(!c)return;
    const ctx=c.getContext("2d"); if(!ctx)return;
    return setup(c,ctx);
  },[]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}/>;
}
