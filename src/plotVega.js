import plot from './plot.js';

/**
 * Plot Vega charts
 * @param {Function|Object} [chart] A Vega-Lite-API chart or a Vega-Lite spec.
 * @param {String} [options] Options
 * @param {Boolean} [options.view=true] If true, show the chart in a popup window.
 * @param {String} [options.outPath=''] A filepath to write the image.
 * @param {String} [options.css] Any CSS that you want injected into the page to tweak styles.
 * @param {Boolean} [options.debug] Whether to run the screenshot browser in headfull mode.
 */
export default async function plotVega(chart, options) {
	const c = s => s;
	const spec = typeof chart.toSpec === 'function' ? chart.toSpec() : chart;
	await plot(c, [spec], { ...options, library: 'vega-lite', view: true });
}
