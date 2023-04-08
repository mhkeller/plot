import plot from './plot.js';

/**
 * Plot Vega charts
 * @param {Object} [chartConfig] A Vega-Lite-API chart or a Vega-Lite spec.
 * @param {String} [options] Options
 * @param {Boolean} [options.view=true] If true, show the chart in a popup window.
 * @param {String} [options.outPath=''] A filepath to write the image.
 * @param {String} [options.css] Any CSS that you want injected into the page to tweak styles.
 * @param {String} [options.title='Chart'] If `view` is true, add a title to the window's page. A timestamp will be appended to this.
 * @param {Boolean} [options.debug] Whether to run the screenshot browser in headfull mode.
 */
export default async function plotVega(chartConfig, options = {}) {
	const c = s => s;
	const spec = typeof chartConfig.toSpec === 'function' ? chartConfig.toSpec() : chartConfig;
	// Add padding for the three dots to appear in the top right corner.
	const css = `#body {padding-right:40px;} ${options.css || ''}`;
	await plot(c, [spec], { ...options, library: 'vega-lite', css });
}
