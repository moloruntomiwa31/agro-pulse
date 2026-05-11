const roles = [
	{
		id: "farmer",
		emoji: "🌾",
		title: "For Farmers",
		tagline: "Grow more. Earn more. Waste less.",
		color: "#6db853",
		bgGradient:
			"linear-gradient(135deg, rgba(78,146,57,0.15), rgba(58,110,44,0.05))",
		benefits: [
			"AI-powered demand forecast before you harvest",
			"Direct buyer connections — no broker fees",
			"Instant payment on delivery confirmation",
			"Build your farm reputation with ratings",
			"Market price insights updated in real-time",
			"Schedule recurring supply contracts",
		],
		cta: "Join as Farmer",
		ctaId: "role-farmer-cta",
	},
	{
		id: "buyer",
		emoji: "🛒",
		title: "For Buyers",
		tagline: "Fresh. Direct. Reliable supply.",
		color: "#7bbef0",
		bgGradient:
			"linear-gradient(135deg, rgba(123,190,240,0.12), rgba(70,150,220,0.04))",
		benefits: [
			"Browse verified farms by location & crop",
			"Place bulk or spot orders with escrow protection",
			"Track your delivery in real-time",
			"Set recurring purchase contracts",
			"Quality-rated produce with photo evidence",
			"Invoice and payment history dashboard",
		],
		cta: "Register as Buyer",
		ctaId: "role-buyer-cta",
	},
	{
		id: "rider",
		emoji: "🚴",
		title: "For Riders",
		tagline: "More trips. Higher earnings.",
		color: "#f0c04a",
		bgGradient:
			"linear-gradient(135deg, rgba(240,192,74,0.12), rgba(217,165,32,0.04))",
		benefits: [
			"Smart route optimisation for every pickup",
			"Instant payout after delivery confirmation",
			"Vehicle and insurance support program",
			"Priority trips based on rating score",
			"Flexible hours — ride when you want",
			"Dedicated rider support line 24/7",
		],
		cta: "Become a Rider",
		ctaId: "role-rider-cta",
	},
];

export default function RolesSection() {
	return (
		<section id="marketplace" className="relative py-28 px-6">
			<div
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(ellipse 60% 40% at 50% 100%, rgba(58,110,44,0.1) 0%, transparent 70%)",
				}}
			/>

			<div className="mx-auto max-w-6xl relative">
				<div className="mb-16 text-center">
					<div className="mb-5 flex justify-center">
						<span className="section-label">Three Roles, One Platform</span>
					</div>
					<h2 className="font-display mb-4 text-[clamp(2rem,4vw,3rem)] font-black tracking-tight text-white/95 leading-tight">
						Built for everyone in the{" "}
						<span className="text-gradient-green">food supply chain</span>
					</h2>
				</div>

				<div className="roles-grid">
					{roles.map((role) => (
						<div
							key={role.id}
							className="card-hover rounded-3xl p-8 border border-green-600/15 flex flex-col"
							style={{ background: role.bgGradient }}
						>
							<div className="mb-6">
								<div
									className="mb-5 flex h-15 w-15 items-center justify-center rounded-2xl border text-2xl"
									style={{
										background: `${role.color}15`,
										borderColor: `${role.color}30`,
									}}
								>
									{role.emoji}
								</div>
								<h3 className="font-display mb-1.5 text-2xl font-black text-white/95 tracking-tight">
									{role.title}
								</h3>
								<p
									className="text-base font-medium"
									style={{ color: role.color }}
								>
									{role.tagline}
								</p>
							</div>

							<ul className="mb-8 flex-1 space-y-3">
								{role.benefits.map((b) => (
									<li
										key={b}
										className="flex items-start gap-2.5 text-sm leading-relaxed text-green-200"
									>
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											className="mt-0.5 shrink-0"
										>
											<circle
												cx="12"
												cy="12"
												r="10"
												fill={`${role.color}20`}
												stroke={role.color}
												strokeWidth="1.5"
											/>
											<path
												d="M8 12l3 3 5-5"
												stroke={role.color}
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										{b}
									</li>
								))}
							</ul>

							<a
								href="#join"
								id={role.ctaId}
								className="role-cta-btn"
								style={{ "--role-color": role.color } as React.CSSProperties}
							>
								{role.cta}
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										d="M5 12h14M12 5l7 7-7 7"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</a>
						</div>
					))}
				</div>
			</div>

			<style>{`
        .roles-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .role-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem;
          border-radius: 12px;
          background: color-mix(in srgb, var(--role-color) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--role-color) 40%, transparent);
          color: var(--role-color);
          font-weight: 700;
          font-size: 0.9375rem;
          text-decoration: none;
          transition: all 0.25s;
        }
        .role-cta-btn:hover {
          background: color-mix(in srgb, var(--role-color) 22%, transparent);
          border-color: color-mix(in srgb, var(--role-color) 60%, transparent);
        }
        @media (max-width: 900px) { .roles-grid { grid-template-columns: 1fr; } }
      `}</style>
		</section>
	);
}
