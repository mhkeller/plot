import { readDataSync } from 'indian-ocean';
import * as aq from 'arquero';

import plot from '../src/plot.js';

const events = readDataSync('./test/data/purchase_data.csv');

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

const layout = {
	width: 500,
	height: 500
};

const data = [trace1, trace2];

const chart = (ds, l) => {
	Plotly.newPlot('body', ds, l);
};

await plot(chart, [data, layout], {
	library: 'plotly',
	outPath: 'test/tmp/plotly_line-plot.png',
	view: true,
	title: 'Plotly line chart'
});
