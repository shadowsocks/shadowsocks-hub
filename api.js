!function(e) {
    var r = {};
    function t(n) {
        if (r[n]) return r[n].exports;
        var a = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(a.exports, a, a.exports, t), a.l = !0, a.exports;
    }
    t.m = e, t.c = r, t.d = function(e, r, n) {
        t.o(e, r) || Object.defineProperty(e, r, {
            enumerable: !0,
            get: n
        });
    }, t.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.t = function(e, r) {
        if (1 & r && (e = t(e)), 8 & r) return e;
        if (4 & r && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (t.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }), 2 & r && "string" != typeof e) for (var a in e) t.d(n, a, function(r) {
            return e[r];
        }.bind(null, a));
        return n;
    }, t.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(r, "a", r), r;
    }, t.o = function(e, r) {
        return Object.prototype.hasOwnProperty.call(e, r);
    }, t.p = "", t(t.s = 96);
}([ function(e, r) {
    e.exports = require("debug");
}, function(e, r) {
    e.exports = require("validator");
}, function(e, r) {
    e.exports = require("express");
}, function(e, r) {
    e.exports = require("knex");
}, function(e, r, t) {
    "use strict";
    t(48).config(), e.exports = {
        production: {
            client: "mysql",
            connection: {
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                port: process.env.DATABASE_PORT,
                password: process.env.DATABASE_PASSWORD,
                database: "sshub",
                charset: "utf8",
                collate: "utf8_unicode_ci"
            },
            useNullAsDefault: !0
        },
        development: {
            client: "mysql",
            connection: {
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                port: process.env.DATABASE_PORT,
                password: process.env.DATABASE_PASSWORD,
                database: "sshub_dev",
                charset: "utf8",
                collate: "utf8_unicode_ci"
            },
            useNullAsDefault: !0
        },
        test: {
            client: "mysql",
            connection: {
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                port: process.env.DATABASE_PORT,
                password: process.env.DATABASE_PASSWORD,
                database: "sshub_test",
                charset: "utf8",
                collate: "utf8_unicode_ci"
            },
            useNullAsDefault: !0
        }
    };
}, function(e, r, t) {
    "use strict";
    var n, a, s = (n = o(regeneratorRuntime.mark(function e(r, t, n) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if ("admin" !== r.user.role) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", n());

              case 4:
                return e.abrupt("return", t.status(401).end());

              case 5:
              case 6:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e, r, t) {
        return n.apply(this, arguments);
    }), u = (a = o(regeneratorRuntime.mark(function e(r, t, n) {
        var a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if ("admin" !== r.user.role) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", n());

              case 2:
                if (a = void 0, r.query.ids && 1 === r.query.ids.length && (a = r.query.ids[0]), 
                (r.body.id || r.query.id || a || null) === r.user.id) {
                    e.next = 9;
                    break;
                }
                return e.abrupt("return", t.status(401).end());

              case 9:
                return e.abrupt("return", n());

              case 11:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e, r, t) {
        return a.apply(this, arguments);
    });
    function o(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var i = t(46).authenticate("jwt", {
        session: !1
    }), c = [ i, s ], p = [ i, u ];
    e.exports.adminAuth = c, e.exports.userAuth = p, e.exports.authentication = i;
}, function(e, r) {
    e.exports = require("node-uuid");
}, function(e, r, t) {
    "use strict";
    var n = t(6), a = t(1), s = t(10), u = t(12);
    t(0)("account:model");
    e.exports = function e(r) {
        if (function(e, r) {
            if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
        }(this, e), !(r && r.node instanceof s && r.purchase instanceof u)) throw new Error("illegal argument");
        if (r.id && ("string" != typeof r.id || !a.isUUID(r.id))) throw new Error("illegal argument");
        if (r.type && ("string" != typeof r.type || !a.isIn(r.type, [ "Account", "SsAccount" ]))) throw new Error("illegal argument");
        if (!r.port || r.port < 1 || r.port > 65535) throw new Error("illegal argument");
        if (r.createdTime && r.createdTime > Date.now()) throw new Error("illegal argument");
        this.id = r.id || n.v4(), this.type = r.type || "Account", this.node = r.node, this.purchase = r.purchase, 
        this.port = r.port, this.createdTime = r.createdTime || Date.now();
    };
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c, p, d, f, l, h, m, x = (n = B(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if ("SsAccount" !== r.type) {
                    e.next = 8;
                    break;
                }
                return e.next = 6, _.addSsAccount(r);

              case 6:
                return t = e.sent, e.abrupt("return", t);

              case 8:
                return e.abrupt("return", new Error("unknown account type"));

              case 10:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return n.apply(this, arguments);
    }), g = (a = B(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if ("SsAccount" !== r.type) {
                    e.next = 8;
                    break;
                }
                return e.next = 6, _.addSsAccountForEveryNode(r);

              case 6:
                return t = e.sent, e.abrupt("return", t);

              case 8:
                return e.abrupt("return", new Error("unknown account type"));

              case 10:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return a.apply(this, arguments);
    }), w = (s = B(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && "string" == typeof r && T.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, S.doesAccountIdExist(r);

              case 5:
                return e.abrupt("return", e.sent);

              case 6:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return s.apply(this, arguments);
    }), v = (u = B(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && T.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, S.getAccountById(r);

              case 5:
                if (t = e.sent) {
                    e.next = 8;
                    break;
                }
                throw new Error("id does not exist");

              case 8:
                return e.abrupt("return", t);

              case 9:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return u.apply(this, arguments);
    }), y = (o = B(regeneratorRuntime.mark(function e() {
        var r;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, S.getAllAccounts();

              case 2:
                return r = e.sent, e.abrupt("return", r);

              case 4:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function() {
        return o.apply(this, arguments);
    }), b = (i = B(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, T.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, S.getAccountsByIds(r);

              case 33:
                return e.abrupt("return", e.sent);

              case 34:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return i.apply(this, arguments);
    }), k = (c = B(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, T.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, S.getAccountsByPurchaseIds(r);

              case 33:
                return e.abrupt("return", e.sent);

              case 34:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return c.apply(this, arguments);
    }), I = (p = B(regeneratorRuntime.mark(function e(r) {
        var t, n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (T.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, y();

              case 5:
                return t = e.sent, n = t.filter(function(e) {
                    return e.purchase.user.id === r;
                }), e.abrupt("return", n);

              case 8:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return p.apply(this, arguments);
    }), R = (d = B(regeneratorRuntime.mark(function e(r) {
        var t, n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (T.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, y();

              case 5:
                return t = e.sent, n = t.filter(function(e) {
                    return e.node.server.id === r;
                }), e.abrupt("return", n);

              case 8:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return d.apply(this, arguments);
    }), E = (f = B(regeneratorRuntime.mark(function e(r, t) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && t) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, S.getAccountIdByNodeIdAndPort(r, t);

              case 5:
                return e.abrupt("return", e.sent);

              case 6:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e, r) {
        return f.apply(this, arguments);
    }), A = (l = B(regeneratorRuntime.mark(function e() {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, S.getNodesForAllAccounts();

              case 2:
                return e.abrupt("return", e.sent);

              case 3:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function() {
        return l.apply(this, arguments);
    }), U = (h = B(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, T.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, S.deleteAccountsByIds(r);

              case 33:
                return e.abrupt("return", e.sent);

              case 34:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return h.apply(this, arguments);
    }), P = (m = B(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i, c, p, d, f, l, h = this;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (u.value instanceof D) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, N.getAllNodes();

              case 33:
                o = e.sent, i = !0, c = !1, p = void 0, e.prev = 37, d = regeneratorRuntime.mark(function e() {
                    var t, n;
                    return regeneratorRuntime.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            if (t = l.value, n = r.filter(function(e) {
                                return e.node.id === t.id;
                            }), "shadowsocks" !== t.protocol) {
                                e.next = 7;
                                break;
                            }
                            return e.next = 5, _.monitorAllAccountsForNode(n, t);

                          case 5:
                            e.next = 8;
                            break;

                          case 7:
                            throw new Error("should not come here");

                          case 8:
                          case 9:
                          case "end":
                            return e.stop();
                        }
                    }, e, h);
                }), f = o[Symbol.iterator]();

              case 40:
                if (i = (l = f.next()).done) {
                    e.next = 45;
                    break;
                }
                return e.delegateYield(d(), "t1", 42);

              case 42:
                i = !0, e.next = 40;
                break;

              case 45:
                e.next = 51;
                break;

              case 47:
                e.prev = 47, e.t2 = e.catch(37), c = !0, p = e.t2;

              case 51:
                e.prev = 51, e.prev = 52, !i && f.return && f.return();

              case 54:
                if (e.prev = 54, !c) {
                    e.next = 57;
                    break;
                }
                throw p;

              case 57:
                return e.finish(54);

              case 58:
                return e.finish(51);

              case 59:
              case 60:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 37, 47, 51, 59 ], [ 52, , 54, 58 ] ]);
    })), function(e) {
        return m.apply(this, arguments);
    });
    function B(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var T = t(1), D = t(7), S = t(31), _ = t(28), N = t(21);
    t(0)("account:service");
    e.exports.addAccount = x, e.exports.addAccountForEveryNode = g, e.exports.doesAccountIdExist = w, 
    e.exports.getAccountById = v, e.exports.getAllAccounts = y, e.exports.getAccountsByIds = b, 
    e.exports.getAccountsByPurchaseIds = k, e.exports.getAccountsByUserId = I, e.exports.getAccountsByServerId = R, 
    e.exports.getAccountIdByNodeIdAndPort = E, e.exports.getNodesForAllAccounts = A, 
    e.exports.deleteAccountsByIds = U, e.exports.monitorAllAccounts = P;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i = (n = l(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && t && h.isIn(r, [ "PaypalPayment", "AdminApproval" ]) && !isNaN(t) && Number.isInteger(100 * t)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if ("PaypalPayment" !== r) {
                    e.next = 10;
                    break;
                }
                return e.next = 6, m.createPaypalPayment(t);

              case 6:
                return n = e.sent, e.abrupt("return", n);

              case 10:
                if ("AdminApproval" !== r) {
                    e.next = 15;
                    break;
                }
                return e.next = 13, x.createAdminApproval();

              case 13:
                return a = e.sent, e.abrupt("return", a);

              case 15:
              case 16:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e, r) {
        return n.apply(this, arguments);
    }), c = (a = l(regeneratorRuntime.mark(function e(r, t) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && t && h.isUUID(r) && h.isIn(t, [ "created", "completed" ])) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, g.updatePaymentStateById(r, t);

              case 5:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e, r) {
        return a.apply(this, arguments);
    }), p = (s = l(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && h.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, w.listenOnPaymentCompletion(r);

              case 5:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return s.apply(this, arguments);
    }), d = (u = l(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, h.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, g.getPaymentsByIds(r);

              case 33:
                return e.abrupt("return", e.sent);

              case 34:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return u.apply(this, arguments);
    }), f = (o = l(regeneratorRuntime.mark(function e() {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, g.getAllPayments();

              case 2:
                return e.abrupt("return", e.sent);

              case 3:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function() {
        return o.apply(this, arguments);
    });
    function l(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var h = t(1), m = t(17), x = t(36), g = t(34), w = t(13);
    t(0)("payment:service");
    e.exports.createPayment = i, e.exports.updatePaymentStateById = c, e.exports.listenOnPaymentCompletion = p, 
    e.exports.getPaymentsByIds = d, e.exports.getAllPayments = f;
}, function(e, r, t) {
    "use strict";
    var n = t(1), a = t(6), s = t(22);
    t(0)("node:model");
    e.exports = function e(r) {
        if (function(e, r) {
            if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
        }(this, e), !(r && r.server instanceof s)) throw new Error("illegal argument");
        if (r.id && ("string" != typeof r.id || !n.isUUID(r.id))) throw new Error("illegal argument");
        if (!r.protocol || "string" != typeof r.protocol || !n.isIn(r.protocol, [ "shadowsocks" ])) throw new Error("illegal argument");
        if (!r.port || r.port < 1 || r.port > 65535) throw new Error("illegal argument");
        if (!r.password || "string" != typeof r.password) throw new Error("illegal argument");
        if (!r.name || "string" != typeof r.name) throw new Error("illegal argument");
        if (r.comment && "string" != typeof r.comment) throw new Error("illegal argument");
        if (r.createdTime && r.createdTime > Date.now()) throw new Error("illegal argument");
        this.id = r.id || a.v4(), this.server = r.server, this.protocol = r.protocol, this.password = r.password, 
        this.port = r.port, this.name = r.name, this.comment = r.comment || null, this.createdTime = r.createdTime || Date.now();
    };
}, function(e, r, t) {
    "use strict";
    var n = t(42), a = (t(0)("emailUser:model"), function(e) {
        function r(e) {
            if (function(e, r) {
                if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
            }(this, r), !e || !e.email || !e.hashedPassword) throw new Error("illegal argument");
            var t = function(e, r) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !r || "object" != typeof r && "function" != typeof r ? e : r;
            }(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, e));
            return t.type = "EmailUser", t.hashedPassword = e.hashedPassword, t.username = e.email, 
            t.resetPasswordToken = e.resetPasswordToken || null, t.tokenCreatedTime = e.tokenCreatedTime || null, 
            t.lastLoginTime = e.lastLoginTime || null, t;
        }
        return function(e, r) {
            if ("function" != typeof r && null !== r) throw new TypeError("Super expression must either be null or a function, not " + typeof r);
            e.prototype = Object.create(r && r.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r);
        }(r, n), r;
    }());
    e.exports = a;
}, function(e, r, t) {
    "use strict";
    var n = t(6), a = t(1), s = t(42), u = t(18), o = t(15);
    t(0)("purchase:model");
    e.exports = function e(r) {
        if (function(e, r) {
            if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
        }(this, e), !(r && r.user instanceof s && r.product instanceof u && r.payment instanceof o)) throw new Error("illegal argument");
        if (r.id && ("string" != typeof r.id || !a.isUUID(r.id))) throw new Error("illegal argument");
        if (r.createdTime && r.createdTime > Date.now()) throw new Error("illegal argument");
        var t = new Date().getTime();
        this.id = r.id || n.v4(), this.user = r.user, this.product = r.product, this.payment = r.payment, 
        this.createdTime = r.createdTime || t;
    };
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c = (n = m(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i, c, p;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (t = r.userId, n = r.productId, a = r.paymentType, t && x.isUUID(t) && n && x.isUUID(n) && a && x.isIn(a, [ "PaypalPayment", "AdminApproval" ])) {
                    e.next = 6;
                    break;
                }
                throw new Error("illegal argument");

              case 6:
                return s = void 0, e.prev = 8, e.next = 11, v.getUserById(t);

              case 11:
                s = e.sent, e.next = 22;
                break;

              case 14:
                if (e.prev = 14, e.t0 = e.catch(8), "id does not exist" !== e.t0.message) {
                    e.next = 20;
                    break;
                }
                throw new Error("user does not exist");

              case 20:
                throw e.t0;

              case 21:
              case 22:
                return u = void 0, e.prev = 24, e.next = 27, y.getProductById(n);

              case 27:
                u = e.sent, e.next = 35;
                break;

              case 30:
                if (e.prev = 30, e.t1 = e.catch(24), "id does not exist" !== e.t1.message) {
                    e.next = 34;
                    break;
                }
                throw new Error("product does not exist");

              case 34:
              case 35:
                return o = (u.price / 100).toFixed(2), e.next = 39, b.createPayment(a, o);

              case 39:
                return i = e.sent, i[0], c = i[1], p = new g({
                    user: s,
                    product: u,
                    payment: c
                }), e.next = 45, w.addPurchase(p);

              case 45:
                return e.abrupt("return", i);

              case 46:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 8, 14 ], [ 24, 30 ] ]);
    })), function(e) {
        return n.apply(this, arguments);
    }), p = (a = m(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && x.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, w.getPurchaseById(r);

              case 5:
                if (t = e.sent) {
                    e.next = 8;
                    break;
                }
                throw new Error("id does not exist");

              case 8:
                return e.abrupt("return", t);

              case 9:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return a.apply(this, arguments);
    }), d = (s = m(regeneratorRuntime.mark(function e() {
        var r;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, w.getAllPurchases();

              case 2:
                return r = e.sent, e.abrupt("return", r);

              case 4:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function() {
        return s.apply(this, arguments);
    }), f = (u = m(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, x.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, w.getPurchasesByIds(r);

              case 33:
                return e.abrupt("return", e.sent);

              case 34:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return u.apply(this, arguments);
    }), l = (o = m(regeneratorRuntime.mark(function e(r) {
        var t, n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (x.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, d();

              case 5:
                return t = e.sent, n = t.filter(function(e) {
                    return e.user.id === r;
                }), e.abrupt("return", n);

              case 8:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return o.apply(this, arguments);
    }), h = (i = m(regeneratorRuntime.mark(function e(r) {
        var t, n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && x.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, w.getPurchaseByPaymentId(r);

              case 5:
                if ("completed" !== (t = e.sent).payment.state) {
                    e.next = 13;
                    break;
                }
                return n = {
                    purchaseId: t.id,
                    type: "SsAccount"
                }, e.next = 10, k.addAccountForEveryNode(n);

              case 10:
                e.sent, e.next = 14;
                break;

              case 13:
                throw new Error("payment state is not completed");

              case 14:
              case 15:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return i.apply(this, arguments);
    });
    function m(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var x = t(1), g = t(12), w = t(32), v = t(23), y = t(38), b = t(9), k = t(8);
    t(0)("purchase:service");
    e.exports.createPurchase = c, e.exports.getPurchaseById = p, e.exports.getAllPurchases = d, 
    e.exports.getPurchasesByIds = f, e.exports.getPurchasesByUserId = l, e.exports.listenOnPaymentCompletion = h;
}, function(e, r, t) {
    "use strict";
    var n = t(15), a = (t(0)("paypalPayment:model"), function(e) {
        function r(e) {
            if (function(e, r) {
                if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
            }(this, r), !e || "string" != typeof e.paypalId) throw new Error("illegal argument");
            var t = function(e, r) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !r || "object" != typeof r && "function" != typeof r ? e : r;
            }(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, e));
            return t.type = "PaypalPayment", t.paypalId = e.paypalId, t;
        }
        return function(e, r) {
            if ("function" != typeof r && null !== r) throw new TypeError("Super expression must either be null or a function, not " + typeof r);
            e.prototype = Object.create(r && r.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r);
        }(r, n), r;
    }());
    e.exports = a;
}, function(e, r, t) {
    "use strict";
    var n = t(6), a = t(1), s = t(65).currencies, u = (t(0)("payment:model"), s.map(function(e) {
        return e.code;
    }));
    e.exports = function e(r) {
        if (function(e, r) {
            if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
        }(this, e), !r) throw new Error("illegal argument");
        if (r.id && ("string" != typeof r.id || !a.isUUID(r.id))) throw new Error("illegal argument");
        if (r.type && ("string" != typeof r.type || !a.isIn(r.type, [ "Payment", "PaypalPayment", "AdminApproval" ]))) throw new Error("illegal argument");
        if (!r.currency || "string" != typeof r.currency || !a.isIn(r.currency, u)) throw new Error("illegal argument");
        if (isNaN(r.amount) || !Number.isInteger(100 * r.amount)) throw new Error("illegal argument");
        if (!r.state || "string" != typeof r.state || !a.isIn(r.state, [ "created", "completed" ])) throw new Error("illegal argument");
        if (r.createdTime && r.createdTime > Date.now()) throw new Error("illegal argument");
        this.id = r.id || n.v4(), this.type = r.type || "Payment", this.currency = r.currency, 
        this.amount = r.amount, this.state = r.state, this.createdTime = r.createdTime || Date.now();
    };
}, function(e, r, t) {
    "use strict";
    var n = t(15), a = (t(0)("adminApproval:model"), function(e) {
        function r(e) {
            if (function(e, r) {
                if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
            }(this, r), !e || 0 !== e.amount || "USD" !== e.currency) throw new Error("illegal argument");
            var t = function(e, r) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !r || "object" != typeof r && "function" != typeof r ? e : r;
            }(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, e));
            return t.type = "AdminApproval", t;
        }
        return function(e, r) {
            if ("function" != typeof r && null !== r) throw new TypeError("Super expression must either be null or a function, not " + typeof r);
            e.prototype = Object.create(r && r.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r);
        }(r, n), r;
    }());
    e.exports = a;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c = (n = m(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i, c, p, d, f, l;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && !isNaN(r) && Number.isInteger(100 * r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return t = JSON.stringify({
                    intent: "sale",
                    payer: {
                        payment_method: "paypal"
                    },
                    redirect_urls: {
                        return_url: "http://localhost:8000/api/payment/paypal_payment/process",
                        cancel_url: "http://localhost:8000/api/payment/paypal_payment/cancel"
                    },
                    transactions: [ {
                        amount: {
                            currency: "USD",
                            total: r,
                            details: {
                                subtotal: r,
                                tax: "0.00"
                            }
                        },
                        description: "sshub paypal payment",
                        payment_options: {
                            allowed_payment_method: "INSTANT_FUNDING_SOURCE"
                        },
                        item_list: {
                            items: [ {
                                name: "shadowsocks monthly premium",
                                quantity: "1",
                                price: r,
                                tax: "0.00",
                                sku: "123123",
                                currency: "USD"
                            } ]
                        }
                    } ]
                }), e.next = 6, new Promise(function(e, r) {
                    x.payment.create(t, function(t, n) {
                        t ? r(t) : e(n);
                    });
                });

              case 6:
                for (n = e.sent, a = {}, s = !0, u = !1, o = void 0, e.prev = 11, i = n.links[Symbol.iterator](); !(s = (c = i.next()).done); s = !0) p = c.value, 
                a[p.rel] = {
                    href: p.href,
                    method: p.method
                };
                e.next = 19;
                break;

              case 15:
                e.prev = 15, e.t0 = e.catch(11), u = !0, o = e.t0;

              case 19:
                e.prev = 19, e.prev = 20, !s && i.return && i.return();

              case 22:
                if (e.prev = 22, !u) {
                    e.next = 25;
                    break;
                }
                throw o;

              case 25:
                return e.finish(22);

              case 26:
                return e.finish(19);

              case 27:
                if (!a.hasOwnProperty("approval_url")) {
                    e.next = 32;
                    break;
                }
                d = a.approval_url.href, e.next = 33;
                break;

              case 32:
                throw new Error("no redirect URI present");

              case 33:
                return f = new v({
                    paypalId: n.id,
                    state: n.state,
                    currency: "USD",
                    amount: r
                }), e.next = 37, y.addPaypalPayment(f);

              case 37:
                return l = e.sent, e.abrupt("return", [ d, l ]);

              case 39:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 11, 15, 19, 27 ], [ 20, , 22, 26 ] ]);
    })), function(e) {
        return n.apply(this, arguments);
    }), p = (a = m(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && t && "string" == typeof r && "string" == typeof t) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return n = {
                    payer_id: t
                }, e.next = 6, new Promise(function(e, t) {
                    var a;
                    x.payment.execute(r, n, (a = m(regeneratorRuntime.mark(function r(n, a) {
                        var s;
                        return regeneratorRuntime.wrap(function(r) {
                            for (;;) switch (r.prev = r.next) {
                              case 0:
                                if (!n) {
                                    r.next = 4;
                                    break;
                                }
                                return r.abrupt("return", t(n));

                              case 4:
                                if ("approved" != a.state) {
                                    r.next = 15;
                                    break;
                                }
                                return r.next = 7, f(a.id);

                              case 7:
                                return s = r.sent, r.next = 10, w.updatePaymentStateById(s.id, "completed");

                              case 10:
                                return r.next = 12, w.listenOnPaymentCompletion(s.id);

                              case 12:
                                return r.abrupt("return", e(s));

                              case 15:
                                return r.abrupt("return", t(n));

                              case 16:
                              case 17:
                              case 18:
                              case "end":
                                return r.stop();
                            }
                        }, r, this);
                    })), function(e, r) {
                        return a.apply(this, arguments);
                    }));
                });

              case 6:
                return e.abrupt("return", e.sent);

              case 7:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e, r) {
        return a.apply(this, arguments);
    }), d = (s = m(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && g.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, y.getPaypalPaymentById(r);

              case 5:
                if (t = e.sent) {
                    e.next = 8;
                    break;
                }
                throw new Error("id does not exist");

              case 8:
                return e.abrupt("return", t);

              case 9:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return s.apply(this, arguments);
    }), f = (u = m(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && "string" == typeof r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 4, y.getPaypalPaymentByPaypalId(r);

              case 4:
                return t = e.sent, e.abrupt("return", t);

              case 6:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return u.apply(this, arguments);
    }), l = (o = m(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, g.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, y.getPaypalPaymentsByIds(r);

              case 33:
                return e.abrupt("return", e.sent);

              case 34:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return o.apply(this, arguments);
    }), h = (i = m(regeneratorRuntime.mark(function e() {
        var r, t, n, a, s, u, o, i = this;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, y.getAllRecentlyIncompletePaypalPayments(36e5);

              case 2:
                r = e.sent, t = !0, n = !1, a = void 0, e.prev = 6, s = regeneratorRuntime.mark(function e() {
                    var r;
                    return regeneratorRuntime.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return r = o.value, e.next = 3, new Promise(function(e, t) {
                                var n;
                                x.payment.get(r.paypalId, (n = m(regeneratorRuntime.mark(function r(n, a) {
                                    var s;
                                    return regeneratorRuntime.wrap(function(r) {
                                        for (;;) switch (r.prev = r.next) {
                                          case 0:
                                            if (!n) {
                                                r.next = 4;
                                                break;
                                            }
                                            return r.abrupt("return", t(n));

                                          case 4:
                                            if ("approved" != a.state) {
                                                r.next = 12;
                                                break;
                                            }
                                            return r.next = 7, f(a.id);

                                          case 7:
                                            return s = r.sent, r.next = 10, w.updatePaymentStateById(s.id, "completed");

                                          case 10:
                                            return r.next = 12, w.listenOnPaymentCompletion(s.id);

                                          case 12:
                                            return r.abrupt("return", e());

                                          case 14:
                                          case 15:
                                          case "end":
                                            return r.stop();
                                        }
                                    }, r, this);
                                })), function(e, r) {
                                    return n.apply(this, arguments);
                                }));
                            });

                          case 3:
                          case "end":
                            return e.stop();
                        }
                    }, e, i);
                }), u = r[Symbol.iterator]();

              case 9:
                if (t = (o = u.next()).done) {
                    e.next = 14;
                    break;
                }
                return e.delegateYield(s(), "t0", 11);

              case 11:
                t = !0, e.next = 9;
                break;

              case 14:
                e.next = 20;
                break;

              case 16:
                e.prev = 16, e.t1 = e.catch(6), n = !0, a = e.t1;

              case 20:
                e.prev = 20, e.prev = 21, !t && u.return && u.return();

              case 23:
                if (e.prev = 23, !n) {
                    e.next = 26;
                    break;
                }
                throw a;

              case 26:
                return e.finish(23);

              case 27:
                return e.finish(20);

              case 28:
              case 29:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 16, 20, 28 ], [ 21, , 23, 27 ] ]);
    })), function() {
        return i.apply(this, arguments);
    });
    function m(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var x = t(66), g = t(1), w = t(9), v = t(14), y = t(33);
    t(0)("paypalPayment:service");
    if (process.env.PAYPAL_MODE && "sandbox" !== process.env.PAYPAL_MODE && "live" !== process.env.PAYPAL_MODE) throw new Error("unknown PAYPAL_MODE");
    x.configure({
        mode: process.env.PAYPAL_MODE || "sandbox",
        client_id: process.env.PAYPAL_CLIENT_ID,
        client_secret: process.env.PAYPAL_CLIENT_SECRET
    }), e.exports.createPaypalPayment = c, e.exports.executePaypalPayment = p, e.exports.getPaypalPaymentById = d, 
    e.exports.getPaypalPaymentsByIds = l, e.exports.checkRecentlyIncompletePaypalPayment = h;
}, function(e, r, t) {
    "use strict";
    var n = t(1), a = t(6);
    t(0)("product:model");
    e.exports = function e(r) {
        if (function(e, r) {
            if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
        }(this, e), !r) throw new Error("illegal argument");
        if (r.id && ("string" != typeof r.id || !n.isUUID(r.id))) throw new Error("illegal argument");
        if (!r.name || "string" != typeof r.name) throw new Error("illegal argument");
        if (!r.traffic || !Number.isInteger(r.traffic)) throw new Error("illegal argument");
        if (!r.period || "string" != typeof r.period || !n.isIn(r.period, [ "monthly", "bimonthly", "quarterly", "semiannual", "annual" ])) throw new Error("illegal argument");
        if (isNaN(r.price) || !Number.isInteger(r.price)) throw new Error("illegal argument");
        if (r.createdTime && r.createdTime > Date.now()) throw new Error("illegal argument");
        this.id = r.id || a.v4(), this.name = r.name, this.traffic = r.traffic, this.period = r.period, 
        this.price = r.price, this.createdTime = r.createdTime || Date.now();
    };
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i = (n = l(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if ("shadowsocks" === r && t) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (n = t.host, a = t.port, s = t.password, !(!n || "string" != typeof n || !a || !Number.isInteger(a) || a < 1 || a > 65535) && s && "string" == typeof s) {
                    e.next = 6;
                    break;
                }
                throw new Error("illegal argument");

              case 6:
                if ("shadowsocks" !== r) {
                    e.next = 11;
                    break;
                }
                return e.next = 10, h.init(r, t);

              case 10:
                return e.abrupt("return", e.sent);

              case 11:
                throw new error("should not come here");

              case 13:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e, r) {
        return n.apply(this, arguments);
    }), c = (a = l(regeneratorRuntime.mark(function e(r, t, n) {
        var a, s, u, o, i;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if ("shadowsocks" === r && t && n) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (a = t.port, s = t.password, u = n.host, o = n.port, i = n.password, !(!a || !Number.isInteger(a) || a < 1 || a > 65535 || !s || "string" != typeof s || !u || "string" != typeof u || !o || !Number.isInteger(o) || o < 1 || o > 65535) && i && "string" == typeof s) {
                    e.next = 7;
                    break;
                }
                throw new Error("illegal argument");

              case 7:
                if ("shadowsocks" !== r) {
                    e.next = 12;
                    break;
                }
                return e.next = 11, h.addPort(t, n);

              case 11:
                return e.abrupt("return", e.sent);

              case 12:
                throw new error("should not come here");

              case 14:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e, r, t) {
        return a.apply(this, arguments);
    }), p = (s = l(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if ("shadowsocks" === r && t) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (n = t.host, a = t.port, s = t.password, !(!n || "string" != typeof n || !a || !Number.isInteger(a) || a < 1 || a > 65535) && s && "string" == typeof s) {
                    e.next = 6;
                    break;
                }
                throw new Error("illegal argument");

              case 6:
                if ("shadowsocks" !== r) {
                    e.next = 11;
                    break;
                }
                return e.next = 10, h.getMeterReadings(t);

              case 10:
                return e.abrupt("return", e.sent);

              case 11:
                throw new error("should not come here");

              case 13:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e, r) {
        return s.apply(this, arguments);
    }), d = (u = l(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if ("shadowsocks" === r && t) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (n = t.host, a = t.port, s = t.password, !(!n || "string" != typeof n || !a || !Number.isInteger(a) || a < 1 || a > 65535) && s && "string" == typeof s) {
                    e.next = 6;
                    break;
                }
                throw new Error("illegal argument");

              case 6:
                if ("shadowsocks" !== r) {
                    e.next = 11;
                    break;
                }
                return e.next = 10, h.getAllPorts(t);

              case 10:
                return e.abrupt("return", e.sent);

              case 11:
                throw new error("should not come here");

              case 13:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e, r) {
        return u.apply(this, arguments);
    }), f = (o = l(regeneratorRuntime.mark(function e(r, t, n) {
        var a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if ("shadowsocks" === r && t && n) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (a = t.port, s = n.host, u = n.port, o = n.password, !(!a || !Number.isInteger(a) || a < 1 || a > 65535 || !s || "string" != typeof s || !u || !Number.isInteger(u) || u < 1 || u > 65535) && o && "string" == typeof o) {
                    e.next = 7;
                    break;
                }
                throw new Error("illegal argument");

              case 7:
                if ("shadowsocks" !== r) {
                    e.next = 12;
                    break;
                }
                return e.next = 11, h.deletePort(t, n);

              case 11:
                return e.abrupt("return", e.sent);

              case 12:
                throw new error("should not come here");

              case 14:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e, r, t) {
        return o.apply(this, arguments);
    });
    function l(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var h = t(74);
    t(0)("protocol:abstract");
    e.exports.init = i, e.exports.addPort = c, e.exports.getMeterReadings = p, e.exports.getAllPorts = d, 
    e.exports.deletePort = f;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c, p, d, f = (n = b(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r instanceof A) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, R.insert({
                    id: r.id,
                    serverId: r.server.id,
                    protocol: r.protocol,
                    port: r.port,
                    password: r.password,
                    name: r.name,
                    comment: r.comment,
                    createdTime: r.createdTime
                }).into("node");

              case 6:
                return e.abrupt("return", r);

              case 9:
                throw e.prev = 9, e.t0 = e.catch(3), e.t0;

              case 12:
              case 13:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 9 ] ]);
    })), function(e) {
        return n.apply(this, arguments);
    }), l = (a = b(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && "string" == typeof r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, R.select().from("node").where("name", r);

              case 6:
                if (0 !== (t = e.sent).length) {
                    e.next = 11;
                    break;
                }
                return e.abrupt("return", !1);

              case 11:
                if (1 !== t.length) {
                    e.next = 15;
                    break;
                }
                return e.abrupt("return", !0);

              case 15:
                throw new Error("retrieved multiple results from one name");

              case 16:
                e.next = 22;
                break;

              case 19:
                throw e.prev = 19, e.t0 = e.catch(3), e.t0;

              case 22:
              case 23:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 19 ] ]);
    })), function(e) {
        return a.apply(this, arguments);
    }), h = (s = b(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && "string" == typeof r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, x("name", r);

              case 5:
                return t = e.sent, e.abrupt("return", t);

              case 7:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return s.apply(this, arguments);
    }), m = (u = b(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && k.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, x("id", r);

              case 5:
                return t = e.sent, e.abrupt("return", t);

              case 7:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return u.apply(this, arguments);
    }), x = (o = b(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && t) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if ("id" === r || "name" === r) {
                    e.next = 5;
                    break;
                }
                throw new Error("illegal argument");

              case 5:
                return e.prev = 6, e.next = 9, R.select().from("node").where("" + r, t);

              case 9:
                if (0 !== (n = e.sent).length) {
                    e.next = 14;
                    break;
                }
                return e.abrupt("return", null);

              case 14:
                if (1 !== n.length) {
                    e.next = 23;
                    break;
                }
                return a = n[0].serverId, e.next = 18, E.getServerById(a);

              case 18:
                return s = e.sent, u = new A({
                    id: n[0].id,
                    server: s,
                    protocol: n[0].protocol,
                    port: n[0].port,
                    password: n[0].password,
                    name: n[0].name,
                    comment: n[0].comment,
                    createdTime: n[0].createdTime
                }), e.abrupt("return", u);

              case 23:
                throw new Error("retrieved multiple nodes from one name");

              case 24:
                e.next = 30;
                break;

              case 27:
                throw e.prev = 27, e.t0 = e.catch(6), e.t0;

              case 30:
              case 31:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 27 ] ]);
    })), function(e, r) {
        return o.apply(this, arguments);
    }), g = (i = b(regeneratorRuntime.mark(function e() {
        var r, t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, R.select().from("node");

              case 3:
                return r = e.sent, t = r.map(function(e) {
                    return e.id;
                }), e.next = 7, w(t);

              case 7:
                return e.abrupt("return", e.sent);

              case 10:
                throw e.prev = 10, e.t0 = e.catch(0), e.t0;

              case 13:
              case 14:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 10 ] ]);
    })), function() {
        return i.apply(this, arguments);
    }), w = (c = b(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i, c, p, d;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, k.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, R.select().from("node").whereIn("id", r);

              case 34:
                return i = e.sent, c = Array.from(new Set(i.map(function(e) {
                    return e.serverId;
                }))), e.next = 38, E.getServersByIds(c);

              case 38:
                return p = e.sent, d = i.map(function(e) {
                    var r = p.filter(function(r) {
                        return r.id === e.serverId;
                    })[0];
                    return new A({
                        id: e.id,
                        server: r,
                        protocol: e.protocol,
                        port: e.port,
                        password: e.password,
                        name: e.name,
                        comment: e.comment,
                        createdTime: e.createdTime
                    });
                }), e.abrupt("return", d);

              case 43:
                throw e.prev = 43, e.t1 = e.catch(31), e.t1;

              case 46:
              case 47:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 43 ] ]);
    })), function(e) {
        return c.apply(this, arguments);
    }), v = (p = b(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && k.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, R.delete().from("node").where("id", r);

              case 6:
                e.next = 14;
                break;

              case 8:
                if (e.prev = 8, e.t0 = e.catch(3), "ER_ROW_IS_REFERENCED_2" !== e.t0.code) {
                    e.next = 12;
                    break;
                }
                throw new Error("node is referenced");

              case 12:
                throw e.t0;

              case 14:
              case 15:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 8 ] ]);
    })), function(e) {
        return p.apply(this, arguments);
    }), y = (d = b(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && r instanceof A) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, R.where({
                    id: r.id,
                    serverId: r.server.id
                }).update({
                    protocol: r.protocol,
                    password: r.password,
                    port: r.port,
                    name: r.name,
                    comment: r.comment
                }).into("node");

              case 6:
                e.next = 11;
                break;

              case 8:
                throw e.prev = 8, e.t0 = e.catch(3), e.t0;

              case 11:
              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 8 ] ]);
    })), function(e) {
        return d.apply(this, arguments);
    });
    function b(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var k = t(1), I = t(4).production, R = t(3)(I), E = t(39), A = t(10);
    t(0)("node:dao");
    e.exports.addNode = f, e.exports.doesNodeNameExist = l, e.exports.getNodeByName = h, 
    e.exports.getNodeById = m, e.exports.getAllNodes = g, e.exports.getNodesByIds = w, 
    e.exports.deleteNodeById = v, e.exports.updateNode = y;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c = (n = m(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i, c, p;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (t = r.serverId, n = r.protocol, a = r.port, s = r.password, u = r.name, o = r.comment, 
                t && x.isUUID(t)) {
                    e.next = 6;
                    break;
                }
                throw new Error("illegal argument");

              case 6:
                if (n && "string" == typeof n && x.isIn(n, [ "shadowsocks" ])) {
                    e.next = 9;
                    break;
                }
                throw new Error("illegal argument");

              case 9:
                if (!(!a || !Number.isInteger(a) || a < 1 || a > 65535)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
                if (s && "string" == typeof s) {
                    e.next = 15;
                    break;
                }
                throw new Error("illegal argument");

              case 15:
                if (u && "string" == typeof u) {
                    e.next = 18;
                    break;
                }
                throw new Error("illegal argument");

              case 18:
                if (!o || "string" == typeof o) {
                    e.next = 21;
                    break;
                }
                throw new Error("illegal argument");

              case 21:
                return e.next = 24, w.doesNodeNameExist(u);

              case 24:
                if (!e.sent) {
                    e.next = 26;
                    break;
                }
                throw new Error("node already exists");

              case 26:
                return i = void 0, e.prev = 28, e.next = 31, v.getServerById(t);

              case 31:
                i = e.sent, e.next = 39;
                break;

              case 34:
                if (e.prev = 34, e.t0 = e.catch(28), "id does not exist" !== e.t0.message) {
                    e.next = 38;
                    break;
                }
                throw new Error("server does not exist");

              case 38:
              case 39:
                return c = new g({
                    server: i,
                    protocol: n,
                    port: a,
                    password: s,
                    name: u,
                    comment: o
                }), e.next = 43, w.addNode(c);

              case 43:
                return p = e.sent, e.abrupt("return", p);

              case 45:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 28, 34 ] ]);
    })), function(e) {
        return n.apply(this, arguments);
    }), p = (a = m(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && x.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, w.getNodeById(r);

              case 5:
                if (t = e.sent) {
                    e.next = 8;
                    break;
                }
                throw new Error("id does not exist");

              case 8:
                return e.abrupt("return", t);

              case 9:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return a.apply(this, arguments);
    }), d = (s = m(regeneratorRuntime.mark(function e() {
        var r;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, w.getAllNodes();

              case 2:
                return r = e.sent, e.abrupt("return", r);

              case 4:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function() {
        return s.apply(this, arguments);
    }), f = (u = m(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, x.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, w.getNodesByIds(r);

              case 33:
                return e.abrupt("return", e.sent);

              case 34:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return u.apply(this, arguments);
    }), l = (o = m(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && x.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, w.deleteNodeById(r);

              case 5:
                return e.abrupt("return", e.sent);

              case 6:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return o.apply(this, arguments);
    }), h = (i = m(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (t = r.id, n = r.protocol, a = r.port, s = r.password, u = r.name, o = r.comment, 
                t && x.isUUID(t)) {
                    e.next = 6;
                    break;
                }
                throw new Error("illegal argument");

              case 6:
                if (n && "string" == typeof n && x.isIn(n, [ "shadowsocks" ])) {
                    e.next = 9;
                    break;
                }
                throw new Error("illegal argument");

              case 9:
                if (!(!a || !Number.isInteger(a) || a < 1 || a > 65535)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
                if (s && "string" == typeof s) {
                    e.next = 15;
                    break;
                }
                throw new Error("illegal argument");

              case 15:
                if (u && "string" == typeof u) {
                    e.next = 18;
                    break;
                }
                throw new Error("illegal argument");

              case 18:
                if (!o || "string" == typeof o) {
                    e.next = 21;
                    break;
                }
                throw new Error("illegal argument");

              case 21:
                return i = void 0, e.prev = 23, e.next = 26, p(t);

              case 26:
                i = e.sent, e.next = 34;
                break;

              case 29:
                if (e.prev = 29, e.t0 = e.catch(23), "id does not exist" !== e.t0.message) {
                    e.next = 33;
                    break;
                }
                throw new Error("node does not exist");

              case 33:
              case 34:
                return e.next = 37, w.doesNodeNameExist(u);

              case 37:
                if (!e.sent) {
                    e.next = 39;
                    break;
                }
                throw new Error("node already exists");

              case 39:
                return i.protocol = n, i.password = s, i.port = a, i.name = u, i.comment = o, e.next = 47, 
                w.updateNode(i);

              case 47:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 23, 29 ] ]);
    })), function(e) {
        return i.apply(this, arguments);
    });
    function m(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var x = t(1), g = t(10), w = t(20), v = t(40);
    t(19), t(0)("node:service");
    e.exports.addNode = c, e.exports.getNodeById = p, e.exports.getAllNodes = d, e.exports.getNodesByIds = f, 
    e.exports.deleteNode = l, e.exports.updateNode = h;
}, function(e, r, t) {
    "use strict";
    var n = t(6), a = t(1);
    t(0)("server:model");
    e.exports = function e(r) {
        if (function(e, r) {
            if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
        }(this, e), !r) throw new Error("illegal argument");
        if (r.id && ("string" != typeof r.id || !a.isUUID(r.id))) throw new Error("illegal argument");
        if (!r.ipAddressOrDomainName || "string" != typeof r.ipAddressOrDomainName) throw new Error("illegal argument");
        if (!a.isIP(r.ipAddressOrDomainName) && !a.isFQDN(r.ipAddressOrDomainName)) throw new Error("illegal argument");
        if (r.createdTime && r.createdTime > Date.now()) throw new Error("illegal argument");
        this.id = r.id || n.v4(), this.ipAddressOrDomainName = r.ipAddressOrDomainName, 
        this.createdTime = r.createdTime || Date.now();
    };
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c, p = (n = g(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, y.getUserById(r);

              case 5:
                if (t = e.sent) {
                    e.next = 8;
                    break;
                }
                throw new Error("id does not exist");

              case 8:
                return e.abrupt("return", t);

              case 10:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return n.apply(this, arguments);
    }), d = (a = g(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, w.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, y.getUsersByIds(r);

              case 33:
                return e.abrupt("return", e.sent);

              case 34:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return a.apply(this, arguments);
    }), f = (s = g(regeneratorRuntime.mark(function e() {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, y.getAllUsers();

              case 2:
                return e.abrupt("return", e.sent);

              case 3:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function() {
        return s.apply(this, arguments);
    }), l = (u = g(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && w.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, h(r);

              case 5:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return u.apply(this, arguments);
    }), h = (o = g(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && w.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return t = Date.now(), e.next = 6, y.refreshLastLogoutTimeById(r, t);

              case 6:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return o.apply(this, arguments);
    }), m = (i = g(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && w.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (!isNaN(t) && Number.isInteger(t)) {
                    e.next = 5;
                    break;
                }
                throw new Error("illegal argument");

              case 5:
                return e.next = 8, x(r);

              case 8:
                return n = e.sent, e.abrupt("return", n > t);

              case 10:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e, r) {
        return i.apply(this, arguments);
    }), x = (c = g(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && w.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, y.getUserLastLogoutTimeById(r);

              case 5:
                return e.abrupt("return", e.sent);

              case 6:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return c.apply(this, arguments);
    });
    function g(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var w = t(1), v = t(80), y = t(43), b = (t(0)("user:service"), v.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: !0,
        auth: {
            user: "no-reply@shadowsocks.expert",
            pass: "jbvfbqoawetrlqww"
        },
        tls: {
            rejectUnauthorized: !0
        }
    }));
    e.exports.sendEmail = function(e, r, t) {
        return new Promise(function(n, a) {
            b.sendMail({
                from: "no-reply@shadowsocks.expert",
                to: e,
                subject: r,
                text: t
            }, function(e, r) {
                return e ? a(new Error("send email failed")) : n(r);
            });
        });
    }, e.exports.getUserById = p, e.exports.getUsersByIds = d, e.exports.getAllUsers = f, 
    e.exports.invalidateRefreshToken = l, e.exports.hasUserLoggedOutSince = m;
}, function(e, r) {
    e.exports = require("crypto");
}, function(e, r, t) {
    "use strict";
    var n = t(6), a = t(1);
    t(0)("traffic:model");
    e.exports = function e(r) {
        if (function(e, r) {
            if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
        }(this, e), !r) throw new Error("illegal argument");
        if (r.id && ("string" != typeof r.id || !a.isUUID(r.id))) throw new Error("illegal argument");
        if ("string" != typeof r.accountId || !a.isUUID(r.accountId)) throw new Error("illegal argument");
        if (!Number.isInteger(r.usage)) throw new Error("illegal argument");
        if (!Number.isInteger(r.lastMeterReading)) throw new Error("illegal argument");
        if (r.createdTime && r.createdTime > Date.now()) throw new Error("illegal argument");
        this.id = r.id || n.v4(), this.accountId = r.accountId, this.usage = r.usage, this.lastMeterReading = r.lastMeterReading, 
        this.createdTime = r.createdTime || Date.now();
    };
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c, p, d, f, l, h, m, x, g, w = (n = _(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (t = r.accountId, n = r.meterReading, t && N.isUUID(t) && Number.isInteger(n)) {
                    e.next = 6;
                    break;
                }
                throw new Error("illegal argument");

              case 6:
                return e.next = 9, C.getTrafficByAccountId(t);

              case 9:
                if (a = e.sent) {
                    e.next = 15;
                    break;
                }
                return s = {
                    accountId: t,
                    usage: n,
                    lastMeterReading: n
                }, e.next = 14, y(s);

              case 14:
                return e.abrupt("return");

              case 15:
                if (u = a.id, o = a.usage, i = a.lastMeterReading, n !== i) {
                    e.next = 22;
                    break;
                }
                return e.next = 20, v(u, o, i);

              case 20:
                e.next = 50;
                break;

              case 22:
                if (!(0 === n && i > 0)) {
                    e.next = 28;
                    break;
                }
                return i = 0, e.next = 26, v(u, o, i);

              case 26:
                e.next = 50;
                break;

              case 28:
                if (!(n > 0 && 0 === i)) {
                    e.next = 35;
                    break;
                }
                return o += n, i = n, e.next = 33, y({
                    accountId: t,
                    usage: o,
                    lastMeterReading: i
                });

              case 33:
                e.next = 50;
                break;

              case 35:
                if (!(n > 0 && i > 0 && n > i)) {
                    e.next = 42;
                    break;
                }
                return o += n - i, i = n, e.next = 40, y({
                    accountId: t,
                    usage: o,
                    lastMeterReading: i
                });

              case 40:
                e.next = 50;
                break;

              case 42:
                if (!(n > 0 && i > 0 && n < i)) {
                    e.next = 49;
                    break;
                }
                return o += n, i = n, e.next = 47, y({
                    accountId: t,
                    usage: o,
                    lastMeterReading: i
                });

              case 47:
                e.next = 50;
                break;

              case 49:
                throw new Error("should not come here");

              case 50:
                return e.abrupt("return");

              case 52:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return n.apply(this, arguments);
    }), v = (a = _(regeneratorRuntime.mark(function e(r, t, n) {
        var a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && "string" == typeof r && N.isUUID(r) && Number.isInteger(t) && Number.isInteger(n)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return a = Date.now(), e.next = 6, C.updateTrafficById(r, t, n, a);

              case 6:
                return e.abrupt("return");

              case 7:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e, r, t) {
        return a.apply(this, arguments);
    }), y = (s = _(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (t = r.accountId, n = r.usage, a = r.lastMeterReading, "string" == typeof t && N.isUUID(t) && Number.isInteger(n) && Number.isInteger(a)) {
                    e.next = 6;
                    break;
                }
                throw new Error("illegal argument");

              case 6:
                return e.next = 9, L.doesAccountIdExist(t);

              case 9:
                if (e.sent) {
                    e.next = 11;
                    break;
                }
                throw new Error("accountId does not exist");

              case 11:
                return s = new O({
                    accountId: t,
                    usage: n,
                    lastMeterReading: a
                }), e.next = 15, C.addTraffic(s);

              case 15:
                return e.abrupt("return");

              case 16:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return s.apply(this, arguments);
    }), b = (u = _(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && N.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, C.getTrafficById(r);

              case 5:
                if (t = e.sent) {
                    e.next = 8;
                    break;
                }
                throw new Error("id does not exist");

              case 8:
                return e.abrupt("return", t);

              case 9:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return u.apply(this, arguments);
    }), k = (o = _(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && "string" == typeof r && N.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, C.getLatestUsageByAccountId(r);

              case 5:
                return e.abrupt("return", e.sent);

              case 6:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return o.apply(this, arguments);
    }), I = (i = _(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && "string" == typeof r && N.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, C.getTrafficHistoryByAccountId(r);

              case 5:
                return e.abrupt("return", e.sent);

              case 6:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return i.apply(this, arguments);
    }), R = (c = _(regeneratorRuntime.mark(function e(r) {
        var t, n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && "string" == typeof r && N.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, L.getAccountsByPurchaseIds([ r ]);

              case 5:
                return t = e.sent, n = t.map(function(e) {
                    return e.id;
                }), e.next = 9, P(n);

              case 9:
                return a = e.sent, e.abrupt("return", F(a));

              case 11:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return c.apply(this, arguments);
    }), E = (p = _(regeneratorRuntime.mark(function e(r) {
        var t, n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && "string" == typeof r && N.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, L.getAccountsByUserId(r);

              case 5:
                return t = e.sent, n = t.map(function(e) {
                    return e.id;
                }), e.next = 9, P(n);

              case 9:
                return a = e.sent, e.abrupt("return", F(a));

              case 11:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return p.apply(this, arguments);
    }), A = (d = _(regeneratorRuntime.mark(function e(r) {
        var t, n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && "string" == typeof r && N.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, L.getAccountsByServerId(r);

              case 5:
                return t = e.sent, n = t.map(function(e) {
                    return e.id;
                }), e.next = 9, P(n);

              case 9:
                return a = e.sent, e.abrupt("return", F(a));

              case 11:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return d.apply(this, arguments);
    }), U = (f = _(regeneratorRuntime.mark(function e() {
        var r;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, C.getAllTrafficHistory();

              case 2:
                return r = e.sent, e.abrupt("return", F(r));

              case 4:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function() {
        return f.apply(this, arguments);
    }), P = (l = _(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, N.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, C.getTrafficHistoryByAccountIds(r);

              case 33:
                return e.abrupt("return", e.sent);

              case 34:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return l.apply(this, arguments);
    }), B = (h = _(regeneratorRuntime.mark(function e() {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, C.getLatestUsageForAllAccounts();

              case 2:
                return e.abrupt("return", e.sent);

              case 3:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function() {
        return h.apply(this, arguments);
    }), T = (m = _(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && "string" == typeof r && N.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, C.getLatestUsageByPurchaseId(r);

              case 5:
                return e.abrupt("return", e.sent);

              case 6:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return m.apply(this, arguments);
    }), D = (x = _(regeneratorRuntime.mark(function e() {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, C.getLatestUsageForAllPurchase();

              case 2:
                return e.abrupt("return", e.sent);

              case 3:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function() {
        return x.apply(this, arguments);
    }), S = (g = _(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, N.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, C.deleteTrafficByAccountIds(r);

              case 33:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return g.apply(this, arguments);
    });
    function _(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var N = t(1), q = t(54), O = t(25), C = t(53), L = (t(7), t(8));
    t(0)("traffic:service");
    function F(e) {
        var r = q(e, "accountId"), t = [];
        return Object.keys(r).forEach(function(e) {
            t.push({
                accountId: e,
                trafficHistory: r[e]
            });
        }), t.forEach(function(e) {
            e.trafficHistory.forEach(function(e) {
                delete e.id, delete e.accountId, delete e.lastMeterReading;
            });
        }), t;
    }
    e.exports.updateTraffic = w, e.exports.getTrafficById = b, e.exports.getLatestUsageByAccountId = k, 
    e.exports.getTrafficHistoryByAccountId = I, e.exports.getTrafficHistoryByPurchaseId = R, 
    e.exports.getTrafficHistoryByUserId = E, e.exports.getTrafficHistoryByServerId = A, 
    e.exports.getAllTrafficHistory = U, e.exports.getLatestUsageForAllAccounts = B, 
    e.exports.getLatestUsageByPurchaseId = T, e.exports.getLatestUsageForAllPurchase = D, 
    e.exports.deleteTrafficByAccountIds = S;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i = (n = l(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, m.getAllAccounts();

              case 3:
                return n = e.sent, a = n.map(function(e) {
                    return x(e);
                }), e.abrupt("return", t.status(200).send(a));

              case 9:
                return e.prev = 9, e.t0 = e.catch(0), e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 12:
              case 13:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 9 ] ]);
    })), function(e, r) {
        return n.apply(this, arguments);
    }), c = (a = l(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, i, c, p, d;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r.query.ids)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "array expected"
                }));

              case 2:
                n = !0, a = !1, s = void 0, e.prev = 6, u = r.query.ids[Symbol.iterator]();

              case 8:
                if (n = (o = u.next()).done) {
                    e.next = 16;
                    break;
                }
                if (i = o.value, h.isUUID(i)) {
                    e.next = 12;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "uuid expected"
                }));

              case 12:
              case 13:
                n = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), a = !0, s = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !n && u.return && u.return();

              case 25:
                if (e.prev = 25, !a) {
                    e.next = 28;
                    break;
                }
                throw s;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, m.getAccountsByIds(r.query.ids);

              case 34:
                if (c = e.sent, p = !0, c.forEach(function(e) {
                    "admin" !== r.user.role && e.purchase.user.id !== r.user.id && (p = !1);
                }), !p) {
                    e.next = 42;
                    break;
                }
                return d = c.map(function(e) {
                    return x(e);
                }), e.abrupt("return", t.status(200).send(d));

              case 42:
                return e.abrupt("return", t.status(401).end());

              case 43:
                e.next = 49;
                break;

              case 46:
                return e.prev = 46, e.t1 = e.catch(31), e.abrupt("return", t.status(500).send({
                    error: e.t1
                }));

              case 49:
              case 50:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 46 ] ]);
    })), function(e, r) {
        return a.apply(this, arguments);
    }), p = (s = l(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, i, c, p, d;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r.query.purchaseIds)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "array expected"
                }));

              case 2:
                n = !0, a = !1, s = void 0, e.prev = 6, u = r.query.purchaseIds[Symbol.iterator]();

              case 8:
                if (n = (o = u.next()).done) {
                    e.next = 16;
                    break;
                }
                if (i = o.value, h.isUUID(i)) {
                    e.next = 12;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "uuid expected"
                }));

              case 12:
              case 13:
                n = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), a = !0, s = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !n && u.return && u.return();

              case 25:
                if (e.prev = 25, !a) {
                    e.next = 28;
                    break;
                }
                throw s;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, m.getAccountsByPurchaseIds(r.query.purchaseIds);

              case 34:
                if (c = e.sent, p = !0, c.forEach(function(e) {
                    "admin" !== r.user.role && e.purchase.user.id !== r.user.id && (p = !1);
                }), !p) {
                    e.next = 42;
                    break;
                }
                return d = c.map(function(e) {
                    return x(e);
                }), e.abrupt("return", t.status(200).send(d));

              case 42:
                return e.abrupt("return", t.status(401).end());

              case 43:
                e.next = 49;
                break;

              case 46:
                return e.prev = 46, e.t1 = e.catch(31), e.abrupt("return", t.status(500).send({
                    error: e.t1
                }));

              case 49:
              case 50:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 46 ] ]);
    })), function(e, r) {
        return s.apply(this, arguments);
    }), d = (u = l(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (h.isUUID(r.query.id)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "uuid expected"
                }));

              case 2:
                return e.prev = 3, e.next = 6, m.getAccountsByUserId(r.query.id);

              case 6:
                return n = e.sent, a = n.map(function(e) {
                    return x(e);
                }), e.abrupt("return", t.status(200).send(a));

              case 11:
                return e.prev = 11, e.t0 = e.catch(3), e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 14:
              case 15:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 11 ] ]);
    })), function(e, r) {
        return u.apply(this, arguments);
    }), f = (o = l(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (h.isUUID(r.query.id)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "uuid expected"
                }));

              case 2:
                return e.prev = 3, e.next = 6, m.getAccountsByServerId(r.query.id);

              case 6:
                return n = e.sent, a = n.map(function(e) {
                    return x(e);
                }), e.abrupt("return", t.status(200).send(a));

              case 11:
                return e.prev = 11, e.t0 = e.catch(3), e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 14:
              case 15:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 11 ] ]);
    })), function(e, r) {
        return o.apply(this, arguments);
    });
    function l(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var h = t(1), m = t(8);
    t(0)("account:controller");
    function x(e) {
        var r = JSON.parse(JSON.stringify(e));
        return delete r.node.password, delete r.purchase.user.password, delete r.purchase.user.hashedPassword, 
        delete r.purchase.user.resetPasswordToken, delete r.purchase.user.tokenCreatedTime, 
        delete r.purchase.user.lastLoginTime, r;
    }
    e.exports.getAllAccounts = i, e.exports.getAccountsByIds = c, e.exports.getAccountsByPurchaseIds = p, 
    e.exports.getAccountsByUserId = d, e.exports.getAccountsByServerId = f, e.exports.decensitise = x;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c, p, d, f, l, h = (n = E(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (t = r.nodeId, n = r.purchaseId, A.isUUID(t) && A.isUUID(n)) {
                    e.next = 6;
                    break;
                }
                throw new Error("illegal argument");

              case 6:
                return a = void 0, e.prev = 8, e.next = 11, D.getNodeById(t);

              case 11:
                a = e.sent, e.next = 19;
                break;

              case 14:
                if (e.prev = 14, e.t0 = e.catch(8), "id does not exist" !== e.t0.message) {
                    e.next = 18;
                    break;
                }
                throw new Error("node does not exist");

              case 18:
              case 19:
                return s = void 0, e.prev = 21, e.next = 24, S.getPurchaseById(n);

              case 24:
                s = e.sent, e.next = 32;
                break;

              case 27:
                if (e.prev = 27, e.t1 = e.catch(21), "id does not exist" !== e.t1.message) {
                    e.next = 31;
                    break;
                }
                throw new Error("purchase does not exist");

              case 31:
              case 32:
                if ("completed" === s.payment.state) {
                    e.next = 35;
                    break;
                }
                throw new Error("purchase is not completed");

              case 35:
                return e.next = 38, x(a);

              case 38:
                return u = e.sent, o = new B({
                    node: a,
                    purchase: s,
                    port: u.port,
                    password: u.password,
                    method: u.method
                }), e.next = 42, w(o);

              case 42:
                return e.next = 44, P.addSsAccount(o);

              case 44:
                return i = e.sent, e.abrupt("return", i);

              case 46:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 8, 14 ], [ 21, 27 ] ]);
    })), function(e) {
        return n.apply(this, arguments);
    }), m = (a = E(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u = this;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (t = r.purchaseId, A.isUUID(t)) {
                    e.next = 6;
                    break;
                }
                throw new Error("illegal argument");

              case 6:
                return e.next = 9, D.getAllNodes();

              case 9:
                if (n = e.sent) {
                    e.next = 12;
                    break;
                }
                throw new Error("nodes is undefined");

              case 12:
                return e.next = 15, S.getPurchaseById(t);

              case 15:
                if (a = e.sent) {
                    e.next = 18;
                    break;
                }
                throw new Error("purchase does not exist");

              case 18:
                return e.next = 21, Promise.all(n.map(function() {
                    var e = E(regeneratorRuntime.mark(function e(r) {
                        var t, n, s;
                        return regeneratorRuntime.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return e.next = 2, x(r);

                              case 2:
                                return t = e.sent, n = new B({
                                    node: r,
                                    purchase: a,
                                    port: t.port,
                                    password: t.password,
                                    method: t.method
                                }), e.next = 6, P.addSsAccount(n);

                              case 6:
                                return s = e.sent, e.next = 9, w(n);

                              case 9:
                                return e.abrupt("return", s);

                              case 10:
                              case "end":
                                return e.stop();
                            }
                        }, e, u);
                    }));
                    return function(r) {
                        return e.apply(this, arguments);
                    };
                }()));

              case 21:
                return s = e.sent, e.abrupt("return", s);

              case 23:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return a.apply(this, arguments);
    }), x = (s = E(regeneratorRuntime.mark(function e(r) {
        var t, n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && r instanceof T) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, g(5e4, 6e4);

              case 5:
                return t = e.sent, n = U.randomBytes(8).toString("hex"), a = "aes-256-cfb", e.abrupt("return", {
                    port: t,
                    password: n,
                    method: a
                });

              case 9:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return s.apply(this, arguments);
    }), g = (u = E(regeneratorRuntime.mark(function e(r, t) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && t && !isNaN(r) && !isNaN(t)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return r = Math.ceil(r), t = Math.floor(t), e.abrupt("return", Math.floor(Math.random() * (t - r + 1)) + r);

              case 6:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e, r) {
        return u.apply(this, arguments);
    }), w = (o = E(regeneratorRuntime.mark(function e(r) {
        var t, n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && r instanceof B) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return t = {
                    port: r.port,
                    password: r.password
                }, n = {
                    host: r.node.server.ipAddressOrDomainName,
                    port: r.node.port,
                    password: r.node.password
                }, e.prev = 4, e.next = 7, _.addPort("shadowsocks", t, n);

              case 7:
                e.sent, e.next = 13;
                break;

              case 10:
                e.prev = 10, e.t0 = e.catch(4), console.error(r.node.name, e.t0.message);

              case 13:
              case 14:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 4, 10 ] ]);
    })), function(e) {
        return o.apply(this, arguments);
    }), v = (i = E(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && A.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, P.getSsAccountById(r);

              case 5:
                if (t = e.sent) {
                    e.next = 8;
                    break;
                }
                throw new Error("id does not exist");

              case 8:
                return e.abrupt("return", t);

              case 9:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return i.apply(this, arguments);
    }), y = (c = E(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, A.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, P.getSsAccountsByIds(r);

              case 33:
                return e.abrupt("return", e.sent);

              case 34:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return c.apply(this, arguments);
    }), b = (p = E(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && A.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return t = void 0, e.prev = 4, e.next = 7, v(r);

              case 7:
                t = e.sent, e.next = 14;
                break;

              case 10:
                if (e.prev = 10, e.t0 = e.catch(4), "id does not exist" !== e.t0.message) {
                    e.next = 14;
                    break;
                }
                throw new Error("ssAccount does not exist");

              case 14:
                return e.next = 16, k(t.port, t.node);

              case 16:
                return e.next = 18, P.deleteSsAccountsByIds([ r ]);

              case 18:
                return e.abrupt("return", e.sent);

              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 4, 10 ] ]);
    })), function(e) {
        return p.apply(this, arguments);
    }), k = (d = E(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (!(!r || !Number.isInteger(r) || r < 1 || r > 65535)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (t && t instanceof T && "shadowsocks" === t.protocol) {
                    e.next = 5;
                    break;
                }
                throw new Error("illegal argument");

              case 5:
                return n = {
                    port: r
                }, a = {
                    host: t.server.ipAddressOrDomainName,
                    port: t.port,
                    password: t.password
                }, e.prev = 8, e.next = 11, _.deletePort("shadowsocks", n, a);

              case 11:
                e.next = 16;
                break;

              case 13:
                e.prev = 13, e.t0 = e.catch(8), console.error(t.name, e.t0.message);

              case 16:
              case 17:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 8, 13 ] ]);
    })), function(e, r) {
        return d.apply(this, arguments);
    }), I = (f = E(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, i, c, p, d = this;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                n = !0, a = !1, s = void 0, e.prev = 6, u = r[Symbol.iterator]();

              case 8:
                if (n = (o = u.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o.value instanceof B) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                n = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), a = !0, s = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !n && u.return && u.return();

              case 25:
                if (e.prev = 25, !a) {
                    e.next = 28;
                    break;
                }
                throw s;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                if (t && t instanceof T && "shadowsocks" === t.protocol) {
                    e.next = 33;
                    break;
                }
                throw new Error("illegal argument");

              case 33:
                return e.prev = 34, e.next = 37, R(t);

              case 37:
                i = e.sent, c = i.map(function(e) {
                    return e.port;
                }), r.forEach(function() {
                    var e = E(regeneratorRuntime.mark(function e(r) {
                        return regeneratorRuntime.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                if (c.includes(r.port)) {
                                    e.next = 3;
                                    break;
                                }
                                return e.next = 3, w(r);

                              case 3:
                              case 4:
                              case "end":
                                return e.stop();
                            }
                        }, e, d);
                    }));
                    return function(r) {
                        return e.apply(this, arguments);
                    };
                }()), p = r.map(function(e) {
                    return e.port;
                }), c.forEach(function() {
                    var e = E(regeneratorRuntime.mark(function e(r) {
                        return regeneratorRuntime.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                if (p.includes(r)) {
                                    e.next = 3;
                                    break;
                                }
                                return e.next = 3, k(r, t);

                              case 3:
                              case 4:
                              case "end":
                                return e.stop();
                            }
                        }, e, d);
                    }));
                    return function(r) {
                        return e.apply(this, arguments);
                    };
                }()), e.next = 47;
                break;

              case 44:
                e.prev = 44, e.t1 = e.catch(34), console.error(t.name, e.t1.message);

              case 47:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 34, 44 ] ]);
    })), function(e, r) {
        return f.apply(this, arguments);
    }), R = (l = E(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && r instanceof T) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return t = {
                    host: r.server.ipAddressOrDomainName,
                    port: r.port,
                    password: r.password
                }, e.next = 6, _.getAllPorts(r.protocol, t);

              case 6:
                return e.abrupt("return", e.sent);

              case 7:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return l.apply(this, arguments);
    });
    function E(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var A = t(1), U = t(24), P = t(30), B = t(29), T = t(10), D = t(21), S = t(13), _ = t(19);
    t(0)("ssAccount:service");
    e.exports.addSsAccount = h, e.exports.addSsAccountForEveryNode = m, e.exports.getSsAccountById = v, 
    e.exports.getSsAccountsByIds = y, e.exports.deleteSsAccountById = b, e.exports.monitorAllAccountsForNode = I;
}, function(e, r, t) {
    "use strict";
    var n = t(7), a = (t(0)("ssAccount:model"), function(e) {
        function r(e) {
            if (function(e, r) {
                if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
            }(this, r), !e || "string" != typeof e.password || "string" != typeof e.method) throw new Error("illegal argument");
            var t = function(e, r) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !r || "object" != typeof r && "function" != typeof r ? e : r;
            }(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, e));
            return t.type = "SsAccount", t.password = e.password, t.method = e.method, t;
        }
        return function(e, r) {
            if ("function" != typeof r && null !== r) throw new TypeError("Super expression must either be null or a function, not " + typeof r);
            e.prototype = Object.create(r && r.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r);
        }(r, n), r;
    }());
    e.exports = a;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c = (n = m(regeneratorRuntime.mark(function e(r) {
        var t, n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && r instanceof g) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return delete (t = new g(r)).password, delete t.method, delete (n = new g(r)).node, 
                delete n.purchase, delete n.port, delete n.createdTime, e.prev = 11, e.next = 14, 
                b.transaction(function() {
                    var e = m(regeneratorRuntime.mark(function e(r) {
                        return regeneratorRuntime.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return e.next = 2, r.insert({
                                    id: t.id,
                                    type: t.type,
                                    nodeId: t.node.id,
                                    purchaseId: t.purchase.id,
                                    port: t.port,
                                    createdTime: t.createdTime
                                }).into("account");

                              case 2:
                                return e.next = 4, r.insert(n).into("ss_account");

                              case 4:
                              case "end":
                                return e.stop();
                            }
                        }, e, this);
                    }));
                    return function(r) {
                        return e.apply(this, arguments);
                    };
                }());

              case 14:
                return e.abrupt("return", r);

              case 17:
                throw e.prev = 17, e.t0 = e.catch(11), e.t0;

              case 20:
              case 21:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 11, 17 ] ]);
    })), function(e) {
        return n.apply(this, arguments);
    }), p = (a = m(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && x.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, h("id", [ r ]);

              case 5:
                if (0 !== (t = e.sent).length) {
                    e.next = 10;
                    break;
                }
                return e.abrupt("return", null);

              case 10:
                if (1 !== t.length) {
                    e.next = 14;
                    break;
                }
                return e.abrupt("return", t[0]);

              case 14:
                throw new Error("retrieved multiple results from one id");

              case 15:
              case 16:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return a.apply(this, arguments);
    }), d = (s = m(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, x.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, b.transaction(function() {
                    var e = m(regeneratorRuntime.mark(function e(t) {
                        return regeneratorRuntime.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return e.next = 2, t.delete().from("ss_account").whereIn("id", r);

                              case 2:
                                return e.next = 4, t.delete().from("account").whereIn("id", r);

                              case 4:
                              case "end":
                                return e.stop();
                            }
                        }, e, this);
                    }));
                    return function(r) {
                        return e.apply(this, arguments);
                    };
                }());

              case 34:
                e.next = 42;
                break;

              case 36:
                if (e.prev = 36, e.t1 = e.catch(31), "ER_ROW_IS_REFERENCED_2" !== e.t1.code) {
                    e.next = 40;
                    break;
                }
                throw new Error("ssAccount is referenced");

              case 40:
                throw e.t1;

              case 42:
              case 43:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 36 ] ]);
    })), function(e) {
        return s.apply(this, arguments);
    }), f = (u = m(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, x.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, h("id", r);

              case 33:
                return e.abrupt("return", e.sent);

              case 34:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return u.apply(this, arguments);
    }), l = (o = m(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, x.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, h("purchaseId", r);

              case 33:
                return e.abrupt("return", e.sent);

              case 34:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return o.apply(this, arguments);
    }), h = (i = m(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, i, c, p, d, f, l, h;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && t) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if ("id" === r || "purchaseId" === r) {
                    e.next = 5;
                    break;
                }
                throw new Error("illegal argument");

              case 5:
                n = !0, a = !1, s = void 0, e.prev = 9, u = t[Symbol.iterator]();

              case 11:
                if (n = (o = u.next()).done) {
                    e.next = 19;
                    break;
                }
                if (i = o.value, x.isUUID(i)) {
                    e.next = 15;
                    break;
                }
                throw new Error("illegal argument");

              case 15:
              case 16:
                n = !0, e.next = 11;
                break;

              case 19:
                e.next = 25;
                break;

              case 21:
                e.prev = 21, e.t0 = e.catch(9), a = !0, s = e.t0;

              case 25:
                e.prev = 25, e.prev = 26, !n && u.return && u.return();

              case 28:
                if (e.prev = 28, !a) {
                    e.next = 31;
                    break;
                }
                throw s;

              case 31:
                return e.finish(28);

              case 32:
                return e.finish(25);

              case 33:
                return e.prev = 34, e.next = 37, b.select("ss_account.id as id", "ss_account.type as type", "account.nodeId as nodeId", "account.purchaseId as purchaseId", "account.port as port", "account.createdTime as createdTime", "ss_account.password as password", "ss_account.method as method").from("ss_account").innerJoin("account", "ss_account.id", "account.id").whereIn("account." + r, t);

              case 37:
                return c = e.sent, p = Array.from(new Set(c.map(function(e) {
                    return e.nodeId;
                }))), d = Array.from(new Set(c.map(function(e) {
                    return e.purchaseId;
                }))), e.next = 42, w.getNodesByIds(p);

              case 42:
                return f = e.sent, e.next = 45, v.getPurchasesByIds(d);

              case 45:
                return l = e.sent, h = c.map(function(e) {
                    var r = f.filter(function(r) {
                        return r.id === e.nodeId;
                    })[0], t = l.filter(function(r) {
                        return r.id === e.purchaseId;
                    })[0];
                    return new g({
                        id: e.id,
                        type: e.type,
                        node: r,
                        purchase: t,
                        port: e.port,
                        createdTime: e.createdTime,
                        password: e.password,
                        method: e.method
                    });
                }), e.abrupt("return", h);

              case 50:
                throw e.prev = 50, e.t1 = e.catch(34), e.t1;

              case 53:
              case 54:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 9, 21, 25, 33 ], [ 26, , 28, 32 ], [ 34, 50 ] ]);
    })), function(e, r) {
        return i.apply(this, arguments);
    });
    function m(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var x = t(1), g = t(29), w = t(20), v = t(32), y = t(4).production, b = t(3)(y);
    t(0)("ssAccount:dao");
    e.exports.addSsAccount = c, e.exports.getSsAccountById = p, e.exports.deleteSsAccountsByIds = d, 
    e.exports.getSsAccountsByIds = f, e.exports.getSsAccountsByPurchaseIds = l;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c, p, d, f = (n = b(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && k.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, g([ r ]);

              case 5:
                if (0 !== (t = e.sent).length) {
                    e.next = 10;
                    break;
                }
                return e.abrupt("return", null);

              case 10:
                if (1 !== t.length) {
                    e.next = 14;
                    break;
                }
                return e.abrupt("return", t[0]);

              case 14:
                throw new Error("retrieved multiple accounts from one id");

              case 15:
              case 16:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return n.apply(this, arguments);
    }), l = (a = b(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && t) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, R.select("id").from("account").where({
                    nodeId: r,
                    port: t
                });

              case 6:
                if (1 !== (n = e.sent).length) {
                    e.next = 11;
                    break;
                }
                return e.abrupt("return", n[0].id);

              case 11:
                throw new Error("getAccountIdByNodeIdAndPort, error.");

              case 12:
                e.next = 18;
                break;

              case 15:
                throw e.prev = 15, e.t0 = e.catch(3), e.t0;

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 15 ] ]);
    })), function(e, r) {
        return a.apply(this, arguments);
    }), h = (s = b(regeneratorRuntime.mark(function e() {
        var r, t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, m();

              case 2:
                return r = e.sent, e.next = 5, g(r);

              case 5:
                return t = e.sent, e.abrupt("return", t);

              case 7:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function() {
        return s.apply(this, arguments);
    }), m = (u = b(regeneratorRuntime.mark(function e() {
        var r, t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, R.select("id").from("account");

              case 3:
                return r = e.sent, t = Array.from(new Set(r.map(function(e) {
                    return e.id;
                }))), e.abrupt("return", t);

              case 8:
                throw e.prev = 8, e.t0 = e.catch(0), e.t0;

              case 11:
              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })), function() {
        return u.apply(this, arguments);
    }), x = (o = b(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && "string" == typeof r && k.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, R.select("id").from("account").where("id", r);

              case 6:
                if (0 !== e.sent.length) {
                    e.next = 11;
                    break;
                }
                return e.abrupt("return", !1);

              case 11:
                return e.abrupt("return", !0);

              case 12:
                e.next = 18;
                break;

              case 15:
                throw e.prev = 15, e.t0 = e.catch(3), e.t0;

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 15 ] ]);
    })), function(e) {
        return o.apply(this, arguments);
    }), g = (i = b(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i, c;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, k.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, E.getSsAccountsByIds(r);

              case 33:
                return i = e.sent, c = i, e.abrupt("return", c);

              case 36:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return i.apply(this, arguments);
    }), w = (c = b(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i, c;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, k.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, E.getSsAccountsByPurchaseIds(r);

              case 33:
                return i = e.sent, c = i, e.abrupt("return", c);

              case 36:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return c.apply(this, arguments);
    }), v = (p = b(regeneratorRuntime.mark(function e() {
        var r, t, n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, R.select("nodeId").from("account");

              case 3:
                return r = e.sent, t = Array.from(new Set(r.map(function(e) {
                    return e.nodeId;
                }))), e.next = 7, A.getNodesByIds(t);

              case 7:
                return n = e.sent, e.abrupt("return", n);

              case 11:
                throw e.prev = 11, e.t0 = e.catch(0), e.t0;

              case 14:
              case 15:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 11 ] ]);
    })), function() {
        return p.apply(this, arguments);
    }), y = (d = b(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, k.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, E.deleteSsAccountsByIds(r);

              case 33:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return d.apply(this, arguments);
    });
    function b(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var k = t(1), I = t(4).production, R = t(3)(I), E = t(30), A = t(20);
    t(0)("account:dao");
    e.exports.getAccountById = f, e.exports.getAccountIdByNodeIdAndPort = l, e.exports.getAllAccounts = h, 
    e.exports.doesAccountIdExist = x, e.exports.getAccountsByIds = g, e.exports.getAccountsByPurchaseIds = w, 
    e.exports.getNodesForAllAccounts = v, e.exports.deleteAccountsByIds = y;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c, p = (n = g(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && r instanceof b) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, y.insert({
                    id: r.id,
                    userId: r.user.id,
                    productId: r.product.id,
                    paymentId: r.payment.id,
                    createdTime: r.createdTime
                }).into("purchase");

              case 6:
                return e.abrupt("return", r);

              case 9:
                throw e.prev = 9, e.t0 = e.catch(3), e.t0;

              case 12:
              case 13:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 9 ] ]);
    })), function(e) {
        return n.apply(this, arguments);
    }), d = (a = g(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && w.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, l("paymentId", r);

              case 5:
                return t = e.sent, e.abrupt("return", t);

              case 7:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return a.apply(this, arguments);
    }), f = (s = g(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && w.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, l("id", r);

              case 5:
                return t = e.sent, e.abrupt("return", t);

              case 7:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return s.apply(this, arguments);
    }), l = (u = g(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && t) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if ("id" === r || "paymentId" === r) {
                    e.next = 5;
                    break;
                }
                throw new Error("illegal argument");

              case 5:
                if (w.isUUID(t)) {
                    e.next = 8;
                    break;
                }
                throw new Error("illegal argument");

              case 8:
                return e.prev = 9, e.next = 12, y.select().from("purchase").where("" + r, t);

              case 12:
                if (0 !== (n = e.sent).length) {
                    e.next = 17;
                    break;
                }
                return e.abrupt("return", null);

              case 17:
                if (1 !== n.length) {
                    e.next = 31;
                    break;
                }
                return e.next = 20, k.getUserById(n[0].userId);

              case 20:
                return a = e.sent, e.next = 23, I.getProductById(n[0].productId);

              case 23:
                return s = e.sent, e.next = 26, R.getPaymentById(n[0].paymentId);

              case 26:
                return u = e.sent, o = new b({
                    id: n[0].id,
                    user: a,
                    product: s,
                    payment: u,
                    createdTime: n[0].createdTime
                }), e.abrupt("return", o);

              case 31:
                throw new Error("retrieved multiple purchases from one paymentId");

              case 32:
                e.next = 38;
                break;

              case 35:
                throw e.prev = 35, e.t0 = e.catch(9), e.t0;

              case 38:
              case 39:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 9, 35 ] ]);
    })), function(e, r) {
        return u.apply(this, arguments);
    }), h = (o = g(regeneratorRuntime.mark(function e() {
        var r, t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, m();

              case 2:
                return r = e.sent, e.next = 5, x(r);

              case 5:
                return t = e.sent, e.abrupt("return", t);

              case 7:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function() {
        return o.apply(this, arguments);
    }), m = (i = g(regeneratorRuntime.mark(function e() {
        var r, t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, y.select("id").from("purchase");

              case 3:
                return r = e.sent, t = r.map(function(e) {
                    return e.id;
                }), e.abrupt("return", t);

              case 8:
                throw e.prev = 8, e.t0 = e.catch(0), e.t0;

              case 11:
              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })), function() {
        return i.apply(this, arguments);
    }), x = (c = g(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i, c, p, d, f, l, h, m;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, w.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, y.select().from("purchase").whereIn("id", r);

              case 34:
                return i = e.sent, c = Array.from(new Set(i.map(function(e) {
                    return e.productId;
                }))), p = Array.from(new Set(i.map(function(e) {
                    return e.paymentId;
                }))), d = Array.from(new Set(i.map(function(e) {
                    return e.userId;
                }))), e.next = 40, I.getProductsByIds(c);

              case 40:
                return f = e.sent, e.next = 43, R.getPaymentsByIds(p);

              case 43:
                return l = e.sent, e.next = 46, k.getUsersByIds(d);

              case 46:
                return h = e.sent, m = i.map(function(e) {
                    var r = f.filter(function(r) {
                        return r.id === e.productId;
                    })[0], t = l.filter(function(r) {
                        return r.id === e.paymentId;
                    })[0], n = h.filter(function(r) {
                        return r.id === e.userId;
                    })[0];
                    return new b({
                        id: e.id,
                        product: r,
                        payment: t,
                        user: n,
                        createdTime: e.createdTime
                    });
                }), e.abrupt("return", m);

              case 51:
                throw e.prev = 51, e.t1 = e.catch(31), e.t1;

              case 54:
              case 55:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 51 ] ]);
    })), function(e) {
        return c.apply(this, arguments);
    });
    function g(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var w = t(1), v = t(4).production, y = t(3)(v), b = t(12), k = t(43), I = t(37), R = t(34);
    t(0)("purchase:dao");
    e.exports.addPurchase = p, e.exports.getPurchaseByPaymentId = d, e.exports.getPurchaseById = f, 
    e.exports.getAllPurchases = h, e.exports.getPurchasesByIds = x;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c = (n = m(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.abrupt("return", r);

              case 1:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return n.apply(this, arguments);
    }), p = (a = m(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && x.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, f("id", r);

              case 5:
                return t = e.sent, e.abrupt("return", t);

              case 7:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return a.apply(this, arguments);
    }), d = (s = m(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && "string" == typeof r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, f("paypalId", r);

              case 5:
                return t = e.sent, e.abrupt("return", t);

              case 7:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return s.apply(this, arguments);
    }), f = (u = m(regeneratorRuntime.mark(function e(r, t) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.abrupt("return", null);

              case 1:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e, r) {
        return u.apply(this, arguments);
    }), l = (o = m(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.abrupt("return", []);

              case 1:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return o.apply(this, arguments);
    }), h = (i = m(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.abrupt("return", []);

              case 1:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return i.apply(this, arguments);
    });
    function m(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var x = t(1), g = (t(14), t(4).production);
    t(3)(g), t(0)("paypalPayment:dao");
    e.exports.addPaypalPayment = c, e.exports.getPaypalPaymentById = p, e.exports.getPaypalPaymentByPaypalId = d, 
    e.exports.getPaypalPaymentsByIds = l, e.exports.getAllRecentlyIncompletePaypalPayments = h;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i = (n = l(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && h.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, x.select().from("payment").where("id", r);

              case 6:
                if (0 !== (t = e.sent).length) {
                    e.next = 11;
                    break;
                }
                return e.abrupt("return", null);

              case 11:
                if (1 !== t.length) {
                    e.next = 33;
                    break;
                }
                if ("PaypalPayment" !== (n = t[0].type)) {
                    e.next = 21;
                    break;
                }
                return e.next = 16, v.getPaypalPaymentById(r);

              case 16:
                return a = e.sent, s = new g(a), e.abrupt("return", s);

              case 21:
                if ("AdminApproval" !== n) {
                    e.next = 29;
                    break;
                }
                return e.next = 24, y.getAdminApprovalById(r);

              case 24:
                return u = e.sent, o = new w(u), e.abrupt("return", o);

              case 29:
                throw new Error("type error");

              case 30:
                e.next = 34;
                break;

              case 33:
                throw new Error("retrieved multiple payments from one ip");

              case 34:
                e.next = 40;
                break;

              case 37:
                throw e.prev = 37, e.t0 = e.catch(3), e.t0;

              case 40:
              case 41:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 37 ] ]);
    })), function(e) {
        return n.apply(this, arguments);
    }), c = (a = l(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && t && h.isUUID(r) && h.isIn(t, [ "created", "completed" ])) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, x.update({
                    state: t
                }).from("payment").where({
                    id: r
                });

              case 6:
                if (1 == (n = e.sent)) {
                    e.next = 9;
                    break;
                }
                throw new Error("update state error");

              case 9:
                return e.abrupt("return", n);

              case 13:
                throw e.prev = 13, e.t0 = e.catch(3), e.t0;

              case 16:
              case 17:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 13 ] ]);
    })), function(e, r) {
        return a.apply(this, arguments);
    }), p = (s = l(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i, c, p;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, h.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, v.getPaypalPaymentsByIds(r);

              case 33:
                return i = e.sent, e.next = 36, y.getAdminApprovalsByIds(r);

              case 36:
                return c = e.sent, p = i.concat(c), e.abrupt("return", p);

              case 39:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return s.apply(this, arguments);
    }), d = (u = l(regeneratorRuntime.mark(function e() {
        var r, t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, f();

              case 2:
                return r = e.sent, e.next = 5, p(r);

              case 5:
                return t = e.sent, e.abrupt("return", t);

              case 7:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function() {
        return u.apply(this, arguments);
    }), f = (o = l(regeneratorRuntime.mark(function e() {
        var r, t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, x.select("id").from("payment");

              case 3:
                return r = e.sent, t = Array.from(new Set(r.map(function(e) {
                    return e.id;
                }))), e.abrupt("return", t);

              case 8:
                throw e.prev = 8, e.t0 = e.catch(0), e.t0;

              case 11:
              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })), function() {
        return o.apply(this, arguments);
    });
    function l(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var h = t(1), m = t(4).production, x = t(3)(m), g = t(14), w = t(16), v = t(33), y = t(35);
    t(0)("payment:dao");
    e.exports.getPaymentById = i, e.exports.updatePaymentStateById = c, e.exports.getPaymentsByIds = p, 
    e.exports.getAllPayments = d;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u = (n = c(regeneratorRuntime.mark(function e(r) {
        var t, n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && r instanceof d) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return t = new d(r), delete (n = new d(r)).currency, delete n.amount, delete n.state, 
                delete n.createdTime, e.prev = 9, e.next = 12, l.transaction(function() {
                    var e = c(regeneratorRuntime.mark(function e(r) {
                        return regeneratorRuntime.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return e.next = 2, r.insert(t).into("payment");

                              case 2:
                                return e.next = 4, r.insert(n).into("admin_approval");

                              case 4:
                              case "end":
                                return e.stop();
                            }
                        }, e, this);
                    }));
                    return function(r) {
                        return e.apply(this, arguments);
                    };
                }());

              case 12:
                return e.abrupt("return", r);

              case 15:
                throw e.prev = 15, e.t0 = e.catch(9), e.t0;

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 9, 15 ] ]);
    })), function(e) {
        return n.apply(this, arguments);
    }), o = (a = c(regeneratorRuntime.mark(function e(r) {
        var t, n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && p.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, i([ r ]);

              case 5:
                if (0 !== (t = e.sent).length) {
                    e.next = 10;
                    break;
                }
                return e.abrupt("return", null);

              case 10:
                if (1 !== t.length) {
                    e.next = 15;
                    break;
                }
                return n = new d(t[0]), e.abrupt("return", n);

              case 15:
                throw new Error("retrieved multiple results from one username");

              case 16:
              case 17:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return a.apply(this, arguments);
    }), i = (s = c(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i, c;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, p.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, l.select("admin_approval.id as id", "admin_approval.type as type", "payment.currency as currency", "payment.amount as amount", "payment.state as state", "payment.createdTime as createdTime").from("admin_approval").innerJoin("payment", "admin_approval.id", "payment.id").whereIn("admin_approval.id", r);

              case 34:
                return i = e.sent, c = i.map(function(e) {
                    return new d(e);
                }), e.abrupt("return", c);

              case 39:
                throw e.prev = 39, e.t1 = e.catch(31), e.t1;

              case 42:
              case 43:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 39 ] ]);
    })), function(e) {
        return s.apply(this, arguments);
    });
    function c(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var p = t(1), d = t(16), f = t(4).production, l = t(3)(f);
    t(0)("adminApproval:dao");
    e.exports.addAdminApproval = u, e.exports.getAdminApprovalById = o, e.exports.getAdminApprovalsByIds = i;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o = (n = d(regeneratorRuntime.mark(function e() {
        var r, t, n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return r = new h({
                    state: "created",
                    currency: "USD",
                    amount: 0
                }), e.next = 3, m.addAdminApproval(r);

              case 3:
                return t = e.sent, n = null, e.abrupt("return", [ n, t ]);

              case 6:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function() {
        return n.apply(this, arguments);
    }), i = (a = d(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && f.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, c(r);

              case 5:
                if (t = e.sent) {
                    e.next = 8;
                    break;
                }
                throw new Error("id does not exist");

              case 8:
                if ("completed" !== t.state) {
                    e.next = 11;
                    break;
                }
                throw new Error("payment is already completed");

              case 11:
                return e.next = 14, l.updatePaymentStateById(t.id, "completed");

              case 14:
                return e.next = 16, l.listenOnPaymentCompletion(t.id);

              case 16:
                return e.abrupt("return");

              case 17:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return a.apply(this, arguments);
    }), c = (s = d(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && f.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, m.getAdminApprovalById(r);

              case 5:
                if (t = e.sent) {
                    e.next = 8;
                    break;
                }
                throw new Error("id does not exist");

              case 8:
                return e.abrupt("return", t);

              case 9:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return s.apply(this, arguments);
    }), p = (u = d(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, f.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, m.getAdminApprovalsByIds(r);

              case 33:
                return e.abrupt("return", e.sent);

              case 34:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return u.apply(this, arguments);
    });
    function d(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var f = t(1), l = t(9), h = t(16), m = t(35);
    t(0)("adminApproval:service");
    e.exports.createAdminApproval = o, e.exports.approveAdminApprovalById = i, e.exports.getAdminApprovalById = c, 
    e.exports.getAdminApprovalsByIds = p;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c, p, d = (n = v(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && r instanceof I) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, k.insert(r).into("product");

              case 6:
                return e.abrupt("return", r);

              case 9:
                throw e.prev = 9, e.t0 = e.catch(3), e.t0;

              case 12:
              case 13:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 9 ] ]);
    })), function(e) {
        return n.apply(this, arguments);
    }), f = (a = v(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && "string" == typeof r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, h("name", r);

              case 5:
                return t = e.sent, e.abrupt("return", t);

              case 7:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return a.apply(this, arguments);
    }), l = (s = v(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && y.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, h("id", r);

              case 5:
                return t = e.sent, e.abrupt("return", t);

              case 7:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return s.apply(this, arguments);
    }), h = (u = v(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && t) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if ("id" === r || "name" === r) {
                    e.next = 5;
                    break;
                }
                throw new Error("illegal argument");

              case 5:
                return e.prev = 6, e.next = 9, k.select().from("product").where("" + r, t);

              case 9:
                if (0 !== (n = e.sent).length) {
                    e.next = 14;
                    break;
                }
                return e.abrupt("return", null);

              case 14:
                if (1 !== n.length) {
                    e.next = 19;
                    break;
                }
                return a = new I(n[0]), e.abrupt("return", a);

              case 19:
                throw new Error("retrieved multiple products from one name");

              case 20:
                e.next = 26;
                break;

              case 23:
                throw e.prev = 23, e.t0 = e.catch(6), e.t0;

              case 26:
              case 27:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 23 ] ]);
    })), function(e, r) {
        return u.apply(this, arguments);
    }), m = (o = v(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i, c;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, y.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, k.select().from("product").whereIn("id", r);

              case 34:
                return i = e.sent, c = i.map(function(e) {
                    return new I(e);
                }), e.abrupt("return", c);

              case 39:
                throw e.prev = 39, e.t1 = e.catch(31), e.t1;

              case 42:
              case 43:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 39 ] ]);
    })), function(e) {
        return o.apply(this, arguments);
    }), x = (i = v(regeneratorRuntime.mark(function e() {
        var r, t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, k.select().from("product");

              case 3:
                return r = e.sent, t = r.map(function(e) {
                    return new I(e);
                }), e.abrupt("return", t);

              case 8:
                throw e.prev = 8, e.t0 = e.catch(0), e.t0;

              case 11:
              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })), function() {
        return i.apply(this, arguments);
    }), g = (c = v(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && r instanceof I) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, k.where({
                    id: r.id
                }).update({
                    name: r.name,
                    traffic: r.traffic,
                    period: r.period,
                    price: r.price
                }).into("product");

              case 6:
                e.next = 11;
                break;

              case 8:
                throw e.prev = 8, e.t0 = e.catch(3), e.t0;

              case 11:
              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 8 ] ]);
    })), function(e) {
        return c.apply(this, arguments);
    }), w = (p = v(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && y.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, k.delete().from("product").where("id", r);

              case 6:
                e.next = 14;
                break;

              case 8:
                if (e.prev = 8, e.t0 = e.catch(3), "ER_ROW_IS_REFERENCED_2" !== e.t0.code) {
                    e.next = 12;
                    break;
                }
                throw new Error("product is referenced");

              case 12:
                throw e.t0;

              case 14:
              case 15:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 8 ] ]);
    })), function(e) {
        return p.apply(this, arguments);
    });
    function v(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var y = t(1), b = t(4).production, k = t(3)(b), I = t(18);
    t(0)("product:dao");
    e.exports.addProduct = d, e.exports.getProductByName = f, e.exports.getProductById = l, 
    e.exports.getProductsByIds = m, e.exports.getAllProducts = x, e.exports.updateProduct = g, 
    e.exports.deleteProductById = w;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c = (n = m(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (t = r.name, n = r.traffic, a = r.period, s = r.price, t && "string" == typeof t) {
                    e.next = 6;
                    break;
                }
                throw new Error("illegal argument");

              case 6:
                if (n && Number.isInteger(n)) {
                    e.next = 9;
                    break;
                }
                throw new Error("illegal argument");

              case 9:
                if (a && "string" == typeof a && x.isIn(a, [ "monthly", "bimonthly", "quarterly", "semiannual", "annual" ])) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
                if (!isNaN(s) && Number.isInteger(s)) {
                    e.next = 15;
                    break;
                }
                throw new Error("illegal argument");

              case 15:
                return e.next = 18, w.getProductByName(t);

              case 18:
                if (!e.sent) {
                    e.next = 20;
                    break;
                }
                throw new Error("product already exists");

              case 20:
                return u = new g(r), e.next = 24, w.addProduct(u);

              case 24:
                return o = e.sent, e.abrupt("return", o);

              case 26:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return n.apply(this, arguments);
    }), p = (a = m(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && x.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, w.getProductById(r);

              case 5:
                if (t = e.sent) {
                    e.next = 8;
                    break;
                }
                throw new Error("id does not exist");

              case 8:
                return e.abrupt("return", t);

              case 9:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return a.apply(this, arguments);
    }), d = (s = m(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, x.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, w.getProductsByIds(r);

              case 33:
                return e.abrupt("return", e.sent);

              case 34:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return s.apply(this, arguments);
    }), f = (u = m(regeneratorRuntime.mark(function e() {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, w.getAllProducts();

              case 2:
                return e.abrupt("return", e.sent);

              case 3:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function() {
        return u.apply(this, arguments);
    }), l = (o = m(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (t = r.id, n = r.name, a = r.traffic, s = r.period, u = r.price, t && x.isUUID(t)) {
                    e.next = 6;
                    break;
                }
                throw new Error("illegal argument");

              case 6:
                if (n && "string" == typeof n) {
                    e.next = 9;
                    break;
                }
                throw new Error("illegal argument");

              case 9:
                if (a && Number.isInteger(a)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
                if (s && "string" == typeof s && x.isIn(s, [ "monthly", "bimonthly", "quarterly", "semiannual", "annual" ])) {
                    e.next = 15;
                    break;
                }
                throw new Error("illegal argument");

              case 15:
                if (!isNaN(u) && Number.isInteger(u)) {
                    e.next = 18;
                    break;
                }
                throw new Error("illegal argument");

              case 18:
                return e.next = 21, p(t);

              case 21:
                if (o = e.sent) {
                    e.next = 24;
                    break;
                }
                throw new Error("id does not exist");

              case 24:
                return e.next = 27, w.getProductByName(n);

              case 27:
                if (!e.sent) {
                    e.next = 29;
                    break;
                }
                throw new Error("product already exists");

              case 29:
                return o.name = n, o.traffic = a, o.period = s, o.price = u, e.next = 36, w.updateProduct(o);

              case 36:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return o.apply(this, arguments);
    }), h = (i = m(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && x.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, w.deleteProductById(r);

              case 5:
                return e.abrupt("return", e.sent);

              case 6:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return i.apply(this, arguments);
    });
    function m(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var x = t(1), g = t(18), w = t(37);
    t(0)("product:service");
    e.exports.addProduct = c, e.exports.getProductById = p, e.exports.getProductsByIds = d, 
    e.exports.getAllProducts = f, e.exports.updateProduct = l, e.exports.deleteProduct = h;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c, p, d = (n = v(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && r instanceof I) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, k.insert({
                    id: r.id,
                    ipAddressOrDomainName: r.ipAddressOrDomainName,
                    createdTime: r.createdTime
                }).into("server");

              case 6:
                return e.abrupt("return", r);

              case 9:
                throw e.prev = 9, e.t0 = e.catch(3), e.t0;

              case 12:
              case 13:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 9 ] ]);
    })), function(e) {
        return n.apply(this, arguments);
    }), f = (a = v(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && y.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, h("id", r);

              case 5:
                return t = e.sent, e.abrupt("return", t);

              case 7:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return a.apply(this, arguments);
    }), l = (s = v(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (y.isIP(r) || y.isFQDN(r)) {
                    e.next = 5;
                    break;
                }
                throw new Error("illegal argument");

              case 5:
                return e.next = 8, h("ipAddressOrDomainName", r);

              case 8:
                return t = e.sent, e.abrupt("return", t);

              case 10:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return s.apply(this, arguments);
    }), h = (u = v(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && t) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if ("id" === r || "ipAddressOrDomainName" === r) {
                    e.next = 5;
                    break;
                }
                throw new Error("illegal argument");

              case 5:
                return e.prev = 6, e.next = 9, k.select().from("server").where("" + r, t);

              case 9:
                if (0 !== (n = e.sent).length) {
                    e.next = 14;
                    break;
                }
                return e.abrupt("return", null);

              case 14:
                if (1 !== n.length) {
                    e.next = 19;
                    break;
                }
                return a = new I(n[0]), e.abrupt("return", a);

              case 19:
                throw new Error("retrieved multiple servers from one ipAddressOrDomainName");

              case 20:
                e.next = 26;
                break;

              case 23:
                throw e.prev = 23, e.t0 = e.catch(6), e.t0;

              case 26:
              case 27:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 23 ] ]);
    })), function(e, r) {
        return u.apply(this, arguments);
    }), m = (o = v(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i, c;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, y.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, k.select().from("server").whereIn("id", r);

              case 34:
                return i = e.sent, c = i.map(function(e) {
                    return new I(e);
                }), e.abrupt("return", c);

              case 39:
                throw e.prev = 39, e.t1 = e.catch(31), e.t1;

              case 42:
              case 43:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 39 ] ]);
    })), function(e) {
        return o.apply(this, arguments);
    }), x = (i = v(regeneratorRuntime.mark(function e() {
        var r, t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, k.select().from("server");

              case 3:
                return r = e.sent, t = r.map(function(e) {
                    return new I(e);
                }), e.abrupt("return", t);

              case 8:
                throw e.prev = 8, e.t0 = e.catch(0), e.t0;

              case 11:
              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })), function() {
        return i.apply(this, arguments);
    }), g = (c = v(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && y.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, k.delete().from("server").where("id", r);

              case 6:
                e.next = 14;
                break;

              case 8:
                if (e.prev = 8, e.t0 = e.catch(3), "ER_ROW_IS_REFERENCED_2" !== e.t0.code) {
                    e.next = 12;
                    break;
                }
                throw new Error("server is referenced");

              case 12:
                throw e.t0;

              case 14:
              case 15:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 8 ] ]);
    })), function(e) {
        return c.apply(this, arguments);
    }), w = (p = v(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && r instanceof I) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, k.where({
                    id: r.id
                }).update({
                    ipAddressOrDomainName: r.ipAddressOrDomainName
                }).into("server");

              case 6:
                e.next = 11;
                break;

              case 8:
                throw e.prev = 8, e.t0 = e.catch(3), e.t0;

              case 11:
              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 8 ] ]);
    })), function(e) {
        return p.apply(this, arguments);
    });
    function v(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var y = t(1), b = t(4).production, k = t(3)(b), I = t(22);
    t(0)("server:dao");
    e.exports.addServer = d, e.exports.getServerById = f, e.exports.getServerByIpAddressOrDomainName = l, 
    e.exports.getServersByIds = m, e.exports.getAllServers = x, e.exports.deleteServerById = g, 
    e.exports.updateServer = w;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c = (n = m(regeneratorRuntime.mark(function e(r) {
        var t, n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (t = r.ipAddressOrDomainName, x.isIP(t) || x.isFQDN(t)) {
                    e.next = 6;
                    break;
                }
                throw new Error("illegal argument");

              case 6:
                return e.next = 9, w.getServerByIpAddressOrDomainName(t);

              case 9:
                if (!e.sent) {
                    e.next = 11;
                    break;
                }
                throw new Error("server already exists");

              case 11:
                return n = new g(r), e.next = 15, w.addServer(n);

              case 15:
                return a = e.sent, e.abrupt("return", a);

              case 17:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return n.apply(this, arguments);
    }), p = (a = m(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && x.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, w.deleteServerById(r);

              case 5:
                return e.abrupt("return", e.sent);

              case 6:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return a.apply(this, arguments);
    }), d = (s = m(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && x.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, w.getServerById(r);

              case 5:
                if (t = e.sent) {
                    e.next = 8;
                    break;
                }
                throw new Error("id does not exist");

              case 8:
                return e.abrupt("return", t);

              case 9:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return s.apply(this, arguments);
    }), f = (u = m(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, x.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, w.getServersByIds(r);

              case 33:
                return e.abrupt("return", e.sent);

              case 34:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return u.apply(this, arguments);
    }), l = (o = m(regeneratorRuntime.mark(function e() {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, w.getAllServers();

              case 2:
                return e.abrupt("return", e.sent);

              case 3:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function() {
        return o.apply(this, arguments);
    }), h = (i = m(regeneratorRuntime.mark(function e(r) {
        var t, n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (t = r.id, n = r.ipAddressOrDomainName, t && x.isUUID(t)) {
                    e.next = 6;
                    break;
                }
                throw new Error("illegal argument");

              case 6:
                if (x.isIP(n) || x.isFQDN(n)) {
                    e.next = 9;
                    break;
                }
                throw new Error("illegal argument");

              case 9:
                return e.next = 12, d(t);

              case 12:
                if (a = e.sent) {
                    e.next = 15;
                    break;
                }
                throw new Error("id does not exist");

              case 15:
                return e.next = 18, w.getServerByIpAddressOrDomainName(n);

              case 18:
                if (!e.sent) {
                    e.next = 20;
                    break;
                }
                throw new Error("server already exists");

              case 20:
                return a.ipAddressOrDomainName = n, e.next = 24, w.updateServer(a);

              case 24:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return i.apply(this, arguments);
    });
    function m(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var x = t(1), g = t(22), w = t(39);
    t(0)("server:service");
    e.exports.addServer = c, e.exports.deleteServer = p, e.exports.getServerById = d, 
    e.exports.getServersByIds = f, e.exports.getAllServers = l, e.exports.updateServer = h;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c, p, d, f, l = (n = I(regeneratorRuntime.mark(function e(r) {
        var t, n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return delete (t = new E(r)).username, delete t.hashedPassword, delete t.resetPasswordToken, 
                delete t.tokenCreatedTime, delete t.lastLoginTime, delete (n = new E(r)).role, delete n.email, 
                delete n.telegram, delete n.createdTime, e.prev = 14, e.next = 17, U.transaction(function() {
                    var e = I(regeneratorRuntime.mark(function e(r) {
                        return regeneratorRuntime.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return e.next = 2, r.insert(t).into("user");

                              case 2:
                                return e.next = 4, r.insert(n).into("email_user");

                              case 4:
                              case "end":
                                return e.stop();
                            }
                        }, e, this);
                    }));
                    return function(r) {
                        return e.apply(this, arguments);
                    };
                }());

              case 17:
                e.next = 22;
                break;

              case 19:
                throw e.prev = 19, e.t0 = e.catch(14), e.t0;

              case 22:
                return e.abrupt("return", r);

              case 24:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 14, 19 ] ]);
    })), function(e) {
        return n.apply(this, arguments);
    }), h = (a = I(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, x("id", r);

              case 5:
                return t = e.sent, e.abrupt("return", t);

              case 7:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return a.apply(this, arguments);
    }), m = (s = I(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, x("username", r);

              case 5:
                return t = e.sent, e.abrupt("return", t);

              case 7:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return s.apply(this, arguments);
    }), x = (u = I(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && t) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if ("id" === r || "username" === r) {
                    e.next = 5;
                    break;
                }
                throw new Error("illegal argument");

              case 5:
                return e.prev = 6, e.next = 9, U.select("email_user.id as id", "email_user.type as type", "user.role as role", "user.email as email", "user.telegram as telegram", "user.createdTime as createdTime", "email_user.username as username", "email_user.hashedPassword as hashedPassword", "email_user.resetPasswordToken as resetPasswordToken", "email_user.tokenCreatedTime  as tokenCreatedTime", "email_user.lastLoginTime as lastLoginTime").from("email_user").innerJoin("user", "email_user.id", "user.id").where("email_user." + r, t);

              case 9:
                if (0 !== (n = e.sent).length) {
                    e.next = 14;
                    break;
                }
                return e.abrupt("return", null);

              case 14:
                if (1 !== n.length) {
                    e.next = 19;
                    break;
                }
                return a = new E(n[0]), e.abrupt("return", a);

              case 19:
                throw new Error("retrieved multiple results from one " + r);

              case 20:
                e.next = 26;
                break;

              case 23:
                throw e.prev = 23, e.t0 = e.catch(6), e.t0;

              case 26:
              case 27:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 23 ] ]);
    })), function(e, r) {
        return u.apply(this, arguments);
    }), g = (o = I(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i, c;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, R.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, U.select("email_user.id as id", "email_user.type as type", "user.role as role", "user.email as email", "user.telegram as telegram", "user.createdTime as createdTime", "email_user.username as username", "email_user.hashedPassword as hashedPassword", "email_user.resetPasswordToken as resetPasswordToken", "email_user.tokenCreatedTime  as tokenCreatedTime", "email_user.lastLoginTime as lastLoginTime").from("email_user").innerJoin("user", "email_user.id", "user.id").whereIn("email_user.id", r);

              case 34:
                return i = e.sent, c = i.map(function(e) {
                    return new E(e);
                }), e.abrupt("return", c);

              case 39:
                throw e.prev = 39, e.t1 = e.catch(31), e.t1;

              case 42:
              case 43:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 39 ] ]);
    })), function(e) {
        return o.apply(this, arguments);
    }), w = (i = I(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && t) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, U.update({
                    lastLoginTime: t
                }).from("email_user").where({
                    id: r.id,
                    type: r.type,
                    username: r.username,
                    hashedPassword: r.hashedPassword,
                    resetPasswordToken: r.resetPasswordToken,
                    tokenCreatedTime: r.tokenCreatedTime
                });

              case 6:
                if (1 == (n = e.sent)) {
                    e.next = 9;
                    break;
                }
                throw new Error("update lastLoginTime error");

              case 9:
                return e.abrupt("return", n);

              case 12:
                throw e.prev = 12, e.t0 = e.catch(3), e.t0;

              case 15:
              case 16:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 12 ] ]);
    })), function(e, r) {
        return i.apply(this, arguments);
    }), v = (c = I(regeneratorRuntime.mark(function e(r, t, n) {
        var a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && t && n) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, U.update({
                    resetPasswordToken: t,
                    tokenCreatedTime: n
                }).from("email_user").where({
                    id: r.id,
                    type: r.type,
                    username: r.username,
                    hashedPassword: r.hashedPassword,
                    lastLoginTime: r.lastLoginTime
                });

              case 6:
                if (1 === (a = e.sent)) {
                    e.next = 9;
                    break;
                }
                throw new Error("update resetPasswordToken error");

              case 9:
                return e.abrupt("return", a);

              case 12:
                throw e.prev = 12, e.t0 = e.catch(3), e.t0;

              case 15:
              case 16:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 12 ] ]);
    })), function(e, r, t) {
        return c.apply(this, arguments);
    }), y = (p = I(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, U.update({
                    hashedPassword: r.hashedPassword,
                    resetPasswordToken: r.resetPasswordToken,
                    tokenCreatedTime: r.tokenCreatedTime
                }).from("email_user").where({
                    id: r.id,
                    type: r.type,
                    username: r.username,
                    lastLoginTime: r.lastLoginTime
                });

              case 6:
                if (1 === (t = e.sent)) {
                    e.next = 9;
                    break;
                }
                throw new Error("update password error");

              case 9:
                return e.abrupt("return", t);

              case 12:
                throw e.prev = 12, e.t0 = e.catch(3), e.t0;

              case 15:
              case 16:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 12 ] ]);
    })), function(e) {
        return p.apply(this, arguments);
    }), b = (d = I(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, U.transaction(function() {
                    var e = I(regeneratorRuntime.mark(function e(t) {
                        return regeneratorRuntime.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return e.next = 2, t.delete().from("email_user").where("id", r);

                              case 2:
                                return e.next = 4, t.delete().from("user").where("id", r);

                              case 4:
                              case "end":
                                return e.stop();
                            }
                        }, e, this);
                    }));
                    return function(r) {
                        return e.apply(this, arguments);
                    };
                }());

              case 6:
                e.next = 14;
                break;

              case 8:
                if (e.prev = 8, e.t0 = e.catch(3), "ER_ROW_IS_REFERENCED_2" !== e.t0.code) {
                    e.next = 12;
                    break;
                }
                throw new Error("emailUser is referenced");

              case 12:
                throw e.t0;

              case 14:
              case 15:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 8 ] ]);
    })), function(e) {
        return d.apply(this, arguments);
    }), k = (f = I(regeneratorRuntime.mark(function e(r) {
        var t, n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && r instanceof E) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return delete (t = new E(r)).username, delete t.hashedPassword, delete t.resetPasswordToken, 
                delete t.tokenCreatedTime, delete t.lastLoginTime, delete (n = new E(r)).role, delete n.email, 
                delete n.telegram, delete n.createdTime, e.prev = 14, e.next = 17, U.transaction(function() {
                    var e = I(regeneratorRuntime.mark(function e(r) {
                        return regeneratorRuntime.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return e.next = 2, r.delete().from("email_user").where("id", n.id);

                              case 2:
                                return e.next = 4, r.where({
                                    id: t.id
                                }).update({
                                    role: t.role,
                                    email: t.email,
                                    telegram: t.telegram
                                }).into("user");

                              case 4:
                                return e.next = 6, r.insert(n).into("email_user");

                              case 6:
                              case "end":
                                return e.stop();
                            }
                        }, e, this);
                    }));
                    return function(r) {
                        return e.apply(this, arguments);
                    };
                }());

              case 17:
                e.next = 22;
                break;

              case 19:
                throw e.prev = 19, e.t0 = e.catch(14), e.t0;

              case 22:
              case 23:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 14, 19 ] ]);
    })), function(e) {
        return f.apply(this, arguments);
    });
    function I(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var R = t(1), E = t(11), A = t(4).production, U = t(3)(A);
    t(0)("emailUser:dao");
    e.exports.addEmailUser = l, e.exports.getEmailUserById = h, e.exports.getEmailUserByUsername = m, 
    e.exports.getEmailUsersByIds = g, e.exports.updateLastLoginTime = w, e.exports.updateResetPasswordToken = v, 
    e.exports.updatePassword = y, e.exports.deleteEmailUserById = b, e.exports.updateEmailUser = k;
}, function(e, r, t) {
    "use strict";
    var n = t(6), a = t(1);
    t(0)("user:model");
    e.exports = function e(r) {
        if (function(e, r) {
            if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
        }(this, e), !r) throw new Error("illegal argument");
        if (r.id && ("string" != typeof r.id || !a.isUUID(r.id))) throw new Error("illegal argument");
        if (r.type && ("string" != typeof r.type || !a.isIn(r.type, [ "User", "EmailUser" ]))) throw new Error("illegal argument");
        if (!r.role || "string" != typeof r.role || !a.isIn(r.role, [ "admin", "user" ])) throw new Error("illegal argument");
        if (r.email && ("string" != typeof r.email || !a.isEmail(r.email))) throw new Error("illegal argument");
        if (r.telegram && "string" != typeof r.telegram) throw new Error("illegal argument");
        if (r.createdTime && r.createdTime > Date.now()) throw new Error("illegal argument");
        var t = new Date().getTime();
        this.id = r.id || n.v4(), this.type = r.type || "User", this.role = r.role, this.email = r.email || null, 
        this.telegram = r.telegram || null, this.createdTime = r.createdTime || t;
    };
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c = (n = m(regeneratorRuntime.mark(function e(r) {
        var t, n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, w.select().from("user").where("id", r);

              case 6:
                if (0 !== (t = e.sent).length) {
                    e.next = 11;
                    break;
                }
                return e.abrupt("return", null);

              case 11:
                if (1 !== t.length) {
                    e.next = 25;
                    break;
                }
                if ("EmailUser" !== t[0].type) {
                    e.next = 21;
                    break;
                }
                return e.next = 16, y.getEmailUserById(r);

              case 16:
                return n = e.sent, a = new v(n), e.abrupt("return", a);

              case 21:
                throw new Error("type error");

              case 22:
                e.next = 26;
                break;

              case 25:
                throw new Error("retrieved multiple users from one ip");

              case 26:
                e.next = 32;
                break;

              case 29:
                throw e.prev = 29, e.t0 = e.catch(3), e.t0;

              case 32:
              case 33:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 29 ] ]);
    })), function(e) {
        return n.apply(this, arguments);
    }), p = (a = m(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i, c;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, x.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, y.getEmailUsersByIds(r);

              case 33:
                return i = e.sent, c = i, e.abrupt("return", c);

              case 36:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return a.apply(this, arguments);
    }), d = (s = m(regeneratorRuntime.mark(function e() {
        var r, t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, f();

              case 2:
                return r = e.sent, e.next = 5, p(r);

              case 5:
                return t = e.sent, e.abrupt("return", t);

              case 7:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function() {
        return s.apply(this, arguments);
    }), f = (u = m(regeneratorRuntime.mark(function e() {
        var r, t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, w.select("id").from("user");

              case 3:
                return r = e.sent, t = Array.from(new Set(r.map(function(e) {
                    return e.id;
                }))), e.abrupt("return", t);

              case 8:
                throw e.prev = 8, e.t0 = e.catch(0), e.t0;

              case 11:
              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })), function() {
        return u.apply(this, arguments);
    }), l = (o = m(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && x.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (!isNaN(t) && Number.isInteger(t)) {
                    e.next = 5;
                    break;
                }
                throw new Error("illegal argument");

              case 5:
                return e.prev = 6, e.next = 9, w.update({
                    lastLogoutTime: t
                }).from("user").where({
                    id: r
                });

              case 9:
                if (1 === (n = e.sent)) {
                    e.next = 12;
                    break;
                }
                throw new Error("update lastLogoutTime error");

              case 12:
                return e.abrupt("return", n);

              case 15:
                throw e.prev = 15, e.t0 = e.catch(6), e.t0;

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 15 ] ]);
    })), function(e, r) {
        return o.apply(this, arguments);
    }), h = (i = m(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && x.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, w.select().from("user").where("id", r);

              case 6:
                if (0 !== (t = e.sent).length) {
                    e.next = 11;
                    break;
                }
                throw new Error("id does not exist");

              case 11:
                if (1 !== t.length) {
                    e.next = 15;
                    break;
                }
                return e.abrupt("return", t[0].lastLogoutTime);

              case 15:
                throw new Error("retrieved multiple users from one ip");

              case 16:
                e.next = 22;
                break;

              case 19:
                throw e.prev = 19, e.t0 = e.catch(3), e.t0;

              case 22:
              case 23:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 19 ] ]);
    })), function(e) {
        return i.apply(this, arguments);
    });
    function m(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var x = t(1), g = t(4).production, w = t(3)(g), v = t(11), y = t(41);
    t(0)("user:dao");
    e.exports.getUserById = c, e.exports.getUsersByIds = p, e.exports.getAllUsers = d, 
    e.exports.refreshLastLogoutTimeById = l, e.exports.getUserLastLogoutTimeById = h;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c, p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e;
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, d = (n = w(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, b.getUserById(r.query.id);

              case 8:
                return a = e.sent, e.abrupt("return", t.status(200).send(a));

              case 12:
                if (e.prev = 12, e.t0 = e.catch(5), "id does not exist" !== e.t0.message) {
                    e.next = 16;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 16:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 12 ] ]);
    })), function(e, r) {
        return n.apply(this, arguments);
    }), f = (a = w(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, i, c;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r.query.ids)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "array expected"
                }));

              case 2:
                n = !0, a = !1, s = void 0, e.prev = 6, u = r.query.ids[Symbol.iterator]();

              case 8:
                if (n = (o = u.next()).done) {
                    e.next = 16;
                    break;
                }
                if (i = o.value, v.isUUID(i)) {
                    e.next = 12;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "uuid expected"
                }));

              case 12:
              case 13:
                n = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), a = !0, s = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !n && u.return && u.return();

              case 25:
                if (e.prev = 25, !a) {
                    e.next = 28;
                    break;
                }
                throw s;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, b.getUsersByIds(r.query.ids);

              case 34:
                return c = e.sent, e.abrupt("return", t.status(200).send(c));

              case 38:
                return e.prev = 38, e.t1 = e.catch(31), e.abrupt("return", t.status(500).send({
                    error: e.t1
                }));

              case 41:
              case 42:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 38 ] ]);
    })), function(e, r) {
        return a.apply(this, arguments);
    }), l = (s = w(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, b.getAllUsers();

              case 3:
                return n = e.sent, a = n.filter(function(e) {
                    return "user" === e.role;
                }), e.abrupt("return", t.status(200).send(a));

              case 8:
                return e.prev = 8, e.t0 = e.catch(0), e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 11:
              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })), function(e, r) {
        return s.apply(this, arguments);
    }), h = (u = w(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, b.getAllUsers();

              case 3:
                return n = e.sent, a = n.filter(function(e) {
                    return "admin" === e.role;
                }), e.abrupt("return", t.status(200).send(a));

              case 8:
                return e.prev = 8, e.t0 = e.catch(0), e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 11:
              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })), function(e, r) {
        return u.apply(this, arguments);
    }), m = (o = w(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, i, c, p;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.headers && r.headers.authorization && "Bearer " === r.headers.authorization.substring(0, 7) && "" !== r.headers.authorization.substring(7)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", t.status(401).end());

              case 2:
                n = r.headers.authorization.substring(7), a = void 0, e.prev = 4, a = y.verify(n, global.REFRESH_JWT_SECRET), 
                e.next = 11;
                break;

              case 8:
                return e.prev = 8, e.t0 = e.catch(4), e.abrupt("return", t.status(401).end());

              case 11:
                return s = a.id, u = 1e3 * a.iat, e.next = 16, x(s, u);

              case 16:
                if (!e.sent) {
                    e.next = 18;
                    break;
                }
                return e.abrupt("return", t.status(401).end());

              case 18:
                return e.prev = 19, o = {
                    id: a.id,
                    role: a.role
                }, i = k(o), c = i.token, p = i.refreshToken, e.abrupt("return", t.status(200).send({
                    token: c,
                    refreshToken: p
                }));

              case 25:
                return e.prev = 25, e.t1 = e.catch(19), e.abrupt("return", t.status(500).send({
                    error: e.t1
                }));

              case 28:
              case 29:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 4, 8 ], [ 19, 25 ] ]);
    })), function(e, r) {
        return o.apply(this, arguments);
    }), x = (i = w(regeneratorRuntime.mark(function e(r, t) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && v.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (!isNaN(t) && Number.isInteger(t)) {
                    e.next = 5;
                    break;
                }
                throw new Error("illegal argument");

              case 5:
                return e.next = 8, b.hasUserLoggedOutSince(r, t);

              case 8:
                return e.abrupt("return", e.sent);

              case 9:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e, r) {
        return i.apply(this, arguments);
    }), g = (c = w(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.headers && r.headers.authorization && "Bearer " === r.headers.authorization.substring(0, 7) && "" !== r.headers.authorization.substring(7)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", t.status(401).end());

              case 2:
                n = r.headers.authorization.substring(7), a = void 0, e.prev = 4, a = y.verify(n, global.REFRESH_JWT_SECRET), 
                e.next = 11;
                break;

              case 8:
                return e.prev = 8, e.t0 = e.catch(4), e.abrupt("return", t.status(401).end());

              case 11:
                return s = a.id, u = 1e3 * a.iat, e.next = 16, x(s, u);

              case 16:
                if (!e.sent) {
                    e.next = 18;
                    break;
                }
                return e.abrupt("return", t.status(401).end());

              case 18:
                return e.prev = 19, e.next = 22, b.invalidateRefreshToken(s);

              case 22:
                return e.abrupt("return", t.status(201).end());

              case 25:
                return e.prev = 25, e.t1 = e.catch(19), e.abrupt("return", t.status(500).send({
                    error: e.t1
                }));

              case 28:
              case 29:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 4, 8 ], [ 19, 25 ] ]);
    })), function(e, r) {
        return c.apply(this, arguments);
    });
    function w(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var v = t(1), y = t(81), b = t(23);
    t(0)("user:controller");
    function k(e) {
        if ("object" !== (void 0 === e ? "undefined" : p(e)) || !e.hasOwnProperty("id") || !e.hasOwnProperty("role")) throw new Error("illegal argument");
        return {
            token: y.sign(e, global.JWT_SECRET, {
                expiresIn: 900
            }),
            refreshToken: y.sign(e, global.REFRESH_JWT_SECRET, {
                expiresIn: 604800
            })
        };
    }
    e.exports.getUserById = d, e.exports.getUsersByIds = f, e.exports.getAllUsers = l, 
    e.exports.getAllAdmins = h, e.exports.refreshToken = m, e.exports.signTokens = k, 
    e.exports.invalidateRefreshToken = g;
}, function(e, r) {
    e.exports = require("bcryptjs");
}, function(e, r) {
    e.exports = require("passport");
}, function(e, r) {
    e.exports = require("fs");
}, function(e, r) {
    e.exports = require("dotenv");
}, function(e, r, t) {
    "use strict";
    r.manifest = {
        short_name: "sshub",
        name: "Shadowsocks-hub",
        icons: [ {
            src: "/favicon.png",
            type: "image/png",
            sizes: "48x48"
        }, {
            src: "/favicon.png",
            type: "image/png",
            sizes: "128x128"
        }, {
            src: "/favicon.png",
            type: "image/png",
            sizes: "144x144"
        }, {
            src: "/favicon.png",
            type: "image/png",
            sizes: "256x256"
        } ],
        start_url: "/",
        display: "standalone",
        background_color: "#2196F3",
        theme_color: "#2196F3"
    };
}, function(e, r) {
    e.exports = require("node-schedule");
}, function(e, r, t) {
    "use strict";
    var n, a, s, u = (n = c(regeneratorRuntime.mark(function e() {
        var r;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, h.getAllAccounts();

              case 2:
                return r = e.sent, e.next = 5, o(r);

              case 5:
                return e.next = 7, i(r);

              case 7:
                return e.next = 9, h.monitorAllAccounts(r);

              case 9:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function() {
        return n.apply(this, arguments);
    }), o = (a = c(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i, c, p, d, h, m, g = this;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (u.value instanceof f) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                o = Array.from(new Set(r.map(function(e) {
                    return e.node;
                }))), i = !0, c = !1, p = void 0, e.prev = 35, d = regeneratorRuntime.mark(function e() {
                    var t, n, a, s, u, o, i, c, p, d;
                    return regeneratorRuntime.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return t = m.value, n = r.filter(function(e) {
                                return e.node.id === t.id;
                            }), a = {
                                host: t.server.ipAddressOrDomainName,
                                port: t.port,
                                password: t.password
                            }, e.prev = 3, e.next = 6, x.getMeterReadings(t.protocol, a);

                          case 6:
                            s = e.sent, u = !0, o = !1, i = void 0, e.prev = 10, c = regeneratorRuntime.mark(function e() {
                                var r, t, n;
                                return regeneratorRuntime.wrap(function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                      case 0:
                                        if (r = d.value, t = s.filter(function(e) {
                                            return e.port === r.port;
                                        }), n = 0, 1 !== t.length) {
                                            e.next = 7;
                                            break;
                                        }
                                        n = t[0].traffic, e.next = 9;
                                        break;

                                      case 7:
                                        if (!(t.length > 1)) {
                                            e.next = 9;
                                            break;
                                        }
                                        throw new Error("updateUsageForAllAccounts, should not come here");

                                      case 9:
                                        return e.next = 12, l.updateTraffic({
                                            accountId: r.id,
                                            meterReading: n
                                        });

                                      case 12:
                                      case "end":
                                        return e.stop();
                                    }
                                }, e, g);
                            }), p = n[Symbol.iterator]();

                          case 13:
                            if (u = (d = p.next()).done) {
                                e.next = 18;
                                break;
                            }
                            return e.delegateYield(c(), "t0", 15);

                          case 15:
                            u = !0, e.next = 13;
                            break;

                          case 18:
                            e.next = 24;
                            break;

                          case 20:
                            e.prev = 20, e.t1 = e.catch(10), o = !0, i = e.t1;

                          case 24:
                            e.prev = 24, e.prev = 25, !u && p.return && p.return();

                          case 27:
                            if (e.prev = 27, !o) {
                                e.next = 30;
                                break;
                            }
                            throw i;

                          case 30:
                            return e.finish(27);

                          case 31:
                            return e.finish(24);

                          case 32:
                            e.next = 38;
                            break;

                          case 35:
                            e.prev = 35, e.t2 = e.catch(3), console.error(t.name, e.t2.message);

                          case 38:
                          case 39:
                          case "end":
                            return e.stop();
                        }
                    }, e, g, [ [ 3, 35 ], [ 10, 20, 24, 32 ], [ 25, , 27, 31 ] ]);
                }), h = o[Symbol.iterator]();

              case 38:
                if (i = (m = h.next()).done) {
                    e.next = 43;
                    break;
                }
                return e.delegateYield(d(), "t1", 40);

              case 40:
                i = !0, e.next = 38;
                break;

              case 43:
                e.next = 49;
                break;

              case 45:
                e.prev = 45, e.t2 = e.catch(35), c = !0, p = e.t2;

              case 49:
                e.prev = 49, e.prev = 50, !i && h.return && h.return();

              case 52:
                if (e.prev = 52, !c) {
                    e.next = 55;
                    break;
                }
                throw p;

              case 55:
                return e.finish(52);

              case 56:
                return e.finish(49);

              case 57:
              case 58:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 35, 45, 49, 57 ], [ 50, , 52, 56 ] ]);
    })), function(e) {
        return a.apply(this, arguments);
    }), i = (s = c(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i, c, p, d, m, x, w, v = this;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (u.value instanceof f) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, l.getLatestUsageForAllAccounts();

              case 33:
                o = e.sent, i = Array.from(new Set(r.map(function(e) {
                    return e.purchase;
                }))), c = !0, p = !1, d = void 0, e.prev = 38, m = regeneratorRuntime.mark(function e() {
                    var t, n, a, s, u, i, c, p, d, f, m, x, y, b, k, I;
                    return regeneratorRuntime.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            for (t = w.value, n = r.filter(function(e) {
                                return e.purchase.id === t.id;
                            }), a = 0, s = !0, u = !1, i = void 0, e.prev = 6, c = function() {
                                var e = d.value, r = o.filter(function(r) {
                                    return r.accountId === e.id;
                                });
                                if (1 === r.length) a += r[0]; else if (r.length > 1) throw new Error("should not come here");
                            }, p = n[Symbol.iterator](); !(s = (d = p.next()).done); s = !0) c();
                            e.next = 15;
                            break;

                          case 11:
                            e.prev = 11, e.t0 = e.catch(6), u = !0, i = e.t0;

                          case 15:
                            e.prev = 15, e.prev = 16, !s && p.return && p.return();

                          case 18:
                            if (e.prev = 18, !u) {
                                e.next = 21;
                                break;
                            }
                            throw i;

                          case 21:
                            return e.finish(18);

                          case 22:
                            return e.finish(15);

                          case 23:
                            if (!(g(t.createdTime, t.product.period) || a > t.product.traffic)) {
                                e.next = 52;
                                break;
                            }
                            for (f = !0, m = !1, x = void 0, e.prev = 28, y = n[Symbol.iterator](); !(f = (b = y.next()).done); f = !0) k = b.value, 
                            {
                                port: k.port
                            }, {
                                host: k.node.server.ipAddressOrDomainName,
                                port: k.node.port,
                                password: k.node.password
                            };
                            e.next = 36;
                            break;

                          case 32:
                            e.prev = 32, e.t1 = e.catch(28), m = !0, x = e.t1;

                          case 36:
                            e.prev = 36, e.prev = 37, !f && y.return && y.return();

                          case 39:
                            if (e.prev = 39, !m) {
                                e.next = 42;
                                break;
                            }
                            throw x;

                          case 42:
                            return e.finish(39);

                          case 43:
                            return e.finish(36);

                          case 44:
                            return I = n.map(function(e) {
                                return e.id;
                            }), e.next = 48, l.deleteTrafficByAccountIds(I);

                          case 48:
                            return e.next = 50, h.deleteAccountsByIds(I);

                          case 50:
                            e.next = 52;
                            break;

                          case 52:
                          case 53:
                          case "end":
                            return e.stop();
                        }
                    }, e, v, [ [ 6, 11, 15, 23 ], [ 16, , 18, 22 ], [ 28, 32, 36, 44 ], [ 37, , 39, 43 ] ]);
                }), x = i[Symbol.iterator]();

              case 41:
                if (c = (w = x.next()).done) {
                    e.next = 46;
                    break;
                }
                return e.delegateYield(m(), "t1", 43);

              case 43:
                c = !0, e.next = 41;
                break;

              case 46:
                e.next = 52;
                break;

              case 48:
                e.prev = 48, e.t2 = e.catch(38), p = !0, d = e.t2;

              case 52:
                e.prev = 52, e.prev = 53, !c && x.return && x.return();

              case 55:
                if (e.prev = 55, !p) {
                    e.next = 58;
                    break;
                }
                throw d;

              case 58:
                return e.finish(55);

              case 59:
                return e.finish(52);

              case 60:
              case 61:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 38, 48, 52, 60 ], [ 53, , 55, 59 ] ]);
    })), function(e) {
        return s.apply(this, arguments);
    });
    function c(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var p = t(50), d = t(1), f = t(7), l = t(26), h = t(8), m = t(17), x = t(19);
    t(0)("monitor:service");
    function g(e, r) {
        if (!(e && Number.isInteger(e) && r && "string" == typeof r && d.isIn(r, [ "monthly", "bimonthly", "quarterly", "semiannual", "annual" ]))) throw new Error("illegal argument");
        var t = new Date(e), n = t.getMonth(), a = void 0;
        switch (r) {
          case "monthly":
            a = 1;
            break;

          case "bimonthly":
            a = 2;
            break;

          case "quarterly":
            a = 3;
            break;

          case "semiannual":
            a = 6;
            break;

          case "annual":
            a = 12;
            break;

          default:
            throw new Error("unknown period");
        }
        t.setMonth(n + a);
        var s = t.getTime();
        return Date.now() > s;
    }
    u(), p.scheduleJob("* * * * *", c(regeneratorRuntime.mark(function e() {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, u();

              case 2:
              case "end":
                return e.stop();
            }
        }, e, this);
    }))), p.scheduleJob("* * * * *", c(regeneratorRuntime.mark(function e() {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, m.checkRecentlyIncompletePaypalPayment();

              case 2:
              case "end":
                return e.stop();
            }
        }, e, this);
    })));
}, function(e, r, t) {
    "use strict";
    var n = t(2)();
    e.exports = n, t(51);
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c, p, d, f, l, h, m = (n = U(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r instanceof D) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, T.insert(r).into("traffic");

              case 6:
                return e.abrupt("return", r);

              case 9:
                throw e.prev = 9, e.t0 = e.catch(3), e.t0;

              case 12:
              case 13:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 9 ] ]);
    })), function(e) {
        return n.apply(this, arguments);
    }), x = (a = U(regeneratorRuntime.mark(function e(r, t, n, a) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (P.isUUID(r) && Number.isInteger(t) && Number.isInteger(n) && Number.isInteger(a) && !(a > Date.now())) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, T.update({
                    usage: t,
                    lastMeterReading: n,
                    createdTime: a
                }).into("traffic").where("id", r);

              case 6:
                e.next = 11;
                break;

              case 8:
                throw e.prev = 8, e.t0 = e.catch(3), e.t0;

              case 11:
              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 8 ] ]);
    })), function(e, r, t, n) {
        return a.apply(this, arguments);
    }), g = (s = U(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (P.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, T.select().from("traffic").where("accountId", r).orderBy("createdTime", "desc").limit(1);

              case 6:
                if (0 !== (t = e.sent).length) {
                    e.next = 11;
                    break;
                }
                return e.abrupt("return", null);

              case 11:
                return e.abrupt("return", new D(t[0]));

              case 12:
                e.next = 18;
                break;

              case 15:
                throw e.prev = 15, e.t0 = e.catch(3), e.t0;

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 15 ] ]);
    })), function(e) {
        return s.apply(this, arguments);
    }), w = (u = U(regeneratorRuntime.mark(function e(r) {
        var t, n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && P.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, T.select().from("traffic").where("id", r);

              case 6:
                if (0 !== (t = e.sent).length) {
                    e.next = 11;
                    break;
                }
                return e.abrupt("return", null);

              case 11:
                if (1 !== t.length) {
                    e.next = 20;
                    break;
                }
                return n = t[0].accountId, e.next = 15, S.getAccountById(n);

              case 15:
                return e.sent, a = new D(t[0]), e.abrupt("return", a);

              case 20:
                throw new Error("retrieved multiple traffics from one id");

              case 21:
                e.next = 27;
                break;

              case 24:
                throw e.prev = 24, e.t0 = e.catch(3), e.t0;

              case 27:
              case 28:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 24 ] ]);
    })), function(e) {
        return u.apply(this, arguments);
    }), v = (o = U(regeneratorRuntime.mark(function e(r) {
        var t, n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && "string" == typeof r && P.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, T.select("usage").from("traffic").where("accountId", r).orderBy("createdTime", "desc").limit(1);

              case 6:
                if (0 !== (t = e.sent).length) {
                    e.next = 11;
                    break;
                }
                return e.abrupt("return", 0);

              case 11:
                return n = t[0].usage, e.abrupt("return", n);

              case 13:
                e.next = 19;
                break;

              case 16:
                throw e.prev = 16, e.t0 = e.catch(3), e.t0;

              case 19:
              case 20:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 16 ] ]);
    })), function(e) {
        return o.apply(this, arguments);
    }), y = (i = U(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && "string" == typeof r && P.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, T.from("traffic").where("accountId", r).orderBy("createdTime");

              case 6:
                return t = e.sent, e.abrupt("return", t.map(function(e) {
                    return new D(e);
                }));

              case 10:
                throw e.prev = 10, e.t0 = e.catch(3), e.t0;

              case 13:
              case 14:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 10 ] ]);
    })), function(e) {
        return i.apply(this, arguments);
    }), b = (c = U(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o, i;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, P.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, T.from("traffic").whereIn("accountId", r).orderBy("createdTime");

              case 34:
                return i = e.sent, e.abrupt("return", i.map(function(e) {
                    return new D(e);
                }));

              case 38:
                throw e.prev = 38, e.t1 = e.catch(31), e.t1;

              case 41:
              case 42:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 38 ] ]);
    })), function(e) {
        return c.apply(this, arguments);
    }), k = (p = U(regeneratorRuntime.mark(function e() {
        var r;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, T.from("traffic").orderBy("createdTime");

              case 3:
                return r = e.sent, e.abrupt("return", r.map(function(e) {
                    return new D(e);
                }));

              case 7:
                throw e.prev = 7, e.t0 = e.catch(0), e.t0;

              case 10:
              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 7 ] ]);
    })), function() {
        return p.apply(this, arguments);
    }), I = (d = U(regeneratorRuntime.mark(function e() {
        var r, t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, r = T.select(T.raw("`accountId`, `usage`, `createdTime`,                  @order := IF(@current_accountId = accountId, @order + 1, 1) AS `order`,                  @current_accountId := accountId")).from("traffic").orderBy("accountId").orderBy("createdTime", "desc").as("ordered"), 
                e.next = 4, T.raw("set @current_accountId = null, @order = 0");

              case 4:
                return e.next = 6, T.select("accountId", "usage").from(r).where("order", 1);

              case 6:
                return t = e.sent, e.abrupt("return", t);

              case 10:
                throw e.prev = 10, e.t0 = e.catch(0), e.t0;

              case 13:
              case 14:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 10 ] ]);
    })), function() {
        return d.apply(this, arguments);
    }), R = (f = U(regeneratorRuntime.mark(function e(r) {
        var t, n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && "string" == typeof r && P.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.prev = 3, e.next = 6, T.select("usage").from("traffic").innerJoin("account", "traffic.accountId", "account.id").where("account.purchaseId", r).orderBy("traffic.createdTime", "desc").limit(1);

              case 6:
                if (0 !== (t = e.sent).length) {
                    e.next = 11;
                    break;
                }
                return e.abrupt("return", 0);

              case 11:
                return n = t[0].usage, e.abrupt("return", n);

              case 13:
                e.next = 19;
                break;

              case 16:
                throw e.prev = 16, e.t0 = e.catch(3), e.t0;

              case 19:
              case 20:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 16 ] ]);
    })), function(e) {
        return f.apply(this, arguments);
    }), E = (l = U(regeneratorRuntime.mark(function e() {
        var r, t, n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, r = T.select("traffic.usage AS usage", "traffic.createdTime AS createdTime", "account.purchaseId AS purchaseId").from("traffic").innerJoin("account", "traffic.accountId", "account.id").orderBy("account.purchaseId").orderBy("traffic.createdTime", "DESC").as("joined"), 
                t = T.select(T.raw("`usage`, `createdTime`, `purchaseId`,                 @order := IF(@current_purchaseId = purchaseId, @order + 1, 1) AS `order`,                 @current_purchaseId := purchaseId")).from(r).as("ordered"), 
                e.next = 5, T.raw("set @current_purchaseId = null, @order = 0");

              case 5:
                return e.next = 7, T.select("purchaseId", "usage").from(t).where("order", 1);

              case 7:
                return n = e.sent, e.abrupt("return", n);

              case 11:
                throw e.prev = 11, e.t0 = e.catch(0), e.t0;

              case 14:
              case 15:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 11 ] ]);
    })), function() {
        return l.apply(this, arguments);
    }), A = (h = U(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, P.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, T.delete().from("traffic").whereIn("accountId", r);

              case 34:
                e.next = 42;
                break;

              case 36:
                if (e.prev = 36, e.t1 = e.catch(31), "ER_ROW_IS_REFERENCED_2" !== err.code) {
                    e.next = 40;
                    break;
                }
                throw new Error("traffic is referenced");

              case 40:
                throw e.t1;

              case 42:
              case 43:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 36 ] ]);
    })), function(e) {
        return h.apply(this, arguments);
    });
    function U(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var P = t(1), B = t(4).production, T = t(3)(B), D = t(25), S = t(31);
    t(0)("traffic:dao");
    e.exports.addTraffic = m, e.exports.updateTrafficById = x, e.exports.getTrafficByAccountId = g, 
    e.exports.getTrafficById = w, e.exports.getLatestUsageByAccountId = v, e.exports.getTrafficHistoryByAccountId = y, 
    e.exports.getTrafficHistoryByAccountIds = b, e.exports.getAllTrafficHistory = k, 
    e.exports.getLatestUsageForAllAccounts = I, e.exports.getLatestUsageByPurchaseId = R, 
    e.exports.getLatestUsageForAllPurchase = E, e.exports.deleteTrafficByAccountIds = A;
}, function(e, r) {
    e.exports = require("group-array");
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c, p, d, f, l = (n = I(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, R.getTrafficById(r.query.id);

              case 8:
                return a = e.sent, e.abrupt("return", t.status(200).send(a));

              case 12:
                if (e.prev = 12, e.t0 = e.catch(5), "id does not exist" !== e.t0.message) {
                    e.next = 16;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 16:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 12 ] ]);
    })), function(e, r) {
        return n.apply(this, arguments);
    }), h = (a = I(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, R.getLatestUsageByAccountId(r.query.id);

              case 8:
                return a = e.sent, e.abrupt("return", t.status(200).send({
                    usage: a
                }));

              case 12:
                if (e.prev = 12, e.t0 = e.catch(5), "id does not exist" !== e.t0.message) {
                    e.next = 16;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 16:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 12 ] ]);
    })), function(e, r) {
        return a.apply(this, arguments);
    }), m = (s = I(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, R.getTrafficHistoryByAccountId(r.query.id);

              case 8:
                return (a = e.sent).forEach(function(e) {
                    delete e.id, delete e.accountId, delete e.lastMeterReading;
                }), e.abrupt("return", t.status(200).send(a));

              case 13:
                return e.prev = 13, e.t0 = e.catch(5), e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 16:
              case 17:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 13 ] ]);
    })), function(e, r) {
        return s.apply(this, arguments);
    }), x = (u = I(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, R.getTrafficHistoryByPurchaseId(r.query.id);

              case 8:
                return a = e.sent, e.abrupt("return", t.status(200).send(a));

              case 12:
                if (e.prev = 12, e.t0 = e.catch(5), "id does not exist" !== e.t0.message) {
                    e.next = 16;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 16:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 12 ] ]);
    })), function(e, r) {
        return u.apply(this, arguments);
    }), g = (o = I(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, R.getTrafficHistoryByUserId(r.query.id);

              case 8:
                return a = e.sent, e.abrupt("return", t.status(200).send(a));

              case 12:
                if (e.prev = 12, e.t0 = e.catch(5), "id does not exist" !== e.t0.message) {
                    e.next = 16;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 16:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 12 ] ]);
    })), function(e, r) {
        return o.apply(this, arguments);
    }), w = (i = I(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, R.getTrafficHistoryByServerId(r.query.id);

              case 8:
                return a = e.sent, e.abrupt("return", t.status(200).send(a));

              case 12:
                if (e.prev = 12, e.t0 = e.catch(5), "id does not exist" !== e.t0.message) {
                    e.next = 16;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 16:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 12 ] ]);
    })), function(e, r) {
        return i.apply(this, arguments);
    }), v = (c = I(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, R.getAllTrafficHistory();

              case 3:
                return n = e.sent, e.abrupt("return", t.status(200).send(n));

              case 7:
                return e.prev = 7, e.t0 = e.catch(0), e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 10:
              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 7 ] ]);
    })), function(e, r) {
        return c.apply(this, arguments);
    }), y = (p = I(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, R.getLatestUsageForAllAccounts();

              case 3:
                return n = e.sent, e.abrupt("return", t.status(200).send(n));

              case 7:
                return e.prev = 7, e.t0 = e.catch(0), e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 10:
              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 7 ] ]);
    })), function(e, r) {
        return p.apply(this, arguments);
    }), b = (d = I(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, R.getLatestUsageByPurchaseId(r.query.id);

              case 8:
                return a = e.sent, e.abrupt("return", t.status(200).send(a));

              case 12:
                if (e.prev = 12, e.t0 = e.catch(5), "id does not exist" !== e.t0.message) {
                    e.next = 16;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 16:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 12 ] ]);
    })), function(e, r) {
        return d.apply(this, arguments);
    }), k = (f = I(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, R.getLatestUsageForAllPurchase();

              case 3:
                return n = e.sent, e.abrupt("return", t.status(200).send(n));

              case 7:
                return e.prev = 7, e.t0 = e.catch(0), e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 10:
              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 7 ] ]);
    })), function(e, r) {
        return f.apply(this, arguments);
    });
    function I(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var R = t(26);
    t(0)("traffic:controller");
    e.exports.getTrafficById = l, e.exports.getLatestUsageByAccountId = h, e.exports.getTrafficHistoryByAccountId = m, 
    e.exports.getTrafficHistoryByPurchaseId = x, e.exports.getTrafficHistoryByUserId = g, 
    e.exports.getTrafficHistoryByServerId = w, e.exports.getAllTrafficHistory = v, e.exports.getLatestUsageForAllAccounts = y, 
    e.exports.getLatestUsageByPurchaseId = b, e.exports.getLatestUsageForAllPurchase = k;
}, function(e, r, t) {
    "use strict";
    var n = t(2)(), a = t(5);
    e.exports = n;
    var s = t(55);
    n.get("/", a.adminAuth, s.getTrafficById), n.get("/account", a.adminAuth, s.getLatestUsageByAccountId), 
    n.get("/all_account", a.adminAuth, s.getLatestUsageForAllAccounts), n.get("/purchase", a.adminAuth, s.getLatestUsageByPurchaseId), 
    n.get("/all_purchase", a.adminAuth, s.getLatestUsageForAllPurchase), n.get("/history", a.adminAuth, s.getTrafficHistoryByAccountId), 
    n.get("/history_by_purchase_id", a.adminAuth, s.getTrafficHistoryByPurchaseId), 
    n.get("/history_by_user_id", a.userAuth, s.getTrafficHistoryByUserId), n.get("/history_by_server_id", a.adminAuth, s.getTrafficHistoryByServerId), 
    n.get("/all_history", a.adminAuth, s.getAllTrafficHistory);
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o = (n = d(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.sanitizeBody("nodeId").trim(), r.checkBody("nodeId", "Invalid nodeId").isUUID(), 
                r.sanitizeBody("purchaseId").trim(), r.checkBody("purchaseId", "Invalid purchaseId").isUUID(), 
                !(n = r.validationErrors())) {
                    e.next = 7;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 7:
                return e.prev = 8, e.next = 11, h.addSsAccount(r.body);

              case 11:
                return a = e.sent, e.abrupt("return", t.status(201).send({
                    id: a.id
                }));

              case 15:
                if (e.prev = 15, e.t0 = e.catch(8), "node does not exist" !== e.t0.message) {
                    e.next = 21;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 21:
                if ("purchase does not exist" !== e.t0.message) {
                    e.next = 25;
                    break;
                }
                return e.abrupt("return", t.status(420).end());

              case 25:
                if ("purchase is not completed" !== e.t0.message) {
                    e.next = 29;
                    break;
                }
                return e.abrupt("return", t.status(409).end());

              case 29:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 30:
              case 31:
              case 32:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 8, 15 ] ]);
    })), function(e, r) {
        return n.apply(this, arguments);
    }), i = (a = d(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, h.getSsAccountById(r.query.id);

              case 8:
                if (a = e.sent, s = l.decensitise(a), "admin" !== r.user.role && s.purchase.user.id !== r.user.id) {
                    e.next = 14;
                    break;
                }
                return e.abrupt("return", t.status(200).send(s));

              case 14:
                return e.abrupt("return", t.status(401).end());

              case 15:
                e.next = 24;
                break;

              case 18:
                if (e.prev = 18, e.t0 = e.catch(5), "id does not exist" !== e.t0.message) {
                    e.next = 22;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 22:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 24:
              case 25:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 18 ] ]);
    })), function(e, r) {
        return a.apply(this, arguments);
    }), c = (s = d(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, i, c, p, d;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r.query.ids)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "array expected"
                }));

              case 2:
                n = !0, a = !1, s = void 0, e.prev = 6, u = r.query.ids[Symbol.iterator]();

              case 8:
                if (n = (o = u.next()).done) {
                    e.next = 16;
                    break;
                }
                if (i = o.value, f.isUUID(i)) {
                    e.next = 12;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "uuid expected"
                }));

              case 12:
              case 13:
                n = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), a = !0, s = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !n && u.return && u.return();

              case 25:
                if (e.prev = 25, !a) {
                    e.next = 28;
                    break;
                }
                throw s;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, h.getSsAccountsByIds(r.query.ids);

              case 34:
                if (c = e.sent, p = !0, c.forEach(function(e) {
                    "admin" !== r.user.role && e.purchase.user.id !== r.user.id && (p = !1);
                }), !p) {
                    e.next = 42;
                    break;
                }
                return d = accounts.map(function(e) {
                    return decensitise(e);
                }), e.abrupt("return", t.status(200).send(d));

              case 42:
                return e.abrupt("return", t.status(401).end());

              case 43:
                e.next = 49;
                break;

              case 46:
                return e.prev = 46, e.t1 = e.catch(31), e.abrupt("return", t.status(500).send({
                    error: e.t1
                }));

              case 49:
              case 50:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 46 ] ]);
    })), function(e, r) {
        return s.apply(this, arguments);
    }), p = (u = d(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, h.deleteSsAccountById(r.query.id);

              case 8:
                return e.abrupt("return", t.status(204).end());

              case 11:
                if (e.prev = 11, e.t0 = e.catch(5), "ssAccount does not exist" !== e.t0.message) {
                    e.next = 15;
                    break;
                }
                return e.abrupt("return", t.status(204).end());

              case 15:
                if ("ssAccount is referenced" !== e.t0.message) {
                    e.next = 18;
                    break;
                }
                return e.abrupt("return", t.status(409).end());

              case 18:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 20:
              case 21:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 11 ] ]);
    })), function(e, r) {
        return u.apply(this, arguments);
    });
    function d(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var f = t(1), l = t(27), h = t(28);
    t(0)("ssAccount:controller");
    e.exports.addSsAccount = o, e.exports.getSsAccountById = i, e.exports.getSsAccountsByIds = c, 
    e.exports.deleteSsAccountById = p;
}, function(e, r, t) {
    "use strict";
    var n = t(2)(), a = t(5);
    e.exports = n;
    var s = t(57);
    n.post("/", a.adminAuth, s.addSsAccount), n.get("/", a.authentication, s.getSsAccountById), 
    n.get("/ss_accounts", a.authentication, s.getSsAccountsByIds), n.delete("/", a.adminAuth, s.deleteSsAccountById);
}, function(e, r, t) {
    "use strict";
    var n = t(2)(), a = t(5);
    e.exports = n;
    var s = t(27), u = t(58);
    n.use("/ss_account", u), n.get("/all", a.adminAuth, s.getAllAccounts), n.get("/accounts", a.authentication, s.getAccountsByIds), 
    n.get("/accounts_by_purchase_ids", a.authentication, s.getAccountsByPurchaseIds), 
    n.get("/accounts_by_user_id", a.userAuth, s.getAccountsByUserId), n.get("/accounts_by_server_id", a.adminAuth, s.getAccountsByServerId);
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i = (n = l(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.sanitizeBody("userId").trim(), r.checkBody("userId", "Invalid userId").isUUID(), 
                r.sanitizeBody("productId").trim(), r.checkBody("productId", "Invalid productId").isUUID(), 
                r.sanitizeBody("paymentType").trim(), r.checkBody("paymentType").isIn([ "PaypalPayment", "AdminApproval" ]), 
                !(n = r.validationErrors())) {
                    e.next = 9;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 9:
                return e.prev = 10, e.next = 13, m.createPurchase(r.body);

              case 13:
                if (a = e.sent, s = a[0], u = a[1], !s) {
                    e.next = 20;
                    break;
                }
                return e.abrupt("return", t.redirect(s));

              case 20:
                return e.abrupt("return", t.status(201).send({
                    id: u.id
                }));

              case 21:
                e.next = 33;
                break;

              case 24:
                if (e.prev = 24, e.t0 = e.catch(10), "user does not exist" !== e.t0.message) {
                    e.next = 28;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 28:
                if ("product does not exist" !== e.t0.message) {
                    e.next = 31;
                    break;
                }
                return e.abrupt("return", t.status(420).end());

              case 31:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 33:
              case 34:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 10, 24 ] ]);
    })), function(e, r) {
        return n.apply(this, arguments);
    }), c = (a = l(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, m.getPurchaseById(r.query.id);

              case 8:
                if (a = e.sent, "admin" !== r.user.role && a.user.id !== r.user.id) {
                    e.next = 13;
                    break;
                }
                return e.abrupt("return", t.status(200).send(a));

              case 13:
                return e.abrupt("return", t.status(401).end());

              case 14:
                e.next = 23;
                break;

              case 17:
                if (e.prev = 17, e.t0 = e.catch(5), "id does not exist" !== e.t0.message) {
                    e.next = 21;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 21:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 23:
              case 24:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 17 ] ]);
    })), function(e, r) {
        return a.apply(this, arguments);
    }), p = (s = l(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, m.getAllPurchases();

              case 3:
                return n = e.sent, e.abrupt("return", t.status(200).send(n));

              case 7:
                return e.prev = 7, e.t0 = e.catch(0), e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 10:
              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 7 ] ]);
    })), function(e, r) {
        return s.apply(this, arguments);
    }), d = (u = l(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, i, c, p;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r.query.ids)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "array expected"
                }));

              case 2:
                n = !0, a = !1, s = void 0, e.prev = 6, u = r.query.ids[Symbol.iterator]();

              case 8:
                if (n = (o = u.next()).done) {
                    e.next = 16;
                    break;
                }
                if (i = o.value, h.isUUID(i)) {
                    e.next = 12;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "uuid expected"
                }));

              case 12:
              case 13:
                n = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), a = !0, s = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !n && u.return && u.return();

              case 25:
                if (e.prev = 25, !a) {
                    e.next = 28;
                    break;
                }
                throw s;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, m.getPurchasesByIds(r.query.ids);

              case 34:
                if (c = e.sent, p = !0, c.forEach(function(e) {
                    "admin" !== r.user.role && e.user.id !== r.user.id && (p = !1);
                }), !p) {
                    e.next = 41;
                    break;
                }
                return e.abrupt("return", t.status(200).send(c));

              case 41:
                return e.abrupt("return", t.status(401).end());

              case 42:
                e.next = 48;
                break;

              case 45:
                return e.prev = 45, e.t1 = e.catch(31), e.abrupt("return", t.status(500).send({
                    error: e.t1
                }));

              case 48:
              case 49:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 45 ] ]);
    })), function(e, r) {
        return u.apply(this, arguments);
    }), f = (o = l(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (h.isUUID(r.query.id)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "uuid expected"
                }));

              case 2:
                return e.prev = 3, e.next = 6, m.getPurchasesByUserId(r.query.id);

              case 6:
                return n = e.sent, e.abrupt("return", t.status(200).send(n));

              case 10:
                return e.prev = 10, e.t0 = e.catch(3), e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 13:
              case 14:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 10 ] ]);
    })), function(e, r) {
        return o.apply(this, arguments);
    });
    function l(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var h = t(1), m = t(13);
    t(0)("purchase:controller");
    e.exports.createPurchase = i, e.exports.getPurchaseById = c, e.exports.getAllPurchases = p, 
    e.exports.getPurchasesByIds = d, e.exports.getPurchasesByUserId = f;
}, function(e, r, t) {
    "use strict";
    var n = t(2)(), a = t(5);
    e.exports = n;
    var s = t(60);
    n.post("/", a.authentication, s.createPurchase), n.get("/", a.authentication, s.getPurchaseById), 
    n.get("/all", a.adminAuth, s.getAllPurchases), n.get("/purchases", a.authentication, s.getPurchasesByIds), 
    n.get("/purchases_by_user_id", a.userAuth, s.getPurchasesByUserId);
}, function(e, r, t) {
    "use strict";
    var n, a, s = (n = o(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, p, d;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r.query.ids)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "array expected"
                }));

              case 2:
                n = !0, a = !1, s = void 0, e.prev = 6, u = r.query.ids[Symbol.iterator]();

              case 8:
                if (n = (o = u.next()).done) {
                    e.next = 16;
                    break;
                }
                if (p = o.value, i.isUUID(p)) {
                    e.next = 12;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "uuid expected"
                }));

              case 12:
              case 13:
                n = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), a = !0, s = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !n && u.return && u.return();

              case 25:
                if (e.prev = 25, !a) {
                    e.next = 28;
                    break;
                }
                throw s;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, c.getPaymentsByIds(r.query.ids);

              case 34:
                return d = e.sent, e.abrupt("return", t.status(200).send(d));

              case 38:
                return e.prev = 38, e.t1 = e.catch(31), e.abrupt("return", t.status(500).send({
                    error: e.t1
                }));

              case 41:
              case 42:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 38 ] ]);
    })), function(e, r) {
        return n.apply(this, arguments);
    }), u = (a = o(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, c.getAllPayments();

              case 3:
                return n = e.sent, e.abrupt("return", t.status(200).send(n));

              case 7:
                return e.prev = 7, e.t0 = e.catch(0), e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 10:
              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 7 ] ]);
    })), function(e, r) {
        return a.apply(this, arguments);
    });
    function o(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var i = t(1), c = t(9);
    t(0)("payment:controller");
    e.exports.getPaymentsByIds = s, e.exports.getAllPayments = u;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o = (n = d(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, l.createAdminApproval();

              case 3:
                return n = e.sent, e.abrupt("return", t.status(201).send({
                    id: n.id
                }));

              case 7:
                return e.prev = 7, e.t0 = e.catch(0), e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 10:
              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 7 ] ]);
    })), function(e, r) {
        return n.apply(this, arguments);
    }), i = (a = d(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkBody("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 5;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 5:
                return e.prev = 6, e.next = 9, l.approveAdminApprovalById(r.body.id);

              case 9:
                return e.abrupt("return", t.status(201).send({
                    id: r.body.id
                }));

              case 12:
                if (e.prev = 12, e.t0 = e.catch(6), "id does not exist" !== e.t0.message) {
                    e.next = 18;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 18:
                if ("payment is already completed" !== e.t0.message) {
                    e.next = 20;
                    break;
                }
                return e.abrupt("return", t.status(409).end());

              case 20:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 22:
              case 23:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 12 ] ]);
    })), function(e, r) {
        return a.apply(this, arguments);
    }), c = (s = d(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, l.getAdminApprovalById(r.query.id);

              case 8:
                return a = e.sent, e.abrupt("return", t.status(200).send(a));

              case 12:
                if (e.prev = 12, e.t0 = e.catch(5), "id does not exist" !== e.t0.message) {
                    e.next = 16;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 16:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 12 ] ]);
    })), function(e, r) {
        return s.apply(this, arguments);
    }), p = (u = d(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, i, c;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r.query.ids)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "array expected"
                }));

              case 2:
                n = !0, a = !1, s = void 0, e.prev = 6, u = r.query.ids[Symbol.iterator]();

              case 8:
                if (n = (o = u.next()).done) {
                    e.next = 16;
                    break;
                }
                if (i = o.value, f.isUUID(i)) {
                    e.next = 12;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "uuid expected"
                }));

              case 12:
              case 13:
                n = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), a = !0, s = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !n && u.return && u.return();

              case 25:
                if (e.prev = 25, !a) {
                    e.next = 28;
                    break;
                }
                throw s;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, l.getAdminApprovalsByIds(r.query.ids);

              case 34:
                return c = e.sent, e.abrupt("return", t.status(200).send(c));

              case 38:
                return e.prev = 38, e.t1 = e.catch(31), e.abrupt("return", t.status(500).send({
                    error: e.t1
                }));

              case 41:
              case 42:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 38 ] ]);
    })), function(e, r) {
        return u.apply(this, arguments);
    });
    function d(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var f = t(1), l = t(36);
    t(0)("adminApproval:controller");
    e.exports.createAdminApproval = o, e.exports.approveAdminApprovalById = i, e.exports.getAdminApprovalById = c, 
    e.exports.getAdminApprovalsByIds = p;
}, function(e, r, t) {
    "use strict";
    var n = t(2)(), a = t(5);
    e.exports = n;
    var s = t(63);
    n.post("/create", a.adminAuth, s.createAdminApproval), n.post("/approve", a.adminAuth, s.approveAdminApprovalById), 
    n.get("/", a.adminAuth, s.getAdminApprovalById), n.get("/admin_approvals", a.adminAuth, s.getAdminApprovalsByIds);
}, function(e, r) {
    e.exports = require("currency-formatter");
}, function(e, r) {
    e.exports = require("paypal-rest-sdk");
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o = (n = d(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.body.amount && !isNaN(r.body.amount) && Number.isInteger(100 * r.body.amount)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "Invalid amount"
                }));

              case 2:
                return e.prev = 3, e.next = 6, l.createPaypalPayment(r.body.amount);

              case 6:
                return n = e.sent, e.abrupt("return", t.status(201).send(n));

              case 10:
                return e.prev = 10, e.t0 = e.catch(3), e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 13:
              case 14:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 3, 10 ] ]);
    })), function(e, r) {
        return n.apply(this, arguments);
    }), i = (a = d(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("paymentId", "Invalid paymentId").notEmpty(), r.checkQuery("PayerID", "Invalid PayerID").notEmpty(), 
                !(n = r.validationErrors())) {
                    e.next = 5;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 5:
                return a = r.query.paymentId, s = r.query.PayerID, e.prev = 8, e.next = 11, l.executePaypalPayment(a, s);

              case 11:
                return u = e.sent, e.abrupt("return", t.redirect("http://localhost:8000/api/payment/paypal_payment?id=" + u.id));

              case 15:
                return e.prev = 15, e.t0 = e.catch(8), e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 8, 15 ] ]);
    })), function(e, r) {
        return a.apply(this, arguments);
    }), c = (s = d(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, l.getPaypalPaymentById(r.query.id);

              case 8:
                return a = e.sent, e.abrupt("return", t.status(200).send(a));

              case 12:
                if (e.prev = 12, e.t0 = e.catch(5), "id does not exist" !== e.t0.message) {
                    e.next = 16;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 16:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 12 ] ]);
    })), function(e, r) {
        return s.apply(this, arguments);
    }), p = (u = d(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, i, c;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r.query.ids)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "array expected"
                }));

              case 2:
                n = !0, a = !1, s = void 0, e.prev = 6, u = r.query.ids[Symbol.iterator]();

              case 8:
                if (n = (o = u.next()).done) {
                    e.next = 16;
                    break;
                }
                if (i = o.value, f.isUUID(i)) {
                    e.next = 12;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "uuid expected"
                }));

              case 12:
              case 13:
                n = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), a = !0, s = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !n && u.return && u.return();

              case 25:
                if (e.prev = 25, !a) {
                    e.next = 28;
                    break;
                }
                throw s;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, l.getPaypalPaymentsByIds(r.query.ids);

              case 34:
                return c = e.sent, e.abrupt("return", t.status(200).send(c));

              case 38:
                return e.prev = 38, e.t1 = e.catch(31), e.abrupt("return", t.status(500).send({
                    error: e.t1
                }));

              case 41:
              case 42:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 38 ] ]);
    })), function(e, r) {
        return u.apply(this, arguments);
    });
    function d(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var f = t(1), l = t(17);
    t(0)("paypalPayment:controller");
    e.exports.createPaypalPayment = o, e.exports.executePaypalPayment = i, e.exports.getPaypalPaymentById = c, 
    e.exports.getPaypalPaymentsByIds = p;
}, function(e, r, t) {
    "use strict";
    var n = t(2)(), a = t(5);
    e.exports = n;
    var s = t(67);
    n.post("/create", a.adminAuth, s.createPaypalPayment), n.get("/process", s.executePaypalPayment), 
    n.get("/", a.adminAuth, s.getPaypalPaymentById), n.get("/paypal_payments", a.adminAuth, s.getPaypalPaymentsByIds);
}, function(e, r, t) {
    "use strict";
    var n = t(2)(), a = t(5);
    e.exports = n;
    var s = t(68);
    n.use("/paypal_payment", s);
    var u = t(64);
    n.use("/admin_approval", u);
    var o = t(62);
    n.get("/payments", a.adminAuth, o.getPaymentsByIds), n.get("/all", a.adminAuth, o.getAllPayments);
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c = (n = m(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.sanitizeBody("name").trim(), r.checkBody("name", "Invalid name").notEmpty(), 
                r.checkBody("traffic", "Invalid traffic").isInt(), r.checkBody("period", "Invalid period").isIn([ "monthly", "bimonthly", "quarterly", "semiannual", "annual" ]), 
                r.checkBody("price", "Invalid price").isInt(), !(n = r.validationErrors())) {
                    e.next = 8;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 8:
                return e.prev = 9, e.next = 12, g.addProduct(r.body);

              case 12:
                return a = e.sent, e.abrupt("return", t.status(201).send({
                    id: a.id
                }));

              case 16:
                if (e.prev = 16, e.t0 = e.catch(9), "product already exists" !== e.t0.message) {
                    e.next = 20;
                    break;
                }
                return e.abrupt("return", t.status(409).end());

              case 20:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 21:
              case 22:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 9, 16 ] ]);
    })), function(e, r) {
        return n.apply(this, arguments);
    }), p = (a = m(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, g.getProductById(r.query.id);

              case 8:
                return a = e.sent, e.abrupt("return", t.status(200).send(a));

              case 12:
                if (e.prev = 12, e.t0 = e.catch(5), "id does not exist" !== e.t0.message) {
                    e.next = 16;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 16:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 12 ] ]);
    })), function(e, r) {
        return a.apply(this, arguments);
    }), d = (s = m(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, i, c;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r.query.ids)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "array expected"
                }));

              case 2:
                n = !0, a = !1, s = void 0, e.prev = 6, u = r.query.ids[Symbol.iterator]();

              case 8:
                if (n = (o = u.next()).done) {
                    e.next = 16;
                    break;
                }
                if (i = o.value, x.isUUID(i)) {
                    e.next = 12;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "uuid expected"
                }));

              case 12:
              case 13:
                n = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), a = !0, s = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !n && u.return && u.return();

              case 25:
                if (e.prev = 25, !a) {
                    e.next = 28;
                    break;
                }
                throw s;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, g.getProductsByIds(r.query.ids);

              case 34:
                return c = e.sent, e.abrupt("return", t.status(200).send(c));

              case 38:
                return e.prev = 38, e.t1 = e.catch(31), e.abrupt("return", t.status(500).send({
                    error: e.t1
                }));

              case 41:
              case 42:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 38 ] ]);
    })), function(e, r) {
        return s.apply(this, arguments);
    }), f = (u = m(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, g.getAllProducts();

              case 3:
                return n = e.sent, e.abrupt("return", t.status(200).send(n));

              case 7:
                return e.prev = 7, e.t0 = e.catch(0), e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 10:
              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 7 ] ]);
    })), function(e, r) {
        return u.apply(this, arguments);
    }), l = (o = m(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkBody("id", "Invalid id").isUUID(), r.sanitizeBody("name").trim(), r.checkBody("name", "Invalid name").notEmpty(), 
                r.checkBody("traffic", "Invalid traffic").isInt(), r.checkBody("period", "Invalid period").isIn([ "monthly", "bimonthly", "quarterly", "semiannual", "annual" ]), 
                r.checkBody("price", "Invalid price").isInt(), !(n = r.validationErrors())) {
                    e.next = 9;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 9:
                return e.prev = 10, e.next = 13, g.updateProduct(r.body);

              case 13:
                return e.abrupt("return", t.status(200).end());

              case 16:
                if (e.prev = 16, e.t0 = e.catch(10), "id does not exist" !== e.t0.message) {
                    e.next = 22;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 22:
                if ("product already exists" !== e.t0.message) {
                    e.next = 24;
                    break;
                }
                return e.abrupt("return", t.status(409).end());

              case 24:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 26:
              case 27:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 10, 16 ] ]);
    })), function(e, r) {
        return o.apply(this, arguments);
    }), h = (i = m(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, g.deleteProduct(r.query.id);

              case 8:
                return e.abrupt("return", t.status(204).end());

              case 11:
                if (e.prev = 11, e.t0 = e.catch(5), "product is referenced" !== e.t0.message) {
                    e.next = 15;
                    break;
                }
                return e.abrupt("return", t.status(409).end());

              case 15:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 17:
              case 18:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 11 ] ]);
    })), function(e, r) {
        return i.apply(this, arguments);
    });
    function m(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var x = t(1), g = t(38);
    t(0)("product:controller");
    e.exports.addProduct = c, e.exports.getProductById = p, e.exports.getProductsByIds = d, 
    e.exports.getAllProducts = f, e.exports.updateProduct = l, e.exports.deleteProduct = h;
}, function(e, r, t) {
    "use strict";
    var n = t(2)(), a = t(5);
    e.exports = n;
    var s = t(70);
    n.post("/", a.adminAuth, s.addProduct), n.get("/", a.authentication, s.getProductById), 
    n.get("/products", a.authentication, s.getProductsByIds), n.get("/all", a.authentication, s.getAllProducts), 
    n.put("/", a.adminAuth, s.updateProduct), n.delete("/", a.adminAuth, s.deleteProduct);
}, function(e, r) {
    e.exports = require("jwt-decode");
}, function(e, r) {
    e.exports = require("request-promise-native");
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i = (n = l(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, i;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if ("shadowsocks" === r && t) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (n = t.host, a = t.port, s = t.password, !(!n || "string" != typeof n || !a || !Number.isInteger(a) || a < 1 || a > 65535) && s && "string" == typeof s) {
                    e.next = 6;
                    break;
                }
                throw new Error("illegal argument");

              case 6:
                return e.next = 9, x.getToken(n, a, s);

              case 9:
                return u = e.sent, o = {
                    url: "https://" + n + ":" + a + "/ping"
                }, e.prev = 11, e.next = 14, h.get(o).auth(null, null, !0, u);

              case 14:
                return i = e.sent, e.abrupt("return", JSON.parse(i));

              case 18:
                if (e.prev = 18, e.t0 = e.catch(11), 401 !== e.t0.statusCode) {
                    e.next = 24;
                    break;
                }
                throw new Error("authentication error");

              case 24:
                if (424 !== e.t0.statusCode) {
                    e.next = 27;
                    break;
                }
                e.next = 37;
                break;

              case 27:
                if (425 !== e.t0.statusCode) {
                    e.next = 30;
                    break;
                }
                e.next = 37;
                break;

              case 30:
                if (500 !== e.t0.statusCode) {
                    e.next = 33;
                    break;
                }
                e.next = 37;
                break;

              case 33:
                if ("RequestError" !== e.t0.name) {
                    e.next = 36;
                    break;
                }
                e.next = 37;
                break;

              case 36:
                throw e.t0;

              case 37:
                return e.abrupt("return", {});

              case 39:
              case 40:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 11, 18 ] ]);
    })), function(e, r) {
        return n.apply(this, arguments);
    }), c = (a = l(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, i, c;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && t) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (n = r.port, a = r.password, s = t.host, u = t.port, o = t.password, !(!n || !Number.isInteger(n) || n < 1 || n > 65535 || !a || "string" != typeof a || !s || "string" != typeof s || !u || !Number.isInteger(u) || u < 1 || u > 65535) && o && "string" == typeof a) {
                    e.next = 7;
                    break;
                }
                throw new Error("illegal argument");

              case 7:
                return e.next = 10, x.getToken(s, u, o);

              case 10:
                return i = e.sent, c = {
                    url: "https://" + s + ":" + u
                }, e.prev = 12, e.next = 15, h.post(c).form({
                    port: n,
                    password: a
                }).auth(null, null, !0, i);

              case 15:
                e.next = 55;
                break;

              case 17:
                if (e.prev = 17, e.t0 = e.catch(12), 400 !== e.t0.statusCode) {
                    e.next = 23;
                    break;
                }
                throw new Error("validation error");

              case 23:
                if (401 !== e.t0.statusCode) {
                    e.next = 27;
                    break;
                }
                throw new Error("authentication error");

              case 27:
                if (409 !== e.t0.statusCode) {
                    e.next = 31;
                    break;
                }
                throw new Error("port already exists from shadowsocks");

              case 31:
                if (410 !== e.t0.statusCode) {
                    e.next = 34;
                    break;
                }
                e.next = 53;
                break;

              case 34:
                if (422 !== e.t0.statusCode) {
                    e.next = 37;
                    break;
                }
                e.next = 53;
                break;

              case 37:
                if (427 !== e.t0.statusCode) {
                    e.next = 40;
                    break;
                }
                e.next = 53;
                break;

              case 40:
                if (424 !== e.t0.statusCode) {
                    e.next = 43;
                    break;
                }
                e.next = 53;
                break;

              case 43:
                if (425 !== e.t0.statusCode) {
                    e.next = 46;
                    break;
                }
                e.next = 53;
                break;

              case 46:
                if (500 !== e.t0.statusCode) {
                    e.next = 49;
                    break;
                }
                e.next = 53;
                break;

              case 49:
                if ("RequestError" !== e.t0.name) {
                    e.next = 52;
                    break;
                }
                e.next = 53;
                break;

              case 52:
                throw e.t0;

              case 53:
                return e.abrupt("return", null);

              case 55:
              case 56:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 12, 17 ] ]);
    })), function(e, r) {
        return a.apply(this, arguments);
    }), p = (s = l(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (t = r.host, n = r.port, a = r.password, !(!t || "string" != typeof t || !n || !Number.isInteger(n) || n < 1 || n > 65535) && a && "string" == typeof a) {
                    e.next = 6;
                    break;
                }
                throw new Error("illegal argument");

              case 6:
                return e.next = 9, x.getToken(t, n, a);

              case 9:
                return s = e.sent, u = {
                    url: "https://" + t + ":" + n + "/traffic/all"
                }, e.prev = 11, e.next = 14, h.get(u).auth(null, null, !0, s);

              case 14:
                return o = e.sent, e.abrupt("return", JSON.parse(o));

              case 18:
                if (e.prev = 18, e.t0 = e.catch(11), 401 !== e.t0.statusCode) {
                    e.next = 24;
                    break;
                }
                throw new Error("authentication error");

              case 24:
                if (424 !== e.t0.statusCode) {
                    e.next = 27;
                    break;
                }
                e.next = 37;
                break;

              case 27:
                if (425 !== e.t0.statusCode) {
                    e.next = 30;
                    break;
                }
                e.next = 37;
                break;

              case 30:
                if (500 !== e.t0.statusCode) {
                    e.next = 33;
                    break;
                }
                e.next = 37;
                break;

              case 33:
                if ("RequestError" !== e.t0.name) {
                    e.next = 36;
                    break;
                }
                e.next = 37;
                break;

              case 36:
                throw e.t0;

              case 37:
                return e.abrupt("return", []);

              case 39:
              case 40:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 11, 18 ] ]);
    })), function(e) {
        return s.apply(this, arguments);
    }), d = (u = l(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (t = r.host, n = r.port, a = r.password, !(!t || "string" != typeof t || !n || !Number.isInteger(n) || n < 1 || n > 65535) && a && "string" == typeof a) {
                    e.next = 6;
                    break;
                }
                throw new Error("illegal argument");

              case 6:
                return e.next = 9, x.getToken(t, n, a);

              case 9:
                return s = e.sent, u = {
                    url: "https://" + t + ":" + n + "/all"
                }, e.prev = 11, e.next = 14, h.get(u).auth(null, null, !0, s);

              case 14:
                return o = e.sent, e.abrupt("return", JSON.parse(o));

              case 18:
                if (e.prev = 18, e.t0 = e.catch(11), 401 !== e.t0.statusCode) {
                    e.next = 24;
                    break;
                }
                throw new Error("authentication error");

              case 24:
                if (424 !== e.t0.statusCode) {
                    e.next = 27;
                    break;
                }
                e.next = 37;
                break;

              case 27:
                if (425 !== e.t0.statusCode) {
                    e.next = 30;
                    break;
                }
                e.next = 37;
                break;

              case 30:
                if (500 !== e.t0.statusCode) {
                    e.next = 33;
                    break;
                }
                e.next = 37;
                break;

              case 33:
                if ("RequestError" !== e.t0.name) {
                    e.next = 36;
                    break;
                }
                e.next = 37;
                break;

              case 36:
                throw e.t0;

              case 37:
                return e.abrupt("return", []);

              case 39:
              case 40:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 11, 18 ] ]);
    })), function(e) {
        return u.apply(this, arguments);
    }), f = (o = l(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, i;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && t) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (n = r.port, a = t.host, s = t.port, u = t.password, !(!n || !Number.isInteger(n) || n < 1 || n > 65535 || !a || "string" != typeof a || !s || !Number.isInteger(s) || s < 1 || s > 65535) && u && "string" == typeof u) {
                    e.next = 7;
                    break;
                }
                throw new Error("illegal argument");

              case 7:
                return e.next = 10, x.getToken(a, s, u);

              case 10:
                return o = e.sent, i = {
                    url: "https://" + a + ":" + s + "?port=" + n
                }, e.prev = 12, e.next = 15, h.delete(i).auth(null, null, !0, o);

              case 15:
                e.next = 48;
                break;

              case 17:
                if (e.prev = 17, e.t0 = e.catch(12), 400 !== e.t0.statusCode) {
                    e.next = 23;
                    break;
                }
                throw new Error("validation error");

              case 23:
                if (401 !== e.t0.statusCode) {
                    e.next = 27;
                    break;
                }
                throw new Error("authentication error");

              case 27:
                if (424 !== e.t0.statusCode) {
                    e.next = 30;
                    break;
                }
                e.next = 46;
                break;

              case 30:
                if (425 !== e.t0.statusCode) {
                    e.next = 33;
                    break;
                }
                e.next = 46;
                break;

              case 33:
                if (422 !== e.t0.statusCode) {
                    e.next = 36;
                    break;
                }
                e.next = 46;
                break;

              case 36:
                if (427 !== e.t0.statusCode) {
                    e.next = 39;
                    break;
                }
                e.next = 46;
                break;

              case 39:
                if (500 !== e.t0.statusCode) {
                    e.next = 42;
                    break;
                }
                e.next = 46;
                break;

              case 42:
                if ("RequestError" !== e.t0.name) {
                    e.next = 45;
                    break;
                }
                e.next = 46;
                break;

              case 45:
                throw e.t0;

              case 46:
                return e.abrupt("return", null);

              case 48:
              case 49:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 12, 17 ] ]);
    })), function(e, r) {
        return o.apply(this, arguments);
    });
    function l(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var h = t(73), m = t(72);
    t(47), t(0)("protocol:shadowsocks");
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    var x = {
        nodes: [],
        getToken: function() {
            var e = l(regeneratorRuntime.mark(function e(r, t, n) {
                var a, s, u;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (1 !== (a = this.nodes.filter(function(e) {
                            return e.ipAddressOrDomainName === r && e.port === t && e.password === n;
                        })).length) {
                            e.next = 9;
                            break;
                        }
                        if (s = a[0].token, !(1e3 * m(s).exp > Date.now() + 36e5)) {
                            e.next = 6;
                            break;
                        }
                        return e.abrupt("return", s);

                      case 6:
                        e.next = 11;
                        break;

                      case 9:
                        if (!(a.length > 1)) {
                            e.next = 11;
                            break;
                        }
                        throw new Error("authToken, getToken, duplicate nodes found");

                      case 11:
                        return e.next = 14, this.requestTokenFromNode(r, t, n);

                      case 14:
                        if (!(u = e.sent)) {
                            e.next = 18;
                            break;
                        }
                        return e.next = 18, this.saveToken(r, t, n, u);

                      case 18:
                        return e.abrupt("return", u);

                      case 20:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return function(r, t, n) {
                return e.apply(this, arguments);
            };
        }(),
        saveToken: function() {
            var e = l(regeneratorRuntime.mark(function e(r, t, n, a) {
                var s;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (0 !== (s = this.nodes.filter(function(e) {
                            return e.ipAddressOrDomainName === r && e.port === t && e.password === n;
                        })).length) {
                            e.next = 5;
                            break;
                        }
                        this.nodes.push({
                            ipAddressOrDomainName: r,
                            port: t,
                            password: n,
                            token: a
                        }), e.next = 11;
                        break;

                      case 5:
                        if (1 !== s.length) {
                            e.next = 9;
                            break;
                        }
                        s[0].token, e.next = 11;
                        break;

                      case 9:
                        if (!(s.length > 1)) {
                            e.next = 11;
                            break;
                        }
                        throw new Error("authToken, saveToken, duplicate nodes found");

                      case 11:
                      case 12:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return function(r, t, n, a) {
                return e.apply(this, arguments);
            };
        }(),
        requestTokenFromNode: function() {
            var e = l(regeneratorRuntime.mark(function e(r, t, n) {
                var a, s;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return a = {
                            url: "https://" + r + ":" + t + "/login"
                        }, e.prev = 1, e.next = 4, h.post(a).form({
                            password: n
                        });

                      case 4:
                        return s = e.sent, e.abrupt("return", JSON.parse(s).token);

                      case 8:
                        if (e.prev = 8, e.t0 = e.catch(1), 400 !== e.t0.statusCode) {
                            e.next = 14;
                            break;
                        }
                        throw new Error("validation error");

                      case 14:
                        if (401 !== e.t0.statusCode) {
                            e.next = 18;
                            break;
                        }
                        throw new Error("invalid password");

                      case 18:
                        if (500 !== e.t0.statusCode) {
                            e.next = 22;
                            break;
                        }
                        throw new Error("interal error");

                      case 22:
                        if ("RequestError" !== e.t0.name) {
                            e.next = 26;
                            break;
                        }
                        throw new Error("connection failed");

                      case 26:
                        throw e.t0;

                      case 27:
                        return e.abrupt("return", null);

                      case 29:
                      case 30:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 1, 8 ] ]);
            }));
            return function(r, t, n) {
                return e.apply(this, arguments);
            };
        }()
    };
    e.exports.init = i, e.exports.addPort = c, e.exports.getMeterReadings = p, e.exports.getAllPorts = d, 
    e.exports.deletePort = f;
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c = (n = m(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.sanitizeBody("serverId").trim(), r.checkBody("serverId", "Invalid serverId").isUUID(), 
                r.sanitizeBody("name").trim(), r.checkBody("name", "Invalid name").notEmpty(), r.checkBody("protocol", "Invalid protocol").notEmpty().isIn([ "shadowsocks" ]), 
                r.checkBody("password", "Invalid password").notEmpty(), r.checkBody("port", "Invalid port number").isInt({
                    min: 1,
                    max: 65535
                }), !(n = r.validationErrors())) {
                    e.next = 10;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 10:
                return e.prev = 11, e.next = 14, g.addNode(r.body);

              case 14:
                return a = e.sent, e.abrupt("return", t.status(201).send({
                    id: a.id
                }));

              case 18:
                if (e.prev = 18, e.t0 = e.catch(11), "server does not exist" !== e.t0.message) {
                    e.next = 22;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 22:
                if ("node already exists" !== e.t0.message) {
                    e.next = 25;
                    break;
                }
                return e.abrupt("return", t.status(409).end());

              case 25:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 27:
              case 28:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 11, 18 ] ]);
    })), function(e, r) {
        return n.apply(this, arguments);
    }), p = (a = m(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, g.getNodeById(r.query.id);

              case 8:
                return a = e.sent, e.abrupt("return", t.status(200).send(a));

              case 12:
                if (e.prev = 12, e.t0 = e.catch(5), "id does not exist" !== e.t0.message) {
                    e.next = 16;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 16:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 12 ] ]);
    })), function(e, r) {
        return a.apply(this, arguments);
    }), d = (s = m(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, g.getAllNodes();

              case 3:
                return n = e.sent, e.abrupt("return", t.status(200).send(n));

              case 7:
                return e.prev = 7, e.t0 = e.catch(0), e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 10:
              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 7 ] ]);
    })), function(e, r) {
        return s.apply(this, arguments);
    }), f = (u = m(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, i, c;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r.query.ids)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "array expected"
                }));

              case 2:
                n = !0, a = !1, s = void 0, e.prev = 6, u = r.query.ids[Symbol.iterator]();

              case 8:
                if (n = (o = u.next()).done) {
                    e.next = 16;
                    break;
                }
                if (i = o.value, x.isUUID(i)) {
                    e.next = 12;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "uuid expected"
                }));

              case 12:
              case 13:
                n = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), a = !0, s = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !n && u.return && u.return();

              case 25:
                if (e.prev = 25, !a) {
                    e.next = 28;
                    break;
                }
                throw s;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, g.getNodesByIds(r.query.ids);

              case 34:
                return c = e.sent, e.abrupt("return", t.status(200).send(c));

              case 38:
                return e.prev = 38, e.t1 = e.catch(31), e.abrupt("return", t.status(500).send({
                    error: e.t1
                }));

              case 41:
              case 42:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 38 ] ]);
    })), function(e, r) {
        return u.apply(this, arguments);
    }), l = (o = m(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, g.deleteNode(r.query.id);

              case 8:
                return e.abrupt("return", t.status(204).end());

              case 11:
                if (e.prev = 11, e.t0 = e.catch(5), "node is referenced" !== e.t0.message) {
                    e.next = 15;
                    break;
                }
                return e.abrupt("return", t.status(409).end());

              case 15:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 17:
              case 18:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 11 ] ]);
    })), function(e, r) {
        return o.apply(this, arguments);
    }), h = (i = m(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkBody("id", "Invalid id").isUUID(), r.sanitizeBody("name").trim(), r.checkBody("name", "Invalid name").notEmpty(), 
                r.checkBody("protocol", "Invalid protocol").notEmpty().isIn([ "shadowsocks" ]), 
                r.checkBody("password", "Invalid password").notEmpty(), r.checkBody("port", "Invalid port number").isInt({
                    min: 1,
                    max: 65535
                }), !(n = r.validationErrors())) {
                    e.next = 9;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 9:
                return e.prev = 10, e.next = 13, g.updateNode(r.body);

              case 13:
                return e.abrupt("return", t.status(200).end());

              case 16:
                if (e.prev = 16, e.t0 = e.catch(10), "node does not exist" !== e.t0.message) {
                    e.next = 22;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 22:
                if ("node already exists" !== e.t0.message) {
                    e.next = 24;
                    break;
                }
                return e.abrupt("return", t.status(409).end());

              case 24:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 26:
              case 27:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 10, 16 ] ]);
    })), function(e, r) {
        return i.apply(this, arguments);
    });
    function m(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var x = t(1), g = t(21);
    t(0)("node:controller");
    e.exports.addNode = c, e.exports.getNodeById = p, e.exports.getAllNodes = d, e.exports.getNodesByIds = f, 
    e.exports.deleteNode = l, e.exports.updateNode = h;
}, function(e, r, t) {
    "use strict";
    var n = t(2)(), a = t(5);
    e.exports = n;
    var s = t(75);
    n.post("/", a.adminAuth, s.addNode), n.get("/", a.adminAuth, s.getNodeById), n.get("/all", a.adminAuth, s.getAllNodes), 
    n.get("/nodes", a.adminAuth, s.getNodesByIds), n.delete("/", a.adminAuth, s.deleteNode), 
    n.put("/", a.adminAuth, s.updateNode);
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c = (n = m(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.sanitizeBody("ipAddressOrDomainName").trim(), r.checkBody("ipAddressOrDomainName", "Invalid ip address or domain name").isIPorFQDN(), 
                !(n = r.validationErrors())) {
                    e.next = 5;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 5:
                return e.prev = 6, e.next = 9, g.addServer(r.body);

              case 9:
                return a = e.sent, e.abrupt("return", t.status(201).send({
                    id: a.id
                }));

              case 13:
                if (e.prev = 13, e.t0 = e.catch(6), "server already exists" !== e.t0.message) {
                    e.next = 17;
                    break;
                }
                return e.abrupt("return", t.status(409).end());

              case 17:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 13 ] ]);
    })), function(e, r) {
        return n.apply(this, arguments);
    }), p = (a = m(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, g.deleteServer(r.query.id);

              case 8:
                return e.abrupt("return", t.status(204).end());

              case 11:
                if (e.prev = 11, e.t0 = e.catch(5), "server is referenced" !== e.t0.message) {
                    e.next = 15;
                    break;
                }
                return e.abrupt("return", t.status(409).end());

              case 15:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 17:
              case 18:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 11 ] ]);
    })), function(e, r) {
        return a.apply(this, arguments);
    }), d = (s = m(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, g.getServerById(r.query.id);

              case 8:
                return a = e.sent, e.abrupt("return", t.status(200).send(a));

              case 12:
                if (e.prev = 12, e.t0 = e.catch(5), "id does not exist" !== e.t0.message) {
                    e.next = 16;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 16:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 12 ] ]);
    })), function(e, r) {
        return s.apply(this, arguments);
    }), f = (u = m(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, i, c;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r.query.ids)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "array expected"
                }));

              case 2:
                n = !0, a = !1, s = void 0, e.prev = 6, u = r.query.ids[Symbol.iterator]();

              case 8:
                if (n = (o = u.next()).done) {
                    e.next = 16;
                    break;
                }
                if (i = o.value, x.isUUID(i)) {
                    e.next = 12;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "uuid expected"
                }));

              case 12:
              case 13:
                n = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), a = !0, s = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !n && u.return && u.return();

              case 25:
                if (e.prev = 25, !a) {
                    e.next = 28;
                    break;
                }
                throw s;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, g.getServersByIds(r.query.ids);

              case 34:
                return c = e.sent, e.abrupt("return", t.status(200).send(c));

              case 38:
                return e.prev = 38, e.t1 = e.catch(31), e.abrupt("return", t.status(500).send({
                    error: e.t1
                }));

              case 41:
              case 42:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 38 ] ]);
    })), function(e, r) {
        return u.apply(this, arguments);
    }), l = (o = m(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, g.getAllServers();

              case 3:
                return n = e.sent, e.abrupt("return", t.status(200).send(n));

              case 7:
                return e.prev = 7, e.t0 = e.catch(0), e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 10:
              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 7 ] ]);
    })), function(e, r) {
        return o.apply(this, arguments);
    }), h = (i = m(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkBody("id", "Invalid id").isUUID(), r.sanitizeBody("ipAddressOrDomainName").trim(), 
                r.checkBody("ipAddressOrDomainName", "Invalid ip address or domain name").isIPorFQDN(), 
                !(n = r.validationErrors())) {
                    e.next = 6;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 6:
                return e.prev = 7, e.next = 10, g.updateServer(r.body);

              case 10:
                return e.abrupt("return", t.status(200).end());

              case 13:
                if (e.prev = 13, e.t0 = e.catch(7), "id does not exist" !== e.t0.message) {
                    e.next = 19;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 19:
                if ("server already exists" !== e.t0.message) {
                    e.next = 21;
                    break;
                }
                return e.abrupt("return", t.status(409).end());

              case 21:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 23:
              case 24:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 7, 13 ] ]);
    })), function(e, r) {
        return i.apply(this, arguments);
    });
    function m(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var x = t(1), g = t(40);
    t(0)("server:controller");
    e.exports.addServer = c, e.exports.deleteServer = p, e.exports.getServerById = d, 
    e.exports.getServersByIds = f, e.exports.getAllServers = l, e.exports.updateServer = h;
}, function(e, r, t) {
    "use strict";
    var n = t(2)(), a = t(5);
    e.exports = n;
    var s = t(77);
    n.post("/", a.adminAuth, s.addServer), n.delete("/", a.adminAuth, s.deleteServer), 
    n.get("/", a.adminAuth, s.getServerById), n.get("/servers", a.adminAuth, s.getServersByIds), 
    n.get("/all", a.adminAuth, s.getAllServers), n.put("/", a.adminAuth, s.updateServer);
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c, p, d, f = (n = b(regeneratorRuntime.mark(function e(r) {
        var t, n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, U.getEmailUserByUsername(r.username);

              case 5:
                if (!e.sent) {
                    e.next = 7;
                    break;
                }
                throw new Error("user already exists");

              case 7:
                return t = new A(r), e.next = 11, U.addEmailUser(t);

              case 11:
                return n = e.sent, e.abrupt("return", n);

              case 13:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return n.apply(this, arguments);
    }), l = (a = b(regeneratorRuntime.mark(function e(r) {
        var t, n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, U.getEmailUserByUsername(r.username);

              case 5:
                if (t = e.sent) {
                    e.next = 8;
                    break;
                }
                throw new Error("username does not exist");

              case 8:
                if (!R.compareSync(r.password, t.hashedPassword)) {
                    e.next = 17;
                    break;
                }
                return n = new Date().getTime(), e.next = 14, U.updateLastLoginTime(t, n);

              case 14:
                return e.abrupt("return", t);

              case 17:
                throw new Error("invalid password");

              case 18:
              case 19:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return a.apply(this, arguments);
    }), h = (s = b(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, U.getEmailUserByUsername(r);

              case 5:
                if (t = e.sent) {
                    e.next = 8;
                    break;
                }
                throw new Error("username does not exist");

              case 8:
                if (!((n = new Date().getTime()) < t.tokenCreatedTime + 6e5)) {
                    e.next = 12;
                    break;
                }
                throw new Error("reset password email already sent");

              case 12:
                return a = "Reset password", s = I.randomBytes(16).toString("hex"), e.next = 16, 
                E.sendEmail(r, a, s);

              case 16:
                return e.next = 18, U.updateResetPasswordToken(t, s, n);

              case 18:
                return e.abrupt("return", e.sent);

              case 19:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return s.apply(this, arguments);
    }), m = (u = b(regeneratorRuntime.mark(function e(r, t, n) {
        var a, s, u;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && t && n) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, U.getEmailUserByUsername(r);

              case 5:
                if ((a = e.sent) && t === a.resetPasswordToken) {
                    e.next = 8;
                    break;
                }
                throw new Error("password reset not permitted");

              case 8:
                if (!(new Date().getTime() > a.tokenCreatedTime + 18e5)) {
                    e.next = 12;
                    break;
                }
                throw new Error("token too old");

              case 12:
                return e.next = 15, R.hash(n, 10);

              case 15:
                return s = e.sent, a.hashedPassword = s, a.resetPasswordToken = null, a.tokenCreatedTime = null, 
                e.next = 21, U.updatePassword(a);

              case 21:
                return u = e.sent, e.abrupt("return", u);

              case 23:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e, r, t) {
        return u.apply(this, arguments);
    }), x = (o = b(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r && k.isUUID(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (t && "string" == typeof t) {
                    e.next = 5;
                    break;
                }
                throw new Error("illegal argument");

              case 5:
                return e.next = 8, g(r);

              case 8:
                return n = e.sent, e.next = 11, R.hash(t, 10);

              case 11:
                return a = e.sent, n.hashedPassword = a, n.resetPasswordToken = null, n.tokenCreatedTime = null, 
                e.next = 17, U.updatePassword(n);

              case 17:
                return s = e.sent, e.abrupt("return", s);

              case 19:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e, r) {
        return o.apply(this, arguments);
    }), g = (i = b(regeneratorRuntime.mark(function e(r) {
        var t;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, U.getEmailUserById(r);

              case 5:
                if (t = e.sent) {
                    e.next = 8;
                    break;
                }
                throw new Error("id does not exist");

              case 8:
                return e.abrupt("return", t);

              case 9:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return i.apply(this, arguments);
    }), w = (c = b(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u, o;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r)) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                t = !0, n = !1, a = void 0, e.prev = 6, s = r[Symbol.iterator]();

              case 8:
                if (t = (u = s.next()).done) {
                    e.next = 16;
                    break;
                }
                if (o = u.value, k.isUUID(o)) {
                    e.next = 12;
                    break;
                }
                throw new Error("illegal argument");

              case 12:
              case 13:
                t = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), n = !0, a = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !t && s.return && s.return();

              case 25:
                if (e.prev = 25, !n) {
                    e.next = 28;
                    break;
                }
                throw a;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.next = 33, U.getEmailUsersByIds(r);

              case 33:
                return e.abrupt("return", e.sent);

              case 34:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
    })), function(e) {
        return c.apply(this, arguments);
    }), v = (p = b(regeneratorRuntime.mark(function e(r) {
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                return e.next = 5, U.deleteEmailUserById(r);

              case 5:
                return e.abrupt("return", e.sent);

              case 6:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return p.apply(this, arguments);
    }), y = (d = b(regeneratorRuntime.mark(function e(r) {
        var t, n, a, s, u;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r) {
                    e.next = 2;
                    break;
                }
                throw new Error("illegal argument");

              case 2:
                if (t = r.id, n = r.role, a = r.email, s = r.hashedPassword, t && k.isUUID(t)) {
                    e.next = 6;
                    break;
                }
                throw new Error("illegal argument");

              case 6:
                if (n && "string" == typeof n && k.isIn(n, [ "admin", "user" ])) {
                    e.next = 9;
                    break;
                }
                throw new Error("illegal argument");

              case 9:
                if (!a) {
                    e.next = 14;
                    break;
                }
                if ("string" == typeof a && k.isEmail(a)) {
                    e.next = 13;
                    break;
                }
                throw new Error("illegal argument");

              case 13:
              case 14:
                return e.next = 17, g(t);

              case 17:
                if (u = e.sent) {
                    e.next = 20;
                    break;
                }
                throw new Error("id does not exist");

              case 20:
                return e.next = 23, U.getEmailUserByUsername(a);

              case 23:
                if (!e.sent) {
                    e.next = 25;
                    break;
                }
                throw new Error("user already exists");

              case 25:
                return u.role = n, u.email = a, u.username = a, u.hashedPassword = s, e.next = 32, 
                U.updateEmailUser(u);

              case 32:
              case "end":
                return e.stop();
            }
        }, e, this);
    })), function(e) {
        return d.apply(this, arguments);
    });
    function b(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var k = t(1), I = t(24), R = t(45), E = t(23), A = t(11), U = t(41);
    t(0)("emailUser:service");
    e.exports.addEmailUser = f, e.exports.emailUserLogin = l, e.exports.sendResetPasswordEmail = h, 
    e.exports.resetPassword = m, e.exports.changePasswordById = x, e.exports.getEmailUser = g, 
    e.exports.getEmailUsersByIds = w, e.exports.deleteEmailUser = v, e.exports.updateEmailUser = y;
}, function(e, r) {
    e.exports = require("nodemailer");
}, function(e, r) {
    e.exports = require("jsonwebtoken");
}, function(e, r, t) {
    "use strict";
    var n, a, s, u, o, i, c, p, d, f = (n = b(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.sanitizeBody("role").trim(), r.checkBody("role").isIn([ "admin", "user" ]), 
                r.sanitizeBody("email").trim(), r.sanitizeBody("email").normalizeEmail({
                    lowercase: !0
                }), r.checkBody("email", "Invalid email").trim().notEmpty().isEmail(), r.checkBody("password", "Invalid password").notEmpty(), 
                !(n = r.validationErrors())) {
                    e.next = 9;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 9:
                return e.prev = 9, e.next = 12, I.hash(r.body.password, 10);

              case 12:
                return r.body.hashedPassword = e.sent, a = new A(r.body), e.next = 16, E.addEmailUser(a);

              case 16:
                return s = e.sent, e.abrupt("return", t.status(201).send({
                    id: s.id
                }));

              case 20:
                if (e.prev = 20, e.t0 = e.catch(9), "user already exists" !== e.t0.message) {
                    e.next = 24;
                    break;
                }
                return e.abrupt("return", t.status(409).end());

              case 24:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 25:
              case 26:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 9, 20 ] ]);
    })), function(e, r) {
        return n.apply(this, arguments);
    }), l = (a = b(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, i, c;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.sanitizeBody("username").trim(), r.sanitizeBody("username").normalizeEmail({
                    lowercase: !0
                }), r.checkBody("username", "Invalid email").trim().notEmpty().isEmail(), r.checkBody("password", "Invalid password").notEmpty(), 
                !(n = r.validationErrors())) {
                    e.next = 7;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 7:
                return e.prev = 7, a = r.body, e.next = 11, E.emailUserLogin(a);

              case 11:
                return s = e.sent, u = {
                    id: s.id,
                    role: s.role
                }, o = R.signTokens(u), i = o.token, c = o.refreshToken, e.abrupt("return", t.status(201).send({
                    token: i,
                    refreshToken: c
                }));

              case 17:
                if (e.prev = 17, e.t0 = e.catch(7), "username does not exist" !== e.t0.message && "invalid password" !== e.t0.message) {
                    e.next = 21;
                    break;
                }
                return e.abrupt("return", t.status(401).end());

              case 21:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 22:
              case 23:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 7, 17 ] ]);
    })), function(e, r) {
        return a.apply(this, arguments);
    }), h = (s = b(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.sanitizeBody("username").trim(), r.sanitizeBody("username").normalizeEmail({
                    lowercase: !0
                }), r.checkBody("username", "Invalid email").trim().notEmpty().isEmail(), !(n = r.validationErrors())) {
                    e.next = 6;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 6:
                return e.prev = 6, e.next = 9, E.sendResetPasswordEmail(r.body.username);

              case 9:
                return e.abrupt("return", t.status(201).end());

              case 12:
                if (e.prev = 12, e.t0 = e.catch(6), "username does not exist" !== e.t0.message) {
                    e.next = 16;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 16:
                if ("reset password email already sent" !== e.t0.message) {
                    e.next = 19;
                    break;
                }
                return e.abrupt("return", t.status(429).end());

              case 19:
                if ("send email failed" !== e.t0.message) {
                    e.next = 22;
                    break;
                }
                return e.abrupt("return", t.status(424).end());

              case 22:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 24:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 12 ] ]);
    })), function(e, r) {
        return s.apply(this, arguments);
    }), m = (u = b(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.sanitizeBody("username").trim(), r.sanitizeBody("username").normalizeEmail({
                    lowercase: !0
                }), r.checkBody("username", "Invalid email").trim().notEmpty().isEmail(), r.sanitizeBody("token").trim(), 
                r.checkBody("token", "Invalid email").trim().notEmpty(), r.checkBody("password", "Invalid password").notEmpty(), 
                !(n = r.validationErrors())) {
                    e.next = 9;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 9:
                return e.prev = 9, a = r.body.username, s = r.body.token, u = r.body.password, e.next = 15, 
                E.resetPassword(a, s, u);

              case 15:
                return e.abrupt("return", t.status(201).end());

              case 18:
                if (e.prev = 18, e.t0 = e.catch(9), "password reset not permitted" !== e.t0.message) {
                    e.next = 22;
                    break;
                }
                return e.abrupt("return", t.status(401).end());

              case 22:
                if ("token too old" !== e.t0.message) {
                    e.next = 25;
                    break;
                }
                return e.abrupt("return", t.status(409).end());

              case 25:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 27:
              case 28:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 9, 18 ] ]);
    })), function(e, r) {
        return u.apply(this, arguments);
    }), x = (o = b(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.sanitizeBody("id").trim(), r.checkBody("id", "Invalid id").isUUID(), r.checkBody("password", "Invalid password").notEmpty(), 
                !(n = r.validationErrors())) {
                    e.next = 6;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 6:
                return e.prev = 6, a = r.body.id, s = r.body.password, e.next = 11, E.changePasswordById(a, s);

              case 11:
                return e.abrupt("return", t.status(201).end());

              case 14:
                if (e.prev = 14, e.t0 = e.catch(6), "id does not exist" !== e.t0.message) {
                    e.next = 18;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 18:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 20:
              case 21:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 14 ] ]);
    })), function(e, r) {
        return o.apply(this, arguments);
    }), g = (i = b(regeneratorRuntime.mark(function e(r, t) {
        var n, a;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, E.getEmailUser(r.query.id);

              case 8:
                return delete (a = e.sent).password, delete a.hashedPassword, delete a.resetPasswordToken, 
                delete a.tokenCreatedTime, e.abrupt("return", t.status(200).send(a));

              case 16:
                if (e.prev = 16, e.t0 = e.catch(5), "id does not exist" !== e.t0.message) {
                    e.next = 20;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 20:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 22:
              case 23:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 16 ] ]);
    })), function(e, r) {
        return i.apply(this, arguments);
    }), w = (c = b(regeneratorRuntime.mark(function e(r, t) {
        var n, a, s, u, o, i, c;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (Array.isArray(r.query.ids)) {
                    e.next = 2;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "array expected"
                }));

              case 2:
                n = !0, a = !1, s = void 0, e.prev = 6, u = r.query.ids[Symbol.iterator]();

              case 8:
                if (n = (o = u.next()).done) {
                    e.next = 16;
                    break;
                }
                if (i = o.value, k.isUUID(i)) {
                    e.next = 12;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: "uuid expected"
                }));

              case 12:
              case 13:
                n = !0, e.next = 8;
                break;

              case 16:
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(6), a = !0, s = e.t0;

              case 22:
                e.prev = 22, e.prev = 23, !n && u.return && u.return();

              case 25:
                if (e.prev = 25, !a) {
                    e.next = 28;
                    break;
                }
                throw s;

              case 28:
                return e.finish(25);

              case 29:
                return e.finish(22);

              case 30:
                return e.prev = 31, e.next = 34, E.getEmailUsersByIds(r.query.ids);

              case 34:
                return c = e.sent, e.abrupt("return", t.status(200).send(c));

              case 38:
                return e.prev = 38, e.t1 = e.catch(31), e.abrupt("return", t.status(500).send({
                    error: e.t1
                }));

              case 41:
              case 42:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 6, 18, 22, 30 ], [ 23, , 25, 29 ], [ 31, 38 ] ]);
    })), function(e, r) {
        return c.apply(this, arguments);
    }), v = (p = b(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkQuery("id", "Invalid id").isUUID(), !(n = r.validationErrors())) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 4:
                return e.prev = 5, e.next = 8, E.deleteEmailUser(r.query.id);

              case 8:
                return e.abrupt("return", t.status(204).end());

              case 11:
                if (e.prev = 11, e.t0 = e.catch(5), "emailUser is referenced" !== e.t0.message) {
                    e.next = 15;
                    break;
                }
                return e.abrupt("return", t.status(409).end());

              case 15:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 17:
              case 18:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 5, 11 ] ]);
    })), function(e, r) {
        return p.apply(this, arguments);
    }), y = (d = b(regeneratorRuntime.mark(function e(r, t) {
        var n;
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (r.checkBody("id", "Invalid id").isUUID(), r.sanitizeBody("role").trim(), r.checkBody("role").isIn([ "admin", "user" ]), 
                r.sanitizeBody("email").trim(), r.sanitizeBody("email").normalizeEmail({
                    lowercase: !0
                }), r.checkBody("email", "Invalid email").trim().notEmpty().isEmail(), r.checkBody("password", "Invalid password").notEmpty(), 
                !(n = r.validationErrors())) {
                    e.next = 10;
                    break;
                }
                return e.abrupt("return", t.status(400).send({
                    error: n
                }));

              case 10:
                return e.prev = 11, e.next = 14, I.hash(r.body.password, 10);

              case 14:
                return r.body.hashedPassword = e.sent, e.next = 17, E.updateEmailUser(r.body);

              case 17:
                return e.abrupt("return", t.status(200).end());

              case 20:
                if (e.prev = 20, e.t0 = e.catch(11), "id does not exist" !== e.t0.message) {
                    e.next = 26;
                    break;
                }
                return e.abrupt("return", t.status(404).end());

              case 26:
                if ("user already exists" !== e.t0.message) {
                    e.next = 28;
                    break;
                }
                return e.abrupt("return", t.status(409).end());

              case 28:
                return e.abrupt("return", t.status(500).send({
                    error: e.t0
                }));

              case 29:
              case 30:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 11, 20 ] ]);
    })), function(e, r) {
        return d.apply(this, arguments);
    });
    function b(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                return function n(a, s) {
                    try {
                        var u = r[a](s), o = u.value;
                    } catch (e) {
                        return void t(e);
                    }
                    if (!u.done) return Promise.resolve(o).then(function(e) {
                        n("next", e);
                    }, function(e) {
                        n("throw", e);
                    });
                    e(o);
                }("next");
            });
        };
    }
    var k = t(1), I = t(45), R = t(44), E = t(79), A = t(11);
    t(0)("emailUser:controller");
    e.exports.addEmailUser = f, e.exports.emailUserLogin = l, e.exports.sendResetPasswordEmail = h, 
    e.exports.resetPassword = m, e.exports.changePasswordById = x, e.exports.getEmailUser = g, 
    e.exports.getEmailUsersByIds = w, e.exports.deleteEmailUser = v, e.exports.updateEmailUser = y;
}, function(e, r, t) {
    "use strict";
    var n = t(2)(), a = t(5);
    e.exports = n;
    var s = t(82);
    n.post("/", a.userAuth, s.addEmailUser), n.get("/", a.userAuth, s.getEmailUser), 
    n.delete("/", a.userAuth, s.deleteEmailUser), n.get("/email_users", a.userAuth, s.getEmailUsersByIds), 
    n.put("/", a.userAuth, s.updateEmailUser), n.post("/login", s.emailUserLogin), n.post("/password", a.userAuth, s.sendResetPasswordEmail), 
    n.post("/password/reset", a.userAuth, s.resetPassword), n.post("/password/change", a.userAuth, s.changePasswordById);
}, function(e, r, t) {
    "use strict";
    var n = t(2)(), a = t(5);
    e.exports = n;
    var s = t(83);
    n.use("/email_user", s);
    var u = t(44);
    n.get("/", a.userAuth, u.getUserById), n.get("/users", a.userAuth, u.getUsersByIds), 
    n.get("/all", a.userAuth, u.getAllUsers), n.get("/admin/all", a.userAuth, u.getAllAdmins), 
    n.get("/refresh_token", u.refreshToken), n.post("/invalidate_refresh_token", u.invalidateRefreshToken);
}, function(e, r) {
    e.exports = require("passport-jwt");
}, function(e, r) {
    e.exports = require("express-rate-limit");
}, function(e, r) {
    e.exports = require("express-validator");
}, function(e, r) {
    e.exports = require("body-parser");
}, function(e, r, t) {
    "use strict";
    var n = t(24), a = t(2)(), s = t(88), u = t(87), o = t(1), i = t(86), c = t(46), p = t(85), d = p.Strategy, f = p.ExtractJwt;
    global.RATE_LIMIT = process.env.RATE_LIMIT, global.JWT_SECRET = n.createHash("sha256").update(process.env.JWT_SECRET + "W93Cio30vmbj0W823K9m20s2i@WkwoiK").digest("hex"), 
    global.REFRESH_JWT_SECRET = n.createHash("sha256").update(global.JWT_SECRET + "W93Cio30vmb928EKSOEW!OIWsue02weg220s2i@WkwoiK").digest("hex");
    var l = {
        jwtFromRequest: f.fromAuthHeaderAsBearerToken(),
        secretOrKey: global.JWT_SECRET
    };
    if (c.use(new d(l, function(e, r) {
        return r(null, {
            id: e.id,
            role: e.role
        });
    })), global.RATE_LIMIT && !isNaN(global.RATE_LIMIT) && !Number.isInteger(global.RATE_LIMIT)) {
        var h = new i({
            windowMs: 9e5,
            max: global.RATE_LIMIT,
            delayMs: 0
        });
        a.use(h);
    }
    a.use(s.json()), a.use(s.urlencoded({
        extended: !0
    }));
    var m = {
        customValidators: {
            isIPorFQDN: function(e) {
                return o.isIP(e) || o.isFQDN(e);
            }
        }
    };
    a.use(u(m));
    var x = t(84);
    a.use("/user", x);
    var g = t(78);
    a.use("/server", g);
    var w = t(76);
    a.use("/node", w);
    var v = t(71);
    a.use("/product", v);
    var y = t(69);
    a.use("/payment", y);
    var b = t(61);
    a.use("/purchase", b);
    var k = t(59);
    a.use("/account", k);
    var I = t(56);
    a.use("/traffic", I);
    var R = t(52);
    a.use("/monitor", R), e.exports = a;
}, function(e, r) {
    e.exports = require("compression");
}, function(e, r) {
    e.exports = require("https");
}, function(e, r) {
    e.exports = require("http");
}, function(e, r) {
    e.exports = require("ejs");
}, function(e, r, t) {
    "use strict";
    t(48).config();
    var n = t(2), a = n(), s = t(93), u = t(92), o = t(91), i = t(47), c = void 0, p = void 0;
    try {
        c = i.readFileSync("./server.key", "utf8"), p = i.readFileSync("./server.cert", "utf8");
    } catch (e) {
        console.error("reading ./server.key or ./server.cert failed. err =", e), process.exit(1);
    }
    var d = {
        key: c,
        cert: p
    }, f = void 0;
    try {
        f = o.createServer(d, a);
    } catch (e) {
        console.error("ssl key and/or certificate error corrupted"), process.exit(2);
    }
    a.use(function(e, r, t) {
        e.secure ? t() : r.redirect("https://" + e.headers.host + e.url);
    }), a.enable("trust proxy");
    var l = t(90);
    a.use(l());
    var h = t(89);
    a.use("/api", h), a.engine(".html", s.__express), a.engine(".js", s.__express), 
    a.set("view engine", "html"), a.set("views", "./ui"), a.use("/ui", n.static("./ui")), 
    a.use("/node_modules", n.static(".//node_modules")), a.get("/favicon.png", function(e, r) {
        r.sendFile("./ui/assets/img/favicon.png", {
            root: "./"
        });
    });
    var m = t(49).manifest;
    a.get("/manifest.json", function(e, r) {
        r.json(m);
    });
    var x = function(e, r) {
        r.render("index");
    };
    a.get("/", x), a.get(/^\/home\//, x), a.get(/^\/user\//, x), a.get(/^\/admin\//, x), 
    u.createServer(a).listen(80).on("error", function(e) {
        console.error("This app requires root privilege to listen on port 80. " + e), process.exit(3);
    }), f.listen(443).on("error", function(e) {
        console.error("This app requires root privilege to listen on port 443. " + e), process.exit(4);
    }), e.exports = a;
}, function(e, r) {
    e.exports = require("babel-polyfill");
}, function(e, r, t) {
    t(95), e.exports = t(94);
} ]);