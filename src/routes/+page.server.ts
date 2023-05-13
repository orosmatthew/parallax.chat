import { db } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const messages = await db.message.findMany();
	return {
		messages: messages.map((message) => {
			return { createdAt: message.createdAt, value: message.value };
		})
	};
}) satisfies PageServerLoad;
