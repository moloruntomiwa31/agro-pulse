"use client";

import Link from "next/link";
import { useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";

export default function SignInPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { toast } = useToast();
	const loginMutation = useLogin();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email.trim()) {
			toast.error("Email is required");
			return;
		}

		if (password.length < 8) {
			toast.error("Password must be at least 8 characters");
			return;
		}

		try {
			await loginMutation.mutateAsync({ email, password });
		} catch (error) {
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to sign in. Please try again."
			);
		}
	};

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

			{/* Form */}
			<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="signin-email" className="auth-label">
						Email address
					</label>
					<input
						id="signin-email"
						type="email"
						placeholder="you@example.com"
						required
						autoComplete="email"
						className="auth-input"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div>
					<label htmlFor="signin-password" className="auth-label">
						Password
					</label>
					<input
						id="signin-password"
						type="password"
						placeholder="Min. 8 characters"
						required
						autoComplete="current-password"
						className="auth-input"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				{loginMutation.isError && (
					<div className="rounded-md bg-red-50 p-3">
						<p className="text-sm font-medium text-red-800">
							{loginMutation.error instanceof Error
								? loginMutation.error.message
								: "Failed to sign in"}
						</p>
					</div>
				)}

				<button
					type="submit"
					className="auth-submit-btn"
					disabled={loginMutation.isPending}
				>
					{loginMutation.isPending ? "Signing in..." : "Sign In"}
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
				Don&apos;t have an account?{" "}
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
        .auth-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
		</div>
	);
}
