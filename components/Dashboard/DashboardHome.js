/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiNews, BiUser, BiCommentDots } from "react-icons/bi";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const DashboardHome = () => {
  const [blogs, setBlogs] = useState();
  const [users, setUsers] = useState();
  const [messages, setMessages] = useState();

  useEffect(() => {
    fetch(`https://prime-api-5jzf.onrender.com/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  useEffect(() => {
    fetch(`https://prime-api-5jzf.onrender.com/messages`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
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
      setData(reports);
    } else {
      setData(reports?.slice(0, 3));
    }
  }, [showMore1, !reports]);
  const handleDeleteBlog = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?", id);
    if (proceed) {
      const url = `https://prime-api-5jzf.onrender.com/delete-message/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Deleted Successfully!");
            const remainingBlogs = messages.filter(
              (message) => message._id !== id
            );
            setMessages(remainingBlogs);
          }
        });
    }
  };
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOnBlur = (e) => {
    setEmail(e.target.value);
  };
  const handleAdminSubmit = (e) => {
    const user = { email };
    fetch("https://prime-api-5jzf.onrender.com/users/admin", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setSuccess(true);
        } else {
          alert("Please enter a valid email!");
        }
      });

    e.preventDefault();
  };
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
              <p>{users?.length}</p>
            </div>
            <div className="text-6xl">
              <BiUser />
            </div>
          </div>
          <div className="bg-teal-200 dark:bg-teal-700 flex justify-between items-center p-5 rounded">
            <div className=" text-2xl">
              <p>Total Messages</p>
              <p>{messages?.length}</p>
            </div>
            <div className="text-6xl">
              <BiCommentDots />
            </div>
          </div>
        </div>
        {/* make admin start */}
        <div className="pt-5">
          <h2 className=" text-2xl">MAKE AN ADMIN</h2>
          <form
            className="my-5"
            onSubmit={handleAdminSubmit}
            style={{ maxWidth: "25rem" }}
          >
            <input
              placeholder="Enter email to make admin"
              className="text-xl bg-auto p-2 border-slate-500 border rounded-lg w-full"
              type="email"
              onBlur={handleOnBlur}
            />
            <br />
            <br />
            <button
              className=" border py-2 px-3 rounded-lg border-teal-500 text-xl text-teal-500"
              type="submit"
            >
              Make Admin
            </button>
            <br />
            <br />
            {success && alert("Made Admin successfully!")}
          </form>
        </div>
        {/* make admin end */}
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
          <h1 className="text-3xl pt-5 pb-3">Users Messages</h1>
          {/* grid system for the items here  */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {messages?.map((item) => (
              <div
                key={item._id}
                className="rounded-lg dark:bg-amber-300 bg-orange-200"
              >
                <div className=" items-center p-4">
                  <div className="ml-4">
                    <Link href={`/blog/category/${item?.title}`}>
                      <a>
                        <h6 className="font-bold text-Dark dark:text-white">
                          Email: {item?.email}
                        </h6>
                      </a>
                    </Link>
                    <p className="text-secondary flex items-center">
                      Subject: {item?.subject}
                    </p>
                    <p className="text-secondary flex items-center">
                      {item?.message}
                    </p>
                  </div>
                  <div className="px-4 pt-3">
                    <button
                      onClick={() => handleDeleteBlog(item?._id)}
                      type="button"
                      className="flex items-center text-red-700 border-red-700 border rounded p-1"
                    >
                      <MdOutlineDelete /> Delete
                    </button>
                  </div>
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
