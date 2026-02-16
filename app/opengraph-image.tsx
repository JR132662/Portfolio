import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Jonathan Rodriguez — Full-Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #0a0a0f 0%, #111118 40%, #0d0d14 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gradient orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-60px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0px',
            zIndex: 1,
          }}
        >
          {/* Headline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              lineHeight: 1.15,
            }}
          >
            <span
              style={{
                fontSize: '64px',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-1px',
              }}
            >
              I build software
            </span>
            <span
              style={{
                fontSize: '64px',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-1px',
              }}
            >
              that ships, scales,
            </span>
            <span
              style={{
                fontSize: '64px',
                fontWeight: 800,
                letterSpacing: '-1px',
                background: 'linear-gradient(135deg, #818cf8, #a78bfa, #c084fc)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              and converts.
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '32px',
              gap: '4px',
            }}
          >
            <span
              style={{
                fontSize: '24px',
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                lineHeight: 1.5,
              }}
            >
              <span style={{ fontWeight: 700, color: '#ffffff' }}>Full-Stack Engineer</span> with{' '}
              <span style={{ fontWeight: 700, color: '#ffffff' }}>4+ years</span> shipping production
            </span>
            <span
              style={{
                fontSize: '24px',
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                lineHeight: 1.5,
              }}
            >
              React &amp; Next.js apps — from{' '}
              <span style={{ fontWeight: 700, color: '#ffffff' }}>80k+ LOC enterprise</span>
            </span>
            <span
              style={{
                fontSize: '24px',
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                lineHeight: 1.5,
              }}
            >
              <span style={{ fontWeight: 700, color: '#ffffff' }}>kiosks</span> to real-time{' '}
              <span style={{ fontWeight: 700, color: '#ffffff' }}>edge-AI analytics platforms</span>.
            </span>
          </div>

          {/* Domain badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '40px',
              padding: '10px 24px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
            }}
          >
            <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)' }}>
              rodtechdev.com
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
