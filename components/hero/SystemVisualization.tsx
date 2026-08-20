'use client';

import { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

/* ─── Canvas ───────────────────────────────────────────────────── */
const W = 520;
const H = 300;
const NW = 112;
const NH = 40;
const NR = 8;

type NodeId = 'req' | 'api' | 'backend' | 'database' | 'testing' | 'deploy';

interface SysNode {
  id: NodeId;
  label: string;
  cx: number;
  cy: number;
  layer: 1 | 2;
}

interface SysConnection {
  id: string;
  from: NodeId;
  to: NodeId;
  d: string;
  dur: string;
  delay: string;
}

const NODES: SysNode[] = [
  { id: 'req',      label: 'REQUIREMENT', cx: 80,  cy: 90,  layer: 1 },
  { id: 'api',      label: 'API',         cx: 260, cy: 90,  layer: 1 },
  { id: 'backend',  label: 'BACKEND',     cx: 440, cy: 90,  layer: 1 },
  { id: 'database', label: 'DATABASE',    cx: 440, cy: 210, layer: 2 },
  { id: 'testing',  label: 'TESTING',     cx: 260, cy: 210, layer: 2 },
  { id: 'deploy',   label: 'DEPLOY',      cx: 80,  cy: 210, layer: 2 },
];

const CONNS: SysConnection[] = [
  { id: 'c1', from: 'req',      to: 'api',      d: 'M 136 90 L 204 90',   dur: '2.5s', delay: '0s'   },
  { id: 'c2', from: 'api',      to: 'backend',  d: 'M 316 90 L 384 90',   dur: '2.5s', delay: '0.7s' },
  { id: 'c3', from: 'backend',  to: 'database', d: 'M 440 110 L 440 190', dur: '2.0s', delay: '1.4s' },
  { id: 'c4', from: 'database', to: 'testing',  d: 'M 384 210 L 316 210', dur: '2.5s', delay: '2.0s' },
  { id: 'c5', from: 'testing',  to: 'deploy',   d: 'M 204 210 L 136 210', dur: '2.5s', delay: '2.6s' },
];

function getAdjacent(id: NodeId): Set<NodeId> {
  const s = new Set<NodeId>();
  CONNS.forEach(c => {
    if (c.from === id) s.add(c.to);
    if (c.to === id)   s.add(c.from);
  });
  return s;
}

/* ─── Node-specific hover micro-icons ─────────────────────────── */
function NodeMicro({ id, active }: { id: NodeId; active: boolean }) {
  if (!active) return null;
  const cx = NODES.find(n => n.id === id)!.cx;
  const cy = NODES.find(n => n.id === id)!.cy;
  const x = cx + NW / 2 - 22;
  const y = cy - 6;

  switch (id) {
    case 'api':
      return (
        <g>
          <motion.path
            d={`M${x} ${y + 6} L${x + 12} ${y + 6}`}
            stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.4 }}
          />
          <motion.path
            d={`M${x + 8} ${y + 3} L${x + 12} ${y + 6} L${x + 8} ${y + 9}`}
            stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
        </g>
      );
    case 'database':
      return (
        <g>
          {[0, 4, 8].map((dy, i) => (
            <motion.line key={i}
              x1={x} y1={y + dy} x2={x + 14} y2={y + dy}
              stroke="#6C63FF" strokeWidth="1" strokeOpacity="0.6"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              style={{ transformOrigin: `${x}px ${y + dy}px` }}
            />
          ))}
        </g>
      );
    case 'testing':
      return (
        <motion.path
          d={`M${x + 2} ${y + 5} L${x + 6} ${y + 9} L${x + 13} ${y + 1}`}
          stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.4 }}
        />
      );
    case 'deploy':
      return (
        <motion.g
          initial={{ y: 0, opacity: 0.7 }}
          animate={{ y: -6, opacity: 0 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.3 }}
        >
          <path
            d={`M${x + 6} ${y + 10} L${x + 6} ${y + 2} M${x + 3} ${y + 5} L${x + 6} ${y + 2} L${x + 9} ${y + 5}`}
            stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
          />
        </motion.g>
      );
    case 'req':
      return (
        <motion.circle
          cx={x + 6} cy={y + 5} r="5"
          stroke="#6C63FF" strokeWidth="1" fill="none"
          initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 0.4 }}
        />
      );
    case 'backend':
      return (
        <g>
          {[0, 5, 10].map((dy, i) => (
            <motion.rect key={i}
              x={x} y={y + dy} width={10} height={2} rx={1}
              fill="#6C63FF" fillOpacity="0.5"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.25, delay: i * 0.08 }}
              style={{ transformOrigin: `${x}px ${y + dy}px` }}
            />
          ))}
        </g>
      );
    default:
      return null;
  }
}

