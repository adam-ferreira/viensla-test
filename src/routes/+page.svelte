<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { gsap } from 'gsap';
	import './styles.css';
	import Preloader from './Preloader.svelte';
	import { preloaderFinished } from './store.js';

	let container;
	let logo;
	let mouseX = 0,
		mouseY = 0;
	let windowHalfX, windowHalfY;
	let targetRotationX = 0,
		targetRotationY = 0;
	let rotationDamping = 0.05;
	let mouseSensitivity = 0.0009;

	onMount(() => {
		if (typeof window !== 'undefined') {
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;
		}
		const aspect = container.clientWidth / container.clientHeight;
		const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000);
		camera.position.z = 2;
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(container.clientWidth, container.clientHeight);
		container.appendChild(renderer.domElement);
		const scene = new THREE.Scene();

		new THREE.CubeTextureLoader()
			.setPath('cubeMaps/')
			.load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], (texture) => {
				scene.environment = texture;
			});

		const loader = new GLTFLoader();
		loader.load('models/viensla_logo.glb', (gtlf) => {
			logo = gtlf.scene;
			logo.position.y = 1.5;
			const scale = window.innerWidth / 400;
			logo.scale.set(scale, scale, scale);
			scene.add(logo);
			preloaderFinished.subscribe((value) => {
				if (value) {
					gsap.to(logo.position, { y: 0, duration: 1, ease: 'bounce.out' });
				}
			});
		});

		const ambientLight = new THREE.AmbientLight(0xffffff, 5);
		scene.add(ambientLight);

		const animate = () => {
			requestAnimationFrame(animate);
			if (logo) {
				targetRotationX += (mouseY * mouseSensitivity - targetRotationX) * rotationDamping;
				targetRotationY += (mouseX * mouseSensitivity - targetRotationY) * rotationDamping;
				logo.rotation.x = targetRotationX;
				logo.rotation.y = targetRotationY;
			}
			renderer.render(scene, camera);
		};

		const onWindowResize = () => {
			const aspect = window.innerWidth / window.innerHeight;
			camera.left = -aspect;
			camera.right = aspect;
			camera.top = 1;
			camera.bottom = -1;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
			if (logo) {
				const scale = window.innerWidth / 400;
				logo.scale.set(scale, scale, scale);
			}
		};
		window.addEventListener('mousemove', onDocumentMouseMove);
		window.addEventListener('resize', onWindowResize);

		animate();

		return () => {
			window.removeEventListener('mousemove', onDocumentMouseMove);
			window.removeEventListener('resize', onWindowResize);
		};
	});

	function onDocumentMouseMove(event) {
		if (typeof window !== 'undefined') {
			mouseX = (event.clientX - windowHalfX) / 2;
			mouseY = (event.clientY - windowHalfY) / 2;
		}
	}
</script>

<Preloader />
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
