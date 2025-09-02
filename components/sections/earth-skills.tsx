"use client";

import React, { useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useTexture } from "@react-three/drei";
import type * as THREE from "three";
import { SRGBColorSpace } from "three";

type Skill = {
  label: string;
  href?: string;
};

const PRIMARY_BLUE = "#2563eb"; // primary accent (blue)
const ACCENT_ORANGE = "#f59e0b"; // warm accent (orange)
const NEUTRAL_GRAY = "#94a3b8"; // neutral accent (gray)

// Simple rotating Earth sphere
function Earth({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = React.useRef<THREE.Mesh>(null!);
  const colorMap = useTexture("/assets/3d/texture_earth.jpg");
  if (colorMap) {
    colorMap.colorSpace = SRGBColorSpace;
  }

  useFrame((_, delta) => {
    if (!reducedMotion && ref.current) {
      ref.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.6, 64, 64]} />
      <meshStandardMaterial map={colorMap} roughness={0.85} metalness={0.05} />
    </mesh>
  );
}

function SkillMarker({
  position,
  label,
  color,
  href,
}: {
  position: [number, number, number];
  label: string;
  color: string;
  href?: string;
}) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.55}
        />
      </mesh>
      <Html distanceFactor={6} wrapperClass="pointer-events-none">
        <div className="pointer-events-auto">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-background/70 px-2 py-1 text-xs font-medium text-foreground shadow-sm ring-1 ring-border transition-colors hover:bg-background"
            >
              {label}
            </a>
          ) : (
            <span className="rounded-full bg-background/70 px-2 py-1 text-xs font-medium text-foreground shadow-sm ring-1 ring-border">
              {label}
            </span>
          )}
        </div>
      </Html>
    </group>
  );
}

function OrbitingSkills({
  skills,
  reducedMotion,
}: {
  skills: Skill[];
  reducedMotion: boolean;
}) {
  const group = React.useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (!reducedMotion && group.current) {
      group.current.rotation.y -= delta * 0.25;
    }
  });

  // Compute two tilted rings for depth
  const positions = useMemo(() => {
    const radius = 2.3;
    const ringAIdx: number[] = [];
    const ringBIdx: number[] = [];
    skills.forEach((_, i) =>
      i % 2 === 0 ? ringAIdx.push(i) : ringBIdx.push(i)
    );

    const pos: [number, number, number][] = new Array(skills.length).fill([
      0, 0, 0,
    ]);
    const toPos = (idx: number, total: number, tiltDeg: number) => {
      const angle = (idx / total) * Math.PI * 2;
      const tilt = (tiltDeg * Math.PI) / 180;
      const x = radius * Math.cos(angle) * Math.cos(tilt);
      const y = radius * Math.sin(tilt);
      const z = radius * Math.sin(angle);
      return [x, y, z] as [number, number, number];
    };
    ringAIdx.forEach(
      (i, idx) => (pos[i] = toPos(idx, Math.max(1, ringAIdx.length), 20))
    );
    ringBIdx.forEach(
      (i, idx) => (pos[i] = toPos(idx, Math.max(1, ringBIdx.length), -25))
    );
    return pos;
  }, [skills]);

  return (
    <group ref={group}>
      {skills.map((s, i) => (
        <SkillMarker
          key={s.label + i}
          position={positions[i] || [0, 0, 0]}
          label={s.label}
          color={
            i % 3 === 0
              ? ACCENT_ORANGE
              : i % 3 === 1
              ? PRIMARY_BLUE
              : NEUTRAL_GRAY
          }
          href={s.href}
        />
      ))}
    </group>
  );
}

export default function EarthSkillsSection() {
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    setReducedMotion(
      typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Use your real skills here (kept short for clarity/perf)
  const skills: Skill[] = [
    { label: "React" },
    { label: "Next.js" },
    { label: "TypeScript" },
    { label: "Tailwind CSS" },
    { label: "Node.js" },
    { label: "REST APIs" },
    { label: "UI/UX" },
    { label: "Testing" },
    { label: "Three.js" },
    { label: "GSAP" },
  ];

  return (
    <section className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-xl border bg-card p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-pretty text-2xl font-semibold leading-tight md:text-3xl">
            Skills in Orbit
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A colorful, interactive 3D visualization of my core skills rotating
            around Earth.
          </p>
        </div>
      </div>

      <div className="relative h-[460px] w-full rounded-lg">
        <Canvas
          camera={{ position: [0, 0, 6.2], fov: 48 }}
          className="rounded-lg"
          style={{ background: "transparent" }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[4, 3, 5]}
            intensity={1.1}
            color={NEUTRAL_GRAY}
          />
          <directionalLight
            position={[-4, -1, -3]}
            intensity={0.35}
            color={PRIMARY_BLUE}
          />

          {/* Earth */}
          <Earth reducedMotion={!!reducedMotion} />

          {/* Skills orbit */}
          <OrbitingSkills skills={skills} reducedMotion={!!reducedMotion} />

          {/* Camera controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={!reducedMotion}
            autoRotateSpeed={0.4}
          />
        </Canvas>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {skills.slice(0, 10).map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-center rounded-md border bg-background px-3 py-2 text-sm font-medium"
          >
            {s.label}
          </div>
        ))}
      </div>
    </section>
  );
}
