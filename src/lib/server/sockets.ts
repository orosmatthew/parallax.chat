import { Server as SocketServer } from 'socket.io';
import portfinder from 'portfinder';
import { dev } from '$app/environment';

export async function startSocketServer(): Promise<string> {
	let socketPort: number;
	if (dev) {
		socketPort = await portfinder.getPortPromise();
	} else if (process.env.SOCKET_PORT && isNaN(parseInt(process.env.SOCKET_PORT))) {
		socketPort = parseInt(process.env.SOCKET_PORT);
	} else {
		console.warn('SOCKET_PORT not specified in env, finding available port');
		socketPort = await portfinder.getPortPromise();
	}

	const socketUrl = (() => {
		if (dev) {
			return `ws://localhost:${socketPort}`;
		} else if (process.env.SOCKET_URL) {
			return process.env.SOCKET_URL;
		} else {
			console.warn('SOCKET_URL not specified in env, using localhost');
			return `ws://localhost:${socketPort}`;
		}
	})();

	const io = new SocketServer(socketPort, { cors: { origin: '*' } });
	console.log(`Websocket Server listening on ${socketUrl}`);

	handleSocketsServer(io);

	return socketUrl;
}

function handleSocketsServer(io: SocketServer) {
	io.on('connection', () => {
		console.log('New Connection!');
	});
}
