import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') ?? 'Nitro Ecom Blog';
  const category = searchParams.get('category') ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#050505',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Fondo: green glow top-left */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            left: '-80px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,255,157,0.15) 0%, transparent 70%)',
          }}
        />
        {/* Fondo: glow bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            right: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,255,157,0.08) 0%, transparent 70%)',
          }}
        />

        {/* TOP: Logo + Category */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#00ff9d', fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px' }}>
              NITRO
            </span>
            <span style={{ color: '#ffffff', fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px' }}>
              {' '}ECOM
            </span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 500, marginLeft: '8px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              [ por Juan Arango ]
            </span>
          </div>
          {/* Category badge */}
          {category && (
            <div
              style={{
                background: 'rgba(0,255,157,0.1)',
                border: '1px solid rgba(0,255,157,0.3)',
                borderRadius: '999px',
                color: '#00ff9d',
                fontSize: '14px',
                fontWeight: 700,
                padding: '6px 18px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              {category}
            </div>
          )}
        </div>

        {/* CENTER: Título */}
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', paddingTop: '32px', paddingBottom: '32px' }}>
          <h1
            style={{
              color: '#ffffff',
              fontSize: title.length > 60 ? '44px' : '56px',
              fontWeight: 900,
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: '-1px',
              maxWidth: '900px',
            }}
          >
            {title}
          </h1>
        </div>

        {/* BOTTOM: URL */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff9d' }} />
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px', fontWeight: 500, letterSpacing: '0.5px' }}>
            juanarangoecommerce.com/blog
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
