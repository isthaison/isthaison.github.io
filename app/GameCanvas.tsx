import React, { useEffect, useRef } from "react";

interface GameCanvasProps {
  isGameOpen: boolean;
  setIsGameOpen: (v: boolean) => void;
  isCompact?: boolean;
}

export default function GameCanvas({
  isGameOpen,
  setIsGameOpen,
  isCompact = false,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const gameOpenRef = useRef(isGameOpen);

  useEffect(() => {
    gameOpenRef.current = isGameOpen;
    if (isGameOpen && canvasRef.current) canvasRef.current.focus();
  }, [isGameOpen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.max(1, window.devicePixelRatio || 1);

    const C = {
      bg: "#f1f5f9",
      cardBg: "#ffffff",
      text: "#0f172a",
      textMuted: "#64748b",
      accent: "#3b82f6",
      gameBg: "#0f172a",
      star: "#fbbf24",
      rock: "#94a3b8",
      player: "#38bdf8",
    };

    let resizeTimeout: ReturnType<typeof setTimeout>;
    function resize() {
      if (!canvas) return;
      canvas.width = canvas.clientWidth * DPR;
      canvas.height = canvas.clientHeight * DPR;
      ctx?.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 100);
    };


    // Profile data used for left card rendering
    const avatarSrc = "20221127213725_IMG_0313.JPG";
    const profile = {
      name: "Nguyen Thai Son",
      role: "Software Engineer",
      location: "Ben Cat, Binh Duong",
      bio: "Passionate about building performant, accessible web applications and immersive digital experiences.",
      skills: [
        "JavaScript / TypeScript",
        "React & Ecosystem",
        "Canvas & WebGL",
        "Performance Optimization",
        "UI/UX Design",
      ],
      img: new Image(),
    } as const;
    profile.img.src = avatarSrc;
    let avatarBroken = false;
    profile.img.onerror = () => {
      avatarBroken = true;
    };

    interface Entity {
      type: "rock" | "star";
      x: number;
      y: number;
      r: number;
      vy: number;
      rot: number;
      rotSpeed: number;
    }

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
    }

    const game = {
      running: false,
      over: false,
      win: false,
      score: 0,
      goal: 20,
      player: { x: 0, y: 0, r: 16, speed: 7 },
      entities: [] as Entity[],
      particles: [] as Particle[],
      spawnTimer: 0,
      difficultyMultiplier: 1,
    };

    let wasGameOpen = false;

    function resetGame() {
      game.running = true;
      game.over = false;
      game.win = false;
      game.score = 0;
      game.entities = [];
      game.particles = [];
      game.spawnTimer = 0;
      game.difficultyMultiplier = 1;
      if (canvas) {
        if (isCompact) {
          game.player.x = canvas.clientWidth / 2;
        } else {
          game.player.x = (canvas.clientWidth * 0.66) / 2 + canvas.clientWidth * 0.34;
        }
        game.player.y = canvas.clientHeight - 80;
      }
    }

    const keys: { [key: string]: boolean } = {};
    const onKeyDown = (e: KeyboardEvent) => {
      if (!gameOpenRef.current) return;
      if ((e.key === " " || e.key === "Enter") && !game.running) resetGame();
      keys[e.key] = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // Pointer / touch controls for mobile: pointer events handle mouse + touch
    let pointerActive = false;
    function clampPlayerX(x: number) {
      const W = canvas!.clientWidth;
      const pad = 32;
      const leftW = Math.min(400, W * 0.35);
      const gameX = leftW + pad + 20;
      return Math.max(gameX + game.player.r + 10, Math.min(W - pad - game.player.r - 10, x));
    }

    const onPointerDown = (ev: PointerEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      if (!gameOpenRef.current) return;
      pointerActive = true;
      // If not running, start the game on first tap
      if (!game.running) {
        resetGame();
      }
      game.player.x = clampPlayerX(x);
    };

    const onPointerMove = (ev: PointerEvent) => {
      if (!pointerActive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      game.player.x = clampPlayerX(x);
    };

    const onPointerUp = () => {
      pointerActive = false;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    function spawnEntity(width: number, startX: number) {
      const margin = 30;
      const x = Math.random() * (width - margin * 2) + startX + margin;
      const isRock =
        Math.random() < 0.3 + (game.difficultyMultiplier - 1) * 0.2;
      const baseSpeed = 2 * game.difficultyMultiplier;

      game.entities.push({
        type: isRock ? "rock" : "star",
        x: x,
        y: -30,
        r: isRock ? 18 : 12,
        vy: baseSpeed + Math.random() * 2,
        rot: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.1,
      });
    }

    function createParticles(x: number, y: number, color: string) {
      for (let i = 0; i < 8; i++) {
        game.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 1.0,
          color,
        });
      }
    }

    function updateGame(dt: number) {
      if (!gameOpenRef.current) {
        wasGameOpen = false;
        return;
      }

      if (gameOpenRef.current && !wasGameOpen) {
        wasGameOpen = true;
        resetGame();
      }

      if (!game.running) return;

      const W = canvas!.clientWidth;
      const H = canvas!.clientHeight;
      const pad = 32;
      const leftW = isCompact ? 0 : Math.min(400, W * 0.35);
      const contentX = isCompact ? pad : pad + leftW + 24;
      const gameX = contentX + 20;
      const contentW = isCompact ? W - pad * 2 : W - contentX - pad;
      const gameW = contentW;

      game.difficultyMultiplier = 1 + game.score / 15;
      game.spawnTimer += dt;
      const spawnRate = Math.max(200, 600 - game.score * 15);
      if (game.spawnTimer > spawnRate) {
        game.spawnTimer = 0;
        spawnEntity(gameW, gameX);
      }

      if (keys.ArrowLeft || keys.a) game.player.x -= game.player.speed;
      if (keys.ArrowRight || keys.d) game.player.x += game.player.speed;

      game.player.x = Math.max(
        gameX + game.player.r + 10,
        Math.min(W - pad - game.player.r - 10, game.player.x)
      );

      for (let i = game.entities.length - 1; i >= 0; i--) {
        const e = game.entities[i];
        e.y += e.vy;
        e.rot += e.rotSpeed;

        const dx = e.x - game.player.x;
        const dy = e.y - game.player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < e.r + game.player.r) {
          if (e.type === "star") {
            game.score++;
            createParticles(e.x, e.y, C.star);
            game.entities.splice(i, 1);
            if (game.score >= game.goal) {
              game.win = true;
              game.running = false;
            }
          } else {
            createParticles(game.player.x, game.player.y, C.player);
            game.over = true;
            game.running = false;
          }
        } else if (e.y > H + 50) {
          game.entities.splice(i, 1);
        }
      }

      for (let i = game.particles.length - 1; i >= 0; i--) {
        const p = game.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
        if (p.life <= 0) game.particles.splice(i, 1);
      }
    }

    // Drawing helpers
    function drawStar(
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
      ctx.fillStyle = C.star;
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
      ctx.shadowColor = C.star;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();
    }

    function drawRock(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      rot: number
    ) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.fillStyle = C.rock;
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

    function drawRoundedRect(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number
    ) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    function dropShadow(ctx: CanvasRenderingContext2D) {
      ctx.shadowColor = "rgba(15, 23, 42, 0.08)";
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 10;
    }

    function resetShadow(ctx: CanvasRenderingContext2D) {
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
    }

    function wrapText(
      ctx: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number
    ) {
      const words = text.split(" ");
      let line = "";
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, y);
      return y;
    }

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      ctx.clearRect(0, 0, W, H);

      const pad = 32;
      const leftW = Math.min(400, W * 0.35);
      const contentX = pad + leftW + 24;
      const contentW = W - contentX - pad;

      // LEFT PROFILE CARD
      ctx.save();
      dropShadow(ctx);
      ctx.fillStyle = C.cardBg;
      drawRoundedRect(ctx, pad, pad, leftW, H - pad * 2, 24);
      ctx.fill();
      resetShadow(ctx);
      ctx.clip();

      const headerH = 140;
      const grad = ctx.createLinearGradient(
        pad,
        pad,
        pad + leftW,
        pad + headerH
      );
      grad.addColorStop(0, "#f8fafc");
      grad.addColorStop(1, "#e2e8f0");
      ctx.fillStyle = grad;
      ctx.fillRect(pad, pad, leftW, headerH);

      const avSize = 100;
      const avX = pad + 32;
      const avY = pad + headerH - avSize / 2;

      ctx.beginPath();
      ctx.arc(
        avX + avSize / 2,
        avY + avSize / 2,
        avSize / 2 + 4,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "#fff";
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(avX + avSize / 2, avY + avSize / 2, avSize / 2, 0, Math.PI * 2);
      ctx.clip();
      if (
        profile.img.complete &&
        !avatarBroken &&
        profile.img.naturalWidth > 0
      ) {
        ctx.drawImage(profile.img, avX, avY, avSize, avSize);
      } else {
        ctx.fillStyle = "#ccc";
        ctx.fillRect(avX, avY, avSize, avSize);
      }
      ctx.restore();

      let ty = avY + avSize + 24;
      ctx.fillStyle = C.text;
      ctx.font = "700 24px Inter, sans-serif";
      ctx.fillText(profile.name, pad + 32, ty);

      ty += 28;
      ctx.fillStyle = C.accent;
      ctx.font = "500 15px Inter, sans-serif";
      ctx.fillText(profile.role, pad + 32, ty);

      ty += 24;
      ctx.fillStyle = C.textMuted;
      ctx.font = "400 14px Inter, sans-serif";
      ctx.fillText(profile.location, pad + 32, ty);

      ty += 32;
      ctx.fillStyle = C.text;
      ctx.font = "400 15px Inter, sans-serif";
      wrapText(ctx, profile.bio, pad + 32, ty, leftW - 64, 22);

      const baseY = H - pad - 40;
      ctx.font = "600 13px Inter, sans-serif";
      ctx.fillStyle = C.textMuted;
      ctx.fillText(
        "CORE COMPETENCIES",
        pad + 32,
        baseY - profile.skills.length * 28 - 16
      );

      ctx.font = "500 14px Inter, sans-serif";
      ctx.fillStyle = C.text;
      profile.skills.forEach((skill, i) => {
        const sy = baseY - (profile.skills.length - 1 - i) * 28;
        ctx.fillText("•  " + skill, pad + 32, sy);
      });

      ctx.restore();

      // RIGHT CONTENT / GAME AREA
      ctx.save();
      dropShadow(ctx);
      ctx.fillStyle = gameOpenRef.current ? C.gameBg : C.cardBg;
      drawRoundedRect(ctx, contentX, pad, contentW, H - pad * 2, 24);
      ctx.fill();
      resetShadow(ctx);
      ctx.clip();

      if (gameOpenRef.current) {
        ctx.fillStyle = "rgba(255,255,255,0.2)";
        for (let i = 0; i < 20; i++) {
          const sx = contentX + ((i * 12345) % contentW);
          const sy = pad + ((i * 67890) % (H - pad * 2));
          ctx.fillRect(sx, sy, 2, 2);
        }

        ctx.shadowColor = C.player;
        ctx.shadowBlur = 15;
        ctx.fillStyle = C.player;
        ctx.beginPath();
        ctx.arc(game.player.x, game.player.y, game.player.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(
          game.player.x,
          game.player.y,
          game.player.r * 0.4,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.shadowBlur = 0;

        game.entities.forEach((e) => {
          if (e.type === "star") drawStar(ctx, e.x, e.y, e.r, e.rot);
          else drawRock(ctx, e.x, e.y, e.r, e.rot);
        });

        game.particles.forEach((p) => {
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1.0;

        ctx.fillStyle = "#fff";
        ctx.font = "700 18px Inter, sans-serif";
        ctx.fillText(
          `Score: ${game.score} / ${game.goal}`,
          contentX + 30,
          pad + 40
        );

        ctx.font = "12px Inter, sans-serif";
        ctx.fillStyle = "#94a3b8";
        const speedLabel = game.difficultyMultiplier.toFixed(1) + "x Speed";
        ctx.fillText(speedLabel, contentX + 30, pad + 60);

        if (!game.running) {
          ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
          ctx.fillRect(contentX, pad, contentW, H - pad * 2);

          ctx.fillStyle = "#fff";
          ctx.textAlign = "center";

          if (game.win) {
            ctx.font = "700 32px Inter, sans-serif";
            ctx.fillText(
              "Mission Complete!",
              contentX + contentW / 2,
              H / 2 - 20
            );
            ctx.font = "16px Inter, sans-serif";
            ctx.fillStyle = "#cbd5e1";
            ctx.fillText(
              `Excellent work. Final Score: ${game.score}`,
              contentX + contentW / 2,
              H / 2 + 20
            );
          } else if (game.over) {
            ctx.font = "700 32px Inter, sans-serif";
            ctx.fillText("Mission Failed", contentX + contentW / 2, H / 2 - 20);
            ctx.font = "16px Inter, sans-serif";
            ctx.fillStyle = "#cbd5e1";
            ctx.fillText(
              "Watch out for asteroids!",
              contentX + contentW / 2,
              H / 2 + 20
            );
          } else {
            ctx.font = "700 24px Inter, sans-serif";
            ctx.fillText("Ready?", contentX + contentW / 2, H / 2 - 10);
          }

          ctx.font = "600 14px Inter, sans-serif";
          ctx.fillStyle = C.accent;
          ctx.fillText(
            "Press SPACE to Restart",
            contentX + contentW / 2,
            H / 2 + 60
          );

          ctx.textAlign = "left";
        }
      } else {
        ctx.fillStyle = C.text;
        ctx.font = "700 24px Inter, sans-serif";
        ctx.fillText("About This Portfolio", contentX + 40, pad + 60);

        ctx.fillStyle = C.textMuted;
        ctx.font = "400 16px Inter, sans-serif";
        let textY = pad + 100;
        const desc =
          "This entire interface is rendered using a single HTML5 Canvas element. It demonstrates the ability to combine rich, interactive graphical experiences with standard UI layouts.";
        textY = wrapText(ctx, desc, contentX + 40, textY, contentW - 80, 26);

        textY += 40;
        ctx.fillStyle = C.text;
        ctx.font = "600 18px Inter, sans-serif";
        ctx.fillText("Mini-Game Instructions", contentX + 40, textY);

        textY += 30;
        ctx.fillStyle = C.textMuted;
        ctx.font = "400 15px Inter, sans-serif";
        ctx.fillText('1. Click "Play Game" to start.', contentX + 40, textY);
        ctx.fillText(
          "2. Use Left/Right arrows to move.",
          contentX + 40,
          textY + 24
        );
        ctx.fillText(
          "3. Collect Gold Stars for points.",
          contentX + 40,
          textY + 48
        );
        ctx.fillText("4. AVOID the Grey Asteroids.", contentX + 40, textY + 72);
      }

      ctx.restore();
    }

    let last = 0;
    function loop(ts: number) {
      const dt = ts - last;
      last = ts;
      resize();

      if (keys["Escape"] && gameOpenRef.current) {
        setIsGameOpen(false);
        keys["Escape"] = false;
      }

      updateGame(dt);
      draw();
      requestRef.current = requestAnimationFrame(loop);
    }

    requestRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      if (canvas) {
        canvas.removeEventListener('pointerdown', onPointerDown);
      }
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [setIsGameOpen]);

  return <canvas id="profileCanvas" ref={canvasRef} tabIndex={0}></canvas>;
}
