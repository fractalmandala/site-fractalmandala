import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => ({
	siteUrl: url.origin
});
