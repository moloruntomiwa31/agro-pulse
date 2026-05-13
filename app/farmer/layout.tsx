import Sidebar from "../../components/farmer/Sidebar";
import TopBar from "../../components/farmer/TopBar";
import AddProduceModal from "../../components/farmer/AddProduceModal";

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-white !font-display">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar />
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden p-4 md:p-6">
          {children}
        </div>
      </div>
      <AddProduceModal />
    </div>
  );
}
