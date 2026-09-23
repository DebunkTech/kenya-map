import { jsxs as ft, jsx as Y, Fragment as Fe } from "react/jsx-runtime";
import { useState as bt, useEffect as Xn, useCallback as ht, useRef as Lt, useMemo as Xt } from "react";
var ne = "http://www.w3.org/1999/xhtml";
const De = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ne,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Bn(t) {
  var n = t += "", e = n.indexOf(":");
  return e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)), De.hasOwnProperty(n) ? { space: De[n], local: t } : t;
}
function hi(t) {
  return function() {
    var n = this.ownerDocument, e = this.namespaceURI;
    return e === ne && n.documentElement.namespaceURI === ne ? n.createElement(t) : n.createElementNS(e, t);
  };
}
function pi(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function xr(t) {
  var n = Bn(t);
  return (n.local ? pi : hi)(n);
}
function di() {
}
function Me(t) {
  return t == null ? di : function() {
    return this.querySelector(t);
  };
}
function gi(t) {
  typeof t != "function" && (t = Me(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], u = o.length, a = r[i] = new Array(u), f, l, s = 0; s < u; ++s)
      (f = o[s]) && (l = t.call(f, f.__data__, s, o)) && ("__data__" in f && (l.__data__ = f.__data__), a[s] = l);
  return new et(r, this._parents);
}
function yi(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function vi() {
  return [];
}
function Sr(t) {
  return t == null ? vi : function() {
    return this.querySelectorAll(t);
  };
}
function mi(t) {
  return function() {
    return yi(t.apply(this, arguments));
  };
}
function _i(t) {
  typeof t == "function" ? t = mi(t) : t = Sr(t);
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var u = n[o], a = u.length, f, l = 0; l < a; ++l)
      (f = u[l]) && (r.push(t.call(f, f.__data__, l, u)), i.push(f));
  return new et(r, i);
}
function Er(t) {
  return function() {
    return this.matches(t);
  };
}
function br(t) {
  return function(n) {
    return n.matches(t);
  };
}
var wi = Array.prototype.find;
function xi(t) {
  return function() {
    return wi.call(this.children, t);
  };
}
function Si() {
  return this.firstElementChild;
}
function Ei(t) {
  return this.select(t == null ? Si : xi(typeof t == "function" ? t : br(t)));
}
var bi = Array.prototype.filter;
function Mi() {
  return Array.from(this.children);
}
function $i(t) {
  return function() {
    return bi.call(this.children, t);
  };
}
function Ni(t) {
  return this.selectAll(t == null ? Mi : $i(typeof t == "function" ? t : br(t)));
}
function ki(t) {
  typeof t != "function" && (t = Er(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], u = o.length, a = r[i] = [], f, l = 0; l < u; ++l)
      (f = o[l]) && t.call(f, f.__data__, l, o) && a.push(f);
  return new et(r, this._parents);
}
function Mr(t) {
  return new Array(t.length);
}
function Ai() {
  return new et(this._enter || this._groups.map(Mr), this._parents);
}
function Mn(t, n) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n;
}
Mn.prototype = {
  constructor: Mn,
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
function Ri(t) {
  return function() {
    return t;
  };
}
function zi(t, n, e, r, i, o) {
  for (var u = 0, a, f = n.length, l = o.length; u < l; ++u)
    (a = n[u]) ? (a.__data__ = o[u], r[u] = a) : e[u] = new Mn(t, o[u]);
  for (; u < f; ++u)
    (a = n[u]) && (i[u] = a);
}
function Ti(t, n, e, r, i, o, u) {
  var a, f, l = /* @__PURE__ */ new Map(), s = n.length, c = o.length, h = new Array(s), d;
  for (a = 0; a < s; ++a)
    (f = n[a]) && (h[a] = d = u.call(f, f.__data__, a, n) + "", l.has(d) ? i[a] = f : l.set(d, f));
  for (a = 0; a < c; ++a)
    d = u.call(t, o[a], a, o) + "", (f = l.get(d)) ? (r[a] = f, f.__data__ = o[a], l.delete(d)) : e[a] = new Mn(t, o[a]);
  for (a = 0; a < s; ++a)
    (f = n[a]) && l.get(h[a]) === f && (i[a] = f);
}
function Ci(t) {
  return t.__data__;
}
function Pi(t, n) {
  if (!arguments.length) return Array.from(this, Ci);
  var e = n ? Ti : zi, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Ri(t));
  for (var o = i.length, u = new Array(o), a = new Array(o), f = new Array(o), l = 0; l < o; ++l) {
    var s = r[l], c = i[l], h = c.length, d = Ii(t.call(s, s && s.__data__, l, r)), v = d.length, x = a[l] = new Array(v), w = u[l] = new Array(v), m = f[l] = new Array(h);
    e(s, c, x, w, m, d, n);
    for (var E = 0, $ = 0, S, N; E < v; ++E)
      if (S = x[E]) {
        for (E >= $ && ($ = E + 1); !(N = w[$]) && ++$ < v; ) ;
        S._next = N || null;
      }
  }
  return u = new et(u, r), u._enter = a, u._exit = f, u;
}
function Ii(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Fi() {
  return new et(this._exit || this._groups.map(Mr), this._parents);
}
function Di(t, n, e) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), n != null && (i = n(i), i && (i = i.selection())), e == null ? o.remove() : e(o), r && i ? r.merge(i).order() : i;
}
function Li(t) {
  for (var n = t.selection ? t.selection() : t, e = this._groups, r = n._groups, i = e.length, o = r.length, u = Math.min(i, o), a = new Array(i), f = 0; f < u; ++f)
    for (var l = e[f], s = r[f], c = l.length, h = a[f] = new Array(c), d, v = 0; v < c; ++v)
      (d = l[v] || s[v]) && (h[v] = d);
  for (; f < i; ++f)
    a[f] = e[f];
  return new et(a, this._parents);
}
function Xi() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], u; --i >= 0; )
      (u = r[i]) && (o && u.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(u, o), o = u);
  return this;
}
function Bi(t) {
  t || (t = qi);
  function n(c, h) {
    return c && h ? t(c.__data__, h.__data__) : !c - !h;
  }
  for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var u = e[o], a = u.length, f = i[o] = new Array(a), l, s = 0; s < a; ++s)
      (l = u[s]) && (f[s] = l);
    f.sort(n);
  }
  return new et(i, this._parents).order();
}
function qi(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Hi() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Oi() {
  return Array.from(this);
}
function Yi() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var u = r[i];
      if (u) return u;
    }
  return null;
}
function Vi() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function Gi() {
  return !this.node();
}
function Ui(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, u = i.length, a; o < u; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function Ki(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Zi(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Wi(t, n) {
  return function() {
    this.setAttribute(t, n);
  };
}
function Ji(t, n) {
  return function() {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function Qi(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function ji(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e);
  };
}
function to(t, n) {
  var e = Bn(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each((n == null ? e.local ? Zi : Ki : typeof n == "function" ? e.local ? ji : Qi : e.local ? Ji : Wi)(e, n));
}
function $r(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function no(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function eo(t, n, e) {
  return function() {
    this.style.setProperty(t, n, e);
  };
}
function ro(t, n, e) {
  return function() {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function io(t, n, e) {
  return arguments.length > 1 ? this.each((n == null ? no : typeof n == "function" ? ro : eo)(t, n, e ?? "")) : Pt(this.node(), t);
}
function Pt(t, n) {
  return t.style.getPropertyValue(n) || $r(t).getComputedStyle(t, null).getPropertyValue(n);
}
function oo(t) {
  return function() {
    delete this[t];
  };
}
function uo(t, n) {
  return function() {
    this[t] = n;
  };
}
function ao(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : this[t] = e;
  };
}
function so(t, n) {
  return arguments.length > 1 ? this.each((n == null ? oo : typeof n == "function" ? ao : uo)(t, n)) : this.node()[t];
}
function Nr(t) {
  return t.trim().split(/^|\s+/);
}
function $e(t) {
  return t.classList || new kr(t);
}
function kr(t) {
  this._node = t, this._names = Nr(t.getAttribute("class") || "");
}
kr.prototype = {
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
function Ar(t, n) {
  for (var e = $e(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function Rr(t, n) {
  for (var e = $e(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function co(t) {
  return function() {
    Ar(this, t);
  };
}
function lo(t) {
  return function() {
    Rr(this, t);
  };
}
function fo(t, n) {
  return function() {
    (n.apply(this, arguments) ? Ar : Rr)(this, t);
  };
}
function ho(t, n) {
  var e = Nr(t + "");
  if (arguments.length < 2) {
    for (var r = $e(this.node()), i = -1, o = e.length; ++i < o; ) if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? fo : n ? co : lo)(e, n));
}
function po() {
  this.textContent = "";
}
function go(t) {
  return function() {
    this.textContent = t;
  };
}
function yo(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function vo(t) {
  return arguments.length ? this.each(t == null ? po : (typeof t == "function" ? yo : go)(t)) : this.node().textContent;
}
function mo() {
  this.innerHTML = "";
}
function _o(t) {
  return function() {
    this.innerHTML = t;
  };
}
function wo(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function xo(t) {
  return arguments.length ? this.each(t == null ? mo : (typeof t == "function" ? wo : _o)(t)) : this.node().innerHTML;
}
function So() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Eo() {
  return this.each(So);
}
function bo() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Mo() {
  return this.each(bo);
}
function $o(t) {
  var n = typeof t == "function" ? t : xr(t);
  return this.select(function() {
    return this.appendChild(n.apply(this, arguments));
  });
}
function No() {
  return null;
}
function ko(t, n) {
  var e = typeof t == "function" ? t : xr(t), r = n == null ? No : typeof n == "function" ? n : Me(n);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Ao() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Ro() {
  return this.each(Ao);
}
function zo() {
  var t = this.cloneNode(!1), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function To() {
  var t = this.cloneNode(!0), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Co(t) {
  return this.select(t ? To : zo);
}
function Po(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Io(t) {
  return function(n) {
    t.call(this, n, this.__data__);
  };
}
function Fo(t) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var e = "", r = n.indexOf(".");
    return r >= 0 && (e = n.slice(r + 1), n = n.slice(0, r)), { type: n, name: e };
  });
}
function Do(t) {
  return function() {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
        o = n[e], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : n[++r] = o;
      ++r ? n.length = r : delete this.__on;
    }
  };
}
function Lo(t, n, e) {
  return function() {
    var r = this.__on, i, o = Io(n);
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
function Xo(t, n, e) {
  var r = Fo(t + ""), i, o = r.length, u;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var f = 0, l = a.length, s; f < l; ++f)
        for (i = 0, s = a[f]; i < o; ++i)
          if ((u = r[i]).type === s.type && u.name === s.name)
            return s.value;
    }
    return;
  }
  for (a = n ? Lo : Do, i = 0; i < o; ++i) this.each(a(r[i], n, e));
  return this;
}
function zr(t, n, e) {
  var r = $r(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i);
}
function Bo(t, n) {
  return function() {
    return zr(this, t, n);
  };
}
function qo(t, n) {
  return function() {
    return zr(this, t, n.apply(this, arguments));
  };
}
function Ho(t, n) {
  return this.each((typeof n == "function" ? qo : Bo)(t, n));
}
function* Oo() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, u; i < o; ++i)
      (u = r[i]) && (yield u);
}
var Tr = [null];
function et(t, n) {
  this._groups = t, this._parents = n;
}
function an() {
  return new et([[document.documentElement]], Tr);
}
function Yo() {
  return this;
}
et.prototype = an.prototype = {
  constructor: et,
  select: gi,
  selectAll: _i,
  selectChild: Ei,
  selectChildren: Ni,
  filter: ki,
  data: Pi,
  enter: Ai,
  exit: Fi,
  join: Di,
  merge: Li,
  selection: Yo,
  order: Xi,
  sort: Bi,
  call: Hi,
  nodes: Oi,
  node: Yi,
  size: Vi,
  empty: Gi,
  each: Ui,
  attr: to,
  style: io,
  property: so,
  classed: ho,
  text: vo,
  html: xo,
  raise: Eo,
  lower: Mo,
  append: $o,
  insert: ko,
  remove: Ro,
  clone: Co,
  datum: Po,
  on: Xo,
  dispatch: Ho,
  [Symbol.iterator]: Oo
};
function pt(t) {
  return typeof t == "string" ? new et([[document.querySelector(t)]], [document.documentElement]) : new et([[t]], Tr);
}
function Vo(t) {
  let n;
  for (; n = t.sourceEvent; ) t = n;
  return t;
}
function St(t, n) {
  if (t = Vo(t), n === void 0 && (n = t.currentTarget), n) {
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
var Go = { value: () => {
} };
function Ne() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new wn(e);
}
function wn(t) {
  this._ = t;
}
function Uo(t, n) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var r = "", i = e.indexOf(".");
    if (i >= 0 && (r = e.slice(i + 1), e = e.slice(0, i)), e && !n.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    return { type: e, name: r };
  });
}
wn.prototype = Ne.prototype = {
  constructor: wn,
  on: function(t, n) {
    var e = this._, r = Uo(t + "", e), i, o = -1, u = r.length;
    if (arguments.length < 2) {
      for (; ++o < u; ) if ((i = (t = r[o]).type) && (i = Ko(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function") throw new Error("invalid callback: " + n);
    for (; ++o < u; )
      if (i = (t = r[o]).type) e[i] = Le(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = Le(e[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new wn(t);
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
function Ko(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n)
      return i.value;
}
function Le(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      t[r] = Go, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
const ee = { capture: !0, passive: !1 };
function re(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Zo(t) {
  var n = t.document.documentElement, e = pt(t).on("dragstart.drag", re, ee);
  "onselectstart" in n ? e.on("selectstart.drag", re, ee) : (n.__noselect = n.style.MozUserSelect, n.style.MozUserSelect = "none");
}
function Wo(t, n) {
  var e = t.document.documentElement, r = pt(t).on("dragstart.drag", null);
  n && (r.on("click.drag", re, ee), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in e ? r.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect);
}
function ke(t, n, e) {
  t.prototype = n.prototype = e, e.constructor = t;
}
function Cr(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function sn() {
}
var Jt = 0.7, $n = 1 / Jt, Ct = "\\s*([+-]?\\d+)\\s*", Qt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", yt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Jo = /^#([0-9a-f]{3,8})$/, Qo = new RegExp(`^rgb\\(${Ct},${Ct},${Ct}\\)$`), jo = new RegExp(`^rgb\\(${yt},${yt},${yt}\\)$`), tu = new RegExp(`^rgba\\(${Ct},${Ct},${Ct},${Qt}\\)$`), nu = new RegExp(`^rgba\\(${yt},${yt},${yt},${Qt}\\)$`), eu = new RegExp(`^hsl\\(${Qt},${yt},${yt}\\)$`), ru = new RegExp(`^hsla\\(${Qt},${yt},${yt},${Qt}\\)$`), Xe = {
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
ke(sn, jt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Be,
  // Deprecated! Use color.formatHex.
  formatHex: Be,
  formatHex8: iu,
  formatHsl: ou,
  formatRgb: qe,
  toString: qe
});
function Be() {
  return this.rgb().formatHex();
}
function iu() {
  return this.rgb().formatHex8();
}
function ou() {
  return Pr(this).formatHsl();
}
function qe() {
  return this.rgb().formatRgb();
}
function jt(t) {
  var n, e;
  return t = (t + "").trim().toLowerCase(), (n = Jo.exec(t)) ? (e = n[1].length, n = parseInt(n[1], 16), e === 6 ? He(n) : e === 3 ? new j(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, (n & 15) << 4 | n & 15, 1) : e === 8 ? cn(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (n & 255) / 255) : e === 4 ? cn(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, ((n & 15) << 4 | n & 15) / 255) : null) : (n = Qo.exec(t)) ? new j(n[1], n[2], n[3], 1) : (n = jo.exec(t)) ? new j(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, 1) : (n = tu.exec(t)) ? cn(n[1], n[2], n[3], n[4]) : (n = nu.exec(t)) ? cn(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, n[4]) : (n = eu.exec(t)) ? Ve(n[1], n[2] / 100, n[3] / 100, 1) : (n = ru.exec(t)) ? Ve(n[1], n[2] / 100, n[3] / 100, n[4]) : Xe.hasOwnProperty(t) ? He(Xe[t]) : t === "transparent" ? new j(NaN, NaN, NaN, 0) : null;
}
function He(t) {
  return new j(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function cn(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new j(t, n, e, r);
}
function uu(t) {
  return t instanceof sn || (t = jt(t)), t ? (t = t.rgb(), new j(t.r, t.g, t.b, t.opacity)) : new j();
}
function ie(t, n, e, r) {
  return arguments.length === 1 ? uu(t) : new j(t, n, e, r ?? 1);
}
function j(t, n, e, r) {
  this.r = +t, this.g = +n, this.b = +e, this.opacity = +r;
}
ke(j, ie, Cr(sn, {
  brighter(t) {
    return t = t == null ? $n : Math.pow($n, t), new j(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Jt : Math.pow(Jt, t), new j(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new j(Mt(this.r), Mt(this.g), Mt(this.b), Nn(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Oe,
  // Deprecated! Use color.formatHex.
  formatHex: Oe,
  formatHex8: au,
  formatRgb: Ye,
  toString: Ye
}));
function Oe() {
  return `#${Et(this.r)}${Et(this.g)}${Et(this.b)}`;
}
function au() {
  return `#${Et(this.r)}${Et(this.g)}${Et(this.b)}${Et((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ye() {
  const t = Nn(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Mt(this.r)}, ${Mt(this.g)}, ${Mt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Nn(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Mt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Et(t) {
  return t = Mt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Ve(t, n, e, r) {
  return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new st(t, n, e, r);
}
function Pr(t) {
  if (t instanceof st) return new st(t.h, t.s, t.l, t.opacity);
  if (t instanceof sn || (t = jt(t)), !t) return new st();
  if (t instanceof st) return t;
  t = t.rgb();
  var n = t.r / 255, e = t.g / 255, r = t.b / 255, i = Math.min(n, e, r), o = Math.max(n, e, r), u = NaN, a = o - i, f = (o + i) / 2;
  return a ? (n === o ? u = (e - r) / a + (e < r) * 6 : e === o ? u = (r - n) / a + 2 : u = (n - e) / a + 4, a /= f < 0.5 ? o + i : 2 - o - i, u *= 60) : a = f > 0 && f < 1 ? 0 : u, new st(u, a, f, t.opacity);
}
function su(t, n, e, r) {
  return arguments.length === 1 ? Pr(t) : new st(t, n, e, r ?? 1);
}
function st(t, n, e, r) {
  this.h = +t, this.s = +n, this.l = +e, this.opacity = +r;
}
ke(st, su, Cr(sn, {
  brighter(t) {
    return t = t == null ? $n : Math.pow($n, t), new st(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Jt : Math.pow(Jt, t), new st(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, n = isNaN(t) || isNaN(this.s) ? 0 : this.s, e = this.l, r = e + (e < 0.5 ? e : 1 - e) * n, i = 2 * e - r;
    return new j(
      On(t >= 240 ? t - 240 : t + 120, i, r),
      On(t, i, r),
      On(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new st(Ge(this.h), ln(this.s), ln(this.l), Nn(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Nn(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Ge(this.h)}, ${ln(this.s) * 100}%, ${ln(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Ge(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function ln(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function On(t, n, e) {
  return (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n) * 255;
}
const Ir = (t) => () => t;
function cu(t, n) {
  return function(e) {
    return t + e * n;
  };
}
function lu(t, n, e) {
  return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e, function(r) {
    return Math.pow(t + r * n, e);
  };
}
function fu(t) {
  return (t = +t) == 1 ? Fr : function(n, e) {
    return e - n ? lu(n, e, t) : Ir(isNaN(n) ? e : n);
  };
}
function Fr(t, n) {
  var e = n - t;
  return e ? cu(t, e) : Ir(isNaN(t) ? n : t);
}
const Ue = (function t(n) {
  var e = fu(n);
  function r(i, o) {
    var u = e((i = ie(i)).r, (o = ie(o)).r), a = e(i.g, o.g), f = e(i.b, o.b), l = Fr(i.opacity, o.opacity);
    return function(s) {
      return i.r = u(s), i.g = a(s), i.b = f(s), i.opacity = l(s), i + "";
    };
  }
  return r.gamma = t, r;
})(1);
function xt(t, n) {
  return t = +t, n = +n, function(e) {
    return t * (1 - e) + n * e;
  };
}
var oe = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Yn = new RegExp(oe.source, "g");
function hu(t) {
  return function() {
    return t;
  };
}
function pu(t) {
  return function(n) {
    return t(n) + "";
  };
}
function du(t, n) {
  var e = oe.lastIndex = Yn.lastIndex = 0, r, i, o, u = -1, a = [], f = [];
  for (t = t + "", n = n + ""; (r = oe.exec(t)) && (i = Yn.exec(n)); )
    (o = i.index) > e && (o = n.slice(e, o), a[u] ? a[u] += o : a[++u] = o), (r = r[0]) === (i = i[0]) ? a[u] ? a[u] += i : a[++u] = i : (a[++u] = null, f.push({ i: u, x: xt(r, i) })), e = Yn.lastIndex;
  return e < n.length && (o = n.slice(e), a[u] ? a[u] += o : a[++u] = o), a.length < 2 ? f[0] ? pu(f[0].x) : hu(n) : (n = f.length, function(l) {
    for (var s = 0, c; s < n; ++s) a[(c = f[s]).i] = c.x(l);
    return a.join("");
  });
}
var Ke = 180 / Math.PI, ue = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Dr(t, n, e, r, i, o) {
  var u, a, f;
  return (u = Math.sqrt(t * t + n * n)) && (t /= u, n /= u), (f = t * e + n * r) && (e -= t * f, r -= n * f), (a = Math.sqrt(e * e + r * r)) && (e /= a, r /= a, f /= a), t * r < n * e && (t = -t, n = -n, f = -f, u = -u), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(n, t) * Ke,
    skewX: Math.atan(f) * Ke,
    scaleX: u,
    scaleY: a
  };
}
var fn;
function gu(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return n.isIdentity ? ue : Dr(n.a, n.b, n.c, n.d, n.e, n.f);
}
function yu(t) {
  return t == null || (fn || (fn = document.createElementNS("http://www.w3.org/2000/svg", "g")), fn.setAttribute("transform", t), !(t = fn.transform.baseVal.consolidate())) ? ue : (t = t.matrix, Dr(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Lr(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, s, c, h, d, v) {
    if (l !== c || s !== h) {
      var x = d.push("translate(", null, n, null, e);
      v.push({ i: x - 4, x: xt(l, c) }, { i: x - 2, x: xt(s, h) });
    } else (c || h) && d.push("translate(" + c + n + h + e);
  }
  function u(l, s, c, h) {
    l !== s ? (l - s > 180 ? s += 360 : s - l > 180 && (l += 360), h.push({ i: c.push(i(c) + "rotate(", null, r) - 2, x: xt(l, s) })) : s && c.push(i(c) + "rotate(" + s + r);
  }
  function a(l, s, c, h) {
    l !== s ? h.push({ i: c.push(i(c) + "skewX(", null, r) - 2, x: xt(l, s) }) : s && c.push(i(c) + "skewX(" + s + r);
  }
  function f(l, s, c, h, d, v) {
    if (l !== c || s !== h) {
      var x = d.push(i(d) + "scale(", null, ",", null, ")");
      v.push({ i: x - 4, x: xt(l, c) }, { i: x - 2, x: xt(s, h) });
    } else (c !== 1 || h !== 1) && d.push(i(d) + "scale(" + c + "," + h + ")");
  }
  return function(l, s) {
    var c = [], h = [];
    return l = t(l), s = t(s), o(l.translateX, l.translateY, s.translateX, s.translateY, c, h), u(l.rotate, s.rotate, c, h), a(l.skewX, s.skewX, c, h), f(l.scaleX, l.scaleY, s.scaleX, s.scaleY, c, h), l = s = null, function(d) {
      for (var v = -1, x = h.length, w; ++v < x; ) c[(w = h[v]).i] = w.x(d);
      return c.join("");
    };
  };
}
var vu = Lr(gu, "px, ", "px)", "deg)"), mu = Lr(yu, ", ", ")", ")"), _u = 1e-12;
function Ze(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function wu(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function xu(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Su = (function t(n, e, r) {
  function i(o, u) {
    var a = o[0], f = o[1], l = o[2], s = u[0], c = u[1], h = u[2], d = s - a, v = c - f, x = d * d + v * v, w, m;
    if (x < _u)
      m = Math.log(h / l) / n, w = function(z) {
        return [
          a + z * d,
          f + z * v,
          l * Math.exp(n * z * m)
        ];
      };
    else {
      var E = Math.sqrt(x), $ = (h * h - l * l + r * x) / (2 * l * e * E), S = (h * h - l * l - r * x) / (2 * h * e * E), N = Math.log(Math.sqrt($ * $ + 1) - $), b = Math.log(Math.sqrt(S * S + 1) - S);
      m = (b - N) / n, w = function(z) {
        var T = z * m, P = Ze(N), L = l / (e * E) * (P * xu(n * T + N) - wu(N));
        return [
          a + L * d,
          f + L * v,
          l * P / Ze(n * T + N)
        ];
      };
    }
    return w.duration = m * 1e3 * n / Math.SQRT2, w;
  }
  return i.rho = function(o) {
    var u = Math.max(1e-3, +o), a = u * u, f = a * a;
    return t(u, a, f);
  }, i;
})(Math.SQRT2, 2, 4);
var It = 0, Ht = 0, Bt = 0, Xr = 1e3, kn, Ot, An = 0, $t = 0, qn = 0, tn = typeof performance == "object" && performance.now ? performance : Date, Br = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Ae() {
  return $t || (Br(Eu), $t = tn.now() + qn);
}
function Eu() {
  $t = 0;
}
function Rn() {
  this._call = this._time = this._next = null;
}
Rn.prototype = qr.prototype = {
  constructor: Rn,
  restart: function(t, n, e) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    e = (e == null ? Ae() : +e) + (n == null ? 0 : +n), !this._next && Ot !== this && (Ot ? Ot._next = this : kn = this, Ot = this), this._call = t, this._time = e, ae();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ae());
  }
};
function qr(t, n, e) {
  var r = new Rn();
  return r.restart(t, n, e), r;
}
function bu() {
  Ae(), ++It;
  for (var t = kn, n; t; )
    (n = $t - t._time) >= 0 && t._call.call(void 0, n), t = t._next;
  --It;
}
function We() {
  $t = (An = tn.now()) + qn, It = Ht = 0;
  try {
    bu();
  } finally {
    It = 0, $u(), $t = 0;
  }
}
function Mu() {
  var t = tn.now(), n = t - An;
  n > Xr && (qn -= n, An = t);
}
function $u() {
  for (var t, n = kn, e, r = 1 / 0; n; )
    n._call ? (r > n._time && (r = n._time), t = n, n = n._next) : (e = n._next, n._next = null, n = t ? t._next = e : kn = e);
  Ot = t, ae(r);
}
function ae(t) {
  if (!It) {
    Ht && (Ht = clearTimeout(Ht));
    var n = t - $t;
    n > 24 ? (t < 1 / 0 && (Ht = setTimeout(We, t - tn.now() - qn)), Bt && (Bt = clearInterval(Bt))) : (Bt || (An = tn.now(), Bt = setInterval(Mu, Xr)), It = 1, Br(We));
  }
}
function Je(t, n, e) {
  var r = new Rn();
  return n = n == null ? 0 : +n, r.restart((i) => {
    r.stop(), t(i + n);
  }, n, e), r;
}
var Nu = Ne("start", "end", "cancel", "interrupt"), ku = [], Hr = 0, Qe = 1, se = 2, xn = 3, je = 4, ce = 5, Sn = 6;
function Hn(t, n, e, r, i, o) {
  var u = t.__transition;
  if (!u) t.__transition = {};
  else if (e in u) return;
  Au(t, e, {
    name: n,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Nu,
    tween: ku,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Hr
  });
}
function Re(t, n) {
  var e = lt(t, n);
  if (e.state > Hr) throw new Error("too late; already scheduled");
  return e;
}
function vt(t, n) {
  var e = lt(t, n);
  if (e.state > xn) throw new Error("too late; already running");
  return e;
}
function lt(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function Au(t, n, e) {
  var r = t.__transition, i;
  r[n] = e, e.timer = qr(o, 0, e.time);
  function o(l) {
    e.state = Qe, e.timer.restart(u, e.delay, e.time), e.delay <= l && u(l - e.delay);
  }
  function u(l) {
    var s, c, h, d;
    if (e.state !== Qe) return f();
    for (s in r)
      if (d = r[s], d.name === e.name) {
        if (d.state === xn) return Je(u);
        d.state === je ? (d.state = Sn, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete r[s]) : +s < n && (d.state = Sn, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete r[s]);
      }
    if (Je(function() {
      e.state === xn && (e.state = je, e.timer.restart(a, e.delay, e.time), a(l));
    }), e.state = se, e.on.call("start", t, t.__data__, e.index, e.group), e.state === se) {
      for (e.state = xn, i = new Array(h = e.tween.length), s = 0, c = -1; s < h; ++s)
        (d = e.tween[s].value.call(t, t.__data__, e.index, e.group)) && (i[++c] = d);
      i.length = c + 1;
    }
  }
  function a(l) {
    for (var s = l < e.duration ? e.ease.call(null, l / e.duration) : (e.timer.restart(f), e.state = ce, 1), c = -1, h = i.length; ++c < h; )
      i[c].call(t, s);
    e.state === ce && (e.on.call("end", t, t.__data__, e.index, e.group), f());
  }
  function f() {
    e.state = Sn, e.timer.stop(), delete r[n];
    for (var l in r) return;
    delete t.__transition;
  }
}
function En(t, n) {
  var e = t.__transition, r, i, o = !0, u;
  if (e) {
    n = n == null ? null : n + "";
    for (u in e) {
      if ((r = e[u]).name !== n) {
        o = !1;
        continue;
      }
      i = r.state > se && r.state < ce, r.state = Sn, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete e[u];
    }
    o && delete t.__transition;
  }
}
function Ru(t) {
  return this.each(function() {
    En(this, t);
  });
}
function zu(t, n) {
  var e, r;
  return function() {
    var i = vt(this, t), o = i.tween;
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
function Tu(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function() {
    var o = vt(this, t), u = o.tween;
    if (u !== r) {
      i = (r = u).slice();
      for (var a = { name: n, value: e }, f = 0, l = i.length; f < l; ++f)
        if (i[f].name === n) {
          i[f] = a;
          break;
        }
      f === l && i.push(a);
    }
    o.tween = i;
  };
}
function Cu(t, n) {
  var e = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = lt(this.node(), e).tween, i = 0, o = r.length, u; i < o; ++i)
      if ((u = r[i]).name === t)
        return u.value;
    return null;
  }
  return this.each((n == null ? zu : Tu)(e, t, n));
}
function ze(t, n, e) {
  var r = t._id;
  return t.each(function() {
    var i = vt(this, r);
    (i.value || (i.value = {}))[n] = e.apply(this, arguments);
  }), function(i) {
    return lt(i, r).value[n];
  };
}
function Or(t, n) {
  var e;
  return (typeof n == "number" ? xt : n instanceof jt ? Ue : (e = jt(n)) ? (n = e, Ue) : du)(t, n);
}
function Pu(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Iu(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Fu(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var u = this.getAttribute(t);
    return u === i ? null : u === r ? o : o = n(r = u, e);
  };
}
function Du(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var u = this.getAttributeNS(t.space, t.local);
    return u === i ? null : u === r ? o : o = n(r = u, e);
  };
}
function Lu(t, n, e) {
  var r, i, o;
  return function() {
    var u, a = e(this), f;
    return a == null ? void this.removeAttribute(t) : (u = this.getAttribute(t), f = a + "", u === f ? null : u === r && f === i ? o : (i = f, o = n(r = u, a)));
  };
}
function Xu(t, n, e) {
  var r, i, o;
  return function() {
    var u, a = e(this), f;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (u = this.getAttributeNS(t.space, t.local), f = a + "", u === f ? null : u === r && f === i ? o : (i = f, o = n(r = u, a)));
  };
}
function Bu(t, n) {
  var e = Bn(t), r = e === "transform" ? mu : Or;
  return this.attrTween(t, typeof n == "function" ? (e.local ? Xu : Lu)(e, r, ze(this, "attr." + t, n)) : n == null ? (e.local ? Iu : Pu)(e) : (e.local ? Du : Fu)(e, r, n));
}
function qu(t, n) {
  return function(e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Hu(t, n) {
  return function(e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Ou(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Hu(t, o)), e;
  }
  return i._value = n, i;
}
function Yu(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && qu(t, o)), e;
  }
  return i._value = n, i;
}
function Vu(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = Bn(t);
  return this.tween(e, (r.local ? Ou : Yu)(r, n));
}
function Gu(t, n) {
  return function() {
    Re(this, t).delay = +n.apply(this, arguments);
  };
}
function Uu(t, n) {
  return n = +n, function() {
    Re(this, t).delay = n;
  };
}
function Ku(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Gu : Uu)(n, t)) : lt(this.node(), n).delay;
}
function Zu(t, n) {
  return function() {
    vt(this, t).duration = +n.apply(this, arguments);
  };
}
function Wu(t, n) {
  return n = +n, function() {
    vt(this, t).duration = n;
  };
}
function Ju(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Zu : Wu)(n, t)) : lt(this.node(), n).duration;
}
function Qu(t, n) {
  if (typeof n != "function") throw new Error();
  return function() {
    vt(this, t).ease = n;
  };
}
function ju(t) {
  var n = this._id;
  return arguments.length ? this.each(Qu(n, t)) : lt(this.node(), n).ease;
}
function ta(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    vt(this, t).ease = e;
  };
}
function na(t) {
  if (typeof t != "function") throw new Error();
  return this.each(ta(this._id, t));
}
function ea(t) {
  typeof t != "function" && (t = Er(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], u = o.length, a = r[i] = [], f, l = 0; l < u; ++l)
      (f = o[l]) && t.call(f, f.__data__, l, o) && a.push(f);
  return new wt(r, this._parents, this._name, this._id);
}
function ra(t) {
  if (t._id !== this._id) throw new Error();
  for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), u = new Array(r), a = 0; a < o; ++a)
    for (var f = n[a], l = e[a], s = f.length, c = u[a] = new Array(s), h, d = 0; d < s; ++d)
      (h = f[d] || l[d]) && (c[d] = h);
  for (; a < r; ++a)
    u[a] = n[a];
  return new wt(u, this._parents, this._name, this._id);
}
function ia(t) {
  return (t + "").trim().split(/^|\s+/).every(function(n) {
    var e = n.indexOf(".");
    return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
  });
}
function oa(t, n, e) {
  var r, i, o = ia(n) ? Re : vt;
  return function() {
    var u = o(this, t), a = u.on;
    a !== r && (i = (r = a).copy()).on(n, e), u.on = i;
  };
}
function ua(t, n) {
  var e = this._id;
  return arguments.length < 2 ? lt(this.node(), e).on.on(t) : this.each(oa(e, t, n));
}
function aa(t) {
  return function() {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function sa() {
  return this.on("end.remove", aa(this._id));
}
function ca(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = Me(t));
  for (var r = this._groups, i = r.length, o = new Array(i), u = 0; u < i; ++u)
    for (var a = r[u], f = a.length, l = o[u] = new Array(f), s, c, h = 0; h < f; ++h)
      (s = a[h]) && (c = t.call(s, s.__data__, h, a)) && ("__data__" in s && (c.__data__ = s.__data__), l[h] = c, Hn(l[h], n, e, h, l, lt(s, e)));
  return new wt(o, this._parents, n, e);
}
function la(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = Sr(t));
  for (var r = this._groups, i = r.length, o = [], u = [], a = 0; a < i; ++a)
    for (var f = r[a], l = f.length, s, c = 0; c < l; ++c)
      if (s = f[c]) {
        for (var h = t.call(s, s.__data__, c, f), d, v = lt(s, e), x = 0, w = h.length; x < w; ++x)
          (d = h[x]) && Hn(d, n, e, x, h, v);
        o.push(h), u.push(s);
      }
  return new wt(o, u, n, e);
}
var fa = an.prototype.constructor;
function ha() {
  return new fa(this._groups, this._parents);
}
function pa(t, n) {
  var e, r, i;
  return function() {
    var o = Pt(this, t), u = (this.style.removeProperty(t), Pt(this, t));
    return o === u ? null : o === e && u === r ? i : i = n(e = o, r = u);
  };
}
function Yr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function da(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var u = Pt(this, t);
    return u === i ? null : u === r ? o : o = n(r = u, e);
  };
}
function ga(t, n, e) {
  var r, i, o;
  return function() {
    var u = Pt(this, t), a = e(this), f = a + "";
    return a == null && (f = a = (this.style.removeProperty(t), Pt(this, t))), u === f ? null : u === r && f === i ? o : (i = f, o = n(r = u, a));
  };
}
function ya(t, n) {
  var e, r, i, o = "style." + n, u = "end." + o, a;
  return function() {
    var f = vt(this, t), l = f.on, s = f.value[o] == null ? a || (a = Yr(n)) : void 0;
    (l !== e || i !== s) && (r = (e = l).copy()).on(u, i = s), f.on = r;
  };
}
function va(t, n, e) {
  var r = (t += "") == "transform" ? vu : Or;
  return n == null ? this.styleTween(t, pa(t, r)).on("end.style." + t, Yr(t)) : typeof n == "function" ? this.styleTween(t, ga(t, r, ze(this, "style." + t, n))).each(ya(this._id, t)) : this.styleTween(t, da(t, r, n), e).on("end.style." + t, null);
}
function ma(t, n, e) {
  return function(r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function _a(t, n, e) {
  var r, i;
  function o() {
    var u = n.apply(this, arguments);
    return u !== i && (r = (i = u) && ma(t, u, e)), r;
  }
  return o._value = n, o;
}
function wa(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, _a(t, n, e ?? ""));
}
function xa(t) {
  return function() {
    this.textContent = t;
  };
}
function Sa(t) {
  return function() {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Ea(t) {
  return this.tween("text", typeof t == "function" ? Sa(ze(this, "text", t)) : xa(t == null ? "" : t + ""));
}
function ba(t) {
  return function(n) {
    this.textContent = t.call(this, n);
  };
}
function Ma(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && ba(i)), n;
  }
  return r._value = t, r;
}
function $a(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Ma(t));
}
function Na() {
  for (var t = this._name, n = this._id, e = Vr(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var u = r[o], a = u.length, f, l = 0; l < a; ++l)
      if (f = u[l]) {
        var s = lt(f, n);
        Hn(f, t, e, l, u, {
          time: s.time + s.delay + s.duration,
          delay: 0,
          duration: s.duration,
          ease: s.ease
        });
      }
  return new wt(r, this._parents, t, e);
}
function ka() {
  var t, n, e = this, r = e._id, i = e.size();
  return new Promise(function(o, u) {
    var a = { value: u }, f = { value: function() {
      --i === 0 && o();
    } };
    e.each(function() {
      var l = vt(this, r), s = l.on;
      s !== t && (n = (t = s).copy(), n._.cancel.push(a), n._.interrupt.push(a), n._.end.push(f)), l.on = n;
    }), i === 0 && o();
  });
}
var Aa = 0;
function wt(t, n, e, r) {
  this._groups = t, this._parents = n, this._name = e, this._id = r;
}
function Vr() {
  return ++Aa;
}
var mt = an.prototype;
wt.prototype = {
  constructor: wt,
  select: ca,
  selectAll: la,
  selectChild: mt.selectChild,
  selectChildren: mt.selectChildren,
  filter: ea,
  merge: ra,
  selection: ha,
  transition: Na,
  call: mt.call,
  nodes: mt.nodes,
  node: mt.node,
  size: mt.size,
  empty: mt.empty,
  each: mt.each,
  on: ua,
  attr: Bu,
  attrTween: Vu,
  style: va,
  styleTween: wa,
  text: Ea,
  textTween: $a,
  remove: sa,
  tween: Cu,
  delay: Ku,
  duration: Ju,
  ease: ju,
  easeVarying: na,
  end: ka,
  [Symbol.iterator]: mt[Symbol.iterator]
};
function Ra(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var za = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Ra
};
function Ta(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${n} not found`);
  return e;
}
function Ca(t) {
  var n, e;
  t instanceof wt ? (n = t._id, t = t._name) : (n = Vr(), (e = za).time = Ae(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var u = r[o], a = u.length, f, l = 0; l < a; ++l)
      (f = u[l]) && Hn(f, t, n, l, u, e || Ta(f, n));
  return new wt(r, this._parents, t, n);
}
an.prototype.interrupt = Ru;
an.prototype.transition = Ca;
const hn = (t) => () => t;
function Pa(t, {
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
function ct(t, n, e) {
  this.k = t, this.x = n, this.y = e;
}
ct.prototype = {
  constructor: ct,
  scale: function(t) {
    return t === 1 ? this : new ct(this.k * t, this.x, this.y);
  },
  translate: function(t, n) {
    return t === 0 & n === 0 ? this : new ct(this.k, this.x + this.k * t, this.y + this.k * n);
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
var nn = new ct(1, 0, 0);
Gr.prototype = ct.prototype;
function Gr(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return nn;
  return t.__zoom;
}
function Vn(t) {
  t.stopImmediatePropagation();
}
function qt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Ia(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Fa() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function tr() {
  return this.__zoom || nn;
}
function Da(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function La() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Xa(t, n, e) {
  var r = t.invertX(n[0][0]) - e[0][0], i = t.invertX(n[1][0]) - e[1][0], o = t.invertY(n[0][1]) - e[0][1], u = t.invertY(n[1][1]) - e[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    u > o ? (o + u) / 2 : Math.min(0, o) || Math.max(0, u)
  );
}
function Ba() {
  var t = Ia, n = Fa, e = Xa, r = Da, i = La, o = [0, 1 / 0], u = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, f = Su, l = Ne("start", "zoom", "end"), s, c, h, d = 500, v = 150, x = 0, w = 10;
  function m(p) {
    p.property("__zoom", tr).on("wheel.zoom", T, { passive: !1 }).on("mousedown.zoom", P).on("dblclick.zoom", L).filter(i).on("touchstart.zoom", A).on("touchmove.zoom", Z).on("touchend.zoom touchcancel.zoom", X).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  m.transform = function(p, g, y, _) {
    var M = p.selection ? p.selection() : p;
    M.property("__zoom", tr), p !== M ? N(p, g, y, _) : M.interrupt().each(function() {
      b(this, arguments).event(_).start().zoom(null, typeof g == "function" ? g.apply(this, arguments) : g).end();
    });
  }, m.scaleBy = function(p, g, y, _) {
    m.scaleTo(p, function() {
      var M = this.__zoom.k, k = typeof g == "function" ? g.apply(this, arguments) : g;
      return M * k;
    }, y, _);
  }, m.scaleTo = function(p, g, y, _) {
    m.transform(p, function() {
      var M = n.apply(this, arguments), k = this.__zoom, R = y == null ? S(M) : typeof y == "function" ? y.apply(this, arguments) : y, C = k.invert(R), D = typeof g == "function" ? g.apply(this, arguments) : g;
      return e($(E(k, D), R, C), M, u);
    }, y, _);
  }, m.translateBy = function(p, g, y, _) {
    m.transform(p, function() {
      return e(this.__zoom.translate(
        typeof g == "function" ? g.apply(this, arguments) : g,
        typeof y == "function" ? y.apply(this, arguments) : y
      ), n.apply(this, arguments), u);
    }, null, _);
  }, m.translateTo = function(p, g, y, _, M) {
    m.transform(p, function() {
      var k = n.apply(this, arguments), R = this.__zoom, C = _ == null ? S(k) : typeof _ == "function" ? _.apply(this, arguments) : _;
      return e(nn.translate(C[0], C[1]).scale(R.k).translate(
        typeof g == "function" ? -g.apply(this, arguments) : -g,
        typeof y == "function" ? -y.apply(this, arguments) : -y
      ), k, u);
    }, _, M);
  };
  function E(p, g) {
    return g = Math.max(o[0], Math.min(o[1], g)), g === p.k ? p : new ct(g, p.x, p.y);
  }
  function $(p, g, y) {
    var _ = g[0] - y[0] * p.k, M = g[1] - y[1] * p.k;
    return _ === p.x && M === p.y ? p : new ct(p.k, _, M);
  }
  function S(p) {
    return [(+p[0][0] + +p[1][0]) / 2, (+p[0][1] + +p[1][1]) / 2];
  }
  function N(p, g, y, _) {
    p.on("start.zoom", function() {
      b(this, arguments).event(_).start();
    }).on("interrupt.zoom end.zoom", function() {
      b(this, arguments).event(_).end();
    }).tween("zoom", function() {
      var M = this, k = arguments, R = b(M, k).event(_), C = n.apply(M, k), D = y == null ? S(C) : typeof y == "function" ? y.apply(M, k) : y, O = Math.max(C[1][0] - C[0][0], C[1][1] - C[0][1]), q = M.__zoom, V = typeof g == "function" ? g.apply(M, k) : g, it = f(q.invert(D).concat(O / q.k), V.invert(D).concat(O / V.k));
      return function(J) {
        if (J === 1) J = V;
        else {
          var ot = it(J), I = O / ot[2];
          J = new ct(I, D[0] - ot[0] * I, D[1] - ot[1] * I);
        }
        R.zoom(null, J);
      };
    });
  }
  function b(p, g, y) {
    return !y && p.__zooming || new z(p, g);
  }
  function z(p, g) {
    this.that = p, this.args = g, this.active = 0, this.sourceEvent = null, this.extent = n.apply(p, g), this.taps = 0;
  }
  z.prototype = {
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
      var g = pt(this.that).datum();
      l.call(
        p,
        this.that,
        new Pa(p, {
          sourceEvent: this.sourceEvent,
          target: m,
          transform: this.that.__zoom,
          dispatch: l
        }),
        g
      );
    }
  };
  function T(p, ...g) {
    if (!t.apply(this, arguments)) return;
    var y = b(this, g).event(p), _ = this.__zoom, M = Math.max(o[0], Math.min(o[1], _.k * Math.pow(2, r.apply(this, arguments)))), k = St(p);
    if (y.wheel)
      (y.mouse[0][0] !== k[0] || y.mouse[0][1] !== k[1]) && (y.mouse[1] = _.invert(y.mouse[0] = k)), clearTimeout(y.wheel);
    else {
      if (_.k === M) return;
      y.mouse = [k, _.invert(k)], En(this), y.start();
    }
    qt(p), y.wheel = setTimeout(R, v), y.zoom("mouse", e($(E(_, M), y.mouse[0], y.mouse[1]), y.extent, u));
    function R() {
      y.wheel = null, y.end();
    }
  }
  function P(p, ...g) {
    if (h || !t.apply(this, arguments)) return;
    var y = p.currentTarget, _ = b(this, g, !0).event(p), M = pt(p.view).on("mousemove.zoom", D, !0).on("mouseup.zoom", O, !0), k = St(p, y), R = p.clientX, C = p.clientY;
    Zo(p.view), Vn(p), _.mouse = [k, this.__zoom.invert(k)], En(this), _.start();
    function D(q) {
      if (qt(q), !_.moved) {
        var V = q.clientX - R, it = q.clientY - C;
        _.moved = V * V + it * it > x;
      }
      _.event(q).zoom("mouse", e($(_.that.__zoom, _.mouse[0] = St(q, y), _.mouse[1]), _.extent, u));
    }
    function O(q) {
      M.on("mousemove.zoom mouseup.zoom", null), Wo(q.view, _.moved), qt(q), _.event(q).end();
    }
  }
  function L(p, ...g) {
    if (t.apply(this, arguments)) {
      var y = this.__zoom, _ = St(p.changedTouches ? p.changedTouches[0] : p, this), M = y.invert(_), k = y.k * (p.shiftKey ? 0.5 : 2), R = e($(E(y, k), _, M), n.apply(this, g), u);
      qt(p), a > 0 ? pt(this).transition().duration(a).call(N, R, _, p) : pt(this).call(m.transform, R, _, p);
    }
  }
  function A(p, ...g) {
    if (t.apply(this, arguments)) {
      var y = p.touches, _ = y.length, M = b(this, g, p.changedTouches.length === _).event(p), k, R, C, D;
      for (Vn(p), R = 0; R < _; ++R)
        C = y[R], D = St(C, this), D = [D, this.__zoom.invert(D), C.identifier], M.touch0 ? !M.touch1 && M.touch0[2] !== D[2] && (M.touch1 = D, M.taps = 0) : (M.touch0 = D, k = !0, M.taps = 1 + !!s);
      s && (s = clearTimeout(s)), k && (M.taps < 2 && (c = D[0], s = setTimeout(function() {
        s = null;
      }, d)), En(this), M.start());
    }
  }
  function Z(p, ...g) {
    if (this.__zooming) {
      var y = b(this, g).event(p), _ = p.changedTouches, M = _.length, k, R, C, D;
      for (qt(p), k = 0; k < M; ++k)
        R = _[k], C = St(R, this), y.touch0 && y.touch0[2] === R.identifier ? y.touch0[0] = C : y.touch1 && y.touch1[2] === R.identifier && (y.touch1[0] = C);
      if (R = y.that.__zoom, y.touch1) {
        var O = y.touch0[0], q = y.touch0[1], V = y.touch1[0], it = y.touch1[1], J = (J = V[0] - O[0]) * J + (J = V[1] - O[1]) * J, ot = (ot = it[0] - q[0]) * ot + (ot = it[1] - q[1]) * ot;
        R = E(R, Math.sqrt(J / ot)), C = [(O[0] + V[0]) / 2, (O[1] + V[1]) / 2], D = [(q[0] + it[0]) / 2, (q[1] + it[1]) / 2];
      } else if (y.touch0) C = y.touch0[0], D = y.touch0[1];
      else return;
      y.zoom("touch", e($(R, C, D), y.extent, u));
    }
  }
  function X(p, ...g) {
    if (this.__zooming) {
      var y = b(this, g).event(p), _ = p.changedTouches, M = _.length, k, R;
      for (Vn(p), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, d), k = 0; k < M; ++k)
        R = _[k], y.touch0 && y.touch0[2] === R.identifier ? delete y.touch0 : y.touch1 && y.touch1[2] === R.identifier && delete y.touch1;
      if (y.touch1 && !y.touch0 && (y.touch0 = y.touch1, delete y.touch1), y.touch0) y.touch0[1] = this.__zoom.invert(y.touch0[0]);
      else if (y.end(), y.taps === 2 && (R = St(R, this), Math.hypot(c[0] - R[0], c[1] - R[1]) < w)) {
        var C = pt(this).on("dblclick.zoom");
        C && C.apply(this, arguments);
      }
    }
  }
  return m.wheelDelta = function(p) {
    return arguments.length ? (r = typeof p == "function" ? p : hn(+p), m) : r;
  }, m.filter = function(p) {
    return arguments.length ? (t = typeof p == "function" ? p : hn(!!p), m) : t;
  }, m.touchable = function(p) {
    return arguments.length ? (i = typeof p == "function" ? p : hn(!!p), m) : i;
  }, m.extent = function(p) {
    return arguments.length ? (n = typeof p == "function" ? p : hn([[+p[0][0], +p[0][1]], [+p[1][0], +p[1][1]]]), m) : n;
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
function qa(t) {
  return t;
}
function Ha(t) {
  if (t == null) return qa;
  var n, e, r = t.scale[0], i = t.scale[1], o = t.translate[0], u = t.translate[1];
  return function(a, f) {
    f || (n = e = 0);
    var l = 2, s = a.length, c = new Array(s);
    for (c[0] = (n += a[0]) * r + o, c[1] = (e += a[1]) * i + u; l < s; ) c[l] = a[l], ++l;
    return c;
  };
}
function Oa(t, n) {
  for (var e, r = t.length, i = r - n; i < --r; ) e = t[i], t[i++] = t[r], t[r] = e;
}
function Ya(t, n) {
  return typeof n == "string" && (n = t.objects[n]), n.type === "GeometryCollection" ? { type: "FeatureCollection", features: n.geometries.map(function(e) {
    return nr(t, e);
  }) } : nr(t, n);
}
function nr(t, n) {
  var e = n.id, r = n.bbox, i = n.properties == null ? {} : n.properties, o = Va(t, n);
  return e == null && r == null ? { type: "Feature", properties: i, geometry: o } : r == null ? { type: "Feature", id: e, properties: i, geometry: o } : { type: "Feature", id: e, bbox: r, properties: i, geometry: o };
}
function Va(t, n) {
  var e = Ha(t.transform), r = t.arcs;
  function i(s, c) {
    c.length && c.pop();
    for (var h = r[s < 0 ? ~s : s], d = 0, v = h.length; d < v; ++d)
      c.push(e(h[d], d));
    s < 0 && Oa(c, v);
  }
  function o(s) {
    return e(s);
  }
  function u(s) {
    for (var c = [], h = 0, d = s.length; h < d; ++h) i(s[h], c);
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
const Zt = /* @__PURE__ */ new Map(), Gn = /* @__PURE__ */ new Map();
async function Ga(t) {
  const n = Zt.get(t);
  if (n) return n;
  const e = Gn.get(t);
  if (e) return e;
  const r = (async () => {
    const i = await fetch(t);
    if (!i.ok)
      throw new Error(`Failed to fetch ${t}: ${i.status} ${i.statusText}`);
    const o = await i.json(), u = Object.keys(o.objects)[0], a = Ya(o, o.objects[u]);
    return Zt.set(t, a), a;
  })();
  Gn.set(t, r);
  try {
    return await r;
  } finally {
    Gn.delete(t);
  }
}
function Un(t) {
  const [n, e] = bt(0), [r, i] = bt(() => {
    if (!t) return { status: "idle" };
    const u = Zt.get(t);
    return u ? { status: "ready", data: u } : { status: "loading" };
  });
  Xn(() => {
    if (!t) {
      i({ status: "idle" });
      return;
    }
    const u = Zt.get(t);
    if (u) {
      i({ status: "ready", data: u });
      return;
    }
    let a = !1;
    return i({ status: "loading" }), Ga(t).then((f) => {
      a || i({ status: "ready", data: f });
    }).catch((f) => {
      a || i({ status: "error", error: f instanceof Error ? f : new Error(String(f)) });
    }), () => {
      a = !0;
    };
  }, [t, n]);
  const o = ht(() => {
    t && Zt.delete(t), e((u) => u + 1);
  }, [t]);
  return [r, o];
}
const Kn = /* @__PURE__ */ new Map();
function Ua(t) {
  const n = `${t}/meta.json`, [e, r] = bt(() => {
    const i = Kn.get(n);
    return i ? { status: "ready", data: i } : { status: "loading" };
  });
  return Xn(() => {
    const i = Kn.get(n);
    if (i) {
      r({ status: "ready", data: i });
      return;
    }
    let o = !1;
    return r({ status: "loading" }), fetch(n).then((u) => {
      if (!u.ok) throw new Error(`Failed to fetch ${n}: ${u.status} ${u.statusText}`);
      return u.json();
    }).then((u) => {
      Kn.set(n, u), o || r({ status: "ready", data: u });
    }).catch(() => {
      o || r({ status: "error" });
    }), () => {
      o = !0;
    };
  }, [n]), e;
}
class Nt {
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
function* Ka(t) {
  for (const n of t)
    yield* n;
}
function Ur(t) {
  return Array.from(Ka(t));
}
var B = 1e-6, F = Math.PI, tt = F / 2, er = F / 4, rt = F * 2, nt = 180 / F, K = F / 180, H = Math.abs, Kr = Math.atan, en = Math.atan2, G = Math.cos, Za = Math.exp, Wa = Math.log, U = Math.sin, Ja = Math.sign || function(t) {
  return t > 0 ? 1 : t < 0 ? -1 : 0;
}, At = Math.sqrt, Qa = Math.tan;
function ja(t) {
  return t > 1 ? 0 : t < -1 ? F : Math.acos(t);
}
function rn(t) {
  return t > 1 ? tt : t < -1 ? -tt : Math.asin(t);
}
function at() {
}
function zn(t, n) {
  t && ir.hasOwnProperty(t.type) && ir[t.type](t, n);
}
var rr = {
  Feature: function(t, n) {
    zn(t.geometry, n);
  },
  FeatureCollection: function(t, n) {
    for (var e = t.features, r = -1, i = e.length; ++r < i; ) zn(e[r].geometry, n);
  }
}, ir = {
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
    le(t.coordinates, n, 0);
  },
  MultiLineString: function(t, n) {
    for (var e = t.coordinates, r = -1, i = e.length; ++r < i; ) le(e[r], n, 0);
  },
  Polygon: function(t, n) {
    or(t.coordinates, n);
  },
  MultiPolygon: function(t, n) {
    for (var e = t.coordinates, r = -1, i = e.length; ++r < i; ) or(e[r], n);
  },
  GeometryCollection: function(t, n) {
    for (var e = t.geometries, r = -1, i = e.length; ++r < i; ) zn(e[r], n);
  }
};
function le(t, n, e) {
  var r = -1, i = t.length - e, o;
  for (n.lineStart(); ++r < i; ) o = t[r], n.point(o[0], o[1], o[2]);
  n.lineEnd();
}
function or(t, n) {
  var e = -1, r = t.length;
  for (n.polygonStart(); ++e < r; ) le(t[e], n, 1);
  n.polygonEnd();
}
function zt(t, n) {
  t && rr.hasOwnProperty(t.type) ? rr[t.type](t, n) : zn(t, n);
}
function fe(t) {
  return [en(t[1], t[0]), rn(t[2])];
}
function Ft(t) {
  var n = t[0], e = t[1], r = G(e);
  return [r * G(n), r * U(n), U(e)];
}
function pn(t, n) {
  return t[0] * n[0] + t[1] * n[1] + t[2] * n[2];
}
function Tn(t, n) {
  return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]];
}
function Zn(t, n) {
  t[0] += n[0], t[1] += n[1], t[2] += n[2];
}
function dn(t, n) {
  return [t[0] * n, t[1] * n, t[2] * n];
}
function he(t) {
  var n = At(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
  t[0] /= n, t[1] /= n, t[2] /= n;
}
function pe(t, n) {
  function e(r, i) {
    return r = t(r, i), n(r[0], r[1]);
  }
  return t.invert && n.invert && (e.invert = function(r, i) {
    return r = n.invert(r, i), r && t.invert(r[0], r[1]);
  }), e;
}
function de(t, n) {
  return H(t) > F && (t -= Math.round(t / rt) * rt), [t, n];
}
de.invert = de;
function Zr(t, n, e) {
  return (t %= rt) ? n || e ? pe(ar(t), sr(n, e)) : ar(t) : n || e ? sr(n, e) : de;
}
function ur(t) {
  return function(n, e) {
    return n += t, H(n) > F && (n -= Math.round(n / rt) * rt), [n, e];
  };
}
function ar(t) {
  var n = ur(t);
  return n.invert = ur(-t), n;
}
function sr(t, n) {
  var e = G(t), r = U(t), i = G(n), o = U(n);
  function u(a, f) {
    var l = G(f), s = G(a) * l, c = U(a) * l, h = U(f), d = h * e + s * r;
    return [
      en(c * i - d * o, s * e - h * r),
      rn(d * i + c * o)
    ];
  }
  return u.invert = function(a, f) {
    var l = G(f), s = G(a) * l, c = U(a) * l, h = U(f), d = h * i - c * o;
    return [
      en(c * i + h * o, s * e + d * r),
      rn(d * e - s * r)
    ];
  }, u;
}
function ts(t) {
  t = Zr(t[0] * K, t[1] * K, t.length > 2 ? t[2] * K : 0);
  function n(e) {
    return e = t(e[0] * K, e[1] * K), e[0] *= nt, e[1] *= nt, e;
  }
  return n.invert = function(e) {
    return e = t.invert(e[0] * K, e[1] * K), e[0] *= nt, e[1] *= nt, e;
  }, n;
}
function ns(t, n, e, r, i, o) {
  if (e) {
    var u = G(n), a = U(n), f = r * e;
    i == null ? (i = n + r * rt, o = n - f / 2) : (i = cr(u, i), o = cr(u, o), (r > 0 ? i < o : i > o) && (i += r * rt));
    for (var l, s = i; r > 0 ? s > o : s < o; s -= f)
      l = fe([u, -a * G(s), -a * U(s)]), t.point(l[0], l[1]);
  }
}
function cr(t, n) {
  n = Ft(n), n[0] -= t, he(n);
  var e = ja(-n[1]);
  return ((-n[2] < 0 ? -e : e) + rt - B) % rt;
}
function Wr() {
  var t = [], n;
  return {
    point: function(e, r, i) {
      n.push([e, r, i]);
    },
    lineStart: function() {
      t.push(n = []);
    },
    lineEnd: at,
    rejoin: function() {
      t.length > 1 && t.push(t.pop().concat(t.shift()));
    },
    result: function() {
      var e = t;
      return t = [], n = null, e;
    }
  };
}
function bn(t, n) {
  return H(t[0] - n[0]) < B && H(t[1] - n[1]) < B;
}
function gn(t, n, e, r) {
  this.x = t, this.z = n, this.o = e, this.e = r, this.v = !1, this.n = this.p = null;
}
function Jr(t, n, e, r, i) {
  var o = [], u = [], a, f;
  if (t.forEach(function(v) {
    if (!((x = v.length - 1) <= 0)) {
      var x, w = v[0], m = v[x], E;
      if (bn(w, m)) {
        if (!w[2] && !m[2]) {
          for (i.lineStart(), a = 0; a < x; ++a) i.point((w = v[a])[0], w[1]);
          i.lineEnd();
          return;
        }
        m[0] += 2 * B;
      }
      o.push(E = new gn(w, v, null, !0)), u.push(E.o = new gn(w, null, E, !1)), o.push(E = new gn(m, v, null, !1)), u.push(E.o = new gn(m, null, E, !0));
    }
  }), !!o.length) {
    for (u.sort(n), lr(o), lr(u), a = 0, f = u.length; a < f; ++a)
      u[a].e = e = !e;
    for (var l = o[0], s, c; ; ) {
      for (var h = l, d = !0; h.v; ) if ((h = h.n) === l) return;
      s = h.z, i.lineStart();
      do {
        if (h.v = h.o.v = !0, h.e) {
          if (d)
            for (a = 0, f = s.length; a < f; ++a) i.point((c = s[a])[0], c[1]);
          else
            r(h.x, h.n.x, 1, i);
          h = h.n;
        } else {
          if (d)
            for (s = h.p.z, a = s.length - 1; a >= 0; --a) i.point((c = s[a])[0], c[1]);
          else
            r(h.x, h.p.x, -1, i);
          h = h.p;
        }
        h = h.o, s = h.z, d = !d;
      } while (!h.v);
      i.lineEnd();
    }
  }
}
function lr(t) {
  if (n = t.length) {
    for (var n, e = 0, r = t[0], i; ++e < n; )
      r.n = i = t[e], i.p = r, r = i;
    r.n = i = t[0], i.p = r;
  }
}
function Wn(t) {
  return H(t[0]) <= F ? t[0] : Ja(t[0]) * ((H(t[0]) + F) % rt - F);
}
function es(t, n) {
  var e = Wn(n), r = n[1], i = U(r), o = [U(e), -G(e), 0], u = 0, a = 0, f = new Nt();
  i === 1 ? r = tt + B : i === -1 && (r = -tt - B);
  for (var l = 0, s = t.length; l < s; ++l)
    if (h = (c = t[l]).length)
      for (var c, h, d = c[h - 1], v = Wn(d), x = d[1] / 2 + er, w = U(x), m = G(x), E = 0; E < h; ++E, v = S, w = b, m = z, d = $) {
        var $ = c[E], S = Wn($), N = $[1] / 2 + er, b = U(N), z = G(N), T = S - v, P = T >= 0 ? 1 : -1, L = P * T, A = L > F, Z = w * b;
        if (f.add(en(Z * P * U(L), m * z + Z * G(L))), u += A ? T + P * rt : T, A ^ v >= e ^ S >= e) {
          var X = Tn(Ft(d), Ft($));
          he(X);
          var p = Tn(o, X);
          he(p);
          var g = (A ^ T >= 0 ? -1 : 1) * rn(p[2]);
          (r > g || r === g && (X[0] || X[1])) && (a += A ^ T >= 0 ? 1 : -1);
        }
      }
  return (u < -B || u < B && f < -1e-12) ^ a & 1;
}
function Qr(t, n, e, r) {
  return function(i) {
    var o = n(i), u = Wr(), a = n(u), f = !1, l, s, c, h = {
      point: d,
      lineStart: x,
      lineEnd: w,
      polygonStart: function() {
        h.point = m, h.lineStart = E, h.lineEnd = $, s = [], l = [];
      },
      polygonEnd: function() {
        h.point = d, h.lineStart = x, h.lineEnd = w, s = Ur(s);
        var S = es(l, r);
        s.length ? (f || (i.polygonStart(), f = !0), Jr(s, is, S, e, i)) : S && (f || (i.polygonStart(), f = !0), i.lineStart(), e(null, null, 1, i), i.lineEnd()), f && (i.polygonEnd(), f = !1), s = l = null;
      },
      sphere: function() {
        i.polygonStart(), i.lineStart(), e(null, null, 1, i), i.lineEnd(), i.polygonEnd();
      }
    };
    function d(S, N) {
      t(S, N) && i.point(S, N);
    }
    function v(S, N) {
      o.point(S, N);
    }
    function x() {
      h.point = v, o.lineStart();
    }
    function w() {
      h.point = d, o.lineEnd();
    }
    function m(S, N) {
      c.push([S, N]), a.point(S, N);
    }
    function E() {
      a.lineStart(), c = [];
    }
    function $() {
      m(c[0][0], c[0][1]), a.lineEnd();
      var S = a.clean(), N = u.result(), b, z = N.length, T, P, L;
      if (c.pop(), l.push(c), c = null, !!z) {
        if (S & 1) {
          if (P = N[0], (T = P.length - 1) > 0) {
            for (f || (i.polygonStart(), f = !0), i.lineStart(), b = 0; b < T; ++b) i.point((L = P[b])[0], L[1]);
            i.lineEnd();
          }
          return;
        }
        z > 1 && S & 2 && N.push(N.pop().concat(N.shift())), s.push(N.filter(rs));
      }
    }
    return h;
  };
}
function rs(t) {
  return t.length > 1;
}
function is(t, n) {
  return ((t = t.x)[0] < 0 ? t[1] - tt - B : tt - t[1]) - ((n = n.x)[0] < 0 ? n[1] - tt - B : tt - n[1]);
}
const fr = Qr(
  function() {
    return !0;
  },
  os,
  as,
  [-F, -tt]
);
function os(t) {
  var n = NaN, e = NaN, r = NaN, i;
  return {
    lineStart: function() {
      t.lineStart(), i = 1;
    },
    point: function(o, u) {
      var a = o > 0 ? F : -F, f = H(o - n);
      H(f - F) < B ? (t.point(n, e = (e + u) / 2 > 0 ? tt : -tt), t.point(r, e), t.lineEnd(), t.lineStart(), t.point(a, e), t.point(o, e), i = 0) : r !== a && f >= F && (H(n - r) < B && (n -= r * B), H(o - a) < B && (o -= a * B), e = us(n, e, o, u), t.point(r, e), t.lineEnd(), t.lineStart(), t.point(a, e), i = 0), t.point(n = o, e = u), r = a;
    },
    lineEnd: function() {
      t.lineEnd(), n = e = NaN;
    },
    clean: function() {
      return 2 - i;
    }
  };
}
function us(t, n, e, r) {
  var i, o, u = U(t - e);
  return H(u) > B ? Kr((U(n) * (o = G(r)) * U(e) - U(r) * (i = G(n)) * U(t)) / (i * o * u)) : (n + r) / 2;
}
function as(t, n, e, r) {
  var i;
  if (t == null)
    i = e * tt, r.point(-F, i), r.point(0, i), r.point(F, i), r.point(F, 0), r.point(F, -i), r.point(0, -i), r.point(-F, -i), r.point(-F, 0), r.point(-F, i);
  else if (H(t[0] - n[0]) > B) {
    var o = t[0] < n[0] ? F : -F;
    i = e * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i);
  } else
    r.point(n[0], n[1]);
}
function ss(t) {
  var n = G(t), e = 2 * K, r = n > 0, i = H(n) > B;
  function o(s, c, h, d) {
    ns(d, t, e, h, s, c);
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
        var E = [w, m], $, S = u(w, m), N = r ? S ? 0 : l(w, m) : S ? l(w + (w < 0 ? F : -F), m) : 0;
        if (!c && (v = d = S) && s.lineStart(), S !== d && ($ = f(c, E), (!$ || bn(c, $) || bn(E, $)) && (E[2] = 1)), S !== d)
          x = 0, S ? (s.lineStart(), $ = f(E, c), s.point($[0], $[1])) : ($ = f(c, E), s.point($[0], $[1], 2), s.lineEnd()), c = $;
        else if (i && c && r ^ S) {
          var b;
          !(N & h) && (b = f(E, c, !0)) && (x = 0, r ? (s.lineStart(), s.point(b[0][0], b[0][1]), s.point(b[1][0], b[1][1]), s.lineEnd()) : (s.point(b[1][0], b[1][1]), s.lineEnd(), s.lineStart(), s.point(b[0][0], b[0][1], 3)));
        }
        S && (!c || !bn(c, E)) && s.point(E[0], E[1]), c = E, d = S, h = N;
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
    var d = Ft(s), v = Ft(c), x = [1, 0, 0], w = Tn(d, v), m = pn(w, w), E = w[0], $ = m - E * E;
    if (!$) return !h && s;
    var S = n * m / $, N = -n * E / $, b = Tn(x, w), z = dn(x, S), T = dn(w, N);
    Zn(z, T);
    var P = b, L = pn(z, P), A = pn(P, P), Z = L * L - A * (pn(z, z) - 1);
    if (!(Z < 0)) {
      var X = At(Z), p = dn(P, (-L - X) / A);
      if (Zn(p, z), p = fe(p), !h) return p;
      var g = s[0], y = c[0], _ = s[1], M = c[1], k;
      y < g && (k = g, g = y, y = k);
      var R = y - g, C = H(R - F) < B, D = C || R < B;
      if (!C && M < _ && (k = _, _ = M, M = k), D ? C ? _ + M > 0 ^ p[1] < (H(p[0] - g) < B ? _ : M) : _ <= p[1] && p[1] <= M : R > F ^ (g <= p[0] && p[0] <= y)) {
        var O = dn(P, (-L + X) / A);
        return Zn(O, z), [p, fe(O)];
      }
    }
  }
  function l(s, c) {
    var h = r ? t : F - t, d = 0;
    return s < -h ? d |= 1 : s > h && (d |= 2), c < -h ? d |= 4 : c > h && (d |= 8), d;
  }
  return Qr(u, a, o, r ? [0, -t] : [-F, t - F]);
}
function cs(t, n, e, r, i, o) {
  var u = t[0], a = t[1], f = n[0], l = n[1], s = 0, c = 1, h = f - u, d = l - a, v;
  if (v = e - u, !(!h && v > 0)) {
    if (v /= h, h < 0) {
      if (v < s) return;
      v < c && (c = v);
    } else if (h > 0) {
      if (v > c) return;
      v > s && (s = v);
    }
    if (v = i - u, !(!h && v < 0)) {
      if (v /= h, h < 0) {
        if (v > c) return;
        v > s && (s = v);
      } else if (h > 0) {
        if (v < s) return;
        v < c && (c = v);
      }
      if (v = r - a, !(!d && v > 0)) {
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
var Yt = 1e9, yn = -Yt;
function ls(t, n, e, r) {
  function i(l, s) {
    return t <= l && l <= e && n <= s && s <= r;
  }
  function o(l, s, c, h) {
    var d = 0, v = 0;
    if (l == null || (d = u(l, c)) !== (v = u(s, c)) || f(l, s) < 0 ^ c > 0)
      do
        h.point(d === 0 || d === 3 ? t : e, d > 1 ? r : n);
      while ((d = (d + c + 4) % 4) !== v);
    else
      h.point(s[0], s[1]);
  }
  function u(l, s) {
    return H(l[0] - t) < B ? s > 0 ? 0 : 3 : H(l[0] - e) < B ? s > 0 ? 2 : 1 : H(l[1] - n) < B ? s > 0 ? 1 : 0 : s > 0 ? 3 : 2;
  }
  function a(l, s) {
    return f(l.x, s.x);
  }
  function f(l, s) {
    var c = u(l, 1), h = u(s, 1);
    return c !== h ? c - h : c === 0 ? s[1] - l[1] : c === 1 ? l[0] - s[0] : c === 2 ? l[1] - s[1] : s[0] - l[0];
  }
  return function(l) {
    var s = l, c = Wr(), h, d, v, x, w, m, E, $, S, N, b, z = {
      point: T,
      lineStart: Z,
      lineEnd: X,
      polygonStart: L,
      polygonEnd: A
    };
    function T(g, y) {
      i(g, y) && s.point(g, y);
    }
    function P() {
      for (var g = 0, y = 0, _ = d.length; y < _; ++y)
        for (var M = d[y], k = 1, R = M.length, C = M[0], D, O, q = C[0], V = C[1]; k < R; ++k)
          D = q, O = V, C = M[k], q = C[0], V = C[1], O <= r ? V > r && (q - D) * (r - O) > (V - O) * (t - D) && ++g : V <= r && (q - D) * (r - O) < (V - O) * (t - D) && --g;
      return g;
    }
    function L() {
      s = c, h = [], d = [], b = !0;
    }
    function A() {
      var g = P(), y = b && g, _ = (h = Ur(h)).length;
      (y || _) && (l.polygonStart(), y && (l.lineStart(), o(null, null, 1, l), l.lineEnd()), _ && Jr(h, a, g, o, l), l.polygonEnd()), s = l, h = d = v = null;
    }
    function Z() {
      z.point = p, d && d.push(v = []), N = !0, S = !1, E = $ = NaN;
    }
    function X() {
      h && (p(x, w), m && S && c.rejoin(), h.push(c.result())), z.point = T, S && s.lineEnd();
    }
    function p(g, y) {
      var _ = i(g, y);
      if (d && v.push([g, y]), N)
        x = g, w = y, m = _, N = !1, _ && (s.lineStart(), s.point(g, y));
      else if (_ && S) s.point(g, y);
      else {
        var M = [E = Math.max(yn, Math.min(Yt, E)), $ = Math.max(yn, Math.min(Yt, $))], k = [g = Math.max(yn, Math.min(Yt, g)), y = Math.max(yn, Math.min(Yt, y))];
        cs(M, k, t, n, e, r) ? (S || (s.lineStart(), s.point(M[0], M[1])), s.point(k[0], k[1]), _ || s.lineEnd(), b = !1) : _ && (s.lineStart(), s.point(g, y), b = !1);
      }
      E = g, $ = y, S = _;
    }
    return z;
  };
}
const ge = (t) => t;
var Jn = new Nt(), ye = new Nt(), jr, ti, ve, me, _t = {
  point: at,
  lineStart: at,
  lineEnd: at,
  polygonStart: function() {
    _t.lineStart = fs, _t.lineEnd = ps;
  },
  polygonEnd: function() {
    _t.lineStart = _t.lineEnd = _t.point = at, Jn.add(H(ye)), ye = new Nt();
  },
  result: function() {
    var t = Jn / 2;
    return Jn = new Nt(), t;
  }
};
function fs() {
  _t.point = hs;
}
function hs(t, n) {
  _t.point = ni, jr = ve = t, ti = me = n;
}
function ni(t, n) {
  ye.add(me * t - ve * n), ve = t, me = n;
}
function ps() {
  ni(jr, ti);
}
var Dt = 1 / 0, Cn = Dt, on = -Dt, Pn = on, In = {
  point: ds,
  lineStart: at,
  lineEnd: at,
  polygonStart: at,
  polygonEnd: at,
  result: function() {
    var t = [[Dt, Cn], [on, Pn]];
    return on = Pn = -(Cn = Dt = 1 / 0), t;
  }
};
function ds(t, n) {
  t < Dt && (Dt = t), t > on && (on = t), n < Cn && (Cn = n), n > Pn && (Pn = n);
}
var _e = 0, we = 0, Vt = 0, Fn = 0, Dn = 0, Tt = 0, xe = 0, Se = 0, Gt = 0, ei, ri, dt, gt, ut = {
  point: kt,
  lineStart: hr,
  lineEnd: pr,
  polygonStart: function() {
    ut.lineStart = vs, ut.lineEnd = ms;
  },
  polygonEnd: function() {
    ut.point = kt, ut.lineStart = hr, ut.lineEnd = pr;
  },
  result: function() {
    var t = Gt ? [xe / Gt, Se / Gt] : Tt ? [Fn / Tt, Dn / Tt] : Vt ? [_e / Vt, we / Vt] : [NaN, NaN];
    return _e = we = Vt = Fn = Dn = Tt = xe = Se = Gt = 0, t;
  }
};
function kt(t, n) {
  _e += t, we += n, ++Vt;
}
function hr() {
  ut.point = gs;
}
function gs(t, n) {
  ut.point = ys, kt(dt = t, gt = n);
}
function ys(t, n) {
  var e = t - dt, r = n - gt, i = At(e * e + r * r);
  Fn += i * (dt + t) / 2, Dn += i * (gt + n) / 2, Tt += i, kt(dt = t, gt = n);
}
function pr() {
  ut.point = kt;
}
function vs() {
  ut.point = _s;
}
function ms() {
  ii(ei, ri);
}
function _s(t, n) {
  ut.point = ii, kt(ei = dt = t, ri = gt = n);
}
function ii(t, n) {
  var e = t - dt, r = n - gt, i = At(e * e + r * r);
  Fn += i * (dt + t) / 2, Dn += i * (gt + n) / 2, Tt += i, i = gt * t - dt * n, xe += i * (dt + t), Se += i * (gt + n), Gt += i * 3, kt(dt = t, gt = n);
}
function oi(t) {
  this._context = t;
}
oi.prototype = {
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
        this._context.moveTo(t + this._radius, n), this._context.arc(t, n, this._radius, 0, rt);
        break;
      }
    }
  },
  result: at
};
var Ee = new Nt(), Qn, ui, ai, Ut, Kt, un = {
  point: at,
  lineStart: function() {
    un.point = ws;
  },
  lineEnd: function() {
    Qn && si(ui, ai), un.point = at;
  },
  polygonStart: function() {
    Qn = !0;
  },
  polygonEnd: function() {
    Qn = null;
  },
  result: function() {
    var t = +Ee;
    return Ee = new Nt(), t;
  }
};
function ws(t, n) {
  un.point = si, ui = Ut = t, ai = Kt = n;
}
function si(t, n) {
  Ut -= t, Kt -= n, Ee.add(At(Ut * Ut + Kt * Kt)), Ut = t, Kt = n;
}
let dr, Ln, gr, yr;
class vr {
  constructor(n) {
    this._append = n == null ? ci : xs(n), this._radius = 4.5, this._ = "";
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
        if (this._append`M${n},${e}`, this._radius !== gr || this._append !== Ln) {
          const r = this._radius, i = this._;
          this._ = "", this._append`m0,${r}a${r},${r} 0 1,1 0,${-2 * r}a${r},${r} 0 1,1 0,${2 * r}z`, gr = r, Ln = this._append, yr = this._, this._ = i;
        }
        this._ += yr;
        break;
      }
    }
  }
  result() {
    const n = this._;
    return this._ = "", n.length ? n : null;
  }
}
function ci(t) {
  let n = 1;
  this._ += t[0];
  for (const e = t.length; n < e; ++n)
    this._ += arguments[n] + t[n];
}
function xs(t) {
  const n = Math.floor(t);
  if (!(n >= 0)) throw new RangeError(`invalid digits: ${t}`);
  if (n > 15) return ci;
  if (n !== dr) {
    const e = 10 ** n;
    dr = n, Ln = function(i) {
      let o = 1;
      this._ += i[0];
      for (const u = i.length; o < u; ++o)
        this._ += Math.round(arguments[o] * e) / e + i[o];
    };
  }
  return Ln;
}
function Ss(t, n) {
  let e = 3, r = 4.5, i, o;
  function u(a) {
    return a && (typeof r == "function" && o.pointRadius(+r.apply(this, arguments)), zt(a, i(o))), o.result();
  }
  return u.area = function(a) {
    return zt(a, i(_t)), _t.result();
  }, u.measure = function(a) {
    return zt(a, i(un)), un.result();
  }, u.bounds = function(a) {
    return zt(a, i(In)), In.result();
  }, u.centroid = function(a) {
    return zt(a, i(ut)), ut.result();
  }, u.projection = function(a) {
    return arguments.length ? (i = a == null ? (t = null, ge) : (t = a).stream, u) : t;
  }, u.context = function(a) {
    return arguments.length ? (o = a == null ? (n = null, new vr(e)) : new oi(n = a), typeof r != "function" && o.pointRadius(r), u) : n;
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
    return n === null && (o = new vr(e)), u;
  }, u.projection(t).digits(e).context(n);
}
function Te(t) {
  return function(n) {
    var e = new be();
    for (var r in t) e[r] = t[r];
    return e.stream = n, e;
  };
}
function be() {
}
be.prototype = {
  constructor: be,
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
function Ce(t, n, e) {
  var r = t.clipExtent && t.clipExtent();
  return t.scale(150).translate([0, 0]), r != null && t.clipExtent(null), zt(e, t.stream(In)), n(In.result()), r != null && t.clipExtent(r), t;
}
function li(t, n, e) {
  return Ce(t, function(r) {
    var i = n[1][0] - n[0][0], o = n[1][1] - n[0][1], u = Math.min(i / (r[1][0] - r[0][0]), o / (r[1][1] - r[0][1])), a = +n[0][0] + (i - u * (r[1][0] + r[0][0])) / 2, f = +n[0][1] + (o - u * (r[1][1] + r[0][1])) / 2;
    t.scale(150 * u).translate([a, f]);
  }, e);
}
function Es(t, n, e) {
  return li(t, [[0, 0], n], e);
}
function bs(t, n, e) {
  return Ce(t, function(r) {
    var i = +n, o = i / (r[1][0] - r[0][0]), u = (i - o * (r[1][0] + r[0][0])) / 2, a = -o * r[0][1];
    t.scale(150 * o).translate([u, a]);
  }, e);
}
function Ms(t, n, e) {
  return Ce(t, function(r) {
    var i = +n, o = i / (r[1][1] - r[0][1]), u = -o * r[0][0], a = (i - o * (r[1][1] + r[0][1])) / 2;
    t.scale(150 * o).translate([u, a]);
  }, e);
}
var mr = 16, $s = G(30 * K);
function _r(t, n) {
  return +n ? ks(t, n) : Ns(t);
}
function Ns(t) {
  return Te({
    point: function(n, e) {
      n = t(n, e), this.stream.point(n[0], n[1]);
    }
  });
}
function ks(t, n) {
  function e(r, i, o, u, a, f, l, s, c, h, d, v, x, w) {
    var m = l - r, E = s - i, $ = m * m + E * E;
    if ($ > 4 * n && x--) {
      var S = u + h, N = a + d, b = f + v, z = At(S * S + N * N + b * b), T = rn(b /= z), P = H(H(b) - 1) < B || H(o - c) < B ? (o + c) / 2 : en(N, S), L = t(P, T), A = L[0], Z = L[1], X = A - r, p = Z - i, g = E * X - m * p;
      (g * g / $ > n || H((m * X + E * p) / $ - 0.5) > 0.3 || u * h + a * d + f * v < $s) && (e(r, i, o, u, a, f, A, Z, P, S /= z, N /= z, b, x, w), w.point(A, Z), e(A, Z, P, S, N, b, l, s, c, h, d, v, x, w));
    }
  }
  return function(r) {
    var i, o, u, a, f, l, s, c, h, d, v, x, w = {
      point: m,
      lineStart: E,
      lineEnd: S,
      polygonStart: function() {
        r.polygonStart(), w.lineStart = N;
      },
      polygonEnd: function() {
        r.polygonEnd(), w.lineStart = E;
      }
    };
    function m(T, P) {
      T = t(T, P), r.point(T[0], T[1]);
    }
    function E() {
      c = NaN, w.point = $, r.lineStart();
    }
    function $(T, P) {
      var L = Ft([T, P]), A = t(T, P);
      e(c, h, s, d, v, x, c = A[0], h = A[1], s = T, d = L[0], v = L[1], x = L[2], mr, r), r.point(c, h);
    }
    function S() {
      w.point = m, r.lineEnd();
    }
    function N() {
      E(), w.point = b, w.lineEnd = z;
    }
    function b(T, P) {
      $(i = T, P), o = c, u = h, a = d, f = v, l = x, w.point = $;
    }
    function z() {
      e(c, h, s, d, v, x, o, u, i, a, f, l, mr, r), w.lineEnd = S, S();
    }
    return w;
  };
}
var As = Te({
  point: function(t, n) {
    this.stream.point(t * K, n * K);
  }
});
function Rs(t) {
  return Te({
    point: function(n, e) {
      var r = t(n, e);
      return this.stream.point(r[0], r[1]);
    }
  });
}
function zs(t, n, e, r, i) {
  function o(u, a) {
    return u *= r, a *= i, [n + t * u, e - t * a];
  }
  return o.invert = function(u, a) {
    return [(u - n) / t * r, (e - a) / t * i];
  }, o;
}
function wr(t, n, e, r, i, o) {
  if (!o) return zs(t, n, e, r, i);
  var u = G(o), a = U(o), f = u * t, l = a * t, s = u / t, c = a / t, h = (a * e - u * n) / t, d = (a * n + u * e) / t;
  function v(x, w) {
    return x *= r, w *= i, [f * x - l * w + n, e - l * x - f * w];
  }
  return v.invert = function(x, w) {
    return [r * (s * x - c * w + h), i * (d - c * x - s * w)];
  }, v;
}
function Ts(t) {
  return Cs(function() {
    return t;
  })();
}
function Cs(t) {
  var n, e = 150, r = 480, i = 250, o = 0, u = 0, a = 0, f = 0, l = 0, s, c = 0, h = 1, d = 1, v = null, x = fr, w = null, m, E, $, S = ge, N = 0.5, b, z, T, P, L;
  function A(g) {
    return T(g[0] * K, g[1] * K);
  }
  function Z(g) {
    return g = T.invert(g[0], g[1]), g && [g[0] * nt, g[1] * nt];
  }
  A.stream = function(g) {
    return P && L === g ? P : P = As(Rs(s)(x(b(S(L = g)))));
  }, A.preclip = function(g) {
    return arguments.length ? (x = g, v = void 0, p()) : x;
  }, A.postclip = function(g) {
    return arguments.length ? (S = g, w = m = E = $ = null, p()) : S;
  }, A.clipAngle = function(g) {
    return arguments.length ? (x = +g ? ss(v = g * K) : (v = null, fr), p()) : v * nt;
  }, A.clipExtent = function(g) {
    return arguments.length ? (S = g == null ? (w = m = E = $ = null, ge) : ls(w = +g[0][0], m = +g[0][1], E = +g[1][0], $ = +g[1][1]), p()) : w == null ? null : [[w, m], [E, $]];
  }, A.scale = function(g) {
    return arguments.length ? (e = +g, X()) : e;
  }, A.translate = function(g) {
    return arguments.length ? (r = +g[0], i = +g[1], X()) : [r, i];
  }, A.center = function(g) {
    return arguments.length ? (o = g[0] % 360 * K, u = g[1] % 360 * K, X()) : [o * nt, u * nt];
  }, A.rotate = function(g) {
    return arguments.length ? (a = g[0] % 360 * K, f = g[1] % 360 * K, l = g.length > 2 ? g[2] % 360 * K : 0, X()) : [a * nt, f * nt, l * nt];
  }, A.angle = function(g) {
    return arguments.length ? (c = g % 360 * K, X()) : c * nt;
  }, A.reflectX = function(g) {
    return arguments.length ? (h = g ? -1 : 1, X()) : h < 0;
  }, A.reflectY = function(g) {
    return arguments.length ? (d = g ? -1 : 1, X()) : d < 0;
  }, A.precision = function(g) {
    return arguments.length ? (b = _r(z, N = g * g), p()) : At(N);
  }, A.fitExtent = function(g, y) {
    return li(A, g, y);
  }, A.fitSize = function(g, y) {
    return Es(A, g, y);
  }, A.fitWidth = function(g, y) {
    return bs(A, g, y);
  }, A.fitHeight = function(g, y) {
    return Ms(A, g, y);
  };
  function X() {
    var g = wr(e, 0, 0, h, d, c).apply(null, n(o, u)), y = wr(e, r - g[0], i - g[1], h, d, c);
    return s = Zr(a, f, l), z = pe(n, y), T = pe(s, z), b = _r(z, N), p();
  }
  function p() {
    return P = L = null, A;
  }
  return function() {
    return n = t.apply(this, arguments), A.invert = n.invert && Z, X();
  };
}
function Pe(t, n) {
  return [t, Wa(Qa((tt + n) / 2))];
}
Pe.invert = function(t, n) {
  return [t, 2 * Kr(Za(n)) - tt];
};
function Ps() {
  return Is(Pe).scale(961 / rt);
}
function Is(t) {
  var n = Ts(t), e = n.center, r = n.scale, i = n.translate, o = n.clipExtent, u = null, a, f, l;
  n.scale = function(c) {
    return arguments.length ? (r(c), s()) : r();
  }, n.translate = function(c) {
    return arguments.length ? (i(c), s()) : i();
  }, n.center = function(c) {
    return arguments.length ? (e(c), s()) : e();
  }, n.clipExtent = function(c) {
    return arguments.length ? (c == null ? u = a = f = l = null : (u = +c[0][0], a = +c[0][1], f = +c[1][0], l = +c[1][1]), s()) : u == null ? null : [[u, a], [f, l]];
  };
  function s() {
    var c = F * r(), h = n(ts(n.rotate()).invert([0, 0]));
    return o(u == null ? [[h[0] - c, h[1] - c], [h[0] + c, h[1] + c]] : t === Pe ? [[Math.max(h[0] - c, u), a], [Math.min(h[0] + c, f), l]] : [[u, Math.max(h[1] - c, a)], [f, Math.min(h[1] + c, l)]]);
  }
  return s();
}
function Fs(t, n, e) {
  return Ps().fitSize([n, e], t);
}
function Ds(t) {
  return Ss(t);
}
const Ls = 0.9;
function fi(t, n, e) {
  const [[r, i], [o, u]] = t, a = Math.max(o - r, 1e-6), f = Math.max(u - i, 1e-6);
  return Ls / Math.max(a / n, f / e);
}
function Xs(t, n, e, r, i) {
  const o = t.bounds(n), [[u, a], [f, l]] = o, s = (u + f) / 2, c = (a + l) / 2, h = Math.min(i, fi(o, e, r));
  return new ct(h, e / 2 - h * s, r / 2 - h * c);
}
function Bs(t, n, e, r) {
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
  return fi(t.bounds(f), e, r);
}
function qs(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}
function Hs(t, n, e, r = 750) {
  const i = pt(t), o = Gr(t), u = performance.now();
  function a(f) {
    const l = Math.min(1, (f - u) / r), s = qs(l), c = new ct(
      o.k + (e.k - o.k) * s,
      o.x + (e.x - o.x) * s,
      o.y + (e.y - o.y) * s
    );
    n.transform(i, c), l < 1 && requestAnimationFrame(a);
  }
  requestAnimationFrame(a);
}
const Os = "https://cdn.jsdelivr.net/gh/DebunkTech/kenya-map@v0.1.0/data", Ys = 12;
function Vs(t) {
  const [n, e] = bt({ width: 0, height: 0 });
  return Xn(() => {
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
function Wt(t) {
  return t.properties;
}
function vn(t, n) {
  if (!(!t || !n))
    return t.features.find((e) => Wt(e).code === n);
}
function jn({
  features: t,
  path: n,
  opacity: e,
  focusable: r,
  onHover: i,
  onLeave: o,
  onActivate: u
}) {
  return /* @__PURE__ */ Y("g", { opacity: e, style: { transition: "opacity 300ms ease" }, children: t.map((a) => {
    const f = Wt(a), l = n(a);
    return l ? /* @__PURE__ */ Y(
      "path",
      {
        className: "kenya-map-area",
        d: l,
        fill: "var(--kenya-map-fill, #d4d4d8)",
        stroke: "var(--kenya-map-stroke, #71717a)",
        strokeWidth: 0.75,
        tabIndex: r ? 0 : -1,
        role: "button",
        "aria-label": f.name,
        style: { cursor: "pointer", outline: "none" },
        onMouseEnter: (s) => i(f.name, s.clientX, s.clientY),
        onMouseMove: (s) => i(f.name, s.clientX, s.clientY),
        onMouseLeave: o,
        onFocus: (s) => {
          const c = s.currentTarget.getBoundingClientRect();
          i(f.name, c.left + c.width / 2, c.top + c.height / 2);
        },
        onBlur: o,
        onClick: () => u(a),
        onKeyDown: (s) => {
          r && s.key === "Enter" && (s.preventDefault(), u(a));
        }
      },
      f.code
    ) : null;
  }) });
}
function mn({ children: t }) {
  return /* @__PURE__ */ Y(
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
function Ks(t) {
  var V, it, J, ot;
  const n = t.boundariesBaseUrl ?? Os, [e, r] = bt({}), i = t.selection !== void 0, o = i ? t.selection : e, u = Lt(t.onSelect);
  u.current = t.onSelect;
  const a = ht(
    (I) => {
      var W;
      i || r(I), (W = u.current) == null || W.call(u, I);
    },
    [i]
  ), f = Lt(null), { width: l, height: s } = Vs(f), [c, h] = Un(`${n}/counties.topojson`), [d, v] = Un(
    o.county ? `${n}/constituencies.topojson` : null
  ), [x, w] = Un(
    o.county ? `${n}/wards/${o.county}.topojson` : null
  ), m = Ua(n), E = c.status === "ready" ? c.data.features : [], $ = Xt(() => d.status !== "ready" || !o.county ? [] : d.data.features.filter((I) => Wt(I).county_code === o.county), [d, o.county]), S = Xt(() => x.status !== "ready" || !o.constituency ? [] : x.data.features.filter((I) => Wt(I).constituency_code === o.constituency), [x, o.constituency]), N = Xt(() => c.status !== "ready" || l === 0 || s === 0 ? null : Fs(c.data, l, s), [c, l, s]), b = Xt(() => N ? Ds(N) : null, [N]), z = Xt(() => !b || l === 0 || s === 0 || m.status !== "ready" ? Ys : Math.max(1, Bs(b, m.data.maxZoomWard.bbox, l, s)), [b, l, s, m]), T = Lt(null), P = Lt(null), L = Lt(null), [A, Z] = bt(nn);
  Xn(() => {
    const I = T.current;
    if (!I || l === 0 || s === 0) return;
    const W = Ba().scaleExtent([1, z]).on("zoom", (Q) => Z(Q.transform));
    return P.current = W, pt(I).call(W), () => {
      pt(I).on(".zoom", null);
    };
  }, [l, s, z]);
  const X = ht(
    (I) => {
      const W = T.current, Q = P.current;
      if (!W || !Q || !b) return;
      const Rt = I ? Xs(b, I, l, s, z) : nn;
      Hs(W, Q, Rt);
    },
    [b, l, s, z]
  ), p = ht(
    (I, W) => {
      const Q = Wt(I), Rt = W === "county" ? { county: Q.code } : W === "constituency" ? { county: Q.county_code, constituency: Q.code } : { county: Q.county_code, constituency: Q.constituency_code, ward: Q.code };
      a(Rt), X(I);
    },
    [a, X]
  ), g = ht(() => {
    !o.county || !o.constituency || (a({ county: o.county, constituency: o.constituency }), X(
      vn(
        d.status === "ready" ? d.data : void 0,
        o.constituency
      )
    ));
  }, [a, X, o.county, o.constituency, d]), y = ht(() => {
    o.county && (a({ county: o.county }), X(vn(c.status === "ready" ? c.data : void 0, o.county)));
  }, [a, X, o.county, c]), _ = ht(() => {
    a({}), X(void 0);
  }, [a, X]), M = ht(() => {
    o.ward ? g() : o.constituency ? y() : o.county && _();
  }, [o.ward, o.constituency, o.county, g, y, _]), [k, R] = bt(null), C = ht((I, W, Q) => {
    const Rt = f.current;
    if (!Rt) return;
    const Ie = Rt.getBoundingClientRect();
    R({ name: I, x: W - Ie.left, y: Q - Ie.top });
  }, []), D = ht(() => R(null), []), O = (it = (V = vn(c.status === "ready" ? c.data : void 0, o.county)) == null ? void 0 : V.properties) == null ? void 0 : it.name, q = (ot = (J = vn(
    d.status === "ready" ? d.data : void 0,
    o.constituency
  )) == null ? void 0 : J.properties) == null ? void 0 : ot.name;
  return /* @__PURE__ */ ft(
    "div",
    {
      ref: f,
      className: t.className,
      style: { position: "relative", width: "100%", height: "100%", minHeight: 300, ...t.style },
      onKeyDown: (I) => {
        I.key === "Escape" && (I.preventDefault(), M());
      },
      children: [
        /* @__PURE__ */ ft(
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
              /* @__PURE__ */ ft("nav", { "aria-label": "Breadcrumb", style: { display: "flex", alignItems: "center", gap: 4 }, children: [
                /* @__PURE__ */ Y("button", { type: "button", onClick: _, style: te(!o.county), children: "Kenya" }),
                o.county && /* @__PURE__ */ ft(Fe, { children: [
                  /* @__PURE__ */ Y("span", { "aria-hidden": "true", children: "›" }),
                  /* @__PURE__ */ Y(
                    "button",
                    {
                      type: "button",
                      onClick: y,
                      style: te(!o.constituency),
                      children: O ?? o.county
                    }
                  )
                ] }),
                o.constituency && /* @__PURE__ */ ft(Fe, { children: [
                  /* @__PURE__ */ Y("span", { "aria-hidden": "true", children: "›" }),
                  /* @__PURE__ */ Y(
                    "button",
                    {
                      type: "button",
                      onClick: g,
                      style: te(!o.ward),
                      children: q ?? o.constituency
                    }
                  )
                ] })
              ] }),
              (o.county || o.constituency) && /* @__PURE__ */ Y("button", { type: "button", onClick: _, style: _n, children: "Reset" })
            ]
          }
        ),
        c.status === "loading" && /* @__PURE__ */ Y(mn, { children: "Loading map…" }),
        c.status === "error" && /* @__PURE__ */ ft(mn, { children: [
          "Failed to load county boundaries: ",
          c.error.message,
          /* @__PURE__ */ Y("br", {}),
          /* @__PURE__ */ Y("button", { type: "button", onClick: h, style: _n, children: "Retry" })
        ] }),
        o.county && d.status === "error" && /* @__PURE__ */ ft(mn, { children: [
          "Failed to load constituency boundaries: ",
          d.error.message,
          /* @__PURE__ */ Y("br", {}),
          /* @__PURE__ */ Y("button", { type: "button", onClick: v, style: _n, children: "Retry" })
        ] }),
        o.constituency && x.status === "error" && /* @__PURE__ */ ft(mn, { children: [
          "Failed to load ward boundaries: ",
          x.error.message,
          /* @__PURE__ */ Y("br", {}),
          /* @__PURE__ */ Y("button", { type: "button", onClick: w, style: _n, children: "Retry" })
        ] }),
        b && /* @__PURE__ */ ft(
          "svg",
          {
            ref: T,
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${l} ${s}`,
            role: "img",
            "aria-label": "Map of Kenya",
            children: [
              /* @__PURE__ */ Y("style", { children: `
            .kenya-map-area {
              vector-effect: non-scaling-stroke;
            }
            .kenya-map-area:focus-visible {
              stroke: var(--kenya-map-focus-color, #2563eb);
              stroke-width: 3;
            }
          ` }),
              /* @__PURE__ */ Y(
                "rect",
                {
                  x: 0,
                  y: 0,
                  width: l,
                  height: s,
                  fill: "transparent",
                  onPointerDown: (I) => {
                    L.current = { x: I.clientX, y: I.clientY };
                  },
                  onClick: (I) => {
                    const W = L.current;
                    (W ? Math.hypot(I.clientX - W.x, I.clientY - W.y) : 0) < 4 && M();
                  }
                }
              ),
              /* @__PURE__ */ ft("g", { transform: `translate(${A.x},${A.y}) scale(${A.k})`, children: [
                /* @__PURE__ */ Y(
                  jn,
                  {
                    features: E,
                    path: b,
                    opacity: o.county ? 0.25 : 1,
                    focusable: !o.county,
                    onHover: C,
                    onLeave: D,
                    onActivate: (I) => p(I, "county")
                  }
                ),
                o.county && /* @__PURE__ */ Y(
                  jn,
                  {
                    features: $,
                    path: b,
                    opacity: o.constituency ? 0.25 : 1,
                    focusable: !o.constituency,
                    onHover: C,
                    onLeave: D,
                    onActivate: (I) => p(I, "constituency")
                  }
                ),
                o.constituency && /* @__PURE__ */ Y(
                  jn,
                  {
                    features: S,
                    path: b,
                    opacity: 1,
                    focusable: !0,
                    onHover: C,
                    onLeave: D,
                    onActivate: (I) => p(I, "ward")
                  }
                )
              ] })
            ]
          }
        ),
        k && /* @__PURE__ */ Y(
          "div",
          {
            style: {
              position: "absolute",
              left: k.x + 12,
              top: k.y + 12,
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
            children: k.name
          }
        )
      ]
    }
  );
}
function te(t) {
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
const _n = {
  font: "inherit",
  fontSize: 12,
  padding: "2px 8px",
  borderRadius: 4,
  border: "1px solid var(--kenya-map-stroke, #71717a)",
  background: "var(--kenya-map-fill, #fff)",
  cursor: "pointer"
};
export {
  Ks as KenyaMap
};
//# sourceMappingURL=kenya-map.js.map
