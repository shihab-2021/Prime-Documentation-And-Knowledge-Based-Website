/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    fetch(`https://prime-api-5jzf.onrender.com/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
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
  return (
    <div>
      {/* blogs list start */}
      <div className="container mx-auto px-4">
        <h1 className="text-3xl pt-5 pb-3">Manage blogs</h1>
        {/* grid system for the items here  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {blogs?.map((blog) => (
            <div key={blog?._id} className="mb-8 grid grid-cols-3 gap-4">
              <div className="sm:col-span-1 col-span-3 hover:shadow shadow-lg">
                <img
                  src={blog?.image}
                  className="-mb-4 h-80 w-full object-cover md:h-64 md:rounded"
                  alt=""
                />
              </div>
              <div className="sm:col-span-2 col-span-3">
                <div>
                  <div>
                    <div className=" min-h-72 bg-slate-200 shadow-lg dark:bg-DarkGray  px-6  py-5 hover:shadow md:h-64 md:rounded">
                      <div className="flex justify-between items-center">
                        <h1 className="text-red-400">{blog?.category}</h1>
                        <button
                          onClick={() => handleDeleteBlog(blog?._id)}
                          type="button"
                          className="flex items-center text-red-700 border-red-700 border rounded p-1"
                        >
                          <MdOutlineDelete /> Delete
                        </button>
                      </div>
                      <Link href={`/blogs/blog/${blog?._id}`}>
                        <a>
                          <h3 className="cursor-pointer text-lg pt-4 pb-10 font-bold hover:underline ">
                            {blog?.title}
                          </h3>
                        </a>
                      </Link>
                      <div className="items-center justify-between md:flex">
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
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* blogs list end */}
    </div>
  );
};

export default ManageBlogs;
