import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left brand strip */}
        <div className="auth-brand">
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "2rem" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "12px",
                background: "linear-gradient(135deg, #4e9239 0%, #3a6e2c 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 16px rgba(78,146,57,0.3)",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8 2 4 5.5 4 10c0 3 1.5 5.5 4 7l1 5h6l1-5c2.5-1.5 4-4 4-7 0-4.5-4-8-8-8z" fill="#e8f7e1" fillOpacity="0.9"/>
                  <path d="M12 6v8M9 9l3-3 3 3" stroke="#c4ecb0" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-display" style={{ fontSize: "1.375rem", fontWeight: 800, color: "#1a2e12", letterSpacing: "-0.02em" }}>
                Agro<span style={{ color: "#4e9239" }}>Pulse</span>
              </span>
            </div>
          </Link>
          <h2 className="font-display" style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1a2e12", lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
            The smarter way to<br />grow your farm business
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "#5e7c52", lineHeight: 1.7 }}>
            AI-powered marketplace connecting farmers, buyers, and delivery riders across Africa.
          </p>

          {/* Trust badges */}
          <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { icon: "🛡️", text: "Bank-level encryption" },
              { icon: "⚡", text: "Instant payment settlement" },
              { icon: "📊", text: "AI demand forecasting" },
            ].map((badge) => (
              <div key={badge.text} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <span style={{ fontSize: "1.125rem" }}>{badge.icon}</span>
                <span style={{ fontSize: "0.8125rem", color: "#5e7c52", fontWeight: 500 }}>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right form area */}
        <div className="auth-form-area">
          {children}
        </div>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          background: #fafcf8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .auth-container {
          display: grid;
          grid-template-columns: 380px 1fr;
          max-width: 920px;
          width: 100%;
          background: #fff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 40px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.06);
          min-height: 580px;
        }
        .auth-brand {
          background: linear-gradient(180deg, #f0f7ec 0%, #e4f1dc 100%);
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-right: 1px solid rgba(110,184,83,0.12);
        }
        .auth-form-area {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .auth-container {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .auth-brand { display: none; }
          .auth-form-area { padding: 2rem 1.5rem; }
        }
      `}</style>
    </div>
  );
}
