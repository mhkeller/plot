/* eslint-disable no-undef */
import { readDataSync } from 'indian-ocean';
import * as aq from 'arquero';
import plot from '../src/plot.js';

const events = readDataSync('./test/data/purchase_data.csv');

const dataset = aq
	.from(events)
	.derive({ date: aq.escape(d => new Date(d.date.split('T')[0])) })
	.groupby('date', 'brand')
	.rollup({ value: d => aq.op.sum(d.price_in_usd) })
	.orderby('date', 'brand')
	.objects();

const chart = data => {
	return Plot.plot({
		marks: [
			Plot.line(data, {
				x: 'date',
				y: 'value',
				stroke: 'brand',
				strokeWidth: 2,
				curve: 'linear'
			})
		],
		width: 554,
		height: 130,
		x: { ticks: 3 },
		marginLeft: 50,
		color: {
			legend: true,
			width: 554,
			columns: '120px'
		}
	});
};

await plot(chart, [dataset], {
	library: 'observablehq/plot',
	outPath: 'test/tmp/line-plot.png',
	view: true,
	title: 'Line chart'
});
await plot(chart, [dataset], {
	library: 'observablehq/plot',
	outPath: 'test/tmp/line-plot.png',
	view: true,
	title: 'Line chart'
});
