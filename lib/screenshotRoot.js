export default async function screenshotRoot(browser, root, { outPath, css }) {
	/**
	 * Create a page and set the HTML
	 */
	const page = await browser.newPage();
	await page.setContent(root.outerHTML, {
		waitUntil: 'domcontentloaded'
	});

	/**
	 * Make the body shrink to the contents
	 */
	await page.addStyleTag({ content: 'body{display:table;}' });

	/**
	 * Apply any custom CSS
	 */
	if (css) {
		await page.addStyleTag({ content: css });
	}
	const loc = await page.locator('body > *');
	await loc.screenshot({ path: outPath });

	return loc.boundingBox();
}
