this.Element &&
    (function (t) {
        t.matches =
            t.matches ||
            t.matchesSelector ||
            t.webkitMatchesSelector ||
            t.msMatchesSelector ||
            function (t) {
                for (var e = this, a = (e.parentNode || e.document).querySelectorAll(t), n = -1; a[++n] && a[n] != e; );
                return !!a[n];
            };
    })(Element.prototype),
    this.Element &&
        (function (t) {
            t.closest =
                t.closest ||
                function (t) {
                    for (var e = this; e.matches && !e.matches(t); ) e = e.parentNode;
                    return e.matches ? e : null;
                };
        })(Element.prototype),
    this.Element &&
        (function (t) {
            t.matches =
                t.matches ||
                t.matchesSelector ||
                t.webkitMatchesSelector ||
                t.msMatchesSelector ||
                function (t) {
                    for (var e = this, a = (e.parentNode || e.document).querySelectorAll(t), n = -1; a[++n] && a[n] != e; );
                    return !!a[n];
                };
        })(Element.prototype),
    (function () {
        for (var o = 0, t = ['webkit', 'moz'], e = 0; e < t.length && !window.requestAnimationFrame; ++e)
            (window.requestAnimationFrame = window[t[e] + 'RequestAnimationFrame']),
                (window.cancelAnimationFrame = window[t[e] + 'CancelAnimationFrame'] || window[t[e] + 'CancelRequestAnimationFrame']);
        window.requestAnimationFrame ||
            (window.requestAnimationFrame = function (t) {
                var e = new Date().getTime(),
                    a = Math.max(0, 16 - (e - o)),
                    n = window.setTimeout(function () {
                        t(e + a);
                    }, a);
                return (o = e + a), n;
            }),
            window.cancelAnimationFrame ||
                (window.cancelAnimationFrame = function (t) {
                    clearTimeout(t);
                });
    })(),
    [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(function (t) {
        t.hasOwnProperty('prepend') ||
            Object.defineProperty(t, 'prepend', {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                value: function () {
                    var t = Array.prototype.slice.call(arguments),
                        a = document.createDocumentFragment();
                    t.forEach(function (t) {
                        var e = t instanceof Node;
                        a.appendChild(e ? t : document.createTextNode(String(t)));
                    }),
                        this.insertBefore(a, this.firstChild);
                },
            });
    }),
    (window.mUtilElementDataStore = {}),
    (window.mUtilElementDataStoreID = 0),
    (window.mUtilDelegatedEventHandlers = {}),
    (window.noZensmooth = !0);
var mUtil = (function () {
    var e = [],
        a = { sm: 544, md: 768, lg: 1024, xl: 1200 },
        n = function () {
            var t = !1;
            window.addEventListener('resize', function () {
                clearTimeout(t),
                    (t = setTimeout(function () {
                        !(function () {
                            for (var t = 0; t < e.length; t++) e[t].call();
                        })();
                    }, 250));
            });
        };
    return {
        init: function (t) {
            t && t.breakpoints && (a = t.breakpoints), n();
        },
        addResizeHandler: function (t) {
            e.push(t);
        },
        runResizeHandlers: function () {
            _runResizeHandlers();
        },
        getURLParam: function (t) {
            var e,
                a,
                n = window.location.search.substring(1).split('&');
            for (e = 0; e < n.length; e++) if ((a = n[e].split('='))[0] == t) return unescape(a[1]);
            return null;
        },
        isMobileDevice: function () {
            return this.getViewPort().width < this.getBreakpoint('lg');
        },
        isDesktopDevice: function () {
            return !mUtil.isMobileDevice();
        },
        getViewPort: function () {
            var t = window,
                e = 'inner';
            return (
                'innerWidth' in window || ((e = 'client'), (t = document.documentElement || document.body)),
                {
                    width: t[e + 'Width'],
                    height: t[e + 'Height'],
                }
            );
        },
        isInResponsiveRange: function (t) {
            var e = this.getViewPort().width;
            return (
                'general' == t ||
                ('desktop' == t && e >= this.getBreakpoint('lg') + 1) ||
                ('tablet' == t && e >= this.getBreakpoint('md') + 1 && e < this.getBreakpoint('lg')) ||
                ('mobile' == t && e <= this.getBreakpoint('md')) ||
                ('desktop-and-tablet' == t && e >= this.getBreakpoint('md') + 1) ||
                ('tablet-and-mobile' == t && e <= this.getBreakpoint('lg')) ||
                ('minimal-desktop-and-below' == t && e <= this.getBreakpoint('xl'))
            );
        },
        getUniqueID: function (t) {
            return t + Math.floor(Math.random() * new Date().getTime());
        },
        getBreakpoint: function (t) {
            return a[t];
        },
        isset: function (t, e) {
            var a;
            if (-1 !== (e = e || '').indexOf('[')) throw new Error('Unsupported object path notation.');
            e = e.split('.');
            do {
                if (void 0 === t) return !1;
                if (((a = e.shift()), !t.hasOwnProperty(a))) return !1;
                t = t[a];
            } while (e.length);
            return !0;
        },
        getHighestZindex: function (t) {
            for (var e, a, n = mUtil.get(t); n && n !== document; ) {
                if (
                    ('absolute' === (e = mUtil.css(n, 'position')) || 'relative' === e || 'fixed' === e) &&
                    ((a = parseInt(mUtil.css(n, 'z-index'))), !isNaN(a) && 0 !== a)
                )
                    return a;
                n = n.parentNode;
            }
            return null;
        },
        hasFixedPositionedParent: function (t) {
            for (; t && t !== document; ) {
                if (((position = mUtil.css(t, 'position')), 'fixed' === position)) return !0;
                t = t.parentNode;
            }
            return !1;
        },
        sleep: function (t) {
            for (var e = new Date().getTime(), a = 0; a < 1e7 && !(new Date().getTime() - e > t); a++);
        },
        getRandomInt: function (t, e) {
            return Math.floor(Math.random() * (e - t + 1)) + t;
        },
        isAngularVersion: function () {
            return void 0 !== window.Zone;
        },
        deepExtend: function (t) {
            t = t || {};
            for (var e = 1; e < arguments.length; e++) {
                var a = arguments[e];
                if (a)
                    for (var n in a)
                        a.hasOwnProperty(n) && ('object' == typeof a[n] ? (t[n] = mUtil.deepExtend(t[n], a[n])) : (t[n] = a[n]));
            }
            return t;
        },
        extend: function (t) {
            t = t || {};
            for (var e = 1; e < arguments.length; e++)
                if (arguments[e]) for (var a in arguments[e]) arguments[e].hasOwnProperty(a) && (t[a] = arguments[e][a]);
            return t;
        },
        get: function (t) {
            var e;
            return t === document
                ? document
                : t && 1 === t.nodeType
                ? t
                : (e = document.getElementById(t))
                ? e
                : (e = document.getElementsByTagName(t))
                ? e[0]
                : (e = document.getElementsByClassName(t))
                ? e[0]
                : null;
        },
        hasClasses: function (t, e) {
            if (t) {
                for (var a = e.split(' '), n = 0; n < a.length; n++) if (0 == mUtil.hasClass(t, mUtil.trim(a[n]))) return !1;
                return !0;
            }
        },
        hasClass: function (t, e) {
            if (t) return t.classList ? t.classList.contains(e) : new RegExp('\\b' + e + '\\b').test(t.className);
        },
        addClass: function (t, e) {
            if (t && void 0 !== e) {
                var a = e.split(' ');
                if (t.classList) for (var n = 0; n < a.length; n++) a[n] && 0 < a[n].length && t.classList.add(mUtil.trim(a[n]));
                else if (!mUtil.hasClass(t, e)) for (n = 0; n < a.length; n++) t.className += ' ' + mUtil.trim(a[n]);
            }
        },
        removeClass: function (t, e) {
            if (t) {
                var a = e.split(' ');
                if (t.classList) for (var n = 0; n < a.length; n++) t.classList.remove(mUtil.trim(a[n]));
                else if (mUtil.hasClass(t, e))
                    for (n = 0; n < a.length; n++) t.className = t.className.replace(new RegExp('\\b' + mUtil.trim(a[n]) + '\\b', 'g'), '');
            }
        },
        triggerCustomEvent: function (t, e, a) {
            if (window.CustomEvent) var n = new CustomEvent(e, { detail: a });
            else (n = document.createEvent('CustomEvent')).initCustomEvent(e, !0, !0, a);
            t.dispatchEvent(n);
        },
        trim: function (t) {
            return t.trim();
        },
        eventTriggered: function (t) {
            return !!t.currentTarget.dataset.triggered || !(t.currentTarget.dataset.triggered = !0);
        },
        remove: function (t) {
            t && t.parentNode && t.parentNode.removeChild(t);
        },
        find: function (t, e) {
            return t.querySelector(e);
        },
        findAll: function (t, e) {
            return t.querySelectorAll(e);
        },
        insertAfter: function (t, e) {
            return e.parentNode.insertBefore(t, e.nextSibling);
        },
        parents: function (t, e) {
            function o(t, e) {
                for (var a = 0, n = t.length; a < n; a++) if (t[a] == e) return !0;
                return !1;
            }

            return (function (t, e) {
                for (var a = document.querySelectorAll(e), n = t.parentNode; n && !o(a, n); ) n = n.parentNode;
                return n;
            })(t, e);
        },
        children: function (t, e, a) {
            if (t && t.childNodes) {
                for (var n = [], o = 0, i = t.childNodes.length; o < i; ++o)
                    1 == t.childNodes[o].nodeType && mUtil.matches(t.childNodes[o], e, a) && n.push(t.childNodes[o]);
                return n;
            }
        },
        child: function (t, e, a) {
            var n = mUtil.children(t, e, a);
            return n ? n[0] : null;
        },
        matches: function (t, e, a) {
            var n = Element.prototype,
                o =
                    n.matches ||
                    n.webkitMatchesSelector ||
                    n.mozMatchesSelector ||
                    n.msMatchesSelector ||
                    function (t) {
                        return -1 !== [].indexOf.call(document.querySelectorAll(t), this);
                    };
            return !(!t || !t.tagName) && o.call(t, e);
        },
        data: function (a) {
            return (
                (a = mUtil.get(a)),
                {
                    set: function (t, e) {
                        void 0 === a.customDataTag && (mUtilElementDataStoreID++, (a.customDataTag = mUtilElementDataStoreID)),
                            void 0 === mUtilElementDataStore[a.customDataTag] && (mUtilElementDataStore[a.customDataTag] = {}),
                            (mUtilElementDataStore[a.customDataTag][t] = e);
                    },
                    get: function (t) {
                        return this.has(t) ? mUtilElementDataStore[a.customDataTag][t] : null;
                    },
                    has: function (t) {
                        return !(!mUtilElementDataStore[a.customDataTag] || !mUtilElementDataStore[a.customDataTag][t]);
                    },
                    remove: function (t) {
                        this.has(t) && delete mUtilElementDataStore[a.customDataTag][t];
                    },
                }
            );
        },
        outerWidth: function (t, e) {
            if (!0 === e) {
                var a = parseFloat(t.offsetWidth);
                return (a += parseFloat(mUtil.css(t, 'margin-left')) + parseFloat(mUtil.css(t, 'margin-right'))), parseFloat(a);
            }
            return (a = parseFloat(t.offsetWidth));
        },
        offset: function (t) {
            var e = t.getBoundingClientRect();
            return { top: e.top + document.body.scrollTop, left: e.left + document.body.scrollLeft };
        },
        height: function (t) {
            return mUtil.css(t, 'height');
        },
        visible: function (t) {
            return !(0 === t.offsetWidth && 0 === t.offsetHeight);
        },
        attr: function (t, e, a) {
            if (null != (t = mUtil.get(t))) return void 0 === a ? t.getAttribute(e) : void t.setAttribute(e, a);
        },
        hasAttr: function (t, e) {
            if (null != (t = mUtil.get(t))) return !!t.getAttribute(e);
        },
        removeAttr: function (t, e) {
            null != (t = mUtil.get(t)) && t.removeAttribute(e);
        },
        animate: function (n, o, i, l, r, s) {
            var t = {
                linear: function (t, e, a, n) {
                    return (a * t) / n + e;
                },
            };
            if ('number' == typeof n && 'number' == typeof o && 'number' == typeof i && 'function' == typeof l) {
                'string' == typeof r && t[r] && (r = t[r]),
                    'function' != typeof r && (r = t.linear),
                    'function' != typeof s && (s = function () {});
                var d =
                        window.requestAnimationFrame ||
                        function (t) {
                            window.setTimeout(t, 1e3 / 60);
                        },
                    c = o - n;
                l(n);
                var m = window.performance && window.performance.now ? window.performance.now() : +new Date();
                d(function t(e) {
                    var a = (e || +new Date()) - m;
                    0 <= a && l(r(a, n, c, i)), 0 <= a && i <= a ? (l(o), s()) : d(t);
                });
            }
        },
        actualCss: function (t, e, a) {
            var n;
            if (t instanceof HTMLElement != !1)
                return t.getAttribute('m-hidden-' + e) && !1 !== a
                    ? parseFloat(t.getAttribute('m-hidden-' + e))
                    : ((t.style.cssText = 'position: absolute; visibility: hidden; display: block;'),
                      'width' == e ? (n = t.offsetWidth) : 'height' == e && (n = t.offsetHeight),
                      (t.style.cssText = ''),
                      t.setAttribute('m-hidden-' + e, n),
                      parseFloat(n));
        },
        actualHeight: function (t, e) {
            return mUtil.actualCss(t, 'height', e);
        },
        actualWidth: function (t, e) {
            return mUtil.actualCss(t, 'width', e);
        },
        getScroll: function (t, e) {
            return (
                (e = 'scroll' + e),
                t == window || t == document
                    ? self['scrollTop' == e ? 'pageYOffset' : 'pageXOffset'] ||
                      (browserSupportsBoxModel && document.documentElement[e]) ||
                      document.body[e]
                    : t[e]
            );
        },
        css: function (t, e, a) {
            if (((t = mUtil.get(t)), void 0 !== a)) t.style[e] = a;
            else {
                var n = (t.ownerDocument || document).defaultView;
                if (n && n.getComputedStyle)
                    return (e = e.replace(/([A-Z])/g, '-$1').toLowerCase()), n.getComputedStyle(t, null).getPropertyValue(e);
                if (t.currentStyle)
                    return (
                        (e = e.replace(/\-(\w)/g, function (t, e) {
                            return e.toUpperCase();
                        })),
                        (a = t.currentStyle[e]),
                        /^\d+(em|pt|%|ex)?$/i.test(a)
                            ? ((o = a),
                              (i = t.style.left),
                              (l = t.runtimeStyle.left),
                              (t.runtimeStyle.left = t.currentStyle.left),
                              (t.style.left = o || 0),
                              (o = t.style.pixelLeft + 'px'),
                              (t.style.left = i),
                              (t.runtimeStyle.left = l),
                              o)
                            : a
                    );
            }
            var o, i, l;
        },
        slide: function (e, t, a, n, o) {
            if (!(!e || ('up' == t && !1 === mUtil.visible(e)) || ('down' == t && !0 === mUtil.visible(e)))) {
                a = a || 600;
                var i = mUtil.actualHeight(e),
                    l = !1,
                    r = !1;
                mUtil.css(e, 'padding-top') &&
                    !0 !== mUtil.data(e).has('slide-padding-top') &&
                    mUtil.data(e).set('slide-padding-top', mUtil.css(e, 'padding-top')),
                    mUtil.css(e, 'padding-bottom') &&
                        !0 !== mUtil.data(e).has('slide-padding-bottom') &&
                        mUtil.data(e).set('slide-padding-bottom', mUtil.css(e, 'padding-bottom')),
                    mUtil.data(e).has('slide-padding-top') && (l = parseInt(mUtil.data(e).get('slide-padding-top'))),
                    mUtil.data(e).has('slide-padding-bottom') && (r = parseInt(mUtil.data(e).get('slide-padding-bottom'))),
                    'up' == t
                        ? ((e.style.cssText = 'display: block; overflow: hidden;'),
                          l &&
                              mUtil.animate(
                                  0,
                                  l,
                                  a,
                                  function (t) {
                                      e.style.paddingTop = l - t + 'px';
                                  },
                                  'linear'
                              ),
                          r &&
                              mUtil.animate(
                                  0,
                                  r,
                                  a,
                                  function (t) {
                                      e.style.paddingBottom = r - t + 'px';
                                  },
                                  'linear'
                              ),
                          mUtil.animate(
                              0,
                              i,
                              a,
                              function (t) {
                                  e.style.height = i - t + 'px';
                              },
                              'linear',
                              function () {
                                  n(), (e.style.height = ''), (e.style.display = 'none');
                              }
                          ))
                        : 'down' == t &&
                          ((e.style.cssText = 'display: block; overflow: hidden;'),
                          l &&
                              mUtil.animate(
                                  0,
                                  l,
                                  a,
                                  function (t) {
                                      e.style.paddingTop = t + 'px';
                                  },
                                  'linear',
                                  function () {
                                      e.style.paddingTop = '';
                                  }
                              ),
                          r &&
                              mUtil.animate(
                                  0,
                                  r,
                                  a,
                                  function (t) {
                                      e.style.paddingBottom = t + 'px';
                                  },
                                  'linear',
                                  function () {
                                      e.style.paddingBottom = '';
                                  }
                              ),
                          mUtil.animate(
                              0,
                              i,
                              a,
                              function (t) {
                                  e.style.height = t + 'px';
                              },
                              'linear',
                              function () {
                                  n(), (e.style.height = ''), (e.style.display = ''), (e.style.overflow = '');
                              }
                          ));
            }
        },
        slideUp: function (t, e, a) {
            mUtil.slide(t, 'up', e, a);
        },
        slideDown: function (t, e, a) {
            mUtil.slide(t, 'down', e, a);
        },
        show: function (t, e) {
            t.style.display = e || 'block';
        },
        hide: function (t) {
            t.style.display = 'none';
        },
        addEvent: function (t, e, a, n) {
            void 0 !== (t = mUtil.get(t)) && t.addEventListener(e, a);
        },
        removeEvent: function (t, e, a) {
            (t = mUtil.get(t)).removeEventListener(e, a);
        },
        on: function (i, l, t, r) {
            if (l) {
                var e = mUtil.getUniqueID('event');
                return (
                    (mUtilDelegatedEventHandlers[e] = function (t) {
                        for (var e = i.querySelectorAll(l), a = t.target; a && a !== i; ) {
                            for (var n = 0, o = e.length; n < o; n++) a === e[n] && r.call(a, t);
                            a = a.parentNode;
                        }
                    }),
                    mUtil.addEvent(i, t, mUtilDelegatedEventHandlers[e]),
                    e
                );
            }
        },
        off: function (t, e, a) {
            t &&
                mUtilDelegatedEventHandlers[a] &&
                (mUtil.removeEvent(t, e, mUtilDelegatedEventHandlers[a]), delete mUtilDelegatedEventHandlers[a]);
        },
        one: function (t, e, a) {
            (t = mUtil.get(t)).addEventListener(e, function (t) {
                return t.target.removeEventListener(t.type, arguments.callee), a(t);
            });
        },
        hash: function (t) {
            var e,
                a = 0;
            if (0 === t.length) return a;
            for (e = 0; e < t.length; e++) (a = (a << 5) - a + t.charCodeAt(e)), (a |= 0);
            return a;
        },
        animateClass: function (t, e, a) {
            mUtil.addClass(t, 'animated ' + e),
                mUtil.one(t, 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    mUtil.removeClass(t, 'animated ' + e);
                }),
                a && mUtil.one(t.animationEnd, a);
        },
        animateDelay: function (t, e) {
            for (var a = ['webkit-', 'moz-', 'ms-', 'o-', ''], n = 0; n < a.length; n++) mUtil.css(t, a[n] + 'animation-delay', e);
        },
        animateDuration: function (t, e) {
            for (var a = ['webkit-', 'moz-', 'ms-', 'o-', ''], n = 0; n < a.length; n++) mUtil.css(t, a[n] + 'animation-duration', e);
        },
        scrollTo: function (t, e, a) {
            a || (a = 600), zenscroll.toY(t, a);
        },
        scrollToViewport: function (t, e) {
            e || (e = 1200), zenscroll.intoView(t, e);
        },
        scrollToCenter: function (t, e) {
            e || (e = 1200), zenscroll.center(t, e);
        },
        scrollTop: function (t) {
            t || (t = 600), zenscroll.toY(0, t);
        },
        isArray: function (t) {
            return t && Array.isArray(t);
        },
        ready: function (t) {
            (document.attachEvent ? 'complete' === document.readyState : 'loading' !== document.readyState)
                ? t()
                : document.addEventListener('DOMContentLoaded', t);
        },
        isEmpty: function (t) {
            for (var e in t) if (t.hasOwnProperty(e)) return !1;
            return !0;
        },
    };
})();
mUtil.ready(function () {
    mUtil.init();
});
var mDropdown = function (t, e) {
    var o = this,
        n = mUtil.get(t),
        i = mUtil.get('body');
    if (n) {
        var a = {
                toggle: 'click',
                hoverTimeout: 300,
                skin: 'light',
                height: 'auto',
                maxHeight: !1,
                minHeight: !1,
                persistent: !1,
                mobileOverlay: !0,
            },
            l = {
                construct: function (t) {
                    return (
                        mUtil.data(n).has('dropdown')
                            ? (o = mUtil.data(n).get('dropdown'))
                            : (l.init(t), l.setup(), mUtil.data(n).set('dropdown', o)),
                        o
                    );
                },
                init: function (t) {
                    (o.options = mUtil.deepExtend({}, a, t)),
                        (o.events = []),
                        (o.eventHandlers = {}),
                        (o.open = !1),
                        (o.layout = {}),
                        (o.layout.close = mUtil.find(n, '.m-dropdown__close')),
                        (o.layout.toggle = mUtil.find(n, '.m-dropdown__toggle')),
                        (o.layout.arrow = mUtil.find(n, '.m-dropdown__arrow')),
                        (o.layout.wrapper = mUtil.find(n, '.m-dropdown__wrapper')),
                        (o.layout.defaultDropPos = mUtil.hasClass(n, 'm-dropdown--up') ? 'up' : 'down'),
                        (o.layout.currentDropPos = o.layout.defaultDropPos),
                        'hover' == mUtil.attr(n, 'm-dropdown-toggle') && (o.options.toggle = 'hover');
                },
                setup: function () {
                    o.options.placement && mUtil.addClass(n, 'm-dropdown--' + o.options.placement),
                        o.options.align && mUtil.addClass(n, 'm-dropdown--align-' + o.options.align),
                        o.options.width && mUtil.css(o.layout.wrapper, 'width', o.options.width + 'px'),
                        '1' == mUtil.attr(n, 'm-dropdown-persistent') && (o.options.persistent = !0),
                        'hover' == o.options.toggle && mUtil.addEvent(n, 'mouseout', l.hideMouseout),
                        l.setZindex();
                },
                toggle: function () {
                    return o.open ? l.hide() : l.show();
                },
                setContent: function (t) {
                    t = mUtil.find(n, '.m-dropdown__content').innerHTML = t;
                    return o;
                },
                show: function () {
                    if ('hover' == o.options.toggle && mUtil.hasAttr(n, 'hover')) return l.clearHovered(), o;
                    if (o.open) return o;
                    if (
                        (o.layout.arrow && l.adjustArrowPos(),
                        l.eventTrigger('beforeShow'),
                        l.hideOpened(),
                        mUtil.addClass(n, 'm-dropdown--open'),
                        mUtil.isMobileDevice() && o.options.mobileOverlay)
                    ) {
                        var t = mUtil.css(n, 'z-index') - 1,
                            e = mUtil.insertAfter(document.createElement('DIV'), n);
                        mUtil.addClass(e, 'm-dropdown__dropoff'),
                            mUtil.css(e, 'z-index', t),
                            mUtil.data(e).set('dropdown', n),
                            mUtil.data(n).set('dropoff', e),
                            mUtil.addEvent(e, 'click', function (t) {
                                l.hide(), mUtil.remove(this), t.preventDefault();
                            });
                    }
                    return n.focus(), n.setAttribute('aria-expanded', 'true'), (o.open = !0), l.eventTrigger('afterShow'), o;
                },
                clearHovered: function () {
                    var t = mUtil.attr(n, 'timeout');
                    mUtil.removeAttr(n, 'hover'), mUtil.removeAttr(n, 'timeout'), clearTimeout(t);
                },
                hideHovered: function (t) {
                    if (!0 === t) {
                        if (!1 === l.eventTrigger('beforeHide')) return;
                        l.clearHovered(), mUtil.removeClass(n, 'm-dropdown--open'), (o.open = !1), l.eventTrigger('afterHide');
                    } else {
                        if (!0 === mUtil.hasAttr(n, 'hover')) return;
                        if (!1 === l.eventTrigger('beforeHide')) return;
                        var e = setTimeout(function () {
                            mUtil.attr(n, 'hover') &&
                                (l.clearHovered(), mUtil.removeClass(n, 'm-dropdown--open'), (o.open = !1), l.eventTrigger('afterHide'));
                        }, o.options.hoverTimeout);
                        mUtil.attr(n, 'hover', '1'), mUtil.attr(n, 'timeout', e);
                    }
                },
                hideClicked: function () {
                    !1 !== l.eventTrigger('beforeHide') &&
                        (mUtil.removeClass(n, 'm-dropdown--open'),
                        mUtil.data(n).remove('dropoff'),
                        (o.open = !1),
                        l.eventTrigger('afterHide'));
                },
                hide: function (t) {
                    return (
                        !1 === o.open ||
                            (mUtil.isDesktopDevice() && 'hover' == o.options.toggle ? l.hideHovered(t) : l.hideClicked(),
                            'down' == o.layout.defaultDropPos &&
                                'up' == o.layout.currentDropPos &&
                                (mUtil.removeClass(n, 'm-dropdown--up'),
                                o.layout.arrow.prependTo(o.layout.wrapper),
                                (o.layout.currentDropPos = 'down'))),
                        o
                    );
                },
                hideMouseout: function () {
                    mUtil.isDesktopDevice() && l.hide();
                },
                hideOpened: function () {
                    for (var t = mUtil.findAll(i, '.m-dropdown.m-dropdown--open'), e = 0, a = t.length; e < a; e++) {
                        var n = t[e];
                        mUtil.data(n).get('dropdown').hide(!0);
                    }
                },
                adjustArrowPos: function () {
                    var t = mUtil.outerWidth(n),
                        e = mUtil.hasClass(o.layout.arrow, 'm-dropdown__arrow--right') ? 'right' : 'left',
                        a = 0;
                    o.layout.arrow &&
                        (mUtil.isInResponsiveRange('mobile') && mUtil.hasClass(n, 'm-dropdown--mobile-full-width')
                            ? ((a =
                                  mUtil.offset(n).left +
                                  t / 2 -
                                  Math.abs(parseInt(mUtil.css(o.layout.arrow, 'width')) / 2) -
                                  parseInt(mUtil.css(o.layout.wrapper, 'left'))),
                              mUtil.css(o.layout.arrow, 'right', 'auto'),
                              mUtil.css(o.layout.arrow, 'left', a + 'px'),
                              mUtil.css(o.layout.arrow, 'margin-left', 'auto'),
                              mUtil.css(o.layout.arrow, 'margin-right', 'auto'))
                            : mUtil.hasClass(o.layout.arrow, 'm-dropdown__arrow--adjust') &&
                              ((a = t / 2 - Math.abs(parseInt(mUtil.css(o.layout.arrow, 'width')) / 2)),
                              mUtil.hasClass(n, 'm-dropdown--align-push') && (a += 20),
                              'right' == e
                                  ? (mUtil.css(o.layout.arrow, 'left', 'auto'), mUtil.css(o.layout.arrow, 'right', a + 'px'))
                                  : (mUtil.css(o.layout.arrow, 'right', 'auto'), mUtil.css(o.layout.arrow, 'left', a + 'px'))));
                },
                setZindex: function () {
                    var t = 101,
                        e = mUtil.getHighestZindex(n);
                    t <= e && (t = e + 1), mUtil.css(o.layout.wrapper, 'z-index', t);
                },
                isPersistent: function () {
                    return o.options.persistent;
                },
                isShown: function () {
                    return o.open;
                },
                eventTrigger: function (t, e) {
                    for (var a = 0; a < o.events.length; a++) {
                        var n = o.events[a];
                        n.name == t &&
                            (1 == n.one
                                ? 0 == n.fired && ((o.events[a].fired = !0), n.handler.call(this, o, e))
                                : n.handler.call(this, o, e));
                    }
                },
                addEvent: function (t, e, a) {
                    o.events.push({ name: t, handler: e, one: a, fired: !1 });
                },
            };
        return (
            (o.setDefaults = function (t) {
                a = t;
            }),
            (o.show = function () {
                return l.show();
            }),
            (o.hide = function () {
                return l.hide();
            }),
            (o.toggle = function () {
                return l.toggle();
            }),
            (o.isPersistent = function () {
                return l.isPersistent();
            }),
            (o.isShown = function () {
                return l.isShown();
            }),
            (o.setContent = function (t) {
                return l.setContent(t);
            }),
            (o.on = function (t, e) {
                return l.addEvent(t, e);
            }),
            (o.one = function (t, e) {
                return l.addEvent(t, e, !0);
            }),
            l.construct.apply(o, [e]),
            !0,
            o
        );
    }
};
mUtil.on(document, '[m-dropdown-toggle="click"] .m-dropdown__toggle', 'click', function (t) {
    var e = this.closest('.m-dropdown');
    e && ((mUtil.data(e).has('dropdown') ? mUtil.data(e).get('dropdown') : new mDropdown(e)).toggle(), t.preventDefault());
}),
    mUtil.on(document, '[m-dropdown-toggle="hover"] .m-dropdown__toggle', 'click', function (t) {
        if (mUtil.isDesktopDevice()) '#' == mUtil.attr(this, 'href') && t.preventDefault();
        else if (mUtil.isMobileDevice()) {
            var e = this.closest('.m-dropdown');
            e && ((mUtil.data(e).has('dropdown') ? mUtil.data(e).get('dropdown') : new mDropdown(e)).toggle(), t.preventDefault());
        }
    }),
    mUtil.on(document, '[m-dropdown-toggle="hover"]', 'mouseover', function (t) {
        if (mUtil.isDesktopDevice()) {
            this &&
                ((mUtil.data(this).has('dropdown') ? mUtil.data(this).get('dropdown') : new mDropdown(this)).show(), t.preventDefault());
        }
    }),
    document.addEventListener('click', function (t) {
        var e,
            a = mUtil.get('body'),
            n = t.target;
        if ((e = a.querySelectorAll('.m-dropdown.m-dropdown--open')))
            for (var o = 0, i = e.length; o < i; o++) {
                var l = e[o];
                if (!1 === mUtil.data(l).has('dropdown')) return;
                var r = mUtil.data(l).get('dropdown'),
                    s = mUtil.find(l, '.m-dropdown__toggle');
                mUtil.hasClass(l, 'm-dropdown--disable-close') && (t.preventDefault(), t.stopPropagation()),
                    s && n !== s && !1 === s.contains(n) && !1 === n.contains(s)
                        ? !0 === r.isPersistent()
                            ? !1 === l.contains(n) && r.hide()
                            : r.hide()
                        : !1 === l.contains(n) && r.hide();
            }
    });
