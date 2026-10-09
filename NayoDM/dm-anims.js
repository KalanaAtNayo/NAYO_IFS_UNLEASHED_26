// NayoDM demo animations (NayoDM light palette).
(function () {

const e = React.createElement;
const C = { ink:'#1E0B2E', ink2:'#54446A', mute:'#75678A', line:'#CDBFE0', soft:'#F1EBF8', white:'#FFFFFF', teal:'#007F67', tealL:'#D9F3EC', green:'#3F7A0A', greenL:'#E4F0D8', amber:'#A85F00', amberL:'#F8EBD6', red:'#B3261E', redL:'#F9E1DE' };
const F = "Barlow, 'Helvetica Neue', Arial, sans-serif", M = "'IBM Plex Mono', ui-monospace, Menlo, monospace";
const cl = x => x < 0 ? 0 : x > 1 ? 1 : x;
const ph = (t, a, b) => cl((t - a) / (b - a));
const eo = x => 1 - Math.pow(1 - x, 3);
const lerp = (a, b, p) => a + (b - a) * p;
const vis = (t, a, b) => ph(t, a, a + 0.35) * (1 - ph(t, b - 0.35, b));
const kk = k => k.flat(Infinity).filter(x => x != null && x !== false).map((x, i) => React.isValidElement(x) && x.key == null ? React.cloneElement(x, { key: i }) : x);
const G = (o, ...k) => e('g', o, ...kk(k));
const Svg = (w, h, ...k) => e('svg', { viewBox: `0 0 ${w} ${h}`, width: '100%', height: '100%', preserveAspectRatio: 'xMidYMid meet', style: { display: 'block' } }, ...kk(k));
const T = (x, y, s, o = {}) => e('text', { x, y, fontFamily: o.m ? M : F, fontSize: o.s || 14, fill: o.f || C.ink, fontWeight: o.w || 400, textAnchor: o.a || 'start', dominantBaseline: 'central', opacity: o.o == null ? 1 : o.o }, s);
const R = (x, y, w, h, o = {}) => e('rect', { x, y, width: Math.max(0, w), height: Math.max(0, h), rx: o.r == null ? 6 : o.r, fill: o.f || 'none', stroke: o.st || 'none', strokeWidth: o.sw || 1, strokeDasharray: o.d, opacity: o.o == null ? 1 : o.o });
const Check = (x, y, c, sc = 1, o = 1) => e('path', { d: 'M-5 0 L-1.5 4 L5.5 -4', transform: `translate(${x},${y}) scale(${sc})`, stroke: c, strokeWidth: 2.2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', opacity: o });
const Spin = (x, y, t, c) => e('circle', { cx: 0, cy: 0, r: 7, fill: 'none', stroke: c, strokeWidth: 2, strokeDasharray: '28 16', transform: `translate(${x},${y}) rotate(${(t * 420) % 360})` });
const Chrome = (W, H, title) => G({}, R(0, 0, W, H, { f: C.white, r: 0 }), R(0, 0, W, 40, { f: C.soft, r: 0 }), e('line', { x1: 0, y1: 40.5, x2: W, y2: 40.5, stroke: C.line }), [0, 1, 2].map(i => e('circle', { cx: 22 + i * 16, cy: 20, r: 5, fill: C.line })), T(W / 2, 20, title, { s: 13, w: 600, a: 'middle', f: C.ink2 }));
const Caption = (W, H, t, list) => G({}, R(0, H - 44, W, 44, { f: C.soft, r: 0 }), e('line', { x1: 0, y1: H - 44.5, x2: W, y2: H - 44.5, stroke: C.line }), list.map(([a, b, s]) => { const o = vis(t, a, b); return o > 0 ? T(W / 2, H - 22, s, { s: 16, w: 500, a: 'middle', o }) : null; }));
const Chip = (x, y, s, o = {}) => { const w = s.length * 7.1 + 22; return G({ opacity: o.o == null ? 1 : o.o }, R(x, y - 12, w, 24, { f: o.f || C.white, st: o.st, d: o.d, r: 12 }), T(x + 11, y, s, { s: 11.5, m: 1, f: o.c || C.ink })); };
const Cur = (x, y, o = 1) => o <= 0 ? null : G({ transform: `translate(${x},${y})`, opacity: o }, e('path', { d: 'M0 0 L0 19 L5 14.5 L8.5 22 L11.8 20.6 L8.3 13.2 L14.5 13.2 Z', fill: C.ink, stroke: C.white, strokeWidth: 1.5, strokeLinejoin: 'round' }));
const Ripple = (x, y, t, tc) => { const p = ph(t, tc, tc + 0.5); return p > 0 && p < 1 ? e('circle', { cx: x, cy: y, r: 4 + 18 * p, fill: 'none', stroke: C.teal, strokeWidth: 2, opacity: 1 - p }) : null; };
const path = (t, k) => { if (t <= k[0][0]) return [k[0][1], k[0][2]]; for (let i = 0; i < k.length - 1; i++) if (t < k[i + 1][0]) { const p = eo(ph(t, k[i][0], k[i + 1][0])); return [lerp(k[i][1], k[i + 1][1], p), lerp(k[i][2], k[i + 1][2], p)]; } const l = k[k.length - 1]; return [l[1], l[2]]; };
const ST = { Released: [C.amberL, C.amber], Picked: [C.tealL, C.teal], Shipped: [C.greenL, C.green], Delivered: [C.greenL, C.green], Open: [C.amberL, C.amber], Paid: [C.greenL, C.green], Planned: [C.soft, C.ink2] };
const Status = (x, y, s, o) => Chip(x, y, s, { f: ST[s][0], c: ST[s][1], o });

function useClock(dur, still) {
  const [t, setT] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) { setT(still); return; }
    let raf, on = true, last = performance.now(), acc = 0;
    const io = new IntersectionObserver(es => { on = es[0].isIntersecting; });
    if (ref.current) io.observe(ref.current);
    const loop = now => { const dt = Math.min(0.1, (now - last) / 1000); last = now; if (on) { acc = (acc + dt) % dur; setT(acc); } raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [dur]);
  return [t, ref];
}
const Frame = (ref, svg) => e('div', { ref, style: { width: '100%', height: '100%' } }, svg);

function HeroAnim() {
  const [t, ref] = useClock(12, 4);
  const W = 1280, H = 720;
  const bez = (p, s) => { const u = 1 - s; return [0, 1].map(j => u*u*u*p[0][j] + 3*u*u*s*p[1][j] + 3*u*s*s*p[2][j] + s*s*s*p[3][j]); };
  const src = [['Excel', 'File', 110], ['CSV', 'File', 240], ['IFS IEE', 'Live connection', 370], ['IFS Cloud', 'Live connection', 500]];
  const paths = src.map(s => [[300, s[2] + 40], [400, s[2] + 40], [390, 340], [490, 340]]).concat([[[790, 340], [860, 340], [910, 340], [980, 340]]]);
  const d = p => `M${p[0]} C${p[1]} ${p[2]} ${p[3]}`;
  const node = (x, y, w, h, title, sub, acc) => G({}, R(x, y, w, h, { f: C.white, st: acc ? C.teal : C.line, sw: acc ? 2 : 1, r: 12 }), T(x + 22, y + h / 2 - 12, title, { s: 21, w: 600 }), T(x + 22, y + h / 2 + 14, sub, { s: 12.5, m: 1, f: C.mute }));
  const labels = ['Sources', 'Mapping', 'Pre-flight', 'Load', 'Documents', 'Workflows'];
  const cw = 170, gap = 16, x0 = (W - (cw * 6 + gap * 5)) / 2;
  return Frame(ref, Svg(W, H,
    R(0, 0, W, H, { f: C.soft, r: 0 }),
    paths.map(p => e('path', { d: d(p), stroke: C.line, strokeWidth: 2, fill: 'none' })),
    paths.map(p => [0, 1, 2].map(k => { const s = ((t / 2.4) + k / 3) % 1; const [x, y] = bez(p, s); return e('circle', { cx: x, cy: y, r: 5, fill: C.teal, opacity: Math.sin(Math.PI * s) }); })),
    src.map(s => node(80, s[2], 220, 80, s[0], s[1])),
    node(980, 294, 220, 92, 'IFS Cloud', 'Target', true),
    R(490, 270, 300, 140, { f: C.white, st: C.line, sw: 1.5, r: 16 }), e('image', { href: 'assets/nayodm-logo.svg', x: 530, y: 300, width: 220, height: 80, preserveAspectRatio: 'xMidYMid meet' }),
    labels.map((l, i) => { const x = x0 + i * (cw + gap); const a = vis(t, i * 2, i * 2 + 2); return G({}, R(x, 620, cw, 56, { f: C.white, st: C.line, r: 28 }), R(x, 620, cw, 56, { f: C.ink, r: 28, o: a }), T(x + cw / 2, 648, l, { s: 17, w: 600, a: 'middle', f: C.ink2, o: 1 - a }), T(x + cw / 2, 648, l, { s: 17, w: 600, a: 'middle', f: C.white, o: a })); })
  ));
}

function ChallengeAnim() {
  const [t, ref] = useClock(14, 12.8);
  const W = 1200, H = 480;
  const rows = ['C1001 · Nordic Tools', 'C1002 · Baltic Steel', 'C1003 · Harbor Supply', 'C1004 · Apex Parts', 'C1005 · Northwind', 'C1006 · Fjord Marine'];
  const starts = [0.6, 3.1, 5.6], fails = [[1, 3, 4], [3, 4], [4]];
  const a = 1 - ph(t, 8.2, 8.6), b = ph(t, 8.4, 8.9);
  const tok = (x, y, s, col, o = 1) => G({ opacity: o }, R(x, y - 12, 120, 24, { f: col === 'r' ? C.redL : col === 'g' ? C.greenL : C.white, st: col === 'r' ? C.red : col === 'g' ? C.green : C.line, r: 12 }), T(x + 60, y, s, { s: 11.5, m: 1, a: 'middle', f: col === 'r' ? C.red : col === 'g' ? C.green : C.ink }));
  const ry = i => 130 + i * 40;
  const attempt = starts.findIndex((s, k) => t >= s && t < (starts[k + 1] || 8.2));
  const done = t > 12.6;
  return Frame(ref, Svg(W, H,
    R(0, 0, W, H, { f: C.soft, r: 0 }),
    R(60, 70, 300, 300, { f: C.white, st: C.line, r: 14 }), T(82, 98, 'customers.xlsx', { s: 17, w: 600 }),
    rows.map((r, i) => T(82, ry(i), r, { s: 13, f: C.ink2 })),
    R(840, 70, 300, 300, { f: C.white, st: done ? C.teal : C.line, sw: done ? 2 : 1, r: 14 }), T(862, 98, 'IFS Cloud', { s: 17, w: 600 }),
    a > 0 ? G({ opacity: a },
      attempt >= 0 ? Chip(536, 100, `Attempt ${attempt + 1}`, { f: C.amberL, c: C.amber }) : null,
      starts.map((s, k) => rows.map((r, i) => {
        if (t < s || t > s + 2.3) return null;
        const p = eo(ph(t, s + i * 0.08, s + 1 + i * 0.08)), f = fails[k].includes(i);
        let x = lerp(370, 710, p), col = 'w', o = 1;
        if (f && t > s + 1.1) { col = 'r'; x = lerp(710, 370, eo(ph(t, s + 1.3, s + 2))); }
        if (!f) o = 1 - ph(t, s + 1.2 + i * 0.08, s + 1.5 + i * 0.08);
        return tok(x, ry(i), r.slice(0, 5), col, o);
      })),
      starts.map((s, k) => { const o = vis(t, s + 1.2, s + 2.5); return o > 0 ? G({ opacity: o }, Chip(862, 330, `${fails[k].length} rejected`, { f: C.redL, c: C.red })) : null; })
    ) : null,
    b > 0 ? G({ opacity: b },
      R(480, 90, 240, 270, { f: C.white, st: C.teal, sw: 2, r: 16 }), e('image', { href: 'assets/nayodm-logo.svg', x: 510, y: 100, width: 180, height: 50, preserveAspectRatio: 'xMidYMid meet' }),
      rows.map((r, i) => {
        if (t < 9) return null;
        const flag = i === 1 || i === 4, p1 = eo(ph(t, 9 + i * 0.06, 9.8 + i * 0.06)), p2 = eo(ph(t, 11.4 + i * 0.06, 12.4 + i * 0.06));
        const x = t < 11.4 ? lerp(370, 540, p1) : lerp(540, 870, p2), y = t < 11.4 ? lerp(ry(i), 172 + i * 30, p1) : lerp(172 + i * 30, ry(i), p2);
        const col = flag && t > 10.2 && t < 11 ? 'r' : t > 11 ? 'g' : 'w';
        return tok(x, y, r.slice(0, 5), col, 1 - ph(t, 12.5, 12.8));
      }),
      G({ opacity: vis(t, 10.2, 11.1) }, T(600, 340, '2 rows to fix first', { s: 13, w: 600, a: 'middle', f: C.red })),
      done ? G({ opacity: ph(t, 12.6, 13) }, Check(874, 200, C.green, 1.4), T(894, 200, '6 of 6 loaded', { s: 18, w: 600, f: C.green }), T(862, 232, 'In one attempt', { s: 14, f: C.ink2 })) : null
    ) : null,
    Caption(W, H, t, [[0, 5.4, 'Load straight into IFS, and errors only show up there.'], [5.4, 8.4, 'Fix, reload, repeat. Every round costs days.'], [8.4, 14, 'NayoDM checks first, so you load once.']])
  ));
}

function SourcesAnim() {
  const [t, ref] = useClock(13, 11);
  const W = 640, H = 480;
  const src = [['Excel', 'File', 'Customers', 12480], ['CSV', 'File', 'Parts', 48200], ['IFS IEE', 'Live connection', 'Open orders', 3412], ['IFS Cloud', 'Live connection', 'Suppliers', 860]];
  const steps = ['Map', 'Check', 'Load'];
  const fmt = n => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return Frame(ref, Svg(W, H,
    Chrome(W, H, 'NayoDM · Choose a source'),
    src.map((s, i) => {
      const x = 24 + (i % 2) * 304, y = 56 + Math.floor(i / 2) * 116, st = 0.5 + i * 1.5, on = t > st, p = eo(ph(t, st + 0.2, st + 1.1));
      return G({}, R(x, y, 288, 100, { f: on ? C.white : C.soft, st: on && t < st + 1.5 ? C.teal : C.line, sw: on && t < st + 1.5 ? 2 : 1, r: 10 }),
        Chip(x + 16, y + 24, s[1], { f: i < 2 ? C.soft : C.tealL, c: i < 2 ? C.ink2 : C.teal }),
        T(x + 16, y + 58, s[0], { s: 20, w: 600 }),
        on ? T(x + 16, y + 82, `${s[2]} · ${fmt(s[3] * p)} rows`, { s: 13, m: 1, f: C.ink2, o: ph(t, st + 0.2, st + 0.5) }) : null);
    }),
    G({ opacity: ph(t, 6.8, 7.3) },
      e('path', { d: 'M168 288 V300 H472 V288 M320 300 V316', stroke: C.line, strokeWidth: 2, fill: 'none' }),
      steps.map((s, i) => { const x = 82 + i * 163, on = t > 7.8 + i * 1; return G({}, R(x, 316, 150, 44, { f: on ? C.ink : C.white, st: on ? C.ink : C.line, r: 22 }), T(x + 75, 338, s, { s: 16, w: 600, a: 'middle', f: on ? C.white : C.ink2 }), i < 2 ? e('path', { d: `M${x + 154} 338 h8`, stroke: C.line, strokeWidth: 2 }) : null); })
    ),
    Caption(W, H, t, [[0, 3.4, 'Pick a file, or connect to IFS directly.'], [3.4, 6.8, 'You see how many records there are before you start.'], [6.8, 13, 'Then the same steps for every source.']])
  ));
}

function MappingAnim() {
  const [t, ref] = useClock(14, 12);
  const W = 640, H = 480;
  const rows = [['CUST_NO', '4471', 'pad to 10', 'CustomerId', '0000004471'], ['NAME', 'Nordic Tools', 'copy', 'Name', 'Nordic Tools'], ['GRP', 'A', 'lookup', 'CustGroup', '10'], ['CREATED', '03/09/21', 'date format', 'CreationDate', '2021-09-03'], [null, '', 'default', 'Language', 'en']];
  const box = (x, y, name, val, o = {}) => G({}, R(x, y - 23, 150, 46, { f: C.white, st: o.st || C.line, sw: o.sw || 1, d: o.d, r: 8 }), T(x + 12, y - 9, name, { s: 11, m: 1, f: C.mute }), val ? T(x + 12, y + 10, val, { s: 14, w: 500, m: o.m, o: o.vo == null ? 1 : o.vo }) : null);
  return Frame(ref, Svg(W, H,
    Chrome(W, H, 'NayoDM · Mapping'),
    T(24, 58, 'OLD SYSTEM', { s: 11, m: 1, f: C.mute }), T(616, 58, 'IFS CLOUD', { s: 11, m: 1, f: C.mute, a: 'end' }),
    rows.map((r, i) => {
      const y = 98 + i * 66, s = 0.6 + i * 0.9, p = eo(ph(t, s, s + 0.6)), cw = r[2].length * 7.1 + 22, cx = 320 - cw / 2;
      const vo = ph(t, 6 + i * 0.5, 6.4 + i * 0.5);
      return G({},
        r[0] ? box(24, y, r[0], r[1]) : box(24, y, 'no column', '', { d: '4 4' }),
        p > 0 ? [e('line', { x1: 174, y1: y, x2: lerp(174, cx, p), y2: y, stroke: C.teal, strokeWidth: 2, opacity: r[0] ? 1 : 0 }), e('line', { x1: cx + cw, y1: y, x2: lerp(cx + cw, 466, p), y2: y, stroke: C.teal, strokeWidth: 2 })] : null,
        Chip(cx, y, r[2], { f: C.tealL, c: C.teal, o: ph(t, s + 0.3, s + 0.6) }),
        box(466, y, r[3], r[4], { st: vo > 0.5 ? C.teal : C.line, vo, m: i === 0 || i === 3 ? 1 : 0 })
      );
    }),
    Caption(W, H, t, [[0, 5.6, 'Link each old column to an IFS field.'], [5.6, 9.6, 'Rules fix the value on the way in.'], [9.6, 14, 'No coding. Just pick a rule.']])
  ));
}

function PreflightAnim() {
  const [t, ref] = useClock(15, 13);
  const W = 640, H = 480;
  const p = eo(ph(t, 0.5, 3.6));
  const fmt = n => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const checks = [['Delivery term', 'EXW', 1], ['Delivery term', 'EXW2', 0], ['Customer group', '10', 1], ['Customer group', '45', 0]];
  const stats = [['OK', '148 171', C.greenL, C.green], ['Warnings', '112', C.amberL, C.amber], ['Errors', '37', C.redL, C.red]];
  return Frame(ref, Svg(W, H,
    Chrome(W, H, 'NayoDM · Pre-flight'),
    R(24, 54, 592, 140, { f: C.white, st: C.line, r: 10 }),
    T(44, 78, 'PASS 1 · ROW RULES', { s: 11, m: 1, f: C.mute }), T(596, 78, `${fmt(148320 * p)} / 148 320 rows`, { s: 12, m: 1, a: 'end', f: C.ink2 }),
    R(44, 96, 552, 10, { f: C.soft, r: 5 }), R(44, 96, 552 * p, 10, { f: C.teal, r: 5 }),
    stats.map((s, i) => { const o = ph(t, 3.8 + i * 0.3, 4.2 + i * 0.3); return G({ opacity: o }, R(44 + i * 188, 122, 176, 54, { f: s[2], r: 8 }), T(60 + i * 188, 140, s[0], { s: 12, f: s[3] }), T(60 + i * 188, 161, s[1], { s: 18, w: 700, m: 1, f: s[3] })); }),
    G({ opacity: ph(t, 5.4, 5.8) },
      R(24, 208, 592, 216, { f: C.white, st: C.line, r: 10 }),
      T(44, 232, 'PASS 2 · DOES THE VALUE EXIST IN IFS?', { s: 11, m: 1, f: C.mute }),
      checks.map((c, i) => { const y = 262 + i * 34, s = 6 + i * 0.8; if (t < s) return null; const res = t > s + 0.6; return G({ opacity: ph(t, s, s + 0.2) }, T(44, y, c[0], { s: 14, f: C.ink2 }), T(220, y, c[1], { s: 14, m: 1, w: 600 }), !res ? Spin(560, y, t, C.mute) : c[2] ? Chip(526, y, 'Found', { f: C.greenL, c: C.green }) : Chip(518, y, 'Missing', { f: C.redL, c: C.red })); }),
      G({ opacity: ph(t, 10, 10.4) }, R(44, 386, 552, 28, { f: C.amberL, r: 6 }), T(60, 400, 'Create in IFS first:  EXW2 · 45', { s: 13.5, w: 600, f: C.amber }))
    ),
    Caption(W, H, t, [[0, 5.6, 'Pass 1 checks every row for missing or wrong values.'], [5.6, 10, 'Pass 2 checks the values exist in IFS.'], [10, 15, 'You get a short list to fix, before the load.']])
  ));
}

function LoadAnim() {
  const [t, ref] = useClock(14, 12);
  const W = 640, H = 480, N = 160;
  const p = t < 5 ? 0.6 * eo(ph(t, 0.4, 5)) : t < 7.6 ? 0.6 : 0.6 + 0.4 * ph(t, 7.6, 11.2);
  const filled = Math.floor(p * N + 1e-6), stopped = t > 5 && t < 7.6, end = t > 11.3;
  const fmt = n => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return Frame(ref, Svg(W, H,
    Chrome(W, H, 'NayoDM · Inventory balances'),
    T(24, 62, 'BATCHES', { s: 11, m: 1, f: C.mute }), T(616, 62, '1 240 000 rows', { s: 12, m: 1, a: 'end', f: C.ink2 }),
    Array.from({ length: N }, (_, i) => { const x = 24 + (i % 20) * 29.6, y = 78 + Math.floor(i / 20) * 22; const cur = i === filled && !end; return R(x, y, 26, 18, { f: i < filled ? C.teal : cur ? (stopped ? C.redL : C.amberL) : C.soft, st: cur ? (stopped ? C.red : C.amber) : 'none', r: 3 }); }),
    R(24, 268, 592, 10, { f: C.soft, r: 5 }), R(24, 268, 592 * p, 10, { f: stopped ? C.red : C.teal, r: 5 }),
    T(24, 298, `${Math.round(p * 100)}%`, { s: 18, w: 700 }), T(616, 298, `${fmt(p * 1240000)} rows loaded`, { s: 13, m: 1, a: 'end', f: C.ink2 }),
    stopped ? Chip(24, 344, 'Connection lost at batch 96', { f: C.redL, c: C.red, o: ph(t, 5, 5.3) }) : null,
    t > 7.6 && !end ? Chip(24, 344, 'Resumed from checkpoint · batch 97', { f: C.tealL, c: C.teal, o: ph(t, 7.6, 7.9) }) : null,
    end ? G({ opacity: ph(t, 11.3, 11.7) }, Check(34, 344, C.green), T(50, 344, '1 240 000 loaded · 0 lost', { s: 16, w: 600, f: C.green })) : null,
    Caption(W, H, t, [[0, 5, 'Big loads run in batches.'], [5, 7.6, 'If a run stops, nothing is lost.'], [7.6, 14, 'It carries on from the last checkpoint.']])
  ));
}

function DocumentsAnim() {
  const [t, ref] = useClock(14, 12.5);
  const W = 640, H = 480;
  const files = [['drawing-245.pdf', 'Part 100-245'], ['spec-245.pdf', 'Part 100-245'], ['cert-118.pdf', 'Supplier 118']];
  const cur = Math.min(2, Math.max(0, Math.floor((t - 1) / 3.6))), s = 1 + cur * 3.6;
  const steps = ['Check class and format', 'Create document in IFS', 'Upload file', 'Attach to'];
  const up = ph(t, s + 1.4, s + 2.4);
  const doneN = files.filter((f, i) => t > 1 + i * 3.6 + 2.8).length;
  return Frame(ref, Svg(W, H,
    Chrome(W, H, 'NayoDM · Documents'),
    R(24, 56, 210, 368, { f: C.soft, r: 10 }), T(42, 80, 'SOURCE FOLDER', { s: 11, m: 1, f: C.mute }),
    files.map((f, i) => { const y = 114 + i * 46, on = i === cur && t > 1, ok = t > 1 + i * 3.6 + 2.8; return G({}, R(40, y - 18, 178, 36, { f: C.white, st: on ? C.teal : C.line, sw: on ? 2 : 1, r: 6 }), T(54, y, f[0], { s: 12.5, m: 1 }), ok ? Check(202, y, C.green) : null); }),
    R(40, 260, 178, 36, { f: C.tealL, r: 6 }), T(54, 278, 'manifest.xlsx', { s: 12.5, m: 1, w: 600, f: C.teal }),
    T(42, 316, 'Says what each file is', { s: 12, f: C.ink2 }),
    t > 1 ? G({},
      T(256, 80, files[cur][0], { s: 16, w: 600, m: 1 }),
      steps.map((st, i) => {
        const y = 128 + i * 60, at = s + [0.6, 1.2, 2.4, 2.8][i], ok = t > at;
        return G({}, R(256, y - 22, 360, 44, { f: C.white, st: C.line, r: 8 }), T(272, y, st, { s: 14, f: ok ? C.ink : C.mute }),
          i === 2 && t > s + 1.4 ? [R(420, y - 4, 140 * up, 8, { f: C.teal, r: 4 }), R(420, y - 4, 140, 8, { st: C.line, r: 4 })] : null,
          i === 3 && ok ? Chip(340, y, files[cur][1], { f: C.tealL, c: C.teal }) : null,
          ok ? Check(596, y, C.green) : t > at - 0.6 ? Spin(596, y, t, C.mute) : null);
      })
    ) : null,
    G({ opacity: ph(t, 12, 12.4) }, R(256, 380, 360, 40, { f: C.greenL, r: 8 }), Check(276, 400, C.green), T(292, 400, `${doneN} of 3 files attached`, { s: 15, w: 600, f: C.green })),
    Caption(W, H, t, [[0, 4.6, 'The manifest says what each file is.'], [4.6, 9.2, 'Each file is checked and uploaded.'], [9.2, 14, 'Then attached to the right part or supplier.']])
  ));
}

function WorkflowAnim() {
  const [t, ref] = useClock(15, 12);
  const W = 640, H = 480;
  const nodes = [['Select', 'Orders', '1 286 Planned'], ['Back up', 'Optional', 'Saved'], ['Match', 'Old status', '1 286 matched'], ['Update', 'IFS Cloud', '1 286 released'], ['Verify', 'Compare', '0 failed']];
  const at = i => 0.6 + i * 1.8, nw = 104, gap = 18, ny = 92, nh = 104;
  const up = ph(t, at(3), at(3) + 1.5);
  const log = [[at(0) + 0.4, 'Job #4183 · 1 286 orders in status Planned'], [at(1) + 0.4, 'Backup step: 1 286 orders saved'], [at(3) + 1.6, 'Released 1 286 orders · failed 0'], [at(4) + 0.6, 'Check passed · statuses match old system']];
  const jobs = ['Adjust stock', 'Close old orders', 'Fix supplier data', 'Re-run failed rows'];
  let jx = 24;
  return Frame(ref, Svg(W, H,
    Chrome(W, H, 'NayoDM · Workflow'),
    T(24, 64, 'Set order status to match the old system', { s: 15, w: 600 }),
    nodes.map((n, i) => {
      if (i === 4) return null;
      const x1 = 24 + i * (nw + gap) + nw, x2 = x1 + gap, y = ny + nh / 2, on = t > at(i + 1);
      return G({}, e('line', { x1, y1: y, x2, y2: y, stroke: on ? C.teal : C.line, strokeWidth: 2 }),
        t > at(i) + 0.4 ? [0, 1].map(k => { const s = ((t * 1.2) + k / 2) % 1; return e('circle', { cx: lerp(x1, x2, s), cy: y, r: 3, fill: C.teal, opacity: Math.sin(Math.PI * s) }); }) : null);
    }),
    nodes.map((n, i) => {
      const x = 24 + i * (nw + gap), on = t > at(i), cur = on && (i === 4 ? t < at(4) + 0.8 : t < at(i + 1)), done = on && !cur;
      const pop = eo(ph(t, at(i), at(i) + 0.4));
      return G({},
        R(x, ny, nw, nh, { f: on ? C.white : C.soft, st: cur ? C.teal : C.line, sw: cur ? 2 : 1, r: 12 }),
        e('circle', { cx: x, cy: ny + nh / 2, r: 4, fill: C.white, stroke: on ? C.teal : C.line, strokeWidth: 1.5 }),
        e('circle', { cx: x + nw, cy: ny + nh / 2, r: 4, fill: C.white, stroke: on ? C.teal : C.line, strokeWidth: 1.5 }),
        T(x + 12, ny + 20, n[1].toUpperCase(), { s: 9.5, m: 1, f: C.mute }),
        T(x + 12, ny + 44, n[0], { s: 16, w: 600, f: on ? C.ink : C.mute }),
        i === 3 && on ? [R(x + 12, ny + 64, nw - 24, 6, { f: C.soft, r: 3 }), R(x + 12, ny + 64, (nw - 24) * up, 6, { f: C.teal, r: 3 })] : null,
        on && (i !== 3 || up >= 1) ? T(x + 12, ny + 84, n[2], { s: 11, m: 1, f: done ? C.green : C.ink2, o: pop }) : null,
        done ? Check(x + nw - 16, ny + 20, C.green, 0.9) : cur ? Spin(x + nw - 16, ny + 20, t, C.teal) : null);
    }),
    R(24, 214, 592, 126, { f: C.soft, r: 10 }), T(44, 236, 'RUN LOG', { s: 11, m: 1, f: C.mute }),
    log.map((l, i) => t > l[0] ? T(44, 262 + i * 22, l[1], { s: 12.5, m: 1, f: i === 3 ? C.green : C.ink, w: i === 3 ? 600 : 400, o: ph(t, l[0], l[0] + 0.3) }) : null),
    T(24, 362, 'BUILD OTHER JOBS THE SAME WAY', { s: 11, m: 1, f: C.mute, o: ph(t, 9.6, 10) }),
    jobs.map((s, i) => { const w = s.length * 7.1 + 22, x = jx; jx += w + 8; return Chip(x, 394, s, { f: C.tealL, c: C.teal, o: ph(t, 10 + i * 0.4, 10.4 + i * 0.4) }); }),
    Caption(W, H, t, [[0, 4.2, 'After migration, orders arrive in IFS as Planned.'], [4.2, 9.6, 'One job gives each order the status it had before.'], [9.6, 15, 'Use it for any bulk change. Every step is logged.']])
  ));
}

var MAP = window.NayoDMAnims = { hero: HeroAnim, challenge: ChallengeAnim, sources: SourcesAnim, mapping: MappingAnim, preflight: PreflightAnim, load: LoadAnim, documents: DocumentsAnim, workflow: WorkflowAnim };
document.querySelectorAll('[data-anim]:not([data-manual])').forEach(function (el) {
  var C2 = MAP[el.dataset.anim]; if (C2) ReactDOM.createRoot(el).render(React.createElement(C2));
});
})();
