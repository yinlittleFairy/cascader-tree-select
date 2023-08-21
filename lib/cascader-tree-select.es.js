import x, { computed as ee, ref as I, watch as ue, nextTick as ze, defineComponent as we, onMounted as Ce, onUnmounted as ke } from "vue";
import { Input as Re, Col as Te, Checkbox as xe, Button as Oe, Form as Ie, FormItem as Ne, RadioGroup as Ae, Radio as Pe, Row as Le } from "element-ui";
x.use(Re);
x.use(Te);
x.use(xe);
x.use(Oe);
x.use(Ie);
x.use(Ne);
x.use(Ae);
x.use(Pe);
x.use(Le);
const Ve = (i) => ({
  handleSelectAll: (s, n) => {
    s.forEach((a) => {
      a.onCheckedClick(n);
    });
  },
  handleSelectChange: (s, n) => {
    n.onCheckedClick(s), i && i("clickMenuItem", n);
  }
});
function De() {
  var i = window.navigator.userAgent, e = i.indexOf("MSIE ");
  if (e > 0)
    return parseInt(i.substring(e + 5, i.indexOf(".", e)), 10);
  var t = i.indexOf("Trident/");
  if (t > 0) {
    var s = i.indexOf("rv:");
    return parseInt(i.substring(s + 3, i.indexOf(".", s)), 10);
  }
  var n = i.indexOf("Edge/");
  return n > 0 ? parseInt(i.substring(n + 5, i.indexOf(".", n)), 10) : -1;
}
var V = void 0;
function H() {
  H.init || (H.init = !0, V = De() !== -1);
}
var W = {
  render: function() {
    var e = this, t = e.$createElement, s = e._self._c || t;
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
    H(), this.$nextTick(function() {
      e._w = e.$el.offsetWidth, e._h = e.$el.offsetHeight;
    });
    var t = document.createElement("object");
    this._resizeObject = t, t.setAttribute("aria-hidden", "true"), t.setAttribute("tabindex", -1), t.onload = this.addResizeHandlers, t.type = "text/html", V && this.$el.appendChild(t), t.data = "about:blank", V || this.$el.appendChild(t);
  },
  beforeDestroy: function() {
    this.removeResizeHandlers();
  }
};
function Me(i) {
  i.component("resize-observer", W), i.component("ResizeObserver", W);
}
var Ee = {
  // eslint-disable-next-line no-undef
  version: "0.4.5",
  install: Me
}, M = null;
typeof window < "u" ? M = window.Vue : typeof global < "u" && (M = global.Vue);
M && M.use(Ee);
function D(i) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? D = function(e) {
    return typeof e;
  } : D = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, D(i);
}
function Fe(i, e) {
  if (!(i instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function te(i, e) {
  for (var t = 0; t < e.length; t++) {
    var s = e[t];
    s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(i, s.key, s);
  }
}
function je(i, e, t) {
  return e && te(i.prototype, e), t && te(i, t), i;
}
function ie(i) {
  return Ue(i) || Ke(i) || Be();
}
function Ue(i) {
  if (Array.isArray(i)) {
    for (var e = 0, t = new Array(i.length); e < i.length; e++)
      t[e] = i[e];
    return t;
  }
}
function Ke(i) {
  if (Symbol.iterator in Object(i) || Object.prototype.toString.call(i) === "[object Arguments]")
    return Array.from(i);
}
function Be() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function He(i) {
  var e;
  return typeof i == "function" ? e = {
    callback: i
  } : e = i, e;
}
function We(i, e) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s, n, a, r = function(l) {
    for (var c = arguments.length, u = new Array(c > 1 ? c - 1 : 0), d = 1; d < c; d++)
      u[d - 1] = arguments[d];
    if (a = u, !(s && l === n)) {
      var h = t.leading;
      typeof h == "function" && (h = h(l, n)), (!s || l !== n) && h && i.apply(void 0, [l].concat(ie(a))), n = l, clearTimeout(s), s = setTimeout(function() {
        i.apply(void 0, [l].concat(ie(a))), s = 0;
      }, e);
    }
  };
  return r._clear = function() {
    clearTimeout(s), s = null;
  }, r;
}
function de(i, e) {
  if (i === e)
    return !0;
  if (D(i) === "object") {
    for (var t in i)
      if (!de(i[t], e[t]))
        return !1;
    return !0;
  }
  return !1;
}
var qe = /* @__PURE__ */ function() {
  function i(e, t, s) {
    Fe(this, i), this.el = e, this.observer = null, this.frozen = !1, this.createObserver(t, s);
  }
  return je(i, [{
    key: "createObserver",
    value: function(t, s) {
      var n = this;
      if (this.observer && this.destroyObserver(), !this.frozen) {
        if (this.options = He(t), this.callback = function(o, l) {
          n.options.callback(o, l), o && n.options.once && (n.frozen = !0, n.destroyObserver());
        }, this.callback && this.options.throttle) {
          var a = this.options.throttleOptions || {}, r = a.leading;
          this.callback = We(this.callback, this.options.throttle, {
            leading: function(l) {
              return r === "both" || r === "visible" && l || r === "hidden" && !l;
            }
          });
        }
        this.oldResult = void 0, this.observer = new IntersectionObserver(function(o) {
          var l = o[0];
          if (o.length > 1) {
            var c = o.find(function(d) {
              return d.isIntersecting;
            });
            c && (l = c);
          }
          if (n.callback) {
            var u = l.isIntersecting && l.intersectionRatio >= n.threshold;
            if (u === n.oldResult)
              return;
            n.oldResult = u, n.callback(u, l);
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
  }]), i;
}();
function he(i, e, t) {
  var s = e.value;
  if (s)
    if (typeof IntersectionObserver > "u")
      console.warn("[vue-observe-visibility] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/w3c/IntersectionObserver/tree/master/polyfill");
    else {
      var n = new qe(i, s, t);
      i._vue_visibilityState = n;
    }
}
function Ge(i, e, t) {
  var s = e.value, n = e.oldValue;
  if (!de(s, n)) {
    var a = i._vue_visibilityState;
    if (!s) {
      fe(i);
      return;
    }
    a ? a.createObserver(s, t) : he(i, {
      value: s
    }, t);
  }
}
function fe(i) {
  var e = i._vue_visibilityState;
  e && (e.destroyObserver(), delete i._vue_visibilityState);
}
var pe = {
  bind: he,
  update: Ge,
  unbind: fe
};
function Xe(i) {
  i.directive("observe-visibility", pe);
}
var Ye = {
  // eslint-disable-next-line no-undef
  version: "0.4.6",
  install: Xe
}, E = null;
typeof window < "u" ? E = window.Vue : typeof global < "u" && (E = global.Vue);
E && E.use(Ye);
var P = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function X(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var _e = { exports: {} };
(function(i) {
  (function(e, t) {
    i.exports ? i.exports = t() : e.Scrollparent = t();
  })(P, function() {
    function e(s) {
      var n = getComputedStyle(s, null).getPropertyValue("overflow");
      return n.indexOf("scroll") > -1 || n.indexOf("auto") > -1;
    }
    function t(s) {
      if (s instanceof HTMLElement || s instanceof SVGElement) {
        for (var n = s.parentNode; n.parentNode; ) {
          if (e(n))
            return n;
          n = n.parentNode;
        }
        return document.scrollingElement || document.documentElement;
      }
    }
    return t;
  });
})(_e);
var Je = _e.exports;
const se = /* @__PURE__ */ X(Je);
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
    validator: (i) => ["vertical", "horizontal"].includes(i)
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
let q = !1;
if (typeof window < "u") {
  q = !1;
  try {
    var Qe = Object.defineProperty({}, "passive", {
      get() {
        q = !0;
      }
    });
    window.addEventListener("test", null, Qe);
  } catch {
  }
}
let Ze = 0;
var et = {
  name: "RecycleScroller",
  components: {
    ResizeObserver: W
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
        const i = {
          "-1": {
            accumulator: 0
          }
        }, e = this.items, t = this.sizeField, s = this.minItemSize;
        let n = 1e4, a = 0, r;
        for (let o = 0, l = e.length; o < l; o++)
          r = e[o][t] || s, r < n && (n = r), a += r, i[o] = {
            accumulator: a,
            size: r
          };
        return this.$_computedMinItemSize = n, i;
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
    const i = this.$_lastUpdateScrollPosition;
    typeof i == "number" && this.$nextTick(() => {
      this.scrollToPosition(i);
    });
  },
  beforeDestroy() {
    this.removeListeners();
  },
  methods: {
    addView(i, e, t, s, n) {
      const a = {
        item: t,
        position: 0
      }, r = {
        id: Ze++,
        index: e,
        used: !0,
        key: s,
        type: n
      };
      return Object.defineProperty(a, "nr", {
        configurable: !1,
        value: r
      }), i.push(a), a;
    },
    unuseView(i, e = !1) {
      const t = this.$_unusedViews, s = i.nr.type;
      let n = t.get(s);
      n || (n = [], t.set(s, n)), n.push(i), e || (i.nr.used = !1, i.position = -9999, this.$_views.delete(i.nr.key));
    },
    handleResize() {
      this.$emit("resize"), this.ready && this.updateVisibleItems(!1);
    },
    handleScroll(i) {
      this.$_scrollDirty || (this.$_scrollDirty = !0, requestAnimationFrame(() => {
        this.$_scrollDirty = !1;
        const {
          continuous: e
        } = this.updateVisibleItems(!1, !0);
        e || (clearTimeout(this.$_refreshTimout), this.$_refreshTimout = setTimeout(this.handleScroll, 100));
      }));
    },
    handleVisibilityChange(i, e) {
      this.ready && (i || e.boundingClientRect.width !== 0 || e.boundingClientRect.height !== 0 ? (this.$emit("visible"), requestAnimationFrame(() => {
        this.updateVisibleItems(!1);
      })) : this.$emit("hidden"));
    },
    updateVisibleItems(i, e = !1) {
      const t = this.itemSize, s = this.gridItems || 1, n = this.itemSecondarySize || t, a = this.$_computedMinItemSize, r = this.typeField, o = this.simpleArray ? null : this.keyField, l = this.items, c = l.length, u = this.sizes, d = this.$_views, h = this.$_unusedViews, y = this.pool;
      let m, p, g, b, $;
      if (!c)
        m = p = b = $ = g = 0;
      else if (this.$_prerender)
        m = b = 0, p = $ = Math.min(this.prerender, l.length), g = null;
      else {
        const _ = this.getScroll();
        if (e) {
          let C = _.start - this.$_lastUpdateScrollPosition;
          if (C < 0 && (C = -C), t === null && C < a || C < t)
            return {
              continuous: !0
            };
        }
        this.$_lastUpdateScrollPosition = _.start;
        const z = this.buffer;
        _.start -= z, _.end += z;
        let A = 0;
        if (this.$refs.before && (A = this.$refs.before.scrollHeight, _.start -= A), this.$refs.after) {
          const C = this.$refs.after.scrollHeight;
          _.end += C;
        }
        if (t === null) {
          let C, J = 0, Q = c - 1, k = ~~(c / 2), Z;
          do
            Z = k, C = u[k].accumulator, C < _.start ? J = k : k < c - 1 && u[k + 1].accumulator > _.start && (Q = k), k = ~~((J + Q) / 2);
          while (k !== Z);
          for (k < 0 && (k = 0), m = k, g = u[c - 1].accumulator, p = k; p < c && u[p].accumulator < _.end; p++)
            ;
          for (p === -1 ? p = l.length - 1 : (p++, p > c && (p = c)), b = m; b < c && A + u[b].accumulator < _.start; b++)
            ;
          for ($ = b; $ < c && A + u[$].accumulator < _.end; $++)
            ;
        } else {
          m = ~~(_.start / t * s);
          const C = m % s;
          m -= C, p = Math.ceil(_.end / t * s), b = Math.max(0, Math.floor((_.start - A) / t * s)), $ = Math.floor((_.end - A) / t * s), m < 0 && (m = 0), p > c && (p = c), b < 0 && (b = 0), $ > c && ($ = c), g = Math.ceil(c / s) * t;
        }
      }
      p - m > me.itemsLimit && this.itemsLimitError(), this.totalSize = g;
      let f;
      const T = m <= this.$_endIndex && p >= this.$_startIndex;
      if (this.$_continuous !== T) {
        if (T) {
          d.clear(), h.clear();
          for (let _ = 0, z = y.length; _ < z; _++)
            f = y[_], this.unuseView(f);
        }
        this.$_continuous = T;
      } else if (T)
        for (let _ = 0, z = y.length; _ < z; _++)
          f = y[_], f.nr.used && (i && (f.nr.index = l.indexOf(f.item)), (f.nr.index === -1 || f.nr.index < m || f.nr.index >= p) && this.unuseView(f));
      const N = T ? null : /* @__PURE__ */ new Map();
      let v, S, w, O;
      for (let _ = m; _ < p; _++) {
        v = l[_];
        const z = o ? v[o] : v;
        if (z == null)
          throw new Error(`Key is ${z} on item (keyField is '${o}')`);
        if (f = d.get(z), !t && !u[_].size) {
          f && this.unuseView(f);
          continue;
        }
        f ? (f.nr.used = !0, f.item = v) : (_ === l.length - 1 && this.$emit("scroll-end"), _ === 0 && this.$emit("scroll-start"), S = v[r], w = h.get(S), T ? w && w.length ? (f = w.pop(), f.item = v, f.nr.used = !0, f.nr.index = _, f.nr.key = z, f.nr.type = S) : f = this.addView(y, _, v, z, S) : (O = N.get(S) || 0, (!w || O >= w.length) && (f = this.addView(y, _, v, z, S), this.unuseView(f, !0), w = h.get(S)), f = w[O], f.item = v, f.nr.used = !0, f.nr.index = _, f.nr.key = z, f.nr.type = S, N.set(S, O + 1), O++), d.set(z, f)), t === null ? (f.position = u[_ - 1].accumulator, f.offset = 0) : (f.position = Math.floor(_ / s) * t, f.offset = _ % s * n);
      }
      return this.$_startIndex = m, this.$_endIndex = p, this.emitUpdate && this.$emit("update", m, p, b, $), clearTimeout(this.$_sortTimer), this.$_sortTimer = setTimeout(this.sortViews, 300), {
        continuous: T
      };
    },
    getListenerTarget() {
      let i = se(this.$el);
      return window.document && (i === window.document.documentElement || i === window.document.body) && (i = window), i;
    },
    getScroll() {
      const {
        $el: i,
        direction: e
      } = this, t = e === "vertical";
      let s;
      if (this.pageMode) {
        const n = i.getBoundingClientRect(), a = t ? n.height : n.width;
        let r = -(t ? n.top : n.left), o = t ? window.innerHeight : window.innerWidth;
        r < 0 && (o += r, r = 0), r + o > a && (o = a - r), s = {
          start: r,
          end: r + o
        };
      } else
        t ? s = {
          start: i.scrollTop,
          end: i.scrollTop + i.clientHeight
        } : s = {
          start: i.scrollLeft,
          end: i.scrollLeft + i.clientWidth
        };
      return s;
    },
    applyPageMode() {
      this.pageMode ? this.addListeners() : this.removeListeners();
    },
    addListeners() {
      this.listenerTarget = this.getListenerTarget(), this.listenerTarget.addEventListener("scroll", this.handleScroll, q ? {
        passive: !0
      } : !1), this.listenerTarget.addEventListener("resize", this.handleResize);
    },
    removeListeners() {
      this.listenerTarget && (this.listenerTarget.removeEventListener("scroll", this.handleScroll), this.listenerTarget.removeEventListener("resize", this.handleResize), this.listenerTarget = null);
    },
    scrollToItem(i) {
      let e;
      this.itemSize === null ? e = i > 0 ? this.sizes[i - 1].accumulator : 0 : e = Math.floor(i / this.gridItems) * this.itemSize, this.scrollToPosition(e);
    },
    scrollToPosition(i) {
      const e = this.direction === "vertical" ? {
        scroll: "scrollTop",
        start: "top"
      } : {
        scroll: "scrollLeft",
        start: "left"
      };
      let t, s, n;
      if (this.pageMode) {
        const a = se(this.$el), r = a.tagName === "HTML" ? 0 : a[e.scroll], o = a.getBoundingClientRect(), c = this.$el.getBoundingClientRect()[e.start] - o[e.start];
        t = a, s = e.scroll, n = i + r + c;
      } else
        t = this.$el, s = e.scroll, n = i;
      t[s] = n;
    },
    itemsLimitError() {
      throw setTimeout(() => {
        console.log("It seems the scroller element isn't scrolling, so it tries to render all the items at once.", "Scroller:", this.$el), console.log("Make sure the scroller has a fixed height (or width) and 'overflow-y' (or 'overflow-x') set to 'auto' so it can scroll correctly and only render the items visible in the scroll viewport.");
      }), new Error("Rendered items limit reached");
    },
    sortViews() {
      this.pool.sort((i, e) => i.nr.index - e.nr.index);
    }
  }
};
function Y(i, e, t, s, n, a, r, o, l, c) {
  typeof r != "boolean" && (l = o, o = r, r = !1);
  const u = typeof t == "function" ? t.options : t;
  i && i.render && (u.render = i.render, u.staticRenderFns = i.staticRenderFns, u._compiled = !0, n && (u.functional = !0)), s && (u._scopeId = s);
  let d;
  if (a ? (d = function(h) {
    h = h || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !h && typeof __VUE_SSR_CONTEXT__ < "u" && (h = __VUE_SSR_CONTEXT__), e && e.call(this, l(h)), h && h._registeredComponents && h._registeredComponents.add(a);
  }, u._ssrRegister = d) : e && (d = r ? function(h) {
    e.call(this, c(h, this.$root.$options.shadowRoot));
  } : function(h) {
    e.call(this, o(h));
  }), d)
    if (u.functional) {
      const h = u.render;
      u.render = function(m, p) {
        return d.call(p), h(m, p);
      };
    } else {
      const h = u.beforeCreate;
      u.beforeCreate = h ? [].concat(h, d) : [d];
    }
  return t;
}
const tt = et;
var ge = function() {
  var i, e, t = this, s = t.$createElement, n = t._self._c || s;
  return n(
    "div",
    {
      directives: [
        {
          name: "observe-visibility",
          rawName: "v-observe-visibility",
          value: t.handleVisibilityChange,
          expression: "handleVisibilityChange"
        }
      ],
      staticClass: "vue-recycle-scroller",
      class: (i = {
        ready: t.ready,
        "page-mode": t.pageMode
      }, i["direction-" + t.direction] = !0, i),
      on: {
        "&scroll": function(a) {
          return t.handleScroll.apply(null, arguments);
        }
      }
    },
    [
      t.$slots.before ? n(
        "div",
        { ref: "before", staticClass: "vue-recycle-scroller__slot" },
        [t._t("before")],
        2
      ) : t._e(),
      t._v(" "),
      n(
        t.listTag,
        {
          ref: "wrapper",
          tag: "component",
          staticClass: "vue-recycle-scroller__item-wrapper",
          class: t.listClass,
          style: (e = {}, e[t.direction === "vertical" ? "minHeight" : "minWidth"] = t.totalSize + "px", e)
        },
        [
          t._l(t.pool, function(a) {
            return n(
              t.itemTag,
              t._g(
                {
                  key: a.nr.id,
                  tag: "component",
                  staticClass: "vue-recycle-scroller__item-view",
                  class: [
                    t.itemClass,
                    {
                      hover: !t.skipHover && t.hoverKey === a.nr.key
                    }
                  ],
                  style: t.ready ? {
                    transform: "translate" + (t.direction === "vertical" ? "Y" : "X") + "(" + a.position + "px) translate" + (t.direction === "vertical" ? "X" : "Y") + "(" + a.offset + "px)",
                    width: t.gridItems ? (t.direction === "vertical" && t.itemSecondarySize || t.itemSize) + "px" : void 0,
                    height: t.gridItems ? (t.direction === "horizontal" && t.itemSecondarySize || t.itemSize) + "px" : void 0
                  } : null
                },
                t.skipHover ? {} : {
                  mouseenter: function() {
                    t.hoverKey = a.nr.key;
                  },
                  mouseleave: function() {
                    t.hoverKey = null;
                  }
                }
              ),
              [
                t._t("default", null, {
                  item: a.item,
                  index: a.nr.index,
                  active: a.nr.used
                })
              ],
              2
            );
          }),
          t._v(" "),
          t._t("empty")
        ],
        2
      ),
      t._v(" "),
      t.$slots.after ? n(
        "div",
        { ref: "after", staticClass: "vue-recycle-scroller__slot" },
        [t._t("after")],
        2
      ) : t._e(),
      t._v(" "),
      n("ResizeObserver", { on: { notify: t.handleResize } })
    ],
    1
  );
}, it = [];
ge._withStripped = !0;
const st = void 0, nt = void 0, rt = void 0, lt = !1, F = /* @__PURE__ */ Y(
  { render: ge, staticRenderFns: it },
  st,
  tt,
  nt,
  lt,
  rt,
  !1,
  void 0,
  void 0,
  void 0
);
var ot = {
  name: "DynamicScroller",
  components: {
    RecycleScroller: F
  },
  provide() {
    return typeof ResizeObserver < "u" && (this.$_resizeObserver = new ResizeObserver((i) => {
      requestAnimationFrame(() => {
        if (Array.isArray(i)) {
          for (const e of i)
            if (e.target) {
              const t = new CustomEvent("resize", {
                detail: {
                  contentRect: e.contentRect
                }
              });
              e.target.dispatchEvent(t);
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
      const i = [], {
        items: e,
        keyField: t,
        simpleArray: s
      } = this, n = this.vscrollData.sizes, a = e.length;
      for (let r = 0; r < a; r++) {
        const o = e[r], l = s ? r : o[t];
        let c = n[l];
        typeof c > "u" && !this.$_undefinedMap[l] && (c = 0), i.push({
          item: o,
          id: l,
          size: c
        });
      }
      return i;
    },
    listeners() {
      const i = {};
      for (const e in this.$listeners)
        e !== "resize" && e !== "visible" && (i[e] = this.$listeners[e]);
      return i;
    }
  },
  watch: {
    items() {
      this.forceUpdate(!1);
    },
    simpleArray: {
      handler(i) {
        this.vscrollData.simpleArray = i;
      },
      immediate: !0
    },
    direction(i) {
      this.forceUpdate(!0);
    },
    itemsWithSize(i, e) {
      const t = this.$el.scrollTop;
      let s = 0, n = 0;
      const a = Math.min(i.length, e.length);
      for (let o = 0; o < a && !(s >= t); o++)
        s += e[o].size || this.minItemSize, n += i[o].size || this.minItemSize;
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
    forceUpdate(i = !0) {
      (i || this.simpleArray) && (this.vscrollData.validSizes = {}), this.$emit("vscroll:update", {
        force: !0
      });
    },
    scrollToItem(i) {
      const e = this.$refs.scroller;
      e && e.scrollToItem(i);
    },
    getItemSize(i, e = void 0) {
      const t = this.simpleArray ? e ?? this.items.indexOf(i) : i[this.keyField];
      return this.vscrollData.sizes[t] || 0;
    },
    scrollToBottom() {
      if (this.$_scrollingToBottom)
        return;
      this.$_scrollingToBottom = !0;
      const i = this.$el;
      this.$nextTick(() => {
        i.scrollTop = i.scrollHeight + 5e3;
        const e = () => {
          i.scrollTop = i.scrollHeight + 5e3, requestAnimationFrame(() => {
            i.scrollTop = i.scrollHeight + 5e3, this.$_undefinedSizes === 0 ? this.$_scrollingToBottom = !1 : requestAnimationFrame(e);
          });
        };
        requestAnimationFrame(e);
      });
    }
  }
};
const at = ot;
var be = function() {
  var i = this, e = i.$createElement, t = i._self._c || e;
  return t(
    "RecycleScroller",
    i._g(
      i._b(
        {
          ref: "scroller",
          attrs: {
            items: i.itemsWithSize,
            "min-item-size": i.minItemSize,
            direction: i.direction,
            "key-field": "id",
            "list-tag": i.listTag,
            "item-tag": i.itemTag
          },
          on: { resize: i.onScrollerResize, visible: i.onScrollerVisible },
          scopedSlots: i._u(
            [
              {
                key: "default",
                fn: function(s) {
                  var n = s.item, a = s.index, r = s.active;
                  return [
                    i._t("default", null, null, {
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
        i.$attrs,
        !1
      ),
      i.listeners
    ),
    [
      i._v(" "),
      t("template", { slot: "before" }, [i._t("before")], 2),
      i._v(" "),
      t("template", { slot: "after" }, [i._t("after")], 2),
      i._v(" "),
      t("template", { slot: "empty" }, [i._t("empty")], 2)
    ],
    2
  );
}, ct = [];
be._withStripped = !0;
const ut = void 0, dt = void 0, ht = void 0, ft = !1, ne = /* @__PURE__ */ Y(
  { render: be, staticRenderFns: ct },
  ut,
  at,
  dt,
  ft,
  ht,
  !1,
  void 0,
  void 0,
  void 0
);
var pt = {
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
    finalActive(i) {
      this.size || (i ? this.vscrollParent.$_undefinedMap[this.id] || (this.vscrollParent.$_undefinedSizes++, this.vscrollParent.$_undefinedMap[this.id] = !0) : this.vscrollParent.$_undefinedMap[this.id] && (this.vscrollParent.$_undefinedSizes--, this.vscrollParent.$_undefinedMap[this.id] = !1)), this.vscrollResizeObserver ? i ? this.observeSize() : this.unobserveSize() : i && this.$_pendingVScrollUpdate === this.id && this.updateSize();
    }
  },
  created() {
    if (!this.$isServer && (this.$_forceNextVScrollUpdate = null, this.updateWatchData(), !this.vscrollResizeObserver)) {
      for (const i in this.sizeDependencies)
        this.$watch(() => this.sizeDependencies[i], this.onDataUpdate);
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
      force: i
    }) {
      !this.finalActive && i && (this.$_pendingVScrollUpdate = this.id), (this.$_forceNextVScrollUpdate === this.id || i || !this.size) && this.updateSize();
    },
    onDataUpdate() {
      this.updateSize();
    },
    computeSize(i) {
      this.$nextTick(() => {
        if (this.id === i) {
          const e = this.$el.offsetWidth, t = this.$el.offsetHeight;
          this.applySize(e, t);
        }
        this.$_pendingSizeUpdate = null;
      });
    },
    applySize(i, e) {
      const t = ~~(this.vscrollParent.direction === "vertical" ? e : i);
      t && this.size !== t && (this.vscrollParent.$_undefinedMap[this.id] && (this.vscrollParent.$_undefinedSizes--, this.vscrollParent.$_undefinedMap[this.id] = void 0), this.$set(this.vscrollData.sizes, this.id, t), this.$set(this.vscrollData.validSizes, this.id, !0), this.emitResize && this.$emit("resize", this.id));
    },
    observeSize() {
      !this.vscrollResizeObserver || !this.$el.parentNode || (this.vscrollResizeObserver.observe(this.$el.parentNode), this.$el.parentNode.addEventListener("resize", this.onResize));
    },
    unobserveSize() {
      this.vscrollResizeObserver && (this.vscrollResizeObserver.unobserve(this.$el.parentNode), this.$el.parentNode.removeEventListener("resize", this.onResize));
    },
    onResize(i) {
      const {
        width: e,
        height: t
      } = i.detail.contentRect;
      this.applySize(e, t);
    }
  },
  render(i) {
    return i(this.tag, this.$slots.default);
  }
};
const _t = pt, mt = void 0, vt = void 0, yt = void 0, gt = void 0, re = /* @__PURE__ */ Y(
  {},
  mt,
  _t,
  vt,
  gt,
  yt,
  !1,
  void 0,
  void 0,
  void 0
);
function bt(i, e) {
  i.component(`${e}recycle-scroller`, F), i.component(`${e}RecycleScroller`, F), i.component(`${e}dynamic-scroller`, ne), i.component(`${e}DynamicScroller`, ne), i.component(`${e}dynamic-scroller-item`, re), i.component(`${e}DynamicScrollerItem`, re);
}
const St = {
  // eslint-disable-next-line no-undef
  version: "1.1.2",
  install(i, e) {
    const t = Object.assign({}, {
      installComponents: !0,
      componentsPrefix: ""
    }, e);
    for (const s in t)
      typeof t[s] < "u" && (me[s] = t[s]);
    t.installComponents && bt(i, t.componentsPrefix);
  }
};
let j = null;
typeof window < "u" ? j = window.Vue : typeof global < "u" && (j = global.Vue);
j && j.use(St);
function U(i, e, t, s, n, a, r, o) {
  var l = typeof i == "function" ? i.options : i;
  e && (l.render = e, l.staticRenderFns = t, l._compiled = !0), s && (l.functional = !0), a && (l._scopeId = "data-v-" + a);
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
      var u = l.render;
      l.render = function(y, m) {
        return c.call(m), u(y, m);
      };
    } else {
      var d = l.beforeCreate;
      l.beforeCreate = d ? [].concat(d, c) : [c];
    }
  return {
    exports: i,
    options: l
  };
}
const $t = {
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
  setup(i, { emit: e }) {
    const t = i, s = ee(() => {
      var d;
      const c = a.value.length, u = (d = a.value.filter((h) => h.checked)) == null ? void 0 : d.length;
      return {
        indeterminate: !!u && u !== c,
        checked: !!u && u === c
      };
    }), n = I(""), a = ee(() => {
      var c;
      return (c = t.panelOptions) == null ? void 0 : c.filter((u) => !n.value || u.label.includes(n.value));
    }), { handleSelectAll: r, handleSelectChange: o } = Ve(e);
    return { __sfc: !0, emit: e, props: t, panelStatus: s, resultSearchKey: n, panelShowOptions: a, handleSelectAll: r, handleSelectChange: o, highLightLabel: (c) => {
      let u = t.isResultPanel ? n.value : t.globalSearchWord;
      return u ? c.split(u).join(`<span style="color: #266BF6">${u}</span>`) : c;
    }, RecycleScroller: F };
  }
};
var zt = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", { staticClass: "cascader-panel", style: { width: `calc(100% / ${s.props.cascaderMaxLevel})` } }, [t("div", { staticClass: "cascader-panel__head" }, [e.supportSelectAll ? t("div", [t("el-checkbox", { attrs: { value: s.panelStatus.checked, indeterminate: s.panelStatus.indeterminate, disabled: !s.panelShowOptions.length }, on: { change: (n) => s.handleSelectAll(s.props.panelOptions, n) } }), e._v(" 全选 ")], 1) : e._e(), e.panelMenuTitle ? t("label", [e._v(e._s(s.props.panelMenuTitle))]) : e._e(), e.isResultPanel && e.showResultSearch ? t("el-input", { staticStyle: { width: "160px" }, attrs: { placeholder: "请输入", size: "small", clearable: "", "suffix-icon": "el-icon-search" }, model: { value: s.resultSearchKey, callback: function(n) {
    s.resultSearchKey = typeof n == "string" ? n.trim() : n;
  }, expression: "resultSearchKey" } }) : e._e()], 1), t("div", { staticClass: "cascader-panel__menu" }, [e.isResultPanel && e.showResultCount ? t("div", { staticClass: "cascader-panel__menu__operate" }, [t("span", [e._v("已添加(" + e._s(e.panelOptions.length) + "条)")]), t("el-button", { attrs: { type: "text", disabled: !s.panelStatus.checked && !s.panelStatus.indeterminate }, on: { click: function(n) {
    return s.emit("removeSelectedCate");
  } } }, [e._v("移除")])], 1) : e._e(), s.panelShowOptions.length ? t("div", [t(s.RecycleScroller, { style: { height: e.isResultPanel && e.showResultSearch ? "289px" : "325px" }, attrs: { items: s.panelShowOptions, "item-size": 32, "key-field": "value", buffer: 100 }, scopedSlots: e._u([{ key: "default", fn: function({ item: n, index: a }) {
    return [t("div", { staticClass: "cascader-panel__menu__item" }, [t("el-checkbox", { attrs: { value: n.checked, indeterminate: n.indeterminate, disabled: n.disabled }, on: { change: (r) => s.handleSelectChange(r, n) } }), t("div", { staticClass: "menu-item", class: { "menu-item__danger": s.props.colorDangerField && n[s.props.colorDangerField], "menu-item__active": e.panelActiveList[s.props.curPanelLevel] && n.value === e.panelActiveList[s.props.curPanelLevel].value }, attrs: { title: n.label }, domProps: { innerHTML: e._s(s.highLightLabel(n.label)) }, on: { click: function(r) {
      return s.emit("clickMenuItem", n);
    } } })], 1)];
  } }], null, !1, 742864597) })], 1) : t("div", { staticClass: "cascader-panel__menu__empty" }, [e._v(e._s(s.props.emptyText))])])]);
}, wt = [], Ct = /* @__PURE__ */ U(
  $t,
  zt,
  wt,
  !1,
  null,
  null,
  null,
  null
);
const Se = Ct.exports;
const kt = {
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
  setup(i, { expose: e }) {
    const t = i, s = I([]), n = (r) => {
      var l, c, u;
      if (r === 0)
        return (l = t.options) == null ? void 0 : l.filter((d) => d.menuNodeShow);
      let o = (c = s.value) == null ? void 0 : c[r - 1];
      return ((u = o == null ? void 0 : o.children) == null ? void 0 : u.filter((d) => d.menuNodeShow)) || [];
    }, a = (r) => {
      var u;
      const o = (r == null ? void 0 : r.level) || 0, l = (u = s.value) == null ? void 0 : u.slice(0, o);
      l.push(r);
      let c = r;
      for (; c && c.children; ) {
        const d = c == null ? void 0 : c.getVisibleChild();
        c = (d == null ? void 0 : d.find((h) => h.checked || h.indeterminate)) || (d == null ? void 0 : d[0]), l.push(c);
      }
      s.value = l;
    };
    return ue(() => t.options, (r) => {
      (!Array.isArray(r) || !r.length) && (s.value = []);
      let o = r == null ? void 0 : r.find((l) => l.checked || l.indeterminate);
      a(o || (r == null ? void 0 : r[0]));
    }), e({ convertActive: a }), { __sfc: !0, props: t, panelActiveNode: s, getPanelOptions: n, convertActive: a, CascaderPanel: Se };
  }
};
var Rt = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", { staticClass: "cascader-select" }, e._l(s.props.cascaderMaxLevel + 1, function(n) {
    return t(s.CascaderPanel, { key: n, attrs: { "cur-panel-level": n - 1, "cascader-max-level": s.props.cascaderMaxLevel, "panel-options": s.getPanelOptions(n - 1), "panel-menu-title": e.panelTitleList[n - 1], "panel-active-list": s.panelActiveNode, "global-search-word": e.globalSearchWord }, on: { clickMenuItem: s.convertActive } });
  }), 1);
}, Tt = [], xt = /* @__PURE__ */ U(
  kt,
  Rt,
  Tt,
  !1,
  null,
  "0937b566",
  null,
  null
);
const Ot = xt.exports;
const It = {
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
  setup(i) {
    return { __sfc: !0, props: i, CascaderPanel: Se };
  }
};
var Nt = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", { staticClass: "cascader-result" }, [t(s.CascaderPanel, e._g({ attrs: { "is-result-panel": "", cascaderMaxLevel: 1, "show-result-search": s.props.showResultSearch, "show-rsult-count": s.props.showResultCount, "panel-options": s.props.resultOptions, "cur-panel-level": 0 } }, e.$listeners))], 1);
}, At = [], Pt = /* @__PURE__ */ U(
  It,
  Nt,
  At,
  !1,
  null,
  "b2705c62",
  null,
  null
);
const Lt = Pt.exports;
var $e = { exports: {} };
(function(i) {
  (function(e, t) {
    if (i.exports)
      i.exports = t();
    else {
      var s = e.shortid, n = t();
      n.noConflict = function() {
        return e.shortid = s, n;
      }, e.shortid = n;
    }
  })(P, function() {
    var e = 14603328e5, t = [
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
        var l = this._opt, c = l.symbols || t, u = "";
        if (o > c.length || o <= 1)
          return !1;
        for (; r >= 1; )
          u = c[r - o * Math.floor(r / o)] + u, r = Math.floor(r / o);
        return o < 11 ? parseInt(u) : u;
      },
      _salts: function() {
        for (var r = this, o = r._opt, l = o.salts || 2, c = "", u = 0; u < l; u++) {
          var d = Math.floor(Math.random() * 3844);
          c += n("00", r._toBase(d, s));
        }
        return c;
      },
      gen: function() {
        var r = this, o = r._opt, l = o.interval || 1, c = o.initTime || e, u = l > 0 ? Math.floor(((/* @__PURE__ */ new Date()).getTime() - c) / l) : 0, d = r._salts();
        return u === 0 ? d : r._toBase(u, s) + d;
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
var Vt = $e.exports;
const Dt = /* @__PURE__ */ X(Vt), R = ",";
class Mt {
  constructor({
    data: e = {},
    level: t = 0,
    leaf: s = !1,
    parent: n = null,
    children: a = [],
    store: r,
    indeterminate: o,
    checked: l
  }) {
    this.uid = Dt.gen(), this.value = e.value, this.label = e.label, this.level = t, this.leaf = s, this.parent = n, this.children = a, this.disabled = !!e.disabled, this.path = e.path || this.formatPath(), this.pathName = e.pathName || this.formatLabel(), this.store = r, this.leafNodesNum = 0, this.checked = l, this.indeterminate = o, this.sensitiveFlag = e.sensitiveFlag, this.menuNodeShow = !0;
  }
  formatKeyFromParent(e) {
    const t = [this == null ? void 0 : this[e]];
    let s = this.parent;
    for (; s; )
      t.unshift(s == null ? void 0 : s[e]), s = s == null ? void 0 : s.parent;
    return t;
  }
  formatPath() {
    return this.formatKeyFromParent("value");
  }
  formatLabel() {
    return this.formatKeyFromParent("label");
  }
  getVisibleChild() {
    return (this.children || []).filter((t) => t.menuNodeShow);
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
  changeShowStatus(e, t = !1) {
    const s = (r) => r ? r.label.includes(e) ? !0 : !!s(r.parent) : !1, n = (r) => {
      if (!e)
        return !0;
      if (!r || !(r != null && r.label))
        return !1;
      if (r.label.includes(e))
        return !0;
      if (t)
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
    var t;
    this.changeCheckVal(e), this.changeChildStatus(e), this.changeParentStatus(e), typeof ((t = this.store) == null ? void 0 : t.onNodeChange) == "function" && this.store.onNodeChange(this);
  }
  changeChildStatus(e) {
    if (!this.leaf)
      for (let t of this.getVisibleChild())
        t == null || t.changeCheckVal(e), t == null || t.changeChildStatus(e);
  }
  findSiblings() {
    if (!this.parent)
      return [];
    const e = this.parent.children;
    return Array.isArray(e) ? e : [];
  }
  findLeafs(e = !1) {
    const t = [], s = (n) => {
      n && (n.leaf && (!e || n.menuNodeShow) && t.push(n), n != null && n.children && (n != null && n.children.length) && n.children.forEach((a) => s(a)));
    };
    return s(this), t;
  }
  changeParentStatus() {
    var a, r;
    if (!this.parent)
      return;
    const e = ((a = this.findSiblings()) == null ? void 0 : a.filter((o) => o.menuNodeShow)) || [], t = (r = e.filter((o) => o.checked)) == null ? void 0 : r.length, s = e.some((o) => o.indeterminate), n = t ? t === e.length ? "checked" : "indeterminate" : s ? "indeterminate" : "empty";
    this.parent.changeCompStatus(n), this.parent.changeParentStatus();
  }
}
const L = {
  resultChange: "resultChange",
  checkedNode: "checkedNode"
};
class le {
  constructor(e = [], t = [], s = 2) {
    this.nodesTree = [], this.result = /* @__PURE__ */ new Map(), this.callbacks = {}, this.initLists(e, t, s);
  }
  onNodeChange(e) {
    e.checked ? this.onChecked(e) : this.onCancelCheck(e), this.emitChange(L.checkedNode, this.result);
  }
  hasParentKeyInEdit(e, t) {
    return !e || !t ? !1 : t.some((s) => e.join(R).startsWith(s + R));
  }
  listenChange(e, t) {
    typeof t == "function" && (this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(t));
  }
  emitChange(e, t) {
    const s = this.callbacks[e];
    s && s.forEach((n) => n(t));
  }
  delKeysFromResult(e = []) {
    e.forEach((t) => {
      this.result.delete(t);
    }), this.emitChange(L.resultChange, this.result);
  }
  insetKeyInResult(e, t) {
    this.result.set(e.join(R), t), this.emitChange(L.resultChange, this.result);
  }
  onChecked(e) {
    const { path: t, leafNodesNum: s } = e;
    let n = e.findLeafs(!0) || [];
    if (n.length === s) {
      this.insetKeyInResult(t, e);
      const r = (l) => {
        if (!l.parent)
          return;
        const c = l.findSiblings();
        let u = !0;
        for (let d of c)
          if (!d.checked) {
            u = !1;
            break;
          }
        if (u) {
          let d = c.map((h) => h.path.join(R));
          this.delKeysFromResult(d), this.insetKeyInResult(l.parent.path, l.parent), r(l.parent);
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
    let t = e.join(R);
    if (!t)
      return [];
    const s = [], n = new RegExp(`^${t}${R}.+$`);
    for (const a of this.result.keys())
      n.test(a) && s.push(a);
    return s;
  }
  onCancelCheck(e) {
    if (!e.path)
      return;
    const t = (n) => {
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
      }), this.delKeysFromResult([n.parent.path.join(R)]), t(n.parent));
    };
    t(e), this.delKeysFromResult([e.path.join(R)]);
    const s = this.getChildKeysFromResult(e.path);
    this.delKeysFromResult(s);
  }
  initLists(e = [], t, s) {
    const n = (a = [], r = 0, o = null) => a == null ? void 0 : a.map((l) => {
      var h;
      const c = !((h = l == null ? void 0 : l.children) != null && h.length) || r === s, u = {
        data: l,
        level: r,
        leaf: c,
        parent: o,
        checked: !1,
        indeterminate: !1,
        children: (l == null ? void 0 : l.children) || null,
        store: this
      }, d = new Mt(u);
      if (l != null && l.children && d.changeChildrenVal(n(l.children, r + 1, d)), d.leafNodesNum = d.leaf ? 1 : d.children.reduce((y, m) => y + m.leafNodesNum, 0), t.length) {
        let y = t.filter((g) => g.startsWith(d.path.join(","))).length, m = t.some((g) => d.path.join(",").startsWith(g)), p = t.find((g) => g === d.path.join(","));
        d.checked = m || y === d.leafNodesNum, d.indeterminate = !!y && y < d.leafNodesNum && !p, d.checked && !this.hasParentKeyInEdit(d.path, t) && this.insetKeyInResult(d.path, d);
      }
      return d;
    });
    this.nodesTree = n(e);
  }
  getNodesTree() {
    return this.nodesTree;
  }
  getNodeByPath(e) {
    if (!e || !Array.isArray(e))
      return null;
    let t = this.nodesTree, s = null;
    for (let n in e) {
      if (s = t.find((a) => a.value === e[n]), !s)
        return null;
      t = s.children;
    }
    return s;
  }
}
var Et = "Expected a function", oe = 0 / 0, Ft = "[object Symbol]", jt = /^\s+|\s+$/g, Ut = /^[-+]0x[0-9a-f]+$/i, Kt = /^0b[01]+$/i, Bt = /^0o[0-7]+$/i, Ht = parseInt, Wt = typeof P == "object" && P && P.Object === Object && P, qt = typeof self == "object" && self && self.Object === Object && self, Gt = Wt || qt || Function("return this")(), Xt = Object.prototype, Yt = Xt.toString, Jt = Math.max, Qt = Math.min, K = function() {
  return Gt.Date.now();
};
function Zt(i, e, t) {
  var s, n, a, r, o, l, c = 0, u = !1, d = !1, h = !0;
  if (typeof i != "function")
    throw new TypeError(Et);
  e = ae(e) || 0, G(t) && (u = !!t.leading, d = "maxWait" in t, a = d ? Jt(ae(t.maxWait) || 0, e) : a, h = "trailing" in t ? !!t.trailing : h);
  function y(v) {
    var S = s, w = n;
    return s = n = void 0, c = v, r = i.apply(w, S), r;
  }
  function m(v) {
    return c = v, o = setTimeout(b, e), u ? y(v) : r;
  }
  function p(v) {
    var S = v - l, w = v - c, O = e - S;
    return d ? Qt(O, a - w) : O;
  }
  function g(v) {
    var S = v - l, w = v - c;
    return l === void 0 || S >= e || S < 0 || d && w >= a;
  }
  function b() {
    var v = K();
    if (g(v))
      return $(v);
    o = setTimeout(b, p(v));
  }
  function $(v) {
    return o = void 0, h && s ? y(v) : (s = n = void 0, r);
  }
  function f() {
    o !== void 0 && clearTimeout(o), c = 0, s = l = n = o = void 0;
  }
  function T() {
    return o === void 0 ? r : $(K());
  }
  function N() {
    var v = K(), S = g(v);
    if (s = arguments, n = this, l = v, S) {
      if (o === void 0)
        return m(l);
      if (d)
        return o = setTimeout(b, e), y(l);
    }
    return o === void 0 && (o = setTimeout(b, e)), r;
  }
  return N.cancel = f, N.flush = T, N;
}
function G(i) {
  var e = typeof i;
  return !!i && (e == "object" || e == "function");
}
function ei(i) {
  return !!i && typeof i == "object";
}
function ti(i) {
  return typeof i == "symbol" || ei(i) && Yt.call(i) == Ft;
}
function ae(i) {
  if (typeof i == "number")
    return i;
  if (ti(i))
    return oe;
  if (G(i)) {
    var e = typeof i.valueOf == "function" ? i.valueOf() : i;
    i = G(e) ? e + "" : e;
  }
  if (typeof i != "string")
    return i === 0 ? i : +i;
  i = i.replace(jt, "");
  var t = Kt.test(i);
  return t || Bt.test(i) ? Ht(i.slice(2), t ? 2 : 8) : Ut.test(i) ? oe : +i;
}
var ii = Zt;
const ce = /* @__PURE__ */ X(ii), si = ({
  options: i = [],
  cascaderMaxLevel: e = 2,
  value: t = [],
  needResultPanel: s = !0,
  resultLabelJoiner: n = " > "
}, a) => {
  const r = I(null), o = I(null), l = I(null), c = () => {
    let y = [];
    t.length && (y = t == null ? void 0 : t.map((p) => p.join(","))), r.value = new le(i, y, e);
    const m = ce((p) => {
      let g = [];
      for (let [, b] of p)
        g.push(b.path);
      a && a("change", g);
    }, 300);
    if (r.value.listenChange(L.checkedNode, m), s) {
      const p = ce((g) => {
        u(g);
      });
      r.value.listenChange(L.resultChange, p), y && y.length && u(r.value.result);
    }
    l.value = r.value.getNodesTree();
  }, u = (y) => {
    let m = [];
    if (y)
      for (let [, g] of y)
        m.push(g);
    const p = (g) => g.reduce((b, $) => [...b, ...$.findLeafs().map((f) => ({
      ...f,
      value: f.path.join(","),
      label: f.pathName.join(n)
    }))], []);
    o.value = new le(p(m));
  };
  return {
    formatOptions: l,
    resultStore: o,
    initMenuStore: c,
    handleDestroyed: () => {
      r.value = null, o.value = null;
    },
    removeSelectedCate: () => {
      if (!o.value)
        return;
      const m = o.value.getNodesTree().filter((g) => g.checked);
      let p = r.value;
      m.forEach((g) => {
        const b = p.getNodeByPath(g.path);
        b && b.onCheckedClick(!1);
      });
    }
  };
}, ni = (i = null) => ({
  handleSearch: (t, s, n = !0) => {
    const a = (r) => {
      for (let o of r)
        o.changeShowStatus(s, n), o.children && o.children.length && a(o.children);
    };
    a(t), t.forEach((r) => {
      var l;
      ((l = r.findLeafs(!0)) == null ? void 0 : l.filter((c) => c.checked)).forEach((c) => {
        c.onCheckedClick(!0);
      });
    }), ze(() => {
      var o;
      let r = t.filter((l) => !!l.menuNodeShow);
      (o = i.value) == null || o.convertActive(r.find((l) => l.checked || l.indeterminate) || (r == null ? void 0 : r[0]));
    });
  }
}), ri = we({
  name: "CascaderTreeSelect"
}), li = /* @__PURE__ */ Object.assign(ri, {
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
  setup(i, { emit: e }) {
    const t = i, s = I(""), n = I(null), { initMenuStore: a, formatOptions: r, resultStore: o, handleDestroyed: l, removeSelectedCate: c } = si(t, e), { handleSearch: u } = ni(n);
    return ue(() => s.value, () => {
      u(r.value, s.value, t.ancestorHitShow);
    }), Ce(() => {
      a();
    }), ke(() => {
      l();
    }), { __sfc: !0, props: t, searchKey: s, cascaderSelectRef: n, emit: e, initMenuStore: a, formatOptions: r, resultStore: o, handleDestroyed: l, removeSelectedCate: c, handleSearch: u, CascaderSelect: Ot, CascaderResult: Lt };
  }
});
var oi = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", { staticClass: "cascader-tree-select", attrs: { id: "app" } }, [e.needSearch ? t("div", { staticClass: "cascader-tree-select__search" }, [t("el-input", { staticStyle: { width: "240px" }, attrs: { size: s.props.size, clearable: "", placeholder: s.props.placeholder }, model: { value: s.searchKey, callback: function(n) {
    s.searchKey = typeof n == "string" ? n.trim() : n;
  }, expression: "searchKey" } })], 1) : e._e(), t("div", { staticClass: "cascader-tree-select__main" }, [t(s.CascaderSelect, { ref: "cascaderSelectRef", attrs: { options: s.formatOptions, "cascader-max-level": s.props.cascaderMaxLevel, "global-search-word": s.searchKey, "panel-title-list": s.props.panelTitleList } }), s.props.needResultPanel ? t(s.CascaderResult, e._b({ attrs: { "result-options": s.resultStore ? s.resultStore.getNodesTree() : [] }, on: { removeSelectedCate: s.removeSelectedCate } }, "cascader-result", e.$props, !1)) : e._e()], 1)]);
}, ai = [], ci = /* @__PURE__ */ U(
  li,
  oi,
  ai,
  !1,
  null,
  null,
  null,
  null
);
const B = ci.exports;
B.install = function(i) {
  i.component(B.name, B);
};
export {
  B as default
};
