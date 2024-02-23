<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { gsap } from 'gsap';
	import './styles.css';
	import Preloader from './components/Preloader.svelte';
	import { preloaderFinished } from './utils/store.js';
	import {
		CAMERA_CONFIG,
		MOUSE_SENSITIVITY,
		DAMPING_FACTOR,
		ROTATION_DAMPING,
		LOGO_DROP_DURATION,
		LOGO_DROP_EASE
	} from './modules/constants.js';
	import { loadTextures } from './modules/textures.js';
	import { addLighting } from './modules/lighting.js';

	let container;
	let logo;

	let mouseX = 0,
		mouseY = 0;
	let targetRotationX = 0,
		targetRotationY = 0;

	let controls;

	// This function sets up the 3D environment
	const setupEnvironment = () => {
		const aspect = container.clientWidth / container.clientHeight;
		const camera = new THREE.OrthographicCamera(
			-aspect,
			aspect,
			1,
			-1,
			CAMERA_CONFIG.NEAR,
			CAMERA_CONFIG.FAR
		);
		camera.position.z = CAMERA_CONFIG.POSITION_Z;
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(container.clientWidth, container.clientHeight);
		container.appendChild(renderer.domElement);
		const scene = new THREE.Scene();

		// If the user is on a mobile device, enable OrbitControls for camera movement
		if (/Mobi|Android/i.test(window.navigator.userAgent)) {
			controls = new OrbitControls(camera, renderer.domElement);
			controls.enableDamping = true;
			controls.dampingFactor = DAMPING_FACTOR;
			controls.enableZoom = true;
		}

		return { camera, renderer, scene };
	};

	// This function loads the 3D model
	const loadModel = (scene) => {
		const loader = new GLTFLoader();
		loader.load('models/viensla_logo.glb', (gtlf) => {
			logo = gtlf.scene;
			logo.position.y = 1.5;
			// Scale the logo based on the window width
			const scale = window.innerWidth / 400;
			logo.scale.set(scale, scale, scale);
			scene.add(logo);
			animateLogoDrop();
		});
	};

	// This function animates the logo drop
	const animateLogoDrop = () => {
		preloaderFinished.subscribe((value) => {
			if (value) {
				gsap.to(logo.position, { y: 0, duration: LOGO_DROP_DURATION, ease: LOGO_DROP_EASE });
			}
		});
	};

	// This function handles the animation of the scene
	const animate = (renderer, scene, camera) => {
		const animate = () => {
			requestAnimationFrame(animate);
			if (logo) {
				// Rotate the logo based on mouse movement
				targetRotationX += (mouseY * MOUSE_SENSITIVITY - targetRotationX) * ROTATION_DAMPING;
				targetRotationY += (mouseX * MOUSE_SENSITIVITY - targetRotationY) * ROTATION_DAMPING;
				logo.rotation.x = targetRotationX;
				logo.rotation.y = targetRotationY;
			}
			// Update the controls of camera movement for mobile
			if (controls) controls.update();
			// Render the scene
			renderer.render(scene, camera);
		};
		animate();
	};

	// This function handles window resize events
	const onWindowResize = (camera, renderer) => {
		const aspect = window.innerWidth / window.innerHeight;
		camera.left = -aspect;
		camera.right = aspect;
		camera.top = 1;
		camera.bottom = -1;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		if (logo) {
			// Scale the logo based on the window width
			const scale = window.innerWidth / 400;
			logo.scale.set(scale, scale, scale);
		}
	};

	// This function handles mouse move events to update the mouse position that is used to rotate the logo
	const onDocumentMouseMove = (event) => {
		mouseX = (event.clientX - window.innerWidth / 2) / 2;
		mouseY = (event.clientY - window.innerHeight / 2) / 2;
	};

	onMount(() => {
		const { camera, renderer, scene } = setupEnvironment();

		loadTextures(scene); // loads cube textures onto the scene.
		addLighting(scene); //adds ambient lighting to the scene.

		loadModel(scene);
		animate(renderer, scene, camera);

		// Add event listeners for mouse move and window resize
		window.addEventListener('mousemove', onDocumentMouseMove);
		window.addEventListener('resize', () => onWindowResize(camera, renderer));

		// Remove event listeners when the component is unmounted to prevent memory leaks
		return () => {
			window.removeEventListener('mousemove', onDocumentMouseMove);
			window.removeEventListener('resize', () => onWindowResize(camera, renderer));
		};
	});
</script>

<!-- ÇA CHARGE -->
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
	@media only screen and (max-width: 600px) {
		.container {
			overflow: hidden;
		}
	}
</style>
