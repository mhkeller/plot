import open from 'open';
const stuff = `<figure style="max-width: initial;"><div class="plot-e743dd4c5fcce" style="--swatchWidth: 15px; --swatchHeight: 15px; columns: 120px;"><div class="plot-e743dd4c5fcce-swatch"><svg fill="#4e79a7"><rect width="100%" height="100%"></rect></svg></div></div></figure>`

export default async function showChart(html, title = 'My chart') {
	// console.log('showing chart', html);
	await open.openApp(open.apps.chrome, {
		newInstance: true,
		arguments: [
			'--incognito',
			`--app=data:text/html,<html><head><title>${title}</title></head><body><script>window.resizeTo(200,200);</script>${encodeURIComponent(html)}</body></html>`
			// `--app=data:text/html,<html><body>${svg}</body></html>`
		]
	});
}
