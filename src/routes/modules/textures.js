import * as THREE from 'three';

// This function is used to load cube textures onto the scene.
// Cube textures are used for creating environment maps in Three.js, which can simulate reflections of the environment on the surfaces of 3D objects.
export function loadTextures(scene) {
	new THREE.CubeTextureLoader()
		.setPath('cubeMaps/')
		.load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], (texture) => {
			scene.environment = texture;
		});
}