const { useMemo } = React;

const C_NAVY = '#1E0B2E';
const C_INK2 = '#54446A';
const C_MUTED = '#75678A';
const C_LINE = '#CDBFE0';
const C_BG = '#F8F5FC';
const C_TEAL = '#17F1C2';
const C_TEALD = '#007F67';
const C_WARN = '#C8341B';
const SANS = "Barlow, 'Helvetica Neue', Arial, sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, Menlo, monospace";

// three motion helpers — all easing goes through these
const prog = (T, s, d, ease) => ease(clamp((T - s) / d, 0, 1));
const MOTION = {
  enter: (T, s, d = 0.7) => prog(T, s, d, Easing.easeOutCubic),
  draw: (T, s, d = 0.9) => prog(T, s, d, Easing.easeInOutCubic),
  pop: (T, s, d = 0.55) => prog(T, s, d, Easing.easeOutBack),
};
const lerp = (a, b, t) => a + (b - a) * t;

const IFS = { x: 360, y: 540 };
const PORTAL = { x: 960, y: 540 };
const PARTNERS = [
  { y: 290, role: 'Customer', name: 'Northwind Ltd', color: 'oklch(0.62 0.12 190)', chips: ['Orders', 'Shipments', 'Invoices'] },
  { y: 540, role: 'Customer', name: 'Harbor Supply Co', color: 'oklch(0.66 0.14 65)', chips: ['Orders', 'Part List', 'Reports'] },
  { y: 790, role: 'Supplier', name: 'Apex Components', color: 'oklch(0.58 0.14 295)', chips: ['Purchase Orders', 'Supplier notes'] },
];
const PX = 1560, P_LEFT = 1395;
const BUBBLES = [
  { x: 1180, y: 190, t: 'Where is my order?' },
  { x: 1210, y: 420, t: 'Has it shipped yet?' },
  { x: 1150, y: 650, t: 'Can you resend that invoice?' },
  { x: 1240, y: 900, t: 'Any update on PO 2210?' },
  { x: 1120, y: 300, t: 'Is part 4471 in stock?' },
  { x: 1200, y: 760, t: 'What price do I pay?' },
];

const cubic = (p0, p1, p2, p3, t) => {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
};
const branch = (y, t) => ({ x: cubic(1130, 1265, 1265, P_LEFT, t), y: cubic(540, 540, y, y, t) });
const branchD = y => `M1130 540 C1265 540 1265 ${y} ${P_LEFT} ${y}`;
const packetPos = (y, u) => {
  if (u < 0.35) return { x: lerp(480, 790, u / 0.35), y: 540, o: 1 };
  if (u < 0.45) return { x: lerp(790, 1130, (u - 0.35) / 0.1), y: 540, o: 0.15 };
  const b = branch(y, (u - 0.45) / 0.55);
  return { ...b, o: 1 };
};

function Node({ x, y, w, h, o, s, style, children }) {
  return (
    <div style={{ position: 'absolute', left: x - w / 2, top: y - h / 2, width: w, height: h, opacity: o,
      transform: `scale(${s})`, transformOrigin: 'center', ...style }}>{children}</div>
  );
}

function IfsNode({ T, CUES }) {
  const e = MOTION.enter(T, CUES.Problem + 0.2, 0.8);
  const webTag = MOTION.pop(T, CUES.Access + 7.0);
  return (
    <Node x={IFS.x} y={IFS.y + (1 - e) * 30} w={240} h={240} o={e} s={1}
      style={{ background: C_NAVY, borderRadius: 28, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 10, boxShadow: '0 30px 60px -30px rgba(30, 11, 46, 0.6)' }}>
      <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 64, color: '#fff', letterSpacing: '-0.02em' }}>IFS</div>
      <div style={{ fontFamily: MONO, fontSize: 18, color: C_TEAL }}>Your ERP</div>
      <div style={{ position: 'absolute', bottom: -62, left: '50%', transform: `translateX(-50%) scale(${webTag})`, opacity: clamp(webTag, 0, 1),
        background: '#fff', border: `1px solid ${C_LINE}`, borderRadius: 999, padding: '8px 16px', whiteSpace: 'nowrap',
        fontFamily: MONO, fontSize: 18, color: C_NAVY }}>New order · type WEB</div>
    </Node>
  );
}

