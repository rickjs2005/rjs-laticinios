"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Float, RoundedBox } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import styles from "./Product3D.module.scss";

const WHITE = "#fbfbfb";

/* ── modelos procedurais (geometria pura, sem GLB) ─────────────────── */

function MilkBottle({ accent }: { accent: string }) {
  return (
    <group position={[0, -0.15, 0]}>
      <mesh castShadow position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.6, 0.62, 1.4, 48]} />
        <meshStandardMaterial color={WHITE} roughness={0.32} />
      </mesh>
      <mesh castShadow position={[0, 0.74, 0]}>
        <cylinderGeometry args={[0.32, 0.6, 0.34, 48]} />
        <meshStandardMaterial color={WHITE} roughness={0.32} />
      </mesh>
      <mesh castShadow position={[0, 0.98, 0]}>
        <cylinderGeometry args={[0.3, 0.32, 0.2, 32]} />
        <meshStandardMaterial color={WHITE} roughness={0.32} />
      </mesh>
      <mesh castShadow position={[0, 1.16, 0]}>
        <cylinderGeometry args={[0.33, 0.33, 0.18, 32]} />
        <meshStandardMaterial color={accent} roughness={0.3} metalness={0.15} />
      </mesh>
      {/* rótulo (faixa) */}
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.625, 0.63, 0.62, 48, 1, true]} />
        <meshStandardMaterial color={accent} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function CheeseWedge({ accent }: { accent: string }) {
  return (
    <group rotation={[0.12, -0.5, 0]} position={[-0.1, -0.1, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[1.15, 1.15, 0.62, 64, 1, false, 0, Math.PI / 2.3]} />
        <meshStandardMaterial color="#ffcf3f" roughness={0.55} />
      </mesh>
      {/* casca levemente mais escura na face curva */}
      <mesh>
        <cylinderGeometry args={[1.16, 1.16, 0.64, 64, 1, true, 0, Math.PI / 2.3]} />
        <meshStandardMaterial color={accent} roughness={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* buraquinhos */}
      {[
        [0.4, 0.18, 0.34],
        [0.62, -0.05, 0.2],
        [0.3, 0.05, -0.18],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#f2b800" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function ButterBlock({ accent }: { accent: string }) {
  return (
    <group rotation={[0, -0.3, 0]}>
      <RoundedBox args={[1.5, 0.72, 0.86]} radius={0.1} smoothness={5} castShadow>
        <meshStandardMaterial color="#ffe07a" roughness={0.55} />
      </RoundedBox>
      {/* papel manteiga envolvendo o meio */}
      <RoundedBox args={[1.53, 0.74, 0.52]} radius={0.08} smoothness={5}>
        <meshStandardMaterial color="#fff3cc" roughness={0.75} />
      </RoundedBox>
      {/* fita de acento */}
      <RoundedBox args={[1.55, 0.2, 0.54]} radius={0.05} smoothness={4} position={[0, 0.04, 0]}>
        <meshStandardMaterial color={accent} roughness={0.6} />
      </RoundedBox>
    </group>
  );
}

function YogurtCup({ accent }: { accent: string }) {
  return (
    <group position={[0, -0.05, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.66, 0.48, 1.0, 48]} />
        <meshStandardMaterial color={WHITE} roughness={0.4} />
      </mesh>
      {/* tampa */}
      <mesh castShadow position={[0, 0.54, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.08, 48]} />
        <meshStandardMaterial color={accent} roughness={0.4} />
      </mesh>
      {/* faixa de rótulo */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.605, 0.55, 0.5, 48, 1, true]} />
        <meshStandardMaterial color={accent} roughness={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Jar({ accent, content }: { accent: string; content: string }) {
  return (
    <group position={[0, -0.1, 0]}>
      {/* conteúdo/pote */}
      <mesh castShadow>
        <cylinderGeometry args={[0.72, 0.72, 0.82, 48]} />
        <meshStandardMaterial color={content} roughness={0.3} />
      </mesh>
      {/* aro do vidro */}
      <mesh position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.74, 0.74, 0.12, 48, 1, true]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      {/* tampa */}
      <mesh castShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.76, 0.76, 0.22, 48]} />
        <meshStandardMaterial color={accent} roughness={0.35} metalness={0.2} />
      </mesh>
    </group>
  );
}

function Model({ kind, accent }: { kind: string; accent: string }) {
  switch (kind) {
    case "leite-integral":
      return <MilkBottle accent={accent} />;
    case "queijo-minas":
      return <CheeseWedge accent="#e6ad12" />;
    case "manteiga-extra":
      return <ButterBlock accent={accent} />;
    case "iogurte-natural":
      return <YogurtCup accent={accent} />;
    case "requeijao-cremoso":
      return <Jar accent={accent} content="#fff6e3" />;
    case "doce-de-leite":
      return <Jar accent={accent} content="#9c5a1e" />;
    default:
      return <YogurtCup accent={accent} />;
  }
}

/** Visualizador 3D do produto (carregado sob demanda dentro da ficha). */
export function Product3D({ kind, accent }: { kind: string; accent: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className={styles.canvas}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.5, 4.2], fov: 38 }}>
        <ambientLight intensity={0.75} />
        <directionalLight
          position={[3.5, 5, 4]}
          intensity={1.25}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-4, 2, -3]} intensity={0.4} color="#cfe0ff" />

        <Float
          speed={reduce ? 0 : 1.4}
          rotationIntensity={reduce ? 0 : 0.35}
          floatIntensity={reduce ? 0 : 0.6}
        >
          <group scale={1.15}>
            <Model kind={kind} accent={accent} />
          </group>
        </Float>

        <ContactShadows position={[0, -1.15, 0]} opacity={0.34} scale={6} blur={2.6} far={3} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={!reduce}
          autoRotateSpeed={1.6}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
}
