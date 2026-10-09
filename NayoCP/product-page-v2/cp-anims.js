// Nayo Customer Portal demo animations (NayoDM light palette).
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

/* 1 · Overview: IFS → portal → partners */
function HeroAnim() {
  const [t, ref] = useClock(14, 4);
  const W = 1280, H = 720;
  const bez = (p, s) => { const u = 1 - s; return [0, 1].map(j => u*u*u*p[0][j] + 3*u*u*s*p[1][j] + 3*u*s*s*p[2][j] + s*s*s*p[3][j]); };
  const ends = [176, 346, 516];
  const paths = [[[300,340],[370,340],[420,340],[490,340]]].concat(ends.map(y => [[790,340],[880,340],[890,y],[980,y]]));
  const d = p => `M${p[0]} C${p[1]} ${p[2]} ${p[3]}`;
  const node = (x, y, title, sub, acc) => G({}, R(x, y, 220, 92, { f: C.white, st: acc ? C.teal : C.line, sw: acc ? 2 : 1, r: 12 }), T(x + 24, y + 34, title, { s: 22, w: 600 }), T(x + 24, y + 64, sub, { s: 13, m: 1, f: C.mute }));
  const labels = ['Orders', 'Ordering', 'Invoices', 'Reports', 'Parts', 'Suppliers', 'Admin'];
  const cw = 150, gap = 14, x0 = (W - (cw * 7 + gap * 6)) / 2;
  return Frame(ref, Svg(W, H,
    R(0, 0, W, H, { f: C.soft, r: 0 }),
    paths.map(p => e('path', { d: d(p), stroke: C.line, strokeWidth: 2, fill: 'none' })),
    paths.map(p => [0, 1, 2].map(k => { const s = ((t / 2.4) + k / 3) % 1; const [x, y] = bez(p, s); return e('circle', { cx: x, cy: y, r: 5, fill: C.teal, opacity: Math.sin(Math.PI * s) }); })),
    node(80, 294, 'IFS', 'Your ERP', true),
    node(980, 130, 'Customers', 'Their orders'), node(980, 300, 'Suppliers', 'Their POs'), node(980, 470, 'Dealers', 'Their parts'),
    R(490, 270, 300, 140, { f: C.white, st: C.line, sw: 1.5, r: 16 }), e('image', { href: 'assets/nayocp-logo.svg', x: 530, y: 300, width: 220, height: 80, preserveAspectRatio: 'xMidYMid meet' }),
    labels.map((l, i) => { const x = x0 + i * (cw + gap); const a = vis(t, i * 2, i * 2 + 2); return G({}, R(x, 610, cw, 56, { f: C.white, st: C.line, r: 28 }), R(x, 610, cw, 56, { f: C.ink, r: 28, o: a }), T(x + cw / 2, 638, l, { s: 17, w: 600, a: 'middle', f: C.ink2, o: 1 - a }), T(x + cw / 2, 638, l, { s: 17, w: 600, a: 'middle', f: C.white, o: a })); })
  ));
}

