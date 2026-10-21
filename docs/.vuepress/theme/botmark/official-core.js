/**
 * Official Grok Bot vector motion core, extracted 2026-10-21.
 * Source: https://x.ai/_next/static/chunks/2y8az2mskx745.js
 * Deployment: fabb8ffa2c56c81156c79a8aeeb35a2c0a350618
 * Pure geometry, clips, director, SVG renderer and attribute updater retained.
 * React hooks, Turbopack registration and telemetry excluded.
 * See SOURCES.md for provenance and extraction boundaries.
 */
let e, n, a, r, l, o, s, i;
var h,u,f,c,p,d,M,y,x,m;
    let w = (t) => ({ x: t, v: 0, t: t }),
      k = (t, e, n, a) => {
        ((t.v += (-2 * n * e * t.v - e * e * (t.x - t.t)) * a),
          (t.x += t.v * a),
          (Number.isFinite(t.x) && Number.isFinite(t.v)) ||
            ((t.x = t.t), (t.v = 0)));
      },
      $ = 1 / 120,
      C = (t) => Math.max(1, Math.ceil(t / $)),
      A = (t, e, n) => Math.min(n, Math.max(e, t)),
      I = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      P = (t) => 1 - Math.pow(1 - t, 3),
      z = (t) =>
        1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2),
      q = [0.42, 0, 0.58, 1],
      _ = [0.4, 0.06, 0.18, 1],
      F = 4.25 / 60,
      B = 2 / 60;
    function Y(t, e, n) {
      let a = 1 - t;
      return 3 * a * a * t * e + 3 * a * t * t * n + t * t * t;
    }
    function R(t, e) {
      let [n, a, r, l] = e,
        o = t;
      for (let e = 0; e < 8; e++) {
        let e = Y(o, n, r) - t,
          a = (function (t, e, n) {
            let a = 1 - t;
            return 3 * a * a * e + 6 * a * t * (n - e) + 3 * t * t * (1 - n);
          })(o, n, r);
        if (1e-6 > Math.abs(e) || 1e-6 > Math.abs(a)) break;
        o = Math.min(1, Math.max(0, o - e / a));
      }
      return Y(o, a, l);
    }
    function L(t) {
      let e = Math.min(1, Math.max(0, t));
      return e * e * (3 - 2 * e);
    }
    function T(t, e) {
      let n = Math.min(0.28, (t ? B : F) / Math.max(e, 0.05)),
        a = (1 - n) * 0.42;
      return { u1: a, u2: a + n };
    }
    let S = Math.PI / 180;
    function E(t, e) {
      return [
        t[0] * e[0] - t[1] * e[1] - t[2] * e[2] - t[3] * e[3],
        t[0] * e[1] + t[1] * e[0] + t[2] * e[3] - t[3] * e[2],
        t[0] * e[2] - t[1] * e[3] + t[2] * e[0] + t[3] * e[1],
        t[0] * e[3] + t[1] * e[2] - t[2] * e[1] + t[3] * e[0],
      ];
    }
    function N(t, e) {
      let n = Math.sin(e / 2);
      return [Math.cos(e / 2), t[0] * n, t[1] * n, t[2] * n];
    }
    function W(t) {
      let [e, n, a, r] = t;
      return [
        1 - 2 * (a * a + r * r),
        2 * (n * a - e * r),
        2 * (n * r + e * a),
        2 * (n * a + e * r),
        1 - 2 * (n * n + r * r),
        2 * (a * r - e * n),
        2 * (n * r - e * a),
        2 * (a * r + e * n),
        1 - 2 * (n * n + a * a),
      ];
    }
    function j(t) {
      let e = t[0],
        n = t[3],
        a = t[5],
        r = t[4],
        l = t[6],
        o = t[7],
        s = t[8],
        i = Math.max(-1, Math.min(1, -l)),
        h = Math.asin(i);
      return Math.abs(i) > 0.999999
        ? [Math.atan2(-a, r), h, 0]
        : [Math.atan2(o, s), h, Math.atan2(n, e)];
    }
    function D(t, e) {
      return [
        t[0] * e[0] + t[1] * e[1] + t[2] * e[2],
        t[3] * e[0] + t[4] * e[1] + t[5] * e[2],
        t[6] * e[0] + t[7] * e[1] + t[8] * e[2],
      ];
    }
    let Z = [
      {
        A: [0.01722, 0.45638, 0.88962],
        B: [0.186, 0.20949, 0.95996],
        N: [0.82924, 0.4906, -0.26773],
      },
      {
        A: [0.48863, 0.67924, 0.54762],
        B: [0.65674, 0.43195, 0.61815],
        N: [0.60389, 0.18972, -0.77416],
      },
    ];
    function H(t) {
      let e = Math.hypot(t[0], t[1], t[2]) || 1;
      return [t[0] / e, t[1] / e, t[2] / e];
    }
    let G = (() => {
        let t = [0, 0, 0];
        for (let { A: e, B: n } of Z) {
          let a = H([e[0] + n[0], e[1] + n[1], e[2] + n[2]]);
          t = [t[0] + a[0], t[1] + a[1], t[2] + a[2]];
        }
        return H(t);
      })(),
      X = (() => {
        var t, e;
        let n,
          a =
            ((t = [0, 0, 1]),
            (n =
              Math.hypot(
                (e = [
                  1 + (G[0] * t[0] + G[1] * t[1] + G[2] * t[2]),
                  G[1] * t[2] - G[2] * t[1],
                  G[2] * t[0] - G[0] * t[2],
                  G[0] * t[1] - G[1] * t[0],
                ])[0],
                e[1],
                e[2],
                e[3],
              ) || 1),
            [e[0] / n, e[1] / n, e[2] / n, e[3] / n]),
          r = W(a),
          l = 0,
          o = 0;
        for (let { A: t, B: e } of Z) {
          let n = D(r, [e[0] - t[0], e[1] - t[1], e[2] - t[2]]);
          ((l += n[0]), (o += n[1]));
        }
        return E(
          N(
            [0, 0, 1],
            ((((Math.PI / 2 - Math.atan2(o, l) + Math.PI / 2) % Math.PI) +
              Math.PI) %
              Math.PI) -
              Math.PI / 2,
          ),
          a,
        );
      })(),
      U =
        ((e = W(X)),
        Z.map(({ A: t, B: n, N: a }) => ({
          A: D(e, t),
          B: D(e, n),
          N: D(e, a),
        }))),
      O = [X[0], -X[1], -X[2], -X[3]],
      J = (() => {
        let t = ({ A: t, B: e }) => {
            let n = H([t[0] + e[0], t[1] + e[1], t[2] + e[2]]),
              a = e[0] * n[0] + e[1] * n[1] + e[2] * n[2],
              r = H([e[0] - a * n[0], e[1] - a * n[1], e[2] - a * n[2]]);
            r[1] < 0 && (r = [-r[0], -r[1], -r[2]]);
            let l = [
              n[1] * r[2] - n[2] * r[1],
              n[2] * r[0] - n[0] * r[2],
              n[0] * r[1] - n[1] * r[0],
            ];
            return (
              l[0] * n[0] < 0 && (l = [-l[0], -l[1], -l[2]]),
              { M: n, T: r, C: l }
            );
          },
          [e, n] = U;
        if (null == e || null == n)
          throw Error("Motion Lab defines exactly two eye capsules");
        return [t(e), t(n)];
      })(),
      K = [
        "sphere",
        "cloud",
        "square",
        "sparkle",
        "clover",
        "heartChubby",
        "starFlower",
        "teardrop",
        "tablet",
        "wedge",
        "house",
        "star6",
        "pebble",
        "bean",
        "egg",
        "squircle",
        "capsule",
        "cylinder",
        "hex",
        "gem",
        "crystal",
        "shield",
        "dome",
        "arch",
        "leaf",
      ],
      Q = [
        "neutral",
        "happy",
        "surprised",
        "sad",
        "sleepy",
        "squinted",
        "calm",
        "inspecting",
        "confused",
      ],
      V = new Map([
        ["thinking", "sad"],
        ["strange", "inspecting"],
        ["angry", "neutral"],
        ["inspect", "inspecting"],
        ["squint", "squinted"],
        ["idle", "neutral"],
        ["smile", "happy"],
        ["sleep", "sleepy"],
      ]),
      tt = new Set(["sad", "happy", "confused", "squinted", "sleepy"]);
    function te(t, e) {
      return [t[6 * e], t[6 * e + 1]];
    }
    function tn(t, e, n) {
      let a = n ? 4 : 2;
      return [t[6 * e] + t[6 * e + a], t[6 * e + 1] + t[6 * e + a + 1]];
    }
    function ta(t) {
      let e = [],
        n = (t, n, a, r, l) => {
          for (let o = l; o < 11; o++) {
            let l = o / 10,
              s = 1 - l,
              i = s * s * s,
              h = 3 * s * s * l,
              u = 3 * s * l * l,
              f = l * l * l;
            e.push([
              i * t[0] + h * n[0] + u * a[0] + f * r[0],
              i * t[1] + h * n[1] + u * a[1] + f * r[1],
            ]);
          }
        };
      return (
        n(te(t, 0), tn(t, 0, !0), tn(t, 1, !1), te(t, 1), 0),
        n(te(t, 1), tn(t, 1, !0), tn(t, 2, !1), te(t, 2), 1),
        e
      );
    }
    function tr(t, e, n, a, r) {
      let l = (function ({ p0: t, p1: e, p2: n, isArc: a }) {
        let [r, l] = t,
          [o, s] = e,
          [i, h] = n,
          u = Array(18).fill(0),
          f = (t, e) => {
            ((u[6 * t] = e[0]), (u[6 * t + 1] = e[1]));
          },
          c = (t, e) => {
            ((u[6 * t + 2] = e[0] - u[6 * t]),
              (u[6 * t + 3] = e[1] - u[6 * t + 1]));
          },
          p = (t, e) => {
            ((u[6 * t + 4] = e[0] - u[6 * t]),
              (u[6 * t + 5] = e[1] - u[6 * t + 1]));
          };
        if (a) {
          let t = 2 * (r * (s - h) + o * (h - l) + i * (l - s));
          if (Math.abs(t) > 1e-9) {
            let e = r * r + l * l,
              n = o * o + s * s,
              a = i * i + h * h,
              d = (e * (s - h) + n * (h - l) + a * (l - s)) / t,
              M = (e * (i - o) + n * (r - i) + a * (o - r)) / t,
              y = Math.hypot(r - d, l - M),
              x = Math.atan2(l - M, r - d),
              m = 2 * Math.PI,
              g = (Math.atan2(h - M, i - d) - x + m) % m,
              v = (Math.atan2(s - M, o - d) - x + m) % m <= g ? g : g - m,
              b = (t) => [d + y * Math.cos(t), M + y * Math.sin(t)],
              w = (t) => [-Math.sin(t), Math.cos(t)],
              k = v / 2,
              $ = (4 / 3) * Math.tan(k / 4) * y,
              C = [x, x + k, x + v];
            for (let t = 0; t < 3; t++) {
              let e = b(C[t]),
                n = w(C[t]);
              (f(t, e),
                t > 0 && c(t, [e[0] - $ * n[0], e[1] - $ * n[1]]),
                t < 2 && p(t, [e[0] + $ * n[0], e[1] + $ * n[1]]));
            }
            return u;
          }
          let e = [(r + i) / 2, (l + h) / 2];
          return (
            f(0, [r, l]),
            f(1, e),
            f(2, [i, h]),
            p(0, [r + (e[0] - r) / 3, l + (e[1] - l) / 3]),
            c(1, [e[0] - (e[0] - r) / 3, e[1] - (e[1] - l) / 3]),
            p(1, [e[0] + (i - e[0]) / 3, e[1] + (h - e[1]) / 3]),
            c(2, [i - (i - e[0]) / 3, h - (h - e[1]) / 3]),
            u
          );
        }
        let d = [(r + o) / 2, (l + s) / 2],
          M = [(o + i) / 2, (s + h) / 2],
          y = [(d[0] + M[0]) / 2, (d[1] + M[1]) / 2];
        return (
          f(0, [r, l]),
          f(1, y),
          f(2, [i, h]),
          p(0, [r + (2 / 3) * (d[0] - r), l + (2 / 3) * (d[1] - l)]),
          c(1, [
            y[0] + (2 / 3) * (d[0] - y[0]),
            y[1] + (2 / 3) * (d[1] - y[1]),
          ]),
          p(1, [
            y[0] + (2 / 3) * (M[0] - y[0]),
            y[1] + (2 / 3) * (M[1] - y[1]),
          ]),
          c(2, [i + (2 / 3) * (M[0] - i), h + (2 / 3) * (M[1] - h)]),
          u
        );
      })(a);
      return {
        off: t,
        tilt: e,
        wid: n,
        lidY: 1,
        oval: r,
        ovalMix: 0,
        pts: ta(l),
        path: l,
        fillRing: null,
      };
    }
    function tl(t, e, n, a, r) {
      let l = Math.max(0, (e - t) / 2),
        o = (n * Math.PI) / 180,
        s = Math.sin(o) * l,
        i = Math.cos(o) * l;
      return tr(
        a,
        r,
        t / 2,
        { p0: [-s, -i], p1: [0, 0], p2: [s, i], isArc: !1 },
        [0, 0],
      );
    }
    function to(t, e, n, a) {
      return tl(t, e, n, [a, 0], 0);
    }
    let ts = {
      neutral: [(u = to(0.26, 0.57, 0, 0)), u],
      happy: [
        (f = tr(
          [0.03, 0.03],
          0,
          0.1305,
          { p0: [0.16, -0.04], p1: [0, 0.12], p2: [-0.16, -0.04], isArc: !0 },
          [0, 0],
        )),
        f,
      ],
      surprised: [(c = to(0.42, 0.86, 0, 0.03)), c],
      inspecting: [to(0.54, 0.54, 0, 0.04), to(0.27, 0.27, 0, 0.04)],
      sad: [(p = to(0.26, 0.5, -28, -0.05)), p],
      sleepy: [
        (d = tr(
          [0.01, 0],
          0,
          0.13,
          { p0: [-0.11, 0.025], p1: [0, -0.05], p2: [0.11, 0.025], isArc: !1 },
          [0, 0],
        )),
        d,
      ],
      squinted: [(M = to(0.26, 0.5, 90, 0.01)), M],
      calm: [
        (y = tr(
          [0.05, 0],
          0,
          0.247,
          { p0: [-0.296, 0], p1: [0, 0], p2: [0.296, 0], isArc: !1 },
          [0.296, 0.247],
        )),
        y,
      ],
      confused: [
        (x = tr(
          [-0.1, 0],
          0,
          0.1305,
          { p0: [0.01, 0.16], p1: [-0.17, 0], p2: [0.01, -0.16], isArc: !1 },
          [0, 0],
        )),
        x,
      ],
    };
    function ti(t) {
      return tt.has(t);
    }
    function th(t, e) {
      return [e(t[0], 0), e(t[1], 1)];
    }
    function tu(t) {
      return { ...t, ovalMix: 0 };
    }
    function tf(t) {
      return t.oval[0] > 1e-4 && t.oval[1] > 1e-4;
    }
    function tc(t) {
      if (tf(t) || t.pts.length < 3) return !1;
      let e = t.pts[0],
        n = t.pts[t.pts.length - 1],
        a = n[0] - e[0],
        r = n[1] - e[1],
        l = a * a + r * r;
      if (l < 1e-8) return !1;
      let o = 0;
      for (let n of t.pts) {
        let t = ((n[0] - e[0]) * a + (n[1] - e[1]) * r) / l,
          s = e[0] + t * a,
          i = e[1] + t * r,
          h = Math.hypot(n[0] - s, n[1] - i);
        h > o && (o = h);
      }
      return o > Math.max(0.012, 0.2 * t.wid);
    }
    function tp(t, e, n) {
      var a, r;
      return [
        ((a = t[0]), a + (e[0] - a) * n),
        ((r = t[1]), r + (e[1] - r) * n),
      ];
    }
    function td(t, e, n) {
      if (0 === t.length) return [0, 0];
      if (1 === t.length || n <= 1) return t[0];
      let a = (e / (n - 1)) * (t.length - 1),
        r = Math.min(Math.floor(a), t.length - 2);
      return tp(t[r], t[r + 1], a - r);
    }
    function tM(t) {
      if (tf(t)) {
        let [e, n] = t.oval;
        return {
          cx: t.off[0],
          cy: t.off[1],
          ang: e >= n ? Math.PI / 2 : 0,
          halfLen: Math.max(e, n),
          halfW: Math.min(e, n),
        };
      }
      let e = t.wid;
      if (t.pts.length < 2)
        return {
          cx: t.off[0],
          cy: t.off[1],
          ang: t.tilt,
          halfLen: e,
          halfW: e,
        };
      let n = t.pts[0],
        a = t.pts[t.pts.length - 1];
      return {
        cx: t.off[0] + (n[0] + a[0]) / 2,
        cy: t.off[1] + (n[1] + a[1]) / 2,
        ang: Math.atan2(a[0] - n[0], a[1] - n[1]) + t.tilt,
        halfLen: Math.hypot(a[0] - n[0], a[1] - n[1]) / 2 + e,
        halfW: e,
      };
    }
    function ty(t, e) {
      let n = e.ang - t.ang;
      for (; n > Math.PI / 2;) n -= Math.PI;
      for (; n < -Math.PI / 2;) n += Math.PI;
      return n;
    }
    function tx(t, e, n, a) {
      return tl(Math.max(t, 1e-4), Math.max(e, t), 0, a, n);
    }
    function tm(t, e) {
      var n, a, r;
      if (e <= 0) return t;
      let l = Math.min(1, e),
        o = (function (t) {
          let e = (function (t) {
            let e = tf(t);
            if (!(t.wid > 0) && !e) return null;
            let n = t.lidY,
              a = t.tilt * (180 / Math.PI);
            if (e)
              return {
                width: 2 * t.oval[0],
                height: 2 * t.oval[1] * n,
                tilt: a,
                cx: t.off[0],
                cy: t.off[1],
              };
            if (t.pts.length < 2) return null;
            let r = t.pts[0],
              l = t.pts[t.pts.length - 1],
              o = l[0] - r[0],
              s = l[1] - r[1],
              i = Math.hypot(o, s),
              h = 2 * t.wid;
            return {
              width: h,
              height: (i + h) * n,
              tilt: (180 / Math.PI) * Math.atan2(o, s) + a,
              cx: t.off[0] + (r[0] + l[0]) / 2,
              cy: t.off[1] + ((r[1] + l[1]) / 2) * n,
            };
          })(t);
          if (null == e)
            return { w: 0.26, h: 0.57, cx: t.off[0], cy: t.off[1] };
          let n = (e.tilt * Math.PI) / 180,
            a = Math.abs(Math.cos(n)),
            r = Math.abs(Math.sin(n));
          return {
            w: e.width * a + e.height * r,
            h: e.width * r + e.height * a,
            cx: e.cx,
            cy: e.cy,
          };
        })(t),
        s = Math.max(o.w, 1e-4),
        i = Math.max(o.h, s),
        h = 0.42 * s;
      return (
        (n = i + (h - i) * l),
        (a = o.cx),
        (r = o.cy),
        n >= s ? tx(s, n, 0, [a, r]) : tx(n, s, Math.PI / 2, [a, r])
      );
    }
    function tg(t) {
      return { ...t, wid: 0, oval: [0, 0] };
    }
    function tv(t, e) {
      if (0 === e) return t;
      let n = (function (t) {
          if (t.pts.length < 2) return t;
          let e = t.pts[0],
            n = t.pts[t.pts.length - 1],
            a = n[0] - e[0],
            r = n[1] - e[1];
          if (Math.abs(r) < Math.abs(a)) return t;
          let l = Math.atan2(a, r);
          if (1e-5 > Math.abs(l)) return t;
          let o = Math.cos(l),
            s = Math.sin(l);
          return {
            ...t,
            tilt: t.tilt + l,
            pts: t.pts.map((t) => [t[0] * o - t[1] * s, t[0] * s + t[1] * o]),
          };
        })(t),
        a = Math.max(0.03, 1 - e),
        r =
          (function (t) {
            let e, n;
            if (tf(t)) ((e = -t.oval[1]), (n = t.oval[1]));
            else {
              let a = 1e9,
                r = -1e9;
              for (let e of t.pts)
                (e[1] < a && (a = e[1]), e[1] > r && (r = e[1]));
              ((e = a - t.wid), (n = r + t.wid));
            }
            return e + 0.4 * (n - e);
          })(n) *
          (1 - a),
        l = Math.cos(-n.tilt),
        o = Math.sin(-n.tilt);
      return {
        ...n,
        off: [n.off[0] - o * r, n.off[1] + l * r],
        lidY: n.lidY * a,
      };
    }
    function tb(t) {
      return +("inspecting" === t);
    }
    function tw(t) {
      return R(Math.min(Math.max(t.t / t.dur, 0), 1), _);
    }
    function tk({ poke: t, turns: e }) {
      switch (t) {
        case "spin":
          return 0.9 + 0.4 * (e - 1);
        case "bounce":
          return 0.62;
        case "nod":
          return 0.5;
      }
    }
    function t$(t, e, n) {
      return t <= e || t >= n
        ? 0
        : Math.sin((Math.PI * (t - e)) / (n - e)) ** 2;
    }
    let tC = { heartChubby: 0.6, wedge: 0.55 };
    function tA(t, e, n) {
      let a = "sphere" !== t,
        r = tC[t] ?? 1;
      return {
        rx: -(a ? 19 : 14) * r * n,
        ry: (a ? 26 : 18) * r * e,
        px: (a ? 0.07 : 0.03) * e,
        py: (a ? 0.055 : 0.024) * n,
      };
    }
    function tI(t, e, n = 2) {
      let a = Math.max(t.width, 1) * n,
        r = (t) => Math.max(-1, Math.min(1, t));
      return [
        r((e.x - (t.left + t.width / 2)) / a),
        r(-(e.y - (t.top + t.height / 2)) / a),
      ];
    }
    let tP = {
        thinking: "dots",
        orbit: "orbit",
        radar: "radar",
        progress: "progress",
        spawning: "gather",
        dictating: "wave",
        sending: "send",
        receiving: "receive",
        uploading: "dock",
        bouncing: "ball",
        writing: "pencil",
        alerting: "bang",
        "powering-down": "standby",
      },
      tz = Math.PI,
      tq = new Set(["progress", "spawning"]),
      t_ = { progress: 2.5, spawning: 2 };
    function tF(t) {
      let e = 0 | t;
      return () => {
        let t = Math.imul((e = (e + 0x6d2b79f5) | 0) ^ (e >>> 15), 1 | e);
        return (
          (((t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ (t >>> 14)) >>> 0) /
          0x100000000
        );
      };
    }
    function tB(t) {
      return t_[t] ?? 2.5;
    }
    let tY = new Map([
        ["position", "position"],
        ["rotation", "rotation"],
        ["squash", "squash"],
        ["scale", "zoom"],
        ["lids", "lids"],
        ["expression", "expression"],
        ["pos", "position"],
        ["rot", "rotation"],
        ["scl", "squash"],
        ["zoom", "zoom"],
        ["expr", "expression"],
      ]),
      tR = new Map([
        ["blob", "sphere"],
        ["sphereWide", "sphere"],
        ["arch", "horseshoe"],
        ["spark", "sparkle"],
        ["star", "star6"],
        ["heart", "heartChubby"],
        ["hexagon", "hex"],
      ]),
      tL = [0.4, 0, 0.2, 1],
      tT = (() => {
        let [t, e, n] = j(W(O));
        return [t / S, e / S, n / S];
      })(),
      tS = {
        duration: 10,
        body: null,
        squashAnchor: 0,
        restTime: 0,
        inspect: {},
        position: [],
        rotation: [],
        squash: [],
        zoom: [],
        lids: [],
        expression: [],
      },
      tE = { ...tS, rotation: [{ t: 0, v: tT, ease: q }] };
    function tN({ t: t, v: e, ease: n }) {
      return {
        t: t,
        v: "string" == typeof e ? [] : e,
        ease: null != n && 4 === n.length ? n : q,
      };
    }
    function tW(t, e) {
      if (0 === t.length) return null;
      if (e <= t[0].t) return t[0].v;
      let n = t[t.length - 1];
      if (e >= n.t) return n.v;
      let a = 0;
      for (; a < t.length - 2 && t[a + 1].t <= e;) a++;
      let r = t[a],
        l = t[a + 1],
        o = R((e - r.t) / Math.max(l.t - r.t, 1e-9), r.ease);
      return r.v.map((t, e) => t + (l.v[e] - t) * o);
    }
    function tj(t) {
      let e = t.restTime,
        n = tW(t.rotation, e),
        a = tW(t.position, e),
        r = tW(t.squash, e),
        l = tW(t.zoom, e),
        o = tW(t.lids, e),
        s = "neutral",
        i = !1;
      for (let n of t.expression)
        (i || ((s = n.name), (i = !0)), n.t <= e + 1e-9 && (s = n.name));
      return {
        rot: n ? [n[0], n[1], n[2]] : [0, 0, 0],
        pos: a ? [a[0], a[1]] : [0, 0],
        scl: r ? [r[0], r[1]] : [1, 1],
        zoom: l ? l[0] : 0.6,
        lids: o ? Math.min(1, Math.max(0, o[0])) : 0,
        expr: s,
        squashAnchor: t.squashAnchor,
      };
    }
    function tD(t, e) {
      return t + 360 * Math.round((e - t) / 360);
    }
    function tZ(t, e) {
      return Math.abs(((((t - e) % 360) + 540) % 360) - 180);
    }
    let tH = {
        left: { rot: [0, -20, 0], pos: [-0.1, 0] },
        right: { rot: [0, 20, 0], pos: [0.1, 0] },
        up: { rot: [-20, 0, 0], pos: [0, 0.1] },
        down: { rot: [20, 0, 0], pos: [0, -0.1] },
        center: { rot: [0, 0, 0], pos: [0, 0] },
      },
      tG = [0.42, 0, 0.58, 1],
      tX = "rest";
    function tU(t) {
      return 360 * Math.round(t / 360);
    }
    function tO(t, e) {
      let n = "neutral";
      for (let a of t) {
        if (a.t > e + 1e-9) break;
        n = a.name;
      }
      return n;
    }
    function tJ(t) {
      let e = (t) =>
        Math.round(255 * Math.min(1, Math.max(0, t)))
          .toString(16)
          .padStart(2, "0");
      return `#${e(t[0])}${e(t[1])}${e(t[2])}`;
    }
    function tK(t) {
      return t.inkPaint ?? tJ(t.ink);
    }
    function tQ(t) {
      return t.spotPaint ?? tJ(t.spot);
    }
    function tV(t, e, n = t) {
      return `<svg xmlns="http://www.w3.org/2000/svg" id="${e}" width="${n}" height="${n}" viewBox="0 0 ${t} ${t}">`;
    }
    let t1 = {
        clips: [
          "Working_A",
          "Working_B",
          "Working_C",
          "Working_D",
          "Working_E",
          "Working_F",
        ],
      },
      t0 = {
        idle: {
          clips: ["Idle_B", "Idle_B", "Idle_D", "Idle_B", "Idle_A"],
          compactClips: ["Idle_B"],
        },
        listening: { clips: ["Idle_D"], face: "calm" },
        thinking: { clips: ["Idle_B"], morph: "thinking" },
        streaming: { clips: ["Streaming_A", "Streaming_B", "Streaming_C"] },
        searching: { clips: ["Idle_B"], morph: "radar" },
        reading: t1,
        working: t1,
        coding: t1,
        running: t1,
        computing: t1,
        controlling: t1,
        waiting: { clips: ["Idle_B"], morph: "orbit" },
        blocked: { clips: ["Blocked_A"], next: "drowsy", holdSeconds: 120 },
        finished: { clips: ["Done_B", "Done_A"], face: "happy", next: "idle" },
        failed: { clips: ["Blocked_B"], next: "idle" },
        sleeping: { clips: ["Idle_B"], face: "sleepy" },
        waking: {
          clips: ["Idle_B"],
          face: "surprised",
          next: "idle",
          holdSeconds: 1.6,
        },
        happy: { clips: ["Done_A"] },
        excited: { clips: ["Done_C"] },
        laughing: { clips: ["Done_B"] },
        proud: { clips: ["Marketing_B"] },
        curious: { clips: ["Working_B"], face: "inspecting" },
        playful: { clips: ["Bodymoves_A"] },
        shy: { clips: ["Idle_D"], face: "calm" },
        surprised: { clips: ["Idle_B"], face: "surprised" },
        suspicious: { clips: ["Idle_D"], face: "squinted" },
        angry: { clips: ["Blocked_A"], face: "squinted" },
        confused: { clips: ["Blocked_A"] },
        sad: { clips: ["Blocked_B"] },
        drowsy: { clips: ["Blocked_C"] },
        bored: { clips: ["Idle_B"], face: "sleepy" },
        scared: { clips: ["Idle_D"], face: "surprised" },
        celebrate: { clips: ["Rotation_A"], face: "happy" },
        approving: { clips: ["Rotation_C"], next: "idle" },
        orbit: { clips: ["Idle_B"], morph: "orbit" },
        radar: { clips: ["Idle_B"], morph: "radar" },
        progress: { clips: ["Idle_B"], morph: "progress" },
        spawning: { clips: ["Idle_B"], morph: "spawning" },
        loading: { clips: ["Idle_B"], morph: "progress" },
        dictating: { clips: ["Idle_B"], morph: "dictating" },
        sending: { clips: ["Idle_B"], morph: "sending" },
        receiving: { clips: ["Idle_B"], morph: "receiving" },
        uploading: { clips: ["Idle_B"], morph: "uploading" },
        writing: { clips: ["Idle_B"], morph: "writing" },
        alerting: { clips: ["Idle_B"], morph: "alerting" },
        bouncing: { clips: ["Idle_B"], morph: "bouncing" },
        "powering-down": { clips: ["Idle_B"], morph: "powering-down" },
        humming: { clips: ["Idle_B"], face: "calm" },
        notifying: { clips: ["Done_B"], face: "surprised" },
        dragging: { clips: ["Idle_B"], face: "surprised" },
        logo: { clips: ["Logo_A", "Logo_B"] },
        showcase: {
          clips: ["Marketing_A", "Marketing_B", "Marketing_C", "Marketing_D"],
        },
        turntable: { clips: ["Rotation_B"] },
      },
      t2 = new Map(
        [
          {
            name: "Blocked_A",
            duration: 2.12,
            body: "sphere",
            squashAnchor: 0,
            workArea: { start: 0, end: 2.1 },
            inspect: { bias: -1, follow: !0 },
            tracks: {
              position: [
                {
                  t: 0,
                  v: [0, 0],
                  ease: [
                    0.7968976121829217, 0.023358873568246466,
                    0.25805236576790014, 0.9399472349279558,
                  ],
                },
                {
                  t: 0.38639855209383034,
                  v: [0.020362603567309623, 0.0321716960933944],
                  ease: [
                    0.7968976121829217, 0.023358873568246466,
                    0.25805236576790014, 0.9399472349279558,
                  ],
                },
                {
                  t: 0.7460619029579755,
                  v: [-0.13200621755876568, 0.04928491306786316],
                  ease: [
                    0.16206624605678288, 0.6573718201333453, 0.4776581771164943,
                    0.9890940068909632,
                  ],
                },
                {
                  t: 0.8660990266653926,
                  v: [-0.0027221809712659807, 0.05083886406795958],
                  ease: [
                    0.34720720728860055, -0.008777460320222181,
                    0.2695010548130348, 1.02521711915982,
                  ],
                },
                {
                  t: 1.0493565888199954,
                  v: [-0.12038936798795193, 0.04235181137057312],
                  ease: [
                    0.2773807176656155, 0.29281356631792965,
                    0.35341088328075676, 1.0737667821535892,
                  ],
                },
                {
                  t: 1.2986659810851888,
                  v: [-0.0027221809712659807, 0.05083886406795958],
                  ease: [
                    0.34720720728860055, -0.008777460320222181,
                    0.2695010548130348, 1.02521711915982,
                  ],
                },
                { t: 1.7569209127327317, v: [0, 0], ease: [0.42, 0, 0.58, 1] },
              ],
              rotation: [
                {
                  t: 0,
                  v: [0, 0, 0],
                  ease: [
                    0.8199958981940145, -0.1753438779653778,
                    0.35490544014951186, 0.958837837092147,
                  ],
                },
                {
                  t: 0.38639855209383034,
                  v: [6.596421550520286, 26.266588805679774, 6.122577979110701],
                  ease: [
                    0.8199958981940145, -0.1753438779653778,
                    0.35490544014951186, 0.958837837092147,
                  ],
                },
                {
                  t: 0.7460619029579755,
                  v: [
                    4.03072349953808, -14.070821783965659, -8.088521350792867,
                  ],
                  ease: [
                    0.16206624605678288, 0.6573718201333453, 0.4776581771164943,
                    0.9890940068909632,
                  ],
                },
                {
                  t: 0.8660990266653926,
                  v: [
                    10.306252195330941, 13.969026095064219, 7.524804229298955,
                  ],
                  ease: [
                    0.34720720728860055, -0.008777460320222181,
                    0.2695010548130348, 1.02521711915982,
                  ],
                },
                {
                  t: 1.0493565888199954,
                  v: [
                    8.006914468651756, -9.270764174998455, -8.505309845875193,
                  ],
                  ease: [
                    0.2773807176656155, 0.29281356631792965,
                    0.35341088328075676, 1.0737667821535892,
                  ],
                },
                {
                  t: 1.2986659810851888,
                  v: [
                    10.306252195330941, 13.969026095064219, 7.524804229298955,
                  ],
                  ease: [
                    0.34720720728860055, -0.008777460320222181,
                    0.2695010548130348, 1.02521711915982,
                  ],
                },
                {
                  t: 1.7569209127327317,
                  v: [0, 0, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
              scale: [
                {
                  t: 0,
                  v: [0.6],
                  ease: [0.42, 0, 0.06944264684998447, 0.9679740678629829],
                },
                {
                  t: 0.38639855209383034,
                  v: [0.6],
                  ease: [0.42, 0, 0.06944264684998447, 0.9679740678629829],
                },
                {
                  t: 1.1494959879909783,
                  v: [0.5],
                  ease: [
                    0.7910272291113791, -0.026550296201944556,
                    0.19732842008291107, 1,
                  ],
                },
                {
                  t: 1.900275655021834,
                  v: [0.6],
                  ease: [0.42, 0, 0.06944264684998447, 0.9679740678629829],
                },
              ],
              expression: [
                {
                  t: 0.46926065284592233,
                  v: "confused",
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 1.606008694397346,
                  v: "neutral",
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
            },
          },
          {
            name: "Blocked_B",
            duration: 3,
            body: "sphere",
            squashAnchor: 0,
            workArea: { start: 0, end: 3 },
            inspect: { bias: -1, follow: !0 },
            tracks: {
              position: [
                {
                  t: 1.2593574149757256,
                  v: [0.004259404064870088, -0.22320548763819217],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
              rotation: [
                {
                  t: 1.2593574149757256,
                  v: [
                    22.38040777312499, -0.11374925549943268,
                    -1.3254543924838493,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
              expression: [
                {
                  t: 0,
                  v: "sad",
                  ease: [
                    0.8458217358299596, 0.40487753378378377,
                    0.13769926619433198, 0.9154349662162162,
                  ],
                },
              ],
            },
          },
          {
            name: "Blocked_C",
            duration: 1.4,
            body: "sphere",
            squashAnchor: 0,
            workArea: { start: 0, end: 1.3929879324776784 },
            inspect: { bias: -1, follow: !0 },
            tracks: {
              position: [
                {
                  t: 0,
                  v: [-0.10159994888361161, 5766171900318479e-19],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.6816231863839288,
                  v: [0.06829453998737205, 5766171900318479e-19],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 1.3929879324776784,
                  v: [-0.10159994888361161, 5766171900318479e-19],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
              rotation: [
                {
                  t: 0,
                  v: [
                    22.100629997955743, -15.657630964434397, -4.681428255949899,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.6816231863839288,
                  v: [
                    21.919069173693785, 11.388653232575262, 0.7382242020910257,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 1.3929879324776784,
                  v: [
                    22.100629997955743, -15.657630964434397, -4.681428255949899,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
              expression: [
                {
                  t: 0,
                  v: "sleepy",
                  ease: [
                    0.8458217358299596, 0.40487753378378377,
                    0.13769926619433198, 0.9154349662162162,
                  ],
                },
              ],
            },
          },
          {
            name: "Bodymoves_A",
            duration: 5,
            body: "clover",
            squashAnchor: 0,
            workArea: null,
            inspect: { bias: -1, follow: !0 },
            tracks: {
              position: [
                { t: 0, v: [0, 0], ease: [0.42, 0, 0.58, 1] },
                {
                  t: 0.3316869300911854,
                  v: [-0.1, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.6673157294832825,
                  v: [-0.1, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
                { t: 1, v: [0.1, 0], ease: [0.42, 0, 0.58, 1] },
                {
                  t: 1.3356762917933132,
                  v: [0.1, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
                { t: 1.654302811550152, v: [0, 0.1], ease: [0.42, 0, 0.58, 1] },
                { t: 2, v: [0, 0.1], ease: [0.42, 0, 0.58, 1] },
                {
                  t: 2.329549772036474,
                  v: [0, -0.1],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 2.667601683029453,
                  v: [0, -0.1],
                  ease: [0.42, 0, 0.58, 1],
                },
                { t: 2.9985974754558207, v: [0, 0], ease: [0.42, 0, 0.58, 1] },
              ],
              rotation: [
                { t: 0, v: [0, 0, 0], ease: [0.42, 0, 0.58, 1] },
                {
                  t: 0.3316869300911854,
                  v: [0, -20, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.6673157294832825,
                  v: [0, -20, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
                { t: 1, v: [0, 20, 0], ease: [0.42, 0, 0.58, 1] },
                {
                  t: 1.3356762917933132,
                  v: [0, 20, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 1.654302811550152,
                  v: [-20, 0, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
                { t: 2, v: [-20, 0, 0], ease: [0.42, 0, 0.58, 1] },
                {
                  t: 2.329549772036474,
                  v: [20, 0, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 2.667601683029453,
                  v: [20, 0, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 2.9985974754558207,
                  v: [0, 0, 0],
                  ease: [0.7340521114106021, 0, 0.024581648697214575, 1],
                },
                {
                  t: 4.546161721267454,
                  v: [0, 360, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
            },
          },
          {
            name: "Done_A",
            duration: 3.7,
            body: "sphere",
            squashAnchor: -1,
            workArea: { start: 0.07228455190755256, end: 2.4415076840284984 },
            inspect: { bias: -1, follow: !0 },
            tracks: {
              expression: [
                {
                  t: 0.5404427256792492,
                  v: "happy",
                  ease: [
                    0.9601942054655871, -0.052470439189189255,
                    0.20804339574898786, 0.9135346283783784,
                  ],
                },
                {
                  t: 1.1009640885188103,
                  v: "neutral",
                  ease: [
                    0.9601942054655871, -0.052470439189189255,
                    0.20804339574898786, 0.9135346283783784,
                  ],
                },
              ],
              squash: [
                {
                  t: 0.026170163234005256,
                  v: [1, 1],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.1712334301051709,
                  v: [1.095, 0.95],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.2519479897020158,
                  v: [1, 1.1],
                  ease: [0.42, 0, 0.58, 1],
                },
                { t: 0.5890803023663453, v: [1, 1], ease: [0.42, 0, 0.58, 1] },
                { t: 0.7128174264881666, v: [1, 1], ease: [0.42, 0, 0.58, 1] },
                {
                  t: 0.7669564766634516,
                  v: [1.095, 0.95],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.9897759640666083,
                  v: [1, 1.05],
                  ease: [0.42, 0, 0.8951431517668547, 0.3407570422535186],
                },
                {
                  t: 1.2017846598233752,
                  v: [1, 1],
                  ease: [0.31159929257512675, 0.38869681601739836, 0.58, 1],
                },
                {
                  t: 1.2442602578454727,
                  v: [1.02, 0.95],
                  ease: [0.42, 0, 0, 0.9636255030181098],
                },
                {
                  t: 1.3707862721816209,
                  v: [1, 1.05],
                  ease: [0.42, -0.06206202263065829, 0.58, 1],
                },
                {
                  t: 1.5659785175305556,
                  v: [1, 1.05],
                  ease: [0.42, -0.06206202263065829, 0.58, 1],
                },
                { t: 1.7225242861726335, v: [1, 1], ease: [0.42, 0, 0.58, 1] },
              ],
              rotation: [
                {
                  t: 0.07894117002629274,
                  v: [0, 0, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.5890803023663453,
                  v: [
                    -30.114678799869385, -0.3481515921755908, 14.22102163595976,
                  ],
                  ease: [
                    0.7300325174456456, -0.12405425024558042,
                    0.3365835061031919, 0.8017889379937657,
                  ],
                },
                {
                  t: 1.1421861305872043,
                  v: [
                    -22.577941336944804, 6.412920843838687, -21.655639323327193,
                  ],
                  ease: [
                    0.583298559499341, -0.33760664743211344,
                    0.32045494511798944, 1.0963542960860653,
                  ],
                },
                {
                  t: 1.9672542725679227,
                  v: [
                    -2.0781042925060573, 2.7701174100260233,
                    -1.1097245079483975,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 2.265132022348826,
                  v: [0, 0, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
              position: [
                {
                  t: 0.21523060911481157,
                  v: [0, 0],
                  ease: [
                    0.26223486988161915, 0.6947245975855132,
                    0.19480556164846297, 0.9038661358145291,
                  ],
                },
                {
                  t: 0.4114390589896057,
                  v: [4251034064187152e-20, 0.2658889947011273],
                  ease: [
                    0.6174717437059508, -0.1285535110701914, 0.9558063166458642,
                    1.4558335539794296,
                  ],
                },
                {
                  t: 0.7733546480351897,
                  v: [0, 0.0027633019963448496],
                  ease: [
                    0.09538195235865887, 0.5878716966122386,
                    0.07993556895591414, 0.9424688534678969,
                  ],
                },
                {
                  t: 0.9897759640666083,
                  v: [4251034064187152e-20, 0.2724621969461928],
                  ease: [
                    0.8363729761758775, -0.06230462217533443,
                    0.9982539187302559, 1.5,
                  ],
                },
                {
                  t: 1.2463303718735304,
                  v: [0, 0.004098894994698572],
                  ease: [
                    0.0027852407545025976, 0.747585125427439,
                    0.2902850468489716, 1.075893533235889,
                  ],
                },
                {
                  t: 1.4277545322137832,
                  v: [4251034064187152e-20, 0.20927514060819213],
                  ease: [
                    0.6418193857854623, 0.06919682671194852, 0.999114846102708,
                    1.0051682084254565,
                  ],
                },
                {
                  t: 1.6154571730378309,
                  v: [0, -0.0012722231452485869],
                  ease: [
                    0.1439324608778934, 0.5569463954729904, 0.40675790714828725,
                    0.8986649812795062,
                  ],
                },
                {
                  t: 1.6919913573024103,
                  v: [4251034064187152e-20, 0.12826705419287673],
                  ease: [
                    0.7357127354801332, -0.23608339420075217, 0.998983119560359,
                    1.0241908800770656,
                  ],
                },
                {
                  t: 1.838861098534871,
                  v: [0, -0.00406003797139351],
                  ease: [
                    0.16778668894268609, 0.5982980173372091, 0.2604597520439014,
                    0.8844972998628613,
                  ],
                },
                {
                  t: 1.8667112801287638,
                  v: [4251034064187152e-20, 0.07903432452816228],
                  ease: [
                    0.4685028760838894, -0.42953625372100485,
                    0.9202731953835559, 0.8525061773543536,
                  ],
                },
                {
                  t: 1.9472873681398353,
                  v: [0, -0.006228275916527491],
                  ease: [
                    0.0027852407545025976, 1.5, 0.48865476645304945,
                    0.9551260679225434,
                  ],
                },
              ],
            },
          },
          {
            name: "Done_B",
            duration: 1.8,
            body: "sphere",
            squashAnchor: -1,
            workArea: null,
            inspect: { bias: -1, follow: !1 },
            tracks: {
              expression: [
                { t: 0.1, v: "happy", ease: [0.4, 0.22, 0.28, 1.34] },
              ],
              squash: [
                { t: 0, v: [1, 1], ease: [0.42, 0, 0.58, 1] },
                { t: 0.24, v: [1.12, 0.88], ease: [0.42, 0, 0.58, 1] },
                { t: 0.46, v: [0.93, 1.09], ease: [0.42, 0, 0.58, 1] },
                { t: 0.68, v: [1.04, 0.97], ease: [0.42, 0, 0.58, 1] },
                { t: 0.92, v: [1, 1], ease: [0.42, 0, 0.58, 1] },
              ],
            },
          },
          {
            name: "Done_C",
            duration: 2,
            body: "sphere",
            squashAnchor: -1,
            workArea: null,
            inspect: { bias: -1, follow: !0 },
            tracks: {
              expression: [
                {
                  t: 0,
                  v: "happy",
                  ease: [
                    0.7416814271255061, 0.03220016891891886,
                    0.26459703947368424, 1.0216427364864864,
                  ],
                },
                {
                  t: 1.1902334624750293,
                  v: "neutral",
                  ease: [
                    0.8458217358299596, 0.40487753378378377,
                    0.13769926619433198, 0.9154349662162162,
                  ],
                },
              ],
              position: [
                {
                  t: 0,
                  v: [0, 0],
                  ease: [0.42, 0, 0.4073342890672376, 1.018190339792799],
                },
                {
                  t: 0.3798103165938864,
                  v: [-0.1054748164006256, 0.1247799599228919],
                  ease: [
                    0.6446428602987402, 0.013555142906648983,
                    0.26273657853993304, 1.0464437149441994,
                  ],
                },
                {
                  t: 0.9426716022659842,
                  v: [0.10617803719053583, 0.1550632852223643],
                  ease: [
                    0.8992655949641883, 0.06226468791954258, 0.6897429932929974,
                    1.0606800225733635,
                  ],
                },
                {
                  t: 1.3822867688368345,
                  v: [0.011140244111415301, -0.17250079856992764],
                  ease: [
                    0.5369766709678977, 0.09639530999237222, 0.4242841447981972,
                    0.8655803895199093,
                  ],
                },
                {
                  t: 1.5768176200981194,
                  v: [0.009657934584899294, 0.02418870866616249],
                  ease: [0.10285717371228631, 0.44298137016142797, 0.58, 1],
                },
                {
                  t: 1.7545755610844578,
                  v: [0.005569779366063913, -0.08650009457623184],
                  ease: [0.11393164333435832, 0.20842906107559217, 0.58, 1],
                },
                { t: 1.9557554786340765, v: [0, 0], ease: [0.42, 0, 0.58, 1] },
              ],
              rotation: [
                {
                  t: 0,
                  v: [0, 0, 0],
                  ease: [
                    0.7521899922111783, 0, 0.29680419697434735,
                    1.2284132127170915,
                  ],
                },
                {
                  t: 0.3798103165938864,
                  v: [
                    -31.25365067481446, -5.533499139447874, 13.746823539571478,
                  ],
                  ease: [
                    0.6650959278914218, 0.08187947429053509,
                    0.027403916739799694, 1.175374728587553,
                  ],
                },
                {
                  t: 0.9426716022659842,
                  v: [
                    -30.6162399609899, 14.144576441037861, -12.73974221895198,
                  ],
                  ease: [
                    0.8992655949641883, 0.06226468791954258, 0.6897429932929974,
                    1.0606800225733635,
                  ],
                },
                {
                  t: 1.3972576410224693,
                  v: [
                    19.356472882732792, 0.12303000388944017,
                    -1.6697872707546177,
                  ],
                  ease: [
                    0.5369766709678977, 0.09639530999237222, 0.4242841447981972,
                    0.8655803895199093,
                  ],
                },
                {
                  t: 1.5873362914457065,
                  v: [
                    -4.965245810760847, -1.410803032494741,
                    -0.08557034006007683,
                  ],
                  ease: [0.10285717371228631, 0.44298137016142797, 0.58, 1],
                },
                {
                  t: 1.7574889536920633,
                  v: [
                    12.945220298267941, -0.9549298574076148,
                    -1.3541756721371099,
                  ],
                  ease: [0.11393164333435832, 0.20842906107559217, 0.58, 1],
                },
                {
                  t: 1.9557554786340765,
                  v: [0, 0, 0],
                  ease: [
                    0.7521899922111783, 0, 0.29680419697434735,
                    1.2284132127170915,
                  ],
                },
              ],
            },
          },
          {
            name: "Idle_A",
            duration: 6,
            body: "sphere",
            squashAnchor: 0,
            workArea: null,
            inspect: { bias: -1, follow: !0 },
            tracks: {
              position: [
                {
                  t: 0.4874467656537753,
                  v: [0, 0],
                  ease: [
                    0.39919726822734797, -0.1380913825536936,
                    0.15951040179591214, 1,
                  ],
                },
                {
                  t: 1.3832000000000173,
                  v: [-0.14647919001828796, 0.027266090496135924],
                  ease: [
                    0.5825263567433967, 0.31017058172003364,
                    0.04617913732408452, 1.3610608114532912,
                  ],
                },
                {
                  t: 1.77965296961326,
                  v: [-0.14647919001828796, 0.027266090496135924],
                  ease: [
                    0.22005965712189499, 0.31017058172003364,
                    0.04617913732408452, 0.9652306378531971,
                  ],
                },
                {
                  t: 2.75,
                  v: [-0.0745899946905787, -0.16596550351011732],
                  ease: [
                    0.7924378812353865, 0.08203268815009183,
                    0.20257664629337524, 0.5708768022766131,
                  ],
                },
                {
                  t: 2.9261481353591154,
                  v: [-0.0745899946905787, -0.16596550351011732],
                  ease: [
                    0.9024115240536277, 0.09528443113772456,
                    0.31187154968454267, 0.9286115269461079,
                  ],
                },
                {
                  t: 4.0795674814720835,
                  v: [0, 0],
                  ease: [
                    0.8772841365461845, 0.09396460316883949, 0,
                    0.9378491736838274,
                  ],
                },
                { t: 5.754212106241882, v: [0, 0], ease: [0.42, 0, 0.58, 1] },
              ],
              rotation: [
                {
                  t: 0.4874467656537753,
                  v: [0, 0, 0],
                  ease: [
                    0.39919726822734797, -0.1380913825536936,
                    0.15951040179591214, 1,
                  ],
                },
                {
                  t: 1.3832000000000173,
                  v: [
                    -16.083597442672094, -32.69316873461356,
                    -11.038560548848148,
                  ],
                  ease: [
                    0.5825263567433967, 0.31017058172003364,
                    0.04617913732408452, 1.3610608114532912,
                  ],
                },
                {
                  t: 1.77965296961326,
                  v: [
                    -13.471262391203387, -31.664036845872012,
                    -11.622988481798327,
                  ],
                  ease: [
                    0.22005965712189499, 0.31017058172003364,
                    0.04617913732408452, 0.9652306378531971,
                  ],
                },
                {
                  t: 2.75,
                  v: [
                    10.37381753258554, 13.583422586232203, 10.666197221172675,
                  ],
                  ease: [
                    0.7924378812353865, 0.08203268815009183,
                    0.20257664629337524, 0.5708768022766131,
                  ],
                },
                {
                  t: 2.9261481353591154,
                  v: [22.819835891847944, 5.292311893891789, 5.163005094237094],
                  ease: [1, -0.5, 0.4051656151419559, 0.8872272583365959],
                },
                {
                  t: 4.0795674814720835,
                  v: [
                    -24.875244874578584, 31.812786832669843, 15.07444269105954,
                  ],
                  ease: [
                    0.8772841365461845, 0.09396460316883949, 0,
                    0.9378491736838274,
                  ],
                },
                {
                  t: 5.754212106241882,
                  v: [0, 360, 0],
                  ease: [
                    0.9122920380277829, 0.038550560528246756,
                    0.4251612081579069, 0.8172019143128422,
                  ],
                },
              ],
              expression: [
                { t: 1.1628970994475138, v: "blink", ease: [0.42, 0, 0.58, 1] },
                { t: 4.00439785911593, v: "blink", ease: [0.42, 0, 0.58, 1] },
                {
                  t: 5.643314779005485,
                  v: "neutral",
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
            },
          },
          {
            name: "Idle_B",
            duration: 4,
            body: "sphere",
            squashAnchor: 0,
            workArea: null,
            inspect: { bias: -1, follow: !0 },
            tracks: {
              position: [
                { t: 1.6054821209465213, v: [0, 0], ease: [0.42, 0, 0.58, 1] },
              ],
              rotation: [
                {
                  t: 0.9010370289220491,
                  v: [0, 0, 0],
                  ease: [0.42, 0, 0.28927730966925536, 0.9624241226685105],
                },
                {
                  t: 1.6163686240140267,
                  v: [
                    0.12032076750937498, -8.658512604326788,
                    -2.5426418939710658,
                  ],
                  ease: [
                    0.8747812559101849, -0.03625853912624016,
                    0.25467036702156304, 0.8980229024542974,
                  ],
                },
                {
                  t: 2.4902049517966525,
                  v: [
                    0.9659548057072269, 5.658900089349377, 1.7129240357574211,
                  ],
                  ease: [
                    0.6027205111294465, -0.23084976154500042,
                    0.2902495275740431, 0.9815467952425966,
                  ],
                },
                { t: 3.45704978089402, v: [0, 0, 0], ease: [0.42, 0, 0.58, 1] },
              ],
              scale: [
                {
                  t: 0,
                  v: [0.6],
                  ease: [
                    0.6180446538332104, 0.0012432525890504465,
                    0.1839130507609582, 0.9358696746423821,
                  ],
                },
                {
                  t: 1.6054821209465213,
                  v: [0.64],
                  ease: [
                    0.8658706538170823, -0.07995460153625837,
                    0.29979142380351903, 1.0195121615474219,
                  ],
                },
                {
                  t: 3.841942375109553,
                  v: [0.6],
                  ease: [
                    0.6180446538332104, 0.0012432525890504465,
                    0.1839130507609582, 0.9405530305724485,
                  ],
                },
              ],
              expression: [
                {
                  t: 1.4811034202342213,
                  v: "blink",
                  ease: [0.4, 0.22, 0.28, 1.34],
                },
                {
                  t: 3.45704978089402,
                  v: "blink",
                  ease: [0.4, 0.22, 0.28, 1.34],
                },
              ],
            },
          },
          {
            name: "Idle_D",
            duration: 6,
            body: "sphere",
            squashAnchor: 0,
            workArea: null,
            inspect: { bias: -1, follow: !0 },
            tracks: {
              rotation: [
                {
                  t: 0,
                  v: [
                    -15.896271043294888, 33.29315635042974, 25.38480127460161,
                  ],
                  ease: [0.6511065418455951, 0, 0.3268385117846959, 1],
                },
                {
                  t: 0.5867355510752692,
                  v: [
                    -34.32339609164593, 16.86196736106905, 15.137354734738835,
                  ],
                  ease: [0.5996715199956071, 0, 0.24671113951908907, 1],
                },
                {
                  t: 1.0783308131720428,
                  v: [
                    -34.32339609164593, 16.86196736106905, 15.137354734738835,
                  ],
                  ease: [0.5996715199956071, 0, 0.10657397408207336, 1],
                },
                {
                  t: 1.962638608870968,
                  v: [
                    -6.1682538522357975, 3.098853229789992, 14.349419848128031,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 2.671748991935484,
                  v: [
                    -6.1682538522357975, 3.098853229789992, 14.349419848128031,
                  ],
                  ease: [0.42, 0, 0.2029056425485961, 1],
                },
                {
                  t: 3.914377520161291,
                  v: [7.572938650100637, 40.386943374478015, 25.47389006919084],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 4.785706485215049,
                  v: [7.572938650100637, 40.386943374478015, 25.47389006919084],
                  ease: [0.6315554130669547, 0, 0.21641299946004333, 1],
                },
                {
                  t: 5.632732694892469,
                  v: [
                    -15.896271043294888, 33.29315635042974, 25.38480127460161,
                  ],
                  ease: [0.6511065418455951, 0, 0.3268385117846959, 1],
                },
              ],
              expression: [
                {
                  t: 0.5929099462365591,
                  v: "blink",
                  ease: [0.4, 0.22, 0.28, 1.34],
                },
                {
                  t: 2.0691383064517033,
                  v: "blink",
                  ease: [0.4, 0.22, 0.28, 1.34],
                },
                {
                  t: 2.3722908266129035,
                  v: "blink",
                  ease: [0.4, 0.22, 0.28, 1.34],
                },
                {
                  t: 4.247479838709677,
                  v: "blink",
                  ease: [0.4, 0.22, 0.28, 1.34],
                },
              ],
            },
          },
          {
            name: "Logo_A",
            duration: 4,
            body: "sphere",
            squashAnchor: 0,
            workArea: { start: 0, end: 2.0002578769692425 },
            inspect: { bias: -1, follow: !0 },
            tracks: {
              rotation: [
                {
                  t: 0,
                  v: [
                    -15.896271043294888, 33.29315635042974, 25.38480127460161,
                  ],
                  ease: [
                    0.940308570092613, 0, 0.8322175812019608,
                    0.42841310531523513,
                  ],
                },
                {
                  t: 0.9325431465191484,
                  v: [
                    -15.896271043294888, 290.3612956381275, 25.38480127460161,
                  ],
                  ease: [
                    0.08370250411471428, 0.7821860109261747, 0.1762354651162792,
                    1,
                  ],
                },
                {
                  t: 1.9567938859714928,
                  v: [
                    -15.896271043294888, 393.29315635042974, 25.38480127460161,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
            },
          },
          {
            name: "Logo_B",
            duration: 4,
            body: "sphere",
            squashAnchor: 0,
            workArea: { start: 0, end: 3.1220695798949736 },
            inspect: { bias: -1, follow: !0 },
            tracks: {
              rotation: [
                {
                  t: 0,
                  v: [
                    -15.896271043294888, 33.29315635042974, 25.38480127460161,
                  ],
                  ease: [
                    0.77323790487339, 0, 0.19818347223390587,
                    0.9476806070764106,
                  ],
                },
                {
                  t: 0.7185100111661579,
                  v: [
                    -11.287778634690255, -33.00231519019303,
                    -21.062449423926747,
                  ],
                  ease: [
                    0.2717748154604947, -0.2636988609351958, 0.6005198984279181,
                    0.023491972600300434,
                  ],
                },
                {
                  t: 1.141527569392348,
                  v: [
                    -11.399396607755296, -31.39663474186699,
                    -19.937494120163255,
                  ],
                  ease: [
                    0.9137669521901326, 0.04016940837145343, 0.8322175812019608,
                    0.42841310531523513,
                  ],
                },
                {
                  t: 2.074070715911496,
                  v: [
                    -15.896271043294888, 290.3612956381275, 25.38480127460161,
                  ],
                  ease: [
                    0.08370250411471428, 0.7821860109261747, 0.1762354651162792,
                    1,
                  ],
                },
                {
                  t: 3.0983214553638407,
                  v: [
                    -15.896271043294888, 393.29315635042974, 25.38480127460161,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
            },
          },
          {
            name: "Marketing_A",
            duration: 4,
            body: "sphere",
            squashAnchor: 0,
            workArea: null,
            inspect: { bias: -1, follow: !0 },
            tracks: {
              position: [
                {
                  t: 0.6167064755838638,
                  v: [0, 0],
                  ease: [0.5771393784786643, 0, 0.41654104823747684, 1],
                },
                {
                  t: 1.4190773177636233,
                  v: [-0.16387514369529332, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 2.2684226822363764,
                  v: [-0.16387514369529332, 0.05904395257747427],
                  ease: [0.580719503710575, 0, 0, 1],
                },
                {
                  t: 3.1610281808035716,
                  v: [0, 0],
                  ease: [0.5771393784786643, 0, 0.41654104823747684, 1],
                },
              ],
              rotation: [
                {
                  t: 0,
                  v: [
                    -15.896271043294888, 33.29315635042974, 25.38480127460161,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.6167064755838638,
                  v: [
                    -15.896271043294888, 33.29315635042974, 25.38480127460161,
                  ],
                  ease: [
                    0.8625910776088882, -0.041613616273912, 0.25952275632662025,
                    1.049784301761229,
                  ],
                },
                {
                  t: 1.4190773177636233,
                  v: [
                    -2.97589945531819, -26.234478989223906, -3.2544499064295738,
                  ],
                  ease: [
                    0.7818125791576046, 0.15346315752484826,
                    0.32687664998404986, 1.1173618829561318,
                  ],
                },
                {
                  t: 2.2684226822363764,
                  v: [
                    -31.58476211869586, -3.710798107118315, 24.071416454447956,
                  ],
                  ease: [
                    0.36229770668640776, -0.17418027527991467,
                    0.2875659277885649, 1.2452842602722636,
                  ],
                },
                {
                  t: 2.7962446921443735,
                  v: [
                    -27.874087487241205, 0.739249290532289, 5.007074162025872,
                  ],
                  ease: [0.42, 0.044881803684311196, 0.58, 1],
                },
                {
                  t: 3.2725893489030398,
                  v: [
                    -19.255583925594408, -17.414119894980235,
                    -7.023063437300964,
                  ],
                  ease: [
                    0.49415439617951884, -0.031041466813226757,
                    0.2907565775851124, 1,
                  ],
                },
                {
                  t: 3.8435756138392856,
                  v: [
                    -19.353875077555468, 20.03044512007725, 19.013275491556097,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 3.9805733816964284,
                  v: [
                    -15.896271043294888, 33.29315635042974, 25.38480127460161,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
              expression: [
                {
                  t: 0.05960518973214285,
                  v: "neutral",
                  ease: [
                    0.7416814271255061, 0.03220016891891886,
                    0.26459703947368424, 1.0216427364864864,
                  ],
                },
                {
                  t: 2.2434315286624202,
                  v: "surprised",
                  ease: [
                    0.7416814271255061, 0.03220016891891886,
                    0.26459703947368424, 1.0216427364864864,
                  ],
                },
              ],
            },
          },
          {
            name: "Marketing_B",
            duration: 4,
            body: "sphere",
            squashAnchor: 0,
            workArea: null,
            inspect: { bias: -1, follow: !0 },
            tracks: {
              rotation: [
                {
                  t: 0,
                  v: [
                    -15.896271043294888, 33.29315635042974, 25.38480127460161,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.6167064755838638,
                  v: [
                    -15.896271043294888, 33.29315635042974, 25.38480127460161,
                  ],
                  ease: [
                    0.8625910776088882, -0.041613616273912, 0.25952275632662025,
                    1.049784301761229,
                  ],
                },
                {
                  t: 1.4190773177636233,
                  v: [
                    -2.97589945531819, -26.234478989223906, -3.2544499064295738,
                  ],
                  ease: [
                    0.7818125791576046, 0.15346315752484826,
                    0.32687664998404986, 1.1173618829561318,
                  ],
                },
                {
                  t: 2.2684226822363764,
                  v: [
                    20.16565207199379, -20.644446669166673, 22.47273384376682,
                  ],
                  ease: [
                    0.36229770668640776, -0.17418027527991467,
                    0.2875659277885649, 1.2452842602722636,
                  ],
                },
                {
                  t: 3.2725893489030398,
                  v: [
                    -20.98869306129836, -21.248460672675545, -6.20573622722674,
                  ],
                  ease: [
                    0.49415439617951884, -0.031041466813226757,
                    0.2907565775851124, 1,
                  ],
                },
                {
                  t: 4,
                  v: [
                    -23.757982259034762, 24.83627384870201, 18.82083960330674,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
              expression: [
                {
                  t: 0,
                  v: "neutral",
                  ease: [
                    0.7416814271255061, 0.03220016891891886,
                    0.26459703947368424, 1.0216427364864864,
                  ],
                },
                {
                  t: 1.4471868365180467,
                  v: "calm",
                  ease: [
                    0.7416814271255061, 0.03220016891891886,
                    0.26459703947368424, 1.0216427364864864,
                  ],
                },
              ],
            },
          },
          {
            name: "Marketing_C",
            duration: 4,
            body: "sphere",
            squashAnchor: 0,
            workArea: null,
            inspect: { bias: -1, follow: !0 },
            tracks: {
              rotation: [
                {
                  t: 0,
                  v: [
                    -15.896271043294888, 33.29315635042974, 25.38480127460161,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.6167064755838638,
                  v: [
                    -15.896271043294888, 33.29315635042974, 25.38480127460161,
                  ],
                  ease: [
                    0.8625910776088882, -0.041613616273912, 0.25952275632662025,
                    1.049784301761229,
                  ],
                },
                {
                  t: 1.4190773177636233,
                  v: [
                    -2.97589945531819, -26.234478989223906, -3.2544499064295738,
                  ],
                  ease: [
                    0.7818125791576046, 0.15346315752484826,
                    0.32687664998404986, 1.1173618829561318,
                  ],
                },
                {
                  t: 2.2684226822363764,
                  v: [
                    20.16565207199379, -20.644446669166673, 22.47273384376682,
                  ],
                  ease: [
                    0.36229770668640776, -0.17418027527991467,
                    0.2875659277885649, 1.2452842602722636,
                  ],
                },
                {
                  t: 3.2725893489030398,
                  v: [
                    -20.98869306129836, -21.248460672675545, -6.20573622722674,
                  ],
                  ease: [
                    0.49415439617951884, -0.031041466813226757,
                    0.2907565775851124, 1,
                  ],
                },
                {
                  t: 4,
                  v: [
                    -23.757982259034762, 24.83627384870201, 18.82083960330674,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
              expression: [
                {
                  t: 0,
                  v: "neutral",
                  ease: [
                    0.7416814271255061, 0.03220016891891886,
                    0.26459703947368424, 1.0216427364864864,
                  ],
                },
                {
                  t: 1.4471868365180467,
                  v: "calm",
                  ease: [
                    0.7416814271255061, 0.03220016891891886,
                    0.26459703947368424, 1.0216427364864864,
                  ],
                },
              ],
            },
          },
          {
            name: "Marketing_D",
            duration: 4,
            body: "sphere",
            squashAnchor: -1,
            workArea: null,
            inspect: { bias: -1, follow: !0 },
            tracks: {
              expression: [
                {
                  t: 0.05498053786270347,
                  v: "neutral",
                  ease: [
                    0.7416814271255061, 0.03220016891891886,
                    0.26459703947368424, 1.0216427364864864,
                  ],
                },
                {
                  t: 0.7522248761500355,
                  v: "happy",
                  ease: [
                    0.7416814271255061, 0.03220016891891886,
                    0.26459703947368424, 1.0216427364864864,
                  ],
                },
                {
                  t: 3.188380537862626,
                  v: "neutral",
                  ease: [
                    0.7416814271255061, 0.03220016891891886,
                    0.26459703947368424, 1.0216427364864864,
                  ],
                },
              ],
              squash: [
                { t: 0.6800000000000002, v: [1, 1], ease: [0.42, 0, 0.58, 1] },
                {
                  t: 0.9199999999999999,
                  v: [1.12, 0.88],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 1.1400000000000001,
                  v: [0.93, 1.09],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 1.3600000000000003,
                  v: [1.04, 0.97],
                  ease: [0.42, 0, 0.58, 1],
                },
                { t: 1.6, v: [1, 1], ease: [0.42, 0, 0.58, 1] },
              ],
              rotation: [
                {
                  t: 0,
                  v: [
                    -6.345525006325851, 19.726304895345887, 7.225894380877916,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.68,
                  v: [
                    -6.345525006325851, 19.726304895345887, 7.225894380877916,
                  ],
                  ease: [0.6287715517241379, 0, 0.1652870297805643, 1],
                },
                {
                  t: 1.80886178343963,
                  v: [
                    7.946317173704124, -27.372379409841862, -13.611633161590936,
                  ],
                  ease: [0.5888217507250163, 0, 0, 1],
                },
                {
                  t: 3.406449044585987,
                  v: [0, 0, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 3.887429228591649,
                  v: [
                    -6.345525006325851, 19.726304895345887, 7.225894380877916,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
            },
          },
          {
            name: "Rotation_A",
            duration: 6,
            body: "cloud",
            squashAnchor: 0,
            workArea: null,
            inspect: { bias: -1, follow: !0 },
            tracks: {
              rotation: [
                {
                  t: 0,
                  v: [
                    2.3120950657104795, -34.698071961330996, 6.287220573778937,
                  ],
                  ease: [0.001, 0.001, 0.999, 0.999],
                },
                {
                  t: 3.0420576880625374,
                  v: [
                    -15.896271043294888, 393.29315635042974, 25.38480127460161,
                  ],
                  ease: [0.001, 0.001, 0.999, 0.999],
                },
                {
                  t: 5.685518927730484,
                  v: [-26.2, 719.4, 25.38480127460161],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
            },
          },
          {
            name: "Rotation_B",
            duration: 10,
            body: "cloud",
            squashAnchor: 0,
            workArea: null,
            inspect: { bias: -1, follow: !0 },
            tracks: {
              rotation: [
                {
                  t: 0,
                  v: [
                    -5.86170199829258, -66.48579621643268, 11.013855401509232,
                  ],
                  ease: [0.001, 0.001, 0.999, 0.999],
                },
                {
                  t: 10,
                  v: [-5.86170199829258, 293.5142037835673, 11.013855401509232],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
            },
          },
          {
            name: "Rotation_C",
            duration: 4,
            body: "cloud",
            squashAnchor: 0,
            workArea: null,
            inspect: { bias: -1, follow: !0 },
            tracks: {
              position: [{ t: 0, v: [0, 0], ease: [0.42, 0, 0.58, 1] }],
              rotation: [
                {
                  t: 0,
                  v: [-35, -28.5, 8.9],
                  ease: [0.001, 0.001, 0.999, 0.999],
                },
                {
                  t: 3.954889112903226,
                  v: [30.3, -25.03032384031022, 25.838583124958074],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
              expression: [
                {
                  t: 2.02137936827957,
                  v: "blink",
                  ease: [0.4, 0.22, 0.28, 1.34],
                },
              ],
            },
          },
          {
            name: "Streaming_A",
            duration: 2.6,
            body: "sphere",
            squashAnchor: 0,
            workArea: { start: 0, end: 2.593141413751879 },
            inspect: { bias: -1, follow: !0 },
            tracks: {
              rotation: [
                {
                  t: 0,
                  v: [
                    -17.330877831673277, 2.263279637703984, 15.443629275983977,
                  ],
                  ease: [
                    0.7300325174456456, -0.12405425024558042,
                    0.40585908939755444, 1.0050376870076922,
                  ],
                },
                {
                  t: 0.3458182816671912,
                  v: [
                    9.638628832336948, 2.025895269795649, -1.2527648183630171,
                  ],
                  ease: [
                    0.4224707625763918, 0.0022972310598335997, 0.58,
                    0.9927354054381194,
                  ],
                },
                {
                  t: 0.5813687143348092,
                  v: [
                    -15.366003917619995, -2.619836674995623, -2.16549892253304,
                  ],
                  ease: [
                    0.7322498965237162, -0.011667049678267111, 0,
                    0.9141484219009502,
                  ],
                },
                {
                  t: 0.8343818658890081,
                  v: [
                    4.338039365692767, 0.49348825557993187, -3.7087410402723067,
                  ],
                  ease: [
                    0.1580317356155577, -0.07611268668891613,
                    0.32045494511798944, 1.0963542960860653,
                  ],
                },
                {
                  t: 1.2183655201918815,
                  v: [-0.2793440526930908, 0, 0],
                  ease: [
                    0.7202644919359068, 0, 0.414580660247694,
                    0.9498001208025284,
                  ],
                },
                {
                  t: 1.6185917357603328,
                  v: [
                    -5.399115822872089, 14.530502605079048, 3.1285787766973128,
                  ],
                  ease: [
                    0.603730806420981, -0.0304892240026259, 0.2700959962528573,
                    0.9305186654092706,
                  ],
                },
                {
                  t: 2.0602042690217752,
                  v: [
                    -2.088336039091766, -10.814208972017363,
                    -20.009405175503947,
                  ],
                  ease: [
                    0.48373539910046165, -0.09542268080702558,
                    0.26548699703136136, 1,
                  ],
                },
                {
                  t: 2.593141413751879,
                  v: [
                    -17.330877831673277, 2.263279637703984, 15.443629275983977,
                  ],
                  ease: [
                    0.7300325174456456, -0.12405425024558042,
                    0.40585908939755444, 1.0050376870076922,
                  ],
                },
              ],
              position: [
                {
                  t: 0.008051106963364502,
                  v: [0, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.34800758255567965,
                  v: [0, -0.09893530004977505],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.5873549334090005,
                  v: [0, 0.04654750224419043],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.8343818658890081,
                  v: [0, 0.004683687521738383],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 1.2183655201918815,
                  v: [0, 0],
                  ease: [0.42, 0, 0.27743996350027533, 0.9367983894536062],
                },
                {
                  t: 1.6185917357603328,
                  v: [0.12655004394233813, 0],
                  ease: [
                    0.603730806420981, -0.0304892240026259, 0.2700959962528573,
                    0.9282552090918559,
                  ],
                },
                {
                  t: 2.0602042690217752,
                  v: [-0.1362091399555723, 0],
                  ease: [
                    0.48373539910046165, -0.09542268080702558,
                    0.26548699703136136, 1,
                  ],
                },
                { t: 2.593141413751879, v: [0, 0], ease: [0.42, 0, 0.58, 1] },
              ],
            },
          },
          {
            name: "Streaming_B",
            duration: 2.6,
            body: "sphere",
            squashAnchor: 0,
            workArea: { start: 0, end: 2.593141413751879 },
            inspect: { bias: -1, follow: !0 },
            tracks: {
              expression: [
                {
                  t: 0.8343818658890081,
                  v: "surprised",
                  ease: [
                    0.8458217358299596, 0.40487753378378377,
                    0.13769926619433198, 0.9154349662162162,
                  ],
                  cut: !0,
                },
                {
                  t: 2.1679160926807017,
                  v: "neutral",
                  ease: [
                    0.8458217358299596, 0.40487753378378377,
                    0.13769926619433198, 0.9154349662162162,
                  ],
                  cut: !0,
                },
              ],
              rotation: [
                {
                  t: 0,
                  v: [
                    -15.896271043294888, 33.29315635042974, 25.38480127460161,
                  ],
                  ease: [
                    0.7300325174456456, -0.12405425024558042,
                    0.40585908939755444, 1.0050376870076922,
                  ],
                },
                {
                  t: 0.3458182816671912,
                  v: [
                    9.638628832336948, 2.025895269795649, -1.2527648183630171,
                  ],
                  ease: [
                    0.4224707625763918, 0.0022972310598335997, 0.58,
                    0.9927354054381194,
                  ],
                },
                {
                  t: 0.8343818658890081,
                  v: [
                    -13.158704916519811, -16.90797681471658, -2.914418472822627,
                  ],
                  ease: [
                    0.1580317356155577, -0.07611268668891613,
                    0.32045494511798944, 1.0963542960860653,
                  ],
                },
                {
                  t: 1.2183655201918815,
                  v: [
                    3.3337098816649693, 21.543227556484112, 4.461698658684633,
                  ],
                  ease: [
                    0.7202644919359068, 0, 0.414580660247694,
                    0.9498001208025284,
                  ],
                },
                {
                  t: 1.6185917357603328,
                  v: [
                    -5.399115822872089, 14.530502605079048, 3.1285787766973128,
                  ],
                  ease: [
                    0.603730806420981, -0.0304892240026259, 0.2700959962528573,
                    0.9305186654092706,
                  ],
                },
                {
                  t: 2.0602042690217752,
                  v: [
                    -2.088336039091766, -10.814208972017363,
                    -20.009405175503947,
                  ],
                  ease: [
                    0.48373539910046165, -0.09542268080702558,
                    0.26548699703136136, 1,
                  ],
                },
                {
                  t: 2.593141413751879,
                  v: [
                    -15.896271043294888, 33.29315635042974, 25.38480127460161,
                  ],
                  ease: [
                    0.7300325174456456, -0.12405425024558042,
                    0.40585908939755444, 1.0050376870076922,
                  ],
                },
              ],
              position: [
                {
                  t: 0.008051106963364502,
                  v: [0, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.34800758255567965,
                  v: [0, -0.09893530004977505],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.8343818658890081,
                  v: [0, 0.004683687521738383],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 1.36568364300849,
                  v: [0.12655004394233813, 0],
                  ease: [
                    0.603730806420981, -0.0304892240026259, 0.2700959962528573,
                    0.9282552090918559,
                  ],
                },
                {
                  t: 2.0602042690217752,
                  v: [-0.1362091399555723, 0],
                  ease: [
                    0.48373539910046165, -0.09542268080702558,
                    0.26548699703136136, 1,
                  ],
                },
                { t: 2.593141413751879, v: [0, 0], ease: [0.42, 0, 0.58, 1] },
              ],
            },
          },
          {
            name: "Streaming_C",
            duration: 2.4,
            body: "sphere",
            squashAnchor: 0,
            workArea: null,
            inspect: { bias: -1, follow: !0 },
            tracks: {
              expression: [
                {
                  t: 0.0930430477108114,
                  v: "squinted",
                  ease: [
                    0.9601942054655871, -0.052470439189189255,
                    0.20804339574898786, 0.9135346283783784,
                  ],
                },
              ],
              rotation: [
                {
                  t: 0.007536501544973762,
                  v: [
                    -30.114678799869385, -0.3481515921755908,
                    10.657733527966457,
                  ],
                  ease: [
                    0.8069695446331039, 0.06068366162676136,
                    0.22176992691461772, 1.0529567094556063,
                  ],
                },
                {
                  t: 0.6967011702649526,
                  v: [
                    -25.983934007381276, 7.767555485689494, -17.97884031792412,
                  ],
                  ease: [
                    0.6337438554404256, 0.03915919163464518,
                    0.24060607252134747, 0.9552013782917067,
                  ],
                },
                {
                  t: 1.3,
                  v: [
                    -27.316297934452344, -1.3907007432867593,
                    11.301625700367927,
                  ],
                  ease: [
                    0.8069695446331039, 0.06068366162676136,
                    0.05967881944444445, 0.9976179673321233,
                  ],
                },
                {
                  t: 2.3830582002457,
                  v: [
                    -30.114678799869385, 359.6518484078244, 10.657733527966457,
                  ],
                  ease: [0.545887017284529, -0.16488185903681707, 0.58, 1],
                },
              ],
              position: [
                {
                  t: 0.007536501544973762,
                  v: [0, 0],
                  ease: [
                    0.8069695446331039, 0.06068366162676136,
                    0.22176992691461772, 1.0529567094556063,
                  ],
                },
                {
                  t: 0.6967011702649526,
                  v: [0.16304040871678732, 0.1060830475460072],
                  ease: [
                    0.6337438554404256, 0.03915919163464518,
                    0.24060607252134747, 0.9552013782917067,
                  ],
                },
                {
                  t: 1.3,
                  v: [-0.16109273893088566, 0.1112767252235085],
                  ease: [
                    0.8069695446331039, 0.06068366162676136,
                    0.05967881944444445, 0.9976179673321233,
                  ],
                },
                {
                  t: 2.3830582002457,
                  v: [0, 0],
                  ease: [
                    0.7622975213794354, -0.39274360300976613,
                    0.22176992691461772, 1.0529567094556063,
                  ],
                },
              ],
            },
          },
          {
            name: "Working_A",
            duration: 8,
            body: "sphere",
            squashAnchor: 0,
            workArea: null,
            inspect: { bias: -1, follow: !0 },
            tracks: {
              position: [
                {
                  t: 0.4874467656537753,
                  v: [0, 0],
                  ease: [
                    0.39919726822734797, -0.1380913825536936,
                    0.15951040179591214, 1,
                  ],
                },
                {
                  t: 1.3832000000000173,
                  v: [-0.14647919001828796, 0.027266090496135924],
                  ease: [
                    0.5825263567433967, 0.31017058172003364,
                    0.04617913732408452, 1.3610608114532912,
                  ],
                },
                {
                  t: 1.77965296961326,
                  v: [-0.14647919001828796, 0.027266090496135924],
                  ease: [
                    0.22005965712189499, 0.31017058172003364,
                    0.04617913732408452, 0.9652306378531971,
                  ],
                },
                {
                  t: 2.5961328343722427,
                  v: [0.06209379465135341, 0.0363636826260471],
                  ease: [
                    0.6823010997778416, 0.03975119923438924, 0.58,
                    0.7462988396745895,
                  ],
                },
                {
                  t: 3.066377943544433,
                  v: [-0.016487420591570615, 0.0804209848791122],
                  ease: [
                    0.8034080182827295, -0.08276325518488785,
                    0.6510110561346553, 0.8128258749805829,
                  ],
                },
                {
                  t: 3.426085780646072,
                  v: [-0.008916270094194876, -0.2135819760518346],
                  ease: [
                    0.1744021985074266, -0.5, 0.8865519014643501,
                    -0.2214168917492133,
                  ],
                },
                {
                  t: 4.00439785911593,
                  v: [-0.0052248049102180776, -0.12515593913381462],
                  ease: [
                    0.023812816055625345, 0.31341394515796384,
                    0.0448947139696587, 1.0658309377957906,
                  ],
                },
                { t: 5.005029942257856, v: [0, 0], ease: [0.42, 0, 0.58, 1] },
                {
                  t: 6.298778790534628,
                  v: [0.03813914798218992, -0.019258402700427682],
                  ease: [
                    0.576933472628317, 0.007827540903749368,
                    0.12610215878412523, 0.9598864308897559,
                  ],
                },
                {
                  t: 6.952426906222622,
                  v: [-0.25, -0.004137934943726919],
                  ease: [
                    0.8326089284460128, -0.06392110845094923,
                    0.3654460022570882, 1.0352901568389925,
                  ],
                },
                {
                  t: 7.900964066608238,
                  v: [0, 0],
                  ease: [
                    0.39919726822734797, -0.1380913825536936,
                    0.15951040179591214, 1,
                  ],
                },
              ],
              rotation: [
                {
                  t: 0.4874467656537753,
                  v: [0, 0, 0],
                  ease: [
                    0.39919726822734797, -0.1380913825536936,
                    0.15951040179591214, 1,
                  ],
                },
                {
                  t: 1.3832000000000173,
                  v: [
                    -11.013174031248813, -20.059833580125414,
                    -12.896783267756348,
                  ],
                  ease: [
                    0.5825263567433967, 0.31017058172003364,
                    0.04617913732408452, 1.3610608114532912,
                  ],
                },
                {
                  t: 1.77965296961326,
                  v: [
                    -17.48975478197329, -18.703976724880516,
                    -12.678205332257816,
                  ],
                  ease: [
                    0.22005965712189499, 0.31017058172003364,
                    0.04617913732408452, 0.9652306378531971,
                  ],
                },
                {
                  t: 2.5961328343722427,
                  v: [
                    -14.554913391638532, 17.164836260093473, 9.376528927180779,
                  ],
                  ease: [
                    0.6823010997778416, 0.03975119923438924, 0.58,
                    0.9240336563778733,
                  ],
                },
                {
                  t: 3.1796016343940767,
                  v: [
                    -24.586251970533304, 0.14133926125606477,
                    -0.7477216271856462,
                  ],
                  ease: [
                    0.8034080182827295, -0.08276325518488785,
                    0.9143306014396848, 0.4851034680582119,
                  ],
                },
                {
                  t: 3.4679142027965795,
                  v: [
                    -1.0943281912285556, -1.1346215368163393,
                    -0.7116952620126241,
                  ],
                  ease: [
                    0.12040927423864656, -0.18872517040581954,
                    0.9481776569383256, -0.20917925086224787,
                  ],
                },
                {
                  t: 4.001861402631413,
                  v: [
                    -147.11069531984157, -0.6757806869448113,
                    -0.4238857605398247,
                  ],
                  ease: [
                    0.03131913716814155, 0.8644907690193963, 0.0448947139696587,
                    1.0658309377957906,
                  ],
                },
                {
                  t: 5.005029942257856,
                  v: [-360, 0, 0],
                  ease: [
                    0.7970933306500759, -0.5, 0.24118105710043447,
                    0.7361553789450831,
                  ],
                },
                {
                  t: 6.298778790534628,
                  v: [
                    -364.89323527138873, 18.626179650675688,
                    -0.2598233988596897,
                  ],
                  ease: [
                    0.576933472628317, 0.007827540903749368,
                    0.12610215878412523, 0.9742744867440337,
                  ],
                },
                {
                  t: 6.952426906222622,
                  v: [
                    -366.80423922162356, -23.365336474310464,
                    -3.339162411443921,
                  ],
                  ease: [
                    0.8326089284460128, -0.06392110845094923,
                    0.3654460022570882, 1.0352901568389925,
                  ],
                },
                {
                  t: 7.900964066608238,
                  v: [-360, 0, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
              expression: [
                { t: 1.1672000000000002, v: "blink", ease: [0.42, 0, 0.58, 1] },
                {
                  t: 1.77965296961326,
                  v: "surprised",
                  ease: [
                    0.7394673582995951, 0.10409628378378377, 0.6676682692307693,
                    1.5,
                  ],
                },
                {
                  t: 5.643314779005485,
                  v: "neutral",
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 6.298778790534628,
                  v: "strange",
                  ease: [
                    0.9601942054655871, -0.052470439189189255,
                    0.20804339574898786, 0.9135346283783784,
                  ],
                },
                {
                  t: 7.3115338882283,
                  v: "neutral",
                  ease: [
                    0.7416814271255061, 0.03220016891891886,
                    0.26459703947368424, 1.0216427364864864,
                  ],
                },
              ],
            },
          },
          {
            name: "Working_B",
            duration: 4.8,
            body: "sphere",
            squashAnchor: 0,
            workArea: { start: 0, end: 4.8 },
            inspect: { bias: -1, follow: !0 },
            tracks: {
              position: [
                {
                  t: 0.17746730083234244,
                  v: [0, 0],
                  ease: [
                    0.807066718478605, 0.026672824415491948,
                    0.05397305674842967, 1.0519668384455731,
                  ],
                },
                {
                  t: 1.4141067024830507,
                  v: [-0.1, -14911040730998862e-21],
                  ease: [
                    0.7054694160272805, 0.15290809768637542, 0,
                    0.9011176996605331,
                  ],
                },
                {
                  t: 2.75,
                  v: [0.1, -0.0019533463357608513],
                  ease: [
                    0.8240202817829232, -0.24792725943516045,
                    0.2993925437700369, 1,
                  ],
                },
                {
                  t: 4.7824019024970275,
                  v: [0, 0],
                  ease: [0.42, 0, 0.07071724310528026, 1.3032158407916754],
                },
              ],
              rotation: [
                {
                  t: 0.17746730083234244,
                  v: [0, 0, 0],
                  ease: [
                    0.807066718478605, 0.026672824415491948,
                    0.05397305674842967, 1.0519668384455731,
                  ],
                },
                {
                  t: 1.4141067024830507,
                  v: [
                    1.431495026310406, -16.140319998213133, -36.05175434586088,
                  ],
                  ease: [
                    0.7054694160272805, 0.15290809768637542, 0,
                    0.9507801322055007,
                  ],
                },
                {
                  t: 2.75,
                  v: [
                    -3.793664340840882, 16.145026960161896, 23.111555762366347,
                  ],
                  ease: [
                    0.8145184258410576, 0.05868417745499387, 0.7187386211123404,
                    0.8220737938312388,
                  ],
                },
                {
                  t: 3.300369915174868,
                  v: [
                    -0.658471135071176, 32.094524718170625, 23.00284198348812,
                  ],
                  ease: [
                    0.9529378729987852, -0.03412152368009878,
                    0.7143170242443122, 0.5254015949332431,
                  ],
                },
                {
                  t: 3.896330300821882,
                  v: [
                    -0.03018222484427137, -273.02901001946327,
                    5.757592653481982,
                  ],
                  ease: [
                    0.11270319506726437, 0.6690303636987784,
                    0.23166630377840014, 0.9738369897382892,
                  ],
                },
                {
                  t: 4.7824019024970275,
                  v: [-0.02727988727869867, -360, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
              scale: [
                {
                  t: 0.17779177760649373,
                  v: [0.6],
                  ease: [
                    0.807066718478605, 0.026672824415491948,
                    0.05397305674842967, 0.9010023979880923,
                  ],
                },
                {
                  t: 1.4141067024830507,
                  v: [0.4215844279727266],
                  ease: [
                    0.758517646256336, -0.08984960385218788, 0.3074500979615823,
                    0.9070651813931356,
                  ],
                },
                {
                  t: 2.25,
                  v: [0.5281520264776418],
                  ease: [
                    1, 0.12529134929810246, 0.3851632150743237,
                    0.8426351606267645,
                  ],
                },
                {
                  t: 2.9883359098579825,
                  v: [0.6153393854797824],
                  ease: [
                    0.6185932743021068, -0.26875053521000764, 0.341686978852472,
                    1,
                  ],
                },
                {
                  t: 4.608223713420763,
                  v: [0.6],
                  ease: [
                    0.807066718478605, 0.026672824415491948,
                    0.05397305674842967, 1.0519668384455731,
                  ],
                },
              ],
              expression: [
                {
                  t: 0.7466486120839366,
                  v: "inspect",
                  ease: [
                    0.7416814271255061, 0.03220016891891886,
                    0.26459703947368424, 1.0216427364864864,
                  ],
                },
                {
                  t: 2.556108799048751,
                  v: "surprised",
                  ease: [
                    0.7416814271255061, 0.03220016891891886,
                    0.26459703947368424, 1.0216427364864864,
                  ],
                },
                {
                  t: 3.7592152199762188,
                  v: "neutral",
                  ease: [
                    0.7416814271255061, 0.03220016891891886,
                    0.26459703947368424, 1.0216427364864864,
                  ],
                },
              ],
            },
          },
          {
            name: "Working_C",
            duration: 5,
            body: "sphere",
            squashAnchor: 0,
            workArea: null,
            inspect: { bias: -1, follow: !0 },
            tracks: {
              position: [
                {
                  t: 0.17491812227074233,
                  v: [-0.06835221071089878, -14911040730998862e-21],
                  ease: [0.48050979200063776, 0.06136202638923106, 0.999, 1.5],
                },
                {
                  t: 1.5108114197876916,
                  v: [0.032133292775302545, -0.0019533463357608513],
                  ease: [0.001, 0.24090214653366723, 0.58, 1],
                },
                {
                  t: 1.7971520856616507,
                  v: [-0.06835221071089878, -14911040730998862e-21],
                  ease: [0.48050979200063776, 0.06136202638923106, 0.999, 1.5],
                },
                {
                  t: 3.1330453831785996,
                  v: [0.032133292775302545, -0.0019533463357608513],
                  ease: [0.001, 0.24090214653366723, 0.58, 1],
                },
                {
                  t: 3.4083292556973226,
                  v: [-0.06835221071089878, -14911040730998862e-21],
                  ease: [0.48050979200063776, 0.06136202638923106, 0.999, 1.5],
                },
                {
                  t: 4.777367618612606,
                  v: [0.032133292775302545, -0.0019533463357608513],
                  ease: [0.001, 0.24090214653366723, 0.58, 1],
                },
                {
                  t: 5,
                  v: [-0.06835221071089878, -14911040730998862e-21],
                  ease: [0.48050979200063776, 0.06136202638923106, 0.999, 1.5],
                },
              ],
              rotation: [
                {
                  t: 0.17491812227074233,
                  v: [
                    22.808320996747383, -5.474402376762305, -34.85465299871112,
                  ],
                  ease: [
                    0.48050979200063776, 0.06136202638923106,
                    0.9994333239875214, 1.5,
                  ],
                },
                {
                  t: 1.5108114197876916,
                  v: [25.82236401380847, 8.163455755358939, 36.34926880424543],
                  ease: [0, 0.24090214653366723, 0.58, 1],
                },
                {
                  t: 1.7971520856616507,
                  v: [
                    22.808320996747383, -5.474402376762305, -34.85465299871112,
                  ],
                  ease: [
                    0.48050979200063776, 0.06136202638923106,
                    0.9994333239875214, 1.5,
                  ],
                },
                {
                  t: 3.1330453831785996,
                  v: [25.82236401380847, 8.163455755358939, 36.34926880424543],
                  ease: [0, 0.24090214653366723, 0.58, 1],
                },
                {
                  t: 3.4083292556973226,
                  v: [
                    22.808320996747383, -5.474402376762305, -34.85465299871112,
                  ],
                  ease: [
                    0.48050979200063776, 0.06136202638923106,
                    0.9994333239875214, 1.5,
                  ],
                },
                {
                  t: 4.777367618612606,
                  v: [25.82236401380847, 8.163455755358939, 36.34926880424543],
                  ease: [0, 0.24090214653366723, 0.58, 1],
                },
                {
                  t: 5,
                  v: [
                    22.808320996747383, -5.474402376762305, -34.85465299871112,
                  ],
                  ease: [
                    0.48050979200063776, 0.06136202638923106,
                    0.9994333239875214, 1.5,
                  ],
                },
              ],
              expression: [
                {
                  t: 0,
                  v: "surprised",
                  ease: [
                    0.7416814271255061, 0.03220016891891886,
                    0.26459703947368424, 1.0216427364864864,
                  ],
                },
              ],
            },
          },
          {
            name: "Working_D",
            duration: 5,
            body: "sphere",
            squashAnchor: 0,
            workArea: { start: 0, end: 5 },
            inspect: { bias: -1, follow: !0 },
            tracks: {
              position: [
                {
                  t: 1.5264103096017296,
                  v: [0, 0],
                  ease: [
                    0.8183794558884002, 0, 0.42063048773799955,
                    0.8916191063669083,
                  ],
                },
                {
                  t: 2.2538209606986896,
                  v: [0.13302558581350077, 0.08599672420051416],
                  ease: [
                    0.7164816671975539, -0.07059803322016199,
                    0.15856161687281733, 1,
                  ],
                },
                { t: 2.636972068926158, v: [0, 0], ease: [0.42, 0, 0.58, 1] },
              ],
              rotation: [
                {
                  t: 0,
                  v: [
                    -2.97589945531819, -26.234478989223906, -3.2544499064295738,
                  ],
                  ease: [
                    0.7818125791576046, 0.15346315752484826,
                    0.32687664998404986, 1.1173618829561318,
                  ],
                },
                {
                  t: 0.003820960698689868,
                  v: [
                    2.4615600363954893, -24.921015876700608, 2.790543200988768,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.5222436429350663,
                  v: [
                    20.16565207199379, -20.644446669166673, 22.47273384376682,
                  ],
                  ease: [
                    0.36229770668640776, -0.17418027527991467,
                    0.2875659277885649, 1.2452842602722636,
                  ],
                },
                {
                  t: 1.5264103096017296,
                  v: [
                    -20.98869306129836, -21.248460672675545, -6.20573622722674,
                  ],
                  ease: [
                    0.49415439617951884, -0.031041466813226757,
                    0.2907565775851124, 1,
                  ],
                },
                {
                  t: 2.2538209606986896,
                  v: [
                    -23.757982259034762, 24.83627384870201, 18.82083960330674,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 2.636972068926158,
                  v: [
                    8.316132781421524, -27.390741199393897, -9.531735566337252,
                  ],
                  ease: [
                    0.12247552635300568, -0.002557518043474879,
                    0.7043012111749869, 0.5773041000961353,
                  ],
                },
                {
                  t: 3.494456667932666,
                  v: [
                    6.3335276735657375, -0.1762970079864843, 0.6565665872756274,
                  ],
                  ease: [0.42, 0.5038392468370619, 0.58, 1],
                },
                {
                  t: 4.25382096069869,
                  v: [8.1703683326745, 24.729657859977713, 10.395084291173474],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 4.971120960698738,
                  v: [
                    2.4615600363954893, -24.921015876700608, 2.790543200988768,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
              expression: [
                {
                  t: 0.003820960698689868,
                  v: "calm",
                  ease: [
                    0.7416814271255061, 0.03220016891891886,
                    0.26459703947368424, 1.0216427364864864,
                  ],
                },
              ],
            },
          },
          {
            name: "Working_E",
            duration: 4,
            body: "sphere",
            squashAnchor: 0,
            workArea: null,
            inspect: { bias: -1, follow: !0 },
            tracks: {
              position: [
                {
                  t: 0.6167064755838638,
                  v: [0, 0],
                  ease: [0.5771393784786643, 0, 0.41654104823747684, 1],
                },
                {
                  t: 1.4190773177636233,
                  v: [-0.16387514369529332, 0],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 2.2684226822363764,
                  v: [-0.16387514369529332, 0.05904395257747427],
                  ease: [0.580719503710575, 0, 0, 1],
                },
                {
                  t: 3.1610281808035716,
                  v: [0, 0],
                  ease: [0.5771393784786643, 0, 0.41654104823747684, 1],
                },
              ],
              rotation: [
                {
                  t: 0,
                  v: [
                    -15.896271043294888, 33.29315635042974, 25.38480127460161,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 0.6167064755838638,
                  v: [
                    -15.896271043294888, 33.29315635042974, 25.38480127460161,
                  ],
                  ease: [
                    0.8625910776088882, -0.041613616273912, 0.25952275632662025,
                    1.049784301761229,
                  ],
                },
                {
                  t: 1.4190773177636233,
                  v: [
                    -2.97589945531819, -26.234478989223906, -3.2544499064295738,
                  ],
                  ease: [
                    0.7818125791576046, 0.15346315752484826,
                    0.32687664998404986, 1.1173618829561318,
                  ],
                },
                {
                  t: 2.2684226822363764,
                  v: [
                    -31.58476211869586, -3.710798107118315, 24.071416454447956,
                  ],
                  ease: [
                    0.36229770668640776, -0.17418027527991467,
                    0.2875659277885649, 1.2452842602722636,
                  ],
                },
                {
                  t: 2.7962446921443735,
                  v: [
                    -27.874087487241205, 0.739249290532289, 5.007074162025872,
                  ],
                  ease: [0.42, 0.044881803684311196, 0.58, 1],
                },
                {
                  t: 3.2725893489030398,
                  v: [
                    -19.255583925594408, -17.414119894980235,
                    -7.023063437300964,
                  ],
                  ease: [
                    0.49415439617951884, -0.031041466813226757,
                    0.2907565775851124, 1,
                  ],
                },
                {
                  t: 3.8435756138392856,
                  v: [
                    -10.064416055441825, 12.982763466855692, 19.192265328801522,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
                {
                  t: 3.9805733816964284,
                  v: [
                    -15.896271043294888, 33.29315635042974, 25.38480127460161,
                  ],
                  ease: [0.42, 0, 0.58, 1],
                },
              ],
              expression: [
                {
                  t: 0.05960518973214285,
                  v: "neutral",
                  ease: [
                    0.7416814271255061, 0.03220016891891886,
                    0.26459703947368424, 1.0216427364864864,
                  ],
                },
                {
                  t: 2.2434315286624202,
                  v: "surprised",
                  ease: [
                    0.7416814271255061, 0.03220016891891886,
                    0.26459703947368424, 1.0216427364864864,
                  ],
                },
              ],
            },
          },
          {
            name: "Working_F",
            duration: 5,
            body: "sphere",
            squashAnchor: 0,
            workArea: null,
            inspect: { bias: -1, follow: !0 },
            tracks: {
              position: [
                {
                  t: 0.4874467656537753,
                  v: [0, 0],
                  ease: [
                    0.6778358120868745, -0.22439715100065685,
                    0.15951040179591214, 1,
                  ],
                },
                {
                  t: 1.3832000000000173,
                  v: [-0.14647919001828796, 0.027266090496135924],
                  ease: [
                    0.5825263567433967, 0.31017058172003364,
                    0.04617913732408452, 1.3610608114532912,
                  ],
                },
                {
                  t: 1.77965296961326,
                  v: [-0.14647919001828796, 0.027266090496135924],
                  ease: [
                    0.22005965712189499, 0.31017058172003364,
                    0.04617913732408452, 0.9652306378531971,
                  ],
                },
                {
                  t: 2.5961328343722427,
                  v: [0.06209379465135341, 0.0363636826260471],
                  ease: [
                    0.6823010997778416, 0.03975119923438924, 0.58,
                    0.7462988396745895,
                  ],
                },
                {
                  t: 3.066377943544433,
                  v: [-0.016487420591570615, 0.0804209848791122],
                  ease: [
                    0.8034080182827295, -0.08276325518488785,
                    0.6510110561346553, 0.8128258749805829,
                  ],
                },
                {
                  t: 3.426085780646072,
                  v: [-0.008916270094194876, -0.2135819760518346],
                  ease: [
                    0.1744021985074266, -0.5, 0.8865519014643501,
                    -0.2214168917492133,
                  ],
                },
                {
                  t: 4.00439785911593,
                  v: [-0.0052248049102180776, -0.12515593913381462],
                  ease: [
                    0.023812816055625345, 0.31341394515796384,
                    0.0448947139696587, 1.0658309377957906,
                  ],
                },
                { t: 4.893926749555462, v: [0, 0], ease: [0.42, 0, 0.58, 1] },
              ],
              rotation: [
                {
                  t: 0.4874467656537753,
                  v: [0, 0, 0],
                  ease: [
                    0.6778358120868745, -0.22439715100065685,
                    0.15951040179591214, 1,
                  ],
                },
                {
                  t: 1.3832000000000173,
                  v: [
                    -11.013174031248813, -20.059833580125414,
                    -12.896783267756348,
                  ],
                  ease: [
                    0.5825263567433967, 0.31017058172003364,
                    0.04617913732408452, 1.3610608114532912,
                  ],
                },
                {
                  t: 1.77965296961326,
                  v: [
                    -17.48975478197329, -18.703976724880516,
                    -12.678205332257816,
                  ],
                  ease: [
                    0.22005965712189499, 0.31017058172003364,
                    0.04617913732408452, 0.9652306378531971,
                  ],
                },
                {
                  t: 2.5961328343722427,
                  v: [
                    -14.554913391638532, 17.164836260093473, 9.376528927180779,
                  ],
                  ease: [
                    0.6823010997778416, 0.03975119923438924, 0.58,
                    0.9240336563778733,
                  ],
                },
                {
                  t: 3.1796016343940767,
                  v: [
                    -24.586251970533304, 0.14133926125606477,
                    -0.7477216271856462,
                  ],
                  ease: [
                    0.8034080182827295, -0.08276325518488785,
                    0.9143306014396848, 0.4851034680582119,
                  ],
                },
                {
                  t: 3.4679142027965795,
                  v: [
                    -1.0943281912285556, -1.1346215368163393,
                    -0.7116952620126241,
                  ],
                  ease: [
                    0.12040927423864656, -0.18872517040581954,
                    0.9481776569383256, -0.20917925086224787,
                  ],
                },
                {
                  t: 4.001861402631413,
                  v: [
                    -147.11069531984157, -0.6757806869448113,
                    -0.4238857605398247,
                  ],
                  ease: [
                    0.03131913716814155, 0.8644907690193963, 0.0448947139696587,
                    1.0658309377957906,
                  ],
                },
                {
                  t: 4.893926749555462,
                  v: [-360, 0, 0],
                  ease: [
                    0.7970933306500759, -0.5, 0.24118105710043447,
                    0.7361553789450831,
                  ],
                },
              ],
              expression: [
                {
                  t: 1.8508295659644571,
                  v: "surprised",
                  ease: [
                    0.7394673582995951, 0.10409628378378377, 0.6676682692307693,
                    1.5,
                  ],
                },
                {
                  t: 4.893926749555462,
                  v: "neutral",
                  ease: [
                    0.8458217358299596, 0.40487753378378377,
                    0.13769926619433198, 0.9154349662162162,
                  ],
                  cut: !0,
                },
              ],
              lids: [
                { t: 1.1672000000000002, v: [0], ease: [0.42, 0, 0.58, 1] },
                { t: 1.2797000000000003, v: [1], ease: [0.42, 0, 0.58, 1] },
                { t: 1.4172000000000002, v: [0], ease: [0.42, 0, 0.58, 1] },
              ],
            },
          },
        ].map((t) => [t.name, t]),
      );
    function t4(t, e, n) {
      let a = t[e],
        r = t[n];
      void 0 === a || void 0 === r || ((t[e] = r), (t[n] = a));
    }
    let t5 = { on: !1, oval: !1, width: 0, height: 0, tilt: 0, cx: 0, cy: 0 },
      t6 = {
        cloud: {
          width: 0.21294,
          height: 0.4668299999999999,
          gap: 0.47001600000000004,
          shiftY: 0.06999999999999999,
        },
        square: {
          width: 0.2553258426966292,
          height: 0.559752808988764,
          gap: 0.529408,
          shiftY: 0.12,
        },
        sparkle: {
          width: 0.18381999999999998,
          height: 0.40298999999999996,
          gap: 0.41215999999999997,
          shiftY: 0,
        },
        clover: {
          width: 0.23296,
          height: 0.51072,
          gap: 0.559104,
          shiftY: -0.020000000000000018,
        },
        heartChubby: {
          width: 0.18657600000000002,
          height: 0.409032,
          gap: 0.44620799999999994,
          shiftY: 0.051999999999999935,
        },
        starFlower: {
          width: 0.19292,
          height: 0.42294,
          gap: 0.38297600000000004,
          shiftY: 0.12,
        },
        teardrop: {
          width: 0.20779200000000003,
          height: 0.455544,
          gap: 0.45260800000000007,
          shiftY: 0.18,
        },
        tablet: {
          width: 0.2132,
          height: 0.4673999999999999,
          gap: 0.587776,
          shiftY: 0.01999999999999999,
        },
        wedge: {
          width: 0.2132,
          height: 0.4673999999999999,
          gap: 0.46771199999999996,
          shiftY: 0.18,
        },
        house: {
          width: 0.2295124,
          height: 0.5031617999999999,
          gap: 0.5125120000000001,
          shiftY: 0.18499534000463813,
        },
        star6: {
          width: 0.184782,
          height: 0.44965988999999995,
          gap: 0.41913343999999997,
          shiftY: 0.12,
        },
        pebble: {
          width: 0.23920000000000002,
          height: 0.5244,
          gap: 0.546304,
          shiftY: 0.12,
        },
        bean: { width: 0.2028, height: 0.4446, gap: 0.4608, shiftY: 0.12 },
        egg: {
          width: 0.23920000000000002,
          height: 0.5244,
          gap: 0.433664,
          shiftY: 0.11299906800092761,
        },
        squircle: {
          width: 0.23920000000000002,
          height: 0.5244,
          gap: 0.5632,
          shiftY: 0.12,
        },
        capsule: {
          width: 0.2106,
          height: 0.4617,
          gap: 0.36044800000000005,
          shiftY: 0.12,
        },
        cylinder: {
          width: 0.23920000000000002,
          height: 0.5244,
          gap: 0.47872000000000003,
          shiftY: 0.12,
        },
        hex: { width: 0.26, height: 0.57, gap: 0.64, shiftY: 0.12 },
        gem: {
          width: 0.23920000000000002,
          height: 0.5244,
          gap: 0.501248,
          shiftY: 0.12,
        },
        crystal: { width: 0.1612, height: 0.3534, gap: 0.3712, shiftY: 0.12 },
        shield: {
          width: 0.26790400000000003,
          height: 0.5873280000000001,
          gap: 0.44492800000000005,
          shiftY: 0.12,
        },
        dome: {
          width: 0.2132,
          height: 0.4673999999999999,
          gap: 0.47872000000000003,
          shiftY: 0.10599813600185524,
        },
        arch: {
          width: 0.19240000000000002,
          height: 0.42179999999999995,
          gap: 0.44799999999999995,
          shiftY: 0.16,
        },
        leaf: {
          width: 0.1872,
          height: 0.41039999999999993,
          gap: 0.44799999999999995,
          shiftY: 0.039999999999999994,
        },
      };
    function t3(t, e, n, a, r) {
      let l = Math.max(0.01, Math.min(1, e)) / 2,
        o = Math.max(0.02, Math.min(1.8, Math.max(n, e))) / 2,
        s = (-a * Math.PI) / 180,
        i = Math.cos(s),
        h = Math.sin(s);
      return Array.from({ length: 64 }, (e, n) => {
        let a = (2 * Math.PI * n) / 64,
          s = t * o * Math.cos(a),
          u = l * Math.sin(a);
        return { x: s * i - u * h + (t * r) / 2, y: s * h + u * i };
      });
    }
    function t7(t, e, n) {
      let a = Math.max(0.05, (t || 0.64) / 2),
        r = (e * Math.PI) / 180,
        l = Math.cos(a) || 1;
      return [
        1 + (Math.max(0.18, Math.cos(-a - r)) / l - 1) * n,
        1 + (Math.max(0.18, Math.cos(a - r)) / l - 1) * n,
      ];
    }
    function t9(t, e) {
      if (0 === t.length || 1e-4 > Math.abs(e - 1)) return t;
      let n = 0,
        a = 0;
      for (let e of t) ((n += e.x), (a += e.y));
      return (
        (n /= t.length),
        (a /= t.length),
        t.map((t) => ({ x: n + (t.x - n) * e, y: a + (t.y - a) * e }))
      );
    }
    function t8(t) {
      let e = eo(t);
      if (!(t.wid > 0) && !e) return t5;
      let n = t.lidY || 1,
        a = (t.tilt || 0) * (180 / Math.PI);
      if (e)
        return {
          on: !0,
          oval: !0,
          width: 2 * t.oval[0],
          height: 2 * t.oval[1] * n,
          tilt: a,
          cx: t.off[0],
          cy: t.off[1],
        };
      let r = t.pts;
      if (r.length < 2) return { ...t5, cx: t.off[0], cy: t.off[1] };
      let l = r[0],
        o = r[r.length - 1],
        s = o[0] - l[0],
        i = o[1] - l[1],
        h = Math.hypot(s, i),
        u = 2 * t.wid;
      return {
        on: !0,
        oval: !1,
        width: u,
        height: (h + u) * n,
        tilt: (180 / Math.PI) * Math.atan2(s, i) + a,
        cx: t.off[0] + (l[0] + o[0]) / 2,
        cy: t.off[1] + ((l[1] + o[1]) / 2) * n,
      };
    }
    function et(t, e, n, a, r, l) {
      let o = t.length,
        s = t.map((t, r) => ({ x: t.x + e[r] * a, y: t.y + n[r] * a })),
        i = t.map((t, r) => ({ x: t.x - e[r] * a, y: t.y - n[r] * a })),
        h = { x: t[0].x - r.x * a, y: t[0].y - r.y * a },
        u = { x: t[o - 1].x + l.x * a, y: t[o - 1].y + l.y * a };
      return [
        ...s,
        ...ee(t[o - 1], s[o - 1], u, a),
        ...[...i].reverse(),
        ...ee(t[0], i[0], h, a),
      ];
    }
    function ee(t, e, n, a) {
      let r = [],
        l = Math.atan2(e.y - t.y, e.x - t.x),
        o = Math.atan2(n.y - t.y, n.x - t.x) - l;
      for (; o > Math.PI;) o -= 2 * Math.PI;
      for (; o < -Math.PI;) o += 2 * Math.PI;
      let s = o >= 0 ? 1 : -1;
      for (let e = 1; e < 10; e++) {
        let n = l + (e / 10) * s * Math.PI;
        r.push({ x: t.x + a * Math.cos(n), y: t.y + a * Math.sin(n) });
      }
      return r;
    }
    function en(t, e) {
      let n = 0,
        a = 0;
      for (let e of t) ((n += e.x), (a += e.y));
      ((n /= t.length), (a /= t.length));
      let r = 0;
      for (let e of t) r = Math.max(r, Math.hypot(e.x - n, e.y - a));
      if (e <= 1.05 * r) return null;
      let l = [];
      for (let n = 0; n < 48; n++) {
        let a = (2 * Math.PI * n) / 48,
          r = Math.cos(a),
          o = Math.sin(a),
          s = -1 / 0,
          i = 0,
          h = 0;
        for (let e of t) {
          let t = e.x * r + e.y * o;
          t > s && ((s = t), (i = e.x), (h = e.y));
        }
        l.push({ x: i + r * e, y: h + o * e });
      }
      return l;
    }
    function ea(t, e) {
      return [t[6 * e], t[6 * e + 1]];
    }
    function er(t, e, n) {
      return [t[6 * e] + t[6 * e + n], t[6 * e + 1] + t[6 * e + n + 1]];
    }
    function el(t, e) {
      let n = Math.hypot(t, e) || 1;
      return { x: t / n, y: e / n };
    }
    function eo(t) {
      return t.oval[0] > 1e-4 && t.oval[1] > 1e-4;
    }
    function es(t, e = 0) {
      return Number.isFinite(t) ? t : e;
    }
    function ei(t, e) {
      let n = t[e[0]],
        a = ec(ef(t[e[1]], n), ef(t[e[2]], n)),
        r = ed(a) || 1,
        l = [a[0] / r, a[1] / r, a[2] / r];
      return { corners: e, normal: l, offset: ep(l, n) };
    }
    function eh(t, e) {
      return ep(t.normal, e) - t.offset;
    }
    function eu(t, e) {
      let n = 0,
        a = -1 / 0;
      return (
        t.forEach((t, r) => {
          let l = e(t);
          l > a && ((a = l), (n = r));
        }),
        n
      );
    }
    function ef(t, e) {
      return [t[0] - e[0], t[1] - e[1], t[2] - e[2]];
    }
    function ec(t, e) {
      return [
        t[1] * e[2] - t[2] * e[1],
        t[2] * e[0] - t[0] * e[2],
        t[0] * e[1] - t[1] * e[0],
      ];
    }
    function ep(t, e) {
      return t[0] * e[0] + t[1] * e[1] + t[2] * e[2];
    }
    function ed(t) {
      return Math.hypot(t[0], t[1], t[2]);
    }
    let eM = [
        { x: 0.934475052698969, y: 0.004363180216799212 },
        { x: 0.948891570423846, y: 0.039714756021395174 },
        { x: 0.9608728659762679, y: 0.07607039935952659 },
        { x: 0.9703302557200477, y: 0.11326502451357987 },
        { x: 0.977189539605176, y: 0.15112675873557632 },
        { x: 0.9813908922405818, y: 0.18947802927479046 },
        { x: 0.9828887074578869, y: 0.2281365499571005 },
        { x: 0.9816519990958227, y: 0.2669163757988432 },
        { x: 0.9776625497902636, y: 0.30562830330137525 },
        { x: 0.9709166586711733, y: 0.3440810419322467 },
        { x: 0.9614266573440594, y: 0.3820827122339433 },
        { x: 0.949221424670692, y: 0.41944230284893746 },
        { x: 0.9343467338379507, y: 0.45597122804302315 },
        { x: 0.9168643128164508, y: 0.49148439126889626 },
        { x: 0.8968538338085426, y: 0.5258027955519334 },
        { x: 0.8744135590875667, y: 0.5587560766363049 },
        { x: 0.8496605481016927, y: 0.5901852347689388 },
        { x: 0.8227287687893752, y: 0.6199442885313702 },
        { x: 0.7937617531488526, y: 0.6478973166280976 },
        { x: 0.762905919754175, y: 0.6739136951531549 },
        { x: 0.7303134746505421, y: 0.6978700569784003 },
        { x: 0.6961411032024281, y: 0.7196491755310737 },
        { x: 0.6605596057818293, y: 0.7391502303914683 },
        { x: 0.6237513457393834, y: 0.7562897143525837 },
        { x: 0.5859073404691287, y: 0.7710015652906158 },
        { x: 0.5472248974285161, y: 0.7832374824769789 },
        { x: 0.507904865265839, y: 0.7929662862613107 },
        { x: 0.4681494646643414, y: 0.8001734773422571 },
        { x: 0.4281602030115182, y: 0.8048604074486263 },
        { x: 0.38813613170852307, y: 0.8070434681543606 },
        { x: 0.34827256966973696, y: 0.8067537475134688 },
        { x: 0.3087597745583025, y: 0.8040363403785654 },
        { x: 0.26978201344672026, y: 0.7989504065912386 },
        { x: 0.23151662960878241, y: 0.7915694823366872 },
        { x: 0.19413194481287305, y: 0.7819778247879767 },
        { x: 0.1577852845947917, y: 0.7702630818507747 },
        { x: 0.12262733079593371, y: 0.7565354795442158 },
        { x: 0.08880015313138229, y: 0.7409422361214794 },
        { x: 0.05642586889159421, y: 0.7236017950683938 },
        { x: 0.02561647598492663, y: 0.704659966051552 },
        { x: -0.0036037810305528913, y: 0.6895105233164277 },
        { x: -0.03317542334906984, y: 0.7095400285365243 },
        { x: -0.06438496917371282, y: 0.7280864309789705 },
        { x: -0.0971349646590295, y: 0.7450166000084965 },
        { x: -0.13130575647382275, y: 0.7601465770772312 },
        { x: -0.16677330012669841, y: 0.7733777436363767 },
        { x: -0.20339569964825052, y: 0.7845796245158417 },
        { x: -0.24101725346433553, y: 0.7936313321637897 },
        { x: -0.27947704857143557, y: 0.8004456020397803 },
        { x: -0.3186049196302664, y: 0.8049436403918587 },
        { x: -0.35822225014656567, y: 0.8070572252942809 },
        { x: -0.398143514039767, y: 0.8067313311007664 },
        { x: -0.438177182680152, y: 0.8039242993502419 },
        { x: -0.478126841210925, y: 0.7986084072202804 },
        { x: -0.5177925726656645, y: 0.7907706714017452 },
        { x: -0.5569723963185897, y: 0.7804134068929688 },
        { x: -0.5954640748960385, y: 0.7675550146764192 },
        { x: -0.6330671972405764, y: 0.7522306880298593 },
        { x: -0.6695855487964426, y: 0.734492987733704 },
        { x: -0.7048299443180804, y: 0.714412410733904 },
        { x: -0.7386209319309059, y: 0.6920772477931056 },
        { x: -0.7707921245520308, y: 0.6675935661866239 },
        { x: -0.8011924150225685, y: 0.641083697347949 },
        { x: -0.8296683466506882, y: 0.612669941116809 },
        { x: -0.8560711521836232, y: 0.5824818706921402 },
        { x: -0.8802586099360401, y: 0.550657644865542 },
        { x: -0.9021016261853626, y: 0.5173474030319016 },
        { x: -0.921488351217944, y: 0.48271361643050537 },
        { x: -0.9383250626073236, y: 0.44692900756649523 },
        { x: -0.9525363976829352, y: 0.4101742582574272 },
        { x: -0.9640652637601566, y: 0.37263580242597466 },
        { x: -0.9728702117174652, y: 0.3345029815392968 },
        { x: -0.9789264673905609, y: 0.2959671170672982 },
        { x: -0.9822255348467005, y: 0.25722000690078245 },
        { x: -0.982774894246464, y: 0.21845258628445002 },
        { x: -0.9805967489497907, y: 0.17985349925722946 },
        { x: -0.9757258679433654, y: 0.1416078138454962 },
        { x: -0.9682107746348935, y: 0.1038965717106635 },
        { x: -0.9581143826889033, y: 0.06689596974801386 },
        { x: -0.9455146116784895, y: 0.03077634172969411 },
        { x: -0.9305051553319804, y: -0.004299067407576291 },
        { x: -0.9131952327192244, y: -0.038175545674491246 },
        { x: -0.8937019647378253, y: -0.07070785611844921 },
        { x: -0.8721591451869681, y: -0.10176130887451734 },
        { x: -0.8487362913086253, y: -0.1312168064224554 },
        { x: -0.8236207468105732, y: -0.15897343836917888 },
        { x: -0.7970979502287641, y: -0.18497038865757742 },
        { x: -0.7710541733734617, y: -0.2096139557882936 },
        { x: -0.7461193861529073, y: -0.23320814197562353 },
        { x: -0.7221519248227056, y: -0.2558870618710858 },
        { x: -0.6990265515010246, y: -0.27776911859221876 },
        { x: -0.6766318459161248, y: -0.29895980890191903 },
        { x: -0.6548676461286994, y: -0.31955389248594185 },
        { x: -0.6336431338424889, y: -0.3396372581810514 },
        { x: -0.6128753135059731, y: -0.359288557412959 },
        { x: -0.5924873537443393, y: -0.3785803988633805 },
        { x: -0.5724075923763201, y: -0.3975806113171165 },
        { x: -0.5525683653066091, y: -0.4163531831687479 },
        { x: -0.5329051623123328, y: -0.43495923867716463 },
        { x: -0.5133556323648999, y: -0.45345775659418885 },
        { x: -0.49385881021048816, y: -0.47190633957419137 },
        { x: -0.4743544952965227, y: -0.4903620705111528 },
        { x: -0.4547822689301765, y: -0.5088820023697915 },
        { x: -0.43508096787875605, y: -0.5275240823754965 },
        { x: -0.41518776564532156, y: -0.5463477370262614 },
        { x: -0.39503744073179237, y: -0.565414738403984 },
        { x: -0.37456138068841166, y: -0.584789881188713 },
        { x: -0.3536868090571391, y: -0.6045421927475639 },
        { x: -0.33233545822868515, y: -0.6247456276706727 },
        { x: -0.31042247776931897, y: -0.6454805113116225 },
        { x: -0.28785488995869934, y: -0.6668347728530055 },
        { x: -0.26452992996104363, y: -0.6889057008744045 },
        { x: -0.24032737271767535, y: -0.7117848186103969 },
        { x: -0.21465925160321186, y: -0.7340046463187382 },
        { x: -0.18703495679704094, y: -0.7534714425430167 },
        { x: -0.15772553428835867, y: -0.7700652053068575 },
        { x: -0.1270070450444056, y: -0.7836711911119708 },
        { x: -0.0951684130469074, y: -0.7942311382405959 },
        { x: -0.062495032850901626, y: -0.8016579582061256 },
        { x: -0.02928242470209217, y: -0.8059763869703366 },
        { x: 0.00418250025635626, y: -0.8071603933705995 },
        { x: 0.03761179305139532, y: -0.8051997052887491 },
        { x: 0.07071763099568142, y: -0.8001090083866196 },
        { x: 0.10320959245128111, y: -0.7918885098432591 },
        { x: 0.134798677354145, y: -0.7805799374564395 },
        { x: 0.16519657722647352, y: -0.7662371932046725 },
        { x: 0.1941137081486192, y: -0.748919054724023 },
        { x: 0.22126182274327255, y: -0.7287044591356419 },
        { x: 0.24646172395988103, y: -0.705992917688509 },
        { x: 0.27042811605651085, y: -0.6833113574191189 },
        { x: 0.2935522498121435, y: -0.6614269249128338 },
        { x: 0.31594558408750634, y: -0.6402340573221494 },
        { x: 0.33770831010282365, y: -0.6196380408622824 },
        { x: 0.3589311734375708, y: -0.5995528607013482 },
        { x: 0.3796973337781967, y: -0.579900027393222 },
        { x: 0.40008347985475634, y: -0.5606067493570983 },
        { x: 0.4201613352275292, y: -0.5416052696177914 },
        { x: 0.4399985323371352, y: -0.5228315569692281 },
        { x: 0.4596595725296922, y: -0.504224454308306 },
        { x: 0.47920690986264164, y: -0.4857251046289992 },
        { x: 0.4987013585100146, y: -0.46727574968264535 },
        { x: 0.5182031792984406, y: -0.44881937116377135 },
        { x: 0.5377727619439542, y: -0.4302988919363394 },
        { x: 0.5574712942997964, y: -0.41165639717445024 },
        { x: 0.5773615598171413, y: -0.39283243400856016 },
        { x: 0.5975088031531646, y: -0.3737652763272414 },
        { x: 0.6179815681468954, y: -0.3543900575947271 },
        { x: 0.6388526754619042, y: -0.3346378544777047 },
        { x: 0.6602003073706015, y: -0.3144346462096216 },
        { x: 0.6821093031111911, y: -0.2937001458611249 },
        { x: 0.7046726622334125, y: -0.2723464324690267 },
        { x: 0.7279930725720649, y: -0.25027624068777876 },
        { x: 0.752199978996238, y: -0.22738555814564856 },
        { x: 0.7774207173704459, y: -0.20355017023582161 },
        { x: 0.8037647094696927, y: -0.17862206250636986 },
        { x: 0.8300422031017065, y: -0.15219910918500412 },
        { x: 0.8547554784773178, y: -0.1240094996536292 },
        { x: 0.8777124848745345, y: -0.09414272665900433 },
        { x: 0.8987592287763329, y: -0.06270816362882596 },
        { x: 0.9177264967761565, y: -0.029827205842901418 },
      ],
      ey = 2 * Math.PI,
      ex = (t) => Math.round(100 * t) / 100,
      em = (t, e, n) => (t < e ? e : t > n ? n : t);
    class eg {
      d = "";
      move(t, e) {
        return ((this.d += `M${ex(t)} ${ex(e)}`), this);
      }
      line(t, e) {
        return ((this.d += `L${ex(t)} ${ex(e)}`), this);
      }
      curve(t, e, n, a, r, l) {
        return (
          (this.d += `C${ex(t)} ${ex(e)} ${ex(n)} ${ex(a)} ${ex(r)} ${ex(l)}`),
          this
        );
      }
      corner(t, e, n, a) {
        let r = (t, e) => {
            let n = t[0] - e[0],
              a = t[1] - e[1],
              r = Math.hypot(n, a) || 1;
            return [n / r, a / r];
          },
          l = r(t, e),
          o = r(n, e),
          s = [e[0] + l[0] * a, e[1] + l[1] * a],
          i = [e[0] + o[0] * a, e[1] + o[1] * a];
        return (
          this.d ? this.line(s[0], s[1]) : this.move(s[0], s[1]),
          (this.d += `Q${ex(e[0])} ${ex(e[1])} ${ex(i[0])} ${ex(i[1])}`),
          this
        );
      }
      arc(t, e, n, a, r, l) {
        let o = Math.max(1, Math.ceil(Math.abs(l - r) / (Math.PI / 2))),
          s = (l - r) / o,
          i = (4 / 3) * Math.tan(s / 4),
          h = r;
        for (let r = 0; r < o; r++) {
          let r = h + s,
            l = [t + n * Math.cos(h), e + a * Math.sin(h)],
            o = [t + n * Math.cos(r), e + a * Math.sin(r)];
          (this.curve(
            l[0] - i * n * Math.sin(h),
            l[1] + i * a * Math.cos(h),
            o[0] + i * n * Math.sin(r),
            o[1] - i * a * Math.cos(r),
            o[0],
            o[1],
          ),
            (h = r));
        }
        return this;
      }
      close() {
        return this.d + "Z";
      }
    }
    let ev = (t, e = 128) => {
        let n = [];
        for (let a = 0; a < e; a++) n.push(t((a / e) * ey));
        return ((t) => {
          let e = t.length,
            n = `M${ex(t[0][0])} ${ex(t[0][1])}`;
          for (let a = 0; a < e; a++) {
            let r = t[(a - 1 + e) % e],
              l = t[a],
              o = t[(a + 1) % e],
              s = t[(a + 2) % e];
            n += `C${ex(l[0] + (o[0] - r[0]) / 6)} ${ex(l[1] + (o[1] - r[1]) / 6)} ${ex(o[0] - (s[0] - l[0]) / 6)} ${ex(o[1] - (s[1] - l[1]) / 6)} ${ex(o[0])} ${ex(o[1])}`;
          }
          return n + "Z";
        })(n);
      },
      eb = (t, e) => {
        let n = new eg(),
          a = t.length;
        for (let r = 0; r < a; r++) {
          let l = "number" == typeof e ? e : e[r % e.length];
          n.corner(t[(r - 1 + a) % a], t[r], t[(r + 1) % a], l);
        }
        return n.close();
      },
      ew = (t, e, n, a = 0) =>
        eb(
          Array.from({ length: e }, (n, r) => {
            let l = a + (r / e) * ey;
            return [114.2705 + Math.cos(l) * t, 114.2705 + Math.sin(l) * t];
          }),
          n,
        ),
      ek = (t, e = 160) =>
        ev((e) => {
          let n = Math.cos(e),
            a = Math.sin(e),
            r = 0;
          for (let [e, l, o] of t) {
            let t = e - 114.2705,
              s = l - 114.2705,
              i = n * t + a * s,
              h = i * i - (t * t + s * s) + o * o;
            if (h <= 0) continue;
            let u = i + Math.sqrt(h);
            u > r && (r = u);
          }
          return [114.2705 + n * r, 114.2705 + a * r];
        }, e),
      e$ = (t, e, n) =>
        ev((a) => {
          let r = Math.cos(a),
            l = Math.sin(a);
          return [
            114.2705 + Math.sign(r) * Math.pow(Math.abs(r), 2 / n) * t,
            114.2705 + Math.sign(l) * Math.pow(Math.abs(l), 2 / n) * e,
          ];
        }),
      eC = (t, e = 4) => {
        let n = t.match(/[MLCQZmlcqz]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) ?? [],
          a = [],
          r = 0,
          l = "",
          o = 0,
          s = 0,
          i = 0,
          h = 0,
          u = () => parseFloat(n[r++]),
          f = (t, n) => {
            let r = Math.max(2, Math.ceil(n / e));
            for (let e = 1; e <= r; e++) a.push(t(e / r));
          };
        for (; r < n.length;) {
          if ((/[a-z]/i.test(n[r]) && (l = n[r++].toUpperCase()), "Z" === l)) {
            (Math.hypot(i - o, h - s) > 0.01 &&
              f(
                (t) => [o + (i - o) * t, s + (h - s) * t],
                Math.hypot(i - o, h - s),
              ),
              (o = i),
              (s = h));
            continue;
          }
          if (r >= n.length) break;
          if ("M" === l)
            ((o = u()), (s = u()), (i = o), (h = s), a.push([o, s]), (l = "L"));
          else if ("L" === l) {
            let t = u(),
              e = u();
            (f(
              (n) => [o + (t - o) * n, s + (e - s) * n],
              Math.hypot(t - o, e - s),
            ),
              (o = t),
              (s = e));
          } else if ("Q" === l) {
            let t = u(),
              e = u(),
              n = u(),
              a = u(),
              r = o,
              l = s;
            (f(
              (o) => {
                let s = 1 - o;
                return [
                  s * s * r + 2 * s * o * t + o * o * n,
                  s * s * l + 2 * s * o * e + o * o * a,
                ];
              },
              Math.hypot(t - o, e - s) + Math.hypot(n - t, a - e),
            ),
              (o = n),
              (s = a));
          } else {
            let t = u(),
              e = u(),
              n = u(),
              a = u(),
              r = u(),
              l = u(),
              i = o,
              h = s;
            (f(
              (o) => {
                let s = 1 - o;
                return [
                  s * s * s * i +
                    3 * s * s * o * t +
                    3 * s * o * o * n +
                    o * o * o * r,
                  s * s * s * h +
                    3 * s * s * o * e +
                    3 * s * o * o * a +
                    o * o * o * l,
                ];
              },
              Math.hypot(t - o, e - s) +
                Math.hypot(n - t, a - e) +
                Math.hypot(r - n, l - a),
            ),
              (o = r),
              (s = l));
          }
        }
        return a;
      },
      eA = (t) => {
        let e = ((t, e) => {
            let n,
              {
                k: a,
                dx: r,
                dy: l,
              } = ((t) => {
                let e = 1 / 0,
                  n = -1 / 0,
                  a = 1 / 0,
                  r = -1 / 0;
                for (let l of t)
                  (l[0] < e && (e = l[0]),
                    l[0] > n && (n = l[0]),
                    l[1] < a && (a = l[1]),
                    l[1] > r && (r = l[1]));
                let l = 114.2705 - (e + n) / 2,
                  o = 114.2705 - (a + r) / 2;
                return {
                  k: em(228.44 / Math.max(n - e, r - a), 0.9, 1.35),
                  dx: l,
                  dy: o,
                };
              })(e);
            return 0.005 > Math.abs(a - 1) &&
              0.5 > Math.abs(r) &&
              0.5 > Math.abs(l)
              ? t
              : ((n = 0),
                t.replace(
                  /-?\d*\.?\d+(?:e[-+]?\d+)?/gi,
                  (t) => (
                    (n ^= 1),
                    String(
                      ex(
                        114.2705 + (parseFloat(t) + (n ? r : l) - 114.2705) * a,
                      ),
                    )
                  ),
                ));
          })(t, eC(t)),
          n = eC(e),
          {
            top: a,
            bottom: r,
            spanAt: l,
            outerAt: o,
          } = ((t, e = 160) => {
            let n = 1 / 0,
              a = -1 / 0;
            for (let e of t) (e[1] < n && (n = e[1]), e[1] > a && (a = e[1]));
            let r = a - n,
              l = (t) => n + (r * (t + 0.5)) / e,
              o = new Float64Array(e),
              s = new Float64Array(e),
              i = new Float64Array(e),
              h = new Float64Array(e);
            for (let n = 0; n < e; n++) {
              let e = l(n),
                a = -1 / 0,
                r = 1 / 0,
                u = 1 / 0,
                f = -1 / 0;
              for (let n = 0; n < t.length; n++) {
                let l = t[n],
                  o = t[(n + 1) % t.length];
                if (l[1] <= e == o[1] <= e) continue;
                let s = l[0] + ((o[0] - l[0]) * (e - l[1])) / (o[1] - l[1]);
                (s <= 114.2705 ? s > a && (a = s) : s < r && (r = s),
                  s < u && (u = s),
                  s > f && (f = s));
              }
              ((o[n] = Number.isFinite(a) ? a : 114.2705),
                (s[n] = Number.isFinite(r) ? r : 114.2705),
                (i[n] = Number.isFinite(u) ? u : 114.2705),
                (h[n] = Number.isFinite(f) ? f : 114.2705));
            }
            let u = (t, a) => (l) => {
              let o = em(((l - n) / r) * e - 0.5, 0, e - 1),
                s = Math.floor(o),
                i = o - s,
                h = Math.min(s + 1, e - 1);
              return [t[s] + (t[h] - t[s]) * i, a[s] + (a[h] - a[s]) * i];
            };
            return { top: n, bottom: a, spanAt: u(o, s), outerAt: u(i, h) };
          })(n),
          s = 0;
        for (let t = a; t <= r; t += 2) {
          let [e, n] = o(t);
          s = Math.max(s, (n - e) / 2);
        }
        return {
          path: e,
          ring: Array.from({ length: 96 }, (t, e) => {
            let a = (e / 96) * ey,
              r = Math.cos(a),
              l = Math.sin(a),
              o = 0;
            for (let t = 0; t < n.length; t++) {
              let e = n[t],
                a = n[(t + 1) % n.length],
                s = e[0] - 114.2705,
                i = e[1] - 114.2705,
                h = a[0] - 114.2705,
                u = a[1] - 114.2705,
                f = (h - s) * l - (u - i) * r;
              if (1e-9 > Math.abs(f)) continue;
              let c = -((s * l - i * r) / f);
              if (c < 0 || c > 1) continue;
              let p = (s + (h - s) * c) * r + (i + (u - i) * c) * l;
              p > o && (o = p);
            }
            return [114.2705 + r * o, 114.2705 + l * o];
          }),
          top: ex(a),
          bottom: ex(r),
          spanAt: l,
          beltRadius: ex(s),
        };
      },
      eI = {
        pebble: () =>
          ev((t) => {
            let e =
              108 *
              (1 +
                0.075 *
                  (0.6 * Math.sin(2 * t + 1.1) + 0.4 * Math.sin(3 * t - 1.1)));
            return [
              114.2705 + Math.cos(t) * e,
              114.2705 + Math.sin(t) * e * 0.98,
            ];
          }),
        bean: () => {
          let t;
          return (
            (t = Math.PI),
            ev((e) => {
              let n = (t) => {
                  let n = Math.abs(
                    ((((e - t + Math.PI) % ey) + ey) % ey) - Math.PI,
                  );
                  return Math.exp(-(n * n) / 0.4232);
                },
                a = 1 - 0.34 * n(t) + 0.34 * 0.34 * n(t + Math.PI);
              return [
                114.2705 + 94 * Math.cos(e) * a,
                114.2705 + 112 * Math.sin(e) * a,
              ];
            })
          );
        },
        egg: () =>
          ev((t) => {
            let e = Math.cos(t),
              n = Math.sin(t),
              a = (1 - n) / 2;
            return [114.2705 + 98 * e * (1 - 0.22 * a * a), 114.2705 + 113 * n];
          }),
        squircle: () => e$(107, 107, 3.2),
        square: () =>
          eb(
            [
              [114.2705 - 107, 114.2705 - 107],
              [221.2705, 114.2705 - 107],
              [221.2705, 221.2705],
              [114.2705 - 107, 221.2705],
            ],
            28,
          ),
        tablet: () =>
          new eg()
            .move(114.2705 - 114 + 74, 40.2705)
            .line(154.2705, 40.2705)
            .arc(154.2705, 114.2705, 74, 74, -Math.PI / 2, Math.PI / 2)
            .line(114.2705 - 114 + 74, 188.2705)
            .arc(
              114.2705 - 114 + 74,
              114.2705,
              74,
              74,
              Math.PI / 2,
              (3 * Math.PI) / 2,
            )
            .close(),
        capsule: () =>
          new eg()
            .move(42.2705, 155.2705)
            .line(42.2705, 114.2705 - 113 + 72)
            .arc(114.2705, 114.2705 - 113 + 72, 72, 72, Math.PI, ey)
            .line(186.2705, 155.2705)
            .arc(114.2705, 155.2705, 72, 72, 0, Math.PI)
            .close(),
        cylinder: () =>
          new eg()
            .move(20.2705, 114.2705 - 110 + 48)
            .arc(114.2705, 114.2705 - 110 + 48, 94, 48, Math.PI, ey)
            .line(208.2705, 176.2705)
            .arc(114.2705, 176.2705, 94, 48, 0, Math.PI)
            .close(),
        hex: () => ew(114, 6, 20, Math.PI / 6),
        gem: () => e$(112, 113, 1.5),
        shield: () => {
          let t;
          return (
            (t = 114.2705 - 108),
            new eg()
              .move(16.2705, t + 30)
              .curve(16.2705, t - 2, 65.2705, t - 10, 114.2705, t - 10)
              .curve(163.2705, t - 10, 212.2705, t - 2, 212.2705, t + 30)
              .curve(
                212.2705,
                114.2705 + 45.36,
                175.0305,
                222.2705,
                114.2705,
                222.2705,
              )
              .curve(
                53.5105,
                222.2705,
                16.2705,
                114.2705 + 45.36,
                16.2705,
                t + 30,
              )
              .close()
          );
        },
        dome: () =>
          new eg()
            .move(114.2705 - 114, 170.2705)
            .arc(114.2705, 170.2705, 114, 138, Math.PI, ey)
            .line(228.2705, 170.2705)
            .curve(228.2705, 196.2705, 228.2705, 196.2705, 202.2705, 196.2705)
            .line(114.2705 - 114 + 26, 196.2705)
            .curve(
              114.2705 - 114,
              196.2705,
              114.2705 - 114,
              196.2705,
              114.2705 - 114,
              170.2705,
            )
            .close(),
        arch: () => {
          let t;
          return (
            (t = 114.2705 - 113 + 76),
            new eg()
              .move(38.2705, t)
              .arc(114.2705, t, 76, 76, Math.PI, ey)
              .line(190.2705, 185.2705)
              .curve(190.2705, 227.2705, 190.2705, 227.2705, 148.2705, 227.2705)
              .line(80.2705, 227.2705)
              .curve(38.2705, 227.2705, 38.2705, 227.2705, 38.2705, 185.2705)
              .close()
          );
        },
        cloud: () =>
          ek([
            [52.2705, 140.2705, 56],
            [176.2705, 140.2705, 54],
            [114.2705, 148.2705, 62],
            [90.2705, 84.2705, 62],
            [152.2705, 88.2705, 54],
          ]),
        leaf: () =>
          ev((t) => {
            let e = Math.cos(t),
              n = Math.sin(t);
            return [
              114.2705 + 88 * e * Math.pow(Math.max(1 - n * n, 0), 0.25) * 1,
              114.2705 + 113 * n,
            ];
          }),
        clover: () =>
          ek([
            [76.2705, 76.2705, 58],
            [152.2705, 76.2705, 58],
            [152.2705, 152.2705, 58],
            [76.2705, 152.2705, 58],
          ]),
        house: () =>
          eb(
            [
              [114.2705 - 100, 224.2705],
              [214.2705, 224.2705],
              [214.2705, 114.2705 - 110 + 78],
              [114.2705, 114.2705 - 110],
              [114.2705 - 100, 114.2705 - 110 + 78],
            ],
            29,
          ),
        heart: () =>
          "M79.4511 11.5693C94.8767 -3.85636 119.887 -3.85622 135.312 11.5693C150.738 26.995 150.738 52.0049 135.312 67.4306L129.302 73.4404L129.303 73.4414L83.7724 118.972C81.8111 120.933 79.4309 122.22 76.9199 122.833C76.463 122.944 76.0018 123.034 75.538 123.101C74.1477 123.301 72.734 123.301 71.3437 123.101C70.8802 123.034 70.4194 122.944 69.9628 122.833C69.8486 122.805 69.7347 122.776 69.621 122.745C69.3938 122.684 69.1679 122.616 68.9433 122.544C67.4837 122.073 66.0831 121.367 64.8017 120.426C64.6047 120.281 64.4108 120.13 64.2197 119.975C63.837 119.662 63.466 119.328 63.1093 118.972L11.5693 67.4306C-3.85643 52.0049 -3.85642 26.995 11.5693 11.5693C26.995 -3.85643 52.0049 -3.85643 67.4306 11.5693L73.4404 17.579L79.4511 11.5693Z",
        sparkle: () =>
          "M93.9365 0.100586C98.4439 -0.387322 102.691 0.897134 106.341 4.03418C111.502 8.47087 114.842 16.0545 116.636 25.2725C118.36 34.1341 118.716 44.8177 117.701 56.4346L117.707 56.4375L117.706 56.4443C122.25 58.5638 126.519 60.8171 130.449 63.168C130.485 63.1891 130.52 63.2103 130.556 63.2314C131.25 63.6478 131.934 64.067 132.607 64.4893C132.68 64.5349 132.753 64.5813 132.825 64.627C133.074 64.7838 133.322 64.941 133.567 65.0986C133.692 65.1787 133.816 65.2596 133.94 65.3398C134.138 65.4676 134.335 65.5954 134.53 65.7236C134.653 65.8039 134.775 65.8844 134.896 65.9648C135.112 66.1073 135.325 66.2506 135.538 66.3936C135.625 66.4522 135.713 66.5106 135.8 66.5693C138.866 68.645 141.667 70.7792 144.163 72.9502C149.754 77.8126 153.981 83.0002 156.136 88.2578C156.159 88.3133 156.181 88.3693 156.203 88.4248C156.268 88.5868 156.332 88.749 156.393 88.9111C156.435 89.0226 156.475 89.1346 156.516 89.2461C156.541 89.3175 156.566 89.3895 156.591 89.4609C157.443 91.8917 157.839 94.3199 157.696 96.7109C157.522 99.7997 156.469 102.655 154.613 105.192C154.236 105.709 153.826 106.208 153.388 106.692C153.365 106.717 153.343 106.742 153.32 106.767C153.171 106.93 153.019 107.091 152.863 107.25C152.844 107.27 152.824 107.29 152.804 107.311C152.3 107.822 151.762 108.316 151.191 108.79C151.168 108.81 151.144 108.83 151.12 108.85C150.952 108.988 150.781 109.125 150.607 109.261C150.558 109.299 150.509 109.337 150.46 109.375C150.282 109.512 150.101 109.648 149.917 109.781C149.903 109.792 149.888 109.801 149.874 109.812C149.255 110.26 148.605 110.689 147.926 111.1C147.795 111.179 147.662 111.256 147.528 111.334C147.41 111.403 147.292 111.473 147.173 111.541C146.915 111.687 146.653 111.832 146.388 111.974C146.316 112.012 146.243 112.047 146.171 112.085C145.978 112.186 145.783 112.287 145.586 112.386C145.459 112.449 145.331 112.511 145.203 112.573C145.048 112.649 144.891 112.723 144.733 112.797C144.614 112.853 144.494 112.909 144.373 112.964C144.198 113.044 144.021 113.122 143.843 113.2C143.722 113.253 143.6 113.306 143.478 113.358C143.288 113.439 143.096 113.519 142.903 113.598C142.836 113.625 142.769 113.655 142.701 113.683C142.662 113.698 142.622 113.712 142.583 113.728C142.371 113.812 142.156 113.895 141.94 113.978C141.847 114.013 141.753 114.051 141.658 114.086C140.71 114.441 139.731 114.771 138.725 115.078C138.613 115.112 138.502 115.145 138.39 115.179C138.257 115.218 138.123 115.26 137.989 115.299C137.911 115.322 137.831 115.343 137.752 115.365C137.61 115.406 137.467 115.446 137.324 115.485C137.095 115.549 136.863 115.611 136.63 115.672C136.52 115.701 136.41 115.73 136.3 115.759C136.064 115.819 135.827 115.879 135.588 115.938C135.451 115.971 135.314 116.004 135.177 116.037C134.975 116.085 134.772 116.131 134.568 116.178C134.312 116.236 134.054 116.294 133.795 116.35C133.535 116.406 133.274 116.461 133.011 116.515C132.85 116.547 132.688 116.578 132.525 116.61C132.333 116.648 132.14 116.686 131.946 116.723C131.689 116.771 131.43 116.818 131.17 116.864C131.075 116.881 130.979 116.898 130.884 116.914C130.595 116.964 130.304 117.012 130.012 117.06C129.932 117.073 129.851 117.085 129.771 117.098C129.484 117.143 129.196 117.188 128.906 117.23C128.818 117.243 128.729 117.256 128.641 117.269C127.33 117.457 125.983 117.62 124.601 117.755C124.468 117.768 124.336 117.782 124.203 117.794C123.92 117.82 123.636 117.845 123.351 117.869C123.24 117.878 123.13 117.888 123.02 117.897C122.701 117.923 122.381 117.948 122.059 117.971C121.967 117.977 121.874 117.984 121.782 117.99C121.463 118.012 121.143 118.033 120.82 118.053C120.73 118.058 120.639 118.063 120.549 118.068C119.546 118.126 118.527 118.171 117.492 118.202C117.322 118.207 117.151 118.213 116.979 118.218C116.785 118.223 116.59 118.225 116.395 118.229C116.147 118.235 115.899 118.24 115.65 118.244C115.415 118.248 115.178 118.25 114.94 118.252C114.688 118.254 114.435 118.256 114.181 118.257C114.008 118.257 113.835 118.257 113.662 118.257C113.32 118.256 112.976 118.255 112.631 118.252C112.503 118.251 112.375 118.25 112.247 118.248C111.858 118.243 111.466 118.237 111.073 118.229C110.984 118.227 110.894 118.226 110.804 118.224C107.734 118.154 104.558 117.977 101.289 117.69C96.3593 128.261 90.7082 137.338 84.7832 144.151C78.6204 151.238 71.9357 156.137 65.2471 157.399C60.5179 158.292 56.1975 157.281 52.5381 154.604C48.9431 151.975 46.1246 147.845 44.0479 142.691C40.0321 132.725 38.5457 118.333 40.043 101.281C40.0382 101.279 40.0331 101.277 40.0283 101.274C39.6986 101.121 39.3711 100.965 39.0449 100.811C38.8351 100.711 38.6254 100.612 38.417 100.512C38.0794 100.35 37.7438 100.186 37.4102 100.023C37.2392 99.9399 37.0684 99.8563 36.8984 99.7725C36.5886 99.6196 36.2801 99.4663 35.9736 99.3125C35.7564 99.2034 35.5398 99.0939 35.3242 98.9844C34.9817 98.8104 34.6409 98.636 34.3027 98.4609C34.2424 98.4297 34.1823 98.3975 34.1221 98.3662C19.2858 90.6566 8.70839 81.8767 3.56055 73.3232C3.50461 73.2303 3.44926 73.137 3.39453 73.0439C3.37308 73.0075 3.35134 72.971 3.33008 72.9346C3.19352 72.7003 3.06142 72.4652 2.93262 72.2305C2.19429 70.8865 1.58552 69.5375 1.11816 68.1895C1.10444 68.1499 1.09161 68.1099 1.07813 68.0703C1.04009 67.9586 1.00191 67.847 0.96582 67.7354C0.954674 67.7009 0.943578 67.6663 0.932617 67.6318C0.823298 67.2877 0.723275 66.9435 0.632813 66.5996C-0.103732 63.8123 -0.218301 61.0433 0.402344 58.3643C1.34437 54.2986 3.89972 50.7745 7.875 47.9023C7.90661 47.8794 7.93796 47.8559 7.96973 47.833C8.12646 47.7208 8.2852 47.6092 8.44629 47.499C8.57825 47.4084 8.71216 47.3194 8.84668 47.2305C8.87052 47.2148 8.89404 47.1983 8.91797 47.1826C10.608 46.0723 12.497 45.0908 14.5547 44.2324C14.6355 44.1986 14.7165 44.1643 14.7979 44.1309C14.8508 44.1092 14.9038 44.087 14.957 44.0654L15.25 43.9482C15.3501 43.9084 15.4509 43.8694 15.5518 43.8301C15.6093 43.8078 15.6668 43.7848 15.7246 43.7627C23.7646 40.6682 34.1765 39.3165 45.6846 39.4756C45.8574 39.4779 46.0307 39.4814 46.2041 39.4844C46.4305 39.4884 46.6576 39.4909 46.8848 39.4961C47.3568 39.5065 47.8313 39.5207 48.3076 39.5361C48.4142 39.5397 48.5212 39.5441 48.6279 39.5479C51.1795 39.6366 53.791 39.7967 56.4512 40.0293C63.6811 24.5137 72.1655 12.7934 80.627 6.1709C85.0025 2.74635 89.5085 0.57999 93.9365 0.100586Z",
        star6: () =>
          "M58.9438 9.25323C63.2492 -3.08441 80.6974 -3.08441 85.0027 9.25322L91.7612 28.6207C94.0136 35.0751 100.652 38.9078 107.368 37.6311L127.52 33.8004C140.357 31.3602 149.081 46.4708 140.549 56.3681L127.156 71.9049C122.692 77.0827 122.692 84.748 127.156 89.9258L140.549 105.463C149.081 115.36 140.357 130.471 127.52 128.03L107.368 124.2C100.652 122.923 94.0136 126.756 91.7612 133.21L85.0027 152.577C80.6974 164.915 63.2492 164.915 58.9438 152.577L52.1853 133.21C49.933 126.756 43.2946 122.923 36.5788 124.2L16.4268 128.03C3.58942 130.471 -5.1347 115.36 3.39733 105.463L16.7908 89.9258C21.2543 84.748 21.2543 77.0827 16.7908 71.9049L3.39734 56.3681C-5.13469 46.4708 3.58941 31.3602 16.4268 33.8004L36.5787 37.6311C43.2946 38.9078 49.933 35.0751 52.1853 28.6207L58.9438 9.25323Z",
      },
      eP = new Map();
    function ez(t) {
      let e = eP.get(t);
      if (null != e) return e;
      let n = eA(eI[t]());
      return (eP.set(t, n), n);
    }
    let eq = (t, e = 4) => eC(ez(t).path, e),
      e_ = (t, e) => {
        var n;
        let a, r, l, o, s;
        return eA(
          ((r = Math.sqrt(
            1 - (a = em(t / (140.2705 - (n = 114.2705 - 114)), -1, 1)) * a,
          )),
          (l = [114.2705 + t * r, 140.2705 - t * a]),
          (o = [114.2705 - t * r, 140.2705 - t * a]),
          (s = Math.atan2(l[1] - 140.2705, l[0] - 114.2705)),
          new eg()
            .corner(l, [114.2705, n], o, e)
            .line(o[0], o[1])
            .arc(114.2705, 140.2705, t, t, Math.PI - s, s)
            .close()),
        );
      },
      eF = 2 * Math.PI,
      eB = {
        pebble: () => eS(1.2167999999999999, "pebble"),
        bean: () => {
          let t = (function (t) {
            let e = eq(t),
              n = 1 / 0,
              a = -1 / 0,
              r = 1 / 0,
              l = -1 / 0;
            for (let [t, o] of e)
              ((n = Math.min(n, t)),
                (a = Math.max(a, t)),
                (r = Math.min(r, o)),
                (l = Math.max(l, o)));
            let o = (t, n) => {
                let a = !1,
                  r = e.length;
                for (let l = 0, o = r - 1; l < r; o = l++) {
                  let [r, s] = e[l],
                    [i, h] = e[o];
                  s > n != h > n &&
                    t < r + ((i - r) * (n - s)) / (h - s) &&
                    (a = !a);
                }
                return a;
              },
              s = Math.max(a - n, l - r) / 40,
              i = [];
            for (let t = r + s / 2; t < l; t += s)
              for (let r = n + s / 2; r < a; r += s) {
                if (!o(r, t)) continue;
                let n = 1 / 0;
                for (let [a, l] of e)
                  n = Math.min(n, (a - r) ** 2 + (l - t) ** 2);
                let a = Math.sqrt(n);
                a > s && i.push({ x: r, y: t, r: a });
              }
            i.sort((t, e) => e.r - t.r);
            let h = [];
            for (let t of i)
              h.some(
                (e) => Math.hypot(t.x - e.x, t.y - e.y) + t.r <= e.r + 0.25 * s,
              ) || h.push(t);
            return h.map((t) => [
              (t.x - 114.2705) / 114.2705,
              -(t.y - 114.2705) / 114.2705,
              0,
              t.r / 114.2705,
            ]);
          })("bean");
          return {
            size: 1.17,
            silhouette: { kind: "solid", samples: [], balls: t, isLoop: !1 },
            seat: eD("bean", t),
          };
        },
        egg: () => eS(1.17, "egg"),
        squircle: () => ({
          size: 1.17,
          silhouette: eT(
            (function (t) {
              let e = ez(t).ring.map(([t, e]) => ({
                  x: (t - 114.2705) / 114.2705,
                  y: -(e - 114.2705) / 114.2705,
                })),
                n = e.length,
                a = [];
              for (let t = 0; t < n; t++) {
                let r = e[t],
                  l = e[(t - 1 + n) % n],
                  o = e[(t + 1) % n],
                  s = o.y - l.y,
                  i = -(o.x - l.x),
                  h = Math.hypot(s, i) || 1;
                ((s /= h),
                  (i /= h),
                  s * r.x + i * r.y < 0 && ((s = -s), (i = -i)));
                for (let t = 0; t <= 4; t++) {
                  let e = (t / 4) * (Math.PI / 2),
                    n = 0.11 * (1 - Math.cos(e)),
                    l = 0.28 - 0.11 + 0.11 * Math.sin(e);
                  (a.push({ x: r.x - s * n, y: r.y - i * n, z: l }),
                    a.push({ x: r.x - s * n, y: r.y - i * n, z: -l }));
                }
              }
              return a;
            })("squircle"),
          ),
          seat: { kind: "front", faceZ: 0.28 },
        }),
        tablet: () => {
          let { x0: t, x1: e, y0: n, y1: a } = eH("tablet"),
            r = (e - t) / 2 / 114.2705,
            l = (a - n) / 2 / 114.2705,
            o = Math.max(0, r - l);
          return {
            size: 1.3922999999999999,
            silhouette: {
              kind: "solid",
              samples: [],
              balls: eJ("tablet", "x"),
              isLoop: !1,
            },
            seat: {
              kind: "wrapX",
              wrapR: l,
              wrapX0: -r + 0.02,
              wrapX1: r - 0.02,
              radiusAtX: (t) => {
                let e = Math.abs(t) - o;
                return e <= 0 ? l : Math.sqrt(Math.max(0, l * l - e * e));
              },
            },
          };
        },
        capsule: () => {
          let t = eJ("capsule", "y"),
            { y0: e, y1: n } = eH("capsule"),
            a = -(n - 114.2705) / 114.2705,
            r = -(e - 114.2705) / 114.2705,
            { hx: l, hz: o } = (function (t) {
              let e = 0.55,
                n = 0.35;
              for (let [a, , r, l] of t)
                ((e = Math.max(e, Math.abs(a) + l)),
                  (n = Math.max(n, Math.abs(r) + l)));
              return { hx: e, hz: n };
            })(t);
          return {
            size: 1.17,
            silhouette: { kind: "solid", samples: [], balls: t, isLoop: !1 },
            seat: {
              kind: "wrap",
              wrapR: Math.max(0.35, (l + o) * 0.5),
              wrapY0: a,
              wrapY1: r,
              eyeY: (a + r) * 0.5,
            },
          };
        },
        cylinder: () => eE("cylinder", (t, e) => (e + t) * 0.5),
        hex: () => eN(1.2519, eZ(eq("hex"))),
        gem: () => eS(1.17, "gem"),
        crystal: () => ({
          size: 1.3805999999999998,
          silhouette: eT(
            (function () {
              let t = [
                { x: 0, y: 1.04, z: 0 },
                { x: 0, y: -1.04, z: 0 },
              ];
              for (let e of [-1, 1])
                for (let n = 0; n < 6; n++) {
                  let a = (n / 6) * eF;
                  t.push({
                    x: 0.52 * Math.cos(a),
                    y: 0.51 * e,
                    z: 0.52 * Math.sin(a),
                  });
                }
              let e = [];
              for (let n of t)
                for (let t = 0; t <= 8; t++) {
                  let a = (t / 8) * Math.PI,
                    r = Math.sin(a),
                    l = 0 === t || 8 === t ? 1 : 14;
                  for (let t = 0; t < l; t++) {
                    let o = (t / l) * eF;
                    e.push({
                      x: n.x + 0.12 * r * Math.sin(o),
                      y: n.y + 0.12 * Math.cos(a),
                      z: n.z + 0.12 * r * Math.cos(o),
                    });
                  }
                }
              return e;
            })(),
          ),
          seat: { kind: "front", faceZ: (Math.sqrt(3) / 2) * 0.64 },
        }),
        wedge: () => {
          let t = eA(ew(130, 3, [80, 60, 60], -Math.PI / 2)),
            e = eC(t.path),
            [n, a] = t.spanAt(t.top + (t.bottom - t.top) * 0.5),
            r = -(t.top - 114.2705) / 114.2705,
            l = -(t.bottom - 114.2705) / 114.2705;
          return {
            size: 1.3590719999999998,
            silhouette: eT(eX(e)),
            seat: {
              kind: "wrap",
              wrapR: Math.max(0.2, (a - n) / 2 / 114.2705),
              wrapY0: l,
              wrapY1: r,
              eyeY: r + (l - r) * 0.5,
              radiusAt: eO(e),
            },
          };
        },
        shield: () => eS(1.17, "shield"),
        dome: () => eS(1.17, "dome"),
        arch: () => eE("arch", (t, e) => t + (e - t) * 0.42),
        cloud: () => ej(1.3455, eZ(eq("cloud", 1)), 0.72),
        teardrop: () => {
          let t = e_(88, 48),
            e = eC(t.path),
            [n, a] = t.spanAt(t.top + (t.bottom - t.top) * 0.62),
            r = -(t.bottom - 114.2705) / 114.2705,
            l = -(t.top - 114.2705) / 114.2705;
          return {
            size: 1.318122,
            silhouette: eT(eX(e)),
            seat: {
              kind: "wrap",
              wrapR: Math.max(0.2, (a - n) / 2 / 114.2705),
              wrapY0: r,
              wrapY1: l,
              eyeY: (r + l) * 0.5,
              radiusAt: eO(e),
            },
          };
        },
        leaf: () => eS(1.17, "leaf"),
        square: () => eN(1.0413, eZ(eq("square"))),
        starFlower: () =>
          eN(
            1.3922999999999999,
            (function () {
              let t = [{ x: 0, y: 0, r: 0.36 }];
              for (let e = 0; e < 6; e++) {
                let n = -Math.PI / 2 + (e * eF) / 6;
                t.push({
                  x: 0.58 * Math.cos(n),
                  y: 0.58 * Math.sin(n),
                  r: 0.33,
                });
              }
              let e = [];
              for (let n = 0; n < 240; n++) {
                let a = (n / 240) * eF,
                  r = Math.cos(a),
                  l = Math.sin(a),
                  o = 0,
                  s = 0.58 + 0.33;
                for (let e = 0; e < 22; e++) {
                  let e = (o + s) / 2,
                    n = e * r,
                    a = e * l;
                  t.some(
                    (t) =>
                      (n - t.x) * (n - t.x) + (a - t.y) * (a - t.y) <=
                      t.r * t.r,
                  )
                    ? (o = e)
                    : (s = e);
                }
                e.push({ x: o * r, y: o * l, z: 0 });
              }
              return e;
            })(),
          ),
        sparkle: () => eN(1.521, eZ(eq("sparkle"))),
        clover: () => eN(1.0881, eZ(eq("clover"))),
        heartChubby: () => ej(1.3571999999999997, eM, 0.62),
        house: () => eN(1.17, eZ(eq("house"))),
        star6: () => eW(1.4976, eZ(eq("star6")), 0.3, 0.18),
      },
      eY = new Map(),
      eR = null;
    function eL(t) {
      let e = eY.get(t);
      if (null != e) return e;
      let n = eB[t]();
      return (eY.set(t, n), n);
    }
    function eT(t) {
      return { kind: "solid", samples: t, balls: [], isLoop: !1 };
    }
    function eS(t, e) {
      return { size: t, silhouette: eT(eX(eq(e))), seat: eD(e, []) };
    }
    function eE(t, e) {
      let n = ez(t),
        a = -(n.top - 114.2705) / 114.2705,
        r = -(n.bottom - 114.2705) / 114.2705;
      return {
        size: 1.17,
        silhouette: eT(eX(eq(t))),
        seat: {
          kind: "wrap",
          wrapR: n.beltRadius / 114.2705,
          wrapY0: r,
          wrapY1: a,
          eyeY: e(a, r),
          radiusAt: eO(eq(t)),
        },
      };
    }
    function eN(t, e) {
      return eW(t, e, 0.36, 0.22);
    }
    function eW(t, e, n, a) {
      return {
        size: t,
        silhouette: {
          kind: "extrusion",
          rings: (function (t, e, n) {
            let a = 1 / 0,
              r = -1 / 0,
              l = 1 / 0,
              o = -1 / 0;
            for (let e of t)
              ((a = Math.min(a, e.x)),
                (r = Math.max(r, e.x)),
                (l = Math.min(l, e.y)),
                (o = Math.max(o, e.y)));
            let s = (a + r) / 2,
              i = (l + o) / 2,
              h = Math.max(1e-4, Math.min((r - a) / 2, (o - l) / 2)),
              u = (t, a) => {
                let r = (t / 4) * (Math.PI / 2),
                  l = e - n + n * Math.sin(r);
                return {
                  z: a < 0 ? -l : l,
                  scale: 1 - (n / h) * (1 - Math.cos(r)),
                };
              },
              f = [];
            for (let t = 4; t >= 0; t--) f.push(u(t, -1));
            for (let t = 0; t <= 4; t++) f.push(u(t, 1));
            return f.map(({ z: e, scale: n }) =>
              t.map((t) => ({
                x: s + (t.x - s) * n,
                y: i + (t.y - i) * n,
                z: e,
              })),
            );
          })(e, n, a),
        },
        seat: { kind: "front", faceZ: n },
      };
    }
    function ej(t, e, n) {
      let a = (function (t, e) {
        let n = t.length / 160,
          a =
            n > 1
              ? Array.from({ length: 160 }, (e, a) => t[Math.floor(a * n)])
              : t,
          r = 1 / 0,
          l = -1 / 0,
          o = 1 / 0,
          s = -1 / 0;
        for (let t of a)
          ((r = Math.min(r, t.x)),
            (l = Math.max(l, t.x)),
            (o = Math.min(o, t.y)),
            (s = Math.max(s, t.y)));
        let i = { x: (r + l) / 2, y: (o + s) / 2 },
          h = [];
        for (let t = 0; t <= 16; t++) {
          let n = -Math.PI / 2 + (Math.PI * t) / 16,
            r = Math.pow(Math.max(0, Math.cos(n)), 0.72),
            l = e * Math.sin(n);
          h.push(
            a.map((t) => ({
              x: i.x + (t.x - i.x) * r,
              y: i.y + (t.y - i.y) * r,
              z: l,
            })),
          );
        }
        return { rings: h, center: i, depth: e };
      })(e, n);
      return {
        size: t,
        silhouette: { kind: "loft", rings: a.rings },
        seat: {
          kind: "loft",
          surfaceZ: (function ({ rings: t, center: e, depth: n }) {
            let a = t[Math.floor(t.length / 2)],
              r = new Float64Array(180);
            for (let t = 0; t < 180; t++) {
              let n = ((t + 0.5) / 180) * Math.PI * 2,
                l = Math.cos(n),
                o = Math.sin(n),
                s = 0;
              for (let t = 0; t < a.length; t++) {
                let n = a[t],
                  r = a[(t + 1) % a.length],
                  i = r.x - n.x,
                  h = r.y - n.y,
                  u = l * h - o * i;
                if (1e-9 > Math.abs(u)) continue;
                let f = n.x - e.x,
                  c = n.y - e.y,
                  p = (f * h - c * i) / u,
                  d = (f * o - c * l) / u;
                p > s && d >= 0 && d <= 1 && (s = p);
              }
              r[t] = s;
            }
            return (t, a) =>
              n *
              Math.sqrt(
                Math.max(
                  0,
                  1 -
                    Math.pow(
                      ((t, n) => {
                        let a = t - e.x,
                          l = n - e.y,
                          o = Math.hypot(a, l);
                        if (o < 1e-8) return 0;
                        let s =
                            (((Math.atan2(l, a) + 2 * Math.PI) %
                              (2 * Math.PI)) /
                              (2 * Math.PI)) *
                            180,
                          i = Math.floor(s) % 180,
                          h = s - Math.floor(s);
                        return Math.min(
                          1,
                          o /
                            Math.max(
                              1e-8,
                              r[i] * (1 - h) + r[(i + 1) % 180] * h,
                            ),
                        );
                      })(t, a),
                      2.7777777777777777,
                    ),
                ),
              );
          })(a),
        },
      };
    }
    function eD(t, e) {
      let n = ez(t),
        a = -(n.bottom - 114.2705) / 114.2705,
        r = -(n.top - 114.2705) / 114.2705,
        l = eO(eq(t)),
        o = Math.min(r - 0.02, Math.max(a + 0.02, 0));
      return {
        kind: "wrap",
        wrapR: l(o),
        wrapY0: a,
        wrapY1: r,
        eyeY: o,
        radiusAt: l,
        puffAt:
          e.length > 0
            ? (t, n) =>
                (function (t, e, n) {
                  let a = t[0],
                    r = -1 / 0,
                    l = 1 / 0,
                    o = !1;
                  for (let s of t) {
                    let t = Math.hypot(e - s[0], n - s[1]);
                    if (t < s[3]) {
                      let e = s[2] + Math.sqrt(s[3] * s[3] - t * t);
                      (!o || e > r) && ((o = !0), (r = e), (a = s));
                    } else !o && t - s[3] < l && ((l = t - s[3]), (a = s));
                  }
                  return { x: a[0], y: a[1], z: a[2], r: a[3] };
                })(e, t, n)
            : void 0,
      };
    }
    function eZ(t) {
      return t.map(([t, e]) => ({
        x: (t - 114.2705) / 114.2705,
        y: -(e - 114.2705) / 114.2705,
        z: 0,
      }));
    }
    function eH(t) {
      let e = 1 / 0,
        n = -1 / 0,
        a = 1 / 0,
        r = -1 / 0;
      for (let [l, o] of ez(t).ring)
        (l < e && (e = l),
          l > n && (n = l),
          o < a && (a = o),
          o > r && (r = o));
      return { x0: e, x1: n, y0: a, y1: r };
    }
    function eG(t) {
      let e = t.length,
        n = 1 / 0,
        a = -1 / 0;
      for (let [, e] of t) (e < n && (n = e), e > a && (a = e));
      ((n -= 1e-5), (a += 1e-5));
      let r = (t) => Math.min(63, Math.floor(((t - n) / (a - n)) * 64)),
        l = Array.from({ length: 64 }, () => []);
      for (let n = 0; n < e; n++) {
        let a = t[n][1],
          o = t[(n + 1) % e][1],
          s = r(Math.max(a, o) + 1e-5);
        for (let t = r(Math.min(a, o) - 1e-5); t <= s; t++) l[t].push(n);
      }
      return (o) => {
        let s = 1 / 0,
          i = -1 / 0;
        if (!(o >= n && o <= a)) return i - s;
        for (let n of l[r(o)]) {
          let [a, r] = t[n],
            [l, h] = t[(n + 1) % e];
          if (1e-9 > Math.abs(h - r)) {
            1e-6 > Math.abs(r - o) &&
              ((s = Math.min(s, a, l)), (i = Math.max(i, a, l)));
            continue;
          }
          if ((r <= o && h >= o) || (h <= o && r >= o)) {
            let t = a + ((l - a) * (o - r)) / (h - r);
            (t < s && (s = t), t > i && (i = t));
          }
        }
        return i - s;
      };
    }
    function eX(t) {
      let e = 1 / 0,
        n = -1 / 0;
      for (let [, a] of t) (a < e && (e = a), a > n && (n = a));
      let a = [],
        r = -(e - 114.2705) / 114.2705,
        l = -(n - 114.2705) / 114.2705,
        o = eG(t),
        s = (t) => {
          let e = o(t);
          return e < 0 ? 0 : e / 2 / 114.2705;
        },
        i = n - e,
        h = (t, e) => {
          if (s(t) >= 0.06) return null;
          let n = s(t),
            a = 0.02 * i;
          for (let r = i / 512; r <= 0.05 * i; r += i / 512)
            if (Math.abs(s(t + e * r) - n) > 1e-4) {
              a = r;
              break;
            }
          return { yEdge: t, sign: e, dJoin: a, rJoin: s(t + e * a) };
        },
        u = [h(e, 1), h(n, -1)].filter((t) => null !== t),
        f = (t) => {
          let e = s(t);
          for (let n of u) {
            let a = (t - n.yEdge) * n.sign;
            a >= 0 &&
              a < n.dJoin &&
              (e = Math.min(e, n.rJoin * Math.sqrt(a / n.dJoin)));
          }
          return e;
        },
        c = (t, e) => {
          let n = f(e);
          n < 0.06 ? a.push({ x: 0, y: t, z: 0 }) : a.push(...eU(t, n));
        };
      c(r, e);
      for (let t = 1; t < 95; t++) {
        let r = e + ((1 - Math.cos((t / 95) * Math.PI)) / 2) * (n - e),
          l = f(r),
          o = -(r - 114.2705) / 114.2705;
        if (l < 1e-4) {
          a.push({ x: 0, y: o, z: 0 });
          continue;
        }
        a.push(...eU(o, l));
      }
      return (c(l, n), a);
    }
    function eU(t, e) {
      let n = [];
      for (let a = 0; a < 64; a++) {
        let r = (a / 64) * eF;
        n.push({ x: e * Math.sin(r), y: t, z: e * Math.cos(r) });
      }
      return n;
    }
    function eO(t) {
      let e = eG(t),
        n = 1 / 0,
        a = -1 / 0;
      for (let [, e] of t) (e < n && (n = e), e > a && (a = e));
      return (t) =>
        Math.max(
          0.02,
          e(Math.max(n, Math.min(a, 114.2705 - 114.2705 * t))) / 2 / 114.2705,
        );
    }
    function eJ(t, e) {
      let { x0: n, x1: a, y0: r, y1: l } = eH(t),
        o = (a - n) / 2 / 114.2705,
        s = (l - r) / 2 / 114.2705,
        i = "x" === e ? s : o,
        h = Math.max(0, ("x" === e ? o : s) - i),
        u = -h,
        f = [];
      for (let t = 0; t < 33; t++) {
        let n = u + (t / 32) * (h - u);
        f.push("x" === e ? [n, 0, 0, i] : [0, n, 0, i]);
      }
      return f;
    }
    let eK = 2 * Math.PI,
      eQ = e1(160),
      eV = e1(480);
    function e1(t) {
      return Array.from({ length: t }, (e, n) => {
        let a = (n / t) * eK;
        return { x: Math.cos(a), y: Math.sin(a) };
      });
    }
    function e0(t, e) {
      return Math.max(0.2, t.size) * ((0.36 * e) / 1.18);
    }
    function e2(t, e, n) {
      return (function (t, e) {
        if ("loft" === t.kind)
          return [
            (function (t, { project: e, origin: n }) {
              let a = t.map((t) => t.map(e)),
                r = (t) => {
                  let e = 0,
                    n = 0;
                  for (let a of t) ((e += a.x), (n += a.y));
                  return { x: e / t.length, y: n / t.length };
                },
                l = r(a[0]),
                o = r(a[a.length - 1]);
              if (1e-4 > Math.hypot(o.x - l.x, o.y - l.y)) {
                let t = a[0],
                  e = 0;
                for (let n of a) {
                  let a = 0;
                  for (let t = 0; t < n.length; t++) {
                    let e = n[t],
                      r = n[(t + 1) % n.length];
                    a += e.x * r.y - r.x * e.y;
                  }
                  Math.abs(a) > e && ((t = n), (e = Math.abs(a)));
                }
                return t;
              }
              let s = a.map((t) =>
                  t.map(
                    ({ x: t, y: e }) =>
                      (t - n.x) * (t - n.x) + (e - n.y) * (e - n.y),
                  ),
                ),
                i = s.map((t) => Math.max(...t)),
                h = 1e-5 * Math.max(...i) + 0.01,
                u = (t, e) => {
                  let n = (e - h) / 1.01;
                  return n > 0 && t < n * n;
                },
                f = a.map((t) =>
                  t.map(
                    (t) =>
                      Math.floor(
                        (((Math.atan2(t.y - n.y, t.x - n.x) + eK) % eK) / eK) *
                          480,
                      ) % 480,
                  ),
                ),
                c = new Float64Array(480),
                p = 0,
                d = (t, e, a, r, l) => {
                  if (u(l, p)) return;
                  let o = r - a;
                  o > 240 ? (o -= 480) : o < -240 && (o += 480);
                  let s = o < 0 ? -1 : 1,
                    i = Math.abs(o),
                    h = 1 / 0;
                  for (let t = -1; t <= i + 1; t++) {
                    let e = (a + s * t + 480) % 480;
                    c[e] < h && (h = c[e]);
                  }
                  if (u(l, h)) return;
                  let f = e.x - t.x,
                    d = e.y - t.y,
                    M = t.x - n.x,
                    y = t.y - n.y;
                  for (let t = -1; t <= i + 1; t++) {
                    let e = (a + s * t + 480) % 480,
                      { x: n, y: r } = eV[e],
                      l = n * d - r * f;
                    if (1e-9 > Math.abs(l)) continue;
                    let o = (M * d - y * f) / l,
                      i = (M * r - y * n) / l;
                    o > c[e] && i >= 0 && i <= 1 && (c[e] = o);
                  }
                };
              for (let t of i.map((t, e) => e).sort((t, e) => i[e] - i[t])) {
                let e = a[t];
                for (let n = 0; n < e.length; n++) {
                  let a = (n + 1) % e.length;
                  d(e[n], e[a], f[t][n], f[t][a], Math.max(s[t][n], s[t][a]));
                }
                p = Math.min(...c);
              }
              for (let t = 0; t < a.length - 1; t++) {
                let e = a[t],
                  n = a[t + 1];
                for (let a = 0; a < Math.min(e.length, n.length); a++)
                  d(
                    e[a],
                    n[a],
                    f[t][a],
                    f[t + 1][a],
                    Math.max(s[t][a], s[t + 1][a]),
                  );
              }
              return eV.flatMap(({ x: t, y: e }, a) =>
                c[a] > 0 ? [{ x: n.x + t * c[a], y: n.y + e * c[a] }] : [],
              );
            })(t.rings, e),
          ];
        if ("solid" === t.kind)
          return [
            (function (t, { project: e, origin: n, radius: a }) {
              let r = [];
              for (let n of t.samples) {
                let t = e(n);
                Number.isFinite(t.x) && Number.isFinite(t.y) && r.push(t);
              }
              if (t.isLoop) return r;
              if (0 === t.balls.length) return e3(r);
              let l = t.balls
                  .map(([t, n, r, l]) => ({
                    ...e({ x: t, y: n, z: r }),
                    r: l * a,
                  }))
                  .filter(
                    (t) =>
                      Number.isFinite(t.x) &&
                      Number.isFinite(t.y) &&
                      t.r > 1e-6,
                  ),
                o = n.x,
                s = n.y;
              if (l.length > 0) {
                for (let t of ((o = 0), (s = 0), l)) ((o += t.x), (s += t.y));
                ((o /= l.length), (s /= l.length));
              }
              for (let { x: t, y: e } of eQ) {
                let n = 0;
                for (let a of l) {
                  let r = a.x - o,
                    l = a.y - s,
                    i = t * r + e * l,
                    h = i * i - (r * r + l * l) + a.r * a.r;
                  if (h <= 0) continue;
                  let u = i + Math.sqrt(h);
                  u > n && (n = u);
                }
                n > 0 && r.push({ x: o + t * n, y: s + e * n });
              }
              if (t.samples.length > 0) return e3(r);
              if (r.length >= 3) return r;
              for (let t of l)
                for (let e = 0; e < 48; e++) {
                  let n = (e / 48) * eK;
                  r.push({
                    x: t.x + t.r * Math.cos(n),
                    y: t.y + t.r * Math.sin(n),
                  });
                }
              return r.length >= 3 ? e3(r) : r;
            })(t, e),
          ];
        let n = t.rings.map((t) => t.map(e.project)),
          a = n[0],
          r = n[n.length - 1],
          l = [r, a];
        for (let t = 1; t < n.length; t++) {
          let e = n[t - 1],
            a = n[t];
          for (let t = 0; t < a.length; t++) {
            let n = (t + 1) % r.length;
            l.push([e[t], e[n], a[n], a[t]]);
          }
        }
        return l;
      })(t.silhouette, e4(t, e, n)).flatMap(e6);
    }
    function e4(t, e, n) {
      let a = n / 2,
        r = e0(t, n),
        l = (function (t, e, n) {
          let [a, r, l] = e5(t),
            [o, s, i] = e5(e),
            [h, u, f] = e5(n);
          return ({ x: t, y: e, z: n }) => {
            let c = t * a + n * r,
              p = e * a + e * l,
              d = n * a - t * r,
              M = c * o + c * i,
              y = p * o - d * s,
              x = d * o + p * s;
            return { x: M * h - y * u, y: y * h + M * u, z: x * h + x * f };
          };
        })(
          (e.yaw * Math.PI) / 180,
          (e.pitch * Math.PI) / 180,
          (e.roll * Math.PI) / 180,
        );
      return {
        rotate: l,
        project: (t) => {
          let e = l(t);
          return { x: a + r * e.x, y: a - r * e.y };
        },
        origin: { x: a, y: a },
        radius: r,
      };
    }
    function e5(t) {
      let e = Math.cos(t);
      return [e, Math.sin(t), 1 - e];
    }
    function e6(t) {
      let [e] = t;
      if (t.length < 2 || !Number.isFinite(e.x) || !Number.isFinite(e.y))
        return [];
      let n = [];
      for (let e of t)
        Number.isFinite(e.x) && Number.isFinite(e.y) && n.push(e.x, e.y);
      return n.length >= 6 ? [n] : [];
    }
    function e3(t) {
      let e = (function (t) {
        let e = 1 / 0,
          n = -1 / 0;
        for (let { x: a } of t) (a < e && (e = a), a > n && (n = a));
        let a = Math.ceil(t.length / 8),
          r = n > e ? a / (n - e) : 0,
          l = (t) => Math.min(a - 1, Math.floor((t - e) * r)),
          o = new Int32Array(a + 1);
        for (let { x: e } of t) o[l(e) + 1]++;
        for (let t = 0; t < a; t++) o[t + 1] += o[t];
        let s = o.slice(0, a),
          i = Array(t.length);
        for (let e of t) i[s[l(e.x)]++] = e;
        for (let t = 0; t < a; t++)
          for (let e = o[t] + 1; e < o[t + 1]; e++) {
            let n = i[e],
              a = e - 1;
            for (
              ;
              a >= o[t] && (i[a].x > n.x || (i[a].x === n.x && i[a].y > n.y));
              a--
            )
              i[a + 1] = i[a];
            i[a + 1] = n;
          }
        return i;
      })(t.filter((t) => Number.isFinite(t.x) && Number.isFinite(t.y)));
      if (e.length < 3) return e;
      let n = (t, e, n) =>
          (e.x - t.x) * (n.y - t.y) - (e.y - t.y) * (n.x - t.x),
        a = [];
      for (let t of e) {
        for (; a.length >= 2 && 0 >= n(a[a.length - 2], a[a.length - 1], t);)
          a.pop();
        a.push(t);
      }
      let r = [];
      for (let t = e.length - 1; t >= 0; t--) {
        let a = e[t];
        for (; r.length >= 2 && 0 >= n(r[r.length - 2], r[r.length - 1], a);)
          r.pop();
        r.push(a);
      }
      return (a.pop(), r.pop(), [...a, ...r]);
    }
    let e7 = { kind: "extrusion", halfDepth: 0.36, bevel: 0.22 },
      e9 = {
        cloud: { kind: "loft", depth: 0.72 },
        square: e7,
        sparkle: e7,
        clover: e7,
        heartChubby: { kind: "loft", depth: 0.62 },
        starFlower: e7,
        teardrop: { kind: "revolve" },
        tablet: { kind: "pill", axis: 0 },
        wedge: { kind: "revolve" },
        house: e7,
        star6: { kind: "extrusion", halfDepth: 0.3, bevel: 0.18 },
        pebble: { kind: "revolve" },
        bean: { kind: "inscribedBalls" },
        egg: { kind: "revolve" },
        squircle: { kind: "roundedSlab", halfDepth: 0.28, edge: 0.11 },
        capsule: { kind: "pill", axis: 1 },
        cylinder: { kind: "revolve" },
        hex: e7,
        gem: { kind: "revolve" },
        crystal: { kind: "crystal" },
        shield: { kind: "revolve" },
        dome: { kind: "revolve" },
        arch: { kind: "revolve" },
        leaf: { kind: "revolve" },
      },
      e8 = 2 * Math.PI,
      nt = { yaw: 0, pitch: 0, roll: 0 },
      ne = new Map();
    function nn(t) {
      let e = e0(t, 1024);
      return e2(t, nt, 1024).map((t) =>
        t.map((t, n) => (n % 2 == 0 ? (t - 512) / e : (512 - t) / e)),
      );
    }
    function na(t, e) {
      let n = t[0].length,
        a = t.flat(),
        r = [],
        l = (t, e) => t * n + (e % n);
      e && r.push(Array.from({ length: n }, (t, e) => l(0, n - 1 - e)));
      for (let e = 1; e < t.length; e++)
        for (let t = 0; t < n; t++)
          r.push([l(e - 1, t), l(e - 1, t + 1), l(e, t + 1), l(e, t)]);
      return (
        e && r.push(Array.from({ length: n }, (e, n) => l(t.length - 1, n))),
        { vertices: a, faces: r }
      );
    }
    function nr(t) {
      return {
        kind: "mesh",
        vertices: t,
        faces: (function (t) {
          var e;
          let n,
            a = (function (t) {
              if (t.length < 4) return null;
              let e = 0;
              t.forEach((n, a) => {
                n[0] < t[e][0] && (e = a);
              });
              let n = eu(t, (n) => ed(ef(n, t[e]))),
                a = eu(t, (a) => ed(ec(ef(t[n], t[e]), ef(a, t[e])))),
                r = ec(ef(t[n], t[e]), ef(t[a], t[e])),
                l = eu(t, (n) => Math.abs(ep(r, ef(n, t[e]))));
              return 1e-10 > Math.abs(ep(r, ef(t[l], t[e])))
                ? null
                : [e, n, a, l];
            })(t);
          if (null == a) return [];
          let r =
              ((n = (e = a.map((e) => t[e])).length),
              [
                e.reduce((t, e) => t + e[0], 0) / n,
                e.reduce((t, e) => t + e[1], 0) / n,
                e.reduce((t, e) => t + e[2], 0) / n,
              ]),
            [l, o, s, i] = a,
            h = [
              [l, o, s],
              [l, o, i],
              [l, s, i],
              [o, s, i],
            ].map(([e, n, a]) => {
              let l = ei(t, [e, n, a]);
              return eh(l, r) > 0 ? ei(t, [e, a, n]) : l;
            });
          return (
            t.forEach((e, n) => {
              if (a.includes(n)) return;
              let r = h.map((t) => eh(t, e) > 1e-10);
              if (!r.includes(!0)) return;
              let l = new Set();
              h.forEach((t, e) => {
                if (!r[e])
                  for (let e = 0; e < 3; e++) {
                    var n;
                    l.add(
                      ((n = t.corners[e]),
                      0x4000000 * n + t.corners[(e + 1) % 3]),
                    );
                  }
              });
              let o = [];
              (h.forEach((e, a) => {
                if (!r[a]) return void o.push(e);
                for (let a = 0; a < 3; a++) {
                  let r = e.corners[a],
                    s = e.corners[(a + 1) % 3];
                  l.has(0x4000000 * s + r) && o.push(ei(t, [r, s, n]));
                }
              }),
                (h = o));
            }),
            h.map((t) => t.corners)
          );
        })(t).map((t) => ({ corners: t, isBounding: !0 })),
      };
    }
    function nl(t, e) {
      let n = 0,
        a = 0,
        r = 0;
      for (let l = 0; l < e.length; l++) {
        let o = t[e[l]],
          s = t[e[(l + 1) % e.length]];
        ((n += (o[1] - s[1]) * (o[2] + s[2])),
          (a += (o[2] - s[2]) * (o[0] + s[0])),
          (r += (o[0] - s[0]) * (o[1] + s[1])));
      }
      return [n, a, r];
    }
    function no(t) {
      let e = 0;
      return (
        t.forEach((n, a) => {
          let r = t[(a + 1) % t.length];
          e += n[0] * r[1] - r[0] * n[1];
        }),
        e < 0 ? [...t].reverse() : t
      );
    }
    function ns(t) {
      let e = 1 / 0,
        n = -1 / 0,
        a = 1 / 0,
        r = -1 / 0;
      for (let [l, o] of t)
        ((e = Math.min(e, l)),
          (n = Math.max(n, l)),
          (a = Math.min(a, o)),
          (r = Math.max(r, o)));
      return { x0: e, x1: n, y0: a, y1: r };
    }
    function ni(t) {
      return Array.from({ length: t.length / 2 }, (e, n) => [
        t[2 * n],
        t[2 * n + 1],
      ]);
    }
    class nh {
      xs = [];
      ys = [];
      #t = new Map();
      id(t, e) {
        let n = (t + 8388608) * 0x2000000 + (e + 8388608),
          a = this.#t.get(n);
        return (
          null == a &&
            ((a = this.xs.length),
            this.xs.push(t),
            this.ys.push(e),
            this.#t.set(n, a)),
          a
        );
      }
    }
    function nu(t) {
      let e = "";
      for (let n of t) {
        e += `M${np(n[0])} ${np(n[1])}`;
        for (let t = 2; t < n.length; t += 2)
          e += ` ${np(n[t])} ${np(n[t + 1])}`;
        e += "Z";
      }
      return e;
    }
    function nf(t, e, n, a, r, l, o, s) {
      var i, h, u, f, c, p, d, M;
      let y = Math.sign((n - (i = t)) * (l - (h = e)) - (a - h) * (r - i)),
        x = Math.sign((n - (u = t)) * (s - (f = e)) - (a - f) * (o - u)),
        m = (o - (c = r)) * (e - (p = l)) - (s - p) * (t - c),
        g = (o - (d = r)) * (a - (M = l)) - (s - M) * (n - d);
      if (!(y * x < 0 && Math.sign(m) * Math.sign(g) < 0)) return null;
      let v = m / (m - g);
      return [Math.round(t + (n - t) * v), Math.round(e + (a - e) * v)];
    }
    function nc(t) {
      return Math.min(t.ax, t.bx);
    }
    function np(t) {
      return String(Math.round(100 * t) / 100);
    }
    let nd = Math.PI / 6,
      nM =
        ((i = Math.hypot((h = [-0.5, 0.6, 0.62])[0], h[1], h[2])),
        [h[0] / i, h[1] / i, h[2] / i]),
      ny = [
        ...[0, 1, 2, 3, 4, 5].map((t) => {
          let e = t * nd;
          return {
            center: [0, 0, 0],
            a: [Math.sin(e), 0, Math.cos(e)],
            b: [0, 1, 0],
            isEquator: !1,
          };
        }),
        ...[-2, -1, 0, 1, 2].map((t) => {
          let e = t * nd,
            n = Math.cos(e);
          return {
            center: [0, Math.sin(e), 0],
            a: [0, 0, n],
            b: [n, 0, 0],
            isEquator: 0 === t,
          };
        }),
      ],
      nx = null,
      nm = Math.PI / 180;
    function ng(t, e, n) {
      let a = t.get(e);
      null == a ? t.set(e, [n]) : a.push(n);
    }
    function nv(t, e) {
      return { d: nu(t), fill: e };
    }
    let nb = 180 / Math.PI,
      nw = new Map(),
      nk = 0;
    function n$(t, e = 0) {
      let n = W(t),
        [a, r, l] = j(
          n[8] >= 0
            ? n
            : [-n[0], n[1], -n[2], -n[3], n[4], -n[5], -n[6], n[7], -n[8]],
        ),
        o = (t) => (e > 0 ? Math.round(t / e) * e : t);
      return { yaw: nA(o(r * nb)), pitch: nA(o(a * nb)), roll: o(l * nb) };
    }
    function nC(t, e) {
      let n = (0.6 / Math.max((t * e) / 2, 1)) * nb;
      return 2 ** Math.floor(Math.log2(n));
    }
    function nA(t) {
      let e = ((t % 180) + 180) % 180;
      return Math.abs(e - 90) >= 0.5 ? t : t + (e <= 90 ? 89.5 - e : 90.5 - e);
    }
    function nI(t, e, n, a, r) {
      var l, o;
      let s =
        null == a
          ? []
          : ((l = eL(t)),
            (o = (function (t, e, n, a) {
              var r, l, o, s, i;
              let h,
                u,
                f = t6[t],
                c = f.width / 0.26,
                p = f.height / 0.57,
                d = f.gap / 0.64;
              if (
                e.every(
                  (t) =>
                    eo(t) && !(null != t.fillRing && t.fillRing.length > 0),
                )
              )
                return (function (t, e, n, a, r, l, o, s) {
                  let i = es(t.width * a),
                    h = es(t.height * a),
                    u = es(e.width * a),
                    f = es(e.height * a),
                    c = Math.max(0, es(Math.min(i, h))),
                    p = Math.max(0, es(Math.max(i, h))),
                    d = Math.max(0, es(Math.min(u, f))),
                    M = Math.max(0, es(Math.max(u, f))),
                    y = Math.max(
                      0,
                      es(
                        (0.64 + (t.on ? es(t.cx) : 0) + (e.on ? es(e.cx) : 0)) *
                          l,
                        0.64 * l,
                      ),
                    );
                  if (s >= 0.001) {
                    let [t, e] = t7(y, o, s);
                    ((c *= t), (p *= t), (d *= e), (M *= e));
                  }
                  let x = Math.max(0.05, Math.min(1.8, y));
                  return {
                    loops: [
                      t3(-1, c, p, -es(es(t.tilt) + (i >= h ? 0 : 90)), x),
                      t3(1, d, M, es(es(e.tilt) + (u >= f ? 0 : 90)), x),
                    ],
                    shiftY: es(
                      n.shiftY + ((es(t.cy) + es(e.cy)) / 2) * r,
                      n.shiftY,
                    ),
                  };
                })(t8(e[0]), t8(e[1]), f, c, p, d, n, a);
              let M =
                  ((r = e),
                  (l = c),
                  (o = d),
                  (s = p),
                  (i = f.shiftY),
                  (h = []),
                  (u = -Math.sin(i)),
                  r.forEach((t, e) => {
                    let n = eo(t);
                    if ((!(t.wid > 0) && !n) || (!n && t.pts.length < 2))
                      return;
                    let a = 0 === e ? -1 : 1,
                      r = t.lidY || 1,
                      i = Math.cos(t.tilt || 0),
                      f = Math.sin(t.tilt || 0),
                      c = a * ((0.32 + es(t.off[0])) * o),
                      p = u + es(t.off[1]) * s,
                      d = (t, e) => ({
                        x: c + a * (t * i - e * f) * l,
                        y: p + (t * f + e * i) * l * r,
                      });
                    if (null != t.fillRing && t.fillRing.length >= 3) {
                      let e = es(t.off[0]),
                        n = es(t.off[1]);
                      h.push(t.fillRing.map(([t, a]) => d(t - e, (a - n) * r)));
                      return;
                    }
                    if (n) {
                      let e = [];
                      for (let n = 0; n < 48; n++) {
                        let a = (2 * Math.PI * n) / 48;
                        e.push(
                          d(
                            t.oval[0] * Math.cos(a),
                            t.oval[1] * r * Math.sin(a),
                          ),
                        );
                      }
                      h.push(e);
                      return;
                    }
                    let M = t.wid * l,
                      y =
                        null != t.path && 18 === t.path.length
                          ? (function (t, e, n) {
                              if (n <= 0) return [];
                              let a = [];
                              for (let n = 0; n < 2; n++) {
                                let r = ea(t, n),
                                  l = er(t, n, 4),
                                  o = er(t, n + 1, 2),
                                  s = ea(t, n + 1);
                                for (let t = +(0 !== n); t < 11; t++) {
                                  let n = t / 10,
                                    i = (function (t, e, n, a, r) {
                                      let l = 1 - r;
                                      return [
                                        l * l * l * t[0] +
                                          3 * l * l * r * e[0] +
                                          3 * l * r * r * n[0] +
                                          r * r * r * a[0],
                                        l * l * l * t[1] +
                                          3 * l * l * r * e[1] +
                                          3 * l * r * r * n[1] +
                                          r * r * r * a[1],
                                      ];
                                    })(r, l, o, s, n),
                                    h = (function (t, e, n, a, r) {
                                      let l = 1 - r;
                                      return [
                                        3 * l * l * (e[0] - t[0]) +
                                          6 * l * r * (n[0] - e[0]) +
                                          3 * r * r * (a[0] - n[0]),
                                        3 * l * l * (e[1] - t[1]) +
                                          6 * l * r * (n[1] - e[1]) +
                                          3 * r * r * (a[1] - n[1]),
                                      ];
                                    })(r, l, o, s, n),
                                    u = e(i[0], i[1]),
                                    f = e(i[0] + h[0], i[1] + h[1]);
                                  a.push({
                                    x: u.x,
                                    y: u.y,
                                    tx: f.x - u.x,
                                    ty: f.y - u.y,
                                  });
                                }
                              }
                              let r = en(a, n);
                              if (null != r) return r;
                              let l = a.length,
                                o = [],
                                s = [];
                              for (let t = 0; t < l; t++) {
                                let e = Math.hypot(a[t].tx, a[t].ty) || 1,
                                  n = -a[t].ty / e,
                                  r = a[t].tx / e;
                                (t > 0 &&
                                  n * o[t - 1] + r * s[t - 1] < 0 &&
                                  ((n = -n), (r = -r)),
                                  o.push(n),
                                  s.push(r));
                              }
                              let i = a[0],
                                h = a[l - 1],
                                u = Math.hypot(i.tx, i.ty) || 1,
                                f = Math.hypot(h.tx, h.ty) || 1;
                              return et(
                                a,
                                o,
                                s,
                                n,
                                { x: i.tx / u, y: i.ty / u },
                                { x: h.tx / f, y: h.ty / f },
                              );
                            })(t.path, d, M)
                          : (function (t, e) {
                              let n = [];
                              for (let e of t) {
                                let t = n.at(-1);
                                (null == t ||
                                  Math.hypot(e.x - t.x, e.y - t.y) > 1e-6) &&
                                  n.push(e);
                              }
                              if (0 === n.length || e <= 0) return [];
                              let a = en(n, e);
                              if (null != a) return a;
                              let r = n.length;
                              if (r < 2) return [];
                              let l = [],
                                o = [];
                              for (let t = 0; t < r; t++) {
                                let e = n[Math.max(0, t - 1)],
                                  a = n[Math.min(r - 1, t + 1)],
                                  s = Math.hypot(a.x - e.x, a.y - e.y) || 1,
                                  i = -(a.y - e.y) / s,
                                  h = (a.x - e.x) / s;
                                (t > 0 &&
                                  i * l[t - 1] + h * o[t - 1] < 0 &&
                                  ((i = -i), (h = -h)),
                                  l.push(i),
                                  o.push(h));
                              }
                              let s = el(n[1].x - n[0].x, n[1].y - n[0].y),
                                i = el(
                                  n[r - 1].x - n[r - 2].x,
                                  n[r - 1].y - n[r - 2].y,
                                );
                              return et(n, l, o, e, s, i);
                            })(
                              t.pts.map((t) => d(t[0], t[1])),
                              M,
                            );
                    y.length > 0 && h.push(y);
                  }),
                  h),
                y = 1;
              if (a >= 0.001) {
                let [t, e] = t7(Math.max(0, es(0.64 * d, 0.64)), n, a);
                ((y *= t), M.length >= 2 && (M = [t9(M[0], t), t9(M[1], e)]));
              }
              let x = Math.max(0.08, Math.min(1.25, y));
              return {
                loops: M.map((t) => t.map((t) => ({ x: t.x * x, y: t.y * x }))),
                shiftY: 0,
              };
            })(t, a, e.yaw, r)),
            null == l.seat
              ? []
              : (function (t, e, n) {
                  switch (t.kind) {
                    case "front":
                      return (function (t, { loops: e, shiftY: n }, a) {
                        if (!(a.rotate({ x: 0, y: 0, z: 1 }).z > 0.03))
                          return [];
                        let r = Math.sin(n);
                        return e
                          .filter((t) => t.length >= 3)
                          .map((e) =>
                            e.map((e) =>
                              a.project({ x: e.x, y: e.y - r, z: t }),
                            ),
                          );
                      })(t.faceZ, e, n);
                    case "loft":
                      return (function (
                        t,
                        { loops: e, shiftY: n },
                        { rotate: a, project: r },
                      ) {
                        if (!(a({ x: 0, y: 0, z: 1 }).z >= 0.05)) return [];
                        let l = Math.sin(n),
                          o = [];
                        for (let n of e) {
                          if (n.length < 3) continue;
                          let e = n.map((t) => ({ x: t.x, y: t.y - l })),
                            s = 0,
                            i = 0;
                          for (let t of e) ((s += t.x), (i += t.y));
                          ((s /= e.length), (i /= e.length));
                          let h = (t(s + 0.004, i) - t(s - 0.004, i)) / 0.008,
                            u = (t(s, i + 0.004) - t(s, i - 0.004)) / 0.008,
                            f = Math.hypot(h, u, 1);
                          if (a({ x: -h / f, y: -u / f, z: 1 / f }).z < 0.12)
                            continue;
                          let c = t(s, i);
                          o.push(
                            e.map((t) =>
                              r({
                                x: t.x,
                                y: t.y,
                                z: c + (t.x - s) * h + (t.y - i) * u,
                              }),
                            ),
                          );
                        }
                        return o;
                      })(t.surfaceZ, e, n);
                    case "wrap":
                      return (function (
                        t,
                        { loops: e, shiftY: n },
                        { rotate: a, project: r },
                      ) {
                        let {
                            wrapR: l,
                            wrapY0: o,
                            wrapY1: s,
                            radiusAt: i,
                            puffAt: h,
                          } = t,
                          u = i ? 0.02 : 0.06,
                          f = Math.min(s - u, Math.max(o + u, t.eyeY - n)),
                          c = (t) => Math.min(s, Math.max(o, t)),
                          p = 1 / 0,
                          d = -1 / 0;
                        for (let t of e)
                          for (let e of t)
                            (e.y < p && (p = e.y), e.y > d && (d = e.y));
                        let M = 0;
                        d - p <= s - o &&
                          (f + p < o
                            ? (M = o - (f + p))
                            : f + d > s && (M = s - (f + d)));
                        let y =
                            0 === M
                              ? e
                              : e.map((t) =>
                                  t.map((t) => ({ x: t.x, y: t.y + M })),
                                ),
                          x = h
                            ? (t) => {
                                if (!h || 0 === t.length) return [];
                                let e = 0,
                                  n = 0;
                                for (let a of t) ((e += a.x), (n += a.y));
                                let l = h(e / t.length, c(f + n / t.length)),
                                  o = a({ x: 0, y: 0, z: 1 }).z,
                                  s = [];
                                for (let e of t) {
                                  let t = e.x - l.x,
                                    n = c(f + e.y) - l.y,
                                    i = Math.hypot(t, n),
                                    h = Math.min(i / l.r, Math.PI - 0.02),
                                    u = i > 1e-9 ? t / i : 1,
                                    p = i > 1e-9 ? n / i : 0,
                                    d = a({ x: u, y: p, z: 0 }).z,
                                    M = (t) =>
                                      d * Math.sin(t) + o * Math.cos(t);
                                  if (0.06 > M(h) && o > 0.06) {
                                    let t = 0,
                                      e = h;
                                    for (let n = 0; n < 20; n++) {
                                      let n = (t + e) / 2;
                                      M(n) >= 0.06 ? (t = n) : (e = n);
                                    }
                                    h = t;
                                  }
                                  let y = l.r * Math.sin(h);
                                  a({
                                    x: u * Math.sin(h),
                                    y: p * Math.sin(h),
                                    z: Math.cos(h),
                                  }).z >= 0.05 &&
                                    s.push(
                                      r({
                                        x: l.x + u * y,
                                        y: l.y + p * y,
                                        z: l.z + l.r * Math.cos(h),
                                      }),
                                    );
                                }
                                return s;
                              }
                            : (t) => {
                                let e = [];
                                for (let n of t) {
                                  let t = c(f + n.y),
                                    h = i ? i(t) : l,
                                    u = Math.max(
                                      -2.6,
                                      Math.min(2.6, n.x / Math.max(0.12, h)),
                                    ),
                                    p = 0;
                                  (i &&
                                    (p =
                                      -(
                                        i(Math.min(s, t + 0.012)) -
                                        i(Math.max(o, t - 0.012))
                                      ) / 0.024),
                                    a({ x: Math.sin(u), y: p, z: Math.cos(u) })
                                      .z >= 0.05 &&
                                      e.push(
                                        r({
                                          x: h * Math.sin(u),
                                          y: t,
                                          z: h * Math.cos(u),
                                        }),
                                      ));
                                }
                                return e;
                              };
                        return y.map(x).filter((t) => t.length > 2);
                      })(t, e, n);
                    case "wrapX":
                      return (function (
                        t,
                        { loops: e, shiftY: n },
                        { rotate: a, project: r },
                      ) {
                        let {
                            wrapR: l,
                            wrapX0: o,
                            wrapX1: s,
                            radiusAtX: i,
                          } = t,
                          h = Math.max(-2.4, Math.min(2.4, -n / l)),
                          u = 1 / 0,
                          f = -1 / 0;
                        for (let t of e)
                          for (let e of t)
                            (e.x < u && (u = e.x), e.x > f && (f = e.x));
                        let c = 0;
                        return (
                          f - u <= s - o &&
                            (u < o ? (c = o - u) : f > s && (c = s - f)),
                          (0 === c
                            ? e
                            : e.map((t) =>
                                t.map((t) => ({ x: t.x + c, y: t.y })),
                              )
                          )
                            .map((t) => {
                              let e = [];
                              for (let n of t) {
                                let t = Math.min(s, Math.max(o, n.x)),
                                  u = i(t),
                                  f =
                                    h +
                                    Math.max(
                                      -2.6,
                                      Math.min(2.6, n.y / Math.max(0.12, l)),
                                    );
                                a({
                                  x:
                                    -(
                                      i(Math.min(s, t + 0.012)) -
                                      i(Math.max(o, t - 0.012))
                                    ) / 0.024,
                                  y: Math.sin(f),
                                  z: Math.cos(f),
                                }).z >= 0.05 &&
                                  e.push(
                                    r({
                                      x: t,
                                      y: u * Math.sin(f),
                                      z: u * Math.cos(f),
                                    }),
                                  );
                              }
                              return e;
                            })
                            .filter((t) => t.length > 2)
                        );
                      })(t, e, n);
                  }
                })(l.seat, o, e4(l, e, n)).flatMap(e6));
      return {
        body: (function (t, e, n) {
          let a = `${t} ${n} ${e.yaw} ${e.pitch} ${e.roll}`,
            r = nw.get(a);
          if (null != r) return (nw.delete(a), nw.set(a, r), r);
          let l = (function (t) {
            let e, n;
            if (1 === t.length) return [nu(t)];
            let a =
              ((n = (function (t) {
                let e = new nh();
                for (let n of t) (e.id(n.ax, n.ay), e.id(n.bx, n.by));
                let n = t.map((t, e) => e).sort((e, n) => nc(t[e]) - nc(t[n]));
                n.forEach((a, r) => {
                  let l = t[a],
                    o = Math.max(l.ax, l.bx);
                  for (let a = r + 1; a < n.length; a++) {
                    var s,
                      i,
                      h,
                      u,
                      f,
                      c,
                      p,
                      d,
                      M,
                      y,
                      x,
                      m,
                      g,
                      v,
                      b,
                      w,
                      k,
                      $,
                      C,
                      A;
                    let r = t[n[a]];
                    if (nc(r) > o) break;
                    if (
                      Math.min(r.ay, r.by) > Math.max(l.ay, l.by) ||
                      Math.max(r.ay, r.by) < Math.min(l.ay, l.by)
                    )
                      continue;
                    let I = Math.sign(
                        ((s = l.ax),
                        (i = l.ay),
                        (h = l.bx),
                        (u = l.by),
                        (f = r.ax),
                        (h - s) * (r.ay - i) - (u - i) * (f - s)),
                      ),
                      P = Math.sign(
                        ((c = l.ax),
                        (p = l.ay),
                        (d = l.bx),
                        (M = l.by),
                        (y = r.bx),
                        (d - c) * (r.by - p) - (M - p) * (y - c)),
                      ),
                      z =
                        ((x = r.ax),
                        (m = r.ay),
                        (g = r.bx),
                        (v = r.by),
                        (b = l.ax),
                        (g - x) * (l.ay - m) - (v - m) * (b - x)),
                      q =
                        ((w = r.ax),
                        (k = r.ay),
                        ($ = r.bx),
                        (C = r.by),
                        (A = l.bx),
                        ($ - w) * (l.by - k) - (C - k) * (A - w));
                    if (I * P >= 0 || Math.sign(z) * Math.sign(q) >= 0)
                      continue;
                    let _ = z / (z - q);
                    e.id(
                      Math.round(l.ax + (l.bx - l.ax) * _),
                      Math.round(l.ay + (l.by - l.ay) * _),
                    );
                  }
                });
                let { xs: a, ys: r } = e;
                return a
                  .map((t, e) => ({ x: t, y: r[e] }))
                  .sort((t, e) => t.x - e.x);
              })(
                (e = (function (t) {
                  let e = new nh(),
                    n = new Map(),
                    a = [],
                    r = [],
                    l = (t) => {
                      let a = (function (t) {
                        let e = 0;
                        for (let n = 0; n < t.length; n += 2) {
                          let a = (n + 2) % t.length;
                          e += t[n] * t[a + 1] - t[a] * t[n + 1];
                        }
                        return e;
                      })(t);
                      if (0 === a) return;
                      let l = t.length / 2;
                      r.length = 0;
                      for (let n = 0; n < l; n++) {
                        let o = a > 0 ? n : l - 1 - n;
                        r.push(e.id(t[2 * o], t[2 * o + 1]));
                      }
                      for (let t = 0; t < l; t++) {
                        let e = r[t],
                          a = r[(t + 1) % l];
                        if (e === a) continue;
                        let o = 0x4000000 * a + e,
                          s = n.get(o) ?? 0;
                        s > 1
                          ? n.set(o, s - 1)
                          : 1 === s
                            ? n.delete(o)
                            : n.set(
                                0x4000000 * e + a,
                                (n.get(0x4000000 * e + a) ?? 0) + 1,
                              );
                      }
                    };
                  for (let e of t) {
                    a.length = e.length;
                    for (let t = 0; t < e.length; t++)
                      a[t] = Math.round(1024 * e[t]);
                    let t =
                      8 === a.length
                        ? (function (t) {
                            let [e, n, a, r, l, o, s, i] = t,
                              h = nf(e, n, a, r, l, o, s, i);
                            if (null != h)
                              return [
                                [e, n, h[0], h[1], s, i],
                                [h[0], h[1], a, r, l, o],
                              ];
                            let u = nf(a, r, l, o, s, i, e, n);
                            return null != u
                              ? [
                                  [a, r, u[0], u[1], e, n],
                                  [u[0], u[1], l, o, s, i],
                                ]
                              : null;
                          })(a)
                        : null;
                    if (null == t) l(a);
                    else for (let e of t) l(e);
                  }
                  let { xs: o, ys: s } = e;
                  return [...n].map(([t, e]) => {
                    let n = Math.floor(t / 0x4000000),
                      a = t - 0x4000000 * n;
                    return { ax: o[n], ay: s[n], bx: o[a], by: s[a], count: e };
                  });
                })(t)),
              )),
              (function (t) {
                let e = new nh(),
                  n = [];
                for (let a of t) {
                  let t = e.id(a.ax, a.ay),
                    r = e.id(a.bx, a.by);
                  for (; n.length <= Math.max(t, r);) n.push([]);
                  for (let e = 0; e < Math.abs(a.count); e++)
                    a.count > 0 ? n[t].push(r) : n[r].push(t);
                }
                let { xs: a, ys: r } = e,
                  l = "";
                return (
                  n.forEach((t, e) => {
                    for (; t.length > 0;) {
                      l += `M${np(a[e] / 1024)} ${np(r[e] / 1024)}`;
                      let o = t.pop();
                      for (; null != o && o !== e;)
                        ((l += ` ${np(a[o] / 1024)} ${np(r[o] / 1024)}`),
                          (o = n[o].pop()));
                      l += "Z";
                    }
                  }),
                  l
                );
              })(
                (function (t) {
                  let e = [];
                  for (let i of t) {
                    let h = i.ax + i.bx,
                      u = i.ay + i.by,
                      f = 0;
                    for (let e of t) {
                      var n, a, r, l, o, s;
                      if (e === i) continue;
                      let t = 2 * e.ay,
                        c = 2 * e.by;
                      t <= u
                        ? c > u &&
                          ((n = 2 * e.ax),
                          (a = t),
                          (r = 2 * e.bx),
                          (r - n) * (u - a) - (c - a) * (h - n) > 0) &&
                          (f += e.count)
                        : c <= u &&
                          0 >
                            ((l = 2 * e.ax),
                            (o = t),
                            (s = 2 * e.bx),
                            (s - l) * (u - o) - (c - o) * (h - l)) &&
                          (f -= e.count);
                    }
                    let c =
                        i.ay < i.by || (i.ay === i.by && i.ax > i.bx)
                          ? f + i.count
                          : f,
                      p = c - i.count;
                    (0 !== c) != (0 !== p) &&
                      e.push(
                        0 !== c
                          ? { ...i, count: 1 }
                          : {
                              ax: i.bx,
                              ay: i.by,
                              bx: i.ax,
                              by: i.ay,
                              count: 1,
                            },
                      );
                  }
                  return e;
                })(
                  (function (t) {
                    let e = new nh(),
                      n = new Map();
                    for (let a of t) {
                      let t = e.id(a.ax, a.ay),
                        r = e.id(a.bx, a.by),
                        l = 0x4000000 * Math.min(t, r) + Math.max(t, r);
                      n.set(l, (n.get(l) ?? 0) + (t < r ? a.count : -a.count));
                    }
                    let { xs: a, ys: r } = e,
                      l = [];
                    for (let [t, e] of n) {
                      if (0 === e) continue;
                      let n = Math.floor(t / 0x4000000),
                        o = t - 0x4000000 * n;
                      l.push({
                        ax: a[n],
                        ay: r[n],
                        bx: a[o],
                        by: r[o],
                        count: e,
                      });
                    }
                    return l;
                  })(
                    e.flatMap((t) =>
                      (function (t, e) {
                        let n = t.bx - t.ax,
                          a = t.by - t.ay,
                          r = Math.abs(n) + Math.abs(a),
                          l = Math.min(t.ay, t.by) - 0.5,
                          o = Math.max(t.ay, t.by) + 0.5,
                          s = Math.max(t.ax, t.bx) + 0.5,
                          i = [];
                        for (
                          let p = (function (t, e) {
                            let n = 0,
                              a = t.length;
                            for (; n < a;) {
                              let r = (n + a) >> 1;
                              t[r].x < e ? (n = r + 1) : (a = r);
                            }
                            return n;
                          })(e, Math.min(t.ax, t.bx) - 0.5);
                          p < e.length && e[p].x <= s;
                          p++
                        ) {
                          var h, u, f, c;
                          let { x: s, y: d } = e[p];
                          d < l ||
                            d > o ||
                            2 *
                              Math.abs(
                                ((h = t.ax),
                                (u = t.ay),
                                (f = t.bx),
                                (c = t.by),
                                (f - h) * (d - u) - (c - u) * (s - h)),
                              ) >
                              r ||
                            i.push({
                              t:
                                ((s - t.ax) * n + (d - t.ay) * a) /
                                (n * n + a * a),
                              x: s,
                              y: d,
                            });
                        }
                        i.sort((t, e) => t.t - e.t);
                        let p = [];
                        for (let e = 1; e < i.length; e++) {
                          let n = i[e - 1],
                            a = i[e];
                          (n.x !== a.x || n.y !== a.y) &&
                            p.push({
                              ax: n.x,
                              ay: n.y,
                              bx: a.x,
                              by: a.y,
                              count: t.count,
                            });
                        }
                        return p;
                      })(t, n),
                    ),
                  ),
                ),
              ));
            return "" === a ? [] : [a];
          })(e2(eL(t), e, n));
          for (let [t, e] of (nw.set(a, l), (nk += nP(l)), nw)) {
            if (nk <= 16e6) break;
            (nw.delete(t), (nk -= nP(e)));
          }
          return l;
        })(t, e, n),
        eyes: s.map((t) => nu([t])),
      };
    }
    function nP(t) {
      return t.reduce((t, e) => t + e.length, 0);
    }
    function nz(t, e, n, a) {
      let r = e / 2,
        l = r + t.offset[0] * t.zoom * r,
        o = r - t.offset[1] * t.zoom * r,
        s = o - t.squashAnchor * t.zoom * r,
        [i, h] = t.squash,
        u = n / a;
      return [i * u, h * u, l - (i * n) / 2, s + h * (o - n / 2 - s)];
    }
    function nq(t) {
      let e = [];
      for (let n of t.split("Z")) {
        let t = n
          .replace("M", " ")
          .trim()
          .split(/\s+/)
          .filter((t) => "" !== t)
          .map(Number);
        if (t.length < 6) continue;
        let a = [];
        for (let e = 0; e + 1 < t.length; e += 2) a.push([t[e], t[e + 1]]);
        e.push(a);
      }
      return e;
    }
    function n_(t) {
      return `rgb(${Math.round(255 * t[0])}, ${Math.round(255 * t[1])}, ${Math.round(255 * t[2])})`;
    }
    function nF(t) {
      return Math.round(1e6 * t) / 1e6;
    }
    let nB = 2 * Math.PI;
    function nY(t) {
      let e = t.reduce((t, e) => t + e.weight, 0),
        [n] = t;
      return null == n || 0 === e
        ? []
        : n.outline.map((n, a) => {
            let r = 0,
              l = 0;
            for (let { outline: e, weight: n } of t)
              ((r += e[a][0] * n), (l += e[a][1] * n));
            return [r / e, l / e];
          });
    }
    function nR(t) {
      if (0 === t.length) return [0, 0];
      let e = 0,
        n = 0;
      for (let [a, r] of t) ((e += a), (n += r));
      return [e / t.length, n / t.length];
    }
    function nL(t) {
      return 0 === t.length
        ? ""
        : `M${t.map(([t, e]) => `${nS(t)} ${nS(e)}`).join("L")}Z`;
    }
    function nT(t, e, n) {
      let a = Math.atan2(n - t[1], e - t[0]);
      return a < 0 ? a + nB : a;
    }
    function nS(t) {
      return String(Math.round(100 * t) / 100);
    }
    let nE = [1, 1];
    function nN(t, e) {
      return [
        { kind: "arc", to: [-t[0], 0], radii: t, sweep: e * Math.PI },
        { kind: "arc", to: [t[0], 0], radii: t, sweep: e * Math.PI },
      ];
    }
    function nW(t, e) {
      let n = Math.cos(e),
        a = Math.sin(e),
        r = 1 / Math.sqrt((n * n) / (t[0] * t[0]) + (a * a) / (t[1] * t[1]));
      return [r * n, r * a];
    }
    function nj(t, e) {
      let n = t[2] / (t[2] - e[2]),
        a = t[0] + (e[0] - t[0]) * n,
        r = t[1] + (e[1] - t[1]) * n,
        l = Math.sqrt(a * a + r * r);
      return [a / l, r / l];
    }
    function nD(t, e, n) {
      let a = nH(Math.atan2(e[1], e[0]) - n) - nH(Math.atan2(t[1], t[0]) - n);
      return { kind: "arc", to: e, radii: nE, sweep: a };
    }
    function nZ(t, e, n) {
      return [t[0] + (e[0] - t[0]) * n, t[1] + (e[1] - t[1]) * n];
    }
    function nH(t) {
      return t - 2 * Math.PI * Math.round(t / (2 * Math.PI));
    }
    function nG(t) {
      let e = t % (2 * Math.PI);
      return e < 0 ? e + 2 * Math.PI : e;
    }
    function nX(t, e, n, a, r, l, o) {
      let s = 0,
        i = a,
        h = 1,
        u = o,
        f = 0,
        c = 0;
      for (let a = 0; a < 60; a++) {
        c = (s * u - h * i) / (u - i);
        let a = t.field(e + (r - e) * c, n + (l - n) * c);
        if (Math.abs(a) <= t.root || h - s <= 1e-15) break;
        a < 0 == u < 0
          ? ((h = c), (u = a), -1 === f && (i /= 2), (f = -1))
          : ((s = c), (i = a), 1 === f && (u /= 2), (f = 1));
      }
      return c;
    }
    function nU(t, e, n, a, r, l) {
      if (0 === a) return 0;
      let o = 0,
        s = a;
      for (let i = 0; i < 256; i++) {
        let i = o + Math.max(Math.abs(s), t.root);
        if (i > t.reach) break;
        let h = e + r * i,
          u = n + l * i,
          f = t.field(h, u);
        if (f < 0 != a < 0)
          return o + (i - o) * nX(t, e + r * o, n + l * o, s, h, u, f);
        ((o = i), (s = f));
      }
      return null;
    }
    function nO(t, e) {
      let n = e[0] - t[0],
        a = e[1] - t[1];
      return n * n + a * a;
    }
    let nJ = new Map(),
      nK = 0.999 * Math.PI,
      nQ = J.map(function ({ M: t, T: e, C: n }) {
        let a = [
          n[1] * e[2] - n[2] * e[1],
          n[2] * e[0] - n[0] * e[2],
          n[0] * e[1] - n[1] * e[0],
        ];
        return a[0] * t[0] + a[1] * t[1] + a[2] * t[2] < 0;
      }),
      nV = Math.PI / 48;
    function n1(t, e) {
      if (null === t.eyes) return [];
      let n = W(t.quat),
        a = [Math.abs(t.squash[0]), Math.abs(t.squash[1])],
        r = a[0] < 1 || a[1] < 1,
        l = [];
      return (
        t.eyes.forEach((t, o) => {
          for (let s of (function (t, e, n, a, r) {
            let l = (function (t, e) {
              let n = Math.min(
                  16,
                  Math.max(0, Math.ceil(Math.log2(Math.max(e, 1)))),
                ),
                a = `${n}|${t.wid}|${t.oval.join()}|${t.ovalMix}|${t.pts.join()}`,
                r = nJ.get(a);
              if (void 0 !== r) return (nJ.delete(a), nJ.set(a, r), r);
              let l = (function (t, e) {
                let n = 1 / 0,
                  a = 1 / 0,
                  r = -1 / 0,
                  l = -1 / 0,
                  o = 1 / 0,
                  { segments: s, halfWidth: i } = t;
                if (i > 0 && t.ellipseMix < 1 && s.length > 0) {
                  for (let t = 0; t < s.length; t += 5)
                    for (let [e, o] of [
                      [s[t], s[t + 1]],
                      [s[t] + s[t + 2], s[t + 1] + s[t + 3]],
                    ])
                      ((n = Math.min(n, e - i)),
                        (a = Math.min(a, o - i)),
                        (r = Math.max(r, e + i)),
                        (l = Math.max(l, o + i)));
                  o = i;
                }
                if (
                  (t.ellipseMix > 0 &&
                    ((n = Math.min(n, -t.rx)),
                    (a = Math.min(a, -t.ry)),
                    (r = Math.max(r, t.rx)),
                    (l = Math.max(l, t.ry)),
                    (o = Math.min(o, t.rx, t.ry))),
                  !(r > n && l > a))
                )
                  return [];
                let h = Math.max(
                  Math.min(0.015, o / 3),
                  Math.max(r - n, l - a) / 400,
                );
                return (function (t, e, n) {
                  let a = {
                      field: t,
                      tolerance: n,
                      root: 0.001 * n.deviation,
                      reach: e.step * Math.hypot(e.nx, e.ny),
                    },
                    r = [];
                  for (let t of (function (t, e) {
                    let { field: n } = t,
                      { x0: a, y0: r, step: l, nx: o, ny: s } = e,
                      i = o + 1,
                      h = new Float64Array(i * (s + 1));
                    for (let t = 0; t <= s; t++)
                      for (let e = 0; e <= o; e++)
                        h[t * i + e] = n(a + e * l, r + t * l);
                    let u = 2 * i * (s + 1),
                      f = new Int32Array(u).fill(-1),
                      c = new Map(),
                      p = (e) => {
                        let n = c.get(e);
                        if (void 0 !== n) return n;
                        let o = e >> 1,
                          s = 1 & e ? o + i : o + 1,
                          u = a + (o % i) * l,
                          f = r + Math.floor(o / i) * l,
                          p = a + (s % i) * l,
                          d = r + Math.floor(s / i) * l,
                          M = nX(t, u, f, h[o], p, d, h[s]),
                          y = [u + (p - u) * M, f + (d - f) * M];
                        return (c.set(e, y), y);
                      },
                      d = [0, 0, 0, 0],
                      M = [0, 0, 0, 0],
                      y = [],
                      x = [];
                    for (let t = 0; t < s; t++)
                      for (let e = 0; e < o; e++) {
                        let o = t * i + e;
                        ((d[0] = o),
                          (d[1] = o + 1),
                          (d[2] = o + 1 + i),
                          (d[3] = o + i),
                          (M[0] = 2 * o),
                          (M[1] = 2 * (o + 1) + 1),
                          (M[2] = 2 * (o + i)),
                          (M[3] = 2 * o + 1),
                          (y.length = 0),
                          (x.length = 0));
                        for (let t = 0; t < 4; t++) {
                          let e = h[d[t]] < 0;
                          e !== h[d[(t + 1) & 3]] < 0 &&
                            (y.push(M[t]), x.push(e));
                        }
                        if (2 === y.length) {
                          let t = +!x[0];
                          f[y[t]] = y[1 - t];
                        } else if (4 === y.length) {
                          let o = 0 > n(a + (e + 0.5) * l, r + (t + 0.5) * l);
                          for (let t = 0; t < 4; t++)
                            x[t] && (f[y[t]] = y[(t + (o ? 1 : 3)) & 3]);
                        }
                      }
                    let m = [],
                      g = new Uint8Array(u);
                    for (let t = 0; t < u; t++) {
                      if (f[t] < 0 || g[t]) continue;
                      let e = [],
                        n = t;
                      for (; n >= 0 && !g[n];)
                        ((g[n] = 1), e.push(p(n)), (n = f[n]));
                      n === t && m.push(e);
                    }
                    return m;
                  })(a, e)) {
                    let e = (function (t, e) {
                      let n = t.length;
                      if (n < 4) return t;
                      let a = new Uint8Array(n),
                        r = 0,
                        l = -1;
                      for (let e = 1; e < n; e++) {
                        let n = nO(t[0], t[e]);
                        n > l && ((l = n), (r = e));
                      }
                      ((a[0] = 1), (a[r] = 1));
                      let o = (r, l) => {
                        if (l - r < 2) return;
                        let s = t[r],
                          i = t[l % n],
                          h = -1,
                          u = r;
                        for (let e = r + 1; e < l; e++) {
                          let n = (function (t, e, n) {
                            let a = n[0] - e[0],
                              r = n[1] - e[1],
                              l = t[0] - e[0],
                              o = t[1] - e[1],
                              s = a * a + r * r,
                              i =
                                s > 0
                                  ? Math.min(
                                      1,
                                      Math.max(0, (l * a + o * r) / s),
                                    )
                                  : 0,
                              h = l - a * i,
                              u = o - r * i;
                            return Math.sqrt(h * h + u * u);
                          })(t[e], s, i);
                          n > h && ((h = n), (u = e));
                        }
                        let f = h > e.deviation / 2;
                        (!f && Math.sqrt(nO(s, i)) <= e.edge) ||
                          (f || (u = (r + l) >> 1),
                          (a[u] = 1),
                          o(r, u),
                          o(u, l));
                      };
                      return (o(0, r), o(r, n), t.filter((t, e) => 1 === a[e]));
                    })(
                      (function (t, e) {
                        let n = [];
                        for (let a = 0; a < e.length; a++) {
                          let r = e[a],
                            l = e[(a + 1) % e.length];
                          (r[0] === l[0] && r[1] === l[1]) ||
                            (n.push(r),
                            (function t(e, n, a, r, l) {
                              let o = a[0] - n[0],
                                s = a[1] - n[1],
                                i = Math.sqrt(o * o + s * s);
                              if (0 === i || r >= 24 || l.length >= 2e4) return;
                              let h = (n[0] + a[0]) / 2,
                                u = (n[1] + a[1]) / 2,
                                f = e.field(h, u);
                              if (!Number.isFinite(f)) return;
                              let c = f > 0 ? 1 : -1,
                                p = (-s / i) * c,
                                d = (o / i) * c,
                                M = nU(e, h, u, f, p, d);
                              if (
                                null === M ||
                                (M <= e.tolerance.deviation / 2 &&
                                  i <= e.tolerance.edge)
                              )
                                return;
                              let y =
                                f > 0
                                  ? (function (t, e, n, a, r, l, o) {
                                      let s = [e + r * o, n + l * o],
                                        i = 0.001 * o,
                                        h =
                                          t.field(e + i, n) - t.field(e - i, n),
                                        u =
                                          t.field(e, n + i) - t.field(e, n - i),
                                        f = Math.sqrt(h * h + u * u);
                                      if (0 === f) return s;
                                      let c = h * l - u * r < 0 ? -1 : 1,
                                        p = (-u / f) * c,
                                        d = (h / f) * c;
                                      if (p * r + d * l < 0.2) return s;
                                      let M = nU(t, e, n, a, p, d);
                                      return null === M ||
                                        M * (p * r + d * l) <= o
                                        ? s
                                        : [e + p * M, n + d * M];
                                    })(e, h, u, f, p, d, M)
                                  : [h + p * M, u + d * M];
                              (t(e, n, y, r + 1, l),
                                l.push(y),
                                t(e, y, a, r + 1, l));
                            })(t, r, l, 0, n));
                        }
                        return n;
                      })(a, t),
                      n,
                    );
                    e.length >= 3 && r.push(e);
                  }
                  return r;
                })(
                  (e, n) =>
                    (function (t, e, n) {
                      let a =
                        (function (t, e, n) {
                          let a = 1e6;
                          for (let r = 0; r < t.length; r += 5) {
                            let l = e - t[r],
                              o = n - t[r + 1],
                              s = t[r + 2],
                              i = t[r + 3],
                              h = (l * s + o * i) * t[r + 4],
                              u = h < 0 ? 0 : h > 1 ? 1 : h,
                              f = l - s * u,
                              c = o - i * u,
                              p = f * f + c * c;
                            p < a && (a = p);
                          }
                          return Math.sqrt(a);
                        })(t.segments, e, n) - t.halfWidth;
                      if (0 === t.ellipseMix) return a;
                      let r = e / t.rx,
                        l = n / t.ry,
                        o =
                          (Math.sqrt(r * r + l * l) - 1) * Math.min(t.rx, t.ry);
                      return a * (1 - t.ellipseMix) + o * t.ellipseMix;
                    })(t, e, n),
                  {
                    x0: n - 2 * h,
                    y0: a - 2 * h,
                    step: h,
                    nx: Math.ceil((r - n) / h) + 4,
                    ny: Math.ceil((l - a) / h) + 4,
                  },
                  { deviation: e, edge: Math.sqrt(4 * e) },
                );
              })(
                (function (t) {
                  let e,
                    [n, a] = t.oval,
                    r =
                      n > 1e-5 && a > 1e-5
                        ? t.ovalMix > 1e-4
                          ? Math.min(1, t.ovalMix)
                          : (e = Math.min(
                              1,
                              Math.max(0, (Math.min(n, a) - 0) / 0.08),
                            )) *
                            e *
                            (3 - 2 * e)
                        : 0,
                    l = Math.max(0, t.pts.length - 1),
                    o = new Float64Array(5 * l);
                  for (let e = 0; e < l; e++) {
                    let [n, a] = t.pts[e],
                      r = t.pts[e + 1][0] - n,
                      l = t.pts[e + 1][1] - a,
                      s = r * r + l * l;
                    o.set([n, a, r, l, s > 0 ? 1 / s : 0], 5 * e);
                  }
                  return {
                    segments: o,
                    halfWidth: t.wid > 0 ? t.wid : -1,
                    rx: n,
                    ry: a,
                    ellipseMix: r,
                  };
                })(t),
                0.02 / 2 ** n,
              );
              if ((nJ.set(a, l), nJ.size > 512)) {
                let t = nJ.keys().next();
                !0 !== t.done && nJ.delete(t.value);
              }
              return l;
            })(t, r * Math.max(1, t.lidY));
            if (0 === l.length) return [];
            let o = D(a, e.M),
              s = D(a, e.C),
              i = D(a, e.T),
              h = Math.atan2(o[1], o[0]),
              u = Math.cos(t.tilt),
              f = Math.sin(t.tilt),
              [c, p] = t.off,
              d = ([e, n]) => {
                let a = n * t.lidY,
                  r = c + u * e + f * a,
                  l = p - f * e + u * a,
                  h = Math.sqrt(r * r + l * l),
                  d = h > 1e-12 ? Math.sin(h) / h : 1,
                  M = Math.cos(h);
                return [
                  M * o[0] + d * (r * s[0] + l * i[0]),
                  M * o[1] + d * (r * s[1] + l * i[1]),
                  M * o[2] + d * (r * s[2] + l * i[2]),
                ];
              },
              M = [];
            for (let t of l) {
              let e = t.map(d);
              n && e.reverse();
              let a = (function (t, e) {
                let n = t.length,
                  a = -1;
                for (let e = 0; e < n && a < 0; e++)
                  t[e][2] <= 0 && t[(e + 1) % n][2] > 0 && (a = e);
                if (a < 0)
                  return 0 === n || t[0][2] <= 0
                    ? null
                    : t.map(([t, e]) => ({ kind: "line", to: [t, e] }));
                let r = [],
                  l = [1, 0],
                  o = null;
                for (let s = 0; s < n; s++) {
                  let i = t[(a + s) % n],
                    h = t[(a + s + 1) % n],
                    u = i[2] > 0,
                    f = h[2] > 0;
                  if (u && f) r.push({ kind: "line", to: [h[0], h[1]] });
                  else if (u) ((o = nj(i, h)), r.push({ kind: "line", to: o }));
                  else if (f) {
                    let t = nj(i, h);
                    (null === o ? (l = t) : r.push(nD(o, t, e)),
                      r.push({ kind: "line", to: [h[0], h[1]] }));
                  }
                }
                return (null !== o && r.push(nD(o, l, e)), r);
              })(e, h);
              null !== a && M.push(a);
            }
            return M;
          })(t, J[o], nQ[o], n, e)) {
            let t = r
              ? (function (t, e) {
                  let n = (function (t, e) {
                      let n = 1 / (e[0] * e[0]),
                        a = 1 / (e[1] * e[1]),
                        r = (t) => n * t[0] * t[0] + a * t[1] * t[1] - 1,
                        l = [],
                        o = t[t.length - 1].to;
                      for (let e of t) {
                        if ("line" === e.kind) {
                          let t = (function (t, e, n, a) {
                              let r = e[0] - t[0],
                                l = e[1] - t[1],
                                o = n * r * r + a * l * l,
                                s = n * t[0] * r + a * t[1] * l,
                                i = n * t[0] * t[0] + a * t[1] * t[1] - 1,
                                h = s * s - o * i;
                              if (0 === o || h <= 0) return [];
                              let u = Math.sqrt(h),
                                f = -(s + (s < 0 ? -u : u));
                              return [f / o, i / f]
                                .filter((t) => t > 0 && t < 1)
                                .sort((t, e) => t - e);
                            })(o, e.to, n, a),
                            s = o;
                          for (let n = 0; n <= t.length; n++) {
                            let a = 0 === n ? 0 : t[n - 1],
                              i = n === t.length ? 1 : t[n],
                              h = n === t.length ? e.to : nZ(o, e.to, i);
                            (l.push({
                              from: s,
                              segment: { kind: "line", to: h },
                              sweep: Math.atan2(
                                s[0] * h[1] - s[1] * h[0],
                                s[0] * h[0] + s[1] * h[1],
                              ),
                              isInside: 0 > r(nZ(o, e.to, (a + i) / 2)),
                            }),
                              (s = h));
                          }
                        } else {
                          let t = e.radii[0],
                            s = Math.atan2(o[1], o[0]),
                            i = (function (t, e, n, a, r) {
                              if (a === r || 0 === n) return [];
                              let l = (1 / (t * t) - r) / (a - r);
                              if (!(l > 0 && l < 1)) return [];
                              let o = Math.acos(Math.sqrt(l)),
                                s = [];
                              for (let t of [o, -o, Math.PI - o, Math.PI + o]) {
                                let a =
                                  (n > 0 ? nG(t - e) : nG(e - t)) / Math.abs(n);
                                a > 0 && a < 1 && s.push(a);
                              }
                              return s.sort((t, e) => t - e);
                            })(t, s, e.sweep, n, a),
                            h = o;
                          for (let n = 0; n <= i.length; n++) {
                            let a = 0 === n ? 0 : i[n - 1],
                              o = n === i.length ? 1 : i[n],
                              u = s + e.sweep * o,
                              f =
                                n === i.length
                                  ? e.to
                                  : [t * Math.cos(u), t * Math.sin(u)],
                              c = s + (e.sweep * (a + o)) / 2,
                              p = e.sweep * (o - a);
                            (l.push({
                              from: h,
                              segment: {
                                kind: "arc",
                                to: f,
                                radii: e.radii,
                                sweep: p,
                              },
                              sweep: p,
                              isInside:
                                0 > r([t * Math.cos(c), t * Math.sin(c)]),
                            }),
                              (h = f));
                          }
                        }
                        o = e.to;
                      }
                      return l;
                    })(t, e),
                    a = n.length;
                  if (n.every((t) => t.isInside)) return t;
                  let r = -1;
                  for (let t = 0; t < a && r < 0; t++)
                    n[t].isInside && !n[(t + a - 1) % a].isInside && (r = t);
                  if (r < 0) {
                    let t = n.reduce((t, e) => t + e.sweep, 0);
                    return Math.abs(t) > Math.PI ? nN(e, Math.sign(t)) : null;
                  }
                  let l = [],
                    o = null,
                    s = 0;
                  for (let t = 0; t < a; t++) {
                    let i = n[(r + t) % a];
                    i.isInside
                      ? (null !== o &&
                          l.push({
                            kind: "arc",
                            to: i.from,
                            radii: e,
                            sweep: s,
                          }),
                        (o = null),
                        l.push(i.segment))
                      : (null === o && ((o = i.from), (s = 0)), (s += i.sweep));
                  }
                  return (
                    null !== o &&
                      l.push({
                        kind: "arc",
                        to: n[r].from,
                        radii: e,
                        sweep: s,
                      }),
                    l
                  );
                })(s, a)
              : s;
            null !== t && l.push(t);
          }
        }),
        l
      );
    }
    function n0(t, e, n) {
      let a = t[t.length - 1].to,
        r = `M${e(a)}`;
      for (let l of t)
        ((r +=
          "line" === l.kind
            ? `L${e(l.to)}`
            : (function t(e, n, a, r) {
                if (0 === n.sweep) return "";
                if (Math.abs(n.sweep) > nK) {
                  let l = n.sweep / 2,
                    o = nW(n.radii, Math.atan2(e[1], e[0]) + l);
                  return (
                    t(e, { ...n, to: o, sweep: l }, a, r) +
                    t(o, { ...n, sweep: l }, a, r)
                  );
                }
                return `A${n9(n.radii[0] * r)} ${n9(n.radii[1] * r)} 0 0 ${n.sweep > 0 ? 0 : 1} ${a(n.to)}`;
              })(a, l, e, n)),
          (a = l.to));
      return `${r}Z`;
    }
    function n2(t, e, n) {
      let a = (e) => [
          t.center[0] + t.a[0] * Math.cos(e) + t.b[0] * Math.sin(e),
          t.center[1] + t.a[1] * Math.cos(e) + t.b[1] * Math.sin(e),
        ],
        r = 0.5 * Math.atan2(2 * n5(t.a, t.b), n5(t.a, t.a) - n5(t.b, t.b)),
        [l, o] = [Math.cos(r), Math.sin(r)],
        s = [t.a[0] * l + t.b[0] * o, t.a[1] * l + t.b[1] * o],
        i = [t.b[0] * l - t.a[0] * o, t.b[1] * l - t.a[1] * o],
        h = `${n9(Math.hypot(s[0], s[1]) * Math.abs(n))} ${n9(Math.hypot(i[0], i[1]) * Math.abs(n))}`,
        u =
          Math.round(Math.atan2(-s[1] * n, s[0] * n) * (180 / Math.PI) * 1e3) /
          1e3,
        f = t.a[0] * t.b[1] - t.a[1] * t.b[0] > 0 ? 0 : 1,
        c = Math.ceil((t.to - t.from) / nK),
        p = `M${e(a(t.from))}`;
      for (let n = 1; n <= c; n++)
        p += `A${h} ${u} 0 ${f} ${e(a(t.from + ((t.to - t.from) * n) / c))}`;
      return p;
    }
    function n4(t, e, n) {
      return [
        t[0] + (e[0] - t[0]) * n,
        t[1] + (e[1] - t[1]) * n,
        t[2] + (e[2] - t[2]) * n,
      ];
    }
    function n5(t, e) {
      return t[0] * e[0] + t[1] * e[1];
    }
    function n6(t, e, n) {
      return `matrix(${n9(t[0] * n)} 0 0 ${n9(t[1] * n)} ${e([0, 0])})`;
    }
    function n3(t, e) {
      let n = e.stops
        .map(
          (t) =>
            `<stop offset="${t.offset}" stop-color="${t.color}" stop-opacity="${t.opacity}"/>`,
        )
        .join("");
      return `<radialGradient id="${t}" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" fx="${e.focus}" fy="0" gradientTransform="${e.transform}">${n}</radialGradient>`;
    }
    function n7(t, e, n) {
      let a = Math.min(1, Math.max(0, (n - t) / (e - t)));
      return a * a * (3 - 2 * a);
    }
    function n9(t) {
      return String(Math.round(100 * t) / 100);
    }
    let n8 = 2 * Math.PI,
      at = {
        dots: 22,
        orbit: 19,
        radar: 19,
        progress: 19,
        gather: 19,
        wave: 16,
        send: 20,
        receive: 20,
        dock: 20,
        ball: 18,
        pencil: 17,
        bang: 13,
        standby: 13,
      },
      ae = {
        dots: 1.5,
        orbit: 1.14,
        radar: 1.14,
        progress: 1.32,
        gather: 1.15,
        wave: 1.42,
        send: 1.12,
        receive: 1.12,
        dock: 1.3,
        ball: 1.22,
        pencil: 1.18,
        bang: 1.28,
        standby: 1.75,
      },
      an = 2500 * 0.68,
      aa = 1e3 * tB("progress"),
      ar = 1e3 * tB("spawning"),
      al = [-2, -1, 1, 2],
      ao = (t) => ((t % 1) + 1) % 1,
      as = Array.from({ length: 96 }, (t, e) => {
        let n = (e / 96) * n8;
        return [
          114.2705 + 114.2705 * Math.cos(n),
          114.2705 + 114.2705 * Math.sin(n),
        ];
      }),
      ai = e_(88, 18).ring,
      ah =
        ((m = ai.length / 2),
        (r = Math.cos((a = (m / (n = ai.length)) * Math.PI * 2))),
        (l = Math.sin(a)),
        Array.from({ length: n }, (t, e) => {
          let [a, o] = ai[(((e - m) % n) + n) % n],
            s = a - 114.2705,
            i = o - 114.2705;
          return [114.2705 + s * r - i * l, 114.2705 + s * l + i * r];
        })),
      au = (t) => ("pencil" === t ? ah : as),
      af =
        ((o = 85.2705),
        (s = 143.2705),
        `M${99.2705} ${o}A15 15 0 0 1 ${129.2705} ${o}L${129.2705} ${s}A15 15 0 0 1 ${99.2705} ${s}Z`),
      ac = `M${99.2705} ${81.2705}A15 15 0 0 1 ${129.2705} ${81.2705}L${122.7705} ${153.7705}A8.5 8.5 0 0 1 ${105.7705} ${153.7705}Z`,
      ap = (t, e, n, a, r) => ({
        type: "disc",
        key: t,
        cx: e,
        cy: n,
        r: a,
        opacity: r,
      }),
      ad = (t, e, n, a) => ({
        type: "ring",
        key: t,
        cx: 114.2705,
        cy: 114.2705,
        r: e,
        width: n,
        opacity: a,
      }),
      aM = (t, e, n, a) => ({
        type: "shape",
        key: t,
        d: e,
        transform: n,
        opacity: a,
      }),
      ay = { lift: 0, pop: 1, tone: 1 },
      ax = (t, e, n, a) => {
        let r = Math.abs(ao((1e3 * t.stateTime) / 1400 + 0.119) - e / 3),
          l = Math.min(r, 1 - r),
          o = a ? 1 : Math.exp(-(l * l) / 0.045),
          s = +!a;
        return {
          lift: 9 * o * n * s,
          pop: 1 + s * (0.84 + 0.22 * o - 1),
          tone: 1 - 0.5 * s * (1 - o),
        };
      },
      am = (t, e) =>
        (0.42 +
          0.29 * Math.sin(0.0021 * t) * Math.sin(0.0034 * t) +
          0.29 * Math.sin(0.0013 * t + 1.7)) *
        (0.55 + 0.45 * Math.sin(0.012 * t - 1.05 * Math.abs(e))),
      ag = (t) => {
        let e = ao(t / 2500);
        if (e < 0.68) {
          let n = e / 0.68,
            a = A(n / 0.08, 0, 1) * A((1 - n) / 0.08, 0, 1);
          return {
            x: -54 + n * n * (3 - 2 * n) * 118,
            y: 26,
            wig: 3.2 * Math.sin(24 * n) * a,
            rot: 17 + +Math.sin(6e-4 * t),
          };
        }
        let n = I((e - 0.68) / 0.31999999999999995);
        return {
          x: 64 - 118 * n,
          y: 26 - 20 * Math.sin(n * Math.PI),
          wig: 0,
          rot: 17 - 2 * Math.sin(n * Math.PI) + +Math.sin(6e-4 * t),
        };
      },
      av = (t) => {
        let e = ag(t);
        return [114.2705 + e.x, 114.2705 + e.y + e.wig + 19];
      },
      ab = (() => {
        let t = [];
        for (let e = 0; e < an; e++) {
          let n = av(e),
            a = t[t.length - 1];
          (void 0 === a ||
            Math.hypot(n[0] - a.point[0], n[1] - a.point[1]) > 2.4) &&
            t.push({ at: e, point: n });
        }
        return t;
      })(),
      aw = (t, e, n, a, r) => {
        switch (t) {
          case "dots":
            return ((t, e, n) => {
              let a = [52.2705, 176.2705],
                r = [];
              for (let l = 0; l < 2; l++) {
                let o = A((t - 0.12 * l) / (1 - 0.12 * l), 0, 1);
                if (o <= 0.004) continue;
                let s = P(o),
                  i = z(o),
                  h = ax(e, 2 * (0 !== l), t, n);
                r.push(
                  ap(
                    `dots.${l}`,
                    114.2705 + (a[l] - 114.2705) * i,
                    114.2705 - h.lift,
                    22 * s * h.pop * 1.02,
                    s * h.tone,
                  ),
                );
              }
              return r;
            })(e, n, r);
          case "orbit":
            let l, o, s;
            return (
              (l = P(e)),
              (o = 52 * z(e)),
              (s = 1e3 * n.stateTime * 0.0017),
              Array.from({ length: 5 }, (t, e) => {
                let n = s + (e * Math.PI * 2) / 5,
                  a = Math.cos(n);
                return ap(
                  `orbit.${e}`,
                  114.2705 + o * Math.sin(n),
                  114.2705 - 0.42 * o * Math.cos(n),
                  Math.max(12 * (0.5 + 0.5 * A(a, 0, 1)) * l, 0.3),
                  A((a + 0.4) / 0.6, 0.18, 1) * l,
                );
              })
            );
          case "radar":
            let i;
            return (
              (i = P(e)),
              Array.from({ length: 3 }, (t, e) => {
                let r = ao((1e3 * n.stateTime) / 1300 + e / 3);
                return ad(
                  `radar.${e}`,
                  a + (104 - a) * r,
                  3.4 * (1 - 0.55 * r),
                  i * (1 - r) * 0.9,
                );
              })
            );
          case "progress":
            let h, u, f, c, p;
            return (
              (h = P(e)),
              (u = 62 * z(e)),
              (f = A((1e3 * n.shotTime) / aa, 0, 1)),
              (c = A(f / 0.85, 0, 1)),
              (p = ad("progress.track", u, 5, 0.16 * h)),
              c <= 0
                ? [p]
                : [
                    p,
                    {
                      type: "ring",
                      key: "progress.arc",
                      cx: 114.2705,
                      cy: 114.2705,
                      r: u,
                      width: 5,
                      opacity: h,
                      arc: { fraction: c, startDeg: -90 },
                    },
                  ]
            );
          case "gather":
            return ((t, e) => {
              let n = P(t),
                a = [];
              for (let t = 0; t < 5; t++) {
                let r = A(((1e3 * e.shotTime) / ar - 0.09 * t) / 0.62, 0, 1);
                if (r >= 1) continue;
                let l = 1 - Math.pow(1 - r, 3),
                  o = 2.4 * t + 2.2 * r,
                  s = 96 * (1 - l);
                a.push(
                  ap(
                    `gather.${t}`,
                    114.2705 + s * Math.cos(o),
                    114.2705 + s * Math.sin(o) * 0.8,
                    9 * (0.5 + 0.5 * l) * n,
                    n * A(5 * r, 0, 1) * (1 - 0.25 * l),
                  ),
                );
              }
              return a;
            })(e, n);
          case "wave":
            return ((t, e) => {
              let n = 1e3 * e.stateTime,
                a = [];
              for (let e of al) {
                let r = A(
                  (t - 0.1 * Math.abs(e)) / (1 - 0.1 * Math.abs(e)),
                  0,
                  1,
                );
                if (r <= 0.004) continue;
                let l = z(r),
                  o = am(n, e),
                  s = (7 + 9 * A(o, 0.08, 1)) * P(r),
                  i = 6 * A(o, 0, 1) * r;
                a.push(
                  ap(`wave.${e}`, 114.2705 + 44 * e * l, 114.2705 - i, s, r),
                );
              }
              return a;
            })(e, n);
          case "send":
            return ((t, e) => {
              let n = P(t),
                a = ao((1e3 * e.stateTime) / 1500),
                r = A((a - 0.18) / 0.55, 0, 1),
                l = r * r * (0.4 + 0.6 * r),
                o = [];
              if (r > 0 && r < 1) {
                let t = 108 * l;
                o.push(
                  ap(
                    "send.packet",
                    114.2705 + 0.74 * t,
                    114.2705 + -0.62 * t,
                    10 * (1 - 0.55 * l) * n,
                    n * (1 - l * l),
                  ),
                );
              }
              let s = A((a - 0.26) / 0.55, 0, 1),
                i = s * s * (0.4 + 0.6 * s);
              if (r > 0 && s > 0 && s < 1) {
                let t = 108 * i;
                o.push(
                  ap(
                    "send.streak",
                    114.2705 + 0.74 * t,
                    114.2705 + -0.62 * t,
                    5 * (1 - 0.6 * i) * n,
                    0.3 * n * (1 - i),
                  ),
                );
              }
              let h = A((a - 0.18) / 0.3, 0, 1);
              return (
                h > 0 &&
                  h < 1 &&
                  o.push(
                    ad(
                      "send.launch",
                      20 + 34 * P(h),
                      2.8 * (1 - h),
                      n * (1 - h) * 0.8,
                    ),
                  ),
                o
              );
            })(e, n);
          case "receive":
            return ((t, e) => {
              let n = P(t),
                a = 1e3 * e.stateTime,
                r =
                  -(1.25 * Math.PI) +
                  tF(Math.floor(a / 1700))() * Math.PI * 1.5,
                l = ao(a / 1700),
                o = A(l / 0.6, 0, 1),
                s = 1 - Math.pow(1 - o, 3),
                i = Math.cos(r),
                h = Math.sin(r),
                u = 108 * (1 - s),
                f = [];
              if (o < 1) {
                let t = 18 * Math.sin(o * Math.PI) * (1 - 0.7 * s);
                f.push(
                  ap(
                    "receive.packet",
                    114.2705 + i * u - h * t,
                    114.2705 + h * u + i * t,
                    3.5 + 6.5 * s,
                    n * A(3.5 * o, 0, 1) * (0.3 + 0.7 * s),
                  ),
                );
              }
              let c = A((l - 0.58) / 0.32, 0, 1);
              return (
                c > 0 &&
                  c < 1 &&
                  f.push(
                    ad(
                      "receive.absorb",
                      20 + 26 * P(c),
                      2.8 * (1 - c),
                      n * (1 - c) * 0.8,
                    ),
                  ),
                f
              );
            })(e, n);
          case "dock":
            return ((t, e) => {
              let n = P(t),
                a = 1e3 * e.stateTime,
                r = [];
              for (let t = 0; t < 2; t++) {
                let l = A((e.stateTime - (0.2 + 1.3 * t)) / 0.9, 0, 1);
                if (l <= 0) continue;
                let o = 1 - Math.pow(1 - l, 3),
                  s = 0.001 * a * 1.1 + t * Math.PI,
                  i = 114.2705 + 42 * Math.sin(s),
                  h = 114.2705 + 21 * Math.cos(s) + 2 * Math.sin(0.003 * a + t),
                  u = 114.2705 - 120 + 30 * t;
                r.push(
                  ap(
                    `dock.${t}`,
                    u + (i - u) * o,
                    209.2705 + (h - 209.2705) * o,
                    (7 + 3 * o) * n,
                    n * A(4 * l, 0, 1),
                  ),
                );
              }
              return r;
            })(e, n);
          case "ball":
            return [];
          case "pencil":
            var d;
            let M, y, x, m, g, v, b, w, k, $, C, I, q, _, F;
            return (
              (d = e),
              ($ =
                68 *
                Math.cos(
                  (k =
                    (((w = ag((b = 1e3 * n.stateTime))).rot - 90) * Math.PI) /
                    180),
                )),
              (C = 68 * Math.sin(k)),
              (I = 114.2705 + (w.x + $) * d),
              (q = 114.2705 + (w.y + 0.15 * w.wig + C) * d),
              (_ = [
                aM(
                  "pencil.shaft",
                  af,
                  `translate(${I.toFixed(1)} ${q.toFixed(1)}) rotate(${(w.rot * d).toFixed(1)}) scale(${P(d).toFixed(3)}) translate(-114.2705 -114.2705)`,
                  A(1.6 * d - 0.3, 0, 1),
                ),
              ]),
              (F =
                ((y = Math.min((M = 2500 * ao(b / 2500)), an)),
                (m =
                  (x = ab.filter((t) => t.at <= y)).length > 0
                    ? x[x.length - 1].at
                    : y),
                (g = y > m ? [av(y)] : []),
                (v = [...x.map((t) => t.point), ...g].slice(-64)),
                M < an ? v : v.slice(Math.floor(((M - an) / 1e3) * 120))))
                .length >= 2 &&
                _.push({
                  type: "stroke",
                  key: "pencil.ink",
                  d: ((t) => {
                    let e = t.length,
                      n = `M${t[0][0].toFixed(1)} ${t[0][1].toFixed(1)}`;
                    if (2 === e)
                      return n + `L${t[1][0].toFixed(1)} ${t[1][1].toFixed(1)}`;
                    for (let a = 0; a < e - 1; a++) {
                      let r = t[Math.max(a - 1, 0)],
                        l = t[a],
                        o = t[a + 1],
                        s = t[Math.min(a + 2, e - 1)],
                        i = l[0] + (o[0] - r[0]) / 6,
                        h = l[1] + (o[1] - r[1]) / 6,
                        u = o[0] - (s[0] - l[0]) / 6,
                        f = o[1] - (s[1] - l[1]) / 6;
                      n += `C${i.toFixed(1)} ${h.toFixed(1)} ${u.toFixed(1)} ${f.toFixed(1)} ${o[0].toFixed(1)} ${o[1].toFixed(1)}`;
                    }
                    return n;
                  })(F),
                  width: 6,
                  opacity: A(1.2 * d, 0, 1),
                }),
              _
            );
          case "bang":
            let B, Y, R, L;
            return (
              (B = n.stateTime),
              (Y = P(A(1.1 * e, 0, 1))),
              (R = Math.exp(-((B % 2.2) * 5.5))),
              (L = 2.2 * Math.sin(42 * B) * R),
              [
                aM(
                  "bang.bar",
                  ac,
                  `translate(0 ${(-26 - (1 - Y) * 70).toFixed(1)}) rotate(${L.toFixed(2)} 114.2705 40.3) translate(114.2705 114.2705) scale(${A(1.2 * e, 0, 1).toFixed(3)}) translate(-114.2705 -114.2705)`,
                  A(1.5 * e - 0.2, 0, 1),
                ),
              ]
            );
          case "standby":
            let T;
            return [
              ap(
                "standby.halo",
                114.2705,
                114.2705,
                26 + 7 * (T = 0.5 + 0.5 * Math.sin(1e3 * n.stateTime * 0.0016)),
                P(e) * (0.06 + 0.1 * T),
              ),
            ];
        }
      },
      ak = Array.from({ length: 192 }, (t, e) => (e / 192) * nB),
      a$ = Array.from({ length: 96 }, (t, e) => e / 96);
    function aC(t, e = 2) {
      let n = 10 ** e;
      return String(Math.round(t * n) / n);
    }
    let aA = new WeakMap();
    function aI(t, e) {
      return {
        display: "inline-block",
        position: "relative",
        flexShrink: 0,
        width: t,
        height: t,
        lineHeight: 0,
        ...e,
      };
    }
    function aP(t) {
      let e = `${(t / 0.6) * 100}%`;
      return {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: e,
        height: e,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      };
    }

export const createMotion = (function (t = {}) {
          let e,
            n,
            a,
            r,
            l,
            o,
            s,
            i,
            h,
            u,
            f,
            c = Math.min(3, Math.max(0.2, t.zoomMul || 1)),
            p =
              ((e = "neutral"),
              (n = th(ts.neutral, tu)),
              (a = 0),
              (r = null),
              (l = () => {
                if (null == r) return n;
                if ("blink" === r.kind) return r.from;
                if ("morph" === r.kind) {
                  let t = Math.max(0, Math.min(1, tw(r))),
                    { from: e, to: n, path: a } = r;
                  return "oval" === a
                    ? th(e, (e, a) =>
                        (function (t, e, n) {
                          if (n <= 1e-4) return tu(t);
                          if (n >= 0.995) return tu(e);
                          let a = tM(t),
                            r = tM(e),
                            l = ty(a, r),
                            o = tf(e),
                            s = a.ang + l * n,
                            i = Math.max(
                              a.halfLen + (r.halfLen - a.halfLen) * n,
                              1e-4,
                            ),
                            h = Math.max(
                              a.halfW + (r.halfW - a.halfW) * n,
                              1e-4,
                            ),
                            u = +!!tf(t),
                            f =
                              u +
                              (!!o - u) * (o ? 1 - (1 - n) ** 3 : n * n * n),
                            c = tx(2 * h, 2 * i, s, [
                              a.cx + (r.cx - a.cx) * n,
                              a.cy + (r.cy - a.cy) * n,
                            ]),
                            p = f > 1e-4;
                          return {
                            ...c,
                            oval: p ? [h, i] : c.oval,
                            ovalMix: p ? f : 0,
                            fillRing: (function (t, e, n) {
                              let a = Math.max(0, t - e),
                                r = Math.max(0, Math.min(1, n)),
                                l = [];
                              for (let n = 0; n < 48; n++) {
                                let o,
                                  s = (n / 48) * Math.PI * 2,
                                  i = Math.cos(s),
                                  h = Math.sin(s),
                                  u = e * i,
                                  f = t * h,
                                  c = e / Math.max(Math.abs(i), 1e-6);
                                if (
                                  c * Math.abs(h) <= a + 1e-6 &&
                                  Number.isFinite(c)
                                )
                                  o = c;
                                else {
                                  let t = (h >= 0 ? 1 : -1) * a * h,
                                    n = Math.max(0, t * t - a * a + e * e);
                                  o = t + Math.sqrt(n);
                                }
                                let p = o * i,
                                  d = o * h;
                                l.push([p + (u - p) * r, d + (f - d) * r]);
                              }
                              return l;
                            })(i, h, f),
                          };
                        })(e, n[a], t),
                      )
                    : "spine" === a
                      ? th(e, (e, a) =>
                          (function (t, e, n) {
                            var a, r, l;
                            let o = {
                              off: tp(t.off, e.off, n),
                              tilt: ((a = t.tilt), a + (e.tilt - a) * n),
                              wid: ((r = t.wid), r + (e.wid - r) * n),
                              lidY: ((l = t.lidY), l + (e.lidY - l) * n),
                              oval: tp(t.oval, e.oval, n),
                              ovalMix: 0,
                              fillRing: null,
                            };
                            if (
                              t.path &&
                              e.path &&
                              t.path.length === e.path.length
                            ) {
                              let a = e.path,
                                r = t.path.map((t, e) => t + (a[e] - t) * n);
                              return { ...o, path: r, pts: ta(r) };
                            }
                            let s = Math.max(t.pts.length, e.pts.length, 2),
                              i = [];
                            for (let a = 0; a < s; a++)
                              i.push(tp(td(t.pts, a, s), td(e.pts, a, s), n));
                            return { ...o, path: null, pts: i };
                          })(e, n[a], t),
                        )
                      : th(e, (e, a) =>
                          (function (t, e, n) {
                            if (n >= 0.9999) return tu(e);
                            let a = tM(t),
                              r = tM(e),
                              l = a.ang + ty(a, r) * n,
                              o = Math.max(
                                1e-4,
                                a.halfW + (r.halfW - a.halfW) * n,
                              );
                            return tl(
                              2 * o,
                              2 *
                                (Math.max(0, a.halfLen - a.halfW) * (1 - n) +
                                  Math.max(0, r.halfLen - r.halfW) * n +
                                  o),
                              (180 * l) / Math.PI,
                              [
                                a.cx + (r.cx - a.cx) * n,
                                a.cy + (r.cy - a.cy) * n,
                              ],
                              0,
                            );
                          })(e, n[a], t),
                        );
                }
                let t = Math.min(r.t / r.dur, 1),
                  { u1: e, u2: a } = T(!1, r.dur);
                if (t < e) return th(r.from, (n) => tv(n, L(t / e)));
                if (t <= a) return th(r.to, tg);
                let l = (function (t) {
                  let e = Math.min(1, Math.max(0, t));
                  if (e < 0.7) {
                    let t = e / 0.7;
                    return (1 - (1 - t) * (1 - t)) * 1.06;
                  }
                  return 1.06 + -0.06000000000000005 * L((e - 0.7) / 0.3);
                })((t - a) / Math.max(1e-6, 1 - a));
                return th(r.to, (t) => tv(t, 1 - l));
              }),
              (o = () => {
                if (null == r) return a;
                if ("blink" === r.kind) return r.fromInspect;
                let t = r.fromInspect,
                  e = tb(r.toName);
                if ("morph" === r.kind) return t + (e - t) * tw(r);
                let n = Math.min(r.t / r.dur, 1),
                  { u1: l, u2: o } = T(!1, r.dur);
                return n <= l ? t : n < o ? 0 : e;
              }),
              (s = (t) => {
                let n = th(l(), tu),
                  a = ts[t],
                  s =
                    n.some(tc) ||
                    a.some(tc) ||
                    "sleepy" === e ||
                    "sleepy" === t;
                ((r = {
                  kind: "morph",
                  path:
                    !(n.some(tc) || a.some(tc)) && (n.some(tf) || a.some(tf))
                      ? "oval"
                      : s
                        ? "spine"
                        : "stadium",
                  fromInspect: o(),
                  toName: t,
                  from: n,
                  to: a,
                  t: 0,
                  dur: 0.28,
                  isHeld: !1,
                }),
                  (e = t));
              }),
              (i = (t) => {
                ((r = {
                  kind: "lidMorph",
                  fromInspect: o(),
                  toName: t,
                  from: th(l(), tu),
                  to: ts[t],
                  t: 0,
                  dur: 0.35,
                  isHeld: !1,
                }),
                  (e = t));
              }),
              (h = (t) => {
                (t.name === e && (null == r || r.toName === t.name)) ||
                  (!t.isThroughBlink || ti(t.name) || ti(e)
                    ? s(t.name)
                    : i(t.name));
              }),
              (u = (t, e) => {
                e >= t.dur
                  ? ((n = th(t.to, tu)), (a = tb(t.toName)), (r = null))
                  : (r = e < 0 ? null : { ...t, t: e });
              }),
              (f = (t) => {
                null != r && (r = { ...r, isHeld: t });
              }),
              {
                get name() {
                  return e;
                },
                get isMorphing() {
                  return null != r && "blink" !== r.kind && !r.isHeld;
                },
                eyes: l,
                inspectWeight: o,
                blinkAmount: () =>
                  r?.kind !== "blink" || r.isHeld
                    ? null
                    : Math.min(
                        1,
                        Math.max(
                          0,
                          (function (t, { u1: e, u2: n }) {
                            return t < e
                              ? L(t / e)
                              : t <= n
                                ? 1
                                : 1 - L((t - n) / Math.max(1e-6, 1 - n));
                          })(Math.min(r.t / r.dur, 1), T(!0, r.dur)),
                        ),
                      ),
                morph: s,
                lidMorph: i,
                blink: () => {
                  (null == r || r.isHeld) &&
                    (r = {
                      kind: "blink",
                      fromInspect: a,
                      toName: e,
                      from: th(n, tu),
                      to: ts[e],
                      t: 0,
                      dur: 0.26,
                      isHeld: !1,
                    });
                },
                play: h,
                step(t) {
                  null == r || r.isHeld || u(r, r.t + t);
                },
                release() {
                  f(!1);
                },
                seek(t, l) {
                  ((e = "neutral"),
                    (n = th(ts.neutral, tu)),
                    (a = 0),
                    (r = null));
                  let o = 0,
                    s = (t) => {
                      null != r && u(r, t - o);
                    };
                  for (let e of t) {
                    if (e.t > l + 1e-9) break;
                    (s(e.t), h(e), (o = e.t));
                  }
                  (s(l), f(!0));
                },
              }),
            d = t.body ?? "sphere",
            M = void 0 !== t.body,
            y = [],
            x = w(1),
            m = (function (t = {}) {
              let e = t.isReducedMotion ?? !1,
                n = tF(t.seed ?? 0x9e3779b9),
                a = w(0),
                r = w(1),
                l = w(0),
                o = null,
                s = null,
                i = null,
                h = null,
                u = !1,
                f = 0,
                c = 0,
                p = 1,
                d = !1,
                M = 0,
                y = 0,
                x = 0,
                m = 0,
                g = 0,
                v = () => {
                  let t = null == o ? null : tP[o],
                    v = x;
                  o !== s && ((s = o), null != o && ((x = M), (u = !1)));
                  let b = null != t;
                  (null != o &&
                    tq.has(o) &&
                    (!u && M - x > tB(o)
                      ? ((u = !0), (f = M))
                      : u && M - f > 1.5 && ((u = !1), (x = M)),
                    (b = !u)),
                    (a.t = +!!b),
                    null != t &&
                      t !== i &&
                      (null != i && a.x > 0.02
                        ? ((h = i), (m = y), (g = v), (r.x = +!!e))
                        : ((h = null), (r.x = 1)),
                      (r.v = 0),
                      (r.t = 1),
                      (i = t),
                      (y = M)),
                    null == t && a.x < 0.004 && ((i = null), (h = null)),
                    r.x > 0.996 && (h = null),
                    b !== d &&
                      (b && !e && (p = 0.5 > n() ? 1 : -1),
                      e || (l.t = c += tz * p),
                      (d = b)));
                };
              return {
                get target() {
                  return o;
                },
                set(t) {
                  o = t;
                },
                advance(t) {
                  let n = t > 0 ? Math.min(t, 0.1) : 0;
                  ((M += n), v());
                  let o = C(n),
                    s = n / o;
                  for (let t = 0; t < o; t++)
                    (k(a, 14, 1, s), k(r, 11, 1, s), k(l, 14, 1, s));
                  e && ((r.x = 1), (l.x = l.t), (a.x = a.t));
                },
                settle() {
                  for (let t of (v(), [a, r, l])) ((t.x = t.t), (t.v = 0));
                  v();
                },
                snapshot: () => ({
                  amount: A(a.x, 0, 1),
                  spin: l.x,
                  kind: i,
                  outgoing: h,
                  swap: A(r.x, 0, 1),
                  clock: { stateTime: M - y, shotTime: M - x },
                  outgoingClock: { stateTime: M - m, shotTime: M - g },
                  isReducedMotion: e,
                  isSettled:
                    0.001 > Math.abs(a.x - a.t) &&
                    0.01 > Math.abs(l.t - l.x) &&
                    r.x > 0.996,
                }),
              };
            })(),
            g = null,
            v = tT,
            b = [0, 0],
            $ = [1, 1],
            P = 0,
            z = 0.6 * c,
            _ = { bias: -1, isFollowingTurn: !0 },
            F = null,
            B = {
              isHeld: !1,
              isAlways: t.isGazeAlways ?? !1,
              x: 0,
              y: 0,
              cx: 0,
              cy: 0,
              hold: 0,
            },
            Y = tE,
            W = 0,
            j = !1,
            D = !0,
            Z = !1,
            H = null,
            G = null,
            X = null,
            U = 0,
            O = 0,
            J = null,
            tt = null,
            te = !1,
            tn = [],
            tr = () => {
              let t = tW(Y.position, W);
              b = t ? [t[0], t[1]] : [0, 0];
              let e = tW(Y.rotation, W);
              v = e ? [e[0], e[1], e[2]] : [0, 0, 0];
              let n = tW(Y.squash, W);
              $ = n ? [n[0], n[1]] : [1, 1];
              let a = tW(Y.zoom, W);
              a && (z = Math.min(2.5, Math.max(0.25, a[0])) * c);
            },
            to = (t) => {
              if ((p.blinkAmount() ?? tJ()) > 0) {
                tt = t;
                return;
              }
              (t(), tK());
            },
            tC = (t, e) => {
              if (null == J)
                for (let n of Y.expression)
                  n.t <= t || n.t > e || to(() => p.play(n));
            },
            tI = (t) => {
              ((W = t),
                (F = null),
                (tt = null),
                tr(),
                p.seek(Y.expression, t),
                null != J &&
                  p.seek([{ t: 0, name: J, isThroughBlink: !1 }], 0));
            },
            t_ = () => {
              let t = tW(Y.lids, W);
              return t ? Math.min(1, Math.max(0, t[0])) : 0;
            },
            tJ = () => (te ? 0 : t_()),
            tK = () => {
              var t;
              !(!ti((t = p.name)) && !ts[t].some(tf)) || p.isMorphing
                ? (te = !0)
                : te && 0 === t_() && (te = !1);
            },
            tQ = () => ({
              rot: v,
              pos: b,
              scl: $,
              zoom: z / c,
              lids: tJ(),
              expr: p.name,
              squashAnchor: P,
            }),
            tV = (t) => {
              ((j = !1),
                (Y = t),
                (W = 0),
                (P = t.squashAnchor),
                null == t.body || M || (d = t.body),
                (_ = {
                  bias: t.inspect.bias ?? _.bias,
                  isFollowingTurn:
                    t.inspect.isFollowingTurn ?? _.isFollowingTurn,
                }));
            },
            t1 = (t) => {
              if (
                ((G = null),
                tV(t.clip),
                (H = { clip: t.clip, name: t.name }),
                (D = !0),
                !t.isPlaying)
              ) {
                (tI(0), t.isRest && (B = { ...B, hold: 0 }));
                return;
              }
              ((j = !0),
                t.phase > 0 && tI(t.phase * t.clip.duration),
                p.release(),
                t.phase <= 0 && tC(-1e-9, 0));
            },
            t0 = (t) => {
              let e,
                n,
                a = tQ(),
                r = tj(t.clip);
              ((G = t),
                tV(
                  ((e = (t, e) => [
                    { t: 0, v: t, ease: tL },
                    { t: 0.35, v: e, ease: q },
                  ]),
                  (n = [
                    tD(r.rot[0], a.rot[0]),
                    tD(r.rot[1], a.rot[1]),
                    tD(r.rot[2], a.rot[2]),
                  ]),
                  {
                    ...tS,
                    duration: 0.35,
                    squashAnchor: a.squashAnchor,
                    position: e(a.pos, r.pos),
                    rotation: e(a.rot, n),
                    squash: e(a.scl, r.scl),
                    zoom: e([a.zoom], [r.zoom]),
                    lids:
                      0 === a.lids && 0 === r.lids ? [] : e([a.lids], [r.lids]),
                  }),
                ),
                (D = !1),
                (j = !0),
                null == J && a.expr !== r.expr && to(() => p.morph(r.expr)));
            },
            t2 = (t, e) => {
              let n = t + (e - t) * 0.14;
              return 0.001 > Math.abs(e - n) ? e : n;
            },
            t4 = () => {
              if (0 === y.length) return [{ body: d, weight: 1 }];
              let t = I(A(x.x, 0, 1)),
                e = new Map();
              for (let n of y)
                e.set(n.body, (e.get(n.body) ?? 0) + n.weight * (1 - t));
              e.set(d, (e.get(d) ?? 0) + t);
              let n = [...e].filter(([, t]) => t > 1e-4),
                a = n.reduce((t, [, e]) => t + e, 0);
              return n.map(([t, e]) => ({ body: t, weight: e / a }));
            };
          return {
            get isPlaying() {
              return j;
            },
            get time() {
              return W;
            },
            get duration() {
              return Y.duration;
            },
            get loopCount() {
              return O;
            },
            get face() {
              return p.name;
            },
            get isSettled() {
              let t =
                Z ||
                (B.hold === +!!B.isHeld &&
                  (!B.isHeld || (B.cx === B.x && B.cy === B.y)));
              return (
                !j &&
                0 === tn.length &&
                0 === y.length &&
                null == F &&
                null == tt &&
                !p.isMorphing &&
                null == p.blinkAmount() &&
                m.snapshot().isSettled &&
                t
              );
            },
            load(
              t,
              {
                isPlaying: e = !0,
                transition: n = "bridge",
                phase: a = 0,
              } = {},
            ) {
              let r = t.name || H?.name || "recipe",
                l = {
                  clip: (function (t) {
                    var e, n;
                    let a,
                      r = new Map();
                    for (let [e, n] of Object.entries(t.tracks)) {
                      let t = tY.get(e);
                      void 0 !== t && r.set(t, n);
                    }
                    let l = (t) => (r.get(t) ?? []).map(tN),
                      o = l("lids"),
                      s = [],
                      i = !1;
                    for (let t of r.get("expression") ?? []) {
                      if ("blink" === t.v) {
                        ((i = !0),
                          o.push(
                            { t: (e = t.t), v: [0], ease: q },
                            { t: e + 0.117, v: [1], ease: q },
                            { t: e + 0.26, v: [0], ease: q },
                          ));
                        continue;
                      }
                      s.push({
                        t: t.t,
                        name:
                          "string" == typeof t.v
                            ? (function (t) {
                                let e = t.trim().toLowerCase(),
                                  n = V.get(e) ?? e;
                                return Q.some((t) => t === n) ? n : "neutral";
                              })(t.v)
                            : "neutral",
                        isThroughBlink: !1 === t.cut,
                      });
                    }
                    return (
                      i && o.sort((t, e) => t.t - e.t),
                      {
                        duration: t.duration,
                        body:
                          ((n = t.body ?? "sphere"),
                          ((a = tR.get(n) ?? n), K.some((t) => t === a))
                            ? a
                            : "sphere"),
                        squashAnchor: t.squashAnchor ?? 0,
                        restTime: t.workArea ? t.workArea.start : 0,
                        inspect: (function ({ inspect: t }) {
                          let e = t?.bias;
                          return {
                            bias:
                              void 0 !== e && Number.isFinite(e)
                                ? Math.min(1, Math.max(-1, e))
                                : void 0,
                            isFollowingTurn: t?.follow,
                          };
                        })(t),
                        position: l("position"),
                        rotation: l("rotation"),
                        squash: l("squash"),
                        zoom: l("zoom"),
                        lids: o,
                        expression: s,
                      }
                    );
                  })(t),
                  name: r,
                  isPlaying: e,
                  phase: A(a, 0, 1) % 1,
                  isRest: !1,
                };
              "bridge" === n && null != H && (null != G || H.name !== r)
                ? t0(l)
                : t1(l);
            },
            play() {
              ((Z = !1), (j = !0));
            },
            pause() {
              ((Z = !0), (j = !1));
            },
            stop() {
              ((j = !1), tI(0));
            },
            rest() {
              Z = !1;
              let t = {
                clip: tE,
                name: tX,
                isPlaying: !1,
                phase: 0,
                isRest: !0,
              };
              if (null == G && (null == H || H.name === tX)) {
                null == H && t1(t);
                return;
              }
              t0(t);
            },
            seek: tI,
            setBody(t, { isInstant: e = !1 } = {}) {
              if (((M = !0), !e))
                return void (
                  t !== d &&
                  ((y = t4()), (d = t), (x.x = 0), (x.v = 0), (x.t = 1))
                );
              ((d = t), (y = []), (x.x = 1), (x.v = 0));
            },
            setMorph(t, { isInstant: e = !1 } = {}) {
              (m.set(t), e && m.settle());
            },
            setExpression(t, { isThroughBlink: e = !1 } = {}) {
              to(() => {
                !e || ti(t) || ti(p.name) ? p.morph(t) : p.lidMorph(t);
              });
            },
            holdFace(t) {
              t !== J &&
                ((J = t),
                to(() => {
                  let t =
                    J ??
                    (null == G
                      ? tO(Y.expression, W)
                      : tO(G.clip.expression, 0));
                  t !== p.name && p.morph(t);
                }));
            },
            poke(t, { turns: e = 1 } = {}) {
              tn = [
                ...tn,
                { poke: t, t: 0, turns: Math.max(1, Math.round(e)) },
              ];
            },
            blink() {
              p.blink();
            },
            setInspect({ bias: t, isFollowingTurn: e }) {
              _ = {
                bias: void 0 === t ? _.bias : Math.min(1, Math.max(-1, t)),
                isFollowingTurn: e ?? _.isFollowingTurn,
              };
            },
            setGaze(t) {
              if (null == t) {
                B = { ...B, isHeld: !1 };
                return;
              }
              let e = A(t[0] || 0, -1, 1),
                n = A(t[1] || 0, -1, 1);
              B =
                0 === B.hold
                  ? { ...B, isHeld: !0, x: e, y: n, cx: e, cy: n }
                  : { ...B, isHeld: !0, x: e, y: n };
            },
            setGazeAlways(t) {
              B = { ...B, isAlways: t };
            },
            look(t) {
              let e = tH[t];
              F = { t: 0, fromRot: v, toRot: e.rot, fromPos: b, toPos: e.pos };
            },
            setGlow(t) {
              X = t;
            },
            advance(t) {
              (() => {
                if (
                  Z ||
                  (!B.isHeld && 0 === B.hold) ||
                  ((B = {
                    ...B,
                    cx: t2(B.cx, B.x),
                    cy: t2(B.cy, B.y),
                    hold: t2(B.hold, +!!B.isHeld),
                  }),
                  j)
                )
                  return;
                tr();
                let t = tA(d, B.cx, B.cy),
                  { hold: e } = B;
                ((v = [
                  v[0] + (t.rx - v[0]) * e,
                  v[1] + (t.ry - v[1]) * e,
                  v[2] * (1 - e),
                ]),
                  (b = [b[0] + (t.px - b[0]) * e, b[1] + (t.py - b[1]) * e]));
              })();
              let e = Math.min(t, 0.1),
                n = 1 - m.snapshot().amount;
              if (
                (j &&
                  ((t) => {
                    let e = W,
                      n = e + t;
                    if (n >= Y.duration)
                      if ((tC(e, Y.duration), D)) {
                        var a, r;
                        if (
                          ((O += 1),
                          !(
                            null != G ||
                            null == H ||
                            ((a = tQ()),
                            (r = tj(H.clip)),
                            4 > tZ(a.rot[0], r.rot[0]) &&
                              4 > tZ(a.rot[1], r.rot[1]) &&
                              4 > tZ(a.rot[2], r.rot[2]) &&
                              0.015 > Math.abs(a.pos[0] - r.pos[0]) &&
                              0.015 > Math.abs(a.pos[1] - r.pos[1]) &&
                              0.02 > Math.abs(a.scl[0] - r.scl[0]) &&
                              0.02 > Math.abs(a.scl[1] - r.scl[1]) &&
                              0.02 > Math.abs(a.zoom - r.zoom) &&
                              0.05 > Math.abs(a.lids - r.lids))
                          ) &&
                            (t0({ ...H, isPlaying: !0, phase: 0, isRest: !1 }),
                            1))
                        )
                          return;
                        ((n -= Y.duration) >= Y.duration && (n = 0),
                          tC(-1e-9, n),
                          (W = n));
                      } else ((W = Y.duration), (j = !1), null != G && t1(G));
                    else (tC(e, n), (W = n));
                    ((F = null), tr());
                  })(e * n),
                ((t) => {
                  if (null == F) return;
                  let e = F.t + t,
                    n = Math.min(e / 0.5, 1),
                    a = R(n, tG),
                    { fromRot: r, toRot: l, fromPos: o, toPos: s } = F;
                  ((v = [
                    r[0] + (l[0] - r[0]) * a,
                    r[1] + (l[1] - r[1]) * a,
                    r[2] + (l[2] - r[2]) * a,
                  ]),
                    (b = [o[0] + (s[0] - o[0]) * a, o[1] + (s[1] - o[1]) * a]),
                    n >= 1
                      ? ((v = l), (b = s), (F = null))
                      : (F = { ...F, t: e }));
                })(e),
                p.step(e),
                null != tt && (p.blinkAmount() ?? tJ()) === 0)
              ) {
                let t = tt;
                ((tt = null), t());
              }
              (tK(),
                ((t) => {
                  if (0 === y.length) return;
                  let e = C(t);
                  for (let n = 0; n < e; n++) k(x, 10, 1, t / e);
                  0.001 > Math.abs(x.x - 1) &&
                    0.01 > Math.abs(x.v) &&
                    ((x.x = 1), (x.v = 0), (y = []));
                })(e),
                (tn = tn
                  .map((t) => ({ ...t, t: t.t + e }))
                  .filter((t) => t.t < tk(t))),
                m.advance(e));
              let a = m.snapshot();
              (a.amount > 0 || !a.isSettled
                ? (g ??= [tU(v[0]), tU(v[1]), tU(v[2])])
                : (g = null),
                (U += t));
            },
            frame() {
              var t, e;
              let n,
                a,
                r = B.isAlways && j && !Z ? tA(d, B.cx, B.cy) : null,
                l = 0.55 * B.hold,
                o = (function (t) {
                  let e = 0,
                    n = 0,
                    a = 0,
                    r = 1,
                    l = 1;
                  for (let o of t) {
                    let t = Math.min(1, o.t / tk(o));
                    switch (o.poke) {
                      case "spin":
                        n += 180 * o.turns * (1 - Math.cos(Math.PI * t));
                        break;
                      case "nod":
                        e += 16 * t$(t, 0, 1);
                        break;
                      case "bounce": {
                        let e = t$(t, 0, 0.18) + t$(t, 0.82, 1),
                          n = t$(t, 0.18, 0.82);
                        ((a +=
                          0.3 * Math.sin(Math.PI * A((t - 0.14) / 0.72, 0, 1))),
                          (r *= 1 + 0.08 * e - 0.04 * n),
                          (l *= 1 - 0.1 * e + 0.06 * n));
                      }
                    }
                  }
                  return { pitch: e, yaw: n, lift: a, squash: [r, l] };
                })(tn),
                s = [
                  v[0] + (r ? r.rx * l : 0) + o.pitch,
                  v[1] + (r ? r.ry * l : 0) + o.yaw,
                  v[2],
                ],
                i = [
                  b[0] + (r ? r.px * l : 0),
                  b[1] + (r ? r.py * l : 0) + o.lift,
                ],
                h = [$[0] * o.squash[0], $[1] * o.squash[1]],
                u = p.inspectWeight(),
                f = m.snapshot(),
                c = 1 - f.amount,
                M = (f.spin % (2 * Math.PI)) / S,
                y = g ?? [0, 0, 0],
                x = (t) => y[t] + (s[t] - y[t]) * c,
                w = x(1);
              return {
                body: d,
                quat:
                  ((t = x(0) * S),
                  (e = (w + M) * S),
                  E(
                    N([0, 0, 1], x(2) * S),
                    E(N([0, 1, 0], e), N([1, 0, 0], t)),
                  )),
                zoom: z,
                offset: 1 === c ? i : [i[0] * c, i[1] * c],
                squash: 1 === c ? h : [1 + (h[0] - 1) * c, 1 + (h[1] - 1) * c],
                squashAnchor: P,
                eyes:
                  f.amount >= 0.5
                    ? null
                    : ((n = (function (t, e, n, a) {
                        if (e < 0.001) return t;
                        let r = n.isFollowingTurn
                            ? Math.min(1, Math.max(-1, a / 20))
                            : n.bias,
                          [l, o] = ts.inspecting,
                          s = Math.max(1e-4, l.wid),
                          i = Math.max(1e-4, o.wid),
                          h = (1 + r) / 2,
                          u = (t, n) => {
                            let a = 1 + (n - 1) * e;
                            return {
                              ...tu(t),
                              wid: t.wid * a,
                              pts: t.pts.map((t) => [t[0] * a, t[1] * a]),
                            };
                          };
                        return [
                          u(t[0], Math.pow(i / s, h)),
                          u(t[1], Math.pow(s / i, h)),
                        ];
                      })(p.eyes(), u, _, w)),
                      (a = p.blinkAmount() ?? tJ()) <= 1e-4
                        ? n
                        : [tm(n[0], a), tm(n[1], a)]),
                glow: X && {
                  ...X,
                  midT: 0.5 + 0.5 * Math.sin((1e3 * U) / 860),
                },
                inspectWeight: u,
                bodies: t4(),
                morph: null === f.kind && f.isSettled ? null : f,
              };
            },
          };
        });
export const createDirector = (function (t, e, n = {}) {
            let a = tF(n.seed ?? 1),
              r = new Map(),
              l = n.isCompact ?? !1,
              o = n.isResting ?? !1,
              s = !1,
              i = o,
              h = e,
              u = t0[e],
              f = 0,
              c = 0,
              p = t.loopCount,
              d = null,
              M = () =>
                l && null != u.compactClips ? u.compactClips : u.clips,
              y = () => null != u.next && null == u.holdSeconds,
              x = () => {
                let e,
                  l,
                  o = y()
                    ? M()[c]
                    : ((e = M()),
                      0 === (l = r.get(e) ?? []).length &&
                        l.push(
                          ...(function (t, e, n) {
                            let a = [...t];
                            for (let t = a.length - 1; t > 0; t -= 1)
                              t4(a, t, Math.floor(e() * (t + 1)));
                            let r = a.findIndex((t) => t !== n);
                            return (r > 0 && t4(a, 0, r), a);
                          })(e, a, d),
                        ),
                      r.set(e, l),
                      l.shift());
                if (((p = t.loopCount), void 0 === o || o === d)) return;
                let s = i || y();
                (t.load(
                  (function (t) {
                    let e = t2.get(t);
                    if (null == e) throw Error(`No motion recipe named ${t}`);
                    return e;
                  })(o),
                  { phase: s ? 0 : (n.firstPhase ?? a()) },
                ),
                  (i = !0),
                  (d = o),
                  (p = t.loopCount));
              },
              m = () => {
                t.holdFace(u.face ?? (s ? "surprised" : null));
              },
              g = (e) => {
                ((h = e),
                  (u = t0[e]),
                  (f = 0),
                  (c = 0),
                  t.setMorph(u.morph ?? null),
                  m(),
                  o || x());
              };
            return (
              o && t.rest(),
              g(e),
              {
                get state() {
                  return h;
                },
                get clip() {
                  return d;
                },
                setState(t) {
                  t !== h && g(t);
                },
                setCompact(t) {
                  l = t;
                },
                setEmphasis(t) {
                  t !== s && ((s = t), m());
                },
                setResting(e) {
                  if (e !== o) {
                    if (!(o = e)) return void x();
                    (t.rest(), (d = null));
                  }
                },
                advance(e) {
                  if (o) return;
                  f += e;
                  let n = u.next;
                  if (null != n && null != u.holdSeconds && f >= u.holdSeconds)
                    return void g(n);
                  if (t.loopCount !== p) {
                    if (
                      null != n &&
                      null == u.holdSeconds &&
                      (c += 1) >= M().length
                    )
                      return void g(n);
                    x();
                  }
                },
              }
            );
          });
export const renderSvg = (function (t, e, n, a, r = {}) {
              let [l, ...o] = t.bodies;
              return null == l || o.length > 0 || null != t.morph
                ? (function (t, e, n, a, r = n, l = n) {
                    return (function (t, e, n, a = t.size) {
                      let { size: r, center: l } = t,
                        o = tK(e),
                        s = nL(t.body),
                        i = t.eyes.map(nL).join(""),
                        h = "",
                        u = `<path d="${s}" fill="${o}"/>`;
                      "" !== i && e.cutout
                        ? ((h += `<mask id="${n}-holes" maskUnits="userSpaceOnUse" x="0" y="0" width="${r}" height="${r}"><rect width="${r}" height="${r}" fill="#fff"/><path d="${i}" fill="#000"/></mask>`),
                          (u = `<path d="${s}" fill="${o}" mask="url(#${n}-holes)"/>`))
                        : "" !== i &&
                          ((h += `<clipPath id="${n}-body"><path d="${s}"/></clipPath>`),
                          (u += `<path d="${i}" fill="${tQ(e)}" clip-path="url(#${n}-body)"/>`));
                      let f = t.head,
                        c =
                          null == f
                            ? u
                            : `<g transform="translate(${aC(l[0] + f.translate[0])} ${aC(l[1] + f.translate[1])}) rotate(${aC(f.rotation)}) scale(${aC(f.scale, 5)}) translate(${aC(-l[0])} ${aC(-l[1])})"${f.opacity < 1 ? ` opacity="${aC(f.opacity, 3)}"` : ""}>${u}</g>`,
                        p =
                          0 === t.parts.length
                            ? ""
                            : `<g transform="translate(${r / 2} ${r / 2}) scale(${aC(t.markScale, 5)}) translate(-114.2705 -114.2705)">${t.parts
                                .map((t) =>
                                  (function (t, e) {
                                    let n =
                                      t.opacity < 1
                                        ? ` opacity="${aC(t.opacity, 3)}"`
                                        : "";
                                    switch (t.type) {
                                      case "disc":
                                        return `<circle cx="${aC(t.cx)}" cy="${aC(t.cy)}" r="${aC(t.r)}" fill="${e}"${n}/>`;
                                      case "ring": {
                                        let a = 2 * Math.PI * t.r,
                                          r =
                                            null == t.arc
                                              ? ""
                                              : ` stroke-dasharray="${aC(a * t.arc.fraction)} ${aC(a)}" transform="rotate(${aC(t.arc.startDeg)} ${aC(t.cx)} ${aC(t.cy)})"`;
                                        return `<circle cx="${aC(t.cx)}" cy="${aC(t.cy)}" r="${aC(t.r)}" fill="none" stroke="${e}" stroke-width="${aC(t.width)}"${r}${n}/>`;
                                      }
                                      case "shape":
                                        return `<path d="${t.d}" transform="${t.transform}" fill="${e}"${n}/>`;
                                      case "stroke":
                                        return `<path d="${t.d}" fill="none" stroke="${e}" stroke-width="${aC(t.width)}" stroke-linecap="round" stroke-linejoin="round"${n}/>`;
                                    }
                                  })(t, o),
                                )
                                .join("")}</g>`,
                        d = r / 2 + 0.2295000000000016 * t.markScale,
                        M =
                          1 === t.zoom
                            ? `${p}${c}`
                            : `<g transform="translate(${aC(d)} ${aC(d)}) scale(${aC(t.zoom, 5)}) translate(${aC(-d)} ${aC(-d)})">${p}${c}</g>`;
                      return `${tV(r, n, a)}${"" === h ? "" : `<defs>${h}</defs>`}${M}</svg>`;
                    })(
                      (function (t, e, n = e) {
                        var a, r, l;
                        let o,
                          s,
                          i,
                          h = t.bodies
                            .map(({ body: n, weight: a }) => ({
                              shape:
                                "sphere" === n
                                  ? (function (t, e) {
                                      let n = (t.zoom * e) / 2,
                                        [a, r] = t.squash,
                                        l = [
                                          e / 2 + n * t.offset[0],
                                          e / 2 -
                                            n *
                                              (t.squashAnchor * (1 - r) +
                                                t.offset[1]),
                                        ],
                                        o = Math.abs(n),
                                        s = ([t, e]) => [
                                          l[0] + t * n,
                                          l[1] - e * n,
                                        ];
                                      return {
                                        center: l,
                                        radius: o,
                                        body: [
                                          (function (t, e) {
                                            let [n, a] = e;
                                            return Array.from(
                                              { length: 192 },
                                              (e, r) => {
                                                let l = (r / 192) * nB,
                                                  o = Math.cos(l),
                                                  s = Math.sin(l),
                                                  i =
                                                    0 === n || 0 === a
                                                      ? 0
                                                      : 1 /
                                                        Math.hypot(
                                                          o / n,
                                                          s / a,
                                                        );
                                                return [
                                                  t[0] + o * i,
                                                  t[1] + s * i,
                                                ];
                                              },
                                            );
                                          })(l, [
                                            Math.abs(a) * o,
                                            Math.abs(r) * o,
                                          ]),
                                        ],
                                        eyes: n1(t, o).map((t) =>
                                          (function (t) {
                                            let e = [],
                                              n = t[t.length - 1]?.to ?? [0, 0];
                                            for (let a of t) {
                                              if ("arc" === a.kind) {
                                                let t = Math.atan2(n[1], n[0]),
                                                  r = Math.max(
                                                    1,
                                                    Math.ceil(
                                                      Math.abs(a.sweep) / nV,
                                                    ),
                                                  );
                                                for (let n = 1; n < r; n++)
                                                  e.push(
                                                    nW(
                                                      a.radii,
                                                      t + (a.sweep * n) / r,
                                                    ),
                                                  );
                                              }
                                              (e.push(a.to), (n = a.to));
                                            }
                                            return e;
                                          })(t).map(s),
                                        ),
                                      };
                                    })({ ...t }, e)
                                  : (function (t, e) {
                                      let n = Math.max(
                                          8,
                                          Math.round((e * t.zoom) / 0.71875),
                                        ),
                                        a = Math.max(n, 144),
                                        r = n$(t.quat, nC(e, t.zoom)),
                                        { body: l, eyes: o } = nI(
                                          t.body,
                                          r,
                                          a,
                                          t.eyes,
                                          t.inspect,
                                        ),
                                        [s, i, h, u] = nz(t, e, n, a),
                                        f = ([t, e]) => [s * t + h, i * e + u];
                                      return {
                                        center: [
                                          (s * a) / 2 + h,
                                          (i * a) / 2 + u,
                                        ],
                                        radius: (t.zoom * e) / 2,
                                        body: l
                                          .flatMap(nq)
                                          .map((t) => t.map(f)),
                                        eyes:
                                          null == t.eyes
                                            ? []
                                            : o
                                                .flatMap(nq)
                                                .map((t) => t.map(f)),
                                      };
                                    })(
                                      {
                                        ...t,
                                        body: n,
                                        inspect: t.inspectWeight,
                                      },
                                      e,
                                    ),
                              weight: a,
                            }))
                            .sort((t, e) => e.weight - t.weight),
                          u = h[0]?.shape.center ?? [e / 2, e / 2],
                          f = h[0]?.shape.radius ?? 0,
                          c = (i = [
                            ak,
                            ...h.map(({ shape: t }) => {
                              var e, n;
                              return (
                                (e = t.body),
                                (n = t.center),
                                e.flatMap((t) => t.map(([t, e]) => nT(n, t, e)))
                              );
                            }),
                          ]
                            .flat()
                            .sort((t, e) => t - e)).filter(
                            (t, e) => 0 === e || t - i[e - 1] > 1e-7,
                          ),
                          p = nY(
                            h.map(({ shape: t, weight: e }) => {
                              var n, a, r;
                              let l, o, s, i;
                              return {
                                outline:
                                  ((n = t.body),
                                  (a = t.center),
                                  (l = (function (t, e) {
                                    let n = Array.from(
                                      { length: 720 },
                                      () => [],
                                    );
                                    for (let a of t)
                                      for (let t = 0; t < a.length; t++) {
                                        let r = a[t],
                                          l = a[(t + 1) % a.length],
                                          o = nT(e, r[0], r[1]),
                                          s = nT(e, l[0], l[1]) - o;
                                        (s > Math.PI && (s -= nB),
                                          s < -Math.PI && (s += nB));
                                        let i =
                                            Math.floor(
                                              ((s < 0 ? o + s : o) / nB) * 720,
                                            ) - 1,
                                          h =
                                            Math.floor(
                                              ((s < 0 ? o : o + s) / nB) * 720,
                                            ) + 1;
                                        for (let t = i; t <= h; t++)
                                          n[((t % 720) + 720) % 720].push([
                                            r,
                                            l,
                                          ]);
                                      }
                                    return n;
                                  })(n, a)),
                                  (s = (r = c.map((t) =>
                                    (function (t, [e, n], a) {
                                      let r = Math.cos(a),
                                        l = Math.sin(a),
                                        o = NaN;
                                      for (let [[s, i], [h, u]] of t[
                                        Math.floor((a / nB) * 720) % 720
                                      ]) {
                                        let t = h - s,
                                          a = u - i,
                                          f = r * a - l * t;
                                        if (1e-12 > Math.abs(f)) continue;
                                        let c = s - e,
                                          p = i - n,
                                          d = (c * a - p * t) / f,
                                          M = (c * l - p * r) / f;
                                        d >= 0 &&
                                          M >= -1e-9 &&
                                          M <= 1.000000001 &&
                                          !(d <= o) &&
                                          (o = d);
                                      }
                                      return o;
                                    })(l, a, t),
                                  )).length),
                                  (o =
                                    0 ===
                                    (i = r.flatMap((t, e) =>
                                      Number.isNaN(t) ? [] : [e],
                                    )).length
                                      ? r.map(() => 0)
                                      : r.map((t, e) => {
                                          if (!Number.isNaN(t)) return t;
                                          let n =
                                              i.find((t) => t > e) ?? i[0] + s,
                                            a =
                                              [...i]
                                                .reverse()
                                                .find((t) => t < e) ??
                                              (i.at(-1) ?? 0) - s,
                                            l = (e - a) / (n - a);
                                          return (
                                            r[(a + s) % s] * (1 - l) +
                                            r[n % s] * l
                                          );
                                        })),
                                  c.map((t, e) => [
                                    a[0] + Math.cos(t) * o[e],
                                    a[1] + Math.sin(t) * o[e],
                                  ])),
                                weight: e,
                              };
                            }),
                          ),
                          d =
                            null == t.morph
                              ? null
                              : (function (t, e) {
                                  let n,
                                    a,
                                    r,
                                    l,
                                    { kind: o, isReducedMotion: s } = t,
                                    i = A(t.amount, 0, 1),
                                    h = A(t.swap, 0, 1),
                                    u = h < 0.999 ? t.outgoing : null,
                                    f = (t) =>
                                      t === o
                                        ? i * h
                                        : t === u
                                          ? i * (1 - h)
                                          : 0,
                                    c = (e) =>
                                      e === o ? t.clock : t.outgoingClock,
                                    p = A(i / 0.62, 0, 1),
                                    d =
                                      "pencil" === o || "pencil" === u
                                        ? h >= 0.999
                                          ? au(o)
                                          : ((n = au(u)),
                                            (a = au(o)),
                                            (r = I(h)),
                                            n.map(([t, e], n) => [
                                              t + (a[n][0] - t) * r,
                                              e + (a[n][1] - e) * r,
                                            ]))
                                        : as,
                                    M = o
                                      ? at[o] * h +
                                        (u ? at[u] : at[o]) * (1 - h)
                                      : 19,
                                    y = f("dots"),
                                    x = "dots" === o || "dots" === u,
                                    m = x ? ax(c("dots"), 1, i, s) : ay,
                                    g = x
                                      ? 1 +
                                        (m.pop - 1) * (y / Math.max(i, 0.001))
                                      : 1,
                                    v = f("receive");
                                  v > 0.004 &&
                                    (g *=
                                      1 +
                                      0.11 *
                                        Math.sin(
                                          A(
                                            (ao(
                                              (1e3 * c("receive").stateTime) /
                                                1700,
                                            ) -
                                              0.58) /
                                              0.34,
                                            0,
                                            1,
                                          ) * Math.PI,
                                        ) *
                                        v);
                                  let b = f("send");
                                  if (b > 0.004) {
                                    let t = ao(
                                      (1e3 * c("send").stateTime) / 1500,
                                    );
                                    g *=
                                      1 +
                                      ((t < 0.18
                                        ? -0.06 * Math.sin((t / 0.18) * Math.PI)
                                        : 0) +
                                        (t >= 0.18 && t < 0.42
                                          ? 0.05 *
                                            Math.sin(
                                              ((t - 0.18) / 0.24) * Math.PI,
                                            )
                                          : 0)) *
                                        b;
                                  }
                                  let w = f("bang");
                                  w > 0.004 &&
                                    (g *=
                                      1 +
                                      0.04 *
                                        Math.exp(
                                          -(5.5 * (c("bang").stateTime % 2.2)),
                                        ) *
                                        w);
                                  let k = 0,
                                    $ = 0,
                                    C = 0,
                                    P = f("pencil");
                                  if (P > 0.004) {
                                    let t = ag(1e3 * c("pencil").stateTime);
                                    ((k += t.x * P),
                                      ($ += (t.y + 0.5 * t.wig) * P),
                                      (C += t.rot * P));
                                  }
                                  w > 0.004 && ($ += 58 * w);
                                  let z = f("ball");
                                  z > 0.004 &&
                                    ($ +=
                                      ((t) => {
                                        let e = Math.sqrt(0.07392307692307692);
                                        if (t < e)
                                          return 541.1030176899063 * t * t;
                                        let n = ao((t - e) / 0.62);
                                        return 40 - 208 * n * (1 - n);
                                      })(c("ball").stateTime) * z);
                                  let q = (M / 114.2705) * g,
                                    _ = f("standby"),
                                    F =
                                      _ > 0
                                        ? (0.28 +
                                            0.2 *
                                              Math.sin(
                                                1e3 *
                                                  c("standby").stateTime *
                                                  0.0016,
                                              )) *
                                          _
                                        : 0,
                                    B = {
                                      scale: 1 - i + q * i,
                                      dx: k * i,
                                      dy: -m.lift * y + $ * i,
                                      rotation: C * i,
                                      opacity: (1 - (1 - m.tone) * y) * (1 - F),
                                      round: I(p),
                                      ring: d,
                                    },
                                    Y =
                                      1 -
                                      (l = A((e - 44) / 90, 0, 1)) *
                                        l *
                                        (3 - 2 * l),
                                    R = null == o ? 1 : ae[o],
                                    L = u ? ae[u] : R,
                                    T = 1 + (R * h + L * (1 - h) - 1) * i * Y,
                                    S = [];
                                  for (let t of [u, o]) {
                                    if (null == t) continue;
                                    let e = f(t);
                                    e > 0.004 &&
                                      S.push(...aw(t, e, c(t), M, s));
                                  }
                                  return {
                                    core: B,
                                    isFaceVisible: i < 0.5,
                                    zoom: T,
                                    parts: S.filter((t) => t.opacity > 0),
                                  };
                                })(t.morph, n),
                          M = (0.6 * e) / 2 / 114.2705;
                        return {
                          size: e,
                          center: u,
                          body:
                            null == d || 0 === d.core.round
                              ? p
                              : ((a = (function (t, e, n, a) {
                                  var r;
                                  let l,
                                    o = n / 114.2705;
                                  return (
                                    (r = t.core.ring.map(([t, n]) => [
                                      e[0] + (t - 114.2705) * o,
                                      e[1] + (n - 114.2705) * o,
                                    ])),
                                    (l = r
                                      .map(([t, n]) => ({
                                        angle: nT(e, t, n),
                                        reach: Math.hypot(t - e[0], n - e[1]),
                                      }))
                                      .sort((t, e) => t.angle - e.angle)),
                                    a.map((t) => {
                                      let n = (function (t, e) {
                                        let n = t.length;
                                        if (0 === n) return 0;
                                        let a = t.findIndex(
                                          (t) => t.angle >= e,
                                        );
                                        a < 0 && (a = 0);
                                        let r = t[a],
                                          l = t[(a - 1 + n) % n],
                                          o = (r.angle - l.angle + nB) % nB;
                                        if (0 === o) return r.reach;
                                        let s = ((e - l.angle + nB) % nB) / o;
                                        return (
                                          l.reach + (r.reach - l.reach) * s
                                        );
                                      })(l, t);
                                      return [
                                        e[0] + Math.cos(t) * n,
                                        e[1] + Math.sin(t) * n,
                                      ];
                                    })
                                  );
                                })(d, u, f, c)),
                                (r = d.core.round),
                                p.map(([t, e], n) => [
                                  t + (a[n][0] - t) * r,
                                  e + (a[n][1] - e) * r,
                                ])),
                          eyes:
                            1 === h.length
                              ? (h[0]?.shape.eyes ?? [])
                              : ((l = h),
                                (o = (l[0]?.shape.radius ?? 0) * 0.6),
                                (s = []),
                                l.forEach(({ shape: t }, e) => {
                                  for (let n of t.eyes) {
                                    let t = nR(n),
                                      a = (function (t, e, n, a) {
                                        let r = null,
                                          l = a;
                                        for (let a of t) {
                                          if (null != a.loops[e]) continue;
                                          let t = Math.hypot(
                                            a.anchor[0] - n[0],
                                            a.anchor[1] - n[1],
                                          );
                                          t < l && ((r = a), (l = t));
                                        }
                                        return r;
                                      })(s, e, t, o);
                                    if (null != a) {
                                      a.loops[e] = n;
                                      continue;
                                    }
                                    let r = l.map(() => null);
                                    ((r[e] = n),
                                      s.push({ anchor: t, loops: r }));
                                  }
                                }),
                                s.map((t) => {
                                  let e,
                                    n = t.loops.map((t) =>
                                      null == t
                                        ? null
                                        : (function (t) {
                                            let e =
                                                0 >
                                                (function (t) {
                                                  let e = 0;
                                                  for (
                                                    let n = 0;
                                                    n < t.length;
                                                    n++
                                                  ) {
                                                    let [a, r] = t[n],
                                                      [l, o] =
                                                        t[(n + 1) % t.length];
                                                    e += a * o - l * r;
                                                  }
                                                  return e / 2;
                                                })(t)
                                                  ? [...t].reverse()
                                                  : t,
                                              n = (function (t, [e, n]) {
                                                let a = null;
                                                for (
                                                  let r = 0;
                                                  r < t.length;
                                                  r++
                                                ) {
                                                  let [l, o] = t[r],
                                                    [s, i] =
                                                      t[(r + 1) % t.length];
                                                  if (
                                                    o === i ||
                                                    (o - n) * (i - n) > 0
                                                  )
                                                    continue;
                                                  let h =
                                                    l +
                                                    ((n - o) / (i - o)) *
                                                      (s - l);
                                                  h >= e &&
                                                    (null == a ||
                                                      h > a.point[0]) &&
                                                    (a = {
                                                      edge: r,
                                                      point: [h, n],
                                                    });
                                                }
                                                return a;
                                              })(e, nR(e)),
                                              a =
                                                null == n
                                                  ? e
                                                  : [
                                                      n.point,
                                                      ...e.slice(n.edge + 1),
                                                      ...e.slice(0, n.edge + 1),
                                                    ],
                                              r = [0];
                                            for (let t = 0; t < a.length; t++) {
                                              let [e, n] = a[t],
                                                [l, o] = a[(t + 1) % a.length];
                                              r.push(
                                                r[t] + Math.hypot(l - e, o - n),
                                              );
                                            }
                                            let l = r[a.length] ?? 0;
                                            return {
                                              points: a,
                                              stations: r.map((t) =>
                                                0 === l ? 0 : t / l,
                                              ),
                                            };
                                          })(t),
                                    ),
                                    a = (e = [
                                      a$,
                                      ...n.map((t) => t?.stations ?? []),
                                    ]
                                      .flat()
                                      .filter((t) => t < 1)
                                      .sort((t, e) => t - e)).filter(
                                      (t, n) => 0 === n || t - e[n - 1] > 1e-7,
                                    );
                                  return nY(
                                    l.map(({ weight: e }, r) => {
                                      var l;
                                      let o = n[r];
                                      return {
                                        outline:
                                          null == o
                                            ? ((l = t.anchor),
                                              Array.from(
                                                { length: a.length },
                                                () => [l[0], l[1]],
                                              ))
                                            : (function (
                                                { points: t, stations: e },
                                                n,
                                              ) {
                                                if (0 === t.length) return [];
                                                let a = 0;
                                                return n.map((n) => {
                                                  for (
                                                    ;
                                                    a < t.length - 1 &&
                                                    e[a + 1] < n;
                                                  )
                                                    a++;
                                                  let [r, l] = t[a],
                                                    [o, s] =
                                                      t[(a + 1) % t.length],
                                                    i = e[a + 1] - e[a],
                                                    h =
                                                      0 === i
                                                        ? 0
                                                        : (n - e[a]) / i;
                                                  return [
                                                    r + (o - r) * h,
                                                    l + (s - l) * h,
                                                  ];
                                                });
                                              })(o, a),
                                        weight: e,
                                      };
                                    }),
                                  );
                                })),
                          head:
                            null == d || null == t.morph
                              ? null
                              : (function (t, e, n, a) {
                                  let { core: r } = t,
                                    l = 1 - e,
                                    o = e > 0 ? (r.scale - l) / e : 0;
                                  return {
                                    translate: [r.dx * a, r.dy * a],
                                    rotation: r.rotation,
                                    scale: l + (0.6 / n) * o * e,
                                    opacity: r.opacity,
                                  };
                                })(d, t.morph.amount, t.zoom, M),
                          parts: d?.parts ?? [],
                          markScale: M,
                          zoom: d?.zoom ?? 1,
                        };
                      })(t, n, r),
                      e,
                      a,
                      l,
                    );
                  })(t, e, n, a, r.displaySize ?? n, r.extent)
                : "sphere" === l.body
                  ? (function (t, e, n = "grok-sphere", a = t.size) {
                      let r = [],
                        l = [],
                        o = tK(e);
                      if (
                        (t.glow?.halo != null &&
                          (r.push(n3(`${n}-halo`, t.glow.halo.gradient)),
                          l.push(
                            `<path d="${t.glow.halo.d}" fill="url(#${n}-halo)" fill-rule="evenodd"/>`,
                          )),
                        null !== t.proof
                          ? ((o = `url(#${n}-light)`),
                            r.push(
                              n3(`${n}-light`, t.proof.light),
                              `<clipPath id="${n}-proof"><path d="${t.body}" clip-rule="evenodd"/></clipPath>`,
                            ))
                          : null !== t.glow &&
                            ((o = `url(#${n}-body)`),
                            r.push(n3(`${n}-body`, t.glow.body))),
                        l.push(
                          `<path d="${t.body}" fill="${o}" fill-rule="evenodd"/>`,
                        ),
                        "" !== t.eyes &&
                          l.push(`<path d="${t.eyes}" fill="${tQ(e)}"/>`),
                        null !== t.proof)
                      ) {
                        let e = t.proof.lines
                          .filter((t) => "" !== t.d)
                          .map(
                            (t) =>
                              `<path d="${t.d}" fill="none" stroke="${t.color}" stroke-width="${n9(t.width)}" stroke-opacity="${t.opacity}"/>`,
                          );
                        l.push(
                          `<g clip-path="url(#${n}-proof)">${e.join("")}</g>`,
                        );
                      }
                      return `${tV(t.size, n, a)}${r.length > 0 ? `<defs>${r.join("")}</defs>` : ""}${l.join("")}</svg>`;
                    })(
                      (function (t, e, n, a = {}) {
                        let r = (t.zoom * n) / 2,
                          [l, o] = t.squash;
                        if (0 === r || 0 === l || 0 === o)
                          return {
                            size: n,
                            body: "",
                            eyes: "",
                            glow: null,
                            proof: null,
                          };
                        let s = [Math.abs(l), Math.abs(o)],
                          i = n / 2 + r * t.offset[0],
                          h =
                            n / 2 -
                            r * (t.squashAnchor * (1 - o) + t.offset[1]),
                          u = (t) => `${n9(i + t[0] * r)} ${n9(h - t[1] * r)}`,
                          f = (t) =>
                            t.map((t) => n0(t, u, Math.abs(r))).join(""),
                          c = n1(t, Math.abs(r));
                        return {
                          size: n,
                          body: f(
                            e.cutout
                              ? (function (t, e) {
                                  let n = (e) =>
                                      "arc" === e.kind &&
                                      e.radii[0] === t[0] &&
                                      e.radii[1] === t[1],
                                    a = [],
                                    r = [],
                                    l = [],
                                    o = [];
                                  for (let t of e) {
                                    let e = t.findIndex(n);
                                    if (e < 0) {
                                      a.push(t);
                                      continue;
                                    }
                                    let s = t[e].to,
                                      i = [],
                                      h = s;
                                    for (let a = 1; a <= t.length; a++) {
                                      let u = t[(e + a) % t.length];
                                      (n(u)
                                        ? (l.push({ from: h, sweep: u.sweep }),
                                          o.push(h, u.to),
                                          i.length > 0 &&
                                            r.push(
                                              (function (t, e) {
                                                let n = [
                                                    t,
                                                    ...e.map((t) => t.to),
                                                  ],
                                                  a = e
                                                    .map((t, e) =>
                                                      "line" === t.kind
                                                        ? {
                                                            kind: "line",
                                                            to: n[e],
                                                          }
                                                        : {
                                                            ...t,
                                                            to: n[e],
                                                            sweep: -t.sweep,
                                                          },
                                                    )
                                                    .reverse();
                                                return {
                                                  from: n[n.length - 1],
                                                  to: t,
                                                  segments: a,
                                                };
                                              })(s, i),
                                            ),
                                          (i = []),
                                          (s = u.to))
                                        : i.push(u),
                                        (h = u.to));
                                    }
                                  }
                                  return 0 === l.length
                                    ? [nN(t, 1), ...a]
                                    : [
                                        ...(function (t) {
                                          let e = (t) => `${t[0]} ${t[1]}`,
                                            n = new Map();
                                          for (let a of t) {
                                            let t = n.get(e(a.from));
                                            void 0 === t
                                              ? n.set(e(a.from), [a])
                                              : t.push(a);
                                          }
                                          let a = new Set(),
                                            r = [];
                                          for (let l of t) {
                                            let t = [],
                                              o = l;
                                            for (; void 0 !== o && !a.has(o);)
                                              (a.add(o),
                                                t.push(...o.segments),
                                                (o = n
                                                  .get(e(o.to))
                                                  ?.find((t) => !a.has(t))));
                                            t.length > 0 && r.push(t);
                                          }
                                          return r;
                                        })([
                                          ...r,
                                          ...(function (t, e, n) {
                                            let a = n
                                                .map((t) => ({
                                                  point: t,
                                                  angle: nG(
                                                    Math.atan2(t[1], t[0]),
                                                  ),
                                                }))
                                                .sort(
                                                  (t, e) => t.angle - e.angle,
                                                ),
                                              r = [];
                                            for (let n = 0; n < a.length; n++) {
                                              let l = a[n],
                                                o = a[(n + 1) % a.length],
                                                s =
                                                  n + 1 < a.length
                                                    ? o.angle - l.angle
                                                    : o.angle +
                                                      2 * Math.PI -
                                                      l.angle;
                                              if (s <= 0) continue;
                                              let i = l.angle + s / 2;
                                              0 ===
                                                e.reduce(
                                                  (t, e) =>
                                                    t +
                                                    (function (t, e) {
                                                      let n = Math.atan2(
                                                        t.from[1],
                                                        t.from[0],
                                                      );
                                                      return (t.sweep > 0
                                                        ? nG(e - n)
                                                        : nG(n - e)) <
                                                        Math.abs(t.sweep)
                                                        ? Math.sign(t.sweep)
                                                        : 0;
                                                    })(e, i),
                                                  0,
                                                ) &&
                                                r.push({
                                                  from: l.point,
                                                  to: o.point,
                                                  segments: [
                                                    {
                                                      kind: "arc",
                                                      to: o.point,
                                                      radii: t,
                                                      sweep: s,
                                                    },
                                                  ],
                                                });
                                            }
                                            return r;
                                          })(t, l, o),
                                        ]),
                                        ...a,
                                      ];
                                })(s, c)
                              : [nN(s, 1)],
                          ),
                          eyes: e.cutout ? "" : f(c),
                          glow:
                            null === t.glow
                              ? null
                              : (function (t, e, n, a) {
                                  let r = 0.42 + 0.16 * t.midT,
                                    l = [];
                                  for (let e = 0; e <= 48; e++) {
                                    let n = 1 - (1 - e / 48) ** 2;
                                    l.push({
                                      offset: n,
                                      color: tJ(
                                        (function (t, e, n) {
                                          let a = n7(0.12, e, n),
                                            r = n7(e, 0.93, n),
                                            l =
                                              0.9 +
                                              0.1 *
                                                Math.max(0, 1 - n * n) ** 0.225,
                                            o = (e) => {
                                              let n =
                                                t.inner[e] +
                                                (t.mid[e] - t.inner[e]) * a;
                                              return (
                                                (n + (t.rim[e] - n) * r) * l
                                              );
                                            };
                                          return [o(0), o(1), o(2)];
                                        })(t, r, n),
                                      ),
                                      opacity: 1,
                                    });
                                  }
                                  let o = {
                                    transform: n6(e, n, a),
                                    focus: 0,
                                    stops: l,
                                  };
                                  if (!(t.halo > 0))
                                    return { body: o, halo: null };
                                  let s = [];
                                  for (let e = 0; e <= 11; e++) {
                                    let n = (0.055 * e) / 11,
                                      a = Math.min(
                                        1,
                                        t.halo * (1 - n7(0, 0.055, n)),
                                      );
                                    s.push({
                                      offset: (1 + n) / 1.055,
                                      color: tJ(t.rim),
                                      opacity: a,
                                    });
                                  }
                                  let i = [1.055 * e[0], 1.055 * e[1]];
                                  return {
                                    body: o,
                                    halo: {
                                      d:
                                        n0(nN(i, 1), n, a) + n0(nN(e, 1), n, a),
                                      gradient: {
                                        transform: n6(i, n, a),
                                        focus: 0,
                                        stops: s,
                                      },
                                    },
                                  };
                                })(t.glow, s, u, Math.abs(r)),
                          proof:
                            !0 === a.isProof
                              ? (function (t, e, n, a, r, l) {
                                  let o = W(t.quat),
                                    s = "",
                                    i = "";
                                  for (let t of ny) {
                                    let e = (function (t, e) {
                                      let n = D(e, t.center),
                                        a = D(e, t.a),
                                        r = D(e, t.b),
                                        l = Math.hypot(a[2], r[2]),
                                        o = 0,
                                        s = 2 * Math.PI;
                                      if (l > Math.abs(n[2])) {
                                        let t = Math.atan2(r[2], a[2]),
                                          e = Math.acos(-n[2] / l);
                                        ((o = t - e), (s = t + e));
                                      } else if (n[2] <= 0) return null;
                                      return {
                                        center: [n[0], n[1]],
                                        a: [a[0], a[1]],
                                        b: [r[0], r[1]],
                                        from: o,
                                        to: s,
                                      };
                                    })(t, o);
                                    null !== e &&
                                      (t.isEquator
                                        ? (i += n2(e, a, r))
                                        : (s += n2(e, a, r)));
                                  }
                                  let h = n4(e.ink, [1, 1, 1], 0.4),
                                    u = (function () {
                                      if (null !== nx) return nx;
                                      let t = Math.hypot(nM[0], nM[1]),
                                        e = [nM[0] / t, nM[1] / t],
                                        n = {
                                          origin: [
                                            -1.24 * nM[0],
                                            -1.24 * nM[1],
                                          ],
                                          axisX: [2.5596 * e[0], 2.5596 * e[1]],
                                          axisY: [-3.24 * e[1], 3.24 * e[0]],
                                          focus: (2.41 * t) / 2.5596,
                                        };
                                      return (nx = {
                                        ...n,
                                        stops: (function (t) {
                                          let e = new Float64Array(49),
                                            n = new Float64Array(49),
                                            a = new Float64Array(49),
                                            r = 0;
                                          for (let l = 0; l < 160; l++)
                                            for (let o = 0; o < 160; o++) {
                                              let s = ((l + 0.5) / 160) * 2 - 1,
                                                i = ((o + 0.5) / 160) * 2 - 1;
                                              if (s * s + i * i >= 1) continue;
                                              let h =
                                                  48 *
                                                  Math.min(
                                                    1,
                                                    (function (t, e, n) {
                                                      let a = e - t.origin[0],
                                                        r = n - t.origin[1],
                                                        l =
                                                          (a * t.axisX[0] +
                                                            r * t.axisX[1]) /
                                                          (t.axisX[0] ** 2 +
                                                            t.axisX[1] ** 2),
                                                        o =
                                                          (a * t.axisY[0] +
                                                            r * t.axisY[1]) /
                                                          (t.axisY[0] ** 2 +
                                                            t.axisY[1] ** 2),
                                                        s = t.focus,
                                                        i = s * s - 1,
                                                        h = 2 * s * (l - s);
                                                      return (
                                                        (-h -
                                                          Math.sqrt(
                                                            h * h -
                                                              4 *
                                                                i *
                                                                ((l - s) ** 2 +
                                                                  o * o),
                                                          )) /
                                                        (2 * i)
                                                      );
                                                    })(t, s, i),
                                                  ),
                                                u = Math.min(47, Math.floor(h)),
                                                f = h - u,
                                                c = (function (t, e) {
                                                  let n = Math.sqrt(
                                                    Math.max(
                                                      0,
                                                      1 - t * t - e * e,
                                                    ),
                                                  );
                                                  return (
                                                    0.18 +
                                                    0.8200000000000001 *
                                                      Math.max(
                                                        0,
                                                        nM[0] * t +
                                                          nM[1] * e +
                                                          nM[2] * n,
                                                      )
                                                  );
                                                })(s, i);
                                              ((e[u] += (1 - f) ** 2),
                                                (e[u + 1] += f * f),
                                                (n[u] += (1 - f) * f),
                                                (a[u] += (1 - f) * c),
                                                (a[u + 1] += f * c),
                                                r++);
                                            }
                                          let l = (0.001 * r) / 49;
                                          for (let t = 0; t < 48; t++)
                                            ((e[t] += l),
                                              (e[t + 1] += l),
                                              (n[t] -= l));
                                          return Array.from(
                                            (function (t, e, n) {
                                              let a = t.length,
                                                r = new Float64Array(a),
                                                l = new Float64Array(a);
                                              ((r[0] = e[0] / t[0]),
                                                (l[0] = n[0] / t[0]));
                                              for (let o = 1; o < a; o++) {
                                                let a =
                                                  t[o] - e[o - 1] * r[o - 1];
                                                ((r[o] = e[o] / a),
                                                  (l[o] =
                                                    (n[o] -
                                                      e[o - 1] * l[o - 1]) /
                                                    a));
                                              }
                                              let o = new Float64Array(a);
                                              o[a - 1] = l[a - 1];
                                              for (let t = a - 2; t >= 0; t--)
                                                o[t] = l[t] - r[t] * o[t + 1];
                                              return o;
                                            })(e, n, a),
                                            (t, e) => ({
                                              offset: e / 48,
                                              shade: t,
                                            }),
                                          );
                                        })(n),
                                      });
                                    })(),
                                    f =
                                      0.2126 * h[0] +
                                        0.7152 * h[1] +
                                        0.0722 * h[2] >
                                      0.6
                                        ? "#000000"
                                        : "#ffffff",
                                    c = Math.max(0.75, 0.0035 * l);
                                  return {
                                    light: {
                                      transform: (function (t, e, n, a) {
                                        let [r, l] = t.axisX,
                                          [o, s] = t.axisY,
                                          i = [
                                            r * e[0] * a,
                                            -l * e[1] * a,
                                            o * e[0] * a,
                                            -s * e[1] * a,
                                          ],
                                          h = n([
                                            t.origin[0] * e[0],
                                            t.origin[1] * e[1],
                                          ]);
                                        return `matrix(${i.map((t) => Math.round(1e4 * t) / 1e4).join(" ")} ${h})`;
                                      })(u, n, a, r),
                                      focus: u.focus,
                                      stops: u.stops.map((t) => ({
                                        offset: t.offset,
                                        color: tJ(n4([0, 0, 0], h, t.shade)),
                                        opacity: 1,
                                      })),
                                    },
                                    lines: [
                                      {
                                        d: s,
                                        color: f,
                                        width: c,
                                        opacity: 0.45,
                                      },
                                      {
                                        d: i,
                                        color: f,
                                        width: 1.8 * c,
                                        opacity: 0.8,
                                      },
                                    ],
                                  };
                                })(t, e, s, u, r, n)
                              : null,
                        };
                      })({ ...t, body: l.body }, e, n, r),
                      e,
                      a,
                      r.extent,
                    )
                  : (function (t, e, n = t.size) {
                      let a = t.sprite,
                        r = `${e}-body`,
                        l = `maskUnits="userSpaceOnUse" x="0" y="0" width="${a}" height="${a}"`,
                        o = (e) =>
                          t.eyes
                            .map((t) => `<path d="${t}" fill="${e}"/>`)
                            .join(""),
                        s = t.body.map((t) => `<path d="${t}"/>`).join(""),
                        i = `<g id="${r}">${s}</g>`,
                        h = "",
                        u = "";
                      t.eyes.length > 0 && null == t.eyeFill
                        ? ((i += `<mask id="${e}-holes" ${l}><rect width="${a}" height="${a}" fill="#fff"/>${o("#000")}</mask>`),
                          (h = ` mask="url(#${e}-holes)"`))
                        : t.eyes.length > 0 &&
                          null != t.eyeFill &&
                          ((i += `<mask id="${e}-inside" ${l}><use href="#${r}" fill="#fff"/></mask>`),
                          (u = `<g mask="url(#${e}-inside)">${o(t.eyeFill)}</g>`));
                      let f = "";
                      if (null != t.proof) {
                        i += `<clipPath id="${e}-solid">${s}</clipPath>`;
                        let n = t.proof.faces
                          .map((t) => `<path d="${t.d}" fill="${t.fill}"/>`)
                          .join("");
                        f = `<g clip-path="url(#${e}-solid)"${h}><use href="#${r}" fill="${t.proof.baseFill}"/>${n}</g>`;
                      } else if ("string" == typeof t.bodyFill)
                        f = `<use href="#${r}" fill="${t.bodyFill}"${h}/>`;
                      else {
                        let { cx: n, cy: a, r: l, stops: o } = t.bodyFill,
                          s = o
                            .map(
                              (t) =>
                                `<stop offset="${t.offset}" stop-color="${t.color}"/>`,
                            )
                            .join("");
                        ((i += `<radialGradient id="${e}-glow" gradientUnits="userSpaceOnUse" cx="${n}" cy="${a}" r="${l}">${s}</radialGradient>`),
                          (f = `<use href="#${r}" fill="url(#${e}-glow)"${h}/>`));
                      }
                      return `${tV(t.size, e, n)}<defs>${i}</defs><g transform="${t.transform}">${f}${u}</g></svg>`;
                    })(
                      (function (t, e, n, a = {}) {
                        var r, l, o, s, i, h, u, f;
                        let c,
                          p,
                          d,
                          M,
                          y,
                          x,
                          m,
                          g,
                          v,
                          b,
                          w,
                          k = Math.max(8, Math.round((n * t.zoom) / 0.71875)),
                          $ = Math.max(k, 144),
                          C = n$(t.quat, nC(n, t.zoom)),
                          { body: A, eyes: I } = nI(
                            t.body,
                            C,
                            $,
                            t.eyes,
                            t.inspect,
                          ),
                          [P, z, q, _] = nz(t, n, k, $),
                          F = `matrix(${nF(P)} 0 0 ${nF(z)} ${nF(q)} ${nF(_)})`,
                          B =
                            !0 === a.isProof
                              ? ((r = t.body),
                                (l = e.ink),
                                (M = (function (t) {
                                  let e = ne.get(t);
                                  if (null != e) return e;
                                  let n = (function (t, e) {
                                    var n, a, r, l, o, s;
                                    if ("inscribedBalls" === e.kind)
                                      return {
                                        kind: "balls",
                                        balls: (function (t) {
                                          let e = ni(t).map(([t, e]) => [
                                              114.2705 + 114.2705 * t,
                                              114.2705 - 114.2705 * e,
                                            ]),
                                            {
                                              x0: n,
                                              x1: a,
                                              y0: r,
                                              y1: l,
                                            } = ns(e),
                                            o = (t, n) => {
                                              let a = !1;
                                              for (
                                                let r = 0, l = e.length - 1;
                                                r < e.length;
                                                l = r++
                                              ) {
                                                let [o, s] = e[r],
                                                  [i, h] = e[l];
                                                s > n != h > n &&
                                                  t <
                                                    o +
                                                      ((i - o) * (n - s)) /
                                                        (h - s) &&
                                                  (a = !a);
                                              }
                                              return a;
                                            },
                                            s = Math.max(a - n, l - r) / 40,
                                            i = [];
                                          for (let t = r + s / 2; t < l; t += s)
                                            for (
                                              let r = n + s / 2;
                                              r < a;
                                              r += s
                                            ) {
                                              if (!o(r, t)) continue;
                                              let n = 1 / 0;
                                              for (let [a, l] of e)
                                                n = Math.min(
                                                  n,
                                                  (a - r) ** 2 + (l - t) ** 2,
                                                );
                                              let a = Math.sqrt(n);
                                              a > s &&
                                                i.push({ x: r, y: t, r: a });
                                            }
                                          i.sort((t, e) => e.r - t.r);
                                          let h = [];
                                          for (let t of i)
                                            h.some(
                                              (e) =>
                                                Math.hypot(
                                                  t.x - e.x,
                                                  t.y - e.y,
                                                ) +
                                                  t.r <=
                                                e.r + 0.25 * s,
                                            ) || h.push(t);
                                          return h.map((t) => ({
                                            center: [
                                              (t.x - 114.2705) / 114.2705,
                                              -(t.y - 114.2705) / 114.2705,
                                              0,
                                            ],
                                            radius: t.r / 114.2705,
                                          }));
                                        })(
                                          nn(
                                            (eR ??= {
                                              size: 1.17,
                                              silhouette: {
                                                kind: "solid",
                                                samples: eZ(eq("bean")),
                                                balls: [],
                                                isLoop: !0,
                                              },
                                              seat: null,
                                            }),
                                          )[0],
                                        ),
                                      };
                                    let i = nn(eL(t));
                                    switch (e.kind) {
                                      case "extrusion":
                                        return (function (t, e, n) {
                                          let a = t[0].length / 2,
                                            r = no(
                                              Array.from(
                                                { length: a },
                                                (e, n) => {
                                                  let r = t[2 + 4 * a + n];
                                                  return [r[0], r[1]];
                                                },
                                              ),
                                            ),
                                            {
                                              x0: l,
                                              x1: o,
                                              y0: s,
                                              y1: i,
                                            } = ns(r),
                                            h = (l + o) / 2,
                                            u = (s + i) / 2,
                                            f = Math.max(
                                              1e-4,
                                              Math.min(
                                                (o - l) / 2,
                                                (i - s) / 2,
                                              ),
                                            ),
                                            c = Math.min(0.8 * e, n),
                                            p = Array.from(
                                              { length: 5 },
                                              (t, n) => {
                                                let a;
                                                return {
                                                  z:
                                                    e -
                                                    c +
                                                    c *
                                                      Math.sin(
                                                        (a =
                                                          (n / 4) *
                                                          (Math.PI / 2)),
                                                      ),
                                                  scale:
                                                    1 -
                                                    (c / f) * (1 - Math.cos(a)),
                                                };
                                              },
                                            ),
                                            { vertices: d, faces: M } = na(
                                              [
                                                ...p
                                                  .map(
                                                    ({ z: t, scale: e }) => ({
                                                      z: -t,
                                                      scale: e,
                                                    }),
                                                  )
                                                  .reverse(),
                                                ...p,
                                              ].map(({ z: t, scale: e }) =>
                                                r.map(([n, a]) => [
                                                  h + (n - h) * e,
                                                  u + (a - u) * e,
                                                  t,
                                                ]),
                                              ),
                                              !0,
                                            ),
                                            y = M.length - 1;
                                          return {
                                            kind: "mesh",
                                            vertices: d,
                                            faces: M.map((t, e) => ({
                                              corners: t,
                                              isBounding: 0 === e || e === y,
                                            })),
                                          };
                                        })(i, e.halfDepth, e.bevel);
                                      case "revolve":
                                        return (function (t) {
                                          var e, n;
                                          let a,
                                            r,
                                            l,
                                            o = new Map();
                                          for (let [e, n] of t)
                                            e > -1e-9 &&
                                              o.set(
                                                n,
                                                Math.max(o.get(n) ?? 0, e),
                                              );
                                          let s = [],
                                            i = (t) => s.push(t) - 1,
                                            h = [...o]
                                              .sort((t, e) => e[0] - t[0])
                                              .map(([t, e]) =>
                                                e <= 1e-9
                                                  ? [i([0, t, 0])]
                                                  : Array.from(
                                                      { length: 64 },
                                                      (n, a) => {
                                                        let r = (a / 64) * e8;
                                                        return i([
                                                          e * Math.sin(r),
                                                          t,
                                                          e * Math.cos(r),
                                                        ]);
                                                      },
                                                    ),
                                              ),
                                            u = [h[0], h[h.length - 1]].filter(
                                              (t) => t.length > 1,
                                            );
                                          return (
                                            (e = s),
                                            (n = [
                                              ...u,
                                              ...h.slice(1).flatMap((t, e) => {
                                                var n, a;
                                                return (
                                                  (n = h[e]),
                                                  (a = t),
                                                  1 === n.length &&
                                                  1 === a.length
                                                    ? []
                                                    : 1 === n.length
                                                      ? a.map((t, e) => [
                                                          n[0],
                                                          t,
                                                          a[(e + 1) % a.length],
                                                        ])
                                                      : 1 === a.length
                                                        ? n.map((t, e) => [
                                                            t,
                                                            a[0],
                                                            n[
                                                              (e + 1) % n.length
                                                            ],
                                                          ])
                                                        : n.map((t, e) => [
                                                            t,
                                                            a[e],
                                                            a[
                                                              (e + 1) % a.length
                                                            ],
                                                            n[
                                                              (e + 1) % n.length
                                                            ],
                                                          ])
                                                );
                                              }),
                                            ]),
                                            (a = e.length),
                                            (r = [
                                              e.reduce((t, e) => t + e[0], 0) /
                                                a,
                                              e.reduce((t, e) => t + e[1], 0) /
                                                a,
                                              e.reduce((t, e) => t + e[2], 0) /
                                                a,
                                            ]),
                                            (l = n.map((t) => {
                                              let [n, a, l] = nl(e, t),
                                                o = t.reduce(
                                                  (t, n) => [
                                                    t[0] + e[n][0],
                                                    t[1] + e[n][1],
                                                    t[2] + e[n][2],
                                                  ],
                                                  [0, 0, 0],
                                                ),
                                                s = t.length;
                                              return {
                                                corners:
                                                  n * (o[0] / s - r[0]) +
                                                    a * (o[1] / s - r[1]) +
                                                    l * (o[2] / s - r[2]) <
                                                  0
                                                    ? [...t].reverse()
                                                    : t,
                                                isBounding: !0,
                                              };
                                            })),
                                            {
                                              kind: "mesh",
                                              vertices: e,
                                              faces: l,
                                            }
                                          );
                                        })(ni(i[0]));
                                      case "roundedSlab":
                                        let h, u, f;
                                        return (
                                          (a =
                                            ((n = ni(i[0])),
                                            Array.from(
                                              { length: 96 },
                                              (t, e) => {
                                                let a = (e / 96) * e8,
                                                  r = Math.cos(a),
                                                  l = -Math.sin(a),
                                                  o = 0;
                                                return (
                                                  n.forEach((t, e) => {
                                                    let a =
                                                        n[(e + 1) % n.length],
                                                      s = a[0] - t[0],
                                                      i = a[1] - t[1],
                                                      h = r * i - l * s;
                                                    if (1e-15 > Math.abs(h))
                                                      return;
                                                    let u =
                                                        (t[0] * i - t[1] * s) /
                                                        h,
                                                      f =
                                                        (t[0] * l - t[1] * r) /
                                                        h;
                                                    u > o &&
                                                      f >= -1e-9 &&
                                                      f <= 1.000000001 &&
                                                      (o = u);
                                                  }),
                                                  [r * o, l * o]
                                                );
                                              },
                                            ))),
                                          (r = e.halfDepth),
                                          (l = e.edge),
                                          (h = a.length),
                                          (u = a.map((t, e) => {
                                            let n = a[(e - 1 + h) % h],
                                              r = a[(e + 1) % h],
                                              l = r[1] - n[1],
                                              o = -(r[0] - n[0]),
                                              s = Math.hypot(l, o) || 1;
                                            return (
                                              (l /= s),
                                              (o /= s),
                                              l * t[0] + o * t[1] < 0
                                                ? [-l, -o]
                                                : [l, o]
                                            );
                                          })),
                                          (f = []),
                                          a.forEach(([t, e], n) => {
                                            for (let a = 0; a <= 4; a++) {
                                              let o = (a / 4) * (Math.PI / 2),
                                                s = l * (1 - Math.cos(o)),
                                                i = r - l + l * Math.sin(o),
                                                h = t - u[n][0] * s,
                                                c = e - u[n][1] * s;
                                              f.push([h, c, i], [h, c, -i]);
                                            }
                                          }),
                                          nr(f)
                                        );
                                      case "pill":
                                        let c, p;
                                        return {
                                          kind: "balls",
                                          balls:
                                            ((o = ni(i[0])),
                                            (s = e.axis),
                                            (c = Math.max(
                                              ...o.map((t) =>
                                                Math.abs(t[1 - s]),
                                              ),
                                            )),
                                            (p =
                                              Math.max(
                                                ...o.map((t) => Math.abs(t[s])),
                                              ) - c),
                                            Array.from(
                                              { length: 33 },
                                              (t, e) => {
                                                let n = -p + 2 * p * (e / 32);
                                                return {
                                                  center:
                                                    0 === s
                                                      ? [n, 0, 0]
                                                      : [0, n, 0],
                                                  radius: c,
                                                };
                                              },
                                            )),
                                        };
                                      case "crystal":
                                        return (function () {
                                          let t = [
                                            [0, 1.04, 0],
                                            [0, -1.04, 0],
                                          ];
                                          for (let e of [-1, 1])
                                            for (let n = 0; n < 6; n++) {
                                              let a = (n / 6) * e8;
                                              t.push([
                                                0.52 * Math.cos(a),
                                                0.51 * e,
                                                0.52 * Math.sin(a),
                                              ]);
                                            }
                                          let e = [];
                                          for (let [n, a, r] of t)
                                            for (let t = 0; t <= 8; t++) {
                                              let l = (t / 8) * Math.PI,
                                                o = Math.sin(l),
                                                s = 0 === t || 8 === t ? 1 : 14;
                                              for (let t = 0; t < s; t++) {
                                                let i = (t / s) * e8;
                                                e.push([
                                                  n + 0.12 * o * Math.sin(i),
                                                  a + 0.12 * Math.cos(l),
                                                  r + 0.12 * o * Math.cos(i),
                                                ]);
                                              }
                                            }
                                          return nr(e);
                                        })();
                                      case "loft":
                                        return (function (t, e) {
                                          let n = no(t),
                                            {
                                              x0: a,
                                              x1: r,
                                              y0: l,
                                              y1: o,
                                            } = ns(n),
                                            s = (a + r) / 2,
                                            i = (l + o) / 2,
                                            { vertices: h, faces: u } = na(
                                              Array.from(
                                                { length: 17 },
                                                (t, a) => {
                                                  let r =
                                                      -Math.PI / 2 +
                                                      (Math.PI * a) / 16,
                                                    l = Math.pow(
                                                      Math.max(0, Math.cos(r)),
                                                      0.72,
                                                    ),
                                                    o = e * Math.sin(r);
                                                  return n.map(([t, e]) => [
                                                    s + (t - s) * l,
                                                    i + (e - i) * l,
                                                    o,
                                                  ]);
                                                },
                                              ),
                                              !1,
                                            );
                                          return {
                                            kind: "mesh",
                                            vertices: h,
                                            faces: u.map((t) => ({
                                              corners: t,
                                              isBounding: !1,
                                            })),
                                          };
                                        })(ni(i[0]), e.depth);
                                    }
                                  })(t, e9[t]);
                                  return (ne.set(t, n), n);
                                })(r)),
                                (y = (function (t) {
                                  let [e, n] = [
                                      Math.cos(t.yaw * nm),
                                      Math.sin(t.yaw * nm),
                                    ],
                                    [a, r] = [
                                      Math.cos(t.pitch * nm),
                                      Math.sin(t.pitch * nm),
                                    ],
                                    [l, o] = [
                                      Math.cos(t.roll * nm),
                                      Math.sin(t.roll * nm),
                                    ];
                                  return ([t, s, i]) => {
                                    let h = t * e + i * n,
                                      u = i * e - t * n,
                                      f = s * a - u * r;
                                    return [
                                      h * l - f * o,
                                      h * o + f * l,
                                      s * r + u * a,
                                    ];
                                  };
                                })(C)),
                                (x = e0(eL(r), $)),
                                (m = $ / 2),
                                (g = l.map((t) => t + (1 - t) * 0.4)),
                                (v = (t) => {
                                  var e;
                                  let n =
                                    0.18 +
                                    0.8200000000000001 *
                                      Math.max(
                                        0,
                                        t[0] * nM[0] +
                                          t[1] * nM[1] +
                                          t[2] * nM[2],
                                      );
                                  return (
                                    (e = g.map((t) => t * n)),
                                    `#${e
                                      .map((t) =>
                                        Math.round(
                                          255 * Math.min(1, Math.max(0, t)),
                                        )
                                          .toString(16)
                                          .padStart(2, "0"),
                                      )
                                      .join("")}`
                                  );
                                }),
                                (b = (t) => [m + x * t[0], m - x * t[1]]),
                                (w =
                                  "mesh" === M.kind
                                    ? (function (t, e, n, a) {
                                        let r = t.vertices.map(e),
                                          l = [],
                                          o = new Map();
                                        for (let e of t.faces) {
                                          let [t, s, i] = nl(r, e.corners),
                                            h = Math.hypot(t, s, i);
                                          if (0 === h || i <= 1e-9 * h)
                                            continue;
                                          let u = a([t / h, s / h, i / h]),
                                            f = e.corners.flatMap((t) =>
                                              n(r[t]),
                                            );
                                          if (e.isBounding) {
                                            ng(o, u, f);
                                            continue;
                                          }
                                          let c =
                                            e.corners.reduce(
                                              (t, e) => t + r[e][2],
                                              0,
                                            ) / e.corners.length;
                                          l.push({
                                            polygon: f,
                                            fill: u,
                                            depth: c,
                                          });
                                        }
                                        return (
                                          l.sort((t, e) => t.depth - e.depth),
                                          [
                                            ...(function (t) {
                                              let e = [],
                                                n = 0;
                                              for (
                                                let a = 1;
                                                a <= t.length;
                                                a++
                                              )
                                                (a < t.length &&
                                                  t[a].fill === t[n].fill) ||
                                                  (e.push(
                                                    nv(
                                                      t
                                                        .slice(n, a)
                                                        .map((t) => t.polygon),
                                                      t[n].fill,
                                                    ),
                                                  ),
                                                  (n = a));
                                              return e;
                                            })(l),
                                            ...[...o].map(([t, e]) => nv(e, t)),
                                          ]
                                        );
                                      })(M, y, b, v)
                                    : ((o = M.balls),
                                      (s = y),
                                      (i = b),
                                      (h = x),
                                      (u = v),
                                      (p = (c = o.map((t) => ({
                                        center: s(t.center),
                                        radius: t.radius,
                                      })))
                                        .map((t, e) => e)
                                        .sort(
                                          (t, e) =>
                                            c[t].center[2] +
                                            c[t].radius -
                                            (c[e].center[2] + c[e].radius),
                                        )),
                                      (d = 0.004 / h),
                                      p.flatMap((t) => {
                                        var e;
                                        let { center: n, radius: a } = c[t],
                                          r = c.filter(
                                            (e, n) =>
                                              n !== t && c[n].radius > d,
                                          ),
                                          l = (t) =>
                                            r.some((e) =>
                                              t.every((t) => {
                                                var n, a;
                                                return (
                                                  (n = t),
                                                  (a = e.center),
                                                  (n[0] - a[0]) ** 2 +
                                                    (n[1] - a[1]) ** 2 +
                                                    (n[2] - a[2]) ** 2 <
                                                    (e.radius - d) ** 2
                                                );
                                              }),
                                            ),
                                          o = (t, e) => [
                                            n[0] +
                                              a * Math.sin(t) * Math.cos(e),
                                            n[1] +
                                              a * Math.sin(t) * Math.sin(e),
                                            n[2] + a * Math.cos(t),
                                          ],
                                          s =
                                            (e = a * h) <= 0.004
                                              ? 1
                                              : Math.max(
                                                  1,
                                                  Math.ceil(
                                                    (2 * Math.PI) /
                                                      24 /
                                                      (2 *
                                                        Math.acos(
                                                          1 - 0.004 / e,
                                                        )),
                                                  ),
                                                ),
                                          f = new Map();
                                        for (let t = 0; t < 6; t++) {
                                          let e = (t / 6) * (Math.PI / 2),
                                            n = ((t + 1) / 6) * (Math.PI / 2),
                                            a = 5 === t ? s : 1;
                                          for (let r = 0; r < 24; r++) {
                                            let s = (r / 24) * 2 * Math.PI,
                                              h = ((r + 1) / 24) * 2 * Math.PI,
                                              c = [
                                                ...(0 === t
                                                  ? [o(0, 0)]
                                                  : [o(e, s)]),
                                                ...Array.from(
                                                  { length: a + 1 },
                                                  (t, e) =>
                                                    o(n, s + ((h - s) * e) / a),
                                                ),
                                                ...(0 === t ? [] : [o(e, h)]),
                                              ];
                                            if (l(c)) continue;
                                            let p = (e + n) / 2,
                                              d = (s + h) / 2;
                                            ng(
                                              f,
                                              u([
                                                Math.sin(p) * Math.cos(d),
                                                Math.sin(p) * Math.sin(d),
                                                Math.cos(p),
                                              ]),
                                              c.flatMap(i),
                                            );
                                          }
                                        }
                                        return [...f].map(([t, e]) => nv(e, t));
                                      }))),
                                { baseFill: v([0, 0, 1]), faces: w })
                              : null;
                        if (null != t.glow) {
                          let e,
                            a =
                              ((f = t.glow),
                              {
                                cx: (e = $ / 2),
                                cy: e,
                                r: e,
                                stops: [
                                  { offset: 0, color: n_(f.inner) },
                                  {
                                    offset: 0.42 + 0.16 * f.midT,
                                    color: n_(f.mid),
                                  },
                                  { offset: 0.93, color: n_(f.rim) },
                                  { offset: 1, color: n_(f.rim) },
                                ],
                              });
                          return {
                            size: n,
                            sprite: $,
                            transform: F,
                            body: A,
                            bodyFill: a,
                            eyes: [],
                            eyeFill: null,
                            proof: B,
                          };
                        }
                        let Y = e.cutout ? null : tQ(e),
                          R = null == t.eyes ? [] : I;
                        return {
                          size: n,
                          sprite: $,
                          transform: F,
                          body: A,
                          bodyFill: tK(e),
                          eyes: R,
                          eyeFill: Y,
                          proof: B,
                        };
                      })(
                        { ...t, body: l.body, inspect: t.inspectWeight },
                        e,
                        n,
                        r,
                      ),
                      a,
                      r.extent,
                    );
            });
export const updateSvg = (function (t, e) {
                var n, a;
                let r = e.split('"'),
                  l = aA.get(t),
                  o =
                    null != l && t.firstChild === l.root
                      ? (function (t, e) {
                          if (t.length !== e.length) return null;
                          let n = [];
                          for (let a = 0; a < e.length; a++)
                            if (e[a] !== t[a]) {
                              if (a % 2 == 0 || e[a].includes("&")) return null;
                              n.push(a);
                            }
                          return n;
                        })(l.parts, r)
                      : null;
                if (null != l && null != o) {
                  for (let t of o) l.slots[(t - 1) / 2].value = r[t];
                  l.parts = r;
                  return;
                }
                t.innerHTML = e;
                let s = [...t.querySelectorAll("*")].flatMap((t) => [
                  ...t.attributes,
                ]);
                ((n = s),
                (a = r).length === 2 * n.length + 1 &&
                  n.every(
                    (t, e) =>
                      a[2 * e].endsWith(` ${t.name}=`) &&
                      t.value === a[2 * e + 1],
                  ))
                  ? aA.set(t, { root: t.firstChild, slots: s, parts: r })
                  : aA.delete(t);
              });
export {tI as pointerGaze};
