/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiNews, BiUser, BiCommentDots } from "react-icons/bi";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";

const DashboardHome = () => {
  const [blogs, setBlogs] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch(`https://prime-api-5jzf.onrender.com/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  useEffect(() => {
    fetch(`https://prime-api-5jzf.onrender.com/users-data`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  const reports = blogs?.filter((td) => td?.reports?.length !== 0);
  const [showMore1, setShowMore1] = useState(false);
  const [showMore2, setShowMore2] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  useEffect(() => {
    if (showMore1) {
      setData(blogs);
    } else {
      setData(blogs?.slice(0, 3));
    }
  }, [showMore1, !reports]);
  useEffect(() => {
    if (showMore2) {
      setData1(users);
    } else {
      setData1(users?.slice(0, 3));
    }
  }, [showMore2, !reports]);
  console.log(data1);
  return (
    <div>
      <div className="container mx-auto px-4">
        <div className=" pb-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 text-center">
          <div className="bg-teal-200 dark:bg-teal-700 flex justify-between items-center p-5 rounded">
            <div className=" text-2xl">
              <p>Total Blogs</p>
              <p>{blogs?.length}</p>
            </div>
            <div className="text-6xl">
              <BiNews />
            </div>
          </div>
          <div className="bg-teal-200 dark:bg-teal-700 flex justify-between items-center p-5 rounded">
            <div className=" text-2xl">
              <p>Total Users</p>
              <p>{blogs?.length}</p>
            </div>
            <div className="text-6xl">
              <BiUser />
            </div>
          </div>
          <div className="bg-teal-200 dark:bg-teal-700 flex justify-between items-center p-5 rounded">
            <div className=" text-2xl">
              <p>Total Messages</p>
              <p>{blogs?.length}</p>
            </div>
            <div className="text-6xl">
              <BiCommentDots />
            </div>
          </div>
        </div>
        {/* reported blogs list start */}
        <div>
          <h1 className="text-3xl pt-5 pb-3">Reported blogs</h1>
          {/* grid system for the items here  */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {data?.map((item) => (
              <div
                key={item.title}
                className="rounded-lg dark:bg-sky-800 bg-sky-300"
              >
                <div className="flex items-center p-4">
                  <img
                    className=" object-cover rounded w-24"
                    src={item?.image}
                    alt=""
                  />
                  <span className="ml-4">
                    <Link href={`/blog/category/${item?.title}`}>
                      <a>
                        <h6 className="font-bold text-Dark dark:text-white">
                          {item?.title}
                        </h6>
                      </a>
                    </Link>
                    <p className="text-secondary flex items-center">
                      {item?.reports?.length} reports
                    </p>
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* button here  */}
          <div className="my-4 text-center">
            <button
              className="rounded-md p-1 bg-gradient-to-r hover:from-teal-200 hover:to-sky-900 from-sky-900  to-teal-200 text-white text-lg font-semibold duration-300 focus:ring-2 flex justify-center items-center px-8"
              onClick={() => setShowMore1(!showMore1)}
            >
              {showMore1 ? (
                <p className="flex justify-center items-center">
                  <BsArrowUpCircle className="animate-bounce mr-1" /> Show less
                </p>
              ) : (
                <p className="flex justify-center items-center">
                  <BsArrowDownCircle className="animate-bounce mr-1" /> Show
                  more
                </p>
              )}
            </button>
          </div>
        </div>
        {/* reported blogs list end */}
        {/* reported users list start */}
        <div>
          <h1 className="text-3xl pt-5 pb-3">Reported users</h1>
          {/* grid system for the items here  */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {data1?.map((item) => (
              <div
                key={item.title}
                className="rounded-lg dark:bg-amber-300 bg-orange-200"
              >
                <div className="flex items-center p-4">
                  <img
                    className=" object-cover rounded w-24"
                    src={item?.image}
                    alt=""
                  />
                  <span className="ml-4">
                    <Link href={`/blog/category/${item?.title}`}>
                      <a>
                        <h6 className="font-bold text-Dark dark:text-white">
                          {item?.displayName}
                        </h6>
                      </a>
                    </Link>
                    <p className="text-secondary flex items-center">
                      {item?.reports?.length} reports
                    </p>
                    <p className="text-secondary flex items-center">
                      {item?.followers?.length} followers
                    </p>
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* button here  */}
          <div className="my-4 text-center">
            <button
              className="rounded-md p-1 bg-gradient-to-r hover:from-teal-200 hover:to-sky-900 from-sky-900  to-teal-200 text-white text-lg font-semibold duration-300 focus:ring-2 flex justify-center items-center px-8"
              onClick={() => setShowMore2(!showMore2)}
            >
              {showMore2 ? (
                <p className="flex justify-center items-center">
                  <BsArrowUpCircle className="animate-bounce mr-1" /> Show less
                </p>
              ) : (
                <p className="flex justify-center items-center">
                  <BsArrowDownCircle className="animate-bounce mr-1" /> Show
                  more
                </p>
              )}
            </button>
          </div>
        </div>
        {/* reported users list end */}
      </div>
    </div>
  );
};

export default DashboardHome;
