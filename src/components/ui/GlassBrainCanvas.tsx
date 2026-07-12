"use client";

import { useEffect, useRef } from "react";

interface NNode { x:number;y:number;vx:number;vy:number;r:number;phase:number;brightness:number;kind:"brain"|"ext"; }
interface Pulse  { from:number;to:number;t:number;speed:number; }
interface Bokeh  { x:number;y:number;r:number;alpha:number;vx:number;vy:number; }

function headPath(cx:number,cy:number,s:number):Path2D{
  const p=new Path2D();
  p.moveTo(cx+0.05*s,cy-0.50*s);
  p.bezierCurveTo(cx+0.25*s,cy-0.52*s,cx+0.43*s,cy-0.38*s,cx+0.45*s,cy-0.15*s);
  p.bezierCurveTo(cx+0.46*s,cy+0.08*s, cx+0.40*s,cy+0.28*s,cx+0.30*s,cy+0.40*s);
  p.bezierCurveTo(cx+0.22*s,cy+0.52*s, cx+0.18*s,cy+0.60*s,cx+0.16*s,cy+0.64*s);
  p.bezierCurveTo(cx+0.04*s,cy+0.66*s, cx-0.04*s,cy+0.66*s,cx-0.10*s,cy+0.62*s);
  p.bezierCurveTo(cx-0.20*s,cy+0.55*s, cx-0.26*s,cy+0.44*s,cx-0.28*s,cy+0.30*s);
  p.bezierCurveTo(cx-0.30*s,cy+0.14*s, cx-0.32*s,cy+0.05*s,cx-0.34*s,cy-0.01*s);
  p.bezierCurveTo(cx-0.37*s,cy-0.06*s, cx-0.38*s,cy-0.11*s,cx-0.35*s,cy-0.14*s);
  p.bezierCurveTo(cx-0.42*s,cy-0.17*s, cx-0.45*s,cy-0.23*s,cx-0.38*s,cy-0.30*s);
  p.bezierCurveTo(cx-0.32*s,cy-0.37*s, cx-0.29*s,cy-0.43*s,cx-0.26*s,cy-0.46*s);
  p.bezierCurveTo(cx-0.16*s,cy-0.52*s, cx-0.06*s,cy-0.52*s,cx+0.05*s,cy-0.50*s);
  p.closePath();
  return p;
}

function inBrain(x:number,y:number,cx:number,cy:number,s:number):boolean{
  const dx=(x-(cx+0.10*s))/(s*0.34);
  const dy=(y-(cy-0.18*s))/(s*0.30);
  return dx*dx+dy*dy<1;
}

