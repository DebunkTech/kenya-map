import { jsx as L, jsxs as Q, Fragment as fr } from "react/jsx-runtime";
import { useState as xt, useEffect as _t, useCallback as at, useRef as Ft, useMemo as kt } from "react";
var ve = "http://www.w3.org/1999/xhtml";
const hr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ve,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function jn(t) {
  var n = t += "", e = n.indexOf(":");
  return e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)), hr.hasOwnProperty(n) ? { space: hr[n], local: t } : t;
}
function uo(t) {
  return function() {
    var n = this.ownerDocument, e = this.namespaceURI;
    return e === ve && n.documentElement.namespaceURI === ve ? n.createElement(t) : n.createElementNS(e, t);
  };
}
function ao(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function ii(t) {
  var n = jn(t);
  return (n.local ? ao : uo)(n);
}
function so() {
}
function Ve(t) {
  return t == null ? so : function() {
    return this.querySelector(t);
  };
}
function co(t) {
  typeof t != "function" && (t = Ve(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], u = o.length, a = r[i] = new Array(u), f, c, s = 0; s < u; ++s)
      (f = o[s]) && (c = t.call(f, f.__data__, s, o)) && ("__data__" in f && (c.__data__ = f.__data__), a[s] = c);
  return new it(r, this._parents);
}
function lo(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function fo() {
  return [];
}
function oi(t) {
  return t == null ? fo : function() {
    return this.querySelectorAll(t);
  };
}
function ho(t) {
  return function() {
    return lo(t.apply(this, arguments));
  };
}
function po(t) {
  typeof t == "function" ? t = ho(t) : t = oi(t);
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var u = n[o], a = u.length, f, c = 0; c < a; ++c)
      (f = u[c]) && (r.push(t.call(f, f.__data__, c, u)), i.push(f));
  return new it(r, i);
}
function ui(t) {
  return function() {
    return this.matches(t);
  };
}
function ai(t) {
  return function(n) {
    return n.matches(t);
  };
}
var go = Array.prototype.find;
function yo(t) {
  return function() {
    return go.call(this.children, t);
  };
}
function mo() {
  return this.firstElementChild;
}
function vo(t) {
  return this.select(t == null ? mo : yo(typeof t == "function" ? t : ai(t)));
}
var wo = Array.prototype.filter;
function _o() {
  return Array.from(this.children);
}
function xo(t) {
  return function() {
    return wo.call(this.children, t);
  };
}
function So(t) {
  return this.selectAll(t == null ? _o : xo(typeof t == "function" ? t : ai(t)));
}
function bo(t) {
  typeof t != "function" && (t = ui(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], u = o.length, a = r[i] = [], f, c = 0; c < u; ++c)
      (f = o[c]) && t.call(f, f.__data__, c, o) && a.push(f);
  return new it(r, this._parents);
}
function si(t) {
  return new Array(t.length);
}
function Mo() {
  return new it(this._enter || this._groups.map(si), this._parents);
}
function Pn(t, n) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n;
}
Pn.prototype = {
  constructor: Pn,
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
function Eo(t) {
  return function() {
    return t;
  };
}
function ko(t, n, e, r, i, o) {
  for (var u = 0, a, f = n.length, c = o.length; u < c; ++u)
    (a = n[u]) ? (a.__data__ = o[u], r[u] = a) : e[u] = new Pn(t, o[u]);
  for (; u < f; ++u)
    (a = n[u]) && (i[u] = a);
}
function No(t, n, e, r, i, o, u) {
  var a, f, c = /* @__PURE__ */ new Map(), s = n.length, l = o.length, h = new Array(s), p;
  for (a = 0; a < s; ++a)
    (f = n[a]) && (h[a] = p = u.call(f, f.__data__, a, n) + "", c.has(p) ? i[a] = f : c.set(p, f));
  for (a = 0; a < l; ++a)
    p = u.call(t, o[a], a, o) + "", (f = c.get(p)) ? (r[a] = f, f.__data__ = o[a], c.delete(p)) : e[a] = new Pn(t, o[a]);
  for (a = 0; a < s; ++a)
    (f = n[a]) && c.get(h[a]) === f && (i[a] = f);
}
function $o(t) {
  return t.__data__;
}
function Ao(t, n) {
  if (!arguments.length) return Array.from(this, $o);
  var e = n ? No : ko, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Eo(t));
  for (var o = i.length, u = new Array(o), a = new Array(o), f = new Array(o), c = 0; c < o; ++c) {
    var s = r[c], l = i[c], h = l.length, p = zo(t.call(s, s && s.__data__, c, r)), m = p.length, _ = a[c] = new Array(m), S = u[c] = new Array(m), w = f[c] = new Array(h);
    e(s, l, _, S, w, p, n);
    for (var M = 0, k = 0, b, $; M < m; ++M)
      if (b = _[M]) {
        for (M >= k && (k = M + 1); !($ = S[k]) && ++k < m; ) ;
        b._next = $ || null;
      }
  }
  return u = new it(u, r), u._enter = a, u._exit = f, u;
}
function zo(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ro() {
  return new it(this._exit || this._groups.map(si), this._parents);
}
function Co(t, n, e) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), n != null && (i = n(i), i && (i = i.selection())), e == null ? o.remove() : e(o), r && i ? r.merge(i).order() : i;
}
function To(t) {
  for (var n = t.selection ? t.selection() : t, e = this._groups, r = n._groups, i = e.length, o = r.length, u = Math.min(i, o), a = new Array(i), f = 0; f < u; ++f)
    for (var c = e[f], s = r[f], l = c.length, h = a[f] = new Array(l), p, m = 0; m < l; ++m)
      (p = c[m] || s[m]) && (h[m] = p);
  for (; f < i; ++f)
    a[f] = e[f];
  return new it(a, this._parents);
}
function Po() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], u; --i >= 0; )
      (u = r[i]) && (o && u.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(u, o), o = u);
  return this;
}
function Io(t) {
  t || (t = Fo);
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
function Fo(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Do() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Lo() {
  return Array.from(this);
}
function Bo() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var u = r[i];
      if (u) return u;
    }
  return null;
}
function Xo() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function qo() {
  return !this.node();
}
function Oo(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, u = i.length, a; o < u; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function Ho(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Yo(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Vo(t, n) {
  return function() {
    this.setAttribute(t, n);
  };
}
function Uo(t, n) {
  return function() {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function Go(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function Wo(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e);
  };
}
function Ko(t, n) {
  var e = jn(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each((n == null ? e.local ? Yo : Ho : typeof n == "function" ? e.local ? Wo : Go : e.local ? Uo : Vo)(e, n));
}
function ci(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Zo(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Jo(t, n, e) {
  return function() {
    this.style.setProperty(t, n, e);
  };
}
function Qo(t, n, e) {
  return function() {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function jo(t, n, e) {
  return arguments.length > 1 ? this.each((n == null ? Zo : typeof n == "function" ? Qo : Jo)(t, n, e ?? "")) : qt(this.node(), t);
}
function qt(t, n) {
  return t.style.getPropertyValue(n) || ci(t).getComputedStyle(t, null).getPropertyValue(n);
}
function tu(t) {
  return function() {
    delete this[t];
  };
}
function nu(t, n) {
  return function() {
    this[t] = n;
  };
}
function eu(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : this[t] = e;
  };
}
function ru(t, n) {
  return arguments.length > 1 ? this.each((n == null ? tu : typeof n == "function" ? eu : nu)(t, n)) : this.node()[t];
}
function li(t) {
  return t.trim().split(/^|\s+/);
}
function Ue(t) {
  return t.classList || new fi(t);
}
function fi(t) {
  this._node = t, this._names = li(t.getAttribute("class") || "");
}
fi.prototype = {
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
function hi(t, n) {
  for (var e = Ue(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function di(t, n) {
  for (var e = Ue(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function iu(t) {
  return function() {
    hi(this, t);
  };
}
function ou(t) {
  return function() {
    di(this, t);
  };
}
function uu(t, n) {
  return function() {
    (n.apply(this, arguments) ? hi : di)(this, t);
  };
}
function au(t, n) {
  var e = li(t + "");
  if (arguments.length < 2) {
    for (var r = Ue(this.node()), i = -1, o = e.length; ++i < o; ) if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? uu : n ? iu : ou)(e, n));
}
function su() {
  this.textContent = "";
}
function cu(t) {
  return function() {
    this.textContent = t;
  };
}
function lu(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function fu(t) {
  return arguments.length ? this.each(t == null ? su : (typeof t == "function" ? lu : cu)(t)) : this.node().textContent;
}
function hu() {
  this.innerHTML = "";
}
function du(t) {
  return function() {
    this.innerHTML = t;
  };
}
function pu(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function gu(t) {
  return arguments.length ? this.each(t == null ? hu : (typeof t == "function" ? pu : du)(t)) : this.node().innerHTML;
}
function yu() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function mu() {
  return this.each(yu);
}
function vu() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function wu() {
  return this.each(vu);
}
function _u(t) {
  var n = typeof t == "function" ? t : ii(t);
  return this.select(function() {
    return this.appendChild(n.apply(this, arguments));
  });
}
function xu() {
  return null;
}
function Su(t, n) {
  var e = typeof t == "function" ? t : ii(t), r = n == null ? xu : typeof n == "function" ? n : Ve(n);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function bu() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Mu() {
  return this.each(bu);
}
function Eu() {
  var t = this.cloneNode(!1), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function ku() {
  var t = this.cloneNode(!0), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Nu(t) {
  return this.select(t ? ku : Eu);
}
function $u(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Au(t) {
  return function(n) {
    t.call(this, n, this.__data__);
  };
}
function zu(t) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var e = "", r = n.indexOf(".");
    return r >= 0 && (e = n.slice(r + 1), n = n.slice(0, r)), { type: n, name: e };
  });
}
function Ru(t) {
  return function() {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
        o = n[e], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : n[++r] = o;
      ++r ? n.length = r : delete this.__on;
    }
  };
}
function Cu(t, n, e) {
  return function() {
    var r = this.__on, i, o = Au(n);
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
function Tu(t, n, e) {
  var r = zu(t + ""), i, o = r.length, u;
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
  for (a = n ? Cu : Ru, i = 0; i < o; ++i) this.each(a(r[i], n, e));
  return this;
}
function pi(t, n, e) {
  var r = ci(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i);
}
function Pu(t, n) {
  return function() {
    return pi(this, t, n);
  };
}
function Iu(t, n) {
  return function() {
    return pi(this, t, n.apply(this, arguments));
  };
}
function Fu(t, n) {
  return this.each((typeof n == "function" ? Iu : Pu)(t, n));
}
function* Du() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, u; i < o; ++i)
      (u = r[i]) && (yield u);
}
var gi = [null];
function it(t, n) {
  this._groups = t, this._parents = n;
}
function fn() {
  return new it([[document.documentElement]], gi);
}
function Lu() {
  return this;
}
it.prototype = fn.prototype = {
  constructor: it,
  select: co,
  selectAll: po,
  selectChild: vo,
  selectChildren: So,
  filter: bo,
  data: Ao,
  enter: Mo,
  exit: Ro,
  join: Co,
  merge: To,
  selection: Lu,
  order: Po,
  sort: Io,
  call: Do,
  nodes: Lo,
  node: Bo,
  size: Xo,
  empty: qo,
  each: Oo,
  attr: Ko,
  style: jo,
  property: ru,
  classed: au,
  text: fu,
  html: gu,
  raise: mu,
  lower: wu,
  append: _u,
  insert: Su,
  remove: Mu,
  clone: Nu,
  datum: $u,
  on: Tu,
  dispatch: Fu,
  [Symbol.iterator]: Du
};
function pt(t) {
  return typeof t == "string" ? new it([[document.querySelector(t)]], [document.documentElement]) : new it([[t]], gi);
}
function Bu(t) {
  let n;
  for (; n = t.sourceEvent; ) t = n;
  return t;
}
function Nt(t, n) {
  if (t = Bu(t), n === void 0 && (n = t.currentTarget), n) {
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
var Xu = { value: () => {
} };
function Ge() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new $n(e);
}
function $n(t) {
  this._ = t;
}
function qu(t, n) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var r = "", i = e.indexOf(".");
    if (i >= 0 && (r = e.slice(i + 1), e = e.slice(0, i)), e && !n.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    return { type: e, name: r };
  });
}
$n.prototype = Ge.prototype = {
  constructor: $n,
  on: function(t, n) {
    var e = this._, r = qu(t + "", e), i, o = -1, u = r.length;
    if (arguments.length < 2) {
      for (; ++o < u; ) if ((i = (t = r[o]).type) && (i = Ou(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function") throw new Error("invalid callback: " + n);
    for (; ++o < u; )
      if (i = (t = r[o]).type) e[i] = dr(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = dr(e[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new $n(t);
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
function Ou(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n)
      return i.value;
}
function dr(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      t[r] = Xu, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
const we = { capture: !0, passive: !1 };
function _e(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Hu(t) {
  var n = t.document.documentElement, e = pt(t).on("dragstart.drag", _e, we);
  "onselectstart" in n ? e.on("selectstart.drag", _e, we) : (n.__noselect = n.style.MozUserSelect, n.style.MozUserSelect = "none");
}
function Yu(t, n) {
  var e = t.document.documentElement, r = pt(t).on("dragstart.drag", null);
  n && (r.on("click.drag", _e, we), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in e ? r.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect);
}
function We(t, n, e) {
  t.prototype = n.prototype = e, e.constructor = t;
}
function yi(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function hn() {
}
var en = 0.7, In = 1 / en, Xt = "\\s*([+-]?\\d+)\\s*", rn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", mt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Vu = /^#([0-9a-f]{3,8})$/, Uu = new RegExp(`^rgb\\(${Xt},${Xt},${Xt}\\)$`), Gu = new RegExp(`^rgb\\(${mt},${mt},${mt}\\)$`), Wu = new RegExp(`^rgba\\(${Xt},${Xt},${Xt},${rn}\\)$`), Ku = new RegExp(`^rgba\\(${mt},${mt},${mt},${rn}\\)$`), Zu = new RegExp(`^hsl\\(${rn},${mt},${mt}\\)$`), Ju = new RegExp(`^hsla\\(${rn},${mt},${mt},${rn}\\)$`), pr = {
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
We(hn, zt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: gr,
  // Deprecated! Use color.formatHex.
  formatHex: gr,
  formatHex8: Qu,
  formatHsl: ju,
  formatRgb: yr,
  toString: yr
});
function gr() {
  return this.rgb().formatHex();
}
function Qu() {
  return this.rgb().formatHex8();
}
function ju() {
  return mi(this).formatHsl();
}
function yr() {
  return this.rgb().formatRgb();
}
function zt(t) {
  var n, e;
  return t = (t + "").trim().toLowerCase(), (n = Vu.exec(t)) ? (e = n[1].length, n = parseInt(n[1], 16), e === 6 ? mr(n) : e === 3 ? new tt(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, (n & 15) << 4 | n & 15, 1) : e === 8 ? yn(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (n & 255) / 255) : e === 4 ? yn(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, ((n & 15) << 4 | n & 15) / 255) : null) : (n = Uu.exec(t)) ? new tt(n[1], n[2], n[3], 1) : (n = Gu.exec(t)) ? new tt(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, 1) : (n = Wu.exec(t)) ? yn(n[1], n[2], n[3], n[4]) : (n = Ku.exec(t)) ? yn(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, n[4]) : (n = Zu.exec(t)) ? _r(n[1], n[2] / 100, n[3] / 100, 1) : (n = Ju.exec(t)) ? _r(n[1], n[2] / 100, n[3] / 100, n[4]) : pr.hasOwnProperty(t) ? mr(pr[t]) : t === "transparent" ? new tt(NaN, NaN, NaN, 0) : null;
}
function mr(t) {
  return new tt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function yn(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new tt(t, n, e, r);
}
function ta(t) {
  return t instanceof hn || (t = zt(t)), t ? (t = t.rgb(), new tt(t.r, t.g, t.b, t.opacity)) : new tt();
}
function xe(t, n, e, r) {
  return arguments.length === 1 ? ta(t) : new tt(t, n, e, r ?? 1);
}
function tt(t, n, e, r) {
  this.r = +t, this.g = +n, this.b = +e, this.opacity = +r;
}
We(tt, xe, yi(hn, {
  brighter(t) {
    return t = t == null ? In : Math.pow(In, t), new tt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? en : Math.pow(en, t), new tt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new tt(At(this.r), At(this.g), At(this.b), Fn(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: vr,
  // Deprecated! Use color.formatHex.
  formatHex: vr,
  formatHex8: na,
  formatRgb: wr,
  toString: wr
}));
function vr() {
  return `#${$t(this.r)}${$t(this.g)}${$t(this.b)}`;
}
function na() {
  return `#${$t(this.r)}${$t(this.g)}${$t(this.b)}${$t((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function wr() {
  const t = Fn(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${At(this.r)}, ${At(this.g)}, ${At(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Fn(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function At(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function $t(t) {
  return t = At(t), (t < 16 ? "0" : "") + t.toString(16);
}
function _r(t, n, e, r) {
  return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new ft(t, n, e, r);
}
function mi(t) {
  if (t instanceof ft) return new ft(t.h, t.s, t.l, t.opacity);
  if (t instanceof hn || (t = zt(t)), !t) return new ft();
  if (t instanceof ft) return t;
  t = t.rgb();
  var n = t.r / 255, e = t.g / 255, r = t.b / 255, i = Math.min(n, e, r), o = Math.max(n, e, r), u = NaN, a = o - i, f = (o + i) / 2;
  return a ? (n === o ? u = (e - r) / a + (e < r) * 6 : e === o ? u = (r - n) / a + 2 : u = (n - e) / a + 4, a /= f < 0.5 ? o + i : 2 - o - i, u *= 60) : a = f > 0 && f < 1 ? 0 : u, new ft(u, a, f, t.opacity);
}
function ea(t, n, e, r) {
  return arguments.length === 1 ? mi(t) : new ft(t, n, e, r ?? 1);
}
function ft(t, n, e, r) {
  this.h = +t, this.s = +n, this.l = +e, this.opacity = +r;
}
We(ft, ea, yi(hn, {
  brighter(t) {
    return t = t == null ? In : Math.pow(In, t), new ft(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? en : Math.pow(en, t), new ft(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, n = isNaN(t) || isNaN(this.s) ? 0 : this.s, e = this.l, r = e + (e < 0.5 ? e : 1 - e) * n, i = 2 * e - r;
    return new tt(
      oe(t >= 240 ? t - 240 : t + 120, i, r),
      oe(t, i, r),
      oe(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new ft(xr(this.h), mn(this.s), mn(this.l), Fn(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Fn(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${xr(this.h)}, ${mn(this.s) * 100}%, ${mn(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function xr(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function mn(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function oe(t, n, e) {
  return (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n) * 255;
}
const Ke = (t) => () => t;
function ra(t, n) {
  return function(e) {
    return t + e * n;
  };
}
function ia(t, n, e) {
  return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e, function(r) {
    return Math.pow(t + r * n, e);
  };
}
function oa(t) {
  return (t = +t) == 1 ? vi : function(n, e) {
    return e - n ? ia(n, e, t) : Ke(isNaN(n) ? e : n);
  };
}
function vi(t, n) {
  var e = n - t;
  return e ? ra(t, e) : Ke(isNaN(t) ? n : t);
}
const Dn = (function t(n) {
  var e = oa(n);
  function r(i, o) {
    var u = e((i = xe(i)).r, (o = xe(o)).r), a = e(i.g, o.g), f = e(i.b, o.b), c = vi(i.opacity, o.opacity);
    return function(s) {
      return i.r = u(s), i.g = a(s), i.b = f(s), i.opacity = c(s), i + "";
    };
  }
  return r.gamma = t, r;
})(1);
function ua(t, n) {
  n || (n = []);
  var e = t ? Math.min(n.length, t.length) : 0, r = n.slice(), i;
  return function(o) {
    for (i = 0; i < e; ++i) r[i] = t[i] * (1 - o) + n[i] * o;
    return r;
  };
}
function aa(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function sa(t, n) {
  var e = n ? n.length : 0, r = t ? Math.min(e, t.length) : 0, i = new Array(r), o = new Array(e), u;
  for (u = 0; u < r; ++u) i[u] = Ze(t[u], n[u]);
  for (; u < e; ++u) o[u] = n[u];
  return function(a) {
    for (u = 0; u < r; ++u) o[u] = i[u](a);
    return o;
  };
}
function ca(t, n) {
  var e = /* @__PURE__ */ new Date();
  return t = +t, n = +n, function(r) {
    return e.setTime(t * (1 - r) + n * r), e;
  };
}
function lt(t, n) {
  return t = +t, n = +n, function(e) {
    return t * (1 - e) + n * e;
  };
}
function la(t, n) {
  var e = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (n === null || typeof n != "object") && (n = {});
  for (i in n)
    i in t ? e[i] = Ze(t[i], n[i]) : r[i] = n[i];
  return function(o) {
    for (i in e) r[i] = e[i](o);
    return r;
  };
}
var Se = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ue = new RegExp(Se.source, "g");
function fa(t) {
  return function() {
    return t;
  };
}
function ha(t) {
  return function(n) {
    return t(n) + "";
  };
}
function wi(t, n) {
  var e = Se.lastIndex = ue.lastIndex = 0, r, i, o, u = -1, a = [], f = [];
  for (t = t + "", n = n + ""; (r = Se.exec(t)) && (i = ue.exec(n)); )
    (o = i.index) > e && (o = n.slice(e, o), a[u] ? a[u] += o : a[++u] = o), (r = r[0]) === (i = i[0]) ? a[u] ? a[u] += i : a[++u] = i : (a[++u] = null, f.push({ i: u, x: lt(r, i) })), e = ue.lastIndex;
  return e < n.length && (o = n.slice(e), a[u] ? a[u] += o : a[++u] = o), a.length < 2 ? f[0] ? ha(f[0].x) : fa(n) : (n = f.length, function(c) {
    for (var s = 0, l; s < n; ++s) a[(l = f[s]).i] = l.x(c);
    return a.join("");
  });
}
function Ze(t, n) {
  var e = typeof n, r;
  return n == null || e === "boolean" ? Ke(n) : (e === "number" ? lt : e === "string" ? (r = zt(n)) ? (n = r, Dn) : wi : n instanceof zt ? Dn : n instanceof Date ? ca : aa(n) ? ua : Array.isArray(n) ? sa : typeof n.valueOf != "function" && typeof n.toString != "function" || isNaN(n) ? la : lt)(t, n);
}
function da(t, n) {
  return t = +t, n = +n, function(e) {
    return Math.round(t * (1 - e) + n * e);
  };
}
var Sr = 180 / Math.PI, be = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function _i(t, n, e, r, i, o) {
  var u, a, f;
  return (u = Math.sqrt(t * t + n * n)) && (t /= u, n /= u), (f = t * e + n * r) && (e -= t * f, r -= n * f), (a = Math.sqrt(e * e + r * r)) && (e /= a, r /= a, f /= a), t * r < n * e && (t = -t, n = -n, f = -f, u = -u), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(n, t) * Sr,
    skewX: Math.atan(f) * Sr,
    scaleX: u,
    scaleY: a
  };
}
var vn;
function pa(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return n.isIdentity ? be : _i(n.a, n.b, n.c, n.d, n.e, n.f);
}
function ga(t) {
  return t == null || (vn || (vn = document.createElementNS("http://www.w3.org/2000/svg", "g")), vn.setAttribute("transform", t), !(t = vn.transform.baseVal.consolidate())) ? be : (t = t.matrix, _i(t.a, t.b, t.c, t.d, t.e, t.f));
}
function xi(t, n, e, r) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, s, l, h, p, m) {
    if (c !== l || s !== h) {
      var _ = p.push("translate(", null, n, null, e);
      m.push({ i: _ - 4, x: lt(c, l) }, { i: _ - 2, x: lt(s, h) });
    } else (l || h) && p.push("translate(" + l + n + h + e);
  }
  function u(c, s, l, h) {
    c !== s ? (c - s > 180 ? s += 360 : s - c > 180 && (c += 360), h.push({ i: l.push(i(l) + "rotate(", null, r) - 2, x: lt(c, s) })) : s && l.push(i(l) + "rotate(" + s + r);
  }
  function a(c, s, l, h) {
    c !== s ? h.push({ i: l.push(i(l) + "skewX(", null, r) - 2, x: lt(c, s) }) : s && l.push(i(l) + "skewX(" + s + r);
  }
  function f(c, s, l, h, p, m) {
    if (c !== l || s !== h) {
      var _ = p.push(i(p) + "scale(", null, ",", null, ")");
      m.push({ i: _ - 4, x: lt(c, l) }, { i: _ - 2, x: lt(s, h) });
    } else (l !== 1 || h !== 1) && p.push(i(p) + "scale(" + l + "," + h + ")");
  }
  return function(c, s) {
    var l = [], h = [];
    return c = t(c), s = t(s), o(c.translateX, c.translateY, s.translateX, s.translateY, l, h), u(c.rotate, s.rotate, l, h), a(c.skewX, s.skewX, l, h), f(c.scaleX, c.scaleY, s.scaleX, s.scaleY, l, h), c = s = null, function(p) {
      for (var m = -1, _ = h.length, S; ++m < _; ) l[(S = h[m]).i] = S.x(p);
      return l.join("");
    };
  };
}
var ya = xi(pa, "px, ", "px)", "deg)"), ma = xi(ga, ", ", ")", ")"), va = 1e-12;
function br(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function wa(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function _a(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const xa = (function t(n, e, r) {
  function i(o, u) {
    var a = o[0], f = o[1], c = o[2], s = u[0], l = u[1], h = u[2], p = s - a, m = l - f, _ = p * p + m * m, S, w;
    if (_ < va)
      w = Math.log(h / c) / n, S = function(I) {
        return [
          a + I * p,
          f + I * m,
          c * Math.exp(n * I * w)
        ];
      };
    else {
      var M = Math.sqrt(_), k = (h * h - c * c + r * _) / (2 * c * e * M), b = (h * h - c * c - r * _) / (2 * h * e * M), $ = Math.log(Math.sqrt(k * k + 1) - k), v = Math.log(Math.sqrt(b * b + 1) - b);
      w = (v - $) / n, S = function(I) {
        var F = I * w, P = br($), X = c / (e * M) * (P * _a(n * F + $) - wa($));
        return [
          a + X * p,
          f + X * m,
          c * P / br(n * F + $)
        ];
      };
    }
    return S.duration = w * 1e3 * n / Math.SQRT2, S;
  }
  return i.rho = function(o) {
    var u = Math.max(1e-3, +o), a = u * u, f = a * a;
    return t(u, a, f);
  }, i;
})(Math.SQRT2, 2, 4);
var Ot = 0, Wt = 0, Ut = 0, Si = 1e3, Ln, Kt, Bn = 0, Rt = 0, te = 0, on = typeof performance == "object" && performance.now ? performance : Date, bi = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Je() {
  return Rt || (bi(Sa), Rt = on.now() + te);
}
function Sa() {
  Rt = 0;
}
function Xn() {
  this._call = this._time = this._next = null;
}
Xn.prototype = Mi.prototype = {
  constructor: Xn,
  restart: function(t, n, e) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    e = (e == null ? Je() : +e) + (n == null ? 0 : +n), !this._next && Kt !== this && (Kt ? Kt._next = this : Ln = this, Kt = this), this._call = t, this._time = e, Me();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Me());
  }
};
function Mi(t, n, e) {
  var r = new Xn();
  return r.restart(t, n, e), r;
}
function ba() {
  Je(), ++Ot;
  for (var t = Ln, n; t; )
    (n = Rt - t._time) >= 0 && t._call.call(void 0, n), t = t._next;
  --Ot;
}
function Mr() {
  Rt = (Bn = on.now()) + te, Ot = Wt = 0;
  try {
    ba();
  } finally {
    Ot = 0, Ea(), Rt = 0;
  }
}
function Ma() {
  var t = on.now(), n = t - Bn;
  n > Si && (te -= n, Bn = t);
}
function Ea() {
  for (var t, n = Ln, e, r = 1 / 0; n; )
    n._call ? (r > n._time && (r = n._time), t = n, n = n._next) : (e = n._next, n._next = null, n = t ? t._next = e : Ln = e);
  Kt = t, Me(r);
}
function Me(t) {
  if (!Ot) {
    Wt && (Wt = clearTimeout(Wt));
    var n = t - Rt;
    n > 24 ? (t < 1 / 0 && (Wt = setTimeout(Mr, t - on.now() - te)), Ut && (Ut = clearInterval(Ut))) : (Ut || (Bn = on.now(), Ut = setInterval(Ma, Si)), Ot = 1, bi(Mr));
  }
}
function Er(t, n, e) {
  var r = new Xn();
  return n = n == null ? 0 : +n, r.restart((i) => {
    r.stop(), t(i + n);
  }, n, e), r;
}
var ka = Ge("start", "end", "cancel", "interrupt"), Na = [], Ei = 0, kr = 1, Ee = 2, An = 3, Nr = 4, ke = 5, zn = 6;
function ne(t, n, e, r, i, o) {
  var u = t.__transition;
  if (!u) t.__transition = {};
  else if (e in u) return;
  $a(t, e, {
    name: n,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: ka,
    tween: Na,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Ei
  });
}
function Qe(t, n) {
  var e = dt(t, n);
  if (e.state > Ei) throw new Error("too late; already scheduled");
  return e;
}
function vt(t, n) {
  var e = dt(t, n);
  if (e.state > An) throw new Error("too late; already running");
  return e;
}
function dt(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function $a(t, n, e) {
  var r = t.__transition, i;
  r[n] = e, e.timer = Mi(o, 0, e.time);
  function o(c) {
    e.state = kr, e.timer.restart(u, e.delay, e.time), e.delay <= c && u(c - e.delay);
  }
  function u(c) {
    var s, l, h, p;
    if (e.state !== kr) return f();
    for (s in r)
      if (p = r[s], p.name === e.name) {
        if (p.state === An) return Er(u);
        p.state === Nr ? (p.state = zn, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[s]) : +s < n && (p.state = zn, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[s]);
      }
    if (Er(function() {
      e.state === An && (e.state = Nr, e.timer.restart(a, e.delay, e.time), a(c));
    }), e.state = Ee, e.on.call("start", t, t.__data__, e.index, e.group), e.state === Ee) {
      for (e.state = An, i = new Array(h = e.tween.length), s = 0, l = -1; s < h; ++s)
        (p = e.tween[s].value.call(t, t.__data__, e.index, e.group)) && (i[++l] = p);
      i.length = l + 1;
    }
  }
  function a(c) {
    for (var s = c < e.duration ? e.ease.call(null, c / e.duration) : (e.timer.restart(f), e.state = ke, 1), l = -1, h = i.length; ++l < h; )
      i[l].call(t, s);
    e.state === ke && (e.on.call("end", t, t.__data__, e.index, e.group), f());
  }
  function f() {
    e.state = zn, e.timer.stop(), delete r[n];
    for (var c in r) return;
    delete t.__transition;
  }
}
function Rn(t, n) {
  var e = t.__transition, r, i, o = !0, u;
  if (e) {
    n = n == null ? null : n + "";
    for (u in e) {
      if ((r = e[u]).name !== n) {
        o = !1;
        continue;
      }
      i = r.state > Ee && r.state < ke, r.state = zn, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete e[u];
    }
    o && delete t.__transition;
  }
}
function Aa(t) {
  return this.each(function() {
    Rn(this, t);
  });
}
function za(t, n) {
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
function Ra(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function() {
    var o = vt(this, t), u = o.tween;
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
function Ca(t, n) {
  var e = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = dt(this.node(), e).tween, i = 0, o = r.length, u; i < o; ++i)
      if ((u = r[i]).name === t)
        return u.value;
    return null;
  }
  return this.each((n == null ? za : Ra)(e, t, n));
}
function je(t, n, e) {
  var r = t._id;
  return t.each(function() {
    var i = vt(this, r);
    (i.value || (i.value = {}))[n] = e.apply(this, arguments);
  }), function(i) {
    return dt(i, r).value[n];
  };
}
function ki(t, n) {
  var e;
  return (typeof n == "number" ? lt : n instanceof zt ? Dn : (e = zt(n)) ? (n = e, Dn) : wi)(t, n);
}
function Ta(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Pa(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ia(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var u = this.getAttribute(t);
    return u === i ? null : u === r ? o : o = n(r = u, e);
  };
}
function Fa(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var u = this.getAttributeNS(t.space, t.local);
    return u === i ? null : u === r ? o : o = n(r = u, e);
  };
}
function Da(t, n, e) {
  var r, i, o;
  return function() {
    var u, a = e(this), f;
    return a == null ? void this.removeAttribute(t) : (u = this.getAttribute(t), f = a + "", u === f ? null : u === r && f === i ? o : (i = f, o = n(r = u, a)));
  };
}
function La(t, n, e) {
  var r, i, o;
  return function() {
    var u, a = e(this), f;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (u = this.getAttributeNS(t.space, t.local), f = a + "", u === f ? null : u === r && f === i ? o : (i = f, o = n(r = u, a)));
  };
}
function Ba(t, n) {
  var e = jn(t), r = e === "transform" ? ma : ki;
  return this.attrTween(t, typeof n == "function" ? (e.local ? La : Da)(e, r, je(this, "attr." + t, n)) : n == null ? (e.local ? Pa : Ta)(e) : (e.local ? Fa : Ia)(e, r, n));
}
function Xa(t, n) {
  return function(e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function qa(t, n) {
  return function(e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Oa(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && qa(t, o)), e;
  }
  return i._value = n, i;
}
function Ha(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Xa(t, o)), e;
  }
  return i._value = n, i;
}
function Ya(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = jn(t);
  return this.tween(e, (r.local ? Oa : Ha)(r, n));
}
function Va(t, n) {
  return function() {
    Qe(this, t).delay = +n.apply(this, arguments);
  };
}
function Ua(t, n) {
  return n = +n, function() {
    Qe(this, t).delay = n;
  };
}
function Ga(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Va : Ua)(n, t)) : dt(this.node(), n).delay;
}
function Wa(t, n) {
  return function() {
    vt(this, t).duration = +n.apply(this, arguments);
  };
}
function Ka(t, n) {
  return n = +n, function() {
    vt(this, t).duration = n;
  };
}
function Za(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Wa : Ka)(n, t)) : dt(this.node(), n).duration;
}
function Ja(t, n) {
  if (typeof n != "function") throw new Error();
  return function() {
    vt(this, t).ease = n;
  };
}
function Qa(t) {
  var n = this._id;
  return arguments.length ? this.each(Ja(n, t)) : dt(this.node(), n).ease;
}
function ja(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    vt(this, t).ease = e;
  };
}
function ts(t) {
  if (typeof t != "function") throw new Error();
  return this.each(ja(this._id, t));
}
function ns(t) {
  typeof t != "function" && (t = ui(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], u = o.length, a = r[i] = [], f, c = 0; c < u; ++c)
      (f = o[c]) && t.call(f, f.__data__, c, o) && a.push(f);
  return new bt(r, this._parents, this._name, this._id);
}
function es(t) {
  if (t._id !== this._id) throw new Error();
  for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), u = new Array(r), a = 0; a < o; ++a)
    for (var f = n[a], c = e[a], s = f.length, l = u[a] = new Array(s), h, p = 0; p < s; ++p)
      (h = f[p] || c[p]) && (l[p] = h);
  for (; a < r; ++a)
    u[a] = n[a];
  return new bt(u, this._parents, this._name, this._id);
}
function rs(t) {
  return (t + "").trim().split(/^|\s+/).every(function(n) {
    var e = n.indexOf(".");
    return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
  });
}
function is(t, n, e) {
  var r, i, o = rs(n) ? Qe : vt;
  return function() {
    var u = o(this, t), a = u.on;
    a !== r && (i = (r = a).copy()).on(n, e), u.on = i;
  };
}
function os(t, n) {
  var e = this._id;
  return arguments.length < 2 ? dt(this.node(), e).on.on(t) : this.each(is(e, t, n));
}
function us(t) {
  return function() {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function as() {
  return this.on("end.remove", us(this._id));
}
function ss(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = Ve(t));
  for (var r = this._groups, i = r.length, o = new Array(i), u = 0; u < i; ++u)
    for (var a = r[u], f = a.length, c = o[u] = new Array(f), s, l, h = 0; h < f; ++h)
      (s = a[h]) && (l = t.call(s, s.__data__, h, a)) && ("__data__" in s && (l.__data__ = s.__data__), c[h] = l, ne(c[h], n, e, h, c, dt(s, e)));
  return new bt(o, this._parents, n, e);
}
function cs(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = oi(t));
  for (var r = this._groups, i = r.length, o = [], u = [], a = 0; a < i; ++a)
    for (var f = r[a], c = f.length, s, l = 0; l < c; ++l)
      if (s = f[l]) {
        for (var h = t.call(s, s.__data__, l, f), p, m = dt(s, e), _ = 0, S = h.length; _ < S; ++_)
          (p = h[_]) && ne(p, n, e, _, h, m);
        o.push(h), u.push(s);
      }
  return new bt(o, u, n, e);
}
var ls = fn.prototype.constructor;
function fs() {
  return new ls(this._groups, this._parents);
}
function hs(t, n) {
  var e, r, i;
  return function() {
    var o = qt(this, t), u = (this.style.removeProperty(t), qt(this, t));
    return o === u ? null : o === e && u === r ? i : i = n(e = o, r = u);
  };
}
function Ni(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ds(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var u = qt(this, t);
    return u === i ? null : u === r ? o : o = n(r = u, e);
  };
}
function ps(t, n, e) {
  var r, i, o;
  return function() {
    var u = qt(this, t), a = e(this), f = a + "";
    return a == null && (f = a = (this.style.removeProperty(t), qt(this, t))), u === f ? null : u === r && f === i ? o : (i = f, o = n(r = u, a));
  };
}
function gs(t, n) {
  var e, r, i, o = "style." + n, u = "end." + o, a;
  return function() {
    var f = vt(this, t), c = f.on, s = f.value[o] == null ? a || (a = Ni(n)) : void 0;
    (c !== e || i !== s) && (r = (e = c).copy()).on(u, i = s), f.on = r;
  };
}
function ys(t, n, e) {
  var r = (t += "") == "transform" ? ya : ki;
  return n == null ? this.styleTween(t, hs(t, r)).on("end.style." + t, Ni(t)) : typeof n == "function" ? this.styleTween(t, ps(t, r, je(this, "style." + t, n))).each(gs(this._id, t)) : this.styleTween(t, ds(t, r, n), e).on("end.style." + t, null);
}
function ms(t, n, e) {
  return function(r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function vs(t, n, e) {
  var r, i;
  function o() {
    var u = n.apply(this, arguments);
    return u !== i && (r = (i = u) && ms(t, u, e)), r;
  }
  return o._value = n, o;
}
function ws(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, vs(t, n, e ?? ""));
}
function _s(t) {
  return function() {
    this.textContent = t;
  };
}
function xs(t) {
  return function() {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Ss(t) {
  return this.tween("text", typeof t == "function" ? xs(je(this, "text", t)) : _s(t == null ? "" : t + ""));
}
function bs(t) {
  return function(n) {
    this.textContent = t.call(this, n);
  };
}
function Ms(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && bs(i)), n;
  }
  return r._value = t, r;
}
function Es(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Ms(t));
}
function ks() {
  for (var t = this._name, n = this._id, e = $i(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var u = r[o], a = u.length, f, c = 0; c < a; ++c)
      if (f = u[c]) {
        var s = dt(f, n);
        ne(f, t, e, c, u, {
          time: s.time + s.delay + s.duration,
          delay: 0,
          duration: s.duration,
          ease: s.ease
        });
      }
  return new bt(r, this._parents, t, e);
}
function Ns() {
  var t, n, e = this, r = e._id, i = e.size();
  return new Promise(function(o, u) {
    var a = { value: u }, f = { value: function() {
      --i === 0 && o();
    } };
    e.each(function() {
      var c = vt(this, r), s = c.on;
      s !== t && (n = (t = s).copy(), n._.cancel.push(a), n._.interrupt.push(a), n._.end.push(f)), c.on = n;
    }), i === 0 && o();
  });
}
var $s = 0;
function bt(t, n, e, r) {
  this._groups = t, this._parents = n, this._name = e, this._id = r;
}
function $i() {
  return ++$s;
}
var wt = fn.prototype;
bt.prototype = {
  constructor: bt,
  select: ss,
  selectAll: cs,
  selectChild: wt.selectChild,
  selectChildren: wt.selectChildren,
  filter: ns,
  merge: es,
  selection: fs,
  transition: ks,
  call: wt.call,
  nodes: wt.nodes,
  node: wt.node,
  size: wt.size,
  empty: wt.empty,
  each: wt.each,
  on: os,
  attr: Ba,
  attrTween: Ya,
  style: ys,
  styleTween: ws,
  text: Ss,
  textTween: Es,
  remove: as,
  tween: Ca,
  delay: Ga,
  duration: Za,
  ease: Qa,
  easeVarying: ts,
  end: Ns,
  [Symbol.iterator]: wt[Symbol.iterator]
};
function As(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var zs = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: As
};
function Rs(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${n} not found`);
  return e;
}
function Cs(t) {
  var n, e;
  t instanceof bt ? (n = t._id, t = t._name) : (n = $i(), (e = zs).time = Je(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var u = r[o], a = u.length, f, c = 0; c < a; ++c)
      (f = u[c]) && ne(f, t, n, c, u, e || Rs(f, n));
  return new bt(r, this._parents, t, n);
}
fn.prototype.interrupt = Aa;
fn.prototype.transition = Cs;
const wn = (t) => () => t;
function Ts(t, {
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
function ht(t, n, e) {
  this.k = t, this.x = n, this.y = e;
}
ht.prototype = {
  constructor: ht,
  scale: function(t) {
    return t === 1 ? this : new ht(this.k * t, this.x, this.y);
  },
  translate: function(t, n) {
    return t === 0 & n === 0 ? this : new ht(this.k, this.x + this.k * t, this.y + this.k * n);
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
var un = new ht(1, 0, 0);
Ai.prototype = ht.prototype;
function Ai(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return un;
  return t.__zoom;
}
function ae(t) {
  t.stopImmediatePropagation();
}
function Gt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Ps(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Is() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function $r() {
  return this.__zoom || un;
}
function Fs(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Ds() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ls(t, n, e) {
  var r = t.invertX(n[0][0]) - e[0][0], i = t.invertX(n[1][0]) - e[1][0], o = t.invertY(n[0][1]) - e[0][1], u = t.invertY(n[1][1]) - e[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    u > o ? (o + u) / 2 : Math.min(0, o) || Math.max(0, u)
  );
}
function Bs() {
  var t = Ps, n = Is, e = Ls, r = Fs, i = Ds, o = [0, 1 / 0], u = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, f = xa, c = Ge("start", "zoom", "end"), s, l, h, p = 500, m = 150, _ = 0, S = 10;
  function w(d) {
    d.property("__zoom", $r).on("wheel.zoom", F, { passive: !1 }).on("mousedown.zoom", P).on("dblclick.zoom", X).filter(i).on("touchstart.zoom", z).on("touchmove.zoom", R).on("touchend.zoom touchcancel.zoom", T).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  w.transform = function(d, g, y, x) {
    var E = d.selection ? d.selection() : d;
    E.property("__zoom", $r), d !== E ? $(d, g, y, x) : E.interrupt().each(function() {
      v(this, arguments).event(x).start().zoom(null, typeof g == "function" ? g.apply(this, arguments) : g).end();
    });
  }, w.scaleBy = function(d, g, y, x) {
    w.scaleTo(d, function() {
      var E = this.__zoom.k, N = typeof g == "function" ? g.apply(this, arguments) : g;
      return E * N;
    }, y, x);
  }, w.scaleTo = function(d, g, y, x) {
    w.transform(d, function() {
      var E = n.apply(this, arguments), N = this.__zoom, A = y == null ? b(E) : typeof y == "function" ? y.apply(this, arguments) : y, D = N.invert(A), O = typeof g == "function" ? g.apply(this, arguments) : g;
      return e(k(M(N, O), A, D), E, u);
    }, y, x);
  }, w.translateBy = function(d, g, y, x) {
    w.transform(d, function() {
      return e(this.__zoom.translate(
        typeof g == "function" ? g.apply(this, arguments) : g,
        typeof y == "function" ? y.apply(this, arguments) : y
      ), n.apply(this, arguments), u);
    }, null, x);
  }, w.translateTo = function(d, g, y, x, E) {
    w.transform(d, function() {
      var N = n.apply(this, arguments), A = this.__zoom, D = x == null ? b(N) : typeof x == "function" ? x.apply(this, arguments) : x;
      return e(un.translate(D[0], D[1]).scale(A.k).translate(
        typeof g == "function" ? -g.apply(this, arguments) : -g,
        typeof y == "function" ? -y.apply(this, arguments) : -y
      ), N, u);
    }, x, E);
  };
  function M(d, g) {
    return g = Math.max(o[0], Math.min(o[1], g)), g === d.k ? d : new ht(g, d.x, d.y);
  }
  function k(d, g, y) {
    var x = g[0] - y[0] * d.k, E = g[1] - y[1] * d.k;
    return x === d.x && E === d.y ? d : new ht(d.k, x, E);
  }
  function b(d) {
    return [(+d[0][0] + +d[1][0]) / 2, (+d[0][1] + +d[1][1]) / 2];
  }
  function $(d, g, y, x) {
    d.on("start.zoom", function() {
      v(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      v(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var E = this, N = arguments, A = v(E, N).event(x), D = n.apply(E, N), O = y == null ? b(D) : typeof y == "function" ? y.apply(E, N) : y, Y = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]), U = E.__zoom, H = typeof g == "function" ? g.apply(E, N) : g, ut = f(U.invert(O).concat(Y / U.k), H.invert(O).concat(Y / H.k));
      return function(G) {
        if (G === 1) G = H;
        else {
          var et = ut(G), Et = Y / et[2];
          G = new ht(Et, O[0] - et[0] * Et, O[1] - et[1] * Et);
        }
        A.zoom(null, G);
      };
    });
  }
  function v(d, g, y) {
    return !y && d.__zooming || new I(d, g);
  }
  function I(d, g) {
    this.that = d, this.args = g, this.active = 0, this.sourceEvent = null, this.extent = n.apply(d, g), this.taps = 0;
  }
  I.prototype = {
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
      var g = pt(this.that).datum();
      c.call(
        d,
        this.that,
        new Ts(d, {
          sourceEvent: this.sourceEvent,
          target: w,
          transform: this.that.__zoom,
          dispatch: c
        }),
        g
      );
    }
  };
  function F(d, ...g) {
    if (!t.apply(this, arguments)) return;
    var y = v(this, g).event(d), x = this.__zoom, E = Math.max(o[0], Math.min(o[1], x.k * Math.pow(2, r.apply(this, arguments)))), N = Nt(d);
    if (y.wheel)
      (y.mouse[0][0] !== N[0] || y.mouse[0][1] !== N[1]) && (y.mouse[1] = x.invert(y.mouse[0] = N)), clearTimeout(y.wheel);
    else {
      if (x.k === E) return;
      y.mouse = [N, x.invert(N)], Rn(this), y.start();
    }
    Gt(d), y.wheel = setTimeout(A, m), y.zoom("mouse", e(k(M(x, E), y.mouse[0], y.mouse[1]), y.extent, u));
    function A() {
      y.wheel = null, y.end();
    }
  }
  function P(d, ...g) {
    if (h || !t.apply(this, arguments)) return;
    var y = d.currentTarget, x = v(this, g, !0).event(d), E = pt(d.view).on("mousemove.zoom", O, !0).on("mouseup.zoom", Y, !0), N = Nt(d, y), A = d.clientX, D = d.clientY;
    Hu(d.view), ae(d), x.mouse = [N, this.__zoom.invert(N)], Rn(this), x.start();
    function O(U) {
      if (Gt(U), !x.moved) {
        var H = U.clientX - A, ut = U.clientY - D;
        x.moved = H * H + ut * ut > _;
      }
      x.event(U).zoom("mouse", e(k(x.that.__zoom, x.mouse[0] = Nt(U, y), x.mouse[1]), x.extent, u));
    }
    function Y(U) {
      E.on("mousemove.zoom mouseup.zoom", null), Yu(U.view, x.moved), Gt(U), x.event(U).end();
    }
  }
  function X(d, ...g) {
    if (t.apply(this, arguments)) {
      var y = this.__zoom, x = Nt(d.changedTouches ? d.changedTouches[0] : d, this), E = y.invert(x), N = y.k * (d.shiftKey ? 0.5 : 2), A = e(k(M(y, N), x, E), n.apply(this, g), u);
      Gt(d), a > 0 ? pt(this).transition().duration(a).call($, A, x, d) : pt(this).call(w.transform, A, x, d);
    }
  }
  function z(d, ...g) {
    if (t.apply(this, arguments)) {
      var y = d.touches, x = y.length, E = v(this, g, d.changedTouches.length === x).event(d), N, A, D, O;
      for (ae(d), A = 0; A < x; ++A)
        D = y[A], O = Nt(D, this), O = [O, this.__zoom.invert(O), D.identifier], E.touch0 ? !E.touch1 && E.touch0[2] !== O[2] && (E.touch1 = O, E.taps = 0) : (E.touch0 = O, N = !0, E.taps = 1 + !!s);
      s && (s = clearTimeout(s)), N && (E.taps < 2 && (l = O[0], s = setTimeout(function() {
        s = null;
      }, p)), Rn(this), E.start());
    }
  }
  function R(d, ...g) {
    if (this.__zooming) {
      var y = v(this, g).event(d), x = d.changedTouches, E = x.length, N, A, D, O;
      for (Gt(d), N = 0; N < E; ++N)
        A = x[N], D = Nt(A, this), y.touch0 && y.touch0[2] === A.identifier ? y.touch0[0] = D : y.touch1 && y.touch1[2] === A.identifier && (y.touch1[0] = D);
      if (A = y.that.__zoom, y.touch1) {
        var Y = y.touch0[0], U = y.touch0[1], H = y.touch1[0], ut = y.touch1[1], G = (G = H[0] - Y[0]) * G + (G = H[1] - Y[1]) * G, et = (et = ut[0] - U[0]) * et + (et = ut[1] - U[1]) * et;
        A = M(A, Math.sqrt(G / et)), D = [(Y[0] + H[0]) / 2, (Y[1] + H[1]) / 2], O = [(U[0] + ut[0]) / 2, (U[1] + ut[1]) / 2];
      } else if (y.touch0) D = y.touch0[0], O = y.touch0[1];
      else return;
      y.zoom("touch", e(k(A, D, O), y.extent, u));
    }
  }
  function T(d, ...g) {
    if (this.__zooming) {
      var y = v(this, g).event(d), x = d.changedTouches, E = x.length, N, A;
      for (ae(d), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, p), N = 0; N < E; ++N)
        A = x[N], y.touch0 && y.touch0[2] === A.identifier ? delete y.touch0 : y.touch1 && y.touch1[2] === A.identifier && delete y.touch1;
      if (y.touch1 && !y.touch0 && (y.touch0 = y.touch1, delete y.touch1), y.touch0) y.touch0[1] = this.__zoom.invert(y.touch0[0]);
      else if (y.end(), y.taps === 2 && (A = Nt(A, this), Math.hypot(l[0] - A[0], l[1] - A[1]) < S)) {
        var D = pt(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return w.wheelDelta = function(d) {
    return arguments.length ? (r = typeof d == "function" ? d : wn(+d), w) : r;
  }, w.filter = function(d) {
    return arguments.length ? (t = typeof d == "function" ? d : wn(!!d), w) : t;
  }, w.touchable = function(d) {
    return arguments.length ? (i = typeof d == "function" ? d : wn(!!d), w) : i;
  }, w.extent = function(d) {
    return arguments.length ? (n = typeof d == "function" ? d : wn([[+d[0][0], +d[0][1]], [+d[1][0], +d[1][1]]]), w) : n;
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
    return arguments.length ? (S = +d, w) : S;
  }, w;
}
function Xs(t) {
  return t;
}
function qs(t) {
  if (t == null) return Xs;
  var n, e, r = t.scale[0], i = t.scale[1], o = t.translate[0], u = t.translate[1];
  return function(a, f) {
    f || (n = e = 0);
    var c = 2, s = a.length, l = new Array(s);
    for (l[0] = (n += a[0]) * r + o, l[1] = (e += a[1]) * i + u; c < s; ) l[c] = a[c], ++c;
    return l;
  };
}
function Os(t, n) {
  for (var e, r = t.length, i = r - n; i < --r; ) e = t[i], t[i++] = t[r], t[r] = e;
}
function Hs(t, n) {
  return typeof n == "string" && (n = t.objects[n]), n.type === "GeometryCollection" ? { type: "FeatureCollection", features: n.geometries.map(function(e) {
    return Ar(t, e);
  }) } : Ar(t, n);
}
function Ar(t, n) {
  var e = n.id, r = n.bbox, i = n.properties == null ? {} : n.properties, o = Ys(t, n);
  return e == null && r == null ? { type: "Feature", properties: i, geometry: o } : r == null ? { type: "Feature", id: e, properties: i, geometry: o } : { type: "Feature", id: e, bbox: r, properties: i, geometry: o };
}
function Ys(t, n) {
  var e = qs(t.transform), r = t.arcs;
  function i(s, l) {
    l.length && l.pop();
    for (var h = r[s < 0 ? ~s : s], p = 0, m = h.length; p < m; ++p)
      l.push(e(h[p], p));
    s < 0 && Os(l, m);
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
const nn = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Map();
async function Vs(t) {
  const n = nn.get(t);
  if (n) return n;
  const e = se.get(t);
  if (e) return e;
  const r = (async () => {
    const i = await fetch(t);
    if (!i.ok)
      throw new Error(`Failed to fetch ${t}: ${i.status} ${i.statusText}`);
    const o = await i.json(), u = Object.keys(o.objects)[0], a = Hs(o, o.objects[u]);
    return nn.set(t, a), a;
  })();
  se.set(t, r);
  try {
    return await r;
  } finally {
    se.delete(t);
  }
}
function ce(t) {
  const [n, e] = xt(0), [r, i] = xt(() => {
    if (!t) return { status: "idle" };
    const u = nn.get(t);
    return u ? { status: "ready", data: u } : { status: "loading" };
  });
  _t(() => {
    if (!t) {
      i({ status: "idle" });
      return;
    }
    const u = nn.get(t);
    if (u) {
      i({ status: "ready", data: u });
      return;
    }
    let a = !1;
    return i({ status: "loading" }), Vs(t).then((f) => {
      a || i({ status: "ready", data: f });
    }).catch((f) => {
      a || i({ status: "error", error: f instanceof Error ? f : new Error(String(f)) });
    }), () => {
      a = !0;
    };
  }, [t, n]);
  const o = at(() => {
    t && nn.delete(t), e((u) => u + 1);
  }, [t]);
  return [r, o];
}
const le = /* @__PURE__ */ new Map();
function Us(t) {
  const n = `${t}/meta.json`, [e, r] = xt(() => {
    const i = le.get(n);
    return i ? { status: "ready", data: i } : { status: "loading" };
  });
  return _t(() => {
    const i = le.get(n);
    if (i) {
      r({ status: "ready", data: i });
      return;
    }
    let o = !1;
    return r({ status: "loading" }), fetch(n).then((u) => {
      if (!u.ok) throw new Error(`Failed to fetch ${n}: ${u.status} ${u.statusText}`);
      return u.json();
    }).then((u) => {
      le.set(n, u), o || r({ status: "ready", data: u });
    }).catch(() => {
      o || r({ status: "error" });
    }), () => {
      o = !0;
    };
  }, [n]), e;
}
function Cn(t, n) {
  return t == null || n == null ? NaN : t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Gs(t, n) {
  return t == null || n == null ? NaN : n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
}
function zi(t) {
  let n, e, r;
  t.length !== 2 ? (n = Cn, e = (a, f) => Cn(t(a), f), r = (a, f) => t(a) - f) : (n = t === Cn || t === Gs ? t : Ws, e = t, r = t);
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
function Ws() {
  return 0;
}
function Ks(t) {
  return t === null ? NaN : +t;
}
const Zs = zi(Cn), Js = Zs.right;
zi(Ks).center;
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
const Qs = Math.sqrt(50), js = Math.sqrt(10), tc = Math.sqrt(2);
function qn(t, n, e) {
  const r = (n - t) / Math.max(0, e), i = Math.floor(Math.log10(r)), o = r / Math.pow(10, i), u = o >= Qs ? 10 : o >= js ? 5 : o >= tc ? 2 : 1;
  let a, f, c;
  return i < 0 ? (c = Math.pow(10, -i) / u, a = Math.round(t * c), f = Math.round(n * c), a / c < t && ++a, f / c > n && --f, c = -c) : (c = Math.pow(10, i) * u, a = Math.round(t / c), f = Math.round(n / c), a * c < t && ++a, f * c > n && --f), f < a && 0.5 <= e && e < 2 ? qn(t, n, e * 2) : [a, f, c];
}
function nc(t, n, e) {
  if (n = +n, t = +t, e = +e, !(e > 0)) return [];
  if (t === n) return [t];
  const r = n < t, [i, o, u] = r ? qn(n, t, e) : qn(t, n, e);
  if (!(o >= i)) return [];
  const a = o - i + 1, f = new Array(a);
  if (r)
    if (u < 0) for (let c = 0; c < a; ++c) f[c] = (o - c) / -u;
    else for (let c = 0; c < a; ++c) f[c] = (o - c) * u;
  else if (u < 0) for (let c = 0; c < a; ++c) f[c] = (i + c) / -u;
  else for (let c = 0; c < a; ++c) f[c] = (i + c) * u;
  return f;
}
function Ne(t, n, e) {
  return n = +n, t = +t, e = +e, qn(t, n, e)[2];
}
function ec(t, n, e) {
  n = +n, t = +t, e = +e;
  const r = n < t, i = r ? Ne(n, t, e) : Ne(t, n, e);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function* rc(t) {
  for (const n of t)
    yield* n;
}
function Ri(t) {
  return Array.from(rc(t));
}
var V = 1e-6, q = Math.PI, nt = q / 2, zr = q / 4, ot = q * 2, rt = 180 / q, J = q / 180, W = Math.abs, Ci = Math.atan, an = Math.atan2, K = Math.cos, ic = Math.exp, oc = Math.log, Z = Math.sin, uc = Math.sign || function(t) {
  return t > 0 ? 1 : t < 0 ? -1 : 0;
}, Pt = Math.sqrt, ac = Math.tan;
function sc(t) {
  return t > 1 ? 0 : t < -1 ? q : Math.acos(t);
}
function sn(t) {
  return t > 1 ? nt : t < -1 ? -nt : Math.asin(t);
}
function ct() {
}
function On(t, n) {
  t && Cr.hasOwnProperty(t.type) && Cr[t.type](t, n);
}
var Rr = {
  Feature: function(t, n) {
    On(t.geometry, n);
  },
  FeatureCollection: function(t, n) {
    for (var e = t.features, r = -1, i = e.length; ++r < i; ) On(e[r].geometry, n);
  }
}, Cr = {
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
    $e(t.coordinates, n, 0);
  },
  MultiLineString: function(t, n) {
    for (var e = t.coordinates, r = -1, i = e.length; ++r < i; ) $e(e[r], n, 0);
  },
  Polygon: function(t, n) {
    Tr(t.coordinates, n);
  },
  MultiPolygon: function(t, n) {
    for (var e = t.coordinates, r = -1, i = e.length; ++r < i; ) Tr(e[r], n);
  },
  GeometryCollection: function(t, n) {
    for (var e = t.geometries, r = -1, i = e.length; ++r < i; ) On(e[r], n);
  }
};
function $e(t, n, e) {
  var r = -1, i = t.length - e, o;
  for (n.lineStart(); ++r < i; ) o = t[r], n.point(o[0], o[1], o[2]);
  n.lineEnd();
}
function Tr(t, n) {
  var e = -1, r = t.length;
  for (n.polygonStart(); ++e < r; ) $e(t[e], n, 1);
  n.polygonEnd();
}
function Dt(t, n) {
  t && Rr.hasOwnProperty(t.type) ? Rr[t.type](t, n) : On(t, n);
}
function Ae(t) {
  return [an(t[1], t[0]), sn(t[2])];
}
function Ht(t) {
  var n = t[0], e = t[1], r = K(e);
  return [r * K(n), r * Z(n), Z(e)];
}
function _n(t, n) {
  return t[0] * n[0] + t[1] * n[1] + t[2] * n[2];
}
function Hn(t, n) {
  return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]];
}
function fe(t, n) {
  t[0] += n[0], t[1] += n[1], t[2] += n[2];
}
function xn(t, n) {
  return [t[0] * n, t[1] * n, t[2] * n];
}
function ze(t) {
  var n = Pt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
  t[0] /= n, t[1] /= n, t[2] /= n;
}
function Re(t, n) {
  function e(r, i) {
    return r = t(r, i), n(r[0], r[1]);
  }
  return t.invert && n.invert && (e.invert = function(r, i) {
    return r = n.invert(r, i), r && t.invert(r[0], r[1]);
  }), e;
}
function Ce(t, n) {
  return W(t) > q && (t -= Math.round(t / ot) * ot), [t, n];
}
Ce.invert = Ce;
function Ti(t, n, e) {
  return (t %= ot) ? n || e ? Re(Ir(t), Fr(n, e)) : Ir(t) : n || e ? Fr(n, e) : Ce;
}
function Pr(t) {
  return function(n, e) {
    return n += t, W(n) > q && (n -= Math.round(n / ot) * ot), [n, e];
  };
}
function Ir(t) {
  var n = Pr(t);
  return n.invert = Pr(-t), n;
}
function Fr(t, n) {
  var e = K(t), r = Z(t), i = K(n), o = Z(n);
  function u(a, f) {
    var c = K(f), s = K(a) * c, l = Z(a) * c, h = Z(f), p = h * e + s * r;
    return [
      an(l * i - p * o, s * e - h * r),
      sn(p * i + l * o)
    ];
  }
  return u.invert = function(a, f) {
    var c = K(f), s = K(a) * c, l = Z(a) * c, h = Z(f), p = h * i - l * o;
    return [
      an(l * i + h * o, s * e + p * r),
      sn(p * e - s * r)
    ];
  }, u;
}
function cc(t) {
  t = Ti(t[0] * J, t[1] * J, t.length > 2 ? t[2] * J : 0);
  function n(e) {
    return e = t(e[0] * J, e[1] * J), e[0] *= rt, e[1] *= rt, e;
  }
  return n.invert = function(e) {
    return e = t.invert(e[0] * J, e[1] * J), e[0] *= rt, e[1] *= rt, e;
  }, n;
}
function lc(t, n, e, r, i, o) {
  if (e) {
    var u = K(n), a = Z(n), f = r * e;
    i == null ? (i = n + r * ot, o = n - f / 2) : (i = Dr(u, i), o = Dr(u, o), (r > 0 ? i < o : i > o) && (i += r * ot));
    for (var c, s = i; r > 0 ? s > o : s < o; s -= f)
      c = Ae([u, -a * K(s), -a * Z(s)]), t.point(c[0], c[1]);
  }
}
function Dr(t, n) {
  n = Ht(n), n[0] -= t, ze(n);
  var e = sc(-n[1]);
  return ((-n[2] < 0 ? -e : e) + ot - V) % ot;
}
function Pi() {
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
function Tn(t, n) {
  return W(t[0] - n[0]) < V && W(t[1] - n[1]) < V;
}
function Sn(t, n, e, r) {
  this.x = t, this.z = n, this.o = e, this.e = r, this.v = !1, this.n = this.p = null;
}
function Ii(t, n, e, r, i) {
  var o = [], u = [], a, f;
  if (t.forEach(function(m) {
    if (!((_ = m.length - 1) <= 0)) {
      var _, S = m[0], w = m[_], M;
      if (Tn(S, w)) {
        if (!S[2] && !w[2]) {
          for (i.lineStart(), a = 0; a < _; ++a) i.point((S = m[a])[0], S[1]);
          i.lineEnd();
          return;
        }
        w[0] += 2 * V;
      }
      o.push(M = new Sn(S, m, null, !0)), u.push(M.o = new Sn(S, null, M, !1)), o.push(M = new Sn(w, m, null, !1)), u.push(M.o = new Sn(w, null, M, !0));
    }
  }), !!o.length) {
    for (u.sort(n), Lr(o), Lr(u), a = 0, f = u.length; a < f; ++a)
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
function Lr(t) {
  if (n = t.length) {
    for (var n, e = 0, r = t[0], i; ++e < n; )
      r.n = i = t[e], i.p = r, r = i;
    r.n = i = t[0], i.p = r;
  }
}
function he(t) {
  return W(t[0]) <= q ? t[0] : uc(t[0]) * ((W(t[0]) + q) % ot - q);
}
function fc(t, n) {
  var e = he(n), r = n[1], i = Z(r), o = [Z(e), -K(e), 0], u = 0, a = 0, f = new Ct();
  i === 1 ? r = nt + V : i === -1 && (r = -nt - V);
  for (var c = 0, s = t.length; c < s; ++c)
    if (h = (l = t[c]).length)
      for (var l, h, p = l[h - 1], m = he(p), _ = p[1] / 2 + zr, S = Z(_), w = K(_), M = 0; M < h; ++M, m = b, S = v, w = I, p = k) {
        var k = l[M], b = he(k), $ = k[1] / 2 + zr, v = Z($), I = K($), F = b - m, P = F >= 0 ? 1 : -1, X = P * F, z = X > q, R = S * v;
        if (f.add(an(R * P * Z(X), w * I + R * K(X))), u += z ? F + P * ot : F, z ^ m >= e ^ b >= e) {
          var T = Hn(Ht(p), Ht(k));
          ze(T);
          var d = Hn(o, T);
          ze(d);
          var g = (z ^ F >= 0 ? -1 : 1) * sn(d[2]);
          (r > g || r === g && (T[0] || T[1])) && (a += z ^ F >= 0 ? 1 : -1);
        }
      }
  return (u < -V || u < V && f < -1e-12) ^ a & 1;
}
function Fi(t, n, e, r) {
  return function(i) {
    var o = n(i), u = Pi(), a = n(u), f = !1, c, s, l, h = {
      point: p,
      lineStart: _,
      lineEnd: S,
      polygonStart: function() {
        h.point = w, h.lineStart = M, h.lineEnd = k, s = [], c = [];
      },
      polygonEnd: function() {
        h.point = p, h.lineStart = _, h.lineEnd = S, s = Ri(s);
        var b = fc(c, r);
        s.length ? (f || (i.polygonStart(), f = !0), Ii(s, dc, b, e, i)) : b && (f || (i.polygonStart(), f = !0), i.lineStart(), e(null, null, 1, i), i.lineEnd()), f && (i.polygonEnd(), f = !1), s = c = null;
      },
      sphere: function() {
        i.polygonStart(), i.lineStart(), e(null, null, 1, i), i.lineEnd(), i.polygonEnd();
      }
    };
    function p(b, $) {
      t(b, $) && i.point(b, $);
    }
    function m(b, $) {
      o.point(b, $);
    }
    function _() {
      h.point = m, o.lineStart();
    }
    function S() {
      h.point = p, o.lineEnd();
    }
    function w(b, $) {
      l.push([b, $]), a.point(b, $);
    }
    function M() {
      a.lineStart(), l = [];
    }
    function k() {
      w(l[0][0], l[0][1]), a.lineEnd();
      var b = a.clean(), $ = u.result(), v, I = $.length, F, P, X;
      if (l.pop(), c.push(l), l = null, !!I) {
        if (b & 1) {
          if (P = $[0], (F = P.length - 1) > 0) {
            for (f || (i.polygonStart(), f = !0), i.lineStart(), v = 0; v < F; ++v) i.point((X = P[v])[0], X[1]);
            i.lineEnd();
          }
          return;
        }
        I > 1 && b & 2 && $.push($.pop().concat($.shift())), s.push($.filter(hc));
      }
    }
    return h;
  };
}
function hc(t) {
  return t.length > 1;
}
function dc(t, n) {
  return ((t = t.x)[0] < 0 ? t[1] - nt - V : nt - t[1]) - ((n = n.x)[0] < 0 ? n[1] - nt - V : nt - n[1]);
}
const Br = Fi(
  function() {
    return !0;
  },
  pc,
  yc,
  [-q, -nt]
);
function pc(t) {
  var n = NaN, e = NaN, r = NaN, i;
  return {
    lineStart: function() {
      t.lineStart(), i = 1;
    },
    point: function(o, u) {
      var a = o > 0 ? q : -q, f = W(o - n);
      W(f - q) < V ? (t.point(n, e = (e + u) / 2 > 0 ? nt : -nt), t.point(r, e), t.lineEnd(), t.lineStart(), t.point(a, e), t.point(o, e), i = 0) : r !== a && f >= q && (W(n - r) < V && (n -= r * V), W(o - a) < V && (o -= a * V), e = gc(n, e, o, u), t.point(r, e), t.lineEnd(), t.lineStart(), t.point(a, e), i = 0), t.point(n = o, e = u), r = a;
    },
    lineEnd: function() {
      t.lineEnd(), n = e = NaN;
    },
    clean: function() {
      return 2 - i;
    }
  };
}
function gc(t, n, e, r) {
  var i, o, u = Z(t - e);
  return W(u) > V ? Ci((Z(n) * (o = K(r)) * Z(e) - Z(r) * (i = K(n)) * Z(t)) / (i * o * u)) : (n + r) / 2;
}
function yc(t, n, e, r) {
  var i;
  if (t == null)
    i = e * nt, r.point(-q, i), r.point(0, i), r.point(q, i), r.point(q, 0), r.point(q, -i), r.point(0, -i), r.point(-q, -i), r.point(-q, 0), r.point(-q, i);
  else if (W(t[0] - n[0]) > V) {
    var o = t[0] < n[0] ? q : -q;
    i = e * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i);
  } else
    r.point(n[0], n[1]);
}
function mc(t) {
  var n = K(t), e = 2 * J, r = n > 0, i = W(n) > V;
  function o(s, l, h, p) {
    lc(p, t, e, h, s, l);
  }
  function u(s, l) {
    return K(s) * K(l) > n;
  }
  function a(s) {
    var l, h, p, m, _;
    return {
      lineStart: function() {
        m = p = !1, _ = 1;
      },
      point: function(S, w) {
        var M = [S, w], k, b = u(S, w), $ = r ? b ? 0 : c(S, w) : b ? c(S + (S < 0 ? q : -q), w) : 0;
        if (!l && (m = p = b) && s.lineStart(), b !== p && (k = f(l, M), (!k || Tn(l, k) || Tn(M, k)) && (M[2] = 1)), b !== p)
          _ = 0, b ? (s.lineStart(), k = f(M, l), s.point(k[0], k[1])) : (k = f(l, M), s.point(k[0], k[1], 2), s.lineEnd()), l = k;
        else if (i && l && r ^ b) {
          var v;
          !($ & h) && (v = f(M, l, !0)) && (_ = 0, r ? (s.lineStart(), s.point(v[0][0], v[0][1]), s.point(v[1][0], v[1][1]), s.lineEnd()) : (s.point(v[1][0], v[1][1]), s.lineEnd(), s.lineStart(), s.point(v[0][0], v[0][1], 3)));
        }
        b && (!l || !Tn(l, M)) && s.point(M[0], M[1]), l = M, p = b, h = $;
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
    var p = Ht(s), m = Ht(l), _ = [1, 0, 0], S = Hn(p, m), w = _n(S, S), M = S[0], k = w - M * M;
    if (!k) return !h && s;
    var b = n * w / k, $ = -n * M / k, v = Hn(_, S), I = xn(_, b), F = xn(S, $);
    fe(I, F);
    var P = v, X = _n(I, P), z = _n(P, P), R = X * X - z * (_n(I, I) - 1);
    if (!(R < 0)) {
      var T = Pt(R), d = xn(P, (-X - T) / z);
      if (fe(d, I), d = Ae(d), !h) return d;
      var g = s[0], y = l[0], x = s[1], E = l[1], N;
      y < g && (N = g, g = y, y = N);
      var A = y - g, D = W(A - q) < V, O = D || A < V;
      if (!D && E < x && (N = x, x = E, E = N), O ? D ? x + E > 0 ^ d[1] < (W(d[0] - g) < V ? x : E) : x <= d[1] && d[1] <= E : A > q ^ (g <= d[0] && d[0] <= y)) {
        var Y = xn(P, (-X + T) / z);
        return fe(Y, I), [d, Ae(Y)];
      }
    }
  }
  function c(s, l) {
    var h = r ? t : q - t, p = 0;
    return s < -h ? p |= 1 : s > h && (p |= 2), l < -h ? p |= 4 : l > h && (p |= 8), p;
  }
  return Fi(u, a, o, r ? [0, -t] : [-q, t - q]);
}
function vc(t, n, e, r, i, o) {
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
var Zt = 1e9, bn = -Zt;
function wc(t, n, e, r) {
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
    return W(c[0] - t) < V ? s > 0 ? 0 : 3 : W(c[0] - e) < V ? s > 0 ? 2 : 1 : W(c[1] - n) < V ? s > 0 ? 1 : 0 : s > 0 ? 3 : 2;
  }
  function a(c, s) {
    return f(c.x, s.x);
  }
  function f(c, s) {
    var l = u(c, 1), h = u(s, 1);
    return l !== h ? l - h : l === 0 ? s[1] - c[1] : l === 1 ? c[0] - s[0] : l === 2 ? c[1] - s[1] : s[0] - c[0];
  }
  return function(c) {
    var s = c, l = Pi(), h, p, m, _, S, w, M, k, b, $, v, I = {
      point: F,
      lineStart: R,
      lineEnd: T,
      polygonStart: X,
      polygonEnd: z
    };
    function F(g, y) {
      i(g, y) && s.point(g, y);
    }
    function P() {
      for (var g = 0, y = 0, x = p.length; y < x; ++y)
        for (var E = p[y], N = 1, A = E.length, D = E[0], O, Y, U = D[0], H = D[1]; N < A; ++N)
          O = U, Y = H, D = E[N], U = D[0], H = D[1], Y <= r ? H > r && (U - O) * (r - Y) > (H - Y) * (t - O) && ++g : H <= r && (U - O) * (r - Y) < (H - Y) * (t - O) && --g;
      return g;
    }
    function X() {
      s = l, h = [], p = [], v = !0;
    }
    function z() {
      var g = P(), y = v && g, x = (h = Ri(h)).length;
      (y || x) && (c.polygonStart(), y && (c.lineStart(), o(null, null, 1, c), c.lineEnd()), x && Ii(h, a, g, o, c), c.polygonEnd()), s = c, h = p = m = null;
    }
    function R() {
      I.point = d, p && p.push(m = []), $ = !0, b = !1, M = k = NaN;
    }
    function T() {
      h && (d(_, S), w && b && l.rejoin(), h.push(l.result())), I.point = F, b && s.lineEnd();
    }
    function d(g, y) {
      var x = i(g, y);
      if (p && m.push([g, y]), $)
        _ = g, S = y, w = x, $ = !1, x && (s.lineStart(), s.point(g, y));
      else if (x && b) s.point(g, y);
      else {
        var E = [M = Math.max(bn, Math.min(Zt, M)), k = Math.max(bn, Math.min(Zt, k))], N = [g = Math.max(bn, Math.min(Zt, g)), y = Math.max(bn, Math.min(Zt, y))];
        vc(E, N, t, n, e, r) ? (b || (s.lineStart(), s.point(E[0], E[1])), s.point(N[0], N[1]), x || s.lineEnd(), v = !1) : x && (s.lineStart(), s.point(g, y), v = !1);
      }
      M = g, k = y, b = x;
    }
    return I;
  };
}
const Te = (t) => t;
var de = new Ct(), Pe = new Ct(), Di, Li, Ie, Fe, St = {
  point: ct,
  lineStart: ct,
  lineEnd: ct,
  polygonStart: function() {
    St.lineStart = _c, St.lineEnd = Sc;
  },
  polygonEnd: function() {
    St.lineStart = St.lineEnd = St.point = ct, de.add(W(Pe)), Pe = new Ct();
  },
  result: function() {
    var t = de / 2;
    return de = new Ct(), t;
  }
};
function _c() {
  St.point = xc;
}
function xc(t, n) {
  St.point = Bi, Di = Ie = t, Li = Fe = n;
}
function Bi(t, n) {
  Pe.add(Fe * t - Ie * n), Ie = t, Fe = n;
}
function Sc() {
  Bi(Di, Li);
}
var Yt = 1 / 0, Yn = Yt, cn = -Yt, Vn = cn, Un = {
  point: bc,
  lineStart: ct,
  lineEnd: ct,
  polygonStart: ct,
  polygonEnd: ct,
  result: function() {
    var t = [[Yt, Yn], [cn, Vn]];
    return cn = Vn = -(Yn = Yt = 1 / 0), t;
  }
};
function bc(t, n) {
  t < Yt && (Yt = t), t > cn && (cn = t), n < Yn && (Yn = n), n > Vn && (Vn = n);
}
var De = 0, Le = 0, Jt = 0, Gn = 0, Wn = 0, Lt = 0, Be = 0, Xe = 0, Qt = 0, Xi, qi, gt, yt, st = {
  point: Tt,
  lineStart: Xr,
  lineEnd: qr,
  polygonStart: function() {
    st.lineStart = kc, st.lineEnd = Nc;
  },
  polygonEnd: function() {
    st.point = Tt, st.lineStart = Xr, st.lineEnd = qr;
  },
  result: function() {
    var t = Qt ? [Be / Qt, Xe / Qt] : Lt ? [Gn / Lt, Wn / Lt] : Jt ? [De / Jt, Le / Jt] : [NaN, NaN];
    return De = Le = Jt = Gn = Wn = Lt = Be = Xe = Qt = 0, t;
  }
};
function Tt(t, n) {
  De += t, Le += n, ++Jt;
}
function Xr() {
  st.point = Mc;
}
function Mc(t, n) {
  st.point = Ec, Tt(gt = t, yt = n);
}
function Ec(t, n) {
  var e = t - gt, r = n - yt, i = Pt(e * e + r * r);
  Gn += i * (gt + t) / 2, Wn += i * (yt + n) / 2, Lt += i, Tt(gt = t, yt = n);
}
function qr() {
  st.point = Tt;
}
function kc() {
  st.point = $c;
}
function Nc() {
  Oi(Xi, qi);
}
function $c(t, n) {
  st.point = Oi, Tt(Xi = gt = t, qi = yt = n);
}
function Oi(t, n) {
  var e = t - gt, r = n - yt, i = Pt(e * e + r * r);
  Gn += i * (gt + t) / 2, Wn += i * (yt + n) / 2, Lt += i, i = yt * t - gt * n, Be += i * (gt + t), Xe += i * (yt + n), Qt += i * 3, Tt(gt = t, yt = n);
}
function Hi(t) {
  this._context = t;
}
Hi.prototype = {
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
var qe = new Ct(), pe, Yi, Vi, jt, tn, ln = {
  point: ct,
  lineStart: function() {
    ln.point = Ac;
  },
  lineEnd: function() {
    pe && Ui(Yi, Vi), ln.point = ct;
  },
  polygonStart: function() {
    pe = !0;
  },
  polygonEnd: function() {
    pe = null;
  },
  result: function() {
    var t = +qe;
    return qe = new Ct(), t;
  }
};
function Ac(t, n) {
  ln.point = Ui, Yi = jt = t, Vi = tn = n;
}
function Ui(t, n) {
  jt -= t, tn -= n, qe.add(Pt(jt * jt + tn * tn)), jt = t, tn = n;
}
let Or, Kn, Hr, Yr;
class Vr {
  constructor(n) {
    this._append = n == null ? Gi : zc(n), this._radius = 4.5, this._ = "";
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
        if (this._append`M${n},${e}`, this._radius !== Hr || this._append !== Kn) {
          const r = this._radius, i = this._;
          this._ = "", this._append`m0,${r}a${r},${r} 0 1,1 0,${-2 * r}a${r},${r} 0 1,1 0,${2 * r}z`, Hr = r, Kn = this._append, Yr = this._, this._ = i;
        }
        this._ += Yr;
        break;
      }
    }
  }
  result() {
    const n = this._;
    return this._ = "", n.length ? n : null;
  }
}
function Gi(t) {
  let n = 1;
  this._ += t[0];
  for (const e = t.length; n < e; ++n)
    this._ += arguments[n] + t[n];
}
function zc(t) {
  const n = Math.floor(t);
  if (!(n >= 0)) throw new RangeError(`invalid digits: ${t}`);
  if (n > 15) return Gi;
  if (n !== Or) {
    const e = 10 ** n;
    Or = n, Kn = function(i) {
      let o = 1;
      this._ += i[0];
      for (const u = i.length; o < u; ++o)
        this._ += Math.round(arguments[o] * e) / e + i[o];
    };
  }
  return Kn;
}
function Rc(t, n) {
  let e = 3, r = 4.5, i, o;
  function u(a) {
    return a && (typeof r == "function" && o.pointRadius(+r.apply(this, arguments)), Dt(a, i(o))), o.result();
  }
  return u.area = function(a) {
    return Dt(a, i(St)), St.result();
  }, u.measure = function(a) {
    return Dt(a, i(ln)), ln.result();
  }, u.bounds = function(a) {
    return Dt(a, i(Un)), Un.result();
  }, u.centroid = function(a) {
    return Dt(a, i(st)), st.result();
  }, u.projection = function(a) {
    return arguments.length ? (i = a == null ? (t = null, Te) : (t = a).stream, u) : t;
  }, u.context = function(a) {
    return arguments.length ? (o = a == null ? (n = null, new Vr(e)) : new Hi(n = a), typeof r != "function" && o.pointRadius(r), u) : n;
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
    return n === null && (o = new Vr(e)), u;
  }, u.projection(t).digits(e).context(n);
}
function tr(t) {
  return function(n) {
    var e = new Oe();
    for (var r in t) e[r] = t[r];
    return e.stream = n, e;
  };
}
function Oe() {
}
Oe.prototype = {
  constructor: Oe,
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
function nr(t, n, e) {
  var r = t.clipExtent && t.clipExtent();
  return t.scale(150).translate([0, 0]), r != null && t.clipExtent(null), Dt(e, t.stream(Un)), n(Un.result()), r != null && t.clipExtent(r), t;
}
function Wi(t, n, e) {
  return nr(t, function(r) {
    var i = n[1][0] - n[0][0], o = n[1][1] - n[0][1], u = Math.min(i / (r[1][0] - r[0][0]), o / (r[1][1] - r[0][1])), a = +n[0][0] + (i - u * (r[1][0] + r[0][0])) / 2, f = +n[0][1] + (o - u * (r[1][1] + r[0][1])) / 2;
    t.scale(150 * u).translate([a, f]);
  }, e);
}
function Cc(t, n, e) {
  return Wi(t, [[0, 0], n], e);
}
function Tc(t, n, e) {
  return nr(t, function(r) {
    var i = +n, o = i / (r[1][0] - r[0][0]), u = (i - o * (r[1][0] + r[0][0])) / 2, a = -o * r[0][1];
    t.scale(150 * o).translate([u, a]);
  }, e);
}
function Pc(t, n, e) {
  return nr(t, function(r) {
    var i = +n, o = i / (r[1][1] - r[0][1]), u = -o * r[0][0], a = (i - o * (r[1][1] + r[0][1])) / 2;
    t.scale(150 * o).translate([u, a]);
  }, e);
}
var Ur = 16, Ic = K(30 * J);
function Gr(t, n) {
  return +n ? Dc(t, n) : Fc(t);
}
function Fc(t) {
  return tr({
    point: function(n, e) {
      n = t(n, e), this.stream.point(n[0], n[1]);
    }
  });
}
function Dc(t, n) {
  function e(r, i, o, u, a, f, c, s, l, h, p, m, _, S) {
    var w = c - r, M = s - i, k = w * w + M * M;
    if (k > 4 * n && _--) {
      var b = u + h, $ = a + p, v = f + m, I = Pt(b * b + $ * $ + v * v), F = sn(v /= I), P = W(W(v) - 1) < V || W(o - l) < V ? (o + l) / 2 : an($, b), X = t(P, F), z = X[0], R = X[1], T = z - r, d = R - i, g = M * T - w * d;
      (g * g / k > n || W((w * T + M * d) / k - 0.5) > 0.3 || u * h + a * p + f * m < Ic) && (e(r, i, o, u, a, f, z, R, P, b /= I, $ /= I, v, _, S), S.point(z, R), e(z, R, P, b, $, v, c, s, l, h, p, m, _, S));
    }
  }
  return function(r) {
    var i, o, u, a, f, c, s, l, h, p, m, _, S = {
      point: w,
      lineStart: M,
      lineEnd: b,
      polygonStart: function() {
        r.polygonStart(), S.lineStart = $;
      },
      polygonEnd: function() {
        r.polygonEnd(), S.lineStart = M;
      }
    };
    function w(F, P) {
      F = t(F, P), r.point(F[0], F[1]);
    }
    function M() {
      l = NaN, S.point = k, r.lineStart();
    }
    function k(F, P) {
      var X = Ht([F, P]), z = t(F, P);
      e(l, h, s, p, m, _, l = z[0], h = z[1], s = F, p = X[0], m = X[1], _ = X[2], Ur, r), r.point(l, h);
    }
    function b() {
      S.point = w, r.lineEnd();
    }
    function $() {
      M(), S.point = v, S.lineEnd = I;
    }
    function v(F, P) {
      k(i = F, P), o = l, u = h, a = p, f = m, c = _, S.point = k;
    }
    function I() {
      e(l, h, s, p, m, _, o, u, i, a, f, c, Ur, r), S.lineEnd = b, b();
    }
    return S;
  };
}
var Lc = tr({
  point: function(t, n) {
    this.stream.point(t * J, n * J);
  }
});
function Bc(t) {
  return tr({
    point: function(n, e) {
      var r = t(n, e);
      return this.stream.point(r[0], r[1]);
    }
  });
}
function Xc(t, n, e, r, i) {
  function o(u, a) {
    return u *= r, a *= i, [n + t * u, e - t * a];
  }
  return o.invert = function(u, a) {
    return [(u - n) / t * r, (e - a) / t * i];
  }, o;
}
function Wr(t, n, e, r, i, o) {
  if (!o) return Xc(t, n, e, r, i);
  var u = K(o), a = Z(o), f = u * t, c = a * t, s = u / t, l = a / t, h = (a * e - u * n) / t, p = (a * n + u * e) / t;
  function m(_, S) {
    return _ *= r, S *= i, [f * _ - c * S + n, e - c * _ - f * S];
  }
  return m.invert = function(_, S) {
    return [r * (s * _ - l * S + h), i * (p - l * _ - s * S)];
  }, m;
}
function qc(t) {
  return Oc(function() {
    return t;
  })();
}
function Oc(t) {
  var n, e = 150, r = 480, i = 250, o = 0, u = 0, a = 0, f = 0, c = 0, s, l = 0, h = 1, p = 1, m = null, _ = Br, S = null, w, M, k, b = Te, $ = 0.5, v, I, F, P, X;
  function z(g) {
    return F(g[0] * J, g[1] * J);
  }
  function R(g) {
    return g = F.invert(g[0], g[1]), g && [g[0] * rt, g[1] * rt];
  }
  z.stream = function(g) {
    return P && X === g ? P : P = Lc(Bc(s)(_(v(b(X = g)))));
  }, z.preclip = function(g) {
    return arguments.length ? (_ = g, m = void 0, d()) : _;
  }, z.postclip = function(g) {
    return arguments.length ? (b = g, S = w = M = k = null, d()) : b;
  }, z.clipAngle = function(g) {
    return arguments.length ? (_ = +g ? mc(m = g * J) : (m = null, Br), d()) : m * rt;
  }, z.clipExtent = function(g) {
    return arguments.length ? (b = g == null ? (S = w = M = k = null, Te) : wc(S = +g[0][0], w = +g[0][1], M = +g[1][0], k = +g[1][1]), d()) : S == null ? null : [[S, w], [M, k]];
  }, z.scale = function(g) {
    return arguments.length ? (e = +g, T()) : e;
  }, z.translate = function(g) {
    return arguments.length ? (r = +g[0], i = +g[1], T()) : [r, i];
  }, z.center = function(g) {
    return arguments.length ? (o = g[0] % 360 * J, u = g[1] % 360 * J, T()) : [o * rt, u * rt];
  }, z.rotate = function(g) {
    return arguments.length ? (a = g[0] % 360 * J, f = g[1] % 360 * J, c = g.length > 2 ? g[2] % 360 * J : 0, T()) : [a * rt, f * rt, c * rt];
  }, z.angle = function(g) {
    return arguments.length ? (l = g % 360 * J, T()) : l * rt;
  }, z.reflectX = function(g) {
    return arguments.length ? (h = g ? -1 : 1, T()) : h < 0;
  }, z.reflectY = function(g) {
    return arguments.length ? (p = g ? -1 : 1, T()) : p < 0;
  }, z.precision = function(g) {
    return arguments.length ? (v = Gr(I, $ = g * g), d()) : Pt($);
  }, z.fitExtent = function(g, y) {
    return Wi(z, g, y);
  }, z.fitSize = function(g, y) {
    return Cc(z, g, y);
  }, z.fitWidth = function(g, y) {
    return Tc(z, g, y);
  }, z.fitHeight = function(g, y) {
    return Pc(z, g, y);
  };
  function T() {
    var g = Wr(e, 0, 0, h, p, l).apply(null, n(o, u)), y = Wr(e, r - g[0], i - g[1], h, p, l);
    return s = Ti(a, f, c), I = Re(n, y), F = Re(s, I), v = Gr(I, $), d();
  }
  function d() {
    return P = X = null, z;
  }
  return function() {
    return n = t.apply(this, arguments), z.invert = n.invert && R, T();
  };
}
function er(t, n) {
  return [t, oc(ac((nt + n) / 2))];
}
er.invert = function(t, n) {
  return [t, 2 * Ci(ic(n)) - nt];
};
function Hc() {
  return Yc(er).scale(961 / ot);
}
function Yc(t) {
  var n = qc(t), e = n.center, r = n.scale, i = n.translate, o = n.clipExtent, u = null, a, f, c;
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
    var l = q * r(), h = n(cc(n.rotate()).invert([0, 0]));
    return o(u == null ? [[h[0] - l, h[1] - l], [h[0] + l, h[1] + l]] : t === er ? [[Math.max(h[0] - l, u), a], [Math.min(h[0] + l, f), c]] : [[u, Math.max(h[1] - l, a)], [f, Math.min(h[1] + l, c)]]);
  }
  return s();
}
function Vc(t, n, e) {
  return Hc().fitSize([n, e], t);
}
function Uc(t) {
  return Rc(t);
}
const Gc = 0.9;
function Ki(t, n, e) {
  const [[r, i], [o, u]] = t, a = Math.max(o - r, 1e-6), f = Math.max(u - i, 1e-6);
  return Gc / Math.max(a / n, f / e);
}
function Wc(t, n, e, r, i) {
  const o = t.bounds(n), [[u, a], [f, c]] = o, s = (u + f) / 2, l = (a + c) / 2, h = Math.min(i, Ki(o, e, r));
  return new ht(h, e / 2 - h * s, r / 2 - h * l);
}
function Kc(t, n, e, r) {
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
  return Ki(t.bounds(f), e, r);
}
function Zc(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}
function Jc(t, n, e, r = 750) {
  const i = pt(t), o = Ai(t), u = performance.now();
  function a(f) {
    const c = Math.min(1, (f - u) / r), s = Zc(c), l = new ht(
      o.k + (e.k - o.k) * s,
      o.x + (e.x - o.x) * s,
      o.y + (e.y - o.y) * s
    );
    n.transform(i, l), c < 1 && requestAnimationFrame(a);
  }
  requestAnimationFrame(a);
}
function Qc(t, n) {
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
function jc(t) {
  return function() {
    return t;
  };
}
function tl(t) {
  return +t;
}
var Kr = [0, 1];
function Bt(t) {
  return t;
}
function He(t, n) {
  return (n -= t = +t) ? function(e) {
    return (e - t) / n;
  } : jc(isNaN(n) ? NaN : 0.5);
}
function nl(t, n) {
  var e;
  return t > n && (e = t, t = n, n = e), function(r) {
    return Math.max(t, Math.min(n, r));
  };
}
function el(t, n, e) {
  var r = t[0], i = t[1], o = n[0], u = n[1];
  return i < r ? (r = He(i, r), o = e(u, o)) : (r = He(r, i), o = e(o, u)), function(a) {
    return o(r(a));
  };
}
function rl(t, n, e) {
  var r = Math.min(t.length, n.length) - 1, i = new Array(r), o = new Array(r), u = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), n = n.slice().reverse()); ++u < r; )
    i[u] = He(t[u], t[u + 1]), o[u] = e(n[u], n[u + 1]);
  return function(a) {
    var f = Js(t, a, 1, r) - 1;
    return o[f](i[f](a));
  };
}
function il(t, n) {
  return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function ol() {
  var t = Kr, n = Kr, e = Ze, r, i, o, u = Bt, a, f, c;
  function s() {
    var h = Math.min(t.length, n.length);
    return u !== Bt && (u = nl(t[0], t[h - 1])), a = h > 2 ? rl : el, f = c = null, l;
  }
  function l(h) {
    return h == null || isNaN(h = +h) ? o : (f || (f = a(t.map(r), n, e)))(r(u(h)));
  }
  return l.invert = function(h) {
    return u(i((c || (c = a(n, t.map(r), lt)))(h)));
  }, l.domain = function(h) {
    return arguments.length ? (t = Array.from(h, tl), s()) : t.slice();
  }, l.range = function(h) {
    return arguments.length ? (n = Array.from(h), s()) : n.slice();
  }, l.rangeRound = function(h) {
    return n = Array.from(h), e = da, s();
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
function ul() {
  return ol()(Bt, Bt);
}
function al(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function Zn(t, n) {
  if (!isFinite(t) || t === 0) return null;
  var e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf("e"), r = t.slice(0, e);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(e + 1)
  ];
}
function Vt(t) {
  return t = Zn(Math.abs(t)), t ? t[1] : NaN;
}
function sl(t, n) {
  return function(e, r) {
    for (var i = e.length, o = [], u = 0, a = t[0], f = 0; i > 0 && a > 0 && (f + a + 1 > r && (a = Math.max(1, r - f)), o.push(e.substring(i -= a, i + a)), !((f += a + 1) > r)); )
      a = t[u = (u + 1) % t.length];
    return o.reverse().join(n);
  };
}
function cl(t) {
  return function(n) {
    return n.replace(/[0-9]/g, function(e) {
      return t[+e];
    });
  };
}
var ll = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Jn(t) {
  if (!(n = ll.exec(t))) throw new Error("invalid format: " + t);
  var n;
  return new rr({
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
Jn.prototype = rr.prototype;
function rr(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
rr.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function fl(t) {
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
var Qn;
function hl(t, n) {
  var e = Zn(t, n);
  if (!e) return Qn = void 0, t.toPrecision(n);
  var r = e[0], i = e[1], o = i - (Qn = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, u = r.length;
  return o === u ? r : o > u ? r + new Array(o - u + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + Zn(t, Math.max(0, n + o - 1))[0];
}
function Zr(t, n) {
  var e = Zn(t, n);
  if (!e) return t + "";
  var r = e[0], i = e[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const Jr = {
  "%": (t, n) => (t * 100).toFixed(n),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: al,
  e: (t, n) => t.toExponential(n),
  f: (t, n) => t.toFixed(n),
  g: (t, n) => t.toPrecision(n),
  o: (t) => Math.round(t).toString(8),
  p: (t, n) => Zr(t * 100, n),
  r: Zr,
  s: hl,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Qr(t) {
  return t;
}
var jr = Array.prototype.map, ti = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function dl(t) {
  var n = t.grouping === void 0 || t.thousands === void 0 ? Qr : sl(jr.call(t.grouping, Number), t.thousands + ""), e = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", o = t.numerals === void 0 ? Qr : cl(jr.call(t.numerals, String)), u = t.percent === void 0 ? "%" : t.percent + "", a = t.minus === void 0 ? "−" : t.minus + "", f = t.nan === void 0 ? "NaN" : t.nan + "";
  function c(l, h) {
    l = Jn(l);
    var p = l.fill, m = l.align, _ = l.sign, S = l.symbol, w = l.zero, M = l.width, k = l.comma, b = l.precision, $ = l.trim, v = l.type;
    v === "n" ? (k = !0, v = "g") : Jr[v] || (b === void 0 && (b = 12), $ = !0, v = "g"), (w || p === "0" && m === "=") && (w = !0, p = "0", m = "=");
    var I = (h && h.prefix !== void 0 ? h.prefix : "") + (S === "$" ? e : S === "#" && /[boxX]/.test(v) ? "0" + v.toLowerCase() : ""), F = (S === "$" ? r : /[%p]/.test(v) ? u : "") + (h && h.suffix !== void 0 ? h.suffix : ""), P = Jr[v], X = /[defgprs%]/.test(v);
    b = b === void 0 ? 6 : /[gprs]/.test(v) ? Math.max(1, Math.min(21, b)) : Math.max(0, Math.min(20, b));
    function z(R) {
      var T = I, d = F, g, y, x;
      if (v === "c")
        d = P(R) + d, R = "";
      else {
        R = +R;
        var E = R < 0 || 1 / R < 0;
        if (R = isNaN(R) ? f : P(Math.abs(R), b), $ && (R = fl(R)), E && +R == 0 && _ !== "+" && (E = !1), T = (E ? _ === "(" ? _ : a : _ === "-" || _ === "(" ? "" : _) + T, d = (v === "s" && !isNaN(R) && Qn !== void 0 ? ti[8 + Qn / 3] : "") + d + (E && _ === "(" ? ")" : ""), X) {
          for (g = -1, y = R.length; ++g < y; )
            if (x = R.charCodeAt(g), 48 > x || x > 57) {
              d = (x === 46 ? i + R.slice(g + 1) : R.slice(g)) + d, R = R.slice(0, g);
              break;
            }
        }
      }
      k && !w && (R = n(R, 1 / 0));
      var N = T.length + R.length + d.length, A = N < M ? new Array(M - N + 1).join(p) : "";
      switch (k && w && (R = n(A + R, A.length ? M - d.length : 1 / 0), A = ""), m) {
        case "<":
          R = T + R + d + A;
          break;
        case "=":
          R = T + A + R + d;
          break;
        case "^":
          R = A.slice(0, N = A.length >> 1) + T + R + d + A.slice(N);
          break;
        default:
          R = A + T + R + d;
          break;
      }
      return o(R);
    }
    return z.toString = function() {
      return l + "";
    }, z;
  }
  function s(l, h) {
    var p = Math.max(-8, Math.min(8, Math.floor(Vt(h) / 3))) * 3, m = Math.pow(10, -p), _ = c((l = Jn(l), l.type = "f", l), { suffix: ti[8 + p / 3] });
    return function(S) {
      return _(m * S);
    };
  }
  return {
    format: c,
    formatPrefix: s
  };
}
var Mn, Zi, Ji;
pl({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function pl(t) {
  return Mn = dl(t), Zi = Mn.format, Ji = Mn.formatPrefix, Mn;
}
function gl(t) {
  return Math.max(0, -Vt(Math.abs(t)));
}
function yl(t, n) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Vt(n) / 3))) * 3 - Vt(Math.abs(t)));
}
function ml(t, n) {
  return t = Math.abs(t), n = Math.abs(n) - t, Math.max(0, Vt(n) - Vt(t)) + 1;
}
function vl(t, n, e, r) {
  var i = ec(t, n, e), o;
  switch (r = Jn(r ?? ",f"), r.type) {
    case "s": {
      var u = Math.max(Math.abs(t), Math.abs(n));
      return r.precision == null && !isNaN(o = yl(i, u)) && (r.precision = o), Ji(r, u);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(o = ml(i, Math.max(Math.abs(t), Math.abs(n)))) && (r.precision = o - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(o = gl(i)) && (r.precision = o - (r.type === "%") * 2);
      break;
    }
  }
  return Zi(r);
}
function wl(t) {
  var n = t.domain;
  return t.ticks = function(e) {
    var r = n();
    return nc(r[0], r[r.length - 1], e ?? 10);
  }, t.tickFormat = function(e, r) {
    var i = n();
    return vl(i[0], i[i.length - 1], e ?? 10, r);
  }, t.nice = function(e) {
    e == null && (e = 10);
    var r = n(), i = 0, o = r.length - 1, u = r[i], a = r[o], f, c, s = 10;
    for (a < u && (c = u, u = a, a = c, c = i, i = o, o = c); s-- > 0; ) {
      if (c = Ne(u, a, e), c === f)
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
function Qi() {
  var t = ul();
  return t.copy = function() {
    return il(t, Qi());
  }, Qc.apply(t, arguments), wl(t);
}
function ji(t) {
  return "scale" in t;
}
function to(t) {
  return typeof t == "number" ? t.toLocaleString() : t;
}
function _l(t) {
  const n = new Map(t.values.map((i) => [i.code, i.value]));
  if (ji(t.colors)) {
    const { scale: i, noData: o } = t.colors, u = t.values.map((l) => l.value).filter((l) => typeof l == "number" && !Number.isNaN(l));
    if (u.length === 0 || i.length === 0)
      return () => o;
    const a = Math.min(...u), f = Math.max(...u);
    if (a === f) {
      const l = i[i.length - 1];
      return (h) => n.has(h) ? l : o;
    }
    const c = i.map((l, h) => a + h / (i.length - 1) * (f - a)), s = Qi().domain(c).range(i).clamp(!0);
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
function xl(t, n) {
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
      formatted: r.format ? r.format(i.value) : to(i.value)
    };
  }
  return e;
}
var ri;
const Sl = typeof process < "u" && ((ri = process.env) == null ? void 0 : ri.NODE_ENV) !== "production", ni = /* @__PURE__ */ new Set(), ei = /* @__PURE__ */ new Set();
function bl(t) {
  var n;
  for (const e of t) {
    const r = (n = e.properties) == null ? void 0 : n.code;
    r && ei.add(r);
  }
  return ei;
}
function ge(t, n, e) {
  if (Sl)
    for (const { code: r } of t.values) {
      if (n.has(r)) continue;
      const i = `${t.id}:${t.level}:${r}`;
      ni.has(i) || (ni.add(i), console.warn(
        `[@debunktech/kenya-map] Dataset "${t.id}" has a value for ${t.level} code "${r}", which doesn't match any currently-known ${t.level}${e === "exact" ? "" : ` (${e})`}.`
      ));
    }
}
const Ye = {
  background: "var(--kenya-map-panel-bg, rgba(255,255,255,0.92))",
  border: "1px solid var(--kenya-map-stroke, #71717a)",
  borderRadius: 6,
  padding: 8,
  fontFamily: "sans-serif",
  fontSize: 12
};
function Ml({
  datasets: t,
  activeDatasetId: n,
  currentLevel: e,
  onChange: r
}) {
  return /* @__PURE__ */ L("div", { role: "radiogroup", "aria-label": "Dataset", style: { ...Ye, display: "flex", flexDirection: "column", gap: 4 }, children: t.map((i) => {
    const o = i.level === e, u = i.id === n;
    return /* @__PURE__ */ Q(
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
function El({ dataset: t }) {
  const n = t.format ?? to;
  if (ji(t.colors)) {
    const r = t.values.map((u) => u.value).filter((u) => typeof u == "number");
    if (r.length === 0) return null;
    const i = Math.min(...r), o = Math.max(...r);
    return /* @__PURE__ */ Q("div", { style: Ye, children: [
      /* @__PURE__ */ L("div", { style: { marginBottom: 4, fontWeight: 600 }, children: t.label }),
      /* @__PURE__ */ L(
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
      /* @__PURE__ */ Q("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 2 }, children: [
        /* @__PURE__ */ L("span", { children: n(i) }),
        /* @__PURE__ */ L("span", { children: n(o) })
      ] })
    ] });
  }
  const e = Object.entries(t.colors.categories);
  return /* @__PURE__ */ Q("div", { style: Ye, children: [
    /* @__PURE__ */ L("div", { style: { marginBottom: 4, fontWeight: 600 }, children: t.label }),
    e.map(([r, i]) => /* @__PURE__ */ Q("div", { style: { display: "flex", alignItems: "center", gap: 6, marginTop: 2 }, children: [
      /* @__PURE__ */ L("span", { style: { width: 10, height: 10, borderRadius: 2, background: i, flexShrink: 0 }, "aria-hidden": "true" }),
      /* @__PURE__ */ L("span", { children: r })
    ] }, r))
  ] });
}
const kl = "https://cdn.jsdelivr.net/gh/DebunkTech/kenya-map@v0.1.0/data", Nl = 12;
function $l(t) {
  const [n, e] = xt({ width: 0, height: 0 });
  return _t(() => {
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
function Mt(t) {
  return t.properties;
}
function En(t, n) {
  if (!(!t || !n))
    return t.features.find((e) => Mt(e).code === n);
}
function Al(t, n) {
  const e = Mt(t);
  return { code: e.code, name: e.name, level: n, countyCode: e.county_code, constituencyCode: e.constituency_code };
}
function ye({
  features: t,
  path: n,
  opacity: e,
  focusable: r,
  getFill: i,
  onHover: o,
  onLeave: u,
  onActivate: a
}) {
  return /* @__PURE__ */ L("g", { opacity: e, style: { transition: "opacity 300ms ease" }, children: t.map((f) => {
    const c = Mt(f), s = n(f);
    return s ? /* @__PURE__ */ L(
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
function zl({ x: t, y: n, onClose: e, children: r }) {
  return /* @__PURE__ */ Q(
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
        /* @__PURE__ */ L(
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
function Rl({
  area: t,
  values: n,
  datasets: e
}) {
  return /* @__PURE__ */ Q("div", { children: [
    /* @__PURE__ */ L("div", { style: { fontWeight: 600, marginBottom: e.length ? 4 : 0 }, children: t.name }),
    e.map((r) => {
      var i;
      return /* @__PURE__ */ Q("div", { children: [
        r.label,
        ": ",
        ((i = n[r.id]) == null ? void 0 : i.formatted) ?? "No data"
      ] }, r.id);
    })
  ] });
}
function kn({ children: t }) {
  return /* @__PURE__ */ L(
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
function Pl(t) {
  var ar, sr, cr, lr;
  const n = t.boundariesBaseUrl ?? kl, [e, r] = xt({}), i = t.selection !== void 0, o = i ? t.selection : e, u = Ft(t.onSelect);
  u.current = t.onSelect;
  const a = at(
    (C) => {
      var B;
      i || r(C), (B = u.current) == null || B.call(u, C);
    },
    [i]
  ), f = Ft(null), { width: c, height: s } = $l(f), [l, h] = ce(`${n}/counties.topojson`), [p, m] = ce(
    o.county ? `${n}/constituencies.topojson` : null
  ), [_, S] = ce(
    o.county ? `${n}/wards/${o.county}.topojson` : null
  ), w = Us(n), M = l.status === "ready" ? l.data.features : [], k = kt(() => p.status !== "ready" || !o.county ? [] : p.data.features.filter((C) => Mt(C).county_code === o.county), [p, o.county]), b = kt(() => _.status !== "ready" || !o.constituency ? [] : _.data.features.filter((C) => Mt(C).constituency_code === o.constituency), [_, o.constituency]), $ = o.county ? o.constituency ? "ward" : "constituency" : "county", v = t.datasets, [I, F] = xt(() => {
    var C;
    return (C = v == null ? void 0 : v[0]) == null ? void 0 : C.id;
  }), P = t.activeDatasetId !== void 0, X = P ? t.activeDatasetId : I, z = Ft(t.onDatasetChange);
  z.current = t.onDatasetChange;
  const R = at(
    (C) => {
      var B;
      P || F(C), (B = z.current) == null || B.call(z, C);
    },
    [P]
  );
  _t(() => {
    !P && I === void 0 && v && v.length > 0 && F(v[0].id);
  }, [P, I, v]);
  const T = v == null ? void 0 : v.find((C) => C.id === X), d = kt(() => T ? _l(T) : null, [T]);
  _t(() => {
    if (!v) return;
    const C = new Set(M.map((B) => Mt(B).code));
    for (const B of v)
      B.level === "county" && ge(B, C, "exact");
  }, [v, M]), _t(() => {
    if (!v || p.status !== "ready") return;
    const C = new Set(p.data.features.map((B) => Mt(B).code));
    for (const B of v)
      B.level === "constituency" && ge(B, C, "exact");
  }, [v, p]), _t(() => {
    if (!v || _.status !== "ready") return;
    const C = bl(_.data.features);
    for (const B of v)
      B.level === "ward" && ge(B, C, "wards load per-county, so this may just not be visited yet");
  }, [v, _]);
  const g = kt(() => l.status !== "ready" || c === 0 || s === 0 ? null : Vc(l.data, c, s), [l, c, s]), y = kt(() => g ? Uc(g) : null, [g]), x = kt(() => !y || c === 0 || s === 0 || w.status !== "ready" ? Nl : Math.max(1, Kc(y, w.data.maxZoomWard.bbox, c, s)), [y, c, s, w]), E = Ft(null), N = Ft(null), A = Ft(null), [D, O] = xt(un);
  _t(() => {
    const C = E.current;
    if (!C || c === 0 || s === 0) return;
    const B = Bs().scaleExtent([1, x]).on("zoom", (j) => O(j.transform));
    return N.current = B, pt(C).call(B), () => {
      pt(C).on(".zoom", null);
    };
  }, [c, s, x]);
  const Y = at(
    (C) => {
      const B = E.current, j = N.current;
      if (!B || !j || !y) return;
      const It = C ? Wc(y, C, c, s, x) : un;
      Jc(B, j, It);
    },
    [y, c, s, x]
  ), U = !!t.renderPopup || !!(v && v.length > 0), [H, ut] = xt(null), G = at(() => ut(null), []);
  _t(() => {
    if (!H) return;
    function C(B) {
      f.current && !f.current.contains(B.target) && G();
    }
    return document.addEventListener("click", C), () => document.removeEventListener("click", C);
  }, [H, G]);
  const et = at(
    (C, B) => {
      const j = Mt(C), It = B === "county" ? { county: j.code } : B === "constituency" ? { county: j.county_code, constituency: j.code } : { county: j.county_code, constituency: j.constituency_code, ward: j.code };
      if (a(It), Y(C), U && y) {
        const [gn, oo] = y.centroid(C);
        ut({ area: Al(C, B), cx: gn, cy: oo });
      }
    },
    [a, Y, U, y]
  ), Et = at(() => {
    !o.county || !o.constituency || (a({ county: o.county, constituency: o.constituency }), Y(
      En(
        p.status === "ready" ? p.data : void 0,
        o.constituency
      )
    ), G());
  }, [a, Y, G, o.county, o.constituency, p]), ee = at(() => {
    o.county && (a({ county: o.county }), Y(En(l.status === "ready" ? l.data : void 0, o.county)), G());
  }, [a, Y, G, o.county, l]), dn = at(() => {
    a({}), Y(void 0), G();
  }, [a, Y, G]), ir = at(() => {
    o.ward ? Et() : o.constituency ? ee() : o.county && dn();
  }, [o.ward, o.constituency, o.county, Et, ee, dn]), [pn, or] = xt(null), re = at((C, B, j) => {
    const It = f.current;
    if (!It) return;
    const gn = It.getBoundingClientRect();
    or({ name: C, x: B - gn.left, y: j - gn.top });
  }, []), ie = at(() => or(null), []), no = (sr = (ar = En(l.status === "ready" ? l.data : void 0, o.county)) == null ? void 0 : ar.properties) == null ? void 0 : sr.name, eo = (lr = (cr = En(
    p.status === "ready" ? p.data : void 0,
    o.constituency
  )) == null ? void 0 : cr.properties) == null ? void 0 : lr.name, ur = kt(
    () => H ? xl(H.area, v ?? []) : {},
    [H, v]
  ), [ro, io] = H ? D.apply([H.cx, H.cy]) : [0, 0];
  return /* @__PURE__ */ Q(
    "div",
    {
      ref: f,
      className: t.className,
      style: { position: "relative", width: "100%", height: "100%", minHeight: 300, ...t.style },
      onKeyDown: (C) => {
        C.key === "Escape" && (C.preventDefault(), H ? G() : ir());
      },
      children: [
        /* @__PURE__ */ Q(
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
              /* @__PURE__ */ Q("nav", { "aria-label": "Breadcrumb", style: { display: "flex", alignItems: "center", gap: 4 }, children: [
                /* @__PURE__ */ L("button", { type: "button", onClick: dn, style: me(!o.county), children: "Kenya" }),
                o.county && /* @__PURE__ */ Q(fr, { children: [
                  /* @__PURE__ */ L("span", { "aria-hidden": "true", children: "›" }),
                  /* @__PURE__ */ L(
                    "button",
                    {
                      type: "button",
                      onClick: ee,
                      style: me(!o.constituency),
                      children: no ?? o.county
                    }
                  )
                ] }),
                o.constituency && /* @__PURE__ */ Q(fr, { children: [
                  /* @__PURE__ */ L("span", { "aria-hidden": "true", children: "›" }),
                  /* @__PURE__ */ L(
                    "button",
                    {
                      type: "button",
                      onClick: Et,
                      style: me(!o.ward),
                      children: eo ?? o.constituency
                    }
                  )
                ] })
              ] }),
              (o.county || o.constituency) && /* @__PURE__ */ L("button", { type: "button", onClick: dn, style: Nn, children: "Reset" })
            ]
          }
        ),
        t.showDatasetSwitcher && v && v.length > 0 && /* @__PURE__ */ L("div", { style: { position: "absolute", top: 8, right: 8, zIndex: 1 }, children: /* @__PURE__ */ L(
          Ml,
          {
            datasets: v,
            activeDatasetId: X,
            currentLevel: $,
            onChange: R
          }
        ) }),
        t.showLegend && T && /* @__PURE__ */ L("div", { style: { position: "absolute", bottom: 8, right: 8, zIndex: 1 }, children: /* @__PURE__ */ L(El, { dataset: T }) }),
        l.status === "loading" && /* @__PURE__ */ L(kn, { children: "Loading map…" }),
        l.status === "error" && /* @__PURE__ */ Q(kn, { children: [
          "Failed to load county boundaries: ",
          l.error.message,
          /* @__PURE__ */ L("br", {}),
          /* @__PURE__ */ L("button", { type: "button", onClick: h, style: Nn, children: "Retry" })
        ] }),
        o.county && p.status === "error" && /* @__PURE__ */ Q(kn, { children: [
          "Failed to load constituency boundaries: ",
          p.error.message,
          /* @__PURE__ */ L("br", {}),
          /* @__PURE__ */ L("button", { type: "button", onClick: m, style: Nn, children: "Retry" })
        ] }),
        o.constituency && _.status === "error" && /* @__PURE__ */ Q(kn, { children: [
          "Failed to load ward boundaries: ",
          _.error.message,
          /* @__PURE__ */ L("br", {}),
          /* @__PURE__ */ L("button", { type: "button", onClick: S, style: Nn, children: "Retry" })
        ] }),
        y && /* @__PURE__ */ Q(
          "svg",
          {
            ref: E,
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${c} ${s}`,
            role: "img",
            "aria-label": "Map of Kenya",
            children: [
              /* @__PURE__ */ L("style", { children: `
            .kenya-map-area {
              vector-effect: non-scaling-stroke;
            }
            .kenya-map-area:focus-visible {
              stroke: var(--kenya-map-focus-color, #2563eb);
              stroke-width: 3;
            }
          ` }),
              /* @__PURE__ */ L(
                "rect",
                {
                  x: 0,
                  y: 0,
                  width: c,
                  height: s,
                  fill: "transparent",
                  onPointerDown: (C) => {
                    A.current = { x: C.clientX, y: C.clientY };
                  },
                  onClick: (C) => {
                    const B = A.current;
                    (B ? Math.hypot(C.clientX - B.x, C.clientY - B.y) : 0) < 4 && (G(), ir());
                  }
                }
              ),
              /* @__PURE__ */ Q("g", { transform: `translate(${D.x},${D.y}) scale(${D.k})`, children: [
                /* @__PURE__ */ L(
                  ye,
                  {
                    features: M,
                    path: y,
                    opacity: o.county ? 0.25 : 1,
                    focusable: !o.county,
                    getFill: (T == null ? void 0 : T.level) === "county" && d ? d : void 0,
                    onHover: re,
                    onLeave: ie,
                    onActivate: (C) => et(C, "county")
                  }
                ),
                o.county && /* @__PURE__ */ L(
                  ye,
                  {
                    features: k,
                    path: y,
                    opacity: o.constituency ? 0.25 : 1,
                    focusable: !o.constituency,
                    getFill: (T == null ? void 0 : T.level) === "constituency" && d ? d : void 0,
                    onHover: re,
                    onLeave: ie,
                    onActivate: (C) => et(C, "constituency")
                  }
                ),
                o.constituency && /* @__PURE__ */ L(
                  ye,
                  {
                    features: b,
                    path: y,
                    opacity: 1,
                    focusable: !0,
                    getFill: (T == null ? void 0 : T.level) === "ward" && d ? d : void 0,
                    onHover: re,
                    onLeave: ie,
                    onActivate: (C) => et(C, "ward")
                  }
                )
              ] })
            ]
          }
        ),
        pn && /* @__PURE__ */ L(
          "div",
          {
            style: {
              position: "absolute",
              left: pn.x + 12,
              top: pn.y + 12,
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
            children: pn.name
          }
        ),
        H && /* @__PURE__ */ L(zl, { x: ro, y: io, onClose: G, children: t.renderPopup ? t.renderPopup(H.area, ur) : /* @__PURE__ */ L(Rl, { area: H.area, values: ur, datasets: v ?? [] }) })
      ]
    }
  );
}
function me(t) {
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
const Nn = {
  font: "inherit",
  fontSize: 12,
  padding: "2px 8px",
  borderRadius: 4,
  border: "1px solid var(--kenya-map-stroke, #71717a)",
  background: "var(--kenya-map-fill, #fff)",
  cursor: "pointer"
};
export {
  Pl as KenyaMap
};
//# sourceMappingURL=kenya-map.js.map
