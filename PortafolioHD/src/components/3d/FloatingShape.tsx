import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

interface FloatingShapeProps {
  mouseX: number;
  mouseY: number;
}

export function FloatingShape({ mouseX, mouseY }: FloatingShapeProps) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!outerRef.current || !innerRef.current) return;

    // Auto-rotation lenta en el eje Y
    outerRef.current.rotation.y += delta * 0.25;
    outerRef.current.rotation.z += delta * 0.05;

    // Reaccion suave al mouse (lerp hacia la posicion objetivo)
    outerRef.current.rotation.x +=
      (mouseY * 0.4 - outerRef.current.rotation.x) * 0.05;

    // Mesh interior gira mas rapido en la direccion opuesta
    innerRef.current.rotation.y -= delta * 0.15;
    innerRef.current.rotation.x +=
      (mouseY * 0.2 - innerRef.current.rotation.x) * 0.03;
  });

  return (
    <group>
      {/* Icosahedro exterior: wireframe cyan */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial color="#56E1E8" wireframe />
      </mesh>

      {/* Icosahedro exterior glow: solido muy transparente */}
      <mesh ref={outerRef} scale={1.01}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial color="#56E1E8" transparent opacity={0.04} />
      </mesh>

      {/* Icosahedro interior: wireframe violeta mas pequeno */}
      <mesh ref={innerRef} scale={0.6}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial color="#5C58ED" wireframe />
      </mesh>

      {/* Anillo orbital decorativo */}
      <mesh rotation={[Math.PI / 2.5, 0.3, 0]}>
        <torusGeometry args={[2.6, 0.01, 8, 80]} />
        <meshBasicMaterial color="#3FA9F5" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}
