"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactFlow, Background, Handle, Position, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Custom Software Engineering",
    description: "Scalable, enterprise-grade applications tailored to your specific operational needs and user demands.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    )
  },
  {
    id: 2,
    title: "AI Systems & Automation",
    description: "Intelligent workflows and autonomous agents designed to eliminate manual bottlenecks.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    )
  },
  {
    id: 3,
    title: "Cloud & DevOps Infrastructure",
    description: "Secure, high-availability cloud environments engineered for zero-downtime scaling.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
      </svg>
    )
  },
  {
    id: 4,
    title: "Creative & Growth Systems",
    description: "Data-driven creative execution and growth loops that reliably scale customer acquisition.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    )
  }
];

/* ───────────── Custom React Flow Nodes ───────────── */

// Minimal trigger-style input node (like Zaptick's "On new lead")
const InputNode = ({ data }) => (
  <div style={{
    background: '#ffffff',
    border: '1.5px solid #e0e0e0',
    borderRadius: '14px',
    padding: '14px 20px',
    minWidth: '180px',
    display: 'flex', alignItems: 'center', gap: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  }}>
    <div style={{
      width: '32px', height: '32px', borderRadius: '8px',
      background: data.color || '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#1a2a3a', flexShrink: 0
    }}>
      {data.icon}
    </div>
    <div>
      <div style={{ fontSize: '10px', color: '#999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{data.tag}</div>
      <div style={{ fontSize: '13px', color: '#1a2a3a', fontWeight: 600, marginTop: '2px' }}>{data.label}</div>
    </div>
    <Handle type="source" position={Position.Bottom} style={{ background: '#00c8c8', border: '2px solid #fff', width: '10px', height: '10px', bottom: '-5px' }} />
  </div>
);

// GoHigh Growth Engine — central hub
const CenterNode = ({ data }) => (
  <div style={{
    background: '#1a2a3a',
    borderRadius: '20px',
    padding: '18px 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
    boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
    minWidth: '160px',
  }}>
    <Handle type="target" position={Position.Top} style={{ background: '#00c8c8', border: '2px solid #1a2a3a', width: '10px', height: '10px', top: '-5px' }} />
    <img src="/Image/goHighLogo.png" alt="GoHigh" style={{ height: '120px', objectFit: 'contain', filter: 'brightness(0) invert(1)', margin: '-8px 0' }} />
    <div style={{ color: '#00e5e5', fontSize: '10px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px' }}>
      Growth Engine
    </div>
    <Handle type="source" position={Position.Bottom} style={{ background: '#00c8c8', border: '2px solid #1a2a3a', width: '10px', height: '10px', bottom: '-5px' }} />
  </div>
);

// Clean output service node
const ServiceNode = ({ data }) => (
  <div style={{
    background: data.active ? '#ffffff' : '#fafafa',
    border: data.active ? '2px solid #00c8c8' : '1.5px solid #e8e8e8',
    borderRadius: '14px',
    padding: '14px 20px',
    minWidth: '190px',
    display: 'flex', alignItems: 'center', gap: '12px',
    boxShadow: data.active ? '0 4px 20px rgba(0,200,200,0.2)' : '0 2px 8px rgba(0,0,0,0.04)',
    transform: data.active ? 'scale(1.04)' : 'scale(1)',
    transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
  }}>
    <Handle type="target" position={Position.Top} style={{ background: '#00c8c8', border: '2px solid #fff', width: '10px', height: '10px', top: '-5px' }} />
    <div style={{
      width: '36px', height: '36px', borderRadius: '10px',
      background: '#e6fafa',
      color: '#00a5a5',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0
    }}>
      {data.icon}
    </div>
    <div>
      <div style={{ fontSize: '13px', color: '#1a2a3a', fontWeight: 600 }}>{data.label}</div>
      <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>{data.sub}</div>
    </div>
  </div>
);

// Invisible node used to shift the fitView center
const AnchorNode = () => <div style={{ width: '1px', height: '1px' }} />;

const nodeTypes = { input: InputNode, center: CenterNode, service: ServiceNode, anchor: AnchorNode };

/* ───────────── Icons ───────────── */
const icons = {
  data: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  trigger: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  code: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  ai: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  cloud: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>,
  chart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
};

/* ───────────── Node Positions (vertical layout: top → middle → bottom) ───────────── */
const initialNodes = [
  // TOP: two input trigger nodes side by side
  { id: 'in-1', type: 'input', position: { x: -150, y: 0 }, data: { label: 'New Lead Created', tag: 'Trigger', icon: icons.trigger, color: '#fff3e0' } },
  { id: 'in-2', type: 'input', position: { x: 150, y: 0 }, data: { label: 'Data Sync', tag: 'Source', icon: icons.data, color: '#e8f5e9' } },

  // MIDDLE: GoHigh Growth Engine — centered
  { id: 'center', type: 'center', position: { x: 0, y: 180 }, data: {} },

  // BOTTOM: 4 service outputs spread horizontally
  { id: 'out-1', type: 'service', position: { x: -450, y: 420 }, data: { label: 'Software Eng.', sub: 'Custom Solutions', icon: icons.code, active: false } },
  { id: 'out-2', type: 'service', position: { x: -150, y: 420 }, data: { label: 'AI Systems', sub: 'Autonomous Agents', icon: icons.ai, active: false } },
  { id: 'out-3', type: 'service', position: { x: 150, y: 420 }, data: { label: 'Cloud & DevOps', sub: 'Scalable Infra', icon: icons.cloud, active: false } },
  { id: 'out-4', type: 'service', position: { x: 450, y: 420 }, data: { label: 'Growth Systems', sub: 'Creative Execution', icon: icons.chart, active: false } },
];

const edgeDefaults = { type: 'smoothstep', style: { strokeWidth: 2 } };

const initialEdges = [
  { id: 'e1-c', source: 'in-1', target: 'center', ...edgeDefaults, animated: true, style: { ...edgeDefaults.style, stroke: '#00c8c8', strokeDasharray: '6 3' } },
  { id: 'e2-c', source: 'in-2', target: 'center', ...edgeDefaults, animated: true, style: { ...edgeDefaults.style, stroke: '#00c8c8', strokeDasharray: '6 3' } },
  { id: 'ec-o1', source: 'center', target: 'out-1', ...edgeDefaults, style: { ...edgeDefaults.style, stroke: '#e0e0e0' } },
  { id: 'ec-o2', source: 'center', target: 'out-2', ...edgeDefaults, style: { ...edgeDefaults.style, stroke: '#e0e0e0' } },
  { id: 'ec-o3', source: 'center', target: 'out-3', ...edgeDefaults, style: { ...edgeDefaults.style, stroke: '#e0e0e0' } },
  { id: 'ec-o4', source: 'center', target: 'out-4', ...edgeDefaults, style: { ...edgeDefaults.style, stroke: '#e0e0e0' } },
];

/* ───────────── Workflow Visualization ───────────── */
const WorkflowVisualization = ({ activeTab }) => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id.startsWith('out-')) {
          const idx = parseInt(node.id.split('-')[1]) - 1;
          return { ...node, data: { ...node.data, active: idx === activeTab } };
        }
        return node;
      })
    );

    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id.startsWith('ec-o')) {
          const idx = parseInt(edge.id.split('-o')[1]) - 1;
          const isActive = idx === activeTab;
          return {
            ...edge,
            animated: isActive,
            style: {
              stroke: isActive ? '#00c8c8' : '#e0e0e0',
              strokeWidth: isActive ? 2.5 : 1.5,
              strokeDasharray: isActive ? '6 3' : 'none',
              filter: isActive ? 'drop-shadow(0 0 4px rgba(0,200,200,0.4))' : 'none',
            },
            zIndex: isActive ? 10 : 1,
          };
        }
        return edge;
      })
    );
  }, [activeTab, setNodes, setEdges]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2, maxZoom: 1 }}
        zoomOnScroll={false}
        panOnDrag={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant="dots" color="#d4d4d4" gap={18} size={1.2} />
      </ReactFlow>
    </div>
  );
};

