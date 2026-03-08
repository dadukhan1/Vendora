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
    <div className='min-h-screen'>
      <Navbar DrawerList={AdminDrawerList} />
      <section className='lg:flex lg:h-[92vh]'>
        <div>
          <AdminDrawerList />
        </div>
        <div className='p-10 w-full lg:w-[80%] overflow-auto'>
          <AdminRoutes />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
