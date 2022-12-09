/* eslint-disable no-restricted-syntax */
import { join } from 'path';
import * as Plot from '@observablehq/plot';
import { chromium } from 'playwright';
import { from } from 'arquero';

import render from '../lib/render.js';
import getLibraryCode from '../utils/getLibraryCode.js';

/**
 * Draw histograms
 * @param {Array} [data] Your data to render.
 * @param {Object} [options] Options.
 * @param {String[]} [options.facetBy] An array of field names to facet by. These facets are not combined, it's just a shorthand for running multiple facets at a time, done separately in succession.
 * @param {String[]} [options.fields] An array of fields to compute histogram values for.
 * @param {String} [options.outDir] The *directory* – not a specific file name – to write the various files out to.
 * @param {String} [options.fill='#000'] A hex code or field name. Defaults to `'#000'`.
 * @param {String} [options.css] Any CSS that you want injected into the page to tweak styles.
 * @param {Boolean} [options.view=false] If true, show the chart in a popup window.
 * @param {String} [options.breakoutFields=true] For each field passed into `options.fields` write out a separate PNG. Set this to false to put everything on the same scale.
 * @param {String} [options.columns=true] Draw columns. If `false`, only draw lines.
 */
export default async function plotHistogram(
	data,
	{
		name = '',
		facetBy = [],
		fields = [],
		outDir,
		fill = '#000',
		css,
		view = false,
		breakoutFields = true,
		columns = true,
		debug = false
	}
) {
	const browser = await chromium.launch({ headless: !debug });
	const libraryCode = getLibraryCode('observablehq/plot');
	const suffix = columns === false ? '_lines' : '';

	/**
	 * Facet by our list of facet keys
	 */
	for (const fb of facetBy) {
		if (breakoutFields === true) {
			/**
			 * And make a chart for each field we want a histogram of
			 */
			for (const f of fields) {
				const page = await browser.newPage();
				/**
				 * Define our chart specification
				 */
				const chart = (ds, x, y, fll, cols) => {
					const lineStyle = { y: 1, stroke: '#000', strokeWidth: 1, strokeOpacity: 0.25 };
					return Plot.plot({
						facet: {
							data: ds,
							y,
							marginRight: 50
						},
						fy: {
							label: ''
						},
						marks: [
							cols === true
								? Plot.rectY(ds, Plot.binX({ y: 'count' }, { x, fill: fll }))
								: Plot.tickX(ds, { x, ...lineStyle }),
							cols === true ? Plot.ruleY([0]) : undefined
						]
					});
				}
				/**
				 * Determine out filename
				 */
				const n = name ? `${name}_` : '';
				const title = `${n}by__${fb}_${f}${suffix}`;
				const outPath = join(outDir, `${title}.png`);

				/**
				 * Render the chart
				 */
				await render(page, chart, { args: [data, f, fb, fill, columns], libraryCode, outPath, css, view, title });
			}
		} else {
			const page = await browser.newPage();
			const long = from(data).fold(fields).objects();

			const chart = (ds, y, fll, cols) => {
				const lineStyle = { y: 1, stroke: '#000', strokeWidth: 1, strokeOpacity: 0.25 };
				return Plot.plot({
					facet: {
						data: ds,
						x: 'key',
						y,
						marginRight: 50
					},
					fy: {
						// label: ''
					},
					marks: [
						cols === true
							? Plot.rectY(ds, Plot.binX({ y: 'count' }, { x: 'value', fill: fll }))
							: Plot.tickX(ds, { x: 'value', ...lineStyle }),
						cols === true ? Plot.ruleY([0]) : undefined
					]
				});
			}
			const n = name ? `${name}_` : '';
			const title = `${n}by__${fb}_${fields.join('|')}${suffix}`;
			const outPath = join(outDir, `${title}.png`);

			/**
			 * Render the chart
			 */
			await render(page, chart, { args: [long, fb, fill, columns], libraryCode, outPath, css, view, title });
		}
	}

	await browser.close();
}
