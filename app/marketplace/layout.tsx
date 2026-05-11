import Sidebar from "../../components/marketplace/Sidebar";
import TopBar from "../../components/marketplace/TopBar";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
		<div className="flex h-screen overflow-hidden bg-white !font-display">
			<Sidebar />
			<div className="flex flex-col flex-1 min-w-0 overflow-hidden">
				<TopBar />
				<div className="flex flex-col flex-1 min-h-0 overflow-hidden">
					{children}
				</div>
			</div>
		</div>
	);
}
