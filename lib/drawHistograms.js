/* eslint-disable no-restricted-syntax */
import { join } from 'path';
import notify from 'wsk-notify';
import * as Plot from '@observablehq/plot';
import { chromium } from 'playwright';
import * as aq from 'arquero'

import withJsdom from '../utils/withJsdom.js';
import screenshotRoot from '../utils/screenshotRoot.js';

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

	/**
	 * Facet by our list of facet keys
	 */
	for (const fb of facetBy) {

		/**
		 * And make a chart for each field we want a histogram of
		 */
		for (const f of fields) {
			console.log(data);
			/**
			 * Define our chart specification
			 */
			const chart = async () => Plot.plot({
				facet: {
					data,
					y: fb,
					marginRight: 50,
				},
				fy: {
					label: ''
				},
				marks: [
					Plot.rectY(data, Plot.binX({ y: 'count' }, { x: f, fill })),
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
	}

	await browser.close();
}
