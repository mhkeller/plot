/* eslint-disable no-underscore-dangle */
// from plot-cli https://github.com/Fil/plot-cli/blob/ddc8967288da4a8b7a1d1e85d93fdc4aa894fc55/jsdom.js
import { promises } from 'fs';
import { JSDOM } from 'jsdom';
import { resolve } from 'path';

import libraries from './libraries';

class Response {
	constructor(href) {
		this._href = href;
		this.ok = true;
		this.status = 200;
	}

	async text() {
		return promises.readFile(this._href, { encoding: 'utf-8' });
	}

	async json() {
		return JSON.parse(await this.text());
	}
}

export default function withJsdom(run, libraryPath) {
	libraryPath = libraries[libraryPath] || libraryPath;
	return async () => {
		const jsdom = new JSDOM('');
		global.window = jsdom.window;
		global.document = jsdom.window.document;
		global.navigator = jsdom.window.navigator;
		global.Event = jsdom.window.Event;
		global.Node = jsdom.window.Node;
		global.NodeList = jsdom.window.NodeList;
		global.HTMLCollection = jsdom.window.HTMLCollection;
		global.fetch = async (href) => new Response(resolve('./test', href));
		jsdom.window.HTMLCanvasElement.prototype.getContext = () => null;
		jsdom.window.URL.createObjectURL = () => null;
		try {
			if (libraryPath) {
				// Load library
			}
			/**
			 * Add an id so plot.ly can grab onto something
			 */
			document.querySelector('body').setAttribute('id', 'body');
			return await run();
		} finally {
			delete global.window;
			delete global.document;
			delete global.navigator;
			delete global.Event;
			delete global.Node;
			delete global.NodeList;
			delete global.HTMLCollection;
			delete global.fetch;
		}
	};
}
