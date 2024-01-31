<script>
	import './styles.css';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { goto } from '$app/navigation';

	let count = { value: 0 };
	let digits = [];

	onMount(() => {
		gsap.to(count, {
			duration: 4,
			value: 100,
			round: 1,
			onUpdate: () => {
				count.value = Math.round(count.value);
				digits = Array.from(count.value.toString());
				digits.push('%');
			},
			onComplete: () => {
				let tl = gsap.timeline({
					onComplete: () => {
						gsap.to('.preloader-container', {
							duration: 1,
							y: '-100%',
							ease: 'power1.inOut',
							onComplete: () => {
								goto('/home');
							}
						});
					}
				});
				digits.forEach((digit, index) => {
					tl.to(`.digit-${index}`, {
						duration: 0.5,
						y: 200,
						ease: 'power1.inOut'
					});
				});
			}
		});
	});
</script>

<div class="preloader-container">
	<div class="container">
		<p class="counter">
			{#each digits as digit, index (index)}
				<span class="digit-{index}">{digit}</span>
			{/each}
		</p>
		<div class="cover"></div>
	</div>
</div>

<style>
	.preloader-container {
		background-color: var(--color-theme-1);
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.container {
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.counter {
		font-weight: 800;
		color: var(--color-theme-3);
		font-size: 15em;
		z-index: 1;
		line-height: 0.8;
	}
	.counter span {
		display: inline-block;
		position: relative;
	}
	.cover {
		position: absolute;
		bottom: -200px;
		width: 100%;
		height: 200px;
		background-color: var(--color-theme-1);
		z-index: 2;
	}
</style>
