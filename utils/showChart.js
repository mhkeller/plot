import open from 'open';

const bodyMargin = 8;

const styles = `
	body {
		margin: ${bodyMargin}px;
	}
	figure {
		margin: 0;
	}
`;

const defaultXY = [0, 25];
const offset = 25;

export default async function showChart(html, now, bounds = {}, css = '', title = 'My chart', instance = 0) {
	const moveTo = defaultXY.map(d => d + offset * instance).join(', ');
	await open.openApp(open.apps.chrome, {
		newInstance: true,
		arguments: [
			'--incognito',
			`--app=data:text/html,<html><head><title>${title} - ${encodeURIComponent(
				now
			)}</title><style>${styles}${css}</style></head><body><script>window.resizeTo(${
				bounds.x + bounds.width
			},${
				bounds.y + bounds.height + bodyMargin * 2 + 4
			});window.moveTo(${moveTo})</script>${encodeURIComponent(html)}</body></html>`
		]
	});
}
