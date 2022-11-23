import React from 'react';

const QDHeroSection = () => {
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
              <div className="relative flex justify-center">
                <div className=" py-8 px-2">
                  <div>
                    <div className="md:flex">
                      <div className=" py-3">
                        <div className="relative flex">
                          <div>
                            <div className="text-center font-bold text-white dark:text-white">
                              <h1 className="font-serif text-4xl">
                                Prime Blog List
                              </h1>
                              <p className="pt-2 font-mono">
                                Keep explore, keep taking knowledge, be happy
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