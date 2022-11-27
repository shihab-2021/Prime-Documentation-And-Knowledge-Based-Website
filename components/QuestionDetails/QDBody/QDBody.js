/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP, FaTwitter } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import useAuth from "../../../hook/useAuth";
import TextEditor from "../../Shared/TextEditor/TextEditor";

const QDBody = (props) => {
  const { user } = useAuth();
  const { question, submitAnswer, answered } = props;
  const [value, setValue] = useState("");
  const [userData, setUserData] = useState();
  const [questions, setQuestions] = useState();
  const val = false;

  useEffect(() => {
    fetch(`https://incognito-prime.herokuapp.com/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, [userData, user?.email]);

  useEffect(() => {
    fetch(`https://incognito-prime.herokuapp.com/questions`)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  questions?.reverse();

  // Related Posts
  const relatedPosts = questions
    ?.filter(
      (td) => td?.category === question?.category && td?._id != question?._id
    )
    .slice(0, 3);

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

  const submitHandler = async (data) => {
    const randomNumber = (((1 + Math.random() + 10000000) * 0x10000) | 0)
      .toString(16)
      .substring(1);
    const payload = {
      _id: randomNumber,
      image: userData?.image,
      name: userData?.displayName,
      email: userData?.email,
      time: currentTime,
      date: date,
      answers: value,
    };
    console.log(payload);
    submitAnswer(payload);
    reset();
    setValue("");
  };

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-6 py-8">
          {/* Main answer details start */}
          <div className="col-span-12 md:col-span-12 lg:col-span-8">
            {/* Main documentation start */}
            <div
              id="documentation"
              dangerouslySetInnerHTML={{
                __html: `${question?.documentation}`,
              }}
            ></div>
            {/* Main documentation end */}
            {/* Blogger info start */}
            <div className="pb-5">
              <div className="flex flex-row-reverse">
                <div className="self-center pl-2">
                  <p>
                    <small className="text-sm text-Docy-Dark dark:text-white">
                      {question?.blogger?.displayName}
                    </small>
                  </p>
                  <p>
                    <small className="font-sans text-sm text-Docy-Dark dark:text-white">
                      {question?.uploadDate} - {question?.uploadTime}
                    </small>
                  </p>
                </div>
                <div className="self-center">
                  <div className="scisco-verified">
                    <img
                      alt="Bloggers image"
                      src={question?.blogger?.image}
                      className="rounded-full mr-1.5 w-10 h-10 object-cover dark:border-white border border-black"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Blogger info end */}
            {/* answers section start */}
            <div className="py-8">
              <h2 className="py-6 text-3xl font-bold">
                {question?.answers?.length === 0 ? (
                  "There is no answer"
                ) : (
                  <span>{question?.answers?.length} - answers</span>
                )}
              </h2>
              {question?.answers?.map((answer) => (
                <div key={answer?._id}>
                  <div>
                    <hr className="bg-white border-slate-300" />
                    <div className="pt-4">
                      <div
                        id="documentation"
                        dangerouslySetInnerHTML={{
                          __html: `${answer?.answers}`,
                        }}
                      ></div>
                    </div>
                    <div className="pb-10 pt-1">
                      <div className="flex flex-row-reverse">
                        <div className="self-center pl-2">
                          <p>
                            <small className="text-sm">{answer?.name}</small>
                          </p>
                          <p>
                            <small className="font-sans text-sm">
                              {answer?.date} - {answer?.time}
                            </small>
                          </p>
                        </div>
                        <div className="self-center">
                          <div className="scisco-verified">
                            <img
                              alt="Bloggers image"
                              src={question?.blogger?.image}
                              className="rounded-full mr-1.5 w-10 h-10 object-cover dark:border-white border border-black"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div>
                {!answered && (
                  <div>
                    <small className=" animate-ping">
                      Loading your answered ...
                    </small>
                    <BeatLoader color="#36d7b7" />
                  </div>
                )}
              </div>
            </div>
            {/* answers section start */}
            {/* submit answers start */}
            <div className="py-3">
              <div className="pb-4 ">
                <h2 className="text-3xl font-bold">Your Answer</h2>
              </div>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="bg-white text-black">
                  <TextEditor setValue={setValue}></TextEditor>
                </div>
                <button
                  type="submit"
                  className="my-3 rounded-md bg-indigo-700 py-3 px-4 font-bold text-white hover:bg-indigo-600"
                >
                  Post Your Answer
                </button>
              </form>
            </div>
            {/* submit answers end */}
          </div>
          {/* Main answer details end */}
          {/* side bar start */}
          <div className="col-span-12 md:col-span-12 lg:col-span-4">
            {/* Related question start */}
            <div className=" recent-blog mb-10 rounded bg-slate-200 p-4 text-center dark:bg-DarkGray">
              <h4 className="mb-2 font-bold text-lg">Related Question</h4>
              <hr className="bg-white border-slate-300" />
              {relatedPosts?.length === 0 && (
                <p className="pt-3 font-semibold">
                  There is no related question.
                </p>
              )}
              {relatedPosts?.map((relatedPost) => (
                <div key={relatedPost._id} className="recent-blog mt-6">
                  <div className=" flex">
                    <button>
                      <Link
                        className="self-center"
                        href={`/question/${relatedPost?._id}`}
                      >
                        <a>
                          <div className="px-6 text-left ">
                            <p className="cursor-pointer font-medium hover:underline">
                              {relatedPost?.title.length > 55
                                ? relatedPost?.title.slice(0, 55) + "..."
                                : relatedPost?.title}
                            </p>

                            <small className="flex pt-2">
                              {relatedPost.uploadDate}
                            </small>
                          </div>
                        </a>
                      </Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Related question end */}
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
                {question?.tags?.map((tag, index) => {
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
          {/* side bar end */}
        </div>
      </div>
    </div>
  );
};

export default QDBody;
