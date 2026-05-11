import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import RolesSection from "../components/landing/RolesSection";
import SocialProofSection from "../components/landing/SocialProofSection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

export default function Home() {
	return (
		<div className="min-h-screen bg-forest-950">
			<Navbar />
			<main>
				<HeroSection />
				<FeaturesSection />
				<HowItWorksSection />
				<RolesSection />
				<SocialProofSection />
				<CTASection />
			</main>
			<Footer />
		</div>
	);
}
