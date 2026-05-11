const footerLinks: Record<string, string[]> = {
	Platform: [
		"Marketplace",
		"Demand Forecast",
		"Rider Network",
		"Payments",
		"Analytics",
	],
	Farmers: [
		"How it Works",
		"Pricing",
		"Crop Listings",
		"Success Stories",
		"Support",
	],
	Company: ["About Us", "Blog", "Careers", "Press", "Contact"],
	Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const socials = [
	{ label: "X", icon: "𝕏" },
	{ label: "Li", icon: "in" },
	{ label: "Ig", icon: "📸" },
];

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-green-600/10 bg-black/80 py-16 px-6">
			<div className="mx-auto max-w-6xl">
				<div className="footer-grid mb-12">
					{/* Brand */}
					<div>
						<div className="mb-4 flex items-center gap-2.5">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-forest-400 to-forest-600">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
									<path
										d="M12 2C8 2 4 5.5 4 10c0 3 1.5 5.5 4 7l1 5h6l1-5c2.5-1.5 4-4 4-7 0-4.5-4-8-8-8z"
										fill="#e8f7e1"
										fillOpacity="0.9"
									/>
								</svg>
							</div>
							<span className="font-display text-[1.1875rem] font-bold text-white/95">
								Agro<span className="text-forest-300">Pulse</span>
							</span>
						</div>
						<p className="mb-6 max-w-60 text-sm leading-relaxed text-green-700">
							The AI-powered agricultural marketplace connecting farmers,
							buyers, and riders across Africa.
						</p>
						<div className="flex gap-3">
							{socials.map((s) => (
								<a
									key={s.label}
									href="#"
									aria-label={s.label}
									className="social-btn"
								>
									{s.icon}
								</a>
							))}
						</div>
					</div>

					{/* Links */}
					{Object.entries(footerLinks).map(([group, links]) => (
						<div key={group}>
							<div className="mb-4 text-xs font-bold uppercase tracking-widest text-green-900">
								{group}
							</div>
							<ul className="space-y-2.5">
								{links.map((link) => (
									<li key={link}>
										<a href="#" className="footer-link">
											{link}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-green-600/8 pt-8">
					<span className="text-xs text-green-900">
						© {year} AgroPulse Technologies. All rights reserved.
					</span>
					<span className="text-xs text-green-900">
						🌍 Built for African agriculture · Smart Systems: The Intelligent
						Economy
					</span>
				</div>
			</div>

			<style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr repeat(4, 1fr);
          gap: 2rem;
        }
        .footer-link {
          font-size: 0.875rem;
          color: #5e7c52;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #9dbf8a; }
        .social-btn {
          h-9 w-9;
          rounded-lg;
          bg: rgba(110,184,83,0.08);
          border: 1px solid rgba(110,184,83,0.15);
          flex items-center justify-center;
          color: #5e7c52;
          text-decoration: none;
          font-size: 0.75rem;
          transition: all 0.2s;
        }
        .social-btn:hover { 
          background: rgba(110,184,83,0.18); 
          color: #6db853; 
        }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr; } }
      `}</style>
		</footer>
	);
}
