/** @format */
import { useState } from "react";
import { Edit, Save, Close } from "@mui/icons-material";
import { Avatar, Button, Paper } from "@mui/material";
import ProfileFieldCard from "../../customer/pages/Profile/ProfileFieldCard";
import { useAppSelector } from "../../Redux Toolkit/store";

const SellerProfile = () => {
  const { profile } = useAppSelector((store) => store.seller);
  const [isEditing, setIsEditing] = useState(false);
  
  // Initialize state with profile data
  const [formData, setFormData] = useState({
    sellerName: profile?.sellerName || "",
    email: profile?.email || "",
    mobile: profile?.mobile || ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Dispatch your Redux action or API call here
    console.log("Saving data...", formData);
    setIsEditing(false);
  };

  return (
    <div className='max-w-4xl mx-auto px-6 py-12'>
      <Paper elevation={0} className='border border-gray-100 p-8 rounded-2xl'>
        <div className='flex items-center justify-between mb-10'>
          <h1 className='text-2xl font-bold text-slate-900'>Seller Details</h1>
          <Button
            variant={isEditing ? "contained" : "outlined"}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            startIcon={isEditing ? <Save /> : <Edit />}
            sx={{ 
              borderRadius: "10px", 
              textTransform: "none",
              bgcolor: isEditing ? "#1e293b" : "transparent"
            }}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='flex flex-col items-center space-y-4'>
            <Avatar
              sx={{ width: 140, height: 140, boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}
              src={profile?.avatar || "https://images.unsplash.com/photo-1544979590-37e9b47eb705?w=400"}
            />
            {isEditing && <Button size="small">Change Photo</Button>}
          </div>

          <div className='md:col-span-2 space-y-4'>
            <ProfileFieldCard 
              keys="Name" 
              name="sellerName"
              value={isEditing ? formData.sellerName : profile?.sellerName} 
              isEditing={isEditing}
              onChange={handleInputChange}
            />
            <ProfileFieldCard 
              keys="Email" 
              name="email"
              value={isEditing ? formData.email : profile?.email} 
              isEditing={isEditing}
              onChange={handleInputChange}
            />
            <ProfileFieldCard 
              keys="Phone" 
              name="mobile"
              value={isEditing ? formData.mobile : profile?.mobile} 
              isEditing={isEditing}
              onChange={handleInputChange}
            />
            
            {isEditing && (
              <Button 
                fullWidth 
                color="error" 
                onClick={() => setIsEditing(false)}
                sx={{ textTransform: 'none' }}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default SellerProfile;