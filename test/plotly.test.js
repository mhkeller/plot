import { readDataSync } from 'indian-ocean';
// import Plotly from 'plotly.js-dist-min';
import * as aq from 'arquero';

import drawPlot from '../src/drawPlot.js';

const events = readDataSync('./test/data/purchase_data.csv');

const data = aq
	.from(events)
	.derive({ date: aq.escape((d) => new Date(d.date.split('T')[0])) })
	.groupby('date', 'brand')
	.rollup({ value: (d) => aq.op.sum(d.price_in_usd), count: aq.op.count() })
	.orderby('date', 'brand')
	.objects();

const chart = async () => {
	Plot.plot({
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