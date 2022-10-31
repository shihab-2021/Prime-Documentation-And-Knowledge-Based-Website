/* eslint-disable @next/next/no-img-element */

const HeadSection = () => {
  return (
    <div>
      <div
        style={{
          background: "linear-Gradient( 60deg , #10b3d6 0%, #1d2746 100%)",
          padding: "60px 0 0px",
          position: "relative",
          zIndex: "-1"
        }}
        className="breadcrumb_area overflow-hidden"
      >
        <div className="container px-4 mx-auto">
          <div
            className="custom_container container"
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
                                Hello! here is Prime
                              </h1>
                              <p className="pt-2 font-mono">
                                Shear your blog or documentation with{" "}
                                <span className="font-black">Prime</span>
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
    </div>
  );
};

export default HeadSection;
