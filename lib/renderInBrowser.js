export default function renderInBrowser([a, wrapperId]) {
	console.log('Running plot function');
	const el = document.createElement('div');
	el.setAttribute('id', wrapperId);
	document.body.append(el);

	// eslint-disable-next-line no-undef
	const mhk_chart = mhk_plot(...a);
	console.log('Plot function ran:', mhk_chart);
	if (mhk_chart instanceof Element) {
		el.append(mhk_chart);
	}
}
