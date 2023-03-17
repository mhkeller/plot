export default function renderInBrowser([args, wrapperId, library]) {
	console.log('Running plot function');
	const el = document.createElement('div');
	el.setAttribute('id', wrapperId);
	document.body.append(el);

	// eslint-disable-next-line no-undef
	const mhk_chart = mhk_plot(...args);
	console.log('Plot function ran:', mhk_chart);
	if (mhk_chart instanceof Element) {
		el.append(mhk_chart);
	} else if (library === 'vega-lite') {
		window.vegaEmbed(`#${wrapperId}`, mhk_chart);
	} else if (library === 'vega-lite-api') {
		const spec = mhk_chart.toSpec();
		window.vegaEmbed(`#${wrapperId}`, spec);
	}
}
