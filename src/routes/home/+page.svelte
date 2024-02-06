<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { gsap } from 'gsap';
	import '../styles.css';

	let container;

	onMount(() => {
		const aspect = container.clientWidth / container.clientHeight;
		const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000);
		camera.position.z = 10;

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(container.clientWidth, container.clientHeight);
		container.appendChild(renderer.domElement);

		const controls = new OrbitControls(camera, renderer.domElement);

		const scene = new THREE.Scene();
		new THREE.CubeTextureLoader()
			.setPath('cubeMaps/')
			.load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], (texture) => {
				scene.environment = texture;
			});

		const loader = new GLTFLoader();
		loader.load('models/viensla_logo.glb', (gltf) => {
			gltf.scene.rotation.x = Math.PI / 2;
			gltf.scene.position.y = 1;
			gltf.scene.scale.set(9, 9, 9);
			gltf.scene.traverse((node) => {
				if (node.isMesh) {
					node.material = new THREE.MeshStandardMaterial({ roughness: 0.1, color: 0x5f45f2 });
				}
			});
			scene.add(gltf.scene);

			gsap.to(gltf.scene.position, { y: 0, duration: 1, ease: 'bounce.out' });
		});

		scene.add(new THREE.AmbientLight(0xffffff, 4));

		const animate = () => {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
		};

		animate();
	});
</script>

<div class="container" bind:this={container}></div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
		background: var(--gradient);
	}
</style>
