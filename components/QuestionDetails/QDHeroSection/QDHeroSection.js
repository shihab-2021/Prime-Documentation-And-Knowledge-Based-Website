import Link from 'next/link';
import React from 'react';

const QDHeroSection = (props) => {
    return (
      <div>
        {/* Banner section  */}
        <div
          style={{
            //   background: "linearGradient( 60deg , #10b3d6 0%, #1d2746 100%)",
            padding: "60px 0 0px",
            position: "relative",
          }}
          className="breadcrumb_area overflow-hidden bg-blue to-teal-400 from-indigo-900 dark:bg-midnight bg-gradient-to-tl dark:to-purple-700 dark:from-midnight"
        >
          <div
            className="container mx-auto px-4"
            style={{
              width: "100%",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            <form action="#" className="">
              <div className="relative">
                <div className=" py-8 px-2">
                  <div>
                    <div className="">
                      <div className=" py-3">
                        <div className="relative flex">
                          <div className="w-full self-center">
                            <div className="flex w-full justify-between">
                              <p className="font-mono text-red-500 font-bold">
                                {props?.question?.category}
                              </p>
                              <div className="mb-1 self-center">
                                <Link href="/askQuestion">
                                  <a>
                                    <span className="text-1xl rounded-lg bg-orange-500 px-3 py-3  font-semibold text-Docy-Dark dark:text-white">
                                      Ask Question{" "}
                                      <span className="">
                                        {/* <HelpOutlineIcon className="animate-pulse" /> */}
                                      </span>
                                    </span>
                                  </a>
                                </Link>
                              </div>
                            </div>
                            <h1 className="pt-2 font-serif text-4xl">
                              {props?.question?.title}
                            </h1>
                            <div className="mt-3 flex">
                              <p className="self-center pb-8">
                                {props?.question?.uploadDate} |{" "}
                                {props?.question?.uploadTime}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default QDHeroSection;