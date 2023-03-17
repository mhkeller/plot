!(function (t, e) {
	'object' == typeof exports && 'undefined' != typeof module
		? e(exports, require('vega-util'))
		: 'function' == typeof define && define.amd
		? define(['exports', 'vega-util'], e)
		: e(((t = 'undefined' != typeof globalThis ? globalThis : t || self).vegaTooltip = {}), t.vega);
})(this, function (t, e) {
	'use strict';
	var n = '0.31.0',
		i = function () {
			return (
				(i =
					Object.assign ||
					function (t) {
						for (var e, n = 1, i = arguments.length; n < i; n++)
							for (var o in (e = arguments[n]))
								Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
						return t;
					}),
				i.apply(this, arguments)
			);
		};
	function o(t, n, i) {
		if (e.isArray(t))
			return '['.concat(
				t
					.map(function (t) {
						return n(e.isString(t) ? t : r(t, i));
					})
					.join(', '),
				']'
			);
		if (e.isObject(t)) {
			var o = '',
				l = t,
				s = l.title,
				a = l.image,
				d = (function (t, e) {
					var n = {};
					for (var i in t)
						Object.prototype.hasOwnProperty.call(t, i) && e.indexOf(i) < 0 && (n[i] = t[i]);
					if (null != t && 'function' == typeof Object.getOwnPropertySymbols) {
						var o = 0;
						for (i = Object.getOwnPropertySymbols(t); o < i.length; o++)
							e.indexOf(i[o]) < 0 &&
								Object.prototype.propertyIsEnumerable.call(t, i[o]) &&
								(n[i[o]] = t[i[o]]);
					}
					return n;
				})(l, ['title', 'image']);
			s && (o += '<h2>'.concat(n(s), '</h2>')), a && (o += '<img src="'.concat(n(a), '">'));
			var p = Object.keys(d);
			if (p.length > 0) {
				o += '<table>';
				for (var c = 0, h = p; c < h.length; c++) {
					var f = h[c],
						u = d[f];
					void 0 !== u &&
						(e.isObject(u) && (u = r(u, i)),
						(o += '<tr><td class="key">'
							.concat(n(f), ':</td><td class="value">')
							.concat(n(u), '</td></tr>')));
				}
				o += '</table>';
			}
			return o || '{}';
		}
		return n(t);
	}
	function l(t) {
		var e = [];
		return function (n, i) {
			if ('object' != typeof i || null === i) return i;
			var o = e.indexOf(this) + 1;
			return (
				(e.length = o),
				e.length > t ? '[Object]' : e.indexOf(i) >= 0 ? '[Circular]' : (e.push(i), i)
			);
		};
	}
	function r(t, e) {
		return JSON.stringify(t, l(e));
	}
	var s =
			'#vg-tooltip-element {\n  visibility: hidden;\n  padding: 8px;\n  position: fixed;\n  z-index: 1000;\n  font-family: sans-serif;\n  font-size: 11px;\n  border-radius: 3px;\n  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);\n  /* The default theme is the light theme. */\n  background-color: rgba(255, 255, 255, 0.95);\n  border: 1px solid #d9d9d9;\n  color: black;\n}\n#vg-tooltip-element.visible {\n  visibility: visible;\n}\n#vg-tooltip-element h2 {\n  margin-top: 0;\n  margin-bottom: 10px;\n  font-size: 13px;\n}\n#vg-tooltip-element table {\n  border-spacing: 0;\n}\n#vg-tooltip-element table tr {\n  border: none;\n}\n#vg-tooltip-element table tr td {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding-top: 2px;\n  padding-bottom: 2px;\n}\n#vg-tooltip-element table tr td.key {\n  color: #808080;\n  max-width: 150px;\n  text-align: right;\n  padding-right: 4px;\n}\n#vg-tooltip-element table tr td.value {\n  display: block;\n  max-width: 300px;\n  max-height: 7em;\n  text-align: left;\n}\n#vg-tooltip-element.dark-theme {\n  background-color: rgba(32, 32, 32, 0.9);\n  border: 1px solid #f5f5f5;\n  color: white;\n}\n#vg-tooltip-element.dark-theme td.key {\n  color: #bfbfbf;\n}\n',
		a = 'vg-tooltip-element',
		d = {
			offsetX: 10,
			offsetY: 10,
			id: a,
			styleId: 'vega-tooltip-style',
			theme: 'light',
			disableDefaultStyle: !1,
			sanitize: p,
			maxDepth: 2,
			formatTooltip: o
		};
	function p(t) {
		return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
	}
	function c(t) {
		if (!/^[A-Za-z]+[-:.\w]*$/.test(t)) throw new Error('Invalid HTML ID');
		return s.toString().replace(a, t);
	}
	function h(t, e, n, i) {
		var o = t.clientX + n;
		o + e.width > window.innerWidth && (o = +t.clientX - n - e.width);
		var l = t.clientY + i;
		return l + e.height > window.innerHeight && (l = +t.clientY - i - e.height), { x: o, y: l };
	}
	var f = (function () {
			function t(t) {
				this.options = i(i({}, d), t);
				var e = this.options.id;
				if (
					((this.el = null),
					(this.call = this.tooltipHandler.bind(this)),
					!this.options.disableDefaultStyle && !document.getElementById(this.options.styleId))
				) {
					var n = document.createElement('style');
					n.setAttribute('id', this.options.styleId), (n.innerHTML = c(e));
					var o = document.head;
					o.childNodes.length > 0 ? o.insertBefore(n, o.childNodes[0]) : o.appendChild(n);
				}
			}
			return (
				(t.prototype.tooltipHandler = function (t, e, n, i) {
					var o;
					((this.el = document.getElementById(this.options.id)), this.el) ||
						((this.el = document.createElement('div')),
						this.el.setAttribute('id', this.options.id),
						this.el.classList.add('vg-tooltip'),
						(null !== (o = document.fullscreenElement) && void 0 !== o
							? o
							: document.body
						).appendChild(this.el));
					if (null != i && '' !== i) {
						(this.el.innerHTML = this.options.formatTooltip(
							i,
							this.options.sanitize,
							this.options.maxDepth
						)),
							this.el.classList.add('visible', ''.concat(this.options.theme, '-theme'));
						var l = h(
								e,
								this.el.getBoundingClientRect(),
								this.options.offsetX,
								this.options.offsetY
							),
							r = l.x,
							s = l.y;
						(this.el.style.top = ''.concat(s, 'px')), (this.el.style.left = ''.concat(r, 'px'));
					} else this.el.classList.remove('visible', ''.concat(this.options.theme, '-theme'));
				}),
				t
			);
		})(),
		u = n;
	(t.DEFAULT_OPTIONS = d),
		(t.Handler = f),
		(t.calculatePosition = h),
		(t.createDefaultStyle = c),
		(t.default = function (t, e) {
			var n = new f(e);
			return t.tooltip(n.call).run(), n;
		}),
		(t.escapeHTML = p),
		(t.formatValue = o),
		(t.replacer = l),
		(t.stringify = r),
		(t.version = u),
		Object.defineProperty(t, '__esModule', { value: !0 });
});
//# sourceMappingURL=vega-tooltip.min.js.map
