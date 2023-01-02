import React from "react";
import ContactMain from "../components/Contact/ContactMain/ContactMain";
import authCheck from "../hook/authCheck";

const contact = () => {
  return <div>
    <ContactMain></ContactMain>
  </div>;
};

export default authCheck(contact);
