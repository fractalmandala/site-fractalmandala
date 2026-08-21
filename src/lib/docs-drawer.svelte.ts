export const docsDrawer = $state({ open: false });

export function toggleDocsDrawer() {
	docsDrawer.open = !docsDrawer.open;
}

export function closeDocsDrawer() {
	docsDrawer.open = false;
}
