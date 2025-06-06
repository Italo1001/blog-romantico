import { useEffect, useRef } from "react";

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

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

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

  const addParticles = (x: number, y: number, count: number = 8) => {
    const particles = particlesRef.current;
    if (particles.length < 300) {
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(
          x + (Math.random() - 0.5) * 40,
          y + (Math.random() - 0.5) * 40
        ));
      }
    }
  };

  const updateParticle = (particle: Particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.age++;
    particle.opacity = 1 - particle.age / particle.life;
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.globalAlpha = particle.opacity;
    
    // Enhanced glow effect
    ctx.shadowColor = '#ff2a54';
    ctx.shadowBlur = 20;
    ctx.fillStyle = '#ff2a54';
    
    // Create gradient for more sparkle
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, particle.radius * 3
    );
    gradient.addColorStop(0, '#ff2a54');
    gradient.addColorStop(0.5, '#ff6b8a');
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    drawHeartShape(ctx, particle.x, particle.y, particle.radius);
    
    // Add extra glow layers
    ctx.globalCompositeOperation = 'screen';
    ctx.shadowBlur = 30;
    ctx.fillStyle = '#ff2a54';
    drawHeartShape(ctx, particle.x, particle.y, particle.radius * 0.7);
    
    ctx.restore();
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles = particlesRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      updateParticle(particle);
      drawParticle(ctx, particle);

      // Remove dead particles
      if (particle.age >= particle.life || particle.opacity <= 0) {
        particles.splice(i, 1);
      }
    }

    // Add random particles with more frequency and sparkle
    if (Math.random() < 0.15 && particles.length < 300) {
      addParticles(Math.random() * canvas.width, canvas.height + 20, 3);
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  useEffect(() => {
    resizeCanvas();
    animate();

    const handleResize = () => resizeCanvas();
    const handleMouseMove = (e: MouseEvent) => {
      // Increase particle generation rate and count for more sparkle
      if (Math.random() < 0.3) {
        addParticles(e.clientX, e.clientY, 5);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      id="background-canvas"
    />
  );
}
