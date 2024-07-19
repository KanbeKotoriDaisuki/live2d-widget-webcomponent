const dh = (r, t) => r === t, Jr = {
  equals: dh
};
let Co = Po;
const qt = 1, Qr = 2, Mo = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, Ci = {};
var mt = null;
let Mi = null, fh = null, Y = null, lt = null, Wt = null, gi = 0;
function ph(r, t) {
  const e = Y, i = mt, s = r.length === 0, n = t === void 0 ? i : t, o = s ? Mo : {
    owned: null,
    cleanups: null,
    context: n ? n.context : null,
    owner: n
  }, a = s ? r : () => r(() => mr(() => _i(o)));
  mt = o, Y = null;
  try {
    return xe(a, !0);
  } finally {
    Y = e, mt = i;
  }
}
function sr(r, t) {
  t = t ? Object.assign({}, Jr, t) : Jr;
  const e = {
    value: r,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, i = (s) => (typeof s == "function" && (s = s(e.value)), No(e, s));
  return [Fo.bind(e), i];
}
function nn(r, t, e) {
  const i = vi(r, t, !0, qt);
  qe(i);
}
function as(r, t, e) {
  const i = vi(r, t, !1, qt);
  qe(i);
}
function mh(r, t, e) {
  Co = Th;
  const i = vi(r, t, !1, qt);
  i.user = !0, Wt ? Wt.push(i) : qe(i);
}
function yh(r, t, e) {
  e = e ? Object.assign({}, Jr, e) : Jr;
  const i = vi(r, t, !0, 0);
  return i.observers = null, i.observerSlots = null, i.comparator = e.equals || void 0, qe(i), Fo.bind(i);
}
function gh(r) {
  return r && typeof r == "object" && "then" in r;
}
function vh(r, t, e) {
  let i, s, n;
  arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (i = !0, s = r, n = t || {}) : (i = r, s = t, n = {});
  let o = null, a = Ci, h = !1, l = "initialValue" in n, u = typeof i == "function" && yh(i);
  const c = /* @__PURE__ */ new Set(), [d, f] = (n.storage || sr)(n.initialValue), [p, v] = sr(void 0), [y, E] = sr(void 0, {
    equals: !1
  }), [_, g] = sr(l ? "ready" : "unresolved");
  function T(R, S, M, rt) {
    return o === R && (o = null, rt !== void 0 && (l = !0), (R === a || S === a) && n.onHydrated && queueMicrotask(
      () => n.onHydrated(rt, {
        value: S
      })
    ), a = Ci, A(S, M)), S;
  }
  function A(R, S) {
    xe(() => {
      S === void 0 && f(() => R), g(S !== void 0 ? "errored" : l ? "ready" : "unresolved"), v(S);
      for (const M of c.keys()) M.decrement();
      c.clear();
    }, !1);
  }
  function k() {
    const R = _h, S = d(), M = p();
    if (M !== void 0 && !o) throw M;
    return Y && !Y.user && R && nn(() => {
      y(), o && (R.resolved || c.has(R) || (R.increment(), c.add(R)));
    }), S;
  }
  function W(R = !0) {
    if (R !== !1 && h) return;
    h = !1;
    const S = u ? u() : i;
    if (S == null || S === !1) {
      T(o, mr(d));
      return;
    }
    const M = a !== Ci ? a : mr(
      () => s(S, {
        value: d(),
        refetching: R
      })
    );
    return gh(M) ? (o = M, "value" in M ? (M.status === "success" ? T(o, M.value, void 0, S) : T(o, void 0, hs(M.value), S), M) : (h = !0, queueMicrotask(() => h = !1), xe(() => {
      g(l ? "refreshing" : "pending"), E();
    }, !1), M.then(
      (rt) => T(M, rt, void 0, S),
      (rt) => T(M, void 0, hs(rt), S)
    ))) : (T(o, M, void 0, S), M);
  }
  return Object.defineProperties(k, {
    state: {
      get: () => _()
    },
    error: {
      get: () => p()
    },
    loading: {
      get() {
        const R = _();
        return R === "pending" || R === "refreshing";
      }
    },
    latest: {
      get() {
        if (!l) return k();
        const R = p();
        if (R && !o) throw R;
        return d();
      }
    }
  }), u ? nn(() => W(!1)) : W(!1), [
    k,
    {
      refetch: W,
      mutate: f
    }
  ];
}
function mr(r) {
  if (Y === null) return r();
  const t = Y;
  Y = null;
  try {
    return r();
  } finally {
    Y = t;
  }
}
let _h;
function Fo() {
  if (this.sources && this.state)
    if (this.state === qt) qe(this);
    else {
      const r = lt;
      lt = null, xe(() => ei(this), !1), lt = r;
    }
  if (Y) {
    const r = this.observers ? this.observers.length : 0;
    Y.sources ? (Y.sources.push(this), Y.sourceSlots.push(r)) : (Y.sources = [this], Y.sourceSlots = [r]), this.observers ? (this.observers.push(Y), this.observerSlots.push(Y.sources.length - 1)) : (this.observers = [Y], this.observerSlots = [Y.sources.length - 1]);
  }
  return this.value;
}
function No(r, t, e) {
  let i = r.value;
  return (!r.comparator || !r.comparator(i, t)) && (r.value = t, r.observers && r.observers.length && xe(() => {
    for (let s = 0; s < r.observers.length; s += 1) {
      const n = r.observers[s], o = Mi && Mi.running;
      o && Mi.disposed.has(n), (o ? !n.tState : !n.state) && (n.pure ? lt.push(n) : Wt.push(n), n.observers && Oo(n)), o || (n.state = qt);
    }
    if (lt.length > 1e6)
      throw lt = [], new Error();
  }, !1)), t;
}
function qe(r) {
  if (!r.fn) return;
  _i(r);
  const t = gi;
  xh(
    r,
    r.value,
    t
  );
}
function xh(r, t, e) {
  let i;
  const s = mt, n = Y;
  Y = mt = r;
  try {
    i = r.fn(t);
  } catch (o) {
    return r.pure && (r.state = qt, r.owned && r.owned.forEach(_i), r.owned = null), r.updatedAt = e + 1, Lo(o);
  } finally {
    Y = n, mt = s;
  }
  (!r.updatedAt || r.updatedAt <= e) && (r.updatedAt != null && "observers" in r ? No(r, i) : r.value = i, r.updatedAt = e);
}
function vi(r, t, e, i = qt, s) {
  const n = {
    fn: r,
    state: i,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: mt,
    context: mt ? mt.context : null,
    pure: e
  };
  return mt === null || mt !== Mo && (mt.owned ? mt.owned.push(n) : mt.owned = [n]), n;
}
function ti(r) {
  if (r.state === 0) return;
  if (r.state === Qr) return ei(r);
  if (r.suspense && mr(r.suspense.inFallback)) return r.suspense.effects.push(r);
  const t = [r];
  for (; (r = r.owner) && (!r.updatedAt || r.updatedAt < gi); )
    r.state && t.push(r);
  for (let e = t.length - 1; e >= 0; e--)
    if (r = t[e], r.state === qt)
      qe(r);
    else if (r.state === Qr) {
      const i = lt;
      lt = null, xe(() => ei(r, t[0]), !1), lt = i;
    }
}
function xe(r, t) {
  if (lt) return r();
  let e = !1;
  t || (lt = []), Wt ? e = !0 : Wt = [], gi++;
  try {
    const i = r();
    return bh(e), i;
  } catch (i) {
    e || (Wt = null), lt = null, Lo(i);
  }
}
function bh(r) {
  if (lt && (Po(lt), lt = null), r) return;
  const t = Wt;
  Wt = null, t.length && xe(() => Co(t), !1);
}
function Po(r) {
  for (let t = 0; t < r.length; t++) ti(r[t]);
}
function Th(r) {
  let t, e = 0;
  for (t = 0; t < r.length; t++) {
    const i = r[t];
    i.user ? r[e++] = i : ti(i);
  }
  for (t = 0; t < e; t++) ti(r[t]);
}
function ei(r, t) {
  r.state = 0;
  for (let e = 0; e < r.sources.length; e += 1) {
    const i = r.sources[e];
    if (i.sources) {
      const s = i.state;
      s === qt ? i !== t && (!i.updatedAt || i.updatedAt < gi) && ti(i) : s === Qr && ei(i, t);
    }
  }
}
function Oo(r) {
  for (let t = 0; t < r.observers.length; t += 1) {
    const e = r.observers[t];
    e.state || (e.state = Qr, e.pure ? lt.push(e) : Wt.push(e), e.observers && Oo(e));
  }
}
function _i(r) {
  let t;
  if (r.sources)
    for (; r.sources.length; ) {
      const e = r.sources.pop(), i = r.sourceSlots.pop(), s = e.observers;
      if (s && s.length) {
        const n = s.pop(), o = e.observerSlots.pop();
        i < s.length && (n.sourceSlots[o] = i, s[i] = n, e.observerSlots[i] = o);
      }
    }
  if (r.owned) {
    for (t = r.owned.length - 1; t >= 0; t--) _i(r.owned[t]);
    r.owned = null;
  }
  if (r.cleanups) {
    for (t = r.cleanups.length - 1; t >= 0; t--) r.cleanups[t]();
    r.cleanups = null;
  }
  r.state = 0;
}
function hs(r) {
  return r instanceof Error ? r : new Error(typeof r == "string" ? r : "Unknown error", {
    cause: r
  });
}
function Lo(r, t = mt) {
  throw hs(r);
}
function Eh(r, t, e) {
  let i = e.length, s = t.length, n = i, o = 0, a = 0, h = t[s - 1].nextSibling, l = null;
  for (; o < s || a < n; ) {
    if (t[o] === e[a]) {
      o++, a++;
      continue;
    }
    for (; t[s - 1] === e[n - 1]; )
      s--, n--;
    if (s === o) {
      const u = n < i ? a ? e[a - 1].nextSibling : e[n - a] : h;
      for (; a < n; ) r.insertBefore(e[a++], u);
    } else if (n === a)
      for (; o < s; )
        (!l || !l.has(t[o])) && t[o].remove(), o++;
    else if (t[o] === e[n - 1] && e[a] === t[s - 1]) {
      const u = t[--s].nextSibling;
      r.insertBefore(e[a++], t[o++].nextSibling), r.insertBefore(e[--n], u), t[s] = e[n];
    } else {
      if (!l) {
        l = /* @__PURE__ */ new Map();
        let c = a;
        for (; c < n; ) l.set(e[c], c++);
      }
      const u = l.get(t[o]);
      if (u != null)
        if (a < u && u < n) {
          let c = o, d = 1, f;
          for (; ++c < s && c < n && !((f = l.get(t[c])) == null || f !== u + d); )
            d++;
          if (d > u - a) {
            const p = t[o];
            for (; a < u; ) r.insertBefore(e[a++], p);
          } else r.replaceChild(e[a++], t[o++]);
        } else o++;
      else t[o++].remove();
    }
  }
}
function wh(r, t, e) {
  let i;
  const s = () => {
    const o = document.createElement("template");
    return o.innerHTML = r, o.content.firstChild;
  }, n = () => (i || (i = s())).cloneNode(!0);
  return n.cloneNode = n, n;
}
function Ih(r, t, e) {
  return mr(() => r(t, e));
}
function Ah(r, t, e, i) {
  if (typeof t != "function") return ri(r, t, i, e);
  as((s) => ri(r, t(), s, e), i);
}
function ri(r, t, e, i, s) {
  for (; typeof e == "function"; ) e = e();
  if (t === e) return e;
  const n = typeof t;
  if (r = r, n === "string" || n === "number") {
    if (n === "number" && (t = t.toString(), t === e))
      return e;
    e !== "" && typeof e == "string" ? e = r.firstChild.data = t : e = r.textContent = t;
  } else if (t == null || n === "boolean")
    e = Ar(r, e, i);
  else {
    if (n === "function")
      return as(() => {
        let o = t();
        for (; typeof o == "function"; ) o = o();
        e = ri(r, o, e, i);
      }), () => e;
    if (Array.isArray(t)) {
      const o = [], a = e && Array.isArray(e);
      if (ls(o, t, e, s))
        return as(() => e = ri(r, o, e, i, !0)), () => e;
      o.length === 0 ? e = Ar(r, e, i) : a ? e.length === 0 ? on(r, o, i) : Eh(r, e, o) : (e && Ar(r), on(r, o)), e = o;
    } else t.nodeType && (Array.isArray(e) ? Ar(r, e, null, t) : e == null || e === "" || !r.firstChild ? r.appendChild(t) : r.replaceChild(t, r.firstChild), e = t);
  }
  return e;
}
function ls(r, t, e, i) {
  let s = !1;
  for (let n = 0, o = t.length; n < o; n++) {
    let a = t[n], h = e && e[r.length], l;
    if (!(a == null || a === !0 || a === !1)) if ((l = typeof a) == "object" && a.nodeType)
      r.push(a);
    else if (Array.isArray(a))
      s = ls(r, a, h) || s;
    else if (l === "function")
      if (i) {
        for (; typeof a == "function"; ) a = a();
        s = ls(
          r,
          Array.isArray(a) ? a : [a],
          Array.isArray(h) ? h : [h]
        ) || s;
      } else
        r.push(a), s = !0;
    else {
      const u = String(a);
      h && h.nodeType === 3 && h.data === u ? r.push(h) : r.push(document.createTextNode(u));
    }
  }
  return s;
}
function on(r, t, e = null) {
  for (let i = 0, s = t.length; i < s; i++) r.insertBefore(t[i], e);
}
function Ar(r, t, e, i) {
  if (e === void 0) return r.textContent = "";
  const s = i || document.createTextNode("");
  if (t.length) {
    let n = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const a = t[o];
      if (s !== a) {
        const h = a.parentNode === r;
        !n && !o ? h ? r.replaceChild(s, a) : r.insertBefore(s, e) : h && a.remove();
      } else n = !0;
    }
  } else r.insertBefore(s, e);
  return [s];
}
function Rh(r) {
  return Object.keys(r).reduce((e, i) => {
    const s = r[i];
    return e[i] = Object.assign({}, s), Bo(s.value) && !Nh(s.value) && !Array.isArray(s.value) && (e[i].value = Object.assign({}, s.value)), Array.isArray(s.value) && (e[i].value = s.value.slice(0)), e;
  }, {});
}
function Sh(r) {
  return r ? Object.keys(r).reduce((e, i) => {
    const s = r[i];
    return e[i] = Bo(s) && "value" in s ? s : {
      value: s
    }, e[i].attribute || (e[i].attribute = Fh(i)), e[i].parse = "parse" in e[i] ? e[i].parse : typeof e[i].value != "string", e;
  }, {}) : {};
}
function Ch(r) {
  return Object.keys(r).reduce((e, i) => (e[i] = r[i].value, e), {});
}
function Mh(r, t) {
  const e = Rh(t);
  return Object.keys(t).forEach((s) => {
    const n = e[s], o = r.getAttribute(n.attribute), a = r[s];
    o && (n.value = n.parse ? Uo(o) : o), a != null && (n.value = Array.isArray(a) ? a.slice(0) : a), n.reflect && an(r, n.attribute, n.value, !!n.parse), Object.defineProperty(r, s, {
      get() {
        return n.value;
      },
      set(h) {
        const l = n.value;
        n.value = h, n.reflect && an(this, n.attribute, n.value, !!n.parse);
        for (let u = 0, c = this.__propertyChangedCallbacks.length; u < c; u++)
          this.__propertyChangedCallbacks[u](s, h, l);
      },
      enumerable: !0,
      configurable: !0
    });
  }), e;
}
function Uo(r) {
  if (r)
    try {
      return JSON.parse(r);
    } catch {
      return r;
    }
}
function an(r, t, e, i) {
  if (e == null || e === !1) return r.removeAttribute(t);
  let s = i ? JSON.stringify(e) : e;
  r.__updating[t] = !0, s === "true" && (s = ""), r.setAttribute(t, s), Promise.resolve().then(() => delete r.__updating[t]);
}
function Fh(r) {
  return r.replace(/\.?([A-Z]+)/g, (t, e) => "-" + e.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function Bo(r) {
  return r != null && (typeof r == "object" || typeof r == "function");
}
function Nh(r) {
  return Object.prototype.toString.call(r) === "[object Function]";
}
function Ph(r) {
  return typeof r == "function" && r.toString().indexOf("class") === 0;
}
let Fi;
function Oh(r, t) {
  const e = Object.keys(t);
  return class extends r {
    static get observedAttributes() {
      return e.map((s) => t[s].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized) return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = Mh(this, t);
      const s = Ch(this.props), n = this.Component, o = Fi;
      try {
        Fi = this, this.__initialized = !0, Ph(n) ? new n(s, {
          element: this
        }) : n(s, {
          element: this
        });
      } finally {
        Fi = o;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected) return;
      this.__propertyChangedCallbacks.length = 0;
      let s = null;
      for (; s = this.__releaseCallbacks.pop(); ) s(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(s, n, o) {
      if (this.__initialized && !this.__updating[s] && (s = this.lookupProp(s), s in t)) {
        if (o == null && !this[s]) return;
        this[s] = t[s].parse ? Uo(o) : o;
      }
    }
    lookupProp(s) {
      if (t)
        return e.find((n) => s === n || s === t[n].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(s) {
      this.__releaseCallbacks.push(s);
    }
    addPropertyChangedCallback(s) {
      this.__propertyChangedCallbacks.push(s);
    }
  };
}
function Lh(r, t = {}, e = {}) {
  const {
    BaseElement: i = HTMLElement,
    extension: s
  } = e;
  return (n) => {
    let o = customElements.get(r);
    return o ? (o.prototype.Component = n, o) : (o = Oh(i, Sh(t)), o.prototype.Component = n, o.prototype.registeredTag = r, customElements.define(r, o, s), o);
  };
}
function Uh(r) {
  const t = Object.keys(r), e = {};
  for (let i = 0; i < t.length; i++) {
    const [s, n] = sr(r[t[i]]);
    Object.defineProperty(e, t[i], {
      get: s,
      set(o) {
        n(() => o);
      }
    });
  }
  return e;
}
function Bh(r) {
  if (r.assignedSlot && r.assignedSlot._$owner) return r.assignedSlot._$owner;
  let t = r.parentNode;
  for (; t && !t._$owner && !(t.assignedSlot && t.assignedSlot._$owner); )
    t = t.parentNode;
  return t && t.assignedSlot ? t.assignedSlot._$owner : r._$owner;
}
function kh(r) {
  return (t, e) => {
    const { element: i } = e;
    return ph((s) => {
      const n = Uh(t);
      i.addPropertyChangedCallback((a, h) => n[a] = h), i.addReleaseCallback(() => {
        i.renderRoot.textContent = "", s();
      });
      const o = r(n, e);
      return Ah(i.renderRoot, o);
    }, Bh(i));
  };
}
function Gh(r, t, e) {
  return arguments.length === 2 && (e = t, t = {}), Lh(r, t)(kh(e));
}
var Ee = /* @__PURE__ */ ((r) => (r[r.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", r[r.WEBGL = 1] = "WEBGL", r[r.WEBGL2 = 2] = "WEBGL2", r))(Ee || {}), ko = /* @__PURE__ */ ((r) => (r[r.UNKNOWN = 0] = "UNKNOWN", r[r.WEBGL = 1] = "WEBGL", r[r.CANVAS = 2] = "CANVAS", r))(ko || {}), us = /* @__PURE__ */ ((r) => (r[r.COLOR = 16384] = "COLOR", r[r.DEPTH = 256] = "DEPTH", r[r.STENCIL = 1024] = "STENCIL", r))(us || {}), I = /* @__PURE__ */ ((r) => (r[r.NORMAL = 0] = "NORMAL", r[r.ADD = 1] = "ADD", r[r.MULTIPLY = 2] = "MULTIPLY", r[r.SCREEN = 3] = "SCREEN", r[r.OVERLAY = 4] = "OVERLAY", r[r.DARKEN = 5] = "DARKEN", r[r.LIGHTEN = 6] = "LIGHTEN", r[r.COLOR_DODGE = 7] = "COLOR_DODGE", r[r.COLOR_BURN = 8] = "COLOR_BURN", r[r.HARD_LIGHT = 9] = "HARD_LIGHT", r[r.SOFT_LIGHT = 10] = "SOFT_LIGHT", r[r.DIFFERENCE = 11] = "DIFFERENCE", r[r.EXCLUSION = 12] = "EXCLUSION", r[r.HUE = 13] = "HUE", r[r.SATURATION = 14] = "SATURATION", r[r.COLOR = 15] = "COLOR", r[r.LUMINOSITY = 16] = "LUMINOSITY", r[r.NORMAL_NPM = 17] = "NORMAL_NPM", r[r.ADD_NPM = 18] = "ADD_NPM", r[r.SCREEN_NPM = 19] = "SCREEN_NPM", r[r.NONE = 20] = "NONE", r[r.SRC_OVER = 0] = "SRC_OVER", r[r.SRC_IN = 21] = "SRC_IN", r[r.SRC_OUT = 22] = "SRC_OUT", r[r.SRC_ATOP = 23] = "SRC_ATOP", r[r.DST_OVER = 24] = "DST_OVER", r[r.DST_IN = 25] = "DST_IN", r[r.DST_OUT = 26] = "DST_OUT", r[r.DST_ATOP = 27] = "DST_ATOP", r[r.ERASE = 26] = "ERASE", r[r.SUBTRACT = 28] = "SUBTRACT", r[r.XOR = 29] = "XOR", r))(I || {}), ii = /* @__PURE__ */ ((r) => (r[r.POINTS = 0] = "POINTS", r[r.LINES = 1] = "LINES", r[r.LINE_LOOP = 2] = "LINE_LOOP", r[r.LINE_STRIP = 3] = "LINE_STRIP", r[r.TRIANGLES = 4] = "TRIANGLES", r[r.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", r[r.TRIANGLE_FAN = 6] = "TRIANGLE_FAN", r))(ii || {}), x = /* @__PURE__ */ ((r) => (r[r.RGBA = 6408] = "RGBA", r[r.RGB = 6407] = "RGB", r[r.RG = 33319] = "RG", r[r.RED = 6403] = "RED", r[r.RGBA_INTEGER = 36249] = "RGBA_INTEGER", r[r.RGB_INTEGER = 36248] = "RGB_INTEGER", r[r.RG_INTEGER = 33320] = "RG_INTEGER", r[r.RED_INTEGER = 36244] = "RED_INTEGER", r[r.ALPHA = 6406] = "ALPHA", r[r.LUMINANCE = 6409] = "LUMINANCE", r[r.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", r[r.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", r[r.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL", r))(x || {}), Ge = /* @__PURE__ */ ((r) => (r[r.TEXTURE_2D = 3553] = "TEXTURE_2D", r[r.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", r[r.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", r[r.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", r[r.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", r[r.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", r[r.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", r[r.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", r[r.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z", r))(Ge || {}), F = /* @__PURE__ */ ((r) => (r[r.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", r[r.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", r[r.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", r[r.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", r[r.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", r[r.UNSIGNED_INT = 5125] = "UNSIGNED_INT", r[r.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", r[r.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", r[r.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", r[r.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", r[r.BYTE = 5120] = "BYTE", r[r.SHORT = 5122] = "SHORT", r[r.INT = 5124] = "INT", r[r.FLOAT = 5126] = "FLOAT", r[r.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", r[r.HALF_FLOAT = 36193] = "HALF_FLOAT", r))(F || {}), b = /* @__PURE__ */ ((r) => (r[r.FLOAT = 0] = "FLOAT", r[r.INT = 1] = "INT", r[r.UINT = 2] = "UINT", r))(b || {}), jt = /* @__PURE__ */ ((r) => (r[r.NEAREST = 0] = "NEAREST", r[r.LINEAR = 1] = "LINEAR", r))(jt || {}), Vs = /* @__PURE__ */ ((r) => (r[r.CLAMP = 33071] = "CLAMP", r[r.REPEAT = 10497] = "REPEAT", r[r.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT", r))(Vs || {}), be = /* @__PURE__ */ ((r) => (r[r.OFF = 0] = "OFF", r[r.POW2 = 1] = "POW2", r[r.ON = 2] = "ON", r[r.ON_MANUAL = 3] = "ON_MANUAL", r))(be || {}), we = /* @__PURE__ */ ((r) => (r[r.NPM = 0] = "NPM", r[r.UNPACK = 1] = "UNPACK", r[r.PMA = 2] = "PMA", r[r.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", r[r.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", r[r.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA", r))(we || {}), he = /* @__PURE__ */ ((r) => (r[r.NO = 0] = "NO", r[r.YES = 1] = "YES", r[r.AUTO = 2] = "AUTO", r[r.BLEND = 0] = "BLEND", r[r.CLEAR = 1] = "CLEAR", r[r.BLIT = 2] = "BLIT", r))(he || {}), js = /* @__PURE__ */ ((r) => (r[r.AUTO = 0] = "AUTO", r[r.MANUAL = 1] = "MANUAL", r))(js || {}), Et = /* @__PURE__ */ ((r) => (r.LOW = "lowp", r.MEDIUM = "mediump", r.HIGH = "highp", r))(Et || {}), et = /* @__PURE__ */ ((r) => (r[r.NONE = 0] = "NONE", r[r.SCISSOR = 1] = "SCISSOR", r[r.STENCIL = 2] = "STENCIL", r[r.SPRITE = 3] = "SPRITE", r[r.COLOR = 4] = "COLOR", r))(et || {}), J = /* @__PURE__ */ ((r) => (r[r.NONE = 0] = "NONE", r[r.LOW = 2] = "LOW", r[r.MEDIUM = 4] = "MEDIUM", r[r.HIGH = 8] = "HIGH", r))(J || {}), Dt = /* @__PURE__ */ ((r) => (r[r.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", r[r.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", r[r.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER", r))(Dt || {});
const Dh = {
  /**
   * Creates a canvas element of the given size.
   * This canvas is created using the browser's native canvas element.
   * @param width - width of the canvas
   * @param height - height of the canvas
   */
  createCanvas: (r, t) => {
    const e = document.createElement("canvas");
    return e.width = r, e.height = t, e;
  },
  getCanvasRenderingContext2D: () => CanvasRenderingContext2D,
  getWebGLRenderingContext: () => WebGLRenderingContext,
  getNavigator: () => navigator,
  getBaseUrl: () => document.baseURI ?? window.location.href,
  getFontFaceSet: () => document.fonts,
  fetch: (r, t) => fetch(r, t),
  parseXML: (r) => new DOMParser().parseFromString(r, "text/xml")
}, L = {
  /**
   * This adapter is used to call methods that are platform dependent.
   * For example `document.createElement` only runs on the web but fails in node environments.
   * This allows us to support more platforms by abstracting away specific implementations per platform.
   *
   * By default the adapter is set to work in the browser. However you can create your own
   * by implementing the `IAdapter` interface. See `IAdapter` for more information.
   * @name ADAPTER
   * @memberof PIXI.settings
   * @type {PIXI.IAdapter}
   * @default PIXI.BrowserAdapter
   */
  ADAPTER: Dh,
  /**
   * Default resolution / device pixel ratio of the renderer.
   * @static
   * @name RESOLUTION
   * @memberof PIXI.settings
   * @type {number}
   * @default 1
   */
  RESOLUTION: 1,
  /**
   * Enables bitmap creation before image load. This feature is experimental.
   * @static
   * @name CREATE_IMAGE_BITMAP
   * @memberof PIXI.settings
   * @type {boolean}
   * @default false
   */
  CREATE_IMAGE_BITMAP: !1,
  /**
   * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
   * Advantages can include sharper image quality (like text) and faster rendering on canvas.
   * The main disadvantage is movement of objects may appear less smooth.
   * @static
   * @memberof PIXI.settings
   * @type {boolean}
   * @default false
   */
  ROUND_PIXELS: !1
};
var Ni = /iPhone/i, hn = /iPod/i, ln = /iPad/i, un = /\biOS-universal(?:.+)Mac\b/i, Pi = /\bAndroid(?:.+)Mobile\b/i, cn = /Android/i, Ae = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i, Rr = /Silk/i, Xt = /Windows Phone/i, dn = /\bWindows(?:.+)ARM\b/i, fn = /BlackBerry/i, pn = /BB10/i, mn = /Opera Mini/i, yn = /\b(CriOS|Chrome)(?:.+)Mobile/i, gn = /Mobile(?:.+)Firefox\b/i, vn = function(r) {
  return typeof r < "u" && r.platform === "MacIntel" && typeof r.maxTouchPoints == "number" && r.maxTouchPoints > 1 && typeof MSStream > "u";
};
function $h(r) {
  return function(t) {
    return t.test(r);
  };
}
function _n(r) {
  var t = {
    userAgent: "",
    platform: "",
    maxTouchPoints: 0
  };
  !r && typeof navigator < "u" ? t = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints || 0
  } : typeof r == "string" ? t.userAgent = r : r && r.userAgent && (t = {
    userAgent: r.userAgent,
    platform: r.platform,
    maxTouchPoints: r.maxTouchPoints || 0
  });
  var e = t.userAgent, i = e.split("[FBAN");
  typeof i[1] < "u" && (e = i[0]), i = e.split("Twitter"), typeof i[1] < "u" && (e = i[0]);
  var s = $h(e), n = {
    apple: {
      phone: s(Ni) && !s(Xt),
      ipod: s(hn),
      tablet: !s(Ni) && (s(ln) || vn(t)) && !s(Xt),
      universal: s(un),
      device: (s(Ni) || s(hn) || s(ln) || s(un) || vn(t)) && !s(Xt)
    },
    amazon: {
      phone: s(Ae),
      tablet: !s(Ae) && s(Rr),
      device: s(Ae) || s(Rr)
    },
    android: {
      phone: !s(Xt) && s(Ae) || !s(Xt) && s(Pi),
      tablet: !s(Xt) && !s(Ae) && !s(Pi) && (s(Rr) || s(cn)),
      device: !s(Xt) && (s(Ae) || s(Rr) || s(Pi) || s(cn)) || s(/\bokhttp\b/i)
    },
    windows: {
      phone: s(Xt),
      tablet: s(dn),
      device: s(Xt) || s(dn)
    },
    other: {
      blackberry: s(fn),
      blackberry10: s(pn),
      opera: s(mn),
      firefox: s(gn),
      chrome: s(yn),
      device: s(fn) || s(pn) || s(mn) || s(gn) || s(yn)
    },
    any: !1,
    phone: !1,
    tablet: !1
  };
  return n.any = n.apple.device || n.android.device || n.windows.device || n.other.device, n.phone = n.apple.phone || n.android.phone || n.windows.phone, n.tablet = n.apple.tablet || n.android.tablet || n.windows.tablet, n;
}
const Hh = _n.default ?? _n, Le = Hh(globalThis.navigator);
L.RETINA_PREFIX = /@([0-9\.]+)x/;
L.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !1;
var lr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Xh(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function Vh(r) {
  if (r.__esModule) return r;
  var t = r.default;
  if (typeof t == "function") {
    var e = function i() {
      return this instanceof i ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    e.prototype = t.prototype;
  } else e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(r).forEach(function(i) {
    var s = Object.getOwnPropertyDescriptor(r, i);
    Object.defineProperty(e, i, s.get ? s : {
      enumerable: !0,
      get: function() {
        return r[i];
      }
    });
  }), e;
}
var Go = { exports: {} };
(function(r) {
  var t = Object.prototype.hasOwnProperty, e = "~";
  function i() {
  }
  Object.create && (i.prototype = /* @__PURE__ */ Object.create(null), new i().__proto__ || (e = !1));
  function s(h, l, u) {
    this.fn = h, this.context = l, this.once = u || !1;
  }
  function n(h, l, u, c, d) {
    if (typeof u != "function")
      throw new TypeError("The listener must be a function");
    var f = new s(u, c || h, d), p = e ? e + l : l;
    return h._events[p] ? h._events[p].fn ? h._events[p] = [h._events[p], f] : h._events[p].push(f) : (h._events[p] = f, h._eventsCount++), h;
  }
  function o(h, l) {
    --h._eventsCount === 0 ? h._events = new i() : delete h._events[l];
  }
  function a() {
    this._events = new i(), this._eventsCount = 0;
  }
  a.prototype.eventNames = function() {
    var l = [], u, c;
    if (this._eventsCount === 0) return l;
    for (c in u = this._events)
      t.call(u, c) && l.push(e ? c.slice(1) : c);
    return Object.getOwnPropertySymbols ? l.concat(Object.getOwnPropertySymbols(u)) : l;
  }, a.prototype.listeners = function(l) {
    var u = e ? e + l : l, c = this._events[u];
    if (!c) return [];
    if (c.fn) return [c.fn];
    for (var d = 0, f = c.length, p = new Array(f); d < f; d++)
      p[d] = c[d].fn;
    return p;
  }, a.prototype.listenerCount = function(l) {
    var u = e ? e + l : l, c = this._events[u];
    return c ? c.fn ? 1 : c.length : 0;
  }, a.prototype.emit = function(l, u, c, d, f, p) {
    var v = e ? e + l : l;
    if (!this._events[v]) return !1;
    var y = this._events[v], E = arguments.length, _, g;
    if (y.fn) {
      switch (y.once && this.removeListener(l, y.fn, void 0, !0), E) {
        case 1:
          return y.fn.call(y.context), !0;
        case 2:
          return y.fn.call(y.context, u), !0;
        case 3:
          return y.fn.call(y.context, u, c), !0;
        case 4:
          return y.fn.call(y.context, u, c, d), !0;
        case 5:
          return y.fn.call(y.context, u, c, d, f), !0;
        case 6:
          return y.fn.call(y.context, u, c, d, f, p), !0;
      }
      for (g = 1, _ = new Array(E - 1); g < E; g++)
        _[g - 1] = arguments[g];
      y.fn.apply(y.context, _);
    } else {
      var T = y.length, A;
      for (g = 0; g < T; g++)
        switch (y[g].once && this.removeListener(l, y[g].fn, void 0, !0), E) {
          case 1:
            y[g].fn.call(y[g].context);
            break;
          case 2:
            y[g].fn.call(y[g].context, u);
            break;
          case 3:
            y[g].fn.call(y[g].context, u, c);
            break;
          case 4:
            y[g].fn.call(y[g].context, u, c, d);
            break;
          default:
            if (!_) for (A = 1, _ = new Array(E - 1); A < E; A++)
              _[A - 1] = arguments[A];
            y[g].fn.apply(y[g].context, _);
        }
    }
    return !0;
  }, a.prototype.on = function(l, u, c) {
    return n(this, l, u, c, !1);
  }, a.prototype.once = function(l, u, c) {
    return n(this, l, u, c, !0);
  }, a.prototype.removeListener = function(l, u, c, d) {
    var f = e ? e + l : l;
    if (!this._events[f]) return this;
    if (!u)
      return o(this, f), this;
    var p = this._events[f];
    if (p.fn)
      p.fn === u && (!d || p.once) && (!c || p.context === c) && o(this, f);
    else {
      for (var v = 0, y = [], E = p.length; v < E; v++)
        (p[v].fn !== u || d && !p[v].once || c && p[v].context !== c) && y.push(p[v]);
      y.length ? this._events[f] = y.length === 1 ? y[0] : y : o(this, f);
    }
    return this;
  }, a.prototype.removeAllListeners = function(l) {
    var u;
    return l ? (u = e ? e + l : l, this._events[u] && o(this, u)) : (this._events = new i(), this._eventsCount = 0), this;
  }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = e, a.EventEmitter = a, r.exports = a;
})(Go);
var jh = Go.exports;
const Ie = /* @__PURE__ */ Xh(jh);
var Do = { exports: {} };
Do.exports = xi;
Do.exports.default = xi;
function xi(r, t, e) {
  e = e || 2;
  var i = t && t.length, s = i ? t[0] * e : r.length, n = $o(r, 0, s, e, !0), o = [];
  if (!n || n.next === n.prev) return o;
  var a, h, l, u, c, d, f;
  if (i && (n = Kh(r, t, n, e)), r.length > 80 * e) {
    a = l = r[0], h = u = r[1];
    for (var p = e; p < s; p += e)
      c = r[p], d = r[p + 1], c < a && (a = c), d < h && (h = d), c > l && (l = c), d > u && (u = d);
    f = Math.max(l - a, u - h), f = f !== 0 ? 32767 / f : 0;
  }
  return yr(n, o, e, a, h, f, 0), o;
}
function $o(r, t, e, i, s) {
  var n, o;
  if (s === fs(r, t, e, i) > 0)
    for (n = t; n < e; n += i) o = xn(n, r[n], r[n + 1], o);
  else
    for (n = e - i; n >= t; n -= i) o = xn(n, r[n], r[n + 1], o);
  return o && bi(o, o.next) && (vr(o), o = o.next), o;
}
function Te(r, t) {
  if (!r) return r;
  t || (t = r);
  var e = r, i;
  do
    if (i = !1, !e.steiner && (bi(e, e.next) || z(e.prev, e, e.next) === 0)) {
      if (vr(e), e = t = e.prev, e === e.next) break;
      i = !0;
    } else
      e = e.next;
  while (i || e !== t);
  return t;
}
function yr(r, t, e, i, s, n, o) {
  if (r) {
    !o && n && el(r, i, s, n);
    for (var a = r, h, l; r.prev !== r.next; ) {
      if (h = r.prev, l = r.next, n ? Wh(r, i, s, n) : zh(r)) {
        t.push(h.i / e | 0), t.push(r.i / e | 0), t.push(l.i / e | 0), vr(r), r = l.next, a = l.next;
        continue;
      }
      if (r = l, r === a) {
        o ? o === 1 ? (r = Yh(Te(r), t, e), yr(r, t, e, i, s, n, 2)) : o === 2 && qh(r, t, e, i, s, n) : yr(Te(r), t, e, i, s, n, 1);
        break;
      }
    }
  }
}
function zh(r) {
  var t = r.prev, e = r, i = r.next;
  if (z(t, e, i) >= 0) return !1;
  for (var s = t.x, n = e.x, o = i.x, a = t.y, h = e.y, l = i.y, u = s < n ? s < o ? s : o : n < o ? n : o, c = a < h ? a < l ? a : l : h < l ? h : l, d = s > n ? s > o ? s : o : n > o ? n : o, f = a > h ? a > l ? a : l : h > l ? h : l, p = i.next; p !== t; ) {
    if (p.x >= u && p.x <= d && p.y >= c && p.y <= f && Ue(s, a, n, h, o, l, p.x, p.y) && z(p.prev, p, p.next) >= 0) return !1;
    p = p.next;
  }
  return !0;
}
function Wh(r, t, e, i) {
  var s = r.prev, n = r, o = r.next;
  if (z(s, n, o) >= 0) return !1;
  for (var a = s.x, h = n.x, l = o.x, u = s.y, c = n.y, d = o.y, f = a < h ? a < l ? a : l : h < l ? h : l, p = u < c ? u < d ? u : d : c < d ? c : d, v = a > h ? a > l ? a : l : h > l ? h : l, y = u > c ? u > d ? u : d : c > d ? c : d, E = cs(f, p, t, e, i), _ = cs(v, y, t, e, i), g = r.prevZ, T = r.nextZ; g && g.z >= E && T && T.z <= _; ) {
    if (g.x >= f && g.x <= v && g.y >= p && g.y <= y && g !== s && g !== o && Ue(a, u, h, c, l, d, g.x, g.y) && z(g.prev, g, g.next) >= 0 || (g = g.prevZ, T.x >= f && T.x <= v && T.y >= p && T.y <= y && T !== s && T !== o && Ue(a, u, h, c, l, d, T.x, T.y) && z(T.prev, T, T.next) >= 0)) return !1;
    T = T.nextZ;
  }
  for (; g && g.z >= E; ) {
    if (g.x >= f && g.x <= v && g.y >= p && g.y <= y && g !== s && g !== o && Ue(a, u, h, c, l, d, g.x, g.y) && z(g.prev, g, g.next) >= 0) return !1;
    g = g.prevZ;
  }
  for (; T && T.z <= _; ) {
    if (T.x >= f && T.x <= v && T.y >= p && T.y <= y && T !== s && T !== o && Ue(a, u, h, c, l, d, T.x, T.y) && z(T.prev, T, T.next) >= 0) return !1;
    T = T.nextZ;
  }
  return !0;
}
function Yh(r, t, e) {
  var i = r;
  do {
    var s = i.prev, n = i.next.next;
    !bi(s, n) && Ho(s, i, i.next, n) && gr(s, n) && gr(n, s) && (t.push(s.i / e | 0), t.push(i.i / e | 0), t.push(n.i / e | 0), vr(i), vr(i.next), i = r = n), i = i.next;
  } while (i !== r);
  return Te(i);
}
function qh(r, t, e, i, s, n) {
  var o = r;
  do {
    for (var a = o.next.next; a !== o.prev; ) {
      if (o.i !== a.i && sl(o, a)) {
        var h = Xo(o, a);
        o = Te(o, o.next), h = Te(h, h.next), yr(o, t, e, i, s, n, 0), yr(h, t, e, i, s, n, 0);
        return;
      }
      a = a.next;
    }
    o = o.next;
  } while (o !== r);
}
function Kh(r, t, e, i) {
  var s = [], n, o, a, h, l;
  for (n = 0, o = t.length; n < o; n++)
    a = t[n] * i, h = n < o - 1 ? t[n + 1] * i : r.length, l = $o(r, a, h, i, !1), l === l.next && (l.steiner = !0), s.push(il(l));
  for (s.sort(Zh), n = 0; n < s.length; n++)
    e = Jh(s[n], e);
  return e;
}
function Zh(r, t) {
  return r.x - t.x;
}
function Jh(r, t) {
  var e = Qh(r, t);
  if (!e)
    return t;
  var i = Xo(e, r);
  return Te(i, i.next), Te(e, e.next);
}
function Qh(r, t) {
  var e = t, i = r.x, s = r.y, n = -1 / 0, o;
  do {
    if (s <= e.y && s >= e.next.y && e.next.y !== e.y) {
      var a = e.x + (s - e.y) * (e.next.x - e.x) / (e.next.y - e.y);
      if (a <= i && a > n && (n = a, o = e.x < e.next.x ? e : e.next, a === i))
        return o;
    }
    e = e.next;
  } while (e !== t);
  if (!o) return null;
  var h = o, l = o.x, u = o.y, c = 1 / 0, d;
  e = o;
  do
    i >= e.x && e.x >= l && i !== e.x && Ue(s < u ? i : n, s, l, u, s < u ? n : i, s, e.x, e.y) && (d = Math.abs(s - e.y) / (i - e.x), gr(e, r) && (d < c || d === c && (e.x > o.x || e.x === o.x && tl(o, e))) && (o = e, c = d)), e = e.next;
  while (e !== h);
  return o;
}
function tl(r, t) {
  return z(r.prev, r, t.prev) < 0 && z(t.next, r, r.next) < 0;
}
function el(r, t, e, i) {
  var s = r;
  do
    s.z === 0 && (s.z = cs(s.x, s.y, t, e, i)), s.prevZ = s.prev, s.nextZ = s.next, s = s.next;
  while (s !== r);
  s.prevZ.nextZ = null, s.prevZ = null, rl(s);
}
function rl(r) {
  var t, e, i, s, n, o, a, h, l = 1;
  do {
    for (e = r, r = null, n = null, o = 0; e; ) {
      for (o++, i = e, a = 0, t = 0; t < l && (a++, i = i.nextZ, !!i); t++)
        ;
      for (h = l; a > 0 || h > 0 && i; )
        a !== 0 && (h === 0 || !i || e.z <= i.z) ? (s = e, e = e.nextZ, a--) : (s = i, i = i.nextZ, h--), n ? n.nextZ = s : r = s, s.prevZ = n, n = s;
      e = i;
    }
    n.nextZ = null, l *= 2;
  } while (o > 1);
  return r;
}
function cs(r, t, e, i, s) {
  return r = (r - e) * s | 0, t = (t - i) * s | 0, r = (r | r << 8) & 16711935, r = (r | r << 4) & 252645135, r = (r | r << 2) & 858993459, r = (r | r << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, r | t << 1;
}
function il(r) {
  var t = r, e = r;
  do
    (t.x < e.x || t.x === e.x && t.y < e.y) && (e = t), t = t.next;
  while (t !== r);
  return e;
}
function Ue(r, t, e, i, s, n, o, a) {
  return (s - o) * (t - a) >= (r - o) * (n - a) && (r - o) * (i - a) >= (e - o) * (t - a) && (e - o) * (n - a) >= (s - o) * (i - a);
}
function sl(r, t) {
  return r.next.i !== t.i && r.prev.i !== t.i && !nl(r, t) && // dones't intersect other edges
  (gr(r, t) && gr(t, r) && ol(r, t) && // locally visible
  (z(r.prev, r, t.prev) || z(r, t.prev, t)) || // does not create opposite-facing sectors
  bi(r, t) && z(r.prev, r, r.next) > 0 && z(t.prev, t, t.next) > 0);
}
function z(r, t, e) {
  return (t.y - r.y) * (e.x - t.x) - (t.x - r.x) * (e.y - t.y);
}
function bi(r, t) {
  return r.x === t.x && r.y === t.y;
}
function Ho(r, t, e, i) {
  var s = Cr(z(r, t, e)), n = Cr(z(r, t, i)), o = Cr(z(e, i, r)), a = Cr(z(e, i, t));
  return !!(s !== n && o !== a || s === 0 && Sr(r, e, t) || n === 0 && Sr(r, i, t) || o === 0 && Sr(e, r, i) || a === 0 && Sr(e, t, i));
}
function Sr(r, t, e) {
  return t.x <= Math.max(r.x, e.x) && t.x >= Math.min(r.x, e.x) && t.y <= Math.max(r.y, e.y) && t.y >= Math.min(r.y, e.y);
}
function Cr(r) {
  return r > 0 ? 1 : r < 0 ? -1 : 0;
}
function nl(r, t) {
  var e = r;
  do {
    if (e.i !== r.i && e.next.i !== r.i && e.i !== t.i && e.next.i !== t.i && Ho(e, e.next, r, t)) return !0;
    e = e.next;
  } while (e !== r);
  return !1;
}
function gr(r, t) {
  return z(r.prev, r, r.next) < 0 ? z(r, t, r.next) >= 0 && z(r, r.prev, t) >= 0 : z(r, t, r.prev) < 0 || z(r, r.next, t) < 0;
}
function ol(r, t) {
  var e = r, i = !1, s = (r.x + t.x) / 2, n = (r.y + t.y) / 2;
  do
    e.y > n != e.next.y > n && e.next.y !== e.y && s < (e.next.x - e.x) * (n - e.y) / (e.next.y - e.y) + e.x && (i = !i), e = e.next;
  while (e !== r);
  return i;
}
function Xo(r, t) {
  var e = new ds(r.i, r.x, r.y), i = new ds(t.i, t.x, t.y), s = r.next, n = t.prev;
  return r.next = t, t.prev = r, e.next = s, s.prev = e, i.next = e, e.prev = i, n.next = i, i.prev = n, i;
}
function xn(r, t, e, i) {
  var s = new ds(r, t, e);
  return i ? (s.next = i.next, s.prev = i, i.next.prev = s, i.next = s) : (s.prev = s, s.next = s), s;
}
function vr(r) {
  r.next.prev = r.prev, r.prev.next = r.next, r.prevZ && (r.prevZ.nextZ = r.nextZ), r.nextZ && (r.nextZ.prevZ = r.prevZ);
}
function ds(r, t, e) {
  this.i = r, this.x = t, this.y = e, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
xi.deviation = function(r, t, e, i) {
  var s = t && t.length, n = s ? t[0] * e : r.length, o = Math.abs(fs(r, 0, n, e));
  if (s)
    for (var a = 0, h = t.length; a < h; a++) {
      var l = t[a] * e, u = a < h - 1 ? t[a + 1] * e : r.length;
      o -= Math.abs(fs(r, l, u, e));
    }
  var c = 0;
  for (a = 0; a < i.length; a += 3) {
    var d = i[a] * e, f = i[a + 1] * e, p = i[a + 2] * e;
    c += Math.abs(
      (r[d] - r[p]) * (r[f + 1] - r[d + 1]) - (r[d] - r[f]) * (r[p + 1] - r[d + 1])
    );
  }
  return o === 0 && c === 0 ? 0 : Math.abs((c - o) / o);
};
function fs(r, t, e, i) {
  for (var s = 0, n = t, o = e - i; n < e; n += i)
    s += (r[o] - r[n]) * (r[n + 1] + r[o + 1]), o = n;
  return s;
}
xi.flatten = function(r) {
  for (var t = r[0][0].length, e = { vertices: [], holes: [], dimensions: t }, i = 0, s = 0; s < r.length; s++) {
    for (var n = 0; n < r[s].length; n++)
      for (var o = 0; o < t; o++) e.vertices.push(r[s][n][o]);
    s > 0 && (i += r[s - 1].length, e.holes.push(i));
  }
  return e;
};
var si = { exports: {} };
/*! https://mths.be/punycode v1.4.1 by @mathias */
si.exports;
(function(r, t) {
  (function(e) {
    var i = t && !t.nodeType && t, s = r && !r.nodeType && r, n = typeof lr == "object" && lr;
    (n.global === n || n.window === n || n.self === n) && (e = n);
    var o, a = 2147483647, h = 36, l = 1, u = 26, c = 38, d = 700, f = 72, p = 128, v = "-", y = /^xn--/, E = /[^\x20-\x7E]/, _ = /[\x2E\u3002\uFF0E\uFF61]/g, g = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    }, T = h - l, A = Math.floor, k = String.fromCharCode, W;
    function R(w) {
      throw new RangeError(g[w]);
    }
    function S(w, C) {
      for (var U = w.length, X = []; U--; )
        X[U] = C(w[U]);
      return X;
    }
    function M(w, C) {
      var U = w.split("@"), X = "";
      U.length > 1 && (X = U[0] + "@", w = U[1]), w = w.replace(_, ".");
      var K = w.split("."), ft = S(K, C).join(".");
      return X + ft;
    }
    function rt(w) {
      for (var C = [], U = 0, X = w.length, K, ft; U < X; )
        K = w.charCodeAt(U++), K >= 55296 && K <= 56319 && U < X ? (ft = w.charCodeAt(U++), (ft & 64512) == 56320 ? C.push(((K & 1023) << 10) + (ft & 1023) + 65536) : (C.push(K), U--)) : C.push(K);
      return C;
    }
    function At(w) {
      return S(w, function(C) {
        var U = "";
        return C > 65535 && (C -= 65536, U += k(C >>> 10 & 1023 | 55296), C = 56320 | C & 1023), U += k(C), U;
      }).join("");
    }
    function Q(w) {
      return w - 48 < 10 ? w - 22 : w - 65 < 26 ? w - 65 : w - 97 < 26 ? w - 97 : h;
    }
    function ct(w, C) {
      return w + 22 + 75 * (w < 26) - ((C != 0) << 5);
    }
    function dt(w, C, U) {
      var X = 0;
      for (w = U ? A(w / d) : w >> 1, w += A(w / C); w > T * u >> 1; X += h)
        w = A(w / T);
      return A(X + (T + 1) * w / (w + c));
    }
    function vt(w) {
      var C = [], U = w.length, X, K = 0, ft = p, nt = f, _t, Rt, Ot, Ht, at, bt, St, Zt, se;
      for (_t = w.lastIndexOf(v), _t < 0 && (_t = 0), Rt = 0; Rt < _t; ++Rt)
        w.charCodeAt(Rt) >= 128 && R("not-basic"), C.push(w.charCodeAt(Rt));
      for (Ot = _t > 0 ? _t + 1 : 0; Ot < U; ) {
        for (Ht = K, at = 1, bt = h; Ot >= U && R("invalid-input"), St = Q(w.charCodeAt(Ot++)), (St >= h || St > A((a - K) / at)) && R("overflow"), K += St * at, Zt = bt <= nt ? l : bt >= nt + u ? u : bt - nt, !(St < Zt); bt += h)
          se = h - Zt, at > A(a / se) && R("overflow"), at *= se;
        X = C.length + 1, nt = dt(K - Ht, X, Ht == 0), A(K / X) > a - ft && R("overflow"), ft += A(K / X), K %= X, C.splice(K++, 0, ft);
      }
      return At(C);
    }
    function Kt(w) {
      var C, U, X, K, ft, nt, _t, Rt, Ot, Ht, at, bt = [], St, Zt, se, Si;
      for (w = rt(w), St = w.length, C = p, U = 0, ft = f, nt = 0; nt < St; ++nt)
        at = w[nt], at < 128 && bt.push(k(at));
      for (X = K = bt.length, K && bt.push(v); X < St; ) {
        for (_t = a, nt = 0; nt < St; ++nt)
          at = w[nt], at >= C && at < _t && (_t = at);
        for (Zt = X + 1, _t - C > A((a - U) / Zt) && R("overflow"), U += (_t - C) * Zt, C = _t, nt = 0; nt < St; ++nt)
          if (at = w[nt], at < C && ++U > a && R("overflow"), at == C) {
            for (Rt = U, Ot = h; Ht = Ot <= ft ? l : Ot >= ft + u ? u : Ot - ft, !(Rt < Ht); Ot += h)
              Si = Rt - Ht, se = h - Ht, bt.push(
                k(ct(Ht + Si % se, 0))
              ), Rt = A(Si / se);
            bt.push(k(ct(Rt, 0))), ft = dt(U, Zt, X == K), U = 0, ++X;
          }
        ++U, ++C;
      }
      return bt.join("");
    }
    function Ri(w) {
      return M(w, function(C) {
        return y.test(C) ? vt(C.slice(4).toLowerCase()) : C;
      });
    }
    function Ir(w) {
      return M(w, function(C) {
        return E.test(C) ? "xn--" + Kt(C) : C;
      });
    }
    if (o = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      version: "1.4.1",
      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      ucs2: {
        decode: rt,
        encode: At
      },
      decode: vt,
      encode: Kt,
      toASCII: Ir,
      toUnicode: Ri
    }, i && s)
      if (r.exports == i)
        s.exports = o;
      else
        for (W in o)
          o.hasOwnProperty(W) && (i[W] = o[W]);
    else
      e.punycode = o;
  })(lr);
})(si, si.exports);
var al = si.exports, hl = Error, ll = EvalError, ul = RangeError, cl = ReferenceError, Vo = SyntaxError, Er = TypeError, dl = URIError, fl = function() {
  if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
    return !1;
  if (typeof Symbol.iterator == "symbol")
    return !0;
  var t = {}, e = Symbol("test"), i = Object(e);
  if (typeof e == "string" || Object.prototype.toString.call(e) !== "[object Symbol]" || Object.prototype.toString.call(i) !== "[object Symbol]")
    return !1;
  var s = 42;
  t[e] = s;
  for (e in t)
    return !1;
  if (typeof Object.keys == "function" && Object.keys(t).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(t).length !== 0)
    return !1;
  var n = Object.getOwnPropertySymbols(t);
  if (n.length !== 1 || n[0] !== e || !Object.prototype.propertyIsEnumerable.call(t, e))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var o = Object.getOwnPropertyDescriptor(t, e);
    if (o.value !== s || o.enumerable !== !0)
      return !1;
  }
  return !0;
}, bn = typeof Symbol < "u" && Symbol, pl = fl, ml = function() {
  return typeof bn != "function" || typeof Symbol != "function" || typeof bn("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : pl();
}, Oi = {
  __proto__: null,
  foo: {}
}, yl = Object, gl = function() {
  return { __proto__: Oi }.foo === Oi.foo && !(Oi instanceof yl);
}, vl = "Function.prototype.bind called on incompatible ", _l = Object.prototype.toString, xl = Math.max, bl = "[object Function]", Tn = function(t, e) {
  for (var i = [], s = 0; s < t.length; s += 1)
    i[s] = t[s];
  for (var n = 0; n < e.length; n += 1)
    i[n + t.length] = e[n];
  return i;
}, Tl = function(t, e) {
  for (var i = [], s = e, n = 0; s < t.length; s += 1, n += 1)
    i[n] = t[s];
  return i;
}, El = function(r, t) {
  for (var e = "", i = 0; i < r.length; i += 1)
    e += r[i], i + 1 < r.length && (e += t);
  return e;
}, wl = function(t) {
  var e = this;
  if (typeof e != "function" || _l.apply(e) !== bl)
    throw new TypeError(vl + e);
  for (var i = Tl(arguments, 1), s, n = function() {
    if (this instanceof s) {
      var u = e.apply(
        this,
        Tn(i, arguments)
      );
      return Object(u) === u ? u : this;
    }
    return e.apply(
      t,
      Tn(i, arguments)
    );
  }, o = xl(0, e.length - i.length), a = [], h = 0; h < o; h++)
    a[h] = "$" + h;
  if (s = Function("binder", "return function (" + El(a, ",") + "){ return binder.apply(this,arguments); }")(n), e.prototype) {
    var l = function() {
    };
    l.prototype = e.prototype, s.prototype = new l(), l.prototype = null;
  }
  return s;
}, Il = wl, zs = Function.prototype.bind || Il, Al = Function.prototype.call, Rl = Object.prototype.hasOwnProperty, Sl = zs, Cl = Sl.call(Al, Rl), P, Ml = hl, Fl = ll, Nl = ul, Pl = cl, Xe = Vo, De = Er, Ol = dl, jo = Function, Li = function(r) {
  try {
    return jo('"use strict"; return (' + r + ").constructor;")();
  } catch {
  }
}, ve = Object.getOwnPropertyDescriptor;
if (ve)
  try {
    ve({}, "");
  } catch {
    ve = null;
  }
var Ui = function() {
  throw new De();
}, Ll = ve ? function() {
  try {
    return arguments.callee, Ui;
  } catch {
    try {
      return ve(arguments, "callee").get;
    } catch {
      return Ui;
    }
  }
}() : Ui, Re = ml(), Ul = gl(), it = Object.getPrototypeOf || (Ul ? function(r) {
  return r.__proto__;
} : null), Me = {}, Bl = typeof Uint8Array > "u" || !it ? P : it(Uint8Array), _e = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? P : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? P : ArrayBuffer,
  "%ArrayIteratorPrototype%": Re && it ? it([][Symbol.iterator]()) : P,
  "%AsyncFromSyncIteratorPrototype%": P,
  "%AsyncFunction%": Me,
  "%AsyncGenerator%": Me,
  "%AsyncGeneratorFunction%": Me,
  "%AsyncIteratorPrototype%": Me,
  "%Atomics%": typeof Atomics > "u" ? P : Atomics,
  "%BigInt%": typeof BigInt > "u" ? P : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? P : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? P : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? P : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Ml,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": Fl,
  "%Float32Array%": typeof Float32Array > "u" ? P : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? P : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? P : FinalizationRegistry,
  "%Function%": jo,
  "%GeneratorFunction%": Me,
  "%Int8Array%": typeof Int8Array > "u" ? P : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? P : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? P : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": Re && it ? it(it([][Symbol.iterator]())) : P,
  "%JSON%": typeof JSON == "object" ? JSON : P,
  "%Map%": typeof Map > "u" ? P : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !Re || !it ? P : it((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? P : Promise,
  "%Proxy%": typeof Proxy > "u" ? P : Proxy,
  "%RangeError%": Nl,
  "%ReferenceError%": Pl,
  "%Reflect%": typeof Reflect > "u" ? P : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? P : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !Re || !it ? P : it((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? P : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": Re && it ? it(""[Symbol.iterator]()) : P,
  "%Symbol%": Re ? Symbol : P,
  "%SyntaxError%": Xe,
  "%ThrowTypeError%": Ll,
  "%TypedArray%": Bl,
  "%TypeError%": De,
  "%Uint8Array%": typeof Uint8Array > "u" ? P : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? P : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? P : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? P : Uint32Array,
  "%URIError%": Ol,
  "%WeakMap%": typeof WeakMap > "u" ? P : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? P : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? P : WeakSet
};
if (it)
  try {
    null.error;
  } catch (r) {
    var kl = it(it(r));
    _e["%Error.prototype%"] = kl;
  }
var Gl = function r(t) {
  var e;
  if (t === "%AsyncFunction%")
    e = Li("async function () {}");
  else if (t === "%GeneratorFunction%")
    e = Li("function* () {}");
  else if (t === "%AsyncGeneratorFunction%")
    e = Li("async function* () {}");
  else if (t === "%AsyncGenerator%") {
    var i = r("%AsyncGeneratorFunction%");
    i && (e = i.prototype);
  } else if (t === "%AsyncIteratorPrototype%") {
    var s = r("%AsyncGenerator%");
    s && it && (e = it(s.prototype));
  }
  return _e[t] = e, e;
}, En = {
  __proto__: null,
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
}, wr = zs, ni = Cl, Dl = wr.call(Function.call, Array.prototype.concat), $l = wr.call(Function.apply, Array.prototype.splice), wn = wr.call(Function.call, String.prototype.replace), oi = wr.call(Function.call, String.prototype.slice), Hl = wr.call(Function.call, RegExp.prototype.exec), Xl = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Vl = /\\(\\)?/g, jl = function(t) {
  var e = oi(t, 0, 1), i = oi(t, -1);
  if (e === "%" && i !== "%")
    throw new Xe("invalid intrinsic syntax, expected closing `%`");
  if (i === "%" && e !== "%")
    throw new Xe("invalid intrinsic syntax, expected opening `%`");
  var s = [];
  return wn(t, Xl, function(n, o, a, h) {
    s[s.length] = a ? wn(h, Vl, "$1") : o || n;
  }), s;
}, zl = function(t, e) {
  var i = t, s;
  if (ni(En, i) && (s = En[i], i = "%" + s[0] + "%"), ni(_e, i)) {
    var n = _e[i];
    if (n === Me && (n = Gl(i)), typeof n > "u" && !e)
      throw new De("intrinsic " + t + " exists, but is not available. Please file an issue!");
    return {
      alias: s,
      name: i,
      value: n
    };
  }
  throw new Xe("intrinsic " + t + " does not exist!");
}, Ke = function(t, e) {
  if (typeof t != "string" || t.length === 0)
    throw new De("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof e != "boolean")
    throw new De('"allowMissing" argument must be a boolean');
  if (Hl(/^%?[^%]*%?$/, t) === null)
    throw new Xe("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var i = jl(t), s = i.length > 0 ? i[0] : "", n = zl("%" + s + "%", e), o = n.name, a = n.value, h = !1, l = n.alias;
  l && (s = l[0], $l(i, Dl([0, 1], l)));
  for (var u = 1, c = !0; u < i.length; u += 1) {
    var d = i[u], f = oi(d, 0, 1), p = oi(d, -1);
    if ((f === '"' || f === "'" || f === "`" || p === '"' || p === "'" || p === "`") && f !== p)
      throw new Xe("property names with quotes must have matching quotes");
    if ((d === "constructor" || !c) && (h = !0), s += "." + d, o = "%" + s + "%", ni(_e, o))
      a = _e[o];
    else if (a != null) {
      if (!(d in a)) {
        if (!e)
          throw new De("base intrinsic for " + t + " exists, but the property is not available.");
        return;
      }
      if (ve && u + 1 >= i.length) {
        var v = ve(a, d);
        c = !!v, c && "get" in v && !("originalValue" in v.get) ? a = v.get : a = a[d];
      } else
        c = ni(a, d), a = a[d];
      c && !h && (_e[o] = a);
    }
  }
  return a;
}, zo = { exports: {} }, Bi, In;
function Ws() {
  if (In) return Bi;
  In = 1;
  var r = Ke, t = r("%Object.defineProperty%", !0) || !1;
  if (t)
    try {
      t({}, "a", { value: 1 });
    } catch {
      t = !1;
    }
  return Bi = t, Bi;
}
var Wl = Ke, Xr = Wl("%Object.getOwnPropertyDescriptor%", !0);
if (Xr)
  try {
    Xr([], "length");
  } catch {
    Xr = null;
  }
var Wo = Xr, An = Ws(), Yl = Vo, Se = Er, Rn = Wo, ql = function(t, e, i) {
  if (!t || typeof t != "object" && typeof t != "function")
    throw new Se("`obj` must be an object or a function`");
  if (typeof e != "string" && typeof e != "symbol")
    throw new Se("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new Se("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new Se("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new Se("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new Se("`loose`, if provided, must be a boolean");
  var s = arguments.length > 3 ? arguments[3] : null, n = arguments.length > 4 ? arguments[4] : null, o = arguments.length > 5 ? arguments[5] : null, a = arguments.length > 6 ? arguments[6] : !1, h = !!Rn && Rn(t, e);
  if (An)
    An(t, e, {
      configurable: o === null && h ? h.configurable : !o,
      enumerable: s === null && h ? h.enumerable : !s,
      value: i,
      writable: n === null && h ? h.writable : !n
    });
  else if (a || !s && !n && !o)
    t[e] = i;
  else
    throw new Yl("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, ps = Ws(), Yo = function() {
  return !!ps;
};
Yo.hasArrayLengthDefineBug = function() {
  if (!ps)
    return null;
  try {
    return ps([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Kl = Yo, Zl = Ke, Sn = ql, Jl = Kl(), Cn = Wo, Mn = Er, Ql = Zl("%Math.floor%"), tu = function(t, e) {
  if (typeof t != "function")
    throw new Mn("`fn` is not a function");
  if (typeof e != "number" || e < 0 || e > 4294967295 || Ql(e) !== e)
    throw new Mn("`length` must be a positive 32-bit integer");
  var i = arguments.length > 2 && !!arguments[2], s = !0, n = !0;
  if ("length" in t && Cn) {
    var o = Cn(t, "length");
    o && !o.configurable && (s = !1), o && !o.writable && (n = !1);
  }
  return (s || n || !i) && (Jl ? Sn(
    /** @type {Parameters<define>[0]} */
    t,
    "length",
    e,
    !0,
    !0
  ) : Sn(
    /** @type {Parameters<define>[0]} */
    t,
    "length",
    e
  )), t;
};
(function(r) {
  var t = zs, e = Ke, i = tu, s = Er, n = e("%Function.prototype.apply%"), o = e("%Function.prototype.call%"), a = e("%Reflect.apply%", !0) || t.call(o, n), h = Ws(), l = e("%Math.max%");
  r.exports = function(d) {
    if (typeof d != "function")
      throw new s("a function is required");
    var f = a(t, o, arguments);
    return i(
      f,
      1 + l(0, d.length - (arguments.length - 1)),
      !0
    );
  };
  var u = function() {
    return a(t, n, arguments);
  };
  h ? h(r.exports, "apply", { value: u }) : r.exports.apply = u;
})(zo);
var eu = zo.exports, qo = Ke, Ko = eu, ru = Ko(qo("String.prototype.indexOf")), iu = function(t, e) {
  var i = qo(t, !!e);
  return typeof i == "function" && ru(t, ".prototype.") > -1 ? Ko(i) : i;
};
const su = {}, nu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: su
}, Symbol.toStringTag, { value: "Module" })), ou = /* @__PURE__ */ Vh(nu);
var Ys = typeof Map == "function" && Map.prototype, ki = Object.getOwnPropertyDescriptor && Ys ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, ai = Ys && ki && typeof ki.get == "function" ? ki.get : null, Fn = Ys && Map.prototype.forEach, qs = typeof Set == "function" && Set.prototype, Gi = Object.getOwnPropertyDescriptor && qs ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, hi = qs && Gi && typeof Gi.get == "function" ? Gi.get : null, Nn = qs && Set.prototype.forEach, au = typeof WeakMap == "function" && WeakMap.prototype, ur = au ? WeakMap.prototype.has : null, hu = typeof WeakSet == "function" && WeakSet.prototype, cr = hu ? WeakSet.prototype.has : null, lu = typeof WeakRef == "function" && WeakRef.prototype, Pn = lu ? WeakRef.prototype.deref : null, uu = Boolean.prototype.valueOf, cu = Object.prototype.toString, du = Function.prototype.toString, fu = String.prototype.match, Ks = String.prototype.slice, te = String.prototype.replace, pu = String.prototype.toUpperCase, On = String.prototype.toLowerCase, Zo = RegExp.prototype.test, Ln = Array.prototype.concat, Gt = Array.prototype.join, mu = Array.prototype.slice, Un = Math.floor, ms = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, Di = Object.getOwnPropertySymbols, ys = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, Ve = typeof Symbol == "function" && typeof Symbol.iterator == "object", ut = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === Ve || !0) ? Symbol.toStringTag : null, Jo = Object.prototype.propertyIsEnumerable, Bn = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(r) {
  return r.__proto__;
} : null);
function kn(r, t) {
  if (r === 1 / 0 || r === -1 / 0 || r !== r || r && r > -1e3 && r < 1e3 || Zo.call(/e/, t))
    return t;
  var e = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof r == "number") {
    var i = r < 0 ? -Un(-r) : Un(r);
    if (i !== r) {
      var s = String(i), n = Ks.call(t, s.length + 1);
      return te.call(s, e, "$&_") + "." + te.call(te.call(n, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return te.call(t, e, "$&_");
}
var gs = ou, Gn = gs.custom, Dn = ta(Gn) ? Gn : null, yu = function r(t, e, i, s) {
  var n = e || {};
  if (Qt(n, "quoteStyle") && n.quoteStyle !== "single" && n.quoteStyle !== "double")
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (Qt(n, "maxStringLength") && (typeof n.maxStringLength == "number" ? n.maxStringLength < 0 && n.maxStringLength !== 1 / 0 : n.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var o = Qt(n, "customInspect") ? n.customInspect : !0;
  if (typeof o != "boolean" && o !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (Qt(n, "indent") && n.indent !== null && n.indent !== "	" && !(parseInt(n.indent, 10) === n.indent && n.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (Qt(n, "numericSeparator") && typeof n.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var a = n.numericSeparator;
  if (typeof t > "u")
    return "undefined";
  if (t === null)
    return "null";
  if (typeof t == "boolean")
    return t ? "true" : "false";
  if (typeof t == "string")
    return ra(t, n);
  if (typeof t == "number") {
    if (t === 0)
      return 1 / 0 / t > 0 ? "0" : "-0";
    var h = String(t);
    return a ? kn(t, h) : h;
  }
  if (typeof t == "bigint") {
    var l = String(t) + "n";
    return a ? kn(t, l) : l;
  }
  var u = typeof n.depth > "u" ? 5 : n.depth;
  if (typeof i > "u" && (i = 0), i >= u && u > 0 && typeof t == "object")
    return vs(t) ? "[Array]" : "[Object]";
  var c = Ou(n, i);
  if (typeof s > "u")
    s = [];
  else if (ea(s, t) >= 0)
    return "[Circular]";
  function d(Q, ct, dt) {
    if (ct && (s = mu.call(s), s.push(ct)), dt) {
      var vt = {
        depth: n.depth
      };
      return Qt(n, "quoteStyle") && (vt.quoteStyle = n.quoteStyle), r(Q, vt, i + 1, s);
    }
    return r(Q, n, i + 1, s);
  }
  if (typeof t == "function" && !$n(t)) {
    var f = Iu(t), p = Mr(t, d);
    return "[Function" + (f ? ": " + f : " (anonymous)") + "]" + (p.length > 0 ? " { " + Gt.call(p, ", ") + " }" : "");
  }
  if (ta(t)) {
    var v = Ve ? te.call(String(t), /^(Symbol\(.*\))_[^)]*$/, "$1") : ys.call(t);
    return typeof t == "object" && !Ve ? Qe(v) : v;
  }
  if (Fu(t)) {
    for (var y = "<" + On.call(String(t.nodeName)), E = t.attributes || [], _ = 0; _ < E.length; _++)
      y += " " + E[_].name + "=" + Qo(gu(E[_].value), "double", n);
    return y += ">", t.childNodes && t.childNodes.length && (y += "..."), y += "</" + On.call(String(t.nodeName)) + ">", y;
  }
  if (vs(t)) {
    if (t.length === 0)
      return "[]";
    var g = Mr(t, d);
    return c && !Pu(g) ? "[" + _s(g, c) + "]" : "[ " + Gt.call(g, ", ") + " ]";
  }
  if (_u(t)) {
    var T = Mr(t, d);
    return !("cause" in Error.prototype) && "cause" in t && !Jo.call(t, "cause") ? "{ [" + String(t) + "] " + Gt.call(Ln.call("[cause]: " + d(t.cause), T), ", ") + " }" : T.length === 0 ? "[" + String(t) + "]" : "{ [" + String(t) + "] " + Gt.call(T, ", ") + " }";
  }
  if (typeof t == "object" && o) {
    if (Dn && typeof t[Dn] == "function" && gs)
      return gs(t, { depth: u - i });
    if (o !== "symbol" && typeof t.inspect == "function")
      return t.inspect();
  }
  if (Au(t)) {
    var A = [];
    return Fn && Fn.call(t, function(Q, ct) {
      A.push(d(ct, t, !0) + " => " + d(Q, t));
    }), Hn("Map", ai.call(t), A, c);
  }
  if (Cu(t)) {
    var k = [];
    return Nn && Nn.call(t, function(Q) {
      k.push(d(Q, t));
    }), Hn("Set", hi.call(t), k, c);
  }
  if (Ru(t))
    return $i("WeakMap");
  if (Mu(t))
    return $i("WeakSet");
  if (Su(t))
    return $i("WeakRef");
  if (bu(t))
    return Qe(d(Number(t)));
  if (Eu(t))
    return Qe(d(ms.call(t)));
  if (Tu(t))
    return Qe(uu.call(t));
  if (xu(t))
    return Qe(d(String(t)));
  if (typeof window < "u" && t === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && t === globalThis || typeof lr < "u" && t === lr)
    return "{ [object globalThis] }";
  if (!vu(t) && !$n(t)) {
    var W = Mr(t, d), R = Bn ? Bn(t) === Object.prototype : t instanceof Object || t.constructor === Object, S = t instanceof Object ? "" : "null prototype", M = !R && ut && Object(t) === t && ut in t ? Ks.call(ie(t), 8, -1) : S ? "Object" : "", rt = R || typeof t.constructor != "function" ? "" : t.constructor.name ? t.constructor.name + " " : "", At = rt + (M || S ? "[" + Gt.call(Ln.call([], M || [], S || []), ": ") + "] " : "");
    return W.length === 0 ? At + "{}" : c ? At + "{" + _s(W, c) + "}" : At + "{ " + Gt.call(W, ", ") + " }";
  }
  return String(t);
};
function Qo(r, t, e) {
  var i = (e.quoteStyle || t) === "double" ? '"' : "'";
  return i + r + i;
}
function gu(r) {
  return te.call(String(r), /"/g, "&quot;");
}
function vs(r) {
  return ie(r) === "[object Array]" && (!ut || !(typeof r == "object" && ut in r));
}
function vu(r) {
  return ie(r) === "[object Date]" && (!ut || !(typeof r == "object" && ut in r));
}
function $n(r) {
  return ie(r) === "[object RegExp]" && (!ut || !(typeof r == "object" && ut in r));
}
function _u(r) {
  return ie(r) === "[object Error]" && (!ut || !(typeof r == "object" && ut in r));
}
function xu(r) {
  return ie(r) === "[object String]" && (!ut || !(typeof r == "object" && ut in r));
}
function bu(r) {
  return ie(r) === "[object Number]" && (!ut || !(typeof r == "object" && ut in r));
}
function Tu(r) {
  return ie(r) === "[object Boolean]" && (!ut || !(typeof r == "object" && ut in r));
}
function ta(r) {
  if (Ve)
    return r && typeof r == "object" && r instanceof Symbol;
  if (typeof r == "symbol")
    return !0;
  if (!r || typeof r != "object" || !ys)
    return !1;
  try {
    return ys.call(r), !0;
  } catch {
  }
  return !1;
}
function Eu(r) {
  if (!r || typeof r != "object" || !ms)
    return !1;
  try {
    return ms.call(r), !0;
  } catch {
  }
  return !1;
}
var wu = Object.prototype.hasOwnProperty || function(r) {
  return r in this;
};
function Qt(r, t) {
  return wu.call(r, t);
}
function ie(r) {
  return cu.call(r);
}
function Iu(r) {
  if (r.name)
    return r.name;
  var t = fu.call(du.call(r), /^function\s*([\w$]+)/);
  return t ? t[1] : null;
}
function ea(r, t) {
  if (r.indexOf)
    return r.indexOf(t);
  for (var e = 0, i = r.length; e < i; e++)
    if (r[e] === t)
      return e;
  return -1;
}
function Au(r) {
  if (!ai || !r || typeof r != "object")
    return !1;
  try {
    ai.call(r);
    try {
      hi.call(r);
    } catch {
      return !0;
    }
    return r instanceof Map;
  } catch {
  }
  return !1;
}
function Ru(r) {
  if (!ur || !r || typeof r != "object")
    return !1;
  try {
    ur.call(r, ur);
    try {
      cr.call(r, cr);
    } catch {
      return !0;
    }
    return r instanceof WeakMap;
  } catch {
  }
  return !1;
}
function Su(r) {
  if (!Pn || !r || typeof r != "object")
    return !1;
  try {
    return Pn.call(r), !0;
  } catch {
  }
  return !1;
}
function Cu(r) {
  if (!hi || !r || typeof r != "object")
    return !1;
  try {
    hi.call(r);
    try {
      ai.call(r);
    } catch {
      return !0;
    }
    return r instanceof Set;
  } catch {
  }
  return !1;
}
function Mu(r) {
  if (!cr || !r || typeof r != "object")
    return !1;
  try {
    cr.call(r, cr);
    try {
      ur.call(r, ur);
    } catch {
      return !0;
    }
    return r instanceof WeakSet;
  } catch {
  }
  return !1;
}
function Fu(r) {
  return !r || typeof r != "object" ? !1 : typeof HTMLElement < "u" && r instanceof HTMLElement ? !0 : typeof r.nodeName == "string" && typeof r.getAttribute == "function";
}
function ra(r, t) {
  if (r.length > t.maxStringLength) {
    var e = r.length - t.maxStringLength, i = "... " + e + " more character" + (e > 1 ? "s" : "");
    return ra(Ks.call(r, 0, t.maxStringLength), t) + i;
  }
  var s = te.call(te.call(r, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, Nu);
  return Qo(s, "single", t);
}
function Nu(r) {
  var t = r.charCodeAt(0), e = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[t];
  return e ? "\\" + e : "\\x" + (t < 16 ? "0" : "") + pu.call(t.toString(16));
}
function Qe(r) {
  return "Object(" + r + ")";
}
function $i(r) {
  return r + " { ? }";
}
function Hn(r, t, e, i) {
  var s = i ? _s(e, i) : Gt.call(e, ", ");
  return r + " (" + t + ") {" + s + "}";
}
function Pu(r) {
  for (var t = 0; t < r.length; t++)
    if (ea(r[t], `
`) >= 0)
      return !1;
  return !0;
}
function Ou(r, t) {
  var e;
  if (r.indent === "	")
    e = "	";
  else if (typeof r.indent == "number" && r.indent > 0)
    e = Gt.call(Array(r.indent + 1), " ");
  else
    return null;
  return {
    base: e,
    prev: Gt.call(Array(t + 1), e)
  };
}
function _s(r, t) {
  if (r.length === 0)
    return "";
  var e = `
` + t.prev + t.base;
  return e + Gt.call(r, "," + e) + `
` + t.prev;
}
function Mr(r, t) {
  var e = vs(r), i = [];
  if (e) {
    i.length = r.length;
    for (var s = 0; s < r.length; s++)
      i[s] = Qt(r, s) ? t(r[s], r) : "";
  }
  var n = typeof Di == "function" ? Di(r) : [], o;
  if (Ve) {
    o = {};
    for (var a = 0; a < n.length; a++)
      o["$" + n[a]] = n[a];
  }
  for (var h in r)
    Qt(r, h) && (e && String(Number(h)) === h && h < r.length || Ve && o["$" + h] instanceof Symbol || (Zo.call(/[^\w$]/, h) ? i.push(t(h, r) + ": " + t(r[h], r)) : i.push(h + ": " + t(r[h], r))));
  if (typeof Di == "function")
    for (var l = 0; l < n.length; l++)
      Jo.call(r, n[l]) && i.push("[" + t(n[l]) + "]: " + t(r[n[l]], r));
  return i;
}
var ia = Ke, Ze = iu, Lu = yu, Uu = Er, Fr = ia("%WeakMap%", !0), Nr = ia("%Map%", !0), Bu = Ze("WeakMap.prototype.get", !0), ku = Ze("WeakMap.prototype.set", !0), Gu = Ze("WeakMap.prototype.has", !0), Du = Ze("Map.prototype.get", !0), $u = Ze("Map.prototype.set", !0), Hu = Ze("Map.prototype.has", !0), Zs = function(r, t) {
  for (var e = r, i; (i = e.next) !== null; e = i)
    if (i.key === t)
      return e.next = i.next, i.next = /** @type {NonNullable<typeof list.next>} */
      r.next, r.next = i, i;
}, Xu = function(r, t) {
  var e = Zs(r, t);
  return e && e.value;
}, Vu = function(r, t, e) {
  var i = Zs(r, t);
  i ? i.value = e : r.next = /** @type {import('.').ListNode<typeof value>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: t,
    next: r.next,
    value: e
  };
}, ju = function(r, t) {
  return !!Zs(r, t);
}, zu = function() {
  var t, e, i, s = {
    assert: function(n) {
      if (!s.has(n))
        throw new Uu("Side channel does not contain " + Lu(n));
    },
    get: function(n) {
      if (Fr && n && (typeof n == "object" || typeof n == "function")) {
        if (t)
          return Bu(t, n);
      } else if (Nr) {
        if (e)
          return Du(e, n);
      } else if (i)
        return Xu(i, n);
    },
    has: function(n) {
      if (Fr && n && (typeof n == "object" || typeof n == "function")) {
        if (t)
          return Gu(t, n);
      } else if (Nr) {
        if (e)
          return Hu(e, n);
      } else if (i)
        return ju(i, n);
      return !1;
    },
    set: function(n, o) {
      Fr && n && (typeof n == "object" || typeof n == "function") ? (t || (t = new Fr()), ku(t, n, o)) : Nr ? (e || (e = new Nr()), $u(e, n, o)) : (i || (i = { key: {}, next: null }), Vu(i, n, o));
    }
  };
  return s;
}, Wu = String.prototype.replace, Yu = /%20/g, Hi = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, Js = {
  default: Hi.RFC3986,
  formatters: {
    RFC1738: function(r) {
      return Wu.call(r, Yu, "+");
    },
    RFC3986: function(r) {
      return String(r);
    }
  },
  RFC1738: Hi.RFC1738,
  RFC3986: Hi.RFC3986
}, qu = Js, Xi = Object.prototype.hasOwnProperty, me = Array.isArray, Lt = function() {
  for (var r = [], t = 0; t < 256; ++t)
    r.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
  return r;
}(), Ku = function(t) {
  for (; t.length > 1; ) {
    var e = t.pop(), i = e.obj[e.prop];
    if (me(i)) {
      for (var s = [], n = 0; n < i.length; ++n)
        typeof i[n] < "u" && s.push(i[n]);
      e.obj[e.prop] = s;
    }
  }
}, sa = function(t, e) {
  for (var i = e && e.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, s = 0; s < t.length; ++s)
    typeof t[s] < "u" && (i[s] = t[s]);
  return i;
}, Zu = function r(t, e, i) {
  if (!e)
    return t;
  if (typeof e != "object") {
    if (me(t))
      t.push(e);
    else if (t && typeof t == "object")
      (i && (i.plainObjects || i.allowPrototypes) || !Xi.call(Object.prototype, e)) && (t[e] = !0);
    else
      return [t, e];
    return t;
  }
  if (!t || typeof t != "object")
    return [t].concat(e);
  var s = t;
  return me(t) && !me(e) && (s = sa(t, i)), me(t) && me(e) ? (e.forEach(function(n, o) {
    if (Xi.call(t, o)) {
      var a = t[o];
      a && typeof a == "object" && n && typeof n == "object" ? t[o] = r(a, n, i) : t.push(n);
    } else
      t[o] = n;
  }), t) : Object.keys(e).reduce(function(n, o) {
    var a = e[o];
    return Xi.call(n, o) ? n[o] = r(n[o], a, i) : n[o] = a, n;
  }, s);
}, Ju = function(t, e) {
  return Object.keys(e).reduce(function(i, s) {
    return i[s] = e[s], i;
  }, t);
}, Qu = function(r, t, e) {
  var i = r.replace(/\+/g, " ");
  if (e === "iso-8859-1")
    return i.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(i);
  } catch {
    return i;
  }
}, Vi = 1024, tc = function(t, e, i, s, n) {
  if (t.length === 0)
    return t;
  var o = t;
  if (typeof t == "symbol" ? o = Symbol.prototype.toString.call(t) : typeof t != "string" && (o = String(t)), i === "iso-8859-1")
    return escape(o).replace(/%u[0-9a-f]{4}/gi, function(f) {
      return "%26%23" + parseInt(f.slice(2), 16) + "%3B";
    });
  for (var a = "", h = 0; h < o.length; h += Vi) {
    for (var l = o.length >= Vi ? o.slice(h, h + Vi) : o, u = [], c = 0; c < l.length; ++c) {
      var d = l.charCodeAt(c);
      if (d === 45 || d === 46 || d === 95 || d === 126 || d >= 48 && d <= 57 || d >= 65 && d <= 90 || d >= 97 && d <= 122 || n === qu.RFC1738 && (d === 40 || d === 41)) {
        u[u.length] = l.charAt(c);
        continue;
      }
      if (d < 128) {
        u[u.length] = Lt[d];
        continue;
      }
      if (d < 2048) {
        u[u.length] = Lt[192 | d >> 6] + Lt[128 | d & 63];
        continue;
      }
      if (d < 55296 || d >= 57344) {
        u[u.length] = Lt[224 | d >> 12] + Lt[128 | d >> 6 & 63] + Lt[128 | d & 63];
        continue;
      }
      c += 1, d = 65536 + ((d & 1023) << 10 | l.charCodeAt(c) & 1023), u[u.length] = Lt[240 | d >> 18] + Lt[128 | d >> 12 & 63] + Lt[128 | d >> 6 & 63] + Lt[128 | d & 63];
    }
    a += u.join("");
  }
  return a;
}, ec = function(t) {
  for (var e = [{ obj: { o: t }, prop: "o" }], i = [], s = 0; s < e.length; ++s)
    for (var n = e[s], o = n.obj[n.prop], a = Object.keys(o), h = 0; h < a.length; ++h) {
      var l = a[h], u = o[l];
      typeof u == "object" && u !== null && i.indexOf(u) === -1 && (e.push({ obj: o, prop: l }), i.push(u));
    }
  return Ku(e), t;
}, rc = function(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}, ic = function(t) {
  return !t || typeof t != "object" ? !1 : !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t));
}, sc = function(t, e) {
  return [].concat(t, e);
}, nc = function(t, e) {
  if (me(t)) {
    for (var i = [], s = 0; s < t.length; s += 1)
      i.push(e(t[s]));
    return i;
  }
  return e(t);
}, na = {
  arrayToObject: sa,
  assign: Ju,
  combine: sc,
  compact: ec,
  decode: Qu,
  encode: tc,
  isBuffer: ic,
  isRegExp: rc,
  maybeMap: nc,
  merge: Zu
}, oa = zu, Vr = na, dr = Js, oc = Object.prototype.hasOwnProperty, aa = {
  brackets: function(t) {
    return t + "[]";
  },
  comma: "comma",
  indices: function(t, e) {
    return t + "[" + e + "]";
  },
  repeat: function(t) {
    return t;
  }
}, kt = Array.isArray, ac = Array.prototype.push, ha = function(r, t) {
  ac.apply(r, kt(t) ? t : [t]);
}, hc = Date.prototype.toISOString, Xn = dr.default, tt = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: Vr.encode,
  encodeValuesOnly: !1,
  format: Xn,
  formatter: dr.formatters[Xn],
  // deprecated
  indices: !1,
  serializeDate: function(t) {
    return hc.call(t);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, lc = function(t) {
  return typeof t == "string" || typeof t == "number" || typeof t == "boolean" || typeof t == "symbol" || typeof t == "bigint";
}, ji = {}, uc = function r(t, e, i, s, n, o, a, h, l, u, c, d, f, p, v, y, E, _) {
  for (var g = t, T = _, A = 0, k = !1; (T = T.get(ji)) !== void 0 && !k; ) {
    var W = T.get(t);
    if (A += 1, typeof W < "u") {
      if (W === A)
        throw new RangeError("Cyclic object value");
      k = !0;
    }
    typeof T.get(ji) > "u" && (A = 0);
  }
  if (typeof u == "function" ? g = u(e, g) : g instanceof Date ? g = f(g) : i === "comma" && kt(g) && (g = Vr.maybeMap(g, function(w) {
    return w instanceof Date ? f(w) : w;
  })), g === null) {
    if (o)
      return l && !y ? l(e, tt.encoder, E, "key", p) : e;
    g = "";
  }
  if (lc(g) || Vr.isBuffer(g)) {
    if (l) {
      var R = y ? e : l(e, tt.encoder, E, "key", p);
      return [v(R) + "=" + v(l(g, tt.encoder, E, "value", p))];
    }
    return [v(e) + "=" + v(String(g))];
  }
  var S = [];
  if (typeof g > "u")
    return S;
  var M;
  if (i === "comma" && kt(g))
    y && l && (g = Vr.maybeMap(g, l)), M = [{ value: g.length > 0 ? g.join(",") || null : void 0 }];
  else if (kt(u))
    M = u;
  else {
    var rt = Object.keys(g);
    M = c ? rt.sort(c) : rt;
  }
  var At = h ? e.replace(/\./g, "%2E") : e, Q = s && kt(g) && g.length === 1 ? At + "[]" : At;
  if (n && kt(g) && g.length === 0)
    return Q + "[]";
  for (var ct = 0; ct < M.length; ++ct) {
    var dt = M[ct], vt = typeof dt == "object" && typeof dt.value < "u" ? dt.value : g[dt];
    if (!(a && vt === null)) {
      var Kt = d && h ? dt.replace(/\./g, "%2E") : dt, Ri = kt(g) ? typeof i == "function" ? i(Q, Kt) : Q : Q + (d ? "." + Kt : "[" + Kt + "]");
      _.set(t, A);
      var Ir = oa();
      Ir.set(ji, _), ha(S, r(
        vt,
        Ri,
        i,
        s,
        n,
        o,
        a,
        h,
        i === "comma" && y && kt(g) ? null : l,
        u,
        c,
        d,
        f,
        p,
        v,
        y,
        E,
        Ir
      ));
    }
  }
  return S;
}, cc = function(t) {
  if (!t)
    return tt;
  if (typeof t.allowEmptyArrays < "u" && typeof t.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof t.encodeDotInKeys < "u" && typeof t.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (t.encoder !== null && typeof t.encoder < "u" && typeof t.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var e = t.charset || tt.charset;
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var i = dr.default;
  if (typeof t.format < "u") {
    if (!oc.call(dr.formatters, t.format))
      throw new TypeError("Unknown format option provided.");
    i = t.format;
  }
  var s = dr.formatters[i], n = tt.filter;
  (typeof t.filter == "function" || kt(t.filter)) && (n = t.filter);
  var o;
  if (t.arrayFormat in aa ? o = t.arrayFormat : "indices" in t ? o = t.indices ? "indices" : "repeat" : o = tt.arrayFormat, "commaRoundTrip" in t && typeof t.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var a = typeof t.allowDots > "u" ? t.encodeDotInKeys === !0 ? !0 : tt.allowDots : !!t.allowDots;
  return {
    addQueryPrefix: typeof t.addQueryPrefix == "boolean" ? t.addQueryPrefix : tt.addQueryPrefix,
    allowDots: a,
    allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : tt.allowEmptyArrays,
    arrayFormat: o,
    charset: e,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : tt.charsetSentinel,
    commaRoundTrip: t.commaRoundTrip,
    delimiter: typeof t.delimiter > "u" ? tt.delimiter : t.delimiter,
    encode: typeof t.encode == "boolean" ? t.encode : tt.encode,
    encodeDotInKeys: typeof t.encodeDotInKeys == "boolean" ? t.encodeDotInKeys : tt.encodeDotInKeys,
    encoder: typeof t.encoder == "function" ? t.encoder : tt.encoder,
    encodeValuesOnly: typeof t.encodeValuesOnly == "boolean" ? t.encodeValuesOnly : tt.encodeValuesOnly,
    filter: n,
    format: i,
    formatter: s,
    serializeDate: typeof t.serializeDate == "function" ? t.serializeDate : tt.serializeDate,
    skipNulls: typeof t.skipNulls == "boolean" ? t.skipNulls : tt.skipNulls,
    sort: typeof t.sort == "function" ? t.sort : null,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : tt.strictNullHandling
  };
}, dc = function(r, t) {
  var e = r, i = cc(t), s, n;
  typeof i.filter == "function" ? (n = i.filter, e = n("", e)) : kt(i.filter) && (n = i.filter, s = n);
  var o = [];
  if (typeof e != "object" || e === null)
    return "";
  var a = aa[i.arrayFormat], h = a === "comma" && i.commaRoundTrip;
  s || (s = Object.keys(e)), i.sort && s.sort(i.sort);
  for (var l = oa(), u = 0; u < s.length; ++u) {
    var c = s[u];
    i.skipNulls && e[c] === null || ha(o, uc(
      e[c],
      c,
      a,
      h,
      i.allowEmptyArrays,
      i.strictNullHandling,
      i.skipNulls,
      i.encodeDotInKeys,
      i.encode ? i.encoder : null,
      i.filter,
      i.sort,
      i.allowDots,
      i.serializeDate,
      i.format,
      i.formatter,
      i.encodeValuesOnly,
      i.charset,
      l
    ));
  }
  var d = o.join(i.delimiter), f = i.addQueryPrefix === !0 ? "?" : "";
  return i.charsetSentinel && (i.charset === "iso-8859-1" ? f += "utf8=%26%2310003%3B&" : f += "utf8=%E2%9C%93&"), d.length > 0 ? f + d : "";
}, je = na, xs = Object.prototype.hasOwnProperty, fc = Array.isArray, Z = {
  allowDots: !1,
  allowEmptyArrays: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decodeDotInKeys: !1,
  decoder: je.decode,
  delimiter: "&",
  depth: 5,
  duplicates: "combine",
  ignoreQueryPrefix: !1,
  interpretNumericEntities: !1,
  parameterLimit: 1e3,
  parseArrays: !0,
  plainObjects: !1,
  strictNullHandling: !1
}, pc = function(r) {
  return r.replace(/&#(\d+);/g, function(t, e) {
    return String.fromCharCode(parseInt(e, 10));
  });
}, la = function(r, t) {
  return r && typeof r == "string" && t.comma && r.indexOf(",") > -1 ? r.split(",") : r;
}, mc = "utf8=%26%2310003%3B", yc = "utf8=%E2%9C%93", gc = function(t, e) {
  var i = { __proto__: null }, s = e.ignoreQueryPrefix ? t.replace(/^\?/, "") : t;
  s = s.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var n = e.parameterLimit === 1 / 0 ? void 0 : e.parameterLimit, o = s.split(e.delimiter, n), a = -1, h, l = e.charset;
  if (e.charsetSentinel)
    for (h = 0; h < o.length; ++h)
      o[h].indexOf("utf8=") === 0 && (o[h] === yc ? l = "utf-8" : o[h] === mc && (l = "iso-8859-1"), a = h, h = o.length);
  for (h = 0; h < o.length; ++h)
    if (h !== a) {
      var u = o[h], c = u.indexOf("]="), d = c === -1 ? u.indexOf("=") : c + 1, f, p;
      d === -1 ? (f = e.decoder(u, Z.decoder, l, "key"), p = e.strictNullHandling ? null : "") : (f = e.decoder(u.slice(0, d), Z.decoder, l, "key"), p = je.maybeMap(
        la(u.slice(d + 1), e),
        function(y) {
          return e.decoder(y, Z.decoder, l, "value");
        }
      )), p && e.interpretNumericEntities && l === "iso-8859-1" && (p = pc(p)), u.indexOf("[]=") > -1 && (p = fc(p) ? [p] : p);
      var v = xs.call(i, f);
      v && e.duplicates === "combine" ? i[f] = je.combine(i[f], p) : (!v || e.duplicates === "last") && (i[f] = p);
    }
  return i;
}, vc = function(r, t, e, i) {
  for (var s = i ? t : la(t, e), n = r.length - 1; n >= 0; --n) {
    var o, a = r[n];
    if (a === "[]" && e.parseArrays)
      o = e.allowEmptyArrays && (s === "" || e.strictNullHandling && s === null) ? [] : [].concat(s);
    else {
      o = e.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var h = a.charAt(0) === "[" && a.charAt(a.length - 1) === "]" ? a.slice(1, -1) : a, l = e.decodeDotInKeys ? h.replace(/%2E/g, ".") : h, u = parseInt(l, 10);
      !e.parseArrays && l === "" ? o = { 0: s } : !isNaN(u) && a !== l && String(u) === l && u >= 0 && e.parseArrays && u <= e.arrayLimit ? (o = [], o[u] = s) : l !== "__proto__" && (o[l] = s);
    }
    s = o;
  }
  return s;
}, _c = function(t, e, i, s) {
  if (t) {
    var n = i.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t, o = /(\[[^[\]]*])/, a = /(\[[^[\]]*])/g, h = i.depth > 0 && o.exec(n), l = h ? n.slice(0, h.index) : n, u = [];
    if (l) {
      if (!i.plainObjects && xs.call(Object.prototype, l) && !i.allowPrototypes)
        return;
      u.push(l);
    }
    for (var c = 0; i.depth > 0 && (h = a.exec(n)) !== null && c < i.depth; ) {
      if (c += 1, !i.plainObjects && xs.call(Object.prototype, h[1].slice(1, -1)) && !i.allowPrototypes)
        return;
      u.push(h[1]);
    }
    return h && u.push("[" + n.slice(h.index) + "]"), vc(u, e, i, s);
  }
}, xc = function(t) {
  if (!t)
    return Z;
  if (typeof t.allowEmptyArrays < "u" && typeof t.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof t.decodeDotInKeys < "u" && typeof t.decodeDotInKeys != "boolean")
    throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
  if (t.decoder !== null && typeof t.decoder < "u" && typeof t.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var e = typeof t.charset > "u" ? Z.charset : t.charset, i = typeof t.duplicates > "u" ? Z.duplicates : t.duplicates;
  if (i !== "combine" && i !== "first" && i !== "last")
    throw new TypeError("The duplicates option must be either combine, first, or last");
  var s = typeof t.allowDots > "u" ? t.decodeDotInKeys === !0 ? !0 : Z.allowDots : !!t.allowDots;
  return {
    allowDots: s,
    allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : Z.allowEmptyArrays,
    allowPrototypes: typeof t.allowPrototypes == "boolean" ? t.allowPrototypes : Z.allowPrototypes,
    allowSparse: typeof t.allowSparse == "boolean" ? t.allowSparse : Z.allowSparse,
    arrayLimit: typeof t.arrayLimit == "number" ? t.arrayLimit : Z.arrayLimit,
    charset: e,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : Z.charsetSentinel,
    comma: typeof t.comma == "boolean" ? t.comma : Z.comma,
    decodeDotInKeys: typeof t.decodeDotInKeys == "boolean" ? t.decodeDotInKeys : Z.decodeDotInKeys,
    decoder: typeof t.decoder == "function" ? t.decoder : Z.decoder,
    delimiter: typeof t.delimiter == "string" || je.isRegExp(t.delimiter) ? t.delimiter : Z.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof t.depth == "number" || t.depth === !1 ? +t.depth : Z.depth,
    duplicates: i,
    ignoreQueryPrefix: t.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof t.interpretNumericEntities == "boolean" ? t.interpretNumericEntities : Z.interpretNumericEntities,
    parameterLimit: typeof t.parameterLimit == "number" ? t.parameterLimit : Z.parameterLimit,
    parseArrays: t.parseArrays !== !1,
    plainObjects: typeof t.plainObjects == "boolean" ? t.plainObjects : Z.plainObjects,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : Z.strictNullHandling
  };
}, bc = function(r, t) {
  var e = xc(t);
  if (r === "" || r === null || typeof r > "u")
    return e.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var i = typeof r == "string" ? gc(r, e) : r, s = e.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, n = Object.keys(i), o = 0; o < n.length; ++o) {
    var a = n[o], h = _c(a, i[a], e, typeof r == "string");
    s = je.merge(s, h, e);
  }
  return e.allowSparse === !0 ? s : je.compact(s);
}, Tc = dc, Ec = bc, wc = Js, Ic = {
  formats: wc,
  parse: Ec,
  stringify: Tc
}, Ac = al;
function Ft() {
  this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
}
var Rc = /^([a-z0-9.+-]+:)/i, Sc = /:[0-9]*$/, Cc = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/, Mc = [
  "<",
  ">",
  '"',
  "`",
  " ",
  "\r",
  `
`,
  "	"
], Fc = [
  "{",
  "}",
  "|",
  "\\",
  "^",
  "`"
].concat(Mc), bs = ["'"].concat(Fc), Vn = [
  "%",
  "/",
  "?",
  ";",
  "#"
].concat(bs), jn = [
  "/",
  "?",
  "#"
], Nc = 255, zn = /^[+a-z0-9A-Z_-]{0,63}$/, Pc = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, Oc = {
  javascript: !0,
  "javascript:": !0
}, Ts = {
  javascript: !0,
  "javascript:": !0
}, $e = {
  http: !0,
  https: !0,
  ftp: !0,
  gopher: !0,
  file: !0,
  "http:": !0,
  "https:": !0,
  "ftp:": !0,
  "gopher:": !0,
  "file:": !0
}, Es = Ic;
function Ti(r, t, e) {
  if (r && typeof r == "object" && r instanceof Ft)
    return r;
  var i = new Ft();
  return i.parse(r, t, e), i;
}
Ft.prototype.parse = function(r, t, e) {
  if (typeof r != "string")
    throw new TypeError("Parameter 'url' must be a string, not " + typeof r);
  var i = r.indexOf("?"), s = i !== -1 && i < r.indexOf("#") ? "?" : "#", n = r.split(s), o = /\\/g;
  n[0] = n[0].replace(o, "/"), r = n.join(s);
  var a = r;
  if (a = a.trim(), !e && r.split("#").length === 1) {
    var h = Cc.exec(a);
    if (h)
      return this.path = a, this.href = a, this.pathname = h[1], h[2] ? (this.search = h[2], t ? this.query = Es.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : t && (this.search = "", this.query = {}), this;
  }
  var l = Rc.exec(a);
  if (l) {
    l = l[0];
    var u = l.toLowerCase();
    this.protocol = u, a = a.substr(l.length);
  }
  if (e || l || a.match(/^\/\/[^@/]+@[^@/]+/)) {
    var c = a.substr(0, 2) === "//";
    c && !(l && Ts[l]) && (a = a.substr(2), this.slashes = !0);
  }
  if (!Ts[l] && (c || l && !$e[l])) {
    for (var d = -1, f = 0; f < jn.length; f++) {
      var p = a.indexOf(jn[f]);
      p !== -1 && (d === -1 || p < d) && (d = p);
    }
    var v, y;
    d === -1 ? y = a.lastIndexOf("@") : y = a.lastIndexOf("@", d), y !== -1 && (v = a.slice(0, y), a = a.slice(y + 1), this.auth = decodeURIComponent(v)), d = -1;
    for (var f = 0; f < Vn.length; f++) {
      var p = a.indexOf(Vn[f]);
      p !== -1 && (d === -1 || p < d) && (d = p);
    }
    d === -1 && (d = a.length), this.host = a.slice(0, d), a = a.slice(d), this.parseHost(), this.hostname = this.hostname || "";
    var E = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!E)
      for (var _ = this.hostname.split(/\./), f = 0, g = _.length; f < g; f++) {
        var T = _[f];
        if (T && !T.match(zn)) {
          for (var A = "", k = 0, W = T.length; k < W; k++)
            T.charCodeAt(k) > 127 ? A += "x" : A += T[k];
          if (!A.match(zn)) {
            var R = _.slice(0, f), S = _.slice(f + 1), M = T.match(Pc);
            M && (R.push(M[1]), S.unshift(M[2])), S.length && (a = "/" + S.join(".") + a), this.hostname = R.join(".");
            break;
          }
        }
      }
    this.hostname.length > Nc ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), E || (this.hostname = Ac.toASCII(this.hostname));
    var rt = this.port ? ":" + this.port : "", At = this.hostname || "";
    this.host = At + rt, this.href += this.host, E && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), a[0] !== "/" && (a = "/" + a));
  }
  if (!Oc[u])
    for (var f = 0, g = bs.length; f < g; f++) {
      var Q = bs[f];
      if (a.indexOf(Q) !== -1) {
        var ct = encodeURIComponent(Q);
        ct === Q && (ct = escape(Q)), a = a.split(Q).join(ct);
      }
    }
  var dt = a.indexOf("#");
  dt !== -1 && (this.hash = a.substr(dt), a = a.slice(0, dt));
  var vt = a.indexOf("?");
  if (vt !== -1 ? (this.search = a.substr(vt), this.query = a.substr(vt + 1), t && (this.query = Es.parse(this.query)), a = a.slice(0, vt)) : t && (this.search = "", this.query = {}), a && (this.pathname = a), $e[u] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
    var rt = this.pathname || "", Kt = this.search || "";
    this.path = rt + Kt;
  }
  return this.href = this.format(), this;
};
function Lc(r) {
  return typeof r == "string" && (r = Ti(r)), r instanceof Ft ? r.format() : Ft.prototype.format.call(r);
}
Ft.prototype.format = function() {
  var r = this.auth || "";
  r && (r = encodeURIComponent(r), r = r.replace(/%3A/i, ":"), r += "@");
  var t = this.protocol || "", e = this.pathname || "", i = this.hash || "", s = !1, n = "";
  this.host ? s = r + this.host : this.hostname && (s = r + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (s += ":" + this.port)), this.query && typeof this.query == "object" && Object.keys(this.query).length && (n = Es.stringify(this.query, {
    arrayFormat: "repeat",
    addQueryPrefix: !1
  }));
  var o = this.search || n && "?" + n || "";
  return t && t.substr(-1) !== ":" && (t += ":"), this.slashes || (!t || $e[t]) && s !== !1 ? (s = "//" + (s || ""), e && e.charAt(0) !== "/" && (e = "/" + e)) : s || (s = ""), i && i.charAt(0) !== "#" && (i = "#" + i), o && o.charAt(0) !== "?" && (o = "?" + o), e = e.replace(/[?#]/g, function(a) {
    return encodeURIComponent(a);
  }), o = o.replace("#", "%23"), t + s + e + o + i;
};
function Uc(r, t) {
  return Ti(r, !1, !0).resolve(t);
}
Ft.prototype.resolve = function(r) {
  return this.resolveObject(Ti(r, !1, !0)).format();
};
Ft.prototype.resolveObject = function(r) {
  if (typeof r == "string") {
    var t = new Ft();
    t.parse(r, !1, !0), r = t;
  }
  for (var e = new Ft(), i = Object.keys(this), s = 0; s < i.length; s++) {
    var n = i[s];
    e[n] = this[n];
  }
  if (e.hash = r.hash, r.href === "")
    return e.href = e.format(), e;
  if (r.slashes && !r.protocol) {
    for (var o = Object.keys(r), a = 0; a < o.length; a++) {
      var h = o[a];
      h !== "protocol" && (e[h] = r[h]);
    }
    return $e[e.protocol] && e.hostname && !e.pathname && (e.pathname = "/", e.path = e.pathname), e.href = e.format(), e;
  }
  if (r.protocol && r.protocol !== e.protocol) {
    if (!$e[r.protocol]) {
      for (var l = Object.keys(r), u = 0; u < l.length; u++) {
        var c = l[u];
        e[c] = r[c];
      }
      return e.href = e.format(), e;
    }
    if (e.protocol = r.protocol, !r.host && !Ts[r.protocol]) {
      for (var g = (r.pathname || "").split("/"); g.length && !(r.host = g.shift()); )
        ;
      r.host || (r.host = ""), r.hostname || (r.hostname = ""), g[0] !== "" && g.unshift(""), g.length < 2 && g.unshift(""), e.pathname = g.join("/");
    } else
      e.pathname = r.pathname;
    if (e.search = r.search, e.query = r.query, e.host = r.host || "", e.auth = r.auth, e.hostname = r.hostname || r.host, e.port = r.port, e.pathname || e.search) {
      var d = e.pathname || "", f = e.search || "";
      e.path = d + f;
    }
    return e.slashes = e.slashes || r.slashes, e.href = e.format(), e;
  }
  var p = e.pathname && e.pathname.charAt(0) === "/", v = r.host || r.pathname && r.pathname.charAt(0) === "/", y = v || p || e.host && r.pathname, E = y, _ = e.pathname && e.pathname.split("/") || [], g = r.pathname && r.pathname.split("/") || [], T = e.protocol && !$e[e.protocol];
  if (T && (e.hostname = "", e.port = null, e.host && (_[0] === "" ? _[0] = e.host : _.unshift(e.host)), e.host = "", r.protocol && (r.hostname = null, r.port = null, r.host && (g[0] === "" ? g[0] = r.host : g.unshift(r.host)), r.host = null), y = y && (g[0] === "" || _[0] === "")), v)
    e.host = r.host || r.host === "" ? r.host : e.host, e.hostname = r.hostname || r.hostname === "" ? r.hostname : e.hostname, e.search = r.search, e.query = r.query, _ = g;
  else if (g.length)
    _ || (_ = []), _.pop(), _ = _.concat(g), e.search = r.search, e.query = r.query;
  else if (r.search != null) {
    if (T) {
      e.host = _.shift(), e.hostname = e.host;
      var A = e.host && e.host.indexOf("@") > 0 ? e.host.split("@") : !1;
      A && (e.auth = A.shift(), e.hostname = A.shift(), e.host = e.hostname);
    }
    return e.search = r.search, e.query = r.query, (e.pathname !== null || e.search !== null) && (e.path = (e.pathname ? e.pathname : "") + (e.search ? e.search : "")), e.href = e.format(), e;
  }
  if (!_.length)
    return e.pathname = null, e.search ? e.path = "/" + e.search : e.path = null, e.href = e.format(), e;
  for (var k = _.slice(-1)[0], W = (e.host || r.host || _.length > 1) && (k === "." || k === "..") || k === "", R = 0, S = _.length; S >= 0; S--)
    k = _[S], k === "." ? _.splice(S, 1) : k === ".." ? (_.splice(S, 1), R++) : R && (_.splice(S, 1), R--);
  if (!y && !E)
    for (; R--; R)
      _.unshift("..");
  y && _[0] !== "" && (!_[0] || _[0].charAt(0) !== "/") && _.unshift(""), W && _.join("/").substr(-1) !== "/" && _.push("");
  var M = _[0] === "" || _[0] && _[0].charAt(0) === "/";
  if (T) {
    e.hostname = M ? "" : _.length ? _.shift() : "", e.host = e.hostname;
    var A = e.host && e.host.indexOf("@") > 0 ? e.host.split("@") : !1;
    A && (e.auth = A.shift(), e.hostname = A.shift(), e.host = e.hostname);
  }
  return y = y || e.host && _.length, y && !M && _.unshift(""), _.length > 0 ? e.pathname = _.join("/") : (e.pathname = null, e.path = null), (e.pathname !== null || e.search !== null) && (e.path = (e.pathname ? e.pathname : "") + (e.search ? e.search : "")), e.auth = r.auth || e.auth, e.slashes = e.slashes || r.slashes, e.href = e.format(), e;
};
Ft.prototype.parseHost = function() {
  var r = this.host, t = Sc.exec(r);
  t && (t = t[0], t !== ":" && (this.port = t.substr(1)), r = r.substr(0, r.length - t.length)), r && (this.hostname = r);
};
var Bc = Ti, kc = Uc, Gc = Lc;
const Wn = {};
function O(r, t, e = 3) {
  if (Wn[t])
    return;
  let i = new Error().stack;
  typeof i > "u" ? console.warn("PixiJS Deprecation Warning: ", `${t}
Deprecated since v${r}`) : (i = i.split(`
`).splice(e).join(`
`), console.groupCollapsed ? (console.groupCollapsed(
    "%cPixiJS Deprecation Warning: %c%s",
    "color:#614108;background:#fffbe6",
    "font-weight:normal;color:#614108;background:#fffbe6",
    `${t}
Deprecated since v${r}`
  ), console.warn(i), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", `${t}
Deprecated since v${r}`), console.warn(i))), Wn[t] = !0;
}
const Qs = {
  /**
   * @deprecated since 7.3.0
   */
  get parse() {
    return O("7.3.0", "utils.url.parse is deprecated, use native URL API instead."), Bc;
  },
  /**
   * @deprecated since 7.3.0
   */
  get format() {
    return O("7.3.0", "utils.url.format is deprecated, use native URL API instead."), Gc;
  },
  /**
   * @deprecated since 7.3.0
   */
  get resolve() {
    return O("7.3.0", "utils.url.resolve is deprecated, use native URL API instead."), kc;
  }
};
let zi;
function Dc() {
  return typeof zi > "u" && (zi = function() {
    var t;
    const r = {
      stencil: !0,
      failIfMajorPerformanceCaveat: L.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
    };
    try {
      if (!L.ADAPTER.getWebGLRenderingContext())
        return !1;
      const e = L.ADAPTER.createCanvas();
      let i = e.getContext("webgl", r) || e.getContext("experimental-webgl", r);
      const s = !!((t = i == null ? void 0 : i.getContextAttributes()) != null && t.stencil);
      if (i) {
        const n = i.getExtension("WEBGL_lose_context");
        n && n.loseContext();
      }
      return i = null, s;
    } catch {
      return !1;
    }
  }()), zi;
}
var $c = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, Vt = function(r) {
  return typeof r == "string" ? r.length > 0 : typeof r == "number";
}, st = function(r, t, e) {
  return t === void 0 && (t = 0), e === void 0 && (e = Math.pow(10, t)), Math.round(e * r) / e + 0;
}, wt = function(r, t, e) {
  return t === void 0 && (t = 0), e === void 0 && (e = 1), r > e ? e : r > t ? r : t;
}, ua = function(r) {
  return (r = isFinite(r) ? r % 360 : 0) > 0 ? r : r + 360;
}, Yn = function(r) {
  return { r: wt(r.r, 0, 255), g: wt(r.g, 0, 255), b: wt(r.b, 0, 255), a: wt(r.a) };
}, Wi = function(r) {
  return { r: st(r.r), g: st(r.g), b: st(r.b), a: st(r.a, 3) };
}, Hc = /^#([0-9a-f]{3,8})$/i, Pr = function(r) {
  var t = r.toString(16);
  return t.length < 2 ? "0" + t : t;
}, ca = function(r) {
  var t = r.r, e = r.g, i = r.b, s = r.a, n = Math.max(t, e, i), o = n - Math.min(t, e, i), a = o ? n === t ? (e - i) / o : n === e ? 2 + (i - t) / o : 4 + (t - e) / o : 0;
  return { h: 60 * (a < 0 ? a + 6 : a), s: n ? o / n * 100 : 0, v: n / 255 * 100, a: s };
}, da = function(r) {
  var t = r.h, e = r.s, i = r.v, s = r.a;
  t = t / 360 * 6, e /= 100, i /= 100;
  var n = Math.floor(t), o = i * (1 - e), a = i * (1 - (t - n) * e), h = i * (1 - (1 - t + n) * e), l = n % 6;
  return { r: 255 * [i, a, o, o, h, i][l], g: 255 * [h, i, i, a, o, o][l], b: 255 * [o, o, h, i, i, a][l], a: s };
}, qn = function(r) {
  return { h: ua(r.h), s: wt(r.s, 0, 100), l: wt(r.l, 0, 100), a: wt(r.a) };
}, Kn = function(r) {
  return { h: st(r.h), s: st(r.s), l: st(r.l), a: st(r.a, 3) };
}, Zn = function(r) {
  return da((e = (t = r).s, { h: t.h, s: (e *= ((i = t.l) < 50 ? i : 100 - i) / 100) > 0 ? 2 * e / (i + e) * 100 : 0, v: i + e, a: t.a }));
  var t, e, i;
}, fr = function(r) {
  return { h: (t = ca(r)).h, s: (s = (200 - (e = t.s)) * (i = t.v) / 100) > 0 && s < 200 ? e * i / 100 / (s <= 100 ? s : 200 - s) * 100 : 0, l: s / 2, a: t.a };
  var t, e, i, s;
}, Xc = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Vc = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, jc = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, zc = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, ws = { string: [[function(r) {
  var t = Hc.exec(r);
  return t ? (r = t[1]).length <= 4 ? { r: parseInt(r[0] + r[0], 16), g: parseInt(r[1] + r[1], 16), b: parseInt(r[2] + r[2], 16), a: r.length === 4 ? st(parseInt(r[3] + r[3], 16) / 255, 2) : 1 } : r.length === 6 || r.length === 8 ? { r: parseInt(r.substr(0, 2), 16), g: parseInt(r.substr(2, 2), 16), b: parseInt(r.substr(4, 2), 16), a: r.length === 8 ? st(parseInt(r.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(r) {
  var t = jc.exec(r) || zc.exec(r);
  return t ? t[2] !== t[4] || t[4] !== t[6] ? null : Yn({ r: Number(t[1]) / (t[2] ? 100 / 255 : 1), g: Number(t[3]) / (t[4] ? 100 / 255 : 1), b: Number(t[5]) / (t[6] ? 100 / 255 : 1), a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1) }) : null;
}, "rgb"], [function(r) {
  var t = Xc.exec(r) || Vc.exec(r);
  if (!t) return null;
  var e, i, s = qn({ h: (e = t[1], i = t[2], i === void 0 && (i = "deg"), Number(e) * ($c[i] || 1)), s: Number(t[3]), l: Number(t[4]), a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1) });
  return Zn(s);
}, "hsl"]], object: [[function(r) {
  var t = r.r, e = r.g, i = r.b, s = r.a, n = s === void 0 ? 1 : s;
  return Vt(t) && Vt(e) && Vt(i) ? Yn({ r: Number(t), g: Number(e), b: Number(i), a: Number(n) }) : null;
}, "rgb"], [function(r) {
  var t = r.h, e = r.s, i = r.l, s = r.a, n = s === void 0 ? 1 : s;
  if (!Vt(t) || !Vt(e) || !Vt(i)) return null;
  var o = qn({ h: Number(t), s: Number(e), l: Number(i), a: Number(n) });
  return Zn(o);
}, "hsl"], [function(r) {
  var t = r.h, e = r.s, i = r.v, s = r.a, n = s === void 0 ? 1 : s;
  if (!Vt(t) || !Vt(e) || !Vt(i)) return null;
  var o = function(a) {
    return { h: ua(a.h), s: wt(a.s, 0, 100), v: wt(a.v, 0, 100), a: wt(a.a) };
  }({ h: Number(t), s: Number(e), v: Number(i), a: Number(n) });
  return da(o);
}, "hsv"]] }, Jn = function(r, t) {
  for (var e = 0; e < t.length; e++) {
    var i = t[e][0](r);
    if (i) return [i, t[e][1]];
  }
  return [null, void 0];
}, Wc = function(r) {
  return typeof r == "string" ? Jn(r.trim(), ws.string) : typeof r == "object" && r !== null ? Jn(r, ws.object) : [null, void 0];
}, Yi = function(r, t) {
  var e = fr(r);
  return { h: e.h, s: wt(e.s + 100 * t, 0, 100), l: e.l, a: e.a };
}, qi = function(r) {
  return (299 * r.r + 587 * r.g + 114 * r.b) / 1e3 / 255;
}, Qn = function(r, t) {
  var e = fr(r);
  return { h: e.h, s: e.s, l: wt(e.l + 100 * t, 0, 100), a: e.a };
}, Is = function() {
  function r(t) {
    this.parsed = Wc(t)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return r.prototype.isValid = function() {
    return this.parsed !== null;
  }, r.prototype.brightness = function() {
    return st(qi(this.rgba), 2);
  }, r.prototype.isDark = function() {
    return qi(this.rgba) < 0.5;
  }, r.prototype.isLight = function() {
    return qi(this.rgba) >= 0.5;
  }, r.prototype.toHex = function() {
    return t = Wi(this.rgba), e = t.r, i = t.g, s = t.b, o = (n = t.a) < 1 ? Pr(st(255 * n)) : "", "#" + Pr(e) + Pr(i) + Pr(s) + o;
    var t, e, i, s, n, o;
  }, r.prototype.toRgb = function() {
    return Wi(this.rgba);
  }, r.prototype.toRgbString = function() {
    return t = Wi(this.rgba), e = t.r, i = t.g, s = t.b, (n = t.a) < 1 ? "rgba(" + e + ", " + i + ", " + s + ", " + n + ")" : "rgb(" + e + ", " + i + ", " + s + ")";
    var t, e, i, s, n;
  }, r.prototype.toHsl = function() {
    return Kn(fr(this.rgba));
  }, r.prototype.toHslString = function() {
    return t = Kn(fr(this.rgba)), e = t.h, i = t.s, s = t.l, (n = t.a) < 1 ? "hsla(" + e + ", " + i + "%, " + s + "%, " + n + ")" : "hsl(" + e + ", " + i + "%, " + s + "%)";
    var t, e, i, s, n;
  }, r.prototype.toHsv = function() {
    return t = ca(this.rgba), { h: st(t.h), s: st(t.s), v: st(t.v), a: st(t.a, 3) };
    var t;
  }, r.prototype.invert = function() {
    return Ut({ r: 255 - (t = this.rgba).r, g: 255 - t.g, b: 255 - t.b, a: t.a });
    var t;
  }, r.prototype.saturate = function(t) {
    return t === void 0 && (t = 0.1), Ut(Yi(this.rgba, t));
  }, r.prototype.desaturate = function(t) {
    return t === void 0 && (t = 0.1), Ut(Yi(this.rgba, -t));
  }, r.prototype.grayscale = function() {
    return Ut(Yi(this.rgba, -1));
  }, r.prototype.lighten = function(t) {
    return t === void 0 && (t = 0.1), Ut(Qn(this.rgba, t));
  }, r.prototype.darken = function(t) {
    return t === void 0 && (t = 0.1), Ut(Qn(this.rgba, -t));
  }, r.prototype.rotate = function(t) {
    return t === void 0 && (t = 15), this.hue(this.hue() + t);
  }, r.prototype.alpha = function(t) {
    return typeof t == "number" ? Ut({ r: (e = this.rgba).r, g: e.g, b: e.b, a: t }) : st(this.rgba.a, 3);
    var e;
  }, r.prototype.hue = function(t) {
    var e = fr(this.rgba);
    return typeof t == "number" ? Ut({ h: t, s: e.s, l: e.l, a: e.a }) : st(e.h);
  }, r.prototype.isEqual = function(t) {
    return this.toHex() === Ut(t).toHex();
  }, r;
}(), Ut = function(r) {
  return r instanceof Is ? r : new Is(r);
}, to = [], Yc = function(r) {
  r.forEach(function(t) {
    to.indexOf(t) < 0 && (t(Is, ws), to.push(t));
  });
};
function qc(r, t) {
  var e = { white: "#ffffff", bisque: "#ffe4c4", blue: "#0000ff", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", antiquewhite: "#faebd7", aqua: "#00ffff", azure: "#f0ffff", whitesmoke: "#f5f5f5", papayawhip: "#ffefd5", plum: "#dda0dd", blanchedalmond: "#ffebcd", black: "#000000", gold: "#ffd700", goldenrod: "#daa520", gainsboro: "#dcdcdc", cornsilk: "#fff8dc", cornflowerblue: "#6495ed", burlywood: "#deb887", aquamarine: "#7fffd4", beige: "#f5f5dc", crimson: "#dc143c", cyan: "#00ffff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkkhaki: "#bdb76b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9", peachpuff: "#ffdab9", darkmagenta: "#8b008b", darkred: "#8b0000", darkorchid: "#9932cc", darkorange: "#ff8c00", darkslateblue: "#483d8b", gray: "#808080", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", deeppink: "#ff1493", deepskyblue: "#00bfff", wheat: "#f5deb3", firebrick: "#b22222", floralwhite: "#fffaf0", ghostwhite: "#f8f8ff", darkviolet: "#9400d3", magenta: "#ff00ff", green: "#008000", dodgerblue: "#1e90ff", grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", blueviolet: "#8a2be2", forestgreen: "#228b22", lawngreen: "#7cfc00", indianred: "#cd5c5c", indigo: "#4b0082", fuchsia: "#ff00ff", brown: "#a52a2a", maroon: "#800000", mediumblue: "#0000cd", lightcoral: "#f08080", darkturquoise: "#00ced1", lightcyan: "#e0ffff", ivory: "#fffff0", lightyellow: "#ffffe0", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", linen: "#faf0e6", mediumaquamarine: "#66cdaa", lemonchiffon: "#fffacd", lime: "#00ff00", khaki: "#f0e68c", mediumseagreen: "#3cb371", limegreen: "#32cd32", mediumspringgreen: "#00fa9a", lightskyblue: "#87cefa", lightblue: "#add8e6", midnightblue: "#191970", lightpink: "#ffb6c1", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", mintcream: "#f5fffa", lightslategray: "#778899", lightslategrey: "#778899", navajowhite: "#ffdead", navy: "#000080", mediumvioletred: "#c71585", powderblue: "#b0e0e6", palegoldenrod: "#eee8aa", oldlace: "#fdf5e6", paleturquoise: "#afeeee", mediumturquoise: "#48d1cc", mediumorchid: "#ba55d3", rebeccapurple: "#663399", lightsteelblue: "#b0c4de", mediumslateblue: "#7b68ee", thistle: "#d8bfd8", tan: "#d2b48c", orchid: "#da70d6", mediumpurple: "#9370db", purple: "#800080", pink: "#ffc0cb", skyblue: "#87ceeb", springgreen: "#00ff7f", palegreen: "#98fb98", red: "#ff0000", yellow: "#ffff00", slateblue: "#6a5acd", lavenderblush: "#fff0f5", peru: "#cd853f", palevioletred: "#db7093", violet: "#ee82ee", teal: "#008080", slategray: "#708090", slategrey: "#708090", aliceblue: "#f0f8ff", darkseagreen: "#8fbc8f", darkolivegreen: "#556b2f", greenyellow: "#adff2f", seagreen: "#2e8b57", seashell: "#fff5ee", tomato: "#ff6347", silver: "#c0c0c0", sienna: "#a0522d", lavender: "#e6e6fa", lightgreen: "#90ee90", orange: "#ffa500", orangered: "#ff4500", steelblue: "#4682b4", royalblue: "#4169e1", turquoise: "#40e0d0", yellowgreen: "#9acd32", salmon: "#fa8072", saddlebrown: "#8b4513", sandybrown: "#f4a460", rosybrown: "#bc8f8f", darksalmon: "#e9967a", lightgoldenrodyellow: "#fafad2", snow: "#fffafa", lightgrey: "#d3d3d3", lightgray: "#d3d3d3", dimgray: "#696969", dimgrey: "#696969", olivedrab: "#6b8e23", olive: "#808000" }, i = {};
  for (var s in e) i[e[s]] = s;
  var n = {};
  r.prototype.toName = function(o) {
    if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b)) return "transparent";
    var a, h, l = i[this.toHex()];
    if (l) return l;
    if (o != null && o.closest) {
      var u = this.toRgb(), c = 1 / 0, d = "black";
      if (!n.length) for (var f in e) n[f] = new r(e[f]).toRgb();
      for (var p in e) {
        var v = (a = u, h = n[p], Math.pow(a.r - h.r, 2) + Math.pow(a.g - h.g, 2) + Math.pow(a.b - h.b, 2));
        v < c && (c = v, d = p);
      }
      return d;
    }
  }, t.string.push([function(o) {
    var a = o.toLowerCase(), h = a === "transparent" ? "#0000" : e[a];
    return h ? new r(h).toRgb() : null;
  }, "name"]);
}
Yc([qc]);
const Fe = class jr {
  /**
   * @param {PIXI.ColorSource} value - Optional value to use, if not provided, white is used.
   */
  constructor(t = 16777215) {
    this._value = null, this._components = new Float32Array(4), this._components.fill(1), this._int = 16777215, this.value = t;
  }
  /** Get red component (0 - 1) */
  get red() {
    return this._components[0];
  }
  /** Get green component (0 - 1) */
  get green() {
    return this._components[1];
  }
  /** Get blue component (0 - 1) */
  get blue() {
    return this._components[2];
  }
  /** Get alpha component (0 - 1) */
  get alpha() {
    return this._components[3];
  }
  /**
   * Set the value, suitable for chaining
   * @param value
   * @see PIXI.Color.value
   */
  setValue(t) {
    return this.value = t, this;
  }
  /**
   * The current color source.
   *
   * When setting:
   * - Setting to an instance of `Color` will copy its color source and components.
   * - Otherwise, `Color` will try to normalize the color source and set the components.
   *   If the color source is invalid, an `Error` will be thrown and the `Color` will left unchanged.
   *
   * Note: The `null` in the setter's parameter type is added to match the TypeScript rule: return type of getter
   * must be assignable to its setter's parameter type. Setting `value` to `null` will throw an `Error`.
   *
   * When getting:
   * - A return value of `null` means the previous value was overridden (e.g., {@link PIXI.Color.multiply multiply},
   *   {@link PIXI.Color.premultiply premultiply} or {@link PIXI.Color.round round}).
   * - Otherwise, the color source used when setting is returned.
   * @type {PIXI.ColorSource}
   */
  set value(t) {
    if (t instanceof jr)
      this._value = this.cloneSource(t._value), this._int = t._int, this._components.set(t._components);
    else {
      if (t === null)
        throw new Error("Cannot set PIXI.Color#value to null");
      (this._value === null || !this.isSourceEqual(this._value, t)) && (this.normalize(t), this._value = this.cloneSource(t));
    }
  }
  get value() {
    return this._value;
  }
  /**
   * Copy a color source internally.
   * @param value - Color source
   */
  cloneSource(t) {
    return typeof t == "string" || typeof t == "number" || t instanceof Number || t === null ? t : Array.isArray(t) || ArrayBuffer.isView(t) ? t.slice(0) : typeof t == "object" && t !== null ? { ...t } : t;
  }
  /**
   * Equality check for color sources.
   * @param value1 - First color source
   * @param value2 - Second color source
   * @returns `true` if the color sources are equal, `false` otherwise.
   */
  isSourceEqual(t, e) {
    const i = typeof t;
    if (i !== typeof e)
      return !1;
    if (i === "number" || i === "string" || t instanceof Number)
      return t === e;
    if (Array.isArray(t) && Array.isArray(e) || ArrayBuffer.isView(t) && ArrayBuffer.isView(e))
      return t.length !== e.length ? !1 : t.every((s, n) => s === e[n]);
    if (t !== null && e !== null) {
      const s = Object.keys(t), n = Object.keys(e);
      return s.length !== n.length ? !1 : s.every((o) => t[o] === e[o]);
    }
    return t === e;
  }
  /**
   * Convert to a RGBA color object.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toRgb(); // returns { r: 1, g: 1, b: 1, a: 1 }
   */
  toRgba() {
    const [t, e, i, s] = this._components;
    return { r: t, g: e, b: i, a: s };
  }
  /**
   * Convert to a RGB color object.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toRgb(); // returns { r: 1, g: 1, b: 1 }
   */
  toRgb() {
    const [t, e, i] = this._components;
    return { r: t, g: e, b: i };
  }
  /** Convert to a CSS-style rgba string: `rgba(255,255,255,1.0)`. */
  toRgbaString() {
    const [t, e, i] = this.toUint8RgbArray();
    return `rgba(${t},${e},${i},${this.alpha})`;
  }
  toUint8RgbArray(t) {
    const [e, i, s] = this._components;
    return t = t ?? [], t[0] = Math.round(e * 255), t[1] = Math.round(i * 255), t[2] = Math.round(s * 255), t;
  }
  toRgbArray(t) {
    t = t ?? [];
    const [e, i, s] = this._components;
    return t[0] = e, t[1] = i, t[2] = s, t;
  }
  /**
   * Convert to a hexadecimal number.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toNumber(); // returns 16777215
   */
  toNumber() {
    return this._int;
  }
  /**
   * Convert to a hexadecimal number in little endian format (e.g., BBGGRR).
   * @example
   * import { Color } from 'pixi.js';
   * new Color(0xffcc99).toLittleEndianNumber(); // returns 0x99ccff
   * @returns {number} - The color as a number in little endian format.
   */
  toLittleEndianNumber() {
    const t = this._int;
    return (t >> 16) + (t & 65280) + ((t & 255) << 16);
  }
  /**
   * Multiply with another color. This action is destructive, and will
   * override the previous `value` property to be `null`.
   * @param {PIXI.ColorSource} value - The color to multiply by.
   */
  multiply(t) {
    const [e, i, s, n] = jr.temp.setValue(t)._components;
    return this._components[0] *= e, this._components[1] *= i, this._components[2] *= s, this._components[3] *= n, this.refreshInt(), this._value = null, this;
  }
  /**
   * Converts color to a premultiplied alpha format. This action is destructive, and will
   * override the previous `value` property to be `null`.
   * @param alpha - The alpha to multiply by.
   * @param {boolean} [applyToRGB=true] - Whether to premultiply RGB channels.
   * @returns {PIXI.Color} - Itself.
   */
  premultiply(t, e = !0) {
    return e && (this._components[0] *= t, this._components[1] *= t, this._components[2] *= t), this._components[3] = t, this.refreshInt(), this._value = null, this;
  }
  /**
   * Premultiplies alpha with current color.
   * @param {number} alpha - The alpha to multiply by.
   * @param {boolean} [applyToRGB=true] - Whether to premultiply RGB channels.
   * @returns {number} tint multiplied by alpha
   */
  toPremultiplied(t, e = !0) {
    if (t === 1)
      return (255 << 24) + this._int;
    if (t === 0)
      return e ? 0 : this._int;
    let i = this._int >> 16 & 255, s = this._int >> 8 & 255, n = this._int & 255;
    return e && (i = i * t + 0.5 | 0, s = s * t + 0.5 | 0, n = n * t + 0.5 | 0), (t * 255 << 24) + (i << 16) + (s << 8) + n;
  }
  /**
   * Convert to a hexidecimal string.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toHex(); // returns "#ffffff"
   */
  toHex() {
    const t = this._int.toString(16);
    return `#${"000000".substring(0, 6 - t.length) + t}`;
  }
  /**
   * Convert to a hexidecimal string with alpha.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toHexa(); // returns "#ffffffff"
   */
  toHexa() {
    const t = Math.round(this._components[3] * 255).toString(16);
    return this.toHex() + "00".substring(0, 2 - t.length) + t;
  }
  /**
   * Set alpha, suitable for chaining.
   * @param alpha
   */
  setAlpha(t) {
    return this._components[3] = this._clamp(t), this;
  }
  /**
   * Rounds the specified color according to the step. This action is destructive, and will
   * override the previous `value` property to be `null`. The alpha component is not rounded.
   * @param steps - Number of steps which will be used as a cap when rounding colors
   * @deprecated since 7.3.0
   */
  round(t) {
    const [e, i, s] = this._components;
    return this._components[0] = Math.round(e * t) / t, this._components[1] = Math.round(i * t) / t, this._components[2] = Math.round(s * t) / t, this.refreshInt(), this._value = null, this;
  }
  toArray(t) {
    t = t ?? [];
    const [e, i, s, n] = this._components;
    return t[0] = e, t[1] = i, t[2] = s, t[3] = n, t;
  }
  /**
   * Normalize the input value into rgba
   * @param value - Input value
   */
  normalize(t) {
    let e, i, s, n;
    if ((typeof t == "number" || t instanceof Number) && t >= 0 && t <= 16777215) {
      const o = t;
      e = (o >> 16 & 255) / 255, i = (o >> 8 & 255) / 255, s = (o & 255) / 255, n = 1;
    } else if ((Array.isArray(t) || t instanceof Float32Array) && t.length >= 3 && t.length <= 4)
      t = this._clamp(t), [e, i, s, n = 1] = t;
    else if ((t instanceof Uint8Array || t instanceof Uint8ClampedArray) && t.length >= 3 && t.length <= 4)
      t = this._clamp(t, 0, 255), [e, i, s, n = 255] = t, e /= 255, i /= 255, s /= 255, n /= 255;
    else if (typeof t == "string" || typeof t == "object") {
      if (typeof t == "string") {
        const a = jr.HEX_PATTERN.exec(t);
        a && (t = `#${a[2]}`);
      }
      const o = Ut(t);
      o.isValid() && ({ r: e, g: i, b: s, a: n } = o.rgba, e /= 255, i /= 255, s /= 255);
    }
    if (e !== void 0)
      this._components[0] = e, this._components[1] = i, this._components[2] = s, this._components[3] = n, this.refreshInt();
    else
      throw new Error(`Unable to convert color ${t}`);
  }
  /** Refresh the internal color rgb number */
  refreshInt() {
    this._clamp(this._components);
    const [t, e, i] = this._components;
    this._int = (t * 255 << 16) + (e * 255 << 8) + (i * 255 | 0);
  }
  /**
   * Clamps values to a range. Will override original values
   * @param value - Value(s) to clamp
   * @param min - Minimum value
   * @param max - Maximum value
   */
  _clamp(t, e = 0, i = 1) {
    return typeof t == "number" ? Math.min(Math.max(t, e), i) : (t.forEach((s, n) => {
      t[n] = Math.min(Math.max(s, e), i);
    }), t);
  }
};
Fe.shared = new Fe(), /**
* Temporary Color object for static uses internally.
* As to not conflict with Color.shared.
* @ignore
*/
Fe.temp = new Fe(), /** Pattern for hex strings */
Fe.HEX_PATTERN = /^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;
let Ei = Fe;
function Kc() {
  const r = [], t = [];
  for (let i = 0; i < 32; i++)
    r[i] = i, t[i] = i;
  r[I.NORMAL_NPM] = I.NORMAL, r[I.ADD_NPM] = I.ADD, r[I.SCREEN_NPM] = I.SCREEN, t[I.NORMAL] = I.NORMAL_NPM, t[I.ADD] = I.ADD_NPM, t[I.SCREEN] = I.SCREEN_NPM;
  const e = [];
  return e.push(t), e.push(r), e;
}
const Zc = Kc();
function fa(r) {
  if (r.BYTES_PER_ELEMENT === 4)
    return r instanceof Float32Array ? "Float32Array" : r instanceof Uint32Array ? "Uint32Array" : "Int32Array";
  if (r.BYTES_PER_ELEMENT === 2) {
    if (r instanceof Uint16Array)
      return "Uint16Array";
  } else if (r.BYTES_PER_ELEMENT === 1 && r instanceof Uint8Array)
    return "Uint8Array";
  return null;
}
function li(r) {
  return r += r === 0 ? 1 : 0, --r, r |= r >>> 1, r |= r >>> 2, r |= r >>> 4, r |= r >>> 8, r |= r >>> 16, r + 1;
}
function eo(r) {
  return !(r & r - 1) && !!r;
}
function ro(r) {
  let t = (r > 65535 ? 1 : 0) << 4;
  r >>>= t;
  let e = (r > 255 ? 1 : 0) << 3;
  return r >>>= e, t |= e, e = (r > 15 ? 1 : 0) << 2, r >>>= e, t |= e, e = (r > 3 ? 1 : 0) << 1, r >>>= e, t |= e, t | r >> 1;
}
function zr(r, t, e) {
  const i = r.length;
  let s;
  if (t >= i || e === 0)
    return;
  e = t + e > i ? i - t : e;
  const n = i - e;
  for (s = t; s < n; ++s)
    r[s] = r[s + e];
  r.length = n;
}
let Jc = 0;
function _r() {
  return ++Jc;
}
const io = {}, Bt = /* @__PURE__ */ Object.create(null), Jt = /* @__PURE__ */ Object.create(null);
function Qc(r, t = globalThis.location) {
  if (r.startsWith("data:"))
    return "";
  t = t || globalThis.location;
  const e = new URL(r, document.baseURI);
  return e.hostname !== t.hostname || e.port !== t.port || e.protocol !== t.protocol ? "anonymous" : "";
}
function so(r, t = 1) {
  var i;
  const e = (i = L.RETINA_PREFIX) == null ? void 0 : i.exec(r);
  return e ? parseFloat(e[1]) : t;
}
var N = /* @__PURE__ */ ((r) => (r.Renderer = "renderer", r.Application = "application", r.RendererSystem = "renderer-webgl-system", r.RendererPlugin = "renderer-webgl-plugin", r.CanvasRendererSystem = "renderer-canvas-system", r.CanvasRendererPlugin = "renderer-canvas-plugin", r.Asset = "asset", r.LoadParser = "load-parser", r.ResolveParser = "resolve-parser", r.CacheParser = "cache-parser", r.DetectionParser = "detection-parser", r))(N || {});
const As = (r) => {
  if (typeof r == "function" || typeof r == "object" && r.extension) {
    if (!r.extension)
      throw new Error("Extension class must have an extension object");
    r = { ...typeof r.extension != "object" ? { type: r.extension } : r.extension, ref: r };
  }
  if (typeof r == "object")
    r = { ...r };
  else
    throw new Error("Invalid extension type");
  return typeof r.type == "string" && (r.type = [r.type]), r;
}, no = (r, t) => As(r).priority ?? t, B = {
  /** @ignore */
  _addHandlers: {},
  /** @ignore */
  _removeHandlers: {},
  /** @ignore */
  _queue: {},
  /**
   * Remove extensions from PixiJS.
   * @param extensions - Extensions to be removed.
   * @returns {PIXI.extensions} For chaining.
   */
  remove(...r) {
    return r.map(As).forEach((t) => {
      t.type.forEach((e) => {
        var i, s;
        return (s = (i = this._removeHandlers)[e]) == null ? void 0 : s.call(i, t);
      });
    }), this;
  },
  /**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {PIXI.extensions} For chaining.
   */
  add(...r) {
    return r.map(As).forEach((t) => {
      t.type.forEach((e) => {
        var n, o;
        const i = this._addHandlers, s = this._queue;
        i[e] ? (n = i[e]) == null || n.call(i, t) : (s[e] = s[e] || [], (o = s[e]) == null || o.push(t));
      });
    }), this;
  },
  /**
   * Internal method to handle extensions by name.
   * @param type - The extension type.
   * @param onAdd  - Function for handling when extensions are added/registered passes {@link PIXI.ExtensionFormat}.
   * @param onRemove  - Function for handling when extensions are removed/unregistered passes {@link PIXI.ExtensionFormat}.
   * @returns {PIXI.extensions} For chaining.
   */
  handle(r, t, e) {
    var o;
    const i = this._addHandlers, s = this._removeHandlers;
    if (i[r] || s[r])
      throw new Error(`Extension type ${r} already has a handler`);
    i[r] = t, s[r] = e;
    const n = this._queue;
    return n[r] && ((o = n[r]) == null || o.forEach((a) => t(a)), delete n[r]), this;
  },
  /**
   * Handle a type, but using a map by `name` property.
   * @param type - Type of extension to handle.
   * @param map - The object map of named extensions.
   * @returns {PIXI.extensions} For chaining.
   */
  handleByMap(r, t) {
    return this.handle(
      r,
      (e) => {
        e.name && (t[e.name] = e.ref);
      },
      (e) => {
        e.name && delete t[e.name];
      }
    );
  },
  /**
   * Handle a type, but using a list of extensions.
   * @param type - Type of extension to handle.
   * @param list - The list of extensions.
   * @param defaultPriority - The default priority to use if none is specified.
   * @returns {PIXI.extensions} For chaining.
   */
  handleByList(r, t, e = -1) {
    return this.handle(
      r,
      (i) => {
        t.includes(i.ref) || (t.push(i.ref), t.sort((s, n) => no(n, e) - no(s, e)));
      },
      (i) => {
        const s = t.indexOf(i.ref);
        s !== -1 && t.splice(s, 1);
      }
    );
  }
};
class td {
  constructor(t) {
    typeof t == "number" ? this.rawBinaryData = new ArrayBuffer(t) : t instanceof Uint8Array ? this.rawBinaryData = t.buffer : this.rawBinaryData = t, this.uint32View = new Uint32Array(this.rawBinaryData), this.float32View = new Float32Array(this.rawBinaryData);
  }
  /** View on the raw binary data as a `Int8Array`. */
  get int8View() {
    return this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)), this._int8View;
  }
  /** View on the raw binary data as a `Uint8Array`. */
  get uint8View() {
    return this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)), this._uint8View;
  }
  /**  View on the raw binary data as a `Int16Array`. */
  get int16View() {
    return this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)), this._int16View;
  }
  /** View on the raw binary data as a `Uint16Array`. */
  get uint16View() {
    return this._uint16View || (this._uint16View = new Uint16Array(this.rawBinaryData)), this._uint16View;
  }
  /** View on the raw binary data as a `Int32Array`. */
  get int32View() {
    return this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)), this._int32View;
  }
  /**
   * Returns the view of the given type.
   * @param type - One of `int8`, `uint8`, `int16`,
   *    `uint16`, `int32`, `uint32`, and `float32`.
   * @returns - typed array of given type
   */
  view(t) {
    return this[`${t}View`];
  }
  /** Destroys all buffer references. Do not use after calling this. */
  destroy() {
    this.rawBinaryData = null, this._int8View = null, this._uint8View = null, this._int16View = null, this._uint16View = null, this._int32View = null, this.uint32View = null, this.float32View = null;
  }
  static sizeOf(t) {
    switch (t) {
      case "int8":
      case "uint8":
        return 1;
      case "int16":
      case "uint16":
        return 2;
      case "int32":
      case "uint32":
      case "float32":
        return 4;
      default:
        throw new Error(`${t} isn't a valid view type`);
    }
  }
}
const ed = [
  "precision mediump float;",
  "void main(void){",
  "float test = 0.1;",
  "%forloop%",
  "gl_FragColor = vec4(0.0);",
  "}"
].join(`
`);
function rd(r) {
  let t = "";
  for (let e = 0; e < r; ++e)
    e > 0 && (t += `
else `), e < r - 1 && (t += `if(test == ${e}.0){}`);
  return t;
}
function id(r, t) {
  if (r === 0)
    throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
  const e = t.createShader(t.FRAGMENT_SHADER);
  for (; ; ) {
    const i = ed.replace(/%forloop%/gi, rd(r));
    if (t.shaderSource(e, i), t.compileShader(e), !t.getShaderParameter(e, t.COMPILE_STATUS))
      r = r / 2 | 0;
    else
      break;
  }
  return r;
}
const Ki = 0, Zi = 1, Ji = 2, Qi = 3, ts = 4, es = 5;
class Je {
  constructor() {
    this.data = 0, this.blendMode = I.NORMAL, this.polygonOffset = 0, this.blend = !0, this.depthMask = !0;
  }
  /**
   * Activates blending of the computed fragment color values.
   * @default true
   */
  get blend() {
    return !!(this.data & 1 << Ki);
  }
  set blend(t) {
    !!(this.data & 1 << Ki) !== t && (this.data ^= 1 << Ki);
  }
  /**
   * Activates adding an offset to depth values of polygon's fragments
   * @default false
   */
  get offsets() {
    return !!(this.data & 1 << Zi);
  }
  set offsets(t) {
    !!(this.data & 1 << Zi) !== t && (this.data ^= 1 << Zi);
  }
  /**
   * Activates culling of polygons.
   * @default false
   */
  get culling() {
    return !!(this.data & 1 << Ji);
  }
  set culling(t) {
    !!(this.data & 1 << Ji) !== t && (this.data ^= 1 << Ji);
  }
  /**
   * Activates depth comparisons and updates to the depth buffer.
   * @default false
   */
  get depthTest() {
    return !!(this.data & 1 << Qi);
  }
  set depthTest(t) {
    !!(this.data & 1 << Qi) !== t && (this.data ^= 1 << Qi);
  }
  /**
   * Enables or disables writing to the depth buffer.
   * @default true
   */
  get depthMask() {
    return !!(this.data & 1 << es);
  }
  set depthMask(t) {
    !!(this.data & 1 << es) !== t && (this.data ^= 1 << es);
  }
  /**
   * Specifies whether or not front or back-facing polygons can be culled.
   * @default false
   */
  get clockwiseFrontFace() {
    return !!(this.data & 1 << ts);
  }
  set clockwiseFrontFace(t) {
    !!(this.data & 1 << ts) !== t && (this.data ^= 1 << ts);
  }
  /**
   * The blend mode to be applied when this state is set. Apply a value of `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
   * Setting this mode to anything other than NO_BLEND will automatically switch blending on.
   * @default PIXI.BLEND_MODES.NORMAL
   */
  get blendMode() {
    return this._blendMode;
  }
  set blendMode(t) {
    this.blend = t !== I.NONE, this._blendMode = t;
  }
  /**
   * The polygon offset. Setting this property to anything other than 0 will automatically enable polygon offset fill.
   * @default 0
   */
  get polygonOffset() {
    return this._polygonOffset;
  }
  set polygonOffset(t) {
    this.offsets = !!t, this._polygonOffset = t;
  }
  static for2d() {
    const t = new Je();
    return t.depthTest = !1, t.blend = !0, t;
  }
}
Je.prototype.toString = function() {
  return `[@pixi/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`;
};
const Rs = [];
function pa(r, t) {
  if (!r)
    return null;
  let e = "";
  if (typeof r == "string") {
    const i = /\.(\w{3,4})(?:$|\?|#)/i.exec(r);
    i && (e = i[1].toLowerCase());
  }
  for (let i = Rs.length - 1; i >= 0; --i) {
    const s = Rs[i];
    if (s.test && s.test(r, e))
      return new s(r, t);
  }
  throw new Error("Unrecognized source type to auto-detect Resource");
}
class Nt {
  /**
   * @param {string} name - The function name that will be executed on the listeners added to this Runner.
   */
  constructor(t) {
    this.items = [], this._name = t, this._aliasCount = 0;
  }
  /* eslint-disable jsdoc/require-param, jsdoc/check-param-names */
  /**
   * Dispatch/Broadcast Runner to all listeners added to the queue.
   * @param {...any} params - (optional) parameters to pass to each listener
   */
  /*  eslint-enable jsdoc/require-param, jsdoc/check-param-names */
  emit(t, e, i, s, n, o, a, h) {
    if (arguments.length > 8)
      throw new Error("max arguments reached");
    const { name: l, items: u } = this;
    this._aliasCount++;
    for (let c = 0, d = u.length; c < d; c++)
      u[c][l](t, e, i, s, n, o, a, h);
    return u === this.items && this._aliasCount--, this;
  }
  ensureNonAliasedItems() {
    this._aliasCount > 0 && this.items.length > 1 && (this._aliasCount = 0, this.items = this.items.slice(0));
  }
  /**
   * Add a listener to the Runner
   *
   * Runners do not need to have scope or functions passed to them.
   * All that is required is to pass the listening object and ensure that it has contains a function that has the same name
   * as the name provided to the Runner when it was created.
   *
   * E.g. A listener passed to this Runner will require a 'complete' function.
   *
   * ```js
   * import { Runner } from '@pixi/runner';
   *
   * const complete = new Runner('complete');
   * ```
   *
   * The scope used will be the object itself.
   * @param {any} item - The object that will be listening.
   */
  add(t) {
    return t[this._name] && (this.ensureNonAliasedItems(), this.remove(t), this.items.push(t)), this;
  }
  /**
   * Remove a single listener from the dispatch queue.
   * @param {any} item - The listener that you would like to remove.
   */
  remove(t) {
    const e = this.items.indexOf(t);
    return e !== -1 && (this.ensureNonAliasedItems(), this.items.splice(e, 1)), this;
  }
  /**
   * Check to see if the listener is already in the Runner
   * @param {any} item - The listener that you would like to check.
   */
  contains(t) {
    return this.items.includes(t);
  }
  /** Remove all listeners from the Runner */
  removeAll() {
    return this.ensureNonAliasedItems(), this.items.length = 0, this;
  }
  /** Remove all references, don't use after this. */
  destroy() {
    this.removeAll(), this.items.length = 0, this._name = "";
  }
  /**
   * `true` if there are no this Runner contains no listeners
   * @readonly
   */
  get empty() {
    return this.items.length === 0;
  }
  /**
   * The name of the runner.
   * @type {string}
   */
  get name() {
    return this._name;
  }
}
Object.defineProperties(Nt.prototype, {
  /**
   * Alias for `emit`
   * @memberof PIXI.Runner#
   * @method dispatch
   * @see PIXI.Runner#emit
   */
  dispatch: { value: Nt.prototype.emit },
  /**
   * Alias for `emit`
   * @memberof PIXI.Runner#
   * @method run
   * @see PIXI.Runner#emit
   */
  run: { value: Nt.prototype.emit }
});
class xr {
  /**
   * @param width - Width of the resource
   * @param height - Height of the resource
   */
  constructor(t = 0, e = 0) {
    this._width = t, this._height = e, this.destroyed = !1, this.internal = !1, this.onResize = new Nt("setRealSize"), this.onUpdate = new Nt("update"), this.onError = new Nt("onError");
  }
  /**
   * Bind to a parent BaseTexture
   * @param baseTexture - Parent texture
   */
  bind(t) {
    this.onResize.add(t), this.onUpdate.add(t), this.onError.add(t), (this._width || this._height) && this.onResize.emit(this._width, this._height);
  }
  /**
   * Unbind to a parent BaseTexture
   * @param baseTexture - Parent texture
   */
  unbind(t) {
    this.onResize.remove(t), this.onUpdate.remove(t), this.onError.remove(t);
  }
  /**
   * Trigger a resize event
   * @param width - X dimension
   * @param height - Y dimension
   */
  resize(t, e) {
    (t !== this._width || e !== this._height) && (this._width = t, this._height = e, this.onResize.emit(t, e));
  }
  /**
   * Has been validated
   * @readonly
   */
  get valid() {
    return !!this._width && !!this._height;
  }
  /** Has been updated trigger event. */
  update() {
    this.destroyed || this.onUpdate.emit();
  }
  /**
   * This can be overridden to start preloading a resource
   * or do any other prepare step.
   * @protected
   * @returns Handle the validate event
   */
  load() {
    return Promise.resolve(this);
  }
  /**
   * The width of the resource.
   * @readonly
   */
  get width() {
    return this._width;
  }
  /**
   * The height of the resource.
   * @readonly
   */
  get height() {
    return this._height;
  }
  /**
   * Set the style, optional to override
   * @param _renderer - yeah, renderer!
   * @param _baseTexture - the texture
   * @param _glTexture - texture instance for this webgl context
   * @returns - `true` is success
   */
  style(t, e, i) {
    return !1;
  }
  /** Clean up anything, this happens when destroying is ready. */
  dispose() {
  }
  /**
   * Call when destroying resource, unbind any BaseTexture object
   * before calling this method, as reference counts are maintained
   * internally.
   */
  destroy() {
    this.destroyed || (this.destroyed = !0, this.dispose(), this.onError.removeAll(), this.onError = null, this.onResize.removeAll(), this.onResize = null, this.onUpdate.removeAll(), this.onUpdate = null);
  }
  /**
   * Abstract, used to auto-detect resource type.
   * @param {*} _source - The source object
   * @param {string} _extension - The extension of source, if set
   */
  static test(t, e) {
    return !1;
  }
}
class ma extends xr {
  /**
   * @param source - Source buffer
   * @param options - Options
   * @param {number} options.width - Width of the texture
   * @param {number} options.height - Height of the texture
   * @param {1|2|4|8} [options.unpackAlignment=4] - The alignment of the pixel rows.
   */
  constructor(t, e) {
    const { width: i, height: s } = e || {};
    if (!i || !s)
      throw new Error("BufferResource width or height invalid");
    super(i, s), this.data = t, this.unpackAlignment = e.unpackAlignment ?? 4;
  }
  /**
   * Upload the texture to the GPU.
   * @param renderer - Upload to the renderer
   * @param baseTexture - Reference to parent texture
   * @param glTexture - glTexture
   * @returns - true is success
   */
  upload(t, e, i) {
    const s = t.gl;
    s.pixelStorei(s.UNPACK_ALIGNMENT, this.unpackAlignment), s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.alphaMode === we.UNPACK);
    const n = e.realWidth, o = e.realHeight;
    return i.width === n && i.height === o ? s.texSubImage2D(
      e.target,
      0,
      0,
      0,
      n,
      o,
      e.format,
      i.type,
      this.data
    ) : (i.width = n, i.height = o, s.texImage2D(
      e.target,
      0,
      i.internalFormat,
      n,
      o,
      0,
      e.format,
      i.type,
      this.data
    )), !0;
  }
  /** Destroy and don't use after this. */
  dispose() {
    this.data = null;
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if buffer source
   */
  static test(t) {
    return t === null || t instanceof Int8Array || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array;
  }
}
const sd = {
  scaleMode: jt.NEAREST,
  alphaMode: we.NPM
}, Ss = class Ne extends Ie {
  /**
   * @param {PIXI.Resource|PIXI.ImageSource|string} [resource=null] -
   *        The current resource to use, for things that aren't Resource objects, will be converted
   *        into a Resource.
   * @param options - Collection of options, default options inherited from {@link PIXI.BaseTexture.defaultOptions}.
   * @param {PIXI.MIPMAP_MODES} [options.mipmap] - If mipmapping is enabled for texture
   * @param {number} [options.anisotropicLevel] - Anisotropic filtering level of texture
   * @param {PIXI.WRAP_MODES} [options.wrapMode] - Wrap mode for textures
   * @param {PIXI.SCALE_MODES} [options.scaleMode] - Default scale mode, linear, nearest
   * @param {PIXI.FORMATS} [options.format] - GL format type
   * @param {PIXI.TYPES} [options.type] - GL data type
   * @param {PIXI.TARGETS} [options.target] - GL texture target
   * @param {PIXI.ALPHA_MODES} [options.alphaMode] - Pre multiply the image alpha
   * @param {number} [options.width=0] - Width of the texture
   * @param {number} [options.height=0] - Height of the texture
   * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - Resolution of the base texture
   * @param {object} [options.resourceOptions] - Optional resource options,
   *        see {@link PIXI.autoDetectResource autoDetectResource}
   */
  constructor(t = null, e = null) {
    super(), e = Object.assign({}, Ne.defaultOptions, e);
    const {
      alphaMode: i,
      mipmap: s,
      anisotropicLevel: n,
      scaleMode: o,
      width: a,
      height: h,
      wrapMode: l,
      format: u,
      type: c,
      target: d,
      resolution: f,
      resourceOptions: p
    } = e;
    t && !(t instanceof xr) && (t = pa(t, p), t.internal = !0), this.resolution = f || L.RESOLUTION, this.width = Math.round((a || 0) * this.resolution) / this.resolution, this.height = Math.round((h || 0) * this.resolution) / this.resolution, this._mipmap = s, this.anisotropicLevel = n, this._wrapMode = l, this._scaleMode = o, this.format = u, this.type = c, this.target = d, this.alphaMode = i, this.uid = _r(), this.touched = 0, this.isPowerOfTwo = !1, this._refreshPOT(), this._glTextures = {}, this.dirtyId = 0, this.dirtyStyleId = 0, this.cacheId = null, this.valid = a > 0 && h > 0, this.textureCacheIds = [], this.destroyed = !1, this.resource = null, this._batchEnabled = 0, this._batchLocation = 0, this.parentTextureArray = null, this.setResource(t);
  }
  /**
   * Pixel width of the source of this texture
   * @readonly
   */
  get realWidth() {
    return Math.round(this.width * this.resolution);
  }
  /**
   * Pixel height of the source of this texture
   * @readonly
   */
  get realHeight() {
    return Math.round(this.height * this.resolution);
  }
  /**
   * Mipmap mode of the texture, affects downscaled images
   * @default PIXI.MIPMAP_MODES.POW2
   */
  get mipmap() {
    return this._mipmap;
  }
  set mipmap(t) {
    this._mipmap !== t && (this._mipmap = t, this.dirtyStyleId++);
  }
  /**
   * The scale mode to apply when scaling this texture
   * @default PIXI.SCALE_MODES.LINEAR
   */
  get scaleMode() {
    return this._scaleMode;
  }
  set scaleMode(t) {
    this._scaleMode !== t && (this._scaleMode = t, this.dirtyStyleId++);
  }
  /**
   * How the texture wraps
   * @default PIXI.WRAP_MODES.CLAMP
   */
  get wrapMode() {
    return this._wrapMode;
  }
  set wrapMode(t) {
    this._wrapMode !== t && (this._wrapMode = t, this.dirtyStyleId++);
  }
  /**
   * Changes style options of BaseTexture
   * @param scaleMode - Pixi scalemode
   * @param mipmap - enable mipmaps
   * @returns - this
   */
  setStyle(t, e) {
    let i;
    return t !== void 0 && t !== this.scaleMode && (this.scaleMode = t, i = !0), e !== void 0 && e !== this.mipmap && (this.mipmap = e, i = !0), i && this.dirtyStyleId++, this;
  }
  /**
   * Changes w/h/resolution. Texture becomes valid if width and height are greater than zero.
   * @param desiredWidth - Desired visual width
   * @param desiredHeight - Desired visual height
   * @param resolution - Optionally set resolution
   * @returns - this
   */
  setSize(t, e, i) {
    return i = i || this.resolution, this.setRealSize(t * i, e * i, i);
  }
  /**
   * Sets real size of baseTexture, preserves current resolution.
   * @param realWidth - Full rendered width
   * @param realHeight - Full rendered height
   * @param resolution - Optionally set resolution
   * @returns - this
   */
  setRealSize(t, e, i) {
    return this.resolution = i || this.resolution, this.width = Math.round(t) / this.resolution, this.height = Math.round(e) / this.resolution, this._refreshPOT(), this.update(), this;
  }
  /**
   * Refresh check for isPowerOfTwo texture based on size
   * @private
   */
  _refreshPOT() {
    this.isPowerOfTwo = eo(this.realWidth) && eo(this.realHeight);
  }
  /**
   * Changes resolution
   * @param resolution - res
   * @returns - this
   */
  setResolution(t) {
    const e = this.resolution;
    return e === t ? this : (this.resolution = t, this.valid && (this.width = Math.round(this.width * e) / t, this.height = Math.round(this.height * e) / t, this.emit("update", this)), this._refreshPOT(), this);
  }
  /**
   * Sets the resource if it wasn't set. Throws error if resource already present
   * @param resource - that is managing this BaseTexture
   * @returns - this
   */
  setResource(t) {
    if (this.resource === t)
      return this;
    if (this.resource)
      throw new Error("Resource can be set only once");
    return t.bind(this), this.resource = t, this;
  }
  /** Invalidates the object. Texture becomes valid if width and height are greater than zero. */
  update() {
    this.valid ? (this.dirtyId++, this.dirtyStyleId++, this.emit("update", this)) : this.width > 0 && this.height > 0 && (this.valid = !0, this.emit("loaded", this), this.emit("update", this));
  }
  /**
   * Handle errors with resources.
   * @private
   * @param event - Error event emitted.
   */
  onError(t) {
    this.emit("error", this, t);
  }
  /**
   * Destroys this base texture.
   * The method stops if resource doesn't want this texture to be destroyed.
   * Removes texture from all caches.
   * @fires PIXI.BaseTexture#destroyed
   */
  destroy() {
    this.resource && (this.resource.unbind(this), this.resource.internal && this.resource.destroy(), this.resource = null), this.cacheId && (delete Jt[this.cacheId], delete Bt[this.cacheId], this.cacheId = null), this.valid = !1, this.dispose(), Ne.removeFromCache(this), this.textureCacheIds = null, this.destroyed = !0, this.emit("destroyed", this), this.removeAllListeners();
  }
  /**
   * Frees the texture from WebGL memory without destroying this texture object.
   * This means you can still use the texture later which will upload it to GPU
   * memory again.
   * @fires PIXI.BaseTexture#dispose
   */
  dispose() {
    this.emit("dispose", this);
  }
  /** Utility function for BaseTexture|Texture cast. */
  castToBaseTexture() {
    return this;
  }
  /**
   * Helper function that creates a base texture based on the source you provide.
   * The source can be - image url, image element, canvas element. If the
   * source is an image url or an image element and not in the base texture
   * cache, it will be created and loaded.
   * @static
   * @param {PIXI.ImageSource|string|string[]} source - The
   *        source to create base texture from.
   * @param options - See {@link PIXI.BaseTexture}'s constructor for options.
   * @param {string} [options.pixiIdPrefix=pixiid] - If a source has no id, this is the prefix of the generated id
   * @param {boolean} [strict] - Enforce strict-mode, see {@link PIXI.settings.STRICT_TEXTURE_CACHE}.
   * @returns {PIXI.BaseTexture} The new base texture.
   */
  static from(t, e, i = L.STRICT_TEXTURE_CACHE) {
    const s = typeof t == "string";
    let n = null;
    if (s)
      n = t;
    else {
      if (!t._pixiId) {
        const a = (e == null ? void 0 : e.pixiIdPrefix) || "pixiid";
        t._pixiId = `${a}_${_r()}`;
      }
      n = t._pixiId;
    }
    let o = Jt[n];
    if (s && i && !o)
      throw new Error(`The cacheId "${n}" does not exist in BaseTextureCache.`);
    return o || (o = new Ne(t, e), o.cacheId = n, Ne.addToCache(o, n)), o;
  }
  /**
   * Create a new Texture with a BufferResource from a typed array.
   * @param buffer - The optional array to use. If no data is provided, a new Float32Array is created.
   * @param width - Width of the resource
   * @param height - Height of the resource
   * @param options - See {@link PIXI.BaseTexture}'s constructor for options.
   *        Default properties are different from the constructor's defaults.
   * @param {PIXI.FORMATS} [options.format] - The format is not given, the type is inferred from the
   *        type of the buffer: `RGBA` if Float32Array, Int8Array, Uint8Array, or Uint8ClampedArray,
   *        otherwise `RGBA_INTEGER`.
   * @param {PIXI.TYPES} [options.type] - The type is not given, the type is inferred from the
   *        type of the buffer. Maps Float32Array to `FLOAT`, Int32Array to `INT`, Uint32Array to
   *        `UNSIGNED_INT`, Int16Array to `SHORT`, Uint16Array to `UNSIGNED_SHORT`, Int8Array to `BYTE`,
   *        Uint8Array/Uint8ClampedArray to `UNSIGNED_BYTE`.
   * @param {PIXI.ALPHA_MODES} [options.alphaMode=PIXI.ALPHA_MODES.NPM]
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.SCALE_MODES.NEAREST]
   * @returns - The resulting new BaseTexture
   */
  static fromBuffer(t, e, i, s) {
    t = t || new Float32Array(e * i * 4);
    const n = new ma(t, { width: e, height: i, ...s == null ? void 0 : s.resourceOptions });
    let o, a;
    return t instanceof Float32Array ? (o = x.RGBA, a = F.FLOAT) : t instanceof Int32Array ? (o = x.RGBA_INTEGER, a = F.INT) : t instanceof Uint32Array ? (o = x.RGBA_INTEGER, a = F.UNSIGNED_INT) : t instanceof Int16Array ? (o = x.RGBA_INTEGER, a = F.SHORT) : t instanceof Uint16Array ? (o = x.RGBA_INTEGER, a = F.UNSIGNED_SHORT) : t instanceof Int8Array ? (o = x.RGBA, a = F.BYTE) : (o = x.RGBA, a = F.UNSIGNED_BYTE), n.internal = !0, new Ne(n, Object.assign({}, sd, { type: a, format: o }, s));
  }
  /**
   * Adds a BaseTexture to the global BaseTextureCache. This cache is shared across the whole PIXI object.
   * @param {PIXI.BaseTexture} baseTexture - The BaseTexture to add to the cache.
   * @param {string} id - The id that the BaseTexture will be stored against.
   */
  static addToCache(t, e) {
    e && (t.textureCacheIds.includes(e) || t.textureCacheIds.push(e), Jt[e] && Jt[e] !== t && console.warn(`BaseTexture added to the cache with an id [${e}] that already had an entry`), Jt[e] = t);
  }
  /**
   * Remove a BaseTexture from the global BaseTextureCache.
   * @param {string|PIXI.BaseTexture} baseTexture - id of a BaseTexture to be removed, or a BaseTexture instance itself.
   * @returns {PIXI.BaseTexture|null} The BaseTexture that was removed.
   */
  static removeFromCache(t) {
    if (typeof t == "string") {
      const e = Jt[t];
      if (e) {
        const i = e.textureCacheIds.indexOf(t);
        return i > -1 && e.textureCacheIds.splice(i, 1), delete Jt[t], e;
      }
    } else if (t != null && t.textureCacheIds) {
      for (let e = 0; e < t.textureCacheIds.length; ++e)
        delete Jt[t.textureCacheIds[e]];
      return t.textureCacheIds.length = 0, t;
    }
    return null;
  }
};
Ss.defaultOptions = {
  /**
   * If mipmapping is enabled for texture.
   * @type {PIXI.MIPMAP_MODES}
   * @default PIXI.MIPMAP_MODES.POW2
   */
  mipmap: be.POW2,
  /** Anisotropic filtering level of texture */
  anisotropicLevel: 0,
  /**
   * Default scale mode, linear, nearest.
   * @type {PIXI.SCALE_MODES}
   * @default PIXI.SCALE_MODES.LINEAR
   */
  scaleMode: jt.LINEAR,
  /**
   * Wrap mode for textures.
   * @type {PIXI.WRAP_MODES}
   * @default PIXI.WRAP_MODES.CLAMP
   */
  wrapMode: Vs.CLAMP,
  /**
   * Pre multiply the image alpha
   * @type {PIXI.ALPHA_MODES}
   * @default PIXI.ALPHA_MODES.UNPACK
   */
  alphaMode: we.UNPACK,
  /**
   * GL texture target
   * @type {PIXI.TARGETS}
   * @default PIXI.TARGETS.TEXTURE_2D
   */
  target: Ge.TEXTURE_2D,
  /**
   * GL format type
   * @type {PIXI.FORMATS}
   * @default PIXI.FORMATS.RGBA
   */
  format: x.RGBA,
  /**
   * GL data type
   * @type {PIXI.TYPES}
   * @default PIXI.TYPES.UNSIGNED_BYTE
   */
  type: F.UNSIGNED_BYTE
}, /** Global number of the texture batch, used by multi-texture renderers. */
Ss._globalBatch = 0;
let D = Ss;
class nd {
  constructor() {
    this.texArray = null, this.blend = 0, this.type = ii.TRIANGLES, this.start = 0, this.size = 0, this.data = null;
  }
}
let od = 0;
class yt {
  /**
   * @param {PIXI.IArrayBuffer} data - the data to store in the buffer.
   * @param _static - `true` for static buffer
   * @param index - `true` for index buffer
   */
  constructor(t, e = !0, i = !1) {
    this.data = t || new Float32Array(1), this._glBuffers = {}, this._updateID = 0, this.index = i, this.static = e, this.id = od++, this.disposeRunner = new Nt("disposeBuffer");
  }
  // TODO could explore flagging only a partial upload?
  /**
   * Flags this buffer as requiring an upload to the GPU.
   * @param {PIXI.IArrayBuffer|number[]} [data] - the data to update in the buffer.
   */
  update(t) {
    t instanceof Array && (t = new Float32Array(t)), this.data = t || this.data, this._updateID++;
  }
  /** Disposes WebGL resources that are connected to this geometry. */
  dispose() {
    this.disposeRunner.emit(this, !1);
  }
  /** Destroys the buffer. */
  destroy() {
    this.dispose(), this.data = null;
  }
  /**
   * Flags whether this is an index buffer.
   *
   * Index buffers are of type `ELEMENT_ARRAY_BUFFER`. Note that setting this property to false will make
   * the buffer of type `ARRAY_BUFFER`.
   *
   * For backwards compatibility.
   */
  set index(t) {
    this.type = t ? Dt.ELEMENT_ARRAY_BUFFER : Dt.ARRAY_BUFFER;
  }
  get index() {
    return this.type === Dt.ELEMENT_ARRAY_BUFFER;
  }
  /**
   * Helper function that creates a buffer based on an array or TypedArray
   * @param {ArrayBufferView | number[]} data - the TypedArray that the buffer will store. If this is a regular Array it will be converted to a Float32Array.
   * @returns - A new Buffer based on the data provided.
   */
  static from(t) {
    return t instanceof Array && (t = new Float32Array(t)), new yt(t);
  }
}
class ui {
  /**
   * @param buffer - the id of the buffer that this attribute will look for
   * @param size - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2.
   * @param normalized - should the data be normalized.
   * @param {PIXI.TYPES} [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {@link PIXI.TYPES} to see the ones available
   * @param [stride=0] - How far apart, in bytes, the start of each value is. (used for interleaving data)
   * @param [start=0] - How far into the array to start reading values (used for interleaving data)
   * @param [instance=false] - Whether the geometry is instanced.
   * @param [divisor=1] - Divisor to use when doing instanced rendering
   */
  constructor(t, e = 0, i = !1, s = F.FLOAT, n, o, a, h = 1) {
    this.buffer = t, this.size = e, this.normalized = i, this.type = s, this.stride = n, this.start = o, this.instance = a, this.divisor = h;
  }
  /** Destroys the Attribute. */
  destroy() {
    this.buffer = null;
  }
  /**
   * Helper function that creates an Attribute based on the information provided
   * @param buffer - the id of the buffer that this attribute will look for
   * @param [size=0] - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2
   * @param [normalized=false] - should the data be normalized.
   * @param [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {@link PIXI.TYPES} to see the ones available
   * @param [stride=0] - How far apart, in bytes, the start of each value is. (used for interleaving data)
   * @returns - A new {@link PIXI.Attribute} based on the information provided
   */
  static from(t, e, i, s, n) {
    return new ui(t, e, i, s, n);
  }
}
const ad = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array
};
function hd(r, t) {
  let e = 0, i = 0;
  const s = {};
  for (let h = 0; h < r.length; h++)
    i += t[h], e += r[h].length;
  const n = new ArrayBuffer(e * 4);
  let o = null, a = 0;
  for (let h = 0; h < r.length; h++) {
    const l = t[h], u = r[h], c = fa(u);
    s[c] || (s[c] = new ad[c](n)), o = s[c];
    for (let d = 0; d < u.length; d++) {
      const f = (d / l | 0) * i + a, p = d % l;
      o[f + p] = u[d];
    }
    a += l;
  }
  return new Float32Array(n);
}
const oo = { 5126: 4, 5123: 2, 5121: 1 };
let ld = 0;
const ud = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array,
  Uint16Array
};
class ze {
  /**
   * @param buffers - An array of buffers. optional.
   * @param attributes - Of the geometry, optional structure of the attributes layout
   */
  constructor(t = [], e = {}) {
    this.buffers = t, this.indexBuffer = null, this.attributes = e, this.glVertexArrayObjects = {}, this.id = ld++, this.instanced = !1, this.instanceCount = 1, this.disposeRunner = new Nt("disposeGeometry"), this.refCount = 0;
  }
  /**
   *
   * Adds an attribute to the geometry
   * Note: `stride` and `start` should be `undefined` if you dont know them, not 0!
   * @param id - the name of the attribute (matching up to a shader)
   * @param {PIXI.Buffer|number[]} buffer - the buffer that holds the data of the attribute . You can also provide an Array and a buffer will be created from it.
   * @param size - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2
   * @param normalized - should the data be normalized.
   * @param [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {@link PIXI.TYPES} to see the ones available
   * @param [stride=0] - How far apart, in bytes, the start of each value is. (used for interleaving data)
   * @param [start=0] - How far into the array to start reading values (used for interleaving data)
   * @param instance - Instancing flag
   * @returns - Returns self, useful for chaining.
   */
  addAttribute(t, e, i = 0, s = !1, n, o, a, h = !1) {
    if (!e)
      throw new Error("You must pass a buffer when creating an attribute");
    e instanceof yt || (e instanceof Array && (e = new Float32Array(e)), e = new yt(e));
    const l = t.split("|");
    if (l.length > 1) {
      for (let c = 0; c < l.length; c++)
        this.addAttribute(l[c], e, i, s, n);
      return this;
    }
    let u = this.buffers.indexOf(e);
    return u === -1 && (this.buffers.push(e), u = this.buffers.length - 1), this.attributes[t] = new ui(u, i, s, n, o, a, h), this.instanced = this.instanced || h, this;
  }
  /**
   * Returns the requested attribute.
   * @param id - The name of the attribute required
   * @returns - The attribute requested.
   */
  getAttribute(t) {
    return this.attributes[t];
  }
  /**
   * Returns the requested buffer.
   * @param id - The name of the buffer required.
   * @returns - The buffer requested.
   */
  getBuffer(t) {
    return this.buffers[this.getAttribute(t).buffer];
  }
  /**
   *
   * Adds an index buffer to the geometry
   * The index buffer contains integers, three for each triangle in the geometry, which reference the various attribute buffers (position, colour, UV coordinates, other UV coordinates, normal, …). There is only ONE index buffer.
   * @param {PIXI.Buffer|number[]} [buffer] - The buffer that holds the data of the index buffer. You can also provide an Array and a buffer will be created from it.
   * @returns - Returns self, useful for chaining.
   */
  addIndex(t) {
    return t instanceof yt || (t instanceof Array && (t = new Uint16Array(t)), t = new yt(t)), t.type = Dt.ELEMENT_ARRAY_BUFFER, this.indexBuffer = t, this.buffers.includes(t) || this.buffers.push(t), this;
  }
  /**
   * Returns the index buffer
   * @returns - The index buffer.
   */
  getIndex() {
    return this.indexBuffer;
  }
  /**
   * This function modifies the structure so that all current attributes become interleaved into a single buffer
   * This can be useful if your model remains static as it offers a little performance boost
   * @returns - Returns self, useful for chaining.
   */
  interleave() {
    if (this.buffers.length === 1 || this.buffers.length === 2 && this.indexBuffer)
      return this;
    const t = [], e = [], i = new yt();
    let s;
    for (s in this.attributes) {
      const n = this.attributes[s], o = this.buffers[n.buffer];
      t.push(o.data), e.push(n.size * oo[n.type] / 4), n.buffer = 0;
    }
    for (i.data = hd(t, e), s = 0; s < this.buffers.length; s++)
      this.buffers[s] !== this.indexBuffer && this.buffers[s].destroy();
    return this.buffers = [i], this.indexBuffer && this.buffers.push(this.indexBuffer), this;
  }
  /** Get the size of the geometries, in vertices. */
  getSize() {
    for (const t in this.attributes) {
      const e = this.attributes[t];
      return this.buffers[e.buffer].data.length / (e.stride / 4 || e.size);
    }
    return 0;
  }
  /** Disposes WebGL resources that are connected to this geometry. */
  dispose() {
    this.disposeRunner.emit(this, !1);
  }
  /** Destroys the geometry. */
  destroy() {
    this.dispose(), this.buffers = null, this.indexBuffer = null, this.attributes = null;
  }
  /**
   * Returns a clone of the geometry.
   * @returns - A new clone of this geometry.
   */
  clone() {
    const t = new ze();
    for (let e = 0; e < this.buffers.length; e++)
      t.buffers[e] = new yt(this.buffers[e].data.slice(0));
    for (const e in this.attributes) {
      const i = this.attributes[e];
      t.attributes[e] = new ui(
        i.buffer,
        i.size,
        i.normalized,
        i.type,
        i.stride,
        i.start,
        i.instance
      );
    }
    return this.indexBuffer && (t.indexBuffer = t.buffers[this.buffers.indexOf(this.indexBuffer)], t.indexBuffer.type = Dt.ELEMENT_ARRAY_BUFFER), t;
  }
  /**
   * Merges an array of geometries into a new single one.
   *
   * Geometry attribute styles must match for this operation to work.
   * @param geometries - array of geometries to merge
   * @returns - Shiny new geometry!
   */
  static merge(t) {
    const e = new ze(), i = [], s = [], n = [];
    let o;
    for (let a = 0; a < t.length; a++) {
      o = t[a];
      for (let h = 0; h < o.buffers.length; h++)
        s[h] = s[h] || 0, s[h] += o.buffers[h].data.length, n[h] = 0;
    }
    for (let a = 0; a < o.buffers.length; a++)
      i[a] = new ud[fa(o.buffers[a].data)](s[a]), e.buffers[a] = new yt(i[a]);
    for (let a = 0; a < t.length; a++) {
      o = t[a];
      for (let h = 0; h < o.buffers.length; h++)
        i[h].set(o.buffers[h].data, n[h]), n[h] += o.buffers[h].data.length;
    }
    if (e.attributes = o.attributes, o.indexBuffer) {
      e.indexBuffer = e.buffers[o.buffers.indexOf(o.indexBuffer)], e.indexBuffer.type = Dt.ELEMENT_ARRAY_BUFFER;
      let a = 0, h = 0, l = 0, u = 0;
      for (let c = 0; c < o.buffers.length; c++)
        if (o.buffers[c] !== o.indexBuffer) {
          u = c;
          break;
        }
      for (const c in o.attributes) {
        const d = o.attributes[c];
        (d.buffer | 0) === u && (h += d.size * oo[d.type] / 4);
      }
      for (let c = 0; c < t.length; c++) {
        const d = t[c].indexBuffer.data;
        for (let f = 0; f < d.length; f++)
          e.indexBuffer.data[f + l] += a;
        a += t[c].buffers[u].data.length / h, l += d.length;
      }
    }
    return e;
  }
}
class cd extends ze {
  /**
   * @param {boolean} [_static=false] - Optimization flag, where `false`
   *        is updated every frame, `true` doesn't change frame-to-frame.
   */
  constructor(t = !1) {
    super(), this._buffer = new yt(null, t, !1), this._indexBuffer = new yt(null, t, !0), this.addAttribute("aVertexPosition", this._buffer, 2, !1, F.FLOAT).addAttribute("aTextureCoord", this._buffer, 2, !1, F.FLOAT).addAttribute("aColor", this._buffer, 4, !0, F.UNSIGNED_BYTE).addAttribute("aTextureId", this._buffer, 1, !0, F.FLOAT).addIndex(this._indexBuffer);
  }
}
const dd = Math.PI * 2, fd = 180 / Math.PI, pd = Math.PI / 180;
var ya = /* @__PURE__ */ ((r) => (r[r.POLY = 0] = "POLY", r[r.RECT = 1] = "RECT", r[r.CIRC = 2] = "CIRC", r[r.ELIP = 3] = "ELIP", r[r.RREC = 4] = "RREC", r))(ya || {});
class ht {
  /**
   * Creates a new `Point`
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   */
  constructor(t = 0, e = 0) {
    this.x = 0, this.y = 0, this.x = t, this.y = e;
  }
  /**
   * Creates a clone of this point
   * @returns A clone of this point
   */
  clone() {
    return new ht(this.x, this.y);
  }
  /**
   * Copies `x` and `y` from the given point into this point
   * @param p - The point to copy from
   * @returns The point instance itself
   */
  copyFrom(t) {
    return this.set(t.x, t.y), this;
  }
  /**
   * Copies this point's x and y into the given point (`p`).
   * @param p - The point to copy to. Can be any of type that is or extends `IPointData`
   * @returns The point (`p`) with values updated
   */
  copyTo(t) {
    return t.set(this.x, this.y), t;
  }
  /**
   * Accepts another point (`p`) and returns `true` if the given point is equal to this point
   * @param p - The point to check
   * @returns Returns `true` if both `x` and `y` are equal
   */
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  /**
   * Sets the point to a new `x` and `y` position.
   * If `y` is omitted, both `x` and `y` will be set to `x`.
   * @param {number} [x=0] - position of the point on the `x` axis
   * @param {number} [y=x] - position of the point on the `y` axis
   * @returns The point instance itself
   */
  set(t = 0, e = t) {
    return this.x = t, this.y = e, this;
  }
}
ht.prototype.toString = function() {
  return `[@pixi/math:Point x=${this.x} y=${this.y}]`;
};
const Or = [new ht(), new ht(), new ht(), new ht()];
class H {
  /**
   * @param x - The X coordinate of the upper-left corner of the rectangle
   * @param y - The Y coordinate of the upper-left corner of the rectangle
   * @param width - The overall width of the rectangle
   * @param height - The overall height of the rectangle
   */
  constructor(t = 0, e = 0, i = 0, s = 0) {
    this.x = Number(t), this.y = Number(e), this.width = Number(i), this.height = Number(s), this.type = ya.RECT;
  }
  /** Returns the left edge of the rectangle. */
  get left() {
    return this.x;
  }
  /** Returns the right edge of the rectangle. */
  get right() {
    return this.x + this.width;
  }
  /** Returns the top edge of the rectangle. */
  get top() {
    return this.y;
  }
  /** Returns the bottom edge of the rectangle. */
  get bottom() {
    return this.y + this.height;
  }
  /** A constant empty rectangle. */
  static get EMPTY() {
    return new H(0, 0, 0, 0);
  }
  /**
   * Creates a clone of this Rectangle
   * @returns a copy of the rectangle
   */
  clone() {
    return new H(this.x, this.y, this.width, this.height);
  }
  /**
   * Copies another rectangle to this one.
   * @param rectangle - The rectangle to copy from.
   * @returns Returns itself.
   */
  copyFrom(t) {
    return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this;
  }
  /**
   * Copies this rectangle to another one.
   * @param rectangle - The rectangle to copy to.
   * @returns Returns given parameter.
   */
  copyTo(t) {
    return t.x = this.x, t.y = this.y, t.width = this.width, t.height = this.height, t;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this Rectangle
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coordinates are within this Rectangle
   */
  contains(t, e) {
    return this.width <= 0 || this.height <= 0 ? !1 : t >= this.x && t < this.x + this.width && e >= this.y && e < this.y + this.height;
  }
  /**
   * Determines whether the `other` Rectangle transformed by `transform` intersects with `this` Rectangle object.
   * Returns true only if the area of the intersection is >0, this means that Rectangles
   * sharing a side are not overlapping. Another side effect is that an arealess rectangle
   * (width or height equal to zero) can't intersect any other rectangle.
   * @param {Rectangle} other - The Rectangle to intersect with `this`.
   * @param {Matrix} transform - The transformation matrix of `other`.
   * @returns {boolean} A value of `true` if the transformed `other` Rectangle intersects with `this`; otherwise `false`.
   */
  intersects(t, e) {
    if (!e) {
      const R = this.x < t.x ? t.x : this.x;
      if ((this.right > t.right ? t.right : this.right) <= R)
        return !1;
      const S = this.y < t.y ? t.y : this.y;
      return (this.bottom > t.bottom ? t.bottom : this.bottom) > S;
    }
    const i = this.left, s = this.right, n = this.top, o = this.bottom;
    if (s <= i || o <= n)
      return !1;
    const a = Or[0].set(t.left, t.top), h = Or[1].set(t.left, t.bottom), l = Or[2].set(t.right, t.top), u = Or[3].set(t.right, t.bottom);
    if (l.x <= a.x || h.y <= a.y)
      return !1;
    const c = Math.sign(e.a * e.d - e.b * e.c);
    if (c === 0 || (e.apply(a, a), e.apply(h, h), e.apply(l, l), e.apply(u, u), Math.max(a.x, h.x, l.x, u.x) <= i || Math.min(a.x, h.x, l.x, u.x) >= s || Math.max(a.y, h.y, l.y, u.y) <= n || Math.min(a.y, h.y, l.y, u.y) >= o))
      return !1;
    const d = c * (h.y - a.y), f = c * (a.x - h.x), p = d * i + f * n, v = d * s + f * n, y = d * i + f * o, E = d * s + f * o;
    if (Math.max(p, v, y, E) <= d * a.x + f * a.y || Math.min(p, v, y, E) >= d * u.x + f * u.y)
      return !1;
    const _ = c * (a.y - l.y), g = c * (l.x - a.x), T = _ * i + g * n, A = _ * s + g * n, k = _ * i + g * o, W = _ * s + g * o;
    return !(Math.max(T, A, k, W) <= _ * a.x + g * a.y || Math.min(T, A, k, W) >= _ * u.x + g * u.y);
  }
  /**
   * Pads the rectangle making it grow in all directions.
   * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
   * @param paddingX - The horizontal padding amount.
   * @param paddingY - The vertical padding amount.
   * @returns Returns itself.
   */
  pad(t = 0, e = t) {
    return this.x -= t, this.y -= e, this.width += t * 2, this.height += e * 2, this;
  }
  /**
   * Fits this rectangle around the passed one.
   * @param rectangle - The rectangle to fit.
   * @returns Returns itself.
   */
  fit(t) {
    const e = Math.max(this.x, t.x), i = Math.min(this.x + this.width, t.x + t.width), s = Math.max(this.y, t.y), n = Math.min(this.y + this.height, t.y + t.height);
    return this.x = e, this.width = Math.max(i - e, 0), this.y = s, this.height = Math.max(n - s, 0), this;
  }
  /**
   * Enlarges rectangle that way its corners lie on grid
   * @param resolution - resolution
   * @param eps - precision
   * @returns Returns itself.
   */
  ceil(t = 1, e = 1e-3) {
    const i = Math.ceil((this.x + this.width - e) * t) / t, s = Math.ceil((this.y + this.height - e) * t) / t;
    return this.x = Math.floor((this.x + e) * t) / t, this.y = Math.floor((this.y + e) * t) / t, this.width = i - this.x, this.height = s - this.y, this;
  }
  /**
   * Enlarges this rectangle to include the passed rectangle.
   * @param rectangle - The rectangle to include.
   * @returns Returns itself.
   */
  enlarge(t) {
    const e = Math.min(this.x, t.x), i = Math.max(this.x + this.width, t.x + t.width), s = Math.min(this.y, t.y), n = Math.max(this.y + this.height, t.y + t.height);
    return this.x = e, this.width = i - e, this.y = s, this.height = n - s, this;
  }
}
H.prototype.toString = function() {
  return `[@pixi/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
};
class q {
  /**
   * @param a - x scale
   * @param b - y skew
   * @param c - x skew
   * @param d - y scale
   * @param tx - x translation
   * @param ty - y translation
   */
  constructor(t = 1, e = 0, i = 0, s = 1, n = 0, o = 0) {
    this.array = null, this.a = t, this.b = e, this.c = i, this.d = s, this.tx = n, this.ty = o;
  }
  /**
   * Creates a Matrix object based on the given array. The Element to Matrix mapping order is as follows:
   *
   * a = array[0]
   * b = array[1]
   * c = array[3]
   * d = array[4]
   * tx = array[2]
   * ty = array[5]
   * @param array - The array that the matrix will be populated from.
   */
  fromArray(t) {
    this.a = t[0], this.b = t[1], this.c = t[3], this.d = t[4], this.tx = t[2], this.ty = t[5];
  }
  /**
   * Sets the matrix properties.
   * @param a - Matrix component
   * @param b - Matrix component
   * @param c - Matrix component
   * @param d - Matrix component
   * @param tx - Matrix component
   * @param ty - Matrix component
   * @returns This matrix. Good for chaining method calls.
   */
  set(t, e, i, s, n, o) {
    return this.a = t, this.b = e, this.c = i, this.d = s, this.tx = n, this.ty = o, this;
  }
  /**
   * Creates an array from the current Matrix object.
   * @param transpose - Whether we need to transpose the matrix or not
   * @param [out=new Float32Array(9)] - If provided the array will be assigned to out
   * @returns The newly created array which contains the matrix
   */
  toArray(t, e) {
    this.array || (this.array = new Float32Array(9));
    const i = e || this.array;
    return t ? (i[0] = this.a, i[1] = this.b, i[2] = 0, i[3] = this.c, i[4] = this.d, i[5] = 0, i[6] = this.tx, i[7] = this.ty, i[8] = 1) : (i[0] = this.a, i[1] = this.c, i[2] = this.tx, i[3] = this.b, i[4] = this.d, i[5] = this.ty, i[6] = 0, i[7] = 0, i[8] = 1), i;
  }
  /**
   * Get a new position with the current transformation applied.
   * Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)
   * @param pos - The origin
   * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
   * @returns {PIXI.Point} The new point, transformed through this matrix
   */
  apply(t, e) {
    e = e || new ht();
    const i = t.x, s = t.y;
    return e.x = this.a * i + this.c * s + this.tx, e.y = this.b * i + this.d * s + this.ty, e;
  }
  /**
   * Get a new position with the inverse of the current transformation applied.
   * Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)
   * @param pos - The origin
   * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
   * @returns {PIXI.Point} The new point, inverse-transformed through this matrix
   */
  applyInverse(t, e) {
    e = e || new ht();
    const i = 1 / (this.a * this.d + this.c * -this.b), s = t.x, n = t.y;
    return e.x = this.d * i * s + -this.c * i * n + (this.ty * this.c - this.tx * this.d) * i, e.y = this.a * i * n + -this.b * i * s + (-this.ty * this.a + this.tx * this.b) * i, e;
  }
  /**
   * Translates the matrix on the x and y.
   * @param x - How much to translate x by
   * @param y - How much to translate y by
   * @returns This matrix. Good for chaining method calls.
   */
  translate(t, e) {
    return this.tx += t, this.ty += e, this;
  }
  /**
   * Applies a scale transformation to the matrix.
   * @param x - The amount to scale horizontally
   * @param y - The amount to scale vertically
   * @returns This matrix. Good for chaining method calls.
   */
  scale(t, e) {
    return this.a *= t, this.d *= e, this.c *= t, this.b *= e, this.tx *= t, this.ty *= e, this;
  }
  /**
   * Applies a rotation transformation to the matrix.
   * @param angle - The angle in radians.
   * @returns This matrix. Good for chaining method calls.
   */
  rotate(t) {
    const e = Math.cos(t), i = Math.sin(t), s = this.a, n = this.c, o = this.tx;
    return this.a = s * e - this.b * i, this.b = s * i + this.b * e, this.c = n * e - this.d * i, this.d = n * i + this.d * e, this.tx = o * e - this.ty * i, this.ty = o * i + this.ty * e, this;
  }
  /**
   * Appends the given Matrix to this Matrix.
   * @param matrix - The matrix to append.
   * @returns This matrix. Good for chaining method calls.
   */
  append(t) {
    const e = this.a, i = this.b, s = this.c, n = this.d;
    return this.a = t.a * e + t.b * s, this.b = t.a * i + t.b * n, this.c = t.c * e + t.d * s, this.d = t.c * i + t.d * n, this.tx = t.tx * e + t.ty * s + this.tx, this.ty = t.tx * i + t.ty * n + this.ty, this;
  }
  /**
   * Sets the matrix based on all the available properties
   * @param x - Position on the x axis
   * @param y - Position on the y axis
   * @param pivotX - Pivot on the x axis
   * @param pivotY - Pivot on the y axis
   * @param scaleX - Scale on the x axis
   * @param scaleY - Scale on the y axis
   * @param rotation - Rotation in radians
   * @param skewX - Skew on the x axis
   * @param skewY - Skew on the y axis
   * @returns This matrix. Good for chaining method calls.
   */
  setTransform(t, e, i, s, n, o, a, h, l) {
    return this.a = Math.cos(a + l) * n, this.b = Math.sin(a + l) * n, this.c = -Math.sin(a - h) * o, this.d = Math.cos(a - h) * o, this.tx = t - (i * this.a + s * this.c), this.ty = e - (i * this.b + s * this.d), this;
  }
  /**
   * Prepends the given Matrix to this Matrix.
   * @param matrix - The matrix to prepend
   * @returns This matrix. Good for chaining method calls.
   */
  prepend(t) {
    const e = this.tx;
    if (t.a !== 1 || t.b !== 0 || t.c !== 0 || t.d !== 1) {
      const i = this.a, s = this.c;
      this.a = i * t.a + this.b * t.c, this.b = i * t.b + this.b * t.d, this.c = s * t.a + this.d * t.c, this.d = s * t.b + this.d * t.d;
    }
    return this.tx = e * t.a + this.ty * t.c + t.tx, this.ty = e * t.b + this.ty * t.d + t.ty, this;
  }
  /**
   * Decomposes the matrix (x, y, scaleX, scaleY, and rotation) and sets the properties on to a transform.
   * @param transform - The transform to apply the properties to.
   * @returns The transform with the newly applied properties
   */
  decompose(t) {
    const e = this.a, i = this.b, s = this.c, n = this.d, o = t.pivot, a = -Math.atan2(-s, n), h = Math.atan2(i, e), l = Math.abs(a + h);
    return l < 1e-5 || Math.abs(dd - l) < 1e-5 ? (t.rotation = h, t.skew.x = t.skew.y = 0) : (t.rotation = 0, t.skew.x = a, t.skew.y = h), t.scale.x = Math.sqrt(e * e + i * i), t.scale.y = Math.sqrt(s * s + n * n), t.position.x = this.tx + (o.x * e + o.y * s), t.position.y = this.ty + (o.x * i + o.y * n), t;
  }
  /**
   * Inverts this matrix
   * @returns This matrix. Good for chaining method calls.
   */
  invert() {
    const t = this.a, e = this.b, i = this.c, s = this.d, n = this.tx, o = t * s - e * i;
    return this.a = s / o, this.b = -e / o, this.c = -i / o, this.d = t / o, this.tx = (i * this.ty - s * n) / o, this.ty = -(t * this.ty - e * n) / o, this;
  }
  /**
   * Resets this Matrix to an identity (default) matrix.
   * @returns This matrix. Good for chaining method calls.
   */
  identity() {
    return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
  }
  /**
   * Creates a new Matrix object with the same values as this one.
   * @returns A copy of this matrix. Good for chaining method calls.
   */
  clone() {
    const t = new q();
    return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t;
  }
  /**
   * Changes the values of the given matrix to be the same as the ones in this matrix
   * @param matrix - The matrix to copy to.
   * @returns The matrix given in parameter with its values updated.
   */
  copyTo(t) {
    return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t;
  }
  /**
   * Changes the values of the matrix to be the same as the ones in given matrix
   * @param {PIXI.Matrix} matrix - The matrix to copy from.
   * @returns {PIXI.Matrix} this
   */
  copyFrom(t) {
    return this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.tx = t.tx, this.ty = t.ty, this;
  }
  /**
   * A default (identity) matrix
   * @readonly
   */
  static get IDENTITY() {
    return new q();
  }
  /**
   * A temp matrix
   * @readonly
   */
  static get TEMP_MATRIX() {
    return new q();
  }
}
q.prototype.toString = function() {
  return `[@pixi/math:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`;
};
const le = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1], ue = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1], ce = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1], de = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1], Cs = [], ga = [], Lr = Math.sign;
function md() {
  for (let r = 0; r < 16; r++) {
    const t = [];
    Cs.push(t);
    for (let e = 0; e < 16; e++) {
      const i = Lr(le[r] * le[e] + ce[r] * ue[e]), s = Lr(ue[r] * le[e] + de[r] * ue[e]), n = Lr(le[r] * ce[e] + ce[r] * de[e]), o = Lr(ue[r] * ce[e] + de[r] * de[e]);
      for (let a = 0; a < 16; a++)
        if (le[a] === i && ue[a] === s && ce[a] === n && de[a] === o) {
          t.push(a);
          break;
        }
    }
  }
  for (let r = 0; r < 16; r++) {
    const t = new q();
    t.set(le[r], ue[r], ce[r], de[r], 0, 0), ga.push(t);
  }
}
md();
const V = {
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 0°       | East      |
   * @readonly
   */
  E: 0,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 45°↻     | Southeast |
   * @readonly
   */
  SE: 1,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 90°↻     | South     |
   * @readonly
   */
  S: 2,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 135°↻    | Southwest |
   * @readonly
   */
  SW: 3,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 180°     | West      |
   * @readonly
   */
  W: 4,
  /**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -135°/225°↻ | Northwest    |
   * @readonly
   */
  NW: 5,
  /**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -90°/270°↻  | North        |
   * @readonly
   */
  N: 6,
  /**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -45°/315°↻  | Northeast    |
   * @readonly
   */
  NE: 7,
  /**
   * Reflection about Y-axis.
   * @readonly
   */
  MIRROR_VERTICAL: 8,
  /**
   * Reflection about the main diagonal.
   * @readonly
   */
  MAIN_DIAGONAL: 10,
  /**
   * Reflection about X-axis.
   * @readonly
   */
  MIRROR_HORIZONTAL: 12,
  /**
   * Reflection about reverse diagonal.
   * @readonly
   */
  REVERSE_DIAGONAL: 14,
  /**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The X-component of the U-axis
   *    after rotating the axes.
   */
  uX: (r) => le[r],
  /**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The Y-component of the U-axis
   *    after rotating the axes.
   */
  uY: (r) => ue[r],
  /**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The X-component of the V-axis
   *    after rotating the axes.
   */
  vX: (r) => ce[r],
  /**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The Y-component of the V-axis
   *    after rotating the axes.
   */
  vY: (r) => de[r],
  /**
   * @param {PIXI.GD8Symmetry} rotation - symmetry whose opposite
   *   is needed. Only rotations have opposite symmetries while
   *   reflections don't.
   * @returns {PIXI.GD8Symmetry} The opposite symmetry of `rotation`
   */
  inv: (r) => r & 8 ? r & 15 : -r & 7,
  /**
   * Composes the two D8 operations.
   *
   * Taking `^` as reflection:
   *
   * |       | E=0 | S=2 | W=4 | N=6 | E^=8 | S^=10 | W^=12 | N^=14 |
   * |-------|-----|-----|-----|-----|------|-------|-------|-------|
   * | E=0   | E   | S   | W   | N   | E^   | S^    | W^    | N^    |
   * | S=2   | S   | W   | N   | E   | S^   | W^    | N^    | E^    |
   * | W=4   | W   | N   | E   | S   | W^   | N^    | E^    | S^    |
   * | N=6   | N   | E   | S   | W   | N^   | E^    | S^    | W^    |
   * | E^=8  | E^  | N^  | W^  | S^  | E    | N     | W     | S     |
   * | S^=10 | S^  | E^  | N^  | W^  | S    | E     | N     | W     |
   * | W^=12 | W^  | S^  | E^  | N^  | W    | S     | E     | N     |
   * | N^=14 | N^  | W^  | S^  | E^  | N    | W     | S     | E     |
   *
   * [This is a Cayley table]{@link https://en.wikipedia.org/wiki/Cayley_table}
   * @param {PIXI.GD8Symmetry} rotationSecond - Second operation, which
   *   is the row in the above cayley table.
   * @param {PIXI.GD8Symmetry} rotationFirst - First operation, which
   *   is the column in the above cayley table.
   * @returns {PIXI.GD8Symmetry} Composed operation
   */
  add: (r, t) => Cs[r][t],
  /**
   * Reverse of `add`.
   * @param {PIXI.GD8Symmetry} rotationSecond - Second operation
   * @param {PIXI.GD8Symmetry} rotationFirst - First operation
   * @returns {PIXI.GD8Symmetry} Result
   */
  sub: (r, t) => Cs[r][V.inv(t)],
  /**
   * Adds 180 degrees to rotation, which is a commutative
   * operation.
   * @param {number} rotation - The number to rotate.
   * @returns {number} Rotated number
   */
  rotate180: (r) => r ^ 4,
  /**
   * Checks if the rotation angle is vertical, i.e. south
   * or north. It doesn't work for reflections.
   * @param {PIXI.GD8Symmetry} rotation - The number to check.
   * @returns {boolean} Whether or not the direction is vertical
   */
  isVertical: (r) => (r & 3) === 2,
  // rotation % 4 === 2
  /**
   * Approximates the vector `V(dx,dy)` into one of the
   * eight directions provided by `groupD8`.
   * @param {number} dx - X-component of the vector
   * @param {number} dy - Y-component of the vector
   * @returns {PIXI.GD8Symmetry} Approximation of the vector into
   *  one of the eight symmetries.
   */
  byDirection: (r, t) => Math.abs(r) * 2 <= Math.abs(t) ? t >= 0 ? V.S : V.N : Math.abs(t) * 2 <= Math.abs(r) ? r > 0 ? V.E : V.W : t > 0 ? r > 0 ? V.SE : V.SW : r > 0 ? V.NE : V.NW,
  /**
   * Helps sprite to compensate texture packer rotation.
   * @param {PIXI.Matrix} matrix - sprite world matrix
   * @param {PIXI.GD8Symmetry} rotation - The rotation factor to use.
   * @param {number} tx - sprite anchoring
   * @param {number} ty - sprite anchoring
   */
  matrixAppendRotationInv: (r, t, e = 0, i = 0) => {
    const s = ga[V.inv(t)];
    s.tx = e, s.ty = i, r.append(s);
  }
};
class ee {
  /**
   * Creates a new `ObservablePoint`
   * @param cb - callback function triggered when `x` and/or `y` are changed
   * @param scope - owner of callback
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   */
  constructor(t, e, i = 0, s = 0) {
    this._x = i, this._y = s, this.cb = t, this.scope = e;
  }
  /**
   * Creates a clone of this point.
   * The callback and scope params can be overridden otherwise they will default
   * to the clone object's values.
   * @override
   * @param cb - The callback function triggered when `x` and/or `y` are changed
   * @param scope - The owner of the callback
   * @returns a copy of this observable point
   */
  clone(t = this.cb, e = this.scope) {
    return new ee(t, e, this._x, this._y);
  }
  /**
   * Sets the point to a new `x` and `y` position.
   * If `y` is omitted, both `x` and `y` will be set to `x`.
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=x] - position of the point on the y axis
   * @returns The observable point instance itself
   */
  set(t = 0, e = t) {
    return (this._x !== t || this._y !== e) && (this._x = t, this._y = e, this.cb.call(this.scope)), this;
  }
  /**
   * Copies x and y from the given point (`p`)
   * @param p - The point to copy from. Can be any of type that is or extends `IPointData`
   * @returns The observable point instance itself
   */
  copyFrom(t) {
    return (this._x !== t.x || this._y !== t.y) && (this._x = t.x, this._y = t.y, this.cb.call(this.scope)), this;
  }
  /**
   * Copies this point's x and y into that of the given point (`p`)
   * @param p - The point to copy to. Can be any of type that is or extends `IPointData`
   * @returns The point (`p`) with values updated
   */
  copyTo(t) {
    return t.set(this._x, this._y), t;
  }
  /**
   * Accepts another point (`p`) and returns `true` if the given point is equal to this point
   * @param p - The point to check
   * @returns Returns `true` if both `x` and `y` are equal
   */
  equals(t) {
    return t.x === this._x && t.y === this._y;
  }
  /** Position of the observable point on the x axis. */
  get x() {
    return this._x;
  }
  set x(t) {
    this._x !== t && (this._x = t, this.cb.call(this.scope));
  }
  /** Position of the observable point on the y axis. */
  get y() {
    return this._y;
  }
  set y(t) {
    this._y !== t && (this._y = t, this.cb.call(this.scope));
  }
}
ee.prototype.toString = function() {
  return `[@pixi/math:ObservablePoint x=${this.x} y=${this.y} scope=${this.scope}]`;
};
const Ms = class {
  constructor() {
    this.worldTransform = new q(), this.localTransform = new q(), this.position = new ee(this.onChange, this, 0, 0), this.scale = new ee(this.onChange, this, 1, 1), this.pivot = new ee(this.onChange, this, 0, 0), this.skew = new ee(this.updateSkew, this, 0, 0), this._rotation = 0, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._localID = 0, this._currentLocalID = 0, this._worldID = 0, this._parentID = 0;
  }
  /** Called when a value changes. */
  onChange() {
    this._localID++;
  }
  /** Called when the skew or the rotation changes. */
  updateSkew() {
    this._cx = Math.cos(this._rotation + this.skew.y), this._sx = Math.sin(this._rotation + this.skew.y), this._cy = -Math.sin(this._rotation - this.skew.x), this._sy = Math.cos(this._rotation - this.skew.x), this._localID++;
  }
  /** Updates the local transformation matrix. */
  updateLocalTransform() {
    const r = this.localTransform;
    this._localID !== this._currentLocalID && (r.a = this._cx * this.scale.x, r.b = this._sx * this.scale.x, r.c = this._cy * this.scale.y, r.d = this._sy * this.scale.y, r.tx = this.position.x - (this.pivot.x * r.a + this.pivot.y * r.c), r.ty = this.position.y - (this.pivot.x * r.b + this.pivot.y * r.d), this._currentLocalID = this._localID, this._parentID = -1);
  }
  /**
   * Updates the local and the world transformation matrices.
   * @param parentTransform - The parent transform
   */
  updateTransform(r) {
    const t = this.localTransform;
    if (this._localID !== this._currentLocalID && (t.a = this._cx * this.scale.x, t.b = this._sx * this.scale.x, t.c = this._cy * this.scale.y, t.d = this._sy * this.scale.y, t.tx = this.position.x - (this.pivot.x * t.a + this.pivot.y * t.c), t.ty = this.position.y - (this.pivot.x * t.b + this.pivot.y * t.d), this._currentLocalID = this._localID, this._parentID = -1), this._parentID !== r._worldID) {
      const e = r.worldTransform, i = this.worldTransform;
      i.a = t.a * e.a + t.b * e.c, i.b = t.a * e.b + t.b * e.d, i.c = t.c * e.a + t.d * e.c, i.d = t.c * e.b + t.d * e.d, i.tx = t.tx * e.a + t.ty * e.c + e.tx, i.ty = t.tx * e.b + t.ty * e.d + e.ty, this._parentID = r._worldID, this._worldID++;
    }
  }
  /**
   * Decomposes a matrix and sets the transforms properties based on it.
   * @param matrix - The matrix to decompose
   */
  setFromMatrix(r) {
    r.decompose(this), this._localID++;
  }
  /** The rotation of the object in radians. */
  get rotation() {
    return this._rotation;
  }
  set rotation(r) {
    this._rotation !== r && (this._rotation = r, this.updateSkew());
  }
};
Ms.IDENTITY = new Ms();
let wi = Ms;
wi.prototype.toString = function() {
  return `[@pixi/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`;
};
var yd = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor *= texture2D(uSampler, vTextureCoord);
}`, gd = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void){
   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
   vTextureCoord = aTextureCoord;
}
`;
function ao(r, t, e) {
  const i = r.createShader(t);
  return r.shaderSource(i, e), r.compileShader(i), i;
}
function rs(r) {
  const t = new Array(r);
  for (let e = 0; e < t.length; e++)
    t[e] = !1;
  return t;
}
function va(r, t) {
  switch (r) {
    case "float":
      return 0;
    case "vec2":
      return new Float32Array(2 * t);
    case "vec3":
      return new Float32Array(3 * t);
    case "vec4":
      return new Float32Array(4 * t);
    case "int":
    case "uint":
    case "sampler2D":
    case "sampler2DArray":
      return 0;
    case "ivec2":
      return new Int32Array(2 * t);
    case "ivec3":
      return new Int32Array(3 * t);
    case "ivec4":
      return new Int32Array(4 * t);
    case "uvec2":
      return new Uint32Array(2 * t);
    case "uvec3":
      return new Uint32Array(3 * t);
    case "uvec4":
      return new Uint32Array(4 * t);
    case "bool":
      return !1;
    case "bvec2":
      return rs(2 * t);
    case "bvec3":
      return rs(3 * t);
    case "bvec4":
      return rs(4 * t);
    case "mat2":
      return new Float32Array([
        1,
        0,
        0,
        1
      ]);
    case "mat3":
      return new Float32Array([
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      ]);
    case "mat4":
      return new Float32Array([
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ]);
  }
  return null;
}
const He = [
  // a float cache layer
  {
    test: (r) => r.type === "float" && r.size === 1 && !r.isArray,
    code: (r) => `
            if(uv["${r}"] !== ud["${r}"].value)
            {
                ud["${r}"].value = uv["${r}"]
                gl.uniform1f(ud["${r}"].location, uv["${r}"])
            }
            `
  },
  // handling samplers
  {
    test: (r, t) => (
      // eslint-disable-next-line max-len,no-eq-null,eqeqeq
      (r.type === "sampler2D" || r.type === "samplerCube" || r.type === "sampler2DArray") && r.size === 1 && !r.isArray && (t == null || t.castToBaseTexture !== void 0)
    ),
    code: (r) => `t = syncData.textureCount++;

            renderer.texture.bind(uv["${r}"], t);

            if(ud["${r}"].value !== t)
            {
                ud["${r}"].value = t;
                gl.uniform1i(ud["${r}"].location, t);
; // eslint-disable-line max-len
            }`
  },
  // uploading pixi matrix object to mat3
  {
    test: (r, t) => r.type === "mat3" && r.size === 1 && !r.isArray && t.a !== void 0,
    code: (r) => (
      // TODO and some smart caching dirty ids here!
      `
            gl.uniformMatrix3fv(ud["${r}"].location, false, uv["${r}"].toArray(true));
            `
    ),
    codeUbo: (r) => `
                var ${r}_matrix = uv.${r}.toArray(true);

                data[offset] = ${r}_matrix[0];
                data[offset+1] = ${r}_matrix[1];
                data[offset+2] = ${r}_matrix[2];
        
                data[offset + 4] = ${r}_matrix[3];
                data[offset + 5] = ${r}_matrix[4];
                data[offset + 6] = ${r}_matrix[5];
        
                data[offset + 8] = ${r}_matrix[6];
                data[offset + 9] = ${r}_matrix[7];
                data[offset + 10] = ${r}_matrix[8];
            `
  },
  // uploading a pixi point as a vec2 with caching layer
  {
    test: (r, t) => r.type === "vec2" && r.size === 1 && !r.isArray && t.x !== void 0,
    code: (r) => `
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["${r}"].location, v.x, v.y);
                }`,
    codeUbo: (r) => `
                v = uv.${r};

                data[offset] = v.x;
                data[offset+1] = v.y;
            `
  },
  // caching layer for a vec2
  {
    test: (r) => r.type === "vec2" && r.size === 1 && !r.isArray,
    code: (r) => `
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["${r}"].location, v[0], v[1]);
                }
            `
  },
  // upload a pixi rectangle as a vec4 with caching layer
  {
    test: (r, t) => r.type === "vec4" && r.size === 1 && !r.isArray && t.width !== void 0,
    code: (r) => `
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["${r}"].location, v.x, v.y, v.width, v.height)
                }`,
    codeUbo: (r) => `
                    v = uv.${r};

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                    data[offset+2] = v.width;
                    data[offset+3] = v.height;
                `
  },
  // upload a pixi color as vec4 with caching layer
  {
    test: (r, t) => r.type === "vec4" && r.size === 1 && !r.isArray && t.red !== void 0,
    code: (r) => `
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
                    cv[3] = v.alpha;
                    gl.uniform4f(ud["${r}"].location, v.red, v.green, v.blue, v.alpha)
                }`,
    codeUbo: (r) => `
                    v = uv.${r};

                    data[offset] = v.red;
                    data[offset+1] = v.green;
                    data[offset+2] = v.blue;
                    data[offset+3] = v.alpha;
                `
  },
  // upload a pixi color as a vec3 with caching layer
  {
    test: (r, t) => r.type === "vec3" && r.size === 1 && !r.isArray && t.red !== void 0,
    code: (r) => `
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.a)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
    
                    gl.uniform3f(ud["${r}"].location, v.red, v.green, v.blue)
                }`,
    codeUbo: (r) => `
                    v = uv.${r};

                    data[offset] = v.red;
                    data[offset+1] = v.green;
                    data[offset+2] = v.blue;
                `
  },
  // a caching layer for vec4 uploading
  {
    test: (r) => r.type === "vec4" && r.size === 1 && !r.isArray,
    code: (r) => `
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["${r}"].location, v[0], v[1], v[2], v[3])
                }`
  }
], vd = {
  float: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1f(location, v);
    }`,
  vec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2f(location, v[0], v[1])
    }`,
  vec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3f(location, v[0], v[1], v[2])
    }`,
  vec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4f(location, v[0], v[1], v[2], v[3]);
    }`,
  int: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  ivec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
  ivec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
  ivec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
  uint: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1ui(location, v);
    }`,
  uvec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2ui(location, v[0], v[1]);
    }`,
  uvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3ui(location, v[0], v[1], v[2]);
    }`,
  uvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4ui(location, v[0], v[1], v[2], v[3]);
    }`,
  bool: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1i(location, v);
    }`,
  bvec2: `
    if (cv[0] != v[0] || cv[1] != v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
  bvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
  bvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
  mat2: "gl.uniformMatrix2fv(location, false, v)",
  mat3: "gl.uniformMatrix3fv(location, false, v)",
  mat4: "gl.uniformMatrix4fv(location, false, v)",
  sampler2D: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  samplerCube: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  sampler2DArray: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`
}, _d = {
  float: "gl.uniform1fv(location, v)",
  vec2: "gl.uniform2fv(location, v)",
  vec3: "gl.uniform3fv(location, v)",
  vec4: "gl.uniform4fv(location, v)",
  mat4: "gl.uniformMatrix4fv(location, false, v)",
  mat3: "gl.uniformMatrix3fv(location, false, v)",
  mat2: "gl.uniformMatrix2fv(location, false, v)",
  int: "gl.uniform1iv(location, v)",
  ivec2: "gl.uniform2iv(location, v)",
  ivec3: "gl.uniform3iv(location, v)",
  ivec4: "gl.uniform4iv(location, v)",
  uint: "gl.uniform1uiv(location, v)",
  uvec2: "gl.uniform2uiv(location, v)",
  uvec3: "gl.uniform3uiv(location, v)",
  uvec4: "gl.uniform4uiv(location, v)",
  bool: "gl.uniform1iv(location, v)",
  bvec2: "gl.uniform2iv(location, v)",
  bvec3: "gl.uniform3iv(location, v)",
  bvec4: "gl.uniform4iv(location, v)",
  sampler2D: "gl.uniform1iv(location, v)",
  samplerCube: "gl.uniform1iv(location, v)",
  sampler2DArray: "gl.uniform1iv(location, v)"
};
function xd(r, t) {
  var i;
  const e = [`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];
  for (const s in r.uniforms) {
    const n = t[s];
    if (!n) {
      ((i = r.uniforms[s]) == null ? void 0 : i.group) === !0 && (r.uniforms[s].ubo ? e.push(`
                        renderer.shader.syncUniformBufferGroup(uv.${s}, '${s}');
                    `) : e.push(`
                        renderer.shader.syncUniformGroup(uv.${s}, syncData);
                    `));
      continue;
    }
    const o = r.uniforms[s];
    let a = !1;
    for (let h = 0; h < He.length; h++)
      if (He[h].test(n, o)) {
        e.push(He[h].code(s, o)), a = !0;
        break;
      }
    if (!a) {
      const h = (n.size === 1 && !n.isArray ? vd : _d)[n.type].replace("location", `ud["${s}"].location`);
      e.push(`
            cu = ud["${s}"];
            cv = cu.value;
            v = uv["${s}"];
            ${h};`);
    }
  }
  return new Function("ud", "uv", "renderer", "syncData", e.join(`
`));
}
const _a = {};
let Ce = _a;
function bd() {
  if (Ce === _a || Ce != null && Ce.isContextLost()) {
    const r = L.ADAPTER.createCanvas();
    let t;
    L.PREFER_ENV >= Ee.WEBGL2 && (t = r.getContext("webgl2", {})), t || (t = r.getContext("webgl", {}) || r.getContext("experimental-webgl", {}), t ? t.getExtension("WEBGL_draw_buffers") : t = null), Ce = t;
  }
  return Ce;
}
let Ur;
function Td() {
  if (!Ur) {
    Ur = Et.MEDIUM;
    const r = bd();
    if (r && r.getShaderPrecisionFormat) {
      const t = r.getShaderPrecisionFormat(r.FRAGMENT_SHADER, r.HIGH_FLOAT);
      t && (Ur = t.precision ? Et.HIGH : Et.MEDIUM);
    }
  }
  return Ur;
}
function ho(r, t) {
  const e = r.getShaderSource(t).split(`
`).map((l, u) => `${u}: ${l}`), i = r.getShaderInfoLog(t), s = i.split(`
`), n = {}, o = s.map((l) => parseFloat(l.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"))).filter((l) => l && !n[l] ? (n[l] = !0, !0) : !1), a = [""];
  o.forEach((l) => {
    e[l - 1] = `%c${e[l - 1]}%c`, a.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px");
  });
  const h = e.join(`
`);
  a[0] = h, console.error(i), console.groupCollapsed("click to view full shader code"), console.warn(...a), console.groupEnd();
}
function Ed(r, t, e, i) {
  r.getProgramParameter(t, r.LINK_STATUS) || (r.getShaderParameter(e, r.COMPILE_STATUS) || ho(r, e), r.getShaderParameter(i, r.COMPILE_STATUS) || ho(r, i), console.error("PixiJS Error: Could not initialize shader."), r.getProgramInfoLog(t) !== "" && console.warn("PixiJS Warning: gl.getProgramInfoLog()", r.getProgramInfoLog(t)));
}
const wd = {
  float: 1,
  vec2: 2,
  vec3: 3,
  vec4: 4,
  int: 1,
  ivec2: 2,
  ivec3: 3,
  ivec4: 4,
  uint: 1,
  uvec2: 2,
  uvec3: 3,
  uvec4: 4,
  bool: 1,
  bvec2: 2,
  bvec3: 3,
  bvec4: 4,
  mat2: 4,
  mat3: 9,
  mat4: 16,
  sampler2D: 1
};
function xa(r) {
  return wd[r];
}
let Br = null;
const lo = {
  FLOAT: "float",
  FLOAT_VEC2: "vec2",
  FLOAT_VEC3: "vec3",
  FLOAT_VEC4: "vec4",
  INT: "int",
  INT_VEC2: "ivec2",
  INT_VEC3: "ivec3",
  INT_VEC4: "ivec4",
  UNSIGNED_INT: "uint",
  UNSIGNED_INT_VEC2: "uvec2",
  UNSIGNED_INT_VEC3: "uvec3",
  UNSIGNED_INT_VEC4: "uvec4",
  BOOL: "bool",
  BOOL_VEC2: "bvec2",
  BOOL_VEC3: "bvec3",
  BOOL_VEC4: "bvec4",
  FLOAT_MAT2: "mat2",
  FLOAT_MAT3: "mat3",
  FLOAT_MAT4: "mat4",
  SAMPLER_2D: "sampler2D",
  INT_SAMPLER_2D: "sampler2D",
  UNSIGNED_INT_SAMPLER_2D: "sampler2D",
  SAMPLER_CUBE: "samplerCube",
  INT_SAMPLER_CUBE: "samplerCube",
  UNSIGNED_INT_SAMPLER_CUBE: "samplerCube",
  SAMPLER_2D_ARRAY: "sampler2DArray",
  INT_SAMPLER_2D_ARRAY: "sampler2DArray",
  UNSIGNED_INT_SAMPLER_2D_ARRAY: "sampler2DArray"
};
function ba(r, t) {
  if (!Br) {
    const e = Object.keys(lo);
    Br = {};
    for (let i = 0; i < e.length; ++i) {
      const s = e[i];
      Br[r[s]] = lo[s];
    }
  }
  return Br[t];
}
function uo(r, t, e) {
  if (r.substring(0, 9) !== "precision") {
    let i = t;
    return t === Et.HIGH && e !== Et.HIGH && (i = Et.MEDIUM), `precision ${i} float;
${r}`;
  } else if (e !== Et.HIGH && r.substring(0, 15) === "precision highp")
    return r.replace("precision highp", "precision mediump");
  return r;
}
let tr;
function Id() {
  if (typeof tr == "boolean")
    return tr;
  try {
    tr = new Function("param1", "param2", "param3", "return param1[param2] === param3;")({ a: "b" }, "a", "b") === !0;
  } catch {
    tr = !1;
  }
  return tr;
}
let Ad = 0;
const kr = {}, Fs = class Pe {
  /**
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param name - Name for shader
   * @param extra - Extra data for shader
   */
  constructor(t, e, i = "pixi-shader", s = {}) {
    this.extra = {}, this.id = Ad++, this.vertexSrc = t || Pe.defaultVertexSrc, this.fragmentSrc = e || Pe.defaultFragmentSrc, this.vertexSrc = this.vertexSrc.trim(), this.fragmentSrc = this.fragmentSrc.trim(), this.extra = s, this.vertexSrc.substring(0, 8) !== "#version" && (i = i.replace(/\s+/g, "-"), kr[i] ? (kr[i]++, i += `-${kr[i]}`) : kr[i] = 1, this.vertexSrc = `#define SHADER_NAME ${i}
${this.vertexSrc}`, this.fragmentSrc = `#define SHADER_NAME ${i}
${this.fragmentSrc}`, this.vertexSrc = uo(
      this.vertexSrc,
      Pe.defaultVertexPrecision,
      Et.HIGH
    ), this.fragmentSrc = uo(
      this.fragmentSrc,
      Pe.defaultFragmentPrecision,
      Td()
    )), this.glPrograms = {}, this.syncUniforms = null;
  }
  /**
   * The default vertex shader source.
   * @readonly
   */
  static get defaultVertexSrc() {
    return gd;
  }
  /**
   * The default fragment shader source.
   * @readonly
   */
  static get defaultFragmentSrc() {
    return yd;
  }
  /**
   * A short hand function to create a program based of a vertex and fragment shader.
   *
   * This method will also check to see if there is a cached program.
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param name - Name for shader
   * @returns A shiny new PixiJS shader program!
   */
  static from(t, e, i) {
    const s = t + e;
    let n = io[s];
    return n || (io[s] = n = new Pe(t, e, i)), n;
  }
};
Fs.defaultVertexPrecision = Et.HIGH, /**
* Default specify float precision in fragment shader.
* iOS is best set at highp due to https://github.com/pixijs/pixijs/issues/3742
* @static
* @type {PIXI.PRECISION}
* @default PIXI.PRECISION.MEDIUM
*/
Fs.defaultFragmentPrecision = Le.apple.device ? Et.HIGH : Et.MEDIUM;
let ge = Fs, Rd = 0;
class $t {
  /**
   * @param {object | Buffer} [uniforms] - Custom uniforms to use to augment the built-in ones. Or a pixi buffer.
   * @param isStatic - Uniforms wont be changed after creation.
   * @param isUbo - If true, will treat this uniform group as a uniform buffer object.
   */
  constructor(t, e, i) {
    this.group = !0, this.syncUniforms = {}, this.dirtyId = 0, this.id = Rd++, this.static = !!e, this.ubo = !!i, t instanceof yt ? (this.buffer = t, this.buffer.type = Dt.UNIFORM_BUFFER, this.autoManage = !1, this.ubo = !0) : (this.uniforms = t, this.ubo && (this.buffer = new yt(new Float32Array(1)), this.buffer.type = Dt.UNIFORM_BUFFER, this.autoManage = !0));
  }
  update() {
    this.dirtyId++, !this.autoManage && this.buffer && this.buffer.update();
  }
  add(t, e, i) {
    if (!this.ubo)
      this.uniforms[t] = new $t(e, i);
    else
      throw new Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");
  }
  static from(t, e, i) {
    return new $t(t, e, i);
  }
  /**
   * A short hand function for creating a static UBO UniformGroup.
   * @param uniforms - the ubo item
   * @param _static - should this be updated each time it is used? defaults to true here!
   */
  static uboFrom(t, e) {
    return new $t(t, e ?? !0, !0);
  }
}
class Ii {
  /**
   * @param program - The program the shader will use.
   * @param uniforms - Custom uniforms to use to augment the built-in ones.
   */
  constructor(t, e) {
    this.uniformBindCount = 0, this.program = t, e ? e instanceof $t ? this.uniformGroup = e : this.uniformGroup = new $t(e) : this.uniformGroup = new $t({}), this.disposeRunner = new Nt("disposeShader");
  }
  // TODO move to shader system..
  checkUniformExists(t, e) {
    if (e.uniforms[t])
      return !0;
    for (const i in e.uniforms) {
      const s = e.uniforms[i];
      if (s.group === !0 && this.checkUniformExists(t, s))
        return !0;
    }
    return !1;
  }
  destroy() {
    this.uniformGroup = null, this.disposeRunner.emit(this), this.disposeRunner.destroy();
  }
  /**
   * Shader uniform values, shortcut for `uniformGroup.uniforms`.
   * @readonly
   */
  get uniforms() {
    return this.uniformGroup.uniforms;
  }
  /**
   * A short hand function to create a shader based of a vertex and fragment shader.
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param uniforms - Custom uniforms to use to augment the built-in ones.
   * @returns A shiny new PixiJS shader!
   */
  static from(t, e, i) {
    const s = ge.from(t, e);
    return new Ii(s, i);
  }
}
class Sd {
  /**
   * @param vertexSrc - Vertex shader
   * @param fragTemplate - Fragment shader template
   */
  constructor(t, e) {
    if (this.vertexSrc = t, this.fragTemplate = e, this.programCache = {}, this.defaultGroupCache = {}, !e.includes("%count%"))
      throw new Error('Fragment template must contain "%count%".');
    if (!e.includes("%forloop%"))
      throw new Error('Fragment template must contain "%forloop%".');
  }
  generateShader(t) {
    if (!this.programCache[t]) {
      const i = new Int32Array(t);
      for (let n = 0; n < t; n++)
        i[n] = n;
      this.defaultGroupCache[t] = $t.from({ uSamplers: i }, !0);
      let s = this.fragTemplate;
      s = s.replace(/%count%/gi, `${t}`), s = s.replace(/%forloop%/gi, this.generateSampleSrc(t)), this.programCache[t] = new ge(this.vertexSrc, s);
    }
    const e = {
      tint: new Float32Array([1, 1, 1, 1]),
      translationMatrix: new q(),
      default: this.defaultGroupCache[t]
    };
    return new Ii(this.programCache[t], e);
  }
  generateSampleSrc(t) {
    let e = "";
    e += `
`, e += `
`;
    for (let i = 0; i < t; i++)
      i > 0 && (e += `
else `), i < t - 1 && (e += `if(vTextureId < ${i}.5)`), e += `
{`, e += `
	color = texture2D(uSamplers[${i}], vTextureCoord);`, e += `
}`;
    return e += `
`, e += `
`, e;
  }
}
class Cd {
  constructor() {
    this.elements = [], this.ids = [], this.count = 0;
  }
  clear() {
    for (let t = 0; t < this.count; t++)
      this.elements[t] = null;
    this.count = 0;
  }
}
function Md() {
  return !Le.apple.device;
}
function Fd(r) {
  let t = !0;
  const e = L.ADAPTER.getNavigator();
  if (Le.tablet || Le.phone) {
    if (Le.apple.device) {
      const i = e.userAgent.match(/OS (\d+)_(\d+)?/);
      i && parseInt(i[1], 10) < 11 && (t = !1);
    }
    if (Le.android.device) {
      const i = e.userAgent.match(/Android\s([0-9.]*)/);
      i && parseInt(i[1], 10) < 7 && (t = !1);
    }
  }
  return t ? r : 4;
}
class Ta {
  /**
   * @param renderer - The renderer this manager works for.
   */
  constructor(t) {
    this.renderer = t;
  }
  /** Stub method that should be used to empty the current batch by rendering objects now. */
  flush() {
  }
  /** Generic destruction method that frees all resources. This should be called by subclasses. */
  destroy() {
    this.renderer = null;
  }
  /**
   * Stub method that initializes any state required before
   * rendering starts. It is different from the `prerender`
   * signal, which occurs every frame, in that it is called
   * whenever an object requests _this_ renderer specifically.
   */
  start() {
  }
  /** Stops the renderer. It should free up any state and become dormant. */
  stop() {
    this.flush();
  }
  /**
   * Keeps the object to render. It doesn't have to be
   * rendered immediately.
   * @param {PIXI.DisplayObject} _object - The object to render.
   */
  render(t) {
  }
}
var Nd = `varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;
uniform sampler2D uSamplers[%count%];

void main(void){
    vec4 color;
    %forloop%
    gl_FragColor = color * vColor;
}
`, Pd = `precision highp float;
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;
attribute float aTextureId;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform vec4 tint;

varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;

void main(void){
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vTextureId = aTextureId;
    vColor = aColor * tint;
}
`;
const nr = class Ct extends Ta {
  /**
   * This will hook onto the renderer's `contextChange`
   * and `prerender` signals.
   * @param {PIXI.Renderer} renderer - The renderer this works for.
   */
  constructor(t) {
    super(t), this.setShaderGenerator(), this.geometryClass = cd, this.vertexSize = 6, this.state = Je.for2d(), this.size = Ct.defaultBatchSize * 4, this._vertexCount = 0, this._indexCount = 0, this._bufferedElements = [], this._bufferedTextures = [], this._bufferSize = 0, this._shader = null, this._packedGeometries = [], this._packedGeometryPoolSize = 2, this._flushId = 0, this._aBuffers = {}, this._iBuffers = {}, this.maxTextures = 1, this.renderer.on("prerender", this.onPrerender, this), t.runners.contextChange.add(this), this._dcIndex = 0, this._aIndex = 0, this._iIndex = 0, this._attributeBuffer = null, this._indexBuffer = null, this._tempBoundTextures = [];
  }
  /**
   * The maximum textures that this device supports.
   * @static
   * @default 32
   */
  static get defaultMaxTextures() {
    return this._defaultMaxTextures = this._defaultMaxTextures ?? Fd(32), this._defaultMaxTextures;
  }
  static set defaultMaxTextures(t) {
    this._defaultMaxTextures = t;
  }
  /**
   * Can we upload the same buffer in a single frame?
   * @static
   */
  static get canUploadSameBuffer() {
    return this._canUploadSameBuffer = this._canUploadSameBuffer ?? Md(), this._canUploadSameBuffer;
  }
  static set canUploadSameBuffer(t) {
    this._canUploadSameBuffer = t;
  }
  /**
   * @see PIXI.BatchRenderer#maxTextures
   * @deprecated since 7.1.0
   * @readonly
   */
  get MAX_TEXTURES() {
    return O("7.1.0", "BatchRenderer#MAX_TEXTURES renamed to BatchRenderer#maxTextures"), this.maxTextures;
  }
  /**
   * The default vertex shader source
   * @readonly
   */
  static get defaultVertexSrc() {
    return Pd;
  }
  /**
   * The default fragment shader source
   * @readonly
   */
  static get defaultFragmentTemplate() {
    return Nd;
  }
  /**
   * Set the shader generator.
   * @param {object} [options]
   * @param {string} [options.vertex=PIXI.BatchRenderer.defaultVertexSrc] - Vertex shader source
   * @param {string} [options.fragment=PIXI.BatchRenderer.defaultFragmentTemplate] - Fragment shader template
   */
  setShaderGenerator({
    vertex: t = Ct.defaultVertexSrc,
    fragment: e = Ct.defaultFragmentTemplate
  } = {}) {
    this.shaderGenerator = new Sd(t, e);
  }
  /**
   * Handles the `contextChange` signal.
   *
   * It calculates `this.maxTextures` and allocating the packed-geometry object pool.
   */
  contextChange() {
    const t = this.renderer.gl;
    L.PREFER_ENV === Ee.WEBGL_LEGACY ? this.maxTextures = 1 : (this.maxTextures = Math.min(
      t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),
      Ct.defaultMaxTextures
    ), this.maxTextures = id(
      this.maxTextures,
      t
    )), this._shader = this.shaderGenerator.generateShader(this.maxTextures);
    for (let e = 0; e < this._packedGeometryPoolSize; e++)
      this._packedGeometries[e] = new this.geometryClass();
    this.initFlushBuffers();
  }
  /** Makes sure that static and dynamic flush pooled objects have correct dimensions. */
  initFlushBuffers() {
    const {
      _drawCallPool: t,
      _textureArrayPool: e
    } = Ct, i = this.size / 4, s = Math.floor(i / this.maxTextures) + 1;
    for (; t.length < i; )
      t.push(new nd());
    for (; e.length < s; )
      e.push(new Cd());
    for (let n = 0; n < this.maxTextures; n++)
      this._tempBoundTextures[n] = null;
  }
  /** Handles the `prerender` signal. It ensures that flushes start from the first geometry object again. */
  onPrerender() {
    this._flushId = 0;
  }
  /**
   * Buffers the "batchable" object. It need not be rendered immediately.
   * @param {PIXI.DisplayObject} element - the element to render when
   *    using this renderer
   */
  render(t) {
    t._texture.valid && (this._vertexCount + t.vertexData.length / 2 > this.size && this.flush(), this._vertexCount += t.vertexData.length / 2, this._indexCount += t.indices.length, this._bufferedTextures[this._bufferSize] = t._texture.baseTexture, this._bufferedElements[this._bufferSize++] = t);
  }
  buildTexturesAndDrawCalls() {
    const {
      _bufferedTextures: t,
      maxTextures: e
    } = this, i = Ct._textureArrayPool, s = this.renderer.batch, n = this._tempBoundTextures, o = this.renderer.textureGC.count;
    let a = ++D._globalBatch, h = 0, l = i[0], u = 0;
    s.copyBoundTextures(n, e);
    for (let c = 0; c < this._bufferSize; ++c) {
      const d = t[c];
      t[c] = null, d._batchEnabled !== a && (l.count >= e && (s.boundArray(l, n, a, e), this.buildDrawCalls(l, u, c), u = c, l = i[++h], ++a), d._batchEnabled = a, d.touched = o, l.elements[l.count++] = d);
    }
    l.count > 0 && (s.boundArray(l, n, a, e), this.buildDrawCalls(l, u, this._bufferSize), ++h, ++a);
    for (let c = 0; c < n.length; c++)
      n[c] = null;
    D._globalBatch = a;
  }
  /**
   * Populating drawcalls for rendering
   * @param texArray
   * @param start
   * @param finish
   */
  buildDrawCalls(t, e, i) {
    const {
      _bufferedElements: s,
      _attributeBuffer: n,
      _indexBuffer: o,
      vertexSize: a
    } = this, h = Ct._drawCallPool;
    let l = this._dcIndex, u = this._aIndex, c = this._iIndex, d = h[l];
    d.start = this._iIndex, d.texArray = t;
    for (let f = e; f < i; ++f) {
      const p = s[f], v = p._texture.baseTexture, y = Zc[v.alphaMode ? 1 : 0][p.blendMode];
      s[f] = null, e < f && d.blend !== y && (d.size = c - d.start, e = f, d = h[++l], d.texArray = t, d.start = c), this.packInterleavedGeometry(p, n, o, u, c), u += p.vertexData.length / 2 * a, c += p.indices.length, d.blend = y;
    }
    e < i && (d.size = c - d.start, ++l), this._dcIndex = l, this._aIndex = u, this._iIndex = c;
  }
  /**
   * Bind textures for current rendering
   * @param texArray
   */
  bindAndClearTexArray(t) {
    const e = this.renderer.texture;
    for (let i = 0; i < t.count; i++)
      e.bind(t.elements[i], t.ids[i]), t.elements[i] = null;
    t.count = 0;
  }
  updateGeometry() {
    const {
      _packedGeometries: t,
      _attributeBuffer: e,
      _indexBuffer: i
    } = this;
    Ct.canUploadSameBuffer ? (t[this._flushId]._buffer.update(e.rawBinaryData), t[this._flushId]._indexBuffer.update(i), this.renderer.geometry.updateBuffers()) : (this._packedGeometryPoolSize <= this._flushId && (this._packedGeometryPoolSize++, t[this._flushId] = new this.geometryClass()), t[this._flushId]._buffer.update(e.rawBinaryData), t[this._flushId]._indexBuffer.update(i), this.renderer.geometry.bind(t[this._flushId]), this.renderer.geometry.updateBuffers(), this._flushId++);
  }
  drawBatches() {
    const t = this._dcIndex, { gl: e, state: i } = this.renderer, s = Ct._drawCallPool;
    let n = null;
    for (let o = 0; o < t; o++) {
      const { texArray: a, type: h, size: l, start: u, blend: c } = s[o];
      n !== a && (n = a, this.bindAndClearTexArray(a)), this.state.blendMode = c, i.set(this.state), e.drawElements(h, l, e.UNSIGNED_SHORT, u * 2);
    }
  }
  /** Renders the content _now_ and empties the current batch. */
  flush() {
    this._vertexCount !== 0 && (this._attributeBuffer = this.getAttributeBuffer(this._vertexCount), this._indexBuffer = this.getIndexBuffer(this._indexCount), this._aIndex = 0, this._iIndex = 0, this._dcIndex = 0, this.buildTexturesAndDrawCalls(), this.updateGeometry(), this.drawBatches(), this._bufferSize = 0, this._vertexCount = 0, this._indexCount = 0);
  }
  /** Starts a new sprite batch. */
  start() {
    this.renderer.state.set(this.state), this.renderer.texture.ensureSamplerType(this.maxTextures), this.renderer.shader.bind(this._shader), Ct.canUploadSameBuffer && this.renderer.geometry.bind(this._packedGeometries[this._flushId]);
  }
  /** Stops and flushes the current batch. */
  stop() {
    this.flush();
  }
  /** Destroys this `BatchRenderer`. It cannot be used again. */
  destroy() {
    for (let t = 0; t < this._packedGeometryPoolSize; t++)
      this._packedGeometries[t] && this._packedGeometries[t].destroy();
    this.renderer.off("prerender", this.onPrerender, this), this._aBuffers = null, this._iBuffers = null, this._packedGeometries = null, this._attributeBuffer = null, this._indexBuffer = null, this._shader && (this._shader.destroy(), this._shader = null), super.destroy();
  }
  /**
   * Fetches an attribute buffer from `this._aBuffers` that can hold atleast `size` floats.
   * @param size - minimum capacity required
   * @returns - buffer than can hold atleast `size` floats
   */
  getAttributeBuffer(t) {
    const e = li(Math.ceil(t / 8)), i = ro(e), s = e * 8;
    this._aBuffers.length <= i && (this._iBuffers.length = i + 1);
    let n = this._aBuffers[s];
    return n || (this._aBuffers[s] = n = new td(s * this.vertexSize * 4)), n;
  }
  /**
   * Fetches an index buffer from `this._iBuffers` that can
   * have at least `size` capacity.
   * @param size - minimum required capacity
   * @returns - buffer that can fit `size` indices.
   */
  getIndexBuffer(t) {
    const e = li(Math.ceil(t / 12)), i = ro(e), s = e * 12;
    this._iBuffers.length <= i && (this._iBuffers.length = i + 1);
    let n = this._iBuffers[i];
    return n || (this._iBuffers[i] = n = new Uint16Array(s)), n;
  }
  /**
   * Takes the four batching parameters of `element`, interleaves
   * and pushes them into the batching attribute/index buffers given.
   *
   * It uses these properties: `vertexData` `uvs`, `textureId` and
   * `indicies`. It also uses the "tint" of the base-texture, if
   * present.
   * @param {PIXI.DisplayObject} element - element being rendered
   * @param attributeBuffer - attribute buffer.
   * @param indexBuffer - index buffer
   * @param aIndex - number of floats already in the attribute buffer
   * @param iIndex - number of indices already in `indexBuffer`
   */
  packInterleavedGeometry(t, e, i, s, n) {
    const {
      uint32View: o,
      float32View: a
    } = e, h = s / this.vertexSize, l = t.uvs, u = t.indices, c = t.vertexData, d = t._texture.baseTexture._batchLocation, f = Math.min(t.worldAlpha, 1), p = Ei.shared.setValue(t._tintRGB).toPremultiplied(f, t._texture.baseTexture.alphaMode > 0);
    for (let v = 0; v < c.length; v += 2)
      a[s++] = c[v], a[s++] = c[v + 1], a[s++] = l[v], a[s++] = l[v + 1], o[s++] = p, a[s++] = d;
    for (let v = 0; v < u.length; v++)
      i[n++] = h + u[v];
  }
};
nr.defaultBatchSize = 4096, /** @ignore */
nr.extension = {
  name: "batch",
  type: N.RendererPlugin
}, /**
* Pool of `BatchDrawCall` objects that `flush` used
* to create "batches" of the objects being rendered.
*
* These are never re-allocated again.
* Shared between all batch renderers because it can be only one "flush" working at the moment.
* @member {PIXI.BatchDrawCall[]}
*/
nr._drawCallPool = [], /**
* Pool of `BatchDrawCall` objects that `flush` used
* to create "batches" of the objects being rendered.
*
* These are never re-allocated again.
* Shared between all batch renderers because it can be only one "flush" working at the moment.
* @member {PIXI.BatchTextureArray[]}
*/
nr._textureArrayPool = [];
let fe = nr;
B.add(fe);
var Od = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor = texture2D(uSampler, vTextureCoord);
}
`, Ld = `attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`;
const Ns = class or extends Ii {
  /**
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param uniforms - Custom uniforms to use to augment the built-in ones.
   */
  constructor(t, e, i) {
    const s = ge.from(
      t || or.defaultVertexSrc,
      e || or.defaultFragmentSrc
    );
    super(s, i), this.padding = 0, this.resolution = or.defaultResolution, this.multisample = or.defaultMultisample, this.enabled = !0, this.autoFit = !0, this.state = new Je();
  }
  /**
   * Applies the filter
   * @param {PIXI.FilterSystem} filterManager - The renderer to retrieve the filter from
   * @param {PIXI.RenderTexture} input - The input render target.
   * @param {PIXI.RenderTexture} output - The target to output to.
   * @param {PIXI.CLEAR_MODES} [clearMode] - Should the output be cleared before rendering to it.
   * @param {object} [_currentState] - It's current state of filter.
   *        There are some useful properties in the currentState :
   *        target, filters, sourceFrame, destinationFrame, renderTarget, resolution
   */
  apply(t, e, i, s, n) {
    t.applyFilter(this, e, i, s);
  }
  /**
   * Sets the blend mode of the filter.
   * @default PIXI.BLEND_MODES.NORMAL
   */
  get blendMode() {
    return this.state.blendMode;
  }
  set blendMode(t) {
    this.state.blendMode = t;
  }
  /**
   * The resolution of the filter. Setting this to be lower will lower the quality but
   * increase the performance of the filter.
   * If set to `null` or `0`, the resolution of the current render target is used.
   * @default PIXI.Filter.defaultResolution
   */
  get resolution() {
    return this._resolution;
  }
  set resolution(t) {
    this._resolution = t;
  }
  /**
   * The default vertex shader source
   * @readonly
   */
  static get defaultVertexSrc() {
    return Ld;
  }
  /**
   * The default fragment shader source
   * @readonly
   */
  static get defaultFragmentSrc() {
    return Od;
  }
};
Ns.defaultResolution = 1, /**
* Default filter samples for any filter.
* @static
* @type {PIXI.MSAA_QUALITY|null}
* @default PIXI.MSAA_QUALITY.NONE
*/
Ns.defaultMultisample = J.NONE;
let Be = Ns;
class ci {
  constructor() {
    this.clearBeforeRender = !0, this._backgroundColor = new Ei(0), this.alpha = 1;
  }
  /**
   * initiates the background system
   * @param {PIXI.IRendererOptions} options - the options for the background colors
   */
  init(t) {
    this.clearBeforeRender = t.clearBeforeRender;
    const { backgroundColor: e, background: i, backgroundAlpha: s } = t, n = i ?? e;
    n !== void 0 && (this.color = n), this.alpha = s;
  }
  /**
   * The background color to fill if not transparent.
   * @member {PIXI.ColorSource}
   */
  get color() {
    return this._backgroundColor.value;
  }
  set color(t) {
    this._backgroundColor.setValue(t);
  }
  /**
   * The background color alpha. Setting this to 0 will make the canvas transparent.
   * @member {number}
   */
  get alpha() {
    return this._backgroundColor.alpha;
  }
  set alpha(t) {
    this._backgroundColor.setAlpha(t);
  }
  /** The background color object. */
  get backgroundColor() {
    return this._backgroundColor;
  }
  destroy() {
  }
}
ci.defaultOptions = {
  /**
   * {@link PIXI.IRendererOptions.backgroundAlpha}
   * @default 1
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  backgroundAlpha: 1,
  /**
   * {@link PIXI.IRendererOptions.backgroundColor}
   * @default 0x000000
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  backgroundColor: 0,
  /**
   * {@link PIXI.IRendererOptions.clearBeforeRender}
   * @default true
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  clearBeforeRender: !0
}, /** @ignore */
ci.extension = {
  type: [
    N.RendererSystem,
    N.CanvasRendererSystem
  ],
  name: "background"
};
B.add(ci);
class Ea {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(t) {
    this.renderer = t, this.emptyRenderer = new Ta(t), this.currentRenderer = this.emptyRenderer;
  }
  /**
   * Changes the current renderer to the one given in parameter
   * @param objectRenderer - The object renderer to use.
   */
  setObjectRenderer(t) {
    this.currentRenderer !== t && (this.currentRenderer.stop(), this.currentRenderer = t, this.currentRenderer.start());
  }
  /**
   * This should be called if you wish to do some custom rendering
   * It will basically render anything that may be batched up such as sprites
   */
  flush() {
    this.setObjectRenderer(this.emptyRenderer);
  }
  /** Reset the system to an empty renderer */
  reset() {
    this.setObjectRenderer(this.emptyRenderer);
  }
  /**
   * Handy function for batch renderers: copies bound textures in first maxTextures locations to array
   * sets actual _batchLocation for them
   * @param arr - arr copy destination
   * @param maxTextures - number of copied elements
   */
  copyBoundTextures(t, e) {
    const { boundTextures: i } = this.renderer.texture;
    for (let s = e - 1; s >= 0; --s)
      t[s] = i[s] || null, t[s] && (t[s]._batchLocation = s);
  }
  /**
   * Assigns batch locations to textures in array based on boundTextures state.
   * All textures in texArray should have `_batchEnabled = _batchId`,
   * and their count should be less than `maxTextures`.
   * @param texArray - textures to bound
   * @param boundTextures - current state of bound textures
   * @param batchId - marker for _batchEnabled param of textures in texArray
   * @param maxTextures - number of texture locations to manipulate
   */
  boundArray(t, e, i, s) {
    const { elements: n, ids: o, count: a } = t;
    let h = 0;
    for (let l = 0; l < a; l++) {
      const u = n[l], c = u._batchLocation;
      if (c >= 0 && c < s && e[c] === u) {
        o[l] = c;
        continue;
      }
      for (; h < s; ) {
        const d = e[h];
        if (d && d._batchEnabled === i && d._batchLocation === h) {
          h++;
          continue;
        }
        o[l] = h, u._batchLocation = h, e[h] = u;
        break;
      }
    }
  }
  /**
   * @ignore
   */
  destroy() {
    this.renderer = null;
  }
}
Ea.extension = {
  type: N.RendererSystem,
  name: "batch"
};
B.add(Ea);
let co = 0;
class di {
  /** @param renderer - The renderer this System works for. */
  constructor(t) {
    this.renderer = t, this.webGLVersion = 1, this.extensions = {}, this.supports = {
      uint32Indices: !1
    }, this.handleContextLost = this.handleContextLost.bind(this), this.handleContextRestored = this.handleContextRestored.bind(this);
  }
  /**
   * `true` if the context is lost
   * @readonly
   */
  get isLost() {
    return !this.gl || this.gl.isContextLost();
  }
  /**
   * Handles the context change event.
   * @param {WebGLRenderingContext} gl - New WebGL context.
   */
  contextChange(t) {
    this.gl = t, this.renderer.gl = t, this.renderer.CONTEXT_UID = co++;
  }
  init(t) {
    if (t.context)
      this.initFromContext(t.context);
    else {
      const e = this.renderer.background.alpha < 1, i = t.premultipliedAlpha;
      this.preserveDrawingBuffer = t.preserveDrawingBuffer, this.useContextAlpha = t.useContextAlpha, this.powerPreference = t.powerPreference, this.initFromOptions({
        alpha: e,
        premultipliedAlpha: i,
        antialias: t.antialias,
        stencil: !0,
        preserveDrawingBuffer: t.preserveDrawingBuffer,
        powerPreference: t.powerPreference
      });
    }
  }
  /**
   * Initializes the context.
   * @protected
   * @param {WebGLRenderingContext} gl - WebGL context
   */
  initFromContext(t) {
    this.gl = t, this.validateContext(t), this.renderer.gl = t, this.renderer.CONTEXT_UID = co++, this.renderer.runners.contextChange.emit(t);
    const e = this.renderer.view;
    e.addEventListener !== void 0 && (e.addEventListener("webglcontextlost", this.handleContextLost, !1), e.addEventListener("webglcontextrestored", this.handleContextRestored, !1));
  }
  /**
   * Initialize from context options
   * @protected
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
   * @param {object} options - context attributes
   */
  initFromOptions(t) {
    const e = this.createContext(this.renderer.view, t);
    this.initFromContext(e);
  }
  /**
   * Helper class to create a WebGL Context
   * @param canvas - the canvas element that we will get the context from
   * @param options - An options object that gets passed in to the canvas element containing the
   *    context attributes
   * @see https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement/getContext
   * @returns {WebGLRenderingContext} the WebGL context
   */
  createContext(t, e) {
    let i;
    if (L.PREFER_ENV >= Ee.WEBGL2 && (i = t.getContext("webgl2", e)), i)
      this.webGLVersion = 2;
    else if (this.webGLVersion = 1, i = t.getContext("webgl", e) || t.getContext("experimental-webgl", e), !i)
      throw new Error("This browser does not support WebGL. Try using the canvas renderer");
    return this.gl = i, this.getExtensions(), this.gl;
  }
  /** Auto-populate the {@link PIXI.ContextSystem.extensions extensions}. */
  getExtensions() {
    const { gl: t } = this, e = {
      loseContext: t.getExtension("WEBGL_lose_context"),
      anisotropicFiltering: t.getExtension("EXT_texture_filter_anisotropic"),
      floatTextureLinear: t.getExtension("OES_texture_float_linear"),
      s3tc: t.getExtension("WEBGL_compressed_texture_s3tc"),
      s3tc_sRGB: t.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
      // eslint-disable-line camelcase
      etc: t.getExtension("WEBGL_compressed_texture_etc"),
      etc1: t.getExtension("WEBGL_compressed_texture_etc1"),
      pvrtc: t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
      atc: t.getExtension("WEBGL_compressed_texture_atc"),
      astc: t.getExtension("WEBGL_compressed_texture_astc"),
      bptc: t.getExtension("EXT_texture_compression_bptc")
    };
    this.webGLVersion === 1 ? Object.assign(this.extensions, e, {
      drawBuffers: t.getExtension("WEBGL_draw_buffers"),
      depthTexture: t.getExtension("WEBGL_depth_texture"),
      vertexArrayObject: t.getExtension("OES_vertex_array_object") || t.getExtension("MOZ_OES_vertex_array_object") || t.getExtension("WEBKIT_OES_vertex_array_object"),
      uint32ElementIndex: t.getExtension("OES_element_index_uint"),
      // Floats and half-floats
      floatTexture: t.getExtension("OES_texture_float"),
      floatTextureLinear: t.getExtension("OES_texture_float_linear"),
      textureHalfFloat: t.getExtension("OES_texture_half_float"),
      textureHalfFloatLinear: t.getExtension("OES_texture_half_float_linear")
    }) : this.webGLVersion === 2 && Object.assign(this.extensions, e, {
      // Floats and half-floats
      colorBufferFloat: t.getExtension("EXT_color_buffer_float")
    });
  }
  /**
   * Handles a lost webgl context
   * @param {WebGLContextEvent} event - The context lost event.
   */
  handleContextLost(t) {
    t.preventDefault(), setTimeout(() => {
      this.gl.isContextLost() && this.extensions.loseContext && this.extensions.loseContext.restoreContext();
    }, 0);
  }
  /** Handles a restored webgl context. */
  handleContextRestored() {
    this.renderer.runners.contextChange.emit(this.gl);
  }
  destroy() {
    const t = this.renderer.view;
    this.renderer = null, t.removeEventListener !== void 0 && (t.removeEventListener("webglcontextlost", this.handleContextLost), t.removeEventListener("webglcontextrestored", this.handleContextRestored)), this.gl.useProgram(null), this.extensions.loseContext && this.extensions.loseContext.loseContext();
  }
  /** Handle the post-render runner event. */
  postrender() {
    this.renderer.objectRenderer.renderingToScreen && this.gl.flush();
  }
  /**
   * Validate context.
   * @param {WebGLRenderingContext} gl - Render context.
   */
  validateContext(t) {
    const e = t.getContextAttributes(), i = "WebGL2RenderingContext" in globalThis && t instanceof globalThis.WebGL2RenderingContext;
    i && (this.webGLVersion = 2), e && !e.stencil && console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
    const s = i || !!t.getExtension("OES_element_index_uint");
    this.supports.uint32Indices = s, s || console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly");
  }
}
di.defaultOptions = {
  /**
   * {@link PIXI.IRendererOptions.context}
   * @default null
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  context: null,
  /**
   * {@link PIXI.IRendererOptions.antialias}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  antialias: !1,
  /**
   * {@link PIXI.IRendererOptions.premultipliedAlpha}
   * @default true
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  premultipliedAlpha: !0,
  /**
   * {@link PIXI.IRendererOptions.preserveDrawingBuffer}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  preserveDrawingBuffer: !1,
  /**
   * {@link PIXI.IRendererOptions.powerPreference}
   * @default default
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  powerPreference: "default"
}, /** @ignore */
di.extension = {
  type: N.RendererSystem,
  name: "context"
};
B.add(di);
class Ps {
  /**
   * @param width - Width of the frame buffer
   * @param height - Height of the frame buffer
   */
  constructor(t, e) {
    if (this.width = Math.round(t), this.height = Math.round(e), !this.width || !this.height)
      throw new Error("Framebuffer width or height is zero");
    this.stencil = !1, this.depth = !1, this.dirtyId = 0, this.dirtyFormat = 0, this.dirtySize = 0, this.depthTexture = null, this.colorTextures = [], this.glFramebuffers = {}, this.disposeRunner = new Nt("disposeFramebuffer"), this.multisample = J.NONE;
  }
  /**
   * Reference to the colorTexture.
   * @readonly
   */
  get colorTexture() {
    return this.colorTextures[0];
  }
  /**
   * Add texture to the colorTexture array.
   * @param index - Index of the array to add the texture to
   * @param texture - Texture to add to the array
   */
  addColorTexture(t = 0, e) {
    return this.colorTextures[t] = e || new D(null, {
      scaleMode: jt.NEAREST,
      resolution: 1,
      mipmap: be.OFF,
      width: this.width,
      height: this.height
    }), this.dirtyId++, this.dirtyFormat++, this;
  }
  /**
   * Add a depth texture to the frame buffer.
   * @param texture - Texture to add.
   */
  addDepthTexture(t) {
    return this.depthTexture = t || new D(null, {
      scaleMode: jt.NEAREST,
      resolution: 1,
      width: this.width,
      height: this.height,
      mipmap: be.OFF,
      format: x.DEPTH_COMPONENT,
      type: F.UNSIGNED_SHORT
    }), this.dirtyId++, this.dirtyFormat++, this;
  }
  /** Enable depth on the frame buffer. */
  enableDepth() {
    return this.depth = !0, this.dirtyId++, this.dirtyFormat++, this;
  }
  /** Enable stencil on the frame buffer. */
  enableStencil() {
    return this.stencil = !0, this.dirtyId++, this.dirtyFormat++, this;
  }
  /**
   * Resize the frame buffer
   * @param width - Width of the frame buffer to resize to
   * @param height - Height of the frame buffer to resize to
   */
  resize(t, e) {
    if (t = Math.round(t), e = Math.round(e), !t || !e)
      throw new Error("Framebuffer width and height must not be zero");
    if (!(t === this.width && e === this.height)) {
      this.width = t, this.height = e, this.dirtyId++, this.dirtySize++;
      for (let i = 0; i < this.colorTextures.length; i++) {
        const s = this.colorTextures[i], n = s.resolution;
        s.setSize(t / n, e / n);
      }
      if (this.depthTexture) {
        const i = this.depthTexture.resolution;
        this.depthTexture.setSize(t / i, e / i);
      }
    }
  }
  /** Disposes WebGL resources that are connected to this geometry. */
  dispose() {
    this.disposeRunner.emit(this, !1);
  }
  /** Destroys and removes the depth texture added to this framebuffer. */
  destroyDepthTexture() {
    this.depthTexture && (this.depthTexture.destroy(), this.depthTexture = null, ++this.dirtyId, ++this.dirtyFormat);
  }
}
class wa extends D {
  /**
   * @param options
   * @param {number} [options.width=100] - The width of the base render texture.
   * @param {number} [options.height=100] - The height of the base render texture.
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.BaseTexture.defaultOptions.scaleMode] - See {@link PIXI.SCALE_MODES}
   *   for possible values.
   * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio
   *   of the texture being generated.
   * @param {PIXI.MSAA_QUALITY} [options.multisample=PIXI.MSAA_QUALITY.NONE] - The number of samples of the frame buffer.
   */
  constructor(t = {}) {
    if (typeof t == "number") {
      const e = arguments[0], i = arguments[1], s = arguments[2], n = arguments[3];
      t = { width: e, height: i, scaleMode: s, resolution: n };
    }
    t.width = t.width ?? 100, t.height = t.height ?? 100, t.multisample ?? (t.multisample = J.NONE), super(null, t), this.mipmap = be.OFF, this.valid = !0, this._clear = new Ei([0, 0, 0, 0]), this.framebuffer = new Ps(this.realWidth, this.realHeight).addColorTexture(0, this), this.framebuffer.multisample = t.multisample, this.maskStack = [], this.filterStack = [{}];
  }
  /** Color when clearning the texture. */
  set clearColor(t) {
    this._clear.setValue(t);
  }
  get clearColor() {
    return this._clear.value;
  }
  /**
   * Color object when clearning the texture.
   * @readonly
   * @since 7.2.0
   */
  get clear() {
    return this._clear;
  }
  /**
   * Shortcut to `this.framebuffer.multisample`.
   * @default PIXI.MSAA_QUALITY.NONE
   */
  get multisample() {
    return this.framebuffer.multisample;
  }
  set multisample(t) {
    this.framebuffer.multisample = t;
  }
  /**
   * Resizes the BaseRenderTexture.
   * @param desiredWidth - The desired width to resize to.
   * @param desiredHeight - The desired height to resize to.
   */
  resize(t, e) {
    this.framebuffer.resize(t * this.resolution, e * this.resolution), this.setRealSize(this.framebuffer.width, this.framebuffer.height);
  }
  /**
   * Frees the texture and framebuffer from WebGL memory without destroying this texture object.
   * This means you can still use the texture later which will upload it to GPU
   * memory again.
   * @fires PIXI.BaseTexture#dispose
   */
  dispose() {
    this.framebuffer.dispose(), super.dispose();
  }
  /** Destroys this texture. */
  destroy() {
    super.destroy(), this.framebuffer.destroyDepthTexture(), this.framebuffer = null;
  }
}
class Yt extends xr {
  /**
   * @param {PIXI.ImageSourcee} source
   */
  constructor(t) {
    const e = t, i = e.naturalWidth || e.videoWidth || e.displayWidth || e.width, s = e.naturalHeight || e.videoHeight || e.displayHeight || e.height;
    super(i, s), this.source = t, this.noSubImage = !1;
  }
  /**
   * Set cross origin based detecting the url and the crossorigin
   * @param element - Element to apply crossOrigin
   * @param url - URL to check
   * @param crossorigin - Cross origin value to use
   */
  static crossOrigin(t, e, i) {
    i === void 0 && !e.startsWith("data:") ? t.crossOrigin = Qc(e) : i !== !1 && (t.crossOrigin = typeof i == "string" ? i : "anonymous");
  }
  /**
   * Upload the texture to the GPU.
   * @param renderer - Upload to the renderer
   * @param baseTexture - Reference to parent texture
   * @param glTexture
   * @param {PIXI.ImageSourcee} [source] - (optional)
   * @returns - true is success
   */
  upload(t, e, i, s) {
    const n = t.gl, o = e.realWidth, a = e.realHeight;
    if (s = s || this.source, typeof HTMLImageElement < "u" && s instanceof HTMLImageElement) {
      if (!s.complete || s.naturalWidth === 0)
        return !1;
    } else if (typeof HTMLVideoElement < "u" && s instanceof HTMLVideoElement && s.readyState <= 1)
      return !1;
    return n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.alphaMode === we.UNPACK), !this.noSubImage && e.target === n.TEXTURE_2D && i.width === o && i.height === a ? n.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, e.format, i.type, s) : (i.width = o, i.height = a, n.texImage2D(e.target, 0, i.internalFormat, e.format, i.type, s)), !0;
  }
  /**
   * Checks if source width/height was changed, resize can cause extra baseTexture update.
   * Triggers one update in any case.
   */
  update() {
    if (this.destroyed)
      return;
    const t = this.source, e = t.naturalWidth || t.videoWidth || t.width, i = t.naturalHeight || t.videoHeight || t.height;
    this.resize(e, i), super.update();
  }
  /** Destroy this {@link PIXI.BaseImageResource} */
  dispose() {
    this.source = null;
  }
}
class Ia extends Yt {
  /**
   * @param source - image source or URL
   * @param options
   * @param {boolean} [options.autoLoad=true] - start loading process
   * @param {boolean} [options.createBitmap=PIXI.settings.CREATE_IMAGE_BITMAP] - whether its required to create
   *        a bitmap before upload
   * @param {boolean} [options.crossorigin=true] - Load image using cross origin
   * @param {PIXI.ALPHA_MODES} [options.alphaMode=PIXI.ALPHA_MODES.UNPACK] - Premultiply image alpha in bitmap
   */
  constructor(t, e) {
    if (e = e || {}, typeof t == "string") {
      const i = new Image();
      Yt.crossOrigin(i, t, e.crossorigin), i.src = t, t = i;
    }
    super(t), !t.complete && this._width && this._height && (this._width = 0, this._height = 0), this.url = t.src, this._process = null, this.preserveBitmap = !1, this.createBitmap = (e.createBitmap ?? L.CREATE_IMAGE_BITMAP) && !!globalThis.createImageBitmap, this.alphaMode = typeof e.alphaMode == "number" ? e.alphaMode : null, this.bitmap = null, this._load = null, e.autoLoad !== !1 && this.load();
  }
  /**
   * Returns a promise when image will be loaded and processed.
   * @param createBitmap - whether process image into bitmap
   */
  load(t) {
    return this._load ? this._load : (t !== void 0 && (this.createBitmap = t), this._load = new Promise((e, i) => {
      const s = this.source;
      this.url = s.src;
      const n = () => {
        this.destroyed || (s.onload = null, s.onerror = null, this.update(), this._load = null, this.createBitmap ? e(this.process()) : e(this));
      };
      s.complete && s.src ? n() : (s.onload = n, s.onerror = (o) => {
        i(o), this.onError.emit(o);
      });
    }), this._load);
  }
  /**
   * Called when we need to convert image into BitmapImage.
   * Can be called multiple times, real promise is cached inside.
   * @returns - Cached promise to fill that bitmap
   */
  process() {
    const t = this.source;
    if (this._process !== null)
      return this._process;
    if (this.bitmap !== null || !globalThis.createImageBitmap)
      return Promise.resolve(this);
    const e = globalThis.createImageBitmap, i = !t.crossOrigin || t.crossOrigin === "anonymous";
    return this._process = fetch(
      t.src,
      {
        mode: i ? "cors" : "no-cors"
      }
    ).then((s) => s.blob()).then((s) => e(
      s,
      0,
      0,
      t.width,
      t.height,
      {
        premultiplyAlpha: this.alphaMode === null || this.alphaMode === we.UNPACK ? "premultiply" : "none"
      }
    )).then((s) => this.destroyed ? Promise.reject() : (this.bitmap = s, this.update(), this._process = null, Promise.resolve(this))), this._process;
  }
  /**
   * Upload the image resource to GPU.
   * @param renderer - Renderer to upload to
   * @param baseTexture - BaseTexture for this resource
   * @param glTexture - GLTexture to use
   * @returns {boolean} true is success
   */
  upload(t, e, i) {
    if (typeof this.alphaMode == "number" && (e.alphaMode = this.alphaMode), !this.createBitmap)
      return super.upload(t, e, i);
    if (!this.bitmap && (this.process(), !this.bitmap))
      return !1;
    if (super.upload(t, e, i, this.bitmap), !this.preserveBitmap) {
      let s = !0;
      const n = e._glTextures;
      for (const o in n) {
        const a = n[o];
        if (a !== i && a.dirtyId !== e.dirtyId) {
          s = !1;
          break;
        }
      }
      s && (this.bitmap.close && this.bitmap.close(), this.bitmap = null);
    }
    return !0;
  }
  /** Destroys this resource. */
  dispose() {
    this.source.onload = null, this.source.onerror = null, super.dispose(), this.bitmap && (this.bitmap.close(), this.bitmap = null), this._process = null, this._load = null;
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if current environment support HTMLImageElement, and source is string or HTMLImageElement
   */
  static test(t) {
    return typeof HTMLImageElement < "u" && (typeof t == "string" || t instanceof HTMLImageElement);
  }
}
class tn {
  constructor() {
    this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsFloat32 = new Float32Array(8);
  }
  /**
   * Sets the texture Uvs based on the given frame information.
   * @protected
   * @param frame - The frame of the texture
   * @param baseFrame - The base frame of the texture
   * @param rotate - Rotation of frame, see {@link PIXI.groupD8}
   */
  set(t, e, i) {
    const s = e.width, n = e.height;
    if (i) {
      const o = t.width / 2 / s, a = t.height / 2 / n, h = t.x / s + o, l = t.y / n + a;
      i = V.add(i, V.NW), this.x0 = h + o * V.uX(i), this.y0 = l + a * V.uY(i), i = V.add(i, 2), this.x1 = h + o * V.uX(i), this.y1 = l + a * V.uY(i), i = V.add(i, 2), this.x2 = h + o * V.uX(i), this.y2 = l + a * V.uY(i), i = V.add(i, 2), this.x3 = h + o * V.uX(i), this.y3 = l + a * V.uY(i);
    } else
      this.x0 = t.x / s, this.y0 = t.y / n, this.x1 = (t.x + t.width) / s, this.y1 = t.y / n, this.x2 = (t.x + t.width) / s, this.y2 = (t.y + t.height) / n, this.x3 = t.x / s, this.y3 = (t.y + t.height) / n;
    this.uvsFloat32[0] = this.x0, this.uvsFloat32[1] = this.y0, this.uvsFloat32[2] = this.x1, this.uvsFloat32[3] = this.y1, this.uvsFloat32[4] = this.x2, this.uvsFloat32[5] = this.y2, this.uvsFloat32[6] = this.x3, this.uvsFloat32[7] = this.y3;
  }
}
tn.prototype.toString = function() {
  return `[@pixi/core:TextureUvs x0=${this.x0} y0=${this.y0} x1=${this.x1} y1=${this.y1} x2=${this.x2} y2=${this.y2} x3=${this.x3} y3=${this.y3}]`;
};
const fo = new tn();
function Gr(r) {
  r.destroy = function() {
  }, r.on = function() {
  }, r.once = function() {
  }, r.emit = function() {
  };
}
class G extends Ie {
  /**
   * @param baseTexture - The base texture source to create the texture from
   * @param frame - The rectangle frame of the texture to show
   * @param orig - The area of original texture
   * @param trim - Trimmed rectangle of original texture
   * @param rotate - indicates how the texture was rotated by texture packer. See {@link PIXI.groupD8}
   * @param anchor - Default anchor point used for sprite placement / rotation
   * @param borders - Default borders used for 9-slice scaling. See {@link PIXI.NineSlicePlane}
   */
  constructor(t, e, i, s, n, o, a) {
    if (super(), this.noFrame = !1, e || (this.noFrame = !0, e = new H(0, 0, 1, 1)), t instanceof G && (t = t.baseTexture), this.baseTexture = t, this._frame = e, this.trim = s, this.valid = !1, this.destroyed = !1, this._uvs = fo, this.uvMatrix = null, this.orig = i || e, this._rotate = Number(n || 0), n === !0)
      this._rotate = 2;
    else if (this._rotate % 2 !== 0)
      throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
    this.defaultAnchor = o ? new ht(o.x, o.y) : new ht(0, 0), this.defaultBorders = a, this._updateID = 0, this.textureCacheIds = [], t.valid ? this.noFrame ? t.valid && this.onBaseTextureUpdated(t) : this.frame = e : t.once("loaded", this.onBaseTextureUpdated, this), this.noFrame && t.on("update", this.onBaseTextureUpdated, this);
  }
  /**
   * Updates this texture on the gpu.
   *
   * Calls the TextureResource update.
   *
   * If you adjusted `frame` manually, please call `updateUvs()` instead.
   */
  update() {
    this.baseTexture.resource && this.baseTexture.resource.update();
  }
  /**
   * Called when the base texture is updated
   * @protected
   * @param baseTexture - The base texture.
   */
  onBaseTextureUpdated(t) {
    if (this.noFrame) {
      if (!this.baseTexture.valid)
        return;
      this._frame.width = t.width, this._frame.height = t.height, this.valid = !0, this.updateUvs();
    } else
      this.frame = this._frame;
    this.emit("update", this);
  }
  /**
   * Destroys this texture
   * @param [destroyBase=false] - Whether to destroy the base texture as well
   * @fires PIXI.Texture#destroyed
   */
  destroy(t) {
    if (this.baseTexture) {
      if (t) {
        const { resource: e } = this.baseTexture;
        e != null && e.url && Bt[e.url] && G.removeFromCache(e.url), this.baseTexture.destroy();
      }
      this.baseTexture.off("loaded", this.onBaseTextureUpdated, this), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture = null;
    }
    this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, G.removeFromCache(this), this.textureCacheIds = null, this.destroyed = !0, this.emit("destroyed", this), this.removeAllListeners();
  }
  /**
   * Creates a new texture object that acts the same as this one.
   * @returns - The new texture
   */
  clone() {
    var s;
    const t = this._frame.clone(), e = this._frame === this.orig ? t : this.orig.clone(), i = new G(
      this.baseTexture,
      !this.noFrame && t,
      e,
      (s = this.trim) == null ? void 0 : s.clone(),
      this.rotate,
      this.defaultAnchor,
      this.defaultBorders
    );
    return this.noFrame && (i._frame = t), i;
  }
  /**
   * Updates the internal WebGL UV cache. Use it after you change `frame` or `trim` of the texture.
   * Call it after changing the frame
   */
  updateUvs() {
    this._uvs === fo && (this._uvs = new tn()), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++;
  }
  /**
   * Helper function that creates a new Texture based on the source you provide.
   * The source can be - frame id, image url, video url, canvas element, video element, base texture
   * @param {string|PIXI.BaseTexture|HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas} source -
   *        Source or array of sources to create texture from
   * @param options - See {@link PIXI.BaseTexture}'s constructor for options.
   * @param {string} [options.pixiIdPrefix=pixiid] - If a source has no id, this is the prefix of the generated id
   * @param {boolean} [strict] - Enforce strict-mode, see {@link PIXI.settings.STRICT_TEXTURE_CACHE}.
   * @returns {PIXI.Texture} The newly created texture
   */
  static from(t, e = {}, i = L.STRICT_TEXTURE_CACHE) {
    const s = typeof t == "string";
    let n = null;
    if (s)
      n = t;
    else if (t instanceof D) {
      if (!t.cacheId) {
        const a = (e == null ? void 0 : e.pixiIdPrefix) || "pixiid";
        t.cacheId = `${a}-${_r()}`, D.addToCache(t, t.cacheId);
      }
      n = t.cacheId;
    } else {
      if (!t._pixiId) {
        const a = (e == null ? void 0 : e.pixiIdPrefix) || "pixiid";
        t._pixiId = `${a}_${_r()}`;
      }
      n = t._pixiId;
    }
    let o = Bt[n];
    if (s && i && !o)
      throw new Error(`The cacheId "${n}" does not exist in TextureCache.`);
    return !o && !(t instanceof D) ? (e.resolution || (e.resolution = so(t)), o = new G(new D(t, e)), o.baseTexture.cacheId = n, D.addToCache(o.baseTexture, n), G.addToCache(o, n)) : !o && t instanceof D && (o = new G(t), G.addToCache(o, n)), o;
  }
  /**
   * Useful for loading textures via URLs. Use instead of `Texture.from` because
   * it does a better job of handling failed URLs more effectively. This also ignores
   * `PIXI.settings.STRICT_TEXTURE_CACHE`. Works for Videos, SVGs, Images.
   * @param url - The remote URL or array of URLs to load.
   * @param options - Optional options to include
   * @returns - A Promise that resolves to a Texture.
   */
  static fromURL(t, e) {
    const i = Object.assign({ autoLoad: !1 }, e == null ? void 0 : e.resourceOptions), s = G.from(t, Object.assign({ resourceOptions: i }, e), !1), n = s.baseTexture.resource;
    return s.baseTexture.valid ? Promise.resolve(s) : n.load().then(() => Promise.resolve(s));
  }
  /**
   * Create a new Texture with a BufferResource from a typed array.
   * @param buffer - The optional array to use. If no data is provided, a new Float32Array is created.
   * @param width - Width of the resource
   * @param height - Height of the resource
   * @param options - See {@link PIXI.BaseTexture}'s constructor for options.
   *        Default properties are different from the constructor's defaults.
   * @param {PIXI.FORMATS} [options.format] - The format is not given, the type is inferred from the
   *        type of the buffer: `RGBA` if Float32Array, Int8Array, Uint8Array, or Uint8ClampedArray,
   *        otherwise `RGBA_INTEGER`.
   * @param {PIXI.TYPES} [options.type] - The type is not given, the type is inferred from the
   *        type of the buffer. Maps Float32Array to `FLOAT`, Int32Array to `INT`, Uint32Array to
   *        `UNSIGNED_INT`, Int16Array to `SHORT`, Uint16Array to `UNSIGNED_SHORT`, Int8Array to `BYTE`,
   *        Uint8Array/Uint8ClampedArray to `UNSIGNED_BYTE`.
   * @param {PIXI.ALPHA_MODES} [options.alphaMode=PIXI.ALPHA_MODES.NPM]
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.SCALE_MODES.NEAREST]
   * @returns - The resulting new BaseTexture
   */
  static fromBuffer(t, e, i, s) {
    return new G(D.fromBuffer(t, e, i, s));
  }
  /**
   * Create a texture from a source and add to the cache.
   * @param {HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas|string} source - The input source.
   * @param imageUrl - File name of texture, for cache and resolving resolution.
   * @param name - Human readable name for the texture cache. If no name is
   *        specified, only `imageUrl` will be used as the cache ID.
   * @param options
   * @returns - Output texture
   */
  static fromLoader(t, e, i, s) {
    const n = new D(t, Object.assign({
      scaleMode: D.defaultOptions.scaleMode,
      resolution: so(e)
    }, s)), { resource: o } = n;
    o instanceof Ia && (o.url = e);
    const a = new G(n);
    return i || (i = e), D.addToCache(a.baseTexture, i), G.addToCache(a, i), i !== e && (D.addToCache(a.baseTexture, e), G.addToCache(a, e)), a.baseTexture.valid ? Promise.resolve(a) : new Promise((h) => {
      a.baseTexture.once("loaded", () => h(a));
    });
  }
  /**
   * Adds a Texture to the global TextureCache. This cache is shared across the whole PIXI object.
   * @param texture - The Texture to add to the cache.
   * @param id - The id that the Texture will be stored against.
   */
  static addToCache(t, e) {
    e && (t.textureCacheIds.includes(e) || t.textureCacheIds.push(e), Bt[e] && Bt[e] !== t && console.warn(`Texture added to the cache with an id [${e}] that already had an entry`), Bt[e] = t);
  }
  /**
   * Remove a Texture from the global TextureCache.
   * @param texture - id of a Texture to be removed, or a Texture instance itself
   * @returns - The Texture that was removed
   */
  static removeFromCache(t) {
    if (typeof t == "string") {
      const e = Bt[t];
      if (e) {
        const i = e.textureCacheIds.indexOf(t);
        return i > -1 && e.textureCacheIds.splice(i, 1), delete Bt[t], e;
      }
    } else if (t != null && t.textureCacheIds) {
      for (let e = 0; e < t.textureCacheIds.length; ++e)
        Bt[t.textureCacheIds[e]] === t && delete Bt[t.textureCacheIds[e]];
      return t.textureCacheIds.length = 0, t;
    }
    return null;
  }
  /**
   * Returns resolution of baseTexture
   * @readonly
   */
  get resolution() {
    return this.baseTexture.resolution;
  }
  /**
   * The frame specifies the region of the base texture that this texture uses.
   * Please call `updateUvs()` after you change coordinates of `frame` manually.
   */
  get frame() {
    return this._frame;
  }
  set frame(t) {
    this._frame = t, this.noFrame = !1;
    const { x: e, y: i, width: s, height: n } = t, o = e + s > this.baseTexture.width, a = i + n > this.baseTexture.height;
    if (o || a) {
      const h = o && a ? "and" : "or", l = `X: ${e} + ${s} = ${e + s} > ${this.baseTexture.width}`, u = `Y: ${i} + ${n} = ${i + n} > ${this.baseTexture.height}`;
      throw new Error(`Texture Error: frame does not fit inside the base Texture dimensions: ${l} ${h} ${u}`);
    }
    this.valid = s && n && this.baseTexture.valid, !this.trim && !this.rotate && (this.orig = t), this.valid && this.updateUvs();
  }
  /**
   * Indicates whether the texture is rotated inside the atlas
   * set to 2 to compensate for texture packer rotation
   * set to 6 to compensate for spine packer rotation
   * can be used to rotate or mirror sprites
   * See {@link PIXI.groupD8} for explanation
   */
  get rotate() {
    return this._rotate;
  }
  set rotate(t) {
    this._rotate = t, this.valid && this.updateUvs();
  }
  /** The width of the Texture in pixels. */
  get width() {
    return this.orig.width;
  }
  /** The height of the Texture in pixels. */
  get height() {
    return this.orig.height;
  }
  /** Utility function for BaseTexture|Texture cast. */
  castToBaseTexture() {
    return this.baseTexture;
  }
  /** An empty texture, used often to not have to create multiple empty textures. Can not be destroyed. */
  static get EMPTY() {
    return G._EMPTY || (G._EMPTY = new G(new D()), Gr(G._EMPTY), Gr(G._EMPTY.baseTexture)), G._EMPTY;
  }
  /** A white texture of 16x16 size, used for graphics and other things Can not be destroyed. */
  static get WHITE() {
    if (!G._WHITE) {
      const t = L.ADAPTER.createCanvas(16, 16), e = t.getContext("2d");
      t.width = 16, t.height = 16, e.fillStyle = "white", e.fillRect(0, 0, 16, 16), G._WHITE = new G(D.from(t)), Gr(G._WHITE), Gr(G._WHITE.baseTexture);
    }
    return G._WHITE;
  }
}
class Ai extends G {
  /**
   * @param baseRenderTexture - The base texture object that this texture uses.
   * @param frame - The rectangle frame of the texture to show.
   */
  constructor(t, e) {
    super(t, e), this.valid = !0, this.filterFrame = null, this.filterPoolKey = null, this.updateUvs();
  }
  /**
   * Shortcut to `this.baseTexture.framebuffer`, saves baseTexture cast.
   * @readonly
   */
  get framebuffer() {
    return this.baseTexture.framebuffer;
  }
  /**
   * Shortcut to `this.framebuffer.multisample`.
   * @default PIXI.MSAA_QUALITY.NONE
   */
  get multisample() {
    return this.framebuffer.multisample;
  }
  set multisample(t) {
    this.framebuffer.multisample = t;
  }
  /**
   * Resizes the RenderTexture.
   * @param desiredWidth - The desired width to resize to.
   * @param desiredHeight - The desired height to resize to.
   * @param resizeBaseTexture - Should the baseTexture.width and height values be resized as well?
   */
  resize(t, e, i = !0) {
    const s = this.baseTexture.resolution, n = Math.round(t * s) / s, o = Math.round(e * s) / s;
    this.valid = n > 0 && o > 0, this._frame.width = this.orig.width = n, this._frame.height = this.orig.height = o, i && this.baseTexture.resize(n, o), this.updateUvs();
  }
  /**
   * Changes the resolution of baseTexture, but does not change framebuffer size.
   * @param resolution - The new resolution to apply to RenderTexture
   */
  setResolution(t) {
    const { baseTexture: e } = this;
    e.resolution !== t && (e.setResolution(t), this.resize(e.width, e.height, !1));
  }
  /**
   * A short hand way of creating a render texture.
   * @param options - Options
   * @param {number} [options.width=100] - The width of the render texture
   * @param {number} [options.height=100] - The height of the render texture
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.BaseTexture.defaultOptions.scaleMode] - See {@link PIXI.SCALE_MODES}
   *    for possible values
   * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio of the texture
   *    being generated
   * @param {PIXI.MSAA_QUALITY} [options.multisample=PIXI.MSAA_QUALITY.NONE] - The number of samples of the frame buffer
   * @returns The new render texture
   */
  static create(t) {
    return new Ai(new wa(t));
  }
}
class Aa {
  /**
   * @param textureOptions - options that will be passed to BaseRenderTexture constructor
   * @param {PIXI.SCALE_MODES} [textureOptions.scaleMode] - See {@link PIXI.SCALE_MODES} for possible values.
   */
  constructor(t) {
    this.texturePool = {}, this.textureOptions = t || {}, this.enableFullScreen = !1, this._pixelsWidth = 0, this._pixelsHeight = 0;
  }
  /**
   * Creates texture with params that were specified in pool constructor.
   * @param realWidth - Width of texture in pixels.
   * @param realHeight - Height of texture in pixels.
   * @param multisample - Number of samples of the framebuffer.
   */
  createTexture(t, e, i = J.NONE) {
    const s = new wa(Object.assign({
      width: t,
      height: e,
      resolution: 1,
      multisample: i
    }, this.textureOptions));
    return new Ai(s);
  }
  /**
   * Gets a Power-of-Two render texture or fullScreen texture
   * @param minWidth - The minimum width of the render texture.
   * @param minHeight - The minimum height of the render texture.
   * @param resolution - The resolution of the render texture.
   * @param multisample - Number of samples of the render texture.
   * @returns The new render texture.
   */
  getOptimalTexture(t, e, i = 1, s = J.NONE) {
    let n;
    t = Math.max(Math.ceil(t * i - 1e-6), 1), e = Math.max(Math.ceil(e * i - 1e-6), 1), !this.enableFullScreen || t !== this._pixelsWidth || e !== this._pixelsHeight ? (t = li(t), e = li(e), n = ((t & 65535) << 16 | e & 65535) >>> 0, s > 1 && (n += s * 4294967296)) : n = s > 1 ? -s : -1, this.texturePool[n] || (this.texturePool[n] = []);
    let o = this.texturePool[n].pop();
    return o || (o = this.createTexture(t, e, s)), o.filterPoolKey = n, o.setResolution(i), o;
  }
  /**
   * Gets extra texture of the same size as input renderTexture
   *
   * `getFilterTexture(input, 0.5)` or `getFilterTexture(0.5, input)`
   * @param input - renderTexture from which size and resolution will be copied
   * @param resolution - override resolution of the renderTexture
   *  It overrides, it does not multiply
   * @param multisample - number of samples of the renderTexture
   */
  getFilterTexture(t, e, i) {
    const s = this.getOptimalTexture(
      t.width,
      t.height,
      e || t.resolution,
      i || J.NONE
    );
    return s.filterFrame = t.filterFrame, s;
  }
  /**
   * Place a render texture back into the pool.
   * @param renderTexture - The renderTexture to free
   */
  returnTexture(t) {
    const e = t.filterPoolKey;
    t.filterFrame = null, this.texturePool[e].push(t);
  }
  /**
   * Alias for returnTexture, to be compliant with FilterSystem interface.
   * @param renderTexture - The renderTexture to free
   */
  returnFilterTexture(t) {
    this.returnTexture(t);
  }
  /**
   * Clears the pool.
   * @param destroyTextures - Destroy all stored textures.
   */
  clear(t) {
    if (t = t !== !1, t)
      for (const e in this.texturePool) {
        const i = this.texturePool[e];
        if (i)
          for (let s = 0; s < i.length; s++)
            i[s].destroy(!0);
      }
    this.texturePool = {};
  }
  /**
   * If screen size was changed, drops all screen-sized textures,
   * sets new screen size, sets `enableFullScreen` to true
   *
   * Size is measured in pixels, `renderer.view` can be passed here, not `renderer.screen`
   * @param size - Initial size of screen.
   */
  setScreenSize(t) {
    if (!(t.width === this._pixelsWidth && t.height === this._pixelsHeight)) {
      this.enableFullScreen = t.width > 0 && t.height > 0;
      for (const e in this.texturePool) {
        if (!(Number(e) < 0))
          continue;
        const i = this.texturePool[e];
        if (i)
          for (let s = 0; s < i.length; s++)
            i[s].destroy(!0);
        this.texturePool[e] = [];
      }
      this._pixelsWidth = t.width, this._pixelsHeight = t.height;
    }
  }
}
Aa.SCREEN_KEY = -1;
class Ud extends ze {
  constructor() {
    super(), this.addAttribute("aVertexPosition", new Float32Array([
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1
    ])).addIndex([0, 1, 3, 2]);
  }
}
class Bd extends ze {
  constructor() {
    super(), this.vertices = new Float32Array([
      -1,
      -1,
      1,
      -1,
      1,
      1,
      -1,
      1
    ]), this.uvs = new Float32Array([
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1
    ]), this.vertexBuffer = new yt(this.vertices), this.uvBuffer = new yt(this.uvs), this.addAttribute("aVertexPosition", this.vertexBuffer).addAttribute("aTextureCoord", this.uvBuffer).addIndex([0, 1, 2, 0, 2, 3]);
  }
  /**
   * Maps two Rectangle to the quad.
   * @param targetTextureFrame - The first rectangle
   * @param destinationFrame - The second rectangle
   * @returns - Returns itself.
   */
  map(t, e) {
    let i = 0, s = 0;
    return this.uvs[0] = i, this.uvs[1] = s, this.uvs[2] = i + e.width / t.width, this.uvs[3] = s, this.uvs[4] = i + e.width / t.width, this.uvs[5] = s + e.height / t.height, this.uvs[6] = i, this.uvs[7] = s + e.height / t.height, i = e.x, s = e.y, this.vertices[0] = i, this.vertices[1] = s, this.vertices[2] = i + e.width, this.vertices[3] = s, this.vertices[4] = i + e.width, this.vertices[5] = s + e.height, this.vertices[6] = i, this.vertices[7] = s + e.height, this.invalidate(), this;
  }
  /**
   * Legacy upload method, just marks buffers dirty.
   * @returns - Returns itself.
   */
  invalidate() {
    return this.vertexBuffer._updateID++, this.uvBuffer._updateID++, this;
  }
}
class kd {
  constructor() {
    this.renderTexture = null, this.target = null, this.legacy = !1, this.resolution = 1, this.multisample = J.NONE, this.sourceFrame = new H(), this.destinationFrame = new H(), this.bindingSourceFrame = new H(), this.bindingDestinationFrame = new H(), this.filters = [], this.transform = null;
  }
  /** Clears the state */
  clear() {
    this.target = null, this.filters = null, this.renderTexture = null;
  }
}
const Dr = [new ht(), new ht(), new ht(), new ht()], is = new q();
class Ra {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(t) {
    this.renderer = t, this.defaultFilterStack = [{}], this.texturePool = new Aa(), this.statePool = [], this.quad = new Ud(), this.quadUv = new Bd(), this.tempRect = new H(), this.activeState = {}, this.globalUniforms = new $t({
      outputFrame: new H(),
      inputSize: new Float32Array(4),
      inputPixel: new Float32Array(4),
      inputClamp: new Float32Array(4),
      resolution: 1,
      // legacy variables
      filterArea: new Float32Array(4),
      filterClamp: new Float32Array(4)
    }, !0), this.forceClear = !1, this.useMaxPadding = !1;
  }
  init() {
    this.texturePool.setScreenSize(this.renderer.view);
  }
  /**
   * Pushes a set of filters to be applied later to the system. This will redirect further rendering into an
   * input render-texture for the rest of the filtering pipeline.
   * @param {PIXI.DisplayObject} target - The target of the filter to render.
   * @param filters - The filters to apply.
   */
  push(t, e) {
    const i = this.renderer, s = this.defaultFilterStack, n = this.statePool.pop() || new kd(), o = i.renderTexture;
    let a, h;
    if (o.current) {
      const y = o.current;
      a = y.resolution, h = y.multisample;
    } else
      a = i.resolution, h = i.multisample;
    let l = e[0].resolution || a, u = e[0].multisample ?? h, c = e[0].padding, d = e[0].autoFit, f = e[0].legacy ?? !0;
    for (let y = 1; y < e.length; y++) {
      const E = e[y];
      l = Math.min(l, E.resolution || a), u = Math.min(u, E.multisample ?? h), c = this.useMaxPadding ? Math.max(c, E.padding) : c + E.padding, d = d && E.autoFit, f = f || (E.legacy ?? !0);
    }
    s.length === 1 && (this.defaultFilterStack[0].renderTexture = o.current), s.push(n), n.resolution = l, n.multisample = u, n.legacy = f, n.target = t, n.sourceFrame.copyFrom(t.filterArea || t.getBounds(!0)), n.sourceFrame.pad(c);
    const p = this.tempRect.copyFrom(o.sourceFrame);
    i.projection.transform && this.transformAABB(
      is.copyFrom(i.projection.transform).invert(),
      p
    ), d ? (n.sourceFrame.fit(p), (n.sourceFrame.width <= 0 || n.sourceFrame.height <= 0) && (n.sourceFrame.width = 0, n.sourceFrame.height = 0)) : n.sourceFrame.intersects(p) || (n.sourceFrame.width = 0, n.sourceFrame.height = 0), this.roundFrame(
      n.sourceFrame,
      o.current ? o.current.resolution : i.resolution,
      o.sourceFrame,
      o.destinationFrame,
      i.projection.transform
    ), n.renderTexture = this.getOptimalFilterTexture(
      n.sourceFrame.width,
      n.sourceFrame.height,
      l,
      u
    ), n.filters = e, n.destinationFrame.width = n.renderTexture.width, n.destinationFrame.height = n.renderTexture.height;
    const v = this.tempRect;
    v.x = 0, v.y = 0, v.width = n.sourceFrame.width, v.height = n.sourceFrame.height, n.renderTexture.filterFrame = n.sourceFrame, n.bindingSourceFrame.copyFrom(o.sourceFrame), n.bindingDestinationFrame.copyFrom(o.destinationFrame), n.transform = i.projection.transform, i.projection.transform = null, o.bind(n.renderTexture, n.sourceFrame, v), i.framebuffer.clear(0, 0, 0, 0);
  }
  /** Pops off the filter and applies it. */
  pop() {
    const t = this.defaultFilterStack, e = t.pop(), i = e.filters;
    this.activeState = e;
    const s = this.globalUniforms.uniforms;
    s.outputFrame = e.sourceFrame, s.resolution = e.resolution;
    const n = s.inputSize, o = s.inputPixel, a = s.inputClamp;
    if (n[0] = e.destinationFrame.width, n[1] = e.destinationFrame.height, n[2] = 1 / n[0], n[3] = 1 / n[1], o[0] = Math.round(n[0] * e.resolution), o[1] = Math.round(n[1] * e.resolution), o[2] = 1 / o[0], o[3] = 1 / o[1], a[0] = 0.5 * o[2], a[1] = 0.5 * o[3], a[2] = e.sourceFrame.width * n[2] - 0.5 * o[2], a[3] = e.sourceFrame.height * n[3] - 0.5 * o[3], e.legacy) {
      const l = s.filterArea;
      l[0] = e.destinationFrame.width, l[1] = e.destinationFrame.height, l[2] = e.sourceFrame.x, l[3] = e.sourceFrame.y, s.filterClamp = s.inputClamp;
    }
    this.globalUniforms.update();
    const h = t[t.length - 1];
    if (this.renderer.framebuffer.blit(), i.length === 1)
      i[0].apply(this, e.renderTexture, h.renderTexture, he.BLEND, e), this.returnFilterTexture(e.renderTexture);
    else {
      let l = e.renderTexture, u = this.getOptimalFilterTexture(
        l.width,
        l.height,
        e.resolution
      );
      u.filterFrame = l.filterFrame;
      let c = 0;
      for (c = 0; c < i.length - 1; ++c) {
        c === 1 && e.multisample > 1 && (u = this.getOptimalFilterTexture(
          l.width,
          l.height,
          e.resolution
        ), u.filterFrame = l.filterFrame), i[c].apply(this, l, u, he.CLEAR, e);
        const d = l;
        l = u, u = d;
      }
      i[c].apply(this, l, h.renderTexture, he.BLEND, e), c > 1 && e.multisample > 1 && this.returnFilterTexture(e.renderTexture), this.returnFilterTexture(l), this.returnFilterTexture(u);
    }
    e.clear(), this.statePool.push(e);
  }
  /**
   * Binds a renderTexture with corresponding `filterFrame`, clears it if mode corresponds.
   * @param filterTexture - renderTexture to bind, should belong to filter pool or filter stack
   * @param clearMode - clearMode, by default its CLEAR/YES. See {@link PIXI.CLEAR_MODES}
   */
  bindAndClear(t, e = he.CLEAR) {
    const {
      renderTexture: i,
      state: s
    } = this.renderer;
    if (t === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.projection.transform = this.activeState.transform : this.renderer.projection.transform = null, t == null ? void 0 : t.filterFrame) {
      const o = this.tempRect;
      o.x = 0, o.y = 0, o.width = t.filterFrame.width, o.height = t.filterFrame.height, i.bind(t, t.filterFrame, o);
    } else
      t !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? i.bind(t) : this.renderer.renderTexture.bind(
        t,
        this.activeState.bindingSourceFrame,
        this.activeState.bindingDestinationFrame
      );
    const n = s.stateId & 1 || this.forceClear;
    (e === he.CLEAR || e === he.BLIT && n) && this.renderer.framebuffer.clear(0, 0, 0, 0);
  }
  /**
   * Draws a filter using the default rendering process.
   *
   * This should be called only by {@link PIXI.Filter#apply}.
   * @param filter - The filter to draw.
   * @param input - The input render target.
   * @param output - The target to output to.
   * @param clearMode - Should the output be cleared before rendering to it
   */
  applyFilter(t, e, i, s) {
    const n = this.renderer;
    n.state.set(t.state), this.bindAndClear(i, s), t.uniforms.uSampler = e, t.uniforms.filterGlobals = this.globalUniforms, n.shader.bind(t), t.legacy = !!t.program.attributeData.aTextureCoord, t.legacy ? (this.quadUv.map(e._frame, e.filterFrame), n.geometry.bind(this.quadUv), n.geometry.draw(ii.TRIANGLES)) : (n.geometry.bind(this.quad), n.geometry.draw(ii.TRIANGLE_STRIP));
  }
  /**
   * Multiply _input normalized coordinates_ to this matrix to get _sprite texture normalized coordinates_.
   *
   * Use `outputMatrix * vTextureCoord` in the shader.
   * @param outputMatrix - The matrix to output to.
   * @param {PIXI.Sprite} sprite - The sprite to map to.
   * @returns The mapped matrix.
   */
  calculateSpriteMatrix(t, e) {
    const { sourceFrame: i, destinationFrame: s } = this.activeState, { orig: n } = e._texture, o = t.set(
      s.width,
      0,
      0,
      s.height,
      i.x,
      i.y
    ), a = e.worldTransform.copyTo(q.TEMP_MATRIX);
    return a.invert(), o.prepend(a), o.scale(1 / n.width, 1 / n.height), o.translate(e.anchor.x, e.anchor.y), o;
  }
  /** Destroys this Filter System. */
  destroy() {
    this.renderer = null, this.texturePool.clear(!1);
  }
  /**
   * Gets a Power-of-Two render texture or fullScreen texture
   * @param minWidth - The minimum width of the render texture in real pixels.
   * @param minHeight - The minimum height of the render texture in real pixels.
   * @param resolution - The resolution of the render texture.
   * @param multisample - Number of samples of the render texture.
   * @returns - The new render texture.
   */
  getOptimalFilterTexture(t, e, i = 1, s = J.NONE) {
    return this.texturePool.getOptimalTexture(t, e, i, s);
  }
  /**
   * Gets extra render texture to use inside current filter
   * To be compliant with older filters, you can use params in any order
   * @param input - renderTexture from which size and resolution will be copied
   * @param resolution - override resolution of the renderTexture
   * @param multisample - number of samples of the renderTexture
   */
  getFilterTexture(t, e, i) {
    if (typeof t == "number") {
      const n = t;
      t = e, e = n;
    }
    t = t || this.activeState.renderTexture;
    const s = this.texturePool.getOptimalTexture(
      t.width,
      t.height,
      e || t.resolution,
      i || J.NONE
    );
    return s.filterFrame = t.filterFrame, s;
  }
  /**
   * Frees a render texture back into the pool.
   * @param renderTexture - The renderTarget to free
   */
  returnFilterTexture(t) {
    this.texturePool.returnTexture(t);
  }
  /** Empties the texture pool. */
  emptyPool() {
    this.texturePool.clear(!0);
  }
  /** Calls `texturePool.resize()`, affects fullScreen renderTextures. */
  resize() {
    this.texturePool.setScreenSize(this.renderer.view);
  }
  /**
   * @param matrix - first param
   * @param rect - second param
   */
  transformAABB(t, e) {
    const i = Dr[0], s = Dr[1], n = Dr[2], o = Dr[3];
    i.set(e.left, e.top), s.set(e.left, e.bottom), n.set(e.right, e.top), o.set(e.right, e.bottom), t.apply(i, i), t.apply(s, s), t.apply(n, n), t.apply(o, o);
    const a = Math.min(i.x, s.x, n.x, o.x), h = Math.min(i.y, s.y, n.y, o.y), l = Math.max(i.x, s.x, n.x, o.x), u = Math.max(i.y, s.y, n.y, o.y);
    e.x = a, e.y = h, e.width = l - a, e.height = u - h;
  }
  roundFrame(t, e, i, s, n) {
    if (!(t.width <= 0 || t.height <= 0 || i.width <= 0 || i.height <= 0)) {
      if (n) {
        const { a: o, b: a, c: h, d: l } = n;
        if ((Math.abs(a) > 1e-4 || Math.abs(h) > 1e-4) && (Math.abs(o) > 1e-4 || Math.abs(l) > 1e-4))
          return;
      }
      n = n ? is.copyFrom(n) : is.identity(), n.translate(-i.x, -i.y).scale(
        s.width / i.width,
        s.height / i.height
      ).translate(s.x, s.y), this.transformAABB(n, t), t.ceil(e), this.transformAABB(n.invert(), t);
    }
  }
}
Ra.extension = {
  type: N.RendererSystem,
  name: "filter"
};
B.add(Ra);
class Gd {
  constructor(t) {
    this.framebuffer = t, this.stencil = null, this.dirtyId = -1, this.dirtyFormat = -1, this.dirtySize = -1, this.multisample = J.NONE, this.msaaBuffer = null, this.blitFramebuffer = null, this.mipLevel = 0;
  }
}
const Dd = new H();
class Sa {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(t) {
    this.renderer = t, this.managedFramebuffers = [], this.unknownFramebuffer = new Ps(10, 10), this.msaaSamples = null;
  }
  /** Sets up the renderer context and necessary buffers. */
  contextChange() {
    this.disposeAll(!0);
    const t = this.gl = this.renderer.gl;
    if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.current = this.unknownFramebuffer, this.viewport = new H(), this.hasMRT = !0, this.writeDepthTexture = !0, this.renderer.context.webGLVersion === 1) {
      let e = this.renderer.context.extensions.drawBuffers, i = this.renderer.context.extensions.depthTexture;
      L.PREFER_ENV === Ee.WEBGL_LEGACY && (e = null, i = null), e ? t.drawBuffers = (s) => e.drawBuffersWEBGL(s) : (this.hasMRT = !1, t.drawBuffers = () => {
      }), i || (this.writeDepthTexture = !1);
    } else
      this.msaaSamples = t.getInternalformatParameter(t.RENDERBUFFER, t.RGBA8, t.SAMPLES);
  }
  /**
   * Bind a framebuffer.
   * @param framebuffer
   * @param frame - frame, default is framebuffer size
   * @param mipLevel - optional mip level to set on the framebuffer - defaults to 0
   */
  bind(t, e, i = 0) {
    const { gl: s } = this;
    if (t) {
      const n = t.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(t);
      this.current !== t && (this.current = t, s.bindFramebuffer(s.FRAMEBUFFER, n.framebuffer)), n.mipLevel !== i && (t.dirtyId++, t.dirtyFormat++, n.mipLevel = i), n.dirtyId !== t.dirtyId && (n.dirtyId = t.dirtyId, n.dirtyFormat !== t.dirtyFormat ? (n.dirtyFormat = t.dirtyFormat, n.dirtySize = t.dirtySize, this.updateFramebuffer(t, i)) : n.dirtySize !== t.dirtySize && (n.dirtySize = t.dirtySize, this.resizeFramebuffer(t)));
      for (let o = 0; o < t.colorTextures.length; o++) {
        const a = t.colorTextures[o];
        this.renderer.texture.unbind(a.parentTextureArray || a);
      }
      if (t.depthTexture && this.renderer.texture.unbind(t.depthTexture), e) {
        const o = e.width >> i, a = e.height >> i, h = o / e.width;
        this.setViewport(
          e.x * h,
          e.y * h,
          o,
          a
        );
      } else {
        const o = t.width >> i, a = t.height >> i;
        this.setViewport(0, 0, o, a);
      }
    } else
      this.current && (this.current = null, s.bindFramebuffer(s.FRAMEBUFFER, null)), e ? this.setViewport(e.x, e.y, e.width, e.height) : this.setViewport(0, 0, this.renderer.width, this.renderer.height);
  }
  /**
   * Set the WebGLRenderingContext's viewport.
   * @param x - X position of viewport
   * @param y - Y position of viewport
   * @param width - Width of viewport
   * @param height - Height of viewport
   */
  setViewport(t, e, i, s) {
    const n = this.viewport;
    t = Math.round(t), e = Math.round(e), i = Math.round(i), s = Math.round(s), (n.width !== i || n.height !== s || n.x !== t || n.y !== e) && (n.x = t, n.y = e, n.width = i, n.height = s, this.gl.viewport(t, e, i, s));
  }
  /**
   * Get the size of the current width and height. Returns object with `width` and `height` values.
   * @readonly
   */
  get size() {
    return this.current ? { x: 0, y: 0, width: this.current.width, height: this.current.height } : { x: 0, y: 0, width: this.renderer.width, height: this.renderer.height };
  }
  /**
   * Clear the color of the context
   * @param r - Red value from 0 to 1
   * @param g - Green value from 0 to 1
   * @param b - Blue value from 0 to 1
   * @param a - Alpha value from 0 to 1
   * @param {PIXI.BUFFER_BITS} [mask=BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH] - Bitwise OR of masks
   *  that indicate the buffers to be cleared, by default COLOR and DEPTH buffers.
   */
  clear(t, e, i, s, n = us.COLOR | us.DEPTH) {
    const { gl: o } = this;
    o.clearColor(t, e, i, s), o.clear(n);
  }
  /**
   * Initialize framebuffer for this context
   * @protected
   * @param framebuffer
   * @returns - created GLFramebuffer
   */
  initFramebuffer(t) {
    const { gl: e } = this, i = new Gd(e.createFramebuffer());
    return i.multisample = this.detectSamples(t.multisample), t.glFramebuffers[this.CONTEXT_UID] = i, this.managedFramebuffers.push(t), t.disposeRunner.add(this), i;
  }
  /**
   * Resize the framebuffer
   * @param framebuffer
   * @protected
   */
  resizeFramebuffer(t) {
    const { gl: e } = this, i = t.glFramebuffers[this.CONTEXT_UID];
    if (i.stencil) {
      e.bindRenderbuffer(e.RENDERBUFFER, i.stencil);
      let o;
      this.renderer.context.webGLVersion === 1 ? o = e.DEPTH_STENCIL : t.depth && t.stencil ? o = e.DEPTH24_STENCIL8 : t.depth ? o = e.DEPTH_COMPONENT24 : o = e.STENCIL_INDEX8, i.msaaBuffer ? e.renderbufferStorageMultisample(
        e.RENDERBUFFER,
        i.multisample,
        o,
        t.width,
        t.height
      ) : e.renderbufferStorage(e.RENDERBUFFER, o, t.width, t.height);
    }
    const s = t.colorTextures;
    let n = s.length;
    e.drawBuffers || (n = Math.min(n, 1));
    for (let o = 0; o < n; o++) {
      const a = s[o], h = a.parentTextureArray || a;
      this.renderer.texture.bind(h, 0), o === 0 && i.msaaBuffer && (e.bindRenderbuffer(e.RENDERBUFFER, i.msaaBuffer), e.renderbufferStorageMultisample(
        e.RENDERBUFFER,
        i.multisample,
        h._glTextures[this.CONTEXT_UID].internalFormat,
        t.width,
        t.height
      ));
    }
    t.depthTexture && this.writeDepthTexture && this.renderer.texture.bind(t.depthTexture, 0);
  }
  /**
   * Update the framebuffer
   * @param framebuffer
   * @param mipLevel
   * @protected
   */
  updateFramebuffer(t, e) {
    const { gl: i } = this, s = t.glFramebuffers[this.CONTEXT_UID], n = t.colorTextures;
    let o = n.length;
    i.drawBuffers || (o = Math.min(o, 1)), s.multisample > 1 && this.canMultisampleFramebuffer(t) ? s.msaaBuffer = s.msaaBuffer || i.createRenderbuffer() : s.msaaBuffer && (i.deleteRenderbuffer(s.msaaBuffer), s.msaaBuffer = null, s.blitFramebuffer && (s.blitFramebuffer.dispose(), s.blitFramebuffer = null));
    const a = [];
    for (let h = 0; h < o; h++) {
      const l = n[h], u = l.parentTextureArray || l;
      this.renderer.texture.bind(u, 0), h === 0 && s.msaaBuffer ? (i.bindRenderbuffer(i.RENDERBUFFER, s.msaaBuffer), i.renderbufferStorageMultisample(
        i.RENDERBUFFER,
        s.multisample,
        u._glTextures[this.CONTEXT_UID].internalFormat,
        t.width,
        t.height
      ), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, s.msaaBuffer)) : (i.framebufferTexture2D(
        i.FRAMEBUFFER,
        i.COLOR_ATTACHMENT0 + h,
        l.target,
        u._glTextures[this.CONTEXT_UID].texture,
        e
      ), a.push(i.COLOR_ATTACHMENT0 + h));
    }
    if (a.length > 1 && i.drawBuffers(a), t.depthTexture && this.writeDepthTexture) {
      const h = t.depthTexture;
      this.renderer.texture.bind(h, 0), i.framebufferTexture2D(
        i.FRAMEBUFFER,
        i.DEPTH_ATTACHMENT,
        i.TEXTURE_2D,
        h._glTextures[this.CONTEXT_UID].texture,
        e
      );
    }
    if ((t.stencil || t.depth) && !(t.depthTexture && this.writeDepthTexture)) {
      s.stencil = s.stencil || i.createRenderbuffer();
      let h, l;
      this.renderer.context.webGLVersion === 1 ? (h = i.DEPTH_STENCIL_ATTACHMENT, l = i.DEPTH_STENCIL) : t.depth && t.stencil ? (h = i.DEPTH_STENCIL_ATTACHMENT, l = i.DEPTH24_STENCIL8) : t.depth ? (h = i.DEPTH_ATTACHMENT, l = i.DEPTH_COMPONENT24) : (h = i.STENCIL_ATTACHMENT, l = i.STENCIL_INDEX8), i.bindRenderbuffer(i.RENDERBUFFER, s.stencil), s.msaaBuffer ? i.renderbufferStorageMultisample(
        i.RENDERBUFFER,
        s.multisample,
        l,
        t.width,
        t.height
      ) : i.renderbufferStorage(i.RENDERBUFFER, l, t.width, t.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, h, i.RENDERBUFFER, s.stencil);
    } else
      s.stencil && (i.deleteRenderbuffer(s.stencil), s.stencil = null);
  }
  /**
   * Returns true if the frame buffer can be multisampled.
   * @param framebuffer
   */
  canMultisampleFramebuffer(t) {
    return this.renderer.context.webGLVersion !== 1 && t.colorTextures.length <= 1 && !t.depthTexture;
  }
  /**
   * Detects number of samples that is not more than a param but as close to it as possible
   * @param samples - number of samples
   * @returns - recommended number of samples
   */
  detectSamples(t) {
    const { msaaSamples: e } = this;
    let i = J.NONE;
    if (t <= 1 || e === null)
      return i;
    for (let s = 0; s < e.length; s++)
      if (e[s] <= t) {
        i = e[s];
        break;
      }
    return i === 1 && (i = J.NONE), i;
  }
  /**
   * Only works with WebGL2
   *
   * blits framebuffer to another of the same or bigger size
   * after that target framebuffer is bound
   *
   * Fails with WebGL warning if blits multisample framebuffer to different size
   * @param framebuffer - by default it blits "into itself", from renderBuffer to texture.
   * @param sourcePixels - source rectangle in pixels
   * @param destPixels - dest rectangle in pixels, assumed to be the same as sourcePixels
   */
  blit(t, e, i) {
    const { current: s, renderer: n, gl: o, CONTEXT_UID: a } = this;
    if (n.context.webGLVersion !== 2 || !s)
      return;
    const h = s.glFramebuffers[a];
    if (!h)
      return;
    if (!t) {
      if (!h.msaaBuffer)
        return;
      const u = s.colorTextures[0];
      if (!u)
        return;
      h.blitFramebuffer || (h.blitFramebuffer = new Ps(s.width, s.height), h.blitFramebuffer.addColorTexture(0, u)), t = h.blitFramebuffer, t.colorTextures[0] !== u && (t.colorTextures[0] = u, t.dirtyId++, t.dirtyFormat++), (t.width !== s.width || t.height !== s.height) && (t.width = s.width, t.height = s.height, t.dirtyId++, t.dirtySize++);
    }
    e || (e = Dd, e.width = s.width, e.height = s.height), i || (i = e);
    const l = e.width === i.width && e.height === i.height;
    this.bind(t), o.bindFramebuffer(o.READ_FRAMEBUFFER, h.framebuffer), o.blitFramebuffer(
      e.left,
      e.top,
      e.right,
      e.bottom,
      i.left,
      i.top,
      i.right,
      i.bottom,
      o.COLOR_BUFFER_BIT,
      l ? o.NEAREST : o.LINEAR
    ), o.bindFramebuffer(o.READ_FRAMEBUFFER, t.glFramebuffers[this.CONTEXT_UID].framebuffer);
  }
  /**
   * Disposes framebuffer.
   * @param framebuffer - framebuffer that has to be disposed of
   * @param contextLost - If context was lost, we suppress all delete function calls
   */
  disposeFramebuffer(t, e) {
    const i = t.glFramebuffers[this.CONTEXT_UID], s = this.gl;
    if (!i)
      return;
    delete t.glFramebuffers[this.CONTEXT_UID];
    const n = this.managedFramebuffers.indexOf(t);
    n >= 0 && this.managedFramebuffers.splice(n, 1), t.disposeRunner.remove(this), e || (s.deleteFramebuffer(i.framebuffer), i.msaaBuffer && s.deleteRenderbuffer(i.msaaBuffer), i.stencil && s.deleteRenderbuffer(i.stencil)), i.blitFramebuffer && this.disposeFramebuffer(i.blitFramebuffer, e);
  }
  /**
   * Disposes all framebuffers, but not textures bound to them.
   * @param [contextLost=false] - If context was lost, we suppress all delete function calls
   */
  disposeAll(t) {
    const e = this.managedFramebuffers;
    this.managedFramebuffers = [];
    for (let i = 0; i < e.length; i++)
      this.disposeFramebuffer(e[i], t);
  }
  /**
   * Forcing creation of stencil buffer for current framebuffer, if it wasn't done before.
   * Used by MaskSystem, when its time to use stencil mask for Graphics element.
   *
   * Its an alternative for public lazy `framebuffer.enableStencil`, in case we need stencil without rebind.
   * @private
   */
  forceStencil() {
    const t = this.current;
    if (!t)
      return;
    const e = t.glFramebuffers[this.CONTEXT_UID];
    if (!e || e.stencil && t.stencil)
      return;
    t.stencil = !0;
    const i = t.width, s = t.height, n = this.gl, o = e.stencil = n.createRenderbuffer();
    n.bindRenderbuffer(n.RENDERBUFFER, o);
    let a, h;
    this.renderer.context.webGLVersion === 1 ? (a = n.DEPTH_STENCIL_ATTACHMENT, h = n.DEPTH_STENCIL) : t.depth ? (a = n.DEPTH_STENCIL_ATTACHMENT, h = n.DEPTH24_STENCIL8) : (a = n.STENCIL_ATTACHMENT, h = n.STENCIL_INDEX8), e.msaaBuffer ? n.renderbufferStorageMultisample(n.RENDERBUFFER, e.multisample, h, i, s) : n.renderbufferStorage(n.RENDERBUFFER, h, i, s), n.framebufferRenderbuffer(n.FRAMEBUFFER, a, n.RENDERBUFFER, o);
  }
  /** Resets framebuffer stored state, binds screen framebuffer. Should be called before renderTexture reset(). */
  reset() {
    this.current = this.unknownFramebuffer, this.viewport = new H();
  }
  destroy() {
    this.renderer = null;
  }
}
Sa.extension = {
  type: N.RendererSystem,
  name: "framebuffer"
};
B.add(Sa);
const ss = { 5126: 4, 5123: 2, 5121: 1 };
class Ca {
  /** @param renderer - The renderer this System works for. */
  constructor(t) {
    this.renderer = t, this._activeGeometry = null, this._activeVao = null, this.hasVao = !0, this.hasInstance = !0, this.canUseUInt32ElementIndex = !1, this.managedGeometries = {};
  }
  /** Sets up the renderer context and necessary buffers. */
  contextChange() {
    this.disposeAll(!0);
    const t = this.gl = this.renderer.gl, e = this.renderer.context;
    if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, e.webGLVersion !== 2) {
      let i = this.renderer.context.extensions.vertexArrayObject;
      L.PREFER_ENV === Ee.WEBGL_LEGACY && (i = null), i ? (t.createVertexArray = () => i.createVertexArrayOES(), t.bindVertexArray = (s) => i.bindVertexArrayOES(s), t.deleteVertexArray = (s) => i.deleteVertexArrayOES(s)) : (this.hasVao = !1, t.createVertexArray = () => null, t.bindVertexArray = () => null, t.deleteVertexArray = () => null);
    }
    if (e.webGLVersion !== 2) {
      const i = t.getExtension("ANGLE_instanced_arrays");
      i ? (t.vertexAttribDivisor = (s, n) => i.vertexAttribDivisorANGLE(s, n), t.drawElementsInstanced = (s, n, o, a, h) => i.drawElementsInstancedANGLE(s, n, o, a, h), t.drawArraysInstanced = (s, n, o, a) => i.drawArraysInstancedANGLE(s, n, o, a)) : this.hasInstance = !1;
    }
    this.canUseUInt32ElementIndex = e.webGLVersion === 2 || !!e.extensions.uint32ElementIndex;
  }
  /**
   * Binds geometry so that is can be drawn. Creating a Vao if required
   * @param geometry - Instance of geometry to bind.
   * @param shader - Instance of shader to use vao for.
   */
  bind(t, e) {
    e = e || this.renderer.shader.shader;
    const { gl: i } = this;
    let s = t.glVertexArrayObjects[this.CONTEXT_UID], n = !1;
    s || (this.managedGeometries[t.id] = t, t.disposeRunner.add(this), t.glVertexArrayObjects[this.CONTEXT_UID] = s = {}, n = !0);
    const o = s[e.program.id] || this.initGeometryVao(t, e, n);
    this._activeGeometry = t, this._activeVao !== o && (this._activeVao = o, this.hasVao ? i.bindVertexArray(o) : this.activateVao(t, e.program)), this.updateBuffers();
  }
  /** Reset and unbind any active VAO and geometry. */
  reset() {
    this.unbind();
  }
  /** Update buffers of the currently bound geometry. */
  updateBuffers() {
    const t = this._activeGeometry, e = this.renderer.buffer;
    for (let i = 0; i < t.buffers.length; i++) {
      const s = t.buffers[i];
      e.update(s);
    }
  }
  /**
   * Check compatibility between a geometry and a program
   * @param geometry - Geometry instance.
   * @param program - Program instance.
   */
  checkCompatibility(t, e) {
    const i = t.attributes, s = e.attributeData;
    for (const n in s)
      if (!i[n])
        throw new Error(`shader and geometry incompatible, geometry missing the "${n}" attribute`);
  }
  /**
   * Takes a geometry and program and generates a unique signature for them.
   * @param geometry - To get signature from.
   * @param program - To test geometry against.
   * @returns - Unique signature of the geometry and program
   */
  getSignature(t, e) {
    const i = t.attributes, s = e.attributeData, n = ["g", t.id];
    for (const o in i)
      s[o] && n.push(o, s[o].location);
    return n.join("-");
  }
  /**
   * Creates or gets Vao with the same structure as the geometry and stores it on the geometry.
   * If vao is created, it is bound automatically. We use a shader to infer what and how to set up the
   * attribute locations.
   * @param geometry - Instance of geometry to to generate Vao for.
   * @param shader - Instance of the shader.
   * @param incRefCount - Increment refCount of all geometry buffers.
   */
  initGeometryVao(t, e, i = !0) {
    const s = this.gl, n = this.CONTEXT_UID, o = this.renderer.buffer, a = e.program;
    a.glPrograms[n] || this.renderer.shader.generateProgram(e), this.checkCompatibility(t, a);
    const h = this.getSignature(t, a), l = t.glVertexArrayObjects[this.CONTEXT_UID];
    let u = l[h];
    if (u)
      return l[a.id] = u, u;
    const c = t.buffers, d = t.attributes, f = {}, p = {};
    for (const v in c)
      f[v] = 0, p[v] = 0;
    for (const v in d)
      !d[v].size && a.attributeData[v] ? d[v].size = a.attributeData[v].size : d[v].size || console.warn(`PIXI Geometry attribute '${v}' size cannot be determined (likely the bound shader does not have the attribute)`), f[d[v].buffer] += d[v].size * ss[d[v].type];
    for (const v in d) {
      const y = d[v], E = y.size;
      y.stride === void 0 && (f[y.buffer] === E * ss[y.type] ? y.stride = 0 : y.stride = f[y.buffer]), y.start === void 0 && (y.start = p[y.buffer], p[y.buffer] += E * ss[y.type]);
    }
    u = s.createVertexArray(), s.bindVertexArray(u);
    for (let v = 0; v < c.length; v++) {
      const y = c[v];
      o.bind(y), i && y._glBuffers[n].refCount++;
    }
    return this.activateVao(t, a), l[a.id] = u, l[h] = u, s.bindVertexArray(null), o.unbind(Dt.ARRAY_BUFFER), u;
  }
  /**
   * Disposes geometry.
   * @param geometry - Geometry with buffers. Only VAO will be disposed
   * @param [contextLost=false] - If context was lost, we suppress deleteVertexArray
   */
  disposeGeometry(t, e) {
    var a;
    if (!this.managedGeometries[t.id])
      return;
    delete this.managedGeometries[t.id];
    const i = t.glVertexArrayObjects[this.CONTEXT_UID], s = this.gl, n = t.buffers, o = (a = this.renderer) == null ? void 0 : a.buffer;
    if (t.disposeRunner.remove(this), !!i) {
      if (o)
        for (let h = 0; h < n.length; h++) {
          const l = n[h]._glBuffers[this.CONTEXT_UID];
          l && (l.refCount--, l.refCount === 0 && !e && o.dispose(n[h], e));
        }
      if (!e) {
        for (const h in i)
          if (h[0] === "g") {
            const l = i[h];
            this._activeVao === l && this.unbind(), s.deleteVertexArray(l);
          }
      }
      delete t.glVertexArrayObjects[this.CONTEXT_UID];
    }
  }
  /**
   * Dispose all WebGL resources of all managed geometries.
   * @param [contextLost=false] - If context was lost, we suppress `gl.delete` calls
   */
  disposeAll(t) {
    const e = Object.keys(this.managedGeometries);
    for (let i = 0; i < e.length; i++)
      this.disposeGeometry(this.managedGeometries[e[i]], t);
  }
  /**
   * Activate vertex array object.
   * @param geometry - Geometry instance.
   * @param program - Shader program instance.
   */
  activateVao(t, e) {
    const i = this.gl, s = this.CONTEXT_UID, n = this.renderer.buffer, o = t.buffers, a = t.attributes;
    t.indexBuffer && n.bind(t.indexBuffer);
    let h = null;
    for (const l in a) {
      const u = a[l], c = o[u.buffer], d = c._glBuffers[s];
      if (e.attributeData[l]) {
        h !== d && (n.bind(c), h = d);
        const f = e.attributeData[l].location;
        if (i.enableVertexAttribArray(f), i.vertexAttribPointer(
          f,
          u.size,
          u.type || i.FLOAT,
          u.normalized,
          u.stride,
          u.start
        ), u.instance)
          if (this.hasInstance)
            i.vertexAttribDivisor(f, u.divisor);
          else
            throw new Error("geometry error, GPU Instancing is not supported on this device");
      }
    }
  }
  /**
   * Draws the currently bound geometry.
   * @param type - The type primitive to render.
   * @param size - The number of elements to be rendered. If not specified, all vertices after the
   *  starting vertex will be drawn.
   * @param start - The starting vertex in the geometry to start drawing from. If not specified,
   *  drawing will start from the first vertex.
   * @param instanceCount - The number of instances of the set of elements to execute. If not specified,
   *  all instances will be drawn.
   */
  draw(t, e, i, s) {
    const { gl: n } = this, o = this._activeGeometry;
    if (o.indexBuffer) {
      const a = o.indexBuffer.data.BYTES_PER_ELEMENT, h = a === 2 ? n.UNSIGNED_SHORT : n.UNSIGNED_INT;
      a === 2 || a === 4 && this.canUseUInt32ElementIndex ? o.instanced ? n.drawElementsInstanced(t, e || o.indexBuffer.data.length, h, (i || 0) * a, s || 1) : n.drawElements(t, e || o.indexBuffer.data.length, h, (i || 0) * a) : console.warn("unsupported index buffer type: uint32");
    } else
      o.instanced ? n.drawArraysInstanced(t, i, e || o.getSize(), s || 1) : n.drawArrays(t, i, e || o.getSize());
    return this;
  }
  /** Unbind/reset everything. */
  unbind() {
    this.gl.bindVertexArray(null), this._activeVao = null, this._activeGeometry = null;
  }
  destroy() {
    this.renderer = null;
  }
}
Ca.extension = {
  type: N.RendererSystem,
  name: "geometry"
};
B.add(Ca);
const po = new q();
class $d {
  /**
   * @param texture - observed texture
   * @param clampMargin - Changes frame clamping, 0.5 by default. Use -0.5 for extra border.
   */
  constructor(t, e) {
    this._texture = t, this.mapCoord = new q(), this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, this.clampMargin = typeof e > "u" ? 0.5 : e, this.isSimple = !1;
  }
  /** Texture property. */
  get texture() {
    return this._texture;
  }
  set texture(t) {
    this._texture = t, this._textureID = -1;
  }
  /**
   * Multiplies uvs array to transform
   * @param uvs - mesh uvs
   * @param [out=uvs] - output
   * @returns - output
   */
  multiplyUvs(t, e) {
    e === void 0 && (e = t);
    const i = this.mapCoord;
    for (let s = 0; s < t.length; s += 2) {
      const n = t[s], o = t[s + 1];
      e[s] = n * i.a + o * i.c + i.tx, e[s + 1] = n * i.b + o * i.d + i.ty;
    }
    return e;
  }
  /**
   * Updates matrices if texture was changed.
   * @param [forceUpdate=false] - if true, matrices will be updated any case
   * @returns - Whether or not it was updated
   */
  update(t) {
    const e = this._texture;
    if (!e || !e.valid || !t && this._textureID === e._updateID)
      return !1;
    this._textureID = e._updateID, this._updateID++;
    const i = e._uvs;
    this.mapCoord.set(i.x1 - i.x0, i.y1 - i.y0, i.x3 - i.x0, i.y3 - i.y0, i.x0, i.y0);
    const s = e.orig, n = e.trim;
    n && (po.set(
      s.width / n.width,
      0,
      0,
      s.height / n.height,
      -n.x / n.width,
      -n.y / n.height
    ), this.mapCoord.append(po));
    const o = e.baseTexture, a = this.uClampFrame, h = this.clampMargin / o.resolution, l = this.clampOffset;
    return a[0] = (e._frame.x + h + l) / o.width, a[1] = (e._frame.y + h + l) / o.height, a[2] = (e._frame.x + e._frame.width - h + l) / o.width, a[3] = (e._frame.y + e._frame.height - h + l) / o.height, this.uClampOffset[0] = l / o.realWidth, this.uClampOffset[1] = l / o.realHeight, this.isSimple = e._frame.width === o.width && e._frame.height === o.height && e.rotate === 0, !0;
  }
}
var Hd = `varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D mask;
uniform float alpha;
uniform float npmAlpha;
uniform vec4 maskClamp;

void main(void)
{
    float clip = step(3.5,
        step(maskClamp.x, vMaskCoord.x) +
        step(maskClamp.y, vMaskCoord.y) +
        step(vMaskCoord.x, maskClamp.z) +
        step(vMaskCoord.y, maskClamp.w));

    vec4 original = texture2D(uSampler, vTextureCoord);
    vec4 masky = texture2D(mask, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    original *= (alphaMul * masky.r * alpha * clip);

    gl_FragColor = original;
}
`, Xd = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 otherMatrix;

varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;
}
`;
class Vd extends Be {
  /** @ignore */
  constructor(t, e, i) {
    let s = null;
    typeof t != "string" && e === void 0 && i === void 0 && (s = t, t = void 0, e = void 0, i = void 0), super(t || Xd, e || Hd, i), this.maskSprite = s, this.maskMatrix = new q();
  }
  /**
   * Sprite mask
   * @type {PIXI.DisplayObject}
   */
  get maskSprite() {
    return this._maskSprite;
  }
  set maskSprite(t) {
    this._maskSprite = t, this._maskSprite && (this._maskSprite.renderable = !1);
  }
  /**
   * Applies the filter
   * @param filterManager - The renderer to retrieve the filter from
   * @param input - The input render target.
   * @param output - The target to output to.
   * @param clearMode - Should the output be cleared before rendering to it.
   */
  apply(t, e, i, s) {
    const n = this._maskSprite, o = n._texture;
    o.valid && (o.uvMatrix || (o.uvMatrix = new $d(o, 0)), o.uvMatrix.update(), this.uniforms.npmAlpha = o.baseTexture.alphaMode ? 0 : 1, this.uniforms.mask = o, this.uniforms.otherMatrix = t.calculateSpriteMatrix(this.maskMatrix, n).prepend(o.uvMatrix.mapCoord), this.uniforms.alpha = n.worldAlpha, this.uniforms.maskClamp = o.uvMatrix.uClampFrame, t.applyFilter(this, e, i, s));
  }
}
class jd {
  /**
   * Create MaskData
   * @param {PIXI.DisplayObject} [maskObject=null] - object that describes the mask
   */
  constructor(t = null) {
    this.type = et.NONE, this.autoDetect = !0, this.maskObject = t || null, this.pooled = !1, this.isMaskData = !0, this.resolution = null, this.multisample = Be.defaultMultisample, this.enabled = !0, this.colorMask = 15, this._filters = null, this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null, this._scissorRectLocal = null, this._colorMask = 15, this._target = null;
  }
  /**
   * The sprite mask filter.
   * If set to `null`, the default sprite mask filter is used.
   * @default null
   */
  get filter() {
    return this._filters ? this._filters[0] : null;
  }
  set filter(t) {
    t ? this._filters ? this._filters[0] = t : this._filters = [t] : this._filters = null;
  }
  /** Resets the mask data after popMask(). */
  reset() {
    this.pooled && (this.maskObject = null, this.type = et.NONE, this.autoDetect = !0), this._target = null, this._scissorRectLocal = null;
  }
  /**
   * Copies counters from maskData above, called from pushMask().
   * @param maskAbove
   */
  copyCountersOrReset(t) {
    t ? (this._stencilCounter = t._stencilCounter, this._scissorCounter = t._scissorCounter, this._scissorRect = t._scissorRect) : (this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null);
  }
}
class Ma {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(t) {
    this.renderer = t, this.enableScissor = !0, this.alphaMaskPool = [], this.maskDataPool = [], this.maskStack = [], this.alphaMaskIndex = 0;
  }
  /**
   * Changes the mask stack that is used by this System.
   * @param maskStack - The mask stack
   */
  setMaskStack(t) {
    this.maskStack = t, this.renderer.scissor.setMaskStack(t), this.renderer.stencil.setMaskStack(t);
  }
  /**
   * Enables the mask and appends it to the current mask stack.
   *
   * NOTE: The batch renderer should be flushed beforehand to prevent pending renders from being masked.
   * @param {PIXI.DisplayObject} target - Display Object to push the mask to
   * @param {PIXI.MaskData|PIXI.Sprite|PIXI.Graphics|PIXI.DisplayObject} maskDataOrTarget - The masking data.
   */
  push(t, e) {
    let i = e;
    if (!i.isMaskData) {
      const n = this.maskDataPool.pop() || new jd();
      n.pooled = !0, n.maskObject = e, i = n;
    }
    const s = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null;
    if (i.copyCountersOrReset(s), i._colorMask = s ? s._colorMask : 15, i.autoDetect && this.detect(i), i._target = t, i.type !== et.SPRITE && this.maskStack.push(i), i.enabled)
      switch (i.type) {
        case et.SCISSOR:
          this.renderer.scissor.push(i);
          break;
        case et.STENCIL:
          this.renderer.stencil.push(i);
          break;
        case et.SPRITE:
          i.copyCountersOrReset(null), this.pushSpriteMask(i);
          break;
        case et.COLOR:
          this.pushColorMask(i);
          break;
      }
    i.type === et.SPRITE && this.maskStack.push(i);
  }
  /**
   * Removes the last mask from the mask stack and doesn't return it.
   *
   * NOTE: The batch renderer should be flushed beforehand to render the masked contents before the mask is removed.
   * @param {PIXI.IMaskTarget} target - Display Object to pop the mask from
   */
  pop(t) {
    const e = this.maskStack.pop();
    if (!(!e || e._target !== t)) {
      if (e.enabled)
        switch (e.type) {
          case et.SCISSOR:
            this.renderer.scissor.pop(e);
            break;
          case et.STENCIL:
            this.renderer.stencil.pop(e.maskObject);
            break;
          case et.SPRITE:
            this.popSpriteMask(e);
            break;
          case et.COLOR:
            this.popColorMask(e);
            break;
        }
      if (e.reset(), e.pooled && this.maskDataPool.push(e), this.maskStack.length !== 0) {
        const i = this.maskStack[this.maskStack.length - 1];
        i.type === et.SPRITE && i._filters && (i._filters[0].maskSprite = i.maskObject);
      }
    }
  }
  /**
   * Sets type of MaskData based on its maskObject.
   * @param maskData
   */
  detect(t) {
    const e = t.maskObject;
    e ? e.isSprite ? t.type = et.SPRITE : this.enableScissor && this.renderer.scissor.testScissor(t) ? t.type = et.SCISSOR : t.type = et.STENCIL : t.type = et.COLOR;
  }
  /**
   * Applies the Mask and adds it to the current filter stack.
   * @param maskData - Sprite to be used as the mask.
   */
  pushSpriteMask(t) {
    const { maskObject: e } = t, i = t._target;
    let s = t._filters;
    s || (s = this.alphaMaskPool[this.alphaMaskIndex], s || (s = this.alphaMaskPool[this.alphaMaskIndex] = [new Vd()])), s[0].resolution = t.resolution, s[0].multisample = t.multisample, s[0].maskSprite = e;
    const n = i.filterArea;
    i.filterArea = e.getBounds(!0), this.renderer.filter.push(i, s), i.filterArea = n, t._filters || this.alphaMaskIndex++;
  }
  /**
   * Removes the last filter from the filter stack and doesn't return it.
   * @param maskData - Sprite to be used as the mask.
   */
  popSpriteMask(t) {
    this.renderer.filter.pop(), t._filters ? t._filters[0].maskSprite = null : (this.alphaMaskIndex--, this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite = null);
  }
  /**
   * Pushes the color mask.
   * @param maskData - The mask data
   */
  pushColorMask(t) {
    const e = t._colorMask, i = t._colorMask = e & t.colorMask;
    i !== e && this.renderer.gl.colorMask(
      (i & 1) !== 0,
      (i & 2) !== 0,
      (i & 4) !== 0,
      (i & 8) !== 0
    );
  }
  /**
   * Pops the color mask.
   * @param maskData - The mask data
   */
  popColorMask(t) {
    const e = t._colorMask, i = this.maskStack.length > 0 ? this.maskStack[this.maskStack.length - 1]._colorMask : 15;
    i !== e && this.renderer.gl.colorMask(
      (i & 1) !== 0,
      (i & 2) !== 0,
      (i & 4) !== 0,
      (i & 8) !== 0
    );
  }
  destroy() {
    this.renderer = null;
  }
}
Ma.extension = {
  type: N.RendererSystem,
  name: "mask"
};
B.add(Ma);
class Fa {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(t) {
    this.renderer = t, this.maskStack = [], this.glConst = 0;
  }
  /** Gets count of masks of certain type. */
  getStackLength() {
    return this.maskStack.length;
  }
  /**
   * Changes the mask stack that is used by this System.
   * @param {PIXI.MaskData[]} maskStack - The mask stack
   */
  setMaskStack(t) {
    const { gl: e } = this.renderer, i = this.getStackLength();
    this.maskStack = t;
    const s = this.getStackLength();
    s !== i && (s === 0 ? e.disable(this.glConst) : (e.enable(this.glConst), this._useCurrent()));
  }
  /**
   * Setup renderer to use the current mask data.
   * @private
   */
  _useCurrent() {
  }
  /** Destroys the mask stack. */
  destroy() {
    this.renderer = null, this.maskStack = null;
  }
}
const mo = new q(), yo = [], Na = class Wr extends Fa {
  /**
   * @param {PIXI.Renderer} renderer - The renderer this System works for.
   */
  constructor(t) {
    super(t), this.glConst = L.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST;
  }
  getStackLength() {
    const t = this.maskStack[this.maskStack.length - 1];
    return t ? t._scissorCounter : 0;
  }
  /**
   * evaluates _boundsTransformed, _scissorRect for MaskData
   * @param maskData
   */
  calcScissorRect(t) {
    if (t._scissorRectLocal)
      return;
    const e = t._scissorRect, { maskObject: i } = t, { renderer: s } = this, n = s.renderTexture, o = i.getBounds(!0, yo.pop() ?? new H());
    this.roundFrameToPixels(
      o,
      n.current ? n.current.resolution : s.resolution,
      n.sourceFrame,
      n.destinationFrame,
      s.projection.transform
    ), e && o.fit(e), t._scissorRectLocal = o;
  }
  static isMatrixRotated(t) {
    if (!t)
      return !1;
    const { a: e, b: i, c: s, d: n } = t;
    return (Math.abs(i) > 1e-4 || Math.abs(s) > 1e-4) && (Math.abs(e) > 1e-4 || Math.abs(n) > 1e-4);
  }
  /**
   * Test, whether the object can be scissor mask with current renderer projection.
   * Calls "calcScissorRect()" if its true.
   * @param maskData - mask data
   * @returns whether Whether the object can be scissor mask
   */
  testScissor(t) {
    const { maskObject: e } = t;
    if (!e.isFastRect || !e.isFastRect() || Wr.isMatrixRotated(e.worldTransform) || Wr.isMatrixRotated(this.renderer.projection.transform))
      return !1;
    this.calcScissorRect(t);
    const i = t._scissorRectLocal;
    return i.width > 0 && i.height > 0;
  }
  roundFrameToPixels(t, e, i, s, n) {
    Wr.isMatrixRotated(n) || (n = n ? mo.copyFrom(n) : mo.identity(), n.translate(-i.x, -i.y).scale(
      s.width / i.width,
      s.height / i.height
    ).translate(s.x, s.y), this.renderer.filter.transformAABB(n, t), t.fit(s), t.x = Math.round(t.x * e), t.y = Math.round(t.y * e), t.width = Math.round(t.width * e), t.height = Math.round(t.height * e));
  }
  /**
   * Applies the Mask and adds it to the current stencil stack.
   * @author alvin
   * @param maskData - The mask data.
   */
  push(t) {
    t._scissorRectLocal || this.calcScissorRect(t);
    const { gl: e } = this.renderer;
    t._scissorRect || e.enable(e.SCISSOR_TEST), t._scissorCounter++, t._scissorRect = t._scissorRectLocal, this._useCurrent();
  }
  /**
   * This should be called after a mask is popped off the mask stack. It will rebind the scissor box to be latest with the
   * last mask in the stack.
   *
   * This can also be called when you directly modify the scissor box and want to restore PixiJS state.
   * @param maskData - The mask data.
   */
  pop(t) {
    const { gl: e } = this.renderer;
    t && yo.push(t._scissorRectLocal), this.getStackLength() > 0 ? this._useCurrent() : e.disable(e.SCISSOR_TEST);
  }
  /**
   * Setup renderer to use the current scissor data.
   * @private
   */
  _useCurrent() {
    const t = this.maskStack[this.maskStack.length - 1]._scissorRect;
    let e;
    this.renderer.renderTexture.current ? e = t.y : e = this.renderer.height - t.height - t.y, this.renderer.gl.scissor(t.x, e, t.width, t.height);
  }
};
Na.extension = {
  type: N.RendererSystem,
  name: "scissor"
};
let zd = Na;
B.add(zd);
class Pa extends Fa {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(t) {
    super(t), this.glConst = L.ADAPTER.getWebGLRenderingContext().STENCIL_TEST;
  }
  getStackLength() {
    const t = this.maskStack[this.maskStack.length - 1];
    return t ? t._stencilCounter : 0;
  }
  /**
   * Applies the Mask and adds it to the current stencil stack.
   * @param maskData - The mask data
   */
  push(t) {
    const e = t.maskObject, { gl: i } = this.renderer, s = t._stencilCounter;
    s === 0 && (this.renderer.framebuffer.forceStencil(), i.clearStencil(0), i.clear(i.STENCIL_BUFFER_BIT), i.enable(i.STENCIL_TEST)), t._stencilCounter++;
    const n = t._colorMask;
    n !== 0 && (t._colorMask = 0, i.colorMask(!1, !1, !1, !1)), i.stencilFunc(i.EQUAL, s, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.INCR), e.renderable = !0, e.render(this.renderer), this.renderer.batch.flush(), e.renderable = !1, n !== 0 && (t._colorMask = n, i.colorMask(
      (n & 1) !== 0,
      (n & 2) !== 0,
      (n & 4) !== 0,
      (n & 8) !== 0
    )), this._useCurrent();
  }
  /**
   * Pops stencil mask. MaskData is already removed from stack
   * @param {PIXI.DisplayObject} maskObject - object of popped mask data
   */
  pop(t) {
    const e = this.renderer.gl;
    if (this.getStackLength() === 0)
      e.disable(e.STENCIL_TEST);
    else {
      const i = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null, s = i ? i._colorMask : 15;
      s !== 0 && (i._colorMask = 0, e.colorMask(!1, !1, !1, !1)), e.stencilOp(e.KEEP, e.KEEP, e.DECR), t.renderable = !0, t.render(this.renderer), this.renderer.batch.flush(), t.renderable = !1, s !== 0 && (i._colorMask = s, e.colorMask(
        (s & 1) !== 0,
        (s & 2) !== 0,
        (s & 4) !== 0,
        (s & 8) !== 0
      )), this._useCurrent();
    }
  }
  /**
   * Setup renderer to use the current stencil data.
   * @private
   */
  _useCurrent() {
    const t = this.renderer.gl;
    t.stencilFunc(t.EQUAL, this.getStackLength(), 4294967295), t.stencilOp(t.KEEP, t.KEEP, t.KEEP);
  }
}
Pa.extension = {
  type: N.RendererSystem,
  name: "stencil"
};
B.add(Pa);
class Oa {
  constructor(t) {
    this.renderer = t, this.plugins = {}, Object.defineProperties(this.plugins, {
      extract: {
        enumerable: !1,
        get() {
          return O("7.0.0", "renderer.plugins.extract has moved to renderer.extract"), t.extract;
        }
      },
      prepare: {
        enumerable: !1,
        get() {
          return O("7.0.0", "renderer.plugins.prepare has moved to renderer.prepare"), t.prepare;
        }
      },
      interaction: {
        enumerable: !1,
        get() {
          return O("7.0.0", "renderer.plugins.interaction has been deprecated, use renderer.events"), t.events;
        }
      }
    });
  }
  /**
   * Initialize the plugins.
   * @protected
   */
  init() {
    const t = this.rendererPlugins;
    for (const e in t)
      this.plugins[e] = new t[e](this.renderer);
  }
  destroy() {
    for (const t in this.plugins)
      this.plugins[t].destroy(), this.plugins[t] = null;
  }
}
Oa.extension = {
  type: [
    N.RendererSystem,
    N.CanvasRendererSystem
  ],
  name: "_plugin"
};
B.add(Oa);
class La {
  /** @param renderer - The renderer this System works for. */
  constructor(t) {
    this.renderer = t, this.destinationFrame = null, this.sourceFrame = null, this.defaultFrame = null, this.projectionMatrix = new q(), this.transform = null;
  }
  /**
   * Updates the projection-matrix based on the sourceFrame → destinationFrame mapping provided.
   *
   * NOTE: It is expected you call `renderer.framebuffer.setViewport(destinationFrame)` after this. This is because
   * the framebuffer viewport converts shader vertex output in normalized device coordinates to window coordinates.
   *
   * NOTE-2: {@link PIXI.RenderTextureSystem#bind} updates the projection-matrix when you bind a render-texture.
   * It is expected
   * that you dirty the current bindings when calling this manually.
   * @param destinationFrame - The rectangle in the render-target to render the contents into. If rendering to the canvas,
   *  the origin is on the top-left; if rendering to a render-texture, the origin is on the bottom-left.
   * @param sourceFrame - The rectangle in world space that contains the contents being rendered.
   * @param resolution - The resolution of the render-target, which is the ratio of
   *  world-space (or CSS) pixels to physical pixels.
   * @param root - Whether the render-target is the screen. This is required because rendering to textures
   *  is y-flipped (i.e. upside down relative to the screen).
   */
  update(t, e, i, s) {
    this.destinationFrame = t || this.destinationFrame || this.defaultFrame, this.sourceFrame = e || this.sourceFrame || t, this.calculateProjection(this.destinationFrame, this.sourceFrame, i, s), this.transform && this.projectionMatrix.append(this.transform);
    const n = this.renderer;
    n.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix, n.globalUniforms.update(), n.shader.shader && n.shader.syncUniformGroup(n.shader.shader.uniforms.globals);
  }
  /**
   * Calculates the `projectionMatrix` to map points inside `sourceFrame` to inside `destinationFrame`.
   * @param _destinationFrame - The destination frame in the render-target.
   * @param sourceFrame - The source frame in world space.
   * @param _resolution - The render-target's resolution, i.e. ratio of CSS to physical pixels.
   * @param root - Whether rendering into the screen. Otherwise, if rendering to a framebuffer, the projection
   *  is y-flipped.
   */
  calculateProjection(t, e, i, s) {
    const n = this.projectionMatrix, o = s ? -1 : 1;
    n.identity(), n.a = 1 / e.width * 2, n.d = o * (1 / e.height * 2), n.tx = -1 - e.x * n.a, n.ty = -o - e.y * n.d;
  }
  /**
   * Sets the transform of the active render target to the given matrix.
   * @param _matrix - The transformation matrix
   */
  setTransform(t) {
  }
  destroy() {
    this.renderer = null;
  }
}
La.extension = {
  type: N.RendererSystem,
  name: "projection"
};
B.add(La);
const Wd = new wi(), go = new H();
class Ua {
  constructor(t) {
    this.renderer = t, this._tempMatrix = new q();
  }
  /**
   * A Useful function that returns a texture of the display object that can then be used to create sprites
   * This can be quite useful if your displayObject is complicated and needs to be reused multiple times.
   * @param displayObject - The displayObject the object will be generated from.
   * @param {IGenerateTextureOptions} options - Generate texture options.
   * @param {PIXI.Rectangle} options.region - The region of the displayObject, that shall be rendered,
   *        if no region is specified, defaults to the local bounds of the displayObject.
   * @param {number} [options.resolution] - If not given, the renderer's resolution is used.
   * @param {PIXI.MSAA_QUALITY} [options.multisample] - If not given, the renderer's multisample is used.
   * @returns a shiny new texture of the display object passed in
   */
  generateTexture(t, e) {
    const { region: i, ...s } = e || {}, n = (i == null ? void 0 : i.copyTo(go)) || t.getLocalBounds(go, !0), o = s.resolution || this.renderer.resolution;
    n.width = Math.max(n.width, 1 / o), n.height = Math.max(n.height, 1 / o), s.width = n.width, s.height = n.height, s.resolution = o, s.multisample ?? (s.multisample = this.renderer.multisample);
    const a = Ai.create(s);
    this._tempMatrix.tx = -n.x, this._tempMatrix.ty = -n.y;
    const h = t.transform;
    return t.transform = Wd, this.renderer.render(t, {
      renderTexture: a,
      transform: this._tempMatrix,
      skipUpdateTransform: !!t.parent,
      blit: !0
    }), t.transform = h, a;
  }
  destroy() {
  }
}
Ua.extension = {
  type: [
    N.RendererSystem,
    N.CanvasRendererSystem
  ],
  name: "textureGenerator"
};
B.add(Ua);
const ne = new H(), er = new H();
class Ba {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(t) {
    this.renderer = t, this.defaultMaskStack = [], this.current = null, this.sourceFrame = new H(), this.destinationFrame = new H(), this.viewportFrame = new H();
  }
  contextChange() {
    var e;
    const t = (e = this.renderer) == null ? void 0 : e.gl.getContextAttributes();
    this._rendererPremultipliedAlpha = !!(t && t.alpha && t.premultipliedAlpha);
  }
  /**
   * Bind the current render texture.
   * @param renderTexture - RenderTexture to bind, by default its `null` - the screen.
   * @param sourceFrame - Part of world that is mapped to the renderTexture.
   * @param destinationFrame - Part of renderTexture, by default it has the same size as sourceFrame.
   */
  bind(t = null, e, i) {
    const s = this.renderer;
    this.current = t;
    let n, o, a;
    t ? (n = t.baseTexture, a = n.resolution, e || (ne.width = t.frame.width, ne.height = t.frame.height, e = ne), i || (er.x = t.frame.x, er.y = t.frame.y, er.width = e.width, er.height = e.height, i = er), o = n.framebuffer) : (a = s.resolution, e || (ne.width = s._view.screen.width, ne.height = s._view.screen.height, e = ne), i || (i = ne, i.width = e.width, i.height = e.height));
    const h = this.viewportFrame;
    h.x = i.x * a, h.y = i.y * a, h.width = i.width * a, h.height = i.height * a, t || (h.y = s.view.height - (h.y + h.height)), h.ceil(), this.renderer.framebuffer.bind(o, h), this.renderer.projection.update(i, e, a, !o), t ? this.renderer.mask.setMaskStack(n.maskStack) : this.renderer.mask.setMaskStack(this.defaultMaskStack), this.sourceFrame.copyFrom(e), this.destinationFrame.copyFrom(i);
  }
  /**
   * Erases the render texture and fills the drawing area with a colour.
   * @param clearColor - The color as rgba, default to use the renderer backgroundColor
   * @param [mask=BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH] - Bitwise OR of masks
   *  that indicate the buffers to be cleared, by default COLOR and DEPTH buffers.
   */
  clear(t, e) {
    const i = this.current ? this.current.baseTexture.clear : this.renderer.background.backgroundColor, s = Ei.shared.setValue(t || i);
    (this.current && this.current.baseTexture.alphaMode > 0 || !this.current && this._rendererPremultipliedAlpha) && s.premultiply(s.alpha);
    const n = this.destinationFrame, o = this.current ? this.current.baseTexture : this.renderer._view.screen, a = n.width !== o.width || n.height !== o.height;
    if (a) {
      let { x: h, y: l, width: u, height: c } = this.viewportFrame;
      h = Math.round(h), l = Math.round(l), u = Math.round(u), c = Math.round(c), this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST), this.renderer.gl.scissor(h, l, u, c);
    }
    this.renderer.framebuffer.clear(s.red, s.green, s.blue, s.alpha, e), a && this.renderer.scissor.pop();
  }
  resize() {
    this.bind(null);
  }
  /** Resets render-texture state. */
  reset() {
    this.bind(null);
  }
  destroy() {
    this.renderer = null;
  }
}
Ba.extension = {
  type: N.RendererSystem,
  name: "renderTexture"
};
B.add(Ba);
class Yd {
  /**
   * Makes a new Pixi program.
   * @param program - webgl program
   * @param uniformData - uniforms
   */
  constructor(t, e) {
    this.program = t, this.uniformData = e, this.uniformGroups = {}, this.uniformDirtyGroups = {}, this.uniformBufferBindings = {};
  }
  /** Destroys this program. */
  destroy() {
    this.uniformData = null, this.uniformGroups = null, this.uniformDirtyGroups = null, this.uniformBufferBindings = null, this.program = null;
  }
}
function qd(r, t) {
  const e = {}, i = t.getProgramParameter(r, t.ACTIVE_ATTRIBUTES);
  for (let s = 0; s < i; s++) {
    const n = t.getActiveAttrib(r, s);
    if (n.name.startsWith("gl_"))
      continue;
    const o = ba(t, n.type), a = {
      type: o,
      name: n.name,
      size: xa(o),
      location: t.getAttribLocation(r, n.name)
    };
    e[n.name] = a;
  }
  return e;
}
function Kd(r, t) {
  const e = {}, i = t.getProgramParameter(r, t.ACTIVE_UNIFORMS);
  for (let s = 0; s < i; s++) {
    const n = t.getActiveUniform(r, s), o = n.name.replace(/\[.*?\]$/, ""), a = !!n.name.match(/\[.*?\]$/), h = ba(t, n.type);
    e[o] = {
      name: o,
      index: s,
      type: h,
      size: n.size,
      isArray: a,
      value: va(h, n.size)
    };
  }
  return e;
}
function Zd(r, t) {
  var a;
  const e = ao(r, r.VERTEX_SHADER, t.vertexSrc), i = ao(r, r.FRAGMENT_SHADER, t.fragmentSrc), s = r.createProgram();
  r.attachShader(s, e), r.attachShader(s, i);
  const n = (a = t.extra) == null ? void 0 : a.transformFeedbackVaryings;
  if (n && (typeof r.transformFeedbackVaryings != "function" ? console.warn("TransformFeedback is not supported but TransformFeedbackVaryings are given.") : r.transformFeedbackVaryings(
    s,
    n.names,
    n.bufferMode === "separate" ? r.SEPARATE_ATTRIBS : r.INTERLEAVED_ATTRIBS
  )), r.linkProgram(s), r.getProgramParameter(s, r.LINK_STATUS) || Ed(r, s, e, i), t.attributeData = qd(s, r), t.uniformData = Kd(s, r), !/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(t.vertexSrc)) {
    const h = Object.keys(t.attributeData);
    h.sort((l, u) => l > u ? 1 : -1);
    for (let l = 0; l < h.length; l++)
      t.attributeData[h[l]].location = l, r.bindAttribLocation(s, l, h[l]);
    r.linkProgram(s);
  }
  r.deleteShader(e), r.deleteShader(i);
  const o = {};
  for (const h in t.uniformData) {
    const l = t.uniformData[h];
    o[h] = {
      location: r.getUniformLocation(s, h),
      value: va(l.type, l.size)
    };
  }
  return new Yd(s, o);
}
function Jd(r, t, e, i, s) {
  e.buffer.update(s);
}
const Qd = {
  float: `
        data[offset] = v;
    `,
  vec2: `
        data[offset] = v[0];
        data[offset+1] = v[1];
    `,
  vec3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

    `,
  vec4: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];
        data[offset+3] = v[3];
    `,
  mat2: `
        data[offset] = v[0];
        data[offset+1] = v[1];

        data[offset+4] = v[2];
        data[offset+5] = v[3];
    `,
  mat3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];

        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];
    `,
  mat4: `
        for(var i = 0; i < 16; i++)
        {
            data[offset + i] = v[i];
        }
    `
}, ka = {
  float: 4,
  vec2: 8,
  vec3: 12,
  vec4: 16,
  int: 4,
  ivec2: 8,
  ivec3: 12,
  ivec4: 16,
  uint: 4,
  uvec2: 8,
  uvec3: 12,
  uvec4: 16,
  bool: 4,
  bvec2: 8,
  bvec3: 12,
  bvec4: 16,
  mat2: 16 * 2,
  mat3: 16 * 3,
  mat4: 16 * 4
};
function tf(r) {
  const t = r.map((n) => ({
    data: n,
    offset: 0,
    dataLen: 0,
    dirty: 0
  }));
  let e = 0, i = 0, s = 0;
  for (let n = 0; n < t.length; n++) {
    const o = t[n];
    if (e = ka[o.data.type], o.data.size > 1 && (e = Math.max(e, 16) * o.data.size), o.dataLen = e, i % e !== 0 && i < 16) {
      const a = i % e % 16;
      i += a, s += a;
    }
    i + e > 16 ? (s = Math.ceil(s / 16) * 16, o.offset = s, s += e, i = e) : (o.offset = s, i += e, s += e);
  }
  return s = Math.ceil(s / 16) * 16, { uboElements: t, size: s };
}
function ef(r, t) {
  const e = [];
  for (const i in r)
    t[i] && e.push(t[i]);
  return e.sort((i, s) => i.index - s.index), e;
}
function rf(r, t) {
  if (!r.autoManage)
    return { size: 0, syncFunc: Jd };
  const e = ef(r.uniforms, t), { uboElements: i, size: s } = tf(e), n = [`
    var v = null;
    var v2 = null;
    var cv = null;
    var t = 0;
    var gl = renderer.gl
    var index = 0;
    var data = buffer.data;
    `];
  for (let o = 0; o < i.length; o++) {
    const a = i[o], h = r.uniforms[a.data.name], l = a.data.name;
    let u = !1;
    for (let c = 0; c < He.length; c++) {
      const d = He[c];
      if (d.codeUbo && d.test(a.data, h)) {
        n.push(
          `offset = ${a.offset / 4};`,
          He[c].codeUbo(a.data.name, h)
        ), u = !0;
        break;
      }
    }
    if (!u)
      if (a.data.size > 1) {
        const c = xa(a.data.type), d = Math.max(ka[a.data.type] / 16, 1), f = c / d, p = (4 - f % 4) % 4;
        n.push(`
                cv = ud.${l}.value;
                v = uv.${l};
                offset = ${a.offset / 4};

                t = 0;

                for(var i=0; i < ${a.data.size * d}; i++)
                {
                    for(var j = 0; j < ${f}; j++)
                    {
                        data[offset++] = v[t++];
                    }
                    offset += ${p};
                }

                `);
      } else {
        const c = Qd[a.data.type];
        n.push(`
                cv = ud.${l}.value;
                v = uv.${l};
                offset = ${a.offset / 4};
                ${c};
                `);
      }
  }
  return n.push(`
       renderer.buffer.update(buffer);
    `), {
    size: s,
    // eslint-disable-next-line no-new-func
    syncFunc: new Function(
      "ud",
      "uv",
      "renderer",
      "syncData",
      "buffer",
      n.join(`
`)
    )
  };
}
let sf = 0;
const $r = { textureCount: 0, uboCount: 0 };
class Ga {
  /** @param renderer - The renderer this System works for. */
  constructor(t) {
    this.destroyed = !1, this.renderer = t, this.systemCheck(), this.gl = null, this.shader = null, this.program = null, this.cache = {}, this._uboCache = {}, this.id = sf++;
  }
  /**
   * Overrideable function by `@pixi/unsafe-eval` to silence
   * throwing an error if platform doesn't support unsafe-evals.
   * @private
   */
  systemCheck() {
    if (!Id())
      throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.");
  }
  contextChange(t) {
    this.gl = t, this.reset();
  }
  /**
   * Changes the current shader to the one given in parameter.
   * @param shader - the new shader
   * @param dontSync - false if the shader should automatically sync its uniforms.
   * @returns the glProgram that belongs to the shader.
   */
  bind(t, e) {
    t.disposeRunner.add(this), t.uniforms.globals = this.renderer.globalUniforms;
    const i = t.program, s = i.glPrograms[this.renderer.CONTEXT_UID] || this.generateProgram(t);
    return this.shader = t, this.program !== i && (this.program = i, this.gl.useProgram(s.program)), e || ($r.textureCount = 0, $r.uboCount = 0, this.syncUniformGroup(t.uniformGroup, $r)), s;
  }
  /**
   * Uploads the uniforms values to the currently bound shader.
   * @param uniforms - the uniforms values that be applied to the current shader
   */
  setUniforms(t) {
    const e = this.shader.program, i = e.glPrograms[this.renderer.CONTEXT_UID];
    e.syncUniforms(i.uniformData, t, this.renderer);
  }
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  /**
   * Syncs uniforms on the group
   * @param group - the uniform group to sync
   * @param syncData - this is data that is passed to the sync function and any nested sync functions
   */
  syncUniformGroup(t, e) {
    const i = this.getGlProgram();
    (!t.static || t.dirtyId !== i.uniformDirtyGroups[t.id]) && (i.uniformDirtyGroups[t.id] = t.dirtyId, this.syncUniforms(t, i, e));
  }
  /**
   * Overrideable by the @pixi/unsafe-eval package to use static syncUniforms instead.
   * @param group
   * @param glProgram
   * @param syncData
   */
  syncUniforms(t, e, i) {
    (t.syncUniforms[this.shader.program.id] || this.createSyncGroups(t))(e.uniformData, t.uniforms, this.renderer, i);
  }
  createSyncGroups(t) {
    const e = this.getSignature(t, this.shader.program.uniformData, "u");
    return this.cache[e] || (this.cache[e] = xd(t, this.shader.program.uniformData)), t.syncUniforms[this.shader.program.id] = this.cache[e], t.syncUniforms[this.shader.program.id];
  }
  /**
   * Syncs uniform buffers
   * @param group - the uniform buffer group to sync
   * @param name - the name of the uniform buffer
   */
  syncUniformBufferGroup(t, e) {
    const i = this.getGlProgram();
    if (!t.static || t.dirtyId !== 0 || !i.uniformGroups[t.id]) {
      t.dirtyId = 0;
      const s = i.uniformGroups[t.id] || this.createSyncBufferGroup(t, i, e);
      t.buffer.update(), s(
        i.uniformData,
        t.uniforms,
        this.renderer,
        $r,
        t.buffer
      );
    }
    this.renderer.buffer.bindBufferBase(t.buffer, i.uniformBufferBindings[e]);
  }
  /**
   * Will create a function that uploads a uniform buffer using the STD140 standard.
   * The upload function will then be cached for future calls
   * If a group is manually managed, then a simple upload function is generated
   * @param group - the uniform buffer group to sync
   * @param glProgram - the gl program to attach the uniform bindings to
   * @param name - the name of the uniform buffer (must exist on the shader)
   */
  createSyncBufferGroup(t, e, i) {
    const { gl: s } = this.renderer;
    this.renderer.buffer.bind(t.buffer);
    const n = this.gl.getUniformBlockIndex(e.program, i);
    e.uniformBufferBindings[i] = this.shader.uniformBindCount, s.uniformBlockBinding(e.program, n, this.shader.uniformBindCount), this.shader.uniformBindCount++;
    const o = this.getSignature(t, this.shader.program.uniformData, "ubo");
    let a = this._uboCache[o];
    if (a || (a = this._uboCache[o] = rf(t, this.shader.program.uniformData)), t.autoManage) {
      const h = new Float32Array(a.size / 4);
      t.buffer.update(h);
    }
    return e.uniformGroups[t.id] = a.syncFunc, e.uniformGroups[t.id];
  }
  /**
   * Takes a uniform group and data and generates a unique signature for them.
   * @param group - The uniform group to get signature of
   * @param group.uniforms
   * @param uniformData - Uniform information generated by the shader
   * @param preFix
   * @returns Unique signature of the uniform group
   */
  getSignature(t, e, i) {
    const s = t.uniforms, n = [`${i}-`];
    for (const o in s)
      n.push(o), e[o] && n.push(e[o].type);
    return n.join("-");
  }
  /**
   * Returns the underlying GLShade rof the currently bound shader.
   *
   * This can be handy for when you to have a little more control over the setting of your uniforms.
   * @returns The glProgram for the currently bound Shader for this context
   */
  getGlProgram() {
    return this.shader ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID] : null;
  }
  /**
   * Generates a glProgram version of the Shader provided.
   * @param shader - The shader that the glProgram will be based on.
   * @returns A shiny new glProgram!
   */
  generateProgram(t) {
    const e = this.gl, i = t.program, s = Zd(e, i);
    return i.glPrograms[this.renderer.CONTEXT_UID] = s, s;
  }
  /** Resets ShaderSystem state, does not affect WebGL state. */
  reset() {
    this.program = null, this.shader = null;
  }
  /**
   * Disposes shader.
   * If disposing one equals with current shader, set current as null.
   * @param shader - Shader object
   */
  disposeShader(t) {
    this.shader === t && (this.shader = null);
  }
  /** Destroys this System and removes all its textures. */
  destroy() {
    this.renderer = null, this.destroyed = !0;
  }
}
Ga.extension = {
  type: N.RendererSystem,
  name: "shader"
};
B.add(Ga);
class fi {
  constructor(t) {
    this.renderer = t;
  }
  /**
   * It all starts here! This initiates every system, passing in the options for any system by name.
   * @param options - the config for the renderer and all its systems
   */
  run(t) {
    const { renderer: e } = this;
    e.runners.init.emit(e.options), t.hello && console.log(`PixiJS 7.4.2 - ${e.rendererLogId} - https://pixijs.com`), e.resize(e.screen.width, e.screen.height);
  }
  destroy() {
  }
}
fi.defaultOptions = {
  /**
   * {@link PIXI.IRendererOptions.hello}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  hello: !1
}, /** @ignore */
fi.extension = {
  type: [
    N.RendererSystem,
    N.CanvasRendererSystem
  ],
  name: "startup"
};
B.add(fi);
function nf(r, t = []) {
  return t[I.NORMAL] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[I.ADD] = [r.ONE, r.ONE], t[I.MULTIPLY] = [r.DST_COLOR, r.ONE_MINUS_SRC_ALPHA, r.ONE, r.ONE_MINUS_SRC_ALPHA], t[I.SCREEN] = [r.ONE, r.ONE_MINUS_SRC_COLOR, r.ONE, r.ONE_MINUS_SRC_ALPHA], t[I.OVERLAY] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[I.DARKEN] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[I.LIGHTEN] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[I.COLOR_DODGE] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[I.COLOR_BURN] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[I.HARD_LIGHT] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[I.SOFT_LIGHT] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[I.DIFFERENCE] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[I.EXCLUSION] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[I.HUE] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[I.SATURATION] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[I.COLOR] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[I.LUMINOSITY] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[I.NONE] = [0, 0], t[I.NORMAL_NPM] = [r.SRC_ALPHA, r.ONE_MINUS_SRC_ALPHA, r.ONE, r.ONE_MINUS_SRC_ALPHA], t[I.ADD_NPM] = [r.SRC_ALPHA, r.ONE, r.ONE, r.ONE], t[I.SCREEN_NPM] = [r.SRC_ALPHA, r.ONE_MINUS_SRC_COLOR, r.ONE, r.ONE_MINUS_SRC_ALPHA], t[I.SRC_IN] = [r.DST_ALPHA, r.ZERO], t[I.SRC_OUT] = [r.ONE_MINUS_DST_ALPHA, r.ZERO], t[I.SRC_ATOP] = [r.DST_ALPHA, r.ONE_MINUS_SRC_ALPHA], t[I.DST_OVER] = [r.ONE_MINUS_DST_ALPHA, r.ONE], t[I.DST_IN] = [r.ZERO, r.SRC_ALPHA], t[I.DST_OUT] = [r.ZERO, r.ONE_MINUS_SRC_ALPHA], t[I.DST_ATOP] = [r.ONE_MINUS_DST_ALPHA, r.SRC_ALPHA], t[I.XOR] = [r.ONE_MINUS_DST_ALPHA, r.ONE_MINUS_SRC_ALPHA], t[I.SUBTRACT] = [r.ONE, r.ONE, r.ONE, r.ONE, r.FUNC_REVERSE_SUBTRACT, r.FUNC_ADD], t;
}
const of = 0, af = 1, hf = 2, lf = 3, uf = 4, cf = 5, Da = class Os {
  constructor() {
    this.gl = null, this.stateId = 0, this.polygonOffset = 0, this.blendMode = I.NONE, this._blendEq = !1, this.map = [], this.map[of] = this.setBlend, this.map[af] = this.setOffset, this.map[hf] = this.setCullFace, this.map[lf] = this.setDepthTest, this.map[uf] = this.setFrontFace, this.map[cf] = this.setDepthMask, this.checks = [], this.defaultState = new Je(), this.defaultState.blend = !0;
  }
  contextChange(t) {
    this.gl = t, this.blendModes = nf(t), this.set(this.defaultState), this.reset();
  }
  /**
   * Sets the current state
   * @param {*} state - The state to set.
   */
  set(t) {
    if (t = t || this.defaultState, this.stateId !== t.data) {
      let e = this.stateId ^ t.data, i = 0;
      for (; e; )
        e & 1 && this.map[i].call(this, !!(t.data & 1 << i)), e = e >> 1, i++;
      this.stateId = t.data;
    }
    for (let e = 0; e < this.checks.length; e++)
      this.checks[e](this, t);
  }
  /**
   * Sets the state, when previous state is unknown.
   * @param {*} state - The state to set
   */
  forceState(t) {
    t = t || this.defaultState;
    for (let e = 0; e < this.map.length; e++)
      this.map[e].call(this, !!(t.data & 1 << e));
    for (let e = 0; e < this.checks.length; e++)
      this.checks[e](this, t);
    this.stateId = t.data;
  }
  /**
   * Sets whether to enable or disable blending.
   * @param value - Turn on or off WebGl blending.
   */
  setBlend(t) {
    this.updateCheck(Os.checkBlendMode, t), this.gl[t ? "enable" : "disable"](this.gl.BLEND);
  }
  /**
   * Sets whether to enable or disable polygon offset fill.
   * @param value - Turn on or off webgl polygon offset testing.
   */
  setOffset(t) {
    this.updateCheck(Os.checkPolygonOffset, t), this.gl[t ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL);
  }
  /**
   * Sets whether to enable or disable depth test.
   * @param value - Turn on or off webgl depth testing.
   */
  setDepthTest(t) {
    this.gl[t ? "enable" : "disable"](this.gl.DEPTH_TEST);
  }
  /**
   * Sets whether to enable or disable depth mask.
   * @param value - Turn on or off webgl depth mask.
   */
  setDepthMask(t) {
    this.gl.depthMask(t);
  }
  /**
   * Sets whether to enable or disable cull face.
   * @param {boolean} value - Turn on or off webgl cull face.
   */
  setCullFace(t) {
    this.gl[t ? "enable" : "disable"](this.gl.CULL_FACE);
  }
  /**
   * Sets the gl front face.
   * @param {boolean} value - true is clockwise and false is counter-clockwise
   */
  setFrontFace(t) {
    this.gl.frontFace(this.gl[t ? "CW" : "CCW"]);
  }
  /**
   * Sets the blend mode.
   * @param {number} value - The blend mode to set to.
   */
  setBlendMode(t) {
    if (t === this.blendMode)
      return;
    this.blendMode = t;
    const e = this.blendModes[t], i = this.gl;
    e.length === 2 ? i.blendFunc(e[0], e[1]) : i.blendFuncSeparate(e[0], e[1], e[2], e[3]), e.length === 6 ? (this._blendEq = !0, i.blendEquationSeparate(e[4], e[5])) : this._blendEq && (this._blendEq = !1, i.blendEquationSeparate(i.FUNC_ADD, i.FUNC_ADD));
  }
  /**
   * Sets the polygon offset.
   * @param {number} value - the polygon offset
   * @param {number} scale - the polygon offset scale
   */
  setPolygonOffset(t, e) {
    this.gl.polygonOffset(t, e);
  }
  // used
  /** Resets all the logic and disables the VAOs. */
  reset() {
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1), this.forceState(this.defaultState), this._blendEq = !0, this.blendMode = -1, this.setBlendMode(0);
  }
  /**
   * Checks to see which updates should be checked based on which settings have been activated.
   *
   * For example, if blend is enabled then we should check the blend modes each time the state is changed
   * or if polygon fill is activated then we need to check if the polygon offset changes.
   * The idea is that we only check what we have too.
   * @param func - the checking function to add or remove
   * @param value - should the check function be added or removed.
   */
  updateCheck(t, e) {
    const i = this.checks.indexOf(t);
    e && i === -1 ? this.checks.push(t) : !e && i !== -1 && this.checks.splice(i, 1);
  }
  /**
   * A private little wrapper function that we call to check the blend mode.
   * @param system - the System to perform the state check on
   * @param state - the state that the blendMode will pulled from
   */
  static checkBlendMode(t, e) {
    t.setBlendMode(e.blendMode);
  }
  /**
   * A private little wrapper function that we call to check the polygon offset.
   * @param system - the System to perform the state check on
   * @param state - the state that the blendMode will pulled from
   */
  static checkPolygonOffset(t, e) {
    t.setPolygonOffset(1, e.polygonOffset);
  }
  /**
   * @ignore
   */
  destroy() {
    this.gl = null;
  }
};
Da.extension = {
  type: N.RendererSystem,
  name: "state"
};
let df = Da;
B.add(df);
class ff extends Ie {
  constructor() {
    super(...arguments), this.runners = {}, this._systemsHash = {};
  }
  /**
   * Set up a system with a collection of SystemClasses and runners.
   * Systems are attached dynamically to this class when added.
   * @param config - the config for the system manager
   */
  setup(t) {
    this.addRunners(...t.runners);
    const e = (t.priority ?? []).filter((s) => t.systems[s]), i = [
      ...e,
      ...Object.keys(t.systems).filter((s) => !e.includes(s))
    ];
    for (const s of i)
      this.addSystem(t.systems[s], s);
  }
  /**
   * Create a bunch of runners based of a collection of ids
   * @param runnerIds - the runner ids to add
   */
  addRunners(...t) {
    t.forEach((e) => {
      this.runners[e] = new Nt(e);
    });
  }
  /**
   * Add a new system to the renderer.
   * @param ClassRef - Class reference
   * @param name - Property name for system, if not specified
   *        will use a static `name` property on the class itself. This
   *        name will be assigned as s property on the Renderer so make
   *        sure it doesn't collide with properties on Renderer.
   * @returns Return instance of renderer
   */
  addSystem(t, e) {
    const i = new t(this);
    if (this[e])
      throw new Error(`Whoops! The name "${e}" is already in use`);
    this[e] = i, this._systemsHash[e] = i;
    for (const s in this.runners)
      this.runners[s].add(i);
    return this;
  }
  /**
   * A function that will run a runner and call the runners function but pass in different options
   * to each system based on there name.
   *
   * E.g. If you have two systems added called `systemA` and `systemB` you could call do the following:
   *
   * ```js
   * system.emitWithCustomOptions(init, {
   *     systemA: {...optionsForA},
   *     systemB: {...optionsForB},
   * });
   * ```
   *
   * `init` would be called on system A passing `optionsForA` and on system B passing `optionsForB`.
   * @param runner - the runner to target
   * @param options - key value options for each system
   */
  emitWithCustomOptions(t, e) {
    const i = Object.keys(this._systemsHash);
    t.items.forEach((s) => {
      const n = i.find((o) => this._systemsHash[o] === s);
      s[t.name](e[n]);
    });
  }
  /** destroy the all runners and systems. Its apps job to */
  destroy() {
    Object.values(this.runners).forEach((t) => {
      t.destroy();
    }), this._systemsHash = {};
  }
  // TODO implement!
  // removeSystem(ClassRef: ISystemConstructor, name: string): void
  // {
  // }
}
const ar = class Yr {
  /** @param renderer - The renderer this System works for. */
  constructor(t) {
    this.renderer = t, this.count = 0, this.checkCount = 0, this.maxIdle = Yr.defaultMaxIdle, this.checkCountMax = Yr.defaultCheckCountMax, this.mode = Yr.defaultMode;
  }
  /**
   * Checks to see when the last time a texture was used.
   * If the texture has not been used for a specified amount of time, it will be removed from the GPU.
   */
  postrender() {
    this.renderer.objectRenderer.renderingToScreen && (this.count++, this.mode !== js.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run())));
  }
  /**
   * Checks to see when the last time a texture was used.
   * If the texture has not been used for a specified amount of time, it will be removed from the GPU.
   */
  run() {
    const t = this.renderer.texture, e = t.managedTextures;
    let i = !1;
    for (let s = 0; s < e.length; s++) {
      const n = e[s];
      n.resource && this.count - n.touched > this.maxIdle && (t.destroyTexture(n, !0), e[s] = null, i = !0);
    }
    if (i) {
      let s = 0;
      for (let n = 0; n < e.length; n++)
        e[n] !== null && (e[s++] = e[n]);
      e.length = s;
    }
  }
  /**
   * Removes all the textures within the specified displayObject and its children from the GPU.
   * @param {PIXI.DisplayObject} displayObject - the displayObject to remove the textures from.
   */
  unload(t) {
    const e = this.renderer.texture, i = t._texture;
    i && !i.framebuffer && e.destroyTexture(i);
    for (let s = t.children.length - 1; s >= 0; s--)
      this.unload(t.children[s]);
  }
  destroy() {
    this.renderer = null;
  }
};
ar.defaultMode = js.AUTO, /**
* Default maximum idle frames before a texture is destroyed by garbage collection.
* @static
* @default 3600
* @see PIXI.TextureGCSystem#maxIdle
*/
ar.defaultMaxIdle = 60 * 60, /**
* Default frames between two garbage collections.
* @static
* @default 600
* @see PIXI.TextureGCSystem#checkCountMax
*/
ar.defaultCheckCountMax = 60 * 10, /** @ignore */
ar.extension = {
  type: N.RendererSystem,
  name: "textureGC"
};
let pe = ar;
B.add(pe);
class ns {
  constructor(t) {
    this.texture = t, this.width = -1, this.height = -1, this.dirtyId = -1, this.dirtyStyleId = -1, this.mipmap = !1, this.wrapMode = 33071, this.type = F.UNSIGNED_BYTE, this.internalFormat = x.RGBA, this.samplerType = 0;
  }
}
function pf(r) {
  let t;
  return "WebGL2RenderingContext" in globalThis && r instanceof globalThis.WebGL2RenderingContext ? t = {
    [r.RGB]: b.FLOAT,
    [r.RGBA]: b.FLOAT,
    [r.ALPHA]: b.FLOAT,
    [r.LUMINANCE]: b.FLOAT,
    [r.LUMINANCE_ALPHA]: b.FLOAT,
    [r.R8]: b.FLOAT,
    [r.R8_SNORM]: b.FLOAT,
    [r.RG8]: b.FLOAT,
    [r.RG8_SNORM]: b.FLOAT,
    [r.RGB8]: b.FLOAT,
    [r.RGB8_SNORM]: b.FLOAT,
    [r.RGB565]: b.FLOAT,
    [r.RGBA4]: b.FLOAT,
    [r.RGB5_A1]: b.FLOAT,
    [r.RGBA8]: b.FLOAT,
    [r.RGBA8_SNORM]: b.FLOAT,
    [r.RGB10_A2]: b.FLOAT,
    [r.RGB10_A2UI]: b.FLOAT,
    [r.SRGB8]: b.FLOAT,
    [r.SRGB8_ALPHA8]: b.FLOAT,
    [r.R16F]: b.FLOAT,
    [r.RG16F]: b.FLOAT,
    [r.RGB16F]: b.FLOAT,
    [r.RGBA16F]: b.FLOAT,
    [r.R32F]: b.FLOAT,
    [r.RG32F]: b.FLOAT,
    [r.RGB32F]: b.FLOAT,
    [r.RGBA32F]: b.FLOAT,
    [r.R11F_G11F_B10F]: b.FLOAT,
    [r.RGB9_E5]: b.FLOAT,
    [r.R8I]: b.INT,
    [r.R8UI]: b.UINT,
    [r.R16I]: b.INT,
    [r.R16UI]: b.UINT,
    [r.R32I]: b.INT,
    [r.R32UI]: b.UINT,
    [r.RG8I]: b.INT,
    [r.RG8UI]: b.UINT,
    [r.RG16I]: b.INT,
    [r.RG16UI]: b.UINT,
    [r.RG32I]: b.INT,
    [r.RG32UI]: b.UINT,
    [r.RGB8I]: b.INT,
    [r.RGB8UI]: b.UINT,
    [r.RGB16I]: b.INT,
    [r.RGB16UI]: b.UINT,
    [r.RGB32I]: b.INT,
    [r.RGB32UI]: b.UINT,
    [r.RGBA8I]: b.INT,
    [r.RGBA8UI]: b.UINT,
    [r.RGBA16I]: b.INT,
    [r.RGBA16UI]: b.UINT,
    [r.RGBA32I]: b.INT,
    [r.RGBA32UI]: b.UINT,
    [r.DEPTH_COMPONENT16]: b.FLOAT,
    [r.DEPTH_COMPONENT24]: b.FLOAT,
    [r.DEPTH_COMPONENT32F]: b.FLOAT,
    [r.DEPTH_STENCIL]: b.FLOAT,
    [r.DEPTH24_STENCIL8]: b.FLOAT,
    [r.DEPTH32F_STENCIL8]: b.FLOAT
  } : t = {
    [r.RGB]: b.FLOAT,
    [r.RGBA]: b.FLOAT,
    [r.ALPHA]: b.FLOAT,
    [r.LUMINANCE]: b.FLOAT,
    [r.LUMINANCE_ALPHA]: b.FLOAT,
    [r.DEPTH_STENCIL]: b.FLOAT
  }, t;
}
function mf(r) {
  let t;
  return "WebGL2RenderingContext" in globalThis && r instanceof globalThis.WebGL2RenderingContext ? t = {
    [F.UNSIGNED_BYTE]: {
      [x.RGBA]: r.RGBA8,
      [x.RGB]: r.RGB8,
      [x.RG]: r.RG8,
      [x.RED]: r.R8,
      [x.RGBA_INTEGER]: r.RGBA8UI,
      [x.RGB_INTEGER]: r.RGB8UI,
      [x.RG_INTEGER]: r.RG8UI,
      [x.RED_INTEGER]: r.R8UI,
      [x.ALPHA]: r.ALPHA,
      [x.LUMINANCE]: r.LUMINANCE,
      [x.LUMINANCE_ALPHA]: r.LUMINANCE_ALPHA
    },
    [F.BYTE]: {
      [x.RGBA]: r.RGBA8_SNORM,
      [x.RGB]: r.RGB8_SNORM,
      [x.RG]: r.RG8_SNORM,
      [x.RED]: r.R8_SNORM,
      [x.RGBA_INTEGER]: r.RGBA8I,
      [x.RGB_INTEGER]: r.RGB8I,
      [x.RG_INTEGER]: r.RG8I,
      [x.RED_INTEGER]: r.R8I
    },
    [F.UNSIGNED_SHORT]: {
      [x.RGBA_INTEGER]: r.RGBA16UI,
      [x.RGB_INTEGER]: r.RGB16UI,
      [x.RG_INTEGER]: r.RG16UI,
      [x.RED_INTEGER]: r.R16UI,
      [x.DEPTH_COMPONENT]: r.DEPTH_COMPONENT16
    },
    [F.SHORT]: {
      [x.RGBA_INTEGER]: r.RGBA16I,
      [x.RGB_INTEGER]: r.RGB16I,
      [x.RG_INTEGER]: r.RG16I,
      [x.RED_INTEGER]: r.R16I
    },
    [F.UNSIGNED_INT]: {
      [x.RGBA_INTEGER]: r.RGBA32UI,
      [x.RGB_INTEGER]: r.RGB32UI,
      [x.RG_INTEGER]: r.RG32UI,
      [x.RED_INTEGER]: r.R32UI,
      [x.DEPTH_COMPONENT]: r.DEPTH_COMPONENT24
    },
    [F.INT]: {
      [x.RGBA_INTEGER]: r.RGBA32I,
      [x.RGB_INTEGER]: r.RGB32I,
      [x.RG_INTEGER]: r.RG32I,
      [x.RED_INTEGER]: r.R32I
    },
    [F.FLOAT]: {
      [x.RGBA]: r.RGBA32F,
      [x.RGB]: r.RGB32F,
      [x.RG]: r.RG32F,
      [x.RED]: r.R32F,
      [x.DEPTH_COMPONENT]: r.DEPTH_COMPONENT32F
    },
    [F.HALF_FLOAT]: {
      [x.RGBA]: r.RGBA16F,
      [x.RGB]: r.RGB16F,
      [x.RG]: r.RG16F,
      [x.RED]: r.R16F
    },
    [F.UNSIGNED_SHORT_5_6_5]: {
      [x.RGB]: r.RGB565
    },
    [F.UNSIGNED_SHORT_4_4_4_4]: {
      [x.RGBA]: r.RGBA4
    },
    [F.UNSIGNED_SHORT_5_5_5_1]: {
      [x.RGBA]: r.RGB5_A1
    },
    [F.UNSIGNED_INT_2_10_10_10_REV]: {
      [x.RGBA]: r.RGB10_A2,
      [x.RGBA_INTEGER]: r.RGB10_A2UI
    },
    [F.UNSIGNED_INT_10F_11F_11F_REV]: {
      [x.RGB]: r.R11F_G11F_B10F
    },
    [F.UNSIGNED_INT_5_9_9_9_REV]: {
      [x.RGB]: r.RGB9_E5
    },
    [F.UNSIGNED_INT_24_8]: {
      [x.DEPTH_STENCIL]: r.DEPTH24_STENCIL8
    },
    [F.FLOAT_32_UNSIGNED_INT_24_8_REV]: {
      [x.DEPTH_STENCIL]: r.DEPTH32F_STENCIL8
    }
  } : t = {
    [F.UNSIGNED_BYTE]: {
      [x.RGBA]: r.RGBA,
      [x.RGB]: r.RGB,
      [x.ALPHA]: r.ALPHA,
      [x.LUMINANCE]: r.LUMINANCE,
      [x.LUMINANCE_ALPHA]: r.LUMINANCE_ALPHA
    },
    [F.UNSIGNED_SHORT_5_6_5]: {
      [x.RGB]: r.RGB
    },
    [F.UNSIGNED_SHORT_4_4_4_4]: {
      [x.RGBA]: r.RGBA
    },
    [F.UNSIGNED_SHORT_5_5_5_1]: {
      [x.RGBA]: r.RGBA
    }
  }, t;
}
class $a {
  /**
   * @param renderer - The renderer this system works for.
   */
  constructor(t) {
    this.renderer = t, this.boundTextures = [], this.currentLocation = -1, this.managedTextures = [], this._unknownBoundTextures = !1, this.unknownTexture = new D(), this.hasIntegerTextures = !1;
  }
  /** Sets up the renderer context and necessary buffers. */
  contextChange() {
    const t = this.gl = this.renderer.gl;
    this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.webGLVersion = this.renderer.context.webGLVersion, this.internalFormats = mf(t), this.samplerTypes = pf(t);
    const e = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);
    this.boundTextures.length = e;
    for (let s = 0; s < e; s++)
      this.boundTextures[s] = null;
    this.emptyTextures = {};
    const i = new ns(t.createTexture());
    t.bindTexture(t.TEXTURE_2D, i.texture), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array(4)), this.emptyTextures[t.TEXTURE_2D] = i, this.emptyTextures[t.TEXTURE_CUBE_MAP] = new ns(t.createTexture()), t.bindTexture(t.TEXTURE_CUBE_MAP, this.emptyTextures[t.TEXTURE_CUBE_MAP].texture);
    for (let s = 0; s < 6; s++)
      t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + s, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, null);
    t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MIN_FILTER, t.LINEAR);
    for (let s = 0; s < this.boundTextures.length; s++)
      this.bind(null, s);
  }
  /**
   * Bind a texture to a specific location
   *
   * If you want to unbind something, please use `unbind(texture)` instead of `bind(null, textureLocation)`
   * @param texture - Texture to bind
   * @param [location=0] - Location to bind at
   */
  bind(t, e = 0) {
    const { gl: i } = this;
    if (t = t == null ? void 0 : t.castToBaseTexture(), (t == null ? void 0 : t.valid) && !t.parentTextureArray) {
      t.touched = this.renderer.textureGC.count;
      const s = t._glTextures[this.CONTEXT_UID] || this.initTexture(t);
      this.boundTextures[e] !== t && (this.currentLocation !== e && (this.currentLocation = e, i.activeTexture(i.TEXTURE0 + e)), i.bindTexture(t.target, s.texture)), s.dirtyId !== t.dirtyId ? (this.currentLocation !== e && (this.currentLocation = e, i.activeTexture(i.TEXTURE0 + e)), this.updateTexture(t)) : s.dirtyStyleId !== t.dirtyStyleId && this.updateTextureStyle(t), this.boundTextures[e] = t;
    } else
      this.currentLocation !== e && (this.currentLocation = e, i.activeTexture(i.TEXTURE0 + e)), i.bindTexture(i.TEXTURE_2D, this.emptyTextures[i.TEXTURE_2D].texture), this.boundTextures[e] = null;
  }
  /** Resets texture location and bound textures Actual `bind(null, i)` calls will be performed at next `unbind()` call */
  reset() {
    this._unknownBoundTextures = !0, this.hasIntegerTextures = !1, this.currentLocation = -1;
    for (let t = 0; t < this.boundTextures.length; t++)
      this.boundTextures[t] = this.unknownTexture;
  }
  /**
   * Unbind a texture.
   * @param texture - Texture to bind
   */
  unbind(t) {
    const { gl: e, boundTextures: i } = this;
    if (this._unknownBoundTextures) {
      this._unknownBoundTextures = !1;
      for (let s = 0; s < i.length; s++)
        i[s] === this.unknownTexture && this.bind(null, s);
    }
    for (let s = 0; s < i.length; s++)
      i[s] === t && (this.currentLocation !== s && (e.activeTexture(e.TEXTURE0 + s), this.currentLocation = s), e.bindTexture(t.target, this.emptyTextures[t.target].texture), i[s] = null);
  }
  /**
   * Ensures that current boundTextures all have FLOAT sampler type,
   * see {@link PIXI.SAMPLER_TYPES} for explanation.
   * @param maxTextures - number of locations to check
   */
  ensureSamplerType(t) {
    const { boundTextures: e, hasIntegerTextures: i, CONTEXT_UID: s } = this;
    if (i)
      for (let n = t - 1; n >= 0; --n) {
        const o = e[n];
        o && o._glTextures[s].samplerType !== b.FLOAT && this.renderer.texture.unbind(o);
      }
  }
  /**
   * Initialize a texture
   * @private
   * @param texture - Texture to initialize
   */
  initTexture(t) {
    const e = new ns(this.gl.createTexture());
    return e.dirtyId = -1, t._glTextures[this.CONTEXT_UID] = e, this.managedTextures.push(t), t.on("dispose", this.destroyTexture, this), e;
  }
  initTextureType(t, e) {
    var i;
    e.internalFormat = ((i = this.internalFormats[t.type]) == null ? void 0 : i[t.format]) ?? t.format, e.samplerType = this.samplerTypes[e.internalFormat] ?? b.FLOAT, this.webGLVersion === 2 && t.type === F.HALF_FLOAT ? e.type = this.gl.HALF_FLOAT : e.type = t.type;
  }
  /**
   * Update a texture
   * @private
   * @param {PIXI.BaseTexture} texture - Texture to initialize
   */
  updateTexture(t) {
    var s;
    const e = t._glTextures[this.CONTEXT_UID];
    if (!e)
      return;
    const i = this.renderer;
    if (this.initTextureType(t, e), (s = t.resource) == null ? void 0 : s.upload(i, t, e))
      e.samplerType !== b.FLOAT && (this.hasIntegerTextures = !0);
    else {
      const n = t.realWidth, o = t.realHeight, a = i.gl;
      (e.width !== n || e.height !== o || e.dirtyId < 0) && (e.width = n, e.height = o, a.texImage2D(
        t.target,
        0,
        e.internalFormat,
        n,
        o,
        0,
        t.format,
        e.type,
        null
      ));
    }
    t.dirtyStyleId !== e.dirtyStyleId && this.updateTextureStyle(t), e.dirtyId = t.dirtyId;
  }
  /**
   * Deletes the texture from WebGL
   * @private
   * @param texture - the texture to destroy
   * @param [skipRemove=false] - Whether to skip removing the texture from the TextureManager.
   */
  destroyTexture(t, e) {
    const { gl: i } = this;
    if (t = t.castToBaseTexture(), t._glTextures[this.CONTEXT_UID] && (this.unbind(t), i.deleteTexture(t._glTextures[this.CONTEXT_UID].texture), t.off("dispose", this.destroyTexture, this), delete t._glTextures[this.CONTEXT_UID], !e)) {
      const s = this.managedTextures.indexOf(t);
      s !== -1 && zr(this.managedTextures, s, 1);
    }
  }
  /**
   * Update texture style such as mipmap flag
   * @private
   * @param {PIXI.BaseTexture} texture - Texture to update
   */
  updateTextureStyle(t) {
    var i;
    const e = t._glTextures[this.CONTEXT_UID];
    e && ((t.mipmap === be.POW2 || this.webGLVersion !== 2) && !t.isPowerOfTwo ? e.mipmap = !1 : e.mipmap = t.mipmap >= 1, this.webGLVersion !== 2 && !t.isPowerOfTwo ? e.wrapMode = Vs.CLAMP : e.wrapMode = t.wrapMode, (i = t.resource) != null && i.style(this.renderer, t, e) || this.setStyle(t, e), e.dirtyStyleId = t.dirtyStyleId);
  }
  /**
   * Set style for texture
   * @private
   * @param texture - Texture to update
   * @param glTexture
   */
  setStyle(t, e) {
    const i = this.gl;
    if (e.mipmap && t.mipmap !== be.ON_MANUAL && i.generateMipmap(t.target), i.texParameteri(t.target, i.TEXTURE_WRAP_S, e.wrapMode), i.texParameteri(t.target, i.TEXTURE_WRAP_T, e.wrapMode), e.mipmap) {
      i.texParameteri(t.target, i.TEXTURE_MIN_FILTER, t.scaleMode === jt.LINEAR ? i.LINEAR_MIPMAP_LINEAR : i.NEAREST_MIPMAP_NEAREST);
      const s = this.renderer.context.extensions.anisotropicFiltering;
      if (s && t.anisotropicLevel > 0 && t.scaleMode === jt.LINEAR) {
        const n = Math.min(t.anisotropicLevel, i.getParameter(s.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
        i.texParameterf(t.target, s.TEXTURE_MAX_ANISOTROPY_EXT, n);
      }
    } else
      i.texParameteri(t.target, i.TEXTURE_MIN_FILTER, t.scaleMode === jt.LINEAR ? i.LINEAR : i.NEAREST);
    i.texParameteri(t.target, i.TEXTURE_MAG_FILTER, t.scaleMode === jt.LINEAR ? i.LINEAR : i.NEAREST);
  }
  destroy() {
    this.renderer = null;
  }
}
$a.extension = {
  type: N.RendererSystem,
  name: "texture"
};
B.add($a);
class Ha {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(t) {
    this.renderer = t;
  }
  /** Sets up the renderer context and necessary buffers. */
  contextChange() {
    this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID;
  }
  /**
   * Bind TransformFeedback and buffers
   * @param transformFeedback - TransformFeedback to bind
   */
  bind(t) {
    const { gl: e, CONTEXT_UID: i } = this, s = t._glTransformFeedbacks[i] || this.createGLTransformFeedback(t);
    e.bindTransformFeedback(e.TRANSFORM_FEEDBACK, s);
  }
  /** Unbind TransformFeedback */
  unbind() {
    const { gl: t } = this;
    t.bindTransformFeedback(t.TRANSFORM_FEEDBACK, null);
  }
  /**
   * Begin TransformFeedback
   * @param drawMode - DrawMode for TransformFeedback
   * @param shader - A Shader used by TransformFeedback. Current bound shader will be used if not provided.
   */
  beginTransformFeedback(t, e) {
    const { gl: i, renderer: s } = this;
    e && s.shader.bind(e), i.beginTransformFeedback(t);
  }
  /** End TransformFeedback */
  endTransformFeedback() {
    const { gl: t } = this;
    t.endTransformFeedback();
  }
  /**
   * Create TransformFeedback and bind buffers
   * @param tf - TransformFeedback
   * @returns WebGLTransformFeedback
   */
  createGLTransformFeedback(t) {
    const { gl: e, renderer: i, CONTEXT_UID: s } = this, n = e.createTransformFeedback();
    t._glTransformFeedbacks[s] = n, e.bindTransformFeedback(e.TRANSFORM_FEEDBACK, n);
    for (let o = 0; o < t.buffers.length; o++) {
      const a = t.buffers[o];
      a && (i.buffer.update(a), a._glBuffers[s].refCount++, e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER, o, a._glBuffers[s].buffer || null));
    }
    return e.bindTransformFeedback(e.TRANSFORM_FEEDBACK, null), t.disposeRunner.add(this), n;
  }
  /**
   * Disposes TransfromFeedback
   * @param {PIXI.TransformFeedback} tf - TransformFeedback
   * @param {boolean} [contextLost=false] - If context was lost, we suppress delete TransformFeedback
   */
  disposeTransformFeedback(t, e) {
    const i = t._glTransformFeedbacks[this.CONTEXT_UID], s = this.gl;
    t.disposeRunner.remove(this);
    const n = this.renderer.buffer;
    if (n)
      for (let o = 0; o < t.buffers.length; o++) {
        const a = t.buffers[o];
        if (!a)
          continue;
        const h = a._glBuffers[this.CONTEXT_UID];
        h && (h.refCount--, h.refCount === 0 && !e && n.dispose(a, e));
      }
    i && (e || s.deleteTransformFeedback(i), delete t._glTransformFeedbacks[this.CONTEXT_UID]);
  }
  destroy() {
    this.renderer = null;
  }
}
Ha.extension = {
  type: N.RendererSystem,
  name: "transformFeedback"
};
B.add(Ha);
class pi {
  constructor(t) {
    this.renderer = t;
  }
  /**
   * initiates the view system
   * @param {PIXI.ViewOptions} options - the options for the view
   */
  init(t) {
    this.screen = new H(0, 0, t.width, t.height), this.element = t.view || L.ADAPTER.createCanvas(), this.resolution = t.resolution || L.RESOLUTION, this.autoDensity = !!t.autoDensity;
  }
  /**
   * Resizes the screen and canvas to the specified dimensions.
   * @param desiredScreenWidth - The new width of the screen.
   * @param desiredScreenHeight - The new height of the screen.
   */
  resizeView(t, e) {
    this.element.width = Math.round(t * this.resolution), this.element.height = Math.round(e * this.resolution);
    const i = this.element.width / this.resolution, s = this.element.height / this.resolution;
    this.screen.width = i, this.screen.height = s, this.autoDensity && (this.element.style.width = `${i}px`, this.element.style.height = `${s}px`), this.renderer.emit("resize", i, s), this.renderer.runners.resize.emit(this.screen.width, this.screen.height);
  }
  /**
   * Destroys this System and optionally removes the canvas from the dom.
   * @param {boolean} [removeView=false] - Whether to remove the canvas from the DOM.
   */
  destroy(t) {
    var e;
    t && ((e = this.element.parentNode) == null || e.removeChild(this.element)), this.renderer = null, this.element = null, this.screen = null;
  }
}
pi.defaultOptions = {
  /**
   * {@link PIXI.IRendererOptions.width}
   * @default 800
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  width: 800,
  /**
   * {@link PIXI.IRendererOptions.height}
   * @default 600
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  height: 600,
  /**
   * {@link PIXI.IRendererOptions.resolution}
   * @type {number}
   * @default PIXI.settings.RESOLUTION
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  resolution: void 0,
  /**
   * {@link PIXI.IRendererOptions.autoDensity}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  autoDensity: !1
}, /** @ignore */
pi.extension = {
  type: [
    N.RendererSystem,
    N.CanvasRendererSystem
  ],
  name: "_view"
};
B.add(pi);
L.PREFER_ENV = Ee.WEBGL2;
L.STRICT_TEXTURE_CACHE = !1;
L.RENDER_OPTIONS = {
  ...di.defaultOptions,
  ...ci.defaultOptions,
  ...pi.defaultOptions,
  ...fi.defaultOptions
};
Object.defineProperties(L, {
  /**
   * @static
   * @name WRAP_MODE
   * @memberof PIXI.settings
   * @type {PIXI.WRAP_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.wrapMode
   */
  WRAP_MODE: {
    get() {
      return D.defaultOptions.wrapMode;
    },
    set(r) {
      O("7.1.0", "settings.WRAP_MODE is deprecated, use BaseTexture.defaultOptions.wrapMode"), D.defaultOptions.wrapMode = r;
    }
  },
  /**
   * @static
   * @name SCALE_MODE
   * @memberof PIXI.settings
   * @type {PIXI.SCALE_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.scaleMode
   */
  SCALE_MODE: {
    get() {
      return D.defaultOptions.scaleMode;
    },
    set(r) {
      O("7.1.0", "settings.SCALE_MODE is deprecated, use BaseTexture.defaultOptions.scaleMode"), D.defaultOptions.scaleMode = r;
    }
  },
  /**
   * @static
   * @name MIPMAP_TEXTURES
   * @memberof PIXI.settings
   * @type {PIXI.MIPMAP_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.mipmap
   */
  MIPMAP_TEXTURES: {
    get() {
      return D.defaultOptions.mipmap;
    },
    set(r) {
      O("7.1.0", "settings.MIPMAP_TEXTURES is deprecated, use BaseTexture.defaultOptions.mipmap"), D.defaultOptions.mipmap = r;
    }
    // MIPMAP_MODES.POW2,
  },
  /**
   * @static
   * @name ANISOTROPIC_LEVEL
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.anisotropicLevel
   */
  ANISOTROPIC_LEVEL: {
    get() {
      return D.defaultOptions.anisotropicLevel;
    },
    set(r) {
      O(
        "7.1.0",
        "settings.ANISOTROPIC_LEVEL is deprecated, use BaseTexture.defaultOptions.anisotropicLevel"
      ), D.defaultOptions.anisotropicLevel = r;
    }
  },
  /**
   * Default filter resolution.
   * @static
   * @name FILTER_RESOLUTION
   * @memberof PIXI.settings
   * @deprecated since 7.1.0
   * @type {number|null}
   * @see PIXI.Filter.defaultResolution
   */
  FILTER_RESOLUTION: {
    get() {
      return O("7.1.0", "settings.FILTER_RESOLUTION is deprecated, use Filter.defaultResolution"), Be.defaultResolution;
    },
    set(r) {
      Be.defaultResolution = r;
    }
  },
  /**
   * Default filter samples.
   * @static
   * @name FILTER_MULTISAMPLE
   * @memberof PIXI.settings
   * @deprecated since 7.1.0
   * @type {PIXI.MSAA_QUALITY}
   * @see PIXI.Filter.defaultMultisample
   */
  FILTER_MULTISAMPLE: {
    get() {
      return O("7.1.0", "settings.FILTER_MULTISAMPLE is deprecated, use Filter.defaultMultisample"), Be.defaultMultisample;
    },
    set(r) {
      Be.defaultMultisample = r;
    }
  },
  /**
   * The maximum textures that this device supports.
   * @static
   * @name SPRITE_MAX_TEXTURES
   * @memberof PIXI.settings
   * @deprecated since 7.1.0
   * @see PIXI.BatchRenderer.defaultMaxTextures
   * @type {number}
   */
  SPRITE_MAX_TEXTURES: {
    get() {
      return fe.defaultMaxTextures;
    },
    set(r) {
      O("7.1.0", "settings.SPRITE_MAX_TEXTURES is deprecated, use BatchRenderer.defaultMaxTextures"), fe.defaultMaxTextures = r;
    }
  },
  /**
   * The default sprite batch size.
   *
   * The default aims to balance desktop and mobile devices.
   * @static
   * @name SPRITE_BATCH_SIZE
   * @memberof PIXI.settings
   * @see PIXI.BatchRenderer.defaultBatchSize
   * @deprecated since 7.1.0
   * @type {number}
   */
  SPRITE_BATCH_SIZE: {
    get() {
      return fe.defaultBatchSize;
    },
    set(r) {
      O("7.1.0", "settings.SPRITE_BATCH_SIZE is deprecated, use BatchRenderer.defaultBatchSize"), fe.defaultBatchSize = r;
    }
  },
  /**
   * Can we upload the same buffer in a single frame?
   * @static
   * @name CAN_UPLOAD_SAME_BUFFER
   * @memberof PIXI.settings
   * @see PIXI.BatchRenderer.canUploadSameBuffer
   * @deprecated since 7.1.0
   * @type {boolean}
   */
  CAN_UPLOAD_SAME_BUFFER: {
    get() {
      return fe.canUploadSameBuffer;
    },
    set(r) {
      O("7.1.0", "settings.CAN_UPLOAD_SAME_BUFFER is deprecated, use BatchRenderer.canUploadSameBuffer"), fe.canUploadSameBuffer = r;
    }
  },
  /**
   * Default Garbage Collection mode.
   * @static
   * @name GC_MODE
   * @memberof PIXI.settings
   * @type {PIXI.GC_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.TextureGCSystem.defaultMode
   */
  GC_MODE: {
    get() {
      return pe.defaultMode;
    },
    set(r) {
      O("7.1.0", "settings.GC_MODE is deprecated, use TextureGCSystem.defaultMode"), pe.defaultMode = r;
    }
  },
  /**
   * Default Garbage Collection max idle.
   * @static
   * @name GC_MAX_IDLE
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.TextureGCSystem.defaultMaxIdle
   */
  GC_MAX_IDLE: {
    get() {
      return pe.defaultMaxIdle;
    },
    set(r) {
      O("7.1.0", "settings.GC_MAX_IDLE is deprecated, use TextureGCSystem.defaultMaxIdle"), pe.defaultMaxIdle = r;
    }
  },
  /**
   * Default Garbage Collection maximum check count.
   * @static
   * @name GC_MAX_CHECK_COUNT
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.TextureGCSystem.defaultCheckCountMax
   */
  GC_MAX_CHECK_COUNT: {
    get() {
      return pe.defaultCheckCountMax;
    },
    set(r) {
      O("7.1.0", "settings.GC_MAX_CHECK_COUNT is deprecated, use TextureGCSystem.defaultCheckCountMax"), pe.defaultCheckCountMax = r;
    }
  },
  /**
   * Default specify float precision in vertex shader.
   * @static
   * @name PRECISION_VERTEX
   * @memberof PIXI.settings
   * @type {PIXI.PRECISION}
   * @deprecated since 7.1.0
   * @see PIXI.Program.defaultVertexPrecision
   */
  PRECISION_VERTEX: {
    get() {
      return ge.defaultVertexPrecision;
    },
    set(r) {
      O("7.1.0", "settings.PRECISION_VERTEX is deprecated, use Program.defaultVertexPrecision"), ge.defaultVertexPrecision = r;
    }
  },
  /**
   * Default specify float precision in fragment shader.
   * @static
   * @name PRECISION_FRAGMENT
   * @memberof PIXI.settings
   * @type {PIXI.PRECISION}
   * @deprecated since 7.1.0
   * @see PIXI.Program.defaultFragmentPrecision
   */
  PRECISION_FRAGMENT: {
    get() {
      return ge.defaultFragmentPrecision;
    },
    set(r) {
      O("7.1.0", "settings.PRECISION_FRAGMENT is deprecated, use Program.defaultFragmentPrecision"), ge.defaultFragmentPrecision = r;
    }
  }
});
var mi = /* @__PURE__ */ ((r) => (r[r.INTERACTION = 50] = "INTERACTION", r[r.HIGH = 25] = "HIGH", r[r.NORMAL = 0] = "NORMAL", r[r.LOW = -25] = "LOW", r[r.UTILITY = -50] = "UTILITY", r))(mi || {});
class os {
  /**
   * Constructor
   * @private
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @param priority - The priority for emitting
   * @param once - If the handler should fire once
   */
  constructor(t, e = null, i = 0, s = !1) {
    this.next = null, this.previous = null, this._destroyed = !1, this.fn = t, this.context = e, this.priority = i, this.once = s;
  }
  /**
   * Simple compare function to figure out if a function and context match.
   * @private
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @returns `true` if the listener match the arguments
   */
  match(t, e = null) {
    return this.fn === t && this.context === e;
  }
  /**
   * Emit by calling the current function.
   * @private
   * @param deltaTime - time since the last emit.
   * @returns Next ticker
   */
  emit(t) {
    this.fn && (this.context ? this.fn.call(this.context, t) : this.fn(t));
    const e = this.next;
    return this.once && this.destroy(!0), this._destroyed && (this.next = null), e;
  }
  /**
   * Connect to the list.
   * @private
   * @param previous - Input node, previous listener
   */
  connect(t) {
    this.previous = t, t.next && (t.next.previous = this), this.next = t.next, t.next = this;
  }
  /**
   * Destroy and don't use after this.
   * @private
   * @param hard - `true` to remove the `next` reference, this
   *        is considered a hard destroy. Soft destroy maintains the next reference.
   * @returns The listener to redirect while emitting or removing.
   */
  destroy(t = !1) {
    this._destroyed = !0, this.fn = null, this.context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);
    const e = this.next;
    return this.next = t ? null : e, this.previous = null, e;
  }
}
const Xa = class xt {
  constructor() {
    this.autoStart = !1, this.deltaTime = 1, this.lastTime = -1, this.speed = 1, this.started = !1, this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this._protected = !1, this._lastFrame = -1, this._head = new os(null, null, 1 / 0), this.deltaMS = 1 / xt.targetFPMS, this.elapsedMS = 1 / xt.targetFPMS, this._tick = (t) => {
      this._requestId = null, this.started && (this.update(t), this.started && this._requestId === null && this._head.next && (this._requestId = requestAnimationFrame(this._tick)));
    };
  }
  /**
   * Conditionally requests a new animation frame.
   * If a frame has not already been requested, and if the internal
   * emitter has listeners, a new frame is requested.
   * @private
   */
  _requestIfNeeded() {
    this._requestId === null && this._head.next && (this.lastTime = performance.now(), this._lastFrame = this.lastTime, this._requestId = requestAnimationFrame(this._tick));
  }
  /**
   * Conditionally cancels a pending animation frame.
   * @private
   */
  _cancelIfNeeded() {
    this._requestId !== null && (cancelAnimationFrame(this._requestId), this._requestId = null);
  }
  /**
   * Conditionally requests a new animation frame.
   * If the ticker has been started it checks if a frame has not already
   * been requested, and if the internal emitter has listeners. If these
   * conditions are met, a new frame is requested. If the ticker has not
   * been started, but autoStart is `true`, then the ticker starts now,
   * and continues with the previous conditions to request a new frame.
   * @private
   */
  _startIfPossible() {
    this.started ? this._requestIfNeeded() : this.autoStart && this.start();
  }
  /**
   * Register a handler for tick events. Calls continuously unless
   * it is removed or the ticker is stopped.
   * @param fn - The listener function to be added for updates
   * @param context - The listener context
   * @param {number} [priority=PIXI.UPDATE_PRIORITY.NORMAL] - The priority for emitting
   * @returns This instance of a ticker
   */
  add(t, e, i = mi.NORMAL) {
    return this._addListener(new os(t, e, i));
  }
  /**
   * Add a handler for the tick event which is only execute once.
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @param {number} [priority=PIXI.UPDATE_PRIORITY.NORMAL] - The priority for emitting
   * @returns This instance of a ticker
   */
  addOnce(t, e, i = mi.NORMAL) {
    return this._addListener(new os(t, e, i, !0));
  }
  /**
   * Internally adds the event handler so that it can be sorted by priority.
   * Priority allows certain handler (user, AnimatedSprite, Interaction) to be run
   * before the rendering.
   * @private
   * @param listener - Current listener being added.
   * @returns This instance of a ticker
   */
  _addListener(t) {
    let e = this._head.next, i = this._head;
    if (!e)
      t.connect(i);
    else {
      for (; e; ) {
        if (t.priority > e.priority) {
          t.connect(i);
          break;
        }
        i = e, e = e.next;
      }
      t.previous || t.connect(i);
    }
    return this._startIfPossible(), this;
  }
  /**
   * Removes any handlers matching the function and context parameters.
   * If no handlers are left after removing, then it cancels the animation frame.
   * @param fn - The listener function to be removed
   * @param context - The listener context to be removed
   * @returns This instance of a ticker
   */
  remove(t, e) {
    let i = this._head.next;
    for (; i; )
      i.match(t, e) ? i = i.destroy() : i = i.next;
    return this._head.next || this._cancelIfNeeded(), this;
  }
  /**
   * The number of listeners on this ticker, calculated by walking through linked list
   * @readonly
   * @member {number}
   */
  get count() {
    if (!this._head)
      return 0;
    let t = 0, e = this._head;
    for (; e = e.next; )
      t++;
    return t;
  }
  /** Starts the ticker. If the ticker has listeners a new animation frame is requested at this point. */
  start() {
    this.started || (this.started = !0, this._requestIfNeeded());
  }
  /** Stops the ticker. If the ticker has requested an animation frame it is canceled at this point. */
  stop() {
    this.started && (this.started = !1, this._cancelIfNeeded());
  }
  /** Destroy the ticker and don't use after this. Calling this method removes all references to internal events. */
  destroy() {
    if (!this._protected) {
      this.stop();
      let t = this._head.next;
      for (; t; )
        t = t.destroy(!0);
      this._head.destroy(), this._head = null;
    }
  }
  /**
   * Triggers an update. An update entails setting the
   * current {@link PIXI.Ticker#elapsedMS},
   * the current {@link PIXI.Ticker#deltaTime},
   * invoking all listeners with current deltaTime,
   * and then finally setting {@link PIXI.Ticker#lastTime}
   * with the value of currentTime that was provided.
   * This method will be called automatically by animation
   * frame callbacks if the ticker instance has been started
   * and listeners are added.
   * @param {number} [currentTime=performance.now()] - the current time of execution
   */
  update(t = performance.now()) {
    let e;
    if (t > this.lastTime) {
      if (e = this.elapsedMS = t - this.lastTime, e > this._maxElapsedMS && (e = this._maxElapsedMS), e *= this.speed, this._minElapsedMS) {
        const n = t - this._lastFrame | 0;
        if (n < this._minElapsedMS)
          return;
        this._lastFrame = t - n % this._minElapsedMS;
      }
      this.deltaMS = e, this.deltaTime = this.deltaMS * xt.targetFPMS;
      const i = this._head;
      let s = i.next;
      for (; s; )
        s = s.emit(this.deltaTime);
      i.next || this._cancelIfNeeded();
    } else
      this.deltaTime = this.deltaMS = this.elapsedMS = 0;
    this.lastTime = t;
  }
  /**
   * The frames per second at which this ticker is running.
   * The default is approximately 60 in most modern browsers.
   * **Note:** This does not factor in the value of
   * {@link PIXI.Ticker#speed}, which is specific
   * to scaling {@link PIXI.Ticker#deltaTime}.
   * @member {number}
   * @readonly
   */
  get FPS() {
    return 1e3 / this.elapsedMS;
  }
  /**
   * Manages the maximum amount of milliseconds allowed to
   * elapse between invoking {@link PIXI.Ticker#update}.
   * This value is used to cap {@link PIXI.Ticker#deltaTime},
   * but does not effect the measured value of {@link PIXI.Ticker#FPS}.
   * When setting this property it is clamped to a value between
   * `0` and `Ticker.targetFPMS * 1000`.
   * @member {number}
   * @default 10
   */
  get minFPS() {
    return 1e3 / this._maxElapsedMS;
  }
  set minFPS(t) {
    const e = Math.min(this.maxFPS, t), i = Math.min(Math.max(0, e) / 1e3, xt.targetFPMS);
    this._maxElapsedMS = 1 / i;
  }
  /**
   * Manages the minimum amount of milliseconds required to
   * elapse between invoking {@link PIXI.Ticker#update}.
   * This will effect the measured value of {@link PIXI.Ticker#FPS}.
   * If it is set to `0`, then there is no limit; PixiJS will render as many frames as it can.
   * Otherwise it will be at least `minFPS`
   * @member {number}
   * @default 0
   */
  get maxFPS() {
    return this._minElapsedMS ? Math.round(1e3 / this._minElapsedMS) : 0;
  }
  set maxFPS(t) {
    if (t === 0)
      this._minElapsedMS = 0;
    else {
      const e = Math.max(this.minFPS, t);
      this._minElapsedMS = 1 / (e / 1e3);
    }
  }
  /**
   * The shared ticker instance used by {@link PIXI.AnimatedSprite} and by
   * {@link PIXI.VideoResource} to update animation frames / video textures.
   *
   * It may also be used by {@link PIXI.Application} if created with the `sharedTicker` option property set to true.
   *
   * The property {@link PIXI.Ticker#autoStart} is set to `true` for this instance.
   * Please follow the examples for usage, including how to opt-out of auto-starting the shared ticker.
   * @example
   * import { Ticker } from 'pixi.js';
   *
   * const ticker = Ticker.shared;
   * // Set this to prevent starting this ticker when listeners are added.
   * // By default this is true only for the PIXI.Ticker.shared instance.
   * ticker.autoStart = false;
   *
   * // FYI, call this to ensure the ticker is stopped. It should be stopped
   * // if you have not attempted to render anything yet.
   * ticker.stop();
   *
   * // Call this when you are ready for a running shared ticker.
   * ticker.start();
   * @example
   * import { autoDetectRenderer, Container } from 'pixi.js';
   *
   * // You may use the shared ticker to render...
   * const renderer = autoDetectRenderer();
   * const stage = new Container();
   * document.body.appendChild(renderer.view);
   * ticker.add((time) => renderer.render(stage));
   *
   * // Or you can just update it manually.
   * ticker.autoStart = false;
   * ticker.stop();
   * const animate = (time) => {
   *     ticker.update(time);
   *     renderer.render(stage);
   *     requestAnimationFrame(animate);
   * };
   * animate(performance.now());
   * @member {PIXI.Ticker}
   * @static
   */
  static get shared() {
    if (!xt._shared) {
      const t = xt._shared = new xt();
      t.autoStart = !0, t._protected = !0;
    }
    return xt._shared;
  }
  /**
   * The system ticker instance used by {@link PIXI.BasePrepare} for core timing
   * functionality that shouldn't usually need to be paused, unlike the `shared`
   * ticker which drives visual animations and rendering which may want to be paused.
   *
   * The property {@link PIXI.Ticker#autoStart} is set to `true` for this instance.
   * @member {PIXI.Ticker}
   * @static
   */
  static get system() {
    if (!xt._system) {
      const t = xt._system = new xt();
      t.autoStart = !0, t._protected = !0;
    }
    return xt._system;
  }
};
Xa.targetFPMS = 0.06;
let zt = Xa;
Object.defineProperties(L, {
  /**
   * Target frames per millisecond.
   * @static
   * @name TARGET_FPMS
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.Ticker.targetFPMS
   */
  TARGET_FPMS: {
    get() {
      return zt.targetFPMS;
    },
    set(r) {
      O("7.1.0", "settings.TARGET_FPMS is deprecated, use Ticker.targetFPMS"), zt.targetFPMS = r;
    }
  }
});
class Va {
  /**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */
  static init(t) {
    t = Object.assign({
      autoStart: !0,
      sharedTicker: !1
    }, t), Object.defineProperty(
      this,
      "ticker",
      {
        set(e) {
          this._ticker && this._ticker.remove(this.render, this), this._ticker = e, e && e.add(this.render, this, mi.LOW);
        },
        get() {
          return this._ticker;
        }
      }
    ), this.stop = () => {
      this._ticker.stop();
    }, this.start = () => {
      this._ticker.start();
    }, this._ticker = null, this.ticker = t.sharedTicker ? zt.shared : new zt(), t.autoStart && this.start();
  }
  /**
   * Clean up the ticker, scoped to application.
   * @static
   * @private
   */
  static destroy() {
    if (this._ticker) {
      const t = this._ticker;
      this.ticker = null, t.destroy();
    }
  }
}
Va.extension = N.Application;
B.add(Va);
const ja = [];
B.handleByList(N.Renderer, ja);
function yf(r) {
  for (const t of ja)
    if (t.test(r))
      return new t(r);
  throw new Error("Unable to auto-detect a suitable renderer.");
}
class za {
  constructor(t) {
    this.renderer = t;
  }
  contextChange(t) {
    let e;
    if (this.renderer.context.webGLVersion === 1) {
      const i = t.getParameter(t.FRAMEBUFFER_BINDING);
      t.bindFramebuffer(t.FRAMEBUFFER, null), e = t.getParameter(t.SAMPLES), t.bindFramebuffer(t.FRAMEBUFFER, i);
    } else {
      const i = t.getParameter(t.DRAW_FRAMEBUFFER_BINDING);
      t.bindFramebuffer(t.DRAW_FRAMEBUFFER, null), e = t.getParameter(t.SAMPLES), t.bindFramebuffer(t.DRAW_FRAMEBUFFER, i);
    }
    e >= J.HIGH ? this.multisample = J.HIGH : e >= J.MEDIUM ? this.multisample = J.MEDIUM : e >= J.LOW ? this.multisample = J.LOW : this.multisample = J.NONE;
  }
  destroy() {
  }
}
za.extension = {
  type: N.RendererSystem,
  name: "_multisample"
};
B.add(za);
class gf {
  constructor(t) {
    this.buffer = t || null, this.updateID = -1, this.byteLength = -1, this.refCount = 0;
  }
}
class Wa {
  /**
   * @param {PIXI.Renderer} renderer - The renderer this System works for.
   */
  constructor(t) {
    this.renderer = t, this.managedBuffers = {}, this.boundBufferBases = {};
  }
  /**
   * @ignore
   */
  destroy() {
    this.renderer = null;
  }
  /** Sets up the renderer context and necessary buffers. */
  contextChange() {
    this.disposeAll(!0), this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID;
  }
  /**
   * This binds specified buffer. On first run, it will create the webGL buffers for the context too
   * @param buffer - the buffer to bind to the renderer
   */
  bind(t) {
    const { gl: e, CONTEXT_UID: i } = this, s = t._glBuffers[i] || this.createGLBuffer(t);
    e.bindBuffer(t.type, s.buffer);
  }
  unbind(t) {
    const { gl: e } = this;
    e.bindBuffer(t, null);
  }
  /**
   * Binds an uniform buffer to at the given index.
   *
   * A cache is used so a buffer will not be bound again if already bound.
   * @param buffer - the buffer to bind
   * @param index - the base index to bind it to.
   */
  bindBufferBase(t, e) {
    const { gl: i, CONTEXT_UID: s } = this;
    if (this.boundBufferBases[e] !== t) {
      const n = t._glBuffers[s] || this.createGLBuffer(t);
      this.boundBufferBases[e] = t, i.bindBufferBase(i.UNIFORM_BUFFER, e, n.buffer);
    }
  }
  /**
   * Binds a buffer whilst also binding its range.
   * This will make the buffer start from the offset supplied rather than 0 when it is read.
   * @param buffer - the buffer to bind
   * @param index - the base index to bind at, defaults to 0
   * @param offset - the offset to bind at (this is blocks of 256). 0 = 0, 1 = 256, 2 = 512 etc
   */
  bindBufferRange(t, e, i) {
    const { gl: s, CONTEXT_UID: n } = this;
    i = i || 0;
    const o = t._glBuffers[n] || this.createGLBuffer(t);
    s.bindBufferRange(s.UNIFORM_BUFFER, e || 0, o.buffer, i * 256, 256);
  }
  /**
   * Will ensure the data in the buffer is uploaded to the GPU.
   * @param {PIXI.Buffer} buffer - the buffer to update
   */
  update(t) {
    const { gl: e, CONTEXT_UID: i } = this, s = t._glBuffers[i] || this.createGLBuffer(t);
    if (t._updateID !== s.updateID)
      if (s.updateID = t._updateID, e.bindBuffer(t.type, s.buffer), s.byteLength >= t.data.byteLength)
        e.bufferSubData(t.type, 0, t.data);
      else {
        const n = t.static ? e.STATIC_DRAW : e.DYNAMIC_DRAW;
        s.byteLength = t.data.byteLength, e.bufferData(t.type, t.data, n);
      }
  }
  /**
   * Disposes buffer
   * @param {PIXI.Buffer} buffer - buffer with data
   * @param {boolean} [contextLost=false] - If context was lost, we suppress deleteVertexArray
   */
  dispose(t, e) {
    if (!this.managedBuffers[t.id])
      return;
    delete this.managedBuffers[t.id];
    const i = t._glBuffers[this.CONTEXT_UID], s = this.gl;
    t.disposeRunner.remove(this), i && (e || s.deleteBuffer(i.buffer), delete t._glBuffers[this.CONTEXT_UID]);
  }
  /**
   * dispose all WebGL resources of all managed buffers
   * @param {boolean} [contextLost=false] - If context was lost, we suppress `gl.delete` calls
   */
  disposeAll(t) {
    const e = Object.keys(this.managedBuffers);
    for (let i = 0; i < e.length; i++)
      this.dispose(this.managedBuffers[e[i]], t);
  }
  /**
   * creates and attaches a GLBuffer object tied to the current context.
   * @param buffer
   * @protected
   */
  createGLBuffer(t) {
    const { CONTEXT_UID: e, gl: i } = this;
    return t._glBuffers[e] = new gf(i.createBuffer()), this.managedBuffers[t.id] = t, t.disposeRunner.add(this), t._glBuffers[e];
  }
}
Wa.extension = {
  type: N.RendererSystem,
  name: "buffer"
};
B.add(Wa);
class Ya {
  // renderers scene graph!
  constructor(t) {
    this.renderer = t;
  }
  /**
   * Renders the object to its WebGL view.
   * @param displayObject - The object to be rendered.
   * @param options - the options to be passed to the renderer
   */
  render(t, e) {
    const i = this.renderer;
    let s, n, o, a;
    if (e && (s = e.renderTexture, n = e.clear, o = e.transform, a = e.skipUpdateTransform), this.renderingToScreen = !s, i.runners.prerender.emit(), i.emit("prerender"), i.projection.transform = o, !i.context.isLost) {
      if (s || (this.lastObjectRendered = t), !a) {
        const h = t.enableTempParent();
        t.updateTransform(), t.disableTempParent(h);
      }
      i.renderTexture.bind(s), i.batch.currentRenderer.start(), (n ?? i.background.clearBeforeRender) && i.renderTexture.clear(), t.render(i), i.batch.currentRenderer.flush(), s && (e.blit && i.framebuffer.blit(), s.baseTexture.update()), i.runners.postrender.emit(), i.projection.transform = null, i.emit("postrender");
    }
  }
  destroy() {
    this.renderer = null, this.lastObjectRendered = null;
  }
}
Ya.extension = {
  type: N.RendererSystem,
  name: "objectRenderer"
};
B.add(Ya);
const qr = class Ls extends ff {
  /**
   * @param {PIXI.IRendererOptions} [options] - See {@link PIXI.settings.RENDER_OPTIONS} for defaults.
   */
  constructor(t) {
    super(), this.type = ko.WEBGL, t = Object.assign({}, L.RENDER_OPTIONS, t), this.gl = null, this.CONTEXT_UID = 0, this.globalUniforms = new $t({
      projectionMatrix: new q()
    }, !0);
    const e = {
      runners: [
        "init",
        "destroy",
        "contextChange",
        "resolutionChange",
        "reset",
        "update",
        "postrender",
        "prerender",
        "resize"
      ],
      systems: Ls.__systems,
      priority: [
        "_view",
        "textureGenerator",
        "background",
        "_plugin",
        "startup",
        // low level WebGL systems
        "context",
        "state",
        "texture",
        "buffer",
        "geometry",
        "framebuffer",
        "transformFeedback",
        // high level pixi specific rendering
        "mask",
        "scissor",
        "stencil",
        "projection",
        "textureGC",
        "filter",
        "renderTexture",
        "batch",
        "objectRenderer",
        "_multisample"
      ]
    };
    this.setup(e), "useContextAlpha" in t && (O("7.0.0", "options.useContextAlpha is deprecated, use options.premultipliedAlpha and options.backgroundAlpha instead"), t.premultipliedAlpha = t.useContextAlpha && t.useContextAlpha !== "notMultiplied", t.backgroundAlpha = t.useContextAlpha === !1 ? 1 : t.backgroundAlpha), this._plugin.rendererPlugins = Ls.__plugins, this.options = t, this.startup.run(this.options);
  }
  /**
   * Create renderer if WebGL is available. Overrideable
   * by the **@pixi/canvas-renderer** package to allow fallback.
   * throws error if WebGL is not available.
   * @param options
   * @private
   */
  static test(t) {
    return t != null && t.forceCanvas ? !1 : Dc();
  }
  /**
   * Renders the object to its WebGL view.
   * @param displayObject - The object to be rendered.
   * @param {object} [options] - Object to use for render options.
   * @param {PIXI.RenderTexture} [options.renderTexture] - The render texture to render to.
   * @param {boolean} [options.clear=true] - Should the canvas be cleared before the new render.
   * @param {PIXI.Matrix} [options.transform] - A transform to apply to the render texture before rendering.
   * @param {boolean} [options.skipUpdateTransform=false] - Should we skip the update transform pass?
   */
  render(t, e) {
    this.objectRenderer.render(t, e);
  }
  /**
   * Resizes the WebGL view to the specified width and height.
   * @param desiredScreenWidth - The desired width of the screen.
   * @param desiredScreenHeight - The desired height of the screen.
   */
  resize(t, e) {
    this._view.resizeView(t, e);
  }
  /**
   * Resets the WebGL state so you can render things however you fancy!
   * @returns Returns itself.
   */
  reset() {
    return this.runners.reset.emit(), this;
  }
  /** Clear the frame buffer. */
  clear() {
    this.renderTexture.bind(), this.renderTexture.clear();
  }
  /**
   * Removes everything from the renderer (event listeners, spritebatch, etc...)
   * @param [removeView=false] - Removes the Canvas element from the DOM.
   *  See: https://github.com/pixijs/pixijs/issues/2233
   */
  destroy(t = !1) {
    this.runners.destroy.items.reverse(), this.emitWithCustomOptions(this.runners.destroy, {
      _view: t
    }), super.destroy();
  }
  /** Collection of plugins */
  get plugins() {
    return this._plugin.plugins;
  }
  /** The number of msaa samples of the canvas. */
  get multisample() {
    return this._multisample.multisample;
  }
  /**
   * Same as view.width, actual number of pixels in the canvas by horizontal.
   * @member {number}
   * @readonly
   * @default 800
   */
  get width() {
    return this._view.element.width;
  }
  /**
   * Same as view.height, actual number of pixels in the canvas by vertical.
   * @default 600
   */
  get height() {
    return this._view.element.height;
  }
  /** The resolution / device pixel ratio of the renderer. */
  get resolution() {
    return this._view.resolution;
  }
  set resolution(t) {
    this._view.resolution = t, this.runners.resolutionChange.emit(t);
  }
  /** Whether CSS dimensions of canvas view should be resized to screen dimensions automatically. */
  get autoDensity() {
    return this._view.autoDensity;
  }
  /** The canvas element that everything is drawn to.*/
  get view() {
    return this._view.element;
  }
  /**
   * Measurements of the screen. (0, 0, screenWidth, screenHeight).
   *
   * Its safe to use as filterArea or hitArea for the whole stage.
   * @member {PIXI.Rectangle}
   */
  get screen() {
    return this._view.screen;
  }
  /** the last object rendered by the renderer. Useful for other plugins like interaction managers */
  get lastObjectRendered() {
    return this.objectRenderer.lastObjectRendered;
  }
  /** Flag if we are rendering to the screen vs renderTexture */
  get renderingToScreen() {
    return this.objectRenderer.renderingToScreen;
  }
  /** When logging Pixi to the console, this is the name we will show */
  get rendererLogId() {
    return `WebGL ${this.context.webGLVersion}`;
  }
  /**
   * This sets weather the screen is totally cleared between each frame withthe background color and alpha
   * @deprecated since 7.0.0
   */
  get clearBeforeRender() {
    return O("7.0.0", "renderer.clearBeforeRender has been deprecated, please use renderer.background.clearBeforeRender instead."), this.background.clearBeforeRender;
  }
  /**
   * Pass-thru setting for the canvas' context `alpha` property. This is typically
   * not something you need to fiddle with. If you want transparency, use `backgroundAlpha`.
   * @deprecated since 7.0.0
   * @member {boolean}
   */
  get useContextAlpha() {
    return O("7.0.0", "renderer.useContextAlpha has been deprecated, please use renderer.context.premultipliedAlpha instead."), this.context.useContextAlpha;
  }
  /**
   * readonly drawing buffer preservation
   * we can only know this if Pixi created the context
   * @deprecated since 7.0.0
   */
  get preserveDrawingBuffer() {
    return O("7.0.0", "renderer.preserveDrawingBuffer has been deprecated, we cannot truly know this unless pixi created the context"), this.context.preserveDrawingBuffer;
  }
  /**
   * The background color to fill if not transparent
   * @member {number}
   * @deprecated since 7.0.0
   */
  get backgroundColor() {
    return O("7.0.0", "renderer.backgroundColor has been deprecated, use renderer.background.color instead."), this.background.color;
  }
  set backgroundColor(t) {
    O("7.0.0", "renderer.backgroundColor has been deprecated, use renderer.background.color instead."), this.background.color = t;
  }
  /**
   * The background color alpha. Setting this to 0 will make the canvas transparent.
   * @member {number}
   * @deprecated since 7.0.0
   */
  get backgroundAlpha() {
    return O("7.0.0", "renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead."), this.background.alpha;
  }
  /**
   * @deprecated since 7.0.0
   */
  set backgroundAlpha(t) {
    O("7.0.0", "renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead."), this.background.alpha = t;
  }
  /**
   * @deprecated since 7.0.0
   */
  get powerPreference() {
    return O("7.0.0", "renderer.powerPreference has been deprecated, we can only know this if pixi creates the context"), this.context.powerPreference;
  }
  /**
   * Useful function that returns a texture of the display object that can then be used to create sprites
   * This can be quite useful if your displayObject is complicated and needs to be reused multiple times.
   * @param displayObject - The displayObject the object will be generated from.
   * @param {IGenerateTextureOptions} options - Generate texture options.
   * @param {PIXI.Rectangle} options.region - The region of the displayObject, that shall be rendered,
   *        if no region is specified, defaults to the local bounds of the displayObject.
   * @param {number} [options.resolution] - If not given, the renderer's resolution is used.
   * @param {PIXI.MSAA_QUALITY} [options.multisample] - If not given, the renderer's multisample is used.
   * @returns A texture of the graphics object.
   */
  generateTexture(t, e) {
    return this.textureGenerator.generateTexture(t, e);
  }
};
qr.extension = {
  type: N.Renderer,
  priority: 1
}, /**
* Collection of installed plugins. These are included by default in PIXI, but can be excluded
* by creating a custom build. Consult the README for more information about creating custom
* builds and excluding plugins.
* @private
*/
qr.__plugins = {}, /**
* The collection of installed systems.
* @private
*/
qr.__systems = {};
let en = qr;
B.handleByMap(N.RendererPlugin, en.__plugins);
B.handleByMap(N.RendererSystem, en.__systems);
B.add(en);
class qa extends xr {
  /**
   * @param length
   * @param options - Options to for Resource constructor
   * @param {number} [options.width] - Width of the resource
   * @param {number} [options.height] - Height of the resource
   */
  constructor(t, e) {
    const { width: i, height: s } = e || {};
    super(i, s), this.items = [], this.itemDirtyIds = [];
    for (let n = 0; n < t; n++) {
      const o = new D();
      this.items.push(o), this.itemDirtyIds.push(-2);
    }
    this.length = t, this._load = null, this.baseTexture = null;
  }
  /**
   * Used from ArrayResource and CubeResource constructors.
   * @param resources - Can be resources, image elements, canvas, etc. ,
   *  length should be same as constructor length
   * @param options - Detect options for resources
   */
  initFromArray(t, e) {
    for (let i = 0; i < this.length; i++)
      t[i] && (t[i].castToBaseTexture ? this.addBaseTextureAt(t[i].castToBaseTexture(), i) : t[i] instanceof xr ? this.addResourceAt(t[i], i) : this.addResourceAt(pa(t[i], e), i));
  }
  /** Destroy this BaseImageResource. */
  dispose() {
    for (let t = 0, e = this.length; t < e; t++)
      this.items[t].destroy();
    this.items = null, this.itemDirtyIds = null, this._load = null;
  }
  /**
   * Set a resource by ID
   * @param resource
   * @param index - Zero-based index of resource to set
   * @returns - Instance for chaining
   */
  addResourceAt(t, e) {
    if (!this.items[e])
      throw new Error(`Index ${e} is out of bounds`);
    return t.valid && !this.valid && this.resize(t.width, t.height), this.items[e].setResource(t), this;
  }
  /**
   * Set the parent base texture.
   * @param baseTexture
   */
  bind(t) {
    if (this.baseTexture !== null)
      throw new Error("Only one base texture per TextureArray is allowed");
    super.bind(t);
    for (let e = 0; e < this.length; e++)
      this.items[e].parentTextureArray = t, this.items[e].on("update", t.update, t);
  }
  /**
   * Unset the parent base texture.
   * @param baseTexture
   */
  unbind(t) {
    super.unbind(t);
    for (let e = 0; e < this.length; e++)
      this.items[e].parentTextureArray = null, this.items[e].off("update", t.update, t);
  }
  /**
   * Load all the resources simultaneously
   * @returns - When load is resolved
   */
  load() {
    if (this._load)
      return this._load;
    const t = this.items.map((e) => e.resource).filter((e) => e).map((e) => e.load());
    return this._load = Promise.all(t).then(
      () => {
        const { realWidth: e, realHeight: i } = this.items[0];
        return this.resize(e, i), this.update(), Promise.resolve(this);
      }
    ), this._load;
  }
}
class vf extends qa {
  /**
   * @param source - Number of items in array or the collection
   *        of image URLs to use. Can also be resources, image elements, canvas, etc.
   * @param options - Options to apply to {@link PIXI.autoDetectResource}
   * @param {number} [options.width] - Width of the resource
   * @param {number} [options.height] - Height of the resource
   */
  constructor(t, e) {
    const { width: i, height: s } = e || {};
    let n, o;
    Array.isArray(t) ? (n = t, o = t.length) : o = t, super(o, { width: i, height: s }), n && this.initFromArray(n, e);
  }
  /**
   * Set a baseTexture by ID,
   * ArrayResource just takes resource from it, nothing more
   * @param baseTexture
   * @param index - Zero-based index of resource to set
   * @returns - Instance for chaining
   */
  addBaseTextureAt(t, e) {
    if (t.resource)
      this.addResourceAt(t.resource, e);
    else
      throw new Error("ArrayResource does not support RenderTexture");
    return this;
  }
  /**
   * Add binding
   * @param baseTexture
   */
  bind(t) {
    super.bind(t), t.target = Ge.TEXTURE_2D_ARRAY;
  }
  /**
   * Upload the resources to the GPU.
   * @param renderer
   * @param texture
   * @param glTexture
   * @returns - whether texture was uploaded
   */
  upload(t, e, i) {
    const { length: s, itemDirtyIds: n, items: o } = this, { gl: a } = t;
    i.dirtyId < 0 && a.texImage3D(
      a.TEXTURE_2D_ARRAY,
      0,
      i.internalFormat,
      this._width,
      this._height,
      s,
      0,
      e.format,
      i.type,
      null
    );
    for (let h = 0; h < s; h++) {
      const l = o[h];
      n[h] < l.dirtyId && (n[h] = l.dirtyId, l.valid && a.texSubImage3D(
        a.TEXTURE_2D_ARRAY,
        0,
        0,
        // xoffset
        0,
        // yoffset
        h,
        // zoffset
        l.resource.width,
        l.resource.height,
        1,
        e.format,
        i.type,
        l.resource.source
      ));
    }
    return !0;
  }
}
class _f extends Yt {
  /**
   * @param source - Canvas element to use
   */
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(t) {
    super(t);
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if source is HTMLCanvasElement or OffscreenCanvas
   */
  static test(t) {
    const { OffscreenCanvas: e } = globalThis;
    return e && t instanceof e ? !0 : globalThis.HTMLCanvasElement && t instanceof HTMLCanvasElement;
  }
}
const Ka = class hr extends qa {
  /**
   * @param {Array<string|PIXI.Resource>} [source] - Collection of URLs or resources
   *        to use as the sides of the cube.
   * @param options - ImageResource options
   * @param {number} [options.width] - Width of resource
   * @param {number} [options.height] - Height of resource
   * @param {number} [options.autoLoad=true] - Whether to auto-load resources
   * @param {number} [options.linkBaseTexture=true] - In case BaseTextures are supplied,
   *   whether to copy them or use
   */
  constructor(t, e) {
    const { width: i, height: s, autoLoad: n, linkBaseTexture: o } = e || {};
    if (t && t.length !== hr.SIDES)
      throw new Error(`Invalid length. Got ${t.length}, expected 6`);
    super(6, { width: i, height: s });
    for (let a = 0; a < hr.SIDES; a++)
      this.items[a].target = Ge.TEXTURE_CUBE_MAP_POSITIVE_X + a;
    this.linkBaseTexture = o !== !1, t && this.initFromArray(t, e), n !== !1 && this.load();
  }
  /**
   * Add binding.
   * @param baseTexture - parent base texture
   */
  bind(t) {
    super.bind(t), t.target = Ge.TEXTURE_CUBE_MAP;
  }
  addBaseTextureAt(t, e, i) {
    if (i === void 0 && (i = this.linkBaseTexture), !this.items[e])
      throw new Error(`Index ${e} is out of bounds`);
    if (!this.linkBaseTexture || t.parentTextureArray || Object.keys(t._glTextures).length > 0)
      if (t.resource)
        this.addResourceAt(t.resource, e);
      else
        throw new Error("CubeResource does not support copying of renderTexture.");
    else
      t.target = Ge.TEXTURE_CUBE_MAP_POSITIVE_X + e, t.parentTextureArray = this.baseTexture, this.items[e] = t;
    return t.valid && !this.valid && this.resize(t.realWidth, t.realHeight), this.items[e] = t, this;
  }
  /**
   * Upload the resource
   * @param renderer
   * @param _baseTexture
   * @param glTexture
   * @returns {boolean} true is success
   */
  upload(t, e, i) {
    const s = this.itemDirtyIds;
    for (let n = 0; n < hr.SIDES; n++) {
      const o = this.items[n];
      (s[n] < o.dirtyId || i.dirtyId < e.dirtyId) && (o.valid && o.resource ? (o.resource.upload(t, o, i), s[n] = o.dirtyId) : s[n] < -1 && (t.gl.texImage2D(
        o.target,
        0,
        i.internalFormat,
        e.realWidth,
        e.realHeight,
        0,
        e.format,
        i.type,
        null
      ), s[n] = -1));
    }
    return !0;
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if source is an array of 6 elements
   */
  static test(t) {
    return Array.isArray(t) && t.length === hr.SIDES;
  }
};
Ka.SIDES = 6;
let xf = Ka;
class ke extends Yt {
  /**
   * @param source - ImageBitmap or URL to use.
   * @param options - Options to use.
   */
  constructor(t, e) {
    e = e || {};
    let i, s, n;
    typeof t == "string" ? (i = ke.EMPTY, s = t, n = !0) : (i = t, s = null, n = !1), super(i), this.url = s, this.crossOrigin = e.crossOrigin ?? !0, this.alphaMode = typeof e.alphaMode == "number" ? e.alphaMode : null, this.ownsImageBitmap = e.ownsImageBitmap ?? n, this._load = null, e.autoLoad !== !1 && this.load();
  }
  load() {
    return this._load ? this._load : (this._load = new Promise(async (t, e) => {
      if (this.url === null) {
        t(this);
        return;
      }
      try {
        const i = await L.ADAPTER.fetch(this.url, {
          mode: this.crossOrigin ? "cors" : "no-cors"
        });
        if (this.destroyed)
          return;
        const s = await i.blob();
        if (this.destroyed)
          return;
        const n = await createImageBitmap(s, {
          premultiplyAlpha: this.alphaMode === null || this.alphaMode === we.UNPACK ? "premultiply" : "none"
        });
        if (this.destroyed) {
          n.close();
          return;
        }
        this.source = n, this.update(), t(this);
      } catch (i) {
        if (this.destroyed)
          return;
        e(i), this.onError.emit(i);
      }
    }), this._load);
  }
  /**
   * Upload the image bitmap resource to GPU.
   * @param renderer - Renderer to upload to
   * @param baseTexture - BaseTexture for this resource
   * @param glTexture - GLTexture to use
   * @returns {boolean} true is success
   */
  upload(t, e, i) {
    return this.source instanceof ImageBitmap ? (typeof this.alphaMode == "number" && (e.alphaMode = this.alphaMode), super.upload(t, e, i)) : (this.load(), !1);
  }
  /** Destroys this resource. */
  dispose() {
    this.ownsImageBitmap && this.source instanceof ImageBitmap && this.source.close(), super.dispose(), this._load = null;
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if current environment support ImageBitmap, and source is string or ImageBitmap
   */
  static test(t) {
    return !!globalThis.createImageBitmap && typeof ImageBitmap < "u" && (typeof t == "string" || t instanceof ImageBitmap);
  }
  /**
   * ImageBitmap cannot be created synchronously, so a empty placeholder canvas is needed when loading from URLs.
   * Only for internal usage.
   * @returns The cached placeholder canvas.
   */
  static get EMPTY() {
    return ke._EMPTY = ke._EMPTY ?? L.ADAPTER.createCanvas(0, 0), ke._EMPTY;
  }
}
const Us = class Kr extends Yt {
  /**
   * @param sourceBase64 - Base64 encoded SVG element or URL for SVG file.
   * @param {object} [options] - Options to use
   * @param {number} [options.scale=1] - Scale to apply to SVG. Overridden by...
   * @param {number} [options.width] - Rasterize SVG this wide. Aspect ratio preserved if height not specified.
   * @param {number} [options.height] - Rasterize SVG this high. Aspect ratio preserved if width not specified.
   * @param {boolean} [options.autoLoad=true] - Start loading right away.
   */
  constructor(t, e) {
    e = e || {}, super(L.ADAPTER.createCanvas()), this._width = 0, this._height = 0, this.svg = t, this.scale = e.scale || 1, this._overrideWidth = e.width, this._overrideHeight = e.height, this._resolve = null, this._crossorigin = e.crossorigin, this._load = null, e.autoLoad !== !1 && this.load();
  }
  load() {
    return this._load ? this._load : (this._load = new Promise((t) => {
      if (this._resolve = () => {
        this.update(), t(this);
      }, Kr.SVG_XML.test(this.svg.trim())) {
        if (!btoa)
          throw new Error("Your browser doesn't support base64 conversions.");
        this.svg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(this.svg)))}`;
      }
      this._loadSvg();
    }), this._load);
  }
  /** Loads an SVG image from `imageUrl` or `data URL`. */
  _loadSvg() {
    const t = new Image();
    Yt.crossOrigin(t, this.svg, this._crossorigin), t.src = this.svg, t.onerror = (e) => {
      this._resolve && (t.onerror = null, this.onError.emit(e));
    }, t.onload = () => {
      if (!this._resolve)
        return;
      const e = t.width, i = t.height;
      if (!e || !i)
        throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
      let s = e * this.scale, n = i * this.scale;
      (this._overrideWidth || this._overrideHeight) && (s = this._overrideWidth || this._overrideHeight / i * e, n = this._overrideHeight || this._overrideWidth / e * i), s = Math.round(s), n = Math.round(n);
      const o = this.source;
      o.width = s, o.height = n, o._pixiId = `canvas_${_r()}`, o.getContext("2d").drawImage(t, 0, 0, e, i, 0, 0, s, n), this._resolve(), this._resolve = null;
    };
  }
  /**
   * Get size from an svg string using a regular expression.
   * @param svgString - a serialized svg element
   * @returns - image extension
   */
  static getSize(t) {
    const e = Kr.SVG_SIZE.exec(t), i = {};
    return e && (i[e[1]] = Math.round(parseFloat(e[3])), i[e[5]] = Math.round(parseFloat(e[7]))), i;
  }
  /** Destroys this texture. */
  dispose() {
    super.dispose(), this._resolve = null, this._crossorigin = null;
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @param {string} extension - The extension of source, if set
   * @returns {boolean} - If the source is a SVG source or data file
   */
  static test(t, e) {
    return e === "svg" || typeof t == "string" && t.startsWith("data:image/svg+xml") || typeof t == "string" && Kr.SVG_XML.test(t);
  }
  // eslint-disable-line max-len
};
Us.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m, /**
* Regular expression for SVG size.
* @example &lt;svg width="100" height="100"&gt;&lt;/svg&gt;
* @readonly
*/
Us.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i;
let bf = Us;
class Tf extends Yt {
  /**
   * @param source - Image element to use
   */
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(t) {
    super(t);
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if source is an VideoFrame
   */
  static test(t) {
    return !!globalThis.VideoFrame && t instanceof globalThis.VideoFrame;
  }
}
const Bs = class ks extends Yt {
  /**
   * @param {HTMLVideoElement|object|string|Array<string|object>} source - Video element to use.
   * @param {object} [options] - Options to use
   * @param {boolean} [options.autoLoad=true] - Start loading the video immediately
   * @param {boolean} [options.autoPlay=true] - Start playing video immediately
   * @param {number} [options.updateFPS=0] - How many times a second to update the texture from the video.
   * If 0, `requestVideoFrameCallback` is used to update the texture.
   * If `requestVideoFrameCallback` is not available, the texture is updated every render.
   * @param {boolean} [options.crossorigin=true] - Load image using cross origin
   * @param {boolean} [options.loop=false] - Loops the video
   * @param {boolean} [options.muted=false] - Mutes the video audio, useful for autoplay
   * @param {boolean} [options.playsinline=true] - Prevents opening the video on mobile devices
   */
  constructor(t, e) {
    if (e = e || {}, !(t instanceof HTMLVideoElement)) {
      const i = document.createElement("video");
      e.autoLoad !== !1 && i.setAttribute("preload", "auto"), e.playsinline !== !1 && (i.setAttribute("webkit-playsinline", ""), i.setAttribute("playsinline", "")), e.muted === !0 && (i.setAttribute("muted", ""), i.muted = !0), e.loop === !0 && i.setAttribute("loop", ""), e.autoPlay !== !1 && i.setAttribute("autoplay", ""), typeof t == "string" && (t = [t]);
      const s = t[0].src || t[0];
      Yt.crossOrigin(i, s, e.crossorigin);
      for (let n = 0; n < t.length; ++n) {
        const o = document.createElement("source");
        let { src: a, mime: h } = t[n];
        if (a = a || t[n], a.startsWith("data:"))
          h = a.slice(5, a.indexOf(";"));
        else if (!a.startsWith("blob:")) {
          const l = a.split("?").shift().toLowerCase(), u = l.slice(l.lastIndexOf(".") + 1);
          h = h || ks.MIME_TYPES[u] || `video/${u}`;
        }
        o.src = a, h && (o.type = h), i.appendChild(o);
      }
      t = i;
    }
    super(t), this.noSubImage = !0, this._autoUpdate = !0, this._isConnectedToTicker = !1, this._updateFPS = e.updateFPS || 0, this._msToNextUpdate = 0, this.autoPlay = e.autoPlay !== !1, this._videoFrameRequestCallback = this._videoFrameRequestCallback.bind(this), this._videoFrameRequestCallbackHandle = null, this._load = null, this._resolve = null, this._reject = null, this._onCanPlay = this._onCanPlay.bind(this), this._onError = this._onError.bind(this), this._onPlayStart = this._onPlayStart.bind(this), this._onPlayStop = this._onPlayStop.bind(this), this._onSeeked = this._onSeeked.bind(this), e.autoLoad !== !1 && this.load();
  }
  /**
   * Trigger updating of the texture.
   * @param _deltaTime - time delta since last tick
   */
  update(t = 0) {
    if (!this.destroyed) {
      if (this._updateFPS) {
        const e = zt.shared.elapsedMS * this.source.playbackRate;
        this._msToNextUpdate = Math.floor(this._msToNextUpdate - e);
      }
      (!this._updateFPS || this._msToNextUpdate <= 0) && (super.update(
        /* deltaTime*/
      ), this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0);
    }
  }
  _videoFrameRequestCallback() {
    this.update(), this.destroyed ? this._videoFrameRequestCallbackHandle = null : this._videoFrameRequestCallbackHandle = this.source.requestVideoFrameCallback(
      this._videoFrameRequestCallback
    );
  }
  /**
   * Start preloading the video resource.
   * @returns {Promise<void>} Handle the validate event
   */
  load() {
    if (this._load)
      return this._load;
    const t = this.source;
    return (t.readyState === t.HAVE_ENOUGH_DATA || t.readyState === t.HAVE_FUTURE_DATA) && t.width && t.height && (t.complete = !0), t.addEventListener("play", this._onPlayStart), t.addEventListener("pause", this._onPlayStop), t.addEventListener("seeked", this._onSeeked), this._isSourceReady() ? this._onCanPlay() : (t.addEventListener("canplay", this._onCanPlay), t.addEventListener("canplaythrough", this._onCanPlay), t.addEventListener("error", this._onError, !0)), this._load = new Promise((e, i) => {
      this.valid ? e(this) : (this._resolve = e, this._reject = i, t.load());
    }), this._load;
  }
  /**
   * Handle video error events.
   * @param event
   */
  _onError(t) {
    this.source.removeEventListener("error", this._onError, !0), this.onError.emit(t), this._reject && (this._reject(t), this._reject = null, this._resolve = null);
  }
  /**
   * Returns true if the underlying source is playing.
   * @returns - True if playing.
   */
  _isSourcePlaying() {
    const t = this.source;
    return !t.paused && !t.ended;
  }
  /**
   * Returns true if the underlying source is ready for playing.
   * @returns - True if ready.
   */
  _isSourceReady() {
    return this.source.readyState > 2;
  }
  /** Runs the update loop when the video is ready to play. */
  _onPlayStart() {
    this.valid || this._onCanPlay(), this._configureAutoUpdate();
  }
  /** Fired when a pause event is triggered, stops the update loop. */
  _onPlayStop() {
    this._configureAutoUpdate();
  }
  /** Fired when the video is completed seeking to the current playback position. */
  _onSeeked() {
    this._autoUpdate && !this._isSourcePlaying() && (this._msToNextUpdate = 0, this.update(), this._msToNextUpdate = 0);
  }
  /** Fired when the video is loaded and ready to play. */
  _onCanPlay() {
    const t = this.source;
    t.removeEventListener("canplay", this._onCanPlay), t.removeEventListener("canplaythrough", this._onCanPlay);
    const e = this.valid;
    this._msToNextUpdate = 0, this.update(), this._msToNextUpdate = 0, !e && this._resolve && (this._resolve(this), this._resolve = null, this._reject = null), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && t.play();
  }
  /** Destroys this texture. */
  dispose() {
    this._configureAutoUpdate();
    const t = this.source;
    t && (t.removeEventListener("play", this._onPlayStart), t.removeEventListener("pause", this._onPlayStop), t.removeEventListener("seeked", this._onSeeked), t.removeEventListener("canplay", this._onCanPlay), t.removeEventListener("canplaythrough", this._onCanPlay), t.removeEventListener("error", this._onError, !0), t.pause(), t.src = "", t.load()), super.dispose();
  }
  /** Should the base texture automatically update itself, set to true by default. */
  get autoUpdate() {
    return this._autoUpdate;
  }
  set autoUpdate(t) {
    t !== this._autoUpdate && (this._autoUpdate = t, this._configureAutoUpdate());
  }
  /**
   * How many times a second to update the texture from the video. If 0, `requestVideoFrameCallback` is used to
   * update the texture. If `requestVideoFrameCallback` is not available, the texture is updated every render.
   * A lower fps can help performance, as updating the texture at 60fps on a 30ps video may not be efficient.
   */
  get updateFPS() {
    return this._updateFPS;
  }
  set updateFPS(t) {
    t !== this._updateFPS && (this._updateFPS = t, this._configureAutoUpdate());
  }
  _configureAutoUpdate() {
    this._autoUpdate && this._isSourcePlaying() ? !this._updateFPS && this.source.requestVideoFrameCallback ? (this._isConnectedToTicker && (zt.shared.remove(this.update, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0), this._videoFrameRequestCallbackHandle === null && (this._videoFrameRequestCallbackHandle = this.source.requestVideoFrameCallback(
      this._videoFrameRequestCallback
    ))) : (this._videoFrameRequestCallbackHandle !== null && (this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker || (zt.shared.add(this.update, this), this._isConnectedToTicker = !0, this._msToNextUpdate = 0)) : (this._videoFrameRequestCallbackHandle !== null && (this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker && (zt.shared.remove(this.update, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0));
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @param {string} extension - The extension of source, if set
   * @returns {boolean} `true` if video source
   */
  static test(t, e) {
    return globalThis.HTMLVideoElement && t instanceof HTMLVideoElement || ks.TYPES.includes(e);
  }
};
Bs.TYPES = ["mp4", "m4v", "webm", "ogg", "ogv", "h264", "avi", "mov"], /**
* Map of video MIME types that can't be directly derived from file extensions.
* @readonly
*/
Bs.MIME_TYPES = {
  ogv: "video/ogg",
  mov: "video/quicktime",
  m4v: "video/mp4"
};
let Ef = Bs;
Rs.push(
  ke,
  Ia,
  _f,
  Ef,
  Tf,
  bf,
  ma,
  xf,
  vf
);
class vo {
  constructor() {
    this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.rect = null, this.updateID = -1;
  }
  /**
   * Checks if bounds are empty.
   * @returns - True if empty.
   */
  isEmpty() {
    return this.minX > this.maxX || this.minY > this.maxY;
  }
  /** Clears the bounds and resets. */
  clear() {
    this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0;
  }
  /**
   * Can return Rectangle.EMPTY constant, either construct new rectangle, either use your rectangle
   * It is not guaranteed that it will return tempRect
   * @param rect - Temporary object will be used if AABB is not empty
   * @returns - A rectangle of the bounds
   */
  getRectangle(t) {
    return this.minX > this.maxX || this.minY > this.maxY ? H.EMPTY : (t = t || new H(0, 0, 1, 1), t.x = this.minX, t.y = this.minY, t.width = this.maxX - this.minX, t.height = this.maxY - this.minY, t);
  }
  /**
   * This function should be inlined when its possible.
   * @param point - The point to add.
   */
  addPoint(t) {
    this.minX = Math.min(this.minX, t.x), this.maxX = Math.max(this.maxX, t.x), this.minY = Math.min(this.minY, t.y), this.maxY = Math.max(this.maxY, t.y);
  }
  /**
   * Adds a point, after transformed. This should be inlined when its possible.
   * @param matrix
   * @param point
   */
  addPointMatrix(t, e) {
    const { a: i, b: s, c: n, d: o, tx: a, ty: h } = t, l = i * e.x + n * e.y + a, u = s * e.x + o * e.y + h;
    this.minX = Math.min(this.minX, l), this.maxX = Math.max(this.maxX, l), this.minY = Math.min(this.minY, u), this.maxY = Math.max(this.maxY, u);
  }
  /**
   * Adds a quad, not transformed
   * @param vertices - The verts to add.
   */
  addQuad(t) {
    let e = this.minX, i = this.minY, s = this.maxX, n = this.maxY, o = t[0], a = t[1];
    e = o < e ? o : e, i = a < i ? a : i, s = o > s ? o : s, n = a > n ? a : n, o = t[2], a = t[3], e = o < e ? o : e, i = a < i ? a : i, s = o > s ? o : s, n = a > n ? a : n, o = t[4], a = t[5], e = o < e ? o : e, i = a < i ? a : i, s = o > s ? o : s, n = a > n ? a : n, o = t[6], a = t[7], e = o < e ? o : e, i = a < i ? a : i, s = o > s ? o : s, n = a > n ? a : n, this.minX = e, this.minY = i, this.maxX = s, this.maxY = n;
  }
  /**
   * Adds sprite frame, transformed.
   * @param transform - transform to apply
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   */
  addFrame(t, e, i, s, n) {
    this.addFrameMatrix(t.worldTransform, e, i, s, n);
  }
  /**
   * Adds sprite frame, multiplied by matrix
   * @param matrix - matrix to apply
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   */
  addFrameMatrix(t, e, i, s, n) {
    const o = t.a, a = t.b, h = t.c, l = t.d, u = t.tx, c = t.ty;
    let d = this.minX, f = this.minY, p = this.maxX, v = this.maxY, y = o * e + h * i + u, E = a * e + l * i + c;
    d = y < d ? y : d, f = E < f ? E : f, p = y > p ? y : p, v = E > v ? E : v, y = o * s + h * i + u, E = a * s + l * i + c, d = y < d ? y : d, f = E < f ? E : f, p = y > p ? y : p, v = E > v ? E : v, y = o * e + h * n + u, E = a * e + l * n + c, d = y < d ? y : d, f = E < f ? E : f, p = y > p ? y : p, v = E > v ? E : v, y = o * s + h * n + u, E = a * s + l * n + c, d = y < d ? y : d, f = E < f ? E : f, p = y > p ? y : p, v = E > v ? E : v, this.minX = d, this.minY = f, this.maxX = p, this.maxY = v;
  }
  /**
   * Adds screen vertices from array
   * @param vertexData - calculated vertices
   * @param beginOffset - begin offset
   * @param endOffset - end offset, excluded
   */
  addVertexData(t, e, i) {
    let s = this.minX, n = this.minY, o = this.maxX, a = this.maxY;
    for (let h = e; h < i; h += 2) {
      const l = t[h], u = t[h + 1];
      s = l < s ? l : s, n = u < n ? u : n, o = l > o ? l : o, a = u > a ? u : a;
    }
    this.minX = s, this.minY = n, this.maxX = o, this.maxY = a;
  }
  /**
   * Add an array of mesh vertices
   * @param transform - mesh transform
   * @param vertices - mesh coordinates in array
   * @param beginOffset - begin offset
   * @param endOffset - end offset, excluded
   */
  addVertices(t, e, i, s) {
    this.addVerticesMatrix(t.worldTransform, e, i, s);
  }
  /**
   * Add an array of mesh vertices.
   * @param matrix - mesh matrix
   * @param vertices - mesh coordinates in array
   * @param beginOffset - begin offset
   * @param endOffset - end offset, excluded
   * @param padX - x padding
   * @param padY - y padding
   */
  addVerticesMatrix(t, e, i, s, n = 0, o = n) {
    const a = t.a, h = t.b, l = t.c, u = t.d, c = t.tx, d = t.ty;
    let f = this.minX, p = this.minY, v = this.maxX, y = this.maxY;
    for (let E = i; E < s; E += 2) {
      const _ = e[E], g = e[E + 1], T = a * _ + l * g + c, A = u * g + h * _ + d;
      f = Math.min(f, T - n), v = Math.max(v, T + n), p = Math.min(p, A - o), y = Math.max(y, A + o);
    }
    this.minX = f, this.minY = p, this.maxX = v, this.maxY = y;
  }
  /**
   * Adds other {@link PIXI.Bounds}.
   * @param bounds - The Bounds to be added
   */
  addBounds(t) {
    const e = this.minX, i = this.minY, s = this.maxX, n = this.maxY;
    this.minX = t.minX < e ? t.minX : e, this.minY = t.minY < i ? t.minY : i, this.maxX = t.maxX > s ? t.maxX : s, this.maxY = t.maxY > n ? t.maxY : n;
  }
  /**
   * Adds other Bounds, masked with Bounds.
   * @param bounds - The Bounds to be added.
   * @param mask - TODO
   */
  addBoundsMask(t, e) {
    const i = t.minX > e.minX ? t.minX : e.minX, s = t.minY > e.minY ? t.minY : e.minY, n = t.maxX < e.maxX ? t.maxX : e.maxX, o = t.maxY < e.maxY ? t.maxY : e.maxY;
    if (i <= n && s <= o) {
      const a = this.minX, h = this.minY, l = this.maxX, u = this.maxY;
      this.minX = i < a ? i : a, this.minY = s < h ? s : h, this.maxX = n > l ? n : l, this.maxY = o > u ? o : u;
    }
  }
  /**
   * Adds other Bounds, multiplied by matrix. Bounds shouldn't be empty.
   * @param bounds - other bounds
   * @param matrix - multiplicator
   */
  addBoundsMatrix(t, e) {
    this.addFrameMatrix(e, t.minX, t.minY, t.maxX, t.maxY);
  }
  /**
   * Adds other Bounds, masked with Rectangle.
   * @param bounds - TODO
   * @param area - TODO
   */
  addBoundsArea(t, e) {
    const i = t.minX > e.x ? t.minX : e.x, s = t.minY > e.y ? t.minY : e.y, n = t.maxX < e.x + e.width ? t.maxX : e.x + e.width, o = t.maxY < e.y + e.height ? t.maxY : e.y + e.height;
    if (i <= n && s <= o) {
      const a = this.minX, h = this.minY, l = this.maxX, u = this.maxY;
      this.minX = i < a ? i : a, this.minY = s < h ? s : h, this.maxX = n > l ? n : l, this.maxY = o > u ? o : u;
    }
  }
  /**
   * Pads bounds object, making it grow in all directions.
   * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
   * @param paddingX - The horizontal padding amount.
   * @param paddingY - The vertical padding amount.
   */
  pad(t = 0, e = t) {
    this.isEmpty() || (this.minX -= t, this.maxX += t, this.minY -= e, this.maxY += e);
  }
  /**
   * Adds padded frame. (x0, y0) should be strictly less than (x1, y1)
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   * @param padX - padding X
   * @param padY - padding Y
   */
  addFramePad(t, e, i, s, n, o) {
    t -= n, e -= o, i += n, s += o, this.minX = this.minX < t ? this.minX : t, this.maxX = this.maxX > i ? this.maxX : i, this.minY = this.minY < e ? this.minY : e, this.maxY = this.maxY > s ? this.maxY : s;
  }
}
class We extends Ie {
  constructor() {
    super(), this.tempDisplayObjectParent = null, this.transform = new wi(), this.alpha = 1, this.visible = !0, this.renderable = !0, this.cullable = !1, this.cullArea = null, this.parent = null, this.worldAlpha = 1, this._lastSortedIndex = 0, this._zIndex = 0, this.filterArea = null, this.filters = null, this._enabledFilters = null, this._bounds = new vo(), this._localBounds = null, this._boundsID = 0, this._boundsRect = null, this._localBoundsRect = null, this._mask = null, this._maskRefCount = 0, this._destroyed = !1, this.isSprite = !1, this.isMask = !1;
  }
  /**
   * Mixes all enumerable properties and methods from a source object to DisplayObject.
   * @param source - The source of properties and methods to mix in.
   */
  static mixin(t) {
    const e = Object.keys(t);
    for (let i = 0; i < e.length; ++i) {
      const s = e[i];
      Object.defineProperty(
        We.prototype,
        s,
        Object.getOwnPropertyDescriptor(t, s)
      );
    }
  }
  /**
   * Fired when this DisplayObject is added to a Container.
   * @instance
   * @event added
   * @param {PIXI.Container} container - The container added to.
   */
  /**
   * Fired when this DisplayObject is removed from a Container.
   * @instance
   * @event removed
   * @param {PIXI.Container} container - The container removed from.
   */
  /**
   * Fired when this DisplayObject is destroyed. This event is emitted once
   * destroy is finished.
   * @instance
   * @event destroyed
   */
  /** Readonly flag for destroyed display objects. */
  get destroyed() {
    return this._destroyed;
  }
  /** Recursively updates transform of all objects from the root to this one internal function for toLocal() */
  _recursivePostUpdateTransform() {
    this.parent ? (this.parent._recursivePostUpdateTransform(), this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(this._tempDisplayObjectParent.transform);
  }
  /** Updates the object transform for rendering. TODO - Optimization pass! */
  updateTransform() {
    this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
  }
  /**
   * Calculates and returns the (world) bounds of the display object as a [Rectangle]{@link PIXI.Rectangle}.
   *
   * This method is expensive on containers with a large subtree (like the stage). This is because the bounds
   * of a container depend on its children's bounds, which recursively causes all bounds in the subtree to
   * be recalculated. The upside, however, is that calling `getBounds` once on a container will indeed update
   * the bounds of all children (the whole subtree, in fact). This side effect should be exploited by using
   * `displayObject._bounds.getRectangle()` when traversing through all the bounds in a scene graph. Otherwise,
   * calling `getBounds` on each object in a subtree will cause the total cost to increase quadratically as
   * its height increases.
   *
   * The transforms of all objects in a container's **subtree** and of all **ancestors** are updated.
   * The world bounds of all display objects in a container's **subtree** will also be recalculated.
   *
   * The `_bounds` object stores the last calculation of the bounds. You can use to entirely skip bounds
   * calculation if needed.
   *
   * ```js
   * const lastCalculatedBounds = displayObject._bounds.getRectangle(optionalRect);
   * ```
   *
   * Do know that usage of `getLocalBounds` can corrupt the `_bounds` of children (the whole subtree, actually). This
   * is a known issue that has not been solved. See [getLocalBounds]{@link PIXI.DisplayObject#getLocalBounds} for more
   * details.
   *
   * `getBounds` should be called with `skipUpdate` equal to `true` in a render() call. This is because the transforms
   * are guaranteed to be update-to-date. In fact, recalculating inside a render() call may cause corruption in certain
   * cases.
   * @param skipUpdate - Setting to `true` will stop the transforms of the scene graph from
   *  being updated. This means the calculation returned MAY be out of date BUT will give you a
   *  nice performance boost.
   * @param rect - Optional rectangle to store the result of the bounds calculation.
   * @returns - The minimum axis-aligned rectangle in world space that fits around this object.
   */
  getBounds(t, e) {
    return t || (this.parent ? (this._recursivePostUpdateTransform(), this.updateTransform()) : (this.parent = this._tempDisplayObjectParent, this.updateTransform(), this.parent = null)), this._bounds.updateID !== this._boundsID && (this.calculateBounds(), this._bounds.updateID = this._boundsID), e || (this._boundsRect || (this._boundsRect = new H()), e = this._boundsRect), this._bounds.getRectangle(e);
  }
  /**
   * Retrieves the local bounds of the displayObject as a rectangle object.
   * @param rect - Optional rectangle to store the result of the bounds calculation.
   * @returns - The rectangular bounding area.
   */
  getLocalBounds(t) {
    t || (this._localBoundsRect || (this._localBoundsRect = new H()), t = this._localBoundsRect), this._localBounds || (this._localBounds = new vo());
    const e = this.transform, i = this.parent;
    this.parent = null, this._tempDisplayObjectParent.worldAlpha = (i == null ? void 0 : i.worldAlpha) ?? 1, this.transform = this._tempDisplayObjectParent.transform;
    const s = this._bounds, n = this._boundsID;
    this._bounds = this._localBounds;
    const o = this.getBounds(!1, t);
    return this.parent = i, this.transform = e, this._bounds = s, this._bounds.updateID += this._boundsID - n, o;
  }
  /**
   * Calculates the global position of the display object.
   * @param position - The world origin to calculate from.
   * @param point - A Point object in which to store the value, optional
   *  (otherwise will create a new Point).
   * @param skipUpdate - Should we skip the update transform.
   * @returns - A point object representing the position of this object.
   */
  toGlobal(t, e, i = !1) {
    return i || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.apply(t, e);
  }
  /**
   * Calculates the local position of the display object relative to another point.
   * @param position - The world origin to calculate from.
   * @param from - The DisplayObject to calculate the global position from.
   * @param point - A Point object in which to store the value, optional
   *  (otherwise will create a new Point).
   * @param skipUpdate - Should we skip the update transform
   * @returns - A point object representing the position of this object
   */
  toLocal(t, e, i, s) {
    return e && (t = e.toGlobal(t, i, s)), s || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.applyInverse(t, i);
  }
  /**
   * Set the parent Container of this DisplayObject.
   * @param container - The Container to add this DisplayObject to.
   * @returns - The Container that this DisplayObject was added to.
   */
  setParent(t) {
    if (!t || !t.addChild)
      throw new Error("setParent: Argument must be a Container");
    return t.addChild(this), t;
  }
  /** Remove the DisplayObject from its parent Container. If the DisplayObject has no parent, do nothing. */
  removeFromParent() {
    var t;
    (t = this.parent) == null || t.removeChild(this);
  }
  /**
   * Convenience function to set the position, scale, skew and pivot at once.
   * @param x - The X position
   * @param y - The Y position
   * @param scaleX - The X scale value
   * @param scaleY - The Y scale value
   * @param rotation - The rotation
   * @param skewX - The X skew value
   * @param skewY - The Y skew value
   * @param pivotX - The X pivot value
   * @param pivotY - The Y pivot value
   * @returns - The DisplayObject instance
   */
  setTransform(t = 0, e = 0, i = 1, s = 1, n = 0, o = 0, a = 0, h = 0, l = 0) {
    return this.position.x = t, this.position.y = e, this.scale.x = i || 1, this.scale.y = s || 1, this.rotation = n, this.skew.x = o, this.skew.y = a, this.pivot.x = h, this.pivot.y = l, this;
  }
  /**
   * Base destroy method for generic display objects. This will automatically
   * remove the display object from its parent Container as well as remove
   * all current event listeners and internal references. Do not use a DisplayObject
   * after calling `destroy()`.
   * @param _options
   */
  destroy(t) {
    this.removeFromParent(), this._destroyed = !0, this.transform = null, this.parent = null, this._bounds = null, this.mask = null, this.cullArea = null, this.filters = null, this.filterArea = null, this.hitArea = null, this.eventMode = "auto", this.interactiveChildren = !1, this.emit("destroyed"), this.removeAllListeners();
  }
  /**
   * @protected
   * @member {PIXI.Container}
   */
  get _tempDisplayObjectParent() {
    return this.tempDisplayObjectParent === null && (this.tempDisplayObjectParent = new wf()), this.tempDisplayObjectParent;
  }
  /**
   * Used in Renderer, cacheAsBitmap and other places where you call an `updateTransform` on root.
   *
   * ```js
   * const cacheParent = elem.enableTempParent();
   * elem.updateTransform();
   * elem.disableTempParent(cacheParent);
   * ```
   * @returns - Current parent
   */
  enableTempParent() {
    const t = this.parent;
    return this.parent = this._tempDisplayObjectParent, t;
  }
  /**
   * Pair method for `enableTempParent`
   * @param cacheParent - Actual parent of element
   */
  disableTempParent(t) {
    this.parent = t;
  }
  /**
   * The position of the displayObject on the x axis relative to the local coordinates of the parent.
   * An alias to position.x
   */
  get x() {
    return this.position.x;
  }
  set x(t) {
    this.transform.position.x = t;
  }
  /**
   * The position of the displayObject on the y axis relative to the local coordinates of the parent.
   * An alias to position.y
   */
  get y() {
    return this.position.y;
  }
  set y(t) {
    this.transform.position.y = t;
  }
  /**
   * Current transform of the object based on world (parent) factors.
   * @readonly
   */
  get worldTransform() {
    return this.transform.worldTransform;
  }
  /**
   * Current transform of the object based on local factors: position, scale, other stuff.
   * @readonly
   */
  get localTransform() {
    return this.transform.localTransform;
  }
  /**
   * The coordinate of the object relative to the local coordinates of the parent.
   * @since 4.0.0
   */
  get position() {
    return this.transform.position;
  }
  set position(t) {
    this.transform.position.copyFrom(t);
  }
  /**
   * The scale factors of this object along the local coordinate axes.
   *
   * The default scale is (1, 1).
   * @since 4.0.0
   */
  get scale() {
    return this.transform.scale;
  }
  set scale(t) {
    this.transform.scale.copyFrom(t);
  }
  /**
   * The center of rotation, scaling, and skewing for this display object in its local space. The `position`
   * is the projection of `pivot` in the parent's local space.
   *
   * By default, the pivot is the origin (0, 0).
   * @since 4.0.0
   */
  get pivot() {
    return this.transform.pivot;
  }
  set pivot(t) {
    this.transform.pivot.copyFrom(t);
  }
  /**
   * The skew factor for the object in radians.
   * @since 4.0.0
   */
  get skew() {
    return this.transform.skew;
  }
  set skew(t) {
    this.transform.skew.copyFrom(t);
  }
  /**
   * The rotation of the object in radians.
   * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
   */
  get rotation() {
    return this.transform.rotation;
  }
  set rotation(t) {
    this.transform.rotation = t;
  }
  /**
   * The angle of the object in degrees.
   * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
   */
  get angle() {
    return this.transform.rotation * fd;
  }
  set angle(t) {
    this.transform.rotation = t * pd;
  }
  /**
   * The zIndex of the displayObject.
   *
   * If a container has the sortableChildren property set to true, children will be automatically
   * sorted by zIndex value; a higher value will mean it will be moved towards the end of the array,
   * and thus rendered on top of other display objects within the same container.
   * @see PIXI.Container#sortableChildren
   */
  get zIndex() {
    return this._zIndex;
  }
  set zIndex(t) {
    this._zIndex !== t && (this._zIndex = t, this.parent && (this.parent.sortDirty = !0));
  }
  /**
   * Indicates if the object is globally visible.
   * @readonly
   */
  get worldVisible() {
    let t = this;
    do {
      if (!t.visible)
        return !1;
      t = t.parent;
    } while (t);
    return !0;
  }
  /**
   * Sets a mask for the displayObject. A mask is an object that limits the visibility of an
   * object to the shape of the mask applied to it. In PixiJS a regular mask must be a
   * {@link PIXI.Graphics} or a {@link PIXI.Sprite} object. This allows for much faster masking in canvas as it
   * utilities shape clipping. Furthermore, a mask of an object must be in the subtree of its parent.
   * Otherwise, `getLocalBounds` may calculate incorrect bounds, which makes the container's width and height wrong.
   * To remove a mask, set this property to `null`.
   *
   * For sprite mask both alpha and red channel are used. Black mask is the same as transparent mask.
   * @example
   * import { Graphics, Sprite } from 'pixi.js';
   *
   * const graphics = new Graphics();
   * graphics.beginFill(0xFF3300);
   * graphics.drawRect(50, 250, 100, 100);
   * graphics.endFill();
   *
   * const sprite = new Sprite(texture);
   * sprite.mask = graphics;
   * @todo At the moment, CanvasRenderer doesn't support Sprite as mask.
   */
  get mask() {
    return this._mask;
  }
  set mask(t) {
    if (this._mask !== t) {
      if (this._mask) {
        const e = this._mask.isMaskData ? this._mask.maskObject : this._mask;
        e && (e._maskRefCount--, e._maskRefCount === 0 && (e.renderable = !0, e.isMask = !1));
      }
      if (this._mask = t, this._mask) {
        const e = this._mask.isMaskData ? this._mask.maskObject : this._mask;
        e && (e._maskRefCount === 0 && (e.renderable = !1, e.isMask = !0), e._maskRefCount++);
      }
    }
  }
}
class wf extends We {
  constructor() {
    super(...arguments), this.sortDirty = null;
  }
}
We.prototype.displayObjectUpdateTransform = We.prototype.updateTransform;
const If = new q();
function Af(r, t) {
  return r.zIndex === t.zIndex ? r._lastSortedIndex - t._lastSortedIndex : r.zIndex - t.zIndex;
}
const Za = class Gs extends We {
  constructor() {
    super(), this.children = [], this.sortableChildren = Gs.defaultSortableChildren, this.sortDirty = !1;
  }
  /**
   * Overridable method that can be used by Container subclasses whenever the children array is modified.
   * @param _length
   */
  onChildrenChange(t) {
  }
  /**
   * Adds one or more children to the container.
   *
   * Multiple items can be added like so: `myContainer.addChild(thingOne, thingTwo, thingThree)`
   * @param {...PIXI.DisplayObject} children - The DisplayObject(s) to add to the container
   * @returns {PIXI.DisplayObject} - The first child that was added.
   */
  addChild(...t) {
    if (t.length > 1)
      for (let e = 0; e < t.length; e++)
        this.addChild(t[e]);
    else {
      const e = t[0];
      e.parent && e.parent.removeChild(e), e.parent = this, this.sortDirty = !0, e.transform._parentID = -1, this.children.push(e), this._boundsID++, this.onChildrenChange(this.children.length - 1), this.emit("childAdded", e, this, this.children.length - 1), e.emit("added", this);
    }
    return t[0];
  }
  /**
   * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown.
   * If the child is already in this container, it will be moved to the specified index.
   * @param {PIXI.DisplayObject} child - The child to add.
   * @param {number} index - The absolute index where the child will be positioned at the end of the operation.
   * @returns {PIXI.DisplayObject} The child that was added.
   */
  addChildAt(t, e) {
    if (e < 0 || e > this.children.length)
      throw new Error(`${t}addChildAt: The index ${e} supplied is out of bounds ${this.children.length}`);
    return t.parent && t.parent.removeChild(t), t.parent = this, this.sortDirty = !0, t.transform._parentID = -1, this.children.splice(e, 0, t), this._boundsID++, this.onChildrenChange(e), t.emit("added", this), this.emit("childAdded", t, this, e), t;
  }
  /**
   * Swaps the position of 2 Display Objects within this container.
   * @param child - First display object to swap
   * @param child2 - Second display object to swap
   */
  swapChildren(t, e) {
    if (t === e)
      return;
    const i = this.getChildIndex(t), s = this.getChildIndex(e);
    this.children[i] = e, this.children[s] = t, this.onChildrenChange(i < s ? i : s);
  }
  /**
   * Returns the index position of a child DisplayObject instance
   * @param child - The DisplayObject instance to identify
   * @returns - The index position of the child display object to identify
   */
  getChildIndex(t) {
    const e = this.children.indexOf(t);
    if (e === -1)
      throw new Error("The supplied DisplayObject must be a child of the caller");
    return e;
  }
  /**
   * Changes the position of an existing child in the display object container
   * @param child - The child DisplayObject instance for which you want to change the index number
   * @param index - The resulting index number for the child display object
   */
  setChildIndex(t, e) {
    if (e < 0 || e >= this.children.length)
      throw new Error(`The index ${e} supplied is out of bounds ${this.children.length}`);
    const i = this.getChildIndex(t);
    zr(this.children, i, 1), this.children.splice(e, 0, t), this.onChildrenChange(e);
  }
  /**
   * Returns the child at the specified index
   * @param index - The index to get the child at
   * @returns - The child at the given index, if any.
   */
  getChildAt(t) {
    if (t < 0 || t >= this.children.length)
      throw new Error(`getChildAt: Index (${t}) does not exist.`);
    return this.children[t];
  }
  /**
   * Removes one or more children from the container.
   * @param {...PIXI.DisplayObject} children - The DisplayObject(s) to remove
   * @returns {PIXI.DisplayObject} The first child that was removed.
   */
  removeChild(...t) {
    if (t.length > 1)
      for (let e = 0; e < t.length; e++)
        this.removeChild(t[e]);
    else {
      const e = t[0], i = this.children.indexOf(e);
      if (i === -1)
        return null;
      e.parent = null, e.transform._parentID = -1, zr(this.children, i, 1), this._boundsID++, this.onChildrenChange(i), e.emit("removed", this), this.emit("childRemoved", e, this, i);
    }
    return t[0];
  }
  /**
   * Removes a child from the specified index position.
   * @param index - The index to get the child from
   * @returns The child that was removed.
   */
  removeChildAt(t) {
    const e = this.getChildAt(t);
    return e.parent = null, e.transform._parentID = -1, zr(this.children, t, 1), this._boundsID++, this.onChildrenChange(t), e.emit("removed", this), this.emit("childRemoved", e, this, t), e;
  }
  /**
   * Removes all children from this container that are within the begin and end indexes.
   * @param beginIndex - The beginning position.
   * @param endIndex - The ending position. Default value is size of the container.
   * @returns - List of removed children
   */
  removeChildren(t = 0, e = this.children.length) {
    const i = t, s = e, n = s - i;
    let o;
    if (n > 0 && n <= s) {
      o = this.children.splice(i, n);
      for (let a = 0; a < o.length; ++a)
        o[a].parent = null, o[a].transform && (o[a].transform._parentID = -1);
      this._boundsID++, this.onChildrenChange(t);
      for (let a = 0; a < o.length; ++a)
        o[a].emit("removed", this), this.emit("childRemoved", o[a], this, a);
      return o;
    } else if (n === 0 && this.children.length === 0)
      return [];
    throw new RangeError("removeChildren: numeric values are outside the acceptable range.");
  }
  /** Sorts children by zIndex. Previous order is maintained for 2 children with the same zIndex. */
  sortChildren() {
    let t = !1;
    for (let e = 0, i = this.children.length; e < i; ++e) {
      const s = this.children[e];
      s._lastSortedIndex = e, !t && s.zIndex !== 0 && (t = !0);
    }
    t && this.children.length > 1 && this.children.sort(Af), this.sortDirty = !1;
  }
  /** Updates the transform on all children of this container for rendering. */
  updateTransform() {
    this.sortableChildren && this.sortDirty && this.sortChildren(), this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
    for (let t = 0, e = this.children.length; t < e; ++t) {
      const i = this.children[t];
      i.visible && i.updateTransform();
    }
  }
  /**
   * Recalculates the bounds of the container.
   *
   * This implementation will automatically fit the children's bounds into the calculation. Each child's bounds
   * is limited to its mask's bounds or filterArea, if any is applied.
   */
  calculateBounds() {
    this._bounds.clear(), this._calculateBounds();
    for (let t = 0; t < this.children.length; t++) {
      const e = this.children[t];
      if (!(!e.visible || !e.renderable))
        if (e.calculateBounds(), e._mask) {
          const i = e._mask.isMaskData ? e._mask.maskObject : e._mask;
          i ? (i.calculateBounds(), this._bounds.addBoundsMask(e._bounds, i._bounds)) : this._bounds.addBounds(e._bounds);
        } else
          e.filterArea ? this._bounds.addBoundsArea(e._bounds, e.filterArea) : this._bounds.addBounds(e._bounds);
    }
    this._bounds.updateID = this._boundsID;
  }
  /**
   * Retrieves the local bounds of the displayObject as a rectangle object.
   *
   * Calling `getLocalBounds` may invalidate the `_bounds` of the whole subtree below. If using it inside a render()
   * call, it is advised to call `getBounds()` immediately after to recalculate the world bounds of the subtree.
   * @param rect - Optional rectangle to store the result of the bounds calculation.
   * @param skipChildrenUpdate - Setting to `true` will stop re-calculation of children transforms,
   *  it was default behaviour of pixi 4.0-5.2 and caused many problems to users.
   * @returns - The rectangular bounding area.
   */
  getLocalBounds(t, e = !1) {
    const i = super.getLocalBounds(t);
    if (!e)
      for (let s = 0, n = this.children.length; s < n; ++s) {
        const o = this.children[s];
        o.visible && o.updateTransform();
      }
    return i;
  }
  /**
   * Recalculates the content bounds of this object. This should be overriden to
   * calculate the bounds of this specific object (not including children).
   * @protected
   */
  _calculateBounds() {
  }
  /**
   * Renders this object and its children with culling.
   * @protected
   * @param {PIXI.Renderer} renderer - The renderer
   */
  _renderWithCulling(t) {
    const e = t.renderTexture.sourceFrame;
    if (!(e.width > 0 && e.height > 0))
      return;
    let i, s;
    this.cullArea ? (i = this.cullArea, s = this.worldTransform) : this._render !== Gs.prototype._render && (i = this.getBounds(!0));
    const n = t.projection.transform;
    if (n && (s ? (s = If.copyFrom(s), s.prepend(n)) : s = n), i && e.intersects(i, s))
      this._render(t);
    else if (this.cullArea)
      return;
    for (let o = 0, a = this.children.length; o < a; ++o) {
      const h = this.children[o], l = h.cullable;
      h.cullable = l || !this.cullArea, h.render(t), h.cullable = l;
    }
  }
  /**
   * Renders the object using the WebGL renderer.
   *
   * The [_render]{@link PIXI.Container#_render} method is be overriden for rendering the contents of the
   * container itself. This `render` method will invoke it, and also invoke the `render` methods of all
   * children afterward.
   *
   * If `renderable` or `visible` is false or if `worldAlpha` is not positive or if `cullable` is true and
   * the bounds of this object are out of frame, this implementation will entirely skip rendering.
   * See {@link PIXI.DisplayObject} for choosing between `renderable` or `visible`. Generally,
   * setting alpha to zero is not recommended for purely skipping rendering.
   *
   * When your scene becomes large (especially when it is larger than can be viewed in a single screen), it is
   * advised to employ **culling** to automatically skip rendering objects outside of the current screen.
   * See [cullable]{@link PIXI.DisplayObject#cullable} and [cullArea]{@link PIXI.DisplayObject#cullArea}.
   * Other culling methods might be better suited for a large number static objects; see
   * [@pixi-essentials/cull]{@link https://www.npmjs.com/package/@pixi-essentials/cull} and
   * [pixi-cull]{@link https://www.npmjs.com/package/pixi-cull}.
   *
   * The [renderAdvanced]{@link PIXI.Container#renderAdvanced} method is internally used when when masking or
   * filtering is applied on a container. This does, however, break batching and can affect performance when
   * masking and filtering is applied extensively throughout the scene graph.
   * @param renderer - The renderer
   */
  render(t) {
    var e;
    if (!(!this.visible || this.worldAlpha <= 0 || !this.renderable))
      if (this._mask || (e = this.filters) != null && e.length)
        this.renderAdvanced(t);
      else if (this.cullable)
        this._renderWithCulling(t);
      else {
        this._render(t);
        for (let i = 0, s = this.children.length; i < s; ++i)
          this.children[i].render(t);
      }
  }
  /**
   * Render the object using the WebGL renderer and advanced features.
   * @param renderer - The renderer
   */
  renderAdvanced(t) {
    var n, o, a;
    const e = this.filters, i = this._mask;
    if (e) {
      this._enabledFilters || (this._enabledFilters = []), this._enabledFilters.length = 0;
      for (let h = 0; h < e.length; h++)
        e[h].enabled && this._enabledFilters.push(e[h]);
    }
    const s = e && ((n = this._enabledFilters) == null ? void 0 : n.length) || i && (!i.isMaskData || i.enabled && (i.autoDetect || i.type !== et.NONE));
    if (s && t.batch.flush(), e && ((o = this._enabledFilters) != null && o.length) && t.filter.push(this, this._enabledFilters), i && t.mask.push(this, this._mask), this.cullable)
      this._renderWithCulling(t);
    else {
      this._render(t);
      for (let h = 0, l = this.children.length; h < l; ++h)
        this.children[h].render(t);
    }
    s && t.batch.flush(), i && t.mask.pop(this), e && ((a = this._enabledFilters) != null && a.length) && t.filter.pop();
  }
  /**
   * To be overridden by the subclasses.
   * @param _renderer - The renderer
   */
  _render(t) {
  }
  /**
   * Removes all internal references and listeners as well as removes children from the display list.
   * Do not use a Container after calling `destroy`.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.children=false] - if set to true, all the children will have their destroy
   *  method called as well. 'options' will be passed on to those calls.
   * @param {boolean} [options.texture=false] - Only used for child Sprites if options.children is set to true
   *  Should it destroy the texture of the child sprite
   * @param {boolean} [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
   *  Should it destroy the base texture of the child sprite
   */
  destroy(t) {
    super.destroy(), this.sortDirty = !1;
    const e = typeof t == "boolean" ? t : t == null ? void 0 : t.children, i = this.removeChildren(0, this.children.length);
    if (e)
      for (let s = 0; s < i.length; ++s)
        i[s].destroy(t);
  }
  /** The width of the Container, setting this will actually modify the scale to achieve the value set. */
  get width() {
    return this.scale.x * this.getLocalBounds().width;
  }
  set width(t) {
    const e = this.getLocalBounds().width;
    e !== 0 ? this.scale.x = t / e : this.scale.x = 1, this._width = t;
  }
  /** The height of the Container, setting this will actually modify the scale to achieve the value set. */
  get height() {
    return this.scale.y * this.getLocalBounds().height;
  }
  set height(t) {
    const e = this.getLocalBounds().height;
    e !== 0 ? this.scale.y = t / e : this.scale.y = 1, this._height = t;
  }
};
Za.defaultSortableChildren = !1;
let Ye = Za;
Ye.prototype.containerUpdateTransform = Ye.prototype.updateTransform;
Object.defineProperties(L, {
  /**
   * Sets the default value for the container property 'sortableChildren'.
   * @static
   * @name SORTABLE_CHILDREN
   * @memberof PIXI.settings
   * @deprecated since 7.1.0
   * @type {boolean}
   * @see PIXI.Container.defaultSortableChildren
   */
  SORTABLE_CHILDREN: {
    get() {
      return Ye.defaultSortableChildren;
    },
    set(r) {
      O("7.1.0", "settings.SORTABLE_CHILDREN is deprecated, use Container.defaultSortableChildren"), Ye.defaultSortableChildren = r;
    }
  }
});
const Ja = class Ds {
  /**
   * @param options - The optional application and renderer parameters.
   */
  constructor(t) {
    this.stage = new Ye(), t = Object.assign({
      forceCanvas: !1
    }, t), this.renderer = yf(t), Ds._plugins.forEach((e) => {
      e.init.call(this, t);
    });
  }
  /** Render the current stage. */
  render() {
    this.renderer.render(this.stage);
  }
  /**
   * Reference to the renderer's canvas element.
   * @member {PIXI.ICanvas}
   * @readonly
   */
  get view() {
    var t;
    return (t = this.renderer) == null ? void 0 : t.view;
  }
  /**
   * Reference to the renderer's screen rectangle. Its safe to use as `filterArea` or `hitArea` for the whole screen.
   * @member {PIXI.Rectangle}
   * @readonly
   */
  get screen() {
    var t;
    return (t = this.renderer) == null ? void 0 : t.screen;
  }
  /**
   * Destroy and don't use after this.
   * @param {boolean} [removeView=false] - Automatically remove canvas from DOM.
   * @param {object|boolean} [stageOptions] - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [stageOptions.children=false] - if set to true, all the children will have their destroy
   *  method called as well. 'stageOptions' will be passed on to those calls.
   * @param {boolean} [stageOptions.texture=false] - Only used for child Sprites if stageOptions.children is set
   *  to true. Should it destroy the texture of the child sprite
   * @param {boolean} [stageOptions.baseTexture=false] - Only used for child Sprites if stageOptions.children is set
   *  to true. Should it destroy the base texture of the child sprite
   */
  destroy(t, e) {
    const i = Ds._plugins.slice(0);
    i.reverse(), i.forEach((s) => {
      s.destroy.call(this);
    }), this.stage.destroy(e), this.stage = null, this.renderer.destroy(t), this.renderer = null;
  }
};
Ja._plugins = [];
let Qa = Ja;
B.handleByList(N.Application, Qa._plugins);
class th {
  /**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */
  static init(t) {
    Object.defineProperty(
      this,
      "resizeTo",
      /**
       * The HTML element or window to automatically resize the
       * renderer's view element to match width and height.
       * @member {Window|HTMLElement}
       * @name resizeTo
       * @memberof PIXI.Application#
       */
      {
        set(e) {
          globalThis.removeEventListener("resize", this.queueResize), this._resizeTo = e, e && (globalThis.addEventListener("resize", this.queueResize), this.resize());
        },
        get() {
          return this._resizeTo;
        }
      }
    ), this.queueResize = () => {
      this._resizeTo && (this.cancelResize(), this._resizeId = requestAnimationFrame(() => this.resize()));
    }, this.cancelResize = () => {
      this._resizeId && (cancelAnimationFrame(this._resizeId), this._resizeId = null);
    }, this.resize = () => {
      if (!this._resizeTo)
        return;
      this.cancelResize();
      let e, i;
      if (this._resizeTo === globalThis.window)
        e = globalThis.innerWidth, i = globalThis.innerHeight;
      else {
        const { clientWidth: s, clientHeight: n } = this._resizeTo;
        e = s, i = n;
      }
      this.renderer.resize(e, i), this.render();
    }, this._resizeId = null, this._resizeTo = null, this.resizeTo = t.resizeTo || null;
  }
  /**
   * Clean up the ticker, scoped to application
   * @static
   * @private
   */
  static destroy() {
    globalThis.removeEventListener("resize", this.queueResize), this.cancelResize(), this.cancelResize = null, this.queueResize = null, this.resizeTo = null, this.resize = null;
  }
}
th.extension = N.Application;
B.add(th);
var Rf = Object.defineProperty, oe = Math.pow, Sf = (r, t, e) => t in r ? Rf(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e, m = (r, t, e) => (Sf(r, typeof t != "symbol" ? t + "" : t, e), e), j = (r, t, e) => new Promise((i, s) => {
  var n = (h) => {
    try {
      a(e.next(h));
    } catch (l) {
      s(l);
    }
  }, o = (h) => {
    try {
      a(e.throw(h));
    } catch (l) {
      s(l);
    }
  }, a = (h) => h.done ? i(h.value) : Promise.resolve(h.value).then(n, o);
  a((e = e.apply(r, t)).next());
});
const _o = 2, xo = 2;
var $s;
((r) => {
  r.supportMoreMaskDivisions = !0, r.setOpacityFromMotion = !1;
})($s || ($s = {}));
const Cf = 0, bo = 1, Mf = 2, Ff = 999, br = {
  LOG_LEVEL_VERBOSE: Cf,
  LOG_LEVEL_WARNING: bo,
  LOG_LEVEL_ERROR: Mf,
  LOG_LEVEL_NONE: Ff,
  /**
   * Global log level.
   * @default config.LOG_LEVEL_WARNING
   */
  logLevel: bo,
  /**
   * Enabling sound for motions.
   */
  sound: !0,
  /**
   * Deferring motion and corresponding sound until both are loaded.
   */
  motionSync: !0,
  /**
   * Default fading duration for motions without such value specified.
   */
  motionFadingDuration: 500,
  /**
   * Default fading duration for idle motions without such value specified.
   */
  idleMotionFadingDuration: 2e3,
  /**
   * Default fading duration for expressions without such value specified.
   */
  expressionFadingDuration: 500,
  /**
   * If false, expression will be reset to default when playing non-idle motions.
   */
  preserveExpressionOnMotion: !0,
  cubism4: $s
}, $ = {
  log(r, ...t) {
  },
  warn(r, ...t) {
    console.warn(`[${r}]`, ...t);
  },
  error(r, ...t) {
    console.error(`[${r}]`, ...t);
  }
};
function yi(r, t, e) {
  return r < t ? t : r > e ? e : r;
}
function Nf(r, t) {
  return Math.random() * (t - r) + r;
}
function rr(r, t, e, i, s) {
  const n = t[i];
  n !== null && typeof n === r && (e[s] = n);
}
function ir(r, t, e, i, s) {
  const n = t[i];
  Array.isArray(n) && (e[s] = n.filter((o) => o !== null && typeof o === r));
}
function Pf(r) {
  let t = r.lastIndexOf("/");
  return t != -1 && (r = r.slice(0, t)), t = r.lastIndexOf("/"), t !== -1 && (r = r.slice(t + 1)), r;
}
function Of(r, t) {
  const e = r.indexOf(t);
  e !== -1 && r.splice(e, 1);
}
class eh extends Ie {
  constructor(t, e) {
    super(), m(this, "tag"), m(this, "settings"), m(this, "expressions", []), m(this, "defaultExpression"), m(this, "currentExpression"), m(this, "reserveExpressionIndex", -1), m(this, "destroyed", !1), this.settings = t, this.tag = `ExpressionManager(${t.name})`;
  }
  /**
   * Should be called in the constructor of derived class.
   */
  init() {
    this.defaultExpression = this.createExpression({}, void 0), this.currentExpression = this.defaultExpression, this.stopAllExpressions();
  }
  /**
   * Loads an Expression. Errors in this method will not be thrown,
   * but be emitted with an "expressionLoadError" event.
   * @param index - Index of the expression in definitions.
   * @return Promise that resolves with the Expression, or with undefined if it can't be loaded.
   * @emits {@link ExpressionManagerEvents.expressionLoaded}
   * @emits {@link ExpressionManagerEvents.expressionLoadError}
   */
  loadExpression(t) {
    return j(this, null, function* () {
      if (!this.definitions[t]) {
        $.warn(this.tag, `Undefined expression at [${t}]`);
        return;
      }
      if (this.expressions[t] === null) {
        $.warn(
          this.tag,
          `Cannot set expression at [${t}] because it's already failed in loading.`
        );
        return;
      }
      if (this.expressions[t])
        return this.expressions[t];
      const e = yield this._loadExpression(t);
      return this.expressions[t] = e, e;
    });
  }
  /**
   * Loads the Expression. Will be implemented by Live2DFactory in order to avoid circular dependency.
   * @ignore
   */
  _loadExpression(t) {
    throw new Error("Not implemented.");
  }
  /**
   * Sets a random Expression that differs from current one.
   * @return Promise that resolves with true if succeeded, with false otherwise.
   */
  setRandomExpression() {
    return j(this, null, function* () {
      if (this.definitions.length) {
        const t = [];
        for (let e = 0; e < this.definitions.length; e++)
          this.expressions[e] !== null && this.expressions[e] !== this.currentExpression && e !== this.reserveExpressionIndex && t.push(e);
        if (t.length) {
          const e = Math.floor(Math.random() * t.length);
          return this.setExpression(e);
        }
      }
      return !1;
    });
  }
  /**
   * Resets model's expression using {@link ExpressionManager#defaultExpression}.
   */
  resetExpression() {
    this._setExpression(this.defaultExpression);
  }
  /**
   * Restores model's expression to {@link currentExpression}.
   */
  restoreExpression() {
    this._setExpression(this.currentExpression);
  }
  /**
   * Sets an Expression.
   * @param index - Either the index, or the name of the expression.
   * @return Promise that resolves with true if succeeded, with false otherwise.
   */
  setExpression(t) {
    return j(this, null, function* () {
      if (typeof t != "number" && (t = this.getExpressionIndex(t)), !(t > -1 && t < this.definitions.length) || t === this.expressions.indexOf(this.currentExpression))
        return !1;
      this.reserveExpressionIndex = t;
      const e = yield this.loadExpression(t);
      return !e || this.reserveExpressionIndex !== t ? !1 : (this.reserveExpressionIndex = -1, this.currentExpression = e, this._setExpression(e), !0);
    });
  }
  /**
   * Updates parameters of the core model.
   * @return True if the parameters are actually updated.
   */
  update(t, e) {
    return this.isFinished() ? !1 : this.updateParameters(t, e);
  }
  /**
   * Destroys the instance.
   * @emits {@link ExpressionManagerEvents.destroy}
   */
  destroy() {
    this.destroyed = !0, this.emit("destroy");
    const t = this;
    t.definitions = void 0, t.expressions = void 0;
  }
}
const To = 0.01, Lf = 40 / 7.5, Uf = 1 / (0.15 * 1e3);
class Bf {
  constructor() {
    m(this, "targetX", 0), m(this, "targetY", 0), m(this, "x", 0), m(this, "y", 0), m(this, "vx", 0), m(this, "vy", 0);
  }
  /**
   * Sets the focus position.
   * @param x - X position in range `[-1, 1]`.
   * @param y - Y position in range `[-1, 1]`.
   * @param instant - Should the focus position be instantly applied.
   */
  focus(t, e, i = !1) {
    this.targetX = yi(t, -1, 1), this.targetY = yi(e, -1, 1), i && (this.x = this.targetX, this.y = this.targetY);
  }
  /**
   * Updates the interpolation.
   * @param dt - Delta time in milliseconds.
   */
  update(t) {
    const e = this.targetX - this.x, i = this.targetY - this.y;
    if (Math.abs(e) < To && Math.abs(i) < To)
      return;
    const s = Math.sqrt(oe(e, 2) + oe(i, 2)), n = Lf / (1e3 / t);
    let o = n * (e / s) - this.vx, a = n * (i / s) - this.vy;
    const h = Math.sqrt(oe(o, 2) + oe(a, 2)), l = n * Uf * t;
    h > l && (o *= l / h, a *= l / h), this.vx += o, this.vy += a;
    const u = Math.sqrt(oe(this.vx, 2) + oe(this.vy, 2)), c = 0.5 * (Math.sqrt(oe(l, 2) + 8 * l * s) - l);
    u > c && (this.vx *= c / u, this.vy *= c / u), this.x += this.vx, this.y += this.vy;
  }
}
class rn {
  /**
   * @param json - The settings JSON object.
   * @param json.url - The `url` field must be defined to specify the settings file's URL.
   */
  constructor(t) {
    m(this, "json"), m(this, "name"), m(this, "url"), m(this, "pose"), m(this, "physics"), this.json = t;
    const e = t.url;
    if (typeof e != "string")
      throw new TypeError("The `url` field in settings JSON must be defined as a string.");
    this.url = e, this.name = Pf(this.url);
  }
  /**
   * Resolves a relative path using the {@link url}. This is used to resolve the resource files
   * defined in the settings.
   * @param path - Relative path.
   * @return Resolved path.
   */
  resolveURL(t) {
    return Qs.resolve(this.url, t);
  }
  /**
   * Replaces the resource files by running each file through the `replacer`.
   * @param replacer - Invoked with two arguments: `(file, path)`, where `file` is the file definition,
   * and `path` is its property path in the ModelSettings instance. A string must be returned to be the replacement.
   *
   * ```js
   * modelSettings.replaceFiles((file, path) => {
   *     // file = "foo.moc", path = "moc"
   *     // file = "foo.png", path = "textures[0]"
   *     // file = "foo.mtn", path = "motions.idle[0].file"
   *     // file = "foo.motion3.json", path = "motions.idle[0].File"
   *
   *     return "bar/" + file;
   * });
   * ```
   */
  replaceFiles(t) {
    this.moc = t(this.moc, "moc"), this.pose !== void 0 && (this.pose = t(this.pose, "pose")), this.physics !== void 0 && (this.physics = t(this.physics, "physics"));
    for (let e = 0; e < this.textures.length; e++)
      this.textures[e] = t(this.textures[e], `textures[${e}]`);
  }
  /**
   * Retrieves all resource files defined in the settings.
   * @return A flat array of the paths of all resource files.
   *
   * ```js
   * modelSettings.getDefinedFiles();
   * // returns: ["foo.moc", "foo.png", ...]
   * ```
   */
  getDefinedFiles() {
    const t = [];
    return this.replaceFiles((e) => (t.push(e), e)), t;
  }
  /**
   * Validates that the files defined in the settings exist in given files. Each file will be
   * resolved by {@link resolveURL} before comparison.
   * @param files - A flat array of file paths.
   * @return All the files which are defined in the settings and also exist in given files,
   * *including the optional files*.
   * @throws Error if any *essential* file is defined in settings but not included in given files.
   */
  validateFiles(t) {
    const e = (n, o) => {
      const a = this.resolveURL(n);
      if (!t.includes(a)) {
        if (o)
          throw new Error(
            `File "${n}" is defined in settings, but doesn't exist in given files`
          );
        return !1;
      }
      return !0;
    };
    return [this.moc, ...this.textures].forEach((n) => e(n, !0)), this.getDefinedFiles().filter((n) => e(n, !1));
  }
}
var Hs = /* @__PURE__ */ ((r) => (r[r.NONE = 0] = "NONE", r[r.IDLE = 1] = "IDLE", r[r.NORMAL = 2] = "NORMAL", r[r.FORCE = 3] = "FORCE", r))(Hs || {});
class kf {
  constructor() {
    m(this, "tag"), m(this, "debug", !1), m(this, "currentPriority", 0), m(this, "reservePriority", 0), m(this, "currentGroup"), m(this, "currentIndex"), m(this, "reservedGroup"), m(this, "reservedIndex"), m(this, "reservedIdleGroup"), m(this, "reservedIdleIndex");
  }
  /**
   * Reserves the playback for a motion.
   * @param group - The motion group.
   * @param index - Index in the motion group.
   * @param priority - The priority to be applied.
   * @return True if the reserving has succeeded.
   */
  reserve(t, e, i) {
    if (i <= 0)
      return $.log(this.tag, "Cannot start a motion with MotionPriority.NONE."), !1;
    if (t === this.currentGroup && e === this.currentIndex)
      return $.log(this.tag, "Motion is already playing.", this.dump(t, e)), !1;
    if (t === this.reservedGroup && e === this.reservedIndex || t === this.reservedIdleGroup && e === this.reservedIdleIndex)
      return $.log(this.tag, "Motion is already reserved.", this.dump(t, e)), !1;
    if (i === 1) {
      if (this.currentPriority !== 0)
        return $.log(
          this.tag,
          "Cannot start idle motion because another motion is playing.",
          this.dump(t, e)
        ), !1;
      if (this.reservedIdleGroup !== void 0)
        return $.log(
          this.tag,
          "Cannot start idle motion because another idle motion has reserved.",
          this.dump(t, e)
        ), !1;
      this.setReservedIdle(t, e);
    } else {
      if (i < 3) {
        if (i <= this.currentPriority)
          return $.log(
            this.tag,
            "Cannot start motion because another motion is playing as an equivalent or higher priority.",
            this.dump(t, e)
          ), !1;
        if (i <= this.reservePriority)
          return $.log(
            this.tag,
            "Cannot start motion because another motion has reserved as an equivalent or higher priority.",
            this.dump(t, e)
          ), !1;
      }
      this.setReserved(t, e, i);
    }
    return !0;
  }
  /**
   * Requests the playback for a motion.
   * @param motion - The Motion, can be undefined.
   * @param group - The motion group.
   * @param index - Index in the motion group.
   * @param priority - The priority to be applied.
   * @return True if the request has been approved, i.e. the motion is allowed to play.
   */
  start(t, e, i, s) {
    if (s === 1) {
      if (this.setReservedIdle(void 0, void 0), this.currentPriority !== 0)
        return $.log(
          this.tag,
          "Cannot start idle motion because another motion is playing.",
          this.dump(e, i)
        ), !1;
    } else {
      if (e !== this.reservedGroup || i !== this.reservedIndex)
        return $.log(
          this.tag,
          "Cannot start motion because another motion has taken the place.",
          this.dump(e, i)
        ), !1;
      this.setReserved(
        void 0,
        void 0,
        0
        /* NONE */
      );
    }
    return t ? (this.setCurrent(e, i, s), !0) : !1;
  }
  /**
   * Notifies the motion playback has finished.
   */
  complete() {
    this.setCurrent(
      void 0,
      void 0,
      0
      /* NONE */
    );
  }
  /**
   * Sets the current motion.
   */
  setCurrent(t, e, i) {
    this.currentPriority = i, this.currentGroup = t, this.currentIndex = e;
  }
  /**
   * Sets the reserved motion.
   */
  setReserved(t, e, i) {
    this.reservePriority = i, this.reservedGroup = t, this.reservedIndex = e;
  }
  /**
   * Sets the reserved idle motion.
   */
  setReservedIdle(t, e) {
    this.reservedIdleGroup = t, this.reservedIdleIndex = e;
  }
  /**
   * Checks if a Motion is currently playing or has reserved.
   * @return True if active.
   */
  isActive(t, e) {
    return t === this.currentGroup && e === this.currentIndex || t === this.reservedGroup && e === this.reservedIndex || t === this.reservedIdleGroup && e === this.reservedIdleIndex;
  }
  /**
   * Resets the state.
   */
  reset() {
    this.setCurrent(
      void 0,
      void 0,
      0
      /* NONE */
    ), this.setReserved(
      void 0,
      void 0,
      0
      /* NONE */
    ), this.setReservedIdle(void 0, void 0);
  }
  /**
   * Checks if an idle motion should be requests to play.
   */
  shouldRequestIdleMotion() {
    return this.currentGroup === void 0 && this.reservedIdleGroup === void 0;
  }
  /**
   * Checks if the model's expression should be overridden by the motion.
   */
  shouldOverrideExpression() {
    return !br.preserveExpressionOnMotion;
  }
  /**
   * Dumps the state for debugging.
   */
  dump(t, e) {
    if (this.debug) {
      const i = [
        "currentPriority",
        "reservePriority",
        "currentGroup",
        "currentIndex",
        "reservedGroup",
        "reservedIndex",
        "reservedIdleGroup",
        "reservedIdleIndex"
      ];
      return `
<Requested> group = "${t}", index = ${e}
` + i.map((s) => "[" + s + "] " + this[s]).join(`
`);
    }
    return "";
  }
}
const Gf = "SoundManager", Df = 0.5;
class ye {
  /**
   * Global volume that applies to all the sounds.
   */
  static get volume() {
    return this._volume;
  }
  static set volume(t) {
    this._volume = (t > 1 ? 1 : t < 0 ? 0 : t) || 0, this.audios.forEach((e) => e.volume = this._volume);
  }
  // TODO: return an ID?
  /**
   * Creates an audio element and adds it to the {@link audios}.
   * @param file - URL of the sound file.
   * @param onFinish - Callback invoked when the playback has finished.
   * @param onError - Callback invoked when error occurs.
   * @return Created audio element.
   */
  static add(t, e, i) {
    const s = new Audio(t);
    return s.volume = this._volume, s.preload = "auto", s.addEventListener("ended", () => {
      this.dispose(s), e == null || e();
    }), s.addEventListener("error", (n) => {
      this.dispose(s), $.warn(Gf, `Error occurred on "${t}"`, n.error), i == null || i(n.error);
    }), this.audios.push(s), s;
  }
  /**
   * Plays the sound.
   * @param audio - An audio element.
   * @return Promise that resolves when the audio is ready to play, rejects when error occurs.
   */
  static play(t) {
    return new Promise((e, i) => {
      var s;
      (s = t.play()) == null || s.catch((n) => {
        t.dispatchEvent(new ErrorEvent("error", { error: n })), i(n);
      }), t.readyState === t.HAVE_ENOUGH_DATA ? e() : t.addEventListener("canplaythrough", e);
    });
  }
  /**
   * Disposes an audio element and removes it from {@link audios}.
   * @param audio - An audio element.
   */
  static dispose(t) {
    t.pause(), t.removeAttribute("src"), Of(this.audios, t);
  }
  /**
   * Destroys all managed audios.
   */
  static destroy() {
    for (let t = this.audios.length - 1; t >= 0; t--)
      this.dispose(this.audios[t]);
  }
}
m(ye, "audios", []);
m(ye, "_volume", Df);
class sn extends Ie {
  constructor(t, e) {
    super(), m(this, "tag"), m(this, "settings"), m(this, "motionGroups", {}), m(this, "state", new kf()), m(this, "currentAudio"), m(this, "playing", !1), m(this, "destroyed", !1), this.settings = t, this.tag = `MotionManager(${t.name})`, this.state.tag = this.tag;
  }
  /**
   * Should be called in the constructor of derived class.
   */
  init(t) {
    t != null && t.idleMotionGroup && (this.groups.idle = t.idleMotionGroup), this.setupMotions(t), this.stopAllMotions();
  }
  /**
   * Sets up motions from the definitions, and preloads them according to the preload strategy.
   */
  setupMotions(t) {
    for (const i of Object.keys(this.definitions))
      this.motionGroups[i] = [];
    let e;
    switch (t == null ? void 0 : t.motionPreload) {
      case "NONE":
        return;
      case "ALL":
        e = Object.keys(this.definitions);
        break;
      case "IDLE":
      default:
        e = [this.groups.idle];
        break;
    }
    for (const i of e)
      if (this.definitions[i])
        for (let s = 0; s < this.definitions[i].length; s++)
          this.loadMotion(i, s).then();
  }
  /**
   * Loads a Motion in a motion group. Errors in this method will not be thrown,
   * but be emitted with a "motionLoadError" event.
   * @param group - The motion group.
   * @param index - Index in the motion group.
   * @return Promise that resolves with the Motion, or with undefined if it can't be loaded.
   * @emits {@link MotionManagerEvents.motionLoaded}
   * @emits {@link MotionManagerEvents.motionLoadError}
   */
  loadMotion(t, e) {
    return j(this, null, function* () {
      var i;
      if (!((i = this.definitions[t]) != null && i[e])) {
        $.warn(this.tag, `Undefined motion at "${t}"[${e}]`);
        return;
      }
      if (this.motionGroups[t][e] === null) {
        $.warn(
          this.tag,
          `Cannot start motion at "${t}"[${e}] because it's already failed in loading.`
        );
        return;
      }
      if (this.motionGroups[t][e])
        return this.motionGroups[t][e];
      const s = yield this._loadMotion(t, e);
      if (!this.destroyed)
        return this.motionGroups[t][e] = s ?? null, s;
    });
  }
  /**
   * Loads the Motion. Will be implemented by Live2DFactory in order to avoid circular dependency.
   * @ignore
   */
  _loadMotion(t, e) {
    throw new Error("Not implemented.");
  }
  /**
   * Starts a motion as given priority.
   * @param group - The motion group.
   * @param index - Index in the motion group.
   * @param priority - The priority to be applied.
   * @return Promise that resolves with true if the motion is successfully started, with false otherwise.
   */
  startMotion(t, e) {
    return j(this, arguments, function* (i, s, n = Hs.NORMAL) {
      var o;
      if (!this.state.reserve(i, s, n))
        return !1;
      const a = (o = this.definitions[i]) == null ? void 0 : o[s];
      if (!a)
        return !1;
      this.currentAudio && ye.dispose(this.currentAudio);
      let h;
      {
        const u = this.getSoundFile(a);
        if (u)
          try {
            h = ye.add(
              this.settings.resolveURL(u),
              () => this.currentAudio = void 0,
              () => this.currentAudio = void 0
            ), this.currentAudio = h;
          } catch (c) {
            $.warn(this.tag, "Failed to create audio", u, c);
          }
      }
      const l = yield this.loadMotion(i, s);
      return h && (yield ye.play(h).catch(
        (c) => $.warn(this.tag, "Failed to play audio", h.src, c)
      )), this.state.start(l, i, s, n) ? ($.log(this.tag, "Start motion:", this.getMotionName(a)), this.emit("motionStart", i, s, h), this.state.shouldOverrideExpression() && this.expressionManager && this.expressionManager.resetExpression(), this.playing = !0, this._startMotion(l), !0) : (h && (ye.dispose(h), this.currentAudio = void 0), !1);
    });
  }
  /**
   * Starts a random Motion as given priority.
   * @param group - The motion group.
   * @param priority - The priority to be applied.
   * @return Promise that resolves with true if the motion is successfully started, with false otherwise.
   */
  startRandomMotion(t, e) {
    return j(this, null, function* () {
      const i = this.definitions[t];
      if (i != null && i.length) {
        const s = [];
        for (let n = 0; n < i.length; n++)
          this.motionGroups[t][n] !== null && !this.state.isActive(t, n) && s.push(n);
        if (s.length) {
          const n = Math.floor(Math.random() * s.length);
          return this.startMotion(t, s[n], e);
        }
      }
      return !1;
    });
  }
  /**
   * Stops all playing motions as well as the sound.
   */
  stopAllMotions() {
    this._stopAllMotions(), this.state.reset(), this.currentAudio && (ye.dispose(this.currentAudio), this.currentAudio = void 0);
  }
  /**
   * Updates parameters of the core model.
   * @param model - The core model.
   * @param now - Current time in milliseconds.
   * @return True if the parameters have been actually updated.
   */
  update(t, e) {
    var i;
    return this.isFinished() && (this.playing && (this.playing = !1, this.emit("motionFinish")), this.state.shouldOverrideExpression() && ((i = this.expressionManager) == null || i.restoreExpression()), this.state.complete(), this.state.shouldRequestIdleMotion() && this.startRandomMotion(this.groups.idle, Hs.IDLE)), this.updateParameters(t, e);
  }
  /**
   * Destroys the instance.
   * @emits {@link MotionManagerEvents.destroy}
   */
  destroy() {
    var t;
    this.destroyed = !0, this.emit("destroy"), this.stopAllMotions(), (t = this.expressionManager) == null || t.destroy();
    const e = this;
    e.definitions = void 0, e.motionGroups = void 0;
  }
}
const $f = { x: 0, y: 0, width: 0, height: 0 };
class Hf extends Ie {
  constructor() {
    super(...arguments), m(this, "focusController", new Bf()), m(this, "pose"), m(this, "physics"), m(this, "originalWidth", 0), m(this, "originalHeight", 0), m(this, "width", 0), m(this, "height", 0), m(this, "localTransform", new q()), m(this, "drawingMatrix", new q()), m(this, "hitAreas", {}), m(this, "textureFlipY", !1), m(this, "viewport", [0, 0, 0, 0]), m(this, "destroyed", !1);
  }
  /**
   * Should be called in the constructor of derived class.
   */
  init() {
    this.setupLayout(), this.setupHitAreas();
  }
  /**
   * Sets up the model's size and local transform by the model's layout.
   */
  setupLayout() {
    const t = this, e = this.getSize();
    t.originalWidth = e[0], t.originalHeight = e[1];
    const i = Object.assign(
      {
        width: _o,
        height: xo
      },
      this.getLayout()
    );
    this.localTransform.scale(i.width / _o, i.height / xo), t.width = this.originalWidth * this.localTransform.a, t.height = this.originalHeight * this.localTransform.d;
    const s = i.x !== void 0 && i.x - i.width / 2 || i.centerX !== void 0 && i.centerX || i.left !== void 0 && i.left - i.width / 2 || i.right !== void 0 && i.right + i.width / 2 || 0, n = i.y !== void 0 && i.y - i.height / 2 || i.centerY !== void 0 && i.centerY || i.top !== void 0 && i.top - i.height / 2 || i.bottom !== void 0 && i.bottom + i.height / 2 || 0;
    this.localTransform.translate(this.width * s, -this.height * n);
  }
  /**
   * Sets up the hit areas by their definitions in settings.
   */
  setupHitAreas() {
    const t = this.getHitAreaDefs().filter((e) => e.index >= 0);
    for (const e of t)
      this.hitAreas[e.name] = e;
  }
  /**
   * Hit-test on the model.
   * @param x - Position in model canvas.
   * @param y - Position in model canvas.
   * @return The names of the *hit* hit areas. Can be empty if none is hit.
   */
  hitTest(t, e) {
    return Object.keys(this.hitAreas).filter((i) => this.isHit(i, t, e));
  }
  /**
   * Hit-test for a single hit area.
   * @param hitAreaName - The hit area's name.
   * @param x - Position in model canvas.
   * @param y - Position in model canvas.
   * @return True if hit.
   */
  isHit(t, e, i) {
    if (!this.hitAreas[t])
      return !1;
    const s = this.hitAreas[t].index, n = this.getDrawableBounds(s, $f);
    return n.x <= e && e <= n.x + n.width && n.y <= i && i <= n.y + n.height;
  }
  /**
   * Gets a drawable's bounds.
   * @param index - Index of the drawable.
   * @param bounds - Object to store the output values.
   * @return The bounds in model canvas space.
   */
  getDrawableBounds(t, e) {
    const i = this.getDrawableVertices(t);
    let s = i[0], n = i[0], o = i[1], a = i[1];
    for (let h = 0; h < i.length; h += 2) {
      const l = i[h], u = i[h + 1];
      s = Math.min(l, s), n = Math.max(l, n), o = Math.min(u, o), a = Math.max(u, a);
    }
    return e ?? (e = {}), e.x = s, e.y = o, e.width = n - s, e.height = a - o, e;
  }
  /**
   * Updates the model's transform.
   * @param transform - The world transform.
   */
  updateTransform(t) {
    this.drawingMatrix.copyFrom(t).append(this.localTransform);
  }
  /**
   * Updates the model's parameters.
   * @param dt - Elapsed time in milliseconds from last frame.
   * @param now - Current time in milliseconds.
   */
  update(t, e) {
    this.focusController.update(t);
  }
  /**
   * Destroys the model and all related resources.
   * @emits {@link InternalModelEvents.destroy | destroy}
   */
  destroy() {
    this.destroyed = !0, this.emit("destroy"), this.motionManager.destroy(), this.motionManager = void 0;
  }
}
const Xf = "XHRLoader";
class Eo extends Error {
  constructor(t, e, i, s = !1) {
    super(t), this.url = e, this.status = i, this.aborted = s;
  }
}
const Tr = class gt {
  /**
   * Creates a managed XHR.
   * @param target - If provided, the XHR will be canceled when receiving an "destroy" event from the target.
   * @param url - The URL.
   * @param type - The XHR response type.
   * @param onload - Load listener.
   * @param onerror - Error handler.
   */
  static createXHR(t, e, i, s, n) {
    const o = new XMLHttpRequest();
    if (gt.allXhrSet.add(o), t) {
      let a = gt.xhrMap.get(t);
      a ? a.add(o) : (a = /* @__PURE__ */ new Set([o]), gt.xhrMap.set(t, a)), t.listeners("destroy").includes(gt.cancelXHRs) || t.once("destroy", gt.cancelXHRs);
    }
    return o.open("GET", e), o.responseType = i, o.onload = () => {
      (o.status === 200 || o.status === 0) && o.response ? s(o.response) : o.onerror();
    }, o.onerror = () => {
      $.warn(
        Xf,
        `Failed to load resource as ${o.responseType} (Status ${o.status}): ${e}`
      ), n(new Eo("Network error.", e, o.status));
    }, o.onabort = () => n(new Eo("Aborted.", e, o.status, !0)), o.onloadend = () => {
      var a;
      gt.allXhrSet.delete(o), t && ((a = gt.xhrMap.get(t)) == null || a.delete(o));
    }, o;
  }
  /**
   * Cancels all XHRs related to this target.
   */
  static cancelXHRs() {
    var t;
    (t = gt.xhrMap.get(this)) == null || t.forEach((e) => {
      e.abort(), gt.allXhrSet.delete(e);
    }), gt.xhrMap.delete(this);
  }
  /**
   * Release all XHRs.
   */
  static release() {
    gt.allXhrSet.forEach((t) => t.abort()), gt.allXhrSet.clear(), gt.xhrMap = /* @__PURE__ */ new WeakMap();
  }
};
m(Tr, "xhrMap", /* @__PURE__ */ new WeakMap());
m(Tr, "allXhrSet", /* @__PURE__ */ new Set());
m(Tr, "loader", (r, t) => new Promise((e, i) => {
  Tr.createXHR(
    r.target,
    r.settings ? r.settings.resolveURL(r.url) : r.url,
    r.type,
    (n) => {
      r.result = n, e();
    },
    i
  ).send();
}));
let Vf = Tr;
function rh(r, t) {
  let e = -1;
  return i(0);
  function i(s, n) {
    if (n)
      return Promise.reject(n);
    if (s <= e)
      return Promise.reject(new Error("next() called multiple times"));
    e = s;
    const o = r[s];
    if (!o)
      return Promise.resolve();
    try {
      return Promise.resolve(o(t, i.bind(null, s + 1)));
    } catch (a) {
      return Promise.reject(a);
    }
  }
}
class re {
  /**
   * Loads a resource.
   * @return Promise that resolves with the loaded data in a format that's consistent with the specified `type`.
   */
  static load(t) {
    return rh(this.middlewares, t).then(() => t.result);
  }
}
m(re, "middlewares", [Vf.loader]);
function jf(r, t = {}) {
  var e;
  const i = { resourceOptions: { crossorigin: t.crossOrigin } };
  if (G.fromURL)
    return G.fromURL(r, i).catch((o) => {
      if (o instanceof Error)
        throw o;
      const a = new Error("Texture loading error");
      throw a.event = o, a;
    });
  i.resourceOptions.autoLoad = !1;
  const s = G.from(r, i);
  if (s.baseTexture.valid)
    return Promise.resolve(s);
  const n = s.baseTexture.resource;
  return (e = n._live2d_load) != null || (n._live2d_load = new Promise((o, a) => {
    const h = (l) => {
      n.source.removeEventListener("error", h);
      const u = new Error("Texture loading error");
      u.event = l, a(u);
    };
    n.source.addEventListener("error", h), n.load().then(() => o(s)).catch(h);
  })), n._live2d_load;
}
function zf() {
}
const wo = "Live2DFactory", ih = (r, t) => j(void 0, null, function* () {
  if (typeof r.source == "string") {
    const e = yield re.load({
      url: r.source,
      type: "json",
      target: r.live2dModel
    });
    e.url = r.source, r.source = e, r.live2dModel.emit("settingsJSONLoaded", e);
  }
  return t();
}), sh = (r, t) => j(void 0, null, function* () {
  if (r.source instanceof rn)
    return r.settings = r.source, t();
  if (typeof r.source == "object") {
    const e = It.findRuntime(r.source);
    if (e) {
      const i = e.createModelSettings(r.source);
      return r.settings = i, r.live2dModel.emit("settingsLoaded", i), t();
    }
  }
  throw new TypeError("Unknown settings format.");
}), nh = (r, t) => {
  if (r.settings) {
    const e = It.findRuntime(r.settings);
    if (e)
      return e.ready().then(t);
  }
  return t();
}, oh = (r, t) => j(void 0, null, function* () {
  yield t();
  const e = r.internalModel;
  if (e) {
    const i = r.settings, s = It.findRuntime(i);
    if (s) {
      const n = [];
      i.pose && n.push(
        re.load({
          settings: i,
          url: i.pose,
          type: "json",
          target: e
        }).then((o) => {
          e.pose = s.createPose(e.coreModel, o), r.live2dModel.emit("poseLoaded", e.pose);
        }).catch((o) => {
          r.live2dModel.emit("poseLoadError", o), $.warn(wo, "Failed to load pose.", o);
        })
      ), i.physics && n.push(
        re.load({
          settings: i,
          url: i.physics,
          type: "json",
          target: e
        }).then((o) => {
          e.physics = s.createPhysics(
            e.coreModel,
            o
          ), r.live2dModel.emit("physicsLoaded", e.physics);
        }).catch((o) => {
          r.live2dModel.emit("physicsLoadError", o), $.warn(wo, "Failed to load physics.", o);
        })
      ), n.length && (yield Promise.all(n));
    }
  }
}), ah = (r, t) => j(void 0, null, function* () {
  if (r.settings) {
    const e = r.live2dModel, i = Promise.all(
      r.settings.textures.map((s) => {
        const n = r.settings.resolveURL(s);
        return jf(n, { crossOrigin: r.options.crossOrigin });
      })
    );
    if (i.catch(zf), yield t(), r.internalModel)
      e.internalModel = r.internalModel, e.emit("modelLoaded", r.internalModel);
    else
      throw new TypeError("Missing internal model.");
    e.textures = yield i, e.emit("textureLoaded", e.textures);
  } else
    throw new TypeError("Missing settings.");
}), hh = (r, t) => j(void 0, null, function* () {
  const e = r.settings;
  if (e instanceof rn) {
    const i = It.findRuntime(e);
    if (!i)
      throw new TypeError("Unknown model settings.");
    const s = yield re.load({
      settings: e,
      url: e.moc,
      type: "arraybuffer",
      target: r.live2dModel
    });
    if (!i.isValidMoc(s))
      throw new Error("Invalid moc data");
    const n = i.createCoreModel(s);
    return r.internalModel = i.createInternalModel(n, e, r.options), t();
  }
  throw new TypeError("Missing settings.");
}), pt = class Oe {
  static unzip(t, e) {
    return j(this, null, function* () {
      const i = yield Oe.getFilePaths(t), s = [];
      for (const o of e.getDefinedFiles()) {
        const a = decodeURI(Qs.resolve(e.url, o));
        i.includes(a) && s.push(a);
      }
      const n = yield Oe.getFiles(t, s);
      for (let o = 0; o < n.length; o++) {
        const a = s[o], h = n[o];
        Object.defineProperty(h, "webkitRelativePath", {
          value: a
        });
      }
      return n;
    });
  }
  static createSettings(t) {
    return j(this, null, function* () {
      const i = (yield Oe.getFilePaths(t)).find(
        (a) => a.endsWith("model.json") || a.endsWith("model3.json")
      );
      if (!i)
        throw new Error("Settings file not found");
      const s = yield Oe.readText(t, i);
      if (!s)
        throw new Error("Empty settings file: " + i);
      const n = JSON.parse(s);
      n.url = i;
      const o = Oe.live2dFactory.findRuntime(n);
      if (!o)
        throw new Error("Unknown settings JSON");
      return o.createModelSettings(n);
    });
  }
  static zipReader(t, e) {
    return j(this, null, function* () {
      throw new Error("Not implemented");
    });
  }
  static getFilePaths(t) {
    return j(this, null, function* () {
      throw new Error("Not implemented");
    });
  }
  static getFiles(t, e) {
    return j(this, null, function* () {
      throw new Error("Not implemented");
    });
  }
  static readText(t, e) {
    return j(this, null, function* () {
      throw new Error("Not implemented");
    });
  }
  static releaseReader(t) {
  }
};
m(pt, "live2dFactory");
m(pt, "ZIP_PROTOCOL", "zip://");
m(pt, "uid", 0);
m(pt, "factory", (r, t) => j(pt, null, function* () {
  const e = r.source;
  let i, s, n;
  if (typeof e == "string" && (e.endsWith(".zip") || e.startsWith(pt.ZIP_PROTOCOL)) ? (e.startsWith(pt.ZIP_PROTOCOL) ? i = e.slice(pt.ZIP_PROTOCOL.length) : i = e, s = yield re.load({
    url: i,
    type: "blob",
    target: r.live2dModel
  })) : Array.isArray(e) && e.length === 1 && e[0] instanceof File && e[0].name.endsWith(".zip") && (s = e[0], i = URL.createObjectURL(s), n = e.settings), s) {
    if (!s.size)
      throw new Error("Empty zip file");
    const o = yield pt.zipReader(s, i);
    n || (n = yield pt.createSettings(o)), n._objectURL = pt.ZIP_PROTOCOL + pt.uid + "/" + n.url;
    const a = yield pt.unzip(o, n);
    a.settings = n, r.source = a, i.startsWith("blob:") && r.live2dModel.once("modelLoaded", (h) => {
      h.once("destroy", function() {
        URL.revokeObjectURL(i);
      });
    }), pt.releaseReader(o);
  }
  return t();
}));
let lh = pt;
const Mt = class Zr {
  /**
   * Resolves the path of a resource file to the object URL.
   * @param settingsURL - Object URL of the settings file.
   * @param filePath - Resource file path.
   * @return Resolved object URL.
   */
  static resolveURL(t, e) {
    var i;
    const s = (i = Zr.filesMap[t]) == null ? void 0 : i[e];
    if (s === void 0)
      throw new Error("Cannot find this file from uploaded files: " + e);
    return s;
  }
  /**
   * Consumes the files by storing their object URLs. Files not defined in the settings will be ignored.
   */
  static upload(t, e) {
    return j(this, null, function* () {
      const i = {};
      for (const s of e.getDefinedFiles()) {
        const n = decodeURI(Qs.resolve(e.url, s)), o = t.find((a) => a.webkitRelativePath === n);
        o && (i[s] = URL.createObjectURL(o));
      }
      Zr.filesMap[e._objectURL] = i;
    });
  }
  /**
   * Creates a ModelSettings by given files.
   * @return Promise that resolves with the created ModelSettings.
   */
  static createSettings(t) {
    return j(this, null, function* () {
      const e = t.find(
        (a) => a.name.endsWith("model.json") || a.name.endsWith("model3.json")
      );
      if (!e)
        throw new TypeError("Settings file not found");
      const i = yield Zr.readText(e), s = JSON.parse(i);
      s.url = e.webkitRelativePath;
      const n = It.findRuntime(s);
      if (!n)
        throw new Error("Unknown settings JSON");
      const o = n.createModelSettings(s);
      return o._objectURL = URL.createObjectURL(e), o;
    });
  }
  /**
   * Reads a file as text in UTF-8.
   */
  static readText(t) {
    return j(this, null, function* () {
      return new Promise((e, i) => {
        const s = new FileReader();
        s.onload = () => e(s.result), s.onerror = i, s.readAsText(t, "utf8");
      });
    });
  }
};
m(Mt, "live2dFactory");
m(Mt, "filesMap", {});
m(Mt, "factory", (r, t) => j(Mt, null, function* () {
  if (Array.isArray(r.source) && r.source[0] instanceof File) {
    const e = r.source;
    let i = e.settings;
    if (!i)
      i = yield Mt.createSettings(e);
    else if (!i._objectURL)
      throw new Error('"_objectURL" must be specified in ModelSettings');
    i.validateFiles(e.map((s) => encodeURI(s.webkitRelativePath))), yield Mt.upload(e, i), i.resolveURL = function(s) {
      return Mt.resolveURL(this._objectURL, s);
    }, r.source = i, r.live2dModel.once("modelLoaded", (s) => {
      s.once("destroy", function() {
        const n = this.settings._objectURL;
        if (URL.revokeObjectURL(n), Mt.filesMap[n])
          for (const o of Object.values(
            Mt.filesMap[n]
          ))
            URL.revokeObjectURL(o);
        delete Mt.filesMap[n];
      });
    });
  }
  return t();
}));
let uh = Mt;
const Pt = class ot {
  /**
   * Registers a Live2DRuntime.
   */
  static registerRuntime(t) {
    ot.runtimes.push(t), ot.runtimes.sort((e, i) => i.version - e.version);
  }
  /**
   * Finds a runtime that matches given source.
   * @param source - Either a settings JSON object or a ModelSettings instance.
   * @return The Live2DRuntime, or undefined if not found.
   */
  static findRuntime(t) {
    for (const e of ot.runtimes)
      if (e.test(t))
        return e;
  }
  /**
   * Sets up a Live2DModel, populating it with all defined resources.
   * @param live2dModel - The Live2DModel instance.
   * @param source - Can be one of: settings file URL, settings JSON object, ModelSettings instance.
   * @param options - Options for the process.
   * @return Promise that resolves when all resources have been loaded, rejects when error occurs.
   */
  static setupLive2DModel(t, e, i) {
    return j(this, null, function* () {
      const s = new Promise((a) => t.once("textureLoaded", a)), n = new Promise((a) => t.once("modelLoaded", a)), o = Promise.all([s, n]).then(
        () => t.emit("ready")
      );
      yield rh(ot.live2DModelMiddlewares, {
        live2dModel: t,
        source: e,
        options: i || {}
      }), yield o, t.emit("load");
    });
  }
  /**
   * Loads a Motion and registers the task to {@link motionTasksMap}. The task will be automatically
   * canceled when its owner - the MotionManager instance - has been destroyed.
   * @param motionManager - MotionManager that owns this Motion.
   * @param group - The motion group.
   * @param index - Index in the motion group.
   * @return Promise that resolves with the Motion, or with undefined if it can't be loaded.
   */
  static loadMotion(t, e, i) {
    var s, n;
    const o = (a) => t.emit("motionLoadError", e, i, a);
    try {
      const a = (s = t.definitions[e]) == null ? void 0 : s[i];
      if (!a)
        return Promise.resolve(void 0);
      t.listeners("destroy").includes(ot.releaseTasks) || t.once("destroy", ot.releaseTasks);
      let h = ot.motionTasksMap.get(t);
      h || (h = {}, ot.motionTasksMap.set(t, h));
      let l = h[e];
      l || (l = [], h[e] = l);
      const u = t.getMotionFile(a);
      return (n = l[i]) != null || (l[i] = re.load({
        url: u,
        settings: t.settings,
        type: t.motionDataType,
        target: t
      }).then((c) => {
        var d;
        const f = (d = ot.motionTasksMap.get(t)) == null ? void 0 : d[e];
        f && delete f[i];
        const p = t.createMotion(c, e, a);
        return t.emit("motionLoaded", e, i, p), p;
      }).catch((c) => {
        $.warn(t.tag, `Failed to load motion: ${u}
`, c), o(c);
      })), l[i];
    } catch (a) {
      $.warn(t.tag, `Failed to load motion at "${e}"[${i}]
`, a), o(a);
    }
    return Promise.resolve(void 0);
  }
  /**
   * Loads an Expression and registers the task to {@link expressionTasksMap}. The task will be automatically
   * canceled when its owner - the ExpressionManager instance - has been destroyed.
   * @param expressionManager - ExpressionManager that owns this Expression.
   * @param index - Index of the Expression.
   * @return Promise that resolves with the Expression, or with undefined if it can't be loaded.
   */
  static loadExpression(t, e) {
    var i;
    const s = (n) => t.emit("expressionLoadError", e, n);
    try {
      const n = t.definitions[e];
      if (!n)
        return Promise.resolve(void 0);
      t.listeners("destroy").includes(ot.releaseTasks) || t.once("destroy", ot.releaseTasks);
      let o = ot.expressionTasksMap.get(t);
      o || (o = [], ot.expressionTasksMap.set(t, o));
      const a = t.getExpressionFile(n);
      return (i = o[e]) != null || (o[e] = re.load({
        url: a,
        settings: t.settings,
        type: "json",
        target: t
      }).then((h) => {
        const l = ot.expressionTasksMap.get(t);
        l && delete l[e];
        const u = t.createExpression(h, n);
        return t.emit("expressionLoaded", e, u), u;
      }).catch((h) => {
        $.warn(t.tag, `Failed to load expression: ${a}
`, h), s(h);
      })), o[e];
    } catch (n) {
      $.warn(t.tag, `Failed to load expression at [${e}]
`, n), s(n);
    }
    return Promise.resolve(void 0);
  }
  static releaseTasks() {
    this instanceof sn ? ot.motionTasksMap.delete(this) : ot.expressionTasksMap.delete(this);
  }
};
m(Pt, "runtimes", []);
m(Pt, "urlToJSON", ih);
m(Pt, "jsonToSettings", sh);
m(Pt, "waitUntilReady", nh);
m(Pt, "setupOptionals", oh);
m(Pt, "setupEssentials", ah);
m(Pt, "createInternalModel", hh);
m(Pt, "live2DModelMiddlewares", [
  lh.factory,
  uh.factory,
  ih,
  sh,
  nh,
  oh,
  ah,
  hh
]);
m(Pt, "motionTasksMap", /* @__PURE__ */ new WeakMap());
m(Pt, "expressionTasksMap", /* @__PURE__ */ new WeakMap());
let It = Pt;
sn.prototype._loadMotion = function(r, t) {
  return It.loadMotion(this, r, t);
};
eh.prototype._loadExpression = function(r) {
  return It.loadExpression(this, r);
};
uh.live2dFactory = It;
lh.live2dFactory = It;
const ch = class Xs {
  constructor(t, {
    autoUpdate: e = !0,
    autoHitTest: i = !0,
    autoFocus: s = !0,
    autoInteract: n,
    ticker: o
  } = {}) {
    m(this, "model"), m(this, "destroyed", !1), m(this, "_ticker"), m(this, "_autoUpdate", !1), m(this, "_autoHitTest", !1), m(this, "_autoFocus", !1), o || (Xs.defaultTicker ? o = Xs.defaultTicker : typeof PIXI < "u" && (o = PIXI.Ticker.shared)), n !== void 0 && (i = n, s = n, $.warn(
      t.tag,
      "options.autoInteract is deprecated since v0.5.0, use autoHitTest and autoFocus instead."
    )), this.model = t, this.ticker = o, this.autoUpdate = e, this.autoHitTest = i, this.autoFocus = s, (i || s) && (this.model.eventMode = "static");
  }
  get ticker() {
    return this._ticker;
  }
  set ticker(t) {
    var e;
    this._ticker && this._ticker.remove(Hr, this), this._ticker = t, this._autoUpdate && ((e = this._ticker) == null || e.add(Hr, this));
  }
  /**
   * @see {@link AutomatorOptions.autoUpdate}
   */
  get autoUpdate() {
    return this._autoUpdate;
  }
  set autoUpdate(t) {
    var e;
    this.destroyed || (t ? this._ticker ? (this._ticker.add(Hr, this), this._autoUpdate = !0) : $.warn(
      this.model.tag,
      "No Ticker to be used for automatic updates. Either set option.ticker when creating Live2DModel, or expose PIXI to global scope (window.PIXI = PIXI)."
    ) : ((e = this._ticker) == null || e.remove(Hr, this), this._autoUpdate = !1));
  }
  /**
   * @see {@link AutomatorOptions.autoHitTest}
   */
  get autoHitTest() {
    return this._autoHitTest;
  }
  set autoHitTest(t) {
    t !== this.autoHitTest && (t ? this.model.on("pointertap", Ao, this) : this.model.off("pointertap", Ao, this), this._autoHitTest = t);
  }
  /**
   * @see {@link AutomatorOptions.autoFocus}
   */
  get autoFocus() {
    return this._autoFocus;
  }
  set autoFocus(t) {
    t !== this.autoFocus && (t ? this.model.on("globalpointermove", Ro, this) : this.model.off("globalpointermove", Ro, this), this._autoFocus = t);
  }
  /**
   * @see {@link AutomatorOptions.autoInteract}
   */
  get autoInteract() {
    return this._autoHitTest && this._autoFocus;
  }
  set autoInteract(t) {
    this.autoHitTest = t, this.autoFocus = t;
  }
  onTickerUpdate() {
    const t = this.ticker.deltaMS;
    this.model.update(t);
  }
  onTap(t) {
    this.model.tap(t.global.x, t.global.y);
  }
  onPointerMove(t) {
    this.model.focus(t.global.x, t.global.y);
  }
  destroy() {
    this.autoFocus = !1, this.autoHitTest = !1, this.autoUpdate = !1, this.ticker = void 0, this.destroyed = !0;
  }
};
m(ch, "defaultTicker");
let Io = ch;
function Hr() {
  this.onTickerUpdate();
}
function Ao(r) {
  this.onTap(r);
}
function Ro(r) {
  this.onPointerMove(r);
}
class Wf extends wi {
}
const Tt = new ht(), Yf = new q();
class qf extends Ye {
  constructor(t) {
    super(), m(this, "tag", "Live2DModel(uninitialized)"), m(this, "internalModel"), m(this, "textures", []), m(this, "transform", new Wf()), m(this, "anchor", new ee(this.onAnchorChange, this, 0, 0)), m(this, "glContextID", -1), m(this, "elapsedTime", 0), m(this, "deltaTime", 0), m(this, "automator"), this.automator = new Io(this, t), this.once("modelLoaded", () => this.init(t));
  }
  /**
   * Creates a Live2DModel from given source.
   * @param source - Can be one of: settings file URL, settings JSON object, ModelSettings instance.
   * @param options - Options for the creation.
   * @return Promise that resolves with the Live2DModel.
   */
  static from(t, e) {
    const i = new this(e);
    return It.setupLive2DModel(i, t, e).then(() => i);
  }
  /**
   * Synchronous version of `Live2DModel.from()`. This method immediately returns a Live2DModel instance,
   * whose resources have not been loaded. Therefore this model can't be manipulated or rendered
   * until the "load" event has been emitted.
   *
   * ```js
   * // no `await` here as it's not a Promise
   * const model = Live2DModel.fromSync('shizuku.model.json');
   *
   * // these will cause errors!
   * // app.stage.addChild(model);
   * // model.motion('tap_body');
   *
   * model.once('load', () => {
   *     // now it's safe
   *     app.stage.addChild(model);
   *     model.motion('tap_body');
   * });
   * ```
   */
  static fromSync(t, e) {
    const i = new this(e);
    return It.setupLive2DModel(i, t, e).then(e == null ? void 0 : e.onLoad).catch(e == null ? void 0 : e.onError), i;
  }
  /**
   * Registers the class of `PIXI.Ticker` for auto updating.
   * @deprecated Use {@link Live2DModelOptions.ticker} instead.
   */
  static registerTicker(t) {
    Io.defaultTicker = t.shared;
  }
  // TODO: rename
  /**
   * A handler of the "modelLoaded" event, invoked when the internal model has been loaded.
   */
  init(t) {
    this.tag = `Live2DModel(${this.internalModel.settings.name})`;
  }
  /**
   * A callback that observes {@link anchor}, invoked when the anchor's values have been changed.
   */
  onAnchorChange() {
    this.pivot.set(
      this.anchor.x * this.internalModel.width,
      this.anchor.y * this.internalModel.height
    );
  }
  /**
   * Shorthand to start a motion.
   * @param group - The motion group.
   * @param index - The index in this group. If not presented, a random motion will be started.
   * @param priority - The motion priority. Defaults to `MotionPriority.NORMAL`.
   * @return Promise that resolves with true if the motion is successfully started, with false otherwise.
   */
  motion(t, e, i) {
    return e === void 0 ? this.internalModel.motionManager.startRandomMotion(t, i) : this.internalModel.motionManager.startMotion(t, e, i);
  }
  /**
   * Shorthand to set an expression.
   * @param id - Either the index, or the name of the expression. If not presented, a random expression will be set.
   * @return Promise that resolves with true if succeeded, with false otherwise.
   */
  expression(t) {
    return this.internalModel.motionManager.expressionManager ? t === void 0 ? this.internalModel.motionManager.expressionManager.setRandomExpression() : this.internalModel.motionManager.expressionManager.setExpression(t) : Promise.resolve(!1);
  }
  /**
   * Updates the focus position. This will not cause the model to immediately look at the position,
   * instead the movement will be interpolated.
   * @param x - Position in world space.
   * @param y - Position in world space.
   * @param instant - Should the focus position be instantly applied.
   */
  focus(t, e, i = !1) {
    Tt.x = t, Tt.y = e, this.toModelPosition(Tt, Tt, !0);
    const s = Tt.x / this.internalModel.originalWidth * 2 - 1, n = Tt.y / this.internalModel.originalHeight * 2 - 1, o = Math.atan2(n, s);
    this.internalModel.focusController.focus(Math.cos(o), -Math.sin(o), i);
  }
  /**
   * Tap on the model. This will perform a hit-testing, and emit a "hit" event
   * if at least one of the hit areas is hit.
   * @param x - Position in world space.
   * @param y - Position in world space.
   * @emits {@link Live2DModelEvents.hit}
   */
  tap(t, e) {
    const i = this.hitTest(t, e);
    i.length && ($.log(this.tag, "Hit", i), this.emit("hit", i));
  }
  /**
   * Hit-test on the model.
   * @param x - Position in world space.
   * @param y - Position in world space.
   * @return The names of the *hit* hit areas. Can be empty if none is hit.
   */
  hitTest(t, e) {
    return Tt.x = t, Tt.y = e, this.toModelPosition(Tt, Tt), this.internalModel.hitTest(Tt.x, Tt.y);
  }
  /**
   * Calculates the position in the canvas of original, unscaled Live2D model.
   * @param position - A Point in world space.
   * @param result - A Point to store the new value. Defaults to a new Point.
   * @param skipUpdate - True to skip the update transform.
   * @return The Point in model canvas space.
   */
  toModelPosition(t, e = t.clone(), i) {
    return i || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.transform.worldTransform.applyInverse(t, e), this.internalModel.localTransform.applyInverse(e, e), e;
  }
  /**
   * A method required by `PIXI.InteractionManager` to perform hit-testing.
   * @param point - A Point in world space.
   * @return True if the point is inside this model.
   */
  containsPoint(t) {
    return this.getBounds(!0).contains(t.x, t.y);
  }
  /** @override */
  _calculateBounds() {
    this._bounds.addFrame(
      this.transform,
      0,
      0,
      this.internalModel.width,
      this.internalModel.height
    );
  }
  /**
   * Updates the model. Note this method just updates the timer,
   * and the actual update will be done right before rendering the model.
   * @param dt - The elapsed time in milliseconds since last frame.
   */
  update(t) {
    this.deltaTime += t, this.elapsedTime += t;
  }
  _render(t) {
    t.batch.reset(), t.geometry.reset(), t.shader.reset(), t.state.reset();
    let e = !1;
    this.glContextID !== t.CONTEXT_UID && (this.glContextID = t.CONTEXT_UID, this.internalModel.updateWebGLContext(t.gl, this.glContextID), e = !0);
    for (let n = 0; n < this.textures.length; n++) {
      const o = this.textures[n];
      o.valid && ((e || !o.baseTexture._glTextures[this.glContextID]) && (t.gl.pixelStorei(
        WebGLRenderingContext.UNPACK_FLIP_Y_WEBGL,
        this.internalModel.textureFlipY
      ), t.texture.bind(o.baseTexture, 0)), this.internalModel.bindTexture(
        n,
        o.baseTexture._glTextures[this.glContextID].texture
      ), o.baseTexture.touched = t.textureGC.count);
    }
    const i = t.framebuffer.viewport;
    this.internalModel.viewport = [i.x, i.y, i.width, i.height], this.deltaTime && (this.internalModel.update(this.deltaTime, this.elapsedTime), this.deltaTime = 0);
    const s = Yf.copyFrom(t.globalUniforms.uniforms.projectionMatrix).append(this.worldTransform);
    this.internalModel.updateTransform(s), this.internalModel.draw(t.gl), t.state.reset(), t.texture.reset();
  }
  /**
   * Destroys the model and all related resources. This takes the same options and also
   * behaves the same as `PIXI.Container#destroy`.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param [options.children=false] - if set to true, all the children will have their destroy
   *  method called as well. 'options' will be passed on to those calls.
   * @param [options.texture=false] - Only used for child Sprites if options.children is set to true
   *  Should it destroy the texture of the child sprite
   * @param [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
   *  Should it destroy the base texture of the child sprite
   */
  destroy(t) {
    this.emit("destroy"), t != null && t.texture && this.textures.forEach((e) => e.destroy(t.baseTexture)), this.automator.destroy(), this.internalModel.destroy(), super.destroy(t);
  }
}
if (!window.Live2D)
  throw new Error(
    "Could not find Cubism 2 runtime. This plugin requires live2d.min.js to be loaded."
  );
const Kf = Live2DMotion.prototype.updateParam;
Live2DMotion.prototype.updateParam = function(r, t) {
  Kf.call(this, r, t), t.isFinished() && this.onFinishHandler && (this.onFinishHandler(this), delete this.onFinishHandler);
};
class Zf extends AMotion {
  constructor(t) {
    super(), m(this, "params", []), this.setFadeIn(t.fade_in > 0 ? t.fade_in : br.expressionFadingDuration), this.setFadeOut(t.fade_out > 0 ? t.fade_out : br.expressionFadingDuration), Array.isArray(t.params) && t.params.forEach((e) => {
      const i = e.calc || "add";
      if (i === "add") {
        const s = e.def || 0;
        e.val -= s;
      } else if (i === "mult") {
        const s = e.def || 1;
        e.val /= s;
      }
      this.params.push({
        calc: i,
        val: e.val,
        id: e.id
      });
    });
  }
  /** @override */
  updateParamExe(t, e, i, s) {
    this.params.forEach((n) => {
      t.setParamFloat(n.id, n.val * i);
    });
  }
}
class Jf extends eh {
  constructor(t, e) {
    var i;
    super(t, e), m(this, "queueManager", new MotionQueueManager()), m(this, "definitions"), this.definitions = (i = this.settings.expressions) != null ? i : [], this.init();
  }
  isFinished() {
    return this.queueManager.isFinished();
  }
  getExpressionIndex(t) {
    return this.definitions.findIndex((e) => e.name === t);
  }
  getExpressionFile(t) {
    return t.file;
  }
  createExpression(t, e) {
    return new Zf(t);
  }
  _setExpression(t) {
    return this.queueManager.startMotion(t);
  }
  stopAllExpressions() {
    this.queueManager.stopAllMotions();
  }
  updateParameters(t, e) {
    return this.queueManager.updateParam(t);
  }
}
class Qf extends sn {
  constructor(t, e) {
    super(t, e), m(this, "definitions"), m(this, "groups", { idle: "idle" }), m(this, "motionDataType", "arraybuffer"), m(this, "queueManager", new MotionQueueManager()), m(this, "expressionManager"), this.definitions = this.settings.motions, this.init(e);
  }
  init(t) {
    super.init(t), this.settings.expressions && (this.expressionManager = new Jf(this.settings, t));
  }
  isFinished() {
    return this.queueManager.isFinished();
  }
  createMotion(t, e, i) {
    const s = Live2DMotion.loadMotion(t), n = e === this.groups.idle ? br.idleMotionFadingDuration : br.motionFadingDuration;
    return s.setFadeIn(i.fade_in > 0 ? i.fade_in : n), s.setFadeOut(i.fade_out > 0 ? i.fade_out : n), s;
  }
  getMotionFile(t) {
    return t.file;
  }
  getMotionName(t) {
    return t.file;
  }
  getSoundFile(t) {
    return t.sound;
  }
  _startMotion(t, e) {
    return t.onFinishHandler = e, this.queueManager.stopAllMotions(), this.queueManager.startMotion(t);
  }
  _stopAllMotions() {
    this.queueManager.stopAllMotions();
  }
  updateParameters(t, e) {
    return this.queueManager.updateParam(t);
  }
  destroy() {
    super.destroy(), this.queueManager = void 0;
  }
}
class tp {
  constructor(t) {
    m(this, "leftParam"), m(this, "rightParam"), m(this, "blinkInterval", 4e3), m(this, "closingDuration", 100), m(this, "closedDuration", 50), m(this, "openingDuration", 150), m(this, "eyeState", 0), m(this, "eyeParamValue", 1), m(this, "closedTimer", 0), m(this, "nextBlinkTimeLeft", this.blinkInterval), this.coreModel = t, this.leftParam = t.getParamIndex("PARAM_EYE_L_OPEN"), this.rightParam = t.getParamIndex("PARAM_EYE_R_OPEN");
  }
  setEyeParams(t) {
    this.eyeParamValue = yi(t, 0, 1), this.coreModel.setParamFloat(this.leftParam, this.eyeParamValue), this.coreModel.setParamFloat(this.rightParam, this.eyeParamValue);
  }
  update(t) {
    switch (this.eyeState) {
      case 0:
        this.nextBlinkTimeLeft -= t, this.nextBlinkTimeLeft < 0 && (this.eyeState = 1, this.nextBlinkTimeLeft = this.blinkInterval + this.closingDuration + this.closedDuration + this.openingDuration + Nf(0, 2e3));
        break;
      case 1:
        this.setEyeParams(this.eyeParamValue + t / this.closingDuration), this.eyeParamValue <= 0 && (this.eyeState = 2, this.closedTimer = 0);
        break;
      case 2:
        this.closedTimer += t, this.closedTimer >= this.closedDuration && (this.eyeState = 3);
        break;
      case 3:
        this.setEyeParams(this.eyeParamValue + t / this.openingDuration), this.eyeParamValue >= 1 && (this.eyeState = 0);
    }
  }
}
const ae = new Float32Array([
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  1
]);
class ep extends Hf {
  constructor(t, e, i) {
    super(), m(this, "settings"), m(this, "coreModel"), m(this, "motionManager"), m(this, "eyeBlink"), m(this, "eyeballXParamIndex"), m(this, "eyeballYParamIndex"), m(this, "angleXParamIndex"), m(this, "angleYParamIndex"), m(this, "angleZParamIndex"), m(this, "bodyAngleXParamIndex"), m(this, "breathParamIndex"), m(this, "textureFlipY", !0), m(this, "drawDataCount", 0), m(this, "disableCulling", !1), m(this, "hasDrawn", !1), this.coreModel = t, this.settings = e, this.motionManager = new Qf(e, i), this.eyeBlink = new tp(t), this.eyeballXParamIndex = t.getParamIndex("PARAM_EYE_BALL_X"), this.eyeballYParamIndex = t.getParamIndex("PARAM_EYE_BALL_Y"), this.angleXParamIndex = t.getParamIndex("PARAM_ANGLE_X"), this.angleYParamIndex = t.getParamIndex("PARAM_ANGLE_Y"), this.angleZParamIndex = t.getParamIndex("PARAM_ANGLE_Z"), this.bodyAngleXParamIndex = t.getParamIndex("PARAM_BODY_ANGLE_X"), this.breathParamIndex = t.getParamIndex("PARAM_BREATH"), this.init();
  }
  init() {
    super.init(), this.settings.initParams && this.settings.initParams.forEach(
      ({ id: n, value: o }) => this.coreModel.setParamFloat(n, o)
    ), this.settings.initOpacities && this.settings.initOpacities.forEach(
      ({ id: n, value: o }) => this.coreModel.setPartsOpacity(n, o)
    ), this.coreModel.saveParam();
    const t = this.coreModel.getModelContext()._$aS;
    t != null && t.length && (this.drawDataCount = t.length);
    let e = this.coreModel.drawParamWebGL.culling;
    Object.defineProperty(this.coreModel.drawParamWebGL, "culling", {
      set: (n) => e = n,
      // always return false when disabled
      get: () => this.disableCulling ? !1 : e
    });
    const i = this.coreModel.getModelContext().clipManager, s = i.setupClip;
    i.setupClip = (n, o) => {
      s.call(i, n, o), o.gl.viewport(...this.viewport);
    };
  }
  getSize() {
    return [this.coreModel.getCanvasWidth(), this.coreModel.getCanvasHeight()];
  }
  getLayout() {
    const t = {};
    if (this.settings.layout)
      for (const [e, i] of Object.entries(this.settings.layout)) {
        let s = e;
        e === "center_x" ? s = "centerX" : e === "center_y" && (s = "centerY"), t[s] = i;
      }
    return t;
  }
  updateWebGLContext(t, e) {
    const i = this.coreModel.drawParamWebGL;
    i.firstDraw = !0, i.setGL(t), i.glno = e;
    for (const [o, a] of Object.entries(i))
      a instanceof WebGLBuffer && (i[o] = null);
    const s = this.coreModel.getModelContext().clipManager;
    s.curFrameNo = e;
    const n = t.getParameter(t.FRAMEBUFFER_BINDING);
    s.getMaskRenderTexture(), t.bindFramebuffer(t.FRAMEBUFFER, n);
  }
  bindTexture(t, e) {
    this.coreModel.setTexture(t, e);
  }
  getHitAreaDefs() {
    var t;
    return ((t = this.settings.hitAreas) == null ? void 0 : t.map((e) => ({
      id: e.id,
      name: e.name,
      index: this.coreModel.getDrawDataIndex(e.id)
    }))) || [];
  }
  getDrawableIDs() {
    const t = this.coreModel.getModelContext(), e = [];
    for (let i = 0; i < this.drawDataCount; i++) {
      const s = t.getDrawData(i);
      s && e.push(s.getDrawDataID().id);
    }
    return e;
  }
  getDrawableIndex(t) {
    return this.coreModel.getDrawDataIndex(t);
  }
  getDrawableVertices(t) {
    if (typeof t == "string" && (t = this.coreModel.getDrawDataIndex(t), t === -1))
      throw new TypeError("Unable to find drawable ID: " + t);
    return this.coreModel.getTransformedPoints(t).slice();
  }
  hitTest(t, e) {
    return this.hasDrawn || $.warn(
      "Trying to hit-test a Cubism 2 model that has not been rendered yet. The result will always be empty since the draw data is not ready."
    ), super.hitTest(t, e);
  }
  update(t, e) {
    var i, s, n, o;
    super.update(t, e);
    const a = this.coreModel;
    this.emit("beforeMotionUpdate");
    const h = this.motionManager.update(this.coreModel, e);
    this.emit("afterMotionUpdate"), a.saveParam(), (i = this.motionManager.expressionManager) == null || i.update(a, e), h || (s = this.eyeBlink) == null || s.update(t), this.updateFocus(), this.updateNaturalMovements(t, e), (n = this.physics) == null || n.update(e), (o = this.pose) == null || o.update(t), this.emit("beforeModelUpdate"), a.update(), a.loadParam();
  }
  updateFocus() {
    this.coreModel.addToParamFloat(this.eyeballXParamIndex, this.focusController.x), this.coreModel.addToParamFloat(this.eyeballYParamIndex, this.focusController.y), this.coreModel.addToParamFloat(this.angleXParamIndex, this.focusController.x * 30), this.coreModel.addToParamFloat(this.angleYParamIndex, this.focusController.y * 30), this.coreModel.addToParamFloat(
      this.angleZParamIndex,
      this.focusController.x * this.focusController.y * -30
    ), this.coreModel.addToParamFloat(this.bodyAngleXParamIndex, this.focusController.x * 10);
  }
  updateNaturalMovements(t, e) {
    const i = e / 1e3 * 2 * Math.PI;
    this.coreModel.addToParamFloat(this.angleXParamIndex, 15 * Math.sin(i / 6.5345) * 0.5), this.coreModel.addToParamFloat(this.angleYParamIndex, 8 * Math.sin(i / 3.5345) * 0.5), this.coreModel.addToParamFloat(this.angleZParamIndex, 10 * Math.sin(i / 5.5345) * 0.5), this.coreModel.addToParamFloat(this.bodyAngleXParamIndex, 4 * Math.sin(i / 15.5345) * 0.5), this.coreModel.setParamFloat(this.breathParamIndex, 0.5 + 0.5 * Math.sin(i / 3.2345));
  }
  draw(t) {
    const e = this.disableCulling;
    t.getParameter(t.FRAMEBUFFER_BINDING) && (this.disableCulling = !0);
    const i = this.drawingMatrix;
    ae[0] = i.a, ae[1] = i.b, ae[4] = i.c, ae[5] = i.d, ae[12] = i.tx, ae[13] = i.ty, this.coreModel.setMatrix(ae), this.coreModel.draw(), this.hasDrawn = !0, this.disableCulling = e;
  }
  destroy() {
    super.destroy(), this.coreModel = void 0;
  }
}
class pr extends rn {
  constructor(t) {
    if (super(t), m(this, "moc"), m(this, "textures"), m(this, "layout"), m(this, "hitAreas"), m(this, "initParams"), m(this, "initOpacities"), m(this, "expressions"), m(this, "motions", {}), !pr.isValidJSON(t))
      throw new TypeError("Invalid JSON.");
    this.moc = t.model, ir("string", t, this, "textures", "textures"), this.copy(t);
  }
  /**
   * Checks if a JSON object is valid model settings.
   * @param json
   */
  static isValidJSON(t) {
    var e;
    return !!t && typeof t.model == "string" && ((e = t.textures) == null ? void 0 : e.length) > 0 && // textures must be an array of strings
    t.textures.every((i) => typeof i == "string");
  }
  /**
   * Validates and copies *optional* properties from raw JSON.
   */
  copy(t) {
    rr("string", t, this, "name", "name"), rr("string", t, this, "pose", "pose"), rr("string", t, this, "physics", "physics"), rr("object", t, this, "layout", "layout"), rr("object", t, this, "motions", "motions"), ir("object", t, this, "hit_areas", "hitAreas"), ir("object", t, this, "expressions", "expressions"), ir("object", t, this, "init_params", "initParams"), ir("object", t, this, "init_opacities", "initOpacities");
  }
  replaceFiles(t) {
    super.replaceFiles(t);
    for (const [e, i] of Object.entries(this.motions))
      for (let s = 0; s < i.length; s++)
        i[s].file = t(i[s].file, `motions.${e}[${s}].file`), i[s].sound !== void 0 && (i[s].sound = t(i[s].sound, `motions.${e}[${s}].sound`));
    if (this.expressions)
      for (let e = 0; e < this.expressions.length; e++)
        this.expressions[e].file = t(
          this.expressions[e].file,
          `expressions[${e}].file`
        );
  }
}
const rp = {
  x: PhysicsHair.Src.SRC_TO_X,
  y: PhysicsHair.Src.SRC_TO_Y,
  angle: PhysicsHair.Src.SRC_TO_G_ANGLE
}, ip = {
  x: PhysicsHair.Src.SRC_TO_X,
  y: PhysicsHair.Src.SRC_TO_Y,
  angle: PhysicsHair.Src.SRC_TO_G_ANGLE
};
class sp {
  constructor(t, e) {
    m(this, "physicsHairs", []), this.coreModel = t, e.physics_hair && (this.physicsHairs = e.physics_hair.map((i) => {
      const s = new PhysicsHair();
      return s.setup(
        i.setup.length,
        i.setup.regist,
        i.setup.mass
      ), i.src.forEach(({ id: n, ptype: o, scale: a, weight: h }) => {
        const l = rp[o];
        l && s.addSrcParam(l, n, a, h);
      }), i.targets.forEach(({ id: n, ptype: o, scale: a, weight: h }) => {
        const l = ip[o];
        l && s.addTargetParam(l, n, a, h);
      }), s;
    }));
  }
  update(t) {
    this.physicsHairs.forEach((e) => e.update(this.coreModel, t));
  }
}
class So {
  constructor(t) {
    m(this, "paramIndex", -1), m(this, "partsIndex", -1), m(this, "link", []), this.id = t;
  }
  initIndex(t) {
    this.paramIndex = t.getParamIndex("VISIBLE:" + this.id), this.partsIndex = t.getPartsDataIndex(PartsDataID.getID(this.id)), t.setParamFloat(this.paramIndex, 1);
  }
}
class np {
  constructor(t, e) {
    m(this, "opacityAnimDuration", 500), m(this, "partsGroups", []), this.coreModel = t, e.parts_visible && (this.partsGroups = e.parts_visible.map(
      ({ group: i }) => i.map(({ id: s, link: n }) => {
        const o = new So(s);
        return n && (o.link = n.map((a) => new So(a))), o;
      })
    ), this.init());
  }
  init() {
    this.partsGroups.forEach((t) => {
      t.forEach((e) => {
        if (e.initIndex(this.coreModel), e.paramIndex >= 0) {
          const i = this.coreModel.getParamFloat(e.paramIndex) !== 0;
          this.coreModel.setPartsOpacity(e.partsIndex, i ? 1 : 0), this.coreModel.setParamFloat(e.paramIndex, i ? 1 : 0), e.link.length > 0 && e.link.forEach((s) => s.initIndex(this.coreModel));
        }
      });
    });
  }
  normalizePartsOpacityGroup(t, e) {
    const i = this.coreModel, s = 0.5, n = 0.15;
    let o = 1, a = t.findIndex(
      ({ paramIndex: h, partsIndex: l }) => l >= 0 && i.getParamFloat(h) !== 0
    );
    if (a >= 0) {
      const h = i.getPartsOpacity(t[a].partsIndex);
      o = yi(h + e / this.opacityAnimDuration, 0, 1);
    } else
      a = 0, o = 1;
    t.forEach(({ partsIndex: h }, l) => {
      if (h >= 0)
        if (a == l)
          i.setPartsOpacity(h, o);
        else {
          let u = i.getPartsOpacity(h), c;
          o < s ? c = o * (s - 1) / s + 1 : c = (1 - o) * s / (1 - s), (1 - c) * (1 - o) > n && (c = 1 - n / (1 - o)), u > c && (u = c), i.setPartsOpacity(h, u);
        }
    });
  }
  copyOpacity(t) {
    const e = this.coreModel;
    t.forEach(({ partsIndex: i, link: s }) => {
      if (i >= 0 && s) {
        const n = e.getPartsOpacity(i);
        s.forEach(({ partsIndex: o }) => {
          o >= 0 && e.setPartsOpacity(o, n);
        });
      }
    });
  }
  update(t) {
    this.partsGroups.forEach((e) => {
      this.normalizePartsOpacityGroup(e, t), this.copyOpacity(e);
    });
  }
}
It.registerRuntime({
  version: 2,
  test(r) {
    return r instanceof pr || pr.isValidJSON(r);
  },
  ready() {
    return Promise.resolve();
  },
  isValidMoc(r) {
    if (r.byteLength < 3)
      return !1;
    const t = new Int8Array(r, 0, 3);
    return String.fromCharCode(...t) === "moc";
  },
  createModelSettings(r) {
    return new pr(r);
  },
  createCoreModel(r) {
    const t = Live2DModelWebGL.loadModel(r), e = Live2D.getError();
    if (e)
      throw e;
    return t;
  },
  createInternalModel(r, t, e) {
    return new ep(r, t, e);
  },
  createPose(r, t) {
    return new np(r, t);
  },
  createPhysics(r, t) {
    return new sp(r, t);
  }
});
var op = /* @__PURE__ */ wh("<canvas id=canvas>");
const ap = ({
  config: r
}) => {
  let t, e, i, s;
  try {
    ({
      width: e,
      height: i,
      models: s
    } = JSON.parse(r));
  } catch {
    return console.error("Invalid config: `", r, "`"), null;
  }
  const [n] = vh(() => Promise.all(s.map(async ({
    src: o,
    ...a
  }) => ({
    ...a,
    live2d: await qf.from(o, {
      autoFocus: !1,
      ticker: zt.shared
    })
  }))), {
    initialValue: []
  });
  return mh(() => {
    if (n().length === 0 || !t) return;
    const o = new Qa({
      view: t,
      autoStart: !0,
      backgroundAlpha: 0,
      width: e ?? 1e3,
      height: i ?? 1e3,
      antialias: !0
    });
    n().forEach(({
      live2d: a,
      pos: h,
      scale: l,
      expression: u,
      motion: c
    }) => {
      o.stage.addChild(a), a.x = h == null ? void 0 : h.x, a.y = (h == null ? void 0 : h.y) ?? 0, l && a.scale.set(l.x ?? 1, l.y ?? 1), u && a.expression(u), c && a.motion(c);
    });
  }), (() => {
    var o = op(), a = t;
    return typeof a == "function" ? Ih(a, o) : t = o, o.style.setProperty("width", "100%"), o.style.setProperty("height", "100%"), o.style.setProperty("display", "flex"), o;
  })();
};
Gh("live2d-widget", {
  config: '{"models":[]}'
}, ap);
