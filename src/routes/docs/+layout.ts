import type { LayoutLoad } from './$types';
import { docsSections } from '$lib/docs';

export const load: LayoutLoad = () => ({
	sections: docsSections
});
