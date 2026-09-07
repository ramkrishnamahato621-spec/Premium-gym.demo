import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export const WeightRackModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Initialize Scene
    const scene = new THREE.Scene();
    scene.background = null; // Transparent to allow background styling to show

    // Initialize Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Initialize Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize performance
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0; // Reset to 1.0 since environment map adds immense light
    renderer.outputColorSpace = THREE.SRGBColorSpace; // CRITICAL for correct GLTF rendering
    container.appendChild(renderer.domElement);

    // Generate Studio Environment Map for Metallic Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    // Neutral Studio Lighting (Preserves original model colors)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // Neutral base light
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5); // Main key light
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8); // Gentle fill light
    fillLight.position.set(-5, 2, 5);
    scene.add(fillLight);

    // Thread Safety & Loading State Flag
    let isLoaded = false;
    let modelGroup: THREE.Group | null = null;
    let loadingError = false;

    // Proper LoadingManager
    const manager = new THREE.LoadingManager();
    manager.onLoad = () => {
      isLoaded = true;
    };
    manager.onError = (url) => {
      console.error(`Error loading ${url}`);
      loadingError = true;
    };

    const loader = new GLTFLoader(manager);
    loader.load('/assets/weight-rack.glb', (gltf) => {
      const rawModel = gltf.scene;

      // Center the model geometry
      const box = new THREE.Box3().setFromObject(rawModel);
      const center = box.getCenter(new THREE.Vector3());
      rawModel.position.sub(center);

      // Scale model appropriately to fit view without getting cut off
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.0 / maxDim; // Reduced from 3.5 to 2.0 to ensure it fits perfectly inside the box
      
      // Traverse materials to force "Full Shine" metallic properties
      rawModel.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            // Apply to all materials (or you could filter by name if needed)
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.metalness = 0.9;     // 90% metallic as requested
            mat.roughness = 0.05;    // Very low roughness for maximum polish/shine
            mat.envMapIntensity = 2.5; // Heavily boost the reflection of the environment map
            mat.needsUpdate = true;
          }
        }
      });
      
      // Wrap in group for rotation and floating logic
      modelGroup = new THREE.Group();
      rawModel.scale.set(scale, scale, scale);
      modelGroup.add(rawModel);
      scene.add(modelGroup);

    }, undefined, (error) => {
      console.error('Loader failed:', error);
    });

    // Eased 360-Degree Mouse Tracking variables
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Map to full 360 deg rotation horizontally (Math.PI) and limited vertical
      targetRotationY = x * Math.PI; 
      targetRotationX = y * (Math.PI / 6); 
    };
    container.addEventListener('mousemove', handleMouseMove);

    // Render / Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Strict short-circuit safety gate
      if (!isLoaded || !modelGroup || loadingError) return;

      const elapsedTime = clock.getElapsedTime();

      // Cognitive Anti-Gravity Mechanism (Math.sin hovering)
      modelGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;

      // Eased 360-Degree Tracking using Linear Interpolation (Lerp: 0.05)
      const lerpFactor = 0.05;
      currentRotationX += (targetRotationX - currentRotationX) * lerpFactor;
      currentRotationY += (targetRotationY - currentRotationY) * lerpFactor;

      modelGroup.rotation.x = currentRotationX;
      modelGroup.rotation.y = currentRotationY;

      renderer.render(scene, camera);
    };
    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup phase
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      // clean up materials/geometries if needed for rigorous memory management
      scene.clear();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full cursor-move touch-none"
      style={{ minHeight: '400px' }}
    />
  );
};
