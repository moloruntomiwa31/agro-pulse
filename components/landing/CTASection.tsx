export default function CTASection() {
	const roles = [
		{ label: "🌾 I'm a Farmer", id: "cta-farmer" },
		{ label: "🛒 I'm a Buyer", id: "cta-buyer" },
		{ label: "� I'm a Transporter", id: "cta-transporter" },
	];

	return (
		<section id="join" className="py-20 px-6">
			<div className="mx-auto max-w-4xl">
				<div className="relative overflow-hidden rounded-4xl border border-green-600/20 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-900 p-20 text-center">
					{/* Blobs */}
					<div
						className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-blur-40 pointer-events-none"
						style={{
							background:
								"radial-gradient(circle, rgba(78,146,57,0.25), transparent 70%)",
							filter: "blur(40px)",
						}}
					/>
					<div
						className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-blur-40 pointer-events-none"
						style={{
							background:
								"radial-gradient(circle, rgba(240,192,74,0.15), transparent 70%)",
							filter: "blur(40px)",
						}}
					/>

					<div className="relative z-1">
						<div className="mb-6 flex justify-center">
							<span className="section-label">Early Access — Free to Join</span>
						</div>

						<h2 className="font-display mb-5 text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tight text-white/95 leading-tight">
							Ready to transform your
							<br />
							<span className="text-gradient-green">
								agricultural business?
							</span>
						</h2>

						<p className="mx-auto mb-10 max-w-lg text-lg text-green-600 leading-relaxed">
							Join 2,400+ farmers, buyers and transporters already using
							AgroPulse to eliminate waste, boost income, and build a smarter
							supply chain.
						</p>

						{/* Email form */}
						<form className="cta-form mx-auto mb-6 flex max-w-lg gap-3 flex-wrap">
							<input
								id="cta-email-input"
								type="email"
								placeholder="Enter your email address"
								className="input-field flex-1 min-w-56"
							/>
							<button
								id="cta-join-btn"
								type="submit"
								className="btn-gold flex-shrink-0"
							>
								Get Early Access
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

						<p className="mb-8 text-xs text-green-900">
							No credit card required · Free forever for farmers · GDPR
							compliant
						</p>

						{/* Role buttons */}
						<div className="flex flex-wrap justify-center gap-3">
							{roles.map((role) => (
								<button key={role.id} id={role.id} className="role-pill">
									{role.label}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>

			<style>{`
        .cta-form input, .cta-form button { font-family: inherit; }
        .role-pill {
          rounded-full py-2 px-5
          border border-green-600/25;
          bg-green-600/8;
          text-green-200;
          text-sm font-semibold;
          cursor-pointer;
          transition-all duration-200;
          font-family: inherit;
        }
        .role-pill:hover {
          background: rgba(109,184,83,0.18);
          color: #c4ecb0;
          border-color: rgba(110,184,83,0.45);
        }
        @media (max-width: 600px) {
          .cta-form { flex-direction: column; }
          .cta-form input, .cta-form button { width: 100%; justify-content: center; }
        }
      `}</style>
		</section>
	);
}
