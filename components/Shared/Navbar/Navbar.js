import Link from "next/link";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useState, useEffect } from "react";

/* eslint-disable @next/next/no-img-element */
const Navbar = () => {
  // let mobileMenu = document.getElementById("mobile-menu");
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const renderThemeChange = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <MdLightMode
          className="h-7 w-7 mt-2 pt-1"
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <MdDarkMode
          className="h-7 w-7 mt-2 pt-1"
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };
  return (
    <div>
      <div className="absolute z-10 w-full text-white">
        <nav className=" px-4 py-3">
          <div className="flex justify-between items-center container mx-auto">
            <a href="#">
              <img className="h-fit" src="logo2.png" alt="" />
            </a>
            <div className="hidden md:flex gap-2">
              <Link href="/">
                <a className="text-white px-5 py-3 rounded-md hover:bg-white/5">
                  Home
                </a>
              </Link>
              <Link href="/ask">
                <a className="text-white px-5 py-3 rounded-md hover:bg-white/5">
                  Ask
                </a>
              </Link>
              <Link href="/blogs">
                <a className="text-white px-5 py-3 rounded-md hover:bg-white/5">
                  Blog
                </a>
              </Link>
              {/* Dropdown button  */}
              <div className="group relative inline-block">
                <button className="link-item">
                  <a className="text-white px-5 py-3 rounded-md hover:bg-white/5 inline-flex items-center">
                    <span className="mr-1 pr-4">Pages</span>
                    <svg
                      className="h-4 w-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </a>
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
                  <li className="">
                    <Link href="/documentation">
                      <a className="whitespace-no-wrap block bg-gray-200 py-2 px-4 hover:bg-gray-400">
                        Documentation
                      </a>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/helpdesk">
                      <a className="whitespace-no-wrap block rounded-b bg-gray-200 py-2 px-4 hover:bg-gray-400">
                        Help desk
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <Link href="/login">
                <a className="title-btn ml-5 mr-5 rounded-full border-2 border-gray-400 px-4 py-2 text-base font-bold hover:border-white hover:text-white">
                  Login
                </a>
              </Link>
              {renderThemeChange()}
            </div>
            <button
              onClick={() => {
                let mobileMenu = document.getElementById("mobile-menu");
                mobileMenu.classList.toggle("hidden");
              }}
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
          </div>
          <div className="hidden md:hidden" id="mobile-menu">
            <div className="flex flex-col gap-1 py-3">
              <a
                href=""
                className="bg-gray-900 text-white block px-3 py-2 rounded-md font-medium"
              >
                Dashboard
              </a>
              <a
                href=""
                className="hover:bg-white/5 text-white block px-3 py-2 rounded-md font-medium"
              >
                Team
              </a>
              <a
                href=""
                className="hover:bg-white/5 text-white block px-3 py-2 rounded-md font-medium"
              >
                Team
              </a>
              <a
                href=""
                className="hover:bg-white/5 text-white block px-3 py-2 rounded-md font-medium"
              >
                Team
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
