import * as THREE from 'three';
import { AMBIENT_LIGHT_COLOR, AMBIENT_LIGHT_INTENSITY } from './constants.js';

// This function is used to add ambient lighting to the scene.
// Ambient light is a type of light in Three.js that illuminates all objects in the scene equally from all directions.
export function addLighting(scene) {
	const ambientLight = new THREE.AmbientLight(AMBIENT_LIGHT_COLOR, AMBIENT_LIGHT_INTENSITY);
	scene.add(ambientLight);
}

