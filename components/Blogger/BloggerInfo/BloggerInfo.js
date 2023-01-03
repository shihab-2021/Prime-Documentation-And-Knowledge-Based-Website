/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiCommentDetail, BiHeart } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { ImFlag } from "react-icons/im";
import useAuth from "../../../hook/useAuth";

const BloggerInfo = (props) => {
  const [blogs, setBlogs] = useState();
  const { user } = useAuth();

  const [data, setData] = useState();
  useEffect(() => {
    fetch(`https://prime-api-5jzf.onrender.com/users-data/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, [user?.email]);
  // finding the matched email
  const [isMatched, setIsMatched] = useState(false);
  useEffect(() => {
    // finding the blogger id and the user following list if they match then we will disabled the following btn
    const match = data?.following?.find((followerInfo) => {
      return props?.data?.email === followerInfo?.email;
    });
    if (match?.email) setIsMatched(true);
  }, [data?.email, data?.following]);

  useEffect(() => {
    fetch(`https://prime-api-5jzf.onrender.com/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  const [filter, setFilter] = useState("");
  const searchText = (event) => {
    setFilter(event.target.value);
  };
  const otherPosts = blogs?.filter(
    (td) => td?.blogger?._id === props?.data?._id
  );
  let dataSearch = otherPosts?.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    );
  });
  dataSearch?.reverse();
  const handleDeleteBlog = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?", id);
    if (proceed) {
      const url = `https://prime-api-5jzf.onrender.com/delete-blog/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Deleted Successfully!");
            const remainingBlogs = blogs.filter((blog) => blog._id !== id);
            setBlogs(remainingBlogs);
          }
        });
    }
  };
  // follow handler here
  const handleFollow = (blogger) => {
    const payload = {
      bloggerId: blogger?._id,
      userId: data?._id,
    };
    if (data) {
      fetch(`https://prime-api-5jzf.onrender.com/user`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result?.acknowledged) {
            alert("Started following !");
          } else {
            alert("There is an problem we found !");
          }
        })
        .catch((e) => console.log("Some thing went wrong !"));
    } else {
      alert("For follow you need to login !");
    }
  };
  const date = new Date(props?.data?.birthDate)?.toLocaleDateString();
  return (
    <div>
      <div className="container px-4 mx-auto">
        <div className="bg-gray-100 dark:bg-DarkGray">
          <div className="my-5 p-5">
            <div className="grid grid-cols-12 gap-4">
              {/* <!-- Left Side Start --> */}
              <div className="col-span-12 w-full lg:col-span-4">
                {/* <!-- Profile Card --> */}
                <div className="border-t-4 border-green-400 rounded-lg bg-white p-3 dark:bg-Dark">
                  <div
                    style={{ maxWidth: "250px", maxHeight: "250px" }}
                    className="image mx-auto overflow-hidden rounded-lg border-2"
                  >
                    <img className="w-full" src={props?.data?.image} alt="" />
                  </div>
                  <h1 className="my-1 text-center text-2xl font-bold leading-8 text-gray-900 dark:text-slate-50">
                    {props?.data?.displayName}
                  </h1>
                  <h3 className=" text-semibold text-center text-gray-600 dark:text-slate-300">
                    {props?.data?.profession}
                  </h3>
                  <p className="pt-2 text-sm leading-6 text-gray-500 hover:text-gray-600 text-justify">
                    {props?.data?.biography}
                  </p>
                  {props?.data?.email != data?.email && (
                    <div className="flex justify-center py-5 text-2xl ">
                      {isMatched ? (
                        <button className="my-3 cursor-not-allowed rounded-md border border-red-700 p-3  font-bold text-red-500">
                          <FaHeart />
                        </button>
                      ) : user?.email !== props?.data?.email ? (
                        <button
                          onClick={() => {
                            handleFollow(props?.data);
                            setIsMatched(true);
                          }}
                          className="my-3 rounded-md border border-red-700 p-3  font-bold text-red-400"
                        >
                          <BiHeart />
                        </button>
                      ) : (
                        <button
                          disabled
                          className="my-3 rounded-md border border-red-700 p-3  font-bold text-red-400"
                        >
                          <FaHeart />
                        </button>
                      )}
                    </div>
                  )}
                  {props?.data?.email === data?.email && (
                    <div className="w-100 flex justify-center">
                      <Link href="/giveInfo">
                        <a className="border border-teal-400 p-2 my-5 rounded">
                          Update Profile
                        </a>
                      </Link>
                    </div>
                  )}
                  <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm dark:bg-DarkGray dark:text-slate-300">
                    <li className="flex items-center py-3">
                      <span>Member since</span>
                      <span className="ml-auto">Nov 07, 2016</span>
                    </li>
                  </ul>
                </div>
                {/* <!-- End of profile card --> */}
                {/* <!-- Friends card --> */}
                <div className="mt-4 bg-white p-3 hover:shadow dark:bg-Dark">
                  <div className="flex items-center space-x-3 text-xl font-semibold leading-8 text-gray-900">
                    <span className="text-green-500">
                      <svg
                        className="h-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </span>
                    <span className="text-black dark:text-white">
                      Followers
                    </span>
                  </div>
                  <div className="">
                    {!props?.data?.followers[0] && (
                      <h3 className="my-3 text-center">
                        Not followed by anyone!
                      </h3>
                    )}
                    {props?.data?.followers?.map((follower) => (
                      <div key={follower?.id} className="my-2 flex ">
                        <img
                          className="h-16 w-16 rounded-full"
                          src={follower.image}
                          alt=""
                        />
                        <p className="w-full self-center pl-2 ">
                          <Link href={`/blogs/blogger/${follower?.id}`}>
                            <a className="hover:underline">{follower?.name}</a>
                          </Link>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* <!-- End of friends card --> */}
                {/* <!-- following card --> */}
                <div className="mt-4 bg-white p-3 hover:shadow dark:bg-Dark">
                  <div className="flex items-center space-x-3 text-xl font-semibold leading-8 text-gray-900">
                    <span className="text-green-500">
                      <svg
                        className="h-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </span>
                    <span className="text-black dark:text-white">
                      Following
                    </span>
                  </div>
                  <div className="">
                    {!props?.data?.following[0] && (
                      <h3 className="my-3 text-center">
                        Not following anyone!
                      </h3>
                    )}
                    {props?.data?.following?.map((follower) => (
                      <div key={follower?.id} className="my-2 flex ">
                        <img
                          className="h-16 w-16 rounded-full"
                          src={follower?.image}
                          alt=""
                        />
                        <p className="w-full self-center pl-2 ">
                          <Link href={`/blogs/blogger/${follower?.id}`}>
                            <a className="hover:underline">{follower?.name}</a>
                          </Link>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* <!-- End of following card --> */}
              </div>
              {/* <!-- Left Side End --> */}
              {/* <!-- Right Side Start --> */}
              <div className="col-span-12 mb-6 w-full lg:col-span-8">
                {/* <!-- Profile tab --> */}
                {/* <!-- About Section --> */}
                <div className="rounded-sm bg-white p-3 shadow-sm dark:bg-Dark">
                  <div className="flex items-center space-x-2 font-semibold leading-8 text-gray-900 dark:text-white">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <span className=" tracking-wide">About</span>
                  </div>
                  <div className="text-gray-700 dark:text-slate-300">
                    <div className="grid text-base md:grid-cols-2">
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4 py-2 font-semibold">
                          Gender
                        </div>
                        <div className="col-span-8 break-words py-2 dark:text-slate-400">
                          {props?.data?.gender}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4 py-2 font-semibold">
                          Address
                        </div>
                        <div className="col-span-8 break-words py-2 dark:text-slate-400">
                          {props?.data?.address}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4 py-2 font-semibold">
                          Website
                        </div>
                        <div className="col-span-8 break-words py-2 dark:text-slate-400">
                          {props?.data?.website}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4 py-2 font-semibold">
                          Email
                        </div>
                        <div className="col-span-8 break-words py-2 dark:text-slate-400">
                          {props?.data?.email}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4 py-2 font-semibold">
                          Birth Date
                        </div>
                        <div className="col-span-8 break-words py-2 dark:text-slate-400">
                          {date != "Invalid Date" && date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End of about section --> */}
                {/* <!-- Blogs --> */}
                <div className="my-4">
                  <h3 className="my-4 pt-5">Blogs</h3>
                  {dataSearch && !dataSearch[0] && (
                    <p className="text-center text-xl">
                      No blog has not posted yet!
                    </p>
                  )}
                  <div className="col-span-12 lg:col-span-8">
                    {dataSearch?.map((blog) => (
                      <div
                        key={blog?._id}
                        className="mb-8 grid grid-cols-3 gap-4"
                      >
                        <div className="sm:col-span-1 col-span-3">
                          <img
                            src={blog?.image}
                            className="-mb-4 h-80 w-full object-cover md:h-64 md:rounded"
                            alt=""
                          />
                        </div>
                        <div className="sm:col-span-2 col-span-3">
                          <div className=" min-h-72 bg-slate-200 shadow-lg dark:bg-Dark  px-6  py-5 hover:shadow md:h-64 md:rounded">
                            <div className="flex justify-between items-center">
                              <h1 className="text-red-400">{blog?.category}</h1>
                              {props?.data?.email === data?.email && (
                                <button
                                  onClick={() => handleDeleteBlog(blog?._id)}
                                  type="button"
                                  className="flex items-center text-red-700 border-red-700 border rounded p-1"
                                >
                                  <MdOutlineDelete /> Delete
                                </button>
                              )}
                            </div>
                            <Link href={`/blogs/blog/${blog?._id}`}>
                              <a>
                                <h3 className="cursor-pointer pt-4 text-lg pb-10 font-bold hover:underline ">
                                  {blog?.title}
                                </h3>
                              </a>
                            </Link>
                            <div className="items-center  justify-between md:flex">
                              <div className="mb-4 flex items-center">
                                <img
                                  alt="Bloggers image"
                                  src={blog?.blogger?.image}
                                  className="rounded-full w-10 h-10 object-cover dark:border-white border border-black"
                                />
                                <p className="pl-1">
                                  {" "}
                                  {blog?.blogger?.displayName} <br />
                                  <small className="hidden md:flex">
                                    {" "}
                                    {blog?.uploadDate} - {blog?.uploadTime}
                                  </small>
                                </p>
                              </div>
                              <div>
                                <p className="flex justify-center items-center">
                                  {" "}
                                  <BiCommentDetail />
                                  {blog?.comment?.length}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* <!-- Blogs --> */}
                {/* <!-- End of profile tab --> */}
              </div>
              {/* <!-- Right Side End --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloggerInfo;
