/* eslint-disable no-restricted-syntax */
import { chromium } from 'playwright';
import notify from 'wsk-notify';

import render from '../lib/render.js';
import getLibraryCode from '../utils/getLibraryCode.js';

/**
 * Plot HTML
 * @param {Function|Object} [chart] An async function that returns a function that returns HTML.
 * @param {String} [options] Options
 * @param {String|String[]} [options.library] Specify what library to load to render the plot. Built-in options are `'observablehq/plot'`, `'tfjs'` and `'plotly'`. To use your own, add in the URL of the script to load in the browser and it will be injected as the `src` of a `<script>` tag. This field can also be an array of URLs if you need to add multiple scripts.
 * @param {String} [options.outPath='chart.png'] A filepath to write the image.
 * @param {String} [options.css] Any CSS that you want injected into the page to tweak styles.
 * @param {Boolean} [options.view=false] If true, show the chart in a popup window.
 * @param {Boolean} [options.debug] Whether to run the screenshot browser in headfull mode.
 */
export default async function plot(
	chart,
	args,
	{ library = 'observablehq/plot', outPath = 'chart.png', view = false, css, title, debug = false } = {}
) {
	notify({ m: 'Generating plot...', v: outPath, d: ['magenta', 'bold'] });

	const browser = await chromium.launch({ headless: !debug });
	const page = await browser.newPage();

	const libraryCode = getLibraryCode(library);

	/**
	 * Render the chart
	 */
	await render(page, chart, { args, libraryCode, outPath, css, view, title });

	await browser.close();
}
