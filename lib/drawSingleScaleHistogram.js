/* eslint-disable no-restricted-syntax */
import { join } from 'path';
import notify from 'wsk-notify';
import * as Plot from '@observablehq/plot';
import { chromium } from 'playwright';
import * as aq from 'arquero';

import withJsdom from '../utils/withJsdom.js';
import screenshotRoot from '../utils/screenshotRoot.js';

/**
 * Draw histograms
 * @param {Array} [data] Your data to render.
 * @param {Object} [options] Options.
 * @param {String[]} [options.facetBy] An array of field names to facet by. These facets are not combined, it's just a shorthand for running multiple facets at a time, done separately in succession.
 * @param {String[]} [options.fields] An array of fields to compute histogram values for.
 * @param {String} [options.outDir] The *directory* – not a specific file name – to write the various files out to.
 * @param {String} [options.fill='#000'] A hex code or field name. Defaults to `'#000'`.
 * @param {String} [options.css] Any CSS that you want injected into the page to tweak styles.
*/
export default async function drawHistograms(data, {
	name = '',
	facetBy = [],
	fields = [],
	outDir,
	fill = '#000',
	css
}) {
	notify({ m: 'Generating histograms...', d: ['magenta', 'bold'] });
	const browser = await chromium.launch({ headless: true });

	const long = aq.from(data)
		.fold(fields)
		.objects();

	console.log(long);

	/**
	 * Facet by our list of facet keys
	 */
	for (const fb of facetBy) {
		/**
		 * Define our chart specification
		 */
		const chart = async () => Plot.plot({
			facet: {
				long,
				x: 'key',
				y: fb,
				marginRight: 50,
			},
			fy: {
				label: ''
			},
			marks: [
				Plot.rectY(long, Plot.binX({ y: 'count' }, { x: 'value', fill })),
				Plot.ruleY([0])
			]
		});

		/**
		 * Render the chart with JsDOM
		 */
		const root = await withJsdom(chart)();

		/**
		 * Take a screenshot with Playwright
		 */
		const n = name ? `${name}_` : '';
		const outPath = join(outDir, `${n}by__${fb}_${f}.png`);
		await screenshotRoot(browser, root, {
			outPath,
			css
		});
		notify({ m: '\tWrote screenshot...', v: outPath, d: ['blue', 'bold'] });
	}

	await browser.close();
}
