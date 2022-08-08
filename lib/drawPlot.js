/* eslint-disable no-restricted-syntax */
import notify from 'wsk-notify';
import { chromium } from 'playwright';

import render from '../utils/render.js';

/**
 * Draw HTML
 * @param {Function} [plotFunction] A function that renders HTML.
 * @param {String} [outPath='chart.png'] A filepath to write the image.
 * @param {String} [options] Options
 * @param {String} [options.css] Any CSS that you want injected into the page to tweak styles.
*/
export default async function drawPlot(plot, outPath = 'chart.png', { css } = {}) {
	notify({ m: 'Generating plot...', v: outPath, d: ['magenta', 'bold'] });
	const browser = await chromium.launch({ headless: true });

	/**
	 * Add our chart specification to a function
	 * that will be executed within JsDom
	 */
	const chart = async () => plot;

	/**
	 * Render the chart
	 */
	await render(browser, chart, { outPath, css });

	await browser.close();
}
