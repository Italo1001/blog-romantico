import { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  vx: number;
  vy: number;
  life: number;
  age: number;
}

export function useParticles(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  const createParticle = (x: number, y: number): Particle => ({
    x,
    y,
    radius: Math.random() * 3 + 1,
    opacity: 1,
    vx: (Math.random() - 0.5) * 0.5,
    vy: -Math.random() * 0.5 - 0.1,
    life: 60 + Math.random() * 30,
    age: 0,
  });

  const addParticles = (x: number, y: number, count: number = 3) => {
    const particles = particlesRef.current;
    if (particles.length < 200) {
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(
          x + (Math.random() - 0.5) * 20,
          y + (Math.random() - 0.5) * 20
        ));
      }
    }
  };

  const drawHeartShape = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    const s = size;
    ctx.beginPath();
    ctx.moveTo(x, y + s/4);
    ctx.bezierCurveTo(x, y, x - s/2, y, x - s/2, y + s/4);
    ctx.bezierCurveTo(x - s/2, y + s/2, x, y + s*3/4, x, y + s);
    ctx.bezierCurveTo(x, y + s*3/4, x + s/2, y + s/2, x + s/2, y + s/4);
    ctx.bezierCurveTo(x + s/2, y, x, y, x, y + s/4);
    ctx.closePath();
    ctx.fill();
  };

  return { addParticles, particlesRef, animationFrameRef, drawHeartShape };
}
