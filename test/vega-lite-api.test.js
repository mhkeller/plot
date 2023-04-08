/* eslint-disable no-undef */
import * as vl from 'vega-lite-api';
import plot from '../src/plot.js';

const dataset = {
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

const chart = data => {
	return vl.markBar()
		.description('A simple bar chart with embedded data.')
		.data(data)
		.encode(
			vl.x().fieldO('a'),
			vl.y().fieldQ('b')
		)
}

await plot(chart, [dataset], {
	library: 'vega-lite-api',
	outPath: 'test/tmp/vega-lite-api_line-plot.png',
	view: true,
	title: 'Vega-lite-api line chart'
});