function PortalNode({ T, CUES }) {
  const s = MOTION.pop(T, CUES.Connect + 0.6, 0.7);
  const sub = MOTION.enter(T, CUES.Access + 0.0, 0.6);
  const pulse = T > CUES.Access ? 1 + 0.015 * Math.sin((T - CUES.Access) * 4) : 1;
  return (
    <Node x={PORTAL.x} y={PORTAL.y} w={340} h={210} o={clamp(s, 0, 1)} s={s * pulse}
      style={{ background: '#fff', border: `2px solid ${C_TEALD}`, borderRadius: 22, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 30px 60px -30px rgba(0, 127, 103, 0.55)' }}>
      <img src="assets/nayocp-logo.svg" alt="Nayo Customer Portal" style={{ height: 84, width: 'auto', display: 'block' }} />
      <div style={{ fontFamily: MONO, fontSize: 16, color: C_TEALD, opacity: sub, transform: `translateY(${(1 - sub) * 8}px)` }}>
        roles · permission sets · mapping
      </div>
    </Node>
  );
}

function PartnerCard({ T, CUES, p, i }) {
  const e = MOTION.enter(T, CUES.Problem + 0.8 + i * 0.2, 0.8);
  return (
    <Node x={PX + (1 - e) * 40} y={p.y} w={330} h={150} o={e} s={1}
      style={{ background: '#fff', border: `1px solid ${C_LINE}`, borderRadius: 18, padding: '18px 22px', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 20px 40px -28px rgba(30, 11, 46, 0.4)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 14, height: 14, borderRadius: 999, background: p.color }}></div>
        <div style={{ fontFamily: MONO, fontSize: 16, color: C_MUTED }}>{p.role}</div>
      </div>
      <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 26, color: C_NAVY }}>{p.name}</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'nowrap' }}>
        {p.chips.map((c, k) => {
          const arrive = CUES.Access + 0.3 + i * 0.5 + k * 0.35 + 1.6;
          const s = MOTION.pop(T, arrive, 0.45);
          return (
            <div key={k} style={{ opacity: clamp(s, 0, 1), transform: `scale(${s})`, background: p.color, color: '#fff',
              fontFamily: SANS, fontWeight: 600, fontSize: 14, padding: '4px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}>{c}</div>
          );
        })}
      </div>
    </Node>
  );
}

function Lines({ T, CUES }) {
  const greyIn = MOTION.enter(T, CUES.Problem + 1.6, 1.0);
  const greyOut = 1 - MOTION.enter(T, CUES.Connect, 0.5);
  const main = MOTION.draw(T, CUES.Connect + 1.4, 0.8);
  const wallH = MOTION.draw(T, CUES.Barrier + 0.2, 1.0);
  const wallO = 1 - MOTION.enter(T, CUES.Connect, 0.6);
  return (
    <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      {PARTNERS.map((p, i) => (
        <line key={i} x1={P_LEFT} y1={p.y} x2={480} y2={540} stroke={C_MUTED} strokeWidth="2" strokeDasharray="6 10"
          strokeDashoffset={-T * 30} opacity={greyIn * greyOut * 0.6} />
      ))}
      <line x1="960" y1={540 - 400 * wallH} x2="960" y2={540 + 400 * wallH} stroke={C_WARN} strokeWidth="4"
        strokeDasharray="14 10" opacity={wallO} />
      <line x1="480" y1="540" x2="790" y2="540" stroke={C_TEALD} strokeWidth="4" pathLength="1" strokeDasharray="1"
        strokeDashoffset={1 - main} />
      {PARTNERS.map((p, i) => {
        const d = MOTION.draw(T, CUES.Connect + 2.4 + i * 0.25, 0.9);
        return <path key={i} d={branchD(p.y)} fill="none" stroke={C_TEALD} strokeWidth="3" pathLength="1" strokeDasharray="1"
          strokeDashoffset={1 - d} />;
      })}
    </svg>
  );
}

