import { JSDOM } from 'jsdom';

export default function createDocument() {
	const jsdom = new JSDOM();
	return jsdom.window.document;
}
