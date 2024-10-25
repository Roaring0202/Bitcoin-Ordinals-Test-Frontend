
import Header from "@/components/Header";
import Staking from "@/components/MainPage";

export default function Dashboard() {
  return (
    <div className="divide-y divide-gray-100 items-center flex flex-col h-screen">
        <Header />
        <Staking />
    </div>
  );
}
