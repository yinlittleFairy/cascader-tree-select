import L, { computed as te, ref as A, watch as H, nextTick as ze, defineComponent as we, onUnmounted as Ce } from "vue";
import { Input as ke, Checkbox as Re, Form as Te, FormItem as xe, RadioGroup as Ne, Radio as Ie } from "element-ui";
L.use(ke);
L.use(Re);
L.use(Te);
L.use(xe);
L.use(Ne);
L.use(Ie);
const Oe = (t) => ({
  handleSelectAll: (s, n) => {
    s.forEach((a) => {
      a.onCheckedClick(n);
    });
  },
  handleSelectChange: (s, n) => {
    n.onCheckedClick(s), t && t("clickMenuItem", n);
  }
});
function Ae() {
  var t = window.navigator.userAgent, e = t.indexOf("MSIE ");
  if (e > 0)
    return parseInt(t.substring(e + 5, t.indexOf(".", e)), 10);
  var i = t.indexOf("Trident/");
  if (i > 0) {
    var s = t.indexOf("rv:");
    return parseInt(t.substring(s + 3, t.indexOf(".", s)), 10);
  }
  var n = t.indexOf("Edge/");
  return n > 0 ? parseInt(t.substring(n + 5, t.indexOf(".", n)), 10) : -1;
}
var V = void 0;
function W() {
  W.init || (W.init = !0, V = Ae() !== -1);
}
var q = {
  render: function() {
    var e = this, i = e.$createElement, s = e._self._c || i;
    return s("div", { staticClass: "resize-observer", attrs: { tabindex: "-1" } });
  },
  staticRenderFns: [],
  _scopeId: "data-v-b329ee4c",
  name: "resize-observer",
  methods: {
    compareAndNotify: function() {
      (this._w !== this.$el.offsetWidth || this._h !== this.$el.offsetHeight) && (this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.$emit("notify"));
    },
    addResizeHandlers: function() {
      this._resizeObject.contentDocument.defaultView.addEventListener("resize", this.compareAndNotify), this.compareAndNotify();
    },
    removeResizeHandlers: function() {
      this._resizeObject && this._resizeObject.onload && (!V && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), delete this._resizeObject.onload);
    }
  },
  mounted: function() {
    var e = this;
    W(), this.$nextTick(function() {
      e._w = e.$el.offsetWidth, e._h = e.$el.offsetHeight;
    });
    var i = document.createElement("object");
    this._resizeObject = i, i.setAttribute("aria-hidden", "true"), i.setAttribute("tabindex", -1), i.onload = this.addResizeHandlers, i.type = "text/html", V && this.$el.appendChild(i), i.data = "about:blank", V || this.$el.appendChild(i);
  },
  beforeDestroy: function() {
    this.removeResizeHandlers();
  }
};
function Le(t) {
  t.component("resize-observer", q), t.component("ResizeObserver", q);
}
var Pe = {
  // eslint-disable-next-line no-undef
  version: "0.4.5",
  install: Le
}, M = null;
typeof window < "u" ? M = window.Vue : typeof global < "u" && (M = global.Vue);
M && M.use(Pe);
function D(t) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? D = function(e) {
    return typeof e;
  } : D = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, D(t);
}
function Ve(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function ie(t, e) {
  for (var i = 0; i < e.length; i++) {
    var s = e[i];
    s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s);
  }
}
function De(t, e, i) {
  return e && ie(t.prototype, e), i && ie(t, i), t;
}
function se(t) {
  return Me(t) || Ee(t) || Fe();
}
function Me(t) {
  if (Array.isArray(t)) {
    for (var e = 0, i = new Array(t.length); e < t.length; e++)
      i[e] = t[e];
    return i;
  }
}
function Ee(t) {
  if (Symbol.iterator in Object(t) || Object.prototype.toString.call(t) === "[object Arguments]")
    return Array.from(t);
}
function Fe() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function je(t) {
  var e;
  return typeof t == "function" ? e = {
    callback: t
  } : e = t, e;
}
function Ke(t, e) {
  var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s, n, a, r = function(o) {
    for (var u = arguments.length, d = new Array(u > 1 ? u - 1 : 0), c = 1; c < u; c++)
      d[c - 1] = arguments[c];
    if (a = d, !(s && o === n)) {
      var h = i.leading;
      typeof h == "function" && (h = h(o, n)), (!s || o !== n) && h && t.apply(void 0, [o].concat(se(a))), n = o, clearTimeout(s), s = setTimeout(function() {
        t.apply(void 0, [o].concat(se(a))), s = 0;
      }, e);
    }
  };
  return r._clear = function() {
    clearTimeout(s), s = null;
  }, r;
}
function de(t, e) {
  if (t === e)
    return !0;
  if (D(t) === "object") {
    for (var i in t)
      if (!de(t[i], e[i]))
        return !1;
    return !0;
  }
  return !1;
}
var Ue = /* @__PURE__ */ function() {
  function t(e, i, s) {
    Ve(this, t), this.el = e, this.observer = null, this.frozen = !1, this.createObserver(i, s);
  }
  return De(t, [{
    key: "createObserver",
    value: function(i, s) {
      var n = this;
      if (this.observer && this.destroyObserver(), !this.frozen) {
        if (this.options = je(i), this.callback = function(l, o) {
          n.options.callback(l, o), l && n.options.once && (n.frozen = !0, n.destroyObserver());
        }, this.callback && this.options.throttle) {
          var a = this.options.throttleOptions || {}, r = a.leading;
          this.callback = Ke(this.callback, this.options.throttle, {
            leading: function(o) {
              return r === "both" || r === "visible" && o || r === "hidden" && !o;
            }
          });
        }
        this.oldResult = void 0, this.observer = new IntersectionObserver(function(l) {
          var o = l[0];
          if (l.length > 1) {
            var u = l.find(function(c) {
              return c.isIntersecting;
            });
            u && (o = u);
          }
          if (n.callback) {
            var d = o.isIntersecting && o.intersectionRatio >= n.threshold;
            if (d === n.oldResult)
              return;
            n.oldResult = d, n.callback(d, o);
          }
        }, this.options.intersection), s.context.$nextTick(function() {
          n.observer && n.observer.observe(n.el);
        });
      }
    }
  }, {
    key: "destroyObserver",
    value: function() {
      this.observer && (this.observer.disconnect(), this.observer = null), this.callback && this.callback._clear && (this.callback._clear(), this.callback = null);
    }
  }, {
    key: "threshold",
    get: function() {
      return this.options.intersection && this.options.intersection.threshold || 0;
    }
  }]), t;
}();
function he(t, e, i) {
  var s = e.value;
  if (s)
    if (typeof IntersectionObserver > "u")
      console.warn("[vue-observe-visibility] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/w3c/IntersectionObserver/tree/master/polyfill");
    else {
      var n = new Ue(t, s, i);
      t._vue_visibilityState = n;
    }
}
function Be(t, e, i) {
  var s = e.value, n = e.oldValue;
  if (!de(s, n)) {
    var a = t._vue_visibilityState;
    if (!s) {
      fe(t);
      return;
    }
    a ? a.createObserver(s, i) : he(t, {
      value: s
    }, i);
  }
}
function fe(t) {
  var e = t._vue_visibilityState;
  e && (e.destroyObserver(), delete t._vue_visibilityState);
}
var pe = {
  bind: he,
  update: Be,
  unbind: fe
};
function He(t) {
  t.directive("observe-visibility", pe);
}
var We = {
  // eslint-disable-next-line no-undef
  version: "0.4.6",
  install: He
}, E = null;
typeof window < "u" ? E = window.Vue : typeof global < "u" && (E = global.Vue);
E && E.use(We);
var O = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Y(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var _e = { exports: {} };
(function(t) {
  (function(e, i) {
    t.exports ? t.exports = i() : e.Scrollparent = i();
  })(O, function() {
    function e(s) {
      var n = getComputedStyle(s, null).getPropertyValue("overflow");
      return n.indexOf("scroll") > -1 || n.indexOf("auto") > -1;
    }
    function i(s) {
      if (s instanceof HTMLElement || s instanceof SVGElement) {
        for (var n = s.parentNode; n.parentNode; ) {
          if (e(n))
            return n;
          n = n.parentNode;
        }
        return document.scrollingElement || document.documentElement;
      }
    }
    return i;
  });
})(_e);
var qe = _e.exports;
const ne = /* @__PURE__ */ Y(qe);
var me = {
  itemsLimit: 1e3
};
const ve = {
  items: {
    type: Array,
    required: !0
  },
  keyField: {
    type: String,
    default: "id"
  },
  direction: {
    type: String,
    default: "vertical",
    validator: (t) => ["vertical", "horizontal"].includes(t)
  },
  listTag: {
    type: String,
    default: "div"
  },
  itemTag: {
    type: String,
    default: "div"
  }
};
function ye() {
  return this.items.length && typeof this.items[0] != "object";
}
let G = !1;
if (typeof window < "u") {
  G = !1;
  try {
    var Ge = Object.defineProperty({}, "passive", {
      get() {
        G = !0;
      }
    });
    window.addEventListener("test", null, Ge);
  } catch {
  }
}
let Xe = 0;
var Ye = {
  name: "RecycleScroller",
  components: {
    ResizeObserver: q
  },
  directives: {
    ObserveVisibility: pe
  },
  props: {
    ...ve,
    itemSize: {
      type: Number,
      default: null
    },
    gridItems: {
      type: Number,
      default: void 0
    },
    itemSecondarySize: {
      type: Number,
      default: void 0
    },
    minItemSize: {
      type: [Number, String],
      default: null
    },
    sizeField: {
      type: String,
      default: "size"
    },
    typeField: {
      type: String,
      default: "type"
    },
    buffer: {
      type: Number,
      default: 200
    },
    pageMode: {
      type: Boolean,
      default: !1
    },
    prerender: {
      type: Number,
      default: 0
    },
    emitUpdate: {
      type: Boolean,
      default: !1
    },
    skipHover: {
      type: Boolean,
      default: !1
    },
    listTag: {
      type: String,
      default: "div"
    },
    itemTag: {
      type: String,
      default: "div"
    },
    listClass: {
      type: [String, Object, Array],
      default: ""
    },
    itemClass: {
      type: [String, Object, Array],
      default: ""
    }
  },
  data() {
    return {
      pool: [],
      totalSize: 0,
      ready: !1,
      hoverKey: null
    };
  },
  computed: {
    sizes() {
      if (this.itemSize === null) {
        const t = {
          "-1": {
            accumulator: 0
          }
        }, e = this.items, i = this.sizeField, s = this.minItemSize;
        let n = 1e4, a = 0, r;
        for (let l = 0, o = e.length; l < o; l++)
          r = e[l][i] || s, r < n && (n = r), a += r, t[l] = {
            accumulator: a,
            size: r
          };
        return this.$_computedMinItemSize = n, t;
      }
      return [];
    },
    simpleArray: ye
  },
  watch: {
    items() {
      this.updateVisibleItems(!0);
    },
    pageMode() {
      this.applyPageMode(), this.updateVisibleItems(!1);
    },
    sizes: {
      handler() {
        this.updateVisibleItems(!1);
      },
      deep: !0
    },
    gridItems() {
      this.updateVisibleItems(!0);
    },
    itemSecondarySize() {
      this.updateVisibleItems(!0);
    }
  },
  created() {
    this.$_startIndex = 0, this.$_endIndex = 0, this.$_views = /* @__PURE__ */ new Map(), this.$_unusedViews = /* @__PURE__ */ new Map(), this.$_scrollDirty = !1, this.$_lastUpdateScrollPosition = 0, this.prerender && (this.$_prerender = !0, this.updateVisibleItems(!1)), this.gridItems && !this.itemSize && console.error("[vue-recycle-scroller] You must provide an itemSize when using gridItems");
  },
  mounted() {
    this.applyPageMode(), this.$nextTick(() => {
      this.$_prerender = !1, this.updateVisibleItems(!0), this.ready = !0;
    });
  },
  activated() {
    const t = this.$_lastUpdateScrollPosition;
    typeof t == "number" && this.$nextTick(() => {
      this.scrollToPosition(t);
    });
  },
  beforeDestroy() {
    this.removeListeners();
  },
  methods: {
    addView(t, e, i, s, n) {
      const a = {
        item: i,
        position: 0
      }, r = {
        id: Xe++,
        index: e,
        used: !0,
        key: s,
        type: n
      };
      return Object.defineProperty(a, "nr", {
        configurable: !1,
        value: r
      }), t.push(a), a;
    },
    unuseView(t, e = !1) {
      const i = this.$_unusedViews, s = t.nr.type;
      let n = i.get(s);
      n || (n = [], i.set(s, n)), n.push(t), e || (t.nr.used = !1, t.position = -9999, this.$_views.delete(t.nr.key));
    },
    handleResize() {
      this.$emit("resize"), this.ready && this.updateVisibleItems(!1);
    },
    handleScroll(t) {
      this.$_scrollDirty || (this.$_scrollDirty = !0, requestAnimationFrame(() => {
        this.$_scrollDirty = !1;
        const {
          continuous: e
        } = this.updateVisibleItems(!1, !0);
        e || (clearTimeout(this.$_refreshTimout), this.$_refreshTimout = setTimeout(this.handleScroll, 100));
      }));
    },
    handleVisibilityChange(t, e) {
      this.ready && (t || e.boundingClientRect.width !== 0 || e.boundingClientRect.height !== 0 ? (this.$emit("visible"), requestAnimationFrame(() => {
        this.updateVisibleItems(!1);
      })) : this.$emit("hidden"));
    },
    updateVisibleItems(t, e = !1) {
      const i = this.itemSize, s = this.gridItems || 1, n = this.itemSecondarySize || i, a = this.$_computedMinItemSize, r = this.typeField, l = this.simpleArray ? null : this.keyField, o = this.items, u = o.length, d = this.sizes, c = this.$_views, h = this.$_unusedViews, v = this.pool;
      let f, p, b, S, w;
      if (!u)
        f = p = S = w = b = 0;
      else if (this.$_prerender)
        f = S = 0, p = w = Math.min(this.prerender, o.length), b = null;
      else {
        const m = this.getScroll();
        if (e) {
          let C = m.start - this.$_lastUpdateScrollPosition;
          if (C < 0 && (C = -C), i === null && C < a || C < i)
            return {
              continuous: !0
            };
        }
        this.$_lastUpdateScrollPosition = m.start;
        const $ = this.buffer;
        m.start -= $, m.end += $;
        let I = 0;
        if (this.$refs.before && (I = this.$refs.before.scrollHeight, m.start -= I), this.$refs.after) {
          const C = this.$refs.after.scrollHeight;
          m.end += C;
        }
        if (i === null) {
          let C, Q = 0, Z = u - 1, k = ~~(u / 2), ee;
          do
            ee = k, C = d[k].accumulator, C < m.start ? Q = k : k < u - 1 && d[k + 1].accumulator > m.start && (Z = k), k = ~~((Q + Z) / 2);
          while (k !== ee);
          for (k < 0 && (k = 0), f = k, b = d[u - 1].accumulator, p = k; p < u && d[p].accumulator < m.end; p++)
            ;
          for (p === -1 ? p = o.length - 1 : (p++, p > u && (p = u)), S = f; S < u && I + d[S].accumulator < m.start; S++)
            ;
          for (w = S; w < u && I + d[w].accumulator < m.end; w++)
            ;
        } else {
          f = ~~(m.start / i * s);
          const C = f % s;
          f -= C, p = Math.ceil(m.end / i * s), S = Math.max(0, Math.floor((m.start - I) / i * s)), w = Math.floor((m.end - I) / i * s), f < 0 && (f = 0), p > u && (p = u), S < 0 && (S = 0), w > u && (w = u), b = Math.ceil(u / s) * i;
        }
      }
      p - f > me.itemsLimit && this.itemsLimitError(), this.totalSize = b;
      let _;
      const T = f <= this.$_endIndex && p >= this.$_startIndex;
      if (this.$_continuous !== T) {
        if (T) {
          c.clear(), h.clear();
          for (let m = 0, $ = v.length; m < $; m++)
            _ = v[m], this.unuseView(_);
        }
        this.$_continuous = T;
      } else if (T)
        for (let m = 0, $ = v.length; m < $; m++)
          _ = v[m], _.nr.used && (t && (_.nr.index = o.indexOf(_.item)), (_.nr.index === -1 || _.nr.index < f || _.nr.index >= p) && this.unuseView(_));
      const N = T ? null : /* @__PURE__ */ new Map();
      let y, g, z, x;
      for (let m = f; m < p; m++) {
        y = o[m];
        const $ = l ? y[l] : y;
        if ($ == null)
          throw new Error(`Key is ${$} on item (keyField is '${l}')`);
        if (_ = c.get($), !i && !d[m].size) {
          _ && this.unuseView(_);
          continue;
        }
        _ ? (_.nr.used = !0, _.item = y) : (m === o.length - 1 && this.$emit("scroll-end"), m === 0 && this.$emit("scroll-start"), g = y[r], z = h.get(g), T ? z && z.length ? (_ = z.pop(), _.item = y, _.nr.used = !0, _.nr.index = m, _.nr.key = $, _.nr.type = g) : _ = this.addView(v, m, y, $, g) : (x = N.get(g) || 0, (!z || x >= z.length) && (_ = this.addView(v, m, y, $, g), this.unuseView(_, !0), z = h.get(g)), _ = z[x], _.item = y, _.nr.used = !0, _.nr.index = m, _.nr.key = $, _.nr.type = g, N.set(g, x + 1), x++), c.set($, _)), i === null ? (_.position = d[m - 1].accumulator, _.offset = 0) : (_.position = Math.floor(m / s) * i, _.offset = m % s * n);
      }
      return this.$_startIndex = f, this.$_endIndex = p, this.emitUpdate && this.$emit("update", f, p, S, w), clearTimeout(this.$_sortTimer), this.$_sortTimer = setTimeout(this.sortViews, 300), {
        continuous: T
      };
    },
    getListenerTarget() {
      let t = ne(this.$el);
      return window.document && (t === window.document.documentElement || t === window.document.body) && (t = window), t;
    },
    getScroll() {
      const {
        $el: t,
        direction: e
      } = this, i = e === "vertical";
      let s;
      if (this.pageMode) {
        const n = t.getBoundingClientRect(), a = i ? n.height : n.width;
        let r = -(i ? n.top : n.left), l = i ? window.innerHeight : window.innerWidth;
        r < 0 && (l += r, r = 0), r + l > a && (l = a - r), s = {
          start: r,
          end: r + l
        };
      } else
        i ? s = {
          start: t.scrollTop,
          end: t.scrollTop + t.clientHeight
        } : s = {
          start: t.scrollLeft,
          end: t.scrollLeft + t.clientWidth
        };
      return s;
    },
    applyPageMode() {
      this.pageMode ? this.addListeners() : this.removeListeners();
    },
    addListeners() {
      this.listenerTarget = this.getListenerTarget(), this.listenerTarget.addEventListener("scroll", this.handleScroll, G ? {
        passive: !0
      } : !1), this.listenerTarget.addEventListener("resize", this.handleResize);
    },
    removeListeners() {
      this.listenerTarget && (this.listenerTarget.removeEventListener("scroll", this.handleScroll), this.listenerTarget.removeEventListener("resize", this.handleResize), this.listenerTarget = null);
    },
    scrollToItem(t) {
      let e;
      this.itemSize === null ? e = t > 0 ? this.sizes[t - 1].accumulator : 0 : e = Math.floor(t / this.gridItems) * this.itemSize, this.scrollToPosition(e);
    },
    scrollToPosition(t) {
      const e = this.direction === "vertical" ? {
        scroll: "scrollTop",
        start: "top"
      } : {
        scroll: "scrollLeft",
        start: "left"
      };
      let i, s, n;
      if (this.pageMode) {
        const a = ne(this.$el), r = a.tagName === "HTML" ? 0 : a[e.scroll], l = a.getBoundingClientRect(), u = this.$el.getBoundingClientRect()[e.start] - l[e.start];
        i = a, s = e.scroll, n = t + r + u;
      } else
        i = this.$el, s = e.scroll, n = t;
      i[s] = n;
    },
    itemsLimitError() {
      throw setTimeout(() => {
        console.log("It seems the scroller element isn't scrolling, so it tries to render all the items at once.", "Scroller:", this.$el), console.log("Make sure the scroller has a fixed height (or width) and 'overflow-y' (or 'overflow-x') set to 'auto' so it can scroll correctly and only render the items visible in the scroll viewport.");
      }), new Error("Rendered items limit reached");
    },
    sortViews() {
      this.pool.sort((t, e) => t.nr.index - e.nr.index);
    }
  }
};
function J(t, e, i, s, n, a, r, l, o, u) {
  typeof r != "boolean" && (o = l, l = r, r = !1);
  const d = typeof i == "function" ? i.options : i;
  t && t.render && (d.render = t.render, d.staticRenderFns = t.staticRenderFns, d._compiled = !0, n && (d.functional = !0)), s && (d._scopeId = s);
  let c;
  if (a ? (c = function(h) {
    h = h || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !h && typeof __VUE_SSR_CONTEXT__ < "u" && (h = __VUE_SSR_CONTEXT__), e && e.call(this, o(h)), h && h._registeredComponents && h._registeredComponents.add(a);
  }, d._ssrRegister = c) : e && (c = r ? function(h) {
    e.call(this, u(h, this.$root.$options.shadowRoot));
  } : function(h) {
    e.call(this, l(h));
  }), c)
    if (d.functional) {
      const h = d.render;
      d.render = function(f, p) {
        return c.call(p), h(f, p);
      };
    } else {
      const h = d.beforeCreate;
      d.beforeCreate = h ? [].concat(h, c) : [c];
    }
  return i;
}
const Je = Ye;
var ge = function() {
  var t, e, i = this, s = i.$createElement, n = i._self._c || s;
  return n(
    "div",
    {
      directives: [
        {
          name: "observe-visibility",
          rawName: "v-observe-visibility",
          value: i.handleVisibilityChange,
          expression: "handleVisibilityChange"
        }
      ],
      staticClass: "vue-recycle-scroller",
      class: (t = {
        ready: i.ready,
        "page-mode": i.pageMode
      }, t["direction-" + i.direction] = !0, t),
      on: {
        "&scroll": function(a) {
          return i.handleScroll.apply(null, arguments);
        }
      }
    },
    [
      i.$slots.before ? n(
        "div",
        { ref: "before", staticClass: "vue-recycle-scroller__slot" },
        [i._t("before")],
        2
      ) : i._e(),
      i._v(" "),
      n(
        i.listTag,
        {
          ref: "wrapper",
          tag: "component",
          staticClass: "vue-recycle-scroller__item-wrapper",
          class: i.listClass,
          style: (e = {}, e[i.direction === "vertical" ? "minHeight" : "minWidth"] = i.totalSize + "px", e)
        },
        [
          i._l(i.pool, function(a) {
            return n(
              i.itemTag,
              i._g(
                {
                  key: a.nr.id,
                  tag: "component",
                  staticClass: "vue-recycle-scroller__item-view",
                  class: [
                    i.itemClass,
                    {
                      hover: !i.skipHover && i.hoverKey === a.nr.key
                    }
                  ],
                  style: i.ready ? {
                    transform: "translate" + (i.direction === "vertical" ? "Y" : "X") + "(" + a.position + "px) translate" + (i.direction === "vertical" ? "X" : "Y") + "(" + a.offset + "px)",
                    width: i.gridItems ? (i.direction === "vertical" && i.itemSecondarySize || i.itemSize) + "px" : void 0,
                    height: i.gridItems ? (i.direction === "horizontal" && i.itemSecondarySize || i.itemSize) + "px" : void 0
                  } : null
                },
                i.skipHover ? {} : {
                  mouseenter: function() {
                    i.hoverKey = a.nr.key;
                  },
                  mouseleave: function() {
                    i.hoverKey = null;
                  }
                }
              ),
              [
                i._t("default", null, {
                  item: a.item,
                  index: a.nr.index,
                  active: a.nr.used
                })
              ],
              2
            );
          }),
          i._v(" "),
          i._t("empty")
        ],
        2
      ),
      i._v(" "),
      i.$slots.after ? n(
        "div",
        { ref: "after", staticClass: "vue-recycle-scroller__slot" },
        [i._t("after")],
        2
      ) : i._e(),
      i._v(" "),
      n("ResizeObserver", { on: { notify: i.handleResize } })
    ],
    1
  );
}, Qe = [];
ge._withStripped = !0;
const Ze = void 0, et = void 0, tt = void 0, it = !1, F = /* @__PURE__ */ J(
  { render: ge, staticRenderFns: Qe },
  Ze,
  Je,
  et,
  it,
  tt,
  !1,
  void 0,
  void 0,
  void 0
);
var st = {
  name: "DynamicScroller",
  components: {
    RecycleScroller: F
  },
  provide() {
    return typeof ResizeObserver < "u" && (this.$_resizeObserver = new ResizeObserver((t) => {
      requestAnimationFrame(() => {
        if (Array.isArray(t)) {
          for (const e of t)
            if (e.target) {
              const i = new CustomEvent("resize", {
                detail: {
                  contentRect: e.contentRect
                }
              });
              e.target.dispatchEvent(i);
            }
        }
      });
    })), {
      vscrollData: this.vscrollData,
      vscrollParent: this,
      vscrollResizeObserver: this.$_resizeObserver
    };
  },
  inheritAttrs: !1,
  props: {
    ...ve,
    minItemSize: {
      type: [Number, String],
      required: !0
    }
  },
  data() {
    return {
      vscrollData: {
        active: !0,
        sizes: {},
        validSizes: {},
        keyField: this.keyField,
        simpleArray: !1
      }
    };
  },
  computed: {
    simpleArray: ye,
    itemsWithSize() {
      const t = [], {
        items: e,
        keyField: i,
        simpleArray: s
      } = this, n = this.vscrollData.sizes, a = e.length;
      for (let r = 0; r < a; r++) {
        const l = e[r], o = s ? r : l[i];
        let u = n[o];
        typeof u > "u" && !this.$_undefinedMap[o] && (u = 0), t.push({
          item: l,
          id: o,
          size: u
        });
      }
      return t;
    },
    listeners() {
      const t = {};
      for (const e in this.$listeners)
        e !== "resize" && e !== "visible" && (t[e] = this.$listeners[e]);
      return t;
    }
  },
  watch: {
    items() {
      this.forceUpdate(!1);
    },
    simpleArray: {
      handler(t) {
        this.vscrollData.simpleArray = t;
      },
      immediate: !0
    },
    direction(t) {
      this.forceUpdate(!0);
    },
    itemsWithSize(t, e) {
      const i = this.$el.scrollTop;
      let s = 0, n = 0;
      const a = Math.min(t.length, e.length);
      for (let l = 0; l < a && !(s >= i); l++)
        s += e[l].size || this.minItemSize, n += t[l].size || this.minItemSize;
      const r = n - s;
      r !== 0 && (this.$el.scrollTop += r);
    }
  },
  beforeCreate() {
    this.$_updates = [], this.$_undefinedSizes = 0, this.$_undefinedMap = {};
  },
  activated() {
    this.vscrollData.active = !0;
  },
  deactivated() {
    this.vscrollData.active = !1;
  },
  methods: {
    onScrollerResize() {
      this.$refs.scroller && this.forceUpdate(), this.$emit("resize");
    },
    onScrollerVisible() {
      this.$emit("vscroll:update", {
        force: !1
      }), this.$emit("visible");
    },
    forceUpdate(t = !0) {
      (t || this.simpleArray) && (this.vscrollData.validSizes = {}), this.$emit("vscroll:update", {
        force: !0
      });
    },
    scrollToItem(t) {
      const e = this.$refs.scroller;
      e && e.scrollToItem(t);
    },
    getItemSize(t, e = void 0) {
      const i = this.simpleArray ? e ?? this.items.indexOf(t) : t[this.keyField];
      return this.vscrollData.sizes[i] || 0;
    },
    scrollToBottom() {
      if (this.$_scrollingToBottom)
        return;
      this.$_scrollingToBottom = !0;
      const t = this.$el;
      this.$nextTick(() => {
        t.scrollTop = t.scrollHeight + 5e3;
        const e = () => {
          t.scrollTop = t.scrollHeight + 5e3, requestAnimationFrame(() => {
            t.scrollTop = t.scrollHeight + 5e3, this.$_undefinedSizes === 0 ? this.$_scrollingToBottom = !1 : requestAnimationFrame(e);
          });
        };
        requestAnimationFrame(e);
      });
    }
  }
};
const nt = st;
var be = function() {
  var t = this, e = t.$createElement, i = t._self._c || e;
  return i(
    "RecycleScroller",
    t._g(
      t._b(
        {
          ref: "scroller",
          attrs: {
            items: t.itemsWithSize,
            "min-item-size": t.minItemSize,
            direction: t.direction,
            "key-field": "id",
            "list-tag": t.listTag,
            "item-tag": t.itemTag
          },
          on: { resize: t.onScrollerResize, visible: t.onScrollerVisible },
          scopedSlots: t._u(
            [
              {
                key: "default",
                fn: function(s) {
                  var n = s.item, a = s.index, r = s.active;
                  return [
                    t._t("default", null, null, {
                      item: n.item,
                      index: a,
                      active: r,
                      itemWithSize: n
                    })
                  ];
                }
              }
            ],
            null,
            !0
          )
        },
        "RecycleScroller",
        t.$attrs,
        !1
      ),
      t.listeners
    ),
    [
      t._v(" "),
      i("template", { slot: "before" }, [t._t("before")], 2),
      t._v(" "),
      i("template", { slot: "after" }, [t._t("after")], 2),
      t._v(" "),
      i("template", { slot: "empty" }, [t._t("empty")], 2)
    ],
    2
  );
}, rt = [];
be._withStripped = !0;
const lt = void 0, ot = void 0, at = void 0, ct = !1, re = /* @__PURE__ */ J(
  { render: be, staticRenderFns: rt },
  lt,
  nt,
  ot,
  ct,
  at,
  !1,
  void 0,
  void 0,
  void 0
);
var ut = {
  name: "DynamicScrollerItem",
  inject: ["vscrollData", "vscrollParent", "vscrollResizeObserver"],
  props: {
    // eslint-disable-next-line vue/require-prop-types
    item: {
      required: !0
    },
    watchData: {
      type: Boolean,
      default: !1
    },
    /**
     * Indicates if the view is actively used to display an item.
     */
    active: {
      type: Boolean,
      required: !0
    },
    index: {
      type: Number,
      default: void 0
    },
    sizeDependencies: {
      type: [Array, Object],
      default: null
    },
    emitResize: {
      type: Boolean,
      default: !1
    },
    tag: {
      type: String,
      default: "div"
    }
  },
  computed: {
    id() {
      if (this.vscrollData.simpleArray)
        return this.index;
      if (this.item.hasOwnProperty(this.vscrollData.keyField))
        return this.item[this.vscrollData.keyField];
      throw new Error(`keyField '${this.vscrollData.keyField}' not found in your item. You should set a valid keyField prop on your Scroller`);
    },
    size() {
      return this.vscrollData.validSizes[this.id] && this.vscrollData.sizes[this.id] || 0;
    },
    finalActive() {
      return this.active && this.vscrollData.active;
    }
  },
  watch: {
    watchData: "updateWatchData",
    id() {
      this.size || this.onDataUpdate();
    },
    finalActive(t) {
      this.size || (t ? this.vscrollParent.$_undefinedMap[this.id] || (this.vscrollParent.$_undefinedSizes++, this.vscrollParent.$_undefinedMap[this.id] = !0) : this.vscrollParent.$_undefinedMap[this.id] && (this.vscrollParent.$_undefinedSizes--, this.vscrollParent.$_undefinedMap[this.id] = !1)), this.vscrollResizeObserver ? t ? this.observeSize() : this.unobserveSize() : t && this.$_pendingVScrollUpdate === this.id && this.updateSize();
    }
  },
  created() {
    if (!this.$isServer && (this.$_forceNextVScrollUpdate = null, this.updateWatchData(), !this.vscrollResizeObserver)) {
      for (const t in this.sizeDependencies)
        this.$watch(() => this.sizeDependencies[t], this.onDataUpdate);
      this.vscrollParent.$on("vscroll:update", this.onVscrollUpdate), this.vscrollParent.$on("vscroll:update-size", this.onVscrollUpdateSize);
    }
  },
  mounted() {
    this.vscrollData.active && (this.updateSize(), this.observeSize());
  },
  beforeDestroy() {
    this.vscrollParent.$off("vscroll:update", this.onVscrollUpdate), this.vscrollParent.$off("vscroll:update-size", this.onVscrollUpdateSize), this.unobserveSize();
  },
  methods: {
    updateSize() {
      this.finalActive ? this.$_pendingSizeUpdate !== this.id && (this.$_pendingSizeUpdate = this.id, this.$_forceNextVScrollUpdate = null, this.$_pendingVScrollUpdate = null, this.computeSize(this.id)) : this.$_forceNextVScrollUpdate = this.id;
    },
    updateWatchData() {
      this.watchData && !this.vscrollResizeObserver ? this.$_watchData = this.$watch("item", () => {
        this.onDataUpdate();
      }, {
        deep: !0
      }) : this.$_watchData && (this.$_watchData(), this.$_watchData = null);
    },
    onVscrollUpdate({
      force: t
    }) {
      !this.finalActive && t && (this.$_pendingVScrollUpdate = this.id), (this.$_forceNextVScrollUpdate === this.id || t || !this.size) && this.updateSize();
    },
    onDataUpdate() {
      this.updateSize();
    },
    computeSize(t) {
      this.$nextTick(() => {
        if (this.id === t) {
          const e = this.$el.offsetWidth, i = this.$el.offsetHeight;
          this.applySize(e, i);
        }
        this.$_pendingSizeUpdate = null;
      });
    },
    applySize(t, e) {
      const i = ~~(this.vscrollParent.direction === "vertical" ? e : t);
      i && this.size !== i && (this.vscrollParent.$_undefinedMap[this.id] && (this.vscrollParent.$_undefinedSizes--, this.vscrollParent.$_undefinedMap[this.id] = void 0), this.$set(this.vscrollData.sizes, this.id, i), this.$set(this.vscrollData.validSizes, this.id, !0), this.emitResize && this.$emit("resize", this.id));
    },
    observeSize() {
      !this.vscrollResizeObserver || !this.$el.parentNode || (this.vscrollResizeObserver.observe(this.$el.parentNode), this.$el.parentNode.addEventListener("resize", this.onResize));
    },
    unobserveSize() {
      this.vscrollResizeObserver && (this.vscrollResizeObserver.unobserve(this.$el.parentNode), this.$el.parentNode.removeEventListener("resize", this.onResize));
    },
    onResize(t) {
      const {
        width: e,
        height: i
      } = t.detail.contentRect;
      this.applySize(e, i);
    }
  },
  render(t) {
    return t(this.tag, this.$slots.default);
  }
};
const dt = ut, ht = void 0, ft = void 0, pt = void 0, _t = void 0, le = /* @__PURE__ */ J(
  {},
  ht,
  dt,
  ft,
  _t,
  pt,
  !1,
  void 0,
  void 0,
  void 0
);
function mt(t, e) {
  t.component(`${e}recycle-scroller`, F), t.component(`${e}RecycleScroller`, F), t.component(`${e}dynamic-scroller`, re), t.component(`${e}DynamicScroller`, re), t.component(`${e}dynamic-scroller-item`, le), t.component(`${e}DynamicScrollerItem`, le);
}
const vt = {
  // eslint-disable-next-line no-undef
  version: "1.1.2",
  install(t, e) {
    const i = Object.assign({}, {
      installComponents: !0,
      componentsPrefix: ""
    }, e);
    for (const s in i)
      typeof i[s] < "u" && (me[s] = i[s]);
    i.installComponents && mt(t, i.componentsPrefix);
  }
};
let j = null;
typeof window < "u" ? j = window.Vue : typeof global < "u" && (j = global.Vue);
j && j.use(vt);
function K(t, e, i, s, n, a, r, l) {
  var o = typeof t == "function" ? t.options : t;
  e && (o.render = e, o.staticRenderFns = i, o._compiled = !0), s && (o.functional = !0), a && (o._scopeId = "data-v-" + a);
  var u;
  if (r ? (u = function(h) {
    h = h || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !h && typeof __VUE_SSR_CONTEXT__ < "u" && (h = __VUE_SSR_CONTEXT__), n && n.call(this, h), h && h._registeredComponents && h._registeredComponents.add(r);
  }, o._ssrRegister = u) : n && (u = l ? function() {
    n.call(
      this,
      (o.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : n), u)
    if (o.functional) {
      o._injectStyles = u;
      var d = o.render;
      o.render = function(v, f) {
        return u.call(f), d(v, f);
      };
    } else {
      var c = o.beforeCreate;
      o.beforeCreate = c ? [].concat(c, u) : [u];
    }
  return {
    exports: t,
    options: o
  };
}
const yt = {
  __name: "cascader-panel",
  props: {
    isResultPanel: {
      type: Boolean,
      default: !1
    },
    showResultSearch: {
      type: Boolean,
      default: !0
    },
    showResultCount: {
      // 展示已选数量
      type: Boolean,
      default: !0
    },
    curPanelLevel: {
      type: Number,
      default: 0
    },
    cascaderMaxLevel: {
      type: Number,
      default: 2
    },
    panelMenuTitle: {
      // 当前面板标题
      type: String,
      default: ""
    },
    emptyText: {
      // 当前面板无数据时展示的文本
      type: String,
      default: "暂无数据"
    },
    panelOptions: {
      // 当前面板展示的条目
      type: Array,
      default: () => []
    },
    multiple: {
      // 当前面板是否支持多选
      type: Boolean,
      default: !0
    },
    supportSelectAll: {
      // 当前面板是否支持全选
      type: Boolean,
      default: !0
    },
    panelActiveList: {
      type: Array,
      default: () => []
    },
    globalSearchWord: {
      type: String,
      default: ""
    }
  },
  emits: ["clickMenuItem", "removeSelectedCate"],
  setup(t, { emit: e }) {
    const i = t, s = te(() => {
      var c;
      const u = a.value.length, d = (c = a.value.filter((h) => h.checked)) == null ? void 0 : c.length;
      return {
        indeterminate: !!d && d !== u,
        checked: !!d && d === u
      };
    }), n = A(""), a = te(() => {
      var u;
      return (u = i.panelOptions) == null ? void 0 : u.filter((d) => !n.value || d.label.includes(n.value));
    }), { handleSelectAll: r, handleSelectChange: l } = Oe(e);
    return { __sfc: !0, emit: e, props: i, panelStatus: s, resultSearchKey: n, panelShowOptions: a, handleSelectAll: r, handleSelectChange: l, highLightLabel: (u) => {
      let d = i.isResultPanel ? n.value : i.globalSearchWord;
      return d ? u.split(d).join(`<span style="color: #266BF6">${d}</span>`) : u;
    }, RecycleScroller: F };
  }
};
var gt = function() {
  var e = this, i = e._self._c, s = e._self._setupProxy;
  return i("div", { staticClass: "cascader-panel", style: { width: `calc(100% / ${s.props.cascaderMaxLevel})` } }, [i("div", { staticClass: "cascader-panel__head" }, [e.supportSelectAll ? i("div", [i("el-checkbox", { attrs: { value: s.panelStatus.checked, indeterminate: s.panelStatus.indeterminate, disabled: !s.panelShowOptions.length }, on: { change: (n) => s.handleSelectAll(s.props.panelOptions, n) } }), e._v(" 全选 ")], 1) : e._e(), e.panelMenuTitle ? i("label", [e._v(e._s(s.props.panelMenuTitle))]) : e._e(), e.isResultPanel && e.showResultSearch ? i("el-input", { staticStyle: { width: "160px" }, attrs: { placeholder: "请输入", size: "small", clearable: "", "suffix-icon": "el-icon-search" }, model: { value: s.resultSearchKey, callback: function(n) {
    s.resultSearchKey = typeof n == "string" ? n.trim() : n;
  }, expression: "resultSearchKey" } }) : e._e()], 1), i("div", { staticClass: "cascader-panel__menu" }, [e.isResultPanel && e.showResultCount ? i("div", { staticClass: "cascader-panel__menu__operate" }, [i("span", [e._v("已添加(" + e._s(e.panelOptions.length) + "条)")]), i("span", { staticClass: "remove-button", class: { "remove-button__disabled": !s.panelStatus.checked && !s.panelStatus.indeterminate }, on: { click: function(n) {
    return s.emit("removeSelectedCate");
  } } }, [e._v("移除")])]) : e._e(), s.panelShowOptions.length ? i("div", [i(s.RecycleScroller, { style: { height: e.isResultPanel && e.showResultSearch ? "296px" : "325px" }, attrs: { items: s.panelShowOptions, "item-size": 32, "key-field": "value", buffer: 100 }, scopedSlots: e._u([{ key: "default", fn: function({ item: n, index: a }) {
    return [i("div", { staticClass: "cascader-panel__menu__item" }, [i("el-checkbox", { attrs: { value: n.checked, indeterminate: n.indeterminate, disabled: n.disabled }, on: { change: (r) => s.handleSelectChange(r, n) } }), i("div", { staticClass: "menu-item", class: { "menu-item__danger": n.colorDangerField, "menu-item__active": e.panelActiveList[s.props.curPanelLevel] && n.value === e.panelActiveList[s.props.curPanelLevel].value }, attrs: { title: n.label }, domProps: { innerHTML: e._s(s.highLightLabel(n.label)) }, on: { click: function(r) {
      return s.emit("clickMenuItem", n);
    } } })], 1)];
  } }], null, !1, 2663359417) })], 1) : i("div", { staticClass: "cascader-panel__menu__empty" }, [e._v(e._s(s.props.emptyText))])])]);
}, bt = [], St = /* @__PURE__ */ K(
  yt,
  gt,
  bt,
  !1,
  null,
  null,
  null,
  null
);
const Se = St.exports;
const $t = {
  __name: "cascader-select",
  props: {
    options: {
      type: Array,
      default: () => []
    },
    cascaderMaxLevel: {
      type: Number,
      default: 3
    },
    globalSearchWord: {
      type: String,
      default: ""
    },
    panelTitleList: {
      type: Array,
      default: () => []
    }
  },
  setup(t, { expose: e }) {
    const i = t, s = A([]), n = (r) => {
      var o, u, d;
      if (r === 0)
        return (o = i.options) == null ? void 0 : o.filter((c) => c.menuNodeShow);
      let l = (u = s.value) == null ? void 0 : u[r - 1];
      return ((d = l == null ? void 0 : l.children) == null ? void 0 : d.filter((c) => c.menuNodeShow)) || [];
    }, a = (r) => {
      var d;
      const l = (r == null ? void 0 : r.level) || 0, o = (d = s.value) == null ? void 0 : d.slice(0, l);
      o.push(r);
      let u = r;
      for (; u && u.children; ) {
        const c = u == null ? void 0 : u.getVisibleChild();
        u = (c == null ? void 0 : c.find((h) => h.checked || h.indeterminate)) || (c == null ? void 0 : c[0]), o.push(u);
      }
      s.value = o;
    };
    return H(() => i.options, (r) => {
      (!Array.isArray(r) || !r.length) && (s.value = []);
      let l = r == null ? void 0 : r.find((o) => o.checked || o.indeterminate);
      a(l || (r == null ? void 0 : r[0]));
    }), e({ convertActive: a }), { __sfc: !0, props: i, panelActiveNode: s, getPanelOptions: n, convertActive: a, CascaderPanel: Se };
  }
};
var zt = function() {
  var e = this, i = e._self._c, s = e._self._setupProxy;
  return i("div", { staticClass: "cascader-select" }, e._l(s.props.cascaderMaxLevel + 1, function(n) {
    return i(s.CascaderPanel, e._b({ key: n, attrs: { "cur-panel-level": n - 1, "cascader-max-level": s.props.cascaderMaxLevel, "panel-options": s.getPanelOptions(n - 1), "panel-menu-title": e.panelTitleList[n - 1], "panel-active-list": s.panelActiveNode, "global-search-word": e.globalSearchWord }, on: { clickMenuItem: s.convertActive } }, "cascader-panel", e.$attrs, !1));
  }), 1);
}, wt = [], Ct = /* @__PURE__ */ K(
  $t,
  zt,
  wt,
  !1,
  null,
  "e802f39c",
  null,
  null
);
const kt = Ct.exports;
const Rt = {
  __name: "cascader-result",
  props: {
    resultOptions: {
      type: Array,
      default: () => []
    },
    showResultSearch: {
      type: Boolean,
      default: !0
    },
    showResultCount: {
      type: Boolean,
      default: !0
    }
  },
  setup(t) {
    return { __sfc: !0, props: t, CascaderPanel: Se };
  }
};
var Tt = function() {
  var e = this, i = e._self._c, s = e._self._setupProxy;
  return i("div", { staticClass: "cascader-result" }, [i(s.CascaderPanel, e._g({ attrs: { "is-result-panel": "", cascaderMaxLevel: 1, "show-result-search": s.props.showResultSearch, "show-rsult-count": s.props.showResultCount, "panel-options": s.props.resultOptions, "cur-panel-level": 0 } }, e.$listeners))], 1);
}, xt = [], Nt = /* @__PURE__ */ K(
  Rt,
  Tt,
  xt,
  !1,
  null,
  "b2705c62",
  null,
  null
);
const It = Nt.exports;
var $e = { exports: {} };
(function(t) {
  (function(e, i) {
    if (t.exports)
      t.exports = i();
    else {
      var s = e.shortid, n = i();
      n.noConflict = function() {
        return e.shortid = s, n;
      }, e.shortid = n;
    }
  })(O, function() {
    var e = 14603328e5, i = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ], s = 62, n = function(r, l) {
      return (r + l).slice(-r.length);
    }, a = function(r) {
      this._opt = r || {};
    };
    return a.prototype = {
      _toBase: function(r, l) {
        var o = this._opt, u = o.symbols || i, d = "";
        if (l > u.length || l <= 1)
          return !1;
        for (; r >= 1; )
          d = u[r - l * Math.floor(r / l)] + d, r = Math.floor(r / l);
        return l < 11 ? parseInt(d) : d;
      },
      _salts: function() {
        for (var r = this, l = r._opt, o = l.salts || 2, u = "", d = 0; d < o; d++) {
          var c = Math.floor(Math.random() * 3844);
          u += n("00", r._toBase(c, s));
        }
        return u;
      },
      gen: function() {
        var r = this, l = r._opt, o = l.interval || 1, u = l.initTime || e, d = o > 0 ? Math.floor(((/* @__PURE__ */ new Date()).getTime() - u) / o) : 0, c = r._salts();
        return d === 0 ? c : r._toBase(d, s) + c;
      }
    }, {
      inst: function(r) {
        return new a(r);
      },
      gen: function(r) {
        return new a(r).gen();
      },
      uuid: function() {
        return new a({ salts: 4 }).gen();
      }
    };
  });
})($e);
var Ot = $e.exports;
const At = /* @__PURE__ */ Y(Ot), R = ",";
class Lt {
  constructor({
    data: e = {},
    level: i = 0,
    leaf: s = !1,
    parent: n = null,
    children: a = [],
    store: r,
    indeterminate: l,
    checked: o
  }) {
    this.uid = At.gen(), this.value = e.value, this.label = e.label, this.level = i, this.leaf = s, this.parent = n, this.children = a, this.disabled = !!e.disabled, this.path = e.path || this.formatPath(), this.pathName = e.pathName || this.formatLabel(), this.store = r, this.leafNodesNum = 0, this.checked = o, this.indeterminate = l, this.colorDangerField = e.colorDangerField, this.menuNodeShow = !0;
  }
  formatKeyFromParent(e) {
    const i = [this == null ? void 0 : this[e]];
    let s = this.parent;
    for (; s; )
      i.unshift(s == null ? void 0 : s[e]), s = s == null ? void 0 : s.parent;
    return i;
  }
  formatPath() {
    return this.formatKeyFromParent("value");
  }
  formatLabel() {
    return this.formatKeyFromParent("label");
  }
  getVisibleChild() {
    return (this.children || []).filter((i) => i.menuNodeShow);
  }
  changeCheckVal(e) {
    this.checked = e, this.indeterminate = !1;
  }
  changeCompStatus(e) {
    e && (e === "checked" ? (this.checked = !0, this.indeterminate = !1) : e === "indeterminate" ? (this.checked = !1, this.indeterminate = !0) : e === "empty" && (this.checked = !1, this.indeterminate = !1));
  }
  changeChildrenVal(e) {
    this.children = Array.isArray(e) ? e : null;
  }
  changeNodeShow(e) {
    this.menuNodeShow = e;
  }
  changeShowStatus(e, i = !1) {
    const s = (r) => r ? r.label.includes(e) ? !0 : !!s(r.parent) : !1, n = (r) => {
      if (!e)
        return !0;
      if (!r || !(r != null && r.label))
        return !1;
      if (r.label.includes(e))
        return !0;
      if (i)
        return !!s(r.parent);
    }, a = (r) => {
      if (!r)
        return 0;
      if (r.leaf) {
        const l = n(r);
        return this.changeNodeShow(l), l ? 1 : 0;
      }
      if (r.children && r.children.length) {
        let l = 0;
        return r.children.forEach((o) => {
          l += a(o);
        }), this.changeNodeShow(!!l), l;
      }
    };
    a(this);
  }
  onCheckedClick(e) {
    var i;
    this.changeCheckVal(e), this.changeChildStatus(e), this.changeParentStatus(e), typeof ((i = this.store) == null ? void 0 : i.onNodeChange) == "function" && this.store.onNodeChange(this);
  }
  changeChildStatus(e) {
    if (!this.leaf)
      for (let i of this.getVisibleChild())
        i == null || i.changeCheckVal(e), i == null || i.changeChildStatus(e);
  }
  findSiblings() {
    if (!this.parent)
      return [];
    const e = this.parent.children;
    return Array.isArray(e) ? e : [];
  }
  findLeafs(e = !1) {
    const i = [], s = (n) => {
      n && (n.leaf && (!e || n.menuNodeShow) && i.push(n), n != null && n.children && (n != null && n.children.length) && n.children.forEach((a) => s(a)));
    };
    return s(this), i;
  }
  changeParentStatus() {
    var a, r;
    if (!this.parent)
      return;
    const e = ((a = this.findSiblings()) == null ? void 0 : a.filter((l) => l.menuNodeShow)) || [], i = (r = e.filter((l) => l.checked)) == null ? void 0 : r.length, s = e.some((l) => l.indeterminate), n = i ? i === e.length ? "checked" : "indeterminate" : s ? "indeterminate" : "empty";
    this.parent.changeCompStatus(n), this.parent.changeParentStatus();
  }
}
const P = {
  resultChange: "resultChange",
  checkedNode: "checkedNode"
};
class oe {
  constructor(e = [], i = [], s = 2) {
    this.nodesTree = [], this.result = /* @__PURE__ */ new Map(), this.callbacks = {}, this.initLists(e, i, s);
  }
  onNodeChange(e) {
    e.checked ? this.onChecked(e) : this.onCancelCheck(e), this.emitChange(P.checkedNode, this.result);
  }
  hasParentKeyInEdit(e, i) {
    return !e || !i ? !1 : i.some((s) => e.join(R).startsWith(s + R));
  }
  listenChange(e, i) {
    typeof i == "function" && (this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(i));
  }
  emitChange(e, i) {
    const s = this.callbacks[e];
    s && s.forEach((n) => n(i));
  }
  delKeysFromResult(e = []) {
    e.forEach((i) => {
      this.result.delete(i);
    }), this.emitChange(P.resultChange, this.result);
  }
  insetKeyInResult(e, i) {
    this.result.set(e.join(R), i), this.emitChange(P.resultChange, this.result);
  }
  onChecked(e) {
    const { path: i, leafNodesNum: s } = e;
    let n = e.findLeafs(!0) || [];
    if (n.length === s) {
      this.insetKeyInResult(i, e);
      const r = (o) => {
        if (!o.parent)
          return;
        const u = o.findSiblings();
        let d = !0;
        for (let c of u)
          if (!c.checked) {
            d = !1;
            break;
          }
        if (d) {
          let c = u.map((h) => h.path.join(R));
          this.delKeysFromResult(c), this.insetKeyInResult(o.parent.path, o.parent), r(o.parent);
        }
      };
      r(e);
      const l = this.getChildKeysFromResult(e.path);
      this.delKeysFromResult(l);
      return;
    }
    n.forEach((r) => this.onChecked(r));
  }
  getChildKeysFromResult(e) {
    if (!e)
      return [];
    let i = e.join(R);
    if (!i)
      return [];
    const s = [], n = new RegExp(`^${i}${R}.+$`);
    for (const a of this.result.keys())
      n.test(a) && s.push(a);
    return s;
  }
  onCancelCheck(e) {
    let { path: i, leafNodesNum: s, children: n } = e;
    if (!i)
      return;
    const a = (u) => {
      if (!u.parent)
        return;
      const d = u.findSiblings(), c = d == null ? void 0 : d.filter((v) => v.path.join(R) !== u.path.join(R));
      let h = !0;
      for (let v of c)
        if (!v.checked) {
          h = !1;
          break;
        }
      h && (c.forEach((v) => {
        this.insetKeyInResult(v.path, v);
      }), this.delKeysFromResult([u.parent.path.join(R)]), a(u.parent));
    };
    a(e), this.delKeysFromResult([e.path.join(R)]);
    const r = this.getChildKeysFromResult(e.path);
    if (this.delKeysFromResult(r), !((e.findLeafs(!0) || []).length === s)) {
      const u = (d) => {
        if (d)
          for (let c of d)
            c.menuNodeShow ? u(c == null ? void 0 : c.children) : c.checked && this.insetKeyInResult(c.path, c);
      };
      u(n);
    }
  }
  initLists(e = [], i, s) {
    const n = (a = [], r = 0, l = null) => a == null ? void 0 : a.map((o) => {
      var h;
      const u = !((h = o == null ? void 0 : o.children) != null && h.length) || r === s, d = {
        data: o,
        level: r,
        leaf: u,
        parent: l,
        checked: !1,
        indeterminate: !1,
        children: (o == null ? void 0 : o.children) || null,
        store: this
      }, c = new Lt(d);
      if (o != null && o.children && c.changeChildrenVal(n(o.children, r + 1, c)), c.leafNodesNum = c.leaf ? 1 : c.children.reduce((v, f) => v + f.leafNodesNum, 0), i.length) {
        let v = i.filter((b) => b.startsWith(c.path.join(","))).length, f = i.some((b) => c.path.join(",").startsWith(b)), p = i.find((b) => b === c.path.join(","));
        c.checked = f || v === c.leafNodesNum, c.indeterminate = !!v && v < c.leafNodesNum && !p, c.checked && !this.hasParentKeyInEdit(c.path, i) && this.insetKeyInResult(c.path, c);
      }
      return c;
    });
    this.nodesTree = n(e);
  }
  getNodesTree() {
    return this.nodesTree;
  }
  getNodeByPath(e) {
    if (!e || !Array.isArray(e))
      return null;
    let i = this.nodesTree, s = null;
    for (let n in e) {
      if (s = i.find((a) => a.value === e[n]), !s)
        return null;
      i = s.children;
    }
    return s;
  }
}
var Pt = "Expected a function", ae = 0 / 0, Vt = "[object Symbol]", Dt = /^\s+|\s+$/g, Mt = /^[-+]0x[0-9a-f]+$/i, Et = /^0b[01]+$/i, Ft = /^0o[0-7]+$/i, jt = parseInt, Kt = typeof O == "object" && O && O.Object === Object && O, Ut = typeof self == "object" && self && self.Object === Object && self, Bt = Kt || Ut || Function("return this")(), Ht = Object.prototype, Wt = Ht.toString, qt = Math.max, Gt = Math.min, U = function() {
  return Bt.Date.now();
};
function Xt(t, e, i) {
  var s, n, a, r, l, o, u = 0, d = !1, c = !1, h = !0;
  if (typeof t != "function")
    throw new TypeError(Pt);
  e = ce(e) || 0, X(i) && (d = !!i.leading, c = "maxWait" in i, a = c ? qt(ce(i.maxWait) || 0, e) : a, h = "trailing" in i ? !!i.trailing : h);
  function v(y) {
    var g = s, z = n;
    return s = n = void 0, u = y, r = t.apply(z, g), r;
  }
  function f(y) {
    return u = y, l = setTimeout(S, e), d ? v(y) : r;
  }
  function p(y) {
    var g = y - o, z = y - u, x = e - g;
    return c ? Gt(x, a - z) : x;
  }
  function b(y) {
    var g = y - o, z = y - u;
    return o === void 0 || g >= e || g < 0 || c && z >= a;
  }
  function S() {
    var y = U();
    if (b(y))
      return w(y);
    l = setTimeout(S, p(y));
  }
  function w(y) {
    return l = void 0, h && s ? v(y) : (s = n = void 0, r);
  }
  function _() {
    l !== void 0 && clearTimeout(l), u = 0, s = o = n = l = void 0;
  }
  function T() {
    return l === void 0 ? r : w(U());
  }
  function N() {
    var y = U(), g = b(y);
    if (s = arguments, n = this, o = y, g) {
      if (l === void 0)
        return f(o);
      if (c)
        return l = setTimeout(S, e), v(o);
    }
    return l === void 0 && (l = setTimeout(S, e)), r;
  }
  return N.cancel = _, N.flush = T, N;
}
function X(t) {
  var e = typeof t;
  return !!t && (e == "object" || e == "function");
}
function Yt(t) {
  return !!t && typeof t == "object";
}
function Jt(t) {
  return typeof t == "symbol" || Yt(t) && Wt.call(t) == Vt;
}
function ce(t) {
  if (typeof t == "number")
    return t;
  if (Jt(t))
    return ae;
  if (X(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = X(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = t.replace(Dt, "");
  var i = Et.test(t);
  return i || Ft.test(t) ? jt(t.slice(2), i ? 2 : 8) : Mt.test(t) ? ae : +t;
}
var Qt = Xt;
const ue = /* @__PURE__ */ Y(Qt), Zt = ({ cascaderMaxLevel: t = 2, needResultPanel: e = !0, resultLabelJoiner: i = " > " }, s) => {
  const n = A(null), a = A(null), r = (d = [], c = []) => {
    let h = [];
    c.length && (h = c == null ? void 0 : c.map((f) => f.join(","))), n.value = new oe(d, h, t);
    const v = ue((f) => {
      let p = [];
      for (let [, b] of f)
        p.push(b.path);
      s && s("change", p);
    }, 300);
    if (n.value.listenChange(P.checkedNode, v), e) {
      const f = ue((p) => {
        l(p);
      });
      n.value.listenChange(P.resultChange, f), l(n.value.result);
    }
  }, l = (d) => {
    let c = [];
    if (d)
      for (let [, v] of d)
        c.push(v);
    const h = (v) => v.reduce((f, p) => p.leaf ? [...f, {
      ...p,
      value: p.path.join(","),
      label: p.pathName.join(i)
    }] : [...f, ...h(p.children)], []);
    a.value = new oe(h(c));
  };
  return {
    resultStore: a,
    menuStore: n,
    initMenuStore: r,
    handleDestroyed: () => {
      n.value = null, a.value = null;
    },
    removeSelectedCate: () => {
      if (!a.value)
        return;
      const c = a.value.getNodesTree().filter((v) => v.checked);
      let h = n.value;
      c.forEach((v) => {
        const f = h.getNodeByPath(v.path);
        f && f.onCheckedClick(!1);
      });
    }
  };
}, ei = (t = null) => ({
  handleSearch: (i, s, n = !0) => {
    const a = (r) => {
      for (let l of r)
        l.changeShowStatus(s, n), l.children && l.children.length && a(l.children);
    };
    a(i), i.forEach((r) => {
      let l = r.findLeafs(!0);
      for (let o of l)
        o.onCheckedClick(o.checked);
    }), ze(() => {
      var l;
      let r = i.filter((o) => !!o.menuNodeShow);
      (l = t.value) == null || l.convertActive(r.find((o) => o.checked || o.indeterminate) || (r == null ? void 0 : r[0]));
    });
  }
}), ti = we({
  name: "CascaderTreeSelect"
}), ii = /* @__PURE__ */ Object.assign(ti, {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    needSearch: {
      type: Boolean,
      default: !0
    },
    needResultPanel: {
      type: Boolean,
      default: !0
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: "请输入关键词进行搜索"
    },
    size: {
      type: String,
      default: "small"
    },
    cascaderMaxLevel: {
      type: Number,
      default: 2
      // 从0开始
    },
    resultLabelJoiner: {
      type: String,
      default: " > "
    },
    panelTitleList: {
      type: Array,
      default: () => ["一级", "二级", "三级", "四级"]
    },
    ancestorHitShow: {
      // 祖先元素命中，子元素中不包含搜索词也展示即展示
      type: Boolean,
      default: !0
    }
  },
  emits: ["change"],
  setup(t, { expose: e, emit: i }) {
    const s = t;
    let n = A("");
    const a = A(null), { menuStore: r, initMenuStore: l, resultStore: o, handleDestroyed: u, removeSelectedCate: d } = Zt(s, i), { handleSearch: c } = ei(a);
    return H(() => n.value, () => {
      var h;
      c(((h = r.value) == null ? void 0 : h.getNodesTree()) || [], n.value, s.ancestorHitShow);
    }), H(() => s.options, (h) => {
      l(h, s.value);
    }, { deep: !0 }), Ce(() => {
      u();
    }), e({ initMenuStore: l }), { __sfc: !0, props: s, searchKey: n, cascaderSelectRef: a, emit: i, menuStore: r, initMenuStore: l, resultStore: o, handleDestroyed: u, removeSelectedCate: d, handleSearch: c, CascaderSelect: kt, CascaderResult: It };
  }
});
var si = function() {
  var e = this, i = e._self._c, s = e._self._setupProxy;
  return i("div", { staticClass: "cascader-tree-select" }, [e.needSearch ? i("div", { staticClass: "cascader-tree-select__search" }, [i("el-input", { staticStyle: { width: "240px" }, attrs: { size: s.props.size, clearable: "", placeholder: s.props.placeholder }, model: { value: s.searchKey, callback: function(n) {
    s.searchKey = typeof n == "string" ? n.trim() : n;
  }, expression: "searchKey" } })], 1) : e._e(), i("div", { staticClass: "cascader-tree-select__main" }, [i(s.CascaderSelect, e._b({ ref: "cascaderSelectRef", attrs: { options: s.menuStore ? s.menuStore.getNodesTree() : [], "cascader-max-level": s.props.cascaderMaxLevel, "global-search-word": s.searchKey, "panel-title-list": s.props.panelTitleList } }, "cascader-select", e.$props, !1)), s.props.needResultPanel ? i(s.CascaderResult, e._b({ attrs: { "result-options": s.resultStore ? s.resultStore.getNodesTree() : [] }, on: { removeSelectedCate: s.removeSelectedCate } }, "cascader-result", e.$props, !1)) : e._e()], 1)]);
}, ni = [], ri = /* @__PURE__ */ K(
  ii,
  si,
  ni,
  !1,
  null,
  null,
  null,
  null
);
const B = ri.exports;
B.install = function(t) {
  t.component(B.name, B);
};
export {
  B as default
};
