import { readDataSync } from 'indian-ocean';
import * as Plot from '@observablehq/plot';
import * as aq from 'arquero';
import { utcDay } from 'd3-time'
import { utcFormat } from 'd3-time-format'

import drawPlot from '../lib/drawPlot.js';

const events = readDataSync('./test/data/purchase_data.csv');

const data = aq.from(events)
	.derive({date: aq.escape(d => utcDay(d.date))})
	.groupby('date', 'brand')
	.rollup({value: d => aq.op.sum(d.price_in_usd), count: aq.op.count()})
	.orderby('date', 'brand')
	.objects();

// data.forEach(d => {
// 	d.date = utcFormat('%a')(d.date);
// })

const chart = async () => Plot.plot({
	marks: [
		Plot.rectY(
			data,
			Plot.binX(
				{ y: 'count' },
				{
					x: 'date',
					y: 'value',
					fill: 'blue',
					fillOpacity: 0.5,
					thresholds: 10
				}
			)
		)
	],
	marginLeft: 100,
	height: 200,
	width: 578
})

await drawPlot(chart, {
	outPath: 'test/tmp/line-plot.png'
});
