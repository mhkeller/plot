import notify from 'wsk-notify';
import createBounds from '../utils/createBounds.js';

// import withJsdom from '../utils/withJsdom.js';
import screenshotInPlaywright from './screenshotInPlaywright.js';
import showChart from './showChart.js';
// import sleep from './sleep.js';

let instance = 0;

export default async function render(
	page,
	chart,
	{ args, libraryUrls, outPath, css, view, title }
) {
	/**
	 * Render with playwright
	 */
	const { boundingBox } = await screenshotInPlaywright(page, chart, {
		args,
		libraryUrls,
		outPath,
		css
	});
	notify({ m: '\tWrote screenshot...', v: outPath, d: ['green', 'bold'] });

	const bounds = createBounds(boundingBox);

	/**
	 * Show the chart
	 */
	if (view === true) {
		const now = new Date().toLocaleTimeString();
		notify({ m: `Launching view (${now})...`, d: ['magenta', 'bold'] });
		await showChart(chart, { args, libraryUrls, now, bounds, css, title, instance });
		notify({ m: `\tDone`, d: ['blue', 'bold'] });
		instance += 1;
	}
	// await sleep(250);
}
