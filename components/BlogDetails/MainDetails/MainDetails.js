/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import useAuth from "../../../hook/useAuth";

const MainDetails = (props) => {
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
    props.addComment(payload)
    // if (user?.email) {
    //   fetch(`https://incognito-prime.herokuapp.com/blog/${blog?._id}`, {
    //     method: "PUT",
    //     headers: { "content-type": "application/json" },
    //     body: JSON.stringify(payload),
    //   })
    //     .then((res) => res.json())
    //     .then((result) => {})
    //     .catch((e) => console.log("Something went wrong !"));
    //   () => setComment(payload)
    // } else {
    //   return alert("Go and login to comment !");
    // }
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
  const [isMatched, setIsMatched] = useState();
  useEffect(() => {
    // finding the blogger id and the user following list if they match then we will disabled the following btn
    const match = data?.following?.find((followerInfo) => {
      return blog?.blogger?.email === followerInfo?.email;
    });
    setIsMatched(match);
  }, [blog?.blogger?.email, data?.following]);
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
            <button className="bg-white text-black">report blog </button>
            {/* <div className="flex justify-center pt-8 pb-12">
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
                    <FlagIcon /> Reported
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
                    <FlagIcon />{" "}
                    {isMatchedReport ? "Reported" : "Report this blog"}
                  </button>
                )}
              </div> */}
            {/* Report Blog end */}
            {/* Related post start */}
            <div>
              <h1 className="pb-4 text-2xl font-bold text-Dark dark:text-white">
                Related Post
              </h1>
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
                    Following
                  </button>
                ) : user?.email !== blog?.blogger?.email ? (
                  <button
                    onClick={() => handleFollow(blog.blogger)}
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
          </div>
          {/* Side bar end */}
        </div>
      </div>
    </div>
  );
};

export default MainDetails;
