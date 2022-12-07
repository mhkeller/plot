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

function replacer(key, value) {
	if (this[key] instanceof Date) {
		return `mhk_date|||${this[key].toISOString()}|||mhk_date`;
	}
	return value;
}

export default async function showChart(
	chart,
	{ args, libraryUrls, now, bounds = {}, css = '', title = 'My chart', instance = 0 } = {}
) {
	const scripts = libraryUrls.map(u => `<script src="${u}"></script>`).join('');
	const exec = [
		`const mhk_plot = ${chart.toString().replaceAll('\n', ' ')};`,
		`const mhk_chart = mhk_plot(${args.map(d => JSON.stringify(d, replacer)).join(',')});`
			.replaceAll('"mhk_date|||', 'new Date("')
			.replaceAll('|||mhk_date"', '")'),
		`if (mhk_chart instanceof Element) {`,
		`document.body.append(mhk_chart);`,
		`}`
	]
		.join('')
		.replaceAll('\n', ' ');
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
			});window.moveTo(${moveTo})</script>${scripts}<script>${encodeURIComponent(
				exec
			)}</script></body></html>`
		]
	});
}
