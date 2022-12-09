/* eslint-disable no-restricted-syntax */
import launchContextPage from '../utils/launchContextPage.js';

import { styles, wrapperId } from '../settings/settings.js';
import renderInBrowser from './renderInBrowser.js';

export default async function showChart(
	chart,
	{ args, libraryCode, now, bounds = {}, css = '', title = 'My chart', instance = 0 } = {}
) {
	const page = await launchContextPage(bounds, instance, { title: `${title} - ${now}` });
	/**
	 * Create a page and set the HTML
	 */
	for (const content of libraryCode) {
		await page.addScriptTag({ content });
	}
	await page.addStyleTag({ content: styles });
	if (css) {
		await page.addStyleTag({ content: css });
	}
	// console.log(bounds);
	await page.addScriptTag({ content: `const mhk_plot = ${chart.toString()};` });
	await page.evaluate(renderInBrowser, [args, wrapperId]);
}
