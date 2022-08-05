/* eslint-disable no-restricted-syntax */
import notify from 'wsk-notify';
import { chromium } from 'playwright';

import withJsdom from '../utils/withJsdom.js';
import screenshotRoot from '../utils/screenshotRoot.js';

export default async function drawPlot(plot, outPath = 'chart.png', { css } = {}) {
	notify({ m: 'Generating plot...', v: outPath, d: ['magenta', 'bold'] });
	const browser = await chromium.launch({ headless: true });

	/**
	 * Add our chart specification to a function
	 * that will be executed within JsDom
	 */
	const chart = async () => plot;

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

	await browser.close();
}
