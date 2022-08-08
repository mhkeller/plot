import notify from 'wsk-notify';

import withJsdom from './withJsdom.js';
import screenshotRoot from './screenshotRoot.js';

export default async function render(browser, chart, { outPath, css }) {
	/**
	 * Render the chart with JsDOM
	 */
	const root = await withJsdom(chart)();

	/**
	 * Take a screenshot with Playwright
	 */
	await screenshotRoot(browser, root, {
		outPath,
		css
	});
	notify({ m: '\tWrote screenshot...', v: outPath, d: ['blue', 'bold'] });
}
