import { jsxs as st, jsx as U, Fragment as ze } from "react/jsx-runtime";
import { useState as Rt, useEffect as _e, useCallback as ct, useRef as rn, useMemo as on } from "react";
var Wn = "http://www.w3.org/1999/xhtml";
const Te = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Wn,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function In(t) {
  var n = t += "", e = n.indexOf(":");
  return e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)), Te.hasOwnProperty(n) ? { space: Te[n], local: t } : t;
}
function sr(t) {
  return function() {
    var n = this.ownerDocument, e = this.namespaceURI;
    return e === Wn && n.documentElement.namespaceURI === Wn ? n.createElement(t) : n.createElementNS(e, t);
  };
}
function cr(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function mi(t) {
  var n = In(t);
  return (n.local ? cr : sr)(n);
}
function lr() {
}
function we(t) {
  return t == null ? lr : function() {
    return this.querySelector(t);
  };
}
function fr(t) {
  typeof t != "function" && (t = we(t));
  for (var n = this._groups, e = n.length, i = new Array(e), r = 0; r < e; ++r)
    for (var o = n[r], u = o.length, a = i[r] = new Array(u), f, l, s = 0; s < u; ++s)
      (f = o[s]) && (l = t.call(f, f.__data__, s, o)) && ("__data__" in f && (l.__data__ = f.__data__), a[s] = l);
  return new nt(i, this._parents);
}
function hr(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function pr() {
  return [];
}
function _i(t) {
  return t == null ? pr : function() {
    return this.querySelectorAll(t);
  };
}
function dr(t) {
  return function() {
    return hr(t.apply(this, arguments));
  };
}
function gr(t) {
  typeof t == "function" ? t = dr(t) : t = _i(t);
  for (var n = this._groups, e = n.length, i = [], r = [], o = 0; o < e; ++o)
    for (var u = n[o], a = u.length, f, l = 0; l < a; ++l)
      (f = u[l]) && (i.push(t.call(f, f.__data__, l, u)), r.push(f));
  return new nt(i, r);
}
function wi(t) {
  return function() {
    return this.matches(t);
  };
}
function xi(t) {
  return function(n) {
    return n.matches(t);
  };
}
var yr = Array.prototype.find;
function vr(t) {
  return function() {
    return yr.call(this.children, t);
  };
}
function mr() {
  return this.firstElementChild;
}
function _r(t) {
  return this.select(t == null ? mr : vr(typeof t == "function" ? t : xi(t)));
}
var wr = Array.prototype.filter;
function xr() {
  return Array.from(this.children);
}
function Sr(t) {
  return function() {
    return wr.call(this.children, t);
  };
}
function Er(t) {
  return this.selectAll(t == null ? xr : Sr(typeof t == "function" ? t : xi(t)));
}
function br(t) {
  typeof t != "function" && (t = wi(t));
  for (var n = this._groups, e = n.length, i = new Array(e), r = 0; r < e; ++r)
    for (var o = n[r], u = o.length, a = i[r] = [], f, l = 0; l < u; ++l)
      (f = o[l]) && t.call(f, f.__data__, l, o) && a.push(f);
  return new nt(i, this._parents);
}
function Si(t) {
  return new Array(t.length);
}
function Mr() {
  return new nt(this._enter || this._groups.map(Si), this._parents);
}
function xn(t, n) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n;
}
xn.prototype = {
  constructor: xn,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, n) {
    return this._parent.insertBefore(t, n);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function Nr(t) {
  return function() {
    return t;
  };
}
function $r(t, n, e, i, r, o) {
  for (var u = 0, a, f = n.length, l = o.length; u < l; ++u)
    (a = n[u]) ? (a.__data__ = o[u], i[u] = a) : e[u] = new xn(t, o[u]);
  for (; u < f; ++u)
    (a = n[u]) && (r[u] = a);
}
function kr(t, n, e, i, r, o, u) {
  var a, f, l = /* @__PURE__ */ new Map(), s = n.length, c = o.length, h = new Array(s), d;
  for (a = 0; a < s; ++a)
    (f = n[a]) && (h[a] = d = u.call(f, f.__data__, a, n) + "", l.has(d) ? r[a] = f : l.set(d, f));
  for (a = 0; a < c; ++a)
    d = u.call(t, o[a], a, o) + "", (f = l.get(d)) ? (i[a] = f, f.__data__ = o[a], l.delete(d)) : e[a] = new xn(t, o[a]);
  for (a = 0; a < s; ++a)
    (f = n[a]) && l.get(h[a]) === f && (r[a] = f);
}
function Ar(t) {
  return t.__data__;
}
function Rr(t, n) {
  if (!arguments.length) return Array.from(this, Ar);
  var e = n ? kr : $r, i = this._parents, r = this._groups;
  typeof t != "function" && (t = Nr(t));
  for (var o = r.length, u = new Array(o), a = new Array(o), f = new Array(o), l = 0; l < o; ++l) {
    var s = i[l], c = r[l], h = c.length, d = zr(t.call(s, s && s.__data__, l, i)), v = d.length, x = a[l] = new Array(v), w = u[l] = new Array(v), m = f[l] = new Array(h);
    e(s, c, x, w, m, d, n);
    for (var E = 0, N = 0, S, M; E < v; ++E)
      if (S = x[E]) {
        for (E >= N && (N = E + 1); !(M = w[N]) && ++N < v; ) ;
        S._next = M || null;
      }
  }
  return u = new nt(u, i), u._enter = a, u._exit = f, u;
}
function zr(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Tr() {
  return new nt(this._exit || this._groups.map(Si), this._parents);
}
function Cr(t, n, e) {
  var i = this.enter(), r = this, o = this.exit();
  return typeof t == "function" ? (i = t(i), i && (i = i.selection())) : i = i.append(t + ""), n != null && (r = n(r), r && (r = r.selection())), e == null ? o.remove() : e(o), i && r ? i.merge(r).order() : r;
}
function Pr(t) {
  for (var n = t.selection ? t.selection() : t, e = this._groups, i = n._groups, r = e.length, o = i.length, u = Math.min(r, o), a = new Array(r), f = 0; f < u; ++f)
    for (var l = e[f], s = i[f], c = l.length, h = a[f] = new Array(c), d, v = 0; v < c; ++v)
      (d = l[v] || s[v]) && (h[v] = d);
  for (; f < r; ++f)
    a[f] = e[f];
  return new nt(a, this._parents);
}
function Ir() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var i = t[n], r = i.length - 1, o = i[r], u; --r >= 0; )
      (u = i[r]) && (o && u.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(u, o), o = u);
  return this;
}
function Fr(t) {
  t || (t = Dr);
  function n(c, h) {
    return c && h ? t(c.__data__, h.__data__) : !c - !h;
  }
  for (var e = this._groups, i = e.length, r = new Array(i), o = 0; o < i; ++o) {
    for (var u = e[o], a = u.length, f = r[o] = new Array(a), l, s = 0; s < a; ++s)
      (l = u[s]) && (f[s] = l);
    f.sort(n);
  }
  return new nt(r, this._parents).order();
}
function Dr(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Lr() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Xr() {
  return Array.from(this);
}
function qr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var i = t[n], r = 0, o = i.length; r < o; ++r) {
      var u = i[r];
      if (u) return u;
    }
  return null;
}
function Hr() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function Br() {
  return !this.node();
}
function Or(t) {
  for (var n = this._groups, e = 0, i = n.length; e < i; ++e)
    for (var r = n[e], o = 0, u = r.length, a; o < u; ++o)
      (a = r[o]) && t.call(a, a.__data__, o, r);
  return this;
}
function Yr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Vr(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ur(t, n) {
  return function() {
    this.setAttribute(t, n);
  };
}
function Gr(t, n) {
  return function() {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function Kr(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function Wr(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e);
  };
}
function Zr(t, n) {
  var e = In(t);
  if (arguments.length < 2) {
    var i = this.node();
    return e.local ? i.getAttributeNS(e.space, e.local) : i.getAttribute(e);
  }
  return this.each((n == null ? e.local ? Vr : Yr : typeof n == "function" ? e.local ? Wr : Kr : e.local ? Gr : Ur)(e, n));
}
function Ei(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Jr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Qr(t, n, e) {
  return function() {
    this.style.setProperty(t, n, e);
  };
}
function jr(t, n, e) {
  return function() {
    var i = n.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, e);
  };
}
function to(t, n, e) {
  return arguments.length > 1 ? this.each((n == null ? Jr : typeof n == "function" ? jr : Qr)(t, n, e ?? "")) : Tt(this.node(), t);
}
function Tt(t, n) {
  return t.style.getPropertyValue(n) || Ei(t).getComputedStyle(t, null).getPropertyValue(n);
}
function no(t) {
  return function() {
    delete this[t];
  };
}
function eo(t, n) {
  return function() {
    this[t] = n;
  };
}
function io(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : this[t] = e;
  };
}
function ro(t, n) {
  return arguments.length > 1 ? this.each((n == null ? no : typeof n == "function" ? io : eo)(t, n)) : this.node()[t];
}
function bi(t) {
  return t.trim().split(/^|\s+/);
}
function xe(t) {
  return t.classList || new Mi(t);
}
function Mi(t) {
  this._node = t, this._names = bi(t.getAttribute("class") || "");
}
Mi.prototype = {
  add: function(t) {
    var n = this._names.indexOf(t);
    n < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var n = this._names.indexOf(t);
    n >= 0 && (this._names.splice(n, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Ni(t, n) {
  for (var e = xe(t), i = -1, r = n.length; ++i < r; ) e.add(n[i]);
}
function $i(t, n) {
  for (var e = xe(t), i = -1, r = n.length; ++i < r; ) e.remove(n[i]);
}
function oo(t) {
  return function() {
    Ni(this, t);
  };
}
function uo(t) {
  return function() {
    $i(this, t);
  };
}
function ao(t, n) {
  return function() {
    (n.apply(this, arguments) ? Ni : $i)(this, t);
  };
}
function so(t, n) {
  var e = bi(t + "");
  if (arguments.length < 2) {
    for (var i = xe(this.node()), r = -1, o = e.length; ++r < o; ) if (!i.contains(e[r])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? ao : n ? oo : uo)(e, n));
}
function co() {
  this.textContent = "";
}
function lo(t) {
  return function() {
    this.textContent = t;
  };
}
function fo(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function ho(t) {
  return arguments.length ? this.each(t == null ? co : (typeof t == "function" ? fo : lo)(t)) : this.node().textContent;
}
function po() {
  this.innerHTML = "";
}
function go(t) {
  return function() {
    this.innerHTML = t;
  };
}
function yo(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function vo(t) {
  return arguments.length ? this.each(t == null ? po : (typeof t == "function" ? yo : go)(t)) : this.node().innerHTML;
}
function mo() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function _o() {
  return this.each(mo);
}
function wo() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function xo() {
  return this.each(wo);
}
function So(t) {
  var n = typeof t == "function" ? t : mi(t);
  return this.select(function() {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Eo() {
  return null;
}
function bo(t, n) {
  var e = typeof t == "function" ? t : mi(t), i = n == null ? Eo : typeof n == "function" ? n : we(n);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Mo() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function No() {
  return this.each(Mo);
}
function $o() {
  var t = this.cloneNode(!1), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function ko() {
  var t = this.cloneNode(!0), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Ao(t) {
  return this.select(t ? ko : $o);
}
function Ro(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function zo(t) {
  return function(n) {
    t.call(this, n, this.__data__);
  };
}
function To(t) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var e = "", i = n.indexOf(".");
    return i >= 0 && (e = n.slice(i + 1), n = n.slice(0, i)), { type: n, name: e };
  });
}
function Co(t) {
  return function() {
    var n = this.__on;
    if (n) {
      for (var e = 0, i = -1, r = n.length, o; e < r; ++e)
        o = n[e], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : n[++i] = o;
      ++i ? n.length = i : delete this.__on;
    }
  };
}
function Po(t, n, e) {
  return function() {
    var i = this.__on, r, o = zo(n);
    if (i) {
      for (var u = 0, a = i.length; u < a; ++u)
        if ((r = i[u]).type === t.type && r.name === t.name) {
          this.removeEventListener(r.type, r.listener, r.options), this.addEventListener(r.type, r.listener = o, r.options = e), r.value = n;
          return;
        }
    }
    this.addEventListener(t.type, o, e), r = { type: t.type, name: t.name, value: n, listener: o, options: e }, i ? i.push(r) : this.__on = [r];
  };
}
function Io(t, n, e) {
  var i = To(t + ""), r, o = i.length, u;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var f = 0, l = a.length, s; f < l; ++f)
        for (r = 0, s = a[f]; r < o; ++r)
          if ((u = i[r]).type === s.type && u.name === s.name)
            return s.value;
    }
    return;
  }
  for (a = n ? Po : Co, r = 0; r < o; ++r) this.each(a(i[r], n, e));
  return this;
}
function ki(t, n, e) {
  var i = Ei(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(n, e) : (r = i.document.createEvent("Event"), e ? (r.initEvent(n, e.bubbles, e.cancelable), r.detail = e.detail) : r.initEvent(n, !1, !1)), t.dispatchEvent(r);
}
function Fo(t, n) {
  return function() {
    return ki(this, t, n);
  };
}
function Do(t, n) {
  return function() {
    return ki(this, t, n.apply(this, arguments));
  };
}
function Lo(t, n) {
  return this.each((typeof n == "function" ? Do : Fo)(t, n));
}
function* Xo() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var i = t[n], r = 0, o = i.length, u; r < o; ++r)
      (u = i[r]) && (yield u);
}
var Ai = [null];
function nt(t, n) {
  this._groups = t, this._parents = n;
}
function nn() {
  return new nt([[document.documentElement]], Ai);
}
function qo() {
  return this;
}
nt.prototype = nn.prototype = {
  constructor: nt,
  select: fr,
  selectAll: gr,
  selectChild: _r,
  selectChildren: Er,
  filter: br,
  data: Rr,
  enter: Mr,
  exit: Tr,
  join: Cr,
  merge: Pr,
  selection: qo,
  order: Ir,
  sort: Fr,
  call: Lr,
  nodes: Xr,
  node: qr,
  size: Hr,
  empty: Br,
  each: Or,
  attr: Zr,
  style: to,
  property: ro,
  classed: so,
  text: ho,
  html: vo,
  raise: _o,
  lower: xo,
  append: So,
  insert: bo,
  remove: No,
  clone: Ao,
  datum: Ro,
  on: Io,
  dispatch: Lo,
  [Symbol.iterator]: Xo
};
function lt(t) {
  return typeof t == "string" ? new nt([[document.querySelector(t)]], [document.documentElement]) : new nt([[t]], Ai);
}
function Ho(t) {
  let n;
  for (; n = t.sourceEvent; ) t = n;
  return t;
}
function wt(t, n) {
  if (t = Ho(t), n === void 0 && (n = t.currentTarget), n) {
    var e = n.ownerSVGElement || n;
    if (e.createSVGPoint) {
      var i = e.createSVGPoint();
      return i.x = t.clientX, i.y = t.clientY, i = i.matrixTransform(n.getScreenCTM().inverse()), [i.x, i.y];
    }
    if (n.getBoundingClientRect) {
      var r = n.getBoundingClientRect();
      return [t.clientX - r.left - n.clientLeft, t.clientY - r.top - n.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
var Bo = { value: () => {
} };
function Se() {
  for (var t = 0, n = arguments.length, e = {}, i; t < n; ++t) {
    if (!(i = arguments[t] + "") || i in e || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    e[i] = [];
  }
  return new yn(e);
}
function yn(t) {
  this._ = t;
}
function Oo(t, n) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var i = "", r = e.indexOf(".");
    if (r >= 0 && (i = e.slice(r + 1), e = e.slice(0, r)), e && !n.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    return { type: e, name: i };
  });
}
yn.prototype = Se.prototype = {
  constructor: yn,
  on: function(t, n) {
    var e = this._, i = Oo(t + "", e), r, o = -1, u = i.length;
    if (arguments.length < 2) {
      for (; ++o < u; ) if ((r = (t = i[o]).type) && (r = Yo(e[r], t.name))) return r;
      return;
    }
    if (n != null && typeof n != "function") throw new Error("invalid callback: " + n);
    for (; ++o < u; )
      if (r = (t = i[o]).type) e[r] = Ce(e[r], t.name, n);
      else if (n == null) for (r in e) e[r] = Ce(e[r], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new yn(t);
  },
  call: function(t, n) {
    if ((r = arguments.length - 2) > 0) for (var e = new Array(r), i = 0, r, o; i < r; ++i) e[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], i = 0, r = o.length; i < r; ++i) o[i].value.apply(n, e);
  },
  apply: function(t, n, e) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var i = this._[t], r = 0, o = i.length; r < o; ++r) i[r].value.apply(n, e);
  }
};
function Yo(t, n) {
  for (var e = 0, i = t.length, r; e < i; ++e)
    if ((r = t[e]).name === n)
      return r.value;
}
function Ce(t, n, e) {
  for (var i = 0, r = t.length; i < r; ++i)
    if (t[i].name === n) {
      t[i] = Bo, t = t.slice(0, i).concat(t.slice(i + 1));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
const Zn = { capture: !0, passive: !1 };
function Jn(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Vo(t) {
  var n = t.document.documentElement, e = lt(t).on("dragstart.drag", Jn, Zn);
  "onselectstart" in n ? e.on("selectstart.drag", Jn, Zn) : (n.__noselect = n.style.MozUserSelect, n.style.MozUserSelect = "none");
}
function Uo(t, n) {
  var e = t.document.documentElement, i = lt(t).on("dragstart.drag", null);
  n && (i.on("click.drag", Jn, Zn), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in e ? i.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect);
}
function Ee(t, n, e) {
  t.prototype = n.prototype = e, e.constructor = t;
}
function Ri(t, n) {
  var e = Object.create(t.prototype);
  for (var i in n) e[i] = n[i];
  return e;
}
function en() {
}
var Ut = 0.7, Sn = 1 / Ut, zt = "\\s*([+-]?\\d+)\\s*", Gt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", pt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Go = /^#([0-9a-f]{3,8})$/, Ko = new RegExp(`^rgb\\(${zt},${zt},${zt}\\)$`), Wo = new RegExp(`^rgb\\(${pt},${pt},${pt}\\)$`), Zo = new RegExp(`^rgba\\(${zt},${zt},${zt},${Gt}\\)$`), Jo = new RegExp(`^rgba\\(${pt},${pt},${pt},${Gt}\\)$`), Qo = new RegExp(`^hsl\\(${Gt},${pt},${pt}\\)$`), jo = new RegExp(`^hsla\\(${Gt},${pt},${pt},${Gt}\\)$`), Pe = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Ee(en, Kt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ie,
  // Deprecated! Use color.formatHex.
  formatHex: Ie,
  formatHex8: tu,
  formatHsl: nu,
  formatRgb: Fe,
  toString: Fe
});
function Ie() {
  return this.rgb().formatHex();
}
function tu() {
  return this.rgb().formatHex8();
}
function nu() {
  return zi(this).formatHsl();
}
function Fe() {
  return this.rgb().formatRgb();
}
function Kt(t) {
  var n, e;
  return t = (t + "").trim().toLowerCase(), (n = Go.exec(t)) ? (e = n[1].length, n = parseInt(n[1], 16), e === 6 ? De(n) : e === 3 ? new Q(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, (n & 15) << 4 | n & 15, 1) : e === 8 ? un(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (n & 255) / 255) : e === 4 ? un(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, ((n & 15) << 4 | n & 15) / 255) : null) : (n = Ko.exec(t)) ? new Q(n[1], n[2], n[3], 1) : (n = Wo.exec(t)) ? new Q(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, 1) : (n = Zo.exec(t)) ? un(n[1], n[2], n[3], n[4]) : (n = Jo.exec(t)) ? un(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, n[4]) : (n = Qo.exec(t)) ? qe(n[1], n[2] / 100, n[3] / 100, 1) : (n = jo.exec(t)) ? qe(n[1], n[2] / 100, n[3] / 100, n[4]) : Pe.hasOwnProperty(t) ? De(Pe[t]) : t === "transparent" ? new Q(NaN, NaN, NaN, 0) : null;
}
function De(t) {
  return new Q(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function un(t, n, e, i) {
  return i <= 0 && (t = n = e = NaN), new Q(t, n, e, i);
}
function eu(t) {
  return t instanceof en || (t = Kt(t)), t ? (t = t.rgb(), new Q(t.r, t.g, t.b, t.opacity)) : new Q();
}
function Qn(t, n, e, i) {
  return arguments.length === 1 ? eu(t) : new Q(t, n, e, i ?? 1);
}
function Q(t, n, e, i) {
  this.r = +t, this.g = +n, this.b = +e, this.opacity = +i;
}
Ee(Q, Qn, Ri(en, {
  brighter(t) {
    return t = t == null ? Sn : Math.pow(Sn, t), new Q(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ut : Math.pow(Ut, t), new Q(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Q(St(this.r), St(this.g), St(this.b), En(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Le,
  // Deprecated! Use color.formatHex.
  formatHex: Le,
  formatHex8: iu,
  formatRgb: Xe,
  toString: Xe
}));
function Le() {
  return `#${xt(this.r)}${xt(this.g)}${xt(this.b)}`;
}
function iu() {
  return `#${xt(this.r)}${xt(this.g)}${xt(this.b)}${xt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Xe() {
  const t = En(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${St(this.r)}, ${St(this.g)}, ${St(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function En(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function St(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function xt(t) {
  return t = St(t), (t < 16 ? "0" : "") + t.toString(16);
}
function qe(t, n, e, i) {
  return i <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new ot(t, n, e, i);
}
function zi(t) {
  if (t instanceof ot) return new ot(t.h, t.s, t.l, t.opacity);
  if (t instanceof en || (t = Kt(t)), !t) return new ot();
  if (t instanceof ot) return t;
  t = t.rgb();
  var n = t.r / 255, e = t.g / 255, i = t.b / 255, r = Math.min(n, e, i), o = Math.max(n, e, i), u = NaN, a = o - r, f = (o + r) / 2;
  return a ? (n === o ? u = (e - i) / a + (e < i) * 6 : e === o ? u = (i - n) / a + 2 : u = (n - e) / a + 4, a /= f < 0.5 ? o + r : 2 - o - r, u *= 60) : a = f > 0 && f < 1 ? 0 : u, new ot(u, a, f, t.opacity);
}
function ru(t, n, e, i) {
  return arguments.length === 1 ? zi(t) : new ot(t, n, e, i ?? 1);
}
function ot(t, n, e, i) {
  this.h = +t, this.s = +n, this.l = +e, this.opacity = +i;
}
Ee(ot, ru, Ri(en, {
  brighter(t) {
    return t = t == null ? Sn : Math.pow(Sn, t), new ot(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ut : Math.pow(Ut, t), new ot(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, n = isNaN(t) || isNaN(this.s) ? 0 : this.s, e = this.l, i = e + (e < 0.5 ? e : 1 - e) * n, r = 2 * e - i;
    return new Q(
      Ln(t >= 240 ? t - 240 : t + 120, r, i),
      Ln(t, r, i),
      Ln(t < 120 ? t + 240 : t - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new ot(He(this.h), an(this.s), an(this.l), En(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = En(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${He(this.h)}, ${an(this.s) * 100}%, ${an(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function He(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function an(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Ln(t, n, e) {
  return (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n) * 255;
}
const Ti = (t) => () => t;
function ou(t, n) {
  return function(e) {
    return t + e * n;
  };
}
function uu(t, n, e) {
  return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e, function(i) {
    return Math.pow(t + i * n, e);
  };
}
function au(t) {
  return (t = +t) == 1 ? Ci : function(n, e) {
    return e - n ? uu(n, e, t) : Ti(isNaN(n) ? e : n);
  };
}
function Ci(t, n) {
  var e = n - t;
  return e ? ou(t, e) : Ti(isNaN(t) ? n : t);
}
const Be = (function t(n) {
  var e = au(n);
  function i(r, o) {
    var u = e((r = Qn(r)).r, (o = Qn(o)).r), a = e(r.g, o.g), f = e(r.b, o.b), l = Ci(r.opacity, o.opacity);
    return function(s) {
      return r.r = u(s), r.g = a(s), r.b = f(s), r.opacity = l(s), r + "";
    };
  }
  return i.gamma = t, i;
})(1);
function _t(t, n) {
  return t = +t, n = +n, function(e) {
    return t * (1 - e) + n * e;
  };
}
var jn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Xn = new RegExp(jn.source, "g");
function su(t) {
  return function() {
    return t;
  };
}
function cu(t) {
  return function(n) {
    return t(n) + "";
  };
}
function lu(t, n) {
  var e = jn.lastIndex = Xn.lastIndex = 0, i, r, o, u = -1, a = [], f = [];
  for (t = t + "", n = n + ""; (i = jn.exec(t)) && (r = Xn.exec(n)); )
    (o = r.index) > e && (o = n.slice(e, o), a[u] ? a[u] += o : a[++u] = o), (i = i[0]) === (r = r[0]) ? a[u] ? a[u] += r : a[++u] = r : (a[++u] = null, f.push({ i: u, x: _t(i, r) })), e = Xn.lastIndex;
  return e < n.length && (o = n.slice(e), a[u] ? a[u] += o : a[++u] = o), a.length < 2 ? f[0] ? cu(f[0].x) : su(n) : (n = f.length, function(l) {
    for (var s = 0, c; s < n; ++s) a[(c = f[s]).i] = c.x(l);
    return a.join("");
  });
}
var Oe = 180 / Math.PI, te = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Pi(t, n, e, i, r, o) {
  var u, a, f;
  return (u = Math.sqrt(t * t + n * n)) && (t /= u, n /= u), (f = t * e + n * i) && (e -= t * f, i -= n * f), (a = Math.sqrt(e * e + i * i)) && (e /= a, i /= a, f /= a), t * i < n * e && (t = -t, n = -n, f = -f, u = -u), {
    translateX: r,
    translateY: o,
    rotate: Math.atan2(n, t) * Oe,
    skewX: Math.atan(f) * Oe,
    scaleX: u,
    scaleY: a
  };
}
var sn;
function fu(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return n.isIdentity ? te : Pi(n.a, n.b, n.c, n.d, n.e, n.f);
}
function hu(t) {
  return t == null || (sn || (sn = document.createElementNS("http://www.w3.org/2000/svg", "g")), sn.setAttribute("transform", t), !(t = sn.transform.baseVal.consolidate())) ? te : (t = t.matrix, Pi(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Ii(t, n, e, i) {
  function r(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, s, c, h, d, v) {
    if (l !== c || s !== h) {
      var x = d.push("translate(", null, n, null, e);
      v.push({ i: x - 4, x: _t(l, c) }, { i: x - 2, x: _t(s, h) });
    } else (c || h) && d.push("translate(" + c + n + h + e);
  }
  function u(l, s, c, h) {
    l !== s ? (l - s > 180 ? s += 360 : s - l > 180 && (l += 360), h.push({ i: c.push(r(c) + "rotate(", null, i) - 2, x: _t(l, s) })) : s && c.push(r(c) + "rotate(" + s + i);
  }
  function a(l, s, c, h) {
    l !== s ? h.push({ i: c.push(r(c) + "skewX(", null, i) - 2, x: _t(l, s) }) : s && c.push(r(c) + "skewX(" + s + i);
  }
  function f(l, s, c, h, d, v) {
    if (l !== c || s !== h) {
      var x = d.push(r(d) + "scale(", null, ",", null, ")");
      v.push({ i: x - 4, x: _t(l, c) }, { i: x - 2, x: _t(s, h) });
    } else (c !== 1 || h !== 1) && d.push(r(d) + "scale(" + c + "," + h + ")");
  }
  return function(l, s) {
    var c = [], h = [];
    return l = t(l), s = t(s), o(l.translateX, l.translateY, s.translateX, s.translateY, c, h), u(l.rotate, s.rotate, c, h), a(l.skewX, s.skewX, c, h), f(l.scaleX, l.scaleY, s.scaleX, s.scaleY, c, h), l = s = null, function(d) {
      for (var v = -1, x = h.length, w; ++v < x; ) c[(w = h[v]).i] = w.x(d);
      return c.join("");
    };
  };
}
var pu = Ii(fu, "px, ", "px)", "deg)"), du = Ii(hu, ", ", ")", ")"), gu = 1e-12;
function Ye(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function yu(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function vu(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const mu = (function t(n, e, i) {
  function r(o, u) {
    var a = o[0], f = o[1], l = o[2], s = u[0], c = u[1], h = u[2], d = s - a, v = c - f, x = d * d + v * v, w, m;
    if (x < gu)
      m = Math.log(h / l) / n, w = function(T) {
        return [
          a + T * d,
          f + T * v,
          l * Math.exp(n * T * m)
        ];
      };
    else {
      var E = Math.sqrt(x), N = (h * h - l * l + i * x) / (2 * l * e * E), S = (h * h - l * l - i * x) / (2 * h * e * E), M = Math.log(Math.sqrt(N * N + 1) - N), $ = Math.log(Math.sqrt(S * S + 1) - S);
      m = ($ - M) / n, w = function(T) {
        var z = T * m, C = Ye(M), P = l / (e * E) * (C * vu(n * z + M) - yu(M));
        return [
          a + P * d,
          f + P * v,
          l * C / Ye(n * z + M)
        ];
      };
    }
    return w.duration = m * 1e3 * n / Math.SQRT2, w;
  }
  return r.rho = function(o) {
    var u = Math.max(1e-3, +o), a = u * u, f = a * a;
    return t(u, a, f);
  }, r;
})(Math.SQRT2, 2, 4);
var Ct = 0, Lt = 0, Ft = 0, Fi = 1e3, bn, Xt, Mn = 0, Et = 0, Fn = 0, Wt = typeof performance == "object" && performance.now ? performance : Date, Di = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function be() {
  return Et || (Di(_u), Et = Wt.now() + Fn);
}
function _u() {
  Et = 0;
}
function Nn() {
  this._call = this._time = this._next = null;
}
Nn.prototype = Li.prototype = {
  constructor: Nn,
  restart: function(t, n, e) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    e = (e == null ? be() : +e) + (n == null ? 0 : +n), !this._next && Xt !== this && (Xt ? Xt._next = this : bn = this, Xt = this), this._call = t, this._time = e, ne();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ne());
  }
};
function Li(t, n, e) {
  var i = new Nn();
  return i.restart(t, n, e), i;
}
function wu() {
  be(), ++Ct;
  for (var t = bn, n; t; )
    (n = Et - t._time) >= 0 && t._call.call(void 0, n), t = t._next;
  --Ct;
}
function Ve() {
  Et = (Mn = Wt.now()) + Fn, Ct = Lt = 0;
  try {
    wu();
  } finally {
    Ct = 0, Su(), Et = 0;
  }
}
function xu() {
  var t = Wt.now(), n = t - Mn;
  n > Fi && (Fn -= n, Mn = t);
}
function Su() {
  for (var t, n = bn, e, i = 1 / 0; n; )
    n._call ? (i > n._time && (i = n._time), t = n, n = n._next) : (e = n._next, n._next = null, n = t ? t._next = e : bn = e);
  Xt = t, ne(i);
}
function ne(t) {
  if (!Ct) {
    Lt && (Lt = clearTimeout(Lt));
    var n = t - Et;
    n > 24 ? (t < 1 / 0 && (Lt = setTimeout(Ve, t - Wt.now() - Fn)), Ft && (Ft = clearInterval(Ft))) : (Ft || (Mn = Wt.now(), Ft = setInterval(xu, Fi)), Ct = 1, Di(Ve));
  }
}
function Ue(t, n, e) {
  var i = new Nn();
  return n = n == null ? 0 : +n, i.restart((r) => {
    i.stop(), t(r + n);
  }, n, e), i;
}
var Eu = Se("start", "end", "cancel", "interrupt"), bu = [], Xi = 0, Ge = 1, ee = 2, vn = 3, Ke = 4, ie = 5, mn = 6;
function Dn(t, n, e, i, r, o) {
  var u = t.__transition;
  if (!u) t.__transition = {};
  else if (e in u) return;
  Mu(t, e, {
    name: n,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: Eu,
    tween: bu,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Xi
  });
}
function Me(t, n) {
  var e = at(t, n);
  if (e.state > Xi) throw new Error("too late; already scheduled");
  return e;
}
function dt(t, n) {
  var e = at(t, n);
  if (e.state > vn) throw new Error("too late; already running");
  return e;
}
function at(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function Mu(t, n, e) {
  var i = t.__transition, r;
  i[n] = e, e.timer = Li(o, 0, e.time);
  function o(l) {
    e.state = Ge, e.timer.restart(u, e.delay, e.time), e.delay <= l && u(l - e.delay);
  }
  function u(l) {
    var s, c, h, d;
    if (e.state !== Ge) return f();
    for (s in i)
      if (d = i[s], d.name === e.name) {
        if (d.state === vn) return Ue(u);
        d.state === Ke ? (d.state = mn, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete i[s]) : +s < n && (d.state = mn, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete i[s]);
      }
    if (Ue(function() {
      e.state === vn && (e.state = Ke, e.timer.restart(a, e.delay, e.time), a(l));
    }), e.state = ee, e.on.call("start", t, t.__data__, e.index, e.group), e.state === ee) {
      for (e.state = vn, r = new Array(h = e.tween.length), s = 0, c = -1; s < h; ++s)
        (d = e.tween[s].value.call(t, t.__data__, e.index, e.group)) && (r[++c] = d);
      r.length = c + 1;
    }
  }
  function a(l) {
    for (var s = l < e.duration ? e.ease.call(null, l / e.duration) : (e.timer.restart(f), e.state = ie, 1), c = -1, h = r.length; ++c < h; )
      r[c].call(t, s);
    e.state === ie && (e.on.call("end", t, t.__data__, e.index, e.group), f());
  }
  function f() {
    e.state = mn, e.timer.stop(), delete i[n];
    for (var l in i) return;
    delete t.__transition;
  }
}
function _n(t, n) {
  var e = t.__transition, i, r, o = !0, u;
  if (e) {
    n = n == null ? null : n + "";
    for (u in e) {
      if ((i = e[u]).name !== n) {
        o = !1;
        continue;
      }
      r = i.state > ee && i.state < ie, i.state = mn, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", t, t.__data__, i.index, i.group), delete e[u];
    }
    o && delete t.__transition;
  }
}
function Nu(t) {
  return this.each(function() {
    _n(this, t);
  });
}
function $u(t, n) {
  var e, i;
  return function() {
    var r = dt(this, t), o = r.tween;
    if (o !== e) {
      i = e = o;
      for (var u = 0, a = i.length; u < a; ++u)
        if (i[u].name === n) {
          i = i.slice(), i.splice(u, 1);
          break;
        }
    }
    r.tween = i;
  };
}
function ku(t, n, e) {
  var i, r;
  if (typeof e != "function") throw new Error();
  return function() {
    var o = dt(this, t), u = o.tween;
    if (u !== i) {
      r = (i = u).slice();
      for (var a = { name: n, value: e }, f = 0, l = r.length; f < l; ++f)
        if (r[f].name === n) {
          r[f] = a;
          break;
        }
      f === l && r.push(a);
    }
    o.tween = r;
  };
}
function Au(t, n) {
  var e = this._id;
  if (t += "", arguments.length < 2) {
    for (var i = at(this.node(), e).tween, r = 0, o = i.length, u; r < o; ++r)
      if ((u = i[r]).name === t)
        return u.value;
    return null;
  }
  return this.each((n == null ? $u : ku)(e, t, n));
}
function Ne(t, n, e) {
  var i = t._id;
  return t.each(function() {
    var r = dt(this, i);
    (r.value || (r.value = {}))[n] = e.apply(this, arguments);
  }), function(r) {
    return at(r, i).value[n];
  };
}
function qi(t, n) {
  var e;
  return (typeof n == "number" ? _t : n instanceof Kt ? Be : (e = Kt(n)) ? (n = e, Be) : lu)(t, n);
}
function Ru(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function zu(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Tu(t, n, e) {
  var i, r = e + "", o;
  return function() {
    var u = this.getAttribute(t);
    return u === r ? null : u === i ? o : o = n(i = u, e);
  };
}
function Cu(t, n, e) {
  var i, r = e + "", o;
  return function() {
    var u = this.getAttributeNS(t.space, t.local);
    return u === r ? null : u === i ? o : o = n(i = u, e);
  };
}
function Pu(t, n, e) {
  var i, r, o;
  return function() {
    var u, a = e(this), f;
    return a == null ? void this.removeAttribute(t) : (u = this.getAttribute(t), f = a + "", u === f ? null : u === i && f === r ? o : (r = f, o = n(i = u, a)));
  };
}
function Iu(t, n, e) {
  var i, r, o;
  return function() {
    var u, a = e(this), f;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (u = this.getAttributeNS(t.space, t.local), f = a + "", u === f ? null : u === i && f === r ? o : (r = f, o = n(i = u, a)));
  };
}
function Fu(t, n) {
  var e = In(t), i = e === "transform" ? du : qi;
  return this.attrTween(t, typeof n == "function" ? (e.local ? Iu : Pu)(e, i, Ne(this, "attr." + t, n)) : n == null ? (e.local ? zu : Ru)(e) : (e.local ? Cu : Tu)(e, i, n));
}
function Du(t, n) {
  return function(e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Lu(t, n) {
  return function(e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Xu(t, n) {
  var e, i;
  function r() {
    var o = n.apply(this, arguments);
    return o !== i && (e = (i = o) && Lu(t, o)), e;
  }
  return r._value = n, r;
}
function qu(t, n) {
  var e, i;
  function r() {
    var o = n.apply(this, arguments);
    return o !== i && (e = (i = o) && Du(t, o)), e;
  }
  return r._value = n, r;
}
function Hu(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var i = In(t);
  return this.tween(e, (i.local ? Xu : qu)(i, n));
}
function Bu(t, n) {
  return function() {
    Me(this, t).delay = +n.apply(this, arguments);
  };
}
function Ou(t, n) {
  return n = +n, function() {
    Me(this, t).delay = n;
  };
}
function Yu(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Bu : Ou)(n, t)) : at(this.node(), n).delay;
}
function Vu(t, n) {
  return function() {
    dt(this, t).duration = +n.apply(this, arguments);
  };
}
function Uu(t, n) {
  return n = +n, function() {
    dt(this, t).duration = n;
  };
}
function Gu(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Vu : Uu)(n, t)) : at(this.node(), n).duration;
}
function Ku(t, n) {
  if (typeof n != "function") throw new Error();
  return function() {
    dt(this, t).ease = n;
  };
}
function Wu(t) {
  var n = this._id;
  return arguments.length ? this.each(Ku(n, t)) : at(this.node(), n).ease;
}
function Zu(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    dt(this, t).ease = e;
  };
}
function Ju(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Zu(this._id, t));
}
function Qu(t) {
  typeof t != "function" && (t = wi(t));
  for (var n = this._groups, e = n.length, i = new Array(e), r = 0; r < e; ++r)
    for (var o = n[r], u = o.length, a = i[r] = [], f, l = 0; l < u; ++l)
      (f = o[l]) && t.call(f, f.__data__, l, o) && a.push(f);
  return new vt(i, this._parents, this._name, this._id);
}
function ju(t) {
  if (t._id !== this._id) throw new Error();
  for (var n = this._groups, e = t._groups, i = n.length, r = e.length, o = Math.min(i, r), u = new Array(i), a = 0; a < o; ++a)
    for (var f = n[a], l = e[a], s = f.length, c = u[a] = new Array(s), h, d = 0; d < s; ++d)
      (h = f[d] || l[d]) && (c[d] = h);
  for (; a < i; ++a)
    u[a] = n[a];
  return new vt(u, this._parents, this._name, this._id);
}
function ta(t) {
  return (t + "").trim().split(/^|\s+/).every(function(n) {
    var e = n.indexOf(".");
    return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
  });
}
function na(t, n, e) {
  var i, r, o = ta(n) ? Me : dt;
  return function() {
    var u = o(this, t), a = u.on;
    a !== i && (r = (i = a).copy()).on(n, e), u.on = r;
  };
}
function ea(t, n) {
  var e = this._id;
  return arguments.length < 2 ? at(this.node(), e).on.on(t) : this.each(na(e, t, n));
}
function ia(t) {
  return function() {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function ra() {
  return this.on("end.remove", ia(this._id));
}
function oa(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = we(t));
  for (var i = this._groups, r = i.length, o = new Array(r), u = 0; u < r; ++u)
    for (var a = i[u], f = a.length, l = o[u] = new Array(f), s, c, h = 0; h < f; ++h)
      (s = a[h]) && (c = t.call(s, s.__data__, h, a)) && ("__data__" in s && (c.__data__ = s.__data__), l[h] = c, Dn(l[h], n, e, h, l, at(s, e)));
  return new vt(o, this._parents, n, e);
}
function ua(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = _i(t));
  for (var i = this._groups, r = i.length, o = [], u = [], a = 0; a < r; ++a)
    for (var f = i[a], l = f.length, s, c = 0; c < l; ++c)
      if (s = f[c]) {
        for (var h = t.call(s, s.__data__, c, f), d, v = at(s, e), x = 0, w = h.length; x < w; ++x)
          (d = h[x]) && Dn(d, n, e, x, h, v);
        o.push(h), u.push(s);
      }
  return new vt(o, u, n, e);
}
var aa = nn.prototype.constructor;
function sa() {
  return new aa(this._groups, this._parents);
}
function ca(t, n) {
  var e, i, r;
  return function() {
    var o = Tt(this, t), u = (this.style.removeProperty(t), Tt(this, t));
    return o === u ? null : o === e && u === i ? r : r = n(e = o, i = u);
  };
}
function Hi(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function la(t, n, e) {
  var i, r = e + "", o;
  return function() {
    var u = Tt(this, t);
    return u === r ? null : u === i ? o : o = n(i = u, e);
  };
}
function fa(t, n, e) {
  var i, r, o;
  return function() {
    var u = Tt(this, t), a = e(this), f = a + "";
    return a == null && (f = a = (this.style.removeProperty(t), Tt(this, t))), u === f ? null : u === i && f === r ? o : (r = f, o = n(i = u, a));
  };
}
function ha(t, n) {
  var e, i, r, o = "style." + n, u = "end." + o, a;
  return function() {
    var f = dt(this, t), l = f.on, s = f.value[o] == null ? a || (a = Hi(n)) : void 0;
    (l !== e || r !== s) && (i = (e = l).copy()).on(u, r = s), f.on = i;
  };
}
function pa(t, n, e) {
  var i = (t += "") == "transform" ? pu : qi;
  return n == null ? this.styleTween(t, ca(t, i)).on("end.style." + t, Hi(t)) : typeof n == "function" ? this.styleTween(t, fa(t, i, Ne(this, "style." + t, n))).each(ha(this._id, t)) : this.styleTween(t, la(t, i, n), e).on("end.style." + t, null);
}
function da(t, n, e) {
  return function(i) {
    this.style.setProperty(t, n.call(this, i), e);
  };
}
function ga(t, n, e) {
  var i, r;
  function o() {
    var u = n.apply(this, arguments);
    return u !== r && (i = (r = u) && da(t, u, e)), i;
  }
  return o._value = n, o;
}
function ya(t, n, e) {
  var i = "style." + (t += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (n == null) return this.tween(i, null);
  if (typeof n != "function") throw new Error();
  return this.tween(i, ga(t, n, e ?? ""));
}
function va(t) {
  return function() {
    this.textContent = t;
  };
}
function ma(t) {
  return function() {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function _a(t) {
  return this.tween("text", typeof t == "function" ? ma(Ne(this, "text", t)) : va(t == null ? "" : t + ""));
}
function wa(t) {
  return function(n) {
    this.textContent = t.call(this, n);
  };
}
function xa(t) {
  var n, e;
  function i() {
    var r = t.apply(this, arguments);
    return r !== e && (n = (e = r) && wa(r)), n;
  }
  return i._value = t, i;
}
function Sa(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, xa(t));
}
function Ea() {
  for (var t = this._name, n = this._id, e = Bi(), i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var u = i[o], a = u.length, f, l = 0; l < a; ++l)
      if (f = u[l]) {
        var s = at(f, n);
        Dn(f, t, e, l, u, {
          time: s.time + s.delay + s.duration,
          delay: 0,
          duration: s.duration,
          ease: s.ease
        });
      }
  return new vt(i, this._parents, t, e);
}
function ba() {
  var t, n, e = this, i = e._id, r = e.size();
  return new Promise(function(o, u) {
    var a = { value: u }, f = { value: function() {
      --r === 0 && o();
    } };
    e.each(function() {
      var l = dt(this, i), s = l.on;
      s !== t && (n = (t = s).copy(), n._.cancel.push(a), n._.interrupt.push(a), n._.end.push(f)), l.on = n;
    }), r === 0 && o();
  });
}
var Ma = 0;
function vt(t, n, e, i) {
  this._groups = t, this._parents = n, this._name = e, this._id = i;
}
function Bi() {
  return ++Ma;
}
var gt = nn.prototype;
vt.prototype = {
  constructor: vt,
  select: oa,
  selectAll: ua,
  selectChild: gt.selectChild,
  selectChildren: gt.selectChildren,
  filter: Qu,
  merge: ju,
  selection: sa,
  transition: Ea,
  call: gt.call,
  nodes: gt.nodes,
  node: gt.node,
  size: gt.size,
  empty: gt.empty,
  each: gt.each,
  on: ea,
  attr: Fu,
  attrTween: Hu,
  style: pa,
  styleTween: ya,
  text: _a,
  textTween: Sa,
  remove: ra,
  tween: Au,
  delay: Yu,
  duration: Gu,
  ease: Wu,
  easeVarying: Ju,
  end: ba,
  [Symbol.iterator]: gt[Symbol.iterator]
};
function Na(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var $a = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Na
};
function ka(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${n} not found`);
  return e;
}
function Aa(t) {
  var n, e;
  t instanceof vt ? (n = t._id, t = t._name) : (n = Bi(), (e = $a).time = be(), t = t == null ? null : t + "");
  for (var i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var u = i[o], a = u.length, f, l = 0; l < a; ++l)
      (f = u[l]) && Dn(f, t, n, l, u, e || ka(f, n));
  return new vt(i, this._parents, t, n);
}
nn.prototype.interrupt = Nu;
nn.prototype.transition = Aa;
const cn = (t) => () => t;
function Ra(t, {
  sourceEvent: n,
  target: e,
  transform: i,
  dispatch: r
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: n, enumerable: !0, configurable: !0 },
    target: { value: e, enumerable: !0, configurable: !0 },
    transform: { value: i, enumerable: !0, configurable: !0 },
    _: { value: r }
  });
}
function ut(t, n, e) {
  this.k = t, this.x = n, this.y = e;
}
ut.prototype = {
  constructor: ut,
  scale: function(t) {
    return t === 1 ? this : new ut(this.k * t, this.x, this.y);
  },
  translate: function(t, n) {
    return t === 0 & n === 0 ? this : new ut(this.k, this.x + this.k * t, this.y + this.k * n);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var Zt = new ut(1, 0, 0);
Oi.prototype = ut.prototype;
function Oi(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return Zt;
  return t.__zoom;
}
function qn(t) {
  t.stopImmediatePropagation();
}
function Dt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function za(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Ta() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function We() {
  return this.__zoom || Zt;
}
function Ca(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Pa() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ia(t, n, e) {
  var i = t.invertX(n[0][0]) - e[0][0], r = t.invertX(n[1][0]) - e[1][0], o = t.invertY(n[0][1]) - e[0][1], u = t.invertY(n[1][1]) - e[1][1];
  return t.translate(
    r > i ? (i + r) / 2 : Math.min(0, i) || Math.max(0, r),
    u > o ? (o + u) / 2 : Math.min(0, o) || Math.max(0, u)
  );
}
function Fa() {
  var t = za, n = Ta, e = Ia, i = Ca, r = Pa, o = [0, 1 / 0], u = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, f = mu, l = Se("start", "zoom", "end"), s, c, h, d = 500, v = 150, x = 0, w = 10;
  function m(p) {
    p.property("__zoom", We).on("wheel.zoom", z, { passive: !1 }).on("mousedown.zoom", C).on("dblclick.zoom", P).filter(r).on("touchstart.zoom", A).on("touchmove.zoom", Z).on("touchend.zoom touchcancel.zoom", X).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  m.transform = function(p, g, y, _) {
    var b = p.selection ? p.selection() : p;
    b.property("__zoom", We), p !== b ? M(p, g, y, _) : b.interrupt().each(function() {
      $(this, arguments).event(_).start().zoom(null, typeof g == "function" ? g.apply(this, arguments) : g).end();
    });
  }, m.scaleBy = function(p, g, y, _) {
    m.scaleTo(p, function() {
      var b = this.__zoom.k, k = typeof g == "function" ? g.apply(this, arguments) : g;
      return b * k;
    }, y, _);
  }, m.scaleTo = function(p, g, y, _) {
    m.transform(p, function() {
      var b = n.apply(this, arguments), k = this.__zoom, R = y == null ? S(b) : typeof y == "function" ? y.apply(this, arguments) : y, I = k.invert(R), L = typeof g == "function" ? g.apply(this, arguments) : g;
      return e(N(E(k, L), R, I), b, u);
    }, y, _);
  }, m.translateBy = function(p, g, y, _) {
    m.transform(p, function() {
      return e(this.__zoom.translate(
        typeof g == "function" ? g.apply(this, arguments) : g,
        typeof y == "function" ? y.apply(this, arguments) : y
      ), n.apply(this, arguments), u);
    }, null, _);
  }, m.translateTo = function(p, g, y, _, b) {
    m.transform(p, function() {
      var k = n.apply(this, arguments), R = this.__zoom, I = _ == null ? S(k) : typeof _ == "function" ? _.apply(this, arguments) : _;
      return e(Zt.translate(I[0], I[1]).scale(R.k).translate(
        typeof g == "function" ? -g.apply(this, arguments) : -g,
        typeof y == "function" ? -y.apply(this, arguments) : -y
      ), k, u);
    }, _, b);
  };
  function E(p, g) {
    return g = Math.max(o[0], Math.min(o[1], g)), g === p.k ? p : new ut(g, p.x, p.y);
  }
  function N(p, g, y) {
    var _ = g[0] - y[0] * p.k, b = g[1] - y[1] * p.k;
    return _ === p.x && b === p.y ? p : new ut(p.k, _, b);
  }
  function S(p) {
    return [(+p[0][0] + +p[1][0]) / 2, (+p[0][1] + +p[1][1]) / 2];
  }
  function M(p, g, y, _) {
    p.on("start.zoom", function() {
      $(this, arguments).event(_).start();
    }).on("interrupt.zoom end.zoom", function() {
      $(this, arguments).event(_).end();
    }).tween("zoom", function() {
      var b = this, k = arguments, R = $(b, k).event(_), I = n.apply(b, k), L = y == null ? S(I) : typeof y == "function" ? y.apply(b, k) : y, B = Math.max(I[1][0] - I[0][0], I[1][1] - I[0][1]), H = b.__zoom, V = typeof g == "function" ? g.apply(b, k) : g, F = f(H.invert(L).concat(B / H.k), V.invert(L).concat(B / V.k));
      return function(Y) {
        if (Y === 1) Y = V;
        else {
          var J = F(Y), mt = B / J[2];
          Y = new ut(mt, L[0] - J[0] * mt, L[1] - J[1] * mt);
        }
        R.zoom(null, Y);
      };
    });
  }
  function $(p, g, y) {
    return !y && p.__zooming || new T(p, g);
  }
  function T(p, g) {
    this.that = p, this.args = g, this.active = 0, this.sourceEvent = null, this.extent = n.apply(p, g), this.taps = 0;
  }
  T.prototype = {
    event: function(p) {
      return p && (this.sourceEvent = p), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(p, g) {
      return this.mouse && p !== "mouse" && (this.mouse[1] = g.invert(this.mouse[0])), this.touch0 && p !== "touch" && (this.touch0[1] = g.invert(this.touch0[0])), this.touch1 && p !== "touch" && (this.touch1[1] = g.invert(this.touch1[0])), this.that.__zoom = g, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(p) {
      var g = lt(this.that).datum();
      l.call(
        p,
        this.that,
        new Ra(p, {
          sourceEvent: this.sourceEvent,
          target: m,
          transform: this.that.__zoom,
          dispatch: l
        }),
        g
      );
    }
  };
  function z(p, ...g) {
    if (!t.apply(this, arguments)) return;
    var y = $(this, g).event(p), _ = this.__zoom, b = Math.max(o[0], Math.min(o[1], _.k * Math.pow(2, i.apply(this, arguments)))), k = wt(p);
    if (y.wheel)
      (y.mouse[0][0] !== k[0] || y.mouse[0][1] !== k[1]) && (y.mouse[1] = _.invert(y.mouse[0] = k)), clearTimeout(y.wheel);
    else {
      if (_.k === b) return;
      y.mouse = [k, _.invert(k)], _n(this), y.start();
    }
    Dt(p), y.wheel = setTimeout(R, v), y.zoom("mouse", e(N(E(_, b), y.mouse[0], y.mouse[1]), y.extent, u));
    function R() {
      y.wheel = null, y.end();
    }
  }
  function C(p, ...g) {
    if (h || !t.apply(this, arguments)) return;
    var y = p.currentTarget, _ = $(this, g, !0).event(p), b = lt(p.view).on("mousemove.zoom", L, !0).on("mouseup.zoom", B, !0), k = wt(p, y), R = p.clientX, I = p.clientY;
    Vo(p.view), qn(p), _.mouse = [k, this.__zoom.invert(k)], _n(this), _.start();
    function L(H) {
      if (Dt(H), !_.moved) {
        var V = H.clientX - R, F = H.clientY - I;
        _.moved = V * V + F * F > x;
      }
      _.event(H).zoom("mouse", e(N(_.that.__zoom, _.mouse[0] = wt(H, y), _.mouse[1]), _.extent, u));
    }
    function B(H) {
      b.on("mousemove.zoom mouseup.zoom", null), Uo(H.view, _.moved), Dt(H), _.event(H).end();
    }
  }
  function P(p, ...g) {
    if (t.apply(this, arguments)) {
      var y = this.__zoom, _ = wt(p.changedTouches ? p.changedTouches[0] : p, this), b = y.invert(_), k = y.k * (p.shiftKey ? 0.5 : 2), R = e(N(E(y, k), _, b), n.apply(this, g), u);
      Dt(p), a > 0 ? lt(this).transition().duration(a).call(M, R, _, p) : lt(this).call(m.transform, R, _, p);
    }
  }
  function A(p, ...g) {
    if (t.apply(this, arguments)) {
      var y = p.touches, _ = y.length, b = $(this, g, p.changedTouches.length === _).event(p), k, R, I, L;
      for (qn(p), R = 0; R < _; ++R)
        I = y[R], L = wt(I, this), L = [L, this.__zoom.invert(L), I.identifier], b.touch0 ? !b.touch1 && b.touch0[2] !== L[2] && (b.touch1 = L, b.taps = 0) : (b.touch0 = L, k = !0, b.taps = 1 + !!s);
      s && (s = clearTimeout(s)), k && (b.taps < 2 && (c = L[0], s = setTimeout(function() {
        s = null;
      }, d)), _n(this), b.start());
    }
  }
  function Z(p, ...g) {
    if (this.__zooming) {
      var y = $(this, g).event(p), _ = p.changedTouches, b = _.length, k, R, I, L;
      for (Dt(p), k = 0; k < b; ++k)
        R = _[k], I = wt(R, this), y.touch0 && y.touch0[2] === R.identifier ? y.touch0[0] = I : y.touch1 && y.touch1[2] === R.identifier && (y.touch1[0] = I);
      if (R = y.that.__zoom, y.touch1) {
        var B = y.touch0[0], H = y.touch0[1], V = y.touch1[0], F = y.touch1[1], Y = (Y = V[0] - B[0]) * Y + (Y = V[1] - B[1]) * Y, J = (J = F[0] - H[0]) * J + (J = F[1] - H[1]) * J;
        R = E(R, Math.sqrt(Y / J)), I = [(B[0] + V[0]) / 2, (B[1] + V[1]) / 2], L = [(H[0] + F[0]) / 2, (H[1] + F[1]) / 2];
      } else if (y.touch0) I = y.touch0[0], L = y.touch0[1];
      else return;
      y.zoom("touch", e(N(R, I, L), y.extent, u));
    }
  }
  function X(p, ...g) {
    if (this.__zooming) {
      var y = $(this, g).event(p), _ = p.changedTouches, b = _.length, k, R;
      for (qn(p), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, d), k = 0; k < b; ++k)
        R = _[k], y.touch0 && y.touch0[2] === R.identifier ? delete y.touch0 : y.touch1 && y.touch1[2] === R.identifier && delete y.touch1;
      if (y.touch1 && !y.touch0 && (y.touch0 = y.touch1, delete y.touch1), y.touch0) y.touch0[1] = this.__zoom.invert(y.touch0[0]);
      else if (y.end(), y.taps === 2 && (R = wt(R, this), Math.hypot(c[0] - R[0], c[1] - R[1]) < w)) {
        var I = lt(this).on("dblclick.zoom");
        I && I.apply(this, arguments);
      }
    }
  }
  return m.wheelDelta = function(p) {
    return arguments.length ? (i = typeof p == "function" ? p : cn(+p), m) : i;
  }, m.filter = function(p) {
    return arguments.length ? (t = typeof p == "function" ? p : cn(!!p), m) : t;
  }, m.touchable = function(p) {
    return arguments.length ? (r = typeof p == "function" ? p : cn(!!p), m) : r;
  }, m.extent = function(p) {
    return arguments.length ? (n = typeof p == "function" ? p : cn([[+p[0][0], +p[0][1]], [+p[1][0], +p[1][1]]]), m) : n;
  }, m.scaleExtent = function(p) {
    return arguments.length ? (o[0] = +p[0], o[1] = +p[1], m) : [o[0], o[1]];
  }, m.translateExtent = function(p) {
    return arguments.length ? (u[0][0] = +p[0][0], u[1][0] = +p[1][0], u[0][1] = +p[0][1], u[1][1] = +p[1][1], m) : [[u[0][0], u[0][1]], [u[1][0], u[1][1]]];
  }, m.constrain = function(p) {
    return arguments.length ? (e = p, m) : e;
  }, m.duration = function(p) {
    return arguments.length ? (a = +p, m) : a;
  }, m.interpolate = function(p) {
    return arguments.length ? (f = p, m) : f;
  }, m.on = function() {
    var p = l.on.apply(l, arguments);
    return p === l ? m : p;
  }, m.clickDistance = function(p) {
    return arguments.length ? (x = (p = +p) * p, m) : Math.sqrt(x);
  }, m.tapDistance = function(p) {
    return arguments.length ? (w = +p, m) : w;
  }, m;
}
function Da(t) {
  return t;
}
function La(t) {
  if (t == null) return Da;
  var n, e, i = t.scale[0], r = t.scale[1], o = t.translate[0], u = t.translate[1];
  return function(a, f) {
    f || (n = e = 0);
    var l = 2, s = a.length, c = new Array(s);
    for (c[0] = (n += a[0]) * i + o, c[1] = (e += a[1]) * r + u; l < s; ) c[l] = a[l], ++l;
    return c;
  };
}
function Xa(t, n) {
  for (var e, i = t.length, r = i - n; r < --i; ) e = t[r], t[r++] = t[i], t[i] = e;
}
function qa(t, n) {
  return typeof n == "string" && (n = t.objects[n]), n.type === "GeometryCollection" ? { type: "FeatureCollection", features: n.geometries.map(function(e) {
    return Ze(t, e);
  }) } : Ze(t, n);
}
function Ze(t, n) {
  var e = n.id, i = n.bbox, r = n.properties == null ? {} : n.properties, o = Ha(t, n);
  return e == null && i == null ? { type: "Feature", properties: r, geometry: o } : i == null ? { type: "Feature", id: e, properties: r, geometry: o } : { type: "Feature", id: e, bbox: i, properties: r, geometry: o };
}
function Ha(t, n) {
  var e = La(t.transform), i = t.arcs;
  function r(s, c) {
    c.length && c.pop();
    for (var h = i[s < 0 ? ~s : s], d = 0, v = h.length; d < v; ++d)
      c.push(e(h[d], d));
    s < 0 && Xa(c, v);
  }
  function o(s) {
    return e(s);
  }
  function u(s) {
    for (var c = [], h = 0, d = s.length; h < d; ++h) r(s[h], c);
    return c.length < 2 && c.push(c[0]), c;
  }
  function a(s) {
    for (var c = u(s); c.length < 4; ) c.push(c[0]);
    return c;
  }
  function f(s) {
    return s.map(a);
  }
  function l(s) {
    var c = s.type, h;
    switch (c) {
      case "GeometryCollection":
        return { type: c, geometries: s.geometries.map(l) };
      case "Point":
        h = o(s.coordinates);
        break;
      case "MultiPoint":
        h = s.coordinates.map(o);
        break;
      case "LineString":
        h = u(s.arcs);
        break;
      case "MultiLineString":
        h = s.arcs.map(u);
        break;
      case "Polygon":
        h = f(s.arcs);
        break;
      case "MultiPolygon":
        h = s.arcs.map(f);
        break;
      default:
        return null;
    }
    return { type: c, coordinates: h };
  }
  return l(n);
}
const Vt = /* @__PURE__ */ new Map(), Hn = /* @__PURE__ */ new Map();
async function Ba(t) {
  const n = Vt.get(t);
  if (n) return n;
  const e = Hn.get(t);
  if (e) return e;
  const i = (async () => {
    const r = await fetch(t);
    if (!r.ok)
      throw new Error(`Failed to fetch ${t}: ${r.status} ${r.statusText}`);
    const o = await r.json(), u = Object.keys(o.objects)[0], a = qa(o, o.objects[u]);
    return Vt.set(t, a), a;
  })();
  Hn.set(t, i);
  try {
    return await i;
  } finally {
    Hn.delete(t);
  }
}
function Bn(t) {
  const [n, e] = Rt(0), [i, r] = Rt(() => {
    if (!t) return { status: "idle" };
    const u = Vt.get(t);
    return u ? { status: "ready", data: u } : { status: "loading" };
  });
  _e(() => {
    if (!t) {
      r({ status: "idle" });
      return;
    }
    const u = Vt.get(t);
    if (u) {
      r({ status: "ready", data: u });
      return;
    }
    let a = !1;
    return r({ status: "loading" }), Ba(t).then((f) => {
      a || r({ status: "ready", data: f });
    }).catch((f) => {
      a || r({ status: "error", error: f instanceof Error ? f : new Error(String(f)) });
    }), () => {
      a = !0;
    };
  }, [t, n]);
  const o = ct(() => {
    t && Vt.delete(t), e((u) => u + 1);
  }, [t]);
  return [i, o];
}
class bt {
  constructor() {
    this._partials = new Float64Array(32), this._n = 0;
  }
  add(n) {
    const e = this._partials;
    let i = 0;
    for (let r = 0; r < this._n && r < 32; r++) {
      const o = e[r], u = n + o, a = Math.abs(n) < Math.abs(o) ? n - (u - o) : o - (u - n);
      a && (e[i++] = a), n = u;
    }
    return e[i] = n, this._n = i + 1, this;
  }
  valueOf() {
    const n = this._partials;
    let e = this._n, i, r, o, u = 0;
    if (e > 0) {
      for (u = n[--e]; e > 0 && (i = u, r = n[--e], u = i + r, o = r - (u - i), !o); )
        ;
      e > 0 && (o < 0 && n[e - 1] < 0 || o > 0 && n[e - 1] > 0) && (r = o * 2, i = u + r, r == i - u && (u = i));
    }
    return u;
  }
}
function* Oa(t) {
  for (const n of t)
    yield* n;
}
function Yi(t) {
  return Array.from(Oa(t));
}
var q = 1e-6, D = Math.PI, j = D / 2, Je = D / 4, et = D * 2, tt = 180 / D, W = D / 180, O = Math.abs, Vi = Math.atan, Jt = Math.atan2, G = Math.cos, Ya = Math.exp, Va = Math.log, K = Math.sin, Ua = Math.sign || function(t) {
  return t > 0 ? 1 : t < 0 ? -1 : 0;
}, Nt = Math.sqrt, Ga = Math.tan;
function Ka(t) {
  return t > 1 ? 0 : t < -1 ? D : Math.acos(t);
}
function Qt(t) {
  return t > 1 ? j : t < -1 ? -j : Math.asin(t);
}
function rt() {
}
function $n(t, n) {
  t && je.hasOwnProperty(t.type) && je[t.type](t, n);
}
var Qe = {
  Feature: function(t, n) {
    $n(t.geometry, n);
  },
  FeatureCollection: function(t, n) {
    for (var e = t.features, i = -1, r = e.length; ++i < r; ) $n(e[i].geometry, n);
  }
}, je = {
  Sphere: function(t, n) {
    n.sphere();
  },
  Point: function(t, n) {
    t = t.coordinates, n.point(t[0], t[1], t[2]);
  },
  MultiPoint: function(t, n) {
    for (var e = t.coordinates, i = -1, r = e.length; ++i < r; ) t = e[i], n.point(t[0], t[1], t[2]);
  },
  LineString: function(t, n) {
    re(t.coordinates, n, 0);
  },
  MultiLineString: function(t, n) {
    for (var e = t.coordinates, i = -1, r = e.length; ++i < r; ) re(e[i], n, 0);
  },
  Polygon: function(t, n) {
    ti(t.coordinates, n);
  },
  MultiPolygon: function(t, n) {
    for (var e = t.coordinates, i = -1, r = e.length; ++i < r; ) ti(e[i], n);
  },
  GeometryCollection: function(t, n) {
    for (var e = t.geometries, i = -1, r = e.length; ++i < r; ) $n(e[i], n);
  }
};
function re(t, n, e) {
  var i = -1, r = t.length - e, o;
  for (n.lineStart(); ++i < r; ) o = t[i], n.point(o[0], o[1], o[2]);
  n.lineEnd();
}
function ti(t, n) {
  var e = -1, i = t.length;
  for (n.polygonStart(); ++e < i; ) re(t[e], n, 1);
  n.polygonEnd();
}
function $t(t, n) {
  t && Qe.hasOwnProperty(t.type) ? Qe[t.type](t, n) : $n(t, n);
}
function oe(t) {
  return [Jt(t[1], t[0]), Qt(t[2])];
}
function Pt(t) {
  var n = t[0], e = t[1], i = G(e);
  return [i * G(n), i * K(n), K(e)];
}
function ln(t, n) {
  return t[0] * n[0] + t[1] * n[1] + t[2] * n[2];
}
function kn(t, n) {
  return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]];
}
function On(t, n) {
  t[0] += n[0], t[1] += n[1], t[2] += n[2];
}
function fn(t, n) {
  return [t[0] * n, t[1] * n, t[2] * n];
}
function ue(t) {
  var n = Nt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
  t[0] /= n, t[1] /= n, t[2] /= n;
}
function ae(t, n) {
  function e(i, r) {
    return i = t(i, r), n(i[0], i[1]);
  }
  return t.invert && n.invert && (e.invert = function(i, r) {
    return i = n.invert(i, r), i && t.invert(i[0], i[1]);
  }), e;
}
function se(t, n) {
  return O(t) > D && (t -= Math.round(t / et) * et), [t, n];
}
se.invert = se;
function Ui(t, n, e) {
  return (t %= et) ? n || e ? ae(ei(t), ii(n, e)) : ei(t) : n || e ? ii(n, e) : se;
}
function ni(t) {
  return function(n, e) {
    return n += t, O(n) > D && (n -= Math.round(n / et) * et), [n, e];
  };
}
function ei(t) {
  var n = ni(t);
  return n.invert = ni(-t), n;
}
function ii(t, n) {
  var e = G(t), i = K(t), r = G(n), o = K(n);
  function u(a, f) {
    var l = G(f), s = G(a) * l, c = K(a) * l, h = K(f), d = h * e + s * i;
    return [
      Jt(c * r - d * o, s * e - h * i),
      Qt(d * r + c * o)
    ];
  }
  return u.invert = function(a, f) {
    var l = G(f), s = G(a) * l, c = K(a) * l, h = K(f), d = h * r - c * o;
    return [
      Jt(c * r + h * o, s * e + d * i),
      Qt(d * e - s * i)
    ];
  }, u;
}
function Wa(t) {
  t = Ui(t[0] * W, t[1] * W, t.length > 2 ? t[2] * W : 0);
  function n(e) {
    return e = t(e[0] * W, e[1] * W), e[0] *= tt, e[1] *= tt, e;
  }
  return n.invert = function(e) {
    return e = t.invert(e[0] * W, e[1] * W), e[0] *= tt, e[1] *= tt, e;
  }, n;
}
function Za(t, n, e, i, r, o) {
  if (e) {
    var u = G(n), a = K(n), f = i * e;
    r == null ? (r = n + i * et, o = n - f / 2) : (r = ri(u, r), o = ri(u, o), (i > 0 ? r < o : r > o) && (r += i * et));
    for (var l, s = r; i > 0 ? s > o : s < o; s -= f)
      l = oe([u, -a * G(s), -a * K(s)]), t.point(l[0], l[1]);
  }
}
function ri(t, n) {
  n = Pt(n), n[0] -= t, ue(n);
  var e = Ka(-n[1]);
  return ((-n[2] < 0 ? -e : e) + et - q) % et;
}
function Gi() {
  var t = [], n;
  return {
    point: function(e, i, r) {
      n.push([e, i, r]);
    },
    lineStart: function() {
      t.push(n = []);
    },
    lineEnd: rt,
    rejoin: function() {
      t.length > 1 && t.push(t.pop().concat(t.shift()));
    },
    result: function() {
      var e = t;
      return t = [], n = null, e;
    }
  };
}
function wn(t, n) {
  return O(t[0] - n[0]) < q && O(t[1] - n[1]) < q;
}
function hn(t, n, e, i) {
  this.x = t, this.z = n, this.o = e, this.e = i, this.v = !1, this.n = this.p = null;
}
function Ki(t, n, e, i, r) {
  var o = [], u = [], a, f;
  if (t.forEach(function(v) {
    if (!((x = v.length - 1) <= 0)) {
      var x, w = v[0], m = v[x], E;
      if (wn(w, m)) {
        if (!w[2] && !m[2]) {
          for (r.lineStart(), a = 0; a < x; ++a) r.point((w = v[a])[0], w[1]);
          r.lineEnd();
          return;
        }
        m[0] += 2 * q;
      }
      o.push(E = new hn(w, v, null, !0)), u.push(E.o = new hn(w, null, E, !1)), o.push(E = new hn(m, v, null, !1)), u.push(E.o = new hn(m, null, E, !0));
    }
  }), !!o.length) {
    for (u.sort(n), oi(o), oi(u), a = 0, f = u.length; a < f; ++a)
      u[a].e = e = !e;
    for (var l = o[0], s, c; ; ) {
      for (var h = l, d = !0; h.v; ) if ((h = h.n) === l) return;
      s = h.z, r.lineStart();
      do {
        if (h.v = h.o.v = !0, h.e) {
          if (d)
            for (a = 0, f = s.length; a < f; ++a) r.point((c = s[a])[0], c[1]);
          else
            i(h.x, h.n.x, 1, r);
          h = h.n;
        } else {
          if (d)
            for (s = h.p.z, a = s.length - 1; a >= 0; --a) r.point((c = s[a])[0], c[1]);
          else
            i(h.x, h.p.x, -1, r);
          h = h.p;
        }
        h = h.o, s = h.z, d = !d;
      } while (!h.v);
      r.lineEnd();
    }
  }
}
function oi(t) {
  if (n = t.length) {
    for (var n, e = 0, i = t[0], r; ++e < n; )
      i.n = r = t[e], r.p = i, i = r;
    i.n = r = t[0], r.p = i;
  }
}
function Yn(t) {
  return O(t[0]) <= D ? t[0] : Ua(t[0]) * ((O(t[0]) + D) % et - D);
}
function Ja(t, n) {
  var e = Yn(n), i = n[1], r = K(i), o = [K(e), -G(e), 0], u = 0, a = 0, f = new bt();
  r === 1 ? i = j + q : r === -1 && (i = -j - q);
  for (var l = 0, s = t.length; l < s; ++l)
    if (h = (c = t[l]).length)
      for (var c, h, d = c[h - 1], v = Yn(d), x = d[1] / 2 + Je, w = K(x), m = G(x), E = 0; E < h; ++E, v = S, w = $, m = T, d = N) {
        var N = c[E], S = Yn(N), M = N[1] / 2 + Je, $ = K(M), T = G(M), z = S - v, C = z >= 0 ? 1 : -1, P = C * z, A = P > D, Z = w * $;
        if (f.add(Jt(Z * C * K(P), m * T + Z * G(P))), u += A ? z + C * et : z, A ^ v >= e ^ S >= e) {
          var X = kn(Pt(d), Pt(N));
          ue(X);
          var p = kn(o, X);
          ue(p);
          var g = (A ^ z >= 0 ? -1 : 1) * Qt(p[2]);
          (i > g || i === g && (X[0] || X[1])) && (a += A ^ z >= 0 ? 1 : -1);
        }
      }
  return (u < -q || u < q && f < -1e-12) ^ a & 1;
}
function Wi(t, n, e, i) {
  return function(r) {
    var o = n(r), u = Gi(), a = n(u), f = !1, l, s, c, h = {
      point: d,
      lineStart: x,
      lineEnd: w,
      polygonStart: function() {
        h.point = m, h.lineStart = E, h.lineEnd = N, s = [], l = [];
      },
      polygonEnd: function() {
        h.point = d, h.lineStart = x, h.lineEnd = w, s = Yi(s);
        var S = Ja(l, i);
        s.length ? (f || (r.polygonStart(), f = !0), Ki(s, ja, S, e, r)) : S && (f || (r.polygonStart(), f = !0), r.lineStart(), e(null, null, 1, r), r.lineEnd()), f && (r.polygonEnd(), f = !1), s = l = null;
      },
      sphere: function() {
        r.polygonStart(), r.lineStart(), e(null, null, 1, r), r.lineEnd(), r.polygonEnd();
      }
    };
    function d(S, M) {
      t(S, M) && r.point(S, M);
    }
    function v(S, M) {
      o.point(S, M);
    }
    function x() {
      h.point = v, o.lineStart();
    }
    function w() {
      h.point = d, o.lineEnd();
    }
    function m(S, M) {
      c.push([S, M]), a.point(S, M);
    }
    function E() {
      a.lineStart(), c = [];
    }
    function N() {
      m(c[0][0], c[0][1]), a.lineEnd();
      var S = a.clean(), M = u.result(), $, T = M.length, z, C, P;
      if (c.pop(), l.push(c), c = null, !!T) {
        if (S & 1) {
          if (C = M[0], (z = C.length - 1) > 0) {
            for (f || (r.polygonStart(), f = !0), r.lineStart(), $ = 0; $ < z; ++$) r.point((P = C[$])[0], P[1]);
            r.lineEnd();
          }
          return;
        }
        T > 1 && S & 2 && M.push(M.pop().concat(M.shift())), s.push(M.filter(Qa));
      }
    }
    return h;
  };
}
function Qa(t) {
  return t.length > 1;
}
function ja(t, n) {
  return ((t = t.x)[0] < 0 ? t[1] - j - q : j - t[1]) - ((n = n.x)[0] < 0 ? n[1] - j - q : j - n[1]);
}
const ui = Wi(
  function() {
    return !0;
  },
  ts,
  es,
  [-D, -j]
);
function ts(t) {
  var n = NaN, e = NaN, i = NaN, r;
  return {
    lineStart: function() {
      t.lineStart(), r = 1;
    },
    point: function(o, u) {
      var a = o > 0 ? D : -D, f = O(o - n);
      O(f - D) < q ? (t.point(n, e = (e + u) / 2 > 0 ? j : -j), t.point(i, e), t.lineEnd(), t.lineStart(), t.point(a, e), t.point(o, e), r = 0) : i !== a && f >= D && (O(n - i) < q && (n -= i * q), O(o - a) < q && (o -= a * q), e = ns(n, e, o, u), t.point(i, e), t.lineEnd(), t.lineStart(), t.point(a, e), r = 0), t.point(n = o, e = u), i = a;
    },
    lineEnd: function() {
      t.lineEnd(), n = e = NaN;
    },
    clean: function() {
      return 2 - r;
    }
  };
}
function ns(t, n, e, i) {
  var r, o, u = K(t - e);
  return O(u) > q ? Vi((K(n) * (o = G(i)) * K(e) - K(i) * (r = G(n)) * K(t)) / (r * o * u)) : (n + i) / 2;
}
function es(t, n, e, i) {
  var r;
  if (t == null)
    r = e * j, i.point(-D, r), i.point(0, r), i.point(D, r), i.point(D, 0), i.point(D, -r), i.point(0, -r), i.point(-D, -r), i.point(-D, 0), i.point(-D, r);
  else if (O(t[0] - n[0]) > q) {
    var o = t[0] < n[0] ? D : -D;
    r = e * o / 2, i.point(-o, r), i.point(0, r), i.point(o, r);
  } else
    i.point(n[0], n[1]);
}
function is(t) {
  var n = G(t), e = 2 * W, i = n > 0, r = O(n) > q;
  function o(s, c, h, d) {
    Za(d, t, e, h, s, c);
  }
  function u(s, c) {
    return G(s) * G(c) > n;
  }
  function a(s) {
    var c, h, d, v, x;
    return {
      lineStart: function() {
        v = d = !1, x = 1;
      },
      point: function(w, m) {
        var E = [w, m], N, S = u(w, m), M = i ? S ? 0 : l(w, m) : S ? l(w + (w < 0 ? D : -D), m) : 0;
        if (!c && (v = d = S) && s.lineStart(), S !== d && (N = f(c, E), (!N || wn(c, N) || wn(E, N)) && (E[2] = 1)), S !== d)
          x = 0, S ? (s.lineStart(), N = f(E, c), s.point(N[0], N[1])) : (N = f(c, E), s.point(N[0], N[1], 2), s.lineEnd()), c = N;
        else if (r && c && i ^ S) {
          var $;
          !(M & h) && ($ = f(E, c, !0)) && (x = 0, i ? (s.lineStart(), s.point($[0][0], $[0][1]), s.point($[1][0], $[1][1]), s.lineEnd()) : (s.point($[1][0], $[1][1]), s.lineEnd(), s.lineStart(), s.point($[0][0], $[0][1], 3)));
        }
        S && (!c || !wn(c, E)) && s.point(E[0], E[1]), c = E, d = S, h = M;
      },
      lineEnd: function() {
        d && s.lineEnd(), c = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return x | (v && d) << 1;
      }
    };
  }
  function f(s, c, h) {
    var d = Pt(s), v = Pt(c), x = [1, 0, 0], w = kn(d, v), m = ln(w, w), E = w[0], N = m - E * E;
    if (!N) return !h && s;
    var S = n * m / N, M = -n * E / N, $ = kn(x, w), T = fn(x, S), z = fn(w, M);
    On(T, z);
    var C = $, P = ln(T, C), A = ln(C, C), Z = P * P - A * (ln(T, T) - 1);
    if (!(Z < 0)) {
      var X = Nt(Z), p = fn(C, (-P - X) / A);
      if (On(p, T), p = oe(p), !h) return p;
      var g = s[0], y = c[0], _ = s[1], b = c[1], k;
      y < g && (k = g, g = y, y = k);
      var R = y - g, I = O(R - D) < q, L = I || R < q;
      if (!I && b < _ && (k = _, _ = b, b = k), L ? I ? _ + b > 0 ^ p[1] < (O(p[0] - g) < q ? _ : b) : _ <= p[1] && p[1] <= b : R > D ^ (g <= p[0] && p[0] <= y)) {
        var B = fn(C, (-P + X) / A);
        return On(B, T), [p, oe(B)];
      }
    }
  }
  function l(s, c) {
    var h = i ? t : D - t, d = 0;
    return s < -h ? d |= 1 : s > h && (d |= 2), c < -h ? d |= 4 : c > h && (d |= 8), d;
  }
  return Wi(u, a, o, i ? [0, -t] : [-D, t - D]);
}
function rs(t, n, e, i, r, o) {
  var u = t[0], a = t[1], f = n[0], l = n[1], s = 0, c = 1, h = f - u, d = l - a, v;
  if (v = e - u, !(!h && v > 0)) {
    if (v /= h, h < 0) {
      if (v < s) return;
      v < c && (c = v);
    } else if (h > 0) {
      if (v > c) return;
      v > s && (s = v);
    }
    if (v = r - u, !(!h && v < 0)) {
      if (v /= h, h < 0) {
        if (v > c) return;
        v > s && (s = v);
      } else if (h > 0) {
        if (v < s) return;
        v < c && (c = v);
      }
      if (v = i - a, !(!d && v > 0)) {
        if (v /= d, d < 0) {
          if (v < s) return;
          v < c && (c = v);
        } else if (d > 0) {
          if (v > c) return;
          v > s && (s = v);
        }
        if (v = o - a, !(!d && v < 0)) {
          if (v /= d, d < 0) {
            if (v > c) return;
            v > s && (s = v);
          } else if (d > 0) {
            if (v < s) return;
            v < c && (c = v);
          }
          return s > 0 && (t[0] = u + s * h, t[1] = a + s * d), c < 1 && (n[0] = u + c * h, n[1] = a + c * d), !0;
        }
      }
    }
  }
}
var qt = 1e9, pn = -qt;
function os(t, n, e, i) {
  function r(l, s) {
    return t <= l && l <= e && n <= s && s <= i;
  }
  function o(l, s, c, h) {
    var d = 0, v = 0;
    if (l == null || (d = u(l, c)) !== (v = u(s, c)) || f(l, s) < 0 ^ c > 0)
      do
        h.point(d === 0 || d === 3 ? t : e, d > 1 ? i : n);
      while ((d = (d + c + 4) % 4) !== v);
    else
      h.point(s[0], s[1]);
  }
  function u(l, s) {
    return O(l[0] - t) < q ? s > 0 ? 0 : 3 : O(l[0] - e) < q ? s > 0 ? 2 : 1 : O(l[1] - n) < q ? s > 0 ? 1 : 0 : s > 0 ? 3 : 2;
  }
  function a(l, s) {
    return f(l.x, s.x);
  }
  function f(l, s) {
    var c = u(l, 1), h = u(s, 1);
    return c !== h ? c - h : c === 0 ? s[1] - l[1] : c === 1 ? l[0] - s[0] : c === 2 ? l[1] - s[1] : s[0] - l[0];
  }
  return function(l) {
    var s = l, c = Gi(), h, d, v, x, w, m, E, N, S, M, $, T = {
      point: z,
      lineStart: Z,
      lineEnd: X,
      polygonStart: P,
      polygonEnd: A
    };
    function z(g, y) {
      r(g, y) && s.point(g, y);
    }
    function C() {
      for (var g = 0, y = 0, _ = d.length; y < _; ++y)
        for (var b = d[y], k = 1, R = b.length, I = b[0], L, B, H = I[0], V = I[1]; k < R; ++k)
          L = H, B = V, I = b[k], H = I[0], V = I[1], B <= i ? V > i && (H - L) * (i - B) > (V - B) * (t - L) && ++g : V <= i && (H - L) * (i - B) < (V - B) * (t - L) && --g;
      return g;
    }
    function P() {
      s = c, h = [], d = [], $ = !0;
    }
    function A() {
      var g = C(), y = $ && g, _ = (h = Yi(h)).length;
      (y || _) && (l.polygonStart(), y && (l.lineStart(), o(null, null, 1, l), l.lineEnd()), _ && Ki(h, a, g, o, l), l.polygonEnd()), s = l, h = d = v = null;
    }
    function Z() {
      T.point = p, d && d.push(v = []), M = !0, S = !1, E = N = NaN;
    }
    function X() {
      h && (p(x, w), m && S && c.rejoin(), h.push(c.result())), T.point = z, S && s.lineEnd();
    }
    function p(g, y) {
      var _ = r(g, y);
      if (d && v.push([g, y]), M)
        x = g, w = y, m = _, M = !1, _ && (s.lineStart(), s.point(g, y));
      else if (_ && S) s.point(g, y);
      else {
        var b = [E = Math.max(pn, Math.min(qt, E)), N = Math.max(pn, Math.min(qt, N))], k = [g = Math.max(pn, Math.min(qt, g)), y = Math.max(pn, Math.min(qt, y))];
        rs(b, k, t, n, e, i) ? (S || (s.lineStart(), s.point(b[0], b[1])), s.point(k[0], k[1]), _ || s.lineEnd(), $ = !1) : _ && (s.lineStart(), s.point(g, y), $ = !1);
      }
      E = g, N = y, S = _;
    }
    return T;
  };
}
const ce = (t) => t;
var Vn = new bt(), le = new bt(), Zi, Ji, fe, he, yt = {
  point: rt,
  lineStart: rt,
  lineEnd: rt,
  polygonStart: function() {
    yt.lineStart = us, yt.lineEnd = ss;
  },
  polygonEnd: function() {
    yt.lineStart = yt.lineEnd = yt.point = rt, Vn.add(O(le)), le = new bt();
  },
  result: function() {
    var t = Vn / 2;
    return Vn = new bt(), t;
  }
};
function us() {
  yt.point = as;
}
function as(t, n) {
  yt.point = Qi, Zi = fe = t, Ji = he = n;
}
function Qi(t, n) {
  le.add(he * t - fe * n), fe = t, he = n;
}
function ss() {
  Qi(Zi, Ji);
}
var It = 1 / 0, An = It, jt = -It, Rn = jt, zn = {
  point: cs,
  lineStart: rt,
  lineEnd: rt,
  polygonStart: rt,
  polygonEnd: rt,
  result: function() {
    var t = [[It, An], [jt, Rn]];
    return jt = Rn = -(An = It = 1 / 0), t;
  }
};
function cs(t, n) {
  t < It && (It = t), t > jt && (jt = t), n < An && (An = n), n > Rn && (Rn = n);
}
var pe = 0, de = 0, Ht = 0, Tn = 0, Cn = 0, kt = 0, ge = 0, ye = 0, Bt = 0, ji, tr, ft, ht, it = {
  point: Mt,
  lineStart: ai,
  lineEnd: si,
  polygonStart: function() {
    it.lineStart = hs, it.lineEnd = ps;
  },
  polygonEnd: function() {
    it.point = Mt, it.lineStart = ai, it.lineEnd = si;
  },
  result: function() {
    var t = Bt ? [ge / Bt, ye / Bt] : kt ? [Tn / kt, Cn / kt] : Ht ? [pe / Ht, de / Ht] : [NaN, NaN];
    return pe = de = Ht = Tn = Cn = kt = ge = ye = Bt = 0, t;
  }
};
function Mt(t, n) {
  pe += t, de += n, ++Ht;
}
function ai() {
  it.point = ls;
}
function ls(t, n) {
  it.point = fs, Mt(ft = t, ht = n);
}
function fs(t, n) {
  var e = t - ft, i = n - ht, r = Nt(e * e + i * i);
  Tn += r * (ft + t) / 2, Cn += r * (ht + n) / 2, kt += r, Mt(ft = t, ht = n);
}
function si() {
  it.point = Mt;
}
function hs() {
  it.point = ds;
}
function ps() {
  nr(ji, tr);
}
function ds(t, n) {
  it.point = nr, Mt(ji = ft = t, tr = ht = n);
}
function nr(t, n) {
  var e = t - ft, i = n - ht, r = Nt(e * e + i * i);
  Tn += r * (ft + t) / 2, Cn += r * (ht + n) / 2, kt += r, r = ht * t - ft * n, ge += r * (ft + t), ye += r * (ht + n), Bt += r * 3, Mt(ft = t, ht = n);
}
function er(t) {
  this._context = t;
}
er.prototype = {
  _radius: 4.5,
  pointRadius: function(t) {
    return this._radius = t, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._line === 0 && this._context.closePath(), this._point = NaN;
  },
  point: function(t, n) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(t, n), this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(t, n);
        break;
      }
      default: {
        this._context.moveTo(t + this._radius, n), this._context.arc(t, n, this._radius, 0, et);
        break;
      }
    }
  },
  result: rt
};
var ve = new bt(), Un, ir, rr, Ot, Yt, tn = {
  point: rt,
  lineStart: function() {
    tn.point = gs;
  },
  lineEnd: function() {
    Un && or(ir, rr), tn.point = rt;
  },
  polygonStart: function() {
    Un = !0;
  },
  polygonEnd: function() {
    Un = null;
  },
  result: function() {
    var t = +ve;
    return ve = new bt(), t;
  }
};
function gs(t, n) {
  tn.point = or, ir = Ot = t, rr = Yt = n;
}
function or(t, n) {
  Ot -= t, Yt -= n, ve.add(Nt(Ot * Ot + Yt * Yt)), Ot = t, Yt = n;
}
let ci, Pn, li, fi;
class hi {
  constructor(n) {
    this._append = n == null ? ur : ys(n), this._radius = 4.5, this._ = "";
  }
  pointRadius(n) {
    return this._radius = +n, this;
  }
  polygonStart() {
    this._line = 0;
  }
  polygonEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    this._line === 0 && (this._ += "Z"), this._point = NaN;
  }
  point(n, e) {
    switch (this._point) {
      case 0: {
        this._append`M${n},${e}`, this._point = 1;
        break;
      }
      case 1: {
        this._append`L${n},${e}`;
        break;
      }
      default: {
        if (this._append`M${n},${e}`, this._radius !== li || this._append !== Pn) {
          const i = this._radius, r = this._;
          this._ = "", this._append`m0,${i}a${i},${i} 0 1,1 0,${-2 * i}a${i},${i} 0 1,1 0,${2 * i}z`, li = i, Pn = this._append, fi = this._, this._ = r;
        }
        this._ += fi;
        break;
      }
    }
  }
  result() {
    const n = this._;
    return this._ = "", n.length ? n : null;
  }
}
function ur(t) {
  let n = 1;
  this._ += t[0];
  for (const e = t.length; n < e; ++n)
    this._ += arguments[n] + t[n];
}
function ys(t) {
  const n = Math.floor(t);
  if (!(n >= 0)) throw new RangeError(`invalid digits: ${t}`);
  if (n > 15) return ur;
  if (n !== ci) {
    const e = 10 ** n;
    ci = n, Pn = function(r) {
      let o = 1;
      this._ += r[0];
      for (const u = r.length; o < u; ++o)
        this._ += Math.round(arguments[o] * e) / e + r[o];
    };
  }
  return Pn;
}
function vs(t, n) {
  let e = 3, i = 4.5, r, o;
  function u(a) {
    return a && (typeof i == "function" && o.pointRadius(+i.apply(this, arguments)), $t(a, r(o))), o.result();
  }
  return u.area = function(a) {
    return $t(a, r(yt)), yt.result();
  }, u.measure = function(a) {
    return $t(a, r(tn)), tn.result();
  }, u.bounds = function(a) {
    return $t(a, r(zn)), zn.result();
  }, u.centroid = function(a) {
    return $t(a, r(it)), it.result();
  }, u.projection = function(a) {
    return arguments.length ? (r = a == null ? (t = null, ce) : (t = a).stream, u) : t;
  }, u.context = function(a) {
    return arguments.length ? (o = a == null ? (n = null, new hi(e)) : new er(n = a), typeof i != "function" && o.pointRadius(i), u) : n;
  }, u.pointRadius = function(a) {
    return arguments.length ? (i = typeof a == "function" ? a : (o.pointRadius(+a), +a), u) : i;
  }, u.digits = function(a) {
    if (!arguments.length) return e;
    if (a == null) e = null;
    else {
      const f = Math.floor(a);
      if (!(f >= 0)) throw new RangeError(`invalid digits: ${a}`);
      e = f;
    }
    return n === null && (o = new hi(e)), u;
  }, u.projection(t).digits(e).context(n);
}
function $e(t) {
  return function(n) {
    var e = new me();
    for (var i in t) e[i] = t[i];
    return e.stream = n, e;
  };
}
function me() {
}
me.prototype = {
  constructor: me,
  point: function(t, n) {
    this.stream.point(t, n);
  },
  sphere: function() {
    this.stream.sphere();
  },
  lineStart: function() {
    this.stream.lineStart();
  },
  lineEnd: function() {
    this.stream.lineEnd();
  },
  polygonStart: function() {
    this.stream.polygonStart();
  },
  polygonEnd: function() {
    this.stream.polygonEnd();
  }
};
function ke(t, n, e) {
  var i = t.clipExtent && t.clipExtent();
  return t.scale(150).translate([0, 0]), i != null && t.clipExtent(null), $t(e, t.stream(zn)), n(zn.result()), i != null && t.clipExtent(i), t;
}
function ar(t, n, e) {
  return ke(t, function(i) {
    var r = n[1][0] - n[0][0], o = n[1][1] - n[0][1], u = Math.min(r / (i[1][0] - i[0][0]), o / (i[1][1] - i[0][1])), a = +n[0][0] + (r - u * (i[1][0] + i[0][0])) / 2, f = +n[0][1] + (o - u * (i[1][1] + i[0][1])) / 2;
    t.scale(150 * u).translate([a, f]);
  }, e);
}
function ms(t, n, e) {
  return ar(t, [[0, 0], n], e);
}
function _s(t, n, e) {
  return ke(t, function(i) {
    var r = +n, o = r / (i[1][0] - i[0][0]), u = (r - o * (i[1][0] + i[0][0])) / 2, a = -o * i[0][1];
    t.scale(150 * o).translate([u, a]);
  }, e);
}
function ws(t, n, e) {
  return ke(t, function(i) {
    var r = +n, o = r / (i[1][1] - i[0][1]), u = -o * i[0][0], a = (r - o * (i[1][1] + i[0][1])) / 2;
    t.scale(150 * o).translate([u, a]);
  }, e);
}
var pi = 16, xs = G(30 * W);
function di(t, n) {
  return +n ? Es(t, n) : Ss(t);
}
function Ss(t) {
  return $e({
    point: function(n, e) {
      n = t(n, e), this.stream.point(n[0], n[1]);
    }
  });
}
function Es(t, n) {
  function e(i, r, o, u, a, f, l, s, c, h, d, v, x, w) {
    var m = l - i, E = s - r, N = m * m + E * E;
    if (N > 4 * n && x--) {
      var S = u + h, M = a + d, $ = f + v, T = Nt(S * S + M * M + $ * $), z = Qt($ /= T), C = O(O($) - 1) < q || O(o - c) < q ? (o + c) / 2 : Jt(M, S), P = t(C, z), A = P[0], Z = P[1], X = A - i, p = Z - r, g = E * X - m * p;
      (g * g / N > n || O((m * X + E * p) / N - 0.5) > 0.3 || u * h + a * d + f * v < xs) && (e(i, r, o, u, a, f, A, Z, C, S /= T, M /= T, $, x, w), w.point(A, Z), e(A, Z, C, S, M, $, l, s, c, h, d, v, x, w));
    }
  }
  return function(i) {
    var r, o, u, a, f, l, s, c, h, d, v, x, w = {
      point: m,
      lineStart: E,
      lineEnd: S,
      polygonStart: function() {
        i.polygonStart(), w.lineStart = M;
      },
      polygonEnd: function() {
        i.polygonEnd(), w.lineStart = E;
      }
    };
    function m(z, C) {
      z = t(z, C), i.point(z[0], z[1]);
    }
    function E() {
      c = NaN, w.point = N, i.lineStart();
    }
    function N(z, C) {
      var P = Pt([z, C]), A = t(z, C);
      e(c, h, s, d, v, x, c = A[0], h = A[1], s = z, d = P[0], v = P[1], x = P[2], pi, i), i.point(c, h);
    }
    function S() {
      w.point = m, i.lineEnd();
    }
    function M() {
      E(), w.point = $, w.lineEnd = T;
    }
    function $(z, C) {
      N(r = z, C), o = c, u = h, a = d, f = v, l = x, w.point = N;
    }
    function T() {
      e(c, h, s, d, v, x, o, u, r, a, f, l, pi, i), w.lineEnd = S, S();
    }
    return w;
  };
}
var bs = $e({
  point: function(t, n) {
    this.stream.point(t * W, n * W);
  }
});
function Ms(t) {
  return $e({
    point: function(n, e) {
      var i = t(n, e);
      return this.stream.point(i[0], i[1]);
    }
  });
}
function Ns(t, n, e, i, r) {
  function o(u, a) {
    return u *= i, a *= r, [n + t * u, e - t * a];
  }
  return o.invert = function(u, a) {
    return [(u - n) / t * i, (e - a) / t * r];
  }, o;
}
function gi(t, n, e, i, r, o) {
  if (!o) return Ns(t, n, e, i, r);
  var u = G(o), a = K(o), f = u * t, l = a * t, s = u / t, c = a / t, h = (a * e - u * n) / t, d = (a * n + u * e) / t;
  function v(x, w) {
    return x *= i, w *= r, [f * x - l * w + n, e - l * x - f * w];
  }
  return v.invert = function(x, w) {
    return [i * (s * x - c * w + h), r * (d - c * x - s * w)];
  }, v;
}
function $s(t) {
  return ks(function() {
    return t;
  })();
}
function ks(t) {
  var n, e = 150, i = 480, r = 250, o = 0, u = 0, a = 0, f = 0, l = 0, s, c = 0, h = 1, d = 1, v = null, x = ui, w = null, m, E, N, S = ce, M = 0.5, $, T, z, C, P;
  function A(g) {
    return z(g[0] * W, g[1] * W);
  }
  function Z(g) {
    return g = z.invert(g[0], g[1]), g && [g[0] * tt, g[1] * tt];
  }
  A.stream = function(g) {
    return C && P === g ? C : C = bs(Ms(s)(x($(S(P = g)))));
  }, A.preclip = function(g) {
    return arguments.length ? (x = g, v = void 0, p()) : x;
  }, A.postclip = function(g) {
    return arguments.length ? (S = g, w = m = E = N = null, p()) : S;
  }, A.clipAngle = function(g) {
    return arguments.length ? (x = +g ? is(v = g * W) : (v = null, ui), p()) : v * tt;
  }, A.clipExtent = function(g) {
    return arguments.length ? (S = g == null ? (w = m = E = N = null, ce) : os(w = +g[0][0], m = +g[0][1], E = +g[1][0], N = +g[1][1]), p()) : w == null ? null : [[w, m], [E, N]];
  }, A.scale = function(g) {
    return arguments.length ? (e = +g, X()) : e;
  }, A.translate = function(g) {
    return arguments.length ? (i = +g[0], r = +g[1], X()) : [i, r];
  }, A.center = function(g) {
    return arguments.length ? (o = g[0] % 360 * W, u = g[1] % 360 * W, X()) : [o * tt, u * tt];
  }, A.rotate = function(g) {
    return arguments.length ? (a = g[0] % 360 * W, f = g[1] % 360 * W, l = g.length > 2 ? g[2] % 360 * W : 0, X()) : [a * tt, f * tt, l * tt];
  }, A.angle = function(g) {
    return arguments.length ? (c = g % 360 * W, X()) : c * tt;
  }, A.reflectX = function(g) {
    return arguments.length ? (h = g ? -1 : 1, X()) : h < 0;
  }, A.reflectY = function(g) {
    return arguments.length ? (d = g ? -1 : 1, X()) : d < 0;
  }, A.precision = function(g) {
    return arguments.length ? ($ = di(T, M = g * g), p()) : Nt(M);
  }, A.fitExtent = function(g, y) {
    return ar(A, g, y);
  }, A.fitSize = function(g, y) {
    return ms(A, g, y);
  }, A.fitWidth = function(g, y) {
    return _s(A, g, y);
  }, A.fitHeight = function(g, y) {
    return ws(A, g, y);
  };
  function X() {
    var g = gi(e, 0, 0, h, d, c).apply(null, n(o, u)), y = gi(e, i - g[0], r - g[1], h, d, c);
    return s = Ui(a, f, l), T = ae(n, y), z = ae(s, T), $ = di(T, M), p();
  }
  function p() {
    return C = P = null, A;
  }
  return function() {
    return n = t.apply(this, arguments), A.invert = n.invert && Z, X();
  };
}
function Ae(t, n) {
  return [t, Va(Ga((j + n) / 2))];
}
Ae.invert = function(t, n) {
  return [t, 2 * Vi(Ya(n)) - j];
};
function As() {
  return Rs(Ae).scale(961 / et);
}
function Rs(t) {
  var n = $s(t), e = n.center, i = n.scale, r = n.translate, o = n.clipExtent, u = null, a, f, l;
  n.scale = function(c) {
    return arguments.length ? (i(c), s()) : i();
  }, n.translate = function(c) {
    return arguments.length ? (r(c), s()) : r();
  }, n.center = function(c) {
    return arguments.length ? (e(c), s()) : e();
  }, n.clipExtent = function(c) {
    return arguments.length ? (c == null ? u = a = f = l = null : (u = +c[0][0], a = +c[0][1], f = +c[1][0], l = +c[1][1]), s()) : u == null ? null : [[u, a], [f, l]];
  };
  function s() {
    var c = D * i(), h = n(Wa(n.rotate()).invert([0, 0]));
    return o(u == null ? [[h[0] - c, h[1] - c], [h[0] + c, h[1] + c]] : t === Ae ? [[Math.max(h[0] - c, u), a], [Math.min(h[0] + c, f), l]] : [[u, Math.max(h[1] - c, a)], [f, Math.min(h[1] + c, l)]]);
  }
  return s();
}
function zs(t, n, e) {
  return As().fitSize([n, e], t);
}
function Ts(t) {
  return vs(t);
}
function Cs(t, n, e, i, r) {
  const o = t.bounds(n), [[u, a], [f, l]] = o, s = Math.max(f - u, 1e-6), c = Math.max(l - a, 1e-6), h = (u + f) / 2, d = (a + l) / 2, v = Math.min(r, 0.9 / Math.max(s / e, c / i));
  return new ut(v, e / 2 - v * h, i / 2 - v * d);
}
function Ps(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}
function Is(t, n, e, i = 750) {
  const r = lt(t), o = Oi(t), u = performance.now();
  function a(f) {
    const l = Math.min(1, (f - u) / i), s = Ps(l), c = new ut(
      o.k + (e.k - o.k) * s,
      o.x + (e.x - o.x) * s,
      o.y + (e.y - o.y) * s
    );
    n.transform(r, c), l < 1 && requestAnimationFrame(a);
  }
  requestAnimationFrame(a);
}
const Fs = "https://cdn.jsdelivr.net/gh/DebunkTech/kenya-map@v0.1.0/data", yi = 12;
function Ds(t) {
  const [n, e] = Rt({ width: 0, height: 0 });
  return _e(() => {
    const i = t.current;
    if (!i || typeof ResizeObserver > "u") return;
    const r = new ResizeObserver(([o]) => {
      if (!o) return;
      const { width: u, height: a } = o.contentRect;
      e({ width: u, height: a });
    });
    return r.observe(i), () => r.disconnect();
  }, [t]), n;
}
function At(t) {
  return t.properties;
}
function Gn(t, n) {
  if (!(!t || !n))
    return t.features.find((e) => At(e).code === n);
}
function Kn({
  features: t,
  path: n,
  opacity: e,
  interactive: i,
  focusable: r,
  onHover: o,
  onLeave: u,
  onActivate: a
}) {
  return /* @__PURE__ */ U("g", { opacity: e, style: { transition: "opacity 300ms ease" }, children: t.map((f) => {
    const l = At(f), s = n(f);
    return s ? /* @__PURE__ */ U(
      "path",
      {
        d: s,
        fill: "var(--kenya-map-fill, #d4d4d8)",
        stroke: "var(--kenya-map-stroke, #71717a)",
        strokeWidth: 0.75,
        tabIndex: r ? 0 : -1,
        role: "button",
        "aria-label": l.name,
        style: { cursor: i ? "pointer" : "default", outlineOffset: 2 },
        onMouseEnter: (c) => o(l.name, c.clientX, c.clientY),
        onMouseMove: (c) => o(l.name, c.clientX, c.clientY),
        onMouseLeave: u,
        onFocus: (c) => {
          const h = c.currentTarget.getBoundingClientRect();
          o(l.name, h.left + h.width / 2, h.top + h.height / 2);
        },
        onBlur: u,
        onClick: i ? () => a(f) : void 0,
        onKeyDown: (c) => {
          i && c.key === "Enter" && (c.preventDefault(), a(f));
        }
      },
      l.code
    ) : null;
  }) });
}
function dn({ children: t }) {
  return /* @__PURE__ */ U(
    "div",
    {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        fontSize: 14,
        color: "var(--kenya-map-stroke, #71717a)",
        textAlign: "center",
        padding: 16
      },
      children: t
    }
  );
}
function qs(t) {
  var L, B, H, V;
  const n = t.boundariesBaseUrl ?? Fs, [e, i] = Rt({}), r = t.selection !== void 0, o = r ? t.selection : e, u = rn(t.onSelect);
  u.current = t.onSelect;
  const a = ct(
    (F) => {
      var Y;
      r || i(F), (Y = u.current) == null || Y.call(u, F);
    },
    [r]
  ), f = rn(null), { width: l, height: s } = Ds(f), [c, h] = Bn(`${n}/counties.topojson`), [d, v] = Bn(
    o.county ? `${n}/constituencies.topojson` : null
  ), [x, w] = Bn(
    o.county ? `${n}/wards/${o.county}.topojson` : null
  ), m = c.status === "ready" ? c.data.features : [], E = on(() => d.status !== "ready" || !o.county ? [] : d.data.features.filter((F) => At(F).county_code === o.county), [d, o.county]), N = on(() => x.status !== "ready" || !o.constituency ? [] : x.data.features.filter((F) => At(F).constituency_code === o.constituency), [x, o.constituency]), S = on(() => c.status !== "ready" || l === 0 || s === 0 ? null : zs(c.data, l, s), [c, l, s]), M = on(() => S ? Ts(S) : null, [S]), $ = rn(null), T = rn(null), [z, C] = Rt(Zt);
  _e(() => {
    const F = $.current;
    if (!F || l === 0 || s === 0) return;
    const Y = Fa().scaleExtent([1, yi]).on("zoom", (J) => C(J.transform));
    return T.current = Y, lt(F).call(Y), () => {
      lt(F).on(".zoom", null);
    };
  }, [l, s]);
  const P = ct(
    (F) => {
      const Y = $.current, J = T.current;
      if (!Y || !J || !M) return;
      const mt = F ? Cs(M, F, l, s, yi) : Zt;
      Is(Y, J, mt);
    },
    [M, l, s]
  ), A = ct(
    (F) => {
      a({ county: At(F).code }), P(F);
    },
    [a, P]
  ), Z = ct(
    (F) => {
      a({ county: o.county, constituency: At(F).code }), P(F);
    },
    [a, P, o.county]
  ), X = ct(() => {
    o.county && (a({ county: o.county }), P(Gn(c.status === "ready" ? c.data : void 0, o.county)));
  }, [a, P, o.county, c]), p = ct(() => {
    a({}), P(void 0);
  }, [a, P]), g = ct(() => {
    o.constituency ? X() : o.county && p();
  }, [o.constituency, o.county, X, p]), [y, _] = Rt(null), b = ct((F, Y, J) => {
    const mt = f.current;
    if (!mt) return;
    const Re = mt.getBoundingClientRect();
    _({ name: F, x: Y - Re.left, y: J - Re.top });
  }, []), k = ct(() => _(null), []), R = (B = (L = Gn(c.status === "ready" ? c.data : void 0, o.county)) == null ? void 0 : L.properties) == null ? void 0 : B.name, I = (V = (H = Gn(
    d.status === "ready" ? d.data : void 0,
    o.constituency
  )) == null ? void 0 : H.properties) == null ? void 0 : V.name;
  return /* @__PURE__ */ st(
    "div",
    {
      ref: f,
      className: t.className,
      style: { position: "relative", width: "100%", height: "100%", minHeight: 300, ...t.style },
      onKeyDown: (F) => {
        F.key === "Escape" && (F.preventDefault(), g());
      },
      children: [
        /* @__PURE__ */ st(
          "div",
          {
            style: {
              position: "absolute",
              top: 8,
              left: 8,
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "sans-serif",
              fontSize: 13
            },
            children: [
              /* @__PURE__ */ st("nav", { "aria-label": "Breadcrumb", style: { display: "flex", alignItems: "center", gap: 4 }, children: [
                /* @__PURE__ */ U("button", { type: "button", onClick: p, style: vi(!o.county), children: "Kenya" }),
                o.county && /* @__PURE__ */ st(ze, { children: [
                  /* @__PURE__ */ U("span", { "aria-hidden": "true", children: "›" }),
                  /* @__PURE__ */ U(
                    "button",
                    {
                      type: "button",
                      onClick: X,
                      style: vi(!o.constituency),
                      children: R ?? o.county
                    }
                  )
                ] }),
                o.constituency && /* @__PURE__ */ st(ze, { children: [
                  /* @__PURE__ */ U("span", { "aria-hidden": "true", children: "›" }),
                  /* @__PURE__ */ U("span", { style: { fontWeight: 600 }, children: I ?? o.constituency })
                ] })
              ] }),
              (o.county || o.constituency) && /* @__PURE__ */ U("button", { type: "button", onClick: p, style: gn, children: "Reset" })
            ]
          }
        ),
        c.status === "loading" && /* @__PURE__ */ U(dn, { children: "Loading map…" }),
        c.status === "error" && /* @__PURE__ */ st(dn, { children: [
          "Failed to load county boundaries: ",
          c.error.message,
          /* @__PURE__ */ U("br", {}),
          /* @__PURE__ */ U("button", { type: "button", onClick: h, style: gn, children: "Retry" })
        ] }),
        o.county && d.status === "error" && /* @__PURE__ */ st(dn, { children: [
          "Failed to load constituency boundaries: ",
          d.error.message,
          /* @__PURE__ */ U("br", {}),
          /* @__PURE__ */ U("button", { type: "button", onClick: v, style: gn, children: "Retry" })
        ] }),
        o.constituency && x.status === "error" && /* @__PURE__ */ st(dn, { children: [
          "Failed to load ward boundaries: ",
          x.error.message,
          /* @__PURE__ */ U("br", {}),
          /* @__PURE__ */ U("button", { type: "button", onClick: w, style: gn, children: "Retry" })
        ] }),
        M && /* @__PURE__ */ st(
          "svg",
          {
            ref: $,
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${l} ${s}`,
            role: "img",
            "aria-label": "Map of Kenya",
            children: [
              /* @__PURE__ */ U("rect", { x: 0, y: 0, width: l, height: s, fill: "transparent" }),
              /* @__PURE__ */ st("g", { transform: `translate(${z.x},${z.y}) scale(${z.k})`, children: [
                /* @__PURE__ */ U(
                  Kn,
                  {
                    features: m,
                    path: M,
                    opacity: o.county ? 0.25 : 1,
                    interactive: !o.county,
                    focusable: !o.county,
                    onHover: b,
                    onLeave: k,
                    onActivate: A
                  }
                ),
                o.county && /* @__PURE__ */ U(
                  Kn,
                  {
                    features: E,
                    path: M,
                    opacity: o.constituency ? 0.25 : 1,
                    interactive: !o.constituency,
                    focusable: !o.constituency,
                    onHover: b,
                    onLeave: k,
                    onActivate: Z
                  }
                ),
                o.constituency && /* @__PURE__ */ U(
                  Kn,
                  {
                    features: N,
                    path: M,
                    opacity: 1,
                    interactive: !1,
                    focusable: !0,
                    onHover: b,
                    onLeave: k,
                    onActivate: () => {
                    }
                  }
                )
              ] })
            ]
          }
        ),
        y && /* @__PURE__ */ U(
          "div",
          {
            style: {
              position: "absolute",
              left: y.x + 12,
              top: y.y + 12,
              zIndex: 2,
              pointerEvents: "none",
              background: "var(--kenya-map-tooltip-bg, rgba(0,0,0,0.8))",
              color: "var(--kenya-map-tooltip-color, #fff)",
              padding: "4px 8px",
              borderRadius: 4,
              fontFamily: "sans-serif",
              fontSize: 12,
              whiteSpace: "nowrap"
            },
            children: y.name
          }
        )
      ]
    }
  );
}
function vi(t) {
  return {
    background: "none",
    border: "none",
    padding: 0,
    font: "inherit",
    color: t ? "inherit" : "var(--kenya-map-link, #2563eb)",
    fontWeight: t ? 600 : 400,
    cursor: t ? "default" : "pointer",
    textDecoration: t ? "none" : "underline"
  };
}
const gn = {
  font: "inherit",
  fontSize: 12,
  padding: "2px 8px",
  borderRadius: 4,
  border: "1px solid var(--kenya-map-stroke, #71717a)",
  background: "var(--kenya-map-fill, #fff)",
  cursor: "pointer"
};
export {
  qs as KenyaMap
};
//# sourceMappingURL=kenya-map.js.map
