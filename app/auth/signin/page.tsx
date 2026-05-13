import Link from "next/link";

export const metadata = {
	title: "Sign In – AgroPulse",
	description: "Access your AgroPulse account",
};

export default function SignInPage() {
	return (
		<div>
			{/* Header */}
			<div className="mb-8">
				<h1 className="font-display mb-2 text-3xl font-black tracking-tight text-forest-950">
					Welcome back
				</h1>
				<p className="text-base text-green-700">
					Sign in to your AgroPulse account
				</p>
			</div>

			{/* Social buttons */}
			<div className="mb-7 flex gap-3">
				<button type="button" className="auth-social-btn flex-1">
					<svg width="18" height="18" viewBox="0 0 24 24">
						<path
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
							fill="#4285F4"
						/>
						<path
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							fill="#34A853"
						/>
						<path
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							fill="#FBBC05"
						/>
						<path
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							fill="#EA4335"
						/>
					</svg>
					Google
				</button>
				<button type="button" className="auth-social-btn flex-1">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="#1a2e12">
						<path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.18 0-.36-.02-.53-.06-.01-.18-.04-.39-.04-.59 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.21.06.43.06.66zm5.307 17.73c-.12.37-.65 1.27-1.2 2.1-.66 1.01-1.35 2.02-2.42 2.04-1.06.02-1.4-.63-2.61-.63-1.21 0-1.59.61-2.59.65-1.04.04-1.83-1.1-2.49-2.1-1.35-2.07-2.38-5.84-1-8.39.69-1.27 1.92-2.07 3.25-2.09 1.02-.02 1.99.69 2.61.69.63 0 1.8-.85 3.04-.73.52.02 1.97.21 2.9 1.58-.07.05-1.73 1.01-1.71 3.02.02 2.4 2.11 3.2 2.14 3.21-.02.06-.33 1.15-.92 2.28z" />
					</svg>
					Apple
				</button>
			</div>

			{/* Divider */}
			<div className="mb-7 flex items-center gap-4">
				<div className="flex-1 h-px bg-stone-200" />
				<span className="text-xs font-medium text-stone-600">
					or continue with email
				</span>
				<div className="flex-1 h-px bg-stone-200" />
			</div>

			{/* Form */}
			<form className="flex flex-col gap-4.5">
				<div>
					<label htmlFor="signin-email" className="auth-label">
						Email address
					</label>
					<input
						id="signin-email"
						type="email"
						placeholder="you@example.com"
						required
						className="auth-input"
					/>
				</div>
				<div>
					<label htmlFor="signin-password" className="auth-label">
						Password
					</label>
					<input
						id="signin-password"
						type="password"
						placeholder="Enter your password"
						required
						className="auth-input"
					/>
				</div>

				{/* Role selector */}
				<div>
					<label htmlFor="signin-role" className="auth-label">
						I am a
					</label>
					<div className="auth-role-row">
						{[
							{ value: "farmer", emoji: "🌾", label: "Farmer" },
							{ value: "buyer", emoji: "🛒", label: "Buyer" },
							{ value: "transporter", emoji: "🚗", label: "Transporter" },
						].map((r) => (
							<label key={r.value} className="auth-role-chip">
								<input
									type="radio"
									name="role"
									value={r.value}
									defaultChecked={r.value === "farmer"}
									className="hidden"
								/>
								<span className="auth-role-chip-inner">
									<span>{r.emoji}</span>
									<span>{r.label}</span>
								</span>
							</label>
						))}
					</div>
				</div>

				<div className="flex justify-end">
					<a
						href="#"
						className="text-xs font-medium text-forest-400 no-underline hover:text-forest-500"
					>
						Forgot password?
					</a>
				</div>

				<button type="submit" className="auth-submit-btn">
					Sign In
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
					>
						<path
							d="M5 12h14M12 5l7 7-7 7"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</form>

			{/* Footer link */}
			<p className="mt-7 text-center text-sm text-green-700">
				Don&#39;t have an account?{" "}
				<Link
					href="/auth/signup"
					className="font-semibold text-forest-400 no-underline hover:text-forest-500"
				>
					Create account
				</Link>
			</p>

			<style>{`
        .auth-label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #3a4d32;
          margin-bottom: 0.375rem;
          letter-spacing: 0.01em;
        }
        .auth-input {
          width: 100%;
          padding: 0.6875rem 0.875rem;
          border: 1.5px solid #dde5d8;
          border-radius: 10px;
          font-size: 0.9375rem;
          font-family: inherit;
          background: #fafcf8;
          color: #1a2e12;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
          box-sizing: border-box;
        }
        .auth-input::placeholder { color: #a8b8a0; }
        .auth-input:focus {
          border-color: #6db853;
          box-shadow: 0 0 0 3px rgba(109,184,83,0.12);
          background: #fff;
        }
        .auth-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.625rem;
          border: 1.5px solid #e8ece5;
          border-radius: 10px;
          background: #fff;
          font-size: 0.875rem;
          font-weight: 600;
          color: #1a2e12;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .auth-social-btn:hover { border-color: #c4d8bc; background: #fafcf8; }
        .auth-role-row {
          display: flex;
          gap: 0.5rem;
        }
        .auth-role-chip {
          flex: 1;
          cursor: pointer;
        }
        .auth-role-chip-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
          padding: 0.5rem 0.75rem;
          border: 1.5px solid #dde5d8;
          border-radius: 10px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #5e7c52;
          background: #fafcf8;
          transition: all 0.2s;
        }
        .auth-role-chip input:checked + .auth-role-chip-inner,
        .auth-role-chip-inner:hover {
          border-color: #6db853;
          background: #edf7e8;
          color: #3a6e2c;
        }
        input[type="radio"]:checked + .auth-role-chip-inner {
          border-color: #6db853;
          background: #edf7e8;
          color: #3a6e2c;
          box-shadow: 0 0 0 3px rgba(109,184,83,0.08);
        }
        .auth-submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #4e9239 0%, #3a6e2c 100%);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 0.9375rem;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          transition: opacity 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 8px rgba(78,146,57,0.25);
        }
        .auth-submit-btn:hover {
          opacity: 0.92;
          box-shadow: 0 4px 16px rgba(78,146,57,0.35);
        }
      `}</style>
		</div>
	);
}
