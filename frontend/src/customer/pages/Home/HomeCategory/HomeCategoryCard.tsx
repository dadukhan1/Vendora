/** @format */

const HomeCategoryCard = () => {
  return (
    <div className='flex gap-3 flex-col justify-center items-center group cursor-pointer'>
      <div className='text-center custom-border w-[150px] lg:w-[249px] h-[150px] lg:h-[249px] rounded-full bg-teal-400'>
        <img
          className='group-hover:scale-95 transition-transform duration-700 object-cover object-top h-full w-full rounded-full'
          src={
            "https://images.unsplash.com/photo-1534217466718-ef4950786e24?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt=''
        />
        <h1 className='font-medium'>{"Lamps & Lighting"}</h1>
      </div>
    </div>
  );
};

export default HomeCategoryCard;
