import * as vl from 'vega-lite-api';
import plotVega from '../src/plotVega.js';

const data = [
	{ category: 'A', value: 28 },
	{ category: 'B', value: 55 },
	{ category: 'C', value: 43 },
	{ category: 'D', value: 91 },
];

const chart = vl
	.markBar()
	.description('A simple bar chart with embedded data.')
	.data(data)
	.encode(
		vl.x().fieldO('category'),
		vl.y().fieldQ('value')
	);

await plotVega(chart);
