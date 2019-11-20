/*
Taken from Weboas.is which uses the MPL 2.0 license.
"This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/."

Thanks!
*/

(function() {
    "use strict";

    function a(a) {
        return a += "", a.charAt(0).toUpperCase() + a.slice(1)
    }

    function b(a, b, c) {
        var e = {
            "10.0": "10",
            6.4: "10 Technical Preview",
            6.3: "8.1",
            6.2: "8",
            6.1: "Server 2008 R2 / 7",
            "6.0": "Server 2008 / Vista",
            5.2: "Server 2003 / XP 64-bit",
            5.1: "XP",
            5.01: "2000 SP1",
            "5.0": "2000",
            "4.0": "NT",
            "4.90": "ME"
        };
        return b && c && /^Win/i.test(a) && !/^Windows Phone /i.test(a) && (e = e[/[\d.]+$/.exec(a)]) && (a = "Windows " + e), a += "", b && c && (a = a.replace(RegExp(b, "i"), c)), a = d(a.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]), a
    }

    function c(a, b) {
        var c = -1,
            d = a ? a.length : 0;
        if ("number" == typeof d && -1 < d && d <= 9007199254740991)
            for (; ++c < d;) b(a[c], c, a);
        else e(a, b)
    }

    function d(b) {
        return b = j(b), /^(?:webOS|i(?:OS|P))/.test(b) ? b : a(b)
    }

    function e(a, b) {
        for (var c in a) v.call(a, c) && b(a[c], c, a)
    }

    function f(b) {
        return null == b ? a(b) : w.call(b).slice(8, -1)
    }

    function g(a, b) {
        var c = null == a ? "number" : typeof a[b];
        return !/^(?:boolean|number|string|undefined)$/.test(c) && ("object" != c || !!a[b])
    }

    function h(a) {
        return (a + "").replace(/([ -])(?!$)/g, "$1?")
    }

    function i(a, b) {
        var d = null;
        return c(a, function(c, e) {
            d = b(d, c, e, a)
        }), d
    }

    function j(a) {
        return (a + "").replace(/^ +| +$/g, "")
    }

    function k(a) {
        function c(b) {
            return i(b, function(b, c) {
                var e = c.pattern || h(c);
                return !b && (b = RegExp("\\b" + e + " *\\d+[.\\w_]*", "i").exec(a) || RegExp("\\b" + e + " *\\w+-[\\w]*", "i").exec(a) || RegExp("\\b" + e + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(a)) && ((b = ((c.label && !RegExp(e, "i").test(c.label) ? c.label : b) + "").split("/"))[1] && !/[\d.]+/.test(b[0]) && (b[0] += " " + b[1]), c = c.label || c, b = d(b[0].replace(RegExp(e, "i"), c).replace(RegExp("; *(?:" + c + "[_-])?", "i"), " ").replace(RegExp("(" + c + ")[-_.]?(\\w)", "i"), "$1 $2"))), b
            })
        }
        var l = m,
            n = a && "object" == typeof a && "String" != f(a);
        n && (l = a, a = null);
        var o = l.navigator || {},
            p = o.userAgent || "";
        a || (a = p);
        var q, r, t = n ? !!o.likeChrome : /\bChrome\b/.test(a) && !/internal|\n/i.test(w.toString()),
            u = "Object",
            v = n ? u : "ScriptBridgingProxyObject",
            x = n ? u : "Environment",
            y = n && l.java ? "JavaPackage" : f(l.java),
            z = n ? u : "RuntimeObject",
            A = /\bJava/.test(y) && l.java,
            B = A && f(l.environment) == x,
            C = A ? "a" : "\u03B1",
            D = A ? "b" : "\u03B2",
            E = l.document || {},
            F = l.operamini || l.opera,
            G = s.test(G = n && F ? F["[[Class]]"] : f(F)) ? G : F = null,
            H = a,
            I = [],
            J = null,
            K = a == p,
            L = K && F && "function" == typeof F.version && F.version(),
            M = function(b) {
                return i(b, function(b, c) {
                    return b || RegExp("\\b" + (c.pattern || h(c)) + "\\b", "i").exec(a) && (c.label || c)
                })
            }([{
                label: "EdgeHTML",
                pattern: "(?:Edge|EdgA|EdgiOS)"
            }, "Trident", {
                label: "WebKit",
                pattern: "AppleWebKit"
            }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]),
            N = function(b) {
                return i(b, function(b, c) {
                    return b || RegExp("\\b" + (c.pattern || h(c)) + "\\b", "i").exec(a) && (c.label || c)
                })
            }(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
                label: "Microsoft Edge",
                pattern: "(?:Edge|Edg|EdgA|EdgiOS)"
            }, "Midori", "Nook Browser", "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
                label: "Samsung Internet",
                pattern: "SamsungBrowser"
            }, "SeaMonkey", {
                label: "Silk",
                pattern: "(?:Cloud9|Silk-Accelerated)"
            }, "Sleipnir", "SlimBrowser", {
                label: "SRWare Iron",
                pattern: "Iron"
            }, "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
                label: "Opera Mini",
                pattern: "OPiOS"
            }, "Opera", {
                label: "Opera",
                pattern: "OPR"
            }, "Chrome", {
                label: "Chrome Mobile",
                pattern: "(?:CriOS|CrMo)"
            }, {
                label: "Firefox",
                pattern: "(?:Firefox|Minefield)"
            }, {
                label: "Firefox for iOS",
                pattern: "FxiOS"
            }, {
                label: "IE",
                pattern: "IEMobile"
            }, {
                label: "IE",
                pattern: "MSIE"
            }, "Safari"]),
            O = c([{
                label: "BlackBerry",
                pattern: "BB10"
            }, "BlackBerry", {
                label: "Galaxy S",
                pattern: "GT-I9000"
            }, {
                label: "Galaxy S2",
                pattern: "GT-I9100"
            }, {
                label: "Galaxy S3",
                pattern: "GT-I9300"
            }, {
                label: "Galaxy S4",
                pattern: "GT-I9500"
            }, {
                label: "Galaxy S5",
                pattern: "SM-G900"
            }, {
                label: "Galaxy S6",
                pattern: "SM-G920"
            }, {
                label: "Galaxy S6 Edge",
                pattern: "SM-G925"
            }, {
                label: "Galaxy S7",
                pattern: "SM-G930"
            }, {
                label: "Galaxy S7 Edge",
                pattern: "SM-G935"
            }, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
                label: "Kindle Fire",
                pattern: "(?:Cloud9|Silk-Accelerated)"
            }, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
                label: "Wii U",
                pattern: "WiiU"
            }, "Wii", "Xbox One", {
                label: "Xbox 360",
                pattern: "Xbox"
            }, "Xoom"]),
            P = function(b) {
                return i(b, function(b, c, d) {
                    return b || (c[O] || c[/^[a-z]+(?: +[a-z]+\b)*/i.exec(O)] || RegExp("\\b" + h(d) + "(?:\\b|\\w*\\d)", "i").exec(a)) && d
                })
            }({
                Apple: {
                    iPad: 1,
                    iPhone: 1,
                    iPod: 1
                },
                Archos: {},
                Amazon: {
                    Kindle: 1,
                    "Kindle Fire": 1
                },
                Asus: {
                    Transformer: 1
                },
                "Barnes & Noble": {
                    Nook: 1
                },
                BlackBerry: {
                    PlayBook: 1
                },
                Google: {
                    "Google TV": 1,
                    Nexus: 1
                },
                HP: {
                    TouchPad: 1
                },
                HTC: {},
                LG: {},
                Microsoft: {
                    Xbox: 1,
                    "Xbox One": 1
                },
                Motorola: {
                    Xoom: 1
                },
                Nintendo: {
                    "Wii U": 1,
                    Wii: 1
                },
                Nokia: {
                    Lumia: 1
                },
                Samsung: {
                    "Galaxy S": 1,
                    "Galaxy S2": 1,
                    "Galaxy S3": 1,
                    "Galaxy S4": 1
                },
                Sony: {
                    PlayStation: 1,
                    "PlayStation Vita": 1
                }
            }),
            Q = function(c) {
                return i(c, function(c, d) {
                    var e = d.pattern || h(d);
                    return !c && (c = RegExp("\\b" + e + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(a)) && (c = b(c, e, d.label || d)), c
                })
            }(["Windows Phone", "Android", "CentOS", {
                label: "Chrome OS",
                pattern: "CrOS"
            }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
        if (M && (M = [M]), P && !O && (O = c([P])), (q = /\bGoogle TV\b/.exec(O)) && (O = q[0]), /\bSimulator\b/i.test(a) && (O = (O ? O + " " : "") + "Simulator"), "Opera Mini" == N && /\bOPiOS\b/.test(a) && I.push("running in Turbo/Uncompressed mode"), "IE" == N && /\blike iPhone OS\b/.test(a) ? (q = k(a.replace(/like iPhone OS/, "")), P = q.manufacturer, O = q.product) : /^iP/.test(O) ? (N || (N = "Safari"), Q = "iOS" + ((q = / OS ([\d_]+)/i.exec(a)) ? " " + q[1].replace(/_/g, ".") : "")) : "Konqueror" != N || /buntu/i.test(Q) ? P && "Google" != P && (/Chrome/.test(N) && !/\bMobile Safari\b/i.test(a) || /\bVita\b/.test(O)) || /\bAndroid\b/.test(Q) && /^Chrome/.test(N) && /\bVersion\//i.test(a) ? (N = "Android Browser", Q = /\bAndroid\b/.test(Q) ? Q : "Android") : "Silk" == N ? (!/\bMobi/i.test(a) && (Q = "Android", I.unshift("desktop mode")), /Accelerated *= *true/i.test(a) && I.unshift("accelerated")) : "PaleMoon" == N && (q = /\bFirefox\/([\d.]+)\b/.exec(a)) ? I.push("identifying as Firefox " + q[1]) : "Firefox" == N && (q = /\b(Mobile|Tablet|TV)\b/i.exec(a)) ? (Q || (Q = "Firefox OS"), O || (O = q[1])) : !N || (q = !/\bMinefield\b/i.test(a) && /\b(?:Firefox|Safari)\b/.exec(N)) ? (N && !O && /[\/,]|^[^(]+?\)/.test(a.slice(a.indexOf(q + "/") + 8)) && (N = null), (q = O || P || Q) && (O || P || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(Q)) && (N = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(Q) ? Q : q) + " Browser")) : "Electron" == N && (q = (/\bChrome\/([\d.]+)\b/.exec(a) || 0)[1]) && I.push("Chromium " + q) : Q = "Kubuntu", L || (L = function(b) {
                return i(b, function(b, c) {
                    return b || (RegExp(c + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(a) || 0)[1] || null
                })
            }(["(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", h(N), "(?:Firefox|Minefield|NetFront)"])), (q = "iCab" == M && 3 < parseFloat(L) && "WebKit" || /\bOpera\b/.test(N) && (/\bOPR\b/.test(a) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(a) && !/^(?:Trident|EdgeHTML)$/.test(M) && "WebKit" || !M && /\bMSIE\b/i.test(a) && ("Mac OS" == Q ? "Tasman" : "Trident") || "WebKit" == M && /\bPlayStation\b(?! Vita\b)/i.test(N) && "NetFront") && (M = [q]), "IE" == N && (q = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(a) || 0)[1]) ? (N += " Mobile", Q = "Windows Phone " + (/\+$/.test(q) ? q : q + ".x"), I.unshift("desktop mode")) : /\bWPDesktop\b/i.test(a) ? (N = "IE Mobile", Q = "Windows Phone 8.x", I.unshift("desktop mode"), L || (L = (/\brv:([\d.]+)/.exec(a) || 0)[1])) : "IE" != N && "Trident" == M && (q = /\brv:([\d.]+)/.exec(a)) && (N && I.push("identifying as " + N + (L ? " " + L : "")), N = "IE", L = q[1]), K) {
            if (!g(l, "global")) f(q = l.runtime) == v ? (N = "Adobe AIR", Q = q.flash.system.Capabilities.os) : f(q = l.phantom) == z ? (N = "PhantomJS", L = (q = q.version || null) && q.major + "." + q.minor + "." + q.patch) : "number" == typeof E.documentMode && (q = /\bTrident\/(\d+)/i.exec(a)) ? (L = [L, E.documentMode], (q = +q[1] + 4) != L[1] && (I.push("IE " + L[1] + " mode"), M && (M[1] = ""), L[1] = q), L = "IE" == N ? L[1].toFixed(1) + "" : L[0]) : "number" == typeof E.documentMode && /^(?:Chrome|Firefox)\b/.test(N) && (I.push("masking as " + N + " " + L), N = "IE", L = "11.0", M = ["Trident"], Q = "Windows");
            else if (A && (q = A.lang.System, H = q.getProperty("os.arch"), Q = Q || q.getProperty("os.name") + " " + q.getProperty("os.version")), B) {
                try {
                    L = l.require("ringo/engine").version.join("."), N = "RingoJS"
                } catch (a) {
                    (q = l.system) && q.global.system == l.system && (N = "Narwhal", Q || (Q = q[0].os || null))
                }
                N || (N = "Rhino")
            } else "object" == typeof l.process && !l.process.browser && (q = l.process) && ("object" == typeof q.versions && ("string" == typeof q.versions.electron ? (I.push("Node " + q.versions.node), N = "Electron", L = q.versions.electron) : "string" == typeof q.versions.nw && (I.push("Chromium " + L, "Node " + q.versions.node), N = "NW.js", L = q.versions.nw)), N || (N = "Node.js", H = q.arch, Q = q.platform, L = /[\d.]+/.exec(q.version), L = L ? L[0] : null));
            Q = Q && d(Q)
        }
        if (L && (q = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(L) || /(?:alpha|beta)(?: ?\d)?/i.exec(a + ";" + (K && o.appMinorVersion)) || /\bMinefield\b/i.test(a) && "a") && (J = /b/i.test(q) ? "beta" : "alpha", L = L.replace(RegExp(q + "\\+?$"), "") + ("beta" == J ? D : C) + (/\d+\+?/.exec(q) || "")), "Fennec" == N || "Firefox" == N && /\b(?:Android|Firefox OS)\b/.test(Q)) N = "Firefox Mobile";
        else if ("Maxthon" == N && L) L = L.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(O)) "Xbox 360" == O && (Q = null), "Xbox 360" == O && /\bIEMobile\b/.test(a) && I.unshift("mobile mode");
        else if ((/^(?:Chrome|IE|Opera)$/.test(N) || N && !O && !/Browser|Mobi/.test(N)) && ("Windows CE" == Q || /Mobi/i.test(a))) N += " Mobile";
        else if ("IE" == N && K) try {
            null === l.external && I.unshift("platform preview")
        } catch (a) {
            I.unshift("embedded")
        } else(/\bBlackBerry\b/.test(O) || /\bBB10\b/.test(a)) && (q = (RegExp(O.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(a) || 0)[1] || L) ? (q = [q, /BB10/.test(a)], Q = (q[1] ? (O = null, P = "BlackBerry") : "Device Software") + " " + q[0], L = null) : this != e && "Wii" != O && (K && F || /Opera/.test(N) && /\b(?:MSIE|Firefox)\b/i.test(a) || "Firefox" == N && /\bOS X (?:\d+\.){2,}/.test(Q) || "IE" == N && (Q && !/^Win/.test(Q) && 5.5 < L || /\bWindows XP\b/.test(Q) && 8 < L || 8 == L && !/\bTrident\b/.test(a))) && !s.test(q = k.call(e, a.replace(s, "") + ";")) && q.name && (q = "ing as " + q.name + ((q = q.version) ? " " + q : ""), s.test(N) ? (/\bIE\b/.test(q) && "Mac OS" == Q && (Q = null), q = "identify" + q) : (q = "mask" + q, N = G ? d(G.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(q) && (Q = null), !K && (L = null)), M = ["Presto"], I.push(q));
        (q = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(a) || 0)[1]) && (q = [parseFloat(q.replace(/\.(\d)$/, ".0$1")), q], "Safari" == N && "+" == q[1].slice(-1) ? (N = "WebKit Nightly", J = "alpha", L = q[1].slice(0, -1)) : (L == q[1] || L == (q[2] = (/\bSafari\/([\d.]+\+?)/i.exec(a) || 0)[1])) && (L = null), q[1] = (/\bChrome\/([\d.]+)/i.exec(a) || 0)[1], 537.36 == q[0] && 537.36 == q[2] && 28 <= parseFloat(q[1]) && "WebKit" == M && (M = ["Blink"]), K && (t || q[1]) ? (M && (M[1] = "like Chrome"), q = q[1] || (q = q[0], 530 > q ? 1 : 532 > q ? 2 : 532.05 > q ? 3 : 533 > q ? 4 : 534.03 > q ? 5 : 534.07 > q ? 6 : 534.1 > q ? 7 : 534.13 > q ? 8 : 534.16 > q ? 9 : 534.24 > q ? 10 : 534.3 > q ? 11 : 535.01 > q ? 12 : 535.02 > q ? "13+" : 535.07 > q ? 15 : 535.11 > q ? 16 : 535.19 > q ? 17 : 536.05 > q ? 18 : 536.1 > q ? 19 : 537.01 > q ? 20 : 537.11 > q ? "21+" : 537.13 > q ? 23 : 537.18 > q ? 24 : 537.24 > q ? 25 : 537.36 > q ? 26 : "Blink" == M ? "28" : "27")) : (M && (M[1] = "like Safari"), q = (q = q[0], 400 > q ? 1 : 500 > q ? 2 : 526 > q ? 3 : 533 > q ? 4 : 534 > q ? "4+" : 535 > q ? 5 : 537 > q ? 6 : 538 > q ? 7 : 601 > q ? 8 : "8")), M && (M[1] += " " + (q += "number" == typeof q ? ".x" : /[.+]/.test(q) ? "" : "+")), "Safari" == N && (!L || 45 < parseInt(L)) && (L = q)), "Opera" == N && (q = /\bzbov|zvav$/.exec(Q)) ? (N += " ", I.unshift("desktop mode"), "zvav" == q ? (N += "Mini", L = null) : N += "Mobile", Q = Q.replace(RegExp(" *" + q + "$"), "")) : "Safari" == N && /\bChrome\b/.exec(M && M[1]) && (I.unshift("desktop mode"), N = "Chrome Mobile", L = null, /\bOS X\b/.test(Q) ? (P = "Apple", Q = "iOS 4.3+") : Q = null), L && 0 == L.indexOf(q = /[\d.]+$/.exec(Q)) && -1 < a.indexOf("/" + q + "-") && (Q = j(Q.replace(q, ""))), M && !/\b(?:Avant|Nook)\b/.test(N) && (/Browser|Lunascape|Maxthon/.test(N) || "Safari" != N && /^iOS/.test(Q) && /\bSafari\b/.test(M[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(N) && M[1]) && (q = M[M.length - 1]) && I.push(q), I.length && (I = ["(" + I.join("; ") + ")"]), P && O && 0 > O.indexOf(P) && I.push("on " + P), O && I.push((/^on /.test(I[I.length - 1]) ? "" : "on ") + O), Q && (q = / ([\d.+]+)$/.exec(Q), r = q && "/" == Q.charAt(Q.length - q[0].length - 1), Q = {
            architecture: 32,
            family: q && !r ? Q.replace(q[0], "") : Q,
            version: q ? q[1] : null,
            toString: function() {
                var a = this.version;
                return this.family + (a && !r ? " " + a : "") + (64 == this.architecture ? " 64-bit" : "")
            }
        }), (q = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(H)) && !/\bi686\b/i.test(H) ? (Q && (Q.architecture = 64, Q.family = Q.family.replace(RegExp(" *" + q), "")), N && (/\bWOW64\b/i.test(a) || K && /\w(?:86|32)$/.test(o.cpuClass || o.platform) && !/\bWin64; x64\b/i.test(a)) && I.unshift("32-bit")) : Q && /^OS X/.test(Q.family) && "Chrome" == N && 39 <= parseFloat(L) && (Q.architecture = 64), a || (a = null);
        var R = {};
        return R.description = a, R.layout = M && M[0], R.manufacturer = P, R.name = N, R.prerelease = J, R.product = O, R.ua = a, R.version = N && L, R.os = Q || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        }, R.parse = k, R.toString = function() {
            return this.description || ""
        }, R.version && I.unshift(L), R.name && I.unshift(N), Q && N && !(Q == (Q + "").split(" ")[0] && (Q == N.split(" ")[0] || O)) && I.push(O ? "(" + Q + ")" : "on " + Q), I.length && (R.description = I.join(" ")), R
    }
    var l = {
            function: !0,
            object: !0
        },
        m = l[typeof window] && window || this,
        n = m,
        o = l[typeof exports] && exports,
        p = l[typeof module] && module && !module.nodeType && module,
        q = o && p && "object" == typeof global && global;
    q && (q.global === q || q.window === q || q.self === q) && (m = q);
    var r = Math.pow(2, 53) - 1,
        s = /\bOpera/,
        t = this,
        u = Object.prototype,
        v = u.hasOwnProperty,
        w = u.toString,
        x = k();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (m.platform = x, define(function() {
        return x
    })) : o && p ? e(x, function(a, b) {
        o[b] = a
    }) : m.platform = x
}).call(this);