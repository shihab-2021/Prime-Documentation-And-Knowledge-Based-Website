/* eslint-disable @next/next/no-img-element */
import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-blue to-teal-400 from-indigo-900 dark:bg-midnight bg-gradient-to-tl dark:to-purple-700 dark:from-midnight">
      <div className="flex">
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
      <div
        style={{ marginTop: "-242px" }}
        className="text-center pb-80 block px-4"
      >
        <h1 className="text-6xl font-bold text-white pb-6	">
          How can we help you
        </h1>
        <p className="text-xl font-bold text-white pb-6">
          {" "}
          Search here to get answers to your questions
        </p>
        <div className="flex justify-center">
          <div className="w-full h-10 rounded">
            {/* <input className='h-10' type="text" /> */}
            <input
              type="search"
              name=""
              id="search"
              className="w-80 rounded-full h-12 text-center bg-white text-black md:w-96 px-5"
              placeholder="Search"
            />
            {/* <button className="h-10 hover:bg-violet-900">aa</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
