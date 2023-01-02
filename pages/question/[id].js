import React, { useEffect, useState } from "react";
import QDMain from "../../components/QuestionDetails/QDMain";
import authCheck from "../../hook/authCheck";

const Id = () => {
  return (
    <div>
      <QDMain></QDMain>
    </div>
  );
};

export default authCheck(Id);
