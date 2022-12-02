import notify from 'wsk-notify';

import withJsdom from './withJsdom.js';
import screenshotRoot from './screenshotRoot.js';
import showChart from './showChart.js';

export default async function render(browser, chart, { outPath, css, view, title }) {
	/**
	 * Render the chart with JsDOM
	 */
	const root = await withJsdom(chart)();

	// eslint-disable-next-line no-restricted-syntax
	for (const svg of root.tagName === 'svg' ? [root] : root.querySelectorAll('svg')) {
	  svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', 'http://www.w3.org/2000/svg');
	  svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
	}

	/**
	 * Take a screenshot with Playwright
	 */
	const bounds = await screenshotRoot(browser, root, {
		outPath,
		css
	});
	notify({ m: '\tWrote screenshot...', v: outPath, d: ['green', 'bold'] });

	/**
	 * Show the chart
	 */
	if (view === true) {
		notify({ m: 'Launching view...', v: outPath, d: ['magenta', 'bold'] });
		showChart(root.outerHTML, bounds, css, title);
	}
}
