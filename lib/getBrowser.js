/**
 * Launches a new Chromium browser instance if one does not already exist
 * @returns {Promise<Browser>}
 */
import { chromium } from 'playwright';

/**
 * Kepp track of browsers in debug mode or not
 */
const browsers = new Map();
browsers.set(true, null);
browsers.set(false, null);
export default async function getBrowser(debug) {
	const existing = browsers.get(debug);
	if (existing !== null) {
		return existing;
	}

	console.log('here');
	const browser = await chromium.launch({ headless: !debug });
	browsers.set(debug, browser);
	return browser;
}