function ProblemDots({ T, CUES }) {
  const fadeIn = MOTION.enter(T, CUES.Problem + 2.4, 0.6);
  const out = 1 - MOTION.enter(T, CUES.Connect, 0.4);
  if (fadeIn * out <= 0) return null;
  const blocked = T > CUES.Barrier + 1.0;
  return PARTNERS.map((p, i) => {
    const f = (((T - CUES.Problem) * 0.22 + i * 0.33) % 1 + 1) % 1;
    const lim = blocked ? 0.47 : 1;
    const ff = f * lim;
    const x = lerp(P_LEFT, 480, ff), y = lerp(p.y, 540, ff);
    const edgeFade = blocked ? clamp((0.47 - ff) / 0.08, 0, 1) * 0.6 + 0.4 * (ff < 0.4 ? 1 : 0) : 1;
    return (
      <div key={i} style={{ position: 'absolute', left: x - 9, top: y - 9, width: 18, height: 18, borderRadius: 999,
        background: blocked && ff > 0.42 ? C_WARN : C_MUTED, opacity: fadeIn * out * clamp(edgeFade, 0, 1) }}></div>
    );
  });
}

function Bubbles({ T, CUES }) {
  const out = MOTION.enter(T, CUES.Connect, 0.6);
  return BUBBLES.map((b, i) => {
    const s = MOTION.pop(T, CUES.Problem + 2.2 + i * 0.5, 0.5);
    const drift = Math.sin(T * 1.3 + i) * 6;
    const sc = s * (1 - out * 0.6);
    return (
      <div key={i} style={{ position: 'absolute', left: b.x, top: b.y + drift, transform: `translate(-50%,-50%) scale(${sc})`,
        opacity: clamp(s, 0, 1) * (1 - out), background: '#fff', border: `1px solid ${C_LINE}`, borderRadius: '16px 16px 16px 4px',
        padding: '12px 18px', fontFamily: SANS, fontSize: 22, color: C_NAVY, whiteSpace: 'nowrap',
        boxShadow: '0 14px 30px -18px rgba(30, 11, 46, 0.5)' }}>{b.t}</div>
    );
  });
}

function WallTag({ T, CUES }) {
  const s = MOTION.pop(T, CUES.Barrier + 0.9, 0.5);
  const out = 1 - MOTION.enter(T, CUES.Connect, 0.5);
  return (
    <div style={{ position: 'absolute', left: 960, top: 100, transform: `translateX(-50%) scale(${s})`, opacity: clamp(s, 0, 1) * out,
      background: C_WARN, color: '#fff', fontFamily: MONO, fontSize: 20, padding: '10px 18px', borderRadius: 999, whiteSpace: 'nowrap' }}>
      Outside the IFS user framework
    </div>
  );
}

function Packets({ T, CUES }) {
  const items = [];
  PARTNERS.forEach((p, i) => p.chips.forEach((c, k) => {
    const s = CUES.Access + 0.3 + i * 0.5 + k * 0.35;
    const u = (T - s) / 1.6;
    if (u <= 0 || u >= 1) return;
    const pos = packetPos(p.y, Easing.easeInOutSine(u));
    items.push(<div key={i + '-' + k} style={{ position: 'absolute', left: pos.x - 11, top: pos.y - 11, width: 22, height: 22,
      borderRadius: 7, background: p.color, opacity: pos.o, boxShadow: '0 0 0 6px oklch(1 0 0 / 0.7)' }}></div>);
  }));
  const r = (T - (CUES.Access + 5.4)) / 1.6;
  if (r > 0 && r < 1) {
    const pos = packetPos(PARTNERS[0].y, 1 - Easing.easeInOutSine(r));
    items.push(<div key="ret" style={{ position: 'absolute', left: pos.x - 14, top: pos.y - 14, width: 28, height: 28, borderRadius: 999,
      background: C_NAVY, border: `4px solid ${C_TEAL}`, boxSizing: 'border-box', opacity: pos.o }}></div>);
  }
  return items;
}

