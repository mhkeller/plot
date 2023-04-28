import plot from './plot.js';

/**
 * Plot Vega charts
 * @param {Object} [chartConfig] An @observablehq/plot function
 * @param {String} [options] Options
 * @param {String} [options.outPath=''] A filepath to write the image.
 * @param {Boolean} [options.view=true] If true, show the chart in a popup window.
 * @param {String} [options.css] Any CSS that you want injected into the page to tweak styles.
 * @param {String} [options.title='Chart'] If `view` is true, add a title to the window's page. A timestamp will be appended to this.
 * @param {Boolean} [options.debug] Whether to run the screenshot browser in headfull mode.
 */
export default async function plotObservable(chartConfig, data, options = {}) {
	await plot(chartConfig, [data], { ...options, library: 'observablehq/plot' });
}
