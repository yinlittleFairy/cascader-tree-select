import P, { computed as te, ref as A, watch as H, nextTick as ze, defineComponent as we, onUnmounted as Ce } from "vue";
import { Input as ke, Checkbox as Re, Form as Te, FormItem as xe, RadioGroup as Ie, Radio as Oe } from "element-ui";
P.use(ke);
P.use(Re);
P.use(Te);
P.use(xe);
P.use(Ie);
P.use(Oe);
const Ne = (t) => ({
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
function Pe(t) {
  t.component("resize-observer", q), t.component("ResizeObserver", q);
}
var Le = {
  // eslint-disable-next-line no-undef
  version: "0.4.5",
  install: Pe
}, M = null;
typeof window < "u" ? M = window.Vue : typeof global < "u" && (M = global.Vue);
M && M.use(Le);
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
function Ue(t, e) {
  var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s, n, a, r = function(l) {
    for (var c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), u = 1; u < c; u++)
      d[u - 1] = arguments[u];
    if (a = d, !(s && l === n)) {
      var h = i.leading;
      typeof h == "function" && (h = h(l, n)), (!s || l !== n) && h && t.apply(void 0, [l].concat(se(a))), n = l, clearTimeout(s), s = setTimeout(function() {
        t.apply(void 0, [l].concat(se(a))), s = 0;
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
var Ke = /* @__PURE__ */ function() {
  function t(e, i, s) {
    Ve(this, t), this.el = e, this.observer = null, this.frozen = !1, this.createObserver(i, s);
  }
  return De(t, [{
    key: "createObserver",
    value: function(i, s) {
      var n = this;
      if (this.observer && this.destroyObserver(), !this.frozen) {
        if (this.options = je(i), this.callback = function(o, l) {
          n.options.callback(o, l), o && n.options.once && (n.frozen = !0, n.destroyObserver());
        }, this.callback && this.options.throttle) {
          var a = this.options.throttleOptions || {}, r = a.leading;
          this.callback = Ue(this.callback, this.options.throttle, {
            leading: function(l) {
              return r === "both" || r === "visible" && l || r === "hidden" && !l;
            }
          });
        }
        this.oldResult = void 0, this.observer = new IntersectionObserver(function(o) {
          var l = o[0];
          if (o.length > 1) {
            var c = o.find(function(u) {
              return u.isIntersecting;
            });
            c && (l = c);
          }
          if (n.callback) {
            var d = l.isIntersecting && l.intersectionRatio >= n.threshold;
            if (d === n.oldResult)
              return;
            n.oldResult = d, n.callback(d, l);
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
      var n = new Ke(t, s, i);
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
var N = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Y(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var _e = { exports: {} };
(function(t) {
  (function(e, i) {
    t.exports ? t.exports = i() : e.Scrollparent = i();
  })(N, function() {
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
        for (let o = 0, l = e.length; o < l; o++)
          r = e[o][i] || s, r < n && (n = r), a += r, t[o] = {
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
      const i = this.itemSize, s = this.gridItems || 1, n = this.itemSecondarySize || i, a = this.$_computedMinItemSize, r = this.typeField, o = this.simpleArray ? null : this.keyField, l = this.items, c = l.length, d = this.sizes, u = this.$_views, h = this.$_unusedViews, y = this.pool;
      let m, f, g, b, w;
      if (!c)
        m = f = b = w = g = 0;
      else if (this.$_prerender)
        m = b = 0, f = w = Math.min(this.prerender, l.length), g = null;
      else {
        const _ = this.getScroll();
        if (e) {
          let C = _.start - this.$_lastUpdateScrollPosition;
          if (C < 0 && (C = -C), i === null && C < a || C < i)
            return {
              continuous: !0
            };
        }
        this.$_lastUpdateScrollPosition = _.start;
        const $ = this.buffer;
        _.start -= $, _.end += $;
        let O = 0;
        if (this.$refs.before && (O = this.$refs.before.scrollHeight, _.start -= O), this.$refs.after) {
          const C = this.$refs.after.scrollHeight;
          _.end += C;
        }
        if (i === null) {
          let C, Q = 0, Z = c - 1, k = ~~(c / 2), ee;
          do
            ee = k, C = d[k].accumulator, C < _.start ? Q = k : k < c - 1 && d[k + 1].accumulator > _.start && (Z = k), k = ~~((Q + Z) / 2);
          while (k !== ee);
          for (k < 0 && (k = 0), m = k, g = d[c - 1].accumulator, f = k; f < c && d[f].accumulator < _.end; f++)
            ;
          for (f === -1 ? f = l.length - 1 : (f++, f > c && (f = c)), b = m; b < c && O + d[b].accumulator < _.start; b++)
            ;
          for (w = b; w < c && O + d[w].accumulator < _.end; w++)
            ;
        } else {
          m = ~~(_.start / i * s);
          const C = m % s;
          m -= C, f = Math.ceil(_.end / i * s), b = Math.max(0, Math.floor((_.start - O) / i * s)), w = Math.floor((_.end - O) / i * s), m < 0 && (m = 0), f > c && (f = c), b < 0 && (b = 0), w > c && (w = c), g = Math.ceil(c / s) * i;
        }
      }
      f - m > me.itemsLimit && this.itemsLimitError(), this.totalSize = g;
      let p;
      const T = m <= this.$_endIndex && f >= this.$_startIndex;
      if (this.$_continuous !== T) {
        if (T) {
          u.clear(), h.clear();
          for (let _ = 0, $ = y.length; _ < $; _++)
            p = y[_], this.unuseView(p);
        }
        this.$_continuous = T;
      } else if (T)
        for (let _ = 0, $ = y.length; _ < $; _++)
          p = y[_], p.nr.used && (t && (p.nr.index = l.indexOf(p.item)), (p.nr.index === -1 || p.nr.index < m || p.nr.index >= f) && this.unuseView(p));
      const I = T ? null : /* @__PURE__ */ new Map();
      let v, S, z, x;
      for (let _ = m; _ < f; _++) {
        v = l[_];
        const $ = o ? v[o] : v;
        if ($ == null)
          throw new Error(`Key is ${$} on item (keyField is '${o}')`);
        if (p = u.get($), !i && !d[_].size) {
          p && this.unuseView(p);
          continue;
        }
        p ? (p.nr.used = !0, p.item = v) : (_ === l.length - 1 && this.$emit("scroll-end"), _ === 0 && this.$emit("scroll-start"), S = v[r], z = h.get(S), T ? z && z.length ? (p = z.pop(), p.item = v, p.nr.used = !0, p.nr.index = _, p.nr.key = $, p.nr.type = S) : p = this.addView(y, _, v, $, S) : (x = I.get(S) || 0, (!z || x >= z.length) && (p = this.addView(y, _, v, $, S), this.unuseView(p, !0), z = h.get(S)), p = z[x], p.item = v, p.nr.used = !0, p.nr.index = _, p.nr.key = $, p.nr.type = S, I.set(S, x + 1), x++), u.set($, p)), i === null ? (p.position = d[_ - 1].accumulator, p.offset = 0) : (p.position = Math.floor(_ / s) * i, p.offset = _ % s * n);
      }
      return this.$_startIndex = m, this.$_endIndex = f, this.emitUpdate && this.$emit("update", m, f, b, w), clearTimeout(this.$_sortTimer), this.$_sortTimer = setTimeout(this.sortViews, 300), {
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
        let r = -(i ? n.top : n.left), o = i ? window.innerHeight : window.innerWidth;
        r < 0 && (o += r, r = 0), r + o > a && (o = a - r), s = {
          start: r,
          end: r + o
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
        const a = ne(this.$el), r = a.tagName === "HTML" ? 0 : a[e.scroll], o = a.getBoundingClientRect(), c = this.$el.getBoundingClientRect()[e.start] - o[e.start];
        i = a, s = e.scroll, n = t + r + c;
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
function J(t, e, i, s, n, a, r, o, l, c) {
  typeof r != "boolean" && (l = o, o = r, r = !1);
  const d = typeof i == "function" ? i.options : i;
  t && t.render && (d.render = t.render, d.staticRenderFns = t.staticRenderFns, d._compiled = !0, n && (d.functional = !0)), s && (d._scopeId = s);
  let u;
  if (a ? (u = function(h) {
    h = h || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !h && typeof __VUE_SSR_CONTEXT__ < "u" && (h = __VUE_SSR_CONTEXT__), e && e.call(this, l(h)), h && h._registeredComponents && h._registeredComponents.add(a);
  }, d._ssrRegister = u) : e && (u = r ? function(h) {
    e.call(this, c(h, this.$root.$options.shadowRoot));
  } : function(h) {
    e.call(this, o(h));
  }), u)
    if (d.functional) {
      const h = d.render;
      d.render = function(m, f) {
        return u.call(f), h(m, f);
      };
    } else {
      const h = d.beforeCreate;
      d.beforeCreate = h ? [].concat(h, u) : [u];
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
        const o = e[r], l = s ? r : o[i];
        let c = n[l];
        typeof c > "u" && !this.$_undefinedMap[l] && (c = 0), t.push({
          item: o,
          id: l,
          size: c
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
      for (let o = 0; o < a && !(s >= i); o++)
        s += e[o].size || this.minItemSize, n += t[o].size || this.minItemSize;
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
function U(t, e, i, s, n, a, r, o) {
  var l = typeof t == "function" ? t.options : t;
  e && (l.render = e, l.staticRenderFns = i, l._compiled = !0), s && (l.functional = !0), a && (l._scopeId = "data-v-" + a);
  var c;
  if (r ? (c = function(h) {
    h = h || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !h && typeof __VUE_SSR_CONTEXT__ < "u" && (h = __VUE_SSR_CONTEXT__), n && n.call(this, h), h && h._registeredComponents && h._registeredComponents.add(r);
  }, l._ssrRegister = c) : n && (c = o ? function() {
    n.call(
      this,
      (l.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : n), c)
    if (l.functional) {
      l._injectStyles = c;
      var d = l.render;
      l.render = function(y, m) {
        return c.call(m), d(y, m);
      };
    } else {
      var u = l.beforeCreate;
      l.beforeCreate = u ? [].concat(u, c) : [c];
    }
  return {
    exports: t,
    options: l
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
    },
    colorDangerField: {
      type: String,
      default: ""
    }
  },
  emits: ["clickMenuItem", "removeSelectedCate"],
  setup(t, { emit: e }) {
    const i = t, s = te(() => {
      var u;
      const c = a.value.length, d = (u = a.value.filter((h) => h.checked)) == null ? void 0 : u.length;
      return {
        indeterminate: !!d && d !== c,
        checked: !!d && d === c
      };
    }), n = A(""), a = te(() => {
      var c;
      return (c = i.panelOptions) == null ? void 0 : c.filter((d) => !n.value || d.label.includes(n.value));
    }), { handleSelectAll: r, handleSelectChange: o } = Ne(e);
    return { __sfc: !0, emit: e, props: i, panelStatus: s, resultSearchKey: n, panelShowOptions: a, handleSelectAll: r, handleSelectChange: o, highLightLabel: (c) => {
      let d = i.isResultPanel ? n.value : i.globalSearchWord;
      return d ? c.split(d).join(`<span style="color: #266BF6">${d}</span>`) : c;
    }, RecycleScroller: F };
  }
};
var gt = function() {
  var e = this, i = e._self._c, s = e._self._setupProxy;
  return i("div", { staticClass: "cascader-panel", style: { width: `calc(100% / ${s.props.cascaderMaxLevel})` } }, [i("div", { staticClass: "cascader-panel__head" }, [e.supportSelectAll ? i("div", [i("el-checkbox", { attrs: { value: s.panelStatus.checked, indeterminate: s.panelStatus.indeterminate, disabled: !s.panelShowOptions.length }, on: { change: (n) => s.handleSelectAll(s.props.panelOptions, n) } }), e._v(" 全选 ")], 1) : e._e(), e.panelMenuTitle ? i("label", [e._v(e._s(s.props.panelMenuTitle))]) : e._e(), e.isResultPanel && e.showResultSearch ? i("el-input", { staticStyle: { width: "160px" }, attrs: { placeholder: "请输入", size: "small", clearable: "", "suffix-icon": "el-icon-search" }, model: { value: s.resultSearchKey, callback: function(n) {
    s.resultSearchKey = typeof n == "string" ? n.trim() : n;
  }, expression: "resultSearchKey" } }) : e._e()], 1), i("div", { staticClass: "cascader-panel__menu" }, [e.isResultPanel && e.showResultCount ? i("div", { staticClass: "cascader-panel__menu__operate" }, [i("span", [e._v("已添加(" + e._s(e.panelOptions.length) + "条)")]), i("span", { staticClass: "remove-button", class: { "remove-button__disabled": !s.panelStatus.checked && !s.panelStatus.indeterminate }, on: { click: function(n) {
    return s.emit("removeSelectedCate");
  } } }, [e._v("移除")])]) : e._e(), s.panelShowOptions.length ? i("div", [i(s.RecycleScroller, { style: { height: e.isResultPanel && e.showResultSearch ? "289px" : "325px" }, attrs: { items: s.panelShowOptions, "item-size": 32, "key-field": "value", buffer: 100 }, scopedSlots: e._u([{ key: "default", fn: function({ item: n, index: a }) {
    return [i("div", { staticClass: "cascader-panel__menu__item" }, [i("el-checkbox", { attrs: { value: n.checked, indeterminate: n.indeterminate, disabled: n.disabled }, on: { change: (r) => s.handleSelectChange(r, n) } }), i("div", { staticClass: "menu-item", class: { "menu-item__danger": s.props.colorDangerField && n[s.props.colorDangerField], "menu-item__active": e.panelActiveList[s.props.curPanelLevel] && n.value === e.panelActiveList[s.props.curPanelLevel].value }, attrs: { title: n.label }, domProps: { innerHTML: e._s(s.highLightLabel(n.label)) }, on: { click: function(r) {
      return s.emit("clickMenuItem", n);
    } } })], 1)];
  } }], null, !1, 742864597) })], 1) : i("div", { staticClass: "cascader-panel__menu__empty" }, [e._v(e._s(s.props.emptyText))])])]);
}, bt = [], St = /* @__PURE__ */ U(
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
      var l, c, d;
      if (r === 0)
        return (l = i.options) == null ? void 0 : l.filter((u) => u.menuNodeShow);
      let o = (c = s.value) == null ? void 0 : c[r - 1];
      return ((d = o == null ? void 0 : o.children) == null ? void 0 : d.filter((u) => u.menuNodeShow)) || [];
    }, a = (r) => {
      var d;
      const o = (r == null ? void 0 : r.level) || 0, l = (d = s.value) == null ? void 0 : d.slice(0, o);
      l.push(r);
      let c = r;
      for (; c && c.children; ) {
        const u = c == null ? void 0 : c.getVisibleChild();
        c = (u == null ? void 0 : u.find((h) => h.checked || h.indeterminate)) || (u == null ? void 0 : u[0]), l.push(c);
      }
      s.value = l;
    };
    return H(() => i.options, (r) => {
      (!Array.isArray(r) || !r.length) && (s.value = []);
      let o = r == null ? void 0 : r.find((l) => l.checked || l.indeterminate);
      a(o || (r == null ? void 0 : r[0]));
    }), e({ convertActive: a }), { __sfc: !0, props: i, panelActiveNode: s, getPanelOptions: n, convertActive: a, CascaderPanel: Se };
  }
};
var zt = function() {
  var e = this, i = e._self._c, s = e._self._setupProxy;
  return i("div", { staticClass: "cascader-select" }, e._l(s.props.cascaderMaxLevel + 1, function(n) {
    return i(s.CascaderPanel, { key: n, attrs: { "cur-panel-level": n - 1, "cascader-max-level": s.props.cascaderMaxLevel, "panel-options": s.getPanelOptions(n - 1), "panel-menu-title": e.panelTitleList[n - 1], "panel-active-list": s.panelActiveNode, "global-search-word": e.globalSearchWord }, on: { clickMenuItem: s.convertActive } });
  }), 1);
}, wt = [], Ct = /* @__PURE__ */ U(
  $t,
  zt,
  wt,
  !1,
  null,
  "0937b566",
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
}, xt = [], It = /* @__PURE__ */ U(
  Rt,
  Tt,
  xt,
  !1,
  null,
  "b2705c62",
  null,
  null
);
const Ot = It.exports;
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
  })(N, function() {
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
    ], s = 62, n = function(r, o) {
      return (r + o).slice(-r.length);
    }, a = function(r) {
      this._opt = r || {};
    };
    return a.prototype = {
      _toBase: function(r, o) {
        var l = this._opt, c = l.symbols || i, d = "";
        if (o > c.length || o <= 1)
          return !1;
        for (; r >= 1; )
          d = c[r - o * Math.floor(r / o)] + d, r = Math.floor(r / o);
        return o < 11 ? parseInt(d) : d;
      },
      _salts: function() {
        for (var r = this, o = r._opt, l = o.salts || 2, c = "", d = 0; d < l; d++) {
          var u = Math.floor(Math.random() * 3844);
          c += n("00", r._toBase(u, s));
        }
        return c;
      },
      gen: function() {
        var r = this, o = r._opt, l = o.interval || 1, c = o.initTime || e, d = l > 0 ? Math.floor(((/* @__PURE__ */ new Date()).getTime() - c) / l) : 0, u = r._salts();
        return d === 0 ? u : r._toBase(d, s) + u;
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
var Nt = $e.exports;
const At = /* @__PURE__ */ Y(Nt), R = ",";
class Pt {
  constructor({
    data: e = {},
    level: i = 0,
    leaf: s = !1,
    parent: n = null,
    children: a = [],
    store: r,
    indeterminate: o,
    checked: l
  }) {
    this.uid = At.gen(), this.value = e.value, this.label = e.label, this.level = i, this.leaf = s, this.parent = n, this.children = a, this.disabled = !!e.disabled, this.path = e.path || this.formatPath(), this.pathName = e.pathName || this.formatLabel(), this.store = r, this.leafNodesNum = 0, this.checked = l, this.indeterminate = o, this.sensitiveFlag = e.sensitiveFlag, this.menuNodeShow = !0;
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
        const o = n(r);
        return this.changeNodeShow(o), o ? 1 : 0;
      }
      if (r.children && r.children.length) {
        let o = 0;
        return r.children.forEach((l) => {
          o += a(l);
        }), this.changeNodeShow(!!o), o;
      }
    };
    a(this);
  }
  onCheckedClick(e) {
    this.changeCheckVal(e), this.changeChildStatus(e), this.changeParentStatus(e);
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
    const e = ((a = this.findSiblings()) == null ? void 0 : a.filter((o) => o.menuNodeShow)) || [], i = (r = e.filter((o) => o.checked)) == null ? void 0 : r.length, s = e.some((o) => o.indeterminate), n = i ? i === e.length ? "checked" : "indeterminate" : s ? "indeterminate" : "empty";
    this.parent.changeCompStatus(n), this.parent.changeParentStatus();
  }
}
const L = {
  resultChange: "resultChange",
  checkedNode: "checkedNode"
};
class oe {
  constructor(e = [], i = [], s = 2) {
    this.nodesTree = [], this.result = /* @__PURE__ */ new Map(), this.callbacks = {}, this.initLists(e, i, s);
  }
  onNodeChange(e) {
    e.checked ? this.onChecked(e) : this.onCancelCheck(e), this.emitChange(L.checkedNode, this.result);
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
    }), this.emitChange(L.resultChange, this.result);
  }
  insetKeyInResult(e, i) {
    this.result.set(e.join(R), i), this.emitChange(L.resultChange, this.result);
  }
  onChecked(e) {
    const { path: i, leafNodesNum: s } = e;
    let n = e.findLeafs(!0) || [];
    if (n.length === s) {
      this.insetKeyInResult(i, e);
      const r = (l) => {
        if (!l.parent)
          return;
        const c = l.findSiblings();
        let d = !0;
        for (let u of c)
          if (!u.checked) {
            d = !1;
            break;
          }
        if (d) {
          let u = c.map((h) => h.path.join(R));
          this.delKeysFromResult(u), this.insetKeyInResult(l.parent.path, l.parent), r(l.parent);
        }
      };
      r(e);
      const o = this.getChildKeysFromResult(e.path);
      this.delKeysFromResult(o);
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
    if (!e.path)
      return;
    const i = (n) => {
      if (!n.parent)
        return;
      const a = n.findSiblings(), r = a == null ? void 0 : a.filter((l) => l.path.join(R) !== n.path.join(R));
      let o = !0;
      for (let l of r)
        if (!l.checked) {
          o = !1;
          break;
        }
      o && (r.forEach((l) => {
        this.insetKeyInResult(l.path, l);
      }), this.delKeysFromResult([n.parent.path.join(R)]), i(n.parent));
    };
    i(e), this.delKeysFromResult([e.path.join(R)]);
    const s = this.getChildKeysFromResult(e.path);
    this.delKeysFromResult(s);
  }
  initLists(e = [], i, s) {
    const n = (a = [], r = 0, o = null) => a == null ? void 0 : a.map((l) => {
      var h;
      const c = !((h = l == null ? void 0 : l.children) != null && h.length) || r === s, d = {
        data: l,
        level: r,
        leaf: c,
        parent: o,
        checked: !1,
        indeterminate: !1,
        children: (l == null ? void 0 : l.children) || null,
        store: this
      }, u = new Pt(d);
      if (l != null && l.children && u.changeChildrenVal(n(l.children, r + 1, u)), u.leafNodesNum = u.leaf ? 1 : u.children.reduce((y, m) => y + m.leafNodesNum, 0), i.length) {
        let y = i.filter((g) => g.startsWith(u.path.join(","))).length, m = i.some((g) => u.path.join(",").startsWith(g)), f = i.find((g) => g === u.path.join(","));
        u.checked = m || y === u.leafNodesNum, u.indeterminate = !!y && y < u.leafNodesNum && !f, u.checked && !this.hasParentKeyInEdit(u.path, i) && this.insetKeyInResult(u.path, u);
      }
      return u;
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
var Lt = "Expected a function", ae = 0 / 0, Vt = "[object Symbol]", Dt = /^\s+|\s+$/g, Mt = /^[-+]0x[0-9a-f]+$/i, Et = /^0b[01]+$/i, Ft = /^0o[0-7]+$/i, jt = parseInt, Ut = typeof N == "object" && N && N.Object === Object && N, Kt = typeof self == "object" && self && self.Object === Object && self, Bt = Ut || Kt || Function("return this")(), Ht = Object.prototype, Wt = Ht.toString, qt = Math.max, Gt = Math.min, K = function() {
  return Bt.Date.now();
};
function Xt(t, e, i) {
  var s, n, a, r, o, l, c = 0, d = !1, u = !1, h = !0;
  if (typeof t != "function")
    throw new TypeError(Lt);
  e = ce(e) || 0, X(i) && (d = !!i.leading, u = "maxWait" in i, a = u ? qt(ce(i.maxWait) || 0, e) : a, h = "trailing" in i ? !!i.trailing : h);
  function y(v) {
    var S = s, z = n;
    return s = n = void 0, c = v, r = t.apply(z, S), r;
  }
  function m(v) {
    return c = v, o = setTimeout(b, e), d ? y(v) : r;
  }
  function f(v) {
    var S = v - l, z = v - c, x = e - S;
    return u ? Gt(x, a - z) : x;
  }
  function g(v) {
    var S = v - l, z = v - c;
    return l === void 0 || S >= e || S < 0 || u && z >= a;
  }
  function b() {
    var v = K();
    if (g(v))
      return w(v);
    o = setTimeout(b, f(v));
  }
  function w(v) {
    return o = void 0, h && s ? y(v) : (s = n = void 0, r);
  }
  function p() {
    o !== void 0 && clearTimeout(o), c = 0, s = l = n = o = void 0;
  }
  function T() {
    return o === void 0 ? r : w(K());
  }
  function I() {
    var v = K(), S = g(v);
    if (s = arguments, n = this, l = v, S) {
      if (o === void 0)
        return m(l);
      if (u)
        return o = setTimeout(b, e), y(l);
    }
    return o === void 0 && (o = setTimeout(b, e)), r;
  }
  return I.cancel = p, I.flush = T, I;
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
const ue = /* @__PURE__ */ Y(Qt), Zt = ({ cascaderMaxLevel: t = 2, needResultPanel: e = !0, resultLabelJoiner: i = " > ", options: s = [] }, n) => {
  const a = A(null), r = A(null), o = (u = [], h = s) => {
    let y = [];
    u.length && (y = u == null ? void 0 : u.map((f) => f.join(","))), a.value = new oe(h, y, t);
    const m = ue((f) => {
      let g = [];
      for (let [, b] of f)
        g.push(b.path);
      n && n("change", g);
    }, 300);
    if (a.value.listenChange(L.checkedNode, m), e) {
      const f = ue((g) => {
        l(g);
      });
      a.value.listenChange(L.resultChange, f), l(a.value.result);
    }
  }, l = (u) => {
    let h = [];
    if (u)
      for (let [, m] of u)
        h.push(m);
    const y = (m) => m.reduce((f, g) => g.leaf ? [...f, {
      ...g,
      value: g.path.join(","),
      label: g.pathName.join(i)
    }] : [...f, ...y(g.children)], []);
    r.value = new oe(y(h));
  };
  return {
    resultStore: r,
    menuStore: a,
    initMenuStore: o,
    handleDestroyed: () => {
      a.value = null, r.value = null;
    },
    removeSelectedCate: () => {
      if (!r.value)
        return;
      const h = r.value.getNodesTree().filter((m) => m.checked);
      let y = a.value;
      h.forEach((m) => {
        const f = y.getNodeByPath(m.path);
        f && f.onCheckedClick(!1);
      });
    }
  };
}, ei = (t = null) => ({
  handleSearch: (i, s, n = !0) => {
    const a = (r) => {
      for (let o of r)
        o.changeShowStatus(s, n), o.children && o.children.length && a(o.children);
    };
    a(i), i.forEach((r) => {
      var l;
      ((l = r.findLeafs(!0)) == null ? void 0 : l.filter((c) => c.checked)).forEach((c) => {
        c.onCheckedClick(!0);
      });
    }), ze(() => {
      var o;
      let r = i.filter((l) => !!l.menuNodeShow);
      (o = t.value) == null || o.convertActive(r.find((l) => l.checked || l.indeterminate) || (r == null ? void 0 : r[0]));
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
    const a = A(null), { menuStore: r, initMenuStore: o, resultStore: l, handleDestroyed: c, removeSelectedCate: d } = Zt(s, i), { handleSearch: u } = ei(a);
    return H(() => n.value, () => {
      u(r.value.nodesTree, n.value, s.ancestorHitShow);
    }), H(() => s.options, (h) => {
      o(s.value, h);
    }, { immediate: !0, deep: !0 }), Ce(() => {
      c();
    }), e({ initMenuStore: o }), { __sfc: !0, props: s, searchKey: n, cascaderSelectRef: a, emit: i, menuStore: r, initMenuStore: o, resultStore: l, handleDestroyed: c, removeSelectedCate: d, handleSearch: u, CascaderSelect: kt, CascaderResult: Ot };
  }
});
var si = function() {
  var e = this, i = e._self._c, s = e._self._setupProxy;
  return i("div", { staticClass: "cascader-tree-select" }, [e.needSearch ? i("div", { staticClass: "cascader-tree-select__search" }, [i("el-input", { staticStyle: { width: "240px" }, attrs: { size: s.props.size, clearable: "", placeholder: s.props.placeholder }, model: { value: s.searchKey, callback: function(n) {
    s.searchKey = typeof n == "string" ? n.trim() : n;
  }, expression: "searchKey" } })], 1) : e._e(), i("div", { staticClass: "cascader-tree-select__main" }, [i(s.CascaderSelect, { ref: "cascaderSelectRef", attrs: { options: s.menuStore.value.nodesTree, "cascader-max-level": s.props.cascaderMaxLevel, "global-search-word": s.searchKey, "panel-title-list": s.props.panelTitleList } }), s.props.needResultPanel ? i(s.CascaderResult, e._b({ attrs: { "result-options": s.resultStore ? s.resultStore.getNodesTree() : [] }, on: { removeSelectedCate: s.removeSelectedCate } }, "cascader-result", e.$props, !1)) : e._e()], 1)]);
}, ni = [], ri = /* @__PURE__ */ U(
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
