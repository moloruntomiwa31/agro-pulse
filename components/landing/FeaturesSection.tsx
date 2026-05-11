const features = [
	{
		icon: "🧠",
		label: "AI Core",
		title: "Demand Forecasting",
		description:
			"Our AI analyses market trends, weather patterns, and historical data to predict which produce will be in demand — so you harvest and sell at peak price.",
		stat: "94%",
		statLabel: "forecast accuracy",
		color: "#6db853",
	},
	{
		icon: "🚚",
		label: "Logistics",
		title: "On-Demand Delivery",
		description:
			"Connect with vetted riders in your area instantly. Real-time GPS tracking, route optimisation, and delivery confirmation — all from one dashboard.",
		stat: "< 40min",
		statLabel: "avg. pickup time",
		color: "#f0c04a",
	},
	{
		icon: "💳",
		label: "Finance",
		title: "Smart Payment Split",
		description:
			"Escrow-protected transactions with automatic split payments. Farmers receive funds on delivery confirmation, riders get paid instantly — zero disputes.",
		stat: "₦0",
		statLabel: "transaction fees",
		color: "#7bbef0",
	},
	{
		icon: "🔍",
		label: "Discovery",
		title: "Verified Buyer Network",
		description:
			"Every buyer is KYC-verified. Browse by location, volume, and crop type. Build long-term contracts or sell spot — your supply chain, your rules.",
		stat: "2,400+",
		statLabel: "verified buyers",
		color: "#e885a0",
	},
	{
		icon: "📊",
		label: "Analytics",
		title: "Farm Intelligence",
		description:
			"Track earnings, see demand heatmaps, compare your prices against market averages, and plan your next planting season with confidence.",
		stat: "Live",
		statLabel: "market data",
		color: "#b07bf0",
	},
	{
		icon: "🛡️",
		label: "Trust",
		title: "Quality Assurance",
		description:
			"Buyers rate produce on arrival. Farmers build reputation scores. Disputes are resolved in under 24 hours with our in-app mediation system.",
		stat: "4.9★",
		statLabel: "avg. farmer rating",
		color: "#f0c04a",
	},
];

export default function FeaturesSection() {
	return (
		<section id="features" className="relative py-28 px-6">
			<div className="absolute inset-x-1/2 top-0 h-px w-96 -translate-x-1/2 bg-gradient-to-r from-transparent via-green-600/40 to-transparent" />

			<div className="mx-auto max-w-6xl">
				<div className="mb-16 text-center">
					<div className="mb-5 flex justify-center">
						<span className="section-label">Intelligent Ecosystem</span>
					</div>
					<h2 className="font-display mb-4 text-[clamp(2rem,4vw,3rem)] font-black tracking-tight text-white/95 leading-tight">
						Every tool your farm
						<br />
						<span className="text-gradient-green">
							business needs to thrive
						</span>
					</h2>
					<p className="mx-auto max-w-xl text-lg text-green-600 leading-relaxed">
						From AI-powered forecasting to same-day delivery coordination —
						AgroPulse is the operating system for modern agriculture.
					</p>
				</div>

				<div className="features-grid">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="card-hover glass-light rounded-2xl p-7"
						>
							<div className="mb-5 flex items-center justify-between">
								<div
									className="flex h-13 w-13 items-center justify-center rounded-lg border text-2xl"
									style={{
										background: `${feature.color}15`,
										borderColor: `${feature.color}30`,
									}}
								>
									{feature.icon}
								</div>
								<span
									className="rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-widest"
									style={{
										color: feature.color,
										background: `${feature.color}15`,
										borderColor: `${feature.color}30`,
									}}
								>
									{feature.label}
								</span>
							</div>

							<h3 className="mb-2.5 text-lg font-bold text-white/95 tracking-tight">
								{feature.title}
							</h3>
							<p className="mb-5 text-sm leading-relaxed text-green-600">
								{feature.description}
							</p>

							<div className="border-t border-green-600/10 pt-4 flex items-baseline gap-1.5">
								<span
									className="text-2xl font-black tracking-tight"
									style={{ color: feature.color }}
								>
									{feature.stat}
								</span>
								<span className="text-xs font-medium text-green-700">
									{feature.statLabel}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>

			<style>{`
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        @media (max-width: 1024px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .features-grid { grid-template-columns: 1fr; } }
      `}</style>
		</section>
	);
}
