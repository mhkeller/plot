/* eslint-disable no-restricted-syntax */
import { chromium } from 'playwright';
import notify from '@mhkeller/notify';

import render from '../lib/render.js';
import getLibraryCode from '../utils/getLibraryCode.js';

/**
 * Plot HTML
 * @param {Function|Object} [chart] An async function that returns a function that returns HTML.
 * @param {String} [options] Options
 * @param {String|String[]} [options.library] Specify what library to load to render the plot. Built-in options are `'observablehq/plot'`, `'vega-lite'` and `'plotly'`. Other strings will be interpreted as custom JavaScript to insert. This field can also be an array of strings, if you need to add multiple scripts.
 * @param {Boolean} [options.view=true] If true, show the chart in a popup window.
 * @param {String} [options.outPath=''] A filepath to write the image.
 * @param {String} [options.title='Chart'] If `view` is true, add a title to the window's page. A timestamp will be appended to this.
 * @param {String} [options.css] Any CSS that you want injected into the page to tweak styles.
 * @param {Boolean} [options.debug] Whether to run the screenshot browser in headfull mode.
 */
export default async function plot(
	chart,
	args = [],
	{ library = 'observablehq/plot', outPath = '', view = true, css, title, debug = false } = {}
) {
	notify({ m: 'Generating plot...', v: outPath, d: ['magenta', 'bold'] });

	const browser = await chromium.launch({ headless: !debug });
	const page = await browser.newPage();

	const libraryCode = getLibraryCode(library);

	/**
	 * Render the chart
	 */
	await render(page, chart, { args, library, libraryCode, outPath, css, view, title });

	if (debug === false) {
		await browser.close();
	}
}