var mHeader = function (t, e) {
        var i = this,
            a = mUtil.get(t),
            l = mUtil.get('body');
        if (void 0 !== a) {
            var n = { classic: !1, offset: { mobile: 150, desktop: 200 }, minimize: { mobile: !1, desktop: !1 } },
                o = {
                    construct: function (t) {
                        return (
                            mUtil.data(a).has('header')
                                ? (i = mUtil.data(a).get('header'))
                                : (o.init(t), o.build(), mUtil.data(a).set('header', i)),
                            i
                        );
                    },
                    init: function (t) {
                        (i.events = []), (i.options = mUtil.deepExtend({}, n, t));
                    },
                    build: function () {
                        var o = 0;
                        (!1 === i.options.minimize.mobile && !1 === i.options.minimize.desktop) ||
                            window.addEventListener('scroll', function () {
                                var t,
                                    e,
                                    a,
                                    n = 0;
                                mUtil.isInResponsiveRange('desktop')
                                    ? ((n = i.options.offset.desktop),
                                      (t = i.options.minimize.desktop.on),
                                      (e = i.options.minimize.desktop.off))
                                    : mUtil.isInResponsiveRange('tablet-and-mobile') &&
                                      ((n = i.options.offset.mobile),
                                      (t = i.options.minimize.mobile.on),
                                      (e = i.options.minimize.mobile.off)),
                                    (a = window.pageYOffset),
                                    (mUtil.isInResponsiveRange('tablet-and-mobile') && i.options.classic && i.options.classic.mobile) ||
                                    (mUtil.isInResponsiveRange('desktop') && i.options.classic && i.options.classic.desktop)
                                        ? n < a
                                            ? (mUtil.addClass(l, t), mUtil.removeClass(l, e))
                                            : (mUtil.addClass(l, e), mUtil.removeClass(l, t))
                                        : (n < a && o < a
                                              ? (mUtil.addClass(l, t), mUtil.removeClass(l, e))
                                              : (mUtil.addClass(l, e), mUtil.removeClass(l, t)),
                                          (o = a));
                            });
                    },
                    eventTrigger: function (t, e) {
                        for (var a = 0; a < i.events.length; a++) {
                            var n = i.events[a];
                            n.name == t &&
                                (1 == n.one
                                    ? 0 == n.fired && ((i.events[a].fired = !0), n.handler.call(this, i, e))
                                    : n.handler.call(this, i, e));
                        }
                    },
                    addEvent: function (t, e, a) {
                        i.events.push({ name: t, handler: e, one: a, fired: !1 });
                    },
                };
            return (
                (i.setDefaults = function (t) {
                    n = t;
                }),
                (i.on = function (t, e) {
                    return o.addEvent(t, e);
                }),
                o.construct.apply(i, [e]),
                !0,
                i
            );
        }
    },
    mMenu = function (t, e) {
        var p = this,
            a = !1,
            d = mUtil.get(t),
            i = mUtil.get('body');
        if (d) {
            var n = {
                    autoscroll: { speed: 1200 },
                    accordion: { slideSpeed: 200, autoScroll: !0, autoScrollSpeed: 1200, expandAll: !0 },
                    dropdown: { timeout: 500 },
                },
                f = {
                    construct: function (t) {
                        return (
                            mUtil.data(d).has('menu')
                                ? (p = mUtil.data(d).get('menu'))
                                : (f.init(t), f.reset(), f.build(), mUtil.data(d).set('menu', p)),
                            p
                        );
                    },
                    init: function (t) {
                        (p.events = []),
                            (p.eventHandlers = {}),
                            (p.options = mUtil.deepExtend({}, n, t)),
                            (p.pauseDropdownHoverTime = 0),
                            (p.uid = mUtil.getUniqueID());
                    },
                    reload: function () {
                        f.reset(), f.build();
                    },
                    build: function () {
                        (p.eventHandlers.event_1 = mUtil.on(d, '.m-menu__toggle', 'click', f.handleSubmenuAccordion)),
                            ('dropdown' === f.getSubmenuMode() || f.isConditionalSubmenuDropdown()) &&
                                ((p.eventHandlers.event_2 = mUtil.on(
                                    d,
                                    '[m-menu-submenu-toggle="hover"]',
                                    'mouseover',
                                    f.handleSubmenuDrodownHoverEnter
                                )),
                                (p.eventHandlers.event_3 = mUtil.on(
                                    d,
                                    '[m-menu-submenu-toggle="hover"]',
                                    'mouseout',
                                    f.handleSubmenuDrodownHoverExit
                                )),
                                (p.eventHandlers.event_4 = mUtil.on(
                                    d,
                                    '[m-menu-submenu-toggle="click"] > .m-menu__toggle, [m-menu-submenu-toggle="click"] > .m-menu__link .m-menu__toggle',
                                    'click',
                                    f.handleSubmenuDropdownClick
                                )),
                                (p.eventHandlers.event_5 = mUtil.on(
                                    d,
                                    '[m-menu-submenu-toggle="tab"] > .m-menu__toggle, [m-menu-submenu-toggle="tab"] > .m-menu__link .m-menu__toggle',
                                    'click',
                                    f.handleSubmenuDropdownTabClick
                                ))),
                            (p.eventHandlers.event_6 = mUtil.on(
                                d,
                                '.m-menu__item:not(.m-menu__item--submenu) > .m-menu__link:not(.m-menu__toggle):not(.m-menu__link--toggle-skip)',
                                'click',
                                f.handleLinkClick
                            ));
                    },
                    reset: function () {
                        mUtil.off(d, 'click', p.eventHandlers.event_1),
                            mUtil.off(d, 'mouseover', p.eventHandlers.event_2),
                            mUtil.off(d, 'mouseout', p.eventHandlers.event_3),
                            mUtil.off(d, 'click', p.eventHandlers.event_4),
                            mUtil.off(d, 'click', p.eventHandlers.event_5),
                            mUtil.off(d, 'click', p.eventHandlers.event_6);
                    },
                    getSubmenuMode: function () {
                        return mUtil.isInResponsiveRange('desktop')
                            ? mUtil.isset(p.options.submenu, 'desktop.state.body')
                                ? mUtil.hasClass(i, p.options.submenu.desktop.state.body)
                                    ? p.options.submenu.desktop.state.mode
                                    : p.options.submenu.desktop.default
                                : mUtil.isset(p.options.submenu, 'desktop')
                                ? p.options.submenu.desktop
                                : void 0
                            : mUtil.isInResponsiveRange('tablet') && mUtil.isset(p.options.submenu, 'tablet')
                            ? p.options.submenu.tablet
                            : !(!mUtil.isInResponsiveRange('mobile') || !mUtil.isset(p.options.submenu, 'mobile')) &&
                              p.options.submenu.mobile;
                    },
                    isConditionalSubmenuDropdown: function () {
                        return !(!mUtil.isInResponsiveRange('desktop') || !mUtil.isset(p.options.submenu, 'desktop.state.body'));
                    },
                    handleLinkClick: function (t) {
                        !1 === f.eventTrigger('linkClick', this) && t.preventDefault(),
                            ('dropdown' === f.getSubmenuMode() || f.isConditionalSubmenuDropdown()) &&
                                f.handleSubmenuDropdownClose(t, this);
                    },
                    handleSubmenuDrodownHoverEnter: function (t) {
                        if ('accordion' !== f.getSubmenuMode() && !1 !== p.resumeDropdownHover()) {
                            var e = this;
                            '1' == e.getAttribute('data-hover') &&
                                (e.removeAttribute('data-hover'),
                                clearTimeout(e.getAttribute('data-timeout')),
                                e.removeAttribute('data-timeout')),
                                f.showSubmenuDropdown(e);
                        }
                    },
                    handleSubmenuDrodownHoverExit: function (t) {
                        if (!1 !== p.resumeDropdownHover() && 'accordion' !== f.getSubmenuMode()) {
                            var e = this,
                                a = p.options.dropdown.timeout,
                                n = setTimeout(function () {
                                    '1' == e.getAttribute('data-hover') && f.hideSubmenuDropdown(e, !0);
                                }, a);
                            e.setAttribute('data-hover', '1'), e.setAttribute('data-timeout', n);
                        }
                    },
                    handleSubmenuDropdownClick: function (t) {
                        if ('accordion' !== f.getSubmenuMode()) {
                            var e = this.closest('.m-menu__item');
                            'accordion' != e.getAttribute('m-menu-submenu-mode') &&
                                (!1 === mUtil.hasClass(e, 'm-menu__item--hover')
                                    ? (mUtil.addClass(e, 'm-menu__item--open-dropdown'), f.showSubmenuDropdown(e))
                                    : (mUtil.removeClass(e, 'm-menu__item--open-dropdown'), f.hideSubmenuDropdown(e, !0)),
                                t.preventDefault());
                        }
                    },
                    handleSubmenuDropdownTabClick: function (t) {
                        if ('accordion' !== f.getSubmenuMode()) {
                            var e = this.closest('.m-menu__item');
                            'accordion' != e.getAttribute('m-menu-submenu-mode') &&
                                (0 == mUtil.hasClass(e, 'm-menu__item--hover') &&
                                    (mUtil.addClass(e, 'm-menu__item--open-dropdown'), f.showSubmenuDropdown(e)),
                                t.preventDefault());
                        }
                    },
                    handleSubmenuDropdownClose: function (t, e) {
                        if ('accordion' !== f.getSubmenuMode()) {
                            var a = d.querySelectorAll('.m-menu__item.m-menu__item--submenu.m-menu__item--hover:not(.m-menu__item--tabs)');
                            if (
                                0 < a.length &&
                                !1 === mUtil.hasClass(e, 'm-menu__toggle') &&
                                0 === e.querySelectorAll('.m-menu__toggle').length
                            )
                                for (var n = 0, o = a.length; n < o; n++) f.hideSubmenuDropdown(a[0], !0);
                        }
                    },
                    handleSubmenuAccordion: function (t, e) {
                        var a,
                            n = e || this;
                        if (
                            'dropdown' === f.getSubmenuMode() &&
                            (a = n.closest('.m-menu__item')) &&
                            'accordion' != a.getAttribute('m-menu-submenu-mode')
                        )
                            t.preventDefault();
                        else {
                            var o = n.closest('.m-menu__item'),
                                i = mUtil.child(o, '.m-menu__submenu, .m-menu__inner');
                            if (!mUtil.hasClass(n.closest('.m-menu__item'), 'm-menu__item--open-always') && o && i) {
                                t.preventDefault();
                                var l = p.options.accordion.slideSpeed;
                                if (!1 === mUtil.hasClass(o, 'm-menu__item--open')) {
                                    if (!1 === p.options.accordion.expandAll) {
                                        var r = n.closest('.m-menu__nav, .m-menu__subnav'),
                                            s = mUtil.children(
                                                r,
                                                '.m-menu__item.m-menu__item--open.m-menu__item--submenu:not(.m-menu__item--expanded):not(.m-menu__item--open-always)'
                                            );
                                        if (r && s)
                                            for (var d = 0, c = s.length; d < c; d++) {
                                                var m = s[0],
                                                    u = mUtil.child(m, '.m-menu__submenu');
                                                u &&
                                                    mUtil.slideUp(u, l, function () {
                                                        mUtil.removeClass(m, 'm-menu__item--open');
                                                    });
                                            }
                                    }
                                    mUtil.slideDown(i, l, function () {
                                        f.scrollToItem(n);
                                    }),
                                        mUtil.addClass(o, 'm-menu__item--open');
                                } else
                                    mUtil.slideUp(i, l, function () {
                                        f.scrollToItem(n);
                                    }),
                                        mUtil.removeClass(o, 'm-menu__item--open');
                            }
                        }
                    },
                    scrollToItem: function (t) {
                        mUtil.isInResponsiveRange('desktop') &&
                            p.options.accordion.autoScroll &&
                            '1' !== d.getAttribute('m-menu-scrollable') &&
                            mUtil.scrollToCenter(t, p.options.accordion.autoScrollSpeed);
                    },
                    hideSubmenuDropdown: function (t, e) {
                        e && (mUtil.removeClass(t, 'm-menu__item--hover'), mUtil.removeClass(t, 'm-menu__item--active-tab')),
                            t.removeAttribute('data-hover'),
                            t.getAttribute('m-menu-dropdown-toggle-class') &&
                                mUtil.removeClass(i, t.getAttribute('m-menu-dropdown-toggle-class'));
                        var a = t.getAttribute('data-timeout');
                        t.removeAttribute('data-timeout'), clearTimeout(a);
                    },
                    showSubmenuDropdown: function (t) {
                        var e = d.querySelectorAll(
                            '.m-menu__item--submenu.m-menu__item--hover, .m-menu__item--submenu.m-menu__item--active-tab'
                        );
                        if (e)
                            for (var a = 0, n = e.length; a < n; a++) {
                                var o = e[a];
                                t !== o && !1 === o.contains(t) && !1 === t.contains(o) && f.hideSubmenuDropdown(o, !0);
                            }
                        f.adjustSubmenuDropdownArrowPos(t),
                            mUtil.addClass(t, 'm-menu__item--hover'),
                            t.getAttribute('m-menu-dropdown-toggle-class') &&
                                mUtil.addClass(i, t.getAttribute('m-menu-dropdown-toggle-class'));
                    },
                    createSubmenuDropdownClickDropoff: function (e) {
                        var t,
                            a = (t = mUtil.child(e, '.m-menu__submenu') ? mUtil.css(t, 'z-index') : 0) - 1,
                            n = document.createElement(
                                '<div class="m-menu__dropoff" style="background: transparent; position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: ' +
                                    a +
                                    '"></div>'
                            );
                        i.appendChild(n),
                            mUtil.addEvent(n, 'click', function (t) {
                                t.stopPropagation(), t.preventDefault(), mUtil.remove(this), f.hideSubmenuDropdown(e, !0);
                            });
                    },
                    adjustSubmenuDropdownArrowPos: function (t) {
                        var e = mUtil.child(t, '.m-menu__submenu'),
                            a = mUtil.child(e, '.m-menu__arrow.m-menu__arrow--adjust');
                        mUtil.child(e, '.m-menu__subnav');
                        if (a) {
                            var n = 0;
                            mUtil.child(t, '.m-menu__link');
                            mUtil.hasClass(e, 'm-menu__submenu--classic') || mUtil.hasClass(e, 'm-menu__submenu--fixed')
                                ? mUtil.hasClass(e, 'm-menu__submenu--right')
                                    ? ((n = mUtil.outerWidth(t) / 2),
                                      mUtil.hasClass(e, 'm-menu__submenu--pull') &&
                                          (n += Math.abs(parseFloat(mUtil.css(e, 'margin-right')))),
                                      (n = parseInt(mUtil.css(e, 'width')) - n))
                                    : mUtil.hasClass(e, 'm-menu__submenu--left') &&
                                      ((n = mUtil.outerWidth(t) / 2),
                                      mUtil.hasClass(e, 'm-menu__submenu--pull') &&
                                          (n += Math.abs(parseFloat(mUtil.css(e, 'margin-left')))))
                                : (mUtil.hasClass(e, 'm-menu__submenu--center') || mUtil.hasClass(e, 'm-menu__submenu--full')) &&
                                  ((n = mUtil.offset(t).left - (mUtil.getViewPort().width - parseInt(mUtil.css(e, 'width'))) / 2),
                                  (n += mUtil.outerWidth(t) / 2)),
                                mUtil.css(a, 'left', n + 'px');
                        }
                    },
                    pauseDropdownHover: function (t) {
                        var e = new Date();
                        p.pauseDropdownHoverTime = e.getTime() + t;
                    },
                    resumeDropdownHover: function () {
                        return new Date().getTime() > p.pauseDropdownHoverTime;
                    },
                    resetActiveItem: function (t) {
                        for (var e, a, n = 0, o = (e = d.querySelectorAll('.m-menu__item--active')).length; n < o; n++) {
                            var i = e[0];
                            mUtil.removeClass(i, 'm-menu__item--active'), mUtil.hide(mUtil.child(i, '.m-menu__submenu'));
                            for (var l = 0, r = (a = mUtil.parents(i, '.m-menu__item--submenu')).length; l < r; l++) {
                                var s = a[n];
                                mUtil.removeClass(s, 'm-menu__item--open'), mUtil.hide(mUtil.child(s, '.m-menu__submenu'));
                            }
                        }
                        if (!1 === p.options.accordion.expandAll && (e = d.querySelectorAll('.m-menu__item--open')))
                            for (n = 0, o = e.length; n < o; n++) mUtil.removeClass(a[0], 'm-menu__item--open');
                    },
                    setActiveItem: function (t) {
                        f.resetActiveItem(), mUtil.addClass(t, 'm-menu__item--active');
                        for (var e = mUtil.parents(t, '.m-menu__item--submenu'), a = 0, n = e.length; a < n; a++)
                            mUtil.addClass(e[a], 'm-menu__item--open');
                    },
                    getBreadcrumbs: function (t) {
                        var e,
                            a = [],
                            n = mUtil.child(t, '.m-menu__link');
                        a.push({
                            text: (e = mUtil.child(n, '.m-menu__link-text') ? e.innerHTML : ''),
                            title: n.getAttribute('title'),
                            href: n.getAttribute('href'),
                        });
                        for (var o = mUtil.parents(t, '.m-menu__item--submenu'), i = 0, l = o.length; i < l; i++) {
                            var r = mUtil.child(o[i], '.m-menu__link');
                            a.push({
                                text: (e = mUtil.child(r, '.m-menu__link-text') ? e.innerHTML : ''),
                                title: r.getAttribute('title'),
                                href: r.getAttribute('href'),
                            });
                        }
                        return a.reverse();
                    },
                    getPageTitle: function (t) {
                        var e;
                        return mUtil.child(t, '.m-menu__link-text') ? e.innerHTML : '';
                    },
                    eventTrigger: function (t, e) {
                        for (var a = 0; a < p.events.length; a++) {
                            var n = p.events[a];
                            n.name == t &&
                                (1 == n.one
                                    ? 0 == n.fired && ((p.events[a].fired = !0), n.handler.call(this, p, e))
                                    : n.handler.call(this, p, e));
                        }
                    },
                    addEvent: function (t, e, a) {
                        p.events.push({ name: t, handler: e, one: a, fired: !1 });
                    },
                };
            return (
                (p.setDefaults = function (t) {
                    n = t;
                }),
                (p.setActiveItem = function (t) {
                    return f.setActiveItem(t);
                }),
                (p.reload = function () {
                    return f.reload();
                }),
                (p.getBreadcrumbs = function (t) {
                    return f.getBreadcrumbs(t);
                }),
                (p.getPageTitle = function (t) {
                    return f.getPageTitle(t);
                }),
                (p.getSubmenuMode = function () {
                    return f.getSubmenuMode();
                }),
                (p.hideDropdown = function (t) {
                    f.hideSubmenuDropdown(t, !0);
                }),
                (p.pauseDropdownHover = function (t) {
                    f.pauseDropdownHover(t);
                }),
                (p.resumeDropdownHover = function () {
                    return f.resumeDropdownHover();
                }),
                (p.on = function (t, e) {
                    return f.addEvent(t, e);
                }),
                (p.one = function (t, e) {
                    return f.addEvent(t, e, !0);
                }),
                f.construct.apply(p, [e]),
                mUtil.addResizeHandler(function () {
                    a && p.reload();
                }),
                (a = !0),
                p
            );
        }
    };