/* 2 · Challenge: questions pile up, then the portal answers them */
function ChallengeAnim() {
  const [t, ref] = useClock(13, 10);
  const W = 1200, H = 480;
  const qs = ['Where is my order?', 'Has it shipped?', 'Can you resend the invoice?', 'Is this part in stock?', 'What is my price?', 'Any news on PO-4471?'];
  const after = ph(t, 6.6, 7.4);
  const landed = qs.filter((q, i) => t > 0.4 + i * 0.85 + 1.1).length;
  const card = (x, title, sub) => G({}, R(x, 70, 280, 300, { f: C.white, st: C.line, r: 14 }), T(x + 22, 100, title, { s: 18, w: 600 }), T(x + 22, 124, sub, { s: 12, m: 1, f: C.mute }));
  const answers = ['Order status', 'Invoices', 'Stock and prices'];
  return Frame(ref, Svg(W, H,
    R(0, 0, W, H, { f: C.soft, r: 0 }),
    card(60, 'Your team', 'Works in IFS'), card(860, 'Customers & suppliers', 'Outside IFS'),
    G({ opacity: 1 - after }, Chip(232, 100, `${landed} open`, { f: landed ? C.redL : C.soft, c: landed ? C.red : C.mute })),
    G({ opacity: after }, Chip(240, 100, '0 open', { f: C.greenL, c: C.green })),
    qs.map((q, i) => {
      const s = 0.4 + i * 0.85, p = eo(ph(t, s, s + 1.1)); if (t < s) return null;
      const w = q.length * 7.4 + 28, x = lerp(1120 - w, 80, p), y = lerp(170 + (i % 3) * 60, 158 + i * 34, p);
      return G({ opacity: ph(t, s, s + 0.2) * (1 - after) }, R(x, y - 14, w, 28, { f: p < 1 ? C.white : C.amberL, st: p < 1 ? C.line : 'none', r: 14 }), T(x + 14, y, q, { s: 13, f: p < 1 ? C.ink : C.amber }));
    }),
    G({ opacity: after },
      e('line', { x1: 340, y1: 220, x2: 470, y2: 220, stroke: C.teal, strokeWidth: 2 }), e('line', { x1: 730, y1: 220, x2: 860, y2: 220, stroke: C.teal, strokeWidth: 2 }),
      [0, 1].map(k => { const s = ((t / 1.6) + k / 2) % 1; return [e('circle', { cx: lerp(340, 470, s), cy: 220, r: 4, fill: C.teal, opacity: Math.sin(Math.PI * s) }), e('circle', { cx: lerp(730, 860, s), cy: 220, r: 4, fill: C.teal, opacity: Math.sin(Math.PI * s) })]; }),
      R(470, 160, 260, 120, { f: C.white, st: C.teal, sw: 2, r: 16 }), e('image', { href: 'assets/nayocp-logo.svg', x: 500, y: 184, width: 200, height: 72, preserveAspectRatio: 'xMidYMid meet' }),
      T(120, 210, 'Fewer calls.', { s: 20, w: 600, o: ph(t, 7.6, 8.2) }), T(120, 240, 'Fewer emails.', { s: 20, w: 600, o: ph(t, 8, 8.6) })),
    answers.map((a, i) => { const o = ph(t, 7.6 + i * 0.5, 8 + i * 0.5); return o > 0 ? G({ opacity: o }, R(882, 168 + i * 50, 236, 38, { f: C.greenL, r: 10 }), Check(904, 187 + i * 50, C.green), T(922, 187 + i * 50, a, { s: 14, w: 500, f: C.green })) : null; }),
    T(882, 340, 'They find it themselves.', { s: 13, f: C.ink2, o: ph(t, 9, 9.5) }),
    Caption(W, H, t, [[0, 6.6, "Partners can't see IFS, so they email and call you."], [6.6, 13, 'With the portal, they find the answer themselves.']])
  ));
}

