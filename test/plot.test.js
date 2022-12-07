import { readDataSync } from 'indian-ocean';
import * as Plot from '@observablehq/plot';
import * as aq from 'arquero';

import plot from '../src/plot.js';

const events = readDataSync('./test/data/purchase_data.csv');

const data = aq
	.from(events)
	.derive({ date: aq.escape(d => new Date(d.date.split('T')[0])) })
	.groupby('date', 'brand')
	.rollup({ value: d => aq.op.sum(d.price_in_usd), count: aq.op.count() })
	.orderby('date', 'brand')
	.objects();

const chart = ds => {
	return Plot.plot({
		marks: [
			Plot.line(ds, {
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

await plot(chart, [data], {
	library: 'observablehq/plot',
	outPath: 'test/tmp/line-plot.png',
	view: true,
	title: 'Line chart'
});