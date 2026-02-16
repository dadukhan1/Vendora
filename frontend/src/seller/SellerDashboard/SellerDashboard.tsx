/** @format */

import Navbar from "../../common/Navbar";
import SellerRoutes from "../../routes/SellerRoutes.tsx";
import SellerDrawerList from "../SideBar/SellerDrawerList.tsx";

const SellerDashboard = () => {
  return (
    <div className='min-h-screen'>
      <Navbar DrawerList={SellerDrawerList} />
      <section className='lg:flex lg:h-[90vh]'>
        <div className='hidden lg:block h-full'>
          <SellerDrawerList />
        </div>
        <div className='p-10 w-full lg:w-[80%] overflow-y-auto'>
          <SellerRoutes />
        </div>
      </section>
    </div>
  );
};

export default SellerDashboard;
