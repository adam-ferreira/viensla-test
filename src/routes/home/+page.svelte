<script>
	import '../styles.css';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { gsap } from 'gsap';

	let container;

	onMount(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			container.clientWidth / container.clientHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		const controls = new OrbitControls(camera, renderer.domElement);

		renderer.setSize(container.clientWidth, container.clientHeight);
		container.appendChild(renderer.domElement);
		camera.position.z = 0.2;

		let cubeTexture;
		new THREE.CubeTextureLoader()
			.setPath('cubeMaps/')
			.load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], function (texture) {
				cubeTexture = texture;
				scene.environment = texture;
			});

		let loader = new GLTFLoader();

		loader.load('models/viensla_logo.glb', (gltf) => {
			gltf.scene.rotation.x = Math.PI / 2;
			gltf.scene.position.y = 2; // Start position off the top of the screen
			gltf.scene.traverse((node) => {
				if (node.isMesh) {
					node.material = new THREE.MeshStandardMaterial({
						roughness: 0.1,
						color: 0x5f45f2
					});
				}
			});
			scene.add(gltf.scene);

			// Start the bounce animation after the model is loaded
			gsap.to(gltf.scene.position, {
				y: 0, // The end position
				duration: 3, // The duration of the animation
				ease: 'bounce.out' // Use the 'bounce' easing function
			});
		});

		const ambientLight = new THREE.AmbientLight(0xffffff, 5); // soft white light
		scene.add(ambientLight);

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
