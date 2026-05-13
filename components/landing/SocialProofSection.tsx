const stats = [
	{ value: "2,400+", label: "Active Farmers", icon: "🌾", color: "#6db853" },
	{ value: "₦480M+", label: "Produce Traded", icon: "💰", color: "#f0c04a" },
	{
		value: "340+",
		label: "Verified Transporters",
		icon: "🚗",
		color: "#7bbef0",
	},
	{ value: "18min", label: "Avg. Match Time", icon: "⚡", color: "#b07bf0" },
];

const testimonials = [
	{
		quote:
			"Before AgroPulse, I lost 30% of my tomatoes to spoilage waiting for buyers. Now I know demand 5 days ahead and sell everything at peak price.",
		name: "Amaka Osei",
		role: "Tomato Farmer, Kano",
		avatar: "AO",
		avatarColor: "#4e9239",
	},
	{
		quote:
			"I supply three restaurants weekly through AgroPulse. The escrow gives me confidence that I always receive exactly what I ordered — fresh and on time.",
		name: "Chuka Mensah",
		role: "Restaurant Buyer, Lagos",
		avatar: "CM",
		avatarColor: "#3a7bb9",
	},
	{
		quote:
			"I do 12 deliveries a day. The route AI saves me fuel money, and the instant payout means I never chase anyone for payment.",
		name: "Dele Abiodun",
		role: "Transporter, Ibadan",
		avatar: "DA",
		avatarColor: "#b98600",
	},
];

export default function SocialProofSection() {
	return (
		<section className="py-28 px-6">
			<div className="mx-auto max-w-6xl">
				{/* Stats */}
				<div className="stats-grid">
					{stats.map((s) => (
						<div
							key={s.label}
							className="p-8 bg-black/60 text-center backdrop-blur"
						>
							<div className="mb-2 text-3xl">{s.icon}</div>
							<div
								className="font-display mb-1.5 text-4xl font-black tracking-tight"
								style={{ color: s.color }}
							>
								{s.value}
							</div>
							<div className="text-sm font-medium text-green-700">
								{s.label}
							</div>
						</div>
					))}
				</div>

				{/* Testimonials header */}
				<div className="mb-12 mt-20 text-center">
					<span className="section-label inline-flex">Real Stories</span>
					<h2 className="font-display mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-black tracking-tight text-white/95">
						Trusted by{" "}
						<span className="text-gradient-green">
							farmers, buyers &amp; transporters
						</span>
					</h2>
				</div>

				<div className="testimonials-grid">
					{testimonials.map((t) => (
						<div
							key={t.name}
							className="glass-light card-hover rounded-2xl p-7"
						>
							<div className="mb-5 flex gap-1">
								{[1, 2, 3, 4, 5].map((i) => (
									<svg
										key={i}
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="#f0c04a"
									>
										<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
									</svg>
								))}
							</div>
							<p className="mb-6 text-base leading-relaxed text-green-200 italic">
								&ldquo;{t.quote}&rdquo;
							</p>
							<div className="flex items-center gap-3.5">
								<div
									className="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full border-2 text-xs font-black"
									style={{
										background: `${t.avatarColor}25`,
										borderColor: `${t.avatarColor}50`,
										color: t.avatarColor,
									}}
								>
									{t.avatar}
								</div>
								<div>
									<div className="font-bold text-base text-white/95">
										{t.name}
									</div>
									<div className="text-sm text-green-700">{t.role}</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(110,184,83,0.1);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(110,184,83,0.15);
        }
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .stats-grid { grid-template-columns: 1fr; } }
        @media (max-width: 900px)  { .testimonials-grid { grid-template-columns: 1fr; } }
      `}</style>
		</section>
	);
}
