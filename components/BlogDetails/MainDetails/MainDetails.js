/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import useAuth from "../../../hook/useAuth";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const MainDetails = (props) => {
  const reportBlogReasons = {
    "For breaking the first rule": "1- For breaking the first rule",
    "For breaking the second rule": "2- For breaking the second rule",
    "For breaking the third rule": "3- For breaking the third rule",
    "For breaking the fourth rule": "4- For breaking the fourth rule",
    "For breaking the fifth rule": "5- For breaking the fifth rule",
    "Something else ": "6- Something else ",
  };

  const { blog, setComment } = props;
  const { user } = useAuth();

  const [data, setData] = useState();
  useEffect(() => {
    fetch(`https://incognito-prime.herokuapp.com/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, [user?.email]);

  const [blogs, setBlogs] = useState();
  useEffect(() => {
    fetch(`https://incognito-prime.herokuapp.com/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  let time = new Date();
  const date = new Date().toLocaleDateString();
  const currentTime = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // react hook form for comment
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = async (commentInfo) => {
    const randomNumber = (((1 + Math.random() + 10000000) * 0x10000) | 0)
      .toString(16)
      .substring(1);
    const payload = {
      _id: randomNumber,
      image: data?.image,
      name: data?.displayName,
      email: data?.email,
      time: currentTime,
      date: date,
      comment: commentInfo.comment,
    };
    reset();
    props.addComment(payload);
  };

  // Related Posts
  const relatedPosts = blogs
    ?.filter((td) => td?.category === blog?.category && td?._id != blog?._id)
    .slice(0, 3);

  // Other Posts
  const otherPosts = blogs
    ?.filter(
      (td) => td?.blogger?._id === blog?.blogger?._id && td?._id != blog?._id
    )
    .slice(0, 3);

  // finding the matched email
  const [isMatched, setIsMatched] = useState(false);
  useEffect(() => {
    // finding the blogger id and the user following list if they match then we will disabled the following btn
    const match = data?.following?.find((followerInfo) => {
      return blog?.blogger?.email === followerInfo?.email;
    });
    if (match?.email) setIsMatched(true);
  }, [blog?.blogger?.email, data?.following]);

  // modal state here
  const [open, setOpen] = useState(false);
  //
  const [isMatchedReport, setIsMatchedReport] = useState(false);
  useEffect(() => {
    // finding the reported user and the match blog
    const match = blog?.reports?.find((report) => {
      return data?.email === report?.reportedBy?.email;
    });
    if (match?.reportReason) setIsMatchedReport(true);
  }, [blog?.reports, data?.email]);
  console.log(isMatchedReport);

  // report reason state here
  const [reportReason, setReportReason] = useState("");
  // report blog handler here
  const handleReport = () => {
    console.log(reportReason);
    if (user?.email) {
      if (!reportReason) {
        alert("You have to select a reason for reporting !");
      } else {
        const payload = {
          reportReason,
          reportedBy: data,
        };
        setIsMatchedReport(true);
        props.addReport(payload);
        setOpen(false);
      }
    } else {
      alert("You have to login first for report !");
    }
  };

  // follow handler here
  const handleFollow = (blogger) => {
    const payload = {
      bloggerId: blogger?._id,
      userId: data?._id,
    };
    console.log(payload);
    if (data) {
      fetch(`https://incognito-prime.herokuapp.com/user`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result?.acknowledged) {
            // dispatch(ADD_TO_FOLLOWING(blogger))
            alert("Started following !");
          } else {
            alert("There is an problem we found !");
          }
        })
        .catch((e) => console.log("Some thing went wrong !"));
      // dispatch(ADD_TO_FOLLOWING(blogger));

      // .finally(dispatch(fetchUserData(user?.email)))
    } else {
      alert("For follow you need to login !");
    }
  };
  return (
    <div>
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-12 gap-6 py-8">
          {/* Main blog details start */}
          <div className="col-span-12 md:col-span-12 lg:col-span-8">
            {blog?.video && <video src={blog?.video} controls></video>}
            {/* Main documentation start */}
            <div
              id="documentation"
              dangerouslySetInnerHTML={{
                __html: `${blog?.documentation}`,
              }}
            ></div>
            {/* Main documentation end */}
            {/* Report Blog start */}
            <div className="flex justify-center pt-8 pb-12">
              {blog?.blogger?.email === user?.email ? (
                <span className="btn rounded-sm border p-2 px-6 font-medium">
                  Reported by {blog?.reports?.length} user
                </span>
              ) : isMatchedReport ? (
                <button
                  style={{
                    border: "1px solid",
                    padding: "8px",
                  }}
                  className="btn hover:text- rounded-md border-8 border-sky-500 p-2 text-gray-500 dark:hover:text-gray-200"
                >
                  i Reported
                </button>
              ) : (
                <button
                  onClick={() => setOpen(true)}
                  style={{
                    border: "1px solid",
                    padding: "8px",
                  }}
                  className="btn hover:text- rounded-md border-8 border-sky-500 p-2 text-gray-500 dark:hover:text-gray-200"
                  disabled={isMatchedReport ? true : false}
                >
                  i{" "}
                  {isMatchedReport ? (
                    "Reported"
                  ) : props.report ? (
                    <BeatLoader />
                  ) : (
                    "Report this blog"
                  )}
                </button>
              )}
            </div>
            {/* Report Blog end */}
            {/* Related post start */}
            <div>
              {relatedPosts && relatedPosts[0] && (
                <h1 className="pb-4 text-2xl font-bold text-Dark dark:text-white">
                  Related Posts
                </h1>
              )}
              {relatedPosts && !relatedPosts[0] && (
                <h1 className="pb-4 text-2xl font-bold text-Dark dark:text-white">
                  No Related Posts are Available
                </h1>
              )}
              <div className="grid grid-cols-12 gap-4 text-Dark dark:text-white">
                {relatedPosts?.map((post) => (
                  <div
                    key={post?._id}
                    className="col-span-12 md:col-span-6 lg:col-span-4"
                  >
                    <div>
                      <img
                        className="h-40 w-full rounded-lg object-cover"
                        src={post?.image}
                        alt="blogImage"
                      />
                    </div>
                    <div>
                      <p className="pt-3 pb-1 font-sans text-sm">
                        {post?.uploadDate} ~ {post?.uploadTime}
                      </p>
                      <Link href={`/blogs/blog/${post?._id}`}>
                        <a>
                          <h4 className="pb-2 text-xl font-semibold hover:underline">
                            {post?.title}
                          </h4>
                        </a>
                      </Link>

                      <div className="flex">
                        <div className="self-center">
                          {" "}
                          <div className="scisco-verified">
                            <img
                              alt="Bloggers image"
                              src={post?.blogger?.image}
                              className="rounded-full w-10 h-10 object-cover dark:border-white border border-black"
                            />
                          </div>
                        </div>
                        <div className="self-center pl-2">
                          <button>
                            <Link href={`/blog/blogger/${post?.blogger?._id}`}>
                              <a className="text-sm underline">
                                {post?.blogger?.displayName}
                              </a>
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Related post end */}
            {/* comments section start from here */}
            <div className="py-8 text-Dark dark:text-white">
              <h2 className="py-6 text-3xl font-bold">
                {blog?.comment?.length === 0 ? (
                  "There is no comments"
                ) : (
                  <span> Total comments - {blog?.comment?.length}</span>
                )}
              </h2>
              {blog?.comment?.map((comment) => (
                <div key={comment?._id}>
                  <div className="my-4 flex flex-col sm:flex-row">
                    <div>
                      <img
                        alt="commenter image"
                        src={
                          comment?.image
                            ? comment?.image
                            : "https://i.ibb.co/DMYmT3x/Generic-Profile.jpg"
                        }
                        className="rounded-full w-10 h-10 object-cover dark:border-white border border-black"
                      />
                    </div>
                    <div className="pl-4">
                      <h1 className="text-2xl font-bold">{comment?.name}</h1>
                      <small className="font-sans">
                        {comment?.time} ~ {comment?.date}
                      </small>
                      <p className="py-4">{comment?.comment}</p>
                      <hr />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {props?.comment && (
              <div>
                <small className=" animate-ping">
                  Loading your comment ...
                </small>
                <BeatLoader color="#36d7b7" />
              </div>
            )}
            {/* submit comments  */}
            <div className="py-3">
              <div className="pb-4 text-white">
                <h2 className="text-3xl font-bold text-Dark dark:text-white">
                  Leave a Comment
                </h2>
                <small className="text-gray-500">
                  Your email address will not be published. You can not change
                  your name and email*
                </small>
              </div>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="grid grid-cols-12 gap-4">
                  <textarea
                    rows="5"
                    className="col-span-12 w-full dark:bg-Dark rounded-lg p-2"
                    placeholder="Write your comment here "
                    {...register("comment", {
                      required: {
                        value: true,
                      },
                    })}
                  />
                </div>
                <button
                  type="submit"
                  className="my-3 rounded-md bg-indigo-700 py-3 px-4 font-bold text-white hover:bg-indigo-600"
                >
                  Post Comment
                </button>
              </form>
            </div>
            {/* comments section end from here */}
          </div>
          {/* Main blog details end */}
          {/* Side bar start */}
          <div className="col-span-12 text-Dark dark:text-white md:col-span-12 lg:col-span-4">
            {/* Bloggers profile start */}
            <div className="pb-3">
              <div>
                <img
                  className="mx-auto border border-white object-cover p-1"
                  src={blog?.blogger?.image}
                  alt="blogger-image"
                />
              </div>
              <button className="w-full">
                <Link href={`/blog/blogger/${blog?.blogger?._id}`}>
                  <a>
                    <h1 className="w-full py-2 text-center font-sans text-4xl font-bold hover:underline">
                      {blog?.blogger?.displayName}
                    </h1>
                  </a>
                </Link>
              </button>
              <p className="text-center">{blog?.blogger?.profession}</p>

              <div className="flex justify-center">
                {/* following btn here  */}
                {isMatched ? (
                  <button className="my-3 cursor-not-allowed rounded-md bg-indigo-700 py-3 px-4 font-bold text-white hover:bg-indigo-600">
                    Followed
                  </button>
                ) : user?.email !== blog?.blogger?.email ? (
                  <button
                    onClick={() => {
                      handleFollow(blog?.blogger);
                      setIsMatched(true);
                    }}
                    className="my-3 rounded-md bg-indigo-700 py-3 px-4 font-bold text-white hover:bg-indigo-600"
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    disabled
                    className="my-3 rounded-md bg-indigo-700 py-3 px-4 font-bold text-white hover:bg-indigo-600"
                  >
                    Followed by {data?.followers?.length}
                  </button>
                )}
              </div>
            </div>
            {/* Bloggers profile end */}
            {/* Other posts start */}
            <div className=" recent-blog mt-10 mb-10 rounded bg-slate-200 p-4 text-center dark:bg-DarkGray">
              {otherPosts && otherPosts[0] && (
                <h4 className="mb-2 font-bold">Other Posts</h4>
              )}
              {otherPosts && !otherPosts[0] && (
                <h4 className="mb-2 font-bold">
                  No Other Bloggers Posts Available!
                </h4>
              )}
              <hr className="bg-white border-slate-300" />
              {otherPosts?.map((otherPost) => (
                <div key={otherPost?._id} className="recent-blog mt-6">
                  <div className=" flex">
                    <img
                      className="h-32 w-32 rounded object-cover"
                      src={otherPost?.image}
                      alt=""
                    />
                    <button onClick={() => dispatch(ADD_TO_BLOG(blog))}>
                      <Link
                        className="self-center"
                        href={`/blog/${otherPost?._id}`}
                      >
                        <a>
                          <div className="px-6 text-left ">
                            <p className="cursor-pointer font-medium hover:underline">
                              {/* {otherPost?.title} */}
                              {otherPost?.title?.length > 55
                                ? otherPost?.title?.slice(0, 55) + "..."
                                : otherPost?.title}
                            </p>

                            <small className="flex pt-2">
                              {otherPost?.uploadDate}
                            </small>
                          </div>
                        </a>
                      </Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Other posts end */}
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
            {/* Tag list start */}
            <div className="mb-10 rounded bg-slate-200 p-6 text-center dark:bg-DarkGray">
              <h4 className="mb-2 font-bold text-lg">Tags</h4>
              <hr className="bg-white border-slate-300" />
              <div
                style={{ minHeight: "150px", maxWidth: "500px" }}
                className="tag-container my-2 flex flex-wrap rounded-lg  py-4 "
              >
                {blog?.tags?.map((tag, index) => {
                  return (
                    <div
                      key={index}
                      className="m-1 h-fit rounded-lg bg-slate-300 p-2  dark:bg-slate-600"
                    >
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Tag list end */}
          </div>
          {/* Side bar end */}
        </div>
        {/* Modal code start */}
        {open && (
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg dark:bg-Dark bg-slate-300 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="dark:bg-lightDark bg-slate-300 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-gray-700 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          className="h-6 w-6 text-red-600 dark:text-lightBlue"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"
                          />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-lg font-medium leading-6"
                          id="modal-title"
                        >
                          Why do you want to report this blog ?{" "}
                        </h3>
                        <div className="mt-2">
                          {Object.keys(reportBlogReasons).map((key) => (
                            <button
                              key={key}
                              value={key}
                              className="my-2 w-full dark:bg-Dark bg-slate-200  px-3 py-2 rounded-md text-left font-semibold"
                              onClick={(e) => setReportReason(e.target.value)}
                            >
                              {key === reportReason && (
                                <span className="pr-2 text-green-600">
                                  CheckIcon
                                </span>
                              )}
                              {reportBlogReasons[key]}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dark:bg-lightDark bg-slate-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={handleReport}
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Report
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Modal code end */}
      </div>
    </div>
  );
};

export default MainDetails;