function LicenceBadge({ T, CUES }) {
  const s = MOTION.pop(T, CUES.Access + 4.8, 0.5);
  return (
    <div style={{ position: 'absolute', left: PX, top: 150, transform: `translate(-50%,-50%) scale(${s})`, opacity: clamp(s, 0, 1),
      background: C_NAVY, color: C_TEAL, fontFamily: MONO, fontSize: 20, padding: '10px 18px', borderRadius: 999, whiteSpace: 'nowrap' }}>
      No IFS user licences
    </div>
  );
}

function Benefits({ T, CUES }) {
  const list = [
    ['Fewer calls and emails', 'Partners answer their own questions.'],
    ['Real-time IFS data', 'Never an out-of-date export.'],
    ['Secure by design', 'Every user sees only their own data.'],
  ];
  const out = 1 - MOTION.enter(T, CUES.Close, 0.6);
  return (
    <div style={{ position: 'absolute', left: 160, right: 160, top: 690, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
      {list.map(([h, s], i) => {
        const e = MOTION.enter(T, CUES.Benefits + 1.2 + i * 0.6, 0.8);
        return (
          <div key={i} style={{ opacity: e * out, transform: `translateY(${(1 - e) * 30}px)`, borderTop: `2px solid ${C_NAVY}`,
            paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontFamily: MONO, fontSize: 18, color: C_TEALD }}>0{i + 1}</div>
            <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 40, color: C_NAVY, letterSpacing: '-0.01em' }}>{h}</div>
            <div style={{ fontFamily: SANS, fontSize: 24, color: C_INK2 }}>{s}</div>
          </div>
        );
      })}
    </div>
  );
}

function CloseCard({ T, CUES, total }) {
  const a = MOTION.pop(T, CUES.Close + 0.6, 0.7);
  const b = MOTION.enter(T, CUES.Close + 1.2, 0.7);
  const c = MOTION.enter(T, CUES.Close + 1.8, 0.7);
  const end = 1 - MOTION.enter(T, total - 0.5, 0.5);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 28, opacity: end, pointerEvents: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22, opacity: clamp(a, 0, 1), transform: `scale(${a})` }}>
        <div style={{ width: 96, height: 96, borderRadius: 22, background: C_NAVY, color: C_TEAL, display: 'grid', placeItems: 'center',
          fontFamily: MONO, fontSize: 48 }}>N</div>
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 84, color: C_NAVY, letterSpacing: '-0.025em' }}>Nayo Customer Portal</div>
      </div>
      <div style={{ fontFamily: SANS, fontSize: 36, color: C_INK2, opacity: b, transform: `translateY(${(1 - b) * 16}px)` }}>
        Give your customers and suppliers their own window into IFS.
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, opacity: c, transform: `translateY(${(1 - c) * 16}px)`, marginTop: 12 }}>
        <div style={{ background: C_NAVY, color: '#fff', fontFamily: SANS, fontWeight: 600, fontSize: 30, padding: '18px 34px', borderRadius: 12 }}>Request a demo</div>
        <div style={{ fontFamily: MONO, fontSize: 26, color: C_TEALD }}>nayotech.com/customer-portal</div>
      </div>
    </div>
  );
}

