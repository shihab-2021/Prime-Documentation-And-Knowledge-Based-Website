import React from "react";
import GiveInfoMain from "../components/GiveInfo/GiveInfoMain";
import authCheck from "../hook/authCheck";

const giveInfo = () => {
  return <div>
    <GiveInfoMain></GiveInfoMain>
  </div>;
};

export default authCheck(giveInfo);