/* 3 · Orders & shipments */
function OrdersAnim() {
  const [t, ref] = useClock(14, 11);
  const W = 640, H = 480;
  const rows = [['CO-10482', '12 Sep', 'Delivered'], ['CO-10511', '18 Sep', 'Picked'], ['CO-10537', '24 Sep', 'Released'], ['CO-10560', '30 Sep', 'Released']];
  const steps = ['Released', 'Picked', 'Shipped', 'Delivered'];
  const prog = ph(t, 5.2, 10.6) * 3;
  const px = lerp(W, 250, eo(ph(t, 3, 3.8)));
  const [cx, cy] = path(t, [[0, 600, 420], [1.2, 600, 420], [2.4, 150, 194], [3.6, 150, 194]]);
  return Frame(ref, Svg(W, H,
    Chrome(W, H, 'Customer Portal · Orders'),
    T(40, 64, 'ORDER', { s: 11, m: 1, f: C.mute }), T(200, 64, 'DATE', { s: 11, m: 1, f: C.mute }), T(330, 64, 'STATUS', { s: 11, m: 1, f: C.mute }),
    e('line', { x1: 24, y1: 82, x2: 616, y2: 82, stroke: C.line }),
    rows.map((r, i) => { const y = 84 + i * 44; return G({}, i === 2 ? R(24, y, 592, 44, { f: C.tealL, r: 0, o: ph(t, 2.5, 2.8) }) : null, T(40, y + 22, r[0], { s: 14, m: 1, w: 500 }), T(200, y + 22, r[1], { s: 14, f: C.ink2 }), Status(330, y + 22, r[2]), e('line', { x1: 24, y1: y + 44, x2: 616, y2: y + 44, stroke: C.soft })); }),
    Cur(cx, cy, 1 - ph(t, 3.6, 4)), Ripple(150, 194, t, 2.5),
    G({ transform: `translate(${px},52)` },
      R(0, 0, 370, 372, { f: C.white, st: C.line, r: 10 }),
      T(20, 28, 'CO-10537', { s: 18, w: 600, m: 1 }), T(20, 52, 'Nordic Tools AB · 24 Sep', { s: 12.5, f: C.mute }),
      T(20, 88, 'ORDER LINES', { s: 11, m: 1, f: C.mute }),
      [['Bearing 6204-2RS', '40 pcs'], ['Seal kit SK-12', '10 pcs']].map((l, i) => { const y = 114 + i * 36; return G({}, R(20, y - 14, 330, 28, { f: C.soft, r: 6 }), T(32, y, l[0], { s: 13 }), T(338, y, l[1], { s: 12, m: 1, a: 'end', f: C.ink2 })); }),
      T(20, 196, 'SHIPMENT', { s: 11, m: 1, f: C.mute }),
      e('line', { x1: 40, y1: 240, x2: 328, y2: 240, stroke: C.line, strokeWidth: 3 }),
      e('line', { x1: 40, y1: 240, x2: 40 + prog * 96, y2: 240, stroke: C.teal, strokeWidth: 3 }),
      steps.map((s, i) => { const x = 40 + i * 96, on = prog >= i - 0.001 && t > 5.2 || i === 0; return G({}, e('circle', { cx: x, cy: 240, r: 10, fill: on ? C.teal : C.white, stroke: on ? C.teal : C.line, strokeWidth: 2 }), on ? Check(x, 240, C.white, 0.8) : null, T(x, 270, s, { s: 12, a: 'middle', w: on ? 600 : 400, f: on ? C.ink : C.mute })); }),
      t > 5.2 && t < 10.6 ? e('circle', { cx: 40 + prog * 96, cy: 240, r: 6, fill: C.white, stroke: C.teal, strokeWidth: 3 }) : null,
      Chip(20, 324, 'Delivered 2 Oct · Tracking 1Z84F220', { f: C.greenL, c: C.green, o: ph(t, 10.6, 11.1) })
    ),
    Caption(W, H, t, [[0, 3, 'Every order and its status, live from IFS.'], [3, 5.2, 'Open an order to see its lines.'], [5.2, 14, 'Follow the shipment all the way.']])
  ));
}

