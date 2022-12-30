/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";

const ManageUsers = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch(`https://prime-api-5jzf.onrender.com/users-data`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  const handleDeleteUser = (id) => {
    // const proceed = window.confirm("Are you sure, you want to delete?", id);
    // console.log(id);
    // if (proceed) {
    //   const url = `https://prime-api-5jzf.onrender.com/delete-user/${id}`;
    //   fetch(url, {
    //     method: "DELETE",
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.deletedCount > 0) {
    //         console.log(id);
    //         alert("Deleted Successfully!");
    //         const remainingusers = users.filter((user) => user._id !== id);
    //         setusers(remainingusers);
    //       }
    //     });
    // }
  };
  return (
    <div>
      {/* users list start */}
      <div className="container mx-auto px-4">
        <h1 className="text-3xl pt-5 pb-3">Reported users</h1>
        {/* grid system for the items here  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {users?.map((user) => (
            <div key={user?._id} className="mb-8 grid grid-cols-3 gap-4">
              <div className="sm:col-span-1 col-span-3 hover:shadow shadow-lg">
                <img
                  src={user?.image}
                  className="-mb-4 h-80 w-full object-cover md:h-64 md:rounded"
                  alt=""
                />
              </div>
              <div className="sm:col-span-2 col-span-3">
                <div>
                  <div>
                    <div className=" min-h-72 bg-slate-200 shadow-lg dark:bg-DarkGray  px-6  py-5 hover:shadow md:h-64 md:rounded">
                      <div className="flex justify-between items-center">
                        <h1 className="text-red-400">{user?.role}</h1>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          type="button"
                          className="flex items-center text-red-700 border-red-700 border rounded p-1"
                        >
                          <MdOutlineDelete /> Delete
                        </button>
                      </div>
                      <Link href={`/users/user/${user?._id}`}>
                        <a>
                          <h3 className="cursor-pointer text-lg pt-4 font-bold hover:underline ">
                            {user?.displayName}
                          </h3>
                        </a>
                      </Link>
                      <h3 className="text-lg pt-4 font-bold">{user?.email}</h3>
                      <div className="flex justify-between pt-4">
                        <h1 className="flex flex-col justify-center text-center items-center">
                          <span>{user?.followers.length}</span>{" "}
                          <span>followers</span>
                        </h1>
                        <h1 className="flex flex-col justify-center text-center items-center">
                          <span>{user?.following.length}</span>{" "}
                          <span>following</span>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* users list end */}
    </div>
  );
};

export default ManageUsers;
