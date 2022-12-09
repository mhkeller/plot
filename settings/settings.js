import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

const defaultXY = [0, 25];
const offset = 25;

export const wrapperId = 'body';
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
			`--app=data:text/html,<html><title>${title}</title><head></head><body></body></html>`,
			`--window-size=${bounds.width},${bounds.height}`,
			`--window-position=${moveTo}`,
			'--test-type='
		],
		viewport: null,
		ignoreDefaultArgs: ['--enable-automation'],
		headless: false
	};
};

export const contextPath = resolve(__dirname, '../temp-instances');
