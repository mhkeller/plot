import { readDataSync } from 'indian-ocean';
// import Plotly from 'plotly.js-dist-min';
import * as aq from 'arquero';
import * as tfvis from '../vendor/tfjs-vis.umd.min.js'



const events = readDataSync('./test/data/purchase_data.csv');

// const data = aq.from(events)
// 	.derive({date: aq.escape(d => new Date(d.date.split('T')[0]))})
// 	.groupby('date', 'brand')
// 	.rollup({value: d => aq.op.sum(d.price_in_usd), count: aq.op.count()})
// 	.orderby('date', 'brand')
// 	.objects();

// const series1 = Array(100).fill(0)
// 	.map(y => Math.random() * 100 - (Math.random() * 50))
// 	.map((y, x) => ({ x, y, }));

// const series2 = Array(100).fill(0)
// 	.map(y => Math.random() * 100 - (Math.random() * 150))
// 	.map((y, x) => ({ x, y, }));

// const series = ['First', 'Second'];
// const data = { values: [series1, series2], series }

// const surface = { name: 'Scatterplot', tab: 'Charts' };


// const chart = async () => tfvis.render.scatterplot(surface, data);

// await drawPlot(chart, {
// 	outPath: 'test/tmp/tensorflow-scatter.png',
// 	view: true,
// 	title: 'Scatterplot'
// });
