/* eslint-disable @next/next/no-img-element */

const BlogDetailsHeroSection = (props) => {
  const { blog } = props;
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
            <div className="relative flex ">
              <div className=" py-8 px-2">
                <div className="font-bold text-white dark:text-white">
                  <h1 className="pt-12 font-serif text-4xl">{blog?.title}</h1>
                  <p className="text-red-400 pt-2 font-mono">{blog?.category}</p>
                  <div className="mt-3 pb-8">
                    <p className="self-center">{blog?.uploadDate} -{" "}
                      {blog?.uploadTime}
                    </p>
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

export default BlogDetailsHeroSection;
