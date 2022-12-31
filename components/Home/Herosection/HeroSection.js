/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";

const HeroSection = () => {
  const [blogs, setBlogs] = useState();
  const [users, setUsers] = useState();
  const [ques, setQues] = useState();

  useEffect(() => {
    fetch(`https://prime-api-5jzf.onrender.com/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  useEffect(() => {
    fetch(`https://prime-api-5jzf.onrender.com/questions`)
      .then((res) => res.json())
      .then((data) => setQues(data))
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
  return (
    <div className="bg-blue to-teal-400 from-indigo-900 dark:bg-midnight bg-gradient-to-tl dark:from-purple-900 dark:to-gray-900">
      <div className="flex absolute">
        <div className="">
          <img
            src="https://wordpress-theme.spider-themes.net/docy-dark/wp-content/plugins/docy-core/widgets/inc/hero/controls/images/banner_shap4.png"
            alt=""
          />
        </div>
        <div style={{ marginLeft: "-187px" }} className="hidden sm:block">
          <img
            src="https://wordpress-theme.spider-themes.net/docy-dark/wp-content/plugins/docy-core/widgets/inc/hero/controls/images/banner_shap1.png"
            alt=""
          />
        </div>
      </div>
      <div className=" container mx-auto flex md:flex-row flex-col py-40 px-4 items-center">
        <div
          style={{ zIndex: "1" }}
          className=" md:w-1/2 text-center md:text-left mb-10 md:mb-0"
        >
          <div>
            <p style={{ fontFamily: "Lobster" }} className="text-lg text-white">
              Grow up with us
            </p>
            <h1 className="text-6xl hero-title font-bold text-white	">
              Keep explore, keep taking
            </h1>
            <h1 className="text-6xl hero-title font-bold text-white pb-2	">
              knowledge, be happy
            </h1>
            <p className="text-md font-sans  text-gray-300 pb-6 md:w-4/5">
              For fans of blogs and documentation, this website will be a
              significant and engaging resource. And also the extra features
              will be very helpful for all stages of people. People from any
              stage can use this platform with proper benefits.
            </p>
          </div>
          <div className="flex justify-center md:justify-start">
            <Link href="/blogs">
              <a className=" bg-rose-500 hover:border-rose-400 p-3 self-center text-white rounded-xl font-bold text-xl mr-5">
                Explore Blogs
              </a>
            </Link>
            <Link href="/ask">
              <a className=" border-2 flex items-center p-3 self-center text-white text-xl rounded-xl font-bold">
                <span className="mr-2">See Ask </span>
                <BsArrowRight className="text-xl" />
              </a>
            </Link>
          </div>
          <div className=" pt-10 flex text-center font-sans md:justify-start justify-center items-center">
            <div className="pr-6 flex flex-col justify-center">
              <p className="text-3xl font-bold text-white">{blogs?.length}</p>
              <p className="text-gray-300">Blogs</p>
            </div>
            <div className="px-6 flex flex-col justify-center border-x-2">
              <p className="text-3xl font-bold text-white">{users?.length}</p>
              <p className="text-gray-300">Questions</p>
            </div>
            <div className="pl-6 flex flex-col justify-center">
              <p className="text-3xl font-bold text-white">{ques?.length}</p>
              <p className="text-gray-300">Users</p>
            </div>
          </div>
        </div>
        <div className=" md:w-1/2">
          <img
            className=" object-cover animate-pulse"
            src="https://i.ibb.co/bXR40Ss/image-removebg-2.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
