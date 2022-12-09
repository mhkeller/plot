Plot
===

> A small node library to display charts in popup windows and save them as pngs. Supports [observablehq/plot](https://observablehq.com/@observablehq/plot) and [plotly](https://plotly.com/javascript/) out of the box.

- [Motivation](#motivation)
- [Installing](#installing)
- [Functions](#functions)
- [Examples](#examples)
- [How it works](#how-it-works)

## Motivation

In notebook-based systems or IDEs like RStudio, it's nice to create a quick chart or map from your data. There aren't that many similar solutions for Node.js, however. This library is a small bridge that allows you to take advantage of these or similar charting libraries such as [observablehq/plot](https://observablehq.com/@observablehq/plot), [plotly](https://plotly.com/javascript/) or others to renders charts in a browser environment directly from a Node script, see the results in a minimal popup window and save the image.

![](_readme-assets/hist-demo.png)
![](_readme-assets/line-demo.png)
![](_readme-assets/map-output.png)
![](_readme-assets/map-code.png)

## Installing

It's not yet on npm so install with the below command but import it with `import { plot, plotHistogram } from '@mhkeller/plot'`.

```
npm install mhkeller/plot
# later when it's on npm, you can do npm install @mhkeller/plot
```

## Functions

**plot(** `plotFunction: Function, args: Array, options: Object` **)**

A generic function to render HTML, view and screenshot it. 

```javascript
import { plot } from '@mhkeller/plot`;

// Create a function that returns html
const chart = ds => {
  return Plot.plot({
    marks: [
      Plot.rectY(
        ds, 
        Plot.binX(
          { y: 'count' }, 
          {
            x: 'date', 
            y: 'value', 
            fill: 'blue', 
            thresholds: 10
          }
        )
      )
    ]
  });
}

await plot(chart, [data], { 
 outPath: 'chart.png',
 view: true,
 library: 'observablehq/plot' // default
});
```

*Arguments*

* **chart** `{Function}`
  * A function that accepts a dataset and returns a function that renders a chart. **(required)**
* **arguments** `{Function}`
  * An array of arguments that go into your chart function. This will be the data plus any others you may need. **(required)**
* **options** `{Object}`
  * An options object.
* **options.library** `{String|String[]='observablehq/plot'}`
  * Specify what library to load to render the plot. Built-in options are `'observablehq/plot'` and `'plotly'`. Other strings will be interpreted as custom JavaScript to insert. This field can also be an array of strings, if you need to add multiple scripts.
* **options.outPath** `{String='chart.png'}`
  * A filepath to write the image.
* **options.view** `{Boolean=false}`
  * If true, show the chart in a popup window.
* **options.title** `{String='My chart'}`
  * If `view` is true, add a title to the window's page.
* **options.css** `{String}`
  * Any CSS that you want injected into the page to tweak styles.
* **options.debug** `{Boolean = false}`
  * Whether to run the screenshot browser in headfull mode.

**plotHistogram(** `data: Array, { facetBy: String[], fields: String{}, outDir: String[, name: String, fill: String='#000', css: String, view: false] } }` **)**

A more specific function that takes data, a list of fields to facet by and a list of fields to compute values for. Writes a screenshot.

```javascript
import { plotHistogram } from '@mhkeller/plot`;

plotHistogram(data, { 
 facetBy: ['group'], 
 fields: ['value', 'value2'], 
 outDir: 'out_images', 
 name: 'my-charts', 
 fill: 'group', 
 view: true
});
```

*Arguments*

* **data** `{Array}`
  * Your data to render. **(required)**
* **options** `{Object}`
  * An options object.
* **options.facetBy** `{String[]}`
  * An array of field names to facet by. These facets are not combined, it's just a shorthand for running multiple facets at a time, done separately in succession. **(required)**
* **options.fields** `{String[]}`
  * An array of fields to compute histogram values for. **(required)**
* **options.outDir** `{String}`
  * The *directory* – not a specific file name – to write the various files out to. **(required)**
  * Filenames are generated according to the convention: 
    * With a `name` supplied: `${name}_by__${facet}_${field}.png`;
    * With no `name` supplied: `by__${facet}_${field}.png`;
    * If `breakoutFields=false` `_${field}` is a concatenation of all fields separated by a `|` character.
    * If `columns=false`, the file name will end in `_lines.png`.
* **options.fill** `{String}`
  * A hex code or field name. Defaults to `'#000'`.
* **options.view** `{Boolean=false}`
  * If true, show the chart in a popup window.
* **options.title** `{String='My chart'}`
  * If `view` is true, add a title to the window's page.
* **options.css** `{String}`
  * Any CSS that you want injected into the page to tweak styles.
* **options.breakoutFields** `{Boolean=true}`
  * For each field passed into `options.fields` write out a separate PNG. Set this to false to put everything on the same scale.
* **options.columns** `{Boolean=true}`
  * Draw the histogram as columns, like a regular histogram. If this is `false`, just draw semi-opaque lines, which can be useful for seeing density.
* **options.debug** `{Boolean = false}`
  * Whether to run the screenshot browser in headfull mode.

## Examples

See the [test](./test/) folder for more.

## How it works

In short, "plot" takes the code inside of your `chart` function and executes it inside a Chrome window controlled by [playwright](https://github.com/microsoft/playwright/). It's essentially a wrapper around running [`page.evalute`](https://playwright.dev/docs/evaluating) that also injects the required JavaScript libraries needed to render the code. But it's also a bit fancier.

To have better usability, the library renders your chart twice: Once in a hidden browser window to get the screenshot and a second time in a chromeless window for display. The first render is used to measure the dimensions of the generated chart. Those bounds are then passed to the second render so the display can be sized appropriately. Otherwise, you would see a flicker of resizing. (For some reasons, there still is some resizing that occurs, which is being tracked in [this issue](https://github.com/microsoft/playwright/issues/19342).)
