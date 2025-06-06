import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeartExplosionProps {
  isVisible: boolean;
}

export default function HeartExplosion({ isVisible }: HeartExplosionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showMessage, setShowMessage] = useState(false);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ['#ff2a54', '#ff6b8a', '#ff9bb5', '#ffccd5', '#ffffff'];

    // Create hearts
    for (let i = 0; i < 50; i++) {
      hearts.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.5) * 15,
        size: Math.random() * 30 + 20,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const drawHeart = (x: number, y: number, size: number, rotation: number, color: string, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;

      const s = size;
      ctx.beginPath();
      ctx.moveTo(0, s/4);
      ctx.bezierCurveTo(0, 0, -s/2, 0, -s/2, s/4);
      ctx.bezierCurveTo(-s/2, s/2, 0, s*3/4, 0, s);
      ctx.bezierCurveTo(0, s*3/4, s/2, s/2, s/2, s/4);
      ctx.bezierCurveTo(s/2, 0, 0, 0, 0, s/4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    let startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.forEach((heart, index) => {
        heart.x += heart.vx;
        heart.y += heart.vy;
        heart.rotation += heart.rotationSpeed;
        heart.vy += 0.2; // gravity
        heart.opacity -= 0.005;

        if (heart.opacity > 0) {
          drawHeart(heart.x, heart.y, heart.size, heart.rotation, heart.color, heart.opacity);
        }
      });

      if (elapsed < 3000) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setShowMessage(true);
      }
    };

    setTimeout(() => {
      animate();
    }, 500);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="text-center z-10 relative"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "backOut" }}
          >
            <motion.h1
              className="font-pacifico text-6xl md:text-8xl text-white mb-4 text-shadow-romantic"
              style={{
                background: 'linear-gradient(45deg, #ff2a54, #ff6b8a, #ff9bb5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
              animate={{
                scale: [1, 1.1, 1],
                textShadow: [
                  '0 0 20px #ff2a54',
                  '0 0 40px #ff6b8a',
                  '0 0 20px #ff2a54'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              FELIZ DIA DOS
            </motion.h1>
            <motion.h1
              className="font-pacifico text-6xl md:text-8xl text-white text-shadow-romantic"
              style={{
                background: 'linear-gradient(45deg, #ff2a54, #ff6b8a, #ff9bb5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
              animate={{
                scale: [1, 1.1, 1],
                textShadow: [
                  '0 0 20px #ff2a54',
                  '0 0 40px #ff6b8a',
                  '0 0 20px #ff2a54'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              NAMORADOS! ❤️
            </motion.h1>
            
            <motion.div
              className="mt-8 flex justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="text-4xl"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                >
                  💕
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}