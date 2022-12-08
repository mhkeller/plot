import { chromium } from 'playwright';
import { rmSync } from 'fs'

import { contextPath, getContextOpts } from '../settings/index.js'

export default async function launchContextPage(bounds, instanceNumber, { title } = {}) {
	const contextOpts = getContextOpts(bounds, instanceNumber, title);

	const instancePath = `${contextPath}-${instanceNumber}`;

	const context = await chromium.launchPersistentContext(instancePath, contextOpts);
	const contextPages = await context.pages();
	// console.log(contextPages);
	const contextPage = contextPages[0];

	/**
	 * When you click on the dock icon it will open a new page
	 * because this popup doesn't count as a page
	 * Immedicately close it in that scenario
	 */
	context.on('page', async p => {
		await p.close();
	})
	/**
	 * Clean up tmp directory
	 */
	context.on('close', () => {
		rmSync(instancePath, {
			recursive: true
		});
	});
	/**
	 * Close the context when this window closes
	 */
	contextPage.on('close', async () => {
		await context.close();
	});

	return contextPage;
}