/* 4 · Online ordering */
function OrderingAnim() {
  const [t, ref] = useClock(13, 10);
  const W = 640, H = 480;
  const parts = [['Bearing 6204-2RS', '40'], ['Seal kit SK-12', '10'], ['Drive belt B-58', '6']];
  const a = 1 - ph(t, 6, 6.5), b = ph(t, 6.3, 6.8);
  const [cx, cy] = path(t, [[0, 600, 420], [0.45, 90, 278], [4.4, 90, 278], [5.2, 536, 378], [6.2, 536, 378]]);
  const ox = lerp(160, 480, eo(ph(t, 6.9, 8.4)));
  const ifsRows = [['Order', 'CO-10588'], ['Type', 'WEB'], ['Status', 'Entry complete']];
  return Frame(ref, Svg(W, H,
    Chrome(W, H, 'Customer Portal · New order'),
    a > 0 ? G({ opacity: a },
      T(40, 70, 'PART', { s: 11, m: 1, f: C.mute }), T(330, 70, 'QTY', { s: 11, m: 1, f: C.mute }), T(456, 70, 'AVAILABILITY', { s: 11, m: 1, f: C.mute }),
      parts.map((p, i) => { const s = 0.6 + i * 1.4, y = 110 + i * 56, o = ph(t, s, s + 0.3); if (!o) return null; return G({ opacity: o, transform: `translate(${(1 - eo(o)) * 20},0)` }, R(24, y - 20, 592, 40, { f: C.white, st: C.line, r: 8 }), T(44, y, p[0], { s: 14, w: 500 }), T(330, y, p[1], { s: 14, m: 1 }), t < s + 0.7 ? [Spin(466, y, t, C.mute), T(482, y, 'Checking…', { s: 12, f: C.mute })] : Chip(456, y, 'In stock', { f: C.greenL, c: C.green })); }),
      R(24, 258, 592, 40, { st: C.line, d: '4 4', r: 8 }), T(44, 278, '+ Add part', { s: 14, f: C.mute }),
      R(456, 356, 160, 44, { f: t > 5.4 ? C.teal : C.ink, r: 22 }), T(536, 378, 'Place order', { s: 15, w: 600, a: 'middle', f: C.white }),
      Cur(cx, cy), [0.55, 1.95, 3.35].map(tc => Ripple(90, 278, t, tc)), Ripple(536, 378, t, 5.35)
    ) : null,
    b > 0 ? G({ opacity: b },
      R(40, 150, 220, 140, { f: C.soft, st: C.line, r: 12 }), T(150, 200, 'Customer Portal', { s: 17, w: 600, a: 'middle' }), T(150, 228, '3 lines · Nordic Tools', { s: 12.5, a: 'middle', f: C.mute }),
      e('line', { x1: 260, y1: 220, x2: 380, y2: 220, stroke: C.line, strokeWidth: 2, strokeDasharray: '5 5' }),
      R(380, 110, 220, 220, { f: C.white, st: t > 8.4 ? C.teal : C.line, sw: 2, r: 12 }), T(400, 140, 'IFS', { s: 20, w: 700 }),
      t < 8.5 ? G({}, R(ox - 58, 204, 116, 32, { f: C.ink, r: 16 }), T(ox, 220, 'CO-10588', { s: 12, m: 1, a: 'middle', f: C.white })) : null,
      ifsRows.map((r, i) => { const o = ph(t, 8.6 + i * 0.5, 9 + i * 0.5); return o > 0 ? G({ opacity: o }, T(400, 190 + i * 40, r[0], { s: 12, f: C.mute }), T(470, 190 + i * 40, r[1], { s: 14, w: 600, m: i < 2 ? 1 : 0 }), i === 2 ? Check(584, 190 + i * 40, C.green) : null) : null; })
    ) : null,
    Caption(W, H, t, [[0, 5.4, 'Add parts. Stock is checked as you go.'], [5.4, 8.6, 'One click places the order.'], [8.6, 13, 'It arrives in IFS straight away.']])
  ));
}

