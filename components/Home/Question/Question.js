/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../../Shared/Loading/Loading";

const Question = () => {
  const [questions, setQuestions] = useState();

  useEffect(() => {
    fetch(`https://incognito-prime.herokuapp.com/questions`)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  questions?.reverse();
  const recentQuestion = questions?.slice(0, 4);
  return (
    <div>
      <div className="container px-4 mx-auto py-10">
        <div className="flex flex-col justify-center md:flex-row md:justify-between">
          <h1
            style={{
              lineHeight: "66px",
            }}
            className="mb-4 text-center text-5xl font-bold text-Dark dark:text-white"
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
        <div className="mt-4">
          {!recentQuestion && (
            <div className="py-10 my-10">
              <Loading></Loading>
            </div>
          )}
          <div className="grid grid-cols-12 gap-4">
            {recentQuestion?.map((question) => (
              <div
                key={question._id}
                className=" col-span-12 lg:col-span-6"
              >
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
                              {question?.uploadDate} - {question?.uploadTime}
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
        </div>
        <div className="mt-12 flex justify-center">
          <Link href="/ask">
            <a>
              <button
                type="submit"
                className=" rounded-full p-3 w-full sm:w-56 bg-gradient-to-r hover:from-teal-200 hover:to-sky-900 from-sky-900  to-teal-200 text-white text-lg font-semibold "
              >
                See All
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Question;
