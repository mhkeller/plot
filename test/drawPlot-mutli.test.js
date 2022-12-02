import { readDataSync } from 'indian-ocean';
import * as Plot from '@observablehq/plot';
import * as aq from 'arquero';

import drawPlot from '../lib/drawPlot.js';

const events = readDataSync('./test/data/purchase_data.csv');

const data = aq.from(events)
	.derive({date: aq.escape(d => new Date(d.date.split('T')[0]))})
	.groupby('date', 'brand')
	.rollup({value: d => aq.op.sum(d.price_in_usd), count: aq.op.count()})
	.orderby('date', 'brand')
	.objects();

// data.forEach(d => {
// 	d.date = utcFormat('%a')(d.date);
// })

const chart = async () => Plot.plot({
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
})

await drawPlot(chart, {
	outPath: 'test/tmp/line-plot.png',
	view: true,
	title: 'Line chart'
});

await drawPlot(chart, {
	outPath: 'test/tmp/line-plot.png',
	view: true,
	title: 'Line chart 2'
});

await drawPlot(chart, {
	outPath: 'test/tmp/line-plot.png',
	view: true,
	title: 'Line chart3'
});
