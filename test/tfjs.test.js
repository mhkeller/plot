import plot from '../src/plot.js';

const series1 = Array(100).fill(0)
	.map(() => Math.random() * 100 - (Math.random() * 50))
	.map((y, x) => ({ x, y, }));

const series2 = Array(100).fill(0)
	.map(() => Math.random() * 100 - (Math.random() * 150))
	.map((y, x) => ({ x, y, }));

const series = ['First', 'Second'];
const data = { values: [series1, series2], series }

const surface = { name: 'Scatterplot', tab: 'Charts' };


const chart = (s, ds) => {
	// eslint-disable-next-line no-undef
	tfvis.render.scatterplot(document.body, ds);
}

await plot(chart, [surface, data], {
	library: 'tfjs',
	outPath: 'test/tmp/tensorflow-scatter.png',
	view: true,
	title: 'Scatterplot'
});
