import { ImageResponse } from '@ethercorps/sveltekit-og/takumi';

export type OgImageData = {
	title: string;
	description: string;
	kicker?: string;
	tags?: string[];
};

const escapeHtml = (value: string) =>
	value.replace(
		/[&<>"']/g,
		(character) =>
			(
				({
					'&': '&amp;',
					'<': '&lt;',
					'>': '&gt;',
					'"': '&quot;',
					"'": '&#39;'
				}) as Record<string, string>
			)[character]
	);

export const createOgImage = (data: OgImageData) => {
	const tags = (data.tags ?? [])
		.slice(0, 4)
		.map(
			(tag) =>
				`<span style="display:flex;padding:8px 14px;border:1px solid #47685b;border-radius:4px;color:#9fb5ac;font-size:22px;">#${escapeHtml(tag)}</span>`
		)
		.join('');

	const html = `<div style="display:flex;flex-direction:column;justify-content:space-between;width:100%;height:100%;padding:72px;background-color:#101a19;color:#f4f8f6;">
	<div style="display:flex;flex-direction:column;">
		<div style="color:#62d8a8;font-size:28px;font-weight:700;">${escapeHtml(data.kicker ?? 'Fractal Maṇḍala')}</div>
		<div style="color:#f4f8f6;font-size:64px;font-weight:700;line-height:1.08;margin-top:18px;">${escapeHtml(data.title)}</div>
		${data.description ? `<div style="color:#c4d6cf;font-size:28px;line-height:1.35;margin-top:18px;">${escapeHtml(data.description)}</div>` : ''}
	</div>
	<div style="display:flex;flex-direction:row;gap:12px;">${tags}</div>
</div>`;

	return new ImageResponse(html, {
		width: 1200,
		height: 630,
		headers: {
			'Cache-Control': 'public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400'
		}
	});
};
