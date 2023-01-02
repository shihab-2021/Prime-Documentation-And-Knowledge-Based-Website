/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import BlogsHeroSection from "../../../components/Blogs/BlogsHeroSection/BlogsHeroSection";
import Loading from "../../../components/Shared/Loading/Loading";
import authCheck from "../../../hook/authCheck";

const CategoryBlogs = () => {
  const [blogs, setBlogs] = useState();
  const [search, setSearch] = useState(false);
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    fetch(`https://prime-api-5jzf.onrender.com/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  //pagination start
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const allBlogs = []
    .concat(blogs)
    .reverse()
    .filter((td) => td?.category === id);
  const recentPosts = allBlogs?.slice(0, 3);

  const currentPosts = allBlogs?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //pagination end

  // searching code start
  const [filter, setFilter] = useState("");
  const searchText = (event) => {
    setSearch(true);
    setFilter(event.target.value);
    if (event.target.value === "") {
      setSearch(false);
    }
  };
  let dataSearch = blogs?.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        ?.toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    );
  });
  dataSearch?.reverse();
  // searching code end
  console.log(dataSearch);
  return (
    <div>
      <BlogsHeroSection></BlogsHeroSection>
      <div className="container mx-auto px-4 mt-16">
        {/* mobile search option start */}
        <div className="search-box mb-8 block rounded bg-slate-100 p-6 text-center dark:bg-DarkGray lg:hidden">
          <h4 className="mb-2 font-bold text-lg">Search</h4>
          <hr className="bg-white border-slate-300" />
          <input
            type="search"
            placeholder="Search..."
            name=""
            id=""
            className="mt-4 mb-6 w-full rounded-full bg-slate-200 py-2 px-4 focus:outline-none dark:text-black"
            onChange={searchText.bind(this)}
          />
          <Link href="/blogUpload">
            <a className="my-5 border p-3 rounded border-teal-400 text-teal-400 hover:text-teal-300">
              Upload Blog
            </a>
          </Link>
        </div>
        {/* mobile search option end */}
        {/* main content start */}
        <div className="grid grid-cols-12 gap-4">
          {/* showing blogs start */}
          <div className="col-span-12 lg:col-span-8">
            {search && (
              <div>
                {!dataSearch[0] && (
                  <div className="text-center text-lg">
                    <h1>Sorry Nothing Found!</h1>
                  </div>
                )}
                {dataSearch?.map((blog) => (
                  <div
                    key={blog?._id}
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
                            <h3 className="cursor-pointer text-lg pt-4 pb-10 font-bold hover:underline ">
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
                ))}
              </div>
            )}
            {!search && (
              <div>
                {!currentPosts[0] && (
                  <div className="text-center text-lg">
                    <h1>Sorry Nothing Found!</h1>
                  </div>
                )}
                {currentPosts[0] &&
                  currentPosts?.map((blog) => (
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
                        <Link href={`/blogs/blog/${blog?._id}`}>
                          <a>
                            <div className=" min-h-72 bg-slate-200 shadow-lg dark:bg-DarkGray  px-6  py-5 hover:shadow md:h-64 md:rounded">
                              <p className="text-red-400">{blog?.category}</p>
                              <h3 className="cursor-pointer pt-4 text-lg pb-10 font-bold hover:underline ">
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
                  ))}
                {/* <div className="pb-6">
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={blogs?.length}
                    paginate={paginate}
                  />
                </div> */}
              </div>
            )}
          </div>
          {/* showing blogs end */}
          {/* sidebar start */}
          <div className="col-span-12 lg:col-span-4">
            {/* search box start */}
            <div className="search-box hidden rounded bg-slate-200 p-6 text-center dark:bg-DarkGray lg:block">
              <h4 className="mb-2 text-lg font-bold">Search</h4>
              <hr className="bg-white border-slate-300" />
              <input
                type="search"
                placeholder="Search..."
                name=""
                id=""
                className="mt-4 mb-6 w-full rounded-full bg-slate-300 py-2 px-4 focus:outline-none dark:text-black"
                onChange={searchText?.bind(this)}
              />
              <Link href="/blogUpload">
                <a className="my-5 border p-3 rounded border-teal-400 text-teal-400 hover:text-teal-300">
                  Upload Blog
                </a>
              </Link>
            </div>
            {/* search box end */}
            {/* recent blog start */}
            <div className=" recent-blog mt-10 mb-10 text-lg rounded bg-slate-200 p-4 text-center dark:bg-DarkGray">
              <h4 className="mb-2 font-bold">Recent Post</h4>
              <hr className="bg-white border-slate-300" />
              {recentPosts?.map((recentPost) => (
                <div key={recentPost?._id} className="recent-blog mt-6">
                  <div className=" flex">
                    <img
                      className="h-32 w-32 rounded object-cover"
                      src={recentPost?.image}
                      alt=""
                    />
                    <button>
                      <Link
                        className="self-center"
                        href={`/blogs/blog/${recentPost?._id}`}
                      >
                        <a>
                          <div className="px-6 text-left ">
                            <p className="cursor-pointer font-medium hover:underline">
                              {/* {otherPost?.title} */}
                              {recentPost?.title?.length > 55
                                ? recentPost?.title?.slice(0, 55) + "..."
                                : recentPost?.title}
                            </p>

                            <small className="flex pt-2">
                              {recentPost?.uploadDate}
                            </small>
                          </div>
                        </a>
                      </Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* recent blog start */}
            {/* social link start */}
            <div className="mb-10 rounded text-lg bg-slate-200  p-8 text-center dark:bg-DarkGray">
              <h4 className="mb-2 font-bold">Stay In Touch</h4>
              <hr className="bg-white border-slate-300" />
              <div>
                <ul className="sidebar-icon mt-4 flex justify-between text-gray-500">
                  <li className="border p-2 rounded-full text-xl border-gray-500 hover:border-white hover:text-white">
                    <Link href="/">
                      <a>
                        <FaFacebookF />
                      </a>
                    </Link>
                  </li>
                  <li className="border p-2 rounded-full text-xl border-gray-500 hover:border-white hover:text-white">
                    <Link href="/">
                      <a>
                        <FaTwitter />
                      </a>
                    </Link>
                  </li>
                  <li className="border p-2 rounded-full text-xl border-gray-500 hover:border-white hover:text-white">
                    <Link href="/">
                      <a>
                        <FaPinterestP />
                      </a>
                    </Link>
                  </li>
                  <li className="border p-2 rounded-full text-xl border-gray-500 hover:border-white hover:text-white">
                    <Link href="/">
                      <a>
                        <FaInstagram />
                      </a>
                    </Link>
                  </li>
                  <li className="border p-2 rounded-full text-xl border-gray-500 hover:border-white hover:text-white">
                    <Link href="/">
                      <a>
                        <FaLinkedinIn />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* social link end */}
            {/* category link start */}
            <div className="mb-10 rounded bg-slate-200 p-6 text-center dark:bg-DarkGray">
              <h4 className="mb-2 font-bold text-lg">All Category</h4>
              <hr className="bg-white border-slate-300" />
              <div className="category mt-4 grid grid-cols-3 gap-4">
                <li className="border p-2 hover:border-white hover:text-white border-gray-500 list-none rounded-lg text-gray-500 cursor-pointer">
                  Creative
                </li>
                <li className="border p-2 hover:border-white hover:text-white border-gray-500 list-none rounded-lg text-gray-500 cursor-pointer">
                  Inspiration
                </li>
                <li className="border p-2 hover:border-white hover:text-white border-gray-500 list-none rounded-lg text-gray-500 cursor-pointer">
                  Lifestyle
                </li>
                <li className="border p-2 hover:border-white hover:text-white border-gray-500 list-none rounded-lg text-gray-500 cursor-pointer">
                  News
                </li>
                <li className="border p-2 hover:border-white hover:text-white border-gray-500 list-none rounded-lg text-gray-500 cursor-pointer">
                  Photography
                </li>
                <li className="border p-2 hover:border-white hover:text-white border-gray-500 list-none rounded-lg text-gray-500 cursor-pointer">
                  Skill
                </li>
                <li className="border p-2 hover:border-white hover:text-white border-gray-500 list-none rounded-lg text-gray-500 cursor-pointer">
                  Trending
                </li>
                <li className="border p-2 hover:border-white hover:text-white border-gray-500 list-none rounded-lg text-gray-500 cursor-pointer">
                  Tourist
                </li>
                <li className="border p-2 hover:border-white hover:text-white border-gray-500 list-none rounded-lg text-gray-500 cursor-pointer">
                  Education
                </li>
              </div>
            </div>
            {/* category link end */}
          </div>
          {/* sidebar end */}
        </div>
        {/* main content end */}
      </div>
    </div>
  );
};

export default authCheck(CategoryBlogs);
