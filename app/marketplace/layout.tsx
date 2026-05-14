import Sidebar from "../../components/marketplace/Sidebar";
import TopBar from "../../components/marketplace/TopBar";
import BuyerGuard from "../../components/marketplace/BuyerGuard";
import Toaster from "../../components/ui/Toaster";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BuyerGuard>
			<div className="flex h-screen overflow-hidden bg-white !font-display">
				<Sidebar />
				<div className="flex flex-col flex-1 min-w-0 overflow-hidden">
					<TopBar />
					<div className="flex flex-col flex-1 min-h-0 overflow-hidden relative">
						{children}
						<Toaster />
					</div>
				</div>
			</div>
    </BuyerGuard>
	);
}
