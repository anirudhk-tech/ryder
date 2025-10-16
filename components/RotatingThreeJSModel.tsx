import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function RotatingThreeJSModel() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const pivotRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(
      mountRef.current!.clientWidth,
      mountRef.current!.clientHeight
    );
    mountRef.current!.appendChild(renderer.domElement);

    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Directional light (like sunlight) to create highlights and shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5); // adjust as needed
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Optional fill light to soften shadows
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Optional rim light for outline/highlight from the back
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 5, 10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    directionalLight.position.set(10, 10, 10);
    directionalLight.intensity = 50;

    fillLight.position.set(-10, 5, 5);
    fillLight.intensity = 50;

    rimLight.position.set(0, 5, -10);
    rimLight.intensity = 50;

    const pivot = new THREE.Group();
    scene.add(pivot);
    pivotRef.current = pivot;

    // Load model
    const loader = new GLTFLoader();
    loader.load("/ryder_logo.glb", (gltf) => {
      const model = gltf.scene;

      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material instanceof THREE.MeshBasicMaterial) {
            child.material = new THREE.MeshStandardMaterial({
              color: child.material.color,
              metalness: 0.5,
              roughness: 0.5,
            });
          }
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      const box = new THREE.Box3().setFromObject(model);
      const center = new THREE.Vector3();
      box.getCenter(center);
      model.position.sub(center);
      pivot.add(model);
    });

    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (pivotRef.current) {
        pivotRef.current.rotation.y += 0.003;
      }
      renderer.render(scene, camera);
    };
    animate();

    const cleanup = mountRef.current;
    // Cleanup
    return () => {
      cancelAnimationFrame(reqId);
      renderer.dispose();
      if (cleanup) cleanup.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        left: "1vw",
        bottom: "10vh",
        width: "100vw",
        height: "50vh",
      }}
    />
  );
}
