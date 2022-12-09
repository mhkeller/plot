import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

const libs = {
	// https://github.com/observablehq/plot#installing
	'observablehq/plot': () => [
		readFileSync(resolve(__dirname, '../third-party/observablehq_plot/d3@7.7.js'), 'utf-8'),
		readFileSync(resolve(__dirname, '../third-party/observablehq_plot/plot@0.6.js'), 'utf-8')
	],
	// https://github.com/tensorflow/tfjs/tree/master/tfjs-vis#installation
	// tfjs: () => [
	// 	readFileSync(resolve(__dirname, '../third-party/tfjs/tfjs.js'), 'utf-8'),
	// 	readFileSync(resolve(__dirname, '../third-party/tfjs/tfjs-vis.js'), 'utf-8')
	// ],
	// https://github.com/plotly/plotly.js#load-via-script-tag
	plotly: () => [readFileSync(resolve(__dirname, '../third-party/plotly/plotly-2.16.4.min.js'), 'utf-8')]
};

const cache = {};

export default function getLibraryCode(name) {
	if (Array.isArray(name)) {
		return name;
	}
	if (cache[name]) {
		return cache[name];
	}
	if (libs[name]) {
		const codes = libs[name]();
		cache[name] = codes;
		return codes;
	}
	return [name];
}
