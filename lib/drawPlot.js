/* eslint-disable no-restricted-syntax */
import notify from 'wsk-notify';
import { chromium } from 'playwright';

import render from '../utils/render.js';

/**
 * Draw HTML
 * @param {Function} [chart] An async function that returns a function that returns HTML.
 * @param {String} [outPath='chart.png'] A filepath to write the image.
 * @param {String} [options] Options
 * @param {String} [options.css] Any CSS that you want injected into the page to tweak styles.
 * @param {Boolean} [options.headless=true] Hide the browser window.
*/
export default async function drawPlot(chart, { outPath = 'chart.png', headless = true, css } = {}) {
	notify({ m: 'Generating plot...', v: outPath, d: ['magenta', 'bold'] });
	const browser = await chromium.launch({ headless });

	/**
	 * Render the chart
	 */
	await render(browser, chart, { outPath, css });

	if (headless === true) {
		await browser.close();
	}
}
