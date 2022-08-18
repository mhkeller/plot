/* eslint-disable no-restricted-syntax */
import notify from 'wsk-notify';
import { chromium } from 'playwright';

import render from '../utils/render.js';

/**
 * Draw HTML
 * @param {Function} [chart] An async function that returns a function that returns HTML.
 * @param {String} [options] Options
 * @param {String} [options.outPath='chart.png'] A filepath to write the image.
 * @param {String} [options.css] Any CSS that you want injected into the page to tweak styles.
 * @param {Boolean} [options.view=false] If true, show the chart in a popup window.
*/
export default async function drawPlot(chart, { outPath = 'chart.png', view = false, css } = {}) {
	notify({ m: 'Generating plot...', v: outPath, d: ['magenta', 'bold'] });
	const opts = { headless: !view };
	if (view === true) {
		opts.args = ['--app'];
	}
	const browser = await chromium.launch(opts);

	/**
	 * Render the chart
	 */
	await render(browser, chart, { outPath, css });

	if (view === false) {
		await browser.close();
	}
}
