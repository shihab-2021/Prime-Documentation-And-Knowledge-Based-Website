import Link from "next/link";
import React, { useState } from "react";
import DashboardHome from "../../components/Dashboard/DashboardHome";
import ManageBlogs from "../../components/Dashboard/ManageBlogs";
import ManageUsers from "../../components/Dashboard/ManageUsers";
import authCheck from "../../hook/authCheck";

const Dashboard = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div>
      <div>
        <div className="container mx-auto px-4">
          <div className=" pt-20 pb-5 grid grid-cols-3 gap-1 text-center">
            <div
              className={
                toggleState === 1
                  ? " bg-slate-200 border-sky-500 p-2 border-b-2 rounded-b-lg cursor-pointer dark:bg-gray-800"
                  : "bg-slate-200 dark:bg-gray-800 p-2 rounded-b-lg cursor-pointer"
              }
              onClick={() => toggleTab(1)}
            >
              Dashboard
            </div>
            <div
              className={
                toggleState === 2
                  ? " bg-slate-200 border-sky-500 p-2 border-b-2 rounded-b-lg cursor-pointer dark:bg-gray-800"
                  : "bg-slate-200 dark:bg-gray-800 p-2 rounded-b-lg cursor-pointer"
              }
              onClick={() => toggleTab(2)}
            >
              Manage Users
            </div>
            <div
              className={
                toggleState === 3
                  ? " bg-slate-200 border-sky-500 p-2 border-b-2 rounded-b-lg cursor-pointer dark:bg-gray-800"
                  : "bg-slate-200 dark:bg-gray-800 p-2 rounded-b-lg cursor-pointer"
              }
              onClick={() => toggleTab(3)}
            >
              Manage Blogs
            </div>
          </div>
        </div>
      </div>
      <div
        className={toggleState === 1 ? "content  active-content" : "content"}
      >
        <DashboardHome></DashboardHome>
      </div>
      <div
        className={toggleState === 2 ? "content  active-content" : "content"}
      >
        <ManageUsers></ManageUsers>
      </div>
      <div
        className={toggleState === 3 ? "content  active-content" : "content"}
      >
        <ManageBlogs></ManageBlogs>
      </div>
    </div>
  );
};

export default authCheck(Dashboard);
