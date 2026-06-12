'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

const CYAN = '#00D4FF'
const SPACE_BLUE = '#3B82F6'

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null)
  const cloudRef = useRef<THREE.Mesh>(null)
  const texture = useLoader(THREE.TextureLoader, '/textures/earth-day.png')

  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.05
    if (cloudRef.current) cloudRef.current.rotation.y += delta * 0.07
  })

  return (
    <group>
      {/* Earth surface */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.1}
          roughness={0.85}
          emissive={new THREE.Color(SPACE_BLUE)}
          emissiveIntensity={0.04}
        />
      </mesh>

      {/* Subtle cloud / haze shell */}
      <mesh ref={cloudRef} scale={1.012}>
        <sphereGeometry args={[2, 48, 48]} />
        <meshStandardMaterial
          color={CYAN}
          transparent
          opacity={0.04}
          depthWrite={false}
        />
      </mesh>

      {/* Inner atmosphere glow */}
      <mesh scale={1.06}>
        <sphereGeometry args={[2, 48, 48]} />
        <meshBasicMaterial
          color={CYAN}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer atmosphere glow */}
      <mesh scale={1.18}>
        <sphereGeometry args={[2, 48, 48]} />
        <meshBasicMaterial
          color={SPACE_BLUE}
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

function OrbitRing({
  radius,
  tilt,
  color,
  speed,
  withSat,
}: {
  radius: number
  tilt: [number, number, number]
  color: string
  speed: number
  withSat?: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const satRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed
    if (satRef.current) {
      satRef.current.position.x = Math.cos(t) * radius
      satRef.current.position.z = Math.sin(t) * radius
      satRef.current.rotation.y = -t
    }
  })

  const points = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2)
    return curve
      .getPoints(128)
      .map((p) => new THREE.Vector3(p.x, 0, p.y))
  }, [radius])

  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points]
  )

  return (
    <group ref={groupRef} rotation={tilt}>
      <primitive
        object={
          new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
              color,
              transparent: true,
              opacity: 0.35,
            })
          )
        }
      />
      {withSat && (
        <group ref={satRef}>
          <Satellite />
        </group>
      )}
    </group>
  )
}

function Satellite() {
  return (
    <group scale={0.12}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[1, 1, 1.6]} />
        <meshStandardMaterial
          color="#cbd5e1"
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>
      {/* Solar panels */}
      <mesh position={[1.8, 0, 0]}>
        <boxGeometry args={[2.4, 0.05, 1.1]} />
        <meshStandardMaterial
          color={SPACE_BLUE}
          emissive={new THREE.Color(SPACE_BLUE)}
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[-1.8, 0, 0]}>
        <boxGeometry args={[2.4, 0.05, 1.1]} />
        <meshStandardMaterial
          color={SPACE_BLUE}
          emissive={new THREE.Color(SPACE_BLUE)}
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={new THREE.Color(CYAN)}
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 3, 5]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-6, -2, -4]} intensity={1.2} color={SPACE_BLUE} />

      <Stars
        radius={60}
        depth={40}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      <group rotation={[0.2, 0, 0.08]}>
        <Earth />
        <OrbitRing
          radius={3}
          tilt={[Math.PI / 2.4, 0, 0.3]}
          color={CYAN}
          speed={0.35}
          withSat
        />
        <OrbitRing
          radius={3.6}
          tilt={[Math.PI / 2.1, 0.4, -0.2]}
          color={SPACE_BLUE}
          speed={0.22}
        />
        <OrbitRing
          radius={4.3}
          tilt={[Math.PI / 1.9, -0.3, 0.5]}
          color={CYAN}
          speed={0.16}
          withSat
        />
      </group>
    </>
  )
}

export function EarthScene({
  interactive = false,
  className,
}: {
  interactive?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 1.5, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!interactive}
          autoRotateSpeed={0.3}
          enabled={interactive}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>
    </div>
  )
}
