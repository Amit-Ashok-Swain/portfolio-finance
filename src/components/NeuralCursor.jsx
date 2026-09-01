import { useEffect, useRef } from "react";

export default function NeuralCursor({ isLightMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let points = [];
    let sparkles = [];

    const updateSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", updateSize);
    updateSize();

    const onMouseMove = (e) => {
      points.push({ x: e.clientX, y: e.clientY, age: 0 });
    };

    const onClick = (e) => {
      // Spawn burst sparkles on click
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3.5;
        sparkles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 1 + Math.random() * 2,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render neural trail
      if (points.length > 1) {
        ctx.strokeStyle = isLightMode
          ? "rgba(249, 115, 22, 0.7)"
          : "rgba(249, 115, 22, 0.45)";
        ctx.lineWidth = isLightMode ? 2 : 1.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          p.age += 1;
          if (p.age > 24) {
            points.splice(i, 1);
            i--;
            continue;
          }
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Render click sparkles
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.035;

        if (s.life <= 0) {
          sparkles.splice(i, 1);
          i--;
          continue;
        }

        ctx.fillStyle = `rgba(249, 115, 22, ${s.life * 0.8})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLightMode]);

  return (
    <canvas
      ref={canvasRef}
      className="neural-cursor-canvas fixed inset-0 z-[9998] pointer-events-none mix-blend-multiply dark:mix-blend-screen transition-opacity duration-500"
    />
  );
}
