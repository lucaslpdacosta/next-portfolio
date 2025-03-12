"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ParticlesBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const container = containerRef.current;
    
    if (container) {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      container.appendChild(renderer.domElement);
    }
    renderer.setPixelRatio(window.devicePixelRatio);

    const particleCount = window.innerWidth < 800 ? 200 : 100;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const particleSize = window.innerWidth < 800 ? 5 : 3;

    for (let i = 0; i < particleCount; i++) {
      const index = i * 3;
      positions[index] = (Math.random() - 0.5) * 200;
      positions[index + 1] = (Math.random() - 0.5) * 200;
      positions[index + 2] = (Math.random() - 0.5) * 100;

      velocities[index] = (Math.random() - 0.5) * 0.02;
      velocities[index + 1] = (Math.random() - 0.5) * 0.02;
      velocities[index + 2] = (Math.random() - 0.5) * 0.02;

      sizes[i] = particleSize;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));
    particlesGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffffff) },
      },
      vertexShader: `
        attribute float size;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        void main() {
          vec2 c = 2.0 * gl_PointCoord - 1.0;
          float d = dot(c, c);
          if (d > 1.0) discard;
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
      `,
      transparent: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const animate = () => {
      requestAnimationFrame(animate);

      const posAttr = particlesGeometry.getAttribute("position") as THREE.BufferAttribute;
      const velAttr = particlesGeometry.getAttribute("velocity") as THREE.BufferAttribute;

      const posArray = posAttr.array as Float32Array;
      const velArray = velAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const index = i * 3;

        posArray[index] += velArray[index];
        posArray[index + 1] += velArray[index + 1];
        posArray[index + 2] += velArray[index + 2];

        if (posArray[index] > 100 || posArray[index] < -100) velArray[index] *= -1;
        if (posArray[index + 1] > 100 || posArray[index + 1] < -100) velArray[index + 1] *= -1;
        if (posArray[index + 2] > 50 || posArray[index + 2] < -50) velArray[index + 2] *= -1;
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        overflow: "hidden",
      }}
    />
  );
};

export default ParticlesBackground;