function Caption({ T, CUES, show }) {
  const items = [
    [CUES.Problem + 0.6, "Your business runs in IFS. Your partners don't."],
    [CUES.Problem + 4.4, 'So every question becomes an email or a phone call.'],
    [CUES.Barrier + 0.4, "They're outside your IFS user framework — and each must see only their own data."],
    [CUES.Connect + 0.8, 'Nayo Customer Portal sits on top of IFS and connects them — in real time.'],
    [CUES.Access + 0.4, 'Each partner sees exactly what you allow. Nothing else.'],
    [CUES.Access + 5.0, 'No IFS user licences — and new orders flow straight back into IFS.'],
    [CUES.Benefits + 0.4, 'Less chasing. More self-service.'],
    [CUES.Close, null],
  ];
  let idx = -1;
  for (let i = 0; i < items.length; i++) if (T >= items[i][0]) idx = i;
  if (!show || idx < 0 || !items[idx][1]) return null;
  const e = MOTION.enter(T, items[idx][0], 0.45);
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 64, display: 'flex', justifyContent: 'center' }}>
      <div style={{ opacity: e, transform: `translateY(${(1 - e) * 12}px)`, fontFamily: SANS, fontWeight: 500, fontSize: 40,
        color: C_NAVY, background: 'oklch(1 0 0 / 0.92)', padding: '14px 28px', borderRadius: 14, maxWidth: 1500, textAlign: 'center' }}>
        {items[idx][1]}
      </div>
    </div>
  );
}

function Piece({ captions, noClose }) {
  const { T, CUES, authoredTotal } = useComposition();
  const zoom = MOTION.draw(T, CUES.Benefits, 1.2);
  const diagOut = noClose ? 1 : 1 - MOTION.enter(T, CUES.Close, 0.6);
  const cam = 1 + 0.03 * clamp(T / CUES.Benefits, 0, 1);
  const scale = lerp(cam, 0.6, zoom);
  const ty = lerp(0, -210, zoom);
  return (
    <div data-screen-label={`t=${Math.floor(T)}s`} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: C_BG,
      backgroundImage: 'radial-gradient(#DDD3EA 1.5px, transparent 1.5px)', backgroundSize: '40px 40px',
      backgroundPosition: `${-T * 4}px ${-T * 2}px` }}>
      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${ty}px) scale(${scale})`, transformOrigin: '960px 540px', opacity: diagOut }}>
        <Lines T={T} CUES={CUES} />
        <ProblemDots T={T} CUES={CUES} />
        <IfsNode T={T} CUES={CUES} />
        <PortalNode T={T} CUES={CUES} />
        {PARTNERS.map((p, i) => <PartnerCard key={i} T={T} CUES={CUES} p={p} i={i} />)}
        <Packets T={T} CUES={CUES} />
        <Bubbles T={T} CUES={CUES} />
        <WallTag T={T} CUES={CUES} />
        <LicenceBadge T={T} CUES={CUES} />
      </div>
      <Benefits T={T} CUES={CUES} />
      {!noClose && <CloseCard T={T} CUES={CUES} total={authoredTotal} />}
      <Caption T={T} CUES={CUES} show={captions} />
    </div>
  );
}

function NayoExplainer() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || { motionEditor: true, captions: true });
  return (
    <>
      <CompositionStage width={1920} height={1080} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={C_BG}>
        <Piece captions={t.captions} />
      </CompositionStage>
      <TweaksPanel>
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={v => setTweak('motionEditor', v)} />
        <TweakToggle label="Captions" value={t.captions} onChange={v => setTweak('captions', v)} />
      </TweaksPanel>
    </>
  );
}

function NayoExplainerEmbed({ noClose, scenes }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const paint = () => {
      const root = ref.current && ref.current.firstElementChild;
      if (root && root.style.background !== C_BG) root.style.background = C_BG;
    };
    paint();
    const mo = new MutationObserver(paint);
    if (ref.current) mo.observe(ref.current, { childList: true, subtree: false, attributes: true, attributeFilter: ['style'] });
    return () => mo.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0 }}>
      <CompositionStage width={1920} height={1080} scenes={scenes || window.OM_SCENES} playback={window.OM_PLAYBACK} bg={C_BG}>
        <Piece captions={true} noClose={noClose} />
      </CompositionStage>
    </div>
  );
}

window.NayoExplainer = NayoExplainer;
window.NayoExplainerEmbed = NayoExplainerEmbed;
