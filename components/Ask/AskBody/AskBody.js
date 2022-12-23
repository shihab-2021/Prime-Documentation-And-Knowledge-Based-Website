/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";
import Loading from "../../Shared/Loading/Loading";

const AskBody = () => {
  const [questions, setQuestions] = useState();
  const [search, setSearch] = useState(true);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState(false);
  const [allQuestions, setAllQuestions] = useState();

  useEffect(() => {
    fetch(`https://prime-api-5jzf.onrender.com/questions`)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  questions?.reverse();
  allQuestions?.reverse();

  const recentQuestion = questions?.slice(0, 3);

  const searchText = (event) => {
    setCategory(false);
    setSearch(true);
    setFilter(event.target.value);
    console.log(event.target.value);
  };
  let dataSearch = questions?.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        ?.toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    );
  });
  dataSearch?.reverse();

  const handleChange = (event) => {
    setCategory(true);
    setSearch(false);
    const categoryWiseQuestions = questions.filter(
      (td) => td?.category === event.target.value
    );
    setAllQuestions(categoryWiseQuestions);
  };
  return (
    <div>
      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 md:col-span-8">
            {/* search bar start */}
            <div className="search-box rounded bg-slate-200 p-6 text-center  dark:bg-DarkGray">
              <h4 className="mb-2 font-bold">Search</h4>
              <hr className="bg-white border-slate-300" />
              <input
                type="search"
                placeholder="Search..."
                name=""
                id=""
                className="mt-4 mb-6 w-full rounded-lg bg-slate-300 py-2 px-4 focus:outline-none dark:text-black"
                onChange={searchText.bind(this)}
              />
            </div>
            {/* search bar end */}
          </div>
          <div className="col-span-12 md:col-span-4">
            {/* category bar start */}
            <div className="search-box mb-5 rounded bg-slate-200 p-6 text-center dark:bg-DarkGray">
              <h4 className="mb-2 font-bold">Find Category Wise Question</h4>
              <hr className="bg-white border-slate-300" />
              <select
                onChange={handleChange}
                className="mt-4 mb-6 h-10 w-full cursor-pointer rounded-lg bg-slate-300 py-2 px-4 focus:outline-none dark:text-black"
              >
                <option className="hidden">Select Category</option>
                <option>Creative</option>
                <option>Programming</option>
                <option>Lifestyle</option>
                <option>News</option>
                <option>Photography</option>
                <option>Skill</option>
                <option>Tourist Tours</option>
                <option>Marketing</option>
                <option>Education</option>
              </select>
            </div>
            {/* category bar end */}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-5">
          {/* questions main section start */}
          <div className="col-span-12 md:col-span-8">
            <div className="flex flex-col justify-center md:flex-row md:justify-between">
              <h1
                style={{
                  lineHeight: "66px",
                }}
                className="mb-4 text-center text-3xl font-bold text-Dark dark:text-white"
              >
                Questions
              </h1>
              <div className="mb-4 self-center">
                <Link href="/askQuestion">
                  <a>
                    <span className="text-1xl rounded-lg bg-orange-500 px-3 py-3  font-semibold text-Dark dark:text-white">
                      Ask Question{" "}
                      <span className="">
                        {/* <HelpOutlineIcon className="animate-pulse" /> */}
                      </span>
                    </span>
                  </a>
                </Link>
              </div>
            </div>
            {category && allQuestions[0] && (
              <div className="mt-4">
                {" "}
                {allQuestions?.map((question) => (
                  <div key={question._id} className="mb-5 w-full">
                    <Link
                      onClick={() => dispatch(ADD_TO_QUESTION(question))}
                      href={`/question/${question?._id}`}
                    >
                      <a>
                        <div className=" rounded  bg-slate-200 px-6 py-3 hover:shadow dark:bg-DarkGray">
                          <p className="text-sm text-red-400">
                            {question.category}
                          </p>
                          <h3 className="cursor-pointer text-xl pb-1 font-bold hover:underline ">
                            {question.title}
                          </h3>
                          <div className="tag-container flex flex-wrap rounded-lg pb-2">
                            {question?.tags?.map((tag, index) => {
                              return (
                                <div
                                  key={index}
                                  className="m-1 h-fit rounded bg-slate-300  py-1 px-2 text-xs text-Dark"
                                >
                                  {tag}{" "}
                                </div>
                              );
                            })}
                          </div>
                          <div className="items-center  justify-between md:flex">
                            <div className="mb-2 flex items-center">
                              <img
                                alt="Bloggers image"
                                src={question?.blogger?.image}
                                className="rounded-full w-10 h-10 mr-1.5 object-cover dark:border-white border border-black"
                              />
                              <p>
                                {" "}
                                {question?.blogger?.displayName} <br />
                                <small className="hidden md:flex">
                                  {" "}
                                  {question?.uploadDate} -{" "}
                                  {question?.uploadTime}
                                </small>
                              </p>
                            </div>
                            <div>
                              <p>{question?.answers?.length} answers</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            )}
            {category && !allQuestions[0] && (
              <div className=" mt-10 text-center">
                <h1 className=" text-2xl">
                  There is not question in this category!
                </h1>
              </div>
            )}
            {search && dataSearch && (
              <div className="mt-4">
                {" "}
                {dataSearch?.map((question) => (
                  <div key={question._id} className="mb-5 w-full">
                    <Link
                      onClick={() => dispatch(ADD_TO_QUESTION(question))}
                      href={`/question/${question?._id}`}
                    >
                      <a>
                        <div className=" rounded  bg-slate-200 px-6 py-3 hover:shadow dark:bg-DarkGray">
                          <p className="text-sm text-red-400">
                            {question.category}
                          </p>
                          <h3 className="cursor-pointer pb-1 text-xl font-bold hover:underline ">
                            {question.title}
                          </h3>
                          <div className="tag-container flex flex-wrap rounded-lg pb-2">
                            {question?.tags?.map((tag, index) => {
                              return (
                                <div
                                  key={index}
                                  className="m-1 h-fit rounded bg-slate-300  py-1 px-2 text-xs text-Dark"
                                >
                                  {tag}{" "}
                                </div>
                              );
                            })}
                          </div>
                          <div className="items-center  justify-between md:flex">
                            <div className="mb-2 flex items-center">
                              <img
                                alt="Bloggers image"
                                src={question?.blogger?.image}
                                className="rounded-full mr-1.5 w-10 h-10 object-cover dark:border-white border border-black"
                              />
                              <p>
                                {" "}
                                {question?.blogger?.displayName} <br />
                                <small className="hidden md:flex">
                                  {" "}
                                  {question?.uploadDate} -{" "}
                                  {question?.uploadTime}
                                </small>
                              </p>
                            </div>
                            <div>
                              <p>{question?.answers?.length} answers</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            )}
            {search && !allQuestions && dataSearch?.length === 0 && (
              <div className="mt-10 text-center">
                <h1 className="text-2xl">Sorry, Nothing fount!</h1>
              </div>
            )}
            {search && !dataSearch && (
              <div className="mt-4">
                <Loading></Loading>
              </div>
            )}
          </div>
          {/* questions main section end */}
          {/* sidebar start */}
          <div className="col-span-12 md:col-span-4">
            {/* recent questions start */}
            <div className=" recent-blog mb-10 text-lg rounded bg-slate-200 p-4 text-center dark:bg-DarkGray">
              <h4 className="mb-2 font-bold">Recent Post</h4>
              <hr className="bg-white border-slate-300" />
              {recentQuestion?.map((question) => (
                <div key={question._id} className="recent-blog mt-6">
                  <div className=" flex ">
                    <Link href="/">
                      <a>
                        <div className="px-6 text-left ">
                          <p className="cursor-pointer font-medium hover:underline">
                            {question?.title}
                          </p>

                          <small className="flex pt-2">
                            <p className="hidden md:flex">
                              {" "}
                              {question?.uploadDate} - {question?.uploadTime}
                            </p>
                          </small>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {/* recent questions start */}
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
      </div>
    </div>
  );
};

export default AskBody;
