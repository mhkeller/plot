/* eslint-disable no-restricted-syntax */
import launchContextPage from '../utils/launchContextPage.js';

import { styles } from '../settings/index.js';

export default async function showChart(
	chart,
	{ args, libraryUrls, now, bounds = {}, css = '', title = 'My chart', instance = 0 } = {}
) {
	const page = await launchContextPage(bounds, instance, { title: `${title} - ${now}`});
	// TODO, why is this additional resize needed?
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
		console.log('Running plot function');
		// eslint-disable-next-line no-undef
		const mhk_chart = mhk_plot(...a);
		console.log('Plot function ran:', mhk_chart);
		if (mhk_chart instanceof Element) {
			document.body.append(mhk_chart);
		}
	}, args);



}
