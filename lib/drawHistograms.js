/* eslint-disable no-restricted-syntax */
import { join } from 'path';
import notify from 'wsk-notify';
import * as Plot from '@observablehq/plot';
import { chromium } from 'playwright';
import { from } from 'arquero';

import render from '../utils/render.js';

/**
 * Draw histograms
 * @param {Array} [data] Your data to render.
 * @param {Object} [options] Options.
 * @param {String[]} [options.facetBy] An array of field names to facet by. These facets are not combined, it's just a shorthand for running multiple facets at a time, done separately in succession.
 * @param {String[]} [options.fields] An array of fields to compute histogram values for.
 * @param {String} [options.outDir] The *directory* – not a specific file name – to write the various files out to.
 * @param {String} [options.fill='#000'] A hex code or field name. Defaults to `'#000'`.
 * @param {String} [options.css] Any CSS that you want injected into the page to tweak styles.
 * @param {String} [options.breakoutFields=true] For each field passed into `options.fields` write out a separate PNG. Set this to false to put everything on the same scale.
*/
export default async function drawHistograms(data, {
	name = '',
	facetBy = [],
	fields = [],
	outDir,
	fill = '#000',
	css,
	breakoutFields = true
}) {
	// notify({ m: 'Generating histograms...', d: ['magenta', 'bold'] });
	const browser = await chromium.launch({ headless: true });

	/**
	 * Facet by our list of facet keys
	 */
	for (const fb of facetBy) {

		if (breakoutFields === true) {
			/**
			 * And make a chart for each field we want a histogram of
			 */
			for (const f of fields) {
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
				 * Determine out filename
				 */
				const n = name ? `${name}_` : '';
				const outPath = join(outDir, `${n}by__${fb}_${f}.png`);

				/**
				 * Render the chart
				 */
				await render(browser, chart, { outPath, css });
			}
		} else {
			const long = from(data)
				.fold(fields)
				.objects();

			const chart = async () => Plot.plot({
				facet: {
					data: long,
					x: 'key',
					y: fb,
					marginRight: 50,
				},
				fy: {
					// label: ''
				},
				marks: [
					Plot.rectY(long, Plot.binX({ y: 'count' }, { x: 'value', fill })),
					Plot.ruleY([0]),
					// Plot.rectY(
					// 	long,
					// 	Plot.binX(
					// 		{ y: 'count' },
					// 		{ x: 'value', fillOpacity: 0.1, facet: 'exclude' }
					// 	)
					// ),
				],

			});
			const n = name ? `${name}_` : '';
			const outPath = join(outDir, `${n}by__${fb}_${fields.join('|')}.png`);

			/**
			 * Render the chart
			 */
			await render(browser, chart, { outPath, css });
		}

	}

	await browser.close();
}
