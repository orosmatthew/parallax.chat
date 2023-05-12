<script lang="ts">
	import { browser } from '$app/environment';
	import { Socket, io } from 'socket.io-client';
	import { socketUrl } from './+layout.svelte';

	let socket: Socket | undefined;
	if (browser) {
		socket = io($socketUrl);
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
