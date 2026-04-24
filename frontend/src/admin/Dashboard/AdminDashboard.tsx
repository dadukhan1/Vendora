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
  }, []);

  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar DrawerList={AdminDrawerList} />
      
      <div className='lg:flex h-[calc(100vh-64px)] overflow-hidden'>
        {/* Persistent Sidebar for Desktop */}
        <aside className='hidden lg:block w-72 h-full border-r border-gray-200 bg-white sticky top-16'>
          <AdminDrawerList />
        </aside>

        {/* Main Content Area */}
        <main className='flex-1 h-full overflow-y-auto p-4 lg:p-8'>
          <div className='max-w-[1600px] mx-auto'>
            <section className='bg-white rounded-2xl shadow-sm border border-gray-100 min-h-full overflow-hidden'>
              <div className='p-6 lg:p-10'>
                <AdminRoutes />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
