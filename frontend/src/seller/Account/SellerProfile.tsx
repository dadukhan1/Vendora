/** @format */

import { Edit } from "@mui/icons-material";
import { Avatar, Button, Divider } from "@mui/material";
import ProfileFieldCard from "../../customer/pages/Profile/ProfileFieldCard";

const SellerProfile = () => {
  return (
    <div className='lg:px-20 pt-5  pb-20 space-y-20'>
      <div className='w-full lg:w-[70%] '>
        <div className='flex items-center pb-3 justify-between'>
          <h1 className='font-bold text-xl'>Seller Details</h1>
          <div>
            <Button className='w-16 h-16'>
              <Edit />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Avatar
          sx={{ width: "10rem", height: "10rem" }}
          src='https://images.unsplash.com/photo-1544979590-37e9b47eb705?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGphZ3VhcnxlbnwwfHwwfHx8MA%3D%3D'
        />
        <ProfileFieldCard keys={"Seller Name"} value='John Doe' />
        <Divider />
        <ProfileFieldCard keys={"Seller Email"} value='john.doe@example.com' />
        <Divider />
        <ProfileFieldCard keys={"Seller Phone"} value='+1234567890' />
      </div>
    </div>
  );
};

export default SellerProfile;
