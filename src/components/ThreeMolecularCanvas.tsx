import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeMolecularCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup (Perspective)
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 22;

    // 3. Renderer Setup (Anti-aliased, alpha enabled for transparency)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Create Interactive 3D Objects: A Double Helix Structure
    const helixGroup = new THREE.Group();
    scene.add(helixGroup);

    // Node count and spacing
    const strandPoints = 35;
    const radius = 4.5;
    const pitch = 0.6; // Vertical distance per step
    const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const connectorGeo = new THREE.CylinderGeometry(0.02, 0.02, 1, 8);

    const matStrand1 = new THREE.MeshBasicMaterial({ color: 0x10B981 }); // Emerald
    const matStrand2 = new THREE.MeshBasicMaterial({ color: 0x0ea5e9 }); // Sky blue
    const matBar = new THREE.MeshBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.35 }); // Slate connector

    const spheresStrand1: THREE.Mesh[] = [];
    const spheresStrand2: THREE.Mesh[] = [];
    const bars: THREE.Mesh[] = [];

    for (let i = 0; i < strandPoints; i++) {
      const angle = (i * Math.PI) / 6;
      const y = i * pitch - (strandPoints * pitch) / 2;

      // Strand 1
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const s1 = new THREE.Mesh(sphereGeo, matStrand1);
      s1.position.set(x1, y, z1);
      helixGroup.add(s1);
      spheresStrand1.push(s1);

      // Strand 2 (180 degrees offset)
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;
      const s2 = new THREE.Mesh(sphereGeo, matStrand2);
      s2.position.set(x2, y, z2);
      helixGroup.add(s2);
      spheresStrand2.push(s2);

      // Connectors (every node or every second node for clinical realism)
      if (i % 2 === 0) {
        const bar = new THREE.Mesh(connectorGeo, matBar);
        // Position at midpoint
        bar.position.set((x1 + x2) / 2, y, (z1 + z2) / 2);
        // Align cylinder with the vector between s1 and s2
        const p1 = new THREE.Vector3(x1, y, z1);
        const p2 = new THREE.Vector3(x2, y, z2);
        const direction = new THREE.Vector3().subVectors(p2, p1);
        const length = direction.length();
        bar.scale.set(1, length, 1);

        direction.normalize();
        const alignAxis = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(alignAxis, direction);
        bar.setRotationFromQuaternion(quaternion);

        helixGroup.add(bar);
        bars.push(bar);
      }
    }

    // Add extra ambient floating molecules around
    const floatGroup = new THREE.Group();
    scene.add(floatGroup);
    const floatingNodes: THREE.Mesh[] = [];
    const floatCount = 20;

    for (let i = 0; i < floatCount; i++) {
      const floatGeo = new THREE.SphereGeometry(Math.random() * 0.08 + 0.04, 8, 8);
      const floatMat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x10b981 : 0x0ea5e9,
        transparent: true,
        opacity: Math.random() * 0.4 + 0.15,
      });
      const mesh = new THREE.Mesh(floatGeo, floatMat);
      mesh.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8
      );
      floatGroup.add(mesh);
      floatingNodes.push(mesh);
    }

    // 5. Mouse Interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      // Normalize coordinates
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    // 6. Scroll interaction variables
    let scrollYOffset = 0;
    const onScroll = () => {
      scrollYOffset = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // 7. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Slow baseline rotation
      helixGroup.rotation.y = elapsedTime * 0.18;
      
      // Scroll-triggered dynamic rotation speed & zoom
      helixGroup.rotation.x = scrollYOffset * 0.001;
      helixGroup.position.y = Math.sin(elapsedTime * 0.5) * 0.3; // Gentle hovering bounce

      // Smooth easing mouse interaction
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      helixGroup.rotation.y += targetX * 0.5;
      helixGroup.rotation.z = targetY * 0.2;

      // Animate floating background nodes
      floatingNodes.forEach((node, idx) => {
        node.position.y += Math.sin(elapsedTime + idx) * 0.002;
        node.position.x += Math.cos(elapsedTime + idx) * 0.001;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 8. Responsive Canvas Sizing utilizing ResizeObserver (WCAG / Core Web Vitals)
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      
      if (rendererRef.current && containerRef.current) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    });

    resizeObserver.observe(containerRef.current);

    // 9. Clean up on unmount
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      
      if (rendererRef.current && containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[350px] md:min-h-[500px] relative overflow-hidden"
      id="3d-molecular-canvas-container"
    >
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-end p-4 z-10">
        <div className="flex items-center space-x-2 bg-slate-950/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-emerald-400 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>THREE.JS RENDERER ACTIVE - INTERACTIVE 3D GENOME NETWORKS</span>
        </div>
      </div>
    </div>
  );
}
