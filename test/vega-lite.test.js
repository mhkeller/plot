/* eslint-disable no-undef */
import plot from '../src/plot.js';

const dataset = {
	values: [
		{a: 'A', b: 28},
		{a: 'B', b: 55},
		{a: 'C', b: 43},
		{a: 'D', b: 91},
		{a: 'E', b: 81},
		{a: 'F', b: 53},
		{a: 'G', b: 19},
		{a: 'H', b: 87},
		{a: 'I', b: 52}
	]
};

const chart = data => {
	const spec = {
		$schema: 'https://vega.github.io/schema/vega-lite/v5.json',
		description: 'A simple bar chart with embedded data.',
		data,
		mark: 'bar',
		encoding: {
			x: {field: 'a', type: 'ordinal'},
			y: {field: 'b', type: 'quantitative'}
		}
	};
	return vegaEmbed('#body', spec);
}

await plot(chart, [dataset], {
	library: 'vega-lite',
	outPath: 'test/tmp/vega-lite_line-plot.png',
	view: true,
	title: 'Vega line chart'
});
