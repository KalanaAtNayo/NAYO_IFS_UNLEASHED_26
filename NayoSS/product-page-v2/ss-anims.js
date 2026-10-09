// Nayo Security Suite product animations (from "Nayo Security Suite Product Page Animated"), recoloured to the NayoDM light palette.
(function () {

const e = React.createElement;
const C = { ink:'#1E0B2E', ink2:'#54446A', mute:'#75678A', line:'#CDBFE0', soft:'#F1EBF8', white:'#FFFFFF', teal:'#007F67', tealL:'#D9F3EC', tealB:'#17F1C2', green:'#3F7A0A', greenL:'#E4F0D8', amber:'#A85F00', amberL:'#F8EBD6', dark:'#F8F5FC', dark2:'#E4DAF0', darkT:'#54446A' };
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
const Caption = (W, H, t, list) => G({}, R(0, H - 44, W, 44, { f: C.soft, r: 0 }), e('line', { x1: 0, y1: H - 44.5, x2: W, y2: H - 44.5, stroke: C.line }), list.map(([a, b, s]) => { const o = vis(t, a, b); return o > 0 ? T(W / 2, H - 22, s, { s: 15, w: 500, a: 'middle', o }) : null; }));
const Chip = (x, y, s, o = {}) => { const w = s.length * 7.1 + 22; return G({ opacity: o.o == null ? 1 : o.o }, R(x, y - 12, w, 24, { f: o.f || C.white, st: o.st, d: o.d, r: 12 }), T(x + 11, y, s, { s: 11.5, m: 1, f: o.c || C.ink })); };

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
  const paths = [[[300,176],[400,176],[390,290],[490,290]], [[300,358],[400,358],[390,290],[490,290]], [[790,290],[860,290],[910,290],[980,290]]];
  const d = p => `M${p[0]} C${p[1]} ${p[2]} ${p[3]}`;
  const node = (x, y, title, sub, acc) => G({}, R(x, y, 220, 92, { f: C.white, st: acc ? C.teal : C.line, sw: acc ? 2 : 1, r: 12 }), T(x + 24, y + 34, title, { s: 22, w: 600 }), T(x + 24, y + 64, sub, { s: 13, m: 1, f: C.mute }));
  const labels = ['Connectivity', 'Permission Set Migration', 'Export / Import', 'User Management'];
  const cw = 250, gap = 18, x0 = (W - (cw * 4 + gap * 3)) / 2;
  return Frame(ref, Svg(W, H,
    R(0, 0, W, H, { f: C.soft, r: 0 }),
    paths.map(p => e('path', { d: d(p), stroke: C.line, strokeWidth: 2, fill: 'none' })),
    paths.map(p => [0, 1, 2].map(k => { const s = ((t / 2.4) + k / 3) % 1; const [x, y] = bez(p, s); return e('circle', { cx: x, cy: y, r: 5, fill: C.teal, opacity: Math.sin(Math.PI * s) }); })),
    labels.map((l, i) => { const cx = x0 + i * (cw + gap) + cw / 2; const a = vis(t, i * 3, i * 3 + 3); return G({}, e('path', { d: `M640 350 V480 H${cx} V560`, stroke: C.line, strokeWidth: 2, fill: 'none' }), e('path', { d: `M640 350 V480 H${cx} V560`, stroke: C.teal, strokeWidth: 2, fill: 'none', opacity: a })); }),
    node(80, 130, 'IFS IEE', 'Source'), node(80, 312, 'IFS Aurena', 'Source'), node(980, 244, 'IFS Cloud', 'Target', true),
    R(490, 230, 300, 120, { f: C.white, st: C.line, sw: 1.5, r: 16 }), e('image', { href: 'assets/nayoss-logo.svg', x: 530, y: 254, width: 220, height: 72, preserveAspectRatio: 'xMidYMid meet' }),
    labels.map((l, i) => { const x = x0 + i * (cw + gap); const a = vis(t, i * 3, i * 3 + 3); return G({}, R(x, 560, cw, 60, { f: C.white, st: C.line, r: 30 }), R(x, 560, cw, 60, { f: C.ink, r: 30, o: a }), T(x + cw / 2, 590, l, { s: 17, w: 600, a: 'middle', f: C.ink2, o: 1 - a }), T(x + cw / 2, 590, l, { s: 17, w: 600, a: 'middle', f: C.white, o: a })); })
  ));
}

function ChallengeAnim() {
  const [t, ref] = useClock(11, 8);
  const W = 1200, H = 480, LX = 60, RX = 720, PY = 40;
  const names = ['CustomerOrderHandling', 'SalesQuotationHandling', 'PurchaseOrdersHandling', 'CustomerInvoiceHandling', 'SupplierHandling', 'PriceListHandling'];
  const ry = i => PY + 110 + i * 36;
  const fly = eo(ph(t, 1.4, 3.2));
  const drop = ph(t, 3.4, 4.8);
  const filled = Math.floor(ph(t, 6.3, 10) * 3.99);
  const cnt = Math.floor(ph(t, 6.3, 10.2) * 7);
  const go = ph(t, 0, 0.4) * (1 - ph(t, 10.6, 11));
  const panel = (x, label) => G({}, R(x, PY, 420, 345, { f: C.dark, st: C.dark2, r: 12 }), T(x + 24, PY + 28, label, { m: 1, s: 13, f: C.darkT }));
  return Frame(ref, Svg(W, H,
    R(0, 0, W, H, { f: '#FFFFFF', r: 0 }),
    G({ opacity: go },
      panel(LX, 'Older IFS version'), panel(RX, 'IFS Cloud'),
      e('line', { x1: 500, y1: PY + 73, x2: 700, y2: PY + 73, stroke: C.dark2, strokeWidth: 2, strokeDasharray: '6 6' }),
      e('path', { d: `M692 ${PY + 66} L700 ${PY + 73} L692 ${PY + 80}`, stroke: C.dark2, strokeWidth: 2, fill: 'none' }),
      R(LX + 24, PY + 56, 170, 34, { f: C.tealB, r: 8 }), T(LX + 40, PY + 73, 'NAYO_SALES', { m: 1, s: 13, w: 500, f: C.ink }),
      G({ opacity: ph(t, 1.4, 1.6) }, R(lerp(LX + 24, RX + 24, fly), PY + 56, 170, 34, { f: C.tealB, r: 8 }), T(lerp(LX + 40, RX + 40, fly), PY + 73, 'NAYO_SALES', { m: 1, s: 13, w: 500, f: C.ink })),
      names.map((n, i) => G({}, R(LX + 24, ry(i), 372, 28, { f: C.dark2, r: 6 }), Check(LX + 42, ry(i) + 14, '#3F7A0A', 0.9), T(LX + 60, ry(i) + 14, n, { m: 1, s: 12, f: C.darkT }))),
      drop > 0 && drop < 1 ? names.map((n, i) => { const p = cl(drop * 1.6 - i * 0.12); return G({ opacity: (1 - p) * 0.9, transform: `translate(${p * 300},${p * p * 60})` }, R(LX + 24, ry(i), 372, 28, { f: C.dark2, r: 6 }), T(LX + 60, ry(i) + 14, n, { m: 1, s: 12, f: C.darkT })); }) : null,
      names.map((n, i) => i < filled ? G({}, R(RX + 24, ry(i), 372, 28, { f: '#F8EBD6', r: 6 }), T(RX + 44, ry(i) + 14, n, { m: 1, s: 12, f: '#A85F00' })) : R(RX + 24, ry(i), 372, 28, { st: '#CDBFE0', d: '5 5', r: 6, o: ph(t, 2.8, 3.4) })),
      T(RX + 210, ry(2) + 32, 'No projections granted', { s: 18, w: 600, a: 'middle', f: C.ink, o: vis(t, 4.2, 6.4) }),
      T(LX + 210, PY + 372, '366 presentation objects granted', { m: 1, s: 13, a: 'middle', f: C.darkT }),
      T(RX + 210, PY + 372, `${cnt} / 366 rebuilt by hand`, { m: 1, s: 13, a: 'middle', f: '#A85F00', o: ph(t, 6, 6.5) }),
      [[0, 1.5, 'Custom permission sets exist in the older version'], [1.5, 3.6, 'They come across to IFS Cloud…'], [3.6, 6.3, '…but their projection grants don\u2019t'], [6.3, 11, 'Rebuilding them by hand can take weeks']].map(([a, b, s]) => { const o = vis(t, a, b); return o > 0 ? T(W / 2, H - 26, s, { s: 18, w: 500, a: 'middle', f: C.teal, o }) : null; })
    )
  ));
}

function MigrationAnim() {
  const [t, ref] = useClock(15, 13.8);
  const W = 640, H = 480, B = [0, 3.5, 7, 11, 15];
  const cur = B.findIndex((b, i) => t >= b && t < B[i + 1]);
  const steps = ['Environments', 'Permission sets', 'Mapping', 'Grant'];
  const sv = i => vis(t, B[i], B[i + 1]);
  const envBox = (x, role, name, at) => G({}, R(x, 150, 250, 120, { f: C.white, st: C.line, r: 10 }), T(x + 20, 176, role, { m: 1, s: 11, f: C.mute }), T(x + 20, 204, name, { s: 18, w: 600 }), t < at ? G({}, Spin(x + 28, 240, t, C.mute), T(x + 44, 240, 'Testing connection', { s: 13, f: C.mute })) : G({}, Check(x + 28, 240, C.green), T(x + 44, 240, 'Connected', { s: 13, w: 600, f: C.green })));
  const psets = ['NAYO_FINANCE', 'NAYO_HR', 'NAYO_PURCHASE', 'NAYO_SALES', 'NAYO_SUPPORT'];
  const ticks = { 2: 4.4, 3: 5.0 };
  const nSel = (t >= 4.4 ? 1 : 0) + (t >= 5.0 ? 1 : 0);
  const maps = [['frmCustomerOrder', 'CustomerOrderHandling', 'AI', C.tealL], ['tbwPurchaseOrder', 'PurchaseOrdersHandling', 'Description', C.greenL], ['frmSalesQuotation', 'SalesQuotationHandling', 'Label', C.amberL], ['tbwSupplierInfo', 'SupplierHandling', 'Manual', C.soft], ['frmCustomerInvoice', 'CustomerInvoiceHandling', 'AI', C.tealL]];
  return Frame(ref, Svg(W, H, Chrome(W, H, 'Permission Set Migration'),
    steps.map((s, i) => i < 3 ? e('line', { x1: 80 + i * 160 + 14, y1: 72, x2: 80 + (i + 1) * 160 - 14, y2: 72, stroke: i < cur ? C.teal : C.line, strokeWidth: 2 }) : null),
    steps.map((s, i) => { const x = 80 + i * 160; const done = i < cur, now = i === cur; return G({}, e('circle', { cx: x, cy: 72, r: 12, fill: done ? C.teal : now ? C.ink : C.white, stroke: done ? C.teal : now ? C.ink : C.line, strokeWidth: 1.5 }), done ? Check(x, 72, C.white, 0.9) : T(x, 72, String(i + 1), { s: 12, w: 600, a: 'middle', m: 1, f: now ? C.white : C.mute }), T(x, 100, s, { s: 12, w: now ? 600 : 400, a: 'middle', f: now ? C.ink : C.mute })); }),
    G({ opacity: sv(0) }, envBox(40, 'Source · IFS IEE', 'IFS IEE APP', 1.2), envBox(350, 'Target · IFS Cloud', 'IFS DEMO APP', 1.9), e('path', { d: 'M300 210 H340 M332 203 L340 210 L332 217', stroke: C.mute, strokeWidth: 1.6, fill: 'none' }), R(480, 320, 120, 38, { f: C.ink, r: 8, o: 0.35 + 0.65 * ph(t, 2.2, 2.6) }), T(540, 339, 'Next', { s: 14, w: 600, a: 'middle', f: C.white })),
    G({ opacity: sv(1) }, psets.map((p, i) => { const on = ticks[i] != null && t >= ticks[i]; const y = 130 + i * 44; return G({}, R(40, y, 560, 38, { f: on ? C.tealL : C.white, st: C.line, r: 8 }), R(56, y + 11, 16, 16, { f: on ? C.teal : C.white, st: on ? C.teal : C.mute, r: 4 }), on ? Check(64, y + 19, C.white, 0.75) : null, T(86, y + 19, p, { m: 1, s: 13, w: on ? 500 : 400 })); }), T(40, 368, nSel ? `${nSel} permission set${nSel > 1 ? 's' : ''} selected · ${nSel > 1 ? 366 : 182} presentation object IDs` : 'Select permission sets to migrate', { s: 13, w: 500, f: nSel ? C.ink : C.mute })),
    G({ opacity: sv(2) }, T(40, 132, 'PRESENTATION OBJECT', { m: 1, s: 10.5, f: C.mute }), T(270, 132, 'IFS CLOUD PROJECTION', { m: 1, s: 10.5, f: C.mute }), T(520, 132, 'METHOD', { m: 1, s: 10.5, f: C.mute }),
      maps.map(([po, pr, m, bg], i) => { const a = 7.3 + i * 0.5; const p = eo(ph(t, a, a + 0.4)); const y = 164 + i * 44; return G({ opacity: ph(t, a, a + 0.2) }, R(30, y - 18, 580, 36, { f: i % 2 ? C.white : C.soft, r: 6 }), T(40, y, po, { m: 1, s: 11.5, f: C.ink2 }), e('line', { x1: 214, y1: y, x2: 214 + 44 * p, y2: y, stroke: C.teal, strokeWidth: 1.6 }), T(270, y, pr, { s: 13, w: 500, o: ph(t, a + 0.3, a + 0.5) }), G({ opacity: ph(t, a + 0.4, a + 0.6) }, R(520, y - 11, m.length * 7 + 20, 22, { f: bg, r: 11 }), T(530, y, m, { m: 1, s: 11 }))); }),
      T(40, 400, '366 objects mapped · Export summary to Excel', { s: 13, w: 500, f: C.teal, o: ph(t, 10, 10.3) })),
    G({ opacity: sv(3) }, ['NAYO_PURCHASE', 'NAYO_SALES'].map((n, i) => { const p = eo(ph(t, 11.4 + i * 0.3, 13.2 + i * 0.3)); const y = 150 + i * 90; return G({}, T(40, y, n, { m: 1, s: 14, w: 500 }), p >= 1 ? G({}, Check(470, y, C.green), T(484, y, 'Full access', { s: 13, w: 600, f: C.green })) : T(600, y, `${Math.round(p * 100)}%`, { m: 1, s: 12, a: 'end', f: C.mute }), R(40, y + 24, 560, 10, { f: C.soft, r: 5 }), R(40, y + 24, 560 * p, 10, { f: C.teal, r: 5 })); }), G({ opacity: ph(t, 13.6, 14) }, R(40, 340, 560, 48, { f: C.greenL, r: 10 }), Check(66, 364, C.green), T(84, 364, 'Projections granted to 2 permission sets', { s: 14, w: 600, f: C.green }))),
    Caption(W, H, t, [[0, 3.5, 'Connect source and target environments'], [3.5, 7, 'Choose the permission sets to migrate'], [7, 11, 'Objects mapped to Cloud projections automatically'], [11, 15, 'Grant mapped projections in one click']])
  ));
}

function ExportAnim() {
  const [t, ref] = useClock(15, 13.5);
  const W = 640, H = 480, X0 = 20, NW = 232, CW = (600 - NW) / 6, Y0 = 102, RH = 36;
  const rows = [['Procurement', 0], ['Order', 1, [1,1,1], [1,0,0]], ['PurchaseOrdersHandling', 2, [0,0,1], [1,0,0]], ['PurchaseOrderChargesHandling', 2, [0,1,0], [1,0,0]], ['QuickPurchaseOrderRegister…', 2, [1,0,0], [1,0,0]], ['PurchaseQuotationHandling', 2, [0,0,1], [1,0,0]], ['Sales', 0], ['CustomerOrderHandling', 2, [1,0,0], [0,0,1]]];
  const cx = (ps, c) => X0 + NW + (ps * 3 + c) * CW + CW / 2;
  const cy = r => Y0 + r * RH + RH / 2;
  const done = t >= 11.2;
  const edits = [[7, 0, 6.0], [5, 1, 7.2]];
  const go = ph(t, 0, 0.4) * (1 - ph(t, 14.6, 15));
  const c1 = [cx(0, 1), cy(7)], c2 = [cx(1, 1), cy(5)];
  let px = 330, py = 430;
  if (t < 5.9) { const p = eo(ph(t, 5.2, 5.9)); px = lerp(330, c1[0], p); py = lerp(430, c1[1], p); } else if (t < 7.0) { const p = eo(ph(t, 6.4, 7.0)); px = lerp(c1[0], c2[0], p); py = lerp(c1[1], c2[1], p); } else { px = c2[0]; py = c2[1]; }
  const cur = vis(t, 5.1, 7.9);
  const logs = ['Reading spreadsheet…', 'NAYO_PURCHASE · CustomerOrderHandling → View', 'NAYO_SALES · PurchaseQuotationHandling → View'];
  return Frame(ref, Svg(W, H, Chrome(W, H, 'Security Export / Import'),
    G({ opacity: go },
      ['NAYO_PURCHASE', 'NAYO_SALES'].map((n, ps) => G({}, R(X0 + NW + ps * 3 * CW + 2, 54, CW * 3 - 4, 24, { f: C.ink, r: 4 }), T(X0 + NW + ps * 3 * CW + CW * 1.5, 66, n, { m: 1, s: 11, w: 500, a: 'middle', f: C.white }), ['None', 'View', 'Edit'].map((c, ci) => T(cx(ps, ci), 90, c, { s: 11, a: 'middle', f: C.mute })))),
      T(X0, 78, 'Navigator item', { s: 11, f: C.mute }),
      R(X0, Y0 + RH, 600, RH, { f: C.tealL, r: 4, o: vis(t, 3, 5.2) }),
      rows.map(([n, lv, P, S], r) => { const o = ph(t, 0.3 + r * 0.18, 0.6 + r * 0.18); const y = cy(r); return G({ opacity: o }, e('line', { x1: X0, y1: Y0 + (r + 1) * RH, x2: X0 + 600, y2: Y0 + (r + 1) * RH, stroke: C.line }), T(X0 + 8 + lv * 14, y, n, { s: lv === 2 ? 11.5 : 13, w: lv < 2 ? 600 : 400, m: lv === 2 ? 1 : 0, f: lv === 2 ? C.ink2 : C.ink }),
        [P, S].map((v, ps) => v ? v.map((on, c) => { const ed = edits.find(q => q[0] === r && q[1] === ps); let mark = on; let isM = false, isNew = false; if (ed) { if (c === 1 && t >= ed[2] && !done) isM = true; if (done) { mark = c === 1 ? 1 : 0; isNew = c === 1; } } return G({}, isM || isNew ? R(cx(ps, c) - CW / 2 + 3, y - 13, CW - 6, 26, { f: isNew ? C.greenL : C.tealL, r: 4 }) : null, isM ? T(cx(ps, c), y, 'M', { m: 1, s: 13, w: 500, a: 'middle', f: C.teal }) : mark ? T(cx(ps, c), y, 'X', { m: 1, s: 12, a: 'middle', f: isNew ? C.green : C.ink, o: ph(t, 1.8 + r * 0.08, 2.1 + r * 0.08) }) : null); }) : null)); }),
      cur > 0 ? G({ opacity: cur, transform: `translate(${px + 6},${py + 6})` }, e('path', { d: 'M0 0 L0 16 L4.5 12 L8 19 L10.5 18 L7 11 L13 11 Z', fill: C.ink, stroke: C.white, strokeWidth: 1.2 })) : null,
      G({ opacity: vis(t, 8, 11.2) }, R(110, 168, 420, 170, { f: C.white, st: C.line, r: 12 }), T(134, 196, 'Importing to IFS DEMO APP', { s: 15, w: 600 }), R(134, 216, 372, 8, { f: C.soft, r: 4 }), R(134, 216, 372 * eo(ph(t, 8.4, 10.6)), 8, { f: C.teal, r: 4 }), logs.map((l, i) => T(134, 252 + i * 24, l, { m: 1, s: 11, f: C.ink2, o: ph(t, 8.6 + i * 0.6, 8.8 + i * 0.6) })))
    ),
    Caption(W, H, t, [[0, 3, 'Export grants organized by navigator item'], [3, 5.2, 'Mixed access is visible without expanding'], [5.2, 8, 'Mark changes in the spreadsheet with \u201cM\u201d'], [8, 11.2, 'Import with live progress and logs'], [11.2, 15, 'Access updated in IFS Cloud']])
  ));
}

function UserAnim() {
  const [t, ref] = useClock(15, 12);
  const W = 640, H = 480, CY = 54, CWD = 280, CH = 372;
  const lx = lerp(180, 24, eo(ph(t, 4.6, 5.6)));
  const rx = lerp(lx, 336, eo(ph(t, 5.2, 6.4)));
  const granted = t >= 3.2;
  const ck = t >= 1.4;
  const items = [['p', 'NAYO_SALES'], ['p', 'FND_WEBENDUSER_MAIN'], ['p', 'NAYOSS_ADMIN'], ['c', '10 · Main Site'], ['c', '20 · Warehouse'], ['g', 'SALES_TEAM']];
  const ys = [94, 122, 150, 210, 238, 298];
  const card = (x, name, sub, showFn, isLeft) => G({}, R(x, CY, CWD, CH, { f: C.white, st: C.line, r: 12 }),
    e('circle', { cx: x + 32, cy: CY + 30, r: 16, fill: isLeft ? C.ink : C.teal }), T(x + 32, CY + 30, name.slice(0, 1), { s: 13, w: 600, a: 'middle', f: C.white }),
    T(x + 58, CY + 24, name || ' ', { s: 15, w: 600 }), T(x + 58, CY + 42, sub, { m: 1, s: 10, f: C.mute }),
    T(x + 18, CY + 70, 'PERMISSION SETS', { m: 1, s: 10, f: C.mute }), T(x + 18, CY + 186, 'COMPANIES & SITES', { m: 1, s: 10, f: C.mute }), T(x + 18, CY + 274, 'USER GROUPS', { m: 1, s: 10, f: C.mute }),
    items.map(([k, s], i) => { const v = showFn(i); if (v <= 0) return null; const y = CY + ys[i]; if (isLeft && i === 2 && !granted) return G({}, R(x + 18, y - 9, 18, 18, { f: ck ? C.teal : C.white, st: ck ? C.teal : C.mute, r: 4 }), ck ? Check(x + 27, y, C.white, 0.75) : null, T(x + 46, y, s, { m: 1, s: 11.5 }), ck ? G({}, R(x + 158, y - 10, 44, 20, { f: C.amberL, r: 10 }), T(x + 180, y, '1 new', { s: 10.5, w: 600, a: 'middle', f: C.amber })) : null, ck ? G({ opacity: 0.5 + 0.5 * vis(t, 2.4, 3.2) }, R(x + 208, y - 12, 56, 24, { f: C.ink, r: 6 }), T(x + 236, y, 'Save', { s: 11.5, w: 600, a: 'middle', f: C.white })) : null); return G({ opacity: v, transform: `translate(0,${(1 - v) * 6})` }, Chip(x + 18, y, s, { f: k === 'p' ? C.greenL : C.soft, c: k === 'p' ? C.green : C.ink })); }));
  const leftShow = () => 1;
  const rightShow = i => ph(t, 7.4 + i * 0.4, 7.7 + i * 0.4);
  const typed = 'JORDAN.K'.slice(0, Math.floor(ph(t, 6.2, 7.1) * 8));
  const go = ph(t, 0, 0.4) * (1 - ph(t, 14.6, 15));
  return Frame(ref, Svg(W, H, Chrome(W, H, 'User Management'),
    G({ opacity: go },
      G({ opacity: ph(t, 5.2, 5.5) }, card(rx, typed, 'Duplicated from ALEX.M', rightShow, false),
        ['Person created', 'Sites per user'].map((s, i) => G({ opacity: ph(t, 10.6 + i * 0.5, 10.9 + i * 0.5) }, R(rx + 18 + i * 124, CY + 324, 116, 26, { f: C.greenL, r: 13 }), Check(rx + 34 + i * 124, CY + 337, C.green, 0.8), T(rx + 46 + i * 124, CY + 337, s, { s: 11.5, w: 600, f: C.green })))),
      card(lx, 'ALEX.M', 'Sales Coordinator', leftShow, true),
      G({ opacity: vis(t, 3.9, 6.2) }, R(lx + 186, CY + 18, 80, 26, { f: t > 4.6 ? C.ink : C.white, st: C.ink, r: 6 }), T(lx + 226, CY + 31, 'Duplicate', { s: 11.5, w: 600, a: 'middle', f: t > 4.6 ? C.white : C.ink }))
    ),
    Caption(W, H, t, [[0, 4.4, 'Grant and revoke access from one screen'], [4.4, 7.3, 'Duplicate a user in one step'], [7.3, 10.4, 'Permission sets, companies, sites and groups carry over'], [10.4, 15, 'Person record and sites per user created too']])
  ));
}

function EnvAnim() {
  const [t, ref] = useClock(13, 11);
  const W = 640, H = 480;
  const fields = [['Base URL', 'https://demo.ifs.cloud'], ['Client ID', 'NAYOSS_DEMO_CLIENT'], ['Client secret', '••••••••••••••••'], ['Well-known endpoint', '…/.well-known/openid-configuration']];
  const envs = [['IFS IEE APP', 'IFS IEE'], ['IFS AURENA APP', 'IFS Aurena'], ['IFS DEMO APP', 'IFS Cloud']];
  const A = vis(t, 0, 6.6), Bv = ph(t, 6.4, 6.8) * (1 - ph(t, 12.6, 13));
  return Frame(ref, Svg(W, H, Chrome(W, H, 'Environment Connectivity'),
    G({ opacity: A }, R(60, 56, 520, 366, { f: C.white, st: C.line, r: 12 }), T(84, 84, 'Add IFS Cloud environment', { s: 16, w: 600 }),
      fields.map(([l, v], i) => { const y = 118 + i * 54; const n = Math.floor(ph(t, 0.5 + i * 0.85, 1.25 + i * 0.85) * v.length); return G({}, T(84, y, l, { m: 1, s: 10.5, f: C.mute }), R(84, y + 10, 472, 30, { f: C.white, st: n > 0 && n < v.length ? C.teal : C.line, r: 6 }), T(96, y + 25, v.slice(0, n), { m: 1, s: 12 })); }),
      T(84, 344, 'SSL certificate verification', { s: 13, f: C.ink2 }), R(516, 333, 40, 22, { f: C.teal, r: 11 }), e('circle', { cx: 545, cy: 344, r: 8, fill: C.white }),
      t < 4.3 ? null : t < 5.1 ? G({}, Spin(92, 392, t, C.mute), T(108, 392, 'Testing…', { s: 13, f: C.mute })) : G({}, Check(92, 392, C.green), T(106, 392, 'Connection successful', { s: 13, w: 600, f: C.green })),
      R(300, 376, 124, 32, { f: t > 4.2 && t < 4.6 ? C.soft : C.white, st: C.ink, r: 7 }), T(362, 392, 'Test connection', { s: 12, w: 600, a: 'middle' }),
      R(432, 376, 124, 32, { f: C.ink, r: 7, o: t > 5.6 ? 1 : 0.4 }), T(494, 392, 'Create', { s: 12, w: 600, a: 'middle', f: C.white })),
    G({ opacity: Bv }, R(436, 56, 184, 32, { f: C.ink, r: 7 }), T(528, 72, '+ Add IFS Environment', { s: 12, w: 600, a: 'middle', f: C.white }),
      T(36, 116, 'NAME', { m: 1, s: 10.5, f: C.mute }), T(270, 116, 'TYPE', { m: 1, s: 10.5, f: C.mute }), T(450, 116, 'STATUS', { m: 1, s: 10.5, f: C.mute }),
      envs.map(([n, ty], i) => { const y = 134 + i * 60; const st = 7.6 + i * 0.9; return G({}, R(20, y, 600, 50, { f: i === 2 ? C.tealL : C.white, st: C.line, r: 8, o: i === 2 ? 1 - 0.7 * ph(t, 7.4, 8.4) : 1 }), R(20, y, 600, 50, { st: C.line, r: 8 }), T(36, y + 25, n, { s: 14, w: 600 }), R(270, y + 13, ty.length * 7 + 20, 24, { f: C.soft, r: 12 }), T(280, y + 25, ty, { m: 1, s: 11 }), t < st ? null : t < st + 0.7 ? G({}, Spin(458, y + 25, t, C.mute), T(474, y + 25, 'Testing…', { s: 13, f: C.mute })) : G({}, Check(458, y + 25, C.green), T(472, y + 25, 'Connected', { s: 13, w: 600, f: C.green }))); })),
    Caption(W, H, t, [[0, 4.2, 'Add IEE, Aurena or Cloud environments'], [4.2, 6.6, 'Test the connection before saving'], [6.6, 13, 'Every connected environment in one list']])
  ));
}


var MAP = window.NayoSSAnims = { hero: HeroAnim, challenge: ChallengeAnim, migration: MigrationAnim, export: ExportAnim, users: UserAnim, env: EnvAnim };
document.querySelectorAll('[data-anim]:not([data-manual])').forEach(function (el) {
  var C2 = MAP[el.dataset.anim]; if (C2) ReactDOM.createRoot(el).render(React.createElement(C2));
});
})();
