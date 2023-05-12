<script context="module">
	export const socketUrl = writable('');
</script>

<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$socketUrl = data.socketUrl;

	onMount(async () => {
		await import('bootstrap');
	});
</script>

<body class="container">
	<slot />
</body>
