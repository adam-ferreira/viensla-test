<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	onMount(() => {
		gsap.fromTo('.preloader-text', { scale: 5 }, { scale: 1, duration: 1 });
		gsap.fromTo('.preloader-text', { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.5 });
		gsap.fromTo('.preloader', { y: '0%' }, { y: '120%', duration: 0.8, delay: 2, ease: 'expo.in' });
	});
</script>

<div class="preloader">
	<div class="preloader-background"></div>
	<div class="preloader-text">
		<span>Ç</span><span>A</span>
		<span>C</span><span>H</span><span>A</span><span>R</span><span>G</span><span>E</span>
	</div>
</div>

<style>
	@keyframes bigger {
		0% {
			font-variation-settings:
				'wght' 700,
				'wdth' 70;
		}
		50% {
			font-variation-settings:
				'wght' 900,
				'wdth' 70;
		}
		100% {
			font-variation-settings:
				'wght' 700,
				'wdth' 70;
		}
	}

	.preloader-text span {
		animation: bigger infinite;
		animation-duration: 2s;
		animation-timing-function: ease;
		font-variation-settings: 'wdth' 70;
		letter-spacing: -0.02em;
	}

	.preloader-text span:nth-child(2) {
		animation-delay: 0.1s;
	}
	.preloader-text span:nth-child(3) {
		animation-delay: 0.2s;
	}
	.preloader-text span:nth-child(4) {
		animation-delay: 0.3s;
	}
	.preloader-text span:nth-child(5) {
		animation-delay: 0.4s;
	}
	.preloader-text span:nth-child(6) {
		animation-delay: 0.5s;
	}
	.preloader-text span:nth-child(7) {
		animation-delay: 0.6s;
	}
	.preloader-text span:nth-child(8) {
		animation-delay: 0.7s;
	}
	.preloader-text span:nth-child(9) {
		animation-delay: 0.8s;
	}

	.preloader-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--yellow);
		transform: rotate(10deg);
		z-index: -1;
	}

	.preloader {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--yellow);
		color: var(--purple);
		font-size: 20em;
		font-weight: 900;
	}
</style>
