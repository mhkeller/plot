import { chromium } from 'playwright';
import { join } from 'path';
import rimraf from 'rimraf';
import notify from '@mhkeller/notify';

import { contextPath, getContextOpts } from '../settings/settings.js';

async function trashContexts() {
	try {
		await rimraf(contextPath);
	} catch (err) {
		notify({ m: 'Error cleaning up files. You can manually delete this directory:', v: contextPath, d: ['yellow', 'bold'] });
	}
}

export default async function launchContextPage(bounds, instanceNumber, { title } = {}) {
	await trashContexts();
	const contextOpts = getContextOpts(bounds, instanceNumber, title);

	const instancePath = join(contextPath, `instance-${instanceNumber}`);

	const context = await chromium.launchPersistentContext(instancePath, contextOpts);
	const contextPages = await context.pages();
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
	context.on('close', async () => {
		await trashContexts();
	});
	/**
	 * Close the context when this window closes
	 */
	contextPage.on('close', async () => {
		await context.close();
	});

	return contextPage;
}
