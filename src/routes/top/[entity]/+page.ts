import type { LoadEvent } from '@sveltejs/kit';
import type { TimeRange } from './types';

/** @type {import('./$types').PageLoad} */
export const prerender = false;
export async function load({ params, fetch, url }: LoadEvent): Promise<any> {
	const { entity } = params;
	const timeRange = url.searchParams.get('time_range') || ('medium_term' as TimeRange);
	const baseUrl = import.meta.env.VITE_BASE_URL;
	const endpoint = `${baseUrl}/api/spotify/top/${entity}?time_range=${timeRange}`;
	try {
		const response = await fetch(endpoint);
		if (response.ok) {
			const data = await response.json();
			return {
				entity,
				data
			};
		} else {
			// handle error
			return {
				status: response.status,
				error: new Error(`Could not load ${url}`)
			};
		}
	} catch (e) {
		console.log('e:', e);
	}
}
