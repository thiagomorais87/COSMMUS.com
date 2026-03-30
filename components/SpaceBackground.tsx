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
    let comets: Comet[] = [];
    let asteroids: Asteroid[] = [];
    let planets: Planet[] = [];
    const starCount = 200;
    const mouse = { x: -1000, y: -1000 };
    let time = 0;

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

    class Comet {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
      color: string;

      constructor() {
        this.active = false;
        this.x = 0;
        this.y = 0;
        this.length = 0;
        this.speed = 0;
        this.angle = 0;
        this.opacity = 0;
        this.color = "255, 255, 255";
      }

      spawn() {
        this.active = true;
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) { // top
          this.x = Math.random() * w; this.y = -50;
          this.angle = Math.random() * Math.PI * 0.8 + Math.PI * 0.1;
        } else if (edge === 1) { // right
          this.x = w + 50; this.y = Math.random() * h;
          this.angle = Math.random() * Math.PI * 0.8 + Math.PI * 0.6;
        } else if (edge === 2) { // bottom
          this.x = Math.random() * w; this.y = h + 50;
          this.angle = Math.random() * Math.PI * 0.8 + Math.PI * 1.1;
        } else { // left
          this.x = -50; this.y = Math.random() * h;
          this.angle = Math.random() * Math.PI * 0.8 - Math.PI * 0.4;
        }
        
        this.length = Math.random() * 60 + 20; // Shorter tail
        this.speed = Math.random() * 1.5 + 0.5; // Much slower
        this.opacity = Math.random() * 0.5 + 0.2;
        
        // Randomly choose purple or blue
        const isPurple = Math.random() > 0.5;
        this.color = isPurple ? "180, 100, 255" : "100, 200, 255";
      }

      update() {
        if (!this.active) {
          if (Math.random() < 0.005) this.spawn();
          return;
        }
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (this.x < -100 || this.x > w + 100 || this.y < -100 || this.y > h + 100) {
          this.active = false;
        }
      }

      draw() {
        if (!this.active || !ctx) return;
        ctx.save();
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(
          this.x, this.y, 
          this.x - Math.cos(this.angle) * this.length, 
          this.y - Math.sin(this.angle) * this.length
        );
        gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${this.color}, 0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();
        
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity + 0.2})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class Asteroid {
      x: number; y: number; size: number; speedX: number; speedY: number; rotation: number; rotSpeed: number; vertices: number[]; opacity: number;
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2.5 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.01;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.vertices = [];
        let points = Math.floor(Math.random() * 4) + 5;
        for(let i=0; i<points; i++) {
          this.vertices.push(Math.random() * 0.4 + 0.6);
        }
      }
      update() {
        this.x += this.speedX; this.y += this.speedY; this.rotation += this.rotSpeed;
        if (this.x > w + 20) this.x = -20; else if (this.x < -20) this.x = w + 20;
        if (this.y > h + 20) this.y = -20; else if (this.y < -20) this.y = h + 20;
      }
      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        for(let i=0; i<this.vertices.length; i++) {
          let angle = (i / this.vertices.length) * Math.PI * 2;
          let r = this.size * this.vertices[i];
          let px = Math.cos(angle) * r;
          let py = Math.sin(angle) * r;
          if (i===0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = `rgba(180, 180, 200, ${this.opacity})`;
        ctx.fill();
        ctx.restore();
      }
    }

    class Planet {
      x: number; y: number; size: number; color1: string; color2: string; speedX: number; speedY: number;
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 120 + 40;
        this.speedX = (Math.random() - 0.5) * 0.02;
        this.speedY = (Math.random() - 0.5) * 0.02;
        const hues = [280, 320, 190, 220];
        const hue = hues[Math.floor(Math.random() * hues.length)];
        this.color1 = `hsla(${hue}, 60%, 40%, 0.05)`;
        this.color2 = `hsla(${hue + 40}, 50%, 10%, 0)`;
      }
      update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x > w + this.size) this.x = -this.size; else if (this.x < -this.size) this.x = w + this.size;
        if (this.y > h + this.size) this.y = -this.size; else if (this.y < -this.size) this.y = h + this.size;
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        const grad = ctx.createRadialGradient(this.x - this.size*0.3, this.y - this.size*0.3, 0, this.x, this.y, this.size);
        grad.addColorStop(0, this.color1);
        grad.addColorStop(1, this.color2);
        ctx.fillStyle = grad;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      stars = [];
      comets = [];
      asteroids = [];
      planets = [];
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }
      for (let i = 0; i < 2; i++) { // Max 2 comets at a time
        comets.push(new Comet());
      }
      for (let i = 0; i < 15; i++) {
        asteroids.push(new Asteroid());
      }
      for (let i = 0; i < 3; i++) {
        planets.push(new Planet());
      }
    };

    const animate = () => {
      time += 0.002;
      ctx.clearRect(0, 0, w, h);
      
      // Draw procedural subtle nebula layers as fallback/depth
      ctx.globalCompositeOperation = 'screen';
      
      // Moving nebulas
      const neb1X = w * 0.3 + Math.sin(time) * 200;
      const neb1Y = h * 0.4 + Math.cos(time * 0.8) * 150;
      const grad1 = ctx.createRadialGradient(neb1X, neb1Y, 0, neb1X, neb1Y, w * 0.6);
      grad1.addColorStop(0, 'rgba(120, 40, 180, 0.04)'); 
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      const neb2X = w * 0.7 + Math.cos(time * 1.2) * 250;
      const neb2Y = h * 0.6 + Math.sin(time * 0.9) * 200;
      const grad2 = ctx.createRadialGradient(neb2X, neb2Y, 0, neb2X, neb2Y, w * 0.5);
      grad2.addColorStop(0, 'rgba(80, 20, 120, 0.03)'); 
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      // Add a third cyan nebula for more color depth
      const neb3X = w * 0.5 + Math.sin(time * 0.5) * 300;
      const neb3Y = h * 0.8 + Math.cos(time * 1.5) * 100;
      const grad3 = ctx.createRadialGradient(neb3X, neb3Y, 0, neb3X, neb3Y, w * 0.4);
      grad3.addColorStop(0, 'rgba(0, 255, 255, 0.02)'); 
      grad3.addColorStop(1, 'transparent');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'source-over';
      
      // Draw planets (deep background)
      for (let i = 0; i < planets.length; i++) {
        planets[i].update();
        planets[i].draw();
      }

      for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].draw();
      }

      // Draw asteroids
      for (let i = 0; i < asteroids.length; i++) {
        asteroids[i].update();
        asteroids[i].draw();
      }

      for (let i = 0; i < comets.length; i++) {
        comets[i].update();
        comets[i].draw();
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
        className="absolute inset-0 opacity-20 mix-blend-screen transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url(${galaxyImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'contrast(1.2) brightness(0.5)'
        }}
      />
      
      {/* Interactive Stars Canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full relative z-10"
      />
      
      {/* Vignette/Depth Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-black/20 to-black/95 z-20" />
    </div>
  );
};

export default SpaceBackground;
