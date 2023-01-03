/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useState, useEffect } from "react";
import useAuth from "../../../hook/useAuth";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [data, setData] = useState();
  useEffect(() => {
    fetch(`https://prime-api-5jzf.onrender.com/users-data/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, [user?.email, router.pathname]);
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // for theme changing
  const renderThemeChange = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <MdLightMode
          className="h-7 w-7"
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <MdDarkMode
          className="h-7 w-7"
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };

  // for sticky navbar
  useEffect(() => {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
        document.getElementById("navbar").style.b = "0";
      } else {
        document.getElementById("navbar").style.top = "-70px";
      }
      prevScrollpos = currentScrollPos;
    };
  }, []);

  const [navOpen, setNavOpen] = useState(false);

  /* Open the sidenav */
  function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    setNavOpen(true);
    document.body.classList.add("stop-scrolling");
  }

  /* Close/hide the sidenav */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    setNavOpen(false);
    document.body.classList.remove("stop-scrolling");
  }

  return (
    <div id="navbar" className="z-10 fixed w-full">
      <div className="w-full text-white">
        <nav className=" px-4 py-3">
          <div className="flex justify-between items-center container px-4 mx-auto">
            <Link href="/">
              <a>
                <img
                  className="h-fit w-44"
                  src="https://i.ibb.co/W34T3Rq/image.png"
                  alt=""
                />
              </a>
            </Link>
            <div className="hidden md:flex gap-2">
              <Link href="/">
                <a className="text-black font-medium text-lg font-serif dark:text-white px-5 py-3 rounded-md hover:bg-white/5">
                  Home
                </a>
              </Link>
              <Link href="/ask">
                <a className="text-black font-medium text-lg font-serif dark:text-white px-5 py-3 rounded-md hover:bg-white/5">
                  Ask
                </a>
              </Link>
              <Link href="/blogs">
                <a className="text-black font-medium text-lg font-serif dark:text-white px-5 py-3 rounded-md hover:bg-white/5">
                  Blog
                </a>
              </Link>
              {/* Dropdown button  */}
              <div className="group relative inline-block">
                <button className="link-item">
                  <p className="text-black font-medium text-lg font-serif dark:text-white px-5 py-3 rounded-md hover:bg-white/5 inline-flex items-center">
                    <span className="mr-1 pr-4">Pages</span>
                    <svg
                      className="h-4 w-4 fill-current animate-bounce"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </p>
                </button>
                <ul className="absolute hidden pt-1 text-gray-700 group-hover:block">
                  <li className="">
                    <Link href="/about">
                      <a className="whitespace-no-wrap block rounded-t bg-gray-200 py-2 px-4 hover:bg-gray-400">
                        About
                      </a>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/contact">
                      <a className="whitespace-no-wrap block bg-gray-200 py-2 px-4 hover:bg-gray-400">
                        Contact
                      </a>
                    </Link>
                  </li>
                  {data?.role === "admin" && (
                    <li className="">
                      <Link href="/dashboard">
                        <a className="whitespace-no-wrap block bg-gray-200 py-2 px-4 hover:bg-gray-400">
                          Dashboard
                        </a>
                      </Link>
                    </li>
                  )}
                  <li className="">
                    <Link href="/blogUpload">
                      <a className="whitespace-no-wrap block rounded-b bg-gray-200 py-2 px-4 hover:bg-gray-400">
                        Upload blog
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              {user?.email ? (
                <div className="group relative inline-block">
                  <button className="link-item">
                    <a className="text-black font-medium text-lg font-serif dark:text-white px-5 py-3 rounded-md hover:bg-white/5 inline-flex items-center">
                      <span className="mr-1 pr-4">
                        <img
                          style={{ height: "40px", width: "40px" }}
                          className="link-item inline-flex items-center rounded-full object-cover"
                          src={
                            data?.image
                              ? data?.image
                              : `https://i.ibb.co/DMYmT3x/Generic-Profile.jpg`
                          }
                          alt=""
                        />
                      </span>
                      <span className="h-4 w-1 fill-current"></span>
                    </a>
                  </button>
                  <ul className="absolute hidden pt-1 text-gray-700 group-hover:block">
                    <li className="">
                      <Link href={`/blogs/blogger/${data?._id}`}>
                        <a className="whitespace-no-wrap block rounded-t bg-gray-200 py-2 px-4 hover:bg-gray-400">
                          My Profile
                        </a>
                      </Link>
                    </li>
                    <li className="">
                      <p
                        onClick={() => logout()}
                        className="whitespace-no-wrap block rounded-b bg-gray-200 py-2 px-4 hover:bg-gray-400 cursor-pointer"
                      >
                        Logout
                      </p>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className=" flex justify-center items-center ">
                  <Link href="/login">
                    <a className="title-btn ml-5 mr-5 rounded-full border-2 dark:border-gray-400 border-gray-700 font-serif self-center px-4 py-2 text-base font-bold dark:hover:border-white dark:hover:text-white text-black dark:text-white hover:text-black hover:border-black">
                      Login
                    </a>
                  </Link>
                </div>
              )}
              <div className=" text-black dark:text-white flex justify-center items-center">
                {renderThemeChange()}
              </div>
            </div>
            {/* for mobile version  */}
            {!navOpen && (
              <button
                id="openBtn"
                onClick={openNav}
                data-mobile-menu
                className="text-gray-400 py-3 px-2 hover:text-gray-200 block md:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-menu-2"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              </button>
            )}
          </div>
          <div id="mySidenav" className="sidenav md:hidden">
            {navOpen && (
              <button
                id="closeBtn"
                className="closebtn text-gray-400 py-3 px-2 hover:text-gray-200 block md:hidden"
                onClick={closeNav}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-x"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
            <Link href="/">
              <a
                onClick={closeNav}
                className="text-black font-medium text-lg font-serif dark:text-white px-5 py-3 rounded-md hover:bg-white/5"
              >
                Home
              </a>
            </Link>
            <Link href="/blogs">
              <a
                onClick={closeNav}
                className="text-black font-medium text-lg font-serif dark:text-white px-5 py-3 rounded-md hover:bg-white/5"
              >
                Blogs
              </a>
            </Link>
            <Link href="/ask">
              <a
                onClick={closeNav}
                className="text-black font-medium text-lg font-serif dark:text-white px-5 py-3 rounded-md hover:bg-white/5"
              >
                Ask
              </a>
            </Link>
            <Link href="/about">
              <a
                onClick={closeNav}
                className="text-black font-medium text-lg font-serif dark:text-white px-5 py-3 rounded-md hover:bg-white/5"
              >
                About
              </a>
            </Link>
            <Link href="/contact">
              <a
                onClick={closeNav}
                className="text-black font-medium text-lg font-serif dark:text-white px-5 py-3 rounded-md hover:bg-white/5"
              >
                Contact
              </a>
            </Link>
            {data?.role === "admin" && (
              <Link href="/dashboard">
                <a
                  onClick={closeNav}
                  className="whitespace-no-wrap block bg-gray-200 py-2 px-4 hover:bg-gray-400"
                >
                  Dashboard
                </a>
              </Link>
            )}
            <Link href="/blogUpload">
              <a
                onClick={closeNav}
                className="text-black font-medium text-lg font-serif dark:text-white px-5 py-3 rounded-md hover:bg-white/5"
              >
                Upload Blog
              </a>
            </Link>
            {user?.email ? (
              <div className="group relative inline-block">
                <Link href={`/blogs/blogger/${data?._id}`}>
                  <a
                    onClick={closeNav}
                    className="text-black font-medium text-lg font-serif dark:text-white px-5 py-3 rounded-md hover:bg-white/5"
                  >
                    <img
                      style={{ height: "40px", width: "40px" }}
                      className="link-item inline-flex items-center rounded-full object-cover"
                      src={
                        data?.image
                          ? data?.image
                          : `https://i.ibb.co/DMYmT3x/Generic-Profile.jpg`
                      }
                      alt=""
                    />{" "}
                    My Profile
                  </a>
                </Link>
                <a
                  onClick={() => {
                    logout();
                    closeNav();
                  }}
                  className="text-black font-medium text-lg font-serif dark:text-white px-5 py-3 rounded-md hover:bg-white/5"
                >
                  Logout
                </a>
              </div>
            ) : (
              <Link href="/login">
                <a
                  onClick={closeNav}
                  className="text-black font-medium text-lg font-serif dark:text-white px-5 py-3 rounded-md hover:bg-white/5"
                >
                  Login
                </a>
              </Link>
            )}
            <div className="text-white flex px-7 py-3 justify-left  items-center">
              {renderThemeChange()}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
