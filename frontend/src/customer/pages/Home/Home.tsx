/** @format */

import { Button } from "@mui/material";
import Deal from "./Deal/Deal";
import ElectronicCategory from "./ElectronicCategory/ElectronicCategory";
import Grid from "./Grid/Grid";
import HomeCateogry from "./HomeCategory/HomeCategory";
import StoreIcon from "@mui/icons-material/Store";

const Home = () => {
  return (
    <div className='space-y-10'>
      <ElectronicCategory />
      <section>
        <Grid />
      </section>
      <section className='pt-10'>
        <h1 className='text-3xl font-black text-center'>Today's Deal</h1>
        <Deal />
      </section>
      <section className='pt-10'>
        <h1 className='text-3xl font-black text-center'>Shop By Cateogry</h1>
        <HomeCateogry />
      </section>
      <section className='relative h-[200px] lg:h-[450px] lg:px-20 pt-12'>
        <img src='/img1.jpg' alt='' className=' rounded-2xl' />

        <div className='absolute top-1/2 left-4 lg:left-[15rem] -translate-y-1/2 font-semibold lg:text-4xl space-y-3 text-white'>
          <h1>Sell your products</h1>

          <p className='text-lg md:text-2xl'>
            With
            <strong className='logo text-3xl md:text-5xl pl-2'>Vendora</strong>
          </p>

          <div className='pt-6'>
            <Button startIcon={<StoreIcon />} variant='contained'>
              BECOME SELLER
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