export function SystemVisualization() {
  const [hovered, setHovered] = useState<NodeId | null>(null);
  const [activeNode, setActiveNode] = useState<NodeId>('req');
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  /* Cycle active node every 3 seconds */
  useEffect(() => {
    if (reduced) return;
    const nodeIds: NodeId[] = ['req', 'api', 'backend', 'database', 'testing', 'deploy'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % nodeIds.length;
      setActiveNode(nodeIds[idx]);
    }, 3000);
    return () => clearInterval(interval);
  }, [reduced]);

  /* Mouse parallax */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spX  = useSpring(rawX, { stiffness: 22, damping: 18 });
  const spY  = useSpring(rawY, { stiffness: 22, damping: 18 });
  const l1X  = useTransform(spX, v => v * 0.55);
  const l1Y  = useTransform(spY, v => v * 0.55);
  const l2X  = useTransform(spX, v => v * 0.25);
  const l2Y  = useTransform(spY, v => v * 0.25);
  const connX = useTransform(spX, v => v * 0.15);
  const connY = useTransform(spY, v => v * 0.15);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    rawX.set(((e.clientX - left) / width  - 0.5) * 12);
    rawY.set(((e.clientY - top)  / height - 0.5) * 12);
  }, [reduced, rawX, rawY]);

  const onLeave = useCallback(() => { rawX.set(0); rawY.set(0); }, [rawX, rawY]);

  const adj = hovered ? getAdjacent(hovered) : null;

  /* Styling helpers */
  const nodeOpacity  = (id: NodeId) => !hovered ? 1 : (hovered === id || adj?.has(id)) ? 1 : 0.28;
  const nodeStroke   = (id: NodeId) => {
    if (hovered === id || (!!hovered && adj?.has(id))) return '#6C63FF';
    if (!hovered && activeNode === id) return '#6C63FF';
    return '#1C1C2E';
  };
  const nodeSW = (id: NodeId) => {
    if (hovered === id || (!!hovered && adj?.has(id))) return 1.5;
    if (!hovered && activeNode === id) return 1.2;
    return 0.75;
  };
  const nodeFill = (id: NodeId) => hovered === id ? '#16162A' : '#0E0E1A';
  const nodeTextFill = (id: NodeId) => {
    if (hovered === id) return '#EEEDF5';
    if (hovered && adj?.has(id)) return '#C8C6E2';
    if (hovered) return '#2E2D45';
    if (activeNode === id) return '#C8C6E2';
    return '#9290AB';
  };

  const connHighlight = (c: SysConnection) => !!hovered && (c.from === hovered || c.to === hovered);
  const connOpacity   = (c: SysConnection) => !hovered ? 1 : connHighlight(c) ? 1 : 0.12;

  /* Breathing stagger delays */
  const breatheDelay = useMemo(() => {
    const delays: Record<NodeId, string> = {
      req: '0s', api: '0.6s', backend: '1.2s', database: '1.8s', testing: '2.4s', deploy: '3.0s',
    };
    return delays;
  }, []);

  const renderNode = (n: SysNode) => (
    <g
      key={n.id}
      onMouseEnter={() => setHovered(n.id)}
      onMouseLeave={() => setHovered(null)}
      style={{ cursor: 'default' }}
      aria-label={n.label}
      role="group"
    >
      {/* Active glow (hover or cycling active) */}
      {(hovered === n.id || (!hovered && activeNode === n.id)) && (
        <rect
          x={n.cx - NW / 2 - 8} y={n.cy - NH / 2 - 8}
          width={NW + 16}        height={NH + 16}
          rx={NR + 5}
          fill="#6C63FF"
          fillOpacity={hovered === n.id ? 0.07 : 0.04}
          className={!hovered && activeNode === n.id && !reduced ? 'anim-pulse-glow' : ''}
        />
      )}

      {/* Node box — with breathing */}
      <g
        className={!reduced ? 'anim-breathe' : ''}
        style={{
          transformOrigin: `${n.cx}px ${n.cy}px`,
          animationDelay: breatheDelay[n.id],
        }}
      >
        <rect
          x={n.cx - NW / 2} y={n.cy - NH / 2}
          width={NW}         height={NH}
          rx={NR}
          fill={nodeFill(n.id)}
          fillOpacity={nodeOpacity(n.id)}
          stroke={nodeStroke(n.id)}
          strokeWidth={nodeSW(n.id)}
          style={{ transition: 'fill 0.2s ease, stroke 0.3s ease, fill-opacity 0.2s ease, stroke-width 0.15s ease' }}
        />
        <text
          x={n.cx} y={n.cy}
          textAnchor="middle" dominantBaseline="middle"
          fontSize={10} fontFamily="'Inter', system-ui, sans-serif"
          fontWeight={hovered === n.id ? 600 : 400}
          letterSpacing="0.13em"
          fill={nodeTextFill(n.id)}
          style={{ transition: 'fill 0.2s ease', userSelect: 'none' }}
        >
          {n.label}
        </text>
      </g>

      {/* Hover micro-animation */}
      <NodeMicro id={n.id} active={hovered === n.id} />
    </g>
  );

  const extraMotionProps = (c: SysConnection) =>
    ({ path: c.d, begin: c.delay, calcMode: 'linear' } as Record<string, string>);

  return (
    <div
      ref={ref}
      className="relative w-full select-none"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      role="img"
      aria-label="Engineering system pipeline: Requirement → API → Backend → Database → Testing → Deploy"
      data-cursor="explore"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-100"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(82,80,106,0.22) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto relative z-10" overflow="visible">
        <defs>
          <marker id="arr" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M0,0.5 L0,5.5 L6,3 z" fill="#1C1C2E" />
          </marker>
          <marker id="arr-hi" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M0,0.5 L0,5.5 L6,3 z" fill="#6C63FF" />
          </marker>
        </defs>

        {/* Connections — own parallax layer */}
        <motion.g style={{ x: reduced ? 0 : connX, y: reduced ? 0 : connY }}>
          {CONNS.map(c => {
            const hi   = connHighlight(c);
            const opac = connOpacity(c);
            return (
              <g key={c.id}>
                {/* Connection illuminate behind main path */}
                {!reduced && (
                  <path
                    d={c.d} fill="none"
                    stroke="#6C63FF"
                    strokeWidth="4"
                    strokeOpacity="0"
                    style={{
                      animation: hi ? 'none' : 'conn-illuminate 4s ease-in-out infinite',
                      animationDelay: c.delay,
                    }}
                  />
                )}
                <path
                  d={c.d} fill="none"
                  stroke={hi ? '#6C63FF' : '#1C1C2E'}
                  strokeWidth={hi ? 1.5 : 1}
                  strokeOpacity={opac}
                  markerEnd={hi ? 'url(#arr-hi)' : 'url(#arr)'}
                  style={{ transition: 'stroke 0.2s ease, stroke-opacity 0.2s ease, stroke-width 0.2s ease' }}
                />
                {/* Primary data packet */}
                {!reduced && (
                  <circle
                    r={hi ? 3.5 : 2.5}
                    fill={hi ? '#9B94FF' : '#6C63FF'}
                    fillOpacity={opac * 0.75}
                    style={{ transition: 'fill-opacity 0.2s ease' }}
                  >
                    <animateMotion
                      dur={c.dur}
                      repeatCount="indefinite"
                      {...extraMotionProps(c)}
                    />
                  </circle>
                )}
                {/* Secondary smaller packet — offset */}
                {!reduced && (
                  <circle
                    r={1.5}
                    fill="#9B94FF"
                    fillOpacity={opac * 0.4}
                  >
                    <animateMotion
                      dur={c.dur}
                      repeatCount="indefinite"
                      path={c.d}
                      begin={`${parseFloat(c.delay) + 1.2}s`}
                      calcMode="linear"
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </motion.g>

        {/* Layer 1 — top row (more parallax) */}
        <motion.g style={{ x: reduced ? 0 : l1X, y: reduced ? 0 : l1Y }}>
          {NODES.filter(n => n.layer === 1).map(renderNode)}
        </motion.g>

        {/* Layer 2 — bottom row (less parallax) */}
        <motion.g style={{ x: reduced ? 0 : l2X, y: reduced ? 0 : l2Y }}>
          {NODES.filter(n => n.layer === 2).map(renderNode)}
        </motion.g>
      </svg>

      <p className="text-center text-[9px] font-mono text-subtle mt-3 tracking-[0.2em] uppercase">
        Engineering Pipeline
      </p>
    </div>
  );
}