/* 5 · Invoices & reports */
function InvoicesAnim() {
  const [t, ref] = useClock(15, 7);
  const W = 640, H = 480;
  const inv = [['INV-30211', '12 Sep', '4,820.00', 'Paid'], ['INV-30244', '19 Sep', '1,260.50', 'Open'], ['INV-30279', '26 Sep', '9,145.00', 'Open'], ['INV-30302', '3 Oct', '2,310.00', 'Open']];
  const a = 1 - ph(t, 8.2, 8.7), b = ph(t, 8.5, 9);
  const py = lerp(H, 0, eo(ph(t, 2.6, 3.4)));
  const [ax, ay] = path(t, [[0, 600, 420], [1.4, 120, 150], [3.4, 120, 150], [5, 320, 352]]);
  const [bx, by] = path(t, [[8.6, 600, 420], [9.4, 160, 137], [10.8, 160, 137], [11.8, 538, 392]]);
  const done = t > 6.4, rep = t > 12.8;
  return Frame(ref, Svg(W, H,
    Chrome(W, H, 'Customer Portal · ' + (t < 8.5 ? 'Invoices' : 'Reports')),
    a > 0 ? G({ opacity: a },
      T(40, 64, 'INVOICE', { s: 11, m: 1, f: C.mute }), T(200, 64, 'DATE', { s: 11, m: 1, f: C.mute }), T(440, 64, 'EUR', { s: 11, m: 1, f: C.mute, a: 'end' }), T(490, 64, 'STATUS', { s: 11, m: 1, f: C.mute }),
      e('line', { x1: 24, y1: 82, x2: 616, y2: 82, stroke: C.line }),
      inv.map((r, i) => { const y = 84 + i * 44; return G({}, i === 1 ? R(24, y, 592, 44, { f: C.tealL, r: 0, o: ph(t, 1.6, 1.9) }) : null, T(40, y + 22, r[0], { s: 14, m: 1, w: 500 }), T(200, y + 22, r[1], { s: 14, f: C.ink2 }), T(440, y + 22, r[2], { s: 14, m: 1, a: 'end' }), Status(490, y + 22, r[3]), e('line', { x1: 24, y1: y + 44, x2: 616, y2: y + 44, stroke: C.soft })); }),
      G({ transform: `translate(0,${py})` },
        R(150, 54, 340, 372, { f: C.white, st: C.line, r: 6 }),
        T(174, 86, 'INVOICE', { s: 17, w: 700 }), T(466, 86, 'INV-30244', { s: 12, m: 1, a: 'end', f: C.mute }),
        T(174, 112, 'Nordic Tools AB', { s: 13, f: C.ink2 }),
        [0, 1, 2, 3, 4].map(i => R(174, 140 + i * 24, [292, 240, 270, 200, 250][i] * ph(t, 3.4 + i * 0.15, 3.9 + i * 0.15), 8, { f: C.soft, r: 4 })),
        e('line', { x1: 174, y1: 272, x2: 466, y2: 272, stroke: C.line }),
        T(174, 296, 'Total', { s: 13, f: C.mute }), T(466, 296, 'EUR 1,260.50', { s: 19, w: 600, a: 'end' }),
        R(174, 330, 292, 44, { f: done ? C.green : C.ink, r: 22 }),
        t > 5.6 && !done ? Spin(250, 352, t, C.white) : null,
        done ? Check(240, 352, C.white) : null,
        T(320, 352, done ? 'PDF downloaded' : 'Download PDF', { s: 15, w: 600, a: 'middle', f: C.white })
      ),
      Cur(ax, ay, 1 - ph(t, 7.4, 7.8)), Ripple(120, 150, t, 1.6), Ripple(320, 352, t, 5.2)
    ) : null,
    b > 0 ? G({ opacity: b },
      [['Statement of account', 'Open items for Nordic Tools'], ['Price list 2026', 'Your prices, by part']].map((c, i) => { const x = 24 + i * 308, on = i === 0 && t > 9.6; return G({}, R(x, 58, 284, 80, { f: on ? C.tealL : C.white, st: on ? C.teal : C.line, sw: on ? 2 : 1, r: 10 }), T(x + 20, 88, c[0], { s: 16, w: 600 }), T(x + 20, 112, c[1], { s: 12.5, f: C.mute })); }),
      R(24, 156, 592, 268, { f: C.soft, r: 10, o: ph(t, 9.8, 10.2) }),
      T(44, 182, 'STATEMENT OF ACCOUNT · NORDIC TOOLS AB', { s: 11, m: 1, f: C.mute, o: ph(t, 9.9, 10.3) }),
      [['INV-30244', '19 Sep', '1,260.50'], ['INV-30279', '26 Sep', '9,145.00'], ['INV-30302', '3 Oct', '2,310.00'], ['Balance', '', '12,715.50']].map((r, i) => { const y = 216 + i * 34, o = ph(t, 10 + i * 0.2, 10.4 + i * 0.2); return o > 0 ? G({ opacity: o }, T(44, y, r[0], { s: 14, m: i < 3 ? 1 : 0, w: i === 3 ? 600 : 400 }), T(260, y, r[1], { s: 14, f: C.ink2 }), T(596, y, r[2], { s: 14, m: 1, a: 'end', w: i === 3 ? 600 : 400 }), i === 2 ? e('line', { x1: 44, y1: y + 17, x2: 596, y2: y + 17, stroke: C.line }) : null) : null; }),
      R(470, 374, 136, 36, { f: rep ? C.green : C.ink, r: 18, o: ph(t, 10.6, 11) }),
      t > 12.1 && !rep ? Spin(494, 392, t, C.white) : null, rep ? Check(492, 392, C.white) : null,
      T(rep ? 548 : 538, 392, rep ? 'Printed' : 'Print', { s: 14, w: 600, a: 'middle', f: C.white, o: ph(t, 10.6, 11) }),
      Cur(bx, by, ph(t, 8.6, 8.8) * (1 - ph(t, 13.6, 14))), Ripple(160, 137, t, 9.5), Ripple(538, 392, t, 12)
    ) : null,
    Caption(W, H, t, [[0, 2.6, 'All your invoices, straight from IFS.'], [2.6, 8.5, 'Open one and download the PDF.'], [8.5, 15, 'Print reports, like your statement of account.']])
  ));
}

