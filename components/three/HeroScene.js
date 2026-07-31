"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

function DistortedSphere() {
  const meshRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates (-1 to 1)
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!meshRef.current) return;

    // Slowly rotate over time
    meshRef.current.rotation.y = time * 0.15;
    
    // Subtly react to mouse position with smooth interpolation
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouse.y * 0.4,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouse.x * 0.4 + time * 0.15,
      0.05
    );

    // React to scroll position
    if (typeof window !== "undefined") {
      const scrollY = window.scrollY;
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        -scrollY * 0.0015,
        0.05
      );
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, 1 - scrollY * 0.0003, 0.05)
      );
    }
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#D97706"
        roughness={0.15}
        metalness={0.8}
        distort={0.4}
        speed={1.5}
        radius={1}
      />
    </mesh>
  );
}

export default function HeroScene() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    }
  }, []);

  // Return static fallback if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-accent/20 blur-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 15, 10]} intensity={2.5} color="#FFFFFF" />
        <pointLight position={[-10, -15, -10]} intensity={1.5} color="#EA580C" />
        <spotLight position={[5, 5, 5]} angle={0.25} penumbra={1} intensity={1} color="#F59E0B" />
        
        <DistortedSphere />
      </Canvas>
    </div>
  );
}
