/** @format */

import Navbar from "../../common/Navbar";
import AdminDrawerList from "../Sidebar/AdminDrawerList";
import AdminRoutes from "../../routes/AdminRoutes";
import { useAppDispatch } from "../../Redux Toolkit/store";
import { useEffect } from "react";
import { fetchHomeCategory } from "../../Redux Toolkit/features/admin/adminSlice";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHomeCategory());
  }, [dispatch]);

  return (
    <div className="h-screen overflow-hidden bg-[#fafaf8] flex flex-col font-[Outfit]">
      {/* Shared Dashboard Navbar */}
      <Navbar DrawerList={AdminDrawerList} />

      <div className="flex-1 flex overflow-hidden">
        {/* Persistent Sidebar for Desktop */}
        <aside className="hidden lg:block w-[280px] min-w-[280px] shrink-0 h-full z-10">
          <AdminDrawerList />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#fafaf8]">
          <div className="max-w-[1400px] mx-auto p-4 lg:p-8 h-full">
            <div className="relative z-10">
              <AdminRoutes />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