/* 6 · Parts & stock */
function PartsAnim() {
  const [t, ref] = useClock(13, 9);
  const W = 640, H = 480;
  const q = 'bearing', n = Math.floor(ph(t, 0.5, 1.8) * q.length);
  const res = [['6204-2RS Bearing', '8.40'], ['6205-2RS Bearing', '9.10'], ['6306-ZZ Bearing', '12.75']];
  const sites = [['Oslo', 320], ['Gothenburg', 85], ['Aarhus', 0]];
  const [cx, cy] = path(t, [[1.9, 560, 430], [3.6, 300, 161], [4.6, 300, 161], [5.4, 610, 440]]);
  const sp = eo(ph(t, 5, 6.6));
  return Frame(ref, Svg(W, H,
    Chrome(W, H, 'Customer Portal · Parts'),
    R(24, 56, 592, 44, { f: C.white, st: t < 2 ? C.teal : C.line, sw: t < 2 ? 2 : 1, r: 22 }),
    e('circle', { cx: 52, cy: 76, r: 7, fill: 'none', stroke: C.mute, strokeWidth: 2 }), e('line', { x1: 57, y1: 81, x2: 62, y2: 86, stroke: C.mute, strokeWidth: 2, strokeLinecap: 'round' }),
    T(74, 78, n ? q.slice(0, n) : 'Search parts', { s: 15, f: n ? C.ink : C.mute }),
    t < 2.2 && Math.floor(t * 2.5) % 2 ? e('line', { x1: 76 + n * 8, y1: 68, x2: 76 + n * 8, y2: 88, stroke: C.ink, strokeWidth: 1.5 }) : null,
    T(40, 124, 'PART', { s: 11, m: 1, f: C.mute, o: ph(t, 2.1, 2.4) }), T(596, 124, 'YOUR PRICE · EUR', { s: 11, m: 1, f: C.mute, a: 'end', o: ph(t, 2.1, 2.4) }),
    res.map((r, i) => { const y = 138 + i * 46, o = ph(t, 2.2 + i * 0.25, 2.5 + i * 0.25); return o > 0 ? G({ opacity: o }, i === 0 ? R(24, y, 592, 46, { f: C.tealL, r: 0, o: ph(t, 4.4, 4.7) }) : null, T(40, y + 23, r[0], { s: 14, w: 500 }), T(596, y + 23, r[1], { s: 15, m: 1, a: 'end', w: 600 }), Chip(400, y + 23, 'Your agreement', { f: C.tealL, c: C.teal, st: C.teal, o: ph(t, 8 + i * 0.2, 8.4 + i * 0.2) }), e('line', { x1: 24, y1: y + 46, x2: 616, y2: y + 46, stroke: C.soft })) : null; }),
    G({ opacity: ph(t, 4.6, 5) },
      R(24, 290, 592, 134, { f: C.soft, r: 10 }), T(44, 314, 'STOCK BY SITE · 6204-2RS', { s: 11, m: 1, f: C.mute }),
      sites.map((s, i) => { const y = 346 + i * 26; return G({}, T(44, y, s[0], { s: 13.5 }), R(160, y - 6, 340, 12, { f: C.white, r: 6 }), R(160, y - 6, 340 * (s[1] / 360) * sp, 12, { f: C.teal, r: 6 }), T(596, y, s[1] ? `${Math.round(s[1] * sp)} pcs` : 'None', { s: 12.5, m: 1, a: 'end', f: s[1] ? C.ink : C.mute })); })
    ),
    Cur(cx, cy, ph(t, 1.9, 2.1) * (1 - ph(t, 5.2, 5.5))), Ripple(300, 161, t, 4.4),
    Caption(W, H, t, [[0, 4.4, 'Search your own parts and prices.'], [4.4, 8, 'See the stock at every site.'], [8, 13, 'Prices come from your IFS agreement.']])
  ));
}

