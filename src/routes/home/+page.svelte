<script>
	import '../styles.css';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

	let container;

	onMount(async () => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			container.clientWidth / container.clientHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({ alpha: true });
		const controls = new OrbitControls(camera, renderer.domElement);

		container.appendChild(renderer.domElement);
		renderer.setSize(container.clientWidth, container.clientHeight);
		camera.position.z = 0.18;

		let light = new THREE.PointLight(0xffffff, 100, 100);
		light.position.set(2, 2, 0.5);
		scene.add(light);

		let lightHelper = new THREE.PointLightHelper(light);
		scene.add(lightHelper);

		let loader = new GLTFLoader();

		loader.load('src/lib/models/viensla_logo.glb', (gltf) => {
			gltf.scene.rotation.x = Math.PI / 2;
			scene.add(gltf.scene);
		});

		const animate = () => {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
		};

		animate();

		window.addEventListener('resize', () => {
			camera.aspect = container.clientWidth / container.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(container.clientWidth, container.clientHeight);
		});
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
