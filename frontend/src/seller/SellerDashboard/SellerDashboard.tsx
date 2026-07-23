/** @format */

import Navbar from "../../common/Navbar";
import SellerDrawerList from "../SideBar/SellerDrawerList.tsx";
import SellerRoutes from "../../routes/SellerRoutes.tsx";
import { useAppDispatch } from "../../Redux Toolkit/store.ts";
import { useEffect } from "react";
import { fetchSellerReport } from "../../Redux Toolkit/features/seller/sellerSlice.ts";

const SellerDashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSellerReport());
  }, [dispatch]);

  return (
    <div className="h-screen overflow-hidden bg-[#fafaf8] flex flex-col font-[Outfit]">
      {/* Shared Dashboard Navbar */}
      <Navbar DrawerList={SellerDrawerList} />

      <div className="flex-1 flex overflow-hidden">
        {/* Persistent Sidebar for Desktop */}
        <aside className="hidden lg:block w-[280px] min-w-[280px] shrink-0 h-full z-10">
          <SellerDrawerList />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#fafaf8]">
          <div className="max-w-[1400px] mx-auto p-4 lg:p-8 h-full">
            <div className="relative z-10">
              <SellerRoutes />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
