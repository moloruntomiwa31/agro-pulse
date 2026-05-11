"use client";

import { useState } from "react";
import Link from "next/link";

type Role = "farmer" | "buyer" | "rider";

const roleConfig = {
	farmer: {
		emoji: "🌾",
		title: "Farmer",
		fields: ["Farm Name", "Location (State)", "Primary Crop"],
	},
	buyer: {
		emoji: "🛒",
		title: "Buyer",
		fields: ["Business Name", "Location (City)", "Purchase Volume"],
	},
	rider: {
		emoji: "🚴",
		title: "Rider",
		fields: ["Vehicle Type", "Location (City)", "License Number"],
	},
};

export default function SignUpPage() {
	const [step, setStep] = useState(0);
	const [role, setRole] = useState<Role>("farmer");
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		field1: "",
		field2: "",
		field3: "",
	});

	const next = () => setStep((s) => Math.min(s + 1, 2));
	const back = () => setStep((s) => Math.max(s - 1, 0));
	const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
		setForm({ ...form, [key]: e.target.value });

	const config = roleConfig[role];

	return (
		<div>
			{/* Mobile logo (hidden on desktop since layout shows brand panel) */}
			<div className="auth-mobile-logo mb-6 hidden items-center gap-2">
				<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-forest-400 to-forest-600">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
						<path
							d="M12 2C8 2 4 5.5 4 10c0 3 1.5 5.5 4 7l1 5h6l1-5c2.5-1.5 4-4 4-7 0-4.5-4-8-8-8z"
							fill="#e8f7e1"
							fillOpacity="0.9"
						/>
					</svg>
				</div>
				<span className="font-display text-lg font-black text-forest-950">
					Agro<span className="text-forest-400">Pulse</span>
				</span>
			</div>

			{/* Header */}
			<div className="mb-7">
				<h1 className="font-display mb-2 text-3xl font-black tracking-tight text-forest-950">
					Create your account
				</h1>
				<p className="text-base text-green-700">
					{step === 0 && "Choose how you want to use AgroPulse"}
					{step === 1 && "Enter your account details"}
					{step === 2 &&
						`Tell us about your ${config.title.toLowerCase()} profile`}
				</p>
			</div>

			{/* Step indicator */}
			<div className="mb-8 flex gap-2">
				{["Role", "Account", "Profile"].map((label, i) => (
					<div key={label} className="flex-1">
						<div
							className="mb-1.5 h-0.75 rounded-sm bg-stone-200 transition-all duration-300"
							style={{
								background:
									i <= step
										? "linear-gradient(90deg, #4e9239, #6db853)"
										: "#e8ece5",
							}}
						/>
						<span
							className="text-xs font-semibold uppercase tracking-wider text-stone-500"
							style={{ color: i <= step ? "#4e9239" : "#a8b8a0" }}
						>
							{label}
						</span>
					</div>
				))}
			</div>

			{/* ─── STEP 0: Role Selection ─── */}
			{step === 0 && (
				<div className="flex flex-col gap-4">
					{(["farmer", "buyer", "rider"] as Role[]).map((r) => {
						const rc = roleConfig[r];
						const selected = role === r;
						return (
							<button
								key={r}
								type="button"
								onClick={() => setRole(r)}
								className="flex items-center gap-4 rounded-2xl border-2 p-4 text-left font-inherit transition-all duration-200"
								style={{
									border: selected
										? "2px solid #6db853"
										: "1.5px solid #dde5d8",
									background: selected ? "#edf7e8" : "#fff",
								}}
							>
								<span
									className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl transition-all duration-200"
									style={{ background: selected ? "#d6eece" : "#f0f4ed" }}
								>
									{rc.emoji}
								</span>
								<div>
									<div className="mb-0.5 text-base font-bold text-forest-950">
										I&#39;m a {rc.title}
									</div>
									<div className="text-xs text-green-700">
										{r === "farmer" &&
											"Sell your produce directly to verified buyers"}
										{r === "buyer" &&
											"Source fresh produce straight from local farms"}
										{r === "rider" && "Earn by delivering farm-fresh goods"}
									</div>
								</div>
								{/* Radio indicator */}
								<div
									className="ml-auto h-5 w-5 shrink-0 rounded-full border-2 transition-all duration-200"
									style={{
										borderColor: selected ? "#4e9239" : "#c4d8bc",
										borderWidth: selected ? "6px" : "2px",
									}}
								/>
							</button>
						);
					})}

					<button type="button" onClick={next} className="auth-submit-btn mt-2">
						Continue as {config.title}
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
				</div>
			)}

			{/* ─── STEP 1: Account Details ─── */}
			{step === 1 && (
				<div className="flex flex-col gap-4.5">
					<div>
						<label htmlFor="signup-name" className="auth-label">
							Full name
						</label>
						<input
							id="signup-name"
							type="text"
							placeholder="John Doe"
							value={form.name}
							onChange={update("name")}
							required
							className="auth-input"
						/>
					</div>
					<div>
						<label htmlFor="signup-email" className="auth-label">
							Email address
						</label>
						<input
							id="signup-email"
							type="email"
							placeholder="you@example.com"
							value={form.email}
							onChange={update("email")}
							required
							className="auth-input"
						/>
					</div>
					<div>
						<label htmlFor="signup-password" className="auth-label">
							Password
						</label>
						<input
							id="signup-password"
							type="password"
							placeholder="Min. 8 characters"
							value={form.password}
							onChange={update("password")}
							required
							className="auth-input"
						/>
					</div>

					<div className="flex gap-3 pt-2">
						<button type="button" onClick={back} className="auth-back-btn">
							Back
						</button>
						<button
							type="button"
							onClick={next}
							className="auth-submit-btn flex-1"
						>
							Continue
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
					</div>
				</div>
			)}

			{/* ─── STEP 2: Profile Details ─── */}
			{step === 2 && (
				<div className="flex flex-col gap-4.5">
					<div className="flex items-center gap-3 rounded-xl border border-green-600/20 bg-green-50/50 px-4 py-3">
						<span className="text-2xl">{config.emoji}</span>
						<span className="text-sm font-semibold text-forest-600">
							Setting up your {config.title} profile
						</span>
					</div>

					{config.fields.map((field, i) => (
						<div key={field}>
							<label htmlFor={`signup-field-${i}`} className="auth-label">
								{field}
							</label>
							<input
								id={`signup-field-${i}`}
								type="text"
								placeholder={`Enter ${field.toLowerCase()}`}
								value={
									i === 0 ? form.field1 : i === 1 ? form.field2 : form.field3
								}
								onChange={update(
									i === 0 ? "field1" : i === 1 ? "field2" : "field3",
								)}
								className="auth-input"
							/>
						</div>
					))}

					<div className="flex gap-3 pt-2">
						<button type="button" onClick={back} className="auth-back-btn">
							Back
						</button>
						<button
							type="button"
							onClick={() => alert("Account created! 🎉")}
							className="auth-submit-btn flex-1"
						>
							Create Account
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
					</div>
				</div>
			)}

			{/* Footer */}
			<p className="mt-7 text-center text-sm text-green-700">
				Already have an account?{" "}
				<Link
					href="/auth/signin"
					className="font-semibold text-forest-400 no-underline hover:text-forest-500"
				>
					Sign in
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
        .auth-submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
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
        .auth-back-btn {
          padding: 0.75rem 1.25rem;
          background: #fff;
          color: #3a4d32;
          border: 1.5px solid #dde5d8;
          border-radius: 10px;
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
        }
        .auth-back-btn:hover { border-color: #c4d8bc; background: #fafcf8; }
        @media (max-width: 768px) {
          .auth-mobile-logo { display: flex !important; }
        }
      `}</style>
		</div>
	);
}
