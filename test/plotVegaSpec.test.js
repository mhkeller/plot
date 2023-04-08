/* eslint-disable no-undef */
import plotVega from '../src/plotVega.js';

const data = {
	values: [
		{ category: 'A', value: 28 },
		{ category: 'B', value: 55 },
		{ category: 'C', value: 43 },
		{ category: 'D', value: 91 },
	]
};

const spec = {
	$schema: 'https://vega.github.io/schema/vega-lite/v5.json',
	description: 'A simple bar chart with embedded data.',
	data,
	mark: 'bar',
	encoding: {
		x: { field: 'category', type: 'ordinal' },
		y: { field: 'value', type: 'quantitative' }
	}
};

await plotVega(spec);
