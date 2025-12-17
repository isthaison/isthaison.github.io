import "./styles.css";
import React, { useEffect, useRef } from "react";

interface GameMiniCanvasProps {
  isGameOpen: boolean;
  setIsGameOpen: (v: boolean) => void;
}

function GameMiniCanvas({ isGameOpen, setIsGameOpen }: GameMiniCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number>(0);
  const gameOpenRef = useRef(isGameOpen);

  useEffect(() => {
    gameOpenRef.current = isGameOpen;
    if (isGameOpen && canvasRef.current) canvasRef.current.focus();
  }, [isGameOpen]);

  // Use the Game class for all game logic and layer handling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const game = new Game(canvas, setIsGameOpen);

    const onResize = () => game.resize();
    const onKeyDown = (e: KeyboardEvent) => game.handleKeyDown(e);
    const onKeyUp = (e: KeyboardEvent) => game.handleKeyUp(e);

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    canvas.addEventListener("pointerdown", game.handlePointerDown);
    window.addEventListener("pointermove", game.handlePointerMove);
    window.addEventListener("pointerup", game.handlePointerUp);

    game.start();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("pointerdown", game.handlePointerDown);
      window.removeEventListener("pointermove", game.handlePointerMove);
      window.removeEventListener("pointerup", game.handlePointerUp);
      game.stop();
    };
  }, [setIsGameOpen]);

  // Game class: encapsulates state, update loop, and separate offscreen layers
  class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    DPR: number;
    layers: {
      bg: HTMLCanvasElement;
      entities: HTMLCanvasElement;
      ui: HTMLCanvasElement;
    };
    ctxs: {
      bg: CanvasRenderingContext2D;
      entities: CanvasRenderingContext2D;
      ui: CanvasRenderingContext2D;
    };
    running = false;
    over = false;
    win = false;
    score = 0;
    goal = 30; // Increased goal for more difficulty
    player = { x: 0, y: 0, r: 16, speed: 7 };
    entities: any[] = [];
    particles: any[] = [];
    stars: any[] = [];
    spawnTimer = 0;
    difficultyMultiplier = 1;
    wasOpen = false;
    setIsOpen: (v: boolean) => void = () => {};
    keys: { [k: string]: boolean } = {};
    pointerActive = false;

    private last = 0;
    private raf = 0;

    C = {
      gameBg: "#0f172a",
      star: "#fbbf24",
      rock: "#64748b",
      player: "#06b6d4",
      accent: "#00d4ff",
      text: "#ffffff",
      textMuted: "#cbd5e1",
      cardBg: "rgba(255, 255, 255, 0.1)",
      overlay: "rgba(15, 23, 42, 0.9)",
    } as const;

    constructor(canvas: HTMLCanvasElement, setIsOpen: (v: boolean) => void) {
      this.canvas = canvas;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context missing");
      this.ctx = ctx;
      this.setIsOpen = setIsOpen;
      this.DPR = Math.max(1, window.devicePixelRatio || 1);

      this.layers = {
        bg: document.createElement("canvas"),
        entities: document.createElement("canvas"),
        ui: document.createElement("canvas"),
      };

      this.ctxs = {
        bg: this.layers.bg.getContext("2d")!,
        entities: this.layers.entities.getContext("2d")!,
        ui: this.layers.ui.getContext("2d")!,
      };

      this.resize();
    }

    resize() {
      const W = this.canvas.clientWidth || this.canvas.width / this.DPR;
      const H = this.canvas.clientHeight || this.canvas.height / this.DPR;

      [
        this.canvas,
        this.layers.bg,
        this.layers.entities,
        this.layers.ui,
      ].forEach((c) => {
        c.width = Math.max(1, Math.floor(W * this.DPR));
        c.height = Math.max(1, Math.floor(H * this.DPR));
        c.style.width = `${W}px`;
        c.style.height = `${H}px`;
      });

      [this.ctx, this.ctxs.bg, this.ctxs.entities, this.ctxs.ui].forEach(
        (ctx) => {
          ctx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
        }
      );
    }

    resetGame() {
      this.running = true;
      this.over = false;
      this.win = false;
      this.score = 0;
      this.entities = [];
      this.particles = [];
      this.stars = [];
      this.spawnTimer = 0;
      this.difficultyMultiplier = 1;

      const W = this.canvas.clientWidth;
      const H = this.canvas.clientHeight;
      this.player.x = W / 2;
      this.player.y = H - 80;

      // Initialize twinkling stars
      for (let i = 0; i < 100; i++) {
        this.stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          brightness: Math.random(),
          twinkleSpeed: 0.005 + Math.random() * 0.01,
        });
      }
    }

    spawnEntity(width: number, startX: number) {
      const margin = 30;
      const x = Math.random() * (width - margin * 2) + startX + margin;
      const rand = Math.random();
      let type: string;
      let r: number;
      let vy: number;
      const baseSpeed = 4 * this.difficultyMultiplier; // Increased base speed further

      if (rand < 0.3) {
        // Increased chance for big asteroid to 30%
        type = "bigRock";
        r = 25;
        vy = baseSpeed * 1.5;
      } else if (rand < 0.9) {
        // Increased chance for rock to 60%
        type = "rock";
        r = 18;
        vy = baseSpeed + Math.random() * 4;
      } else {
        // Decreased chance for star to 10%
        type = "star";
        r = 12;
        vy = baseSpeed + Math.random() * 2;
      }

      this.entities.push({
        type,
        x,
        y: -30,
        r,
        vy,
        rot: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.1,
      });
    }

    createParticles(x: number, y: number, color: string) {
      for (let i = 0; i < 8; i++) {
        this.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 1.0,
          color,
        });
      }
    }

    handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === " " || e.key === "Enter") && !this.running)
        this.resetGame();
      this.keys[e.key] = true;
    };

    handleKeyUp = (e: KeyboardEvent) => {
      this.keys[e.key] = false;
    };

    clampPlayerX(x: number) {
      const W = this.canvas.clientWidth;
      const pad = 32;
      const gameX = pad + 20;
      return Math.max(
        gameX + this.player.r + 10,
        Math.min(W - pad - this.player.r - 10, x)
      );
    }

    handlePointerDown = (ev: PointerEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      if (!this.wasOpen) {
        this.setIsOpen(true);
        return;
      }
      this.pointerActive = true;
      if (!this.running) this.resetGame();
      this.player.x = this.clampPlayerX(x);
    };

    handlePointerMove = (ev: PointerEvent) => {
      if (!this.pointerActive) return;
      const rect = this.canvas.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      this.player.x = this.clampPlayerX(x);
    };

    handlePointerUp = () => {
      this.pointerActive = false;
    };

    update(dt: number) {
      if (!this.wasOpen) return;
      if (!this.running) return;

      const W = this.canvas.clientWidth;
      const H = this.canvas.clientHeight;
      const pad = 32;
      const contentX = pad;
      const contentW = W - contentX - pad;

      this.difficultyMultiplier = 1 + this.score / 15;
      this.spawnTimer += dt;
      const spawnRate = Math.max(80, 350 - this.score * 30); // Further reduced spawn rate for even more density
      if (this.spawnTimer > spawnRate) {
        this.spawnTimer = 0;
        const numToSpawn =
          Math.floor(contentW / 120) +
          Math.floor(this.difficultyMultiplier / 1.5); // Density based on canvas width
        for (let i = 0; i < numToSpawn; i++) {
          this.spawnEntity(contentW, contentX + 20);
        }
      }

      if (this.keys.ArrowLeft || this.keys.a)
        this.player.x -= this.player.speed;
      if (this.keys.ArrowRight || this.keys.d)
        this.player.x += this.player.speed;

      this.player.x = Math.max(
        contentX + this.player.r + 10,
        Math.min(W - pad - this.player.r - 10, this.player.x)
      );

      for (let i = this.entities.length - 1; i >= 0; i--) {
        const e = this.entities[i];
        e.y += e.vy;
        e.rot += e.rotSpeed;

        const dx = e.x - this.player.x;
        const dy = e.y - this.player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < e.r + this.player.r) {
          if (e.type === "star") {
            this.score++;
            this.createParticles(e.x, e.y, this.C.star);
            this.entities.splice(i, 1);
            if (this.score >= this.goal) {
              this.win = true;
              this.running = false;
            }
          } else {
            this.createParticles(this.player.x, this.player.y, this.C.player);
            this.over = true;
            this.running = false;
          }
        } else if (e.y > H + 50) {
          this.entities.splice(i, 1);
        }
      }

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
        if (p.life <= 0) this.particles.splice(i, 1);
      }

      // Update twinkling stars
      this.stars.forEach((star) => {
        star.brightness += star.twinkleSpeed;
        if (star.brightness > 1) star.brightness = 0;
      });
    }

    // drawing helpers (draw into layer contexts)
    private drawStar(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      rot: number
    ) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.fillStyle = this.C.star;
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(
          Math.cos(((18 + i * 72) * Math.PI) / 180) * r,
          -Math.sin(((18 + i * 72) * Math.PI) / 180) * r
        );
        ctx.lineTo(
          Math.cos(((54 + i * 72) * Math.PI) / 180) * (r * 0.5),
          -Math.sin(((54 + i * 72) * Math.PI) / 180) * (r * 0.5)
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.shadowColor = this.C.star;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();
    }

    private drawRock(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      rot: number
    ) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.fillStyle = this.C.rock;
      ctx.beginPath();
      const sides = 6;
      for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2;
        ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    draw() {
      const W = this.canvas.clientWidth;
      const H = this.canvas.clientHeight;

      // BG layer
      const bg = this.ctxs.bg;
      bg.clearRect(0, 0, W, H);

      bg.fillStyle = this.wasOpen ? this.C.gameBg : this.C.cardBg;
      bg.fillRect(0, 0, W, H);

      // subtle texture
      if (this.wasOpen) {
        bg.fillStyle = "rgba(255,255,255,0.06)";
        for (let i = 0; i < 25; i++) {
          const sx = ((i * 12345) % W) + 20;
          const sy = 32 + ((i * 67890) % (H - 32 * 2));
          bg.fillRect(sx, sy, 1.5, 1.5);
        }

        // Draw twinkling stars
        this.stars.forEach((star) => {
          bg.globalAlpha = star.brightness;
          bg.fillStyle = this.C.star;
          bg.beginPath();
          bg.arc(star.x, star.y, 1.5, 0, Math.PI * 2);
          bg.fill();
        });
        bg.globalAlpha = 1;
      }

      // Entities layer
      const ed = this.ctxs.entities;
      ed.clearRect(0, 0, W, H);

      // player
      if (this.wasOpen) {
        // Draw player as a space circle
        ed.shadowColor = this.C.player;
        ed.shadowBlur = 15;
        ed.fillStyle = this.C.player;
        ed.beginPath();
        ed.arc(this.player.x, this.player.y, this.player.r, 0, Math.PI * 2);
        ed.fill();
        ed.fillStyle = "#fff";
        ed.beginPath();
        ed.arc(
          this.player.x,
          this.player.y,
          this.player.r * 0.4,
          0,
          Math.PI * 2
        );
        ed.fill();
        ed.shadowBlur = 0;

        this.entities.forEach((e) => {
          if (e.type === "star") this.drawStar(ed, e.x, e.y, e.r, e.rot);
          else this.drawRock(ed, e.x, e.y, e.r, e.rot);
        });

        this.particles.forEach((p) => {
          ed.globalAlpha = p.life;
          ed.fillStyle = p.color;
          ed.beginPath();
          ed.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ed.fill();
        });
        ed.globalAlpha = 1.0;
      } else {
        // Closed state: draw 'About This Portfolio' text on UI layer instead of entities
      }

      // UI layer
      const ui = this.ctxs.ui;
      ui.clearRect(0, 0, W, H);

      const pad = 32;
      const contentX = pad;
      const contentW = W - contentX - pad;

      if (this.wasOpen) {
        ui.fillStyle = "#fff";
        ui.font = "700 18px Inter, sans-serif";
        ui.fillText(
          `Score: ${this.score} / ${this.goal}`,
          contentX + 30,
          pad + 40
        );

        ui.font = "12px Inter, sans-serif";
        ui.fillStyle = "#94a3b8";
        const speedLabel = this.difficultyMultiplier.toFixed(1) + "x Speed";
        ui.fillText(speedLabel, contentX + 30, pad + 60);

        if (!this.running) {
          ui.fillStyle = this.C.overlay;
          ui.fillRect(contentX, pad, contentW, H - pad * 2);

          ui.fillStyle = "#fff";
          ui.textAlign = "center";

          if (this.win) {
            ui.font = "700 32px Inter, sans-serif";
            ui.fillText(
              "Mission Complete!",
              contentX + contentW / 2,
              H / 2 - 20
            );
            ui.font = "16px Inter, sans-serif";
            ui.fillStyle = "#cbd5e1";
            ui.fillText(
              `Excellent work. Final Score: ${this.score}`,
              contentX + contentW / 2,
              H / 2 + 20
            );
          } else if (this.over) {
            ui.font = "700 32px Inter, sans-serif";
            ui.fillText("Mission Failed", contentX + contentW / 2, H / 2 - 20);
            ui.font = "16px Inter, sans-serif";
            ui.fillStyle = "#cbd5e1";
            ui.fillText(
              "Watch out for asteroids!",
              contentX + contentW / 2,
              H / 2 + 20
            );
          } else {
            ui.font = "700 24px Inter, sans-serif";
            ui.fillText("Ready?", contentX + contentW / 2, H / 2 - 10);
          }

          ui.font = "600 14px Inter, sans-serif";
          ui.fillStyle = this.C.accent;
          ui.fillText(
            "Press SPACE to Restart",
            contentX + contentW / 2,
            H / 2 + 60
          );

          ui.textAlign = "left";
        }
      } else {
        ui.fillStyle = "#0f172a";
        ui.font = "700 24px Inter, sans-serif";
        ui.fillText("About This Portfolio", contentX + 40, pad + 60);

        ui.fillStyle = this.C.textMuted;
        ui.font = "400 16px Inter, sans-serif";
        let textY = pad + 100;
        const desc =
          "This entire interface is rendered using a single HTML5 Canvas element. It demonstrates the ability to combine rich, interactive graphical experiences with standard UI layouts.";
        const maxW = contentW - 80;
        const words = desc.split(" ");
        let line = "";
        for (let i = 0; i < words.length; i++) {
          const test = line + words[i] + " ";
          if (ui.measureText(test).width > maxW && line.length > 0) {
            ui.fillText(line, contentX + 40, textY);
            line = words[i] + " ";
            textY += 22;
          } else {
            line = test;
          }
        }
        if (line.length > 0) ui.fillText(line, contentX + 40, textY);

        textY += 40;
        ui.fillStyle = "#0f172a";
        ui.font = "600 18px Inter, sans-serif";
        ui.fillText("Mini-Game Instructions", contentX + 40, textY);

        textY += 30;
        ui.fillStyle = this.C.textMuted;
        ui.font = "400 15px Inter, sans-serif";
        ui.fillText('1. Click "Play Game" to start.', contentX + 40, textY);
        ui.fillText(
          "2. Use Left/Right arrows to move.",
          contentX + 40,
          textY + 24
        );
        ui.fillText("3. Hứng Sao Vàng để ghi điểm.", contentX + 40, textY + 48);
        ui.fillText(
          "4. Tránh các Tiểu Hành Tinh Xám.",
          contentX + 40,
          textY + 72
        );
      }

      // composite layers onto main canvas
      this.ctx.clearRect(0, 0, W, H);
      // draw bg then entities then ui
      this.ctx.drawImage(this.layers.bg, 0, 0, W, H);
      this.ctx.drawImage(this.layers.entities, 0, 0, W, H);
      this.ctx.drawImage(this.layers.ui, 0, 0, W, H);
    }

    step = (ts: number) => {
      const dt = ts - this.last;
      this.last = ts;

      if (this.keys["Escape"]) {
        this.setIsOpen(false);
        this.keys["Escape"] = false;
      }

      if (!this.wasOpen) {
        this.wasOpen = true;
        this.resetGame();
      }

      this.update(dt);
      this.draw();

      this.raf = requestAnimationFrame(this.step);
    };

    start() {
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.step);
    }

    stop() {
      cancelAnimationFrame(this.raf);
    }
  }

  return (
    <div
      className="canvas-wrapper w-full"
      style={{ height: "max(500px, 80vh)" }}
    >
      <canvas
        ref={canvasRef}
        tabIndex={0}
        className="w-full h-full block touch-none"
        aria-label="Game mini canvas"
      />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      <div className="container mx-auto px-6 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center py-20">
          <div className="animate-fade-in">
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-12 mb-12 shadow-2xl transition-all duration-500">
              <h1 className="text-8xl font-extrabold mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                Nguyen Thai Son
              </h1>
              <p className="text-3xl text-slate-300 mb-12 leading-relaxed">
                Software Engineer & Creative Developer
              </p>
            </div>
          </div>
        </section>

        {/* Game Section */}
        <section className="py-16">
          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-300">
            <h2 className="text-4xl font-bold mb-8 text-center">Hứng Sao</h2>
            <div className="rounded-2xl overflow-hidden shadow-inner">
              <GameMiniCanvas isGameOpen={true} setIsGameOpen={() => {}} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
