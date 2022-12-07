/* eslint-disable no-restricted-syntax */
import launchContextPage from '../utils/launchContextPage.js';

import { bodyMargin, styles } from '../settings/index.js';

export default async function showChart(
	chart,
	{ args, libraryUrls, now, bounds = {}, css = '', title = 'My chart', instance = 0 } = {}
) {
	const page = await launchContextPage(bounds, instance, { title: `${title} - ${now}`});
	await page.addScriptTag({ content: `window.resizeTo(${bounds.width}, ${bounds.height})` });
	/**
	 * Create a page and set the HTML
	 */
	for (const url of libraryUrls) {
		await page.addScriptTag({ url });
	}
	await page.addStyleTag({ content: styles });
	if (css) {
		await page.addStyleTag({ content: css });
	}
	// console.log(bounds);
	await page.addScriptTag({ content: `const mhk_plot = ${chart.toString()};` });
	await page.evaluate(a => {
		const mhk_chart = mhk_plot(...a);
		if (mhk_chart instanceof Element) {
			document.body.append(mhk_chart);
		}
	}, args);



}
