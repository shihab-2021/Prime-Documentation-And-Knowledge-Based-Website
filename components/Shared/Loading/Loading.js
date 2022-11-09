import React from "react";
import { HashLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <>
        {/* <p>Loading .... </p> */}
        <HashLoader color="#36d7b7" size={100} />
        <br />
      </>
    </div>
  );
};

export default Loading;
