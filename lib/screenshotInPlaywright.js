/* eslint-disable no-restricted-syntax */
import { bodyMargin, styles } from '../settings/index.js';

export default async function screenshotInPlaywright(page, chart, { args, libraryCode, outPath, css }) {
	/**
	 * Create a page and set the HTML
	 */
	for (const content of libraryCode) {
		await page.addScriptTag({ content });
	}
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

	/**
	 * Make the body shrink to the contents
	 */
	await page.addStyleTag({
		content: `body{display:table;}body > * {padding:${bodyMargin}px;}${styles}`
	});

	/**
	 * Apply any custom CSS
	 */
	if (css) {
		await page.addStyleTag({ content: css });
	}
	const loc = await page.locator('body > *');
	await loc.screenshot({ path: outPath });

	const boundingBox = await loc.boundingBox();
	return { boundingBox };
}
