"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useMemo, useRef } from "react"

function Web() {
  const group = useRef<THREE.Group>(null!)
  const mouse = useRef(new THREE.Vector3(0, 0, 0))
  const points = useMemo(() => {
    const count = 180
    const p: THREE.Vector3[] = []
    for (let i = 0; i < count; i++) {
      const radius = 6 + Math.random() * 14
      const angle = Math.random() * Math.PI * 2
      const z = (Math.random() - 0.5) * 4
      p.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, z))
    }
    return p
  }, [])

  const geom = useMemo(() => new THREE.BufferGeometry(), [])
  const mat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#22d3ee"),
        transparent: true,
        opacity: 0.6,
      }),
    [],
  )

  const positions = useMemo(() => new Float32Array(points.length * points.length * 3 * 2), [points.length])

  useFrame((state) => {
    const { mouse: m } = state
    mouse.current.set(m.x * 8, m.y * 5, 0)

    let idx = 0
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i].clone()
        const b = points[j].clone()

        a.lerp(mouse.current, 0.002)
        b.lerp(mouse.current, 0.002)

        const dist = a.distanceTo(b)
        if (dist < 4.5) {
          positions[idx++] = a.x
          positions[idx++] = a.y
          positions[idx++] = a.z
          positions[idx++] = b.x
          positions[idx++] = b.y
          positions[idx++] = b.z
        }
      }
    }

    geom.setAttribute("position", new THREE.BufferAttribute(positions.subarray(0, idx), 3))
    geom.computeBoundingSphere()
    if (group.current) group.current.rotation.z += 0.0015
  })

  return (
    <group ref={group}>
      <lineSegments args={[geom, mat]} />
    </group>
  )
}

export default function SpiderWebHighlight() {
  return (
    <div className="relative h-[440px] w-full overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40 shadow-[0_0_36px_rgba(34,211,238,0.08)]">
      <Canvas camera={{ position: [0, 0, 22], fov: 55 }}>
        <color attach="background" args={["#0b0b0b"]} />
        <Web />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_50%)]" />
      <div className="absolute left-4 top-4">
        <h3 className="font-semibold text-white">SpiderWeb Project Highlight</h3>
        <p className="text-sm text-slate-300">A reactive 3D web that follows your cursor using Three.js.</p>
      </div>
    </div>
  )
}
