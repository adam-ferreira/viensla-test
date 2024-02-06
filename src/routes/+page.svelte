<script>
	import './styles.css';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { goto } from '$app/navigation';

	let count = { value: 0 };
	let digits = '';

	onMount(() => {
		gsap.to(count, {
			duration: 4,
			value: 100,
			round: 1,
			onUpdate: () => {
				count.value = Math.round(count.value);
				digits = count.value.toString() + '%';
			},
			onComplete: () => {
				gsap
					.timeline()
					.to('.counter', {
						scaleY: 0.8, // compress
						duration: 0.2,
						ease: 'power1.inOut',
						transformOrigin: 'bottom' // add this line
					})
					.to('.counter', {
						scaleY: 1, // return to normal scale
						duration: 0.2,
						ease: 'power1.inOut',
						transformOrigin: 'bottom'
					})
					.to('.counter', {
						y: '-500%', // jump
						duration: 0.5,
						ease: 'power1.inOut'
					})
					.eventCallback('onComplete', () => goto('/home')); // navigate to home page
			}
		});
	});
</script>

<div class="container">
	<p class="counter">
		{digits}
	</p>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
		background: var(--gradient);
	}
	.counter {
		font-weight: 800;
		color: var(--purple);
		font-size: 15em;
		z-index: 1;
		line-height: 0.8;
	}
</style>
