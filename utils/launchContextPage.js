import { chromium } from 'playwright';
import { rmSync, existsSync } from 'fs'
import { join } from 'path';

import { contextPath, getContextOpts } from '../settings/settings.js';

function trashContexts() {
	if (existsSync(contextPath)) {
		rmSync(contextPath, {
			recursive: true
		});
	}
}

export default async function launchContextPage(bounds, instanceNumber, { title } = {}) {
	trashContexts();
	const contextOpts = getContextOpts(bounds, instanceNumber, title);

	const instancePath = join(contextPath, `instance-${instanceNumber}`);

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
		trashContexts();
	});
	/**
	 * Close the context when this window closes
	 */
	contextPage.on('close', async () => {
		trashContexts();
		await context.close();
	});

	return contextPage;
}
