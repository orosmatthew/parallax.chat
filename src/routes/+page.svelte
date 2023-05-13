<script lang="ts">
	import { browser } from '$app/environment';
	import { Socket, io } from 'socket.io-client';
	import { socketUrl } from './+layout.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let messages = data.messages.sort((a, b) => {
		return a.createdAt.valueOf() - b.createdAt.valueOf();
	});

	let socket: Socket | undefined;
	if (browser) {
		socket = io($socketUrl);
		socket.on('message', (data: { createdAt: Date; value: string }) => {
			messages.push(data);
			messages.sort((a, b) => {
				return a.createdAt.valueOf() - b.createdAt.valueOf();
			});
			messages = messages;
		});
	}

	function onMessageSend() {
		const messageInput = document.getElementById('message_input') as HTMLInputElement | undefined;
		if (!messageInput) {
			console.error('Message input not found');
			return;
		}
		if (!messageInput.value) {
			return;
		}
		if (socket) {
			socket.emit('message', { createdAt: new Date(), value: messageInput.value });
		}
		messageInput.value = '';
	}
</script>

<h1>Parallax</h1>

<div class="mt-5 list-group">
	{#each messages as message}
		<div style="word-wrap:break-word" class="list-group-item">{message.value}</div>
	{/each}
</div>
<div class="mt-3 input-group">
	<input
		on:keypress={(evt) => {
			if (evt.key === 'Enter') {
				onMessageSend();
			}
		}}
		id="message_input"
		type="text"
		class="form-control"
		placeholder="Type Message"
	/>
	<button on:click={onMessageSend} type="button" class="btn btn-primary"
		><i class="bi bi-send" /></button
	>
</div>
