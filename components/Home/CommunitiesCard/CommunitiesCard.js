/* eslint-disable @next/next/no-img-element */
import React from "react";
// import Image from "next/image";
import Link from "next/link";
import Image from "next/image";
// import { useDispatch, useSelector } from "react-redux";

const fakeData = [
  {
    icon: "https://wordpress-theme.spider-themes.net/docy-dark/wp-content/uploads/2020/07/icon-4@2x-1.svg",
    title: "Creative",
    info: "3 Posts",
  },
  {
    icon: "https://wordpress-theme.spider-themes.net/docy-dark/wp-content/uploads/2020/07/icon-2@2x-1.svg",
    title: "Inspiration",
    info: "2 Posts",
  },
  {
    icon: "https://wordpress-theme.spider-themes.net/docy-dark/wp-content/uploads/2021/04/icon-8@2x.svg",
    title: "Lifestyle",
    info: "3 Posts",
  },
  {
    icon: "https://wordpress-theme.spider-themes.net/docy-dark/wp-content/uploads/2020/07/icon-1@2x-1.svg",
    title: "News",
    info: "0 Posts",
  },
  {
    icon: "https://wordpress-theme.spider-themes.net/docy-dark/wp-content/uploads/2020/07/icon-5@2x-1.svg",
    title: "Photography",
    info: "9 Posts",
  },
  {
    icon: "https://wordpress-theme.spider-themes.net/docy-dark/wp-content/uploads/2020/07/icon-6@2x-1.svg",
    title: "Skill",
    info: "10 Posts",
  },
  {
    icon: "https://wordpress-theme.spider-themes.net/docy-dark/wp-content/uploads/2020/07/icon-7@2x-1.svg",
    title: "Tourist Tour",
    info: "1 Posts",
  },
  {
    icon: "https://wordpress-theme.spider-themes.net/docy-dark/wp-content/uploads/2019/04/smile@2x.png",
    title: "Trending",
    info: "5 Posts",
  },
  {
    icon: "https://wordpress-theme.spider-themes.net/docy-dark/wp-content/uploads/2021/04/icon-8@2x.svg",
    title: "Education",
    info: "4 Posts",
  },
];

const CommunitiesCard = () => {
  // react redux hook here
//   const dispatch = useDispatch();

  // getting all blogs from redux here
//   const blogs = useSelector((state) => state?.reducers?.blogs?.blogs);

  // const categoryWiseBlogs = blogs.filter(
  //   (td) => td?.category === event.target.value
  // )

  const [showMore, setShowMore] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (showMore) {
      setData(fakeData);
    } else {
      setData(fakeData.slice(0, 6));
    }
  }, [showMore]);

  return (
    <div className="container mx-auto pt-96">
      <div style={{ maxWidth: "1030px" }} className="container mx-auto">
        <div
          style={{ marginTop: "-110px" }}
          className="  rounded-xl bg-slate-100 shadow-lg dark:bg-darkBlue  "
        >
          {/* grid system for the items here  */}
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {data?.map((item) => (
              <div
                key={item.title}
                className=" border-w-1 border-b border-secondary"
              >
                <div className="flex items-center p-8">
                  <img src={item?.icon} width="50px" height="50px" alt="img" />
                  <span className="ml-4">
                    <Link href={`/blog/category/${item?.title}`}>
                      <a>
                        <h6 className="font-bold text-Docy-Dark dark:text-white">
                          {item?.title}
                        </h6>
                      </a>
                    </Link>
                    <p className="text-secondary">
                      {/* {
                        blogs?.filter((td) => td?.category === item?.title)
                          .length
                      }{" "} */}
                      Posts
                    </p>
                  </span>
                </div>
              </div>
            ))}
            {/* buuton here  */}
            <div className="my-4 text-center">
              <button
                className="rounded-md p-1 font-bold text-blue-800 duration-300 focus:ring-2 flex"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? (
                  //   <ArrowCircleUpIcon className="animate-bounce" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-arrow-up-circle animate-bounce"
                    width="29"
                    height="29"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#000000"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="12" r="9" />
                    <line x1="12" y1="8" x2="8" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="16" y1="12" x2="12" y2="8" />
                  </svg>
                ) : (
                  //   <ArrowCircleDownIcon className="animate-bounce" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-arrow-down-circle animate-bounce"
                    width="29"
                    height="29"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#000000"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="12" r="9" />
                    <line x1="8" y1="12" x2="12" y2="16" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="16" y1="12" x2="12" y2="16" />
                  </svg>
                )}{" "}
                More Categories Blogs{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitiesCard;
