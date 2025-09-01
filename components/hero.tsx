"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useMemo, useRef } from "react"
import GlitchText from "./glitch-text"
import { Button } from "@/components/ui/button"

function StarField() {
  const points = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const len = 2500
    const arr = new Float32Array(len * 3)
    for (let i = 0; i < len; i++) {
      const r = 40 + Math.random() * 160
      const a = Math.random() * Math.PI * 2
      const z = (Math.random() - 0.5) * 120
      arr[i * 3 + 0] = Math.cos(a) * r
      arr[i * 3 + 1] = Math.sin(a) * r
      arr[i * 3 + 2] = z
    }
    return arr
  }, [])

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.8,
        color: new THREE.Color("#22d3ee"),
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    [],
  )

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.z += delta * 0.02
      points.current.rotation.x += delta * 0.005
    }
  })

  return <points ref={points} args={[geom, mat]} />
}

export default function Hero() {
  return (
    <section className="relative h-[80svh] min-h-[560px] w-full overflow-hidden">
      <Canvas camera={{ position: [0, 0, 80], fov: 60 }} className="absolute inset-0 -z-10">
        <color attach="background" args={["#0a0a0a"]} />
        <StarField />
        <ambientLight intensity={0.4} />
      </Canvas>

      <div className="relative mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-4">
        <p className="mb-2 text-sm uppercase tracking-widest text-amber-400">Sachin Burnwal</p>
        <h1 className="text-pretty text-4xl font-semibold leading-tight text-white md:text-6xl">
          <GlitchText text="Web Developer" className="block" />
          <span className="mt-2 block text-slate-300">Cybersecurity • MERN • React • AI</span>
        </h1>

        <p className="mt-4 max-w-2xl text-balance text-sm leading-relaxed text-slate-400 md:text-base">
          Building interactive, performant experiences with React, Three.js, GSAP, and AI integrations.
        </p>

        <div className="mt-6 flex items-center gap-4">
          <a href="#projects">
            <Button className="group bg-blue-600 text-black hover:bg-blue-500 transition-colors">
              View Projects
              <span className="ml-2 inline-block h-2 w-2 rounded-full bg-amber-400 group-hover:scale-110 transition" />
            </Button>
          </a>
          <a href="#contact" className="text-slate-300 underline-offset-4 hover:text-blue-400 hover:underline">
            Contact
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"
      />
    </section>
  )
}
