import { jsx as C, jsxs as j, Fragment as yr } from "react/jsx-runtime";
import { useState as ft, useEffect as yt, useCallback as nt, useRef as Ft, useMemo as Et } from "react";
var xe = "http://www.w3.org/1999/xhtml";
const mr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xe,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ee(t) {
  var n = t += "", e = n.indexOf(":");
  return e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)), mr.hasOwnProperty(n) ? { space: mr[n], local: t } : t;
}
function vo(t) {
  return function() {
    var n = this.ownerDocument, e = this.namespaceURI;
    return e === xe && n.documentElement.namespaceURI === xe ? n.createElement(t) : n.createElementNS(e, t);
  };
}
function wo(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function li(t) {
  var n = ee(t);
  return (n.local ? wo : vo)(n);
}
function _o() {
}
function We(t) {
  return t == null ? _o : function() {
    return this.querySelector(t);
  };
}
function xo(t) {
  typeof t != "function" && (t = We(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], u = o.length, a = r[i] = new Array(u), f, c, s = 0; s < u; ++s)
      (f = o[s]) && (c = t.call(f, f.__data__, s, o)) && ("__data__" in f && (c.__data__ = f.__data__), a[s] = c);
  return new ut(r, this._parents);
}
function bo(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function So() {
  return [];
}
function fi(t) {
  return t == null ? So : function() {
    return this.querySelectorAll(t);
  };
}
function Mo(t) {
  return function() {
    return bo(t.apply(this, arguments));
  };
}
function ko(t) {
  typeof t == "function" ? t = Mo(t) : t = fi(t);
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var u = n[o], a = u.length, f, c = 0; c < a; ++c)
      (f = u[c]) && (r.push(t.call(f, f.__data__, c, u)), i.push(f));
  return new ut(r, i);
}
function hi(t) {
  return function() {
    return this.matches(t);
  };
}
function di(t) {
  return function(n) {
    return n.matches(t);
  };
}
var Eo = Array.prototype.find;
function No(t) {
  return function() {
    return Eo.call(this.children, t);
  };
}
function $o() {
  return this.firstElementChild;
}
function Ao(t) {
  return this.select(t == null ? $o : No(typeof t == "function" ? t : di(t)));
}
var zo = Array.prototype.filter;
function Ro() {
  return Array.from(this.children);
}
function Po(t) {
  return function() {
    return zo.call(this.children, t);
  };
}
function Co(t) {
  return this.selectAll(t == null ? Ro : Po(typeof t == "function" ? t : di(t)));
}
function To(t) {
  typeof t != "function" && (t = hi(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], u = o.length, a = r[i] = [], f, c = 0; c < u; ++c)
      (f = o[c]) && t.call(f, f.__data__, c, o) && a.push(f);
  return new ut(r, this._parents);
}
function pi(t) {
  return new Array(t.length);
}
function Io() {
  return new ut(this._enter || this._groups.map(pi), this._parents);
}
function Dn(t, n) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n;
}
Dn.prototype = {
  constructor: Dn,
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
function Fo(t) {
  return function() {
    return t;
  };
}
function Do(t, n, e, r, i, o) {
  for (var u = 0, a, f = n.length, c = o.length; u < c; ++u)
    (a = n[u]) ? (a.__data__ = o[u], r[u] = a) : e[u] = new Dn(t, o[u]);
  for (; u < f; ++u)
    (a = n[u]) && (i[u] = a);
}
function Lo(t, n, e, r, i, o, u) {
  var a, f, c = /* @__PURE__ */ new Map(), s = n.length, l = o.length, h = new Array(s), p;
  for (a = 0; a < s; ++a)
    (f = n[a]) && (h[a] = p = u.call(f, f.__data__, a, n) + "", c.has(p) ? i[a] = f : c.set(p, f));
  for (a = 0; a < l; ++a)
    p = u.call(t, o[a], a, o) + "", (f = c.get(p)) ? (r[a] = f, f.__data__ = o[a], c.delete(p)) : e[a] = new Dn(t, o[a]);
  for (a = 0; a < s; ++a)
    (f = n[a]) && c.get(h[a]) === f && (i[a] = f);
}
function Bo(t) {
  return t.__data__;
}
function Xo(t, n) {
  if (!arguments.length) return Array.from(this, Bo);
  var e = n ? Lo : Do, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Fo(t));
  for (var o = i.length, u = new Array(o), a = new Array(o), f = new Array(o), c = 0; c < o; ++c) {
    var s = r[c], l = i[c], h = l.length, p = qo(t.call(s, s && s.__data__, c, r)), m = p.length, _ = a[c] = new Array(m), b = u[c] = new Array(m), w = f[c] = new Array(h);
    e(s, l, _, b, w, p, n);
    for (var M = 0, E = 0, S, A; M < m; ++M)
      if (S = _[M]) {
        for (M >= E && (E = M + 1); !(A = b[E]) && ++E < m; ) ;
        S._next = A || null;
      }
  }
  return u = new ut(u, r), u._enter = a, u._exit = f, u;
}
function qo(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Oo() {
  return new ut(this._exit || this._groups.map(pi), this._parents);
}
function Ho(t, n, e) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), n != null && (i = n(i), i && (i = i.selection())), e == null ? o.remove() : e(o), r && i ? r.merge(i).order() : i;
}
function Yo(t) {
  for (var n = t.selection ? t.selection() : t, e = this._groups, r = n._groups, i = e.length, o = r.length, u = Math.min(i, o), a = new Array(i), f = 0; f < u; ++f)
    for (var c = e[f], s = r[f], l = c.length, h = a[f] = new Array(l), p, m = 0; m < l; ++m)
      (p = c[m] || s[m]) && (h[m] = p);
  for (; f < i; ++f)
    a[f] = e[f];
  return new ut(a, this._parents);
}
function Vo() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], u; --i >= 0; )
      (u = r[i]) && (o && u.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(u, o), o = u);
  return this;
}
function Uo(t) {
  t || (t = Go);
  function n(l, h) {
    return l && h ? t(l.__data__, h.__data__) : !l - !h;
  }
  for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var u = e[o], a = u.length, f = i[o] = new Array(a), c, s = 0; s < a; ++s)
      (c = u[s]) && (f[s] = c);
    f.sort(n);
  }
  return new ut(i, this._parents).order();
}
function Go(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Wo() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Ko() {
  return Array.from(this);
}
function Zo() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var u = r[i];
      if (u) return u;
    }
  return null;
}
function Jo() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function Qo() {
  return !this.node();
}
function jo(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, u = i.length, a; o < u; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function tu(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function nu(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function eu(t, n) {
  return function() {
    this.setAttribute(t, n);
  };
}
function ru(t, n) {
  return function() {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function iu(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function ou(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e);
  };
}
function uu(t, n) {
  var e = ee(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each((n == null ? e.local ? nu : tu : typeof n == "function" ? e.local ? ou : iu : e.local ? ru : eu)(e, n));
}
function gi(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function au(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function su(t, n, e) {
  return function() {
    this.style.setProperty(t, n, e);
  };
}
function cu(t, n, e) {
  return function() {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function lu(t, n, e) {
  return arguments.length > 1 ? this.each((n == null ? au : typeof n == "function" ? cu : su)(t, n, e ?? "")) : qt(this.node(), t);
}
function qt(t, n) {
  return t.style.getPropertyValue(n) || gi(t).getComputedStyle(t, null).getPropertyValue(n);
}
function fu(t) {
  return function() {
    delete this[t];
  };
}
function hu(t, n) {
  return function() {
    this[t] = n;
  };
}
function du(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : this[t] = e;
  };
}
function pu(t, n) {
  return arguments.length > 1 ? this.each((n == null ? fu : typeof n == "function" ? du : hu)(t, n)) : this.node()[t];
}
function yi(t) {
  return t.trim().split(/^|\s+/);
}
function Ke(t) {
  return t.classList || new mi(t);
}
function mi(t) {
  this._node = t, this._names = yi(t.getAttribute("class") || "");
}
mi.prototype = {
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
function vi(t, n) {
  for (var e = Ke(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function wi(t, n) {
  for (var e = Ke(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function gu(t) {
  return function() {
    vi(this, t);
  };
}
function yu(t) {
  return function() {
    wi(this, t);
  };
}
function mu(t, n) {
  return function() {
    (n.apply(this, arguments) ? vi : wi)(this, t);
  };
}
function vu(t, n) {
  var e = yi(t + "");
  if (arguments.length < 2) {
    for (var r = Ke(this.node()), i = -1, o = e.length; ++i < o; ) if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? mu : n ? gu : yu)(e, n));
}
function wu() {
  this.textContent = "";
}
function _u(t) {
  return function() {
    this.textContent = t;
  };
}
function xu(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function bu(t) {
  return arguments.length ? this.each(t == null ? wu : (typeof t == "function" ? xu : _u)(t)) : this.node().textContent;
}
function Su() {
  this.innerHTML = "";
}
function Mu(t) {
  return function() {
    this.innerHTML = t;
  };
}
function ku(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function Eu(t) {
  return arguments.length ? this.each(t == null ? Su : (typeof t == "function" ? ku : Mu)(t)) : this.node().innerHTML;
}
function Nu() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function $u() {
  return this.each(Nu);
}
function Au() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function zu() {
  return this.each(Au);
}
function Ru(t) {
  var n = typeof t == "function" ? t : li(t);
  return this.select(function() {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Pu() {
  return null;
}
function Cu(t, n) {
  var e = typeof t == "function" ? t : li(t), r = n == null ? Pu : typeof n == "function" ? n : We(n);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Tu() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Iu() {
  return this.each(Tu);
}
function Fu() {
  var t = this.cloneNode(!1), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Du() {
  var t = this.cloneNode(!0), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Lu(t) {
  return this.select(t ? Du : Fu);
}
function Bu(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Xu(t) {
  return function(n) {
    t.call(this, n, this.__data__);
  };
}
function qu(t) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var e = "", r = n.indexOf(".");
    return r >= 0 && (e = n.slice(r + 1), n = n.slice(0, r)), { type: n, name: e };
  });
}
function Ou(t) {
  return function() {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
        o = n[e], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : n[++r] = o;
      ++r ? n.length = r : delete this.__on;
    }
  };
}
function Hu(t, n, e) {
  return function() {
    var r = this.__on, i, o = Xu(n);
    if (r) {
      for (var u = 0, a = r.length; u < a; ++u)
        if ((i = r[u]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = e), i.value = n;
          return;
        }
    }
    this.addEventListener(t.type, o, e), i = { type: t.type, name: t.name, value: n, listener: o, options: e }, r ? r.push(i) : this.__on = [i];
  };
}
function Yu(t, n, e) {
  var r = qu(t + ""), i, o = r.length, u;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var f = 0, c = a.length, s; f < c; ++f)
        for (i = 0, s = a[f]; i < o; ++i)
          if ((u = r[i]).type === s.type && u.name === s.name)
            return s.value;
    }
    return;
  }
  for (a = n ? Hu : Ou, i = 0; i < o; ++i) this.each(a(r[i], n, e));
  return this;
}
function _i(t, n, e) {
  var r = gi(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i);
}
function Vu(t, n) {
  return function() {
    return _i(this, t, n);
  };
}
function Uu(t, n) {
  return function() {
    return _i(this, t, n.apply(this, arguments));
  };
}
function Gu(t, n) {
  return this.each((typeof n == "function" ? Uu : Vu)(t, n));
}
function* Wu() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, u; i < o; ++i)
      (u = r[i]) && (yield u);
}
var xi = [null];
function ut(t, n) {
  this._groups = t, this._parents = n;
}
function dn() {
  return new ut([[document.documentElement]], xi);
}
function Ku() {
  return this;
}
ut.prototype = dn.prototype = {
  constructor: ut,
  select: xo,
  selectAll: ko,
  selectChild: Ao,
  selectChildren: Co,
  filter: To,
  data: Xo,
  enter: Io,
  exit: Oo,
  join: Ho,
  merge: Yo,
  selection: Ku,
  order: Vo,
  sort: Uo,
  call: Wo,
  nodes: Ko,
  node: Zo,
  size: Jo,
  empty: Qo,
  each: jo,
  attr: uu,
  style: lu,
  property: pu,
  classed: vu,
  text: bu,
  html: Eu,
  raise: $u,
  lower: zu,
  append: Ru,
  insert: Cu,
  remove: Iu,
  clone: Lu,
  datum: Bu,
  on: Yu,
  dispatch: Gu,
  [Symbol.iterator]: Wu
};
function mt(t) {
  return typeof t == "string" ? new ut([[document.querySelector(t)]], [document.documentElement]) : new ut([[t]], xi);
}
function Zu(t) {
  let n;
  for (; n = t.sourceEvent; ) t = n;
  return t;
}
function Nt(t, n) {
  if (t = Zu(t), n === void 0 && (n = t.currentTarget), n) {
    var e = n.ownerSVGElement || n;
    if (e.createSVGPoint) {
      var r = e.createSVGPoint();
      return r.x = t.clientX, r.y = t.clientY, r = r.matrixTransform(n.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (n.getBoundingClientRect) {
      var i = n.getBoundingClientRect();
      return [t.clientX - i.left - n.clientLeft, t.clientY - i.top - n.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
var Ju = { value: () => {
} };
function Ze() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new Rn(e);
}
function Rn(t) {
  this._ = t;
}
function Qu(t, n) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var r = "", i = e.indexOf(".");
    if (i >= 0 && (r = e.slice(i + 1), e = e.slice(0, i)), e && !n.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    return { type: e, name: r };
  });
}
Rn.prototype = Ze.prototype = {
  constructor: Rn,
  on: function(t, n) {
    var e = this._, r = Qu(t + "", e), i, o = -1, u = r.length;
    if (arguments.length < 2) {
      for (; ++o < u; ) if ((i = (t = r[o]).type) && (i = ju(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function") throw new Error("invalid callback: " + n);
    for (; ++o < u; )
      if (i = (t = r[o]).type) e[i] = vr(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = vr(e[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new Rn(t);
  },
  call: function(t, n) {
    if ((i = arguments.length - 2) > 0) for (var e = new Array(i), r = 0, i, o; r < i; ++r) e[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r) o[r].value.apply(n, e);
  },
  apply: function(t, n, e) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(n, e);
  }
};
function ju(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n)
      return i.value;
}
function vr(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      t[r] = Ju, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
const be = { capture: !0, passive: !1 };
function Se(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function ta(t) {
  var n = t.document.documentElement, e = mt(t).on("dragstart.drag", Se, be);
  "onselectstart" in n ? e.on("selectstart.drag", Se, be) : (n.__noselect = n.style.MozUserSelect, n.style.MozUserSelect = "none");
}
function na(t, n) {
  var e = t.document.documentElement, r = mt(t).on("dragstart.drag", null);
  n && (r.on("click.drag", Se, be), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in e ? r.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect);
}
function Je(t, n, e) {
  t.prototype = n.prototype = e, e.constructor = t;
}
function bi(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function pn() {
}
var on = 0.7, Ln = 1 / on, Xt = "\\s*([+-]?\\d+)\\s*", un = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", _t = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ea = /^#([0-9a-f]{3,8})$/, ra = new RegExp(`^rgb\\(${Xt},${Xt},${Xt}\\)$`), ia = new RegExp(`^rgb\\(${_t},${_t},${_t}\\)$`), oa = new RegExp(`^rgba\\(${Xt},${Xt},${Xt},${un}\\)$`), ua = new RegExp(`^rgba\\(${_t},${_t},${_t},${un}\\)$`), aa = new RegExp(`^hsl\\(${un},${_t},${_t}\\)$`), sa = new RegExp(`^hsla\\(${un},${_t},${_t},${un}\\)$`), wr = {
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
Je(pn, zt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: _r,
  // Deprecated! Use color.formatHex.
  formatHex: _r,
  formatHex8: ca,
  formatHsl: la,
  formatRgb: xr,
  toString: xr
});
function _r() {
  return this.rgb().formatHex();
}
function ca() {
  return this.rgb().formatHex8();
}
function la() {
  return Si(this).formatHsl();
}
function xr() {
  return this.rgb().formatRgb();
}
function zt(t) {
  var n, e;
  return t = (t + "").trim().toLowerCase(), (n = ea.exec(t)) ? (e = n[1].length, n = parseInt(n[1], 16), e === 6 ? br(n) : e === 3 ? new rt(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, (n & 15) << 4 | n & 15, 1) : e === 8 ? _n(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (n & 255) / 255) : e === 4 ? _n(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, ((n & 15) << 4 | n & 15) / 255) : null) : (n = ra.exec(t)) ? new rt(n[1], n[2], n[3], 1) : (n = ia.exec(t)) ? new rt(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, 1) : (n = oa.exec(t)) ? _n(n[1], n[2], n[3], n[4]) : (n = ua.exec(t)) ? _n(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, n[4]) : (n = aa.exec(t)) ? kr(n[1], n[2] / 100, n[3] / 100, 1) : (n = sa.exec(t)) ? kr(n[1], n[2] / 100, n[3] / 100, n[4]) : wr.hasOwnProperty(t) ? br(wr[t]) : t === "transparent" ? new rt(NaN, NaN, NaN, 0) : null;
}
function br(t) {
  return new rt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function _n(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new rt(t, n, e, r);
}
function fa(t) {
  return t instanceof pn || (t = zt(t)), t ? (t = t.rgb(), new rt(t.r, t.g, t.b, t.opacity)) : new rt();
}
function Me(t, n, e, r) {
  return arguments.length === 1 ? fa(t) : new rt(t, n, e, r ?? 1);
}
function rt(t, n, e, r) {
  this.r = +t, this.g = +n, this.b = +e, this.opacity = +r;
}
Je(rt, Me, bi(pn, {
  brighter(t) {
    return t = t == null ? Ln : Math.pow(Ln, t), new rt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? on : Math.pow(on, t), new rt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new rt(At(this.r), At(this.g), At(this.b), Bn(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Sr,
  // Deprecated! Use color.formatHex.
  formatHex: Sr,
  formatHex8: ha,
  formatRgb: Mr,
  toString: Mr
}));
function Sr() {
  return `#${$t(this.r)}${$t(this.g)}${$t(this.b)}`;
}
function ha() {
  return `#${$t(this.r)}${$t(this.g)}${$t(this.b)}${$t((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Mr() {
  const t = Bn(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${At(this.r)}, ${At(this.g)}, ${At(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Bn(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function At(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function $t(t) {
  return t = At(t), (t < 16 ? "0" : "") + t.toString(16);
}
function kr(t, n, e, r) {
  return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new dt(t, n, e, r);
}
function Si(t) {
  if (t instanceof dt) return new dt(t.h, t.s, t.l, t.opacity);
  if (t instanceof pn || (t = zt(t)), !t) return new dt();
  if (t instanceof dt) return t;
  t = t.rgb();
  var n = t.r / 255, e = t.g / 255, r = t.b / 255, i = Math.min(n, e, r), o = Math.max(n, e, r), u = NaN, a = o - i, f = (o + i) / 2;
  return a ? (n === o ? u = (e - r) / a + (e < r) * 6 : e === o ? u = (r - n) / a + 2 : u = (n - e) / a + 4, a /= f < 0.5 ? o + i : 2 - o - i, u *= 60) : a = f > 0 && f < 1 ? 0 : u, new dt(u, a, f, t.opacity);
}
function da(t, n, e, r) {
  return arguments.length === 1 ? Si(t) : new dt(t, n, e, r ?? 1);
}
function dt(t, n, e, r) {
  this.h = +t, this.s = +n, this.l = +e, this.opacity = +r;
}
Je(dt, da, bi(pn, {
  brighter(t) {
    return t = t == null ? Ln : Math.pow(Ln, t), new dt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? on : Math.pow(on, t), new dt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, n = isNaN(t) || isNaN(this.s) ? 0 : this.s, e = this.l, r = e + (e < 0.5 ? e : 1 - e) * n, i = 2 * e - r;
    return new rt(
      se(t >= 240 ? t - 240 : t + 120, i, r),
      se(t, i, r),
      se(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new dt(Er(this.h), xn(this.s), xn(this.l), Bn(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Bn(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Er(this.h)}, ${xn(this.s) * 100}%, ${xn(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Er(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function xn(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function se(t, n, e) {
  return (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n) * 255;
}
const Qe = (t) => () => t;
function pa(t, n) {
  return function(e) {
    return t + e * n;
  };
}
function ga(t, n, e) {
  return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e, function(r) {
    return Math.pow(t + r * n, e);
  };
}
function ya(t) {
  return (t = +t) == 1 ? Mi : function(n, e) {
    return e - n ? ga(n, e, t) : Qe(isNaN(n) ? e : n);
  };
}
function Mi(t, n) {
  var e = n - t;
  return e ? pa(t, e) : Qe(isNaN(t) ? n : t);
}
const Xn = (function t(n) {
  var e = ya(n);
  function r(i, o) {
    var u = e((i = Me(i)).r, (o = Me(o)).r), a = e(i.g, o.g), f = e(i.b, o.b), c = Mi(i.opacity, o.opacity);
    return function(s) {
      return i.r = u(s), i.g = a(s), i.b = f(s), i.opacity = c(s), i + "";
    };
  }
  return r.gamma = t, r;
})(1);
function ma(t, n) {
  n || (n = []);
  var e = t ? Math.min(n.length, t.length) : 0, r = n.slice(), i;
  return function(o) {
    for (i = 0; i < e; ++i) r[i] = t[i] * (1 - o) + n[i] * o;
    return r;
  };
}
function va(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function wa(t, n) {
  var e = n ? n.length : 0, r = t ? Math.min(e, t.length) : 0, i = new Array(r), o = new Array(e), u;
  for (u = 0; u < r; ++u) i[u] = je(t[u], n[u]);
  for (; u < e; ++u) o[u] = n[u];
  return function(a) {
    for (u = 0; u < r; ++u) o[u] = i[u](a);
    return o;
  };
}
function _a(t, n) {
  var e = /* @__PURE__ */ new Date();
  return t = +t, n = +n, function(r) {
    return e.setTime(t * (1 - r) + n * r), e;
  };
}
function ht(t, n) {
  return t = +t, n = +n, function(e) {
    return t * (1 - e) + n * e;
  };
}
function xa(t, n) {
  var e = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (n === null || typeof n != "object") && (n = {});
  for (i in n)
    i in t ? e[i] = je(t[i], n[i]) : r[i] = n[i];
  return function(o) {
    for (i in e) r[i] = e[i](o);
    return r;
  };
}
var ke = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ce = new RegExp(ke.source, "g");
function ba(t) {
  return function() {
    return t;
  };
}
function Sa(t) {
  return function(n) {
    return t(n) + "";
  };
}
function ki(t, n) {
  var e = ke.lastIndex = ce.lastIndex = 0, r, i, o, u = -1, a = [], f = [];
  for (t = t + "", n = n + ""; (r = ke.exec(t)) && (i = ce.exec(n)); )
    (o = i.index) > e && (o = n.slice(e, o), a[u] ? a[u] += o : a[++u] = o), (r = r[0]) === (i = i[0]) ? a[u] ? a[u] += i : a[++u] = i : (a[++u] = null, f.push({ i: u, x: ht(r, i) })), e = ce.lastIndex;
  return e < n.length && (o = n.slice(e), a[u] ? a[u] += o : a[++u] = o), a.length < 2 ? f[0] ? Sa(f[0].x) : ba(n) : (n = f.length, function(c) {
    for (var s = 0, l; s < n; ++s) a[(l = f[s]).i] = l.x(c);
    return a.join("");
  });
}
function je(t, n) {
  var e = typeof n, r;
  return n == null || e === "boolean" ? Qe(n) : (e === "number" ? ht : e === "string" ? (r = zt(n)) ? (n = r, Xn) : ki : n instanceof zt ? Xn : n instanceof Date ? _a : va(n) ? ma : Array.isArray(n) ? wa : typeof n.valueOf != "function" && typeof n.toString != "function" || isNaN(n) ? xa : ht)(t, n);
}
function Ma(t, n) {
  return t = +t, n = +n, function(e) {
    return Math.round(t * (1 - e) + n * e);
  };
}
var Nr = 180 / Math.PI, Ee = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Ei(t, n, e, r, i, o) {
  var u, a, f;
  return (u = Math.sqrt(t * t + n * n)) && (t /= u, n /= u), (f = t * e + n * r) && (e -= t * f, r -= n * f), (a = Math.sqrt(e * e + r * r)) && (e /= a, r /= a, f /= a), t * r < n * e && (t = -t, n = -n, f = -f, u = -u), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(n, t) * Nr,
    skewX: Math.atan(f) * Nr,
    scaleX: u,
    scaleY: a
  };
}
var bn;
function ka(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return n.isIdentity ? Ee : Ei(n.a, n.b, n.c, n.d, n.e, n.f);
}
function Ea(t) {
  return t == null || (bn || (bn = document.createElementNS("http://www.w3.org/2000/svg", "g")), bn.setAttribute("transform", t), !(t = bn.transform.baseVal.consolidate())) ? Ee : (t = t.matrix, Ei(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Ni(t, n, e, r) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, s, l, h, p, m) {
    if (c !== l || s !== h) {
      var _ = p.push("translate(", null, n, null, e);
      m.push({ i: _ - 4, x: ht(c, l) }, { i: _ - 2, x: ht(s, h) });
    } else (l || h) && p.push("translate(" + l + n + h + e);
  }
  function u(c, s, l, h) {
    c !== s ? (c - s > 180 ? s += 360 : s - c > 180 && (c += 360), h.push({ i: l.push(i(l) + "rotate(", null, r) - 2, x: ht(c, s) })) : s && l.push(i(l) + "rotate(" + s + r);
  }
  function a(c, s, l, h) {
    c !== s ? h.push({ i: l.push(i(l) + "skewX(", null, r) - 2, x: ht(c, s) }) : s && l.push(i(l) + "skewX(" + s + r);
  }
  function f(c, s, l, h, p, m) {
    if (c !== l || s !== h) {
      var _ = p.push(i(p) + "scale(", null, ",", null, ")");
      m.push({ i: _ - 4, x: ht(c, l) }, { i: _ - 2, x: ht(s, h) });
    } else (l !== 1 || h !== 1) && p.push(i(p) + "scale(" + l + "," + h + ")");
  }
  return function(c, s) {
    var l = [], h = [];
    return c = t(c), s = t(s), o(c.translateX, c.translateY, s.translateX, s.translateY, l, h), u(c.rotate, s.rotate, l, h), a(c.skewX, s.skewX, l, h), f(c.scaleX, c.scaleY, s.scaleX, s.scaleY, l, h), c = s = null, function(p) {
      for (var m = -1, _ = h.length, b; ++m < _; ) l[(b = h[m]).i] = b.x(p);
      return l.join("");
    };
  };
}
var Na = Ni(ka, "px, ", "px)", "deg)"), $a = Ni(Ea, ", ", ")", ")"), Aa = 1e-12;
function $r(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function za(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Ra(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Pa = (function t(n, e, r) {
  function i(o, u) {
    var a = o[0], f = o[1], c = o[2], s = u[0], l = u[1], h = u[2], p = s - a, m = l - f, _ = p * p + m * m, b, w;
    if (_ < Aa)
      w = Math.log(h / c) / n, b = function(D) {
        return [
          a + D * p,
          f + D * m,
          c * Math.exp(n * D * w)
        ];
      };
    else {
      var M = Math.sqrt(_), E = (h * h - c * c + r * _) / (2 * c * e * M), S = (h * h - c * c - r * _) / (2 * h * e * M), A = Math.log(Math.sqrt(E * E + 1) - E), v = Math.log(Math.sqrt(S * S + 1) - S);
      w = (v - A) / n, b = function(D) {
        var L = D * w, I = $r(A), X = c / (e * M) * (I * Ra(n * L + A) - za(A));
        return [
          a + X * p,
          f + X * m,
          c * I / $r(n * L + A)
        ];
      };
    }
    return b.duration = w * 1e3 * n / Math.SQRT2, b;
  }
  return i.rho = function(o) {
    var u = Math.max(1e-3, +o), a = u * u, f = a * a;
    return t(u, a, f);
  }, i;
})(Math.SQRT2, 2, 4);
var Ot = 0, Zt = 0, Gt = 0, $i = 1e3, qn, Jt, On = 0, Rt = 0, re = 0, an = typeof performance == "object" && performance.now ? performance : Date, Ai = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function tr() {
  return Rt || (Ai(Ca), Rt = an.now() + re);
}
function Ca() {
  Rt = 0;
}
function Hn() {
  this._call = this._time = this._next = null;
}
Hn.prototype = zi.prototype = {
  constructor: Hn,
  restart: function(t, n, e) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    e = (e == null ? tr() : +e) + (n == null ? 0 : +n), !this._next && Jt !== this && (Jt ? Jt._next = this : qn = this, Jt = this), this._call = t, this._time = e, Ne();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ne());
  }
};
function zi(t, n, e) {
  var r = new Hn();
  return r.restart(t, n, e), r;
}
function Ta() {
  tr(), ++Ot;
  for (var t = qn, n; t; )
    (n = Rt - t._time) >= 0 && t._call.call(void 0, n), t = t._next;
  --Ot;
}
function Ar() {
  Rt = (On = an.now()) + re, Ot = Zt = 0;
  try {
    Ta();
  } finally {
    Ot = 0, Fa(), Rt = 0;
  }
}
function Ia() {
  var t = an.now(), n = t - On;
  n > $i && (re -= n, On = t);
}
function Fa() {
  for (var t, n = qn, e, r = 1 / 0; n; )
    n._call ? (r > n._time && (r = n._time), t = n, n = n._next) : (e = n._next, n._next = null, n = t ? t._next = e : qn = e);
  Jt = t, Ne(r);
}
function Ne(t) {
  if (!Ot) {
    Zt && (Zt = clearTimeout(Zt));
    var n = t - Rt;
    n > 24 ? (t < 1 / 0 && (Zt = setTimeout(Ar, t - an.now() - re)), Gt && (Gt = clearInterval(Gt))) : (Gt || (On = an.now(), Gt = setInterval(Ia, $i)), Ot = 1, Ai(Ar));
  }
}
function zr(t, n, e) {
  var r = new Hn();
  return n = n == null ? 0 : +n, r.restart((i) => {
    r.stop(), t(i + n);
  }, n, e), r;
}
var Da = Ze("start", "end", "cancel", "interrupt"), La = [], Ri = 0, Rr = 1, $e = 2, Pn = 3, Pr = 4, Ae = 5, Cn = 6;
function ie(t, n, e, r, i, o) {
  var u = t.__transition;
  if (!u) t.__transition = {};
  else if (e in u) return;
  Ba(t, e, {
    name: n,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Da,
    tween: La,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Ri
  });
}
function nr(t, n) {
  var e = gt(t, n);
  if (e.state > Ri) throw new Error("too late; already scheduled");
  return e;
}
function xt(t, n) {
  var e = gt(t, n);
  if (e.state > Pn) throw new Error("too late; already running");
  return e;
}
function gt(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function Ba(t, n, e) {
  var r = t.__transition, i;
  r[n] = e, e.timer = zi(o, 0, e.time);
  function o(c) {
    e.state = Rr, e.timer.restart(u, e.delay, e.time), e.delay <= c && u(c - e.delay);
  }
  function u(c) {
    var s, l, h, p;
    if (e.state !== Rr) return f();
    for (s in r)
      if (p = r[s], p.name === e.name) {
        if (p.state === Pn) return zr(u);
        p.state === Pr ? (p.state = Cn, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[s]) : +s < n && (p.state = Cn, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[s]);
      }
    if (zr(function() {
      e.state === Pn && (e.state = Pr, e.timer.restart(a, e.delay, e.time), a(c));
    }), e.state = $e, e.on.call("start", t, t.__data__, e.index, e.group), e.state === $e) {
      for (e.state = Pn, i = new Array(h = e.tween.length), s = 0, l = -1; s < h; ++s)
        (p = e.tween[s].value.call(t, t.__data__, e.index, e.group)) && (i[++l] = p);
      i.length = l + 1;
    }
  }
  function a(c) {
    for (var s = c < e.duration ? e.ease.call(null, c / e.duration) : (e.timer.restart(f), e.state = Ae, 1), l = -1, h = i.length; ++l < h; )
      i[l].call(t, s);
    e.state === Ae && (e.on.call("end", t, t.__data__, e.index, e.group), f());
  }
  function f() {
    e.state = Cn, e.timer.stop(), delete r[n];
    for (var c in r) return;
    delete t.__transition;
  }
}
function Tn(t, n) {
  var e = t.__transition, r, i, o = !0, u;
  if (e) {
    n = n == null ? null : n + "";
    for (u in e) {
      if ((r = e[u]).name !== n) {
        o = !1;
        continue;
      }
      i = r.state > $e && r.state < Ae, r.state = Cn, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete e[u];
    }
    o && delete t.__transition;
  }
}
function Xa(t) {
  return this.each(function() {
    Tn(this, t);
  });
}
function qa(t, n) {
  var e, r;
  return function() {
    var i = xt(this, t), o = i.tween;
    if (o !== e) {
      r = e = o;
      for (var u = 0, a = r.length; u < a; ++u)
        if (r[u].name === n) {
          r = r.slice(), r.splice(u, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Oa(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function() {
    var o = xt(this, t), u = o.tween;
    if (u !== r) {
      i = (r = u).slice();
      for (var a = { name: n, value: e }, f = 0, c = i.length; f < c; ++f)
        if (i[f].name === n) {
          i[f] = a;
          break;
        }
      f === c && i.push(a);
    }
    o.tween = i;
  };
}
function Ha(t, n) {
  var e = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = gt(this.node(), e).tween, i = 0, o = r.length, u; i < o; ++i)
      if ((u = r[i]).name === t)
        return u.value;
    return null;
  }
  return this.each((n == null ? qa : Oa)(e, t, n));
}
function er(t, n, e) {
  var r = t._id;
  return t.each(function() {
    var i = xt(this, r);
    (i.value || (i.value = {}))[n] = e.apply(this, arguments);
  }), function(i) {
    return gt(i, r).value[n];
  };
}
function Pi(t, n) {
  var e;
  return (typeof n == "number" ? ht : n instanceof zt ? Xn : (e = zt(n)) ? (n = e, Xn) : ki)(t, n);
}
function Ya(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Va(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ua(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var u = this.getAttribute(t);
    return u === i ? null : u === r ? o : o = n(r = u, e);
  };
}
function Ga(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var u = this.getAttributeNS(t.space, t.local);
    return u === i ? null : u === r ? o : o = n(r = u, e);
  };
}
function Wa(t, n, e) {
  var r, i, o;
  return function() {
    var u, a = e(this), f;
    return a == null ? void this.removeAttribute(t) : (u = this.getAttribute(t), f = a + "", u === f ? null : u === r && f === i ? o : (i = f, o = n(r = u, a)));
  };
}
function Ka(t, n, e) {
  var r, i, o;
  return function() {
    var u, a = e(this), f;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (u = this.getAttributeNS(t.space, t.local), f = a + "", u === f ? null : u === r && f === i ? o : (i = f, o = n(r = u, a)));
  };
}
function Za(t, n) {
  var e = ee(t), r = e === "transform" ? $a : Pi;
  return this.attrTween(t, typeof n == "function" ? (e.local ? Ka : Wa)(e, r, er(this, "attr." + t, n)) : n == null ? (e.local ? Va : Ya)(e) : (e.local ? Ga : Ua)(e, r, n));
}
function Ja(t, n) {
  return function(e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Qa(t, n) {
  return function(e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function ja(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Qa(t, o)), e;
  }
  return i._value = n, i;
}
function ts(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Ja(t, o)), e;
  }
  return i._value = n, i;
}
function ns(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = ee(t);
  return this.tween(e, (r.local ? ja : ts)(r, n));
}
function es(t, n) {
  return function() {
    nr(this, t).delay = +n.apply(this, arguments);
  };
}
function rs(t, n) {
  return n = +n, function() {
    nr(this, t).delay = n;
  };
}
function is(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? es : rs)(n, t)) : gt(this.node(), n).delay;
}
function os(t, n) {
  return function() {
    xt(this, t).duration = +n.apply(this, arguments);
  };
}
function us(t, n) {
  return n = +n, function() {
    xt(this, t).duration = n;
  };
}
function as(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? os : us)(n, t)) : gt(this.node(), n).duration;
}
function ss(t, n) {
  if (typeof n != "function") throw new Error();
  return function() {
    xt(this, t).ease = n;
  };
}
function cs(t) {
  var n = this._id;
  return arguments.length ? this.each(ss(n, t)) : gt(this.node(), n).ease;
}
function ls(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    xt(this, t).ease = e;
  };
}
function fs(t) {
  if (typeof t != "function") throw new Error();
  return this.each(ls(this._id, t));
}
function hs(t) {
  typeof t != "function" && (t = hi(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], u = o.length, a = r[i] = [], f, c = 0; c < u; ++c)
      (f = o[c]) && t.call(f, f.__data__, c, o) && a.push(f);
  return new Mt(r, this._parents, this._name, this._id);
}
function ds(t) {
  if (t._id !== this._id) throw new Error();
  for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), u = new Array(r), a = 0; a < o; ++a)
    for (var f = n[a], c = e[a], s = f.length, l = u[a] = new Array(s), h, p = 0; p < s; ++p)
      (h = f[p] || c[p]) && (l[p] = h);
  for (; a < r; ++a)
    u[a] = n[a];
  return new Mt(u, this._parents, this._name, this._id);
}
function ps(t) {
  return (t + "").trim().split(/^|\s+/).every(function(n) {
    var e = n.indexOf(".");
    return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
  });
}
function gs(t, n, e) {
  var r, i, o = ps(n) ? nr : xt;
  return function() {
    var u = o(this, t), a = u.on;
    a !== r && (i = (r = a).copy()).on(n, e), u.on = i;
  };
}
function ys(t, n) {
  var e = this._id;
  return arguments.length < 2 ? gt(this.node(), e).on.on(t) : this.each(gs(e, t, n));
}
function ms(t) {
  return function() {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function vs() {
  return this.on("end.remove", ms(this._id));
}
function ws(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = We(t));
  for (var r = this._groups, i = r.length, o = new Array(i), u = 0; u < i; ++u)
    for (var a = r[u], f = a.length, c = o[u] = new Array(f), s, l, h = 0; h < f; ++h)
      (s = a[h]) && (l = t.call(s, s.__data__, h, a)) && ("__data__" in s && (l.__data__ = s.__data__), c[h] = l, ie(c[h], n, e, h, c, gt(s, e)));
  return new Mt(o, this._parents, n, e);
}
function _s(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = fi(t));
  for (var r = this._groups, i = r.length, o = [], u = [], a = 0; a < i; ++a)
    for (var f = r[a], c = f.length, s, l = 0; l < c; ++l)
      if (s = f[l]) {
        for (var h = t.call(s, s.__data__, l, f), p, m = gt(s, e), _ = 0, b = h.length; _ < b; ++_)
          (p = h[_]) && ie(p, n, e, _, h, m);
        o.push(h), u.push(s);
      }
  return new Mt(o, u, n, e);
}
var xs = dn.prototype.constructor;
function bs() {
  return new xs(this._groups, this._parents);
}
function Ss(t, n) {
  var e, r, i;
  return function() {
    var o = qt(this, t), u = (this.style.removeProperty(t), qt(this, t));
    return o === u ? null : o === e && u === r ? i : i = n(e = o, r = u);
  };
}
function Ci(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ms(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var u = qt(this, t);
    return u === i ? null : u === r ? o : o = n(r = u, e);
  };
}
function ks(t, n, e) {
  var r, i, o;
  return function() {
    var u = qt(this, t), a = e(this), f = a + "";
    return a == null && (f = a = (this.style.removeProperty(t), qt(this, t))), u === f ? null : u === r && f === i ? o : (i = f, o = n(r = u, a));
  };
}
function Es(t, n) {
  var e, r, i, o = "style." + n, u = "end." + o, a;
  return function() {
    var f = xt(this, t), c = f.on, s = f.value[o] == null ? a || (a = Ci(n)) : void 0;
    (c !== e || i !== s) && (r = (e = c).copy()).on(u, i = s), f.on = r;
  };
}
function Ns(t, n, e) {
  var r = (t += "") == "transform" ? Na : Pi;
  return n == null ? this.styleTween(t, Ss(t, r)).on("end.style." + t, Ci(t)) : typeof n == "function" ? this.styleTween(t, ks(t, r, er(this, "style." + t, n))).each(Es(this._id, t)) : this.styleTween(t, Ms(t, r, n), e).on("end.style." + t, null);
}
function $s(t, n, e) {
  return function(r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function As(t, n, e) {
  var r, i;
  function o() {
    var u = n.apply(this, arguments);
    return u !== i && (r = (i = u) && $s(t, u, e)), r;
  }
  return o._value = n, o;
}
function zs(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, As(t, n, e ?? ""));
}
function Rs(t) {
  return function() {
    this.textContent = t;
  };
}
function Ps(t) {
  return function() {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Cs(t) {
  return this.tween("text", typeof t == "function" ? Ps(er(this, "text", t)) : Rs(t == null ? "" : t + ""));
}
function Ts(t) {
  return function(n) {
    this.textContent = t.call(this, n);
  };
}
function Is(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && Ts(i)), n;
  }
  return r._value = t, r;
}
function Fs(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Is(t));
}
function Ds() {
  for (var t = this._name, n = this._id, e = Ti(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var u = r[o], a = u.length, f, c = 0; c < a; ++c)
      if (f = u[c]) {
        var s = gt(f, n);
        ie(f, t, e, c, u, {
          time: s.time + s.delay + s.duration,
          delay: 0,
          duration: s.duration,
          ease: s.ease
        });
      }
  return new Mt(r, this._parents, t, e);
}
function Ls() {
  var t, n, e = this, r = e._id, i = e.size();
  return new Promise(function(o, u) {
    var a = { value: u }, f = { value: function() {
      --i === 0 && o();
    } };
    e.each(function() {
      var c = xt(this, r), s = c.on;
      s !== t && (n = (t = s).copy(), n._.cancel.push(a), n._.interrupt.push(a), n._.end.push(f)), c.on = n;
    }), i === 0 && o();
  });
}
var Bs = 0;
function Mt(t, n, e, r) {
  this._groups = t, this._parents = n, this._name = e, this._id = r;
}
function Ti() {
  return ++Bs;
}
var bt = dn.prototype;
Mt.prototype = {
  constructor: Mt,
  select: ws,
  selectAll: _s,
  selectChild: bt.selectChild,
  selectChildren: bt.selectChildren,
  filter: hs,
  merge: ds,
  selection: bs,
  transition: Ds,
  call: bt.call,
  nodes: bt.nodes,
  node: bt.node,
  size: bt.size,
  empty: bt.empty,
  each: bt.each,
  on: ys,
  attr: Za,
  attrTween: ns,
  style: Ns,
  styleTween: zs,
  text: Cs,
  textTween: Fs,
  remove: vs,
  tween: Ha,
  delay: is,
  duration: as,
  ease: cs,
  easeVarying: fs,
  end: Ls,
  [Symbol.iterator]: bt[Symbol.iterator]
};
function Xs(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var qs = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Xs
};
function Os(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${n} not found`);
  return e;
}
function Hs(t) {
  var n, e;
  t instanceof Mt ? (n = t._id, t = t._name) : (n = Ti(), (e = qs).time = tr(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var u = r[o], a = u.length, f, c = 0; c < a; ++c)
      (f = u[c]) && ie(f, t, n, c, u, e || Os(f, n));
  return new Mt(r, this._parents, t, n);
}
dn.prototype.interrupt = Xa;
dn.prototype.transition = Hs;
const Sn = (t) => () => t;
function Ys(t, {
  sourceEvent: n,
  target: e,
  transform: r,
  dispatch: i
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: n, enumerable: !0, configurable: !0 },
    target: { value: e, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: i }
  });
}
function pt(t, n, e) {
  this.k = t, this.x = n, this.y = e;
}
pt.prototype = {
  constructor: pt,
  scale: function(t) {
    return t === 1 ? this : new pt(this.k * t, this.x, this.y);
  },
  translate: function(t, n) {
    return t === 0 & n === 0 ? this : new pt(this.k, this.x + this.k * t, this.y + this.k * n);
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
var sn = new pt(1, 0, 0);
Ii.prototype = pt.prototype;
function Ii(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return sn;
  return t.__zoom;
}
function le(t) {
  t.stopImmediatePropagation();
}
function Wt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Vs(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Us() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Cr() {
  return this.__zoom || sn;
}
function Gs(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Ws() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ks(t, n, e) {
  var r = t.invertX(n[0][0]) - e[0][0], i = t.invertX(n[1][0]) - e[1][0], o = t.invertY(n[0][1]) - e[0][1], u = t.invertY(n[1][1]) - e[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    u > o ? (o + u) / 2 : Math.min(0, o) || Math.max(0, u)
  );
}
function Zs() {
  var t = Vs, n = Us, e = Ks, r = Gs, i = Ws, o = [0, 1 / 0], u = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, f = Pa, c = Ze("start", "zoom", "end"), s, l, h, p = 500, m = 150, _ = 0, b = 10;
  function w(d) {
    d.property("__zoom", Cr).on("wheel.zoom", L, { passive: !1 }).on("mousedown.zoom", I).on("dblclick.zoom", X).filter(i).on("touchstart.zoom", R).on("touchmove.zoom", P).on("touchend.zoom touchcancel.zoom", T).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  w.transform = function(d, g, y, x) {
    var k = d.selection ? d.selection() : d;
    k.property("__zoom", Cr), d !== k ? A(d, g, y, x) : k.interrupt().each(function() {
      v(this, arguments).event(x).start().zoom(null, typeof g == "function" ? g.apply(this, arguments) : g).end();
    });
  }, w.scaleBy = function(d, g, y, x) {
    w.scaleTo(d, function() {
      var k = this.__zoom.k, $ = typeof g == "function" ? g.apply(this, arguments) : g;
      return k * $;
    }, y, x);
  }, w.scaleTo = function(d, g, y, x) {
    w.transform(d, function() {
      var k = n.apply(this, arguments), $ = this.__zoom, z = y == null ? S(k) : typeof y == "function" ? y.apply(this, arguments) : y, F = $.invert(z), O = typeof g == "function" ? g.apply(this, arguments) : g;
      return e(E(M($, O), z, F), k, u);
    }, y, x);
  }, w.translateBy = function(d, g, y, x) {
    w.transform(d, function() {
      return e(this.__zoom.translate(
        typeof g == "function" ? g.apply(this, arguments) : g,
        typeof y == "function" ? y.apply(this, arguments) : y
      ), n.apply(this, arguments), u);
    }, null, x);
  }, w.translateTo = function(d, g, y, x, k) {
    w.transform(d, function() {
      var $ = n.apply(this, arguments), z = this.__zoom, F = x == null ? S($) : typeof x == "function" ? x.apply(this, arguments) : x;
      return e(sn.translate(F[0], F[1]).scale(z.k).translate(
        typeof g == "function" ? -g.apply(this, arguments) : -g,
        typeof y == "function" ? -y.apply(this, arguments) : -y
      ), $, u);
    }, x, k);
  };
  function M(d, g) {
    return g = Math.max(o[0], Math.min(o[1], g)), g === d.k ? d : new pt(g, d.x, d.y);
  }
  function E(d, g, y) {
    var x = g[0] - y[0] * d.k, k = g[1] - y[1] * d.k;
    return x === d.x && k === d.y ? d : new pt(d.k, x, k);
  }
  function S(d) {
    return [(+d[0][0] + +d[1][0]) / 2, (+d[0][1] + +d[1][1]) / 2];
  }
  function A(d, g, y, x) {
    d.on("start.zoom", function() {
      v(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      v(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var k = this, $ = arguments, z = v(k, $).event(x), F = n.apply(k, $), O = y == null ? S(F) : typeof y == "function" ? y.apply(k, $) : y, U = Math.max(F[1][0] - F[0][0], F[1][1] - F[0][1]), V = k.__zoom, H = typeof g == "function" ? g.apply(k, $) : g, st = f(V.invert(O).concat(U / V.k), H.invert(O).concat(U / H.k));
      return function(G) {
        if (G === 1) G = H;
        else {
          var tt = st(G), et = U / tt[2];
          G = new pt(et, O[0] - tt[0] * et, O[1] - tt[1] * et);
        }
        z.zoom(null, G);
      };
    });
  }
  function v(d, g, y) {
    return !y && d.__zooming || new D(d, g);
  }
  function D(d, g) {
    this.that = d, this.args = g, this.active = 0, this.sourceEvent = null, this.extent = n.apply(d, g), this.taps = 0;
  }
  D.prototype = {
    event: function(d) {
      return d && (this.sourceEvent = d), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(d, g) {
      return this.mouse && d !== "mouse" && (this.mouse[1] = g.invert(this.mouse[0])), this.touch0 && d !== "touch" && (this.touch0[1] = g.invert(this.touch0[0])), this.touch1 && d !== "touch" && (this.touch1[1] = g.invert(this.touch1[0])), this.that.__zoom = g, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(d) {
      var g = mt(this.that).datum();
      c.call(
        d,
        this.that,
        new Ys(d, {
          sourceEvent: this.sourceEvent,
          target: w,
          transform: this.that.__zoom,
          dispatch: c
        }),
        g
      );
    }
  };
  function L(d, ...g) {
    if (!t.apply(this, arguments)) return;
    var y = v(this, g).event(d), x = this.__zoom, k = Math.max(o[0], Math.min(o[1], x.k * Math.pow(2, r.apply(this, arguments)))), $ = Nt(d);
    if (y.wheel)
      (y.mouse[0][0] !== $[0] || y.mouse[0][1] !== $[1]) && (y.mouse[1] = x.invert(y.mouse[0] = $)), clearTimeout(y.wheel);
    else {
      if (x.k === k) return;
      y.mouse = [$, x.invert($)], Tn(this), y.start();
    }
    Wt(d), y.wheel = setTimeout(z, m), y.zoom("mouse", e(E(M(x, k), y.mouse[0], y.mouse[1]), y.extent, u));
    function z() {
      y.wheel = null, y.end();
    }
  }
  function I(d, ...g) {
    if (h || !t.apply(this, arguments)) return;
    var y = d.currentTarget, x = v(this, g, !0).event(d), k = mt(d.view).on("mousemove.zoom", O, !0).on("mouseup.zoom", U, !0), $ = Nt(d, y), z = d.clientX, F = d.clientY;
    ta(d.view), le(d), x.mouse = [$, this.__zoom.invert($)], Tn(this), x.start();
    function O(V) {
      if (Wt(V), !x.moved) {
        var H = V.clientX - z, st = V.clientY - F;
        x.moved = H * H + st * st > _;
      }
      x.event(V).zoom("mouse", e(E(x.that.__zoom, x.mouse[0] = Nt(V, y), x.mouse[1]), x.extent, u));
    }
    function U(V) {
      k.on("mousemove.zoom mouseup.zoom", null), na(V.view, x.moved), Wt(V), x.event(V).end();
    }
  }
  function X(d, ...g) {
    if (t.apply(this, arguments)) {
      var y = this.__zoom, x = Nt(d.changedTouches ? d.changedTouches[0] : d, this), k = y.invert(x), $ = y.k * (d.shiftKey ? 0.5 : 2), z = e(E(M(y, $), x, k), n.apply(this, g), u);
      Wt(d), a > 0 ? mt(this).transition().duration(a).call(A, z, x, d) : mt(this).call(w.transform, z, x, d);
    }
  }
  function R(d, ...g) {
    if (t.apply(this, arguments)) {
      var y = d.touches, x = y.length, k = v(this, g, d.changedTouches.length === x).event(d), $, z, F, O;
      for (le(d), z = 0; z < x; ++z)
        F = y[z], O = Nt(F, this), O = [O, this.__zoom.invert(O), F.identifier], k.touch0 ? !k.touch1 && k.touch0[2] !== O[2] && (k.touch1 = O, k.taps = 0) : (k.touch0 = O, $ = !0, k.taps = 1 + !!s);
      s && (s = clearTimeout(s)), $ && (k.taps < 2 && (l = O[0], s = setTimeout(function() {
        s = null;
      }, p)), Tn(this), k.start());
    }
  }
  function P(d, ...g) {
    if (this.__zooming) {
      var y = v(this, g).event(d), x = d.changedTouches, k = x.length, $, z, F, O;
      for (Wt(d), $ = 0; $ < k; ++$)
        z = x[$], F = Nt(z, this), y.touch0 && y.touch0[2] === z.identifier ? y.touch0[0] = F : y.touch1 && y.touch1[2] === z.identifier && (y.touch1[0] = F);
      if (z = y.that.__zoom, y.touch1) {
        var U = y.touch0[0], V = y.touch0[1], H = y.touch1[0], st = y.touch1[1], G = (G = H[0] - U[0]) * G + (G = H[1] - U[1]) * G, tt = (tt = st[0] - V[0]) * tt + (tt = st[1] - V[1]) * tt;
        z = M(z, Math.sqrt(G / tt)), F = [(U[0] + H[0]) / 2, (U[1] + H[1]) / 2], O = [(V[0] + st[0]) / 2, (V[1] + st[1]) / 2];
      } else if (y.touch0) F = y.touch0[0], O = y.touch0[1];
      else return;
      y.zoom("touch", e(E(z, F, O), y.extent, u));
    }
  }
  function T(d, ...g) {
    if (this.__zooming) {
      var y = v(this, g).event(d), x = d.changedTouches, k = x.length, $, z;
      for (le(d), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, p), $ = 0; $ < k; ++$)
        z = x[$], y.touch0 && y.touch0[2] === z.identifier ? delete y.touch0 : y.touch1 && y.touch1[2] === z.identifier && delete y.touch1;
      if (y.touch1 && !y.touch0 && (y.touch0 = y.touch1, delete y.touch1), y.touch0) y.touch0[1] = this.__zoom.invert(y.touch0[0]);
      else if (y.end(), y.taps === 2 && (z = Nt(z, this), Math.hypot(l[0] - z[0], l[1] - z[1]) < b)) {
        var F = mt(this).on("dblclick.zoom");
        F && F.apply(this, arguments);
      }
    }
  }
  return w.wheelDelta = function(d) {
    return arguments.length ? (r = typeof d == "function" ? d : Sn(+d), w) : r;
  }, w.filter = function(d) {
    return arguments.length ? (t = typeof d == "function" ? d : Sn(!!d), w) : t;
  }, w.touchable = function(d) {
    return arguments.length ? (i = typeof d == "function" ? d : Sn(!!d), w) : i;
  }, w.extent = function(d) {
    return arguments.length ? (n = typeof d == "function" ? d : Sn([[+d[0][0], +d[0][1]], [+d[1][0], +d[1][1]]]), w) : n;
  }, w.scaleExtent = function(d) {
    return arguments.length ? (o[0] = +d[0], o[1] = +d[1], w) : [o[0], o[1]];
  }, w.translateExtent = function(d) {
    return arguments.length ? (u[0][0] = +d[0][0], u[1][0] = +d[1][0], u[0][1] = +d[0][1], u[1][1] = +d[1][1], w) : [[u[0][0], u[0][1]], [u[1][0], u[1][1]]];
  }, w.constrain = function(d) {
    return arguments.length ? (e = d, w) : e;
  }, w.duration = function(d) {
    return arguments.length ? (a = +d, w) : a;
  }, w.interpolate = function(d) {
    return arguments.length ? (f = d, w) : f;
  }, w.on = function() {
    var d = c.on.apply(c, arguments);
    return d === c ? w : d;
  }, w.clickDistance = function(d) {
    return arguments.length ? (_ = (d = +d) * d, w) : Math.sqrt(_);
  }, w.tapDistance = function(d) {
    return arguments.length ? (b = +d, w) : b;
  }, w;
}
function Js(t) {
  return t;
}
function Qs(t) {
  if (t == null) return Js;
  var n, e, r = t.scale[0], i = t.scale[1], o = t.translate[0], u = t.translate[1];
  return function(a, f) {
    f || (n = e = 0);
    var c = 2, s = a.length, l = new Array(s);
    for (l[0] = (n += a[0]) * r + o, l[1] = (e += a[1]) * i + u; c < s; ) l[c] = a[c], ++c;
    return l;
  };
}
function js(t, n) {
  for (var e, r = t.length, i = r - n; i < --r; ) e = t[i], t[i++] = t[r], t[r] = e;
}
function tc(t, n) {
  return typeof n == "string" && (n = t.objects[n]), n.type === "GeometryCollection" ? { type: "FeatureCollection", features: n.geometries.map(function(e) {
    return Tr(t, e);
  }) } : Tr(t, n);
}
function Tr(t, n) {
  var e = n.id, r = n.bbox, i = n.properties == null ? {} : n.properties, o = nc(t, n);
  return e == null && r == null ? { type: "Feature", properties: i, geometry: o } : r == null ? { type: "Feature", id: e, properties: i, geometry: o } : { type: "Feature", id: e, bbox: r, properties: i, geometry: o };
}
function nc(t, n) {
  var e = Qs(t.transform), r = t.arcs;
  function i(s, l) {
    l.length && l.pop();
    for (var h = r[s < 0 ? ~s : s], p = 0, m = h.length; p < m; ++p)
      l.push(e(h[p], p));
    s < 0 && js(l, m);
  }
  function o(s) {
    return e(s);
  }
  function u(s) {
    for (var l = [], h = 0, p = s.length; h < p; ++h) i(s[h], l);
    return l.length < 2 && l.push(l[0]), l;
  }
  function a(s) {
    for (var l = u(s); l.length < 4; ) l.push(l[0]);
    return l;
  }
  function f(s) {
    return s.map(a);
  }
  function c(s) {
    var l = s.type, h;
    switch (l) {
      case "GeometryCollection":
        return { type: l, geometries: s.geometries.map(c) };
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
    return { type: l, coordinates: h };
  }
  return c(n);
}
const rn = /* @__PURE__ */ new Map(), fe = /* @__PURE__ */ new Map();
async function ec(t) {
  const n = rn.get(t);
  if (n) return n;
  const e = fe.get(t);
  if (e) return e;
  const r = (async () => {
    const i = await fetch(t);
    if (!i.ok)
      throw new Error(`Failed to fetch ${t}: ${i.status} ${i.statusText}`);
    const o = await i.json(), u = Object.keys(o.objects)[0], a = tc(o, o.objects[u]);
    return rn.set(t, a), a;
  })();
  fe.set(t, r);
  try {
    return await r;
  } finally {
    fe.delete(t);
  }
}
function he(t) {
  const [n, e] = ft(0), [r, i] = ft(() => {
    if (!t) return { status: "idle" };
    const u = rn.get(t);
    return u ? { status: "ready", data: u } : { status: "loading" };
  });
  yt(() => {
    if (!t) {
      i({ status: "idle" });
      return;
    }
    const u = rn.get(t);
    if (u) {
      i({ status: "ready", data: u });
      return;
    }
    let a = !1;
    return i({ status: "loading" }), ec(t).then((f) => {
      a || i({ status: "ready", data: f });
    }).catch((f) => {
      a || i({ status: "error", error: f instanceof Error ? f : new Error(String(f)) });
    }), () => {
      a = !0;
    };
  }, [t, n]);
  const o = nt(() => {
    t && rn.delete(t), e((u) => u + 1);
  }, [t]);
  return [r, o];
}
const de = /* @__PURE__ */ new Map();
function rc(t) {
  const n = `${t}/meta.json`, [e, r] = ft(() => {
    const i = de.get(n);
    return i ? { status: "ready", data: i } : { status: "loading" };
  });
  return yt(() => {
    const i = de.get(n);
    if (i) {
      r({ status: "ready", data: i });
      return;
    }
    let o = !1;
    return r({ status: "loading" }), fetch(n).then((u) => {
      if (!u.ok) throw new Error(`Failed to fetch ${n}: ${u.status} ${u.statusText}`);
      return u.json();
    }).then((u) => {
      de.set(n, u), o || r({ status: "ready", data: u });
    }).catch(() => {
      o || r({ status: "error" });
    }), () => {
      o = !0;
    };
  }, [n]), e;
}
function In(t, n) {
  return t == null || n == null ? NaN : t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function ic(t, n) {
  return t == null || n == null ? NaN : n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
}
function Fi(t) {
  let n, e, r;
  t.length !== 2 ? (n = In, e = (a, f) => In(t(a), f), r = (a, f) => t(a) - f) : (n = t === In || t === ic ? t : oc, e = t, r = t);
  function i(a, f, c = 0, s = a.length) {
    if (c < s) {
      if (n(f, f) !== 0) return s;
      do {
        const l = c + s >>> 1;
        e(a[l], f) < 0 ? c = l + 1 : s = l;
      } while (c < s);
    }
    return c;
  }
  function o(a, f, c = 0, s = a.length) {
    if (c < s) {
      if (n(f, f) !== 0) return s;
      do {
        const l = c + s >>> 1;
        e(a[l], f) <= 0 ? c = l + 1 : s = l;
      } while (c < s);
    }
    return c;
  }
  function u(a, f, c = 0, s = a.length) {
    const l = i(a, f, c, s - 1);
    return l > c && r(a[l - 1], f) > -r(a[l], f) ? l - 1 : l;
  }
  return { left: i, center: u, right: o };
}
function oc() {
  return 0;
}
function uc(t) {
  return t === null ? NaN : +t;
}
const ac = Fi(In), sc = ac.right;
Fi(uc).center;
class Pt {
  constructor() {
    this._partials = new Float64Array(32), this._n = 0;
  }
  add(n) {
    const e = this._partials;
    let r = 0;
    for (let i = 0; i < this._n && i < 32; i++) {
      const o = e[i], u = n + o, a = Math.abs(n) < Math.abs(o) ? n - (u - o) : o - (u - n);
      a && (e[r++] = a), n = u;
    }
    return e[r] = n, this._n = r + 1, this;
  }
  valueOf() {
    const n = this._partials;
    let e = this._n, r, i, o, u = 0;
    if (e > 0) {
      for (u = n[--e]; e > 0 && (r = u, i = n[--e], u = r + i, o = i - (u - r), !o); )
        ;
      e > 0 && (o < 0 && n[e - 1] < 0 || o > 0 && n[e - 1] > 0) && (i = o * 2, r = u + i, i == r - u && (u = r));
    }
    return u;
  }
}
const cc = Math.sqrt(50), lc = Math.sqrt(10), fc = Math.sqrt(2);
function Yn(t, n, e) {
  const r = (n - t) / Math.max(0, e), i = Math.floor(Math.log10(r)), o = r / Math.pow(10, i), u = o >= cc ? 10 : o >= lc ? 5 : o >= fc ? 2 : 1;
  let a, f, c;
  return i < 0 ? (c = Math.pow(10, -i) / u, a = Math.round(t * c), f = Math.round(n * c), a / c < t && ++a, f / c > n && --f, c = -c) : (c = Math.pow(10, i) * u, a = Math.round(t / c), f = Math.round(n / c), a * c < t && ++a, f * c > n && --f), f < a && 0.5 <= e && e < 2 ? Yn(t, n, e * 2) : [a, f, c];
}
function hc(t, n, e) {
  if (n = +n, t = +t, e = +e, !(e > 0)) return [];
  if (t === n) return [t];
  const r = n < t, [i, o, u] = r ? Yn(n, t, e) : Yn(t, n, e);
  if (!(o >= i)) return [];
  const a = o - i + 1, f = new Array(a);
  if (r)
    if (u < 0) for (let c = 0; c < a; ++c) f[c] = (o - c) / -u;
    else for (let c = 0; c < a; ++c) f[c] = (o - c) * u;
  else if (u < 0) for (let c = 0; c < a; ++c) f[c] = (i + c) / -u;
  else for (let c = 0; c < a; ++c) f[c] = (i + c) * u;
  return f;
}
function ze(t, n, e) {
  return n = +n, t = +t, e = +e, Yn(t, n, e)[2];
}
function dc(t, n, e) {
  n = +n, t = +t, e = +e;
  const r = n < t, i = r ? ze(n, t, e) : ze(t, n, e);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function* pc(t) {
  for (const n of t)
    yield* n;
}
function Di(t) {
  return Array.from(pc(t));
}
var Y = 1e-6, q = Math.PI, it = q / 2, Ir = q / 4, at = q * 2, ot = 180 / q, Q = q / 180, K = Math.abs, Li = Math.atan, cn = Math.atan2, Z = Math.cos, gc = Math.exp, yc = Math.log, J = Math.sin, mc = Math.sign || function(t) {
  return t > 0 ? 1 : t < 0 ? -1 : 0;
}, Tt = Math.sqrt, vc = Math.tan;
function wc(t) {
  return t > 1 ? 0 : t < -1 ? q : Math.acos(t);
}
function ln(t) {
  return t > 1 ? it : t < -1 ? -it : Math.asin(t);
}
function lt() {
}
function Vn(t, n) {
  t && Dr.hasOwnProperty(t.type) && Dr[t.type](t, n);
}
var Fr = {
  Feature: function(t, n) {
    Vn(t.geometry, n);
  },
  FeatureCollection: function(t, n) {
    for (var e = t.features, r = -1, i = e.length; ++r < i; ) Vn(e[r].geometry, n);
  }
}, Dr = {
  Sphere: function(t, n) {
    n.sphere();
  },
  Point: function(t, n) {
    t = t.coordinates, n.point(t[0], t[1], t[2]);
  },
  MultiPoint: function(t, n) {
    for (var e = t.coordinates, r = -1, i = e.length; ++r < i; ) t = e[r], n.point(t[0], t[1], t[2]);
  },
  LineString: function(t, n) {
    Re(t.coordinates, n, 0);
  },
  MultiLineString: function(t, n) {
    for (var e = t.coordinates, r = -1, i = e.length; ++r < i; ) Re(e[r], n, 0);
  },
  Polygon: function(t, n) {
    Lr(t.coordinates, n);
  },
  MultiPolygon: function(t, n) {
    for (var e = t.coordinates, r = -1, i = e.length; ++r < i; ) Lr(e[r], n);
  },
  GeometryCollection: function(t, n) {
    for (var e = t.geometries, r = -1, i = e.length; ++r < i; ) Vn(e[r], n);
  }
};
function Re(t, n, e) {
  var r = -1, i = t.length - e, o;
  for (n.lineStart(); ++r < i; ) o = t[r], n.point(o[0], o[1], o[2]);
  n.lineEnd();
}
function Lr(t, n) {
  var e = -1, r = t.length;
  for (n.polygonStart(); ++e < r; ) Re(t[e], n, 1);
  n.polygonEnd();
}
function Dt(t, n) {
  t && Fr.hasOwnProperty(t.type) ? Fr[t.type](t, n) : Vn(t, n);
}
function Pe(t) {
  return [cn(t[1], t[0]), ln(t[2])];
}
function Ht(t) {
  var n = t[0], e = t[1], r = Z(e);
  return [r * Z(n), r * J(n), J(e)];
}
function Mn(t, n) {
  return t[0] * n[0] + t[1] * n[1] + t[2] * n[2];
}
function Un(t, n) {
  return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]];
}
function pe(t, n) {
  t[0] += n[0], t[1] += n[1], t[2] += n[2];
}
function kn(t, n) {
  return [t[0] * n, t[1] * n, t[2] * n];
}
function Ce(t) {
  var n = Tt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
  t[0] /= n, t[1] /= n, t[2] /= n;
}
function Te(t, n) {
  function e(r, i) {
    return r = t(r, i), n(r[0], r[1]);
  }
  return t.invert && n.invert && (e.invert = function(r, i) {
    return r = n.invert(r, i), r && t.invert(r[0], r[1]);
  }), e;
}
function Ie(t, n) {
  return K(t) > q && (t -= Math.round(t / at) * at), [t, n];
}
Ie.invert = Ie;
function Bi(t, n, e) {
  return (t %= at) ? n || e ? Te(Xr(t), qr(n, e)) : Xr(t) : n || e ? qr(n, e) : Ie;
}
function Br(t) {
  return function(n, e) {
    return n += t, K(n) > q && (n -= Math.round(n / at) * at), [n, e];
  };
}
function Xr(t) {
  var n = Br(t);
  return n.invert = Br(-t), n;
}
function qr(t, n) {
  var e = Z(t), r = J(t), i = Z(n), o = J(n);
  function u(a, f) {
    var c = Z(f), s = Z(a) * c, l = J(a) * c, h = J(f), p = h * e + s * r;
    return [
      cn(l * i - p * o, s * e - h * r),
      ln(p * i + l * o)
    ];
  }
  return u.invert = function(a, f) {
    var c = Z(f), s = Z(a) * c, l = J(a) * c, h = J(f), p = h * i - l * o;
    return [
      cn(l * i + h * o, s * e + p * r),
      ln(p * e - s * r)
    ];
  }, u;
}
function _c(t) {
  t = Bi(t[0] * Q, t[1] * Q, t.length > 2 ? t[2] * Q : 0);
  function n(e) {
    return e = t(e[0] * Q, e[1] * Q), e[0] *= ot, e[1] *= ot, e;
  }
  return n.invert = function(e) {
    return e = t.invert(e[0] * Q, e[1] * Q), e[0] *= ot, e[1] *= ot, e;
  }, n;
}
function xc(t, n, e, r, i, o) {
  if (e) {
    var u = Z(n), a = J(n), f = r * e;
    i == null ? (i = n + r * at, o = n - f / 2) : (i = Or(u, i), o = Or(u, o), (r > 0 ? i < o : i > o) && (i += r * at));
    for (var c, s = i; r > 0 ? s > o : s < o; s -= f)
      c = Pe([u, -a * Z(s), -a * J(s)]), t.point(c[0], c[1]);
  }
}
function Or(t, n) {
  n = Ht(n), n[0] -= t, Ce(n);
  var e = wc(-n[1]);
  return ((-n[2] < 0 ? -e : e) + at - Y) % at;
}
function Xi() {
  var t = [], n;
  return {
    point: function(e, r, i) {
      n.push([e, r, i]);
    },
    lineStart: function() {
      t.push(n = []);
    },
    lineEnd: lt,
    rejoin: function() {
      t.length > 1 && t.push(t.pop().concat(t.shift()));
    },
    result: function() {
      var e = t;
      return t = [], n = null, e;
    }
  };
}
function Fn(t, n) {
  return K(t[0] - n[0]) < Y && K(t[1] - n[1]) < Y;
}
function En(t, n, e, r) {
  this.x = t, this.z = n, this.o = e, this.e = r, this.v = !1, this.n = this.p = null;
}
function qi(t, n, e, r, i) {
  var o = [], u = [], a, f;
  if (t.forEach(function(m) {
    if (!((_ = m.length - 1) <= 0)) {
      var _, b = m[0], w = m[_], M;
      if (Fn(b, w)) {
        if (!b[2] && !w[2]) {
          for (i.lineStart(), a = 0; a < _; ++a) i.point((b = m[a])[0], b[1]);
          i.lineEnd();
          return;
        }
        w[0] += 2 * Y;
      }
      o.push(M = new En(b, m, null, !0)), u.push(M.o = new En(b, null, M, !1)), o.push(M = new En(w, m, null, !1)), u.push(M.o = new En(w, null, M, !0));
    }
  }), !!o.length) {
    for (u.sort(n), Hr(o), Hr(u), a = 0, f = u.length; a < f; ++a)
      u[a].e = e = !e;
    for (var c = o[0], s, l; ; ) {
      for (var h = c, p = !0; h.v; ) if ((h = h.n) === c) return;
      s = h.z, i.lineStart();
      do {
        if (h.v = h.o.v = !0, h.e) {
          if (p)
            for (a = 0, f = s.length; a < f; ++a) i.point((l = s[a])[0], l[1]);
          else
            r(h.x, h.n.x, 1, i);
          h = h.n;
        } else {
          if (p)
            for (s = h.p.z, a = s.length - 1; a >= 0; --a) i.point((l = s[a])[0], l[1]);
          else
            r(h.x, h.p.x, -1, i);
          h = h.p;
        }
        h = h.o, s = h.z, p = !p;
      } while (!h.v);
      i.lineEnd();
    }
  }
}
function Hr(t) {
  if (n = t.length) {
    for (var n, e = 0, r = t[0], i; ++e < n; )
      r.n = i = t[e], i.p = r, r = i;
    r.n = i = t[0], i.p = r;
  }
}
function ge(t) {
  return K(t[0]) <= q ? t[0] : mc(t[0]) * ((K(t[0]) + q) % at - q);
}
function bc(t, n) {
  var e = ge(n), r = n[1], i = J(r), o = [J(e), -Z(e), 0], u = 0, a = 0, f = new Pt();
  i === 1 ? r = it + Y : i === -1 && (r = -it - Y);
  for (var c = 0, s = t.length; c < s; ++c)
    if (h = (l = t[c]).length)
      for (var l, h, p = l[h - 1], m = ge(p), _ = p[1] / 2 + Ir, b = J(_), w = Z(_), M = 0; M < h; ++M, m = S, b = v, w = D, p = E) {
        var E = l[M], S = ge(E), A = E[1] / 2 + Ir, v = J(A), D = Z(A), L = S - m, I = L >= 0 ? 1 : -1, X = I * L, R = X > q, P = b * v;
        if (f.add(cn(P * I * J(X), w * D + P * Z(X))), u += R ? L + I * at : L, R ^ m >= e ^ S >= e) {
          var T = Un(Ht(p), Ht(E));
          Ce(T);
          var d = Un(o, T);
          Ce(d);
          var g = (R ^ L >= 0 ? -1 : 1) * ln(d[2]);
          (r > g || r === g && (T[0] || T[1])) && (a += R ^ L >= 0 ? 1 : -1);
        }
      }
  return (u < -Y || u < Y && f < -1e-12) ^ a & 1;
}
function Oi(t, n, e, r) {
  return function(i) {
    var o = n(i), u = Xi(), a = n(u), f = !1, c, s, l, h = {
      point: p,
      lineStart: _,
      lineEnd: b,
      polygonStart: function() {
        h.point = w, h.lineStart = M, h.lineEnd = E, s = [], c = [];
      },
      polygonEnd: function() {
        h.point = p, h.lineStart = _, h.lineEnd = b, s = Di(s);
        var S = bc(c, r);
        s.length ? (f || (i.polygonStart(), f = !0), qi(s, Mc, S, e, i)) : S && (f || (i.polygonStart(), f = !0), i.lineStart(), e(null, null, 1, i), i.lineEnd()), f && (i.polygonEnd(), f = !1), s = c = null;
      },
      sphere: function() {
        i.polygonStart(), i.lineStart(), e(null, null, 1, i), i.lineEnd(), i.polygonEnd();
      }
    };
    function p(S, A) {
      t(S, A) && i.point(S, A);
    }
    function m(S, A) {
      o.point(S, A);
    }
    function _() {
      h.point = m, o.lineStart();
    }
    function b() {
      h.point = p, o.lineEnd();
    }
    function w(S, A) {
      l.push([S, A]), a.point(S, A);
    }
    function M() {
      a.lineStart(), l = [];
    }
    function E() {
      w(l[0][0], l[0][1]), a.lineEnd();
      var S = a.clean(), A = u.result(), v, D = A.length, L, I, X;
      if (l.pop(), c.push(l), l = null, !!D) {
        if (S & 1) {
          if (I = A[0], (L = I.length - 1) > 0) {
            for (f || (i.polygonStart(), f = !0), i.lineStart(), v = 0; v < L; ++v) i.point((X = I[v])[0], X[1]);
            i.lineEnd();
          }
          return;
        }
        D > 1 && S & 2 && A.push(A.pop().concat(A.shift())), s.push(A.filter(Sc));
      }
    }
    return h;
  };
}
function Sc(t) {
  return t.length > 1;
}
function Mc(t, n) {
  return ((t = t.x)[0] < 0 ? t[1] - it - Y : it - t[1]) - ((n = n.x)[0] < 0 ? n[1] - it - Y : it - n[1]);
}
const Yr = Oi(
  function() {
    return !0;
  },
  kc,
  Nc,
  [-q, -it]
);
function kc(t) {
  var n = NaN, e = NaN, r = NaN, i;
  return {
    lineStart: function() {
      t.lineStart(), i = 1;
    },
    point: function(o, u) {
      var a = o > 0 ? q : -q, f = K(o - n);
      K(f - q) < Y ? (t.point(n, e = (e + u) / 2 > 0 ? it : -it), t.point(r, e), t.lineEnd(), t.lineStart(), t.point(a, e), t.point(o, e), i = 0) : r !== a && f >= q && (K(n - r) < Y && (n -= r * Y), K(o - a) < Y && (o -= a * Y), e = Ec(n, e, o, u), t.point(r, e), t.lineEnd(), t.lineStart(), t.point(a, e), i = 0), t.point(n = o, e = u), r = a;
    },
    lineEnd: function() {
      t.lineEnd(), n = e = NaN;
    },
    clean: function() {
      return 2 - i;
    }
  };
}
function Ec(t, n, e, r) {
  var i, o, u = J(t - e);
  return K(u) > Y ? Li((J(n) * (o = Z(r)) * J(e) - J(r) * (i = Z(n)) * J(t)) / (i * o * u)) : (n + r) / 2;
}
function Nc(t, n, e, r) {
  var i;
  if (t == null)
    i = e * it, r.point(-q, i), r.point(0, i), r.point(q, i), r.point(q, 0), r.point(q, -i), r.point(0, -i), r.point(-q, -i), r.point(-q, 0), r.point(-q, i);
  else if (K(t[0] - n[0]) > Y) {
    var o = t[0] < n[0] ? q : -q;
    i = e * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i);
  } else
    r.point(n[0], n[1]);
}
function $c(t) {
  var n = Z(t), e = 2 * Q, r = n > 0, i = K(n) > Y;
  function o(s, l, h, p) {
    xc(p, t, e, h, s, l);
  }
  function u(s, l) {
    return Z(s) * Z(l) > n;
  }
  function a(s) {
    var l, h, p, m, _;
    return {
      lineStart: function() {
        m = p = !1, _ = 1;
      },
      point: function(b, w) {
        var M = [b, w], E, S = u(b, w), A = r ? S ? 0 : c(b, w) : S ? c(b + (b < 0 ? q : -q), w) : 0;
        if (!l && (m = p = S) && s.lineStart(), S !== p && (E = f(l, M), (!E || Fn(l, E) || Fn(M, E)) && (M[2] = 1)), S !== p)
          _ = 0, S ? (s.lineStart(), E = f(M, l), s.point(E[0], E[1])) : (E = f(l, M), s.point(E[0], E[1], 2), s.lineEnd()), l = E;
        else if (i && l && r ^ S) {
          var v;
          !(A & h) && (v = f(M, l, !0)) && (_ = 0, r ? (s.lineStart(), s.point(v[0][0], v[0][1]), s.point(v[1][0], v[1][1]), s.lineEnd()) : (s.point(v[1][0], v[1][1]), s.lineEnd(), s.lineStart(), s.point(v[0][0], v[0][1], 3)));
        }
        S && (!l || !Fn(l, M)) && s.point(M[0], M[1]), l = M, p = S, h = A;
      },
      lineEnd: function() {
        p && s.lineEnd(), l = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return _ | (m && p) << 1;
      }
    };
  }
  function f(s, l, h) {
    var p = Ht(s), m = Ht(l), _ = [1, 0, 0], b = Un(p, m), w = Mn(b, b), M = b[0], E = w - M * M;
    if (!E) return !h && s;
    var S = n * w / E, A = -n * M / E, v = Un(_, b), D = kn(_, S), L = kn(b, A);
    pe(D, L);
    var I = v, X = Mn(D, I), R = Mn(I, I), P = X * X - R * (Mn(D, D) - 1);
    if (!(P < 0)) {
      var T = Tt(P), d = kn(I, (-X - T) / R);
      if (pe(d, D), d = Pe(d), !h) return d;
      var g = s[0], y = l[0], x = s[1], k = l[1], $;
      y < g && ($ = g, g = y, y = $);
      var z = y - g, F = K(z - q) < Y, O = F || z < Y;
      if (!F && k < x && ($ = x, x = k, k = $), O ? F ? x + k > 0 ^ d[1] < (K(d[0] - g) < Y ? x : k) : x <= d[1] && d[1] <= k : z > q ^ (g <= d[0] && d[0] <= y)) {
        var U = kn(I, (-X + T) / R);
        return pe(U, D), [d, Pe(U)];
      }
    }
  }
  function c(s, l) {
    var h = r ? t : q - t, p = 0;
    return s < -h ? p |= 1 : s > h && (p |= 2), l < -h ? p |= 4 : l > h && (p |= 8), p;
  }
  return Oi(u, a, o, r ? [0, -t] : [-q, t - q]);
}
function Ac(t, n, e, r, i, o) {
  var u = t[0], a = t[1], f = n[0], c = n[1], s = 0, l = 1, h = f - u, p = c - a, m;
  if (m = e - u, !(!h && m > 0)) {
    if (m /= h, h < 0) {
      if (m < s) return;
      m < l && (l = m);
    } else if (h > 0) {
      if (m > l) return;
      m > s && (s = m);
    }
    if (m = i - u, !(!h && m < 0)) {
      if (m /= h, h < 0) {
        if (m > l) return;
        m > s && (s = m);
      } else if (h > 0) {
        if (m < s) return;
        m < l && (l = m);
      }
      if (m = r - a, !(!p && m > 0)) {
        if (m /= p, p < 0) {
          if (m < s) return;
          m < l && (l = m);
        } else if (p > 0) {
          if (m > l) return;
          m > s && (s = m);
        }
        if (m = o - a, !(!p && m < 0)) {
          if (m /= p, p < 0) {
            if (m > l) return;
            m > s && (s = m);
          } else if (p > 0) {
            if (m < s) return;
            m < l && (l = m);
          }
          return s > 0 && (t[0] = u + s * h, t[1] = a + s * p), l < 1 && (n[0] = u + l * h, n[1] = a + l * p), !0;
        }
      }
    }
  }
}
var Qt = 1e9, Nn = -Qt;
function zc(t, n, e, r) {
  function i(c, s) {
    return t <= c && c <= e && n <= s && s <= r;
  }
  function o(c, s, l, h) {
    var p = 0, m = 0;
    if (c == null || (p = u(c, l)) !== (m = u(s, l)) || f(c, s) < 0 ^ l > 0)
      do
        h.point(p === 0 || p === 3 ? t : e, p > 1 ? r : n);
      while ((p = (p + l + 4) % 4) !== m);
    else
      h.point(s[0], s[1]);
  }
  function u(c, s) {
    return K(c[0] - t) < Y ? s > 0 ? 0 : 3 : K(c[0] - e) < Y ? s > 0 ? 2 : 1 : K(c[1] - n) < Y ? s > 0 ? 1 : 0 : s > 0 ? 3 : 2;
  }
  function a(c, s) {
    return f(c.x, s.x);
  }
  function f(c, s) {
    var l = u(c, 1), h = u(s, 1);
    return l !== h ? l - h : l === 0 ? s[1] - c[1] : l === 1 ? c[0] - s[0] : l === 2 ? c[1] - s[1] : s[0] - c[0];
  }
  return function(c) {
    var s = c, l = Xi(), h, p, m, _, b, w, M, E, S, A, v, D = {
      point: L,
      lineStart: P,
      lineEnd: T,
      polygonStart: X,
      polygonEnd: R
    };
    function L(g, y) {
      i(g, y) && s.point(g, y);
    }
    function I() {
      for (var g = 0, y = 0, x = p.length; y < x; ++y)
        for (var k = p[y], $ = 1, z = k.length, F = k[0], O, U, V = F[0], H = F[1]; $ < z; ++$)
          O = V, U = H, F = k[$], V = F[0], H = F[1], U <= r ? H > r && (V - O) * (r - U) > (H - U) * (t - O) && ++g : H <= r && (V - O) * (r - U) < (H - U) * (t - O) && --g;
      return g;
    }
    function X() {
      s = l, h = [], p = [], v = !0;
    }
    function R() {
      var g = I(), y = v && g, x = (h = Di(h)).length;
      (y || x) && (c.polygonStart(), y && (c.lineStart(), o(null, null, 1, c), c.lineEnd()), x && qi(h, a, g, o, c), c.polygonEnd()), s = c, h = p = m = null;
    }
    function P() {
      D.point = d, p && p.push(m = []), A = !0, S = !1, M = E = NaN;
    }
    function T() {
      h && (d(_, b), w && S && l.rejoin(), h.push(l.result())), D.point = L, S && s.lineEnd();
    }
    function d(g, y) {
      var x = i(g, y);
      if (p && m.push([g, y]), A)
        _ = g, b = y, w = x, A = !1, x && (s.lineStart(), s.point(g, y));
      else if (x && S) s.point(g, y);
      else {
        var k = [M = Math.max(Nn, Math.min(Qt, M)), E = Math.max(Nn, Math.min(Qt, E))], $ = [g = Math.max(Nn, Math.min(Qt, g)), y = Math.max(Nn, Math.min(Qt, y))];
        Ac(k, $, t, n, e, r) ? (S || (s.lineStart(), s.point(k[0], k[1])), s.point($[0], $[1]), x || s.lineEnd(), v = !1) : x && (s.lineStart(), s.point(g, y), v = !1);
      }
      M = g, E = y, S = x;
    }
    return D;
  };
}
const Fe = (t) => t;
var ye = new Pt(), De = new Pt(), Hi, Yi, Le, Be, St = {
  point: lt,
  lineStart: lt,
  lineEnd: lt,
  polygonStart: function() {
    St.lineStart = Rc, St.lineEnd = Cc;
  },
  polygonEnd: function() {
    St.lineStart = St.lineEnd = St.point = lt, ye.add(K(De)), De = new Pt();
  },
  result: function() {
    var t = ye / 2;
    return ye = new Pt(), t;
  }
};
function Rc() {
  St.point = Pc;
}
function Pc(t, n) {
  St.point = Vi, Hi = Le = t, Yi = Be = n;
}
function Vi(t, n) {
  De.add(Be * t - Le * n), Le = t, Be = n;
}
function Cc() {
  Vi(Hi, Yi);
}
var Yt = 1 / 0, Gn = Yt, fn = -Yt, Wn = fn, Kn = {
  point: Tc,
  lineStart: lt,
  lineEnd: lt,
  polygonStart: lt,
  polygonEnd: lt,
  result: function() {
    var t = [[Yt, Gn], [fn, Wn]];
    return fn = Wn = -(Gn = Yt = 1 / 0), t;
  }
};
function Tc(t, n) {
  t < Yt && (Yt = t), t > fn && (fn = t), n < Gn && (Gn = n), n > Wn && (Wn = n);
}
var Xe = 0, qe = 0, jt = 0, Zn = 0, Jn = 0, Lt = 0, Oe = 0, He = 0, tn = 0, Ui, Gi, vt, wt, ct = {
  point: Ct,
  lineStart: Vr,
  lineEnd: Ur,
  polygonStart: function() {
    ct.lineStart = Dc, ct.lineEnd = Lc;
  },
  polygonEnd: function() {
    ct.point = Ct, ct.lineStart = Vr, ct.lineEnd = Ur;
  },
  result: function() {
    var t = tn ? [Oe / tn, He / tn] : Lt ? [Zn / Lt, Jn / Lt] : jt ? [Xe / jt, qe / jt] : [NaN, NaN];
    return Xe = qe = jt = Zn = Jn = Lt = Oe = He = tn = 0, t;
  }
};
function Ct(t, n) {
  Xe += t, qe += n, ++jt;
}
function Vr() {
  ct.point = Ic;
}
function Ic(t, n) {
  ct.point = Fc, Ct(vt = t, wt = n);
}
function Fc(t, n) {
  var e = t - vt, r = n - wt, i = Tt(e * e + r * r);
  Zn += i * (vt + t) / 2, Jn += i * (wt + n) / 2, Lt += i, Ct(vt = t, wt = n);
}
function Ur() {
  ct.point = Ct;
}
function Dc() {
  ct.point = Bc;
}
function Lc() {
  Wi(Ui, Gi);
}
function Bc(t, n) {
  ct.point = Wi, Ct(Ui = vt = t, Gi = wt = n);
}
function Wi(t, n) {
  var e = t - vt, r = n - wt, i = Tt(e * e + r * r);
  Zn += i * (vt + t) / 2, Jn += i * (wt + n) / 2, Lt += i, i = wt * t - vt * n, Oe += i * (vt + t), He += i * (wt + n), tn += i * 3, Ct(vt = t, wt = n);
}
function Ki(t) {
  this._context = t;
}
Ki.prototype = {
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
        this._context.moveTo(t + this._radius, n), this._context.arc(t, n, this._radius, 0, at);
        break;
      }
    }
  },
  result: lt
};
var Ye = new Pt(), me, Zi, Ji, nn, en, hn = {
  point: lt,
  lineStart: function() {
    hn.point = Xc;
  },
  lineEnd: function() {
    me && Qi(Zi, Ji), hn.point = lt;
  },
  polygonStart: function() {
    me = !0;
  },
  polygonEnd: function() {
    me = null;
  },
  result: function() {
    var t = +Ye;
    return Ye = new Pt(), t;
  }
};
function Xc(t, n) {
  hn.point = Qi, Zi = nn = t, Ji = en = n;
}
function Qi(t, n) {
  nn -= t, en -= n, Ye.add(Tt(nn * nn + en * en)), nn = t, en = n;
}
let Gr, Qn, Wr, Kr;
class Zr {
  constructor(n) {
    this._append = n == null ? ji : qc(n), this._radius = 4.5, this._ = "";
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
        if (this._append`M${n},${e}`, this._radius !== Wr || this._append !== Qn) {
          const r = this._radius, i = this._;
          this._ = "", this._append`m0,${r}a${r},${r} 0 1,1 0,${-2 * r}a${r},${r} 0 1,1 0,${2 * r}z`, Wr = r, Qn = this._append, Kr = this._, this._ = i;
        }
        this._ += Kr;
        break;
      }
    }
  }
  result() {
    const n = this._;
    return this._ = "", n.length ? n : null;
  }
}
function ji(t) {
  let n = 1;
  this._ += t[0];
  for (const e = t.length; n < e; ++n)
    this._ += arguments[n] + t[n];
}
function qc(t) {
  const n = Math.floor(t);
  if (!(n >= 0)) throw new RangeError(`invalid digits: ${t}`);
  if (n > 15) return ji;
  if (n !== Gr) {
    const e = 10 ** n;
    Gr = n, Qn = function(i) {
      let o = 1;
      this._ += i[0];
      for (const u = i.length; o < u; ++o)
        this._ += Math.round(arguments[o] * e) / e + i[o];
    };
  }
  return Qn;
}
function Oc(t, n) {
  let e = 3, r = 4.5, i, o;
  function u(a) {
    return a && (typeof r == "function" && o.pointRadius(+r.apply(this, arguments)), Dt(a, i(o))), o.result();
  }
  return u.area = function(a) {
    return Dt(a, i(St)), St.result();
  }, u.measure = function(a) {
    return Dt(a, i(hn)), hn.result();
  }, u.bounds = function(a) {
    return Dt(a, i(Kn)), Kn.result();
  }, u.centroid = function(a) {
    return Dt(a, i(ct)), ct.result();
  }, u.projection = function(a) {
    return arguments.length ? (i = a == null ? (t = null, Fe) : (t = a).stream, u) : t;
  }, u.context = function(a) {
    return arguments.length ? (o = a == null ? (n = null, new Zr(e)) : new Ki(n = a), typeof r != "function" && o.pointRadius(r), u) : n;
  }, u.pointRadius = function(a) {
    return arguments.length ? (r = typeof a == "function" ? a : (o.pointRadius(+a), +a), u) : r;
  }, u.digits = function(a) {
    if (!arguments.length) return e;
    if (a == null) e = null;
    else {
      const f = Math.floor(a);
      if (!(f >= 0)) throw new RangeError(`invalid digits: ${a}`);
      e = f;
    }
    return n === null && (o = new Zr(e)), u;
  }, u.projection(t).digits(e).context(n);
}
function rr(t) {
  return function(n) {
    var e = new Ve();
    for (var r in t) e[r] = t[r];
    return e.stream = n, e;
  };
}
function Ve() {
}
Ve.prototype = {
  constructor: Ve,
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
function ir(t, n, e) {
  var r = t.clipExtent && t.clipExtent();
  return t.scale(150).translate([0, 0]), r != null && t.clipExtent(null), Dt(e, t.stream(Kn)), n(Kn.result()), r != null && t.clipExtent(r), t;
}
function to(t, n, e) {
  return ir(t, function(r) {
    var i = n[1][0] - n[0][0], o = n[1][1] - n[0][1], u = Math.min(i / (r[1][0] - r[0][0]), o / (r[1][1] - r[0][1])), a = +n[0][0] + (i - u * (r[1][0] + r[0][0])) / 2, f = +n[0][1] + (o - u * (r[1][1] + r[0][1])) / 2;
    t.scale(150 * u).translate([a, f]);
  }, e);
}
function Hc(t, n, e) {
  return to(t, [[0, 0], n], e);
}
function Yc(t, n, e) {
  return ir(t, function(r) {
    var i = +n, o = i / (r[1][0] - r[0][0]), u = (i - o * (r[1][0] + r[0][0])) / 2, a = -o * r[0][1];
    t.scale(150 * o).translate([u, a]);
  }, e);
}
function Vc(t, n, e) {
  return ir(t, function(r) {
    var i = +n, o = i / (r[1][1] - r[0][1]), u = -o * r[0][0], a = (i - o * (r[1][1] + r[0][1])) / 2;
    t.scale(150 * o).translate([u, a]);
  }, e);
}
var Jr = 16, Uc = Z(30 * Q);
function Qr(t, n) {
  return +n ? Wc(t, n) : Gc(t);
}
function Gc(t) {
  return rr({
    point: function(n, e) {
      n = t(n, e), this.stream.point(n[0], n[1]);
    }
  });
}
function Wc(t, n) {
  function e(r, i, o, u, a, f, c, s, l, h, p, m, _, b) {
    var w = c - r, M = s - i, E = w * w + M * M;
    if (E > 4 * n && _--) {
      var S = u + h, A = a + p, v = f + m, D = Tt(S * S + A * A + v * v), L = ln(v /= D), I = K(K(v) - 1) < Y || K(o - l) < Y ? (o + l) / 2 : cn(A, S), X = t(I, L), R = X[0], P = X[1], T = R - r, d = P - i, g = M * T - w * d;
      (g * g / E > n || K((w * T + M * d) / E - 0.5) > 0.3 || u * h + a * p + f * m < Uc) && (e(r, i, o, u, a, f, R, P, I, S /= D, A /= D, v, _, b), b.point(R, P), e(R, P, I, S, A, v, c, s, l, h, p, m, _, b));
    }
  }
  return function(r) {
    var i, o, u, a, f, c, s, l, h, p, m, _, b = {
      point: w,
      lineStart: M,
      lineEnd: S,
      polygonStart: function() {
        r.polygonStart(), b.lineStart = A;
      },
      polygonEnd: function() {
        r.polygonEnd(), b.lineStart = M;
      }
    };
    function w(L, I) {
      L = t(L, I), r.point(L[0], L[1]);
    }
    function M() {
      l = NaN, b.point = E, r.lineStart();
    }
    function E(L, I) {
      var X = Ht([L, I]), R = t(L, I);
      e(l, h, s, p, m, _, l = R[0], h = R[1], s = L, p = X[0], m = X[1], _ = X[2], Jr, r), r.point(l, h);
    }
    function S() {
      b.point = w, r.lineEnd();
    }
    function A() {
      M(), b.point = v, b.lineEnd = D;
    }
    function v(L, I) {
      E(i = L, I), o = l, u = h, a = p, f = m, c = _, b.point = E;
    }
    function D() {
      e(l, h, s, p, m, _, o, u, i, a, f, c, Jr, r), b.lineEnd = S, S();
    }
    return b;
  };
}
var Kc = rr({
  point: function(t, n) {
    this.stream.point(t * Q, n * Q);
  }
});
function Zc(t) {
  return rr({
    point: function(n, e) {
      var r = t(n, e);
      return this.stream.point(r[0], r[1]);
    }
  });
}
function Jc(t, n, e, r, i) {
  function o(u, a) {
    return u *= r, a *= i, [n + t * u, e - t * a];
  }
  return o.invert = function(u, a) {
    return [(u - n) / t * r, (e - a) / t * i];
  }, o;
}
function jr(t, n, e, r, i, o) {
  if (!o) return Jc(t, n, e, r, i);
  var u = Z(o), a = J(o), f = u * t, c = a * t, s = u / t, l = a / t, h = (a * e - u * n) / t, p = (a * n + u * e) / t;
  function m(_, b) {
    return _ *= r, b *= i, [f * _ - c * b + n, e - c * _ - f * b];
  }
  return m.invert = function(_, b) {
    return [r * (s * _ - l * b + h), i * (p - l * _ - s * b)];
  }, m;
}
function Qc(t) {
  return jc(function() {
    return t;
  })();
}
function jc(t) {
  var n, e = 150, r = 480, i = 250, o = 0, u = 0, a = 0, f = 0, c = 0, s, l = 0, h = 1, p = 1, m = null, _ = Yr, b = null, w, M, E, S = Fe, A = 0.5, v, D, L, I, X;
  function R(g) {
    return L(g[0] * Q, g[1] * Q);
  }
  function P(g) {
    return g = L.invert(g[0], g[1]), g && [g[0] * ot, g[1] * ot];
  }
  R.stream = function(g) {
    return I && X === g ? I : I = Kc(Zc(s)(_(v(S(X = g)))));
  }, R.preclip = function(g) {
    return arguments.length ? (_ = g, m = void 0, d()) : _;
  }, R.postclip = function(g) {
    return arguments.length ? (S = g, b = w = M = E = null, d()) : S;
  }, R.clipAngle = function(g) {
    return arguments.length ? (_ = +g ? $c(m = g * Q) : (m = null, Yr), d()) : m * ot;
  }, R.clipExtent = function(g) {
    return arguments.length ? (S = g == null ? (b = w = M = E = null, Fe) : zc(b = +g[0][0], w = +g[0][1], M = +g[1][0], E = +g[1][1]), d()) : b == null ? null : [[b, w], [M, E]];
  }, R.scale = function(g) {
    return arguments.length ? (e = +g, T()) : e;
  }, R.translate = function(g) {
    return arguments.length ? (r = +g[0], i = +g[1], T()) : [r, i];
  }, R.center = function(g) {
    return arguments.length ? (o = g[0] % 360 * Q, u = g[1] % 360 * Q, T()) : [o * ot, u * ot];
  }, R.rotate = function(g) {
    return arguments.length ? (a = g[0] % 360 * Q, f = g[1] % 360 * Q, c = g.length > 2 ? g[2] % 360 * Q : 0, T()) : [a * ot, f * ot, c * ot];
  }, R.angle = function(g) {
    return arguments.length ? (l = g % 360 * Q, T()) : l * ot;
  }, R.reflectX = function(g) {
    return arguments.length ? (h = g ? -1 : 1, T()) : h < 0;
  }, R.reflectY = function(g) {
    return arguments.length ? (p = g ? -1 : 1, T()) : p < 0;
  }, R.precision = function(g) {
    return arguments.length ? (v = Qr(D, A = g * g), d()) : Tt(A);
  }, R.fitExtent = function(g, y) {
    return to(R, g, y);
  }, R.fitSize = function(g, y) {
    return Hc(R, g, y);
  }, R.fitWidth = function(g, y) {
    return Yc(R, g, y);
  }, R.fitHeight = function(g, y) {
    return Vc(R, g, y);
  };
  function T() {
    var g = jr(e, 0, 0, h, p, l).apply(null, n(o, u)), y = jr(e, r - g[0], i - g[1], h, p, l);
    return s = Bi(a, f, c), D = Te(n, y), L = Te(s, D), v = Qr(D, A), d();
  }
  function d() {
    return I = X = null, R;
  }
  return function() {
    return n = t.apply(this, arguments), R.invert = n.invert && P, T();
  };
}
function or(t, n) {
  return [t, yc(vc((it + n) / 2))];
}
or.invert = function(t, n) {
  return [t, 2 * Li(gc(n)) - it];
};
function tl() {
  return nl(or).scale(961 / at);
}
function nl(t) {
  var n = Qc(t), e = n.center, r = n.scale, i = n.translate, o = n.clipExtent, u = null, a, f, c;
  n.scale = function(l) {
    return arguments.length ? (r(l), s()) : r();
  }, n.translate = function(l) {
    return arguments.length ? (i(l), s()) : i();
  }, n.center = function(l) {
    return arguments.length ? (e(l), s()) : e();
  }, n.clipExtent = function(l) {
    return arguments.length ? (l == null ? u = a = f = c = null : (u = +l[0][0], a = +l[0][1], f = +l[1][0], c = +l[1][1]), s()) : u == null ? null : [[u, a], [f, c]];
  };
  function s() {
    var l = q * r(), h = n(_c(n.rotate()).invert([0, 0]));
    return o(u == null ? [[h[0] - l, h[1] - l], [h[0] + l, h[1] + l]] : t === or ? [[Math.max(h[0] - l, u), a], [Math.min(h[0] + l, f), c]] : [[u, Math.max(h[1] - l, a)], [f, Math.min(h[1] + l, c)]]);
  }
  return s();
}
function el(t, n, e) {
  return tl().fitSize([n, e], t);
}
function rl(t) {
  return Oc(t);
}
const il = 0.9;
function no(t, n, e) {
  const [[r, i], [o, u]] = t, a = Math.max(o - r, 1e-6), f = Math.max(u - i, 1e-6);
  return il / Math.max(a / n, f / e);
}
function ol(t, n, e, r, i) {
  const o = t.bounds(n), [[u, a], [f, c]] = o, s = (u + f) / 2, l = (a + c) / 2, h = Math.min(i, no(o, e, r));
  return new pt(h, e / 2 - h * s, r / 2 - h * l);
}
function ul(t, n, e, r) {
  const [i, o, u, a] = n, f = {
    type: "Feature",
    properties: null,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [i, o],
          [i, a],
          [u, a],
          [u, o],
          [i, o]
        ]
      ]
    }
  };
  return no(t.bounds(f), e, r);
}
function al(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}
function sl(t, n, e, r = 750) {
  const i = mt(t), o = Ii(t), u = performance.now();
  function a(f) {
    const c = Math.min(1, (f - u) / r), s = al(c), l = new pt(
      o.k + (e.k - o.k) * s,
      o.x + (e.x - o.x) * s,
      o.y + (e.y - o.y) * s
    );
    n.transform(i, l), c < 1 && requestAnimationFrame(a);
  }
  requestAnimationFrame(a);
}
function cl(t, n) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(n).domain(t);
      break;
  }
  return this;
}
function ll(t) {
  return function() {
    return t;
  };
}
function fl(t) {
  return +t;
}
var ti = [0, 1];
function Bt(t) {
  return t;
}
function Ue(t, n) {
  return (n -= t = +t) ? function(e) {
    return (e - t) / n;
  } : ll(isNaN(n) ? NaN : 0.5);
}
function hl(t, n) {
  var e;
  return t > n && (e = t, t = n, n = e), function(r) {
    return Math.max(t, Math.min(n, r));
  };
}
function dl(t, n, e) {
  var r = t[0], i = t[1], o = n[0], u = n[1];
  return i < r ? (r = Ue(i, r), o = e(u, o)) : (r = Ue(r, i), o = e(o, u)), function(a) {
    return o(r(a));
  };
}
function pl(t, n, e) {
  var r = Math.min(t.length, n.length) - 1, i = new Array(r), o = new Array(r), u = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), n = n.slice().reverse()); ++u < r; )
    i[u] = Ue(t[u], t[u + 1]), o[u] = e(n[u], n[u + 1]);
  return function(a) {
    var f = sc(t, a, 1, r) - 1;
    return o[f](i[f](a));
  };
}
function gl(t, n) {
  return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function yl() {
  var t = ti, n = ti, e = je, r, i, o, u = Bt, a, f, c;
  function s() {
    var h = Math.min(t.length, n.length);
    return u !== Bt && (u = hl(t[0], t[h - 1])), a = h > 2 ? pl : dl, f = c = null, l;
  }
  function l(h) {
    return h == null || isNaN(h = +h) ? o : (f || (f = a(t.map(r), n, e)))(r(u(h)));
  }
  return l.invert = function(h) {
    return u(i((c || (c = a(n, t.map(r), ht)))(h)));
  }, l.domain = function(h) {
    return arguments.length ? (t = Array.from(h, fl), s()) : t.slice();
  }, l.range = function(h) {
    return arguments.length ? (n = Array.from(h), s()) : n.slice();
  }, l.rangeRound = function(h) {
    return n = Array.from(h), e = Ma, s();
  }, l.clamp = function(h) {
    return arguments.length ? (u = h ? !0 : Bt, s()) : u !== Bt;
  }, l.interpolate = function(h) {
    return arguments.length ? (e = h, s()) : e;
  }, l.unknown = function(h) {
    return arguments.length ? (o = h, l) : o;
  }, function(h, p) {
    return r = h, i = p, s();
  };
}
function ml() {
  return yl()(Bt, Bt);
}
function vl(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function jn(t, n) {
  if (!isFinite(t) || t === 0) return null;
  var e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf("e"), r = t.slice(0, e);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(e + 1)
  ];
}
function Vt(t) {
  return t = jn(Math.abs(t)), t ? t[1] : NaN;
}
function wl(t, n) {
  return function(e, r) {
    for (var i = e.length, o = [], u = 0, a = t[0], f = 0; i > 0 && a > 0 && (f + a + 1 > r && (a = Math.max(1, r - f)), o.push(e.substring(i -= a, i + a)), !((f += a + 1) > r)); )
      a = t[u = (u + 1) % t.length];
    return o.reverse().join(n);
  };
}
function _l(t) {
  return function(n) {
    return n.replace(/[0-9]/g, function(e) {
      return t[+e];
    });
  };
}
var xl = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function te(t) {
  if (!(n = xl.exec(t))) throw new Error("invalid format: " + t);
  var n;
  return new ur({
    fill: n[1],
    align: n[2],
    sign: n[3],
    symbol: n[4],
    zero: n[5],
    width: n[6],
    comma: n[7],
    precision: n[8] && n[8].slice(1),
    trim: n[9],
    type: n[10]
  });
}
te.prototype = ur.prototype;
function ur(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
ur.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function bl(t) {
  t: for (var n = t.length, e = 1, r = -1, i; e < n; ++e)
    switch (t[e]) {
      case ".":
        r = i = e;
        break;
      case "0":
        r === 0 && (r = e), i = e;
        break;
      default:
        if (!+t[e]) break t;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? t.slice(0, r) + t.slice(i + 1) : t;
}
var ne;
function Sl(t, n) {
  var e = jn(t, n);
  if (!e) return ne = void 0, t.toPrecision(n);
  var r = e[0], i = e[1], o = i - (ne = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, u = r.length;
  return o === u ? r : o > u ? r + new Array(o - u + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + jn(t, Math.max(0, n + o - 1))[0];
}
function ni(t, n) {
  var e = jn(t, n);
  if (!e) return t + "";
  var r = e[0], i = e[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const ei = {
  "%": (t, n) => (t * 100).toFixed(n),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: vl,
  e: (t, n) => t.toExponential(n),
  f: (t, n) => t.toFixed(n),
  g: (t, n) => t.toPrecision(n),
  o: (t) => Math.round(t).toString(8),
  p: (t, n) => ni(t * 100, n),
  r: ni,
  s: Sl,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function ri(t) {
  return t;
}
var ii = Array.prototype.map, oi = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Ml(t) {
  var n = t.grouping === void 0 || t.thousands === void 0 ? ri : wl(ii.call(t.grouping, Number), t.thousands + ""), e = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", o = t.numerals === void 0 ? ri : _l(ii.call(t.numerals, String)), u = t.percent === void 0 ? "%" : t.percent + "", a = t.minus === void 0 ? "−" : t.minus + "", f = t.nan === void 0 ? "NaN" : t.nan + "";
  function c(l, h) {
    l = te(l);
    var p = l.fill, m = l.align, _ = l.sign, b = l.symbol, w = l.zero, M = l.width, E = l.comma, S = l.precision, A = l.trim, v = l.type;
    v === "n" ? (E = !0, v = "g") : ei[v] || (S === void 0 && (S = 12), A = !0, v = "g"), (w || p === "0" && m === "=") && (w = !0, p = "0", m = "=");
    var D = (h && h.prefix !== void 0 ? h.prefix : "") + (b === "$" ? e : b === "#" && /[boxX]/.test(v) ? "0" + v.toLowerCase() : ""), L = (b === "$" ? r : /[%p]/.test(v) ? u : "") + (h && h.suffix !== void 0 ? h.suffix : ""), I = ei[v], X = /[defgprs%]/.test(v);
    S = S === void 0 ? 6 : /[gprs]/.test(v) ? Math.max(1, Math.min(21, S)) : Math.max(0, Math.min(20, S));
    function R(P) {
      var T = D, d = L, g, y, x;
      if (v === "c")
        d = I(P) + d, P = "";
      else {
        P = +P;
        var k = P < 0 || 1 / P < 0;
        if (P = isNaN(P) ? f : I(Math.abs(P), S), A && (P = bl(P)), k && +P == 0 && _ !== "+" && (k = !1), T = (k ? _ === "(" ? _ : a : _ === "-" || _ === "(" ? "" : _) + T, d = (v === "s" && !isNaN(P) && ne !== void 0 ? oi[8 + ne / 3] : "") + d + (k && _ === "(" ? ")" : ""), X) {
          for (g = -1, y = P.length; ++g < y; )
            if (x = P.charCodeAt(g), 48 > x || x > 57) {
              d = (x === 46 ? i + P.slice(g + 1) : P.slice(g)) + d, P = P.slice(0, g);
              break;
            }
        }
      }
      E && !w && (P = n(P, 1 / 0));
      var $ = T.length + P.length + d.length, z = $ < M ? new Array(M - $ + 1).join(p) : "";
      switch (E && w && (P = n(z + P, z.length ? M - d.length : 1 / 0), z = ""), m) {
        case "<":
          P = T + P + d + z;
          break;
        case "=":
          P = T + z + P + d;
          break;
        case "^":
          P = z.slice(0, $ = z.length >> 1) + T + P + d + z.slice($);
          break;
        default:
          P = z + T + P + d;
          break;
      }
      return o(P);
    }
    return R.toString = function() {
      return l + "";
    }, R;
  }
  function s(l, h) {
    var p = Math.max(-8, Math.min(8, Math.floor(Vt(h) / 3))) * 3, m = Math.pow(10, -p), _ = c((l = te(l), l.type = "f", l), { suffix: oi[8 + p / 3] });
    return function(b) {
      return _(m * b);
    };
  }
  return {
    format: c,
    formatPrefix: s
  };
}
var $n, eo, ro;
kl({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function kl(t) {
  return $n = Ml(t), eo = $n.format, ro = $n.formatPrefix, $n;
}
function El(t) {
  return Math.max(0, -Vt(Math.abs(t)));
}
function Nl(t, n) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Vt(n) / 3))) * 3 - Vt(Math.abs(t)));
}
function $l(t, n) {
  return t = Math.abs(t), n = Math.abs(n) - t, Math.max(0, Vt(n) - Vt(t)) + 1;
}
function Al(t, n, e, r) {
  var i = dc(t, n, e), o;
  switch (r = te(r ?? ",f"), r.type) {
    case "s": {
      var u = Math.max(Math.abs(t), Math.abs(n));
      return r.precision == null && !isNaN(o = Nl(i, u)) && (r.precision = o), ro(r, u);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(o = $l(i, Math.max(Math.abs(t), Math.abs(n)))) && (r.precision = o - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(o = El(i)) && (r.precision = o - (r.type === "%") * 2);
      break;
    }
  }
  return eo(r);
}
function zl(t) {
  var n = t.domain;
  return t.ticks = function(e) {
    var r = n();
    return hc(r[0], r[r.length - 1], e ?? 10);
  }, t.tickFormat = function(e, r) {
    var i = n();
    return Al(i[0], i[i.length - 1], e ?? 10, r);
  }, t.nice = function(e) {
    e == null && (e = 10);
    var r = n(), i = 0, o = r.length - 1, u = r[i], a = r[o], f, c, s = 10;
    for (a < u && (c = u, u = a, a = c, c = i, i = o, o = c); s-- > 0; ) {
      if (c = ze(u, a, e), c === f)
        return r[i] = u, r[o] = a, n(r);
      if (c > 0)
        u = Math.floor(u / c) * c, a = Math.ceil(a / c) * c;
      else if (c < 0)
        u = Math.ceil(u * c) / c, a = Math.floor(a * c) / c;
      else
        break;
      f = c;
    }
    return t;
  }, t;
}
function io() {
  var t = ml();
  return t.copy = function() {
    return gl(t, io());
  }, cl.apply(t, arguments), zl(t);
}
function oo(t) {
  return "scale" in t;
}
function uo(t) {
  return typeof t == "number" ? t.toLocaleString() : t;
}
function Rl(t) {
  const n = new Map(t.values.map((i) => [i.code, i.value]));
  if (oo(t.colors)) {
    const { scale: i, noData: o } = t.colors, u = t.values.map((l) => l.value).filter((l) => typeof l == "number" && !Number.isNaN(l));
    if (u.length === 0 || i.length === 0)
      return () => o;
    const a = Math.min(...u), f = Math.max(...u);
    if (a === f) {
      const l = i[i.length - 1];
      return (h) => n.has(h) ? l : o;
    }
    const c = i.map((l, h) => a + h / (i.length - 1) * (f - a)), s = io().domain(c).range(i).clamp(!0);
    return (l) => {
      const h = n.get(l);
      return typeof h == "number" ? s(h) : o;
    };
  }
  const { categories: e, noData: r } = t.colors;
  return (i) => {
    const o = n.get(i);
    return o === void 0 ? r : e[String(o)] ?? r;
  };
}
function Pl(t, n) {
  const e = {};
  for (const r of n) {
    if (r.level !== t.level) {
      e[r.id] = void 0;
      continue;
    }
    const i = r.values.find((o) => o.code === t.code);
    if (!i) {
      e[r.id] = void 0;
      continue;
    }
    e[r.id] = {
      value: i.value,
      formatted: r.format ? r.format(i.value) : uo(i.value)
    };
  }
  return e;
}
var ci;
const Cl = typeof process < "u" && ((ci = process.env) == null ? void 0 : ci.NODE_ENV) !== "production", ui = /* @__PURE__ */ new Set(), ai = /* @__PURE__ */ new Set();
function Tl(t) {
  var n;
  for (const e of t) {
    const r = (n = e.properties) == null ? void 0 : n.code;
    r && ai.add(r);
  }
  return ai;
}
function ve(t, n, e) {
  if (Cl)
    for (const { code: r } of t.values) {
      if (n.has(r)) continue;
      const i = `${t.id}:${t.level}:${r}`;
      ui.has(i) || (ui.add(i), console.warn(
        `[@debunktech/kenya-map] Dataset "${t.id}" has a value for ${t.level} code "${r}", which doesn't match any currently-known ${t.level}${e === "exact" ? "" : ` (${e})`}.`
      ));
    }
}
const Ge = {
  background: "var(--kenya-map-panel-bg, rgba(255,255,255,0.92))",
  border: "1px solid var(--kenya-map-stroke, #71717a)",
  borderRadius: 6,
  padding: 8,
  fontFamily: "sans-serif",
  fontSize: 12
};
function Il({
  datasets: t,
  activeDatasetId: n,
  currentLevel: e,
  onChange: r
}) {
  return /* @__PURE__ */ C("div", { role: "radiogroup", "aria-label": "Dataset", style: { ...Ge, display: "flex", flexDirection: "column", gap: 4 }, children: t.map((i) => {
    const o = i.level === e, u = i.id === n;
    return /* @__PURE__ */ j(
      "button",
      {
        type: "button",
        role: "radio",
        "aria-checked": u,
        onClick: () => r(i.id),
        title: o ? void 0 : `Colors the map at ${i.level} level`,
        style: {
          font: "inherit",
          textAlign: "left",
          border: "none",
          borderRadius: 4,
          padding: "2px 6px",
          cursor: "pointer",
          background: u ? "var(--kenya-map-focus-color, #2563eb)" : "transparent",
          color: u ? "#fff" : "inherit",
          opacity: o ? 1 : 0.6
        },
        children: [
          i.label,
          !o && ` (${i.level})`
        ]
      },
      i.id
    );
  }) });
}
function Fl({ dataset: t }) {
  const n = t.format ?? uo;
  if (oo(t.colors)) {
    const r = t.values.map((u) => u.value).filter((u) => typeof u == "number");
    if (r.length === 0) return null;
    const i = Math.min(...r), o = Math.max(...r);
    return /* @__PURE__ */ j("div", { style: Ge, children: [
      /* @__PURE__ */ C("div", { style: { marginBottom: 4, fontWeight: 600 }, children: t.label }),
      /* @__PURE__ */ C(
        "div",
        {
          style: {
            width: 120,
            height: 10,
            borderRadius: 2,
            background: `linear-gradient(to right, ${t.colors.scale.join(",")})`
          }
        }
      ),
      /* @__PURE__ */ j("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 2 }, children: [
        /* @__PURE__ */ C("span", { children: n(i) }),
        /* @__PURE__ */ C("span", { children: n(o) })
      ] })
    ] });
  }
  const e = Object.entries(t.colors.categories);
  return /* @__PURE__ */ j("div", { style: Ge, children: [
    /* @__PURE__ */ C("div", { style: { marginBottom: 4, fontWeight: 600 }, children: t.label }),
    e.map(([r, i]) => /* @__PURE__ */ j("div", { style: { display: "flex", alignItems: "center", gap: 6, marginTop: 2 }, children: [
      /* @__PURE__ */ C("span", { style: { width: 10, height: 10, borderRadius: 2, background: i, flexShrink: 0 }, "aria-hidden": "true" }),
      /* @__PURE__ */ C("span", { children: r })
    ] }, r))
  ] });
}
function Dl(t, n) {
  var e;
  if (n.category) {
    const r = (e = t.categoryColors) == null ? void 0 : e[n.category];
    if (r) return r;
  }
  return t.color;
}
const Ll = {
  background: "var(--kenya-map-panel-bg, rgba(255,255,255,0.92))",
  border: "1px solid var(--kenya-map-stroke, #71717a)",
  borderRadius: 6,
  padding: 8,
  fontFamily: "sans-serif",
  fontSize: 12
};
function Bl({
  layers: t,
  hiddenLayerIds: n,
  onToggle: e
}) {
  return /* @__PURE__ */ C("div", { style: { ...Ll, display: "flex", flexDirection: "column", gap: 4 }, children: t.map((r) => /* @__PURE__ */ j("label", { style: { display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }, children: [
    /* @__PURE__ */ C(
      "input",
      {
        type: "checkbox",
        checked: !n.has(r.id),
        onChange: () => e(r.id)
      }
    ),
    /* @__PURE__ */ C("span", { style: { width: 10, height: 10, borderRadius: "50%", background: r.color, flexShrink: 0 }, "aria-hidden": "true" }),
    r.label
  ] }, r.id)) });
}
const Xl = "https://cdn.jsdelivr.net/gh/DebunkTech/kenya-map@v0.1.0/data", ql = 12;
function Ol(t) {
  const [n, e] = ft({ width: 0, height: 0 });
  return yt(() => {
    const r = t.current;
    if (!r || typeof ResizeObserver > "u") return;
    const i = new ResizeObserver(([o]) => {
      if (!o) return;
      const { width: u, height: a } = o.contentRect;
      e({ width: u, height: a });
    });
    return i.observe(r), () => i.disconnect();
  }, [t]), n;
}
function kt(t) {
  return t.properties;
}
function Kt(t, n) {
  if (!(!t || !n))
    return t.features.find((e) => kt(e).code === n);
}
function Hl(t, n) {
  const e = kt(t);
  return { code: e.code, name: e.name, level: n, countyCode: e.county_code, constituencyCode: e.constituency_code };
}
function we({
  features: t,
  path: n,
  opacity: e,
  focusable: r,
  getFill: i,
  onHover: o,
  onLeave: u,
  onActivate: a
}) {
  return /* @__PURE__ */ C("g", { opacity: e, style: { transition: "opacity 300ms ease" }, children: t.map((f) => {
    const c = kt(f), s = n(f);
    return s ? /* @__PURE__ */ C(
      "path",
      {
        className: "kenya-map-area",
        d: s,
        fill: i ? i(c.code) : "var(--kenya-map-fill, #d4d4d8)",
        stroke: "var(--kenya-map-stroke, #71717a)",
        strokeWidth: 0.75,
        tabIndex: r ? 0 : -1,
        role: "button",
        "aria-label": c.name,
        style: { cursor: "pointer", outline: "none", transition: "fill 200ms ease" },
        onMouseEnter: (l) => o(c.name, l.clientX, l.clientY),
        onMouseMove: (l) => o(c.name, l.clientX, l.clientY),
        onMouseLeave: u,
        onFocus: (l) => {
          const h = l.currentTarget.getBoundingClientRect();
          o(c.name, h.left + h.width / 2, h.top + h.height / 2);
        },
        onBlur: u,
        onClick: () => a(f),
        onKeyDown: (l) => {
          r && l.key === "Enter" && (l.preventDefault(), a(f));
        }
      },
      c.code
    ) : null;
  }) });
}
const Yl = 5;
function Vl({
  layers: t,
  hiddenLayerIds: n,
  projection: e,
  transform: r,
  onHover: i,
  onLeave: o,
  onActivate: u
}) {
  return /* @__PURE__ */ C("g", { children: t.filter((a) => !n.has(a.id)).flatMap(
    (a) => a.points.map((f) => {
      const c = e([f.lng, f.lat]);
      if (!c) return null;
      const [s, l] = r.apply(c);
      return /* @__PURE__ */ C(
        "circle",
        {
          cx: s,
          cy: l,
          r: Yl,
          fill: Dl(a, f),
          stroke: "#fff",
          strokeWidth: 1.5,
          tabIndex: 0,
          role: "button",
          "aria-label": f.label,
          style: { cursor: "pointer", outline: "none" },
          onMouseEnter: (h) => i(f.label, h.clientX, h.clientY),
          onMouseMove: (h) => i(f.label, h.clientX, h.clientY),
          onMouseLeave: o,
          onFocus: (h) => {
            const p = h.currentTarget.getBoundingClientRect();
            i(f.label, p.left + p.width / 2, p.top + p.height / 2);
          },
          onBlur: o,
          onClick: (h) => {
            h.stopPropagation(), u(f, a);
          },
          onKeyDown: (h) => {
            h.key === "Enter" && (h.preventDefault(), h.stopPropagation(), u(f, a));
          }
        },
        `${a.id}:${f.id}`
      );
    })
  ) });
}
function Ul({ point: t }) {
  return /* @__PURE__ */ C("div", { children: t.label });
}
function si({ x: t, y: n, onClose: e, children: r }) {
  return /* @__PURE__ */ j(
    "div",
    {
      role: "dialog",
      "aria-label": "Area details",
      style: {
        position: "absolute",
        left: t,
        top: n,
        transform: "translate(-50%, calc(-100% - 10px))",
        zIndex: 3,
        background: "var(--kenya-map-popup-bg, #fff)",
        color: "var(--kenya-map-popup-color, inherit)",
        border: "1px solid var(--kenya-map-stroke, #71717a)",
        borderRadius: 6,
        padding: "8px 28px 8px 10px",
        fontFamily: "sans-serif",
        fontSize: 13,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        maxWidth: 240
      },
      children: [
        /* @__PURE__ */ C(
          "button",
          {
            type: "button",
            onClick: e,
            "aria-label": "Close",
            style: {
              position: "absolute",
              top: 4,
              right: 6,
              border: "none",
              background: "none",
              cursor: "pointer",
              font: "inherit",
              fontSize: 16,
              lineHeight: 1,
              padding: 4,
              color: "inherit"
            },
            children: "×"
          }
        ),
        r
      ]
    }
  );
}
function Gl({
  area: t,
  values: n,
  datasets: e
}) {
  return /* @__PURE__ */ j("div", { children: [
    /* @__PURE__ */ C("div", { style: { fontWeight: 600, marginBottom: e.length ? 4 : 0 }, children: t.name }),
    e.map((r) => {
      var i;
      return /* @__PURE__ */ j("div", { children: [
        r.label,
        ": ",
        ((i = n[r.id]) == null ? void 0 : i.formatted) ?? "No data"
      ] }, r.id);
    })
  ] });
}
function An({ children: t }) {
  return /* @__PURE__ */ C(
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
function Zl(t) {
  var hr, dr, pr, gr;
  const n = t.boundariesBaseUrl ?? Xl, [e, r] = ft({}), i = t.selection !== void 0, o = i ? t.selection : e, u = Ft(t.onSelect);
  u.current = t.onSelect;
  const a = nt(
    (N) => {
      var B;
      i || r(N), (B = u.current) == null || B.call(u, N);
    },
    [i]
  ), f = Ft(null), { width: c, height: s } = Ol(f), [l, h] = he(`${n}/counties.topojson`), [p, m] = he(
    o.county ? `${n}/constituencies.topojson` : null
  ), [_, b] = he(
    o.county ? `${n}/wards/${o.county}.topojson` : null
  ), w = rc(n), M = l.status === "ready" ? l.data.features : [], E = Et(() => p.status !== "ready" || !o.county ? [] : p.data.features.filter((N) => kt(N).county_code === o.county), [p, o.county]), S = Et(() => _.status !== "ready" || !o.constituency ? [] : _.data.features.filter((N) => kt(N).constituency_code === o.constituency), [_, o.constituency]), A = o.county ? o.constituency ? "ward" : "constituency" : "county", v = t.datasets, [D, L] = ft(() => {
    var N;
    return (N = v == null ? void 0 : v[0]) == null ? void 0 : N.id;
  }), I = t.activeDatasetId !== void 0, X = I ? t.activeDatasetId : D, R = Ft(t.onDatasetChange);
  R.current = t.onDatasetChange;
  const P = nt(
    (N) => {
      var B;
      I || L(N), (B = R.current) == null || B.call(R, N);
    },
    [I]
  );
  yt(() => {
    !I && D === void 0 && v && v.length > 0 && L(v[0].id);
  }, [I, D, v]);
  const T = v == null ? void 0 : v.find((N) => N.id === X), d = Et(() => T ? Rl(T) : null, [T]);
  yt(() => {
    if (!v) return;
    const N = new Set(M.map((B) => kt(B).code));
    for (const B of v)
      B.level === "county" && ve(B, N, "exact");
  }, [v, M]), yt(() => {
    if (!v || p.status !== "ready") return;
    const N = new Set(p.data.features.map((B) => kt(B).code));
    for (const B of v)
      B.level === "constituency" && ve(B, N, "exact");
  }, [v, p]), yt(() => {
    if (!v || _.status !== "ready") return;
    const N = Tl(_.data.features);
    for (const B of v)
      B.level === "ward" && ve(B, N, "wards load per-county, so this may just not be visited yet");
  }, [v, _]);
  const g = Et(() => l.status !== "ready" || c === 0 || s === 0 ? null : el(l.data, c, s), [l, c, s]), y = Et(() => g ? rl(g) : null, [g]), x = Et(() => !y || c === 0 || s === 0 || w.status !== "ready" ? ql : Math.max(1, ul(y, w.data.maxZoomWard.bbox, c, s)), [y, c, s, w]), k = Ft(null), $ = Ft(null), z = Ft(null), [F, O] = ft(sn);
  yt(() => {
    const N = k.current;
    if (!N || c === 0 || s === 0) return;
    const B = Zs().scaleExtent([1, x]).on("zoom", (W) => O(W.transform));
    return $.current = B, mt(N).call(B), () => {
      mt(N).on(".zoom", null);
    };
  }, [c, s, x]);
  const U = nt(
    (N) => {
      const B = k.current, W = $.current;
      if (!B || !W || !y) return;
      const It = N ? ol(y, N, c, s, x) : sn;
      sl(B, W, It);
    },
    [y, c, s, x]
  );
  yt(() => {
    const N = o.ward ? Kt(_.status === "ready" ? _.data : void 0, o.ward) : o.constituency ? Kt(p.status === "ready" ? p.data : void 0, o.constituency) : o.county ? Kt(l.status === "ready" ? l.data : void 0, o.county) : void 0;
    U(N);
  }, [o.county, o.constituency, o.ward, l, p, _, U]);
  const V = !!t.renderPopup || !!(v && v.length > 0), [H, st] = ft(null), G = nt(() => st(null), []), tt = t.pointLayers, [et, ar] = ft(null), Ut = nt(() => ar(null), []), [sr, ao] = ft(() => /* @__PURE__ */ new Set()), so = nt((N) => {
    ao((B) => {
      const W = new Set(B);
      return W.has(N) ? W.delete(N) : W.add(N), W;
    });
  }, []), co = nt(
    (N, B) => {
      if (!g) return;
      const W = g([N.lng, N.lat]);
      W && ar({ point: N, layer: B, x: W[0], y: W[1] });
    },
    [g]
  );
  yt(() => {
    if (!H && !et) return;
    function N(B) {
      f.current && !f.current.contains(B.target) && (G(), Ut());
    }
    return document.addEventListener("click", N), () => document.removeEventListener("click", N);
  }, [H, et, G, Ut]);
  const oe = nt(
    (N, B) => {
      const W = kt(N), It = B === "county" ? { county: W.code } : B === "constituency" ? { county: W.county_code, constituency: W.code } : { county: W.county_code, constituency: W.constituency_code, ward: W.code };
      if (a(It), V && y) {
        const [wn, mo] = y.centroid(N);
        st({ area: Hl(N, B), cx: wn, cy: mo });
      }
    },
    [a, V, y]
  ), ue = nt(() => {
    !o.county || !o.constituency || (a({ county: o.county, constituency: o.constituency }), G());
  }, [a, G, o.county, o.constituency]), ae = nt(() => {
    o.county && (a({ county: o.county }), G());
  }, [a, G, o.county]), gn = nt(() => {
    a({}), G();
  }, [a, G]), cr = nt(() => {
    o.ward ? ue() : o.constituency ? ae() : o.county && gn();
  }, [o.ward, o.constituency, o.county, ue, ae, gn]), [yn, lr] = ft(null), mn = nt((N, B, W) => {
    const It = f.current;
    if (!It) return;
    const wn = It.getBoundingClientRect();
    lr({ name: N, x: B - wn.left, y: W - wn.top });
  }, []), vn = nt(() => lr(null), []), lo = (dr = (hr = Kt(l.status === "ready" ? l.data : void 0, o.county)) == null ? void 0 : hr.properties) == null ? void 0 : dr.name, fo = (gr = (pr = Kt(
    p.status === "ready" ? p.data : void 0,
    o.constituency
  )) == null ? void 0 : pr.properties) == null ? void 0 : gr.name, fr = Et(
    () => H ? Pl(H.area, v ?? []) : {},
    [H, v]
  ), [ho, po] = H ? F.apply([H.cx, H.cy]) : [0, 0], [go, yo] = et ? F.apply([et.x, et.y]) : [0, 0];
  return /* @__PURE__ */ j(
    "div",
    {
      ref: f,
      className: t.className,
      style: { position: "relative", width: "100%", height: "100%", minHeight: 300, ...t.style },
      onKeyDown: (N) => {
        N.key === "Escape" && (N.preventDefault(), et ? Ut() : H ? G() : cr());
      },
      children: [
        /* @__PURE__ */ j(
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
              /* @__PURE__ */ j("nav", { "aria-label": "Breadcrumb", style: { display: "flex", alignItems: "center", gap: 4 }, children: [
                /* @__PURE__ */ C("button", { type: "button", onClick: gn, style: _e(!o.county), children: "Kenya" }),
                o.county && /* @__PURE__ */ j(yr, { children: [
                  /* @__PURE__ */ C("span", { "aria-hidden": "true", children: "›" }),
                  /* @__PURE__ */ C(
                    "button",
                    {
                      type: "button",
                      onClick: ae,
                      style: _e(!o.constituency),
                      children: lo ?? o.county
                    }
                  )
                ] }),
                o.constituency && /* @__PURE__ */ j(yr, { children: [
                  /* @__PURE__ */ C("span", { "aria-hidden": "true", children: "›" }),
                  /* @__PURE__ */ C(
                    "button",
                    {
                      type: "button",
                      onClick: ue,
                      style: _e(!o.ward),
                      children: fo ?? o.constituency
                    }
                  )
                ] })
              ] }),
              (o.county || o.constituency) && /* @__PURE__ */ C("button", { type: "button", onClick: gn, style: zn, children: "Reset" })
            ]
          }
        ),
        t.showDatasetSwitcher && v && v.length > 0 && /* @__PURE__ */ C("div", { style: { position: "absolute", top: 8, right: 8, zIndex: 1 }, children: /* @__PURE__ */ C(
          Il,
          {
            datasets: v,
            activeDatasetId: X,
            currentLevel: A,
            onChange: P
          }
        ) }),
        t.showLegend && T && /* @__PURE__ */ C("div", { style: { position: "absolute", bottom: 8, right: 8, zIndex: 1 }, children: /* @__PURE__ */ C(Fl, { dataset: T }) }),
        t.showLayerToggles && tt && tt.length > 0 && /* @__PURE__ */ C("div", { style: { position: "absolute", bottom: 8, left: 8, zIndex: 1 }, children: /* @__PURE__ */ C(Bl, { layers: tt, hiddenLayerIds: sr, onToggle: so }) }),
        l.status === "loading" && /* @__PURE__ */ C(An, { children: "Loading map…" }),
        l.status === "error" && /* @__PURE__ */ j(An, { children: [
          "Failed to load county boundaries: ",
          l.error.message,
          /* @__PURE__ */ C("br", {}),
          /* @__PURE__ */ C("button", { type: "button", onClick: h, style: zn, children: "Retry" })
        ] }),
        o.county && p.status === "error" && /* @__PURE__ */ j(An, { children: [
          "Failed to load constituency boundaries: ",
          p.error.message,
          /* @__PURE__ */ C("br", {}),
          /* @__PURE__ */ C("button", { type: "button", onClick: m, style: zn, children: "Retry" })
        ] }),
        o.constituency && _.status === "error" && /* @__PURE__ */ j(An, { children: [
          "Failed to load ward boundaries: ",
          _.error.message,
          /* @__PURE__ */ C("br", {}),
          /* @__PURE__ */ C("button", { type: "button", onClick: b, style: zn, children: "Retry" })
        ] }),
        y && /* @__PURE__ */ j(
          "svg",
          {
            ref: k,
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${c} ${s}`,
            role: "img",
            "aria-label": "Map of Kenya",
            children: [
              /* @__PURE__ */ C("style", { children: `
            .kenya-map-area {
              vector-effect: non-scaling-stroke;
            }
            .kenya-map-area:focus-visible {
              stroke: var(--kenya-map-focus-color, #2563eb);
              stroke-width: 3;
            }
          ` }),
              /* @__PURE__ */ C(
                "rect",
                {
                  x: 0,
                  y: 0,
                  width: c,
                  height: s,
                  fill: "transparent",
                  onPointerDown: (N) => {
                    z.current = { x: N.clientX, y: N.clientY };
                  },
                  onClick: (N) => {
                    const B = z.current;
                    (B ? Math.hypot(N.clientX - B.x, N.clientY - B.y) : 0) < 4 && (G(), Ut(), cr());
                  }
                }
              ),
              /* @__PURE__ */ j("g", { transform: `translate(${F.x},${F.y}) scale(${F.k})`, children: [
                /* @__PURE__ */ C(
                  we,
                  {
                    features: M,
                    path: y,
                    opacity: o.county ? 0.25 : 1,
                    focusable: !o.county,
                    getFill: (T == null ? void 0 : T.level) === "county" && d ? d : void 0,
                    onHover: mn,
                    onLeave: vn,
                    onActivate: (N) => oe(N, "county")
                  }
                ),
                o.county && /* @__PURE__ */ C(
                  we,
                  {
                    features: E,
                    path: y,
                    opacity: o.constituency ? 0.25 : 1,
                    focusable: !o.constituency,
                    getFill: (T == null ? void 0 : T.level) === "constituency" && d ? d : void 0,
                    onHover: mn,
                    onLeave: vn,
                    onActivate: (N) => oe(N, "constituency")
                  }
                ),
                o.constituency && /* @__PURE__ */ C(
                  we,
                  {
                    features: S,
                    path: y,
                    opacity: 1,
                    focusable: !0,
                    getFill: (T == null ? void 0 : T.level) === "ward" && d ? d : void 0,
                    onHover: mn,
                    onLeave: vn,
                    onActivate: (N) => oe(N, "ward")
                  }
                )
              ] }),
              tt && tt.length > 0 && g && /* @__PURE__ */ C(
                Vl,
                {
                  layers: tt,
                  hiddenLayerIds: sr,
                  projection: g,
                  transform: F,
                  onHover: mn,
                  onLeave: vn,
                  onActivate: co
                }
              )
            ]
          }
        ),
        yn && /* @__PURE__ */ C(
          "div",
          {
            style: {
              position: "absolute",
              left: yn.x + 12,
              top: yn.y + 12,
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
            children: yn.name
          }
        ),
        H && /* @__PURE__ */ C(si, { x: ho, y: po, onClose: G, children: t.renderPopup ? t.renderPopup(H.area, fr) : /* @__PURE__ */ C(Gl, { area: H.area, values: fr, datasets: v ?? [] }) }),
        et && /* @__PURE__ */ C(si, { x: go, y: yo, onClose: Ut, children: t.renderPointPopup ? t.renderPointPopup(et.point, et.layer) : /* @__PURE__ */ C(Ul, { point: et.point }) })
      ]
    }
  );
}
function _e(t) {
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
const zn = {
  font: "inherit",
  fontSize: 12,
  padding: "2px 8px",
  borderRadius: 4,
  border: "1px solid var(--kenya-map-stroke, #71717a)",
  background: "var(--kenya-map-panel-bg, #fff)",
  cursor: "pointer"
};
export {
  Zl as KenyaMap
};
//# sourceMappingURL=kenya-map.js.map
