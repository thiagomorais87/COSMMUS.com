import React, { useEffect, useRef } from 'react';

const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const galaxyImageUrl = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop"; // Vibrant purple nebula image

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let w: number, h: number;
    let stars: Star[] = [];
    const starCount = 150;
    const mouse = { x: -1000, y: -1000 };

    class Star {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      opacity: number;
      blinkSpeed: number;
      blinkDir: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 1.2 + 0.3;
        this.density = (Math.random() * 15) + 5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.1;
        this.speedY = (Math.random() - 0.5) * 0.1;
        this.blinkSpeed = Math.random() * 0.008 + 0.002;
        this.blinkDir = 1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        if (this.baseX > w) this.baseX = 0;
        if (this.baseX < 0) this.baseX = w;
        if (this.baseY > h) this.baseY = 0;
        if (this.baseY < 0) this.baseY = h;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = 150;

        if (distance < maxDistance) {
          let force = (maxDistance - distance) / maxDistance;
          this.x -= (dx / distance) * force * this.density * 0.5;
          this.y -= (dy / distance) * force * this.density * 0.5;
        }
        
        this.x += (this.baseX - this.x) * 0.05;
        this.y += (this.baseY - this.y) * 0.05;

        this.opacity += this.blinkSpeed * this.blinkDir;
        if (this.opacity > 0.7 || this.opacity < 0.2) {
          this.blinkDir *= -1;
        }
      }
    }

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Draw procedural subtle nebula layers as fallback/depth
      ctx.globalCompositeOperation = 'screen';
      const grad1 = ctx.createRadialGradient(w * 0.3, h * 0.4, 0, w * 0.3, h * 0.4, w * 0.6);
      grad1.addColorStop(0, 'rgba(120, 40, 180, 0.02)'); // Reduced purple tone
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      const grad2 = ctx.createRadialGradient(w * 0.7, h * 0.6, 0, w * 0.7, h * 0.6, w * 0.5);
      grad2.addColorStop(0, 'rgba(80, 20, 120, 0.015)'); // Reduced deeper purple
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'source-over';
      
      for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].draw();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black -z-10">
      {/* Galaxy Image Layer */}
      <div 
        className="absolute inset-0 opacity-30 mix-blend-screen transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url(${galaxyImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'contrast(1.1) brightness(0.7)'
        }}
      />
      
      {/* Interactive Stars Canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full relative z-10"
      />
      
      {/* Vignette/Depth Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/90 z-20" />
    </div>
  );
};

export default SpaceBackground;
