/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { AiFillGithub, AiOutlineGoogle } from "react-icons/ai";
import useAuth from "../../hook/useAuth";

const RegisterMain = () => {
  const { loginUser, signInWithGoogle } = useAuth();
  return (
    <div>
      <div
        className=" pt-40 pb-24 container mx-auto px-4 grid grid-cols-1 md:grid-cols-2"
        // className="my-24 container mx-auto px-4 flex justify-center items-center"
      >
        <div className=" mx-auto p-4 flex justify-center items-center ">
          <div>
            <img className="object-cover" src="login.svg" alt="" />
          </div>
        </div>
        <div className=" mt-16 md:mt-0 ">
          <form>
            <div className="w-full drop-shadow-lg  flex items-center justify-center">
              <div className="bg-white dark:bg-darkBlue rounded-lg py-6 px-10 sm:max-w-md w-full ">
                <div className="sm:text-3xl text-2xl font-semibold text-center text-sky-600  mb-12">
                  Register Form
                </div>
                <div className="">
                  <div>
                    <input
                      type="text"
                      name="name"
                      className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 my-8 bg-white dark:bg-darkBlue"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 my-8 bg-white dark:bg-darkBlue"
                      placeholder="Eamil Adress "
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="address"
                      className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 my-8 bg-white dark:bg-darkBlue"
                      placeholder="Adress "
                    />
                  </div>

                  <div className="">
                    <input
                      type="password"
                      name="password"
                      className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8 bg-white dark:bg-darkBlue"
                      placeholder="Password "
                    />
                  </div>

                  <div className="flex justify-center my-6">
                    <button
                      type="submit"
                      className=" rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold "
                    >
                      Register
                    </button>
                  </div>
                  <div className="text-center">
                    <p>or register by using</p>
                    <div className="flex justify-center my-2">
                      <div className="mx-1">
                        <AiOutlineGoogle
                          className=" text-slate-300 hover:text-white text-4xl m-2 cursor-pointer"
                          onClick={() => signInWithGoogle()}
                        />
                      </div>
                      <div className="mx-1">
                        <AiFillGithub className=" text-slate-300 hover:text-white text-4xl m-2 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center ">
                    <p className="text-gray-500">Already have an acount? </p>
                    <Link href="/login">
                      <a
                        href=""
                        className="text-sky-600 hover:text-sky-400 hover:underline pl-2"
                      >
                        Log in
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterMain;
