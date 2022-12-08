import {  resolve } from 'path'
import { readFileSync } from 'fs';

console.log(resolve('./'));
const libs = {
	// https://github.com/observablehq/plot#installing
	'observablehq/plot': () => [
		readFileSync('./third-party/observablehq_plot/d3@7.7.js', 'utf-8'),
		readFileSync('./third-party/observablehq_plot/plot@0.6.js', 'utf-8')
	],
	// https://github.com/tensorflow/tfjs/tree/master/tfjs-vis#installation
	tfjs: () => [
		readFileSync('./third-party/tfjs/tfjs.js', 'utf-8'),
		readFileSync('./third-party/tfjs/tfjs-vis.js', 'utf-8')
	],
	// https://github.com/plotly/plotly.js#load-via-script-tag
	plotly: () => [readFileSync('./third-party/tfjs/tfjs-vis.js', 'utf-8')]
};

const cache = {}

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
