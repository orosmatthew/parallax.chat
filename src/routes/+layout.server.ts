import { socketUrl } from '../hooks.server';

export const load = () => {
	return { socketUrl: socketUrl };
};
