"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
	{ href: "#features", label: "Features" },
	{ href: "#how-it-works", label: "How it Works" },
	{ href: "#marketplace", label: "Marketplace" },
	{ href: "#join", label: "Join" },
];

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const handler = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", handler, { passive: true });
		return () => window.removeEventListener("scroll", handler);
	}, []);

	return (
		<header
			className={`fixed inset-x-0 top-0 z-100 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-[20px] border-b border-green-600/12" : "bg-transparent border-b border-transparent"}`}
		>
			<nav className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2.5 no-underline">
					<div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-forest-400 to-forest-600 shadow-[0_0_20px_rgba(78,146,57,0.4)] shrink-0">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
							<path
								d="M12 2C8 2 4 5.5 4 10c0 3 1.5 5.5 4 7l1 5h6l1-5c2.5-1.5 4-4 4-7 0-4.5-4-8-8-8z"
								fill="#e8f7e1"
								fillOpacity="0.9"
							/>
							<path
								d="M12 6v8M9 9l3-3 3 3"
								stroke="#c4ecb0"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
					</div>
					<span className="font-display text-xl font-bold text-white/95 tracking-tight">
						Agro<span className="text-forest-300">Pulse</span>
					</span>
				</Link>

				{/* Desktop Nav */}
				<ul className="nav-desktop hidden flex-center gap-1">
					{navLinks.map((link) => (
						<li key={link.href}>
							<a
								href={link.href}
								className="nav-link block rounded-lg px-4 py-2 text-sm font-medium text-green-200 transition-all duration-200 hover:bg-green-600/8 hover:text-white/95"
							>
								{link.label}
							</a>
						</li>
					))}
				</ul>

				{/* CTA */}
				<div className="flex items-center gap-3">
					<Link
						href="/auth/signin"
						className="btn-secondary nav-desktop hidden px-5 py-2 text-sm"
					>
						Sign In
					</Link>
					<Link
						href="/auth/signup"
						className="btn-primary px-5 py-2.5 text-sm"
					>
						Get Started
					</Link>
					<button
						onClick={() => setMenuOpen(!menuOpen)}
						className="nav-mobile-btn hidden rounded bg-none p-1 text-green-200 transition-colors hover:text-white/95"
						aria-label="Toggle menu"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							{menuOpen ? (
								<path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
							) : (
								<path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
							)}
						</svg>
					</button>
				</div>
			</nav>

			{/* Mobile Menu */}
			{menuOpen && (
				<div className="border-t border-green-600/12 bg-black/98 px-6 py-4">
					<ul className="flex flex-col gap-1">
						{navLinks.map((link) => (
							<li key={link.href}>
								<a
									href={link.href}
									onClick={() => setMenuOpen(false)}
									className="block rounded-lg px-4 py-3 text-base font-medium text-green-200 no-underline transition-colors hover:bg-green-600/8 hover:text-white/95"
								>
									{link.label}
								</a>
							</li>
						))}
						<li className="mt-3">
							<a href="#" className="btn-secondary flex justify-center">
								Sign In
							</a>
						</li>
					</ul>
				</div>
			)}

			<style>{`
        .nav-desktop { @apply md:flex; }
        .nav-mobile-btn { @apply md:hidden; }
      `}</style>
		</header>
	);
}