function setup(canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D):()=>void{
  let raf=0,W=0,H=0,HX=0,HY=0,HS=0;
  let nodes:NNode[]=[],conns:[number,number,number][]=[],pulses:Pulse[]=[],bokeh:Bokeh[]=[];

  const newPulse=(ci:number):Pulse=>({from:conns[ci][0],to:conns[ci][1],t:Math.random(),speed:0.004+Math.random()*0.008});

  const init=()=>{
    nodes=[];conns=[];pulses=[];bokeh=[];
    let tries=0;
    while(nodes.length<95&&tries<3000){tries++;
      const x=HX+(Math.random()-0.5)*HS*0.72,y=HY+(Math.random()-0.5)*HS*0.65;
      if(inBrain(x,y,HX,HY,HS))
        nodes.push({x,y,vx:0,vy:0,r:Math.random()*3+1.8,phase:Math.random()*Math.PI*2,brightness:Math.random()*0.4+0.6,kind:"brain"});
    }
    for(let i=0;i<30;i++){
      const ang=Math.random()*Math.PI*2,d=HS*(0.72+Math.random()*0.95);
      nodes.push({x:HX+Math.cos(ang)*d*0.88,y:HY+Math.sin(ang)*d*0.52,
        vx:(Math.random()-0.5)*0.22,vy:(Math.random()-0.5)*0.22,
        r:Math.random()*2.5+1.2,phase:Math.random()*Math.PI*2,brightness:Math.random()*0.5+0.3,kind:"ext"});
    }
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d=Math.sqrt(dx*dx+dy*dy);
        const mx=(nodes[i].kind==="brain"&&nodes[j].kind==="brain")?HS*0.38:HS*0.54;
        if(d<mx)conns.push([i,j,1-d/mx]);
      }
    }
    pulses=Array.from({length:42},(_,i)=>newPulse(i%conns.length));
    for(let i=0;i<85;i++)bokeh.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*4+0.5,alpha:Math.random()*0.35+0.05,vx:(Math.random()-0.5)*0.4,vy:(Math.random()-0.5)*0.4});
  };

  const resize=()=>{
    W=window.innerWidth;H=window.innerHeight;
    canvas.width=W*devicePixelRatio;canvas.height=H*devicePixelRatio;
    ctx.scale(devicePixelRatio,devicePixelRatio);
    HX=W*0.52;HY=H*0.50;HS=H*0.42;init();
  };

  const draw=(time:number)=>{
    ctx.clearRect(0,0,W,H);
    const t=time*0.001;

    // bokeh
    bokeh.forEach(b=>{
      b.x+=b.vx;b.y+=b.vy;
      if(b.x<0)b.x=W;if(b.x>W)b.x=0;if(b.y<0)b.y=H;if(b.y>H)b.y=0;
      const a=b.alpha*(0.6+0.4*Math.sin(t*0.7+b.r));
      const g=ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r*2.5);
      g.addColorStop(0,`rgba(220,80,40,${a})`);g.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(b.x,b.y,b.r*2.5,0,Math.PI*2);ctx.fill();
    });

    // connections
    conns.forEach(([i,j,ba])=>{
      const a=nodes[i],b=nodes[j],iB=a.kind==="brain"&&b.kind==="brain";
      const g=ctx.createLinearGradient(a.x,a.y,b.x,b.y);
      if(iB){g.addColorStop(0,`rgba(255,80,50,${ba*0.55})`);g.addColorStop(1,`rgba(255,150,60,${ba*0.45})`);}
      else  {g.addColorStop(0,`rgba(255,130,60,${ba*0.28})`);g.addColorStop(1,`rgba(255,190,80,${ba*0.18})`);}
      ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
      ctx.strokeStyle=g;ctx.lineWidth=iB?0.7:0.4;ctx.stroke();
    });

    // head glass
    const path=headPath(HX,HY,HS);
    ctx.save();ctx.clip(path);
    const bg=ctx.createRadialGradient(HX+HS*0.08,HY-HS*0.18,0,HX+HS*0.08,HY-HS*0.18,HS*0.55);
    bg.addColorStop(0,"rgba(255,30,10,0.22)");bg.addColorStop(0.45,"rgba(180,15,5,0.09)");bg.addColorStop(1,"rgba(0,0,0,0)");
    ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    const sh=ctx.createLinearGradient(HX-HS*0.42,HY-HS*0.52,HX-HS*0.08,HY);
    sh.addColorStop(0,"rgba(255,255,255,0.055)");sh.addColorStop(1,"rgba(255,255,255,0)");
    ctx.fillStyle=sh;ctx.fillRect(0,0,W,H);
    ctx.restore();
    ctx.strokeStyle="rgba(200,215,235,0.22)";ctx.lineWidth=1.5;ctx.stroke(path);

    // pulses
    pulses.forEach((p,i)=>{
      p.t+=p.speed;
      if(p.t>1){pulses[i]=newPulse(i%conns.length);return;}
      const na=nodes[p.from],nb=nodes[p.to];if(!na||!nb)return;
      const px=na.x+(nb.x-na.x)*p.t,py=na.y+(nb.y-na.y)*p.t;
      ctx.beginPath();ctx.arc(px,py,2.6,0,Math.PI*2);
      ctx.fillStyle="rgba(255,220,180,0.96)";ctx.shadowBlur=15;ctx.shadowColor="rgba(255,80,20,1)";
      ctx.fill();ctx.shadowBlur=0;
    });

    // nodes
    nodes.forEach(node=>{
      const pulse=0.7+0.3*Math.sin(t*1.8+node.phase),r=node.r*pulse;
      if(node.kind==="brain"){
        const bloom=ctx.createRadialGradient(node.x,node.y,0,node.x,node.y,r*5);
        bloom.addColorStop(0,`rgba(255,40,10,${0.09*pulse*node.brightness})`);bloom.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle=bloom;ctx.beginPath();ctx.arc(node.x,node.y,r*5,0,Math.PI*2);ctx.fill();
        ctx.beginPath();ctx.arc(node.x,node.y,r,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,200,160,${0.95*node.brightness})`;
        ctx.shadowBlur=r*8;ctx.shadowColor="rgba(255,50,10,1)";ctx.fill();ctx.shadowBlur=0;
      } else {
        node.x+=node.vx;node.y+=node.vy;
        const dx=node.x-HX,dy=node.y-HY;
        if(Math.sqrt(dx*dx+dy*dy)>HS*1.75){node.vx*=-0.8;node.vy*=-0.8;}
        const bloom=ctx.createRadialGradient(node.x,node.y,0,node.x,node.y,r*4.5);
        bloom.addColorStop(0,`rgba(255,160,60,${0.12*pulse})`);bloom.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle=bloom;ctx.beginPath();ctx.arc(node.x,node.y,r*4.5,0,Math.PI*2);ctx.fill();
        ctx.beginPath();ctx.arc(node.x,node.y,r,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,190,90,${0.9*node.brightness})`;
        ctx.shadowBlur=r*5;ctx.shadowColor="rgba(255,140,40,0.9)";ctx.fill();ctx.shadowBlur=0;
      }
    });

    raf=requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener("resize",resize);
  raf=requestAnimationFrame(draw);
  return()=>{window.removeEventListener("resize",resize);cancelAnimationFrame(raf);};
}

export default function GlassBrainCanvas(){
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;
    const ctx=canvas.getContext("2d");if(!ctx)return;
    return setup(canvas,ctx);
  },[]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}/>;
}