/* 7 · Supplier purchase orders */
function SupplierAnim() {
  const [t, ref] = useClock(13, 11);
  const W = 640, H = 480;
  const pos = [['PO-4471', 'Due 14 Oct', 'Released'], ['PO-4486', 'Due 21 Oct', 'Released'], ['PO-4502', 'Due 28 Oct', 'Planned']];
  const msgs = [[3.2, 0, 'We can ship on Friday.'], [6, 1, 'Great, thanks!'], [8.8, 0, 'Tracking number added.']];
  const [cx, cy] = path(t, [[0, 600, 420], [1.5, 120, 77], [2.4, 120, 77]]);
  return Frame(ref, Svg(W, H,
    Chrome(W, H, 'Supplier Portal · Purchase orders'),
    pos.map((r, i) => { const y = 56 + i * 42; return G({}, i === 0 ? R(24, y, 592, 42, { f: C.tealL, r: 0, o: ph(t, 1.7, 2) }) : null, T(40, y + 21, r[0], { s: 14, m: 1, w: 500 }), T(200, y + 21, r[1], { s: 14, f: C.ink2 }), Status(470, y + 21, r[2]), e('line', { x1: 24, y1: y + 42, x2: 616, y2: y + 42, stroke: C.soft })); }),
    G({ opacity: ph(t, 2, 2.5) },
      R(24, 196, 592, 228, { f: C.soft, r: 10 }), T(44, 216, 'SUPPLIER NOTES · PO-4471', { s: 11, m: 1, f: C.mute }),
      msgs.map(([s, me, txt], i) => {
        const yb = 240 + i * 60, w = txt.length * 7.6 + 28, x = me ? 596 - w : 44;
        if (t < s - 0.8) return null;
        if (t < s) return G({}, R(me ? 596 - 56 : 44, yb + 6, 56, 32, { f: me ? C.teal : C.white, st: me ? 'none' : C.line, r: 16 }), [0, 1, 2].map(k => e('circle', { cx: (me ? 596 - 56 : 44) + 16 + k * 12, cy: yb + 22, r: 3, fill: me ? C.white : C.mute, opacity: 0.4 + 0.6 * Math.abs(Math.sin(t * 5 + k)) })));
        const o = ph(t, s, s + 0.3);
        return G({ opacity: o }, T(me ? 596 : 44, yb - 4, me ? 'Your team' : 'Baltic Steel', { s: 11, f: C.mute, a: me ? 'end' : 'start' }), R(x, yb + 6, w, 32, { f: me ? C.teal : C.white, st: me ? 'none' : C.line, r: 16 }), T(x + 14, yb + 22, txt, { s: 14, f: me ? C.white : C.ink }));
      })
    ),
    Cur(cx, cy, 1 - ph(t, 2.4, 2.8)), Ripple(120, 77, t, 1.7),
    Caption(W, H, t, [[0, 3, 'Suppliers see the orders you raised for them.'], [3, 13, 'Notes keep the conversation on the order.']])
  ));
}

