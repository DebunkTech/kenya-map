import { jsx as C, jsxs as j, Fragment as mr } from "react/jsx-runtime";
import { useState as lt, useEffect as mt, useCallback as tt, useRef as Dt, useMemo as Nt } from "react";
var be = "http://www.w3.org/1999/xhtml";
const vr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: be,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function re(t) {
  var n = t += "", e = n.indexOf(":");
  return e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)), vr.hasOwnProperty(n) ? { space: vr[n], local: t } : t;
}
function wo(t) {
  return function() {
    var n = this.ownerDocument, e = this.namespaceURI;
    return e === be && n.documentElement.namespaceURI === be ? n.createElement(t) : n.createElementNS(e, t);
  };
}
function _o(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function fi(t) {
  var n = re(t);
  return (n.local ? _o : wo)(n);
}
function xo() {
}
function Ke(t) {
  return t == null ? xo : function() {
    return this.querySelector(t);
  };
}
function bo(t) {
  typeof t != "function" && (t = Ke(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], u = o.length, a = r[i] = new Array(u), f, c, s = 0; s < u; ++s)
      (f = o[s]) && (c = t.call(f, f.__data__, s, o)) && ("__data__" in f && (c.__data__ = f.__data__), a[s] = c);
  return new it(r, this._parents);
}
function So(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Mo() {
  return [];
}
function hi(t) {
  return t == null ? Mo : function() {
    return this.querySelectorAll(t);
  };
}
function ko(t) {
  return function() {
    return So(t.apply(this, arguments));
  };
}
function Eo(t) {
  typeof t == "function" ? t = ko(t) : t = hi(t);
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var u = n[o], a = u.length, f, c = 0; c < a; ++c)
      (f = u[c]) && (r.push(t.call(f, f.__data__, c, u)), i.push(f));
  return new it(r, i);
}
function di(t) {
  return function() {
    return this.matches(t);
  };
}
function pi(t) {
  return function(n) {
    return n.matches(t);
  };
}
var No = Array.prototype.find;
function $o(t) {
  return function() {
    return No.call(this.children, t);
  };
}
function Ao() {
  return this.firstElementChild;
}
function zo(t) {
  return this.select(t == null ? Ao : $o(typeof t == "function" ? t : pi(t)));
}
var Ro = Array.prototype.filter;
function Po() {
  return Array.from(this.children);
}
function Co(t) {
  return function() {
    return Ro.call(this.children, t);
  };
}
function To(t) {
  return this.selectAll(t == null ? Po : Co(typeof t == "function" ? t : pi(t)));
}
function Io(t) {
  typeof t != "function" && (t = di(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], u = o.length, a = r[i] = [], f, c = 0; c < u; ++c)
      (f = o[c]) && t.call(f, f.__data__, c, o) && a.push(f);
  return new it(r, this._parents);
}
function gi(t) {
  return new Array(t.length);
}
function Fo() {
  return new it(this._enter || this._groups.map(gi), this._parents);
}
function Ln(t, n) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n;
}
Ln.prototype = {
  constructor: Ln,
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
function Do(t) {
  return function() {
    return t;
  };
}
function Lo(t, n, e, r, i, o) {
  for (var u = 0, a, f = n.length, c = o.length; u < c; ++u)
    (a = n[u]) ? (a.__data__ = o[u], r[u] = a) : e[u] = new Ln(t, o[u]);
  for (; u < f; ++u)
    (a = n[u]) && (i[u] = a);
}
function Bo(t, n, e, r, i, o, u) {
  var a, f, c = /* @__PURE__ */ new Map(), s = n.length, l = o.length, h = new Array(s), p;
  for (a = 0; a < s; ++a)
    (f = n[a]) && (h[a] = p = u.call(f, f.__data__, a, n) + "", c.has(p) ? i[a] = f : c.set(p, f));
  for (a = 0; a < l; ++a)
    p = u.call(t, o[a], a, o) + "", (f = c.get(p)) ? (r[a] = f, f.__data__ = o[a], c.delete(p)) : e[a] = new Ln(t, o[a]);
  for (a = 0; a < s; ++a)
    (f = n[a]) && c.get(h[a]) === f && (i[a] = f);
}
function Xo(t) {
  return t.__data__;
}
function qo(t, n) {
  if (!arguments.length) return Array.from(this, Xo);
  var e = n ? Bo : Lo, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Do(t));
  for (var o = i.length, u = new Array(o), a = new Array(o), f = new Array(o), c = 0; c < o; ++c) {
    var s = r[c], l = i[c], h = l.length, p = Ho(t.call(s, s && s.__data__, c, r)), m = p.length, _ = a[c] = new Array(m), b = u[c] = new Array(m), w = f[c] = new Array(h);
    e(s, l, _, b, w, p, n);
    for (var M = 0, E = 0, S, A; M < m; ++M)
      if (S = _[M]) {
        for (M >= E && (E = M + 1); !(A = b[E]) && ++E < m; ) ;
        S._next = A || null;
      }
  }
  return u = new it(u, r), u._enter = a, u._exit = f, u;
}
function Ho(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Oo() {
  return new it(this._exit || this._groups.map(gi), this._parents);
}
function Yo(t, n, e) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), n != null && (i = n(i), i && (i = i.selection())), e == null ? o.remove() : e(o), r && i ? r.merge(i).order() : i;
}
function Vo(t) {
  for (var n = t.selection ? t.selection() : t, e = this._groups, r = n._groups, i = e.length, o = r.length, u = Math.min(i, o), a = new Array(i), f = 0; f < u; ++f)
    for (var c = e[f], s = r[f], l = c.length, h = a[f] = new Array(l), p, m = 0; m < l; ++m)
      (p = c[m] || s[m]) && (h[m] = p);
  for (; f < i; ++f)
    a[f] = e[f];
  return new it(a, this._parents);
}
function Uo() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], u; --i >= 0; )
      (u = r[i]) && (o && u.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(u, o), o = u);
  return this;
}
function Wo(t) {
  t || (t = Go);
  function n(l, h) {
    return l && h ? t(l.__data__, h.__data__) : !l - !h;
  }
  for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var u = e[o], a = u.length, f = i[o] = new Array(a), c, s = 0; s < a; ++s)
      (c = u[s]) && (f[s] = c);
    f.sort(n);
  }
  return new it(i, this._parents).order();
}
function Go(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Ko() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Zo() {
  return Array.from(this);
}
function Jo() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var u = r[i];
      if (u) return u;
    }
  return null;
}
function Qo() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function jo() {
  return !this.node();
}
function tu(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, u = i.length, a; o < u; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function nu(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function eu(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ru(t, n) {
  return function() {
    this.setAttribute(t, n);
  };
}
function iu(t, n) {
  return function() {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function ou(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function uu(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e);
  };
}
function au(t, n) {
  var e = re(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each((n == null ? e.local ? eu : nu : typeof n == "function" ? e.local ? uu : ou : e.local ? iu : ru)(e, n));
}
function yi(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function su(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function cu(t, n, e) {
  return function() {
    this.style.setProperty(t, n, e);
  };
}
function lu(t, n, e) {
  return function() {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function fu(t, n, e) {
  return arguments.length > 1 ? this.each((n == null ? su : typeof n == "function" ? lu : cu)(t, n, e ?? "")) : Ht(this.node(), t);
}
function Ht(t, n) {
  return t.style.getPropertyValue(n) || yi(t).getComputedStyle(t, null).getPropertyValue(n);
}
function hu(t) {
  return function() {
    delete this[t];
  };
}
function du(t, n) {
  return function() {
    this[t] = n;
  };
}
function pu(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : this[t] = e;
  };
}
function gu(t, n) {
  return arguments.length > 1 ? this.each((n == null ? hu : typeof n == "function" ? pu : du)(t, n)) : this.node()[t];
}
function mi(t) {
  return t.trim().split(/^|\s+/);
}
function Ze(t) {
  return t.classList || new vi(t);
}
function vi(t) {
  this._node = t, this._names = mi(t.getAttribute("class") || "");
}
vi.prototype = {
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
function wi(t, n) {
  for (var e = Ze(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function _i(t, n) {
  for (var e = Ze(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function yu(t) {
  return function() {
    wi(this, t);
  };
}
function mu(t) {
  return function() {
    _i(this, t);
  };
}
function vu(t, n) {
  return function() {
    (n.apply(this, arguments) ? wi : _i)(this, t);
  };
}
function wu(t, n) {
  var e = mi(t + "");
  if (arguments.length < 2) {
    for (var r = Ze(this.node()), i = -1, o = e.length; ++i < o; ) if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? vu : n ? yu : mu)(e, n));
}
function _u() {
  this.textContent = "";
}
function xu(t) {
  return function() {
    this.textContent = t;
  };
}
function bu(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function Su(t) {
  return arguments.length ? this.each(t == null ? _u : (typeof t == "function" ? bu : xu)(t)) : this.node().textContent;
}
function Mu() {
  this.innerHTML = "";
}
function ku(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Eu(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function Nu(t) {
  return arguments.length ? this.each(t == null ? Mu : (typeof t == "function" ? Eu : ku)(t)) : this.node().innerHTML;
}
function $u() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Au() {
  return this.each($u);
}
function zu() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ru() {
  return this.each(zu);
}
function Pu(t) {
  var n = typeof t == "function" ? t : fi(t);
  return this.select(function() {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Cu() {
  return null;
}
function Tu(t, n) {
  var e = typeof t == "function" ? t : fi(t), r = n == null ? Cu : typeof n == "function" ? n : Ke(n);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Iu() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Fu() {
  return this.each(Iu);
}
function Du() {
  var t = this.cloneNode(!1), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Lu() {
  var t = this.cloneNode(!0), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Bu(t) {
  return this.select(t ? Lu : Du);
}
function Xu(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function qu(t) {
  return function(n) {
    t.call(this, n, this.__data__);
  };
}
function Hu(t) {
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
function Yu(t, n, e) {
  return function() {
    var r = this.__on, i, o = qu(n);
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
function Vu(t, n, e) {
  var r = Hu(t + ""), i, o = r.length, u;
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
  for (a = n ? Yu : Ou, i = 0; i < o; ++i) this.each(a(r[i], n, e));
  return this;
}
function xi(t, n, e) {
  var r = yi(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i);
}
function Uu(t, n) {
  return function() {
    return xi(this, t, n);
  };
}
function Wu(t, n) {
  return function() {
    return xi(this, t, n.apply(this, arguments));
  };
}
function Gu(t, n) {
  return this.each((typeof n == "function" ? Wu : Uu)(t, n));
}
function* Ku() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, u; i < o; ++i)
      (u = r[i]) && (yield u);
}
var bi = [null];
function it(t, n) {
  this._groups = t, this._parents = n;
}
function pn() {
  return new it([[document.documentElement]], bi);
}
function Zu() {
  return this;
}
it.prototype = pn.prototype = {
  constructor: it,
  select: bo,
  selectAll: Eo,
  selectChild: zo,
  selectChildren: To,
  filter: Io,
  data: qo,
  enter: Fo,
  exit: Oo,
  join: Yo,
  merge: Vo,
  selection: Zu,
  order: Uo,
  sort: Wo,
  call: Ko,
  nodes: Zo,
  node: Jo,
  size: Qo,
  empty: jo,
  each: tu,
  attr: au,
  style: fu,
  property: gu,
  classed: wu,
  text: Su,
  html: Nu,
  raise: Au,
  lower: Ru,
  append: Pu,
  insert: Tu,
  remove: Fu,
  clone: Bu,
  datum: Xu,
  on: Vu,
  dispatch: Gu,
  [Symbol.iterator]: Ku
};
function wt(t) {
  return typeof t == "string" ? new it([[document.querySelector(t)]], [document.documentElement]) : new it([[t]], bi);
}
function Ju(t) {
  let n;
  for (; n = t.sourceEvent; ) t = n;
  return t;
}
function $t(t, n) {
  if (t = Ju(t), n === void 0 && (n = t.currentTarget), n) {
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
var Qu = { value: () => {
} };
function Je() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new Pn(e);
}
function Pn(t) {
  this._ = t;
}
function ju(t, n) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var r = "", i = e.indexOf(".");
    if (i >= 0 && (r = e.slice(i + 1), e = e.slice(0, i)), e && !n.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    return { type: e, name: r };
  });
}
Pn.prototype = Je.prototype = {
  constructor: Pn,
  on: function(t, n) {
    var e = this._, r = ju(t + "", e), i, o = -1, u = r.length;
    if (arguments.length < 2) {
      for (; ++o < u; ) if ((i = (t = r[o]).type) && (i = ta(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function") throw new Error("invalid callback: " + n);
    for (; ++o < u; )
      if (i = (t = r[o]).type) e[i] = wr(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = wr(e[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new Pn(t);
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
function ta(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n)
      return i.value;
}
function wr(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      t[r] = Qu, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
const Se = { capture: !0, passive: !1 };
function Me(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function na(t) {
  var n = t.document.documentElement, e = wt(t).on("dragstart.drag", Me, Se);
  "onselectstart" in n ? e.on("selectstart.drag", Me, Se) : (n.__noselect = n.style.MozUserSelect, n.style.MozUserSelect = "none");
}
function ea(t, n) {
  var e = t.document.documentElement, r = wt(t).on("dragstart.drag", null);
  n && (r.on("click.drag", Me, Se), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in e ? r.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect);
}
function Qe(t, n, e) {
  t.prototype = n.prototype = e, e.constructor = t;
}
function Si(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function gn() {
}
var un = 0.7, Bn = 1 / un, qt = "\\s*([+-]?\\d+)\\s*", an = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", bt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ra = /^#([0-9a-f]{3,8})$/, ia = new RegExp(`^rgb\\(${qt},${qt},${qt}\\)$`), oa = new RegExp(`^rgb\\(${bt},${bt},${bt}\\)$`), ua = new RegExp(`^rgba\\(${qt},${qt},${qt},${an}\\)$`), aa = new RegExp(`^rgba\\(${bt},${bt},${bt},${an}\\)$`), sa = new RegExp(`^hsl\\(${an},${bt},${bt}\\)$`), ca = new RegExp(`^hsla\\(${an},${bt},${bt},${an}\\)$`), _r = {
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
Qe(gn, Rt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: xr,
  // Deprecated! Use color.formatHex.
  formatHex: xr,
  formatHex8: la,
  formatHsl: fa,
  formatRgb: br,
  toString: br
});
function xr() {
  return this.rgb().formatHex();
}
function la() {
  return this.rgb().formatHex8();
}
function fa() {
  return Mi(this).formatHsl();
}
function br() {
  return this.rgb().formatRgb();
}
function Rt(t) {
  var n, e;
  return t = (t + "").trim().toLowerCase(), (n = ra.exec(t)) ? (e = n[1].length, n = parseInt(n[1], 16), e === 6 ? Sr(n) : e === 3 ? new nt(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, (n & 15) << 4 | n & 15, 1) : e === 8 ? xn(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (n & 255) / 255) : e === 4 ? xn(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, ((n & 15) << 4 | n & 15) / 255) : null) : (n = ia.exec(t)) ? new nt(n[1], n[2], n[3], 1) : (n = oa.exec(t)) ? new nt(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, 1) : (n = ua.exec(t)) ? xn(n[1], n[2], n[3], n[4]) : (n = aa.exec(t)) ? xn(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, n[4]) : (n = sa.exec(t)) ? Er(n[1], n[2] / 100, n[3] / 100, 1) : (n = ca.exec(t)) ? Er(n[1], n[2] / 100, n[3] / 100, n[4]) : _r.hasOwnProperty(t) ? Sr(_r[t]) : t === "transparent" ? new nt(NaN, NaN, NaN, 0) : null;
}
function Sr(t) {
  return new nt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function xn(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new nt(t, n, e, r);
}
function ha(t) {
  return t instanceof gn || (t = Rt(t)), t ? (t = t.rgb(), new nt(t.r, t.g, t.b, t.opacity)) : new nt();
}
function ke(t, n, e, r) {
  return arguments.length === 1 ? ha(t) : new nt(t, n, e, r ?? 1);
}
function nt(t, n, e, r) {
  this.r = +t, this.g = +n, this.b = +e, this.opacity = +r;
}
Qe(nt, ke, Si(gn, {
  brighter(t) {
    return t = t == null ? Bn : Math.pow(Bn, t), new nt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? un : Math.pow(un, t), new nt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new nt(zt(this.r), zt(this.g), zt(this.b), Xn(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Mr,
  // Deprecated! Use color.formatHex.
  formatHex: Mr,
  formatHex8: da,
  formatRgb: kr,
  toString: kr
}));
function Mr() {
  return `#${At(this.r)}${At(this.g)}${At(this.b)}`;
}
function da() {
  return `#${At(this.r)}${At(this.g)}${At(this.b)}${At((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function kr() {
  const t = Xn(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${zt(this.r)}, ${zt(this.g)}, ${zt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Xn(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function zt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function At(t) {
  return t = zt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Er(t, n, e, r) {
  return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new ht(t, n, e, r);
}
function Mi(t) {
  if (t instanceof ht) return new ht(t.h, t.s, t.l, t.opacity);
  if (t instanceof gn || (t = Rt(t)), !t) return new ht();
  if (t instanceof ht) return t;
  t = t.rgb();
  var n = t.r / 255, e = t.g / 255, r = t.b / 255, i = Math.min(n, e, r), o = Math.max(n, e, r), u = NaN, a = o - i, f = (o + i) / 2;
  return a ? (n === o ? u = (e - r) / a + (e < r) * 6 : e === o ? u = (r - n) / a + 2 : u = (n - e) / a + 4, a /= f < 0.5 ? o + i : 2 - o - i, u *= 60) : a = f > 0 && f < 1 ? 0 : u, new ht(u, a, f, t.opacity);
}
function pa(t, n, e, r) {
  return arguments.length === 1 ? Mi(t) : new ht(t, n, e, r ?? 1);
}
function ht(t, n, e, r) {
  this.h = +t, this.s = +n, this.l = +e, this.opacity = +r;
}
Qe(ht, pa, Si(gn, {
  brighter(t) {
    return t = t == null ? Bn : Math.pow(Bn, t), new ht(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? un : Math.pow(un, t), new ht(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, n = isNaN(t) || isNaN(this.s) ? 0 : this.s, e = this.l, r = e + (e < 0.5 ? e : 1 - e) * n, i = 2 * e - r;
    return new nt(
      ce(t >= 240 ? t - 240 : t + 120, i, r),
      ce(t, i, r),
      ce(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new ht(Nr(this.h), bn(this.s), bn(this.l), Xn(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Xn(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Nr(this.h)}, ${bn(this.s) * 100}%, ${bn(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Nr(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function bn(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function ce(t, n, e) {
  return (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n) * 255;
}
const je = (t) => () => t;
function ga(t, n) {
  return function(e) {
    return t + e * n;
  };
}
function ya(t, n, e) {
  return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e, function(r) {
    return Math.pow(t + r * n, e);
  };
}
function ma(t) {
  return (t = +t) == 1 ? ki : function(n, e) {
    return e - n ? ya(n, e, t) : je(isNaN(n) ? e : n);
  };
}
function ki(t, n) {
  var e = n - t;
  return e ? ga(t, e) : je(isNaN(t) ? n : t);
}
const qn = (function t(n) {
  var e = ma(n);
  function r(i, o) {
    var u = e((i = ke(i)).r, (o = ke(o)).r), a = e(i.g, o.g), f = e(i.b, o.b), c = ki(i.opacity, o.opacity);
    return function(s) {
      return i.r = u(s), i.g = a(s), i.b = f(s), i.opacity = c(s), i + "";
    };
  }
  return r.gamma = t, r;
})(1);
function va(t, n) {
  n || (n = []);
  var e = t ? Math.min(n.length, t.length) : 0, r = n.slice(), i;
  return function(o) {
    for (i = 0; i < e; ++i) r[i] = t[i] * (1 - o) + n[i] * o;
    return r;
  };
}
function wa(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function _a(t, n) {
  var e = n ? n.length : 0, r = t ? Math.min(e, t.length) : 0, i = new Array(r), o = new Array(e), u;
  for (u = 0; u < r; ++u) i[u] = tr(t[u], n[u]);
  for (; u < e; ++u) o[u] = n[u];
  return function(a) {
    for (u = 0; u < r; ++u) o[u] = i[u](a);
    return o;
  };
}
function xa(t, n) {
  var e = /* @__PURE__ */ new Date();
  return t = +t, n = +n, function(r) {
    return e.setTime(t * (1 - r) + n * r), e;
  };
}
function ft(t, n) {
  return t = +t, n = +n, function(e) {
    return t * (1 - e) + n * e;
  };
}
function ba(t, n) {
  var e = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (n === null || typeof n != "object") && (n = {});
  for (i in n)
    i in t ? e[i] = tr(t[i], n[i]) : r[i] = n[i];
  return function(o) {
    for (i in e) r[i] = e[i](o);
    return r;
  };
}
var Ee = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, le = new RegExp(Ee.source, "g");
function Sa(t) {
  return function() {
    return t;
  };
}
function Ma(t) {
  return function(n) {
    return t(n) + "";
  };
}
function Ei(t, n) {
  var e = Ee.lastIndex = le.lastIndex = 0, r, i, o, u = -1, a = [], f = [];
  for (t = t + "", n = n + ""; (r = Ee.exec(t)) && (i = le.exec(n)); )
    (o = i.index) > e && (o = n.slice(e, o), a[u] ? a[u] += o : a[++u] = o), (r = r[0]) === (i = i[0]) ? a[u] ? a[u] += i : a[++u] = i : (a[++u] = null, f.push({ i: u, x: ft(r, i) })), e = le.lastIndex;
  return e < n.length && (o = n.slice(e), a[u] ? a[u] += o : a[++u] = o), a.length < 2 ? f[0] ? Ma(f[0].x) : Sa(n) : (n = f.length, function(c) {
    for (var s = 0, l; s < n; ++s) a[(l = f[s]).i] = l.x(c);
    return a.join("");
  });
}
function tr(t, n) {
  var e = typeof n, r;
  return n == null || e === "boolean" ? je(n) : (e === "number" ? ft : e === "string" ? (r = Rt(n)) ? (n = r, qn) : Ei : n instanceof Rt ? qn : n instanceof Date ? xa : wa(n) ? va : Array.isArray(n) ? _a : typeof n.valueOf != "function" && typeof n.toString != "function" || isNaN(n) ? ba : ft)(t, n);
}
function ka(t, n) {
  return t = +t, n = +n, function(e) {
    return Math.round(t * (1 - e) + n * e);
  };
}
var $r = 180 / Math.PI, Ne = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Ni(t, n, e, r, i, o) {
  var u, a, f;
  return (u = Math.sqrt(t * t + n * n)) && (t /= u, n /= u), (f = t * e + n * r) && (e -= t * f, r -= n * f), (a = Math.sqrt(e * e + r * r)) && (e /= a, r /= a, f /= a), t * r < n * e && (t = -t, n = -n, f = -f, u = -u), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(n, t) * $r,
    skewX: Math.atan(f) * $r,
    scaleX: u,
    scaleY: a
  };
}
var Sn;
function Ea(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return n.isIdentity ? Ne : Ni(n.a, n.b, n.c, n.d, n.e, n.f);
}
function Na(t) {
  return t == null || (Sn || (Sn = document.createElementNS("http://www.w3.org/2000/svg", "g")), Sn.setAttribute("transform", t), !(t = Sn.transform.baseVal.consolidate())) ? Ne : (t = t.matrix, Ni(t.a, t.b, t.c, t.d, t.e, t.f));
}
function $i(t, n, e, r) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, s, l, h, p, m) {
    if (c !== l || s !== h) {
      var _ = p.push("translate(", null, n, null, e);
      m.push({ i: _ - 4, x: ft(c, l) }, { i: _ - 2, x: ft(s, h) });
    } else (l || h) && p.push("translate(" + l + n + h + e);
  }
  function u(c, s, l, h) {
    c !== s ? (c - s > 180 ? s += 360 : s - c > 180 && (c += 360), h.push({ i: l.push(i(l) + "rotate(", null, r) - 2, x: ft(c, s) })) : s && l.push(i(l) + "rotate(" + s + r);
  }
  function a(c, s, l, h) {
    c !== s ? h.push({ i: l.push(i(l) + "skewX(", null, r) - 2, x: ft(c, s) }) : s && l.push(i(l) + "skewX(" + s + r);
  }
  function f(c, s, l, h, p, m) {
    if (c !== l || s !== h) {
      var _ = p.push(i(p) + "scale(", null, ",", null, ")");
      m.push({ i: _ - 4, x: ft(c, l) }, { i: _ - 2, x: ft(s, h) });
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
var $a = $i(Ea, "px, ", "px)", "deg)"), Aa = $i(Na, ", ", ")", ")"), za = 1e-12;
function Ar(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function Ra(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Pa(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Ca = (function t(n, e, r) {
  function i(o, u) {
    var a = o[0], f = o[1], c = o[2], s = u[0], l = u[1], h = u[2], p = s - a, m = l - f, _ = p * p + m * m, b, w;
    if (_ < za)
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
        var B = D * w, I = Ar(A), q = c / (e * M) * (I * Pa(n * B + A) - Ra(A));
        return [
          a + q * p,
          f + q * m,
          c * I / Ar(n * B + A)
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
var Ot = 0, Jt = 0, Gt = 0, Ai = 1e3, Hn, Qt, On = 0, Pt = 0, ie = 0, sn = typeof performance == "object" && performance.now ? performance : Date, zi = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function nr() {
  return Pt || (zi(Ta), Pt = sn.now() + ie);
}
function Ta() {
  Pt = 0;
}
function Yn() {
  this._call = this._time = this._next = null;
}
Yn.prototype = Ri.prototype = {
  constructor: Yn,
  restart: function(t, n, e) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    e = (e == null ? nr() : +e) + (n == null ? 0 : +n), !this._next && Qt !== this && (Qt ? Qt._next = this : Hn = this, Qt = this), this._call = t, this._time = e, $e();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, $e());
  }
};
function Ri(t, n, e) {
  var r = new Yn();
  return r.restart(t, n, e), r;
}
function Ia() {
  nr(), ++Ot;
  for (var t = Hn, n; t; )
    (n = Pt - t._time) >= 0 && t._call.call(void 0, n), t = t._next;
  --Ot;
}
function zr() {
  Pt = (On = sn.now()) + ie, Ot = Jt = 0;
  try {
    Ia();
  } finally {
    Ot = 0, Da(), Pt = 0;
  }
}
function Fa() {
  var t = sn.now(), n = t - On;
  n > Ai && (ie -= n, On = t);
}
function Da() {
  for (var t, n = Hn, e, r = 1 / 0; n; )
    n._call ? (r > n._time && (r = n._time), t = n, n = n._next) : (e = n._next, n._next = null, n = t ? t._next = e : Hn = e);
  Qt = t, $e(r);
}
function $e(t) {
  if (!Ot) {
    Jt && (Jt = clearTimeout(Jt));
    var n = t - Pt;
    n > 24 ? (t < 1 / 0 && (Jt = setTimeout(zr, t - sn.now() - ie)), Gt && (Gt = clearInterval(Gt))) : (Gt || (On = sn.now(), Gt = setInterval(Fa, Ai)), Ot = 1, zi(zr));
  }
}
function Rr(t, n, e) {
  var r = new Yn();
  return n = n == null ? 0 : +n, r.restart((i) => {
    r.stop(), t(i + n);
  }, n, e), r;
}
var La = Je("start", "end", "cancel", "interrupt"), Ba = [], Pi = 0, Pr = 1, Ae = 2, Cn = 3, Cr = 4, ze = 5, Tn = 6;
function oe(t, n, e, r, i, o) {
  var u = t.__transition;
  if (!u) t.__transition = {};
  else if (e in u) return;
  Xa(t, e, {
    name: n,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: La,
    tween: Ba,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Pi
  });
}
function er(t, n) {
  var e = pt(t, n);
  if (e.state > Pi) throw new Error("too late; already scheduled");
  return e;
}
function St(t, n) {
  var e = pt(t, n);
  if (e.state > Cn) throw new Error("too late; already running");
  return e;
}
function pt(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function Xa(t, n, e) {
  var r = t.__transition, i;
  r[n] = e, e.timer = Ri(o, 0, e.time);
  function o(c) {
    e.state = Pr, e.timer.restart(u, e.delay, e.time), e.delay <= c && u(c - e.delay);
  }
  function u(c) {
    var s, l, h, p;
    if (e.state !== Pr) return f();
    for (s in r)
      if (p = r[s], p.name === e.name) {
        if (p.state === Cn) return Rr(u);
        p.state === Cr ? (p.state = Tn, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[s]) : +s < n && (p.state = Tn, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[s]);
      }
    if (Rr(function() {
      e.state === Cn && (e.state = Cr, e.timer.restart(a, e.delay, e.time), a(c));
    }), e.state = Ae, e.on.call("start", t, t.__data__, e.index, e.group), e.state === Ae) {
      for (e.state = Cn, i = new Array(h = e.tween.length), s = 0, l = -1; s < h; ++s)
        (p = e.tween[s].value.call(t, t.__data__, e.index, e.group)) && (i[++l] = p);
      i.length = l + 1;
    }
  }
  function a(c) {
    for (var s = c < e.duration ? e.ease.call(null, c / e.duration) : (e.timer.restart(f), e.state = ze, 1), l = -1, h = i.length; ++l < h; )
      i[l].call(t, s);
    e.state === ze && (e.on.call("end", t, t.__data__, e.index, e.group), f());
  }
  function f() {
    e.state = Tn, e.timer.stop(), delete r[n];
    for (var c in r) return;
    delete t.__transition;
  }
}
function In(t, n) {
  var e = t.__transition, r, i, o = !0, u;
  if (e) {
    n = n == null ? null : n + "";
    for (u in e) {
      if ((r = e[u]).name !== n) {
        o = !1;
        continue;
      }
      i = r.state > Ae && r.state < ze, r.state = Tn, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete e[u];
    }
    o && delete t.__transition;
  }
}
function qa(t) {
  return this.each(function() {
    In(this, t);
  });
}
function Ha(t, n) {
  var e, r;
  return function() {
    var i = St(this, t), o = i.tween;
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
    var o = St(this, t), u = o.tween;
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
function Ya(t, n) {
  var e = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = pt(this.node(), e).tween, i = 0, o = r.length, u; i < o; ++i)
      if ((u = r[i]).name === t)
        return u.value;
    return null;
  }
  return this.each((n == null ? Ha : Oa)(e, t, n));
}
function rr(t, n, e) {
  var r = t._id;
  return t.each(function() {
    var i = St(this, r);
    (i.value || (i.value = {}))[n] = e.apply(this, arguments);
  }), function(i) {
    return pt(i, r).value[n];
  };
}
function Ci(t, n) {
  var e;
  return (typeof n == "number" ? ft : n instanceof Rt ? qn : (e = Rt(n)) ? (n = e, qn) : Ei)(t, n);
}
function Va(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ua(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Wa(t, n, e) {
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
function Ka(t, n, e) {
  var r, i, o;
  return function() {
    var u, a = e(this), f;
    return a == null ? void this.removeAttribute(t) : (u = this.getAttribute(t), f = a + "", u === f ? null : u === r && f === i ? o : (i = f, o = n(r = u, a)));
  };
}
function Za(t, n, e) {
  var r, i, o;
  return function() {
    var u, a = e(this), f;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (u = this.getAttributeNS(t.space, t.local), f = a + "", u === f ? null : u === r && f === i ? o : (i = f, o = n(r = u, a)));
  };
}
function Ja(t, n) {
  var e = re(t), r = e === "transform" ? Aa : Ci;
  return this.attrTween(t, typeof n == "function" ? (e.local ? Za : Ka)(e, r, rr(this, "attr." + t, n)) : n == null ? (e.local ? Ua : Va)(e) : (e.local ? Ga : Wa)(e, r, n));
}
function Qa(t, n) {
  return function(e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function ja(t, n) {
  return function(e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function ts(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && ja(t, o)), e;
  }
  return i._value = n, i;
}
function ns(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Qa(t, o)), e;
  }
  return i._value = n, i;
}
function es(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = re(t);
  return this.tween(e, (r.local ? ts : ns)(r, n));
}
function rs(t, n) {
  return function() {
    er(this, t).delay = +n.apply(this, arguments);
  };
}
function is(t, n) {
  return n = +n, function() {
    er(this, t).delay = n;
  };
}
function os(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? rs : is)(n, t)) : pt(this.node(), n).delay;
}
function us(t, n) {
  return function() {
    St(this, t).duration = +n.apply(this, arguments);
  };
}
function as(t, n) {
  return n = +n, function() {
    St(this, t).duration = n;
  };
}
function ss(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? us : as)(n, t)) : pt(this.node(), n).duration;
}
function cs(t, n) {
  if (typeof n != "function") throw new Error();
  return function() {
    St(this, t).ease = n;
  };
}
function ls(t) {
  var n = this._id;
  return arguments.length ? this.each(cs(n, t)) : pt(this.node(), n).ease;
}
function fs(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    St(this, t).ease = e;
  };
}
function hs(t) {
  if (typeof t != "function") throw new Error();
  return this.each(fs(this._id, t));
}
function ds(t) {
  typeof t != "function" && (t = di(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], u = o.length, a = r[i] = [], f, c = 0; c < u; ++c)
      (f = o[c]) && t.call(f, f.__data__, c, o) && a.push(f);
  return new Et(r, this._parents, this._name, this._id);
}
function ps(t) {
  if (t._id !== this._id) throw new Error();
  for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), u = new Array(r), a = 0; a < o; ++a)
    for (var f = n[a], c = e[a], s = f.length, l = u[a] = new Array(s), h, p = 0; p < s; ++p)
      (h = f[p] || c[p]) && (l[p] = h);
  for (; a < r; ++a)
    u[a] = n[a];
  return new Et(u, this._parents, this._name, this._id);
}
function gs(t) {
  return (t + "").trim().split(/^|\s+/).every(function(n) {
    var e = n.indexOf(".");
    return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
  });
}
function ys(t, n, e) {
  var r, i, o = gs(n) ? er : St;
  return function() {
    var u = o(this, t), a = u.on;
    a !== r && (i = (r = a).copy()).on(n, e), u.on = i;
  };
}
function ms(t, n) {
  var e = this._id;
  return arguments.length < 2 ? pt(this.node(), e).on.on(t) : this.each(ys(e, t, n));
}
function vs(t) {
  return function() {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function ws() {
  return this.on("end.remove", vs(this._id));
}
function _s(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = Ke(t));
  for (var r = this._groups, i = r.length, o = new Array(i), u = 0; u < i; ++u)
    for (var a = r[u], f = a.length, c = o[u] = new Array(f), s, l, h = 0; h < f; ++h)
      (s = a[h]) && (l = t.call(s, s.__data__, h, a)) && ("__data__" in s && (l.__data__ = s.__data__), c[h] = l, oe(c[h], n, e, h, c, pt(s, e)));
  return new Et(o, this._parents, n, e);
}
function xs(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = hi(t));
  for (var r = this._groups, i = r.length, o = [], u = [], a = 0; a < i; ++a)
    for (var f = r[a], c = f.length, s, l = 0; l < c; ++l)
      if (s = f[l]) {
        for (var h = t.call(s, s.__data__, l, f), p, m = pt(s, e), _ = 0, b = h.length; _ < b; ++_)
          (p = h[_]) && oe(p, n, e, _, h, m);
        o.push(h), u.push(s);
      }
  return new Et(o, u, n, e);
}
var bs = pn.prototype.constructor;
function Ss() {
  return new bs(this._groups, this._parents);
}
function Ms(t, n) {
  var e, r, i;
  return function() {
    var o = Ht(this, t), u = (this.style.removeProperty(t), Ht(this, t));
    return o === u ? null : o === e && u === r ? i : i = n(e = o, r = u);
  };
}
function Ti(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ks(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var u = Ht(this, t);
    return u === i ? null : u === r ? o : o = n(r = u, e);
  };
}
function Es(t, n, e) {
  var r, i, o;
  return function() {
    var u = Ht(this, t), a = e(this), f = a + "";
    return a == null && (f = a = (this.style.removeProperty(t), Ht(this, t))), u === f ? null : u === r && f === i ? o : (i = f, o = n(r = u, a));
  };
}
function Ns(t, n) {
  var e, r, i, o = "style." + n, u = "end." + o, a;
  return function() {
    var f = St(this, t), c = f.on, s = f.value[o] == null ? a || (a = Ti(n)) : void 0;
    (c !== e || i !== s) && (r = (e = c).copy()).on(u, i = s), f.on = r;
  };
}
function $s(t, n, e) {
  var r = (t += "") == "transform" ? $a : Ci;
  return n == null ? this.styleTween(t, Ms(t, r)).on("end.style." + t, Ti(t)) : typeof n == "function" ? this.styleTween(t, Es(t, r, rr(this, "style." + t, n))).each(Ns(this._id, t)) : this.styleTween(t, ks(t, r, n), e).on("end.style." + t, null);
}
function As(t, n, e) {
  return function(r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function zs(t, n, e) {
  var r, i;
  function o() {
    var u = n.apply(this, arguments);
    return u !== i && (r = (i = u) && As(t, u, e)), r;
  }
  return o._value = n, o;
}
function Rs(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, zs(t, n, e ?? ""));
}
function Ps(t) {
  return function() {
    this.textContent = t;
  };
}
function Cs(t) {
  return function() {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Ts(t) {
  return this.tween("text", typeof t == "function" ? Cs(rr(this, "text", t)) : Ps(t == null ? "" : t + ""));
}
function Is(t) {
  return function(n) {
    this.textContent = t.call(this, n);
  };
}
function Fs(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && Is(i)), n;
  }
  return r._value = t, r;
}
function Ds(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Fs(t));
}
function Ls() {
  for (var t = this._name, n = this._id, e = Ii(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var u = r[o], a = u.length, f, c = 0; c < a; ++c)
      if (f = u[c]) {
        var s = pt(f, n);
        oe(f, t, e, c, u, {
          time: s.time + s.delay + s.duration,
          delay: 0,
          duration: s.duration,
          ease: s.ease
        });
      }
  return new Et(r, this._parents, t, e);
}
function Bs() {
  var t, n, e = this, r = e._id, i = e.size();
  return new Promise(function(o, u) {
    var a = { value: u }, f = { value: function() {
      --i === 0 && o();
    } };
    e.each(function() {
      var c = St(this, r), s = c.on;
      s !== t && (n = (t = s).copy(), n._.cancel.push(a), n._.interrupt.push(a), n._.end.push(f)), c.on = n;
    }), i === 0 && o();
  });
}
var Xs = 0;
function Et(t, n, e, r) {
  this._groups = t, this._parents = n, this._name = e, this._id = r;
}
function Ii() {
  return ++Xs;
}
var Mt = pn.prototype;
Et.prototype = {
  constructor: Et,
  select: _s,
  selectAll: xs,
  selectChild: Mt.selectChild,
  selectChildren: Mt.selectChildren,
  filter: ds,
  merge: ps,
  selection: Ss,
  transition: Ls,
  call: Mt.call,
  nodes: Mt.nodes,
  node: Mt.node,
  size: Mt.size,
  empty: Mt.empty,
  each: Mt.each,
  on: ms,
  attr: Ja,
  attrTween: es,
  style: $s,
  styleTween: Rs,
  text: Ts,
  textTween: Ds,
  remove: ws,
  tween: Ya,
  delay: os,
  duration: ss,
  ease: ls,
  easeVarying: hs,
  end: Bs,
  [Symbol.iterator]: Mt[Symbol.iterator]
};
function qs(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Hs = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: qs
};
function Os(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${n} not found`);
  return e;
}
function Ys(t) {
  var n, e;
  t instanceof Et ? (n = t._id, t = t._name) : (n = Ii(), (e = Hs).time = nr(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var u = r[o], a = u.length, f, c = 0; c < a; ++c)
      (f = u[c]) && oe(f, t, n, c, u, e || Os(f, n));
  return new Et(r, this._parents, t, n);
}
pn.prototype.interrupt = qa;
pn.prototype.transition = Ys;
const Mn = (t) => () => t;
function Vs(t, {
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
function dt(t, n, e) {
  this.k = t, this.x = n, this.y = e;
}
dt.prototype = {
  constructor: dt,
  scale: function(t) {
    return t === 1 ? this : new dt(this.k * t, this.x, this.y);
  },
  translate: function(t, n) {
    return t === 0 & n === 0 ? this : new dt(this.k, this.x + this.k * t, this.y + this.k * n);
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
var cn = new dt(1, 0, 0);
Fi.prototype = dt.prototype;
function Fi(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return cn;
  return t.__zoom;
}
function fe(t) {
  t.stopImmediatePropagation();
}
function Kt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Us(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Ws() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Tr() {
  return this.__zoom || cn;
}
function Gs(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Ks() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Zs(t, n, e) {
  var r = t.invertX(n[0][0]) - e[0][0], i = t.invertX(n[1][0]) - e[1][0], o = t.invertY(n[0][1]) - e[0][1], u = t.invertY(n[1][1]) - e[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    u > o ? (o + u) / 2 : Math.min(0, o) || Math.max(0, u)
  );
}
function Js() {
  var t = Us, n = Ws, e = Zs, r = Gs, i = Ks, o = [0, 1 / 0], u = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, f = Ca, c = Je("start", "zoom", "end"), s, l, h, p = 500, m = 150, _ = 0, b = 10;
  function w(d) {
    d.property("__zoom", Tr).on("wheel.zoom", B, { passive: !1 }).on("mousedown.zoom", I).on("dblclick.zoom", q).filter(i).on("touchstart.zoom", R).on("touchmove.zoom", P).on("touchend.zoom touchcancel.zoom", T).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  w.transform = function(d, g, y, x) {
    var k = d.selection ? d.selection() : d;
    k.property("__zoom", Tr), d !== k ? A(d, g, y, x) : k.interrupt().each(function() {
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
      return e(cn.translate(F[0], F[1]).scale(z.k).translate(
        typeof g == "function" ? -g.apply(this, arguments) : -g,
        typeof y == "function" ? -y.apply(this, arguments) : -y
      ), $, u);
    }, x, k);
  };
  function M(d, g) {
    return g = Math.max(o[0], Math.min(o[1], g)), g === d.k ? d : new dt(g, d.x, d.y);
  }
  function E(d, g, y) {
    var x = g[0] - y[0] * d.k, k = g[1] - y[1] * d.k;
    return x === d.x && k === d.y ? d : new dt(d.k, x, k);
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
      var k = this, $ = arguments, z = v(k, $).event(x), F = n.apply(k, $), O = y == null ? S(F) : typeof y == "function" ? y.apply(k, $) : y, U = Math.max(F[1][0] - F[0][0], F[1][1] - F[0][1]), V = k.__zoom, X = typeof g == "function" ? g.apply(k, $) : g, ut = f(V.invert(O).concat(U / V.k), X.invert(O).concat(U / X.k));
      return function(W) {
        if (W === 1) W = X;
        else {
          var at = ut(W), gt = U / at[2];
          W = new dt(gt, O[0] - at[0] * gt, O[1] - at[1] * gt);
        }
        z.zoom(null, W);
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
      var g = wt(this.that).datum();
      c.call(
        d,
        this.that,
        new Vs(d, {
          sourceEvent: this.sourceEvent,
          target: w,
          transform: this.that.__zoom,
          dispatch: c
        }),
        g
      );
    }
  };
  function B(d, ...g) {
    if (!t.apply(this, arguments)) return;
    var y = v(this, g).event(d), x = this.__zoom, k = Math.max(o[0], Math.min(o[1], x.k * Math.pow(2, r.apply(this, arguments)))), $ = $t(d);
    if (y.wheel)
      (y.mouse[0][0] !== $[0] || y.mouse[0][1] !== $[1]) && (y.mouse[1] = x.invert(y.mouse[0] = $)), clearTimeout(y.wheel);
    else {
      if (x.k === k) return;
      y.mouse = [$, x.invert($)], In(this), y.start();
    }
    Kt(d), y.wheel = setTimeout(z, m), y.zoom("mouse", e(E(M(x, k), y.mouse[0], y.mouse[1]), y.extent, u));
    function z() {
      y.wheel = null, y.end();
    }
  }
  function I(d, ...g) {
    if (h || !t.apply(this, arguments)) return;
    var y = d.currentTarget, x = v(this, g, !0).event(d), k = wt(d.view).on("mousemove.zoom", O, !0).on("mouseup.zoom", U, !0), $ = $t(d, y), z = d.clientX, F = d.clientY;
    na(d.view), fe(d), x.mouse = [$, this.__zoom.invert($)], In(this), x.start();
    function O(V) {
      if (Kt(V), !x.moved) {
        var X = V.clientX - z, ut = V.clientY - F;
        x.moved = X * X + ut * ut > _;
      }
      x.event(V).zoom("mouse", e(E(x.that.__zoom, x.mouse[0] = $t(V, y), x.mouse[1]), x.extent, u));
    }
    function U(V) {
      k.on("mousemove.zoom mouseup.zoom", null), ea(V.view, x.moved), Kt(V), x.event(V).end();
    }
  }
  function q(d, ...g) {
    if (t.apply(this, arguments)) {
      var y = this.__zoom, x = $t(d.changedTouches ? d.changedTouches[0] : d, this), k = y.invert(x), $ = y.k * (d.shiftKey ? 0.5 : 2), z = e(E(M(y, $), x, k), n.apply(this, g), u);
      Kt(d), a > 0 ? wt(this).transition().duration(a).call(A, z, x, d) : wt(this).call(w.transform, z, x, d);
    }
  }
  function R(d, ...g) {
    if (t.apply(this, arguments)) {
      var y = d.touches, x = y.length, k = v(this, g, d.changedTouches.length === x).event(d), $, z, F, O;
      for (fe(d), z = 0; z < x; ++z)
        F = y[z], O = $t(F, this), O = [O, this.__zoom.invert(O), F.identifier], k.touch0 ? !k.touch1 && k.touch0[2] !== O[2] && (k.touch1 = O, k.taps = 0) : (k.touch0 = O, $ = !0, k.taps = 1 + !!s);
      s && (s = clearTimeout(s)), $ && (k.taps < 2 && (l = O[0], s = setTimeout(function() {
        s = null;
      }, p)), In(this), k.start());
    }
  }
  function P(d, ...g) {
    if (this.__zooming) {
      var y = v(this, g).event(d), x = d.changedTouches, k = x.length, $, z, F, O;
      for (Kt(d), $ = 0; $ < k; ++$)
        z = x[$], F = $t(z, this), y.touch0 && y.touch0[2] === z.identifier ? y.touch0[0] = F : y.touch1 && y.touch1[2] === z.identifier && (y.touch1[0] = F);
      if (z = y.that.__zoom, y.touch1) {
        var U = y.touch0[0], V = y.touch0[1], X = y.touch1[0], ut = y.touch1[1], W = (W = X[0] - U[0]) * W + (W = X[1] - U[1]) * W, at = (at = ut[0] - V[0]) * at + (at = ut[1] - V[1]) * at;
        z = M(z, Math.sqrt(W / at)), F = [(U[0] + X[0]) / 2, (U[1] + X[1]) / 2], O = [(V[0] + ut[0]) / 2, (V[1] + ut[1]) / 2];
      } else if (y.touch0) F = y.touch0[0], O = y.touch0[1];
      else return;
      y.zoom("touch", e(E(z, F, O), y.extent, u));
    }
  }
  function T(d, ...g) {
    if (this.__zooming) {
      var y = v(this, g).event(d), x = d.changedTouches, k = x.length, $, z;
      for (fe(d), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, p), $ = 0; $ < k; ++$)
        z = x[$], y.touch0 && y.touch0[2] === z.identifier ? delete y.touch0 : y.touch1 && y.touch1[2] === z.identifier && delete y.touch1;
      if (y.touch1 && !y.touch0 && (y.touch0 = y.touch1, delete y.touch1), y.touch0) y.touch0[1] = this.__zoom.invert(y.touch0[0]);
      else if (y.end(), y.taps === 2 && (z = $t(z, this), Math.hypot(l[0] - z[0], l[1] - z[1]) < b)) {
        var F = wt(this).on("dblclick.zoom");
        F && F.apply(this, arguments);
      }
    }
  }
  return w.wheelDelta = function(d) {
    return arguments.length ? (r = typeof d == "function" ? d : Mn(+d), w) : r;
  }, w.filter = function(d) {
    return arguments.length ? (t = typeof d == "function" ? d : Mn(!!d), w) : t;
  }, w.touchable = function(d) {
    return arguments.length ? (i = typeof d == "function" ? d : Mn(!!d), w) : i;
  }, w.extent = function(d) {
    return arguments.length ? (n = typeof d == "function" ? d : Mn([[+d[0][0], +d[0][1]], [+d[1][0], +d[1][1]]]), w) : n;
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
function Qs(t) {
  return t;
}
function js(t) {
  if (t == null) return Qs;
  var n, e, r = t.scale[0], i = t.scale[1], o = t.translate[0], u = t.translate[1];
  return function(a, f) {
    f || (n = e = 0);
    var c = 2, s = a.length, l = new Array(s);
    for (l[0] = (n += a[0]) * r + o, l[1] = (e += a[1]) * i + u; c < s; ) l[c] = a[c], ++c;
    return l;
  };
}
function tc(t, n) {
  for (var e, r = t.length, i = r - n; i < --r; ) e = t[i], t[i++] = t[r], t[r] = e;
}
function nc(t, n) {
  return typeof n == "string" && (n = t.objects[n]), n.type === "GeometryCollection" ? { type: "FeatureCollection", features: n.geometries.map(function(e) {
    return Ir(t, e);
  }) } : Ir(t, n);
}
function Ir(t, n) {
  var e = n.id, r = n.bbox, i = n.properties == null ? {} : n.properties, o = ec(t, n);
  return e == null && r == null ? { type: "Feature", properties: i, geometry: o } : r == null ? { type: "Feature", id: e, properties: i, geometry: o } : { type: "Feature", id: e, bbox: r, properties: i, geometry: o };
}
function ec(t, n) {
  var e = js(t.transform), r = t.arcs;
  function i(s, l) {
    l.length && l.pop();
    for (var h = r[s < 0 ? ~s : s], p = 0, m = h.length; p < m; ++p)
      l.push(e(h[p], p));
    s < 0 && tc(l, m);
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
const on = /* @__PURE__ */ new Map(), he = /* @__PURE__ */ new Map();
async function rc(t) {
  const n = on.get(t);
  if (n) return n;
  const e = he.get(t);
  if (e) return e;
  const r = (async () => {
    const i = await fetch(t);
    if (!i.ok)
      throw new Error(`Failed to fetch ${t}: ${i.status} ${i.statusText}`);
    const o = await i.json(), u = Object.keys(o.objects)[0], a = nc(o, o.objects[u]);
    return on.set(t, a), a;
  })();
  he.set(t, r);
  try {
    return await r;
  } finally {
    he.delete(t);
  }
}
function de(t) {
  const [n, e] = lt(0), [r, i] = lt(() => {
    if (!t) return { status: "idle" };
    const u = on.get(t);
    return u ? { status: "ready", data: u } : { status: "loading" };
  });
  mt(() => {
    if (!t) {
      i({ status: "idle" });
      return;
    }
    const u = on.get(t);
    if (u) {
      i({ status: "ready", data: u });
      return;
    }
    let a = !1;
    return i({ status: "loading" }), rc(t).then((f) => {
      a || i({ status: "ready", data: f });
    }).catch((f) => {
      a || i({ status: "error", error: f instanceof Error ? f : new Error(String(f)) });
    }), () => {
      a = !0;
    };
  }, [t, n]);
  const o = tt(() => {
    t && on.delete(t), e((u) => u + 1);
  }, [t]);
  return [r, o];
}
const pe = /* @__PURE__ */ new Map();
function ic(t) {
  const n = `${t}/meta.json`, [e, r] = lt(() => {
    const i = pe.get(n);
    return i ? { status: "ready", data: i } : { status: "loading" };
  });
  return mt(() => {
    const i = pe.get(n);
    if (i) {
      r({ status: "ready", data: i });
      return;
    }
    let o = !1;
    return r({ status: "loading" }), fetch(n).then((u) => {
      if (!u.ok) throw new Error(`Failed to fetch ${n}: ${u.status} ${u.statusText}`);
      return u.json();
    }).then((u) => {
      pe.set(n, u), o || r({ status: "ready", data: u });
    }).catch(() => {
      o || r({ status: "error" });
    }), () => {
      o = !0;
    };
  }, [n]), e;
}
function Fn(t, n) {
  return t == null || n == null ? NaN : t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function oc(t, n) {
  return t == null || n == null ? NaN : n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
}
function Di(t) {
  let n, e, r;
  t.length !== 2 ? (n = Fn, e = (a, f) => Fn(t(a), f), r = (a, f) => t(a) - f) : (n = t === Fn || t === oc ? t : uc, e = t, r = t);
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
function uc() {
  return 0;
}
function ac(t) {
  return t === null ? NaN : +t;
}
const sc = Di(Fn), cc = sc.right;
Di(ac).center;
class Ct {
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
const lc = Math.sqrt(50), fc = Math.sqrt(10), hc = Math.sqrt(2);
function Vn(t, n, e) {
  const r = (n - t) / Math.max(0, e), i = Math.floor(Math.log10(r)), o = r / Math.pow(10, i), u = o >= lc ? 10 : o >= fc ? 5 : o >= hc ? 2 : 1;
  let a, f, c;
  return i < 0 ? (c = Math.pow(10, -i) / u, a = Math.round(t * c), f = Math.round(n * c), a / c < t && ++a, f / c > n && --f, c = -c) : (c = Math.pow(10, i) * u, a = Math.round(t / c), f = Math.round(n / c), a * c < t && ++a, f * c > n && --f), f < a && 0.5 <= e && e < 2 ? Vn(t, n, e * 2) : [a, f, c];
}
function dc(t, n, e) {
  if (n = +n, t = +t, e = +e, !(e > 0)) return [];
  if (t === n) return [t];
  const r = n < t, [i, o, u] = r ? Vn(n, t, e) : Vn(t, n, e);
  if (!(o >= i)) return [];
  const a = o - i + 1, f = new Array(a);
  if (r)
    if (u < 0) for (let c = 0; c < a; ++c) f[c] = (o - c) / -u;
    else for (let c = 0; c < a; ++c) f[c] = (o - c) * u;
  else if (u < 0) for (let c = 0; c < a; ++c) f[c] = (i + c) / -u;
  else for (let c = 0; c < a; ++c) f[c] = (i + c) * u;
  return f;
}
function Re(t, n, e) {
  return n = +n, t = +t, e = +e, Vn(t, n, e)[2];
}
function pc(t, n, e) {
  n = +n, t = +t, e = +e;
  const r = n < t, i = r ? Re(n, t, e) : Re(t, n, e);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function* gc(t) {
  for (const n of t)
    yield* n;
}
function Li(t) {
  return Array.from(gc(t));
}
var Y = 1e-6, H = Math.PI, et = H / 2, Fr = H / 4, ot = H * 2, rt = 180 / H, Q = H / 180, K = Math.abs, Bi = Math.atan, ln = Math.atan2, Z = Math.cos, yc = Math.exp, mc = Math.log, J = Math.sin, vc = Math.sign || function(t) {
  return t > 0 ? 1 : t < 0 ? -1 : 0;
}, It = Math.sqrt, wc = Math.tan;
function _c(t) {
  return t > 1 ? 0 : t < -1 ? H : Math.acos(t);
}
function fn(t) {
  return t > 1 ? et : t < -1 ? -et : Math.asin(t);
}
function ct() {
}
function Un(t, n) {
  t && Lr.hasOwnProperty(t.type) && Lr[t.type](t, n);
}
var Dr = {
  Feature: function(t, n) {
    Un(t.geometry, n);
  },
  FeatureCollection: function(t, n) {
    for (var e = t.features, r = -1, i = e.length; ++r < i; ) Un(e[r].geometry, n);
  }
}, Lr = {
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
    Pe(t.coordinates, n, 0);
  },
  MultiLineString: function(t, n) {
    for (var e = t.coordinates, r = -1, i = e.length; ++r < i; ) Pe(e[r], n, 0);
  },
  Polygon: function(t, n) {
    Br(t.coordinates, n);
  },
  MultiPolygon: function(t, n) {
    for (var e = t.coordinates, r = -1, i = e.length; ++r < i; ) Br(e[r], n);
  },
  GeometryCollection: function(t, n) {
    for (var e = t.geometries, r = -1, i = e.length; ++r < i; ) Un(e[r], n);
  }
};
function Pe(t, n, e) {
  var r = -1, i = t.length - e, o;
  for (n.lineStart(); ++r < i; ) o = t[r], n.point(o[0], o[1], o[2]);
  n.lineEnd();
}
function Br(t, n) {
  var e = -1, r = t.length;
  for (n.polygonStart(); ++e < r; ) Pe(t[e], n, 1);
  n.polygonEnd();
}
function Lt(t, n) {
  t && Dr.hasOwnProperty(t.type) ? Dr[t.type](t, n) : Un(t, n);
}
function Ce(t) {
  return [ln(t[1], t[0]), fn(t[2])];
}
function Yt(t) {
  var n = t[0], e = t[1], r = Z(e);
  return [r * Z(n), r * J(n), J(e)];
}
function kn(t, n) {
  return t[0] * n[0] + t[1] * n[1] + t[2] * n[2];
}
function Wn(t, n) {
  return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]];
}
function ge(t, n) {
  t[0] += n[0], t[1] += n[1], t[2] += n[2];
}
function En(t, n) {
  return [t[0] * n, t[1] * n, t[2] * n];
}
function Te(t) {
  var n = It(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
  t[0] /= n, t[1] /= n, t[2] /= n;
}
function Ie(t, n) {
  function e(r, i) {
    return r = t(r, i), n(r[0], r[1]);
  }
  return t.invert && n.invert && (e.invert = function(r, i) {
    return r = n.invert(r, i), r && t.invert(r[0], r[1]);
  }), e;
}
function Fe(t, n) {
  return K(t) > H && (t -= Math.round(t / ot) * ot), [t, n];
}
Fe.invert = Fe;
function Xi(t, n, e) {
  return (t %= ot) ? n || e ? Ie(qr(t), Hr(n, e)) : qr(t) : n || e ? Hr(n, e) : Fe;
}
function Xr(t) {
  return function(n, e) {
    return n += t, K(n) > H && (n -= Math.round(n / ot) * ot), [n, e];
  };
}
function qr(t) {
  var n = Xr(t);
  return n.invert = Xr(-t), n;
}
function Hr(t, n) {
  var e = Z(t), r = J(t), i = Z(n), o = J(n);
  function u(a, f) {
    var c = Z(f), s = Z(a) * c, l = J(a) * c, h = J(f), p = h * e + s * r;
    return [
      ln(l * i - p * o, s * e - h * r),
      fn(p * i + l * o)
    ];
  }
  return u.invert = function(a, f) {
    var c = Z(f), s = Z(a) * c, l = J(a) * c, h = J(f), p = h * i - l * o;
    return [
      ln(l * i + h * o, s * e + p * r),
      fn(p * e - s * r)
    ];
  }, u;
}
function xc(t) {
  t = Xi(t[0] * Q, t[1] * Q, t.length > 2 ? t[2] * Q : 0);
  function n(e) {
    return e = t(e[0] * Q, e[1] * Q), e[0] *= rt, e[1] *= rt, e;
  }
  return n.invert = function(e) {
    return e = t.invert(e[0] * Q, e[1] * Q), e[0] *= rt, e[1] *= rt, e;
  }, n;
}
function bc(t, n, e, r, i, o) {
  if (e) {
    var u = Z(n), a = J(n), f = r * e;
    i == null ? (i = n + r * ot, o = n - f / 2) : (i = Or(u, i), o = Or(u, o), (r > 0 ? i < o : i > o) && (i += r * ot));
    for (var c, s = i; r > 0 ? s > o : s < o; s -= f)
      c = Ce([u, -a * Z(s), -a * J(s)]), t.point(c[0], c[1]);
  }
}
function Or(t, n) {
  n = Yt(n), n[0] -= t, Te(n);
  var e = _c(-n[1]);
  return ((-n[2] < 0 ? -e : e) + ot - Y) % ot;
}
function qi() {
  var t = [], n;
  return {
    point: function(e, r, i) {
      n.push([e, r, i]);
    },
    lineStart: function() {
      t.push(n = []);
    },
    lineEnd: ct,
    rejoin: function() {
      t.length > 1 && t.push(t.pop().concat(t.shift()));
    },
    result: function() {
      var e = t;
      return t = [], n = null, e;
    }
  };
}
function Dn(t, n) {
  return K(t[0] - n[0]) < Y && K(t[1] - n[1]) < Y;
}
function Nn(t, n, e, r) {
  this.x = t, this.z = n, this.o = e, this.e = r, this.v = !1, this.n = this.p = null;
}
function Hi(t, n, e, r, i) {
  var o = [], u = [], a, f;
  if (t.forEach(function(m) {
    if (!((_ = m.length - 1) <= 0)) {
      var _, b = m[0], w = m[_], M;
      if (Dn(b, w)) {
        if (!b[2] && !w[2]) {
          for (i.lineStart(), a = 0; a < _; ++a) i.point((b = m[a])[0], b[1]);
          i.lineEnd();
          return;
        }
        w[0] += 2 * Y;
      }
      o.push(M = new Nn(b, m, null, !0)), u.push(M.o = new Nn(b, null, M, !1)), o.push(M = new Nn(w, m, null, !1)), u.push(M.o = new Nn(w, null, M, !0));
    }
  }), !!o.length) {
    for (u.sort(n), Yr(o), Yr(u), a = 0, f = u.length; a < f; ++a)
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
function Yr(t) {
  if (n = t.length) {
    for (var n, e = 0, r = t[0], i; ++e < n; )
      r.n = i = t[e], i.p = r, r = i;
    r.n = i = t[0], i.p = r;
  }
}
function ye(t) {
  return K(t[0]) <= H ? t[0] : vc(t[0]) * ((K(t[0]) + H) % ot - H);
}
function Sc(t, n) {
  var e = ye(n), r = n[1], i = J(r), o = [J(e), -Z(e), 0], u = 0, a = 0, f = new Ct();
  i === 1 ? r = et + Y : i === -1 && (r = -et - Y);
  for (var c = 0, s = t.length; c < s; ++c)
    if (h = (l = t[c]).length)
      for (var l, h, p = l[h - 1], m = ye(p), _ = p[1] / 2 + Fr, b = J(_), w = Z(_), M = 0; M < h; ++M, m = S, b = v, w = D, p = E) {
        var E = l[M], S = ye(E), A = E[1] / 2 + Fr, v = J(A), D = Z(A), B = S - m, I = B >= 0 ? 1 : -1, q = I * B, R = q > H, P = b * v;
        if (f.add(ln(P * I * J(q), w * D + P * Z(q))), u += R ? B + I * ot : B, R ^ m >= e ^ S >= e) {
          var T = Wn(Yt(p), Yt(E));
          Te(T);
          var d = Wn(o, T);
          Te(d);
          var g = (R ^ B >= 0 ? -1 : 1) * fn(d[2]);
          (r > g || r === g && (T[0] || T[1])) && (a += R ^ B >= 0 ? 1 : -1);
        }
      }
  return (u < -Y || u < Y && f < -1e-12) ^ a & 1;
}
function Oi(t, n, e, r) {
  return function(i) {
    var o = n(i), u = qi(), a = n(u), f = !1, c, s, l, h = {
      point: p,
      lineStart: _,
      lineEnd: b,
      polygonStart: function() {
        h.point = w, h.lineStart = M, h.lineEnd = E, s = [], c = [];
      },
      polygonEnd: function() {
        h.point = p, h.lineStart = _, h.lineEnd = b, s = Li(s);
        var S = Sc(c, r);
        s.length ? (f || (i.polygonStart(), f = !0), Hi(s, kc, S, e, i)) : S && (f || (i.polygonStart(), f = !0), i.lineStart(), e(null, null, 1, i), i.lineEnd()), f && (i.polygonEnd(), f = !1), s = c = null;
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
      var S = a.clean(), A = u.result(), v, D = A.length, B, I, q;
      if (l.pop(), c.push(l), l = null, !!D) {
        if (S & 1) {
          if (I = A[0], (B = I.length - 1) > 0) {
            for (f || (i.polygonStart(), f = !0), i.lineStart(), v = 0; v < B; ++v) i.point((q = I[v])[0], q[1]);
            i.lineEnd();
          }
          return;
        }
        D > 1 && S & 2 && A.push(A.pop().concat(A.shift())), s.push(A.filter(Mc));
      }
    }
    return h;
  };
}
function Mc(t) {
  return t.length > 1;
}
function kc(t, n) {
  return ((t = t.x)[0] < 0 ? t[1] - et - Y : et - t[1]) - ((n = n.x)[0] < 0 ? n[1] - et - Y : et - n[1]);
}
const Vr = Oi(
  function() {
    return !0;
  },
  Ec,
  $c,
  [-H, -et]
);
function Ec(t) {
  var n = NaN, e = NaN, r = NaN, i;
  return {
    lineStart: function() {
      t.lineStart(), i = 1;
    },
    point: function(o, u) {
      var a = o > 0 ? H : -H, f = K(o - n);
      K(f - H) < Y ? (t.point(n, e = (e + u) / 2 > 0 ? et : -et), t.point(r, e), t.lineEnd(), t.lineStart(), t.point(a, e), t.point(o, e), i = 0) : r !== a && f >= H && (K(n - r) < Y && (n -= r * Y), K(o - a) < Y && (o -= a * Y), e = Nc(n, e, o, u), t.point(r, e), t.lineEnd(), t.lineStart(), t.point(a, e), i = 0), t.point(n = o, e = u), r = a;
    },
    lineEnd: function() {
      t.lineEnd(), n = e = NaN;
    },
    clean: function() {
      return 2 - i;
    }
  };
}
function Nc(t, n, e, r) {
  var i, o, u = J(t - e);
  return K(u) > Y ? Bi((J(n) * (o = Z(r)) * J(e) - J(r) * (i = Z(n)) * J(t)) / (i * o * u)) : (n + r) / 2;
}
function $c(t, n, e, r) {
  var i;
  if (t == null)
    i = e * et, r.point(-H, i), r.point(0, i), r.point(H, i), r.point(H, 0), r.point(H, -i), r.point(0, -i), r.point(-H, -i), r.point(-H, 0), r.point(-H, i);
  else if (K(t[0] - n[0]) > Y) {
    var o = t[0] < n[0] ? H : -H;
    i = e * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i);
  } else
    r.point(n[0], n[1]);
}
function Ac(t) {
  var n = Z(t), e = 2 * Q, r = n > 0, i = K(n) > Y;
  function o(s, l, h, p) {
    bc(p, t, e, h, s, l);
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
        var M = [b, w], E, S = u(b, w), A = r ? S ? 0 : c(b, w) : S ? c(b + (b < 0 ? H : -H), w) : 0;
        if (!l && (m = p = S) && s.lineStart(), S !== p && (E = f(l, M), (!E || Dn(l, E) || Dn(M, E)) && (M[2] = 1)), S !== p)
          _ = 0, S ? (s.lineStart(), E = f(M, l), s.point(E[0], E[1])) : (E = f(l, M), s.point(E[0], E[1], 2), s.lineEnd()), l = E;
        else if (i && l && r ^ S) {
          var v;
          !(A & h) && (v = f(M, l, !0)) && (_ = 0, r ? (s.lineStart(), s.point(v[0][0], v[0][1]), s.point(v[1][0], v[1][1]), s.lineEnd()) : (s.point(v[1][0], v[1][1]), s.lineEnd(), s.lineStart(), s.point(v[0][0], v[0][1], 3)));
        }
        S && (!l || !Dn(l, M)) && s.point(M[0], M[1]), l = M, p = S, h = A;
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
    var p = Yt(s), m = Yt(l), _ = [1, 0, 0], b = Wn(p, m), w = kn(b, b), M = b[0], E = w - M * M;
    if (!E) return !h && s;
    var S = n * w / E, A = -n * M / E, v = Wn(_, b), D = En(_, S), B = En(b, A);
    ge(D, B);
    var I = v, q = kn(D, I), R = kn(I, I), P = q * q - R * (kn(D, D) - 1);
    if (!(P < 0)) {
      var T = It(P), d = En(I, (-q - T) / R);
      if (ge(d, D), d = Ce(d), !h) return d;
      var g = s[0], y = l[0], x = s[1], k = l[1], $;
      y < g && ($ = g, g = y, y = $);
      var z = y - g, F = K(z - H) < Y, O = F || z < Y;
      if (!F && k < x && ($ = x, x = k, k = $), O ? F ? x + k > 0 ^ d[1] < (K(d[0] - g) < Y ? x : k) : x <= d[1] && d[1] <= k : z > H ^ (g <= d[0] && d[0] <= y)) {
        var U = En(I, (-q + T) / R);
        return ge(U, D), [d, Ce(U)];
      }
    }
  }
  function c(s, l) {
    var h = r ? t : H - t, p = 0;
    return s < -h ? p |= 1 : s > h && (p |= 2), l < -h ? p |= 4 : l > h && (p |= 8), p;
  }
  return Oi(u, a, o, r ? [0, -t] : [-H, t - H]);
}
function zc(t, n, e, r, i, o) {
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
var jt = 1e9, $n = -jt;
function Rc(t, n, e, r) {
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
    var s = c, l = qi(), h, p, m, _, b, w, M, E, S, A, v, D = {
      point: B,
      lineStart: P,
      lineEnd: T,
      polygonStart: q,
      polygonEnd: R
    };
    function B(g, y) {
      i(g, y) && s.point(g, y);
    }
    function I() {
      for (var g = 0, y = 0, x = p.length; y < x; ++y)
        for (var k = p[y], $ = 1, z = k.length, F = k[0], O, U, V = F[0], X = F[1]; $ < z; ++$)
          O = V, U = X, F = k[$], V = F[0], X = F[1], U <= r ? X > r && (V - O) * (r - U) > (X - U) * (t - O) && ++g : X <= r && (V - O) * (r - U) < (X - U) * (t - O) && --g;
      return g;
    }
    function q() {
      s = l, h = [], p = [], v = !0;
    }
    function R() {
      var g = I(), y = v && g, x = (h = Li(h)).length;
      (y || x) && (c.polygonStart(), y && (c.lineStart(), o(null, null, 1, c), c.lineEnd()), x && Hi(h, a, g, o, c), c.polygonEnd()), s = c, h = p = m = null;
    }
    function P() {
      D.point = d, p && p.push(m = []), A = !0, S = !1, M = E = NaN;
    }
    function T() {
      h && (d(_, b), w && S && l.rejoin(), h.push(l.result())), D.point = B, S && s.lineEnd();
    }
    function d(g, y) {
      var x = i(g, y);
      if (p && m.push([g, y]), A)
        _ = g, b = y, w = x, A = !1, x && (s.lineStart(), s.point(g, y));
      else if (x && S) s.point(g, y);
      else {
        var k = [M = Math.max($n, Math.min(jt, M)), E = Math.max($n, Math.min(jt, E))], $ = [g = Math.max($n, Math.min(jt, g)), y = Math.max($n, Math.min(jt, y))];
        zc(k, $, t, n, e, r) ? (S || (s.lineStart(), s.point(k[0], k[1])), s.point($[0], $[1]), x || s.lineEnd(), v = !1) : x && (s.lineStart(), s.point(g, y), v = !1);
      }
      M = g, E = y, S = x;
    }
    return D;
  };
}
const De = (t) => t;
var me = new Ct(), Le = new Ct(), Yi, Vi, Be, Xe, kt = {
  point: ct,
  lineStart: ct,
  lineEnd: ct,
  polygonStart: function() {
    kt.lineStart = Pc, kt.lineEnd = Tc;
  },
  polygonEnd: function() {
    kt.lineStart = kt.lineEnd = kt.point = ct, me.add(K(Le)), Le = new Ct();
  },
  result: function() {
    var t = me / 2;
    return me = new Ct(), t;
  }
};
function Pc() {
  kt.point = Cc;
}
function Cc(t, n) {
  kt.point = Ui, Yi = Be = t, Vi = Xe = n;
}
function Ui(t, n) {
  Le.add(Xe * t - Be * n), Be = t, Xe = n;
}
function Tc() {
  Ui(Yi, Vi);
}
var Vt = 1 / 0, Gn = Vt, hn = -Vt, Kn = hn, Zn = {
  point: Ic,
  lineStart: ct,
  lineEnd: ct,
  polygonStart: ct,
  polygonEnd: ct,
  result: function() {
    var t = [[Vt, Gn], [hn, Kn]];
    return hn = Kn = -(Gn = Vt = 1 / 0), t;
  }
};
function Ic(t, n) {
  t < Vt && (Vt = t), t > hn && (hn = t), n < Gn && (Gn = n), n > Kn && (Kn = n);
}
var qe = 0, He = 0, tn = 0, Jn = 0, Qn = 0, Bt = 0, Oe = 0, Ye = 0, nn = 0, Wi, Gi, _t, xt, st = {
  point: Tt,
  lineStart: Ur,
  lineEnd: Wr,
  polygonStart: function() {
    st.lineStart = Lc, st.lineEnd = Bc;
  },
  polygonEnd: function() {
    st.point = Tt, st.lineStart = Ur, st.lineEnd = Wr;
  },
  result: function() {
    var t = nn ? [Oe / nn, Ye / nn] : Bt ? [Jn / Bt, Qn / Bt] : tn ? [qe / tn, He / tn] : [NaN, NaN];
    return qe = He = tn = Jn = Qn = Bt = Oe = Ye = nn = 0, t;
  }
};
function Tt(t, n) {
  qe += t, He += n, ++tn;
}
function Ur() {
  st.point = Fc;
}
function Fc(t, n) {
  st.point = Dc, Tt(_t = t, xt = n);
}
function Dc(t, n) {
  var e = t - _t, r = n - xt, i = It(e * e + r * r);
  Jn += i * (_t + t) / 2, Qn += i * (xt + n) / 2, Bt += i, Tt(_t = t, xt = n);
}
function Wr() {
  st.point = Tt;
}
function Lc() {
  st.point = Xc;
}
function Bc() {
  Ki(Wi, Gi);
}
function Xc(t, n) {
  st.point = Ki, Tt(Wi = _t = t, Gi = xt = n);
}
function Ki(t, n) {
  var e = t - _t, r = n - xt, i = It(e * e + r * r);
  Jn += i * (_t + t) / 2, Qn += i * (xt + n) / 2, Bt += i, i = xt * t - _t * n, Oe += i * (_t + t), Ye += i * (xt + n), nn += i * 3, Tt(_t = t, xt = n);
}
function Zi(t) {
  this._context = t;
}
Zi.prototype = {
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
        this._context.moveTo(t + this._radius, n), this._context.arc(t, n, this._radius, 0, ot);
        break;
      }
    }
  },
  result: ct
};
var Ve = new Ct(), ve, Ji, Qi, en, rn, dn = {
  point: ct,
  lineStart: function() {
    dn.point = qc;
  },
  lineEnd: function() {
    ve && ji(Ji, Qi), dn.point = ct;
  },
  polygonStart: function() {
    ve = !0;
  },
  polygonEnd: function() {
    ve = null;
  },
  result: function() {
    var t = +Ve;
    return Ve = new Ct(), t;
  }
};
function qc(t, n) {
  dn.point = ji, Ji = en = t, Qi = rn = n;
}
function ji(t, n) {
  en -= t, rn -= n, Ve.add(It(en * en + rn * rn)), en = t, rn = n;
}
let Gr, jn, Kr, Zr;
class Jr {
  constructor(n) {
    this._append = n == null ? to : Hc(n), this._radius = 4.5, this._ = "";
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
        if (this._append`M${n},${e}`, this._radius !== Kr || this._append !== jn) {
          const r = this._radius, i = this._;
          this._ = "", this._append`m0,${r}a${r},${r} 0 1,1 0,${-2 * r}a${r},${r} 0 1,1 0,${2 * r}z`, Kr = r, jn = this._append, Zr = this._, this._ = i;
        }
        this._ += Zr;
        break;
      }
    }
  }
  result() {
    const n = this._;
    return this._ = "", n.length ? n : null;
  }
}
function to(t) {
  let n = 1;
  this._ += t[0];
  for (const e = t.length; n < e; ++n)
    this._ += arguments[n] + t[n];
}
function Hc(t) {
  const n = Math.floor(t);
  if (!(n >= 0)) throw new RangeError(`invalid digits: ${t}`);
  if (n > 15) return to;
  if (n !== Gr) {
    const e = 10 ** n;
    Gr = n, jn = function(i) {
      let o = 1;
      this._ += i[0];
      for (const u = i.length; o < u; ++o)
        this._ += Math.round(arguments[o] * e) / e + i[o];
    };
  }
  return jn;
}
function Oc(t, n) {
  let e = 3, r = 4.5, i, o;
  function u(a) {
    return a && (typeof r == "function" && o.pointRadius(+r.apply(this, arguments)), Lt(a, i(o))), o.result();
  }
  return u.area = function(a) {
    return Lt(a, i(kt)), kt.result();
  }, u.measure = function(a) {
    return Lt(a, i(dn)), dn.result();
  }, u.bounds = function(a) {
    return Lt(a, i(Zn)), Zn.result();
  }, u.centroid = function(a) {
    return Lt(a, i(st)), st.result();
  }, u.projection = function(a) {
    return arguments.length ? (i = a == null ? (t = null, De) : (t = a).stream, u) : t;
  }, u.context = function(a) {
    return arguments.length ? (o = a == null ? (n = null, new Jr(e)) : new Zi(n = a), typeof r != "function" && o.pointRadius(r), u) : n;
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
    return n === null && (o = new Jr(e)), u;
  }, u.projection(t).digits(e).context(n);
}
function ir(t) {
  return function(n) {
    var e = new Ue();
    for (var r in t) e[r] = t[r];
    return e.stream = n, e;
  };
}
function Ue() {
}
Ue.prototype = {
  constructor: Ue,
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
function or(t, n, e) {
  var r = t.clipExtent && t.clipExtent();
  return t.scale(150).translate([0, 0]), r != null && t.clipExtent(null), Lt(e, t.stream(Zn)), n(Zn.result()), r != null && t.clipExtent(r), t;
}
function no(t, n, e) {
  return or(t, function(r) {
    var i = n[1][0] - n[0][0], o = n[1][1] - n[0][1], u = Math.min(i / (r[1][0] - r[0][0]), o / (r[1][1] - r[0][1])), a = +n[0][0] + (i - u * (r[1][0] + r[0][0])) / 2, f = +n[0][1] + (o - u * (r[1][1] + r[0][1])) / 2;
    t.scale(150 * u).translate([a, f]);
  }, e);
}
function Yc(t, n, e) {
  return no(t, [[0, 0], n], e);
}
function Vc(t, n, e) {
  return or(t, function(r) {
    var i = +n, o = i / (r[1][0] - r[0][0]), u = (i - o * (r[1][0] + r[0][0])) / 2, a = -o * r[0][1];
    t.scale(150 * o).translate([u, a]);
  }, e);
}
function Uc(t, n, e) {
  return or(t, function(r) {
    var i = +n, o = i / (r[1][1] - r[0][1]), u = -o * r[0][0], a = (i - o * (r[1][1] + r[0][1])) / 2;
    t.scale(150 * o).translate([u, a]);
  }, e);
}
var Qr = 16, Wc = Z(30 * Q);
function jr(t, n) {
  return +n ? Kc(t, n) : Gc(t);
}
function Gc(t) {
  return ir({
    point: function(n, e) {
      n = t(n, e), this.stream.point(n[0], n[1]);
    }
  });
}
function Kc(t, n) {
  function e(r, i, o, u, a, f, c, s, l, h, p, m, _, b) {
    var w = c - r, M = s - i, E = w * w + M * M;
    if (E > 4 * n && _--) {
      var S = u + h, A = a + p, v = f + m, D = It(S * S + A * A + v * v), B = fn(v /= D), I = K(K(v) - 1) < Y || K(o - l) < Y ? (o + l) / 2 : ln(A, S), q = t(I, B), R = q[0], P = q[1], T = R - r, d = P - i, g = M * T - w * d;
      (g * g / E > n || K((w * T + M * d) / E - 0.5) > 0.3 || u * h + a * p + f * m < Wc) && (e(r, i, o, u, a, f, R, P, I, S /= D, A /= D, v, _, b), b.point(R, P), e(R, P, I, S, A, v, c, s, l, h, p, m, _, b));
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
    function w(B, I) {
      B = t(B, I), r.point(B[0], B[1]);
    }
    function M() {
      l = NaN, b.point = E, r.lineStart();
    }
    function E(B, I) {
      var q = Yt([B, I]), R = t(B, I);
      e(l, h, s, p, m, _, l = R[0], h = R[1], s = B, p = q[0], m = q[1], _ = q[2], Qr, r), r.point(l, h);
    }
    function S() {
      b.point = w, r.lineEnd();
    }
    function A() {
      M(), b.point = v, b.lineEnd = D;
    }
    function v(B, I) {
      E(i = B, I), o = l, u = h, a = p, f = m, c = _, b.point = E;
    }
    function D() {
      e(l, h, s, p, m, _, o, u, i, a, f, c, Qr, r), b.lineEnd = S, S();
    }
    return b;
  };
}
var Zc = ir({
  point: function(t, n) {
    this.stream.point(t * Q, n * Q);
  }
});
function Jc(t) {
  return ir({
    point: function(n, e) {
      var r = t(n, e);
      return this.stream.point(r[0], r[1]);
    }
  });
}
function Qc(t, n, e, r, i) {
  function o(u, a) {
    return u *= r, a *= i, [n + t * u, e - t * a];
  }
  return o.invert = function(u, a) {
    return [(u - n) / t * r, (e - a) / t * i];
  }, o;
}
function ti(t, n, e, r, i, o) {
  if (!o) return Qc(t, n, e, r, i);
  var u = Z(o), a = J(o), f = u * t, c = a * t, s = u / t, l = a / t, h = (a * e - u * n) / t, p = (a * n + u * e) / t;
  function m(_, b) {
    return _ *= r, b *= i, [f * _ - c * b + n, e - c * _ - f * b];
  }
  return m.invert = function(_, b) {
    return [r * (s * _ - l * b + h), i * (p - l * _ - s * b)];
  }, m;
}
function jc(t) {
  return tl(function() {
    return t;
  })();
}
function tl(t) {
  var n, e = 150, r = 480, i = 250, o = 0, u = 0, a = 0, f = 0, c = 0, s, l = 0, h = 1, p = 1, m = null, _ = Vr, b = null, w, M, E, S = De, A = 0.5, v, D, B, I, q;
  function R(g) {
    return B(g[0] * Q, g[1] * Q);
  }
  function P(g) {
    return g = B.invert(g[0], g[1]), g && [g[0] * rt, g[1] * rt];
  }
  R.stream = function(g) {
    return I && q === g ? I : I = Zc(Jc(s)(_(v(S(q = g)))));
  }, R.preclip = function(g) {
    return arguments.length ? (_ = g, m = void 0, d()) : _;
  }, R.postclip = function(g) {
    return arguments.length ? (S = g, b = w = M = E = null, d()) : S;
  }, R.clipAngle = function(g) {
    return arguments.length ? (_ = +g ? Ac(m = g * Q) : (m = null, Vr), d()) : m * rt;
  }, R.clipExtent = function(g) {
    return arguments.length ? (S = g == null ? (b = w = M = E = null, De) : Rc(b = +g[0][0], w = +g[0][1], M = +g[1][0], E = +g[1][1]), d()) : b == null ? null : [[b, w], [M, E]];
  }, R.scale = function(g) {
    return arguments.length ? (e = +g, T()) : e;
  }, R.translate = function(g) {
    return arguments.length ? (r = +g[0], i = +g[1], T()) : [r, i];
  }, R.center = function(g) {
    return arguments.length ? (o = g[0] % 360 * Q, u = g[1] % 360 * Q, T()) : [o * rt, u * rt];
  }, R.rotate = function(g) {
    return arguments.length ? (a = g[0] % 360 * Q, f = g[1] % 360 * Q, c = g.length > 2 ? g[2] % 360 * Q : 0, T()) : [a * rt, f * rt, c * rt];
  }, R.angle = function(g) {
    return arguments.length ? (l = g % 360 * Q, T()) : l * rt;
  }, R.reflectX = function(g) {
    return arguments.length ? (h = g ? -1 : 1, T()) : h < 0;
  }, R.reflectY = function(g) {
    return arguments.length ? (p = g ? -1 : 1, T()) : p < 0;
  }, R.precision = function(g) {
    return arguments.length ? (v = jr(D, A = g * g), d()) : It(A);
  }, R.fitExtent = function(g, y) {
    return no(R, g, y);
  }, R.fitSize = function(g, y) {
    return Yc(R, g, y);
  }, R.fitWidth = function(g, y) {
    return Vc(R, g, y);
  }, R.fitHeight = function(g, y) {
    return Uc(R, g, y);
  };
  function T() {
    var g = ti(e, 0, 0, h, p, l).apply(null, n(o, u)), y = ti(e, r - g[0], i - g[1], h, p, l);
    return s = Xi(a, f, c), D = Ie(n, y), B = Ie(s, D), v = jr(D, A), d();
  }
  function d() {
    return I = q = null, R;
  }
  return function() {
    return n = t.apply(this, arguments), R.invert = n.invert && P, T();
  };
}
function ur(t, n) {
  return [t, mc(wc((et + n) / 2))];
}
ur.invert = function(t, n) {
  return [t, 2 * Bi(yc(n)) - et];
};
function nl() {
  return el(ur).scale(961 / ot);
}
function el(t) {
  var n = jc(t), e = n.center, r = n.scale, i = n.translate, o = n.clipExtent, u = null, a, f, c;
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
    var l = H * r(), h = n(xc(n.rotate()).invert([0, 0]));
    return o(u == null ? [[h[0] - l, h[1] - l], [h[0] + l, h[1] + l]] : t === ur ? [[Math.max(h[0] - l, u), a], [Math.min(h[0] + l, f), c]] : [[u, Math.max(h[1] - l, a)], [f, Math.min(h[1] + l, c)]]);
  }
  return s();
}
function rl(t, n, e) {
  return nl().fitSize([n, e], t);
}
function il(t) {
  return Oc(t);
}
const ol = 0.9;
function eo(t, n, e) {
  const [[r, i], [o, u]] = t, a = Math.max(o - r, 1e-6), f = Math.max(u - i, 1e-6);
  return ol / Math.max(a / n, f / e);
}
function ul(t, n, e, r, i) {
  const o = t.bounds(n), [[u, a], [f, c]] = o, s = (u + f) / 2, l = (a + c) / 2, h = Math.min(i, eo(o, e, r));
  return new dt(h, e / 2 - h * s, r / 2 - h * l);
}
function al(t, n, e, r) {
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
  return eo(t.bounds(f), e, r);
}
function sl(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}
function cl(t, n, e, r = 750) {
  const i = wt(t), o = Fi(t), u = performance.now();
  function a(f) {
    const c = Math.min(1, (f - u) / r), s = sl(c), l = new dt(
      o.k + (e.k - o.k) * s,
      o.x + (e.x - o.x) * s,
      o.y + (e.y - o.y) * s
    );
    n.transform(i, l), c < 1 && requestAnimationFrame(a);
  }
  requestAnimationFrame(a);
}
function ll(t, n) {
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
function fl(t) {
  return function() {
    return t;
  };
}
function hl(t) {
  return +t;
}
var ni = [0, 1];
function Xt(t) {
  return t;
}
function We(t, n) {
  return (n -= t = +t) ? function(e) {
    return (e - t) / n;
  } : fl(isNaN(n) ? NaN : 0.5);
}
function dl(t, n) {
  var e;
  return t > n && (e = t, t = n, n = e), function(r) {
    return Math.max(t, Math.min(n, r));
  };
}
function pl(t, n, e) {
  var r = t[0], i = t[1], o = n[0], u = n[1];
  return i < r ? (r = We(i, r), o = e(u, o)) : (r = We(r, i), o = e(o, u)), function(a) {
    return o(r(a));
  };
}
function gl(t, n, e) {
  var r = Math.min(t.length, n.length) - 1, i = new Array(r), o = new Array(r), u = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), n = n.slice().reverse()); ++u < r; )
    i[u] = We(t[u], t[u + 1]), o[u] = e(n[u], n[u + 1]);
  return function(a) {
    var f = cc(t, a, 1, r) - 1;
    return o[f](i[f](a));
  };
}
function yl(t, n) {
  return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function ml() {
  var t = ni, n = ni, e = tr, r, i, o, u = Xt, a, f, c;
  function s() {
    var h = Math.min(t.length, n.length);
    return u !== Xt && (u = dl(t[0], t[h - 1])), a = h > 2 ? gl : pl, f = c = null, l;
  }
  function l(h) {
    return h == null || isNaN(h = +h) ? o : (f || (f = a(t.map(r), n, e)))(r(u(h)));
  }
  return l.invert = function(h) {
    return u(i((c || (c = a(n, t.map(r), ft)))(h)));
  }, l.domain = function(h) {
    return arguments.length ? (t = Array.from(h, hl), s()) : t.slice();
  }, l.range = function(h) {
    return arguments.length ? (n = Array.from(h), s()) : n.slice();
  }, l.rangeRound = function(h) {
    return n = Array.from(h), e = ka, s();
  }, l.clamp = function(h) {
    return arguments.length ? (u = h ? !0 : Xt, s()) : u !== Xt;
  }, l.interpolate = function(h) {
    return arguments.length ? (e = h, s()) : e;
  }, l.unknown = function(h) {
    return arguments.length ? (o = h, l) : o;
  }, function(h, p) {
    return r = h, i = p, s();
  };
}
function vl() {
  return ml()(Xt, Xt);
}
function wl(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function te(t, n) {
  if (!isFinite(t) || t === 0) return null;
  var e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf("e"), r = t.slice(0, e);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(e + 1)
  ];
}
function Ut(t) {
  return t = te(Math.abs(t)), t ? t[1] : NaN;
}
function _l(t, n) {
  return function(e, r) {
    for (var i = e.length, o = [], u = 0, a = t[0], f = 0; i > 0 && a > 0 && (f + a + 1 > r && (a = Math.max(1, r - f)), o.push(e.substring(i -= a, i + a)), !((f += a + 1) > r)); )
      a = t[u = (u + 1) % t.length];
    return o.reverse().join(n);
  };
}
function xl(t) {
  return function(n) {
    return n.replace(/[0-9]/g, function(e) {
      return t[+e];
    });
  };
}
var bl = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function ne(t) {
  if (!(n = bl.exec(t))) throw new Error("invalid format: " + t);
  var n;
  return new ar({
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
ne.prototype = ar.prototype;
function ar(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
ar.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function Sl(t) {
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
var ee;
function Ml(t, n) {
  var e = te(t, n);
  if (!e) return ee = void 0, t.toPrecision(n);
  var r = e[0], i = e[1], o = i - (ee = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, u = r.length;
  return o === u ? r : o > u ? r + new Array(o - u + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + te(t, Math.max(0, n + o - 1))[0];
}
function ei(t, n) {
  var e = te(t, n);
  if (!e) return t + "";
  var r = e[0], i = e[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const ri = {
  "%": (t, n) => (t * 100).toFixed(n),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: wl,
  e: (t, n) => t.toExponential(n),
  f: (t, n) => t.toFixed(n),
  g: (t, n) => t.toPrecision(n),
  o: (t) => Math.round(t).toString(8),
  p: (t, n) => ei(t * 100, n),
  r: ei,
  s: Ml,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function ii(t) {
  return t;
}
var oi = Array.prototype.map, ui = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function kl(t) {
  var n = t.grouping === void 0 || t.thousands === void 0 ? ii : _l(oi.call(t.grouping, Number), t.thousands + ""), e = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", o = t.numerals === void 0 ? ii : xl(oi.call(t.numerals, String)), u = t.percent === void 0 ? "%" : t.percent + "", a = t.minus === void 0 ? "−" : t.minus + "", f = t.nan === void 0 ? "NaN" : t.nan + "";
  function c(l, h) {
    l = ne(l);
    var p = l.fill, m = l.align, _ = l.sign, b = l.symbol, w = l.zero, M = l.width, E = l.comma, S = l.precision, A = l.trim, v = l.type;
    v === "n" ? (E = !0, v = "g") : ri[v] || (S === void 0 && (S = 12), A = !0, v = "g"), (w || p === "0" && m === "=") && (w = !0, p = "0", m = "=");
    var D = (h && h.prefix !== void 0 ? h.prefix : "") + (b === "$" ? e : b === "#" && /[boxX]/.test(v) ? "0" + v.toLowerCase() : ""), B = (b === "$" ? r : /[%p]/.test(v) ? u : "") + (h && h.suffix !== void 0 ? h.suffix : ""), I = ri[v], q = /[defgprs%]/.test(v);
    S = S === void 0 ? 6 : /[gprs]/.test(v) ? Math.max(1, Math.min(21, S)) : Math.max(0, Math.min(20, S));
    function R(P) {
      var T = D, d = B, g, y, x;
      if (v === "c")
        d = I(P) + d, P = "";
      else {
        P = +P;
        var k = P < 0 || 1 / P < 0;
        if (P = isNaN(P) ? f : I(Math.abs(P), S), A && (P = Sl(P)), k && +P == 0 && _ !== "+" && (k = !1), T = (k ? _ === "(" ? _ : a : _ === "-" || _ === "(" ? "" : _) + T, d = (v === "s" && !isNaN(P) && ee !== void 0 ? ui[8 + ee / 3] : "") + d + (k && _ === "(" ? ")" : ""), q) {
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
    var p = Math.max(-8, Math.min(8, Math.floor(Ut(h) / 3))) * 3, m = Math.pow(10, -p), _ = c((l = ne(l), l.type = "f", l), { suffix: ui[8 + p / 3] });
    return function(b) {
      return _(m * b);
    };
  }
  return {
    format: c,
    formatPrefix: s
  };
}
var An, ro, io;
El({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function El(t) {
  return An = kl(t), ro = An.format, io = An.formatPrefix, An;
}
function Nl(t) {
  return Math.max(0, -Ut(Math.abs(t)));
}
function $l(t, n) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Ut(n) / 3))) * 3 - Ut(Math.abs(t)));
}
function Al(t, n) {
  return t = Math.abs(t), n = Math.abs(n) - t, Math.max(0, Ut(n) - Ut(t)) + 1;
}
function zl(t, n, e, r) {
  var i = pc(t, n, e), o;
  switch (r = ne(r ?? ",f"), r.type) {
    case "s": {
      var u = Math.max(Math.abs(t), Math.abs(n));
      return r.precision == null && !isNaN(o = $l(i, u)) && (r.precision = o), io(r, u);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(o = Al(i, Math.max(Math.abs(t), Math.abs(n)))) && (r.precision = o - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(o = Nl(i)) && (r.precision = o - (r.type === "%") * 2);
      break;
    }
  }
  return ro(r);
}
function Rl(t) {
  var n = t.domain;
  return t.ticks = function(e) {
    var r = n();
    return dc(r[0], r[r.length - 1], e ?? 10);
  }, t.tickFormat = function(e, r) {
    var i = n();
    return zl(i[0], i[i.length - 1], e ?? 10, r);
  }, t.nice = function(e) {
    e == null && (e = 10);
    var r = n(), i = 0, o = r.length - 1, u = r[i], a = r[o], f, c, s = 10;
    for (a < u && (c = u, u = a, a = c, c = i, i = o, o = c); s-- > 0; ) {
      if (c = Re(u, a, e), c === f)
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
function oo() {
  var t = vl();
  return t.copy = function() {
    return yl(t, oo());
  }, ll.apply(t, arguments), Rl(t);
}
function uo(t) {
  return "scale" in t;
}
function ao(t) {
  return typeof t == "number" ? t.toLocaleString() : t;
}
function Pl(t) {
  const n = new Map(t.values.map((i) => [i.code, i.value]));
  if (uo(t.colors)) {
    const { scale: i, noData: o } = t.colors, u = t.values.map((l) => l.value).filter((l) => typeof l == "number" && !Number.isNaN(l));
    if (u.length === 0 || i.length === 0)
      return () => o;
    const a = Math.min(...u), f = Math.max(...u);
    if (a === f) {
      const l = i[i.length - 1];
      return (h) => n.has(h) ? l : o;
    }
    const c = i.map((l, h) => a + h / (i.length - 1) * (f - a)), s = oo().domain(c).range(i).clamp(!0);
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
function Cl(t, n) {
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
      formatted: r.format ? r.format(i.value) : ao(i.value)
    };
  }
  return e;
}
var li;
const Tl = typeof process < "u" && ((li = process.env) == null ? void 0 : li.NODE_ENV) !== "production", ai = /* @__PURE__ */ new Set(), si = /* @__PURE__ */ new Set();
function Il(t) {
  var n;
  for (const e of t) {
    const r = (n = e.properties) == null ? void 0 : n.code;
    r && si.add(r);
  }
  return si;
}
function we(t, n, e) {
  if (Tl)
    for (const { code: r } of t.values) {
      if (n.has(r)) continue;
      const i = `${t.id}:${t.level}:${r}`;
      ai.has(i) || (ai.add(i), console.warn(
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
function Fl({
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
function Dl({ dataset: t }) {
  const n = t.format ?? ao;
  if (uo(t.colors)) {
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
function Ll(t, n) {
  var e;
  if (n.category) {
    const r = (e = t.categoryColors) == null ? void 0 : e[n.category];
    if (r) return r;
  }
  return t.color;
}
const Bl = {
  background: "var(--kenya-map-panel-bg, rgba(255,255,255,0.92))",
  border: "1px solid var(--kenya-map-stroke, #71717a)",
  borderRadius: 6,
  padding: 8,
  fontFamily: "sans-serif",
  fontSize: 12
};
function Xl({
  layers: t,
  hiddenLayerIds: n,
  onToggle: e
}) {
  return /* @__PURE__ */ C("div", { style: { ...Bl, display: "flex", flexDirection: "column", gap: 4 }, children: t.map((r) => /* @__PURE__ */ j("label", { style: { display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }, children: [
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
const ql = "https://cdn.jsdelivr.net/gh/DebunkTech/kenya-map@v0.1.0/data", Hl = 12;
function Ol(t) {
  const [n, e] = lt({ width: 0, height: 0 });
  return mt(() => {
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
function vt(t) {
  return t.properties;
}
function Zt(t, n) {
  if (!(!t || !n))
    return t.features.find((e) => vt(e).code === n);
}
function Yl(t, n) {
  const e = vt(t);
  return { code: e.code, name: e.name, level: n, countyCode: e.county_code, constituencyCode: e.constituency_code };
}
function _e({
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
    const c = vt(f), s = n(f);
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
function Vl({ feature: t, path: n }) {
  const e = n(t);
  if (!e) return null;
  const r = vt(t);
  return /* @__PURE__ */ C(
    "path",
    {
      className: "kenya-map-area-selected",
      d: e,
      fill: "var(--kenya-map-selected-fill, var(--kenya-map-focus-color, #2563eb))",
      stroke: "var(--kenya-map-selected-stroke, var(--kenya-map-focus-color, #2563eb))",
      strokeWidth: 2.5,
      pointerEvents: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ C("title", { children: r.name })
    }
  );
}
const Ul = 5;
function Wl({
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
          r: Ul,
          fill: Ll(a, f),
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
function Gl({ point: t }) {
  return /* @__PURE__ */ C("div", { children: t.label });
}
function ci({ x: t, y: n, onClose: e, children: r }) {
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
function Kl({
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
function zn({ children: t }) {
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
function Ql(t) {
  var dr, pr, gr, yr;
  const n = t.boundariesBaseUrl ?? ql, [e, r] = lt({}), i = t.selection !== void 0, o = i ? t.selection : e, u = Dt(t.onSelect);
  u.current = t.onSelect;
  const a = tt(
    (N) => {
      var L;
      i || r(N), (L = u.current) == null || L.call(u, N);
    },
    [i]
  ), f = Dt(null), { width: c, height: s } = Ol(f), [l, h] = de(`${n}/counties.topojson`), [p, m] = de(
    o.county ? `${n}/constituencies.topojson` : null
  ), [_, b] = de(
    o.county ? `${n}/wards/${o.county}.topojson` : null
  ), w = ic(n), M = l.status === "ready" ? l.data.features : [], E = Nt(() => p.status !== "ready" || !o.county ? [] : p.data.features.filter((N) => vt(N).county_code === o.county), [p, o.county]), S = Nt(() => _.status !== "ready" || !o.constituency ? [] : _.data.features.filter((N) => vt(N).constituency_code === o.constituency), [_, o.constituency]), A = o.county ? o.constituency ? "ward" : "constituency" : "county", v = t.datasets, [D, B] = lt(() => {
    var N;
    return (N = v == null ? void 0 : v[0]) == null ? void 0 : N.id;
  }), I = t.activeDatasetId !== void 0, q = I ? t.activeDatasetId : D, R = Dt(t.onDatasetChange);
  R.current = t.onDatasetChange;
  const P = tt(
    (N) => {
      var L;
      I || B(N), (L = R.current) == null || L.call(R, N);
    },
    [I]
  );
  mt(() => {
    !I && D === void 0 && v && v.length > 0 && B(v[0].id);
  }, [I, D, v]);
  const T = v == null ? void 0 : v.find((N) => N.id === q), d = Nt(() => T ? Pl(T) : null, [T]);
  mt(() => {
    if (!v) return;
    const N = new Set(M.map((L) => vt(L).code));
    for (const L of v)
      L.level === "county" && we(L, N, "exact");
  }, [v, M]), mt(() => {
    if (!v || p.status !== "ready") return;
    const N = new Set(p.data.features.map((L) => vt(L).code));
    for (const L of v)
      L.level === "constituency" && we(L, N, "exact");
  }, [v, p]), mt(() => {
    if (!v || _.status !== "ready") return;
    const N = Il(_.data.features);
    for (const L of v)
      L.level === "ward" && we(L, N, "wards load per-county, so this may just not be visited yet");
  }, [v, _]);
  const g = Nt(() => l.status !== "ready" || c === 0 || s === 0 ? null : rl(l.data, c, s), [l, c, s]), y = Nt(() => g ? il(g) : null, [g]), x = Nt(() => !y || c === 0 || s === 0 || w.status !== "ready" ? Hl : Math.max(1, al(y, w.data.maxZoomWard.bbox, c, s)), [y, c, s, w]), k = Dt(null), $ = Dt(null), z = Dt(null), [F, O] = lt(cn);
  mt(() => {
    const N = k.current;
    if (!N || c === 0 || s === 0) return;
    const L = Js().scaleExtent([1, x]).on("zoom", (G) => O(G.transform));
    return $.current = L, wt(N).call(L), () => {
      wt(N).on(".zoom", null);
    };
  }, [c, s, x]);
  const U = tt(
    (N) => {
      const L = k.current, G = $.current;
      if (!L || !G || !y) return;
      const Ft = N ? ul(y, N, c, s, x) : cn;
      cl(L, G, Ft);
    },
    [y, c, s, x]
  );
  mt(() => {
    const N = o.ward ? Zt(_.status === "ready" ? _.data : void 0, o.ward) : o.constituency ? Zt(p.status === "ready" ? p.data : void 0, o.constituency) : o.county ? Zt(l.status === "ready" ? l.data : void 0, o.county) : void 0;
    U(N);
  }, [o.county, o.constituency, o.ward, l, p, _, U]);
  const V = !!t.renderPopup || !!(v && v.length > 0), [X, ut] = lt(null), W = tt(() => ut(null), []), at = Nt(() => X ? (X.area.level === "county" ? M : X.area.level === "constituency" ? E : S).find((L) => vt(L).code === X.area.code) : void 0, [X, M, E, S]), gt = t.pointLayers, [yt, sr] = lt(null), Wt = tt(() => sr(null), []), [cr, so] = lt(() => /* @__PURE__ */ new Set()), co = tt((N) => {
    so((L) => {
      const G = new Set(L);
      return G.has(N) ? G.delete(N) : G.add(N), G;
    });
  }, []), lo = tt(
    (N, L) => {
      if (!g) return;
      const G = g([N.lng, N.lat]);
      G && sr({ point: N, layer: L, x: G[0], y: G[1] });
    },
    [g]
  );
  mt(() => {
    if (!X && !yt) return;
    function N(L) {
      f.current && !f.current.contains(L.target) && (W(), Wt());
    }
    return document.addEventListener("click", N), () => document.removeEventListener("click", N);
  }, [X, yt, W, Wt]);
  const ue = tt(
    (N, L) => {
      const G = vt(N), Ft = L === "county" ? { county: G.code } : L === "constituency" ? { county: G.county_code, constituency: G.code } : { county: G.county_code, constituency: G.constituency_code, ward: G.code };
      if (a(Ft), V && y) {
        const [_n, vo] = y.centroid(N);
        ut({ area: Yl(N, L), cx: _n, cy: vo });
      }
    },
    [a, V, y]
  ), ae = tt(() => {
    !o.county || !o.constituency || (a({ county: o.county, constituency: o.constituency }), W());
  }, [a, W, o.county, o.constituency]), se = tt(() => {
    o.county && (a({ county: o.county }), W());
  }, [a, W, o.county]), yn = tt(() => {
    a({}), W();
  }, [a, W]), lr = tt(() => {
    o.ward ? ae() : o.constituency ? se() : o.county && yn();
  }, [o.ward, o.constituency, o.county, ae, se, yn]), [mn, fr] = lt(null), vn = tt((N, L, G) => {
    const Ft = f.current;
    if (!Ft) return;
    const _n = Ft.getBoundingClientRect();
    fr({ name: N, x: L - _n.left, y: G - _n.top });
  }, []), wn = tt(() => fr(null), []), fo = (pr = (dr = Zt(l.status === "ready" ? l.data : void 0, o.county)) == null ? void 0 : dr.properties) == null ? void 0 : pr.name, ho = (yr = (gr = Zt(
    p.status === "ready" ? p.data : void 0,
    o.constituency
  )) == null ? void 0 : gr.properties) == null ? void 0 : yr.name, hr = Nt(
    () => X ? Cl(X.area, v ?? []) : {},
    [X, v]
  ), [po, go] = X ? F.apply([X.cx, X.cy]) : [0, 0], [yo, mo] = yt ? F.apply([yt.x, yt.y]) : [0, 0];
  return /* @__PURE__ */ j(
    "div",
    {
      ref: f,
      className: t.className,
      style: { position: "relative", width: "100%", height: "100%", minHeight: 300, ...t.style },
      onKeyDown: (N) => {
        N.key === "Escape" && (N.preventDefault(), yt ? Wt() : X ? W() : lr());
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
                /* @__PURE__ */ C("button", { type: "button", onClick: yn, style: xe(!o.county), children: "Kenya" }),
                o.county && /* @__PURE__ */ j(mr, { children: [
                  /* @__PURE__ */ C("span", { "aria-hidden": "true", children: "›" }),
                  /* @__PURE__ */ C(
                    "button",
                    {
                      type: "button",
                      onClick: se,
                      style: xe(!o.constituency),
                      children: fo ?? o.county
                    }
                  )
                ] }),
                o.constituency && /* @__PURE__ */ j(mr, { children: [
                  /* @__PURE__ */ C("span", { "aria-hidden": "true", children: "›" }),
                  /* @__PURE__ */ C(
                    "button",
                    {
                      type: "button",
                      onClick: ae,
                      style: xe(!o.ward),
                      children: ho ?? o.constituency
                    }
                  )
                ] })
              ] }),
              (o.county || o.constituency) && /* @__PURE__ */ C("button", { type: "button", onClick: yn, style: Rn, children: "Reset" })
            ]
          }
        ),
        t.showDatasetSwitcher && v && v.length > 0 && /* @__PURE__ */ C("div", { style: { position: "absolute", top: 8, right: 8, zIndex: 1 }, children: /* @__PURE__ */ C(
          Fl,
          {
            datasets: v,
            activeDatasetId: q,
            currentLevel: A,
            onChange: P
          }
        ) }),
        t.showLegend && T && /* @__PURE__ */ C("div", { style: { position: "absolute", bottom: 8, right: 8, zIndex: 1 }, children: /* @__PURE__ */ C(Dl, { dataset: T }) }),
        t.showLayerToggles && gt && gt.length > 0 && /* @__PURE__ */ C("div", { style: { position: "absolute", bottom: 8, left: 8, zIndex: 1 }, children: /* @__PURE__ */ C(Xl, { layers: gt, hiddenLayerIds: cr, onToggle: co }) }),
        l.status === "loading" && /* @__PURE__ */ C(zn, { children: "Loading map…" }),
        l.status === "error" && /* @__PURE__ */ j(zn, { children: [
          "Failed to load county boundaries: ",
          l.error.message,
          /* @__PURE__ */ C("br", {}),
          /* @__PURE__ */ C("button", { type: "button", onClick: h, style: Rn, children: "Retry" })
        ] }),
        o.county && p.status === "error" && /* @__PURE__ */ j(zn, { children: [
          "Failed to load constituency boundaries: ",
          p.error.message,
          /* @__PURE__ */ C("br", {}),
          /* @__PURE__ */ C("button", { type: "button", onClick: m, style: Rn, children: "Retry" })
        ] }),
        o.constituency && _.status === "error" && /* @__PURE__ */ j(zn, { children: [
          "Failed to load ward boundaries: ",
          _.error.message,
          /* @__PURE__ */ C("br", {}),
          /* @__PURE__ */ C("button", { type: "button", onClick: b, style: Rn, children: "Retry" })
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
                    const L = z.current;
                    (L ? Math.hypot(N.clientX - L.x, N.clientY - L.y) : 0) < 4 && (W(), Wt(), lr());
                  }
                }
              ),
              /* @__PURE__ */ j("g", { transform: `translate(${F.x},${F.y}) scale(${F.k})`, children: [
                /* @__PURE__ */ C(
                  _e,
                  {
                    features: M,
                    path: y,
                    opacity: o.county ? 0.25 : 1,
                    focusable: !o.county,
                    getFill: (T == null ? void 0 : T.level) === "county" && d ? d : void 0,
                    onHover: vn,
                    onLeave: wn,
                    onActivate: (N) => ue(N, "county")
                  }
                ),
                o.county && /* @__PURE__ */ C(
                  _e,
                  {
                    features: E,
                    path: y,
                    opacity: o.constituency ? 0.25 : 1,
                    focusable: !o.constituency,
                    getFill: (T == null ? void 0 : T.level) === "constituency" && d ? d : void 0,
                    onHover: vn,
                    onLeave: wn,
                    onActivate: (N) => ue(N, "constituency")
                  }
                ),
                o.constituency && /* @__PURE__ */ C(
                  _e,
                  {
                    features: S,
                    path: y,
                    opacity: 1,
                    focusable: !0,
                    getFill: (T == null ? void 0 : T.level) === "ward" && d ? d : void 0,
                    onHover: vn,
                    onLeave: wn,
                    onActivate: (N) => ue(N, "ward")
                  }
                ),
                at && /* @__PURE__ */ C(Vl, { feature: at, path: y })
              ] }),
              gt && gt.length > 0 && g && /* @__PURE__ */ C(
                Wl,
                {
                  layers: gt,
                  hiddenLayerIds: cr,
                  projection: g,
                  transform: F,
                  onHover: vn,
                  onLeave: wn,
                  onActivate: lo
                }
              )
            ]
          }
        ),
        mn && /* @__PURE__ */ C(
          "div",
          {
            style: {
              position: "absolute",
              left: mn.x + 12,
              top: mn.y + 12,
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
            children: mn.name
          }
        ),
        X && /* @__PURE__ */ C(ci, { x: po, y: go, onClose: W, children: t.renderPopup ? t.renderPopup(X.area, hr) : /* @__PURE__ */ C(Kl, { area: X.area, values: hr, datasets: v ?? [] }) }),
        yt && /* @__PURE__ */ C(ci, { x: yo, y: mo, onClose: Wt, children: t.renderPointPopup ? t.renderPointPopup(yt.point, yt.layer) : /* @__PURE__ */ C(Gl, { point: yt.point }) })
      ]
    }
  );
}
function xe(t) {
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
const Rn = {
  font: "inherit",
  fontSize: 12,
  padding: "2px 8px",
  borderRadius: 4,
  border: "1px solid var(--kenya-map-stroke, #71717a)",
  background: "var(--kenya-map-panel-bg, #fff)",
  cursor: "pointer"
};
export {
  Ql as KenyaMap
};
//# sourceMappingURL=kenya-map.js.map
