/* eslint-disable no-undef */
import { readDataSync } from 'indian-ocean';
import plot from '../src/plot.js';

const statesData = readDataSync('./test/data/2014_usa_states.csv');

const chart = (rows, title) => {
	const data = [{
		type: 'choropleth',
		locationmode: 'USA-states',
		locations: rows.map(d => d.Postal),
		z: rows.map(d => d.Population),
		text: rows.map(d => d.State),
		autocolorscale: true
	}];
	const layout = {
		title,
		geo: {
			scope: 'usa',
			countrycolor: 'rgb(255, 255, 255)',
			showland: true,
			landcolor: 'rgb(217, 217, 217)',
			showlakes: true,
			lakecolor: 'rgb(255, 255, 255)',
			subunitcolor: 'rgb(255, 255, 255)',
			lonaxis: {},
			lataxis: {}
		}
	};
	Plotly.newPlot('body', data, layout, { showLink: false });
}
const title = '2014 US Population by State';

await plot(chart, [statesData, title], {
	library: 'plotly',
	outPath: 'test/tmp/plotly_map.png',
	view: true,
	title
});








