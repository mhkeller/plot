/* eslint-disable no-undef */
import * as vl from 'vega-lite-api';
import plotVega from '../src/plotVega.js';

const data = {
	values: [
		{ a: 'A', b: 28 },
		{ a: 'B', b: 55 },
		{ a: 'C', b: 43 },
		{ a: 'D', b: 91 },
		{ a: 'E', b: 81 },
		{ a: 'F', b: 53 },
		{ a: 'G', b: 19 },
		{ a: 'H', b: 87 },
		{ a: 'I', b: 52 }
	]
};

const chart = vl
	.markBar()
	.description('A simple bar chart with embedded data.')
	.data(data)
	.encode(
		vl.x().fieldO('a'),
		vl.y().fieldQ('b')
	);

await plotVega(chart, {
	outPath: 'test/tmp/vega-lite-api_line-plot.png'
});
