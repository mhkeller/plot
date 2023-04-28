CHANGELOG
===

# 3.1.0

> not yet on npm

Add the `plotObservable` function as a shorthand for using Observablehq/plot charts.

* [8aebca2ce9379c090d7269c76053b2199a363f72](https://github.com/mhkeller/plot/commit/8aebca2ce9379c090d7269c76053b2199a363f72)

# 3.0.0

> 2023-04-07

Breaking change. Set `view` to `true` by default. Adds the `plotVega` export as a convenient and simpler API for plotting Vega-Lite specs and [Vega-Lite-API](https://github.com/vega/vega-lite-api) charts.

* [e13a9704ab6cf90b4da43834bf24ff9bd785b3e1](https://github.com/mhkeller/plot/commit/e13a9704ab6cf90b4da43834bf24ff9bd785b3e1)
* 
# 2.0.2

> 2023-03-25

Update to [@mhkeller/notify](https://github.com/mhkeller/notify) for security fixes.

* [2dce697878fb868f9b5cfd23eae3bc661d6b1e9e](https://github.com/mhkeller/plot/commit/2dce697878fb868f9b5cfd23eae3bc661d6b1e9e)

# 2.0.0

> 2023-03-16

Adds support for [Vega-Lite-API](https://vega.github.io/vega-lite-api/) and simplifies the API for it and for Vega-Lite whereby you an simply return the spec, or spec-producing function instead of calling `vegaEmbed`. Updates Playwright dependency to fix [#9](https://github.com/mhkeller/plot/issues/9).

* [PR #10](https://github.com/mhkeller/plot/pull/10)

# 1.1.0

> 2022-12-09

Initial release

* [Release](https://github.com/mhkeller/plot/releases/tag/v1.1.0)
