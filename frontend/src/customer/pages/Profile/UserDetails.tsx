/** @format */

import ProfileFieldCard from "./ProfileFieldCard";

const UserDetails = () => {
  return (
    <div className="space-y-5">
      <ProfileFieldCard keys={"Name"} value={"Pablo Reeve"} />
      <ProfileFieldCard keys={"Email"} value={"pablo@in"} />
      <ProfileFieldCard keys={"Mobile"} value={"09865672384"} />
    </div>
  );
};

export default UserDetails;
