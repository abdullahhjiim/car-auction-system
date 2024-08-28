import DashbordCompoent from "@/components/admin/DashbordCompoent";
import { Suspense } from "react";

export const metadata = {
  title: "Gulf Cars Auction | Salvage Cars Auction Sharjah",
  description: "Gulf Cars Auction | Salvage Cars Auction Sharjah",
};

const Dashboard = () => {
  return (
    <>
      <div className="">
        <Suspense fallback={<p>Loading...</p>}>
          <DashbordCompoent />
        </Suspense>
      </div>
    </>
  );
};

export default Dashboard;
