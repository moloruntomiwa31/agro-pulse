export default function HeroSection() {
	const produceItems = [
		{
			name: "Tomatoes",
			demand: 94,
			price: "₦4,200/bag",
			change: "+12%",
			emoji: "🍅",
			color: "#e85d4a",
		},
		{
			name: "Cassava",
			demand: 81,
			price: "₦2,800/bag",
			change: "+7%",
			emoji: "🌿",
			color: "#f0c04a",
		},
		{
			name: "Maize",
			demand: 76,
			price: "₦3,500/bag",
			change: "+5%",
			emoji: "🌽",
			color: "#6db853",
		},
		{
			name: "Pepper",
			demand: 89,
			price: "₦6,100/bag",
			change: "+18%",
			emoji: "🌶️",
			color: "#e86b1a",
		},
	];

	const tickerItems = [
		"Tomatoes +12%",
		"Cassava +7%",
		"Maize +5%",
		"Pepper +18%",
		"Yam +9%",
		"Plantain +14%",
		"Groundnut +6%",
		"Soya Bean +11%",
		"Palm Oil +8%",
		"Ginger +22%",
	];

	return (
		<section
			id="hero"
			className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24"
		>
			{/* Background layers */}
			<div className="hero-grid absolute inset-0 z-0" />
			<div
				className="absolute inset-0 bg-radial-ellipse z-1 opacity-25"
				style={{
					background:
						"radial-gradient(ellipse 80% 60% at 50% 0%, rgba(58,110,44,0.25) 0%, transparent 70%)",
				}}
			/>
			<div
				className="absolute top-1/5 -left-1/5 w-96 h-96 rounded-full bg-blur-40 z-1"
				style={{
					background:
						"radial-gradient(circle, rgba(78,146,57,0.12) 0%, transparent 70%)",
					filter: "blur(40px)",
				}}
			/>
			<div
				className="absolute bottom-1/10 -right-1/10 w-80 h-80 rounded-full bg-blur-40 z-1"
				style={{
					background:
						"radial-gradient(circle, rgba(240,192,74,0.08) 0%, transparent 70%)",
					filter: "blur(40px)",
				}}
			/>

			{/* Content */}
			<div className="relative z-2 mx-auto w-full max-w-6xl px-6">
				<div className="hero-layout">
					{/* Left Column */}
					<div>
						<div className="mb-7">
							<span className="section-label">
								<span className="inline-block h-1.5 w-1.5 rounded-full bg-forest-300" />
								AI-Powered Agricultural Marketplace
							</span>
						</div>

						<h1 className="font-display mb-6 text-[clamp(2.5rem,5vw,4rem)] font-black leading-tight tracking-tight text-white/95">
							Where Farms Meet{" "}
							<span className="text-gradient-green">Buyers &amp;</span>
							<br />
							<span className="text-gradient-gold">Riders — Instantly</span>
						</h1>

						<p className="mb-10 max-w-lg text-lg leading-relaxed text-green-200">
							AgroPulse connects farmers directly with verified buyers and
							on-demand delivery riders. AI forecasts demand, coordinates
							payments, and eliminates the middleman — so you earn more from
							every harvest.
						</p>

						<div className="mb-12 flex flex-wrap gap-4">
							<a href="#join" className="btn-primary" id="hero-farmer-cta">
								🌾 Join as Farmer
							</a>
							<a
								href="#marketplace"
								className="btn-secondary"
								id="hero-buyer-cta"
							>
								🛒 Browse Marketplace
							</a>
						</div>

						{/* Social proof row */}
						<div className="flex flex-wrap items-center gap-6">
							<div className="flex items-center gap-2">
								<div className="flex">
									{["F", "B", "R", "A"].map((letter, i) => (
										<div
											key={letter}
											className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-forest-950 text-xs font-bold text-white/95 -ml-2 first:ml-0"
											style={{
												background: `hsl(${100 + i * 30}, 40%, ${30 + i * 5}%)`,
											}}
										>
											{letter}
										</div>
									))}
								</div>
								<span className="text-sm text-green-600">
									<strong className="text-green-200">2,400+</strong> active
									users
								</span>
							</div>
							<div className="h-5 w-px bg-green-600/20" />
							<div className="flex items-center gap-1.5">
								{[1, 2, 3, 4, 5].map((i) => (
									<svg
										key={i}
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="#f0c04a"
									>
										<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
									</svg>
								))}
								<span className="ml-1 text-sm text-green-600">
									4.9/5 rating
								</span>
							</div>
						</div>
					</div>

					{/* Right Column — Dashboard Card */}
					<div className="relative">
						<div className="glass glow-green animate-float rounded-3xl p-7">
							{/* Card header */}
							<div className="mb-5 flex items-center justify-between">
								<div>
									<div className="mb-1 text-xs font-semibold uppercase tracking-widest text-green-700">
										AI Demand Forecast
									</div>
									<div className="text-base font-bold text-white/95">
										This Week&#39;s Hotlist
									</div>
								</div>
								<div className="rounded-full border border-green-600/30 bg-green-600/15 px-3 py-1.5 text-xs font-semibold text-forest-300">
									Live
								</div>
							</div>

							{/* Items */}
							{produceItems.map((item) => (
								<div
									key={item.name}
									className="mb-3 flex items-center gap-3 rounded-xl border border-green-600/10 bg-black/30 p-3"
								>
									<div
										className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border text-lg"
										style={{
											background: `${item.color}20`,
											borderColor: `${item.color}40`,
										}}
									>
										{item.emoji}
									</div>
									<div className="flex-1">
										<div className="mb-1.5 flex justify-between">
											<span className="text-sm font-semibold text-white/95">
												{item.name}
											</span>
											<span className="text-sm font-bold text-green-200">
												{item.price}
											</span>
										</div>
										<div className="relative h-1 rounded bg-white/8">
											<div
												className="absolute inset-y-0 left-0 rounded"
												style={{
													width: `${item.demand}%`,
													background: `linear-gradient(90deg, ${item.color}, ${item.color}99)`,
												}}
											/>
										</div>
									</div>
									<span
										className="shrink-0 rounded text-xs font-bold text-forest-300"
										style={{
											background: "rgba(109,184,83,0.12)",
											padding: "0.2rem 0.5rem",
										}}
									>
										{item.change}
									</span>
								</div>
							))}

							{/* Bottom */}
							<div className="mt-4 flex items-center justify-between border-t border-green-600/12 pt-4">
								<span className="text-xs text-green-700">7 riders nearby</span>
								<div className="flex items-center gap-1.5">
									<div className="h-2 w-2 rounded-full bg-forest-300" />
									<span className="text-xs font-semibold text-forest-300">
										Ready to dispatch
									</span>
								</div>
							</div>
						</div>

						{/* Floating badges */}
						<div className="glass animate-float-delay absolute -top-6 -right-4 rounded-2xl p-3.5 flex items-center gap-2.5">
							<span className="text-2xl">🚴</span>
							<div>
								<div className="text-xs font-semibold text-green-700">
									Rider Matched
								</div>
								<div className="text-sm font-bold text-white/95">
									2.4 km away
								</div>
							</div>
						</div>

						<div className="glass animate-float absolute -bottom-5 -left-6 rounded-2xl p-3.5 flex items-center gap-2.5">
							<span className="text-2xl">💳</span>
							<div>
								<div className="text-xs font-semibold text-green-700">
									Payment Split
								</div>
								<div className="text-sm font-bold text-forest-300">
									₦18,400 secured
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Ticker */}
			<div className="relative z-2 mt-20 border-y border-green-600/10 bg-black/30 overflow-hidden py-3.5">
				<div className="animate-marquee flex w-max">
					{[0, 1].map((g) => (
						<div key={g} className="flex">
							{tickerItems.map((item) => (
								<div key={`${g}-${item}`} className="ticker-item">
									<span className="text-green-600/40">◆</span>
									<span className="text-green-200">{item}</span>
								</div>
							))}
						</div>
					))}
				</div>
			</div>

			<style>{`
        .hero-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 900px) {
          .hero-layout { grid-template-columns: 1fr !important; }
          .hero-layout > div:last-child { display: none !important; }
        }
      `}</style>
		</section>
	);
}
