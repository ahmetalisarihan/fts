import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'FTS - Fetes Endüstriyel Yapı Malzemeleri'
    const description = searchParams.get('description') || 'Kaliteli yangın güvenlik sistemleri, su pompaları ve endüstriyel çözümler'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1e293b',
            backgroundImage: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '60px',
              margin: '40px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxWidth: '800px',
            }}
          >
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#1e293b',
                textAlign: 'center',
                marginBottom: '20px',
                lineHeight: 1.2,
              }}
            >
              {title}
            </h1>
            {description && (
              <p
                style={{
                  fontSize: '24px',
                  color: '#64748b',
                  textAlign: 'center',
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {description}
              </p>
            )}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '40px',
                fontSize: '20px',
                color: '#1e293b',
              }}
            >
              🏭 FTS Endüstriyel
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`Failed to generate OG image: ${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
