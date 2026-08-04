"use client";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Custom WebGL transition shaders
const GooeyShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture1;
    uniform sampler2D uTexture2;
    uniform vec2 uMouse;
    uniform float uHover;
    uniform float uTime;
    varying vec2 vUv;

    // Pseudo-random 2D Noise for liquid gooey outline distortion
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f*f*(3.0-2.0*f);
      return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                 mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
    }

    void main() {
      vec2 uv = vUv;
      
      // Aspect ratio correction (our image container has a 9:16 aspect ratio)
      vec2 aspectUv = uv;
      vec2 aspectMouse = uMouse;
      aspectUv.y *= 1.7778; // Scale Y coordinate to make the circular mask perfectly round
      aspectMouse.y *= 1.7778;

      // Distance from pixel UV to mouse coordinate
      float dist = distance(aspectUv, aspectMouse);

      // Liquid gooey wave animation settings: Speed-0.20, Gooeyball-0.43 (distortion strength)
      float noiseVal = noise(uv * 7.5 + uTime * 0.20) * 0.43;
      
      // Gooey ball spotlight radius
      float radius = uHover * 0.46;
      
      // Interpolate mask with threshold border smoothness matching threshold-0.50
      float mask = smoothstep(radius, radius - 0.14, dist + noiseVal);

      // Load texture samples
      vec4 tex1 = texture2D(uTexture1, uv);
      vec4 tex2 = texture2D(uTexture2, uv);

      // Output gooey mixed color
      gl_FragColor = mix(tex1, tex2, mask);
    }
  `
};

function GooeyPlane({ isHovered, mousePos }) {
  const meshRef = useRef();
  
  // Load local static assets as WebGL textures
  const texture1 = useTexture("/images/portrait.jpg");
  const texture2 = useTexture("/images/suit_portrait.jpg");

  // Force sRGB color correction for high-quality display contrast
  texture1.colorSpace = THREE.SRGBColorSpace;
  texture2.colorSpace = THREE.SRGBColorSpace;

  const uniforms = useRef({
    uTexture1: { value: texture1 },
    uTexture2: { value: texture2 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uHover: { value: 0.0 },
    uTime: { value: 0.0 }
  });

  useFrame((state) => {
    const { clock } = state;
    uniforms.current.uTime.value = clock.getElapsedTime();

    // Lerp hover value for smooth expansion/collapse of the mask radius
    uniforms.current.uHover.value = THREE.MathUtils.lerp(
      uniforms.current.uHover.value,
      isHovered ? 1.0 : 0.0,
      0.08
    );

    // Lerp mouse coordinate values for fluid dragging lag
    uniforms.current.uMouse.value.x = THREE.MathUtils.lerp(
      uniforms.current.uMouse.value.x,
      mousePos.x,
      0.1
    );
    uniforms.current.uMouse.value.y = THREE.MathUtils.lerp(
      uniforms.current.uMouse.value.y,
      1.0 - mousePos.y, // Invert Y coordinates to align WebGL and viewport coordinates
      0.1
    );
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms.current}
        vertexShader={GooeyShader.vertexShader}
        fragmentShader={GooeyShader.fragmentShader}
        transparent={true}
      />
    </mesh>
  );
}

export default function GooeyImage({ isHovered, mousePos }) {
  return (
    <div className="w-full h-full">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <GooeyPlane isHovered={isHovered} mousePos={mousePos} />
        </Suspense>
      </Canvas>
    </div>
  );
}
