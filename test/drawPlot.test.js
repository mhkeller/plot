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

const chart = async () => Plot.plot({
	marks: [
		Plot.barY(
			data,
			Plot.groupX(
				{ y: 'sum' },
				{ x: d => utcFormat('%a')(d.date), y: 'value', stroke: 'brand' }
			)
		)
	],
	width: 554,
	height: 130,
	x: { ticks: 3, domain: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
	marginLeft: 50,
	color: {
		legend: true,
		width: 554,
		columns: '120px'
	}
})

await drawPlot(chart, {
	outPath: 'test/tmp/line-plot.png'
});
