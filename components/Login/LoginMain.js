/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiFillGithub, AiOutlineGoogle } from "react-icons/ai";
import useAuth from "../../hook/useAuth";

const LoginMain = () => {
  // nextjs hook for routing
  const router = useRouter();

  const { logIn, signInWithGoogle } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((result) => {
        const user = result.user;
        alert("Logged in successful.");
        form.reset();
      })
      .catch((err) => {
        console.error(err);
        alert("error please try again");
        form.reset();
      });
  };
  return (
    <div>
      <div className="pt-40 pb-24  container mx-auto px-4 grid grid-cols-1 md:grid-cols-2">
        <div className=" mx-auto p-4 flex justify-center items-center ">
          <div>
            <img className="object-cover" src="login.svg" alt="" />
          </div>
        </div>
        <div className=" mt-16 md:mt-0 ">
          <form onSubmit={handleSubmit}>
            <div className="w-full drop-shadow-lg  flex items-center justify-center">
              <div className=" bg-slate-200 dark:bg-darkBlue rounded-lg py-6 px-10 sm:max-w-md w-full ">
                <div className="sm:text-3xl text-2xl font-semibold text-center text-sky-600  mb-12">
                  Login Form
                </div>
                <div className="">
                  <div>
                    <input
                      type="email"
                      name="email"
                      className="focus:outline-none bg-slate-200 dark:bg-darkBlue border-b w-full pb-2 border-sky-400 placeholder-gray-500 my-8"
                      placeholder="Eamil Adress "
                    />
                  </div>

                  <div className="">
                    <input
                      type="password"
                      name="password"
                      className="focus:outline-none bg-slate-200 dark:bg-darkBlue border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8"
                      placeholder="Password "
                    />
                  </div>

                  <div className="flex justify-center my-6">
                    <button
                      type="submit"
                      className=" rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold "
                    >
                      Login
                    </button>
                  </div>
                  <div className="text-center">
                    <p>or login with</p>
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
                    <p className="text-gray-500">Already an acount? </p>
                    <Link href="/register">
                      <a className="text-sky-600 hover:text-sky-400 hover:underline pl-2">
                        {" "}
                        Register
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

export default LoginMain;
