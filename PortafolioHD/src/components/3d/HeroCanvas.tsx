"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { FloatingShape } from "./FloatingShape";

export default function HeroCanvas() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detectar mobile (sin WebGL o pantalla pequeña)
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handleResize = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handleResize);

    // Detectar preferencia de movimiento reducido (accesibilidad)
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionMq.matches);

    return () => mq.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalizar posicion del mouse a [-1, 1]
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, prefersReducedMotion]);

  // Mobile: gradiente estatico en lugar del canvas 3D
  if (isMobile || prefersReducedMotion) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(92,88,237,0.25) 0%, transparent 70%)",
        }}
      />
    );
  }

  return (
    <div
      ref={sectionRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        {/* Luces ambiente con tonos neon */}
        <ambientLight color="#5C58ED" intensity={0.4} />
        <pointLight position={[5, 5, 5]} color="#56E1E8" intensity={1.5} />
        <pointLight position={[-5, -3, 2]} color="#3FA9F5" intensity={0.8} />

        {/* Fondo de estrellas */}
        <Stars
          radius={80}
          depth={50}
          count={1800}
          factor={3}
          saturation={0.3}
          fade
        />

        {/* Figura 3D central con mouse-reactive */}
        <FloatingShape mouseX={mousePos.x} mouseY={mousePos.y} />
      </Canvas>
    </div>
  );
}
