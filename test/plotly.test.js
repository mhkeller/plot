/* eslint-disable no-undef */
import plot from '../src/plot.js';

const trace1 = {
	type: 'scatter',
	x: [1, 2, 3, 4],
	y: [10, 15, 13, 17],
	mode: 'lines',
	name: 'Red',
	line: {
		color: 'rgb(219, 64, 82)',
		width: 3
	}
};

const trace2 = {
	type: 'scatter',
	x: [1, 2, 3, 4],
	y: [12, 9, 15, 12],
	mode: 'lines',
	name: 'Blue',
	line: {
		color: 'rgb(55, 128, 191)',
		width: 1
	}
};

const chartLayout = {
	width: 500,
	height: 500
};

const dataset = [trace1, trace2];

const chart = (data, layout) => {
	Plotly.newPlot('body', data, layout);
};

await plot(chart, [dataset, chartLayout], {
	library: 'plotly',
	outPath: 'test/tmp/plotly_line-plot.png',
	view: true,
	title: 'Plotly line chart'
});
