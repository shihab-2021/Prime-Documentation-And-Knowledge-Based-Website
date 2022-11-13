/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import Loading from "../../Shared/Loading/Loading";

const HomeBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("https://incognito-prime.herokuapp.com/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);
  blogs?.sort(
    (firstItem, secondItem) =>
      firstItem?.comment?.length - secondItem?.comment?.length
  );
  blogs?.reverse();
  const trendingBlogs = blogs?.slice(0, 6);
  return (
    <div className="container px-4 py-10 my-10 mx-auto">
      <div className="flex flex-col pb-24 text-center md:flex-row md:justify-between">
        <h2 className="  pb-6 md:pb-0">
          <span className="pb-6 text-5xl">Trending Blogs</span>
        </h2>
        <Link href="/blogUpload">
          <a>
            <button className="rounded-md bg-indigo-700 px-10 py-4 font-semibold text-white">
              {" "}
              Upload blog now
              {/* <BackupIcon className="mx-2 animate-bounce" /> */}
            </button>
          </a>
        </Link>{" "}
      </div>
      {!trendingBlogs[0] && (
        <div className="py-10 my-10">
          <Loading></Loading>
        </div>
      )}
      <div className="grid grid-cols-12 gap-4">
        {trendingBlogs?.map((blog) => (
          <div key={blog?._id} className="col-span-12 lg:col-span-6">
            <div
              className="mb-8 grid grid-cols-3 gap-4"
              // container
              // spacing={{ xs: 2, md: 2 }}
              // columns={{ xs: 4, sm: 12, md: 12 }}
            >
              <div className="sm:col-span-1 col-span-3 hover:shadow shadow-lg">
                <img
                  src={blog?.image}
                  className="-mb-4 h-80 w-full object-cover md:h-64 md:rounded"
                  alt=""
                />
              </div>
              <div className="sm:col-span-2 col-span-3">
                <Link
                  // onClick={() => dispatch(ADD_TO_BLOG(blog))}
                  href={`/blogs/blog/${blog?._id}`}
                >
                  <a>
                    <div className=" min-h-72 bg-slate-200 shadow-lg dark:bg-DarkGray  px-6  py-5 hover:shadow md:h-64 md:rounded">
                      <p className="text-red-400">{blog?.category}</p>
                      <h3 className="cursor-pointer pt-4 pb-10 font-bold hover:underline ">
                        {blog?.title}
                      </h3>
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
                  </a>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="grid grid-cols-12 gap-8">
        {trendingBlogs?.map((blog) => (
          <button
            key={blog?._id}
            className="col-span-12 min-h-full w-full rounded text-left font-serif  text-Dark shadow dark:text-white sm:col-span-6 md:col-span-6"
              onClick={() => dispatch(ADD_TO_BLOG(blog))}
          >
            <Link
              href="/"
                 {`/blog/${blog?._id}`}
            >
              <a>
                <div className="min-h-full rounded-lg bg-slate-100 shadow-lg dark:bg-darkBlue">
                  <img
                    className="w-full rounded object-cover h-80"
                    h-96
                    src="https://source.unsplash.com/random/1600x900"
                    src={blog?.image}
                    alt="blogImage"
                  />
                  <div
                    style={{ minHeight: "135px" }}
                    className="px-4 pt-4 pb-8"
                  >
                    <h3 className="text-xl text-Docy-Dark dark:text-slate-100">
                      {blog?.title}
                      {blog?.title?.length > 70
                        ? blog?.title?.slice(0, 70) + "..."
                        : blog?.title}
                    </h3>
                  </div>
                  <div>
                    <hr className="text-white" />
                    <div className="flex justify-between p-4">
                      <div className="flex">
                        <div className="self-center">
                          <div className="scisco-verified">
                            <img
                              alt="Bloggers image"
                              src={blog?.blogger?.image}
                              className="rounded-full w-10 h-10 object-cover dark:border-white border border-black"
                            />
                          </div>
                        </div>
                        <div className="self-center pl-2">
                          <p>
                            <small className="text-sm text-Docy-Dark dark:text-white">
                              {blog?.blogger?.displayName}
                            </small>
                          </p>
                          <p>
                            <small className="font-sans text-sm text-Docy-Dark dark:text-white">
                              {blog?.uploadDate} - {blog?.uploadTime}
                            </small>
                          </p>
                        </div>
                      </div>
                      <div className="float-right flex justify-center items-center self-center text-Docy-Dark dark:text-white">
                        <BiCommentDetail />
                        <p className="self-center">{blog?.comment?.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </button>
        ))}
      </div> */}
      <div className="mt-12 flex justify-center">
        <Link href="/blogs">
          <a>
            <button
              type="submit"
              className=" rounded-full p-3 w-full sm:w-56 bg-gradient-to-r hover:from-teal-200 hover:to-sky-900 from-sky-900  to-teal-200 text-white text-lg font-semibold "
            >
              See All
            </button>
            {/* <SvgButton sx={{ textAlign: "center", color: "#6ab3fb" }}>
                {" "}
                See All <KeyboardDoubleArrowRightIcon />
              </SvgButton> */}{" "}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HomeBlogList;
