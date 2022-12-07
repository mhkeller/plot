const defaultXY = [0, 25];
const offset = 25;

export const bodyMargin = 8;

export const styles = `
body {
	margin: ${bodyMargin}px;
}
figure {
	margin: 0;
}
`;

export const getContextOpts = (bounds, instanceNumber, title) => {
	const moveTo = defaultXY.map(d => d + offset * instanceNumber).join(',');
	return {
		args: [
			`--app=data:text/html,<html><title>${title}</title><head></head><body id="mhk-plot-body"></body></html>`,
			`--window-size=${bounds.width},${bounds.height}`,
			`--window-position=${moveTo}`,
			'--test-type=',
		],
		ignoreDefaultArgs: ['--enable-automation'],
		headless: false,
	}
}

// TODO make this better
export const contextPath = './tmp';
