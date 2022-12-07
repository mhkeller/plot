/* eslint-disable no-restricted-syntax */
import { chromium } from 'playwright';
import notify from 'wsk-notify';

import render from '../lib/render.js';
import getLibraryUrls from '../utils/getLibraryUrls.js';

/**
 * Plot HTML
 * @param {Function|Object} [chart] An async function that returns a function that returns HTML.
 * @param {String} [options] Options
 * @param {String} [options.library] TODO
 * @param {String} [options.outPath='chart.png'] A filepath to write the image.
 * @param {String} [options.css] Any CSS that you want injected into the page to tweak styles.
 * @param {Boolean} [options.view=false] If true, show the chart in a popup window.
 * @param {Boolean} [options.debug] TODO
 */
export default async function plot(
	chart,
	args,
	{ library = 'observablehq/plot', outPath = 'chart.png', view = false, css, title, debug = false } = {}
) {
	notify({ m: 'Generating plot...', v: outPath, d: ['magenta', 'bold'] });

	const browser = await chromium.launch({ headless: !debug });
	const page = await browser.newPage();

	const libraryUrls = getLibraryUrls(library);

	/**
	 * Render the chart
	 */
	await render(page, chart, { args, libraryUrls, outPath, css, view, title });

	await browser.close();
}
