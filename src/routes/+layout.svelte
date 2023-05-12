<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import { onMount } from 'svelte';
	onMount(async () => {
		await import('bootstrap');
	});

	type theme = 'light' | 'dark';

	let currentTheme: theme = 'light';

	function onThemeSwitch(event: Event) {
		currentTheme = (event.target as HTMLInputElement).checked ? 'dark' : 'light';
		document.getElementById('html')?.setAttribute('data-bs-theme', currentTheme);
	}
</script>

<body class="container">
	<div class="form-check form-switch">
		<label for="theme_switch">Theme Switch</label>
		<input
			id="theme_switch"
			on:change={onThemeSwitch}
			class="form-check-input"
			type="checkbox"
			role="switch"
			checked
		/>
	</div>
	<slot />
</body>
