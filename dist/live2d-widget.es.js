const xu = (r, t) => r === t, Os = {
  equals: xu
};
let Dh = Gh;
const xr = 1, Ns = 2, Bh = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, mn = {};
var Be = null;
let vn = null, Tu = null, ve = null, Oe = null, gr = null, tn = 0;
function wu(r, t) {
  const e = ve, i = Be, s = r.length === 0, o = t === void 0 ? i : t, h = s ? Bh : {
    owned: null,
    cleanups: null,
    context: o ? o.context : null,
    owner: o
  }, l = s ? r : () => r(() => Hi(() => rn(h)));
  Be = h, ve = null;
  try {
    return qr(l, !0);
  } finally {
    ve = e, Be = i;
  }
}
function di(r, t) {
  t = t ? Object.assign({}, Os, t) : Os;
  const e = {
    value: r,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, i = (s) => (typeof s == "function" && (s = s(e.value)), kh(e, s));
  return [Uh.bind(e), i];
}
function _a(r, t, e) {
  const i = en(r, t, !0, xr);
  Pi(i);
}
function qn(r, t, e) {
  const i = en(r, t, !1, xr);
  Pi(i);
}
function Eu(r, t, e) {
  Dh = Iu;
  const i = en(r, t, !1, xr);
  i.user = !0, gr ? gr.push(i) : Pi(i);
}
function bu(r, t, e) {
  e = e ? Object.assign({}, Os, e) : Os;
  const i = en(r, t, !0, 0);
  return i.observers = null, i.observerSlots = null, i.comparator = e.equals || void 0, Pi(i), Uh.bind(i);
}
function Au(r) {
  return r && typeof r == "object" && "then" in r;
}
function Su(r, t, e) {
  let i, s, o;
  arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (i = !0, s = r, o = t || {}) : (i = r, s = t, o = {});
  let h = null, l = mn, c = !1, _ = "initialValue" in o, g = typeof i == "function" && bu(i);
  const T = /* @__PURE__ */ new Set(), [w, S] = (o.storage || di)(o.initialValue), [R, D] = di(void 0), [L, K] = di(void 0, {
    equals: !1
  }), [q, M] = di(_ ? "ready" : "unresolved");
  function Q(j, H, Tt, pt) {
    return h === j && (h = null, pt !== void 0 && (_ = !0), (j === l || H === l) && o.onHydrated && queueMicrotask(
      () => o.onHydrated(pt, {
        value: H
      })
    ), l = mn, at(H, Tt)), H;
  }
  function at(j, H) {
    qr(() => {
      H === void 0 && S(() => j), M(H !== void 0 ? "errored" : _ ? "ready" : "unresolved"), D(H);
      for (const Tt of T.keys()) Tt.decrement();
      T.clear();
    }, !1);
  }
  function At() {
    const j = Pu, H = w(), Tt = R();
    if (Tt !== void 0 && !h) throw Tt;
    return ve && !ve.user && j && _a(() => {
      L(), h && (j.resolved || T.has(j) || (j.increment(), T.add(j)));
    }), H;
  }
  function Jt(j = !0) {
    if (j !== !1 && c) return;
    c = !1;
    const H = g ? g() : i;
    if (H == null || H === !1) {
      Q(h, Hi(w));
      return;
    }
    const Tt = l !== mn ? l : Hi(
      () => s(H, {
        value: w(),
        refetching: j
      })
    );
    return Au(Tt) ? (h = Tt, "value" in Tt ? (Tt.status === "success" ? Q(h, Tt.value, void 0, H) : Q(h, void 0, Hn(Tt.value), H), Tt) : (c = !0, queueMicrotask(() => c = !1), qr(() => {
      M(_ ? "refreshing" : "pending"), K();
    }, !1), Tt.then(
      (pt) => Q(Tt, pt, void 0, H),
      (pt) => Q(Tt, void 0, Hn(pt), H)
    ))) : (Q(h, Tt, void 0, H), Tt);
  }
  return Object.defineProperties(At, {
    state: {
      get: () => q()
    },
    error: {
      get: () => R()
    },
    loading: {
      get() {
        const j = q();
        return j === "pending" || j === "refreshing";
      }
    },
    latest: {
      get() {
        if (!_) return At();
        const j = R();
        if (j && !h) throw j;
        return w();
      }
    }
  }), g ? _a(() => Jt(!1)) : Jt(!1), [
    At,
    {
      refetch: Jt,
      mutate: S
    }
  ];
}
function Hi(r) {
  if (ve === null) return r();
  const t = ve;
  ve = null;
  try {
    return r();
  } finally {
    ve = t;
  }
}
let Pu;
function Uh() {
  if (this.sources && this.state)
    if (this.state === xr) Pi(this);
    else {
      const r = Oe;
      Oe = null, qr(() => Bs(this), !1), Oe = r;
    }
  if (ve) {
    const r = this.observers ? this.observers.length : 0;
    ve.sources ? (ve.sources.push(this), ve.sourceSlots.push(r)) : (ve.sources = [this], ve.sourceSlots = [r]), this.observers ? (this.observers.push(ve), this.observerSlots.push(ve.sources.length - 1)) : (this.observers = [ve], this.observerSlots = [ve.sources.length - 1]);
  }
  return this.value;
}
function kh(r, t, e) {
  let i = r.value;
  return (!r.comparator || !r.comparator(i, t)) && (r.value = t, r.observers && r.observers.length && qr(() => {
    for (let s = 0; s < r.observers.length; s += 1) {
      const o = r.observers[s], h = vn && vn.running;
      h && vn.disposed.has(o), (h ? !o.tState : !o.state) && (o.pure ? Oe.push(o) : gr.push(o), o.observers && Vh(o)), h || (o.state = xr);
    }
    if (Oe.length > 1e6)
      throw Oe = [], new Error();
  }, !1)), t;
}
function Pi(r) {
  if (!r.fn) return;
  rn(r);
  const t = tn;
  Ru(
    r,
    r.value,
    t
  );
}
function Ru(r, t, e) {
  let i;
  const s = Be, o = ve;
  ve = Be = r;
  try {
    i = r.fn(t);
  } catch (h) {
    return r.pure && (r.state = xr, r.owned && r.owned.forEach(rn), r.owned = null), r.updatedAt = e + 1, zh(h);
  } finally {
    ve = o, Be = s;
  }
  (!r.updatedAt || r.updatedAt <= e) && (r.updatedAt != null && "observers" in r ? kh(r, i) : r.value = i, r.updatedAt = e);
}
function en(r, t, e, i = xr, s) {
  const o = {
    fn: r,
    state: i,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: Be,
    context: Be ? Be.context : null,
    pure: e
  };
  return Be === null || Be !== Bh && (Be.owned ? Be.owned.push(o) : Be.owned = [o]), o;
}
function Ds(r) {
  if (r.state === 0) return;
  if (r.state === Ns) return Bs(r);
  if (r.suspense && Hi(r.suspense.inFallback)) return r.suspense.effects.push(r);
  const t = [r];
  for (; (r = r.owner) && (!r.updatedAt || r.updatedAt < tn); )
    r.state && t.push(r);
  for (let e = t.length - 1; e >= 0; e--)
    if (r = t[e], r.state === xr)
      Pi(r);
    else if (r.state === Ns) {
      const i = Oe;
      Oe = null, qr(() => Bs(r, t[0]), !1), Oe = i;
    }
}
function qr(r, t) {
  if (Oe) return r();
  let e = !1;
  t || (Oe = []), gr ? e = !0 : gr = [], tn++;
  try {
    const i = r();
    return Cu(e), i;
  } catch (i) {
    e || (gr = null), Oe = null, zh(i);
  }
}
function Cu(r) {
  if (Oe && (Gh(Oe), Oe = null), r) return;
  const t = gr;
  gr = null, t.length && qr(() => Dh(t), !1);
}
function Gh(r) {
  for (let t = 0; t < r.length; t++) Ds(r[t]);
}
function Iu(r) {
  let t, e = 0;
  for (t = 0; t < r.length; t++) {
    const i = r[t];
    i.user ? r[e++] = i : Ds(i);
  }
  for (t = 0; t < e; t++) Ds(r[t]);
}
function Bs(r, t) {
  r.state = 0;
  for (let e = 0; e < r.sources.length; e += 1) {
    const i = r.sources[e];
    if (i.sources) {
      const s = i.state;
      s === xr ? i !== t && (!i.updatedAt || i.updatedAt < tn) && Ds(i) : s === Ns && Bs(i, t);
    }
  }
}
function Vh(r) {
  for (let t = 0; t < r.observers.length; t += 1) {
    const e = r.observers[t];
    e.state || (e.state = Ns, e.pure ? Oe.push(e) : gr.push(e), e.observers && Vh(e));
  }
}
function rn(r) {
  let t;
  if (r.sources)
    for (; r.sources.length; ) {
      const e = r.sources.pop(), i = r.sourceSlots.pop(), s = e.observers;
      if (s && s.length) {
        const o = s.pop(), h = e.observerSlots.pop();
        i < s.length && (o.sourceSlots[h] = i, s[i] = o, e.observerSlots[i] = h);
      }
    }
  if (r.owned) {
    for (t = r.owned.length - 1; t >= 0; t--) rn(r.owned[t]);
    r.owned = null;
  }
  if (r.cleanups) {
    for (t = r.cleanups.length - 1; t >= 0; t--) r.cleanups[t]();
    r.cleanups = null;
  }
  r.state = 0;
}
function Hn(r) {
  return r instanceof Error ? r : new Error(typeof r == "string" ? r : "Unknown error", {
    cause: r
  });
}
function zh(r, t = Be) {
  throw Hn(r);
}
function Lu(r, t, e) {
  let i = e.length, s = t.length, o = i, h = 0, l = 0, c = t[s - 1].nextSibling, _ = null;
  for (; h < s || l < o; ) {
    if (t[h] === e[l]) {
      h++, l++;
      continue;
    }
    for (; t[s - 1] === e[o - 1]; )
      s--, o--;
    if (s === h) {
      const g = o < i ? l ? e[l - 1].nextSibling : e[o - l] : c;
      for (; l < o; ) r.insertBefore(e[l++], g);
    } else if (o === l)
      for (; h < s; )
        (!_ || !_.has(t[h])) && t[h].remove(), h++;
    else if (t[h] === e[o - 1] && e[l] === t[s - 1]) {
      const g = t[--s].nextSibling;
      r.insertBefore(e[l++], t[h++].nextSibling), r.insertBefore(e[--o], g), t[s] = e[o];
    } else {
      if (!_) {
        _ = /* @__PURE__ */ new Map();
        let T = l;
        for (; T < o; ) _.set(e[T], T++);
      }
      const g = _.get(t[h]);
      if (g != null)
        if (l < g && g < o) {
          let T = h, w = 1, S;
          for (; ++T < s && T < o && !((S = _.get(t[T])) == null || S !== g + w); )
            w++;
          if (w > g - l) {
            const R = t[h];
            for (; l < g; ) r.insertBefore(e[l++], R);
          } else r.replaceChild(e[l++], t[h++]);
        } else h++;
      else t[h++].remove();
    }
  }
}
function Fu(r, t, e) {
  let i;
  const s = () => {
    const h = document.createElement("template");
    return h.innerHTML = r, h.content.firstChild;
  }, o = () => (i || (i = s())).cloneNode(!0);
  return o.cloneNode = o, o;
}
function Mu(r, t, e) {
  return Hi(() => r(t, e));
}
function Ou(r, t, e, i) {
  if (typeof t != "function") return Us(r, t, i, e);
  qn((s) => Us(r, t(), s, e), i);
}
function Us(r, t, e, i, s) {
  for (; typeof e == "function"; ) e = e();
  if (t === e) return e;
  const o = typeof t;
  if (r = r, o === "string" || o === "number") {
    if (o === "number" && (t = t.toString(), t === e))
      return e;
    e !== "" && typeof e == "string" ? e = r.firstChild.data = t : e = r.textContent = t;
  } else if (t == null || o === "boolean")
    e = ls(r, e, i);
  else {
    if (o === "function")
      return qn(() => {
        let h = t();
        for (; typeof h == "function"; ) h = h();
        e = Us(r, h, e, i);
      }), () => e;
    if (Array.isArray(t)) {
      const h = [], l = e && Array.isArray(e);
      if (Zn(h, t, e, s))
        return qn(() => e = Us(r, h, e, i, !0)), () => e;
      h.length === 0 ? e = ls(r, e, i) : l ? e.length === 0 ? pa(r, h, i) : Lu(r, e, h) : (e && ls(r), pa(r, h)), e = h;
    } else t.nodeType && (Array.isArray(e) ? ls(r, e, null, t) : e == null || e === "" || !r.firstChild ? r.appendChild(t) : r.replaceChild(t, r.firstChild), e = t);
  }
  return e;
}
function Zn(r, t, e, i) {
  let s = !1;
  for (let o = 0, h = t.length; o < h; o++) {
    let l = t[o], c = e && e[r.length], _;
    if (!(l == null || l === !0 || l === !1)) if ((_ = typeof l) == "object" && l.nodeType)
      r.push(l);
    else if (Array.isArray(l))
      s = Zn(r, l, c) || s;
    else if (_ === "function")
      if (i) {
        for (; typeof l == "function"; ) l = l();
        s = Zn(
          r,
          Array.isArray(l) ? l : [l],
          Array.isArray(c) ? c : [c]
        ) || s;
      } else
        r.push(l), s = !0;
    else {
      const g = String(l);
      c && c.nodeType === 3 && c.data === g ? r.push(c) : r.push(document.createTextNode(g));
    }
  }
  return s;
}
function pa(r, t, e = null) {
  for (let i = 0, s = t.length; i < s; i++) r.insertBefore(t[i], e);
}
function ls(r, t, e, i) {
  if (e === void 0) return r.textContent = "";
  const s = i || document.createTextNode("");
  if (t.length) {
    let o = !1;
    for (let h = t.length - 1; h >= 0; h--) {
      const l = t[h];
      if (s !== l) {
        const c = l.parentNode === r;
        !o && !h ? c ? r.replaceChild(s, l) : r.insertBefore(s, e) : c && l.remove();
      } else o = !0;
    }
  } else r.insertBefore(s, e);
  return [s];
}
(function() {
  var wt = !0;
  function r() {
    wt || (this._$MT = null, this._$5S = null, this._$NP = 0, r._$42++, this._$5S = new B(this));
  }
  r._$0s = 1, r._$4s = 2, r._$42 = 0, r._$62 = function(n, a) {
    try {
      if (a instanceof ArrayBuffer && (a = new DataView(a)), !(a instanceof DataView))
        throw new He("_$SS#loadModel(b) / b _$x be DataView or ArrayBuffer");
      var u = new ge(a), d = u._$ST(), p = u._$ST(), f = u._$ST(), y;
      if (d == 109 && p == 111 && f == 99)
        y = u._$ST();
      else
        throw new He("_$gi _$C _$li , _$Q0 _$P0.");
      if (u._$gr(y), y > J._$T7) {
        n._$NP |= r._$4s;
        var $ = J._$T7, v = "_$gi _$C _$li , _$n0 _$_ version _$li ( SDK : " + $ + " < _$f0 : " + y + ` )@_$SS#loadModel()
`;
        throw new He(v);
      }
      var x = u._$nP();
      if (y >= J._$s7) {
        var E = u._$9T(), b = u._$9T();
        if (E != -30584 || b != -30584)
          throw n._$NP |= r._$0s, new He("_$gi _$C _$li , _$0 _$6 _$Ui.");
      }
      n._$KS(x);
      var A = n.getModelContext();
      A.setDrawParam(n.getDrawParam()), A.init();
    } catch (C) {
      h._$Rb(C);
    }
  }, r.prototype._$KS = function(n) {
    this._$MT = n;
  }, r.prototype.getModelImpl = function() {
    return this._$MT == null && (this._$MT = new w(), this._$MT._$zP()), this._$MT;
  }, r.prototype.getCanvasWidth = function() {
    return this._$MT == null ? 0 : this._$MT.getCanvasWidth();
  }, r.prototype.getCanvasHeight = function() {
    return this._$MT == null ? 0 : this._$MT.getCanvasHeight();
  }, r.prototype.getParamFloat = function(n) {
    return typeof n != "number" && (n = this._$5S.getParamIndex(T.getID(n))), this._$5S.getParamFloat(n);
  }, r.prototype.setParamFloat = function(n, a, u) {
    typeof n != "number" && (n = this._$5S.getParamIndex(T.getID(n))), arguments.length < 3 && (u = 1), this._$5S.setParamFloat(n, this._$5S.getParamFloat(n) * (1 - u) + a * u);
  }, r.prototype.addToParamFloat = function(n, a, u) {
    typeof n != "number" && (n = this._$5S.getParamIndex(T.getID(n))), arguments.length < 3 && (u = 1), this._$5S.setParamFloat(n, this._$5S.getParamFloat(n) + a * u);
  }, r.prototype.multParamFloat = function(n, a, u) {
    typeof n != "number" && (n = this._$5S.getParamIndex(T.getID(n))), arguments.length < 3 && (u = 1), this._$5S.setParamFloat(n, this._$5S.getParamFloat(n) * (1 + (a - 1) * u));
  }, r.prototype.getParamIndex = function(n) {
    return this._$5S.getParamIndex(T.getID(n));
  }, r.prototype.loadParam = function() {
    this._$5S.loadParam();
  }, r.prototype.saveParam = function() {
    this._$5S.saveParam();
  }, r.prototype.init = function() {
    this._$5S.init();
  }, r.prototype.update = function() {
    this._$5S.update();
  }, r.prototype._$Rs = function() {
    return h._$li("_$60 _$PT _$Rs()"), -1;
  }, r.prototype._$Ds = function(n) {
    h._$li(`_$60 _$PT _$SS#_$Ds() 
`);
  }, r.prototype._$K2 = function() {
  }, r.prototype.draw = function() {
  }, r.prototype.getModelContext = function() {
    return this._$5S;
  }, r.prototype._$s2 = function() {
    return this._$NP;
  }, r.prototype._$P7 = function(n, a, u, d) {
    var p = -1, f = 0, y = this, $ = 0.5, v = 0.15;
    if (u == 0) {
      for (var x = 0; x < n.length; x++) {
        var E = n[x], b = a[x], A = y.getParamFloat(E) != 0;
        y.setPartsOpacity(b, A ? 1 : 0);
      }
      return;
    } else if (n.length == 1) {
      var E = n[0], C = y.getParamFloat(E) != 0, b = a[0], O = y.getPartsOpacity(b), P = u / d;
      C ? (O += P, O > 1 && (O = 1)) : (O -= P, O < 0 && (O = 0)), y.setPartsOpacity(b, O);
    } else {
      for (var x = 0; x < n.length; x++) {
        var E = n[x], A = y.getParamFloat(E) != 0;
        if (A) {
          if (p >= 0)
            break;
          p = x;
          var b = a[x];
          f = y.getPartsOpacity(b), f += u / d, f > 1 && (f = 1);
        }
      }
      p < 0 && (console.log("No _$wi _$q0/ _$U default[%s]", n[0]), p = 0, f = 1, y.loadParam(), y.setParamFloat(n[p], f), y.saveParam());
      for (var x = 0; x < n.length; x++) {
        var b = a[x];
        if (p == x)
          y.setPartsOpacity(b, f);
        else {
          var k = y.getPartsOpacity(b), N;
          f < $ ? N = f * ($ - 1) / $ + 1 : N = (1 - f) * $ / (1 - $);
          {
            var G = (1 - N) * (1 - f);
            G > v && (N = 1 - v / (1 - f));
          }
          k > N && (k = N), y.setPartsOpacity(b, k);
        }
      }
    }
  }, r.prototype.setPartsOpacity = function(n, a) {
    typeof n != "number" && (n = this._$5S.getPartsDataIndex(_.getID(n))), this._$5S.setPartsOpacity(n, a);
  }, r.prototype.getPartsDataIndex = function(n) {
    return n instanceof _ || (n = _.getID(n)), this._$5S.getPartsDataIndex(n);
  }, r.prototype.getPartsOpacity = function(n) {
    return typeof n != "number" && (n = this._$5S.getPartsDataIndex(_.getID(n))), n < 0 ? 0 : this._$5S.getPartsOpacity(n);
  }, r.prototype.getDrawParam = function() {
  }, r.prototype.getDrawDataIndex = function(n) {
    return this._$5S.getDrawDataIndex(ne.getID(n));
  }, r.prototype.getDrawData = function(n) {
    return this._$5S.getDrawData(n);
  }, r.prototype.getTransformedPoints = function(n) {
    var a = this._$5S._$C2(n);
    return a instanceof os ? a.getTransformedPoints() : null;
  }, r.prototype.getIndexArray = function(n) {
    if (n < 0 || n >= this._$5S._$aS.length)
      return null;
    var a = this._$5S._$aS[n];
    return a != null && a.getType() == lt._$wb && a instanceof Ft ? a.getIndexArray() : null;
  };
  function t(n) {
    if (!wt) {
      this.clipContextList = new Array(), this.glcontext = n.gl, this.dp_webgl = n, this.curFrameNo = 0, this.firstError_clipInNotUpdate = !0, this.colorBuffer = 0, this.isInitGLFBFunc = !1, this.tmpBoundsOnModel = new at(), F.glContext.length > F.frameBuffers.length && (this.curFrameNo = this.getMaskRenderTexture()), this.tmpModelToViewMatrix = new Vt(), this.tmpMatrix2 = new Vt(), this.tmpMatrixForMask = new Vt(), this.tmpMatrixForDraw = new Vt(), this.CHANNEL_COLORS = new Array();
      var a = new Tt();
      a = new Tt(), a.r = 0, a.g = 0, a.b = 0, a.a = 1, this.CHANNEL_COLORS.push(a), a = new Tt(), a.r = 1, a.g = 0, a.b = 0, a.a = 0, this.CHANNEL_COLORS.push(a), a = new Tt(), a.r = 0, a.g = 1, a.b = 0, a.a = 0, this.CHANNEL_COLORS.push(a), a = new Tt(), a.r = 0, a.g = 0, a.b = 1, a.a = 0, this.CHANNEL_COLORS.push(a);
      for (var u = 0; u < this.CHANNEL_COLORS.length; u++)
        this.dp_webgl.setChannelFlagAsColor(u, this.CHANNEL_COLORS[u]);
    }
  }
  t.CHANNEL_COUNT = 4, t.RENDER_TEXTURE_USE_MIPMAP = !1, t.NOT_USED_FRAME = -100, t.prototype._$L7 = function() {
    if (this.tmpModelToViewMatrix && (this.tmpModelToViewMatrix = null), this.tmpMatrix2 && (this.tmpMatrix2 = null), this.tmpMatrixForMask && (this.tmpMatrixForMask = null), this.tmpMatrixForDraw && (this.tmpMatrixForDraw = null), this.tmpBoundsOnModel && (this.tmpBoundsOnModel = null), this.CHANNEL_COLORS) {
      for (var n = this.CHANNEL_COLORS.length - 1; n >= 0; --n)
        this.CHANNEL_COLORS.splice(n, 1);
      this.CHANNEL_COLORS = [];
    }
    this.releaseShader();
  }, t.prototype.releaseShader = function() {
    for (var n = F.frameBuffers.length, a = 0; a < n; a++)
      this.gl.deleteFramebuffer(F.frameBuffers[a].framebuffer);
    F.frameBuffers = [], F.glContext = [];
  }, t.prototype.init = function(n, a, u) {
    for (var d = 0; d < a.length; d++) {
      var p = a[d].getClipIDList();
      if (p != null) {
        var f = this.findSameClip(p);
        f == null && (f = new e(this, n, p), this.clipContextList.push(f));
        var y = a[d].getDrawDataID(), $ = n.getDrawDataIndex(y);
        f.addClippedDrawData(y, $);
        var v = u[d];
        v.clipBufPre_clipContext = f;
      }
    }
  }, t.prototype.getMaskRenderTexture = function() {
    var n = null;
    return n = this.dp_webgl.createFramebuffer(), F.frameBuffers[this.dp_webgl.glno] = n, this.dp_webgl.glno;
  }, t.prototype.setupClip = function(n, a) {
    for (var u = 0, d = 0; d < this.clipContextList.length; d++) {
      var p = this.clipContextList[d];
      this.calcClippedDrawTotalBounds(n, p), p.isUsing && u++;
    }
    if (u > 0) {
      var f = a.gl.getParameter(a.gl.FRAMEBUFFER_BINDING), y = new Array(4);
      y[0] = 0, y[1] = 0, y[2] = a.gl.canvas.width, y[3] = a.gl.canvas.height, a.gl.viewport(0, 0, F.clippingMaskBufferSize, F.clippingMaskBufferSize), this.setupLayoutBounds(u), a.gl.bindFramebuffer(a.gl.FRAMEBUFFER, F.frameBuffers[this.curFrameNo].framebuffer), a.gl.clearColor(0, 0, 0, 0), a.gl.clear(a.gl.COLOR_BUFFER_BIT);
      for (var d = 0; d < this.clipContextList.length; d++) {
        var p = this.clipContextList[d], $ = p.allClippedDrawRect;
        p.layoutChannelNo;
        var v = p.layoutBounds, x = 0.05;
        this.tmpBoundsOnModel._$jL($), this.tmpBoundsOnModel.expand($.width * x, $.height * x);
        var E = v.width / this.tmpBoundsOnModel.width, b = v.height / this.tmpBoundsOnModel.height;
        this.tmpMatrix2.identity(), this.tmpMatrix2.translate(-1, -1, 0), this.tmpMatrix2.scale(2, 2, 1), this.tmpMatrix2.translate(v.x, v.y, 0), this.tmpMatrix2.scale(E, b, 1), this.tmpMatrix2.translate(-this.tmpBoundsOnModel.x, -this.tmpBoundsOnModel.y, 0), this.tmpMatrixForMask.setMatrix(this.tmpMatrix2.m), this.tmpMatrix2.identity(), this.tmpMatrix2.translate(v.x, v.y, 0), this.tmpMatrix2.scale(E, b, 1), this.tmpMatrix2.translate(-this.tmpBoundsOnModel.x, -this.tmpBoundsOnModel.y, 0), this.tmpMatrixForDraw.setMatrix(this.tmpMatrix2.m);
        for (var A = this.tmpMatrixForMask.getArray(), C = 0; C < 16; C++)
          p.matrixForMask[C] = A[C];
        for (var O = this.tmpMatrixForDraw.getArray(), C = 0; C < 16; C++)
          p.matrixForDraw[C] = O[C];
        for (var P = p.clippingMaskDrawIndexList.length, k = 0; k < P; k++) {
          var N = p.clippingMaskDrawIndexList[k], G = n.getDrawData(N), U = n._$C2(N);
          a.setClipBufPre_clipContextForMask(p), G.draw(a, n, U);
        }
      }
      a.gl.bindFramebuffer(a.gl.FRAMEBUFFER, f), a.setClipBufPre_clipContextForMask(null), a.gl.viewport(y[0], y[1], y[2], y[3]);
    }
  }, t.prototype.getColorBuffer = function() {
    return this.colorBuffer;
  }, t.prototype.findSameClip = function(n) {
    for (var a = 0; a < this.clipContextList.length; a++) {
      var u = this.clipContextList[a], d = u.clipIDList.length;
      if (d == n.length) {
        for (var p = 0, f = 0; f < d; f++)
          for (var y = u.clipIDList[f], $ = 0; $ < d; $++)
            if (n[$] == y) {
              p++;
              break;
            }
        if (p == d)
          return u;
      }
    }
    return null;
  }, t.prototype.calcClippedDrawTotalBounds = function(n, a) {
    for (var u = n._$Ri.getModelImpl().getCanvasWidth(), d = n._$Ri.getModelImpl().getCanvasHeight(), p = u > d ? u : d, f = p, y = p, $ = 0, v = 0, x = a.clippedDrawContextList.length, E = 0; E < x; E++) {
      var b = a.clippedDrawContextList[E], A = b.drawDataIndex, C = n._$C2(A);
      if (C._$yo()) {
        for (var O = C.getTransformedPoints(), P = O.length, k = [], N = [], G = 0, U = V._$i2; U < P; U += V._$No)
          k[G] = O[U], N[G] = O[U + 1], G++;
        var it = Math.min.apply(null, k), W = Math.min.apply(null, N), z = Math.max.apply(null, k), X = Math.max.apply(null, N);
        it < f && (f = it), W < y && (y = W), z > $ && ($ = z), X > v && (v = X);
      }
    }
    if (f == p)
      a.allClippedDrawRect.x = 0, a.allClippedDrawRect.y = 0, a.allClippedDrawRect.width = 0, a.allClippedDrawRect.height = 0, a.isUsing = !1;
    else {
      var Y = $ - f, Lt = v - y;
      a.allClippedDrawRect.x = f, a.allClippedDrawRect.y = y, a.allClippedDrawRect.width = Y, a.allClippedDrawRect.height = Lt, a.isUsing = !0;
    }
  }, t.prototype.setupLayoutBounds = function(n) {
    var a = n / t.CHANNEL_COUNT, u = n % t.CHANNEL_COUNT;
    a = ~~a, u = ~~u;
    for (var d = 0, p = 0; p < t.CHANNEL_COUNT; p++) {
      var f = a + (p < u ? 1 : 0);
      if (f != 0) if (f == 1) {
        var y = this.clipContextList[d++];
        y.layoutChannelNo = p, y.layoutBounds.x = 0, y.layoutBounds.y = 0, y.layoutBounds.width = 1, y.layoutBounds.height = 1;
      } else if (f == 2)
        for (var $ = 0; $ < f; $++) {
          var v = $ % 2, x = 0;
          v = ~~v;
          var y = this.clipContextList[d++];
          y.layoutChannelNo = p, y.layoutBounds.x = v * 0.5, y.layoutBounds.y = 0, y.layoutBounds.width = 0.5, y.layoutBounds.height = 1;
        }
      else if (f <= 4)
        for (var $ = 0; $ < f; $++) {
          var v = $ % 2, x = $ / 2;
          v = ~~v, x = ~~x;
          var y = this.clipContextList[d++];
          y.layoutChannelNo = p, y.layoutBounds.x = v * 0.5, y.layoutBounds.y = x * 0.5, y.layoutBounds.width = 0.5, y.layoutBounds.height = 0.5;
        }
      else if (f <= 9)
        for (var $ = 0; $ < f; $++) {
          var v = $ % 3, x = $ / 3;
          v = ~~v, x = ~~x;
          var y = this.clipContextList[d++];
          y.layoutChannelNo = p, y.layoutBounds.x = v / 3, y.layoutBounds.y = x / 3, y.layoutBounds.width = 1 / 3, y.layoutBounds.height = 1 / 3;
        }
      else
        h._$li("_$6 _$0P mask count : %d", f);
    }
  };
  function e(n, a, u) {
    this.clipIDList = new Array(), this.clipIDList = u, this.clippingMaskDrawIndexList = new Array();
    for (var d = 0; d < u.length; d++)
      this.clippingMaskDrawIndexList.push(a.getDrawDataIndex(u[d]));
    this.clippedDrawContextList = new Array(), this.isUsing = !0, this.layoutChannelNo = 0, this.layoutBounds = new at(), this.allClippedDrawRect = new at(), this.matrixForMask = new Float32Array(16), this.matrixForDraw = new Float32Array(16), this.owner = n;
  }
  e.prototype.addClippedDrawData = function(n, a) {
    var u = new i(n, a);
    this.clippedDrawContextList.push(u);
  };
  function i(n, a) {
    this._$gP = n, this.drawDataIndex = a;
  }
  function s() {
    wt || (this.color = null);
  }
  function o() {
    wt || (this._$dP = null, this._$eo = null, this._$V0 = null, this._$dP = 1e3, this._$eo = 1e3, this._$V0 = 1, this._$a0());
  }
  o._$JT = function(n, a, u) {
    var d = n / a, p = u / a, f = p, y = 1 / 3, $ = 2 / 3, v = 1 - (1 - p) * (1 - p), x = 1 - (1 - f) * (1 - f), E = 0, b = (1 - p) * y * v + (f * $ + (1 - f) * y) * (1 - v), A = (f + (1 - f) * $) * x + (p * y + (1 - p) * $) * (1 - x), C = 1, O = C - 3 * A + 3 * b - E, P = 3 * A - 6 * b + 3 * E, k = 3 * b - 3 * E, N = E;
    if (d <= 0)
      return 0;
    if (d >= 1)
      return 1;
    var G = d, U = G * G, it = G * U, W = O * it + P * U + k * G + N;
    return W;
  }, o.prototype._$a0 = function() {
  }, o.prototype.setFadeIn = function(n) {
    this._$dP = n;
  }, o.prototype.setFadeOut = function(n) {
    this._$eo = n;
  }, o.prototype._$pT = function(n) {
    this._$V0 = n;
  }, o.prototype.getFadeOut = function() {
    return this._$eo;
  }, o.prototype._$4T = function() {
    return this._$eo;
  }, o.prototype._$mT = function() {
    return this._$V0;
  }, o.prototype.getDurationMSec = function() {
    return -1;
  }, o.prototype.getLoopDurationMSec = function() {
    return -1;
  }, o.prototype.updateParam = function(n, a) {
    if (!(!a._$AT || a._$9L)) {
      var u = mt.getUserTimeMSec();
      if (a._$z2 < 0) {
        a._$z2 = u, a._$bs = u;
        var d = this.getDurationMSec();
        a._$Do < 0 && (a._$Do = d <= 0 ? -1 : a._$z2 + d);
      }
      var p = this._$V0, f = this._$dP == 0 ? 1 : cn._$r2((u - a._$bs) / this._$dP), y = this._$eo == 0 || a._$Do < 0 ? 1 : cn._$r2((a._$Do - u) / this._$eo);
      p = p * f * y, 0 <= p && p <= 1 || console.log("### assert!! ### "), this.updateParamExe(n, u, p, a), a._$Do > 0 && a._$Do < u && (a._$9L = !0);
    }
  }, o.prototype.updateParamExe = function(n, a, u, d) {
  };
  function h() {
  }
  h._$8s = 0, h._$fT = new Object(), h.start = function(n) {
    var a = h._$fT[n];
    a == null && (a = new l(), a._$r = n, h._$fT[n] = a), a._$0S = mt.getSystemTimeMSec();
  }, h.dump = function(n) {
    var a = h._$fT[n];
    if (a != null) {
      var u = mt.getSystemTimeMSec(), d = u - a._$0S;
      return console.log(n + " : " + d + "ms"), d;
    } else
      return -1;
  }, h.end = function(n) {
    var a = h._$fT[n];
    if (a != null) {
      var u = mt.getSystemTimeMSec();
      return u - a._$0S;
    } else
      return -1;
  }, h._$li = function(n, a) {
    console.log("_$li : " + n + `
`, a);
  }, h._$Ji = function(n, a) {
    console.log(n, a);
  }, h._$dL = function(n, a) {
    console.log(n, a), console.log(`
`);
  }, h._$KL = function(n, a) {
    for (var u = 0; u < a; u++)
      u % 16 == 0 && u > 0 ? console.log(`
`) : u % 8 == 0 && u > 0 && console.log("  "), console.log("%02X ", n[u] & 255);
    console.log(`
`);
  }, h._$nr = function(n, a, u) {
    console.log(`%s
`, n);
    for (var d = a.length, p = 0; p < d; ++p)
      console.log("%5d", a[p]), console.log(`%s
`, u), console.log(",");
    console.log(`
`);
  }, h._$Rb = function(n) {
    console.log("dump exception : " + n), console.log("stack :: " + n.stack);
  };
  function l() {
    this._$r = null, this._$0S = null;
  }
  function c() {
    wt || (this.x = null, this.y = null, this.width = null, this.height = null);
  }
  c.prototype._$8P = function() {
    return 0.5 * (this.x + this.x + this.width);
  }, c.prototype._$6P = function() {
    return 0.5 * (this.y + this.y + this.height);
  }, c.prototype._$EL = function() {
    return this.x + this.width;
  }, c.prototype._$5T = function() {
    return this.y + this.height;
  }, c.prototype._$jL = function(n, a, u, d) {
    this.x = n, this.y = a, this.width = u, this.height = d;
  }, c.prototype._$jL = function(n) {
    this.x = n.x, this.y = n.y, this.width = n.width, this.height = n.height;
  };
  function _(n) {
    wt || sr.prototype.constructor.call(this, n);
  }
  _.prototype = new sr(), _._$tP = new Object(), _._$27 = function() {
    _._$tP.clear();
  }, _.getID = function(n) {
    var a = _._$tP[n];
    return a == null && (a = new _(n), _._$tP[n] = a), a;
  }, _.prototype._$3s = function() {
    return new _();
  };
  function g() {
  }
  function T(n) {
    wt || sr.prototype.constructor.call(this, n);
  }
  T.prototype = new sr(), T._$tP = new Object(), T._$27 = function() {
    T._$tP.clear();
  }, T.getID = function(n) {
    var a = T._$tP[n];
    return a == null && (a = new T(n), T._$tP[n] = a), a;
  }, T.prototype._$3s = function() {
    return new T();
  };
  function w() {
    wt || (this._$vo = null, this._$F2 = null, this._$ao = 400, this._$1S = 400, w._$42++);
  }
  w._$42 = 0, w.prototype._$zP = function() {
    this._$vo == null && (this._$vo = new ti()), this._$F2 == null && (this._$F2 = new Array());
  }, w.prototype.getCanvasWidth = function() {
    return this._$ao;
  }, w.prototype.getCanvasHeight = function() {
    return this._$1S;
  }, w.prototype._$F0 = function(n) {
    this._$vo = n._$nP(), this._$F2 = n._$nP(), this._$ao = n._$6L(), this._$1S = n._$6L();
  }, w.prototype._$6S = function(n) {
    this._$F2.push(n);
  }, w.prototype._$Xr = function() {
    return this._$F2;
  }, w.prototype._$E2 = function() {
    return this._$vo;
  };
  function S() {
    wt || (this.p1 = new R(), this.p2 = new R(), this._$Fo = 0, this._$Db = 0, this._$L2 = 0, this._$M2 = 0, this._$ks = 0, this._$9b = 0, this._$iP = 0, this._$iT = 0, this._$lL = new Array(), this._$qP = new Array(), this.setup(0.3, 0.5, 0.1));
  }
  S.prototype.setup = function(n, a, u) {
    this._$ks = this._$Yb(), this.p2._$xT(), arguments.length == 3 && (this._$Fo = n, this._$L2 = a, this.p1._$p = u, this.p2._$p = u, this.p2.y = n, this.setup());
  }, S.prototype.getPhysicsPoint1 = function() {
    return this.p1;
  }, S.prototype.getPhysicsPoint2 = function() {
    return this.p2;
  }, S.prototype._$qr = function() {
    return this._$Db;
  }, S.prototype._$pr = function(n) {
    this._$Db = n;
  }, S.prototype._$5r = function() {
    return this._$M2;
  }, S.prototype._$Cs = function() {
    return this._$9b;
  }, S.prototype._$Yb = function() {
    return -180 * Math.atan2(this.p1.x - this.p2.x, -(this.p1.y - this.p2.y)) / Math.PI;
  }, S.prototype.addSrcParam = function(n, a, u, d) {
    var p = new L(n, a, u, d);
    this._$lL.push(p);
  }, S.prototype.addTargetParam = function(n, a, u, d) {
    var p = new q(n, a, u, d);
    this._$qP.push(p);
  }, S.prototype.update = function(n, a) {
    if (this._$iP == 0) {
      this._$iP = this._$iT = a, this._$Fo = Math.sqrt((this.p1.x - this.p2.x) * (this.p1.x - this.p2.x) + (this.p1.y - this.p2.y) * (this.p1.y - this.p2.y));
      return;
    }
    var u = (a - this._$iT) / 1e3;
    if (u != 0) {
      for (var d = this._$lL.length - 1; d >= 0; --d) {
        var p = this._$lL[d];
        p._$oP(n, this);
      }
      this._$oo(n, u), this._$M2 = this._$Yb(), this._$9b = (this._$M2 - this._$ks) / u, this._$ks = this._$M2;
    }
    for (var d = this._$qP.length - 1; d >= 0; --d) {
      var f = this._$qP[d];
      f._$YS(n, this);
    }
    this._$iT = a;
  }, S.prototype._$oo = function(n, a) {
    a < 0.033 && (a = 0.033);
    var u = 1 / a;
    this.p1.vx = (this.p1.x - this.p1._$s0) * u, this.p1.vy = (this.p1.y - this.p1._$70) * u, this.p1.ax = (this.p1.vx - this.p1._$7L) * u, this.p1.ay = (this.p1.vy - this.p1._$HL) * u, this.p1.fx = this.p1.ax * this.p1._$p, this.p1.fy = this.p1.ay * this.p1._$p, this.p1._$xT();
    var d = -Math.atan2(this.p1.y - this.p2.y, this.p1.x - this.p2.x), p, f, y = Math.cos(d), $ = Math.sin(d), v = 9.8 * this.p2._$p, x = this._$Db * ce._$bS, E = v * Math.cos(d - x);
    p = E * $, f = E * y;
    var b = -this.p1.fx * $ * $, A = -this.p1.fy * $ * y, C = -this.p2.vx * this._$L2, O = -this.p2.vy * this._$L2;
    this.p2.fx = p + b + C, this.p2.fy = f + A + O, this.p2.ax = this.p2.fx / this.p2._$p, this.p2.ay = this.p2.fy / this.p2._$p, this.p2.vx += this.p2.ax * a, this.p2.vy += this.p2.ay * a, this.p2.x += this.p2.vx * a, this.p2.y += this.p2.vy * a;
    var P = Math.sqrt((this.p1.x - this.p2.x) * (this.p1.x - this.p2.x) + (this.p1.y - this.p2.y) * (this.p1.y - this.p2.y));
    this.p2.x = this.p1.x + this._$Fo * (this.p2.x - this.p1.x) / P, this.p2.y = this.p1.y + this._$Fo * (this.p2.y - this.p1.y) / P, this.p2.vx = (this.p2.x - this.p2._$s0) * u, this.p2.vy = (this.p2.y - this.p2._$70) * u, this.p2._$xT();
  };
  function R() {
    this._$p = 1, this.x = 0, this.y = 0, this.vx = 0, this.vy = 0, this.ax = 0, this.ay = 0, this.fx = 0, this.fy = 0, this._$s0 = 0, this._$70 = 0, this._$7L = 0, this._$HL = 0;
  }
  R.prototype._$xT = function() {
    this._$s0 = this.x, this._$70 = this.y, this._$7L = this.vx, this._$HL = this.vy;
  };
  function D(n, a, u) {
    this._$wL = null, this.scale = null, this._$V0 = null, this._$wL = n, this.scale = a, this._$V0 = u;
  }
  D.prototype._$oP = function(n, a) {
  };
  function L(n, a, u, d) {
    D.prototype.constructor.call(this, a, u, d), this._$tL = null, this._$tL = n;
  }
  L.prototype = new D(), L.prototype._$oP = function(n, a) {
    var u = this.scale * n.getParamFloat(this._$wL), d = a.getPhysicsPoint1();
    switch (this._$tL) {
      default:
      case S.Src.SRC_TO_X:
        d.x = d.x + (u - d.x) * this._$V0;
        break;
      case S.Src.SRC_TO_Y:
        d.y = d.y + (u - d.y) * this._$V0;
        break;
      case S.Src.SRC_TO_G_ANGLE:
        var p = a._$qr();
        p = p + (u - p) * this._$V0, a._$pr(p);
        break;
    }
  };
  function K(n, a, u) {
    this._$wL = null, this.scale = null, this._$V0 = null, this._$wL = n, this.scale = a, this._$V0 = u;
  }
  K.prototype._$YS = function(n, a) {
  };
  function q(n, a, u, d) {
    K.prototype.constructor.call(this, a, u, d), this._$YP = null, this._$YP = n;
  }
  q.prototype = new K(), q.prototype._$YS = function(n, a) {
    switch (this._$YP) {
      default:
      case S.Target.TARGET_FROM_ANGLE:
        n.setParamFloat(this._$wL, this.scale * a._$5r(), this._$V0);
        break;
      case S.Target.TARGET_FROM_ANGLE_V:
        n.setParamFloat(this._$wL, this.scale * a._$Cs(), this._$V0);
        break;
    }
  }, S.Src = function() {
  }, S.Src.SRC_TO_X = "SRC_TO_X", S.Src.SRC_TO_Y = "SRC_TO_Y", S.Src.SRC_TO_G_ANGLE = "SRC_TO_G_ANGLE", S.Target = function() {
  }, S.Target.TARGET_FROM_ANGLE = "TARGET_FROM_ANGLE", S.Target.TARGET_FROM_ANGLE_V = "TARGET_FROM_ANGLE_V";
  function M() {
    wt || (this._$fL = 0, this._$gL = 0, this._$B0 = 1, this._$z0 = 1, this._$qT = 0, this.reflectX = !1, this.reflectY = !1);
  }
  M.prototype.init = function(n) {
    this._$fL = n._$fL, this._$gL = n._$gL, this._$B0 = n._$B0, this._$z0 = n._$z0, this._$qT = n._$qT, this.reflectX = n.reflectX, this.reflectY = n.reflectY;
  }, M.prototype._$F0 = function(n) {
    this._$fL = n._$_T(), this._$gL = n._$_T(), this._$B0 = n._$_T(), this._$z0 = n._$_T(), this._$qT = n._$_T(), n.getFormatVersion() >= J.LIVE2D_FORMAT_VERSION_V2_10_SDK2 && (this.reflectX = n._$po(), this.reflectY = n._$po());
  }, M.prototype._$e = function() {
  };
  var Q = function() {
  };
  Q._$ni = function(n, a, u, d, p, f, y, $, v) {
    var x = y * f - $ * p;
    if (x == 0)
      return null;
    var E = ((n - u) * f - (a - d) * p) / x, b;
    return p != 0 ? b = (n - u - E * y) / p : b = (a - d - E * $) / f, isNaN(b) && (b = (n - u - E * y) / p, isNaN(b) && (b = (a - d - E * $) / f), isNaN(b) && (console.log("a is NaN @UtVector#_$ni() "), console.log("v1x : " + p), console.log("v1x != 0 ? " + (p != 0)))), v == null ? new Array(b, E) : (v[0] = b, v[1] = E, v);
  };
  function at() {
    wt || (this.x = null, this.y = null, this.width = null, this.height = null);
  }
  at.prototype._$8P = function() {
    return this.x + 0.5 * this.width;
  }, at.prototype._$6P = function() {
    return this.y + 0.5 * this.height;
  }, at.prototype._$EL = function() {
    return this.x + this.width;
  }, at.prototype._$5T = function() {
    return this.y + this.height;
  }, at.prototype._$jL = function(n, a, u, d) {
    this.x = n, this.y = a, this.width = u, this.height = d;
  }, at.prototype._$jL = function(n) {
    this.x = n.x, this.y = n.y, this.width = n.width, this.height = n.height;
  }, at.prototype.contains = function(n, a) {
    return this.x <= this.x && this.y <= this.y && this.x <= this.x + this.width && this.y <= this.y + this.height;
  }, at.prototype.expand = function(n, a) {
    this.x -= n, this.y -= a, this.width += n * 2, this.height += a * 2;
  };
  function At() {
  }
  At._$Z2 = function(n, a, u, d) {
    var p = a._$Q2(n, u), f = n._$vs(), y = n._$Tr();
    if (a._$zr(f, y, p), p <= 0)
      return d[f[0]];
    if (p == 1) {
      var $ = d[f[0]], v = d[f[1]], x = y[0];
      return $ + (v - $) * x | 0;
    } else if (p == 2) {
      var $ = d[f[0]], v = d[f[1]], E = d[f[2]], b = d[f[3]], x = y[0], A = y[1], C = $ + (v - $) * x | 0, O = E + (b - E) * x | 0;
      return C + (O - C) * A | 0;
    } else if (p == 3) {
      var P = d[f[0]], k = d[f[1]], N = d[f[2]], G = d[f[3]], U = d[f[4]], it = d[f[5]], W = d[f[6]], z = d[f[7]], x = y[0], A = y[1], X = y[2], $ = P + (k - P) * x | 0, v = N + (G - N) * x | 0, E = U + (it - U) * x | 0, b = W + (z - W) * x | 0, C = $ + (v - $) * A | 0, O = E + (b - E) * A | 0;
      return C + (O - C) * X | 0;
    } else if (p == 4) {
      var Y = d[f[0]], Lt = d[f[1]], Ht = d[f[2]], Ut = d[f[3]], se = d[f[4]], ut = d[f[5]], ot = d[f[6]], ct = d[f[7]], vt = d[f[8]], _t = d[f[9]], gt = d[f[10]], tt = d[f[11]], nt = d[f[12]], et = d[f[13]], st = d[f[14]], Et = d[f[15]], x = y[0], A = y[1], X = y[2], fe = y[3], P = Y + (Lt - Y) * x | 0, k = Ht + (Ut - Ht) * x | 0, N = se + (ut - se) * x | 0, G = ot + (ct - ot) * x | 0, U = vt + (_t - vt) * x | 0, it = gt + (tt - gt) * x | 0, W = nt + (et - nt) * x | 0, z = st + (Et - st) * x | 0, $ = P + (k - P) * A | 0, v = N + (G - N) * A | 0, E = U + (it - U) * A | 0, b = W + (z - W) * A | 0, C = $ + (v - $) * X | 0, O = E + (b - E) * X | 0;
      return C + (O - C) * fe | 0;
    } else {
      for (var Ot = 1 << p, $t = new Float32Array(Ot), Zt = 0; Zt < Ot; Zt++) {
        for (var Mt = Zt, we = 1, qt = 0; qt < p; qt++)
          we *= Mt % 2 == 0 ? 1 - y[qt] : y[qt], Mt /= 2;
        $t[Zt] = we;
      }
      for (var Ee = new Float32Array(Ot), ue = 0; ue < Ot; ue++)
        Ee[ue] = d[f[ue]];
      for (var Ge = 0, ue = 0; ue < Ot; ue++)
        Ge += $t[ue] * Ee[ue];
      return Ge + 0.5 | 0;
    }
  }, At._$br = function(n, a, u, d) {
    var p = a._$Q2(n, u), f = n._$vs(), y = n._$Tr();
    if (a._$zr(f, y, p), p <= 0)
      return d[f[0]];
    if (p == 1) {
      var $ = d[f[0]], v = d[f[1]], x = y[0];
      return $ + (v - $) * x;
    } else if (p == 2) {
      var $ = d[f[0]], v = d[f[1]], E = d[f[2]], b = d[f[3]], x = y[0], A = y[1];
      return (1 - A) * ($ + (v - $) * x) + A * (E + (b - E) * x);
    } else if (p == 3) {
      var C = d[f[0]], O = d[f[1]], P = d[f[2]], k = d[f[3]], N = d[f[4]], G = d[f[5]], U = d[f[6]], it = d[f[7]], x = y[0], A = y[1], W = y[2];
      return (1 - W) * ((1 - A) * (C + (O - C) * x) + A * (P + (k - P) * x)) + W * ((1 - A) * (N + (G - N) * x) + A * (U + (it - U) * x));
    } else if (p == 4) {
      var z = d[f[0]], X = d[f[1]], Y = d[f[2]], Lt = d[f[3]], Ht = d[f[4]], Ut = d[f[5]], se = d[f[6]], ut = d[f[7]], ot = d[f[8]], ct = d[f[9]], vt = d[f[10]], _t = d[f[11]], gt = d[f[12]], tt = d[f[13]], nt = d[f[14]], et = d[f[15]], x = y[0], A = y[1], W = y[2], st = y[3];
      return (1 - st) * ((1 - W) * ((1 - A) * (z + (X - z) * x) + A * (Y + (Lt - Y) * x)) + W * ((1 - A) * (Ht + (Ut - Ht) * x) + A * (se + (ut - se) * x))) + st * ((1 - W) * ((1 - A) * (ot + (ct - ot) * x) + A * (vt + (_t - vt) * x)) + W * ((1 - A) * (gt + (tt - gt) * x) + A * (nt + (et - nt) * x)));
    } else {
      for (var Et = 1 << p, fe = new Float32Array(Et), Ot = 0; Ot < Et; Ot++) {
        for (var $t = Ot, Zt = 1, Mt = 0; Mt < p; Mt++)
          Zt *= $t % 2 == 0 ? 1 - y[Mt] : y[Mt], $t /= 2;
        fe[Ot] = Zt;
      }
      for (var we = new Float32Array(Et), qt = 0; qt < Et; qt++)
        we[qt] = d[f[qt]];
      for (var Ee = 0, qt = 0; qt < Et; qt++)
        Ee += fe[qt] * we[qt];
      return Ee;
    }
  }, At._$Vr = function(n, a, u, d, p, f, y, $) {
    var v = a._$Q2(n, u), x = n._$vs(), E = n._$Tr();
    a._$zr(x, E, v);
    var b = d * 2, A = y;
    if (v <= 0) {
      var C = x[0], O = p[C];
      if ($ == 2 && y == 0)
        mt._$jT(O, 0, f, 0, b);
      else
        for (var P = 0; P < b; )
          f[A] = O[P++], f[A + 1] = O[P++], A += $;
    } else if (v == 1)
      for (var O = p[x[0]], k = p[x[1]], N = E[0], G = 1 - N, P = 0; P < b; )
        f[A] = O[P] * G + k[P] * N, ++P, f[A + 1] = O[P] * G + k[P] * N, ++P, A += $;
    else if (v == 2)
      for (var O = p[x[0]], k = p[x[1]], U = p[x[2]], it = p[x[3]], N = E[0], W = E[1], G = 1 - N, z = 1 - W, X = z * G, Y = z * N, Lt = W * G, Ht = W * N, P = 0; P < b; )
        f[A] = X * O[P] + Y * k[P] + Lt * U[P] + Ht * it[P], ++P, f[A + 1] = X * O[P] + Y * k[P] + Lt * U[P] + Ht * it[P], ++P, A += $;
    else if (v == 3)
      for (var Ut = p[x[0]], se = p[x[1]], ut = p[x[2]], ot = p[x[3]], ct = p[x[4]], vt = p[x[5]], _t = p[x[6]], gt = p[x[7]], N = E[0], W = E[1], tt = E[2], G = 1 - N, z = 1 - W, nt = 1 - tt, et = nt * z * G, st = nt * z * N, Et = nt * W * G, fe = nt * W * N, Ot = tt * z * G, $t = tt * z * N, Zt = tt * W * G, Mt = tt * W * N, P = 0; P < b; )
        f[A] = et * Ut[P] + st * se[P] + Et * ut[P] + fe * ot[P] + Ot * ct[P] + $t * vt[P] + Zt * _t[P] + Mt * gt[P], ++P, f[A + 1] = et * Ut[P] + st * se[P] + Et * ut[P] + fe * ot[P] + Ot * ct[P] + $t * vt[P] + Zt * _t[P] + Mt * gt[P], ++P, A += $;
    else if (v == 4)
      for (var we = p[x[0]], qt = p[x[1]], Ee = p[x[2]], ue = p[x[3]], Ge = p[x[4]], nr = p[x[5]], ze = p[x[6]], Xe = p[x[7]], de = p[x[8]], Ir = p[x[9]], Lr = p[x[10]], Ze = p[x[11]], wr = p[x[12]], or = p[x[13]], kt = p[x[14]], jo = p[x[15]], N = E[0], W = E[1], tt = E[2], _r = E[3], G = 1 - N, z = 1 - W, nt = 1 - tt, Er = 1 - _r, qo = Er * nt * z * G, Ho = Er * nt * z * N, Zo = Er * nt * W * G, Qo = Er * nt * W * N, Ko = Er * tt * z * G, Jo = Er * tt * z * N, ta = Er * tt * W * G, ea = Er * tt * W * N, ra = _r * nt * z * G, ia = _r * nt * z * N, sa = _r * nt * W * G, na = _r * nt * W * N, oa = _r * tt * z * G, aa = _r * tt * z * N, ha = _r * tt * W * G, la = _r * tt * W * N, P = 0; P < b; )
        f[A] = qo * we[P] + Ho * qt[P] + Zo * Ee[P] + Qo * ue[P] + Ko * Ge[P] + Jo * nr[P] + ta * ze[P] + ea * Xe[P] + ra * de[P] + ia * Ir[P] + sa * Lr[P] + na * Ze[P] + oa * wr[P] + aa * or[P] + ha * kt[P] + la * jo[P], ++P, f[A + 1] = qo * we[P] + Ho * qt[P] + Zo * Ee[P] + Qo * ue[P] + Ko * Ge[P] + Jo * nr[P] + ta * ze[P] + ea * Xe[P] + ra * de[P] + ia * Ir[P] + sa * Lr[P] + na * Ze[P] + oa * wr[P] + aa * or[P] + ha * kt[P] + la * jo[P], ++P, A += $;
    else {
      for (var Fi = 1 << v, _n = new Float32Array(Fi), as = 0; as < Fi; as++) {
        for (var ua = as, ca = 1, hs = 0; hs < v; hs++)
          ca *= ua % 2 == 0 ? 1 - E[hs] : E[hs], ua /= 2;
        _n[as] = ca;
      }
      for (var pn = new Float32Array(Fi), Qe = 0; Qe < Fi; Qe++)
        pn[Qe] = p[x[Qe]];
      for (var P = 0; P < b; ) {
        for (var fa = 0, da = 0, $u = P + 1, Qe = 0; Qe < Fi; Qe++)
          fa += _n[Qe] * pn[Qe][P], da += _n[Qe] * pn[Qe][$u];
        P += 2, f[A] = fa, f[A + 1] = da, A += $;
      }
    }
  };
  function Jt() {
    wt || (this.x = null, this.y = null);
  }
  Jt.prototype._$HT = function(n, a) {
    this.x = n, this.y = a;
  }, Jt.prototype._$HT = function(n) {
    this.x = n.x, this.y = n.y;
  };
  function j() {
    wt || (this._$gP = null, this._$dr = null, this._$GS = null, this._$qb = null, this._$Lb = null, this._$mS = null, this.clipID = null, this.clipIDList = new Array());
  }
  j._$ur = -2, j._$ES = 500, j._$wb = 2, j._$8S = 3, j._$52 = j._$ES, j._$R2 = j._$ES, j._$or = function() {
    return j._$52;
  }, j._$Pr = function() {
    return j._$R2;
  }, j.prototype.convertClipIDForV2_11 = function(n) {
    var a = [];
    return n == null || n.length == 0 ? null : /,/.test(n) ? (a = n.id.split(","), a) : (a.push(n.id), a);
  }, j.prototype._$F0 = function(n) {
    this._$gP = n._$nP(), this._$dr = n._$nP(), this._$GS = n._$nP(), this._$qb = n._$6L(), this._$Lb = n._$cS(), this._$mS = n._$Tb(), n.getFormatVersion() >= J._$T7 ? (this.clipID = n._$nP(), this.clipIDList = this.convertClipIDForV2_11(this.clipID)) : this.clipIDList = [], this._$MS(this._$Lb);
  }, j.prototype.getClipIDList = function() {
    return this.clipIDList;
  }, j.prototype.init = function(n) {
  }, j.prototype._$Nr = function(n, a) {
    if (a._$IS[0] = !1, a._$Us = At._$Z2(n, this._$GS, a._$IS, this._$Lb), !F._$Zs) {
      if (a._$IS[0])
        return;
    }
    a._$7s = At._$br(n, this._$GS, a._$IS, this._$mS);
  }, j.prototype._$2b = function(n, a) {
  }, j.prototype.getDrawDataID = function() {
    return this._$gP;
  }, j.prototype._$j2 = function(n) {
    this._$gP = n;
  }, j.prototype.getOpacity = function(n, a) {
    return a._$7s;
  }, j.prototype._$zS = function(n, a) {
    return a._$Us;
  }, j.prototype._$MS = function(n) {
    for (var a = n.length - 1; a >= 0; --a) {
      var u = n[a];
      u < j._$52 ? j._$52 = u : u > j._$R2 && (j._$R2 = u);
    }
  }, j.prototype.getTargetBaseDataID = function() {
    return this._$dr;
  }, j.prototype._$gs = function(n) {
    this._$dr = n;
  }, j.prototype._$32 = function() {
    return this._$dr != null && this._$dr != he._$2o();
  }, j.prototype.preDraw = function(n, a, u) {
  }, j.prototype.draw = function(n, a, u) {
  }, j.prototype.getType = function() {
  }, j.prototype._$B2 = function(n, a, u) {
  };
  function H() {
    wt || (this._$Eb = H._$ps, this._$lT = 1, this._$C0 = 1, this._$tT = 1, this._$WL = 1, this.culling = !1, this.matrix4x4 = new Float32Array(16), this.premultipliedAlpha = !1, this.anisotropy = 0, this.clippingProcess = H.CLIPPING_PROCESS_NONE, this.clipBufPre_clipContextMask = null, this.clipBufPre_clipContextDraw = null, this.CHANNEL_COLORS = new Array());
  }
  H._$ps = 32, H.CLIPPING_PROCESS_NONE = 0, H.CLIPPING_PROCESS_OVERWRITE_ALPHA = 1, H.CLIPPING_PROCESS_MULTIPLY_ALPHA = 2, H.CLIPPING_PROCESS_DRAW = 3, H.CLIPPING_PROCESS_CLEAR_ALPHA = 4, H.prototype.setChannelFlagAsColor = function(n, a) {
    this.CHANNEL_COLORS[n] = a;
  }, H.prototype.getChannelFlagAsColor = function(n) {
    return this.CHANNEL_COLORS[n];
  }, H.prototype._$ZT = function() {
  }, H.prototype._$Uo = function(n, a, u, d, p, f, y) {
  }, H.prototype._$Rs = function() {
    return -1;
  }, H.prototype._$Ds = function(n) {
  }, H.prototype.setBaseColor = function(n, a, u, d) {
    n < 0 ? n = 0 : n > 1 && (n = 1), a < 0 ? a = 0 : a > 1 && (a = 1), u < 0 ? u = 0 : u > 1 && (u = 1), d < 0 ? d = 0 : d > 1 && (d = 1), this._$lT = n, this._$C0 = a, this._$tT = u, this._$WL = d;
  }, H.prototype._$WP = function(n) {
    this.culling = n;
  }, H.prototype.setMatrix = function(n) {
    for (var a = 0; a < 16; a++)
      this.matrix4x4[a] = n[a];
  }, H.prototype._$IT = function() {
    return this.matrix4x4;
  }, H.prototype.setPremultipliedAlpha = function(n) {
    this.premultipliedAlpha = n;
  }, H.prototype.isPremultipliedAlpha = function() {
    return this.premultipliedAlpha;
  }, H.prototype.setAnisotropy = function(n) {
    this.anisotropy = n;
  }, H.prototype.getAnisotropy = function() {
    return this.anisotropy;
  }, H.prototype.getClippingProcess = function() {
    return this.clippingProcess;
  }, H.prototype.setClippingProcess = function(n) {
    this.clippingProcess = n;
  }, H.prototype.setClipBufPre_clipContextForMask = function(n) {
    this.clipBufPre_clipContextMask = n;
  }, H.prototype.getClipBufPre_clipContextMask = function() {
    return this.clipBufPre_clipContextMask;
  }, H.prototype.setClipBufPre_clipContextForDraw = function(n) {
    this.clipBufPre_clipContextDraw = n;
  }, H.prototype.getClipBufPre_clipContextDraw = function() {
    return this.clipBufPre_clipContextDraw;
  };
  function Tt() {
    wt || (this.a = 1, this.r = 1, this.g = 1, this.b = 1, this.scale = 1, this._$ho = 1, this.blendMode = F.L2D_COLOR_BLEND_MODE_MULT);
  }
  function pt() {
    wt || (this._$kP = null, this._$dr = null, this._$Ai = !0, this._$mS = null);
  }
  pt._$ur = -2, pt._$c2 = 1, pt._$_b = 2, pt.prototype._$F0 = function(n) {
    this._$kP = n._$nP(), this._$dr = n._$nP();
  }, pt.prototype.readV2_opacity = function(n) {
    n.getFormatVersion() >= J.LIVE2D_FORMAT_VERSION_V2_10_SDK2 && (this._$mS = n._$Tb());
  }, pt.prototype.init = function(n) {
  }, pt.prototype._$Nr = function(n, a) {
  }, pt.prototype.interpolateOpacity = function(n, a, u, d) {
    this._$mS == null ? u.setInterpolatedOpacity(1) : u.setInterpolatedOpacity(At._$br(n, a, d, this._$mS));
  }, pt.prototype._$2b = function(n, a) {
  }, pt.prototype._$nb = function(n, a, u, d, p, f, y) {
  }, pt.prototype.getType = function() {
  }, pt.prototype._$gs = function(n) {
    this._$dr = n;
  }, pt.prototype._$a2 = function(n) {
    this._$kP = n;
  }, pt.prototype.getTargetBaseDataID = function() {
    return this._$dr;
  }, pt.prototype.getBaseDataID = function() {
    return this._$kP;
  }, pt.prototype._$32 = function() {
    return this._$dr != null && this._$dr != he._$2o();
  };
  function mt() {
  }
  mt._$W2 = 0, mt._$CS = mt._$W2, mt._$Mo = function() {
    return !0;
  }, mt._$XP = function(n) {
    try {
      for (var a = getTimeMSec(); getTimeMSec() - a < n; )
        ;
    } catch (u) {
      u._$Rb();
    }
  }, mt.getUserTimeMSec = function() {
    return mt._$CS == mt._$W2 ? mt.getSystemTimeMSec() : mt._$CS;
  }, mt.setUserTimeMSec = function(n) {
    mt._$CS = n;
  }, mt.updateUserTimeMSec = function() {
    return mt._$CS = mt.getSystemTimeMSec();
  }, mt.getTimeMSec = function() {
    return (/* @__PURE__ */ new Date()).getTime();
  }, mt.getSystemTimeMSec = function() {
    return (/* @__PURE__ */ new Date()).getTime();
  }, mt._$Q = function(n) {
  }, mt._$jT = function(n, a, u, d, p) {
    for (var f = 0; f < p; f++)
      u[d + f] = n[a + f];
  };
  function St() {
    wt || (this._$VP = 0, this._$wL = null, this._$GP = null, this._$8o = St._$ds, this._$2r = -1, this._$O2 = 0, this._$ri = 0);
  }
  St._$ds = -2, St.prototype._$F0 = function(n) {
    this._$wL = n._$nP(), this._$VP = n._$6L(), this._$GP = n._$nP();
  }, St.prototype.getParamIndex = function(n) {
    return this._$2r != n && (this._$8o = St._$ds), this._$8o;
  }, St.prototype._$Pb = function(n, a) {
    this._$8o = n, this._$2r = a;
  }, St.prototype.getParamID = function() {
    return this._$wL;
  }, St.prototype._$yP = function(n) {
    this._$wL = n;
  }, St.prototype._$N2 = function() {
    return this._$VP;
  }, St.prototype._$d2 = function() {
    return this._$GP;
  }, St.prototype._$t2 = function(n, a) {
    this._$VP = n, this._$GP = a;
  }, St.prototype._$Lr = function() {
    return this._$O2;
  }, St.prototype._$wr = function(n) {
    this._$O2 = n;
  }, St.prototype._$SL = function() {
    return this._$ri;
  }, St.prototype._$AL = function(n) {
    this._$ri = n;
  };
  function yt() {
  }
  yt.startsWith = function(n, a, u) {
    var d = a + u.length;
    if (d >= n.length)
      return !1;
    for (var p = a; p < d; p++)
      if (yt.getChar(n, p) != u.charAt(p - a))
        return !1;
    return !0;
  }, yt.getChar = function(n, a) {
    return String.fromCharCode(n.getUint8(a));
  }, yt.createString = function(n, a, u) {
    for (var d = new ArrayBuffer(u * 2), p = new Uint16Array(d), f = 0; f < u; f++)
      p[f] = n.getUint8(a + f);
    return String.fromCharCode.apply(null, p);
  }, yt._$LS = function(n, a, u, d) {
    n instanceof ArrayBuffer && (n = new DataView(n));
    var p = u, f = !1, y = !1, $ = 0, v = yt.getChar(n, p);
    v == "-" && (f = !0, p++);
    for (var x = !1; p < a; p++) {
      switch (v = yt.getChar(n, p), v) {
        case "0":
          $ = $ * 10;
          break;
        case "1":
          $ = $ * 10 + 1;
          break;
        case "2":
          $ = $ * 10 + 2;
          break;
        case "3":
          $ = $ * 10 + 3;
          break;
        case "4":
          $ = $ * 10 + 4;
          break;
        case "5":
          $ = $ * 10 + 5;
          break;
        case "6":
          $ = $ * 10 + 6;
          break;
        case "7":
          $ = $ * 10 + 7;
          break;
        case "8":
          $ = $ * 10 + 8;
          break;
        case "9":
          $ = $ * 10 + 9;
          break;
        case ".":
          y = !0, p++, x = !0;
          break;
        default:
          x = !0;
          break;
      }
      if (x)
        break;
    }
    if (y)
      for (var E = 0.1, b = !1; p < a; p++) {
        switch (v = yt.getChar(n, p), v) {
          case "0":
            break;
          case "1":
            $ += E * 1;
            break;
          case "2":
            $ += E * 2;
            break;
          case "3":
            $ += E * 3;
            break;
          case "4":
            $ += E * 4;
            break;
          case "5":
            $ += E * 5;
            break;
          case "6":
            $ += E * 6;
            break;
          case "7":
            $ += E * 7;
            break;
          case "8":
            $ += E * 8;
            break;
          case "9":
            $ += E * 9;
            break;
          default:
            b = !0;
            break;
        }
        if (E *= 0.1, b)
          break;
      }
    return f && ($ = -$), d[0] = p, $;
  };
  function Yt() {
    wt || (this._$Ob = null);
  }
  Yt.prototype._$zP = function() {
    this._$Ob = new Array();
  }, Yt.prototype._$F0 = function(n) {
    this._$Ob = n._$nP();
  }, Yt.prototype._$Ur = function(n) {
    if (n._$WS())
      return !0;
    for (var a = n._$v2(), u = this._$Ob.length - 1; u >= 0; --u) {
      var d = this._$Ob[u].getParamIndex(a);
      if (d == St._$ds && (d = n.getParamIndex(this._$Ob[u].getParamID())), n._$Xb(d))
        return !0;
    }
    return !1;
  }, Yt.prototype._$Q2 = function(n, a) {
    for (var u = this._$Ob.length, d = n._$v2(), p = 0, f, y, $ = 0; $ < u; $++) {
      var v = this._$Ob[$];
      if (f = v.getParamIndex(d), f == St._$ds && (f = n.getParamIndex(v.getParamID()), v._$Pb(f, d)), f < 0)
        throw new Exception("err 23242 : " + v.getParamID());
      var x = f < 0 ? 0 : n.getParamFloat(f);
      y = v._$N2();
      var E = v._$d2(), b = -1, A = 0, C, O;
      if (!(y < 1)) if (y == 1)
        C = E[0], C - V._$J < x && x < C + V._$J ? (b = 0, A = 0) : (b = 0, a[0] = !0);
      else if (C = E[0], x < C - V._$J)
        b = 0, a[0] = !0;
      else if (x < C + V._$J)
        b = 0;
      else {
        for (var P = !1, k = 1; k < y; ++k) {
          if (O = E[k], x < O + V._$J) {
            O - V._$J < x ? b = k : (b = k - 1, A = (x - C) / (O - C), p++), P = !0;
            break;
          }
          C = O;
        }
        P || (b = y - 1, A = 0, a[0] = !0);
      }
      v._$wr(b), v._$AL(A);
    }
    return p;
  }, Yt.prototype._$zr = function(n, a, u) {
    var d = 1 << u;
    d + 1 > V._$Qb && console.log(`err 23245
`);
    for (var p = this._$Ob.length, f = 1, y = 1, $ = 0, v = 0; v < d; ++v)
      n[v] = 0;
    for (var x = 0; x < p; ++x) {
      var E = this._$Ob[x];
      if (E._$SL() == 0) {
        var b = E._$Lr() * f;
        if (b < 0 && F._$3T)
          throw new Exception("err 23246");
        for (var v = 0; v < d; ++v)
          n[v] += b;
      } else {
        for (var b = f * E._$Lr(), A = f * (E._$Lr() + 1), v = 0; v < d; ++v)
          n[v] += (v / y | 0) % 2 == 0 ? b : A;
        a[$++] = E._$SL(), y *= 2;
      }
      f *= E._$N2();
    }
    n[d] = 65535, a[$] = -1;
  }, Yt.prototype._$h2 = function(n, a, u) {
    for (var d = new Float32Array(a), p = 0; p < a; ++p)
      d[p] = u[p];
    var f = new St();
    f._$yP(n), f._$t2(a, d), this._$Ob.push(f);
  }, Yt.prototype._$J2 = function(n) {
    for (var a = n, u = this._$Ob.length, d = 0; d < u; ++d) {
      var p = this._$Ob[d], f = p._$N2(), y = a % p._$N2(), $ = p._$d2()[y];
      console.log("%s[%d]=%7.2f / ", p.getParamID(), y, $), a /= f;
    }
    console.log(`
`);
  }, Yt.prototype.getParamCount = function() {
    return this._$Ob.length;
  }, Yt.prototype._$zs = function() {
    return this._$Ob;
  };
  function Vt() {
    this.m = new Float32Array(16), this.identity();
  }
  Vt.prototype.identity = function() {
    for (var n = 0; n < 16; n++)
      this.m[n] = n % 5 == 0 ? 1 : 0;
  }, Vt.prototype.getArray = function() {
    return this.m;
  }, Vt.prototype.getCopyMatrix = function() {
    return new Float32Array(this.m);
  }, Vt.prototype.setMatrix = function(n) {
    if (!(n == null || n.length != 16))
      for (var a = 0; a < 16; a++)
        this.m[a] = n[a];
  }, Vt.prototype.mult = function(n, a, u) {
    return a == null ? null : (this == a ? this.mult_safe(this.m, n.m, a.m, u) : this.mult_fast(this.m, n.m, a.m, u), a);
  }, Vt.prototype.mult_safe = function(n, a, u, d) {
    if (n == u) {
      var p = new Array(16);
      this.mult_fast(n, a, p, d);
      for (var f = 15; f >= 0; --f)
        u[f] = p[f];
    } else
      this.mult_fast(n, a, u, d);
  }, Vt.prototype.mult_fast = function(n, a, u, d) {
    d ? (u[0] = n[0] * a[0] + n[4] * a[1] + n[8] * a[2], u[4] = n[0] * a[4] + n[4] * a[5] + n[8] * a[6], u[8] = n[0] * a[8] + n[4] * a[9] + n[8] * a[10], u[12] = n[0] * a[12] + n[4] * a[13] + n[8] * a[14] + n[12], u[1] = n[1] * a[0] + n[5] * a[1] + n[9] * a[2], u[5] = n[1] * a[4] + n[5] * a[5] + n[9] * a[6], u[9] = n[1] * a[8] + n[5] * a[9] + n[9] * a[10], u[13] = n[1] * a[12] + n[5] * a[13] + n[9] * a[14] + n[13], u[2] = n[2] * a[0] + n[6] * a[1] + n[10] * a[2], u[6] = n[2] * a[4] + n[6] * a[5] + n[10] * a[6], u[10] = n[2] * a[8] + n[6] * a[9] + n[10] * a[10], u[14] = n[2] * a[12] + n[6] * a[13] + n[10] * a[14] + n[14], u[3] = u[7] = u[11] = 0, u[15] = 1) : (u[0] = n[0] * a[0] + n[4] * a[1] + n[8] * a[2] + n[12] * a[3], u[4] = n[0] * a[4] + n[4] * a[5] + n[8] * a[6] + n[12] * a[7], u[8] = n[0] * a[8] + n[4] * a[9] + n[8] * a[10] + n[12] * a[11], u[12] = n[0] * a[12] + n[4] * a[13] + n[8] * a[14] + n[12] * a[15], u[1] = n[1] * a[0] + n[5] * a[1] + n[9] * a[2] + n[13] * a[3], u[5] = n[1] * a[4] + n[5] * a[5] + n[9] * a[6] + n[13] * a[7], u[9] = n[1] * a[8] + n[5] * a[9] + n[9] * a[10] + n[13] * a[11], u[13] = n[1] * a[12] + n[5] * a[13] + n[9] * a[14] + n[13] * a[15], u[2] = n[2] * a[0] + n[6] * a[1] + n[10] * a[2] + n[14] * a[3], u[6] = n[2] * a[4] + n[6] * a[5] + n[10] * a[6] + n[14] * a[7], u[10] = n[2] * a[8] + n[6] * a[9] + n[10] * a[10] + n[14] * a[11], u[14] = n[2] * a[12] + n[6] * a[13] + n[10] * a[14] + n[14] * a[15], u[3] = n[3] * a[0] + n[7] * a[1] + n[11] * a[2] + n[15] * a[3], u[7] = n[3] * a[4] + n[7] * a[5] + n[11] * a[6] + n[15] * a[7], u[11] = n[3] * a[8] + n[7] * a[9] + n[11] * a[10] + n[15] * a[11], u[15] = n[3] * a[12] + n[7] * a[13] + n[11] * a[14] + n[15] * a[15]);
  }, Vt.prototype.translate = function(n, a, u) {
    this.m[12] = this.m[0] * n + this.m[4] * a + this.m[8] * u + this.m[12], this.m[13] = this.m[1] * n + this.m[5] * a + this.m[9] * u + this.m[13], this.m[14] = this.m[2] * n + this.m[6] * a + this.m[10] * u + this.m[14], this.m[15] = this.m[3] * n + this.m[7] * a + this.m[11] * u + this.m[15];
  }, Vt.prototype.scale = function(n, a, u) {
    this.m[0] *= n, this.m[4] *= a, this.m[8] *= u, this.m[1] *= n, this.m[5] *= a, this.m[9] *= u, this.m[2] *= n, this.m[6] *= a, this.m[10] *= u, this.m[3] *= n, this.m[7] *= a, this.m[11] *= u;
  }, Vt.prototype.rotateX = function(n) {
    var a = ce.fcos(n), u = ce._$9(n), d = this.m[4];
    this.m[4] = d * a + this.m[8] * u, this.m[8] = d * -u + this.m[8] * a, d = this.m[5], this.m[5] = d * a + this.m[9] * u, this.m[9] = d * -u + this.m[9] * a, d = this.m[6], this.m[6] = d * a + this.m[10] * u, this.m[10] = d * -u + this.m[10] * a, d = this.m[7], this.m[7] = d * a + this.m[11] * u, this.m[11] = d * -u + this.m[11] * a;
  }, Vt.prototype.rotateY = function(n) {
    var a = ce.fcos(n), u = ce._$9(n), d = this.m[0];
    this.m[0] = d * a + this.m[8] * -u, this.m[8] = d * u + this.m[8] * a, d = this.m[1], this.m[1] = d * a + this.m[9] * -u, this.m[9] = d * u + this.m[9] * a, d = m[2], this.m[2] = d * a + this.m[10] * -u, this.m[10] = d * u + this.m[10] * a, d = m[3], this.m[3] = d * a + this.m[11] * -u, this.m[11] = d * u + this.m[11] * a;
  }, Vt.prototype.rotateZ = function(n) {
    var a = ce.fcos(n), u = ce._$9(n), d = this.m[0];
    this.m[0] = d * a + this.m[4] * u, this.m[4] = d * -u + this.m[4] * a, d = this.m[1], this.m[1] = d * a + this.m[5] * u, this.m[5] = d * -u + this.m[5] * a, d = this.m[2], this.m[2] = d * a + this.m[6] * u, this.m[6] = d * -u + this.m[6] * a, d = this.m[3], this.m[3] = d * a + this.m[7] * u, this.m[7] = d * -u + this.m[7] * a;
  };
  function ne(n) {
    wt || sr.prototype.constructor.call(this, n);
  }
  ne.prototype = new sr(), ne._$tP = new Object(), ne._$27 = function() {
    ne._$tP.clear();
  }, ne.getID = function(n) {
    var a = ne._$tP[n];
    return a == null && (a = new ne(n), ne._$tP[n] = a), a;
  }, ne.prototype._$3s = function() {
    return new ne();
  };
  function dt() {
    wt || (this._$7 = 1, this._$f = 0, this._$H = 0, this._$g = 1, this._$k = 0, this._$w = 0, this._$hi = STATE_IDENTITY, this._$Z = _$pS);
  }
  dt._$kS = -1, dt._$pS = 0, dt._$hb = 1, dt.STATE_IDENTITY = 0, dt._$gb = 1, dt._$fo = 2, dt._$go = 4, dt.prototype.transform = function(n, a, u) {
    var d, p, f, y, $, v, x = 0, E = 0;
    switch (this._$hi) {
      default:
        return;
      case dt._$go | dt._$fo | dt._$gb:
        for (d = this._$7, p = this._$H, f = this._$k, y = this._$f, $ = this._$g, v = this._$w; --u >= 0; ) {
          var b = n[x++], A = n[x++];
          a[E++] = d * b + p * A + f, a[E++] = y * b + $ * A + v;
        }
        return;
      case dt._$go | dt._$fo:
        for (d = this._$7, p = this._$H, y = this._$f, $ = this._$g; --u >= 0; ) {
          var b = n[x++], A = n[x++];
          a[E++] = d * b + p * A, a[E++] = y * b + $ * A;
        }
        return;
      case dt._$go | dt._$gb:
        for (p = this._$H, f = this._$k, y = this._$f, v = this._$w; --u >= 0; ) {
          var b = n[x++];
          a[E++] = p * n[x++] + f, a[E++] = y * b + v;
        }
        return;
      case dt._$go:
        for (p = this._$H, y = this._$f; --u >= 0; ) {
          var b = n[x++];
          a[E++] = p * n[x++], a[E++] = y * b;
        }
        return;
      case dt._$fo | dt._$gb:
        for (d = this._$7, f = this._$k, $ = this._$g, v = this._$w; --u >= 0; )
          a[E++] = d * n[x++] + f, a[E++] = $ * n[x++] + v;
        return;
      case dt._$fo:
        for (d = this._$7, $ = this._$g; --u >= 0; )
          a[E++] = d * n[x++], a[E++] = $ * n[x++];
        return;
      case dt._$gb:
        for (f = this._$k, v = this._$w; --u >= 0; )
          a[E++] = n[x++] + f, a[E++] = n[x++] + v;
        return;
      case dt.STATE_IDENTITY:
        (n != a || x != E) && mt._$jT(n, x, a, E, u * 2);
        return;
    }
  }, dt.prototype.update = function() {
    this._$H == 0 && this._$f == 0 ? this._$7 == 1 && this._$g == 1 ? this._$k == 0 && this._$w == 0 ? (this._$hi = dt.STATE_IDENTITY, this._$Z = dt._$pS) : (this._$hi = dt._$gb, this._$Z = dt._$hb) : this._$k == 0 && this._$w == 0 ? (this._$hi = dt._$fo, this._$Z = dt._$kS) : (this._$hi = dt._$fo | dt._$gb, this._$Z = dt._$kS) : this._$7 == 0 && this._$g == 0 ? this._$k == 0 && this._$w == 0 ? (this._$hi = dt._$go, this._$Z = dt._$kS) : (this._$hi = dt._$go | dt._$gb, this._$Z = dt._$kS) : this._$k == 0 && this._$w == 0 ? (this._$hi = dt._$go | dt._$fo, this._$Z = dt._$kS) : (this._$hi = dt._$go | dt._$fo | dt._$gb, this._$Z = dt._$kS);
  }, dt.prototype._$RT = function(n) {
    this._$IT(n);
    var a = n[0], u = n[2], d = n[1], p = n[3], f = Math.sqrt(a * a + d * d), y = a * p - u * d;
    f == 0 ? F._$so && console.log("affine._$RT() / rt==0") : (n[0] = f, n[1] = y / f, n[2] = (d * p + a * u) / y, n[3] = Math.atan2(d, a));
  }, dt.prototype._$ho = function(n, a, u, d) {
    var p = new Float32Array(6), f = new Float32Array(6);
    n._$RT(p), a._$RT(f);
    var y = new Float32Array(6);
    y[0] = p[0] + (f[0] - p[0]) * u, y[1] = p[1] + (f[1] - p[1]) * u, y[2] = p[2] + (f[2] - p[2]) * u, y[3] = p[3] + (f[3] - p[3]) * u, y[4] = p[4] + (f[4] - p[4]) * u, y[5] = p[5] + (f[5] - p[5]) * u, d._$CT(y);
  }, dt.prototype._$CT = function(n) {
    var a = Math.cos(n[3]), u = Math.sin(n[3]);
    this._$7 = n[0] * a, this._$f = n[0] * u, this._$H = n[1] * (n[2] * a - u), this._$g = n[1] * (n[2] * u + a), this._$k = n[4], this._$w = n[5], this.update();
  }, dt.prototype._$IT = function(n) {
    n[0] = this._$7, n[1] = this._$f, n[2] = this._$H, n[3] = this._$g, n[4] = this._$k, n[5] = this._$w;
  };
  function re() {
    wt || (o.prototype.constructor.call(this), this.motions = new Array(), this._$7r = null, this._$7r = re._$Co++, this._$D0 = 30, this._$yT = 0, this._$E = !0, this.loopFadeIn = !0, this._$AS = -1, _$a0());
  }
  re.prototype = new o(), re._$cs = "VISIBLE:", re._$ar = "LAYOUT:", re._$Co = 0, re._$D2 = [], re._$1T = 1, re.loadMotion = function(n) {
    var a = new re(), u = [0], d = n.length;
    a._$yT = 0;
    for (var p = 0; p < d; ++p) {
      var f = n[p] & 255;
      if (!(f == `
` || f == "\r")) {
        if (f == "#") {
          for (; p < d && !(n[p] == `
` || n[p] == "\r"); ++p)
            ;
          continue;
        }
        if (f == "$") {
          for (var y = p, $ = -1; p < d && (f = n[p] & 255, !(f == "\r" || f == `
`)); ++p)
            if (f == "=") {
              $ = p;
              break;
            }
          if ($ >= 0)
            for ($ == y + 4 && n[y + 1] == "f" && n[y + 2] == "p" && n[y + 3] == "s", p = $ + 1; p < d && (f = n[p] & 255, !(f == "\r" || f == `
`)); ++p)
              f == "," || f == " " || f == "	" || (yt._$LS(n, d, p, u), p = u[0]);
          for (; p < d && !(n[p] == `
` || n[p] == "\r"); ++p)
            ;
          continue;
        }
        if ("a" <= f && f <= "z" || "A" <= f && f <= "Z" || f == "_") {
          for (var y = p, $ = -1; p < d && (f = n[p] & 255, !(f == "\r" || f == `
`)); ++p)
            if (f == "=") {
              $ = p;
              break;
            }
          if ($ >= 0) {
            var v = new ft();
            yt.startsWith(n, y, re._$cs) ? (v._$RP = ft._$hs, v._$4P = new String(n, y, $ - y)) : yt.startsWith(n, y, re._$ar) ? (v._$4P = new String(n, y + 7, $ - y - 7), yt.startsWith(n, y + 7, "ANCHOR_X") ? v._$RP = ft._$xs : yt.startsWith(n, y + 7, "ANCHOR_Y") ? v._$RP = ft._$us : yt.startsWith(n, y + 7, "SCALE_X") ? v._$RP = ft._$qs : yt.startsWith(n, y + 7, "SCALE_Y") ? v._$RP = ft._$Ys : yt.startsWith(n, y + 7, "X") ? v._$RP = ft._$ws : yt.startsWith(n, y + 7, "Y") && (v._$RP = ft._$Ns)) : (v._$RP = ft._$Fr, v._$4P = new String(n, y, $ - y)), a.motions.push(v);
            var x = 0;
            for (re._$D2.clear(), p = $ + 1; p < d && (f = n[p] & 255, !(f == "\r" || f == `
`)); ++p)
              f == "," || f == " " || f == "	" || yt._$LS(n, d, p, u);
            v._$I0 = re._$D2._$BL(), x > a._$yT && (a._$yT = x);
          }
        }
      }
    }
    return a._$AS = 1e3 * a._$yT / a._$D0 | 0, a;
  }, re.prototype.getDurationMSec = function() {
    return this._$AS;
  }, re.prototype.dump = function() {
    for (var n = 0; n < this.motions.length; n++) {
      var a = this.motions[n];
      console.log("_$wL[%s] [%d]. ", a._$4P, a._$I0.length);
      for (var u = 0; u < a._$I0.length && u < 10; u++)
        console.log("%5.2f ,", a._$I0[u]);
      console.log(`
`);
    }
  }, re.prototype.updateParamExe = function(n, a, u, d) {
    for (var p = a - d._$z2, f = p * this._$D0 / 1e3, y = f | 0, $ = f - y, v = 0; v < this.motions.length; v++) {
      var x = this.motions[v], E = x._$I0.length, b = x._$4P;
      if (x._$RP == ft._$hs) {
        var A = x._$I0[y >= E ? E - 1 : y];
        n.setParamFloat(b, A);
      } else if (!(ft._$ws <= x._$RP && x._$RP <= ft._$Ys)) {
        var C = n.getParamFloat(b), O = x._$I0[y >= E ? E - 1 : y], P = x._$I0[y + 1 >= E ? E - 1 : y + 1], k = O + (P - O) * $, N = C + (k - C) * u;
        n.setParamFloat(b, N);
      }
    }
    y >= this._$yT && (this._$E ? (d._$z2 = a, this.loopFadeIn && (d._$bs = a)) : d._$9L = !0);
  }, re.prototype._$r0 = function() {
    return this._$E;
  }, re.prototype._$aL = function(n) {
    this._$E = n;
  }, re.prototype.isLoopFadeIn = function() {
    return this.loopFadeIn;
  }, re.prototype.setLoopFadeIn = function(n) {
    this.loopFadeIn = n;
  }, Te.prototype.clear = function() {
    this.size = 0;
  }, Te.prototype.add = function(n) {
    if (this._$P.length <= this.size) {
      var a = new Float32Array(this.size * 2);
      mt._$jT(this._$P, 0, a, 0, this.size), this._$P = a;
    }
    this._$P[this.size++] = n;
  }, Te.prototype._$BL = function() {
    var n = new Float32Array(this.size);
    return mt._$jT(this._$P, 0, n, 0, this.size), n;
  }, ft._$Fr = 0, ft._$hs = 1, ft._$ws = 100, ft._$Ns = 101, ft._$xs = 102, ft._$us = 103, ft._$qs = 104, ft._$Ys = 105;
  function V() {
  }
  V._$Ms = 1, V._$Qs = 2, V._$i2 = 0, V._$No = 2, V._$do = V._$Ms, V._$Ls = !0, V._$1r = 5, V._$Qb = 65, V._$J = 1e-4, V._$FT = 1e-3, V._$Ss = 3;
  function J() {
  }
  J._$o7 = 6, J._$S7 = 7, J._$s7 = 8, J._$77 = 9, J.LIVE2D_FORMAT_VERSION_V2_10_SDK2 = 10, J.LIVE2D_FORMAT_VERSION_V2_11_SDK2_1 = 11, J._$T7 = J.LIVE2D_FORMAT_VERSION_V2_11_SDK2_1, J._$Is = -2004318072, J._$h0 = 0, J._$4L = 23, J._$7P = 33, J._$uT = function(n) {
    console.log(`_$bo :: _$6 _$mo _$E0 : %d
`, n);
  }, J._$9o = function(n) {
    if (n < 40)
      return J._$uT(n), null;
    if (n < 50)
      return J._$uT(n), null;
    if (n < 60)
      return J._$uT(n), null;
    if (n < 100)
      switch (n) {
        case 65:
          return new oe();
        case 66:
          return new Yt();
        case 67:
          return new St();
        case 68:
          return new bt();
        case 69:
          return new M();
        case 70:
          return new Ft();
        default:
          return J._$uT(n), null;
      }
    else if (n < 150)
      switch (n) {
        case 131:
          return new ei();
        case 133:
          return new ae();
        case 136:
          return new w();
        case 137:
          return new ti();
        case 142:
          return new Ae();
      }
    return J._$uT(n), null;
  };
  function B(n) {
    wt || (this._$QT = !0, this._$co = -1, this._$qo = 0, this._$pb = new Array(B._$is), this._$_2 = new Float32Array(B._$is), this._$vr = new Float32Array(B._$is), this._$Rr = new Float32Array(B._$is), this._$Or = new Float32Array(B._$is), this._$fs = new Float32Array(B._$is), this._$Js = new Array(B._$is), this._$3S = new Array(), this._$aS = new Array(), this._$Bo = null, this._$F2 = new Array(), this._$db = new Array(), this._$8b = new Array(), this._$Hr = new Array(), this._$Ws = null, this._$Vs = null, this._$Er = null, this._$Es = new Int16Array(V._$Qb), this._$ZP = new Float32Array(V._$1r * 2), this._$Ri = n, this._$b0 = B._$HP++, this.clipManager = null, this.dp_webgl = null);
  }
  B._$HP = 0, B._$_0 = !0, B._$V2 = -1, B._$W0 = -1, B._$jr = !1, B._$ZS = !0, B._$tr = -1e6, B._$lr = 1e6, B._$is = 32, B._$e = !1, B.prototype.getDrawDataIndex = function(n) {
    for (var a = this._$aS.length - 1; a >= 0; --a)
      if (this._$aS[a] != null && this._$aS[a].getDrawDataID() == n)
        return a;
    return -1;
  }, B.prototype.getDrawData = function(n) {
    if (n instanceof ne) {
      if (this._$Bo == null) {
        this._$Bo = new Object();
        for (var a = this._$aS.length, u = 0; u < a; u++) {
          var d = this._$aS[u], p = d.getDrawDataID();
          p != null && (this._$Bo[p] = d);
        }
      }
      return this._$Bo[id];
    } else
      return n < this._$aS.length ? this._$aS[n] : null;
  }, B.prototype.release = function() {
    this._$3S.clear(), this._$aS.clear(), this._$F2.clear(), this._$Bo != null && this._$Bo.clear(), this._$db.clear(), this._$8b.clear(), this._$Hr.clear();
  }, B.prototype.init = function() {
    this._$co++, this._$F2.length > 0 && this.release();
    for (var n = this._$Ri.getModelImpl(), a = n._$Xr(), u = a.length, d = new Array(), p = new Array(), f = 0; f < u; ++f) {
      var y = a[f];
      this._$F2.push(y), this._$Hr.push(y.init(this));
      for (var $ = y.getBaseData(), v = $.length, x = 0; x < v; ++x)
        d.push($[x]);
      for (var x = 0; x < v; ++x) {
        var E = $[x].init(this);
        E._$l2(f), p.push(E);
      }
      for (var b = y.getDrawData(), A = b.length, x = 0; x < A; ++x) {
        var C = b[x], O = C.init(this);
        O._$IP = f, this._$aS.push(C), this._$8b.push(O);
      }
    }
    for (var P = d.length, k = he._$2o(); ; ) {
      for (var N = !1, f = 0; f < P; ++f) {
        var G = d[f];
        if (G != null) {
          var U = G.getTargetBaseDataID();
          (U == null || U == k || this.getBaseDataIndex(U) >= 0) && (this._$3S.push(G), this._$db.push(p[f]), d[f] = null, N = !0);
        }
      }
      if (!N)
        break;
    }
    var it = n._$E2();
    if (it != null) {
      var W = it._$1s();
      if (W != null)
        for (var z = W.length, f = 0; f < z; ++f) {
          var X = W[f];
          X != null && this._$02(X.getParamID(), X.getDefaultValue(), X.getMinValue(), X.getMaxValue());
        }
    }
    this.clipManager = new t(this.dp_webgl), this.clipManager.init(this, this._$aS, this._$8b), this._$QT = !0;
  }, B.prototype.update = function() {
    B._$e && h.start("_$zL");
    for (var n = this._$_2.length, a = 0; a < n; a++)
      this._$_2[a] != this._$vr[a] && (this._$Js[a] = B._$ZS, this._$vr[a] = this._$_2[a]);
    var u = !1, d = this._$3S.length, p = this._$aS.length, f = lt._$or(), y = lt._$Pr(), $ = y - f + 1;
    (this._$Ws == null || this._$Ws.length < $) && (this._$Ws = new Int16Array($), this._$Vs = new Int16Array($));
    for (var a = 0; a < $; a++)
      this._$Ws[a] = B._$V2, this._$Vs[a] = B._$V2;
    (this._$Er == null || this._$Er.length < p) && (this._$Er = new Int16Array(p));
    for (var a = 0; a < p; a++)
      this._$Er[a] = B._$W0;
    B._$e && h.dump("_$zL"), B._$e && h.start("_$UL");
    for (var v = null, x = 0; x < d; ++x) {
      var E = this._$3S[x], b = this._$db[x];
      try {
        E._$Nr(this, b), E._$2b(this, b);
      } catch (G) {
        v == null && (v = G);
      }
    }
    v != null && B._$_0 && h._$Rb(v), B._$e && h.dump("_$UL"), B._$e && h.start("_$DL");
    for (var A = null, C = 0; C < p; ++C) {
      var O = this._$aS[C], P = this._$8b[C];
      try {
        if (O._$Nr(this, P), P._$u2())
          continue;
        O._$2b(this, P);
        var k = Math.floor(O._$zS(this, P) - f), N;
        try {
          N = this._$Vs[k];
        } catch (G) {
          console.log(`_$li :: %s / %s 				@@_$fS
`, G.toString(), O.getDrawDataID().toString()), k = Math.floor(O._$zS(this, P) - f);
          continue;
        }
        N == B._$V2 ? this._$Ws[k] = C : this._$Er[N] = C, this._$Vs[k] = C;
      } catch (G) {
        A == null && (A = G, F._$sT(F._$H7));
      }
    }
    A != null && B._$_0 && h._$Rb(A), B._$e && h.dump("_$DL"), B._$e && h.start("_$eL");
    for (var a = this._$Js.length - 1; a >= 0; a--)
      this._$Js[a] = B._$jr;
    return this._$QT = !1, B._$e && h.dump("_$eL"), u;
  }, B.prototype.preDraw = function(n) {
    this.clipManager != null && (n._$ZT(), this.clipManager.setupClip(this, n));
  }, B.prototype.draw = function(n) {
    if (this._$Ws == null) {
      h._$li("call _$Ri.update() before _$Ri.draw() ");
      return;
    }
    var a = this._$Ws.length;
    n._$ZT();
    for (var u = 0; u < a; ++u) {
      var d = this._$Ws[u];
      if (d != B._$V2)
        do {
          var p = this._$aS[d], f = this._$8b[d];
          if (f._$yo()) {
            var y = f._$IP, $ = this._$Hr[y];
            f._$VS = $.getPartsOpacity(), p.draw(n, this, f);
          }
          var v = this._$Er[d];
          if (v <= d || v == B._$W0)
            break;
          d = v;
        } while (!0);
    }
  }, B.prototype.getParamIndex = function(n) {
    for (var a = this._$pb.length - 1; a >= 0; --a)
      if (this._$pb[a] == n)
        return a;
    return this._$02(n, 0, B._$tr, B._$lr);
  }, B.prototype._$BS = function(n) {
    return this.getBaseDataIndex(n);
  }, B.prototype.getBaseDataIndex = function(n) {
    for (var a = this._$3S.length - 1; a >= 0; --a)
      if (this._$3S[a] != null && this._$3S[a].getBaseDataID() == n)
        return a;
    return -1;
  }, B.prototype._$UT = function(n, a) {
    var u = new Float32Array(a);
    return mt._$jT(n, 0, u, 0, n.length), u;
  }, B.prototype._$02 = function(n, a, u, d) {
    if (this._$qo >= this._$pb.length) {
      var p = this._$pb.length, f = new Array(p * 2);
      mt._$jT(this._$pb, 0, f, 0, p), this._$pb = f, this._$_2 = this._$UT(this._$_2, p * 2), this._$vr = this._$UT(this._$vr, p * 2), this._$Rr = this._$UT(this._$Rr, p * 2), this._$Or = this._$UT(this._$Or, p * 2);
      var y = new Array();
      mt._$jT(this._$Js, 0, y, 0, p), this._$Js = y;
    }
    return this._$pb[this._$qo] = n, this._$_2[this._$qo] = a, this._$vr[this._$qo] = a, this._$Rr[this._$qo] = u, this._$Or[this._$qo] = d, this._$Js[this._$qo] = B._$ZS, this._$qo++;
  }, B.prototype._$Zo = function(n, a) {
    this._$3S[n] = a;
  }, B.prototype.setParamFloat = function(n, a) {
    a < this._$Rr[n] && (a = this._$Rr[n]), a > this._$Or[n] && (a = this._$Or[n]), this._$_2[n] = a;
  }, B.prototype.loadParam = function() {
    var n = this._$_2.length;
    n > this._$fs.length && (n = this._$fs.length), mt._$jT(this._$fs, 0, this._$_2, 0, n);
  }, B.prototype.saveParam = function() {
    var n = this._$_2.length;
    n > this._$fs.length && (this._$fs = new Float32Array(n)), mt._$jT(this._$_2, 0, this._$fs, 0, n);
  }, B.prototype._$v2 = function() {
    return this._$co;
  }, B.prototype._$WS = function() {
    return this._$QT;
  }, B.prototype._$Xb = function(n) {
    return this._$Js[n] == B._$ZS;
  }, B.prototype._$vs = function() {
    return this._$Es;
  }, B.prototype._$Tr = function() {
    return this._$ZP;
  }, B.prototype.getBaseData = function(n) {
    return this._$3S[n];
  }, B.prototype.getParamFloat = function(n) {
    return this._$_2[n];
  }, B.prototype.getParamMax = function(n) {
    return this._$Or[n];
  }, B.prototype.getParamMin = function(n) {
    return this._$Rr[n];
  }, B.prototype.setPartsOpacity = function(n, a) {
    var u = this._$Hr[n];
    u.setPartsOpacity(a);
  }, B.prototype.getPartsOpacity = function(n) {
    var a = this._$Hr[n];
    return a.getPartsOpacity();
  }, B.prototype.getPartsDataIndex = function(n) {
    for (var a = this._$F2.length - 1; a >= 0; --a)
      if (this._$F2[a] != null && this._$F2[a]._$p2() == n)
        return a;
    return -1;
  }, B.prototype._$q2 = function(n) {
    return this._$db[n];
  }, B.prototype._$C2 = function(n) {
    return this._$8b[n];
  }, B.prototype._$Bb = function(n) {
    return this._$Hr[n];
  }, B.prototype._$5s = function(n, a) {
    for (var u = this._$Ws.length, d = n, p = 0; p < u; ++p) {
      var f = this._$Ws[p];
      if (f != B._$V2)
        do {
          var y = this._$8b[f];
          y._$yo() && (y._$GT()._$B2(this, y, d), d += a);
          var $ = this._$Er[f];
          if ($ <= f || $ == B._$W0)
            break;
          f = $;
        } while (!0);
    }
  }, B.prototype.setDrawParam = function(n) {
    this.dp_webgl = n;
  }, B.prototype.getDrawParam = function() {
    return this.dp_webgl;
  };
  function Wt() {
  }
  Wt._$0T = function(n) {
    return Wt._$0T(new _$5(n));
  }, Wt._$0T = function(n) {
    if (!n.exists())
      throw new _$ls(n._$3b());
    for (var a = n.length(), u = new Int8Array(a), d = new _$Xs(new _$kb(n), 8192), p, f = 0; (p = d.read(u, f, a - f)) > 0; )
      f += p;
    return u;
  }, Wt._$C = function(n) {
    var a = null, u = null;
    try {
      a = n instanceof Array ? n : new _$Xs(n, 8192), u = new _$js();
      for (var d = 1e3, p, f = new Int8Array(d); (p = a.read(f)) > 0; )
        u.write(f, 0, p);
      return u._$TS();
    } finally {
      n != null && n.close(), u != null && (u.flush(), u.close());
    }
  };
  function ht() {
    wt || (H.prototype.constructor.call(this), this._$sb = new Int32Array(ht._$As), this._$U2 = new Array(), this.transform = null, this.gl = null, ht._$NT == null && (ht._$NT = ht._$9r(256), ht._$vS = ht._$9r(256), ht._$no = ht._$vb(256)));
  }
  ht.prototype = new H(), ht._$As = 32, ht._$Gr = !1, ht._$NT = null, ht._$vS = null, ht._$no = null, ht._$9r = function(n) {
    var a = new Float32Array(n);
    return a;
  }, ht._$vb = function(n) {
    var a = new Int16Array(n);
    return a;
  }, ht._$cr = function(n, a) {
    return n == null || n._$yL() < a.length ? (n = ht._$9r(a.length * 2), n.put(a), n._$oT(0)) : (n.clear(), n.put(a), n._$oT(0)), n;
  }, ht._$mb = function(n, a) {
    return n == null || n._$yL() < a.length ? (n = ht._$vb(a.length * 2), n.put(a), n._$oT(0)) : (n.clear(), n.put(a), n._$oT(0)), n;
  }, ht._$Hs = function() {
    return ht._$Gr;
  }, ht._$as = function(n) {
    ht._$Gr = n;
  }, ht.prototype.setGL = function(n) {
    this.gl = n;
  }, ht.prototype.setTransform = function(n) {
    this.transform = n;
  }, ht.prototype._$ZT = function() {
  }, ht.prototype._$Uo = function(n, a, u, d, p, f, y, $) {
    if (!(f < 0.01)) {
      var v = this._$U2[n], x = f > 0.9 ? F.EXPAND_W : 0;
      this.gl.drawElements(v, u, d, p, f, x, this.transform, $);
    }
  }, ht.prototype._$Rs = function() {
    throw new Error("_$Rs");
  }, ht.prototype._$Ds = function(n) {
    throw new Error("_$Ds");
  }, ht.prototype._$K2 = function() {
    for (var n = 0; n < this._$sb.length; n++) {
      var a = this._$sb[n];
      a != 0 && (this.gl._$Sr(1, this._$sb, n), this._$sb[n] = 0);
    }
  }, ht.prototype.setTexture = function(n, a) {
    this._$sb.length < n + 1 && this._$nS(n), this._$sb[n] = a;
  }, ht.prototype.setTexture = function(n, a) {
    this._$sb.length < n + 1 && this._$nS(n), this._$U2[n] = a;
  }, ht.prototype._$nS = function(n) {
    var a = Math.max(this._$sb.length * 2, n + 1 + 10), u = new Int32Array(a);
    mt._$jT(this._$sb, 0, u, 0, this._$sb.length), this._$sb = u;
    var d = new Array();
    mt._$jT(this._$U2, 0, d, 0, this._$U2.length), this._$U2 = d;
  };
  function bt() {
    wt || (pt.prototype.constructor.call(this), this._$GS = null, this._$Y0 = null);
  }
  bt.prototype = new pt(), bt._$Xo = new Float32Array(2), bt._$io = new Float32Array(2), bt._$0o = new Float32Array(2), bt._$Lo = new Float32Array(2), bt._$To = new Float32Array(2), bt._$Po = new Float32Array(2), bt._$gT = new Array(), bt.prototype._$zP = function() {
    this._$GS = new Yt(), this._$GS._$zP(), this._$Y0 = new Array();
  }, bt.prototype.getType = function() {
    return pt._$c2;
  }, bt.prototype._$F0 = function(n) {
    pt.prototype._$F0.call(this, n), this._$GS = n._$nP(), this._$Y0 = n._$nP(), pt.prototype.readV2_opacity.call(this, n);
  }, bt.prototype.init = function(n) {
    var a = new xe(this);
    return a._$Yr = new M(), this._$32() && (a._$Wr = new M()), a;
  }, bt.prototype._$Nr = function(n, a) {
    this != a._$GT() && console.log("### assert!! ### ");
    var u = a;
    if (this._$GS._$Ur(n)) {
      var d = bt._$gT;
      d[0] = !1;
      var p = this._$GS._$Q2(n, d);
      a._$Ib(d[0]), this.interpolateOpacity(n, this._$GS, a, d);
      var f = n._$vs(), y = n._$Tr();
      if (this._$GS._$zr(f, y, p), p <= 0) {
        var kt = this._$Y0[f[0]];
        u._$Yr.init(kt);
      } else if (p == 1) {
        var kt = this._$Y0[f[0]], $ = this._$Y0[f[1]], v = y[0];
        u._$Yr._$fL = kt._$fL + ($._$fL - kt._$fL) * v, u._$Yr._$gL = kt._$gL + ($._$gL - kt._$gL) * v, u._$Yr._$B0 = kt._$B0 + ($._$B0 - kt._$B0) * v, u._$Yr._$z0 = kt._$z0 + ($._$z0 - kt._$z0) * v, u._$Yr._$qT = kt._$qT + ($._$qT - kt._$qT) * v;
      } else if (p == 2) {
        var kt = this._$Y0[f[0]], $ = this._$Y0[f[1]], x = this._$Y0[f[2]], E = this._$Y0[f[3]], v = y[0], b = y[1], A = kt._$fL + ($._$fL - kt._$fL) * v, C = x._$fL + (E._$fL - x._$fL) * v;
        u._$Yr._$fL = A + (C - A) * b, A = kt._$gL + ($._$gL - kt._$gL) * v, C = x._$gL + (E._$gL - x._$gL) * v, u._$Yr._$gL = A + (C - A) * b, A = kt._$B0 + ($._$B0 - kt._$B0) * v, C = x._$B0 + (E._$B0 - x._$B0) * v, u._$Yr._$B0 = A + (C - A) * b, A = kt._$z0 + ($._$z0 - kt._$z0) * v, C = x._$z0 + (E._$z0 - x._$z0) * v, u._$Yr._$z0 = A + (C - A) * b, A = kt._$qT + ($._$qT - kt._$qT) * v, C = x._$qT + (E._$qT - x._$qT) * v, u._$Yr._$qT = A + (C - A) * b;
      } else if (p == 3) {
        var O = this._$Y0[f[0]], P = this._$Y0[f[1]], k = this._$Y0[f[2]], N = this._$Y0[f[3]], G = this._$Y0[f[4]], U = this._$Y0[f[5]], it = this._$Y0[f[6]], W = this._$Y0[f[7]], v = y[0], b = y[1], z = y[2], A = O._$fL + (P._$fL - O._$fL) * v, C = k._$fL + (N._$fL - k._$fL) * v, X = G._$fL + (U._$fL - G._$fL) * v, Y = it._$fL + (W._$fL - it._$fL) * v;
        u._$Yr._$fL = (1 - z) * (A + (C - A) * b) + z * (X + (Y - X) * b), A = O._$gL + (P._$gL - O._$gL) * v, C = k._$gL + (N._$gL - k._$gL) * v, X = G._$gL + (U._$gL - G._$gL) * v, Y = it._$gL + (W._$gL - it._$gL) * v, u._$Yr._$gL = (1 - z) * (A + (C - A) * b) + z * (X + (Y - X) * b), A = O._$B0 + (P._$B0 - O._$B0) * v, C = k._$B0 + (N._$B0 - k._$B0) * v, X = G._$B0 + (U._$B0 - G._$B0) * v, Y = it._$B0 + (W._$B0 - it._$B0) * v, u._$Yr._$B0 = (1 - z) * (A + (C - A) * b) + z * (X + (Y - X) * b), A = O._$z0 + (P._$z0 - O._$z0) * v, C = k._$z0 + (N._$z0 - k._$z0) * v, X = G._$z0 + (U._$z0 - G._$z0) * v, Y = it._$z0 + (W._$z0 - it._$z0) * v, u._$Yr._$z0 = (1 - z) * (A + (C - A) * b) + z * (X + (Y - X) * b), A = O._$qT + (P._$qT - O._$qT) * v, C = k._$qT + (N._$qT - k._$qT) * v, X = G._$qT + (U._$qT - G._$qT) * v, Y = it._$qT + (W._$qT - it._$qT) * v, u._$Yr._$qT = (1 - z) * (A + (C - A) * b) + z * (X + (Y - X) * b);
      } else if (p == 4) {
        var Lt = this._$Y0[f[0]], Ht = this._$Y0[f[1]], Ut = this._$Y0[f[2]], se = this._$Y0[f[3]], ut = this._$Y0[f[4]], ot = this._$Y0[f[5]], ct = this._$Y0[f[6]], vt = this._$Y0[f[7]], _t = this._$Y0[f[8]], gt = this._$Y0[f[9]], tt = this._$Y0[f[10]], nt = this._$Y0[f[11]], et = this._$Y0[f[12]], st = this._$Y0[f[13]], Et = this._$Y0[f[14]], fe = this._$Y0[f[15]], v = y[0], b = y[1], z = y[2], Ot = y[3], A = Lt._$fL + (Ht._$fL - Lt._$fL) * v, C = Ut._$fL + (se._$fL - Ut._$fL) * v, X = ut._$fL + (ot._$fL - ut._$fL) * v, Y = ct._$fL + (vt._$fL - ct._$fL) * v, $t = _t._$fL + (gt._$fL - _t._$fL) * v, Zt = tt._$fL + (nt._$fL - tt._$fL) * v, Mt = et._$fL + (st._$fL - et._$fL) * v, we = Et._$fL + (fe._$fL - Et._$fL) * v;
        u._$Yr._$fL = (1 - Ot) * ((1 - z) * (A + (C - A) * b) + z * (X + (Y - X) * b)) + Ot * ((1 - z) * ($t + (Zt - $t) * b) + z * (Mt + (we - Mt) * b)), A = Lt._$gL + (Ht._$gL - Lt._$gL) * v, C = Ut._$gL + (se._$gL - Ut._$gL) * v, X = ut._$gL + (ot._$gL - ut._$gL) * v, Y = ct._$gL + (vt._$gL - ct._$gL) * v, $t = _t._$gL + (gt._$gL - _t._$gL) * v, Zt = tt._$gL + (nt._$gL - tt._$gL) * v, Mt = et._$gL + (st._$gL - et._$gL) * v, we = Et._$gL + (fe._$gL - Et._$gL) * v, u._$Yr._$gL = (1 - Ot) * ((1 - z) * (A + (C - A) * b) + z * (X + (Y - X) * b)) + Ot * ((1 - z) * ($t + (Zt - $t) * b) + z * (Mt + (we - Mt) * b)), A = Lt._$B0 + (Ht._$B0 - Lt._$B0) * v, C = Ut._$B0 + (se._$B0 - Ut._$B0) * v, X = ut._$B0 + (ot._$B0 - ut._$B0) * v, Y = ct._$B0 + (vt._$B0 - ct._$B0) * v, $t = _t._$B0 + (gt._$B0 - _t._$B0) * v, Zt = tt._$B0 + (nt._$B0 - tt._$B0) * v, Mt = et._$B0 + (st._$B0 - et._$B0) * v, we = Et._$B0 + (fe._$B0 - Et._$B0) * v, u._$Yr._$B0 = (1 - Ot) * ((1 - z) * (A + (C - A) * b) + z * (X + (Y - X) * b)) + Ot * ((1 - z) * ($t + (Zt - $t) * b) + z * (Mt + (we - Mt) * b)), A = Lt._$z0 + (Ht._$z0 - Lt._$z0) * v, C = Ut._$z0 + (se._$z0 - Ut._$z0) * v, X = ut._$z0 + (ot._$z0 - ut._$z0) * v, Y = ct._$z0 + (vt._$z0 - ct._$z0) * v, $t = _t._$z0 + (gt._$z0 - _t._$z0) * v, Zt = tt._$z0 + (nt._$z0 - tt._$z0) * v, Mt = et._$z0 + (st._$z0 - et._$z0) * v, we = Et._$z0 + (fe._$z0 - Et._$z0) * v, u._$Yr._$z0 = (1 - Ot) * ((1 - z) * (A + (C - A) * b) + z * (X + (Y - X) * b)) + Ot * ((1 - z) * ($t + (Zt - $t) * b) + z * (Mt + (we - Mt) * b)), A = Lt._$qT + (Ht._$qT - Lt._$qT) * v, C = Ut._$qT + (se._$qT - Ut._$qT) * v, X = ut._$qT + (ot._$qT - ut._$qT) * v, Y = ct._$qT + (vt._$qT - ct._$qT) * v, $t = _t._$qT + (gt._$qT - _t._$qT) * v, Zt = tt._$qT + (nt._$qT - tt._$qT) * v, Mt = et._$qT + (st._$qT - et._$qT) * v, we = Et._$qT + (fe._$qT - Et._$qT) * v, u._$Yr._$qT = (1 - Ot) * ((1 - z) * (A + (C - A) * b) + z * (X + (Y - X) * b)) + Ot * ((1 - z) * ($t + (Zt - $t) * b) + z * (Mt + (we - Mt) * b));
      } else {
        for (var qt = Math.pow(2, p) | 0, Ee = new Float32Array(qt), ue = 0; ue < qt; ue++) {
          for (var Ge = ue, nr = 1, ze = 0; ze < p; ze++)
            nr *= Ge % 2 == 0 ? 1 - y[ze] : y[ze], Ge /= 2;
          Ee[ue] = nr;
        }
        for (var Xe = new Array(), de = 0; de < qt; de++)
          Xe[de] = this._$Y0[f[de]];
        for (var Ir = 0, Lr = 0, Ze = 0, wr = 0, or = 0, de = 0; de < qt; de++)
          Ir += Ee[de] * Xe[de]._$fL, Lr += Ee[de] * Xe[de]._$gL, Ze += Ee[de] * Xe[de]._$B0, wr += Ee[de] * Xe[de]._$z0, or += Ee[de] * Xe[de]._$qT;
        u._$Yr._$fL = Ir, u._$Yr._$gL = Lr, u._$Yr._$B0 = Ze, u._$Yr._$z0 = wr, u._$Yr._$qT = or;
      }
      var kt = this._$Y0[f[0]];
      u._$Yr.reflectX = kt.reflectX, u._$Yr.reflectY = kt.reflectY;
    }
  }, bt.prototype._$2b = function(n, a) {
    this != a._$GT() && console.log("### assert!! ### ");
    var u = a;
    if (u._$hS(!0), !this._$32())
      u.setTotalScale_notForClient(u._$Yr._$B0), u.setTotalOpacity(u.getInterpolatedOpacity());
    else {
      var d = this.getTargetBaseDataID();
      if (u._$8r == pt._$ur && (u._$8r = n.getBaseDataIndex(d)), u._$8r < 0)
        F._$so && h._$li("_$L _$0P _$G :: %s", d), u._$hS(!1);
      else {
        var p = n.getBaseData(u._$8r);
        if (p != null) {
          var f = n._$q2(u._$8r), y = bt._$Xo;
          y[0] = u._$Yr._$fL, y[1] = u._$Yr._$gL;
          var $ = bt._$io;
          $[0] = 0, $[1] = -0.1;
          var v = f._$GT().getType();
          v == pt._$c2 ? $[1] = -10 : $[1] = -0.1;
          var x = bt._$0o;
          this._$Jr(n, p, f, y, $, x);
          var E = ce._$92($, x);
          p._$nb(n, f, y, y, 1, 0, 2), u._$Wr._$fL = y[0], u._$Wr._$gL = y[1], u._$Wr._$B0 = u._$Yr._$B0, u._$Wr._$z0 = u._$Yr._$z0, u._$Wr._$qT = u._$Yr._$qT - E * ce._$NS;
          var b = f.getTotalScale();
          u.setTotalScale_notForClient(b * u._$Wr._$B0);
          var A = f.getTotalOpacity();
          u.setTotalOpacity(A * u.getInterpolatedOpacity()), u._$Wr.reflectX = u._$Yr.reflectX, u._$Wr.reflectY = u._$Yr.reflectY, u._$hS(f._$yo());
        } else
          u._$hS(!1);
      }
    }
  }, bt.prototype._$nb = function(n, a, u, d, p, f, y) {
    this != a._$GT() && console.log("### assert!! ### ");
    for (var $ = a, v = $._$Wr != null ? $._$Wr : $._$Yr, x = Math.sin(ce._$bS * v._$qT), E = Math.cos(ce._$bS * v._$qT), b = $.getTotalScale(), A = v.reflectX ? -1 : 1, C = v.reflectY ? -1 : 1, O = E * b * A, P = -x * b * C, k = x * b * A, N = E * b * C, G = v._$fL, U = v._$gL, it, W, z = p * y, X = f; X < z; X += y)
      it = u[X], W = u[X + 1], d[X] = O * it + P * W + G, d[X + 1] = k * it + N * W + U;
  }, bt.prototype._$Jr = function(n, a, u, d, p, f) {
    a != u._$GT() && console.log("### assert!! ### ");
    var y = bt._$Lo;
    bt._$Lo[0] = d[0], bt._$Lo[1] = d[1], a._$nb(n, u, y, y, 1, 0, 2);
    for (var $ = bt._$To, v = bt._$Po, x = 10, E = 1, b = 0; b < x; b++) {
      if (v[0] = d[0] + E * p[0], v[1] = d[1] + E * p[1], a._$nb(n, u, v, $, 1, 0, 2), $[0] -= y[0], $[1] -= y[1], $[0] != 0 || $[1] != 0) {
        f[0] = $[0], f[1] = $[1];
        return;
      }
      if (v[0] = d[0] - E * p[0], v[1] = d[1] - E * p[1], a._$nb(n, u, v, $, 1, 0, 2), $[0] -= y[0], $[1] -= y[1], $[0] != 0 || $[1] != 0) {
        $[0] = -$[0], $[0] = -$[0], f[0] = $[0], f[1] = $[1];
        return;
      }
      E *= 0.1;
    }
    F._$so && console.log(`_$L0 to transform _$SP
`);
  };
  function xe(n) {
    Ie.prototype.constructor.call(this, n), this._$8r = pt._$ur, this._$Yr = null, this._$Wr = null;
  }
  xe.prototype = new Ie();
  function lt() {
    wt || (j.prototype.constructor.call(this), this._$gP = null, this._$dr = null, this._$GS = null, this._$qb = null, this._$Lb = null, this._$mS = null);
  }
  lt.prototype = new j(), lt._$ur = -2, lt._$ES = 500, lt._$wb = 2, lt._$8S = 3, lt._$os = 4, lt._$52 = lt._$ES, lt._$R2 = lt._$ES, lt._$Sb = function(n) {
    for (var a = n.length - 1; a >= 0; --a) {
      var u = n[a];
      u < lt._$52 ? lt._$52 = u : u > lt._$R2 && (lt._$R2 = u);
    }
  }, lt._$or = function() {
    return lt._$52;
  }, lt._$Pr = function() {
    return lt._$R2;
  }, lt.prototype._$F0 = function(n) {
    this._$gP = n._$nP(), this._$dr = n._$nP(), this._$GS = n._$nP(), this._$qb = n._$6L(), this._$Lb = n._$cS(), this._$mS = n._$Tb(), n.getFormatVersion() >= J._$T7 ? (this.clipID = n._$nP(), this.clipIDList = this.convertClipIDForV2_11(this.clipID)) : this.clipIDList = null, lt._$Sb(this._$Lb);
  }, lt.prototype.getClipIDList = function() {
    return this.clipIDList;
  }, lt.prototype._$Nr = function(n, a) {
    if (a._$IS[0] = !1, a._$Us = At._$Z2(n, this._$GS, a._$IS, this._$Lb), !F._$Zs) {
      if (a._$IS[0])
        return;
    }
    a._$7s = At._$br(n, this._$GS, a._$IS, this._$mS);
  }, lt.prototype._$2b = function(n) {
  }, lt.prototype.getDrawDataID = function() {
    return this._$gP;
  }, lt.prototype._$j2 = function(n) {
    this._$gP = n;
  }, lt.prototype.getOpacity = function(n, a) {
    return a._$7s;
  }, lt.prototype._$zS = function(n, a) {
    return a._$Us;
  }, lt.prototype.getTargetBaseDataID = function() {
    return this._$dr;
  }, lt.prototype._$gs = function(n) {
    this._$dr = n;
  }, lt.prototype._$32 = function() {
    return this._$dr != null && this._$dr != he._$2o();
  }, lt.prototype.getType = function() {
  };
  function Ae() {
    wt || (this._$NL = null, this._$3S = null, this._$aS = null, Ae._$42++);
  }
  Ae._$42 = 0, Ae.prototype._$1b = function() {
    return this._$3S;
  }, Ae.prototype.getDrawDataList = function() {
    return this._$aS;
  }, Ae.prototype._$F0 = function(n) {
    this._$NL = n._$nP(), this._$aS = n._$nP(), this._$3S = n._$nP();
  }, Ae.prototype._$kr = function(n) {
    n._$Zo(this._$3S), n._$xo(this._$aS), this._$3S = null, this._$aS = null;
  };
  function zt() {
    wt || (r.prototype.constructor.call(this), this._$zo = new ht());
  }
  zt.prototype = new r(), zt.loadModel = function(n) {
    var a = new zt();
    return r._$62(a, n), a;
  }, zt.loadModel = function(n) {
    var a = new zt();
    return r._$62(a, n), a;
  }, zt._$to = function() {
    var n = new zt();
    return n;
  }, zt._$er = function(n) {
    var a = new _$5("../_$_r/_$t0/_$Ri/_$_P._$d");
    if (a.exists() == !1)
      throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + a._$PL());
    for (var u = ["../_$_r/_$t0/_$Ri/_$_P.512/_$CP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$vP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$EP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$pP._$1"], d = zt.loadModel(a._$3b()), p = 0; p < u.length; p++) {
      var f = new _$5(u[p]);
      if (f.exists() == !1)
        throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + f._$PL());
      d.setTexture(p, _$nL._$_o(n, f._$3b()));
    }
    return d;
  }, zt.prototype.setGL = function(n) {
    this._$zo.setGL(n);
  }, zt.prototype.setTransform = function(n) {
    this._$zo.setTransform(n);
  }, zt.prototype.draw = function() {
    this._$5S.draw(this._$zo);
  }, zt.prototype._$K2 = function() {
    this._$zo._$K2();
  }, zt.prototype.setTexture = function(n, a) {
    this._$zo == null && h._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this._$zo.setTexture(n, a);
  }, zt.prototype.setTexture = function(n, a) {
    this._$zo == null && h._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this._$zo.setTexture(n, a);
  }, zt.prototype._$Rs = function() {
    return this._$zo._$Rs();
  }, zt.prototype._$Ds = function(n) {
    this._$zo._$Ds(n);
  }, zt.prototype.getDrawParam = function() {
    return this._$zo;
  };
  function It() {
    wt || (o.prototype.constructor.call(this), this.motions = new Array(), this._$o2 = null, this._$7r = It._$Co++, this._$D0 = 30, this._$yT = 0, this._$E = !1, this.loopFadeIn = !0, this._$rr = -1, this._$eP = 0);
  }
  It.prototype = new o(), It._$cs = "VISIBLE:", It._$ar = "LAYOUT:", It.MTN_PREFIX_FADEIN = "FADEIN:", It.MTN_PREFIX_FADEOUT = "FADEOUT:", It._$Co = 0, It._$1T = 1, It.loadMotion = function(n) {
    var a = Wt._$C(n), u = It.loadMotion(a);
    return u;
  };
  function jt(n, a) {
    return String.fromCharCode(n.getUint8(a));
  }
  It.loadMotion = function(n) {
    n instanceof ArrayBuffer && (n = new DataView(n));
    var a = new It(), u = [0], d = n.byteLength;
    a._$yT = 0;
    for (var p = 0; p < d; ++p) {
      var f = jt(n, p), y = f.charCodeAt(0);
      if (!(f == `
` || f == "\r")) {
        if (f == "#") {
          for (; p < d && !(jt(n, p) == `
` || jt(n, p) == "\r"); ++p)
            ;
          continue;
        }
        if (f == "$") {
          for (var $ = p, v = -1; p < d && (f = jt(n, p), !(f == "\r" || f == `
`)); ++p)
            if (f == "=") {
              v = p;
              break;
            }
          if (v >= 0)
            for (v == $ + 4 && jt(n, $ + 1) == "f" && jt(n, $ + 2) == "p" && jt(n, $ + 3) == "s", p = v + 1; p < d && (f = jt(n, p), !(f == "\r" || f == `
`)); ++p)
              f == "," || f == " " || f == "	" || (yt._$LS(n, d, p, u), p = u[0]);
          for (; p < d && !(jt(n, p) == `
` || jt(n, p) == "\r"); ++p)
            ;
          continue;
        }
        if (97 <= y && y <= 122 || 65 <= y && y <= 90 || f == "_") {
          for (var $ = p, v = -1; p < d && (f = jt(n, p), !(f == "\r" || f == `
`)); ++p)
            if (f == "=") {
              v = p;
              break;
            }
          if (v >= 0) {
            var x = new ft();
            yt.startsWith(n, $, It._$cs) ? (x._$RP = ft._$hs, x._$4P = yt.createString(n, $, v - $)) : yt.startsWith(n, $, It._$ar) ? (x._$4P = yt.createString(n, $ + 7, v - $ - 7), yt.startsWith(n, $ + 7, "ANCHOR_X") ? x._$RP = ft._$xs : yt.startsWith(n, $ + 7, "ANCHOR_Y") ? x._$RP = ft._$us : yt.startsWith(n, $ + 7, "SCALE_X") ? x._$RP = ft._$qs : yt.startsWith(n, $ + 7, "SCALE_Y") ? x._$RP = ft._$Ys : yt.startsWith(n, $ + 7, "X") ? x._$RP = ft._$ws : yt.startsWith(n, $ + 7, "Y") && (x._$RP = ft._$Ns)) : (x._$RP = ft._$Fr, x._$4P = yt.createString(n, $, v - $)), a.motions.push(x);
            var E = 0, b = [];
            for (p = v + 1; p < d && (f = jt(n, p), !(f == "\r" || f == `
`)); ++p)
              f == "," || f == " " || f == "	" || yt._$LS(n, d, p, u);
            x._$I0 = new Float32Array(b), E > a._$yT && (a._$yT = E);
          }
        }
      }
    }
    return a._$rr = 1e3 * a._$yT / a._$D0 | 0, a;
  }, It.prototype.getDurationMSec = function() {
    return this._$E ? -1 : this._$rr;
  }, It.prototype.getLoopDurationMSec = function() {
    return this._$rr;
  }, It.prototype.dump = function() {
    for (var n = 0; n < this.motions.length; n++) {
      var a = this.motions[n];
      console.log("_$wL[%s] [%d]. ", a._$4P, a._$I0.length);
      for (var u = 0; u < a._$I0.length && u < 10; u++)
        console.log("%5.2f ,", a._$I0[u]);
      console.log(`
`);
    }
  }, It.prototype.updateParamExe = function(n, a, u, d) {
    for (var p = a - d._$z2, f = p * this._$D0 / 1e3, y = f | 0, $ = f - y, v = 0; v < this.motions.length; v++) {
      var x = this.motions[v], E = x._$I0.length, b = x._$4P;
      if (x._$RP == ft._$hs) {
        var A = x._$I0[y >= E ? E - 1 : y];
        n.setParamFloat(b, A);
      } else if (!(ft._$ws <= x._$RP && x._$RP <= ft._$Ys)) {
        var C = n.getParamIndex(b), O = n.getModelContext(), P = O.getParamMax(C), k = O.getParamMin(C), N = 0.4, G = N * (P - k), U = O.getParamFloat(C), it = x._$I0[y >= E ? E - 1 : y], W = x._$I0[y + 1 >= E ? E - 1 : y + 1], z;
        it < W && W - it > G || it > W && it - W > G ? z = it : z = it + (W - it) * $;
        var X = U + (z - U) * u;
        n.setParamFloat(b, X);
      }
    }
    y >= this._$yT && (this._$E ? (d._$z2 = a, this.loopFadeIn && (d._$bs = a)) : d._$9L = !0), this._$eP = u;
  }, It.prototype._$r0 = function() {
    return this._$E;
  }, It.prototype._$aL = function(n) {
    this._$E = n;
  }, It.prototype._$S0 = function() {
    return this._$D0;
  }, It.prototype._$U0 = function(n) {
    this._$D0 = n;
  }, It.prototype.isLoopFadeIn = function() {
    return this.loopFadeIn;
  }, It.prototype.setLoopFadeIn = function(n) {
    this.loopFadeIn = n;
  };
  function Te() {
    this._$P = new Float32Array(100), this.size = 0;
  }
  Te.prototype.clear = function() {
    this.size = 0;
  }, Te.prototype.add = function(n) {
    if (this._$P.length <= this.size) {
      var a = new Float32Array(this.size * 2);
      mt._$jT(this._$P, 0, a, 0, this.size), this._$P = a;
    }
    this._$P[this.size++] = n;
  }, Te.prototype._$BL = function() {
    var n = new Float32Array(this.size);
    return mt._$jT(this._$P, 0, n, 0, this.size), n;
  };
  function ft() {
    this._$4P = null, this._$I0 = null, this._$RP = null;
  }
  ft._$Fr = 0, ft._$hs = 1, ft._$ws = 100, ft._$Ns = 101, ft._$xs = 102, ft._$us = 103, ft._$qs = 104, ft._$Ys = 105;
  function oe() {
    wt || (pt.prototype.constructor.call(this), this._$o = 0, this._$A = 0, this._$GS = null, this._$Eo = null);
  }
  oe.prototype = new pt(), oe._$gT = new Array(), oe.prototype._$zP = function() {
    this._$GS = new Yt(), this._$GS._$zP();
  }, oe.prototype._$F0 = function(n) {
    pt.prototype._$F0.call(this, n), this._$A = n._$6L(), this._$o = n._$6L(), this._$GS = n._$nP(), this._$Eo = n._$nP(), pt.prototype.readV2_opacity.call(this, n);
  }, oe.prototype.init = function(n) {
    var a = new ir(this), u = (this._$o + 1) * (this._$A + 1);
    return a._$Cr != null && (a._$Cr = null), a._$Cr = new Float32Array(u * 2), a._$hr != null && (a._$hr = null), this._$32() ? a._$hr = new Float32Array(u * 2) : a._$hr = null, a;
  }, oe.prototype._$Nr = function(n, a) {
    var u = a;
    if (this._$GS._$Ur(n)) {
      var d = this._$VT(), p = oe._$gT;
      p[0] = !1, At._$Vr(n, this._$GS, p, d, this._$Eo, u._$Cr, 0, 2), a._$Ib(p[0]), this.interpolateOpacity(n, this._$GS, a, p);
    }
  }, oe.prototype._$2b = function(n, a) {
    var u = a;
    if (u._$hS(!0), !this._$32())
      u.setTotalOpacity(u.getInterpolatedOpacity());
    else {
      var d = this.getTargetBaseDataID();
      if (u._$8r == pt._$ur && (u._$8r = n.getBaseDataIndex(d)), u._$8r < 0)
        F._$so && h._$li("_$L _$0P _$G :: %s", d), u._$hS(!1);
      else {
        var p = n.getBaseData(u._$8r), f = n._$q2(u._$8r);
        if (p != null && f._$yo()) {
          var y = f.getTotalScale();
          u.setTotalScale_notForClient(y);
          var $ = f.getTotalOpacity();
          u.setTotalOpacity($ * u.getInterpolatedOpacity()), p._$nb(n, f, u._$Cr, u._$hr, this._$VT(), 0, 2), u._$hS(!0);
        } else
          u._$hS(!1);
      }
    }
  }, oe.prototype._$nb = function(n, a, u, d, p, f, y) {
    {
      var $ = a, v = $._$hr != null ? $._$hr : $._$Cr;
      oe.transformPoints_sdk2(u, d, p, f, y, v, this._$o, this._$A);
    }
  }, oe.transformPoints_sdk2 = function(n, a, u, d, p, f, y, $) {
    for (var v = u * p, x, E, b, A = 0, C = 0, O = 0, P = 0, k = 0, N = 0, G = !1, U = d; U < v; U += p) {
      var it, W, z, X;
      if (z = n[U], X = n[U + 1], it = z * y, W = X * $, it < 0 || W < 0 || y <= it || $ <= W) {
        var Y = y + 1;
        if (!G) {
          G = !0, A = 0.25 * (f[(0 + 0 * Y) * 2] + f[(y + 0 * Y) * 2] + f[(0 + $ * Y) * 2] + f[(y + $ * Y) * 2]), C = 0.25 * (f[(0 + 0 * Y) * 2 + 1] + f[(y + 0 * Y) * 2 + 1] + f[(0 + $ * Y) * 2 + 1] + f[(y + $ * Y) * 2 + 1]);
          var Lt = f[(y + $ * Y) * 2] - f[(0 + 0 * Y) * 2], Ht = f[(y + $ * Y) * 2 + 1] - f[(0 + 0 * Y) * 2 + 1], Ut = f[(y + 0 * Y) * 2] - f[(0 + $ * Y) * 2], se = f[(y + 0 * Y) * 2 + 1] - f[(0 + $ * Y) * 2 + 1];
          O = (Lt + Ut) * 0.5, P = (Ht + se) * 0.5, k = (Lt - Ut) * 0.5, N = (Ht - se) * 0.5, A -= 0.5 * (O + k), C -= 0.5 * (P + N);
        }
        if (-2 < z && z < 3 && -2 < X && X < 3)
          if (z <= 0)
            if (X <= 0) {
              var ut = f[(0 + 0 * Y) * 2], ot = f[(0 + 0 * Y) * 2 + 1], ct = A - 2 * O, vt = C - 2 * P, _t = A - 2 * k, gt = C - 2 * N, tt = A - 2 * O - 2 * k, nt = C - 2 * P - 2 * N, et = 0.5 * (z - -2), st = 0.5 * (X - -2);
              et + st <= 1 ? (a[U] = tt + (_t - tt) * et + (ct - tt) * st, a[U + 1] = nt + (gt - nt) * et + (vt - nt) * st) : (a[U] = ut + (ct - ut) * (1 - et) + (_t - ut) * (1 - st), a[U + 1] = ot + (vt - ot) * (1 - et) + (gt - ot) * (1 - st));
            } else if (X >= 1) {
              var _t = f[(0 + $ * Y) * 2], gt = f[(0 + $ * Y) * 2 + 1], tt = A - 2 * O + 1 * k, nt = C - 2 * P + 1 * N, ut = A + 3 * k, ot = C + 3 * N, ct = A - 2 * O + 3 * k, vt = C - 2 * P + 3 * N, et = 0.5 * (z - -2), st = 0.5 * (X - 1);
              et + st <= 1 ? (a[U] = tt + (_t - tt) * et + (ct - tt) * st, a[U + 1] = nt + (gt - nt) * et + (vt - nt) * st) : (a[U] = ut + (ct - ut) * (1 - et) + (_t - ut) * (1 - st), a[U + 1] = ot + (vt - ot) * (1 - et) + (gt - ot) * (1 - st));
            } else {
              var Et = W | 0;
              Et == $ && (Et = $ - 1);
              var et = 0.5 * (z - -2), st = W - Et, fe = Et / $, Ot = (Et + 1) / $, _t = f[(0 + Et * Y) * 2], gt = f[(0 + Et * Y) * 2 + 1], ut = f[(0 + (Et + 1) * Y) * 2], ot = f[(0 + (Et + 1) * Y) * 2 + 1], tt = A - 2 * O + fe * k, nt = C - 2 * P + fe * N, ct = A - 2 * O + Ot * k, vt = C - 2 * P + Ot * N;
              et + st <= 1 ? (a[U] = tt + (_t - tt) * et + (ct - tt) * st, a[U + 1] = nt + (gt - nt) * et + (vt - nt) * st) : (a[U] = ut + (ct - ut) * (1 - et) + (_t - ut) * (1 - st), a[U + 1] = ot + (vt - ot) * (1 - et) + (gt - ot) * (1 - st));
            }
          else if (1 <= z)
            if (X <= 0) {
              var ct = f[(y + 0 * Y) * 2], vt = f[(y + 0 * Y) * 2 + 1], ut = A + 3 * O, ot = C + 3 * P, tt = A + 1 * O - 2 * k, nt = C + 1 * P - 2 * N, _t = A + 3 * O - 2 * k, gt = C + 3 * P - 2 * N, et = 0.5 * (z - 1), st = 0.5 * (X - -2);
              et + st <= 1 ? (a[U] = tt + (_t - tt) * et + (ct - tt) * st, a[U + 1] = nt + (gt - nt) * et + (vt - nt) * st) : (a[U] = ut + (ct - ut) * (1 - et) + (_t - ut) * (1 - st), a[U + 1] = ot + (vt - ot) * (1 - et) + (gt - ot) * (1 - st));
            } else if (X >= 1) {
              var tt = f[(y + $ * Y) * 2], nt = f[(y + $ * Y) * 2 + 1], _t = A + 3 * O + 1 * k, gt = C + 3 * P + 1 * N, ct = A + 1 * O + 3 * k, vt = C + 1 * P + 3 * N, ut = A + 3 * O + 3 * k, ot = C + 3 * P + 3 * N, et = 0.5 * (z - 1), st = 0.5 * (X - 1);
              et + st <= 1 ? (a[U] = tt + (_t - tt) * et + (ct - tt) * st, a[U + 1] = nt + (gt - nt) * et + (vt - nt) * st) : (a[U] = ut + (ct - ut) * (1 - et) + (_t - ut) * (1 - st), a[U + 1] = ot + (vt - ot) * (1 - et) + (gt - ot) * (1 - st));
            } else {
              var Et = W | 0;
              Et == $ && (Et = $ - 1);
              var et = 0.5 * (z - 1), st = W - Et, fe = Et / $, Ot = (Et + 1) / $, tt = f[(y + Et * Y) * 2], nt = f[(y + Et * Y) * 2 + 1], ct = f[(y + (Et + 1) * Y) * 2], vt = f[(y + (Et + 1) * Y) * 2 + 1], _t = A + 3 * O + fe * k, gt = C + 3 * P + fe * N, ut = A + 3 * O + Ot * k, ot = C + 3 * P + Ot * N;
              et + st <= 1 ? (a[U] = tt + (_t - tt) * et + (ct - tt) * st, a[U + 1] = nt + (gt - nt) * et + (vt - nt) * st) : (a[U] = ut + (ct - ut) * (1 - et) + (_t - ut) * (1 - st), a[U + 1] = ot + (vt - ot) * (1 - et) + (gt - ot) * (1 - st));
            }
          else if (X <= 0) {
            var $t = it | 0;
            $t == y && ($t = y - 1);
            var et = it - $t, st = 0.5 * (X - -2), Zt = $t / y, Mt = ($t + 1) / y, ct = f[($t + 0 * Y) * 2], vt = f[($t + 0 * Y) * 2 + 1], ut = f[($t + 1 + 0 * Y) * 2], ot = f[($t + 1 + 0 * Y) * 2 + 1], tt = A + Zt * O - 2 * k, nt = C + Zt * P - 2 * N, _t = A + Mt * O - 2 * k, gt = C + Mt * P - 2 * N;
            et + st <= 1 ? (a[U] = tt + (_t - tt) * et + (ct - tt) * st, a[U + 1] = nt + (gt - nt) * et + (vt - nt) * st) : (a[U] = ut + (ct - ut) * (1 - et) + (_t - ut) * (1 - st), a[U + 1] = ot + (vt - ot) * (1 - et) + (gt - ot) * (1 - st));
          } else if (X >= 1) {
            var $t = it | 0;
            $t == y && ($t = y - 1);
            var et = it - $t, st = 0.5 * (X - 1), Zt = $t / y, Mt = ($t + 1) / y, tt = f[($t + $ * Y) * 2], nt = f[($t + $ * Y) * 2 + 1], _t = f[($t + 1 + $ * Y) * 2], gt = f[($t + 1 + $ * Y) * 2 + 1], ct = A + Zt * O + 3 * k, vt = C + Zt * P + 3 * N, ut = A + Mt * O + 3 * k, ot = C + Mt * P + 3 * N;
            et + st <= 1 ? (a[U] = tt + (_t - tt) * et + (ct - tt) * st, a[U + 1] = nt + (gt - nt) * et + (vt - nt) * st) : (a[U] = ut + (ct - ut) * (1 - et) + (_t - ut) * (1 - st), a[U + 1] = ot + (vt - ot) * (1 - et) + (gt - ot) * (1 - st));
          } else
            System.err.printf(`_$li calc : %.4f , %.4f					@@BDBoxGrid
`, z, X);
        else
          a[U] = A + z * O + X * k, a[U + 1] = C + z * P + X * N;
      } else
        E = it - (it | 0), b = W - (W | 0), x = 2 * ((it | 0) + (W | 0) * (y + 1)), E + b < 1 ? (a[U] = f[x] * (1 - E - b) + f[x + 2] * E + f[x + 2 * (y + 1)] * b, a[U + 1] = f[x + 1] * (1 - E - b) + f[x + 3] * E + f[x + 2 * (y + 1) + 1] * b) : (a[U] = f[x + 2 * (y + 1) + 2] * (E - 1 + b) + f[x + 2 * (y + 1)] * (1 - E) + f[x + 2] * (1 - b), a[U + 1] = f[x + 2 * (y + 1) + 3] * (E - 1 + b) + f[x + 2 * (y + 1) + 1] * (1 - E) + f[x + 3] * (1 - b));
    }
  }, oe.prototype.transformPoints_sdk1 = function(n, a, u, d, p, f, y) {
    for (var $ = a, v, x, E = this._$o, b = this._$A, A = p * y, C, O, P, k, N, G = $._$hr != null ? $._$hr : $._$Cr, U = f; U < A; U += y)
      F._$ts ? (v = u[U], x = u[U + 1], v < 0 ? v = 0 : v > 1 && (v = 1), x < 0 ? x = 0 : x > 1 && (x = 1), v *= E, x *= b, C = v | 0, O = x | 0, C > E - 1 && (C = E - 1), O > b - 1 && (O = b - 1), k = v - C, N = x - O, P = 2 * (C + O * (E + 1))) : (v = u[U] * E, x = u[U + 1] * b, k = v - (v | 0), N = x - (x | 0), P = 2 * ((v | 0) + (x | 0) * (E + 1))), k + N < 1 ? (d[U] = G[P] * (1 - k - N) + G[P + 2] * k + G[P + 2 * (E + 1)] * N, d[U + 1] = G[P + 1] * (1 - k - N) + G[P + 3] * k + G[P + 2 * (E + 1) + 1] * N) : (d[U] = G[P + 2 * (E + 1) + 2] * (k - 1 + N) + G[P + 2 * (E + 1)] * (1 - k) + G[P + 2] * (1 - N), d[U + 1] = G[P + 2 * (E + 1) + 3] * (k - 1 + N) + G[P + 2 * (E + 1) + 1] * (1 - k) + G[P + 3] * (1 - N));
  }, oe.prototype._$VT = function() {
    return (this._$o + 1) * (this._$A + 1);
  }, oe.prototype.getType = function() {
    return pt._$_b;
  };
  function ir(n) {
    Ie.prototype.constructor.call(this, n), this._$8r = pt._$ur, this._$Cr = null, this._$hr = null;
  }
  ir.prototype = new Ie();
  function ae() {
    wt || (this.visible = !0, this._$g0 = !1, this._$NL = null, this._$3S = null, this._$aS = null, ae._$42++);
  }
  ae._$42 = 0, ae.prototype._$zP = function() {
    this._$3S = new Array(), this._$aS = new Array();
  }, ae.prototype._$F0 = function(n) {
    this._$g0 = n._$8L(), this.visible = n._$8L(), this._$NL = n._$nP(), this._$3S = n._$nP(), this._$aS = n._$nP();
  }, ae.prototype.init = function(n) {
    var a = new ns(this);
    return a.setPartsOpacity(this.isVisible() ? 1 : 0), a;
  }, ae.prototype._$6o = function(n) {
    if (this._$3S == null)
      throw new Error("_$3S _$6 _$Wo@_$6o");
    this._$3S.push(n);
  }, ae.prototype._$3o = function(n) {
    if (this._$aS == null)
      throw new Error("_$aS _$6 _$Wo@_$3o");
    this._$aS.push(n);
  }, ae.prototype._$Zo = function(n) {
    this._$3S = n;
  }, ae.prototype._$xo = function(n) {
    this._$aS = n;
  }, ae.prototype.isVisible = function() {
    return this.visible;
  }, ae.prototype._$uL = function() {
    return this._$g0;
  }, ae.prototype._$KP = function(n) {
    this.visible = n;
  }, ae.prototype._$ET = function(n) {
    this._$g0 = n;
  }, ae.prototype.getBaseData = function() {
    return this._$3S;
  }, ae.prototype.getDrawData = function() {
    return this._$aS;
  }, ae.prototype._$p2 = function() {
    return this._$NL;
  }, ae.prototype._$ob = function(n) {
    this._$NL = n;
  }, ae.prototype.getPartsID = function() {
    return this._$NL;
  }, ae.prototype._$MP = function(n) {
    this._$NL = n;
  };
  function ns(n) {
    this._$VS = null, this._$e0 = null, this._$e0 = n;
  }
  ns.prototype = new g(), ns.prototype.getPartsOpacity = function() {
    return this._$VS;
  }, ns.prototype.setPartsOpacity = function(n) {
    this._$VS = n;
  };
  function sr(n) {
    wt || (this.id = n);
  }
  sr._$L7 = function() {
    T._$27(), he._$27(), ne._$27(), _._$27();
  }, sr.prototype.toString = function() {
    return this.id;
  };
  function ti() {
    wt || (this._$4S = null);
  }
  ti.prototype._$1s = function() {
    return this._$4S;
  }, ti.prototype._$zP = function() {
    this._$4S = new Array();
  }, ti.prototype._$F0 = function(n) {
    this._$4S = n._$nP();
  }, ti.prototype._$Ks = function(n) {
    this._$4S.push(n);
  };
  function te(n, a) {
    this.canvas = n, this.context = a, this.viewport = new Array(0, 0, n.width, n.height), this._$6r = 1, this._$xP = 0, this._$3r = 1, this._$uP = 0, this._$Qo = -1, this.cacheImages = {};
  }
  te.tr = new Fe(), te._$50 = new Fe(), te._$Ti = new Array(0, 0), te._$Pi = new Array(0, 0), te._$B = new Array(0, 0), te.prototype._$lP = function(n, a, u, d) {
    this.viewport = new Array(n, a, u, d);
  }, te.prototype._$bL = function() {
    this.context.save();
    var n = this.viewport;
    n != null && (this.context.beginPath(), this.context._$Li(n[0], n[1], n[2], n[3]), this.context.clip());
  }, te.prototype._$ei = function() {
    this.context.restore();
  }, te.prototype.drawElements = function(n, a, u, d, p, f, y, $) {
    try {
      p != this._$Qo && (this._$Qo = p, this.context.globalAlpha = p);
      for (var v = a.length, x = n.width, E = n.height, b = this.context, A = this._$xP, C = this._$uP, O = this._$6r, P = this._$3r, k = te.tr, N = te._$Ti, G = te._$Pi, U = te._$B, it = 0; it < v; it += 3) {
        b.save();
        var W = a[it], z = a[it + 1], X = a[it + 2], Y = A + O * u[W * 2], Lt = C + P * u[W * 2 + 1], Ht = A + O * u[z * 2], Ut = C + P * u[z * 2 + 1], se = A + O * u[X * 2], ut = C + P * u[X * 2 + 1];
        y && (y._$PS(Y, Lt, U), Y = U[0], Lt = U[1], y._$PS(Ht, Ut, U), Ht = U[0], Ut = U[1], y._$PS(se, ut, U), se = U[0], ut = U[1]);
        var ot = x * d[W * 2], ct = E - E * d[W * 2 + 1], vt = x * d[z * 2], _t = E - E * d[z * 2 + 1], gt = x * d[X * 2], tt = E - E * d[X * 2 + 1], nt = Math.atan2(_t - ct, vt - ot), et = Math.atan2(Ut - Lt, Ht - Y), st = Ht - Y, Et = Ut - Lt, fe = Math.sqrt(st * st + Et * Et), Ot = vt - ot, $t = _t - ct, Zt = Math.sqrt(Ot * Ot + $t * $t), Mt = fe / Zt;
        Q._$ni(gt, tt, ot, ct, vt - ot, _t - ct, -(_t - ct), vt - ot, N), Q._$ni(se, ut, Y, Lt, Ht - Y, Ut - Lt, -(Ut - Lt), Ht - Y, G);
        var we = (G[0] - N[0]) / N[1], qt = Math.min(ot, vt, gt), Ee = Math.max(ot, vt, gt), ue = Math.min(ct, _t, tt), Ge = Math.max(ct, _t, tt), nr = Math.floor(qt), ze = Math.floor(ue), Xe = Math.ceil(Ee), de = Math.ceil(Ge);
        k.identity(), k.translate(Y, Lt), k.rotate(et), k.scale(1, G[1] / N[1]), k.shear(we, 0), k.scale(Mt, Mt), k.rotate(-nt), k.translate(-ot, -ct), k.setContext(b);
        var Ir = !0, Lr = 1.2;
        if (f || (f = Ir ? Lr : 0), F.IGNORE_EXPAND && (f = 0), F.USE_CACHED_POLYGON_IMAGE) {
          var Ze = $._$e0;
          if (Ze.gl_cacheImage = Ze.gl_cacheImage || {}, !Ze.gl_cacheImage[it]) {
            var wr = te.createCanvas(Xe - nr, de - ze);
            F.DEBUG_DATA.LDGL_CANVAS_MB = F.DEBUG_DATA.LDGL_CANVAS_MB || 0, F.DEBUG_DATA.LDGL_CANVAS_MB += (Xe - nr) * (de - ze) * 4;
            var or = wr.getContext("2d");
            or.translate(-nr, -ze), te.clip(or, k, f, fe, ot, ct, vt, _t, gt, tt, Y, Lt, Ht, Ut, se, ut), or.drawImage(n, 0, 0), Ze.gl_cacheImage[it] = { cacheCanvas: wr, cacheContext: or };
          }
          b.drawImage(Ze.gl_cacheImage[it].cacheCanvas, nr, ze);
        } else
          F.IGNORE_CLIP || te.clip(b, k, f, fe, ot, ct, vt, _t, gt, tt, Y, Lt, Ht, Ut, se, ut), F.USE_ADJUST_TRANSLATION && (qt = 0, Ee = x, ue = 0, Ge = E), b.drawImage(n, qt, ue, Ee - qt, Ge - ue, qt, ue, Ee - qt, Ge - ue);
        b.restore();
      }
    } catch (kt) {
      h._$Rb(kt);
    }
  }, te.clip = function(n, a, u, d, p, f, y, $, v, x, E, b, A, C, O, P) {
    u > 0.02 ? te.expandClip(n, a, u, d, E, b, A, C, O, P) : te.clipWithTransform(n, null, p, f, y, $, v, x);
  }, te.expandClip = function(n, a, u, d, p, f, y, $, v, x) {
    var E = y - p, b = $ - f, A = v - p, C = x - f, O = E * C - b * A > 0 ? u : -u, P = -b, k = E, N = v - y, G = x - $, U = -G, it = N, W = Math.sqrt(N * N + G * G), z = -C, X = A, Y = Math.sqrt(A * A + C * C), Lt = p - O * P / d, Ht = f - O * k / d, Ut = y - O * P / d, se = $ - O * k / d, ut = y - O * U / W, ot = $ - O * it / W, ct = v - O * U / W, vt = x - O * it / W, _t = p + O * z / Y, gt = f + O * X / Y, tt = v + O * z / Y, nt = x + O * X / Y, et = te._$50, st = a._$P2(et);
    return st == null ? !1 : (te.clipWithTransform(n, et, Lt, Ht, Ut, se, ut, ot, ct, vt, tt, nt, _t, gt), !0);
  }, te.clipWithTransform = function(n, a, u, d, p, f, y, $) {
    if (arguments.length < 1 + 3 * 2) {
      h._$li("err : @LDGL.clip()");
      return;
    }
    if (!(arguments[1] instanceof Fe)) {
      h._$li("err : a[0] is _$6 LDTransform @LDGL.clip()");
      return;
    }
    var v = te._$B, x = a, E = arguments;
    if (n.beginPath(), x) {
      x._$PS(E[2], E[3], v), n.moveTo(v[0], v[1]);
      for (var b = 4; b < E.length; b += 2)
        x._$PS(E[b], E[b + 1], v), n.lineTo(v[0], v[1]);
    } else {
      n.moveTo(E[2], E[3]);
      for (var b = 4; b < E.length; b += 2)
        n.lineTo(E[b], E[b + 1]);
    }
    n.clip();
  }, te.createCanvas = function(n, a) {
    var u = document.createElement("canvas");
    return u.setAttribute("width", n), u.setAttribute("height", a), u || h._$li("err : " + u), u;
  }, te.dumpValues = function() {
    for (var n = "", a = 0; a < arguments.length; a++)
      n += "[" + a + "]= " + arguments[a].toFixed(3) + " , ";
    console.log(n);
  };
  function ei() {
    wt || (this._$TT = null, this._$LT = null, this._$FS = null, this._$wL = null);
  }
  ei.prototype._$F0 = function(n) {
    this._$TT = n._$_T(), this._$LT = n._$_T(), this._$FS = n._$_T(), this._$wL = n._$nP();
  }, ei.prototype.getMinValue = function() {
    return this._$TT;
  }, ei.prototype.getMaxValue = function() {
    return this._$LT;
  }, ei.prototype.getDefaultValue = function() {
    return this._$FS;
  }, ei.prototype.getParamID = function() {
    return this._$wL;
  };
  function Ie(n) {
    wt || (this._$e0 = null, this._$IP = null, this._$JS = !1, this._$AT = !0, this._$e0 = n, this.totalScale = 1, this._$7s = 1, this.totalOpacity = 1);
  }
  Ie.prototype._$yo = function() {
    return this._$AT && !this._$JS;
  }, Ie.prototype._$hS = function(n) {
    this._$AT = n;
  }, Ie.prototype._$GT = function() {
    return this._$e0;
  }, Ie.prototype._$l2 = function(n) {
    this._$IP = n;
  }, Ie.prototype.getPartsIndex = function() {
    return this._$IP;
  }, Ie.prototype._$x2 = function() {
    return this._$JS;
  }, Ie.prototype._$Ib = function(n) {
    this._$JS = n;
  }, Ie.prototype.getTotalScale = function() {
    return this.totalScale;
  }, Ie.prototype.setTotalScale_notForClient = function(n) {
    this.totalScale = n;
  }, Ie.prototype.getInterpolatedOpacity = function() {
    return this._$7s;
  }, Ie.prototype.setInterpolatedOpacity = function(n) {
    this._$7s = n;
  }, Ie.prototype.getTotalOpacity = function(n) {
    return this.totalOpacity;
  }, Ie.prototype.setTotalOpacity = function(n) {
    this.totalOpacity = n;
  };
  function F() {
  }
  F._$2s = "2.1.00_1", F._$Kr = 201001e3, F._$sP = !0, F._$so = !0, F._$cb = !1, F._$3T = !0, F._$Ts = !0, F._$fb = !0, F._$ts = !0, F.L2D_DEFORMER_EXTEND = !0, F._$Wb = !1, F._$yr = !1, F._$Zs = !1, F.L2D_NO_ERROR = 0, F._$i7 = 1e3, F._$9s = 1001, F._$es = 1100, F._$r7 = 2e3, F._$07 = 2001, F._$b7 = 2002, F._$H7 = 4e3, F.L2D_COLOR_BLEND_MODE_MULT = 0, F.L2D_COLOR_BLEND_MODE_ADD = 1, F.L2D_COLOR_BLEND_MODE_INTERPOLATE = 2, F._$6b = !0, F._$cT = 0, F.clippingMaskBufferSize = 256, F.glContext = new Array(), F.frameBuffers = new Array(), F.fTexture = new Array(), F.IGNORE_CLIP = !1, F.IGNORE_EXPAND = !1, F.EXPAND_W = 2, F.USE_ADJUST_TRANSLATION = !0, F.USE_CANVAS_TRANSFORM = !0, F.USE_CACHED_POLYGON_IMAGE = !1, F.DEBUG_DATA = {}, F.PROFILE_IOS_SPEED = { PROFILE_NAME: "iOS Speed", USE_ADJUST_TRANSLATION: !0, USE_CACHED_POLYGON_IMAGE: !0, EXPAND_W: 4 }, F.PROFILE_IOS_QUALITY = { PROFILE_NAME: "iOS HiQ", USE_ADJUST_TRANSLATION: !0, USE_CACHED_POLYGON_IMAGE: !1, EXPAND_W: 2 }, F.PROFILE_IOS_DEFAULT = F.PROFILE_IOS_QUALITY, F.PROFILE_ANDROID = { PROFILE_NAME: "Android", USE_ADJUST_TRANSLATION: !1, USE_CACHED_POLYGON_IMAGE: !1, EXPAND_W: 2 }, F.PROFILE_DESKTOP = { PROFILE_NAME: "Desktop", USE_ADJUST_TRANSLATION: !1, USE_CACHED_POLYGON_IMAGE: !1, EXPAND_W: 2 }, F.initProfile = function() {
    Bt.isIOS() ? F.setupProfile(F.PROFILE_IOS_DEFAULT) : Bt.isAndroid() ? F.setupProfile(F.PROFILE_ANDROID) : F.setupProfile(F.PROFILE_DESKTOP);
  }, F.setupProfile = function(n, a) {
    if (typeof n == "number")
      switch (n) {
        case 9901:
          n = F.PROFILE_IOS_SPEED;
          break;
        case 9902:
          n = F.PROFILE_IOS_QUALITY;
          break;
        case 9903:
          n = F.PROFILE_IOS_DEFAULT;
          break;
        case 9904:
          n = F.PROFILE_ANDROID;
          break;
        case 9905:
          n = F.PROFILE_DESKTOP;
          break;
        default:
          alert("profile _$6 _$Ui : " + n);
          break;
      }
    arguments.length < 2 && (a = !0), a && console.log("profile : " + n.PROFILE_NAME);
    for (var u in n)
      F[u] = n[u], a && console.log("  [" + u + "] = " + n[u]);
  }, F.init = function() {
    F._$6b && (console.log("Live2D %s", F._$2s), F._$6b = !1, F.initProfile());
  }, F.getVersionStr = function() {
    return F._$2s;
  }, F.getVersionNo = function() {
    return F._$Kr;
  }, F._$sT = function(n) {
    F._$cT = n;
  }, F.getError = function() {
    var n = F._$cT;
    return F._$cT = 0, n;
  }, F.dispose = function() {
    F.glContext = [], F.frameBuffers = [], F.fTexture = [];
  }, F.setGL = function(n, a) {
    var u = a || 0;
    F.glContext[u] = n;
  }, F.getGL = function(n) {
    return F.glContext[n];
  }, F.setClippingMaskBufferSize = function(n) {
    F.clippingMaskBufferSize = n;
  }, F.getClippingMaskBufferSize = function() {
    return F.clippingMaskBufferSize;
  }, F.deleteBuffer = function(n) {
    var a = F.getGL(n);
    a.deleteFramebuffer(F.frameBuffers[n].framebuffer), delete F.frameBuffers[n], delete F.glContext[n];
  };
  function cn() {
  }
  cn._$r2 = function(n) {
    return n < 0 ? 0 : n > 1 ? 1 : 0.5 - 0.5 * Math.cos(n * ce.PI_F);
  };
  function He(n) {
    wt || (this._$ib = n);
  }
  He._$fr = -1, He.prototype.toString = function() {
    return this._$ib;
  };
  function Ft() {
    wt || (lt.prototype.constructor.call(this), this._$LP = -1, this._$d0 = 0, this._$Yo = 0, this._$JP = null, this._$5P = null, this._$BP = null, this._$Eo = null, this._$Qi = null, this._$6s = Ft._$ms, this.culling = !0, this.gl_cacheImage = null, this.instanceNo = Ft._$42++);
  }
  Ft.prototype = new lt(), Ft._$42 = 0, Ft._$Os = 30, Ft._$ms = 0, Ft._$ns = 1, Ft._$_s = 2, Ft._$gT = new Array(), Ft.prototype._$_S = function(n) {
    this._$LP = n;
  }, Ft.prototype.getTextureNo = function() {
    return this._$LP;
  }, Ft.prototype._$ZL = function() {
    return this._$Qi;
  }, Ft.prototype._$H2 = function() {
    return this._$JP;
  }, Ft.prototype.getNumPoints = function() {
    return this._$d0;
  }, Ft.prototype.getType = function() {
    return lt._$wb;
  }, Ft.prototype._$B2 = function(n, a, u) {
    var d = a, p = d._$hr != null ? d._$hr : d._$Cr, f = V._$do;
    switch (f) {
      default:
      case V._$Ms:
        throw new Error("_$L _$ro ");
      case V._$Qs:
        for (var y = this._$d0 - 1; y >= 0; --y) {
          var $ = y * V._$No;
          p[$ + 4] = u;
        }
        break;
    }
  }, Ft.prototype._$zP = function() {
    this._$GS = new Yt(), this._$GS._$zP();
  }, Ft.prototype._$F0 = function(n) {
    lt.prototype._$F0.call(this, n), this._$LP = n._$6L(), this._$d0 = n._$6L(), this._$Yo = n._$6L();
    var a = n._$nP();
    this._$BP = new Int16Array(this._$Yo * 3);
    for (var u = this._$Yo * 3 - 1; u >= 0; --u)
      this._$BP[u] = a[u];
    if (this._$Eo = n._$nP(), this._$Qi = n._$nP(), n.getFormatVersion() >= J._$s7) {
      if (this._$JP = n._$6L(), this._$JP != 0) {
        if (this._$JP & 1) {
          var d = n._$6L();
          this._$5P == null && (this._$5P = new Object()), this._$5P._$Hb = parseInt(d);
        }
        this._$JP & Ft._$Os ? this._$6s = (this._$JP & Ft._$Os) >> 1 : this._$6s = Ft._$ms, this._$JP & 32 && (this.culling = !1);
      }
    } else
      this._$JP = 0;
  }, Ft.prototype.init = function(n) {
    var a = new os(this), u = this._$d0 * V._$No, d = this._$32();
    a._$Cr != null && (a._$Cr = null), a._$Cr = new Float32Array(u), a._$hr != null && (a._$hr = null), a._$hr = d ? new Float32Array(u) : null;
    var p = V._$do;
    switch (p) {
      default:
      case V._$Ms:
        if (V._$Ls)
          for (var f = this._$d0 - 1; f >= 0; --f) {
            var y = f << 1;
            this._$Qi[y + 1] = 1 - this._$Qi[y + 1];
          }
        break;
      case V._$Qs:
        for (var f = this._$d0 - 1; f >= 0; --f) {
          var y = f << 1, $ = f * V._$No, v = this._$Qi[y], x = this._$Qi[y + 1];
          a._$Cr[$] = v, a._$Cr[$ + 1] = x, a._$Cr[$ + 4] = 0, d && (a._$hr[$] = v, a._$hr[$ + 1] = x, a._$hr[$ + 4] = 0);
        }
        break;
    }
    return a;
  }, Ft.prototype._$Nr = function(n, a) {
    var u = a;
    if (this != u._$GT() && console.log("### assert!! ### "), !!this._$GS._$Ur(n) && (lt.prototype._$Nr.call(this, n, u), !u._$IS[0])) {
      var d = Ft._$gT;
      d[0] = !1, At._$Vr(n, this._$GS, d, this._$d0, this._$Eo, u._$Cr, V._$i2, V._$No);
    }
  }, Ft.prototype._$2b = function(n, a) {
    try {
      this != a._$GT() && console.log("### assert!! ### ");
      var u = !1;
      a._$IS[0] && (u = !0);
      var d = a;
      if (!u && (lt.prototype._$2b.call(this, n), this._$32())) {
        var p = this.getTargetBaseDataID();
        if (d._$8r == lt._$ur && (d._$8r = n.getBaseDataIndex(p)), d._$8r < 0)
          F._$so && h._$li("_$L _$0P _$G :: %s", p);
        else {
          var f = n.getBaseData(d._$8r), y = n._$q2(d._$8r);
          f != null && !y._$x2() ? (f._$nb(n, y, d._$Cr, d._$hr, this._$d0, V._$i2, V._$No), d._$AT = !0) : d._$AT = !1, d.baseOpacity = y.getTotalOpacity();
        }
      }
    } catch ($) {
      throw $;
    }
  }, Ft.prototype.draw = function(n, a, u) {
    if (this != u._$GT() && console.log("### assert!! ### "), !u._$IS[0]) {
      var d = u, p = this._$LP;
      p < 0 && (p = 1);
      var f = this.getOpacity(a, d) * u._$VS * u.baseOpacity, y = d._$hr != null ? d._$hr : d._$Cr;
      n.setClipBufPre_clipContextForDraw(u.clipBufPre_clipContext), n._$WP(this.culling), n._$Uo(p, 3 * this._$Yo, this._$BP, y, this._$Qi, f, this._$6s, d);
    }
  }, Ft.prototype.dump = function() {
    console.log(`  _$yi( %d ) , _$d0( %d ) , _$Yo( %d ) 
`, this._$LP, this._$d0, this._$Yo), console.log("  _$Oi _$di = { ");
    for (var n = 0; n < this._$BP.length; n++)
      console.log("%5d ,", this._$BP[n]);
    console.log(`
  _$5i _$30`);
    for (var n = 0; n < this._$Eo.length; n++) {
      console.log(`
    _$30[%d] = `, n);
      for (var a = this._$Eo[n], u = 0; u < a.length; u++)
        console.log("%6.2f, ", a[u]);
    }
    console.log(`
`);
  }, Ft.prototype._$72 = function(n) {
    return this._$5P == null ? null : this._$5P[n];
  }, Ft.prototype.getIndexArray = function() {
    return this._$BP;
  };
  function os(n) {
    Li.prototype.constructor.call(this, n), this._$8r = lt._$ur, this._$Cr = null, this._$hr = null;
  }
  os.prototype = new Li(), os.prototype.getTransformedPoints = function() {
    return this._$hr != null ? this._$hr : this._$Cr;
  };
  function fn() {
    wt || (this.x = null, this.y = null);
  }
  fn.prototype._$HT = function(n) {
    this.x = n.x, this.y = n.y;
  }, fn.prototype._$HT = function(n, a) {
    this.x = n, this.y = a;
  };
  function ie(n) {
    wt || (r.prototype.constructor.call(this), this.drawParamWebGL = new le(n), this.drawParamWebGL.setGL(F.getGL(n)));
  }
  ie.prototype = new r(), ie.loadModel = function(n) {
    var a = new ie();
    return r._$62(a, n), a;
  }, ie.loadModel = function(n, a) {
    var u = a || 0, d = new ie(u);
    return r._$62(d, n), d;
  }, ie._$to = function() {
    var n = new ie();
    return n;
  }, ie._$er = function(n) {
    var a = new _$5("../_$_r/_$t0/_$Ri/_$_P._$d");
    if (a.exists() == !1)
      throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + a._$PL());
    for (var u = ["../_$_r/_$t0/_$Ri/_$_P.512/_$CP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$vP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$EP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$pP._$1"], d = ie.loadModel(a._$3b()), p = 0; p < u.length; p++) {
      var f = new _$5(u[p]);
      if (f.exists() == !1)
        throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + f._$PL());
      d.setTexture(p, _$nL._$_o(n, f._$3b()));
    }
    return d;
  }, ie.prototype.setGL = function(n) {
    F.setGL(n);
  }, ie.prototype.setTransform = function(n) {
    this.drawParamWebGL.setTransform(n);
  }, ie.prototype.update = function() {
    this._$5S.update(), this._$5S.preDraw(this.drawParamWebGL);
  }, ie.prototype.draw = function() {
    this._$5S.draw(this.drawParamWebGL);
  }, ie.prototype._$K2 = function() {
    this.drawParamWebGL._$K2();
  }, ie.prototype.setTexture = function(n, a) {
    this.drawParamWebGL == null && h._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this.drawParamWebGL.setTexture(n, a);
  }, ie.prototype.setTexture = function(n, a) {
    this.drawParamWebGL == null && h._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this.drawParamWebGL.setTexture(n, a);
  }, ie.prototype._$Rs = function() {
    return this.drawParamWebGL._$Rs();
  }, ie.prototype._$Ds = function(n) {
    this.drawParamWebGL._$Ds(n);
  }, ie.prototype.getDrawParam = function() {
    return this.drawParamWebGL;
  }, ie.prototype.setMatrix = function(n) {
    this.drawParamWebGL.setMatrix(n);
  }, ie.prototype.setPremultipliedAlpha = function(n) {
    this.drawParamWebGL.setPremultipliedAlpha(n);
  }, ie.prototype.isPremultipliedAlpha = function() {
    return this.drawParamWebGL.isPremultipliedAlpha();
  }, ie.prototype.setAnisotropy = function(n) {
    this.drawParamWebGL.setAnisotropy(n);
  }, ie.prototype.getAnisotropy = function() {
    return this.drawParamWebGL.getAnisotropy();
  };
  function Tr() {
    wt || (this.motions = null, this._$eb = !1, this.motions = new Array());
  }
  Tr.prototype._$tb = function() {
    return this.motions;
  }, Tr.prototype.startMotion = function(n, a) {
    for (var u = null, d = this.motions.length, p = 0; p < d; ++p)
      u = this.motions[p], u != null && (u._$qS(u._$w0.getFadeOut()), this._$eb && h._$Ji(`MotionQueueManager[size:%2d]->startMotion() / start _$K _$3 (m%d)
`, d, u._$sr));
    if (n == null)
      return -1;
    u = new ri(), u._$w0 = n, this.motions.push(u);
    var f = u._$sr;
    return this._$eb && h._$Ji(`MotionQueueManager[size:%2d]->startMotion() / new _$w0 (m%d)
`, d, f), f;
  }, Tr.prototype.updateParam = function(n) {
    try {
      for (var a = !1, u = 0; u < this.motions.length; u++) {
        var d = this.motions[u];
        if (d == null) {
          this.motions.splice(u, 1), u--;
          continue;
        }
        var p = d._$w0;
        if (p == null) {
          this.motions = this.motions.splice(u, 1), u--;
          continue;
        }
        p.updateParam(n, d), a = !0, d.isFinished() && (this._$eb && h._$Ji(`MotionQueueManager[size:%2d]->updateParam() / _$T0 _$w0 (m%d)
`, this.motions.length - 1, d._$sr), this.motions.splice(u, 1), u--);
      }
      return a;
    } catch (f) {
      return h._$li(f), !0;
    }
  }, Tr.prototype.isFinished = function(n) {
    if (arguments.length >= 1) {
      for (var a = 0; a < this.motions.length; a++) {
        var u = this.motions[a];
        if (u != null && u._$sr == n && !u.isFinished())
          return !1;
      }
      return !0;
    } else {
      for (var a = 0; a < this.motions.length; a++) {
        var u = this.motions[a];
        if (u == null) {
          this.motions.splice(a, 1), a--;
          continue;
        }
        var d = u._$w0;
        if (d == null) {
          this.motions.splice(a, 1), a--;
          continue;
        }
        if (!u.isFinished())
          return !1;
      }
      return !0;
    }
  }, Tr.prototype.stopAllMotions = function() {
    for (var n = 0; n < this.motions.length; n++) {
      var a = this.motions[n];
      if (a == null) {
        this.motions.splice(n, 1), n--;
        continue;
      }
      var u = a._$w0;
      if (u == null) {
        this.motions.splice(n, 1), n--;
        continue;
      }
      this.motions.splice(n, 1), n--;
    }
  }, Tr.prototype._$Zr = function(n) {
    this._$eb = n;
  }, Tr.prototype._$e = function() {
    console.log(`-- _$R --
`);
    for (var n = 0; n < this.motions.length; n++) {
      var a = this.motions[n], u = a._$w0;
      console.log(`MotionQueueEnt[%d] :: %s
`, this.motions.length, u.toString());
    }
  };
  function ri() {
    this._$w0 = null, this._$AT = !0, this._$9L = !1, this._$z2 = -1, this._$bs = -1, this._$Do = -1, this._$sr = null, this._$sr = ri._$Gs++;
  }
  ri._$Gs = 0, ri.prototype.isFinished = function() {
    return this._$9L;
  }, ri.prototype._$qS = function(n) {
    var a = mt.getUserTimeMSec(), u = a + n;
    (this._$Do < 0 || u < this._$Do) && (this._$Do = u);
  }, ri.prototype._$Bs = function() {
    return this._$sr;
  };
  function Fe() {
    this.m = new Array(1, 0, 0, 0, 1, 0, 0, 0, 1);
  }
  Fe.prototype.setContext = function(n) {
    var a = this.m;
    n.transform(a[0], a[1], a[3], a[4], a[6], a[7]);
  }, Fe.prototype.toString = function() {
    for (var n = "LDTransform { ", a = 0; a < 9; a++)
      n += this.m[a].toFixed(2) + " ,";
    return n += " }", n;
  }, Fe.prototype.identity = function() {
    var n = this.m;
    n[0] = n[4] = n[8] = 1, n[1] = n[2] = n[3] = n[5] = n[6] = n[7] = 0;
  }, Fe.prototype._$PS = function(n, a, u) {
    u == null && (u = new Array(0, 0));
    var d = this.m;
    return u[0] = d[0] * n + d[3] * a + d[6], u[1] = d[1] * n + d[4] * a + d[7], u;
  }, Fe.prototype._$P2 = function(n) {
    n || (n = new Fe());
    var a = this.m, u = a[0], d = a[1], p = a[2], f = a[3], y = a[4], $ = a[5], v = a[6], x = a[7], E = a[8], b = u * y * E + d * $ * v + p * f * x - u * $ * x - p * y * v - d * f * E;
    if (b == 0)
      return null;
    var A = 1 / b;
    return n.m[0] = A * (y * E - x * $), n.m[1] = A * (x * p - d * E), n.m[2] = A * (d * $ - y * p), n.m[3] = A * (v * $ - f * E), n.m[4] = A * (u * E - v * p), n.m[5] = A * (f * p - u * $), n.m[6] = A * (f * x - v * y), n.m[7] = A * (v * d - u * x), n.m[8] = A * (u * y - f * d), n;
  }, Fe.prototype.transform = function(n, a, u) {
    u == null && (u = new Array(0, 0));
    var d = this.m;
    return u[0] = d[0] * n + d[3] * a + d[6], u[1] = d[1] * n + d[4] * a + d[7], u;
  }, Fe.prototype.translate = function(n, a) {
    var u = this.m;
    u[6] = u[0] * n + u[3] * a + u[6], u[7] = u[1] * n + u[4] * a + u[7], u[8] = u[2] * n + u[5] * a + u[8];
  }, Fe.prototype.scale = function(n, a) {
    var u = this.m;
    u[0] *= n, u[1] *= n, u[2] *= n, u[3] *= a, u[4] *= a, u[5] *= a;
  }, Fe.prototype.shear = function(n, a) {
    var u = this.m, d = u[0] + u[3] * a, p = u[1] + u[4] * a, f = u[2] + u[5] * a;
    u[3] = u[0] * n + u[3], u[4] = u[1] * n + u[4], u[5] = u[2] * n + u[5], u[0] = d, u[1] = p, u[2] = f;
  }, Fe.prototype.rotate = function(n) {
    var a = this.m, u = Math.cos(n), d = Math.sin(n), p = a[0] * u + a[3] * d, f = a[1] * u + a[4] * d, y = a[2] * u + a[5] * d;
    a[3] = -a[0] * d + a[3] * u, a[4] = -a[1] * d + a[4] * u, a[5] = -a[2] * d + a[5] * u, a[0] = p, a[1] = f, a[2] = y;
  }, Fe.prototype.concatenate = function(n) {
    var a = this.m, u = n.m, d = a[0] * u[0] + a[3] * u[1] + a[6] * u[2], p = a[1] * u[0] + a[4] * u[1] + a[7] * u[2], f = a[2] * u[0] + a[5] * u[1] + a[8] * u[2], y = a[0] * u[3] + a[3] * u[4] + a[6] * u[5], $ = a[1] * u[3] + a[4] * u[4] + a[7] * u[5], v = a[2] * u[3] + a[5] * u[4] + a[8] * u[5], x = a[0] * u[6] + a[3] * u[7] + a[6] * u[8], E = a[1] * u[6] + a[4] * u[7] + a[7] * u[8], b = a[2] * u[6] + a[5] * u[7] + a[8] * u[8];
    m[0] = d, m[1] = p, m[2] = f, m[3] = y, m[4] = $, m[5] = v, m[6] = x, m[7] = E, m[8] = b;
  };
  function he(n) {
    wt || sr.prototype.constructor.call(this, n);
  }
  he.prototype = new sr(), he._$eT = null, he._$tP = new Object(), he._$2o = function() {
    return he._$eT == null && (he._$eT = he.getID("DST_BASE")), he._$eT;
  }, he._$27 = function() {
    he._$tP.clear(), he._$eT = null;
  }, he.getID = function(n) {
    var a = he._$tP[n];
    return a == null && (a = new he(n), he._$tP[n] = a), a;
  }, he.prototype._$3s = function() {
    return new he();
  };
  function le(n) {
    wt || (H.prototype.constructor.call(this), this.textures = new Array(), this.transform = null, this.gl = null, this.glno = n, this.firstDraw = !0, this.anisotropyExt = null, this.maxAnisotropy = 0, this._$As = 32, this._$Gr = !1, this._$NT = null, this._$vS = null, this._$no = null, this.vertShader = null, this.fragShader = null, this.vertShaderOff = null, this.fragShaderOff = null);
  }
  le.prototype = new H(), le._$9r = function(n) {
    var a = new Float32Array(n);
    return a;
  }, le._$vb = function(n) {
    var a = new Int16Array(n);
    return a;
  }, le._$cr = function(n, a) {
    return n == null || n._$yL() < a.length ? (n = le._$9r(a.length * 2), n.put(a), n._$oT(0)) : (n.clear(), n.put(a), n._$oT(0)), n;
  }, le._$mb = function(n, a) {
    return n == null || n._$yL() < a.length ? (n = le._$vb(a.length * 2), n.put(a), n._$oT(0)) : (n.clear(), n.put(a), n._$oT(0)), n;
  }, le._$Hs = function() {
    return this._$Gr;
  }, le._$as = function(n) {
    this._$Gr = n;
  }, le.prototype.getGL = function() {
    return this.gl;
  }, le.prototype.setGL = function(n) {
    this.gl = n;
  }, le.prototype.setTransform = function(n) {
    this.transform = n;
  }, le.prototype._$ZT = function() {
    var n = this.gl;
    this.firstDraw && (this.initShader(), this.firstDraw = !1, this.anisotropyExt = n.getExtension("EXT_texture_filter_anisotropic") || n.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || n.getExtension("MOZ_EXT_texture_filter_anisotropic"), this.anisotropyExt && (this.maxAnisotropy = n.getParameter(this.anisotropyExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT))), n.disable(n.SCISSOR_TEST), n.disable(n.STENCIL_TEST), n.disable(n.DEPTH_TEST), n.frontFace(n.CW), n.enable(n.BLEND), n.colorMask(1, 1, 1, 1), n.bindBuffer(n.ARRAY_BUFFER, null), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, null);
  }, le.prototype._$Uo = function(n, a, u, d, p, f, y, $) {
    if (!(f < 0.01 && this.clipBufPre_clipContextMask == null)) {
      f > 0.9 && F.EXPAND_W;
      var v = this.gl;
      if (this.gl == null)
        throw new Error("gl is null");
      var x = !1, E = 1, b = 1, A = 1, C = this._$C0 * E * f, O = this._$tT * b * f, P = this._$WL * A * f, k = this._$lT * f;
      if (this.clipBufPre_clipContextMask != null) {
        v.frontFace(v.CCW), v.useProgram(this.shaderProgram), this._$vS = ii(v, this._$vS, d), this._$no = dn(v, this._$no, u), v.enableVertexAttribArray(this.a_position_Loc), v.vertexAttribPointer(this.a_position_Loc, 2, v.FLOAT, !1, 0, 0), this._$NT = ii(v, this._$NT, p), v.activeTexture(v.TEXTURE1), v.bindTexture(v.TEXTURE_2D, this.textures[n]), v.uniform1i(this.s_texture0_Loc, 1), v.enableVertexAttribArray(this.a_texCoord_Loc), v.vertexAttribPointer(this.a_texCoord_Loc, 2, v.FLOAT, !1, 0, 0), v.uniformMatrix4fv(this.u_matrix_Loc, !1, this.getClipBufPre_clipContextMask().matrixForMask);
        var N = this.getClipBufPre_clipContextMask().layoutChannelNo, G = this.getChannelFlagAsColor(N);
        v.uniform4f(this.u_channelFlag, G.r, G.g, G.b, G.a);
        var U = this.getClipBufPre_clipContextMask().layoutBounds;
        v.uniform4f(this.u_baseColor_Loc, U.x * 2 - 1, U.y * 2 - 1, U._$EL() * 2 - 1, U._$5T() * 2 - 1), v.uniform1i(this.u_maskFlag_Loc, !0);
      } else if (x = this.getClipBufPre_clipContextDraw() != null, x) {
        v.useProgram(this.shaderProgramOff), this._$vS = ii(v, this._$vS, d), this._$no = dn(v, this._$no, u), v.enableVertexAttribArray(this.a_position_Loc_Off), v.vertexAttribPointer(this.a_position_Loc_Off, 2, v.FLOAT, !1, 0, 0), this._$NT = ii(v, this._$NT, p), v.activeTexture(v.TEXTURE1), v.bindTexture(v.TEXTURE_2D, this.textures[n]), v.uniform1i(this.s_texture0_Loc_Off, 1), v.enableVertexAttribArray(this.a_texCoord_Loc_Off), v.vertexAttribPointer(this.a_texCoord_Loc_Off, 2, v.FLOAT, !1, 0, 0), v.uniformMatrix4fv(this.u_clipMatrix_Loc_Off, !1, this.getClipBufPre_clipContextDraw().matrixForDraw), v.uniformMatrix4fv(this.u_matrix_Loc_Off, !1, this.matrix4x4), v.activeTexture(v.TEXTURE2), v.bindTexture(v.TEXTURE_2D, F.fTexture[this.glno]), v.uniform1i(this.s_texture1_Loc_Off, 2);
        var N = this.getClipBufPre_clipContextDraw().layoutChannelNo, G = this.getChannelFlagAsColor(N);
        v.uniform4f(this.u_channelFlag_Loc_Off, G.r, G.g, G.b, G.a), v.uniform4f(this.u_baseColor_Loc_Off, C, O, P, k);
      } else
        v.useProgram(this.shaderProgram), this._$vS = ii(v, this._$vS, d), this._$no = dn(v, this._$no, u), v.enableVertexAttribArray(this.a_position_Loc), v.vertexAttribPointer(this.a_position_Loc, 2, v.FLOAT, !1, 0, 0), this._$NT = ii(v, this._$NT, p), v.activeTexture(v.TEXTURE1), v.bindTexture(v.TEXTURE_2D, this.textures[n]), v.uniform1i(this.s_texture0_Loc, 1), v.enableVertexAttribArray(this.a_texCoord_Loc), v.vertexAttribPointer(this.a_texCoord_Loc, 2, v.FLOAT, !1, 0, 0), v.uniformMatrix4fv(this.u_matrix_Loc, !1, this.matrix4x4), v.uniform4f(this.u_baseColor_Loc, C, O, P, k), v.uniform1i(this.u_maskFlag_Loc, !1);
      this.culling ? this.gl.enable(v.CULL_FACE) : this.gl.disable(v.CULL_FACE), this.gl.enable(v.BLEND);
      var it, W, z, X;
      if (this.clipBufPre_clipContextMask != null)
        it = v.ONE, W = v.ONE_MINUS_SRC_ALPHA, z = v.ONE, X = v.ONE_MINUS_SRC_ALPHA;
      else
        switch (y) {
          case Ft._$ms:
            it = v.ONE, W = v.ONE_MINUS_SRC_ALPHA, z = v.ONE, X = v.ONE_MINUS_SRC_ALPHA;
            break;
          case Ft._$ns:
            it = v.ONE, W = v.ONE, z = v.ZERO, X = v.ONE;
            break;
          case Ft._$_s:
            it = v.DST_COLOR, W = v.ONE_MINUS_SRC_ALPHA, z = v.ZERO, X = v.ONE;
            break;
        }
      v.blendEquationSeparate(v.FUNC_ADD, v.FUNC_ADD), v.blendFuncSeparate(it, W, z, X), this.anisotropyExt && v.texParameteri(v.TEXTURE_2D, this.anisotropyExt.TEXTURE_MAX_ANISOTROPY_EXT, this.maxAnisotropy);
      var Y = u.length;
      v.drawElements(v.TRIANGLES, Y, v.UNSIGNED_SHORT, 0), v.bindTexture(v.TEXTURE_2D, null);
    }
  };
  function ii(n, a, u) {
    return a == null && (a = n.createBuffer()), n.bindBuffer(n.ARRAY_BUFFER, a), n.bufferData(n.ARRAY_BUFFER, u, n.DYNAMIC_DRAW), a;
  }
  function dn(n, a, u) {
    return a == null && (a = n.createBuffer()), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, a), n.bufferData(n.ELEMENT_ARRAY_BUFFER, u, n.DYNAMIC_DRAW), a;
  }
  le.prototype._$Rs = function() {
    throw new Error("_$Rs");
  }, le.prototype._$Ds = function(n) {
    throw new Error("_$Ds");
  }, le.prototype._$K2 = function() {
    for (var n = 0; n < this.textures.length; n++) {
      var a = this.textures[n];
      a != 0 && (this.gl._$K2(1, this.textures, n), this.textures[n] = null);
    }
  }, le.prototype.setTexture = function(n, a) {
    this.textures[n] = a;
  }, le.prototype.initShader = function() {
    var n = this.gl;
    this.loadShaders2(), this.a_position_Loc = n.getAttribLocation(this.shaderProgram, "a_position"), this.a_texCoord_Loc = n.getAttribLocation(this.shaderProgram, "a_texCoord"), this.u_matrix_Loc = n.getUniformLocation(this.shaderProgram, "u_mvpMatrix"), this.s_texture0_Loc = n.getUniformLocation(this.shaderProgram, "s_texture0"), this.u_channelFlag = n.getUniformLocation(this.shaderProgram, "u_channelFlag"), this.u_baseColor_Loc = n.getUniformLocation(this.shaderProgram, "u_baseColor"), this.u_maskFlag_Loc = n.getUniformLocation(this.shaderProgram, "u_maskFlag"), this.a_position_Loc_Off = n.getAttribLocation(this.shaderProgramOff, "a_position"), this.a_texCoord_Loc_Off = n.getAttribLocation(this.shaderProgramOff, "a_texCoord"), this.u_matrix_Loc_Off = n.getUniformLocation(this.shaderProgramOff, "u_mvpMatrix"), this.u_clipMatrix_Loc_Off = n.getUniformLocation(this.shaderProgramOff, "u_ClipMatrix"), this.s_texture0_Loc_Off = n.getUniformLocation(this.shaderProgramOff, "s_texture0"), this.s_texture1_Loc_Off = n.getUniformLocation(this.shaderProgramOff, "s_texture1"), this.u_channelFlag_Loc_Off = n.getUniformLocation(this.shaderProgramOff, "u_channelFlag"), this.u_baseColor_Loc_Off = n.getUniformLocation(this.shaderProgramOff, "u_baseColor");
  }, le.prototype.disposeShader = function() {
    var n = this.gl;
    this.shaderProgram && (n.deleteProgram(this.shaderProgram), this.shaderProgram = null), this.shaderProgramOff && (n.deleteProgram(this.shaderProgramOff), this.shaderProgramOff = null);
  }, le.prototype.compileShader = function(n, a) {
    var u = this.gl, f, d = a, p = u.createShader(n);
    if (p == null)
      return h._$Ji("_$L0 to create shader"), null;
    u.shaderSource(p, d), u.compileShader(p);
    var f = u.getShaderParameter(p, u.COMPILE_STATUS);
    if (!f) {
      var y = u.getShaderInfoLog(p);
      return h._$Ji("_$L0 to compile shader : " + y), u.deleteShader(p), null;
    }
    return p;
  }, le.prototype.loadShaders2 = function() {
    var n = this.gl;
    if (this.shaderProgram = n.createProgram(), !this.shaderProgram || (this.shaderProgramOff = n.createProgram(), !this.shaderProgramOff))
      return !1;
    var a = "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform mat4       u_mvpMatrix;void main(){    gl_Position = u_mvpMatrix * a_position;    v_ClipPos = u_mvpMatrix * a_position;    v_texCoord = a_texCoord;}", u = "precision mediump float;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform sampler2D  s_texture0;uniform vec4       u_channelFlag;uniform vec4       u_baseColor;uniform bool       u_maskFlag;void main(){    vec4 smpColor;     if(u_maskFlag){        float isInside =             step(u_baseColor.x, v_ClipPos.x/v_ClipPos.w)          * step(u_baseColor.y, v_ClipPos.y/v_ClipPos.w)          * step(v_ClipPos.x/v_ClipPos.w, u_baseColor.z)          * step(v_ClipPos.y/v_ClipPos.w, u_baseColor.w);        smpColor = u_channelFlag * texture2D(s_texture0 , v_texCoord).a * isInside;    }else{        smpColor = texture2D(s_texture0 , v_texCoord) * u_baseColor;    }    gl_FragColor = smpColor;}", d = "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform mat4       u_mvpMatrix;uniform mat4       u_ClipMatrix;void main(){    gl_Position = u_mvpMatrix * a_position;    v_ClipPos = u_ClipMatrix * a_position;    v_texCoord = a_texCoord ;}", p = "precision mediump float ;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform sampler2D  s_texture0;uniform sampler2D  s_texture1;uniform vec4       u_channelFlag;uniform vec4       u_baseColor ;void main(){    vec4 col_formask = texture2D(s_texture0, v_texCoord) * u_baseColor;    vec4 clipMask = texture2D(s_texture1, v_ClipPos.xy / v_ClipPos.w) * u_channelFlag;    float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;    col_formask = col_formask * maskVal;    gl_FragColor = col_formask;}";
    if (this.vertShader = this.compileShader(n.VERTEX_SHADER, a), !this.vertShader)
      return h._$Ji("Vertex shader compile _$li!"), !1;
    if (this.vertShaderOff = this.compileShader(n.VERTEX_SHADER, d), !this.vertShaderOff)
      return h._$Ji("OffVertex shader compile _$li!"), !1;
    if (this.fragShader = this.compileShader(n.FRAGMENT_SHADER, u), !this.fragShader)
      return h._$Ji("Fragment shader compile _$li!"), !1;
    if (this.fragShaderOff = this.compileShader(n.FRAGMENT_SHADER, p), !this.fragShaderOff)
      return h._$Ji("OffFragment shader compile _$li!"), !1;
    n.attachShader(this.shaderProgram, this.vertShader), n.attachShader(this.shaderProgram, this.fragShader), n.attachShader(this.shaderProgramOff, this.vertShaderOff), n.attachShader(this.shaderProgramOff, this.fragShaderOff), n.linkProgram(this.shaderProgram), n.linkProgram(this.shaderProgramOff);
    var f = n.getProgramParameter(this.shaderProgram, n.LINK_STATUS);
    if (!f) {
      var y = n.getProgramInfoLog(this.shaderProgram);
      return h._$Ji("_$L0 to link program: " + y), this.vertShader && (n.deleteShader(this.vertShader), this.vertShader = 0), this.fragShader && (n.deleteShader(this.fragShader), this.fragShader = 0), this.shaderProgram && (n.deleteProgram(this.shaderProgram), this.shaderProgram = 0), this.vertShaderOff && (n.deleteShader(this.vertShaderOff), this.vertShaderOff = 0), this.fragShaderOff && (n.deleteShader(this.fragShaderOff), this.fragShaderOff = 0), this.shaderProgramOff && (n.deleteProgram(this.shaderProgramOff), this.shaderProgramOff = 0), !1;
    }
    return !0;
  }, le.prototype.createFramebuffer = function() {
    var n = this.gl, a = F.clippingMaskBufferSize, u = n.createFramebuffer();
    n.bindFramebuffer(n.FRAMEBUFFER, u);
    var d = n.createRenderbuffer();
    n.bindRenderbuffer(n.RENDERBUFFER, d), n.renderbufferStorage(n.RENDERBUFFER, n.RGBA4, a, a), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.RENDERBUFFER, d);
    var p = n.createTexture();
    return n.bindTexture(n.TEXTURE_2D, p), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, a, a, 0, n.RGBA, n.UNSIGNED_BYTE, null), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE), n.framebufferTexture2D(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, p, 0), n.bindTexture(n.TEXTURE_2D, null), n.bindRenderbuffer(n.RENDERBUFFER, null), n.bindFramebuffer(n.FRAMEBUFFER, null), F.fTexture[this.glno] = p, { framebuffer: u, renderbuffer: d, texture: F.fTexture[this.glno] };
  };
  function ge(n) {
    wt || (this._$P = new Int8Array(8), this._$R0 = new DataView(this._$P.buffer), this._$3i = new Int8Array(1e3), this._$hL = 0, this._$v0 = 0, this._$S2 = 0, this._$Ko = new Array(), this._$T = n, this._$F = 0);
  }
  ge.prototype._$fP = function() {
    var n = this._$ST(), a, u, d;
    if (n & 128)
      if ((a = this._$ST()) & 128)
        if ((u = this._$ST()) & 128) {
          if ((d = this._$ST()) & 128)
            throw new He("_$L _$0P  _");
          return (n & 127) << 21 | (a & 127) << 14 | (u & 127) << 7 | d & 255;
        } else
          return (n & 127) << 14 | (a & 127) << 7 | u & 255;
      else
        return (n & 127) << 7 | a & 127;
    else
      return n & 255;
  }, ge.prototype.getFormatVersion = function() {
    return this._$S2;
  }, ge.prototype._$gr = function(n) {
    this._$S2 = n;
  }, ge.prototype._$3L = function() {
    return this._$fP();
  }, ge.prototype._$mP = function() {
    return this._$zT(), this._$F += 8, this._$T.getFloat64(this._$F - 8);
  }, ge.prototype._$_T = function() {
    return this._$zT(), this._$F += 4, this._$T.getFloat32(this._$F - 4);
  }, ge.prototype._$6L = function() {
    return this._$zT(), this._$F += 4, this._$T.getInt32(this._$F - 4);
  }, ge.prototype._$ST = function() {
    return this._$zT(), this._$T.getInt8(this._$F++);
  }, ge.prototype._$9T = function() {
    return this._$zT(), this._$F += 2, this._$T.getInt16(this._$F - 2);
  }, ge.prototype._$2T = function() {
    throw this._$zT(), this._$F += 8, new He("_$L _$q read long");
  }, ge.prototype._$po = function() {
    return this._$zT(), this._$T.getInt8(this._$F++) != 0;
  };
  var Wo = !0;
  ge.prototype._$bT = function() {
    this._$zT();
    var n = this._$3L(), a = null;
    if (Wo)
      try {
        var u = new ArrayBuffer(n * 2);
        a = new Uint16Array(u);
        for (var d = 0; d < n; ++d)
          a[d] = this._$T.getUint8(this._$F++);
        return String.fromCharCode.apply(null, a);
      } catch {
        Wo = !1;
      }
    try {
      var p = new Array();
      if (a == null)
        for (var d = 0; d < n; ++d)
          p[d] = this._$T.getUint8(this._$F++);
      else
        for (var d = 0; d < n; ++d)
          p[d] = a[d];
      return String.fromCharCode.apply(null, p);
    } catch (f) {
      console.log("read utf8 / _$rT _$L0 !! : " + f);
    }
  }, ge.prototype._$cS = function() {
    this._$zT();
    for (var n = this._$3L(), a = new Int32Array(n), u = 0; u < n; u++)
      a[u] = this._$T.getInt32(this._$F), this._$F += 4;
    return a;
  }, ge.prototype._$Tb = function() {
    this._$zT();
    for (var n = this._$3L(), a = new Float32Array(n), u = 0; u < n; u++)
      a[u] = this._$T.getFloat32(this._$F), this._$F += 4;
    return a;
  }, ge.prototype._$5b = function() {
    this._$zT();
    for (var n = this._$3L(), a = new Float64Array(n), u = 0; u < n; u++)
      a[u] = this._$T.getFloat64(this._$F), this._$F += 8;
    return a;
  }, ge.prototype._$nP = function() {
    return this._$Jb(-1);
  }, ge.prototype._$Jb = function(n) {
    if (this._$zT(), n < 0 && (n = this._$3L()), n == J._$7P) {
      var a = this._$6L();
      if (0 <= a && a < this._$Ko.length)
        return this._$Ko[a];
      throw new He("_$sL _$4i @_$m0");
    } else {
      var u = this._$4b(n);
      return this._$Ko.push(u), u;
    }
  }, ge.prototype._$4b = function(n) {
    if (n == 0)
      return null;
    if (n == 50) {
      var a = this._$bT(), u = ne.getID(a);
      return u;
    } else if (n == 51) {
      var a = this._$bT(), u = he.getID(a);
      return u;
    } else if (n == 134) {
      var a = this._$bT(), u = _.getID(a);
      return u;
    } else if (n == 60) {
      var a = this._$bT(), u = T.getID(a);
      return u;
    }
    if (n >= 48) {
      var d = J._$9o(n);
      return d != null ? (d._$F0(this), d) : null;
    }
    switch (n) {
      case 1:
        return this._$bT();
      case 10:
        return this._$6L(), new s();
      case 11:
        return new at(this._$mP(), this._$mP(), this._$mP(), this._$mP());
      case 12:
        return new at(this._$_T(), this._$_T(), this._$_T(), this._$_T());
      case 13:
        return new Jt(this._$mP(), this._$mP());
      case 14:
        return new Jt(this._$_T(), this._$_T());
      case 15:
        for (var p = this._$3L(), u = new Array(p), f = 0; f < p; f++)
          u[f] = this._$nP();
        return u;
      case 17:
        var u = new dt(this._$mP(), this._$mP(), this._$mP(), this._$mP(), this._$mP(), this._$mP());
        return u;
      case 21:
        return new c(this._$6L(), this._$6L(), this._$6L(), this._$6L());
      case 22:
        return new fn(this._$6L(), this._$6L());
      case 23:
        throw new Error("_$L _$ro ");
      case 16:
      case 25:
        return this._$cS();
      case 26:
        return this._$5b();
      case 27:
        return this._$Tb();
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 18:
      case 19:
      case 20:
      case 24:
      case 28:
        throw new He("_$6 _$q : _$nP() of 2-9 ,18,19,20,24,28 : " + n);
      default:
        throw new He("_$6 _$q : _$nP() NO _$i : " + n);
    }
  }, ge.prototype._$8L = function() {
    return this._$hL == 0 ? this._$v0 = this._$ST() : this._$hL == 8 && (this._$v0 = this._$ST(), this._$hL = 0), (this._$v0 >> 7 - this._$hL++ & 1) == 1;
  }, ge.prototype._$zT = function() {
    this._$hL != 0 && (this._$hL = 0);
  };
  function ce() {
  }
  ce._$2S = Math.PI / 180, ce._$bS = Math.PI / 180, ce._$wS = 180 / Math.PI, ce._$NS = 180 / Math.PI, ce.PI_F = Math.PI, ce._$kT = [0, 0.012368, 0.024734, 0.037097, 0.049454, 0.061803, 0.074143, 0.086471, 0.098786, 0.111087, 0.12337, 0.135634, 0.147877, 0.160098, 0.172295, 0.184465, 0.196606, 0.208718, 0.220798, 0.232844, 0.244854, 0.256827, 0.268761, 0.280654, 0.292503, 0.304308, 0.316066, 0.327776, 0.339436, 0.351044, 0.362598, 0.374097, 0.385538, 0.396921, 0.408243, 0.419502, 0.430697, 0.441826, 0.452888, 0.463881, 0.474802, 0.485651, 0.496425, 0.507124, 0.517745, 0.528287, 0.538748, 0.549126, 0.559421, 0.56963, 0.579752, 0.589785, 0.599728, 0.609579, 0.619337, 0.629, 0.638567, 0.648036, 0.657406, 0.666676, 0.675843, 0.684908, 0.693867, 0.70272, 0.711466, 0.720103, 0.72863, 0.737045, 0.745348, 0.753536, 0.76161, 0.769566, 0.777405, 0.785125, 0.792725, 0.800204, 0.807561, 0.814793, 0.821901, 0.828884, 0.835739, 0.842467, 0.849066, 0.855535, 0.861873, 0.868079, 0.874153, 0.880093, 0.885898, 0.891567, 0.897101, 0.902497, 0.907754, 0.912873, 0.917853, 0.922692, 0.92739, 0.931946, 0.936359, 0.940629, 0.944755, 0.948737, 0.952574, 0.956265, 0.959809, 0.963207, 0.966457, 0.96956, 0.972514, 0.97532, 0.977976, 0.980482, 0.982839, 0.985045, 0.987101, 0.989006, 0.990759, 0.992361, 0.993811, 0.995109, 0.996254, 0.997248, 0.998088, 0.998776, 0.999312, 0.999694, 0.999924, 1], ce._$92 = function(n, a) {
    var u = Math.atan2(n[1], n[0]), d = Math.atan2(a[1], a[0]);
    return ce._$tS(u, d);
  }, ce._$tS = function(n, a) {
    for (var u = n - a; u < -Math.PI; )
      u += 2 * Math.PI;
    for (; u > Math.PI; )
      u -= 2 * Math.PI;
    return u;
  }, ce._$9 = function(n) {
    return Math.sin(n);
  }, ce.fcos = function(n) {
    return Math.cos(n);
  };
  function Li(n) {
    wt || (this._$e0 = null, this._$IP = null, this._$Us = null, this._$7s = null, this._$IS = [!1], this._$VS = null, this._$AT = !0, this.baseOpacity = 1, this.clipBufPre_clipContext = null, this._$e0 = n);
  }
  Li.prototype._$u2 = function() {
    return this._$IS[0];
  }, Li.prototype._$yo = function() {
    return this._$AT && !this._$IS[0];
  }, Li.prototype._$GT = function() {
    return this._$e0;
  };
  function Bt() {
  }
  Bt._$W2 = 0, Bt.SYSTEM_INFO = null, Bt.USER_AGENT = navigator.userAgent, Bt.isIPhone = function() {
    return Bt.SYSTEM_INFO || Bt.setup(), Bt.SYSTEM_INFO._isIPhone;
  }, Bt.isIOS = function() {
    return Bt.SYSTEM_INFO || Bt.setup(), Bt.SYSTEM_INFO._isIPhone || Bt.SYSTEM_INFO._isIPad;
  }, Bt.isAndroid = function() {
    return Bt.SYSTEM_INFO || Bt.setup(), Bt.SYSTEM_INFO._isAndroid;
  }, Bt.getOSVersion = function() {
    return Bt.SYSTEM_INFO || Bt.setup(), Bt.SYSTEM_INFO.version;
  }, Bt.getOS = function() {
    return Bt.SYSTEM_INFO || Bt.setup(), Bt.SYSTEM_INFO._isIPhone || Bt.SYSTEM_INFO._isIPad ? "iOS" : Bt.SYSTEM_INFO._isAndroid ? "Android" : "_$Q0 OS";
  }, Bt.setup = function() {
    var n = Bt.USER_AGENT;
    function a(p, f) {
      for (var y = p.substring(f).split(/[ _,;\.]/), $ = 0, v = 0; v <= 2 && !isNaN(y[v]); v++) {
        var x = parseInt(y[v]);
        if (x < 0 || x > 999) {
          h._$li("err : " + x + " @UtHtml5.setup()"), $ = 0;
          break;
        }
        $ += x * Math.pow(1e3, 2 - v);
      }
      return $;
    }
    var u, d = Bt.SYSTEM_INFO = { userAgent: n };
    if ((u = n.indexOf("iPhone OS ")) >= 0)
      d.os = "iPhone", d._isIPhone = !0, d.version = a(n, u + 10);
    else if ((u = n.indexOf("iPad")) >= 0) {
      if (u = n.indexOf("CPU OS"), u < 0) {
        h._$li(" err : " + n + " @UtHtml5.setup()");
        return;
      }
      d.os = "iPad", d._isIPad = !0, d.version = a(n, u + 7);
    } else
      (u = n.indexOf("Android")) >= 0 ? (d.os = "Android", d._isAndroid = !0, d.version = a(n, u + 8)) : (d.os = "-", d.version = -1);
  }, window.UtSystem = mt, window.UtDebug = h, window.LDTransform = Fe, window.LDGL = te, window.Live2D = F, window.Live2DModelWebGL = ie, window.Live2DModelJS = zt, window.Live2DMotion = It, window.MotionQueueManager = Tr, window.PhysicsHair = S, window.AMotion = o, window.PartsDataID = _, window.DrawDataID = ne, window.BaseDataID = he, window.ParamID = T, F.init();
  var wt = !1;
})();
var Qr = /* @__PURE__ */ ((r) => (r[r.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", r[r.WEBGL = 1] = "WEBGL", r[r.WEBGL2 = 2] = "WEBGL2", r))(Qr || {}), Xh = /* @__PURE__ */ ((r) => (r[r.UNKNOWN = 0] = "UNKNOWN", r[r.WEBGL = 1] = "WEBGL", r[r.CANVAS = 2] = "CANVAS", r))(Xh || {}), Qn = /* @__PURE__ */ ((r) => (r[r.COLOR = 16384] = "COLOR", r[r.DEPTH = 256] = "DEPTH", r[r.STENCIL = 1024] = "STENCIL", r))(Qn || {}), xt = /* @__PURE__ */ ((r) => (r[r.NORMAL = 0] = "NORMAL", r[r.ADD = 1] = "ADD", r[r.MULTIPLY = 2] = "MULTIPLY", r[r.SCREEN = 3] = "SCREEN", r[r.OVERLAY = 4] = "OVERLAY", r[r.DARKEN = 5] = "DARKEN", r[r.LIGHTEN = 6] = "LIGHTEN", r[r.COLOR_DODGE = 7] = "COLOR_DODGE", r[r.COLOR_BURN = 8] = "COLOR_BURN", r[r.HARD_LIGHT = 9] = "HARD_LIGHT", r[r.SOFT_LIGHT = 10] = "SOFT_LIGHT", r[r.DIFFERENCE = 11] = "DIFFERENCE", r[r.EXCLUSION = 12] = "EXCLUSION", r[r.HUE = 13] = "HUE", r[r.SATURATION = 14] = "SATURATION", r[r.COLOR = 15] = "COLOR", r[r.LUMINOSITY = 16] = "LUMINOSITY", r[r.NORMAL_NPM = 17] = "NORMAL_NPM", r[r.ADD_NPM = 18] = "ADD_NPM", r[r.SCREEN_NPM = 19] = "SCREEN_NPM", r[r.NONE = 20] = "NONE", r[r.SRC_OVER = 0] = "SRC_OVER", r[r.SRC_IN = 21] = "SRC_IN", r[r.SRC_OUT = 22] = "SRC_OUT", r[r.SRC_ATOP = 23] = "SRC_ATOP", r[r.DST_OVER = 24] = "DST_OVER", r[r.DST_IN = 25] = "DST_IN", r[r.DST_OUT = 26] = "DST_OUT", r[r.DST_ATOP = 27] = "DST_ATOP", r[r.ERASE = 26] = "ERASE", r[r.SUBTRACT = 28] = "SUBTRACT", r[r.XOR = 29] = "XOR", r))(xt || {}), ks = /* @__PURE__ */ ((r) => (r[r.POINTS = 0] = "POINTS", r[r.LINES = 1] = "LINES", r[r.LINE_LOOP = 2] = "LINE_LOOP", r[r.LINE_STRIP = 3] = "LINE_STRIP", r[r.TRIANGLES = 4] = "TRIANGLES", r[r.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", r[r.TRIANGLE_FAN = 6] = "TRIANGLE_FAN", r))(ks || {}), Z = /* @__PURE__ */ ((r) => (r[r.RGBA = 6408] = "RGBA", r[r.RGB = 6407] = "RGB", r[r.RG = 33319] = "RG", r[r.RED = 6403] = "RED", r[r.RGBA_INTEGER = 36249] = "RGBA_INTEGER", r[r.RGB_INTEGER = 36248] = "RGB_INTEGER", r[r.RG_INTEGER = 33320] = "RG_INTEGER", r[r.RED_INTEGER = 36244] = "RED_INTEGER", r[r.ALPHA = 6406] = "ALPHA", r[r.LUMINANCE = 6409] = "LUMINANCE", r[r.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", r[r.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", r[r.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL", r))(Z || {}), yi = /* @__PURE__ */ ((r) => (r[r.TEXTURE_2D = 3553] = "TEXTURE_2D", r[r.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", r[r.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", r[r.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", r[r.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", r[r.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", r[r.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", r[r.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", r[r.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z", r))(yi || {}), Pt = /* @__PURE__ */ ((r) => (r[r.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", r[r.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", r[r.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", r[r.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", r[r.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", r[r.UNSIGNED_INT = 5125] = "UNSIGNED_INT", r[r.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", r[r.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", r[r.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", r[r.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", r[r.BYTE = 5120] = "BYTE", r[r.SHORT = 5122] = "SHORT", r[r.INT = 5124] = "INT", r[r.FLOAT = 5126] = "FLOAT", r[r.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", r[r.HALF_FLOAT = 36193] = "HALF_FLOAT", r))(Pt || {}), rt = /* @__PURE__ */ ((r) => (r[r.FLOAT = 0] = "FLOAT", r[r.INT = 1] = "INT", r[r.UINT = 2] = "UINT", r))(rt || {}), vr = /* @__PURE__ */ ((r) => (r[r.NEAREST = 0] = "NEAREST", r[r.LINEAR = 1] = "LINEAR", r))(vr || {}), Lo = /* @__PURE__ */ ((r) => (r[r.CLAMP = 33071] = "CLAMP", r[r.REPEAT = 10497] = "REPEAT", r[r.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT", r))(Lo || {}), Hr = /* @__PURE__ */ ((r) => (r[r.OFF = 0] = "OFF", r[r.POW2 = 1] = "POW2", r[r.ON = 2] = "ON", r[r.ON_MANUAL = 3] = "ON_MANUAL", r))(Hr || {}), Kr = /* @__PURE__ */ ((r) => (r[r.NPM = 0] = "NPM", r[r.UNPACK = 1] = "UNPACK", r[r.PMA = 2] = "PMA", r[r.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", r[r.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", r[r.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA", r))(Kr || {}), Nr = /* @__PURE__ */ ((r) => (r[r.NO = 0] = "NO", r[r.YES = 1] = "YES", r[r.AUTO = 2] = "AUTO", r[r.BLEND = 0] = "BLEND", r[r.CLEAR = 1] = "CLEAR", r[r.BLIT = 2] = "BLIT", r))(Nr || {}), Fo = /* @__PURE__ */ ((r) => (r[r.AUTO = 0] = "AUTO", r[r.MANUAL = 1] = "MANUAL", r))(Fo || {}), We = /* @__PURE__ */ ((r) => (r.LOW = "lowp", r.MEDIUM = "mediump", r.HIGH = "highp", r))(We || {}), Pe = /* @__PURE__ */ ((r) => (r[r.NONE = 0] = "NONE", r[r.SCISSOR = 1] = "SCISSOR", r[r.STENCIL = 2] = "STENCIL", r[r.SPRITE = 3] = "SPRITE", r[r.COLOR = 4] = "COLOR", r))(Pe || {}), be = /* @__PURE__ */ ((r) => (r[r.NONE = 0] = "NONE", r[r.LOW = 2] = "LOW", r[r.MEDIUM = 4] = "MEDIUM", r[r.HIGH = 8] = "HIGH", r))(be || {}), fr = /* @__PURE__ */ ((r) => (r[r.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", r[r.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", r[r.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER", r))(fr || {});
const Nu = {
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
}, Dt = {
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
  ADAPTER: Nu,
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
var yn = /iPhone/i, ma = /iPod/i, va = /iPad/i, ya = /\biOS-universal(?:.+)Mac\b/i, gn = /\bAndroid(?:.+)Mobile\b/i, ga = /Android/i, si = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i, us = /Silk/i, pr = /Windows Phone/i, $a = /\bWindows(?:.+)ARM\b/i, xa = /BlackBerry/i, Ta = /BB10/i, wa = /Opera Mini/i, Ea = /\b(CriOS|Chrome)(?:.+)Mobile/i, ba = /Mobile(?:.+)Firefox\b/i, Aa = function(r) {
  return typeof r < "u" && r.platform === "MacIntel" && typeof r.maxTouchPoints == "number" && r.maxTouchPoints > 1 && typeof MSStream > "u";
};
function Du(r) {
  return function(t) {
    return t.test(r);
  };
}
function Sa(r) {
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
  var s = Du(e), o = {
    apple: {
      phone: s(yn) && !s(pr),
      ipod: s(ma),
      tablet: !s(yn) && (s(va) || Aa(t)) && !s(pr),
      universal: s(ya),
      device: (s(yn) || s(ma) || s(va) || s(ya) || Aa(t)) && !s(pr)
    },
    amazon: {
      phone: s(si),
      tablet: !s(si) && s(us),
      device: s(si) || s(us)
    },
    android: {
      phone: !s(pr) && s(si) || !s(pr) && s(gn),
      tablet: !s(pr) && !s(si) && !s(gn) && (s(us) || s(ga)),
      device: !s(pr) && (s(si) || s(us) || s(gn) || s(ga)) || s(/\bokhttp\b/i)
    },
    windows: {
      phone: s(pr),
      tablet: s($a),
      device: s(pr) || s($a)
    },
    other: {
      blackberry: s(xa),
      blackberry10: s(Ta),
      opera: s(wa),
      firefox: s(ba),
      chrome: s(Ea),
      device: s(xa) || s(Ta) || s(wa) || s(ba) || s(Ea)
    },
    any: !1,
    phone: !1,
    tablet: !1
  };
  return o.any = o.apple.device || o.android.device || o.windows.device || o.other.device, o.phone = o.apple.phone || o.android.phone || o.windows.phone, o.tablet = o.apple.tablet || o.android.tablet || o.windows.tablet, o;
}
const Bu = Sa.default ?? Sa, _i = Bu(globalThis.navigator);
Dt.RETINA_PREFIX = /@([0-9\.]+)x/;
Dt.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !1;
var zi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Uu(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function ku(r) {
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
var Yh = { exports: {} };
(function(r) {
  var t = Object.prototype.hasOwnProperty, e = "~";
  function i() {
  }
  Object.create && (i.prototype = /* @__PURE__ */ Object.create(null), new i().__proto__ || (e = !1));
  function s(c, _, g) {
    this.fn = c, this.context = _, this.once = g || !1;
  }
  function o(c, _, g, T, w) {
    if (typeof g != "function")
      throw new TypeError("The listener must be a function");
    var S = new s(g, T || c, w), R = e ? e + _ : _;
    return c._events[R] ? c._events[R].fn ? c._events[R] = [c._events[R], S] : c._events[R].push(S) : (c._events[R] = S, c._eventsCount++), c;
  }
  function h(c, _) {
    --c._eventsCount === 0 ? c._events = new i() : delete c._events[_];
  }
  function l() {
    this._events = new i(), this._eventsCount = 0;
  }
  l.prototype.eventNames = function() {
    var _ = [], g, T;
    if (this._eventsCount === 0) return _;
    for (T in g = this._events)
      t.call(g, T) && _.push(e ? T.slice(1) : T);
    return Object.getOwnPropertySymbols ? _.concat(Object.getOwnPropertySymbols(g)) : _;
  }, l.prototype.listeners = function(_) {
    var g = e ? e + _ : _, T = this._events[g];
    if (!T) return [];
    if (T.fn) return [T.fn];
    for (var w = 0, S = T.length, R = new Array(S); w < S; w++)
      R[w] = T[w].fn;
    return R;
  }, l.prototype.listenerCount = function(_) {
    var g = e ? e + _ : _, T = this._events[g];
    return T ? T.fn ? 1 : T.length : 0;
  }, l.prototype.emit = function(_, g, T, w, S, R) {
    var D = e ? e + _ : _;
    if (!this._events[D]) return !1;
    var L = this._events[D], K = arguments.length, q, M;
    if (L.fn) {
      switch (L.once && this.removeListener(_, L.fn, void 0, !0), K) {
        case 1:
          return L.fn.call(L.context), !0;
        case 2:
          return L.fn.call(L.context, g), !0;
        case 3:
          return L.fn.call(L.context, g, T), !0;
        case 4:
          return L.fn.call(L.context, g, T, w), !0;
        case 5:
          return L.fn.call(L.context, g, T, w, S), !0;
        case 6:
          return L.fn.call(L.context, g, T, w, S, R), !0;
      }
      for (M = 1, q = new Array(K - 1); M < K; M++)
        q[M - 1] = arguments[M];
      L.fn.apply(L.context, q);
    } else {
      var Q = L.length, at;
      for (M = 0; M < Q; M++)
        switch (L[M].once && this.removeListener(_, L[M].fn, void 0, !0), K) {
          case 1:
            L[M].fn.call(L[M].context);
            break;
          case 2:
            L[M].fn.call(L[M].context, g);
            break;
          case 3:
            L[M].fn.call(L[M].context, g, T);
            break;
          case 4:
            L[M].fn.call(L[M].context, g, T, w);
            break;
          default:
            if (!q) for (at = 1, q = new Array(K - 1); at < K; at++)
              q[at - 1] = arguments[at];
            L[M].fn.apply(L[M].context, q);
        }
    }
    return !0;
  }, l.prototype.on = function(_, g, T) {
    return o(this, _, g, T, !1);
  }, l.prototype.once = function(_, g, T) {
    return o(this, _, g, T, !0);
  }, l.prototype.removeListener = function(_, g, T, w) {
    var S = e ? e + _ : _;
    if (!this._events[S]) return this;
    if (!g)
      return h(this, S), this;
    var R = this._events[S];
    if (R.fn)
      R.fn === g && (!w || R.once) && (!T || R.context === T) && h(this, S);
    else {
      for (var D = 0, L = [], K = R.length; D < K; D++)
        (R[D].fn !== g || w && !R[D].once || T && R[D].context !== T) && L.push(R[D]);
      L.length ? this._events[S] = L.length === 1 ? L[0] : L : h(this, S);
    }
    return this;
  }, l.prototype.removeAllListeners = function(_) {
    var g;
    return _ ? (g = e ? e + _ : _, this._events[g] && h(this, g)) : (this._events = new i(), this._eventsCount = 0), this;
  }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = e, l.EventEmitter = l, r.exports = l;
})(Yh);
var Gu = Yh.exports;
const Jr = /* @__PURE__ */ Uu(Gu);
var Wh = { exports: {} };
Wh.exports = sn;
Wh.exports.default = sn;
function sn(r, t, e) {
  e = e || 2;
  var i = t && t.length, s = i ? t[0] * e : r.length, o = jh(r, 0, s, e, !0), h = [];
  if (!o || o.next === o.prev) return h;
  var l, c, _, g, T, w, S;
  if (i && (o = Wu(r, t, o, e)), r.length > 80 * e) {
    l = _ = r[0], c = g = r[1];
    for (var R = e; R < s; R += e)
      T = r[R], w = r[R + 1], T < l && (l = T), w < c && (c = w), T > _ && (_ = T), w > g && (g = w);
    S = Math.max(_ - l, g - c), S = S !== 0 ? 32767 / S : 0;
  }
  return Zi(o, h, e, l, c, S, 0), h;
}
function jh(r, t, e, i, s) {
  var o, h;
  if (s === to(r, t, e, i) > 0)
    for (o = t; o < e; o += i) h = Pa(o, r[o], r[o + 1], h);
  else
    for (o = e - i; o >= t; o -= i) h = Pa(o, r[o], r[o + 1], h);
  return h && nn(h, h.next) && (Ki(h), h = h.next), h;
}
function Zr(r, t) {
  if (!r) return r;
  t || (t = r);
  var e = r, i;
  do
    if (i = !1, !e.steiner && (nn(e, e.next) || me(e.prev, e, e.next) === 0)) {
      if (Ki(e), e = t = e.prev, e === e.next) break;
      i = !0;
    } else
      e = e.next;
  while (i || e !== t);
  return t;
}
function Zi(r, t, e, i, s, o, h) {
  if (r) {
    !h && o && Qu(r, i, s, o);
    for (var l = r, c, _; r.prev !== r.next; ) {
      if (c = r.prev, _ = r.next, o ? zu(r, i, s, o) : Vu(r)) {
        t.push(c.i / e | 0), t.push(r.i / e | 0), t.push(_.i / e | 0), Ki(r), r = _.next, l = _.next;
        continue;
      }
      if (r = _, r === l) {
        h ? h === 1 ? (r = Xu(Zr(r), t, e), Zi(r, t, e, i, s, o, 2)) : h === 2 && Yu(r, t, e, i, s, o) : Zi(Zr(r), t, e, i, s, o, 1);
        break;
      }
    }
  }
}
function Vu(r) {
  var t = r.prev, e = r, i = r.next;
  if (me(t, e, i) >= 0) return !1;
  for (var s = t.x, o = e.x, h = i.x, l = t.y, c = e.y, _ = i.y, g = s < o ? s < h ? s : h : o < h ? o : h, T = l < c ? l < _ ? l : _ : c < _ ? c : _, w = s > o ? s > h ? s : h : o > h ? o : h, S = l > c ? l > _ ? l : _ : c > _ ? c : _, R = i.next; R !== t; ) {
    if (R.x >= g && R.x <= w && R.y >= T && R.y <= S && pi(s, l, o, c, h, _, R.x, R.y) && me(R.prev, R, R.next) >= 0) return !1;
    R = R.next;
  }
  return !0;
}
function zu(r, t, e, i) {
  var s = r.prev, o = r, h = r.next;
  if (me(s, o, h) >= 0) return !1;
  for (var l = s.x, c = o.x, _ = h.x, g = s.y, T = o.y, w = h.y, S = l < c ? l < _ ? l : _ : c < _ ? c : _, R = g < T ? g < w ? g : w : T < w ? T : w, D = l > c ? l > _ ? l : _ : c > _ ? c : _, L = g > T ? g > w ? g : w : T > w ? T : w, K = Kn(S, R, t, e, i), q = Kn(D, L, t, e, i), M = r.prevZ, Q = r.nextZ; M && M.z >= K && Q && Q.z <= q; ) {
    if (M.x >= S && M.x <= D && M.y >= R && M.y <= L && M !== s && M !== h && pi(l, g, c, T, _, w, M.x, M.y) && me(M.prev, M, M.next) >= 0 || (M = M.prevZ, Q.x >= S && Q.x <= D && Q.y >= R && Q.y <= L && Q !== s && Q !== h && pi(l, g, c, T, _, w, Q.x, Q.y) && me(Q.prev, Q, Q.next) >= 0)) return !1;
    Q = Q.nextZ;
  }
  for (; M && M.z >= K; ) {
    if (M.x >= S && M.x <= D && M.y >= R && M.y <= L && M !== s && M !== h && pi(l, g, c, T, _, w, M.x, M.y) && me(M.prev, M, M.next) >= 0) return !1;
    M = M.prevZ;
  }
  for (; Q && Q.z <= q; ) {
    if (Q.x >= S && Q.x <= D && Q.y >= R && Q.y <= L && Q !== s && Q !== h && pi(l, g, c, T, _, w, Q.x, Q.y) && me(Q.prev, Q, Q.next) >= 0) return !1;
    Q = Q.nextZ;
  }
  return !0;
}
function Xu(r, t, e) {
  var i = r;
  do {
    var s = i.prev, o = i.next.next;
    !nn(s, o) && qh(s, i, i.next, o) && Qi(s, o) && Qi(o, s) && (t.push(s.i / e | 0), t.push(i.i / e | 0), t.push(o.i / e | 0), Ki(i), Ki(i.next), i = r = o), i = i.next;
  } while (i !== r);
  return Zr(i);
}
function Yu(r, t, e, i, s, o) {
  var h = r;
  do {
    for (var l = h.next.next; l !== h.prev; ) {
      if (h.i !== l.i && tc(h, l)) {
        var c = Hh(h, l);
        h = Zr(h, h.next), c = Zr(c, c.next), Zi(h, t, e, i, s, o, 0), Zi(c, t, e, i, s, o, 0);
        return;
      }
      l = l.next;
    }
    h = h.next;
  } while (h !== r);
}
function Wu(r, t, e, i) {
  var s = [], o, h, l, c, _;
  for (o = 0, h = t.length; o < h; o++)
    l = t[o] * i, c = o < h - 1 ? t[o + 1] * i : r.length, _ = jh(r, l, c, i, !1), _ === _.next && (_.steiner = !0), s.push(Ju(_));
  for (s.sort(ju), o = 0; o < s.length; o++)
    e = qu(s[o], e);
  return e;
}
function ju(r, t) {
  return r.x - t.x;
}
function qu(r, t) {
  var e = Hu(r, t);
  if (!e)
    return t;
  var i = Hh(e, r);
  return Zr(i, i.next), Zr(e, e.next);
}
function Hu(r, t) {
  var e = t, i = r.x, s = r.y, o = -1 / 0, h;
  do {
    if (s <= e.y && s >= e.next.y && e.next.y !== e.y) {
      var l = e.x + (s - e.y) * (e.next.x - e.x) / (e.next.y - e.y);
      if (l <= i && l > o && (o = l, h = e.x < e.next.x ? e : e.next, l === i))
        return h;
    }
    e = e.next;
  } while (e !== t);
  if (!h) return null;
  var c = h, _ = h.x, g = h.y, T = 1 / 0, w;
  e = h;
  do
    i >= e.x && e.x >= _ && i !== e.x && pi(s < g ? i : o, s, _, g, s < g ? o : i, s, e.x, e.y) && (w = Math.abs(s - e.y) / (i - e.x), Qi(e, r) && (w < T || w === T && (e.x > h.x || e.x === h.x && Zu(h, e))) && (h = e, T = w)), e = e.next;
  while (e !== c);
  return h;
}
function Zu(r, t) {
  return me(r.prev, r, t.prev) < 0 && me(t.next, r, r.next) < 0;
}
function Qu(r, t, e, i) {
  var s = r;
  do
    s.z === 0 && (s.z = Kn(s.x, s.y, t, e, i)), s.prevZ = s.prev, s.nextZ = s.next, s = s.next;
  while (s !== r);
  s.prevZ.nextZ = null, s.prevZ = null, Ku(s);
}
function Ku(r) {
  var t, e, i, s, o, h, l, c, _ = 1;
  do {
    for (e = r, r = null, o = null, h = 0; e; ) {
      for (h++, i = e, l = 0, t = 0; t < _ && (l++, i = i.nextZ, !!i); t++)
        ;
      for (c = _; l > 0 || c > 0 && i; )
        l !== 0 && (c === 0 || !i || e.z <= i.z) ? (s = e, e = e.nextZ, l--) : (s = i, i = i.nextZ, c--), o ? o.nextZ = s : r = s, s.prevZ = o, o = s;
      e = i;
    }
    o.nextZ = null, _ *= 2;
  } while (h > 1);
  return r;
}
function Kn(r, t, e, i, s) {
  return r = (r - e) * s | 0, t = (t - i) * s | 0, r = (r | r << 8) & 16711935, r = (r | r << 4) & 252645135, r = (r | r << 2) & 858993459, r = (r | r << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, r | t << 1;
}
function Ju(r) {
  var t = r, e = r;
  do
    (t.x < e.x || t.x === e.x && t.y < e.y) && (e = t), t = t.next;
  while (t !== r);
  return e;
}
function pi(r, t, e, i, s, o, h, l) {
  return (s - h) * (t - l) >= (r - h) * (o - l) && (r - h) * (i - l) >= (e - h) * (t - l) && (e - h) * (o - l) >= (s - h) * (i - l);
}
function tc(r, t) {
  return r.next.i !== t.i && r.prev.i !== t.i && !ec(r, t) && // dones't intersect other edges
  (Qi(r, t) && Qi(t, r) && rc(r, t) && // locally visible
  (me(r.prev, r, t.prev) || me(r, t.prev, t)) || // does not create opposite-facing sectors
  nn(r, t) && me(r.prev, r, r.next) > 0 && me(t.prev, t, t.next) > 0);
}
function me(r, t, e) {
  return (t.y - r.y) * (e.x - t.x) - (t.x - r.x) * (e.y - t.y);
}
function nn(r, t) {
  return r.x === t.x && r.y === t.y;
}
function qh(r, t, e, i) {
  var s = fs(me(r, t, e)), o = fs(me(r, t, i)), h = fs(me(e, i, r)), l = fs(me(e, i, t));
  return !!(s !== o && h !== l || s === 0 && cs(r, e, t) || o === 0 && cs(r, i, t) || h === 0 && cs(e, r, i) || l === 0 && cs(e, t, i));
}
function cs(r, t, e) {
  return t.x <= Math.max(r.x, e.x) && t.x >= Math.min(r.x, e.x) && t.y <= Math.max(r.y, e.y) && t.y >= Math.min(r.y, e.y);
}
function fs(r) {
  return r > 0 ? 1 : r < 0 ? -1 : 0;
}
function ec(r, t) {
  var e = r;
  do {
    if (e.i !== r.i && e.next.i !== r.i && e.i !== t.i && e.next.i !== t.i && qh(e, e.next, r, t)) return !0;
    e = e.next;
  } while (e !== r);
  return !1;
}
function Qi(r, t) {
  return me(r.prev, r, r.next) < 0 ? me(r, t, r.next) >= 0 && me(r, r.prev, t) >= 0 : me(r, t, r.prev) < 0 || me(r, r.next, t) < 0;
}
function rc(r, t) {
  var e = r, i = !1, s = (r.x + t.x) / 2, o = (r.y + t.y) / 2;
  do
    e.y > o != e.next.y > o && e.next.y !== e.y && s < (e.next.x - e.x) * (o - e.y) / (e.next.y - e.y) + e.x && (i = !i), e = e.next;
  while (e !== r);
  return i;
}
function Hh(r, t) {
  var e = new Jn(r.i, r.x, r.y), i = new Jn(t.i, t.x, t.y), s = r.next, o = t.prev;
  return r.next = t, t.prev = r, e.next = s, s.prev = e, i.next = e, e.prev = i, o.next = i, i.prev = o, i;
}
function Pa(r, t, e, i) {
  var s = new Jn(r, t, e);
  return i ? (s.next = i.next, s.prev = i, i.next.prev = s, i.next = s) : (s.prev = s, s.next = s), s;
}
function Ki(r) {
  r.next.prev = r.prev, r.prev.next = r.next, r.prevZ && (r.prevZ.nextZ = r.nextZ), r.nextZ && (r.nextZ.prevZ = r.prevZ);
}
function Jn(r, t, e) {
  this.i = r, this.x = t, this.y = e, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
sn.deviation = function(r, t, e, i) {
  var s = t && t.length, o = s ? t[0] * e : r.length, h = Math.abs(to(r, 0, o, e));
  if (s)
    for (var l = 0, c = t.length; l < c; l++) {
      var _ = t[l] * e, g = l < c - 1 ? t[l + 1] * e : r.length;
      h -= Math.abs(to(r, _, g, e));
    }
  var T = 0;
  for (l = 0; l < i.length; l += 3) {
    var w = i[l] * e, S = i[l + 1] * e, R = i[l + 2] * e;
    T += Math.abs(
      (r[w] - r[R]) * (r[S + 1] - r[w + 1]) - (r[w] - r[S]) * (r[R + 1] - r[w + 1])
    );
  }
  return h === 0 && T === 0 ? 0 : Math.abs((T - h) / h);
};
function to(r, t, e, i) {
  for (var s = 0, o = t, h = e - i; o < e; o += i)
    s += (r[h] - r[o]) * (r[o + 1] + r[h + 1]), h = o;
  return s;
}
sn.flatten = function(r) {
  for (var t = r[0][0].length, e = { vertices: [], holes: [], dimensions: t }, i = 0, s = 0; s < r.length; s++) {
    for (var o = 0; o < r[s].length; o++)
      for (var h = 0; h < t; h++) e.vertices.push(r[s][o][h]);
    s > 0 && (i += r[s - 1].length, e.holes.push(i));
  }
  return e;
};
var Gs = { exports: {} };
/*! https://mths.be/punycode v1.4.1 by @mathias */
Gs.exports;
(function(r, t) {
  (function(e) {
    var i = t && !t.nodeType && t, s = r && !r.nodeType && r, o = typeof zi == "object" && zi;
    (o.global === o || o.window === o || o.self === o) && (e = o);
    var h, l = 2147483647, c = 36, _ = 1, g = 26, T = 38, w = 700, S = 72, R = 128, D = "-", L = /^xn--/, K = /[^\x20-\x7E]/, q = /[\x2E\u3002\uFF0E\uFF61]/g, M = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    }, Q = c - _, at = Math.floor, At = String.fromCharCode, Jt;
    function j(V) {
      throw new RangeError(M[V]);
    }
    function H(V, J) {
      for (var B = V.length, Wt = []; B--; )
        Wt[B] = J(V[B]);
      return Wt;
    }
    function Tt(V, J) {
      var B = V.split("@"), Wt = "";
      B.length > 1 && (Wt = B[0] + "@", V = B[1]), V = V.replace(q, ".");
      var ht = V.split("."), bt = H(ht, J).join(".");
      return Wt + bt;
    }
    function pt(V) {
      for (var J = [], B = 0, Wt = V.length, ht, bt; B < Wt; )
        ht = V.charCodeAt(B++), ht >= 55296 && ht <= 56319 && B < Wt ? (bt = V.charCodeAt(B++), (bt & 64512) == 56320 ? J.push(((ht & 1023) << 10) + (bt & 1023) + 65536) : (J.push(ht), B--)) : J.push(ht);
      return J;
    }
    function mt(V) {
      return H(V, function(J) {
        var B = "";
        return J > 65535 && (J -= 65536, B += At(J >>> 10 & 1023 | 55296), J = 56320 | J & 1023), B += At(J), B;
      }).join("");
    }
    function St(V) {
      return V - 48 < 10 ? V - 22 : V - 65 < 26 ? V - 65 : V - 97 < 26 ? V - 97 : c;
    }
    function yt(V, J) {
      return V + 22 + 75 * (V < 26) - ((J != 0) << 5);
    }
    function Yt(V, J, B) {
      var Wt = 0;
      for (V = B ? at(V / w) : V >> 1, V += at(V / J); V > Q * g >> 1; Wt += c)
        V = at(V / Q);
      return at(Wt + (Q + 1) * V / (V + T));
    }
    function Vt(V) {
      var J = [], B = V.length, Wt, ht = 0, bt = R, xe = S, lt, Ae, zt, It, jt, Te, ft, oe, ir;
      for (lt = V.lastIndexOf(D), lt < 0 && (lt = 0), Ae = 0; Ae < lt; ++Ae)
        V.charCodeAt(Ae) >= 128 && j("not-basic"), J.push(V.charCodeAt(Ae));
      for (zt = lt > 0 ? lt + 1 : 0; zt < B; ) {
        for (It = ht, jt = 1, Te = c; zt >= B && j("invalid-input"), ft = St(V.charCodeAt(zt++)), (ft >= c || ft > at((l - ht) / jt)) && j("overflow"), ht += ft * jt, oe = Te <= xe ? _ : Te >= xe + g ? g : Te - xe, !(ft < oe); Te += c)
          ir = c - oe, jt > at(l / ir) && j("overflow"), jt *= ir;
        Wt = J.length + 1, xe = Yt(ht - It, Wt, It == 0), at(ht / Wt) > l - bt && j("overflow"), bt += at(ht / Wt), ht %= Wt, J.splice(ht++, 0, bt);
      }
      return mt(J);
    }
    function ne(V) {
      var J, B, Wt, ht, bt, xe, lt, Ae, zt, It, jt, Te = [], ft, oe, ir, ae;
      for (V = pt(V), ft = V.length, J = R, B = 0, bt = S, xe = 0; xe < ft; ++xe)
        jt = V[xe], jt < 128 && Te.push(At(jt));
      for (Wt = ht = Te.length, ht && Te.push(D); Wt < ft; ) {
        for (lt = l, xe = 0; xe < ft; ++xe)
          jt = V[xe], jt >= J && jt < lt && (lt = jt);
        for (oe = Wt + 1, lt - J > at((l - B) / oe) && j("overflow"), B += (lt - J) * oe, J = lt, xe = 0; xe < ft; ++xe)
          if (jt = V[xe], jt < J && ++B > l && j("overflow"), jt == J) {
            for (Ae = B, zt = c; It = zt <= bt ? _ : zt >= bt + g ? g : zt - bt, !(Ae < It); zt += c)
              ae = Ae - It, ir = c - It, Te.push(
                At(yt(It + ae % ir, 0))
              ), Ae = at(ae / ir);
            Te.push(At(yt(Ae, 0))), bt = Yt(B, oe, Wt == ht), B = 0, ++Wt;
          }
        ++B, ++J;
      }
      return Te.join("");
    }
    function dt(V) {
      return Tt(V, function(J) {
        return L.test(J) ? Vt(J.slice(4).toLowerCase()) : J;
      });
    }
    function re(V) {
      return Tt(V, function(J) {
        return K.test(J) ? "xn--" + ne(J) : J;
      });
    }
    if (h = {
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
        decode: pt,
        encode: mt
      },
      decode: Vt,
      encode: ne,
      toASCII: re,
      toUnicode: dt
    }, i && s)
      if (r.exports == i)
        s.exports = h;
      else
        for (Jt in h)
          h.hasOwnProperty(Jt) && (i[Jt] = h[Jt]);
    else
      e.punycode = h;
  })(zi);
})(Gs, Gs.exports);
var ic = Gs.exports, sc = Error, nc = EvalError, oc = RangeError, ac = ReferenceError, Zh = SyntaxError, is = TypeError, hc = URIError, lc = function() {
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
  var o = Object.getOwnPropertySymbols(t);
  if (o.length !== 1 || o[0] !== e || !Object.prototype.propertyIsEnumerable.call(t, e))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var h = Object.getOwnPropertyDescriptor(t, e);
    if (h.value !== s || h.enumerable !== !0)
      return !1;
  }
  return !0;
}, Ra = typeof Symbol < "u" && Symbol, uc = lc, cc = function() {
  return typeof Ra != "function" || typeof Symbol != "function" || typeof Ra("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : uc();
}, $n = {
  __proto__: null,
  foo: {}
}, fc = Object, dc = function() {
  return { __proto__: $n }.foo === $n.foo && !($n instanceof fc);
}, _c = "Function.prototype.bind called on incompatible ", pc = Object.prototype.toString, mc = Math.max, vc = "[object Function]", Ca = function(t, e) {
  for (var i = [], s = 0; s < t.length; s += 1)
    i[s] = t[s];
  for (var o = 0; o < e.length; o += 1)
    i[o + t.length] = e[o];
  return i;
}, yc = function(t, e) {
  for (var i = [], s = e, o = 0; s < t.length; s += 1, o += 1)
    i[o] = t[s];
  return i;
}, gc = function(r, t) {
  for (var e = "", i = 0; i < r.length; i += 1)
    e += r[i], i + 1 < r.length && (e += t);
  return e;
}, $c = function(t) {
  var e = this;
  if (typeof e != "function" || pc.apply(e) !== vc)
    throw new TypeError(_c + e);
  for (var i = yc(arguments, 1), s, o = function() {
    if (this instanceof s) {
      var g = e.apply(
        this,
        Ca(i, arguments)
      );
      return Object(g) === g ? g : this;
    }
    return e.apply(
      t,
      Ca(i, arguments)
    );
  }, h = mc(0, e.length - i.length), l = [], c = 0; c < h; c++)
    l[c] = "$" + c;
  if (s = Function("binder", "return function (" + gc(l, ",") + "){ return binder.apply(this,arguments); }")(o), e.prototype) {
    var _ = function() {
    };
    _.prototype = e.prototype, s.prototype = new _(), _.prototype = null;
  }
  return s;
}, xc = $c, Mo = Function.prototype.bind || xc, Tc = Function.prototype.call, wc = Object.prototype.hasOwnProperty, Ec = Mo, bc = Ec.call(Tc, wc), Ct, Ac = sc, Sc = nc, Pc = oc, Rc = ac, Ti = Zh, gi = is, Cc = hc, Qh = Function, xn = function(r) {
  try {
    return Qh('"use strict"; return (' + r + ").constructor;")();
  } catch {
  }
}, Wr = Object.getOwnPropertyDescriptor;
if (Wr)
  try {
    Wr({}, "");
  } catch {
    Wr = null;
  }
var Tn = function() {
  throw new gi();
}, Ic = Wr ? function() {
  try {
    return arguments.callee, Tn;
  } catch {
    try {
      return Wr(arguments, "callee").get;
    } catch {
      return Tn;
    }
  }
}() : Tn, ni = cc(), Lc = dc(), Re = Object.getPrototypeOf || (Lc ? function(r) {
  return r.__proto__;
} : null), hi = {}, Fc = typeof Uint8Array > "u" || !Re ? Ct : Re(Uint8Array), jr = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? Ct : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? Ct : ArrayBuffer,
  "%ArrayIteratorPrototype%": ni && Re ? Re([][Symbol.iterator]()) : Ct,
  "%AsyncFromSyncIteratorPrototype%": Ct,
  "%AsyncFunction%": hi,
  "%AsyncGenerator%": hi,
  "%AsyncGeneratorFunction%": hi,
  "%AsyncIteratorPrototype%": hi,
  "%Atomics%": typeof Atomics > "u" ? Ct : Atomics,
  "%BigInt%": typeof BigInt > "u" ? Ct : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? Ct : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? Ct : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? Ct : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Ac,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": Sc,
  "%Float32Array%": typeof Float32Array > "u" ? Ct : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? Ct : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? Ct : FinalizationRegistry,
  "%Function%": Qh,
  "%GeneratorFunction%": hi,
  "%Int8Array%": typeof Int8Array > "u" ? Ct : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? Ct : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? Ct : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": ni && Re ? Re(Re([][Symbol.iterator]())) : Ct,
  "%JSON%": typeof JSON == "object" ? JSON : Ct,
  "%Map%": typeof Map > "u" ? Ct : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !ni || !Re ? Ct : Re((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? Ct : Promise,
  "%Proxy%": typeof Proxy > "u" ? Ct : Proxy,
  "%RangeError%": Pc,
  "%ReferenceError%": Rc,
  "%Reflect%": typeof Reflect > "u" ? Ct : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? Ct : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !ni || !Re ? Ct : Re((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? Ct : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": ni && Re ? Re(""[Symbol.iterator]()) : Ct,
  "%Symbol%": ni ? Symbol : Ct,
  "%SyntaxError%": Ti,
  "%ThrowTypeError%": Ic,
  "%TypedArray%": Fc,
  "%TypeError%": gi,
  "%Uint8Array%": typeof Uint8Array > "u" ? Ct : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? Ct : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? Ct : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? Ct : Uint32Array,
  "%URIError%": Cc,
  "%WeakMap%": typeof WeakMap > "u" ? Ct : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? Ct : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? Ct : WeakSet
};
if (Re)
  try {
    null.error;
  } catch (r) {
    var Mc = Re(Re(r));
    jr["%Error.prototype%"] = Mc;
  }
var Oc = function r(t) {
  var e;
  if (t === "%AsyncFunction%")
    e = xn("async function () {}");
  else if (t === "%GeneratorFunction%")
    e = xn("function* () {}");
  else if (t === "%AsyncGeneratorFunction%")
    e = xn("async function* () {}");
  else if (t === "%AsyncGenerator%") {
    var i = r("%AsyncGeneratorFunction%");
    i && (e = i.prototype);
  } else if (t === "%AsyncIteratorPrototype%") {
    var s = r("%AsyncGenerator%");
    s && Re && (e = Re(s.prototype));
  }
  return jr[t] = e, e;
}, Ia = {
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
}, ss = Mo, Vs = bc, Nc = ss.call(Function.call, Array.prototype.concat), Dc = ss.call(Function.apply, Array.prototype.splice), La = ss.call(Function.call, String.prototype.replace), zs = ss.call(Function.call, String.prototype.slice), Bc = ss.call(Function.call, RegExp.prototype.exec), Uc = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, kc = /\\(\\)?/g, Gc = function(t) {
  var e = zs(t, 0, 1), i = zs(t, -1);
  if (e === "%" && i !== "%")
    throw new Ti("invalid intrinsic syntax, expected closing `%`");
  if (i === "%" && e !== "%")
    throw new Ti("invalid intrinsic syntax, expected opening `%`");
  var s = [];
  return La(t, Uc, function(o, h, l, c) {
    s[s.length] = l ? La(c, kc, "$1") : h || o;
  }), s;
}, Vc = function(t, e) {
  var i = t, s;
  if (Vs(Ia, i) && (s = Ia[i], i = "%" + s[0] + "%"), Vs(jr, i)) {
    var o = jr[i];
    if (o === hi && (o = Oc(i)), typeof o > "u" && !e)
      throw new gi("intrinsic " + t + " exists, but is not available. Please file an issue!");
    return {
      alias: s,
      name: i,
      value: o
    };
  }
  throw new Ti("intrinsic " + t + " does not exist!");
}, Ri = function(t, e) {
  if (typeof t != "string" || t.length === 0)
    throw new gi("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof e != "boolean")
    throw new gi('"allowMissing" argument must be a boolean');
  if (Bc(/^%?[^%]*%?$/, t) === null)
    throw new Ti("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var i = Gc(t), s = i.length > 0 ? i[0] : "", o = Vc("%" + s + "%", e), h = o.name, l = o.value, c = !1, _ = o.alias;
  _ && (s = _[0], Dc(i, Nc([0, 1], _)));
  for (var g = 1, T = !0; g < i.length; g += 1) {
    var w = i[g], S = zs(w, 0, 1), R = zs(w, -1);
    if ((S === '"' || S === "'" || S === "`" || R === '"' || R === "'" || R === "`") && S !== R)
      throw new Ti("property names with quotes must have matching quotes");
    if ((w === "constructor" || !T) && (c = !0), s += "." + w, h = "%" + s + "%", Vs(jr, h))
      l = jr[h];
    else if (l != null) {
      if (!(w in l)) {
        if (!e)
          throw new gi("base intrinsic for " + t + " exists, but the property is not available.");
        return;
      }
      if (Wr && g + 1 >= i.length) {
        var D = Wr(l, w);
        T = !!D, T && "get" in D && !("originalValue" in D.get) ? l = D.get : l = l[w];
      } else
        T = Vs(l, w), l = l[w];
      T && !c && (jr[h] = l);
    }
  }
  return l;
}, Kh = { exports: {} }, wn, Fa;
function Oo() {
  if (Fa) return wn;
  Fa = 1;
  var r = Ri, t = r("%Object.defineProperty%", !0) || !1;
  if (t)
    try {
      t({}, "a", { value: 1 });
    } catch {
      t = !1;
    }
  return wn = t, wn;
}
var zc = Ri, As = zc("%Object.getOwnPropertyDescriptor%", !0);
if (As)
  try {
    As([], "length");
  } catch {
    As = null;
  }
var Jh = As, Ma = Oo(), Xc = Zh, oi = is, Oa = Jh, Yc = function(t, e, i) {
  if (!t || typeof t != "object" && typeof t != "function")
    throw new oi("`obj` must be an object or a function`");
  if (typeof e != "string" && typeof e != "symbol")
    throw new oi("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new oi("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new oi("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new oi("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new oi("`loose`, if provided, must be a boolean");
  var s = arguments.length > 3 ? arguments[3] : null, o = arguments.length > 4 ? arguments[4] : null, h = arguments.length > 5 ? arguments[5] : null, l = arguments.length > 6 ? arguments[6] : !1, c = !!Oa && Oa(t, e);
  if (Ma)
    Ma(t, e, {
      configurable: h === null && c ? c.configurable : !h,
      enumerable: s === null && c ? c.enumerable : !s,
      value: i,
      writable: o === null && c ? c.writable : !o
    });
  else if (l || !s && !o && !h)
    t[e] = i;
  else
    throw new Xc("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, eo = Oo(), tl = function() {
  return !!eo;
};
tl.hasArrayLengthDefineBug = function() {
  if (!eo)
    return null;
  try {
    return eo([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Wc = tl, jc = Ri, Na = Yc, qc = Wc(), Da = Jh, Ba = is, Hc = jc("%Math.floor%"), Zc = function(t, e) {
  if (typeof t != "function")
    throw new Ba("`fn` is not a function");
  if (typeof e != "number" || e < 0 || e > 4294967295 || Hc(e) !== e)
    throw new Ba("`length` must be a positive 32-bit integer");
  var i = arguments.length > 2 && !!arguments[2], s = !0, o = !0;
  if ("length" in t && Da) {
    var h = Da(t, "length");
    h && !h.configurable && (s = !1), h && !h.writable && (o = !1);
  }
  return (s || o || !i) && (qc ? Na(
    /** @type {Parameters<define>[0]} */
    t,
    "length",
    e,
    !0,
    !0
  ) : Na(
    /** @type {Parameters<define>[0]} */
    t,
    "length",
    e
  )), t;
};
(function(r) {
  var t = Mo, e = Ri, i = Zc, s = is, o = e("%Function.prototype.apply%"), h = e("%Function.prototype.call%"), l = e("%Reflect.apply%", !0) || t.call(h, o), c = Oo(), _ = e("%Math.max%");
  r.exports = function(w) {
    if (typeof w != "function")
      throw new s("a function is required");
    var S = l(t, h, arguments);
    return i(
      S,
      1 + _(0, w.length - (arguments.length - 1)),
      !0
    );
  };
  var g = function() {
    return l(t, o, arguments);
  };
  c ? c(r.exports, "apply", { value: g }) : r.exports.apply = g;
})(Kh);
var Qc = Kh.exports, el = Ri, rl = Qc, Kc = rl(el("String.prototype.indexOf")), Jc = function(t, e) {
  var i = el(t, !!e);
  return typeof i == "function" && Kc(t, ".prototype.") > -1 ? rl(i) : i;
};
const tf = {}, ef = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tf
}, Symbol.toStringTag, { value: "Module" })), rf = /* @__PURE__ */ ku(ef);
var No = typeof Map == "function" && Map.prototype, En = Object.getOwnPropertyDescriptor && No ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, Xs = No && En && typeof En.get == "function" ? En.get : null, Ua = No && Map.prototype.forEach, Do = typeof Set == "function" && Set.prototype, bn = Object.getOwnPropertyDescriptor && Do ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, Ys = Do && bn && typeof bn.get == "function" ? bn.get : null, ka = Do && Set.prototype.forEach, sf = typeof WeakMap == "function" && WeakMap.prototype, Xi = sf ? WeakMap.prototype.has : null, nf = typeof WeakSet == "function" && WeakSet.prototype, Yi = nf ? WeakSet.prototype.has : null, of = typeof WeakRef == "function" && WeakRef.prototype, Ga = of ? WeakRef.prototype.deref : null, af = Boolean.prototype.valueOf, hf = Object.prototype.toString, lf = Function.prototype.toString, uf = String.prototype.match, Bo = String.prototype.slice, Sr = String.prototype.replace, cf = String.prototype.toUpperCase, Va = String.prototype.toLowerCase, il = RegExp.prototype.test, za = Array.prototype.concat, cr = Array.prototype.join, ff = Array.prototype.slice, Xa = Math.floor, ro = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, An = Object.getOwnPropertySymbols, io = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, wi = typeof Symbol == "function" && typeof Symbol.iterator == "object", Ne = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === wi || !0) ? Symbol.toStringTag : null, sl = Object.prototype.propertyIsEnumerable, Ya = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(r) {
  return r.__proto__;
} : null);
function Wa(r, t) {
  if (r === 1 / 0 || r === -1 / 0 || r !== r || r && r > -1e3 && r < 1e3 || il.call(/e/, t))
    return t;
  var e = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof r == "number") {
    var i = r < 0 ? -Xa(-r) : Xa(r);
    if (i !== r) {
      var s = String(i), o = Bo.call(t, s.length + 1);
      return Sr.call(s, e, "$&_") + "." + Sr.call(Sr.call(o, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return Sr.call(t, e, "$&_");
}
var so = rf, ja = so.custom, qa = ol(ja) ? ja : null, df = function r(t, e, i, s) {
  var o = e || {};
  if (Ar(o, "quoteStyle") && o.quoteStyle !== "single" && o.quoteStyle !== "double")
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (Ar(o, "maxStringLength") && (typeof o.maxStringLength == "number" ? o.maxStringLength < 0 && o.maxStringLength !== 1 / 0 : o.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var h = Ar(o, "customInspect") ? o.customInspect : !0;
  if (typeof h != "boolean" && h !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (Ar(o, "indent") && o.indent !== null && o.indent !== "	" && !(parseInt(o.indent, 10) === o.indent && o.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (Ar(o, "numericSeparator") && typeof o.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var l = o.numericSeparator;
  if (typeof t > "u")
    return "undefined";
  if (t === null)
    return "null";
  if (typeof t == "boolean")
    return t ? "true" : "false";
  if (typeof t == "string")
    return hl(t, o);
  if (typeof t == "number") {
    if (t === 0)
      return 1 / 0 / t > 0 ? "0" : "-0";
    var c = String(t);
    return l ? Wa(t, c) : c;
  }
  if (typeof t == "bigint") {
    var _ = String(t) + "n";
    return l ? Wa(t, _) : _;
  }
  var g = typeof o.depth > "u" ? 5 : o.depth;
  if (typeof i > "u" && (i = 0), i >= g && g > 0 && typeof t == "object")
    return no(t) ? "[Array]" : "[Object]";
  var T = If(o, i);
  if (typeof s > "u")
    s = [];
  else if (al(s, t) >= 0)
    return "[Circular]";
  function w(St, yt, Yt) {
    if (yt && (s = ff.call(s), s.push(yt)), Yt) {
      var Vt = {
        depth: o.depth
      };
      return Ar(o, "quoteStyle") && (Vt.quoteStyle = o.quoteStyle), r(St, Vt, i + 1, s);
    }
    return r(St, o, i + 1, s);
  }
  if (typeof t == "function" && !Ha(t)) {
    var S = Tf(t), R = ds(t, w);
    return "[Function" + (S ? ": " + S : " (anonymous)") + "]" + (R.length > 0 ? " { " + cr.call(R, ", ") + " }" : "");
  }
  if (ol(t)) {
    var D = wi ? Sr.call(String(t), /^(Symbol\(.*\))_[^)]*$/, "$1") : io.call(t);
    return typeof t == "object" && !wi ? Mi(D) : D;
  }
  if (Pf(t)) {
    for (var L = "<" + Va.call(String(t.nodeName)), K = t.attributes || [], q = 0; q < K.length; q++)
      L += " " + K[q].name + "=" + nl(_f(K[q].value), "double", o);
    return L += ">", t.childNodes && t.childNodes.length && (L += "..."), L += "</" + Va.call(String(t.nodeName)) + ">", L;
  }
  if (no(t)) {
    if (t.length === 0)
      return "[]";
    var M = ds(t, w);
    return T && !Cf(M) ? "[" + oo(M, T) + "]" : "[ " + cr.call(M, ", ") + " ]";
  }
  if (mf(t)) {
    var Q = ds(t, w);
    return !("cause" in Error.prototype) && "cause" in t && !sl.call(t, "cause") ? "{ [" + String(t) + "] " + cr.call(za.call("[cause]: " + w(t.cause), Q), ", ") + " }" : Q.length === 0 ? "[" + String(t) + "]" : "{ [" + String(t) + "] " + cr.call(Q, ", ") + " }";
  }
  if (typeof t == "object" && h) {
    if (qa && typeof t[qa] == "function" && so)
      return so(t, { depth: g - i });
    if (h !== "symbol" && typeof t.inspect == "function")
      return t.inspect();
  }
  if (wf(t)) {
    var at = [];
    return Ua && Ua.call(t, function(St, yt) {
      at.push(w(yt, t, !0) + " => " + w(St, t));
    }), Za("Map", Xs.call(t), at, T);
  }
  if (Af(t)) {
    var At = [];
    return ka && ka.call(t, function(St) {
      At.push(w(St, t));
    }), Za("Set", Ys.call(t), At, T);
  }
  if (Ef(t))
    return Sn("WeakMap");
  if (Sf(t))
    return Sn("WeakSet");
  if (bf(t))
    return Sn("WeakRef");
  if (yf(t))
    return Mi(w(Number(t)));
  if ($f(t))
    return Mi(w(ro.call(t)));
  if (gf(t))
    return Mi(af.call(t));
  if (vf(t))
    return Mi(w(String(t)));
  if (typeof window < "u" && t === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && t === globalThis || typeof zi < "u" && t === zi)
    return "{ [object globalThis] }";
  if (!pf(t) && !Ha(t)) {
    var Jt = ds(t, w), j = Ya ? Ya(t) === Object.prototype : t instanceof Object || t.constructor === Object, H = t instanceof Object ? "" : "null prototype", Tt = !j && Ne && Object(t) === t && Ne in t ? Bo.call(Cr(t), 8, -1) : H ? "Object" : "", pt = j || typeof t.constructor != "function" ? "" : t.constructor.name ? t.constructor.name + " " : "", mt = pt + (Tt || H ? "[" + cr.call(za.call([], Tt || [], H || []), ": ") + "] " : "");
    return Jt.length === 0 ? mt + "{}" : T ? mt + "{" + oo(Jt, T) + "}" : mt + "{ " + cr.call(Jt, ", ") + " }";
  }
  return String(t);
};
function nl(r, t, e) {
  var i = (e.quoteStyle || t) === "double" ? '"' : "'";
  return i + r + i;
}
function _f(r) {
  return Sr.call(String(r), /"/g, "&quot;");
}
function no(r) {
  return Cr(r) === "[object Array]" && (!Ne || !(typeof r == "object" && Ne in r));
}
function pf(r) {
  return Cr(r) === "[object Date]" && (!Ne || !(typeof r == "object" && Ne in r));
}
function Ha(r) {
  return Cr(r) === "[object RegExp]" && (!Ne || !(typeof r == "object" && Ne in r));
}
function mf(r) {
  return Cr(r) === "[object Error]" && (!Ne || !(typeof r == "object" && Ne in r));
}
function vf(r) {
  return Cr(r) === "[object String]" && (!Ne || !(typeof r == "object" && Ne in r));
}
function yf(r) {
  return Cr(r) === "[object Number]" && (!Ne || !(typeof r == "object" && Ne in r));
}
function gf(r) {
  return Cr(r) === "[object Boolean]" && (!Ne || !(typeof r == "object" && Ne in r));
}
function ol(r) {
  if (wi)
    return r && typeof r == "object" && r instanceof Symbol;
  if (typeof r == "symbol")
    return !0;
  if (!r || typeof r != "object" || !io)
    return !1;
  try {
    return io.call(r), !0;
  } catch {
  }
  return !1;
}
function $f(r) {
  if (!r || typeof r != "object" || !ro)
    return !1;
  try {
    return ro.call(r), !0;
  } catch {
  }
  return !1;
}
var xf = Object.prototype.hasOwnProperty || function(r) {
  return r in this;
};
function Ar(r, t) {
  return xf.call(r, t);
}
function Cr(r) {
  return hf.call(r);
}
function Tf(r) {
  if (r.name)
    return r.name;
  var t = uf.call(lf.call(r), /^function\s*([\w$]+)/);
  return t ? t[1] : null;
}
function al(r, t) {
  if (r.indexOf)
    return r.indexOf(t);
  for (var e = 0, i = r.length; e < i; e++)
    if (r[e] === t)
      return e;
  return -1;
}
function wf(r) {
  if (!Xs || !r || typeof r != "object")
    return !1;
  try {
    Xs.call(r);
    try {
      Ys.call(r);
    } catch {
      return !0;
    }
    return r instanceof Map;
  } catch {
  }
  return !1;
}
function Ef(r) {
  if (!Xi || !r || typeof r != "object")
    return !1;
  try {
    Xi.call(r, Xi);
    try {
      Yi.call(r, Yi);
    } catch {
      return !0;
    }
    return r instanceof WeakMap;
  } catch {
  }
  return !1;
}
function bf(r) {
  if (!Ga || !r || typeof r != "object")
    return !1;
  try {
    return Ga.call(r), !0;
  } catch {
  }
  return !1;
}
function Af(r) {
  if (!Ys || !r || typeof r != "object")
    return !1;
  try {
    Ys.call(r);
    try {
      Xs.call(r);
    } catch {
      return !0;
    }
    return r instanceof Set;
  } catch {
  }
  return !1;
}
function Sf(r) {
  if (!Yi || !r || typeof r != "object")
    return !1;
  try {
    Yi.call(r, Yi);
    try {
      Xi.call(r, Xi);
    } catch {
      return !0;
    }
    return r instanceof WeakSet;
  } catch {
  }
  return !1;
}
function Pf(r) {
  return !r || typeof r != "object" ? !1 : typeof HTMLElement < "u" && r instanceof HTMLElement ? !0 : typeof r.nodeName == "string" && typeof r.getAttribute == "function";
}
function hl(r, t) {
  if (r.length > t.maxStringLength) {
    var e = r.length - t.maxStringLength, i = "... " + e + " more character" + (e > 1 ? "s" : "");
    return hl(Bo.call(r, 0, t.maxStringLength), t) + i;
  }
  var s = Sr.call(Sr.call(r, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, Rf);
  return nl(s, "single", t);
}
function Rf(r) {
  var t = r.charCodeAt(0), e = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[t];
  return e ? "\\" + e : "\\x" + (t < 16 ? "0" : "") + cf.call(t.toString(16));
}
function Mi(r) {
  return "Object(" + r + ")";
}
function Sn(r) {
  return r + " { ? }";
}
function Za(r, t, e, i) {
  var s = i ? oo(e, i) : cr.call(e, ", ");
  return r + " (" + t + ") {" + s + "}";
}
function Cf(r) {
  for (var t = 0; t < r.length; t++)
    if (al(r[t], `
`) >= 0)
      return !1;
  return !0;
}
function If(r, t) {
  var e;
  if (r.indent === "	")
    e = "	";
  else if (typeof r.indent == "number" && r.indent > 0)
    e = cr.call(Array(r.indent + 1), " ");
  else
    return null;
  return {
    base: e,
    prev: cr.call(Array(t + 1), e)
  };
}
function oo(r, t) {
  if (r.length === 0)
    return "";
  var e = `
` + t.prev + t.base;
  return e + cr.call(r, "," + e) + `
` + t.prev;
}
function ds(r, t) {
  var e = no(r), i = [];
  if (e) {
    i.length = r.length;
    for (var s = 0; s < r.length; s++)
      i[s] = Ar(r, s) ? t(r[s], r) : "";
  }
  var o = typeof An == "function" ? An(r) : [], h;
  if (wi) {
    h = {};
    for (var l = 0; l < o.length; l++)
      h["$" + o[l]] = o[l];
  }
  for (var c in r)
    Ar(r, c) && (e && String(Number(c)) === c && c < r.length || wi && h["$" + c] instanceof Symbol || (il.call(/[^\w$]/, c) ? i.push(t(c, r) + ": " + t(r[c], r)) : i.push(c + ": " + t(r[c], r))));
  if (typeof An == "function")
    for (var _ = 0; _ < o.length; _++)
      sl.call(r, o[_]) && i.push("[" + t(o[_]) + "]: " + t(r[o[_]], r));
  return i;
}
var ll = Ri, Ci = Jc, Lf = df, Ff = is, _s = ll("%WeakMap%", !0), ps = ll("%Map%", !0), Mf = Ci("WeakMap.prototype.get", !0), Of = Ci("WeakMap.prototype.set", !0), Nf = Ci("WeakMap.prototype.has", !0), Df = Ci("Map.prototype.get", !0), Bf = Ci("Map.prototype.set", !0), Uf = Ci("Map.prototype.has", !0), Uo = function(r, t) {
  for (var e = r, i; (i = e.next) !== null; e = i)
    if (i.key === t)
      return e.next = i.next, i.next = /** @type {NonNullable<typeof list.next>} */
      r.next, r.next = i, i;
}, kf = function(r, t) {
  var e = Uo(r, t);
  return e && e.value;
}, Gf = function(r, t, e) {
  var i = Uo(r, t);
  i ? i.value = e : r.next = /** @type {import('.').ListNode<typeof value>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: t,
    next: r.next,
    value: e
  };
}, Vf = function(r, t) {
  return !!Uo(r, t);
}, zf = function() {
  var t, e, i, s = {
    assert: function(o) {
      if (!s.has(o))
        throw new Ff("Side channel does not contain " + Lf(o));
    },
    get: function(o) {
      if (_s && o && (typeof o == "object" || typeof o == "function")) {
        if (t)
          return Mf(t, o);
      } else if (ps) {
        if (e)
          return Df(e, o);
      } else if (i)
        return kf(i, o);
    },
    has: function(o) {
      if (_s && o && (typeof o == "object" || typeof o == "function")) {
        if (t)
          return Nf(t, o);
      } else if (ps) {
        if (e)
          return Uf(e, o);
      } else if (i)
        return Vf(i, o);
      return !1;
    },
    set: function(o, h) {
      _s && o && (typeof o == "object" || typeof o == "function") ? (t || (t = new _s()), Of(t, o, h)) : ps ? (e || (e = new ps()), Bf(e, o, h)) : (i || (i = { key: {}, next: null }), Gf(i, o, h));
    }
  };
  return s;
}, Xf = String.prototype.replace, Yf = /%20/g, Pn = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, ko = {
  default: Pn.RFC3986,
  formatters: {
    RFC1738: function(r) {
      return Xf.call(r, Yf, "+");
    },
    RFC3986: function(r) {
      return String(r);
    }
  },
  RFC1738: Pn.RFC1738,
  RFC3986: Pn.RFC3986
}, Wf = ko, Rn = Object.prototype.hasOwnProperty, zr = Array.isArray, ar = function() {
  for (var r = [], t = 0; t < 256; ++t)
    r.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
  return r;
}(), jf = function(t) {
  for (; t.length > 1; ) {
    var e = t.pop(), i = e.obj[e.prop];
    if (zr(i)) {
      for (var s = [], o = 0; o < i.length; ++o)
        typeof i[o] < "u" && s.push(i[o]);
      e.obj[e.prop] = s;
    }
  }
}, ul = function(t, e) {
  for (var i = e && e.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, s = 0; s < t.length; ++s)
    typeof t[s] < "u" && (i[s] = t[s]);
  return i;
}, qf = function r(t, e, i) {
  if (!e)
    return t;
  if (typeof e != "object") {
    if (zr(t))
      t.push(e);
    else if (t && typeof t == "object")
      (i && (i.plainObjects || i.allowPrototypes) || !Rn.call(Object.prototype, e)) && (t[e] = !0);
    else
      return [t, e];
    return t;
  }
  if (!t || typeof t != "object")
    return [t].concat(e);
  var s = t;
  return zr(t) && !zr(e) && (s = ul(t, i)), zr(t) && zr(e) ? (e.forEach(function(o, h) {
    if (Rn.call(t, h)) {
      var l = t[h];
      l && typeof l == "object" && o && typeof o == "object" ? t[h] = r(l, o, i) : t.push(o);
    } else
      t[h] = o;
  }), t) : Object.keys(e).reduce(function(o, h) {
    var l = e[h];
    return Rn.call(o, h) ? o[h] = r(o[h], l, i) : o[h] = l, o;
  }, s);
}, Hf = function(t, e) {
  return Object.keys(e).reduce(function(i, s) {
    return i[s] = e[s], i;
  }, t);
}, Zf = function(r, t, e) {
  var i = r.replace(/\+/g, " ");
  if (e === "iso-8859-1")
    return i.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(i);
  } catch {
    return i;
  }
}, Cn = 1024, Qf = function(t, e, i, s, o) {
  if (t.length === 0)
    return t;
  var h = t;
  if (typeof t == "symbol" ? h = Symbol.prototype.toString.call(t) : typeof t != "string" && (h = String(t)), i === "iso-8859-1")
    return escape(h).replace(/%u[0-9a-f]{4}/gi, function(S) {
      return "%26%23" + parseInt(S.slice(2), 16) + "%3B";
    });
  for (var l = "", c = 0; c < h.length; c += Cn) {
    for (var _ = h.length >= Cn ? h.slice(c, c + Cn) : h, g = [], T = 0; T < _.length; ++T) {
      var w = _.charCodeAt(T);
      if (w === 45 || w === 46 || w === 95 || w === 126 || w >= 48 && w <= 57 || w >= 65 && w <= 90 || w >= 97 && w <= 122 || o === Wf.RFC1738 && (w === 40 || w === 41)) {
        g[g.length] = _.charAt(T);
        continue;
      }
      if (w < 128) {
        g[g.length] = ar[w];
        continue;
      }
      if (w < 2048) {
        g[g.length] = ar[192 | w >> 6] + ar[128 | w & 63];
        continue;
      }
      if (w < 55296 || w >= 57344) {
        g[g.length] = ar[224 | w >> 12] + ar[128 | w >> 6 & 63] + ar[128 | w & 63];
        continue;
      }
      T += 1, w = 65536 + ((w & 1023) << 10 | _.charCodeAt(T) & 1023), g[g.length] = ar[240 | w >> 18] + ar[128 | w >> 12 & 63] + ar[128 | w >> 6 & 63] + ar[128 | w & 63];
    }
    l += g.join("");
  }
  return l;
}, Kf = function(t) {
  for (var e = [{ obj: { o: t }, prop: "o" }], i = [], s = 0; s < e.length; ++s)
    for (var o = e[s], h = o.obj[o.prop], l = Object.keys(h), c = 0; c < l.length; ++c) {
      var _ = l[c], g = h[_];
      typeof g == "object" && g !== null && i.indexOf(g) === -1 && (e.push({ obj: h, prop: _ }), i.push(g));
    }
  return jf(e), t;
}, Jf = function(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}, td = function(t) {
  return !t || typeof t != "object" ? !1 : !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t));
}, ed = function(t, e) {
  return [].concat(t, e);
}, rd = function(t, e) {
  if (zr(t)) {
    for (var i = [], s = 0; s < t.length; s += 1)
      i.push(e(t[s]));
    return i;
  }
  return e(t);
}, cl = {
  arrayToObject: ul,
  assign: Hf,
  combine: ed,
  compact: Kf,
  decode: Zf,
  encode: Qf,
  isBuffer: td,
  isRegExp: Jf,
  maybeMap: rd,
  merge: qf
}, fl = zf, Ss = cl, Wi = ko, sd = Object.prototype.hasOwnProperty, dl = {
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
}, ur = Array.isArray, nd = Array.prototype.push, _l = function(r, t) {
  nd.apply(r, ur(t) ? t : [t]);
}, od = Date.prototype.toISOString, Qa = Wi.default, Se = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: Ss.encode,
  encodeValuesOnly: !1,
  format: Qa,
  formatter: Wi.formatters[Qa],
  // deprecated
  indices: !1,
  serializeDate: function(t) {
    return od.call(t);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, ad = function(t) {
  return typeof t == "string" || typeof t == "number" || typeof t == "boolean" || typeof t == "symbol" || typeof t == "bigint";
}, In = {}, hd = function r(t, e, i, s, o, h, l, c, _, g, T, w, S, R, D, L, K, q) {
  for (var M = t, Q = q, at = 0, At = !1; (Q = Q.get(In)) !== void 0 && !At; ) {
    var Jt = Q.get(t);
    if (at += 1, typeof Jt < "u") {
      if (Jt === at)
        throw new RangeError("Cyclic object value");
      At = !0;
    }
    typeof Q.get(In) > "u" && (at = 0);
  }
  if (typeof g == "function" ? M = g(e, M) : M instanceof Date ? M = S(M) : i === "comma" && ur(M) && (M = Ss.maybeMap(M, function(V) {
    return V instanceof Date ? S(V) : V;
  })), M === null) {
    if (h)
      return _ && !L ? _(e, Se.encoder, K, "key", R) : e;
    M = "";
  }
  if (ad(M) || Ss.isBuffer(M)) {
    if (_) {
      var j = L ? e : _(e, Se.encoder, K, "key", R);
      return [D(j) + "=" + D(_(M, Se.encoder, K, "value", R))];
    }
    return [D(e) + "=" + D(String(M))];
  }
  var H = [];
  if (typeof M > "u")
    return H;
  var Tt;
  if (i === "comma" && ur(M))
    L && _ && (M = Ss.maybeMap(M, _)), Tt = [{ value: M.length > 0 ? M.join(",") || null : void 0 }];
  else if (ur(g))
    Tt = g;
  else {
    var pt = Object.keys(M);
    Tt = T ? pt.sort(T) : pt;
  }
  var mt = c ? e.replace(/\./g, "%2E") : e, St = s && ur(M) && M.length === 1 ? mt + "[]" : mt;
  if (o && ur(M) && M.length === 0)
    return St + "[]";
  for (var yt = 0; yt < Tt.length; ++yt) {
    var Yt = Tt[yt], Vt = typeof Yt == "object" && typeof Yt.value < "u" ? Yt.value : M[Yt];
    if (!(l && Vt === null)) {
      var ne = w && c ? Yt.replace(/\./g, "%2E") : Yt, dt = ur(M) ? typeof i == "function" ? i(St, ne) : St : St + (w ? "." + ne : "[" + ne + "]");
      q.set(t, at);
      var re = fl();
      re.set(In, q), _l(H, r(
        Vt,
        dt,
        i,
        s,
        o,
        h,
        l,
        c,
        i === "comma" && L && ur(M) ? null : _,
        g,
        T,
        w,
        S,
        R,
        D,
        L,
        K,
        re
      ));
    }
  }
  return H;
}, ld = function(t) {
  if (!t)
    return Se;
  if (typeof t.allowEmptyArrays < "u" && typeof t.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof t.encodeDotInKeys < "u" && typeof t.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (t.encoder !== null && typeof t.encoder < "u" && typeof t.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var e = t.charset || Se.charset;
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var i = Wi.default;
  if (typeof t.format < "u") {
    if (!sd.call(Wi.formatters, t.format))
      throw new TypeError("Unknown format option provided.");
    i = t.format;
  }
  var s = Wi.formatters[i], o = Se.filter;
  (typeof t.filter == "function" || ur(t.filter)) && (o = t.filter);
  var h;
  if (t.arrayFormat in dl ? h = t.arrayFormat : "indices" in t ? h = t.indices ? "indices" : "repeat" : h = Se.arrayFormat, "commaRoundTrip" in t && typeof t.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var l = typeof t.allowDots > "u" ? t.encodeDotInKeys === !0 ? !0 : Se.allowDots : !!t.allowDots;
  return {
    addQueryPrefix: typeof t.addQueryPrefix == "boolean" ? t.addQueryPrefix : Se.addQueryPrefix,
    allowDots: l,
    allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : Se.allowEmptyArrays,
    arrayFormat: h,
    charset: e,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : Se.charsetSentinel,
    commaRoundTrip: t.commaRoundTrip,
    delimiter: typeof t.delimiter > "u" ? Se.delimiter : t.delimiter,
    encode: typeof t.encode == "boolean" ? t.encode : Se.encode,
    encodeDotInKeys: typeof t.encodeDotInKeys == "boolean" ? t.encodeDotInKeys : Se.encodeDotInKeys,
    encoder: typeof t.encoder == "function" ? t.encoder : Se.encoder,
    encodeValuesOnly: typeof t.encodeValuesOnly == "boolean" ? t.encodeValuesOnly : Se.encodeValuesOnly,
    filter: o,
    format: i,
    formatter: s,
    serializeDate: typeof t.serializeDate == "function" ? t.serializeDate : Se.serializeDate,
    skipNulls: typeof t.skipNulls == "boolean" ? t.skipNulls : Se.skipNulls,
    sort: typeof t.sort == "function" ? t.sort : null,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : Se.strictNullHandling
  };
}, ud = function(r, t) {
  var e = r, i = ld(t), s, o;
  typeof i.filter == "function" ? (o = i.filter, e = o("", e)) : ur(i.filter) && (o = i.filter, s = o);
  var h = [];
  if (typeof e != "object" || e === null)
    return "";
  var l = dl[i.arrayFormat], c = l === "comma" && i.commaRoundTrip;
  s || (s = Object.keys(e)), i.sort && s.sort(i.sort);
  for (var _ = fl(), g = 0; g < s.length; ++g) {
    var T = s[g];
    i.skipNulls && e[T] === null || _l(h, hd(
      e[T],
      T,
      l,
      c,
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
      _
    ));
  }
  var w = h.join(i.delimiter), S = i.addQueryPrefix === !0 ? "?" : "";
  return i.charsetSentinel && (i.charset === "iso-8859-1" ? S += "utf8=%26%2310003%3B&" : S += "utf8=%E2%9C%93&"), w.length > 0 ? S + w : "";
}, Ei = cl, ao = Object.prototype.hasOwnProperty, cd = Array.isArray, $e = {
  allowDots: !1,
  allowEmptyArrays: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decodeDotInKeys: !1,
  decoder: Ei.decode,
  delimiter: "&",
  depth: 5,
  duplicates: "combine",
  ignoreQueryPrefix: !1,
  interpretNumericEntities: !1,
  parameterLimit: 1e3,
  parseArrays: !0,
  plainObjects: !1,
  strictNullHandling: !1
}, fd = function(r) {
  return r.replace(/&#(\d+);/g, function(t, e) {
    return String.fromCharCode(parseInt(e, 10));
  });
}, pl = function(r, t) {
  return r && typeof r == "string" && t.comma && r.indexOf(",") > -1 ? r.split(",") : r;
}, dd = "utf8=%26%2310003%3B", _d = "utf8=%E2%9C%93", pd = function(t, e) {
  var i = { __proto__: null }, s = e.ignoreQueryPrefix ? t.replace(/^\?/, "") : t;
  s = s.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var o = e.parameterLimit === 1 / 0 ? void 0 : e.parameterLimit, h = s.split(e.delimiter, o), l = -1, c, _ = e.charset;
  if (e.charsetSentinel)
    for (c = 0; c < h.length; ++c)
      h[c].indexOf("utf8=") === 0 && (h[c] === _d ? _ = "utf-8" : h[c] === dd && (_ = "iso-8859-1"), l = c, c = h.length);
  for (c = 0; c < h.length; ++c)
    if (c !== l) {
      var g = h[c], T = g.indexOf("]="), w = T === -1 ? g.indexOf("=") : T + 1, S, R;
      w === -1 ? (S = e.decoder(g, $e.decoder, _, "key"), R = e.strictNullHandling ? null : "") : (S = e.decoder(g.slice(0, w), $e.decoder, _, "key"), R = Ei.maybeMap(
        pl(g.slice(w + 1), e),
        function(L) {
          return e.decoder(L, $e.decoder, _, "value");
        }
      )), R && e.interpretNumericEntities && _ === "iso-8859-1" && (R = fd(R)), g.indexOf("[]=") > -1 && (R = cd(R) ? [R] : R);
      var D = ao.call(i, S);
      D && e.duplicates === "combine" ? i[S] = Ei.combine(i[S], R) : (!D || e.duplicates === "last") && (i[S] = R);
    }
  return i;
}, md = function(r, t, e, i) {
  for (var s = i ? t : pl(t, e), o = r.length - 1; o >= 0; --o) {
    var h, l = r[o];
    if (l === "[]" && e.parseArrays)
      h = e.allowEmptyArrays && (s === "" || e.strictNullHandling && s === null) ? [] : [].concat(s);
    else {
      h = e.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var c = l.charAt(0) === "[" && l.charAt(l.length - 1) === "]" ? l.slice(1, -1) : l, _ = e.decodeDotInKeys ? c.replace(/%2E/g, ".") : c, g = parseInt(_, 10);
      !e.parseArrays && _ === "" ? h = { 0: s } : !isNaN(g) && l !== _ && String(g) === _ && g >= 0 && e.parseArrays && g <= e.arrayLimit ? (h = [], h[g] = s) : _ !== "__proto__" && (h[_] = s);
    }
    s = h;
  }
  return s;
}, vd = function(t, e, i, s) {
  if (t) {
    var o = i.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t, h = /(\[[^[\]]*])/, l = /(\[[^[\]]*])/g, c = i.depth > 0 && h.exec(o), _ = c ? o.slice(0, c.index) : o, g = [];
    if (_) {
      if (!i.plainObjects && ao.call(Object.prototype, _) && !i.allowPrototypes)
        return;
      g.push(_);
    }
    for (var T = 0; i.depth > 0 && (c = l.exec(o)) !== null && T < i.depth; ) {
      if (T += 1, !i.plainObjects && ao.call(Object.prototype, c[1].slice(1, -1)) && !i.allowPrototypes)
        return;
      g.push(c[1]);
    }
    return c && g.push("[" + o.slice(c.index) + "]"), md(g, e, i, s);
  }
}, yd = function(t) {
  if (!t)
    return $e;
  if (typeof t.allowEmptyArrays < "u" && typeof t.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof t.decodeDotInKeys < "u" && typeof t.decodeDotInKeys != "boolean")
    throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
  if (t.decoder !== null && typeof t.decoder < "u" && typeof t.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var e = typeof t.charset > "u" ? $e.charset : t.charset, i = typeof t.duplicates > "u" ? $e.duplicates : t.duplicates;
  if (i !== "combine" && i !== "first" && i !== "last")
    throw new TypeError("The duplicates option must be either combine, first, or last");
  var s = typeof t.allowDots > "u" ? t.decodeDotInKeys === !0 ? !0 : $e.allowDots : !!t.allowDots;
  return {
    allowDots: s,
    allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : $e.allowEmptyArrays,
    allowPrototypes: typeof t.allowPrototypes == "boolean" ? t.allowPrototypes : $e.allowPrototypes,
    allowSparse: typeof t.allowSparse == "boolean" ? t.allowSparse : $e.allowSparse,
    arrayLimit: typeof t.arrayLimit == "number" ? t.arrayLimit : $e.arrayLimit,
    charset: e,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : $e.charsetSentinel,
    comma: typeof t.comma == "boolean" ? t.comma : $e.comma,
    decodeDotInKeys: typeof t.decodeDotInKeys == "boolean" ? t.decodeDotInKeys : $e.decodeDotInKeys,
    decoder: typeof t.decoder == "function" ? t.decoder : $e.decoder,
    delimiter: typeof t.delimiter == "string" || Ei.isRegExp(t.delimiter) ? t.delimiter : $e.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof t.depth == "number" || t.depth === !1 ? +t.depth : $e.depth,
    duplicates: i,
    ignoreQueryPrefix: t.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof t.interpretNumericEntities == "boolean" ? t.interpretNumericEntities : $e.interpretNumericEntities,
    parameterLimit: typeof t.parameterLimit == "number" ? t.parameterLimit : $e.parameterLimit,
    parseArrays: t.parseArrays !== !1,
    plainObjects: typeof t.plainObjects == "boolean" ? t.plainObjects : $e.plainObjects,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : $e.strictNullHandling
  };
}, gd = function(r, t) {
  var e = yd(t);
  if (r === "" || r === null || typeof r > "u")
    return e.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var i = typeof r == "string" ? pd(r, e) : r, s = e.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = Object.keys(i), h = 0; h < o.length; ++h) {
    var l = o[h], c = vd(l, i[l], e, typeof r == "string");
    s = Ei.merge(s, c, e);
  }
  return e.allowSparse === !0 ? s : Ei.compact(s);
}, $d = ud, xd = gd, Td = ko, wd = {
  formats: Td,
  parse: xd,
  stringify: $d
}, Ed = ic;
function tr() {
  this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
}
var bd = /^([a-z0-9.+-]+:)/i, Ad = /:[0-9]*$/, Sd = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/, Pd = [
  "<",
  ">",
  '"',
  "`",
  " ",
  "\r",
  `
`,
  "	"
], Rd = [
  "{",
  "}",
  "|",
  "\\",
  "^",
  "`"
].concat(Pd), ho = ["'"].concat(Rd), Ka = [
  "%",
  "/",
  "?",
  ";",
  "#"
].concat(ho), Ja = [
  "/",
  "?",
  "#"
], Cd = 255, th = /^[+a-z0-9A-Z_-]{0,63}$/, Id = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, Ld = {
  javascript: !0,
  "javascript:": !0
}, lo = {
  javascript: !0,
  "javascript:": !0
}, $i = {
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
}, uo = wd;
function on(r, t, e) {
  if (r && typeof r == "object" && r instanceof tr)
    return r;
  var i = new tr();
  return i.parse(r, t, e), i;
}
tr.prototype.parse = function(r, t, e) {
  if (typeof r != "string")
    throw new TypeError("Parameter 'url' must be a string, not " + typeof r);
  var i = r.indexOf("?"), s = i !== -1 && i < r.indexOf("#") ? "?" : "#", o = r.split(s), h = /\\/g;
  o[0] = o[0].replace(h, "/"), r = o.join(s);
  var l = r;
  if (l = l.trim(), !e && r.split("#").length === 1) {
    var c = Sd.exec(l);
    if (c)
      return this.path = l, this.href = l, this.pathname = c[1], c[2] ? (this.search = c[2], t ? this.query = uo.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : t && (this.search = "", this.query = {}), this;
  }
  var _ = bd.exec(l);
  if (_) {
    _ = _[0];
    var g = _.toLowerCase();
    this.protocol = g, l = l.substr(_.length);
  }
  if (e || _ || l.match(/^\/\/[^@/]+@[^@/]+/)) {
    var T = l.substr(0, 2) === "//";
    T && !(_ && lo[_]) && (l = l.substr(2), this.slashes = !0);
  }
  if (!lo[_] && (T || _ && !$i[_])) {
    for (var w = -1, S = 0; S < Ja.length; S++) {
      var R = l.indexOf(Ja[S]);
      R !== -1 && (w === -1 || R < w) && (w = R);
    }
    var D, L;
    w === -1 ? L = l.lastIndexOf("@") : L = l.lastIndexOf("@", w), L !== -1 && (D = l.slice(0, L), l = l.slice(L + 1), this.auth = decodeURIComponent(D)), w = -1;
    for (var S = 0; S < Ka.length; S++) {
      var R = l.indexOf(Ka[S]);
      R !== -1 && (w === -1 || R < w) && (w = R);
    }
    w === -1 && (w = l.length), this.host = l.slice(0, w), l = l.slice(w), this.parseHost(), this.hostname = this.hostname || "";
    var K = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!K)
      for (var q = this.hostname.split(/\./), S = 0, M = q.length; S < M; S++) {
        var Q = q[S];
        if (Q && !Q.match(th)) {
          for (var at = "", At = 0, Jt = Q.length; At < Jt; At++)
            Q.charCodeAt(At) > 127 ? at += "x" : at += Q[At];
          if (!at.match(th)) {
            var j = q.slice(0, S), H = q.slice(S + 1), Tt = Q.match(Id);
            Tt && (j.push(Tt[1]), H.unshift(Tt[2])), H.length && (l = "/" + H.join(".") + l), this.hostname = j.join(".");
            break;
          }
        }
      }
    this.hostname.length > Cd ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), K || (this.hostname = Ed.toASCII(this.hostname));
    var pt = this.port ? ":" + this.port : "", mt = this.hostname || "";
    this.host = mt + pt, this.href += this.host, K && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), l[0] !== "/" && (l = "/" + l));
  }
  if (!Ld[g])
    for (var S = 0, M = ho.length; S < M; S++) {
      var St = ho[S];
      if (l.indexOf(St) !== -1) {
        var yt = encodeURIComponent(St);
        yt === St && (yt = escape(St)), l = l.split(St).join(yt);
      }
    }
  var Yt = l.indexOf("#");
  Yt !== -1 && (this.hash = l.substr(Yt), l = l.slice(0, Yt));
  var Vt = l.indexOf("?");
  if (Vt !== -1 ? (this.search = l.substr(Vt), this.query = l.substr(Vt + 1), t && (this.query = uo.parse(this.query)), l = l.slice(0, Vt)) : t && (this.search = "", this.query = {}), l && (this.pathname = l), $i[g] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
    var pt = this.pathname || "", ne = this.search || "";
    this.path = pt + ne;
  }
  return this.href = this.format(), this;
};
function Fd(r) {
  return typeof r == "string" && (r = on(r)), r instanceof tr ? r.format() : tr.prototype.format.call(r);
}
tr.prototype.format = function() {
  var r = this.auth || "";
  r && (r = encodeURIComponent(r), r = r.replace(/%3A/i, ":"), r += "@");
  var t = this.protocol || "", e = this.pathname || "", i = this.hash || "", s = !1, o = "";
  this.host ? s = r + this.host : this.hostname && (s = r + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (s += ":" + this.port)), this.query && typeof this.query == "object" && Object.keys(this.query).length && (o = uo.stringify(this.query, {
    arrayFormat: "repeat",
    addQueryPrefix: !1
  }));
  var h = this.search || o && "?" + o || "";
  return t && t.substr(-1) !== ":" && (t += ":"), this.slashes || (!t || $i[t]) && s !== !1 ? (s = "//" + (s || ""), e && e.charAt(0) !== "/" && (e = "/" + e)) : s || (s = ""), i && i.charAt(0) !== "#" && (i = "#" + i), h && h.charAt(0) !== "?" && (h = "?" + h), e = e.replace(/[?#]/g, function(l) {
    return encodeURIComponent(l);
  }), h = h.replace("#", "%23"), t + s + e + h + i;
};
function Md(r, t) {
  return on(r, !1, !0).resolve(t);
}
tr.prototype.resolve = function(r) {
  return this.resolveObject(on(r, !1, !0)).format();
};
tr.prototype.resolveObject = function(r) {
  if (typeof r == "string") {
    var t = new tr();
    t.parse(r, !1, !0), r = t;
  }
  for (var e = new tr(), i = Object.keys(this), s = 0; s < i.length; s++) {
    var o = i[s];
    e[o] = this[o];
  }
  if (e.hash = r.hash, r.href === "")
    return e.href = e.format(), e;
  if (r.slashes && !r.protocol) {
    for (var h = Object.keys(r), l = 0; l < h.length; l++) {
      var c = h[l];
      c !== "protocol" && (e[c] = r[c]);
    }
    return $i[e.protocol] && e.hostname && !e.pathname && (e.pathname = "/", e.path = e.pathname), e.href = e.format(), e;
  }
  if (r.protocol && r.protocol !== e.protocol) {
    if (!$i[r.protocol]) {
      for (var _ = Object.keys(r), g = 0; g < _.length; g++) {
        var T = _[g];
        e[T] = r[T];
      }
      return e.href = e.format(), e;
    }
    if (e.protocol = r.protocol, !r.host && !lo[r.protocol]) {
      for (var M = (r.pathname || "").split("/"); M.length && !(r.host = M.shift()); )
        ;
      r.host || (r.host = ""), r.hostname || (r.hostname = ""), M[0] !== "" && M.unshift(""), M.length < 2 && M.unshift(""), e.pathname = M.join("/");
    } else
      e.pathname = r.pathname;
    if (e.search = r.search, e.query = r.query, e.host = r.host || "", e.auth = r.auth, e.hostname = r.hostname || r.host, e.port = r.port, e.pathname || e.search) {
      var w = e.pathname || "", S = e.search || "";
      e.path = w + S;
    }
    return e.slashes = e.slashes || r.slashes, e.href = e.format(), e;
  }
  var R = e.pathname && e.pathname.charAt(0) === "/", D = r.host || r.pathname && r.pathname.charAt(0) === "/", L = D || R || e.host && r.pathname, K = L, q = e.pathname && e.pathname.split("/") || [], M = r.pathname && r.pathname.split("/") || [], Q = e.protocol && !$i[e.protocol];
  if (Q && (e.hostname = "", e.port = null, e.host && (q[0] === "" ? q[0] = e.host : q.unshift(e.host)), e.host = "", r.protocol && (r.hostname = null, r.port = null, r.host && (M[0] === "" ? M[0] = r.host : M.unshift(r.host)), r.host = null), L = L && (M[0] === "" || q[0] === "")), D)
    e.host = r.host || r.host === "" ? r.host : e.host, e.hostname = r.hostname || r.hostname === "" ? r.hostname : e.hostname, e.search = r.search, e.query = r.query, q = M;
  else if (M.length)
    q || (q = []), q.pop(), q = q.concat(M), e.search = r.search, e.query = r.query;
  else if (r.search != null) {
    if (Q) {
      e.host = q.shift(), e.hostname = e.host;
      var at = e.host && e.host.indexOf("@") > 0 ? e.host.split("@") : !1;
      at && (e.auth = at.shift(), e.hostname = at.shift(), e.host = e.hostname);
    }
    return e.search = r.search, e.query = r.query, (e.pathname !== null || e.search !== null) && (e.path = (e.pathname ? e.pathname : "") + (e.search ? e.search : "")), e.href = e.format(), e;
  }
  if (!q.length)
    return e.pathname = null, e.search ? e.path = "/" + e.search : e.path = null, e.href = e.format(), e;
  for (var At = q.slice(-1)[0], Jt = (e.host || r.host || q.length > 1) && (At === "." || At === "..") || At === "", j = 0, H = q.length; H >= 0; H--)
    At = q[H], At === "." ? q.splice(H, 1) : At === ".." ? (q.splice(H, 1), j++) : j && (q.splice(H, 1), j--);
  if (!L && !K)
    for (; j--; j)
      q.unshift("..");
  L && q[0] !== "" && (!q[0] || q[0].charAt(0) !== "/") && q.unshift(""), Jt && q.join("/").substr(-1) !== "/" && q.push("");
  var Tt = q[0] === "" || q[0] && q[0].charAt(0) === "/";
  if (Q) {
    e.hostname = Tt ? "" : q.length ? q.shift() : "", e.host = e.hostname;
    var at = e.host && e.host.indexOf("@") > 0 ? e.host.split("@") : !1;
    at && (e.auth = at.shift(), e.hostname = at.shift(), e.host = e.hostname);
  }
  return L = L || e.host && q.length, L && !Tt && q.unshift(""), q.length > 0 ? e.pathname = q.join("/") : (e.pathname = null, e.path = null), (e.pathname !== null || e.search !== null) && (e.path = (e.pathname ? e.pathname : "") + (e.search ? e.search : "")), e.auth = r.auth || e.auth, e.slashes = e.slashes || r.slashes, e.href = e.format(), e;
};
tr.prototype.parseHost = function() {
  var r = this.host, t = Ad.exec(r);
  t && (t = t[0], t !== ":" && (this.port = t.substr(1)), r = r.substr(0, r.length - t.length)), r && (this.hostname = r);
};
var Od = on, Nd = Md, Dd = Fd;
const eh = {};
function Nt(r, t, e = 3) {
  if (eh[t])
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
Deprecated since v${r}`), console.warn(i))), eh[t] = !0;
}
const Go = {
  /**
   * @deprecated since 7.3.0
   */
  get parse() {
    return Nt("7.3.0", "utils.url.parse is deprecated, use native URL API instead."), Od;
  },
  /**
   * @deprecated since 7.3.0
   */
  get format() {
    return Nt("7.3.0", "utils.url.format is deprecated, use native URL API instead."), Dd;
  },
  /**
   * @deprecated since 7.3.0
   */
  get resolve() {
    return Nt("7.3.0", "utils.url.resolve is deprecated, use native URL API instead."), Nd;
  }
};
let Ln;
function Bd() {
  return typeof Ln > "u" && (Ln = function() {
    var t;
    const r = {
      stencil: !0,
      failIfMajorPerformanceCaveat: Dt.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
    };
    try {
      if (!Dt.ADAPTER.getWebGLRenderingContext())
        return !1;
      const e = Dt.ADAPTER.createCanvas();
      let i = e.getContext("webgl", r) || e.getContext("experimental-webgl", r);
      const s = !!((t = i == null ? void 0 : i.getContextAttributes()) != null && t.stencil);
      if (i) {
        const o = i.getExtension("WEBGL_lose_context");
        o && o.loseContext();
      }
      return i = null, s;
    } catch {
      return !1;
    }
  }()), Ln;
}
var Ud = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, mr = function(r) {
  return typeof r == "string" ? r.length > 0 : typeof r == "number";
}, Ce = function(r, t, e) {
  return t === void 0 && (t = 0), e === void 0 && (e = Math.pow(10, t)), Math.round(e * r) / e + 0;
}, je = function(r, t, e) {
  return t === void 0 && (t = 0), e === void 0 && (e = 1), r > e ? e : r > t ? r : t;
}, ml = function(r) {
  return (r = isFinite(r) ? r % 360 : 0) > 0 ? r : r + 360;
}, rh = function(r) {
  return { r: je(r.r, 0, 255), g: je(r.g, 0, 255), b: je(r.b, 0, 255), a: je(r.a) };
}, Fn = function(r) {
  return { r: Ce(r.r), g: Ce(r.g), b: Ce(r.b), a: Ce(r.a, 3) };
}, kd = /^#([0-9a-f]{3,8})$/i, ms = function(r) {
  var t = r.toString(16);
  return t.length < 2 ? "0" + t : t;
}, vl = function(r) {
  var t = r.r, e = r.g, i = r.b, s = r.a, o = Math.max(t, e, i), h = o - Math.min(t, e, i), l = h ? o === t ? (e - i) / h : o === e ? 2 + (i - t) / h : 4 + (t - e) / h : 0;
  return { h: 60 * (l < 0 ? l + 6 : l), s: o ? h / o * 100 : 0, v: o / 255 * 100, a: s };
}, yl = function(r) {
  var t = r.h, e = r.s, i = r.v, s = r.a;
  t = t / 360 * 6, e /= 100, i /= 100;
  var o = Math.floor(t), h = i * (1 - e), l = i * (1 - (t - o) * e), c = i * (1 - (1 - t + o) * e), _ = o % 6;
  return { r: 255 * [i, l, h, h, c, i][_], g: 255 * [c, i, i, l, h, h][_], b: 255 * [h, h, c, i, i, l][_], a: s };
}, ih = function(r) {
  return { h: ml(r.h), s: je(r.s, 0, 100), l: je(r.l, 0, 100), a: je(r.a) };
}, sh = function(r) {
  return { h: Ce(r.h), s: Ce(r.s), l: Ce(r.l), a: Ce(r.a, 3) };
}, nh = function(r) {
  return yl((e = (t = r).s, { h: t.h, s: (e *= ((i = t.l) < 50 ? i : 100 - i) / 100) > 0 ? 2 * e / (i + e) * 100 : 0, v: i + e, a: t.a }));
  var t, e, i;
}, ji = function(r) {
  return { h: (t = vl(r)).h, s: (s = (200 - (e = t.s)) * (i = t.v) / 100) > 0 && s < 200 ? e * i / 100 / (s <= 100 ? s : 200 - s) * 100 : 0, l: s / 2, a: t.a };
  var t, e, i, s;
}, Gd = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Vd = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, zd = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Xd = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, co = { string: [[function(r) {
  var t = kd.exec(r);
  return t ? (r = t[1]).length <= 4 ? { r: parseInt(r[0] + r[0], 16), g: parseInt(r[1] + r[1], 16), b: parseInt(r[2] + r[2], 16), a: r.length === 4 ? Ce(parseInt(r[3] + r[3], 16) / 255, 2) : 1 } : r.length === 6 || r.length === 8 ? { r: parseInt(r.substr(0, 2), 16), g: parseInt(r.substr(2, 2), 16), b: parseInt(r.substr(4, 2), 16), a: r.length === 8 ? Ce(parseInt(r.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(r) {
  var t = zd.exec(r) || Xd.exec(r);
  return t ? t[2] !== t[4] || t[4] !== t[6] ? null : rh({ r: Number(t[1]) / (t[2] ? 100 / 255 : 1), g: Number(t[3]) / (t[4] ? 100 / 255 : 1), b: Number(t[5]) / (t[6] ? 100 / 255 : 1), a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1) }) : null;
}, "rgb"], [function(r) {
  var t = Gd.exec(r) || Vd.exec(r);
  if (!t) return null;
  var e, i, s = ih({ h: (e = t[1], i = t[2], i === void 0 && (i = "deg"), Number(e) * (Ud[i] || 1)), s: Number(t[3]), l: Number(t[4]), a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1) });
  return nh(s);
}, "hsl"]], object: [[function(r) {
  var t = r.r, e = r.g, i = r.b, s = r.a, o = s === void 0 ? 1 : s;
  return mr(t) && mr(e) && mr(i) ? rh({ r: Number(t), g: Number(e), b: Number(i), a: Number(o) }) : null;
}, "rgb"], [function(r) {
  var t = r.h, e = r.s, i = r.l, s = r.a, o = s === void 0 ? 1 : s;
  if (!mr(t) || !mr(e) || !mr(i)) return null;
  var h = ih({ h: Number(t), s: Number(e), l: Number(i), a: Number(o) });
  return nh(h);
}, "hsl"], [function(r) {
  var t = r.h, e = r.s, i = r.v, s = r.a, o = s === void 0 ? 1 : s;
  if (!mr(t) || !mr(e) || !mr(i)) return null;
  var h = function(l) {
    return { h: ml(l.h), s: je(l.s, 0, 100), v: je(l.v, 0, 100), a: je(l.a) };
  }({ h: Number(t), s: Number(e), v: Number(i), a: Number(o) });
  return yl(h);
}, "hsv"]] }, oh = function(r, t) {
  for (var e = 0; e < t.length; e++) {
    var i = t[e][0](r);
    if (i) return [i, t[e][1]];
  }
  return [null, void 0];
}, Yd = function(r) {
  return typeof r == "string" ? oh(r.trim(), co.string) : typeof r == "object" && r !== null ? oh(r, co.object) : [null, void 0];
}, Mn = function(r, t) {
  var e = ji(r);
  return { h: e.h, s: je(e.s + 100 * t, 0, 100), l: e.l, a: e.a };
}, On = function(r) {
  return (299 * r.r + 587 * r.g + 114 * r.b) / 1e3 / 255;
}, ah = function(r, t) {
  var e = ji(r);
  return { h: e.h, s: e.s, l: je(e.l + 100 * t, 0, 100), a: e.a };
}, fo = function() {
  function r(t) {
    this.parsed = Yd(t)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return r.prototype.isValid = function() {
    return this.parsed !== null;
  }, r.prototype.brightness = function() {
    return Ce(On(this.rgba), 2);
  }, r.prototype.isDark = function() {
    return On(this.rgba) < 0.5;
  }, r.prototype.isLight = function() {
    return On(this.rgba) >= 0.5;
  }, r.prototype.toHex = function() {
    return t = Fn(this.rgba), e = t.r, i = t.g, s = t.b, h = (o = t.a) < 1 ? ms(Ce(255 * o)) : "", "#" + ms(e) + ms(i) + ms(s) + h;
    var t, e, i, s, o, h;
  }, r.prototype.toRgb = function() {
    return Fn(this.rgba);
  }, r.prototype.toRgbString = function() {
    return t = Fn(this.rgba), e = t.r, i = t.g, s = t.b, (o = t.a) < 1 ? "rgba(" + e + ", " + i + ", " + s + ", " + o + ")" : "rgb(" + e + ", " + i + ", " + s + ")";
    var t, e, i, s, o;
  }, r.prototype.toHsl = function() {
    return sh(ji(this.rgba));
  }, r.prototype.toHslString = function() {
    return t = sh(ji(this.rgba)), e = t.h, i = t.s, s = t.l, (o = t.a) < 1 ? "hsla(" + e + ", " + i + "%, " + s + "%, " + o + ")" : "hsl(" + e + ", " + i + "%, " + s + "%)";
    var t, e, i, s, o;
  }, r.prototype.toHsv = function() {
    return t = vl(this.rgba), { h: Ce(t.h), s: Ce(t.s), v: Ce(t.v), a: Ce(t.a, 3) };
    var t;
  }, r.prototype.invert = function() {
    return hr({ r: 255 - (t = this.rgba).r, g: 255 - t.g, b: 255 - t.b, a: t.a });
    var t;
  }, r.prototype.saturate = function(t) {
    return t === void 0 && (t = 0.1), hr(Mn(this.rgba, t));
  }, r.prototype.desaturate = function(t) {
    return t === void 0 && (t = 0.1), hr(Mn(this.rgba, -t));
  }, r.prototype.grayscale = function() {
    return hr(Mn(this.rgba, -1));
  }, r.prototype.lighten = function(t) {
    return t === void 0 && (t = 0.1), hr(ah(this.rgba, t));
  }, r.prototype.darken = function(t) {
    return t === void 0 && (t = 0.1), hr(ah(this.rgba, -t));
  }, r.prototype.rotate = function(t) {
    return t === void 0 && (t = 15), this.hue(this.hue() + t);
  }, r.prototype.alpha = function(t) {
    return typeof t == "number" ? hr({ r: (e = this.rgba).r, g: e.g, b: e.b, a: t }) : Ce(this.rgba.a, 3);
    var e;
  }, r.prototype.hue = function(t) {
    var e = ji(this.rgba);
    return typeof t == "number" ? hr({ h: t, s: e.s, l: e.l, a: e.a }) : Ce(e.h);
  }, r.prototype.isEqual = function(t) {
    return this.toHex() === hr(t).toHex();
  }, r;
}(), hr = function(r) {
  return r instanceof fo ? r : new fo(r);
}, hh = [], Wd = function(r) {
  r.forEach(function(t) {
    hh.indexOf(t) < 0 && (t(fo, co), hh.push(t));
  });
};
function jd(r, t) {
  var e = { white: "#ffffff", bisque: "#ffe4c4", blue: "#0000ff", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", antiquewhite: "#faebd7", aqua: "#00ffff", azure: "#f0ffff", whitesmoke: "#f5f5f5", papayawhip: "#ffefd5", plum: "#dda0dd", blanchedalmond: "#ffebcd", black: "#000000", gold: "#ffd700", goldenrod: "#daa520", gainsboro: "#dcdcdc", cornsilk: "#fff8dc", cornflowerblue: "#6495ed", burlywood: "#deb887", aquamarine: "#7fffd4", beige: "#f5f5dc", crimson: "#dc143c", cyan: "#00ffff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkkhaki: "#bdb76b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9", peachpuff: "#ffdab9", darkmagenta: "#8b008b", darkred: "#8b0000", darkorchid: "#9932cc", darkorange: "#ff8c00", darkslateblue: "#483d8b", gray: "#808080", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", deeppink: "#ff1493", deepskyblue: "#00bfff", wheat: "#f5deb3", firebrick: "#b22222", floralwhite: "#fffaf0", ghostwhite: "#f8f8ff", darkviolet: "#9400d3", magenta: "#ff00ff", green: "#008000", dodgerblue: "#1e90ff", grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", blueviolet: "#8a2be2", forestgreen: "#228b22", lawngreen: "#7cfc00", indianred: "#cd5c5c", indigo: "#4b0082", fuchsia: "#ff00ff", brown: "#a52a2a", maroon: "#800000", mediumblue: "#0000cd", lightcoral: "#f08080", darkturquoise: "#00ced1", lightcyan: "#e0ffff", ivory: "#fffff0", lightyellow: "#ffffe0", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", linen: "#faf0e6", mediumaquamarine: "#66cdaa", lemonchiffon: "#fffacd", lime: "#00ff00", khaki: "#f0e68c", mediumseagreen: "#3cb371", limegreen: "#32cd32", mediumspringgreen: "#00fa9a", lightskyblue: "#87cefa", lightblue: "#add8e6", midnightblue: "#191970", lightpink: "#ffb6c1", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", mintcream: "#f5fffa", lightslategray: "#778899", lightslategrey: "#778899", navajowhite: "#ffdead", navy: "#000080", mediumvioletred: "#c71585", powderblue: "#b0e0e6", palegoldenrod: "#eee8aa", oldlace: "#fdf5e6", paleturquoise: "#afeeee", mediumturquoise: "#48d1cc", mediumorchid: "#ba55d3", rebeccapurple: "#663399", lightsteelblue: "#b0c4de", mediumslateblue: "#7b68ee", thistle: "#d8bfd8", tan: "#d2b48c", orchid: "#da70d6", mediumpurple: "#9370db", purple: "#800080", pink: "#ffc0cb", skyblue: "#87ceeb", springgreen: "#00ff7f", palegreen: "#98fb98", red: "#ff0000", yellow: "#ffff00", slateblue: "#6a5acd", lavenderblush: "#fff0f5", peru: "#cd853f", palevioletred: "#db7093", violet: "#ee82ee", teal: "#008080", slategray: "#708090", slategrey: "#708090", aliceblue: "#f0f8ff", darkseagreen: "#8fbc8f", darkolivegreen: "#556b2f", greenyellow: "#adff2f", seagreen: "#2e8b57", seashell: "#fff5ee", tomato: "#ff6347", silver: "#c0c0c0", sienna: "#a0522d", lavender: "#e6e6fa", lightgreen: "#90ee90", orange: "#ffa500", orangered: "#ff4500", steelblue: "#4682b4", royalblue: "#4169e1", turquoise: "#40e0d0", yellowgreen: "#9acd32", salmon: "#fa8072", saddlebrown: "#8b4513", sandybrown: "#f4a460", rosybrown: "#bc8f8f", darksalmon: "#e9967a", lightgoldenrodyellow: "#fafad2", snow: "#fffafa", lightgrey: "#d3d3d3", lightgray: "#d3d3d3", dimgray: "#696969", dimgrey: "#696969", olivedrab: "#6b8e23", olive: "#808000" }, i = {};
  for (var s in e) i[e[s]] = s;
  var o = {};
  r.prototype.toName = function(h) {
    if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b)) return "transparent";
    var l, c, _ = i[this.toHex()];
    if (_) return _;
    if (h != null && h.closest) {
      var g = this.toRgb(), T = 1 / 0, w = "black";
      if (!o.length) for (var S in e) o[S] = new r(e[S]).toRgb();
      for (var R in e) {
        var D = (l = g, c = o[R], Math.pow(l.r - c.r, 2) + Math.pow(l.g - c.g, 2) + Math.pow(l.b - c.b, 2));
        D < T && (T = D, w = R);
      }
      return w;
    }
  }, t.string.push([function(h) {
    var l = h.toLowerCase(), c = l === "transparent" ? "#0000" : e[l];
    return c ? new r(c).toRgb() : null;
  }, "name"]);
}
Wd([jd]);
const li = class Ps {
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
    if (t instanceof Ps)
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
      return t.length !== e.length ? !1 : t.every((s, o) => s === e[o]);
    if (t !== null && e !== null) {
      const s = Object.keys(t), o = Object.keys(e);
      return s.length !== o.length ? !1 : s.every((h) => t[h] === e[h]);
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
    const [e, i, s, o] = Ps.temp.setValue(t)._components;
    return this._components[0] *= e, this._components[1] *= i, this._components[2] *= s, this._components[3] *= o, this.refreshInt(), this._value = null, this;
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
    let i = this._int >> 16 & 255, s = this._int >> 8 & 255, o = this._int & 255;
    return e && (i = i * t + 0.5 | 0, s = s * t + 0.5 | 0, o = o * t + 0.5 | 0), (t * 255 << 24) + (i << 16) + (s << 8) + o;
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
    const [e, i, s, o] = this._components;
    return t[0] = e, t[1] = i, t[2] = s, t[3] = o, t;
  }
  /**
   * Normalize the input value into rgba
   * @param value - Input value
   */
  normalize(t) {
    let e, i, s, o;
    if ((typeof t == "number" || t instanceof Number) && t >= 0 && t <= 16777215) {
      const h = t;
      e = (h >> 16 & 255) / 255, i = (h >> 8 & 255) / 255, s = (h & 255) / 255, o = 1;
    } else if ((Array.isArray(t) || t instanceof Float32Array) && t.length >= 3 && t.length <= 4)
      t = this._clamp(t), [e, i, s, o = 1] = t;
    else if ((t instanceof Uint8Array || t instanceof Uint8ClampedArray) && t.length >= 3 && t.length <= 4)
      t = this._clamp(t, 0, 255), [e, i, s, o = 255] = t, e /= 255, i /= 255, s /= 255, o /= 255;
    else if (typeof t == "string" || typeof t == "object") {
      if (typeof t == "string") {
        const l = Ps.HEX_PATTERN.exec(t);
        l && (t = `#${l[2]}`);
      }
      const h = hr(t);
      h.isValid() && ({ r: e, g: i, b: s, a: o } = h.rgba, e /= 255, i /= 255, s /= 255);
    }
    if (e !== void 0)
      this._components[0] = e, this._components[1] = i, this._components[2] = s, this._components[3] = o, this.refreshInt();
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
    return typeof t == "number" ? Math.min(Math.max(t, e), i) : (t.forEach((s, o) => {
      t[o] = Math.min(Math.max(s, e), i);
    }), t);
  }
};
li.shared = new li(), /**
* Temporary Color object for static uses internally.
* As to not conflict with Color.shared.
* @ignore
*/
li.temp = new li(), /** Pattern for hex strings */
li.HEX_PATTERN = /^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;
let an = li;
function qd() {
  const r = [], t = [];
  for (let i = 0; i < 32; i++)
    r[i] = i, t[i] = i;
  r[xt.NORMAL_NPM] = xt.NORMAL, r[xt.ADD_NPM] = xt.ADD, r[xt.SCREEN_NPM] = xt.SCREEN, t[xt.NORMAL] = xt.NORMAL_NPM, t[xt.ADD] = xt.ADD_NPM, t[xt.SCREEN] = xt.SCREEN_NPM;
  const e = [];
  return e.push(t), e.push(r), e;
}
const Hd = qd();
function gl(r) {
  if (r.BYTES_PER_ELEMENT === 4)
    return r instanceof Float32Array ? "Float32Array" : r instanceof Uint32Array ? "Uint32Array" : "Int32Array";
  if (r.BYTES_PER_ELEMENT === 2) {
    if (r instanceof Uint16Array)
      return "Uint16Array";
  } else if (r.BYTES_PER_ELEMENT === 1 && r instanceof Uint8Array)
    return "Uint8Array";
  return null;
}
function Ws(r) {
  return r += r === 0 ? 1 : 0, --r, r |= r >>> 1, r |= r >>> 2, r |= r >>> 4, r |= r >>> 8, r |= r >>> 16, r + 1;
}
function lh(r) {
  return !(r & r - 1) && !!r;
}
function uh(r) {
  let t = (r > 65535 ? 1 : 0) << 4;
  r >>>= t;
  let e = (r > 255 ? 1 : 0) << 3;
  return r >>>= e, t |= e, e = (r > 15 ? 1 : 0) << 2, r >>>= e, t |= e, e = (r > 3 ? 1 : 0) << 1, r >>>= e, t |= e, t | r >> 1;
}
function Rs(r, t, e) {
  const i = r.length;
  let s;
  if (t >= i || e === 0)
    return;
  e = t + e > i ? i - t : e;
  const o = i - e;
  for (s = t; s < o; ++s)
    r[s] = r[s + e];
  r.length = o;
}
let Zd = 0;
function Ji() {
  return ++Zd;
}
const ch = {}, lr = /* @__PURE__ */ Object.create(null), br = /* @__PURE__ */ Object.create(null);
function Qd(r, t = globalThis.location) {
  if (r.startsWith("data:"))
    return "";
  t = t || globalThis.location;
  const e = new URL(r, document.baseURI);
  return e.hostname !== t.hostname || e.port !== t.port || e.protocol !== t.protocol ? "anonymous" : "";
}
function fh(r, t = 1) {
  var i;
  const e = (i = Dt.RETINA_PREFIX) == null ? void 0 : i.exec(r);
  return e ? parseFloat(e[1]) : t;
}
var Rt = /* @__PURE__ */ ((r) => (r.Renderer = "renderer", r.Application = "application", r.RendererSystem = "renderer-webgl-system", r.RendererPlugin = "renderer-webgl-plugin", r.CanvasRendererSystem = "renderer-canvas-system", r.CanvasRendererPlugin = "renderer-canvas-plugin", r.Asset = "asset", r.LoadParser = "load-parser", r.ResolveParser = "resolve-parser", r.CacheParser = "cache-parser", r.DetectionParser = "detection-parser", r))(Rt || {});
const _o = (r) => {
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
}, dh = (r, t) => _o(r).priority ?? t, Gt = {
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
    return r.map(_o).forEach((t) => {
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
    return r.map(_o).forEach((t) => {
      t.type.forEach((e) => {
        var o, h;
        const i = this._addHandlers, s = this._queue;
        i[e] ? (o = i[e]) == null || o.call(i, t) : (s[e] = s[e] || [], (h = s[e]) == null || h.push(t));
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
    var h;
    const i = this._addHandlers, s = this._removeHandlers;
    if (i[r] || s[r])
      throw new Error(`Extension type ${r} already has a handler`);
    i[r] = t, s[r] = e;
    const o = this._queue;
    return o[r] && ((h = o[r]) == null || h.forEach((l) => t(l)), delete o[r]), this;
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
        t.includes(i.ref) || (t.push(i.ref), t.sort((s, o) => dh(o, e) - dh(s, e)));
      },
      (i) => {
        const s = t.indexOf(i.ref);
        s !== -1 && t.splice(s, 1);
      }
    );
  }
};
class Kd {
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
const Jd = [
  "precision mediump float;",
  "void main(void){",
  "float test = 0.1;",
  "%forloop%",
  "gl_FragColor = vec4(0.0);",
  "}"
].join(`
`);
function t_(r) {
  let t = "";
  for (let e = 0; e < r; ++e)
    e > 0 && (t += `
else `), e < r - 1 && (t += `if(test == ${e}.0){}`);
  return t;
}
function e_(r, t) {
  if (r === 0)
    throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
  const e = t.createShader(t.FRAGMENT_SHADER);
  for (; ; ) {
    const i = Jd.replace(/%forloop%/gi, t_(r));
    if (t.shaderSource(e, i), t.compileShader(e), !t.getShaderParameter(e, t.COMPILE_STATUS))
      r = r / 2 | 0;
    else
      break;
  }
  return r;
}
const Nn = 0, Dn = 1, Bn = 2, Un = 3, kn = 4, Gn = 5;
class Ii {
  constructor() {
    this.data = 0, this.blendMode = xt.NORMAL, this.polygonOffset = 0, this.blend = !0, this.depthMask = !0;
  }
  /**
   * Activates blending of the computed fragment color values.
   * @default true
   */
  get blend() {
    return !!(this.data & 1 << Nn);
  }
  set blend(t) {
    !!(this.data & 1 << Nn) !== t && (this.data ^= 1 << Nn);
  }
  /**
   * Activates adding an offset to depth values of polygon's fragments
   * @default false
   */
  get offsets() {
    return !!(this.data & 1 << Dn);
  }
  set offsets(t) {
    !!(this.data & 1 << Dn) !== t && (this.data ^= 1 << Dn);
  }
  /**
   * Activates culling of polygons.
   * @default false
   */
  get culling() {
    return !!(this.data & 1 << Bn);
  }
  set culling(t) {
    !!(this.data & 1 << Bn) !== t && (this.data ^= 1 << Bn);
  }
  /**
   * Activates depth comparisons and updates to the depth buffer.
   * @default false
   */
  get depthTest() {
    return !!(this.data & 1 << Un);
  }
  set depthTest(t) {
    !!(this.data & 1 << Un) !== t && (this.data ^= 1 << Un);
  }
  /**
   * Enables or disables writing to the depth buffer.
   * @default true
   */
  get depthMask() {
    return !!(this.data & 1 << Gn);
  }
  set depthMask(t) {
    !!(this.data & 1 << Gn) !== t && (this.data ^= 1 << Gn);
  }
  /**
   * Specifies whether or not front or back-facing polygons can be culled.
   * @default false
   */
  get clockwiseFrontFace() {
    return !!(this.data & 1 << kn);
  }
  set clockwiseFrontFace(t) {
    !!(this.data & 1 << kn) !== t && (this.data ^= 1 << kn);
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
    this.blend = t !== xt.NONE, this._blendMode = t;
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
    const t = new Ii();
    return t.depthTest = !1, t.blend = !0, t;
  }
}
Ii.prototype.toString = function() {
  return `[@pixi/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`;
};
const po = [];
function $l(r, t) {
  if (!r)
    return null;
  let e = "";
  if (typeof r == "string") {
    const i = /\.(\w{3,4})(?:$|\?|#)/i.exec(r);
    i && (e = i[1].toLowerCase());
  }
  for (let i = po.length - 1; i >= 0; --i) {
    const s = po[i];
    if (s.test && s.test(r, e))
      return new s(r, t);
  }
  throw new Error("Unrecognized source type to auto-detect Resource");
}
class er {
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
  emit(t, e, i, s, o, h, l, c) {
    if (arguments.length > 8)
      throw new Error("max arguments reached");
    const { name: _, items: g } = this;
    this._aliasCount++;
    for (let T = 0, w = g.length; T < w; T++)
      g[T][_](t, e, i, s, o, h, l, c);
    return g === this.items && this._aliasCount--, this;
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
Object.defineProperties(er.prototype, {
  /**
   * Alias for `emit`
   * @memberof PIXI.Runner#
   * @method dispatch
   * @see PIXI.Runner#emit
   */
  dispatch: { value: er.prototype.emit },
  /**
   * Alias for `emit`
   * @memberof PIXI.Runner#
   * @method run
   * @see PIXI.Runner#emit
   */
  run: { value: er.prototype.emit }
});
class ts {
  /**
   * @param width - Width of the resource
   * @param height - Height of the resource
   */
  constructor(t = 0, e = 0) {
    this._width = t, this._height = e, this.destroyed = !1, this.internal = !1, this.onResize = new er("setRealSize"), this.onUpdate = new er("update"), this.onError = new er("onError");
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
class xl extends ts {
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
    s.pixelStorei(s.UNPACK_ALIGNMENT, this.unpackAlignment), s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.alphaMode === Kr.UNPACK);
    const o = e.realWidth, h = e.realHeight;
    return i.width === o && i.height === h ? s.texSubImage2D(
      e.target,
      0,
      0,
      0,
      o,
      h,
      e.format,
      i.type,
      this.data
    ) : (i.width = o, i.height = h, s.texImage2D(
      e.target,
      0,
      i.internalFormat,
      o,
      h,
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
const r_ = {
  scaleMode: vr.NEAREST,
  alphaMode: Kr.NPM
}, mo = class ui extends Jr {
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
    super(), e = Object.assign({}, ui.defaultOptions, e);
    const {
      alphaMode: i,
      mipmap: s,
      anisotropicLevel: o,
      scaleMode: h,
      width: l,
      height: c,
      wrapMode: _,
      format: g,
      type: T,
      target: w,
      resolution: S,
      resourceOptions: R
    } = e;
    t && !(t instanceof ts) && (t = $l(t, R), t.internal = !0), this.resolution = S || Dt.RESOLUTION, this.width = Math.round((l || 0) * this.resolution) / this.resolution, this.height = Math.round((c || 0) * this.resolution) / this.resolution, this._mipmap = s, this.anisotropicLevel = o, this._wrapMode = _, this._scaleMode = h, this.format = g, this.type = T, this.target = w, this.alphaMode = i, this.uid = Ji(), this.touched = 0, this.isPowerOfTwo = !1, this._refreshPOT(), this._glTextures = {}, this.dirtyId = 0, this.dirtyStyleId = 0, this.cacheId = null, this.valid = l > 0 && c > 0, this.textureCacheIds = [], this.destroyed = !1, this.resource = null, this._batchEnabled = 0, this._batchLocation = 0, this.parentTextureArray = null, this.setResource(t);
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
    this.isPowerOfTwo = lh(this.realWidth) && lh(this.realHeight);
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
    this.resource && (this.resource.unbind(this), this.resource.internal && this.resource.destroy(), this.resource = null), this.cacheId && (delete br[this.cacheId], delete lr[this.cacheId], this.cacheId = null), this.valid = !1, this.dispose(), ui.removeFromCache(this), this.textureCacheIds = null, this.destroyed = !0, this.emit("destroyed", this), this.removeAllListeners();
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
  static from(t, e, i = Dt.STRICT_TEXTURE_CACHE) {
    const s = typeof t == "string";
    let o = null;
    if (s)
      o = t;
    else {
      if (!t._pixiId) {
        const l = (e == null ? void 0 : e.pixiIdPrefix) || "pixiid";
        t._pixiId = `${l}_${Ji()}`;
      }
      o = t._pixiId;
    }
    let h = br[o];
    if (s && i && !h)
      throw new Error(`The cacheId "${o}" does not exist in BaseTextureCache.`);
    return h || (h = new ui(t, e), h.cacheId = o, ui.addToCache(h, o)), h;
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
    const o = new xl(t, { width: e, height: i, ...s == null ? void 0 : s.resourceOptions });
    let h, l;
    return t instanceof Float32Array ? (h = Z.RGBA, l = Pt.FLOAT) : t instanceof Int32Array ? (h = Z.RGBA_INTEGER, l = Pt.INT) : t instanceof Uint32Array ? (h = Z.RGBA_INTEGER, l = Pt.UNSIGNED_INT) : t instanceof Int16Array ? (h = Z.RGBA_INTEGER, l = Pt.SHORT) : t instanceof Uint16Array ? (h = Z.RGBA_INTEGER, l = Pt.UNSIGNED_SHORT) : t instanceof Int8Array ? (h = Z.RGBA, l = Pt.BYTE) : (h = Z.RGBA, l = Pt.UNSIGNED_BYTE), o.internal = !0, new ui(o, Object.assign({}, r_, { type: l, format: h }, s));
  }
  /**
   * Adds a BaseTexture to the global BaseTextureCache. This cache is shared across the whole PIXI object.
   * @param {PIXI.BaseTexture} baseTexture - The BaseTexture to add to the cache.
   * @param {string} id - The id that the BaseTexture will be stored against.
   */
  static addToCache(t, e) {
    e && (t.textureCacheIds.includes(e) || t.textureCacheIds.push(e), br[e] && br[e] !== t && console.warn(`BaseTexture added to the cache with an id [${e}] that already had an entry`), br[e] = t);
  }
  /**
   * Remove a BaseTexture from the global BaseTextureCache.
   * @param {string|PIXI.BaseTexture} baseTexture - id of a BaseTexture to be removed, or a BaseTexture instance itself.
   * @returns {PIXI.BaseTexture|null} The BaseTexture that was removed.
   */
  static removeFromCache(t) {
    if (typeof t == "string") {
      const e = br[t];
      if (e) {
        const i = e.textureCacheIds.indexOf(t);
        return i > -1 && e.textureCacheIds.splice(i, 1), delete br[t], e;
      }
    } else if (t != null && t.textureCacheIds) {
      for (let e = 0; e < t.textureCacheIds.length; ++e)
        delete br[t.textureCacheIds[e]];
      return t.textureCacheIds.length = 0, t;
    }
    return null;
  }
};
mo.defaultOptions = {
  /**
   * If mipmapping is enabled for texture.
   * @type {PIXI.MIPMAP_MODES}
   * @default PIXI.MIPMAP_MODES.POW2
   */
  mipmap: Hr.POW2,
  /** Anisotropic filtering level of texture */
  anisotropicLevel: 0,
  /**
   * Default scale mode, linear, nearest.
   * @type {PIXI.SCALE_MODES}
   * @default PIXI.SCALE_MODES.LINEAR
   */
  scaleMode: vr.LINEAR,
  /**
   * Wrap mode for textures.
   * @type {PIXI.WRAP_MODES}
   * @default PIXI.WRAP_MODES.CLAMP
   */
  wrapMode: Lo.CLAMP,
  /**
   * Pre multiply the image alpha
   * @type {PIXI.ALPHA_MODES}
   * @default PIXI.ALPHA_MODES.UNPACK
   */
  alphaMode: Kr.UNPACK,
  /**
   * GL texture target
   * @type {PIXI.TARGETS}
   * @default PIXI.TARGETS.TEXTURE_2D
   */
  target: yi.TEXTURE_2D,
  /**
   * GL format type
   * @type {PIXI.FORMATS}
   * @default PIXI.FORMATS.RGBA
   */
  format: Z.RGBA,
  /**
   * GL data type
   * @type {PIXI.TYPES}
   * @default PIXI.TYPES.UNSIGNED_BYTE
   */
  type: Pt.UNSIGNED_BYTE
}, /** Global number of the texture batch, used by multi-texture renderers. */
mo._globalBatch = 0;
let Qt = mo;
class i_ {
  constructor() {
    this.texArray = null, this.blend = 0, this.type = ks.TRIANGLES, this.start = 0, this.size = 0, this.data = null;
  }
}
let s_ = 0;
class Ue {
  /**
   * @param {PIXI.IArrayBuffer} data - the data to store in the buffer.
   * @param _static - `true` for static buffer
   * @param index - `true` for index buffer
   */
  constructor(t, e = !0, i = !1) {
    this.data = t || new Float32Array(1), this._glBuffers = {}, this._updateID = 0, this.index = i, this.static = e, this.id = s_++, this.disposeRunner = new er("disposeBuffer");
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
    this.type = t ? fr.ELEMENT_ARRAY_BUFFER : fr.ARRAY_BUFFER;
  }
  get index() {
    return this.type === fr.ELEMENT_ARRAY_BUFFER;
  }
  /**
   * Helper function that creates a buffer based on an array or TypedArray
   * @param {ArrayBufferView | number[]} data - the TypedArray that the buffer will store. If this is a regular Array it will be converted to a Float32Array.
   * @returns - A new Buffer based on the data provided.
   */
  static from(t) {
    return t instanceof Array && (t = new Float32Array(t)), new Ue(t);
  }
}
class js {
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
  constructor(t, e = 0, i = !1, s = Pt.FLOAT, o, h, l, c = 1) {
    this.buffer = t, this.size = e, this.normalized = i, this.type = s, this.stride = o, this.start = h, this.instance = l, this.divisor = c;
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
  static from(t, e, i, s, o) {
    return new js(t, e, i, s, o);
  }
}
const n_ = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array
};
function o_(r, t) {
  let e = 0, i = 0;
  const s = {};
  for (let c = 0; c < r.length; c++)
    i += t[c], e += r[c].length;
  const o = new ArrayBuffer(e * 4);
  let h = null, l = 0;
  for (let c = 0; c < r.length; c++) {
    const _ = t[c], g = r[c], T = gl(g);
    s[T] || (s[T] = new n_[T](o)), h = s[T];
    for (let w = 0; w < g.length; w++) {
      const S = (w / _ | 0) * i + l, R = w % _;
      h[S + R] = g[w];
    }
    l += _;
  }
  return new Float32Array(o);
}
const _h = { 5126: 4, 5123: 2, 5121: 1 };
let a_ = 0;
const h_ = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array,
  Uint16Array
};
class bi {
  /**
   * @param buffers - An array of buffers. optional.
   * @param attributes - Of the geometry, optional structure of the attributes layout
   */
  constructor(t = [], e = {}) {
    this.buffers = t, this.indexBuffer = null, this.attributes = e, this.glVertexArrayObjects = {}, this.id = a_++, this.instanced = !1, this.instanceCount = 1, this.disposeRunner = new er("disposeGeometry"), this.refCount = 0;
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
  addAttribute(t, e, i = 0, s = !1, o, h, l, c = !1) {
    if (!e)
      throw new Error("You must pass a buffer when creating an attribute");
    e instanceof Ue || (e instanceof Array && (e = new Float32Array(e)), e = new Ue(e));
    const _ = t.split("|");
    if (_.length > 1) {
      for (let T = 0; T < _.length; T++)
        this.addAttribute(_[T], e, i, s, o);
      return this;
    }
    let g = this.buffers.indexOf(e);
    return g === -1 && (this.buffers.push(e), g = this.buffers.length - 1), this.attributes[t] = new js(g, i, s, o, h, l, c), this.instanced = this.instanced || c, this;
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
    return t instanceof Ue || (t instanceof Array && (t = new Uint16Array(t)), t = new Ue(t)), t.type = fr.ELEMENT_ARRAY_BUFFER, this.indexBuffer = t, this.buffers.includes(t) || this.buffers.push(t), this;
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
    const t = [], e = [], i = new Ue();
    let s;
    for (s in this.attributes) {
      const o = this.attributes[s], h = this.buffers[o.buffer];
      t.push(h.data), e.push(o.size * _h[o.type] / 4), o.buffer = 0;
    }
    for (i.data = o_(t, e), s = 0; s < this.buffers.length; s++)
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
    const t = new bi();
    for (let e = 0; e < this.buffers.length; e++)
      t.buffers[e] = new Ue(this.buffers[e].data.slice(0));
    for (const e in this.attributes) {
      const i = this.attributes[e];
      t.attributes[e] = new js(
        i.buffer,
        i.size,
        i.normalized,
        i.type,
        i.stride,
        i.start,
        i.instance
      );
    }
    return this.indexBuffer && (t.indexBuffer = t.buffers[this.buffers.indexOf(this.indexBuffer)], t.indexBuffer.type = fr.ELEMENT_ARRAY_BUFFER), t;
  }
  /**
   * Merges an array of geometries into a new single one.
   *
   * Geometry attribute styles must match for this operation to work.
   * @param geometries - array of geometries to merge
   * @returns - Shiny new geometry!
   */
  static merge(t) {
    const e = new bi(), i = [], s = [], o = [];
    let h;
    for (let l = 0; l < t.length; l++) {
      h = t[l];
      for (let c = 0; c < h.buffers.length; c++)
        s[c] = s[c] || 0, s[c] += h.buffers[c].data.length, o[c] = 0;
    }
    for (let l = 0; l < h.buffers.length; l++)
      i[l] = new h_[gl(h.buffers[l].data)](s[l]), e.buffers[l] = new Ue(i[l]);
    for (let l = 0; l < t.length; l++) {
      h = t[l];
      for (let c = 0; c < h.buffers.length; c++)
        i[c].set(h.buffers[c].data, o[c]), o[c] += h.buffers[c].data.length;
    }
    if (e.attributes = h.attributes, h.indexBuffer) {
      e.indexBuffer = e.buffers[h.buffers.indexOf(h.indexBuffer)], e.indexBuffer.type = fr.ELEMENT_ARRAY_BUFFER;
      let l = 0, c = 0, _ = 0, g = 0;
      for (let T = 0; T < h.buffers.length; T++)
        if (h.buffers[T] !== h.indexBuffer) {
          g = T;
          break;
        }
      for (const T in h.attributes) {
        const w = h.attributes[T];
        (w.buffer | 0) === g && (c += w.size * _h[w.type] / 4);
      }
      for (let T = 0; T < t.length; T++) {
        const w = t[T].indexBuffer.data;
        for (let S = 0; S < w.length; S++)
          e.indexBuffer.data[S + _] += l;
        l += t[T].buffers[g].data.length / c, _ += w.length;
      }
    }
    return e;
  }
}
class l_ extends bi {
  /**
   * @param {boolean} [_static=false] - Optimization flag, where `false`
   *        is updated every frame, `true` doesn't change frame-to-frame.
   */
  constructor(t = !1) {
    super(), this._buffer = new Ue(null, t, !1), this._indexBuffer = new Ue(null, t, !0), this.addAttribute("aVertexPosition", this._buffer, 2, !1, Pt.FLOAT).addAttribute("aTextureCoord", this._buffer, 2, !1, Pt.FLOAT).addAttribute("aColor", this._buffer, 4, !0, Pt.UNSIGNED_BYTE).addAttribute("aTextureId", this._buffer, 1, !0, Pt.FLOAT).addIndex(this._indexBuffer);
  }
}
const u_ = Math.PI * 2, c_ = 180 / Math.PI, f_ = Math.PI / 180;
var Tl = /* @__PURE__ */ ((r) => (r[r.POLY = 0] = "POLY", r[r.RECT = 1] = "RECT", r[r.CIRC = 2] = "CIRC", r[r.ELIP = 3] = "ELIP", r[r.RREC = 4] = "RREC", r))(Tl || {});
class Me {
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
    return new Me(this.x, this.y);
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
Me.prototype.toString = function() {
  return `[@pixi/math:Point x=${this.x} y=${this.y}]`;
};
const vs = [new Me(), new Me(), new Me(), new Me()];
class ee {
  /**
   * @param x - The X coordinate of the upper-left corner of the rectangle
   * @param y - The Y coordinate of the upper-left corner of the rectangle
   * @param width - The overall width of the rectangle
   * @param height - The overall height of the rectangle
   */
  constructor(t = 0, e = 0, i = 0, s = 0) {
    this.x = Number(t), this.y = Number(e), this.width = Number(i), this.height = Number(s), this.type = Tl.RECT;
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
    return new ee(0, 0, 0, 0);
  }
  /**
   * Creates a clone of this Rectangle
   * @returns a copy of the rectangle
   */
  clone() {
    return new ee(this.x, this.y, this.width, this.height);
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
      const j = this.x < t.x ? t.x : this.x;
      if ((this.right > t.right ? t.right : this.right) <= j)
        return !1;
      const H = this.y < t.y ? t.y : this.y;
      return (this.bottom > t.bottom ? t.bottom : this.bottom) > H;
    }
    const i = this.left, s = this.right, o = this.top, h = this.bottom;
    if (s <= i || h <= o)
      return !1;
    const l = vs[0].set(t.left, t.top), c = vs[1].set(t.left, t.bottom), _ = vs[2].set(t.right, t.top), g = vs[3].set(t.right, t.bottom);
    if (_.x <= l.x || c.y <= l.y)
      return !1;
    const T = Math.sign(e.a * e.d - e.b * e.c);
    if (T === 0 || (e.apply(l, l), e.apply(c, c), e.apply(_, _), e.apply(g, g), Math.max(l.x, c.x, _.x, g.x) <= i || Math.min(l.x, c.x, _.x, g.x) >= s || Math.max(l.y, c.y, _.y, g.y) <= o || Math.min(l.y, c.y, _.y, g.y) >= h))
      return !1;
    const w = T * (c.y - l.y), S = T * (l.x - c.x), R = w * i + S * o, D = w * s + S * o, L = w * i + S * h, K = w * s + S * h;
    if (Math.max(R, D, L, K) <= w * l.x + S * l.y || Math.min(R, D, L, K) >= w * g.x + S * g.y)
      return !1;
    const q = T * (l.y - _.y), M = T * (_.x - l.x), Q = q * i + M * o, at = q * s + M * o, At = q * i + M * h, Jt = q * s + M * h;
    return !(Math.max(Q, at, At, Jt) <= q * l.x + M * l.y || Math.min(Q, at, At, Jt) >= q * g.x + M * g.y);
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
    const e = Math.max(this.x, t.x), i = Math.min(this.x + this.width, t.x + t.width), s = Math.max(this.y, t.y), o = Math.min(this.y + this.height, t.y + t.height);
    return this.x = e, this.width = Math.max(i - e, 0), this.y = s, this.height = Math.max(o - s, 0), this;
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
    const e = Math.min(this.x, t.x), i = Math.max(this.x + this.width, t.x + t.width), s = Math.min(this.y, t.y), o = Math.max(this.y + this.height, t.y + t.height);
    return this.x = e, this.width = i - e, this.y = s, this.height = o - s, this;
  }
}
ee.prototype.toString = function() {
  return `[@pixi/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
};
class ye {
  /**
   * @param a - x scale
   * @param b - y skew
   * @param c - x skew
   * @param d - y scale
   * @param tx - x translation
   * @param ty - y translation
   */
  constructor(t = 1, e = 0, i = 0, s = 1, o = 0, h = 0) {
    this.array = null, this.a = t, this.b = e, this.c = i, this.d = s, this.tx = o, this.ty = h;
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
  set(t, e, i, s, o, h) {
    return this.a = t, this.b = e, this.c = i, this.d = s, this.tx = o, this.ty = h, this;
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
    e = e || new Me();
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
    e = e || new Me();
    const i = 1 / (this.a * this.d + this.c * -this.b), s = t.x, o = t.y;
    return e.x = this.d * i * s + -this.c * i * o + (this.ty * this.c - this.tx * this.d) * i, e.y = this.a * i * o + -this.b * i * s + (-this.ty * this.a + this.tx * this.b) * i, e;
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
    const e = Math.cos(t), i = Math.sin(t), s = this.a, o = this.c, h = this.tx;
    return this.a = s * e - this.b * i, this.b = s * i + this.b * e, this.c = o * e - this.d * i, this.d = o * i + this.d * e, this.tx = h * e - this.ty * i, this.ty = h * i + this.ty * e, this;
  }
  /**
   * Appends the given Matrix to this Matrix.
   * @param matrix - The matrix to append.
   * @returns This matrix. Good for chaining method calls.
   */
  append(t) {
    const e = this.a, i = this.b, s = this.c, o = this.d;
    return this.a = t.a * e + t.b * s, this.b = t.a * i + t.b * o, this.c = t.c * e + t.d * s, this.d = t.c * i + t.d * o, this.tx = t.tx * e + t.ty * s + this.tx, this.ty = t.tx * i + t.ty * o + this.ty, this;
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
  setTransform(t, e, i, s, o, h, l, c, _) {
    return this.a = Math.cos(l + _) * o, this.b = Math.sin(l + _) * o, this.c = -Math.sin(l - c) * h, this.d = Math.cos(l - c) * h, this.tx = t - (i * this.a + s * this.c), this.ty = e - (i * this.b + s * this.d), this;
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
    const e = this.a, i = this.b, s = this.c, o = this.d, h = t.pivot, l = -Math.atan2(-s, o), c = Math.atan2(i, e), _ = Math.abs(l + c);
    return _ < 1e-5 || Math.abs(u_ - _) < 1e-5 ? (t.rotation = c, t.skew.x = t.skew.y = 0) : (t.rotation = 0, t.skew.x = l, t.skew.y = c), t.scale.x = Math.sqrt(e * e + i * i), t.scale.y = Math.sqrt(s * s + o * o), t.position.x = this.tx + (h.x * e + h.y * s), t.position.y = this.ty + (h.x * i + h.y * o), t;
  }
  /**
   * Inverts this matrix
   * @returns This matrix. Good for chaining method calls.
   */
  invert() {
    const t = this.a, e = this.b, i = this.c, s = this.d, o = this.tx, h = t * s - e * i;
    return this.a = s / h, this.b = -e / h, this.c = -i / h, this.d = t / h, this.tx = (i * this.ty - s * o) / h, this.ty = -(t * this.ty - e * o) / h, this;
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
    const t = new ye();
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
    return new ye();
  }
  /**
   * A temp matrix
   * @readonly
   */
  static get TEMP_MATRIX() {
    return new ye();
  }
}
ye.prototype.toString = function() {
  return `[@pixi/math:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`;
};
const Dr = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1], Br = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1], Ur = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1], kr = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1], vo = [], wl = [], ys = Math.sign;
function d_() {
  for (let r = 0; r < 16; r++) {
    const t = [];
    vo.push(t);
    for (let e = 0; e < 16; e++) {
      const i = ys(Dr[r] * Dr[e] + Ur[r] * Br[e]), s = ys(Br[r] * Dr[e] + kr[r] * Br[e]), o = ys(Dr[r] * Ur[e] + Ur[r] * kr[e]), h = ys(Br[r] * Ur[e] + kr[r] * kr[e]);
      for (let l = 0; l < 16; l++)
        if (Dr[l] === i && Br[l] === s && Ur[l] === o && kr[l] === h) {
          t.push(l);
          break;
        }
    }
  }
  for (let r = 0; r < 16; r++) {
    const t = new ye();
    t.set(Dr[r], Br[r], Ur[r], kr[r], 0, 0), wl.push(t);
  }
}
d_();
const _e = {
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
  uX: (r) => Dr[r],
  /**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The Y-component of the U-axis
   *    after rotating the axes.
   */
  uY: (r) => Br[r],
  /**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The X-component of the V-axis
   *    after rotating the axes.
   */
  vX: (r) => Ur[r],
  /**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The Y-component of the V-axis
   *    after rotating the axes.
   */
  vY: (r) => kr[r],
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
  add: (r, t) => vo[r][t],
  /**
   * Reverse of `add`.
   * @param {PIXI.GD8Symmetry} rotationSecond - Second operation
   * @param {PIXI.GD8Symmetry} rotationFirst - First operation
   * @returns {PIXI.GD8Symmetry} Result
   */
  sub: (r, t) => vo[r][_e.inv(t)],
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
  byDirection: (r, t) => Math.abs(r) * 2 <= Math.abs(t) ? t >= 0 ? _e.S : _e.N : Math.abs(t) * 2 <= Math.abs(r) ? r > 0 ? _e.E : _e.W : t > 0 ? r > 0 ? _e.SE : _e.SW : r > 0 ? _e.NE : _e.NW,
  /**
   * Helps sprite to compensate texture packer rotation.
   * @param {PIXI.Matrix} matrix - sprite world matrix
   * @param {PIXI.GD8Symmetry} rotation - The rotation factor to use.
   * @param {number} tx - sprite anchoring
   * @param {number} ty - sprite anchoring
   */
  matrixAppendRotationInv: (r, t, e = 0, i = 0) => {
    const s = wl[_e.inv(t)];
    s.tx = e, s.ty = i, r.append(s);
  }
};
class Pr {
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
    return new Pr(t, e, this._x, this._y);
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
Pr.prototype.toString = function() {
  return `[@pixi/math:ObservablePoint x=${this.x} y=${this.y} scope=${this.scope}]`;
};
const yo = class {
  constructor() {
    this.worldTransform = new ye(), this.localTransform = new ye(), this.position = new Pr(this.onChange, this, 0, 0), this.scale = new Pr(this.onChange, this, 1, 1), this.pivot = new Pr(this.onChange, this, 0, 0), this.skew = new Pr(this.updateSkew, this, 0, 0), this._rotation = 0, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._localID = 0, this._currentLocalID = 0, this._worldID = 0, this._parentID = 0;
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
yo.IDENTITY = new yo();
let hn = yo;
hn.prototype.toString = function() {
  return `[@pixi/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`;
};
var __ = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor *= texture2D(uSampler, vTextureCoord);
}`, p_ = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void){
   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
   vTextureCoord = aTextureCoord;
}
`;
function ph(r, t, e) {
  const i = r.createShader(t);
  return r.shaderSource(i, e), r.compileShader(i), i;
}
function Vn(r) {
  const t = new Array(r);
  for (let e = 0; e < t.length; e++)
    t[e] = !1;
  return t;
}
function El(r, t) {
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
      return Vn(2 * t);
    case "bvec3":
      return Vn(3 * t);
    case "bvec4":
      return Vn(4 * t);
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
const xi = [
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
], m_ = {
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
}, v_ = {
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
function y_(r, t) {
  var i;
  const e = [`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];
  for (const s in r.uniforms) {
    const o = t[s];
    if (!o) {
      ((i = r.uniforms[s]) == null ? void 0 : i.group) === !0 && (r.uniforms[s].ubo ? e.push(`
                        renderer.shader.syncUniformBufferGroup(uv.${s}, '${s}');
                    `) : e.push(`
                        renderer.shader.syncUniformGroup(uv.${s}, syncData);
                    `));
      continue;
    }
    const h = r.uniforms[s];
    let l = !1;
    for (let c = 0; c < xi.length; c++)
      if (xi[c].test(o, h)) {
        e.push(xi[c].code(s, h)), l = !0;
        break;
      }
    if (!l) {
      const c = (o.size === 1 && !o.isArray ? m_ : v_)[o.type].replace("location", `ud["${s}"].location`);
      e.push(`
            cu = ud["${s}"];
            cv = cu.value;
            v = uv["${s}"];
            ${c};`);
    }
  }
  return new Function("ud", "uv", "renderer", "syncData", e.join(`
`));
}
const bl = {};
let ai = bl;
function g_() {
  if (ai === bl || ai != null && ai.isContextLost()) {
    const r = Dt.ADAPTER.createCanvas();
    let t;
    Dt.PREFER_ENV >= Qr.WEBGL2 && (t = r.getContext("webgl2", {})), t || (t = r.getContext("webgl", {}) || r.getContext("experimental-webgl", {}), t ? t.getExtension("WEBGL_draw_buffers") : t = null), ai = t;
  }
  return ai;
}
let gs;
function $_() {
  if (!gs) {
    gs = We.MEDIUM;
    const r = g_();
    if (r && r.getShaderPrecisionFormat) {
      const t = r.getShaderPrecisionFormat(r.FRAGMENT_SHADER, r.HIGH_FLOAT);
      t && (gs = t.precision ? We.HIGH : We.MEDIUM);
    }
  }
  return gs;
}
function mh(r, t) {
  const e = r.getShaderSource(t).split(`
`).map((_, g) => `${g}: ${_}`), i = r.getShaderInfoLog(t), s = i.split(`
`), o = {}, h = s.map((_) => parseFloat(_.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"))).filter((_) => _ && !o[_] ? (o[_] = !0, !0) : !1), l = [""];
  h.forEach((_) => {
    e[_ - 1] = `%c${e[_ - 1]}%c`, l.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px");
  });
  const c = e.join(`
`);
  l[0] = c, console.error(i), console.groupCollapsed("click to view full shader code"), console.warn(...l), console.groupEnd();
}
function x_(r, t, e, i) {
  r.getProgramParameter(t, r.LINK_STATUS) || (r.getShaderParameter(e, r.COMPILE_STATUS) || mh(r, e), r.getShaderParameter(i, r.COMPILE_STATUS) || mh(r, i), console.error("PixiJS Error: Could not initialize shader."), r.getProgramInfoLog(t) !== "" && console.warn("PixiJS Warning: gl.getProgramInfoLog()", r.getProgramInfoLog(t)));
}
const T_ = {
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
function Al(r) {
  return T_[r];
}
let $s = null;
const vh = {
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
function Sl(r, t) {
  if (!$s) {
    const e = Object.keys(vh);
    $s = {};
    for (let i = 0; i < e.length; ++i) {
      const s = e[i];
      $s[r[s]] = vh[s];
    }
  }
  return $s[t];
}
function yh(r, t, e) {
  if (r.substring(0, 9) !== "precision") {
    let i = t;
    return t === We.HIGH && e !== We.HIGH && (i = We.MEDIUM), `precision ${i} float;
${r}`;
  } else if (e !== We.HIGH && r.substring(0, 15) === "precision highp")
    return r.replace("precision highp", "precision mediump");
  return r;
}
let Oi;
function w_() {
  if (typeof Oi == "boolean")
    return Oi;
  try {
    Oi = new Function("param1", "param2", "param3", "return param1[param2] === param3;")({ a: "b" }, "a", "b") === !0;
  } catch {
    Oi = !1;
  }
  return Oi;
}
let E_ = 0;
const xs = {}, go = class ci {
  /**
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param name - Name for shader
   * @param extra - Extra data for shader
   */
  constructor(t, e, i = "pixi-shader", s = {}) {
    this.extra = {}, this.id = E_++, this.vertexSrc = t || ci.defaultVertexSrc, this.fragmentSrc = e || ci.defaultFragmentSrc, this.vertexSrc = this.vertexSrc.trim(), this.fragmentSrc = this.fragmentSrc.trim(), this.extra = s, this.vertexSrc.substring(0, 8) !== "#version" && (i = i.replace(/\s+/g, "-"), xs[i] ? (xs[i]++, i += `-${xs[i]}`) : xs[i] = 1, this.vertexSrc = `#define SHADER_NAME ${i}
${this.vertexSrc}`, this.fragmentSrc = `#define SHADER_NAME ${i}
${this.fragmentSrc}`, this.vertexSrc = yh(
      this.vertexSrc,
      ci.defaultVertexPrecision,
      We.HIGH
    ), this.fragmentSrc = yh(
      this.fragmentSrc,
      ci.defaultFragmentPrecision,
      $_()
    )), this.glPrograms = {}, this.syncUniforms = null;
  }
  /**
   * The default vertex shader source.
   * @readonly
   */
  static get defaultVertexSrc() {
    return p_;
  }
  /**
   * The default fragment shader source.
   * @readonly
   */
  static get defaultFragmentSrc() {
    return __;
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
    let o = ch[s];
    return o || (ch[s] = o = new ci(t, e, i)), o;
  }
};
go.defaultVertexPrecision = We.HIGH, /**
* Default specify float precision in fragment shader.
* iOS is best set at highp due to https://github.com/pixijs/pixijs/issues/3742
* @static
* @type {PIXI.PRECISION}
* @default PIXI.PRECISION.MEDIUM
*/
go.defaultFragmentPrecision = _i.apple.device ? We.HIGH : We.MEDIUM;
let Yr = go, b_ = 0;
class dr {
  /**
   * @param {object | Buffer} [uniforms] - Custom uniforms to use to augment the built-in ones. Or a pixi buffer.
   * @param isStatic - Uniforms wont be changed after creation.
   * @param isUbo - If true, will treat this uniform group as a uniform buffer object.
   */
  constructor(t, e, i) {
    this.group = !0, this.syncUniforms = {}, this.dirtyId = 0, this.id = b_++, this.static = !!e, this.ubo = !!i, t instanceof Ue ? (this.buffer = t, this.buffer.type = fr.UNIFORM_BUFFER, this.autoManage = !1, this.ubo = !0) : (this.uniforms = t, this.ubo && (this.buffer = new Ue(new Float32Array(1)), this.buffer.type = fr.UNIFORM_BUFFER, this.autoManage = !0));
  }
  update() {
    this.dirtyId++, !this.autoManage && this.buffer && this.buffer.update();
  }
  add(t, e, i) {
    if (!this.ubo)
      this.uniforms[t] = new dr(e, i);
    else
      throw new Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");
  }
  static from(t, e, i) {
    return new dr(t, e, i);
  }
  /**
   * A short hand function for creating a static UBO UniformGroup.
   * @param uniforms - the ubo item
   * @param _static - should this be updated each time it is used? defaults to true here!
   */
  static uboFrom(t, e) {
    return new dr(t, e ?? !0, !0);
  }
}
class ln {
  /**
   * @param program - The program the shader will use.
   * @param uniforms - Custom uniforms to use to augment the built-in ones.
   */
  constructor(t, e) {
    this.uniformBindCount = 0, this.program = t, e ? e instanceof dr ? this.uniformGroup = e : this.uniformGroup = new dr(e) : this.uniformGroup = new dr({}), this.disposeRunner = new er("disposeShader");
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
    const s = Yr.from(t, e);
    return new ln(s, i);
  }
}
class A_ {
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
      for (let o = 0; o < t; o++)
        i[o] = o;
      this.defaultGroupCache[t] = dr.from({ uSamplers: i }, !0);
      let s = this.fragTemplate;
      s = s.replace(/%count%/gi, `${t}`), s = s.replace(/%forloop%/gi, this.generateSampleSrc(t)), this.programCache[t] = new Yr(this.vertexSrc, s);
    }
    const e = {
      tint: new Float32Array([1, 1, 1, 1]),
      translationMatrix: new ye(),
      default: this.defaultGroupCache[t]
    };
    return new ln(this.programCache[t], e);
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
class S_ {
  constructor() {
    this.elements = [], this.ids = [], this.count = 0;
  }
  clear() {
    for (let t = 0; t < this.count; t++)
      this.elements[t] = null;
    this.count = 0;
  }
}
function P_() {
  return !_i.apple.device;
}
function R_(r) {
  let t = !0;
  const e = Dt.ADAPTER.getNavigator();
  if (_i.tablet || _i.phone) {
    if (_i.apple.device) {
      const i = e.userAgent.match(/OS (\d+)_(\d+)?/);
      i && parseInt(i[1], 10) < 11 && (t = !1);
    }
    if (_i.android.device) {
      const i = e.userAgent.match(/Android\s([0-9.]*)/);
      i && parseInt(i[1], 10) < 7 && (t = !1);
    }
  }
  return t ? r : 4;
}
class Pl {
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
var C_ = `varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;
uniform sampler2D uSamplers[%count%];

void main(void){
    vec4 color;
    %forloop%
    gl_FragColor = color * vColor;
}
`, I_ = `precision highp float;
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
const Ui = class Ke extends Pl {
  /**
   * This will hook onto the renderer's `contextChange`
   * and `prerender` signals.
   * @param {PIXI.Renderer} renderer - The renderer this works for.
   */
  constructor(t) {
    super(t), this.setShaderGenerator(), this.geometryClass = l_, this.vertexSize = 6, this.state = Ii.for2d(), this.size = Ke.defaultBatchSize * 4, this._vertexCount = 0, this._indexCount = 0, this._bufferedElements = [], this._bufferedTextures = [], this._bufferSize = 0, this._shader = null, this._packedGeometries = [], this._packedGeometryPoolSize = 2, this._flushId = 0, this._aBuffers = {}, this._iBuffers = {}, this.maxTextures = 1, this.renderer.on("prerender", this.onPrerender, this), t.runners.contextChange.add(this), this._dcIndex = 0, this._aIndex = 0, this._iIndex = 0, this._attributeBuffer = null, this._indexBuffer = null, this._tempBoundTextures = [];
  }
  /**
   * The maximum textures that this device supports.
   * @static
   * @default 32
   */
  static get defaultMaxTextures() {
    return this._defaultMaxTextures = this._defaultMaxTextures ?? R_(32), this._defaultMaxTextures;
  }
  static set defaultMaxTextures(t) {
    this._defaultMaxTextures = t;
  }
  /**
   * Can we upload the same buffer in a single frame?
   * @static
   */
  static get canUploadSameBuffer() {
    return this._canUploadSameBuffer = this._canUploadSameBuffer ?? P_(), this._canUploadSameBuffer;
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
    return Nt("7.1.0", "BatchRenderer#MAX_TEXTURES renamed to BatchRenderer#maxTextures"), this.maxTextures;
  }
  /**
   * The default vertex shader source
   * @readonly
   */
  static get defaultVertexSrc() {
    return I_;
  }
  /**
   * The default fragment shader source
   * @readonly
   */
  static get defaultFragmentTemplate() {
    return C_;
  }
  /**
   * Set the shader generator.
   * @param {object} [options]
   * @param {string} [options.vertex=PIXI.BatchRenderer.defaultVertexSrc] - Vertex shader source
   * @param {string} [options.fragment=PIXI.BatchRenderer.defaultFragmentTemplate] - Fragment shader template
   */
  setShaderGenerator({
    vertex: t = Ke.defaultVertexSrc,
    fragment: e = Ke.defaultFragmentTemplate
  } = {}) {
    this.shaderGenerator = new A_(t, e);
  }
  /**
   * Handles the `contextChange` signal.
   *
   * It calculates `this.maxTextures` and allocating the packed-geometry object pool.
   */
  contextChange() {
    const t = this.renderer.gl;
    Dt.PREFER_ENV === Qr.WEBGL_LEGACY ? this.maxTextures = 1 : (this.maxTextures = Math.min(
      t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),
      Ke.defaultMaxTextures
    ), this.maxTextures = e_(
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
    } = Ke, i = this.size / 4, s = Math.floor(i / this.maxTextures) + 1;
    for (; t.length < i; )
      t.push(new i_());
    for (; e.length < s; )
      e.push(new S_());
    for (let o = 0; o < this.maxTextures; o++)
      this._tempBoundTextures[o] = null;
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
    } = this, i = Ke._textureArrayPool, s = this.renderer.batch, o = this._tempBoundTextures, h = this.renderer.textureGC.count;
    let l = ++Qt._globalBatch, c = 0, _ = i[0], g = 0;
    s.copyBoundTextures(o, e);
    for (let T = 0; T < this._bufferSize; ++T) {
      const w = t[T];
      t[T] = null, w._batchEnabled !== l && (_.count >= e && (s.boundArray(_, o, l, e), this.buildDrawCalls(_, g, T), g = T, _ = i[++c], ++l), w._batchEnabled = l, w.touched = h, _.elements[_.count++] = w);
    }
    _.count > 0 && (s.boundArray(_, o, l, e), this.buildDrawCalls(_, g, this._bufferSize), ++c, ++l);
    for (let T = 0; T < o.length; T++)
      o[T] = null;
    Qt._globalBatch = l;
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
      _attributeBuffer: o,
      _indexBuffer: h,
      vertexSize: l
    } = this, c = Ke._drawCallPool;
    let _ = this._dcIndex, g = this._aIndex, T = this._iIndex, w = c[_];
    w.start = this._iIndex, w.texArray = t;
    for (let S = e; S < i; ++S) {
      const R = s[S], D = R._texture.baseTexture, L = Hd[D.alphaMode ? 1 : 0][R.blendMode];
      s[S] = null, e < S && w.blend !== L && (w.size = T - w.start, e = S, w = c[++_], w.texArray = t, w.start = T), this.packInterleavedGeometry(R, o, h, g, T), g += R.vertexData.length / 2 * l, T += R.indices.length, w.blend = L;
    }
    e < i && (w.size = T - w.start, ++_), this._dcIndex = _, this._aIndex = g, this._iIndex = T;
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
    Ke.canUploadSameBuffer ? (t[this._flushId]._buffer.update(e.rawBinaryData), t[this._flushId]._indexBuffer.update(i), this.renderer.geometry.updateBuffers()) : (this._packedGeometryPoolSize <= this._flushId && (this._packedGeometryPoolSize++, t[this._flushId] = new this.geometryClass()), t[this._flushId]._buffer.update(e.rawBinaryData), t[this._flushId]._indexBuffer.update(i), this.renderer.geometry.bind(t[this._flushId]), this.renderer.geometry.updateBuffers(), this._flushId++);
  }
  drawBatches() {
    const t = this._dcIndex, { gl: e, state: i } = this.renderer, s = Ke._drawCallPool;
    let o = null;
    for (let h = 0; h < t; h++) {
      const { texArray: l, type: c, size: _, start: g, blend: T } = s[h];
      o !== l && (o = l, this.bindAndClearTexArray(l)), this.state.blendMode = T, i.set(this.state), e.drawElements(c, _, e.UNSIGNED_SHORT, g * 2);
    }
  }
  /** Renders the content _now_ and empties the current batch. */
  flush() {
    this._vertexCount !== 0 && (this._attributeBuffer = this.getAttributeBuffer(this._vertexCount), this._indexBuffer = this.getIndexBuffer(this._indexCount), this._aIndex = 0, this._iIndex = 0, this._dcIndex = 0, this.buildTexturesAndDrawCalls(), this.updateGeometry(), this.drawBatches(), this._bufferSize = 0, this._vertexCount = 0, this._indexCount = 0);
  }
  /** Starts a new sprite batch. */
  start() {
    this.renderer.state.set(this.state), this.renderer.texture.ensureSamplerType(this.maxTextures), this.renderer.shader.bind(this._shader), Ke.canUploadSameBuffer && this.renderer.geometry.bind(this._packedGeometries[this._flushId]);
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
    const e = Ws(Math.ceil(t / 8)), i = uh(e), s = e * 8;
    this._aBuffers.length <= i && (this._iBuffers.length = i + 1);
    let o = this._aBuffers[s];
    return o || (this._aBuffers[s] = o = new Kd(s * this.vertexSize * 4)), o;
  }
  /**
   * Fetches an index buffer from `this._iBuffers` that can
   * have at least `size` capacity.
   * @param size - minimum required capacity
   * @returns - buffer that can fit `size` indices.
   */
  getIndexBuffer(t) {
    const e = Ws(Math.ceil(t / 12)), i = uh(e), s = e * 12;
    this._iBuffers.length <= i && (this._iBuffers.length = i + 1);
    let o = this._iBuffers[i];
    return o || (this._iBuffers[i] = o = new Uint16Array(s)), o;
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
  packInterleavedGeometry(t, e, i, s, o) {
    const {
      uint32View: h,
      float32View: l
    } = e, c = s / this.vertexSize, _ = t.uvs, g = t.indices, T = t.vertexData, w = t._texture.baseTexture._batchLocation, S = Math.min(t.worldAlpha, 1), R = an.shared.setValue(t._tintRGB).toPremultiplied(S, t._texture.baseTexture.alphaMode > 0);
    for (let D = 0; D < T.length; D += 2)
      l[s++] = T[D], l[s++] = T[D + 1], l[s++] = _[D], l[s++] = _[D + 1], h[s++] = R, l[s++] = w;
    for (let D = 0; D < g.length; D++)
      i[o++] = c + g[D];
  }
};
Ui.defaultBatchSize = 4096, /** @ignore */
Ui.extension = {
  name: "batch",
  type: Rt.RendererPlugin
}, /**
* Pool of `BatchDrawCall` objects that `flush` used
* to create "batches" of the objects being rendered.
*
* These are never re-allocated again.
* Shared between all batch renderers because it can be only one "flush" working at the moment.
* @member {PIXI.BatchDrawCall[]}
*/
Ui._drawCallPool = [], /**
* Pool of `BatchDrawCall` objects that `flush` used
* to create "batches" of the objects being rendered.
*
* These are never re-allocated again.
* Shared between all batch renderers because it can be only one "flush" working at the moment.
* @member {PIXI.BatchTextureArray[]}
*/
Ui._textureArrayPool = [];
let Gr = Ui;
Gt.add(Gr);
var L_ = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor = texture2D(uSampler, vTextureCoord);
}
`, F_ = `attribute vec2 aVertexPosition;

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
const $o = class ki extends ln {
  /**
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param uniforms - Custom uniforms to use to augment the built-in ones.
   */
  constructor(t, e, i) {
    const s = Yr.from(
      t || ki.defaultVertexSrc,
      e || ki.defaultFragmentSrc
    );
    super(s, i), this.padding = 0, this.resolution = ki.defaultResolution, this.multisample = ki.defaultMultisample, this.enabled = !0, this.autoFit = !0, this.state = new Ii();
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
  apply(t, e, i, s, o) {
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
    return F_;
  }
  /**
   * The default fragment shader source
   * @readonly
   */
  static get defaultFragmentSrc() {
    return L_;
  }
};
$o.defaultResolution = 1, /**
* Default filter samples for any filter.
* @static
* @type {PIXI.MSAA_QUALITY|null}
* @default PIXI.MSAA_QUALITY.NONE
*/
$o.defaultMultisample = be.NONE;
let mi = $o;
class qs {
  constructor() {
    this.clearBeforeRender = !0, this._backgroundColor = new an(0), this.alpha = 1;
  }
  /**
   * initiates the background system
   * @param {PIXI.IRendererOptions} options - the options for the background colors
   */
  init(t) {
    this.clearBeforeRender = t.clearBeforeRender;
    const { backgroundColor: e, background: i, backgroundAlpha: s } = t, o = i ?? e;
    o !== void 0 && (this.color = o), this.alpha = s;
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
qs.defaultOptions = {
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
qs.extension = {
  type: [
    Rt.RendererSystem,
    Rt.CanvasRendererSystem
  ],
  name: "background"
};
Gt.add(qs);
class Rl {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(t) {
    this.renderer = t, this.emptyRenderer = new Pl(t), this.currentRenderer = this.emptyRenderer;
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
    const { elements: o, ids: h, count: l } = t;
    let c = 0;
    for (let _ = 0; _ < l; _++) {
      const g = o[_], T = g._batchLocation;
      if (T >= 0 && T < s && e[T] === g) {
        h[_] = T;
        continue;
      }
      for (; c < s; ) {
        const w = e[c];
        if (w && w._batchEnabled === i && w._batchLocation === c) {
          c++;
          continue;
        }
        h[_] = c, g._batchLocation = c, e[c] = g;
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
Rl.extension = {
  type: Rt.RendererSystem,
  name: "batch"
};
Gt.add(Rl);
let gh = 0;
class Hs {
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
    this.gl = t, this.renderer.gl = t, this.renderer.CONTEXT_UID = gh++;
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
    this.gl = t, this.validateContext(t), this.renderer.gl = t, this.renderer.CONTEXT_UID = gh++, this.renderer.runners.contextChange.emit(t);
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
    if (Dt.PREFER_ENV >= Qr.WEBGL2 && (i = t.getContext("webgl2", e)), i)
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
Hs.defaultOptions = {
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
Hs.extension = {
  type: Rt.RendererSystem,
  name: "context"
};
Gt.add(Hs);
class xo {
  /**
   * @param width - Width of the frame buffer
   * @param height - Height of the frame buffer
   */
  constructor(t, e) {
    if (this.width = Math.round(t), this.height = Math.round(e), !this.width || !this.height)
      throw new Error("Framebuffer width or height is zero");
    this.stencil = !1, this.depth = !1, this.dirtyId = 0, this.dirtyFormat = 0, this.dirtySize = 0, this.depthTexture = null, this.colorTextures = [], this.glFramebuffers = {}, this.disposeRunner = new er("disposeFramebuffer"), this.multisample = be.NONE;
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
    return this.colorTextures[t] = e || new Qt(null, {
      scaleMode: vr.NEAREST,
      resolution: 1,
      mipmap: Hr.OFF,
      width: this.width,
      height: this.height
    }), this.dirtyId++, this.dirtyFormat++, this;
  }
  /**
   * Add a depth texture to the frame buffer.
   * @param texture - Texture to add.
   */
  addDepthTexture(t) {
    return this.depthTexture = t || new Qt(null, {
      scaleMode: vr.NEAREST,
      resolution: 1,
      width: this.width,
      height: this.height,
      mipmap: Hr.OFF,
      format: Z.DEPTH_COMPONENT,
      type: Pt.UNSIGNED_SHORT
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
        const s = this.colorTextures[i], o = s.resolution;
        s.setSize(t / o, e / o);
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
class Cl extends Qt {
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
      const e = arguments[0], i = arguments[1], s = arguments[2], o = arguments[3];
      t = { width: e, height: i, scaleMode: s, resolution: o };
    }
    t.width = t.width ?? 100, t.height = t.height ?? 100, t.multisample ?? (t.multisample = be.NONE), super(null, t), this.mipmap = Hr.OFF, this.valid = !0, this._clear = new an([0, 0, 0, 0]), this.framebuffer = new xo(this.realWidth, this.realHeight).addColorTexture(0, this), this.framebuffer.multisample = t.multisample, this.maskStack = [], this.filterStack = [{}];
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
class $r extends ts {
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
    i === void 0 && !e.startsWith("data:") ? t.crossOrigin = Qd(e) : i !== !1 && (t.crossOrigin = typeof i == "string" ? i : "anonymous");
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
    const o = t.gl, h = e.realWidth, l = e.realHeight;
    if (s = s || this.source, typeof HTMLImageElement < "u" && s instanceof HTMLImageElement) {
      if (!s.complete || s.naturalWidth === 0)
        return !1;
    } else if (typeof HTMLVideoElement < "u" && s instanceof HTMLVideoElement && s.readyState <= 1)
      return !1;
    return o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.alphaMode === Kr.UNPACK), !this.noSubImage && e.target === o.TEXTURE_2D && i.width === h && i.height === l ? o.texSubImage2D(o.TEXTURE_2D, 0, 0, 0, e.format, i.type, s) : (i.width = h, i.height = l, o.texImage2D(e.target, 0, i.internalFormat, e.format, i.type, s)), !0;
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
class Il extends $r {
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
      $r.crossOrigin(i, t, e.crossorigin), i.src = t, t = i;
    }
    super(t), !t.complete && this._width && this._height && (this._width = 0, this._height = 0), this.url = t.src, this._process = null, this.preserveBitmap = !1, this.createBitmap = (e.createBitmap ?? Dt.CREATE_IMAGE_BITMAP) && !!globalThis.createImageBitmap, this.alphaMode = typeof e.alphaMode == "number" ? e.alphaMode : null, this.bitmap = null, this._load = null, e.autoLoad !== !1 && this.load();
  }
  /**
   * Returns a promise when image will be loaded and processed.
   * @param createBitmap - whether process image into bitmap
   */
  load(t) {
    return this._load ? this._load : (t !== void 0 && (this.createBitmap = t), this._load = new Promise((e, i) => {
      const s = this.source;
      this.url = s.src;
      const o = () => {
        this.destroyed || (s.onload = null, s.onerror = null, this.update(), this._load = null, this.createBitmap ? e(this.process()) : e(this));
      };
      s.complete && s.src ? o() : (s.onload = o, s.onerror = (h) => {
        i(h), this.onError.emit(h);
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
        premultiplyAlpha: this.alphaMode === null || this.alphaMode === Kr.UNPACK ? "premultiply" : "none"
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
      const o = e._glTextures;
      for (const h in o) {
        const l = o[h];
        if (l !== i && l.dirtyId !== e.dirtyId) {
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
class Vo {
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
    const s = e.width, o = e.height;
    if (i) {
      const h = t.width / 2 / s, l = t.height / 2 / o, c = t.x / s + h, _ = t.y / o + l;
      i = _e.add(i, _e.NW), this.x0 = c + h * _e.uX(i), this.y0 = _ + l * _e.uY(i), i = _e.add(i, 2), this.x1 = c + h * _e.uX(i), this.y1 = _ + l * _e.uY(i), i = _e.add(i, 2), this.x2 = c + h * _e.uX(i), this.y2 = _ + l * _e.uY(i), i = _e.add(i, 2), this.x3 = c + h * _e.uX(i), this.y3 = _ + l * _e.uY(i);
    } else
      this.x0 = t.x / s, this.y0 = t.y / o, this.x1 = (t.x + t.width) / s, this.y1 = t.y / o, this.x2 = (t.x + t.width) / s, this.y2 = (t.y + t.height) / o, this.x3 = t.x / s, this.y3 = (t.y + t.height) / o;
    this.uvsFloat32[0] = this.x0, this.uvsFloat32[1] = this.y0, this.uvsFloat32[2] = this.x1, this.uvsFloat32[3] = this.y1, this.uvsFloat32[4] = this.x2, this.uvsFloat32[5] = this.y2, this.uvsFloat32[6] = this.x3, this.uvsFloat32[7] = this.y3;
  }
}
Vo.prototype.toString = function() {
  return `[@pixi/core:TextureUvs x0=${this.x0} y0=${this.y0} x1=${this.x1} y1=${this.y1} x2=${this.x2} y2=${this.y2} x3=${this.x3} y3=${this.y3}]`;
};
const $h = new Vo();
function Ts(r) {
  r.destroy = function() {
  }, r.on = function() {
  }, r.once = function() {
  }, r.emit = function() {
  };
}
class Xt extends Jr {
  /**
   * @param baseTexture - The base texture source to create the texture from
   * @param frame - The rectangle frame of the texture to show
   * @param orig - The area of original texture
   * @param trim - Trimmed rectangle of original texture
   * @param rotate - indicates how the texture was rotated by texture packer. See {@link PIXI.groupD8}
   * @param anchor - Default anchor point used for sprite placement / rotation
   * @param borders - Default borders used for 9-slice scaling. See {@link PIXI.NineSlicePlane}
   */
  constructor(t, e, i, s, o, h, l) {
    if (super(), this.noFrame = !1, e || (this.noFrame = !0, e = new ee(0, 0, 1, 1)), t instanceof Xt && (t = t.baseTexture), this.baseTexture = t, this._frame = e, this.trim = s, this.valid = !1, this.destroyed = !1, this._uvs = $h, this.uvMatrix = null, this.orig = i || e, this._rotate = Number(o || 0), o === !0)
      this._rotate = 2;
    else if (this._rotate % 2 !== 0)
      throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
    this.defaultAnchor = h ? new Me(h.x, h.y) : new Me(0, 0), this.defaultBorders = l, this._updateID = 0, this.textureCacheIds = [], t.valid ? this.noFrame ? t.valid && this.onBaseTextureUpdated(t) : this.frame = e : t.once("loaded", this.onBaseTextureUpdated, this), this.noFrame && t.on("update", this.onBaseTextureUpdated, this);
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
        e != null && e.url && lr[e.url] && Xt.removeFromCache(e.url), this.baseTexture.destroy();
      }
      this.baseTexture.off("loaded", this.onBaseTextureUpdated, this), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture = null;
    }
    this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, Xt.removeFromCache(this), this.textureCacheIds = null, this.destroyed = !0, this.emit("destroyed", this), this.removeAllListeners();
  }
  /**
   * Creates a new texture object that acts the same as this one.
   * @returns - The new texture
   */
  clone() {
    var s;
    const t = this._frame.clone(), e = this._frame === this.orig ? t : this.orig.clone(), i = new Xt(
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
    this._uvs === $h && (this._uvs = new Vo()), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++;
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
  static from(t, e = {}, i = Dt.STRICT_TEXTURE_CACHE) {
    const s = typeof t == "string";
    let o = null;
    if (s)
      o = t;
    else if (t instanceof Qt) {
      if (!t.cacheId) {
        const l = (e == null ? void 0 : e.pixiIdPrefix) || "pixiid";
        t.cacheId = `${l}-${Ji()}`, Qt.addToCache(t, t.cacheId);
      }
      o = t.cacheId;
    } else {
      if (!t._pixiId) {
        const l = (e == null ? void 0 : e.pixiIdPrefix) || "pixiid";
        t._pixiId = `${l}_${Ji()}`;
      }
      o = t._pixiId;
    }
    let h = lr[o];
    if (s && i && !h)
      throw new Error(`The cacheId "${o}" does not exist in TextureCache.`);
    return !h && !(t instanceof Qt) ? (e.resolution || (e.resolution = fh(t)), h = new Xt(new Qt(t, e)), h.baseTexture.cacheId = o, Qt.addToCache(h.baseTexture, o), Xt.addToCache(h, o)) : !h && t instanceof Qt && (h = new Xt(t), Xt.addToCache(h, o)), h;
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
    const i = Object.assign({ autoLoad: !1 }, e == null ? void 0 : e.resourceOptions), s = Xt.from(t, Object.assign({ resourceOptions: i }, e), !1), o = s.baseTexture.resource;
    return s.baseTexture.valid ? Promise.resolve(s) : o.load().then(() => Promise.resolve(s));
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
    return new Xt(Qt.fromBuffer(t, e, i, s));
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
    const o = new Qt(t, Object.assign({
      scaleMode: Qt.defaultOptions.scaleMode,
      resolution: fh(e)
    }, s)), { resource: h } = o;
    h instanceof Il && (h.url = e);
    const l = new Xt(o);
    return i || (i = e), Qt.addToCache(l.baseTexture, i), Xt.addToCache(l, i), i !== e && (Qt.addToCache(l.baseTexture, e), Xt.addToCache(l, e)), l.baseTexture.valid ? Promise.resolve(l) : new Promise((c) => {
      l.baseTexture.once("loaded", () => c(l));
    });
  }
  /**
   * Adds a Texture to the global TextureCache. This cache is shared across the whole PIXI object.
   * @param texture - The Texture to add to the cache.
   * @param id - The id that the Texture will be stored against.
   */
  static addToCache(t, e) {
    e && (t.textureCacheIds.includes(e) || t.textureCacheIds.push(e), lr[e] && lr[e] !== t && console.warn(`Texture added to the cache with an id [${e}] that already had an entry`), lr[e] = t);
  }
  /**
   * Remove a Texture from the global TextureCache.
   * @param texture - id of a Texture to be removed, or a Texture instance itself
   * @returns - The Texture that was removed
   */
  static removeFromCache(t) {
    if (typeof t == "string") {
      const e = lr[t];
      if (e) {
        const i = e.textureCacheIds.indexOf(t);
        return i > -1 && e.textureCacheIds.splice(i, 1), delete lr[t], e;
      }
    } else if (t != null && t.textureCacheIds) {
      for (let e = 0; e < t.textureCacheIds.length; ++e)
        lr[t.textureCacheIds[e]] === t && delete lr[t.textureCacheIds[e]];
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
    const { x: e, y: i, width: s, height: o } = t, h = e + s > this.baseTexture.width, l = i + o > this.baseTexture.height;
    if (h || l) {
      const c = h && l ? "and" : "or", _ = `X: ${e} + ${s} = ${e + s} > ${this.baseTexture.width}`, g = `Y: ${i} + ${o} = ${i + o} > ${this.baseTexture.height}`;
      throw new Error(`Texture Error: frame does not fit inside the base Texture dimensions: ${_} ${c} ${g}`);
    }
    this.valid = s && o && this.baseTexture.valid, !this.trim && !this.rotate && (this.orig = t), this.valid && this.updateUvs();
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
    return Xt._EMPTY || (Xt._EMPTY = new Xt(new Qt()), Ts(Xt._EMPTY), Ts(Xt._EMPTY.baseTexture)), Xt._EMPTY;
  }
  /** A white texture of 16x16 size, used for graphics and other things Can not be destroyed. */
  static get WHITE() {
    if (!Xt._WHITE) {
      const t = Dt.ADAPTER.createCanvas(16, 16), e = t.getContext("2d");
      t.width = 16, t.height = 16, e.fillStyle = "white", e.fillRect(0, 0, 16, 16), Xt._WHITE = new Xt(Qt.from(t)), Ts(Xt._WHITE), Ts(Xt._WHITE.baseTexture);
    }
    return Xt._WHITE;
  }
}
class un extends Xt {
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
    const s = this.baseTexture.resolution, o = Math.round(t * s) / s, h = Math.round(e * s) / s;
    this.valid = o > 0 && h > 0, this._frame.width = this.orig.width = o, this._frame.height = this.orig.height = h, i && this.baseTexture.resize(o, h), this.updateUvs();
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
    return new un(new Cl(t));
  }
}
class Ll {
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
  createTexture(t, e, i = be.NONE) {
    const s = new Cl(Object.assign({
      width: t,
      height: e,
      resolution: 1,
      multisample: i
    }, this.textureOptions));
    return new un(s);
  }
  /**
   * Gets a Power-of-Two render texture or fullScreen texture
   * @param minWidth - The minimum width of the render texture.
   * @param minHeight - The minimum height of the render texture.
   * @param resolution - The resolution of the render texture.
   * @param multisample - Number of samples of the render texture.
   * @returns The new render texture.
   */
  getOptimalTexture(t, e, i = 1, s = be.NONE) {
    let o;
    t = Math.max(Math.ceil(t * i - 1e-6), 1), e = Math.max(Math.ceil(e * i - 1e-6), 1), !this.enableFullScreen || t !== this._pixelsWidth || e !== this._pixelsHeight ? (t = Ws(t), e = Ws(e), o = ((t & 65535) << 16 | e & 65535) >>> 0, s > 1 && (o += s * 4294967296)) : o = s > 1 ? -s : -1, this.texturePool[o] || (this.texturePool[o] = []);
    let h = this.texturePool[o].pop();
    return h || (h = this.createTexture(t, e, s)), h.filterPoolKey = o, h.setResolution(i), h;
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
      i || be.NONE
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
Ll.SCREEN_KEY = -1;
class M_ extends bi {
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
class O_ extends bi {
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
    ]), this.vertexBuffer = new Ue(this.vertices), this.uvBuffer = new Ue(this.uvs), this.addAttribute("aVertexPosition", this.vertexBuffer).addAttribute("aTextureCoord", this.uvBuffer).addIndex([0, 1, 2, 0, 2, 3]);
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
class N_ {
  constructor() {
    this.renderTexture = null, this.target = null, this.legacy = !1, this.resolution = 1, this.multisample = be.NONE, this.sourceFrame = new ee(), this.destinationFrame = new ee(), this.bindingSourceFrame = new ee(), this.bindingDestinationFrame = new ee(), this.filters = [], this.transform = null;
  }
  /** Clears the state */
  clear() {
    this.target = null, this.filters = null, this.renderTexture = null;
  }
}
const ws = [new Me(), new Me(), new Me(), new Me()], zn = new ye();
class Fl {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(t) {
    this.renderer = t, this.defaultFilterStack = [{}], this.texturePool = new Ll(), this.statePool = [], this.quad = new M_(), this.quadUv = new O_(), this.tempRect = new ee(), this.activeState = {}, this.globalUniforms = new dr({
      outputFrame: new ee(),
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
    const i = this.renderer, s = this.defaultFilterStack, o = this.statePool.pop() || new N_(), h = i.renderTexture;
    let l, c;
    if (h.current) {
      const L = h.current;
      l = L.resolution, c = L.multisample;
    } else
      l = i.resolution, c = i.multisample;
    let _ = e[0].resolution || l, g = e[0].multisample ?? c, T = e[0].padding, w = e[0].autoFit, S = e[0].legacy ?? !0;
    for (let L = 1; L < e.length; L++) {
      const K = e[L];
      _ = Math.min(_, K.resolution || l), g = Math.min(g, K.multisample ?? c), T = this.useMaxPadding ? Math.max(T, K.padding) : T + K.padding, w = w && K.autoFit, S = S || (K.legacy ?? !0);
    }
    s.length === 1 && (this.defaultFilterStack[0].renderTexture = h.current), s.push(o), o.resolution = _, o.multisample = g, o.legacy = S, o.target = t, o.sourceFrame.copyFrom(t.filterArea || t.getBounds(!0)), o.sourceFrame.pad(T);
    const R = this.tempRect.copyFrom(h.sourceFrame);
    i.projection.transform && this.transformAABB(
      zn.copyFrom(i.projection.transform).invert(),
      R
    ), w ? (o.sourceFrame.fit(R), (o.sourceFrame.width <= 0 || o.sourceFrame.height <= 0) && (o.sourceFrame.width = 0, o.sourceFrame.height = 0)) : o.sourceFrame.intersects(R) || (o.sourceFrame.width = 0, o.sourceFrame.height = 0), this.roundFrame(
      o.sourceFrame,
      h.current ? h.current.resolution : i.resolution,
      h.sourceFrame,
      h.destinationFrame,
      i.projection.transform
    ), o.renderTexture = this.getOptimalFilterTexture(
      o.sourceFrame.width,
      o.sourceFrame.height,
      _,
      g
    ), o.filters = e, o.destinationFrame.width = o.renderTexture.width, o.destinationFrame.height = o.renderTexture.height;
    const D = this.tempRect;
    D.x = 0, D.y = 0, D.width = o.sourceFrame.width, D.height = o.sourceFrame.height, o.renderTexture.filterFrame = o.sourceFrame, o.bindingSourceFrame.copyFrom(h.sourceFrame), o.bindingDestinationFrame.copyFrom(h.destinationFrame), o.transform = i.projection.transform, i.projection.transform = null, h.bind(o.renderTexture, o.sourceFrame, D), i.framebuffer.clear(0, 0, 0, 0);
  }
  /** Pops off the filter and applies it. */
  pop() {
    const t = this.defaultFilterStack, e = t.pop(), i = e.filters;
    this.activeState = e;
    const s = this.globalUniforms.uniforms;
    s.outputFrame = e.sourceFrame, s.resolution = e.resolution;
    const o = s.inputSize, h = s.inputPixel, l = s.inputClamp;
    if (o[0] = e.destinationFrame.width, o[1] = e.destinationFrame.height, o[2] = 1 / o[0], o[3] = 1 / o[1], h[0] = Math.round(o[0] * e.resolution), h[1] = Math.round(o[1] * e.resolution), h[2] = 1 / h[0], h[3] = 1 / h[1], l[0] = 0.5 * h[2], l[1] = 0.5 * h[3], l[2] = e.sourceFrame.width * o[2] - 0.5 * h[2], l[3] = e.sourceFrame.height * o[3] - 0.5 * h[3], e.legacy) {
      const _ = s.filterArea;
      _[0] = e.destinationFrame.width, _[1] = e.destinationFrame.height, _[2] = e.sourceFrame.x, _[3] = e.sourceFrame.y, s.filterClamp = s.inputClamp;
    }
    this.globalUniforms.update();
    const c = t[t.length - 1];
    if (this.renderer.framebuffer.blit(), i.length === 1)
      i[0].apply(this, e.renderTexture, c.renderTexture, Nr.BLEND, e), this.returnFilterTexture(e.renderTexture);
    else {
      let _ = e.renderTexture, g = this.getOptimalFilterTexture(
        _.width,
        _.height,
        e.resolution
      );
      g.filterFrame = _.filterFrame;
      let T = 0;
      for (T = 0; T < i.length - 1; ++T) {
        T === 1 && e.multisample > 1 && (g = this.getOptimalFilterTexture(
          _.width,
          _.height,
          e.resolution
        ), g.filterFrame = _.filterFrame), i[T].apply(this, _, g, Nr.CLEAR, e);
        const w = _;
        _ = g, g = w;
      }
      i[T].apply(this, _, c.renderTexture, Nr.BLEND, e), T > 1 && e.multisample > 1 && this.returnFilterTexture(e.renderTexture), this.returnFilterTexture(_), this.returnFilterTexture(g);
    }
    e.clear(), this.statePool.push(e);
  }
  /**
   * Binds a renderTexture with corresponding `filterFrame`, clears it if mode corresponds.
   * @param filterTexture - renderTexture to bind, should belong to filter pool or filter stack
   * @param clearMode - clearMode, by default its CLEAR/YES. See {@link PIXI.CLEAR_MODES}
   */
  bindAndClear(t, e = Nr.CLEAR) {
    const {
      renderTexture: i,
      state: s
    } = this.renderer;
    if (t === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.projection.transform = this.activeState.transform : this.renderer.projection.transform = null, t == null ? void 0 : t.filterFrame) {
      const h = this.tempRect;
      h.x = 0, h.y = 0, h.width = t.filterFrame.width, h.height = t.filterFrame.height, i.bind(t, t.filterFrame, h);
    } else
      t !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? i.bind(t) : this.renderer.renderTexture.bind(
        t,
        this.activeState.bindingSourceFrame,
        this.activeState.bindingDestinationFrame
      );
    const o = s.stateId & 1 || this.forceClear;
    (e === Nr.CLEAR || e === Nr.BLIT && o) && this.renderer.framebuffer.clear(0, 0, 0, 0);
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
    const o = this.renderer;
    o.state.set(t.state), this.bindAndClear(i, s), t.uniforms.uSampler = e, t.uniforms.filterGlobals = this.globalUniforms, o.shader.bind(t), t.legacy = !!t.program.attributeData.aTextureCoord, t.legacy ? (this.quadUv.map(e._frame, e.filterFrame), o.geometry.bind(this.quadUv), o.geometry.draw(ks.TRIANGLES)) : (o.geometry.bind(this.quad), o.geometry.draw(ks.TRIANGLE_STRIP));
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
    const { sourceFrame: i, destinationFrame: s } = this.activeState, { orig: o } = e._texture, h = t.set(
      s.width,
      0,
      0,
      s.height,
      i.x,
      i.y
    ), l = e.worldTransform.copyTo(ye.TEMP_MATRIX);
    return l.invert(), h.prepend(l), h.scale(1 / o.width, 1 / o.height), h.translate(e.anchor.x, e.anchor.y), h;
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
  getOptimalFilterTexture(t, e, i = 1, s = be.NONE) {
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
      const o = t;
      t = e, e = o;
    }
    t = t || this.activeState.renderTexture;
    const s = this.texturePool.getOptimalTexture(
      t.width,
      t.height,
      e || t.resolution,
      i || be.NONE
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
    const i = ws[0], s = ws[1], o = ws[2], h = ws[3];
    i.set(e.left, e.top), s.set(e.left, e.bottom), o.set(e.right, e.top), h.set(e.right, e.bottom), t.apply(i, i), t.apply(s, s), t.apply(o, o), t.apply(h, h);
    const l = Math.min(i.x, s.x, o.x, h.x), c = Math.min(i.y, s.y, o.y, h.y), _ = Math.max(i.x, s.x, o.x, h.x), g = Math.max(i.y, s.y, o.y, h.y);
    e.x = l, e.y = c, e.width = _ - l, e.height = g - c;
  }
  roundFrame(t, e, i, s, o) {
    if (!(t.width <= 0 || t.height <= 0 || i.width <= 0 || i.height <= 0)) {
      if (o) {
        const { a: h, b: l, c, d: _ } = o;
        if ((Math.abs(l) > 1e-4 || Math.abs(c) > 1e-4) && (Math.abs(h) > 1e-4 || Math.abs(_) > 1e-4))
          return;
      }
      o = o ? zn.copyFrom(o) : zn.identity(), o.translate(-i.x, -i.y).scale(
        s.width / i.width,
        s.height / i.height
      ).translate(s.x, s.y), this.transformAABB(o, t), t.ceil(e), this.transformAABB(o.invert(), t);
    }
  }
}
Fl.extension = {
  type: Rt.RendererSystem,
  name: "filter"
};
Gt.add(Fl);
class D_ {
  constructor(t) {
    this.framebuffer = t, this.stencil = null, this.dirtyId = -1, this.dirtyFormat = -1, this.dirtySize = -1, this.multisample = be.NONE, this.msaaBuffer = null, this.blitFramebuffer = null, this.mipLevel = 0;
  }
}
const B_ = new ee();
class Ml {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(t) {
    this.renderer = t, this.managedFramebuffers = [], this.unknownFramebuffer = new xo(10, 10), this.msaaSamples = null;
  }
  /** Sets up the renderer context and necessary buffers. */
  contextChange() {
    this.disposeAll(!0);
    const t = this.gl = this.renderer.gl;
    if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.current = this.unknownFramebuffer, this.viewport = new ee(), this.hasMRT = !0, this.writeDepthTexture = !0, this.renderer.context.webGLVersion === 1) {
      let e = this.renderer.context.extensions.drawBuffers, i = this.renderer.context.extensions.depthTexture;
      Dt.PREFER_ENV === Qr.WEBGL_LEGACY && (e = null, i = null), e ? t.drawBuffers = (s) => e.drawBuffersWEBGL(s) : (this.hasMRT = !1, t.drawBuffers = () => {
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
      const o = t.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(t);
      this.current !== t && (this.current = t, s.bindFramebuffer(s.FRAMEBUFFER, o.framebuffer)), o.mipLevel !== i && (t.dirtyId++, t.dirtyFormat++, o.mipLevel = i), o.dirtyId !== t.dirtyId && (o.dirtyId = t.dirtyId, o.dirtyFormat !== t.dirtyFormat ? (o.dirtyFormat = t.dirtyFormat, o.dirtySize = t.dirtySize, this.updateFramebuffer(t, i)) : o.dirtySize !== t.dirtySize && (o.dirtySize = t.dirtySize, this.resizeFramebuffer(t)));
      for (let h = 0; h < t.colorTextures.length; h++) {
        const l = t.colorTextures[h];
        this.renderer.texture.unbind(l.parentTextureArray || l);
      }
      if (t.depthTexture && this.renderer.texture.unbind(t.depthTexture), e) {
        const h = e.width >> i, l = e.height >> i, c = h / e.width;
        this.setViewport(
          e.x * c,
          e.y * c,
          h,
          l
        );
      } else {
        const h = t.width >> i, l = t.height >> i;
        this.setViewport(0, 0, h, l);
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
    const o = this.viewport;
    t = Math.round(t), e = Math.round(e), i = Math.round(i), s = Math.round(s), (o.width !== i || o.height !== s || o.x !== t || o.y !== e) && (o.x = t, o.y = e, o.width = i, o.height = s, this.gl.viewport(t, e, i, s));
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
  clear(t, e, i, s, o = Qn.COLOR | Qn.DEPTH) {
    const { gl: h } = this;
    h.clearColor(t, e, i, s), h.clear(o);
  }
  /**
   * Initialize framebuffer for this context
   * @protected
   * @param framebuffer
   * @returns - created GLFramebuffer
   */
  initFramebuffer(t) {
    const { gl: e } = this, i = new D_(e.createFramebuffer());
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
      let h;
      this.renderer.context.webGLVersion === 1 ? h = e.DEPTH_STENCIL : t.depth && t.stencil ? h = e.DEPTH24_STENCIL8 : t.depth ? h = e.DEPTH_COMPONENT24 : h = e.STENCIL_INDEX8, i.msaaBuffer ? e.renderbufferStorageMultisample(
        e.RENDERBUFFER,
        i.multisample,
        h,
        t.width,
        t.height
      ) : e.renderbufferStorage(e.RENDERBUFFER, h, t.width, t.height);
    }
    const s = t.colorTextures;
    let o = s.length;
    e.drawBuffers || (o = Math.min(o, 1));
    for (let h = 0; h < o; h++) {
      const l = s[h], c = l.parentTextureArray || l;
      this.renderer.texture.bind(c, 0), h === 0 && i.msaaBuffer && (e.bindRenderbuffer(e.RENDERBUFFER, i.msaaBuffer), e.renderbufferStorageMultisample(
        e.RENDERBUFFER,
        i.multisample,
        c._glTextures[this.CONTEXT_UID].internalFormat,
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
    const { gl: i } = this, s = t.glFramebuffers[this.CONTEXT_UID], o = t.colorTextures;
    let h = o.length;
    i.drawBuffers || (h = Math.min(h, 1)), s.multisample > 1 && this.canMultisampleFramebuffer(t) ? s.msaaBuffer = s.msaaBuffer || i.createRenderbuffer() : s.msaaBuffer && (i.deleteRenderbuffer(s.msaaBuffer), s.msaaBuffer = null, s.blitFramebuffer && (s.blitFramebuffer.dispose(), s.blitFramebuffer = null));
    const l = [];
    for (let c = 0; c < h; c++) {
      const _ = o[c], g = _.parentTextureArray || _;
      this.renderer.texture.bind(g, 0), c === 0 && s.msaaBuffer ? (i.bindRenderbuffer(i.RENDERBUFFER, s.msaaBuffer), i.renderbufferStorageMultisample(
        i.RENDERBUFFER,
        s.multisample,
        g._glTextures[this.CONTEXT_UID].internalFormat,
        t.width,
        t.height
      ), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, s.msaaBuffer)) : (i.framebufferTexture2D(
        i.FRAMEBUFFER,
        i.COLOR_ATTACHMENT0 + c,
        _.target,
        g._glTextures[this.CONTEXT_UID].texture,
        e
      ), l.push(i.COLOR_ATTACHMENT0 + c));
    }
    if (l.length > 1 && i.drawBuffers(l), t.depthTexture && this.writeDepthTexture) {
      const c = t.depthTexture;
      this.renderer.texture.bind(c, 0), i.framebufferTexture2D(
        i.FRAMEBUFFER,
        i.DEPTH_ATTACHMENT,
        i.TEXTURE_2D,
        c._glTextures[this.CONTEXT_UID].texture,
        e
      );
    }
    if ((t.stencil || t.depth) && !(t.depthTexture && this.writeDepthTexture)) {
      s.stencil = s.stencil || i.createRenderbuffer();
      let c, _;
      this.renderer.context.webGLVersion === 1 ? (c = i.DEPTH_STENCIL_ATTACHMENT, _ = i.DEPTH_STENCIL) : t.depth && t.stencil ? (c = i.DEPTH_STENCIL_ATTACHMENT, _ = i.DEPTH24_STENCIL8) : t.depth ? (c = i.DEPTH_ATTACHMENT, _ = i.DEPTH_COMPONENT24) : (c = i.STENCIL_ATTACHMENT, _ = i.STENCIL_INDEX8), i.bindRenderbuffer(i.RENDERBUFFER, s.stencil), s.msaaBuffer ? i.renderbufferStorageMultisample(
        i.RENDERBUFFER,
        s.multisample,
        _,
        t.width,
        t.height
      ) : i.renderbufferStorage(i.RENDERBUFFER, _, t.width, t.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, c, i.RENDERBUFFER, s.stencil);
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
    let i = be.NONE;
    if (t <= 1 || e === null)
      return i;
    for (let s = 0; s < e.length; s++)
      if (e[s] <= t) {
        i = e[s];
        break;
      }
    return i === 1 && (i = be.NONE), i;
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
    const { current: s, renderer: o, gl: h, CONTEXT_UID: l } = this;
    if (o.context.webGLVersion !== 2 || !s)
      return;
    const c = s.glFramebuffers[l];
    if (!c)
      return;
    if (!t) {
      if (!c.msaaBuffer)
        return;
      const g = s.colorTextures[0];
      if (!g)
        return;
      c.blitFramebuffer || (c.blitFramebuffer = new xo(s.width, s.height), c.blitFramebuffer.addColorTexture(0, g)), t = c.blitFramebuffer, t.colorTextures[0] !== g && (t.colorTextures[0] = g, t.dirtyId++, t.dirtyFormat++), (t.width !== s.width || t.height !== s.height) && (t.width = s.width, t.height = s.height, t.dirtyId++, t.dirtySize++);
    }
    e || (e = B_, e.width = s.width, e.height = s.height), i || (i = e);
    const _ = e.width === i.width && e.height === i.height;
    this.bind(t), h.bindFramebuffer(h.READ_FRAMEBUFFER, c.framebuffer), h.blitFramebuffer(
      e.left,
      e.top,
      e.right,
      e.bottom,
      i.left,
      i.top,
      i.right,
      i.bottom,
      h.COLOR_BUFFER_BIT,
      _ ? h.NEAREST : h.LINEAR
    ), h.bindFramebuffer(h.READ_FRAMEBUFFER, t.glFramebuffers[this.CONTEXT_UID].framebuffer);
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
    const o = this.managedFramebuffers.indexOf(t);
    o >= 0 && this.managedFramebuffers.splice(o, 1), t.disposeRunner.remove(this), e || (s.deleteFramebuffer(i.framebuffer), i.msaaBuffer && s.deleteRenderbuffer(i.msaaBuffer), i.stencil && s.deleteRenderbuffer(i.stencil)), i.blitFramebuffer && this.disposeFramebuffer(i.blitFramebuffer, e);
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
    const i = t.width, s = t.height, o = this.gl, h = e.stencil = o.createRenderbuffer();
    o.bindRenderbuffer(o.RENDERBUFFER, h);
    let l, c;
    this.renderer.context.webGLVersion === 1 ? (l = o.DEPTH_STENCIL_ATTACHMENT, c = o.DEPTH_STENCIL) : t.depth ? (l = o.DEPTH_STENCIL_ATTACHMENT, c = o.DEPTH24_STENCIL8) : (l = o.STENCIL_ATTACHMENT, c = o.STENCIL_INDEX8), e.msaaBuffer ? o.renderbufferStorageMultisample(o.RENDERBUFFER, e.multisample, c, i, s) : o.renderbufferStorage(o.RENDERBUFFER, c, i, s), o.framebufferRenderbuffer(o.FRAMEBUFFER, l, o.RENDERBUFFER, h);
  }
  /** Resets framebuffer stored state, binds screen framebuffer. Should be called before renderTexture reset(). */
  reset() {
    this.current = this.unknownFramebuffer, this.viewport = new ee();
  }
  destroy() {
    this.renderer = null;
  }
}
Ml.extension = {
  type: Rt.RendererSystem,
  name: "framebuffer"
};
Gt.add(Ml);
const Xn = { 5126: 4, 5123: 2, 5121: 1 };
class Ol {
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
      Dt.PREFER_ENV === Qr.WEBGL_LEGACY && (i = null), i ? (t.createVertexArray = () => i.createVertexArrayOES(), t.bindVertexArray = (s) => i.bindVertexArrayOES(s), t.deleteVertexArray = (s) => i.deleteVertexArrayOES(s)) : (this.hasVao = !1, t.createVertexArray = () => null, t.bindVertexArray = () => null, t.deleteVertexArray = () => null);
    }
    if (e.webGLVersion !== 2) {
      const i = t.getExtension("ANGLE_instanced_arrays");
      i ? (t.vertexAttribDivisor = (s, o) => i.vertexAttribDivisorANGLE(s, o), t.drawElementsInstanced = (s, o, h, l, c) => i.drawElementsInstancedANGLE(s, o, h, l, c), t.drawArraysInstanced = (s, o, h, l) => i.drawArraysInstancedANGLE(s, o, h, l)) : this.hasInstance = !1;
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
    let s = t.glVertexArrayObjects[this.CONTEXT_UID], o = !1;
    s || (this.managedGeometries[t.id] = t, t.disposeRunner.add(this), t.glVertexArrayObjects[this.CONTEXT_UID] = s = {}, o = !0);
    const h = s[e.program.id] || this.initGeometryVao(t, e, o);
    this._activeGeometry = t, this._activeVao !== h && (this._activeVao = h, this.hasVao ? i.bindVertexArray(h) : this.activateVao(t, e.program)), this.updateBuffers();
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
    for (const o in s)
      if (!i[o])
        throw new Error(`shader and geometry incompatible, geometry missing the "${o}" attribute`);
  }
  /**
   * Takes a geometry and program and generates a unique signature for them.
   * @param geometry - To get signature from.
   * @param program - To test geometry against.
   * @returns - Unique signature of the geometry and program
   */
  getSignature(t, e) {
    const i = t.attributes, s = e.attributeData, o = ["g", t.id];
    for (const h in i)
      s[h] && o.push(h, s[h].location);
    return o.join("-");
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
    const s = this.gl, o = this.CONTEXT_UID, h = this.renderer.buffer, l = e.program;
    l.glPrograms[o] || this.renderer.shader.generateProgram(e), this.checkCompatibility(t, l);
    const c = this.getSignature(t, l), _ = t.glVertexArrayObjects[this.CONTEXT_UID];
    let g = _[c];
    if (g)
      return _[l.id] = g, g;
    const T = t.buffers, w = t.attributes, S = {}, R = {};
    for (const D in T)
      S[D] = 0, R[D] = 0;
    for (const D in w)
      !w[D].size && l.attributeData[D] ? w[D].size = l.attributeData[D].size : w[D].size || console.warn(`PIXI Geometry attribute '${D}' size cannot be determined (likely the bound shader does not have the attribute)`), S[w[D].buffer] += w[D].size * Xn[w[D].type];
    for (const D in w) {
      const L = w[D], K = L.size;
      L.stride === void 0 && (S[L.buffer] === K * Xn[L.type] ? L.stride = 0 : L.stride = S[L.buffer]), L.start === void 0 && (L.start = R[L.buffer], R[L.buffer] += K * Xn[L.type]);
    }
    g = s.createVertexArray(), s.bindVertexArray(g);
    for (let D = 0; D < T.length; D++) {
      const L = T[D];
      h.bind(L), i && L._glBuffers[o].refCount++;
    }
    return this.activateVao(t, l), _[l.id] = g, _[c] = g, s.bindVertexArray(null), h.unbind(fr.ARRAY_BUFFER), g;
  }
  /**
   * Disposes geometry.
   * @param geometry - Geometry with buffers. Only VAO will be disposed
   * @param [contextLost=false] - If context was lost, we suppress deleteVertexArray
   */
  disposeGeometry(t, e) {
    var l;
    if (!this.managedGeometries[t.id])
      return;
    delete this.managedGeometries[t.id];
    const i = t.glVertexArrayObjects[this.CONTEXT_UID], s = this.gl, o = t.buffers, h = (l = this.renderer) == null ? void 0 : l.buffer;
    if (t.disposeRunner.remove(this), !!i) {
      if (h)
        for (let c = 0; c < o.length; c++) {
          const _ = o[c]._glBuffers[this.CONTEXT_UID];
          _ && (_.refCount--, _.refCount === 0 && !e && h.dispose(o[c], e));
        }
      if (!e) {
        for (const c in i)
          if (c[0] === "g") {
            const _ = i[c];
            this._activeVao === _ && this.unbind(), s.deleteVertexArray(_);
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
    const i = this.gl, s = this.CONTEXT_UID, o = this.renderer.buffer, h = t.buffers, l = t.attributes;
    t.indexBuffer && o.bind(t.indexBuffer);
    let c = null;
    for (const _ in l) {
      const g = l[_], T = h[g.buffer], w = T._glBuffers[s];
      if (e.attributeData[_]) {
        c !== w && (o.bind(T), c = w);
        const S = e.attributeData[_].location;
        if (i.enableVertexAttribArray(S), i.vertexAttribPointer(
          S,
          g.size,
          g.type || i.FLOAT,
          g.normalized,
          g.stride,
          g.start
        ), g.instance)
          if (this.hasInstance)
            i.vertexAttribDivisor(S, g.divisor);
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
    const { gl: o } = this, h = this._activeGeometry;
    if (h.indexBuffer) {
      const l = h.indexBuffer.data.BYTES_PER_ELEMENT, c = l === 2 ? o.UNSIGNED_SHORT : o.UNSIGNED_INT;
      l === 2 || l === 4 && this.canUseUInt32ElementIndex ? h.instanced ? o.drawElementsInstanced(t, e || h.indexBuffer.data.length, c, (i || 0) * l, s || 1) : o.drawElements(t, e || h.indexBuffer.data.length, c, (i || 0) * l) : console.warn("unsupported index buffer type: uint32");
    } else
      h.instanced ? o.drawArraysInstanced(t, i, e || h.getSize(), s || 1) : o.drawArrays(t, i, e || h.getSize());
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
Ol.extension = {
  type: Rt.RendererSystem,
  name: "geometry"
};
Gt.add(Ol);
const xh = new ye();
class U_ {
  /**
   * @param texture - observed texture
   * @param clampMargin - Changes frame clamping, 0.5 by default. Use -0.5 for extra border.
   */
  constructor(t, e) {
    this._texture = t, this.mapCoord = new ye(), this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, this.clampMargin = typeof e > "u" ? 0.5 : e, this.isSimple = !1;
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
      const o = t[s], h = t[s + 1];
      e[s] = o * i.a + h * i.c + i.tx, e[s + 1] = o * i.b + h * i.d + i.ty;
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
    const s = e.orig, o = e.trim;
    o && (xh.set(
      s.width / o.width,
      0,
      0,
      s.height / o.height,
      -o.x / o.width,
      -o.y / o.height
    ), this.mapCoord.append(xh));
    const h = e.baseTexture, l = this.uClampFrame, c = this.clampMargin / h.resolution, _ = this.clampOffset;
    return l[0] = (e._frame.x + c + _) / h.width, l[1] = (e._frame.y + c + _) / h.height, l[2] = (e._frame.x + e._frame.width - c + _) / h.width, l[3] = (e._frame.y + e._frame.height - c + _) / h.height, this.uClampOffset[0] = _ / h.realWidth, this.uClampOffset[1] = _ / h.realHeight, this.isSimple = e._frame.width === h.width && e._frame.height === h.height && e.rotate === 0, !0;
  }
}
var k_ = `varying vec2 vMaskCoord;
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
`, G_ = `attribute vec2 aVertexPosition;
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
class V_ extends mi {
  /** @ignore */
  constructor(t, e, i) {
    let s = null;
    typeof t != "string" && e === void 0 && i === void 0 && (s = t, t = void 0, e = void 0, i = void 0), super(t || G_, e || k_, i), this.maskSprite = s, this.maskMatrix = new ye();
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
    const o = this._maskSprite, h = o._texture;
    h.valid && (h.uvMatrix || (h.uvMatrix = new U_(h, 0)), h.uvMatrix.update(), this.uniforms.npmAlpha = h.baseTexture.alphaMode ? 0 : 1, this.uniforms.mask = h, this.uniforms.otherMatrix = t.calculateSpriteMatrix(this.maskMatrix, o).prepend(h.uvMatrix.mapCoord), this.uniforms.alpha = o.worldAlpha, this.uniforms.maskClamp = h.uvMatrix.uClampFrame, t.applyFilter(this, e, i, s));
  }
}
class z_ {
  /**
   * Create MaskData
   * @param {PIXI.DisplayObject} [maskObject=null] - object that describes the mask
   */
  constructor(t = null) {
    this.type = Pe.NONE, this.autoDetect = !0, this.maskObject = t || null, this.pooled = !1, this.isMaskData = !0, this.resolution = null, this.multisample = mi.defaultMultisample, this.enabled = !0, this.colorMask = 15, this._filters = null, this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null, this._scissorRectLocal = null, this._colorMask = 15, this._target = null;
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
    this.pooled && (this.maskObject = null, this.type = Pe.NONE, this.autoDetect = !0), this._target = null, this._scissorRectLocal = null;
  }
  /**
   * Copies counters from maskData above, called from pushMask().
   * @param maskAbove
   */
  copyCountersOrReset(t) {
    t ? (this._stencilCounter = t._stencilCounter, this._scissorCounter = t._scissorCounter, this._scissorRect = t._scissorRect) : (this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null);
  }
}
class Nl {
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
      const o = this.maskDataPool.pop() || new z_();
      o.pooled = !0, o.maskObject = e, i = o;
    }
    const s = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null;
    if (i.copyCountersOrReset(s), i._colorMask = s ? s._colorMask : 15, i.autoDetect && this.detect(i), i._target = t, i.type !== Pe.SPRITE && this.maskStack.push(i), i.enabled)
      switch (i.type) {
        case Pe.SCISSOR:
          this.renderer.scissor.push(i);
          break;
        case Pe.STENCIL:
          this.renderer.stencil.push(i);
          break;
        case Pe.SPRITE:
          i.copyCountersOrReset(null), this.pushSpriteMask(i);
          break;
        case Pe.COLOR:
          this.pushColorMask(i);
          break;
      }
    i.type === Pe.SPRITE && this.maskStack.push(i);
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
          case Pe.SCISSOR:
            this.renderer.scissor.pop(e);
            break;
          case Pe.STENCIL:
            this.renderer.stencil.pop(e.maskObject);
            break;
          case Pe.SPRITE:
            this.popSpriteMask(e);
            break;
          case Pe.COLOR:
            this.popColorMask(e);
            break;
        }
      if (e.reset(), e.pooled && this.maskDataPool.push(e), this.maskStack.length !== 0) {
        const i = this.maskStack[this.maskStack.length - 1];
        i.type === Pe.SPRITE && i._filters && (i._filters[0].maskSprite = i.maskObject);
      }
    }
  }
  /**
   * Sets type of MaskData based on its maskObject.
   * @param maskData
   */
  detect(t) {
    const e = t.maskObject;
    e ? e.isSprite ? t.type = Pe.SPRITE : this.enableScissor && this.renderer.scissor.testScissor(t) ? t.type = Pe.SCISSOR : t.type = Pe.STENCIL : t.type = Pe.COLOR;
  }
  /**
   * Applies the Mask and adds it to the current filter stack.
   * @param maskData - Sprite to be used as the mask.
   */
  pushSpriteMask(t) {
    const { maskObject: e } = t, i = t._target;
    let s = t._filters;
    s || (s = this.alphaMaskPool[this.alphaMaskIndex], s || (s = this.alphaMaskPool[this.alphaMaskIndex] = [new V_()])), s[0].resolution = t.resolution, s[0].multisample = t.multisample, s[0].maskSprite = e;
    const o = i.filterArea;
    i.filterArea = e.getBounds(!0), this.renderer.filter.push(i, s), i.filterArea = o, t._filters || this.alphaMaskIndex++;
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
Nl.extension = {
  type: Rt.RendererSystem,
  name: "mask"
};
Gt.add(Nl);
class Dl {
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
const Th = new ye(), wh = [], Bl = class Cs extends Dl {
  /**
   * @param {PIXI.Renderer} renderer - The renderer this System works for.
   */
  constructor(t) {
    super(t), this.glConst = Dt.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST;
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
    const e = t._scissorRect, { maskObject: i } = t, { renderer: s } = this, o = s.renderTexture, h = i.getBounds(!0, wh.pop() ?? new ee());
    this.roundFrameToPixels(
      h,
      o.current ? o.current.resolution : s.resolution,
      o.sourceFrame,
      o.destinationFrame,
      s.projection.transform
    ), e && h.fit(e), t._scissorRectLocal = h;
  }
  static isMatrixRotated(t) {
    if (!t)
      return !1;
    const { a: e, b: i, c: s, d: o } = t;
    return (Math.abs(i) > 1e-4 || Math.abs(s) > 1e-4) && (Math.abs(e) > 1e-4 || Math.abs(o) > 1e-4);
  }
  /**
   * Test, whether the object can be scissor mask with current renderer projection.
   * Calls "calcScissorRect()" if its true.
   * @param maskData - mask data
   * @returns whether Whether the object can be scissor mask
   */
  testScissor(t) {
    const { maskObject: e } = t;
    if (!e.isFastRect || !e.isFastRect() || Cs.isMatrixRotated(e.worldTransform) || Cs.isMatrixRotated(this.renderer.projection.transform))
      return !1;
    this.calcScissorRect(t);
    const i = t._scissorRectLocal;
    return i.width > 0 && i.height > 0;
  }
  roundFrameToPixels(t, e, i, s, o) {
    Cs.isMatrixRotated(o) || (o = o ? Th.copyFrom(o) : Th.identity(), o.translate(-i.x, -i.y).scale(
      s.width / i.width,
      s.height / i.height
    ).translate(s.x, s.y), this.renderer.filter.transformAABB(o, t), t.fit(s), t.x = Math.round(t.x * e), t.y = Math.round(t.y * e), t.width = Math.round(t.width * e), t.height = Math.round(t.height * e));
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
    t && wh.push(t._scissorRectLocal), this.getStackLength() > 0 ? this._useCurrent() : e.disable(e.SCISSOR_TEST);
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
Bl.extension = {
  type: Rt.RendererSystem,
  name: "scissor"
};
let X_ = Bl;
Gt.add(X_);
class Ul extends Dl {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(t) {
    super(t), this.glConst = Dt.ADAPTER.getWebGLRenderingContext().STENCIL_TEST;
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
    const o = t._colorMask;
    o !== 0 && (t._colorMask = 0, i.colorMask(!1, !1, !1, !1)), i.stencilFunc(i.EQUAL, s, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.INCR), e.renderable = !0, e.render(this.renderer), this.renderer.batch.flush(), e.renderable = !1, o !== 0 && (t._colorMask = o, i.colorMask(
      (o & 1) !== 0,
      (o & 2) !== 0,
      (o & 4) !== 0,
      (o & 8) !== 0
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
Ul.extension = {
  type: Rt.RendererSystem,
  name: "stencil"
};
Gt.add(Ul);
class kl {
  constructor(t) {
    this.renderer = t, this.plugins = {}, Object.defineProperties(this.plugins, {
      extract: {
        enumerable: !1,
        get() {
          return Nt("7.0.0", "renderer.plugins.extract has moved to renderer.extract"), t.extract;
        }
      },
      prepare: {
        enumerable: !1,
        get() {
          return Nt("7.0.0", "renderer.plugins.prepare has moved to renderer.prepare"), t.prepare;
        }
      },
      interaction: {
        enumerable: !1,
        get() {
          return Nt("7.0.0", "renderer.plugins.interaction has been deprecated, use renderer.events"), t.events;
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
kl.extension = {
  type: [
    Rt.RendererSystem,
    Rt.CanvasRendererSystem
  ],
  name: "_plugin"
};
Gt.add(kl);
class Gl {
  /** @param renderer - The renderer this System works for. */
  constructor(t) {
    this.renderer = t, this.destinationFrame = null, this.sourceFrame = null, this.defaultFrame = null, this.projectionMatrix = new ye(), this.transform = null;
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
    const o = this.renderer;
    o.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix, o.globalUniforms.update(), o.shader.shader && o.shader.syncUniformGroup(o.shader.shader.uniforms.globals);
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
    const o = this.projectionMatrix, h = s ? -1 : 1;
    o.identity(), o.a = 1 / e.width * 2, o.d = h * (1 / e.height * 2), o.tx = -1 - e.x * o.a, o.ty = -h - e.y * o.d;
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
Gl.extension = {
  type: Rt.RendererSystem,
  name: "projection"
};
Gt.add(Gl);
const Y_ = new hn(), Eh = new ee();
class Vl {
  constructor(t) {
    this.renderer = t, this._tempMatrix = new ye();
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
    const { region: i, ...s } = e || {}, o = (i == null ? void 0 : i.copyTo(Eh)) || t.getLocalBounds(Eh, !0), h = s.resolution || this.renderer.resolution;
    o.width = Math.max(o.width, 1 / h), o.height = Math.max(o.height, 1 / h), s.width = o.width, s.height = o.height, s.resolution = h, s.multisample ?? (s.multisample = this.renderer.multisample);
    const l = un.create(s);
    this._tempMatrix.tx = -o.x, this._tempMatrix.ty = -o.y;
    const c = t.transform;
    return t.transform = Y_, this.renderer.render(t, {
      renderTexture: l,
      transform: this._tempMatrix,
      skipUpdateTransform: !!t.parent,
      blit: !0
    }), t.transform = c, l;
  }
  destroy() {
  }
}
Vl.extension = {
  type: [
    Rt.RendererSystem,
    Rt.CanvasRendererSystem
  ],
  name: "textureGenerator"
};
Gt.add(Vl);
const Fr = new ee(), Ni = new ee();
class zl {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(t) {
    this.renderer = t, this.defaultMaskStack = [], this.current = null, this.sourceFrame = new ee(), this.destinationFrame = new ee(), this.viewportFrame = new ee();
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
    let o, h, l;
    t ? (o = t.baseTexture, l = o.resolution, e || (Fr.width = t.frame.width, Fr.height = t.frame.height, e = Fr), i || (Ni.x = t.frame.x, Ni.y = t.frame.y, Ni.width = e.width, Ni.height = e.height, i = Ni), h = o.framebuffer) : (l = s.resolution, e || (Fr.width = s._view.screen.width, Fr.height = s._view.screen.height, e = Fr), i || (i = Fr, i.width = e.width, i.height = e.height));
    const c = this.viewportFrame;
    c.x = i.x * l, c.y = i.y * l, c.width = i.width * l, c.height = i.height * l, t || (c.y = s.view.height - (c.y + c.height)), c.ceil(), this.renderer.framebuffer.bind(h, c), this.renderer.projection.update(i, e, l, !h), t ? this.renderer.mask.setMaskStack(o.maskStack) : this.renderer.mask.setMaskStack(this.defaultMaskStack), this.sourceFrame.copyFrom(e), this.destinationFrame.copyFrom(i);
  }
  /**
   * Erases the render texture and fills the drawing area with a colour.
   * @param clearColor - The color as rgba, default to use the renderer backgroundColor
   * @param [mask=BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH] - Bitwise OR of masks
   *  that indicate the buffers to be cleared, by default COLOR and DEPTH buffers.
   */
  clear(t, e) {
    const i = this.current ? this.current.baseTexture.clear : this.renderer.background.backgroundColor, s = an.shared.setValue(t || i);
    (this.current && this.current.baseTexture.alphaMode > 0 || !this.current && this._rendererPremultipliedAlpha) && s.premultiply(s.alpha);
    const o = this.destinationFrame, h = this.current ? this.current.baseTexture : this.renderer._view.screen, l = o.width !== h.width || o.height !== h.height;
    if (l) {
      let { x: c, y: _, width: g, height: T } = this.viewportFrame;
      c = Math.round(c), _ = Math.round(_), g = Math.round(g), T = Math.round(T), this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST), this.renderer.gl.scissor(c, _, g, T);
    }
    this.renderer.framebuffer.clear(s.red, s.green, s.blue, s.alpha, e), l && this.renderer.scissor.pop();
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
zl.extension = {
  type: Rt.RendererSystem,
  name: "renderTexture"
};
Gt.add(zl);
class W_ {
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
function j_(r, t) {
  const e = {}, i = t.getProgramParameter(r, t.ACTIVE_ATTRIBUTES);
  for (let s = 0; s < i; s++) {
    const o = t.getActiveAttrib(r, s);
    if (o.name.startsWith("gl_"))
      continue;
    const h = Sl(t, o.type), l = {
      type: h,
      name: o.name,
      size: Al(h),
      location: t.getAttribLocation(r, o.name)
    };
    e[o.name] = l;
  }
  return e;
}
function q_(r, t) {
  const e = {}, i = t.getProgramParameter(r, t.ACTIVE_UNIFORMS);
  for (let s = 0; s < i; s++) {
    const o = t.getActiveUniform(r, s), h = o.name.replace(/\[.*?\]$/, ""), l = !!o.name.match(/\[.*?\]$/), c = Sl(t, o.type);
    e[h] = {
      name: h,
      index: s,
      type: c,
      size: o.size,
      isArray: l,
      value: El(c, o.size)
    };
  }
  return e;
}
function H_(r, t) {
  var l;
  const e = ph(r, r.VERTEX_SHADER, t.vertexSrc), i = ph(r, r.FRAGMENT_SHADER, t.fragmentSrc), s = r.createProgram();
  r.attachShader(s, e), r.attachShader(s, i);
  const o = (l = t.extra) == null ? void 0 : l.transformFeedbackVaryings;
  if (o && (typeof r.transformFeedbackVaryings != "function" ? console.warn("TransformFeedback is not supported but TransformFeedbackVaryings are given.") : r.transformFeedbackVaryings(
    s,
    o.names,
    o.bufferMode === "separate" ? r.SEPARATE_ATTRIBS : r.INTERLEAVED_ATTRIBS
  )), r.linkProgram(s), r.getProgramParameter(s, r.LINK_STATUS) || x_(r, s, e, i), t.attributeData = j_(s, r), t.uniformData = q_(s, r), !/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(t.vertexSrc)) {
    const c = Object.keys(t.attributeData);
    c.sort((_, g) => _ > g ? 1 : -1);
    for (let _ = 0; _ < c.length; _++)
      t.attributeData[c[_]].location = _, r.bindAttribLocation(s, _, c[_]);
    r.linkProgram(s);
  }
  r.deleteShader(e), r.deleteShader(i);
  const h = {};
  for (const c in t.uniformData) {
    const _ = t.uniformData[c];
    h[c] = {
      location: r.getUniformLocation(s, c),
      value: El(_.type, _.size)
    };
  }
  return new W_(s, h);
}
function Z_(r, t, e, i, s) {
  e.buffer.update(s);
}
const Q_ = {
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
}, Xl = {
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
function K_(r) {
  const t = r.map((o) => ({
    data: o,
    offset: 0,
    dataLen: 0,
    dirty: 0
  }));
  let e = 0, i = 0, s = 0;
  for (let o = 0; o < t.length; o++) {
    const h = t[o];
    if (e = Xl[h.data.type], h.data.size > 1 && (e = Math.max(e, 16) * h.data.size), h.dataLen = e, i % e !== 0 && i < 16) {
      const l = i % e % 16;
      i += l, s += l;
    }
    i + e > 16 ? (s = Math.ceil(s / 16) * 16, h.offset = s, s += e, i = e) : (h.offset = s, i += e, s += e);
  }
  return s = Math.ceil(s / 16) * 16, { uboElements: t, size: s };
}
function J_(r, t) {
  const e = [];
  for (const i in r)
    t[i] && e.push(t[i]);
  return e.sort((i, s) => i.index - s.index), e;
}
function tp(r, t) {
  if (!r.autoManage)
    return { size: 0, syncFunc: Z_ };
  const e = J_(r.uniforms, t), { uboElements: i, size: s } = K_(e), o = [`
    var v = null;
    var v2 = null;
    var cv = null;
    var t = 0;
    var gl = renderer.gl
    var index = 0;
    var data = buffer.data;
    `];
  for (let h = 0; h < i.length; h++) {
    const l = i[h], c = r.uniforms[l.data.name], _ = l.data.name;
    let g = !1;
    for (let T = 0; T < xi.length; T++) {
      const w = xi[T];
      if (w.codeUbo && w.test(l.data, c)) {
        o.push(
          `offset = ${l.offset / 4};`,
          xi[T].codeUbo(l.data.name, c)
        ), g = !0;
        break;
      }
    }
    if (!g)
      if (l.data.size > 1) {
        const T = Al(l.data.type), w = Math.max(Xl[l.data.type] / 16, 1), S = T / w, R = (4 - S % 4) % 4;
        o.push(`
                cv = ud.${_}.value;
                v = uv.${_};
                offset = ${l.offset / 4};

                t = 0;

                for(var i=0; i < ${l.data.size * w}; i++)
                {
                    for(var j = 0; j < ${S}; j++)
                    {
                        data[offset++] = v[t++];
                    }
                    offset += ${R};
                }

                `);
      } else {
        const T = Q_[l.data.type];
        o.push(`
                cv = ud.${_}.value;
                v = uv.${_};
                offset = ${l.offset / 4};
                ${T};
                `);
      }
  }
  return o.push(`
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
      o.join(`
`)
    )
  };
}
let ep = 0;
const Es = { textureCount: 0, uboCount: 0 };
class Yl {
  /** @param renderer - The renderer this System works for. */
  constructor(t) {
    this.destroyed = !1, this.renderer = t, this.systemCheck(), this.gl = null, this.shader = null, this.program = null, this.cache = {}, this._uboCache = {}, this.id = ep++;
  }
  /**
   * Overrideable function by `@pixi/unsafe-eval` to silence
   * throwing an error if platform doesn't support unsafe-evals.
   * @private
   */
  systemCheck() {
    if (!w_())
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
    return this.shader = t, this.program !== i && (this.program = i, this.gl.useProgram(s.program)), e || (Es.textureCount = 0, Es.uboCount = 0, this.syncUniformGroup(t.uniformGroup, Es)), s;
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
    return this.cache[e] || (this.cache[e] = y_(t, this.shader.program.uniformData)), t.syncUniforms[this.shader.program.id] = this.cache[e], t.syncUniforms[this.shader.program.id];
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
        Es,
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
    const o = this.gl.getUniformBlockIndex(e.program, i);
    e.uniformBufferBindings[i] = this.shader.uniformBindCount, s.uniformBlockBinding(e.program, o, this.shader.uniformBindCount), this.shader.uniformBindCount++;
    const h = this.getSignature(t, this.shader.program.uniformData, "ubo");
    let l = this._uboCache[h];
    if (l || (l = this._uboCache[h] = tp(t, this.shader.program.uniformData)), t.autoManage) {
      const c = new Float32Array(l.size / 4);
      t.buffer.update(c);
    }
    return e.uniformGroups[t.id] = l.syncFunc, e.uniformGroups[t.id];
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
    const s = t.uniforms, o = [`${i}-`];
    for (const h in s)
      o.push(h), e[h] && o.push(e[h].type);
    return o.join("-");
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
    const e = this.gl, i = t.program, s = H_(e, i);
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
Yl.extension = {
  type: Rt.RendererSystem,
  name: "shader"
};
Gt.add(Yl);
class Zs {
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
Zs.defaultOptions = {
  /**
   * {@link PIXI.IRendererOptions.hello}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  hello: !1
}, /** @ignore */
Zs.extension = {
  type: [
    Rt.RendererSystem,
    Rt.CanvasRendererSystem
  ],
  name: "startup"
};
Gt.add(Zs);
function rp(r, t = []) {
  return t[xt.NORMAL] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[xt.ADD] = [r.ONE, r.ONE], t[xt.MULTIPLY] = [r.DST_COLOR, r.ONE_MINUS_SRC_ALPHA, r.ONE, r.ONE_MINUS_SRC_ALPHA], t[xt.SCREEN] = [r.ONE, r.ONE_MINUS_SRC_COLOR, r.ONE, r.ONE_MINUS_SRC_ALPHA], t[xt.OVERLAY] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[xt.DARKEN] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[xt.LIGHTEN] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[xt.COLOR_DODGE] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[xt.COLOR_BURN] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[xt.HARD_LIGHT] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[xt.SOFT_LIGHT] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[xt.DIFFERENCE] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[xt.EXCLUSION] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[xt.HUE] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[xt.SATURATION] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[xt.COLOR] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[xt.LUMINOSITY] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], t[xt.NONE] = [0, 0], t[xt.NORMAL_NPM] = [r.SRC_ALPHA, r.ONE_MINUS_SRC_ALPHA, r.ONE, r.ONE_MINUS_SRC_ALPHA], t[xt.ADD_NPM] = [r.SRC_ALPHA, r.ONE, r.ONE, r.ONE], t[xt.SCREEN_NPM] = [r.SRC_ALPHA, r.ONE_MINUS_SRC_COLOR, r.ONE, r.ONE_MINUS_SRC_ALPHA], t[xt.SRC_IN] = [r.DST_ALPHA, r.ZERO], t[xt.SRC_OUT] = [r.ONE_MINUS_DST_ALPHA, r.ZERO], t[xt.SRC_ATOP] = [r.DST_ALPHA, r.ONE_MINUS_SRC_ALPHA], t[xt.DST_OVER] = [r.ONE_MINUS_DST_ALPHA, r.ONE], t[xt.DST_IN] = [r.ZERO, r.SRC_ALPHA], t[xt.DST_OUT] = [r.ZERO, r.ONE_MINUS_SRC_ALPHA], t[xt.DST_ATOP] = [r.ONE_MINUS_DST_ALPHA, r.SRC_ALPHA], t[xt.XOR] = [r.ONE_MINUS_DST_ALPHA, r.ONE_MINUS_SRC_ALPHA], t[xt.SUBTRACT] = [r.ONE, r.ONE, r.ONE, r.ONE, r.FUNC_REVERSE_SUBTRACT, r.FUNC_ADD], t;
}
const ip = 0, sp = 1, np = 2, op = 3, ap = 4, hp = 5, Wl = class To {
  constructor() {
    this.gl = null, this.stateId = 0, this.polygonOffset = 0, this.blendMode = xt.NONE, this._blendEq = !1, this.map = [], this.map[ip] = this.setBlend, this.map[sp] = this.setOffset, this.map[np] = this.setCullFace, this.map[op] = this.setDepthTest, this.map[ap] = this.setFrontFace, this.map[hp] = this.setDepthMask, this.checks = [], this.defaultState = new Ii(), this.defaultState.blend = !0;
  }
  contextChange(t) {
    this.gl = t, this.blendModes = rp(t), this.set(this.defaultState), this.reset();
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
    this.updateCheck(To.checkBlendMode, t), this.gl[t ? "enable" : "disable"](this.gl.BLEND);
  }
  /**
   * Sets whether to enable or disable polygon offset fill.
   * @param value - Turn on or off webgl polygon offset testing.
   */
  setOffset(t) {
    this.updateCheck(To.checkPolygonOffset, t), this.gl[t ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL);
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
Wl.extension = {
  type: Rt.RendererSystem,
  name: "state"
};
let lp = Wl;
Gt.add(lp);
class up extends Jr {
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
      this.runners[e] = new er(e);
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
      const o = i.find((h) => this._systemsHash[h] === s);
      s[t.name](e[o]);
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
const Gi = class Is {
  /** @param renderer - The renderer this System works for. */
  constructor(t) {
    this.renderer = t, this.count = 0, this.checkCount = 0, this.maxIdle = Is.defaultMaxIdle, this.checkCountMax = Is.defaultCheckCountMax, this.mode = Is.defaultMode;
  }
  /**
   * Checks to see when the last time a texture was used.
   * If the texture has not been used for a specified amount of time, it will be removed from the GPU.
   */
  postrender() {
    this.renderer.objectRenderer.renderingToScreen && (this.count++, this.mode !== Fo.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run())));
  }
  /**
   * Checks to see when the last time a texture was used.
   * If the texture has not been used for a specified amount of time, it will be removed from the GPU.
   */
  run() {
    const t = this.renderer.texture, e = t.managedTextures;
    let i = !1;
    for (let s = 0; s < e.length; s++) {
      const o = e[s];
      o.resource && this.count - o.touched > this.maxIdle && (t.destroyTexture(o, !0), e[s] = null, i = !0);
    }
    if (i) {
      let s = 0;
      for (let o = 0; o < e.length; o++)
        e[o] !== null && (e[s++] = e[o]);
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
Gi.defaultMode = Fo.AUTO, /**
* Default maximum idle frames before a texture is destroyed by garbage collection.
* @static
* @default 3600
* @see PIXI.TextureGCSystem#maxIdle
*/
Gi.defaultMaxIdle = 60 * 60, /**
* Default frames between two garbage collections.
* @static
* @default 600
* @see PIXI.TextureGCSystem#checkCountMax
*/
Gi.defaultCheckCountMax = 60 * 10, /** @ignore */
Gi.extension = {
  type: Rt.RendererSystem,
  name: "textureGC"
};
let Vr = Gi;
Gt.add(Vr);
class Yn {
  constructor(t) {
    this.texture = t, this.width = -1, this.height = -1, this.dirtyId = -1, this.dirtyStyleId = -1, this.mipmap = !1, this.wrapMode = 33071, this.type = Pt.UNSIGNED_BYTE, this.internalFormat = Z.RGBA, this.samplerType = 0;
  }
}
function cp(r) {
  let t;
  return "WebGL2RenderingContext" in globalThis && r instanceof globalThis.WebGL2RenderingContext ? t = {
    [r.RGB]: rt.FLOAT,
    [r.RGBA]: rt.FLOAT,
    [r.ALPHA]: rt.FLOAT,
    [r.LUMINANCE]: rt.FLOAT,
    [r.LUMINANCE_ALPHA]: rt.FLOAT,
    [r.R8]: rt.FLOAT,
    [r.R8_SNORM]: rt.FLOAT,
    [r.RG8]: rt.FLOAT,
    [r.RG8_SNORM]: rt.FLOAT,
    [r.RGB8]: rt.FLOAT,
    [r.RGB8_SNORM]: rt.FLOAT,
    [r.RGB565]: rt.FLOAT,
    [r.RGBA4]: rt.FLOAT,
    [r.RGB5_A1]: rt.FLOAT,
    [r.RGBA8]: rt.FLOAT,
    [r.RGBA8_SNORM]: rt.FLOAT,
    [r.RGB10_A2]: rt.FLOAT,
    [r.RGB10_A2UI]: rt.FLOAT,
    [r.SRGB8]: rt.FLOAT,
    [r.SRGB8_ALPHA8]: rt.FLOAT,
    [r.R16F]: rt.FLOAT,
    [r.RG16F]: rt.FLOAT,
    [r.RGB16F]: rt.FLOAT,
    [r.RGBA16F]: rt.FLOAT,
    [r.R32F]: rt.FLOAT,
    [r.RG32F]: rt.FLOAT,
    [r.RGB32F]: rt.FLOAT,
    [r.RGBA32F]: rt.FLOAT,
    [r.R11F_G11F_B10F]: rt.FLOAT,
    [r.RGB9_E5]: rt.FLOAT,
    [r.R8I]: rt.INT,
    [r.R8UI]: rt.UINT,
    [r.R16I]: rt.INT,
    [r.R16UI]: rt.UINT,
    [r.R32I]: rt.INT,
    [r.R32UI]: rt.UINT,
    [r.RG8I]: rt.INT,
    [r.RG8UI]: rt.UINT,
    [r.RG16I]: rt.INT,
    [r.RG16UI]: rt.UINT,
    [r.RG32I]: rt.INT,
    [r.RG32UI]: rt.UINT,
    [r.RGB8I]: rt.INT,
    [r.RGB8UI]: rt.UINT,
    [r.RGB16I]: rt.INT,
    [r.RGB16UI]: rt.UINT,
    [r.RGB32I]: rt.INT,
    [r.RGB32UI]: rt.UINT,
    [r.RGBA8I]: rt.INT,
    [r.RGBA8UI]: rt.UINT,
    [r.RGBA16I]: rt.INT,
    [r.RGBA16UI]: rt.UINT,
    [r.RGBA32I]: rt.INT,
    [r.RGBA32UI]: rt.UINT,
    [r.DEPTH_COMPONENT16]: rt.FLOAT,
    [r.DEPTH_COMPONENT24]: rt.FLOAT,
    [r.DEPTH_COMPONENT32F]: rt.FLOAT,
    [r.DEPTH_STENCIL]: rt.FLOAT,
    [r.DEPTH24_STENCIL8]: rt.FLOAT,
    [r.DEPTH32F_STENCIL8]: rt.FLOAT
  } : t = {
    [r.RGB]: rt.FLOAT,
    [r.RGBA]: rt.FLOAT,
    [r.ALPHA]: rt.FLOAT,
    [r.LUMINANCE]: rt.FLOAT,
    [r.LUMINANCE_ALPHA]: rt.FLOAT,
    [r.DEPTH_STENCIL]: rt.FLOAT
  }, t;
}
function fp(r) {
  let t;
  return "WebGL2RenderingContext" in globalThis && r instanceof globalThis.WebGL2RenderingContext ? t = {
    [Pt.UNSIGNED_BYTE]: {
      [Z.RGBA]: r.RGBA8,
      [Z.RGB]: r.RGB8,
      [Z.RG]: r.RG8,
      [Z.RED]: r.R8,
      [Z.RGBA_INTEGER]: r.RGBA8UI,
      [Z.RGB_INTEGER]: r.RGB8UI,
      [Z.RG_INTEGER]: r.RG8UI,
      [Z.RED_INTEGER]: r.R8UI,
      [Z.ALPHA]: r.ALPHA,
      [Z.LUMINANCE]: r.LUMINANCE,
      [Z.LUMINANCE_ALPHA]: r.LUMINANCE_ALPHA
    },
    [Pt.BYTE]: {
      [Z.RGBA]: r.RGBA8_SNORM,
      [Z.RGB]: r.RGB8_SNORM,
      [Z.RG]: r.RG8_SNORM,
      [Z.RED]: r.R8_SNORM,
      [Z.RGBA_INTEGER]: r.RGBA8I,
      [Z.RGB_INTEGER]: r.RGB8I,
      [Z.RG_INTEGER]: r.RG8I,
      [Z.RED_INTEGER]: r.R8I
    },
    [Pt.UNSIGNED_SHORT]: {
      [Z.RGBA_INTEGER]: r.RGBA16UI,
      [Z.RGB_INTEGER]: r.RGB16UI,
      [Z.RG_INTEGER]: r.RG16UI,
      [Z.RED_INTEGER]: r.R16UI,
      [Z.DEPTH_COMPONENT]: r.DEPTH_COMPONENT16
    },
    [Pt.SHORT]: {
      [Z.RGBA_INTEGER]: r.RGBA16I,
      [Z.RGB_INTEGER]: r.RGB16I,
      [Z.RG_INTEGER]: r.RG16I,
      [Z.RED_INTEGER]: r.R16I
    },
    [Pt.UNSIGNED_INT]: {
      [Z.RGBA_INTEGER]: r.RGBA32UI,
      [Z.RGB_INTEGER]: r.RGB32UI,
      [Z.RG_INTEGER]: r.RG32UI,
      [Z.RED_INTEGER]: r.R32UI,
      [Z.DEPTH_COMPONENT]: r.DEPTH_COMPONENT24
    },
    [Pt.INT]: {
      [Z.RGBA_INTEGER]: r.RGBA32I,
      [Z.RGB_INTEGER]: r.RGB32I,
      [Z.RG_INTEGER]: r.RG32I,
      [Z.RED_INTEGER]: r.R32I
    },
    [Pt.FLOAT]: {
      [Z.RGBA]: r.RGBA32F,
      [Z.RGB]: r.RGB32F,
      [Z.RG]: r.RG32F,
      [Z.RED]: r.R32F,
      [Z.DEPTH_COMPONENT]: r.DEPTH_COMPONENT32F
    },
    [Pt.HALF_FLOAT]: {
      [Z.RGBA]: r.RGBA16F,
      [Z.RGB]: r.RGB16F,
      [Z.RG]: r.RG16F,
      [Z.RED]: r.R16F
    },
    [Pt.UNSIGNED_SHORT_5_6_5]: {
      [Z.RGB]: r.RGB565
    },
    [Pt.UNSIGNED_SHORT_4_4_4_4]: {
      [Z.RGBA]: r.RGBA4
    },
    [Pt.UNSIGNED_SHORT_5_5_5_1]: {
      [Z.RGBA]: r.RGB5_A1
    },
    [Pt.UNSIGNED_INT_2_10_10_10_REV]: {
      [Z.RGBA]: r.RGB10_A2,
      [Z.RGBA_INTEGER]: r.RGB10_A2UI
    },
    [Pt.UNSIGNED_INT_10F_11F_11F_REV]: {
      [Z.RGB]: r.R11F_G11F_B10F
    },
    [Pt.UNSIGNED_INT_5_9_9_9_REV]: {
      [Z.RGB]: r.RGB9_E5
    },
    [Pt.UNSIGNED_INT_24_8]: {
      [Z.DEPTH_STENCIL]: r.DEPTH24_STENCIL8
    },
    [Pt.FLOAT_32_UNSIGNED_INT_24_8_REV]: {
      [Z.DEPTH_STENCIL]: r.DEPTH32F_STENCIL8
    }
  } : t = {
    [Pt.UNSIGNED_BYTE]: {
      [Z.RGBA]: r.RGBA,
      [Z.RGB]: r.RGB,
      [Z.ALPHA]: r.ALPHA,
      [Z.LUMINANCE]: r.LUMINANCE,
      [Z.LUMINANCE_ALPHA]: r.LUMINANCE_ALPHA
    },
    [Pt.UNSIGNED_SHORT_5_6_5]: {
      [Z.RGB]: r.RGB
    },
    [Pt.UNSIGNED_SHORT_4_4_4_4]: {
      [Z.RGBA]: r.RGBA
    },
    [Pt.UNSIGNED_SHORT_5_5_5_1]: {
      [Z.RGBA]: r.RGBA
    }
  }, t;
}
class jl {
  /**
   * @param renderer - The renderer this system works for.
   */
  constructor(t) {
    this.renderer = t, this.boundTextures = [], this.currentLocation = -1, this.managedTextures = [], this._unknownBoundTextures = !1, this.unknownTexture = new Qt(), this.hasIntegerTextures = !1;
  }
  /** Sets up the renderer context and necessary buffers. */
  contextChange() {
    const t = this.gl = this.renderer.gl;
    this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.webGLVersion = this.renderer.context.webGLVersion, this.internalFormats = fp(t), this.samplerTypes = cp(t);
    const e = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);
    this.boundTextures.length = e;
    for (let s = 0; s < e; s++)
      this.boundTextures[s] = null;
    this.emptyTextures = {};
    const i = new Yn(t.createTexture());
    t.bindTexture(t.TEXTURE_2D, i.texture), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array(4)), this.emptyTextures[t.TEXTURE_2D] = i, this.emptyTextures[t.TEXTURE_CUBE_MAP] = new Yn(t.createTexture()), t.bindTexture(t.TEXTURE_CUBE_MAP, this.emptyTextures[t.TEXTURE_CUBE_MAP].texture);
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
      for (let o = t - 1; o >= 0; --o) {
        const h = e[o];
        h && h._glTextures[s].samplerType !== rt.FLOAT && this.renderer.texture.unbind(h);
      }
  }
  /**
   * Initialize a texture
   * @private
   * @param texture - Texture to initialize
   */
  initTexture(t) {
    const e = new Yn(this.gl.createTexture());
    return e.dirtyId = -1, t._glTextures[this.CONTEXT_UID] = e, this.managedTextures.push(t), t.on("dispose", this.destroyTexture, this), e;
  }
  initTextureType(t, e) {
    var i;
    e.internalFormat = ((i = this.internalFormats[t.type]) == null ? void 0 : i[t.format]) ?? t.format, e.samplerType = this.samplerTypes[e.internalFormat] ?? rt.FLOAT, this.webGLVersion === 2 && t.type === Pt.HALF_FLOAT ? e.type = this.gl.HALF_FLOAT : e.type = t.type;
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
      e.samplerType !== rt.FLOAT && (this.hasIntegerTextures = !0);
    else {
      const o = t.realWidth, h = t.realHeight, l = i.gl;
      (e.width !== o || e.height !== h || e.dirtyId < 0) && (e.width = o, e.height = h, l.texImage2D(
        t.target,
        0,
        e.internalFormat,
        o,
        h,
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
      s !== -1 && Rs(this.managedTextures, s, 1);
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
    e && ((t.mipmap === Hr.POW2 || this.webGLVersion !== 2) && !t.isPowerOfTwo ? e.mipmap = !1 : e.mipmap = t.mipmap >= 1, this.webGLVersion !== 2 && !t.isPowerOfTwo ? e.wrapMode = Lo.CLAMP : e.wrapMode = t.wrapMode, (i = t.resource) != null && i.style(this.renderer, t, e) || this.setStyle(t, e), e.dirtyStyleId = t.dirtyStyleId);
  }
  /**
   * Set style for texture
   * @private
   * @param texture - Texture to update
   * @param glTexture
   */
  setStyle(t, e) {
    const i = this.gl;
    if (e.mipmap && t.mipmap !== Hr.ON_MANUAL && i.generateMipmap(t.target), i.texParameteri(t.target, i.TEXTURE_WRAP_S, e.wrapMode), i.texParameteri(t.target, i.TEXTURE_WRAP_T, e.wrapMode), e.mipmap) {
      i.texParameteri(t.target, i.TEXTURE_MIN_FILTER, t.scaleMode === vr.LINEAR ? i.LINEAR_MIPMAP_LINEAR : i.NEAREST_MIPMAP_NEAREST);
      const s = this.renderer.context.extensions.anisotropicFiltering;
      if (s && t.anisotropicLevel > 0 && t.scaleMode === vr.LINEAR) {
        const o = Math.min(t.anisotropicLevel, i.getParameter(s.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
        i.texParameterf(t.target, s.TEXTURE_MAX_ANISOTROPY_EXT, o);
      }
    } else
      i.texParameteri(t.target, i.TEXTURE_MIN_FILTER, t.scaleMode === vr.LINEAR ? i.LINEAR : i.NEAREST);
    i.texParameteri(t.target, i.TEXTURE_MAG_FILTER, t.scaleMode === vr.LINEAR ? i.LINEAR : i.NEAREST);
  }
  destroy() {
    this.renderer = null;
  }
}
jl.extension = {
  type: Rt.RendererSystem,
  name: "texture"
};
Gt.add(jl);
class ql {
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
    const { gl: e, renderer: i, CONTEXT_UID: s } = this, o = e.createTransformFeedback();
    t._glTransformFeedbacks[s] = o, e.bindTransformFeedback(e.TRANSFORM_FEEDBACK, o);
    for (let h = 0; h < t.buffers.length; h++) {
      const l = t.buffers[h];
      l && (i.buffer.update(l), l._glBuffers[s].refCount++, e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER, h, l._glBuffers[s].buffer || null));
    }
    return e.bindTransformFeedback(e.TRANSFORM_FEEDBACK, null), t.disposeRunner.add(this), o;
  }
  /**
   * Disposes TransfromFeedback
   * @param {PIXI.TransformFeedback} tf - TransformFeedback
   * @param {boolean} [contextLost=false] - If context was lost, we suppress delete TransformFeedback
   */
  disposeTransformFeedback(t, e) {
    const i = t._glTransformFeedbacks[this.CONTEXT_UID], s = this.gl;
    t.disposeRunner.remove(this);
    const o = this.renderer.buffer;
    if (o)
      for (let h = 0; h < t.buffers.length; h++) {
        const l = t.buffers[h];
        if (!l)
          continue;
        const c = l._glBuffers[this.CONTEXT_UID];
        c && (c.refCount--, c.refCount === 0 && !e && o.dispose(l, e));
      }
    i && (e || s.deleteTransformFeedback(i), delete t._glTransformFeedbacks[this.CONTEXT_UID]);
  }
  destroy() {
    this.renderer = null;
  }
}
ql.extension = {
  type: Rt.RendererSystem,
  name: "transformFeedback"
};
Gt.add(ql);
class Qs {
  constructor(t) {
    this.renderer = t;
  }
  /**
   * initiates the view system
   * @param {PIXI.ViewOptions} options - the options for the view
   */
  init(t) {
    this.screen = new ee(0, 0, t.width, t.height), this.element = t.view || Dt.ADAPTER.createCanvas(), this.resolution = t.resolution || Dt.RESOLUTION, this.autoDensity = !!t.autoDensity;
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
Qs.defaultOptions = {
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
Qs.extension = {
  type: [
    Rt.RendererSystem,
    Rt.CanvasRendererSystem
  ],
  name: "_view"
};
Gt.add(Qs);
Dt.PREFER_ENV = Qr.WEBGL2;
Dt.STRICT_TEXTURE_CACHE = !1;
Dt.RENDER_OPTIONS = {
  ...Hs.defaultOptions,
  ...qs.defaultOptions,
  ...Qs.defaultOptions,
  ...Zs.defaultOptions
};
Object.defineProperties(Dt, {
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
      return Qt.defaultOptions.wrapMode;
    },
    set(r) {
      Nt("7.1.0", "settings.WRAP_MODE is deprecated, use BaseTexture.defaultOptions.wrapMode"), Qt.defaultOptions.wrapMode = r;
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
      return Qt.defaultOptions.scaleMode;
    },
    set(r) {
      Nt("7.1.0", "settings.SCALE_MODE is deprecated, use BaseTexture.defaultOptions.scaleMode"), Qt.defaultOptions.scaleMode = r;
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
      return Qt.defaultOptions.mipmap;
    },
    set(r) {
      Nt("7.1.0", "settings.MIPMAP_TEXTURES is deprecated, use BaseTexture.defaultOptions.mipmap"), Qt.defaultOptions.mipmap = r;
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
      return Qt.defaultOptions.anisotropicLevel;
    },
    set(r) {
      Nt(
        "7.1.0",
        "settings.ANISOTROPIC_LEVEL is deprecated, use BaseTexture.defaultOptions.anisotropicLevel"
      ), Qt.defaultOptions.anisotropicLevel = r;
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
      return Nt("7.1.0", "settings.FILTER_RESOLUTION is deprecated, use Filter.defaultResolution"), mi.defaultResolution;
    },
    set(r) {
      mi.defaultResolution = r;
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
      return Nt("7.1.0", "settings.FILTER_MULTISAMPLE is deprecated, use Filter.defaultMultisample"), mi.defaultMultisample;
    },
    set(r) {
      mi.defaultMultisample = r;
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
      return Gr.defaultMaxTextures;
    },
    set(r) {
      Nt("7.1.0", "settings.SPRITE_MAX_TEXTURES is deprecated, use BatchRenderer.defaultMaxTextures"), Gr.defaultMaxTextures = r;
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
      return Gr.defaultBatchSize;
    },
    set(r) {
      Nt("7.1.0", "settings.SPRITE_BATCH_SIZE is deprecated, use BatchRenderer.defaultBatchSize"), Gr.defaultBatchSize = r;
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
      return Gr.canUploadSameBuffer;
    },
    set(r) {
      Nt("7.1.0", "settings.CAN_UPLOAD_SAME_BUFFER is deprecated, use BatchRenderer.canUploadSameBuffer"), Gr.canUploadSameBuffer = r;
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
      return Vr.defaultMode;
    },
    set(r) {
      Nt("7.1.0", "settings.GC_MODE is deprecated, use TextureGCSystem.defaultMode"), Vr.defaultMode = r;
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
      return Vr.defaultMaxIdle;
    },
    set(r) {
      Nt("7.1.0", "settings.GC_MAX_IDLE is deprecated, use TextureGCSystem.defaultMaxIdle"), Vr.defaultMaxIdle = r;
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
      return Vr.defaultCheckCountMax;
    },
    set(r) {
      Nt("7.1.0", "settings.GC_MAX_CHECK_COUNT is deprecated, use TextureGCSystem.defaultCheckCountMax"), Vr.defaultCheckCountMax = r;
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
      return Yr.defaultVertexPrecision;
    },
    set(r) {
      Nt("7.1.0", "settings.PRECISION_VERTEX is deprecated, use Program.defaultVertexPrecision"), Yr.defaultVertexPrecision = r;
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
      return Yr.defaultFragmentPrecision;
    },
    set(r) {
      Nt("7.1.0", "settings.PRECISION_FRAGMENT is deprecated, use Program.defaultFragmentPrecision"), Yr.defaultFragmentPrecision = r;
    }
  }
});
var Ks = /* @__PURE__ */ ((r) => (r[r.INTERACTION = 50] = "INTERACTION", r[r.HIGH = 25] = "HIGH", r[r.NORMAL = 0] = "NORMAL", r[r.LOW = -25] = "LOW", r[r.UTILITY = -50] = "UTILITY", r))(Ks || {});
class Wn {
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
const Hl = class Ve {
  constructor() {
    this.autoStart = !1, this.deltaTime = 1, this.lastTime = -1, this.speed = 1, this.started = !1, this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this._protected = !1, this._lastFrame = -1, this._head = new Wn(null, null, 1 / 0), this.deltaMS = 1 / Ve.targetFPMS, this.elapsedMS = 1 / Ve.targetFPMS, this._tick = (t) => {
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
  add(t, e, i = Ks.NORMAL) {
    return this._addListener(new Wn(t, e, i));
  }
  /**
   * Add a handler for the tick event which is only execute once.
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @param {number} [priority=PIXI.UPDATE_PRIORITY.NORMAL] - The priority for emitting
   * @returns This instance of a ticker
   */
  addOnce(t, e, i = Ks.NORMAL) {
    return this._addListener(new Wn(t, e, i, !0));
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
        const o = t - this._lastFrame | 0;
        if (o < this._minElapsedMS)
          return;
        this._lastFrame = t - o % this._minElapsedMS;
      }
      this.deltaMS = e, this.deltaTime = this.deltaMS * Ve.targetFPMS;
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
    const e = Math.min(this.maxFPS, t), i = Math.min(Math.max(0, e) / 1e3, Ve.targetFPMS);
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
    if (!Ve._shared) {
      const t = Ve._shared = new Ve();
      t.autoStart = !0, t._protected = !0;
    }
    return Ve._shared;
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
    if (!Ve._system) {
      const t = Ve._system = new Ve();
      t.autoStart = !0, t._protected = !0;
    }
    return Ve._system;
  }
};
Hl.targetFPMS = 0.06;
let yr = Hl;
Object.defineProperties(Dt, {
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
      return yr.targetFPMS;
    },
    set(r) {
      Nt("7.1.0", "settings.TARGET_FPMS is deprecated, use Ticker.targetFPMS"), yr.targetFPMS = r;
    }
  }
});
class Zl {
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
          this._ticker && this._ticker.remove(this.render, this), this._ticker = e, e && e.add(this.render, this, Ks.LOW);
        },
        get() {
          return this._ticker;
        }
      }
    ), this.stop = () => {
      this._ticker.stop();
    }, this.start = () => {
      this._ticker.start();
    }, this._ticker = null, this.ticker = t.sharedTicker ? yr.shared : new yr(), t.autoStart && this.start();
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
Zl.extension = Rt.Application;
Gt.add(Zl);
const Ql = [];
Gt.handleByList(Rt.Renderer, Ql);
function dp(r) {
  for (const t of Ql)
    if (t.test(r))
      return new t(r);
  throw new Error("Unable to auto-detect a suitable renderer.");
}
class Kl {
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
    e >= be.HIGH ? this.multisample = be.HIGH : e >= be.MEDIUM ? this.multisample = be.MEDIUM : e >= be.LOW ? this.multisample = be.LOW : this.multisample = be.NONE;
  }
  destroy() {
  }
}
Kl.extension = {
  type: Rt.RendererSystem,
  name: "_multisample"
};
Gt.add(Kl);
class _p {
  constructor(t) {
    this.buffer = t || null, this.updateID = -1, this.byteLength = -1, this.refCount = 0;
  }
}
class Jl {
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
      const o = t._glBuffers[s] || this.createGLBuffer(t);
      this.boundBufferBases[e] = t, i.bindBufferBase(i.UNIFORM_BUFFER, e, o.buffer);
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
    const { gl: s, CONTEXT_UID: o } = this;
    i = i || 0;
    const h = t._glBuffers[o] || this.createGLBuffer(t);
    s.bindBufferRange(s.UNIFORM_BUFFER, e || 0, h.buffer, i * 256, 256);
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
        const o = t.static ? e.STATIC_DRAW : e.DYNAMIC_DRAW;
        s.byteLength = t.data.byteLength, e.bufferData(t.type, t.data, o);
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
    return t._glBuffers[e] = new _p(i.createBuffer()), this.managedBuffers[t.id] = t, t.disposeRunner.add(this), t._glBuffers[e];
  }
}
Jl.extension = {
  type: Rt.RendererSystem,
  name: "buffer"
};
Gt.add(Jl);
class tu {
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
    let s, o, h, l;
    if (e && (s = e.renderTexture, o = e.clear, h = e.transform, l = e.skipUpdateTransform), this.renderingToScreen = !s, i.runners.prerender.emit(), i.emit("prerender"), i.projection.transform = h, !i.context.isLost) {
      if (s || (this.lastObjectRendered = t), !l) {
        const c = t.enableTempParent();
        t.updateTransform(), t.disableTempParent(c);
      }
      i.renderTexture.bind(s), i.batch.currentRenderer.start(), (o ?? i.background.clearBeforeRender) && i.renderTexture.clear(), t.render(i), i.batch.currentRenderer.flush(), s && (e.blit && i.framebuffer.blit(), s.baseTexture.update()), i.runners.postrender.emit(), i.projection.transform = null, i.emit("postrender");
    }
  }
  destroy() {
    this.renderer = null, this.lastObjectRendered = null;
  }
}
tu.extension = {
  type: Rt.RendererSystem,
  name: "objectRenderer"
};
Gt.add(tu);
const Ls = class wo extends up {
  /**
   * @param {PIXI.IRendererOptions} [options] - See {@link PIXI.settings.RENDER_OPTIONS} for defaults.
   */
  constructor(t) {
    super(), this.type = Xh.WEBGL, t = Object.assign({}, Dt.RENDER_OPTIONS, t), this.gl = null, this.CONTEXT_UID = 0, this.globalUniforms = new dr({
      projectionMatrix: new ye()
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
      systems: wo.__systems,
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
    this.setup(e), "useContextAlpha" in t && (Nt("7.0.0", "options.useContextAlpha is deprecated, use options.premultipliedAlpha and options.backgroundAlpha instead"), t.premultipliedAlpha = t.useContextAlpha && t.useContextAlpha !== "notMultiplied", t.backgroundAlpha = t.useContextAlpha === !1 ? 1 : t.backgroundAlpha), this._plugin.rendererPlugins = wo.__plugins, this.options = t, this.startup.run(this.options);
  }
  /**
   * Create renderer if WebGL is available. Overrideable
   * by the **@pixi/canvas-renderer** package to allow fallback.
   * throws error if WebGL is not available.
   * @param options
   * @private
   */
  static test(t) {
    return t != null && t.forceCanvas ? !1 : Bd();
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
    return Nt("7.0.0", "renderer.clearBeforeRender has been deprecated, please use renderer.background.clearBeforeRender instead."), this.background.clearBeforeRender;
  }
  /**
   * Pass-thru setting for the canvas' context `alpha` property. This is typically
   * not something you need to fiddle with. If you want transparency, use `backgroundAlpha`.
   * @deprecated since 7.0.0
   * @member {boolean}
   */
  get useContextAlpha() {
    return Nt("7.0.0", "renderer.useContextAlpha has been deprecated, please use renderer.context.premultipliedAlpha instead."), this.context.useContextAlpha;
  }
  /**
   * readonly drawing buffer preservation
   * we can only know this if Pixi created the context
   * @deprecated since 7.0.0
   */
  get preserveDrawingBuffer() {
    return Nt("7.0.0", "renderer.preserveDrawingBuffer has been deprecated, we cannot truly know this unless pixi created the context"), this.context.preserveDrawingBuffer;
  }
  /**
   * The background color to fill if not transparent
   * @member {number}
   * @deprecated since 7.0.0
   */
  get backgroundColor() {
    return Nt("7.0.0", "renderer.backgroundColor has been deprecated, use renderer.background.color instead."), this.background.color;
  }
  set backgroundColor(t) {
    Nt("7.0.0", "renderer.backgroundColor has been deprecated, use renderer.background.color instead."), this.background.color = t;
  }
  /**
   * The background color alpha. Setting this to 0 will make the canvas transparent.
   * @member {number}
   * @deprecated since 7.0.0
   */
  get backgroundAlpha() {
    return Nt("7.0.0", "renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead."), this.background.alpha;
  }
  /**
   * @deprecated since 7.0.0
   */
  set backgroundAlpha(t) {
    Nt("7.0.0", "renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead."), this.background.alpha = t;
  }
  /**
   * @deprecated since 7.0.0
   */
  get powerPreference() {
    return Nt("7.0.0", "renderer.powerPreference has been deprecated, we can only know this if pixi creates the context"), this.context.powerPreference;
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
Ls.extension = {
  type: Rt.Renderer,
  priority: 1
}, /**
* Collection of installed plugins. These are included by default in PIXI, but can be excluded
* by creating a custom build. Consult the README for more information about creating custom
* builds and excluding plugins.
* @private
*/
Ls.__plugins = {}, /**
* The collection of installed systems.
* @private
*/
Ls.__systems = {};
let zo = Ls;
Gt.handleByMap(Rt.RendererPlugin, zo.__plugins);
Gt.handleByMap(Rt.RendererSystem, zo.__systems);
Gt.add(zo);
class eu extends ts {
  /**
   * @param length
   * @param options - Options to for Resource constructor
   * @param {number} [options.width] - Width of the resource
   * @param {number} [options.height] - Height of the resource
   */
  constructor(t, e) {
    const { width: i, height: s } = e || {};
    super(i, s), this.items = [], this.itemDirtyIds = [];
    for (let o = 0; o < t; o++) {
      const h = new Qt();
      this.items.push(h), this.itemDirtyIds.push(-2);
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
      t[i] && (t[i].castToBaseTexture ? this.addBaseTextureAt(t[i].castToBaseTexture(), i) : t[i] instanceof ts ? this.addResourceAt(t[i], i) : this.addResourceAt($l(t[i], e), i));
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
class pp extends eu {
  /**
   * @param source - Number of items in array or the collection
   *        of image URLs to use. Can also be resources, image elements, canvas, etc.
   * @param options - Options to apply to {@link PIXI.autoDetectResource}
   * @param {number} [options.width] - Width of the resource
   * @param {number} [options.height] - Height of the resource
   */
  constructor(t, e) {
    const { width: i, height: s } = e || {};
    let o, h;
    Array.isArray(t) ? (o = t, h = t.length) : h = t, super(h, { width: i, height: s }), o && this.initFromArray(o, e);
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
    super.bind(t), t.target = yi.TEXTURE_2D_ARRAY;
  }
  /**
   * Upload the resources to the GPU.
   * @param renderer
   * @param texture
   * @param glTexture
   * @returns - whether texture was uploaded
   */
  upload(t, e, i) {
    const { length: s, itemDirtyIds: o, items: h } = this, { gl: l } = t;
    i.dirtyId < 0 && l.texImage3D(
      l.TEXTURE_2D_ARRAY,
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
    for (let c = 0; c < s; c++) {
      const _ = h[c];
      o[c] < _.dirtyId && (o[c] = _.dirtyId, _.valid && l.texSubImage3D(
        l.TEXTURE_2D_ARRAY,
        0,
        0,
        // xoffset
        0,
        // yoffset
        c,
        // zoffset
        _.resource.width,
        _.resource.height,
        1,
        e.format,
        i.type,
        _.resource.source
      ));
    }
    return !0;
  }
}
class mp extends $r {
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
const ru = class Vi extends eu {
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
    const { width: i, height: s, autoLoad: o, linkBaseTexture: h } = e || {};
    if (t && t.length !== Vi.SIDES)
      throw new Error(`Invalid length. Got ${t.length}, expected 6`);
    super(6, { width: i, height: s });
    for (let l = 0; l < Vi.SIDES; l++)
      this.items[l].target = yi.TEXTURE_CUBE_MAP_POSITIVE_X + l;
    this.linkBaseTexture = h !== !1, t && this.initFromArray(t, e), o !== !1 && this.load();
  }
  /**
   * Add binding.
   * @param baseTexture - parent base texture
   */
  bind(t) {
    super.bind(t), t.target = yi.TEXTURE_CUBE_MAP;
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
      t.target = yi.TEXTURE_CUBE_MAP_POSITIVE_X + e, t.parentTextureArray = this.baseTexture, this.items[e] = t;
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
    for (let o = 0; o < Vi.SIDES; o++) {
      const h = this.items[o];
      (s[o] < h.dirtyId || i.dirtyId < e.dirtyId) && (h.valid && h.resource ? (h.resource.upload(t, h, i), s[o] = h.dirtyId) : s[o] < -1 && (t.gl.texImage2D(
        h.target,
        0,
        i.internalFormat,
        e.realWidth,
        e.realHeight,
        0,
        e.format,
        i.type,
        null
      ), s[o] = -1));
    }
    return !0;
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if source is an array of 6 elements
   */
  static test(t) {
    return Array.isArray(t) && t.length === Vi.SIDES;
  }
};
ru.SIDES = 6;
let vp = ru;
class vi extends $r {
  /**
   * @param source - ImageBitmap or URL to use.
   * @param options - Options to use.
   */
  constructor(t, e) {
    e = e || {};
    let i, s, o;
    typeof t == "string" ? (i = vi.EMPTY, s = t, o = !0) : (i = t, s = null, o = !1), super(i), this.url = s, this.crossOrigin = e.crossOrigin ?? !0, this.alphaMode = typeof e.alphaMode == "number" ? e.alphaMode : null, this.ownsImageBitmap = e.ownsImageBitmap ?? o, this._load = null, e.autoLoad !== !1 && this.load();
  }
  load() {
    return this._load ? this._load : (this._load = new Promise(async (t, e) => {
      if (this.url === null) {
        t(this);
        return;
      }
      try {
        const i = await Dt.ADAPTER.fetch(this.url, {
          mode: this.crossOrigin ? "cors" : "no-cors"
        });
        if (this.destroyed)
          return;
        const s = await i.blob();
        if (this.destroyed)
          return;
        const o = await createImageBitmap(s, {
          premultiplyAlpha: this.alphaMode === null || this.alphaMode === Kr.UNPACK ? "premultiply" : "none"
        });
        if (this.destroyed) {
          o.close();
          return;
        }
        this.source = o, this.update(), t(this);
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
    return vi._EMPTY = vi._EMPTY ?? Dt.ADAPTER.createCanvas(0, 0), vi._EMPTY;
  }
}
const Eo = class Fs extends $r {
  /**
   * @param sourceBase64 - Base64 encoded SVG element or URL for SVG file.
   * @param {object} [options] - Options to use
   * @param {number} [options.scale=1] - Scale to apply to SVG. Overridden by...
   * @param {number} [options.width] - Rasterize SVG this wide. Aspect ratio preserved if height not specified.
   * @param {number} [options.height] - Rasterize SVG this high. Aspect ratio preserved if width not specified.
   * @param {boolean} [options.autoLoad=true] - Start loading right away.
   */
  constructor(t, e) {
    e = e || {}, super(Dt.ADAPTER.createCanvas()), this._width = 0, this._height = 0, this.svg = t, this.scale = e.scale || 1, this._overrideWidth = e.width, this._overrideHeight = e.height, this._resolve = null, this._crossorigin = e.crossorigin, this._load = null, e.autoLoad !== !1 && this.load();
  }
  load() {
    return this._load ? this._load : (this._load = new Promise((t) => {
      if (this._resolve = () => {
        this.update(), t(this);
      }, Fs.SVG_XML.test(this.svg.trim())) {
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
    $r.crossOrigin(t, this.svg, this._crossorigin), t.src = this.svg, t.onerror = (e) => {
      this._resolve && (t.onerror = null, this.onError.emit(e));
    }, t.onload = () => {
      if (!this._resolve)
        return;
      const e = t.width, i = t.height;
      if (!e || !i)
        throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
      let s = e * this.scale, o = i * this.scale;
      (this._overrideWidth || this._overrideHeight) && (s = this._overrideWidth || this._overrideHeight / i * e, o = this._overrideHeight || this._overrideWidth / e * i), s = Math.round(s), o = Math.round(o);
      const h = this.source;
      h.width = s, h.height = o, h._pixiId = `canvas_${Ji()}`, h.getContext("2d").drawImage(t, 0, 0, e, i, 0, 0, s, o), this._resolve(), this._resolve = null;
    };
  }
  /**
   * Get size from an svg string using a regular expression.
   * @param svgString - a serialized svg element
   * @returns - image extension
   */
  static getSize(t) {
    const e = Fs.SVG_SIZE.exec(t), i = {};
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
    return e === "svg" || typeof t == "string" && t.startsWith("data:image/svg+xml") || typeof t == "string" && Fs.SVG_XML.test(t);
  }
  // eslint-disable-line max-len
};
Eo.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m, /**
* Regular expression for SVG size.
* @example &lt;svg width="100" height="100"&gt;&lt;/svg&gt;
* @readonly
*/
Eo.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i;
let yp = Eo;
class gp extends $r {
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
const bo = class Ao extends $r {
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
      $r.crossOrigin(i, s, e.crossorigin);
      for (let o = 0; o < t.length; ++o) {
        const h = document.createElement("source");
        let { src: l, mime: c } = t[o];
        if (l = l || t[o], l.startsWith("data:"))
          c = l.slice(5, l.indexOf(";"));
        else if (!l.startsWith("blob:")) {
          const _ = l.split("?").shift().toLowerCase(), g = _.slice(_.lastIndexOf(".") + 1);
          c = c || Ao.MIME_TYPES[g] || `video/${g}`;
        }
        h.src = l, c && (h.type = c), i.appendChild(h);
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
        const e = yr.shared.elapsedMS * this.source.playbackRate;
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
    this._autoUpdate && this._isSourcePlaying() ? !this._updateFPS && this.source.requestVideoFrameCallback ? (this._isConnectedToTicker && (yr.shared.remove(this.update, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0), this._videoFrameRequestCallbackHandle === null && (this._videoFrameRequestCallbackHandle = this.source.requestVideoFrameCallback(
      this._videoFrameRequestCallback
    ))) : (this._videoFrameRequestCallbackHandle !== null && (this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker || (yr.shared.add(this.update, this), this._isConnectedToTicker = !0, this._msToNextUpdate = 0)) : (this._videoFrameRequestCallbackHandle !== null && (this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker && (yr.shared.remove(this.update, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0));
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @param {string} extension - The extension of source, if set
   * @returns {boolean} `true` if video source
   */
  static test(t, e) {
    return globalThis.HTMLVideoElement && t instanceof HTMLVideoElement || Ao.TYPES.includes(e);
  }
};
bo.TYPES = ["mp4", "m4v", "webm", "ogg", "ogv", "h264", "avi", "mov"], /**
* Map of video MIME types that can't be directly derived from file extensions.
* @readonly
*/
bo.MIME_TYPES = {
  ogv: "video/ogg",
  mov: "video/quicktime",
  m4v: "video/mp4"
};
let $p = bo;
po.push(
  vi,
  Il,
  mp,
  $p,
  gp,
  yp,
  xl,
  vp,
  pp
);
class bh {
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
    return this.minX > this.maxX || this.minY > this.maxY ? ee.EMPTY : (t = t || new ee(0, 0, 1, 1), t.x = this.minX, t.y = this.minY, t.width = this.maxX - this.minX, t.height = this.maxY - this.minY, t);
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
    const { a: i, b: s, c: o, d: h, tx: l, ty: c } = t, _ = i * e.x + o * e.y + l, g = s * e.x + h * e.y + c;
    this.minX = Math.min(this.minX, _), this.maxX = Math.max(this.maxX, _), this.minY = Math.min(this.minY, g), this.maxY = Math.max(this.maxY, g);
  }
  /**
   * Adds a quad, not transformed
   * @param vertices - The verts to add.
   */
  addQuad(t) {
    let e = this.minX, i = this.minY, s = this.maxX, o = this.maxY, h = t[0], l = t[1];
    e = h < e ? h : e, i = l < i ? l : i, s = h > s ? h : s, o = l > o ? l : o, h = t[2], l = t[3], e = h < e ? h : e, i = l < i ? l : i, s = h > s ? h : s, o = l > o ? l : o, h = t[4], l = t[5], e = h < e ? h : e, i = l < i ? l : i, s = h > s ? h : s, o = l > o ? l : o, h = t[6], l = t[7], e = h < e ? h : e, i = l < i ? l : i, s = h > s ? h : s, o = l > o ? l : o, this.minX = e, this.minY = i, this.maxX = s, this.maxY = o;
  }
  /**
   * Adds sprite frame, transformed.
   * @param transform - transform to apply
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   */
  addFrame(t, e, i, s, o) {
    this.addFrameMatrix(t.worldTransform, e, i, s, o);
  }
  /**
   * Adds sprite frame, multiplied by matrix
   * @param matrix - matrix to apply
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   */
  addFrameMatrix(t, e, i, s, o) {
    const h = t.a, l = t.b, c = t.c, _ = t.d, g = t.tx, T = t.ty;
    let w = this.minX, S = this.minY, R = this.maxX, D = this.maxY, L = h * e + c * i + g, K = l * e + _ * i + T;
    w = L < w ? L : w, S = K < S ? K : S, R = L > R ? L : R, D = K > D ? K : D, L = h * s + c * i + g, K = l * s + _ * i + T, w = L < w ? L : w, S = K < S ? K : S, R = L > R ? L : R, D = K > D ? K : D, L = h * e + c * o + g, K = l * e + _ * o + T, w = L < w ? L : w, S = K < S ? K : S, R = L > R ? L : R, D = K > D ? K : D, L = h * s + c * o + g, K = l * s + _ * o + T, w = L < w ? L : w, S = K < S ? K : S, R = L > R ? L : R, D = K > D ? K : D, this.minX = w, this.minY = S, this.maxX = R, this.maxY = D;
  }
  /**
   * Adds screen vertices from array
   * @param vertexData - calculated vertices
   * @param beginOffset - begin offset
   * @param endOffset - end offset, excluded
   */
  addVertexData(t, e, i) {
    let s = this.minX, o = this.minY, h = this.maxX, l = this.maxY;
    for (let c = e; c < i; c += 2) {
      const _ = t[c], g = t[c + 1];
      s = _ < s ? _ : s, o = g < o ? g : o, h = _ > h ? _ : h, l = g > l ? g : l;
    }
    this.minX = s, this.minY = o, this.maxX = h, this.maxY = l;
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
  addVerticesMatrix(t, e, i, s, o = 0, h = o) {
    const l = t.a, c = t.b, _ = t.c, g = t.d, T = t.tx, w = t.ty;
    let S = this.minX, R = this.minY, D = this.maxX, L = this.maxY;
    for (let K = i; K < s; K += 2) {
      const q = e[K], M = e[K + 1], Q = l * q + _ * M + T, at = g * M + c * q + w;
      S = Math.min(S, Q - o), D = Math.max(D, Q + o), R = Math.min(R, at - h), L = Math.max(L, at + h);
    }
    this.minX = S, this.minY = R, this.maxX = D, this.maxY = L;
  }
  /**
   * Adds other {@link PIXI.Bounds}.
   * @param bounds - The Bounds to be added
   */
  addBounds(t) {
    const e = this.minX, i = this.minY, s = this.maxX, o = this.maxY;
    this.minX = t.minX < e ? t.minX : e, this.minY = t.minY < i ? t.minY : i, this.maxX = t.maxX > s ? t.maxX : s, this.maxY = t.maxY > o ? t.maxY : o;
  }
  /**
   * Adds other Bounds, masked with Bounds.
   * @param bounds - The Bounds to be added.
   * @param mask - TODO
   */
  addBoundsMask(t, e) {
    const i = t.minX > e.minX ? t.minX : e.minX, s = t.minY > e.minY ? t.minY : e.minY, o = t.maxX < e.maxX ? t.maxX : e.maxX, h = t.maxY < e.maxY ? t.maxY : e.maxY;
    if (i <= o && s <= h) {
      const l = this.minX, c = this.minY, _ = this.maxX, g = this.maxY;
      this.minX = i < l ? i : l, this.minY = s < c ? s : c, this.maxX = o > _ ? o : _, this.maxY = h > g ? h : g;
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
    const i = t.minX > e.x ? t.minX : e.x, s = t.minY > e.y ? t.minY : e.y, o = t.maxX < e.x + e.width ? t.maxX : e.x + e.width, h = t.maxY < e.y + e.height ? t.maxY : e.y + e.height;
    if (i <= o && s <= h) {
      const l = this.minX, c = this.minY, _ = this.maxX, g = this.maxY;
      this.minX = i < l ? i : l, this.minY = s < c ? s : c, this.maxX = o > _ ? o : _, this.maxY = h > g ? h : g;
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
  addFramePad(t, e, i, s, o, h) {
    t -= o, e -= h, i += o, s += h, this.minX = this.minX < t ? this.minX : t, this.maxX = this.maxX > i ? this.maxX : i, this.minY = this.minY < e ? this.minY : e, this.maxY = this.maxY > s ? this.maxY : s;
  }
}
class Ai extends Jr {
  constructor() {
    super(), this.tempDisplayObjectParent = null, this.transform = new hn(), this.alpha = 1, this.visible = !0, this.renderable = !0, this.cullable = !1, this.cullArea = null, this.parent = null, this.worldAlpha = 1, this._lastSortedIndex = 0, this._zIndex = 0, this.filterArea = null, this.filters = null, this._enabledFilters = null, this._bounds = new bh(), this._localBounds = null, this._boundsID = 0, this._boundsRect = null, this._localBoundsRect = null, this._mask = null, this._maskRefCount = 0, this._destroyed = !1, this.isSprite = !1, this.isMask = !1;
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
        Ai.prototype,
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
    return t || (this.parent ? (this._recursivePostUpdateTransform(), this.updateTransform()) : (this.parent = this._tempDisplayObjectParent, this.updateTransform(), this.parent = null)), this._bounds.updateID !== this._boundsID && (this.calculateBounds(), this._bounds.updateID = this._boundsID), e || (this._boundsRect || (this._boundsRect = new ee()), e = this._boundsRect), this._bounds.getRectangle(e);
  }
  /**
   * Retrieves the local bounds of the displayObject as a rectangle object.
   * @param rect - Optional rectangle to store the result of the bounds calculation.
   * @returns - The rectangular bounding area.
   */
  getLocalBounds(t) {
    t || (this._localBoundsRect || (this._localBoundsRect = new ee()), t = this._localBoundsRect), this._localBounds || (this._localBounds = new bh());
    const e = this.transform, i = this.parent;
    this.parent = null, this._tempDisplayObjectParent.worldAlpha = (i == null ? void 0 : i.worldAlpha) ?? 1, this.transform = this._tempDisplayObjectParent.transform;
    const s = this._bounds, o = this._boundsID;
    this._bounds = this._localBounds;
    const h = this.getBounds(!1, t);
    return this.parent = i, this.transform = e, this._bounds = s, this._bounds.updateID += this._boundsID - o, h;
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
  setTransform(t = 0, e = 0, i = 1, s = 1, o = 0, h = 0, l = 0, c = 0, _ = 0) {
    return this.position.x = t, this.position.y = e, this.scale.x = i || 1, this.scale.y = s || 1, this.rotation = o, this.skew.x = h, this.skew.y = l, this.pivot.x = c, this.pivot.y = _, this;
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
    return this.tempDisplayObjectParent === null && (this.tempDisplayObjectParent = new xp()), this.tempDisplayObjectParent;
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
    return this.transform.rotation * c_;
  }
  set angle(t) {
    this.transform.rotation = t * f_;
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
class xp extends Ai {
  constructor() {
    super(...arguments), this.sortDirty = null;
  }
}
Ai.prototype.displayObjectUpdateTransform = Ai.prototype.updateTransform;
const Tp = new ye();
function wp(r, t) {
  return r.zIndex === t.zIndex ? r._lastSortedIndex - t._lastSortedIndex : r.zIndex - t.zIndex;
}
const iu = class So extends Ai {
  constructor() {
    super(), this.children = [], this.sortableChildren = So.defaultSortableChildren, this.sortDirty = !1;
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
    Rs(this.children, i, 1), this.children.splice(e, 0, t), this.onChildrenChange(e);
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
      e.parent = null, e.transform._parentID = -1, Rs(this.children, i, 1), this._boundsID++, this.onChildrenChange(i), e.emit("removed", this), this.emit("childRemoved", e, this, i);
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
    return e.parent = null, e.transform._parentID = -1, Rs(this.children, t, 1), this._boundsID++, this.onChildrenChange(t), e.emit("removed", this), this.emit("childRemoved", e, this, t), e;
  }
  /**
   * Removes all children from this container that are within the begin and end indexes.
   * @param beginIndex - The beginning position.
   * @param endIndex - The ending position. Default value is size of the container.
   * @returns - List of removed children
   */
  removeChildren(t = 0, e = this.children.length) {
    const i = t, s = e, o = s - i;
    let h;
    if (o > 0 && o <= s) {
      h = this.children.splice(i, o);
      for (let l = 0; l < h.length; ++l)
        h[l].parent = null, h[l].transform && (h[l].transform._parentID = -1);
      this._boundsID++, this.onChildrenChange(t);
      for (let l = 0; l < h.length; ++l)
        h[l].emit("removed", this), this.emit("childRemoved", h[l], this, l);
      return h;
    } else if (o === 0 && this.children.length === 0)
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
    t && this.children.length > 1 && this.children.sort(wp), this.sortDirty = !1;
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
      for (let s = 0, o = this.children.length; s < o; ++s) {
        const h = this.children[s];
        h.visible && h.updateTransform();
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
    this.cullArea ? (i = this.cullArea, s = this.worldTransform) : this._render !== So.prototype._render && (i = this.getBounds(!0));
    const o = t.projection.transform;
    if (o && (s ? (s = Tp.copyFrom(s), s.prepend(o)) : s = o), i && e.intersects(i, s))
      this._render(t);
    else if (this.cullArea)
      return;
    for (let h = 0, l = this.children.length; h < l; ++h) {
      const c = this.children[h], _ = c.cullable;
      c.cullable = _ || !this.cullArea, c.render(t), c.cullable = _;
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
    var o, h, l;
    const e = this.filters, i = this._mask;
    if (e) {
      this._enabledFilters || (this._enabledFilters = []), this._enabledFilters.length = 0;
      for (let c = 0; c < e.length; c++)
        e[c].enabled && this._enabledFilters.push(e[c]);
    }
    const s = e && ((o = this._enabledFilters) == null ? void 0 : o.length) || i && (!i.isMaskData || i.enabled && (i.autoDetect || i.type !== Pe.NONE));
    if (s && t.batch.flush(), e && ((h = this._enabledFilters) != null && h.length) && t.filter.push(this, this._enabledFilters), i && t.mask.push(this, this._mask), this.cullable)
      this._renderWithCulling(t);
    else {
      this._render(t);
      for (let c = 0, _ = this.children.length; c < _; ++c)
        this.children[c].render(t);
    }
    s && t.batch.flush(), i && t.mask.pop(this), e && ((l = this._enabledFilters) != null && l.length) && t.filter.pop();
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
iu.defaultSortableChildren = !1;
let Si = iu;
Si.prototype.containerUpdateTransform = Si.prototype.updateTransform;
Object.defineProperties(Dt, {
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
      return Si.defaultSortableChildren;
    },
    set(r) {
      Nt("7.1.0", "settings.SORTABLE_CHILDREN is deprecated, use Container.defaultSortableChildren"), Si.defaultSortableChildren = r;
    }
  }
});
const su = class Po {
  /**
   * @param options - The optional application and renderer parameters.
   */
  constructor(t) {
    this.stage = new Si(), t = Object.assign({
      forceCanvas: !1
    }, t), this.renderer = dp(t), Po._plugins.forEach((e) => {
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
    const i = Po._plugins.slice(0);
    i.reverse(), i.forEach((s) => {
      s.destroy.call(this);
    }), this.stage.destroy(e), this.stage = null, this.renderer.destroy(t), this.renderer = null;
  }
};
su._plugins = [];
let nu = su;
Gt.handleByList(Rt.Application, nu._plugins);
class ou {
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
        const { clientWidth: s, clientHeight: o } = this._resizeTo;
        e = s, i = o;
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
ou.extension = Rt.Application;
Gt.add(ou);
var Ep = Object.defineProperty, Mr = Math.pow, bp = (r, t, e) => t in r ? Ep(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e, I = (r, t, e) => (bp(r, typeof t != "symbol" ? t + "" : t, e), e), pe = (r, t, e) => new Promise((i, s) => {
  var o = (c) => {
    try {
      l(e.next(c));
    } catch (_) {
      s(_);
    }
  }, h = (c) => {
    try {
      l(e.throw(c));
    } catch (_) {
      s(_);
    }
  }, l = (c) => c.done ? i(c.value) : Promise.resolve(c.value).then(o, h);
  l((e = e.apply(r, t)).next());
});
const Ah = 2, Sh = 2;
var Ro;
((r) => {
  r.supportMoreMaskDivisions = !0, r.setOpacityFromMotion = !1;
})(Ro || (Ro = {}));
const Ap = 0, Ph = 1, Sp = 2, Pp = 999, es = {
  LOG_LEVEL_VERBOSE: Ap,
  LOG_LEVEL_WARNING: Ph,
  LOG_LEVEL_ERROR: Sp,
  LOG_LEVEL_NONE: Pp,
  /**
   * Global log level.
   * @default config.LOG_LEVEL_WARNING
   */
  logLevel: Ph,
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
  cubism4: Ro
}, Kt = {
  log(r, ...t) {
  },
  warn(r, ...t) {
    console.warn(`[${r}]`, ...t);
  },
  error(r, ...t) {
    console.error(`[${r}]`, ...t);
  }
};
function Js(r, t, e) {
  return r < t ? t : r > e ? e : r;
}
function Rp(r, t) {
  return Math.random() * (t - r) + r;
}
function Di(r, t, e, i, s) {
  const o = t[i];
  o !== null && typeof o === r && (e[s] = o);
}
function Bi(r, t, e, i, s) {
  const o = t[i];
  Array.isArray(o) && (e[s] = o.filter((h) => h !== null && typeof h === r));
}
function Cp(r) {
  let t = r.lastIndexOf("/");
  return t != -1 && (r = r.slice(0, t)), t = r.lastIndexOf("/"), t !== -1 && (r = r.slice(t + 1)), r;
}
function Ip(r, t) {
  const e = r.indexOf(t);
  e !== -1 && r.splice(e, 1);
}
class au extends Jr {
  constructor(t, e) {
    super(), I(this, "tag"), I(this, "settings"), I(this, "expressions", []), I(this, "defaultExpression"), I(this, "currentExpression"), I(this, "reserveExpressionIndex", -1), I(this, "destroyed", !1), this.settings = t, this.tag = `ExpressionManager(${t.name})`;
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
    return pe(this, null, function* () {
      if (!this.definitions[t]) {
        Kt.warn(this.tag, `Undefined expression at [${t}]`);
        return;
      }
      if (this.expressions[t] === null) {
        Kt.warn(
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
    return pe(this, null, function* () {
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
    return pe(this, null, function* () {
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
const Rh = 0.01, Lp = 40 / 7.5, Fp = 1 / (0.15 * 1e3);
class Mp {
  constructor() {
    I(this, "targetX", 0), I(this, "targetY", 0), I(this, "x", 0), I(this, "y", 0), I(this, "vx", 0), I(this, "vy", 0);
  }
  /**
   * Sets the focus position.
   * @param x - X position in range `[-1, 1]`.
   * @param y - Y position in range `[-1, 1]`.
   * @param instant - Should the focus position be instantly applied.
   */
  focus(t, e, i = !1) {
    this.targetX = Js(t, -1, 1), this.targetY = Js(e, -1, 1), i && (this.x = this.targetX, this.y = this.targetY);
  }
  /**
   * Updates the interpolation.
   * @param dt - Delta time in milliseconds.
   */
  update(t) {
    const e = this.targetX - this.x, i = this.targetY - this.y;
    if (Math.abs(e) < Rh && Math.abs(i) < Rh)
      return;
    const s = Math.sqrt(Mr(e, 2) + Mr(i, 2)), o = Lp / (1e3 / t);
    let h = o * (e / s) - this.vx, l = o * (i / s) - this.vy;
    const c = Math.sqrt(Mr(h, 2) + Mr(l, 2)), _ = o * Fp * t;
    c > _ && (h *= _ / c, l *= _ / c), this.vx += h, this.vy += l;
    const g = Math.sqrt(Mr(this.vx, 2) + Mr(this.vy, 2)), T = 0.5 * (Math.sqrt(Mr(_, 2) + 8 * _ * s) - _);
    g > T && (this.vx *= T / g, this.vy *= T / g), this.x += this.vx, this.y += this.vy;
  }
}
class Xo {
  /**
   * @param json - The settings JSON object.
   * @param json.url - The `url` field must be defined to specify the settings file's URL.
   */
  constructor(t) {
    I(this, "json"), I(this, "name"), I(this, "url"), I(this, "pose"), I(this, "physics"), this.json = t;
    const e = t.url;
    if (typeof e != "string")
      throw new TypeError("The `url` field in settings JSON must be defined as a string.");
    this.url = e, this.name = Cp(this.url);
  }
  /**
   * Resolves a relative path using the {@link url}. This is used to resolve the resource files
   * defined in the settings.
   * @param path - Relative path.
   * @return Resolved path.
   */
  resolveURL(t) {
    return Go.resolve(this.url, t);
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
    const e = (o, h) => {
      const l = this.resolveURL(o);
      if (!t.includes(l)) {
        if (h)
          throw new Error(
            `File "${o}" is defined in settings, but doesn't exist in given files`
          );
        return !1;
      }
      return !0;
    };
    return [this.moc, ...this.textures].forEach((o) => e(o, !0)), this.getDefinedFiles().filter((o) => e(o, !1));
  }
}
var Co = /* @__PURE__ */ ((r) => (r[r.NONE = 0] = "NONE", r[r.IDLE = 1] = "IDLE", r[r.NORMAL = 2] = "NORMAL", r[r.FORCE = 3] = "FORCE", r))(Co || {});
class Op {
  constructor() {
    I(this, "tag"), I(this, "debug", !1), I(this, "currentPriority", 0), I(this, "reservePriority", 0), I(this, "currentGroup"), I(this, "currentIndex"), I(this, "reservedGroup"), I(this, "reservedIndex"), I(this, "reservedIdleGroup"), I(this, "reservedIdleIndex");
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
      return Kt.log(this.tag, "Cannot start a motion with MotionPriority.NONE."), !1;
    if (t === this.currentGroup && e === this.currentIndex)
      return Kt.log(this.tag, "Motion is already playing.", this.dump(t, e)), !1;
    if (t === this.reservedGroup && e === this.reservedIndex || t === this.reservedIdleGroup && e === this.reservedIdleIndex)
      return Kt.log(this.tag, "Motion is already reserved.", this.dump(t, e)), !1;
    if (i === 1) {
      if (this.currentPriority !== 0)
        return Kt.log(
          this.tag,
          "Cannot start idle motion because another motion is playing.",
          this.dump(t, e)
        ), !1;
      if (this.reservedIdleGroup !== void 0)
        return Kt.log(
          this.tag,
          "Cannot start idle motion because another idle motion has reserved.",
          this.dump(t, e)
        ), !1;
      this.setReservedIdle(t, e);
    } else {
      if (i < 3) {
        if (i <= this.currentPriority)
          return Kt.log(
            this.tag,
            "Cannot start motion because another motion is playing as an equivalent or higher priority.",
            this.dump(t, e)
          ), !1;
        if (i <= this.reservePriority)
          return Kt.log(
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
        return Kt.log(
          this.tag,
          "Cannot start idle motion because another motion is playing.",
          this.dump(e, i)
        ), !1;
    } else {
      if (e !== this.reservedGroup || i !== this.reservedIndex)
        return Kt.log(
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
    return !es.preserveExpressionOnMotion;
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
const Np = "SoundManager", Dp = 0.5;
class Xr {
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
    }), s.addEventListener("error", (o) => {
      this.dispose(s), Kt.warn(Np, `Error occurred on "${t}"`, o.error), i == null || i(o.error);
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
      (s = t.play()) == null || s.catch((o) => {
        t.dispatchEvent(new ErrorEvent("error", { error: o })), i(o);
      }), t.readyState === t.HAVE_ENOUGH_DATA ? e() : t.addEventListener("canplaythrough", e);
    });
  }
  /**
   * Disposes an audio element and removes it from {@link audios}.
   * @param audio - An audio element.
   */
  static dispose(t) {
    t.pause(), t.removeAttribute("src"), Ip(this.audios, t);
  }
  /**
   * Destroys all managed audios.
   */
  static destroy() {
    for (let t = this.audios.length - 1; t >= 0; t--)
      this.dispose(this.audios[t]);
  }
}
I(Xr, "audios", []);
I(Xr, "_volume", Dp);
class Yo extends Jr {
  constructor(t, e) {
    super(), I(this, "tag"), I(this, "settings"), I(this, "motionGroups", {}), I(this, "state", new Op()), I(this, "currentAudio"), I(this, "playing", !1), I(this, "destroyed", !1), this.settings = t, this.tag = `MotionManager(${t.name})`, this.state.tag = this.tag;
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
    return pe(this, null, function* () {
      var i;
      if (!((i = this.definitions[t]) != null && i[e])) {
        Kt.warn(this.tag, `Undefined motion at "${t}"[${e}]`);
        return;
      }
      if (this.motionGroups[t][e] === null) {
        Kt.warn(
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
    return pe(this, arguments, function* (i, s, o = Co.NORMAL) {
      var h;
      if (!this.state.reserve(i, s, o))
        return !1;
      const l = (h = this.definitions[i]) == null ? void 0 : h[s];
      if (!l)
        return !1;
      this.currentAudio && Xr.dispose(this.currentAudio);
      let c;
      {
        const g = this.getSoundFile(l);
        if (g)
          try {
            c = Xr.add(
              this.settings.resolveURL(g),
              () => this.currentAudio = void 0,
              () => this.currentAudio = void 0
            ), this.currentAudio = c;
          } catch (T) {
            Kt.warn(this.tag, "Failed to create audio", g, T);
          }
      }
      const _ = yield this.loadMotion(i, s);
      return c && (yield Xr.play(c).catch(
        (T) => Kt.warn(this.tag, "Failed to play audio", c.src, T)
      )), this.state.start(_, i, s, o) ? (Kt.log(this.tag, "Start motion:", this.getMotionName(l)), this.emit("motionStart", i, s, c), this.state.shouldOverrideExpression() && this.expressionManager && this.expressionManager.resetExpression(), this.playing = !0, this._startMotion(_), !0) : (c && (Xr.dispose(c), this.currentAudio = void 0), !1);
    });
  }
  /**
   * Starts a random Motion as given priority.
   * @param group - The motion group.
   * @param priority - The priority to be applied.
   * @return Promise that resolves with true if the motion is successfully started, with false otherwise.
   */
  startRandomMotion(t, e) {
    return pe(this, null, function* () {
      const i = this.definitions[t];
      if (i != null && i.length) {
        const s = [];
        for (let o = 0; o < i.length; o++)
          this.motionGroups[t][o] !== null && !this.state.isActive(t, o) && s.push(o);
        if (s.length) {
          const o = Math.floor(Math.random() * s.length);
          return this.startMotion(t, s[o], e);
        }
      }
      return !1;
    });
  }
  /**
   * Stops all playing motions as well as the sound.
   */
  stopAllMotions() {
    this._stopAllMotions(), this.state.reset(), this.currentAudio && (Xr.dispose(this.currentAudio), this.currentAudio = void 0);
  }
  /**
   * Updates parameters of the core model.
   * @param model - The core model.
   * @param now - Current time in milliseconds.
   * @return True if the parameters have been actually updated.
   */
  update(t, e) {
    var i;
    return this.isFinished() && (this.playing && (this.playing = !1, this.emit("motionFinish")), this.state.shouldOverrideExpression() && ((i = this.expressionManager) == null || i.restoreExpression()), this.state.complete(), this.state.shouldRequestIdleMotion() && this.startRandomMotion(this.groups.idle, Co.IDLE)), this.updateParameters(t, e);
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
const Bp = { x: 0, y: 0, width: 0, height: 0 };
class Up extends Jr {
  constructor() {
    super(...arguments), I(this, "focusController", new Mp()), I(this, "pose"), I(this, "physics"), I(this, "originalWidth", 0), I(this, "originalHeight", 0), I(this, "width", 0), I(this, "height", 0), I(this, "localTransform", new ye()), I(this, "drawingMatrix", new ye()), I(this, "hitAreas", {}), I(this, "textureFlipY", !1), I(this, "viewport", [0, 0, 0, 0]), I(this, "destroyed", !1);
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
        width: Ah,
        height: Sh
      },
      this.getLayout()
    );
    this.localTransform.scale(i.width / Ah, i.height / Sh), t.width = this.originalWidth * this.localTransform.a, t.height = this.originalHeight * this.localTransform.d;
    const s = i.x !== void 0 && i.x - i.width / 2 || i.centerX !== void 0 && i.centerX || i.left !== void 0 && i.left - i.width / 2 || i.right !== void 0 && i.right + i.width / 2 || 0, o = i.y !== void 0 && i.y - i.height / 2 || i.centerY !== void 0 && i.centerY || i.top !== void 0 && i.top - i.height / 2 || i.bottom !== void 0 && i.bottom + i.height / 2 || 0;
    this.localTransform.translate(this.width * s, -this.height * o);
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
    const s = this.hitAreas[t].index, o = this.getDrawableBounds(s, Bp);
    return o.x <= e && e <= o.x + o.width && o.y <= i && i <= o.y + o.height;
  }
  /**
   * Gets a drawable's bounds.
   * @param index - Index of the drawable.
   * @param bounds - Object to store the output values.
   * @return The bounds in model canvas space.
   */
  getDrawableBounds(t, e) {
    const i = this.getDrawableVertices(t);
    let s = i[0], o = i[0], h = i[1], l = i[1];
    for (let c = 0; c < i.length; c += 2) {
      const _ = i[c], g = i[c + 1];
      s = Math.min(_, s), o = Math.max(_, o), h = Math.min(g, h), l = Math.max(g, l);
    }
    return e ?? (e = {}), e.x = s, e.y = h, e.width = o - s, e.height = l - h, e;
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
const kp = "XHRLoader";
class Ch extends Error {
  constructor(t, e, i, s = !1) {
    super(t), this.url = e, this.status = i, this.aborted = s;
  }
}
const rs = class ke {
  /**
   * Creates a managed XHR.
   * @param target - If provided, the XHR will be canceled when receiving an "destroy" event from the target.
   * @param url - The URL.
   * @param type - The XHR response type.
   * @param onload - Load listener.
   * @param onerror - Error handler.
   */
  static createXHR(t, e, i, s, o) {
    const h = new XMLHttpRequest();
    if (ke.allXhrSet.add(h), t) {
      let l = ke.xhrMap.get(t);
      l ? l.add(h) : (l = /* @__PURE__ */ new Set([h]), ke.xhrMap.set(t, l)), t.listeners("destroy").includes(ke.cancelXHRs) || t.once("destroy", ke.cancelXHRs);
    }
    return h.open("GET", e), h.responseType = i, h.onload = () => {
      (h.status === 200 || h.status === 0) && h.response ? s(h.response) : h.onerror();
    }, h.onerror = () => {
      Kt.warn(
        kp,
        `Failed to load resource as ${h.responseType} (Status ${h.status}): ${e}`
      ), o(new Ch("Network error.", e, h.status));
    }, h.onabort = () => o(new Ch("Aborted.", e, h.status, !0)), h.onloadend = () => {
      var l;
      ke.allXhrSet.delete(h), t && ((l = ke.xhrMap.get(t)) == null || l.delete(h));
    }, h;
  }
  /**
   * Cancels all XHRs related to this target.
   */
  static cancelXHRs() {
    var t;
    (t = ke.xhrMap.get(this)) == null || t.forEach((e) => {
      e.abort(), ke.allXhrSet.delete(e);
    }), ke.xhrMap.delete(this);
  }
  /**
   * Release all XHRs.
   */
  static release() {
    ke.allXhrSet.forEach((t) => t.abort()), ke.allXhrSet.clear(), ke.xhrMap = /* @__PURE__ */ new WeakMap();
  }
};
I(rs, "xhrMap", /* @__PURE__ */ new WeakMap());
I(rs, "allXhrSet", /* @__PURE__ */ new Set());
I(rs, "loader", (r, t) => new Promise((e, i) => {
  rs.createXHR(
    r.target,
    r.settings ? r.settings.resolveURL(r.url) : r.url,
    r.type,
    (o) => {
      r.result = o, e();
    },
    i
  ).send();
}));
let Gp = rs;
function hu(r, t) {
  let e = -1;
  return i(0);
  function i(s, o) {
    if (o)
      return Promise.reject(o);
    if (s <= e)
      return Promise.reject(new Error("next() called multiple times"));
    e = s;
    const h = r[s];
    if (!h)
      return Promise.resolve();
    try {
      return Promise.resolve(h(t, i.bind(null, s + 1)));
    } catch (l) {
      return Promise.reject(l);
    }
  }
}
class Rr {
  /**
   * Loads a resource.
   * @return Promise that resolves with the loaded data in a format that's consistent with the specified `type`.
   */
  static load(t) {
    return hu(this.middlewares, t).then(() => t.result);
  }
}
I(Rr, "middlewares", [Gp.loader]);
function Vp(r, t = {}) {
  var e;
  const i = { resourceOptions: { crossorigin: t.crossOrigin } };
  if (Xt.fromURL)
    return Xt.fromURL(r, i).catch((h) => {
      if (h instanceof Error)
        throw h;
      const l = new Error("Texture loading error");
      throw l.event = h, l;
    });
  i.resourceOptions.autoLoad = !1;
  const s = Xt.from(r, i);
  if (s.baseTexture.valid)
    return Promise.resolve(s);
  const o = s.baseTexture.resource;
  return (e = o._live2d_load) != null || (o._live2d_load = new Promise((h, l) => {
    const c = (_) => {
      o.source.removeEventListener("error", c);
      const g = new Error("Texture loading error");
      g.event = _, l(g);
    };
    o.source.addEventListener("error", c), o.load().then(() => h(s)).catch(c);
  })), o._live2d_load;
}
function zp() {
}
const Ih = "Live2DFactory", lu = (r, t) => pe(void 0, null, function* () {
  if (typeof r.source == "string") {
    const e = yield Rr.load({
      url: r.source,
      type: "json",
      target: r.live2dModel
    });
    e.url = r.source, r.source = e, r.live2dModel.emit("settingsJSONLoaded", e);
  }
  return t();
}), uu = (r, t) => pe(void 0, null, function* () {
  if (r.source instanceof Xo)
    return r.settings = r.source, t();
  if (typeof r.source == "object") {
    const e = qe.findRuntime(r.source);
    if (e) {
      const i = e.createModelSettings(r.source);
      return r.settings = i, r.live2dModel.emit("settingsLoaded", i), t();
    }
  }
  throw new TypeError("Unknown settings format.");
}), cu = (r, t) => {
  if (r.settings) {
    const e = qe.findRuntime(r.settings);
    if (e)
      return e.ready().then(t);
  }
  return t();
}, fu = (r, t) => pe(void 0, null, function* () {
  yield t();
  const e = r.internalModel;
  if (e) {
    const i = r.settings, s = qe.findRuntime(i);
    if (s) {
      const o = [];
      i.pose && o.push(
        Rr.load({
          settings: i,
          url: i.pose,
          type: "json",
          target: e
        }).then((h) => {
          e.pose = s.createPose(e.coreModel, h), r.live2dModel.emit("poseLoaded", e.pose);
        }).catch((h) => {
          r.live2dModel.emit("poseLoadError", h), Kt.warn(Ih, "Failed to load pose.", h);
        })
      ), i.physics && o.push(
        Rr.load({
          settings: i,
          url: i.physics,
          type: "json",
          target: e
        }).then((h) => {
          e.physics = s.createPhysics(
            e.coreModel,
            h
          ), r.live2dModel.emit("physicsLoaded", e.physics);
        }).catch((h) => {
          r.live2dModel.emit("physicsLoadError", h), Kt.warn(Ih, "Failed to load physics.", h);
        })
      ), o.length && (yield Promise.all(o));
    }
  }
}), du = (r, t) => pe(void 0, null, function* () {
  if (r.settings) {
    const e = r.live2dModel, i = Promise.all(
      r.settings.textures.map((s) => {
        const o = r.settings.resolveURL(s);
        return Vp(o, { crossOrigin: r.options.crossOrigin });
      })
    );
    if (i.catch(zp), yield t(), r.internalModel)
      e.internalModel = r.internalModel, e.emit("modelLoaded", r.internalModel);
    else
      throw new TypeError("Missing internal model.");
    e.textures = yield i, e.emit("textureLoaded", e.textures);
  } else
    throw new TypeError("Missing settings.");
}), _u = (r, t) => pe(void 0, null, function* () {
  const e = r.settings;
  if (e instanceof Xo) {
    const i = qe.findRuntime(e);
    if (!i)
      throw new TypeError("Unknown model settings.");
    const s = yield Rr.load({
      settings: e,
      url: e.moc,
      type: "arraybuffer",
      target: r.live2dModel
    });
    if (!i.isValidMoc(s))
      throw new Error("Invalid moc data");
    const o = i.createCoreModel(s);
    return r.internalModel = i.createInternalModel(o, e, r.options), t();
  }
  throw new TypeError("Missing settings.");
}), De = class fi {
  static unzip(t, e) {
    return pe(this, null, function* () {
      const i = yield fi.getFilePaths(t), s = [];
      for (const h of e.getDefinedFiles()) {
        const l = decodeURI(Go.resolve(e.url, h));
        i.includes(l) && s.push(l);
      }
      const o = yield fi.getFiles(t, s);
      for (let h = 0; h < o.length; h++) {
        const l = s[h], c = o[h];
        Object.defineProperty(c, "webkitRelativePath", {
          value: l
        });
      }
      return o;
    });
  }
  static createSettings(t) {
    return pe(this, null, function* () {
      const i = (yield fi.getFilePaths(t)).find(
        (l) => l.endsWith("model.json") || l.endsWith("model3.json")
      );
      if (!i)
        throw new Error("Settings file not found");
      const s = yield fi.readText(t, i);
      if (!s)
        throw new Error("Empty settings file: " + i);
      const o = JSON.parse(s);
      o.url = i;
      const h = fi.live2dFactory.findRuntime(o);
      if (!h)
        throw new Error("Unknown settings JSON");
      return h.createModelSettings(o);
    });
  }
  static zipReader(t, e) {
    return pe(this, null, function* () {
      throw new Error("Not implemented");
    });
  }
  static getFilePaths(t) {
    return pe(this, null, function* () {
      throw new Error("Not implemented");
    });
  }
  static getFiles(t, e) {
    return pe(this, null, function* () {
      throw new Error("Not implemented");
    });
  }
  static readText(t, e) {
    return pe(this, null, function* () {
      throw new Error("Not implemented");
    });
  }
  static releaseReader(t) {
  }
};
I(De, "live2dFactory");
I(De, "ZIP_PROTOCOL", "zip://");
I(De, "uid", 0);
I(De, "factory", (r, t) => pe(De, null, function* () {
  const e = r.source;
  let i, s, o;
  if (typeof e == "string" && (e.endsWith(".zip") || e.startsWith(De.ZIP_PROTOCOL)) ? (e.startsWith(De.ZIP_PROTOCOL) ? i = e.slice(De.ZIP_PROTOCOL.length) : i = e, s = yield Rr.load({
    url: i,
    type: "blob",
    target: r.live2dModel
  })) : Array.isArray(e) && e.length === 1 && e[0] instanceof File && e[0].name.endsWith(".zip") && (s = e[0], i = URL.createObjectURL(s), o = e.settings), s) {
    if (!s.size)
      throw new Error("Empty zip file");
    const h = yield De.zipReader(s, i);
    o || (o = yield De.createSettings(h)), o._objectURL = De.ZIP_PROTOCOL + De.uid + "/" + o.url;
    const l = yield De.unzip(h, o);
    l.settings = o, r.source = l, i.startsWith("blob:") && r.live2dModel.once("modelLoaded", (c) => {
      c.once("destroy", function() {
        URL.revokeObjectURL(i);
      });
    }), De.releaseReader(h);
  }
  return t();
}));
let pu = De;
const Je = class Ms {
  /**
   * Resolves the path of a resource file to the object URL.
   * @param settingsURL - Object URL of the settings file.
   * @param filePath - Resource file path.
   * @return Resolved object URL.
   */
  static resolveURL(t, e) {
    var i;
    const s = (i = Ms.filesMap[t]) == null ? void 0 : i[e];
    if (s === void 0)
      throw new Error("Cannot find this file from uploaded files: " + e);
    return s;
  }
  /**
   * Consumes the files by storing their object URLs. Files not defined in the settings will be ignored.
   */
  static upload(t, e) {
    return pe(this, null, function* () {
      const i = {};
      for (const s of e.getDefinedFiles()) {
        const o = decodeURI(Go.resolve(e.url, s)), h = t.find((l) => l.webkitRelativePath === o);
        h && (i[s] = URL.createObjectURL(h));
      }
      Ms.filesMap[e._objectURL] = i;
    });
  }
  /**
   * Creates a ModelSettings by given files.
   * @return Promise that resolves with the created ModelSettings.
   */
  static createSettings(t) {
    return pe(this, null, function* () {
      const e = t.find(
        (l) => l.name.endsWith("model.json") || l.name.endsWith("model3.json")
      );
      if (!e)
        throw new TypeError("Settings file not found");
      const i = yield Ms.readText(e), s = JSON.parse(i);
      s.url = e.webkitRelativePath;
      const o = qe.findRuntime(s);
      if (!o)
        throw new Error("Unknown settings JSON");
      const h = o.createModelSettings(s);
      return h._objectURL = URL.createObjectURL(e), h;
    });
  }
  /**
   * Reads a file as text in UTF-8.
   */
  static readText(t) {
    return pe(this, null, function* () {
      return new Promise((e, i) => {
        const s = new FileReader();
        s.onload = () => e(s.result), s.onerror = i, s.readAsText(t, "utf8");
      });
    });
  }
};
I(Je, "live2dFactory");
I(Je, "filesMap", {});
I(Je, "factory", (r, t) => pe(Je, null, function* () {
  if (Array.isArray(r.source) && r.source[0] instanceof File) {
    const e = r.source;
    let i = e.settings;
    if (!i)
      i = yield Je.createSettings(e);
    else if (!i._objectURL)
      throw new Error('"_objectURL" must be specified in ModelSettings');
    i.validateFiles(e.map((s) => encodeURI(s.webkitRelativePath))), yield Je.upload(e, i), i.resolveURL = function(s) {
      return Je.resolveURL(this._objectURL, s);
    }, r.source = i, r.live2dModel.once("modelLoaded", (s) => {
      s.once("destroy", function() {
        const o = this.settings._objectURL;
        if (URL.revokeObjectURL(o), Je.filesMap[o])
          for (const h of Object.values(
            Je.filesMap[o]
          ))
            URL.revokeObjectURL(h);
        delete Je.filesMap[o];
      });
    });
  }
  return t();
}));
let mu = Je;
const rr = class Le {
  /**
   * Registers a Live2DRuntime.
   */
  static registerRuntime(t) {
    Le.runtimes.push(t), Le.runtimes.sort((e, i) => i.version - e.version);
  }
  /**
   * Finds a runtime that matches given source.
   * @param source - Either a settings JSON object or a ModelSettings instance.
   * @return The Live2DRuntime, or undefined if not found.
   */
  static findRuntime(t) {
    for (const e of Le.runtimes)
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
    return pe(this, null, function* () {
      const s = new Promise((l) => t.once("textureLoaded", l)), o = new Promise((l) => t.once("modelLoaded", l)), h = Promise.all([s, o]).then(
        () => t.emit("ready")
      );
      yield hu(Le.live2DModelMiddlewares, {
        live2dModel: t,
        source: e,
        options: i || {}
      }), yield h, t.emit("load");
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
    var s, o;
    const h = (l) => t.emit("motionLoadError", e, i, l);
    try {
      const l = (s = t.definitions[e]) == null ? void 0 : s[i];
      if (!l)
        return Promise.resolve(void 0);
      t.listeners("destroy").includes(Le.releaseTasks) || t.once("destroy", Le.releaseTasks);
      let c = Le.motionTasksMap.get(t);
      c || (c = {}, Le.motionTasksMap.set(t, c));
      let _ = c[e];
      _ || (_ = [], c[e] = _);
      const g = t.getMotionFile(l);
      return (o = _[i]) != null || (_[i] = Rr.load({
        url: g,
        settings: t.settings,
        type: t.motionDataType,
        target: t
      }).then((T) => {
        var w;
        const S = (w = Le.motionTasksMap.get(t)) == null ? void 0 : w[e];
        S && delete S[i];
        const R = t.createMotion(T, e, l);
        return t.emit("motionLoaded", e, i, R), R;
      }).catch((T) => {
        Kt.warn(t.tag, `Failed to load motion: ${g}
`, T), h(T);
      })), _[i];
    } catch (l) {
      Kt.warn(t.tag, `Failed to load motion at "${e}"[${i}]
`, l), h(l);
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
    const s = (o) => t.emit("expressionLoadError", e, o);
    try {
      const o = t.definitions[e];
      if (!o)
        return Promise.resolve(void 0);
      t.listeners("destroy").includes(Le.releaseTasks) || t.once("destroy", Le.releaseTasks);
      let h = Le.expressionTasksMap.get(t);
      h || (h = [], Le.expressionTasksMap.set(t, h));
      const l = t.getExpressionFile(o);
      return (i = h[e]) != null || (h[e] = Rr.load({
        url: l,
        settings: t.settings,
        type: "json",
        target: t
      }).then((c) => {
        const _ = Le.expressionTasksMap.get(t);
        _ && delete _[e];
        const g = t.createExpression(c, o);
        return t.emit("expressionLoaded", e, g), g;
      }).catch((c) => {
        Kt.warn(t.tag, `Failed to load expression: ${l}
`, c), s(c);
      })), h[e];
    } catch (o) {
      Kt.warn(t.tag, `Failed to load expression at [${e}]
`, o), s(o);
    }
    return Promise.resolve(void 0);
  }
  static releaseTasks() {
    this instanceof Yo ? Le.motionTasksMap.delete(this) : Le.expressionTasksMap.delete(this);
  }
};
I(rr, "runtimes", []);
I(rr, "urlToJSON", lu);
I(rr, "jsonToSettings", uu);
I(rr, "waitUntilReady", cu);
I(rr, "setupOptionals", fu);
I(rr, "setupEssentials", du);
I(rr, "createInternalModel", _u);
I(rr, "live2DModelMiddlewares", [
  pu.factory,
  mu.factory,
  lu,
  uu,
  cu,
  fu,
  du,
  _u
]);
I(rr, "motionTasksMap", /* @__PURE__ */ new WeakMap());
I(rr, "expressionTasksMap", /* @__PURE__ */ new WeakMap());
let qe = rr;
Yo.prototype._loadMotion = function(r, t) {
  return qe.loadMotion(this, r, t);
};
au.prototype._loadExpression = function(r) {
  return qe.loadExpression(this, r);
};
mu.live2dFactory = qe;
pu.live2dFactory = qe;
const vu = class Io {
  constructor(t, {
    autoUpdate: e = !0,
    autoHitTest: i = !0,
    autoFocus: s = !0,
    autoInteract: o,
    ticker: h
  } = {}) {
    I(this, "model"), I(this, "destroyed", !1), I(this, "_ticker"), I(this, "_autoUpdate", !1), I(this, "_autoHitTest", !1), I(this, "_autoFocus", !1), h || (Io.defaultTicker ? h = Io.defaultTicker : typeof PIXI < "u" && (h = PIXI.Ticker.shared)), o !== void 0 && (i = o, s = o, Kt.warn(
      t.tag,
      "options.autoInteract is deprecated since v0.5.0, use autoHitTest and autoFocus instead."
    )), this.model = t, this.ticker = h, this.autoUpdate = e, this.autoHitTest = i, this.autoFocus = s, (i || s) && (this.model.eventMode = "static");
  }
  get ticker() {
    return this._ticker;
  }
  set ticker(t) {
    var e;
    this._ticker && this._ticker.remove(bs, this), this._ticker = t, this._autoUpdate && ((e = this._ticker) == null || e.add(bs, this));
  }
  /**
   * @see {@link AutomatorOptions.autoUpdate}
   */
  get autoUpdate() {
    return this._autoUpdate;
  }
  set autoUpdate(t) {
    var e;
    this.destroyed || (t ? this._ticker ? (this._ticker.add(bs, this), this._autoUpdate = !0) : Kt.warn(
      this.model.tag,
      "No Ticker to be used for automatic updates. Either set option.ticker when creating Live2DModel, or expose PIXI to global scope (window.PIXI = PIXI)."
    ) : ((e = this._ticker) == null || e.remove(bs, this), this._autoUpdate = !1));
  }
  /**
   * @see {@link AutomatorOptions.autoHitTest}
   */
  get autoHitTest() {
    return this._autoHitTest;
  }
  set autoHitTest(t) {
    t !== this.autoHitTest && (t ? this.model.on("pointertap", Fh, this) : this.model.off("pointertap", Fh, this), this._autoHitTest = t);
  }
  /**
   * @see {@link AutomatorOptions.autoFocus}
   */
  get autoFocus() {
    return this._autoFocus;
  }
  set autoFocus(t) {
    t !== this.autoFocus && (t ? this.model.on("globalpointermove", Mh, this) : this.model.off("globalpointermove", Mh, this), this._autoFocus = t);
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
I(vu, "defaultTicker");
let Lh = vu;
function bs() {
  this.onTickerUpdate();
}
function Fh(r) {
  this.onTap(r);
}
function Mh(r) {
  this.onPointerMove(r);
}
class Xp extends hn {
}
const Ye = new Me(), Yp = new ye();
class Wp extends Si {
  constructor(t) {
    super(), I(this, "tag", "Live2DModel(uninitialized)"), I(this, "internalModel"), I(this, "textures", []), I(this, "transform", new Xp()), I(this, "anchor", new Pr(this.onAnchorChange, this, 0, 0)), I(this, "glContextID", -1), I(this, "elapsedTime", 0), I(this, "deltaTime", 0), I(this, "automator"), this.automator = new Lh(this, t), this.once("modelLoaded", () => this.init(t));
  }
  /**
   * Creates a Live2DModel from given source.
   * @param source - Can be one of: settings file URL, settings JSON object, ModelSettings instance.
   * @param options - Options for the creation.
   * @return Promise that resolves with the Live2DModel.
   */
  static from(t, e) {
    const i = new this(e);
    return qe.setupLive2DModel(i, t, e).then(() => i);
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
    return qe.setupLive2DModel(i, t, e).then(e == null ? void 0 : e.onLoad).catch(e == null ? void 0 : e.onError), i;
  }
  /**
   * Registers the class of `PIXI.Ticker` for auto updating.
   * @deprecated Use {@link Live2DModelOptions.ticker} instead.
   */
  static registerTicker(t) {
    Lh.defaultTicker = t.shared;
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
    Ye.x = t, Ye.y = e, this.toModelPosition(Ye, Ye, !0);
    const s = Ye.x / this.internalModel.originalWidth * 2 - 1, o = Ye.y / this.internalModel.originalHeight * 2 - 1, h = Math.atan2(o, s);
    this.internalModel.focusController.focus(Math.cos(h), -Math.sin(h), i);
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
    i.length && (Kt.log(this.tag, "Hit", i), this.emit("hit", i));
  }
  /**
   * Hit-test on the model.
   * @param x - Position in world space.
   * @param y - Position in world space.
   * @return The names of the *hit* hit areas. Can be empty if none is hit.
   */
  hitTest(t, e) {
    return Ye.x = t, Ye.y = e, this.toModelPosition(Ye, Ye), this.internalModel.hitTest(Ye.x, Ye.y);
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
    for (let o = 0; o < this.textures.length; o++) {
      const h = this.textures[o];
      h.valid && ((e || !h.baseTexture._glTextures[this.glContextID]) && (t.gl.pixelStorei(
        WebGLRenderingContext.UNPACK_FLIP_Y_WEBGL,
        this.internalModel.textureFlipY
      ), t.texture.bind(h.baseTexture, 0)), this.internalModel.bindTexture(
        o,
        h.baseTexture._glTextures[this.glContextID].texture
      ), h.baseTexture.touched = t.textureGC.count);
    }
    const i = t.framebuffer.viewport;
    this.internalModel.viewport = [i.x, i.y, i.width, i.height], this.deltaTime && (this.internalModel.update(this.deltaTime, this.elapsedTime), this.deltaTime = 0);
    const s = Yp.copyFrom(t.globalUniforms.uniforms.projectionMatrix).append(this.worldTransform);
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
const jp = Live2DMotion.prototype.updateParam;
Live2DMotion.prototype.updateParam = function(r, t) {
  jp.call(this, r, t), t.isFinished() && this.onFinishHandler && (this.onFinishHandler(this), delete this.onFinishHandler);
};
class qp extends AMotion {
  constructor(t) {
    super(), I(this, "params", []), this.setFadeIn(t.fade_in > 0 ? t.fade_in : es.expressionFadingDuration), this.setFadeOut(t.fade_out > 0 ? t.fade_out : es.expressionFadingDuration), Array.isArray(t.params) && t.params.forEach((e) => {
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
    this.params.forEach((o) => {
      t.setParamFloat(o.id, o.val * i);
    });
  }
}
class Hp extends au {
  constructor(t, e) {
    var i;
    super(t, e), I(this, "queueManager", new MotionQueueManager()), I(this, "definitions"), this.definitions = (i = this.settings.expressions) != null ? i : [], this.init();
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
    return new qp(t);
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
class Zp extends Yo {
  constructor(t, e) {
    super(t, e), I(this, "definitions"), I(this, "groups", { idle: "idle" }), I(this, "motionDataType", "arraybuffer"), I(this, "queueManager", new MotionQueueManager()), I(this, "expressionManager"), this.definitions = this.settings.motions, this.init(e);
  }
  init(t) {
    super.init(t), this.settings.expressions && (this.expressionManager = new Hp(this.settings, t));
  }
  isFinished() {
    return this.queueManager.isFinished();
  }
  createMotion(t, e, i) {
    const s = Live2DMotion.loadMotion(t), o = e === this.groups.idle ? es.idleMotionFadingDuration : es.motionFadingDuration;
    return s.setFadeIn(i.fade_in > 0 ? i.fade_in : o), s.setFadeOut(i.fade_out > 0 ? i.fade_out : o), s;
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
class Qp {
  constructor(t) {
    I(this, "leftParam"), I(this, "rightParam"), I(this, "blinkInterval", 4e3), I(this, "closingDuration", 100), I(this, "closedDuration", 50), I(this, "openingDuration", 150), I(this, "eyeState", 0), I(this, "eyeParamValue", 1), I(this, "closedTimer", 0), I(this, "nextBlinkTimeLeft", this.blinkInterval), this.coreModel = t, this.leftParam = t.getParamIndex("PARAM_EYE_L_OPEN"), this.rightParam = t.getParamIndex("PARAM_EYE_R_OPEN");
  }
  setEyeParams(t) {
    this.eyeParamValue = Js(t, 0, 1), this.coreModel.setParamFloat(this.leftParam, this.eyeParamValue), this.coreModel.setParamFloat(this.rightParam, this.eyeParamValue);
  }
  update(t) {
    switch (this.eyeState) {
      case 0:
        this.nextBlinkTimeLeft -= t, this.nextBlinkTimeLeft < 0 && (this.eyeState = 1, this.nextBlinkTimeLeft = this.blinkInterval + this.closingDuration + this.closedDuration + this.openingDuration + Rp(0, 2e3));
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
const Or = new Float32Array([
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
class Kp extends Up {
  constructor(t, e, i) {
    super(), I(this, "settings"), I(this, "coreModel"), I(this, "motionManager"), I(this, "eyeBlink"), I(this, "eyeballXParamIndex"), I(this, "eyeballYParamIndex"), I(this, "angleXParamIndex"), I(this, "angleYParamIndex"), I(this, "angleZParamIndex"), I(this, "bodyAngleXParamIndex"), I(this, "breathParamIndex"), I(this, "textureFlipY", !0), I(this, "drawDataCount", 0), I(this, "disableCulling", !1), I(this, "hasDrawn", !1), this.coreModel = t, this.settings = e, this.motionManager = new Zp(e, i), this.eyeBlink = new Qp(t), this.eyeballXParamIndex = t.getParamIndex("PARAM_EYE_BALL_X"), this.eyeballYParamIndex = t.getParamIndex("PARAM_EYE_BALL_Y"), this.angleXParamIndex = t.getParamIndex("PARAM_ANGLE_X"), this.angleYParamIndex = t.getParamIndex("PARAM_ANGLE_Y"), this.angleZParamIndex = t.getParamIndex("PARAM_ANGLE_Z"), this.bodyAngleXParamIndex = t.getParamIndex("PARAM_BODY_ANGLE_X"), this.breathParamIndex = t.getParamIndex("PARAM_BREATH"), this.init();
  }
  init() {
    super.init(), this.settings.initParams && this.settings.initParams.forEach(
      ({ id: o, value: h }) => this.coreModel.setParamFloat(o, h)
    ), this.settings.initOpacities && this.settings.initOpacities.forEach(
      ({ id: o, value: h }) => this.coreModel.setPartsOpacity(o, h)
    ), this.coreModel.saveParam();
    const t = this.coreModel.getModelContext()._$aS;
    t != null && t.length && (this.drawDataCount = t.length);
    let e = this.coreModel.drawParamWebGL.culling;
    Object.defineProperty(this.coreModel.drawParamWebGL, "culling", {
      set: (o) => e = o,
      // always return false when disabled
      get: () => this.disableCulling ? !1 : e
    });
    const i = this.coreModel.getModelContext().clipManager, s = i.setupClip;
    i.setupClip = (o, h) => {
      s.call(i, o, h), h.gl.viewport(...this.viewport);
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
    for (const [h, l] of Object.entries(i))
      l instanceof WebGLBuffer && (i[h] = null);
    const s = this.coreModel.getModelContext().clipManager;
    s.curFrameNo = e;
    const o = t.getParameter(t.FRAMEBUFFER_BINDING);
    s.getMaskRenderTexture(), t.bindFramebuffer(t.FRAMEBUFFER, o);
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
    return this.hasDrawn || Kt.warn(
      "Trying to hit-test a Cubism 2 model that has not been rendered yet. The result will always be empty since the draw data is not ready."
    ), super.hitTest(t, e);
  }
  update(t, e) {
    var i, s, o, h;
    super.update(t, e);
    const l = this.coreModel;
    this.emit("beforeMotionUpdate");
    const c = this.motionManager.update(this.coreModel, e);
    this.emit("afterMotionUpdate"), l.saveParam(), (i = this.motionManager.expressionManager) == null || i.update(l, e), c || (s = this.eyeBlink) == null || s.update(t), this.updateFocus(), this.updateNaturalMovements(t, e), (o = this.physics) == null || o.update(e), (h = this.pose) == null || h.update(t), this.emit("beforeModelUpdate"), l.update(), l.loadParam();
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
    Or[0] = i.a, Or[1] = i.b, Or[4] = i.c, Or[5] = i.d, Or[12] = i.tx, Or[13] = i.ty, this.coreModel.setMatrix(Or), this.coreModel.draw(), this.hasDrawn = !0, this.disableCulling = e;
  }
  destroy() {
    super.destroy(), this.coreModel = void 0;
  }
}
class qi extends Xo {
  constructor(t) {
    if (super(t), I(this, "moc"), I(this, "textures"), I(this, "layout"), I(this, "hitAreas"), I(this, "initParams"), I(this, "initOpacities"), I(this, "expressions"), I(this, "motions", {}), !qi.isValidJSON(t))
      throw new TypeError("Invalid JSON.");
    this.moc = t.model, Bi("string", t, this, "textures", "textures"), this.copy(t);
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
    Di("string", t, this, "name", "name"), Di("string", t, this, "pose", "pose"), Di("string", t, this, "physics", "physics"), Di("object", t, this, "layout", "layout"), Di("object", t, this, "motions", "motions"), Bi("object", t, this, "hit_areas", "hitAreas"), Bi("object", t, this, "expressions", "expressions"), Bi("object", t, this, "init_params", "initParams"), Bi("object", t, this, "init_opacities", "initOpacities");
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
const Jp = {
  x: PhysicsHair.Src.SRC_TO_X,
  y: PhysicsHair.Src.SRC_TO_Y,
  angle: PhysicsHair.Src.SRC_TO_G_ANGLE
}, tm = {
  x: PhysicsHair.Src.SRC_TO_X,
  y: PhysicsHair.Src.SRC_TO_Y,
  angle: PhysicsHair.Src.SRC_TO_G_ANGLE
};
class em {
  constructor(t, e) {
    I(this, "physicsHairs", []), this.coreModel = t, e.physics_hair && (this.physicsHairs = e.physics_hair.map((i) => {
      const s = new PhysicsHair();
      return s.setup(
        i.setup.length,
        i.setup.regist,
        i.setup.mass
      ), i.src.forEach(({ id: o, ptype: h, scale: l, weight: c }) => {
        const _ = Jp[h];
        _ && s.addSrcParam(_, o, l, c);
      }), i.targets.forEach(({ id: o, ptype: h, scale: l, weight: c }) => {
        const _ = tm[h];
        _ && s.addTargetParam(_, o, l, c);
      }), s;
    }));
  }
  update(t) {
    this.physicsHairs.forEach((e) => e.update(this.coreModel, t));
  }
}
class Oh {
  constructor(t) {
    I(this, "paramIndex", -1), I(this, "partsIndex", -1), I(this, "link", []), this.id = t;
  }
  initIndex(t) {
    this.paramIndex = t.getParamIndex("VISIBLE:" + this.id), this.partsIndex = t.getPartsDataIndex(PartsDataID.getID(this.id)), t.setParamFloat(this.paramIndex, 1);
  }
}
class rm {
  constructor(t, e) {
    I(this, "opacityAnimDuration", 500), I(this, "partsGroups", []), this.coreModel = t, e.parts_visible && (this.partsGroups = e.parts_visible.map(
      ({ group: i }) => i.map(({ id: s, link: o }) => {
        const h = new Oh(s);
        return o && (h.link = o.map((l) => new Oh(l))), h;
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
    const i = this.coreModel, s = 0.5, o = 0.15;
    let h = 1, l = t.findIndex(
      ({ paramIndex: c, partsIndex: _ }) => _ >= 0 && i.getParamFloat(c) !== 0
    );
    if (l >= 0) {
      const c = i.getPartsOpacity(t[l].partsIndex);
      h = Js(c + e / this.opacityAnimDuration, 0, 1);
    } else
      l = 0, h = 1;
    t.forEach(({ partsIndex: c }, _) => {
      if (c >= 0)
        if (l == _)
          i.setPartsOpacity(c, h);
        else {
          let g = i.getPartsOpacity(c), T;
          h < s ? T = h * (s - 1) / s + 1 : T = (1 - h) * s / (1 - s), (1 - T) * (1 - h) > o && (T = 1 - o / (1 - h)), g > T && (g = T), i.setPartsOpacity(c, g);
        }
    });
  }
  copyOpacity(t) {
    const e = this.coreModel;
    t.forEach(({ partsIndex: i, link: s }) => {
      if (i >= 0 && s) {
        const o = e.getPartsOpacity(i);
        s.forEach(({ partsIndex: h }) => {
          h >= 0 && e.setPartsOpacity(h, o);
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
qe.registerRuntime({
  version: 2,
  test(r) {
    return r instanceof qi || qi.isValidJSON(r);
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
    return new qi(r);
  },
  createCoreModel(r) {
    const t = Live2DModelWebGL.loadModel(r), e = Live2D.getError();
    if (e)
      throw e;
    return t;
  },
  createInternalModel(r, t, e) {
    return new Kp(r, t, e);
  },
  createPose(r, t) {
    return new rm(r, t);
  },
  createPhysics(r, t) {
    return new em(r, t);
  }
});
function im(r) {
  return Object.keys(r).reduce((e, i) => {
    const s = r[i];
    return e[i] = Object.assign({}, s), gu(s.value) && !hm(s.value) && !Array.isArray(s.value) && (e[i].value = Object.assign({}, s.value)), Array.isArray(s.value) && (e[i].value = s.value.slice(0)), e;
  }, {});
}
function sm(r) {
  return r ? Object.keys(r).reduce((e, i) => {
    const s = r[i];
    return e[i] = gu(s) && "value" in s ? s : {
      value: s
    }, e[i].attribute || (e[i].attribute = am(i)), e[i].parse = "parse" in e[i] ? e[i].parse : typeof e[i].value != "string", e;
  }, {}) : {};
}
function nm(r) {
  return Object.keys(r).reduce((e, i) => (e[i] = r[i].value, e), {});
}
function om(r, t) {
  const e = im(t);
  return Object.keys(t).forEach((s) => {
    const o = e[s], h = r.getAttribute(o.attribute), l = r[s];
    h && (o.value = o.parse ? yu(h) : h), l != null && (o.value = Array.isArray(l) ? l.slice(0) : l), o.reflect && Nh(r, o.attribute, o.value, !!o.parse), Object.defineProperty(r, s, {
      get() {
        return o.value;
      },
      set(c) {
        const _ = o.value;
        o.value = c, o.reflect && Nh(this, o.attribute, o.value, !!o.parse);
        for (let g = 0, T = this.__propertyChangedCallbacks.length; g < T; g++)
          this.__propertyChangedCallbacks[g](s, c, _);
      },
      enumerable: !0,
      configurable: !0
    });
  }), e;
}
function yu(r) {
  if (r)
    try {
      return JSON.parse(r);
    } catch {
      return r;
    }
}
function Nh(r, t, e, i) {
  if (e == null || e === !1) return r.removeAttribute(t);
  let s = i ? JSON.stringify(e) : e;
  r.__updating[t] = !0, s === "true" && (s = ""), r.setAttribute(t, s), Promise.resolve().then(() => delete r.__updating[t]);
}
function am(r) {
  return r.replace(/\.?([A-Z]+)/g, (t, e) => "-" + e.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function gu(r) {
  return r != null && (typeof r == "object" || typeof r == "function");
}
function hm(r) {
  return Object.prototype.toString.call(r) === "[object Function]";
}
function lm(r) {
  return typeof r == "function" && r.toString().indexOf("class") === 0;
}
let jn;
function um(r, t) {
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
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = om(this, t);
      const s = nm(this.props), o = this.Component, h = jn;
      try {
        jn = this, this.__initialized = !0, lm(o) ? new o(s, {
          element: this
        }) : o(s, {
          element: this
        });
      } finally {
        jn = h;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected) return;
      this.__propertyChangedCallbacks.length = 0;
      let s = null;
      for (; s = this.__releaseCallbacks.pop(); ) s(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(s, o, h) {
      if (this.__initialized && !this.__updating[s] && (s = this.lookupProp(s), s in t)) {
        if (h == null && !this[s]) return;
        this[s] = t[s].parse ? yu(h) : h;
      }
    }
    lookupProp(s) {
      if (t)
        return e.find((o) => s === o || s === t[o].attribute);
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
function cm(r, t = {}, e = {}) {
  const {
    BaseElement: i = HTMLElement,
    extension: s
  } = e;
  return (o) => {
    let h = customElements.get(r);
    return h ? (h.prototype.Component = o, h) : (h = um(i, sm(t)), h.prototype.Component = o, h.prototype.registeredTag = r, customElements.define(r, h, s), h);
  };
}
function fm(r) {
  const t = Object.keys(r), e = {};
  for (let i = 0; i < t.length; i++) {
    const [s, o] = di(r[t[i]]);
    Object.defineProperty(e, t[i], {
      get: s,
      set(h) {
        o(() => h);
      }
    });
  }
  return e;
}
function dm(r) {
  if (r.assignedSlot && r.assignedSlot._$owner) return r.assignedSlot._$owner;
  let t = r.parentNode;
  for (; t && !t._$owner && !(t.assignedSlot && t.assignedSlot._$owner); )
    t = t.parentNode;
  return t && t.assignedSlot ? t.assignedSlot._$owner : r._$owner;
}
function _m(r) {
  return (t, e) => {
    const { element: i } = e;
    return wu((s) => {
      const o = fm(t);
      i.addPropertyChangedCallback((l, c) => o[l] = c), i.addReleaseCallback(() => {
        i.renderRoot.textContent = "", s();
      });
      const h = r(o, e);
      return Ou(i.renderRoot, h);
    }, dm(i));
  };
}
function pm(r, t, e) {
  return arguments.length === 2 && (e = t, t = {}), cm(r, t)(_m(e));
}
var mm = /* @__PURE__ */ Fu("<canvas>");
const vm = ({
  config: r
}) => {
  let t;
  try {
    const e = JSON.parse(r), [i] = Su(() => Promise.all(e.models.map(async ({
      src: l,
      ...c
    }) => ({
      ...c,
      live2d: await Wp.from(l, {
        autoFocus: !1,
        ticker: yr.shared
      })
    }))), {
      initialValue: []
    }), [s, o] = di(!1), h = new nu({
      view: t,
      autoStart: !0,
      backgroundAlpha: 0,
      width: 2500,
      height: 2500,
      antialias: !0
    });
    Eu(() => {
      i().length === 0 || s() || (i().forEach((l) => h.stage.addChild(l.live2d)), i().forEach((l) => {
        var c, _;
        l.live2d.x = ((c = l.pos) == null ? void 0 : c.x) ?? 0, l.live2d.y = ((_ = l.pos) == null ? void 0 : _.y) ?? 0, l.scale && l.live2d.scale.set(l.scale.x ?? 1, l.scale.y ?? 1), l.expression && l.live2d.expression(l.expression), l.motion && l.live2d.motion(l.motion);
      }), console.log("Loaded models: `", i(), "`"), o(!0));
    });
  } catch {
    console.error("Invalid config: `", r, "`");
  }
  return (() => {
    var e = mm(), i = t;
    return typeof i == "function" ? Mu(i, e) : t = e, e.style.setProperty("width", "100%"), e.style.setProperty("height", "100%"), e;
  })();
};
pm("live2d-widget", {
  config: '{"models":[]}'
}, vm);