document.addEventListener('click', function (t) {
    var e;
    if (
        (e = mUtil
            .get('body')
            .querySelectorAll(
                '.m-menu__nav .m-menu__item.m-menu__item--submenu.m-menu__item--hover:not(.m-menu__item--tabs)[m-menu-submenu-toggle="click"]'
            ))
    )
        for (var a = 0, n = e.length; a < n; a++) {
            var o = e[a].closest('.m-menu__nav').parentNode;
            if (o) {
                var i,
                    l = mUtil.data(o).get('menu');
                if (!l) break;
                if (!l || 'dropdown' !== l.getSubmenuMode()) break;
                if (t.target !== o && !1 === o.contains(t.target))
                    if (
                        (i = o.querySelectorAll(
                            '.m-menu__item--submenu.m-menu__item--hover:not(.m-menu__item--tabs)[m-menu-submenu-toggle="click"]'
                        ))
                    )
                        for (var r = 0, s = i.length; r < s; r++) l.hideDropdown(i[r]);
            }
        }
});
var mOffcanvas = function (t, e) {
        var l = this,
            a = mUtil.get(t),
            n = mUtil.get('body');
        if (a) {
            var o = {},
                i = {
                    construct: function (t) {
                        return (
                            mUtil.data(a).has('offcanvas')
                                ? (l = mUtil.data(a).get('offcanvas'))
                                : (i.init(t), i.build(), mUtil.data(a).set('offcanvas', l)),
                            l
                        );
                    },
                    init: function (t) {
                        (l.events = []),
                            (l.options = mUtil.deepExtend({}, o, t)),
                            l.overlay,
                            (l.classBase = l.options.baseClass),
                            (l.classShown = l.classBase + '--on'),
                            (l.classOverlay = l.classBase + '-overlay'),
                            (l.state = mUtil.hasClass(a, l.classShown) ? 'shown' : 'hidden');
                    },
                    build: function () {
                        if (l.options.toggleBy)
                            if ('string' == typeof l.options.toggleBy) mUtil.addEvent(l.options.toggleBy, 'click', i.toggle);
                            else if (l.options.toggleBy && l.options.toggleBy[0] && l.options.toggleBy[0].target)
                                for (var t in l.options.toggleBy) mUtil.addEvent(l.options.toggleBy[t].target, 'click', i.toggle);
                            else
                                l.options.toggleBy &&
                                    l.options.toggleBy.target &&
                                    mUtil.addEvent(l.options.toggleBy.target, 'click', i.toggle);
                        var e = mUtil.get(l.options.closeBy);
                        e && mUtil.addEvent(e, 'click', i.hide);
                    },
                    toggle: function () {
                        i.eventTrigger('toggle'), 'shown' == l.state ? i.hide(this) : i.show(this);
                    },
                    show: function (e) {
                        'shown' != l.state &&
                            (i.eventTrigger('beforeShow'),
                            i.togglerClass(e, 'show'),
                            mUtil.addClass(n, l.classShown),
                            mUtil.addClass(a, l.classShown),
                            (l.state = 'shown'),
                            l.options.overlay &&
                                ((l.overlay = mUtil.insertAfter(document.createElement('DIV'), a)),
                                mUtil.addClass(l.overlay, l.classOverlay),
                                mUtil.addEvent(l.overlay, 'click', function (t) {
                                    t.stopPropagation(), t.preventDefault(), i.hide(e);
                                })),
                            i.eventTrigger('afterShow'));
                    },
                    hide: function (t) {
                        'hidden' != l.state &&
                            (i.eventTrigger('beforeHide'),
                            i.togglerClass(t, 'hide'),
                            mUtil.removeClass(n, l.classShown),
                            mUtil.removeClass(a, l.classShown),
                            (l.state = 'hidden'),
                            l.options.overlay && l.overlay && mUtil.remove(l.overlay),
                            i.eventTrigger('afterHide'));
                    },
                    togglerClass: function (t, e) {
                        var a,
                            n = mUtil.attr(t, 'id');
                        if (l.options.toggleBy && l.options.toggleBy[0] && l.options.toggleBy[0].target)
                            for (var o in l.options.toggleBy) l.options.toggleBy[o].target === n && (a = l.options.toggleBy[o]);
                        else l.options.toggleBy && l.options.toggleBy.target && (a = l.options.toggleBy);
                        if (a) {
                            var i = mUtil.get(a.target);
                            'show' === e && mUtil.addClass(i, a.state), 'hide' === e && mUtil.removeClass(i, a.state);
                        }
                    },
                    eventTrigger: function (t, e) {
                        for (var a = 0; a < l.events.length; a++) {
                            var n = l.events[a];
                            n.name == t &&
                                (1 == n.one
                                    ? 0 == n.fired && ((l.events[a].fired = !0), n.handler.call(this, l, e))
                                    : n.handler.call(this, l, e));
                        }
                    },
                    addEvent: function (t, e, a) {
                        l.events.push({ name: t, handler: e, one: a, fired: !1 });
                    },
                };
            return (
                (l.setDefaults = function (t) {
                    o = t;
                }),
                (l.hide = function () {
                    return i.hide();
                }),
                (l.show = function () {
                    return i.show();
                }),
                (l.on = function (t, e) {
                    return i.addEvent(t, e);
                }),
                (l.one = function (t, e) {
                    return i.addEvent(t, e, !0);
                }),
                i.construct.apply(l, [e]),
                !0,
                l
            );
        }
    },
    mLayout = (function () {
        var n,
            o,
            a,
            i,
            l,
            r = function () {
                0 !== $('#m_aside_left_hide_toggle').length &&
                    (r = new mToggle('m_aside_left_hide_toggle', {
                        target: 'body',
                        targetState: 'm-aside-left--hide',
                        togglerState: 'm-brand__toggler--active',
                    })).on('toggle', function (t) {
                        n.pauseDropdownHover(800), o.pauseDropdownHover(800), Cookies.set('sidebar_hide_state', t.getState());
                    });
            };
        return {
            init: function () {
                this.initHeader(), this.initAside();
            },
            initHeader: function () {
                var t, e, a;
                (e = mUtil.get('m_header')),
                    (a = {
                        offset: {},
                        minimize: {},
                    }),
                    'hide' == mUtil.attr(e, 'm-minimize-mobile')
                        ? ((a.minimize.mobile = {}), (a.minimize.mobile.on = 'm-header--hide'), (a.minimize.mobile.off = 'm-header--show'))
                        : (a.minimize.mobile = !1),
                    'hide' == mUtil.attr(e, 'm-minimize')
                        ? ((a.minimize.desktop = {}),
                          (a.minimize.desktop.on = 'm-header--hide'),
                          (a.minimize.desktop.off = 'm-header--show'))
                        : (a.minimize.desktop = !1),
                    (t = mUtil.attr(e, 'm-minimize-offset')) && (a.offset.desktop = t),
                    (t = mUtil.attr(e, 'm-minimize-mobile-offset')) && (a.offset.mobile = t),
                    new mHeader('m_header', a),
                    (i = new mOffcanvas('m_header_menu', {
                        overlay: !0,
                        baseClass: 'm-aside-header-menu-mobile',
                        closeBy: 'm_aside_header_menu_mobile_close_btn',
                        toggleBy: { target: 'm_aside_header_menu_mobile_toggle', state: 'm-brand__toggler--active' },
                    })),
                    (n = new mMenu('m_header_menu', {
                        submenu: {
                            desktop: 'dropdown',
                            tablet: 'accordion',
                            mobile: 'accordion',
                        },
                        accordion: { slideSpeed: 200, autoScroll: !0, expandAll: !1 },
                    })),
                    $('#m_aside_header_topbar_mobile_toggle').click(function () {
                        $('body').toggleClass('m-topbar--on');
                    }),
                    setInterval(function () {
                        $('#m_topbar_notification_icon .m-nav__link-icon').addClass('m-animate-shake'),
                            $('#m_topbar_notification_icon .m-nav__link-badge').addClass('m-animate-blink');
                    }, 3e3),
                    setInterval(function () {
                        $('#m_topbar_notification_icon .m-nav__link-icon').removeClass('m-animate-shake'),
                            $('#m_topbar_notification_icon .m-nav__link-badge').removeClass('m-animate-blink');
                    }, 6e3),
                    0 !== $('#m_quicksearch').length &&
                        new mQuicksearch('m_quicksearch', {
                            mode: mUtil.attr('m_quicksearch', 'm-quicksearch-mode'),
                            minLength: 1,
                        }).on('search', function (e) {
                            e.showProgress(),
                                $.ajax({
                                    url: 'https://keenthemes.com/metronic/preview/inc/api/quick_search.php',
                                    data: { query: e.query },
                                    dataType: 'html',
                                    success: function (t) {
                                        e.hideProgress(), e.showResult(t);
                                    },
                                    error: function (t) {
                                        e.hideProgress(), e.showError('Connection error. Pleae try again later.');
                                    },
                                });
                        }),
                    new mScrollTop('m_scroll_top', { offset: 300, speed: 600 });
            },
            initAside: function () {
                var t, e;
                (t = mUtil.get('m_aside_left')),
                    (e = mUtil.hasClass(t, 'm-aside-left--offcanvas-default') ? 'm-aside-left--offcanvas-default' : 'm-aside-left'),
                    (a = new mOffcanvas('m_aside_left', {
                        baseClass: e,
                        overlay: !0,
                        closeBy: 'm_aside_left_close_btn',
                        toggleBy: { target: 'm_aside_left_offcanvas_toggle', state: 'm-brand__toggler--active' },
                    })),
                    (function () {
                        var t = $('#m_ver_menu'),
                            e = '1' === t.data('m-menu-dropdown') ? 'dropdown' : 'accordion';
                        if (
                            ((o = new mMenu('m_ver_menu', {
                                submenu: {
                                    desktop: {
                                        default: e,
                                        state: { body: 'm-aside-left--minimize', mode: 'dropdown' },
                                    },
                                    tablet: 'accordion',
                                    mobile: 'accordion',
                                },
                                accordion: { autoScroll: !0, expandAll: !1 },
                            })),
                            '1' === t.attr('m-menu-scrollable'))
                        ) {
                            function a(t) {
                                if (mUtil.isInResponsiveRange('tablet-and-mobile')) mApp.destroyScroller(t);
                                else {
                                    var e = mUtil.getViewPort().height - parseInt(mUtil.css('m_header', 'height'));
                                    mApp.initScroller(t, { height: e });
                                }
                            }

                            a(t),
                                mUtil.addResizeHandler(function () {
                                    a(t);
                                });
                        }
                    })(),
                    0 !== $('#m_aside_left_minimize_toggle').length &&
                        (l = new mToggle('m_aside_left_minimize_toggle', {
                            target: 'body',
                            targetState: 'm-brand--minimize m-aside-left--minimize',
                            togglerState: 'm-brand__toggler--active',
                        })).on('toggle', function (t) {
                            n.pauseDropdownHover(800), o.pauseDropdownHover(800), Cookies.set('sidebar_toggle_state', t.getState());
                        }),
                    r(),
                    this.onLeftSidebarToggle(function (t) {
                        var e = $('.m-datatable');
                        $(e).each(function () {
                            $(this).mDatatable('redraw');
                        });
                    });
            },
            getAsideMenu: function () {
                return o;
            },
            onLeftSidebarToggle: function (t) {
                l && l.on('toggle', t);
            },
            closeMobileAsideMenuOffcanvas: function () {
                mUtil.isMobileDevice() && a.hide();
            },
            closeMobileHorMenuOffcanvas: function () {
                mUtil.isMobileDevice() && i.hide();
            },
        };
    })();
$(document).ready(function () {
    !1 === mUtil.isAngularVersion() && mLayout.init();
});
