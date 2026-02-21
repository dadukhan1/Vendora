/** @format */

import Navbar from "../../common/Navbar";
import AdminDrawerList from "../Sidebar/AdminDrawerList";
import AdminRoutes from "../../routes/AdminRoutes";

const AdminDashboard = () => {
  return (
    <div className='min-h-screen'>
      <Navbar DrawerList={AdminDrawerList} />
      <section className="lg:flex lg:h-[92vh]">
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
