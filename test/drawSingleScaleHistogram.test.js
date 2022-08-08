import { readDataSync } from 'indian-ocean';
import drawHistograms from '../lib/drawHistograms.js';

const data = readDataSync('./test/data/groups.tsv');

const fields = ['field-a', 'field-b', 'field-c'];

data.forEach(d => {
	fields.forEach(f => {
		d[f] = +d[f];
	});
});

await drawHistograms(data, {
	facetBy: ['minor_group'],
	fields,
	fill: 'minor_group',
	outDir: 'test/tmp/drawSingleScaleHistogram',
	breakoutFields: false
});
