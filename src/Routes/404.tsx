// ...existing code...
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
        padding: '2rem'
      }}
    >
      <div
        style={{
          textAlign: 'center',
          background: '#ffffff',
          padding: '2rem 2.5rem',
          borderRadius: 12,
          boxShadow: '0 10px 30px rgba(2,6,23,0.08)',
          maxWidth: 560
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            margin: 0,
            color: '#0b1220',
            letterSpacing: '-1px'
          }}
        >
          404
        </h1>
        <h2
          style={{ fontSize: '1.25rem', marginTop: '0.5rem', color: '#334155' }}
        >
          Page not found
        </h2>
        <p style={{ marginTop: '.75rem', color: '#64748b' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <a
          href="/"
          style={{
            display: 'inline-block',
            marginTop: '1.25rem',
            padding: '.6rem 1rem',
            background: '#2563eb',
            color: '#fff',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 600,
            boxShadow: '0 8px 24px rgba(37,99,235,0.18)'
          }}
        >
          Go to Home
        </a>
      </div>
    </main>
  )
}
