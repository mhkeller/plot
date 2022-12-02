import { readDataSync } from 'indian-ocean';
// import Plotly from 'plotly.js-dist-min';
import * as aq from 'arquero';

import drawPlot from '../lib/drawPlot.js';

const events = readDataSync('./test/data/purchase_data.csv');

const data = aq.from(events)
	.derive({date: aq.escape(d => new Date(d.date.split('T')[0]))})
	.groupby('date', 'brand')
	.rollup({value: d => aq.op.sum(d.price_in_usd), count: aq.op.count()})
	.orderby('date', 'brand')
	.objects();


