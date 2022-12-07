const libs = {
	'observablehq/plot': [
		'https://cdn.jsdelivr.net/npm/d3@7',
		'https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6'
	],
	tfjs: [
		'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs',
		'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis'
	]
};

export default function getLibraryUrls(code) {
	if (Array.isArray(code)) {
		return code;
	}
	return libs[code] || code;
}
