const steps = [
	{
		number: "01",
		role: "Farmer",
		icon: "🌾",
		title: "List Your Produce",
		description:
			"Create your farm profile, add available stock with photos and quantity. AI immediately surfaces your listing to matching buyers in your region.",
		color: "#6db853",
	},
	{
		number: "02",
		role: "Platform",
		icon: "🧠",
		title: "AI Matches & Forecasts",
		description:
			"Our engine forecasts demand, suggests the best price, and notifies verified buyers who match your produce type, volume, and location.",
		color: "#f0c04a",
	},
	{
		number: "03",
		role: "Buyer",
		icon: "🛒",
		title: "Buyer Confirms Order",
		description:
			"Buyer places a secured order. Funds are held in escrow. A nearby verified rider is automatically assigned and dispatched to your farm.",
		color: "#7bbef0",
	},
	{
		number: "04",
		role: "Rider",
		icon: "🚴",
		title: "Pickup & Delivery",
		description:
			"Rider picks up, tracks route live, and delivers to the buyer. Both parties get real-time updates. No calls, no confusion.",
		color: "#b07bf0",
	},
	{
		number: "05",
		role: "Finance",
		icon: "💰",
		title: "Instant Settlement",
		description:
			"On delivery confirmation, funds release automatically — farmer gets paid, rider gets their cut, platform fee is deducted. All transparent.",
		color: "#e885a0",
	},
];

export default function HowItWorksSection() {
	return (
		<section
			id="how-it-works"
			className="relative py-28 px-6"
			style={{
				background:
					"linear-gradient(180deg, rgba(15,30,12,0.6) 0%, transparent 100%)",
			}}
		>
			<div className="mx-auto max-w-6xl">
				{/* Header */}
				<div className="mb-20 text-center">
					<div className="mb-5 flex justify-center">
						<span className="section-label">Simple 5-Step Process</span>
					</div>
					<h2 className="font-display mb-4 text-[clamp(2rem,4vw,3rem)] font-black tracking-tight text-white/95 leading-tight">
						From farm to buyer in{" "}
						<span className="text-gradient-gold">one day</span>
					</h2>
					<p className="mx-auto text-lg text-green-600 leading-relaxed max-w-lg">
						A seamless end-to-end flow designed so farmers, buyers, and riders
						spend less time on logistics and more time on growth.
					</p>
				</div>

				{/* Mobile: vertical list */}
				<div className="steps-mobile">
					{steps.map((step) => (
						<div key={step.number} className="mb-6 flex gap-5 items-start">
							<div className="flex shrink-0 flex-col items-center">
								<div
									className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 text-2xl"
									style={{
										background: `${step.color}15`,
										borderColor: `${step.color}50`,
									}}
								>
									{step.icon}
									<div
										className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-xs font-black"
										style={{ background: step.color, color: "#0a1208" }}
									>
										{parseInt(step.number)}
									</div>
								</div>
							</div>
							<div className="glass-light rounded-2xl p-5 flex-1">
								<div
									className="mb-1.5 text-xs font-bold uppercase tracking-widest"
									style={{ color: step.color }}
								>
									{step.role}
								</div>
								<h3 className="mb-2 text-base font-bold text-white/95">
									{step.title}
								</h3>
								<p className="text-sm leading-relaxed text-green-600">
									{step.description}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Desktop: alternating timeline */}
				<div className="steps-desktop">
					{steps.map((step, i) => (
						<div key={step.number} className="step-row-desktop">
							{/* Left card — even indexes */}
							<div className="flex justify-end">
								{i % 2 === 0 && (
									<div className="glass-light card-hover max-w-xs rounded-2xl p-7 w-full">
										<div
											className="mb-2 text-xs font-bold uppercase tracking-widest"
											style={{ color: step.color }}
										>
											{step.role}
										</div>
										<h3 className="mb-2.5 text-lg font-bold text-white/95">
											{step.title}
										</h3>
										<p className="text-sm leading-relaxed text-green-600">
											{step.description}
										</p>
									</div>
								)}
							</div>

							{/* Center node */}
							<div className="flex justify-center">
								<div
									className="relative flex h-18 w-18 items-center justify-center rounded-full border-2 text-2xl shrink-0"
									style={{
										background: `${step.color}15`,
										borderColor: `${step.color}50`,
										boxShadow: `0 0 30px ${step.color}20`,
									}}
								>
									{step.icon}
									<div
										className="absolute -top-2 -right-2 flex h-5.5 w-5.5 items-center justify-center rounded-full text-xs font-black"
										style={{ background: step.color, color: "#0a1208" }}
									>
										{parseInt(step.number)}
									</div>
								</div>
							</div>

							{/* Right card — odd indexes */}
							<div className="flex justify-start">
								{i % 2 !== 0 && (
									<div className="glass-light card-hover max-w-xs rounded-2xl p-7 w-full">
										<div
											className="mb-2 text-xs font-bold uppercase tracking-widest"
											style={{ color: step.color }}
										>
											{step.role}
										</div>
										<h3 className="mb-2.5 text-lg font-bold text-white/95">
											{step.title}
										</h3>
										<p className="text-sm leading-relaxed text-green-600">
											{step.description}
										</p>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			<style>{`
        .steps-mobile  { display: none; }
        .steps-desktop { display: flex; flex-direction: column; gap: 2rem; }
        .step-row-desktop { display: grid; grid-template-columns: 1fr 80px 1fr; align-items: center; gap: 1.5rem; }
        @media (max-width: 768px) {
          .steps-mobile  { display: block; }
          .steps-desktop { display: none; }
        }
      `}</style>
		</section>
	);
}
