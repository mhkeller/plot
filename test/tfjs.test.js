import { readDataSync } from 'indian-ocean';
import * as aq from 'arquero';

import plot from '../src/plot.js';

// const events = readDataSync('./test/data/purchase_data.csv');

// const data = aq.from(events)
// 	.derive({date: aq.escape(d => new Date(d.date.split('T')[0]))})
// 	.groupby('date', 'brand')
// 	.rollup({value: d => aq.op.sum(d.price_in_usd), count: aq.op.count()})
// 	.orderby('date', 'brand')
// 	.objects();

const series1 = Array(100).fill(0)
	.map(y => Math.random() * 100 - (Math.random() * 50))
	.map((y, x) => ({ x, y, }));

const series2 = Array(100).fill(0)
	.map(y => Math.random() * 100 - (Math.random() * 150))
	.map((y, x) => ({ x, y, }));

const series = ['First', 'Second'];
const data = { values: [series1, series2], series }

const surface = { name: 'Scatterplot', tab: 'Charts' };


const chart = (s, ds) => {
	tfvis.render.scatterplot(s, ds);
}

await plot(chart, [surface, data], {
	library: 'tfjs',
	outPath: 'test/tmp/tensorflow-scatter.png',
	view: true,
	title: 'Scatterplot'
});
