import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'SMORCE — AI-Powered Digital Experiences';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0F1012',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F2EFE9',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background glow effects */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(215, 38, 56, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40, gap: 16 }}>
          <div style={{ display: 'flex', width: 64, height: 64, background: '#F2EFE9', color: '#0F1012', fontSize: 40, fontWeight: 900, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
            S
          </div>
          <span style={{ fontSize: 48, fontWeight: 800, letterSpacing: '0.02em' }}>
            SMORCE
          </span>
        </div>

        {/* Text */}
        <h1 style={{ fontSize: 72, fontWeight: 800, textAlign: 'center', maxWidth: 900, lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.02em' }}>
          AI-Powered Digital Experiences
        </h1>
        <p style={{ fontSize: 32, color: '#8A8C91', textAlign: 'center', maxWidth: 800 }}>
          Premium software, intelligent automations and high-converting digital products.
        </p>
      </div>
    ),
    { ...size }
  );
}
