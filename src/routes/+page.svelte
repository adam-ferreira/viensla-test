<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { gsap } from 'gsap';
	import './styles.css';

	let container;
	let logo;

	onMount(() => {
		const aspect = container.clientWidth / container.clientHeight;
		const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000);
		camera.position.z = 2;

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
		loader.load('models/viensla_logo.glb', (gtlf) => {
			logo = gtlf.scene;
			logo.rotation.x = Math.PI / 2;
			logo.position.y = 1;
			const scale = window.innerWidth / 160;
			console.log(scale);
			logo.scale.set(scale, scale, scale);
			logo.traverse((node) => {
				if (node.isMesh) {
					node.material = new THREE.MeshStandardMaterial({
						color: 0x5f45f2,
						metalness: 0.5,
						roughness: 0.1
					});
				}
			});
			scene.add(logo);
			gsap.to(logo.position, { y: 0, duration: 1, ease: 'bounce.out' });
		});

		scene.add(new THREE.AmbientLight(0xffffff, 6));

		const animate = () => {
			requestAnimationFrame(animate);
			controls.update();
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
				const scale = window.innerWidth / 160;
				logo.scale.set(scale, scale, scale);
			}
		};

		window.addEventListener('resize', onWindowResize);

		animate();

		return () => {
			window.removeEventListener('resize', onWindowResize);
		};
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
