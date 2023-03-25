import notify from '@mhkeller/notify';
import createBounds from '../utils/createBounds.js';

import screenshotInPlaywright from './screenshotInPlaywright.js';
import showChart from './showChart.js';

let instance = 0;

export default async function render(page, chart, { args, library, libraryCode, outPath, css, view, title }) {
	/**
	 * Render with playwright
	 */
	const { boundingBox } = await screenshotInPlaywright(page, chart, {
		args,
		library,
		libraryCode,
		outPath,
		css
	});
	if (outPath) {
		notify({ m: '\tWrote screenshot...', v: outPath, d: ['green', 'bold'] });
	}

	const bounds = createBounds(boundingBox);

	/**
	 * Show the chart
	 */
	if (view === true) {
		const now = new Date().toLocaleTimeString();
		notify({ m: `Launching view (${now})...`, d: ['magenta', 'bold'] });
		await showChart(chart, { args, library, libraryCode, now, bounds, css, title, instance });
		notify({ m: `\tDone`, d: ['blue', 'bold'] });
		instance += 1;
	}
}
