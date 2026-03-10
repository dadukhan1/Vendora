/** @format */

import { useAppSelector } from "../../../Redux Toolkit/store";
import ProfileFieldCard from "./ProfileFieldCard.tsx";

const UserDetails = () => {
  const { user } = useAppSelector((store) => store.user);
  console.log("user", user);
  return (
    <div className='space-y-5'>
      <ProfileFieldCard keys={"Name"} value={user?.fullName || "Pablo Reeve"} />
      <ProfileFieldCard keys={"Email"} value={user?.email || "pablo@in"} />
      <ProfileFieldCard keys={"Mobile"} value={user?.mobile || "----"} />
    </div>
  );
};

export default UserDetails;
