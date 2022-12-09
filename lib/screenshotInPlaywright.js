/* eslint-disable no-restricted-syntax */
import { bodyMargin, styles, wrapperId } from '../settings/settings.js';

import renderInBrowser from './renderInBrowser.js';

export default async function screenshotInPlaywright(page, chart, { args, libraryCode, outPath, css }) {
	/**
	 * Create a page and set the HTML
	 */
	for (const content of libraryCode) {
		await page.addScriptTag({ content });
	}
	await page.addScriptTag({ content: `const mhk_plot = ${chart.toString()};` });
	await page.evaluate(renderInBrowser, [args, wrapperId]);

	/**
	 * Make the body shrink to the contents
	 */
	await page.addStyleTag({
		content: `body{display:table;}#${wrapperId} {padding:${bodyMargin}px;}${styles}`
	});

	/**
	 * Apply any custom CSS
	 */
	if (css) {
		await page.addStyleTag({ content: css });
	}
	const loc = await page.locator(`#${wrapperId}`);
	if (outPath) {
		await loc.screenshot({ path: outPath });
	}

	const boundingBox = await loc.boundingBox();
	return { boundingBox };
}
