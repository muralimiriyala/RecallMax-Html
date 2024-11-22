(() => {
  var t = {
      137: function (t) {
        var e, n;
        (e = 'undefined' != typeof window ? window : this),
          (n = function () {
            function t() {}
            let e = t.prototype;
            return (
              (e.on = function (t, e) {
                if (!t || !e) return this;
                let n = (this._events = this._events || {}),
                  i = (n[t] = n[t] || []);
                return i.includes(e) || i.push(e), this;
              }),
              (e.once = function (t, e) {
                if (!t || !e) return this;
                this.on(t, e);
                let n = (this._onceEvents = this._onceEvents || {});
                return ((n[t] = n[t] || {})[e] = !0), this;
              }),
              (e.off = function (t, e) {
                let n = this._events && this._events[t];
                if (!n || !n.length) return this;
                let i = n.indexOf(e);
                return -1 != i && n.splice(i, 1), this;
              }),
              (e.emitEvent = function (t, e) {
                let n = this._events && this._events[t];
                if (!n || !n.length) return this;
                (n = n.slice(0)), (e = e || []);
                let i = this._onceEvents && this._onceEvents[t];
                for (let r of n)
                  i && i[r] && (this.off(t, r), delete i[r]), r.apply(this, e);
                return this;
              }),
              (e.allOff = function () {
                return delete this._events, delete this._onceEvents, this;
              }),
              t
            );
          }),
          t.exports ? (t.exports = n()) : (e.EvEmitter = n());
      },
      943: function (t, e, n) {
        !(function (e, i) {
          t.exports
            ? (t.exports = i(e, n(137)))
            : (e.imagesLoaded = i(e, e.EvEmitter));
        })('undefined' != typeof window ? window : this, function (t, e) {
          let n = t.jQuery,
            i = t.console;
          function r(t, e, o) {
            if (!(this instanceof r)) return new r(t, e, o);
            let s = t;
            var a;
            ('string' == typeof t && (s = document.querySelectorAll(t)), s)
              ? ((this.elements =
                  ((a = s),
                  Array.isArray(a)
                    ? a
                    : 'object' == typeof a && 'number' == typeof a.length
                    ? [...a]
                    : [a])),
                (this.options = {}),
                'function' == typeof e
                  ? (o = e)
                  : Object.assign(this.options, e),
                o && this.on('always', o),
                this.getImages(),
                n && (this.jqDeferred = new n.Deferred()),
                setTimeout(this.check.bind(this)))
              : i.error(`Bad element for imagesLoaded ${s || t}`);
          }
          (r.prototype = Object.create(e.prototype)),
            (r.prototype.getImages = function () {
              (this.images = []),
                this.elements.forEach(this.addElementImages, this);
            });
          const o = [1, 9, 11];
          r.prototype.addElementImages = function (t) {
            'IMG' === t.nodeName && this.addImage(t),
              !0 === this.options.background &&
                this.addElementBackgroundImages(t);
            let { nodeType: e } = t;
            if (!e || !o.includes(e)) return;
            let n = t.querySelectorAll('img');
            for (let t of n) this.addImage(t);
            if ('string' == typeof this.options.background) {
              let e = t.querySelectorAll(this.options.background);
              for (let t of e) this.addElementBackgroundImages(t);
            }
          };
          const s = /url\((['"])?(.*?)\1\)/gi;
          function a(t) {
            this.img = t;
          }
          function l(t, e) {
            (this.url = t), (this.element = e), (this.img = new Image());
          }
          return (
            (r.prototype.addElementBackgroundImages = function (t) {
              let e = getComputedStyle(t);
              if (!e) return;
              let n = s.exec(e.backgroundImage);
              for (; null !== n; ) {
                let i = n && n[2];
                i && this.addBackground(i, t), (n = s.exec(e.backgroundImage));
              }
            }),
            (r.prototype.addImage = function (t) {
              let e = new a(t);
              this.images.push(e);
            }),
            (r.prototype.addBackground = function (t, e) {
              let n = new l(t, e);
              this.images.push(n);
            }),
            (r.prototype.check = function () {
              if (
                ((this.progressedCount = 0),
                (this.hasAnyBroken = !1),
                !this.images.length)
              )
                return void this.complete();
              let t = (t, e, n) => {
                setTimeout(() => {
                  this.progress(t, e, n);
                });
              };
              this.images.forEach(function (e) {
                e.once('progress', t), e.check();
              });
            }),
            (r.prototype.progress = function (t, e, n) {
              this.progressedCount++,
                (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
                this.emitEvent('progress', [this, t, e]),
                this.jqDeferred &&
                  this.jqDeferred.notify &&
                  this.jqDeferred.notify(this, t),
                this.progressedCount === this.images.length && this.complete(),
                this.options.debug && i && i.log(`progress: ${n}`, t, e);
            }),
            (r.prototype.complete = function () {
              let t = this.hasAnyBroken ? 'fail' : 'done';
              if (
                ((this.isComplete = !0),
                this.emitEvent(t, [this]),
                this.emitEvent('always', [this]),
                this.jqDeferred)
              ) {
                let t = this.hasAnyBroken ? 'reject' : 'resolve';
                this.jqDeferred[t](this);
              }
            }),
            (a.prototype = Object.create(e.prototype)),
            (a.prototype.check = function () {
              this.getIsImageComplete()
                ? this.confirm(0 !== this.img.naturalWidth, 'naturalWidth')
                : ((this.proxyImage = new Image()),
                  this.img.crossOrigin &&
                    (this.proxyImage.crossOrigin = this.img.crossOrigin),
                  this.proxyImage.addEventListener('load', this),
                  this.proxyImage.addEventListener('error', this),
                  this.img.addEventListener('load', this),
                  this.img.addEventListener('error', this),
                  (this.proxyImage.src = this.img.currentSrc || this.img.src));
            }),
            (a.prototype.getIsImageComplete = function () {
              return this.img.complete && this.img.naturalWidth;
            }),
            (a.prototype.confirm = function (t, e) {
              this.isLoaded = t;
              let { parentNode: n } = this.img,
                i = 'PICTURE' === n.nodeName ? n : this.img;
              this.emitEvent('progress', [this, i, e]);
            }),
            (a.prototype.handleEvent = function (t) {
              let e = 'on' + t.type;
              this[e] && this[e](t);
            }),
            (a.prototype.onload = function () {
              this.confirm(!0, 'onload'), this.unbindEvents();
            }),
            (a.prototype.onerror = function () {
              this.confirm(!1, 'onerror'), this.unbindEvents();
            }),
            (a.prototype.unbindEvents = function () {
              this.proxyImage.removeEventListener('load', this),
                this.proxyImage.removeEventListener('error', this),
                this.img.removeEventListener('load', this),
                this.img.removeEventListener('error', this);
            }),
            (l.prototype = Object.create(a.prototype)),
            (l.prototype.check = function () {
              this.img.addEventListener('load', this),
                this.img.addEventListener('error', this),
                (this.img.src = this.url),
                this.getIsImageComplete() &&
                  (this.confirm(0 !== this.img.naturalWidth, 'naturalWidth'),
                  this.unbindEvents());
            }),
            (l.prototype.unbindEvents = function () {
              this.img.removeEventListener('load', this),
                this.img.removeEventListener('error', this);
            }),
            (l.prototype.confirm = function (t, e) {
              (this.isLoaded = t),
                this.emitEvent('progress', [this, this.element, e]);
            }),
            (r.makeJQueryPlugin = function (e) {
              (e = e || t.jQuery) &&
                ((n = e),
                (n.fn.imagesLoaded = function (t, e) {
                  return new r(this, t, e).jqDeferred.promise(n(this));
                }));
            }),
            r.makeJQueryPlugin(),
            r
          );
        });
      },
      527: function (t, e, n) {
        var i, r, o;
        (r = [n(692)]),
          (i = function (t) {
            (t.fn.appear = function (e, n) {
              var i = t.extend({ data: void 0, one: !0, accX: 0, accY: 0 }, n);
              return this.each(function () {
                var n = t(this);
                if (((n.appeared = !1), e)) {
                  var r = t(window),
                    o = function () {
                      if (n.is(':visible')) {
                        var t = r.scrollLeft(),
                          e = r.scrollTop(),
                          o = n.offset(),
                          s = o.left,
                          a = o.top,
                          l = i.accX,
                          c = i.accY,
                          u = n.height(),
                          d = r.height(),
                          p = n.width(),
                          f = r.width();
                        a + u + c >= e &&
                        a <= e + d + c &&
                        s + p + l >= t &&
                        s <= t + f + l
                          ? n.appeared || n.trigger('appear', i.data)
                          : (n.appeared = !1);
                      } else n.appeared = !1;
                    },
                    s = function () {
                      if (((n.appeared = !0), i.one)) {
                        r.unbind('scroll', o);
                        var s = t.inArray(o, t.fn.appear.checks);
                        s >= 0 && t.fn.appear.checks.splice(s, 1);
                      }
                      e.apply(this, arguments);
                    };
                  i.one
                    ? n.one('appear', i.data, s)
                    : n.bind('appear', i.data, s),
                    r.scroll(o),
                    t.fn.appear.checks.push(o),
                    o();
                } else n.trigger('appear', i.data);
              });
            }),
              t.extend(t.fn.appear, {
                checks: [],
                timeout: null,
                checkAll: function () {
                  var e = t.fn.appear.checks.length;
                  if (e > 0) for (; e--; ) t.fn.appear.checks[e]();
                },
                run: function () {
                  t.fn.appear.timeout && clearTimeout(t.fn.appear.timeout),
                    (t.fn.appear.timeout = setTimeout(
                      t.fn.appear.checkAll,
                      20
                    ));
                },
              }),
              t.each(
                [
                  'append',
                  'prepend',
                  'after',
                  'before',
                  'attr',
                  'removeAttr',
                  'addClass',
                  'removeClass',
                  'toggleClass',
                  'remove',
                  'css',
                  'show',
                  'hide',
                ],
                function (e, n) {
                  var i = t.fn[n];
                  i &&
                    (t.fn[n] = function () {
                      var e = i.apply(this, arguments);
                      return t.fn.appear.run(), e;
                    });
                }
              );
          }),
          void 0 === (o = 'function' == typeof i ? i.apply(e, r) : i) ||
            (t.exports = o);
      },
      692: function (t, e) {
        var n;
        !(function (e, n) {
          'use strict';
          'object' == typeof t.exports
            ? (t.exports = e.document
                ? n(e, !0)
                : function (t) {
                    if (!t.document)
                      throw new Error(
                        'jQuery requires a window with a document'
                      );
                    return n(t);
                  })
            : n(e);
        })('undefined' != typeof window ? window : this, function (i, r) {
          'use strict';
          var o = [],
            s = Object.getPrototypeOf,
            a = o.slice,
            l = o.flat
              ? function (t) {
                  return o.flat.call(t);
                }
              : function (t) {
                  return o.concat.apply([], t);
                },
            c = o.push,
            u = o.indexOf,
            d = {},
            p = d.toString,
            f = d.hasOwnProperty,
            h = f.toString,
            m = h.call(Object),
            g = {},
            v = function (t) {
              return (
                'function' == typeof t &&
                'number' != typeof t.nodeType &&
                'function' != typeof t.item
              );
            },
            y = function (t) {
              return null != t && t === t.window;
            },
            w = i.document,
            b = { type: !0, src: !0, nonce: !0, noModule: !0 };
          function x(t, e, n) {
            var i,
              r,
              o = (n = n || w).createElement('script');
            if (((o.text = t), e))
              for (i in b)
                (r = e[i] || (e.getAttribute && e.getAttribute(i))) &&
                  o.setAttribute(i, r);
            n.head.appendChild(o).parentNode.removeChild(o);
          }
          function k(t) {
            return null == t
              ? t + ''
              : 'object' == typeof t || 'function' == typeof t
              ? d[p.call(t)] || 'object'
              : typeof t;
          }
          var _ = '3.7.1',
            T = /HTML$/i,
            S = function (t, e) {
              return new S.fn.init(t, e);
            };
          function C(t) {
            var e = !!t && 'length' in t && t.length,
              n = k(t);
            return (
              !v(t) &&
              !y(t) &&
              ('array' === n ||
                0 === e ||
                ('number' == typeof e && e > 0 && e - 1 in t))
            );
          }
          function E(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
          }
          (S.fn = S.prototype =
            {
              jquery: _,
              constructor: S,
              length: 0,
              toArray: function () {
                return a.call(this);
              },
              get: function (t) {
                return null == t
                  ? a.call(this)
                  : t < 0
                  ? this[t + this.length]
                  : this[t];
              },
              pushStack: function (t) {
                var e = S.merge(this.constructor(), t);
                return (e.prevObject = this), e;
              },
              each: function (t) {
                return S.each(this, t);
              },
              map: function (t) {
                return this.pushStack(
                  S.map(this, function (e, n) {
                    return t.call(e, n, e);
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
              even: function () {
                return this.pushStack(
                  S.grep(this, function (t, e) {
                    return (e + 1) % 2;
                  })
                );
              },
              odd: function () {
                return this.pushStack(
                  S.grep(this, function (t, e) {
                    return e % 2;
                  })
                );
              },
              eq: function (t) {
                var e = this.length,
                  n = +t + (t < 0 ? e : 0);
                return this.pushStack(n >= 0 && n < e ? [this[n]] : []);
              },
              end: function () {
                return this.prevObject || this.constructor();
              },
              push: c,
              sort: o.sort,
              splice: o.splice,
            }),
            (S.extend = S.fn.extend =
              function () {
                var t,
                  e,
                  n,
                  i,
                  r,
                  o,
                  s = arguments[0] || {},
                  a = 1,
                  l = arguments.length,
                  c = !1;
                for (
                  'boolean' == typeof s &&
                    ((c = s), (s = arguments[a] || {}), a++),
                    'object' == typeof s || v(s) || (s = {}),
                    a === l && ((s = this), a--);
                  a < l;
                  a++
                )
                  if (null != (t = arguments[a]))
                    for (e in t)
                      (i = t[e]),
                        '__proto__' !== e &&
                          s !== i &&
                          (c &&
                          i &&
                          (S.isPlainObject(i) || (r = Array.isArray(i)))
                            ? ((n = s[e]),
                              (o =
                                r && !Array.isArray(n)
                                  ? []
                                  : r || S.isPlainObject(n)
                                  ? n
                                  : {}),
                              (r = !1),
                              (s[e] = S.extend(c, o, i)))
                            : void 0 !== i && (s[e] = i));
                return s;
              }),
            S.extend({
              expando: 'jQuery' + (_ + Math.random()).replace(/\D/g, ''),
              isReady: !0,
              error: function (t) {
                throw new Error(t);
              },
              noop: function () {},
              isPlainObject: function (t) {
                var e, n;
                return (
                  !(!t || '[object Object]' !== p.call(t)) &&
                  (!(e = s(t)) ||
                    ('function' ==
                      typeof (n = f.call(e, 'constructor') && e.constructor) &&
                      h.call(n) === m))
                );
              },
              isEmptyObject: function (t) {
                var e;
                for (e in t) return !1;
                return !0;
              },
              globalEval: function (t, e, n) {
                x(t, { nonce: e && e.nonce }, n);
              },
              each: function (t, e) {
                var n,
                  i = 0;
                if (C(t))
                  for (
                    n = t.length;
                    i < n && !1 !== e.call(t[i], i, t[i]);
                    i++
                  );
                else for (i in t) if (!1 === e.call(t[i], i, t[i])) break;
                return t;
              },
              text: function (t) {
                var e,
                  n = '',
                  i = 0,
                  r = t.nodeType;
                if (!r) for (; (e = t[i++]); ) n += S.text(e);
                return 1 === r || 11 === r
                  ? t.textContent
                  : 9 === r
                  ? t.documentElement.textContent
                  : 3 === r || 4 === r
                  ? t.nodeValue
                  : n;
              },
              makeArray: function (t, e) {
                var n = e || [];
                return (
                  null != t &&
                    (C(Object(t))
                      ? S.merge(n, 'string' == typeof t ? [t] : t)
                      : c.call(n, t)),
                  n
                );
              },
              inArray: function (t, e, n) {
                return null == e ? -1 : u.call(e, t, n);
              },
              isXMLDoc: function (t) {
                var e = t && t.namespaceURI,
                  n = t && (t.ownerDocument || t).documentElement;
                return !T.test(e || (n && n.nodeName) || 'HTML');
              },
              merge: function (t, e) {
                for (var n = +e.length, i = 0, r = t.length; i < n; i++)
                  t[r++] = e[i];
                return (t.length = r), t;
              },
              grep: function (t, e, n) {
                for (var i = [], r = 0, o = t.length, s = !n; r < o; r++)
                  !e(t[r], r) !== s && i.push(t[r]);
                return i;
              },
              map: function (t, e, n) {
                var i,
                  r,
                  o = 0,
                  s = [];
                if (C(t))
                  for (i = t.length; o < i; o++)
                    null != (r = e(t[o], o, n)) && s.push(r);
                else for (o in t) null != (r = e(t[o], o, n)) && s.push(r);
                return l(s);
              },
              guid: 1,
              support: g,
            }),
            'function' == typeof Symbol &&
              (S.fn[Symbol.iterator] = o[Symbol.iterator]),
            S.each(
              'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(
                ' '
              ),
              function (t, e) {
                d['[object ' + e + ']'] = e.toLowerCase();
              }
            );
          var $ = o.pop,
            A = o.sort,
            L = o.splice,
            O = '[\\x20\\t\\r\\n\\f]',
            D = new RegExp(
              '^' + O + '+|((?:^|[^\\\\])(?:\\\\.)*)' + O + '+$',
              'g'
            );
          S.contains = function (t, e) {
            var n = e && e.parentNode;
            return (
              t === n ||
              !(
                !n ||
                1 !== n.nodeType ||
                !(t.contains
                  ? t.contains(n)
                  : t.compareDocumentPosition &&
                    16 & t.compareDocumentPosition(n))
              )
            );
          };
          var P = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
          function M(t, e) {
            return e
              ? '\0' === t
                ? '�'
                : t.slice(0, -1) +
                  '\\' +
                  t.charCodeAt(t.length - 1).toString(16) +
                  ' '
              : '\\' + t;
          }
          S.escapeSelector = function (t) {
            return (t + '').replace(P, M);
          };
          var I = w,
            q = c;
          !(function () {
            var t,
              e,
              n,
              r,
              s,
              l,
              c,
              d,
              p,
              h,
              m = q,
              v = S.expando,
              y = 0,
              w = 0,
              b = tt(),
              x = tt(),
              k = tt(),
              _ = tt(),
              T = function (t, e) {
                return t === e && (s = !0), 0;
              },
              C =
                'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
              P =
                '(?:\\\\[\\da-fA-F]{1,6}' +
                O +
                '?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+',
              M =
                '\\[' +
                O +
                '*(' +
                P +
                ')(?:' +
                O +
                '*([*^$|!~]?=)' +
                O +
                '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
                P +
                '))|)' +
                O +
                '*\\]',
              H =
                ':(' +
                P +
                ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
                M +
                ')*)|.*)\\)|)',
              j = new RegExp(O + '+', 'g'),
              z = new RegExp('^' + O + '*,' + O + '*'),
              N = new RegExp('^' + O + '*([>+~]|' + O + ')' + O + '*'),
              F = new RegExp(O + '|>'),
              R = new RegExp(H),
              B = new RegExp('^' + P + '$'),
              W = {
                ID: new RegExp('^#(' + P + ')'),
                CLASS: new RegExp('^\\.(' + P + ')'),
                TAG: new RegExp('^(' + P + '|[*])'),
                ATTR: new RegExp('^' + M),
                PSEUDO: new RegExp('^' + H),
                CHILD: new RegExp(
                  '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
                    O +
                    '*(even|odd|(([+-]|)(\\d*)n|)' +
                    O +
                    '*(?:([+-]|)' +
                    O +
                    '*(\\d+)|))' +
                    O +
                    '*\\)|)',
                  'i'
                ),
                bool: new RegExp('^(?:' + C + ')$', 'i'),
                needsContext: new RegExp(
                  '^' +
                    O +
                    '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
                    O +
                    '*((?:-\\d)?\\d*)' +
                    O +
                    '*\\)|)(?=[^-]|$)',
                  'i'
                ),
              },
              V = /^(?:input|select|textarea|button)$/i,
              U = /^h\d$/i,
              Y = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
              X = /[+~]/,
              G = new RegExp(
                '\\\\[\\da-fA-F]{1,6}' + O + '?|\\\\([^\\r\\n\\f])',
                'g'
              ),
              Q = function (t, e) {
                var n = '0x' + t.slice(1) - 65536;
                return (
                  e ||
                  (n < 0
                    ? String.fromCharCode(n + 65536)
                    : String.fromCharCode(
                        (n >> 10) | 55296,
                        (1023 & n) | 56320
                      ))
                );
              },
              Z = function () {
                lt();
              },
              K = pt(
                function (t) {
                  return !0 === t.disabled && E(t, 'fieldset');
                },
                { dir: 'parentNode', next: 'legend' }
              );
            try {
              m.apply((o = a.call(I.childNodes)), I.childNodes),
                o[I.childNodes.length].nodeType;
            } catch (t) {
              m = {
                apply: function (t, e) {
                  q.apply(t, a.call(e));
                },
                call: function (t) {
                  q.apply(t, a.call(arguments, 1));
                },
              };
            }
            function J(t, e, n, i) {
              var r,
                o,
                s,
                a,
                c,
                u,
                f,
                h = e && e.ownerDocument,
                y = e ? e.nodeType : 9;
              if (
                ((n = n || []),
                'string' != typeof t || !t || (1 !== y && 9 !== y && 11 !== y))
              )
                return n;
              if (!i && (lt(e), (e = e || l), d)) {
                if (11 !== y && (c = Y.exec(t)))
                  if ((r = c[1])) {
                    if (9 === y) {
                      if (!(s = e.getElementById(r))) return n;
                      if (s.id === r) return m.call(n, s), n;
                    } else if (
                      h &&
                      (s = h.getElementById(r)) &&
                      J.contains(e, s) &&
                      s.id === r
                    )
                      return m.call(n, s), n;
                  } else {
                    if (c[2]) return m.apply(n, e.getElementsByTagName(t)), n;
                    if ((r = c[3]) && e.getElementsByClassName)
                      return m.apply(n, e.getElementsByClassName(r)), n;
                  }
                if (!(_[t + ' '] || (p && p.test(t)))) {
                  if (((f = t), (h = e), 1 === y && (F.test(t) || N.test(t)))) {
                    for (
                      ((h = (X.test(t) && at(e.parentNode)) || e) == e &&
                        g.scope) ||
                        ((a = e.getAttribute('id'))
                          ? (a = S.escapeSelector(a))
                          : e.setAttribute('id', (a = v))),
                        o = (u = ut(t)).length;
                      o--;

                    )
                      u[o] = (a ? '#' + a : ':scope') + ' ' + dt(u[o]);
                    f = u.join(',');
                  }
                  try {
                    return m.apply(n, h.querySelectorAll(f)), n;
                  } catch (e) {
                    _(t, !0);
                  } finally {
                    a === v && e.removeAttribute('id');
                  }
                }
              }
              return yt(t.replace(D, '$1'), e, n, i);
            }
            function tt() {
              var t = [];
              return function n(i, r) {
                return (
                  t.push(i + ' ') > e.cacheLength && delete n[t.shift()],
                  (n[i + ' '] = r)
                );
              };
            }
            function et(t) {
              return (t[v] = !0), t;
            }
            function nt(t) {
              var e = l.createElement('fieldset');
              try {
                return !!t(e);
              } catch (t) {
                return !1;
              } finally {
                e.parentNode && e.parentNode.removeChild(e), (e = null);
              }
            }
            function it(t) {
              return function (e) {
                return E(e, 'input') && e.type === t;
              };
            }
            function rt(t) {
              return function (e) {
                return (E(e, 'input') || E(e, 'button')) && e.type === t;
              };
            }
            function ot(t) {
              return function (e) {
                return 'form' in e
                  ? e.parentNode && !1 === e.disabled
                    ? 'label' in e
                      ? 'label' in e.parentNode
                        ? e.parentNode.disabled === t
                        : e.disabled === t
                      : e.isDisabled === t ||
                        (e.isDisabled !== !t && K(e) === t)
                    : e.disabled === t
                  : 'label' in e && e.disabled === t;
              };
            }
            function st(t) {
              return et(function (e) {
                return (
                  (e = +e),
                  et(function (n, i) {
                    for (var r, o = t([], n.length, e), s = o.length; s--; )
                      n[(r = o[s])] && (n[r] = !(i[r] = n[r]));
                  })
                );
              });
            }
            function at(t) {
              return t && void 0 !== t.getElementsByTagName && t;
            }
            function lt(t) {
              var n,
                i = t ? t.ownerDocument || t : I;
              return i != l && 9 === i.nodeType && i.documentElement
                ? ((c = (l = i).documentElement),
                  (d = !S.isXMLDoc(l)),
                  (h =
                    c.matches ||
                    c.webkitMatchesSelector ||
                    c.msMatchesSelector),
                  c.msMatchesSelector &&
                    I != l &&
                    (n = l.defaultView) &&
                    n.top !== n &&
                    n.addEventListener('unload', Z),
                  (g.getById = nt(function (t) {
                    return (
                      (c.appendChild(t).id = S.expando),
                      !l.getElementsByName ||
                        !l.getElementsByName(S.expando).length
                    );
                  })),
                  (g.disconnectedMatch = nt(function (t) {
                    return h.call(t, '*');
                  })),
                  (g.scope = nt(function () {
                    return l.querySelectorAll(':scope');
                  })),
                  (g.cssHas = nt(function () {
                    try {
                      return l.querySelector(':has(*,:jqfake)'), !1;
                    } catch (t) {
                      return !0;
                    }
                  })),
                  g.getById
                    ? ((e.filter.ID = function (t) {
                        var e = t.replace(G, Q);
                        return function (t) {
                          return t.getAttribute('id') === e;
                        };
                      }),
                      (e.find.ID = function (t, e) {
                        if (void 0 !== e.getElementById && d) {
                          var n = e.getElementById(t);
                          return n ? [n] : [];
                        }
                      }))
                    : ((e.filter.ID = function (t) {
                        var e = t.replace(G, Q);
                        return function (t) {
                          var n =
                            void 0 !== t.getAttributeNode &&
                            t.getAttributeNode('id');
                          return n && n.value === e;
                        };
                      }),
                      (e.find.ID = function (t, e) {
                        if (void 0 !== e.getElementById && d) {
                          var n,
                            i,
                            r,
                            o = e.getElementById(t);
                          if (o) {
                            if ((n = o.getAttributeNode('id')) && n.value === t)
                              return [o];
                            for (
                              r = e.getElementsByName(t), i = 0;
                              (o = r[i++]);

                            )
                              if (
                                (n = o.getAttributeNode('id')) &&
                                n.value === t
                              )
                                return [o];
                          }
                          return [];
                        }
                      })),
                  (e.find.TAG = function (t, e) {
                    return void 0 !== e.getElementsByTagName
                      ? e.getElementsByTagName(t)
                      : e.querySelectorAll(t);
                  }),
                  (e.find.CLASS = function (t, e) {
                    if (void 0 !== e.getElementsByClassName && d)
                      return e.getElementsByClassName(t);
                  }),
                  (p = []),
                  nt(function (t) {
                    var e;
                    (c.appendChild(t).innerHTML =
                      "<a id='" +
                      v +
                      "' href='' disabled='disabled'></a><select id='" +
                      v +
                      "-\r\\' disabled='disabled'><option selected=''></option></select>"),
                      t.querySelectorAll('[selected]').length ||
                        p.push('\\[' + O + '*(?:value|' + C + ')'),
                      t.querySelectorAll('[id~=' + v + '-]').length ||
                        p.push('~='),
                      t.querySelectorAll('a#' + v + '+*').length ||
                        p.push('.#.+[+~]'),
                      t.querySelectorAll(':checked').length ||
                        p.push(':checked'),
                      (e = l.createElement('input')).setAttribute(
                        'type',
                        'hidden'
                      ),
                      t.appendChild(e).setAttribute('name', 'D'),
                      (c.appendChild(t).disabled = !0),
                      2 !== t.querySelectorAll(':disabled').length &&
                        p.push(':enabled', ':disabled'),
                      (e = l.createElement('input')).setAttribute('name', ''),
                      t.appendChild(e),
                      t.querySelectorAll("[name='']").length ||
                        p.push(
                          '\\[' + O + '*name' + O + '*=' + O + '*(?:\'\'|"")'
                        );
                  }),
                  g.cssHas || p.push(':has'),
                  (p = p.length && new RegExp(p.join('|'))),
                  (T = function (t, e) {
                    if (t === e) return (s = !0), 0;
                    var n =
                      !t.compareDocumentPosition - !e.compareDocumentPosition;
                    return (
                      n ||
                      (1 &
                        (n =
                          (t.ownerDocument || t) == (e.ownerDocument || e)
                            ? t.compareDocumentPosition(e)
                            : 1) ||
                      (!g.sortDetached && e.compareDocumentPosition(t) === n)
                        ? t === l || (t.ownerDocument == I && J.contains(I, t))
                          ? -1
                          : e === l ||
                            (e.ownerDocument == I && J.contains(I, e))
                          ? 1
                          : r
                          ? u.call(r, t) - u.call(r, e)
                          : 0
                        : 4 & n
                        ? -1
                        : 1)
                    );
                  }),
                  l)
                : l;
            }
            for (t in ((J.matches = function (t, e) {
              return J(t, null, null, e);
            }),
            (J.matchesSelector = function (t, e) {
              if ((lt(t), d && !_[e + ' '] && (!p || !p.test(e))))
                try {
                  var n = h.call(t, e);
                  if (
                    n ||
                    g.disconnectedMatch ||
                    (t.document && 11 !== t.document.nodeType)
                  )
                    return n;
                } catch (t) {
                  _(e, !0);
                }
              return J(e, l, null, [t]).length > 0;
            }),
            (J.contains = function (t, e) {
              return (t.ownerDocument || t) != l && lt(t), S.contains(t, e);
            }),
            (J.attr = function (t, n) {
              (t.ownerDocument || t) != l && lt(t);
              var i = e.attrHandle[n.toLowerCase()],
                r =
                  i && f.call(e.attrHandle, n.toLowerCase())
                    ? i(t, n, !d)
                    : void 0;
              return void 0 !== r ? r : t.getAttribute(n);
            }),
            (J.error = function (t) {
              throw new Error('Syntax error, unrecognized expression: ' + t);
            }),
            (S.uniqueSort = function (t) {
              var e,
                n = [],
                i = 0,
                o = 0;
              if (
                ((s = !g.sortStable),
                (r = !g.sortStable && a.call(t, 0)),
                A.call(t, T),
                s)
              ) {
                for (; (e = t[o++]); ) e === t[o] && (i = n.push(o));
                for (; i--; ) L.call(t, n[i], 1);
              }
              return (r = null), t;
            }),
            (S.fn.uniqueSort = function () {
              return this.pushStack(S.uniqueSort(a.apply(this)));
            }),
            (e = S.expr =
              {
                cacheLength: 50,
                createPseudo: et,
                match: W,
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
                      (t[1] = t[1].replace(G, Q)),
                      (t[3] = (t[3] || t[4] || t[5] || '').replace(G, Q)),
                      '~=' === t[2] && (t[3] = ' ' + t[3] + ' '),
                      t.slice(0, 4)
                    );
                  },
                  CHILD: function (t) {
                    return (
                      (t[1] = t[1].toLowerCase()),
                      'nth' === t[1].slice(0, 3)
                        ? (t[3] || J.error(t[0]),
                          (t[4] = +(t[4]
                            ? t[5] + (t[6] || 1)
                            : 2 * ('even' === t[3] || 'odd' === t[3]))),
                          (t[5] = +(t[7] + t[8] || 'odd' === t[3])))
                        : t[3] && J.error(t[0]),
                      t
                    );
                  },
                  PSEUDO: function (t) {
                    var e,
                      n = !t[6] && t[2];
                    return W.CHILD.test(t[0])
                      ? null
                      : (t[3]
                          ? (t[2] = t[4] || t[5] || '')
                          : n &&
                            R.test(n) &&
                            (e = ut(n, !0)) &&
                            (e = n.indexOf(')', n.length - e) - n.length) &&
                            ((t[0] = t[0].slice(0, e)), (t[2] = n.slice(0, e))),
                        t.slice(0, 3));
                  },
                },
                filter: {
                  TAG: function (t) {
                    var e = t.replace(G, Q).toLowerCase();
                    return '*' === t
                      ? function () {
                          return !0;
                        }
                      : function (t) {
                          return E(t, e);
                        };
                  },
                  CLASS: function (t) {
                    var e = b[t + ' '];
                    return (
                      e ||
                      ((e = new RegExp(
                        '(^|' + O + ')' + t + '(' + O + '|$)'
                      )) &&
                        b(t, function (t) {
                          return e.test(
                            ('string' == typeof t.className && t.className) ||
                              (void 0 !== t.getAttribute &&
                                t.getAttribute('class')) ||
                              ''
                          );
                        }))
                    );
                  },
                  ATTR: function (t, e, n) {
                    return function (i) {
                      var r = J.attr(i, t);
                      return null == r
                        ? '!=' === e
                        : !e ||
                            ((r += ''),
                            '=' === e
                              ? r === n
                              : '!=' === e
                              ? r !== n
                              : '^=' === e
                              ? n && 0 === r.indexOf(n)
                              : '*=' === e
                              ? n && r.indexOf(n) > -1
                              : '$=' === e
                              ? n && r.slice(-n.length) === n
                              : '~=' === e
                              ? (' ' + r.replace(j, ' ') + ' ').indexOf(n) > -1
                              : '|=' === e &&
                                (r === n ||
                                  r.slice(0, n.length + 1) === n + '-'));
                    };
                  },
                  CHILD: function (t, e, n, i, r) {
                    var o = 'nth' !== t.slice(0, 3),
                      s = 'last' !== t.slice(-4),
                      a = 'of-type' === e;
                    return 1 === i && 0 === r
                      ? function (t) {
                          return !!t.parentNode;
                        }
                      : function (e, n, l) {
                          var c,
                            u,
                            d,
                            p,
                            f,
                            h = o !== s ? 'nextSibling' : 'previousSibling',
                            m = e.parentNode,
                            g = a && e.nodeName.toLowerCase(),
                            w = !l && !a,
                            b = !1;
                          if (m) {
                            if (o) {
                              for (; h; ) {
                                for (d = e; (d = d[h]); )
                                  if (a ? E(d, g) : 1 === d.nodeType) return !1;
                                f = h = 'only' === t && !f && 'nextSibling';
                              }
                              return !0;
                            }
                            if (
                              ((f = [s ? m.firstChild : m.lastChild]), s && w)
                            ) {
                              for (
                                b =
                                  (p =
                                    (c =
                                      (u = m[v] || (m[v] = {}))[t] || [])[0] ===
                                      y && c[1]) && c[2],
                                  d = p && m.childNodes[p];
                                (d =
                                  (++p && d && d[h]) || (b = p = 0) || f.pop());

                              )
                                if (1 === d.nodeType && ++b && d === e) {
                                  u[t] = [y, p, b];
                                  break;
                                }
                            } else if (
                              (w &&
                                (b = p =
                                  (c =
                                    (u = e[v] || (e[v] = {}))[t] || [])[0] ===
                                    y && c[1]),
                              !1 === b)
                            )
                              for (
                                ;
                                (d =
                                  (++p && d && d[h]) ||
                                  (b = p = 0) ||
                                  f.pop()) &&
                                (!(a ? E(d, g) : 1 === d.nodeType) ||
                                  !++b ||
                                  (w && ((u = d[v] || (d[v] = {}))[t] = [y, b]),
                                  d !== e));

                              );
                            return (b -= r) === i || (b % i == 0 && b / i >= 0);
                          }
                        };
                  },
                  PSEUDO: function (t, n) {
                    var i,
                      r =
                        e.pseudos[t] ||
                        e.setFilters[t.toLowerCase()] ||
                        J.error('unsupported pseudo: ' + t);
                    return r[v]
                      ? r(n)
                      : r.length > 1
                      ? ((i = [t, t, '', n]),
                        e.setFilters.hasOwnProperty(t.toLowerCase())
                          ? et(function (t, e) {
                              for (var i, o = r(t, n), s = o.length; s--; )
                                t[(i = u.call(t, o[s]))] = !(e[i] = o[s]);
                            })
                          : function (t) {
                              return r(t, 0, i);
                            })
                      : r;
                  },
                },
                pseudos: {
                  not: et(function (t) {
                    var e = [],
                      n = [],
                      i = vt(t.replace(D, '$1'));
                    return i[v]
                      ? et(function (t, e, n, r) {
                          for (
                            var o, s = i(t, null, r, []), a = t.length;
                            a--;

                          )
                            (o = s[a]) && (t[a] = !(e[a] = o));
                        })
                      : function (t, r, o) {
                          return (
                            (e[0] = t),
                            i(e, null, o, n),
                            (e[0] = null),
                            !n.pop()
                          );
                        };
                  }),
                  has: et(function (t) {
                    return function (e) {
                      return J(t, e).length > 0;
                    };
                  }),
                  contains: et(function (t) {
                    return (
                      (t = t.replace(G, Q)),
                      function (e) {
                        return (e.textContent || S.text(e)).indexOf(t) > -1;
                      }
                    );
                  }),
                  lang: et(function (t) {
                    return (
                      B.test(t || '') || J.error('unsupported lang: ' + t),
                      (t = t.replace(G, Q).toLowerCase()),
                      function (e) {
                        var n;
                        do {
                          if (
                            (n = d
                              ? e.lang
                              : e.getAttribute('xml:lang') ||
                                e.getAttribute('lang'))
                          )
                            return (
                              (n = n.toLowerCase()) === t ||
                              0 === n.indexOf(t + '-')
                            );
                        } while ((e = e.parentNode) && 1 === e.nodeType);
                        return !1;
                      }
                    );
                  }),
                  target: function (t) {
                    var e = i.location && i.location.hash;
                    return e && e.slice(1) === t.id;
                  },
                  root: function (t) {
                    return t === c;
                  },
                  focus: function (t) {
                    return (
                      t ===
                        (function () {
                          try {
                            return l.activeElement;
                          } catch (t) {}
                        })() &&
                      l.hasFocus() &&
                      !!(t.type || t.href || ~t.tabIndex)
                    );
                  },
                  enabled: ot(!1),
                  disabled: ot(!0),
                  checked: function (t) {
                    return (
                      (E(t, 'input') && !!t.checked) ||
                      (E(t, 'option') && !!t.selected)
                    );
                  },
                  selected: function (t) {
                    return (
                      t.parentNode && t.parentNode.selectedIndex,
                      !0 === t.selected
                    );
                  },
                  empty: function (t) {
                    for (t = t.firstChild; t; t = t.nextSibling)
                      if (t.nodeType < 6) return !1;
                    return !0;
                  },
                  parent: function (t) {
                    return !e.pseudos.empty(t);
                  },
                  header: function (t) {
                    return U.test(t.nodeName);
                  },
                  input: function (t) {
                    return V.test(t.nodeName);
                  },
                  button: function (t) {
                    return (
                      (E(t, 'input') && 'button' === t.type) || E(t, 'button')
                    );
                  },
                  text: function (t) {
                    var e;
                    return (
                      E(t, 'input') &&
                      'text' === t.type &&
                      (null == (e = t.getAttribute('type')) ||
                        'text' === e.toLowerCase())
                    );
                  },
                  first: st(function () {
                    return [0];
                  }),
                  last: st(function (t, e) {
                    return [e - 1];
                  }),
                  eq: st(function (t, e, n) {
                    return [n < 0 ? n + e : n];
                  }),
                  even: st(function (t, e) {
                    for (var n = 0; n < e; n += 2) t.push(n);
                    return t;
                  }),
                  odd: st(function (t, e) {
                    for (var n = 1; n < e; n += 2) t.push(n);
                    return t;
                  }),
                  lt: st(function (t, e, n) {
                    var i;
                    for (i = n < 0 ? n + e : n > e ? e : n; --i >= 0; )
                      t.push(i);
                    return t;
                  }),
                  gt: st(function (t, e, n) {
                    for (var i = n < 0 ? n + e : n; ++i < e; ) t.push(i);
                    return t;
                  }),
                },
              }),
            (e.pseudos.nth = e.pseudos.eq),
            { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
              e.pseudos[t] = it(t);
            for (t in { submit: !0, reset: !0 }) e.pseudos[t] = rt(t);
            function ct() {}
            function ut(t, n) {
              var i,
                r,
                o,
                s,
                a,
                l,
                c,
                u = x[t + ' '];
              if (u) return n ? 0 : u.slice(0);
              for (a = t, l = [], c = e.preFilter; a; ) {
                for (s in ((i && !(r = z.exec(a))) ||
                  (r && (a = a.slice(r[0].length) || a), l.push((o = []))),
                (i = !1),
                (r = N.exec(a)) &&
                  ((i = r.shift()),
                  o.push({ value: i, type: r[0].replace(D, ' ') }),
                  (a = a.slice(i.length))),
                e.filter))
                  !(r = W[s].exec(a)) ||
                    (c[s] && !(r = c[s](r))) ||
                    ((i = r.shift()),
                    o.push({ value: i, type: s, matches: r }),
                    (a = a.slice(i.length)));
                if (!i) break;
              }
              return n ? a.length : a ? J.error(t) : x(t, l).slice(0);
            }
            function dt(t) {
              for (var e = 0, n = t.length, i = ''; e < n; e++) i += t[e].value;
              return i;
            }
            function pt(t, e, n) {
              var i = e.dir,
                r = e.next,
                o = r || i,
                s = n && 'parentNode' === o,
                a = w++;
              return e.first
                ? function (e, n, r) {
                    for (; (e = e[i]); )
                      if (1 === e.nodeType || s) return t(e, n, r);
                    return !1;
                  }
                : function (e, n, l) {
                    var c,
                      u,
                      d = [y, a];
                    if (l) {
                      for (; (e = e[i]); )
                        if ((1 === e.nodeType || s) && t(e, n, l)) return !0;
                    } else
                      for (; (e = e[i]); )
                        if (1 === e.nodeType || s)
                          if (((u = e[v] || (e[v] = {})), r && E(e, r)))
                            e = e[i] || e;
                          else {
                            if ((c = u[o]) && c[0] === y && c[1] === a)
                              return (d[2] = c[2]);
                            if (((u[o] = d), (d[2] = t(e, n, l)))) return !0;
                          }
                    return !1;
                  };
            }
            function ft(t) {
              return t.length > 1
                ? function (e, n, i) {
                    for (var r = t.length; r--; ) if (!t[r](e, n, i)) return !1;
                    return !0;
                  }
                : t[0];
            }
            function ht(t, e, n, i, r) {
              for (
                var o, s = [], a = 0, l = t.length, c = null != e;
                a < l;
                a++
              )
                (o = t[a]) &&
                  ((n && !n(o, i, r)) || (s.push(o), c && e.push(a)));
              return s;
            }
            function mt(t, e, n, i, r, o) {
              return (
                i && !i[v] && (i = mt(i)),
                r && !r[v] && (r = mt(r, o)),
                et(function (o, s, a, l) {
                  var c,
                    d,
                    p,
                    f,
                    h = [],
                    g = [],
                    v = s.length,
                    y =
                      o ||
                      (function (t, e, n) {
                        for (var i = 0, r = e.length; i < r; i++) J(t, e[i], n);
                        return n;
                      })(e || '*', a.nodeType ? [a] : a, []),
                    w = !t || (!o && e) ? y : ht(y, h, t, a, l);
                  if (
                    (n
                      ? n(w, (f = r || (o ? t : v || i) ? [] : s), a, l)
                      : (f = w),
                    i)
                  )
                    for (c = ht(f, g), i(c, [], a, l), d = c.length; d--; )
                      (p = c[d]) && (f[g[d]] = !(w[g[d]] = p));
                  if (o) {
                    if (r || t) {
                      if (r) {
                        for (c = [], d = f.length; d--; )
                          (p = f[d]) && c.push((w[d] = p));
                        r(null, (f = []), c, l);
                      }
                      for (d = f.length; d--; )
                        (p = f[d]) &&
                          (c = r ? u.call(o, p) : h[d]) > -1 &&
                          (o[c] = !(s[c] = p));
                    }
                  } else (f = ht(f === s ? f.splice(v, f.length) : f)), r ? r(null, s, f, l) : m.apply(s, f);
                })
              );
            }
            function gt(t) {
              for (
                var i,
                  r,
                  o,
                  s = t.length,
                  a = e.relative[t[0].type],
                  l = a || e.relative[' '],
                  c = a ? 1 : 0,
                  d = pt(
                    function (t) {
                      return t === i;
                    },
                    l,
                    !0
                  ),
                  p = pt(
                    function (t) {
                      return u.call(i, t) > -1;
                    },
                    l,
                    !0
                  ),
                  f = [
                    function (t, e, r) {
                      var o =
                        (!a && (r || e != n)) ||
                        ((i = e).nodeType ? d(t, e, r) : p(t, e, r));
                      return (i = null), o;
                    },
                  ];
                c < s;
                c++
              )
                if ((r = e.relative[t[c].type])) f = [pt(ft(f), r)];
                else {
                  if ((r = e.filter[t[c].type].apply(null, t[c].matches))[v]) {
                    for (o = ++c; o < s && !e.relative[t[o].type]; o++);
                    return mt(
                      c > 1 && ft(f),
                      c > 1 &&
                        dt(
                          t
                            .slice(0, c - 1)
                            .concat({ value: ' ' === t[c - 2].type ? '*' : '' })
                        ).replace(D, '$1'),
                      r,
                      c < o && gt(t.slice(c, o)),
                      o < s && gt((t = t.slice(o))),
                      o < s && dt(t)
                    );
                  }
                  f.push(r);
                }
              return ft(f);
            }
            function vt(t, i) {
              var r,
                o = [],
                s = [],
                a = k[t + ' '];
              if (!a) {
                for (i || (i = ut(t)), r = i.length; r--; )
                  (a = gt(i[r]))[v] ? o.push(a) : s.push(a);
                (a = k(
                  t,
                  (function (t, i) {
                    var r = i.length > 0,
                      o = t.length > 0,
                      s = function (s, a, c, u, p) {
                        var f,
                          h,
                          g,
                          v = 0,
                          w = '0',
                          b = s && [],
                          x = [],
                          k = n,
                          _ = s || (o && e.find.TAG('*', p)),
                          T = (y += null == k ? 1 : Math.random() || 0.1),
                          C = _.length;
                        for (
                          p && (n = a == l || a || p);
                          w !== C && null != (f = _[w]);
                          w++
                        ) {
                          if (o && f) {
                            for (
                              h = 0,
                                a || f.ownerDocument == l || (lt(f), (c = !d));
                              (g = t[h++]);

                            )
                              if (g(f, a || l, c)) {
                                m.call(u, f);
                                break;
                              }
                            p && (y = T);
                          }
                          r && ((f = !g && f) && v--, s && b.push(f));
                        }
                        if (((v += w), r && w !== v)) {
                          for (h = 0; (g = i[h++]); ) g(b, x, a, c);
                          if (s) {
                            if (v > 0)
                              for (; w--; ) b[w] || x[w] || (x[w] = $.call(u));
                            x = ht(x);
                          }
                          m.apply(u, x),
                            p &&
                              !s &&
                              x.length > 0 &&
                              v + i.length > 1 &&
                              S.uniqueSort(u);
                        }
                        return p && ((y = T), (n = k)), b;
                      };
                    return r ? et(s) : s;
                  })(s, o)
                )),
                  (a.selector = t);
              }
              return a;
            }
            function yt(t, n, i, r) {
              var o,
                s,
                a,
                l,
                c,
                u = 'function' == typeof t && t,
                p = !r && ut((t = u.selector || t));
              if (((i = i || []), 1 === p.length)) {
                if (
                  (s = p[0] = p[0].slice(0)).length > 2 &&
                  'ID' === (a = s[0]).type &&
                  9 === n.nodeType &&
                  d &&
                  e.relative[s[1].type]
                ) {
                  if (
                    !(n = (e.find.ID(a.matches[0].replace(G, Q), n) || [])[0])
                  )
                    return i;
                  u && (n = n.parentNode),
                    (t = t.slice(s.shift().value.length));
                }
                for (
                  o = W.needsContext.test(t) ? 0 : s.length;
                  o-- && ((a = s[o]), !e.relative[(l = a.type)]);

                )
                  if (
                    (c = e.find[l]) &&
                    (r = c(
                      a.matches[0].replace(G, Q),
                      (X.test(s[0].type) && at(n.parentNode)) || n
                    ))
                  ) {
                    if ((s.splice(o, 1), !(t = r.length && dt(s))))
                      return m.apply(i, r), i;
                    break;
                  }
              }
              return (
                (u || vt(t, p))(
                  r,
                  n,
                  !d,
                  i,
                  !n || (X.test(t) && at(n.parentNode)) || n
                ),
                i
              );
            }
            (ct.prototype = e.filters = e.pseudos),
              (e.setFilters = new ct()),
              (g.sortStable = v.split('').sort(T).join('') === v),
              lt(),
              (g.sortDetached = nt(function (t) {
                return (
                  1 & t.compareDocumentPosition(l.createElement('fieldset'))
                );
              })),
              (S.find = J),
              (S.expr[':'] = S.expr.pseudos),
              (S.unique = S.uniqueSort),
              (J.compile = vt),
              (J.select = yt),
              (J.setDocument = lt),
              (J.tokenize = ut),
              (J.escape = S.escapeSelector),
              (J.getText = S.text),
              (J.isXML = S.isXMLDoc),
              (J.selectors = S.expr),
              (J.support = S.support),
              (J.uniqueSort = S.uniqueSort);
          })();
          var H = function (t, e, n) {
              for (
                var i = [], r = void 0 !== n;
                (t = t[e]) && 9 !== t.nodeType;

              )
                if (1 === t.nodeType) {
                  if (r && S(t).is(n)) break;
                  i.push(t);
                }
              return i;
            },
            j = function (t, e) {
              for (var n = []; t; t = t.nextSibling)
                1 === t.nodeType && t !== e && n.push(t);
              return n;
            },
            z = S.expr.match.needsContext,
            N =
              /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
          function F(t, e, n) {
            return v(e)
              ? S.grep(t, function (t, i) {
                  return !!e.call(t, i, t) !== n;
                })
              : e.nodeType
              ? S.grep(t, function (t) {
                  return (t === e) !== n;
                })
              : 'string' != typeof e
              ? S.grep(t, function (t) {
                  return u.call(e, t) > -1 !== n;
                })
              : S.filter(e, t, n);
          }
          (S.filter = function (t, e, n) {
            var i = e[0];
            return (
              n && (t = ':not(' + t + ')'),
              1 === e.length && 1 === i.nodeType
                ? S.find.matchesSelector(i, t)
                  ? [i]
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
                  n,
                  i = this.length,
                  r = this;
                if ('string' != typeof t)
                  return this.pushStack(
                    S(t).filter(function () {
                      for (e = 0; e < i; e++)
                        if (S.contains(r[e], this)) return !0;
                    })
                  );
                for (n = this.pushStack([]), e = 0; e < i; e++)
                  S.find(t, r[e], n);
                return i > 1 ? S.uniqueSort(n) : n;
              },
              filter: function (t) {
                return this.pushStack(F(this, t || [], !1));
              },
              not: function (t) {
                return this.pushStack(F(this, t || [], !0));
              },
              is: function (t) {
                return !!F(
                  this,
                  'string' == typeof t && z.test(t) ? S(t) : t || [],
                  !1
                ).length;
              },
            });
          var R,
            B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
          ((S.fn.init = function (t, e, n) {
            var i, r;
            if (!t) return this;
            if (((n = n || R), 'string' == typeof t)) {
              if (
                !(i =
                  '<' === t[0] && '>' === t[t.length - 1] && t.length >= 3
                    ? [null, t, null]
                    : B.exec(t)) ||
                (!i[1] && e)
              )
                return !e || e.jquery
                  ? (e || n).find(t)
                  : this.constructor(e).find(t);
              if (i[1]) {
                if (
                  ((e = e instanceof S ? e[0] : e),
                  S.merge(
                    this,
                    S.parseHTML(
                      i[1],
                      e && e.nodeType ? e.ownerDocument || e : w,
                      !0
                    )
                  ),
                  N.test(i[1]) && S.isPlainObject(e))
                )
                  for (i in e) v(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                return this;
              }
              return (
                (r = w.getElementById(i[2])) &&
                  ((this[0] = r), (this.length = 1)),
                this
              );
            }
            return t.nodeType
              ? ((this[0] = t), (this.length = 1), this)
              : v(t)
              ? void 0 !== n.ready
                ? n.ready(t)
                : t(S)
              : S.makeArray(t, this);
          }).prototype = S.fn),
            (R = S(w));
          var W = /^(?:parents|prev(?:Until|All))/,
            V = { children: !0, contents: !0, next: !0, prev: !0 };
          function U(t, e) {
            for (; (t = t[e]) && 1 !== t.nodeType; );
            return t;
          }
          S.fn.extend({
            has: function (t) {
              var e = S(t, this),
                n = e.length;
              return this.filter(function () {
                for (var t = 0; t < n; t++)
                  if (S.contains(this, e[t])) return !0;
              });
            },
            closest: function (t, e) {
              var n,
                i = 0,
                r = this.length,
                o = [],
                s = 'string' != typeof t && S(t);
              if (!z.test(t))
                for (; i < r; i++)
                  for (n = this[i]; n && n !== e; n = n.parentNode)
                    if (
                      n.nodeType < 11 &&
                      (s
                        ? s.index(n) > -1
                        : 1 === n.nodeType && S.find.matchesSelector(n, t))
                    ) {
                      o.push(n);
                      break;
                    }
              return this.pushStack(o.length > 1 ? S.uniqueSort(o) : o);
            },
            index: function (t) {
              return t
                ? 'string' == typeof t
                  ? u.call(S(t), this[0])
                  : u.call(this, t.jquery ? t[0] : t)
                : this[0] && this[0].parentNode
                ? this.first().prevAll().length
                : -1;
            },
            add: function (t, e) {
              return this.pushStack(S.uniqueSort(S.merge(this.get(), S(t, e))));
            },
            addBack: function (t) {
              return this.add(
                null == t ? this.prevObject : this.prevObject.filter(t)
              );
            },
          }),
            S.each(
              {
                parent: function (t) {
                  var e = t.parentNode;
                  return e && 11 !== e.nodeType ? e : null;
                },
                parents: function (t) {
                  return H(t, 'parentNode');
                },
                parentsUntil: function (t, e, n) {
                  return H(t, 'parentNode', n);
                },
                next: function (t) {
                  return U(t, 'nextSibling');
                },
                prev: function (t) {
                  return U(t, 'previousSibling');
                },
                nextAll: function (t) {
                  return H(t, 'nextSibling');
                },
                prevAll: function (t) {
                  return H(t, 'previousSibling');
                },
                nextUntil: function (t, e, n) {
                  return H(t, 'nextSibling', n);
                },
                prevUntil: function (t, e, n) {
                  return H(t, 'previousSibling', n);
                },
                siblings: function (t) {
                  return j((t.parentNode || {}).firstChild, t);
                },
                children: function (t) {
                  return j(t.firstChild);
                },
                contents: function (t) {
                  return null != t.contentDocument && s(t.contentDocument)
                    ? t.contentDocument
                    : (E(t, 'template') && (t = t.content || t),
                      S.merge([], t.childNodes));
                },
              },
              function (t, e) {
                S.fn[t] = function (n, i) {
                  var r = S.map(this, e, n);
                  return (
                    'Until' !== t.slice(-5) && (i = n),
                    i && 'string' == typeof i && (r = S.filter(i, r)),
                    this.length > 1 &&
                      (V[t] || S.uniqueSort(r), W.test(t) && r.reverse()),
                    this.pushStack(r)
                  );
                };
              }
            );
          var Y = /[^\x20\t\r\n\f]+/g;
          function X(t) {
            return t;
          }
          function G(t) {
            throw t;
          }
          function Q(t, e, n, i) {
            var r;
            try {
              t && v((r = t.promise))
                ? r.call(t).done(e).fail(n)
                : t && v((r = t.then))
                ? r.call(t, e, n)
                : e.apply(void 0, [t].slice(i));
            } catch (t) {
              n.apply(void 0, [t]);
            }
          }
          (S.Callbacks = function (t) {
            t =
              'string' == typeof t
                ? (function (t) {
                    var e = {};
                    return (
                      S.each(t.match(Y) || [], function (t, n) {
                        e[n] = !0;
                      }),
                      e
                    );
                  })(t)
                : S.extend({}, t);
            var e,
              n,
              i,
              r,
              o = [],
              s = [],
              a = -1,
              l = function () {
                for (r = r || t.once, i = e = !0; s.length; a = -1)
                  for (n = s.shift(); ++a < o.length; )
                    !1 === o[a].apply(n[0], n[1]) &&
                      t.stopOnFalse &&
                      ((a = o.length), (n = !1));
                t.memory || (n = !1), (e = !1), r && (o = n ? [] : '');
              },
              c = {
                add: function () {
                  return (
                    o &&
                      (n && !e && ((a = o.length - 1), s.push(n)),
                      (function e(n) {
                        S.each(n, function (n, i) {
                          v(i)
                            ? (t.unique && c.has(i)) || o.push(i)
                            : i && i.length && 'string' !== k(i) && e(i);
                        });
                      })(arguments),
                      n && !e && l()),
                    this
                  );
                },
                remove: function () {
                  return (
                    S.each(arguments, function (t, e) {
                      for (var n; (n = S.inArray(e, o, n)) > -1; )
                        o.splice(n, 1), n <= a && a--;
                    }),
                    this
                  );
                },
                has: function (t) {
                  return t ? S.inArray(t, o) > -1 : o.length > 0;
                },
                empty: function () {
                  return o && (o = []), this;
                },
                disable: function () {
                  return (r = s = []), (o = n = ''), this;
                },
                disabled: function () {
                  return !o;
                },
                lock: function () {
                  return (r = s = []), n || e || (o = n = ''), this;
                },
                locked: function () {
                  return !!r;
                },
                fireWith: function (t, n) {
                  return (
                    r ||
                      ((n = [t, (n = n || []).slice ? n.slice() : n]),
                      s.push(n),
                      e || l()),
                    this
                  );
                },
                fire: function () {
                  return c.fireWith(this, arguments), this;
                },
                fired: function () {
                  return !!i;
                },
              };
            return c;
          }),
            S.extend({
              Deferred: function (t) {
                var e = [
                    [
                      'notify',
                      'progress',
                      S.Callbacks('memory'),
                      S.Callbacks('memory'),
                      2,
                    ],
                    [
                      'resolve',
                      'done',
                      S.Callbacks('once memory'),
                      S.Callbacks('once memory'),
                      0,
                      'resolved',
                    ],
                    [
                      'reject',
                      'fail',
                      S.Callbacks('once memory'),
                      S.Callbacks('once memory'),
                      1,
                      'rejected',
                    ],
                  ],
                  n = 'pending',
                  r = {
                    state: function () {
                      return n;
                    },
                    always: function () {
                      return o.done(arguments).fail(arguments), this;
                    },
                    catch: function (t) {
                      return r.then(null, t);
                    },
                    pipe: function () {
                      var t = arguments;
                      return S.Deferred(function (n) {
                        S.each(e, function (e, i) {
                          var r = v(t[i[4]]) && t[i[4]];
                          o[i[1]](function () {
                            var t = r && r.apply(this, arguments);
                            t && v(t.promise)
                              ? t
                                  .promise()
                                  .progress(n.notify)
                                  .done(n.resolve)
                                  .fail(n.reject)
                              : n[i[0] + 'With'](this, r ? [t] : arguments);
                          });
                        }),
                          (t = null);
                      }).promise();
                    },
                    then: function (t, n, r) {
                      var o = 0;
                      function s(t, e, n, r) {
                        return function () {
                          var a = this,
                            l = arguments,
                            c = function () {
                              var i, c;
                              if (!(t < o)) {
                                if ((i = n.apply(a, l)) === e.promise())
                                  throw new TypeError(
                                    'Thenable self-resolution'
                                  );
                                (c =
                                  i &&
                                  ('object' == typeof i ||
                                    'function' == typeof i) &&
                                  i.then),
                                  v(c)
                                    ? r
                                      ? c.call(i, s(o, e, X, r), s(o, e, G, r))
                                      : (o++,
                                        c.call(
                                          i,
                                          s(o, e, X, r),
                                          s(o, e, G, r),
                                          s(o, e, X, e.notifyWith)
                                        ))
                                    : (n !== X && ((a = void 0), (l = [i])),
                                      (r || e.resolveWith)(a, l));
                              }
                            },
                            u = r
                              ? c
                              : function () {
                                  try {
                                    c();
                                  } catch (i) {
                                    S.Deferred.exceptionHook &&
                                      S.Deferred.exceptionHook(i, u.error),
                                      t + 1 >= o &&
                                        (n !== G && ((a = void 0), (l = [i])),
                                        e.rejectWith(a, l));
                                  }
                                };
                          t
                            ? u()
                            : (S.Deferred.getErrorHook
                                ? (u.error = S.Deferred.getErrorHook())
                                : S.Deferred.getStackHook &&
                                  (u.error = S.Deferred.getStackHook()),
                              i.setTimeout(u));
                        };
                      }
                      return S.Deferred(function (i) {
                        e[0][3].add(s(0, i, v(r) ? r : X, i.notifyWith)),
                          e[1][3].add(s(0, i, v(t) ? t : X)),
                          e[2][3].add(s(0, i, v(n) ? n : G));
                      }).promise();
                    },
                    promise: function (t) {
                      return null != t ? S.extend(t, r) : r;
                    },
                  },
                  o = {};
                return (
                  S.each(e, function (t, i) {
                    var s = i[2],
                      a = i[5];
                    (r[i[1]] = s.add),
                      a &&
                        s.add(
                          function () {
                            n = a;
                          },
                          e[3 - t][2].disable,
                          e[3 - t][3].disable,
                          e[0][2].lock,
                          e[0][3].lock
                        ),
                      s.add(i[3].fire),
                      (o[i[0]] = function () {
                        return (
                          o[i[0] + 'With'](
                            this === o ? void 0 : this,
                            arguments
                          ),
                          this
                        );
                      }),
                      (o[i[0] + 'With'] = s.fireWith);
                  }),
                  r.promise(o),
                  t && t.call(o, o),
                  o
                );
              },
              when: function (t) {
                var e = arguments.length,
                  n = e,
                  i = Array(n),
                  r = a.call(arguments),
                  o = S.Deferred(),
                  s = function (t) {
                    return function (n) {
                      (i[t] = this),
                        (r[t] = arguments.length > 1 ? a.call(arguments) : n),
                        --e || o.resolveWith(i, r);
                    };
                  };
                if (
                  e <= 1 &&
                  (Q(t, o.done(s(n)).resolve, o.reject, !e),
                  'pending' === o.state() || v(r[n] && r[n].then))
                )
                  return o.then();
                for (; n--; ) Q(r[n], s(n), o.reject);
                return o.promise();
              },
            });
          var Z = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
          (S.Deferred.exceptionHook = function (t, e) {
            i.console &&
              i.console.warn &&
              t &&
              Z.test(t.name) &&
              i.console.warn(
                'jQuery.Deferred exception: ' + t.message,
                t.stack,
                e
              );
          }),
            (S.readyException = function (t) {
              i.setTimeout(function () {
                throw t;
              });
            });
          var K = S.Deferred();
          function J() {
            w.removeEventListener('DOMContentLoaded', J),
              i.removeEventListener('load', J),
              S.ready();
          }
          (S.fn.ready = function (t) {
            return (
              K.then(t).catch(function (t) {
                S.readyException(t);
              }),
              this
            );
          }),
            S.extend({
              isReady: !1,
              readyWait: 1,
              ready: function (t) {
                (!0 === t ? --S.readyWait : S.isReady) ||
                  ((S.isReady = !0),
                  (!0 !== t && --S.readyWait > 0) || K.resolveWith(w, [S]));
              },
            }),
            (S.ready.then = K.then),
            'complete' === w.readyState ||
            ('loading' !== w.readyState && !w.documentElement.doScroll)
              ? i.setTimeout(S.ready)
              : (w.addEventListener('DOMContentLoaded', J),
                i.addEventListener('load', J));
          var tt = function (t, e, n, i, r, o, s) {
              var a = 0,
                l = t.length,
                c = null == n;
              if ('object' === k(n))
                for (a in ((r = !0), n)) tt(t, e, a, n[a], !0, o, s);
              else if (
                void 0 !== i &&
                ((r = !0),
                v(i) || (s = !0),
                c &&
                  (s
                    ? (e.call(t, i), (e = null))
                    : ((c = e),
                      (e = function (t, e, n) {
                        return c.call(S(t), n);
                      }))),
                e)
              )
                for (; a < l; a++)
                  e(t[a], n, s ? i : i.call(t[a], a, e(t[a], n)));
              return r ? t : c ? e.call(t) : l ? e(t[0], n) : o;
            },
            et = /^-ms-/,
            nt = /-([a-z])/g;
          function it(t, e) {
            return e.toUpperCase();
          }
          function rt(t) {
            return t.replace(et, 'ms-').replace(nt, it);
          }
          var ot = function (t) {
            return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
          };
          function st() {
            this.expando = S.expando + st.uid++;
          }
          (st.uid = 1),
            (st.prototype = {
              cache: function (t) {
                var e = t[this.expando];
                return (
                  e ||
                    ((e = {}),
                    ot(t) &&
                      (t.nodeType
                        ? (t[this.expando] = e)
                        : Object.defineProperty(t, this.expando, {
                            value: e,
                            configurable: !0,
                          }))),
                  e
                );
              },
              set: function (t, e, n) {
                var i,
                  r = this.cache(t);
                if ('string' == typeof e) r[rt(e)] = n;
                else for (i in e) r[rt(i)] = e[i];
                return r;
              },
              get: function (t, e) {
                return void 0 === e
                  ? this.cache(t)
                  : t[this.expando] && t[this.expando][rt(e)];
              },
              access: function (t, e, n) {
                return void 0 === e ||
                  (e && 'string' == typeof e && void 0 === n)
                  ? this.get(t, e)
                  : (this.set(t, e, n), void 0 !== n ? n : e);
              },
              remove: function (t, e) {
                var n,
                  i = t[this.expando];
                if (void 0 !== i) {
                  if (void 0 !== e) {
                    n = (e = Array.isArray(e)
                      ? e.map(rt)
                      : (e = rt(e)) in i
                      ? [e]
                      : e.match(Y) || []).length;
                    for (; n--; ) delete i[e[n]];
                  }
                  (void 0 === e || S.isEmptyObject(i)) &&
                    (t.nodeType
                      ? (t[this.expando] = void 0)
                      : delete t[this.expando]);
                }
              },
              hasData: function (t) {
                var e = t[this.expando];
                return void 0 !== e && !S.isEmptyObject(e);
              },
            });
          var at = new st(),
            lt = new st(),
            ct = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            ut = /[A-Z]/g;
          function dt(t, e, n) {
            var i;
            if (void 0 === n && 1 === t.nodeType)
              if (
                ((i = 'data-' + e.replace(ut, '-$&').toLowerCase()),
                'string' == typeof (n = t.getAttribute(i)))
              ) {
                try {
                  n = (function (t) {
                    return (
                      'true' === t ||
                      ('false' !== t &&
                        ('null' === t
                          ? null
                          : t === +t + ''
                          ? +t
                          : ct.test(t)
                          ? JSON.parse(t)
                          : t))
                    );
                  })(n);
                } catch (t) {}
                lt.set(t, e, n);
              } else n = void 0;
            return n;
          }
          S.extend({
            hasData: function (t) {
              return lt.hasData(t) || at.hasData(t);
            },
            data: function (t, e, n) {
              return lt.access(t, e, n);
            },
            removeData: function (t, e) {
              lt.remove(t, e);
            },
            _data: function (t, e, n) {
              return at.access(t, e, n);
            },
            _removeData: function (t, e) {
              at.remove(t, e);
            },
          }),
            S.fn.extend({
              data: function (t, e) {
                var n,
                  i,
                  r,
                  o = this[0],
                  s = o && o.attributes;
                if (void 0 === t) {
                  if (
                    this.length &&
                    ((r = lt.get(o)),
                    1 === o.nodeType && !at.get(o, 'hasDataAttrs'))
                  ) {
                    for (n = s.length; n--; )
                      s[n] &&
                        0 === (i = s[n].name).indexOf('data-') &&
                        ((i = rt(i.slice(5))), dt(o, i, r[i]));
                    at.set(o, 'hasDataAttrs', !0);
                  }
                  return r;
                }
                return 'object' == typeof t
                  ? this.each(function () {
                      lt.set(this, t);
                    })
                  : tt(
                      this,
                      function (e) {
                        var n;
                        if (o && void 0 === e)
                          return void 0 !== (n = lt.get(o, t)) ||
                            void 0 !== (n = dt(o, t))
                            ? n
                            : void 0;
                        this.each(function () {
                          lt.set(this, t, e);
                        });
                      },
                      null,
                      e,
                      arguments.length > 1,
                      null,
                      !0
                    );
              },
              removeData: function (t) {
                return this.each(function () {
                  lt.remove(this, t);
                });
              },
            }),
            S.extend({
              queue: function (t, e, n) {
                var i;
                if (t)
                  return (
                    (e = (e || 'fx') + 'queue'),
                    (i = at.get(t, e)),
                    n &&
                      (!i || Array.isArray(n)
                        ? (i = at.access(t, e, S.makeArray(n)))
                        : i.push(n)),
                    i || []
                  );
              },
              dequeue: function (t, e) {
                e = e || 'fx';
                var n = S.queue(t, e),
                  i = n.length,
                  r = n.shift(),
                  o = S._queueHooks(t, e);
                'inprogress' === r && ((r = n.shift()), i--),
                  r &&
                    ('fx' === e && n.unshift('inprogress'),
                    delete o.stop,
                    r.call(
                      t,
                      function () {
                        S.dequeue(t, e);
                      },
                      o
                    )),
                  !i && o && o.empty.fire();
              },
              _queueHooks: function (t, e) {
                var n = e + 'queueHooks';
                return (
                  at.get(t, n) ||
                  at.access(t, n, {
                    empty: S.Callbacks('once memory').add(function () {
                      at.remove(t, [e + 'queue', n]);
                    }),
                  })
                );
              },
            }),
            S.fn.extend({
              queue: function (t, e) {
                var n = 2;
                return (
                  'string' != typeof t && ((e = t), (t = 'fx'), n--),
                  arguments.length < n
                    ? S.queue(this[0], t)
                    : void 0 === e
                    ? this
                    : this.each(function () {
                        var n = S.queue(this, t, e);
                        S._queueHooks(this, t),
                          'fx' === t &&
                            'inprogress' !== n[0] &&
                            S.dequeue(this, t);
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
                var n,
                  i = 1,
                  r = S.Deferred(),
                  o = this,
                  s = this.length,
                  a = function () {
                    --i || r.resolveWith(o, [o]);
                  };
                for (
                  'string' != typeof t && ((e = t), (t = void 0)),
                    t = t || 'fx';
                  s--;

                )
                  (n = at.get(o[s], t + 'queueHooks')) &&
                    n.empty &&
                    (i++, n.empty.add(a));
                return a(), r.promise(e);
              },
            });
          var pt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            ft = new RegExp('^(?:([+-])=|)(' + pt + ')([a-z%]*)$', 'i'),
            ht = ['Top', 'Right', 'Bottom', 'Left'],
            mt = w.documentElement,
            gt = function (t) {
              return S.contains(t.ownerDocument, t);
            },
            vt = { composed: !0 };
          mt.getRootNode &&
            (gt = function (t) {
              return (
                S.contains(t.ownerDocument, t) ||
                t.getRootNode(vt) === t.ownerDocument
              );
            });
          var yt = function (t, e) {
            return (
              'none' === (t = e || t).style.display ||
              ('' === t.style.display &&
                gt(t) &&
                'none' === S.css(t, 'display'))
            );
          };
          function wt(t, e, n, i) {
            var r,
              o,
              s = 20,
              a = i
                ? function () {
                    return i.cur();
                  }
                : function () {
                    return S.css(t, e, '');
                  },
              l = a(),
              c = (n && n[3]) || (S.cssNumber[e] ? '' : 'px'),
              u =
                t.nodeType &&
                (S.cssNumber[e] || ('px' !== c && +l)) &&
                ft.exec(S.css(t, e));
            if (u && u[3] !== c) {
              for (l /= 2, c = c || u[3], u = +l || 1; s--; )
                S.style(t, e, u + c),
                  (1 - o) * (1 - (o = a() / l || 0.5)) <= 0 && (s = 0),
                  (u /= o);
              (u *= 2), S.style(t, e, u + c), (n = n || []);
            }
            return (
              n &&
                ((u = +u || +l || 0),
                (r = n[1] ? u + (n[1] + 1) * n[2] : +n[2]),
                i && ((i.unit = c), (i.start = u), (i.end = r))),
              r
            );
          }
          var bt = {};
          function xt(t) {
            var e,
              n = t.ownerDocument,
              i = t.nodeName,
              r = bt[i];
            return (
              r ||
              ((e = n.body.appendChild(n.createElement(i))),
              (r = S.css(e, 'display')),
              e.parentNode.removeChild(e),
              'none' === r && (r = 'block'),
              (bt[i] = r),
              r)
            );
          }
          function kt(t, e) {
            for (var n, i, r = [], o = 0, s = t.length; o < s; o++)
              (i = t[o]).style &&
                ((n = i.style.display),
                e
                  ? ('none' === n &&
                      ((r[o] = at.get(i, 'display') || null),
                      r[o] || (i.style.display = '')),
                    '' === i.style.display && yt(i) && (r[o] = xt(i)))
                  : 'none' !== n && ((r[o] = 'none'), at.set(i, 'display', n)));
            for (o = 0; o < s; o++) null != r[o] && (t[o].style.display = r[o]);
            return t;
          }
          S.fn.extend({
            show: function () {
              return kt(this, !0);
            },
            hide: function () {
              return kt(this);
            },
            toggle: function (t) {
              return 'boolean' == typeof t
                ? t
                  ? this.show()
                  : this.hide()
                : this.each(function () {
                    yt(this) ? S(this).show() : S(this).hide();
                  });
            },
          });
          var _t,
            Tt,
            St = /^(?:checkbox|radio)$/i,
            Ct = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            Et = /^$|^module$|\/(?:java|ecma)script/i;
          (_t = w.createDocumentFragment().appendChild(w.createElement('div'))),
            (Tt = w.createElement('input')).setAttribute('type', 'radio'),
            Tt.setAttribute('checked', 'checked'),
            Tt.setAttribute('name', 't'),
            _t.appendChild(Tt),
            (g.checkClone = _t.cloneNode(!0).cloneNode(!0).lastChild.checked),
            (_t.innerHTML = '<textarea>x</textarea>'),
            (g.noCloneChecked = !!_t.cloneNode(!0).lastChild.defaultValue),
            (_t.innerHTML = '<option></option>'),
            (g.option = !!_t.lastChild);
          var $t = {
            thead: [1, '<table>', '</table>'],
            col: [2, '<table><colgroup>', '</colgroup></table>'],
            tr: [2, '<table><tbody>', '</tbody></table>'],
            td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
            _default: [0, '', ''],
          };
          function At(t, e) {
            var n;
            return (
              (n =
                void 0 !== t.getElementsByTagName
                  ? t.getElementsByTagName(e || '*')
                  : void 0 !== t.querySelectorAll
                  ? t.querySelectorAll(e || '*')
                  : []),
              void 0 === e || (e && E(t, e)) ? S.merge([t], n) : n
            );
          }
          function Lt(t, e) {
            for (var n = 0, i = t.length; n < i; n++)
              at.set(t[n], 'globalEval', !e || at.get(e[n], 'globalEval'));
          }
          ($t.tbody = $t.tfoot = $t.colgroup = $t.caption = $t.thead),
            ($t.th = $t.td),
            g.option ||
              ($t.optgroup = $t.option =
                [1, "<select multiple='multiple'>", '</select>']);
          var Ot = /<|&#?\w+;/;
          function Dt(t, e, n, i, r) {
            for (
              var o,
                s,
                a,
                l,
                c,
                u,
                d = e.createDocumentFragment(),
                p = [],
                f = 0,
                h = t.length;
              f < h;
              f++
            )
              if ((o = t[f]) || 0 === o)
                if ('object' === k(o)) S.merge(p, o.nodeType ? [o] : o);
                else if (Ot.test(o)) {
                  for (
                    s = s || d.appendChild(e.createElement('div')),
                      a = (Ct.exec(o) || ['', ''])[1].toLowerCase(),
                      l = $t[a] || $t._default,
                      s.innerHTML = l[1] + S.htmlPrefilter(o) + l[2],
                      u = l[0];
                    u--;

                  )
                    s = s.lastChild;
                  S.merge(p, s.childNodes),
                    ((s = d.firstChild).textContent = '');
                } else p.push(e.createTextNode(o));
            for (d.textContent = '', f = 0; (o = p[f++]); )
              if (i && S.inArray(o, i) > -1) r && r.push(o);
              else if (
                ((c = gt(o)),
                (s = At(d.appendChild(o), 'script')),
                c && Lt(s),
                n)
              )
                for (u = 0; (o = s[u++]); ) Et.test(o.type || '') && n.push(o);
            return d;
          }
          var Pt = /^([^.]*)(?:\.(.+)|)/;
          function Mt() {
            return !0;
          }
          function It() {
            return !1;
          }
          function qt(t, e, n, i, r, o) {
            var s, a;
            if ('object' == typeof e) {
              for (a in ('string' != typeof n && ((i = i || n), (n = void 0)),
              e))
                qt(t, a, n, i, e[a], o);
              return t;
            }
            if (
              (null == i && null == r
                ? ((r = n), (i = n = void 0))
                : null == r &&
                  ('string' == typeof n
                    ? ((r = i), (i = void 0))
                    : ((r = i), (i = n), (n = void 0))),
              !1 === r)
            )
              r = It;
            else if (!r) return t;
            return (
              1 === o &&
                ((s = r),
                (r = function (t) {
                  return S().off(t), s.apply(this, arguments);
                }),
                (r.guid = s.guid || (s.guid = S.guid++))),
              t.each(function () {
                S.event.add(this, e, r, i, n);
              })
            );
          }
          function Ht(t, e, n) {
            n
              ? (at.set(t, e, !1),
                S.event.add(t, e, {
                  namespace: !1,
                  handler: function (t) {
                    var n,
                      i = at.get(this, e);
                    if (1 & t.isTrigger && this[e]) {
                      if (i)
                        (S.event.special[e] || {}).delegateType &&
                          t.stopPropagation();
                      else if (
                        ((i = a.call(arguments)),
                        at.set(this, e, i),
                        this[e](),
                        (n = at.get(this, e)),
                        at.set(this, e, !1),
                        i !== n)
                      )
                        return (
                          t.stopImmediatePropagation(), t.preventDefault(), n
                        );
                    } else
                      i &&
                        (at.set(
                          this,
                          e,
                          S.event.trigger(i[0], i.slice(1), this)
                        ),
                        t.stopPropagation(),
                        (t.isImmediatePropagationStopped = Mt));
                  },
                }))
              : void 0 === at.get(t, e) && S.event.add(t, e, Mt);
          }
          (S.event = {
            global: {},
            add: function (t, e, n, i, r) {
              var o,
                s,
                a,
                l,
                c,
                u,
                d,
                p,
                f,
                h,
                m,
                g = at.get(t);
              if (ot(t))
                for (
                  n.handler && ((n = (o = n).handler), (r = o.selector)),
                    r && S.find.matchesSelector(mt, r),
                    n.guid || (n.guid = S.guid++),
                    (l = g.events) || (l = g.events = Object.create(null)),
                    (s = g.handle) ||
                      (s = g.handle =
                        function (e) {
                          return void 0 !== S && S.event.triggered !== e.type
                            ? S.event.dispatch.apply(t, arguments)
                            : void 0;
                        }),
                    c = (e = (e || '').match(Y) || ['']).length;
                  c--;

                )
                  (f = m = (a = Pt.exec(e[c]) || [])[1]),
                    (h = (a[2] || '').split('.').sort()),
                    f &&
                      ((d = S.event.special[f] || {}),
                      (f = (r ? d.delegateType : d.bindType) || f),
                      (d = S.event.special[f] || {}),
                      (u = S.extend(
                        {
                          type: f,
                          origType: m,
                          data: i,
                          handler: n,
                          guid: n.guid,
                          selector: r,
                          needsContext: r && S.expr.match.needsContext.test(r),
                          namespace: h.join('.'),
                        },
                        o
                      )),
                      (p = l[f]) ||
                        (((p = l[f] = []).delegateCount = 0),
                        (d.setup && !1 !== d.setup.call(t, i, h, s)) ||
                          (t.addEventListener && t.addEventListener(f, s))),
                      d.add &&
                        (d.add.call(t, u),
                        u.handler.guid || (u.handler.guid = n.guid)),
                      r ? p.splice(p.delegateCount++, 0, u) : p.push(u),
                      (S.event.global[f] = !0));
            },
            remove: function (t, e, n, i, r) {
              var o,
                s,
                a,
                l,
                c,
                u,
                d,
                p,
                f,
                h,
                m,
                g = at.hasData(t) && at.get(t);
              if (g && (l = g.events)) {
                for (c = (e = (e || '').match(Y) || ['']).length; c--; )
                  if (
                    ((f = m = (a = Pt.exec(e[c]) || [])[1]),
                    (h = (a[2] || '').split('.').sort()),
                    f)
                  ) {
                    for (
                      d = S.event.special[f] || {},
                        p =
                          l[(f = (i ? d.delegateType : d.bindType) || f)] || [],
                        a =
                          a[2] &&
                          new RegExp(
                            '(^|\\.)' + h.join('\\.(?:.*\\.|)') + '(\\.|$)'
                          ),
                        s = o = p.length;
                      o--;

                    )
                      (u = p[o]),
                        (!r && m !== u.origType) ||
                          (n && n.guid !== u.guid) ||
                          (a && !a.test(u.namespace)) ||
                          (i &&
                            i !== u.selector &&
                            ('**' !== i || !u.selector)) ||
                          (p.splice(o, 1),
                          u.selector && p.delegateCount--,
                          d.remove && d.remove.call(t, u));
                    s &&
                      !p.length &&
                      ((d.teardown && !1 !== d.teardown.call(t, h, g.handle)) ||
                        S.removeEvent(t, f, g.handle),
                      delete l[f]);
                  } else for (f in l) S.event.remove(t, f + e[c], n, i, !0);
                S.isEmptyObject(l) && at.remove(t, 'handle events');
              }
            },
            dispatch: function (t) {
              var e,
                n,
                i,
                r,
                o,
                s,
                a = new Array(arguments.length),
                l = S.event.fix(t),
                c =
                  (at.get(this, 'events') || Object.create(null))[l.type] || [],
                u = S.event.special[l.type] || {};
              for (a[0] = l, e = 1; e < arguments.length; e++)
                a[e] = arguments[e];
              if (
                ((l.delegateTarget = this),
                !u.preDispatch || !1 !== u.preDispatch.call(this, l))
              ) {
                for (
                  s = S.event.handlers.call(this, l, c), e = 0;
                  (r = s[e++]) && !l.isPropagationStopped();

                )
                  for (
                    l.currentTarget = r.elem, n = 0;
                    (o = r.handlers[n++]) && !l.isImmediatePropagationStopped();

                  )
                    (l.rnamespace &&
                      !1 !== o.namespace &&
                      !l.rnamespace.test(o.namespace)) ||
                      ((l.handleObj = o),
                      (l.data = o.data),
                      void 0 !==
                        (i = (
                          (S.event.special[o.origType] || {}).handle ||
                          o.handler
                        ).apply(r.elem, a)) &&
                        !1 === (l.result = i) &&
                        (l.preventDefault(), l.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, l), l.result;
              }
            },
            handlers: function (t, e) {
              var n,
                i,
                r,
                o,
                s,
                a = [],
                l = e.delegateCount,
                c = t.target;
              if (l && c.nodeType && !('click' === t.type && t.button >= 1))
                for (; c !== this; c = c.parentNode || this)
                  if (
                    1 === c.nodeType &&
                    ('click' !== t.type || !0 !== c.disabled)
                  ) {
                    for (o = [], s = {}, n = 0; n < l; n++)
                      void 0 === s[(r = (i = e[n]).selector + ' ')] &&
                        (s[r] = i.needsContext
                          ? S(r, this).index(c) > -1
                          : S.find(r, this, null, [c]).length),
                        s[r] && o.push(i);
                    o.length && a.push({ elem: c, handlers: o });
                  }
              return (
                (c = this),
                l < e.length && a.push({ elem: c, handlers: e.slice(l) }),
                a
              );
            },
            addProp: function (t, e) {
              Object.defineProperty(S.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: v(e)
                  ? function () {
                      if (this.originalEvent) return e(this.originalEvent);
                    }
                  : function () {
                      if (this.originalEvent) return this.originalEvent[t];
                    },
                set: function (e) {
                  Object.defineProperty(this, t, {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: e,
                  });
                },
              });
            },
            fix: function (t) {
              return t[S.expando] ? t : new S.Event(t);
            },
            special: {
              load: { noBubble: !0 },
              click: {
                setup: function (t) {
                  var e = this || t;
                  return (
                    St.test(e.type) &&
                      e.click &&
                      E(e, 'input') &&
                      Ht(e, 'click', !0),
                    !1
                  );
                },
                trigger: function (t) {
                  var e = this || t;
                  return (
                    St.test(e.type) &&
                      e.click &&
                      E(e, 'input') &&
                      Ht(e, 'click'),
                    !0
                  );
                },
                _default: function (t) {
                  var e = t.target;
                  return (
                    (St.test(e.type) &&
                      e.click &&
                      E(e, 'input') &&
                      at.get(e, 'click')) ||
                    E(e, 'a')
                  );
                },
              },
              beforeunload: {
                postDispatch: function (t) {
                  void 0 !== t.result &&
                    t.originalEvent &&
                    (t.originalEvent.returnValue = t.result);
                },
              },
            },
          }),
            (S.removeEvent = function (t, e, n) {
              t.removeEventListener && t.removeEventListener(e, n);
            }),
            (S.Event = function (t, e) {
              if (!(this instanceof S.Event)) return new S.Event(t, e);
              t && t.type
                ? ((this.originalEvent = t),
                  (this.type = t.type),
                  (this.isDefaultPrevented =
                    t.defaultPrevented ||
                    (void 0 === t.defaultPrevented && !1 === t.returnValue)
                      ? Mt
                      : It),
                  (this.target =
                    t.target && 3 === t.target.nodeType
                      ? t.target.parentNode
                      : t.target),
                  (this.currentTarget = t.currentTarget),
                  (this.relatedTarget = t.relatedTarget))
                : (this.type = t),
                e && S.extend(this, e),
                (this.timeStamp = (t && t.timeStamp) || Date.now()),
                (this[S.expando] = !0);
            }),
            (S.Event.prototype = {
              constructor: S.Event,
              isDefaultPrevented: It,
              isPropagationStopped: It,
              isImmediatePropagationStopped: It,
              isSimulated: !1,
              preventDefault: function () {
                var t = this.originalEvent;
                (this.isDefaultPrevented = Mt),
                  t && !this.isSimulated && t.preventDefault();
              },
              stopPropagation: function () {
                var t = this.originalEvent;
                (this.isPropagationStopped = Mt),
                  t && !this.isSimulated && t.stopPropagation();
              },
              stopImmediatePropagation: function () {
                var t = this.originalEvent;
                (this.isImmediatePropagationStopped = Mt),
                  t && !this.isSimulated && t.stopImmediatePropagation(),
                  this.stopPropagation();
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
                code: !0,
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
                which: !0,
              },
              S.event.addProp
            ),
            S.each({ focus: 'focusin', blur: 'focusout' }, function (t, e) {
              function n(t) {
                if (w.documentMode) {
                  var n = at.get(this, 'handle'),
                    i = S.event.fix(t);
                  (i.type = 'focusin' === t.type ? 'focus' : 'blur'),
                    (i.isSimulated = !0),
                    n(t),
                    i.target === i.currentTarget && n(i);
                } else S.event.simulate(e, t.target, S.event.fix(t));
              }
              (S.event.special[t] = {
                setup: function () {
                  var i;
                  if ((Ht(this, t, !0), !w.documentMode)) return !1;
                  (i = at.get(this, e)) || this.addEventListener(e, n),
                    at.set(this, e, (i || 0) + 1);
                },
                trigger: function () {
                  return Ht(this, t), !0;
                },
                teardown: function () {
                  var t;
                  if (!w.documentMode) return !1;
                  (t = at.get(this, e) - 1)
                    ? at.set(this, e, t)
                    : (this.removeEventListener(e, n), at.remove(this, e));
                },
                _default: function (e) {
                  return at.get(e.target, t);
                },
                delegateType: e,
              }),
                (S.event.special[e] = {
                  setup: function () {
                    var i = this.ownerDocument || this.document || this,
                      r = w.documentMode ? this : i,
                      o = at.get(r, e);
                    o ||
                      (w.documentMode
                        ? this.addEventListener(e, n)
                        : i.addEventListener(t, n, !0)),
                      at.set(r, e, (o || 0) + 1);
                  },
                  teardown: function () {
                    var i = this.ownerDocument || this.document || this,
                      r = w.documentMode ? this : i,
                      o = at.get(r, e) - 1;
                    o
                      ? at.set(r, e, o)
                      : (w.documentMode
                          ? this.removeEventListener(e, n)
                          : i.removeEventListener(t, n, !0),
                        at.remove(r, e));
                  },
                });
            }),
            S.each(
              {
                mouseenter: 'mouseover',
                mouseleave: 'mouseout',
                pointerenter: 'pointerover',
                pointerleave: 'pointerout',
              },
              function (t, e) {
                S.event.special[t] = {
                  delegateType: e,
                  bindType: e,
                  handle: function (t) {
                    var n,
                      i = t.relatedTarget,
                      r = t.handleObj;
                    return (
                      (i && (i === this || S.contains(this, i))) ||
                        ((t.type = r.origType),
                        (n = r.handler.apply(this, arguments)),
                        (t.type = e)),
                      n
                    );
                  },
                };
              }
            ),
            S.fn.extend({
              on: function (t, e, n, i) {
                return qt(this, t, e, n, i);
              },
              one: function (t, e, n, i) {
                return qt(this, t, e, n, i, 1);
              },
              off: function (t, e, n) {
                var i, r;
                if (t && t.preventDefault && t.handleObj)
                  return (
                    (i = t.handleObj),
                    S(t.delegateTarget).off(
                      i.namespace ? i.origType + '.' + i.namespace : i.origType,
                      i.selector,
                      i.handler
                    ),
                    this
                  );
                if ('object' == typeof t) {
                  for (r in t) this.off(r, e, t[r]);
                  return this;
                }
                return (
                  (!1 !== e && 'function' != typeof e) ||
                    ((n = e), (e = void 0)),
                  !1 === n && (n = It),
                  this.each(function () {
                    S.event.remove(this, t, n, e);
                  })
                );
              },
            });
          var jt = /<script|<style|<link/i,
            zt = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Nt = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
          function Ft(t, e) {
            return (
              (E(t, 'table') &&
                E(11 !== e.nodeType ? e : e.firstChild, 'tr') &&
                S(t).children('tbody')[0]) ||
              t
            );
          }
          function Rt(t) {
            return (
              (t.type = (null !== t.getAttribute('type')) + '/' + t.type), t
            );
          }
          function Bt(t) {
            return (
              'true/' === (t.type || '').slice(0, 5)
                ? (t.type = t.type.slice(5))
                : t.removeAttribute('type'),
              t
            );
          }
          function Wt(t, e) {
            var n, i, r, o, s, a;
            if (1 === e.nodeType) {
              if (at.hasData(t) && (a = at.get(t).events))
                for (r in (at.remove(e, 'handle events'), a))
                  for (n = 0, i = a[r].length; n < i; n++)
                    S.event.add(e, r, a[r][n]);
              lt.hasData(t) &&
                ((o = lt.access(t)), (s = S.extend({}, o)), lt.set(e, s));
            }
          }
          function Vt(t, e) {
            var n = e.nodeName.toLowerCase();
            'input' === n && St.test(t.type)
              ? (e.checked = t.checked)
              : ('input' !== n && 'textarea' !== n) ||
                (e.defaultValue = t.defaultValue);
          }
          function Ut(t, e, n, i) {
            e = l(e);
            var r,
              o,
              s,
              a,
              c,
              u,
              d = 0,
              p = t.length,
              f = p - 1,
              h = e[0],
              m = v(h);
            if (
              m ||
              (p > 1 && 'string' == typeof h && !g.checkClone && zt.test(h))
            )
              return t.each(function (r) {
                var o = t.eq(r);
                m && (e[0] = h.call(this, r, o.html())), Ut(o, e, n, i);
              });
            if (
              p &&
              ((o = (r = Dt(e, t[0].ownerDocument, !1, t, i)).firstChild),
              1 === r.childNodes.length && (r = o),
              o || i)
            ) {
              for (a = (s = S.map(At(r, 'script'), Rt)).length; d < p; d++)
                (c = r),
                  d !== f &&
                    ((c = S.clone(c, !0, !0)),
                    a && S.merge(s, At(c, 'script'))),
                  n.call(t[d], c, d);
              if (a)
                for (
                  u = s[s.length - 1].ownerDocument, S.map(s, Bt), d = 0;
                  d < a;
                  d++
                )
                  (c = s[d]),
                    Et.test(c.type || '') &&
                      !at.access(c, 'globalEval') &&
                      S.contains(u, c) &&
                      (c.src && 'module' !== (c.type || '').toLowerCase()
                        ? S._evalUrl &&
                          !c.noModule &&
                          S._evalUrl(
                            c.src,
                            { nonce: c.nonce || c.getAttribute('nonce') },
                            u
                          )
                        : x(c.textContent.replace(Nt, ''), c, u));
            }
            return t;
          }
          function Yt(t, e, n) {
            for (
              var i, r = e ? S.filter(e, t) : t, o = 0;
              null != (i = r[o]);
              o++
            )
              n || 1 !== i.nodeType || S.cleanData(At(i)),
                i.parentNode &&
                  (n && gt(i) && Lt(At(i, 'script')),
                  i.parentNode.removeChild(i));
            return t;
          }
          S.extend({
            htmlPrefilter: function (t) {
              return t;
            },
            clone: function (t, e, n) {
              var i,
                r,
                o,
                s,
                a = t.cloneNode(!0),
                l = gt(t);
              if (
                !(
                  g.noCloneChecked ||
                  (1 !== t.nodeType && 11 !== t.nodeType) ||
                  S.isXMLDoc(t)
                )
              )
                for (s = At(a), i = 0, r = (o = At(t)).length; i < r; i++)
                  Vt(o[i], s[i]);
              if (e)
                if (n)
                  for (
                    o = o || At(t), s = s || At(a), i = 0, r = o.length;
                    i < r;
                    i++
                  )
                    Wt(o[i], s[i]);
                else Wt(t, a);
              return (
                (s = At(a, 'script')).length > 0 &&
                  Lt(s, !l && At(t, 'script')),
                a
              );
            },
            cleanData: function (t) {
              for (
                var e, n, i, r = S.event.special, o = 0;
                void 0 !== (n = t[o]);
                o++
              )
                if (ot(n)) {
                  if ((e = n[at.expando])) {
                    if (e.events)
                      for (i in e.events)
                        r[i]
                          ? S.event.remove(n, i)
                          : S.removeEvent(n, i, e.handle);
                    n[at.expando] = void 0;
                  }
                  n[lt.expando] && (n[lt.expando] = void 0);
                }
            },
          }),
            S.fn.extend({
              detach: function (t) {
                return Yt(this, t, !0);
              },
              remove: function (t) {
                return Yt(this, t);
              },
              text: function (t) {
                return tt(
                  this,
                  function (t) {
                    return void 0 === t
                      ? S.text(this)
                      : this.empty().each(function () {
                          (1 !== this.nodeType &&
                            11 !== this.nodeType &&
                            9 !== this.nodeType) ||
                            (this.textContent = t);
                        });
                  },
                  null,
                  t,
                  arguments.length
                );
              },
              append: function () {
                return Ut(this, arguments, function (t) {
                  (1 !== this.nodeType &&
                    11 !== this.nodeType &&
                    9 !== this.nodeType) ||
                    Ft(this, t).appendChild(t);
                });
              },
              prepend: function () {
                return Ut(this, arguments, function (t) {
                  if (
                    1 === this.nodeType ||
                    11 === this.nodeType ||
                    9 === this.nodeType
                  ) {
                    var e = Ft(this, t);
                    e.insertBefore(t, e.firstChild);
                  }
                });
              },
              before: function () {
                return Ut(this, arguments, function (t) {
                  this.parentNode && this.parentNode.insertBefore(t, this);
                });
              },
              after: function () {
                return Ut(this, arguments, function (t) {
                  this.parentNode &&
                    this.parentNode.insertBefore(t, this.nextSibling);
                });
              },
              empty: function () {
                for (var t, e = 0; null != (t = this[e]); e++)
                  1 === t.nodeType &&
                    (S.cleanData(At(t, !1)), (t.textContent = ''));
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
                return tt(
                  this,
                  function (t) {
                    var e = this[0] || {},
                      n = 0,
                      i = this.length;
                    if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                    if (
                      'string' == typeof t &&
                      !jt.test(t) &&
                      !$t[(Ct.exec(t) || ['', ''])[1].toLowerCase()]
                    ) {
                      t = S.htmlPrefilter(t);
                      try {
                        for (; n < i; n++)
                          1 === (e = this[n] || {}).nodeType &&
                            (S.cleanData(At(e, !1)), (e.innerHTML = t));
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
                var t = [];
                return Ut(
                  this,
                  arguments,
                  function (e) {
                    var n = this.parentNode;
                    S.inArray(this, t) < 0 &&
                      (S.cleanData(At(this)), n && n.replaceChild(e, this));
                  },
                  t
                );
              },
            }),
            S.each(
              {
                appendTo: 'append',
                prependTo: 'prepend',
                insertBefore: 'before',
                insertAfter: 'after',
                replaceAll: 'replaceWith',
              },
              function (t, e) {
                S.fn[t] = function (t) {
                  for (
                    var n, i = [], r = S(t), o = r.length - 1, s = 0;
                    s <= o;
                    s++
                  )
                    (n = s === o ? this : this.clone(!0)),
                      S(r[s])[e](n),
                      c.apply(i, n.get());
                  return this.pushStack(i);
                };
              }
            );
          var Xt = new RegExp('^(' + pt + ')(?!px)[a-z%]+$', 'i'),
            Gt = /^--/,
            Qt = function (t) {
              var e = t.ownerDocument.defaultView;
              return (e && e.opener) || (e = i), e.getComputedStyle(t);
            },
            Zt = function (t, e, n) {
              var i,
                r,
                o = {};
              for (r in e) (o[r] = t.style[r]), (t.style[r] = e[r]);
              for (r in ((i = n.call(t)), e)) t.style[r] = o[r];
              return i;
            },
            Kt = new RegExp(ht.join('|'), 'i');
          function Jt(t, e, n) {
            var i,
              r,
              o,
              s,
              a = Gt.test(e),
              l = t.style;
            return (
              (n = n || Qt(t)) &&
                ((s = n.getPropertyValue(e) || n[e]),
                a && s && (s = s.replace(D, '$1') || void 0),
                '' !== s || gt(t) || (s = S.style(t, e)),
                !g.pixelBoxStyles() &&
                  Xt.test(s) &&
                  Kt.test(e) &&
                  ((i = l.width),
                  (r = l.minWidth),
                  (o = l.maxWidth),
                  (l.minWidth = l.maxWidth = l.width = s),
                  (s = n.width),
                  (l.width = i),
                  (l.minWidth = r),
                  (l.maxWidth = o))),
              void 0 !== s ? s + '' : s
            );
          }
          function te(t, e) {
            return {
              get: function () {
                if (!t()) return (this.get = e).apply(this, arguments);
                delete this.get;
              },
            };
          }
          !(function () {
            function t() {
              if (u) {
                (c.style.cssText =
                  'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0'),
                  (u.style.cssText =
                    'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%'),
                  mt.appendChild(c).appendChild(u);
                var t = i.getComputedStyle(u);
                (n = '1%' !== t.top),
                  (l = 12 === e(t.marginLeft)),
                  (u.style.right = '60%'),
                  (s = 36 === e(t.right)),
                  (r = 36 === e(t.width)),
                  (u.style.position = 'absolute'),
                  (o = 12 === e(u.offsetWidth / 3)),
                  mt.removeChild(c),
                  (u = null);
              }
            }
            function e(t) {
              return Math.round(parseFloat(t));
            }
            var n,
              r,
              o,
              s,
              a,
              l,
              c = w.createElement('div'),
              u = w.createElement('div');
            u.style &&
              ((u.style.backgroundClip = 'content-box'),
              (u.cloneNode(!0).style.backgroundClip = ''),
              (g.clearCloneStyle = 'content-box' === u.style.backgroundClip),
              S.extend(g, {
                boxSizingReliable: function () {
                  return t(), r;
                },
                pixelBoxStyles: function () {
                  return t(), s;
                },
                pixelPosition: function () {
                  return t(), n;
                },
                reliableMarginLeft: function () {
                  return t(), l;
                },
                scrollboxSize: function () {
                  return t(), o;
                },
                reliableTrDimensions: function () {
                  var t, e, n, r;
                  return (
                    null == a &&
                      ((t = w.createElement('table')),
                      (e = w.createElement('tr')),
                      (n = w.createElement('div')),
                      (t.style.cssText =
                        'position:absolute;left:-11111px;border-collapse:separate'),
                      (e.style.cssText =
                        'box-sizing:content-box;border:1px solid'),
                      (e.style.height = '1px'),
                      (n.style.height = '9px'),
                      (n.style.display = 'block'),
                      mt.appendChild(t).appendChild(e).appendChild(n),
                      (r = i.getComputedStyle(e)),
                      (a =
                        parseInt(r.height, 10) +
                          parseInt(r.borderTopWidth, 10) +
                          parseInt(r.borderBottomWidth, 10) ===
                        e.offsetHeight),
                      mt.removeChild(t)),
                    a
                  );
                },
              }));
          })();
          var ee = ['Webkit', 'Moz', 'ms'],
            ne = w.createElement('div').style,
            ie = {};
          function re(t) {
            var e = S.cssProps[t] || ie[t];
            return (
              e ||
              (t in ne
                ? t
                : (ie[t] =
                    (function (t) {
                      for (
                        var e = t[0].toUpperCase() + t.slice(1), n = ee.length;
                        n--;

                      )
                        if ((t = ee[n] + e) in ne) return t;
                    })(t) || t))
            );
          }
          var oe = /^(none|table(?!-c[ea]).+)/,
            se = {
              position: 'absolute',
              visibility: 'hidden',
              display: 'block',
            },
            ae = { letterSpacing: '0', fontWeight: '400' };
          function le(t, e, n) {
            var i = ft.exec(e);
            return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || 'px') : e;
          }
          function ce(t, e, n, i, r, o) {
            var s = 'width' === e ? 1 : 0,
              a = 0,
              l = 0,
              c = 0;
            if (n === (i ? 'border' : 'content')) return 0;
            for (; s < 4; s += 2)
              'margin' === n && (c += S.css(t, n + ht[s], !0, r)),
                i
                  ? ('content' === n &&
                      (l -= S.css(t, 'padding' + ht[s], !0, r)),
                    'margin' !== n &&
                      (l -= S.css(t, 'border' + ht[s] + 'Width', !0, r)))
                  : ((l += S.css(t, 'padding' + ht[s], !0, r)),
                    'padding' !== n
                      ? (l += S.css(t, 'border' + ht[s] + 'Width', !0, r))
                      : (a += S.css(t, 'border' + ht[s] + 'Width', !0, r)));
            return (
              !i &&
                o >= 0 &&
                (l +=
                  Math.max(
                    0,
                    Math.ceil(
                      t['offset' + e[0].toUpperCase() + e.slice(1)] -
                        o -
                        l -
                        a -
                        0.5
                    )
                  ) || 0),
              l + c
            );
          }
          function ue(t, e, n) {
            var i = Qt(t),
              r =
                (!g.boxSizingReliable() || n) &&
                'border-box' === S.css(t, 'boxSizing', !1, i),
              o = r,
              s = Jt(t, e, i),
              a = 'offset' + e[0].toUpperCase() + e.slice(1);
            if (Xt.test(s)) {
              if (!n) return s;
              s = 'auto';
            }
            return (
              ((!g.boxSizingReliable() && r) ||
                (!g.reliableTrDimensions() && E(t, 'tr')) ||
                'auto' === s ||
                (!parseFloat(s) && 'inline' === S.css(t, 'display', !1, i))) &&
                t.getClientRects().length &&
                ((r = 'border-box' === S.css(t, 'boxSizing', !1, i)),
                (o = a in t) && (s = t[a])),
              (s = parseFloat(s) || 0) +
                ce(t, e, n || (r ? 'border' : 'content'), o, i, s) +
                'px'
            );
          }
          function de(t, e, n, i, r) {
            return new de.prototype.init(t, e, n, i, r);
          }
          S.extend({
            cssHooks: {
              opacity: {
                get: function (t, e) {
                  if (e) {
                    var n = Jt(t, 'opacity');
                    return '' === n ? '1' : n;
                  }
                },
              },
            },
            cssNumber: {
              animationIterationCount: !0,
              aspectRatio: !0,
              borderImageSlice: !0,
              columnCount: !0,
              flexGrow: !0,
              flexShrink: !0,
              fontWeight: !0,
              gridArea: !0,
              gridColumn: !0,
              gridColumnEnd: !0,
              gridColumnStart: !0,
              gridRow: !0,
              gridRowEnd: !0,
              gridRowStart: !0,
              lineHeight: !0,
              opacity: !0,
              order: !0,
              orphans: !0,
              scale: !0,
              widows: !0,
              zIndex: !0,
              zoom: !0,
              fillOpacity: !0,
              floodOpacity: !0,
              stopOpacity: !0,
              strokeMiterlimit: !0,
              strokeOpacity: !0,
            },
            cssProps: {},
            style: function (t, e, n, i) {
              if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var r,
                  o,
                  s,
                  a = rt(e),
                  l = Gt.test(e),
                  c = t.style;
                if (
                  (l || (e = re(a)),
                  (s = S.cssHooks[e] || S.cssHooks[a]),
                  void 0 === n)
                )
                  return s && 'get' in s && void 0 !== (r = s.get(t, !1, i))
                    ? r
                    : c[e];
                'string' === (o = typeof n) &&
                  (r = ft.exec(n)) &&
                  r[1] &&
                  ((n = wt(t, e, r)), (o = 'number')),
                  null != n &&
                    n == n &&
                    ('number' !== o ||
                      l ||
                      (n += (r && r[3]) || (S.cssNumber[a] ? '' : 'px')),
                    g.clearCloneStyle ||
                      '' !== n ||
                      0 !== e.indexOf('background') ||
                      (c[e] = 'inherit'),
                    (s && 'set' in s && void 0 === (n = s.set(t, n, i))) ||
                      (l ? c.setProperty(e, n) : (c[e] = n)));
              }
            },
            css: function (t, e, n, i) {
              var r,
                o,
                s,
                a = rt(e);
              return (
                Gt.test(e) || (e = re(a)),
                (s = S.cssHooks[e] || S.cssHooks[a]) &&
                  'get' in s &&
                  (r = s.get(t, !0, n)),
                void 0 === r && (r = Jt(t, e, i)),
                'normal' === r && e in ae && (r = ae[e]),
                '' === n || n
                  ? ((o = parseFloat(r)), !0 === n || isFinite(o) ? o || 0 : r)
                  : r
              );
            },
          }),
            S.each(['height', 'width'], function (t, e) {
              S.cssHooks[e] = {
                get: function (t, n, i) {
                  if (n)
                    return !oe.test(S.css(t, 'display')) ||
                      (t.getClientRects().length &&
                        t.getBoundingClientRect().width)
                      ? ue(t, e, i)
                      : Zt(t, se, function () {
                          return ue(t, e, i);
                        });
                },
                set: function (t, n, i) {
                  var r,
                    o = Qt(t),
                    s = !g.scrollboxSize() && 'absolute' === o.position,
                    a =
                      (s || i) && 'border-box' === S.css(t, 'boxSizing', !1, o),
                    l = i ? ce(t, e, i, a, o) : 0;
                  return (
                    a &&
                      s &&
                      (l -= Math.ceil(
                        t['offset' + e[0].toUpperCase() + e.slice(1)] -
                          parseFloat(o[e]) -
                          ce(t, e, 'border', !1, o) -
                          0.5
                      )),
                    l &&
                      (r = ft.exec(n)) &&
                      'px' !== (r[3] || 'px') &&
                      ((t.style[e] = n), (n = S.css(t, e))),
                    le(0, n, l)
                  );
                },
              };
            }),
            (S.cssHooks.marginLeft = te(g.reliableMarginLeft, function (t, e) {
              if (e)
                return (
                  (parseFloat(Jt(t, 'marginLeft')) ||
                    t.getBoundingClientRect().left -
                      Zt(t, { marginLeft: 0 }, function () {
                        return t.getBoundingClientRect().left;
                      })) + 'px'
                );
            })),
            S.each(
              { margin: '', padding: '', border: 'Width' },
              function (t, e) {
                (S.cssHooks[t + e] = {
                  expand: function (n) {
                    for (
                      var i = 0,
                        r = {},
                        o = 'string' == typeof n ? n.split(' ') : [n];
                      i < 4;
                      i++
                    )
                      r[t + ht[i] + e] = o[i] || o[i - 2] || o[0];
                    return r;
                  },
                }),
                  'margin' !== t && (S.cssHooks[t + e].set = le);
              }
            ),
            S.fn.extend({
              css: function (t, e) {
                return tt(
                  this,
                  function (t, e, n) {
                    var i,
                      r,
                      o = {},
                      s = 0;
                    if (Array.isArray(e)) {
                      for (i = Qt(t), r = e.length; s < r; s++)
                        o[e[s]] = S.css(t, e[s], !1, i);
                      return o;
                    }
                    return void 0 !== n ? S.style(t, e, n) : S.css(t, e);
                  },
                  t,
                  e,
                  arguments.length > 1
                );
              },
            }),
            (S.Tween = de),
            (de.prototype = {
              constructor: de,
              init: function (t, e, n, i, r, o) {
                (this.elem = t),
                  (this.prop = n),
                  (this.easing = r || S.easing._default),
                  (this.options = e),
                  (this.start = this.now = this.cur()),
                  (this.end = i),
                  (this.unit = o || (S.cssNumber[n] ? '' : 'px'));
              },
              cur: function () {
                var t = de.propHooks[this.prop];
                return t && t.get
                  ? t.get(this)
                  : de.propHooks._default.get(this);
              },
              run: function (t) {
                var e,
                  n = de.propHooks[this.prop];
                return (
                  this.options.duration
                    ? (this.pos = e =
                        S.easing[this.easing](
                          t,
                          this.options.duration * t,
                          0,
                          1,
                          this.options.duration
                        ))
                    : (this.pos = e = t),
                  (this.now = (this.end - this.start) * e + this.start),
                  this.options.step &&
                    this.options.step.call(this.elem, this.now, this),
                  n && n.set ? n.set(this) : de.propHooks._default.set(this),
                  this
                );
              },
            }),
            (de.prototype.init.prototype = de.prototype),
            (de.propHooks = {
              _default: {
                get: function (t) {
                  var e;
                  return 1 !== t.elem.nodeType ||
                    (null != t.elem[t.prop] && null == t.elem.style[t.prop])
                    ? t.elem[t.prop]
                    : (e = S.css(t.elem, t.prop, '')) && 'auto' !== e
                    ? e
                    : 0;
                },
                set: function (t) {
                  S.fx.step[t.prop]
                    ? S.fx.step[t.prop](t)
                    : 1 !== t.elem.nodeType ||
                      (!S.cssHooks[t.prop] && null == t.elem.style[re(t.prop)])
                    ? (t.elem[t.prop] = t.now)
                    : S.style(t.elem, t.prop, t.now + t.unit);
                },
              },
            }),
            (de.propHooks.scrollTop = de.propHooks.scrollLeft =
              {
                set: function (t) {
                  t.elem.nodeType &&
                    t.elem.parentNode &&
                    (t.elem[t.prop] = t.now);
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
            (S.fx = de.prototype.init),
            (S.fx.step = {});
          var pe,
            fe,
            he = /^(?:toggle|show|hide)$/,
            me = /queueHooks$/;
          function ge() {
            fe &&
              (!1 === w.hidden && i.requestAnimationFrame
                ? i.requestAnimationFrame(ge)
                : i.setTimeout(ge, S.fx.interval),
              S.fx.tick());
          }
          function ve() {
            return (
              i.setTimeout(function () {
                pe = void 0;
              }),
              (pe = Date.now())
            );
          }
          function ye(t, e) {
            var n,
              i = 0,
              r = { height: t };
            for (e = e ? 1 : 0; i < 4; i += 2 - e)
              r['margin' + (n = ht[i])] = r['padding' + n] = t;
            return e && (r.opacity = r.width = t), r;
          }
          function we(t, e, n) {
            for (
              var i,
                r = (be.tweeners[e] || []).concat(be.tweeners['*']),
                o = 0,
                s = r.length;
              o < s;
              o++
            )
              if ((i = r[o].call(n, e, t))) return i;
          }
          function be(t, e, n) {
            var i,
              r,
              o = 0,
              s = be.prefilters.length,
              a = S.Deferred().always(function () {
                delete l.elem;
              }),
              l = function () {
                if (r) return !1;
                for (
                  var e = pe || ve(),
                    n = Math.max(0, c.startTime + c.duration - e),
                    i = 1 - (n / c.duration || 0),
                    o = 0,
                    s = c.tweens.length;
                  o < s;
                  o++
                )
                  c.tweens[o].run(i);
                return (
                  a.notifyWith(t, [c, i, n]),
                  i < 1 && s
                    ? n
                    : (s || a.notifyWith(t, [c, 1, 0]),
                      a.resolveWith(t, [c]),
                      !1)
                );
              },
              c = a.promise({
                elem: t,
                props: S.extend({}, e),
                opts: S.extend(
                  !0,
                  { specialEasing: {}, easing: S.easing._default },
                  n
                ),
                originalProperties: e,
                originalOptions: n,
                startTime: pe || ve(),
                duration: n.duration,
                tweens: [],
                createTween: function (e, n) {
                  var i = S.Tween(
                    t,
                    c.opts,
                    e,
                    n,
                    c.opts.specialEasing[e] || c.opts.easing
                  );
                  return c.tweens.push(i), i;
                },
                stop: function (e) {
                  var n = 0,
                    i = e ? c.tweens.length : 0;
                  if (r) return this;
                  for (r = !0; n < i; n++) c.tweens[n].run(1);
                  return (
                    e
                      ? (a.notifyWith(t, [c, 1, 0]), a.resolveWith(t, [c, e]))
                      : a.rejectWith(t, [c, e]),
                    this
                  );
                },
              }),
              u = c.props;
            for (
              !(function (t, e) {
                var n, i, r, o, s;
                for (n in t)
                  if (
                    ((r = e[(i = rt(n))]),
                    (o = t[n]),
                    Array.isArray(o) && ((r = o[1]), (o = t[n] = o[0])),
                    n !== i && ((t[i] = o), delete t[n]),
                    (s = S.cssHooks[i]) && ('expand' in s))
                  )
                    for (n in ((o = s.expand(o)), delete t[i], o))
                      (n in t) || ((t[n] = o[n]), (e[n] = r));
                  else e[i] = r;
              })(u, c.opts.specialEasing);
              o < s;
              o++
            )
              if ((i = be.prefilters[o].call(c, t, u, c.opts)))
                return (
                  v(i.stop) &&
                    (S._queueHooks(c.elem, c.opts.queue).stop = i.stop.bind(i)),
                  i
                );
            return (
              S.map(u, we, c),
              v(c.opts.start) && c.opts.start.call(t, c),
              c
                .progress(c.opts.progress)
                .done(c.opts.done, c.opts.complete)
                .fail(c.opts.fail)
                .always(c.opts.always),
              S.fx.timer(
                S.extend(l, { elem: t, anim: c, queue: c.opts.queue })
              ),
              c
            );
          }
          (S.Animation = S.extend(be, {
            tweeners: {
              '*': [
                function (t, e) {
                  var n = this.createTween(t, e);
                  return wt(n.elem, t, ft.exec(e), n), n;
                },
              ],
            },
            tweener: function (t, e) {
              v(t) ? ((e = t), (t = ['*'])) : (t = t.match(Y));
              for (var n, i = 0, r = t.length; i < r; i++)
                (n = t[i]),
                  (be.tweeners[n] = be.tweeners[n] || []),
                  be.tweeners[n].unshift(e);
            },
            prefilters: [
              function (t, e, n) {
                var i,
                  r,
                  o,
                  s,
                  a,
                  l,
                  c,
                  u,
                  d = 'width' in e || 'height' in e,
                  p = this,
                  f = {},
                  h = t.style,
                  m = t.nodeType && yt(t),
                  g = at.get(t, 'fxshow');
                for (i in (n.queue ||
                  (null == (s = S._queueHooks(t, 'fx')).unqueued &&
                    ((s.unqueued = 0),
                    (a = s.empty.fire),
                    (s.empty.fire = function () {
                      s.unqueued || a();
                    })),
                  s.unqueued++,
                  p.always(function () {
                    p.always(function () {
                      s.unqueued--, S.queue(t, 'fx').length || s.empty.fire();
                    });
                  })),
                e))
                  if (((r = e[i]), he.test(r))) {
                    if (
                      (delete e[i],
                      (o = o || 'toggle' === r),
                      r === (m ? 'hide' : 'show'))
                    ) {
                      if ('show' !== r || !g || void 0 === g[i]) continue;
                      m = !0;
                    }
                    f[i] = (g && g[i]) || S.style(t, i);
                  }
                if ((l = !S.isEmptyObject(e)) || !S.isEmptyObject(f))
                  for (i in (d &&
                    1 === t.nodeType &&
                    ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
                    null == (c = g && g.display) && (c = at.get(t, 'display')),
                    'none' === (u = S.css(t, 'display')) &&
                      (c
                        ? (u = c)
                        : (kt([t], !0),
                          (c = t.style.display || c),
                          (u = S.css(t, 'display')),
                          kt([t]))),
                    ('inline' === u || ('inline-block' === u && null != c)) &&
                      'none' === S.css(t, 'float') &&
                      (l ||
                        (p.done(function () {
                          h.display = c;
                        }),
                        null == c &&
                          ((u = h.display), (c = 'none' === u ? '' : u))),
                      (h.display = 'inline-block'))),
                  n.overflow &&
                    ((h.overflow = 'hidden'),
                    p.always(function () {
                      (h.overflow = n.overflow[0]),
                        (h.overflowX = n.overflow[1]),
                        (h.overflowY = n.overflow[2]);
                    })),
                  (l = !1),
                  f))
                    l ||
                      (g
                        ? 'hidden' in g && (m = g.hidden)
                        : (g = at.access(t, 'fxshow', { display: c })),
                      o && (g.hidden = !m),
                      m && kt([t], !0),
                      p.done(function () {
                        for (i in (m || kt([t]), at.remove(t, 'fxshow'), f))
                          S.style(t, i, f[i]);
                      })),
                      (l = we(m ? g[i] : 0, i, p)),
                      i in g ||
                        ((g[i] = l.start),
                        m && ((l.end = l.start), (l.start = 0)));
              },
            ],
            prefilter: function (t, e) {
              e ? be.prefilters.unshift(t) : be.prefilters.push(t);
            },
          })),
            (S.speed = function (t, e, n) {
              var i =
                t && 'object' == typeof t
                  ? S.extend({}, t)
                  : {
                      complete: n || (!n && e) || (v(t) && t),
                      duration: t,
                      easing: (n && e) || (e && !v(e) && e),
                    };
              return (
                S.fx.off
                  ? (i.duration = 0)
                  : 'number' != typeof i.duration &&
                    (i.duration in S.fx.speeds
                      ? (i.duration = S.fx.speeds[i.duration])
                      : (i.duration = S.fx.speeds._default)),
                (null != i.queue && !0 !== i.queue) || (i.queue = 'fx'),
                (i.old = i.complete),
                (i.complete = function () {
                  v(i.old) && i.old.call(this),
                    i.queue && S.dequeue(this, i.queue);
                }),
                i
              );
            }),
            S.fn.extend({
              fadeTo: function (t, e, n, i) {
                return this.filter(yt)
                  .css('opacity', 0)
                  .show()
                  .end()
                  .animate({ opacity: e }, t, n, i);
              },
              animate: function (t, e, n, i) {
                var r = S.isEmptyObject(t),
                  o = S.speed(e, n, i),
                  s = function () {
                    var e = be(this, S.extend({}, t), o);
                    (r || at.get(this, 'finish')) && e.stop(!0);
                  };
                return (
                  (s.finish = s),
                  r || !1 === o.queue ? this.each(s) : this.queue(o.queue, s)
                );
              },
              stop: function (t, e, n) {
                var i = function (t) {
                  var e = t.stop;
                  delete t.stop, e(n);
                };
                return (
                  'string' != typeof t && ((n = e), (e = t), (t = void 0)),
                  e && this.queue(t || 'fx', []),
                  this.each(function () {
                    var e = !0,
                      r = null != t && t + 'queueHooks',
                      o = S.timers,
                      s = at.get(this);
                    if (r) s[r] && s[r].stop && i(s[r]);
                    else
                      for (r in s) s[r] && s[r].stop && me.test(r) && i(s[r]);
                    for (r = o.length; r--; )
                      o[r].elem !== this ||
                        (null != t && o[r].queue !== t) ||
                        (o[r].anim.stop(n), (e = !1), o.splice(r, 1));
                    (!e && n) || S.dequeue(this, t);
                  })
                );
              },
              finish: function (t) {
                return (
                  !1 !== t && (t = t || 'fx'),
                  this.each(function () {
                    var e,
                      n = at.get(this),
                      i = n[t + 'queue'],
                      r = n[t + 'queueHooks'],
                      o = S.timers,
                      s = i ? i.length : 0;
                    for (
                      n.finish = !0,
                        S.queue(this, t, []),
                        r && r.stop && r.stop.call(this, !0),
                        e = o.length;
                      e--;

                    )
                      o[e].elem === this &&
                        o[e].queue === t &&
                        (o[e].anim.stop(!0), o.splice(e, 1));
                    for (e = 0; e < s; e++)
                      i[e] && i[e].finish && i[e].finish.call(this);
                    delete n.finish;
                  })
                );
              },
            }),
            S.each(['toggle', 'show', 'hide'], function (t, e) {
              var n = S.fn[e];
              S.fn[e] = function (t, i, r) {
                return null == t || 'boolean' == typeof t
                  ? n.apply(this, arguments)
                  : this.animate(ye(e, !0), t, i, r);
              };
            }),
            S.each(
              {
                slideDown: ye('show'),
                slideUp: ye('hide'),
                slideToggle: ye('toggle'),
                fadeIn: { opacity: 'show' },
                fadeOut: { opacity: 'hide' },
                fadeToggle: { opacity: 'toggle' },
              },
              function (t, e) {
                S.fn[t] = function (t, n, i) {
                  return this.animate(e, t, n, i);
                };
              }
            ),
            (S.timers = []),
            (S.fx.tick = function () {
              var t,
                e = 0,
                n = S.timers;
              for (pe = Date.now(); e < n.length; e++)
                (t = n[e])() || n[e] !== t || n.splice(e--, 1);
              n.length || S.fx.stop(), (pe = void 0);
            }),
            (S.fx.timer = function (t) {
              S.timers.push(t), S.fx.start();
            }),
            (S.fx.interval = 13),
            (S.fx.start = function () {
              fe || ((fe = !0), ge());
            }),
            (S.fx.stop = function () {
              fe = null;
            }),
            (S.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
            (S.fn.delay = function (t, e) {
              return (
                (t = (S.fx && S.fx.speeds[t]) || t),
                (e = e || 'fx'),
                this.queue(e, function (e, n) {
                  var r = i.setTimeout(e, t);
                  n.stop = function () {
                    i.clearTimeout(r);
                  };
                })
              );
            }),
            (function () {
              var t = w.createElement('input'),
                e = w
                  .createElement('select')
                  .appendChild(w.createElement('option'));
              (t.type = 'checkbox'),
                (g.checkOn = '' !== t.value),
                (g.optSelected = e.selected),
                ((t = w.createElement('input')).value = 't'),
                (t.type = 'radio'),
                (g.radioValue = 't' === t.value);
            })();
          var xe,
            ke = S.expr.attrHandle;
          S.fn.extend({
            attr: function (t, e) {
              return tt(this, S.attr, t, e, arguments.length > 1);
            },
            removeAttr: function (t) {
              return this.each(function () {
                S.removeAttr(this, t);
              });
            },
          }),
            S.extend({
              attr: function (t, e, n) {
                var i,
                  r,
                  o = t.nodeType;
                if (3 !== o && 8 !== o && 2 !== o)
                  return void 0 === t.getAttribute
                    ? S.prop(t, e, n)
                    : ((1 === o && S.isXMLDoc(t)) ||
                        (r =
                          S.attrHooks[e.toLowerCase()] ||
                          (S.expr.match.bool.test(e) ? xe : void 0)),
                      void 0 !== n
                        ? null === n
                          ? void S.removeAttr(t, e)
                          : r && 'set' in r && void 0 !== (i = r.set(t, n, e))
                          ? i
                          : (t.setAttribute(e, n + ''), n)
                        : r && 'get' in r && null !== (i = r.get(t, e))
                        ? i
                        : null == (i = S.find.attr(t, e))
                        ? void 0
                        : i);
              },
              attrHooks: {
                type: {
                  set: function (t, e) {
                    if (!g.radioValue && 'radio' === e && E(t, 'input')) {
                      var n = t.value;
                      return t.setAttribute('type', e), n && (t.value = n), e;
                    }
                  },
                },
              },
              removeAttr: function (t, e) {
                var n,
                  i = 0,
                  r = e && e.match(Y);
                if (r && 1 === t.nodeType)
                  for (; (n = r[i++]); ) t.removeAttribute(n);
              },
            }),
            (xe = {
              set: function (t, e, n) {
                return !1 === e ? S.removeAttr(t, n) : t.setAttribute(n, n), n;
              },
            }),
            S.each(S.expr.match.bool.source.match(/\w+/g), function (t, e) {
              var n = ke[e] || S.find.attr;
              ke[e] = function (t, e, i) {
                var r,
                  o,
                  s = e.toLowerCase();
                return (
                  i ||
                    ((o = ke[s]),
                    (ke[s] = r),
                    (r = null != n(t, e, i) ? s : null),
                    (ke[s] = o)),
                  r
                );
              };
            });
          var _e = /^(?:input|select|textarea|button)$/i,
            Te = /^(?:a|area)$/i;
          function Se(t) {
            return (t.match(Y) || []).join(' ');
          }
          function Ce(t) {
            return (t.getAttribute && t.getAttribute('class')) || '';
          }
          function Ee(t) {
            return Array.isArray(t)
              ? t
              : ('string' == typeof t && t.match(Y)) || [];
          }
          S.fn.extend({
            prop: function (t, e) {
              return tt(this, S.prop, t, e, arguments.length > 1);
            },
            removeProp: function (t) {
              return this.each(function () {
                delete this[S.propFix[t] || t];
              });
            },
          }),
            S.extend({
              prop: function (t, e, n) {
                var i,
                  r,
                  o = t.nodeType;
                if (3 !== o && 8 !== o && 2 !== o)
                  return (
                    (1 === o && S.isXMLDoc(t)) ||
                      ((e = S.propFix[e] || e), (r = S.propHooks[e])),
                    void 0 !== n
                      ? r && 'set' in r && void 0 !== (i = r.set(t, n, e))
                        ? i
                        : (t[e] = n)
                      : r && 'get' in r && null !== (i = r.get(t, e))
                      ? i
                      : t[e]
                  );
              },
              propHooks: {
                tabIndex: {
                  get: function (t) {
                    var e = S.find.attr(t, 'tabindex');
                    return e
                      ? parseInt(e, 10)
                      : _e.test(t.nodeName) || (Te.test(t.nodeName) && t.href)
                      ? 0
                      : -1;
                  },
                },
              },
              propFix: { for: 'htmlFor', class: 'className' },
            }),
            g.optSelected ||
              (S.propHooks.selected = {
                get: function (t) {
                  var e = t.parentNode;
                  return e && e.parentNode && e.parentNode.selectedIndex, null;
                },
                set: function (t) {
                  var e = t.parentNode;
                  e &&
                    (e.selectedIndex,
                    e.parentNode && e.parentNode.selectedIndex);
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
              addClass: function (t) {
                var e, n, i, r, o, s;
                return v(t)
                  ? this.each(function (e) {
                      S(this).addClass(t.call(this, e, Ce(this)));
                    })
                  : (e = Ee(t)).length
                  ? this.each(function () {
                      if (
                        ((i = Ce(this)),
                        (n = 1 === this.nodeType && ' ' + Se(i) + ' '))
                      ) {
                        for (o = 0; o < e.length; o++)
                          (r = e[o]),
                            n.indexOf(' ' + r + ' ') < 0 && (n += r + ' ');
                        (s = Se(n)), i !== s && this.setAttribute('class', s);
                      }
                    })
                  : this;
              },
              removeClass: function (t) {
                var e, n, i, r, o, s;
                return v(t)
                  ? this.each(function (e) {
                      S(this).removeClass(t.call(this, e, Ce(this)));
                    })
                  : arguments.length
                  ? (e = Ee(t)).length
                    ? this.each(function () {
                        if (
                          ((i = Ce(this)),
                          (n = 1 === this.nodeType && ' ' + Se(i) + ' '))
                        ) {
                          for (o = 0; o < e.length; o++)
                            for (r = e[o]; n.indexOf(' ' + r + ' ') > -1; )
                              n = n.replace(' ' + r + ' ', ' ');
                          (s = Se(n)), i !== s && this.setAttribute('class', s);
                        }
                      })
                    : this
                  : this.attr('class', '');
              },
              toggleClass: function (t, e) {
                var n,
                  i,
                  r,
                  o,
                  s = typeof t,
                  a = 'string' === s || Array.isArray(t);
                return v(t)
                  ? this.each(function (n) {
                      S(this).toggleClass(t.call(this, n, Ce(this), e), e);
                    })
                  : 'boolean' == typeof e && a
                  ? e
                    ? this.addClass(t)
                    : this.removeClass(t)
                  : ((n = Ee(t)),
                    this.each(function () {
                      if (a)
                        for (o = S(this), r = 0; r < n.length; r++)
                          (i = n[r]),
                            o.hasClass(i) ? o.removeClass(i) : o.addClass(i);
                      else
                        (void 0 !== t && 'boolean' !== s) ||
                          ((i = Ce(this)) && at.set(this, '__className__', i),
                          this.setAttribute &&
                            this.setAttribute(
                              'class',
                              i || !1 === t
                                ? ''
                                : at.get(this, '__className__') || ''
                            ));
                    }));
              },
              hasClass: function (t) {
                var e,
                  n,
                  i = 0;
                for (e = ' ' + t + ' '; (n = this[i++]); )
                  if (
                    1 === n.nodeType &&
                    (' ' + Se(Ce(n)) + ' ').indexOf(e) > -1
                  )
                    return !0;
                return !1;
              },
            });
          var $e = /\r/g;
          S.fn.extend({
            val: function (t) {
              var e,
                n,
                i,
                r = this[0];
              return arguments.length
                ? ((i = v(t)),
                  this.each(function (n) {
                    var r;
                    1 === this.nodeType &&
                      (null == (r = i ? t.call(this, n, S(this).val()) : t)
                        ? (r = '')
                        : 'number' == typeof r
                        ? (r += '')
                        : Array.isArray(r) &&
                          (r = S.map(r, function (t) {
                            return null == t ? '' : t + '';
                          })),
                      ((e =
                        S.valHooks[this.type] ||
                        S.valHooks[this.nodeName.toLowerCase()]) &&
                        'set' in e &&
                        void 0 !== e.set(this, r, 'value')) ||
                        (this.value = r));
                  }))
                : r
                ? (e =
                    S.valHooks[r.type] ||
                    S.valHooks[r.nodeName.toLowerCase()]) &&
                  'get' in e &&
                  void 0 !== (n = e.get(r, 'value'))
                  ? n
                  : 'string' == typeof (n = r.value)
                  ? n.replace($e, '')
                  : null == n
                  ? ''
                  : n
                : void 0;
            },
          }),
            S.extend({
              valHooks: {
                option: {
                  get: function (t) {
                    var e = S.find.attr(t, 'value');
                    return null != e ? e : Se(S.text(t));
                  },
                },
                select: {
                  get: function (t) {
                    var e,
                      n,
                      i,
                      r = t.options,
                      o = t.selectedIndex,
                      s = 'select-one' === t.type,
                      a = s ? null : [],
                      l = s ? o + 1 : r.length;
                    for (i = o < 0 ? l : s ? o : 0; i < l; i++)
                      if (
                        ((n = r[i]).selected || i === o) &&
                        !n.disabled &&
                        (!n.parentNode.disabled || !E(n.parentNode, 'optgroup'))
                      ) {
                        if (((e = S(n).val()), s)) return e;
                        a.push(e);
                      }
                    return a;
                  },
                  set: function (t, e) {
                    for (
                      var n, i, r = t.options, o = S.makeArray(e), s = r.length;
                      s--;

                    )
                      ((i = r[s]).selected =
                        S.inArray(S.valHooks.option.get(i), o) > -1) &&
                        (n = !0);
                    return n || (t.selectedIndex = -1), o;
                  },
                },
              },
            }),
            S.each(['radio', 'checkbox'], function () {
              (S.valHooks[this] = {
                set: function (t, e) {
                  if (Array.isArray(e))
                    return (t.checked = S.inArray(S(t).val(), e) > -1);
                },
              }),
                g.checkOn ||
                  (S.valHooks[this].get = function (t) {
                    return null === t.getAttribute('value') ? 'on' : t.value;
                  });
            });
          var Ae = i.location,
            Le = { guid: Date.now() },
            Oe = /\?/;
          S.parseXML = function (t) {
            var e, n;
            if (!t || 'string' != typeof t) return null;
            try {
              e = new i.DOMParser().parseFromString(t, 'text/xml');
            } catch (t) {}
            return (
              (n = e && e.getElementsByTagName('parsererror')[0]),
              (e && !n) ||
                S.error(
                  'Invalid XML: ' +
                    (n
                      ? S.map(n.childNodes, function (t) {
                          return t.textContent;
                        }).join('\n')
                      : t)
                ),
              e
            );
          };
          var De = /^(?:focusinfocus|focusoutblur)$/,
            Pe = function (t) {
              t.stopPropagation();
            };
          S.extend(S.event, {
            trigger: function (t, e, n, r) {
              var o,
                s,
                a,
                l,
                c,
                u,
                d,
                p,
                h = [n || w],
                m = f.call(t, 'type') ? t.type : t,
                g = f.call(t, 'namespace') ? t.namespace.split('.') : [];
              if (
                ((s = p = a = n = n || w),
                3 !== n.nodeType &&
                  8 !== n.nodeType &&
                  !De.test(m + S.event.triggered) &&
                  (m.indexOf('.') > -1 &&
                    ((g = m.split('.')), (m = g.shift()), g.sort()),
                  (c = m.indexOf(':') < 0 && 'on' + m),
                  ((t = t[S.expando]
                    ? t
                    : new S.Event(m, 'object' == typeof t && t)).isTrigger = r
                    ? 2
                    : 3),
                  (t.namespace = g.join('.')),
                  (t.rnamespace = t.namespace
                    ? new RegExp(
                        '(^|\\.)' + g.join('\\.(?:.*\\.|)') + '(\\.|$)'
                      )
                    : null),
                  (t.result = void 0),
                  t.target || (t.target = n),
                  (e = null == e ? [t] : S.makeArray(e, [t])),
                  (d = S.event.special[m] || {}),
                  r || !d.trigger || !1 !== d.trigger.apply(n, e)))
              ) {
                if (!r && !d.noBubble && !y(n)) {
                  for (
                    l = d.delegateType || m,
                      De.test(l + m) || (s = s.parentNode);
                    s;
                    s = s.parentNode
                  )
                    h.push(s), (a = s);
                  a === (n.ownerDocument || w) &&
                    h.push(a.defaultView || a.parentWindow || i);
                }
                for (o = 0; (s = h[o++]) && !t.isPropagationStopped(); )
                  (p = s),
                    (t.type = o > 1 ? l : d.bindType || m),
                    (u =
                      (at.get(s, 'events') || Object.create(null))[t.type] &&
                      at.get(s, 'handle')) && u.apply(s, e),
                    (u = c && s[c]) &&
                      u.apply &&
                      ot(s) &&
                      ((t.result = u.apply(s, e)),
                      !1 === t.result && t.preventDefault());
                return (
                  (t.type = m),
                  r ||
                    t.isDefaultPrevented() ||
                    (d._default && !1 !== d._default.apply(h.pop(), e)) ||
                    !ot(n) ||
                    (c &&
                      v(n[m]) &&
                      !y(n) &&
                      ((a = n[c]) && (n[c] = null),
                      (S.event.triggered = m),
                      t.isPropagationStopped() && p.addEventListener(m, Pe),
                      n[m](),
                      t.isPropagationStopped() && p.removeEventListener(m, Pe),
                      (S.event.triggered = void 0),
                      a && (n[c] = a))),
                  t.result
                );
              }
            },
            simulate: function (t, e, n) {
              var i = S.extend(new S.Event(), n, { type: t, isSimulated: !0 });
              S.event.trigger(i, null, e);
            },
          }),
            S.fn.extend({
              trigger: function (t, e) {
                return this.each(function () {
                  S.event.trigger(t, e, this);
                });
              },
              triggerHandler: function (t, e) {
                var n = this[0];
                if (n) return S.event.trigger(t, e, n, !0);
              },
            });
          var Me = /\[\]$/,
            Ie = /\r?\n/g,
            qe = /^(?:submit|button|image|reset|file)$/i,
            He = /^(?:input|select|textarea|keygen)/i;
          function je(t, e, n, i) {
            var r;
            if (Array.isArray(e))
              S.each(e, function (e, r) {
                n || Me.test(t)
                  ? i(t, r)
                  : je(
                      t +
                        '[' +
                        ('object' == typeof r && null != r ? e : '') +
                        ']',
                      r,
                      n,
                      i
                    );
              });
            else if (n || 'object' !== k(e)) i(t, e);
            else for (r in e) je(t + '[' + r + ']', e[r], n, i);
          }
          (S.param = function (t, e) {
            var n,
              i = [],
              r = function (t, e) {
                var n = v(e) ? e() : e;
                i[i.length] =
                  encodeURIComponent(t) +
                  '=' +
                  encodeURIComponent(null == n ? '' : n);
              };
            if (null == t) return '';
            if (Array.isArray(t) || (t.jquery && !S.isPlainObject(t)))
              S.each(t, function () {
                r(this.name, this.value);
              });
            else for (n in t) je(n, t[n], e, r);
            return i.join('&');
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
                      this.name &&
                      !S(this).is(':disabled') &&
                      He.test(this.nodeName) &&
                      !qe.test(t) &&
                      (this.checked || !St.test(t))
                    );
                  })
                  .map(function (t, e) {
                    var n = S(this).val();
                    return null == n
                      ? null
                      : Array.isArray(n)
                      ? S.map(n, function (t) {
                          return { name: e.name, value: t.replace(Ie, '\r\n') };
                        })
                      : { name: e.name, value: n.replace(Ie, '\r\n') };
                  })
                  .get();
              },
            });
          var ze = /%20/g,
            Ne = /#.*$/,
            Fe = /([?&])_=[^&]*/,
            Re = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Be = /^(?:GET|HEAD)$/,
            We = /^\/\//,
            Ve = {},
            Ue = {},
            Ye = '*/'.concat('*'),
            Xe = w.createElement('a');
          function Ge(t) {
            return function (e, n) {
              'string' != typeof e && ((n = e), (e = '*'));
              var i,
                r = 0,
                o = e.toLowerCase().match(Y) || [];
              if (v(n))
                for (; (i = o[r++]); )
                  '+' === i[0]
                    ? ((i = i.slice(1) || '*'), (t[i] = t[i] || []).unshift(n))
                    : (t[i] = t[i] || []).push(n);
            };
          }
          function Qe(t, e, n, i) {
            var r = {},
              o = t === Ue;
            function s(a) {
              var l;
              return (
                (r[a] = !0),
                S.each(t[a] || [], function (t, a) {
                  var c = a(e, n, i);
                  return 'string' != typeof c || o || r[c]
                    ? o
                      ? !(l = c)
                      : void 0
                    : (e.dataTypes.unshift(c), s(c), !1);
                }),
                l
              );
            }
            return s(e.dataTypes[0]) || (!r['*'] && s('*'));
          }
          function Ze(t, e) {
            var n,
              i,
              r = S.ajaxSettings.flatOptions || {};
            for (n in e)
              void 0 !== e[n] && ((r[n] ? t : i || (i = {}))[n] = e[n]);
            return i && S.extend(!0, t, i), t;
          }
          (Xe.href = Ae.href),
            S.extend({
              active: 0,
              lastModified: {},
              etag: {},
              ajaxSettings: {
                url: Ae.href,
                type: 'GET',
                isLocal:
                  /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
                    Ae.protocol
                  ),
                global: !0,
                processData: !0,
                async: !0,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                accepts: {
                  '*': Ye,
                  text: 'text/plain',
                  html: 'text/html',
                  xml: 'application/xml, text/xml',
                  json: 'application/json, text/javascript',
                },
                contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                responseFields: {
                  xml: 'responseXML',
                  text: 'responseText',
                  json: 'responseJSON',
                },
                converters: {
                  '* text': String,
                  'text html': !0,
                  'text json': JSON.parse,
                  'text xml': S.parseXML,
                },
                flatOptions: { url: !0, context: !0 },
              },
              ajaxSetup: function (t, e) {
                return e ? Ze(Ze(t, S.ajaxSettings), e) : Ze(S.ajaxSettings, t);
              },
              ajaxPrefilter: Ge(Ve),
              ajaxTransport: Ge(Ue),
              ajax: function (t, e) {
                'object' == typeof t && ((e = t), (t = void 0)), (e = e || {});
                var n,
                  r,
                  o,
                  s,
                  a,
                  l,
                  c,
                  u,
                  d,
                  p,
                  f = S.ajaxSetup({}, e),
                  h = f.context || f,
                  m = f.context && (h.nodeType || h.jquery) ? S(h) : S.event,
                  g = S.Deferred(),
                  v = S.Callbacks('once memory'),
                  y = f.statusCode || {},
                  b = {},
                  x = {},
                  k = 'canceled',
                  _ = {
                    readyState: 0,
                    getResponseHeader: function (t) {
                      var e;
                      if (c) {
                        if (!s)
                          for (s = {}; (e = Re.exec(o)); )
                            s[e[1].toLowerCase() + ' '] = (
                              s[e[1].toLowerCase() + ' '] || []
                            ).concat(e[2]);
                        e = s[t.toLowerCase() + ' '];
                      }
                      return null == e ? null : e.join(', ');
                    },
                    getAllResponseHeaders: function () {
                      return c ? o : null;
                    },
                    setRequestHeader: function (t, e) {
                      return (
                        null == c &&
                          ((t = x[t.toLowerCase()] = x[t.toLowerCase()] || t),
                          (b[t] = e)),
                        this
                      );
                    },
                    overrideMimeType: function (t) {
                      return null == c && (f.mimeType = t), this;
                    },
                    statusCode: function (t) {
                      var e;
                      if (t)
                        if (c) _.always(t[_.status]);
                        else for (e in t) y[e] = [y[e], t[e]];
                      return this;
                    },
                    abort: function (t) {
                      var e = t || k;
                      return n && n.abort(e), T(0, e), this;
                    },
                  };
                if (
                  (g.promise(_),
                  (f.url = ((t || f.url || Ae.href) + '').replace(
                    We,
                    Ae.protocol + '//'
                  )),
                  (f.type = e.method || e.type || f.method || f.type),
                  (f.dataTypes = (f.dataType || '*').toLowerCase().match(Y) || [
                    '',
                  ]),
                  null == f.crossDomain)
                ) {
                  l = w.createElement('a');
                  try {
                    (l.href = f.url),
                      (l.href = l.href),
                      (f.crossDomain =
                        Xe.protocol + '//' + Xe.host !=
                        l.protocol + '//' + l.host);
                  } catch (t) {
                    f.crossDomain = !0;
                  }
                }
                if (
                  (f.data &&
                    f.processData &&
                    'string' != typeof f.data &&
                    (f.data = S.param(f.data, f.traditional)),
                  Qe(Ve, f, e, _),
                  c)
                )
                  return _;
                for (d in ((u = S.event && f.global) &&
                  0 == S.active++ &&
                  S.event.trigger('ajaxStart'),
                (f.type = f.type.toUpperCase()),
                (f.hasContent = !Be.test(f.type)),
                (r = f.url.replace(Ne, '')),
                f.hasContent
                  ? f.data &&
                    f.processData &&
                    0 ===
                      (f.contentType || '').indexOf(
                        'application/x-www-form-urlencoded'
                      ) &&
                    (f.data = f.data.replace(ze, '+'))
                  : ((p = f.url.slice(r.length)),
                    f.data &&
                      (f.processData || 'string' == typeof f.data) &&
                      ((r += (Oe.test(r) ? '&' : '?') + f.data), delete f.data),
                    !1 === f.cache &&
                      ((r = r.replace(Fe, '$1')),
                      (p = (Oe.test(r) ? '&' : '?') + '_=' + Le.guid++ + p)),
                    (f.url = r + p)),
                f.ifModified &&
                  (S.lastModified[r] &&
                    _.setRequestHeader('If-Modified-Since', S.lastModified[r]),
                  S.etag[r] && _.setRequestHeader('If-None-Match', S.etag[r])),
                ((f.data && f.hasContent && !1 !== f.contentType) ||
                  e.contentType) &&
                  _.setRequestHeader('Content-Type', f.contentType),
                _.setRequestHeader(
                  'Accept',
                  f.dataTypes[0] && f.accepts[f.dataTypes[0]]
                    ? f.accepts[f.dataTypes[0]] +
                        ('*' !== f.dataTypes[0] ? ', ' + Ye + '; q=0.01' : '')
                    : f.accepts['*']
                ),
                f.headers))
                  _.setRequestHeader(d, f.headers[d]);
                if (f.beforeSend && (!1 === f.beforeSend.call(h, _, f) || c))
                  return _.abort();
                if (
                  ((k = 'abort'),
                  v.add(f.complete),
                  _.done(f.success),
                  _.fail(f.error),
                  (n = Qe(Ue, f, e, _)))
                ) {
                  if (
                    ((_.readyState = 1), u && m.trigger('ajaxSend', [_, f]), c)
                  )
                    return _;
                  f.async &&
                    f.timeout > 0 &&
                    (a = i.setTimeout(function () {
                      _.abort('timeout');
                    }, f.timeout));
                  try {
                    (c = !1), n.send(b, T);
                  } catch (t) {
                    if (c) throw t;
                    T(-1, t);
                  }
                } else T(-1, 'No Transport');
                function T(t, e, s, l) {
                  var d,
                    p,
                    w,
                    b,
                    x,
                    k = e;
                  c ||
                    ((c = !0),
                    a && i.clearTimeout(a),
                    (n = void 0),
                    (o = l || ''),
                    (_.readyState = t > 0 ? 4 : 0),
                    (d = (t >= 200 && t < 300) || 304 === t),
                    s &&
                      (b = (function (t, e, n) {
                        for (
                          var i, r, o, s, a = t.contents, l = t.dataTypes;
                          '*' === l[0];

                        )
                          l.shift(),
                            void 0 === i &&
                              (i =
                                t.mimeType ||
                                e.getResponseHeader('Content-Type'));
                        if (i)
                          for (r in a)
                            if (a[r] && a[r].test(i)) {
                              l.unshift(r);
                              break;
                            }
                        if (l[0] in n) o = l[0];
                        else {
                          for (r in n) {
                            if (!l[0] || t.converters[r + ' ' + l[0]]) {
                              o = r;
                              break;
                            }
                            s || (s = r);
                          }
                          o = o || s;
                        }
                        if (o) return o !== l[0] && l.unshift(o), n[o];
                      })(f, _, s)),
                    !d &&
                      S.inArray('script', f.dataTypes) > -1 &&
                      S.inArray('json', f.dataTypes) < 0 &&
                      (f.converters['text script'] = function () {}),
                    (b = (function (t, e, n, i) {
                      var r,
                        o,
                        s,
                        a,
                        l,
                        c = {},
                        u = t.dataTypes.slice();
                      if (u[1])
                        for (s in t.converters)
                          c[s.toLowerCase()] = t.converters[s];
                      for (o = u.shift(); o; )
                        if (
                          (t.responseFields[o] && (n[t.responseFields[o]] = e),
                          !l &&
                            i &&
                            t.dataFilter &&
                            (e = t.dataFilter(e, t.dataType)),
                          (l = o),
                          (o = u.shift()))
                        )
                          if ('*' === o) o = l;
                          else if ('*' !== l && l !== o) {
                            if (!(s = c[l + ' ' + o] || c['* ' + o]))
                              for (r in c)
                                if (
                                  (a = r.split(' '))[1] === o &&
                                  (s = c[l + ' ' + a[0]] || c['* ' + a[0]])
                                ) {
                                  !0 === s
                                    ? (s = c[r])
                                    : !0 !== c[r] &&
                                      ((o = a[0]), u.unshift(a[1]));
                                  break;
                                }
                            if (!0 !== s)
                              if (s && t.throws) e = s(e);
                              else
                                try {
                                  e = s(e);
                                } catch (t) {
                                  return {
                                    state: 'parsererror',
                                    error: s
                                      ? t
                                      : 'No conversion from ' + l + ' to ' + o,
                                  };
                                }
                          }
                      return { state: 'success', data: e };
                    })(f, b, _, d)),
                    d
                      ? (f.ifModified &&
                          ((x = _.getResponseHeader('Last-Modified')) &&
                            (S.lastModified[r] = x),
                          (x = _.getResponseHeader('etag')) && (S.etag[r] = x)),
                        204 === t || 'HEAD' === f.type
                          ? (k = 'nocontent')
                          : 304 === t
                          ? (k = 'notmodified')
                          : ((k = b.state), (p = b.data), (d = !(w = b.error))))
                      : ((w = k),
                        (!t && k) || ((k = 'error'), t < 0 && (t = 0))),
                    (_.status = t),
                    (_.statusText = (e || k) + ''),
                    d
                      ? g.resolveWith(h, [p, k, _])
                      : g.rejectWith(h, [_, k, w]),
                    _.statusCode(y),
                    (y = void 0),
                    u &&
                      m.trigger(d ? 'ajaxSuccess' : 'ajaxError', [
                        _,
                        f,
                        d ? p : w,
                      ]),
                    v.fireWith(h, [_, k]),
                    u &&
                      (m.trigger('ajaxComplete', [_, f]),
                      --S.active || S.event.trigger('ajaxStop')));
                }
                return _;
              },
              getJSON: function (t, e, n) {
                return S.get(t, e, n, 'json');
              },
              getScript: function (t, e) {
                return S.get(t, void 0, e, 'script');
              },
            }),
            S.each(['get', 'post'], function (t, e) {
              S[e] = function (t, n, i, r) {
                return (
                  v(n) && ((r = r || i), (i = n), (n = void 0)),
                  S.ajax(
                    S.extend(
                      { url: t, type: e, dataType: r, data: n, success: i },
                      S.isPlainObject(t) && t
                    )
                  )
                );
              };
            }),
            S.ajaxPrefilter(function (t) {
              var e;
              for (e in t.headers)
                'content-type' === e.toLowerCase() &&
                  (t.contentType = t.headers[e] || '');
            }),
            (S._evalUrl = function (t, e, n) {
              return S.ajax({
                url: t,
                type: 'GET',
                dataType: 'script',
                cache: !0,
                async: !1,
                global: !1,
                converters: { 'text script': function () {} },
                dataFilter: function (t) {
                  S.globalEval(t, e, n);
                },
              });
            }),
            S.fn.extend({
              wrapAll: function (t) {
                var e;
                return (
                  this[0] &&
                    (v(t) && (t = t.call(this[0])),
                    (e = S(t, this[0].ownerDocument).eq(0).clone(!0)),
                    this[0].parentNode && e.insertBefore(this[0]),
                    e
                      .map(function () {
                        for (var t = this; t.firstElementChild; )
                          t = t.firstElementChild;
                        return t;
                      })
                      .append(this)),
                  this
                );
              },
              wrapInner: function (t) {
                return v(t)
                  ? this.each(function (e) {
                      S(this).wrapInner(t.call(this, e));
                    })
                  : this.each(function () {
                      var e = S(this),
                        n = e.contents();
                      n.length ? n.wrapAll(t) : e.append(t);
                    });
              },
              wrap: function (t) {
                var e = v(t);
                return this.each(function (n) {
                  S(this).wrapAll(e ? t.call(this, n) : t);
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
              return !!(
                t.offsetWidth ||
                t.offsetHeight ||
                t.getClientRects().length
              );
            }),
            (S.ajaxSettings.xhr = function () {
              try {
                return new i.XMLHttpRequest();
              } catch (t) {}
            });
          var Ke = { 0: 200, 1223: 204 },
            Je = S.ajaxSettings.xhr();
          (g.cors = !!Je && 'withCredentials' in Je),
            (g.ajax = Je = !!Je),
            S.ajaxTransport(function (t) {
              var e, n;
              if (g.cors || (Je && !t.crossDomain))
                return {
                  send: function (r, o) {
                    var s,
                      a = t.xhr();
                    if (
                      (a.open(t.type, t.url, t.async, t.username, t.password),
                      t.xhrFields)
                    )
                      for (s in t.xhrFields) a[s] = t.xhrFields[s];
                    for (s in (t.mimeType &&
                      a.overrideMimeType &&
                      a.overrideMimeType(t.mimeType),
                    t.crossDomain ||
                      r['X-Requested-With'] ||
                      (r['X-Requested-With'] = 'XMLHttpRequest'),
                    r))
                      a.setRequestHeader(s, r[s]);
                    (e = function (t) {
                      return function () {
                        e &&
                          ((e =
                            n =
                            a.onload =
                            a.onerror =
                            a.onabort =
                            a.ontimeout =
                            a.onreadystatechange =
                              null),
                          'abort' === t
                            ? a.abort()
                            : 'error' === t
                            ? 'number' != typeof a.status
                              ? o(0, 'error')
                              : o(a.status, a.statusText)
                            : o(
                                Ke[a.status] || a.status,
                                a.statusText,
                                'text' !== (a.responseType || 'text') ||
                                  'string' != typeof a.responseText
                                  ? { binary: a.response }
                                  : { text: a.responseText },
                                a.getAllResponseHeaders()
                              ));
                      };
                    }),
                      (a.onload = e()),
                      (n = a.onerror = a.ontimeout = e('error')),
                      void 0 !== a.onabort
                        ? (a.onabort = n)
                        : (a.onreadystatechange = function () {
                            4 === a.readyState &&
                              i.setTimeout(function () {
                                e && n();
                              });
                          }),
                      (e = e('abort'));
                    try {
                      a.send((t.hasContent && t.data) || null);
                    } catch (t) {
                      if (e) throw t;
                    }
                  },
                  abort: function () {
                    e && e();
                  },
                };
            }),
            S.ajaxPrefilter(function (t) {
              t.crossDomain && (t.contents.script = !1);
            }),
            S.ajaxSetup({
              accepts: {
                script:
                  'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
              },
              contents: { script: /\b(?:java|ecma)script\b/ },
              converters: {
                'text script': function (t) {
                  return S.globalEval(t), t;
                },
              },
            }),
            S.ajaxPrefilter('script', function (t) {
              void 0 === t.cache && (t.cache = !1),
                t.crossDomain && (t.type = 'GET');
            }),
            S.ajaxTransport('script', function (t) {
              var e, n;
              if (t.crossDomain || t.scriptAttrs)
                return {
                  send: function (i, r) {
                    (e = S('<script>')
                      .attr(t.scriptAttrs || {})
                      .prop({ charset: t.scriptCharset, src: t.url })
                      .on(
                        'load error',
                        (n = function (t) {
                          e.remove(),
                            (n = null),
                            t && r('error' === t.type ? 404 : 200, t.type);
                        })
                      )),
                      w.head.appendChild(e[0]);
                  },
                  abort: function () {
                    n && n();
                  },
                };
            });
          var tn,
            en = [],
            nn = /(=)\?(?=&|$)|\?\?/;
          S.ajaxSetup({
            jsonp: 'callback',
            jsonpCallback: function () {
              var t = en.pop() || S.expando + '_' + Le.guid++;
              return (this[t] = !0), t;
            },
          }),
            S.ajaxPrefilter('json jsonp', function (t, e, n) {
              var r,
                o,
                s,
                a =
                  !1 !== t.jsonp &&
                  (nn.test(t.url)
                    ? 'url'
                    : 'string' == typeof t.data &&
                      0 ===
                        (t.contentType || '').indexOf(
                          'application/x-www-form-urlencoded'
                        ) &&
                      nn.test(t.data) &&
                      'data');
              if (a || 'jsonp' === t.dataTypes[0])
                return (
                  (r = t.jsonpCallback =
                    v(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
                  a
                    ? (t[a] = t[a].replace(nn, '$1' + r))
                    : !1 !== t.jsonp &&
                      (t.url +=
                        (Oe.test(t.url) ? '&' : '?') + t.jsonp + '=' + r),
                  (t.converters['script json'] = function () {
                    return s || S.error(r + ' was not called'), s[0];
                  }),
                  (t.dataTypes[0] = 'json'),
                  (o = i[r]),
                  (i[r] = function () {
                    s = arguments;
                  }),
                  n.always(function () {
                    void 0 === o ? S(i).removeProp(r) : (i[r] = o),
                      t[r] && ((t.jsonpCallback = e.jsonpCallback), en.push(r)),
                      s && v(o) && o(s[0]),
                      (s = o = void 0);
                  }),
                  'script'
                );
            }),
            (g.createHTMLDocument =
              (((tn = w.implementation.createHTMLDocument('').body).innerHTML =
                '<form></form><form></form>'),
              2 === tn.childNodes.length)),
            (S.parseHTML = function (t, e, n) {
              return 'string' != typeof t
                ? []
                : ('boolean' == typeof e && ((n = e), (e = !1)),
                  e ||
                    (g.createHTMLDocument
                      ? (((i = (e =
                          w.implementation.createHTMLDocument(
                            ''
                          )).createElement('base')).href = w.location.href),
                        e.head.appendChild(i))
                      : (e = w)),
                  (o = !n && []),
                  (r = N.exec(t))
                    ? [e.createElement(r[1])]
                    : ((r = Dt([t], e, o)),
                      o && o.length && S(o).remove(),
                      S.merge([], r.childNodes)));
              var i, r, o;
            }),
            (S.fn.load = function (t, e, n) {
              var i,
                r,
                o,
                s = this,
                a = t.indexOf(' ');
              return (
                a > -1 && ((i = Se(t.slice(a))), (t = t.slice(0, a))),
                v(e)
                  ? ((n = e), (e = void 0))
                  : e && 'object' == typeof e && (r = 'POST'),
                s.length > 0 &&
                  S.ajax({
                    url: t,
                    type: r || 'GET',
                    dataType: 'html',
                    data: e,
                  })
                    .done(function (t) {
                      (o = arguments),
                        s.html(
                          i ? S('<div>').append(S.parseHTML(t)).find(i) : t
                        );
                    })
                    .always(
                      n &&
                        function (t, e) {
                          s.each(function () {
                            n.apply(this, o || [t.responseText, e, t]);
                          });
                        }
                    ),
                this
              );
            }),
            (S.expr.pseudos.animated = function (t) {
              return S.grep(S.timers, function (e) {
                return t === e.elem;
              }).length;
            }),
            (S.offset = {
              setOffset: function (t, e, n) {
                var i,
                  r,
                  o,
                  s,
                  a,
                  l,
                  c = S.css(t, 'position'),
                  u = S(t),
                  d = {};
                'static' === c && (t.style.position = 'relative'),
                  (a = u.offset()),
                  (o = S.css(t, 'top')),
                  (l = S.css(t, 'left')),
                  ('absolute' === c || 'fixed' === c) &&
                  (o + l).indexOf('auto') > -1
                    ? ((s = (i = u.position()).top), (r = i.left))
                    : ((s = parseFloat(o) || 0), (r = parseFloat(l) || 0)),
                  v(e) && (e = e.call(t, n, S.extend({}, a))),
                  null != e.top && (d.top = e.top - a.top + s),
                  null != e.left && (d.left = e.left - a.left + r),
                  'using' in e ? e.using.call(t, d) : u.css(d);
              },
            }),
            S.fn.extend({
              offset: function (t) {
                if (arguments.length)
                  return void 0 === t
                    ? this
                    : this.each(function (e) {
                        S.offset.setOffset(this, t, e);
                      });
                var e,
                  n,
                  i = this[0];
                return i
                  ? i.getClientRects().length
                    ? ((e = i.getBoundingClientRect()),
                      (n = i.ownerDocument.defaultView),
                      {
                        top: e.top + n.pageYOffset,
                        left: e.left + n.pageXOffset,
                      })
                    : { top: 0, left: 0 }
                  : void 0;
              },
              position: function () {
                if (this[0]) {
                  var t,
                    e,
                    n,
                    i = this[0],
                    r = { top: 0, left: 0 };
                  if ('fixed' === S.css(i, 'position'))
                    e = i.getBoundingClientRect();
                  else {
                    for (
                      e = this.offset(),
                        n = i.ownerDocument,
                        t = i.offsetParent || n.documentElement;
                      t &&
                      (t === n.body || t === n.documentElement) &&
                      'static' === S.css(t, 'position');

                    )
                      t = t.parentNode;
                    t &&
                      t !== i &&
                      1 === t.nodeType &&
                      (((r = S(t).offset()).top += S.css(
                        t,
                        'borderTopWidth',
                        !0
                      )),
                      (r.left += S.css(t, 'borderLeftWidth', !0)));
                  }
                  return {
                    top: e.top - r.top - S.css(i, 'marginTop', !0),
                    left: e.left - r.left - S.css(i, 'marginLeft', !0),
                  };
                }
              },
              offsetParent: function () {
                return this.map(function () {
                  for (
                    var t = this.offsetParent;
                    t && 'static' === S.css(t, 'position');

                  )
                    t = t.offsetParent;
                  return t || mt;
                });
              },
            }),
            S.each(
              { scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' },
              function (t, e) {
                var n = 'pageYOffset' === e;
                S.fn[t] = function (i) {
                  return tt(
                    this,
                    function (t, i, r) {
                      var o;
                      if (
                        (y(t)
                          ? (o = t)
                          : 9 === t.nodeType && (o = t.defaultView),
                        void 0 === r)
                      )
                        return o ? o[e] : t[i];
                      o
                        ? o.scrollTo(
                            n ? o.pageXOffset : r,
                            n ? r : o.pageYOffset
                          )
                        : (t[i] = r);
                    },
                    t,
                    i,
                    arguments.length
                  );
                };
              }
            ),
            S.each(['top', 'left'], function (t, e) {
              S.cssHooks[e] = te(g.pixelPosition, function (t, n) {
                if (n)
                  return (
                    (n = Jt(t, e)), Xt.test(n) ? S(t).position()[e] + 'px' : n
                  );
              });
            }),
            S.each({ Height: 'height', Width: 'width' }, function (t, e) {
              S.each(
                { padding: 'inner' + t, content: e, '': 'outer' + t },
                function (n, i) {
                  S.fn[i] = function (r, o) {
                    var s = arguments.length && (n || 'boolean' != typeof r),
                      a = n || (!0 === r || !0 === o ? 'margin' : 'border');
                    return tt(
                      this,
                      function (e, n, r) {
                        var o;
                        return y(e)
                          ? 0 === i.indexOf('outer')
                            ? e['inner' + t]
                            : e.document.documentElement['client' + t]
                          : 9 === e.nodeType
                          ? ((o = e.documentElement),
                            Math.max(
                              e.body['scroll' + t],
                              o['scroll' + t],
                              e.body['offset' + t],
                              o['offset' + t],
                              o['client' + t]
                            ))
                          : void 0 === r
                          ? S.css(e, n, a)
                          : S.style(e, n, r, a);
                      },
                      e,
                      s ? r : void 0,
                      s
                    );
                  };
                }
              );
            }),
            S.each(
              [
                'ajaxStart',
                'ajaxStop',
                'ajaxComplete',
                'ajaxError',
                'ajaxSuccess',
                'ajaxSend',
              ],
              function (t, e) {
                S.fn[e] = function (t) {
                  return this.on(e, t);
                };
              }
            ),
            S.fn.extend({
              bind: function (t, e, n) {
                return this.on(t, null, e, n);
              },
              unbind: function (t, e) {
                return this.off(t, null, e);
              },
              delegate: function (t, e, n, i) {
                return this.on(e, t, n, i);
              },
              undelegate: function (t, e, n) {
                return 1 === arguments.length
                  ? this.off(t, '**')
                  : this.off(e, t || '**', n);
              },
              hover: function (t, e) {
                return this.on('mouseenter', t).on('mouseleave', e || t);
              },
            }),
            S.each(
              'blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(
                ' '
              ),
              function (t, e) {
                S.fn[e] = function (t, n) {
                  return arguments.length > 0
                    ? this.on(e, null, t, n)
                    : this.trigger(e);
                };
              }
            );
          var rn = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
          (S.proxy = function (t, e) {
            var n, i, r;
            if (('string' == typeof e && ((n = t[e]), (e = t), (t = n)), v(t)))
              return (
                (i = a.call(arguments, 2)),
                (r = function () {
                  return t.apply(e || this, i.concat(a.call(arguments)));
                }),
                (r.guid = t.guid = t.guid || S.guid++),
                r
              );
          }),
            (S.holdReady = function (t) {
              t ? S.readyWait++ : S.ready(!0);
            }),
            (S.isArray = Array.isArray),
            (S.parseJSON = JSON.parse),
            (S.nodeName = E),
            (S.isFunction = v),
            (S.isWindow = y),
            (S.camelCase = rt),
            (S.type = k),
            (S.now = Date.now),
            (S.isNumeric = function (t) {
              var e = S.type(t);
              return (
                ('number' === e || 'string' === e) && !isNaN(t - parseFloat(t))
              );
            }),
            (S.trim = function (t) {
              return null == t ? '' : (t + '').replace(rn, '$1');
            }),
            void 0 ===
              (n = function () {
                return S;
              }.apply(e, [])) || (t.exports = n);
          var on = i.jQuery,
            sn = i.$;
          return (
            (S.noConflict = function (t) {
              return (
                i.$ === S && (i.$ = sn),
                t && i.jQuery === S && (i.jQuery = on),
                S
              );
            }),
            void 0 === r && (i.jQuery = i.$ = S),
            S
          );
        });
      },
      440: (t) => {
        t.exports = function (t, e, n) {
          return t * (1 - n) + e * n;
        };
      },
      732: (t, e, n) => {
        var i,
          r,
          o,
          s = n(692);
        (r = [n(692)]),
          (i = function (t) {
            var e,
              n,
              i,
              r,
              o,
              a,
              l = 'Close',
              c = 'BeforeClose',
              u = 'AfterClose',
              d = 'BeforeAppend',
              p = 'MarkupParse',
              f = 'Open',
              h = 'Change',
              m = 'mfp',
              g = '.' + m,
              v = 'mfp-ready',
              y = 'mfp-removing',
              w = 'mfp-prevent-close',
              b = function () {},
              x = !!s,
              k = t(window),
              _ = function (t, n) {
                e.ev.on(m + t + g, n);
              },
              T = function (e, n, i, r) {
                var o = document.createElement('div');
                return (
                  (o.className = 'mfp-' + e),
                  i && (o.innerHTML = i),
                  r ? n && n.appendChild(o) : ((o = t(o)), n && o.appendTo(n)),
                  o
                );
              },
              S = function (t, n) {
                e.ev.triggerHandler(m + t, n),
                  e.st.callbacks &&
                    ((t = t.charAt(0).toLowerCase() + t.slice(1)),
                    e.st.callbacks[t] &&
                      e.st.callbacks[t].apply(e, Array.isArray(n) ? n : [n]));
              },
              C = function (n) {
                return (
                  (n === a && e.currTemplate.closeBtn) ||
                    ((e.currTemplate.closeBtn = t(
                      e.st.closeMarkup.replace('%title%', e.st.tClose)
                    )),
                    (a = n)),
                  e.currTemplate.closeBtn
                );
              },
              E = function () {
                t.magnificPopup.instance ||
                  ((e = new b()).init(), (t.magnificPopup.instance = e));
              },
              $ = function () {
                var t = document.createElement('p').style,
                  e = ['ms', 'O', 'Moz', 'Webkit'];
                if (void 0 !== t.transition) return !0;
                for (; e.length; ) if (e.pop() + 'Transition' in t) return !0;
                return !1;
              };
            (b.prototype = {
              constructor: b,
              init: function () {
                var n = navigator.appVersion;
                (e.isLowIE = e.isIE8 =
                  document.all && !document.addEventListener),
                  (e.isAndroid = /android/gi.test(n)),
                  (e.isIOS = /iphone|ipad|ipod/gi.test(n)),
                  (e.supportsTransition = $()),
                  (e.probablyMobile =
                    e.isAndroid ||
                    e.isIOS ||
                    /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
                      navigator.userAgent
                    )),
                  (i = t(document)),
                  (e.popupsCache = {});
              },
              open: function (n) {
                var r;
                if (!1 === n.isObj) {
                  (e.items = n.items.toArray()), (e.index = 0);
                  var s,
                    a = n.items;
                  for (r = 0; r < a.length; r++)
                    if (((s = a[r]).parsed && (s = s.el[0]), s === n.el[0])) {
                      e.index = r;
                      break;
                    }
                } else
                  (e.items = Array.isArray(n.items) ? n.items : [n.items]),
                    (e.index = n.index || 0);
                if (!e.isOpen) {
                  (e.types = []),
                    (o = ''),
                    n.mainEl && n.mainEl.length
                      ? (e.ev = n.mainEl.eq(0))
                      : (e.ev = i),
                    n.key
                      ? (e.popupsCache[n.key] || (e.popupsCache[n.key] = {}),
                        (e.currTemplate = e.popupsCache[n.key]))
                      : (e.currTemplate = {}),
                    (e.st = t.extend(!0, {}, t.magnificPopup.defaults, n)),
                    (e.fixedContentPos =
                      'auto' === e.st.fixedContentPos
                        ? !e.probablyMobile
                        : e.st.fixedContentPos),
                    e.st.modal &&
                      ((e.st.closeOnContentClick = !1),
                      (e.st.closeOnBgClick = !1),
                      (e.st.showCloseBtn = !1),
                      (e.st.enableEscapeKey = !1)),
                    e.bgOverlay ||
                      ((e.bgOverlay = T('bg').on('click' + g, function () {
                        e.close();
                      })),
                      (e.wrap = T('wrap')
                        .attr('tabindex', -1)
                        .on('click' + g, function (t) {
                          e._checkIfClose(t.target) && e.close();
                        })),
                      (e.container = T('container', e.wrap))),
                    (e.contentContainer = T('content')),
                    e.st.preloader &&
                      (e.preloader = T(
                        'preloader',
                        e.container,
                        e.st.tLoading
                      ));
                  var l = t.magnificPopup.modules;
                  for (r = 0; r < l.length; r++) {
                    var c = l[r];
                    (c = c.charAt(0).toUpperCase() + c.slice(1)),
                      e['init' + c].call(e);
                  }
                  S('BeforeOpen'),
                    e.st.showCloseBtn &&
                      (e.st.closeBtnInside
                        ? (_(p, function (t, e, n, i) {
                            n.close_replaceWith = C(i.type);
                          }),
                          (o += ' mfp-close-btn-in'))
                        : e.wrap.append(C())),
                    e.st.alignTop && (o += ' mfp-align-top'),
                    e.fixedContentPos
                      ? e.wrap.css({
                          overflow: e.st.overflowY,
                          overflowX: 'hidden',
                          overflowY: e.st.overflowY,
                        })
                      : e.wrap.css({
                          top: k.scrollTop(),
                          position: 'absolute',
                        }),
                    (!1 === e.st.fixedBgPos ||
                      ('auto' === e.st.fixedBgPos && !e.fixedContentPos)) &&
                      e.bgOverlay.css({
                        height: i.height(),
                        position: 'absolute',
                      }),
                    e.st.enableEscapeKey &&
                      i.on('keyup' + g, function (t) {
                        27 === t.keyCode && e.close();
                      }),
                    k.on('resize' + g, function () {
                      e.updateSize();
                    }),
                    e.st.closeOnContentClick || (o += ' mfp-auto-cursor'),
                    o && e.wrap.addClass(o);
                  var u = (e.wH = k.height()),
                    d = {};
                  if (e.fixedContentPos && e._hasScrollBar(u)) {
                    var h = e._getScrollbarSize();
                    h && (d.marginRight = h);
                  }
                  e.fixedContentPos &&
                    (e.isIE7
                      ? t('body, html').css('overflow', 'hidden')
                      : (d.overflow = 'hidden'));
                  var m = e.st.mainClass;
                  return (
                    e.isIE7 && (m += ' mfp-ie7'),
                    m && e._addClassToMFP(m),
                    e.updateItemHTML(),
                    S('BuildControls'),
                    t('html').css(d),
                    e.bgOverlay
                      .add(e.wrap)
                      .prependTo(e.st.prependTo || t(document.body)),
                    (e._lastFocusedEl = document.activeElement),
                    setTimeout(function () {
                      e.content
                        ? (e._addClassToMFP(v), e._setFocus())
                        : e.bgOverlay.addClass(v),
                        i.on('focusin' + g, e._onFocusIn);
                    }, 16),
                    (e.isOpen = !0),
                    e.updateSize(u),
                    S(f),
                    n
                  );
                }
                e.updateItemHTML();
              },
              close: function () {
                e.isOpen &&
                  (S(c),
                  (e.isOpen = !1),
                  e.st.removalDelay && !e.isLowIE && e.supportsTransition
                    ? (e._addClassToMFP(y),
                      setTimeout(function () {
                        e._close();
                      }, e.st.removalDelay))
                    : e._close());
              },
              _close: function () {
                S(l);
                var n = y + ' ' + v + ' ';
                if (
                  (e.bgOverlay.detach(),
                  e.wrap.detach(),
                  e.container.empty(),
                  e.st.mainClass && (n += e.st.mainClass + ' '),
                  e._removeClassFromMFP(n),
                  e.fixedContentPos)
                ) {
                  var r = { marginRight: '' };
                  e.isIE7
                    ? t('body, html').css('overflow', '')
                    : (r.overflow = ''),
                    t('html').css(r);
                }
                i.off('keyup' + g + ' focusin' + g),
                  e.ev.off(g),
                  e.wrap.attr('class', 'mfp-wrap').removeAttr('style'),
                  e.bgOverlay.attr('class', 'mfp-bg'),
                  e.container.attr('class', 'mfp-container'),
                  !e.st.showCloseBtn ||
                    (e.st.closeBtnInside &&
                      !0 !== e.currTemplate[e.currItem.type]) ||
                    (e.currTemplate.closeBtn &&
                      e.currTemplate.closeBtn.detach()),
                  e.st.autoFocusLast &&
                    e._lastFocusedEl &&
                    t(e._lastFocusedEl).trigger('focus'),
                  (e.currItem = null),
                  (e.content = null),
                  (e.currTemplate = null),
                  (e.prevHeight = 0),
                  S(u);
              },
              updateSize: function (t) {
                if (e.isIOS) {
                  var n =
                      document.documentElement.clientWidth / window.innerWidth,
                    i = window.innerHeight * n;
                  e.wrap.css('height', i), (e.wH = i);
                } else e.wH = t || k.height();
                e.fixedContentPos || e.wrap.css('height', e.wH), S('Resize');
              },
              updateItemHTML: function () {
                var n = e.items[e.index];
                e.contentContainer.detach(),
                  e.content && e.content.detach(),
                  n.parsed || (n = e.parseEl(e.index));
                var i = n.type;
                if (
                  (S('BeforeChange', [e.currItem ? e.currItem.type : '', i]),
                  (e.currItem = n),
                  !e.currTemplate[i])
                ) {
                  var o = !!e.st[i] && e.st[i].markup;
                  S('FirstMarkupParse', o), (e.currTemplate[i] = !o || t(o));
                }
                r &&
                  r !== n.type &&
                  e.container.removeClass('mfp-' + r + '-holder');
                var s = e['get' + i.charAt(0).toUpperCase() + i.slice(1)](
                  n,
                  e.currTemplate[i]
                );
                e.appendContent(s, i),
                  (n.preloaded = !0),
                  S(h, n),
                  (r = n.type),
                  e.container.prepend(e.contentContainer),
                  S('AfterChange');
              },
              appendContent: function (t, n) {
                (e.content = t),
                  t
                    ? e.st.showCloseBtn &&
                      e.st.closeBtnInside &&
                      !0 === e.currTemplate[n]
                      ? e.content.find('.mfp-close').length ||
                        e.content.append(C())
                      : (e.content = t)
                    : (e.content = ''),
                  S(d),
                  e.container.addClass('mfp-' + n + '-holder'),
                  e.contentContainer.append(e.content);
              },
              parseEl: function (n) {
                var i,
                  r = e.items[n];
                if (
                  (r.tagName
                    ? (r = { el: t(r) })
                    : ((i = r.type), (r = { data: r, src: r.src })),
                  r.el)
                ) {
                  for (var o = e.types, s = 0; s < o.length; s++)
                    if (r.el.hasClass('mfp-' + o[s])) {
                      i = o[s];
                      break;
                    }
                  (r.src = r.el.attr('data-mfp-src')),
                    r.src || (r.src = r.el.attr('href'));
                }
                return (
                  (r.type = i || e.st.type || 'inline'),
                  (r.index = n),
                  (r.parsed = !0),
                  (e.items[n] = r),
                  S('ElementParse', r),
                  e.items[n]
                );
              },
              addGroup: function (t, n) {
                var i = function (i) {
                  (i.mfpEl = this), e._openClick(i, t, n);
                };
                n || (n = {});
                var r = 'click.magnificPopup';
                (n.mainEl = t),
                  n.items
                    ? ((n.isObj = !0), t.off(r).on(r, i))
                    : ((n.isObj = !1),
                      n.delegate
                        ? t.off(r).on(r, n.delegate, i)
                        : ((n.items = t), t.off(r).on(r, i)));
              },
              _openClick: function (n, i, r) {
                if (
                  (void 0 !== r.midClick
                    ? r.midClick
                    : t.magnificPopup.defaults.midClick) ||
                  !(
                    2 === n.which ||
                    n.ctrlKey ||
                    n.metaKey ||
                    n.altKey ||
                    n.shiftKey
                  )
                ) {
                  var o =
                    void 0 !== r.disableOn
                      ? r.disableOn
                      : t.magnificPopup.defaults.disableOn;
                  if (o)
                    if ('function' == typeof o) {
                      if (!o.call(e)) return !0;
                    } else if (k.width() < o) return !0;
                  n.type &&
                    (n.preventDefault(), e.isOpen && n.stopPropagation()),
                    (r.el = t(n.mfpEl)),
                    r.delegate && (r.items = i.find(r.delegate)),
                    e.open(r);
                }
              },
              updateStatus: function (t, i) {
                if (e.preloader) {
                  n !== t && e.container.removeClass('mfp-s-' + n),
                    i || 'loading' !== t || (i = e.st.tLoading);
                  var r = { status: t, text: i };
                  S('UpdateStatus', r),
                    (t = r.status),
                    (i = r.text),
                    e.st.allowHTMLInStatusIndicator
                      ? e.preloader.html(i)
                      : e.preloader.text(i),
                    e.preloader.find('a').on('click', function (t) {
                      t.stopImmediatePropagation();
                    }),
                    e.container.addClass('mfp-s-' + t),
                    (n = t);
                }
              },
              _checkIfClose: function (n) {
                if (!t(n).closest('.' + w).length) {
                  var i = e.st.closeOnContentClick,
                    r = e.st.closeOnBgClick;
                  if (i && r) return !0;
                  if (
                    !e.content ||
                    t(n).closest('.mfp-close').length ||
                    (e.preloader && n === e.preloader[0])
                  )
                    return !0;
                  if (n === e.content[0] || t.contains(e.content[0], n)) {
                    if (i) return !0;
                  } else if (r && t.contains(document, n)) return !0;
                  return !1;
                }
              },
              _addClassToMFP: function (t) {
                e.bgOverlay.addClass(t), e.wrap.addClass(t);
              },
              _removeClassFromMFP: function (t) {
                this.bgOverlay.removeClass(t), e.wrap.removeClass(t);
              },
              _hasScrollBar: function (t) {
                return (
                  (e.isIE7 ? i.height() : document.body.scrollHeight) >
                  (t || k.height())
                );
              },
              _setFocus: function () {
                (e.st.focus
                  ? e.content.find(e.st.focus).eq(0)
                  : e.wrap
                ).trigger('focus');
              },
              _onFocusIn: function (n) {
                if (n.target !== e.wrap[0] && !t.contains(e.wrap[0], n.target))
                  return e._setFocus(), !1;
              },
              _parseMarkup: function (n, i, r) {
                var o;
                r.data && (i = t.extend(r.data, i)),
                  S(p, [n, i, r]),
                  t.each(i, function (i, r) {
                    if (void 0 === r || !1 === r) return !0;
                    if ((o = i.split('_')).length > 1) {
                      var s = n.find(g + '-' + o[0]);
                      if (s.length > 0) {
                        var a = o[1];
                        'replaceWith' === a
                          ? s[0] !== r[0] && s.replaceWith(r)
                          : 'img' === a
                          ? s.is('img')
                            ? s.attr('src', r)
                            : s.replaceWith(
                                t('<img>')
                                  .attr('src', r)
                                  .attr('class', s.attr('class'))
                              )
                          : s.attr(o[1], r);
                      }
                    } else e.st.allowHTMLInTemplate ? n.find(g + '-' + i).html(r) : n.find(g + '-' + i).text(r);
                  });
              },
              _getScrollbarSize: function () {
                if (void 0 === e.scrollbarSize) {
                  var t = document.createElement('div');
                  (t.style.cssText =
                    'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'),
                    document.body.appendChild(t),
                    (e.scrollbarSize = t.offsetWidth - t.clientWidth),
                    document.body.removeChild(t);
                }
                return e.scrollbarSize;
              },
            }),
              (t.magnificPopup = {
                instance: null,
                proto: b.prototype,
                modules: [],
                open: function (e, n) {
                  return (
                    E(),
                    ((e = e ? t.extend(!0, {}, e) : {}).isObj = !0),
                    (e.index = n || 0),
                    this.instance.open(e)
                  );
                },
                close: function () {
                  return (
                    t.magnificPopup.instance && t.magnificPopup.instance.close()
                  );
                },
                registerModule: function (e, n) {
                  n.options && (t.magnificPopup.defaults[e] = n.options),
                    t.extend(this.proto, n.proto),
                    this.modules.push(e);
                },
                defaults: {
                  disableOn: 0,
                  key: null,
                  midClick: !1,
                  mainClass: '',
                  preloader: !0,
                  focus: '',
                  closeOnContentClick: !1,
                  closeOnBgClick: !0,
                  closeBtnInside: !0,
                  showCloseBtn: !0,
                  enableEscapeKey: !0,
                  modal: !1,
                  alignTop: !1,
                  removalDelay: 0,
                  prependTo: null,
                  fixedContentPos: 'auto',
                  fixedBgPos: 'auto',
                  overflowY: 'auto',
                  closeMarkup:
                    '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                  tClose: 'Close (Esc)',
                  tLoading: 'Loading...',
                  autoFocusLast: !0,
                  allowHTMLInStatusIndicator: !1,
                  allowHTMLInTemplate: !1,
                },
              }),
              (t.fn.magnificPopup = function (n) {
                E();
                var i = t(this);
                if ('string' == typeof n)
                  if ('open' === n) {
                    var r,
                      o = x ? i.data('magnificPopup') : i[0].magnificPopup,
                      s = parseInt(arguments[1], 10) || 0;
                    o.items
                      ? (r = o.items[s])
                      : ((r = i),
                        o.delegate && (r = r.find(o.delegate)),
                        (r = r.eq(s))),
                      e._openClick({ mfpEl: r }, i, o);
                  } else
                    e.isOpen &&
                      e[n].apply(e, Array.prototype.slice.call(arguments, 1));
                else
                  (n = t.extend(!0, {}, n)),
                    x ? i.data('magnificPopup', n) : (i[0].magnificPopup = n),
                    e.addGroup(i, n);
                return i;
              });
            var A,
              L,
              O,
              D = 'inline',
              P = function () {
                O && (L.after(O.addClass(A)).detach(), (O = null));
              };
            t.magnificPopup.registerModule(D, {
              options: {
                hiddenClass: 'hide',
                markup: '',
                tNotFound: 'Content not found',
              },
              proto: {
                initInline: function () {
                  e.types.push(D),
                    _(l + '.' + D, function () {
                      P();
                    });
                },
                getInline: function (n, i) {
                  if ((P(), n.src)) {
                    var r = e.st.inline,
                      o = t(n.src);
                    if (o.length) {
                      var s = o[0].parentNode;
                      s &&
                        s.tagName &&
                        (L ||
                          ((A = r.hiddenClass), (L = T(A)), (A = 'mfp-' + A)),
                        (O = o.after(L).detach().removeClass(A))),
                        e.updateStatus('ready');
                    } else
                      e.updateStatus('error', r.tNotFound), (o = t('<div>'));
                    return (n.inlineElement = o), o;
                  }
                  return e.updateStatus('ready'), e._parseMarkup(i, {}, n), i;
                },
              },
            });
            var M,
              I = 'ajax',
              q = function () {
                M && t(document.body).removeClass(M);
              },
              H = function () {
                q(), e.req && e.req.abort();
              };
            t.magnificPopup.registerModule(I, {
              options: {
                settings: null,
                cursor: 'mfp-ajax-cur',
                tError: 'The content could not be loaded.',
              },
              proto: {
                initAjax: function () {
                  e.types.push(I),
                    (M = e.st.ajax.cursor),
                    _(l + '.' + I, H),
                    _('BeforeChange.' + I, H);
                },
                getAjax: function (n) {
                  M && t(document.body).addClass(M), e.updateStatus('loading');
                  var i = t.extend(
                    {
                      url: n.src,
                      success: function (i, r, o) {
                        var s = { data: i, xhr: o };
                        S('ParseAjax', s),
                          e.appendContent(t(s.data), I),
                          (n.finished = !0),
                          q(),
                          e._setFocus(),
                          setTimeout(function () {
                            e.wrap.addClass(v);
                          }, 16),
                          e.updateStatus('ready'),
                          S('AjaxContentAdded');
                      },
                      error: function () {
                        q(),
                          (n.finished = n.loadError = !0),
                          e.updateStatus(
                            'error',
                            e.st.ajax.tError.replace('%url%', n.src)
                          );
                      },
                    },
                    e.st.ajax.settings
                  );
                  return (e.req = t.ajax(i)), '';
                },
              },
            });
            var j,
              z = function (t) {
                if (t.data && void 0 !== t.data.title) return t.data.title;
                var n = e.st.image.titleSrc;
                if (n) {
                  if ('function' == typeof n) return n.call(e, t);
                  if (t.el) return t.el.attr(n) || '';
                }
                return '';
              };
            t.magnificPopup.registerModule('image', {
              options: {
                markup:
                  '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                cursor: 'mfp-zoom-out-cur',
                titleSrc: 'title',
                verticalFit: !0,
                tError: 'The image could not be loaded.',
              },
              proto: {
                initImage: function () {
                  var n = e.st.image,
                    i = '.image';
                  e.types.push('image'),
                    _(f + i, function () {
                      'image' === e.currItem.type &&
                        n.cursor &&
                        t(document.body).addClass(n.cursor);
                    }),
                    _(l + i, function () {
                      n.cursor && t(document.body).removeClass(n.cursor),
                        k.off('resize' + g);
                    }),
                    _('Resize' + i, e.resizeImage),
                    e.isLowIE && _('AfterChange', e.resizeImage);
                },
                resizeImage: function () {
                  var t = e.currItem;
                  if (t && t.img && e.st.image.verticalFit) {
                    var n = 0;
                    e.isLowIE &&
                      (n =
                        parseInt(t.img.css('padding-top'), 10) +
                        parseInt(t.img.css('padding-bottom'), 10)),
                      t.img.css('max-height', e.wH - n);
                  }
                },
                _onImageHasSize: function (t) {
                  t.img &&
                    ((t.hasSize = !0),
                    j && clearInterval(j),
                    (t.isCheckingImgSize = !1),
                    S('ImageHasSize', t),
                    t.imgHidden &&
                      (e.content && e.content.removeClass('mfp-loading'),
                      (t.imgHidden = !1)));
                },
                findImageSize: function (t) {
                  var n = 0,
                    i = t.img[0],
                    r = function (o) {
                      j && clearInterval(j),
                        (j = setInterval(function () {
                          i.naturalWidth > 0
                            ? e._onImageHasSize(t)
                            : (n > 200 && clearInterval(j),
                              3 == ++n
                                ? r(10)
                                : 40 === n
                                ? r(50)
                                : 100 === n && r(500));
                        }, o));
                    };
                  r(1);
                },
                getImage: function (n, i) {
                  var r = 0,
                    o = e.st.image,
                    s = function () {
                      n &&
                        (n.img.off('.mfploader'),
                        n === e.currItem &&
                          (e._onImageHasSize(n),
                          e.updateStatus(
                            'error',
                            o.tError.replace('%url%', n.src)
                          )),
                        (n.hasSize = !0),
                        (n.loaded = !0),
                        (n.loadError = !0));
                    },
                    a = function () {
                      n &&
                        (n.img[0].complete
                          ? (n.img.off('.mfploader'),
                            n === e.currItem &&
                              (e._onImageHasSize(n), e.updateStatus('ready')),
                            (n.hasSize = !0),
                            (n.loaded = !0),
                            S('ImageLoadComplete'))
                          : ++r < 200
                          ? setTimeout(a, 100)
                          : s());
                    },
                    l = i.find('.mfp-img');
                  if (l.length) {
                    var c = document.createElement('img');
                    (c.className = 'mfp-img'),
                      n.el &&
                        n.el.find('img').length &&
                        (c.alt = n.el.find('img').attr('alt')),
                      (n.img = t(c)
                        .on('load.mfploader', a)
                        .on('error.mfploader', s)),
                      (c.src = n.src),
                      l.is('img') && (n.img = n.img.clone()),
                      (c = n.img[0]).naturalWidth > 0
                        ? (n.hasSize = !0)
                        : c.width || (n.hasSize = !1);
                  }
                  return (
                    e._parseMarkup(
                      i,
                      { title: z(n), img_replaceWith: n.img },
                      n
                    ),
                    e.resizeImage(),
                    n.hasSize
                      ? (j && clearInterval(j),
                        n.loadError
                          ? (i.addClass('mfp-loading'),
                            e.updateStatus(
                              'error',
                              o.tError.replace('%url%', n.src)
                            ))
                          : (i.removeClass('mfp-loading'),
                            e.updateStatus('ready')),
                        i)
                      : (e.updateStatus('loading'),
                        (n.loading = !0),
                        n.hasSize ||
                          ((n.imgHidden = !0),
                          i.addClass('mfp-loading'),
                          e.findImageSize(n)),
                        i)
                  );
                },
              },
            });
            var N,
              F = function () {
                return (
                  void 0 === N &&
                    (N =
                      void 0 !==
                      document.createElement('p').style.MozTransform),
                  N
                );
              };
            t.magnificPopup.registerModule('zoom', {
              options: {
                enabled: !1,
                easing: 'ease-in-out',
                duration: 300,
                opener: function (t) {
                  return t.is('img') ? t : t.find('img');
                },
              },
              proto: {
                initZoom: function () {
                  var t,
                    n = e.st.zoom,
                    i = '.zoom';
                  if (n.enabled && e.supportsTransition) {
                    var r,
                      o,
                      s = n.duration,
                      a = function (t) {
                        var e = t
                            .clone()
                            .removeAttr('style')
                            .removeAttr('class')
                            .addClass('mfp-animated-image'),
                          i = 'all ' + n.duration / 1e3 + 's ' + n.easing,
                          r = {
                            position: 'fixed',
                            zIndex: 9999,
                            left: 0,
                            top: 0,
                            '-webkit-backface-visibility': 'hidden',
                          },
                          o = 'transition';
                        return (
                          (r['-webkit-' + o] =
                            r['-moz-' + o] =
                            r['-o-' + o] =
                            r[o] =
                              i),
                          e.css(r),
                          e
                        );
                      },
                      u = function () {
                        e.content.css('visibility', 'visible');
                      };
                    _('BuildControls' + i, function () {
                      if (e._allowZoom()) {
                        if (
                          (clearTimeout(r),
                          e.content.css('visibility', 'hidden'),
                          !(t = e._getItemToZoom()))
                        )
                          return void u();
                        (o = a(t)).css(e._getOffset()),
                          e.wrap.append(o),
                          (r = setTimeout(function () {
                            o.css(e._getOffset(!0)),
                              (r = setTimeout(function () {
                                u(),
                                  setTimeout(function () {
                                    o.remove(),
                                      (t = o = null),
                                      S('ZoomAnimationEnded');
                                  }, 16);
                              }, s));
                          }, 16));
                      }
                    }),
                      _(c + i, function () {
                        if (e._allowZoom()) {
                          if ((clearTimeout(r), (e.st.removalDelay = s), !t)) {
                            if (!(t = e._getItemToZoom())) return;
                            o = a(t);
                          }
                          o.css(e._getOffset(!0)),
                            e.wrap.append(o),
                            e.content.css('visibility', 'hidden'),
                            setTimeout(function () {
                              o.css(e._getOffset());
                            }, 16);
                        }
                      }),
                      _(l + i, function () {
                        e._allowZoom() && (u(), o && o.remove(), (t = null));
                      });
                  }
                },
                _allowZoom: function () {
                  return 'image' === e.currItem.type;
                },
                _getItemToZoom: function () {
                  return !!e.currItem.hasSize && e.currItem.img;
                },
                _getOffset: function (n) {
                  var i,
                    r = (i = n
                      ? e.currItem.img
                      : e.st.zoom.opener(e.currItem.el || e.currItem)).offset(),
                    o = parseInt(i.css('padding-top'), 10),
                    s = parseInt(i.css('padding-bottom'), 10);
                  r.top -= t(window).scrollTop() - o;
                  var a = {
                    width: i.width(),
                    height: (x ? i.innerHeight() : i[0].offsetHeight) - s - o,
                  };
                  return (
                    F()
                      ? (a['-moz-transform'] = a.transform =
                          'translate(' + r.left + 'px,' + r.top + 'px)')
                      : ((a.left = r.left), (a.top = r.top)),
                    a
                  );
                },
              },
            });
            var R = 'iframe',
              B = '//about:blank',
              W = function (t) {
                if (e.currTemplate[R]) {
                  var n = e.currTemplate[R].find('iframe');
                  n.length &&
                    (t || (n[0].src = B),
                    e.isIE8 && n.css('display', t ? 'block' : 'none'));
                }
              };
            t.magnificPopup.registerModule(R, {
              options: {
                markup:
                  '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                srcAction: 'iframe_src',
                patterns: {
                  youtube: {
                    index: 'youtube.com',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1',
                  },
                  vimeo: {
                    index: 'vimeo.com/',
                    id: '/',
                    src: '//player.vimeo.com/video/%id%?autoplay=1',
                  },
                  gmaps: { index: '//maps.google.', src: '%id%&output=embed' },
                },
              },
              proto: {
                initIframe: function () {
                  e.types.push(R),
                    _('BeforeChange', function (t, e, n) {
                      e !== n && (e === R ? W() : n === R && W(!0));
                    }),
                    _(l + '.' + R, function () {
                      W();
                    });
                },
                getIframe: function (n, i) {
                  var r = n.src,
                    o = e.st.iframe;
                  t.each(o.patterns, function () {
                    if (r.indexOf(this.index) > -1)
                      return (
                        this.id &&
                          (r =
                            'string' == typeof this.id
                              ? r.substr(
                                  r.lastIndexOf(this.id) + this.id.length,
                                  r.length
                                )
                              : this.id.call(this, r)),
                        (r = this.src.replace('%id%', r)),
                        !1
                      );
                  });
                  var s = {};
                  return (
                    o.srcAction && (s[o.srcAction] = r),
                    e._parseMarkup(i, s, n),
                    e.updateStatus('ready'),
                    i
                  );
                },
              },
            });
            var V = function (t) {
                var n = e.items.length;
                return t > n - 1 ? t - n : t < 0 ? n + t : t;
              },
              U = function (t, e, n) {
                return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, n);
              };
            t.magnificPopup.registerModule('gallery', {
              options: {
                enabled: !1,
                arrowMarkup:
                  '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                preload: [0, 2],
                navigateByImgClick: !0,
                arrows: !0,
                tPrev: 'Previous (Left arrow key)',
                tNext: 'Next (Right arrow key)',
                tCounter: '%curr% of %total%',
                langDir: null,
                loop: !0,
              },
              proto: {
                initGallery: function () {
                  var n = e.st.gallery,
                    r = '.mfp-gallery';
                  if (((e.direction = !0), !n || !n.enabled)) return !1;
                  n.langDir || (n.langDir = document.dir || 'ltr'),
                    (o += ' mfp-gallery'),
                    _(f + r, function () {
                      n.navigateByImgClick &&
                        e.wrap.on('click' + r, '.mfp-img', function () {
                          if (e.items.length > 1) return e.next(), !1;
                        }),
                        i.on('keydown' + r, function (t) {
                          37 === t.keyCode
                            ? 'rtl' === n.langDir
                              ? e.next()
                              : e.prev()
                            : 39 === t.keyCode &&
                              ('rtl' === n.langDir ? e.prev() : e.next());
                        }),
                        e.updateGalleryButtons();
                    }),
                    _('UpdateStatus' + r, function () {
                      e.updateGalleryButtons();
                    }),
                    _('UpdateStatus' + r, function (t, n) {
                      n.text &&
                        (n.text = U(n.text, e.currItem.index, e.items.length));
                    }),
                    _(p + r, function (t, i, r, o) {
                      var s = e.items.length;
                      r.counter = s > 1 ? U(n.tCounter, o.index, s) : '';
                    }),
                    _('BuildControls' + r, function () {
                      if (e.items.length > 1 && n.arrows && !e.arrowLeft) {
                        var i, r, o, s;
                        'rtl' === n.langDir
                          ? ((i = n.tNext),
                            (r = n.tPrev),
                            (o = 'next'),
                            (s = 'prev'))
                          : ((i = n.tPrev),
                            (r = n.tNext),
                            (o = 'prev'),
                            (s = 'next'));
                        var a = n.arrowMarkup,
                          l = (e.arrowLeft = t(
                            a
                              .replace(/%title%/gi, i)
                              .replace(/%action%/gi, o)
                              .replace(/%dir%/gi, 'left')
                          ).addClass(w)),
                          c = (e.arrowRight = t(
                            a
                              .replace(/%title%/gi, r)
                              .replace(/%action%/gi, s)
                              .replace(/%dir%/gi, 'right')
                          ).addClass(w));
                        'rtl' === n.langDir
                          ? ((e.arrowNext = l), (e.arrowPrev = c))
                          : ((e.arrowNext = c), (e.arrowPrev = l)),
                          l.on('click', function () {
                            'rtl' === n.langDir ? e.next() : e.prev();
                          }),
                          c.on('click', function () {
                            'rtl' === n.langDir ? e.prev() : e.next();
                          }),
                          e.container.append(l.add(c));
                      }
                    }),
                    _(h + r, function () {
                      e._preloadTimeout && clearTimeout(e._preloadTimeout),
                        (e._preloadTimeout = setTimeout(function () {
                          e.preloadNearbyImages(), (e._preloadTimeout = null);
                        }, 16));
                    }),
                    _(l + r, function () {
                      i.off(r),
                        e.wrap.off('click' + r),
                        (e.arrowRight = e.arrowLeft = null);
                    });
                },
                next: function () {
                  var t = V(e.index + 1);
                  if (!e.st.gallery.loop && 0 === t) return !1;
                  (e.direction = !0), (e.index = t), e.updateItemHTML();
                },
                prev: function () {
                  var t = e.index - 1;
                  if (!e.st.gallery.loop && t < 0) return !1;
                  (e.direction = !1), (e.index = V(t)), e.updateItemHTML();
                },
                goTo: function (t) {
                  (e.direction = t >= e.index),
                    (e.index = t),
                    e.updateItemHTML();
                },
                preloadNearbyImages: function () {
                  var t,
                    n = e.st.gallery.preload,
                    i = Math.min(n[0], e.items.length),
                    r = Math.min(n[1], e.items.length);
                  for (t = 1; t <= (e.direction ? r : i); t++)
                    e._preloadItem(e.index + t);
                  for (t = 1; t <= (e.direction ? i : r); t++)
                    e._preloadItem(e.index - t);
                },
                _preloadItem: function (n) {
                  if (((n = V(n)), !e.items[n].preloaded)) {
                    var i = e.items[n];
                    i.parsed || (i = e.parseEl(n)),
                      S('LazyLoad', i),
                      'image' === i.type &&
                        (i.img = t('<img class="mfp-img" />')
                          .on('load.mfploader', function () {
                            i.hasSize = !0;
                          })
                          .on('error.mfploader', function () {
                            (i.hasSize = !0),
                              (i.loadError = !0),
                              S('LazyLoadError', i);
                          })
                          .attr('src', i.src)),
                      (i.preloaded = !0);
                  }
                },
                updateGalleryButtons: function () {
                  e.st.gallery.loop ||
                    'object' != typeof e.arrowPrev ||
                    null === e.arrowPrev ||
                    (0 === e.index ? e.arrowPrev.hide() : e.arrowPrev.show(),
                    e.index === e.items.length - 1
                      ? e.arrowNext.hide()
                      : e.arrowNext.show());
                },
              },
            });
            var Y = 'retina';
            t.magnificPopup.registerModule(Y, {
              options: {
                replaceSrc: function (t) {
                  return t.src.replace(/\.\w+$/, function (t) {
                    return '@2x' + t;
                  });
                },
                ratio: 1,
              },
              proto: {
                initRetina: function () {
                  if (window.devicePixelRatio > 1) {
                    var t = e.st.retina,
                      n = t.ratio;
                    (n = isNaN(n) ? n() : n) > 1 &&
                      (_('ImageHasSize.' + Y, function (t, e) {
                        e.img.css({
                          'max-width': e.img[0].naturalWidth / n,
                          width: '100%',
                        });
                      }),
                      _('ElementParse.' + Y, function (e, i) {
                        i.src = t.replaceSrc(i, n);
                      }));
                  }
                },
              },
            }),
              E();
          }),
          void 0 === (o = 'function' == typeof i ? i.apply(e, r) : i) ||
            (t.exports = o);
      },
      599: (t, e, n) => {
        var i, r, o;
        !(function () {
          'use strict';
          (r = [n(692)]),
            (i = function (t) {
              var e = window.Slick || {};
              ((e = (function () {
                var e = 0;
                function n(n, i) {
                  var r,
                    o = this;
                  (o.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: t(n),
                    appendDots: t(n),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow:
                      '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                    nextArrow:
                      '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: '50px',
                    cssEase: 'ease',
                    customPaging: function (e, n) {
                      return t('<button type="button" />').text(n + 1);
                    },
                    dots: !1,
                    dotsClass: 'slick-dots',
                    draggable: !0,
                    easing: 'linear',
                    edgeFriction: 0.35,
                    fade: !1,
                    focusOnSelect: !1,
                    focusOnChange: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: 'ondemand',
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnFocus: !0,
                    pauseOnDotsHover: !1,
                    respondTo: 'window',
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: '',
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3,
                  }),
                    (o.initials = {
                      animating: !1,
                      dragging: !1,
                      autoPlayTimer: null,
                      currentDirection: 0,
                      currentLeft: null,
                      currentSlide: 0,
                      direction: 1,
                      $dots: null,
                      listWidth: null,
                      listHeight: null,
                      loadIndex: 0,
                      $nextArrow: null,
                      $prevArrow: null,
                      scrolling: !1,
                      slideCount: null,
                      slideWidth: null,
                      $slideTrack: null,
                      $slides: null,
                      sliding: !1,
                      slideOffset: 0,
                      swipeLeft: null,
                      swiping: !1,
                      $list: null,
                      touchObject: {},
                      transformsEnabled: !1,
                      unslicked: !1,
                    }),
                    t.extend(o, o.initials),
                    (o.activeBreakpoint = null),
                    (o.animType = null),
                    (o.animProp = null),
                    (o.breakpoints = []),
                    (o.breakpointSettings = []),
                    (o.cssTransitions = !1),
                    (o.focussed = !1),
                    (o.interrupted = !1),
                    (o.hidden = 'hidden'),
                    (o.paused = !0),
                    (o.positionProp = null),
                    (o.respondTo = null),
                    (o.rowCount = 1),
                    (o.shouldClick = !0),
                    (o.$slider = t(n)),
                    (o.$slidesCache = null),
                    (o.transformType = null),
                    (o.transitionType = null),
                    (o.visibilityChange = 'visibilitychange'),
                    (o.windowWidth = 0),
                    (o.windowTimer = null),
                    (r = t(n).data('slick') || {}),
                    (o.options = t.extend({}, o.defaults, i, r)),
                    (o.currentSlide = o.options.initialSlide),
                    (o.originalSettings = o.options),
                    void 0 !== document.mozHidden
                      ? ((o.hidden = 'mozHidden'),
                        (o.visibilityChange = 'mozvisibilitychange'))
                      : void 0 !== document.webkitHidden &&
                        ((o.hidden = 'webkitHidden'),
                        (o.visibilityChange = 'webkitvisibilitychange')),
                    (o.autoPlay = t.proxy(o.autoPlay, o)),
                    (o.autoPlayClear = t.proxy(o.autoPlayClear, o)),
                    (o.autoPlayIterator = t.proxy(o.autoPlayIterator, o)),
                    (o.changeSlide = t.proxy(o.changeSlide, o)),
                    (o.clickHandler = t.proxy(o.clickHandler, o)),
                    (o.selectHandler = t.proxy(o.selectHandler, o)),
                    (o.setPosition = t.proxy(o.setPosition, o)),
                    (o.swipeHandler = t.proxy(o.swipeHandler, o)),
                    (o.dragHandler = t.proxy(o.dragHandler, o)),
                    (o.keyHandler = t.proxy(o.keyHandler, o)),
                    (o.instanceUid = e++),
                    (o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
                    o.registerBreakpoints(),
                    o.init(!0);
                }
                return n;
              })()).prototype.activateADA = function () {
                this.$slideTrack
                  .find('.slick-active')
                  .attr({ 'aria-hidden': 'false' })
                  .find('a, input, button, select')
                  .attr({ tabindex: '0' });
              }),
                (e.prototype.addSlide = e.prototype.slickAdd =
                  function (e, n, i) {
                    var r = this;
                    if ('boolean' == typeof n) (i = n), (n = null);
                    else if (n < 0 || n >= r.slideCount) return !1;
                    r.unload(),
                      'number' == typeof n
                        ? 0 === n && 0 === r.$slides.length
                          ? t(e).appendTo(r.$slideTrack)
                          : i
                          ? t(e).insertBefore(r.$slides.eq(n))
                          : t(e).insertAfter(r.$slides.eq(n))
                        : !0 === i
                        ? t(e).prependTo(r.$slideTrack)
                        : t(e).appendTo(r.$slideTrack),
                      (r.$slides = r.$slideTrack.children(this.options.slide)),
                      r.$slideTrack.children(this.options.slide).detach(),
                      r.$slideTrack.append(r.$slides),
                      r.$slides.each(function (e, n) {
                        t(n).attr('data-slick-index', e);
                      }),
                      (r.$slidesCache = r.$slides),
                      r.reinit();
                  }),
                (e.prototype.animateHeight = function () {
                  var t = this;
                  if (
                    1 === t.options.slidesToShow &&
                    !0 === t.options.adaptiveHeight &&
                    !1 === t.options.vertical
                  ) {
                    var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                    t.$list.animate({ height: e }, t.options.speed);
                  }
                }),
                (e.prototype.animateSlide = function (e, n) {
                  var i = {},
                    r = this;
                  r.animateHeight(),
                    !0 === r.options.rtl &&
                      !1 === r.options.vertical &&
                      (e = -e),
                    !1 === r.transformsEnabled
                      ? !1 === r.options.vertical
                        ? r.$slideTrack.animate(
                            { left: e },
                            r.options.speed,
                            r.options.easing,
                            n
                          )
                        : r.$slideTrack.animate(
                            { top: e },
                            r.options.speed,
                            r.options.easing,
                            n
                          )
                      : !1 === r.cssTransitions
                      ? (!0 === r.options.rtl &&
                          (r.currentLeft = -r.currentLeft),
                        t({ animStart: r.currentLeft }).animate(
                          { animStart: e },
                          {
                            duration: r.options.speed,
                            easing: r.options.easing,
                            step: function (t) {
                              (t = Math.ceil(t)),
                                !1 === r.options.vertical
                                  ? ((i[r.animType] =
                                      'translate(' + t + 'px, 0px)'),
                                    r.$slideTrack.css(i))
                                  : ((i[r.animType] =
                                      'translate(0px,' + t + 'px)'),
                                    r.$slideTrack.css(i));
                            },
                            complete: function () {
                              n && n.call();
                            },
                          }
                        ))
                      : (r.applyTransition(),
                        (e = Math.ceil(e)),
                        !1 === r.options.vertical
                          ? (i[r.animType] =
                              'translate3d(' + e + 'px, 0px, 0px)')
                          : (i[r.animType] =
                              'translate3d(0px,' + e + 'px, 0px)'),
                        r.$slideTrack.css(i),
                        n &&
                          setTimeout(function () {
                            r.disableTransition(), n.call();
                          }, r.options.speed));
                }),
                (e.prototype.getNavTarget = function () {
                  var e = this,
                    n = e.options.asNavFor;
                  return n && null !== n && (n = t(n).not(e.$slider)), n;
                }),
                (e.prototype.asNavFor = function (e) {
                  var n = this.getNavTarget();
                  null !== n &&
                    'object' == typeof n &&
                    n.each(function () {
                      var n = t(this).slick('getSlick');
                      n.unslicked || n.slideHandler(e, !0);
                    });
                }),
                (e.prototype.applyTransition = function (t) {
                  var e = this,
                    n = {};
                  !1 === e.options.fade
                    ? (n[e.transitionType] =
                        e.transformType +
                        ' ' +
                        e.options.speed +
                        'ms ' +
                        e.options.cssEase)
                    : (n[e.transitionType] =
                        'opacity ' +
                        e.options.speed +
                        'ms ' +
                        e.options.cssEase),
                    !1 === e.options.fade
                      ? e.$slideTrack.css(n)
                      : e.$slides.eq(t).css(n);
                }),
                (e.prototype.autoPlay = function () {
                  var t = this;
                  t.autoPlayClear(),
                    t.slideCount > t.options.slidesToShow &&
                      (t.autoPlayTimer = setInterval(
                        t.autoPlayIterator,
                        t.options.autoplaySpeed
                      ));
                }),
                (e.prototype.autoPlayClear = function () {
                  var t = this;
                  t.autoPlayTimer && clearInterval(t.autoPlayTimer);
                }),
                (e.prototype.autoPlayIterator = function () {
                  var t = this,
                    e = t.currentSlide + t.options.slidesToScroll;
                  t.paused ||
                    t.interrupted ||
                    t.focussed ||
                    (!1 === t.options.infinite &&
                      (1 === t.direction &&
                      t.currentSlide + 1 === t.slideCount - 1
                        ? (t.direction = 0)
                        : 0 === t.direction &&
                          ((e = t.currentSlide - t.options.slidesToScroll),
                          t.currentSlide - 1 == 0 && (t.direction = 1))),
                    t.slideHandler(e));
                }),
                (e.prototype.buildArrows = function () {
                  var e = this;
                  !0 === e.options.arrows &&
                    ((e.$prevArrow = t(e.options.prevArrow).addClass(
                      'slick-arrow'
                    )),
                    (e.$nextArrow = t(e.options.nextArrow).addClass(
                      'slick-arrow'
                    )),
                    e.slideCount > e.options.slidesToShow
                      ? (e.$prevArrow
                          .removeClass('slick-hidden')
                          .removeAttr('aria-hidden tabindex'),
                        e.$nextArrow
                          .removeClass('slick-hidden')
                          .removeAttr('aria-hidden tabindex'),
                        e.htmlExpr.test(e.options.prevArrow) &&
                          e.$prevArrow.prependTo(e.options.appendArrows),
                        e.htmlExpr.test(e.options.nextArrow) &&
                          e.$nextArrow.appendTo(e.options.appendArrows),
                        !0 !== e.options.infinite &&
                          e.$prevArrow
                            .addClass('slick-disabled')
                            .attr('aria-disabled', 'true'))
                      : e.$prevArrow
                          .add(e.$nextArrow)
                          .addClass('slick-hidden')
                          .attr({ 'aria-disabled': 'true', tabindex: '-1' }));
                }),
                (e.prototype.buildDots = function () {
                  var e,
                    n,
                    i = this;
                  if (
                    !0 === i.options.dots &&
                    i.slideCount > i.options.slidesToShow
                  ) {
                    for (
                      i.$slider.addClass('slick-dotted'),
                        n = t('<ul />').addClass(i.options.dotsClass),
                        e = 0;
                      e <= i.getDotCount();
                      e += 1
                    )
                      n.append(
                        t('<li />').append(
                          i.options.customPaging.call(this, i, e)
                        )
                      );
                    (i.$dots = n.appendTo(i.options.appendDots)),
                      i.$dots.find('li').first().addClass('slick-active');
                  }
                }),
                (e.prototype.buildOut = function () {
                  var e = this;
                  (e.$slides = e.$slider
                    .children(e.options.slide + ':not(.slick-cloned)')
                    .addClass('slick-slide')),
                    (e.slideCount = e.$slides.length),
                    e.$slides.each(function (e, n) {
                      t(n)
                        .attr('data-slick-index', e)
                        .data('originalStyling', t(n).attr('style') || '');
                    }),
                    e.$slider.addClass('slick-slider'),
                    (e.$slideTrack =
                      0 === e.slideCount
                        ? t('<div class="slick-track"/>').appendTo(e.$slider)
                        : e.$slides
                            .wrapAll('<div class="slick-track"/>')
                            .parent()),
                    (e.$list = e.$slideTrack
                      .wrap('<div class="slick-list"/>')
                      .parent()),
                    e.$slideTrack.css('opacity', 0),
                    (!0 !== e.options.centerMode &&
                      !0 !== e.options.swipeToSlide) ||
                      (e.options.slidesToScroll = 1),
                    t('img[data-lazy]', e.$slider)
                      .not('[src]')
                      .addClass('slick-loading'),
                    e.setupInfinite(),
                    e.buildArrows(),
                    e.buildDots(),
                    e.updateDots(),
                    e.setSlideClasses(
                      'number' == typeof e.currentSlide ? e.currentSlide : 0
                    ),
                    !0 === e.options.draggable && e.$list.addClass('draggable');
                }),
                (e.prototype.buildRows = function () {
                  var t,
                    e,
                    n,
                    i,
                    r,
                    o,
                    s,
                    a = this;
                  if (
                    ((i = document.createDocumentFragment()),
                    (o = a.$slider.children()),
                    a.options.rows > 0)
                  ) {
                    for (
                      s = a.options.slidesPerRow * a.options.rows,
                        r = Math.ceil(o.length / s),
                        t = 0;
                      t < r;
                      t++
                    ) {
                      var l = document.createElement('div');
                      for (e = 0; e < a.options.rows; e++) {
                        var c = document.createElement('div');
                        for (n = 0; n < a.options.slidesPerRow; n++) {
                          var u = t * s + (e * a.options.slidesPerRow + n);
                          o.get(u) && c.appendChild(o.get(u));
                        }
                        l.appendChild(c);
                      }
                      i.appendChild(l);
                    }
                    a.$slider.empty().append(i),
                      a.$slider
                        .children()
                        .children()
                        .children()
                        .css({
                          width: 100 / a.options.slidesPerRow + '%',
                          display: 'inline-block',
                        });
                  }
                }),
                (e.prototype.checkResponsive = function (e, n) {
                  var i,
                    r,
                    o,
                    s = this,
                    a = !1,
                    l = s.$slider.width(),
                    c = window.innerWidth || t(window).width();
                  if (
                    ('window' === s.respondTo
                      ? (o = c)
                      : 'slider' === s.respondTo
                      ? (o = l)
                      : 'min' === s.respondTo && (o = Math.min(c, l)),
                    s.options.responsive &&
                      s.options.responsive.length &&
                      null !== s.options.responsive)
                  ) {
                    for (i in ((r = null), s.breakpoints))
                      s.breakpoints.hasOwnProperty(i) &&
                        (!1 === s.originalSettings.mobileFirst
                          ? o < s.breakpoints[i] && (r = s.breakpoints[i])
                          : o > s.breakpoints[i] && (r = s.breakpoints[i]));
                    null !== r
                      ? null !== s.activeBreakpoint
                        ? (r !== s.activeBreakpoint || n) &&
                          ((s.activeBreakpoint = r),
                          'unslick' === s.breakpointSettings[r]
                            ? s.unslick(r)
                            : ((s.options = t.extend(
                                {},
                                s.originalSettings,
                                s.breakpointSettings[r]
                              )),
                              !0 === e &&
                                (s.currentSlide = s.options.initialSlide),
                              s.refresh(e)),
                          (a = r))
                        : ((s.activeBreakpoint = r),
                          'unslick' === s.breakpointSettings[r]
                            ? s.unslick(r)
                            : ((s.options = t.extend(
                                {},
                                s.originalSettings,
                                s.breakpointSettings[r]
                              )),
                              !0 === e &&
                                (s.currentSlide = s.options.initialSlide),
                              s.refresh(e)),
                          (a = r))
                      : null !== s.activeBreakpoint &&
                        ((s.activeBreakpoint = null),
                        (s.options = s.originalSettings),
                        !0 === e && (s.currentSlide = s.options.initialSlide),
                        s.refresh(e),
                        (a = r)),
                      e || !1 === a || s.$slider.trigger('breakpoint', [s, a]);
                  }
                }),
                (e.prototype.changeSlide = function (e, n) {
                  var i,
                    r,
                    o = this,
                    s = t(e.currentTarget);
                  switch (
                    (s.is('a') && e.preventDefault(),
                    s.is('li') || (s = s.closest('li')),
                    (i =
                      o.slideCount % o.options.slidesToScroll != 0
                        ? 0
                        : (o.slideCount - o.currentSlide) %
                          o.options.slidesToScroll),
                    e.data.message)
                  ) {
                    case 'previous':
                      (r =
                        0 === i
                          ? o.options.slidesToScroll
                          : o.options.slidesToShow - i),
                        o.slideCount > o.options.slidesToShow &&
                          o.slideHandler(o.currentSlide - r, !1, n);
                      break;
                    case 'next':
                      (r = 0 === i ? o.options.slidesToScroll : i),
                        o.slideCount > o.options.slidesToShow &&
                          o.slideHandler(o.currentSlide + r, !1, n);
                      break;
                    case 'index':
                      var a =
                        0 === e.data.index
                          ? 0
                          : e.data.index ||
                            s.index() * o.options.slidesToScroll;
                      o.slideHandler(o.checkNavigable(a), !1, n),
                        s.children().trigger('focus');
                      break;
                    default:
                      return;
                  }
                }),
                (e.prototype.checkNavigable = function (t) {
                  var e, n;
                  if (
                    ((n = 0),
                    t > (e = this.getNavigableIndexes())[e.length - 1])
                  )
                    t = e[e.length - 1];
                  else
                    for (var i in e) {
                      if (t < e[i]) {
                        t = n;
                        break;
                      }
                      n = e[i];
                    }
                  return t;
                }),
                (e.prototype.cleanUpEvents = function () {
                  var e = this;
                  e.options.dots &&
                    null !== e.$dots &&
                    (t('li', e.$dots)
                      .off('click.slick', e.changeSlide)
                      .off('mouseenter.slick', t.proxy(e.interrupt, e, !0))
                      .off('mouseleave.slick', t.proxy(e.interrupt, e, !1)),
                    !0 === e.options.accessibility &&
                      e.$dots.off('keydown.slick', e.keyHandler)),
                    e.$slider.off('focus.slick blur.slick'),
                    !0 === e.options.arrows &&
                      e.slideCount > e.options.slidesToShow &&
                      (e.$prevArrow &&
                        e.$prevArrow.off('click.slick', e.changeSlide),
                      e.$nextArrow &&
                        e.$nextArrow.off('click.slick', e.changeSlide),
                      !0 === e.options.accessibility &&
                        (e.$prevArrow &&
                          e.$prevArrow.off('keydown.slick', e.keyHandler),
                        e.$nextArrow &&
                          e.$nextArrow.off('keydown.slick', e.keyHandler))),
                    e.$list.off(
                      'touchstart.slick mousedown.slick',
                      e.swipeHandler
                    ),
                    e.$list.off(
                      'touchmove.slick mousemove.slick',
                      e.swipeHandler
                    ),
                    e.$list.off('touchend.slick mouseup.slick', e.swipeHandler),
                    e.$list.off(
                      'touchcancel.slick mouseleave.slick',
                      e.swipeHandler
                    ),
                    e.$list.off('click.slick', e.clickHandler),
                    t(document).off(e.visibilityChange, e.visibility),
                    e.cleanUpSlideEvents(),
                    !0 === e.options.accessibility &&
                      e.$list.off('keydown.slick', e.keyHandler),
                    !0 === e.options.focusOnSelect &&
                      t(e.$slideTrack)
                        .children()
                        .off('click.slick', e.selectHandler),
                    t(window).off(
                      'orientationchange.slick.slick-' + e.instanceUid,
                      e.orientationChange
                    ),
                    t(window).off(
                      'resize.slick.slick-' + e.instanceUid,
                      e.resize
                    ),
                    t('[draggable!=true]', e.$slideTrack).off(
                      'dragstart',
                      e.preventDefault
                    ),
                    t(window).off(
                      'load.slick.slick-' + e.instanceUid,
                      e.setPosition
                    );
                }),
                (e.prototype.cleanUpSlideEvents = function () {
                  var e = this;
                  e.$list.off('mouseenter.slick', t.proxy(e.interrupt, e, !0)),
                    e.$list.off(
                      'mouseleave.slick',
                      t.proxy(e.interrupt, e, !1)
                    );
                }),
                (e.prototype.cleanUpRows = function () {
                  var t,
                    e = this;
                  e.options.rows > 0 &&
                    ((t = e.$slides.children().children()).removeAttr('style'),
                    e.$slider.empty().append(t));
                }),
                (e.prototype.clickHandler = function (t) {
                  !1 === this.shouldClick &&
                    (t.stopImmediatePropagation(),
                    t.stopPropagation(),
                    t.preventDefault());
                }),
                (e.prototype.destroy = function (e) {
                  var n = this;
                  n.autoPlayClear(),
                    (n.touchObject = {}),
                    n.cleanUpEvents(),
                    t('.slick-cloned', n.$slider).detach(),
                    n.$dots && n.$dots.remove(),
                    n.$prevArrow &&
                      n.$prevArrow.length &&
                      (n.$prevArrow
                        .removeClass('slick-disabled slick-arrow slick-hidden')
                        .removeAttr('aria-hidden aria-disabled tabindex')
                        .css('display', ''),
                      n.htmlExpr.test(n.options.prevArrow) &&
                        n.$prevArrow.remove()),
                    n.$nextArrow &&
                      n.$nextArrow.length &&
                      (n.$nextArrow
                        .removeClass('slick-disabled slick-arrow slick-hidden')
                        .removeAttr('aria-hidden aria-disabled tabindex')
                        .css('display', ''),
                      n.htmlExpr.test(n.options.nextArrow) &&
                        n.$nextArrow.remove()),
                    n.$slides &&
                      (n.$slides
                        .removeClass(
                          'slick-slide slick-active slick-center slick-visible slick-current'
                        )
                        .removeAttr('aria-hidden')
                        .removeAttr('data-slick-index')
                        .each(function () {
                          t(this).attr(
                            'style',
                            t(this).data('originalStyling')
                          );
                        }),
                      n.$slideTrack.children(this.options.slide).detach(),
                      n.$slideTrack.detach(),
                      n.$list.detach(),
                      n.$slider.append(n.$slides)),
                    n.cleanUpRows(),
                    n.$slider.removeClass('slick-slider'),
                    n.$slider.removeClass('slick-initialized'),
                    n.$slider.removeClass('slick-dotted'),
                    (n.unslicked = !0),
                    e || n.$slider.trigger('destroy', [n]);
                }),
                (e.prototype.disableTransition = function (t) {
                  var e = this,
                    n = {};
                  (n[e.transitionType] = ''),
                    !1 === e.options.fade
                      ? e.$slideTrack.css(n)
                      : e.$slides.eq(t).css(n);
                }),
                (e.prototype.fadeSlide = function (t, e) {
                  var n = this;
                  !1 === n.cssTransitions
                    ? (n.$slides.eq(t).css({ zIndex: n.options.zIndex }),
                      n.$slides
                        .eq(t)
                        .animate(
                          { opacity: 1 },
                          n.options.speed,
                          n.options.easing,
                          e
                        ))
                    : (n.applyTransition(t),
                      n.$slides
                        .eq(t)
                        .css({ opacity: 1, zIndex: n.options.zIndex }),
                      e &&
                        setTimeout(function () {
                          n.disableTransition(t), e.call();
                        }, n.options.speed));
                }),
                (e.prototype.fadeSlideOut = function (t) {
                  var e = this;
                  !1 === e.cssTransitions
                    ? e.$slides
                        .eq(t)
                        .animate(
                          { opacity: 0, zIndex: e.options.zIndex - 2 },
                          e.options.speed,
                          e.options.easing
                        )
                    : (e.applyTransition(t),
                      e.$slides
                        .eq(t)
                        .css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
                }),
                (e.prototype.filterSlides = e.prototype.slickFilter =
                  function (t) {
                    var e = this;
                    null !== t &&
                      ((e.$slidesCache = e.$slides),
                      e.unload(),
                      e.$slideTrack.children(this.options.slide).detach(),
                      e.$slidesCache.filter(t).appendTo(e.$slideTrack),
                      e.reinit());
                  }),
                (e.prototype.focusHandler = function () {
                  var e = this;
                  e.$slider
                    .off('focus.slick blur.slick')
                    .on('focus.slick blur.slick', '*', function (n) {
                      n.stopImmediatePropagation();
                      var i = t(this);
                      setTimeout(function () {
                        e.options.pauseOnFocus &&
                          ((e.focussed = i.is(':focus')), e.autoPlay());
                      }, 0);
                    });
                }),
                (e.prototype.getCurrent = e.prototype.slickCurrentSlide =
                  function () {
                    return this.currentSlide;
                  }),
                (e.prototype.getDotCount = function () {
                  var t = this,
                    e = 0,
                    n = 0,
                    i = 0;
                  if (!0 === t.options.infinite)
                    if (t.slideCount <= t.options.slidesToShow) ++i;
                    else
                      for (; e < t.slideCount; )
                        ++i,
                          (e = n + t.options.slidesToScroll),
                          (n +=
                            t.options.slidesToScroll <= t.options.slidesToShow
                              ? t.options.slidesToScroll
                              : t.options.slidesToShow);
                  else if (!0 === t.options.centerMode) i = t.slideCount;
                  else if (t.options.asNavFor)
                    for (; e < t.slideCount; )
                      ++i,
                        (e = n + t.options.slidesToScroll),
                        (n +=
                          t.options.slidesToScroll <= t.options.slidesToShow
                            ? t.options.slidesToScroll
                            : t.options.slidesToShow);
                  else
                    i =
                      1 +
                      Math.ceil(
                        (t.slideCount - t.options.slidesToShow) /
                          t.options.slidesToScroll
                      );
                  return i - 1;
                }),
                (e.prototype.getLeft = function (t) {
                  var e,
                    n,
                    i,
                    r,
                    o = this,
                    s = 0;
                  return (
                    (o.slideOffset = 0),
                    (n = o.$slides.first().outerHeight(!0)),
                    !0 === o.options.infinite
                      ? (o.slideCount > o.options.slidesToShow &&
                          ((o.slideOffset =
                            o.slideWidth * o.options.slidesToShow * -1),
                          (r = -1),
                          !0 === o.options.vertical &&
                            !0 === o.options.centerMode &&
                            (2 === o.options.slidesToShow
                              ? (r = -1.5)
                              : 1 === o.options.slidesToShow && (r = -2)),
                          (s = n * o.options.slidesToShow * r)),
                        o.slideCount % o.options.slidesToScroll != 0 &&
                          t + o.options.slidesToScroll > o.slideCount &&
                          o.slideCount > o.options.slidesToShow &&
                          (t > o.slideCount
                            ? ((o.slideOffset =
                                (o.options.slidesToShow - (t - o.slideCount)) *
                                o.slideWidth *
                                -1),
                              (s =
                                (o.options.slidesToShow - (t - o.slideCount)) *
                                n *
                                -1))
                            : ((o.slideOffset =
                                (o.slideCount % o.options.slidesToScroll) *
                                o.slideWidth *
                                -1),
                              (s =
                                (o.slideCount % o.options.slidesToScroll) *
                                n *
                                -1))))
                      : t + o.options.slidesToShow > o.slideCount &&
                        ((o.slideOffset =
                          (t + o.options.slidesToShow - o.slideCount) *
                          o.slideWidth),
                        (s = (t + o.options.slidesToShow - o.slideCount) * n)),
                    o.slideCount <= o.options.slidesToShow &&
                      ((o.slideOffset = 0), (s = 0)),
                    !0 === o.options.centerMode &&
                    o.slideCount <= o.options.slidesToShow
                      ? (o.slideOffset =
                          (o.slideWidth * Math.floor(o.options.slidesToShow)) /
                            2 -
                          (o.slideWidth * o.slideCount) / 2)
                      : !0 === o.options.centerMode && !0 === o.options.infinite
                      ? (o.slideOffset +=
                          o.slideWidth *
                            Math.floor(o.options.slidesToShow / 2) -
                          o.slideWidth)
                      : !0 === o.options.centerMode &&
                        ((o.slideOffset = 0),
                        (o.slideOffset +=
                          o.slideWidth *
                          Math.floor(o.options.slidesToShow / 2))),
                    (e =
                      !1 === o.options.vertical
                        ? t * o.slideWidth * -1 + o.slideOffset
                        : t * n * -1 + s),
                    !0 === o.options.variableWidth &&
                      ((i =
                        o.slideCount <= o.options.slidesToShow ||
                        !1 === o.options.infinite
                          ? o.$slideTrack.children('.slick-slide').eq(t)
                          : o.$slideTrack
                              .children('.slick-slide')
                              .eq(t + o.options.slidesToShow)),
                      (e =
                        !0 === o.options.rtl
                          ? i[0]
                            ? -1 *
                              (o.$slideTrack.width() -
                                i[0].offsetLeft -
                                i.width())
                            : 0
                          : i[0]
                          ? -1 * i[0].offsetLeft
                          : 0),
                      !0 === o.options.centerMode &&
                        ((i =
                          o.slideCount <= o.options.slidesToShow ||
                          !1 === o.options.infinite
                            ? o.$slideTrack.children('.slick-slide').eq(t)
                            : o.$slideTrack
                                .children('.slick-slide')
                                .eq(t + o.options.slidesToShow + 1)),
                        (e =
                          !0 === o.options.rtl
                            ? i[0]
                              ? -1 *
                                (o.$slideTrack.width() -
                                  i[0].offsetLeft -
                                  i.width())
                              : 0
                            : i[0]
                            ? -1 * i[0].offsetLeft
                            : 0),
                        (e += (o.$list.width() - i.outerWidth()) / 2))),
                    e
                  );
                }),
                (e.prototype.getOption = e.prototype.slickGetOption =
                  function (t) {
                    return this.options[t];
                  }),
                (e.prototype.getNavigableIndexes = function () {
                  var t,
                    e = this,
                    n = 0,
                    i = 0,
                    r = [];
                  for (
                    !1 === e.options.infinite
                      ? (t = e.slideCount)
                      : ((n = -1 * e.options.slidesToScroll),
                        (i = -1 * e.options.slidesToScroll),
                        (t = 2 * e.slideCount));
                    n < t;

                  )
                    r.push(n),
                      (n = i + e.options.slidesToScroll),
                      (i +=
                        e.options.slidesToScroll <= e.options.slidesToShow
                          ? e.options.slidesToScroll
                          : e.options.slidesToShow);
                  return r;
                }),
                (e.prototype.getSlick = function () {
                  return this;
                }),
                (e.prototype.getSlideCount = function () {
                  var e,
                    n,
                    i = this;
                  return (
                    (n =
                      !0 === i.options.centerMode
                        ? i.slideWidth * Math.floor(i.options.slidesToShow / 2)
                        : 0),
                    !0 === i.options.swipeToSlide
                      ? (i.$slideTrack
                          .find('.slick-slide')
                          .each(function (r, o) {
                            if (
                              o.offsetLeft - n + t(o).outerWidth() / 2 >
                              -1 * i.swipeLeft
                            )
                              return (e = o), !1;
                          }),
                        Math.abs(
                          t(e).attr('data-slick-index') - i.currentSlide
                        ) || 1)
                      : i.options.slidesToScroll
                  );
                }),
                (e.prototype.goTo = e.prototype.slickGoTo =
                  function (t, e) {
                    this.changeSlide(
                      { data: { message: 'index', index: parseInt(t) } },
                      e
                    );
                  }),
                (e.prototype.init = function (e) {
                  var n = this;
                  t(n.$slider).hasClass('slick-initialized') ||
                    (t(n.$slider).addClass('slick-initialized'),
                    n.buildRows(),
                    n.buildOut(),
                    n.setProps(),
                    n.startLoad(),
                    n.loadSlider(),
                    n.initializeEvents(),
                    n.updateArrows(),
                    n.updateDots(),
                    n.checkResponsive(!0),
                    n.focusHandler()),
                    e && n.$slider.trigger('init', [n]),
                    !0 === n.options.accessibility && n.initADA(),
                    n.options.autoplay && ((n.paused = !1), n.autoPlay());
                }),
                (e.prototype.initADA = function () {
                  var e = this,
                    n = Math.ceil(e.slideCount / e.options.slidesToShow),
                    i = e.getNavigableIndexes().filter(function (t) {
                      return t >= 0 && t < e.slideCount;
                    });
                  e.$slides
                    .add(e.$slideTrack.find('.slick-cloned'))
                    .attr({ 'aria-hidden': 'true', tabindex: '-1' })
                    .find('a, input, button, select')
                    .attr({ tabindex: '-1' }),
                    null !== e.$dots &&
                      (e.$slides
                        .not(e.$slideTrack.find('.slick-cloned'))
                        .each(function (n) {
                          var r = i.indexOf(n);
                          if (
                            (t(this).attr({
                              role: 'tabpanel',
                              id: 'slick-slide' + e.instanceUid + n,
                              tabindex: -1,
                            }),
                            -1 !== r)
                          ) {
                            var o = 'slick-slide-control' + e.instanceUid + r;
                            t('#' + o).length &&
                              t(this).attr({ 'aria-describedby': o });
                          }
                        }),
                      e.$dots
                        .attr('role', 'tablist')
                        .find('li')
                        .each(function (r) {
                          var o = i[r];
                          t(this).attr({ role: 'presentation' }),
                            t(this)
                              .find('button')
                              .first()
                              .attr({
                                role: 'tab',
                                id: 'slick-slide-control' + e.instanceUid + r,
                                'aria-controls':
                                  'slick-slide' + e.instanceUid + o,
                                'aria-label': r + 1 + ' of ' + n,
                                'aria-selected': null,
                                tabindex: '-1',
                              });
                        })
                        .eq(e.currentSlide)
                        .find('button')
                        .attr({ 'aria-selected': 'true', tabindex: '0' })
                        .end());
                  for (
                    var r = e.currentSlide, o = r + e.options.slidesToShow;
                    r < o;
                    r++
                  )
                    e.options.focusOnChange
                      ? e.$slides.eq(r).attr({ tabindex: '0' })
                      : e.$slides.eq(r).removeAttr('tabindex');
                  e.activateADA();
                }),
                (e.prototype.initArrowEvents = function () {
                  var t = this;
                  !0 === t.options.arrows &&
                    t.slideCount > t.options.slidesToShow &&
                    (t.$prevArrow
                      .off('click.slick')
                      .on(
                        'click.slick',
                        { message: 'previous' },
                        t.changeSlide
                      ),
                    t.$nextArrow
                      .off('click.slick')
                      .on('click.slick', { message: 'next' }, t.changeSlide),
                    !0 === t.options.accessibility &&
                      (t.$prevArrow.on('keydown.slick', t.keyHandler),
                      t.$nextArrow.on('keydown.slick', t.keyHandler)));
                }),
                (e.prototype.initDotEvents = function () {
                  var e = this;
                  !0 === e.options.dots &&
                    e.slideCount > e.options.slidesToShow &&
                    (t('li', e.$dots).on(
                      'click.slick',
                      { message: 'index' },
                      e.changeSlide
                    ),
                    !0 === e.options.accessibility &&
                      e.$dots.on('keydown.slick', e.keyHandler)),
                    !0 === e.options.dots &&
                      !0 === e.options.pauseOnDotsHover &&
                      e.slideCount > e.options.slidesToShow &&
                      t('li', e.$dots)
                        .on('mouseenter.slick', t.proxy(e.interrupt, e, !0))
                        .on('mouseleave.slick', t.proxy(e.interrupt, e, !1));
                }),
                (e.prototype.initSlideEvents = function () {
                  var e = this;
                  e.options.pauseOnHover &&
                    (e.$list.on(
                      'mouseenter.slick',
                      t.proxy(e.interrupt, e, !0)
                    ),
                    e.$list.on(
                      'mouseleave.slick',
                      t.proxy(e.interrupt, e, !1)
                    ));
                }),
                (e.prototype.initializeEvents = function () {
                  var e = this;
                  e.initArrowEvents(),
                    e.initDotEvents(),
                    e.initSlideEvents(),
                    e.$list.on(
                      'touchstart.slick mousedown.slick',
                      { action: 'start' },
                      e.swipeHandler
                    ),
                    e.$list.on(
                      'touchmove.slick mousemove.slick',
                      { action: 'move' },
                      e.swipeHandler
                    ),
                    e.$list.on(
                      'touchend.slick mouseup.slick',
                      { action: 'end' },
                      e.swipeHandler
                    ),
                    e.$list.on(
                      'touchcancel.slick mouseleave.slick',
                      { action: 'end' },
                      e.swipeHandler
                    ),
                    e.$list.on('click.slick', e.clickHandler),
                    t(document).on(
                      e.visibilityChange,
                      t.proxy(e.visibility, e)
                    ),
                    !0 === e.options.accessibility &&
                      e.$list.on('keydown.slick', e.keyHandler),
                    !0 === e.options.focusOnSelect &&
                      t(e.$slideTrack)
                        .children()
                        .on('click.slick', e.selectHandler),
                    t(window).on(
                      'orientationchange.slick.slick-' + e.instanceUid,
                      t.proxy(e.orientationChange, e)
                    ),
                    t(window).on(
                      'resize.slick.slick-' + e.instanceUid,
                      t.proxy(e.resize, e)
                    ),
                    t('[draggable!=true]', e.$slideTrack).on(
                      'dragstart',
                      e.preventDefault
                    ),
                    t(window).on(
                      'load.slick.slick-' + e.instanceUid,
                      e.setPosition
                    ),
                    t(e.setPosition);
                }),
                (e.prototype.initUI = function () {
                  var t = this;
                  !0 === t.options.arrows &&
                    t.slideCount > t.options.slidesToShow &&
                    (t.$prevArrow.show(), t.$nextArrow.show()),
                    !0 === t.options.dots &&
                      t.slideCount > t.options.slidesToShow &&
                      t.$dots.show();
                }),
                (e.prototype.keyHandler = function (t) {
                  var e = this;
                  t.target.tagName.match('TEXTAREA|INPUT|SELECT') ||
                    (37 === t.keyCode && !0 === e.options.accessibility
                      ? e.changeSlide({
                          data: {
                            message: !0 === e.options.rtl ? 'next' : 'previous',
                          },
                        })
                      : 39 === t.keyCode &&
                        !0 === e.options.accessibility &&
                        e.changeSlide({
                          data: {
                            message: !0 === e.options.rtl ? 'previous' : 'next',
                          },
                        }));
                }),
                (e.prototype.lazyLoad = function () {
                  var e,
                    n,
                    i,
                    r = this;
                  function o(e) {
                    t('img[data-lazy]', e).each(function () {
                      var e = t(this),
                        n = t(this).attr('data-lazy'),
                        i = t(this).attr('data-srcset'),
                        o =
                          t(this).attr('data-sizes') ||
                          r.$slider.attr('data-sizes'),
                        s = document.createElement('img');
                      (s.onload = function () {
                        e.animate({ opacity: 0 }, 100, function () {
                          i && (e.attr('srcset', i), o && e.attr('sizes', o)),
                            e
                              .attr('src', n)
                              .animate({ opacity: 1 }, 200, function () {
                                e.removeAttr(
                                  'data-lazy data-srcset data-sizes'
                                ).removeClass('slick-loading');
                              }),
                            r.$slider.trigger('lazyLoaded', [r, e, n]);
                        });
                      }),
                        (s.onerror = function () {
                          e
                            .removeAttr('data-lazy')
                            .removeClass('slick-loading')
                            .addClass('slick-lazyload-error'),
                            r.$slider.trigger('lazyLoadError', [r, e, n]);
                        }),
                        (s.src = n);
                    });
                  }
                  if (
                    (!0 === r.options.centerMode
                      ? !0 === r.options.infinite
                        ? (i =
                            (n =
                              r.currentSlide +
                              (r.options.slidesToShow / 2 + 1)) +
                            r.options.slidesToShow +
                            2)
                        : ((n = Math.max(
                            0,
                            r.currentSlide - (r.options.slidesToShow / 2 + 1)
                          )),
                          (i =
                            r.options.slidesToShow / 2 +
                            1 +
                            2 +
                            r.currentSlide))
                      : ((n = r.options.infinite
                          ? r.options.slidesToShow + r.currentSlide
                          : r.currentSlide),
                        (i = Math.ceil(n + r.options.slidesToShow)),
                        !0 === r.options.fade &&
                          (n > 0 && n--, i <= r.slideCount && i++)),
                    (e = r.$slider.find('.slick-slide').slice(n, i)),
                    'anticipated' === r.options.lazyLoad)
                  )
                    for (
                      var s = n - 1,
                        a = i,
                        l = r.$slider.find('.slick-slide'),
                        c = 0;
                      c < r.options.slidesToScroll;
                      c++
                    )
                      s < 0 && (s = r.slideCount - 1),
                        (e = (e = e.add(l.eq(s))).add(l.eq(a))),
                        s--,
                        a++;
                  o(e),
                    r.slideCount <= r.options.slidesToShow
                      ? o(r.$slider.find('.slick-slide'))
                      : r.currentSlide >= r.slideCount - r.options.slidesToShow
                      ? o(
                          r.$slider
                            .find('.slick-cloned')
                            .slice(0, r.options.slidesToShow)
                        )
                      : 0 === r.currentSlide &&
                        o(
                          r.$slider
                            .find('.slick-cloned')
                            .slice(-1 * r.options.slidesToShow)
                        );
                }),
                (e.prototype.loadSlider = function () {
                  var t = this;
                  t.setPosition(),
                    t.$slideTrack.css({ opacity: 1 }),
                    t.$slider.removeClass('slick-loading'),
                    t.initUI(),
                    'progressive' === t.options.lazyLoad &&
                      t.progressiveLazyLoad();
                }),
                (e.prototype.next = e.prototype.slickNext =
                  function () {
                    this.changeSlide({ data: { message: 'next' } });
                  }),
                (e.prototype.orientationChange = function () {
                  var t = this;
                  t.checkResponsive(), t.setPosition();
                }),
                (e.prototype.pause = e.prototype.slickPause =
                  function () {
                    var t = this;
                    t.autoPlayClear(), (t.paused = !0);
                  }),
                (e.prototype.play = e.prototype.slickPlay =
                  function () {
                    var t = this;
                    t.autoPlay(),
                      (t.options.autoplay = !0),
                      (t.paused = !1),
                      (t.focussed = !1),
                      (t.interrupted = !1);
                  }),
                (e.prototype.postSlide = function (e) {
                  var n = this;
                  n.unslicked ||
                    (n.$slider.trigger('afterChange', [n, e]),
                    (n.animating = !1),
                    n.slideCount > n.options.slidesToShow && n.setPosition(),
                    (n.swipeLeft = null),
                    n.options.autoplay && n.autoPlay(),
                    !0 === n.options.accessibility &&
                      (n.initADA(),
                      n.options.focusOnChange &&
                        t(n.$slides.get(n.currentSlide))
                          .attr('tabindex', 0)
                          .focus()));
                }),
                (e.prototype.prev = e.prototype.slickPrev =
                  function () {
                    this.changeSlide({ data: { message: 'previous' } });
                  }),
                (e.prototype.preventDefault = function (t) {
                  t.preventDefault();
                }),
                (e.prototype.progressiveLazyLoad = function (e) {
                  e = e || 1;
                  var n,
                    i,
                    r,
                    o,
                    s,
                    a = this,
                    l = t('img[data-lazy]', a.$slider);
                  l.length
                    ? ((n = l.first()),
                      (i = n.attr('data-lazy')),
                      (r = n.attr('data-srcset')),
                      (o =
                        n.attr('data-sizes') || a.$slider.attr('data-sizes')),
                      ((s = document.createElement('img')).onload =
                        function () {
                          r && (n.attr('srcset', r), o && n.attr('sizes', o)),
                            n
                              .attr('src', i)
                              .removeAttr('data-lazy data-srcset data-sizes')
                              .removeClass('slick-loading'),
                            !0 === a.options.adaptiveHeight && a.setPosition(),
                            a.$slider.trigger('lazyLoaded', [a, n, i]),
                            a.progressiveLazyLoad();
                        }),
                      (s.onerror = function () {
                        e < 3
                          ? setTimeout(function () {
                              a.progressiveLazyLoad(e + 1);
                            }, 500)
                          : (n
                              .removeAttr('data-lazy')
                              .removeClass('slick-loading')
                              .addClass('slick-lazyload-error'),
                            a.$slider.trigger('lazyLoadError', [a, n, i]),
                            a.progressiveLazyLoad());
                      }),
                      (s.src = i))
                    : a.$slider.trigger('allImagesLoaded', [a]);
                }),
                (e.prototype.refresh = function (e) {
                  var n,
                    i,
                    r = this;
                  (i = r.slideCount - r.options.slidesToShow),
                    !r.options.infinite &&
                      r.currentSlide > i &&
                      (r.currentSlide = i),
                    r.slideCount <= r.options.slidesToShow &&
                      (r.currentSlide = 0),
                    (n = r.currentSlide),
                    r.destroy(!0),
                    t.extend(r, r.initials, { currentSlide: n }),
                    r.init(),
                    e ||
                      r.changeSlide(
                        { data: { message: 'index', index: n } },
                        !1
                      );
                }),
                (e.prototype.registerBreakpoints = function () {
                  var e,
                    n,
                    i,
                    r = this,
                    o = r.options.responsive || null;
                  if ('array' === t.type(o) && o.length) {
                    for (e in ((r.respondTo = r.options.respondTo || 'window'),
                    o))
                      if (
                        ((i = r.breakpoints.length - 1), o.hasOwnProperty(e))
                      ) {
                        for (n = o[e].breakpoint; i >= 0; )
                          r.breakpoints[i] &&
                            r.breakpoints[i] === n &&
                            r.breakpoints.splice(i, 1),
                            i--;
                        r.breakpoints.push(n),
                          (r.breakpointSettings[n] = o[e].settings);
                      }
                    r.breakpoints.sort(function (t, e) {
                      return r.options.mobileFirst ? t - e : e - t;
                    });
                  }
                }),
                (e.prototype.reinit = function () {
                  var e = this;
                  (e.$slides = e.$slideTrack
                    .children(e.options.slide)
                    .addClass('slick-slide')),
                    (e.slideCount = e.$slides.length),
                    e.currentSlide >= e.slideCount &&
                      0 !== e.currentSlide &&
                      (e.currentSlide =
                        e.currentSlide - e.options.slidesToScroll),
                    e.slideCount <= e.options.slidesToShow &&
                      (e.currentSlide = 0),
                    e.registerBreakpoints(),
                    e.setProps(),
                    e.setupInfinite(),
                    e.buildArrows(),
                    e.updateArrows(),
                    e.initArrowEvents(),
                    e.buildDots(),
                    e.updateDots(),
                    e.initDotEvents(),
                    e.cleanUpSlideEvents(),
                    e.initSlideEvents(),
                    e.checkResponsive(!1, !0),
                    !0 === e.options.focusOnSelect &&
                      t(e.$slideTrack)
                        .children()
                        .on('click.slick', e.selectHandler),
                    e.setSlideClasses(
                      'number' == typeof e.currentSlide ? e.currentSlide : 0
                    ),
                    e.setPosition(),
                    e.focusHandler(),
                    (e.paused = !e.options.autoplay),
                    e.autoPlay(),
                    e.$slider.trigger('reInit', [e]);
                }),
                (e.prototype.resize = function () {
                  var e = this;
                  t(window).width() !== e.windowWidth &&
                    (clearTimeout(e.windowDelay),
                    (e.windowDelay = window.setTimeout(function () {
                      (e.windowWidth = t(window).width()),
                        e.checkResponsive(),
                        e.unslicked || e.setPosition();
                    }, 50)));
                }),
                (e.prototype.removeSlide = e.prototype.slickRemove =
                  function (t, e, n) {
                    var i = this;
                    if (
                      ((t =
                        'boolean' == typeof t
                          ? !0 === (e = t)
                            ? 0
                            : i.slideCount - 1
                          : !0 === e
                          ? --t
                          : t),
                      i.slideCount < 1 || t < 0 || t > i.slideCount - 1)
                    )
                      return !1;
                    i.unload(),
                      !0 === n
                        ? i.$slideTrack.children().remove()
                        : i.$slideTrack
                            .children(this.options.slide)
                            .eq(t)
                            .remove(),
                      (i.$slides = i.$slideTrack.children(this.options.slide)),
                      i.$slideTrack.children(this.options.slide).detach(),
                      i.$slideTrack.append(i.$slides),
                      (i.$slidesCache = i.$slides),
                      i.reinit();
                  }),
                (e.prototype.setCSS = function (t) {
                  var e,
                    n,
                    i = this,
                    r = {};
                  !0 === i.options.rtl && (t = -t),
                    (e =
                      'left' == i.positionProp ? Math.ceil(t) + 'px' : '0px'),
                    (n = 'top' == i.positionProp ? Math.ceil(t) + 'px' : '0px'),
                    (r[i.positionProp] = t),
                    !1 === i.transformsEnabled
                      ? i.$slideTrack.css(r)
                      : ((r = {}),
                        !1 === i.cssTransitions
                          ? ((r[i.animType] =
                              'translate(' + e + ', ' + n + ')'),
                            i.$slideTrack.css(r))
                          : ((r[i.animType] =
                              'translate3d(' + e + ', ' + n + ', 0px)'),
                            i.$slideTrack.css(r)));
                }),
                (e.prototype.setDimensions = function () {
                  var t = this;
                  !1 === t.options.vertical
                    ? !0 === t.options.centerMode &&
                      t.$list.css({ padding: '0px ' + t.options.centerPadding })
                    : (t.$list.height(
                        t.$slides.first().outerHeight(!0) *
                          t.options.slidesToShow
                      ),
                      !0 === t.options.centerMode &&
                        t.$list.css({
                          padding: t.options.centerPadding + ' 0px',
                        })),
                    (t.listWidth = t.$list.width()),
                    (t.listHeight = t.$list.height()),
                    !1 === t.options.vertical && !1 === t.options.variableWidth
                      ? ((t.slideWidth = Math.ceil(
                          t.listWidth / t.options.slidesToShow
                        )),
                        t.$slideTrack.width(
                          Math.ceil(
                            t.slideWidth *
                              t.$slideTrack.children('.slick-slide').length
                          )
                        ))
                      : !0 === t.options.variableWidth
                      ? t.$slideTrack.width(5e3 * t.slideCount)
                      : ((t.slideWidth = Math.ceil(t.listWidth)),
                        t.$slideTrack.height(
                          Math.ceil(
                            t.$slides.first().outerHeight(!0) *
                              t.$slideTrack.children('.slick-slide').length
                          )
                        ));
                  var e =
                    t.$slides.first().outerWidth(!0) -
                    t.$slides.first().width();
                  !1 === t.options.variableWidth &&
                    t.$slideTrack
                      .children('.slick-slide')
                      .width(t.slideWidth - e);
                }),
                (e.prototype.setFade = function () {
                  var e,
                    n = this;
                  n.$slides.each(function (i, r) {
                    (e = n.slideWidth * i * -1),
                      !0 === n.options.rtl
                        ? t(r).css({
                            position: 'relative',
                            right: e,
                            top: 0,
                            zIndex: n.options.zIndex - 2,
                            opacity: 0,
                          })
                        : t(r).css({
                            position: 'relative',
                            left: e,
                            top: 0,
                            zIndex: n.options.zIndex - 2,
                            opacity: 0,
                          });
                  }),
                    n.$slides
                      .eq(n.currentSlide)
                      .css({ zIndex: n.options.zIndex - 1, opacity: 1 });
                }),
                (e.prototype.setHeight = function () {
                  var t = this;
                  if (
                    1 === t.options.slidesToShow &&
                    !0 === t.options.adaptiveHeight &&
                    !1 === t.options.vertical
                  ) {
                    var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                    t.$list.css('height', e);
                  }
                }),
                (e.prototype.setOption = e.prototype.slickSetOption =
                  function () {
                    var e,
                      n,
                      i,
                      r,
                      o,
                      s = this,
                      a = !1;
                    if (
                      ('object' === t.type(arguments[0])
                        ? ((i = arguments[0]),
                          (a = arguments[1]),
                          (o = 'multiple'))
                        : 'string' === t.type(arguments[0]) &&
                          ((i = arguments[0]),
                          (r = arguments[1]),
                          (a = arguments[2]),
                          'responsive' === arguments[0] &&
                          'array' === t.type(arguments[1])
                            ? (o = 'responsive')
                            : void 0 !== arguments[1] && (o = 'single')),
                      'single' === o)
                    )
                      s.options[i] = r;
                    else if ('multiple' === o)
                      t.each(i, function (t, e) {
                        s.options[t] = e;
                      });
                    else if ('responsive' === o)
                      for (n in r)
                        if ('array' !== t.type(s.options.responsive))
                          s.options.responsive = [r[n]];
                        else {
                          for (e = s.options.responsive.length - 1; e >= 0; )
                            s.options.responsive[e].breakpoint ===
                              r[n].breakpoint &&
                              s.options.responsive.splice(e, 1),
                              e--;
                          s.options.responsive.push(r[n]);
                        }
                    a && (s.unload(), s.reinit());
                  }),
                (e.prototype.setPosition = function () {
                  var t = this;
                  t.setDimensions(),
                    t.setHeight(),
                    !1 === t.options.fade
                      ? t.setCSS(t.getLeft(t.currentSlide))
                      : t.setFade(),
                    t.$slider.trigger('setPosition', [t]);
                }),
                (e.prototype.setProps = function () {
                  var t = this,
                    e = document.body.style;
                  (t.positionProp = !0 === t.options.vertical ? 'top' : 'left'),
                    'top' === t.positionProp
                      ? t.$slider.addClass('slick-vertical')
                      : t.$slider.removeClass('slick-vertical'),
                    (void 0 === e.WebkitTransition &&
                      void 0 === e.MozTransition &&
                      void 0 === e.msTransition) ||
                      (!0 === t.options.useCSS && (t.cssTransitions = !0)),
                    t.options.fade &&
                      ('number' == typeof t.options.zIndex
                        ? t.options.zIndex < 3 && (t.options.zIndex = 3)
                        : (t.options.zIndex = t.defaults.zIndex)),
                    void 0 !== e.OTransform &&
                      ((t.animType = 'OTransform'),
                      (t.transformType = '-o-transform'),
                      (t.transitionType = 'OTransition'),
                      void 0 === e.perspectiveProperty &&
                        void 0 === e.webkitPerspective &&
                        (t.animType = !1)),
                    void 0 !== e.MozTransform &&
                      ((t.animType = 'MozTransform'),
                      (t.transformType = '-moz-transform'),
                      (t.transitionType = 'MozTransition'),
                      void 0 === e.perspectiveProperty &&
                        void 0 === e.MozPerspective &&
                        (t.animType = !1)),
                    void 0 !== e.webkitTransform &&
                      ((t.animType = 'webkitTransform'),
                      (t.transformType = '-webkit-transform'),
                      (t.transitionType = 'webkitTransition'),
                      void 0 === e.perspectiveProperty &&
                        void 0 === e.webkitPerspective &&
                        (t.animType = !1)),
                    void 0 !== e.msTransform &&
                      ((t.animType = 'msTransform'),
                      (t.transformType = '-ms-transform'),
                      (t.transitionType = 'msTransition'),
                      void 0 === e.msTransform && (t.animType = !1)),
                    void 0 !== e.transform &&
                      !1 !== t.animType &&
                      ((t.animType = 'transform'),
                      (t.transformType = 'transform'),
                      (t.transitionType = 'transition')),
                    (t.transformsEnabled =
                      t.options.useTransform &&
                      null !== t.animType &&
                      !1 !== t.animType);
                }),
                (e.prototype.setSlideClasses = function (t) {
                  var e,
                    n,
                    i,
                    r,
                    o = this;
                  if (
                    ((n = o.$slider
                      .find('.slick-slide')
                      .removeClass('slick-active slick-center slick-current')
                      .attr('aria-hidden', 'true')),
                    o.$slides.eq(t).addClass('slick-current'),
                    !0 === o.options.centerMode)
                  ) {
                    var s = o.options.slidesToShow % 2 == 0 ? 1 : 0;
                    (e = Math.floor(o.options.slidesToShow / 2)),
                      !0 === o.options.infinite &&
                        (t >= e && t <= o.slideCount - 1 - e
                          ? o.$slides
                              .slice(t - e + s, t + e + 1)
                              .addClass('slick-active')
                              .attr('aria-hidden', 'false')
                          : ((i = o.options.slidesToShow + t),
                            n
                              .slice(i - e + 1 + s, i + e + 2)
                              .addClass('slick-active')
                              .attr('aria-hidden', 'false')),
                        0 === t
                          ? n
                              .eq(n.length - 1 - o.options.slidesToShow)
                              .addClass('slick-center')
                          : t === o.slideCount - 1 &&
                            n
                              .eq(o.options.slidesToShow)
                              .addClass('slick-center')),
                      o.$slides.eq(t).addClass('slick-center');
                  } else
                    t >= 0 && t <= o.slideCount - o.options.slidesToShow
                      ? o.$slides
                          .slice(t, t + o.options.slidesToShow)
                          .addClass('slick-active')
                          .attr('aria-hidden', 'false')
                      : n.length <= o.options.slidesToShow
                      ? n.addClass('slick-active').attr('aria-hidden', 'false')
                      : ((r = o.slideCount % o.options.slidesToShow),
                        (i =
                          !0 === o.options.infinite
                            ? o.options.slidesToShow + t
                            : t),
                        o.options.slidesToShow == o.options.slidesToScroll &&
                        o.slideCount - t < o.options.slidesToShow
                          ? n
                              .slice(i - (o.options.slidesToShow - r), i + r)
                              .addClass('slick-active')
                              .attr('aria-hidden', 'false')
                          : n
                              .slice(i, i + o.options.slidesToShow)
                              .addClass('slick-active')
                              .attr('aria-hidden', 'false'));
                  ('ondemand' !== o.options.lazyLoad &&
                    'anticipated' !== o.options.lazyLoad) ||
                    o.lazyLoad();
                }),
                (e.prototype.setupInfinite = function () {
                  var e,
                    n,
                    i,
                    r = this;
                  if (
                    (!0 === r.options.fade && (r.options.centerMode = !1),
                    !0 === r.options.infinite &&
                      !1 === r.options.fade &&
                      ((n = null), r.slideCount > r.options.slidesToShow))
                  ) {
                    for (
                      i =
                        !0 === r.options.centerMode
                          ? r.options.slidesToShow + 1
                          : r.options.slidesToShow,
                        e = r.slideCount;
                      e > r.slideCount - i;
                      e -= 1
                    )
                      (n = e - 1),
                        t(r.$slides[n])
                          .clone(!0)
                          .attr('id', '')
                          .attr('data-slick-index', n - r.slideCount)
                          .prependTo(r.$slideTrack)
                          .addClass('slick-cloned');
                    for (e = 0; e < i + r.slideCount; e += 1)
                      (n = e),
                        t(r.$slides[n])
                          .clone(!0)
                          .attr('id', '')
                          .attr('data-slick-index', n + r.slideCount)
                          .appendTo(r.$slideTrack)
                          .addClass('slick-cloned');
                    r.$slideTrack
                      .find('.slick-cloned')
                      .find('[id]')
                      .each(function () {
                        t(this).attr('id', '');
                      });
                  }
                }),
                (e.prototype.interrupt = function (t) {
                  var e = this;
                  t || e.autoPlay(), (e.interrupted = t);
                }),
                (e.prototype.selectHandler = function (e) {
                  var n = this,
                    i = t(e.target).is('.slick-slide')
                      ? t(e.target)
                      : t(e.target).parents('.slick-slide'),
                    r = parseInt(i.attr('data-slick-index'));
                  r || (r = 0),
                    n.slideCount <= n.options.slidesToShow
                      ? n.slideHandler(r, !1, !0)
                      : n.slideHandler(r);
                }),
                (e.prototype.slideHandler = function (t, e, n) {
                  var i,
                    r,
                    o,
                    s,
                    a,
                    l = null,
                    c = this;
                  if (
                    ((e = e || !1),
                    !(
                      (!0 === c.animating && !0 === c.options.waitForAnimate) ||
                      (!0 === c.options.fade && c.currentSlide === t)
                    ))
                  )
                    if (
                      (!1 === e && c.asNavFor(t),
                      (i = t),
                      (l = c.getLeft(i)),
                      (s = c.getLeft(c.currentSlide)),
                      (c.currentLeft = null === c.swipeLeft ? s : c.swipeLeft),
                      !1 === c.options.infinite &&
                        !1 === c.options.centerMode &&
                        (t < 0 ||
                          t > c.getDotCount() * c.options.slidesToScroll))
                    )
                      !1 === c.options.fade &&
                        ((i = c.currentSlide),
                        !0 !== n && c.slideCount > c.options.slidesToShow
                          ? c.animateSlide(s, function () {
                              c.postSlide(i);
                            })
                          : c.postSlide(i));
                    else if (
                      !1 === c.options.infinite &&
                      !0 === c.options.centerMode &&
                      (t < 0 || t > c.slideCount - c.options.slidesToScroll)
                    )
                      !1 === c.options.fade &&
                        ((i = c.currentSlide),
                        !0 !== n && c.slideCount > c.options.slidesToShow
                          ? c.animateSlide(s, function () {
                              c.postSlide(i);
                            })
                          : c.postSlide(i));
                    else {
                      if (
                        (c.options.autoplay && clearInterval(c.autoPlayTimer),
                        (r =
                          i < 0
                            ? c.slideCount % c.options.slidesToScroll != 0
                              ? c.slideCount -
                                (c.slideCount % c.options.slidesToScroll)
                              : c.slideCount + i
                            : i >= c.slideCount
                            ? c.slideCount % c.options.slidesToScroll != 0
                              ? 0
                              : i - c.slideCount
                            : i),
                        (c.animating = !0),
                        c.$slider.trigger('beforeChange', [
                          c,
                          c.currentSlide,
                          r,
                        ]),
                        (o = c.currentSlide),
                        (c.currentSlide = r),
                        c.setSlideClasses(c.currentSlide),
                        c.options.asNavFor &&
                          (a = (a = c.getNavTarget()).slick('getSlick'))
                            .slideCount <= a.options.slidesToShow &&
                          a.setSlideClasses(c.currentSlide),
                        c.updateDots(),
                        c.updateArrows(),
                        !0 === c.options.fade)
                      )
                        return (
                          !0 !== n
                            ? (c.fadeSlideOut(o),
                              c.fadeSlide(r, function () {
                                c.postSlide(r);
                              }))
                            : c.postSlide(r),
                          void c.animateHeight()
                        );
                      !0 !== n && c.slideCount > c.options.slidesToShow
                        ? c.animateSlide(l, function () {
                            c.postSlide(r);
                          })
                        : c.postSlide(r);
                    }
                }),
                (e.prototype.startLoad = function () {
                  var t = this;
                  !0 === t.options.arrows &&
                    t.slideCount > t.options.slidesToShow &&
                    (t.$prevArrow.hide(), t.$nextArrow.hide()),
                    !0 === t.options.dots &&
                      t.slideCount > t.options.slidesToShow &&
                      t.$dots.hide(),
                    t.$slider.addClass('slick-loading');
                }),
                (e.prototype.swipeDirection = function () {
                  var t,
                    e,
                    n,
                    i,
                    r = this;
                  return (
                    (t = r.touchObject.startX - r.touchObject.curX),
                    (e = r.touchObject.startY - r.touchObject.curY),
                    (n = Math.atan2(e, t)),
                    (i = Math.round((180 * n) / Math.PI)) < 0 &&
                      (i = 360 - Math.abs(i)),
                    (i <= 45 && i >= 0) || (i <= 360 && i >= 315)
                      ? !1 === r.options.rtl
                        ? 'left'
                        : 'right'
                      : i >= 135 && i <= 225
                      ? !1 === r.options.rtl
                        ? 'right'
                        : 'left'
                      : !0 === r.options.verticalSwiping
                      ? i >= 35 && i <= 135
                        ? 'down'
                        : 'up'
                      : 'vertical'
                  );
                }),
                (e.prototype.swipeEnd = function (t) {
                  var e,
                    n,
                    i = this;
                  if (((i.dragging = !1), (i.swiping = !1), i.scrolling))
                    return (i.scrolling = !1), !1;
                  if (
                    ((i.interrupted = !1),
                    (i.shouldClick = !(i.touchObject.swipeLength > 10)),
                    void 0 === i.touchObject.curX)
                  )
                    return !1;
                  if (
                    (!0 === i.touchObject.edgeHit &&
                      i.$slider.trigger('edge', [i, i.swipeDirection()]),
                    i.touchObject.swipeLength >= i.touchObject.minSwipe)
                  ) {
                    switch ((n = i.swipeDirection())) {
                      case 'left':
                      case 'down':
                        (e = i.options.swipeToSlide
                          ? i.checkNavigable(i.currentSlide + i.getSlideCount())
                          : i.currentSlide + i.getSlideCount()),
                          (i.currentDirection = 0);
                        break;
                      case 'right':
                      case 'up':
                        (e = i.options.swipeToSlide
                          ? i.checkNavigable(i.currentSlide - i.getSlideCount())
                          : i.currentSlide - i.getSlideCount()),
                          (i.currentDirection = 1);
                    }
                    'vertical' != n &&
                      (i.slideHandler(e),
                      (i.touchObject = {}),
                      i.$slider.trigger('swipe', [i, n]));
                  } else
                    i.touchObject.startX !== i.touchObject.curX &&
                      (i.slideHandler(i.currentSlide), (i.touchObject = {}));
                }),
                (e.prototype.swipeHandler = function (t) {
                  var e = this;
                  if (
                    !(
                      !1 === e.options.swipe ||
                      ('ontouchend' in document && !1 === e.options.swipe) ||
                      (!1 === e.options.draggable &&
                        -1 !== t.type.indexOf('mouse'))
                    )
                  )
                    switch (
                      ((e.touchObject.fingerCount =
                        t.originalEvent && void 0 !== t.originalEvent.touches
                          ? t.originalEvent.touches.length
                          : 1),
                      (e.touchObject.minSwipe =
                        e.listWidth / e.options.touchThreshold),
                      !0 === e.options.verticalSwiping &&
                        (e.touchObject.minSwipe =
                          e.listHeight / e.options.touchThreshold),
                      t.data.action)
                    ) {
                      case 'start':
                        e.swipeStart(t);
                        break;
                      case 'move':
                        e.swipeMove(t);
                        break;
                      case 'end':
                        e.swipeEnd(t);
                    }
                }),
                (e.prototype.swipeMove = function (t) {
                  var e,
                    n,
                    i,
                    r,
                    o,
                    s,
                    a = this;
                  return (
                    (o =
                      void 0 !== t.originalEvent
                        ? t.originalEvent.touches
                        : null),
                    !(!a.dragging || a.scrolling || (o && 1 !== o.length)) &&
                      ((e = a.getLeft(a.currentSlide)),
                      (a.touchObject.curX =
                        void 0 !== o ? o[0].pageX : t.clientX),
                      (a.touchObject.curY =
                        void 0 !== o ? o[0].pageY : t.clientY),
                      (a.touchObject.swipeLength = Math.round(
                        Math.sqrt(
                          Math.pow(a.touchObject.curX - a.touchObject.startX, 2)
                        )
                      )),
                      (s = Math.round(
                        Math.sqrt(
                          Math.pow(a.touchObject.curY - a.touchObject.startY, 2)
                        )
                      )),
                      !a.options.verticalSwiping && !a.swiping && s > 4
                        ? ((a.scrolling = !0), !1)
                        : (!0 === a.options.verticalSwiping &&
                            (a.touchObject.swipeLength = s),
                          (n = a.swipeDirection()),
                          void 0 !== t.originalEvent &&
                            a.touchObject.swipeLength > 4 &&
                            ((a.swiping = !0), t.preventDefault()),
                          (r =
                            (!1 === a.options.rtl ? 1 : -1) *
                            (a.touchObject.curX > a.touchObject.startX
                              ? 1
                              : -1)),
                          !0 === a.options.verticalSwiping &&
                            (r =
                              a.touchObject.curY > a.touchObject.startY
                                ? 1
                                : -1),
                          (i = a.touchObject.swipeLength),
                          (a.touchObject.edgeHit = !1),
                          !1 === a.options.infinite &&
                            ((0 === a.currentSlide && 'right' === n) ||
                              (a.currentSlide >= a.getDotCount() &&
                                'left' === n)) &&
                            ((i =
                              a.touchObject.swipeLength *
                              a.options.edgeFriction),
                            (a.touchObject.edgeHit = !0)),
                          !1 === a.options.vertical
                            ? (a.swipeLeft = e + i * r)
                            : (a.swipeLeft =
                                e + i * (a.$list.height() / a.listWidth) * r),
                          !0 === a.options.verticalSwiping &&
                            (a.swipeLeft = e + i * r),
                          !0 !== a.options.fade &&
                            !1 !== a.options.touchMove &&
                            (!0 === a.animating
                              ? ((a.swipeLeft = null), !1)
                              : void a.setCSS(a.swipeLeft))))
                  );
                }),
                (e.prototype.swipeStart = function (t) {
                  var e,
                    n = this;
                  if (
                    ((n.interrupted = !0),
                    1 !== n.touchObject.fingerCount ||
                      n.slideCount <= n.options.slidesToShow)
                  )
                    return (n.touchObject = {}), !1;
                  void 0 !== t.originalEvent &&
                    void 0 !== t.originalEvent.touches &&
                    (e = t.originalEvent.touches[0]),
                    (n.touchObject.startX = n.touchObject.curX =
                      void 0 !== e ? e.pageX : t.clientX),
                    (n.touchObject.startY = n.touchObject.curY =
                      void 0 !== e ? e.pageY : t.clientY),
                    (n.dragging = !0);
                }),
                (e.prototype.unfilterSlides = e.prototype.slickUnfilter =
                  function () {
                    var t = this;
                    null !== t.$slidesCache &&
                      (t.unload(),
                      t.$slideTrack.children(this.options.slide).detach(),
                      t.$slidesCache.appendTo(t.$slideTrack),
                      t.reinit());
                  }),
                (e.prototype.unload = function () {
                  var e = this;
                  t('.slick-cloned', e.$slider).remove(),
                    e.$dots && e.$dots.remove(),
                    e.$prevArrow &&
                      e.htmlExpr.test(e.options.prevArrow) &&
                      e.$prevArrow.remove(),
                    e.$nextArrow &&
                      e.htmlExpr.test(e.options.nextArrow) &&
                      e.$nextArrow.remove(),
                    e.$slides
                      .removeClass(
                        'slick-slide slick-active slick-visible slick-current'
                      )
                      .attr('aria-hidden', 'true')
                      .css('width', '');
                }),
                (e.prototype.unslick = function (t) {
                  var e = this;
                  e.$slider.trigger('unslick', [e, t]), e.destroy();
                }),
                (e.prototype.updateArrows = function () {
                  var t = this;
                  Math.floor(t.options.slidesToShow / 2),
                    !0 === t.options.arrows &&
                      t.slideCount > t.options.slidesToShow &&
                      !t.options.infinite &&
                      (t.$prevArrow
                        .removeClass('slick-disabled')
                        .attr('aria-disabled', 'false'),
                      t.$nextArrow
                        .removeClass('slick-disabled')
                        .attr('aria-disabled', 'false'),
                      0 === t.currentSlide
                        ? (t.$prevArrow
                            .addClass('slick-disabled')
                            .attr('aria-disabled', 'true'),
                          t.$nextArrow
                            .removeClass('slick-disabled')
                            .attr('aria-disabled', 'false'))
                        : ((t.currentSlide >=
                            t.slideCount - t.options.slidesToShow &&
                            !1 === t.options.centerMode) ||
                            (t.currentSlide >= t.slideCount - 1 &&
                              !0 === t.options.centerMode)) &&
                          (t.$nextArrow
                            .addClass('slick-disabled')
                            .attr('aria-disabled', 'true'),
                          t.$prevArrow
                            .removeClass('slick-disabled')
                            .attr('aria-disabled', 'false')));
                }),
                (e.prototype.updateDots = function () {
                  var t = this;
                  null !== t.$dots &&
                    (t.$dots.find('li').removeClass('slick-active').end(),
                    t.$dots
                      .find('li')
                      .eq(Math.floor(t.currentSlide / t.options.slidesToScroll))
                      .addClass('slick-active'));
                }),
                (e.prototype.visibility = function () {
                  var t = this;
                  t.options.autoplay &&
                    (document[t.hidden]
                      ? (t.interrupted = !0)
                      : (t.interrupted = !1));
                }),
                (t.fn.slick = function () {
                  var t,
                    n,
                    i = this,
                    r = arguments[0],
                    o = Array.prototype.slice.call(arguments, 1),
                    s = i.length;
                  for (t = 0; t < s; t++)
                    if (
                      ('object' == typeof r || void 0 === r
                        ? (i[t].slick = new e(i[t], r))
                        : (n = i[t].slick[r].apply(i[t].slick, o)),
                      void 0 !== n)
                    )
                      return n;
                  return i;
                });
            }),
            void 0 === (o = 'function' == typeof i ? i.apply(e, r) : i) ||
              (t.exports = o);
        })();
      },
    },
    e = {};
  function n(i) {
    var r = e[i];
    if (void 0 !== r) return r.exports;
    var o = (e[i] = { exports: {} });
    return t[i].call(o.exports, o, o.exports, n), o.exports;
  }
  (n.n = (t) => {
    var e = t && t.__esModule ? () => t.default : () => t;
    return n.d(e, { a: e }), e;
  }),
    (n.d = (t, e) => {
      for (var i in e)
        n.o(e, i) &&
          !n.o(t, i) &&
          Object.defineProperty(t, i, { enumerable: !0, get: e[i] });
    }),
    (n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (() => {
      'use strict';
      function t(t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      }
      function e(t, e) {
        (t.prototype = Object.create(e.prototype)),
          (t.prototype.constructor = t),
          (t.__proto__ = e);
      }
      var i,
        r,
        o,
        s,
        a,
        l,
        c,
        u,
        d,
        p,
        f,
        h,
        m,
        g,
        v,
        y,
        w,
        b = {
          autoSleep: 120,
          force3D: 'auto',
          nullTargetWarn: 1,
          units: { lineHeight: '' },
        },
        x = { duration: 0.5, overwrite: !1, delay: 0 },
        k = 1e8,
        _ = 1e-8,
        T = 2 * Math.PI,
        S = T / 4,
        C = 0,
        E = Math.sqrt,
        $ = Math.cos,
        A = Math.sin,
        L = function (t) {
          return 'string' == typeof t;
        },
        O = function (t) {
          return 'function' == typeof t;
        },
        D = function (t) {
          return 'number' == typeof t;
        },
        P = function (t) {
          return void 0 === t;
        },
        M = function (t) {
          return 'object' == typeof t;
        },
        I = function (t) {
          return !1 !== t;
        },
        q = function () {
          return 'undefined' != typeof window;
        },
        H = function (t) {
          return O(t) || L(t);
        },
        j =
          ('function' == typeof ArrayBuffer && ArrayBuffer.isView) ||
          function () {},
        z = Array.isArray,
        N = /(?:-?\.?\d|\.)+/gi,
        F = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
        R = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
        B = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
        W = /[+-]=-?[.\d]+/,
        V = /[^,'"\[\]\s]+/gi,
        U = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
        Y = {},
        X = {},
        G = function (t) {
          return (X = Tt(t, Y)) && Cn;
        },
        Q = function (t, e) {
          return console.warn(
            'Invalid property',
            t,
            'set to',
            e,
            'Missing plugin? gsap.registerPlugin()'
          );
        },
        Z = function (t, e) {
          return !e && console.warn(t);
        },
        K = function (t, e) {
          return (t && (Y[t] = e) && X && (X[t] = e)) || Y;
        },
        J = function () {
          return 0;
        },
        tt = { suppressEvents: !0, isStart: !0, kill: !1 },
        et = { suppressEvents: !0, kill: !1 },
        nt = { suppressEvents: !0 },
        it = {},
        rt = [],
        ot = {},
        st = {},
        at = {},
        lt = 30,
        ct = [],
        ut = '',
        dt = function (t) {
          var e,
            n,
            i = t[0];
          if ((M(i) || O(i) || (t = [t]), !(e = (i._gsap || {}).harness))) {
            for (n = ct.length; n-- && !ct[n].targetTest(i); );
            e = ct[n];
          }
          for (n = t.length; n--; )
            (t[n] && (t[n]._gsap || (t[n]._gsap = new ze(t[n], e)))) ||
              t.splice(n, 1);
          return t;
        },
        pt = function (t) {
          return t._gsap || dt(ne(t))[0]._gsap;
        },
        ft = function (t, e, n) {
          return (n = t[e]) && O(n)
            ? t[e]()
            : (P(n) && t.getAttribute && t.getAttribute(e)) || n;
        },
        ht = function (t, e) {
          return (t = t.split(',')).forEach(e) || t;
        },
        mt = function (t) {
          return Math.round(1e5 * t) / 1e5 || 0;
        },
        gt = function (t) {
          return Math.round(1e7 * t) / 1e7 || 0;
        },
        vt = function (t, e) {
          var n = e.charAt(0),
            i = parseFloat(e.substr(2));
          return (
            (t = parseFloat(t)),
            '+' === n ? t + i : '-' === n ? t - i : '*' === n ? t * i : t / i
          );
        },
        yt = function (t, e) {
          for (var n = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < n; );
          return i < n;
        },
        wt = function () {
          var t,
            e,
            n = rt.length,
            i = rt.slice(0);
          for (ot = {}, rt.length = 0, t = 0; t < n; t++)
            (e = i[t]) &&
              e._lazy &&
              (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
        },
        bt = function (t, e, n, i) {
          rt.length && !r && wt(),
            t.render(e, n, i || (r && e < 0 && (t._initted || t._startAt))),
            rt.length && !r && wt();
        },
        xt = function (t) {
          var e = parseFloat(t);
          return (e || 0 === e) && (t + '').match(V).length < 2
            ? e
            : L(t)
            ? t.trim()
            : t;
        },
        kt = function (t) {
          return t;
        },
        _t = function (t, e) {
          for (var n in e) n in t || (t[n] = e[n]);
          return t;
        },
        Tt = function (t, e) {
          for (var n in e) t[n] = e[n];
          return t;
        },
        St = function t(e, n) {
          for (var i in n)
            '__proto__' !== i &&
              'constructor' !== i &&
              'prototype' !== i &&
              (e[i] = M(n[i]) ? t(e[i] || (e[i] = {}), n[i]) : n[i]);
          return e;
        },
        Ct = function (t, e) {
          var n,
            i = {};
          for (n in t) n in e || (i[n] = t[n]);
          return i;
        },
        Et = function (t) {
          var e,
            n = t.parent || s,
            i = t.keyframes
              ? ((e = z(t.keyframes)),
                function (t, n) {
                  for (var i in n)
                    i in t ||
                      ('duration' === i && e) ||
                      'ease' === i ||
                      (t[i] = n[i]);
                })
              : _t;
          if (I(t.inherit))
            for (; n; ) i(t, n.vars.defaults), (n = n.parent || n._dp);
          return t;
        },
        $t = function (t, e, n, i, r) {
          void 0 === n && (n = '_first'), void 0 === i && (i = '_last');
          var o,
            s = t[i];
          if (r) for (o = e[r]; s && s[r] > o; ) s = s._prev;
          return (
            s
              ? ((e._next = s._next), (s._next = e))
              : ((e._next = t[n]), (t[n] = e)),
            e._next ? (e._next._prev = e) : (t[i] = e),
            (e._prev = s),
            (e.parent = e._dp = t),
            e
          );
        },
        At = function (t, e, n, i) {
          void 0 === n && (n = '_first'), void 0 === i && (i = '_last');
          var r = e._prev,
            o = e._next;
          r ? (r._next = o) : t[n] === e && (t[n] = o),
            o ? (o._prev = r) : t[i] === e && (t[i] = r),
            (e._next = e._prev = e.parent = null);
        },
        Lt = function (t, e) {
          t.parent &&
            (!e || t.parent.autoRemoveChildren) &&
            t.parent.remove &&
            t.parent.remove(t),
            (t._act = 0);
        },
        Ot = function (t, e) {
          if (t && (!e || e._end > t._dur || e._start < 0))
            for (var n = t; n; ) (n._dirty = 1), (n = n.parent);
          return t;
        },
        Dt = function (t, e, n, i) {
          return (
            t._startAt &&
            (r
              ? t._startAt.revert(et)
              : (t.vars.immediateRender && !t.vars.autoRevert) ||
                t._startAt.render(e, !0, i))
          );
        },
        Pt = function t(e) {
          return !e || (e._ts && t(e.parent));
        },
        Mt = function (t) {
          return t._repeat
            ? It(t._tTime, (t = t.duration() + t._rDelay)) * t
            : 0;
        },
        It = function (t, e) {
          var n = Math.floor((t /= e));
          return t && n === t ? n - 1 : n;
        },
        qt = function (t, e) {
          return (
            (t - e._start) * e._ts +
            (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
          );
        },
        Ht = function (t) {
          return (t._end = gt(
            t._start + (t._tDur / Math.abs(t._ts || t._rts || _) || 0)
          ));
        },
        jt = function (t, e) {
          var n = t._dp;
          return (
            n &&
              n.smoothChildTiming &&
              t._ts &&
              ((t._start = gt(
                n._time -
                  (t._ts > 0
                    ? e / t._ts
                    : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)
              )),
              Ht(t),
              n._dirty || Ot(n, t)),
            t
          );
        },
        zt = function (t, e) {
          var n;
          if (
            ((e._time ||
              (!e._dur && e._initted) ||
              (e._start < t._time && (e._dur || !e.add))) &&
              ((n = qt(t.rawTime(), e)),
              (!e._dur || Zt(0, e.totalDuration(), n) - e._tTime > _) &&
                e.render(n, !0)),
            Ot(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
          ) {
            if (t._dur < t.duration())
              for (n = t; n._dp; )
                n.rawTime() >= 0 && n.totalTime(n._tTime), (n = n._dp);
            t._zTime = -1e-8;
          }
        },
        Nt = function (t, e, n, i) {
          return (
            e.parent && Lt(e),
            (e._start = gt(
              (D(n) ? n : n || t !== s ? Xt(t, n, e) : t._time) + e._delay
            )),
            (e._end = gt(
              e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)
            )),
            $t(t, e, '_first', '_last', t._sort ? '_start' : 0),
            Wt(e) || (t._recent = e),
            i || zt(t, e),
            t._ts < 0 && jt(t, t._tTime),
            t
          );
        },
        Ft = function (t, e) {
          return (
            (Y.ScrollTrigger || Q('scrollTrigger', e)) &&
            Y.ScrollTrigger.create(e, t)
          );
        },
        Rt = function (t, e, n, i, o) {
          return (
            Ye(t, e, o),
            t._initted
              ? !n &&
                t._pt &&
                !r &&
                ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) &&
                d !== Ce.frame
                ? (rt.push(t), (t._lazy = [o, i]), 1)
                : void 0
              : 1
          );
        },
        Bt = function t(e) {
          var n = e.parent;
          return (
            n && n._ts && n._initted && !n._lock && (n.rawTime() < 0 || t(n))
          );
        },
        Wt = function (t) {
          var e = t.data;
          return 'isFromStart' === e || 'isStart' === e;
        },
        Vt = function (t, e, n, i) {
          var r = t._repeat,
            o = gt(e) || 0,
            s = t._tTime / t._tDur;
          return (
            s && !i && (t._time *= o / t._dur),
            (t._dur = o),
            (t._tDur = r
              ? r < 0
                ? 1e10
                : gt(o * (r + 1) + t._rDelay * r)
              : o),
            s > 0 && !i && jt(t, (t._tTime = t._tDur * s)),
            t.parent && Ht(t),
            n || Ot(t.parent, t),
            t
          );
        },
        Ut = function (t) {
          return t instanceof Fe ? Ot(t) : Vt(t, t._dur);
        },
        Yt = { _start: 0, endTime: J, totalDuration: J },
        Xt = function t(e, n, i) {
          var r,
            o,
            s,
            a = e.labels,
            l = e._recent || Yt,
            c = e.duration() >= k ? l.endTime(!1) : e._dur;
          return L(n) && (isNaN(n) || n in a)
            ? ((o = n.charAt(0)),
              (s = '%' === n.substr(-1)),
              (r = n.indexOf('=')),
              '<' === o || '>' === o
                ? (r >= 0 && (n = n.replace(/=/, '')),
                  ('<' === o ? l._start : l.endTime(l._repeat >= 0)) +
                    (parseFloat(n.substr(1)) || 0) *
                      (s ? (r < 0 ? l : i).totalDuration() / 100 : 1))
                : r < 0
                ? (n in a || (a[n] = c), a[n])
                : ((o = parseFloat(n.charAt(r - 1) + n.substr(r + 1))),
                  s && i && (o = (o / 100) * (z(i) ? i[0] : i).totalDuration()),
                  r > 1 ? t(e, n.substr(0, r - 1), i) + o : c + o))
            : null == n
            ? c
            : +n;
        },
        Gt = function (t, e, n) {
          var i,
            r,
            o = D(e[1]),
            s = (o ? 2 : 1) + (t < 2 ? 0 : 1),
            a = e[s];
          if ((o && (a.duration = e[1]), (a.parent = n), t)) {
            for (i = a, r = n; r && !('immediateRender' in i); )
              (i = r.vars.defaults || {}), (r = I(r.vars.inherit) && r.parent);
            (a.immediateRender = I(i.immediateRender)),
              t < 2 ? (a.runBackwards = 1) : (a.startAt = e[s - 1]);
          }
          return new Ke(e[0], a, e[s + 1]);
        },
        Qt = function (t, e) {
          return t || 0 === t ? e(t) : e;
        },
        Zt = function (t, e, n) {
          return n < t ? t : n > e ? e : n;
        },
        Kt = function (t, e) {
          return L(t) && (e = U.exec(t)) ? e[1] : '';
        },
        Jt = [].slice,
        te = function (t, e) {
          return (
            t &&
            M(t) &&
            'length' in t &&
            ((!e && !t.length) || (t.length - 1 in t && M(t[0]))) &&
            !t.nodeType &&
            t !== a
          );
        },
        ee = function (t, e, n) {
          return (
            void 0 === n && (n = []),
            t.forEach(function (t) {
              var i;
              return (L(t) && !e) || te(t, 1)
                ? (i = n).push.apply(i, ne(t))
                : n.push(t);
            }) || n
          );
        },
        ne = function (t, e, n) {
          return o && !e && o.selector
            ? o.selector(t)
            : !L(t) || n || (!l && Ee())
            ? z(t)
              ? ee(t, n)
              : te(t)
              ? Jt.call(t, 0)
              : t
              ? [t]
              : []
            : Jt.call((e || c).querySelectorAll(t), 0);
        },
        ie = function (t) {
          return (
            (t = ne(t)[0] || Z('Invalid scope') || {}),
            function (e) {
              var n = t.current || t.nativeElement || t;
              return ne(
                e,
                n.querySelectorAll
                  ? n
                  : n === t
                  ? Z('Invalid scope') || c.createElement('div')
                  : t
              );
            }
          );
        },
        re = function (t) {
          return t.sort(function () {
            return 0.5 - Math.random();
          });
        },
        oe = function (t) {
          if (O(t)) return t;
          var e = M(t) ? t : { each: t },
            n = Me(e.ease),
            i = e.from || 0,
            r = parseFloat(e.base) || 0,
            o = {},
            s = i > 0 && i < 1,
            a = isNaN(i) || s,
            l = e.axis,
            c = i,
            u = i;
          return (
            L(i)
              ? (c = u = { center: 0.5, edges: 0.5, end: 1 }[i] || 0)
              : !s && a && ((c = i[0]), (u = i[1])),
            function (t, s, d) {
              var p,
                f,
                h,
                m,
                g,
                v,
                y,
                w,
                b,
                x = (d || e).length,
                _ = o[x];
              if (!_) {
                if (!(b = 'auto' === e.grid ? 0 : (e.grid || [1, k])[1])) {
                  for (
                    y = -k;
                    y < (y = d[b++].getBoundingClientRect().left) && b < x;

                  );
                  b < x && b--;
                }
                for (
                  _ = o[x] = [],
                    p = a ? Math.min(b, x) * c - 0.5 : i % b,
                    f = b === k ? 0 : a ? (x * u) / b - 0.5 : (i / b) | 0,
                    y = 0,
                    w = k,
                    v = 0;
                  v < x;
                  v++
                )
                  (h = (v % b) - p),
                    (m = f - ((v / b) | 0)),
                    (_[v] = g =
                      l ? Math.abs('y' === l ? m : h) : E(h * h + m * m)),
                    g > y && (y = g),
                    g < w && (w = g);
                'random' === i && re(_),
                  (_.max = y - w),
                  (_.min = w),
                  (_.v = x =
                    (parseFloat(e.amount) ||
                      parseFloat(e.each) *
                        (b > x
                          ? x - 1
                          : l
                          ? 'y' === l
                            ? x / b
                            : b
                          : Math.max(b, x / b)) ||
                      0) * ('edges' === i ? -1 : 1)),
                  (_.b = x < 0 ? r - x : r),
                  (_.u = Kt(e.amount || e.each) || 0),
                  (n = n && x < 0 ? De(n) : n);
              }
              return (
                (x = (_[t] - _.min) / _.max || 0),
                gt(_.b + (n ? n(x) : x) * _.v) + _.u
              );
            }
          );
        },
        se = function (t) {
          var e = Math.pow(10, ((t + '').split('.')[1] || '').length);
          return function (n) {
            var i = gt(Math.round(parseFloat(n) / t) * t * e);
            return (i - (i % 1)) / e + (D(n) ? 0 : Kt(n));
          };
        },
        ae = function (t, e) {
          var n,
            i,
            r = z(t);
          return (
            !r &&
              M(t) &&
              ((n = r = t.radius || k),
              t.values
                ? ((t = ne(t.values)), (i = !D(t[0])) && (n *= n))
                : (t = se(t.increment))),
            Qt(
              e,
              r
                ? O(t)
                  ? function (e) {
                      return (i = t(e)), Math.abs(i - e) <= n ? i : e;
                    }
                  : function (e) {
                      for (
                        var r,
                          o,
                          s = parseFloat(i ? e.x : e),
                          a = parseFloat(i ? e.y : 0),
                          l = k,
                          c = 0,
                          u = t.length;
                        u--;

                      )
                        (r = i
                          ? (r = t[u].x - s) * r + (o = t[u].y - a) * o
                          : Math.abs(t[u] - s)) < l && ((l = r), (c = u));
                      return (
                        (c = !n || l <= n ? t[c] : e),
                        i || c === e || D(e) ? c : c + Kt(e)
                      );
                    }
                : se(t)
            )
          );
        },
        le = function (t, e, n, i) {
          return Qt(z(t) ? !e : !0 === n ? !!(n = 0) : !i, function () {
            return z(t)
              ? t[~~(Math.random() * t.length)]
              : (n = n || 1e-5) &&
                  (i = n < 1 ? Math.pow(10, (n + '').length - 2) : 1) &&
                  Math.floor(
                    Math.round(
                      (t - n / 2 + Math.random() * (e - t + 0.99 * n)) / n
                    ) *
                      n *
                      i
                  ) / i;
          });
        },
        ce = function (t, e, n) {
          return Qt(n, function (n) {
            return t[~~e(n)];
          });
        },
        ue = function (t) {
          for (var e, n, i, r, o = 0, s = ''; ~(e = t.indexOf('random(', o)); )
            (i = t.indexOf(')', e)),
              (r = '[' === t.charAt(e + 7)),
              (n = t.substr(e + 7, i - e - 7).match(r ? V : N)),
              (s +=
                t.substr(o, e - o) +
                le(r ? n : +n[0], r ? 0 : +n[1], +n[2] || 1e-5)),
              (o = i + 1);
          return s + t.substr(o, t.length - o);
        },
        de = function (t, e, n, i, r) {
          var o = e - t,
            s = i - n;
          return Qt(r, function (e) {
            return n + (((e - t) / o) * s || 0);
          });
        },
        pe = function (t, e, n) {
          var i,
            r,
            o,
            s = t.labels,
            a = k;
          for (i in s)
            (r = s[i] - e) < 0 == !!n &&
              r &&
              a > (r = Math.abs(r)) &&
              ((o = i), (a = r));
          return o;
        },
        fe = function (t, e, n) {
          var i,
            r,
            s,
            a = t.vars,
            l = a[e],
            c = o,
            u = t._ctx;
          if (l)
            return (
              (i = a[e + 'Params']),
              (r = a.callbackScope || t),
              n && rt.length && wt(),
              u && (o = u),
              (s = i ? l.apply(r, i) : l.call(r)),
              (o = c),
              s
            );
        },
        he = function (t) {
          return (
            Lt(t),
            t.scrollTrigger && t.scrollTrigger.kill(!!r),
            t.progress() < 1 && fe(t, 'onInterrupt'),
            t
          );
        },
        me = [],
        ge = function (t) {
          if (t)
            if (((t = (!t.name && t.default) || t), q() || t.headless)) {
              var e = t.name,
                n = O(t),
                i =
                  e && !n && t.init
                    ? function () {
                        this._props = [];
                      }
                    : t,
                r = {
                  init: J,
                  render: ln,
                  add: Ve,
                  kill: un,
                  modifier: cn,
                  rawVars: 0,
                },
                o = {
                  targetTest: 0,
                  get: 0,
                  getSetter: rn,
                  aliases: {},
                  register: 0,
                };
              if ((Ee(), t !== i)) {
                if (st[e]) return;
                _t(i, _t(Ct(t, r), o)),
                  Tt(i.prototype, Tt(r, Ct(t, o))),
                  (st[(i.prop = e)] = i),
                  t.targetTest && (ct.push(i), (it[e] = 1)),
                  (e =
                    ('css' === e
                      ? 'CSS'
                      : e.charAt(0).toUpperCase() + e.substr(1)) + 'Plugin');
              }
              K(e, i), t.register && t.register(Cn, i, fn);
            } else me.push(t);
        },
        ve = 255,
        ye = {
          aqua: [0, ve, ve],
          lime: [0, ve, 0],
          silver: [192, 192, 192],
          black: [0, 0, 0],
          maroon: [128, 0, 0],
          teal: [0, 128, 128],
          blue: [0, 0, ve],
          navy: [0, 0, 128],
          white: [ve, ve, ve],
          olive: [128, 128, 0],
          yellow: [ve, ve, 0],
          orange: [ve, 165, 0],
          gray: [128, 128, 128],
          purple: [128, 0, 128],
          green: [0, 128, 0],
          red: [ve, 0, 0],
          pink: [ve, 192, 203],
          cyan: [0, ve, ve],
          transparent: [ve, ve, ve, 0],
        },
        we = function (t, e, n) {
          return (
            ((6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1
              ? e + (n - e) * t * 6
              : t < 0.5
              ? n
              : 3 * t < 2
              ? e + (n - e) * (2 / 3 - t) * 6
              : e) *
              ve +
              0.5) |
            0
          );
        },
        be = function (t, e, n) {
          var i,
            r,
            o,
            s,
            a,
            l,
            c,
            u,
            d,
            p,
            f = t ? (D(t) ? [t >> 16, (t >> 8) & ve, t & ve] : 0) : ye.black;
          if (!f) {
            if (
              (',' === t.substr(-1) && (t = t.substr(0, t.length - 1)), ye[t])
            )
              f = ye[t];
            else if ('#' === t.charAt(0)) {
              if (
                (t.length < 6 &&
                  ((i = t.charAt(1)),
                  (r = t.charAt(2)),
                  (o = t.charAt(3)),
                  (t =
                    '#' +
                    i +
                    i +
                    r +
                    r +
                    o +
                    o +
                    (5 === t.length ? t.charAt(4) + t.charAt(4) : ''))),
                9 === t.length)
              )
                return [
                  (f = parseInt(t.substr(1, 6), 16)) >> 16,
                  (f >> 8) & ve,
                  f & ve,
                  parseInt(t.substr(7), 16) / 255,
                ];
              f = [
                (t = parseInt(t.substr(1), 16)) >> 16,
                (t >> 8) & ve,
                t & ve,
              ];
            } else if ('hsl' === t.substr(0, 3))
              if (((f = p = t.match(N)), e)) {
                if (~t.indexOf('='))
                  return (f = t.match(F)), n && f.length < 4 && (f[3] = 1), f;
              } else
                (s = (+f[0] % 360) / 360),
                  (a = +f[1] / 100),
                  (i =
                    2 * (l = +f[2] / 100) -
                    (r = l <= 0.5 ? l * (a + 1) : l + a - l * a)),
                  f.length > 3 && (f[3] *= 1),
                  (f[0] = we(s + 1 / 3, i, r)),
                  (f[1] = we(s, i, r)),
                  (f[2] = we(s - 1 / 3, i, r));
            else f = t.match(N) || ye.transparent;
            f = f.map(Number);
          }
          return (
            e &&
              !p &&
              ((i = f[0] / ve),
              (r = f[1] / ve),
              (o = f[2] / ve),
              (l = ((c = Math.max(i, r, o)) + (u = Math.min(i, r, o))) / 2),
              c === u
                ? (s = a = 0)
                : ((d = c - u),
                  (a = l > 0.5 ? d / (2 - c - u) : d / (c + u)),
                  (s =
                    c === i
                      ? (r - o) / d + (r < o ? 6 : 0)
                      : c === r
                      ? (o - i) / d + 2
                      : (i - r) / d + 4),
                  (s *= 60)),
              (f[0] = ~~(s + 0.5)),
              (f[1] = ~~(100 * a + 0.5)),
              (f[2] = ~~(100 * l + 0.5))),
            n && f.length < 4 && (f[3] = 1),
            f
          );
        },
        xe = function (t) {
          var e = [],
            n = [],
            i = -1;
          return (
            t.split(_e).forEach(function (t) {
              var r = t.match(R) || [];
              e.push.apply(e, r), n.push((i += r.length + 1));
            }),
            (e.c = n),
            e
          );
        },
        ke = function (t, e, n) {
          var i,
            r,
            o,
            s,
            a = '',
            l = (t + a).match(_e),
            c = e ? 'hsla(' : 'rgba(',
            u = 0;
          if (!l) return t;
          if (
            ((l = l.map(function (t) {
              return (
                (t = be(t, e, 1)) &&
                c +
                  (e
                    ? t[0] + ',' + t[1] + '%,' + t[2] + '%,' + t[3]
                    : t.join(',')) +
                  ')'
              );
            })),
            n && ((o = xe(t)), (i = n.c).join(a) !== o.c.join(a)))
          )
            for (s = (r = t.replace(_e, '1').split(R)).length - 1; u < s; u++)
              a +=
                r[u] +
                (~i.indexOf(u)
                  ? l.shift() || c + '0,0,0,0)'
                  : (o.length ? o : l.length ? l : n).shift());
          if (!r)
            for (s = (r = t.split(_e)).length - 1; u < s; u++) a += r[u] + l[u];
          return a + r[s];
        },
        _e = (function () {
          var t,
            e =
              '(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b';
          for (t in ye) e += '|' + t + '\\b';
          return new RegExp(e + ')', 'gi');
        })(),
        Te = /hsl[a]?\(/,
        Se = function (t) {
          var e,
            n = t.join(' ');
          if (((_e.lastIndex = 0), _e.test(n)))
            return (
              (e = Te.test(n)),
              (t[1] = ke(t[1], e)),
              (t[0] = ke(t[0], e, xe(t[1]))),
              !0
            );
        },
        Ce = (function () {
          var t,
            e,
            n,
            i,
            r,
            o,
            s = Date.now,
            d = 500,
            p = 33,
            h = s(),
            m = h,
            g = 1e3 / 240,
            v = g,
            y = [],
            w = function n(a) {
              var l,
                c,
                u,
                f,
                w = s() - m,
                b = !0 === a;
              if (
                ((w > d || w < 0) && (h += w - p),
                ((l = (u = (m += w) - h) - v) > 0 || b) &&
                  ((f = ++i.frame),
                  (r = u - 1e3 * i.time),
                  (i.time = u /= 1e3),
                  (v += l + (l >= g ? 4 : g - l)),
                  (c = 1)),
                b || (t = e(n)),
                c)
              )
                for (o = 0; o < y.length; o++) y[o](u, r, f, a);
            };
          return (
            (i = {
              time: 0,
              frame: 0,
              tick: function () {
                w(!0);
              },
              deltaRatio: function (t) {
                return r / (1e3 / (t || 60));
              },
              wake: function () {
                u &&
                  (!l &&
                    q() &&
                    ((a = l = window),
                    (c = a.document || {}),
                    (Y.gsap = Cn),
                    (a.gsapVersions || (a.gsapVersions = [])).push(Cn.version),
                    G(X || a.GreenSockGlobals || (!a.gsap && a) || {}),
                    me.forEach(ge)),
                  (n =
                    'undefined' != typeof requestAnimationFrame &&
                    requestAnimationFrame),
                  t && i.sleep(),
                  (e =
                    n ||
                    function (t) {
                      return setTimeout(t, (v - 1e3 * i.time + 1) | 0);
                    }),
                  (f = 1),
                  w(2));
              },
              sleep: function () {
                (n ? cancelAnimationFrame : clearTimeout)(t), (f = 0), (e = J);
              },
              lagSmoothing: function (t, e) {
                (d = t || 1 / 0), (p = Math.min(e || 33, d));
              },
              fps: function (t) {
                (g = 1e3 / (t || 240)), (v = 1e3 * i.time + g);
              },
              add: function (t, e, n) {
                var r = e
                  ? function (e, n, o, s) {
                      t(e, n, o, s), i.remove(r);
                    }
                  : t;
                return i.remove(t), y[n ? 'unshift' : 'push'](r), Ee(), r;
              },
              remove: function (t, e) {
                ~(e = y.indexOf(t)) && y.splice(e, 1) && o >= e && o--;
              },
              _listeners: y,
            }),
            i
          );
        })(),
        Ee = function () {
          return !f && Ce.wake();
        },
        $e = {},
        Ae = /^[\d.\-M][\d.\-,\s]/,
        Le = /["']/g,
        Oe = function (t) {
          for (
            var e,
              n,
              i,
              r = {},
              o = t.substr(1, t.length - 3).split(':'),
              s = o[0],
              a = 1,
              l = o.length;
            a < l;
            a++
          )
            (n = o[a]),
              (e = a !== l - 1 ? n.lastIndexOf(',') : n.length),
              (i = n.substr(0, e)),
              (r[s] = isNaN(i) ? i.replace(Le, '').trim() : +i),
              (s = n.substr(e + 1).trim());
          return r;
        },
        De = function (t) {
          return function (e) {
            return 1 - t(1 - e);
          };
        },
        Pe = function t(e, n) {
          for (var i, r = e._first; r; )
            r instanceof Fe
              ? t(r, n)
              : !r.vars.yoyoEase ||
                (r._yoyo && r._repeat) ||
                r._yoyo === n ||
                (r.timeline
                  ? t(r.timeline, n)
                  : ((i = r._ease),
                    (r._ease = r._yEase),
                    (r._yEase = i),
                    (r._yoyo = n))),
              (r = r._next);
        },
        Me = function (t, e) {
          return (
            (t &&
              (O(t)
                ? t
                : $e[t] ||
                  (function (t) {
                    var e,
                      n,
                      i,
                      r,
                      o = (t + '').split('('),
                      s = $e[o[0]];
                    return s && o.length > 1 && s.config
                      ? s.config.apply(
                          null,
                          ~t.indexOf('{')
                            ? [Oe(o[1])]
                            : ((e = t),
                              (n = e.indexOf('(') + 1),
                              (i = e.indexOf(')')),
                              (r = e.indexOf('(', n)),
                              e.substring(
                                n,
                                ~r && r < i ? e.indexOf(')', i + 1) : i
                              ))
                                .split(',')
                                .map(xt)
                        )
                      : $e._CE && Ae.test(t)
                      ? $e._CE('', t)
                      : s;
                  })(t))) ||
            e
          );
        },
        Ie = function (t, e, n, i) {
          void 0 === n &&
            (n = function (t) {
              return 1 - e(1 - t);
            }),
            void 0 === i &&
              (i = function (t) {
                return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
              });
          var r,
            o = { easeIn: e, easeOut: n, easeInOut: i };
          return (
            ht(t, function (t) {
              for (var e in (($e[t] = Y[t] = o),
              ($e[(r = t.toLowerCase())] = n),
              o))
                $e[
                  r +
                    ('easeIn' === e
                      ? '.in'
                      : 'easeOut' === e
                      ? '.out'
                      : '.inOut')
                ] = $e[t + '.' + e] = o[e];
            }),
            o
          );
        },
        qe = function (t) {
          return function (e) {
            return e < 0.5
              ? (1 - t(1 - 2 * e)) / 2
              : 0.5 + t(2 * (e - 0.5)) / 2;
          };
        },
        He = function t(e, n, i) {
          var r = n >= 1 ? n : 1,
            o = (i || (e ? 0.3 : 0.45)) / (n < 1 ? n : 1),
            s = (o / T) * (Math.asin(1 / r) || 0),
            a = function (t) {
              return 1 === t
                ? 1
                : r * Math.pow(2, -10 * t) * A((t - s) * o) + 1;
            },
            l =
              'out' === e
                ? a
                : 'in' === e
                ? function (t) {
                    return 1 - a(1 - t);
                  }
                : qe(a);
          return (
            (o = T / o),
            (l.config = function (n, i) {
              return t(e, n, i);
            }),
            l
          );
        },
        je = function t(e, n) {
          void 0 === n && (n = 1.70158);
          var i = function (t) {
              return t ? --t * t * ((n + 1) * t + n) + 1 : 0;
            },
            r =
              'out' === e
                ? i
                : 'in' === e
                ? function (t) {
                    return 1 - i(1 - t);
                  }
                : qe(i);
          return (
            (r.config = function (n) {
              return t(e, n);
            }),
            r
          );
        };
      ht('Linear,Quad,Cubic,Quart,Quint,Strong', function (t, e) {
        var n = e < 5 ? e + 1 : e;
        Ie(
          t + ',Power' + (n - 1),
          e
            ? function (t) {
                return Math.pow(t, n);
              }
            : function (t) {
                return t;
              },
          function (t) {
            return 1 - Math.pow(1 - t, n);
          },
          function (t) {
            return t < 0.5
              ? Math.pow(2 * t, n) / 2
              : 1 - Math.pow(2 * (1 - t), n) / 2;
          }
        );
      }),
        ($e.Linear.easeNone = $e.none = $e.Linear.easeIn),
        Ie('Elastic', He('in'), He('out'), He()),
        (h = 7.5625),
        (v = 2 * (g = 1 / (m = 2.75))),
        (y = 2.5 * g),
        Ie(
          'Bounce',
          function (t) {
            return 1 - w(1 - t);
          },
          (w = function (t) {
            return t < g
              ? h * t * t
              : t < v
              ? h * Math.pow(t - 1.5 / m, 2) + 0.75
              : t < y
              ? h * (t -= 2.25 / m) * t + 0.9375
              : h * Math.pow(t - 2.625 / m, 2) + 0.984375;
          })
        ),
        Ie('Expo', function (t) {
          return t ? Math.pow(2, 10 * (t - 1)) : 0;
        }),
        Ie('Circ', function (t) {
          return -(E(1 - t * t) - 1);
        }),
        Ie('Sine', function (t) {
          return 1 === t ? 1 : 1 - $(t * S);
        }),
        Ie('Back', je('in'), je('out'), je()),
        ($e.SteppedEase =
          $e.steps =
          Y.SteppedEase =
            {
              config: function (t, e) {
                void 0 === t && (t = 1);
                var n = 1 / t,
                  i = t + (e ? 0 : 1),
                  r = e ? 1 : 0;
                return function (t) {
                  return (((i * Zt(0, 0.99999999, t)) | 0) + r) * n;
                };
              },
            }),
        (x.ease = $e['quad.out']),
        ht(
          'onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt',
          function (t) {
            return (ut += t + ',' + t + 'Params,');
          }
        );
      var ze = function (t, e) {
          (this.id = C++),
            (t._gsap = this),
            (this.target = t),
            (this.harness = e),
            (this.get = e ? e.get : ft),
            (this.set = e ? e.getSetter : rn);
        },
        Ne = (function () {
          function t(t) {
            (this.vars = t),
              (this._delay = +t.delay || 0),
              (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
                ((this._rDelay = t.repeatDelay || 0),
                (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
              (this._ts = 1),
              Vt(this, +t.duration, 1, 1),
              (this.data = t.data),
              o && ((this._ctx = o), o.data.push(this)),
              f || Ce.wake();
          }
          var e = t.prototype;
          return (
            (e.delay = function (t) {
              return t || 0 === t
                ? (this.parent &&
                    this.parent.smoothChildTiming &&
                    this.startTime(this._start + t - this._delay),
                  (this._delay = t),
                  this)
                : this._delay;
            }),
            (e.duration = function (t) {
              return arguments.length
                ? this.totalDuration(
                    this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t
                  )
                : this.totalDuration() && this._dur;
            }),
            (e.totalDuration = function (t) {
              return arguments.length
                ? ((this._dirty = 0),
                  Vt(
                    this,
                    this._repeat < 0
                      ? t
                      : (t - this._repeat * this._rDelay) / (this._repeat + 1)
                  ))
                : this._tDur;
            }),
            (e.totalTime = function (t, e) {
              if ((Ee(), !arguments.length)) return this._tTime;
              var n = this._dp;
              if (n && n.smoothChildTiming && this._ts) {
                for (
                  jt(this, t), !n._dp || n.parent || zt(n, this);
                  n && n.parent;

                )
                  n.parent._time !==
                    n._start +
                      (n._ts >= 0
                        ? n._tTime / n._ts
                        : (n.totalDuration() - n._tTime) / -n._ts) &&
                    n.totalTime(n._tTime, !0),
                    (n = n.parent);
                !this.parent &&
                  this._dp.autoRemoveChildren &&
                  ((this._ts > 0 && t < this._tDur) ||
                    (this._ts < 0 && t > 0) ||
                    (!this._tDur && !t)) &&
                  Nt(this._dp, this, this._start - this._delay);
              }
              return (
                (this._tTime !== t ||
                  (!this._dur && !e) ||
                  (this._initted && Math.abs(this._zTime) === _) ||
                  (!t && !this._initted && (this.add || this._ptLookup))) &&
                  (this._ts || (this._pTime = t), bt(this, t, e)),
                this
              );
            }),
            (e.time = function (t, e) {
              return arguments.length
                ? this.totalTime(
                    Math.min(this.totalDuration(), t + Mt(this)) %
                      (this._dur + this._rDelay) || (t ? this._dur : 0),
                    e
                  )
                : this._time;
            }),
            (e.totalProgress = function (t, e) {
              return arguments.length
                ? this.totalTime(this.totalDuration() * t, e)
                : this.totalDuration()
                ? Math.min(1, this._tTime / this._tDur)
                : this.rawTime() > 0
                ? 1
                : 0;
            }),
            (e.progress = function (t, e) {
              return arguments.length
                ? this.totalTime(
                    this.duration() *
                      (!this._yoyo || 1 & this.iteration() ? t : 1 - t) +
                      Mt(this),
                    e
                  )
                : this.duration()
                ? Math.min(1, this._time / this._dur)
                : this.rawTime() > 0
                ? 1
                : 0;
            }),
            (e.iteration = function (t, e) {
              var n = this.duration() + this._rDelay;
              return arguments.length
                ? this.totalTime(this._time + (t - 1) * n, e)
                : this._repeat
                ? It(this._tTime, n) + 1
                : 1;
            }),
            (e.timeScale = function (t, e) {
              if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
              if (this._rts === t) return this;
              var n =
                this.parent && this._ts
                  ? qt(this.parent._time, this)
                  : this._tTime;
              return (
                (this._rts = +t || 0),
                (this._ts = this._ps || -1e-8 === t ? 0 : this._rts),
                this.totalTime(
                  Zt(-Math.abs(this._delay), this._tDur, n),
                  !1 !== e
                ),
                Ht(this),
                (function (t) {
                  for (var e = t.parent; e && e.parent; )
                    (e._dirty = 1), e.totalDuration(), (e = e.parent);
                  return t;
                })(this)
              );
            }),
            (e.paused = function (t) {
              return arguments.length
                ? (this._ps !== t &&
                    ((this._ps = t),
                    t
                      ? ((this._pTime =
                          this._tTime ||
                          Math.max(-this._delay, this.rawTime())),
                        (this._ts = this._act = 0))
                      : (Ee(),
                        (this._ts = this._rts),
                        this.totalTime(
                          this.parent && !this.parent.smoothChildTiming
                            ? this.rawTime()
                            : this._tTime || this._pTime,
                          1 === this.progress() &&
                            Math.abs(this._zTime) !== _ &&
                            (this._tTime -= _)
                        ))),
                  this)
                : this._ps;
            }),
            (e.startTime = function (t) {
              if (arguments.length) {
                this._start = t;
                var e = this.parent || this._dp;
                return (
                  e &&
                    (e._sort || !this.parent) &&
                    Nt(e, this, t - this._delay),
                  this
                );
              }
              return this._start;
            }),
            (e.endTime = function (t) {
              return (
                this._start +
                (I(t) ? this.totalDuration() : this.duration()) /
                  Math.abs(this._ts || 1)
              );
            }),
            (e.rawTime = function (t) {
              var e = this.parent || this._dp;
              return e
                ? t &&
                  (!this._ts ||
                    (this._repeat && this._time && this.totalProgress() < 1))
                  ? this._tTime % (this._dur + this._rDelay)
                  : this._ts
                  ? qt(e.rawTime(t), this)
                  : this._tTime
                : this._tTime;
            }),
            (e.revert = function (t) {
              void 0 === t && (t = nt);
              var e = r;
              return (
                (r = t),
                (this._initted || this._startAt) &&
                  (this.timeline && this.timeline.revert(t),
                  this.totalTime(-0.01, t.suppressEvents)),
                'nested' !== this.data && !1 !== t.kill && this.kill(),
                (r = e),
                this
              );
            }),
            (e.globalTime = function (t) {
              for (var e = this, n = arguments.length ? t : e.rawTime(); e; )
                (n = e._start + n / (Math.abs(e._ts) || 1)), (e = e._dp);
              return !this.parent && this._sat ? this._sat.globalTime(t) : n;
            }),
            (e.repeat = function (t) {
              return arguments.length
                ? ((this._repeat = t === 1 / 0 ? -2 : t), Ut(this))
                : -2 === this._repeat
                ? 1 / 0
                : this._repeat;
            }),
            (e.repeatDelay = function (t) {
              if (arguments.length) {
                var e = this._time;
                return (this._rDelay = t), Ut(this), e ? this.time(e) : this;
              }
              return this._rDelay;
            }),
            (e.yoyo = function (t) {
              return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
            }),
            (e.seek = function (t, e) {
              return this.totalTime(Xt(this, t), I(e));
            }),
            (e.restart = function (t, e) {
              return this.play().totalTime(t ? -this._delay : 0, I(e));
            }),
            (e.play = function (t, e) {
              return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
            }),
            (e.reverse = function (t, e) {
              return (
                null != t && this.seek(t || this.totalDuration(), e),
                this.reversed(!0).paused(!1)
              );
            }),
            (e.pause = function (t, e) {
              return null != t && this.seek(t, e), this.paused(!0);
            }),
            (e.resume = function () {
              return this.paused(!1);
            }),
            (e.reversed = function (t) {
              return arguments.length
                ? (!!t !== this.reversed() &&
                    this.timeScale(-this._rts || (t ? -1e-8 : 0)),
                  this)
                : this._rts < 0;
            }),
            (e.invalidate = function () {
              return (
                (this._initted = this._act = 0), (this._zTime = -1e-8), this
              );
            }),
            (e.isActive = function () {
              var t,
                e = this.parent || this._dp,
                n = this._start;
              return !(
                e &&
                !(
                  this._ts &&
                  this._initted &&
                  e.isActive() &&
                  (t = e.rawTime(!0)) >= n &&
                  t < this.endTime(!0) - _
                )
              );
            }),
            (e.eventCallback = function (t, e, n) {
              var i = this.vars;
              return arguments.length > 1
                ? (e
                    ? ((i[t] = e),
                      n && (i[t + 'Params'] = n),
                      'onUpdate' === t && (this._onUpdate = e))
                    : delete i[t],
                  this)
                : i[t];
            }),
            (e.then = function (t) {
              var e = this;
              return new Promise(function (n) {
                var i = O(t) ? t : kt,
                  r = function () {
                    var t = e.then;
                    (e.then = null),
                      O(i) && (i = i(e)) && (i.then || i === e) && (e.then = t),
                      n(i),
                      (e.then = t);
                  };
                (e._initted && 1 === e.totalProgress() && e._ts >= 0) ||
                (!e._tTime && e._ts < 0)
                  ? r()
                  : (e._prom = r);
              });
            }),
            (e.kill = function () {
              he(this);
            }),
            t
          );
        })();
      _t(Ne.prototype, {
        _time: 0,
        _start: 0,
        _end: 0,
        _tTime: 0,
        _tDur: 0,
        _dirty: 0,
        _repeat: 0,
        _yoyo: !1,
        parent: null,
        _initted: !1,
        _rDelay: 0,
        _ts: 1,
        _dp: 0,
        ratio: 0,
        _zTime: -1e-8,
        _prom: 0,
        _ps: !1,
        _rts: 1,
      });
      var Fe = (function (n) {
        function i(e, i) {
          var r;
          return (
            void 0 === e && (e = {}),
            ((r = n.call(this, e) || this).labels = {}),
            (r.smoothChildTiming = !!e.smoothChildTiming),
            (r.autoRemoveChildren = !!e.autoRemoveChildren),
            (r._sort = I(e.sortChildren)),
            s && Nt(e.parent || s, t(r), i),
            e.reversed && r.reverse(),
            e.paused && r.paused(!0),
            e.scrollTrigger && Ft(t(r), e.scrollTrigger),
            r
          );
        }
        e(i, n);
        var o = i.prototype;
        return (
          (o.to = function (t, e, n) {
            return Gt(0, arguments, this), this;
          }),
          (o.from = function (t, e, n) {
            return Gt(1, arguments, this), this;
          }),
          (o.fromTo = function (t, e, n, i) {
            return Gt(2, arguments, this), this;
          }),
          (o.set = function (t, e, n) {
            return (
              (e.duration = 0),
              (e.parent = this),
              Et(e).repeatDelay || (e.repeat = 0),
              (e.immediateRender = !!e.immediateRender),
              new Ke(t, e, Xt(this, n), 1),
              this
            );
          }),
          (o.call = function (t, e, n) {
            return Nt(this, Ke.delayedCall(0, t, e), n);
          }),
          (o.staggerTo = function (t, e, n, i, r, o, s) {
            return (
              (n.duration = e),
              (n.stagger = n.stagger || i),
              (n.onComplete = o),
              (n.onCompleteParams = s),
              (n.parent = this),
              new Ke(t, n, Xt(this, r)),
              this
            );
          }),
          (o.staggerFrom = function (t, e, n, i, r, o, s) {
            return (
              (n.runBackwards = 1),
              (Et(n).immediateRender = I(n.immediateRender)),
              this.staggerTo(t, e, n, i, r, o, s)
            );
          }),
          (o.staggerFromTo = function (t, e, n, i, r, o, s, a) {
            return (
              (i.startAt = n),
              (Et(i).immediateRender = I(i.immediateRender)),
              this.staggerTo(t, e, i, r, o, s, a)
            );
          }),
          (o.render = function (t, e, n) {
            var i,
              o,
              a,
              l,
              c,
              u,
              d,
              p,
              f,
              h,
              m,
              g,
              v = this._time,
              y = this._dirty ? this.totalDuration() : this._tDur,
              w = this._dur,
              b = t <= 0 ? 0 : gt(t),
              x = this._zTime < 0 != t < 0 && (this._initted || !w);
            if (
              (this !== s && b > y && t >= 0 && (b = y),
              b !== this._tTime || n || x)
            ) {
              if (
                (v !== this._time &&
                  w &&
                  ((b += this._time - v), (t += this._time - v)),
                (i = b),
                (f = this._start),
                (u = !(p = this._ts)),
                x && (w || (v = this._zTime), (t || !e) && (this._zTime = t)),
                this._repeat)
              ) {
                if (
                  ((m = this._yoyo),
                  (c = w + this._rDelay),
                  this._repeat < -1 && t < 0)
                )
                  return this.totalTime(100 * c + t, e, n);
                if (
                  ((i = gt(b % c)),
                  b === y
                    ? ((l = this._repeat), (i = w))
                    : ((l = ~~(b / c)) && l === b / c && ((i = w), l--),
                      i > w && (i = w)),
                  (h = It(this._tTime, c)),
                  !v &&
                    this._tTime &&
                    h !== l &&
                    this._tTime - h * c - this._dur <= 0 &&
                    (h = l),
                  m && 1 & l && ((i = w - i), (g = 1)),
                  l !== h && !this._lock)
                ) {
                  var k = m && 1 & h,
                    T = k === (m && 1 & l);
                  if (
                    (l < h && (k = !k),
                    (v = k ? 0 : b % w ? w : b),
                    (this._lock = 1),
                    (this.render(v || (g ? 0 : gt(l * c)), e, !w)._lock = 0),
                    (this._tTime = b),
                    !e && this.parent && fe(this, 'onRepeat'),
                    this.vars.repeatRefresh &&
                      !g &&
                      (this.invalidate()._lock = 1),
                    (v && v !== this._time) ||
                      u !== !this._ts ||
                      (this.vars.onRepeat && !this.parent && !this._act))
                  )
                    return this;
                  if (
                    ((w = this._dur),
                    (y = this._tDur),
                    T &&
                      ((this._lock = 2),
                      (v = k ? w : -1e-4),
                      this.render(v, !0),
                      this.vars.repeatRefresh && !g && this.invalidate()),
                    (this._lock = 0),
                    !this._ts && !u)
                  )
                    return this;
                  Pe(this, g);
                }
              }
              if (
                (this._hasPause &&
                  !this._forcing &&
                  this._lock < 2 &&
                  ((d = (function (t, e, n) {
                    var i;
                    if (n > e)
                      for (i = t._first; i && i._start <= n; ) {
                        if ('isPause' === i.data && i._start > e) return i;
                        i = i._next;
                      }
                    else
                      for (i = t._last; i && i._start >= n; ) {
                        if ('isPause' === i.data && i._start < e) return i;
                        i = i._prev;
                      }
                  })(this, gt(v), gt(i))),
                  d && (b -= i - (i = d._start))),
                (this._tTime = b),
                (this._time = i),
                (this._act = !p),
                this._initted ||
                  ((this._onUpdate = this.vars.onUpdate),
                  (this._initted = 1),
                  (this._zTime = t),
                  (v = 0)),
                !v && i && !e && !l && (fe(this, 'onStart'), this._tTime !== b))
              )
                return this;
              if (i >= v && t >= 0)
                for (o = this._first; o; ) {
                  if (
                    ((a = o._next),
                    (o._act || i >= o._start) && o._ts && d !== o)
                  ) {
                    if (o.parent !== this) return this.render(t, e, n);
                    if (
                      (o.render(
                        o._ts > 0
                          ? (i - o._start) * o._ts
                          : (o._dirty ? o.totalDuration() : o._tDur) +
                              (i - o._start) * o._ts,
                        e,
                        n
                      ),
                      i !== this._time || (!this._ts && !u))
                    ) {
                      (d = 0), a && (b += this._zTime = -1e-8);
                      break;
                    }
                  }
                  o = a;
                }
              else {
                o = this._last;
                for (var S = t < 0 ? t : i; o; ) {
                  if (
                    ((a = o._prev), (o._act || S <= o._end) && o._ts && d !== o)
                  ) {
                    if (o.parent !== this) return this.render(t, e, n);
                    if (
                      (o.render(
                        o._ts > 0
                          ? (S - o._start) * o._ts
                          : (o._dirty ? o.totalDuration() : o._tDur) +
                              (S - o._start) * o._ts,
                        e,
                        n || (r && (o._initted || o._startAt))
                      ),
                      i !== this._time || (!this._ts && !u))
                    ) {
                      (d = 0), a && (b += this._zTime = S ? -1e-8 : _);
                      break;
                    }
                  }
                  o = a;
                }
              }
              if (
                d &&
                !e &&
                (this.pause(),
                (d.render(i >= v ? 0 : -1e-8)._zTime = i >= v ? 1 : -1),
                this._ts)
              )
                return (this._start = f), Ht(this), this.render(t, e, n);
              this._onUpdate && !e && fe(this, 'onUpdate', !0),
                ((b === y && this._tTime >= this.totalDuration()) ||
                  (!b && v)) &&
                  ((f !== this._start && Math.abs(p) === Math.abs(this._ts)) ||
                    this._lock ||
                    ((t || !w) &&
                      ((b === y && this._ts > 0) || (!b && this._ts < 0)) &&
                      Lt(this, 1),
                    e ||
                      (t < 0 && !v) ||
                      (!b && !v && y) ||
                      (fe(
                        this,
                        b === y && t >= 0 ? 'onComplete' : 'onReverseComplete',
                        !0
                      ),
                      this._prom &&
                        !(b < y && this.timeScale() > 0) &&
                        this._prom())));
            }
            return this;
          }),
          (o.add = function (t, e) {
            var n = this;
            if ((D(e) || (e = Xt(this, e, t)), !(t instanceof Ne))) {
              if (z(t))
                return (
                  t.forEach(function (t) {
                    return n.add(t, e);
                  }),
                  this
                );
              if (L(t)) return this.addLabel(t, e);
              if (!O(t)) return this;
              t = Ke.delayedCall(0, t);
            }
            return this !== t ? Nt(this, t, e) : this;
          }),
          (o.getChildren = function (t, e, n, i) {
            void 0 === t && (t = !0),
              void 0 === e && (e = !0),
              void 0 === n && (n = !0),
              void 0 === i && (i = -k);
            for (var r = [], o = this._first; o; )
              o._start >= i &&
                (o instanceof Ke
                  ? e && r.push(o)
                  : (n && r.push(o),
                    t && r.push.apply(r, o.getChildren(!0, e, n)))),
                (o = o._next);
            return r;
          }),
          (o.getById = function (t) {
            for (var e = this.getChildren(1, 1, 1), n = e.length; n--; )
              if (e[n].vars.id === t) return e[n];
          }),
          (o.remove = function (t) {
            return L(t)
              ? this.removeLabel(t)
              : O(t)
              ? this.killTweensOf(t)
              : (At(this, t),
                t === this._recent && (this._recent = this._last),
                Ot(this));
          }),
          (o.totalTime = function (t, e) {
            return arguments.length
              ? ((this._forcing = 1),
                !this._dp &&
                  this._ts &&
                  (this._start = gt(
                    Ce.time -
                      (this._ts > 0
                        ? t / this._ts
                        : (this.totalDuration() - t) / -this._ts)
                  )),
                n.prototype.totalTime.call(this, t, e),
                (this._forcing = 0),
                this)
              : this._tTime;
          }),
          (o.addLabel = function (t, e) {
            return (this.labels[t] = Xt(this, e)), this;
          }),
          (o.removeLabel = function (t) {
            return delete this.labels[t], this;
          }),
          (o.addPause = function (t, e, n) {
            var i = Ke.delayedCall(0, e || J, n);
            return (
              (i.data = 'isPause'),
              (this._hasPause = 1),
              Nt(this, i, Xt(this, t))
            );
          }),
          (o.removePause = function (t) {
            var e = this._first;
            for (t = Xt(this, t); e; )
              e._start === t && 'isPause' === e.data && Lt(e), (e = e._next);
          }),
          (o.killTweensOf = function (t, e, n) {
            for (var i = this.getTweensOf(t, n), r = i.length; r--; )
              Re !== i[r] && i[r].kill(t, e);
            return this;
          }),
          (o.getTweensOf = function (t, e) {
            for (var n, i = [], r = ne(t), o = this._first, s = D(e); o; )
              o instanceof Ke
                ? yt(o._targets, r) &&
                  (s
                    ? (!Re || (o._initted && o._ts)) &&
                      o.globalTime(0) <= e &&
                      o.globalTime(o.totalDuration()) > e
                    : !e || o.isActive()) &&
                  i.push(o)
                : (n = o.getTweensOf(r, e)).length && i.push.apply(i, n),
                (o = o._next);
            return i;
          }),
          (o.tweenTo = function (t, e) {
            e = e || {};
            var n,
              i = this,
              r = Xt(i, t),
              o = e,
              s = o.startAt,
              a = o.onStart,
              l = o.onStartParams,
              c = o.immediateRender,
              u = Ke.to(
                i,
                _t(
                  {
                    ease: e.ease || 'none',
                    lazy: !1,
                    immediateRender: !1,
                    time: r,
                    overwrite: 'auto',
                    duration:
                      e.duration ||
                      Math.abs(
                        (r - (s && 'time' in s ? s.time : i._time)) /
                          i.timeScale()
                      ) ||
                      _,
                    onStart: function () {
                      if ((i.pause(), !n)) {
                        var t =
                          e.duration ||
                          Math.abs(
                            (r - (s && 'time' in s ? s.time : i._time)) /
                              i.timeScale()
                          );
                        u._dur !== t && Vt(u, t, 0, 1).render(u._time, !0, !0),
                          (n = 1);
                      }
                      a && a.apply(u, l || []);
                    },
                  },
                  e
                )
              );
            return c ? u.render(0) : u;
          }),
          (o.tweenFromTo = function (t, e, n) {
            return this.tweenTo(e, _t({ startAt: { time: Xt(this, t) } }, n));
          }),
          (o.recent = function () {
            return this._recent;
          }),
          (o.nextLabel = function (t) {
            return void 0 === t && (t = this._time), pe(this, Xt(this, t));
          }),
          (o.previousLabel = function (t) {
            return void 0 === t && (t = this._time), pe(this, Xt(this, t), 1);
          }),
          (o.currentLabel = function (t) {
            return arguments.length
              ? this.seek(t, !0)
              : this.previousLabel(this._time + _);
          }),
          (o.shiftChildren = function (t, e, n) {
            void 0 === n && (n = 0);
            for (var i, r = this._first, o = this.labels; r; )
              r._start >= n && ((r._start += t), (r._end += t)), (r = r._next);
            if (e) for (i in o) o[i] >= n && (o[i] += t);
            return Ot(this);
          }),
          (o.invalidate = function (t) {
            var e = this._first;
            for (this._lock = 0; e; ) e.invalidate(t), (e = e._next);
            return n.prototype.invalidate.call(this, t);
          }),
          (o.clear = function (t) {
            void 0 === t && (t = !0);
            for (var e, n = this._first; n; )
              (e = n._next), this.remove(n), (n = e);
            return (
              this._dp && (this._time = this._tTime = this._pTime = 0),
              t && (this.labels = {}),
              Ot(this)
            );
          }),
          (o.totalDuration = function (t) {
            var e,
              n,
              i,
              r = 0,
              o = this,
              a = o._last,
              l = k;
            if (arguments.length)
              return o.timeScale(
                (o._repeat < 0 ? o.duration() : o.totalDuration()) /
                  (o.reversed() ? -t : t)
              );
            if (o._dirty) {
              for (i = o.parent; a; )
                (e = a._prev),
                  a._dirty && a.totalDuration(),
                  (n = a._start) > l && o._sort && a._ts && !o._lock
                    ? ((o._lock = 1), (Nt(o, a, n - a._delay, 1)._lock = 0))
                    : (l = n),
                  n < 0 &&
                    a._ts &&
                    ((r -= n),
                    ((!i && !o._dp) || (i && i.smoothChildTiming)) &&
                      ((o._start += n / o._ts),
                      (o._time -= n),
                      (o._tTime -= n)),
                    o.shiftChildren(-n, !1, -Infinity),
                    (l = 0)),
                  a._end > r && a._ts && (r = a._end),
                  (a = e);
              Vt(o, o === s && o._time > r ? o._time : r, 1, 1), (o._dirty = 0);
            }
            return o._tDur;
          }),
          (i.updateRoot = function (t) {
            if ((s._ts && (bt(s, qt(t, s)), (d = Ce.frame)), Ce.frame >= lt)) {
              lt += b.autoSleep || 120;
              var e = s._first;
              if ((!e || !e._ts) && b.autoSleep && Ce._listeners.length < 2) {
                for (; e && !e._ts; ) e = e._next;
                e || Ce.sleep();
              }
            }
          }),
          i
        );
      })(Ne);
      _t(Fe.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
      var Re,
        Be,
        We = function (t, e, n, i, r, o, s) {
          var a,
            l,
            c,
            u,
            d,
            p,
            f,
            h,
            m = new fn(this._pt, t, e, 0, 1, an, null, r),
            g = 0,
            v = 0;
          for (
            m.b = n,
              m.e = i,
              n += '',
              (f = ~(i += '').indexOf('random(')) && (i = ue(i)),
              o && (o((h = [n, i]), t, e), (n = h[0]), (i = h[1])),
              l = n.match(B) || [];
            (a = B.exec(i));

          )
            (u = a[0]),
              (d = i.substring(g, a.index)),
              c ? (c = (c + 1) % 5) : 'rgba(' === d.substr(-5) && (c = 1),
              u !== l[v++] &&
                ((p = parseFloat(l[v - 1]) || 0),
                (m._pt = {
                  _next: m._pt,
                  p: d || 1 === v ? d : ',',
                  s: p,
                  c: '=' === u.charAt(1) ? vt(p, u) - p : parseFloat(u) - p,
                  m: c && c < 4 ? Math.round : 0,
                }),
                (g = B.lastIndex));
          return (
            (m.c = g < i.length ? i.substring(g, i.length) : ''),
            (m.fp = s),
            (W.test(i) || f) && (m.e = 0),
            (this._pt = m),
            m
          );
        },
        Ve = function (t, e, n, i, r, o, s, a, l, c) {
          O(i) && (i = i(r || 0, t, o));
          var u,
            d = t[e],
            p =
              'get' !== n
                ? n
                : O(d)
                ? l
                  ? t[
                      e.indexOf('set') || !O(t['get' + e.substr(3)])
                        ? e
                        : 'get' + e.substr(3)
                    ](l)
                  : t[e]()
                : d,
            f = O(d) ? (l ? en : tn) : Je;
          if (
            (L(i) &&
              (~i.indexOf('random(') && (i = ue(i)),
              '=' === i.charAt(1) &&
                ((u = vt(p, i) + (Kt(p) || 0)) || 0 === u) &&
                (i = u)),
            !c || p !== i || Be)
          )
            return isNaN(p * i) || '' === i
              ? (!d && !(e in t) && Q(e, i),
                We.call(this, t, e, p, i, f, a || b.stringFilter, l))
              : ((u = new fn(
                  this._pt,
                  t,
                  e,
                  +p || 0,
                  i - (p || 0),
                  'boolean' == typeof d ? sn : on,
                  0,
                  f
                )),
                l && (u.fp = l),
                s && u.modifier(s, this, t),
                (this._pt = u));
        },
        Ue = function (t, e, n, i, r, o) {
          var s, a, l, c;
          if (
            st[t] &&
            !1 !==
              (s = new st[t]()).init(
                r,
                s.rawVars
                  ? e[t]
                  : (function (t, e, n, i, r) {
                      if (
                        (O(t) && (t = Ge(t, r, e, n, i)),
                        !M(t) || (t.style && t.nodeType) || z(t) || j(t))
                      )
                        return L(t) ? Ge(t, r, e, n, i) : t;
                      var o,
                        s = {};
                      for (o in t) s[o] = Ge(t[o], r, e, n, i);
                      return s;
                    })(e[t], i, r, o, n),
                n,
                i,
                o
              ) &&
            ((n._pt = a =
              new fn(n._pt, r, t, 0, 1, s.render, s, 0, s.priority)),
            n !== p)
          )
            for (
              l = n._ptLookup[n._targets.indexOf(r)], c = s._props.length;
              c--;

            )
              l[s._props[c]] = a;
          return s;
        },
        Ye = function t(e, n, o) {
          var a,
            l,
            c,
            u,
            d,
            p,
            f,
            h,
            m,
            g,
            v,
            y,
            w,
            b = e.vars,
            T = b.ease,
            S = b.startAt,
            C = b.immediateRender,
            E = b.lazy,
            $ = b.onUpdate,
            A = b.runBackwards,
            L = b.yoyoEase,
            O = b.keyframes,
            D = b.autoRevert,
            P = e._dur,
            M = e._startAt,
            q = e._targets,
            H = e.parent,
            j = H && 'nested' === H.data ? H.vars.targets : q,
            z = 'auto' === e._overwrite && !i,
            N = e.timeline;
          if (
            (N && (!O || !T) && (T = 'none'),
            (e._ease = Me(T, x.ease)),
            (e._yEase = L ? De(Me(!0 === L ? T : L, x.ease)) : 0),
            L &&
              e._yoyo &&
              !e._repeat &&
              ((L = e._yEase), (e._yEase = e._ease), (e._ease = L)),
            (e._from = !N && !!b.runBackwards),
            !N || (O && !b.stagger))
          ) {
            if (
              ((y = (h = q[0] ? pt(q[0]).harness : 0) && b[h.prop]),
              (a = Ct(b, it)),
              M &&
                (M._zTime < 0 && M.progress(1),
                n < 0 && A && C && !D
                  ? M.render(-1, !0)
                  : M.revert(A && P ? et : tt),
                (M._lazy = 0)),
              S)
            ) {
              if (
                (Lt(
                  (e._startAt = Ke.set(
                    q,
                    _t(
                      {
                        data: 'isStart',
                        overwrite: !1,
                        parent: H,
                        immediateRender: !0,
                        lazy: !M && I(E),
                        startAt: null,
                        delay: 0,
                        onUpdate:
                          $ &&
                          function () {
                            return fe(e, 'onUpdate');
                          },
                        stagger: 0,
                      },
                      S
                    )
                  ))
                ),
                (e._startAt._dp = 0),
                (e._startAt._sat = e),
                n < 0 && (r || (!C && !D)) && e._startAt.revert(et),
                C && P && n <= 0 && o <= 0)
              )
                return void (n && (e._zTime = n));
            } else if (A && P && !M)
              if (
                (n && (C = !1),
                (c = _t(
                  {
                    overwrite: !1,
                    data: 'isFromStart',
                    lazy: C && !M && I(E),
                    immediateRender: C,
                    stagger: 0,
                    parent: H,
                  },
                  a
                )),
                y && (c[h.prop] = y),
                Lt((e._startAt = Ke.set(q, c))),
                (e._startAt._dp = 0),
                (e._startAt._sat = e),
                n < 0 &&
                  (r ? e._startAt.revert(et) : e._startAt.render(-1, !0)),
                (e._zTime = n),
                C)
              ) {
                if (!n) return;
              } else t(e._startAt, _, _);
            for (
              e._pt = e._ptCache = 0, E = (P && I(E)) || (E && !P), l = 0;
              l < q.length;
              l++
            ) {
              if (
                ((f = (d = q[l])._gsap || dt(q)[l]._gsap),
                (e._ptLookup[l] = g = {}),
                ot[f.id] && rt.length && wt(),
                (v = j === q ? l : j.indexOf(d)),
                h &&
                  !1 !== (m = new h()).init(d, y || a, e, v, j) &&
                  ((e._pt = u =
                    new fn(e._pt, d, m.name, 0, 1, m.render, m, 0, m.priority)),
                  m._props.forEach(function (t) {
                    g[t] = u;
                  }),
                  m.priority && (p = 1)),
                !h || y)
              )
                for (c in a)
                  st[c] && (m = Ue(c, a, e, v, d, j))
                    ? m.priority && (p = 1)
                    : (g[c] = u =
                        Ve.call(e, d, c, 'get', a[c], v, j, 0, b.stringFilter));
              e._op && e._op[l] && e.kill(d, e._op[l]),
                z &&
                  e._pt &&
                  ((Re = e),
                  s.killTweensOf(d, g, e.globalTime(n)),
                  (w = !e.parent),
                  (Re = 0)),
                e._pt && E && (ot[f.id] = 1);
            }
            p && pn(e), e._onInit && e._onInit(e);
          }
          (e._onUpdate = $),
            (e._initted = (!e._op || e._pt) && !w),
            O && n <= 0 && N.render(k, !0, !0);
        },
        Xe = function (t, e, n, i) {
          var r,
            o,
            s = e.ease || i || 'power1.inOut';
          if (z(e))
            (o = n[t] || (n[t] = [])),
              e.forEach(function (t, n) {
                return o.push({ t: (n / (e.length - 1)) * 100, v: t, e: s });
              });
          else
            for (r in e)
              (o = n[r] || (n[r] = [])),
                'ease' === r || o.push({ t: parseFloat(t), v: e[r], e: s });
        },
        Ge = function (t, e, n, i, r) {
          return O(t)
            ? t.call(e, n, i, r)
            : L(t) && ~t.indexOf('random(')
            ? ue(t)
            : t;
        },
        Qe = ut + 'repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert',
        Ze = {};
      ht(Qe + ',id,stagger,delay,duration,paused,scrollTrigger', function (t) {
        return (Ze[t] = 1);
      });
      var Ke = (function (n) {
        function o(e, r, o, a) {
          var l;
          'number' == typeof r && ((o.duration = r), (r = o), (o = null));
          var c,
            u,
            d,
            p,
            f,
            h,
            m,
            g,
            v = (l = n.call(this, a ? r : Et(r)) || this).vars,
            y = v.duration,
            w = v.delay,
            x = v.immediateRender,
            k = v.stagger,
            _ = v.overwrite,
            T = v.keyframes,
            S = v.defaults,
            C = v.scrollTrigger,
            E = v.yoyoEase,
            $ = r.parent || s,
            A = (z(e) || j(e) ? D(e[0]) : 'length' in r) ? [e] : ne(e);
          if (
            ((l._targets = A.length
              ? dt(A)
              : Z(
                  'GSAP target ' + e + ' not found. https://gsap.com',
                  !b.nullTargetWarn
                ) || []),
            (l._ptLookup = []),
            (l._overwrite = _),
            T || k || H(y) || H(w))
          ) {
            if (
              ((r = l.vars),
              (c = l.timeline =
                new Fe({
                  data: 'nested',
                  defaults: S || {},
                  targets: $ && 'nested' === $.data ? $.vars.targets : A,
                })).kill(),
              (c.parent = c._dp = t(l)),
              (c._start = 0),
              k || H(y) || H(w))
            ) {
              if (((p = A.length), (m = k && oe(k)), M(k)))
                for (f in k) ~Qe.indexOf(f) && (g || (g = {}), (g[f] = k[f]));
              for (u = 0; u < p; u++)
                ((d = Ct(r, Ze)).stagger = 0),
                  E && (d.yoyoEase = E),
                  g && Tt(d, g),
                  (h = A[u]),
                  (d.duration = +Ge(y, t(l), u, h, A)),
                  (d.delay = (+Ge(w, t(l), u, h, A) || 0) - l._delay),
                  !k &&
                    1 === p &&
                    d.delay &&
                    ((l._delay = w = d.delay), (l._start += w), (d.delay = 0)),
                  c.to(h, d, m ? m(u, h, A) : 0),
                  (c._ease = $e.none);
              c.duration() ? (y = w = 0) : (l.timeline = 0);
            } else if (T) {
              Et(_t(c.vars.defaults, { ease: 'none' })),
                (c._ease = Me(T.ease || r.ease || 'none'));
              var L,
                O,
                P,
                q = 0;
              if (z(T))
                T.forEach(function (t) {
                  return c.to(A, t, '>');
                }),
                  c.duration();
              else {
                for (f in ((d = {}), T))
                  'ease' === f ||
                    'easeEach' === f ||
                    Xe(f, T[f], d, T.easeEach);
                for (f in d)
                  for (
                    L = d[f].sort(function (t, e) {
                      return t.t - e.t;
                    }),
                      q = 0,
                      u = 0;
                    u < L.length;
                    u++
                  )
                    ((P = {
                      ease: (O = L[u]).e,
                      duration: ((O.t - (u ? L[u - 1].t : 0)) / 100) * y,
                    })[f] = O.v),
                      c.to(A, P, q),
                      (q += P.duration);
                c.duration() < y && c.to({}, { duration: y - c.duration() });
              }
            }
            y || l.duration((y = c.duration()));
          } else l.timeline = 0;
          return (
            !0 !== _ || i || ((Re = t(l)), s.killTweensOf(A), (Re = 0)),
            Nt($, t(l), o),
            r.reversed && l.reverse(),
            r.paused && l.paused(!0),
            (x ||
              (!y &&
                !T &&
                l._start === gt($._time) &&
                I(x) &&
                Pt(t(l)) &&
                'nested' !== $.data)) &&
              ((l._tTime = -1e-8), l.render(Math.max(0, -w) || 0)),
            C && Ft(t(l), C),
            l
          );
        }
        e(o, n);
        var a = o.prototype;
        return (
          (a.render = function (t, e, n) {
            var i,
              o,
              s,
              a,
              l,
              c,
              u,
              d,
              p,
              f = this._time,
              h = this._tDur,
              m = this._dur,
              g = t < 0,
              v = t > h - _ && !g ? h : t < _ ? 0 : t;
            if (m) {
              if (
                v !== this._tTime ||
                !t ||
                n ||
                (!this._initted && this._tTime) ||
                (this._startAt && this._zTime < 0 !== g)
              ) {
                if (((i = v), (d = this.timeline), this._repeat)) {
                  if (((a = m + this._rDelay), this._repeat < -1 && g))
                    return this.totalTime(100 * a + t, e, n);
                  if (
                    ((i = gt(v % a)),
                    v === h
                      ? ((s = this._repeat), (i = m))
                      : ((s = ~~(v / a)) && s === gt(v / a) && ((i = m), s--),
                        i > m && (i = m)),
                    (c = this._yoyo && 1 & s) &&
                      ((p = this._yEase), (i = m - i)),
                    (l = It(this._tTime, a)),
                    i === f && !n && this._initted && s === l)
                  )
                    return (this._tTime = v), this;
                  s !== l &&
                    (d && this._yEase && Pe(d, c),
                    this.vars.repeatRefresh &&
                      !c &&
                      !this._lock &&
                      this._time !== a &&
                      this._initted &&
                      ((this._lock = n = 1),
                      (this.render(gt(a * s), !0).invalidate()._lock = 0)));
                }
                if (!this._initted) {
                  if (Rt(this, g ? t : i, n, e, v))
                    return (this._tTime = 0), this;
                  if (
                    !(
                      f === this._time ||
                      (n && this.vars.repeatRefresh && s !== l)
                    )
                  )
                    return this;
                  if (m !== this._dur) return this.render(t, e, n);
                }
                if (
                  ((this._tTime = v),
                  (this._time = i),
                  !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                  (this.ratio = u = (p || this._ease)(i / m)),
                  this._from && (this.ratio = u = 1 - u),
                  i &&
                    !f &&
                    !e &&
                    !s &&
                    (fe(this, 'onStart'), this._tTime !== v))
                )
                  return this;
                for (o = this._pt; o; ) o.r(u, o.d), (o = o._next);
                (d &&
                  d.render(
                    t < 0 ? t : d._dur * d._ease(i / this._dur),
                    e,
                    n
                  )) ||
                  (this._startAt && (this._zTime = t)),
                  this._onUpdate &&
                    !e &&
                    (g && Dt(this, t, 0, n), fe(this, 'onUpdate')),
                  this._repeat &&
                    s !== l &&
                    this.vars.onRepeat &&
                    !e &&
                    this.parent &&
                    fe(this, 'onRepeat'),
                  (v !== this._tDur && v) ||
                    this._tTime !== v ||
                    (g && !this._onUpdate && Dt(this, t, 0, !0),
                    (t || !m) &&
                      ((v === this._tDur && this._ts > 0) ||
                        (!v && this._ts < 0)) &&
                      Lt(this, 1),
                    e ||
                      (g && !f) ||
                      !(v || f || c) ||
                      (fe(
                        this,
                        v === h ? 'onComplete' : 'onReverseComplete',
                        !0
                      ),
                      this._prom &&
                        !(v < h && this.timeScale() > 0) &&
                        this._prom()));
              }
            } else
              !(function (t, e, n, i) {
                var o,
                  s,
                  a,
                  l = t.ratio,
                  c =
                    e < 0 ||
                    (!e &&
                      ((!t._start && Bt(t) && (t._initted || !Wt(t))) ||
                        ((t._ts < 0 || t._dp._ts < 0) && !Wt(t))))
                      ? 0
                      : 1,
                  u = t._rDelay,
                  d = 0;
                if (
                  (u &&
                    t._repeat &&
                    ((d = Zt(0, t._tDur, e)),
                    (s = It(d, u)),
                    t._yoyo && 1 & s && (c = 1 - c),
                    s !== It(t._tTime, u) &&
                      ((l = 1 - c),
                      t.vars.repeatRefresh && t._initted && t.invalidate())),
                  c !== l || r || i || t._zTime === _ || (!e && t._zTime))
                ) {
                  if (!t._initted && Rt(t, e, i, n, d)) return;
                  for (
                    a = t._zTime,
                      t._zTime = e || (n ? _ : 0),
                      n || (n = e && !a),
                      t.ratio = c,
                      t._from && (c = 1 - c),
                      t._time = 0,
                      t._tTime = d,
                      o = t._pt;
                    o;

                  )
                    o.r(c, o.d), (o = o._next);
                  e < 0 && Dt(t, e, 0, !0),
                    t._onUpdate && !n && fe(t, 'onUpdate'),
                    d && t._repeat && !n && t.parent && fe(t, 'onRepeat'),
                    (e >= t._tDur || e < 0) &&
                      t.ratio === c &&
                      (c && Lt(t, 1),
                      n ||
                        r ||
                        (fe(t, c ? 'onComplete' : 'onReverseComplete', !0),
                        t._prom && t._prom()));
                } else t._zTime || (t._zTime = e);
              })(this, t, e, n);
            return this;
          }),
          (a.targets = function () {
            return this._targets;
          }),
          (a.invalidate = function (t) {
            return (
              (!t || !this.vars.runBackwards) && (this._startAt = 0),
              (this._pt =
                this._op =
                this._onUpdate =
                this._lazy =
                this.ratio =
                  0),
              (this._ptLookup = []),
              this.timeline && this.timeline.invalidate(t),
              n.prototype.invalidate.call(this, t)
            );
          }),
          (a.resetTo = function (t, e, n, i, r) {
            f || Ce.wake(), this._ts || this.play();
            var o = Math.min(
              this._dur,
              (this._dp._time - this._start) * this._ts
            );
            return (
              this._initted || Ye(this, o),
              (function (t, e, n, i, r, o, s, a) {
                var l,
                  c,
                  u,
                  d,
                  p = ((t._pt && t._ptCache) || (t._ptCache = {}))[e];
                if (!p)
                  for (
                    p = t._ptCache[e] = [],
                      u = t._ptLookup,
                      d = t._targets.length;
                    d--;

                  ) {
                    if ((l = u[d][e]) && l.d && l.d._pt)
                      for (l = l.d._pt; l && l.p !== e && l.fp !== e; )
                        l = l._next;
                    if (!l)
                      return (
                        (Be = 1),
                        (t.vars[e] = '+=0'),
                        Ye(t, s),
                        (Be = 0),
                        a ? Z(e + ' not eligible for reset') : 1
                      );
                    p.push(l);
                  }
                for (d = p.length; d--; )
                  ((l = (c = p[d])._pt || c).s =
                    (!i && 0 !== i) || r ? l.s + (i || 0) + o * l.c : i),
                    (l.c = n - l.s),
                    c.e && (c.e = mt(n) + Kt(c.e)),
                    c.b && (c.b = l.s + Kt(c.b));
              })(this, t, e, n, i, this._ease(o / this._dur), o, r)
                ? this.resetTo(t, e, n, i, 1)
                : (jt(this, 0),
                  this.parent ||
                    $t(
                      this._dp,
                      this,
                      '_first',
                      '_last',
                      this._dp._sort ? '_start' : 0
                    ),
                  this.render(0))
            );
          }),
          (a.kill = function (t, e) {
            if ((void 0 === e && (e = 'all'), !(t || (e && 'all' !== e))))
              return (this._lazy = this._pt = 0), this.parent ? he(this) : this;
            if (this.timeline) {
              var n = this.timeline.totalDuration();
              return (
                this.timeline.killTweensOf(t, e, Re && !0 !== Re.vars.overwrite)
                  ._first || he(this),
                this.parent &&
                  n !== this.timeline.totalDuration() &&
                  Vt(this, (this._dur * this.timeline._tDur) / n, 0, 1),
                this
              );
            }
            var i,
              r,
              o,
              s,
              a,
              l,
              c,
              u = this._targets,
              d = t ? ne(t) : u,
              p = this._ptLookup,
              f = this._pt;
            if (
              (!e || 'all' === e) &&
              (function (t, e) {
                for (
                  var n = t.length, i = n === e.length;
                  i && n-- && t[n] === e[n];

                );
                return n < 0;
              })(u, d)
            )
              return 'all' === e && (this._pt = 0), he(this);
            for (
              i = this._op = this._op || [],
                'all' !== e &&
                  (L(e) &&
                    ((a = {}),
                    ht(e, function (t) {
                      return (a[t] = 1);
                    }),
                    (e = a)),
                  (e = (function (t, e) {
                    var n,
                      i,
                      r,
                      o,
                      s = t[0] ? pt(t[0]).harness : 0,
                      a = s && s.aliases;
                    if (!a) return e;
                    for (i in ((n = Tt({}, e)), a))
                      if ((i in n))
                        for (r = (o = a[i].split(',')).length; r--; )
                          n[o[r]] = n[i];
                    return n;
                  })(u, e))),
                c = u.length;
              c--;

            )
              if (~d.indexOf(u[c]))
                for (a in ((r = p[c]),
                'all' === e
                  ? ((i[c] = e), (s = r), (o = {}))
                  : ((o = i[c] = i[c] || {}), (s = e)),
                s))
                  (l = r && r[a]) &&
                    (('kill' in l.d && !0 !== l.d.kill(a)) ||
                      At(this, l, '_pt'),
                    delete r[a]),
                    'all' !== o && (o[a] = 1);
            return this._initted && !this._pt && f && he(this), this;
          }),
          (o.to = function (t, e) {
            return new o(t, e, arguments[2]);
          }),
          (o.from = function (t, e) {
            return Gt(1, arguments);
          }),
          (o.delayedCall = function (t, e, n, i) {
            return new o(e, 0, {
              immediateRender: !1,
              lazy: !1,
              overwrite: !1,
              delay: t,
              onComplete: e,
              onReverseComplete: e,
              onCompleteParams: n,
              onReverseCompleteParams: n,
              callbackScope: i,
            });
          }),
          (o.fromTo = function (t, e, n) {
            return Gt(2, arguments);
          }),
          (o.set = function (t, e) {
            return (
              (e.duration = 0), e.repeatDelay || (e.repeat = 0), new o(t, e)
            );
          }),
          (o.killTweensOf = function (t, e, n) {
            return s.killTweensOf(t, e, n);
          }),
          o
        );
      })(Ne);
      _t(Ke.prototype, {
        _targets: [],
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0,
      }),
        ht('staggerTo,staggerFrom,staggerFromTo', function (t) {
          Ke[t] = function () {
            var e = new Fe(),
              n = Jt.call(arguments, 0);
            return (
              n.splice('staggerFromTo' === t ? 5 : 4, 0, 0), e[t].apply(e, n)
            );
          };
        });
      var Je = function (t, e, n) {
          return (t[e] = n);
        },
        tn = function (t, e, n) {
          return t[e](n);
        },
        en = function (t, e, n, i) {
          return t[e](i.fp, n);
        },
        nn = function (t, e, n) {
          return t.setAttribute(e, n);
        },
        rn = function (t, e) {
          return O(t[e]) ? tn : P(t[e]) && t.setAttribute ? nn : Je;
        },
        on = function (t, e) {
          return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e);
        },
        sn = function (t, e) {
          return e.set(e.t, e.p, !!(e.s + e.c * t), e);
        },
        an = function (t, e) {
          var n = e._pt,
            i = '';
          if (!t && e.b) i = e.b;
          else if (1 === t && e.e) i = e.e;
          else {
            for (; n; )
              (i =
                n.p +
                (n.m
                  ? n.m(n.s + n.c * t)
                  : Math.round(1e4 * (n.s + n.c * t)) / 1e4) +
                i),
                (n = n._next);
            i += e.c;
          }
          e.set(e.t, e.p, i, e);
        },
        ln = function (t, e) {
          for (var n = e._pt; n; ) n.r(t, n.d), (n = n._next);
        },
        cn = function (t, e, n, i) {
          for (var r, o = this._pt; o; )
            (r = o._next), o.p === i && o.modifier(t, e, n), (o = r);
        },
        un = function (t) {
          for (var e, n, i = this._pt; i; )
            (n = i._next),
              (i.p === t && !i.op) || i.op === t
                ? At(this, i, '_pt')
                : i.dep || (e = 1),
              (i = n);
          return !e;
        },
        dn = function (t, e, n, i) {
          i.mSet(t, e, i.m.call(i.tween, n, i.mt), i);
        },
        pn = function (t) {
          for (var e, n, i, r, o = t._pt; o; ) {
            for (e = o._next, n = i; n && n.pr > o.pr; ) n = n._next;
            (o._prev = n ? n._prev : r) ? (o._prev._next = o) : (i = o),
              (o._next = n) ? (n._prev = o) : (r = o),
              (o = e);
          }
          t._pt = i;
        },
        fn = (function () {
          function t(t, e, n, i, r, o, s, a, l) {
            (this.t = e),
              (this.s = i),
              (this.c = r),
              (this.p = n),
              (this.r = o || on),
              (this.d = s || this),
              (this.set = a || Je),
              (this.pr = l || 0),
              (this._next = t),
              t && (t._prev = this);
          }
          return (
            (t.prototype.modifier = function (t, e, n) {
              (this.mSet = this.mSet || this.set),
                (this.set = dn),
                (this.m = t),
                (this.mt = n),
                (this.tween = e);
            }),
            t
          );
        })();
      ht(
        ut +
          'parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger',
        function (t) {
          return (it[t] = 1);
        }
      ),
        (Y.TweenMax = Y.TweenLite = Ke),
        (Y.TimelineLite = Y.TimelineMax = Fe),
        (s = new Fe({
          sortChildren: !1,
          defaults: x,
          autoRemoveChildren: !0,
          id: 'root',
          smoothChildTiming: !0,
        })),
        (b.stringFilter = Se);
      var hn = [],
        mn = {},
        gn = [],
        vn = 0,
        yn = 0,
        wn = function (t) {
          return (mn[t] || gn).map(function (t) {
            return t();
          });
        },
        bn = function () {
          var t = Date.now(),
            e = [];
          t - vn > 2 &&
            (wn('matchMediaInit'),
            hn.forEach(function (t) {
              var n,
                i,
                r,
                o,
                s = t.queries,
                l = t.conditions;
              for (i in s)
                (n = a.matchMedia(s[i]).matches) && (r = 1),
                  n !== l[i] && ((l[i] = n), (o = 1));
              o && (t.revert(), r && e.push(t));
            }),
            wn('matchMediaRevert'),
            e.forEach(function (t) {
              return t.onMatch(t, function (e) {
                return t.add(null, e);
              });
            }),
            (vn = t),
            wn('matchMedia'));
        },
        xn = (function () {
          function t(t, e) {
            (this.selector = e && ie(e)),
              (this.data = []),
              (this._r = []),
              (this.isReverted = !1),
              (this.id = yn++),
              t && this.add(t);
          }
          var e = t.prototype;
          return (
            (e.add = function (t, e, n) {
              O(t) && ((n = e), (e = t), (t = O));
              var i = this,
                r = function () {
                  var t,
                    r = o,
                    s = i.selector;
                  return (
                    r && r !== i && r.data.push(i),
                    n && (i.selector = ie(n)),
                    (o = i),
                    (t = e.apply(i, arguments)),
                    O(t) && i._r.push(t),
                    (o = r),
                    (i.selector = s),
                    (i.isReverted = !1),
                    t
                  );
                };
              return (
                (i.last = r),
                t === O
                  ? r(i, function (t) {
                      return i.add(null, t);
                    })
                  : t
                  ? (i[t] = r)
                  : r
              );
            }),
            (e.ignore = function (t) {
              var e = o;
              (o = null), t(this), (o = e);
            }),
            (e.getTweens = function () {
              var e = [];
              return (
                this.data.forEach(function (n) {
                  return n instanceof t
                    ? e.push.apply(e, n.getTweens())
                    : n instanceof Ke &&
                        !(n.parent && 'nested' === n.parent.data) &&
                        e.push(n);
                }),
                e
              );
            }),
            (e.clear = function () {
              this._r.length = this.data.length = 0;
            }),
            (e.kill = function (t, e) {
              var n = this;
              if (
                (t
                  ? (function () {
                      for (var e, i = n.getTweens(), r = n.data.length; r--; )
                        'isFlip' === (e = n.data[r]).data &&
                          (e.revert(),
                          e.getChildren(!0, !0, !1).forEach(function (t) {
                            return i.splice(i.indexOf(t), 1);
                          }));
                      for (
                        i
                          .map(function (t) {
                            return {
                              g:
                                t._dur ||
                                t._delay ||
                                (t._sat && !t._sat.vars.immediateRender)
                                  ? t.globalTime(0)
                                  : -1 / 0,
                              t,
                            };
                          })
                          .sort(function (t, e) {
                            return e.g - t.g || -1 / 0;
                          })
                          .forEach(function (e) {
                            return e.t.revert(t);
                          }),
                          r = n.data.length;
                        r--;

                      )
                        (e = n.data[r]) instanceof Fe
                          ? 'nested' !== e.data &&
                            (e.scrollTrigger && e.scrollTrigger.revert(),
                            e.kill())
                          : !(e instanceof Ke) && e.revert && e.revert(t);
                      n._r.forEach(function (e) {
                        return e(t, n);
                      }),
                        (n.isReverted = !0);
                    })()
                  : this.data.forEach(function (t) {
                      return t.kill && t.kill();
                    }),
                this.clear(),
                e)
              )
                for (var i = hn.length; i--; )
                  hn[i].id === this.id && hn.splice(i, 1);
            }),
            (e.revert = function (t) {
              this.kill(t || {});
            }),
            t
          );
        })(),
        kn = (function () {
          function t(t) {
            (this.contexts = []), (this.scope = t), o && o.data.push(this);
          }
          var e = t.prototype;
          return (
            (e.add = function (t, e, n) {
              M(t) || (t = { matches: t });
              var i,
                r,
                s,
                l = new xn(0, n || this.scope),
                c = (l.conditions = {});
              for (r in (o && !l.selector && (l.selector = o.selector),
              this.contexts.push(l),
              (e = l.add('onMatch', e)),
              (l.queries = t),
              t))
                'all' === r
                  ? (s = 1)
                  : (i = a.matchMedia(t[r])) &&
                    (hn.indexOf(l) < 0 && hn.push(l),
                    (c[r] = i.matches) && (s = 1),
                    i.addListener
                      ? i.addListener(bn)
                      : i.addEventListener('change', bn));
              return (
                s &&
                  e(l, function (t) {
                    return l.add(null, t);
                  }),
                this
              );
            }),
            (e.revert = function (t) {
              this.kill(t || {});
            }),
            (e.kill = function (t) {
              this.contexts.forEach(function (e) {
                return e.kill(t, !0);
              });
            }),
            t
          );
        })(),
        _n = {
          registerPlugin: function () {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
              e[n] = arguments[n];
            e.forEach(function (t) {
              return ge(t);
            });
          },
          timeline: function (t) {
            return new Fe(t);
          },
          getTweensOf: function (t, e) {
            return s.getTweensOf(t, e);
          },
          getProperty: function (t, e, n, i) {
            L(t) && (t = ne(t)[0]);
            var r = pt(t || {}).get,
              o = n ? kt : xt;
            return (
              'native' === n && (n = ''),
              t
                ? e
                  ? o(((st[e] && st[e].get) || r)(t, e, n, i))
                  : function (e, n, i) {
                      return o(((st[e] && st[e].get) || r)(t, e, n, i));
                    }
                : t
            );
          },
          quickSetter: function (t, e, n) {
            if ((t = ne(t)).length > 1) {
              var i = t.map(function (t) {
                  return Cn.quickSetter(t, e, n);
                }),
                r = i.length;
              return function (t) {
                for (var e = r; e--; ) i[e](t);
              };
            }
            t = t[0] || {};
            var o = st[e],
              s = pt(t),
              a = (s.harness && (s.harness.aliases || {})[e]) || e,
              l = o
                ? function (e) {
                    var i = new o();
                    (p._pt = 0),
                      i.init(t, n ? e + n : e, p, 0, [t]),
                      i.render(1, i),
                      p._pt && ln(1, p);
                  }
                : s.set(t, a);
            return o
              ? l
              : function (e) {
                  return l(t, a, n ? e + n : e, s, 1);
                };
          },
          quickTo: function (t, e, n) {
            var i,
              r = Cn.to(
                t,
                Tt((((i = {})[e] = '+=0.1'), (i.paused = !0), i), n || {})
              ),
              o = function (t, n, i) {
                return r.resetTo(e, t, n, i);
              };
            return (o.tween = r), o;
          },
          isTweening: function (t) {
            return s.getTweensOf(t, !0).length > 0;
          },
          defaults: function (t) {
            return t && t.ease && (t.ease = Me(t.ease, x.ease)), St(x, t || {});
          },
          config: function (t) {
            return St(b, t || {});
          },
          registerEffect: function (t) {
            var e = t.name,
              n = t.effect,
              i = t.plugins,
              r = t.defaults,
              o = t.extendTimeline;
            (i || '').split(',').forEach(function (t) {
              return (
                t &&
                !st[t] &&
                !Y[t] &&
                Z(e + ' effect requires ' + t + ' plugin.')
              );
            }),
              (at[e] = function (t, e, i) {
                return n(ne(t), _t(e || {}, r), i);
              }),
              o &&
                (Fe.prototype[e] = function (t, n, i) {
                  return this.add(at[e](t, M(n) ? n : (i = n) && {}, this), i);
                });
          },
          registerEase: function (t, e) {
            $e[t] = Me(e);
          },
          parseEase: function (t, e) {
            return arguments.length ? Me(t, e) : $e;
          },
          getById: function (t) {
            return s.getById(t);
          },
          exportRoot: function (t, e) {
            void 0 === t && (t = {});
            var n,
              i,
              r = new Fe(t);
            for (
              r.smoothChildTiming = I(t.smoothChildTiming),
                s.remove(r),
                r._dp = 0,
                r._time = r._tTime = s._time,
                n = s._first;
              n;

            )
              (i = n._next),
                (!e &&
                  !n._dur &&
                  n instanceof Ke &&
                  n.vars.onComplete === n._targets[0]) ||
                  Nt(r, n, n._start - n._delay),
                (n = i);
            return Nt(s, r, 0), r;
          },
          context: function (t, e) {
            return t ? new xn(t, e) : o;
          },
          matchMedia: function (t) {
            return new kn(t);
          },
          matchMediaRefresh: function () {
            return (
              hn.forEach(function (t) {
                var e,
                  n,
                  i = t.conditions;
                for (n in i) i[n] && ((i[n] = !1), (e = 1));
                e && t.revert();
              }) || bn()
            );
          },
          addEventListener: function (t, e) {
            var n = mn[t] || (mn[t] = []);
            ~n.indexOf(e) || n.push(e);
          },
          removeEventListener: function (t, e) {
            var n = mn[t],
              i = n && n.indexOf(e);
            i >= 0 && n.splice(i, 1);
          },
          utils: {
            wrap: function t(e, n, i) {
              var r = n - e;
              return z(e)
                ? ce(e, t(0, e.length), n)
                : Qt(i, function (t) {
                    return ((r + ((t - e) % r)) % r) + e;
                  });
            },
            wrapYoyo: function t(e, n, i) {
              var r = n - e,
                o = 2 * r;
              return z(e)
                ? ce(e, t(0, e.length - 1), n)
                : Qt(i, function (t) {
                    return (
                      e + ((t = (o + ((t - e) % o)) % o || 0) > r ? o - t : t)
                    );
                  });
            },
            distribute: oe,
            random: le,
            snap: ae,
            normalize: function (t, e, n) {
              return de(t, e, 0, 1, n);
            },
            getUnit: Kt,
            clamp: function (t, e, n) {
              return Qt(n, function (n) {
                return Zt(t, e, n);
              });
            },
            splitColor: be,
            toArray: ne,
            selector: ie,
            mapRange: de,
            pipe: function () {
              for (
                var t = arguments.length, e = new Array(t), n = 0;
                n < t;
                n++
              )
                e[n] = arguments[n];
              return function (t) {
                return e.reduce(function (t, e) {
                  return e(t);
                }, t);
              };
            },
            unitize: function (t, e) {
              return function (n) {
                return t(parseFloat(n)) + (e || Kt(n));
              };
            },
            interpolate: function t(e, n, i, r) {
              var o = isNaN(e + n)
                ? 0
                : function (t) {
                    return (1 - t) * e + t * n;
                  };
              if (!o) {
                var s,
                  a,
                  l,
                  c,
                  u,
                  d = L(e),
                  p = {};
                if ((!0 === i && (r = 1) && (i = null), d))
                  (e = { p: e }), (n = { p: n });
                else if (z(e) && !z(n)) {
                  for (l = [], c = e.length, u = c - 2, a = 1; a < c; a++)
                    l.push(t(e[a - 1], e[a]));
                  c--,
                    (o = function (t) {
                      t *= c;
                      var e = Math.min(u, ~~t);
                      return l[e](t - e);
                    }),
                    (i = n);
                } else r || (e = Tt(z(e) ? [] : {}, e));
                if (!l) {
                  for (s in n) Ve.call(p, e, s, 'get', n[s]);
                  o = function (t) {
                    return ln(t, p) || (d ? e.p : e);
                  };
                }
              }
              return Qt(i, o);
            },
            shuffle: re,
          },
          install: G,
          effects: at,
          ticker: Ce,
          updateRoot: Fe.updateRoot,
          plugins: st,
          globalTimeline: s,
          core: {
            PropTween: fn,
            globals: K,
            Tween: Ke,
            Timeline: Fe,
            Animation: Ne,
            getCache: pt,
            _removeLinkedListItem: At,
            reverting: function () {
              return r;
            },
            context: function (t) {
              return t && o && (o.data.push(t), (t._ctx = o)), o;
            },
            suppressOverwrites: function (t) {
              return (i = t);
            },
          },
        };
      ht('to,from,fromTo,delayedCall,set,killTweensOf', function (t) {
        return (_n[t] = Ke[t]);
      }),
        Ce.add(Fe.updateRoot),
        (p = _n.to({}, { duration: 0 }));
      var Tn = function (t, e) {
          for (var n = t._pt; n && n.p !== e && n.op !== e && n.fp !== e; )
            n = n._next;
          return n;
        },
        Sn = function (t, e) {
          return {
            name: t,
            rawVars: 1,
            init: function (t, n, i) {
              i._onInit = function (t) {
                var i, r;
                if (
                  (L(n) &&
                    ((i = {}),
                    ht(n, function (t) {
                      return (i[t] = 1);
                    }),
                    (n = i)),
                  e)
                ) {
                  for (r in ((i = {}), n)) i[r] = e(n[r]);
                  n = i;
                }
                !(function (t, e) {
                  var n,
                    i,
                    r,
                    o = t._targets;
                  for (n in e)
                    for (i = o.length; i--; )
                      (r = t._ptLookup[i][n]) &&
                        (r = r.d) &&
                        (r._pt && (r = Tn(r, n)),
                        r && r.modifier && r.modifier(e[n], t, o[i], n));
                })(t, n);
              };
            },
          };
        },
        Cn =
          _n.registerPlugin(
            {
              name: 'attr',
              init: function (t, e, n, i, r) {
                var o, s, a;
                for (o in ((this.tween = n), e))
                  (a = t.getAttribute(o) || ''),
                    ((s = this.add(
                      t,
                      'setAttribute',
                      (a || 0) + '',
                      e[o],
                      i,
                      r,
                      0,
                      0,
                      o
                    )).op = o),
                    (s.b = a),
                    this._props.push(o);
              },
              render: function (t, e) {
                for (var n = e._pt; n; )
                  r ? n.set(n.t, n.p, n.b, n) : n.r(t, n.d), (n = n._next);
              },
            },
            {
              name: 'endArray',
              init: function (t, e) {
                for (var n = e.length; n--; )
                  this.add(t, n, t[n] || 0, e[n], 0, 0, 0, 0, 0, 1);
              },
            },
            Sn('roundProps', se),
            Sn('modifiers'),
            Sn('snap', ae)
          ) || _n;
      (Ke.version = Fe.version = Cn.version = '3.12.5'), (u = 1), q() && Ee();
      $e.Power0,
        $e.Power1,
        $e.Power2,
        $e.Power3,
        $e.Power4,
        $e.Linear,
        $e.Quad,
        $e.Cubic,
        $e.Quart,
        $e.Quint,
        $e.Strong,
        $e.Elastic,
        $e.Back,
        $e.SteppedEase,
        $e.Bounce,
        $e.Sine,
        $e.Expo,
        $e.Circ;
      var En,
        $n,
        An,
        Ln,
        On,
        Dn,
        Pn,
        Mn,
        In = {},
        qn = 180 / Math.PI,
        Hn = Math.PI / 180,
        jn = Math.atan2,
        zn = /([A-Z])/g,
        Nn = /(left|right|width|margin|padding|x)/i,
        Fn = /[\s,\(]\S/,
        Rn = {
          autoAlpha: 'opacity,visibility',
          scale: 'scaleX,scaleY',
          alpha: 'opacity',
        },
        Bn = function (t, e) {
          return e.set(
            e.t,
            e.p,
            Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
            e
          );
        },
        Wn = function (t, e) {
          return e.set(
            e.t,
            e.p,
            1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
            e
          );
        },
        Vn = function (t, e) {
          return e.set(
            e.t,
            e.p,
            t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
            e
          );
        },
        Un = function (t, e) {
          var n = e.s + e.c * t;
          e.set(e.t, e.p, ~~(n + (n < 0 ? -0.5 : 0.5)) + e.u, e);
        },
        Yn = function (t, e) {
          return e.set(e.t, e.p, t ? e.e : e.b, e);
        },
        Xn = function (t, e) {
          return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
        },
        Gn = function (t, e, n) {
          return (t.style[e] = n);
        },
        Qn = function (t, e, n) {
          return t.style.setProperty(e, n);
        },
        Zn = function (t, e, n) {
          return (t._gsap[e] = n);
        },
        Kn = function (t, e, n) {
          return (t._gsap.scaleX = t._gsap.scaleY = n);
        },
        Jn = function (t, e, n, i, r) {
          var o = t._gsap;
          (o.scaleX = o.scaleY = n), o.renderTransform(r, o);
        },
        ti = function (t, e, n, i, r) {
          var o = t._gsap;
          (o[e] = n), o.renderTransform(r, o);
        },
        ei = 'transform',
        ni = ei + 'Origin',
        ii = function t(e, n) {
          var i = this,
            r = this.target,
            o = r.style,
            s = r._gsap;
          if (e in In && o) {
            if (((this.tfm = this.tfm || {}), 'transform' === e))
              return Rn.transform.split(',').forEach(function (e) {
                return t.call(i, e, n);
              });
            if (
              (~(e = Rn[e] || e).indexOf(',')
                ? e.split(',').forEach(function (t) {
                    return (i.tfm[t] = xi(r, t));
                  })
                : (this.tfm[e] = s.x ? s[e] : xi(r, e)),
              e === ni && (this.tfm.zOrigin = s.zOrigin),
              this.props.indexOf(ei) >= 0)
            )
              return;
            s.svg &&
              ((this.svgo = r.getAttribute('data-svg-origin')),
              this.props.push(ni, n, '')),
              (e = ei);
          }
          (o || n) && this.props.push(e, n, o[e]);
        },
        ri = function (t) {
          t.translate &&
            (t.removeProperty('translate'),
            t.removeProperty('scale'),
            t.removeProperty('rotate'));
        },
        oi = function () {
          var t,
            e,
            n = this.props,
            i = this.target,
            r = i.style,
            o = i._gsap;
          for (t = 0; t < n.length; t += 3)
            n[t + 1]
              ? (i[n[t]] = n[t + 2])
              : n[t + 2]
              ? (r[n[t]] = n[t + 2])
              : r.removeProperty(
                  '--' === n[t].substr(0, 2)
                    ? n[t]
                    : n[t].replace(zn, '-$1').toLowerCase()
                );
          if (this.tfm) {
            for (e in this.tfm) o[e] = this.tfm[e];
            o.svg &&
              (o.renderTransform(),
              i.setAttribute('data-svg-origin', this.svgo || '')),
              ((t = Pn()) && t.isStart) ||
                r[ei] ||
                (ri(r),
                o.zOrigin &&
                  r[ni] &&
                  ((r[ni] += ' ' + o.zOrigin + 'px'),
                  (o.zOrigin = 0),
                  o.renderTransform()),
                (o.uncache = 1));
          }
        },
        si = function (t, e) {
          var n = { target: t, props: [], revert: oi, save: ii };
          return (
            t._gsap || Cn.core.getCache(t),
            e &&
              e.split(',').forEach(function (t) {
                return n.save(t);
              }),
            n
          );
        },
        ai = function (t, e) {
          var n = $n.createElementNS
            ? $n.createElementNS(
                (e || 'http://www.w3.org/1999/xhtml').replace(/^https/, 'http'),
                t
              )
            : $n.createElement(t);
          return n && n.style ? n : $n.createElement(t);
        },
        li = function t(e, n, i) {
          var r = getComputedStyle(e);
          return (
            r[n] ||
            r.getPropertyValue(n.replace(zn, '-$1').toLowerCase()) ||
            r.getPropertyValue(n) ||
            (!i && t(e, ui(n) || n, 1)) ||
            ''
          );
        },
        ci = 'O,Moz,ms,Ms,Webkit'.split(','),
        ui = function (t, e, n) {
          var i = (e || On).style,
            r = 5;
          if (t in i && !n) return t;
          for (
            t = t.charAt(0).toUpperCase() + t.substr(1);
            r-- && !(ci[r] + t in i);

          );
          return r < 0 ? null : (3 === r ? 'ms' : r >= 0 ? ci[r] : '') + t;
        },
        di = function () {
          'undefined' != typeof window &&
            window.document &&
            ((En = window),
            ($n = En.document),
            (An = $n.documentElement),
            (On = ai('div') || { style: {} }),
            ai('div'),
            (ei = ui(ei)),
            (ni = ei + 'Origin'),
            (On.style.cssText =
              'border-width:0;line-height:0;position:absolute;padding:0'),
            (Mn = !!ui('perspective')),
            (Pn = Cn.core.reverting),
            (Ln = 1));
        },
        pi = function t(e) {
          var n,
            i = ai(
              'svg',
              (this.ownerSVGElement &&
                this.ownerSVGElement.getAttribute('xmlns')) ||
                'http://www.w3.org/2000/svg'
            ),
            r = this.parentNode,
            o = this.nextSibling,
            s = this.style.cssText;
          if (
            (An.appendChild(i),
            i.appendChild(this),
            (this.style.display = 'block'),
            e)
          )
            try {
              (n = this.getBBox()),
                (this._gsapBBox = this.getBBox),
                (this.getBBox = t);
            } catch (t) {}
          else this._gsapBBox && (n = this._gsapBBox());
          return (
            r && (o ? r.insertBefore(this, o) : r.appendChild(this)),
            An.removeChild(i),
            (this.style.cssText = s),
            n
          );
        },
        fi = function (t, e) {
          for (var n = e.length; n--; )
            if (t.hasAttribute(e[n])) return t.getAttribute(e[n]);
        },
        hi = function (t) {
          var e;
          try {
            e = t.getBBox();
          } catch (n) {
            e = pi.call(t, !0);
          }
          return (
            (e && (e.width || e.height)) ||
              t.getBBox === pi ||
              (e = pi.call(t, !0)),
            !e || e.width || e.x || e.y
              ? e
              : {
                  x: +fi(t, ['x', 'cx', 'x1']) || 0,
                  y: +fi(t, ['y', 'cy', 'y1']) || 0,
                  width: 0,
                  height: 0,
                }
          );
        },
        mi = function (t) {
          return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !hi(t));
        },
        gi = function (t, e) {
          if (e) {
            var n,
              i = t.style;
            e in In && e !== ni && (e = ei),
              i.removeProperty
                ? (('ms' !== (n = e.substr(0, 2)) &&
                    'webkit' !== e.substr(0, 6)) ||
                    (e = '-' + e),
                  i.removeProperty(
                    '--' === n ? e : e.replace(zn, '-$1').toLowerCase()
                  ))
                : i.removeAttribute(e);
          }
        },
        vi = function (t, e, n, i, r, o) {
          var s = new fn(t._pt, e, n, 0, 1, o ? Xn : Yn);
          return (t._pt = s), (s.b = i), (s.e = r), t._props.push(n), s;
        },
        yi = { deg: 1, rad: 1, turn: 1 },
        wi = { grid: 1, flex: 1 },
        bi = function t(e, n, i, r) {
          var o,
            s,
            a,
            l,
            c = parseFloat(i) || 0,
            u = (i + '').trim().substr((c + '').length) || 'px',
            d = On.style,
            p = Nn.test(n),
            f = 'svg' === e.tagName.toLowerCase(),
            h = (f ? 'client' : 'offset') + (p ? 'Width' : 'Height'),
            m = 100,
            g = 'px' === r,
            v = '%' === r;
          if (r === u || !c || yi[r] || yi[u]) return c;
          if (
            ('px' !== u && !g && (c = t(e, n, i, 'px')),
            (l = e.getCTM && mi(e)),
            (v || '%' === u) && (In[n] || ~n.indexOf('adius')))
          )
            return (
              (o = l ? e.getBBox()[p ? 'width' : 'height'] : e[h]),
              mt(v ? (c / o) * m : (c / 100) * o)
            );
          if (
            ((d[p ? 'width' : 'height'] = m + (g ? u : r)),
            (s =
              ~n.indexOf('adius') || ('em' === r && e.appendChild && !f)
                ? e
                : e.parentNode),
            l && (s = (e.ownerSVGElement || {}).parentNode),
            (s && s !== $n && s.appendChild) || (s = $n.body),
            (a = s._gsap) &&
              v &&
              a.width &&
              p &&
              a.time === Ce.time &&
              !a.uncache)
          )
            return mt((c / a.width) * m);
          if (!v || ('height' !== n && 'width' !== n))
            (v || '%' === u) &&
              !wi[li(s, 'display')] &&
              (d.position = li(e, 'position')),
              s === e && (d.position = 'static'),
              s.appendChild(On),
              (o = On[h]),
              s.removeChild(On),
              (d.position = 'absolute');
          else {
            var y = e.style[n];
            (e.style[n] = m + r), (o = e[h]), y ? (e.style[n] = y) : gi(e, n);
          }
          return (
            p && v && (((a = pt(s)).time = Ce.time), (a.width = s[h])),
            mt(g ? (o * c) / m : o && c ? (m / o) * c : 0)
          );
        },
        xi = function (t, e, n, i) {
          var r;
          return (
            Ln || di(),
            e in Rn &&
              'transform' !== e &&
              ~(e = Rn[e]).indexOf(',') &&
              (e = e.split(',')[0]),
            In[e] && 'transform' !== e
              ? ((r = Di(t, i)),
                (r =
                  'transformOrigin' !== e
                    ? r[e]
                    : r.svg
                    ? r.origin
                    : Pi(li(t, ni)) + ' ' + r.zOrigin + 'px'))
              : (!(r = t.style[e]) ||
                  'auto' === r ||
                  i ||
                  ~(r + '').indexOf('calc(')) &&
                (r =
                  (Si[e] && Si[e](t, e, n)) ||
                  li(t, e) ||
                  ft(t, e) ||
                  ('opacity' === e ? 1 : 0)),
            n && !~(r + '').trim().indexOf(' ') ? bi(t, e, r, n) + n : r
          );
        },
        ki = function (t, e, n, i) {
          if (!n || 'none' === n) {
            var r = ui(e, t, 1),
              o = r && li(t, r, 1);
            o && o !== n
              ? ((e = r), (n = o))
              : 'borderColor' === e && (n = li(t, 'borderTopColor'));
          }
          var s,
            a,
            l,
            c,
            u,
            d,
            p,
            f,
            h,
            m,
            g,
            v = new fn(this._pt, t.style, e, 0, 1, an),
            y = 0,
            w = 0;
          if (
            ((v.b = n),
            (v.e = i),
            (n += ''),
            'auto' === (i += '') &&
              ((d = t.style[e]),
              (t.style[e] = i),
              (i = li(t, e) || i),
              d ? (t.style[e] = d) : gi(t, e)),
            Se((s = [n, i])),
            (i = s[1]),
            (l = (n = s[0]).match(R) || []),
            (i.match(R) || []).length)
          ) {
            for (; (a = R.exec(i)); )
              (p = a[0]),
                (h = i.substring(y, a.index)),
                u
                  ? (u = (u + 1) % 5)
                  : ('rgba(' !== h.substr(-5) && 'hsla(' !== h.substr(-5)) ||
                    (u = 1),
                p !== (d = l[w++] || '') &&
                  ((c = parseFloat(d) || 0),
                  (g = d.substr((c + '').length)),
                  '=' === p.charAt(1) && (p = vt(c, p) + g),
                  (f = parseFloat(p)),
                  (m = p.substr((f + '').length)),
                  (y = R.lastIndex - m.length),
                  m ||
                    ((m = m || b.units[e] || g),
                    y === i.length && ((i += m), (v.e += m))),
                  g !== m && (c = bi(t, e, d, m) || 0),
                  (v._pt = {
                    _next: v._pt,
                    p: h || 1 === w ? h : ',',
                    s: c,
                    c: f - c,
                    m: (u && u < 4) || 'zIndex' === e ? Math.round : 0,
                  }));
            v.c = y < i.length ? i.substring(y, i.length) : '';
          } else v.r = 'display' === e && 'none' === i ? Xn : Yn;
          return W.test(i) && (v.e = 0), (this._pt = v), v;
        },
        _i = {
          top: '0%',
          bottom: '100%',
          left: '0%',
          right: '100%',
          center: '50%',
        },
        Ti = function (t, e) {
          if (e.tween && e.tween._time === e.tween._dur) {
            var n,
              i,
              r,
              o = e.t,
              s = o.style,
              a = e.u,
              l = o._gsap;
            if ('all' === a || !0 === a) (s.cssText = ''), (i = 1);
            else
              for (r = (a = a.split(',')).length; --r > -1; )
                (n = a[r]),
                  In[n] && ((i = 1), (n = 'transformOrigin' === n ? ni : ei)),
                  gi(o, n);
            i &&
              (gi(o, ei),
              l &&
                (l.svg && o.removeAttribute('transform'),
                Di(o, 1),
                (l.uncache = 1),
                ri(s)));
          }
        },
        Si = {
          clearProps: function (t, e, n, i, r) {
            if ('isFromStart' !== r.data) {
              var o = (t._pt = new fn(t._pt, e, n, 0, 0, Ti));
              return (
                (o.u = i), (o.pr = -10), (o.tween = r), t._props.push(n), 1
              );
            }
          },
        },
        Ci = [1, 0, 0, 1, 0, 0],
        Ei = {},
        $i = function (t) {
          return 'matrix(1, 0, 0, 1, 0, 0)' === t || 'none' === t || !t;
        },
        Ai = function (t) {
          var e = li(t, ei);
          return $i(e) ? Ci : e.substr(7).match(F).map(mt);
        },
        Li = function (t, e) {
          var n,
            i,
            r,
            o,
            s = t._gsap || pt(t),
            a = t.style,
            l = Ai(t);
          return s.svg && t.getAttribute('transform')
            ? '1,0,0,1,0,0' ===
              (l = [
                (r = t.transform.baseVal.consolidate().matrix).a,
                r.b,
                r.c,
                r.d,
                r.e,
                r.f,
              ]).join(',')
              ? Ci
              : l
            : (l !== Ci ||
                t.offsetParent ||
                t === An ||
                s.svg ||
                ((r = a.display),
                (a.display = 'block'),
                ((n = t.parentNode) && t.offsetParent) ||
                  ((o = 1), (i = t.nextElementSibling), An.appendChild(t)),
                (l = Ai(t)),
                r ? (a.display = r) : gi(t, 'display'),
                o &&
                  (i
                    ? n.insertBefore(t, i)
                    : n
                    ? n.appendChild(t)
                    : An.removeChild(t))),
              e && l.length > 6 ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l);
        },
        Oi = function (t, e, n, i, r, o) {
          var s,
            a,
            l,
            c = t._gsap,
            u = r || Li(t, !0),
            d = c.xOrigin || 0,
            p = c.yOrigin || 0,
            f = c.xOffset || 0,
            h = c.yOffset || 0,
            m = u[0],
            g = u[1],
            v = u[2],
            y = u[3],
            w = u[4],
            b = u[5],
            x = e.split(' '),
            k = parseFloat(x[0]) || 0,
            _ = parseFloat(x[1]) || 0;
          n
            ? u !== Ci &&
              (a = m * y - g * v) &&
              ((l = k * (-g / a) + _ * (m / a) - (m * b - g * w) / a),
              (k = k * (y / a) + _ * (-v / a) + (v * b - y * w) / a),
              (_ = l))
            : ((k =
                (s = hi(t)).x + (~x[0].indexOf('%') ? (k / 100) * s.width : k)),
              (_ =
                s.y +
                (~(x[1] || x[0]).indexOf('%') ? (_ / 100) * s.height : _))),
            i || (!1 !== i && c.smooth)
              ? ((w = k - d),
                (b = _ - p),
                (c.xOffset = f + (w * m + b * v) - w),
                (c.yOffset = h + (w * g + b * y) - b))
              : (c.xOffset = c.yOffset = 0),
            (c.xOrigin = k),
            (c.yOrigin = _),
            (c.smooth = !!i),
            (c.origin = e),
            (c.originIsAbsolute = !!n),
            (t.style[ni] = '0px 0px'),
            o &&
              (vi(o, c, 'xOrigin', d, k),
              vi(o, c, 'yOrigin', p, _),
              vi(o, c, 'xOffset', f, c.xOffset),
              vi(o, c, 'yOffset', h, c.yOffset)),
            t.setAttribute('data-svg-origin', k + ' ' + _);
        },
        Di = function (t, e) {
          var n = t._gsap || new ze(t);
          if ('x' in n && !e && !n.uncache) return n;
          var i,
            r,
            o,
            s,
            a,
            l,
            c,
            u,
            d,
            p,
            f,
            h,
            m,
            g,
            v,
            y,
            w,
            x,
            k,
            _,
            T,
            S,
            C,
            E,
            $,
            A,
            L,
            O,
            D,
            P,
            M,
            I,
            q = t.style,
            H = n.scaleX < 0,
            j = 'px',
            z = 'deg',
            N = getComputedStyle(t),
            F = li(t, ni) || '0';
          return (
            (i = r = o = l = c = u = d = p = f = 0),
            (s = a = 1),
            (n.svg = !(!t.getCTM || !mi(t))),
            N.translate &&
              (('none' === N.translate &&
                'none' === N.scale &&
                'none' === N.rotate) ||
                (q[ei] =
                  ('none' !== N.translate
                    ? 'translate3d(' +
                      (N.translate + ' 0 0').split(' ').slice(0, 3).join(', ') +
                      ') '
                    : '') +
                  ('none' !== N.rotate ? 'rotate(' + N.rotate + ') ' : '') +
                  ('none' !== N.scale
                    ? 'scale(' + N.scale.split(' ').join(',') + ') '
                    : '') +
                  ('none' !== N[ei] ? N[ei] : '')),
              (q.scale = q.rotate = q.translate = 'none')),
            (g = Li(t, n.svg)),
            n.svg &&
              (n.uncache
                ? (($ = t.getBBox()),
                  (F = n.xOrigin - $.x + 'px ' + (n.yOrigin - $.y) + 'px'),
                  (E = ''))
                : (E = !e && t.getAttribute('data-svg-origin')),
              Oi(t, E || F, !!E || n.originIsAbsolute, !1 !== n.smooth, g)),
            (h = n.xOrigin || 0),
            (m = n.yOrigin || 0),
            g !== Ci &&
              ((x = g[0]),
              (k = g[1]),
              (_ = g[2]),
              (T = g[3]),
              (i = S = g[4]),
              (r = C = g[5]),
              6 === g.length
                ? ((s = Math.sqrt(x * x + k * k)),
                  (a = Math.sqrt(T * T + _ * _)),
                  (l = x || k ? jn(k, x) * qn : 0),
                  (d = _ || T ? jn(_, T) * qn + l : 0) &&
                    (a *= Math.abs(Math.cos(d * Hn))),
                  n.svg &&
                    ((i -= h - (h * x + m * _)), (r -= m - (h * k + m * T))))
                : ((I = g[6]),
                  (P = g[7]),
                  (L = g[8]),
                  (O = g[9]),
                  (D = g[10]),
                  (M = g[11]),
                  (i = g[12]),
                  (r = g[13]),
                  (o = g[14]),
                  (c = (v = jn(I, D)) * qn),
                  v &&
                    ((E = S * (y = Math.cos(-v)) + L * (w = Math.sin(-v))),
                    ($ = C * y + O * w),
                    (A = I * y + D * w),
                    (L = S * -w + L * y),
                    (O = C * -w + O * y),
                    (D = I * -w + D * y),
                    (M = P * -w + M * y),
                    (S = E),
                    (C = $),
                    (I = A)),
                  (u = (v = jn(-_, D)) * qn),
                  v &&
                    ((y = Math.cos(-v)),
                    (M = T * (w = Math.sin(-v)) + M * y),
                    (x = E = x * y - L * w),
                    (k = $ = k * y - O * w),
                    (_ = A = _ * y - D * w)),
                  (l = (v = jn(k, x)) * qn),
                  v &&
                    ((E = x * (y = Math.cos(v)) + k * (w = Math.sin(v))),
                    ($ = S * y + C * w),
                    (k = k * y - x * w),
                    (C = C * y - S * w),
                    (x = E),
                    (S = $)),
                  c &&
                    Math.abs(c) + Math.abs(l) > 359.9 &&
                    ((c = l = 0), (u = 180 - u)),
                  (s = mt(Math.sqrt(x * x + k * k + _ * _))),
                  (a = mt(Math.sqrt(C * C + I * I))),
                  (v = jn(S, C)),
                  (d = Math.abs(v) > 2e-4 ? v * qn : 0),
                  (f = M ? 1 / (M < 0 ? -M : M) : 0)),
              n.svg &&
                ((E = t.getAttribute('transform')),
                (n.forceCSS =
                  t.setAttribute('transform', '') || !$i(li(t, ei))),
                E && t.setAttribute('transform', E))),
            Math.abs(d) > 90 &&
              Math.abs(d) < 270 &&
              (H
                ? ((s *= -1),
                  (d += l <= 0 ? 180 : -180),
                  (l += l <= 0 ? 180 : -180))
                : ((a *= -1), (d += d <= 0 ? 180 : -180))),
            (e = e || n.uncache),
            (n.x =
              i -
              ((n.xPercent =
                i &&
                ((!e && n.xPercent) ||
                  (Math.round(t.offsetWidth / 2) === Math.round(-i) ? -50 : 0)))
                ? (t.offsetWidth * n.xPercent) / 100
                : 0) +
              j),
            (n.y =
              r -
              ((n.yPercent =
                r &&
                ((!e && n.yPercent) ||
                  (Math.round(t.offsetHeight / 2) === Math.round(-r)
                    ? -50
                    : 0)))
                ? (t.offsetHeight * n.yPercent) / 100
                : 0) +
              j),
            (n.z = o + j),
            (n.scaleX = mt(s)),
            (n.scaleY = mt(a)),
            (n.rotation = mt(l) + z),
            (n.rotationX = mt(c) + z),
            (n.rotationY = mt(u) + z),
            (n.skewX = d + z),
            (n.skewY = p + z),
            (n.transformPerspective = f + j),
            (n.zOrigin =
              parseFloat(F.split(' ')[2]) || (!e && n.zOrigin) || 0) &&
              (q[ni] = Pi(F)),
            (n.xOffset = n.yOffset = 0),
            (n.force3D = b.force3D),
            (n.renderTransform = n.svg ? Ni : Mn ? zi : Ii),
            (n.uncache = 0),
            n
          );
        },
        Pi = function (t) {
          return (t = t.split(' '))[0] + ' ' + t[1];
        },
        Mi = function (t, e, n) {
          var i = Kt(e);
          return mt(parseFloat(e) + parseFloat(bi(t, 'x', n + 'px', i))) + i;
        },
        Ii = function (t, e) {
          (e.z = '0px'),
            (e.rotationY = e.rotationX = '0deg'),
            (e.force3D = 0),
            zi(t, e);
        },
        qi = '0deg',
        Hi = '0px',
        ji = ') ',
        zi = function (t, e) {
          var n = e || this,
            i = n.xPercent,
            r = n.yPercent,
            o = n.x,
            s = n.y,
            a = n.z,
            l = n.rotation,
            c = n.rotationY,
            u = n.rotationX,
            d = n.skewX,
            p = n.skewY,
            f = n.scaleX,
            h = n.scaleY,
            m = n.transformPerspective,
            g = n.force3D,
            v = n.target,
            y = n.zOrigin,
            w = '',
            b = ('auto' === g && t && 1 !== t) || !0 === g;
          if (y && (u !== qi || c !== qi)) {
            var x,
              k = parseFloat(c) * Hn,
              _ = Math.sin(k),
              T = Math.cos(k);
            (k = parseFloat(u) * Hn),
              (x = Math.cos(k)),
              (o = Mi(v, o, _ * x * -y)),
              (s = Mi(v, s, -Math.sin(k) * -y)),
              (a = Mi(v, a, T * x * -y + y));
          }
          m !== Hi && (w += 'perspective(' + m + ji),
            (i || r) && (w += 'translate(' + i + '%, ' + r + '%) '),
            (b || o !== Hi || s !== Hi || a !== Hi) &&
              (w +=
                a !== Hi || b
                  ? 'translate3d(' + o + ', ' + s + ', ' + a + ') '
                  : 'translate(' + o + ', ' + s + ji),
            l !== qi && (w += 'rotate(' + l + ji),
            c !== qi && (w += 'rotateY(' + c + ji),
            u !== qi && (w += 'rotateX(' + u + ji),
            (d === qi && p === qi) || (w += 'skew(' + d + ', ' + p + ji),
            (1 === f && 1 === h) || (w += 'scale(' + f + ', ' + h + ji),
            (v.style[ei] = w || 'translate(0, 0)');
        },
        Ni = function (t, e) {
          var n,
            i,
            r,
            o,
            s,
            a = e || this,
            l = a.xPercent,
            c = a.yPercent,
            u = a.x,
            d = a.y,
            p = a.rotation,
            f = a.skewX,
            h = a.skewY,
            m = a.scaleX,
            g = a.scaleY,
            v = a.target,
            y = a.xOrigin,
            w = a.yOrigin,
            b = a.xOffset,
            x = a.yOffset,
            k = a.forceCSS,
            _ = parseFloat(u),
            T = parseFloat(d);
          (p = parseFloat(p)),
            (f = parseFloat(f)),
            (h = parseFloat(h)) && ((f += h = parseFloat(h)), (p += h)),
            p || f
              ? ((p *= Hn),
                (f *= Hn),
                (n = Math.cos(p) * m),
                (i = Math.sin(p) * m),
                (r = Math.sin(p - f) * -g),
                (o = Math.cos(p - f) * g),
                f &&
                  ((h *= Hn),
                  (s = Math.tan(f - h)),
                  (r *= s = Math.sqrt(1 + s * s)),
                  (o *= s),
                  h &&
                    ((s = Math.tan(h)),
                    (n *= s = Math.sqrt(1 + s * s)),
                    (i *= s))),
                (n = mt(n)),
                (i = mt(i)),
                (r = mt(r)),
                (o = mt(o)))
              : ((n = m), (o = g), (i = r = 0)),
            ((_ && !~(u + '').indexOf('px')) ||
              (T && !~(d + '').indexOf('px'))) &&
              ((_ = bi(v, 'x', u, 'px')), (T = bi(v, 'y', d, 'px'))),
            (y || w || b || x) &&
              ((_ = mt(_ + y - (y * n + w * r) + b)),
              (T = mt(T + w - (y * i + w * o) + x))),
            (l || c) &&
              ((s = v.getBBox()),
              (_ = mt(_ + (l / 100) * s.width)),
              (T = mt(T + (c / 100) * s.height))),
            (s =
              'matrix(' +
              n +
              ',' +
              i +
              ',' +
              r +
              ',' +
              o +
              ',' +
              _ +
              ',' +
              T +
              ')'),
            v.setAttribute('transform', s),
            k && (v.style[ei] = s);
        },
        Fi = function (t, e, n, i, r) {
          var o,
            s,
            a = 360,
            l = L(r),
            c = parseFloat(r) * (l && ~r.indexOf('rad') ? qn : 1) - i,
            u = i + c + 'deg';
          return (
            l &&
              ('short' === (o = r.split('_')[1]) &&
                (c %= a) !== c % 180 &&
                (c += c < 0 ? a : -360),
              'cw' === o && c < 0
                ? (c = ((c + 36e9) % a) - ~~(c / a) * a)
                : 'ccw' === o &&
                  c > 0 &&
                  (c = ((c - 36e9) % a) - ~~(c / a) * a)),
            (t._pt = s = new fn(t._pt, e, n, i, c, Wn)),
            (s.e = u),
            (s.u = 'deg'),
            t._props.push(n),
            s
          );
        },
        Ri = function (t, e) {
          for (var n in e) t[n] = e[n];
          return t;
        },
        Bi = function (t, e, n) {
          var i,
            r,
            o,
            s,
            a,
            l,
            c,
            u = Ri({}, n._gsap),
            d = n.style;
          for (r in (u.svg
            ? ((o = n.getAttribute('transform')),
              n.setAttribute('transform', ''),
              (d[ei] = e),
              (i = Di(n, 1)),
              gi(n, ei),
              n.setAttribute('transform', o))
            : ((o = getComputedStyle(n)[ei]),
              (d[ei] = e),
              (i = Di(n, 1)),
              (d[ei] = o)),
          In))
            (o = u[r]) !== (s = i[r]) &&
              'perspective,force3D,transformOrigin,svgOrigin'.indexOf(r) < 0 &&
              ((a = Kt(o) !== (c = Kt(s)) ? bi(n, r, o, c) : parseFloat(o)),
              (l = parseFloat(s)),
              (t._pt = new fn(t._pt, i, r, a, l - a, Bn)),
              (t._pt.u = c || 0),
              t._props.push(r));
          Ri(i, u);
        };
      ht('padding,margin,Width,Radius', function (t, e) {
        var n = 'Top',
          i = 'Right',
          r = 'Bottom',
          o = 'Left',
          s = (e < 3 ? [n, i, r, o] : [n + o, n + i, r + i, r + o]).map(
            function (n) {
              return e < 2 ? t + n : 'border' + n + t;
            }
          );
        Si[e > 1 ? 'border' + t : t] = function (t, e, n, i, r) {
          var o, a;
          if (arguments.length < 4)
            return (
              (o = s.map(function (e) {
                return xi(t, e, n);
              })),
              5 === (a = o.join(' ')).split(o[0]).length ? o[0] : a
            );
          (o = (i + '').split(' ')),
            (a = {}),
            s.forEach(function (t, e) {
              return (a[t] = o[e] = o[e] || o[((e - 1) / 2) | 0]);
            }),
            t.init(e, a, r);
        };
      });
      var Wi,
        Vi,
        Ui,
        Yi = {
          name: 'css',
          register: di,
          targetTest: function (t) {
            return t.style && t.nodeType;
          },
          init: function (t, e, n, i, r) {
            var o,
              s,
              a,
              l,
              c,
              u,
              d,
              p,
              f,
              h,
              m,
              g,
              v,
              y,
              w,
              x,
              k,
              _,
              T,
              S,
              C = this._props,
              E = t.style,
              $ = n.vars.startAt;
            for (d in (Ln || di(),
            (this.styles = this.styles || si(t)),
            (x = this.styles.props),
            (this.tween = n),
            e))
              if (
                'autoRound' !== d &&
                ((s = e[d]), !st[d] || !Ue(d, e, n, i, t, r))
              )
                if (
                  ((c = typeof s),
                  (u = Si[d]),
                  'function' === c && (c = typeof (s = s.call(n, i, t, r))),
                  'string' === c && ~s.indexOf('random(') && (s = ue(s)),
                  u)
                )
                  u(this, t, d, s, n) && (w = 1);
                else if ('--' === d.substr(0, 2))
                  (o = (getComputedStyle(t).getPropertyValue(d) + '').trim()),
                    (s += ''),
                    (_e.lastIndex = 0),
                    _e.test(o) || ((p = Kt(o)), (f = Kt(s))),
                    f ? p !== f && (o = bi(t, d, o, f) + f) : p && (s += p),
                    this.add(E, 'setProperty', o, s, i, r, 0, 0, d),
                    C.push(d),
                    x.push(d, 0, E[d]);
                else if ('undefined' !== c) {
                  if (
                    ($ && d in $
                      ? ((o =
                          'function' == typeof $[d]
                            ? $[d].call(n, i, t, r)
                            : $[d]),
                        L(o) && ~o.indexOf('random(') && (o = ue(o)),
                        Kt(o + '') ||
                          'auto' === o ||
                          (o += b.units[d] || Kt(xi(t, d)) || ''),
                        '=' === (o + '').charAt(1) && (o = xi(t, d)))
                      : (o = xi(t, d)),
                    (l = parseFloat(o)),
                    (h =
                      'string' === c &&
                      '=' === s.charAt(1) &&
                      s.substr(0, 2)) && (s = s.substr(2)),
                    (a = parseFloat(s)),
                    d in Rn &&
                      ('autoAlpha' === d &&
                        (1 === l &&
                          'hidden' === xi(t, 'visibility') &&
                          a &&
                          (l = 0),
                        x.push('visibility', 0, E.visibility),
                        vi(
                          this,
                          E,
                          'visibility',
                          l ? 'inherit' : 'hidden',
                          a ? 'inherit' : 'hidden',
                          !a
                        )),
                      'scale' !== d &&
                        'transform' !== d &&
                        ~(d = Rn[d]).indexOf(',') &&
                        (d = d.split(',')[0])),
                    (m = d in In))
                  )
                    if (
                      (this.styles.save(d),
                      g ||
                        (((v = t._gsap).renderTransform && !e.parseTransform) ||
                          Di(t, e.parseTransform),
                        (y = !1 !== e.smoothOrigin && v.smooth),
                        ((g = this._pt =
                          new fn(
                            this._pt,
                            E,
                            ei,
                            0,
                            1,
                            v.renderTransform,
                            v,
                            0,
                            -1
                          )).dep = 1)),
                      'scale' === d)
                    )
                      (this._pt = new fn(
                        this._pt,
                        v,
                        'scaleY',
                        v.scaleY,
                        (h ? vt(v.scaleY, h + a) : a) - v.scaleY || 0,
                        Bn
                      )),
                        (this._pt.u = 0),
                        C.push('scaleY', d),
                        (d += 'X');
                    else {
                      if ('transformOrigin' === d) {
                        x.push(ni, 0, E[ni]),
                          (_ = void 0),
                          (T = void 0),
                          (S = void 0),
                          (_ = (k = s).split(' ')),
                          (T = _[0]),
                          (S = _[1] || '50%'),
                          ('top' !== T &&
                            'bottom' !== T &&
                            'left' !== S &&
                            'right' !== S) ||
                            ((k = T), (T = S), (S = k)),
                          (_[0] = _i[T] || T),
                          (_[1] = _i[S] || S),
                          (s = _.join(' ')),
                          v.svg
                            ? Oi(t, s, 0, y, 0, this)
                            : ((f = parseFloat(s.split(' ')[2]) || 0) !==
                                v.zOrigin &&
                                vi(this, v, 'zOrigin', v.zOrigin, f),
                              vi(this, E, d, Pi(o), Pi(s)));
                        continue;
                      }
                      if ('svgOrigin' === d) {
                        Oi(t, s, 1, y, 0, this);
                        continue;
                      }
                      if (d in Ei) {
                        Fi(this, v, d, l, h ? vt(l, h + s) : s);
                        continue;
                      }
                      if ('smoothOrigin' === d) {
                        vi(this, v, 'smooth', v.smooth, s);
                        continue;
                      }
                      if ('force3D' === d) {
                        v[d] = s;
                        continue;
                      }
                      if ('transform' === d) {
                        Bi(this, s, t);
                        continue;
                      }
                    }
                  else d in E || (d = ui(d) || d);
                  if (
                    m ||
                    ((a || 0 === a) && (l || 0 === l) && !Fn.test(s) && d in E)
                  )
                    a || (a = 0),
                      (p = (o + '').substr((l + '').length)) !==
                        (f = Kt(s) || (d in b.units ? b.units[d] : p)) &&
                        (l = bi(t, d, o, f)),
                      (this._pt = new fn(
                        this._pt,
                        m ? v : E,
                        d,
                        l,
                        (h ? vt(l, h + a) : a) - l,
                        m ||
                        ('px' !== f && 'zIndex' !== d) ||
                        !1 === e.autoRound
                          ? Bn
                          : Un
                      )),
                      (this._pt.u = f || 0),
                      p !== f &&
                        '%' !== f &&
                        ((this._pt.b = o), (this._pt.r = Vn));
                  else if (d in E) ki.call(this, t, d, o, h ? h + s : s);
                  else if (d in t)
                    this.add(t, d, o || t[d], h ? h + s : s, i, r);
                  else if ('parseTransform' !== d) {
                    Q(d, s);
                    continue;
                  }
                  m || (d in E ? x.push(d, 0, E[d]) : x.push(d, 1, o || t[d])),
                    C.push(d);
                }
            w && pn(this);
          },
          render: function (t, e) {
            if (e.tween._time || !Pn())
              for (var n = e._pt; n; ) n.r(t, n.d), (n = n._next);
            else e.styles.revert();
          },
          get: xi,
          aliases: Rn,
          getSetter: function (t, e, n) {
            var i = Rn[e];
            return (
              i && i.indexOf(',') < 0 && (e = i),
              e in In && e !== ni && (t._gsap.x || xi(t, 'x'))
                ? n && Dn === n
                  ? 'scale' === e
                    ? Kn
                    : Zn
                  : (Dn = n || {}) && ('scale' === e ? Jn : ti)
                : t.style && !P(t.style[e])
                ? Gn
                : ~e.indexOf('-')
                ? Qn
                : rn(t, e)
            );
          },
          core: { _removeProperty: gi, _getMatrix: Li },
        };
      (Cn.utils.checkPrefix = ui),
        (Cn.core.getStyleSaver = si),
        (Ui = ht(
          (Wi = 'x,y,z,scale,scaleX,scaleY,xPercent,yPercent') +
            ',' +
            (Vi = 'rotation,rotationX,rotationY,skewX,skewY') +
            ',transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective',
          function (t) {
            In[t] = 1;
          }
        )),
        ht(Vi, function (t) {
          (b.units[t] = 'deg'), (Ei[t] = 1);
        }),
        (Rn[Ui[13]] = Wi + ',' + Vi),
        ht(
          '0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY',
          function (t) {
            var e = t.split(':');
            Rn[e[1]] = Ui[e[0]];
          }
        ),
        ht(
          'x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective',
          function (t) {
            b.units[t] = 'px';
          }
        ),
        Cn.registerPlugin(Yi);
      var Xi = Cn.registerPlugin(Yi) || Cn,
        Gi = (Xi.core.Tween, Gi || window.DrawSVGPlugin),
        Qi = Qi || window.CountUp;
      Xi.registerPlugin(Gi);
      const Zi = {
        $drawing: document.querySelectorAll('.ui-tick'),
        init: function () {
          this.$drawing.forEach(function (t) {
            var e = t,
              n = e.querySelectorAll('path'),
              i = n[1],
              r = n[2],
              o = Xi.timeline({ paused: !0 });
            o.fromTo(
              n,
              { drawSVG: '0%' },
              {
                drawSVG: '100%',
                duration: 1.5,
                ease: 'power1.out',
                onComplete: function () {
                  Xi.to(i, { opacity: 0, duration: 0.5 }),
                    Xi.to(r, { opacity: 1, duration: 0.5 });
                },
              }
            ),
              (e.tl = o);
          });
        },
      };
      var Ki = function () {
          return (
            (Ki =
              Object.assign ||
              function (t) {
                for (var e, n = 1, i = arguments.length; n < i; n++)
                  for (var r in (e = arguments[n]))
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                return t;
              }),
            Ki.apply(this, arguments)
          );
        },
        Ji = (function () {
          function t(t, e, n) {
            var i = this;
            (this.endVal = e),
              (this.options = n),
              (this.version = '2.8.0'),
              (this.defaults = {
                startVal: 0,
                decimalPlaces: 0,
                duration: 2,
                useEasing: !0,
                useGrouping: !0,
                useIndianSeparators: !1,
                smartEasingThreshold: 999,
                smartEasingAmount: 333,
                separator: ',',
                decimal: '.',
                prefix: '',
                suffix: '',
                enableScrollSpy: !1,
                scrollSpyDelay: 200,
                scrollSpyOnce: !1,
              }),
              (this.finalEndVal = null),
              (this.useEasing = !0),
              (this.countDown = !1),
              (this.error = ''),
              (this.startVal = 0),
              (this.paused = !0),
              (this.once = !1),
              (this.count = function (t) {
                i.startTime || (i.startTime = t);
                var e = t - i.startTime;
                (i.remaining = i.duration - e),
                  i.useEasing
                    ? i.countDown
                      ? (i.frameVal =
                          i.startVal -
                          i.easingFn(e, 0, i.startVal - i.endVal, i.duration))
                      : (i.frameVal = i.easingFn(
                          e,
                          i.startVal,
                          i.endVal - i.startVal,
                          i.duration
                        ))
                    : (i.frameVal =
                        i.startVal +
                        (i.endVal - i.startVal) * (e / i.duration));
                var n = i.countDown
                  ? i.frameVal < i.endVal
                  : i.frameVal > i.endVal;
                (i.frameVal = n ? i.endVal : i.frameVal),
                  (i.frameVal = Number(
                    i.frameVal.toFixed(i.options.decimalPlaces)
                  )),
                  i.printValue(i.frameVal),
                  e < i.duration
                    ? (i.rAF = requestAnimationFrame(i.count))
                    : null !== i.finalEndVal
                    ? i.update(i.finalEndVal)
                    : i.options.onCompleteCallback &&
                      i.options.onCompleteCallback();
              }),
              (this.formatNumber = function (t) {
                var e,
                  n,
                  r,
                  o,
                  s = t < 0 ? '-' : '';
                e = Math.abs(t).toFixed(i.options.decimalPlaces);
                var a = (e += '').split('.');
                if (
                  ((n = a[0]),
                  (r = a.length > 1 ? i.options.decimal + a[1] : ''),
                  i.options.useGrouping)
                ) {
                  o = '';
                  for (var l = 3, c = 0, u = 0, d = n.length; u < d; ++u)
                    i.options.useIndianSeparators &&
                      4 === u &&
                      ((l = 2), (c = 1)),
                      0 !== u && c % l == 0 && (o = i.options.separator + o),
                      c++,
                      (o = n[d - u - 1] + o);
                  n = o;
                }
                return (
                  i.options.numerals &&
                    i.options.numerals.length &&
                    ((n = n.replace(/[0-9]/g, function (t) {
                      return i.options.numerals[+t];
                    })),
                    (r = r.replace(/[0-9]/g, function (t) {
                      return i.options.numerals[+t];
                    }))),
                  s + i.options.prefix + n + r + i.options.suffix
                );
              }),
              (this.easeOutExpo = function (t, e, n, i) {
                return (n * (1 - Math.pow(2, (-10 * t) / i)) * 1024) / 1023 + e;
              }),
              (this.options = Ki(Ki({}, this.defaults), n)),
              (this.formattingFn = this.options.formattingFn
                ? this.options.formattingFn
                : this.formatNumber),
              (this.easingFn = this.options.easingFn
                ? this.options.easingFn
                : this.easeOutExpo),
              (this.startVal = this.validateValue(this.options.startVal)),
              (this.frameVal = this.startVal),
              (this.endVal = this.validateValue(e)),
              (this.options.decimalPlaces = Math.max(
                this.options.decimalPlaces
              )),
              this.resetDuration(),
              (this.options.separator = String(this.options.separator)),
              (this.useEasing = this.options.useEasing),
              '' === this.options.separator && (this.options.useGrouping = !1),
              (this.el = 'string' == typeof t ? document.getElementById(t) : t),
              this.el
                ? this.printValue(this.startVal)
                : (this.error = '[CountUp] target is null or undefined'),
              'undefined' != typeof window &&
                this.options.enableScrollSpy &&
                (this.error
                  ? console.error(this.error, t)
                  : ((window.onScrollFns = window.onScrollFns || []),
                    window.onScrollFns.push(function () {
                      return i.handleScroll(i);
                    }),
                    (window.onscroll = function () {
                      window.onScrollFns.forEach(function (t) {
                        return t();
                      });
                    }),
                    this.handleScroll(this)));
          }
          return (
            (t.prototype.handleScroll = function (t) {
              if (t && window && !t.once) {
                var e = window.innerHeight + window.scrollY,
                  n = t.el.getBoundingClientRect(),
                  i = n.top + window.pageYOffset,
                  r = n.top + n.height + window.pageYOffset;
                r < e && r > window.scrollY && t.paused
                  ? ((t.paused = !1),
                    setTimeout(function () {
                      return t.start();
                    }, t.options.scrollSpyDelay),
                    t.options.scrollSpyOnce && (t.once = !0))
                  : (window.scrollY > r || i > e) && !t.paused && t.reset();
              }
            }),
            (t.prototype.determineDirectionAndSmartEasing = function () {
              var t = this.finalEndVal ? this.finalEndVal : this.endVal;
              this.countDown = this.startVal > t;
              var e = t - this.startVal;
              if (
                Math.abs(e) > this.options.smartEasingThreshold &&
                this.options.useEasing
              ) {
                this.finalEndVal = t;
                var n = this.countDown ? 1 : -1;
                (this.endVal = t + n * this.options.smartEasingAmount),
                  (this.duration = this.duration / 2);
              } else (this.endVal = t), (this.finalEndVal = null);
              null !== this.finalEndVal
                ? (this.useEasing = !1)
                : (this.useEasing = this.options.useEasing);
            }),
            (t.prototype.start = function (t) {
              this.error ||
                (this.options.onStartCallback && this.options.onStartCallback(),
                t && (this.options.onCompleteCallback = t),
                this.duration > 0
                  ? (this.determineDirectionAndSmartEasing(),
                    (this.paused = !1),
                    (this.rAF = requestAnimationFrame(this.count)))
                  : this.printValue(this.endVal));
            }),
            (t.prototype.pauseResume = function () {
              this.paused
                ? ((this.startTime = null),
                  (this.duration = this.remaining),
                  (this.startVal = this.frameVal),
                  this.determineDirectionAndSmartEasing(),
                  (this.rAF = requestAnimationFrame(this.count)))
                : cancelAnimationFrame(this.rAF),
                (this.paused = !this.paused);
            }),
            (t.prototype.reset = function () {
              cancelAnimationFrame(this.rAF),
                (this.paused = !0),
                this.resetDuration(),
                (this.startVal = this.validateValue(this.options.startVal)),
                (this.frameVal = this.startVal),
                this.printValue(this.startVal);
            }),
            (t.prototype.update = function (t) {
              cancelAnimationFrame(this.rAF),
                (this.startTime = null),
                (this.endVal = this.validateValue(t)),
                this.endVal !== this.frameVal &&
                  ((this.startVal = this.frameVal),
                  null == this.finalEndVal && this.resetDuration(),
                  (this.finalEndVal = null),
                  this.determineDirectionAndSmartEasing(),
                  (this.rAF = requestAnimationFrame(this.count)));
            }),
            (t.prototype.printValue = function (t) {
              var e;
              if (this.el) {
                var n = this.formattingFn(t);
                (
                  null === (e = this.options.plugin) || void 0 === e
                    ? void 0
                    : e.render
                )
                  ? this.options.plugin.render(this.el, n)
                  : 'INPUT' === this.el.tagName
                  ? (this.el.value = n)
                  : 'text' === this.el.tagName || 'tspan' === this.el.tagName
                  ? (this.el.textContent = n)
                  : (this.el.innerHTML = n);
              }
            }),
            (t.prototype.ensureNumber = function (t) {
              return 'number' == typeof t && !isNaN(t);
            }),
            (t.prototype.validateValue = function (t) {
              var e = Number(t);
              return this.ensureNumber(e)
                ? e
                : ((this.error =
                    '[CountUp] invalid start or end value: '.concat(t)),
                  null);
            }),
            (t.prototype.resetDuration = function () {
              (this.startTime = null),
                (this.duration = 1e3 * Number(this.options.duration)),
                (this.remaining = this.duration);
            }),
            t
          );
        })(),
        tr = n(692);
      const er = {
        $ele: document.querySelectorAll('[data-count-to]'),
        init: function () {
          this.$ele.forEach(function (t) {
            t.counter = new Ji(t, t.getAttribute('data-count-to'), {
              startVal: Number(tr(t).html()) > 1 ? Number(tr(t).html()) : '',
              duration: Number((t.getAttribute('data-duration') / 1e3) * 1),
            });
          });
        },
      };
      var nr = n(943),
        ir = n.n(nr),
        rr = n(692),
        or = n.n(rr);
      function sr(t, e) {
        var n = t.getBoundingClientRect(),
          i = n.top,
          r = n.bottom,
          o = n.left,
          s = n.right,
          a = or().extend({ tolerance: 0, viewport: window }, e),
          l = !1,
          c = a.viewport.jquery ? a.viewport : or()(a.viewport);
        c.length ||
          (console.warn(
            'isInViewport: The viewport selector you have provided matches no element on page.'
          ),
          console.warn('isInViewport: Defaulting to viewport as window'),
          (c = or()(window)));
        var u = c.height(),
          d = c.width(),
          p = c[0].toString();
        if (
          c[0] !== window &&
          '[object Window]' !== p &&
          '[object DOMWindow]' !== p
        ) {
          var f = c[0].getBoundingClientRect();
          (i -= f.top),
            (r -= f.top),
            (o -= f.left),
            (s -= f.left),
            (sr.scrollBarWidth =
              sr.scrollBarWidth ||
              (function (t) {
                var e = or()('<div></div>').css({ width: '100%' });
                t.append(e);
                var n = t.width() - e.width();
                return e.remove(), n;
              })(c)),
            (d -= sr.scrollBarWidth);
        }
        return (
          (a.tolerance = ~~Math.round(parseFloat(a.tolerance))),
          a.tolerance < 0 && (a.tolerance = u + a.tolerance),
          s <= 0 || o >= d
            ? l
            : (l = a.tolerance
                ? i <= a.tolerance && r >= a.tolerance
                : r > 0 && i <= u)
        );
      }
      function ar(t) {
        if (t) {
          var e = t.split(',');
          return (
            1 === e.length && isNaN(e[0]) && ((e[1] = e[0]), (e[0] = void 0)),
            {
              tolerance: e[0] ? e[0].trim() : void 0,
              viewport: e[1] ? or()(e[1].trim()) : void 0,
            }
          );
        }
        return {};
      }
      or().extend(or().expr.pseudos || or().expr[':'], {
        'in-viewport': or().expr.createPseudo
          ? or().expr.createPseudo(function (t) {
              return function (e) {
                return sr(e, ar(t));
              };
            })
          : function (t, e, n) {
              return sr(t, ar(n[3]));
            },
      }),
        (or().fn.isInViewport = function (t) {
          return this.filter(function (e, n) {
            return sr(n, t);
          });
        }),
        (or().fn.run = function (t) {
          var e = this;
          1 === arguments.length && 'function' == typeof t && (t = [t]);
          if (!(t instanceof Array))
            throw new SyntaxError(
              'isInViewport: Argument(s) passed to .do/.run should be a function or an array of functions'
            );
          return (
            t.forEach(function (t) {
              'function' != typeof t
                ? (console.warn(
                    'isInViewport: Argument(s) passed to .do/.run should be a function or an array of functions'
                  ),
                  console.warn(
                    'isInViewport: Ignoring non-function values in array and moving on'
                  ))
                : [].slice.call(e).forEach(function (e) {
                    return t.call(or()(e));
                  });
            }),
            this
          );
        });
      n(527);
      const lr = {
        $max: document.querySelector('.max-total'),
        $circlesvg: document.querySelectorAll('.round-default-svg'),
        $circlepath: document.querySelectorAll('[data-count-path]'),
        $circleto: document.querySelectorAll('[data-count-to]'),
        init: function () {
          var t = this;
          if (t.$circleto.length) {
            var e = [];
            if (
              (t.$circleto.forEach(function (t, n) {
                e[n] = t.dataset.countTo;
              }),
              t.$circlesvg.forEach(function (t, n) {
                var i = t.querySelectorAll('circle');
                i.length &&
                  i.forEach(function (t, i) {
                    t.setAttribute('data-count-path', e[n]);
                  });
              }),
              t.$max)
            ) {
              var n = parseInt(t.$max.innerHTML.replace(/,/g, ''), 10) || 0;
              if (!(n < 0)) {
                localStorage.getItem('name');
                setInterval(function () {
                  n++;
                  localStorage.setItem('name', n);
                  t.$max.innerHTML = n.toLocaleString();
                }, 1e3);
              }
            }
          }
        },
        play: function () {
          this.$circlepath.forEach(function (t) {
            var e = t.getAttribute('stroke-dasharray'),
              n = t.getAttribute('data-count-path'),
              i = Number(t.getAttribute('data-duration') / 1e3);
            (e = parseInt(e)), (n = parseInt(n));
            var r = Math.floor(e - (e * n) / 100);
            (t.style.strokeDashoffset = r + 'px'),
              (t.style.transitionDuration = ''.concat(i, 's'));
          });
        },
        reset: function () {
          this.$circlepath.forEach(function (t) {
            var e = t.getAttribute('stroke-dasharray');
            t.style.strokeDashoffset = Number(e);
            var n = Number(t.getAttribute('data-duration') / 1e3);
            t.style.transitionDuration = ''.concat(n, 's');
          });
        },
      };
      var cr = n(692);
      ir().makeJQueryPlugin(cr);
      var ur = cr('body'),
        dr = {
          init: function () {
            var t = this,
              e = -cr(window).height() / 4;
            cr('[data-animation]:not(img), [data-animate]').each(function () {
              var e = cr(this),
                n = e.data('animation'),
                i = e.data('animate'),
                r = Number(e.data('animation-delay') || 0),
                o = e[0].tl;
              e.is(':in-viewport')
                ? setTimeout(function () {
                    i
                      ? t.animateRun(e, i, o)
                      : (e.addClass('visible ' + (n || '')),
                        o && o.restart().play());
                  }, r)
                : o && o.progress(0).pause();
            }),
              ur.imagesLoaded().progress(function (t, n) {
                var i = cr(n.img);
                i.data('animation') &&
                  i.appear(
                    function () {
                      var t = i.data('animation-delay');
                      setTimeout(function () {
                        i.addClass(i.data('animation')).addClass('visible');
                      }, t);
                    },
                    { accY: e }
                  );
              });
          },
          animateRun: function (t, e, n) {
            if (
              (t.addClass('visible'),
              n && n.restart().play(),
              lr && lr.play(),
              'counter' === e)
            ) {
              var i = t[0];
              i.counter && i.counter.paused && i.counter.start();
            }
          },
          animateReset: function (t, e, n) {
            t.removeClass('visible'), n && n.pause(0);
          },
          handle: function (t, e) {
            var n = this;
            cr('[data-animation]:not(img), [data-animate]').each(function () {
              var i = cr(this),
                r = i.offset().top,
                o = i.data('animation'),
                s = i.data('animate'),
                a = Number(i.data('animation-delay') || 0),
                l = 0.95 * cr(window).height(),
                c = i[0].tl;
              ('DOWN' === e && t >= r - l && !i.hasClass('visible')) ||
              ('UP' === e &&
                i.is(':in-viewport('.concat(-l, ')')) &&
                !i.hasClass('visible'))
                ? setTimeout(function () {
                    s
                      ? n.animateRun(i, s, c)
                      : (i.addClass('visible ' + (o || '')),
                        c && c.restart().play());
                  }, a)
                : 'UP' === e &&
                  !i.is(':in-viewport') &&
                  i.offset().top > t &&
                  i.hasClass('visible') &&
                  (s
                    ? n.animateReset(i, s, c)
                    : (i.removeClass('visible ' + (o || '')), c && c.pause(0)));
            });
          },
        };
      const pr = dr;
      var fr = n(692),
        hr = fr('body'),
        mr = {
          scrolled: 0,
          lastPos: 0,
          direction: 'DOWN',
          handle: function (t) {
            var e = this;
            (e.scrolled = t),
              e.scrolled < e.lastScrollPos
                ? ((e.direction = 'UP'),
                  hr.addClass('scrolling-up'),
                  hr.removeClass('scrolling-down'))
                : ((e.direction = 'DOWN'),
                  hr.addClass('scrolling-down'),
                  hr.removeClass('scrolling-up')),
              0 === e.scrolled &&
                (hr.removeClass('scrolling-up'),
                hr.removeClass('scrolling-down')),
              e.scrolled > fr(window).height()
                ? hr.addClass('viewport-scrolled')
                : hr.removeClass('viewport-scrolled'),
              e.scrolled > 10
                ? hr.addClass('scrolled')
                : hr.removeClass('scrolled'),
              (e.lastScrollPos = e.scrolled <= 0 ? 0 : e.scrolled);
          },
        };
      const gr = mr;
      var vr = n(692);
      const yr = {
        $adsense: document.querySelector('.header_bar_main'),
        $header: document.querySelector('.site-header'),
        $sticky_mobile_btn: document.querySelector('.sticky_mobile_btn'),
        $btn: document.querySelector('.humburger-btn'),
        $nav: document.querySelector('.header_right'),
        $links: document.querySelectorAll(
          'ul.main_menu > li.menu-item-has-children > a'
        ),
        $hoverlink: document.querySelectorAll(
          'ul.main_menu > li.menu-item-has-children'
        ),
        $overlay: document.querySelector('.header-overlay'),
        $moverlay: document.querySelector('.h-mob-overlay'),
        $blackheader: document.querySelector(
          ' body.category, body.page-template-about, body.page-template-contact, body.error404'
        ),
        $whiteheader: document.querySelector(
          'body.page-template-services-detail, body.single-post, body.page-template-team'
        ),
        $site: document.querySelector('.site-main-cover'),
        $mainproducts: document.querySelector(
          'ul.main_menu > li.nav-products:not(.current-page-ancestor) > a'
        ),
        $mainproductsHover: document.querySelector(
          'ul.main_menu > li.nav-products:hover:not(.current-page-ancestor) > a'
        ),
        $products: document.querySelectorAll(
          'ul.main_menu > li.nav-products:not(.current-page-ancestor) > ul > li.nav-sub-products > ul > li:not(.current_page_item) > a'
        ),
        init: function () {
          var t = this;
          if (!t.$header) return !1;
          t.$mainproducts &&
            (t.$mainproducts.addEventListener('mouseover', function (e) {
              t.$products[0].parentElement.classList.add('open');
            }),
            t.$mainproducts.addEventListener('mouseleave', function (e) {
              t.$products[0].parentElement.classList.remove('open');
            })),
            t.$mainproductsHover &&
              (t.$mainproductsHover.addEventListener('mouseover', function (e) {
                t.$products[0].parentElement.classList.add('open');
              }),
              t.$mainproductsHover.addEventListener('mouseleave', function (e) {
                t.$products[0].parentElement.classList.remove('open');
              })),
            t.$products.forEach(function (e) {
              e.addEventListener('mouseover', function (e) {
                t.$products.forEach(function (t) {
                  t.parentElement.classList.remove('open');
                }),
                  e.target.parentElement.classList.add('open');
              }),
                e.addEventListener('mouseleave', function (t) {
                  t.target.parentElement.classList.remove('open');
                });
            });
          var e = function () {
            window.scrollY > 0
              ? t.$header.classList.add('sticky-header')
              : t.$header.classList.remove('sticky-header');
          };
          window.addEventListener('scroll', e),
            window.addEventListener('load', e);
          if (!t.$btn) return !1;
          t.$btn.addEventListener('click', function (e) {
            e.preventDefault(),
              this.classList.toggle('open'),
              t.$nav.classList.toggle('open'),
              t.$moverlay.classList.toggle('open');
          });
          var n = function (e) {
              e.preventDefault();
              var n = this;
              n.classList.toggle('active');
              var i = n.parentElement;
              Array.from(i.parentElement.children).forEach(function (t) {
                t !== i &&
                  (t.classList.remove('active'), t.classList.toggle('sib'));
              }),
                i.classList.remove('sib'),
                t.$links.forEach(function (t) {
                  t !== n &&
                    t !== i &&
                    (t.parentElement.querySelector(
                      'ul.sub-menu'
                    ).style.maxHeight = '0');
                });
              var r = n.parentElement.querySelector('ul.sub-menu');
              r.style.maxHeight && '0px' !== r.style.maxHeight
                ? ((r.style.maxHeight = '0'), (r.style.overflow = 'hidden'))
                : ((r.style.maxHeight = ''.concat(400, 'px')),
                  (r.style.overflow = 'auto'));
            },
            i = function () {
              t.$overlay.classList.add('open');
            },
            r = function () {
              t.$overlay.classList.remove('open');
            };
          if (!t.$links) return !1;
          t.$links.forEach(function (t) {
            window.matchMedia('(max-width: 1023px)').matches &&
              t.addEventListener('click', n),
              t.addEventListener('mouseover', i),
              t.addEventListener('mouseleave', r);
          }),
            t.$hoverlink.forEach(function (t) {
              t.addEventListener('mouseover', i),
                t.addEventListener('mouseleave', r);
            }),
            t.$blackheader &&
              (t.$header.classList.add('black-header'),
              t.$site.classList.add('site-black-top')),
            t.$whiteheader &&
              (t.$header.classList.add('white-header'),
              t.$site.classList.add('site-white-top'));
          var o = t.$site.offsetTop + 100,
            s = function () {
              window.scrollY > o
                ? vr(t.$sticky_mobile_btn).fadeIn(900)
                : vr(t.$sticky_mobile_btn).fadeOut(900);
            };
          if (
            (window.addEventListener('scroll', s),
            window.addEventListener('load', s),
            !t.$adsense)
          )
            return !1;
          t.$adsense
            ? t.$site.classList.add('top-adsense')
            : t.$site.classList.remove('top-adsense');
        },
      };
      n(599);
      var wr = {
        init: function () {
          var t = or()('.culture-main');
          function e() {
            t.each(function () {
              var t = or()(this),
                e = or()(this).parent().children('.culture-main-appends');
              window.matchMedia('(max-width: 767px)').matches &&
                (t.hasClass('slick-initialized') ||
                  t.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: !0,
                    prevArrow:
                      '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></button>',
                    nextArrow:
                      '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></button>',
                    dots: !0,
                    speed: 1e3,
                    infinite: !1,
                    autoplay: !1,
                    variableWidth: !0,
                    appendArrows: e,
                    appendDots: e,
                    dotsClass: 'slick-dots culture-slick-dots pagination',
                    customPaging: function (t, e) {
                      var n = e + 1,
                        i = t.slideCount;
                      return (
                        '<a class="culture-dot" role="button" title="' +
                        n +
                        ' of ' +
                        i +
                        '"><span class="string">' +
                        n +
                        '<span class="culture-slash">/</span>' +
                        i +
                        '</span></a>'
                      );
                    },
                  }));
            });
          }
          e();
          var n = or()('.benefit-lists');
          function i() {
            n.each(function () {
              var t = or()(this),
                e = or()(this).parent().children('.benefit-lists-appends');
              window.matchMedia('(max-width: 767px)').matches &&
                (t.hasClass('slick-initialized') ||
                  t.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: !0,
                    prevArrow:
                      '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></button>',
                    nextArrow:
                      '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></button>',
                    dots: !0,
                    speed: 1e3,
                    infinite: !1,
                    autoplay: !1,
                    variableWidth: !0,
                    appendArrows: e,
                    appendDots: e,
                    dotsClass: 'slick-dots benefit-slick-dots pagination',
                    customPaging: function (t, e) {
                      var n = e + 1,
                        i = t.slideCount;
                      return (
                        '<a class="benefit-dot" role="button" title="' +
                        n +
                        ' of ' +
                        i +
                        '"><span class="string">' +
                        n +
                        '<span class="benefit-slash">/</span>' +
                        i +
                        '</span></a>'
                      );
                    },
                  }));
            });
          }
          i();
          var r = or()('.accreditation-row');
          function o() {
            r.each(function () {
              var t = or()(this),
                e = or()(this).parent().children('.accreditation-appends');
              window.matchMedia('(max-width: 767px)').matches &&
                (t.hasClass('slick-initialized') ||
                  t.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: !0,
                    prevArrow:
                      '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></button>',
                    nextArrow:
                      '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></button>',
                    dots: !0,
                    speed: 1e3,
                    infinite: !1,
                    autoplay: !1,
                    variableWidth: !0,
                    appendArrows: e,
                    appendDots: e,
                    adaptiveHeight: !0,
                    dotsClass: 'slick-dots accreditation-slick-dots pagination',
                    customPaging: function (t, e) {
                      var n = e + 1,
                        i = t.slideCount;
                      return (
                        '<a class="accreditation-dot" role="button" title="' +
                        n +
                        ' of ' +
                        i +
                        '"><span class="string">' +
                        n +
                        '<span class="accreditation-slash">/</span>' +
                        i +
                        '</span></a>'
                      );
                    },
                  }));
            });
          }
          o();
          var s = or()('.features-lists');
          function a() {
            s.each(function () {
              var t = or()(this),
                e = or()(this).parent().children('.features-lists-appends');
              window.matchMedia('(max-width: 767px)').matches &&
                (t.hasClass('slick-initialized') ||
                  t.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: !0,
                    prevArrow:
                      '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></button>',
                    nextArrow:
                      '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></button>',
                    dots: !0,
                    speed: 1e3,
                    infinite: !1,
                    autoplay: !1,
                    variableWidth: !0,
                    appendArrows: e,
                    appendDots: e,
                    dotsClass: 'slick-dots ftr-slick-dots pagination',
                    customPaging: function (t, e) {
                      var n = e + 1,
                        i = t.slideCount;
                      return (
                        '<a class="ftr-dot" role="button" title="' +
                        n +
                        ' of ' +
                        i +
                        '"><span class="string">' +
                        n +
                        '<span class="ftr-slash">/</span>' +
                        i +
                        '</span></a>'
                      );
                    },
                  }));
            });
          }
          a();
          var l = or()('.comparison-rows'),
            c = function () {
              l.each(function () {
                var t = or()(this);
                window.matchMedia('(max-width: 767px)').matches &&
                  (t.hasClass('slick-initialized') ||
                    t.slick({
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      arrows: !0,
                      prevArrow:
                        '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></button>',
                      nextArrow:
                        '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></button>',
                      dots: !1,
                      speed: 1e3,
                      infinite: !1,
                      autoplay: !1,
                    }));
              });
            };
          c();
          var u = or()('.training-lists');
          function d() {
            u.each(function () {
              var t = or()(this),
                e = or()(this).parent().children('.training-main-appends');
              window.matchMedia('(max-width: 767px)').matches &&
                (t.hasClass('slick-initialized') ||
                  t.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: !0,
                    prevArrow:
                      '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></button>',
                    nextArrow:
                      '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></button>',
                    dots: !0,
                    speed: 1e3,
                    infinite: !1,
                    autoplay: !1,
                    adaptiveHeight: !0,
                    variableWidth: !0,
                    appendArrows: e,
                    appendDots: e,
                    dotsClass: 'slick-dots training-slick-dots pagination',
                    customPaging: function (t, e) {
                      var n = e + 1,
                        i = t.slideCount;
                      return (
                        '<a class="training-dot" role="button" title="' +
                        n +
                        ' of ' +
                        i +
                        '"><span class="string">' +
                        n +
                        '<span class="training-slash">/</span>' +
                        i +
                        '</span></a>'
                      );
                    },
                  }));
            });
          }
          d();
          var p = or()('.carousel-slider'),
            f = p.children('.carousel-item').clone();
          p.append(f),
            p.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              speed: 1e3,
              autoplaySpeed: 1e3,
              autoplay: !0,
              arrows: !0,
              prevArrow:
                '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></button>',
              nextArrow:
                '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></button>',
              variableWidth: !0,
              infinite: !0,
              focusOnSelect: !0,
              responsive: [{ breakpoint: 768, settings: { arrows: !1 } }],
            }),
            (window.onresize = function () {
              t.each(function () {
                var t = or()(this);
                or()(window).width() >= 768 &&
                  t.hasClass('slick-initialized') &&
                  t.slick('unslick');
              }),
                e(),
                n.each(function () {
                  var t = or()(this);
                  or()(window).width() >= 768 &&
                    t.hasClass('slick-initialized') &&
                    t.slick('unslick');
                }),
                i(),
                s.each(function () {
                  var t = or()(this);
                  or()(window).width() >= 768 &&
                    t.hasClass('slick-initialized') &&
                    t.slick('unslick');
                }),
                a(),
                r.each(function () {
                  var t = or()(this);
                  or()(window).width() >= 768 &&
                    t.hasClass('slick-initialized') &&
                    t.slick('unslick');
                }),
                o(),
                c(),
                u.each(function () {
                  var t = or()(this);
                  or()(window).width() >= 768 &&
                    t.hasClass('slick-initialized') &&
                    t.slick('unslick');
                }),
                d();
            });
        },
      };
      const br = wr;
      const xr = {
        $links: document.querySelectorAll('ul.filter-category li a'),
        $eles: document.querySelectorAll(
          'ul.filter-category li:not(:first-child) a'
        ),
        $filterData: document.querySelectorAll('.filter-doc-row'),
        $ftrbtn: document.querySelector('.filter-doc-btn'),
        $ftrlinks: document.querySelectorAll('.filter-category-links'),
        init: function () {
          var t = this;
          t.$links.length > 0 &&
            t.$links[0].parentElement.classList.add('tab-open'),
            t.$eles.forEach(function (e, n) {
              e.addEventListener('click', function (e) {
                t.$links.forEach(function (t) {
                  t.parentElement.classList.remove('tab-open');
                }),
                  t.$eles.forEach(function (t) {
                    t.parentElement.classList.remove('tab-open');
                  });
                this.parentElement.classList.add('tab-open');
              });
            });
          var e = window.matchMedia('(max-width: 767px)'),
            n = function (n) {
              var i = n.target.parentElement.parentElement.parentElement;
              if (n.target && e.matches) {
                var r = n.target.textContent;
                (t.$ftrbtn.querySelector('span').textContent = r),
                  (i.style.maxHeight = '0px'),
                  (i.dataset.id = 'false');
              } else i.removeAttribute('style');
            };
          t.$eles.forEach(function (t) {
            t.addEventListener('click', n), t.addEventListener('change', n);
          });
          t.$ftrbtn &&
            t.$ftrbtn.addEventListener('click', function (e) {
              e.preventDefault(), e.target.classList.toggle('open');
              var n = document.querySelector('.filter-category-links');
              'true' !== n.dataset.open
                ? (t.$ftrlinks.forEach(function (t) {
                    if (t !== n) {
                      t.dataset.open = 'false';
                      var e = t.querySelector('.filter-category-links');
                      e && (e.style.maxHeight = '');
                    }
                  }),
                  (n.dataset.open = 'true'),
                  (n.style.maxHeight = ''.concat(n.scrollHeight, 'px')))
                : ((n.dataset.open = 'false'), (n.style.maxHeight = '0px'));
            });
        },
      };
      const kr = {
        init: function () {
          var t, e, n, i;
          (t = '.accordion-list'),
            (e = '.accordion-header'),
            (n = '.accordion-content'),
            (i = document.querySelectorAll(t)).length &&
              i.forEach(function (t) {
                var r = t.querySelector(e),
                  o = t.querySelector(n);
                r.addEventListener('click', function () {
                  'true' !== t.dataset.open
                    ? (i.forEach(function (i) {
                        if (i !== t) {
                          i.dataset.open = 'false';
                          var r = i.querySelector(e);
                          r && r.classList.remove('open');
                          var o = i.querySelector(n);
                          o && (o.style.maxHeight = '');
                        }
                      }),
                      (t.dataset.open = 'true'),
                      r.classList.add('open'),
                      (o.style.maxHeight = ''.concat(o.scrollHeight, 'px')))
                    : ((t.dataset.open = 'false'),
                      r.classList.remove('open'),
                      (o.style.maxHeight = ''));
                }),
                  window.addEventListener('resize', function () {
                    'true' === t.dataset.open &&
                      Number(o.style.maxHeight) !== o.scrollHeight &&
                      (o.style.maxHeight = ''.concat(o.scrollHeight, 'px'));
                  });
              });
        },
      };
      const _r = {
        init: function () {
          var t = document.querySelectorAll('.tab-slide-up'),
            e = function () {
              t.forEach(function (t) {
                var e = t.querySelector('.tab-head').offsetHeight + 41;
                if (
                  ((t.style.height = ''.concat(e, 'px')),
                  (t.dataset.initialHeight = e),
                  'true' === t.dataset.tab)
                ) {
                  var n = t.querySelector('.tab-desc');
                  n && (n.style.maxHeight = ''.concat(n.scrollHeight, 'px'));
                }
              });
            };
          e(),
            t.forEach(function (t) {
              var e = t.querySelector('.tab-head');
              t.addEventListener('click', function (e) {
                if (
                  !e.target.closest('a') &&
                  (e.preventDefault(),
                  e.stopPropagation(),
                  'true' !== t.dataset.tab)
                ) {
                  document
                    .querySelectorAll('.tab-slide-up')
                    .forEach(function (e) {
                      if (t !== e) {
                        (e.dataset.tab = 'false'),
                          e.classList.remove('tab-open');
                        var n = e.querySelector('.tab-desc');
                        n && (n.style.maxHeight = ''),
                          (e.style.height = ''.concat(
                            e.dataset.initialHeight,
                            'px'
                          ));
                      }
                    }),
                    (t.dataset.tab = 'true'),
                    t.classList.add('tab-open'),
                    (t.style.height = 'calc(100% - 8px)');
                  var n = t.querySelector('.tab-desc');
                  n && (n.style.maxHeight = ''.concat(n.scrollHeight, 'px'));
                }
              }),
                e
                  .querySelector('.tab-arrow')
                  .addEventListener('click', function (e) {
                    if (
                      (e.stopPropagation(),
                      e.preventDefault(),
                      'true' === t.dataset.tab)
                    ) {
                      (t.dataset.tab = 'false'), t.classList.remove('tab-open');
                      var n = t.querySelector('.tab-desc');
                      (t.style.height = ''.concat(
                        t.dataset.initialHeight,
                        'px'
                      )),
                        n && (n.style.maxHeight = '');
                    }
                  });
            }),
            document.addEventListener('click', function (t) {
              t.target.closest('.tab-slide-up') ||
                document
                  .querySelectorAll('.tab-slide-up')
                  .forEach(function (t) {
                    (t.dataset.tab = 'false'), t.classList.remove('tab-open');
                    var e = t.querySelector('.tab-desc');
                    e && (e.style.maxHeight = ''),
                      (t.style.height = ''.concat(
                        t.dataset.initialHeight,
                        'px'
                      ));
                  });
            }),
            window.addEventListener('resize', e),
            window.addEventListener('orientationchange', e);
        },
      };
      const Tr = {
        init: function () {
          var t = document.querySelector('button.res-srch-icon');
          t &&
            t.addEventListener('click', function (t) {
              t.preventDefault(),
                document
                  .querySelector('.res-srch-form')
                  .classList.toggle('open');
            });
        },
      };
      const Sr = {
        $ele: document.querySelectorAll('.tab-links-d'),
        $tabs: document.querySelectorAll('.tab-links-main'),
        init: function () {
          var t = this,
            e = function (e) {
              e.preventDefault();
              var n = e.target;
              t.$ele.forEach(function (t) {
                t !== n && t.classList.remove('open');
              }),
                'SPAN' === n.tagName && (n = e.target.parentElement),
                'svg' === n.tagName &&
                  (n = e.target.parentElement.parentElement);
              var i = n.getAttribute('data-name'),
                r = document.querySelector(
                  '.tab-links-main[data-value='.concat(i, ']')
                );
              r.length < 0 ||
                (t.$tabs.forEach(function (t) {
                  t !== r &&
                    (n.classList.remove('open'),
                    (t.style.maxHeight = ''),
                    (t.dataset.id = 'false'));
                }),
                r && 'true' !== r.dataset.id
                  ? (n.classList.toggle('open'),
                    (r.style.maxHeight = ''.concat(r.scrollHeight, 'px')),
                    (r.dataset.id = 'true'))
                  : (n.classList.remove('open'),
                    (r.style.maxHeight = ''),
                    (r.dataset.id = 'false')));
            };
          !t.$ele.length < 0 ||
            t.$ele.forEach(function (t) {
              t.addEventListener('click', e);
            });
        },
      };
      function Cr(t) {
        return (
          (function (t) {
            if (Array.isArray(t)) return Er(t);
          })(t) ||
          (function (t) {
            if (
              ('undefined' != typeof Symbol && null != t[Symbol.iterator]) ||
              null != t['@@iterator']
            )
              return Array.from(t);
          })(t) ||
          (function (t, e) {
            if (t) {
              if ('string' == typeof t) return Er(t, e);
              var n = {}.toString.call(t).slice(8, -1);
              return (
                'Object' === n && t.constructor && (n = t.constructor.name),
                'Map' === n || 'Set' === n
                  ? Array.from(t)
                  : 'Arguments' === n ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                  ? Er(t, e)
                  : void 0
              );
            }
          })(t) ||
          (function () {
            throw new TypeError(
              'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            );
          })()
        );
      }
      function Er(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, i = Array(e); n < e; n++) i[n] = t[n];
        return i;
      }
      const $r = {
        $body: document.querySelector('body'),
        $center: document.querySelector('.modal-main .modal-center'),
        $ele: [].concat(
          Cr(document.querySelectorAll('.modal-btn')),
          Cr(document.querySelectorAll('a[href="#modal-btn"]'))
        ),
        $window: document.querySelector('.modal-window'),
        $main: document.querySelector('.modal-main'),
        $close: document.querySelector('.modal-main .modal-close'),
        init: function () {
          var t = this,
            e = function (e) {
              (e.preventDefault(),
              e.target.classList.toggle('open'),
              t.$window) &&
                (or()(t.$window).fadeToggle(900),
                or()(t.$main).fadeToggle(800));
            };
          if (
            (t.$ele.forEach(function (t) {
              t.addEventListener('click', e);
            }),
            window.location.href.includes('#modal') &&
              !window.location.href.includes('#chatai-modal-btn'))
          ) {
            var n = t.$ele[0];
            n && n.click();
          }
          if (!t.$close) return !1;
          t.$close.addEventListener('click', e);
          t.$body.addEventListener('click', function (e) {
            e.target.contains(t.$center) &&
              (or()(t.$window).fadeOut(800), or()(t.$main).fadeOut(800));
          });
        },
      };
      function Ar(t) {
        return (
          (function (t) {
            if (Array.isArray(t)) return Lr(t);
          })(t) ||
          (function (t) {
            if (
              ('undefined' != typeof Symbol && null != t[Symbol.iterator]) ||
              null != t['@@iterator']
            )
              return Array.from(t);
          })(t) ||
          (function (t, e) {
            if (t) {
              if ('string' == typeof t) return Lr(t, e);
              var n = {}.toString.call(t).slice(8, -1);
              return (
                'Object' === n && t.constructor && (n = t.constructor.name),
                'Map' === n || 'Set' === n
                  ? Array.from(t)
                  : 'Arguments' === n ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                  ? Lr(t, e)
                  : void 0
              );
            }
          })(t) ||
          (function () {
            throw new TypeError(
              'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            );
          })()
        );
      }
      function Lr(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, i = Array(e); n < e; n++) i[n] = t[n];
        return i;
      }
      const Or = {
        $bodyChart: document.querySelector('body'),
        $centerChart: document.querySelector('.modal-main-chart .modal-center'),
        $eleChart: [].concat(
          Ar(document.querySelectorAll('.modal-chart-btn')),
          Ar(document.querySelectorAll('a[href="#chatai-modal-btn"]'))
        ),
        $windowChart: document.querySelector('.modal-window-chart'),
        $mainChart: document.querySelector('.modal-main-chart'),
        $closeChart: document.querySelector('.modal-main-chart .modal-close'),
        init: function () {
          var t = this,
            e = function (e) {
              (e.preventDefault(),
              e.target.classList.toggle('open'),
              t.$windowChart) &&
                (or()(t.$windowChart).fadeToggle(900),
                or()(t.$mainChart).fadeToggle(800));
            };
          if (
            (t.$eleChart.forEach(function (t) {
              t.addEventListener('click', e);
            }),
            window.location.href.includes('#chatai-modal-btn') &&
              !window.location.href.includes('#modal'))
          ) {
            var n = t.$eleChart[0];
            n && n.click();
          }
          if (!t.$closeChart) return !1;
          t.$closeChart.addEventListener('click', e);
          t.$bodyChart.addEventListener('click', function (e) {
            e.target.contains(t.$centerChart) &&
              (or()(t.$windowChart).fadeOut(800),
              or()(t.$mainChart).fadeOut(800));
          });
        },
      };
      n(732);
      var Dr = {
        $youtube: document.querySelectorAll('.popup-youtube'),
        $video: document.querySelectorAll('.popup-vimeo'),
        $modal: document.querySelectorAll('.popup-modal'),
        init: function () {
          var t = this;
          t.$youtube.forEach(function (t) {
            var e, n;
            or()(t).magnificPopup({
              type: 'iframe',
              mainClass: 'mfp-video',
              removalDelay: 160,
              preloader: !1,
              fixedContentPos: !0,
              iframe: {
                patterns: {
                  youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src:
                      ((e =
                        /Chrome/.test(navigator.userAgent) &&
                        /Google Inc/.test(navigator.vendor)),
                      (n =
                        'https://www.youtube.com/embed/%id%?autoplay=1&rel=0'),
                      e ? n + '&mute=1' : n),
                  },
                },
              },
            });
          }),
            t.$video.forEach(function (t) {
              or()(t).magnificPopup({
                type: 'iframe',
                mainClass: 'mfp-video',
                removalDelay: 160,
                preloader: !1,
                fixedContentPos: !0,
              });
            }),
            t.$modal.forEach(function (t) {
              t.magnificPopup({
                type: 'inline',
                fixedContentPos: !0,
                fixedBgPos: !0,
                overflowY: 'auto',
                preloader: !1,
                removalDelay: 160,
                mainClass: 'my-mfp-slide-top',
              });
            });
        },
      };
      const Pr = Dr;
      var Mr = {
        $e: document.querySelectorAll('ul.our-journey-links > li > a'),
        $t: document.querySelector('ul.our-journey-links > li:first-child > a'),
        jn: function (t, e) {
          t.preventDefault(),
            e.forEach(function (t) {
              return t.classList.remove('active');
            });
          var n = t.target;
          'SPAN' === n.tagName && (n = n.parentElement),
            n.classList.toggle('active');
          var i = n.getAttribute('data-name'),
            r = document.querySelectorAll('.our-journey-row'),
            o = document.querySelector(
              '.our-journey-row[data-value='.concat(i, ']')
            ),
            s = or()(o);
          r.forEach(function (t) {
            or()(t).hide();
          }),
            s.fadeIn(800);
        },
        init: function () {
          var t = this;
          t.$t &&
            (t.$t.classList.add('active'),
            t.$e.forEach(function (e) {
              e.addEventListener('click', function (e) {
                return t.jn(e, t.$e);
              });
            }));
        },
      };
      const Ir = Mr;
      const qr = {
        $ele: document.querySelectorAll('.testimonial-list'),
        $mele: document.querySelectorAll('.testimonial-mobile'),
        init: function () {
          var t = this,
            e = Array.from(t.$ele),
            n = Array.from(t.$mele);
          e.length > 0 && e.at(0).classList.add('slide-open'),
            n.length > 0 && n.at(0).classList.add('slide-open');
          var i = function (t) {
            t.preventDefault();
            var i = t.currentTarget;
            e.length > 0 && e.at(0).classList.add('slide-open'),
              e.length > 0 &&
                e.forEach(function (t) {
                  t.classList.remove('slide-open');
                }),
              i.classList.add('slide-open'),
              n.length > 0 &&
                n.forEach(function (t) {
                  t.classList.remove('slide-open'), or()(t).hide();
                });
            var r = i.getAttribute('data-slide'),
              o = document.querySelector(
                '.testimonial-mobile[data-text="' + r + '"]'
              );
            o.classList.add('slide-open'), or()(o).fadeIn('800');
          };
          t.$ele.forEach(function (t) {
            t.addEventListener('click', i);
          });
        },
      };
      var Hr = n(440),
        jr = n.n(Hr);
      function zr(t) {
        return (
          (zr =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    'function' == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? 'symbol'
                    : typeof t;
                }),
          zr(t)
        );
      }
      function Nr(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            'value' in i && (i.writable = !0),
            Object.defineProperty(t, Fr(i.key), i);
        }
      }
      function Fr(t) {
        var e = (function (t, e) {
          if ('object' != zr(t) || !t) return t;
          var n = t[Symbol.toPrimitive];
          if (void 0 !== n) {
            var i = n.call(t, e || 'default');
            if ('object' != zr(i)) return i;
            throw new TypeError('@@toPrimitive must return a primitive value.');
          }
          return ('string' === e ? String : Number)(t);
        })(t, 'string');
        return 'symbol' == zr(e) ? e : e + '';
      }
      var Rr = (function () {
        return (function (t, e, n) {
          return (
            e && Nr(t.prototype, e),
            n && Nr(t, n),
            Object.defineProperty(t, 'prototype', { writable: !1 }),
            t
          );
        })(
          function t(e) {
            var n = this;
            !(function (t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function');
            })(this, t),
              (this.DOM = {}),
              (this.bounds = {}),
              (this.pos = { x: 0, y: 0 }),
              (this.hover = !1),
              (this.req = null),
              (this.DOM.el = e),
              (this.DOM.items = e.querySelectorAll('[data-mp-item]')),
              (this.bounds.el = this.DOM.el.getBoundingClientRect()),
              (this.bounds.items = Array.from(this.DOM.items).map(function (t) {
                return t.getBoundingClientRect();
              })),
              (this.itemsProps = this.bounds.items.map(function (t) {
                return { x: 0, y: 0, scale: 1 };
              })),
              (this.lastItemsProps = this.itemsProps),
              this.DOM.el.addEventListener(
                'mouseenter',
                function () {
                  return n.enter();
                },
                !1
              ),
              this.DOM.el.addEventListener(
                'mouseleave',
                function () {
                  return n.leave();
                },
                !1
              ),
              this.DOM.el.addEventListener(
                'mousemove',
                function (t) {
                  return n.move(t);
                },
                !1
              ),
              this.render();
          },
          [
            {
              key: 'enter',
              value: function () {
                this.DOM.el.classList.add('hover');
              },
            },
            {
              key: 'leave',
              value: function () {
                this.DOM.el.classList.remove('hover'),
                  (this.itemsProps = this.bounds.items.map(function (t) {
                    return { x: 0, y: 0, scale: 1 };
                  }));
              },
            },
            {
              key: 'move',
              value: function (t) {
                var e = this;
                (this.bounds.el = this.DOM.el.getBoundingClientRect()),
                  (this.bounds.items = Array.from(this.DOM.items).map(function (
                    t
                  ) {
                    return t.getBoundingClientRect();
                  })),
                  (this.itemsProps = this.bounds.items.map(function (n, i) {
                    var r =
                        Number(e.DOM.items[i].getAttribute('data-mp-scale')) ||
                        1,
                      o =
                        Number(e.DOM.items[i].getAttribute('data-mp-lerp')) ||
                        0.1;
                    return {
                      x: (t.clientX - n.x - n.width / 2) * o,
                      y: (t.clientY - n.y - n.height / 2) * o,
                      scale: r,
                    };
                  })),
                  (this.pos.x = t.clientX - this.bounds.el.width / 2),
                  (this.pos.y = t.clientY - this.bounds.el.height / 2);
              },
            },
            {
              key: 'render',
              value: function (t) {
                var e = this;
                (this.req = requestAnimationFrame(function (t) {
                  return e.render(t);
                })),
                  (this.lastItemsProps = this.itemsProps.map(function (t, n) {
                    var i =
                      Number(e.DOM.items[n].getAttribute('data-mp-lerp')) ||
                      0.1;
                    return {
                      x: jr()(e.lastItemsProps[n].x, t.x, i).toFixed(2),
                      y: jr()(e.lastItemsProps[n].y, t.y, i).toFixed(2),
                      scale: jr()(e.lastItemsProps[n].scale, t.scale, i),
                    };
                  })),
                  this.DOM.items.forEach(function (t, n) {
                    t.style.transform = 'translate3d('
                      .concat(e.lastItemsProps[n].x, 'px, ')
                      .concat(e.lastItemsProps[n].y, 'px, 0) scale(')
                      .concat(e.lastItemsProps[n].scale, ')');
                  });
              },
            },
          ]
        );
      })();
      const Br = Rr;
      const Wr = {
        $mp: null,
        init: function () {
          (this.$mp = document.querySelectorAll('[data-mp]')),
            this.$mp.forEach(function (t) {
              return new Br(t);
            });
        },
      };
      const Vr = {
        $hdr: document.querySelector('header.site-header'),
        $ele: document.querySelector('.sticky-share'),
        $aside: document.querySelector('aside.resource-aside'),
        init: function () {
          var t = this;
          if (t.$aside) {
            var e = function (t, e) {
                var n;
                return function () {
                  var i = this,
                    r = arguments;
                  clearTimeout(n),
                    (n = setTimeout(function () {
                      return t.apply(i, r);
                    }, e));
                };
              },
              n = function () {
                if (t.$hdr && t.$aside && t.$ele) {
                  var e = t.$hdr.clientHeight + 100 + t.$aside.clientHeight,
                    n = t.$ele.clientHeight - e;
                  Math.floor(window.scrollY) > n
                    ? t.$aside.classList.add('opa')
                    : t.$aside.classList.remove('opa');
                }
              };
            n(),
              window.addEventListener('load', n),
              window.addEventListener('scroll', e(n, 10)),
              window.addEventListener('resize', e(n, 50));
          }
        },
      };
      var Ur = {
        $e: document.querySelectorAll('ul.how-work-links > li > a'),
        $t: document.querySelector('ul.how-work-links > li:first-child > a'),
        $firstp: document.querySelector(
          'ul.how-work-links > li:first-child > a > p'
        ),
        $p: document.querySelectorAll('ul.how-work-links > li > a > p'),
        jn: function (t, e, n) {
          t.preventDefault(),
            e.forEach(function (t) {
              return t.classList.remove('active');
            }),
            e.forEach(function (t) {
              (t.children[2].style.maxHeight = ''.concat(0, 'px')),
                (t.style.maxHeight = ''.concat(n.scrollHeight, 'px'));
            });
          var i = t.target;
          'SPAN' === i.tagName && (i = i.parentElement),
            i.classList.toggle('active');
          var r = i.children[2];
          r.style.maxHeight = ''.concat(r.scrollHeight, 'px');
          var o = i.getAttribute('data-name'),
            s = document.querySelectorAll('.how-work-row'),
            a = document.querySelectorAll(
              '.how-work-row[data-value='.concat(o, ']')
            ),
            l = or()(a);
          s.forEach(function (t) {
            or()(t).hide();
          }),
            l.fadeIn(800);
        },
        init: function () {
          var t = this;
          t.$t &&
            (t.$t.classList.add('active'),
            (t.$firstp.style.maxHeight = ''.concat(
              t.$firstp.scrollHeight,
              'px'
            )),
            t.$e.forEach(function (e) {
              e.addEventListener('click', function (e) {
                return t.jn(e, t.$e, t.$p);
              });
            }));
        },
      };
      const Yr = Ur;
      const Xr = {
        init: function () {
          var t = or()('.explore-main');
          function e() {
            t.each(function () {
              var t = or()(this),
                e = t.children().length,
                n = or()('.explore-appends');
              window.matchMedia('(max-width: 1439px)').matches
                ? t.hasClass('slick-initialized') ||
                  t.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: !0,
                    prevArrow:
                      '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></button>',
                    nextArrow:
                      '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></button>',
                    dots: !0,
                    speed: 1e3,
                    infinite: !1,
                    autoplay: !1,
                    variableWidth: !0,
                    appendArrows: n,
                    appendDots: n,
                  })
                : e >= 5 &&
                  !t.hasClass('slick-initialized') &&
                  t.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: !0,
                    prevArrow:
                      '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></button>',
                    nextArrow:
                      '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></button>',
                    dots: !0,
                    speed: 1e3,
                    infinite: !1,
                    autoplay: !1,
                    variableWidth: !0,
                    appendArrows: n,
                    appendDots: n,
                  });
            });
          }
          e(),
            (window.onresize = function () {
              e();
            });
        },
      };
      const Gr = {
        $ele: document.querySelectorAll('.comparison-slider'),
        init: function () {
          this.$ele.forEach(function (t) {
            var e = or()(t),
              n = e
                .closest('.comparison-slider-main')
                .children('.comparison-appends');
            window.matchMedia('(max-width: 767px)').matches &&
              (e.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: !0,
                prevArrow:
                  '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></button>',
                nextArrow:
                  '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></button>',
                dots: !0,
                speed: 1e3,
                infinite: !1,
                autoplay: !1,
                appendArrows: n,
                appendDots: n,
              }),
              e.on('afterChange', function (t, e, n) {
                or()('.comparison-vd-btns button').hide(),
                  or()('#btn-' + n).show();
              }));
          });
        },
      };
      var Qr = {
        $e: document.querySelectorAll('.beyond-link'),
        $t: document.querySelector(
          'ul.beyond-links > li:first-child > .beyond-link'
        ),
        $firstp: document.querySelector(
          'ul.beyond-links > li:first-child .beyond-link-desc'
        ),
        $p: document.querySelectorAll('.beyond-link-desc'),
        $row: document.querySelectorAll('.beyond-row'),
        $textrow: document.querySelectorAll('.beyond-text-row'),
        beyondfun: function (t, e, n) {
          t.preventDefault(),
            e.forEach(function (t) {
              return t.classList.remove('active');
            }),
            e.forEach(function (t) {
              (t.children[2].style.maxHeight = ''.concat(0, 'px')),
                (t.style.maxHeight = ''.concat(n.scrollHeight, 'px'));
            });
          var i = t.target;
          'IMG' === i.tagName && (i = i.parentElement),
            'SPAN' === i.tagName && (i = i.parentElement),
            i.classList.toggle('active');
          var r = i.children[2];
          if (r) {
            r.style.maxHeight = ''.concat(r.scrollHeight, 'px');
            var o = i.getAttribute('data-name'),
              s = document.querySelectorAll('.beyond-row'),
              a = document.querySelectorAll(
                '.beyond-row[data-value='.concat(o, ']')
              ),
              l = or()(a).children('.beyond-image');
            s.forEach(function (t) {
              or()(t).children('.beyond-image').css({ transform: 'scale(0)' });
            }),
              l.css({ transform: 'scale(1)' });
            var c = document.querySelectorAll('.beyond-text-row'),
              u = document.querySelectorAll(
                '.beyond-text-row[data-value='.concat(o, ']')
              );
            c.forEach(function (t) {
              t.style.maxHeight = ''.concat(0, 'px');
            }),
              u.forEach(function (t) {
                t.style.maxHeight = ''.concat(t.scrollHeight, 'px');
              });
          }
        },
        init: function () {
          var t = this;
          t.$t &&
            (t.$t.classList.add('active'),
            (t.$firstp.style.maxHeight = ''.concat(
              t.$firstp.scrollHeight,
              'px'
            )),
            t.$row[0].classList.add('open'),
            t.$textrow[0].classList.add('open'),
            (t.$textrow[0].style.maxHeight = ''.concat(
              t.$textrow[0].scrollHeight,
              'px'
            )),
            t.$e.forEach(function (e) {
              e.addEventListener('click', function (e) {
                return t.beyondfun(e, t.$e, t.$p);
              });
            }));
        },
      };
      const Zr = Qr;
      const Kr = {
        $ele: document.querySelectorAll('.compare-slider'),
        init: function () {
          this.$ele.forEach(function (t) {
            var e = or()(t),
              n = e
                .closest('.compare-slider-main')
                .children('.compare-appends');
            window.matchMedia('(max-width: 767px)').matches &&
              (e.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: !0,
                prevArrow:
                  '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></button>',
                nextArrow:
                  '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></button>',
                dots: !0,
                speed: 1e3,
                infinite: !1,
                autoplay: !1,
                appendArrows: n,
                appendDots: n,
              }),
              e.on('afterChange', function (t, e, n) {
                or()('.product-icon, .iconnames').hide(),
                  or()('#icon-' + n).show(),
                  or()('#iconname-' + n).show();
              }));
          });
        },
      };
      const Jr = {
        $ele: document.querySelector('ul.pdetail-ui-links'),
        $links: document.querySelectorAll('ul.pdetail-ui-links > li > a'),
        $slide: document.querySelector('.pdetail-ui-tabs'),
        progressIntervals: [],
        init: function () {
          var t = this;
          if (t.$slide) {
            var e = or()(t.$slide),
              n = Number(t.$slide.getAttribute('data-duration')) || 2e3;
            e &&
              (e.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: !1,
                arrows: !1,
                infinite: !0,
                autoplay: !0,
                autoplaySpeed: n,
                focusOnSelect: !0,
              }),
              t.$links[0].classList.add('ui-open'),
              t.$links.forEach(function (i, r) {
                i.addEventListener('click', function (o) {
                  o.preventDefault();
                  var s = parseInt(this.getAttribute('data-name').slice(-1));
                  e.slick('slickGoTo', s),
                    t.resetAndAnimateProgressBar(i, n, r),
                    t.removeActiveClass(),
                    this.classList.add('ui-open');
                });
              }),
              e.on('beforeChange', function (e, i, r, o) {
                t.removeActiveClass();
                var s = t.$links[o];
                s.classList.add('ui-open'),
                  t.resetAndAnimateProgressBar(s, n, o);
              }),
              t.resetAndAnimateProgressBar(t.$links[0], n, 0));
          }
        },
        removeActiveClass: function () {
          this.$links.forEach(function (t) {
            var e = t.querySelector('.ui-active-state');
            t.classList.remove('ui-open'),
              (e.style.transition = 'none'),
              (e.style.width = '0%'),
              setTimeout(function () {
                e.style.transition = '';
              }, 50);
          });
        },
        resetAndAnimateProgressBar: function (t, e, n) {
          var i = this,
            r = t.querySelector('.ui-active-state');
          i.progressIntervals[n] &&
            (clearInterval(i.progressIntervals[n]),
            (i.progressIntervals[n] = null)),
            (r.style.transition = 'none'),
            (r.style.width = '0%'),
            setTimeout(function () {
              (r.style.transition = 'width '.concat(e, 'ms linear')),
                (r.style.width = '100%');
            }, 50);
        },
        updateProgressBar: function (t, e) {
          t && (t.style.width = ''.concat(e, '%'));
        },
      };
      var to = {
        $body: document.querySelector('body'),
        $header: document.querySelector('.site-header'),
        $section: document.querySelector('.scrolly-section'),
        $links: document.querySelectorAll('.scrolly-link'),
        $rows: document.querySelectorAll('.scrolly-row'),
        init: function () {
          var t = this;
          if (t.$links.length) {
            var e = function () {
              var e = Math.ceil(window.scrollY),
                n = window.innerHeight;
              t.$links.forEach(function (t) {
                t.classList.remove('current');
              }),
                t.$links.forEach(function (t, i) {
                  var r = document.querySelector(t.hash);
                  if (r) {
                    var o = r.offsetTop,
                      s = o + r.offsetHeight;
                    ((e >= o && e < s) || (o < e + n && s >= e)) &&
                      t.classList.add('current');
                  }
                });
            };
            window.addEventListener('load', e),
              window.addEventListener('scroll', e);
            window.addEventListener('scroll', function () {
              var e = t.$rows;
              e.forEach(function (t, n) {
                var i = window.innerHeight;
                e[n].getBoundingClientRect().top < i - 0
                  ? e[n].classList.add('scrolly-sticky')
                  : e[n].classList.remove('scrolly-sticky');
              });
            });
            window.addEventListener('scroll', function () {
              if (t.$section) {
                var e = t.$section.offsetTop - t.$header.offsetHeight,
                  n = Math.ceil(window.scrollY);
                n >= e
                  ? (t.$section.classList.add('scrolly-intro'),
                    t.$body.classList.add('scrolly-body'),
                    t.$header.classList.add('scrolly-header'))
                  : (t.$section.classList.remove('scrolly-intro'),
                    t.$body.classList.remove('scrolly-body'),
                    t.$header.classList.remove('scrolly-header')),
                  n > t.$section.offsetTop + t.$section.offsetHeight &&
                    t.$header.classList.remove('scrolly-header');
              }
            });
          }
        },
      };
      const eo = to;
      var no = function () {
        document.querySelectorAll('.quantity-num').forEach(function (t) {
          if (t.closest('.quantity-block')) {
            var e = t
                .closest('.quantity-block')
                .querySelector('.quantity-arrow-minus'),
              n = t
                .closest('.quantity-block')
                .querySelector('.quantity-arrow-plus');
            e.addEventListener('click', function (e) {
              return (function (t, e) {
                t.preventDefault();
                var n = parseInt(e.value, 10) || 0;
                n > 1 && (e.value = n - 1);
              })(e, t);
            }),
              n.addEventListener('click', function (e) {
                return (function (t, e) {
                  t.preventDefault();
                  var n = parseInt(e.value, 10) || 0;
                  e.value = n + 1;
                })(e, t);
              });
          }
        });
      };
      const io = {
        $ele: document.querySelector('.header_bar_main'),
        $close: document.querySelector('.adsense_close'),
        $site: document.querySelector('.site-main-cover'),
        init: function () {
          var t = this;
          if (!t.$ele) return !1;
          (t.$ele.style.transition = 'all 0.6s linear'),
            t.$close.addEventListener('click', function (e) {
              e.preventDefault(),
                'true' !== t.$ele.dataset.id
                  ? ((t.$ele.style.maxHeight = '0px'),
                    (t.$ele.style.minHeight = '0px'),
                    (t.$ele.style.overflow = 'hidden'),
                    t.$site.classList.remove('top-adsense'),
                    (t.$ele.dataset.id = 'true'))
                  : (t.$ele.dataset.id = 'false');
            });
        },
      };
      Zi.init(),
        er.init(),
        lr.init(),
        Wr.init(),
        pr.init(),
        yr.init(),
        br.init(),
        xr.init(),
        kr.init(),
        _r.init(),
        Tr.init(),
        Sr.init(),
        $r.init(),
        Pr.init(),
        Ir.init(),
        qr.init(),
        Vr.init(),
        Yr.init(),
        Xr.init(),
        Gr.init(),
        Kr.init(),
        Jr.init(),
        Zr.init(),
        eo.init(),
        no(),
        io.init(),
        Or.init();
      var ro = window.scrollY;
      window.addEventListener('scroll', function () {
        (ro = window.scrollY), gr.handle(ro), pr.handle(ro, gr.direction);
      });
    })();
})();
