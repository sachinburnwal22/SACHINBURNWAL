"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useTexture } from "@react-three/drei"
import * as THREE from "three"

function EarthMesh() {
  const ref = useRef<THREE.Mesh>(null!)
  const colorMap = useTexture("/assets/3d/texture_earth.jpg")
  colorMap.colorSpace = THREE.SRGBColorSpace

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={colorMap} roughness={0.9} metalness={0.05} />
    </mesh>
  )
}

export function Earth3D() {
  return (
    <div className="w-full h-80 md:h-96 rounded-lg overflow-hidden border border-border bg-background/40">
      <Canvas camera={{ position: [0, 0, 2.8], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} />
        <EarthMesh />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}
