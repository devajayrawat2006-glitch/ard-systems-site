import React, { useEffect, useRef, useState } from 'react';

export default function ARDSystems() {
  const [activeTier, setActiveTier] = useState(1);
  const [visibleElements, setVisibleElements] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const observeRefs = useRef([]);

  // Pre-loader sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800); 
    return () => clearTimeout(timer);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  // Infinite Re-triggering Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('data-id');
        setVisibleElements(prev => ({ ...prev, [id]: entry.isIntersecting }));
      });
    }, { threshold: 0.1 }); 

    observeRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (el) => {
    if (el && !observeRefs.current.includes(el)) {
      observeRefs.current.push(el);
    }
  };

  const theme = {
    bg: '#F5F5F7', 
    cardBg: '#FFFFFF', 
    textMain: '#1D1D1F', 
    textMuted: '#6E6E73', 
    border: '#E5E5EA', 
    cta: '#FF5722', 
  };

  const fonts = {
    heading: "'Space Grotesk', sans-serif", 
    body: "'Inter', sans-serif",
    mono: "'Courier New', Courier, monospace", 
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 32px',
    width: '100%',
    position: 'relative',
    zIndex: 10, 
  };

  const headlineStyle = {
    fontFamily: fonts.heading,
    fontWeight: 700, 
    fontSize: '3.8rem',
    color: theme.textMain,
    letterSpacing: '-0.04em',
    lineHeight: '1.05',
    margin: '0 0 24px 0',
  };

  const pStyle = {
    fontFamily: fonts.body,
    color: theme.textMuted,
    fontSize: '1.15rem',
    lineHeight: '1.7',
    fontWeight: 400,
    textAlign: 'justify', 
  };

  const buttonStyle = {
    backgroundColor: theme.cta,
    color: '#FFF',
    fontFamily: fonts.heading,
    fontSize: '1rem',
    fontWeight: 700,
    padding: '16px 36px',
    border: 'none',
    borderRadius: '40px', 
    cursor: 'pointer',
    marginTop: '32px',
    display: 'inline-block',
    letterSpacing: '-0.01em',
  };

  const badgeStyle = {
    display: 'inline-block',
    backgroundColor: '#1D1D1F',
    color: '#FFF',
    fontFamily: fonts.heading,
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: '6px 14px',
    borderRadius: '20px',
    marginBottom: '24px',
  };

  const pricingData = [
    {
      id: 0,
      tag: "TIER 01 // ESSENTIALS",
      title: "Basic Site",
      price: "$600",
      subPrice: "–800",
      desc: "High-speed, aggressively optimized landing page with direct contact integration. Perfect for verifying your institutional authority and building a digital foundation."
    },
    {
      id: 1,
      tag: "TIER 02 // FLAGSHIP BUILD",
      title: "Professional Site",
      price: "$1,500",
      subPrice: "+",
      desc: "Multi-page architecture, CMS integration, deep service showcases, and industrial SEO optimization designed specifically to capture high-ticket B2B leads."
    },
    {
      id: 2,
      tag: "TIER 03 // ENTERPRISE",
      title: "Premium 3D",
      price: "$3,000",
      subPrice: "+",
      desc: "Immersive technical showcases. WebGL machinery models, advanced fluid animations, and robust backend systems tailored for global international scale."
    }
  ];

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.textMain, minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');
        
        html { scroll-behavior: smooth; }

        html, body, #root { 
          margin: 0 !important; padding: 0 !important; 
          background-color: ${theme.bg} !important; border: none !important;
          outline: none !important; width: 100% !important; -webkit-font-smoothing: antialiased;
        }
        * { box-sizing: border-box; }

        /* ARCHITECTURAL BLUEPRINT GRID */
        .bg-grid {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none; z-index: 1; 
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%);
        }

        /* MODAL CSS (Lead Capture) */
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(12px);
          z-index: 999999; display: flex; align-items: center; justify-content: center;
          opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
        }
        .modal-overlay.open { opacity: 1; pointer-events: auto; }
        .modal-content {
          background: #1D1D1F; color: #FFF; width: 90%; max-width: 550px;
          border-radius: 24px; padding: 48px; position: relative;
          transform: translateY(30px); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 24px 64px rgba(0,0,0,0.4);
        }
        .modal-overlay.open .modal-content { transform: translateY(0); }
        .close-modal {
          position: absolute; top: 24px; right: 24px; background: none; border: none;
          color: #6E6E73; font-size: 1.5rem; cursor: pointer; transition: color 0.2s ease;
        }
        .close-modal:hover { color: #FFF; }
        .form-input {
          width: 100%; background: #2A2A2D; border: 1px solid #3D3D40;
          color: #FFF; padding: 16px 20px; border-radius: 12px; margin-bottom: 16px;
          font-family: ${fonts.body}; font-size: 1rem; transition: border-color 0.2s ease;
        }
        .form-input::placeholder { color: #6E6E73; }
        .form-input:focus { outline: none; border-color: ${theme.cta}; }
        
        /* Custom Select Styling */
        select.form-input {
          appearance: none;
          cursor: pointer;
          /* Simple pure CSS arrow */
          background-image: linear-gradient(45deg, transparent 50%, #6E6E73 50%), linear-gradient(135deg, #6E6E73 50%, transparent 50%);
          background-position: calc(100% - 24px) calc(1em + 4px), calc(100% - 16px) calc(1em + 4px);
          background-size: 8px 8px, 8px 8px;
          background-repeat: no-repeat;
        }
        select.form-input:focus {
          background-image: linear-gradient(45deg, transparent 50%, #FF5722 50%), linear-gradient(135deg, #FF5722 50%, transparent 50%);
        }
        select.form-input option {
          background: #2A2A2D;
          color: #FFF;
        }

        /* PRELOADER */
        .preloader {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background-color: #050505; z-index: 9999999; display: flex;
          align-items: center; justify-content: center; transition: opacity 0.8s ease-in-out;
        }
        .preloader.fade-out { opacity: 0; pointer-events: none; }
        .preloader-text {
          font-family: ${fonts.mono}; color: ${theme.cta}; font-size: 1.2rem; font-weight: bold; letter-spacing: 0.1em;
        }
        
        .loading-dots::after { content: '.'; animation: dots 1.5s steps(4, end) infinite; }
        @keyframes dots { 0%, 20% { content: ''; } 40% { content: '.'; } 60% { content: '..'; } 80%, 100% { content: '...'; } }

        /* Glitch Logo */
        @keyframes textGlitch {
          0% { text-shadow: none; transform: translate(0); }
          20% { text-shadow: -2px 0 #FF5722, 2px 0 #0066CC; transform: translate(-2px, 1px); }
          40% { text-shadow: 2px 0 #FF5722, -2px 0 #0066CC; transform: translate(2px, -1px); }
          60% { text-shadow: none; transform: translate(0); }
        }
        .brand-logo {
          cursor: pointer; display: inline-block; font-family: ${fonts.heading};
          font-weight: 700; font-size: 1.5rem; color: ${theme.textMain}; letter-spacing: -0.04em;
        }
        .brand-logo:hover { animation: textGlitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
        .brand-logo .sys-text { transition: letter-spacing 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .brand-logo:hover .sys-text { letter-spacing: 0.04em; }
        .brand-logo .dot { display: inline-block; color: ${theme.cta}; transition: all 0.3s ease; }
        .brand-logo:hover .dot { transform: scale(1.4); text-shadow: 0 0 12px rgba(255, 87, 34, 0.7); }

        .region-badge {
          background-color: #E5E5EA; color: ${theme.textMain}; font-family: ${fonts.heading};
          font-weight: 700; font-size: 0.7rem; padding: 4px 10px; border-radius: 12px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); cursor: pointer;
        }
        .region-badge:hover {
          background-color: ${theme.textMain}; color: #FFF; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .reveal-up {
          opacity: 0; transform: translateY(40px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-up.is-visible { opacity: 1; transform: translateY(0); }

        .cta-button { transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease !important; }
        .cta-button:hover { transform: scale(1.02) !important; box-shadow: 0 8px 24px rgba(255, 87, 34, 0.3) !important; }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 87, 34, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(255, 87, 34, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 87, 34, 0); }
        }
        .pulse-dot {
          width: 8px; height: 8px; background-color: ${theme.cta}; border-radius: 50%;
          animation: pulse 1.5s infinite; margin-right: 8px;
        }

        /* Toggle & Pipeline CSS */
        .pricing-toggle {
          display: flex; background: #E5E5EA; border-radius: 40px; padding: 6px;
          margin: 0 auto 48px; max-width: 500px; position: relative;
        }
        .toggle-btn {
          flex: 1; padding: 12px 24px; border: none; background: transparent;
          border-radius: 32px; font-family: ${fonts.heading}; font-weight: 700;
          font-size: 0.95rem; color: ${theme.textMuted}; cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); z-index: 2;
        }
        .toggle-btn.active { color: ${theme.textMain}; }
        .toggle-bg {
          position: absolute; top: 6px; bottom: 6px; background: #FFFFFF;
          border-radius: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); z-index: 1;
          width: calc(33.33% - 4px);
        }

        .pipeline-container { display: flex; align-items: flex-start; gap: 64px; position: relative; }
        .pipeline-sticky { flex: 0 0 35%; position: sticky; top: 140px; }
        .pipeline-content { flex: 1; border-left: 2px solid ${theme.border}; padding-left: 64px; padding-top: 16px; padding-bottom: 16px; }
        .pipeline-item { position: relative; margin-bottom: 80px; }
        .pipeline-item:last-child { margin-bottom: 0; }
        .pipeline-node {
          position: absolute; left: -89px; top: 0; width: 50px; height: 50px;
          background: ${theme.textMain}; color: #FFF; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: ${fonts.heading}; font-weight: 700; font-size: 1.2rem;
          box-shadow: 0 0 0 8px ${theme.bg}; 
        }

        @media (max-width: 900px) {
          .pipeline-container { flex-direction: column; gap: 48px; }
          .pipeline-sticky { position: static; flex: auto; }
          .pipeline-content { padding-left: 32px; }
          .pipeline-node { left: -57px; width: 40px; height: 40px; font-size: 1rem; box-shadow: 0 0 0 4px ${theme.bg}; }
          .header-right { display: none !important; }
        }
      `}} />

      {/* LEAD CAPTURE MODAL WITH DROPDOWN */}
      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={() => setIsModalOpen(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-modal" onClick={() => setIsModalOpen(false)}>✕</button>
          
          <div style={{ fontFamily: fonts.mono, color: theme.cta, marginBottom: '16px', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.1em' }}>
            // SECURE INQUIRY PORTAL
          </div>
          <h2 style={{ fontFamily: fonts.heading, fontSize: '2.5rem', fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
            Initiate Project.
          </h2>
          <p style={{ fontFamily: fonts.body, color: '#A1A1A6', fontSize: '1rem', marginBottom: '32px', lineHeight: '1.6' }}>
            Submit your technical requirements below. Our engineering team will review and respond within 24 operational hours.
          </p>

          <form action="https://api.web3forms.com/submit" method="POST">
  
  {/* YAHAN APNI KEY PASTE KARNI HAI */}
  <input type="hidden" name="access_key" value="501500aa-d881-4818-9ccc-a8a95839d9d8" />

  <input type="text" name="name" className="form-input" placeholder="Full Name" required />
  <input type="email" name="email" className="form-input" placeholder="Corporate Email Address" required />
  
  {/* Added Select Dropdown for Tiers */}
  <select name="selected_tier" className="form-input" required defaultValue="">
    <option value="" disabled hidden>Select Project Tier...</option>
    <option value="Basic Site ($600 - $800)">Tier 01 // Basic Site ($600 - $800)</option>
    <option value="Professional Site ($1,500+)">Tier 02 // Professional Site ($1,500+)</option>
    <option value="Premium 3D ($3,000+)">Tier 03 // Premium 3D Enterprise ($3,000+)</option>
  </select>

  <textarea name="requirements" className="form-input" placeholder="Project specs, timeline, and current bottlenecks..." rows="4" required></textarea>
  
  <button type="submit" className="cta-button" style={{ ...buttonStyle, width: '100%', marginTop: '16px' }}>
    Transmit Details
  </button>
</form>
        </div>
      </div>

      {/* GLOBAL GRID BACKGROUND */}
      <div className="bg-grid"></div>

      {/* TECHY PRELOADER */}
      <div className={`preloader ${!isLoading ? 'fade-out' : ''}`}>
        <div className="preloader-text">
          ARD.SYSTEMS // INITIALIZING<span className="loading-dots"></span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '20px 0', borderBottom: `1px solid ${theme.border}`, backgroundColor: 'rgba(245, 245, 247, 0.85)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ ...containerStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div className="brand-logo">
            ARD<span className="dot">.</span><span className="sys-text">SYSTEMS</span>
          </div>
          
          <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', fontFamily: fonts.heading, fontWeight: 700, fontSize: '0.75rem', color: theme.textMain, letterSpacing: '0.05em' }}>
              <div className="pulse-dot"></div>
              STATUS: LIVE
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['US', 'UK', 'AUS', 'CAN'].map(region => (
                <div key={region} className="region-badge">
                  {region}
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </nav>

      {/* 1. Hero Section */}
      <header style={{ padding: '160px 0 140px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <div style={containerStyle}>
          
          <div ref={setRef} data-id="h-tag" className={`reveal-up ${visibleElements['h-tag'] ? 'is-visible' : ''}`} style={{ ...badgeStyle, backgroundColor: '#E5E5EA', color: theme.textMain }}>
            Precision Digital Engineering
          </div>
          
          <h1 ref={setRef} data-id="h-title" className={`reveal-up ${visibleElements['h-title'] ? 'is-visible' : ''}`} style={{ ...headlineStyle, fontSize: '5rem', margin: '0 auto', maxWidth: '1000px', transitionDelay: '0.1s' }}>
            Digital infrastructure for heavy industry.
          </h1>
          
          <p ref={setRef} data-id="h-desc" className={`reveal-up ${visibleElements['h-desc'] ? 'is-visible' : ''}`} style={{ ...pStyle, margin: '24px auto 0', maxWidth: '650px', fontSize: '1.25rem', textAlign: 'center', transitionDelay: '0.2s' }}>
            We build high-performance, conversion-optimized websites for manufacturing, coating, logistics, and heavy machinery agencies.
          </p>
          
          <div ref={setRef} data-id="h-btn" className={`reveal-up ${visibleElements['h-btn'] ? 'is-visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
            <button className="cta-button" style={buttonStyle} onClick={() => setIsModalOpen(true)}>
              Initiate Project Quote
            </button>
          </div>
        </div>
      </header>

      {/* 2. Interactive Pricing Section */}
      <section style={{ padding: '120px 0', backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`, position: 'relative', zIndex: 10 }}>
        <div style={containerStyle}>
          
          <div ref={setRef} data-id="price-head" className={`reveal-up ${visibleElements['price-head'] ? 'is-visible' : ''}`} style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ ...headlineStyle, fontSize: '3rem', margin: '0 0 16px' }}>Service Architecture</h2>
            <p style={{ ...pStyle, margin: '0 auto', textAlign: 'center' }}>Transparent tiering. Interactive scaling.</p>
          </div>

          <div ref={setRef} data-id="price-toggle" className={`pricing-toggle reveal-up ${visibleElements['price-toggle'] ? 'is-visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            <div className="toggle-bg" style={{ transform: `translateX(${activeTier * 100}%)` }} />
            {pricingData.map((tier, index) => (
              <button 
                key={tier.id}
                className={`toggle-btn ${activeTier === index ? 'active' : ''}`}
                onClick={() => setActiveTier(index)}
              >
                {tier.title}
              </button>
            ))}
          </div>

          <div ref={setRef} data-id="price-card" className={`reveal-up ${visibleElements['price-card'] ? 'is-visible' : ''}`} style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', minHeight: '300px', transitionDelay: '0.2s' }}>
            <div style={badgeStyle}>
              {pricingData[activeTier].tag}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '5rem', fontFamily: fonts.heading, fontWeight: 700, color: theme.textMain, letterSpacing: '-0.04em', lineHeight: 1 }}>
                {pricingData[activeTier].price}
              </span>
              <span style={{ fontSize: '2rem', fontFamily: fonts.heading, fontWeight: 700, color: theme.textMuted, marginLeft: '4px' }}>
                {pricingData[activeTier].subPrice}
              </span>
            </div>

            <h3 style={{ fontFamily: fonts.heading, fontSize: '2.5rem', margin: '0 0 20px', fontWeight: 700, letterSpacing: '-0.03em' }}>
              {pricingData[activeTier].title}
            </h3>
            
            <p style={{ ...pStyle, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
              {pricingData[activeTier].desc}
            </p>
          </div>
        </div>
      </section>

      {/* 3. The 40/60 Pipeline Section (Why ARD) */}
      <section style={{ padding: '160px 0', position: 'relative', zIndex: 10 }}>
        <div style={containerStyle}>
          <div className="pipeline-container">
            
            <div className="pipeline-sticky">
              <div ref={setRef} data-id="sop-badge" className={`reveal-up ${visibleElements['sop-badge'] ? 'is-visible' : ''}`} style={{ ...badgeStyle, backgroundColor: '#E5E5EA', color: theme.textMain }}>
                Standard Operating Procedure
              </div>
              <h2 ref={setRef} data-id="sop-title" className={`reveal-up ${visibleElements['sop-title'] ? 'is-visible' : ''}`} style={{ ...headlineStyle, fontSize: '3.5rem', margin: 0, lineHeight: 1.1, transitionDelay: '0.1s' }}>
                Operational<br />Protocol.
              </h2>
            </div>

            <div className="pipeline-content">
              
              <div ref={setRef} data-id="p1" className={`pipeline-item reveal-up ${visibleElements['p1'] ? 'is-visible' : ''}`}>
                <div className="pipeline-node">1</div>
                <h4 style={{ fontFamily: fonts.heading, color: theme.textMain, fontSize: '2rem', margin: '0 0 16px', fontWeight: 700, letterSpacing: '-0.02em' }}>
                  Fully Async Workflow
                </h4>
                <p style={{ ...pStyle, maxWidth: '520px', margin: 0 }}>
                  You run a business. You don't have time for 90-minute Zoom calls about color palettes. We communicate via clear, actionable text and ticketing so you can stay entirely focused on your operations.
                </p>
              </div>

              <div ref={setRef} data-id="p2" className={`pipeline-item reveal-up ${visibleElements['p2'] ? 'is-visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
                <div className="pipeline-node">2</div>
                <h4 style={{ fontFamily: fonts.heading, color: theme.textMain, fontSize: '2rem', margin: '0 0 16px', fontWeight: 700, letterSpacing: '-0.02em' }}>
                  Built For Industry
                </h4>
                <p style={{ ...pStyle, maxWidth: '520px', margin: 0 }}>
                  We understand technical spec sheets, ISO certifications, and supply chain jargon. Your website won't sound like a generic marketing brochure; it will speak the exact language of B2B procurement.
                </p>
              </div>

              <div ref={setRef} data-id="p3" className={`pipeline-item reveal-up ${visibleElements['p3'] ? 'is-visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
                <div className="pipeline-node">3</div>
                <h4 style={{ fontFamily: fonts.heading, color: theme.textMain, fontSize: '2rem', margin: '0 0 16px', fontWeight: 700, letterSpacing: '-0.02em' }}>
                  Fast Deployment
                </h4>
                <p style={{ ...pStyle, maxWidth: '520px', margin: 0 }}>
                  No bloated page builders. No unoptimized templates. We write clean, precision code that loads instantly, indexes perfectly on Google algorithms, and deploys precisely at industrial speed.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. Case Study Section */}
      <section style={{ padding: '140px 0', backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderTop: `1px solid ${theme.border}`, position: 'relative', zIndex: 10 }}>
        <div style={containerStyle}>
          
          <div ref={setRef} data-id="case-head" className={`reveal-up ${visibleElements['case-head'] ? 'is-visible' : ''}`} style={{ marginBottom: '80px' }}>
            <h2 style={{ ...headlineStyle, fontSize: '3rem', margin: 0 }}>Proven Authority.</h2>
            <p style={{ ...pStyle, textAlign: 'left' }}>Real infrastructure built for certified professionals.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '64px', alignItems: 'center' }}>
            
            <div ref={setRef} data-id="case-img" className={`reveal-up ${visibleElements['case-img'] ? 'is-visible' : ''}`} style={{ flex: '1 1 450px', height: '480px', borderRadius: '24px', overflow: 'hidden', border: `1px solid ${theme.border}`, boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }}>
               <img 
                 src="image_33eec5.jpg" 
                 alt="Ajay Rawat - NACE Level 3 Coating Inspector Portfolio" 
                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
               />
            </div>
            
            <div ref={setRef} data-id="case-text" className={`reveal-up ${visibleElements['case-text'] ? 'is-visible' : ''}`} style={{ flex: '1 1 400px', transitionDelay: '0.1s' }}>
              <div style={badgeStyle}>
                LIVE DEPLOYMENT
              </div>
              
              <h3 style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '3.5rem', margin: '0 0 12px', letterSpacing: '-0.04em', lineHeight: 1 }}>
                Ajay Rawat
              </h3>
              
              <div style={{ fontFamily: fonts.heading, color: theme.cta, marginBottom: '24px', fontSize: '1.2rem', fontWeight: 700 }}>
                NACE Level 3 Coating Inspector
              </div>
              
              <p style={{ ...pStyle, marginBottom: '40px', fontSize: '1.15rem', textAlign: 'left' }}>
                Developed a highly secure, digital portfolio tailored to international protective coatings standards. Engineered a streamlined CV distribution system, verification gates for AMPP credentials, and an accessible, high-trust industrial aesthetic.
              </p>
              
              <a 
                href="https://ajay-rawat-inspector.onrender.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button" 
                style={{ ...buttonStyle, marginTop: 0 }}
              >
                Inspect Live Build &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section style={{ padding: '160px 0', textAlign: 'center', backgroundColor: '#1D1D1F', color: '#FFF', position: 'relative', zIndex: 10 }}>
        <div style={containerStyle}>
          <h2 ref={setRef} data-id="final-title" className={`reveal-up ${visibleElements['final-title'] ? 'is-visible' : ''}`} style={{ ...headlineStyle, color: '#FFF', margin: '0 auto 16px', fontSize: '4rem' }}>
            Ready to upgrade?
          </h2>
          
          <p ref={setRef} data-id="final-p" className={`reveal-up ${visibleElements['final-p'] ? 'is-visible' : ''}`} style={{ ...pStyle, color: '#A1A1A6', maxWidth: '500px', margin: '0 auto', textAlign: 'center', transitionDelay: '0.1s' }}>
            Stop losing international bids because of an outdated website. Secure your digital infrastructure today.
          </p>
          
          <div ref={setRef} data-id="final-btn" className={`reveal-up ${visibleElements['final-btn'] ? 'is-visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <button className="cta-button" style={{ ...buttonStyle, backgroundColor: '#FFF', color: '#1D1D1F' }} onClick={() => setIsModalOpen(true)}>
              Start Your Project
            </button>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer style={{ padding: '48px 0', textAlign: 'center', backgroundColor: '#F5F5F7', position: 'relative', zIndex: 10 }}>
        <div style={{ ...containerStyle, fontFamily: fonts.heading, fontWeight: 600, color: theme.textMuted, fontSize: '0.85rem' }}>
          <div className="brand-logo" style={{ fontSize: '1rem', marginBottom: '8px' }}>
            ARD<span className="dot">.</span><span className="sys-text">SYSTEMS</span>
          </div>
          <div>© 2026. All rights reserved.</div>
          <span style={{ opacity: 0.6, marginTop: '8px', display: 'inline-block' }}>Operating at peak efficiency.</span>
        </div>
      </footer>
    </div>
  );
}