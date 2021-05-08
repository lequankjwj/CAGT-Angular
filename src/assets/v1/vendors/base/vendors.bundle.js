!(function (t, e) {
    'use strict';
    'object' == typeof module && 'object' == typeof module.exports
        ? (module.exports = t.document
              ? e(t, !0)
              : function (t) {
                    if (!t.document) throw new Error('jQuery requires a window with a document');
                    return e(t);
                })
        : e(t);
})('undefined' != typeof window ? window : this, function (k, t) {
    'use strict';
    var e = [],
        C = k.document,
        n = Object.getPrototypeOf,
        a = e.slice,
        m = e.concat,
        l = e.push,
        r = e.indexOf,
        i = {},
        o = i.toString,
        g = i.hasOwnProperty,
        s = g.toString,
        c = s.call(Object),
        v = {},
        y = function (t) {
            return 'function' == typeof t && 'number' != typeof t.nodeType;
        },
        b = function (t) {
            return null != t && t === t.window;
        },
        h = { type: !0, src: !0, noModule: !0 };
    function _(t, e, i) {
        var n,
            r = (e = e || C).createElement('script');
        if (((r.text = t), i)) for (n in h) i[n] && (r[n] = i[n]);
        e.head.appendChild(r).parentNode.removeChild(r);
    }
    function x(t) {
        return null == t ? t + '' : 'object' == typeof t || 'function' == typeof t ? i[o.call(t)] || 'object' : typeof t;
    }
    var d = '3.3.1',
        S = function (t, e) {
            return new S.fn.init(t, e);
        },
        u = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    function p(t) {
        var e = !!t && 'length' in t && t.length,
            i = x(t);
        return !y(t) && !b(t) && ('array' === i || 0 === e || ('number' == typeof e && 0 < e && e - 1 in t));
    }
    (S.fn = S.prototype = {
        jquery: d,
        constructor: S,
        length: 0,
        toArray: function () {
            return a.call(this);
        },
        get: function (t) {
            return null == t ? a.call(this) : t < 0 ? this[t + this.length] : this[t];
        },
        pushStack: function (t) {
            var e = S.merge(this.constructor(), t);
            return (e.prevObject = this), e;
        },
        each: function (t) {
            return S.each(this, t);
        },
        map: function (i) {
            return this.pushStack(
                S.map(this, function (t, e) {
                    return i.call(t, e, t);
                })
            );
        },
        slice: function () {
            return this.pushStack(a.apply(this, arguments));
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        eq: function (t) {
            var e = this.length,
                i = +t + (t < 0 ? e : 0);
            return this.pushStack(0 <= i && i < e ? [this[i]] : []);
        },
        end: function () {
            return this.prevObject || this.constructor();
        },
        push: l,
        sort: e.sort,
        splice: e.splice,
    }),
        (S.extend = S.fn.extend = function () {
            var t,
                e,
                i,
                n,
                r,
                o,
                s = arguments[0] || {},
                a = 1,
                l = arguments.length,
                c = !1;
            for (
                'boolean' == typeof s && ((c = s), (s = arguments[a] || {}), a++),
                    'object' == typeof s || y(s) || (s = {}),
                    a === l && ((s = this), a--);
                a < l;
                a++
            )
                if (null != (t = arguments[a]))
                    for (e in t)
                        (i = s[e]),
                            s !== (n = t[e]) &&
                                (c && n && (S.isPlainObject(n) || (r = Array.isArray(n)))
                                    ? (r ? ((r = !1), (o = i && Array.isArray(i) ? i : [])) : (o = i && S.isPlainObject(i) ? i : {}),
                                      (s[e] = S.extend(c, o, n)))
                                    : void 0 !== n && (s[e] = n));
            return s;
        }),
        S.extend({
            expando: 'jQuery' + (d + Math.random()).replace(/\D/g, ''),
            isReady: !0,
            error: function (t) {
                throw new Error(t);
            },
            noop: function () {},
            isPlainObject: function (t) {
                var e, i;
                return (
                    !(!t || '[object Object]' !== o.call(t)) &&
                    (!(e = n(t)) || ('function' == typeof (i = g.call(e, 'constructor') && e.constructor) && s.call(i) === c))
                );
            },
            isEmptyObject: function (t) {
                var e;
                for (e in t) return !1;
                return !0;
            },
            globalEval: function (t) {
                _(t);
            },
            each: function (t, e) {
                var i,
                    n = 0;
                if (p(t)) for (i = t.length; n < i && !1 !== e.call(t[n], n, t[n]); n++);
                else for (n in t) if (!1 === e.call(t[n], n, t[n])) break;
                return t;
            },
            trim: function (t) {
                return null == t ? '' : (t + '').replace(u, '');
            },
            makeArray: function (t, e) {
                var i = e || [];
                return null != t && (p(Object(t)) ? S.merge(i, 'string' == typeof t ? [t] : t) : l.call(i, t)), i;
            },
            inArray: function (t, e, i) {
                return null == e ? -1 : r.call(e, t, i);
            },
            merge: function (t, e) {
                for (var i = +e.length, n = 0, r = t.length; n < i; n++) t[r++] = e[n];
                return (t.length = r), t;
            },
            grep: function (t, e, i) {
                for (var n = [], r = 0, o = t.length, s = !i; r < o; r++) !e(t[r], r) !== s && n.push(t[r]);
                return n;
            },
            map: function (t, e, i) {
                var n,
                    r,
                    o = 0,
                    s = [];
                if (p(t)) for (n = t.length; o < n; o++) null != (r = e(t[o], o, i)) && s.push(r);
                else for (o in t) null != (r = e(t[o], o, i)) && s.push(r);
                return m.apply([], s);
            },
            guid: 1,
            support: v,
        }),
        'function' == typeof Symbol && (S.fn[Symbol.iterator] = e[Symbol.iterator]),
        S.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function (t, e) {
            i['[object ' + e + ']'] = e.toLowerCase();
        });
    var f = (function (i) {
        var t,
            p,
            _,
            o,
            r,
            f,
            d,
            m,
            x,
            l,
            c,
            w,
            k,
            s,
            C,
            g,
            a,
            h,
            v,
            S = 'sizzle' + 1 * new Date(),
            y = i.document,
            D = 0,
            n = 0,
            u = st(),
            b = st(),
            T = st(),
            M = function (t, e) {
                return t === e && (c = !0), 0;
            },
            A = {}.hasOwnProperty,
            e = [],
            E = e.pop,
            P = e.push,
            I = e.push,
            O = e.slice,
            N = function (t, e) {
                for (var i = 0, n = t.length; i < n; i++) if (t[i] === e) return i;
                return -1;
            },
            j =
                'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
            F = '[\\x20\\t\\r\\n\\f]',
            L = '(?:\\\\.|[\\w-]|[^\0-\\xa0])+',
            $ =
                '\\[' +
                F +
                '*(' +
                L +
                ')(?:' +
                F +
                '*([*^$|!~]?=)' +
                F +
                '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
                L +
                '))|)' +
                F +
                '*\\]',
            R = ':(' + L + ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' + $ + ')*)|.*)\\)|)',
            B = new RegExp(F + '+', 'g'),
            H = new RegExp('^' + F + '+|((?:^|[^\\\\])(?:\\\\.)*)' + F + '+$', 'g'),
            z = new RegExp('^' + F + '*,' + F + '*'),
            U = new RegExp('^' + F + '*([>+~]|' + F + ')' + F + '*'),
            W = new RegExp('=' + F + '*([^\\]\'"]*?)' + F + '*\\]', 'g'),
            Y = new RegExp(R),
            V = new RegExp('^' + L + '$'),
            q = {
                ID: new RegExp('^#(' + L + ')'),
                CLASS: new RegExp('^\\.(' + L + ')'),
                TAG: new RegExp('^(' + L + '|[*])'),
                ATTR: new RegExp('^' + $),
                PSEUDO: new RegExp('^' + R),
                CHILD: new RegExp(
                    '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
                        F +
                        '*(even|odd|(([+-]|)(\\d*)n|)' +
                        F +
                        '*(?:([+-]|)' +
                        F +
                        '*(\\d+)|))' +
                        F +
                        '*\\)|)',
                    'i'
                ),
                bool: new RegExp('^(?:' + j + ')$', 'i'),
                needsContext: new RegExp(
                    '^' + F + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + F + '*((?:-\\d)?\\d*)' + F + '*\\)|)(?=[^-]|$)',
                    'i'
                ),
            },
            G = /^(?:input|select|textarea|button)$/i,
            K = /^h\d$/i,
            X = /^[^{]+\{\s*\[native \w/,
            Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            Q = /[+~]/,
            J = new RegExp('\\\\([\\da-f]{1,6}' + F + '?|(' + F + ')|.)', 'ig'),
            tt = function (t, e, i) {
                var n = '0x' + e - 65536;
                return n != n || i
                    ? e
                    : n < 0
                    ? String.fromCharCode(n + 65536)
                    : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320);
            },
            et = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            it = function (t, e) {
                return e ? ('\0' === t ? '�' : t.slice(0, -1) + '\\' + t.charCodeAt(t.length - 1).toString(16) + ' ') : '\\' + t;
            },
            nt = function () {
                w();
            },
            rt = yt(
                function (t) {
                    return !0 === t.disabled && ('form' in t || 'label' in t);
                },
                { dir: 'parentNode', next: 'legend' }
            );
        try {
            I.apply((e = O.call(y.childNodes)), y.childNodes), e[y.childNodes.length].nodeType;
        } catch (t) {
            I = {
                apply: e.length
                    ? function (t, e) {
                          P.apply(t, O.call(e));
                      }
                    : function (t, e) {
                          for (var i = t.length, n = 0; (t[i++] = e[n++]); );
                          t.length = i - 1;
                      },
            };
        }
        function ot(t, e, i, n) {
            var r,
                o,
                s,
                a,
                l,
                c,
                h,
                d = e && e.ownerDocument,
                u = e ? e.nodeType : 9;
            if (((i = i || []), 'string' != typeof t || !t || (1 !== u && 9 !== u && 11 !== u))) return i;
            if (!n && ((e ? e.ownerDocument || e : y) !== k && w(e), (e = e || k), C)) {
                if (11 !== u && (l = Z.exec(t)))
                    if ((r = l[1])) {
                        if (9 === u) {
                            if (!(s = e.getElementById(r))) return i;
                            if (s.id === r) return i.push(s), i;
                        } else if (d && (s = d.getElementById(r)) && v(e, s) && s.id === r) return i.push(s), i;
                    } else {
                        if (l[2]) return I.apply(i, e.getElementsByTagName(t)), i;
                        if ((r = l[3]) && p.getElementsByClassName && e.getElementsByClassName)
                            return I.apply(i, e.getElementsByClassName(r)), i;
                    }
                if (p.qsa && !T[t + ' '] && (!g || !g.test(t))) {
                    if (1 !== u) (d = e), (h = t);
                    else if ('object' !== e.nodeName.toLowerCase()) {
                        for (
                            (a = e.getAttribute('id')) ? (a = a.replace(et, it)) : e.setAttribute('id', (a = S)), o = (c = f(t)).length;
                            o--;

                        )
                            c[o] = '#' + a + ' ' + vt(c[o]);
                        (h = c.join(',')), (d = (Q.test(t) && mt(e.parentNode)) || e);
                    }
                    if (h)
                        try {
                            return I.apply(i, d.querySelectorAll(h)), i;
                        } catch (t) {
                        } finally {
                            a === S && e.removeAttribute('id');
                        }
                }
            }
            return m(t.replace(H, '$1'), e, i, n);
        }
        function st() {
            var n = [];
            return function t(e, i) {
                return n.push(e + ' ') > _.cacheLength && delete t[n.shift()], (t[e + ' '] = i);
            };
        }
        function at(t) {
            return (t[S] = !0), t;
        }
        function lt(t) {
            var e = k.createElement('fieldset');
            try {
                return !!t(e);
            } catch (t) {
                return !1;
            } finally {
                e.parentNode && e.parentNode.removeChild(e), (e = null);
            }
        }
        function ct(t, e) {
            for (var i = t.split('|'), n = i.length; n--; ) _.attrHandle[i[n]] = e;
        }
        function ht(t, e) {
            var i = e && t,
                n = i && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex;
            if (n) return n;
            if (i) for (; (i = i.nextSibling); ) if (i === e) return -1;
            return t ? 1 : -1;
        }
        function dt(e) {
            return function (t) {
                return 'input' === t.nodeName.toLowerCase() && t.type === e;
            };
        }
        function ut(i) {
            return function (t) {
                var e = t.nodeName.toLowerCase();
                return ('input' === e || 'button' === e) && t.type === i;
            };
        }
        function pt(e) {
            return function (t) {
                return 'form' in t
                    ? t.parentNode && !1 === t.disabled
                        ? 'label' in t
                            ? 'label' in t.parentNode
                                ? t.parentNode.disabled === e
                                : t.disabled === e
                            : t.isDisabled === e || (t.isDisabled !== !e && rt(t) === e)
                        : t.disabled === e
                    : 'label' in t && t.disabled === e;
            };
        }
        function ft(s) {
            return at(function (o) {
                return (
                    (o = +o),
                    at(function (t, e) {
                        for (var i, n = s([], t.length, o), r = n.length; r--; ) t[(i = n[r])] && (t[i] = !(e[i] = t[i]));
                    })
                );
            });
        }
        function mt(t) {
            return t && void 0 !== t.getElementsByTagName && t;
        }
        for (t in ((p = ot.support = {}),
        (r = ot.isXML = function (t) {
            var e = t && (t.ownerDocument || t).documentElement;
            return !!e && 'HTML' !== e.nodeName;
        }),
        (w = ot.setDocument = function (t) {
            var e,
                i,
                n = t ? t.ownerDocument || t : y;
            return (
                n !== k &&
                    9 === n.nodeType &&
                    n.documentElement &&
                    ((s = (k = n).documentElement),
                    (C = !r(k)),
                    y !== k &&
                        (i = k.defaultView) &&
                        i.top !== i &&
                        (i.addEventListener ? i.addEventListener('unload', nt, !1) : i.attachEvent && i.attachEvent('onunload', nt)),
                    (p.attributes = lt(function (t) {
                        return (t.className = 'i'), !t.getAttribute('className');
                    })),
                    (p.getElementsByTagName = lt(function (t) {
                        return t.appendChild(k.createComment('')), !t.getElementsByTagName('*').length;
                    })),
                    (p.getElementsByClassName = X.test(k.getElementsByClassName)),
                    (p.getById = lt(function (t) {
                        return (s.appendChild(t).id = S), !k.getElementsByName || !k.getElementsByName(S).length;
                    })),
                    p.getById
                        ? ((_.filter.ID = function (t) {
                              var e = t.replace(J, tt);
                              return function (t) {
                                  return t.getAttribute('id') === e;
                              };
                          }),
                          (_.find.ID = function (t, e) {
                              if (void 0 !== e.getElementById && C) {
                                  var i = e.getElementById(t);
                                  return i ? [i] : [];
                              }
                          }))
                        : ((_.filter.ID = function (t) {
                              var i = t.replace(J, tt);
                              return function (t) {
                                  var e = void 0 !== t.getAttributeNode && t.getAttributeNode('id');
                                  return e && e.value === i;
                              };
                          }),
                          (_.find.ID = function (t, e) {
                              if (void 0 !== e.getElementById && C) {
                                  var i,
                                      n,
                                      r,
                                      o = e.getElementById(t);
                                  if (o) {
                                      if ((i = o.getAttributeNode('id')) && i.value === t) return [o];
                                      for (r = e.getElementsByName(t), n = 0; (o = r[n++]); )
                                          if ((i = o.getAttributeNode('id')) && i.value === t) return [o];
                                  }
                                  return [];
                              }
                          })),
                    (_.find.TAG = p.getElementsByTagName
                        ? function (t, e) {
                              return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : p.qsa ? e.querySelectorAll(t) : void 0;
                          }
                        : function (t, e) {
                              var i,
                                  n = [],
                                  r = 0,
                                  o = e.getElementsByTagName(t);
                              if ('*' === t) {
                                  for (; (i = o[r++]); ) 1 === i.nodeType && n.push(i);
                                  return n;
                              }
                              return o;
                          }),
                    (_.find.CLASS =
                        p.getElementsByClassName &&
                        function (t, e) {
                            if (void 0 !== e.getElementsByClassName && C) return e.getElementsByClassName(t);
                        }),
                    (a = []),
                    (g = []),
                    (p.qsa = X.test(k.querySelectorAll)) &&
                        (lt(function (t) {
                            (s.appendChild(t).innerHTML =
                                "<a id='" +
                                S +
                                "'></a><select id='" +
                                S +
                                "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                                t.querySelectorAll("[msallowcapture^='']").length && g.push('[*^$]=' + F + '*(?:\'\'|"")'),
                                t.querySelectorAll('[selected]').length || g.push('\\[' + F + '*(?:value|' + j + ')'),
                                t.querySelectorAll('[id~=' + S + '-]').length || g.push('~='),
                                t.querySelectorAll(':checked').length || g.push(':checked'),
                                t.querySelectorAll('a#' + S + '+*').length || g.push('.#.+[+~]');
                        }),
                        lt(function (t) {
                            t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                            var e = k.createElement('input');
                            e.setAttribute('type', 'hidden'),
                                t.appendChild(e).setAttribute('name', 'D'),
                                t.querySelectorAll('[name=d]').length && g.push('name' + F + '*[*^$|!~]?='),
                                2 !== t.querySelectorAll(':enabled').length && g.push(':enabled', ':disabled'),
                                (s.appendChild(t).disabled = !0),
                                2 !== t.querySelectorAll(':disabled').length && g.push(':enabled', ':disabled'),
                                t.querySelectorAll('*,:x'),
                                g.push(',.*:');
                        })),
                    (p.matchesSelector = X.test(
                        (h = s.matches || s.webkitMatchesSelector || s.mozMatchesSelector || s.oMatchesSelector || s.msMatchesSelector)
                    )) &&
                        lt(function (t) {
                            (p.disconnectedMatch = h.call(t, '*')), h.call(t, "[s!='']:x"), a.push('!=', R);
                        }),
                    (g = g.length && new RegExp(g.join('|'))),
                    (a = a.length && new RegExp(a.join('|'))),
                    (e = X.test(s.compareDocumentPosition)),
                    (v =
                        e || X.test(s.contains)
                            ? function (t, e) {
                                  var i = 9 === t.nodeType ? t.documentElement : t,
                                      n = e && e.parentNode;
                                  return (
                                      t === n ||
                                      !(
                                          !n ||
                                          1 !== n.nodeType ||
                                          !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n))
                                      )
                                  );
                              }
                            : function (t, e) {
                                  if (e) for (; (e = e.parentNode); ) if (e === t) return !0;
                                  return !1;
                              }),
                    (M = e
                        ? function (t, e) {
                              if (t === e) return (c = !0), 0;
                              var i = !t.compareDocumentPosition - !e.compareDocumentPosition;
                              return (
                                  i ||
                                  (1 & (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) ||
                                  (!p.sortDetached && e.compareDocumentPosition(t) === i)
                                      ? t === k || (t.ownerDocument === y && v(y, t))
                                          ? -1
                                          : e === k || (e.ownerDocument === y && v(y, e))
                                          ? 1
                                          : l
                                          ? N(l, t) - N(l, e)
                                          : 0
                                      : 4 & i
                                      ? -1
                                      : 1)
                              );
                          }
                        : function (t, e) {
                              if (t === e) return (c = !0), 0;
                              var i,
                                  n = 0,
                                  r = t.parentNode,
                                  o = e.parentNode,
                                  s = [t],
                                  a = [e];
                              if (!r || !o) return t === k ? -1 : e === k ? 1 : r ? -1 : o ? 1 : l ? N(l, t) - N(l, e) : 0;
                              if (r === o) return ht(t, e);
                              for (i = t; (i = i.parentNode); ) s.unshift(i);
                              for (i = e; (i = i.parentNode); ) a.unshift(i);
                              for (; s[n] === a[n]; ) n++;
                              return n ? ht(s[n], a[n]) : s[n] === y ? -1 : a[n] === y ? 1 : 0;
                          })),
                k
            );
        }),
        (ot.matches = function (t, e) {
            return ot(t, null, null, e);
        }),
        (ot.matchesSelector = function (t, e) {
            if (
                ((t.ownerDocument || t) !== k && w(t),
                (e = e.replace(W, "='$1']")),
                p.matchesSelector && C && !T[e + ' '] && (!a || !a.test(e)) && (!g || !g.test(e)))
            )
                try {
                    var i = h.call(t, e);
                    if (i || p.disconnectedMatch || (t.document && 11 !== t.document.nodeType)) return i;
                } catch (t) {}
            return 0 < ot(e, k, null, [t]).length;
        }),
        (ot.contains = function (t, e) {
            return (t.ownerDocument || t) !== k && w(t), v(t, e);
        }),
        (ot.attr = function (t, e) {
            (t.ownerDocument || t) !== k && w(t);
            var i = _.attrHandle[e.toLowerCase()],
                n = i && A.call(_.attrHandle, e.toLowerCase()) ? i(t, e, !C) : void 0;
            return void 0 !== n ? n : p.attributes || !C ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null;
        }),
        (ot.escape = function (t) {
            return (t + '').replace(et, it);
        }),
        (ot.error = function (t) {
            throw new Error('Syntax error, unrecognized expression: ' + t);
        }),
        (ot.uniqueSort = function (t) {
            var e,
                i = [],
                n = 0,
                r = 0;
            if (((c = !p.detectDuplicates), (l = !p.sortStable && t.slice(0)), t.sort(M), c)) {
                for (; (e = t[r++]); ) e === t[r] && (n = i.push(r));
                for (; n--; ) t.splice(i[n], 1);
            }
            return (l = null), t;
        }),
        (o = ot.getText = function (t) {
            var e,
                i = '',
                n = 0,
                r = t.nodeType;
            if (r) {
                if (1 === r || 9 === r || 11 === r) {
                    if ('string' == typeof t.textContent) return t.textContent;
                    for (t = t.firstChild; t; t = t.nextSibling) i += o(t);
                } else if (3 === r || 4 === r) return t.nodeValue;
            } else for (; (e = t[n++]); ) i += o(e);
            return i;
        }),
        ((_ = ot.selectors = {
            cacheLength: 50,
            createPseudo: at,
            match: q,
            attrHandle: {},
            find: {},
            relative: {
                '>': { dir: 'parentNode', first: !0 },
                ' ': { dir: 'parentNode' },
                '+': { dir: 'previousSibling', first: !0 },
                '~': { dir: 'previousSibling' },
            },
            preFilter: {
                ATTR: function (t) {
                    return (
                        (t[1] = t[1].replace(J, tt)),
                        (t[3] = (t[3] || t[4] || t[5] || '').replace(J, tt)),
                        '~=' === t[2] && (t[3] = ' ' + t[3] + ' '),
                        t.slice(0, 4)
                    );
                },
                CHILD: function (t) {
                    return (
                        (t[1] = t[1].toLowerCase()),
                        'nth' === t[1].slice(0, 3)
                            ? (t[3] || ot.error(t[0]),
                              (t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ('even' === t[3] || 'odd' === t[3]))),
                              (t[5] = +(t[7] + t[8] || 'odd' === t[3])))
                            : t[3] && ot.error(t[0]),
                        t
                    );
                },
                PSEUDO: function (t) {
                    var e,
                        i = !t[6] && t[2];
                    return q.CHILD.test(t[0])
                        ? null
                        : (t[3]
                              ? (t[2] = t[4] || t[5] || '')
                              : i &&
                                Y.test(i) &&
                                (e = f(i, !0)) &&
                                (e = i.indexOf(')', i.length - e) - i.length) &&
                                ((t[0] = t[0].slice(0, e)), (t[2] = i.slice(0, e))),
                          t.slice(0, 3));
                },
            },
            filter: {
                TAG: function (t) {
                    var e = t.replace(J, tt).toLowerCase();
                    return '*' === t
                        ? function () {
                              return !0;
                          }
                        : function (t) {
                              return t.nodeName && t.nodeName.toLowerCase() === e;
                          };
                },
                CLASS: function (t) {
                    var e = u[t + ' '];
                    return (
                        e ||
                        ((e = new RegExp('(^|' + F + ')' + t + '(' + F + '|$)')) &&
                            u(t, function (t) {
                                return e.test(
                                    ('string' == typeof t.className && t.className) ||
                                        (void 0 !== t.getAttribute && t.getAttribute('class')) ||
                                        ''
                                );
                            }))
                    );
                },
                ATTR: function (i, n, r) {
                    return function (t) {
                        var e = ot.attr(t, i);
                        return null == e
                            ? '!=' === n
                            : !n ||
                                  ((e += ''),
                                  '=' === n
                                      ? e === r
                                      : '!=' === n
                                      ? e !== r
                                      : '^=' === n
                                      ? r && 0 === e.indexOf(r)
                                      : '*=' === n
                                      ? r && -1 < e.indexOf(r)
                                      : '$=' === n
                                      ? r && e.slice(-r.length) === r
                                      : '~=' === n
                                      ? -1 < (' ' + e.replace(B, ' ') + ' ').indexOf(r)
                                      : '|=' === n && (e === r || e.slice(0, r.length + 1) === r + '-'));
                    };
                },
                CHILD: function (f, t, e, m, g) {
                    var v = 'nth' !== f.slice(0, 3),
                        y = 'last' !== f.slice(-4),
                        b = 'of-type' === t;
                    return 1 === m && 0 === g
                        ? function (t) {
                              return !!t.parentNode;
                          }
                        : function (t, e, i) {
                              var n,
                                  r,
                                  o,
                                  s,
                                  a,
                                  l,
                                  c = v !== y ? 'nextSibling' : 'previousSibling',
                                  h = t.parentNode,
                                  d = b && t.nodeName.toLowerCase(),
                                  u = !i && !b,
                                  p = !1;
                              if (h) {
                                  if (v) {
                                      for (; c; ) {
                                          for (s = t; (s = s[c]); ) if (b ? s.nodeName.toLowerCase() === d : 1 === s.nodeType) return !1;
                                          l = c = 'only' === f && !l && 'nextSibling';
                                      }
                                      return !0;
                                  }
                                  if (((l = [y ? h.firstChild : h.lastChild]), y && u)) {
                                      for (
                                          p =
                                              (a =
                                                  (n =
                                                      (r = (o = (s = h)[S] || (s[S] = {}))[s.uniqueID] || (o[s.uniqueID] = {}))[f] ||
                                                      [])[0] === D && n[1]) && n[2],
                                              s = a && h.childNodes[a];
                                          (s = (++a && s && s[c]) || (p = a = 0) || l.pop());

                                      )
                                          if (1 === s.nodeType && ++p && s === t) {
                                              r[f] = [D, a, p];
                                              break;
                                          }
                                  } else if (
                                      (u &&
                                          (p = a =
                                              (n =
                                                  (r = (o = (s = t)[S] || (s[S] = {}))[s.uniqueID] || (o[s.uniqueID] = {}))[f] || [])[0] ===
                                                  D && n[1]),
                                      !1 === p)
                                  )
                                      for (
                                          ;
                                          (s = (++a && s && s[c]) || (p = a = 0) || l.pop()) &&
                                          ((b ? s.nodeName.toLowerCase() !== d : 1 !== s.nodeType) ||
                                              !++p ||
                                              (u && ((r = (o = s[S] || (s[S] = {}))[s.uniqueID] || (o[s.uniqueID] = {}))[f] = [D, p]),
                                              s !== t));

                                      );
                                  return (p -= g) === m || (p % m == 0 && 0 <= p / m);
                              }
                          };
                },
                PSEUDO: function (t, o) {
                    var e,
                        s = _.pseudos[t] || _.setFilters[t.toLowerCase()] || ot.error('unsupported pseudo: ' + t);
                    return s[S]
                        ? s(o)
                        : 1 < s.length
                        ? ((e = [t, t, '', o]),
                          _.setFilters.hasOwnProperty(t.toLowerCase())
                              ? at(function (t, e) {
                                    for (var i, n = s(t, o), r = n.length; r--; ) t[(i = N(t, n[r]))] = !(e[i] = n[r]);
                                })
                              : function (t) {
                                    return s(t, 0, e);
                                })
                        : s;
                },
            },
            pseudos: {
                not: at(function (t) {
                    var n = [],
                        r = [],
                        a = d(t.replace(H, '$1'));
                    return a[S]
                        ? at(function (t, e, i, n) {
                              for (var r, o = a(t, null, n, []), s = t.length; s--; ) (r = o[s]) && (t[s] = !(e[s] = r));
                          })
                        : function (t, e, i) {
                              return (n[0] = t), a(n, null, i, r), (n[0] = null), !r.pop();
                          };
                }),
                has: at(function (e) {
                    return function (t) {
                        return 0 < ot(e, t).length;
                    };
                }),
                contains: at(function (e) {
                    return (
                        (e = e.replace(J, tt)),
                        function (t) {
                            return -1 < (t.textContent || t.innerText || o(t)).indexOf(e);
                        }
                    );
                }),
                lang: at(function (i) {
                    return (
                        V.test(i || '') || ot.error('unsupported lang: ' + i),
                        (i = i.replace(J, tt).toLowerCase()),
                        function (t) {
                            var e;
                            do {
                                if ((e = C ? t.lang : t.getAttribute('xml:lang') || t.getAttribute('lang')))
                                    return (e = e.toLowerCase()) === i || 0 === e.indexOf(i + '-');
                            } while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1;
                        }
                    );
                }),
                target: function (t) {
                    var e = i.location && i.location.hash;
                    return e && e.slice(1) === t.id;
                },
                root: function (t) {
                    return t === s;
                },
                focus: function (t) {
                    return t === k.activeElement && (!k.hasFocus || k.hasFocus()) && !!(t.type || t.href || ~t.tabIndex);
                },
                enabled: pt(!1),
                disabled: pt(!0),
                checked: function (t) {
                    var e = t.nodeName.toLowerCase();
                    return ('input' === e && !!t.checked) || ('option' === e && !!t.selected);
                },
                selected: function (t) {
                    return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected;
                },
                empty: function (t) {
                    for (t = t.firstChild; t; t = t.nextSibling) if (t.nodeType < 6) return !1;
                    return !0;
                },
                parent: function (t) {
                    return !_.pseudos.empty(t);
                },
                header: function (t) {
                    return K.test(t.nodeName);
                },
                input: function (t) {
                    return G.test(t.nodeName);
                },
                button: function (t) {
                    var e = t.nodeName.toLowerCase();
                    return ('input' === e && 'button' === t.type) || 'button' === e;
                },
                text: function (t) {
                    var e;
                    return (
                        'input' === t.nodeName.toLowerCase() &&
                        'text' === t.type &&
                        (null == (e = t.getAttribute('type')) || 'text' === e.toLowerCase())
                    );
                },
                first: ft(function () {
                    return [0];
                }),
                last: ft(function (t, e) {
                    return [e - 1];
                }),
                eq: ft(function (t, e, i) {
                    return [i < 0 ? i + e : i];
                }),
                even: ft(function (t, e) {
                    for (var i = 0; i < e; i += 2) t.push(i);
                    return t;
                }),
                odd: ft(function (t, e) {
                    for (var i = 1; i < e; i += 2) t.push(i);
                    return t;
                }),
                lt: ft(function (t, e, i) {
                    for (var n = i < 0 ? i + e : i; 0 <= --n; ) t.push(n);
                    return t;
                }),
                gt: ft(function (t, e, i) {
                    for (var n = i < 0 ? i + e : i; ++n < e; ) t.push(n);
                    return t;
                }),
            },
        }).pseudos.nth = _.pseudos.eq),
        { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
            _.pseudos[t] = dt(t);
        for (t in { submit: !0, reset: !0 }) _.pseudos[t] = ut(t);
        function gt() {}
        function vt(t) {
            for (var e = 0, i = t.length, n = ''; e < i; e++) n += t[e].value;
            return n;
        }
        function yt(a, t, e) {
            var l = t.dir,
                c = t.next,
                h = c || l,
                d = e && 'parentNode' === h,
                u = n++;
            return t.first
                ? function (t, e, i) {
                      for (; (t = t[l]); ) if (1 === t.nodeType || d) return a(t, e, i);
                      return !1;
                  }
                : function (t, e, i) {
                      var n,
                          r,
                          o,
                          s = [D, u];
                      if (i) {
                          for (; (t = t[l]); ) if ((1 === t.nodeType || d) && a(t, e, i)) return !0;
                      } else
                          for (; (t = t[l]); )
                              if (1 === t.nodeType || d)
                                  if (
                                      ((r = (o = t[S] || (t[S] = {}))[t.uniqueID] || (o[t.uniqueID] = {})),
                                      c && c === t.nodeName.toLowerCase())
                                  )
                                      t = t[l] || t;
                                  else {
                                      if ((n = r[h]) && n[0] === D && n[1] === u) return (s[2] = n[2]);
                                      if (((r[h] = s)[2] = a(t, e, i))) return !0;
                                  }
                      return !1;
                  };
        }
        function bt(r) {
            return 1 < r.length
                ? function (t, e, i) {
                      for (var n = r.length; n--; ) if (!r[n](t, e, i)) return !1;
                      return !0;
                  }
                : r[0];
        }
        function _t(t, e, i, n, r) {
            for (var o, s = [], a = 0, l = t.length, c = null != e; a < l; a++)
                (o = t[a]) && ((i && !i(o, n, r)) || (s.push(o), c && e.push(a)));
            return s;
        }
        function xt(p, f, m, g, v, t) {
            return (
                g && !g[S] && (g = xt(g)),
                v && !v[S] && (v = xt(v, t)),
                at(function (t, e, i, n) {
                    var r,
                        o,
                        s,
                        a = [],
                        l = [],
                        c = e.length,
                        h =
                            t ||
                            (function (t, e, i) {
                                for (var n = 0, r = e.length; n < r; n++) ot(t, e[n], i);
                                return i;
                            })(f || '*', i.nodeType ? [i] : i, []),
                        d = !p || (!t && f) ? h : _t(h, a, p, i, n),
                        u = m ? (v || (t ? p : c || g) ? [] : e) : d;
                    if ((m && m(d, u, i, n), g))
                        for (r = _t(u, l), g(r, [], i, n), o = r.length; o--; ) (s = r[o]) && (u[l[o]] = !(d[l[o]] = s));
                    if (t) {
                        if (v || p) {
                            if (v) {
                                for (r = [], o = u.length; o--; ) (s = u[o]) && r.push((d[o] = s));
                                v(null, (u = []), r, n);
                            }
                            for (o = u.length; o--; ) (s = u[o]) && -1 < (r = v ? N(t, s) : a[o]) && (t[r] = !(e[r] = s));
                        }
                    } else (u = _t(u === e ? u.splice(c, u.length) : u)), v ? v(null, e, u, n) : I.apply(e, u);
                })
            );
        }
        function wt(t) {
            for (
                var r,
                    e,
                    i,
                    n = t.length,
                    o = _.relative[t[0].type],
                    s = o || _.relative[' '],
                    a = o ? 1 : 0,
                    l = yt(
                        function (t) {
                            return t === r;
                        },
                        s,
                        !0
                    ),
                    c = yt(
                        function (t) {
                            return -1 < N(r, t);
                        },
                        s,
                        !0
                    ),
                    h = [
                        function (t, e, i) {
                            var n = (!o && (i || e !== x)) || ((r = e).nodeType ? l(t, e, i) : c(t, e, i));
                            return (r = null), n;
                        },
                    ];
                a < n;
                a++
            )
                if ((e = _.relative[t[a].type])) h = [yt(bt(h), e)];
                else {
                    if ((e = _.filter[t[a].type].apply(null, t[a].matches))[S]) {
                        for (i = ++a; i < n && !_.relative[t[i].type]; i++);
                        return xt(
                            1 < a && bt(h),
                            1 < a && vt(t.slice(0, a - 1).concat({ value: ' ' === t[a - 2].type ? '*' : '' })).replace(H, '$1'),
                            e,
                            a < i && wt(t.slice(a, i)),
                            i < n && wt((t = t.slice(i))),
                            i < n && vt(t)
                        );
                    }
                    h.push(e);
                }
            return bt(h);
        }
        return (
            (gt.prototype = _.filters = _.pseudos),
            (_.setFilters = new gt()),
            (f = ot.tokenize = function (t, e) {
                var i,
                    n,
                    r,
                    o,
                    s,
                    a,
                    l,
                    c = b[t + ' '];
                if (c) return e ? 0 : c.slice(0);
                for (s = t, a = [], l = _.preFilter; s; ) {
                    for (o in ((i && !(n = z.exec(s))) || (n && (s = s.slice(n[0].length) || s), a.push((r = []))),
                    (i = !1),
                    (n = U.exec(s)) && ((i = n.shift()), r.push({ value: i, type: n[0].replace(H, ' ') }), (s = s.slice(i.length))),
                    _.filter))
                        !(n = q[o].exec(s)) ||
                            (l[o] && !(n = l[o](n))) ||
                            ((i = n.shift()), r.push({ value: i, type: o, matches: n }), (s = s.slice(i.length)));
                    if (!i) break;
                }
                return e ? s.length : s ? ot.error(t) : b(t, a).slice(0);
            }),
            (d = ot.compile = function (t, e) {
                var i,
                    g,
                    v,
                    y,
                    b,
                    n,
                    r = [],
                    o = [],
                    s = T[t + ' '];
                if (!s) {
                    for (e || (e = f(t)), i = e.length; i--; ) (s = wt(e[i]))[S] ? r.push(s) : o.push(s);
                    (s = T(
                        t,
                        ((g = o),
                        (y = 0 < (v = r).length),
                        (b = 0 < g.length),
                        (n = function (t, e, i, n, r) {
                            var o,
                                s,
                                a,
                                l = 0,
                                c = '0',
                                h = t && [],
                                d = [],
                                u = x,
                                p = t || (b && _.find.TAG('*', r)),
                                f = (D += null == u ? 1 : Math.random() || 0.1),
                                m = p.length;
                            for (r && (x = e === k || e || r); c !== m && null != (o = p[c]); c++) {
                                if (b && o) {
                                    for (s = 0, e || o.ownerDocument === k || (w(o), (i = !C)); (a = g[s++]); )
                                        if (a(o, e || k, i)) {
                                            n.push(o);
                                            break;
                                        }
                                    r && (D = f);
                                }
                                y && ((o = !a && o) && l--, t && h.push(o));
                            }
                            if (((l += c), y && c !== l)) {
                                for (s = 0; (a = v[s++]); ) a(h, d, e, i);
                                if (t) {
                                    if (0 < l) for (; c--; ) h[c] || d[c] || (d[c] = E.call(n));
                                    d = _t(d);
                                }
                                I.apply(n, d), r && !t && 0 < d.length && 1 < l + v.length && ot.uniqueSort(n);
                            }
                            return r && ((D = f), (x = u)), h;
                        }),
                        y ? at(n) : n)
                    )).selector = t;
                }
                return s;
            }),
            (m = ot.select = function (t, e, i, n) {
                var r,
                    o,
                    s,
                    a,
                    l,
                    c = 'function' == typeof t && t,
                    h = !n && f((t = c.selector || t));
                if (((i = i || []), 1 === h.length)) {
                    if (
                        2 < (o = h[0] = h[0].slice(0)).length &&
                        'ID' === (s = o[0]).type &&
                        9 === e.nodeType &&
                        C &&
                        _.relative[o[1].type]
                    ) {
                        if (!(e = (_.find.ID(s.matches[0].replace(J, tt), e) || [])[0])) return i;
                        c && (e = e.parentNode), (t = t.slice(o.shift().value.length));
                    }
                    for (r = q.needsContext.test(t) ? 0 : o.length; r-- && ((s = o[r]), !_.relative[(a = s.type)]); )
                        if ((l = _.find[a]) && (n = l(s.matches[0].replace(J, tt), (Q.test(o[0].type) && mt(e.parentNode)) || e))) {
                            if ((o.splice(r, 1), !(t = n.length && vt(o)))) return I.apply(i, n), i;
                            break;
                        }
                }
                return (c || d(t, h))(n, e, !C, i, !e || (Q.test(t) && mt(e.parentNode)) || e), i;
            }),
            (p.sortStable = S.split('').sort(M).join('') === S),
            (p.detectDuplicates = !!c),
            w(),
            (p.sortDetached = lt(function (t) {
                return 1 & t.compareDocumentPosition(k.createElement('fieldset'));
            })),
            lt(function (t) {
                return (t.innerHTML = "<a href='#'></a>"), '#' === t.firstChild.getAttribute('href');
            }) ||
                ct('type|href|height|width', function (t, e, i) {
                    if (!i) return t.getAttribute(e, 'type' === e.toLowerCase() ? 1 : 2);
                }),
            (p.attributes &&
                lt(function (t) {
                    return (t.innerHTML = '<input/>'), t.firstChild.setAttribute('value', ''), '' === t.firstChild.getAttribute('value');
                })) ||
                ct('value', function (t, e, i) {
                    if (!i && 'input' === t.nodeName.toLowerCase()) return t.defaultValue;
                }),
            lt(function (t) {
                return null == t.getAttribute('disabled');
            }) ||
                ct(j, function (t, e, i) {
                    var n;
                    if (!i) return !0 === t[e] ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null;
                }),
            ot
        );
    })(k);
    (S.find = f),
        (S.expr = f.selectors),
        (S.expr[':'] = S.expr.pseudos),
        (S.uniqueSort = S.unique = f.uniqueSort),
        (S.text = f.getText),
        (S.isXMLDoc = f.isXML),
        (S.contains = f.contains),
        (S.escapeSelector = f.escape);
    var w = function (t, e, i) {
            for (var n = [], r = void 0 !== i; (t = t[e]) && 9 !== t.nodeType; )
                if (1 === t.nodeType) {
                    if (r && S(t).is(i)) break;
                    n.push(t);
                }
            return n;
        },
        D = function (t, e) {
            for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
            return i;
        },
        T = S.expr.match.needsContext;
    function M(t, e) {
        return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
    }
    var A = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function E(t, i, n) {
        return y(i)
            ? S.grep(t, function (t, e) {
                  return !!i.call(t, e, t) !== n;
              })
            : i.nodeType
            ? S.grep(t, function (t) {
                  return (t === i) !== n;
              })
            : 'string' != typeof i
            ? S.grep(t, function (t) {
                  return -1 < r.call(i, t) !== n;
              })
            : S.filter(i, t, n);
    }
    (S.filter = function (t, e, i) {
        var n = e[0];
        return (
            i && (t = ':not(' + t + ')'),
            1 === e.length && 1 === n.nodeType
                ? S.find.matchesSelector(n, t)
                    ? [n]
                    : []
                : S.find.matches(
                      t,
                      S.grep(e, function (t) {
                          return 1 === t.nodeType;
                      })
                  )
        );
    }),
        S.fn.extend({
            find: function (t) {
                var e,
                    i,
                    n = this.length,
                    r = this;
                if ('string' != typeof t)
                    return this.pushStack(
                        S(t).filter(function () {
                            for (e = 0; e < n; e++) if (S.contains(r[e], this)) return !0;
                        })
                    );
                for (i = this.pushStack([]), e = 0; e < n; e++) S.find(t, r[e], i);
                return 1 < n ? S.uniqueSort(i) : i;
            },
            filter: function (t) {
                return this.pushStack(E(this, t || [], !1));
            },
            not: function (t) {
                return this.pushStack(E(this, t || [], !0));
            },
            is: function (t) {
                return !!E(this, 'string' == typeof t && T.test(t) ? S(t) : t || [], !1).length;
            },
        });
    var P,
        I = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    ((S.fn.init = function (t, e, i) {
        var n, r;
        if (!t) return this;
        if (((i = i || P), 'string' == typeof t)) {
            if (!(n = '<' === t[0] && '>' === t[t.length - 1] && 3 <= t.length ? [null, t, null] : I.exec(t)) || (!n[1] && e))
                return !e || e.jquery ? (e || i).find(t) : this.constructor(e).find(t);
            if (n[1]) {
                if (
                    ((e = e instanceof S ? e[0] : e),
                    S.merge(this, S.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : C, !0)),
                    A.test(n[1]) && S.isPlainObject(e))
                )
                    for (n in e) y(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
                return this;
            }
            return (r = C.getElementById(n[2])) && ((this[0] = r), (this.length = 1)), this;
        }
        return t.nodeType
            ? ((this[0] = t), (this.length = 1), this)
            : y(t)
            ? void 0 !== i.ready
                ? i.ready(t)
                : t(S)
            : S.makeArray(t, this);
    }).prototype = S.fn),
        (P = S(C));
    var O = /^(?:parents|prev(?:Until|All))/,
        N = { children: !0, contents: !0, next: !0, prev: !0 };
    function j(t, e) {
        for (; (t = t[e]) && 1 !== t.nodeType; );
        return t;
    }
    S.fn.extend({
        has: function (t) {
            var e = S(t, this),
                i = e.length;
            return this.filter(function () {
                for (var t = 0; t < i; t++) if (S.contains(this, e[t])) return !0;
            });
        },
        closest: function (t, e) {
            var i,
                n = 0,
                r = this.length,
                o = [],
                s = 'string' != typeof t && S(t);
            if (!T.test(t))
                for (; n < r; n++)
                    for (i = this[n]; i && i !== e; i = i.parentNode)
                        if (i.nodeType < 11 && (s ? -1 < s.index(i) : 1 === i.nodeType && S.find.matchesSelector(i, t))) {
                            o.push(i);
                            break;
                        }
            return this.pushStack(1 < o.length ? S.uniqueSort(o) : o);
        },
        index: function (t) {
            return t
                ? 'string' == typeof t
                    ? r.call(S(t), this[0])
                    : r.call(this, t.jquery ? t[0] : t)
                : this[0] && this[0].parentNode
                ? this.first().prevAll().length
                : -1;
        },
        add: function (t, e) {
            return this.pushStack(S.uniqueSort(S.merge(this.get(), S(t, e))));
        },
        addBack: function (t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
        },
    }),
        S.each(
            {
                parent: function (t) {
                    var e = t.parentNode;
                    return e && 11 !== e.nodeType ? e : null;
                },
                parents: function (t) {
                    return w(t, 'parentNode');
                },
                parentsUntil: function (t, e, i) {
                    return w(t, 'parentNode', i);
                },
                next: function (t) {
                    return j(t, 'nextSibling');
                },
                prev: function (t) {
                    return j(t, 'previousSibling');
                },
                nextAll: function (t) {
                    return w(t, 'nextSibling');
                },
                prevAll: function (t) {
                    return w(t, 'previousSibling');
                },
                nextUntil: function (t, e, i) {
                    return w(t, 'nextSibling', i);
                },
                prevUntil: function (t, e, i) {
                    return w(t, 'previousSibling', i);
                },
                siblings: function (t) {
                    return D((t.parentNode || {}).firstChild, t);
                },
                children: function (t) {
                    return D(t.firstChild);
                },
                contents: function (t) {
                    return M(t, 'iframe') ? t.contentDocument : (M(t, 'template') && (t = t.content || t), S.merge([], t.childNodes));
                },
            },
            function (n, r) {
                S.fn[n] = function (t, e) {
                    var i = S.map(this, r, t);
                    return (
                        'Until' !== n.slice(-5) && (e = t),
                        e && 'string' == typeof e && (i = S.filter(e, i)),
                        1 < this.length && (N[n] || S.uniqueSort(i), O.test(n) && i.reverse()),
                        this.pushStack(i)
                    );
                };
            }
        );
    var F = /[^\x20\t\r\n\f]+/g;
    function L(t) {
        return t;
    }
    function $(t) {
        throw t;
    }
    function R(t, e, i, n) {
        var r;
        try {
            t && y((r = t.promise)) ? r.call(t).done(e).fail(i) : t && y((r = t.then)) ? r.call(t, e, i) : e.apply(void 0, [t].slice(n));
        } catch (t) {
            i.apply(void 0, [t]);
        }
    }
    (S.Callbacks = function (n) {
        var t, i;
        n =
            'string' == typeof n
                ? ((t = n),
                  (i = {}),
                  S.each(t.match(F) || [], function (t, e) {
                      i[e] = !0;
                  }),
                  i)
                : S.extend({}, n);
        var r,
            e,
            o,
            s,
            a = [],
            l = [],
            c = -1,
            h = function () {
                for (s = s || n.once, o = r = !0; l.length; c = -1)
                    for (e = l.shift(); ++c < a.length; ) !1 === a[c].apply(e[0], e[1]) && n.stopOnFalse && ((c = a.length), (e = !1));
                n.memory || (e = !1), (r = !1), s && (a = e ? [] : '');
            },
            d = {
                add: function () {
                    return (
                        a &&
                            (e && !r && ((c = a.length - 1), l.push(e)),
                            (function i(t) {
                                S.each(t, function (t, e) {
                                    y(e) ? (n.unique && d.has(e)) || a.push(e) : e && e.length && 'string' !== x(e) && i(e);
                                });
                            })(arguments),
                            e && !r && h()),
                        this
                    );
                },
                remove: function () {
                    return (
                        S.each(arguments, function (t, e) {
                            for (var i; -1 < (i = S.inArray(e, a, i)); ) a.splice(i, 1), i <= c && c--;
                        }),
                        this
                    );
                },
                has: function (t) {
                    return t ? -1 < S.inArray(t, a) : 0 < a.length;
                },
                empty: function () {
                    return a && (a = []), this;
                },
                disable: function () {
                    return (s = l = []), (a = e = ''), this;
                },
                disabled: function () {
                    return !a;
                },
                lock: function () {
                    return (s = l = []), e || r || (a = e = ''), this;
                },
                locked: function () {
                    return !!s;
                },
                fireWith: function (t, e) {
                    return s || ((e = [t, (e = e || []).slice ? e.slice() : e]), l.push(e), r || h()), this;
                },
                fire: function () {
                    return d.fireWith(this, arguments), this;
                },
                fired: function () {
                    return !!o;
                },
            };
        return d;
    }),
        S.extend({
            Deferred: function (t) {
                var o = [
                        ['notify', 'progress', S.Callbacks('memory'), S.Callbacks('memory'), 2],
                        ['resolve', 'done', S.Callbacks('once memory'), S.Callbacks('once memory'), 0, 'resolved'],
                        ['reject', 'fail', S.Callbacks('once memory'), S.Callbacks('once memory'), 1, 'rejected'],
                    ],
                    r = 'pending',
                    s = {
                        state: function () {
                            return r;
                        },
                        always: function () {
                            return a.done(arguments).fail(arguments), this;
                        },
                        catch: function (t) {
                            return s.then(null, t);
                        },
                        pipe: function () {
                            var r = arguments;
                            return S.Deferred(function (n) {
                                S.each(o, function (t, e) {
                                    var i = y(r[e[4]]) && r[e[4]];
                                    a[e[1]](function () {
                                        var t = i && i.apply(this, arguments);
                                        t && y(t.promise)
                                            ? t.promise().progress(n.notify).done(n.resolve).fail(n.reject)
                                            : n[e[0] + 'With'](this, i ? [t] : arguments);
                                    });
                                }),
                                    (r = null);
                            }).promise();
                        },
                        then: function (e, i, n) {
                            var l = 0;
                            function c(r, o, s, a) {
                                return function () {
                                    var i = this,
                                        n = arguments,
                                        t = function () {
                                            var t, e;
                                            if (!(r < l)) {
                                                if ((t = s.apply(i, n)) === o.promise()) throw new TypeError('Thenable self-resolution');
                                                (e = t && ('object' == typeof t || 'function' == typeof t) && t.then),
                                                    y(e)
                                                        ? a
                                                            ? e.call(t, c(l, o, L, a), c(l, o, $, a))
                                                            : (l++, e.call(t, c(l, o, L, a), c(l, o, $, a), c(l, o, L, o.notifyWith)))
                                                        : (s !== L && ((i = void 0), (n = [t])), (a || o.resolveWith)(i, n));
                                            }
                                        },
                                        e = a
                                            ? t
                                            : function () {
                                                  try {
                                                      t();
                                                  } catch (t) {
                                                      S.Deferred.exceptionHook && S.Deferred.exceptionHook(t, e.stackTrace),
                                                          l <= r + 1 && (s !== $ && ((i = void 0), (n = [t])), o.rejectWith(i, n));
                                                  }
                                              };
                                    r ? e() : (S.Deferred.getStackHook && (e.stackTrace = S.Deferred.getStackHook()), k.setTimeout(e));
                                };
                            }
                            return S.Deferred(function (t) {
                                o[0][3].add(c(0, t, y(n) ? n : L, t.notifyWith)),
                                    o[1][3].add(c(0, t, y(e) ? e : L)),
                                    o[2][3].add(c(0, t, y(i) ? i : $));
                            }).promise();
                        },
                        promise: function (t) {
                            return null != t ? S.extend(t, s) : s;
                        },
                    },
                    a = {};
                return (
                    S.each(o, function (t, e) {
                        var i = e[2],
                            n = e[5];
                        (s[e[1]] = i.add),
                            n &&
                                i.add(
                                    function () {
                                        r = n;
                                    },
                                    o[3 - t][2].disable,
                                    o[3 - t][3].disable,
                                    o[0][2].lock,
                                    o[0][3].lock
                                ),
                            i.add(e[3].fire),
                            (a[e[0]] = function () {
                                return a[e[0] + 'With'](this === a ? void 0 : this, arguments), this;
                            }),
                            (a[e[0] + 'With'] = i.fireWith);
                    }),
                    s.promise(a),
                    t && t.call(a, a),
                    a
                );
            },
            when: function (t) {
                var i = arguments.length,
                    e = i,
                    n = Array(e),
                    r = a.call(arguments),
                    o = S.Deferred(),
                    s = function (e) {
                        return function (t) {
                            (n[e] = this), (r[e] = 1 < arguments.length ? a.call(arguments) : t), --i || o.resolveWith(n, r);
                        };
                    };
                if (i <= 1 && (R(t, o.done(s(e)).resolve, o.reject, !i), 'pending' === o.state() || y(r[e] && r[e].then))) return o.then();
                for (; e--; ) R(r[e], s(e), o.reject);
                return o.promise();
            },
        });
    var B = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    (S.Deferred.exceptionHook = function (t, e) {
        k.console && k.console.warn && t && B.test(t.name) && k.console.warn('jQuery.Deferred exception: ' + t.message, t.stack, e);
    }),
        (S.readyException = function (t) {
            k.setTimeout(function () {
                throw t;
            });
        });
    var H = S.Deferred();
    function z() {
        C.removeEventListener('DOMContentLoaded', z), k.removeEventListener('load', z), S.ready();
    }
    (S.fn.ready = function (t) {
        return (
            H.then(t).catch(function (t) {
                S.readyException(t);
            }),
            this
        );
    }),
        S.extend({
            isReady: !1,
            readyWait: 1,
            ready: function (t) {
                (!0 === t ? --S.readyWait : S.isReady) || ((S.isReady = !0) !== t && 0 < --S.readyWait) || H.resolveWith(C, [S]);
            },
        }),
        (S.ready.then = H.then),
        'complete' === C.readyState || ('loading' !== C.readyState && !C.documentElement.doScroll)
            ? k.setTimeout(S.ready)
            : (C.addEventListener('DOMContentLoaded', z), k.addEventListener('load', z));
    var U = function (t, e, i, n, r, o, s) {
            var a = 0,
                l = t.length,
                c = null == i;
            if ('object' === x(i)) for (a in ((r = !0), i)) U(t, e, a, i[a], !0, o, s);
            else if (
                void 0 !== n &&
                ((r = !0),
                y(n) || (s = !0),
                c &&
                    (s
                        ? (e.call(t, n), (e = null))
                        : ((c = e),
                          (e = function (t, e, i) {
                              return c.call(S(t), i);
                          }))),
                e)
            )
                for (; a < l; a++) e(t[a], i, s ? n : n.call(t[a], a, e(t[a], i)));
            return r ? t : c ? e.call(t) : l ? e(t[0], i) : o;
        },
        W = /^-ms-/,
        Y = /-([a-z])/g;
    function V(t, e) {
        return e.toUpperCase();
    }
    function q(t) {
        return t.replace(W, 'ms-').replace(Y, V);
    }
    var G = function (t) {
        return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
    };
    function K() {
        this.expando = S.expando + K.uid++;
    }
    (K.uid = 1),
        (K.prototype = {
            cache: function (t) {
                var e = t[this.expando];
                return (
                    e ||
                        ((e = {}),
                        G(t) &&
                            (t.nodeType ? (t[this.expando] = e) : Object.defineProperty(t, this.expando, { value: e, configurable: !0 }))),
                    e
                );
            },
            set: function (t, e, i) {
                var n,
                    r = this.cache(t);
                if ('string' == typeof e) r[q(e)] = i;
                else for (n in e) r[q(n)] = e[n];
                return r;
            },
            get: function (t, e) {
                return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][q(e)];
            },
            access: function (t, e, i) {
                return void 0 === e || (e && 'string' == typeof e && void 0 === i)
                    ? this.get(t, e)
                    : (this.set(t, e, i), void 0 !== i ? i : e);
            },
            remove: function (t, e) {
                var i,
                    n = t[this.expando];
                if (void 0 !== n) {
                    if (void 0 !== e) {
                        i = (e = Array.isArray(e) ? e.map(q) : (e = q(e)) in n ? [e] : e.match(F) || []).length;
                        for (; i--; ) delete n[e[i]];
                    }
                    (void 0 === e || S.isEmptyObject(n)) && (t.nodeType ? (t[this.expando] = void 0) : delete t[this.expando]);
                }
            },
            hasData: function (t) {
                var e = t[this.expando];
                return void 0 !== e && !S.isEmptyObject(e);
            },
        });
    var X = new K(),
        Z = new K(),
        Q = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        J = /[A-Z]/g;
    function tt(t, e, i) {
        var n, r;
        if (void 0 === i && 1 === t.nodeType)
            if (((n = 'data-' + e.replace(J, '-$&').toLowerCase()), 'string' == typeof (i = t.getAttribute(n)))) {
                try {
                    i = 'true' === (r = i) || ('false' !== r && ('null' === r ? null : r === +r + '' ? +r : Q.test(r) ? JSON.parse(r) : r));
                } catch (t) {}
                Z.set(t, e, i);
            } else i = void 0;
        return i;
    }
    S.extend({
        hasData: function (t) {
            return Z.hasData(t) || X.hasData(t);
        },
        data: function (t, e, i) {
            return Z.access(t, e, i);
        },
        removeData: function (t, e) {
            Z.remove(t, e);
        },
        _data: function (t, e, i) {
            return X.access(t, e, i);
        },
        _removeData: function (t, e) {
            X.remove(t, e);
        },
    }),
        S.fn.extend({
            data: function (i, t) {
                var e,
                    n,
                    r,
                    o = this[0],
                    s = o && o.attributes;
                if (void 0 === i) {
                    if (this.length && ((r = Z.get(o)), 1 === o.nodeType && !X.get(o, 'hasDataAttrs'))) {
                        for (e = s.length; e--; ) s[e] && 0 === (n = s[e].name).indexOf('data-') && ((n = q(n.slice(5))), tt(o, n, r[n]));
                        X.set(o, 'hasDataAttrs', !0);
                    }
                    return r;
                }
                return 'object' == typeof i
                    ? this.each(function () {
                          Z.set(this, i);
                      })
                    : U(
                          this,
                          function (t) {
                              var e;
                              if (o && void 0 === t) return void 0 !== (e = Z.get(o, i)) ? e : void 0 !== (e = tt(o, i)) ? e : void 0;
                              this.each(function () {
                                  Z.set(this, i, t);
                              });
                          },
                          null,
                          t,
                          1 < arguments.length,
                          null,
                          !0
                      );
            },
            removeData: function (t) {
                return this.each(function () {
                    Z.remove(this, t);
                });
            },
        }),
        S.extend({
            queue: function (t, e, i) {
                var n;
                if (t)
                    return (
                        (e = (e || 'fx') + 'queue'),
                        (n = X.get(t, e)),
                        i && (!n || Array.isArray(i) ? (n = X.access(t, e, S.makeArray(i))) : n.push(i)),
                        n || []
                    );
            },
            dequeue: function (t, e) {
                e = e || 'fx';
                var i = S.queue(t, e),
                    n = i.length,
                    r = i.shift(),
                    o = S._queueHooks(t, e);
                'inprogress' === r && ((r = i.shift()), n--),
                    r &&
                        ('fx' === e && i.unshift('inprogress'),
                        delete o.stop,
                        r.call(
                            t,
                            function () {
                                S.dequeue(t, e);
                            },
                            o
                        )),
                    !n && o && o.empty.fire();
            },
            _queueHooks: function (t, e) {
                var i = e + 'queueHooks';
                return (
                    X.get(t, i) ||
                    X.access(t, i, {
                        empty: S.Callbacks('once memory').add(function () {
                            X.remove(t, [e + 'queue', i]);
                        }),
                    })
                );
            },
        }),
        S.fn.extend({
            queue: function (e, i) {
                var t = 2;
                return (
                    'string' != typeof e && ((i = e), (e = 'fx'), t--),
                    arguments.length < t
                        ? S.queue(this[0], e)
                        : void 0 === i
                        ? this
                        : this.each(function () {
                              var t = S.queue(this, e, i);
                              S._queueHooks(this, e), 'fx' === e && 'inprogress' !== t[0] && S.dequeue(this, e);
                          })
                );
            },
            dequeue: function (t) {
                return this.each(function () {
                    S.dequeue(this, t);
                });
            },
            clearQueue: function (t) {
                return this.queue(t || 'fx', []);
            },
            promise: function (t, e) {
                var i,
                    n = 1,
                    r = S.Deferred(),
                    o = this,
                    s = this.length,
                    a = function () {
                        --n || r.resolveWith(o, [o]);
                    };
                for ('string' != typeof t && ((e = t), (t = void 0)), t = t || 'fx'; s--; )
                    (i = X.get(o[s], t + 'queueHooks')) && i.empty && (n++, i.empty.add(a));
                return a(), r.promise(e);
            },
        });
    var et = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        it = new RegExp('^(?:([+-])=|)(' + et + ')([a-z%]*)$', 'i'),
        nt = ['Top', 'Right', 'Bottom', 'Left'],
        rt = function (t, e) {
            return (
                'none' === (t = e || t).style.display ||
                ('' === t.style.display && S.contains(t.ownerDocument, t) && 'none' === S.css(t, 'display'))
            );
        },
        ot = function (t, e, i, n) {
            var r,
                o,
                s = {};
            for (o in e) (s[o] = t.style[o]), (t.style[o] = e[o]);
            for (o in ((r = i.apply(t, n || [])), e)) t.style[o] = s[o];
            return r;
        };
    function st(t, e, i, n) {
        var r,
            o,
            s = 20,
            a = n
                ? function () {
                      return n.cur();
                  }
                : function () {
                      return S.css(t, e, '');
                  },
            l = a(),
            c = (i && i[3]) || (S.cssNumber[e] ? '' : 'px'),
            h = (S.cssNumber[e] || ('px' !== c && +l)) && it.exec(S.css(t, e));
        if (h && h[3] !== c) {
            for (l /= 2, c = c || h[3], h = +l || 1; s--; )
                S.style(t, e, h + c), (1 - o) * (1 - (o = a() / l || 0.5)) <= 0 && (s = 0), (h /= o);
            (h *= 2), S.style(t, e, h + c), (i = i || []);
        }
        return i && ((h = +h || +l || 0), (r = i[1] ? h + (i[1] + 1) * i[2] : +i[2]), n && ((n.unit = c), (n.start = h), (n.end = r))), r;
    }
    var at = {};
    function lt(t, e) {
        for (var i, n, r, o, s, a, l, c = [], h = 0, d = t.length; h < d; h++)
            (n = t[h]).style &&
                ((i = n.style.display),
                e
                    ? ('none' === i && ((c[h] = X.get(n, 'display') || null), c[h] || (n.style.display = '')),
                      '' === n.style.display &&
                          rt(n) &&
                          (c[h] =
                              ((l = s = o = void 0),
                              (s = (r = n).ownerDocument),
                              (a = r.nodeName),
                              (l = at[a]) ||
                                  ((o = s.body.appendChild(s.createElement(a))),
                                  (l = S.css(o, 'display')),
                                  o.parentNode.removeChild(o),
                                  'none' === l && (l = 'block'),
                                  (at[a] = l)))))
                    : 'none' !== i && ((c[h] = 'none'), X.set(n, 'display', i)));
        for (h = 0; h < d; h++) null != c[h] && (t[h].style.display = c[h]);
        return t;
    }
    S.fn.extend({
        show: function () {
            return lt(this, !0);
        },
        hide: function () {
            return lt(this);
        },
        toggle: function (t) {
            return 'boolean' == typeof t
                ? t
                    ? this.show()
                    : this.hide()
                : this.each(function () {
                      rt(this) ? S(this).show() : S(this).hide();
                  });
        },
    });
    var ct = /^(?:checkbox|radio)$/i,
        ht = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        dt = /^$|^module$|\/(?:java|ecma)script/i,
        ut = {
            option: [1, "<select multiple='multiple'>", '</select>'],
            thead: [1, '<table>', '</table>'],
            col: [2, '<table><colgroup>', '</colgroup></table>'],
            tr: [2, '<table><tbody>', '</tbody></table>'],
            td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
            _default: [0, '', ''],
        };
    function pt(t, e) {
        var i;
        return (
            (i =
                void 0 !== t.getElementsByTagName
                    ? t.getElementsByTagName(e || '*')
                    : void 0 !== t.querySelectorAll
                    ? t.querySelectorAll(e || '*')
                    : []),
            void 0 === e || (e && M(t, e)) ? S.merge([t], i) : i
        );
    }
    function ft(t, e) {
        for (var i = 0, n = t.length; i < n; i++) X.set(t[i], 'globalEval', !e || X.get(e[i], 'globalEval'));
    }
    (ut.optgroup = ut.option), (ut.tbody = ut.tfoot = ut.colgroup = ut.caption = ut.thead), (ut.th = ut.td);
    var mt,
        gt,
        vt = /<|&#?\w+;/;
    function yt(t, e, i, n, r) {
        for (var o, s, a, l, c, h, d = e.createDocumentFragment(), u = [], p = 0, f = t.length; p < f; p++)
            if ((o = t[p]) || 0 === o)
                if ('object' === x(o)) S.merge(u, o.nodeType ? [o] : o);
                else if (vt.test(o)) {
                    for (
                        s = s || d.appendChild(e.createElement('div')),
                            a = (ht.exec(o) || ['', ''])[1].toLowerCase(),
                            l = ut[a] || ut._default,
                            s.innerHTML = l[1] + S.htmlPrefilter(o) + l[2],
                            h = l[0];
                        h--;

                    )
                        s = s.lastChild;
                    S.merge(u, s.childNodes), ((s = d.firstChild).textContent = '');
                } else u.push(e.createTextNode(o));
        for (d.textContent = '', p = 0; (o = u[p++]); )
            if (n && -1 < S.inArray(o, n)) r && r.push(o);
            else if (((c = S.contains(o.ownerDocument, o)), (s = pt(d.appendChild(o), 'script')), c && ft(s), i))
                for (h = 0; (o = s[h++]); ) dt.test(o.type || '') && i.push(o);
        return d;
    }
    (mt = C.createDocumentFragment().appendChild(C.createElement('div'))),
        (gt = C.createElement('input')).setAttribute('type', 'radio'),
        gt.setAttribute('checked', 'checked'),
        gt.setAttribute('name', 't'),
        mt.appendChild(gt),
        (v.checkClone = mt.cloneNode(!0).cloneNode(!0).lastChild.checked),
        (mt.innerHTML = '<textarea>x</textarea>'),
        (v.noCloneChecked = !!mt.cloneNode(!0).lastChild.defaultValue);
    var bt = C.documentElement,
        _t = /^key/,
        xt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        wt = /^([^.]*)(?:\.(.+)|)/;
    function kt() {
        return !0;
    }
    function Ct() {
        return !1;
    }
    function St() {
        try {
            return C.activeElement;
        } catch (t) {}
    }
    function Dt(t, e, i, n, r, o) {
        var s, a;
        if ('object' == typeof e) {
            for (a in ('string' != typeof i && ((n = n || i), (i = void 0)), e)) Dt(t, a, i, n, e[a], o);
            return t;
        }
        if (
            (null == n && null == r
                ? ((r = i), (n = i = void 0))
                : null == r && ('string' == typeof i ? ((r = n), (n = void 0)) : ((r = n), (n = i), (i = void 0))),
            !1 === r)
        )
            r = Ct;
        else if (!r) return t;
        return (
            1 === o &&
                ((s = r),
                ((r = function (t) {
                    return S().off(t), s.apply(this, arguments);
                }).guid = s.guid || (s.guid = S.guid++))),
            t.each(function () {
                S.event.add(this, e, r, n, i);
            })
        );
    }
    (S.event = {
        global: {},
        add: function (e, t, i, n, r) {
            var o,
                s,
                a,
                l,
                c,
                h,
                d,
                u,
                p,
                f,
                m,
                g = X.get(e);
            if (g)
                for (
                    i.handler && ((i = (o = i).handler), (r = o.selector)),
                        r && S.find.matchesSelector(bt, r),
                        i.guid || (i.guid = S.guid++),
                        (l = g.events) || (l = g.events = {}),
                        (s = g.handle) ||
                            (s = g.handle = function (t) {
                                return void 0 !== S && S.event.triggered !== t.type ? S.event.dispatch.apply(e, arguments) : void 0;
                            }),
                        c = (t = (t || '').match(F) || ['']).length;
                    c--;

                )
                    (p = m = (a = wt.exec(t[c]) || [])[1]),
                        (f = (a[2] || '').split('.').sort()),
                        p &&
                            ((d = S.event.special[p] || {}),
                            (p = (r ? d.delegateType : d.bindType) || p),
                            (d = S.event.special[p] || {}),
                            (h = S.extend(
                                {
                                    type: p,
                                    origType: m,
                                    data: n,
                                    handler: i,
                                    guid: i.guid,
                                    selector: r,
                                    needsContext: r && S.expr.match.needsContext.test(r),
                                    namespace: f.join('.'),
                                },
                                o
                            )),
                            (u = l[p]) ||
                                (((u = l[p] = []).delegateCount = 0),
                                (d.setup && !1 !== d.setup.call(e, n, f, s)) || (e.addEventListener && e.addEventListener(p, s))),
                            d.add && (d.add.call(e, h), h.handler.guid || (h.handler.guid = i.guid)),
                            r ? u.splice(u.delegateCount++, 0, h) : u.push(h),
                            (S.event.global[p] = !0));
        },
        remove: function (t, e, i, n, r) {
            var o,
                s,
                a,
                l,
                c,
                h,
                d,
                u,
                p,
                f,
                m,
                g = X.hasData(t) && X.get(t);
            if (g && (l = g.events)) {
                for (c = (e = (e || '').match(F) || ['']).length; c--; )
                    if (((p = m = (a = wt.exec(e[c]) || [])[1]), (f = (a[2] || '').split('.').sort()), p)) {
                        for (
                            d = S.event.special[p] || {},
                                u = l[(p = (n ? d.delegateType : d.bindType) || p)] || [],
                                a = a[2] && new RegExp('(^|\\.)' + f.join('\\.(?:.*\\.|)') + '(\\.|$)'),
                                s = o = u.length;
                            o--;

                        )
                            (h = u[o]),
                                (!r && m !== h.origType) ||
                                    (i && i.guid !== h.guid) ||
                                    (a && !a.test(h.namespace)) ||
                                    (n && n !== h.selector && ('**' !== n || !h.selector)) ||
                                    (u.splice(o, 1), h.selector && u.delegateCount--, d.remove && d.remove.call(t, h));
                        s &&
                            !u.length &&
                            ((d.teardown && !1 !== d.teardown.call(t, f, g.handle)) || S.removeEvent(t, p, g.handle), delete l[p]);
                    } else for (p in l) S.event.remove(t, p + e[c], i, n, !0);
                S.isEmptyObject(l) && X.remove(t, 'handle events');
            }
        },
        dispatch: function (t) {
            var e,
                i,
                n,
                r,
                o,
                s,
                a = S.event.fix(t),
                l = new Array(arguments.length),
                c = (X.get(this, 'events') || {})[a.type] || [],
                h = S.event.special[a.type] || {};
            for (l[0] = a, e = 1; e < arguments.length; e++) l[e] = arguments[e];
            if (((a.delegateTarget = this), !h.preDispatch || !1 !== h.preDispatch.call(this, a))) {
                for (s = S.event.handlers.call(this, a, c), e = 0; (r = s[e++]) && !a.isPropagationStopped(); )
                    for (a.currentTarget = r.elem, i = 0; (o = r.handlers[i++]) && !a.isImmediatePropagationStopped(); )
                        (a.rnamespace && !a.rnamespace.test(o.namespace)) ||
                            ((a.handleObj = o),
                            (a.data = o.data),
                            void 0 !== (n = ((S.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, l)) &&
                                !1 === (a.result = n) &&
                                (a.preventDefault(), a.stopPropagation()));
                return h.postDispatch && h.postDispatch.call(this, a), a.result;
            }
        },
        handlers: function (t, e) {
            var i,
                n,
                r,
                o,
                s,
                a = [],
                l = e.delegateCount,
                c = t.target;
            if (l && c.nodeType && !('click' === t.type && 1 <= t.button))
                for (; c !== this; c = c.parentNode || this)
                    if (1 === c.nodeType && ('click' !== t.type || !0 !== c.disabled)) {
                        for (o = [], s = {}, i = 0; i < l; i++)
                            void 0 === s[(r = (n = e[i]).selector + ' ')] &&
                                (s[r] = n.needsContext ? -1 < S(r, this).index(c) : S.find(r, this, null, [c]).length),
                                s[r] && o.push(n);
                        o.length && a.push({ elem: c, handlers: o });
                    }
            return (c = this), l < e.length && a.push({ elem: c, handlers: e.slice(l) }), a;
        },
        addProp: function (e, t) {
            Object.defineProperty(S.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: y(t)
                    ? function () {
                          if (this.originalEvent) return t(this.originalEvent);
                      }
                    : function () {
                          if (this.originalEvent) return this.originalEvent[e];
                      },
                set: function (t) {
                    Object.defineProperty(this, e, { enumerable: !0, configurable: !0, writable: !0, value: t });
                },
            });
        },
        fix: function (t) {
            return t[S.expando] ? t : new S.Event(t);
        },
        special: {
            load: { noBubble: !0 },
            focus: {
                trigger: function () {
                    if (this !== St() && this.focus) return this.focus(), !1;
                },
                delegateType: 'focusin',
            },
            blur: {
                trigger: function () {
                    if (this === St() && this.blur) return this.blur(), !1;
                },
                delegateType: 'focusout',
            },
            click: {
                trigger: function () {
                    if ('checkbox' === this.type && this.click && M(this, 'input')) return this.click(), !1;
                },
                _default: function (t) {
                    return M(t.target, 'a');
                },
            },
            beforeunload: {
                postDispatch: function (t) {
                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result);
                },
            },
        },
    }),
        (S.removeEvent = function (t, e, i) {
            t.removeEventListener && t.removeEventListener(e, i);
        }),
        (S.Event = function (t, e) {
            if (!(this instanceof S.Event)) return new S.Event(t, e);
            t && t.type
                ? ((this.originalEvent = t),
                  (this.type = t.type),
                  (this.isDefaultPrevented = t.defaultPrevented || (void 0 === t.defaultPrevented && !1 === t.returnValue) ? kt : Ct),
                  (this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target),
                  (this.currentTarget = t.currentTarget),
                  (this.relatedTarget = t.relatedTarget))
                : (this.type = t),
                e && S.extend(this, e),
                (this.timeStamp = (t && t.timeStamp) || Date.now()),
                (this[S.expando] = !0);
        }),
        (S.Event.prototype = {
            constructor: S.Event,
            isDefaultPrevented: Ct,
            isPropagationStopped: Ct,
            isImmediatePropagationStopped: Ct,
            isSimulated: !1,
            preventDefault: function () {
                var t = this.originalEvent;
                (this.isDefaultPrevented = kt), t && !this.isSimulated && t.preventDefault();
            },
            stopPropagation: function () {
                var t = this.originalEvent;
                (this.isPropagationStopped = kt), t && !this.isSimulated && t.stopPropagation();
            },
            stopImmediatePropagation: function () {
                var t = this.originalEvent;
                (this.isImmediatePropagationStopped = kt), t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation();
            },
        }),
        S.each(
            {
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: function (t) {
                    var e = t.button;
                    return null == t.which && _t.test(t.type)
                        ? null != t.charCode
                            ? t.charCode
                            : t.keyCode
                        : !t.which && void 0 !== e && xt.test(t.type)
                        ? 1 & e
                            ? 1
                            : 2 & e
                            ? 3
                            : 4 & e
                            ? 2
                            : 0
                        : t.which;
                },
            },
            S.event.addProp
        ),
        S.each(
            { mouseenter: 'mouseover', mouseleave: 'mouseout', pointerenter: 'pointerover', pointerleave: 'pointerout' },
            function (t, r) {
                S.event.special[t] = {
                    delegateType: r,
                    bindType: r,
                    handle: function (t) {
                        var e,
                            i = t.relatedTarget,
                            n = t.handleObj;
                        return (
                            (i && (i === this || S.contains(this, i))) ||
                                ((t.type = n.origType), (e = n.handler.apply(this, arguments)), (t.type = r)),
                            e
                        );
                    },
                };
            }
        ),
        S.fn.extend({
            on: function (t, e, i, n) {
                return Dt(this, t, e, i, n);
            },
            one: function (t, e, i, n) {
                return Dt(this, t, e, i, n, 1);
            },
            off: function (t, e, i) {
                var n, r;
                if (t && t.preventDefault && t.handleObj)
                    return (
                        (n = t.handleObj),
                        S(t.delegateTarget).off(n.namespace ? n.origType + '.' + n.namespace : n.origType, n.selector, n.handler),
                        this
                    );
                if ('object' == typeof t) {
                    for (r in t) this.off(r, e, t[r]);
                    return this;
                }
                return (
                    (!1 !== e && 'function' != typeof e) || ((i = e), (e = void 0)),
                    !1 === i && (i = Ct),
                    this.each(function () {
                        S.event.remove(this, t, i, e);
                    })
                );
            },
        });
    var Tt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        Mt = /<script|<style|<link/i,
        At = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Et = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function Pt(t, e) {
        return (M(t, 'table') && M(11 !== e.nodeType ? e : e.firstChild, 'tr') && S(t).children('tbody')[0]) || t;
    }
    function It(t) {
        return (t.type = (null !== t.getAttribute('type')) + '/' + t.type), t;
    }
    function Ot(t) {
        return 'true/' === (t.type || '').slice(0, 5) ? (t.type = t.type.slice(5)) : t.removeAttribute('type'), t;
    }
    function Nt(t, e) {
        var i, n, r, o, s, a, l, c;
        if (1 === e.nodeType) {
            if (X.hasData(t) && ((o = X.access(t)), (s = X.set(e, o)), (c = o.events)))
                for (r in (delete s.handle, (s.events = {}), c)) for (i = 0, n = c[r].length; i < n; i++) S.event.add(e, r, c[r][i]);
            Z.hasData(t) && ((a = Z.access(t)), (l = S.extend({}, a)), Z.set(e, l));
        }
    }
    function jt(i, n, r, o) {
        n = m.apply([], n);
        var t,
            e,
            s,
            a,
            l,
            c,
            h = 0,
            d = i.length,
            u = d - 1,
            p = n[0],
            f = y(p);
        if (f || (1 < d && 'string' == typeof p && !v.checkClone && At.test(p)))
            return i.each(function (t) {
                var e = i.eq(t);
                f && (n[0] = p.call(this, t, e.html())), jt(e, n, r, o);
            });
        if (d && ((e = (t = yt(n, i[0].ownerDocument, !1, i, o)).firstChild), 1 === t.childNodes.length && (t = e), e || o)) {
            for (a = (s = S.map(pt(t, 'script'), It)).length; h < d; h++)
                (l = t), h !== u && ((l = S.clone(l, !0, !0)), a && S.merge(s, pt(l, 'script'))), r.call(i[h], l, h);
            if (a)
                for (c = s[s.length - 1].ownerDocument, S.map(s, Ot), h = 0; h < a; h++)
                    (l = s[h]),
                        dt.test(l.type || '') &&
                            !X.access(l, 'globalEval') &&
                            S.contains(c, l) &&
                            (l.src && 'module' !== (l.type || '').toLowerCase()
                                ? S._evalUrl && S._evalUrl(l.src)
                                : _(l.textContent.replace(Et, ''), c, l));
        }
        return i;
    }
    function Ft(t, e, i) {
        for (var n, r = e ? S.filter(e, t) : t, o = 0; null != (n = r[o]); o++)
            i || 1 !== n.nodeType || S.cleanData(pt(n)),
                n.parentNode && (i && S.contains(n.ownerDocument, n) && ft(pt(n, 'script')), n.parentNode.removeChild(n));
        return t;
    }
    S.extend({
        htmlPrefilter: function (t) {
            return t.replace(Tt, '<$1></$2>');
        },
        clone: function (t, e, i) {
            var n,
                r,
                o,
                s,
                a,
                l,
                c,
                h = t.cloneNode(!0),
                d = S.contains(t.ownerDocument, t);
            if (!(v.noCloneChecked || (1 !== t.nodeType && 11 !== t.nodeType) || S.isXMLDoc(t)))
                for (s = pt(h), n = 0, r = (o = pt(t)).length; n < r; n++)
                    (a = o[n]),
                        (l = s[n]),
                        void 0,
                        'input' === (c = l.nodeName.toLowerCase()) && ct.test(a.type)
                            ? (l.checked = a.checked)
                            : ('input' !== c && 'textarea' !== c) || (l.defaultValue = a.defaultValue);
            if (e)
                if (i) for (o = o || pt(t), s = s || pt(h), n = 0, r = o.length; n < r; n++) Nt(o[n], s[n]);
                else Nt(t, h);
            return 0 < (s = pt(h, 'script')).length && ft(s, !d && pt(t, 'script')), h;
        },
        cleanData: function (t) {
            for (var e, i, n, r = S.event.special, o = 0; void 0 !== (i = t[o]); o++)
                if (G(i)) {
                    if ((e = i[X.expando])) {
                        if (e.events) for (n in e.events) r[n] ? S.event.remove(i, n) : S.removeEvent(i, n, e.handle);
                        i[X.expando] = void 0;
                    }
                    i[Z.expando] && (i[Z.expando] = void 0);
                }
        },
    }),
        S.fn.extend({
            detach: function (t) {
                return Ft(this, t, !0);
            },
            remove: function (t) {
                return Ft(this, t);
            },
            text: function (t) {
                return U(
                    this,
                    function (t) {
                        return void 0 === t
                            ? S.text(this)
                            : this.empty().each(function () {
                                  (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || (this.textContent = t);
                              });
                    },
                    null,
                    t,
                    arguments.length
                );
            },
            append: function () {
                return jt(this, arguments, function (t) {
                    (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || Pt(this, t).appendChild(t);
                });
            },
            prepend: function () {
                return jt(this, arguments, function (t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = Pt(this, t);
                        e.insertBefore(t, e.firstChild);
                    }
                });
            },
            before: function () {
                return jt(this, arguments, function (t) {
                    this.parentNode && this.parentNode.insertBefore(t, this);
                });
            },
            after: function () {
                return jt(this, arguments, function (t) {
                    this.parentNode && this.parentNode.insertBefore(t, this.nextSibling);
                });
            },
            empty: function () {
                for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (S.cleanData(pt(t, !1)), (t.textContent = ''));
                return this;
            },
            clone: function (t, e) {
                return (
                    (t = null != t && t),
                    (e = null == e ? t : e),
                    this.map(function () {
                        return S.clone(this, t, e);
                    })
                );
            },
            html: function (t) {
                return U(
                    this,
                    function (t) {
                        var e = this[0] || {},
                            i = 0,
                            n = this.length;
                        if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                        if ('string' == typeof t && !Mt.test(t) && !ut[(ht.exec(t) || ['', ''])[1].toLowerCase()]) {
                            t = S.htmlPrefilter(t);
                            try {
                                for (; i < n; i++) 1 === (e = this[i] || {}).nodeType && (S.cleanData(pt(e, !1)), (e.innerHTML = t));
                                e = 0;
                            } catch (t) {}
                        }
                        e && this.empty().append(t);
                    },
                    null,
                    t,
                    arguments.length
                );
            },
            replaceWith: function () {
                var i = [];
                return jt(
                    this,
                    arguments,
                    function (t) {
                        var e = this.parentNode;
                        S.inArray(this, i) < 0 && (S.cleanData(pt(this)), e && e.replaceChild(t, this));
                    },
                    i
                );
            },
        }),
        S.each(
            { appendTo: 'append', prependTo: 'prepend', insertBefore: 'before', insertAfter: 'after', replaceAll: 'replaceWith' },
            function (t, s) {
                S.fn[t] = function (t) {
                    for (var e, i = [], n = S(t), r = n.length - 1, o = 0; o <= r; o++)
                        (e = o === r ? this : this.clone(!0)), S(n[o])[s](e), l.apply(i, e.get());
                    return this.pushStack(i);
                };
            }
        );
    var Lt = new RegExp('^(' + et + ')(?!px)[a-z%]+$', 'i'),
        $t = function (t) {
            var e = t.ownerDocument.defaultView;
            return (e && e.opener) || (e = k), e.getComputedStyle(t);
        },
        Rt = new RegExp(nt.join('|'), 'i');
    function Bt(t, e, i) {
        var n,
            r,
            o,
            s,
            a = t.style;
        return (
            (i = i || $t(t)) &&
                ('' !== (s = i.getPropertyValue(e) || i[e]) || S.contains(t.ownerDocument, t) || (s = S.style(t, e)),
                !v.pixelBoxStyles() &&
                    Lt.test(s) &&
                    Rt.test(e) &&
                    ((n = a.width),
                    (r = a.minWidth),
                    (o = a.maxWidth),
                    (a.minWidth = a.maxWidth = a.width = s),
                    (s = i.width),
                    (a.width = n),
                    (a.minWidth = r),
                    (a.maxWidth = o))),
            void 0 !== s ? s + '' : s
        );
    }
    function Ht(t, e) {
        return {
            get: function () {
                if (!t()) return (this.get = e).apply(this, arguments);
                delete this.get;
            },
        };
    }
    !(function () {
        function t() {
            if (l) {
                (a.style.cssText = 'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0'),
                    (l.style.cssText =
                        'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%'),
                    bt.appendChild(a).appendChild(l);
                var t = k.getComputedStyle(l);
                (i = '1%' !== t.top),
                    (s = 12 === e(t.marginLeft)),
                    (l.style.right = '60%'),
                    (o = 36 === e(t.right)),
                    (n = 36 === e(t.width)),
                    (l.style.position = 'absolute'),
                    (r = 36 === l.offsetWidth || 'absolute'),
                    bt.removeChild(a),
                    (l = null);
            }
        }
        function e(t) {
            return Math.round(parseFloat(t));
        }
        var i,
            n,
            r,
            o,
            s,
            a = C.createElement('div'),
            l = C.createElement('div');
        l.style &&
            ((l.style.backgroundClip = 'content-box'),
            (l.cloneNode(!0).style.backgroundClip = ''),
            (v.clearCloneStyle = 'content-box' === l.style.backgroundClip),
            S.extend(v, {
                boxSizingReliable: function () {
                    return t(), n;
                },
                pixelBoxStyles: function () {
                    return t(), o;
                },
                pixelPosition: function () {
                    return t(), i;
                },
                reliableMarginLeft: function () {
                    return t(), s;
                },
                scrollboxSize: function () {
                    return t(), r;
                },
            }));
    })();
    var zt = /^(none|table(?!-c[ea]).+)/,
        Ut = /^--/,
        Wt = { position: 'absolute', visibility: 'hidden', display: 'block' },
        Yt = { letterSpacing: '0', fontWeight: '400' },
        Vt = ['Webkit', 'Moz', 'ms'],
        qt = C.createElement('div').style;
    function Gt(t) {
        var e = S.cssProps[t];
        return (
            e ||
                (e = S.cssProps[t] =
                    (function (t) {
                        if (t in qt) return t;
                        for (var e = t[0].toUpperCase() + t.slice(1), i = Vt.length; i--; ) if ((t = Vt[i] + e) in qt) return t;
                    })(t) || t),
            e
        );
    }
    function Kt(t, e, i) {
        var n = it.exec(e);
        return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || 'px') : e;
    }
    function Xt(t, e, i, n, r, o) {
        var s = 'width' === e ? 1 : 0,
            a = 0,
            l = 0;
        if (i === (n ? 'border' : 'content')) return 0;
        for (; s < 4; s += 2)
            'margin' === i && (l += S.css(t, i + nt[s], !0, r)),
                n
                    ? ('content' === i && (l -= S.css(t, 'padding' + nt[s], !0, r)),
                      'margin' !== i && (l -= S.css(t, 'border' + nt[s] + 'Width', !0, r)))
                    : ((l += S.css(t, 'padding' + nt[s], !0, r)),
                      'padding' !== i
                          ? (l += S.css(t, 'border' + nt[s] + 'Width', !0, r))
                          : (a += S.css(t, 'border' + nt[s] + 'Width', !0, r)));
        return !n && 0 <= o && (l += Math.max(0, Math.ceil(t['offset' + e[0].toUpperCase() + e.slice(1)] - o - l - a - 0.5))), l;
    }
    function Zt(t, e, i) {
        var n = $t(t),
            r = Bt(t, e, n),
            o = 'border-box' === S.css(t, 'boxSizing', !1, n),
            s = o;
        if (Lt.test(r)) {
            if (!i) return r;
            r = 'auto';
        }
        return (
            (s = s && (v.boxSizingReliable() || r === t.style[e])),
            ('auto' === r || (!parseFloat(r) && 'inline' === S.css(t, 'display', !1, n))) &&
                ((r = t['offset' + e[0].toUpperCase() + e.slice(1)]), (s = !0)),
            (r = parseFloat(r) || 0) + Xt(t, e, i || (o ? 'border' : 'content'), s, n, r) + 'px'
        );
    }
    function Qt(t, e, i, n, r) {
        return new Qt.prototype.init(t, e, i, n, r);
    }
    S.extend({
        cssHooks: {
            opacity: {
                get: function (t, e) {
                    if (e) {
                        var i = Bt(t, 'opacity');
                        return '' === i ? '1' : i;
                    }
                },
            },
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
        },
        cssProps: {},
        style: function (t, e, i, n) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var r,
                    o,
                    s,
                    a = q(e),
                    l = Ut.test(e),
                    c = t.style;
                if ((l || (e = Gt(a)), (s = S.cssHooks[e] || S.cssHooks[a]), void 0 === i))
                    return s && 'get' in s && void 0 !== (r = s.get(t, !1, n)) ? r : c[e];
                'string' === (o = typeof i) && (r = it.exec(i)) && r[1] && ((i = st(t, e, r)), (o = 'number')),
                    null != i &&
                        i == i &&
                        ('number' === o && (i += (r && r[3]) || (S.cssNumber[a] ? '' : 'px')),
                        v.clearCloneStyle || '' !== i || 0 !== e.indexOf('background') || (c[e] = 'inherit'),
                        (s && 'set' in s && void 0 === (i = s.set(t, i, n))) || (l ? c.setProperty(e, i) : (c[e] = i)));
            }
        },
        css: function (t, e, i, n) {
            var r,
                o,
                s,
                a = q(e);
            return (
                Ut.test(e) || (e = Gt(a)),
                (s = S.cssHooks[e] || S.cssHooks[a]) && 'get' in s && (r = s.get(t, !0, i)),
                void 0 === r && (r = Bt(t, e, n)),
                'normal' === r && e in Yt && (r = Yt[e]),
                '' === i || i ? ((o = parseFloat(r)), !0 === i || isFinite(o) ? o || 0 : r) : r
            );
        },
    }),
        S.each(['height', 'width'], function (t, a) {
            S.cssHooks[a] = {
                get: function (t, e, i) {
                    if (e)
                        return !zt.test(S.css(t, 'display')) || (t.getClientRects().length && t.getBoundingClientRect().width)
                            ? Zt(t, a, i)
                            : ot(t, Wt, function () {
                                  return Zt(t, a, i);
                              });
                },
                set: function (t, e, i) {
                    var n,
                        r = $t(t),
                        o = 'border-box' === S.css(t, 'boxSizing', !1, r),
                        s = i && Xt(t, a, i, o, r);
                    return (
                        o &&
                            v.scrollboxSize() === r.position &&
                            (s -= Math.ceil(
                                t['offset' + a[0].toUpperCase() + a.slice(1)] - parseFloat(r[a]) - Xt(t, a, 'border', !1, r) - 0.5
                            )),
                        s && (n = it.exec(e)) && 'px' !== (n[3] || 'px') && ((t.style[a] = e), (e = S.css(t, a))),
                        Kt(0, e, s)
                    );
                },
            };
        }),
        (S.cssHooks.marginLeft = Ht(v.reliableMarginLeft, function (t, e) {
            if (e)
                return (
                    (parseFloat(Bt(t, 'marginLeft')) ||
                        t.getBoundingClientRect().left -
                            ot(t, { marginLeft: 0 }, function () {
                                return t.getBoundingClientRect().left;
                            })) + 'px'
                );
        })),
        S.each({ margin: '', padding: '', border: 'Width' }, function (r, o) {
            (S.cssHooks[r + o] = {
                expand: function (t) {
                    for (var e = 0, i = {}, n = 'string' == typeof t ? t.split(' ') : [t]; e < 4; e++)
                        i[r + nt[e] + o] = n[e] || n[e - 2] || n[0];
                    return i;
                },
            }),
                'margin' !== r && (S.cssHooks[r + o].set = Kt);
        }),
        S.fn.extend({
            css: function (t, e) {
                return U(
                    this,
                    function (t, e, i) {
                        var n,
                            r,
                            o = {},
                            s = 0;
                        if (Array.isArray(e)) {
                            for (n = $t(t), r = e.length; s < r; s++) o[e[s]] = S.css(t, e[s], !1, n);
                            return o;
                        }
                        return void 0 !== i ? S.style(t, e, i) : S.css(t, e);
                    },
                    t,
                    e,
                    1 < arguments.length
                );
            },
        }),
        (((S.Tween = Qt).prototype = {
            constructor: Qt,
            init: function (t, e, i, n, r, o) {
                (this.elem = t),
                    (this.prop = i),
                    (this.easing = r || S.easing._default),
                    (this.options = e),
                    (this.start = this.now = this.cur()),
                    (this.end = n),
                    (this.unit = o || (S.cssNumber[i] ? '' : 'px'));
            },
            cur: function () {
                var t = Qt.propHooks[this.prop];
                return t && t.get ? t.get(this) : Qt.propHooks._default.get(this);
            },
            run: function (t) {
                var e,
                    i = Qt.propHooks[this.prop];
                return (
                    this.options.duration
                        ? (this.pos = e = S.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration))
                        : (this.pos = e = t),
                    (this.now = (this.end - this.start) * e + this.start),
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    i && i.set ? i.set(this) : Qt.propHooks._default.set(this),
                    this
                );
            },
        }).init.prototype = Qt.prototype),
        ((Qt.propHooks = {
            _default: {
                get: function (t) {
                    var e;
                    return 1 !== t.elem.nodeType || (null != t.elem[t.prop] && null == t.elem.style[t.prop])
                        ? t.elem[t.prop]
                        : (e = S.css(t.elem, t.prop, '')) && 'auto' !== e
                        ? e
                        : 0;
                },
                set: function (t) {
                    S.fx.step[t.prop]
                        ? S.fx.step[t.prop](t)
                        : 1 !== t.elem.nodeType || (null == t.elem.style[S.cssProps[t.prop]] && !S.cssHooks[t.prop])
                        ? (t.elem[t.prop] = t.now)
                        : S.style(t.elem, t.prop, t.now + t.unit);
                },
            },
        }).scrollTop = Qt.propHooks.scrollLeft = {
            set: function (t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
            },
        }),
        (S.easing = {
            linear: function (t) {
                return t;
            },
            swing: function (t) {
                return 0.5 - Math.cos(t * Math.PI) / 2;
            },
            _default: 'swing',
        }),
        (S.fx = Qt.prototype.init),
        (S.fx.step = {});
    var Jt,
        te,
        ee,
        ie,
        ne = /^(?:toggle|show|hide)$/,
        re = /queueHooks$/;
    function oe() {
        te && (!1 === C.hidden && k.requestAnimationFrame ? k.requestAnimationFrame(oe) : k.setTimeout(oe, S.fx.interval), S.fx.tick());
    }
    function se() {
        return (
            k.setTimeout(function () {
                Jt = void 0;
            }),
            (Jt = Date.now())
        );
    }
    function ae(t, e) {
        var i,
            n = 0,
            r = { height: t };
        for (e = e ? 1 : 0; n < 4; n += 2 - e) r['margin' + (i = nt[n])] = r['padding' + i] = t;
        return e && (r.opacity = r.width = t), r;
    }
    function le(t, e, i) {
        for (var n, r = (ce.tweeners[e] || []).concat(ce.tweeners['*']), o = 0, s = r.length; o < s; o++)
            if ((n = r[o].call(i, e, t))) return n;
    }
    function ce(o, t, e) {
        var i,
            s,
            n = 0,
            r = ce.prefilters.length,
            a = S.Deferred().always(function () {
                delete l.elem;
            }),
            l = function () {
                if (s) return !1;
                for (
                    var t = Jt || se(),
                        e = Math.max(0, c.startTime + c.duration - t),
                        i = 1 - (e / c.duration || 0),
                        n = 0,
                        r = c.tweens.length;
                    n < r;
                    n++
                )
                    c.tweens[n].run(i);
                return a.notifyWith(o, [c, i, e]), i < 1 && r ? e : (r || a.notifyWith(o, [c, 1, 0]), a.resolveWith(o, [c]), !1);
            },
            c = a.promise({
                elem: o,
                props: S.extend({}, t),
                opts: S.extend(!0, { specialEasing: {}, easing: S.easing._default }, e),
                originalProperties: t,
                originalOptions: e,
                startTime: Jt || se(),
                duration: e.duration,
                tweens: [],
                createTween: function (t, e) {
                    var i = S.Tween(o, c.opts, t, e, c.opts.specialEasing[t] || c.opts.easing);
                    return c.tweens.push(i), i;
                },
                stop: function (t) {
                    var e = 0,
                        i = t ? c.tweens.length : 0;
                    if (s) return this;
                    for (s = !0; e < i; e++) c.tweens[e].run(1);
                    return t ? (a.notifyWith(o, [c, 1, 0]), a.resolveWith(o, [c, t])) : a.rejectWith(o, [c, t]), this;
                },
            }),
            h = c.props;
        for (
            !(function (t, e) {
                var i, n, r, o, s;
                for (i in t)
                    if (
                        ((r = e[(n = q(i))]),
                        (o = t[i]),
                        Array.isArray(o) && ((r = o[1]), (o = t[i] = o[0])),
                        i !== n && ((t[n] = o), delete t[i]),
                        (s = S.cssHooks[n]) && ('expand' in s))
                    )
                        for (i in ((o = s.expand(o)), delete t[n], o)) (i in t) || ((t[i] = o[i]), (e[i] = r));
                    else e[n] = r;
            })(h, c.opts.specialEasing);
            n < r;
            n++
        )
            if ((i = ce.prefilters[n].call(c, o, h, c.opts)))
                return y(i.stop) && (S._queueHooks(c.elem, c.opts.queue).stop = i.stop.bind(i)), i;
        return (
            S.map(h, le, c),
            y(c.opts.start) && c.opts.start.call(o, c),
            c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always),
            S.fx.timer(S.extend(l, { elem: o, anim: c, queue: c.opts.queue })),
            c
        );
    }
    (S.Animation = S.extend(ce, {
        tweeners: {
            '*': [
                function (t, e) {
                    var i = this.createTween(t, e);
                    return st(i.elem, t, it.exec(e), i), i;
                },
            ],
        },
        tweener: function (t, e) {
            y(t) ? ((e = t), (t = ['*'])) : (t = t.match(F));
            for (var i, n = 0, r = t.length; n < r; n++) (i = t[n]), (ce.tweeners[i] = ce.tweeners[i] || []), ce.tweeners[i].unshift(e);
        },
        prefilters: [
            function (t, e, i) {
                var n,
                    r,
                    o,
                    s,
                    a,
                    l,
                    c,
                    h,
                    d = 'width' in e || 'height' in e,
                    u = this,
                    p = {},
                    f = t.style,
                    m = t.nodeType && rt(t),
                    g = X.get(t, 'fxshow');
                for (n in (i.queue ||
                    (null == (s = S._queueHooks(t, 'fx')).unqueued &&
                        ((s.unqueued = 0),
                        (a = s.empty.fire),
                        (s.empty.fire = function () {
                            s.unqueued || a();
                        })),
                    s.unqueued++,
                    u.always(function () {
                        u.always(function () {
                            s.unqueued--, S.queue(t, 'fx').length || s.empty.fire();
                        });
                    })),
                e))
                    if (((r = e[n]), ne.test(r))) {
                        if ((delete e[n], (o = o || 'toggle' === r), r === (m ? 'hide' : 'show'))) {
                            if ('show' !== r || !g || void 0 === g[n]) continue;
                            m = !0;
                        }
                        p[n] = (g && g[n]) || S.style(t, n);
                    }
                if ((l = !S.isEmptyObject(e)) || !S.isEmptyObject(p))
                    for (n in (d &&
                        1 === t.nodeType &&
                        ((i.overflow = [f.overflow, f.overflowX, f.overflowY]),
                        null == (c = g && g.display) && (c = X.get(t, 'display')),
                        'none' === (h = S.css(t, 'display')) &&
                            (c ? (h = c) : (lt([t], !0), (c = t.style.display || c), (h = S.css(t, 'display')), lt([t]))),
                        ('inline' === h || ('inline-block' === h && null != c)) &&
                            'none' === S.css(t, 'float') &&
                            (l ||
                                (u.done(function () {
                                    f.display = c;
                                }),
                                null == c && ((h = f.display), (c = 'none' === h ? '' : h))),
                            (f.display = 'inline-block'))),
                    i.overflow &&
                        ((f.overflow = 'hidden'),
                        u.always(function () {
                            (f.overflow = i.overflow[0]), (f.overflowX = i.overflow[1]), (f.overflowY = i.overflow[2]);
                        })),
                    (l = !1),
                    p))
                        l ||
                            (g ? 'hidden' in g && (m = g.hidden) : (g = X.access(t, 'fxshow', { display: c })),
                            o && (g.hidden = !m),
                            m && lt([t], !0),
                            u.done(function () {
                                for (n in (m || lt([t]), X.remove(t, 'fxshow'), p)) S.style(t, n, p[n]);
                            })),
                            (l = le(m ? g[n] : 0, n, u)),
                            n in g || ((g[n] = l.start), m && ((l.end = l.start), (l.start = 0)));
            },
        ],
        prefilter: function (t, e) {
            e ? ce.prefilters.unshift(t) : ce.prefilters.push(t);
        },
    })),
        (S.speed = function (t, e, i) {
            var n =
                t && 'object' == typeof t
                    ? S.extend({}, t)
                    : { complete: i || (!i && e) || (y(t) && t), duration: t, easing: (i && e) || (e && !y(e) && e) };
            return (
                S.fx.off
                    ? (n.duration = 0)
                    : 'number' != typeof n.duration &&
                      (n.duration in S.fx.speeds ? (n.duration = S.fx.speeds[n.duration]) : (n.duration = S.fx.speeds._default)),
                (null != n.queue && !0 !== n.queue) || (n.queue = 'fx'),
                (n.old = n.complete),
                (n.complete = function () {
                    y(n.old) && n.old.call(this), n.queue && S.dequeue(this, n.queue);
                }),
                n
            );
        }),
        S.fn.extend({
            fadeTo: function (t, e, i, n) {
                return this.filter(rt).css('opacity', 0).show().end().animate({ opacity: e }, t, i, n);
            },
            animate: function (e, t, i, n) {
                var r = S.isEmptyObject(e),
                    o = S.speed(t, i, n),
                    s = function () {
                        var t = ce(this, S.extend({}, e), o);
                        (r || X.get(this, 'finish')) && t.stop(!0);
                    };
                return (s.finish = s), r || !1 === o.queue ? this.each(s) : this.queue(o.queue, s);
            },
            stop: function (r, t, o) {
                var s = function (t) {
                    var e = t.stop;
                    delete t.stop, e(o);
                };
                return (
                    'string' != typeof r && ((o = t), (t = r), (r = void 0)),
                    t && !1 !== r && this.queue(r || 'fx', []),
                    this.each(function () {
                        var t = !0,
                            e = null != r && r + 'queueHooks',
                            i = S.timers,
                            n = X.get(this);
                        if (e) n[e] && n[e].stop && s(n[e]);
                        else for (e in n) n[e] && n[e].stop && re.test(e) && s(n[e]);
                        for (e = i.length; e--; )
                            i[e].elem !== this || (null != r && i[e].queue !== r) || (i[e].anim.stop(o), (t = !1), i.splice(e, 1));
                        (!t && o) || S.dequeue(this, r);
                    })
                );
            },
            finish: function (s) {
                return (
                    !1 !== s && (s = s || 'fx'),
                    this.each(function () {
                        var t,
                            e = X.get(this),
                            i = e[s + 'queue'],
                            n = e[s + 'queueHooks'],
                            r = S.timers,
                            o = i ? i.length : 0;
                        for (e.finish = !0, S.queue(this, s, []), n && n.stop && n.stop.call(this, !0), t = r.length; t--; )
                            r[t].elem === this && r[t].queue === s && (r[t].anim.stop(!0), r.splice(t, 1));
                        for (t = 0; t < o; t++) i[t] && i[t].finish && i[t].finish.call(this);
                        delete e.finish;
                    })
                );
            },
        }),
        S.each(['toggle', 'show', 'hide'], function (t, n) {
            var r = S.fn[n];
            S.fn[n] = function (t, e, i) {
                return null == t || 'boolean' == typeof t ? r.apply(this, arguments) : this.animate(ae(n, !0), t, e, i);
            };
        }),
        S.each(
            {
                slideDown: ae('show'),
                slideUp: ae('hide'),
                slideToggle: ae('toggle'),
                fadeIn: { opacity: 'show' },
                fadeOut: { opacity: 'hide' },
                fadeToggle: { opacity: 'toggle' },
            },
            function (t, n) {
                S.fn[t] = function (t, e, i) {
                    return this.animate(n, t, e, i);
                };
            }
        ),
        (S.timers = []),
        (S.fx.tick = function () {
            var t,
                e = 0,
                i = S.timers;
            for (Jt = Date.now(); e < i.length; e++) (t = i[e])() || i[e] !== t || i.splice(e--, 1);
            i.length || S.fx.stop(), (Jt = void 0);
        }),
        (S.fx.timer = function (t) {
            S.timers.push(t), S.fx.start();
        }),
        (S.fx.interval = 13),
        (S.fx.start = function () {
            te || ((te = !0), oe());
        }),
        (S.fx.stop = function () {
            te = null;
        }),
        (S.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
        (S.fn.delay = function (n, t) {
            return (
                (n = (S.fx && S.fx.speeds[n]) || n),
                (t = t || 'fx'),
                this.queue(t, function (t, e) {
                    var i = k.setTimeout(t, n);
                    e.stop = function () {
                        k.clearTimeout(i);
                    };
                })
            );
        }),
        (ee = C.createElement('input')),
        (ie = C.createElement('select').appendChild(C.createElement('option'))),
        (ee.type = 'checkbox'),
        (v.checkOn = '' !== ee.value),
        (v.optSelected = ie.selected),
        ((ee = C.createElement('input')).value = 't'),
        (ee.type = 'radio'),
        (v.radioValue = 't' === ee.value);
    var he,
        de = S.expr.attrHandle;
    S.fn.extend({
        attr: function (t, e) {
            return U(this, S.attr, t, e, 1 < arguments.length);
        },
        removeAttr: function (t) {
            return this.each(function () {
                S.removeAttr(this, t);
            });
        },
    }),
        S.extend({
            attr: function (t, e, i) {
                var n,
                    r,
                    o = t.nodeType;
                if (3 !== o && 8 !== o && 2 !== o)
                    return void 0 === t.getAttribute
                        ? S.prop(t, e, i)
                        : ((1 === o && S.isXMLDoc(t)) || (r = S.attrHooks[e.toLowerCase()] || (S.expr.match.bool.test(e) ? he : void 0)),
                          void 0 !== i
                              ? null === i
                                  ? void S.removeAttr(t, e)
                                  : r && 'set' in r && void 0 !== (n = r.set(t, i, e))
                                  ? n
                                  : (t.setAttribute(e, i + ''), i)
                              : r && 'get' in r && null !== (n = r.get(t, e))
                              ? n
                              : null == (n = S.find.attr(t, e))
                              ? void 0
                              : n);
            },
            attrHooks: {
                type: {
                    set: function (t, e) {
                        if (!v.radioValue && 'radio' === e && M(t, 'input')) {
                            var i = t.value;
                            return t.setAttribute('type', e), i && (t.value = i), e;
                        }
                    },
                },
            },
            removeAttr: function (t, e) {
                var i,
                    n = 0,
                    r = e && e.match(F);
                if (r && 1 === t.nodeType) for (; (i = r[n++]); ) t.removeAttribute(i);
            },
        }),
        (he = {
            set: function (t, e, i) {
                return !1 === e ? S.removeAttr(t, i) : t.setAttribute(i, i), i;
            },
        }),
        S.each(S.expr.match.bool.source.match(/\w+/g), function (t, e) {
            var s = de[e] || S.find.attr;
            de[e] = function (t, e, i) {
                var n,
                    r,
                    o = e.toLowerCase();
                return i || ((r = de[o]), (de[o] = n), (n = null != s(t, e, i) ? o : null), (de[o] = r)), n;
            };
        });
    var ue = /^(?:input|select|textarea|button)$/i,
        pe = /^(?:a|area)$/i;
    function fe(t) {
        return (t.match(F) || []).join(' ');
    }
    function me(t) {
        return (t.getAttribute && t.getAttribute('class')) || '';
    }
    function ge(t) {
        return Array.isArray(t) ? t : ('string' == typeof t && t.match(F)) || [];
    }
    S.fn.extend({
        prop: function (t, e) {
            return U(this, S.prop, t, e, 1 < arguments.length);
        },
        removeProp: function (t) {
            return this.each(function () {
                delete this[S.propFix[t] || t];
            });
        },
    }),
        S.extend({
            prop: function (t, e, i) {
                var n,
                    r,
                    o = t.nodeType;
                if (3 !== o && 8 !== o && 2 !== o)
                    return (
                        (1 === o && S.isXMLDoc(t)) || ((e = S.propFix[e] || e), (r = S.propHooks[e])),
                        void 0 !== i
                            ? r && 'set' in r && void 0 !== (n = r.set(t, i, e))
                                ? n
                                : (t[e] = i)
                            : r && 'get' in r && null !== (n = r.get(t, e))
                            ? n
                            : t[e]
                    );
            },
            propHooks: {
                tabIndex: {
                    get: function (t) {
                        var e = S.find.attr(t, 'tabindex');
                        return e ? parseInt(e, 10) : ue.test(t.nodeName) || (pe.test(t.nodeName) && t.href) ? 0 : -1;
                    },
                },
            },
            propFix: { for: 'htmlFor', class: 'className' },
        }),
        v.optSelected ||
            (S.propHooks.selected = {
                get: function (t) {
                    var e = t.parentNode;
                    return e && e.parentNode && e.parentNode.selectedIndex, null;
                },
                set: function (t) {
                    var e = t.parentNode;
                    e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex);
                },
            }),
        S.each(
            [
                'tabIndex',
                'readOnly',
                'maxLength',
                'cellSpacing',
                'cellPadding',
                'rowSpan',
                'colSpan',
                'useMap',
                'frameBorder',
                'contentEditable',
            ],
            function () {
                S.propFix[this.toLowerCase()] = this;
            }
        ),
        S.fn.extend({
            addClass: function (e) {
                var t,
                    i,
                    n,
                    r,
                    o,
                    s,
                    a,
                    l = 0;
                if (y(e))
                    return this.each(function (t) {
                        S(this).addClass(e.call(this, t, me(this)));
                    });
                if ((t = ge(e)).length)
                    for (; (i = this[l++]); )
                        if (((r = me(i)), (n = 1 === i.nodeType && ' ' + fe(r) + ' '))) {
                            for (s = 0; (o = t[s++]); ) n.indexOf(' ' + o + ' ') < 0 && (n += o + ' ');
                            r !== (a = fe(n)) && i.setAttribute('class', a);
                        }
                return this;
            },
            removeClass: function (e) {
                var t,
                    i,
                    n,
                    r,
                    o,
                    s,
                    a,
                    l = 0;
                if (y(e))
                    return this.each(function (t) {
                        S(this).removeClass(e.call(this, t, me(this)));
                    });
                if (!arguments.length) return this.attr('class', '');
                if ((t = ge(e)).length)
                    for (; (i = this[l++]); )
                        if (((r = me(i)), (n = 1 === i.nodeType && ' ' + fe(r) + ' '))) {
                            for (s = 0; (o = t[s++]); ) for (; -1 < n.indexOf(' ' + o + ' '); ) n = n.replace(' ' + o + ' ', ' ');
                            r !== (a = fe(n)) && i.setAttribute('class', a);
                        }
                return this;
            },
            toggleClass: function (r, e) {
                var o = typeof r,
                    s = 'string' === o || Array.isArray(r);
                return 'boolean' == typeof e && s
                    ? e
                        ? this.addClass(r)
                        : this.removeClass(r)
                    : y(r)
                    ? this.each(function (t) {
                          S(this).toggleClass(r.call(this, t, me(this), e), e);
                      })
                    : this.each(function () {
                          var t, e, i, n;
                          if (s) for (e = 0, i = S(this), n = ge(r); (t = n[e++]); ) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                          else
                              (void 0 !== r && 'boolean' !== o) ||
                                  ((t = me(this)) && X.set(this, '__className__', t),
                                  this.setAttribute && this.setAttribute('class', t || !1 === r ? '' : X.get(this, '__className__') || ''));
                      });
            },
            hasClass: function (t) {
                var e,
                    i,
                    n = 0;
                for (e = ' ' + t + ' '; (i = this[n++]); ) if (1 === i.nodeType && -1 < (' ' + fe(me(i)) + ' ').indexOf(e)) return !0;
                return !1;
            },
        });
    var ve = /\r/g;
    S.fn.extend({
        val: function (i) {
            var n,
                t,
                r,
                e = this[0];
            return arguments.length
                ? ((r = y(i)),
                  this.each(function (t) {
                      var e;
                      1 === this.nodeType &&
                          (null == (e = r ? i.call(this, t, S(this).val()) : i)
                              ? (e = '')
                              : 'number' == typeof e
                              ? (e += '')
                              : Array.isArray(e) &&
                                (e = S.map(e, function (t) {
                                    return null == t ? '' : t + '';
                                })),
                          ((n = S.valHooks[this.type] || S.valHooks[this.nodeName.toLowerCase()]) &&
                              'set' in n &&
                              void 0 !== n.set(this, e, 'value')) ||
                              (this.value = e));
                  }))
                : e
                ? (n = S.valHooks[e.type] || S.valHooks[e.nodeName.toLowerCase()]) && 'get' in n && void 0 !== (t = n.get(e, 'value'))
                    ? t
                    : 'string' == typeof (t = e.value)
                    ? t.replace(ve, '')
                    : null == t
                    ? ''
                    : t
                : void 0;
        },
    }),
        S.extend({
            valHooks: {
                option: {
                    get: function (t) {
                        var e = S.find.attr(t, 'value');
                        return null != e ? e : fe(S.text(t));
                    },
                },
                select: {
                    get: function (t) {
                        var e,
                            i,
                            n,
                            r = t.options,
                            o = t.selectedIndex,
                            s = 'select-one' === t.type,
                            a = s ? null : [],
                            l = s ? o + 1 : r.length;
                        for (n = o < 0 ? l : s ? o : 0; n < l; n++)
                            if (
                                ((i = r[n]).selected || n === o) &&
                                !i.disabled &&
                                (!i.parentNode.disabled || !M(i.parentNode, 'optgroup'))
                            ) {
                                if (((e = S(i).val()), s)) return e;
                                a.push(e);
                            }
                        return a;
                    },
                    set: function (t, e) {
                        for (var i, n, r = t.options, o = S.makeArray(e), s = r.length; s--; )
                            ((n = r[s]).selected = -1 < S.inArray(S.valHooks.option.get(n), o)) && (i = !0);
                        return i || (t.selectedIndex = -1), o;
                    },
                },
            },
        }),
        S.each(['radio', 'checkbox'], function () {
            (S.valHooks[this] = {
                set: function (t, e) {
                    if (Array.isArray(e)) return (t.checked = -1 < S.inArray(S(t).val(), e));
                },
            }),
                v.checkOn ||
                    (S.valHooks[this].get = function (t) {
                        return null === t.getAttribute('value') ? 'on' : t.value;
                    });
        }),
        (v.focusin = 'onfocusin' in k);
    var ye = /^(?:focusinfocus|focusoutblur)$/,
        be = function (t) {
            t.stopPropagation();
        };
    S.extend(S.event, {
        trigger: function (t, e, i, n) {
            var r,
                o,
                s,
                a,
                l,
                c,
                h,
                d,
                u = [i || C],
                p = g.call(t, 'type') ? t.type : t,
                f = g.call(t, 'namespace') ? t.namespace.split('.') : [];
            if (
                ((o = d = s = i = i || C),
                3 !== i.nodeType &&
                    8 !== i.nodeType &&
                    !ye.test(p + S.event.triggered) &&
                    (-1 < p.indexOf('.') && ((p = (f = p.split('.')).shift()), f.sort()),
                    (l = p.indexOf(':') < 0 && 'on' + p),
                    ((t = t[S.expando] ? t : new S.Event(p, 'object' == typeof t && t)).isTrigger = n ? 2 : 3),
                    (t.namespace = f.join('.')),
                    (t.rnamespace = t.namespace ? new RegExp('(^|\\.)' + f.join('\\.(?:.*\\.|)') + '(\\.|$)') : null),
                    (t.result = void 0),
                    t.target || (t.target = i),
                    (e = null == e ? [t] : S.makeArray(e, [t])),
                    (h = S.event.special[p] || {}),
                    n || !h.trigger || !1 !== h.trigger.apply(i, e)))
            ) {
                if (!n && !h.noBubble && !b(i)) {
                    for (a = h.delegateType || p, ye.test(a + p) || (o = o.parentNode); o; o = o.parentNode) u.push(o), (s = o);
                    s === (i.ownerDocument || C) && u.push(s.defaultView || s.parentWindow || k);
                }
                for (r = 0; (o = u[r++]) && !t.isPropagationStopped(); )
                    (d = o),
                        (t.type = 1 < r ? a : h.bindType || p),
                        (c = (X.get(o, 'events') || {})[t.type] && X.get(o, 'handle')) && c.apply(o, e),
                        (c = l && o[l]) && c.apply && G(o) && ((t.result = c.apply(o, e)), !1 === t.result && t.preventDefault());
                return (
                    (t.type = p),
                    n ||
                        t.isDefaultPrevented() ||
                        (h._default && !1 !== h._default.apply(u.pop(), e)) ||
                        !G(i) ||
                        (l &&
                            y(i[p]) &&
                            !b(i) &&
                            ((s = i[l]) && (i[l] = null),
                            (S.event.triggered = p),
                            t.isPropagationStopped() && d.addEventListener(p, be),
                            i[p](),
                            t.isPropagationStopped() && d.removeEventListener(p, be),
                            (S.event.triggered = void 0),
                            s && (i[l] = s))),
                    t.result
                );
            }
        },
        simulate: function (t, e, i) {
            var n = S.extend(new S.Event(), i, { type: t, isSimulated: !0 });
            S.event.trigger(n, null, e);
        },
    }),
        S.fn.extend({
            trigger: function (t, e) {
                return this.each(function () {
                    S.event.trigger(t, e, this);
                });
            },
            triggerHandler: function (t, e) {
                var i = this[0];
                if (i) return S.event.trigger(t, e, i, !0);
            },
        }),
        v.focusin ||
            S.each({ focus: 'focusin', blur: 'focusout' }, function (i, n) {
                var r = function (t) {
                    S.event.simulate(n, t.target, S.event.fix(t));
                };
                S.event.special[n] = {
                    setup: function () {
                        var t = this.ownerDocument || this,
                            e = X.access(t, n);
                        e || t.addEventListener(i, r, !0), X.access(t, n, (e || 0) + 1);
                    },
                    teardown: function () {
                        var t = this.ownerDocument || this,
                            e = X.access(t, n) - 1;
                        e ? X.access(t, n, e) : (t.removeEventListener(i, r, !0), X.remove(t, n));
                    },
                };
            });
    var _e = k.location,
        xe = Date.now(),
        we = /\?/;
    S.parseXML = function (t) {
        var e;
        if (!t || 'string' != typeof t) return null;
        try {
            e = new k.DOMParser().parseFromString(t, 'text/xml');
        } catch (t) {
            e = void 0;
        }
        return (e && !e.getElementsByTagName('parsererror').length) || S.error('Invalid XML: ' + t), e;
    };
    var ke = /\[\]$/,
        Ce = /\r?\n/g,
        Se = /^(?:submit|button|image|reset|file)$/i,
        De = /^(?:input|select|textarea|keygen)/i;
    function Te(i, t, n, r) {
        var e;
        if (Array.isArray(t))
            S.each(t, function (t, e) {
                n || ke.test(i) ? r(i, e) : Te(i + '[' + ('object' == typeof e && null != e ? t : '') + ']', e, n, r);
            });
        else if (n || 'object' !== x(t)) r(i, t);
        else for (e in t) Te(i + '[' + e + ']', t[e], n, r);
    }
    (S.param = function (t, e) {
        var i,
            n = [],
            r = function (t, e) {
                var i = y(e) ? e() : e;
                n[n.length] = encodeURIComponent(t) + '=' + encodeURIComponent(null == i ? '' : i);
            };
        if (Array.isArray(t) || (t.jquery && !S.isPlainObject(t)))
            S.each(t, function () {
                r(this.name, this.value);
            });
        else for (i in t) Te(i, t[i], e, r);
        return n.join('&');
    }),
        S.fn.extend({
            serialize: function () {
                return S.param(this.serializeArray());
            },
            serializeArray: function () {
                return this.map(function () {
                    var t = S.prop(this, 'elements');
                    return t ? S.makeArray(t) : this;
                })
                    .filter(function () {
                        var t = this.type;
                        return (
                            this.name && !S(this).is(':disabled') && De.test(this.nodeName) && !Se.test(t) && (this.checked || !ct.test(t))
                        );
                    })
                    .map(function (t, e) {
                        var i = S(this).val();
                        return null == i
                            ? null
                            : Array.isArray(i)
                            ? S.map(i, function (t) {
                                  return { name: e.name, value: t.replace(Ce, '\r\n') };
                              })
                            : { name: e.name, value: i.replace(Ce, '\r\n') };
                    })
                    .get();
            },
        });
    var Me = /%20/g,
        Ae = /#.*$/,
        Ee = /([?&])_=[^&]*/,
        Pe = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Ie = /^(?:GET|HEAD)$/,
        Oe = /^\/\//,
        Ne = {},
        je = {},
        Fe = '*/'.concat('*'),
        Le = C.createElement('a');
    function $e(o) {
        return function (t, e) {
            'string' != typeof t && ((e = t), (t = '*'));
            var i,
                n = 0,
                r = t.toLowerCase().match(F) || [];
            if (y(e))
                for (; (i = r[n++]); )
                    '+' === i[0] ? ((i = i.slice(1) || '*'), (o[i] = o[i] || []).unshift(e)) : (o[i] = o[i] || []).push(e);
        };
    }
    function Re(e, r, o, s) {
        var a = {},
            l = e === je;
        function c(t) {
            var n;
            return (
                (a[t] = !0),
                S.each(e[t] || [], function (t, e) {
                    var i = e(r, o, s);
                    return 'string' != typeof i || l || a[i] ? (l ? !(n = i) : void 0) : (r.dataTypes.unshift(i), c(i), !1);
                }),
                n
            );
        }
        return c(r.dataTypes[0]) || (!a['*'] && c('*'));
    }
    function Be(t, e) {
        var i,
            n,
            r = S.ajaxSettings.flatOptions || {};
        for (i in e) void 0 !== e[i] && ((r[i] ? t : n || (n = {}))[i] = e[i]);
        return n && S.extend(!0, t, n), t;
    }
    (Le.href = _e.href),
        S.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: _e.href,
                type: 'GET',
                isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(_e.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                accepts: {
                    '*': Fe,
                    text: 'text/plain',
                    html: 'text/html',
                    xml: 'application/xml, text/xml',
                    json: 'application/json, text/javascript',
                },
                contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                responseFields: { xml: 'responseXML', text: 'responseText', json: 'responseJSON' },
                converters: { '* text': String, 'text html': !0, 'text json': JSON.parse, 'text xml': S.parseXML },
                flatOptions: { url: !0, context: !0 },
            },
            ajaxSetup: function (t, e) {
                return e ? Be(Be(t, S.ajaxSettings), e) : Be(S.ajaxSettings, t);
            },
            ajaxPrefilter: $e(Ne),
            ajaxTransport: $e(je),
            ajax: function (t, e) {
                'object' == typeof t && ((e = t), (t = void 0)), (e = e || {});
                var h,
                    d,
                    u,
                    i,
                    p,
                    n,
                    f,
                    m,
                    r,
                    o,
                    g = S.ajaxSetup({}, e),
                    v = g.context || g,
                    y = g.context && (v.nodeType || v.jquery) ? S(v) : S.event,
                    b = S.Deferred(),
                    _ = S.Callbacks('once memory'),
                    x = g.statusCode || {},
                    s = {},
                    a = {},
                    l = 'canceled',
                    w = {
                        readyState: 0,
                        getResponseHeader: function (t) {
                            var e;
                            if (f) {
                                if (!i) for (i = {}; (e = Pe.exec(u)); ) i[e[1].toLowerCase()] = e[2];
                                e = i[t.toLowerCase()];
                            }
                            return null == e ? null : e;
                        },
                        getAllResponseHeaders: function () {
                            return f ? u : null;
                        },
                        setRequestHeader: function (t, e) {
                            return null == f && ((t = a[t.toLowerCase()] = a[t.toLowerCase()] || t), (s[t] = e)), this;
                        },
                        overrideMimeType: function (t) {
                            return null == f && (g.mimeType = t), this;
                        },
                        statusCode: function (t) {
                            var e;
                            if (t)
                                if (f) w.always(t[w.status]);
                                else for (e in t) x[e] = [x[e], t[e]];
                            return this;
                        },
                        abort: function (t) {
                            var e = t || l;
                            return h && h.abort(e), c(0, e), this;
                        },
                    };
                if (
                    (b.promise(w),
                    (g.url = ((t || g.url || _e.href) + '').replace(Oe, _e.protocol + '//')),
                    (g.type = e.method || e.type || g.method || g.type),
                    (g.dataTypes = (g.dataType || '*').toLowerCase().match(F) || ['']),
                    null == g.crossDomain)
                ) {
                    n = C.createElement('a');
                    try {
                        (n.href = g.url), (n.href = n.href), (g.crossDomain = Le.protocol + '//' + Le.host != n.protocol + '//' + n.host);
                    } catch (t) {
                        g.crossDomain = !0;
                    }
                }
                if ((g.data && g.processData && 'string' != typeof g.data && (g.data = S.param(g.data, g.traditional)), Re(Ne, g, e, w), f))
                    return w;
                for (r in ((m = S.event && g.global) && 0 == S.active++ && S.event.trigger('ajaxStart'),
                (g.type = g.type.toUpperCase()),
                (g.hasContent = !Ie.test(g.type)),
                (d = g.url.replace(Ae, '')),
                g.hasContent
                    ? g.data &&
                      g.processData &&
                      0 === (g.contentType || '').indexOf('application/x-www-form-urlencoded') &&
                      (g.data = g.data.replace(Me, '+'))
                    : ((o = g.url.slice(d.length)),
                      g.data && (g.processData || 'string' == typeof g.data) && ((d += (we.test(d) ? '&' : '?') + g.data), delete g.data),
                      !1 === g.cache && ((d = d.replace(Ee, '$1')), (o = (we.test(d) ? '&' : '?') + '_=' + xe++ + o)),
                      (g.url = d + o)),
                g.ifModified &&
                    (S.lastModified[d] && w.setRequestHeader('If-Modified-Since', S.lastModified[d]),
                    S.etag[d] && w.setRequestHeader('If-None-Match', S.etag[d])),
                ((g.data && g.hasContent && !1 !== g.contentType) || e.contentType) && w.setRequestHeader('Content-Type', g.contentType),
                w.setRequestHeader(
                    'Accept',
                    g.dataTypes[0] && g.accepts[g.dataTypes[0]]
                        ? g.accepts[g.dataTypes[0]] + ('*' !== g.dataTypes[0] ? ', ' + Fe + '; q=0.01' : '')
                        : g.accepts['*']
                ),
                g.headers))
                    w.setRequestHeader(r, g.headers[r]);
                if (g.beforeSend && (!1 === g.beforeSend.call(v, w, g) || f)) return w.abort();
                if (((l = 'abort'), _.add(g.complete), w.done(g.success), w.fail(g.error), (h = Re(je, g, e, w)))) {
                    if (((w.readyState = 1), m && y.trigger('ajaxSend', [w, g]), f)) return w;
                    g.async &&
                        0 < g.timeout &&
                        (p = k.setTimeout(function () {
                            w.abort('timeout');
                        }, g.timeout));
                    try {
                        (f = !1), h.send(s, c);
                    } catch (t) {
                        if (f) throw t;
                        c(-1, t);
                    }
                } else c(-1, 'No Transport');
                function c(t, e, i, n) {
                    var r,
                        o,
                        s,
                        a,
                        l,
                        c = e;
                    f ||
                        ((f = !0),
                        p && k.clearTimeout(p),
                        (h = void 0),
                        (u = n || ''),
                        (w.readyState = 0 < t ? 4 : 0),
                        (r = (200 <= t && t < 300) || 304 === t),
                        i &&
                            (a = (function (t, e, i) {
                                for (var n, r, o, s, a = t.contents, l = t.dataTypes; '*' === l[0]; )
                                    l.shift(), void 0 === n && (n = t.mimeType || e.getResponseHeader('Content-Type'));
                                if (n)
                                    for (r in a)
                                        if (a[r] && a[r].test(n)) {
                                            l.unshift(r);
                                            break;
                                        }
                                if (l[0] in i) o = l[0];
                                else {
                                    for (r in i) {
                                        if (!l[0] || t.converters[r + ' ' + l[0]]) {
                                            o = r;
                                            break;
                                        }
                                        s || (s = r);
                                    }
                                    o = o || s;
                                }
                                if (o) return o !== l[0] && l.unshift(o), i[o];
                            })(g, w, i)),
                        (a = (function (t, e, i, n) {
                            var r,
                                o,
                                s,
                                a,
                                l,
                                c = {},
                                h = t.dataTypes.slice();
                            if (h[1]) for (s in t.converters) c[s.toLowerCase()] = t.converters[s];
                            for (o = h.shift(); o; )
                                if (
                                    (t.responseFields[o] && (i[t.responseFields[o]] = e),
                                    !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)),
                                    (l = o),
                                    (o = h.shift()))
                                )
                                    if ('*' === o) o = l;
                                    else if ('*' !== l && l !== o) {
                                        if (!(s = c[l + ' ' + o] || c['* ' + o]))
                                            for (r in c)
                                                if ((a = r.split(' '))[1] === o && (s = c[l + ' ' + a[0]] || c['* ' + a[0]])) {
                                                    !0 === s ? (s = c[r]) : !0 !== c[r] && ((o = a[0]), h.unshift(a[1]));
                                                    break;
                                                }
                                        if (!0 !== s)
                                            if (s && t.throws) e = s(e);
                                            else
                                                try {
                                                    e = s(e);
                                                } catch (t) {
                                                    return { state: 'parsererror', error: s ? t : 'No conversion from ' + l + ' to ' + o };
                                                }
                                    }
                            return { state: 'success', data: e };
                        })(g, a, w, r)),
                        r
                            ? (g.ifModified &&
                                  ((l = w.getResponseHeader('Last-Modified')) && (S.lastModified[d] = l),
                                  (l = w.getResponseHeader('etag')) && (S.etag[d] = l)),
                              204 === t || 'HEAD' === g.type
                                  ? (c = 'nocontent')
                                  : 304 === t
                                  ? (c = 'notmodified')
                                  : ((c = a.state), (o = a.data), (r = !(s = a.error))))
                            : ((s = c), (!t && c) || ((c = 'error'), t < 0 && (t = 0))),
                        (w.status = t),
                        (w.statusText = (e || c) + ''),
                        r ? b.resolveWith(v, [o, c, w]) : b.rejectWith(v, [w, c, s]),
                        w.statusCode(x),
                        (x = void 0),
                        m && y.trigger(r ? 'ajaxSuccess' : 'ajaxError', [w, g, r ? o : s]),
                        _.fireWith(v, [w, c]),
                        m && (y.trigger('ajaxComplete', [w, g]), --S.active || S.event.trigger('ajaxStop')));
                }
                return w;
            },
            getJSON: function (t, e, i) {
                return S.get(t, e, i, 'json');
            },
            getScript: function (t, e) {
                return S.get(t, void 0, e, 'script');
            },
        }),
        S.each(['get', 'post'], function (t, r) {
            S[r] = function (t, e, i, n) {
                return (
                    y(e) && ((n = n || i), (i = e), (e = void 0)),
                    S.ajax(S.extend({ url: t, type: r, dataType: n, data: e, success: i }, S.isPlainObject(t) && t))
                );
            };
        }),
        (S._evalUrl = function (t) {
            return S.ajax({ url: t, type: 'GET', dataType: 'script', cache: !0, async: !1, global: !1, throws: !0 });
        }),
        S.fn.extend({
            wrapAll: function (t) {
                var e;
                return (
                    this[0] &&
                        (y(t) && (t = t.call(this[0])),
                        (e = S(t, this[0].ownerDocument).eq(0).clone(!0)),
                        this[0].parentNode && e.insertBefore(this[0]),
                        e
                            .map(function () {
                                for (var t = this; t.firstElementChild; ) t = t.firstElementChild;
                                return t;
                            })
                            .append(this)),
                    this
                );
            },
            wrapInner: function (i) {
                return y(i)
                    ? this.each(function (t) {
                          S(this).wrapInner(i.call(this, t));
                      })
                    : this.each(function () {
                          var t = S(this),
                              e = t.contents();
                          e.length ? e.wrapAll(i) : t.append(i);
                      });
            },
            wrap: function (e) {
                var i = y(e);
                return this.each(function (t) {
                    S(this).wrapAll(i ? e.call(this, t) : e);
                });
            },
            unwrap: function (t) {
                return (
                    this.parent(t)
                        .not('body')
                        .each(function () {
                            S(this).replaceWith(this.childNodes);
                        }),
                    this
                );
            },
        }),
        (S.expr.pseudos.hidden = function (t) {
            return !S.expr.pseudos.visible(t);
        }),
        (S.expr.pseudos.visible = function (t) {
            return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
        }),
        (S.ajaxSettings.xhr = function () {
            try {
                return new k.XMLHttpRequest();
            } catch (t) {}
        });
    var He = { 0: 200, 1223: 204 },
        ze = S.ajaxSettings.xhr();
    (v.cors = !!ze && 'withCredentials' in ze),
        (v.ajax = ze = !!ze),
        S.ajaxTransport(function (r) {
            var o, s;
            if (v.cors || (ze && !r.crossDomain))
                return {
                    send: function (t, e) {
                        var i,
                            n = r.xhr();
                        if ((n.open(r.type, r.url, r.async, r.username, r.password), r.xhrFields))
                            for (i in r.xhrFields) n[i] = r.xhrFields[i];
                        for (i in (r.mimeType && n.overrideMimeType && n.overrideMimeType(r.mimeType),
                        r.crossDomain || t['X-Requested-With'] || (t['X-Requested-With'] = 'XMLHttpRequest'),
                        t))
                            n.setRequestHeader(i, t[i]);
                        (o = function (t) {
                            return function () {
                                o &&
                                    ((o = s = n.onload = n.onerror = n.onabort = n.ontimeout = n.onreadystatechange = null),
                                    'abort' === t
                                        ? n.abort()
                                        : 'error' === t
                                        ? 'number' != typeof n.status
                                            ? e(0, 'error')
                                            : e(n.status, n.statusText)
                                        : e(
                                              He[n.status] || n.status,
                                              n.statusText,
                                              'text' !== (n.responseType || 'text') || 'string' != typeof n.responseText
                                                  ? { binary: n.response }
                                                  : { text: n.responseText },
                                              n.getAllResponseHeaders()
                                          ));
                            };
                        }),
                            (n.onload = o()),
                            (s = n.onerror = n.ontimeout = o('error')),
                            void 0 !== n.onabort
                                ? (n.onabort = s)
                                : (n.onreadystatechange = function () {
                                      4 === n.readyState &&
                                          k.setTimeout(function () {
                                              o && s();
                                          });
                                  }),
                            (o = o('abort'));
                        try {
                            n.send((r.hasContent && r.data) || null);
                        } catch (t) {
                            if (o) throw t;
                        }
                    },
                    abort: function () {
                        o && o();
                    },
                };
        }),
        S.ajaxPrefilter(function (t) {
            t.crossDomain && (t.contents.script = !1);
        }),
        S.ajaxSetup({
            accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' },
            contents: { script: /\b(?:java|ecma)script\b/ },
            converters: {
                'text script': function (t) {
                    return S.globalEval(t), t;
                },
            },
        }),
        S.ajaxPrefilter('script', function (t) {
            void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = 'GET');
        }),
        S.ajaxTransport('script', function (i) {
            var n, r;
            if (i.crossDomain)
                return {
                    send: function (t, e) {
                        (n = S('<script>')
                            .prop({ charset: i.scriptCharset, src: i.url })
                            .on(
                                'load error',
                                (r = function (t) {
                                    n.remove(), (r = null), t && e('error' === t.type ? 404 : 200, t.type);
                                })
                            )),
                            C.head.appendChild(n[0]);
                    },
                    abort: function () {
                        r && r();
                    },
                };
        });
    var Ue,
        We = [],
        Ye = /(=)\?(?=&|$)|\?\?/;
    S.ajaxSetup({
        jsonp: 'callback',
        jsonpCallback: function () {
            var t = We.pop() || S.expando + '_' + xe++;
            return (this[t] = !0), t;
        },
    }),
        S.ajaxPrefilter('json jsonp', function (t, e, i) {
            var n,
                r,
                o,
                s =
                    !1 !== t.jsonp &&
                    (Ye.test(t.url)
                        ? 'url'
                        : 'string' == typeof t.data &&
                          0 === (t.contentType || '').indexOf('application/x-www-form-urlencoded') &&
                          Ye.test(t.data) &&
                          'data');
            if (s || 'jsonp' === t.dataTypes[0])
                return (
                    (n = t.jsonpCallback = y(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
                    s ? (t[s] = t[s].replace(Ye, '$1' + n)) : !1 !== t.jsonp && (t.url += (we.test(t.url) ? '&' : '?') + t.jsonp + '=' + n),
                    (t.converters['script json'] = function () {
                        return o || S.error(n + ' was not called'), o[0];
                    }),
                    (t.dataTypes[0] = 'json'),
                    (r = k[n]),
                    (k[n] = function () {
                        o = arguments;
                    }),
                    i.always(function () {
                        void 0 === r ? S(k).removeProp(n) : (k[n] = r),
                            t[n] && ((t.jsonpCallback = e.jsonpCallback), We.push(n)),
                            o && y(r) && r(o[0]),
                            (o = r = void 0);
                    }),
                    'script'
                );
        }),
        (v.createHTMLDocument =
            (((Ue = C.implementation.createHTMLDocument('').body).innerHTML = '<form></form><form></form>'), 2 === Ue.childNodes.length)),
        (S.parseHTML = function (t, e, i) {
            return 'string' != typeof t
                ? []
                : ('boolean' == typeof e && ((i = e), (e = !1)),
                  e ||
                      (v.createHTMLDocument
                          ? (((n = (e = C.implementation.createHTMLDocument('')).createElement('base')).href = C.location.href),
                            e.head.appendChild(n))
                          : (e = C)),
                  (o = !i && []),
                  (r = A.exec(t))
                      ? [e.createElement(r[1])]
                      : ((r = yt([t], e, o)), o && o.length && S(o).remove(), S.merge([], r.childNodes)));
            var n, r, o;
        }),
        (S.fn.load = function (t, e, i) {
            var n,
                r,
                o,
                s = this,
                a = t.indexOf(' ');
            return (
                -1 < a && ((n = fe(t.slice(a))), (t = t.slice(0, a))),
                y(e) ? ((i = e), (e = void 0)) : e && 'object' == typeof e && (r = 'POST'),
                0 < s.length &&
                    S.ajax({ url: t, type: r || 'GET', dataType: 'html', data: e })
                        .done(function (t) {
                            (o = arguments), s.html(n ? S('<div>').append(S.parseHTML(t)).find(n) : t);
                        })
                        .always(
                            i &&
                                function (t, e) {
                                    s.each(function () {
                                        i.apply(this, o || [t.responseText, e, t]);
                                    });
                                }
                        ),
                this
            );
        }),
        S.each(['ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend'], function (t, e) {
            S.fn[e] = function (t) {
                return this.on(e, t);
            };
        }),
        (S.expr.pseudos.animated = function (e) {
            return S.grep(S.timers, function (t) {
                return e === t.elem;
            }).length;
        }),
        (S.offset = {
            setOffset: function (t, e, i) {
                var n,
                    r,
                    o,
                    s,
                    a,
                    l,
                    c = S.css(t, 'position'),
                    h = S(t),
                    d = {};
                'static' === c && (t.style.position = 'relative'),
                    (a = h.offset()),
                    (o = S.css(t, 'top')),
                    (l = S.css(t, 'left')),
                    ('absolute' === c || 'fixed' === c) && -1 < (o + l).indexOf('auto')
                        ? ((s = (n = h.position()).top), (r = n.left))
                        : ((s = parseFloat(o) || 0), (r = parseFloat(l) || 0)),
                    y(e) && (e = e.call(t, i, S.extend({}, a))),
                    null != e.top && (d.top = e.top - a.top + s),
                    null != e.left && (d.left = e.left - a.left + r),
                    'using' in e ? e.using.call(t, d) : h.css(d);
            },
        }),
        S.fn.extend({
            offset: function (e) {
                if (arguments.length)
                    return void 0 === e
                        ? this
                        : this.each(function (t) {
                              S.offset.setOffset(this, e, t);
                          });
                var t,
                    i,
                    n = this[0];
                return n
                    ? n.getClientRects().length
                        ? ((t = n.getBoundingClientRect()),
                          (i = n.ownerDocument.defaultView),
                          { top: t.top + i.pageYOffset, left: t.left + i.pageXOffset })
                        : { top: 0, left: 0 }
                    : void 0;
            },
            position: function () {
                if (this[0]) {
                    var t,
                        e,
                        i,
                        n = this[0],
                        r = { top: 0, left: 0 };
                    if ('fixed' === S.css(n, 'position')) e = n.getBoundingClientRect();
                    else {
                        for (
                            e = this.offset(), i = n.ownerDocument, t = n.offsetParent || i.documentElement;
                            t && (t === i.body || t === i.documentElement) && 'static' === S.css(t, 'position');

                        )
                            t = t.parentNode;
                        t &&
                            t !== n &&
                            1 === t.nodeType &&
                            (((r = S(t).offset()).top += S.css(t, 'borderTopWidth', !0)), (r.left += S.css(t, 'borderLeftWidth', !0)));
                    }
                    return { top: e.top - r.top - S.css(n, 'marginTop', !0), left: e.left - r.left - S.css(n, 'marginLeft', !0) };
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    for (var t = this.offsetParent; t && 'static' === S.css(t, 'position'); ) t = t.offsetParent;
                    return t || bt;
                });
            },
        }),
        S.each({ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' }, function (e, r) {
            var o = 'pageYOffset' === r;
            S.fn[e] = function (t) {
                return U(
                    this,
                    function (t, e, i) {
                        var n;
                        if ((b(t) ? (n = t) : 9 === t.nodeType && (n = t.defaultView), void 0 === i)) return n ? n[r] : t[e];
                        n ? n.scrollTo(o ? n.pageXOffset : i, o ? i : n.pageYOffset) : (t[e] = i);
                    },
                    e,
                    t,
                    arguments.length
                );
            };
        }),
        S.each(['top', 'left'], function (t, i) {
            S.cssHooks[i] = Ht(v.pixelPosition, function (t, e) {
                if (e) return (e = Bt(t, i)), Lt.test(e) ? S(t).position()[i] + 'px' : e;
            });
        }),
        S.each({ Height: 'height', Width: 'width' }, function (s, a) {
            S.each({ padding: 'inner' + s, content: a, '': 'outer' + s }, function (n, o) {
                S.fn[o] = function (t, e) {
                    var i = arguments.length && (n || 'boolean' != typeof t),
                        r = n || (!0 === t || !0 === e ? 'margin' : 'border');
                    return U(
                        this,
                        function (t, e, i) {
                            var n;
                            return b(t)
                                ? 0 === o.indexOf('outer')
                                    ? t['inner' + s]
                                    : t.document.documentElement['client' + s]
                                : 9 === t.nodeType
                                ? ((n = t.documentElement),
                                  Math.max(t.body['scroll' + s], n['scroll' + s], t.body['offset' + s], n['offset' + s], n['client' + s]))
                                : void 0 === i
                                ? S.css(t, e, r)
                                : S.style(t, e, i, r);
                        },
                        a,
                        i ? t : void 0,
                        i
                    );
                };
            });
        }),
        S.each(
            'blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(
                ' '
            ),
            function (t, i) {
                S.fn[i] = function (t, e) {
                    return 0 < arguments.length ? this.on(i, null, t, e) : this.trigger(i);
                };
            }
        ),
        S.fn.extend({
            hover: function (t, e) {
                return this.mouseenter(t).mouseleave(e || t);
            },
        }),
        S.fn.extend({
            bind: function (t, e, i) {
                return this.on(t, null, e, i);
            },
            unbind: function (t, e) {
                return this.off(t, null, e);
            },
            delegate: function (t, e, i, n) {
                return this.on(e, t, i, n);
            },
            undelegate: function (t, e, i) {
                return 1 === arguments.length ? this.off(t, '**') : this.off(e, t || '**', i);
            },
        }),
        (S.proxy = function (t, e) {
            var i, n, r;
            if (('string' == typeof e && ((i = t[e]), (e = t), (t = i)), y(t)))
                return (
                    (n = a.call(arguments, 2)),
                    ((r = function () {
                        return t.apply(e || this, n.concat(a.call(arguments)));
                    }).guid = t.guid = t.guid || S.guid++),
                    r
                );
        }),
        (S.holdReady = function (t) {
            t ? S.readyWait++ : S.ready(!0);
        }),
        (S.isArray = Array.isArray),
        (S.parseJSON = JSON.parse),
        (S.nodeName = M),
        (S.isFunction = y),
        (S.isWindow = b),
        (S.camelCase = q),
        (S.type = x),
        (S.now = Date.now),
        (S.isNumeric = function (t) {
            var e = S.type(t);
            return ('number' === e || 'string' === e) && !isNaN(t - parseFloat(t));
        }),
        'function' == typeof define &&
            define.amd &&
            define('jquery', [], function () {
                return S;
            });
    var Ve = k.jQuery,
        qe = k.$;
    return (
        (S.noConflict = function (t) {
            return k.$ === S && (k.$ = qe), t && k.jQuery === S && (k.jQuery = Ve), S;
        }),
        t || (k.jQuery = k.$ = S),
        S
    );
}),
    (function (t, e) {
        'object' == typeof exports && 'undefined' != typeof module
            ? (module.exports = e())
            : 'function' == typeof define && define.amd
            ? define(e)
            : (t.Popper = e());
    })(this, function () {
        'use strict';
        for (
            var t = 'undefined' != typeof window && 'undefined' != typeof document, e = ['Edge', 'Trident', 'Firefox'], i = 0, n = 0;
            n < e.length;
            n += 1
        )
            if (t && 0 <= navigator.userAgent.indexOf(e[n])) {
                i = 1;
                break;
            }
        var s =
            t && window.Promise
                ? function (t) {
                      var e = !1;
                      return function () {
                          e ||
                              ((e = !0),
                              window.Promise.resolve().then(function () {
                                  (e = !1), t();
                              }));
                      };
                  }
                : function (t) {
                      var e = !1;
                      return function () {
                          e ||
                              ((e = !0),
                              setTimeout(function () {
                                  (e = !1), t();
                              }, i));
                      };
                  };
        function a(t) {
            return t && '[object Function]' === {}.toString.call(t);
        }
        function _(t, e) {
            if (1 !== t.nodeType) return [];
            var i = getComputedStyle(t, null);
            return e ? i[e] : i;
        }
        function u(t) {
            return 'HTML' === t.nodeName ? t : t.parentNode || t.host;
        }
        function f(t) {
            if (!t) return document.body;
            switch (t.nodeName) {
                case 'HTML':
                case 'BODY':
                    return t.ownerDocument.body;
                case '#document':
                    return t.body;
            }
            var e = _(t),
                i = e.overflow,
                n = e.overflowX,
                r = e.overflowY;
            return /(auto|scroll|overlay)/.test(i + r + n) ? t : f(u(t));
        }
        var r = t && !(!window.MSInputMethodContext || !document.documentMode),
            o = t && /MSIE 10/.test(navigator.userAgent);
        function m(t) {
            return 11 === t ? r : 10 === t ? o : r || o;
        }
        function y(t) {
            if (!t) return document.documentElement;
            for (var e = m(10) ? document.body : null, i = t.offsetParent; i === e && t.nextElementSibling; )
                i = (t = t.nextElementSibling).offsetParent;
            var n = i && i.nodeName;
            return n && 'BODY' !== n && 'HTML' !== n
                ? -1 !== ['TD', 'TABLE'].indexOf(i.nodeName) && 'static' === _(i, 'position')
                    ? y(i)
                    : i
                : t
                ? t.ownerDocument.documentElement
                : document.documentElement;
        }
        function h(t) {
            return null !== t.parentNode ? h(t.parentNode) : t;
        }
        function p(t, e) {
            if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
            var i = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
                n = i ? t : e,
                r = i ? e : t,
                o = document.createRange();
            o.setStart(n, 0), o.setEnd(r, 0);
            var s,
                a,
                l = o.commonAncestorContainer;
            if ((t !== l && e !== l) || n.contains(r))
                return 'BODY' === (a = (s = l).nodeName) || ('HTML' !== a && y(s.firstElementChild) !== s) ? y(l) : l;
            var c = h(t);
            return c.host ? p(c.host, e) : p(t, h(e).host);
        }
        function g(t) {
            var e = 'top' === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top') ? 'scrollTop' : 'scrollLeft',
                i = t.nodeName;
            if ('BODY' === i || 'HTML' === i) {
                var n = t.ownerDocument.documentElement;
                return (t.ownerDocument.scrollingElement || n)[e];
            }
            return t[e];
        }
        function d(t, e) {
            var i = 'x' === e ? 'Left' : 'Top',
                n = 'Left' === i ? 'Right' : 'Bottom';
            return parseFloat(t['border' + i + 'Width'], 10) + parseFloat(t['border' + n + 'Width'], 10);
        }
        function l(t, e, i, n) {
            return Math.max(
                e['offset' + t],
                e['scroll' + t],
                i['client' + t],
                i['offset' + t],
                i['scroll' + t],
                m(10)
                    ? i['offset' + t] +
                          n['margin' + ('Height' === t ? 'Top' : 'Left')] +
                          n['margin' + ('Height' === t ? 'Bottom' : 'Right')]
                    : 0
            );
        }
        function v() {
            var t = document.body,
                e = document.documentElement,
                i = m(10) && getComputedStyle(e);
            return { height: l('Height', t, e, i), width: l('Width', t, e, i) };
        }
        var c = function (t, e) {
                if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
            },
            b = (function () {
                function n(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        (n.enumerable = n.enumerable || !1),
                            (n.configurable = !0),
                            'value' in n && (n.writable = !0),
                            Object.defineProperty(t, n.key, n);
                    }
                }
                return function (t, e, i) {
                    return e && n(t.prototype, e), i && n(t, i), t;
                };
            })(),
            x = function (t, e, i) {
                return e in t ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : (t[e] = i), t;
            },
            w =
                Object.assign ||
                function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var i = arguments[e];
                        for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
                    }
                    return t;
                };
        function k(t) {
            return w({}, t, { right: t.left + t.width, bottom: t.top + t.height });
        }
        function C(t) {
            var e = {};
            try {
                if (m(10)) {
                    e = t.getBoundingClientRect();
                    var i = g(t, 'top'),
                        n = g(t, 'left');
                    (e.top += i), (e.left += n), (e.bottom += i), (e.right += n);
                } else e = t.getBoundingClientRect();
            } catch (t) {}
            var r = { left: e.left, top: e.top, width: e.right - e.left, height: e.bottom - e.top },
                o = 'HTML' === t.nodeName ? v() : {},
                s = o.width || t.clientWidth || r.right - r.left,
                a = o.height || t.clientHeight || r.bottom - r.top,
                l = t.offsetWidth - s,
                c = t.offsetHeight - a;
            if (l || c) {
                var h = _(t);
                (l -= d(h, 'x')), (c -= d(h, 'y')), (r.width -= l), (r.height -= c);
            }
            return k(r);
        }
        function S(t, e) {
            var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
                n = m(10),
                r = 'HTML' === e.nodeName,
                o = C(t),
                s = C(e),
                a = f(t),
                l = _(e),
                c = parseFloat(l.borderTopWidth, 10),
                h = parseFloat(l.borderLeftWidth, 10);
            i && 'HTML' === e.nodeName && ((s.top = Math.max(s.top, 0)), (s.left = Math.max(s.left, 0)));
            var d = k({ top: o.top - s.top - c, left: o.left - s.left - h, width: o.width, height: o.height });
            if (((d.marginTop = 0), (d.marginLeft = 0), !n && r)) {
                var u = parseFloat(l.marginTop, 10),
                    p = parseFloat(l.marginLeft, 10);
                (d.top -= c - u), (d.bottom -= c - u), (d.left -= h - p), (d.right -= h - p), (d.marginTop = u), (d.marginLeft = p);
            }
            return (
                (n && !i ? e.contains(a) : e === a && 'BODY' !== a.nodeName) &&
                    (d = (function (t, e) {
                        var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
                            n = g(e, 'top'),
                            r = g(e, 'left'),
                            o = i ? -1 : 1;
                        return (t.top += n * o), (t.bottom += n * o), (t.left += r * o), (t.right += r * o), t;
                    })(d, e)),
                d
            );
        }
        function D(t) {
            if (!t || !t.parentElement || m()) return document.documentElement;
            for (var e = t.parentElement; e && 'none' === _(e, 'transform'); ) e = e.parentElement;
            return e || document.documentElement;
        }
        function T(t, e, i, n) {
            var r = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
                o = { top: 0, left: 0 },
                s = r ? D(t) : p(t, e);
            if ('viewport' === n)
                o = (function (t) {
                    var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
                        i = t.ownerDocument.documentElement,
                        n = S(t, i),
                        r = Math.max(i.clientWidth, window.innerWidth || 0),
                        o = Math.max(i.clientHeight, window.innerHeight || 0),
                        s = e ? 0 : g(i),
                        a = e ? 0 : g(i, 'left');
                    return k({ top: s - n.top + n.marginTop, left: a - n.left + n.marginLeft, width: r, height: o });
                })(s, r);
            else {
                var a = void 0;
                'scrollParent' === n
                    ? 'BODY' === (a = f(u(e))).nodeName && (a = t.ownerDocument.documentElement)
                    : (a = 'window' === n ? t.ownerDocument.documentElement : n);
                var l = S(a, s, r);
                if (
                    'HTML' !== a.nodeName ||
                    (function t(e) {
                        var i = e.nodeName;
                        return 'BODY' !== i && 'HTML' !== i && ('fixed' === _(e, 'position') || t(u(e)));
                    })(s)
                )
                    o = l;
                else {
                    var c = v(),
                        h = c.height,
                        d = c.width;
                    (o.top += l.top - l.marginTop), (o.bottom = h + l.top), (o.left += l.left - l.marginLeft), (o.right = d + l.left);
                }
            }
            return (o.left += i), (o.top += i), (o.right -= i), (o.bottom -= i), o;
        }
        function M(t, e, n, i, r) {
            var o = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
            if (-1 === t.indexOf('auto')) return t;
            var s = T(n, i, o, r),
                a = {
                    top: { width: s.width, height: e.top - s.top },
                    right: { width: s.right - e.right, height: s.height },
                    bottom: { width: s.width, height: s.bottom - e.bottom },
                    left: { width: e.left - s.left, height: s.height },
                },
                l = Object.keys(a)
                    .map(function (t) {
                        return w({ key: t }, a[t], { area: ((e = a[t]), e.width * e.height) });
                        var e;
                    })
                    .sort(function (t, e) {
                        return e.area - t.area;
                    }),
                c = l.filter(function (t) {
                    var e = t.width,
                        i = t.height;
                    return e >= n.clientWidth && i >= n.clientHeight;
                }),
                h = 0 < c.length ? c[0].key : l[0].key,
                d = t.split('-')[1];
            return h + (d ? '-' + d : '');
        }
        function A(t, e, i) {
            var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
            return S(i, n ? D(e) : p(e, i), n);
        }
        function E(t) {
            var e = getComputedStyle(t),
                i = parseFloat(e.marginTop) + parseFloat(e.marginBottom),
                n = parseFloat(e.marginLeft) + parseFloat(e.marginRight);
            return { width: t.offsetWidth + n, height: t.offsetHeight + i };
        }
        function P(t) {
            var e = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
            return t.replace(/left|right|bottom|top/g, function (t) {
                return e[t];
            });
        }
        function I(t, e, i) {
            i = i.split('-')[0];
            var n = E(t),
                r = { width: n.width, height: n.height },
                o = -1 !== ['right', 'left'].indexOf(i),
                s = o ? 'top' : 'left',
                a = o ? 'left' : 'top',
                l = o ? 'height' : 'width',
                c = o ? 'width' : 'height';
            return (r[s] = e[s] + e[l] / 2 - n[l] / 2), (r[a] = i === a ? e[a] - n[c] : e[P(a)]), r;
        }
        function O(t, e) {
            return Array.prototype.find ? t.find(e) : t.filter(e)[0];
        }
        function N(t, i, e) {
            return (
                (void 0 === e
                    ? t
                    : t.slice(
                          0,
                          (function (t, e, i) {
                              if (Array.prototype.findIndex)
                                  return t.findIndex(function (t) {
                                      return t[e] === i;
                                  });
                              var n = O(t, function (t) {
                                  return t[e] === i;
                              });
                              return t.indexOf(n);
                          })(t, 'name', e)
                      )
                ).forEach(function (t) {
                    t.function && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
                    var e = t.function || t.fn;
                    t.enabled &&
                        a(e) &&
                        ((i.offsets.popper = k(i.offsets.popper)), (i.offsets.reference = k(i.offsets.reference)), (i = e(i, t)));
                }),
                i
            );
        }
        function j(t, i) {
            return t.some(function (t) {
                var e = t.name;
                return t.enabled && e === i;
            });
        }
        function F(t) {
            for (var e = [!1, 'ms', 'Webkit', 'Moz', 'O'], i = t.charAt(0).toUpperCase() + t.slice(1), n = 0; n < e.length; n++) {
                var r = e[n],
                    o = r ? '' + r + i : t;
                if (void 0 !== document.body.style[o]) return o;
            }
            return null;
        }
        function L(t) {
            var e = t.ownerDocument;
            return e ? e.defaultView : window;
        }
        function $(t, e, i, n) {
            (i.updateBound = n), L(t).addEventListener('resize', i.updateBound, { passive: !0 });
            var r = f(t);
            return (
                (function t(e, i, n, r) {
                    var o = 'BODY' === e.nodeName,
                        s = o ? e.ownerDocument.defaultView : e;
                    s.addEventListener(i, n, { passive: !0 }), o || t(f(s.parentNode), i, n, r), r.push(s);
                })(r, 'scroll', i.updateBound, i.scrollParents),
                (i.scrollElement = r),
                (i.eventsEnabled = !0),
                i
            );
        }
        function R() {
            var t, e;
            this.state.eventsEnabled &&
                (cancelAnimationFrame(this.scheduleUpdate),
                (this.state =
                    ((t = this.reference),
                    (e = this.state),
                    L(t).removeEventListener('resize', e.updateBound),
                    e.scrollParents.forEach(function (t) {
                        t.removeEventListener('scroll', e.updateBound);
                    }),
                    (e.updateBound = null),
                    (e.scrollParents = []),
                    (e.scrollElement = null),
                    (e.eventsEnabled = !1),
                    e)));
        }
        function B(t) {
            return '' !== t && !isNaN(parseFloat(t)) && isFinite(t);
        }
        function H(i, n) {
            Object.keys(n).forEach(function (t) {
                var e = '';
                -1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(t) && B(n[t]) && (e = 'px'), (i.style[t] = n[t] + e);
            });
        }
        function z(t, e, i) {
            var n = O(t, function (t) {
                    return t.name === e;
                }),
                r =
                    !!n &&
                    t.some(function (t) {
                        return t.name === i && t.enabled && t.order < n.order;
                    });
            if (!r) {
                var o = '`' + e + '`',
                    s = '`' + i + '`';
                console.warn(s + ' modifier is required by ' + o + ' modifier in order to work, be sure to include it before ' + o + '!');
            }
            return r;
        }
        var U = [
                'auto-start',
                'auto',
                'auto-end',
                'top-start',
                'top',
                'top-end',
                'right-start',
                'right',
                'right-end',
                'bottom-end',
                'bottom',
                'bottom-start',
                'left-end',
                'left',
                'left-start',
            ],
            W = U.slice(3);
        function Y(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
                i = W.indexOf(t),
                n = W.slice(i + 1).concat(W.slice(0, i));
            return e ? n.reverse() : n;
        }
        var V = { FLIP: 'flip', CLOCKWISE: 'clockwise', COUNTERCLOCKWISE: 'counterclockwise' };
        function q(t, r, o, e) {
            var s = [0, 0],
                a = -1 !== ['right', 'left'].indexOf(e),
                i = t.split(/(\+|\-)/).map(function (t) {
                    return t.trim();
                }),
                n = i.indexOf(
                    O(i, function (t) {
                        return -1 !== t.search(/,|\s/);
                    })
                );
            i[n] &&
                -1 === i[n].indexOf(',') &&
                console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
            var l = /\s*,\s*|\s+/,
                c = -1 !== n ? [i.slice(0, n).concat([i[n].split(l)[0]]), [i[n].split(l)[1]].concat(i.slice(n + 1))] : [i];
            return (
                (c = c.map(function (t, e) {
                    var i = (1 === e ? !a : a) ? 'height' : 'width',
                        n = !1;
                    return t
                        .reduce(function (t, e) {
                            return '' === t[t.length - 1] && -1 !== ['+', '-'].indexOf(e)
                                ? ((t[t.length - 1] = e), (n = !0), t)
                                : n
                                ? ((t[t.length - 1] += e), (n = !1), t)
                                : t.concat(e);
                        }, [])
                        .map(function (t) {
                            return (function (t, e, i, n) {
                                var r = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                                    o = +r[1],
                                    s = r[2];
                                if (!o) return t;
                                if (0 === s.indexOf('%')) {
                                    var a = void 0;
                                    switch (s) {
                                        case '%p':
                                            a = i;
                                            break;
                                        case '%':
                                        case '%r':
                                        default:
                                            a = n;
                                    }
                                    return (k(a)[e] / 100) * o;
                                }
                                if ('vh' === s || 'vw' === s)
                                    return (
                                        (('vh' === s
                                            ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
                                            : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) /
                                            100) *
                                        o
                                    );
                                return o;
                            })(t, i, r, o);
                        });
                })).forEach(function (i, n) {
                    i.forEach(function (t, e) {
                        B(t) && (s[n] += t * ('-' === i[e - 1] ? -1 : 1));
                    });
                }),
                s
            );
        }
        var G = {
                placement: 'bottom',
                positionFixed: !1,
                eventsEnabled: !0,
                removeOnDestroy: !1,
                onCreate: function () {},
                onUpdate: function () {},
                modifiers: {
                    shift: {
                        order: 100,
                        enabled: !0,
                        fn: function (t) {
                            var e = t.placement,
                                i = e.split('-')[0],
                                n = e.split('-')[1];
                            if (n) {
                                var r = t.offsets,
                                    o = r.reference,
                                    s = r.popper,
                                    a = -1 !== ['bottom', 'top'].indexOf(i),
                                    l = a ? 'left' : 'top',
                                    c = a ? 'width' : 'height',
                                    h = { start: x({}, l, o[l]), end: x({}, l, o[l] + o[c] - s[c]) };
                                t.offsets.popper = w({}, s, h[n]);
                            }
                            return t;
                        },
                    },
                    offset: {
                        order: 200,
                        enabled: !0,
                        fn: function (t, e) {
                            var i = e.offset,
                                n = t.placement,
                                r = t.offsets,
                                o = r.popper,
                                s = r.reference,
                                a = n.split('-')[0],
                                l = void 0;
                            return (
                                (l = B(+i) ? [+i, 0] : q(i, o, s, a)),
                                'left' === a
                                    ? ((o.top += l[0]), (o.left -= l[1]))
                                    : 'right' === a
                                    ? ((o.top += l[0]), (o.left += l[1]))
                                    : 'top' === a
                                    ? ((o.left += l[0]), (o.top -= l[1]))
                                    : 'bottom' === a && ((o.left += l[0]), (o.top += l[1])),
                                (t.popper = o),
                                t
                            );
                        },
                        offset: 0,
                    },
                    preventOverflow: {
                        order: 300,
                        enabled: !0,
                        fn: function (t, n) {
                            var e = n.boundariesElement || y(t.instance.popper);
                            t.instance.reference === e && (e = y(e));
                            var i = F('transform'),
                                r = t.instance.popper.style,
                                o = r.top,
                                s = r.left,
                                a = r[i];
                            (r.top = ''), (r.left = ''), (r[i] = '');
                            var l = T(t.instance.popper, t.instance.reference, n.padding, e, t.positionFixed);
                            (r.top = o), (r.left = s), (r[i] = a), (n.boundaries = l);
                            var c = n.priority,
                                h = t.offsets.popper,
                                d = {
                                    primary: function (t) {
                                        var e = h[t];
                                        return h[t] < l[t] && !n.escapeWithReference && (e = Math.max(h[t], l[t])), x({}, t, e);
                                    },
                                    secondary: function (t) {
                                        var e = 'right' === t ? 'left' : 'top',
                                            i = h[e];
                                        return (
                                            h[t] > l[t] &&
                                                !n.escapeWithReference &&
                                                (i = Math.min(h[e], l[t] - ('right' === t ? h.width : h.height))),
                                            x({}, e, i)
                                        );
                                    },
                                };
                            return (
                                c.forEach(function (t) {
                                    var e = -1 !== ['left', 'top'].indexOf(t) ? 'primary' : 'secondary';
                                    h = w({}, h, d[e](t));
                                }),
                                (t.offsets.popper = h),
                                t
                            );
                        },
                        priority: ['left', 'right', 'top', 'bottom'],
                        padding: 5,
                        boundariesElement: 'scrollParent',
                    },
                    keepTogether: {
                        order: 400,
                        enabled: !0,
                        fn: function (t) {
                            var e = t.offsets,
                                i = e.popper,
                                n = e.reference,
                                r = t.placement.split('-')[0],
                                o = Math.floor,
                                s = -1 !== ['top', 'bottom'].indexOf(r),
                                a = s ? 'right' : 'bottom',
                                l = s ? 'left' : 'top',
                                c = s ? 'width' : 'height';
                            return (
                                i[a] < o(n[l]) && (t.offsets.popper[l] = o(n[l]) - i[c]),
                                i[l] > o(n[a]) && (t.offsets.popper[l] = o(n[a])),
                                t
                            );
                        },
                    },
                    arrow: {
                        order: 500,
                        enabled: !0,
                        fn: function (t, e) {
                            var i;
                            if (!z(t.instance.modifiers, 'arrow', 'keepTogether')) return t;
                            var n = e.element;
                            if ('string' == typeof n) {
                                if (!(n = t.instance.popper.querySelector(n))) return t;
                            } else if (!t.instance.popper.contains(n))
                                return console.warn('WARNING: `arrow.element` must be child of its popper element!'), t;
                            var r = t.placement.split('-')[0],
                                o = t.offsets,
                                s = o.popper,
                                a = o.reference,
                                l = -1 !== ['left', 'right'].indexOf(r),
                                c = l ? 'height' : 'width',
                                h = l ? 'Top' : 'Left',
                                d = h.toLowerCase(),
                                u = l ? 'left' : 'top',
                                p = l ? 'bottom' : 'right',
                                f = E(n)[c];
                            a[p] - f < s[d] && (t.offsets.popper[d] -= s[d] - (a[p] - f)),
                                a[d] + f > s[p] && (t.offsets.popper[d] += a[d] + f - s[p]),
                                (t.offsets.popper = k(t.offsets.popper));
                            var m = a[d] + a[c] / 2 - f / 2,
                                g = _(t.instance.popper),
                                v = parseFloat(g['margin' + h], 10),
                                y = parseFloat(g['border' + h + 'Width'], 10),
                                b = m - t.offsets.popper[d] - v - y;
                            return (
                                (b = Math.max(Math.min(s[c] - f, b), 0)),
                                (t.arrowElement = n),
                                (t.offsets.arrow = (x((i = {}), d, Math.round(b)), x(i, u, ''), i)),
                                t
                            );
                        },
                        element: '[x-arrow]',
                    },
                    flip: {
                        order: 600,
                        enabled: !0,
                        fn: function (f, m) {
                            if (j(f.instance.modifiers, 'inner')) return f;
                            if (f.flipped && f.placement === f.originalPlacement) return f;
                            var g = T(f.instance.popper, f.instance.reference, m.padding, m.boundariesElement, f.positionFixed),
                                v = f.placement.split('-')[0],
                                y = P(v),
                                b = f.placement.split('-')[1] || '',
                                _ = [];
                            switch (m.behavior) {
                                case V.FLIP:
                                    _ = [v, y];
                                    break;
                                case V.CLOCKWISE:
                                    _ = Y(v);
                                    break;
                                case V.COUNTERCLOCKWISE:
                                    _ = Y(v, !0);
                                    break;
                                default:
                                    _ = m.behavior;
                            }
                            return (
                                _.forEach(function (t, e) {
                                    if (v !== t || _.length === e + 1) return f;
                                    (v = f.placement.split('-')[0]), (y = P(v));
                                    var i,
                                        n = f.offsets.popper,
                                        r = f.offsets.reference,
                                        o = Math.floor,
                                        s =
                                            ('left' === v && o(n.right) > o(r.left)) ||
                                            ('right' === v && o(n.left) < o(r.right)) ||
                                            ('top' === v && o(n.bottom) > o(r.top)) ||
                                            ('bottom' === v && o(n.top) < o(r.bottom)),
                                        a = o(n.left) < o(g.left),
                                        l = o(n.right) > o(g.right),
                                        c = o(n.top) < o(g.top),
                                        h = o(n.bottom) > o(g.bottom),
                                        d = ('left' === v && a) || ('right' === v && l) || ('top' === v && c) || ('bottom' === v && h),
                                        u = -1 !== ['top', 'bottom'].indexOf(v),
                                        p =
                                            !!m.flipVariations &&
                                            ((u && 'start' === b && a) ||
                                                (u && 'end' === b && l) ||
                                                (!u && 'start' === b && c) ||
                                                (!u && 'end' === b && h));
                                    (s || d || p) &&
                                        ((f.flipped = !0),
                                        (s || d) && (v = _[e + 1]),
                                        p && (b = 'end' === (i = b) ? 'start' : 'start' === i ? 'end' : i),
                                        (f.placement = v + (b ? '-' + b : '')),
                                        (f.offsets.popper = w(
                                            {},
                                            f.offsets.popper,
                                            I(f.instance.popper, f.offsets.reference, f.placement)
                                        )),
                                        (f = N(f.instance.modifiers, f, 'flip')));
                                }),
                                f
                            );
                        },
                        behavior: 'flip',
                        padding: 5,
                        boundariesElement: 'viewport',
                    },
                    inner: {
                        order: 700,
                        enabled: !1,
                        fn: function (t) {
                            var e = t.placement,
                                i = e.split('-')[0],
                                n = t.offsets,
                                r = n.popper,
                                o = n.reference,
                                s = -1 !== ['left', 'right'].indexOf(i),
                                a = -1 === ['top', 'left'].indexOf(i);
                            return (
                                (r[s ? 'left' : 'top'] = o[i] - (a ? r[s ? 'width' : 'height'] : 0)),
                                (t.placement = P(e)),
                                (t.offsets.popper = k(r)),
                                t
                            );
                        },
                    },
                    hide: {
                        order: 800,
                        enabled: !0,
                        fn: function (t) {
                            if (!z(t.instance.modifiers, 'hide', 'preventOverflow')) return t;
                            var e = t.offsets.reference,
                                i = O(t.instance.modifiers, function (t) {
                                    return 'preventOverflow' === t.name;
                                }).boundaries;
                            if (e.bottom < i.top || e.left > i.right || e.top > i.bottom || e.right < i.left) {
                                if (!0 === t.hide) return t;
                                (t.hide = !0), (t.attributes['x-out-of-boundaries'] = '');
                            } else {
                                if (!1 === t.hide) return t;
                                (t.hide = !1), (t.attributes['x-out-of-boundaries'] = !1);
                            }
                            return t;
                        },
                    },
                    computeStyle: {
                        order: 850,
                        enabled: !0,
                        fn: function (t, e) {
                            var i = e.x,
                                n = e.y,
                                r = t.offsets.popper,
                                o = O(t.instance.modifiers, function (t) {
                                    return 'applyStyle' === t.name;
                                }).gpuAcceleration;
                            void 0 !== o &&
                                console.warn(
                                    'WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!'
                                );
                            var s = void 0 !== o ? o : e.gpuAcceleration,
                                a = C(y(t.instance.popper)),
                                l = { position: r.position },
                                c = {
                                    left: Math.floor(r.left),
                                    top: Math.round(r.top),
                                    bottom: Math.round(r.bottom),
                                    right: Math.floor(r.right),
                                },
                                h = 'bottom' === i ? 'top' : 'bottom',
                                d = 'right' === n ? 'left' : 'right',
                                u = F('transform'),
                                p = void 0,
                                f = void 0;
                            if (
                                ((f = 'bottom' === h ? -a.height + c.bottom : c.top),
                                (p = 'right' === d ? -a.width + c.right : c.left),
                                s && u)
                            )
                                (l[u] = 'translate3d(' + p + 'px, ' + f + 'px, 0)'), (l[h] = 0), (l[d] = 0), (l.willChange = 'transform');
                            else {
                                var m = 'bottom' === h ? -1 : 1,
                                    g = 'right' === d ? -1 : 1;
                                (l[h] = f * m), (l[d] = p * g), (l.willChange = h + ', ' + d);
                            }
                            var v = { 'x-placement': t.placement };
                            return (
                                (t.attributes = w({}, v, t.attributes)),
                                (t.styles = w({}, l, t.styles)),
                                (t.arrowStyles = w({}, t.offsets.arrow, t.arrowStyles)),
                                t
                            );
                        },
                        gpuAcceleration: !0,
                        x: 'bottom',
                        y: 'right',
                    },
                    applyStyle: {
                        order: 900,
                        enabled: !0,
                        fn: function (t) {
                            var e, i;
                            return (
                                H(t.instance.popper, t.styles),
                                (e = t.instance.popper),
                                (i = t.attributes),
                                Object.keys(i).forEach(function (t) {
                                    !1 !== i[t] ? e.setAttribute(t, i[t]) : e.removeAttribute(t);
                                }),
                                t.arrowElement && Object.keys(t.arrowStyles).length && H(t.arrowElement, t.arrowStyles),
                                t
                            );
                        },
                        onLoad: function (t, e, i, n, r) {
                            var o = A(r, e, t, i.positionFixed),
                                s = M(i.placement, o, e, t, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding);
                            return e.setAttribute('x-placement', s), H(e, { position: i.positionFixed ? 'fixed' : 'absolute' }), i;
                        },
                        gpuAcceleration: void 0,
                    },
                },
            },
            K = (function () {
                function o(t, e) {
                    var i = this,
                        n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                    c(this, o),
                        (this.scheduleUpdate = function () {
                            return requestAnimationFrame(i.update);
                        }),
                        (this.update = s(this.update.bind(this))),
                        (this.options = w({}, o.Defaults, n)),
                        (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
                        (this.reference = t && t.jquery ? t[0] : t),
                        (this.popper = e && e.jquery ? e[0] : e),
                        (this.options.modifiers = {}),
                        Object.keys(w({}, o.Defaults.modifiers, n.modifiers)).forEach(function (t) {
                            i.options.modifiers[t] = w({}, o.Defaults.modifiers[t] || {}, n.modifiers ? n.modifiers[t] : {});
                        }),
                        (this.modifiers = Object.keys(this.options.modifiers)
                            .map(function (t) {
                                return w({ name: t }, i.options.modifiers[t]);
                            })
                            .sort(function (t, e) {
                                return t.order - e.order;
                            })),
                        this.modifiers.forEach(function (t) {
                            t.enabled && a(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state);
                        }),
                        this.update();
                    var r = this.options.eventsEnabled;
                    r && this.enableEventListeners(), (this.state.eventsEnabled = r);
                }
                return (
                    b(o, [
                        {
                            key: 'update',
                            value: function () {
                                return function () {
                                    if (!this.state.isDestroyed) {
                                        var t = { instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {} };
                                        (t.offsets.reference = A(this.state, this.popper, this.reference, this.options.positionFixed)),
                                            (t.placement = M(
                                                this.options.placement,
                                                t.offsets.reference,
                                                this.popper,
                                                this.reference,
                                                this.options.modifiers.flip.boundariesElement,
                                                this.options.modifiers.flip.padding
                                            )),
                                            (t.originalPlacement = t.placement),
                                            (t.positionFixed = this.options.positionFixed),
                                            (t.offsets.popper = I(this.popper, t.offsets.reference, t.placement)),
                                            (t.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute'),
                                            (t = N(this.modifiers, t)),
                                            this.state.isCreated
                                                ? this.options.onUpdate(t)
                                                : ((this.state.isCreated = !0), this.options.onCreate(t));
                                    }
                                }.call(this);
                            },
                        },
                        {
                            key: 'destroy',
                            value: function () {
                                return function () {
                                    return (
                                        (this.state.isDestroyed = !0),
                                        j(this.modifiers, 'applyStyle') &&
                                            (this.popper.removeAttribute('x-placement'),
                                            (this.popper.style.position = ''),
                                            (this.popper.style.top = ''),
                                            (this.popper.style.left = ''),
                                            (this.popper.style.right = ''),
                                            (this.popper.style.bottom = ''),
                                            (this.popper.style.willChange = ''),
                                            (this.popper.style[F('transform')] = '')),
                                        this.disableEventListeners(),
                                        this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper),
                                        this
                                    );
                                }.call(this);
                            },
                        },
                        {
                            key: 'enableEventListeners',
                            value: function () {
                                return function () {
                                    this.state.eventsEnabled ||
                                        (this.state = $(this.reference, this.options, this.state, this.scheduleUpdate));
                                }.call(this);
                            },
                        },
                        {
                            key: 'disableEventListeners',
                            value: function () {
                                return R.call(this);
                            },
                        },
                    ]),
                    o
                );
            })();
        return (K.Utils = ('undefined' != typeof window ? window : global).PopperUtils), (K.placements = U), (K.Defaults = G), K;
    }),
    (function (t, e) {
        'object' == typeof exports && 'undefined' != typeof module
            ? e(exports, require('jquery'), require('popper.js'))
            : 'function' == typeof define && define.amd
            ? define(['exports', 'jquery', 'popper.js'], e)
            : e((t.bootstrap = {}), t.jQuery, t.Popper);
    })(this, function (t, e, h) {
        'use strict';
        function n(t, e) {
            for (var i = 0; i < e.length; i++) {
                var n = e[i];
                (n.enumerable = n.enumerable || !1),
                    (n.configurable = !0),
                    'value' in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n);
            }
        }
        function s(t, e, i) {
            return e && n(t.prototype, e), i && n(t, i), t;
        }
        function c(r) {
            for (var t = 1; t < arguments.length; t++) {
                var o = null != arguments[t] ? arguments[t] : {},
                    e = Object.keys(o);
                'function' == typeof Object.getOwnPropertySymbols &&
                    (e = e.concat(
                        Object.getOwnPropertySymbols(o).filter(function (t) {
                            return Object.getOwnPropertyDescriptor(o, t).enumerable;
                        })
                    )),
                    e.forEach(function (t) {
                        var e, i, n;
                        (e = r),
                            (n = o[(i = t)]),
                            i in e ? Object.defineProperty(e, i, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[i] = n);
                    });
            }
            return r;
        }
        (e = e && e.hasOwnProperty('default') ? e.default : e), (h = h && h.hasOwnProperty('default') ? h.default : h);
        var r,
            i,
            o,
            a,
            l,
            d,
            u,
            p,
            f,
            m,
            g,
            v,
            y,
            b,
            _,
            x,
            w,
            k,
            C,
            S,
            D,
            T,
            M,
            A,
            E,
            P,
            I,
            O,
            N,
            j,
            F,
            L,
            $,
            R,
            B,
            H,
            z,
            U,
            W,
            Y,
            V,
            q,
            G,
            K,
            X,
            Z,
            Q,
            J,
            tt,
            et,
            it,
            nt,
            rt,
            ot,
            st,
            at,
            lt,
            ct,
            ht,
            dt,
            ut,
            pt,
            ft,
            mt,
            gt,
            vt,
            yt,
            bt,
            _t,
            xt,
            wt,
            kt,
            Ct,
            St,
            Dt,
            Tt,
            Mt,
            At,
            Et,
            Pt,
            It,
            Ot,
            Nt,
            jt,
            Ft,
            Lt,
            $t,
            Rt,
            Bt,
            Ht,
            zt,
            Ut,
            Wt,
            Yt,
            Vt,
            qt,
            Gt,
            Kt,
            Xt,
            Zt,
            Qt,
            Jt,
            te,
            ee,
            ie,
            ne,
            re,
            oe,
            se,
            ae,
            le,
            ce,
            he,
            de,
            ue,
            pe,
            fe,
            me,
            ge,
            ve,
            ye,
            be,
            _e,
            xe,
            we,
            ke,
            Ce =
                ((we = 'transitionend'),
                (ke = {
                    TRANSITION_END: 'bsTransitionEnd',
                    getUID: function (t) {
                        for (; (t += ~~(1e6 * Math.random())), document.getElementById(t); );
                        return t;
                    },
                    getSelectorFromElement: function (t) {
                        var e = t.getAttribute('data-target');
                        (e && '#' !== e) || (e = t.getAttribute('href') || '');
                        try {
                            return 0 < xe(document).find(e).length ? e : null;
                        } catch (t) {
                            return null;
                        }
                    },
                    getTransitionDurationFromElement: function (t) {
                        if (!t) return 0;
                        var e = xe(t).css('transition-duration');
                        return parseFloat(e) ? ((e = e.split(',')[0]), 1e3 * parseFloat(e)) : 0;
                    },
                    reflow: function (t) {
                        return t.offsetHeight;
                    },
                    triggerTransitionEnd: function (t) {
                        xe(t).trigger(we);
                    },
                    supportsTransitionEnd: function () {
                        return Boolean(we);
                    },
                    isElement: function (t) {
                        return (t[0] || t).nodeType;
                    },
                    typeCheckConfig: function (t, e, i) {
                        for (var n in i)
                            if (Object.prototype.hasOwnProperty.call(i, n)) {
                                var r = i[n],
                                    o = e[n],
                                    s =
                                        o && ke.isElement(o)
                                            ? 'element'
                                            : ((a = o),
                                              {}.toString
                                                  .call(a)
                                                  .match(/\s([a-z]+)/i)[1]
                                                  .toLowerCase());
                                if (!new RegExp(r).test(s))
                                    throw new Error(
                                        t.toUpperCase() + ': Option "' + n + '" provided type "' + s + '" but expected type "' + r + '".'
                                    );
                            }
                        var a;
                    },
                }),
                ((xe = e).fn.emulateTransitionEnd = function (t) {
                    var e = this,
                        i = !1;
                    return (
                        xe(this).one(ke.TRANSITION_END, function () {
                            i = !0;
                        }),
                        setTimeout(function () {
                            i || ke.triggerTransitionEnd(e);
                        }, t),
                        this
                    );
                }),
                (xe.event.special[ke.TRANSITION_END] = {
                    bindType: we,
                    delegateType: we,
                    handle: function (t) {
                        if (xe(t.target).is(this)) return t.handleObj.handler.apply(this, arguments);
                    },
                }),
                ke),
            Se =
                ((i = 'alert'),
                (a = '.' + (o = 'bs.alert')),
                (l = (r = e).fn[i]),
                (d = { CLOSE: 'close' + a, CLOSED: 'closed' + a, CLICK_DATA_API: 'click' + a + '.data-api' }),
                'alert',
                'fade',
                'show',
                (u = (function () {
                    function n(t) {
                        this._element = t;
                    }
                    var t = n.prototype;
                    return (
                        (t.close = function (t) {
                            t = t || this._element;
                            var e = this._getRootElement(t);
                            this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e);
                        }),
                        (t.dispose = function () {
                            r.removeData(this._element, o), (this._element = null);
                        }),
                        (t._getRootElement = function (t) {
                            var e = Ce.getSelectorFromElement(t),
                                i = !1;
                            return e && (i = r(e)[0]), i || (i = r(t).closest('.alert')[0]), i;
                        }),
                        (t._triggerCloseEvent = function (t) {
                            var e = r.Event(d.CLOSE);
                            return r(t).trigger(e), e;
                        }),
                        (t._removeElement = function (e) {
                            var i = this;
                            if ((r(e).removeClass('show'), r(e).hasClass('fade'))) {
                                var t = Ce.getTransitionDurationFromElement(e);
                                r(e)
                                    .one(Ce.TRANSITION_END, function (t) {
                                        return i._destroyElement(e, t);
                                    })
                                    .emulateTransitionEnd(t);
                            } else this._destroyElement(e);
                        }),
                        (t._destroyElement = function (t) {
                            r(t).detach().trigger(d.CLOSED).remove();
                        }),
                        (n._jQueryInterface = function (i) {
                            return this.each(function () {
                                var t = r(this),
                                    e = t.data(o);
                                e || ((e = new n(this)), t.data(o, e)), 'close' === i && e[i](this);
                            });
                        }),
                        (n._handleDismiss = function (e) {
                            return function (t) {
                                t && t.preventDefault(), e.close(this);
                            };
                        }),
                        s(n, null, [
                            {
                                key: 'VERSION',
                                get: function () {
                                    return '4.1.0';
                                },
                            },
                        ]),
                        n
                    );
                })()),
                r(document).on(d.CLICK_DATA_API, '[data-dismiss="alert"]', u._handleDismiss(new u())),
                (r.fn[i] = u._jQueryInterface),
                (r.fn[i].Constructor = u),
                (r.fn[i].noConflict = function () {
                    return (r.fn[i] = l), u._jQueryInterface;
                }),
                u),
            De =
                ((f = 'button'),
                (g = '.' + (m = 'bs.button')),
                (v = '.data-api'),
                (y = (p = e).fn[f]),
                (b = 'active'),
                'btn',
                (_ = '[data-toggle^="button"]'),
                '[data-toggle="buttons"]',
                'input',
                '.active',
                '.btn',
                (x = { CLICK_DATA_API: 'click' + g + v, FOCUS_BLUR_DATA_API: 'focus' + g + v + ' blur' + g + v }),
                (w = (function () {
                    function i(t) {
                        this._element = t;
                    }
                    var t = i.prototype;
                    return (
                        (t.toggle = function () {
                            var t = !0,
                                e = !0,
                                i = p(this._element).closest('[data-toggle="buttons"]')[0];
                            if (i) {
                                var n = p(this._element).find('input')[0];
                                if (n) {
                                    if ('radio' === n.type)
                                        if (n.checked && p(this._element).hasClass(b)) t = !1;
                                        else {
                                            var r = p(i).find('.active')[0];
                                            r && p(r).removeClass(b);
                                        }
                                    if (t) {
                                        if (
                                            n.hasAttribute('disabled') ||
                                            i.hasAttribute('disabled') ||
                                            n.classList.contains('disabled') ||
                                            i.classList.contains('disabled')
                                        )
                                            return;
                                        (n.checked = !p(this._element).hasClass(b)), p(n).trigger('change');
                                    }
                                    n.focus(), (e = !1);
                                }
                            }
                            e && this._element.setAttribute('aria-pressed', !p(this._element).hasClass(b)),
                                t && p(this._element).toggleClass(b);
                        }),
                        (t.dispose = function () {
                            p.removeData(this._element, m), (this._element = null);
                        }),
                        (i._jQueryInterface = function (e) {
                            return this.each(function () {
                                var t = p(this).data(m);
                                t || ((t = new i(this)), p(this).data(m, t)), 'toggle' === e && t[e]();
                            });
                        }),
                        s(i, null, [
                            {
                                key: 'VERSION',
                                get: function () {
                                    return '4.1.0';
                                },
                            },
                        ]),
                        i
                    );
                })()),
                p(document)
                    .on(x.CLICK_DATA_API, _, function (t) {
                        t.preventDefault();
                        var e = t.target;
                        p(e).hasClass('btn') || (e = p(e).closest('.btn')), w._jQueryInterface.call(p(e), 'toggle');
                    })
                    .on(x.FOCUS_BLUR_DATA_API, _, function (t) {
                        var e = p(t.target).closest('.btn')[0];
                        p(e).toggleClass('focus', /^focus(in)?$/.test(t.type));
                    }),
                (p.fn[f] = w._jQueryInterface),
                (p.fn[f].Constructor = w),
                (p.fn[f].noConflict = function () {
                    return (p.fn[f] = y), w._jQueryInterface;
                }),
                w),
            Te =
                ((C = 'carousel'),
                (D = '.' + (S = 'bs.carousel')),
                (T = '.data-api'),
                (M = (k = e).fn[C]),
                (A = { interval: 5e3, keyboard: !0, slide: !1, pause: 'hover', wrap: !0 }),
                (E = {
                    interval: '(number|boolean)',
                    keyboard: 'boolean',
                    slide: '(boolean|string)',
                    pause: '(string|boolean)',
                    wrap: 'boolean',
                }),
                (P = 'next'),
                (I = 'prev'),
                'left',
                'right',
                (O = {
                    SLIDE: 'slide' + D,
                    SLID: 'slid' + D,
                    KEYDOWN: 'keydown' + D,
                    MOUSEENTER: 'mouseenter' + D,
                    MOUSELEAVE: 'mouseleave' + D,
                    TOUCHEND: 'touchend' + D,
                    LOAD_DATA_API: 'load' + D + T,
                    CLICK_DATA_API: 'click' + D + T,
                }),
                'carousel',
                (N = 'active'),
                'slide',
                'carousel-item-right',
                'carousel-item-left',
                'carousel-item-next',
                'carousel-item-prev',
                (j = {
                    ACTIVE: '.active',
                    ACTIVE_ITEM: '.active.carousel-item',
                    ITEM: '.carousel-item',
                    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
                    INDICATORS: '.carousel-indicators',
                    DATA_SLIDE: '[data-slide], [data-slide-to]',
                    DATA_RIDE: '[data-ride="carousel"]',
                }),
                (F = (function () {
                    function o(t, e) {
                        (this._items = null),
                            (this._interval = null),
                            (this._activeElement = null),
                            (this._isPaused = !1),
                            (this._isSliding = !1),
                            (this.touchTimeout = null),
                            (this._config = this._getConfig(e)),
                            (this._element = k(t)[0]),
                            (this._indicatorsElement = k(this._element).find(j.INDICATORS)[0]),
                            this._addEventListeners();
                    }
                    var t = o.prototype;
                    return (
                        (t.next = function () {
                            this._isSliding || this._slide(P);
                        }),
                        (t.nextWhenVisible = function () {
                            !document.hidden &&
                                k(this._element).is(':visible') &&
                                'hidden' !== k(this._element).css('visibility') &&
                                this.next();
                        }),
                        (t.prev = function () {
                            this._isSliding || this._slide(I);
                        }),
                        (t.pause = function (t) {
                            t || (this._isPaused = !0),
                                k(this._element).find(j.NEXT_PREV)[0] && (Ce.triggerTransitionEnd(this._element), this.cycle(!0)),
                                clearInterval(this._interval),
                                (this._interval = null);
                        }),
                        (t.cycle = function (t) {
                            t || (this._isPaused = !1),
                                this._interval && (clearInterval(this._interval), (this._interval = null)),
                                this._config.interval &&
                                    !this._isPaused &&
                                    (this._interval = setInterval(
                                        (document.visibilityState ? this.nextWhenVisible : this.next).bind(this),
                                        this._config.interval
                                    ));
                        }),
                        (t.to = function (t) {
                            var e = this;
                            this._activeElement = k(this._element).find(j.ACTIVE_ITEM)[0];
                            var i = this._getItemIndex(this._activeElement);
                            if (!(t > this._items.length - 1 || t < 0))
                                if (this._isSliding)
                                    k(this._element).one(O.SLID, function () {
                                        return e.to(t);
                                    });
                                else {
                                    if (i === t) return this.pause(), void this.cycle();
                                    var n = i < t ? P : I;
                                    this._slide(n, this._items[t]);
                                }
                        }),
                        (t.dispose = function () {
                            k(this._element).off(D),
                                k.removeData(this._element, S),
                                (this._items = null),
                                (this._config = null),
                                (this._element = null),
                                (this._interval = null),
                                (this._isPaused = null),
                                (this._isSliding = null),
                                (this._activeElement = null),
                                (this._indicatorsElement = null);
                        }),
                        (t._getConfig = function (t) {
                            return (t = c({}, A, t)), Ce.typeCheckConfig(C, t, E), t;
                        }),
                        (t._addEventListeners = function () {
                            var e = this;
                            this._config.keyboard &&
                                k(this._element).on(O.KEYDOWN, function (t) {
                                    return e._keydown(t);
                                }),
                                'hover' === this._config.pause &&
                                    (k(this._element)
                                        .on(O.MOUSEENTER, function (t) {
                                            return e.pause(t);
                                        })
                                        .on(O.MOUSELEAVE, function (t) {
                                            return e.cycle(t);
                                        }),
                                    'ontouchstart' in document.documentElement &&
                                        k(this._element).on(O.TOUCHEND, function () {
                                            e.pause(),
                                                e.touchTimeout && clearTimeout(e.touchTimeout),
                                                (e.touchTimeout = setTimeout(function (t) {
                                                    return e.cycle(t);
                                                }, 500 + e._config.interval));
                                        }));
                        }),
                        (t._keydown = function (t) {
                            if (!/input|textarea/i.test(t.target.tagName))
                                switch (t.which) {
                                    case 37:
                                        t.preventDefault(), this.prev();
                                        break;
                                    case 39:
                                        t.preventDefault(), this.next();
                                }
                        }),
                        (t._getItemIndex = function (t) {
                            return (this._items = k.makeArray(k(t).parent().find(j.ITEM))), this._items.indexOf(t);
                        }),
                        (t._getItemByDirection = function (t, e) {
                            var i = t === P,
                                n = t === I,
                                r = this._getItemIndex(e),
                                o = this._items.length - 1;
                            if (((n && 0 === r) || (i && r === o)) && !this._config.wrap) return e;
                            var s = (r + (t === I ? -1 : 1)) % this._items.length;
                            return -1 === s ? this._items[this._items.length - 1] : this._items[s];
                        }),
                        (t._triggerSlideEvent = function (t, e) {
                            var i = this._getItemIndex(t),
                                n = this._getItemIndex(k(this._element).find(j.ACTIVE_ITEM)[0]),
                                r = k.Event(O.SLIDE, { relatedTarget: t, direction: e, from: n, to: i });
                            return k(this._element).trigger(r), r;
                        }),
                        (t._setActiveIndicatorElement = function (t) {
                            if (this._indicatorsElement) {
                                k(this._indicatorsElement).find(j.ACTIVE).removeClass(N);
                                var e = this._indicatorsElement.children[this._getItemIndex(t)];
                                e && k(e).addClass(N);
                            }
                        }),
                        (t._slide = function (t, e) {
                            var i,
                                n,
                                r,
                                o = this,
                                s = k(this._element).find(j.ACTIVE_ITEM)[0],
                                a = this._getItemIndex(s),
                                l = e || (s && this._getItemByDirection(t, s)),
                                c = this._getItemIndex(l),
                                h = Boolean(this._interval);
                            if (
                                (t === P
                                    ? ((i = 'carousel-item-left'), (n = 'carousel-item-next'), (r = 'left'))
                                    : ((i = 'carousel-item-right'), (n = 'carousel-item-prev'), (r = 'right')),
                                l && k(l).hasClass(N))
                            )
                                this._isSliding = !1;
                            else if (!this._triggerSlideEvent(l, r).isDefaultPrevented() && s && l) {
                                (this._isSliding = !0), h && this.pause(), this._setActiveIndicatorElement(l);
                                var d = k.Event(O.SLID, { relatedTarget: l, direction: r, from: a, to: c });
                                if (k(this._element).hasClass('slide')) {
                                    k(l).addClass(n), Ce.reflow(l), k(s).addClass(i), k(l).addClass(i);
                                    var u = Ce.getTransitionDurationFromElement(s);
                                    k(s)
                                        .one(Ce.TRANSITION_END, function () {
                                            k(l)
                                                .removeClass(i + ' ' + n)
                                                .addClass(N),
                                                k(s).removeClass(N + ' ' + n + ' ' + i),
                                                (o._isSliding = !1),
                                                setTimeout(function () {
                                                    return k(o._element).trigger(d);
                                                }, 0);
                                        })
                                        .emulateTransitionEnd(u);
                                } else k(s).removeClass(N), k(l).addClass(N), (this._isSliding = !1), k(this._element).trigger(d);
                                h && this.cycle();
                            }
                        }),
                        (o._jQueryInterface = function (n) {
                            return this.each(function () {
                                var t = k(this).data(S),
                                    e = c({}, A, k(this).data());
                                'object' == typeof n && (e = c({}, e, n));
                                var i = 'string' == typeof n ? n : e.slide;
                                if ((t || ((t = new o(this, e)), k(this).data(S, t)), 'number' == typeof n)) t.to(n);
                                else if ('string' == typeof i) {
                                    if (void 0 === t[i]) throw new TypeError('No method named "' + i + '"');
                                    t[i]();
                                } else e.interval && (t.pause(), t.cycle());
                            });
                        }),
                        (o._dataApiClickHandler = function (t) {
                            var e = Ce.getSelectorFromElement(this);
                            if (e) {
                                var i = k(e)[0];
                                if (i && k(i).hasClass('carousel')) {
                                    var n = c({}, k(i).data(), k(this).data()),
                                        r = this.getAttribute('data-slide-to');
                                    r && (n.interval = !1), o._jQueryInterface.call(k(i), n), r && k(i).data(S).to(r), t.preventDefault();
                                }
                            }
                        }),
                        s(o, null, [
                            {
                                key: 'VERSION',
                                get: function () {
                                    return '4.1.0';
                                },
                            },
                            {
                                key: 'Default',
                                get: function () {
                                    return A;
                                },
                            },
                        ]),
                        o
                    );
                })()),
                k(document).on(O.CLICK_DATA_API, j.DATA_SLIDE, F._dataApiClickHandler),
                k(window).on(O.LOAD_DATA_API, function () {
                    k(j.DATA_RIDE).each(function () {
                        var t = k(this);
                        F._jQueryInterface.call(t, t.data());
                    });
                }),
                (k.fn[C] = F._jQueryInterface),
                (k.fn[C].Constructor = F),
                (k.fn[C].noConflict = function () {
                    return (k.fn[C] = M), F._jQueryInterface;
                }),
                F),
            Me =
                (($ = 'collapse'),
                (B = '.' + (R = 'bs.collapse')),
                (H = (L = e).fn[$]),
                (z = { toggle: !0, parent: '' }),
                (U = { toggle: 'boolean', parent: '(string|element)' }),
                (W = {
                    SHOW: 'show' + B,
                    SHOWN: 'shown' + B,
                    HIDE: 'hide' + B,
                    HIDDEN: 'hidden' + B,
                    CLICK_DATA_API: 'click' + B + '.data-api',
                }),
                (Y = 'show'),
                (V = 'collapse'),
                (q = 'collapsing'),
                (G = 'collapsed'),
                'width',
                'height',
                (K = { ACTIVES: '.show, .collapsing', DATA_TOGGLE: '[data-toggle="collapse"]' }),
                (X = (function () {
                    function a(t, e) {
                        (this._isTransitioning = !1),
                            (this._element = t),
                            (this._config = this._getConfig(e)),
                            (this._triggerArray = L.makeArray(
                                L('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]')
                            ));
                        for (var i = L(K.DATA_TOGGLE), n = 0; n < i.length; n++) {
                            var r = i[n],
                                o = Ce.getSelectorFromElement(r);
                            null !== o && 0 < L(o).filter(t).length && ((this._selector = o), this._triggerArray.push(r));
                        }
                        (this._parent = this._config.parent ? this._getParent() : null),
                            this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray),
                            this._config.toggle && this.toggle();
                    }
                    var t = a.prototype;
                    return (
                        (t.toggle = function () {
                            L(this._element).hasClass(Y) ? this.hide() : this.show();
                        }),
                        (t.show = function () {
                            var t,
                                e,
                                i = this;
                            if (
                                !(
                                    this._isTransitioning ||
                                    L(this._element).hasClass(Y) ||
                                    (this._parent &&
                                        0 ===
                                            (t = L.makeArray(
                                                L(this._parent)
                                                    .find(K.ACTIVES)
                                                    .filter('[data-parent="' + this._config.parent + '"]')
                                            )).length &&
                                        (t = null),
                                    t && (e = L(t).not(this._selector).data(R)) && e._isTransitioning)
                                )
                            ) {
                                var n = L.Event(W.SHOW);
                                if ((L(this._element).trigger(n), !n.isDefaultPrevented())) {
                                    t && (a._jQueryInterface.call(L(t).not(this._selector), 'hide'), e || L(t).data(R, null));
                                    var r = this._getDimension();
                                    L(this._element).removeClass(V).addClass(q),
                                        (this._element.style[r] = 0) < this._triggerArray.length &&
                                            L(this._triggerArray).removeClass(G).attr('aria-expanded', !0),
                                        this.setTransitioning(!0);
                                    var o = 'scroll' + (r[0].toUpperCase() + r.slice(1)),
                                        s = Ce.getTransitionDurationFromElement(this._element);
                                    L(this._element)
                                        .one(Ce.TRANSITION_END, function () {
                                            L(i._element).removeClass(q).addClass(V).addClass(Y),
                                                (i._element.style[r] = ''),
                                                i.setTransitioning(!1),
                                                L(i._element).trigger(W.SHOWN);
                                        })
                                        .emulateTransitionEnd(s),
                                        (this._element.style[r] = this._element[o] + 'px');
                                }
                            }
                        }),
                        (t.hide = function () {
                            var t = this;
                            if (!this._isTransitioning && L(this._element).hasClass(Y)) {
                                var e = L.Event(W.HIDE);
                                if ((L(this._element).trigger(e), !e.isDefaultPrevented())) {
                                    var i = this._getDimension();
                                    if (
                                        ((this._element.style[i] = this._element.getBoundingClientRect()[i] + 'px'),
                                        Ce.reflow(this._element),
                                        L(this._element).addClass(q).removeClass(V).removeClass(Y),
                                        0 < this._triggerArray.length)
                                    )
                                        for (var n = 0; n < this._triggerArray.length; n++) {
                                            var r = this._triggerArray[n],
                                                o = Ce.getSelectorFromElement(r);
                                            null !== o && (L(o).hasClass(Y) || L(r).addClass(G).attr('aria-expanded', !1));
                                        }
                                    this.setTransitioning(!0), (this._element.style[i] = '');
                                    var s = Ce.getTransitionDurationFromElement(this._element);
                                    L(this._element)
                                        .one(Ce.TRANSITION_END, function () {
                                            t.setTransitioning(!1), L(t._element).removeClass(q).addClass(V).trigger(W.HIDDEN);
                                        })
                                        .emulateTransitionEnd(s);
                                }
                            }
                        }),
                        (t.setTransitioning = function (t) {
                            this._isTransitioning = t;
                        }),
                        (t.dispose = function () {
                            L.removeData(this._element, R),
                                (this._config = null),
                                (this._parent = null),
                                (this._element = null),
                                (this._triggerArray = null),
                                (this._isTransitioning = null);
                        }),
                        (t._getConfig = function (t) {
                            return ((t = c({}, z, t)).toggle = Boolean(t.toggle)), Ce.typeCheckConfig($, t, U), t;
                        }),
                        (t._getDimension = function () {
                            return L(this._element).hasClass('width') ? 'width' : 'height';
                        }),
                        (t._getParent = function () {
                            var i = this,
                                t = null;
                            Ce.isElement(this._config.parent)
                                ? ((t = this._config.parent), void 0 !== this._config.parent.jquery && (t = this._config.parent[0]))
                                : (t = L(this._config.parent)[0]);
                            var e = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                            return (
                                L(t)
                                    .find(e)
                                    .each(function (t, e) {
                                        i._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e]);
                                    }),
                                t
                            );
                        }),
                        (t._addAriaAndCollapsedClass = function (t, e) {
                            if (t) {
                                var i = L(t).hasClass(Y);
                                0 < e.length && L(e).toggleClass(G, !i).attr('aria-expanded', i);
                            }
                        }),
                        (a._getTargetFromElement = function (t) {
                            var e = Ce.getSelectorFromElement(t);
                            return e ? L(e)[0] : null;
                        }),
                        (a._jQueryInterface = function (n) {
                            return this.each(function () {
                                var t = L(this),
                                    e = t.data(R),
                                    i = c({}, z, t.data(), 'object' == typeof n && n);
                                if (
                                    (!e && i.toggle && /show|hide/.test(n) && (i.toggle = !1),
                                    e || ((e = new a(this, i)), t.data(R, e)),
                                    'string' == typeof n)
                                ) {
                                    if (void 0 === e[n]) throw new TypeError('No method named "' + n + '"');
                                    e[n]();
                                }
                            });
                        }),
                        s(a, null, [
                            {
                                key: 'VERSION',
                                get: function () {
                                    return '4.1.0';
                                },
                            },
                            {
                                key: 'Default',
                                get: function () {
                                    return z;
                                },
                            },
                        ]),
                        a
                    );
                })()),
                L(document).on(W.CLICK_DATA_API, K.DATA_TOGGLE, function (t) {
                    'A' === t.currentTarget.tagName && t.preventDefault();
                    var i = L(this),
                        e = Ce.getSelectorFromElement(this);
                    L(e).each(function () {
                        var t = L(this),
                            e = t.data(R) ? 'toggle' : i.data();
                        X._jQueryInterface.call(t, e);
                    });
                }),
                (L.fn[$] = X._jQueryInterface),
                (L.fn[$].Constructor = X),
                (L.fn[$].noConflict = function () {
                    return (L.fn[$] = H), X._jQueryInterface;
                }),
                X),
            Ae =
                ((Q = 'dropdown'),
                (tt = '.' + (J = 'bs.dropdown')),
                (et = '.data-api'),
                (it = (Z = e).fn[Q]),
                (nt = new RegExp('38|40|27')),
                (rt = {
                    HIDE: 'hide' + tt,
                    HIDDEN: 'hidden' + tt,
                    SHOW: 'show' + tt,
                    SHOWN: 'shown' + tt,
                    CLICK: 'click' + tt,
                    CLICK_DATA_API: 'click' + tt + et,
                    KEYDOWN_DATA_API: 'keydown' + tt + et,
                    KEYUP_DATA_API: 'keyup' + tt + et,
                }),
                (ot = 'disabled'),
                (st = 'show'),
                'dropup',
                'dropright',
                'dropleft',
                (at = 'dropdown-menu-right'),
                'position-static',
                (lt = '[data-toggle="dropdown"]'),
                '.dropdown form',
                (ct = '.dropdown-menu'),
                '.navbar-nav',
                '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)',
                'top-start',
                'top-end',
                'bottom-start',
                'bottom-end',
                'right-start',
                'left-start',
                (ht = { offset: 0, flip: !0, boundary: 'scrollParent', reference: 'toggle', display: 'dynamic' }),
                (dt = {
                    offset: '(number|string|function)',
                    flip: 'boolean',
                    boundary: '(string|element)',
                    reference: '(string|element)',
                    display: 'string',
                }),
                (ut = (function () {
                    function l(t, e) {
                        (this._element = t),
                            (this._popper = null),
                            (this._config = this._getConfig(e)),
                            (this._menu = this._getMenuElement()),
                            (this._inNavbar = this._detectNavbar()),
                            this._addEventListeners();
                    }
                    var t = l.prototype;
                    return (
                        (t.toggle = function () {
                            if (!this._element.disabled && !Z(this._element).hasClass(ot)) {
                                var t = l._getParentFromElement(this._element),
                                    e = Z(this._menu).hasClass(st);
                                if ((l._clearMenus(), !e)) {
                                    var i = { relatedTarget: this._element },
                                        n = Z.Event(rt.SHOW, i);
                                    if ((Z(t).trigger(n), !n.isDefaultPrevented())) {
                                        if (!this._inNavbar) {
                                            if (void 0 === h)
                                                throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
                                            var r = this._element;
                                            'parent' === this._config.reference
                                                ? (r = t)
                                                : Ce.isElement(this._config.reference) &&
                                                  ((r = this._config.reference),
                                                  void 0 !== this._config.reference.jquery && (r = this._config.reference[0])),
                                                'scrollParent' !== this._config.boundary && Z(t).addClass('position-static'),
                                                (this._popper = new h(r, this._menu, this._getPopperConfig()));
                                        }
                                        'ontouchstart' in document.documentElement &&
                                            0 === Z(t).closest('.navbar-nav').length &&
                                            Z(document.body).children().on('mouseover', null, Z.noop),
                                            this._element.focus(),
                                            this._element.setAttribute('aria-expanded', !0),
                                            Z(this._menu).toggleClass(st),
                                            Z(t).toggleClass(st).trigger(Z.Event(rt.SHOWN, i));
                                    }
                                }
                            }
                        }),
                        (t.dispose = function () {
                            Z.removeData(this._element, J),
                                Z(this._element).off(tt),
                                (this._element = null),
                                (this._menu = null) !== this._popper && (this._popper.destroy(), (this._popper = null));
                        }),
                        (t.update = function () {
                            (this._inNavbar = this._detectNavbar()), null !== this._popper && this._popper.scheduleUpdate();
                        }),
                        (t._addEventListeners = function () {
                            var e = this;
                            Z(this._element).on(rt.CLICK, function (t) {
                                t.preventDefault(), t.stopPropagation(), e.toggle();
                            });
                        }),
                        (t._getConfig = function (t) {
                            return (
                                (t = c({}, this.constructor.Default, Z(this._element).data(), t)),
                                Ce.typeCheckConfig(Q, t, this.constructor.DefaultType),
                                t
                            );
                        }),
                        (t._getMenuElement = function () {
                            if (!this._menu) {
                                var t = l._getParentFromElement(this._element);
                                this._menu = Z(t).find(ct)[0];
                            }
                            return this._menu;
                        }),
                        (t._getPlacement = function () {
                            var t = Z(this._element).parent(),
                                e = 'bottom-start';
                            return (
                                t.hasClass('dropup')
                                    ? ((e = 'top-start'), Z(this._menu).hasClass(at) && (e = 'top-end'))
                                    : t.hasClass('dropright')
                                    ? (e = 'right-start')
                                    : t.hasClass('dropleft')
                                    ? (e = 'left-start')
                                    : Z(this._menu).hasClass(at) && (e = 'bottom-end'),
                                e
                            );
                        }),
                        (t._detectNavbar = function () {
                            return 0 < Z(this._element).closest('.navbar').length;
                        }),
                        (t._getPopperConfig = function () {
                            var e = this,
                                t = {};
                            'function' == typeof this._config.offset
                                ? (t.fn = function (t) {
                                      return (t.offsets = c({}, t.offsets, e._config.offset(t.offsets) || {})), t;
                                  })
                                : (t.offset = this._config.offset);
                            var i = {
                                placement: this._getPlacement(),
                                modifiers: {
                                    offset: t,
                                    flip: { enabled: this._config.flip },
                                    preventOverflow: { boundariesElement: this._config.boundary },
                                },
                            };
                            return 'static' === this._config.display && (i.modifiers.applyStyle = { enabled: !1 }), i;
                        }),
                        (l._jQueryInterface = function (e) {
                            return this.each(function () {
                                var t = Z(this).data(J);
                                if ((t || ((t = new l(this, 'object' == typeof e ? e : null)), Z(this).data(J, t)), 'string' == typeof e)) {
                                    if (void 0 === t[e]) throw new TypeError('No method named "' + e + '"');
                                    t[e]();
                                }
                            });
                        }),
                        (l._clearMenus = function (t) {
                            if (!t || (3 !== t.which && ('keyup' !== t.type || 9 === t.which)))
                                for (var e = Z.makeArray(Z(lt)), i = 0; i < e.length; i++) {
                                    var n = l._getParentFromElement(e[i]),
                                        r = Z(e[i]).data(J),
                                        o = { relatedTarget: e[i] };
                                    if (r) {
                                        var s = r._menu;
                                        if (
                                            Z(n).hasClass(st) &&
                                            !(
                                                t &&
                                                (('click' === t.type && /input|textarea/i.test(t.target.tagName)) ||
                                                    ('keyup' === t.type && 9 === t.which)) &&
                                                Z.contains(n, t.target)
                                            )
                                        ) {
                                            var a = Z.Event(rt.HIDE, o);
                                            Z(n).trigger(a),
                                                a.isDefaultPrevented() ||
                                                    ('ontouchstart' in document.documentElement &&
                                                        Z(document.body).children().off('mouseover', null, Z.noop),
                                                    e[i].setAttribute('aria-expanded', 'false'),
                                                    Z(s).removeClass(st),
                                                    Z(n).removeClass(st).trigger(Z.Event(rt.HIDDEN, o)));
                                        }
                                    }
                                }
                        }),
                        (l._getParentFromElement = function (t) {
                            var e,
                                i = Ce.getSelectorFromElement(t);
                            return i && (e = Z(i)[0]), e || t.parentNode;
                        }),
                        (l._dataApiKeydownHandler = function (t) {
                            if (
                                (/input|textarea/i.test(t.target.tagName)
                                    ? !(
                                          32 === t.which ||
                                          (27 !== t.which && ((40 !== t.which && 38 !== t.which) || Z(t.target).closest(ct).length))
                                      )
                                    : nt.test(t.which)) &&
                                (t.preventDefault(), t.stopPropagation(), !this.disabled && !Z(this).hasClass(ot))
                            ) {
                                var e = l._getParentFromElement(this),
                                    i = Z(e).hasClass(st);
                                if ((i || (27 === t.which && 32 === t.which)) && (!i || (27 !== t.which && 32 !== t.which))) {
                                    var n = Z(e).find('.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)').get();
                                    if (0 !== n.length) {
                                        var r = n.indexOf(t.target);
                                        38 === t.which && 0 < r && r--,
                                            40 === t.which && r < n.length - 1 && r++,
                                            r < 0 && (r = 0),
                                            n[r].focus();
                                    }
                                } else {
                                    if (27 === t.which) {
                                        var o = Z(e).find(lt)[0];
                                        Z(o).trigger('focus');
                                    }
                                    Z(this).trigger('click');
                                }
                            }
                        }),
                        s(l, null, [
                            {
                                key: 'VERSION',
                                get: function () {
                                    return '4.1.0';
                                },
                            },
                            {
                                key: 'Default',
                                get: function () {
                                    return ht;
                                },
                            },
                            {
                                key: 'DefaultType',
                                get: function () {
                                    return dt;
                                },
                            },
                        ]),
                        l
                    );
                })()),
                Z(document)
                    .on(rt.KEYDOWN_DATA_API, lt, ut._dataApiKeydownHandler)
                    .on(rt.KEYDOWN_DATA_API, ct, ut._dataApiKeydownHandler)
                    .on(rt.CLICK_DATA_API + ' ' + rt.KEYUP_DATA_API, ut._clearMenus)
                    .on(rt.CLICK_DATA_API, lt, function (t) {
                        t.preventDefault(), t.stopPropagation(), ut._jQueryInterface.call(Z(this), 'toggle');
                    })
                    .on(rt.CLICK_DATA_API, '.dropdown form', function (t) {
                        t.stopPropagation();
                    }),
                (Z.fn[Q] = ut._jQueryInterface),
                (Z.fn[Q].Constructor = ut),
                (Z.fn[Q].noConflict = function () {
                    return (Z.fn[Q] = it), ut._jQueryInterface;
                }),
                ut),
            Ee =
                ((ft = 'modal'),
                (gt = '.' + (mt = 'bs.modal')),
                (vt = (pt = e).fn[ft]),
                (yt = { backdrop: !0, keyboard: !0, focus: !0, show: !0 }),
                (bt = { backdrop: '(boolean|string)', keyboard: 'boolean', focus: 'boolean', show: 'boolean' }),
                (_t = {
                    HIDE: 'hide' + gt,
                    HIDDEN: 'hidden' + gt,
                    SHOW: 'show' + gt,
                    SHOWN: 'shown' + gt,
                    FOCUSIN: 'focusin' + gt,
                    RESIZE: 'resize' + gt,
                    CLICK_DISMISS: 'click.dismiss' + gt,
                    KEYDOWN_DISMISS: 'keydown.dismiss' + gt,
                    MOUSEUP_DISMISS: 'mouseup.dismiss' + gt,
                    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + gt,
                    CLICK_DATA_API: 'click' + gt + '.data-api',
                }),
                'modal-scrollbar-measure',
                'modal-backdrop',
                (xt = 'modal-open'),
                (wt = 'fade'),
                (kt = 'show'),
                (Ct = {
                    DIALOG: '.modal-dialog',
                    DATA_TOGGLE: '[data-toggle="modal"]',
                    DATA_DISMISS: '[data-dismiss="modal"]',
                    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
                    STICKY_CONTENT: '.sticky-top',
                    NAVBAR_TOGGLER: '.navbar-toggler',
                }),
                (St = (function () {
                    function r(t, e) {
                        (this._config = this._getConfig(e)),
                            (this._element = t),
                            (this._dialog = pt(t).find(Ct.DIALOG)[0]),
                            (this._backdrop = null),
                            (this._isShown = !1),
                            (this._isBodyOverflowing = !1),
                            (this._ignoreBackdropClick = !1),
                            (this._scrollbarWidth = 0);
                    }
                    var t = r.prototype;
                    return (
                        (t.toggle = function (t) {
                            return this._isShown ? this.hide() : this.show(t);
                        }),
                        (t.show = function (t) {
                            var e = this;
                            if (!this._isTransitioning && !this._isShown) {
                                pt(this._element).hasClass(wt) && (this._isTransitioning = !0);
                                var i = pt.Event(_t.SHOW, { relatedTarget: t });
                                pt(this._element).trigger(i),
                                    this._isShown ||
                                        i.isDefaultPrevented() ||
                                        ((this._isShown = !0),
                                        this._checkScrollbar(),
                                        this._setScrollbar(),
                                        this._adjustDialog(),
                                        pt(document.body).addClass(xt),
                                        this._setEscapeEvent(),
                                        this._setResizeEvent(),
                                        pt(this._element).on(_t.CLICK_DISMISS, Ct.DATA_DISMISS, function (t) {
                                            return e.hide(t);
                                        }),
                                        pt(this._dialog).on(_t.MOUSEDOWN_DISMISS, function () {
                                            pt(e._element).one(_t.MOUSEUP_DISMISS, function (t) {
                                                pt(t.target).is(e._element) && (e._ignoreBackdropClick = !0);
                                            });
                                        }),
                                        this._showBackdrop(function () {
                                            return e._showElement(t);
                                        }));
                            }
                        }),
                        (t.hide = function (t) {
                            var e = this;
                            if ((t && t.preventDefault(), !this._isTransitioning && this._isShown)) {
                                var i = pt.Event(_t.HIDE);
                                if ((pt(this._element).trigger(i), this._isShown && !i.isDefaultPrevented())) {
                                    this._isShown = !1;
                                    var n = pt(this._element).hasClass(wt);
                                    if (
                                        (n && (this._isTransitioning = !0),
                                        this._setEscapeEvent(),
                                        this._setResizeEvent(),
                                        pt(document).off(_t.FOCUSIN),
                                        pt(this._element).removeClass(kt),
                                        pt(this._element).off(_t.CLICK_DISMISS),
                                        pt(this._dialog).off(_t.MOUSEDOWN_DISMISS),
                                        n)
                                    ) {
                                        var r = Ce.getTransitionDurationFromElement(this._element);
                                        pt(this._element)
                                            .one(Ce.TRANSITION_END, function (t) {
                                                return e._hideModal(t);
                                            })
                                            .emulateTransitionEnd(r);
                                    } else this._hideModal();
                                }
                            }
                        }),
                        (t.dispose = function () {
                            pt.removeData(this._element, mt),
                                pt(window, document, this._element, this._backdrop).off(gt),
                                (this._config = null),
                                (this._element = null),
                                (this._dialog = null),
                                (this._backdrop = null),
                                (this._isShown = null),
                                (this._isBodyOverflowing = null),
                                (this._ignoreBackdropClick = null),
                                (this._scrollbarWidth = null);
                        }),
                        (t.handleUpdate = function () {
                            this._adjustDialog();
                        }),
                        (t._getConfig = function (t) {
                            return (t = c({}, yt, t)), Ce.typeCheckConfig(ft, t, bt), t;
                        }),
                        (t._showElement = function (t) {
                            var e = this,
                                i = pt(this._element).hasClass(wt);
                            (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
                                document.body.appendChild(this._element),
                                (this._element.style.display = 'block'),
                                this._element.removeAttribute('aria-hidden'),
                                (this._element.scrollTop = 0),
                                i && Ce.reflow(this._element),
                                pt(this._element).addClass(kt),
                                this._config.focus && this._enforceFocus();
                            var n = pt.Event(_t.SHOWN, { relatedTarget: t }),
                                r = function () {
                                    e._config.focus && e._element.focus(), (e._isTransitioning = !1), pt(e._element).trigger(n);
                                };
                            if (i) {
                                var o = Ce.getTransitionDurationFromElement(this._element);
                                pt(this._dialog).one(Ce.TRANSITION_END, r).emulateTransitionEnd(o);
                            } else r();
                        }),
                        (t._enforceFocus = function () {
                            var e = this;
                            pt(document)
                                .off(_t.FOCUSIN)
                                .on(_t.FOCUSIN, function (t) {
                                    document !== t.target &&
                                        e._element !== t.target &&
                                        0 === pt(e._element).has(t.target).length &&
                                        e._element.focus();
                                });
                        }),
                        (t._setEscapeEvent = function () {
                            var e = this;
                            this._isShown && this._config.keyboard
                                ? pt(this._element).on(_t.KEYDOWN_DISMISS, function (t) {
                                      27 === t.which && (t.preventDefault(), e.hide());
                                  })
                                : this._isShown || pt(this._element).off(_t.KEYDOWN_DISMISS);
                        }),
                        (t._setResizeEvent = function () {
                            var e = this;
                            this._isShown
                                ? pt(window).on(_t.RESIZE, function (t) {
                                      return e.handleUpdate(t);
                                  })
                                : pt(window).off(_t.RESIZE);
                        }),
                        (t._hideModal = function () {
                            var t = this;
                            (this._element.style.display = 'none'),
                                this._element.setAttribute('aria-hidden', !0),
                                (this._isTransitioning = !1),
                                this._showBackdrop(function () {
                                    pt(document.body).removeClass(xt),
                                        t._resetAdjustments(),
                                        t._resetScrollbar(),
                                        pt(t._element).trigger(_t.HIDDEN);
                                });
                        }),
                        (t._removeBackdrop = function () {
                            this._backdrop && (pt(this._backdrop).remove(), (this._backdrop = null));
                        }),
                        (t._showBackdrop = function (t) {
                            var e = this,
                                i = pt(this._element).hasClass(wt) ? wt : '';
                            if (this._isShown && this._config.backdrop) {
                                if (
                                    ((this._backdrop = document.createElement('div')),
                                    (this._backdrop.className = 'modal-backdrop'),
                                    i && pt(this._backdrop).addClass(i),
                                    pt(this._backdrop).appendTo(document.body),
                                    pt(this._element).on(_t.CLICK_DISMISS, function (t) {
                                        e._ignoreBackdropClick
                                            ? (e._ignoreBackdropClick = !1)
                                            : t.target === t.currentTarget &&
                                              ('static' === e._config.backdrop ? e._element.focus() : e.hide());
                                    }),
                                    i && Ce.reflow(this._backdrop),
                                    pt(this._backdrop).addClass(kt),
                                    !t)
                                )
                                    return;
                                if (!i) return void t();
                                var n = Ce.getTransitionDurationFromElement(this._backdrop);
                                pt(this._backdrop).one(Ce.TRANSITION_END, t).emulateTransitionEnd(n);
                            } else if (!this._isShown && this._backdrop) {
                                pt(this._backdrop).removeClass(kt);
                                var r = function () {
                                    e._removeBackdrop(), t && t();
                                };
                                if (pt(this._element).hasClass(wt)) {
                                    var o = Ce.getTransitionDurationFromElement(this._backdrop);
                                    pt(this._backdrop).one(Ce.TRANSITION_END, r).emulateTransitionEnd(o);
                                } else r();
                            } else t && t();
                        }),
                        (t._adjustDialog = function () {
                            var t = this._element.scrollHeight > document.documentElement.clientHeight;
                            !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + 'px'),
                                this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + 'px');
                        }),
                        (t._resetAdjustments = function () {
                            (this._element.style.paddingLeft = ''), (this._element.style.paddingRight = '');
                        }),
                        (t._checkScrollbar = function () {
                            var t = document.body.getBoundingClientRect();
                            (this._isBodyOverflowing = t.left + t.right < window.innerWidth),
                                (this._scrollbarWidth = this._getScrollbarWidth());
                        }),
                        (t._setScrollbar = function () {
                            var r = this;
                            if (this._isBodyOverflowing) {
                                pt(Ct.FIXED_CONTENT).each(function (t, e) {
                                    var i = pt(e)[0].style.paddingRight,
                                        n = pt(e).css('padding-right');
                                    pt(e)
                                        .data('padding-right', i)
                                        .css('padding-right', parseFloat(n) + r._scrollbarWidth + 'px');
                                }),
                                    pt(Ct.STICKY_CONTENT).each(function (t, e) {
                                        var i = pt(e)[0].style.marginRight,
                                            n = pt(e).css('margin-right');
                                        pt(e)
                                            .data('margin-right', i)
                                            .css('margin-right', parseFloat(n) - r._scrollbarWidth + 'px');
                                    }),
                                    pt(Ct.NAVBAR_TOGGLER).each(function (t, e) {
                                        var i = pt(e)[0].style.marginRight,
                                            n = pt(e).css('margin-right');
                                        pt(e)
                                            .data('margin-right', i)
                                            .css('margin-right', parseFloat(n) + r._scrollbarWidth + 'px');
                                    });
                                var t = document.body.style.paddingRight,
                                    e = pt(document.body).css('padding-right');
                                pt(document.body)
                                    .data('padding-right', t)
                                    .css('padding-right', parseFloat(e) + this._scrollbarWidth + 'px');
                            }
                        }),
                        (t._resetScrollbar = function () {
                            pt(Ct.FIXED_CONTENT).each(function (t, e) {
                                var i = pt(e).data('padding-right');
                                void 0 !== i && pt(e).css('padding-right', i).removeData('padding-right');
                            }),
                                pt(Ct.STICKY_CONTENT + ', ' + Ct.NAVBAR_TOGGLER).each(function (t, e) {
                                    var i = pt(e).data('margin-right');
                                    void 0 !== i && pt(e).css('margin-right', i).removeData('margin-right');
                                });
                            var t = pt(document.body).data('padding-right');
                            void 0 !== t && pt(document.body).css('padding-right', t).removeData('padding-right');
                        }),
                        (t._getScrollbarWidth = function () {
                            var t = document.createElement('div');
                            (t.className = 'modal-scrollbar-measure'), document.body.appendChild(t);
                            var e = t.getBoundingClientRect().width - t.clientWidth;
                            return document.body.removeChild(t), e;
                        }),
                        (r._jQueryInterface = function (i, n) {
                            return this.each(function () {
                                var t = pt(this).data(mt),
                                    e = c({}, r.Default, pt(this).data(), 'object' == typeof i && i);
                                if ((t || ((t = new r(this, e)), pt(this).data(mt, t)), 'string' == typeof i)) {
                                    if (void 0 === t[i]) throw new TypeError('No method named "' + i + '"');
                                    t[i](n);
                                } else e.show && t.show(n);
                            });
                        }),
                        s(r, null, [
                            {
                                key: 'VERSION',
                                get: function () {
                                    return '4.1.0';
                                },
                            },
                            {
                                key: 'Default',
                                get: function () {
                                    return yt;
                                },
                            },
                        ]),
                        r
                    );
                })()),
                pt(document).on(_t.CLICK_DATA_API, Ct.DATA_TOGGLE, function (t) {
                    var e,
                        i = this,
                        n = Ce.getSelectorFromElement(this);
                    n && (e = pt(n)[0]);
                    var r = pt(e).data(mt) ? 'toggle' : c({}, pt(e).data(), pt(this).data());
                    ('A' !== this.tagName && 'AREA' !== this.tagName) || t.preventDefault();
                    var o = pt(e).one(_t.SHOW, function (t) {
                        t.isDefaultPrevented() ||
                            o.one(_t.HIDDEN, function () {
                                pt(i).is(':visible') && i.focus();
                            });
                    });
                    St._jQueryInterface.call(pt(e), r, this);
                }),
                (pt.fn[ft] = St._jQueryInterface),
                (pt.fn[ft].Constructor = St),
                (pt.fn[ft].noConflict = function () {
                    return (pt.fn[ft] = vt), St._jQueryInterface;
                }),
                St),
            Pe =
                ((Tt = 'tooltip'),
                (At = '.' + (Mt = 'bs.tooltip')),
                (Et = (Dt = e).fn[Tt]),
                (Pt = 'bs-tooltip'),
                (It = new RegExp('(^|\\s)' + Pt + '\\S+', 'g')),
                (jt = {
                    animation: !0,
                    template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
                    trigger: 'hover focus',
                    title: '',
                    delay: 0,
                    html: ((Nt = { AUTO: 'auto', TOP: 'top', RIGHT: 'right', BOTTOM: 'bottom', LEFT: 'left' }), !1),
                    selector:
                        ((Ot = {
                            animation: 'boolean',
                            template: 'string',
                            title: '(string|element|function)',
                            trigger: 'string',
                            delay: '(number|object)',
                            html: 'boolean',
                            selector: '(string|boolean)',
                            placement: '(string|function)',
                            offset: '(number|string)',
                            container: '(string|element|boolean)',
                            fallbackPlacement: '(string|array)',
                            boundary: '(string|element)',
                        }),
                        !1),
                    placement: 'top',
                    offset: 0,
                    container: !1,
                    fallbackPlacement: 'flip',
                    boundary: 'scrollParent',
                }),
                'out',
                (Lt = {
                    HIDE: 'hide' + At,
                    HIDDEN: 'hidden' + At,
                    SHOW: (Ft = 'show') + At,
                    SHOWN: 'shown' + At,
                    INSERTED: 'inserted' + At,
                    CLICK: 'click' + At,
                    FOCUSIN: 'focusin' + At,
                    FOCUSOUT: 'focusout' + At,
                    MOUSEENTER: 'mouseenter' + At,
                    MOUSELEAVE: 'mouseleave' + At,
                }),
                ($t = 'fade'),
                (Rt = 'show'),
                '.tooltip-inner',
                '.arrow',
                (Bt = 'hover'),
                (Ht = 'focus'),
                'click',
                'manual',
                (zt = (function () {
                    function n(t, e) {
                        if (void 0 === h) throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
                        (this._isEnabled = !0),
                            (this._timeout = 0),
                            (this._hoverState = ''),
                            (this._activeTrigger = {}),
                            (this._popper = null),
                            (this.element = t),
                            (this.config = this._getConfig(e)),
                            (this.tip = null),
                            this._setListeners();
                    }
                    var t = n.prototype;
                    return (
                        (t.enable = function () {
                            this._isEnabled = !0;
                        }),
                        (t.disable = function () {
                            this._isEnabled = !1;
                        }),
                        (t.toggleEnabled = function () {
                            this._isEnabled = !this._isEnabled;
                        }),
                        (t.toggle = function (t) {
                            if (this._isEnabled)
                                if (t) {
                                    var e = this.constructor.DATA_KEY,
                                        i = Dt(t.currentTarget).data(e);
                                    i ||
                                        ((i = new this.constructor(t.currentTarget, this._getDelegateConfig())),
                                        Dt(t.currentTarget).data(e, i)),
                                        (i._activeTrigger.click = !i._activeTrigger.click),
                                        i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i);
                                } else {
                                    if (Dt(this.getTipElement()).hasClass(Rt)) return void this._leave(null, this);
                                    this._enter(null, this);
                                }
                        }),
                        (t.dispose = function () {
                            clearTimeout(this._timeout),
                                Dt.removeData(this.element, this.constructor.DATA_KEY),
                                Dt(this.element).off(this.constructor.EVENT_KEY),
                                Dt(this.element).closest('.modal').off('hide.bs.modal'),
                                this.tip && Dt(this.tip).remove(),
                                (this._isEnabled = null),
                                (this._timeout = null),
                                (this._hoverState = null),
                                (this._activeTrigger = null) !== this._popper && this._popper.destroy(),
                                (this._popper = null),
                                (this.element = null),
                                (this.config = null),
                                (this.tip = null);
                        }),
                        (t.show = function () {
                            var e = this;
                            if ('none' === Dt(this.element).css('display')) throw new Error('Please use show on visible elements');
                            var t = Dt.Event(this.constructor.Event.SHOW);
                            if (this.isWithContent() && this._isEnabled) {
                                Dt(this.element).trigger(t);
                                var i = Dt.contains(this.element.ownerDocument.documentElement, this.element);
                                if (t.isDefaultPrevented() || !i) return;
                                var n = this.getTipElement(),
                                    r = Ce.getUID(this.constructor.NAME);
                                n.setAttribute('id', r),
                                    this.element.setAttribute('aria-describedby', r),
                                    this.setContent(),
                                    this.config.animation && Dt(n).addClass($t);
                                var o =
                                        'function' == typeof this.config.placement
                                            ? this.config.placement.call(this, n, this.element)
                                            : this.config.placement,
                                    s = this._getAttachment(o);
                                this.addAttachmentClass(s);
                                var a = !1 === this.config.container ? document.body : Dt(this.config.container);
                                Dt(n).data(this.constructor.DATA_KEY, this),
                                    Dt.contains(this.element.ownerDocument.documentElement, this.tip) || Dt(n).appendTo(a),
                                    Dt(this.element).trigger(this.constructor.Event.INSERTED),
                                    (this._popper = new h(this.element, n, {
                                        placement: s,
                                        modifiers: {
                                            offset: { offset: this.config.offset },
                                            flip: { behavior: this.config.fallbackPlacement },
                                            arrow: { element: '.arrow' },
                                            preventOverflow: { boundariesElement: this.config.boundary },
                                        },
                                        onCreate: function (t) {
                                            t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t);
                                        },
                                        onUpdate: function (t) {
                                            e._handlePopperPlacementChange(t);
                                        },
                                    })),
                                    Dt(n).addClass(Rt),
                                    'ontouchstart' in document.documentElement &&
                                        Dt(document.body).children().on('mouseover', null, Dt.noop);
                                var l = function () {
                                    e.config.animation && e._fixTransition();
                                    var t = e._hoverState;
                                    (e._hoverState = null),
                                        Dt(e.element).trigger(e.constructor.Event.SHOWN),
                                        'out' === t && e._leave(null, e);
                                };
                                if (Dt(this.tip).hasClass($t)) {
                                    var c = Ce.getTransitionDurationFromElement(this.tip);
                                    Dt(this.tip).one(Ce.TRANSITION_END, l).emulateTransitionEnd(c);
                                } else l();
                            }
                        }),
                        (t.hide = function (t) {
                            var e = this,
                                i = this.getTipElement(),
                                n = Dt.Event(this.constructor.Event.HIDE),
                                r = function () {
                                    e._hoverState !== Ft && i.parentNode && i.parentNode.removeChild(i),
                                        e._cleanTipClass(),
                                        e.element.removeAttribute('aria-describedby'),
                                        Dt(e.element).trigger(e.constructor.Event.HIDDEN),
                                        null !== e._popper && e._popper.destroy(),
                                        t && t();
                                };
                            if ((Dt(this.element).trigger(n), !n.isDefaultPrevented())) {
                                if (
                                    (Dt(i).removeClass(Rt),
                                    'ontouchstart' in document.documentElement &&
                                        Dt(document.body).children().off('mouseover', null, Dt.noop),
                                    (this._activeTrigger.click = !1),
                                    (this._activeTrigger[Ht] = !1),
                                    (this._activeTrigger[Bt] = !1),
                                    Dt(this.tip).hasClass($t))
                                ) {
                                    var o = Ce.getTransitionDurationFromElement(i);
                                    Dt(i).one(Ce.TRANSITION_END, r).emulateTransitionEnd(o);
                                } else r();
                                this._hoverState = '';
                            }
                        }),
                        (t.update = function () {
                            null !== this._popper && this._popper.scheduleUpdate();
                        }),
                        (t.isWithContent = function () {
                            return Boolean(this.getTitle());
                        }),
                        (t.addAttachmentClass = function (t) {
                            Dt(this.getTipElement()).addClass(Pt + '-' + t);
                        }),
                        (t.getTipElement = function () {
                            return (this.tip = this.tip || Dt(this.config.template)[0]), this.tip;
                        }),
                        (t.setContent = function () {
                            var t = Dt(this.getTipElement());
                            this.setElementContent(t.find('.tooltip-inner'), this.getTitle()), t.removeClass($t + ' ' + Rt);
                        }),
                        (t.setElementContent = function (t, e) {
                            var i = this.config.html;
                            'object' == typeof e && (e.nodeType || e.jquery)
                                ? i
                                    ? Dt(e).parent().is(t) || t.empty().append(e)
                                    : t.text(Dt(e).text())
                                : t[i ? 'html' : 'text'](e);
                        }),
                        (t.getTitle = function () {
                            var t = this.element.getAttribute('data-original-title');
                            return (
                                t ||
                                    (t = 'function' == typeof this.config.title ? this.config.title.call(this.element) : this.config.title),
                                t
                            );
                        }),
                        (t._getAttachment = function (t) {
                            return Nt[t.toUpperCase()];
                        }),
                        (t._setListeners = function () {
                            var n = this;
                            this.config.trigger.split(' ').forEach(function (t) {
                                if ('click' === t)
                                    Dt(n.element).on(n.constructor.Event.CLICK, n.config.selector, function (t) {
                                        return n.toggle(t);
                                    });
                                else if ('manual' !== t) {
                                    var e = t === Bt ? n.constructor.Event.MOUSEENTER : n.constructor.Event.FOCUSIN,
                                        i = t === Bt ? n.constructor.Event.MOUSELEAVE : n.constructor.Event.FOCUSOUT;
                                    Dt(n.element)
                                        .on(e, n.config.selector, function (t) {
                                            return n._enter(t);
                                        })
                                        .on(i, n.config.selector, function (t) {
                                            return n._leave(t);
                                        });
                                }
                                Dt(n.element)
                                    .closest('.modal')
                                    .on('hide.bs.modal', function () {
                                        return n.hide();
                                    });
                            }),
                                this.config.selector
                                    ? (this.config = c({}, this.config, { trigger: 'manual', selector: '' }))
                                    : this._fixTitle();
                        }),
                        (t._fixTitle = function () {
                            var t = typeof this.element.getAttribute('data-original-title');
                            (this.element.getAttribute('title') || 'string' !== t) &&
                                (this.element.setAttribute('data-original-title', this.element.getAttribute('title') || ''),
                                this.element.setAttribute('title', ''));
                        }),
                        (t._enter = function (t, e) {
                            var i = this.constructor.DATA_KEY;
                            (e = e || Dt(t.currentTarget).data(i)) ||
                                ((e = new this.constructor(t.currentTarget, this._getDelegateConfig())), Dt(t.currentTarget).data(i, e)),
                                t && (e._activeTrigger['focusin' === t.type ? Ht : Bt] = !0),
                                Dt(e.getTipElement()).hasClass(Rt) || e._hoverState === Ft
                                    ? (e._hoverState = Ft)
                                    : (clearTimeout(e._timeout),
                                      (e._hoverState = Ft),
                                      e.config.delay && e.config.delay.show
                                          ? (e._timeout = setTimeout(function () {
                                                e._hoverState === Ft && e.show();
                                            }, e.config.delay.show))
                                          : e.show());
                        }),
                        (t._leave = function (t, e) {
                            var i = this.constructor.DATA_KEY;
                            (e = e || Dt(t.currentTarget).data(i)) ||
                                ((e = new this.constructor(t.currentTarget, this._getDelegateConfig())), Dt(t.currentTarget).data(i, e)),
                                t && (e._activeTrigger['focusout' === t.type ? Ht : Bt] = !1),
                                e._isWithActiveTrigger() ||
                                    (clearTimeout(e._timeout),
                                    (e._hoverState = 'out'),
                                    e.config.delay && e.config.delay.hide
                                        ? (e._timeout = setTimeout(function () {
                                              'out' === e._hoverState && e.hide();
                                          }, e.config.delay.hide))
                                        : e.hide());
                        }),
                        (t._isWithActiveTrigger = function () {
                            for (var t in this._activeTrigger) if (this._activeTrigger[t]) return !0;
                            return !1;
                        }),
                        (t._getConfig = function (t) {
                            return (
                                'number' == typeof (t = c({}, this.constructor.Default, Dt(this.element).data(), t)).delay &&
                                    (t.delay = { show: t.delay, hide: t.delay }),
                                'number' == typeof t.title && (t.title = t.title.toString()),
                                'number' == typeof t.content && (t.content = t.content.toString()),
                                Ce.typeCheckConfig(Tt, t, this.constructor.DefaultType),
                                t
                            );
                        }),
                        (t._getDelegateConfig = function () {
                            var t = {};
                            if (this.config)
                                for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                            return t;
                        }),
                        (t._cleanTipClass = function () {
                            var t = Dt(this.getTipElement()),
                                e = t.attr('class').match(It);
                            null !== e && 0 < e.length && t.removeClass(e.join(''));
                        }),
                        (t._handlePopperPlacementChange = function (t) {
                            this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement));
                        }),
                        (t._fixTransition = function () {
                            var t = this.getTipElement(),
                                e = this.config.animation;
                            null === t.getAttribute('x-placement') &&
                                (Dt(t).removeClass($t),
                                (this.config.animation = !1),
                                this.hide(),
                                this.show(),
                                (this.config.animation = e));
                        }),
                        (n._jQueryInterface = function (i) {
                            return this.each(function () {
                                var t = Dt(this).data(Mt),
                                    e = 'object' == typeof i && i;
                                if (
                                    (t || !/dispose|hide/.test(i)) &&
                                    (t || ((t = new n(this, e)), Dt(this).data(Mt, t)), 'string' == typeof i)
                                ) {
                                    if (void 0 === t[i]) throw new TypeError('No method named "' + i + '"');
                                    t[i]();
                                }
                            });
                        }),
                        s(n, null, [
                            {
                                key: 'VERSION',
                                get: function () {
                                    return '4.1.0';
                                },
                            },
                            {
                                key: 'Default',
                                get: function () {
                                    return jt;
                                },
                            },
                            {
                                key: 'NAME',
                                get: function () {
                                    return Tt;
                                },
                            },
                            {
                                key: 'DATA_KEY',
                                get: function () {
                                    return Mt;
                                },
                            },
                            {
                                key: 'Event',
                                get: function () {
                                    return Lt;
                                },
                            },
                            {
                                key: 'EVENT_KEY',
                                get: function () {
                                    return At;
                                },
                            },
                            {
                                key: 'DefaultType',
                                get: function () {
                                    return Ot;
                                },
                            },
                        ]),
                        n
                    );
                })()),
                (Dt.fn[Tt] = zt._jQueryInterface),
                (Dt.fn[Tt].Constructor = zt),
                (Dt.fn[Tt].noConflict = function () {
                    return (Dt.fn[Tt] = Et), zt._jQueryInterface;
                }),
                zt),
            Ie =
                ((Wt = 'popover'),
                (Vt = '.' + (Yt = 'bs.popover')),
                (qt = (Ut = e).fn[Wt]),
                (Gt = 'bs-popover'),
                (Kt = new RegExp('(^|\\s)' + Gt + '\\S+', 'g')),
                (Xt = c({}, Pe.Default, {
                    placement: 'right',
                    trigger: 'click',
                    content: '',
                    template:
                        '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
                })),
                (Zt = c({}, Pe.DefaultType, { content: '(string|element|function)' })),
                'fade',
                '.popover-header',
                '.popover-body',
                (Qt = {
                    HIDE: 'hide' + Vt,
                    HIDDEN: 'hidden' + Vt,
                    SHOW: 'show' + Vt,
                    SHOWN: 'shown' + Vt,
                    INSERTED: 'inserted' + Vt,
                    CLICK: 'click' + Vt,
                    FOCUSIN: 'focusin' + Vt,
                    FOCUSOUT: 'focusout' + Vt,
                    MOUSEENTER: 'mouseenter' + Vt,
                    MOUSELEAVE: 'mouseleave' + Vt,
                }),
                (Jt = (function (t) {
                    var e, i;
                    function n() {
                        return t.apply(this, arguments) || this;
                    }
                    (i = t), ((e = n).prototype = Object.create(i.prototype)), ((e.prototype.constructor = e).__proto__ = i);
                    var r = n.prototype;
                    return (
                        (r.isWithContent = function () {
                            return this.getTitle() || this._getContent();
                        }),
                        (r.addAttachmentClass = function (t) {
                            Ut(this.getTipElement()).addClass(Gt + '-' + t);
                        }),
                        (r.getTipElement = function () {
                            return (this.tip = this.tip || Ut(this.config.template)[0]), this.tip;
                        }),
                        (r.setContent = function () {
                            var t = Ut(this.getTipElement());
                            this.setElementContent(t.find('.popover-header'), this.getTitle());
                            var e = this._getContent();
                            'function' == typeof e && (e = e.call(this.element)),
                                this.setElementContent(t.find('.popover-body'), e),
                                t.removeClass('fade show');
                        }),
                        (r._getContent = function () {
                            return this.element.getAttribute('data-content') || this.config.content;
                        }),
                        (r._cleanTipClass = function () {
                            var t = Ut(this.getTipElement()),
                                e = t.attr('class').match(Kt);
                            null !== e && 0 < e.length && t.removeClass(e.join(''));
                        }),
                        (n._jQueryInterface = function (i) {
                            return this.each(function () {
                                var t = Ut(this).data(Yt),
                                    e = 'object' == typeof i ? i : null;
                                if (
                                    (t || !/destroy|hide/.test(i)) &&
                                    (t || ((t = new n(this, e)), Ut(this).data(Yt, t)), 'string' == typeof i)
                                ) {
                                    if (void 0 === t[i]) throw new TypeError('No method named "' + i + '"');
                                    t[i]();
                                }
                            });
                        }),
                        s(n, null, [
                            {
                                key: 'VERSION',
                                get: function () {
                                    return '4.1.0';
                                },
                            },
                            {
                                key: 'Default',
                                get: function () {
                                    return Xt;
                                },
                            },
                            {
                                key: 'NAME',
                                get: function () {
                                    return Wt;
                                },
                            },
                            {
                                key: 'DATA_KEY',
                                get: function () {
                                    return Yt;
                                },
                            },
                            {
                                key: 'Event',
                                get: function () {
                                    return Qt;
                                },
                            },
                            {
                                key: 'EVENT_KEY',
                                get: function () {
                                    return Vt;
                                },
                            },
                            {
                                key: 'DefaultType',
                                get: function () {
                                    return Zt;
                                },
                            },
                        ]),
                        n
                    );
                })(Pe)),
                (Ut.fn[Wt] = Jt._jQueryInterface),
                (Ut.fn[Wt].Constructor = Jt),
                (Ut.fn[Wt].noConflict = function () {
                    return (Ut.fn[Wt] = qt), Jt._jQueryInterface;
                }),
                Jt),
            Oe =
                ((ee = 'scrollspy'),
                (ne = '.' + (ie = 'bs.scrollspy')),
                (re = (te = e).fn[ee]),
                (oe = { offset: 10, method: 'auto', target: '' }),
                (se = { offset: 'number', method: 'string', target: '(string|element)' }),
                (ae = { ACTIVATE: 'activate' + ne, SCROLL: 'scroll' + ne, LOAD_DATA_API: 'load' + ne + '.data-api' }),
                'dropdown-item',
                (le = 'active'),
                (ce = {
                    DATA_SPY: '[data-spy="scroll"]',
                    ACTIVE: '.active',
                    NAV_LIST_GROUP: '.nav, .list-group',
                    NAV_LINKS: '.nav-link',
                    NAV_ITEMS: '.nav-item',
                    LIST_ITEMS: '.list-group-item',
                    DROPDOWN: '.dropdown',
                    DROPDOWN_ITEMS: '.dropdown-item',
                    DROPDOWN_TOGGLE: '.dropdown-toggle',
                }),
                'offset',
                (he = 'position'),
                (de = (function () {
                    function i(t, e) {
                        var i = this;
                        (this._element = t),
                            (this._scrollElement = 'BODY' === t.tagName ? window : t),
                            (this._config = this._getConfig(e)),
                            (this._selector =
                                this._config.target +
                                ' ' +
                                ce.NAV_LINKS +
                                ',' +
                                this._config.target +
                                ' ' +
                                ce.LIST_ITEMS +
                                ',' +
                                this._config.target +
                                ' ' +
                                ce.DROPDOWN_ITEMS),
                            (this._offsets = []),
                            (this._targets = []),
                            (this._activeTarget = null),
                            (this._scrollHeight = 0),
                            te(this._scrollElement).on(ae.SCROLL, function (t) {
                                return i._process(t);
                            }),
                            this.refresh(),
                            this._process();
                    }
                    var t = i.prototype;
                    return (
                        (t.refresh = function () {
                            var e = this,
                                t = this._scrollElement === this._scrollElement.window ? 'offset' : he,
                                r = 'auto' === this._config.method ? t : this._config.method,
                                o = r === he ? this._getScrollTop() : 0;
                            (this._offsets = []),
                                (this._targets = []),
                                (this._scrollHeight = this._getScrollHeight()),
                                te
                                    .makeArray(te(this._selector))
                                    .map(function (t) {
                                        var e,
                                            i = Ce.getSelectorFromElement(t);
                                        if ((i && (e = te(i)[0]), e)) {
                                            var n = e.getBoundingClientRect();
                                            if (n.width || n.height) return [te(e)[r]().top + o, i];
                                        }
                                        return null;
                                    })
                                    .filter(function (t) {
                                        return t;
                                    })
                                    .sort(function (t, e) {
                                        return t[0] - e[0];
                                    })
                                    .forEach(function (t) {
                                        e._offsets.push(t[0]), e._targets.push(t[1]);
                                    });
                        }),
                        (t.dispose = function () {
                            te.removeData(this._element, ie),
                                te(this._scrollElement).off(ne),
                                (this._element = null),
                                (this._scrollElement = null),
                                (this._config = null),
                                (this._selector = null),
                                (this._offsets = null),
                                (this._targets = null),
                                (this._activeTarget = null),
                                (this._scrollHeight = null);
                        }),
                        (t._getConfig = function (t) {
                            if ('string' != typeof (t = c({}, oe, t)).target) {
                                var e = te(t.target).attr('id');
                                e || ((e = Ce.getUID(ee)), te(t.target).attr('id', e)), (t.target = '#' + e);
                            }
                            return Ce.typeCheckConfig(ee, t, se), t;
                        }),
                        (t._getScrollTop = function () {
                            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
                        }),
                        (t._getScrollHeight = function () {
                            return (
                                this._scrollElement.scrollHeight ||
                                Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                            );
                        }),
                        (t._getOffsetHeight = function () {
                            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
                        }),
                        (t._process = function () {
                            var t = this._getScrollTop() + this._config.offset,
                                e = this._getScrollHeight(),
                                i = this._config.offset + e - this._getOffsetHeight();
                            if ((this._scrollHeight !== e && this.refresh(), i <= t)) {
                                var n = this._targets[this._targets.length - 1];
                                this._activeTarget !== n && this._activate(n);
                            } else {
                                if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0])
                                    return (this._activeTarget = null), void this._clear();
                                for (var r = this._offsets.length; r--; )
                                    this._activeTarget !== this._targets[r] &&
                                        t >= this._offsets[r] &&
                                        (void 0 === this._offsets[r + 1] || t < this._offsets[r + 1]) &&
                                        this._activate(this._targets[r]);
                            }
                        }),
                        (t._activate = function (e) {
                            (this._activeTarget = e), this._clear();
                            var t = this._selector.split(',');
                            t = t.map(function (t) {
                                return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]';
                            });
                            var i = te(t.join(','));
                            i.hasClass('dropdown-item')
                                ? (i.closest(ce.DROPDOWN).find(ce.DROPDOWN_TOGGLE).addClass(le), i.addClass(le))
                                : (i.addClass(le),
                                  i
                                      .parents(ce.NAV_LIST_GROUP)
                                      .prev(ce.NAV_LINKS + ', ' + ce.LIST_ITEMS)
                                      .addClass(le),
                                  i.parents(ce.NAV_LIST_GROUP).prev(ce.NAV_ITEMS).children(ce.NAV_LINKS).addClass(le)),
                                te(this._scrollElement).trigger(ae.ACTIVATE, { relatedTarget: e });
                        }),
                        (t._clear = function () {
                            te(this._selector).filter(ce.ACTIVE).removeClass(le);
                        }),
                        (i._jQueryInterface = function (e) {
                            return this.each(function () {
                                var t = te(this).data(ie);
                                if ((t || ((t = new i(this, 'object' == typeof e && e)), te(this).data(ie, t)), 'string' == typeof e)) {
                                    if (void 0 === t[e]) throw new TypeError('No method named "' + e + '"');
                                    t[e]();
                                }
                            });
                        }),
                        s(i, null, [
                            {
                                key: 'VERSION',
                                get: function () {
                                    return '4.1.0';
                                },
                            },
                            {
                                key: 'Default',
                                get: function () {
                                    return oe;
                                },
                            },
                        ]),
                        i
                    );
                })()),
                te(window).on(ae.LOAD_DATA_API, function () {
                    for (var t = te.makeArray(te(ce.DATA_SPY)), e = t.length; e--; ) {
                        var i = te(t[e]);
                        de._jQueryInterface.call(i, i.data());
                    }
                }),
                (te.fn[ee] = de._jQueryInterface),
                (te.fn[ee].Constructor = de),
                (te.fn[ee].noConflict = function () {
                    return (te.fn[ee] = re), de._jQueryInterface;
                }),
                de),
            Ne =
                ((fe = '.' + (pe = 'bs.tab')),
                (me = (ue = e).fn.tab),
                (ge = {
                    HIDE: 'hide' + fe,
                    HIDDEN: 'hidden' + fe,
                    SHOW: 'show' + fe,
                    SHOWN: 'shown' + fe,
                    CLICK_DATA_API: 'click' + fe + '.data-api',
                }),
                'dropdown-menu',
                (ve = 'active'),
                'disabled',
                'fade',
                'show',
                '.dropdown',
                '.nav, .list-group',
                (ye = '.active'),
                (be = '> li > .active'),
                '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
                '.dropdown-toggle',
                '> .dropdown-menu .active',
                (_e = (function () {
                    function n(t) {
                        this._element = t;
                    }
                    var t = n.prototype;
                    return (
                        (t.show = function () {
                            var i = this;
                            if (
                                !(
                                    (this._element.parentNode &&
                                        this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                                        ue(this._element).hasClass(ve)) ||
                                    ue(this._element).hasClass('disabled')
                                )
                            ) {
                                var t,
                                    n,
                                    e = ue(this._element).closest('.nav, .list-group')[0],
                                    r = Ce.getSelectorFromElement(this._element);
                                if (e) {
                                    var o = 'UL' === e.nodeName ? be : ye;
                                    n = (n = ue.makeArray(ue(e).find(o)))[n.length - 1];
                                }
                                var s = ue.Event(ge.HIDE, { relatedTarget: this._element }),
                                    a = ue.Event(ge.SHOW, { relatedTarget: n });
                                if (
                                    (n && ue(n).trigger(s),
                                    ue(this._element).trigger(a),
                                    !a.isDefaultPrevented() && !s.isDefaultPrevented())
                                ) {
                                    r && (t = ue(r)[0]), this._activate(this._element, e);
                                    var l = function () {
                                        var t = ue.Event(ge.HIDDEN, { relatedTarget: i._element }),
                                            e = ue.Event(ge.SHOWN, { relatedTarget: n });
                                        ue(n).trigger(t), ue(i._element).trigger(e);
                                    };
                                    t ? this._activate(t, t.parentNode, l) : l();
                                }
                            }
                        }),
                        (t.dispose = function () {
                            ue.removeData(this._element, pe), (this._element = null);
                        }),
                        (t._activate = function (t, e, i) {
                            var n = this,
                                r = ('UL' === e.nodeName ? ue(e).find(be) : ue(e).children(ye))[0],
                                o = i && r && ue(r).hasClass('fade'),
                                s = function () {
                                    return n._transitionComplete(t, r, i);
                                };
                            if (r && o) {
                                var a = Ce.getTransitionDurationFromElement(r);
                                ue(r).one(Ce.TRANSITION_END, s).emulateTransitionEnd(a);
                            } else s();
                        }),
                        (t._transitionComplete = function (t, e, i) {
                            if (e) {
                                ue(e).removeClass('show ' + ve);
                                var n = ue(e.parentNode).find('> .dropdown-menu .active')[0];
                                n && ue(n).removeClass(ve), 'tab' === e.getAttribute('role') && e.setAttribute('aria-selected', !1);
                            }
                            if (
                                (ue(t).addClass(ve),
                                'tab' === t.getAttribute('role') && t.setAttribute('aria-selected', !0),
                                Ce.reflow(t),
                                ue(t).addClass('show'),
                                t.parentNode && ue(t.parentNode).hasClass('dropdown-menu'))
                            ) {
                                var r = ue(t).closest('.dropdown')[0];
                                r && ue(r).find('.dropdown-toggle').addClass(ve), t.setAttribute('aria-expanded', !0);
                            }
                            i && i();
                        }),
                        (n._jQueryInterface = function (i) {
                            return this.each(function () {
                                var t = ue(this),
                                    e = t.data(pe);
                                if ((e || ((e = new n(this)), t.data(pe, e)), 'string' == typeof i)) {
                                    if (void 0 === e[i]) throw new TypeError('No method named "' + i + '"');
                                    e[i]();
                                }
                            });
                        }),
                        s(n, null, [
                            {
                                key: 'VERSION',
                                get: function () {
                                    return '4.1.0';
                                },
                            },
                        ]),
                        n
                    );
                })()),
                ue(document).on(ge.CLICK_DATA_API, '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function (t) {
                    t.preventDefault(), _e._jQueryInterface.call(ue(this), 'show');
                }),
                (ue.fn.tab = _e._jQueryInterface),
                (ue.fn.tab.Constructor = _e),
                (ue.fn.tab.noConflict = function () {
                    return (ue.fn.tab = me), _e._jQueryInterface;
                }),
                _e);
        !(function (t) {
            if (void 0 === t)
                throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
            var e = t.fn.jquery.split(' ')[0].split('.');
            if ((e[0] < 2 && e[1] < 9) || (1 === e[0] && 9 === e[1] && e[2] < 1) || 4 <= e[0])
                throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
        })(e),
            (t.Util = Ce),
            (t.Alert = Se),
            (t.Button = De),
            (t.Carousel = Te),
            (t.Collapse = Me),
            (t.Dropdown = Ae),
            (t.Modal = Ee),
            (t.Popover = Ie),
            (t.Scrollspy = Oe),
            (t.Tab = Ne),
            (t.Tooltip = Pe),
            Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (function (t) {
        'function' == typeof define && define.amd
            ? define([], t)
            : 'object' == typeof exports
            ? (module.exports = t())
            : (window.wNumb = t());
    })(function () {
        'use strict';
        var o = ['decimals', 'thousand', 'mark', 'prefix', 'suffix', 'encoder', 'decoder', 'negativeBefore', 'negative', 'edit', 'undo'];
        function _(t) {
            return t.split('').reverse().join('');
        }
        function m(t, e) {
            return t.substring(0, e.length) === e;
        }
        function s(t, e, i) {
            if ((t[e] || t[i]) && t[e] === t[i]) throw new Error(e);
        }
        function x(t) {
            return 'number' == typeof t && isFinite(t);
        }
        function i(t, e, i, n, r, o, s, a, l, c, h, d) {
            var u,
                p,
                f,
                m,
                g,
                v = d,
                y = '',
                b = '';
            return (
                o && (d = o(d)),
                !!x(d) &&
                    (!1 !== t && 0 === parseFloat(d.toFixed(t)) && (d = 0),
                    d < 0 && ((u = !0), (d = Math.abs(d))),
                    !1 !== t &&
                        ((g = t),
                        (m = (m = d).toString().split('e')),
                        (d = (+(
                            (m = (m = Math.round(+(m[0] + 'e' + (m[1] ? +m[1] + g : g)))).toString().split('e'))[0] +
                            'e' +
                            (m[1] ? +m[1] - g : -g)
                        )).toFixed(g))),
                    -1 !== (d = d.toString()).indexOf('.') ? ((f = (p = d.split('.'))[0]), i && (y = i + p[1])) : (f = d),
                    e && (f = _((f = _(f).match(/.{1,3}/g)).join(_(e)))),
                    u && a && (b += a),
                    n && (b += n),
                    u && l && (b += l),
                    (b += f),
                    (b += y),
                    r && (b += r),
                    c && (b = c(b, v)),
                    b)
            );
        }
        function n(t, e, i, n, r, o, s, a, l, c, h, d) {
            var u,
                p,
                f = '';
            return (
                h && (d = h(d)),
                !(!d || 'string' != typeof d) &&
                    (a && m(d, a) && ((d = d.replace(a, '')), (u = !0)),
                    n && m(d, n) && (d = d.replace(n, '')),
                    l && m(d, l) && ((d = d.replace(l, '')), (u = !0)),
                    r && ((p = r), d.slice(-1 * p.length) === p) && (d = d.slice(0, -1 * r.length)),
                    e && (d = d.split(e).join('')),
                    i && (d = d.replace(i, '.')),
                    u && (f += '-'),
                    '' !== (f = (f += d).replace(/[^0-9\.\-.]/g, '')) && ((f = Number(f)), s && (f = s(f)), !!x(f) && f))
            );
        }
        function r(t, e, i) {
            var n,
                r = [];
            for (n = 0; n < o.length; n += 1) r.push(t[o[n]]);
            return r.push(i), e.apply('', r);
        }
        return function t(e) {
            if (!(this instanceof t)) return new t(e);
            'object' == typeof e &&
                ((e = (function (t) {
                    var e,
                        i,
                        n,
                        r = {};
                    for (void 0 === t.suffix && (t.suffix = t.postfix), e = 0; e < o.length; e += 1)
                        if (void 0 === (n = t[(i = o[e])]))
                            'negative' !== i || r.negativeBefore
                                ? 'mark' === i && '.' !== r.thousand
                                    ? (r[i] = '.')
                                    : (r[i] = !1)
                                : (r[i] = '-');
                        else if ('decimals' === i) {
                            if (!(0 <= n && n < 8)) throw new Error(i);
                            r[i] = n;
                        } else if ('encoder' === i || 'decoder' === i || 'edit' === i || 'undo' === i) {
                            if ('function' != typeof n) throw new Error(i);
                            r[i] = n;
                        } else {
                            if ('string' != typeof n) throw new Error(i);
                            r[i] = n;
                        }
                    return s(r, 'mark', 'thousand'), s(r, 'prefix', 'negative'), s(r, 'prefix', 'negativeBefore'), r;
                })(e)),
                (this.to = function (t) {
                    return r(e, i, t);
                }),
                (this.from = function (t) {
                    return r(e, n, t);
                }));
        };
    }),
    (function (e, i) {
        'function' == typeof define && define.amd
            ? define([], i())
            : 'object' == typeof module && module.exports
            ? (module.exports = i())
            : (function t() {
                  document && document.body ? (e.zenscroll = i()) : setTimeout(t, 9);
              })();
    })(this, function () {
        'use strict';
        var m = function (t) {
            return t && 'getComputedStyle' in window && 'smooth' === window.getComputedStyle(t)['scroll-behavior'];
        };
        if ('undefined' == typeof window || !('document' in window)) return {};
        var n = function (l, i, c) {
                var e;
                (i = i || 999), c || 0 === c || (c = 9);
                var h = function (t) {
                        e = t;
                    },
                    d = function () {
                        clearTimeout(e), h(0);
                    },
                    u = function (t) {
                        return Math.max(0, l.getTopOf(t) - c);
                    },
                    p = function (t, n, r) {
                        if ((d(), 0 === n || (n && n < 0) || m(l.body))) l.toY(t), r && r();
                        else {
                            var o = l.getY(),
                                s = Math.max(0, t) - o,
                                a = new Date().getTime();
                            (n = n || Math.min(Math.abs(s), i)),
                                (function i() {
                                    h(
                                        setTimeout(function () {
                                            var t = Math.min(1, (new Date().getTime() - a) / n),
                                                e = Math.max(0, Math.floor(o + s * (t < 0.5 ? 2 * t * t : t * (4 - 2 * t) - 1)));
                                            l.toY(e),
                                                t < 1 && l.getHeight() + e < l.body.scrollHeight ? i() : (setTimeout(d, 99), r && r());
                                        }, 9)
                                    );
                                })();
                        }
                    },
                    f = function (t, e, i) {
                        p(u(t), e, i);
                    };
                return {
                    setup: function (t, e) {
                        return (0 === t || t) && (i = t), (0 === e || e) && (c = e), { defaultDuration: i, edgeOffset: c };
                    },
                    to: f,
                    toY: p,
                    intoView: function (t, e, i) {
                        var n = t.getBoundingClientRect().height,
                            r = l.getTopOf(t) + n,
                            o = l.getHeight(),
                            s = l.getY(),
                            a = s + o;
                        u(t) < s || o < n + c ? f(t, e, i) : a < r + c ? p(r - o + c, e, i) : i && i();
                    },
                    center: function (t, e, i, n) {
                        p(Math.max(0, l.getTopOf(t) - l.getHeight() / 2 + (i || t.getBoundingClientRect().height / 2)), e, n);
                    },
                    stop: d,
                    moving: function () {
                        return !!e;
                    },
                    getY: l.getY,
                    getTopOf: l.getTopOf,
                };
            },
            r = document.documentElement,
            e = function () {
                return window.scrollY || r.scrollTop;
            },
            l = n({
                body: document.scrollingElement || document.body,
                toY: function (t) {
                    window.scrollTo(0, t);
                },
                getY: e,
                getHeight: function () {
                    return window.innerHeight || r.clientHeight;
                },
                getTopOf: function (t) {
                    return t.getBoundingClientRect().top + e() - r.offsetTop;
                },
            });
        if (
            ((l.createScroller = function (e, t, i) {
                return n(
                    {
                        body: e,
                        toY: function (t) {
                            e.scrollTop = t;
                        },
                        getY: function () {
                            return e.scrollTop;
                        },
                        getHeight: function () {
                            return Math.min(e.clientHeight, window.innerHeight || r.clientHeight);
                        },
                        getTopOf: function (t) {
                            return t.offsetTop;
                        },
                    },
                    t,
                    i
                );
            }),
            'addEventListener' in window && !window.noZensmooth && !m(document.body))
        ) {
            var c = 'history' in window && 'pushState' in history,
                h = c && 'scrollRestoration' in history;
            h && (history.scrollRestoration = 'auto'),
                window.addEventListener(
                    'load',
                    function () {
                        h &&
                            (setTimeout(function () {
                                history.scrollRestoration = 'manual';
                            }, 9),
                            window.addEventListener(
                                'popstate',
                                function (t) {
                                    t.state && 'zenscrollY' in t.state && l.toY(t.state.zenscrollY);
                                },
                                !1
                            )),
                            window.location.hash &&
                                setTimeout(function () {
                                    var t = l.setup().edgeOffset;
                                    if (t) {
                                        var e = document.getElementById(window.location.href.split('#')[1]);
                                        if (e) {
                                            var i = Math.max(0, l.getTopOf(e) - t),
                                                n = l.getY() - i;
                                            0 <= n && n < 9 && window.scrollTo(0, i);
                                        }
                                    }
                                }, 9);
                    },
                    !1
                );
            var d = new RegExp('(^|\\s)noZensmooth(\\s|$)');
            window.addEventListener(
                'click',
                function (t) {
                    for (var e = t.target; e && 'A' !== e.tagName; ) e = e.parentNode;
                    if (!(!e || 1 !== t.which || t.shiftKey || t.metaKey || t.ctrlKey || t.altKey)) {
                        if (h) {
                            var i = history.state && 'object' == typeof history.state ? history.state : {};
                            i.zenscrollY = l.getY();
                            try {
                                history.replaceState(i, '');
                            } catch (t) {}
                        }
                        var n = e.getAttribute('href') || '';
                        if (0 === n.indexOf('#') && !d.test(e.className)) {
                            var r = 0,
                                o = document.getElementById(n.substring(1));
                            if ('#' !== n) {
                                if (!o) return;
                                r = l.getTopOf(o);
                            }
                            t.preventDefault();
                            var s = function () {
                                    window.location = n;
                                },
                                a = l.setup().edgeOffset;
                            a &&
                                ((r = Math.max(0, r - a)),
                                c &&
                                    (s = function () {
                                        history.pushState({}, '', n);
                                    })),
                                l.toY(r, null, s);
                        }
                    }
                },
                !1
            );
        }
        return l;
    }),
    (function (t, e) {
        'object' == typeof exports && 'undefined' != typeof module
            ? (module.exports = e(require('popper.js')))
            : 'function' == typeof define && define.amd
            ? define(['popper.js'], e)
            : (t.Tooltip = e(t.Popper));
    })(this, function (o) {
        'use strict';
        o = o && o.hasOwnProperty('default') ? o.default : o;
        var r = function (t, e) {
                if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
            },
            t = (function () {
                function n(t, e) {
                    for (var i, n = 0; n < e.length; n++)
                        ((i = e[n]).enumerable = i.enumerable || !1),
                            (i.configurable = !0),
                            'value' in i && (i.writable = !0),
                            Object.defineProperty(t, i.key, i);
                }
                return function (t, e, i) {
                    return e && n(t.prototype, e), i && n(t, i), t;
                };
            })(),
            s =
                Object.assign ||
                function (t) {
                    for (var e, i = 1; i < arguments.length; i++)
                        for (var n in (e = arguments[i])) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                    return t;
                },
            a = {
                container: !1,
                delay: 0,
                html: !1,
                placement: 'top',
                title: '',
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                trigger: 'hover focus',
                offset: 0,
            },
            e = (function () {
                function n(t, e) {
                    r(this, n), l.call(this), (e = s({}, a, e)), t.jquery && (t = t[0]), (this.reference = t);
                    var i =
                        'string' == typeof (this.options = e).trigger
                            ? e.trigger.split(' ').filter(function (t) {
                                  return -1 !== ['click', 'hover', 'focus'].indexOf(t);
                              })
                            : [];
                    (this._isOpen = !1), (this._popperOptions = {}), this._setEventListeners(t, i, e);
                }
                return (
                    t(n, [
                        {
                            key: '_create',
                            value: function (t, e, i, n) {
                                var r = window.document.createElement('div');
                                r.innerHTML = e.trim();
                                var o = r.childNodes[0];
                                (o.id = 'tooltip_' + Math.random().toString(36).substr(2, 10)), o.setAttribute('aria-hidden', 'false');
                                var s = r.querySelector(this.innerSelector);
                                return this._addTitleContent(t, i, n, s), o;
                            },
                        },
                        {
                            key: '_addTitleContent',
                            value: function (t, e, i, n) {
                                if (1 === e.nodeType || 11 === e.nodeType) i && n.appendChild(e);
                                else if ((o = e) && '[object Function]' === {}.toString.call(o)) {
                                    var r = e.call(t);
                                    i ? (n.innerHTML = r) : (n.textContent = r);
                                } else i ? (n.innerHTML = e) : (n.textContent = e);
                                var o;
                            },
                        },
                        {
                            key: '_show',
                            value: function (t, e) {
                                if (this._isOpen && !this._isOpening) return this;
                                if (((this._isOpen = !0), this._tooltipNode))
                                    return (
                                        (this._tooltipNode.style.display = ''),
                                        this._tooltipNode.setAttribute('aria-hidden', 'false'),
                                        this.popperInstance.update(),
                                        this
                                    );
                                var i = t.getAttribute('title') || e.title;
                                if (!i) return this;
                                var n = this._create(t, e.template, i, e.html);
                                t.setAttribute('aria-describedby', n.id);
                                var r = this._findContainer(e.container, t);
                                return (
                                    this._append(n, r),
                                    (this._popperOptions = s({}, e.popperOptions, { placement: e.placement })),
                                    (this._popperOptions.modifiers = s({}, this._popperOptions.modifiers, {
                                        arrow: { element: this.arrowSelector },
                                        offset: { offset: e.offset },
                                    })),
                                    e.boundariesElement &&
                                        (this._popperOptions.modifiers.preventOverflow = { boundariesElement: e.boundariesElement }),
                                    (this.popperInstance = new o(t, n, this._popperOptions)),
                                    (this._tooltipNode = n),
                                    this
                                );
                            },
                        },
                        {
                            key: '_hide',
                            value: function () {
                                return (
                                    this._isOpen &&
                                        ((this._isOpen = !1),
                                        (this._tooltipNode.style.display = 'none'),
                                        this._tooltipNode.setAttribute('aria-hidden', 'true')),
                                    this
                                );
                            },
                        },
                        {
                            key: '_dispose',
                            value: function () {
                                var n = this;
                                return (
                                    this._events.forEach(function (t) {
                                        var e = t.func,
                                            i = t.event;
                                        n.reference.removeEventListener(i, e);
                                    }),
                                    (this._events = []),
                                    this._tooltipNode &&
                                        (this._hide(),
                                        this.popperInstance.destroy(),
                                        !this.popperInstance.options.removeOnDestroy &&
                                            (this._tooltipNode.parentNode.removeChild(this._tooltipNode), (this._tooltipNode = null))),
                                    this
                                );
                            },
                        },
                        {
                            key: '_findContainer',
                            value: function (t, e) {
                                return 'string' == typeof t ? (t = window.document.querySelector(t)) : !1 === t && (t = e.parentNode), t;
                            },
                        },
                        {
                            key: '_append',
                            value: function (t, e) {
                                e.appendChild(t);
                            },
                        },
                        {
                            key: '_setEventListeners',
                            value: function (i, t, n) {
                                var r = this,
                                    e = [],
                                    o = [];
                                t.forEach(function (t) {
                                    'hover' === t
                                        ? (e.push('mouseenter'), o.push('mouseleave'))
                                        : 'focus' === t
                                        ? (e.push('focus'), o.push('blur'))
                                        : 'click' === t && (e.push('click'), o.push('click'));
                                }),
                                    e.forEach(function (t) {
                                        var e = function (t) {
                                            !0 === r._isOpening || ((t.usedByTooltip = !0), r._scheduleShow(i, n.delay, n, t));
                                        };
                                        r._events.push({ event: t, func: e }), i.addEventListener(t, e);
                                    }),
                                    o.forEach(function (t) {
                                        var e = function (t) {
                                            !0 === t.usedByTooltip || r._scheduleHide(i, n.delay, n, t);
                                        };
                                        r._events.push({ event: t, func: e }), i.addEventListener(t, e);
                                    });
                            },
                        },
                        {
                            key: '_scheduleShow',
                            value: function (t, e, i) {
                                var n = this;
                                this._isOpening = !0;
                                var r = (e && e.show) || e || 0;
                                this._showTimeout = window.setTimeout(function () {
                                    return n._show(t, i);
                                }, r);
                            },
                        },
                        {
                            key: '_scheduleHide',
                            value: function (t, e, i, n) {
                                var r = this;
                                this._isOpening = !1;
                                var o = (e && e.hide) || e || 0;
                                window.setTimeout(function () {
                                    if ((window.clearTimeout(r._showTimeout), !1 !== r._isOpen && document.body.contains(r._tooltipNode))) {
                                        if ('mouseleave' === n.type) if (r._setTooltipNodeEvent(n, t, e, i)) return;
                                        r._hide(t, i);
                                    }
                                }, o);
                            },
                        },
                        {
                            key: '_updateTitleContent',
                            value: function (t) {
                                if (void 0 !== this._tooltipNode) {
                                    var e = this._tooltipNode.parentNode.querySelector(this.innerSelector);
                                    this._clearTitleContent(
                                        e,
                                        this.options.html,
                                        this.reference.getAttribute('title') || this.options.title
                                    ),
                                        this._addTitleContent(this.reference, t, this.options.html, e),
                                        (this.options.title = t),
                                        this.popperInstance.update();
                                } else void 0 !== this.options.title && (this.options.title = t);
                            },
                        },
                        {
                            key: '_clearTitleContent',
                            value: function (t, e, i) {
                                1 === i.nodeType || 11 === i.nodeType
                                    ? e && t.removeChild(i)
                                    : e
                                    ? (t.innerHTML = '')
                                    : (t.textContent = '');
                            },
                        },
                    ]),
                    n
                );
            })(),
            l = function () {
                var s = this;
                (this.show = function () {
                    return s._show(s.reference, s.options);
                }),
                    (this.hide = function () {
                        return s._hide();
                    }),
                    (this.dispose = function () {
                        return s._dispose();
                    }),
                    (this.toggle = function () {
                        return s._isOpen ? s.hide() : s.show();
                    }),
                    (this.updateTitleContent = function (t) {
                        return s._updateTitleContent(t);
                    }),
                    (this.arrowSelector = '.tooltip-arrow, .tooltip__arrow'),
                    (this.innerSelector = '.tooltip-inner, .tooltip__inner'),
                    (this._events = []),
                    (this._setTooltipNodeEvent = function (n, r, t, o) {
                        var e = n.relatedreference || n.toElement || n.relatedTarget;
                        return (
                            !!s._tooltipNode.contains(e) &&
                            (s._tooltipNode.addEventListener(n.type, function t(e) {
                                var i = e.relatedreference || e.toElement || e.relatedTarget;
                                s._tooltipNode.removeEventListener(n.type, t), r.contains(i) || s._scheduleHide(r, o.delay, o, e);
                            }),
                            !0)
                        );
                    });
            };
        return e;
    }),
    (function (v) {
        'use strict';
        var a,
            r,
            n,
            o,
            l,
            c,
            h,
            d,
            u,
            p,
            f,
            m,
            g,
            y,
            b,
            _,
            x,
            w,
            s,
            k = function (t) {
                return t;
            },
            C = function (t) {
                return v.isArray(t);
            },
            S = function (t) {
                return !C(t) && t instanceof Object;
            },
            D = function (t, e) {
                return v.inArray(e, t);
            },
            T = function (t, e) {
                for (var i in t) t.hasOwnProperty(i) && e(t[i], i, t);
            },
            M = function (t) {
                return t[t.length - 1];
            },
            A = function () {
                var t,
                    i = {};
                return (
                    T(((t = arguments), Array.prototype.slice.call(t)), function (t) {
                        T(t, function (t, e) {
                            i[e] = t;
                        });
                    }),
                    i
                );
            },
            E = function (t, e, i) {
                return C(t)
                    ? ((s = e),
                      (a = []),
                      T(t, function (t, e, i) {
                          a.push(s(t, e, i));
                      }),
                      a)
                    : ((n = e),
                      (r = i),
                      (o = {}),
                      T(t, function (t, e, i) {
                          (e = r ? r(e, t) : e), (o[e] = n(t, e, i));
                      }),
                      o);
                var n, r, o, s, a;
            },
            P = function (t, i, n) {
                return E(t, function (t, e) {
                    return t[i].apply(t, n || []);
                });
            };
        (a = jQuery),
            (r = function (t, n) {
                var e,
                    r,
                    o,
                    s =
                        ((r = {}),
                        ((e = e || {}).publish = function (t, e) {
                            T(r[t], function (t) {
                                t(e);
                            });
                        }),
                        (e.subscribe = function (t, e) {
                            (r[t] = r[t] || []), r[t].push(e);
                        }),
                        (e.unsubscribe = function (i) {
                            T(r, function (t) {
                                var e = D(t, i);
                                -1 !== e && t.splice(e, 1);
                            });
                        }),
                        e),
                    i = t.$;
                return (
                    (s.getType = function () {
                        throw 'implement me (return type. "text", "radio", etc.)';
                    }),
                    (s.$ = function (t) {
                        return t ? i.find(t) : i;
                    }),
                    (s.disable = function () {
                        s.$().prop('disabled', !0), s.publish('isEnabled', !1);
                    }),
                    (s.enable = function () {
                        s.$().prop('disabled', !1), s.publish('isEnabled', !0);
                    }),
                    (n.equalTo = function (t, e) {
                        return t === e;
                    }),
                    (n.publishChange = function (t, e) {
                        var i = s.get();
                        n.equalTo(i, o) || s.publish('change', { e: t, domElement: e }), (o = i);
                    }),
                    s
                );
            }),
            (n = function (t, e) {
                var i = r(t, e);
                return (
                    (i.get = function () {
                        return i.$().val();
                    }),
                    (i.set = function (t) {
                        i.$().val(t);
                    }),
                    (i.clear = function () {
                        i.set('');
                    }),
                    (e.buildSetter = function (e) {
                        return function (t) {
                            e.call(i, t);
                        };
                    }),
                    i
                );
            }),
            (o = function (t, e) {
                (t = C(t) ? t : [t]), (e = C(e) ? e : [e]);
                var i = !0;
                return (
                    t.length !== e.length
                        ? (i = !1)
                        : T(t, function (t) {
                              -1 === D(e, t) && (i = !1);
                          }),
                    i
                );
            }),
            (l = function (t) {
                var e = {},
                    i = n(t, e);
                return (
                    (i.getType = function () {
                        return 'button';
                    }),
                    i.$().on('change', function (t) {
                        e.publishChange(t, this);
                    }),
                    i
                );
            }),
            (c = function (t) {
                var e = {},
                    i = n(t, e);
                return (
                    (i.getType = function () {
                        return 'checkbox';
                    }),
                    (i.get = function () {
                        var t = [];
                        return (
                            i
                                .$()
                                .filter(':checked')
                                .each(function () {
                                    t.push(a(this).val());
                                }),
                            t
                        );
                    }),
                    (i.set = function (t) {
                        (t = C(t) ? t : [t]),
                            i.$().each(function () {
                                a(this).prop('checked', !1);
                            }),
                            T(t, function (t) {
                                i.$()
                                    .filter('[value="' + t + '"]')
                                    .prop('checked', !0);
                            });
                    }),
                    (e.equalTo = o),
                    i.$().change(function (t) {
                        e.publishChange(t, this);
                    }),
                    i
                );
            }),
            (h = function (t) {
                var e = _(t, {});
                return (
                    (e.getType = function () {
                        return 'email';
                    }),
                    e
                );
            }),
            (d = function (t) {
                var e = {},
                    i = r(t, e);
                return (
                    (i.getType = function () {
                        return 'file';
                    }),
                    (i.get = function () {
                        return M(i.$().val().split('\\'));
                    }),
                    (i.clear = function () {
                        this.$().each(function () {
                            a(this).wrap('<form>').closest('form').get(0).reset(), a(this).unwrap();
                        });
                    }),
                    i.$().change(function (t) {
                        e.publishChange(t, this);
                    }),
                    i
                );
            }),
            (u = function (t) {
                var e = {},
                    i = n(t, e);
                return (
                    (i.getType = function () {
                        return 'hidden';
                    }),
                    i.$().change(function (t) {
                        e.publishChange(t, this);
                    }),
                    i
                );
            }),
            (p = function (t) {
                var e = {},
                    n = r(t, e);
                return (
                    (n.getType = function () {
                        return 'file[multiple]';
                    }),
                    (n.get = function () {
                        var t,
                            e = n.$().get(0).files || [],
                            i = [];
                        for (t = 0; t < (e.length || 0); t += 1) i.push(e[t].name);
                        return i;
                    }),
                    (n.clear = function () {
                        this.$().each(function () {
                            a(this).wrap('<form>').closest('form').get(0).reset(), a(this).unwrap();
                        });
                    }),
                    n.$().change(function (t) {
                        e.publishChange(t, this);
                    }),
                    n
                );
            }),
            (f = function (t) {
                var e = {},
                    i = n(t, e);
                return (
                    (i.getType = function () {
                        return 'select[multiple]';
                    }),
                    (i.get = function () {
                        return i.$().val() || [];
                    }),
                    (i.set = function (t) {
                        i.$().val('' === t ? [] : C(t) ? t : [t]);
                    }),
                    (e.equalTo = o),
                    i.$().change(function (t) {
                        e.publishChange(t, this);
                    }),
                    i
                );
            }),
            (m = function (t) {
                var e = _(t, {});
                return (
                    (e.getType = function () {
                        return 'password';
                    }),
                    e
                );
            }),
            (g = function (t) {
                var e = {},
                    i = n(t, e);
                return (
                    (i.getType = function () {
                        return 'radio';
                    }),
                    (i.get = function () {
                        return i.$().filter(':checked').val() || null;
                    }),
                    (i.set = function (t) {
                        t
                            ? i
                                  .$()
                                  .filter('[value="' + t + '"]')
                                  .prop('checked', !0)
                            : i.$().each(function () {
                                  a(this).prop('checked', !1);
                              });
                    }),
                    i.$().change(function (t) {
                        e.publishChange(t, this);
                    }),
                    i
                );
            }),
            (y = function (t) {
                var e = {},
                    i = n(t, e);
                return (
                    (i.getType = function () {
                        return 'range';
                    }),
                    i.$().change(function (t) {
                        e.publishChange(t, this);
                    }),
                    i
                );
            }),
            (b = function (t) {
                var e = {},
                    i = n(t, e);
                return (
                    (i.getType = function () {
                        return 'select';
                    }),
                    i.$().change(function (t) {
                        e.publishChange(t, this);
                    }),
                    i
                );
            }),
            (_ = function (t) {
                var e = {},
                    i = n(t, e);
                return (
                    (i.getType = function () {
                        return 'text';
                    }),
                    i.$().on('change keyup keydown', function (t) {
                        e.publishChange(t, this);
                    }),
                    i
                );
            }),
            (x = function (t) {
                var e = {},
                    i = n(t, e);
                return (
                    (i.getType = function () {
                        return 'textarea';
                    }),
                    i.$().on('change keyup keydown', function (t) {
                        e.publishChange(t, this);
                    }),
                    i
                );
            }),
            (w = function (t) {
                var e = _(t, {});
                return (
                    (e.getType = function () {
                        return 'url';
                    }),
                    e
                );
            }),
            (s = function (t) {
                var r = {},
                    o = t.$,
                    s = t.constructorOverride || {
                        button: l,
                        text: _,
                        url: w,
                        email: h,
                        password: m,
                        range: y,
                        textarea: x,
                        select: b,
                        'select[multiple]': f,
                        radio: g,
                        checkbox: c,
                        file: d,
                        'file[multiple]': p,
                        hidden: u,
                    },
                    e = function (e, t) {
                        (S(t) ? t : o.find(t)).each(function () {
                            var t = a(this).attr('name');
                            r[t] = s[e]({ $: a(this) });
                        });
                    },
                    i = function (e, t) {
                        var i = [],
                            n = S(t) ? t : o.find(t);
                        S(t)
                            ? (r[n.attr('name')] = s[e]({ $: n }))
                            : (n.each(function () {
                                  -1 === D(i, a(this).attr('name')) && i.push(a(this).attr('name'));
                              }),
                              T(i, function (t) {
                                  r[t] = s[e]({ $: o.find('input[name="' + t + '"]') });
                              }));
                    };
                return (
                    o.is('input, select, textarea')
                        ? o.is('input[type="button"], button, input[type="submit"]')
                            ? e('button', o)
                            : o.is('textarea')
                            ? e('textarea', o)
                            : o.is('input[type="text"]') || (o.is('input') && !o.attr('type'))
                            ? e('text', o)
                            : o.is('input[type="password"]')
                            ? e('password', o)
                            : o.is('input[type="email"]')
                            ? e('email', o)
                            : o.is('input[type="url"]')
                            ? e('url', o)
                            : o.is('input[type="range"]')
                            ? e('range', o)
                            : o.is('select')
                            ? o.is('[multiple]')
                                ? e('select[multiple]', o)
                                : e('select', o)
                            : o.is('input[type="file"]')
                            ? o.is('[multiple]')
                                ? e('file[multiple]', o)
                                : e('file', o)
                            : o.is('input[type="hidden"]')
                            ? e('hidden', o)
                            : o.is('input[type="radio"]')
                            ? i('radio', o)
                            : o.is('input[type="checkbox"]')
                            ? i('checkbox', o)
                            : e('text', o)
                        : (e('button', 'input[type="button"], button, input[type="submit"]'),
                          e('text', 'input[type="text"]'),
                          e('password', 'input[type="password"]'),
                          e('email', 'input[type="email"]'),
                          e('url', 'input[type="url"]'),
                          e('range', 'input[type="range"]'),
                          e('textarea', 'textarea'),
                          e('select', 'select:not([multiple])'),
                          e('select[multiple]', 'select[multiple]'),
                          e('file', 'input[type="file"]:not([multiple])'),
                          e('file[multiple]', 'input[type="file"][multiple]'),
                          e('hidden', 'input[type="hidden"]'),
                          i('radio', 'input[type="radio"]'),
                          i('checkbox', 'input[type="checkbox"]')),
                    r
                );
            }),
            (a.fn.inputVal = function (t) {
                var e = a(this),
                    i = s({ $: e });
                return e.is('input, textarea, select')
                    ? void 0 === t
                        ? i[e.attr('name')].get()
                        : (i[e.attr('name')].set(t), e)
                    : void 0 === t
                    ? P(i, 'get')
                    : (T(t, function (t, e) {
                          i[e].set(t);
                      }),
                      e);
            }),
            (a.fn.inputOnChange = function (e) {
                var t = a(this),
                    i = s({ $: t });
                return (
                    T(i, function (t) {
                        t.subscribe('change', function (t) {
                            e.call(t.domElement, t.e);
                        });
                    }),
                    t
                );
            }),
            (a.fn.inputDisable = function () {
                var t = a(this);
                return P(s({ $: t }), 'disable'), t;
            }),
            (a.fn.inputEnable = function () {
                var t = a(this);
                return P(s({ $: t }), 'enable'), t;
            }),
            (a.fn.inputClear = function () {
                var t = a(this);
                return P(s({ $: t }), 'clear'), t;
            }),
            (v.fn.repeaterVal = function () {
                var t,
                    n,
                    r = function (t) {
                        if (1 === t.length && (0 === t[0].key.length || (1 === t[0].key.length && !t[0].key[0]))) return t[0].val;
                        T(t, function (t) {
                            t.head = t.key.shift();
                        });
                        var e,
                            i,
                            n =
                                ((e = {}),
                                T(t, function (t) {
                                    e[t.head] || (e[t.head] = []), e[t.head].push(t);
                                }),
                                e);
                        return (
                            /^[0-9]+$/.test(t[0].head)
                                ? ((i = []),
                                  T(n, function (t) {
                                      i.push(r(t));
                                  }))
                                : ((i = {}),
                                  T(n, function (t, e) {
                                      i[e] = r(t);
                                  })),
                            i
                        );
                    };
                return r(
                    ((t = v(this).inputVal()),
                    (n = []),
                    T(t, function (t, e) {
                        var i = [];
                        'undefined' !== e &&
                            (i.push(e.match(/^[^\[]*/)[0]),
                            (i = i.concat(
                                E(e.match(/\[[^\]]*\]/g), function (t) {
                                    return t.replace(/[\[\]]/g, '');
                                })
                            )),
                            n.push({ val: t, key: i }));
                    }),
                    n)
                );
            }),
            (v.fn.repeater = function (m) {
                var g;
                return (
                    (m = m || {}),
                    v(this).each(function () {
                        var t = v(this),
                            i =
                                m.show ||
                                function () {
                                    v(this).show();
                                },
                            e =
                                m.hide ||
                                function (t) {
                                    t();
                                },
                            n = t.find('[data-repeater-list]').first(),
                            l = function (t, i) {
                                return t.filter(function () {
                                    return (
                                        !i ||
                                        0 ===
                                            v(this).closest(
                                                ((t = i),
                                                (e = 'selector'),
                                                E(t, function (t) {
                                                    return t[e];
                                                })).join(',')
                                            ).length
                                    );
                                    var t, e;
                                });
                            },
                            r = function () {
                                return l(n.find('[data-repeater-item]'), m.repeaters);
                            },
                            o = n.find('[data-repeater-item]').first().clone().hide(),
                            s = l(l(v(this).find('[data-repeater-item]'), m.repeaters).first().find('[data-repeater-delete]'), m.repeaters);
                        m.isFirstItemUndeletable && s && s.remove();
                        var a = function () {
                                var t = n.data('repeater-list');
                                return m.$parent ? m.$parent.data('item-name') + '[' + t + ']' : t;
                            },
                            c = function (t) {
                                m.repeaters &&
                                    t.each(function () {
                                        var e = v(this);
                                        T(m.repeaters, function (t) {
                                            e.find(t.selector).repeater(A(t, { $parent: e }));
                                        });
                                    });
                            },
                            h = function (t, e, i) {
                                t &&
                                    T(t, function (t) {
                                        i.call(e.find(t.selector)[0], t);
                                    });
                            },
                            d = function (t, s, a) {
                                t.each(function (r) {
                                    var o = v(this);
                                    o.data('item-name', s + '[' + r + ']'),
                                        l(o.find('[name]'), a).each(function () {
                                            var t = v(this),
                                                e = t.attr('name').match(/\[[^\]]+\]/g),
                                                i = e ? M(e).replace(/\[|\]/g, '') : t.attr('name'),
                                                n = s + '[' + r + '][' + i + ']' + (t.is(':checkbox') || t.attr('multiple') ? '[]' : '');
                                            t.attr('name', n),
                                                h(a, o, function (t) {
                                                    var e = v(this);
                                                    d(
                                                        l(e.find('[data-repeater-item]'), t.repeaters || []),
                                                        s +
                                                            '[' +
                                                            r +
                                                            '][' +
                                                            e.find('[data-repeater-list]').first().data('repeater-list') +
                                                            ']',
                                                        t.repeaters
                                                    );
                                                });
                                        });
                                }),
                                    n.find('input[name][checked]').removeAttr('checked').prop('checked', !0);
                            };
                        d(r(), a(), m.repeaters),
                            c(r()),
                            m.initEmpty && r().remove(),
                            m.ready &&
                                m.ready(function () {
                                    d(r(), a(), m.repeaters);
                                });
                        var u,
                            p =
                                ((u = function (t, e, i) {
                                    if (e || m.defaultValues) {
                                        var n = {};
                                        l(t.find('[name]'), i).each(function () {
                                            var t = v(this)
                                                .attr('name')
                                                .match(/\[([^\]]*)(\]|\]\[\])$/)[1];
                                            n[t] = v(this).attr('name');
                                        }),
                                            t.inputVal(
                                                E(
                                                    ((r = e || m.defaultValues),
                                                    (o = function (t, e) {
                                                        return n[e];
                                                    }),
                                                    C(r)
                                                        ? ((s = []),
                                                          T(r, function (t, e, i) {
                                                              o(t, e, i) && s.push(t);
                                                          }))
                                                        : ((s = {}),
                                                          T(r, function (t, e, i) {
                                                              o(t, e, i) && (s[e] = t);
                                                          })),
                                                    s),
                                                    k,
                                                    function (t) {
                                                        return n[t];
                                                    }
                                                )
                                            );
                                    }
                                    var r, o, s;
                                    h(i, t, function (n) {
                                        var r = v(this);
                                        l(r.find('[data-repeater-item]'), n.repeaters).each(function () {
                                            var t = r.find('[data-repeater-list]').data('repeater-list');
                                            if (e && e[t]) {
                                                var i = v(this).clone();
                                                r.find('[data-repeater-item]').remove(),
                                                    T(e[t], function (t) {
                                                        var e = i.clone();
                                                        u(e, t, n.repeaters || []), r.find('[data-repeater-list]').append(e);
                                                    });
                                            } else u(v(this), n.defaultValues, n.repeaters || []);
                                        });
                                    });
                                }),
                                function (t, e) {
                                    n.append(t),
                                        d(r(), a(), m.repeaters),
                                        t.find('[name]').each(function () {
                                            v(this).inputClear();
                                        }),
                                        u(t, e || m.defaultValues, m.repeaters);
                                }),
                            f = function (t) {
                                var e = o.clone();
                                p(e, t), m.repeaters && c(e), i.call(e.get(0));
                            };
                        (g = function (t) {
                            r().remove(), T(t, f);
                        }),
                            l(t.find('[data-repeater-create]'), m.repeaters).click(function () {
                                f();
                            }),
                            n.on('click', '[data-repeater-delete]', function () {
                                var t = v(this).closest('[data-repeater-item]').get(0);
                                e.call(t, function () {
                                    v(t).remove(), d(r(), a(), m.repeaters);
                                });
                            });
                    }),
                    (this.setList = g),
                    this
                );
            });
    })(jQuery),
    (function (i) {
        'function' == typeof define && define.amd
            ? define(['jquery'], i)
            : 'object' == typeof module && module.exports
            ? (module.exports = function (t, e) {
                  return void 0 === e && (e = 'undefined' != typeof window ? require('jquery') : require('jquery')(t)), i(e), e;
              })
            : i(jQuery);
    })(function (j) {
        'use strict';
        function o(t) {
            var e = t.data;
            t.isDefaultPrevented() || (t.preventDefault(), j(t.target).closest('form').ajaxSubmit(e));
        }
        function s(t) {
            var e = t.target,
                i = j(e);
            if (!i.is('[type=submit],[type=image]')) {
                var n = i.closest('[type=submit]');
                if (0 === n.length) return;
                e = n[0];
            }
            var r = e.form;
            if ('image' === (r.clk = e).type)
                if (void 0 !== t.offsetX) (r.clk_x = t.offsetX), (r.clk_y = t.offsetY);
                else if ('function' == typeof j.fn.offset) {
                    var o = i.offset();
                    (r.clk_x = t.pageX - o.left), (r.clk_y = t.pageY - o.top);
                } else (r.clk_x = t.pageX - e.offsetLeft), (r.clk_y = t.pageY - e.offsetTop);
            setTimeout(function () {
                r.clk = r.clk_x = r.clk_y = null;
            }, 100);
        }
        function F() {
            if (j.fn.ajaxSubmit.debug) {
                var t = '[jquery.form] ' + Array.prototype.join.call(arguments, '');
                window.console && window.console.log
                    ? window.console.log(t)
                    : window.opera && window.opera.postError && window.opera.postError(t);
            }
        }
        var p = /\r?\n/g,
            k = {};
        (k.fileapi = void 0 !== j('<input type="file">').get(0).files), (k.formdata = void 0 !== window.FormData);
        var L = !!j.fn.prop;
        (j.fn.attr2 = function () {
            if (!L) return this.attr.apply(this, arguments);
            var t = this.prop.apply(this, arguments);
            return (t && t.jquery) || 'string' == typeof t ? t : this.attr.apply(this, arguments);
        }),
            (j.fn.ajaxSubmit = function (P, t, e, i) {
                function n(t) {
                    function h(e) {
                        var i = null;
                        try {
                            e.contentWindow && (i = e.contentWindow.document);
                        } catch (e) {
                            F('cannot get iframe.contentWindow document: ' + e);
                        }
                        if (i) return i;
                        try {
                            i = e.contentDocument ? e.contentDocument : e.document;
                        } catch (t) {
                            F('cannot get iframe.contentDocument: ' + t), (i = e.document);
                        }
                        return i;
                    }
                    function e() {
                        var t = O.attr2('target'),
                            e = O.attr2('action'),
                            i = O.attr('enctype') || O.attr('encoding') || 'multipart/form-data';
                        a.setAttribute('target', o),
                            (I && !/post/i.test(I)) || a.setAttribute('method', 'POST'),
                            e !== u.url && a.setAttribute('action', u.url),
                            u.skipEncodingOverride ||
                                (I && !/post/i.test(I)) ||
                                O.attr({ encoding: 'multipart/form-data', enctype: 'multipart/form-data' }),
                            u.timeout &&
                                (y = setTimeout(function () {
                                    (v = !0), d(_);
                                }, u.timeout));
                        var n = [];
                        try {
                            if (u.extraData)
                                for (var r in u.extraData)
                                    u.extraData.hasOwnProperty(r) &&
                                        (j.isPlainObject(u.extraData[r]) &&
                                        u.extraData[r].hasOwnProperty('name') &&
                                        u.extraData[r].hasOwnProperty('value')
                                            ? n.push(
                                                  j('<input type="hidden" name="' + u.extraData[r].name + '">', l)
                                                      .val(u.extraData[r].value)
                                                      .appendTo(a)[0]
                                              )
                                            : n.push(
                                                  j('<input type="hidden" name="' + r + '">', l)
                                                      .val(u.extraData[r])
                                                      .appendTo(a)[0]
                                              ));
                            u.iframeTarget || f.appendTo(c),
                                m.attachEvent ? m.attachEvent('onload', d) : m.addEventListener('load', d, !1),
                                setTimeout(function t() {
                                    try {
                                        var e = h(m).readyState;
                                        F('state = ' + e), e && 'uninitialized' === e.toLowerCase() && setTimeout(t, 50);
                                    } catch (e) {
                                        F('Server abort: ', e, ' (', e.name, ')'), d(x), y && clearTimeout(y), (y = void 0);
                                    }
                                }, 15);
                            try {
                                a.submit();
                            } catch (t) {
                                document.createElement('form').submit.apply(a);
                            }
                        } finally {
                            a.setAttribute('action', e),
                                a.setAttribute('enctype', i),
                                t ? a.setAttribute('target', t) : O.removeAttr('target'),
                                j(n).remove();
                        }
                    }
                    function d(t) {
                        if (!g.aborted && !D) {
                            if (((S = h(m)) || (F('cannot access response document'), (t = x)), t === _ && g))
                                return g.abort('timeout'), void b.reject(g, 'timeout');
                            if (t === x && g) return g.abort('server abort'), void b.reject(g, 'error', 'server abort');
                            if ((S && S.location.href !== u.iframeSrc) || v) {
                                m.detachEvent ? m.detachEvent('onload', d) : m.removeEventListener('load', d, !1);
                                var e,
                                    i = 'success';
                                try {
                                    if (v) throw 'timeout';
                                    var n = 'xml' === u.dataType || S.XMLDocument || j.isXMLDoc(S);
                                    if ((F('isXml=' + n), !n && window.opera && (null === S.body || !S.body.innerHTML) && --T))
                                        return F('requeing onLoad callback, DOM not available'), void setTimeout(d, 250);
                                    var r = S.body ? S.body : S.documentElement;
                                    (g.responseText = r ? r.innerHTML : null),
                                        (g.responseXML = S.XMLDocument ? S.XMLDocument : S),
                                        n && (u.dataType = 'xml'),
                                        (g.getResponseHeader = function (t) {
                                            return { 'content-type': u.dataType }[t.toLowerCase()];
                                        }),
                                        r &&
                                            ((g.status = Number(r.getAttribute('status')) || g.status),
                                            (g.statusText = r.getAttribute('statusText') || g.statusText));
                                    var o = (u.dataType || '').toLowerCase(),
                                        s = /(json|script|text)/.test(o);
                                    if (s || u.textarea) {
                                        var a = S.getElementsByTagName('textarea')[0];
                                        if (a)
                                            (g.responseText = a.value),
                                                (g.status = Number(a.getAttribute('status')) || g.status),
                                                (g.statusText = a.getAttribute('statusText') || g.statusText);
                                        else if (s) {
                                            var l = S.getElementsByTagName('pre')[0],
                                                c = S.getElementsByTagName('body')[0];
                                            l
                                                ? (g.responseText = l.textContent ? l.textContent : l.innerText)
                                                : c && (g.responseText = c.textContent ? c.textContent : c.innerText);
                                        }
                                    } else 'xml' === o && !g.responseXML && g.responseText && (g.responseXML = M(g.responseText));
                                    try {
                                        C = E(g, o, u);
                                    } catch (t) {
                                        (i = 'parsererror'), (g.error = e = t || i);
                                    }
                                } catch (t) {
                                    F('error caught: ', t), (i = 'error'), (g.error = e = t || i);
                                }
                                g.aborted && (F('upload aborted'), (i = null)),
                                    g.status && (i = (200 <= g.status && g.status < 300) || 304 === g.status ? 'success' : 'error'),
                                    'success' === i
                                        ? (u.success && u.success.call(u.context, C, 'success', g),
                                          b.resolve(g.responseText, 'success', g),
                                          p && j.event.trigger('ajaxSuccess', [g, u]))
                                        : i &&
                                          (void 0 === e && (e = g.statusText),
                                          u.error && u.error.call(u.context, g, i, e),
                                          b.reject(g, 'error', e),
                                          p && j.event.trigger('ajaxError', [g, u, e])),
                                    p && j.event.trigger('ajaxComplete', [g, u]),
                                    p && !--j.active && j.event.trigger('ajaxStop'),
                                    u.complete && u.complete.call(u.context, g, i),
                                    (D = !0),
                                    u.timeout && clearTimeout(y),
                                    setTimeout(function () {
                                        u.iframeTarget ? f.attr('src', u.iframeSrc) : f.remove(), (g.responseXML = null);
                                    }, 100);
                            }
                        }
                    }
                    var i,
                        n,
                        u,
                        p,
                        o,
                        f,
                        m,
                        g,
                        r,
                        s,
                        v,
                        y,
                        a = O[0],
                        b = j.Deferred();
                    if (
                        ((b.abort = function (t) {
                            g.abort(t);
                        }),
                        t)
                    )
                        for (n = 0; n < N.length; n++) (i = j(N[n])), L ? i.prop('disabled', !1) : i.removeAttr('disabled');
                    ((u = j.extend(!0, {}, j.ajaxSettings, P)).context = u.context || u), (o = 'jqFormIO' + new Date().getTime());
                    var l = a.ownerDocument,
                        c = O.closest('body');
                    if (
                        (u.iframeTarget
                            ? (s = (f = j(u.iframeTarget, l)).attr2('name'))
                                ? (o = s)
                                : f.attr2('name', o)
                            : (f = j('<iframe name="' + o + '" src="' + u.iframeSrc + '" />', l)).css({
                                  position: 'absolute',
                                  top: '-1000px',
                                  left: '-1000px',
                              }),
                        (m = f[0]),
                        (g = {
                            aborted: 0,
                            responseText: null,
                            responseXML: null,
                            status: 0,
                            statusText: 'n/a',
                            getAllResponseHeaders: function () {},
                            getResponseHeader: function () {},
                            setRequestHeader: function () {},
                            abort: function (t) {
                                var e = 'timeout' === t ? 'timeout' : 'aborted';
                                F('aborting upload... ' + e), (this.aborted = 1);
                                try {
                                    m.contentWindow.document.execCommand && m.contentWindow.document.execCommand('Stop');
                                } catch (t) {}
                                f.attr('src', u.iframeSrc),
                                    (g.error = e),
                                    u.error && u.error.call(u.context, g, e, t),
                                    p && j.event.trigger('ajaxError', [g, u, e]),
                                    u.complete && u.complete.call(u.context, g, e);
                            },
                        }),
                        (p = u.global) && 0 == j.active++ && j.event.trigger('ajaxStart'),
                        p && j.event.trigger('ajaxSend', [g, u]),
                        u.beforeSend && !1 === u.beforeSend.call(u.context, g, u))
                    )
                        return u.global && j.active--, b.reject(), b;
                    if (g.aborted) return b.reject(), b;
                    (r = a.clk) &&
                        (s = r.name) &&
                        !r.disabled &&
                        ((u.extraData = u.extraData || {}),
                        (u.extraData[s] = r.value),
                        'image' === r.type && ((u.extraData[s + '.x'] = a.clk_x), (u.extraData[s + '.y'] = a.clk_y)));
                    var _ = 1,
                        x = 2,
                        w = j('meta[name=csrf-token]').attr('content'),
                        k = j('meta[name=csrf-param]').attr('content');
                    k && w && ((u.extraData = u.extraData || {}), (u.extraData[k] = w)), u.forceSync ? e() : setTimeout(e, 10);
                    var C,
                        S,
                        D,
                        T = 50,
                        M =
                            j.parseXML ||
                            function (t, e) {
                                return (
                                    window.ActiveXObject
                                        ? (((e = new ActiveXObject('Microsoft.XMLDOM')).async = 'false'), e.loadXML(t))
                                        : (e = new DOMParser().parseFromString(t, 'text/xml')),
                                    e && e.documentElement && 'parsererror' !== e.documentElement.nodeName ? e : null
                                );
                            },
                        A =
                            j.parseJSON ||
                            function (t) {
                                return window.eval('(' + t + ')');
                            },
                        E = function (t, e, i) {
                            var n = t.getResponseHeader('content-type') || '',
                                r = ('xml' === e || !e) && 0 <= n.indexOf('xml'),
                                o = r ? t.responseXML : t.responseText;
                            return (
                                r && 'parsererror' === o.documentElement.nodeName && j.error && j.error('parsererror'),
                                i && i.dataFilter && (o = i.dataFilter(o, e)),
                                'string' == typeof o &&
                                    (('json' === e || !e) && 0 <= n.indexOf('json')
                                        ? (o = A(o))
                                        : ('script' === e || !e) && 0 <= n.indexOf('javascript') && j.globalEval(o)),
                                o
                            );
                        };
                    return b;
                }
                if (!this.length) return F('ajaxSubmit: skipping submit process - no element selected'), this;
                var I,
                    r,
                    o,
                    O = this;
                'function' == typeof P
                    ? (P = { success: P })
                    : 'string' == typeof P || (!1 === P && 0 < arguments.length)
                    ? ((P = { url: P, data: t, dataType: e }), 'function' == typeof i && (P.success = i))
                    : void 0 === P && (P = {}),
                    (I = P.method || P.type || this.attr2('method')),
                    (o = (o = 'string' == typeof (r = P.url || this.attr2('action')) ? j.trim(r) : '') || window.location.href || '') &&
                        (o = (o.match(/^([^#]+)/) || [])[1]),
                    (P = j.extend(
                        !0,
                        {
                            url: o,
                            success: j.ajaxSettings.success,
                            type: I || j.ajaxSettings.type,
                            iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',
                        },
                        P
                    ));
                var s = {};
                if ((this.trigger('form-pre-serialize', [this, P, s]), s.veto))
                    return F('ajaxSubmit: submit vetoed via form-pre-serialize trigger'), this;
                if (P.beforeSerialize && !1 === P.beforeSerialize(this, P))
                    return F('ajaxSubmit: submit aborted via beforeSerialize callback'), this;
                var a = P.traditional;
                void 0 === a && (a = j.ajaxSettings.traditional);
                var l,
                    N = [],
                    c = this.formToArray(P.semantic, N, P.filtering);
                if (P.data) {
                    var h = j.isFunction(P.data) ? P.data(c) : P.data;
                    (P.extraData = h), (l = j.param(h, a));
                }
                if (P.beforeSubmit && !1 === P.beforeSubmit(c, this, P))
                    return F('ajaxSubmit: submit aborted via beforeSubmit callback'), this;
                if ((this.trigger('form-submit-validate', [c, this, P, s]), s.veto))
                    return F('ajaxSubmit: submit vetoed via form-submit-validate trigger'), this;
                var d = j.param(c, a);
                l && (d = d ? d + '&' + l : l),
                    'GET' === P.type.toUpperCase() ? ((P.url += (0 <= P.url.indexOf('?') ? '&' : '?') + d), (P.data = null)) : (P.data = d);
                var u = [];
                if (
                    (P.resetForm &&
                        u.push(function () {
                            O.resetForm();
                        }),
                    P.clearForm &&
                        u.push(function () {
                            O.clearForm(P.includeHidden);
                        }),
                    !P.dataType && P.target)
                ) {
                    var p = P.success || function () {};
                    u.push(function (t, e, i) {
                        var n = arguments,
                            r = P.replaceTarget ? 'replaceWith' : 'html';
                        j(P.target)
                            [r](t)
                            .each(function () {
                                p.apply(this, n);
                            });
                    });
                } else P.success && (j.isArray(P.success) ? j.merge(u, P.success) : u.push(P.success));
                if (
                    ((P.success = function (t, e, i) {
                        for (var n = P.context || this, r = 0, o = u.length; r < o; r++) u[r].apply(n, [t, e, i || O, O]);
                    }),
                    P.error)
                ) {
                    var f = P.error;
                    P.error = function (t, e, i) {
                        var n = P.context || this;
                        f.apply(n, [t, e, i, O]);
                    };
                }
                if (P.complete) {
                    var m = P.complete;
                    P.complete = function (t, e) {
                        var i = P.context || this;
                        m.apply(i, [t, e, O]);
                    };
                }
                var g =
                        0 <
                        j('input[type=file]:enabled', this).filter(function () {
                            return '' !== j(this).val();
                        }).length,
                    v = 'multipart/form-data',
                    y = O.attr('enctype') === v || O.attr('encoding') === v,
                    b = k.fileapi && k.formdata;
                F('fileAPI :' + b);
                var _,
                    x = (g || y) && !b;
                !1 !== P.iframe && (P.iframe || x)
                    ? P.closeKeepAlive
                        ? j.get(P.closeKeepAlive, function () {
                              _ = n(c);
                          })
                        : (_ = n(c))
                    : (_ =
                          (g || y) && b
                              ? (function (t) {
                                    for (var i = new FormData(), e = 0; e < t.length; e++) i.append(t[e].name, t[e].value);
                                    if (P.extraData) {
                                        var n = (function (t) {
                                            var e,
                                                i,
                                                n = j.param(t, P.traditional).split('&'),
                                                r = n.length,
                                                o = [];
                                            for (e = 0; e < r; e++)
                                                (n[e] = n[e].replace(/\+/g, ' ')),
                                                    (i = n[e].split('=')),
                                                    o.push([decodeURIComponent(i[0]), decodeURIComponent(i[1])]);
                                            return o;
                                        })(P.extraData);
                                        for (e = 0; e < n.length; e++) n[e] && i.append(n[e][0], n[e][1]);
                                    }
                                    P.data = null;
                                    var r = j.extend(!0, {}, j.ajaxSettings, P, {
                                        contentType: !1,
                                        processData: !1,
                                        cache: !1,
                                        type: I || 'POST',
                                    });
                                    P.uploadProgress &&
                                        (r.xhr = function () {
                                            var t = j.ajaxSettings.xhr();
                                            return (
                                                t.upload &&
                                                    t.upload.addEventListener(
                                                        'progress',
                                                        function (t) {
                                                            var e = 0,
                                                                i = t.loaded || t.position,
                                                                n = t.total;
                                                            t.lengthComputable && (e = Math.ceil((i / n) * 100)),
                                                                P.uploadProgress(t, i, n, e);
                                                        },
                                                        !1
                                                    ),
                                                t
                                            );
                                        }),
                                        (r.data = null);
                                    var o = r.beforeSend;
                                    return (
                                        (r.beforeSend = function (t, e) {
                                            P.formData ? (e.data = P.formData) : (e.data = i), o && o.call(this, t, e);
                                        }),
                                        j.ajax(r)
                                    );
                                })(c)
                              : j.ajax(P)),
                    O.removeData('jqxhr').data('jqxhr', _);
                for (var w = 0; w < N.length; w++) N[w] = null;
                return this.trigger('form-submit-notify', [this, P]), this;
            }),
            (j.fn.ajaxForm = function (t, e, i, n) {
                if (
                    (('string' == typeof t || (!1 === t && 0 < arguments.length)) &&
                        ((t = { url: t, data: e, dataType: i }), 'function' == typeof n && (t.success = n)),
                    ((t = t || {}).delegation = t.delegation && j.isFunction(j.fn.on)),
                    !t.delegation && 0 === this.length)
                ) {
                    var r = { s: this.selector, c: this.context };
                    return (
                        !j.isReady && r.s
                            ? (F('DOM not ready, queuing ajaxForm'),
                              j(function () {
                                  j(r.s, r.c).ajaxForm(t);
                              }))
                            : F('terminating; zero elements found by selector' + (j.isReady ? '' : ' (DOM not ready)')),
                        this
                    );
                }
                return t.delegation
                    ? (j(document)
                          .off('submit.form-plugin', this.selector, o)
                          .off('click.form-plugin', this.selector, s)
                          .on('submit.form-plugin', this.selector, t, o)
                          .on('click.form-plugin', this.selector, t, s),
                      this)
                    : this.ajaxFormUnbind().on('submit.form-plugin', t, o).on('click.form-plugin', t, s);
            }),
            (j.fn.ajaxFormUnbind = function () {
                return this.off('submit.form-plugin click.form-plugin');
            }),
            (j.fn.formToArray = function (t, e, i) {
                var n = [];
                if (0 === this.length) return n;
                var r,
                    o,
                    s,
                    a,
                    l,
                    c,
                    h,
                    d,
                    u = this[0],
                    p = this.attr('id'),
                    f = t || void 0 === u.elements ? u.getElementsByTagName('*') : u.elements;
                if (
                    (f && (f = j.makeArray(f)),
                    p &&
                        (t || /(Edge|Trident)\//.test(navigator.userAgent)) &&
                        (r = j(':input[form="' + p + '"]').get()).length &&
                        (f = (f || []).concat(r)),
                    !f || !f.length)
                )
                    return n;
                for (j.isFunction(i) && (f = j.map(f, i)), o = 0, h = f.length; o < h; o++)
                    if ((a = (c = f[o]).name) && !c.disabled)
                        if (t && u.clk && 'image' === c.type)
                            u.clk === c &&
                                (n.push({ name: a, value: j(c).val(), type: c.type }),
                                n.push({ name: a + '.x', value: u.clk_x }, { name: a + '.y', value: u.clk_y }));
                        else if ((l = j.fieldValue(c, !0)) && l.constructor === Array)
                            for (e && e.push(c), s = 0, d = l.length; s < d; s++) n.push({ name: a, value: l[s] });
                        else if (k.fileapi && 'file' === c.type) {
                            e && e.push(c);
                            var m = c.files;
                            if (m.length) for (s = 0; s < m.length; s++) n.push({ name: a, value: m[s], type: c.type });
                            else n.push({ name: a, value: '', type: c.type });
                        } else null != l && (e && e.push(c), n.push({ name: a, value: l, type: c.type, required: c.required }));
                if (!t && u.clk) {
                    var g = j(u.clk),
                        v = g[0];
                    (a = v.name) &&
                        !v.disabled &&
                        'image' === v.type &&
                        (n.push({ name: a, value: g.val() }),
                        n.push({ name: a + '.x', value: u.clk_x }, { name: a + '.y', value: u.clk_y }));
                }
                return n;
            }),
            (j.fn.formSerialize = function (t) {
                return j.param(this.formToArray(t));
            }),
            (j.fn.fieldSerialize = function (r) {
                var o = [];
                return (
                    this.each(function () {
                        var t = this.name;
                        if (t) {
                            var e = j.fieldValue(this, r);
                            if (e && e.constructor === Array) for (var i = 0, n = e.length; i < n; i++) o.push({ name: t, value: e[i] });
                            else null != e && o.push({ name: this.name, value: e });
                        }
                    }),
                    j.param(o)
                );
            }),
            (j.fn.fieldValue = function (t) {
                for (var e = [], i = 0, n = this.length; i < n; i++) {
                    var r = this[i],
                        o = j.fieldValue(r, t);
                    null == o || (o.constructor === Array && !o.length) || (o.constructor === Array ? j.merge(e, o) : e.push(o));
                }
                return e;
            }),
            (j.fieldValue = function (t, e) {
                var i = t.name,
                    n = t.type,
                    r = t.tagName.toLowerCase();
                if (
                    (void 0 === e && (e = !0),
                    e &&
                        (!i ||
                            t.disabled ||
                            'reset' === n ||
                            'button' === n ||
                            (('checkbox' === n || 'radio' === n) && !t.checked) ||
                            (('submit' === n || 'image' === n) && t.form && t.form.clk !== t) ||
                            ('select' === r && -1 === t.selectedIndex)))
                )
                    return null;
                if ('select' === r) {
                    var o = t.selectedIndex;
                    if (o < 0) return null;
                    for (var s = [], a = t.options, l = 'select-one' === n, c = l ? o + 1 : a.length, h = l ? o : 0; h < c; h++) {
                        var d = a[h];
                        if (d.selected && !d.disabled) {
                            var u = d.value;
                            if ((u || (u = d.attributes && d.attributes.value && !d.attributes.value.specified ? d.text : d.value), l))
                                return u;
                            s.push(u);
                        }
                    }
                    return s;
                }
                return j(t).val().replace(p, '\r\n');
            }),
            (j.fn.clearForm = function (t) {
                return this.each(function () {
                    j('input,select,textarea', this).clearFields(t);
                });
            }),
            (j.fn.clearFields = j.fn.clearInputs = function (i) {
                var n = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
                return this.each(function () {
                    var t = this.type,
                        e = this.tagName.toLowerCase();
                    n.test(t) || 'textarea' === e
                        ? (this.value = '')
                        : 'checkbox' === t || 'radio' === t
                        ? (this.checked = !1)
                        : 'select' === e
                        ? (this.selectedIndex = -1)
                        : 'file' === t
                        ? /MSIE/.test(navigator.userAgent)
                            ? j(this).replaceWith(j(this).clone(!0))
                            : j(this).val('')
                        : i && ((!0 === i && /hidden/.test(t)) || ('string' == typeof i && j(this).is(i))) && (this.value = '');
                });
            }),
            (j.fn.resetForm = function () {
                return this.each(function () {
                    var e = j(this),
                        t = this.tagName.toLowerCase();
                    switch (t) {
                        case 'input':
                            this.checked = this.defaultChecked;
                        case 'textarea':
                            return (this.value = this.defaultValue), !0;
                        case 'option':
                        case 'optgroup':
                            var i = e.parents('select');
                            return (
                                i.length && i[0].multiple
                                    ? 'option' === t
                                        ? (this.selected = this.defaultSelected)
                                        : e.find('option').resetForm()
                                    : i.resetForm(),
                                !0
                            );
                        case 'select':
                            return (
                                e.find('option').each(function (t) {
                                    if (((this.selected = this.defaultSelected), this.defaultSelected && !e[0].multiple))
                                        return (e[0].selectedIndex = t), !1;
                                }),
                                !0
                            );
                        case 'label':
                            var n = j(e.attr('for')),
                                r = e.find('input,select,textarea');
                            return n[0] && r.unshift(n[0]), r.resetForm(), !0;
                        case 'form':
                            return (
                                ('function' == typeof this.reset || ('object' == typeof this.reset && !this.reset.nodeType)) &&
                                    this.reset(),
                                !0
                            );
                        default:
                            return e.find('form,input,label,select,textarea').resetForm(), !0;
                    }
                });
            }),
            (j.fn.enable = function (t) {
                return (
                    void 0 === t && (t = !0),
                    this.each(function () {
                        this.disabled = !t;
                    })
                );
            }),
            (j.fn.selected = function (i) {
                return (
                    void 0 === i && (i = !0),
                    this.each(function () {
                        var t = this.type;
                        if ('checkbox' === t || 'radio' === t) this.checked = i;
                        else if ('option' === this.tagName.toLowerCase()) {
                            var e = j(this).parent('select');
                            i && e[0] && 'select-one' === e[0].type && e.find('option').selected(!1), (this.selected = i);
                        }
                    })
                );
            }),
            (j.fn.ajaxSubmit.debug = !1);
    }),
    (function (t) {
        'function' == typeof define && define.amd
            ? define(['jquery'], t)
            : 'undefined' != typeof module && module.exports
            ? (module.exports = t)
            : t(jQuery, window, document);
    })(function (L) {
        var $,
            p,
            R,
            n,
            r,
            a,
            o,
            g,
            B,
            x,
            f,
            c,
            l,
            h,
            d,
            u,
            m,
            v,
            y,
            b,
            _,
            w,
            T,
            k,
            C,
            S,
            D,
            M,
            H,
            s,
            A,
            E,
            P,
            I,
            z,
            O,
            N,
            j,
            F,
            U,
            W,
            Y,
            V,
            q,
            G,
            K,
            X,
            Z,
            Q,
            J,
            tt,
            et,
            it,
            nt,
            rt,
            ot,
            st,
            t,
            e,
            i;
        (t = 'function' == typeof define && define.amd),
            (e = 'undefined' != typeof module && module.exports),
            (i = 'https:' == document.location.protocol ? 'https:' : 'http:'),
            t ||
                (e
                    ? require('jquery-mousewheel')(L)
                    : L.event.special.mousewheel || L('head').append(decodeURI('%3Cscript src=' + i + ''))),
            (p = 'mCustomScrollbar'),
            (R = 'mCS'),
            (n = '.mCustomScrollbar'),
            (r = {
                setTop: 0,
                setLeft: 0,
                axis: 'y',
                scrollbarPosition: 'inside',
                scrollInertia: 950,
                autoDraggerLength: !0,
                alwaysShowScrollbar: 0,
                snapOffset: 0,
                mouseWheel: {
                    enable: !0,
                    scrollAmount: 'auto',
                    axis: 'y',
                    deltaFactor: 'auto',
                    disableOver: ['select', 'option', 'keygen', 'datalist', 'textarea'],
                },
                scrollButtons: { scrollType: 'stepless', scrollAmount: 'auto' },
                keyboard: { enable: !0, scrollType: 'stepless', scrollAmount: 'auto' },
                contentTouchScroll: 25,
                documentTouchScroll: !0,
                advanced: {
                    autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                    updateOnContentResize: !0,
                    updateOnImageLoad: 'auto',
                    autoUpdateTimeout: 60,
                },
                theme: 'light',
                callbacks: { onTotalScrollOffset: 0, onTotalScrollBackOffset: 0, alwaysTriggerOffsets: !0 },
            }),
            (a = 0),
            (o = {}),
            (g = window.attachEvent && !window.addEventListener ? 1 : 0),
            (B = !1),
            (x = [
                'mCSB_dragger_onDrag',
                'mCSB_scrollTools_onDrag',
                'mCS_img_loaded',
                'mCS_disabled',
                'mCS_destroyed',
                'mCS_no_scrollbar',
                'mCS-autoHide',
                'mCS-dir-rtl',
                'mCS_no_scrollbar_y',
                'mCS_no_scrollbar_x',
                'mCS_y_hidden',
                'mCS_x_hidden',
                'mCSB_draggerContainer',
                'mCSB_buttonUp',
                'mCSB_buttonDown',
                'mCSB_buttonLeft',
                'mCSB_buttonRight',
            ]),
            (f = {
                init: function (s) {
                    var s = L.extend(!0, {}, r, s),
                        t = c.call(this);
                    if (s.live) {
                        var e = s.liveSelector || this.selector || n,
                            i = L(e);
                        if ('off' === s.live) return void h(e);
                        o[e] = setTimeout(function () {
                            i.mCustomScrollbar(s), 'once' === s.live && i.length && h(e);
                        }, 500);
                    } else h(e);
                    return (
                        (s.setWidth = s.set_width ? s.set_width : s.setWidth),
                        (s.setHeight = s.set_height ? s.set_height : s.setHeight),
                        (s.axis = s.horizontalScroll ? 'x' : d(s.axis)),
                        (s.scrollInertia = 0 < s.scrollInertia && s.scrollInertia < 17 ? 17 : s.scrollInertia),
                        'object' != typeof s.mouseWheel &&
                            1 == s.mouseWheel &&
                            (s.mouseWheel = {
                                enable: !0,
                                scrollAmount: 'auto',
                                axis: 'y',
                                preventDefault: !1,
                                deltaFactor: 'auto',
                                normalizeDelta: !1,
                                invert: !1,
                            }),
                        (s.mouseWheel.scrollAmount = s.mouseWheelPixels ? s.mouseWheelPixels : s.mouseWheel.scrollAmount),
                        (s.mouseWheel.normalizeDelta = s.advanced.normalizeMouseWheelDelta
                            ? s.advanced.normalizeMouseWheelDelta
                            : s.mouseWheel.normalizeDelta),
                        (s.scrollButtons.scrollType = u(s.scrollButtons.scrollType)),
                        l(s),
                        L(t).each(function () {
                            var t = L(this);
                            if (!t.data(R)) {
                                t.data(R, {
                                    idx: ++a,
                                    opt: s,
                                    scrollRatio: { y: null, x: null },
                                    overflowed: null,
                                    contentReset: { y: null, x: null },
                                    bindEvents: !1,
                                    tweenRunning: !1,
                                    sequential: {},
                                    langDir: t.css('direction'),
                                    cbOffsets: null,
                                    trigger: null,
                                    poll: { size: { o: 0, n: 0 }, img: { o: 0, n: 0 }, change: { o: 0, n: 0 } },
                                });
                                var e = t.data(R),
                                    i = e.opt,
                                    n = t.data('mcs-axis'),
                                    r = t.data('mcs-scrollbar-position'),
                                    o = t.data('mcs-theme');
                                n && (i.axis = n),
                                    r && (i.scrollbarPosition = r),
                                    o && ((i.theme = o), l(i)),
                                    m.call(this),
                                    e &&
                                        i.callbacks.onCreate &&
                                        'function' == typeof i.callbacks.onCreate &&
                                        i.callbacks.onCreate.call(this),
                                    L('#mCSB_' + e.idx + '_container img:not(.' + x[2] + ')').addClass(x[2]),
                                    f.update.call(null, t);
                            }
                        })
                    );
                },
                update: function (t, a) {
                    var e = t || c.call(this);
                    return L(e).each(function () {
                        var t = L(this);
                        if (t.data(R)) {
                            var e = t.data(R),
                                i = e.opt,
                                n = L('#mCSB_' + e.idx + '_container'),
                                r = L('#mCSB_' + e.idx),
                                o = [L('#mCSB_' + e.idx + '_dragger_vertical'), L('#mCSB_' + e.idx + '_dragger_horizontal')];
                            if (!n.length) return;
                            e.tweenRunning && X(t),
                                a &&
                                    e &&
                                    i.callbacks.onBeforeUpdate &&
                                    'function' == typeof i.callbacks.onBeforeUpdate &&
                                    i.callbacks.onBeforeUpdate.call(this),
                                t.hasClass(x[3]) && t.removeClass(x[3]),
                                t.hasClass(x[4]) && t.removeClass(x[4]),
                                r.css('max-height', 'none'),
                                r.height() !== t.height() && r.css('max-height', t.height()),
                                y.call(this),
                                'y' === i.axis || i.advanced.autoExpandHorizontalScroll || n.css('width', v(n)),
                                (e.overflowed = k.call(this)),
                                M.call(this),
                                i.autoDraggerLength && _.call(this),
                                w.call(this),
                                S.call(this);
                            var s = [Math.abs(n[0].offsetTop), Math.abs(n[0].offsetLeft)];
                            'x' !== i.axis &&
                                (e.overflowed[0]
                                    ? o[0].height() > o[0].parent().height()
                                        ? C.call(this)
                                        : (Z(t, s[0].toString(), { dir: 'y', dur: 0, overwrite: 'none' }), (e.contentReset.y = null))
                                    : (C.call(this),
                                      'y' === i.axis
                                          ? D.call(this)
                                          : 'yx' === i.axis &&
                                            e.overflowed[1] &&
                                            Z(t, s[1].toString(), { dir: 'x', dur: 0, overwrite: 'none' }))),
                                'y' !== i.axis &&
                                    (e.overflowed[1]
                                        ? o[1].width() > o[1].parent().width()
                                            ? C.call(this)
                                            : (Z(t, s[1].toString(), { dir: 'x', dur: 0, overwrite: 'none' }), (e.contentReset.x = null))
                                        : (C.call(this),
                                          'x' === i.axis
                                              ? D.call(this)
                                              : 'yx' === i.axis &&
                                                e.overflowed[0] &&
                                                Z(t, s[0].toString(), { dir: 'y', dur: 0, overwrite: 'none' }))),
                                a &&
                                    e &&
                                    (2 === a && i.callbacks.onImageLoad && 'function' == typeof i.callbacks.onImageLoad
                                        ? i.callbacks.onImageLoad.call(this)
                                        : 3 === a && i.callbacks.onSelectorChange && 'function' == typeof i.callbacks.onSelectorChange
                                        ? i.callbacks.onSelectorChange.call(this)
                                        : i.callbacks.onUpdate &&
                                          'function' == typeof i.callbacks.onUpdate &&
                                          i.callbacks.onUpdate.call(this)),
                                K.call(this);
                        }
                    });
                },
                scrollTo: function (a, l) {
                    if (void 0 !== a && null != a) {
                        var t = c.call(this);
                        return L(t).each(function () {
                            var t = L(this);
                            if (t.data(R)) {
                                var e = t.data(R),
                                    i = e.opt,
                                    n = {
                                        trigger: 'external',
                                        scrollInertia: i.scrollInertia,
                                        scrollEasing: 'mcsEaseInOut',
                                        moveDragger: !1,
                                        timeout: 60,
                                        callbacks: !0,
                                        onStart: !0,
                                        onUpdate: !0,
                                        onComplete: !0,
                                    },
                                    r = L.extend(!0, {}, n, l),
                                    o = q.call(this, a),
                                    s = 0 < r.scrollInertia && r.scrollInertia < 17 ? 17 : r.scrollInertia;
                                (o[0] = G.call(this, o[0], 'y')),
                                    (o[1] = G.call(this, o[1], 'x')),
                                    r.moveDragger && ((o[0] *= e.scrollRatio.y), (o[1] *= e.scrollRatio.x)),
                                    (r.dur = st() ? 0 : s),
                                    setTimeout(function () {
                                        null !== o[0] &&
                                            void 0 !== o[0] &&
                                            'x' !== i.axis &&
                                            e.overflowed[0] &&
                                            ((r.dir = 'y'), (r.overwrite = 'all'), Z(t, o[0].toString(), r)),
                                            null !== o[1] &&
                                                void 0 !== o[1] &&
                                                'y' !== i.axis &&
                                                e.overflowed[1] &&
                                                ((r.dir = 'x'), (r.overwrite = 'none'), Z(t, o[1].toString(), r));
                                    }, r.timeout);
                            }
                        });
                    }
                },
                stop: function () {
                    var t = c.call(this);
                    return L(t).each(function () {
                        var t = L(this);
                        t.data(R) && X(t);
                    });
                },
                disable: function (e) {
                    var t = c.call(this);
                    return L(t).each(function () {
                        var t = L(this);
                        t.data(R) &&
                            (t.data(R), K.call(this, 'remove'), D.call(this), e && C.call(this), M.call(this, !0), t.addClass(x[3]));
                    });
                },
                destroy: function () {
                    var s = c.call(this);
                    return L(s).each(function () {
                        var t = L(this);
                        if (t.data(R)) {
                            var e = t.data(R),
                                i = e.opt,
                                n = L('#mCSB_' + e.idx),
                                r = L('#mCSB_' + e.idx + '_container'),
                                o = L('.mCSB_' + e.idx + '_scrollbar');
                            i.live && h(i.liveSelector || L(s).selector),
                                K.call(this, 'remove'),
                                D.call(this),
                                C.call(this),
                                t.removeData(R),
                                et(this, 'mcs'),
                                o.remove(),
                                r.find('img.' + x[2]).removeClass(x[2]),
                                n.replaceWith(r.contents()),
                                t
                                    .removeClass(p + ' _' + R + '_' + e.idx + ' ' + x[6] + ' ' + x[7] + ' ' + x[5] + ' ' + x[3])
                                    .addClass(x[4]);
                        }
                    });
                },
            }),
            (c = function () {
                return 'object' != typeof L(this) || L(this).length < 1 ? n : this;
            }),
            (l = function (t) {
                (t.autoDraggerLength =
                    !(-1 < L.inArray(t.theme, ['rounded', 'rounded-dark', 'rounded-dots', 'rounded-dots-dark'])) && t.autoDraggerLength),
                    (t.autoExpandScrollbar =
                        !(
                            -1 <
                            L.inArray(t.theme, [
                                'rounded-dots',
                                'rounded-dots-dark',
                                '3d',
                                '3d-dark',
                                '3d-thick',
                                '3d-thick-dark',
                                'inset',
                                'inset-dark',
                                'inset-2',
                                'inset-2-dark',
                                'inset-3',
                                'inset-3-dark',
                            ])
                        ) && t.autoExpandScrollbar),
                    (t.scrollButtons.enable = !(-1 < L.inArray(t.theme, ['minimal', 'minimal-dark'])) && t.scrollButtons.enable),
                    (t.autoHideScrollbar = -1 < L.inArray(t.theme, ['minimal', 'minimal-dark']) || t.autoHideScrollbar),
                    (t.scrollbarPosition = -1 < L.inArray(t.theme, ['minimal', 'minimal-dark']) ? 'outside' : t.scrollbarPosition);
            }),
            (h = function (t) {
                o[t] && (clearTimeout(o[t]), et(o, t));
            }),
            (d = function (t) {
                return 'yx' === t || 'xy' === t || 'auto' === t ? 'yx' : 'x' === t || 'horizontal' === t ? 'x' : 'y';
            }),
            (u = function (t) {
                return 'stepped' === t || 'pixels' === t || 'step' === t || 'click' === t ? 'stepped' : 'stepless';
            }),
            (m = function () {
                var t = L(this),
                    e = t.data(R),
                    i = e.opt,
                    n = i.autoExpandScrollbar ? ' ' + x[1] + '_expand' : '',
                    r = [
                        "<div id='mCSB_" +
                            e.idx +
                            "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" +
                            e.idx +
                            '_scrollbar mCS-' +
                            i.theme +
                            ' mCSB_scrollTools_vertical' +
                            n +
                            "'><div class='" +
                            x[12] +
                            "'><div id='mCSB_" +
                            e.idx +
                            "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>",
                        "<div id='mCSB_" +
                            e.idx +
                            "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" +
                            e.idx +
                            '_scrollbar mCS-' +
                            i.theme +
                            ' mCSB_scrollTools_horizontal' +
                            n +
                            "'><div class='" +
                            x[12] +
                            "'><div id='mCSB_" +
                            e.idx +
                            "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>",
                    ],
                    o = 'yx' === i.axis ? 'mCSB_vertical_horizontal' : 'x' === i.axis ? 'mCSB_horizontal' : 'mCSB_vertical',
                    s = 'yx' === i.axis ? r[0] + r[1] : 'x' === i.axis ? r[1] : r[0],
                    a = 'yx' === i.axis ? "<div id='mCSB_" + e.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : '',
                    l = i.autoHideScrollbar ? ' ' + x[6] : '',
                    c = 'x' !== i.axis && 'rtl' === e.langDir ? ' ' + x[7] : '';
                i.setWidth && t.css('width', i.setWidth),
                    i.setHeight && t.css('height', i.setHeight),
                    (i.setLeft = 'y' !== i.axis && 'rtl' === e.langDir ? '989999px' : i.setLeft),
                    t
                        .addClass(p + ' _' + R + '_' + e.idx + l + c)
                        .wrapInner(
                            "<div id='mCSB_" +
                                e.idx +
                                "' class='mCustomScrollBox mCS-" +
                                i.theme +
                                ' ' +
                                o +
                                "'><div id='mCSB_" +
                                e.idx +
                                "_container' class='mCSB_container' style='position:relative; top:" +
                                i.setTop +
                                '; left:' +
                                i.setLeft +
                                ";' dir='" +
                                e.langDir +
                                "' /></div>"
                        );
                var h = L('#mCSB_' + e.idx),
                    d = L('#mCSB_' + e.idx + '_container');
                'y' === i.axis || i.advanced.autoExpandHorizontalScroll || d.css('width', v(d)),
                    'outside' === i.scrollbarPosition
                        ? ('static' === t.css('position') && t.css('position', 'relative'),
                          t.css('overflow', 'visible'),
                          h.addClass('mCSB_outside').after(s))
                        : (h.addClass('mCSB_inside').append(s), d.wrap(a)),
                    b.call(this);
                var u = [L('#mCSB_' + e.idx + '_dragger_vertical'), L('#mCSB_' + e.idx + '_dragger_horizontal')];
                u[0].css('min-height', u[0].height()), u[1].css('min-width', u[1].width());
            }),
            (v = function (t) {
                var e = [
                        t[0].scrollWidth,
                        Math.max.apply(
                            Math,
                            t
                                .children()
                                .map(function () {
                                    return L(this).outerWidth(!0);
                                })
                                .get()
                        ),
                    ],
                    i = t.parent().width();
                return i < e[0] ? e[0] : i < e[1] ? e[1] : '100%';
            }),
            (y = function () {
                var t = L(this),
                    e = t.data(R),
                    i = e.opt,
                    n = L('#mCSB_' + e.idx + '_container');
                if (i.advanced.autoExpandHorizontalScroll && 'y' !== i.axis) {
                    n.css({ width: 'auto', 'min-width': 0, 'overflow-x': 'scroll' });
                    var r = Math.ceil(n[0].scrollWidth);
                    3 === i.advanced.autoExpandHorizontalScroll || (2 !== i.advanced.autoExpandHorizontalScroll && r > n.parent().width())
                        ? n.css({ width: r, 'min-width': '100%', 'overflow-x': 'inherit' })
                        : n
                              .css({ 'overflow-x': 'inherit', position: 'absolute' })
                              .wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />")
                              .css({
                                  width:
                                      Math.ceil(n[0].getBoundingClientRect().right + 0.4) - Math.floor(n[0].getBoundingClientRect().left),
                                  'min-width': '100%',
                                  position: 'relative',
                              })
                              .unwrap();
                }
            }),
            (b = function () {
                var t = L(this),
                    e = t.data(R),
                    i = e.opt,
                    n = L('.mCSB_' + e.idx + '_scrollbar:first'),
                    r = rt(i.scrollButtons.tabindex) ? "tabindex='" + i.scrollButtons.tabindex + "'" : '',
                    o = [
                        "<a href='#' class='" + x[13] + "' " + r + ' />',
                        "<a href='#' class='" + x[14] + "' " + r + ' />',
                        "<a href='#' class='" + x[15] + "' " + r + ' />',
                        "<a href='#' class='" + x[16] + "' " + r + ' />',
                    ],
                    s = ['x' === i.axis ? o[2] : o[0], 'x' === i.axis ? o[3] : o[1], o[2], o[3]];
                i.scrollButtons.enable && n.prepend(s[0]).append(s[1]).next('.mCSB_scrollTools').prepend(s[2]).append(s[3]);
            }),
            (_ = function () {
                var t = L(this),
                    e = t.data(R),
                    i = L('#mCSB_' + e.idx),
                    n = L('#mCSB_' + e.idx + '_container'),
                    r = [L('#mCSB_' + e.idx + '_dragger_vertical'), L('#mCSB_' + e.idx + '_dragger_horizontal')],
                    o = [i.height() / n.outerHeight(!1), i.width() / n.outerWidth(!1)],
                    s = [
                        parseInt(r[0].css('min-height')),
                        Math.round(o[0] * r[0].parent().height()),
                        parseInt(r[1].css('min-width')),
                        Math.round(o[1] * r[1].parent().width()),
                    ],
                    a = g && s[1] < s[0] ? s[0] : s[1],
                    l = g && s[3] < s[2] ? s[2] : s[3];
                r[0]
                    .css({ height: a, 'max-height': r[0].parent().height() - 10 })
                    .find('.mCSB_dragger_bar')
                    .css({ 'line-height': s[0] + 'px' }),
                    r[1].css({ width: l, 'max-width': r[1].parent().width() - 10 });
            }),
            (w = function () {
                var t = L(this),
                    e = t.data(R),
                    i = L('#mCSB_' + e.idx),
                    n = L('#mCSB_' + e.idx + '_container'),
                    r = [L('#mCSB_' + e.idx + '_dragger_vertical'), L('#mCSB_' + e.idx + '_dragger_horizontal')],
                    o = [n.outerHeight(!1) - i.height(), n.outerWidth(!1) - i.width()],
                    s = [o[0] / (r[0].parent().height() - r[0].height()), o[1] / (r[1].parent().width() - r[1].width())];
                e.scrollRatio = { y: s[0], x: s[1] };
            }),
            (T = function (t, e, i) {
                var n = i ? x[0] + '_expanded' : '',
                    r = t.closest('.mCSB_scrollTools');
                'active' === e
                    ? (t.toggleClass(x[0] + ' ' + n), r.toggleClass(x[1]), (t[0]._draggable = t[0]._draggable ? 0 : 1))
                    : t[0]._draggable || ('hide' === e ? (t.removeClass(x[0]), r.removeClass(x[1])) : (t.addClass(x[0]), r.addClass(x[1])));
            }),
            (k = function () {
                var t = L(this),
                    e = t.data(R),
                    i = L('#mCSB_' + e.idx),
                    n = L('#mCSB_' + e.idx + '_container'),
                    r = null == e.overflowed ? n.height() : n.outerHeight(!1),
                    o = null == e.overflowed ? n.width() : n.outerWidth(!1),
                    s = n[0].scrollHeight,
                    a = n[0].scrollWidth;
                return r < s && (r = s), o < a && (o = a), [r > i.height(), o > i.width()];
            }),
            (C = function () {
                var t = L(this),
                    e = t.data(R),
                    i = e.opt,
                    n = L('#mCSB_' + e.idx),
                    r = L('#mCSB_' + e.idx + '_container'),
                    o = [L('#mCSB_' + e.idx + '_dragger_vertical'), L('#mCSB_' + e.idx + '_dragger_horizontal')];
                if (
                    (X(t),
                    (('x' !== i.axis && !e.overflowed[0]) || ('y' === i.axis && e.overflowed[0])) &&
                        (o[0].add(r).css('top', 0), Z(t, '_resetY')),
                    ('y' !== i.axis && !e.overflowed[1]) || ('x' === i.axis && e.overflowed[1]))
                ) {
                    var s = (dx = 0);
                    'rtl' === e.langDir && ((s = n.width() - r.outerWidth(!1)), (dx = Math.abs(s / e.scrollRatio.x))),
                        r.css('left', s),
                        o[1].css('left', dx),
                        Z(t, '_resetX');
                }
            }),
            (S = function () {
                var e = L(this),
                    t = e.data(R),
                    i = t.opt;
                if (!t.bindEvents) {
                    var n;
                    if ((s.call(this), i.contentTouchScroll && A.call(this), E.call(this), i.mouseWheel.enable))
                        !(function t() {
                            n = setTimeout(function () {
                                L.event.special.mousewheel ? (clearTimeout(n), P.call(e[0])) : t();
                            }, 100);
                        })();
                    j.call(this),
                        U.call(this),
                        i.advanced.autoScrollOnFocus && F.call(this),
                        i.scrollButtons.enable && W.call(this),
                        i.keyboard.enable && Y.call(this),
                        (t.bindEvents = !0);
                }
            }),
            (D = function () {
                var t = L(this),
                    e = t.data(R),
                    i = e.opt,
                    n = 'mCS_' + e.idx,
                    r = '.mCSB_' + e.idx + '_scrollbar',
                    o = L(
                        '#mCSB_' +
                            e.idx +
                            ',#mCSB_' +
                            e.idx +
                            '_container,#mCSB_' +
                            e.idx +
                            '_container_wrapper,' +
                            r +
                            ' .' +
                            x[12] +
                            ',#mCSB_' +
                            e.idx +
                            '_dragger_vertical,#mCSB_' +
                            e.idx +
                            '_dragger_horizontal,' +
                            r +
                            '>a'
                    ),
                    s = L('#mCSB_' + e.idx + '_container');
                i.advanced.releaseDraggableSelectors && o.add(L(i.advanced.releaseDraggableSelectors)),
                    i.advanced.extraDraggableSelectors && o.add(L(i.advanced.extraDraggableSelectors)),
                    e.bindEvents &&
                        (L(document)
                            .add(L(!z() || top.document))
                            .unbind('.' + n),
                        o.each(function () {
                            L(this).unbind('.' + n);
                        }),
                        clearTimeout(t[0]._focusTimeout),
                        et(t[0], '_focusTimeout'),
                        clearTimeout(e.sequential.step),
                        et(e.sequential, 'step'),
                        clearTimeout(s[0].onCompleteTimeout),
                        et(s[0], 'onCompleteTimeout'),
                        (e.bindEvents = !1));
            }),
            (M = function (t) {
                var e = L(this),
                    i = e.data(R),
                    n = i.opt,
                    r = L('#mCSB_' + i.idx + '_container_wrapper'),
                    o = r.length ? r : L('#mCSB_' + i.idx + '_container'),
                    s = [L('#mCSB_' + i.idx + '_scrollbar_vertical'), L('#mCSB_' + i.idx + '_scrollbar_horizontal')],
                    a = [s[0].find('.mCSB_dragger'), s[1].find('.mCSB_dragger')];
                'x' !== n.axis &&
                    (i.overflowed[0] && !t
                        ? (s[0].add(a[0]).add(s[0].children('a')).css('display', 'block'), o.removeClass(x[8] + ' ' + x[10]))
                        : (n.alwaysShowScrollbar
                              ? (2 !== n.alwaysShowScrollbar && a[0].css('display', 'none'), o.removeClass(x[10]))
                              : (s[0].css('display', 'none'), o.addClass(x[10])),
                          o.addClass(x[8]))),
                    'y' !== n.axis &&
                        (i.overflowed[1] && !t
                            ? (s[1].add(a[1]).add(s[1].children('a')).css('display', 'block'), o.removeClass(x[9] + ' ' + x[11]))
                            : (n.alwaysShowScrollbar
                                  ? (2 !== n.alwaysShowScrollbar && a[1].css('display', 'none'), o.removeClass(x[11]))
                                  : (s[1].css('display', 'none'), o.addClass(x[11])),
                              o.addClass(x[9]))),
                    i.overflowed[0] || i.overflowed[1] ? e.removeClass(x[5]) : e.addClass(x[5]);
            }),
            (H = function (t) {
                var e = t.type,
                    i =
                        t.target.ownerDocument !== document && null !== frameElement
                            ? [L(frameElement).offset().top, L(frameElement).offset().left]
                            : null,
                    n =
                        z() && t.target.ownerDocument !== top.document && null !== frameElement
                            ? [L(t.view.frameElement).offset().top, L(t.view.frameElement).offset().left]
                            : [0, 0];
                switch (e) {
                    case 'pointerdown':
                    case 'MSPointerDown':
                    case 'pointermove':
                    case 'MSPointerMove':
                    case 'pointerup':
                    case 'MSPointerUp':
                        return i
                            ? [t.originalEvent.pageY - i[0] + n[0], t.originalEvent.pageX - i[1] + n[1], !1]
                            : [t.originalEvent.pageY, t.originalEvent.pageX, !1];
                    case 'touchstart':
                    case 'touchmove':
                    case 'touchend':
                        var r = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0],
                            o = t.originalEvent.touches.length || t.originalEvent.changedTouches.length;
                        return t.target.ownerDocument !== document ? [r.screenY, r.screenX, 1 < o] : [r.pageY, r.pageX, 1 < o];
                    default:
                        return i ? [t.pageY - i[0] + n[0], t.pageX - i[1] + n[1], !1] : [t.pageY, t.pageX, !1];
                }
            }),
            (s = function () {
                var s,
                    a,
                    l,
                    c = L(this),
                    h = c.data(R),
                    d = h.opt,
                    t = 'mCS_' + h.idx,
                    u = ['mCSB_' + h.idx + '_dragger_vertical', 'mCSB_' + h.idx + '_dragger_horizontal'],
                    p = L('#mCSB_' + h.idx + '_container'),
                    e = L('#' + u[0] + ',#' + u[1]),
                    i = d.advanced.releaseDraggableSelectors ? e.add(L(d.advanced.releaseDraggableSelectors)) : e,
                    n = d.advanced.extraDraggableSelectors
                        ? L(!z() || top.document).add(L(d.advanced.extraDraggableSelectors))
                        : L(!z() || top.document);
                function r(t, e, i, n) {
                    if (((p[0].idleTimer = d.scrollInertia < 233 ? 250 : 0), s.attr('id') === u[1]))
                        var r = 'x',
                            o = (s[0].offsetLeft - e + n) * h.scrollRatio.x;
                    else
                        var r = 'y',
                            o = (s[0].offsetTop - t + i) * h.scrollRatio.y;
                    Z(c, o.toString(), { dir: r, drag: !0 });
                }
                e
                    .bind('contextmenu.' + t, function (t) {
                        t.preventDefault();
                    })
                    .bind('mousedown.' + t + ' touchstart.' + t + ' pointerdown.' + t + ' MSPointerDown.' + t, function (t) {
                        if ((t.stopImmediatePropagation(), t.preventDefault(), it(t))) {
                            (B = !0),
                                g &&
                                    (document.onselectstart = function () {
                                        return !1;
                                    }),
                                O.call(p, !1),
                                X(c);
                            var e = (s = L(this)).offset(),
                                i = H(t)[0] - e.top,
                                n = H(t)[1] - e.left,
                                r = s.height() + e.top,
                                o = s.width() + e.left;
                            i < r && 0 < i && n < o && 0 < n && ((a = i), (l = n)), T(s, 'active', d.autoExpandScrollbar);
                        }
                    })
                    .bind('touchmove.' + t, function (t) {
                        t.stopImmediatePropagation(), t.preventDefault();
                        var e = s.offset(),
                            i = H(t)[0] - e.top,
                            n = H(t)[1] - e.left;
                        r(a, l, i, n);
                    }),
                    L(document)
                        .add(n)
                        .bind('mousemove.' + t + ' pointermove.' + t + ' MSPointerMove.' + t, function (t) {
                            if (s) {
                                var e = s.offset(),
                                    i = H(t)[0] - e.top,
                                    n = H(t)[1] - e.left;
                                if (a === i && l === n) return;
                                r(a, l, i, n);
                            }
                        })
                        .add(i)
                        .bind('mouseup.' + t + ' touchend.' + t + ' pointerup.' + t + ' MSPointerUp.' + t, function (t) {
                            s && (T(s, 'active', d.autoExpandScrollbar), (s = null)),
                                (B = !1),
                                g && (document.onselectstart = null),
                                O.call(p, !0);
                        });
            }),
            (A = function () {
                var h,
                    c,
                    d,
                    u,
                    p,
                    f,
                    m,
                    g,
                    v,
                    y,
                    b,
                    _,
                    x,
                    w,
                    k = L(this),
                    C = k.data(R),
                    S = C.opt,
                    t = 'mCS_' + C.idx,
                    D = L('#mCSB_' + C.idx),
                    T = L('#mCSB_' + C.idx + '_container'),
                    M = [L('#mCSB_' + C.idx + '_dragger_vertical'), L('#mCSB_' + C.idx + '_dragger_horizontal')],
                    A = [],
                    E = [],
                    P = 0,
                    I = 'yx' === S.axis ? 'none' : 'all',
                    O = [],
                    e = T.find('iframe'),
                    i = [
                        'touchstart.' + t + ' pointerdown.' + t + ' MSPointerDown.' + t,
                        'touchmove.' + t + ' pointermove.' + t + ' MSPointerMove.' + t,
                        'touchend.' + t + ' pointerup.' + t + ' MSPointerUp.' + t,
                    ],
                    N = void 0 !== document.body.style.touchAction && '' !== document.body.style.touchAction;
                function n(t) {
                    if (!nt(t) || B || H(t)[2]) $ = 0;
                    else {
                        (w = x = 0), (h = $ = 1), k.removeClass('mCS_touch_action');
                        var e = T.offset();
                        (c = H(t)[0] - e.top), (d = H(t)[1] - e.left), (O = [H(t)[0], H(t)[1]]);
                    }
                }
                function r(t) {
                    if (
                        nt(t) &&
                        !B &&
                        !H(t)[2] &&
                        (S.documentTouchScroll || t.preventDefault(), t.stopImmediatePropagation(), (!w || x) && h)
                    ) {
                        m = J();
                        var e = D.offset(),
                            i = H(t)[0] - e.top,
                            n = H(t)[1] - e.left,
                            r = 'mcsLinearOut';
                        if ((A.push(i), E.push(n), (O[2] = Math.abs(H(t)[0] - O[0])), (O[3] = Math.abs(H(t)[1] - O[1])), C.overflowed[0]))
                            var o = M[0].parent().height() - M[0].height(),
                                s = 0 < c - i && i - c > -o * C.scrollRatio.y && (2 * O[3] < O[2] || 'yx' === S.axis);
                        if (C.overflowed[1])
                            var a = M[1].parent().width() - M[1].width(),
                                l = 0 < d - n && n - d > -a * C.scrollRatio.x && (2 * O[2] < O[3] || 'yx' === S.axis);
                        s || l ? (N || t.preventDefault(), (x = 1)) : ((w = 1), k.addClass('mCS_touch_action')),
                            N && t.preventDefault(),
                            (b = 'yx' === S.axis ? [c - i, d - n] : 'x' === S.axis ? [null, d - n] : [c - i, null]),
                            (T[0].idleTimer = 250),
                            C.overflowed[0] && F(b[0], P, r, 'y', 'all', !0),
                            C.overflowed[1] && F(b[1], P, r, 'x', I, !0);
                    }
                }
                function o(t) {
                    if (!nt(t) || B || H(t)[2]) $ = 0;
                    else {
                        ($ = 1), t.stopImmediatePropagation(), X(k), (f = J());
                        var e = D.offset();
                        (u = H(t)[0] - e.top), (p = H(t)[1] - e.left), (A = []), (E = []);
                    }
                }
                function s(t) {
                    if (nt(t) && !B && !H(t)[2]) {
                        (h = 0), t.stopImmediatePropagation(), (w = x = 0), (g = J());
                        var e = D.offset(),
                            i = H(t)[0] - e.top,
                            n = H(t)[1] - e.left;
                        if (!(30 < g - m)) {
                            var r = 'mcsEaseOut',
                                o = (y = 1e3 / (g - f)) < 2.5,
                                s = o ? [A[A.length - 2], E[E.length - 2]] : [0, 0];
                            v = o ? [i - s[0], n - s[1]] : [i - u, n - p];
                            var a = [Math.abs(v[0]), Math.abs(v[1])];
                            y = o ? [Math.abs(v[0] / 4), Math.abs(v[1] / 4)] : [y, y];
                            var l = [
                                Math.abs(T[0].offsetTop) - v[0] * j(a[0] / y[0], y[0]),
                                Math.abs(T[0].offsetLeft) - v[1] * j(a[1] / y[1], y[1]),
                            ];
                            (b = 'yx' === S.axis ? [l[0], l[1]] : 'x' === S.axis ? [null, l[1]] : [l[0], null]),
                                (_ = [4 * a[0] + S.scrollInertia, 4 * a[1] + S.scrollInertia]);
                            var c = parseInt(S.contentTouchScroll) || 0;
                            (b[0] = c < a[0] ? b[0] : 0),
                                (b[1] = c < a[1] ? b[1] : 0),
                                C.overflowed[0] && F(b[0], _[0], r, 'y', I, !1),
                                C.overflowed[1] && F(b[1], _[1], r, 'x', I, !1);
                        }
                    }
                }
                function j(t, e) {
                    var i = [1.5 * e, 2 * e, e / 1.5, e / 2];
                    return 90 < t
                        ? 4 < e
                            ? i[0]
                            : i[3]
                        : 60 < t
                        ? 3 < e
                            ? i[3]
                            : i[2]
                        : 30 < t
                        ? 8 < e
                            ? i[1]
                            : 6 < e
                            ? i[0]
                            : 4 < e
                            ? e
                            : i[2]
                        : 8 < e
                        ? e
                        : i[3];
                }
                function F(t, e, i, n, r, o) {
                    t && Z(k, t.toString(), { dur: e, scrollEasing: i, dir: n, overwrite: r, drag: o });
                }
                T.bind(i[0], function (t) {
                    n(t);
                }).bind(i[1], function (t) {
                    r(t);
                }),
                    D.bind(i[0], function (t) {
                        o(t);
                    }).bind(i[2], function (t) {
                        s(t);
                    }),
                    e.length &&
                        e.each(function () {
                            L(this).bind('load', function () {
                                z(this) &&
                                    L(this.contentDocument || this.contentWindow.document)
                                        .bind(i[0], function (t) {
                                            n(t), o(t);
                                        })
                                        .bind(i[1], function (t) {
                                            r(t);
                                        })
                                        .bind(i[2], function (t) {
                                            s(t);
                                        });
                            });
                        });
            }),
            (E = function () {
                var r,
                    n = L(this),
                    o = n.data(R),
                    s = o.opt,
                    a = o.sequential,
                    t = 'mCS_' + o.idx,
                    l = L('#mCSB_' + o.idx + '_container'),
                    c = l.parent();
                function h(t, e, i) {
                    (a.type = i && r ? 'stepped' : 'stepless'), (a.scrollAmount = 10), V(n, t, e, 'mcsLinearOut', i ? 60 : null);
                }
                l.bind('mousedown.' + t, function (t) {
                    $ || r || ((r = 1), (B = !0));
                })
                    .add(document)
                    .bind('mousemove.' + t, function (t) {
                        if (
                            !$ &&
                            r &&
                            (window.getSelection
                                ? window.getSelection().toString()
                                : document.selection && 'Control' != document.selection.type && document.selection.createRange().text)
                        ) {
                            var e = l.offset(),
                                i = H(t)[0] - e.top + l[0].offsetTop,
                                n = H(t)[1] - e.left + l[0].offsetLeft;
                            0 < i && i < c.height() && 0 < n && n < c.width()
                                ? a.step && h('off', null, 'stepped')
                                : ('x' !== s.axis && o.overflowed[0] && (i < 0 ? h('on', 38) : i > c.height() && h('on', 40)),
                                  'y' !== s.axis && o.overflowed[1] && (n < 0 ? h('on', 37) : n > c.width() && h('on', 39)));
                        }
                    })
                    .bind('mouseup.' + t + ' dragend.' + t, function (t) {
                        $ || (r && ((r = 0), h('off', null)), (B = !1));
                    });
            }),
            (P = function () {
                if (L(this).data(R)) {
                    var d = L(this),
                        u = d.data(R),
                        p = u.opt,
                        t = 'mCS_' + u.idx,
                        f = L('#mCSB_' + u.idx),
                        m = [L('#mCSB_' + u.idx + '_dragger_vertical'), L('#mCSB_' + u.idx + '_dragger_horizontal')],
                        e = L('#mCSB_' + u.idx + '_container').find('iframe');
                    e.length &&
                        e.each(function () {
                            L(this).bind('load', function () {
                                z(this) &&
                                    L(this.contentDocument || this.contentWindow.document).bind('mousewheel.' + t, function (t, e) {
                                        i(t, e);
                                    });
                            });
                        }),
                        f.bind('mousewheel.' + t, function (t, e) {
                            i(t, e);
                        });
                }
                function i(t, e) {
                    if ((X(d), !N(d, t.target))) {
                        var i =
                                'auto' !== p.mouseWheel.deltaFactor
                                    ? parseInt(p.mouseWheel.deltaFactor)
                                    : g && t.deltaFactor < 100
                                    ? 100
                                    : t.deltaFactor || 100,
                            n = p.scrollInertia;
                        if ('x' === p.axis || 'x' === p.mouseWheel.axis)
                            var r = 'x',
                                o = [Math.round(i * u.scrollRatio.x), parseInt(p.mouseWheel.scrollAmount)],
                                s = 'auto' !== p.mouseWheel.scrollAmount ? o[1] : o[0] >= f.width() ? 0.9 * f.width() : o[0],
                                a = Math.abs(L('#mCSB_' + u.idx + '_container')[0].offsetLeft),
                                l = m[1][0].offsetLeft,
                                c = m[1].parent().width() - m[1].width(),
                                h = 'y' === p.mouseWheel.axis ? t.deltaY || e : t.deltaX;
                        else
                            var r = 'y',
                                o = [Math.round(i * u.scrollRatio.y), parseInt(p.mouseWheel.scrollAmount)],
                                s = 'auto' !== p.mouseWheel.scrollAmount ? o[1] : o[0] >= f.height() ? 0.9 * f.height() : o[0],
                                a = Math.abs(L('#mCSB_' + u.idx + '_container')[0].offsetTop),
                                l = m[0][0].offsetTop,
                                c = m[0].parent().height() - m[0].height(),
                                h = t.deltaY || e;
                        ('y' === r && !u.overflowed[0]) ||
                            ('x' === r && !u.overflowed[1]) ||
                            ((p.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (h = -h),
                            p.mouseWheel.normalizeDelta && (h = h < 0 ? -1 : 1),
                            ((0 < h && 0 !== l) || (h < 0 && l !== c) || p.mouseWheel.preventDefault) &&
                                (t.stopImmediatePropagation(), t.preventDefault()),
                            t.deltaFactor < 5 && !p.mouseWheel.normalizeDelta && ((s = t.deltaFactor), (n = 17)),
                            Z(d, (a - h * s).toString(), { dir: r, dur: n }));
                    }
                }
            }),
            (I = new Object()),
            (z = function (t) {
                var e = !1,
                    i = !1,
                    n = null;
                if ((void 0 === t ? (i = '#empty') : void 0 !== L(t).attr('id') && (i = L(t).attr('id')), !1 !== i && void 0 !== I[i]))
                    return I[i];
                if (t) {
                    try {
                        var r = t.contentDocument || t.contentWindow.document;
                        n = r.body.innerHTML;
                    } catch (t) {}
                    e = null !== n;
                } else {
                    try {
                        var r = top.document;
                        n = r.body.innerHTML;
                    } catch (t) {}
                    e = null !== n;
                }
                return !1 !== i && (I[i] = e), e;
            }),
            (O = function (t) {
                var e = this.find('iframe');
                if (e.length) {
                    var i = t ? 'auto' : 'none';
                    e.css('pointer-events', i);
                }
            }),
            (N = function (t, e) {
                var i = e.nodeName.toLowerCase(),
                    n = t.data(R).opt.mouseWheel.disableOver;
                return -1 < L.inArray(i, n) && !(-1 < L.inArray(i, ['select', 'textarea']) && !L(e).is(':focus'));
            }),
            (j = function () {
                var s,
                    a = L(this),
                    l = a.data(R),
                    t = 'mCS_' + l.idx,
                    c = L('#mCSB_' + l.idx + '_container'),
                    h = c.parent(),
                    e = L('.mCSB_' + l.idx + '_scrollbar .' + x[12]);
                e.bind('mousedown.' + t + ' touchstart.' + t + ' pointerdown.' + t + ' MSPointerDown.' + t, function (t) {
                    (B = !0), L(t.target).hasClass('mCSB_dragger') || (s = 1);
                })
                    .bind('touchend.' + t + ' pointerup.' + t + ' MSPointerUp.' + t, function (t) {
                        B = !1;
                    })
                    .bind('click.' + t, function (t) {
                        if (s && ((s = 0), L(t.target).hasClass(x[12]) || L(t.target).hasClass('mCSB_draggerRail'))) {
                            X(a);
                            var e = L(this),
                                i = e.find('.mCSB_dragger');
                            if (0 < e.parent('.mCSB_scrollTools_horizontal').length) {
                                if (!l.overflowed[1]) return;
                                var n = 'x',
                                    r = t.pageX > i.offset().left ? -1 : 1,
                                    o = Math.abs(c[0].offsetLeft) - r * (0.9 * h.width());
                            } else {
                                if (!l.overflowed[0]) return;
                                var n = 'y',
                                    r = t.pageY > i.offset().top ? -1 : 1,
                                    o = Math.abs(c[0].offsetTop) - r * (0.9 * h.height());
                            }
                            Z(a, o.toString(), { dir: n, scrollEasing: 'mcsEaseInOut' });
                        }
                    });
            }),
            (F = function () {
                var o = L(this),
                    t = o.data(R),
                    s = t.opt,
                    e = 'mCS_' + t.idx,
                    a = L('#mCSB_' + t.idx + '_container'),
                    l = a.parent();
                a.bind('focusin.' + e, function (t) {
                    var r = L(document.activeElement),
                        e = a.find('.mCustomScrollBox').length;
                    r.is(s.advanced.autoScrollOnFocus) &&
                        (X(o),
                        clearTimeout(o[0]._focusTimeout),
                        (o[0]._focusTimer = e ? 17 * e : 0),
                        (o[0]._focusTimeout = setTimeout(function () {
                            var t = [ot(r)[0], ot(r)[1]],
                                e = [a[0].offsetTop, a[0].offsetLeft],
                                i = [
                                    0 <= e[0] + t[0] && e[0] + t[0] < l.height() - r.outerHeight(!1),
                                    0 <= e[1] + t[1] && e[0] + t[1] < l.width() - r.outerWidth(!1),
                                ],
                                n = 'yx' !== s.axis || i[0] || i[1] ? 'all' : 'none';
                            'x' === s.axis ||
                                i[0] ||
                                Z(o, t[0].toString(), { dir: 'y', scrollEasing: 'mcsEaseInOut', overwrite: n, dur: 0 }),
                                'y' === s.axis ||
                                    i[1] ||
                                    Z(o, t[1].toString(), { dir: 'x', scrollEasing: 'mcsEaseInOut', overwrite: n, dur: 0 });
                        }, o[0]._focusTimer)));
                });
            }),
            (U = function () {
                var t = L(this),
                    e = t.data(R),
                    i = 'mCS_' + e.idx,
                    n = L('#mCSB_' + e.idx + '_container').parent();
                n.bind('scroll.' + i, function (t) {
                    (0 === n.scrollTop() && 0 === n.scrollLeft()) || L('.mCSB_' + e.idx + '_scrollbar').css('visibility', 'hidden');
                });
            }),
            (W = function () {
                var n = L(this),
                    r = n.data(R),
                    o = r.opt,
                    s = r.sequential,
                    t = 'mCS_' + r.idx,
                    e = '.mCSB_' + r.idx + '_scrollbar',
                    i = L(e + '>a');
                i.bind('contextmenu.' + t, function (t) {
                    t.preventDefault();
                }).bind(
                    'mousedown.' +
                        t +
                        ' touchstart.' +
                        t +
                        ' pointerdown.' +
                        t +
                        ' MSPointerDown.' +
                        t +
                        ' mouseup.' +
                        t +
                        ' touchend.' +
                        t +
                        ' pointerup.' +
                        t +
                        ' MSPointerUp.' +
                        t +
                        ' mouseout.' +
                        t +
                        ' pointerout.' +
                        t +
                        ' MSPointerOut.' +
                        t +
                        ' click.' +
                        t,
                    function (t) {
                        if ((t.preventDefault(), it(t))) {
                            var e = L(this).attr('class');
                            switch (((s.type = o.scrollButtons.scrollType), t.type)) {
                                case 'mousedown':
                                case 'touchstart':
                                case 'pointerdown':
                                case 'MSPointerDown':
                                    if ('stepped' === s.type) return;
                                    (B = !0), (r.tweenRunning = !1), i('on', e);
                                    break;
                                case 'mouseup':
                                case 'touchend':
                                case 'pointerup':
                                case 'MSPointerUp':
                                case 'mouseout':
                                case 'pointerout':
                                case 'MSPointerOut':
                                    if ('stepped' === s.type) return;
                                    (B = !1), s.dir && i('off', e);
                                    break;
                                case 'click':
                                    if ('stepped' !== s.type || r.tweenRunning) return;
                                    i('on', e);
                            }
                        }
                        function i(t, e) {
                            (s.scrollAmount = o.scrollButtons.scrollAmount), V(n, t, e);
                        }
                    }
                );
            }),
            (Y = function () {
                var a = L(this),
                    l = a.data(R),
                    c = l.opt,
                    h = l.sequential,
                    t = 'mCS_' + l.idx,
                    e = L('#mCSB_' + l.idx),
                    d = L('#mCSB_' + l.idx + '_container'),
                    u = d.parent(),
                    p = "input,textarea,select,datalist,keygen,[contenteditable='true']",
                    i = d.find('iframe'),
                    n = ['blur.' + t + ' keydown.' + t + ' keyup.' + t];
                function r(t) {
                    switch (t.type) {
                        case 'blur':
                            l.tweenRunning && h.dir && s('off', null);
                            break;
                        case 'keydown':
                        case 'keyup':
                            var e = t.keyCode ? t.keyCode : t.which,
                                i = 'on';
                            if (('x' !== c.axis && (38 === e || 40 === e)) || ('y' !== c.axis && (37 === e || 39 === e))) {
                                if (((38 === e || 40 === e) && !l.overflowed[0]) || ((37 === e || 39 === e) && !l.overflowed[1])) return;
                                'keyup' === t.type && (i = 'off'),
                                    L(document.activeElement).is(p) || (t.preventDefault(), t.stopImmediatePropagation(), s(i, e));
                            } else if (33 === e || 34 === e) {
                                if (
                                    ((l.overflowed[0] || l.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()),
                                    'keyup' === t.type)
                                ) {
                                    X(a);
                                    var n = 34 === e ? -1 : 1;
                                    if ('x' === c.axis || ('yx' === c.axis && l.overflowed[1] && !l.overflowed[0]))
                                        var r = 'x',
                                            o = Math.abs(d[0].offsetLeft) - n * (0.9 * u.width());
                                    else
                                        var r = 'y',
                                            o = Math.abs(d[0].offsetTop) - n * (0.9 * u.height());
                                    Z(a, o.toString(), { dir: r, scrollEasing: 'mcsEaseInOut' });
                                }
                            } else if (
                                (35 === e || 36 === e) &&
                                !L(document.activeElement).is(p) &&
                                ((l.overflowed[0] || l.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()),
                                'keyup' === t.type)
                            ) {
                                if ('x' === c.axis || ('yx' === c.axis && l.overflowed[1] && !l.overflowed[0]))
                                    var r = 'x',
                                        o = 35 === e ? Math.abs(u.width() - d.outerWidth(!1)) : 0;
                                else
                                    var r = 'y',
                                        o = 35 === e ? Math.abs(u.height() - d.outerHeight(!1)) : 0;
                                Z(a, o.toString(), { dir: r, scrollEasing: 'mcsEaseInOut' });
                            }
                    }
                    function s(t, e) {
                        (h.type = c.keyboard.scrollType),
                            (h.scrollAmount = c.keyboard.scrollAmount),
                            ('stepped' === h.type && l.tweenRunning) || V(a, t, e);
                    }
                }
                i.length &&
                    i.each(function () {
                        L(this).bind('load', function () {
                            z(this) &&
                                L(this.contentDocument || this.contentWindow.document).bind(n[0], function (t) {
                                    r(t);
                                });
                        });
                    }),
                    e.attr('tabindex', '0').bind(n[0], function (t) {
                        r(t);
                    });
            }),
            (V = function (d, t, e, u, p) {
                var f = d.data(R),
                    m = f.opt,
                    g = f.sequential,
                    v = L('#mCSB_' + f.idx + '_container'),
                    i = 'stepped' === g.type,
                    y = m.scrollInertia < 26 ? 26 : m.scrollInertia,
                    b = m.scrollInertia < 1 ? 17 : m.scrollInertia;
                switch (t) {
                    case 'on':
                        if (
                            ((g.dir = [
                                e === x[16] || e === x[15] || 39 === e || 37 === e ? 'x' : 'y',
                                e === x[13] || e === x[15] || 38 === e || 37 === e ? -1 : 1,
                            ]),
                            X(d),
                            rt(e) && 'stepped' === g.type)
                        )
                            return;
                        _(i);
                        break;
                    case 'off':
                        clearTimeout(g.step), et(g, 'step'), X(d), (i || (f.tweenRunning && g.dir)) && _(!0);
                }
                function _(t) {
                    m.snapAmount &&
                        (g.scrollAmount =
                            m.snapAmount instanceof Array ? ('x' === g.dir[0] ? m.snapAmount[1] : m.snapAmount[0]) : m.snapAmount);
                    var e = 'stepped' !== g.type,
                        i = p || (t ? (e ? y / 1.5 : b) : 1e3 / 60),
                        n = t ? (e ? 7.5 : 40) : 2.5,
                        r = [Math.abs(v[0].offsetTop), Math.abs(v[0].offsetLeft)],
                        o = [10 < f.scrollRatio.y ? 10 : f.scrollRatio.y, 10 < f.scrollRatio.x ? 10 : f.scrollRatio.x],
                        s = 'x' === g.dir[0] ? r[1] + g.dir[1] * (o[1] * n) : r[0] + g.dir[1] * (o[0] * n),
                        a = 'x' === g.dir[0] ? r[1] + g.dir[1] * parseInt(g.scrollAmount) : r[0] + g.dir[1] * parseInt(g.scrollAmount),
                        l = 'auto' !== g.scrollAmount ? a : s,
                        c = u || (t ? (e ? 'mcsLinearOut' : 'mcsEaseInOut') : 'mcsLinear'),
                        h = !!t;
                    t && i < 17 && (l = 'x' === g.dir[0] ? r[1] : r[0]),
                        Z(d, l.toString(), { dir: g.dir[0], scrollEasing: c, dur: i, onComplete: h }),
                        t
                            ? (g.dir = !1)
                            : (clearTimeout(g.step),
                              (g.step = setTimeout(function () {
                                  _();
                              }, i)));
                }
            }),
            (q = function (t) {
                var e = L(this).data(R).opt,
                    i = [];
                return (
                    'function' == typeof t && (t = t()),
                    t instanceof Array
                        ? (i = 1 < t.length ? [t[0], t[1]] : 'x' === e.axis ? [null, t[0]] : [t[0], null])
                        : ((i[0] = t.y ? t.y : t.x || 'x' === e.axis ? null : t), (i[1] = t.x ? t.x : t.y || 'y' === e.axis ? null : t)),
                    'function' == typeof i[0] && (i[0] = i[0]()),
                    'function' == typeof i[1] && (i[1] = i[1]()),
                    i
                );
            }),
            (G = function (t, e) {
                if (null != t && void 0 !== t) {
                    var i = L(this),
                        n = i.data(R),
                        r = n.opt,
                        o = L('#mCSB_' + n.idx + '_container'),
                        s = o.parent(),
                        a = typeof t;
                    e || (e = 'x' === r.axis ? 'x' : 'y');
                    var l = 'x' === e ? o.outerWidth(!1) - s.width() : o.outerHeight(!1) - s.height(),
                        c = 'x' === e ? o[0].offsetLeft : o[0].offsetTop,
                        h = 'x' === e ? 'left' : 'top';
                    switch (a) {
                        case 'function':
                            return t();
                        case 'object':
                            var d = t.jquery ? t : L(t);
                            if (!d.length) return;
                            return 'x' === e ? ot(d)[1] : ot(d)[0];
                        case 'string':
                        case 'number':
                            if (rt(t)) return Math.abs(t);
                            if (-1 !== t.indexOf('%')) return Math.abs((l * parseInt(t)) / 100);
                            if (-1 !== t.indexOf('-=')) return Math.abs(c - parseInt(t.split('-=')[1]));
                            if (-1 !== t.indexOf('+=')) {
                                var u = c + parseInt(t.split('+=')[1]);
                                return 0 <= u ? 0 : Math.abs(u);
                            }
                            if (-1 !== t.indexOf('px') && rt(t.split('px')[0])) return Math.abs(t.split('px')[0]);
                            if ('top' === t || 'left' === t) return 0;
                            if ('bottom' === t) return Math.abs(s.height() - o.outerHeight(!1));
                            if ('right' === t) return Math.abs(s.width() - o.outerWidth(!1));
                            if ('first' === t || 'last' === t) {
                                var d = o.find(':' + t);
                                return 'x' === e ? ot(d)[1] : ot(d)[0];
                            }
                            return L(t).length ? ('x' === e ? ot(L(t))[1] : ot(L(t))[0]) : (o.css(h, t), void f.update.call(null, i[0]));
                    }
                }
            }),
            (K = function (t) {
                var e = L(this),
                    i = e.data(R),
                    n = i.opt,
                    r = L('#mCSB_' + i.idx + '_container');
                if (t) return clearTimeout(r[0].autoUpdate), void et(r[0], 'autoUpdate');
                function o(t) {
                    clearTimeout(r[0].autoUpdate), f.update.call(null, e[0], t);
                }
                !(function t() {
                    clearTimeout(r[0].autoUpdate),
                        0 !== e.parents('html').length
                            ? (r[0].autoUpdate = setTimeout(function () {
                                  return n.advanced.updateOnSelectorChange &&
                                      ((i.poll.change.n = (function () {
                                          !0 === n.advanced.updateOnSelectorChange && (n.advanced.updateOnSelectorChange = '*');
                                          var t = 0,
                                              e = r.find(n.advanced.updateOnSelectorChange);
                                          return (
                                              n.advanced.updateOnSelectorChange &&
                                                  0 < e.length &&
                                                  e.each(function () {
                                                      t += this.offsetHeight + this.offsetWidth;
                                                  }),
                                              t
                                          );
                                      })()),
                                      i.poll.change.n !== i.poll.change.o)
                                      ? ((i.poll.change.o = i.poll.change.n), void o(3))
                                      : n.advanced.updateOnContentResize &&
                                        ((i.poll.size.n =
                                            e[0].scrollHeight +
                                            e[0].scrollWidth +
                                            r[0].offsetHeight +
                                            e[0].offsetHeight +
                                            e[0].offsetWidth),
                                        i.poll.size.n !== i.poll.size.o)
                                      ? ((i.poll.size.o = i.poll.size.n), void o(1))
                                      : !n.advanced.updateOnImageLoad ||
                                        ('auto' === n.advanced.updateOnImageLoad && 'y' === n.axis) ||
                                        ((i.poll.img.n = r.find('img').length), i.poll.img.n === i.poll.img.o)
                                      ? void (
                                            (n.advanced.updateOnSelectorChange ||
                                                n.advanced.updateOnContentResize ||
                                                n.advanced.updateOnImageLoad) &&
                                            t()
                                        )
                                      : ((i.poll.img.o = i.poll.img.n),
                                        void r.find('img').each(function () {
                                            !(function (t) {
                                                if (L(t).hasClass(x[2])) return o();
                                                var e,
                                                    i,
                                                    n = new Image();
                                                (n.onload =
                                                    ((e = n),
                                                    (i = function () {
                                                        (this.onload = null), L(t).addClass(x[2]), o(2);
                                                    }),
                                                    function () {
                                                        return i.apply(e, arguments);
                                                    })),
                                                    (n.src = t.src);
                                            })(this);
                                        }));
                              }, n.advanced.autoUpdateTimeout))
                            : (e = null);
                })();
            }),
            (X = function (t) {
                var e = t.data(R),
                    i = L(
                        '#mCSB_' +
                            e.idx +
                            '_container,#mCSB_' +
                            e.idx +
                            '_container_wrapper,#mCSB_' +
                            e.idx +
                            '_dragger_vertical,#mCSB_' +
                            e.idx +
                            '_dragger_horizontal'
                    );
                i.each(function () {
                    tt.call(this);
                });
            }),
            (Z = function (r, t, o) {
                var e = r.data(R),
                    i = e.opt,
                    n = {
                        trigger: 'internal',
                        dir: 'y',
                        scrollEasing: 'mcsEaseOut',
                        drag: !1,
                        dur: i.scrollInertia,
                        overwrite: 'all',
                        callbacks: !0,
                        onStart: !0,
                        onUpdate: !0,
                        onComplete: !0,
                    },
                    o = L.extend(n, o),
                    s = [o.dur, o.drag ? 0 : o.dur],
                    a = L('#mCSB_' + e.idx),
                    l = L('#mCSB_' + e.idx + '_container'),
                    c = l.parent(),
                    h = i.callbacks.onTotalScrollOffset ? q.call(r, i.callbacks.onTotalScrollOffset) : [0, 0],
                    d = i.callbacks.onTotalScrollBackOffset ? q.call(r, i.callbacks.onTotalScrollBackOffset) : [0, 0];
                if (
                    ((e.trigger = o.trigger),
                    (0 === c.scrollTop() && 0 === c.scrollLeft()) ||
                        (L('.mCSB_' + e.idx + '_scrollbar').css('visibility', 'visible'), c.scrollTop(0).scrollLeft(0)),
                    '_resetY' !== t ||
                        e.contentReset.y ||
                        (S('onOverflowYNone') && i.callbacks.onOverflowYNone.call(r[0]), (e.contentReset.y = 1)),
                    '_resetX' !== t ||
                        e.contentReset.x ||
                        (S('onOverflowXNone') && i.callbacks.onOverflowXNone.call(r[0]), (e.contentReset.x = 1)),
                    '_resetY' !== t && '_resetX' !== t)
                ) {
                    if (
                        ((!e.contentReset.y && r[0].mcs) ||
                            !e.overflowed[0] ||
                            (S('onOverflowY') && i.callbacks.onOverflowY.call(r[0]), (e.contentReset.x = null)),
                        (!e.contentReset.x && r[0].mcs) ||
                            !e.overflowed[1] ||
                            (S('onOverflowX') && i.callbacks.onOverflowX.call(r[0]), (e.contentReset.x = null)),
                        i.snapAmount)
                    ) {
                        var u = i.snapAmount instanceof Array ? ('x' === o.dir ? i.snapAmount[1] : i.snapAmount[0]) : i.snapAmount;
                        (p = t), (f = u), (m = i.snapOffset), (t = Math.round(p / f) * f - m);
                    }
                    var p, f, m;
                    switch (o.dir) {
                        case 'x':
                            var g = L('#mCSB_' + e.idx + '_dragger_horizontal'),
                                v = 'left',
                                y = l[0].offsetLeft,
                                b = [a.width() - l.outerWidth(!1), g.parent().width() - g.width()],
                                _ = [t, 0 === t ? 0 : t / e.scrollRatio.x],
                                x = h[1],
                                w = d[1],
                                k = 0 < x ? x / e.scrollRatio.x : 0,
                                C = 0 < w ? w / e.scrollRatio.x : 0;
                            break;
                        case 'y':
                            var g = L('#mCSB_' + e.idx + '_dragger_vertical'),
                                v = 'top',
                                y = l[0].offsetTop,
                                b = [a.height() - l.outerHeight(!1), g.parent().height() - g.height()],
                                _ = [t, 0 === t ? 0 : t / e.scrollRatio.y],
                                x = h[0],
                                w = d[0],
                                k = 0 < x ? x / e.scrollRatio.y : 0,
                                C = 0 < w ? w / e.scrollRatio.y : 0;
                    }
                    _[1] < 0 || (0 === _[0] && 0 === _[1]) ? (_ = [0, 0]) : _[1] >= b[1] ? (_ = [b[0], b[1]]) : (_[0] = -_[0]),
                        r[0].mcs || (D(), S('onInit') && i.callbacks.onInit.call(r[0])),
                        clearTimeout(l[0].onCompleteTimeout),
                        Q(g[0], v, Math.round(_[1]), s[1], o.scrollEasing),
                        (!e.tweenRunning && ((0 === y && 0 <= _[0]) || (y === b[0] && _[0] <= b[0]))) ||
                            Q(l[0], v, Math.round(_[0]), s[0], o.scrollEasing, o.overwrite, {
                                onStart: function () {
                                    o.callbacks &&
                                        o.onStart &&
                                        !e.tweenRunning &&
                                        (S('onScrollStart') && (D(), i.callbacks.onScrollStart.call(r[0])),
                                        (e.tweenRunning = !0),
                                        T(g),
                                        (e.cbOffsets = [
                                            i.callbacks.alwaysTriggerOffsets || y >= b[0] + x,
                                            i.callbacks.alwaysTriggerOffsets || y <= -w,
                                        ]));
                                },
                                onUpdate: function () {
                                    o.callbacks && o.onUpdate && S('whileScrolling') && (D(), i.callbacks.whileScrolling.call(r[0]));
                                },
                                onComplete: function () {
                                    if (o.callbacks && o.onComplete) {
                                        'yx' === i.axis && clearTimeout(l[0].onCompleteTimeout);
                                        var t = l[0].idleTimer || 0;
                                        l[0].onCompleteTimeout = setTimeout(function () {
                                            S('onScroll') && (D(), i.callbacks.onScroll.call(r[0])),
                                                S('onTotalScroll') &&
                                                    _[1] >= b[1] - k &&
                                                    e.cbOffsets[0] &&
                                                    (D(), i.callbacks.onTotalScroll.call(r[0])),
                                                S('onTotalScrollBack') &&
                                                    _[1] <= C &&
                                                    e.cbOffsets[1] &&
                                                    (D(), i.callbacks.onTotalScrollBack.call(r[0])),
                                                (e.tweenRunning = !1),
                                                (l[0].idleTimer = 0),
                                                T(g, 'hide');
                                        }, t);
                                    }
                                },
                            });
                }
                function S(t) {
                    return e && i.callbacks[t] && 'function' == typeof i.callbacks[t];
                }
                function D() {
                    var t = [l[0].offsetTop, l[0].offsetLeft],
                        e = [g[0].offsetTop, g[0].offsetLeft],
                        i = [l.outerHeight(!1), l.outerWidth(!1)],
                        n = [a.height(), a.width()];
                    r[0].mcs = {
                        content: l,
                        top: t[0],
                        left: t[1],
                        draggerTop: e[0],
                        draggerLeft: e[1],
                        topPct: Math.round((100 * Math.abs(t[0])) / (Math.abs(i[0]) - n[0])),
                        leftPct: Math.round((100 * Math.abs(t[1])) / (Math.abs(i[1]) - n[1])),
                        direction: o.dir,
                    };
                }
            }),
            (Q = function (t, e, i, n, r, o, s) {
                t._mTween || (t._mTween = { top: {}, left: {} });
                var a,
                    l,
                    s = s || {},
                    c = s.onStart || function () {},
                    h = s.onUpdate || function () {},
                    d = s.onComplete || function () {},
                    u = J(),
                    p = 0,
                    f = t.offsetTop,
                    m = t.style,
                    g = t._mTween[e];
                'left' === e && (f = t.offsetLeft);
                var v = i - f;
                function y() {
                    g.stop ||
                        (p || c.call(),
                        (p = J() - u),
                        b(),
                        p >= g.time && ((g.time = p > g.time ? p + a - (p - g.time) : p + a - 1), g.time < p + 1 && (g.time = p + 1)),
                        g.time < n ? (g.id = l(y)) : d.call());
                }
                function b() {
                    0 < n
                        ? ((g.currVal = (function (t, e, i, n, r) {
                              switch (r) {
                                  case 'linear':
                                  case 'mcsLinear':
                                      return (i * t) / n + e;
                                  case 'mcsLinearOut':
                                      return (t /= n), t--, i * Math.sqrt(1 - t * t) + e;
                                  case 'easeInOutSmooth':
                                      return (t /= n / 2) < 1 ? (i / 2) * t * t + e : (-i / 2) * (--t * (t - 2) - 1) + e;
                                  case 'easeInOutStrong':
                                      return (t /= n / 2) < 1
                                          ? (i / 2) * Math.pow(2, 10 * (t - 1)) + e
                                          : (t--, (i / 2) * (2 - Math.pow(2, -10 * t)) + e);
                                  case 'easeInOut':
                                  case 'mcsEaseInOut':
                                      return (t /= n / 2) < 1 ? (i / 2) * t * t * t + e : (i / 2) * ((t -= 2) * t * t + 2) + e;
                                  case 'easeOutSmooth':
                                      return (t /= n), -i * (--t * t * t * t - 1) + e;
                                  case 'easeOutStrong':
                                      return i * (1 - Math.pow(2, (-10 * t) / n)) + e;
                                  case 'easeOut':
                                  case 'mcsEaseOut':
                                  default:
                                      var o = (t /= n) * t,
                                          s = o * t;
                                      return e + i * (0.499999999999997 * s * o + -2.5 * o * o + 5.5 * s + -6.5 * o + 4 * t);
                              }
                          })(g.time, f, v, n, r)),
                          (m[e] = Math.round(g.currVal) + 'px'))
                        : (m[e] = i + 'px'),
                        h.call();
                }
                (g.stop = 0),
                    'none' !== o &&
                        null != g.id &&
                        (window.requestAnimationFrame ? window.cancelAnimationFrame(g.id) : clearTimeout(g.id), (g.id = null)),
                    (a = 1e3 / 60),
                    (g.time = p + a),
                    (l = window.requestAnimationFrame
                        ? window.requestAnimationFrame
                        : function (t) {
                              return b(), setTimeout(t, 0.01);
                          }),
                    (g.id = l(y));
            }),
            (J = function () {
                return window.performance && window.performance.now
                    ? window.performance.now()
                    : window.performance && window.performance.webkitNow
                    ? window.performance.webkitNow()
                    : Date.now
                    ? Date.now()
                    : new Date().getTime();
            }),
            (tt = function () {
                this._mTween || (this._mTween = { top: {}, left: {} });
                for (var t = ['top', 'left'], e = 0; e < t.length; e++) {
                    var i = t[e];
                    this._mTween[i].id &&
                        (window.requestAnimationFrame ? window.cancelAnimationFrame(this._mTween[i].id) : clearTimeout(this._mTween[i].id),
                        (this._mTween[i].id = null),
                        (this._mTween[i].stop = 1));
                }
            }),
            (et = function (e, i) {
                try {
                    delete e[i];
                } catch (t) {
                    e[i] = null;
                }
            }),
            (it = function (t) {
                return !(t.which && 1 !== t.which);
            }),
            (nt = function (t) {
                var e = t.originalEvent.pointerType;
                return !(e && 'touch' !== e && 2 !== e);
            }),
            (rt = function (t) {
                return !isNaN(parseFloat(t)) && isFinite(t);
            }),
            (ot = function (t) {
                var e = t.parents('.mCSB_container');
                return [t.offset().top - e.offset().top, t.offset().left - e.offset().left];
            }),
            (st = function () {
                var t = (function () {
                    var t = ['webkit', 'moz', 'ms', 'o'];
                    if ('hidden' in document) return 'hidden';
                    for (var e = 0; e < t.length; e++) if (t[e] + 'Hidden' in document) return t[e] + 'Hidden';
                    return null;
                })();
                return !!t && document[t];
            }),
            (L.fn[p] = function (t) {
                return f[t]
                    ? f[t].apply(this, Array.prototype.slice.call(arguments, 1))
                    : 'object' != typeof t && t
                    ? void L.error('Method ' + t + ' does not exist')
                    : f.init.apply(this, arguments);
            }),
            (L[p] = function (t) {
                return f[t]
                    ? f[t].apply(this, Array.prototype.slice.call(arguments, 1))
                    : 'object' != typeof t && t
                    ? void L.error('Method ' + t + ' does not exist')
                    : f.init.apply(this, arguments);
            }),
            (L[p].defaults = r),
            (window[p] = !0),
            L(window).bind('load', function () {
                L(n)[p](),
                    L.extend(L.expr[':'], {
                        mcsInView:
                            L.expr[':'].mcsInView ||
                            function (t) {
                                var e,
                                    i,
                                    n = L(t),
                                    r = n.parents('.mCSB_container');
                                if (r.length)
                                    return (
                                        (e = r.parent()),
                                        0 <= (i = [r[0].offsetTop, r[0].offsetLeft])[0] + ot(n)[0] &&
                                            i[0] + ot(n)[0] < e.height() - n.outerHeight(!1) &&
                                            0 <= i[1] + ot(n)[1] &&
                                            i[1] + ot(n)[1] < e.width() - n.outerWidth(!1)
                                    );
                            },
                        mcsInSight:
                            L.expr[':'].mcsInSight ||
                            function (t, e, i) {
                                var n,
                                    r,
                                    o,
                                    s,
                                    a = L(t),
                                    l = a.parents('.mCSB_container'),
                                    c =
                                        'exact' === i[3]
                                            ? [
                                                  [1, 0],
                                                  [1, 0],
                                              ]
                                            : [
                                                  [0.9, 0.1],
                                                  [0.6, 0.4],
                                              ];
                                if (l.length)
                                    return (
                                        (n = [a.outerHeight(!1), a.outerWidth(!1)]),
                                        (o = [l[0].offsetTop + ot(a)[0], l[0].offsetLeft + ot(a)[1]]),
                                        (r = [l.parent()[0].offsetHeight, l.parent()[0].offsetWidth]),
                                        o[0] - r[0] * (s = [n[0] < r[0] ? c[0] : c[1], n[1] < r[1] ? c[0] : c[1]])[0][0] < 0 &&
                                            0 <= o[0] + n[0] - r[0] * s[0][1] &&
                                            o[1] - r[1] * s[1][0] < 0 &&
                                            0 <= o[1] + n[1] - r[1] * s[1][1]
                                    );
                            },
                        mcsOverflow:
                            L.expr[':'].mcsOverflow ||
                            function (t) {
                                var e = L(t).data(R);
                                if (e) return e.overflowed[0] || e.overflowed[1];
                            },
                    });
            });
    });
