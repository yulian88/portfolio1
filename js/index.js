/*!
 *
 *   typeit - The most versatile animated typing utility on the planet.
 *   Author: Alex MacArthur <alex@macarthur.me> (https://macarthur.me)
 *   Version: v6.0.3
 *   URL: https://typeitjs.com
 *   License: GPL-2.0
 *
 */
! function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.TypeIt = e() : t.TypeIt = e()
}(this, function() {
    return function(t) {
        var e = {};

        function n(i) {
            if (e[i]) return e[i].exports;
            var r = e[i] = { i: i, l: !1, exports: {} };
            return t[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
        }

        return n.m = t, n.c = e, n.d = function(t, e, i) {
            n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i })
        }, n.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 })
        }, n.t = function(t, e) {
            if (1 & e && (t = n(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var i = Object.create(null);
            if (n.r(i), Object.defineProperty(i, "default", {
                    enumerable: !0,
                    value: t
                }), 2 & e && "string" != typeof t)
                for (var r in t) n.d(i, r, function(e) {
                    return t[e]
                }.bind(null, r));
            return i
        }, n.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            } : function() {
                return t
            };
            return n.d(e, "a", e), e
        }, n.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, n.p = "", n(n.s = 0)
    }([function(t, e, n) {
        "use strict";
        n.r(e);
        var i = {
            strings: [],
            speed: 100,
            cursor: !0,
            cursorChar: "|",
            cursorSpeed: 1e3,
            deleteSpeed: null,
            lifeLike: !0,
            breakLines: !0,
            startDelay: 250,
            startDelete: !1,
            nextStringDelay: 750,
            loop: !1,
            loopDelay: null,
            html: !0,
            waitUntilVisible: !1,
            beforeString: !1,
            afterString: !1,
            beforeStep: !1,
            afterStep: !1,
            afterComplete: !1
        };

        function r(t) {
            var e = t.getBoundingClientRect();
            return !(e.right > window.innerWidth || e.bottom > window.innerHeight) && !(e.top < 0 || e.left < 0)
        }

        function o(t, e) {
            return Math.abs(Math.random() * (t + e - (t - e)) + (t - e))
        }

        function s(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                n = document.createElement("style");
            n.id = e, n.appendChild(document.createTextNode(t)), document.head.appendChild(n)
        }

        var a = function(t, e) {
                for (var n = Object(t), i = 1; i < arguments.length; i++) {
                    var r = arguments[i];
                    if (null != r)
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (n[o] = r[o])
                }
                return n
            },
            u = function(t) {
                return ["textarea", "input"].indexOf(t.tagName.toLowerCase()) > -1
            },
            l = function(t) {
                return Array.isArray(t) ? t.slice(0) : t.split("<br>")
            };

        function c(t) {
            return t.replace(/&(.+);/, function(t) {
                var e = document.createElement("textarea");
                return e.innerHTML = t, e.value
            })
        }

        function f(t) {
            return (f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        var h = "{%}";
        var p = function(t) {
                var e = function(t) {
                        var e = (new DOMParser).parseFromString(t, "text/html"),
                            n = [].slice.call(e.body.querySelectorAll("*"));
                        return (n = n.filter(function(e) {
                            return !(e.outerHTML.indexOf("></") > -1 && (t = t.replace(e.outerHTML, ""), 1))
                        })).forEach(function(e) {
                            t = t.replace(new RegExp("<".concat(e.tagName, "(.*?)/?>((.*?)</").concat(e.tagName, ">)?"), "i"), h)
                        }), { string: t, nodes: n }
                    }(t),
                    n = e.string,
                    i = e.nodes,
                    r = c(n).split(""),
                    o = [];
                return r.forEach(function(t, e) {
                    if (r.slice(e, e + 3).join("") === h) {
                        var n = e,
                            s = i.shift(),
                            a = c(s.innerHTML).split(""),
                            u = [].slice.call(s.attributes).map(function(t) {
                                return { name: t.name, value: t.nodeValue }
                            });
                        a.length ? a.forEach(function(t, i) {
                            o.push({
                                tag: s.tagName,
                                attributes: u,
                                content: t,
                                isFirstCharacter: n === e,
                                isLastCharacter: i + 1 === a.length
                            }), n++
                        }) : o.push({ tag: s.tagName, attributes: u, content: null })
                    }
                    else o.push(t)
                }), o = function(t) {
                    for (var e = !0; e;) t.some(function(e, n) {
                        return !("object" !== f(e) || !e.isLastCharacter && null !== e.content || "%}" !== t.slice(n + 1, n + 3).join("") || (t.splice(n + 1, 2), 0))
                    }) || (e = !1);
                    return t
                }(o)
            },
            d = function(t) {
                var e = t.tag,
                    n = t.attributes,
                    i = void 0 === n ? [] : n,
                    r = t.content,
                    o = void 0 === r ? "" : r,
                    s = document.createElement(e);
                return void 0 !== i && i.forEach(function(t) {
                    s.setAttribute(t.name, t.value)
                }), o && (s.innerHTML = o), s.outerHTML
            },
            y = function(t) {
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1] ? t.value = "" : [].slice.call(t.childNodes).forEach(function(e) {
                    void 0 !== e.classList && e.classList.contains("ti-wrapper") && (t.innerHTML = "")
                })
            };

        function v(t) {
            return (v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function g(t) {
            return function(t) {
                if (Array.isArray(t)) {
                    for (var e = 0, n = new Array(t.length); e < t.length; e++) n[e] = t[e];
                    return n
                }
            }(t) || function(t) {
                if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t)
            }(t) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance")
            }()
        }

        function m(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }

        var b = function() {
            function t() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                    n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.executed = [], this.waiting = e, !e.length && n && this.add(n)
            }

            var e, n, i;
            return e = t, (n = [{
                key: "add",
                value: function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    return this.waiting[e ? "unshift" : "push"](t), this
                }
            }, {
                key: "delete",
                value: function(t) {
                    return this.waiting.splice(t, 1), this
                }
            }, {
                key: "reset",
                value: function() {
                    return this.waiting = [].concat(g(this.executed), g(this.waiting)), this.executed = [], this
                }
            }]) && m(e.prototype, n), i && m(e, i), t
        }();

        function w(t) {
            return function(t) {
                if (Array.isArray(t)) {
                    for (var e = 0, n = new Array(t.length); e < t.length; e++) n[e] = t[e];
                    return n
                }
            }(t) || function(t) {
                if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t)
            }(t) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance")
            }()
        }

        function S(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }

        var k = "display:inline;position:relative;font:inherit;color:inherit;line-height:inherit;",
            q = function() {
                function t() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        n = e.element,
                        r = e.id,
                        o = e.options,
                        s = e.queue,
                        c = void 0 === s ? [] : s;
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this.status = {
                        started: !1,
                        complete: !1,
                        frozen: !1,
                        destroyed: !1
                    }, this.timeouts = [], this.id = r, this.$e = n, this.isInput = u(n), this.opts = a({}, i, o), this.opts.strings = l(this.opts.strings), this.opts.html = !this.isInput && this.opts.html, this.queue = new b(c, [this.pause, this.opts.startDelay]), y(n, this.isInput), this.prepareDelay("nextStringDelay"), this.prepareDelay("loopDelay");
                    var f = this.$e.innerHTML;
                    this.prepDOM(), this.handleHardCoded(f), this.opts.strings = this.opts.strings.map(function(t) {
                        return t.replace(/<\!--.*?-->/g, "")
                    }), !this.opts.strings.length || this.queue.waiting.length > 1 || this.generateQueue()
                }

                var e, n, c;
                return e = t, (n = [{
                    key: "reset",
                    value: function() {
                        return this.queue.reset(), new t({
                            element: this.$e,
                            id: this.id,
                            options: this.opts,
                            queue: this.queue.waiting
                        })
                    }
                }, {
                    key: "init",
                    value: function() {
                        var t = this;
                        if (!this.status.started) {
                            if (this.cursor(), !this.opts.waitUntilVisible || r(this.$e)) return this.status.started = !0, this.fire();
                            window.addEventListener("scroll", function e() {
                                r(t.$e) && !t.status.started && (t.fire(), window.removeEventListener("scroll", e))
                            })
                        }
                    }
                }, {
                    key: "fire",
                    value: function() {
                        for (var t = this, e = this.queue.waiting.slice(), n = Promise.resolve(), i = function(i) {
                                var r = e[i],
                                    o = [r, t.queue, t];
                                n = n.then(function() {
                                    return new Promise(function(e, n) {
                                        if (t.status.frozen) return n();
                                        var i, s;
                                        (t.setPace(), r[2] && r[2].isFirst && t.opts.beforeString) && (i = t.opts).beforeString.apply(i, o);
                                        t.opts.beforeStep && (s = t.opts).beforeStep.apply(s, o);
                                        r[0].call(t, r[1], r[2]).then(function() {
                                            var n, i, s = t.queue.waiting.shift();
                                            if (r[2] && r[2].isPhantom) return e();
                                            r[2] && r[2].isLast && t.opts.afterString && (n = t.opts).afterString.apply(n, o);
                                            t.opts.afterStep && (i = t.opts).afterStep.apply(i, o);
                                            return t.queue.executed.push(s), e()
                                        })
                                    })
                                })
                            }, r = 0; r < e.length; r++) i(r);
                        n.then(function() {
                            if (t.opts.loop) {
                                var e = t.opts.loopDelay ? t.opts.loopDelay : t.opts.nextStringDelay;
                                t.wait(function() {
                                    t.loopify(e), t.fire()
                                }, e.after)
                            }
                            t.status.completed = !0, t.opts.afterComplete && t.opts.afterComplete(t)
                        }).catch(function() {})
                    }
                }, {
                    key: "loopify",
                    value: function(t) {
                        var e = this;
                        this.queue.reset().delete(0).add([this.pause, t.before], !0), this.getNoderized().forEach(function(t) {
                            e.queue.add([e.delete, null, { isPhantom: !0 }], !0)
                        })
                    }
                }, {
                    key: "prepDOM",
                    value: function() {
                        this.isInput || (this.$e.innerHTML = '\n      <span style="'.concat(k, '" class="ti-wrapper">\n        <span style="').concat(k, '" class="ti-container"></span>\n      </span>\n      '), this.$e.setAttribute("data-typeit-id", this.id), this.$eContainer = this.$e.querySelector(".ti-container"), this.$eWrapper = this.$e.querySelector(".ti-wrapper"), s("\n        .".concat(this.$eContainer.className, ":before {\n          content: '.';\n          display: inline-block;\n          width: 0;\n          visibility: hidden;\n        }\n      ")))
                    }
                }, {
                    key: "setContents",
                    value: function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                        this.isInput ? this.$e.value = t : this.$eContainer[this.opts.html ? "innerHTML" : "innerText"] = t
                    }
                }, {
                    key: "getRaw",
                    value: function() {
                        return this.isInput ? this.$e.value : this.opts.html ? this.$eContainer.innerHTML : this.$eContainer.innerText
                    }
                }, {
                    key: "getNoderized",
                    value: function() {
                        return this.maybeNoderize(this.getRaw())
                    }
                }, {
                    key: "prepareDelay",
                    value: function(t) {
                        var e = this.opts[t];
                        if (e) {
                            var n = Array.isArray(e),
                                i = n ? null : e / 2;
                            this.opts[t] = { before: n ? e[0] : i, after: n ? e[1] : i, total: n ? e[0] + e[1] : e }
                        }
                    }
                }, {
                    key: "generateQueue",
                    value: function() {
                        var t = this,
                            e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                        e && this.queue.add(e), this.opts.strings.forEach(function(e, n) {
                            t.queueString(e);
                            var i = t.queue.waiting.length;
                            if (n + 1 !== t.opts.strings.length) {
                                if (t.opts.breakLines) return t.queue.add([t.type, "<br>"]), void t.addSplitPause(i);
                                t.queueDeletions(e), t.addSplitPause(i, e.length)
                            }
                        })
                    }
                }, {
                    key: "queueDeletions",
                    value: function() {
                        for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, e = "string" == typeof t ? this.maybeNoderize(t).length : t, n = 0; n < e; n++) this.queue.add([this.delete])
                    }
                }, {
                    key: "maybeNoderize",
                    value: function(t) {
                        return this.opts.html ? p(t) : t.split("")
                    }
                }, {
                    key: "queueString",
                    value: function(t) {
                        var e = this,
                            n = (t = this.maybeNoderize(t)).length;
                        t.forEach(function(t, i) {
                            var r = [e.type, t];
                            0 === i && r.push({ isFirst: !0 }), i + 1 === n && r.push({ isLast: !0 }), e.queue.add(r)
                        })
                    }
                }, {
                    key: "addSplitPause",
                    value: function(t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                        this.queue.waiting.splice(t, 0, [this.pause, this.opts.nextStringDelay.before]), this.queue.waiting.splice(t + e + 1, 0, [this.pause, this.opts.nextStringDelay.after])
                    }
                }, {
                    key: "cursor",
                    value: function() {
                        if (!this.isInput) {
                            var t = "display: none;";
                            this.opts.cursor && (s("\n        @keyframes blink-".concat(this.id, " {\n          0% {opacity: 0}\n          49% {opacity: 0}\n          50% {opacity: 1}\n        }\n\n        [data-typeit-id='").concat(this.id, "'] .ti-cursor {\n          animation: blink-").concat(this.id, " ").concat(this.opts.cursorSpeed / 1e3, "s infinite;\n        }\n      "), this.id), t = ""), this.$eWrapper.insertAdjacentHTML("beforeend", '<span style="'.concat(k).concat(t, 'left: -.25ch;" class="ti-cursor">').concat(this.opts.cursorChar, "</span>"))
                        }
                    }
                }, {
                    key: "insert",
                    value: function(t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                        this.isInput ? this.$e.value = "".concat(this.$e.value).concat(t) : ((e ? this.$eContainer.lastChild : this.$eContainer).insertAdjacentHTML("beforeend", t), this.setContents(this.getRaw().split("").join("")))
                    }
                }, {
                    key: "handleHardCoded",
                    value: function(t) {
                        return !!t.length && (this.opts.startDelete ? (this.insert(t), this.queue.add([this.delete, !0]), void this.addSplitPause(1)) : void(this.opts.strings = [].concat(w(l(t.trim())), w(this.opts.strings))))
                    }
                }, {
                    key: "wait",
                    value: function(t, e) {
                        this.timeouts.push(setTimeout(t, e))
                    }
                }, {
                    key: "setPace",
                    value: function() {
                        var t = this.opts.speed,
                            e = null !== this.opts.deleteSpeed ? this.opts.deleteSpeed : this.opts.speed / 3,
                            n = t / 2,
                            i = e / 2;
                        this.typePace = this.opts.lifeLike ? o(t, n) : t, this.deletePace = this.opts.lifeLike ? o(e, i) : e
                    }
                }, {
                    key: "pause",
                    value: function() {
                        var t = this,
                            e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        return new Promise(function(n, i) {
                            t.wait(function() {
                                return n()
                            }, e || t.opts.nextStringDelay.total)
                        })
                    }
                }, {
                    key: "type",
                    value: function(t) {
                        var e = this;
                        return new Promise(function(n, i) {
                            e.wait(function() {
                                return "string" == typeof t ? (e.insert(t), n()) : t.isFirstCharacter || null === t.content ? (e.insert(d({
                                    tag: t.tag,
                                    attributes: t.attributes,
                                    content: t.content
                                })), n()) : (e.insert(t.content, !0), n())
                            }, e.typePace)
                        })
                    }
                }, {
                    key: "empty",
                    value: function() {
                        var t = this;
                        return new Promise(function(e) {
                            return t.setContents(""), e()
                        })
                    }
                }, {
                    key: "delete",
                    value: function() {
                        var t = this,
                            e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        return new Promise(function(n, i) {
                            t.wait(function() {
                                var i = t.getNoderized();
                                return i.splice(-1, 1), i = function(t) {
                                    return (t = t.map(function(e, n) {
                                        if ("object" === v(e) && (e.isFirstCharacter || null === e.content)) {
                                            for (var i = n, r = [e.content], o = !1; !o;) {
                                                var s = t[++i];
                                                void 0 !== s && r.push(s.content), (void 0 === s || s.isLastCharacter) && (o = !0)
                                            }
                                            return d({ tag: e.tag, attributes: e.attributes, content: r.join("") })
                                        }
                                        return e
                                    })).filter(function(t) {
                                        return "object" !== v(t)
                                    })
                                }(i), t.setContents(i.join("")), e && i.length > 0 ? t.delete(!0).then(function() {
                                    return n()
                                }) : n()
                            }, t.deletePace)
                        })
                    }
                }, {
                    key: "setOptions",
                    value: function(t) {
                        var e = this;
                        return new Promise(function(n) {
                            return e.opts = a({}, e.opts, t), n()
                        })
                    }
                }]) && S(e.prototype, n), c && S(e, c), t
            }(),
            C = function(t) {
                return "string" == typeof t ? t = document.querySelectorAll(t) : t instanceof NodeList || (t = [t]), [].slice.call(t)
            };

        function j(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }

        n.d(e, "default", function() {
            return x
        });
        var x = function() {
            function t(e, n) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.instances = C(e).map(function(t) {
                    return new q({ element: t, id: Math.random().toString(36).substring(2, 15), options: n, queue: [] })
                })
            }

            var e, n, i;
            return e = t, (n = [{
                key: "each",
                value: function(t) {
                    var e = this;
                    this.instances.forEach(function(n) {
                        t.call(e, n)
                    })
                }
            }, {
                key: "queueUp",
                value: function(t) {
                    var e = this,
                        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                    this.each(function(r) {
                        for (var o = "string" != typeof t, s = o ? t : r[t], a = o ? e : n, u = 0; u < i; u++) r.queue.add([s, a])
                    })
                }
            }, {
                key: "is",
                value: function(t) {
                    return e = this.instances, n = t, i = !0, !!e.length && e.filter(function(t) {
                        return t.status[n] === i
                    }).length === e.length;
                    var e, n, i
                }
            }, {
                key: "freeze",
                value: function() {
                    this.each(function(t) {
                        t.status.frozen = !0
                    })
                }
            }, {
                key: "unfreeze",
                value: function() {
                    this.each(function(t) {
                        t.status.frozen && (t.status.frozen = !1, t.fire())
                    })
                }
            }, {
                key: "type",
                value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    return this.each(function(e) {
                        return e.queueString(t)
                    }), this
                }
            }, {
                key: "delete",
                value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                    return this.queueUp("delete", null === t, null === t ? 1 : t), this
                }
            }, {
                key: "pause",
                value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                    return this.queueUp("pause", t), this
                }
            }, {
                key: "break",
                value: function() {
                    return this.queueUp("type", "<br>"), this
                }
            }, {
                key: "options",
                value: function(t) {
                    return this.queueUp("setOptions", t), this
                }
            }, {
                key: "exec",
                value: function(t) {
                    return this.queueUp(t), this
                }
            }, {
                key: "destroy",
                value: function() {
                    var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                    this.each(function(e) {
                        e.timeouts.forEach(function(t) {
                            clearTimeout(t)
                        }), e.timeouts = [];
                        var n = e.isInput ? null : e.$eWrapper.querySelector(".ti-cursor");
                        t && e.opts.cursor && null !== n && e.$eWrapper.removeChild(n), e.status.destroyed = !0
                    })
                }
            }, {
                key: "empty",
                value: function() {
                    return this.queueUp("empty"), this
                }
            }, {
                key: "reset",
                value: function() {
                    return this.destroy(), this.instances = this.instances.map(function(t) {
                        return t.reset()
                    }), this
                }
            }, {
                key: "go",
                value: function() {
                    return this.each(function(t) {
                        t.init()
                    }), this
                }
            }]) && j(e.prototype, n), i && j(e, i), t
        }()
    }]).default
});
new TypeIt('#breakLines', {
    strings: ["Hello.", "My name is Yulian Fediukov.", "I'm Front-end developer."],
    speed: 50,
    waitUntilVisible: true
}).go();
new TypeIt('.about-me', {
    strings: [],
    speed: 40,
    waitUntilVisible: true
}).go();