/* 8 · Admin & access */
function AdminAnim() {
  const [t, ref] = useClock(14, 12);
  const W = 640, H = 480;
  const a = 1 - ph(t, 8.2, 8.7), b = ph(t, 8.5, 9);
  const fields = [['Name', 'Anna Berg', 0.5], ['Email', 'anna@nordictools.se', 1.5], ['Linked to', 'Customer · Nordic Tools AB', 2.7]];
  const roles = ['Orders', 'Invoices', 'Parts', 'Reports', 'Suppliers'];
  let rx = 44;
  const saved = t > 7.8;
  const screen = (x, who, co, rows, s0) => G({}, R(x, 58, 284, 336, { f: C.white, st: C.line, r: 10 }), R(x, 58, 284, 52, { f: C.soft, r: 10 }), R(x, 98, 284, 12, { f: C.soft, r: 0 }), T(x + 18, 76, who, { s: 15, w: 600 }), T(x + 18, 96, co, { s: 12, f: C.mute }),
    rows.map((r, i) => { const o = ph(t, s0 + i * 0.3, s0 + 0.3 + i * 0.3); return o > 0 ? G({ opacity: o }, R(x + 16, 130 + i * 50, 252, 40, { f: C.white, st: C.line, r: 8 }), T(x + 30, 150 + i * 50, r[0], { s: 13.5, m: 1, w: 500 }), Status(x + 268 - (r[1].length * 7.1 + 22) - 10, 150 + i * 50, r[1])) : null; }),
    G({ opacity: ph(t, s0 + 1.4, s0 + 1.8) }, Check(x + 30, 362, C.green), T(x + 46, 362, 'Only their own data', { s: 13, w: 500, f: C.green })));
  return Frame(ref, Svg(W, H,
    Chrome(W, H, t < 8.5 ? 'Portal admin · New user' : 'What each user sees'),
    a > 0 ? G({ opacity: a },
      fields.map(([l, v, s], i) => { const y = 70 + i * 66, n = Math.floor(ph(t, s, s + 0.8) * v.length); return G({}, T(44, y, l, { s: 12, m: 1, f: C.mute }), R(44, y + 12, 552, 38, { f: C.white, st: t > s && t < s + 1 ? C.teal : C.line, sw: t > s && t < s + 1 ? 2 : 1, r: 6 }), T(58, y + 31, v.slice(0, n), { s: 14.5, w: i === 2 ? 600 : 400 })); }),
      T(44, 276, 'ROLE · WHAT ANNA CAN SEE', { s: 12, m: 1, f: C.mute }),
      roles.map((r, i) => { const on = i < 4 && t > 4.4 + i * 0.6, w = r.length * 7.1 + 42, x = rx; rx += w + 10; return G({}, R(x, 296, w, 32, { f: on ? C.tealL : C.white, st: on ? C.teal : C.line, r: 16 }), on ? Check(x + 16, 312, C.teal, 0.85) : null, T(x + (on ? 28 : w / 2), 312, r, { s: 13.5, w: 500, f: on ? C.teal : C.mute, a: on ? 'start' : 'middle' })); }),
      R(456, 360, 140, 42, { f: saved ? C.green : C.ink, r: 21 }), saved ? Check(484, 381, C.white) : null,
      T(saved ? 534 : 526, 381, saved ? 'Saved' : 'Save user', { s: 15, w: 600, a: 'middle', f: C.white }),
      Cur(...path(t, [[0, 600, 430], [6.6, 600, 430], [7.4, 526, 381]]), ph(t, 6.6, 6.8)), Ripple(526, 381, t, 7.6)
    ) : null,
    b > 0 ? G({ opacity: b },
      screen(24, 'Anna Berg', 'Customer · Nordic Tools AB', [['CO-10537', 'Released'], ['CO-10560', 'Released'], ['INV-30244', 'Open']], 9.2),
      screen(332, 'Lars Holm', 'Supplier · Baltic Steel', [['PO-4471', 'Released'], ['PO-4486', 'Released'], ['PO-4502', 'Planned']], 9.6),
      e('circle', { cx: 320, cy: 226, r: 20, fill: C.white, stroke: C.line, strokeWidth: 1.5 }),
      e('path', { d: 'M314 224 V219 a6 6 0 0 1 12 0 V224', fill: 'none', stroke: C.ink, strokeWidth: 2 }), R(311, 223, 18, 13, { f: C.ink, r: 2 })
    ) : null,
    Caption(W, H, t, [[0, 4.2, 'Create a user and link them to their IFS customer.'], [4.2, 8.5, 'Pick a role to choose what they can see.'], [8.5, 14, 'Each user sees only their own data.']])
  ));
}

function ExplainerAnim() {
  const [Emb, setEmb] = React.useState(() => window.NayoExplainerEmbed || null);
  React.useEffect(() => { if (Emb) return; const id = setInterval(() => { if (window.NayoExplainerEmbed) { setEmb(() => window.NayoExplainerEmbed); clearInterval(id); } }, 100); return () => clearInterval(id); }, [Emb]);
  const scenes = window.OM_SCENES && window.OM_SCENES.replace(/"name":"Close","dur":[\d.]+/, '"name":"Close","dur":0.4');
  return Emb ? e('div', { style: { position: 'absolute', left: 0, top: 0, right: 0, height: 'calc(100% + 44px)' } }, e(Emb, { noClose: true, scenes })) : null;
}

var MAP = window.NayoCPAnims = { explainer: ExplainerAnim, hero: HeroAnim, challenge: ChallengeAnim, orders: OrdersAnim, ordering: OrderingAnim, invoices: InvoicesAnim, parts: PartsAnim, suppliers: SupplierAnim, admin: AdminAnim };
document.querySelectorAll('[data-anim]:not([data-manual])').forEach(function (el) {
  var C2 = MAP[el.dataset.anim]; if (C2) ReactDOM.createRoot(el).render(React.createElement(C2));
});
})();
