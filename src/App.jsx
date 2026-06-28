import React from 'react';

export default function ARDSystems() {
  const theme = {
    bg: '#010103',
    accent: '#0DC7C5',
    cta: '#FF5722',
    textMain: '#E5E7EB',
    textMuted: '#9CA3AF',
    border: '#1F2937',
    cardBg: '#0A0A0E',
  };

  const fonts = {
    heading: "'Inter', sans-serif",
    mono: "'Courier New', Courier, monospace",
  };

  // Common Styles
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  };

  const sectionStyle = {
    padding: '96px 0',
    borderBottom: `1px solid ${theme.border}`,
  };

  const headlineStyle = {
    fontFamily: fonts.heading,
    fontWeight: 300,
    fontSize: '3rem',
    color: theme.textMain,
    marginBottom: '24px',
    letterSpacing: '-0.02em',
  };

  const monoTextStyle = {
    fontFamily: fonts.mono,
    color: theme.textMuted,
    fontSize: '1rem',
    lineHeight: '1.6',
  };

  const buttonStyle = {
    backgroundColor: theme.cta,
    color: '#FFF',
    fontFamily: fonts.mono,
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding: '16px 32px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '32px',
    display: 'inline-block',
  };

  const cardStyle = {
    backgroundColor: theme.cardBg,
    border: `1px solid ${theme.border}`,
    padding: '32px',
    borderRadius: '8px',
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.textMain, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Inject Google Font and global reset */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; background-color: ${theme.bg}; }
      `}} />

      {/* Navigation */}
      <nav style={{ padding: '24px', borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ ...containerStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: fonts.mono, fontWeight: 'bold', fontSize: '1.2rem', color: theme.textMain }}>
            ARD<span style={{ color: theme.accent }}>_</span>SYSTEMS
          </div>
          <div style={{ fontFamily: fonts.mono, color: theme.textMuted, fontSize: '0.9rem' }}>
            [ US | UK | AUS | CAN ]
          </div>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <header style={{ padding: '120px 0', textAlign: 'center' }}>
        <div style={containerStyle}>
          <div style={{ fontFamily: fonts.mono, color: theme.accent, marginBottom: '16px', letterSpacing: '0.1em' }}>
            // HEAVY INDUSTRIAL WEB DESIGN
          </div>
          <h1 style={{ ...headlineStyle, fontSize: '4.5rem', margin: '0 auto', maxWidth: '800px', lineHeight: '1.1' }}>
            We build websites for the industrial world.
          </h1>
          <p style={{ ...monoTextStyle, margin: '32px auto 0', maxWidth: '600px', fontSize: '1.1rem' }}>
            High-performance frontend engineering for manufacturing, coating, logistics, and heavy machinery agencies.
          </p>
          <button style={buttonStyle}>Get a Free Quote</button>
        </div>
      </header>

      {/* 2. Services Section */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={headlineStyle}>Our Packages</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginTop: '48px' }}>
            
            {/* Basic Tier */}
            <div style={cardStyle}>
              <h3 style={{ fontFamily: fonts.mono, color: theme.accent, marginTop: 0 }}>01 // Basic Site</h3>
              <div style={{ fontSize: '2rem', fontFamily: fonts.heading, fontWeight: 300, marginBottom: '16px' }}>$600–800</div>
              <p style={monoTextStyle}>Essential online presence. High-speed, responsive landing page with contact integration.</p>
            </div>

            {/* Professional Tier */}
            <div style={{ ...cardStyle, border: `1px solid ${theme.accent}` }}>
              <h3 style={{ fontFamily: fonts.mono, color: theme.accent, marginTop: 0 }}>02 // Professional Site</h3>
              <div style={{ fontSize: '2rem', fontFamily: fonts.heading, fontWeight: 300, marginBottom: '16px' }}>$1,500–2,500</div>
              <p style={monoTextStyle}>Multi-page architecture, CMS integration, service showcases, and SEO optimization.</p>
            </div>

            {/* Premium Tier */}
            <div style={cardStyle}>
              <h3 style={{ fontFamily: fonts.mono, color: theme.accent, marginTop: 0 }}>03 // Premium 3D/Animated</h3>
              <div style={{ fontSize: '2rem', fontFamily: fonts.heading, fontWeight: 300, marginBottom: '16px' }}>$3,000–5,000+</div>
              <p style={monoTextStyle}>Immersive technical showcases. WebGL models of machinery, advanced animations, and robust backend.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Why ARD Section */}
      <section style={{ ...sectionStyle, backgroundColor: '#050508' }}>
        <div style={containerStyle}>
          <h2 style={headlineStyle}>Why ARD Systems?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', marginTop: '48px' }}>
            
            <div style={{ flex: '1 1 250px' }}>
              <h4 style={{ fontFamily: fonts.mono, color: theme.textMain, fontSize: '1.2rem' }}>&gt; Fully Async Work</h4>
              <p style={monoTextStyle}>Zero unnecessary meetings. No long calls. We communicate clearly through text and tickets so you can focus on your actual business.</p>
            </div>

            <div style={{ flex: '1 1 250px' }}>
              <h4 style={{ fontFamily: fonts.mono, color: theme.textMain, fontSize: '1.2rem' }}>&gt; Fast Delivery</h4>
              <p style={monoTextStyle}>Industrial speed. We deploy standard sites in days, not months. Iterations are handled with precision code, no bloated page builders.</p>
            </div>

            <div style={{ flex: '1 1 250px' }}>
              <h4 style={{ fontFamily: fonts.mono, color: theme.textMain, fontSize: '1.2rem' }}>&gt; Built for Industry</h4>
              <p style={monoTextStyle}>We understand technical specs, certifications, and B2B procurement pipelines. Your site will speak the language of your clients.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Case Study Section */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={{ ...headlineStyle, marginBottom: '48px' }}>Featured Case Study</h2>
          <div style={{ ...cardStyle, flexDirection: 'row', flexWrap: 'wrap', gap: '32px', alignItems: 'center' }}>
            <div style={{ flex: '1 1 300px', backgroundColor: '#111', height: '250px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px dashed ${theme.border}` }}>
              <span style={{ fontFamily: fonts.mono, color: theme.textMuted }}>[ Portfolio UI Render ]</span>
            </div>
            <div style={{ flex: '1 1 300px' }}>
              <h3 style={{ fontFamily: fonts.heading, fontWeight: 300, fontSize: '2rem', margin: '0 0 8px' }}>
                Ajay Rawat
              </h3>
              <div style={{ fontFamily: fonts.mono, color: theme.accent, marginBottom: '24px' }}>
                NACE Level 3 Coating Inspector
              </div>
              <p style={monoTextStyle}>
                Developed a robust, high-trust digital portfolio tailored to international protective coatings standards. The build included a streamlined CV download system, certification verification gates, and a highly accessible, stark industrial aesthetic.
              </p>
              <a href="#" style={{ fontFamily: fonts.mono, color: theme.textMain, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}`, paddingBottom: '4px', marginTop: '16px', display: 'inline-block' }}>
                View Project Details &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section style={{ padding: '120px 0', textAlign: 'center', flexGrow: 1 }}>
        <div style={containerStyle}>
          <h2 style={{ ...headlineStyle, margin: '0 auto 24px' }}>Ready to go digital?</h2>
          <p style={monoTextStyle}>Upgrade your agency's frontend infrastructure today.</p>
          <button style={buttonStyle}>Get a Free Quote</button>
        </div>
      </section>

      {/* 6. Footer */}
      <footer style={{ borderTop: `1px solid ${theme.border}`, padding: '48px 0', textAlign: 'center', backgroundColor: '#000' }}>
        <div style={{ ...containerStyle, fontFamily: fonts.mono, color: theme.textMuted, fontSize: '0.9rem' }}>
          ARD Systems © 2025. All rights reserved.<br/>
          <span style={{ opacity: 0.5 }}>System status: Operational</span>
        </div>
      </footer>
    </div>
  );
}