/* ───────────── Main Section ───────────── */
const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        background: '#f9f9f9',
        padding: '100px 40px',
        fontFamily: 'var(--font-montserrat), sans-serif',
        color: '#1a2a3a',
        position: 'relative', overflow: 'hidden'
      }}
    >
      <div ref={contentRef} style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', color: '#1a2a3a', marginBottom: '16px', fontWeight: 600 }}>
            Our Services
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: '#1a2a3a', margin: '0 0 24px 0', lineHeight: 1.2, letterSpacing: '-0.5px' }}>
            Intelligent Systems Built To Scale Businesses
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(26,42,58,0.7)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            We build scalable digital systems that combine AI, automation, infrastructure, and creative execution for modern business growth.
          </p>
        </div>

        {/* Main Interactive Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px',
          alignItems: 'stretch', background: '#ffffff', borderRadius: '24px',
          padding: '40px', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.05)',
        }} className="services-grid">

          {/* Left: Service List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#999', marginBottom: '8px' }}>
              SERVICE LIST
            </h3>

            {services.map((service, index) => {
              const isActive = activeTab === index;
              return (
                <div
                  key={service.id}
                  onClick={() => setActiveTab(index)}
                  style={{
                    padding: '20px 24px', borderRadius: '16px', cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: isActive ? '#f0fafa' : 'transparent',
                    border: isActive ? '1.5px solid rgba(0,200,200,0.25)' : '1.5px solid transparent',
                    position: 'relative', overflow: 'hidden'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 2 }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '12px',
                      background: isActive ? '#00e5e5' : 'rgba(26,42,58,0.05)',
                      color: isActive ? '#1a2a3a' : 'rgba(26,42,58,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.3s ease', flexShrink: 0
                    }}>
                      {service.icon}
                    </div>
                    <div>
                      <h4 style={{
                        fontSize: '16px', fontWeight: 600, margin: '0 0 4px 0',
                        color: isActive ? '#1a2a3a' : 'rgba(26,42,58,0.5)',
                        transition: 'color 0.3s ease'
                      }}>
                        {service.title}
                      </h4>
                      <div style={{
                        maxHeight: isActive ? '60px' : '0', opacity: isActive ? 1 : 0,
                        overflow: 'hidden', transition: 'all 0.35s ease'
                      }}>
                        <p style={{ fontSize: '13px', color: 'rgba(26,42,58,0.55)', lineHeight: 1.5, margin: 0 }}>
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, height: '2px',
                      background: 'linear-gradient(90deg, #00e5e5, #00c8c8)',
                      animation: 'progress 4s linear forwards',
                    }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: React Flow Visualization */}
          <div style={{
            background: '#fafafa',
            borderRadius: '20px',
            minHeight: '520px',
            position: 'relative', overflow: 'hidden',
            border: '1px solid #ebebeb',
          }}>
            <WorkflowVisualization activeTab={activeTab} />
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            padding: 24px !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 768px) {
          section {
            padding: 60px 20px !important;
          }
          .services-grid {
            padding: 20px !important;
          }
          h2 {
            font-size: 28px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
