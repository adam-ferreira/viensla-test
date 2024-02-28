<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let color = '#5f45f2';
	export let roughness = 0.5;
	export let metalness = 0.5;

	const changeMaterialProperties = () => {
		dispatch('change', { color, roughness, metalness });
	};
</script>

<div class="controls">
	<div class="control-container">
		<label for="color">color</label>
		<input id="color" type="color" bind:value={color} on:input={changeMaterialProperties} />
	</div>
	<div class="control-container">
		<label for="roughness">roughness</label>
		<input
			id="roughness"
			type="range"
			min="0"
			max="1"
			step="0.01"
			bind:value={roughness}
			on:input={changeMaterialProperties}
		/>
	</div>
	<div class="control-container">
		<label for="metalness">metalness</label>
		<input
			id="metalness"
			type="range"
			min="0"
			max="1"
			step="0.01"
			bind:value={metalness}
			on:input={changeMaterialProperties}
		/>
	</div>
</div>

<style>
	.controls {
		position: absolute;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 45%;
		bottom: 0;
		transform: translateY(-100%);
		background: rgba(251, 239, 225, 0.45);
		backdrop-filter: blur(20px);
		padding: 20px;
		border-radius: 50px;
		flex-wrap: wrap;
	}

	.control-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	label {
		font-size: 35px;
		letter-spacing: 1px;
		color: var(--purple);
		font-weight: 400;
	}

	input {
		margin-left: 5px;
	}

	input[type='color'] {
		box-sizing: border-box;
		cursor: pointer;
		border: none;
		border-radius: 50px;
	}

	input[type='range'] {
		width: 80%;
	}
	@media only screen and (max-width: 600px) {
		.controls {
			width: 80%;
			transform: translateY(-10%);
		}
	}
</style>
