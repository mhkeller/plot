import notify from 'wsk-notify';

// import withJsdom from '../utils/withJsdom.js';
import openInPlaywright from './openInPlaywright.js';
import showChart from './showChart.js';
// import sleep from './sleep.js';

let instance = 0;

export default async function render(
	browser,
	chart,
	{ args, libraryUrls, outPath, css, view, title }
) {
	/**
	 * Render with playwright
	 */
	const { bounds } = await openInPlaywright(browser, chart, {
		args,
		libraryUrls,
		outPath,
		css
	});
	notify({ m: '\tWrote screenshot...', v: outPath, d: ['green', 'bold'] });

	/**
	 * Show the chart
	 */
	if (view === true) {
		const now = new Date().toLocaleTimeString();
		notify({ m: `Launching view (${now})...`, d: ['magenta', 'bold'] });
		await showChart(chart, { args, libraryUrls, now, bounds, css, title, instance });
		instance += 1;
	}
	// await sleep(250);
}
