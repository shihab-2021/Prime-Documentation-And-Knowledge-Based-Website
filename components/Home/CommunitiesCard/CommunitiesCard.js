/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";

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
    title: "Tourist Tours",
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
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("https://prime-api-5jzf.onrender.com/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

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
    <div className="container px-4 mx-auto">
      <div style={{ maxWidth: "1030px" }} className="container px-4 mx-auto">
        <div
          style={{ marginTop: "-115px" }}
          className=" bshadow rounded-xl bg-slate-200 shadow-lg dark:bg-darkBlue"
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
                    <Link href={`/blogs/category/${item?.title}`}>
                      <a>
                        <h6 className="font-bold text-Docy-Dark dark:text-white">
                          {item?.title}
                        </h6>
                      </a>
                    </Link>
                    <p className="text-secondary">
                      {
                        blogs?.filter((td) => td?.category === item?.title)
                          .length
                      }{" "}
                      Posts
                    </p>
                  </span>
                </div>
              </div>
            ))}
            {/* button here  */}
            <div className="my-4 text-center">
              <button
                className="rounded-md p-1 font-bold text-blue-800 duration-300 focus:ring-2 flex justify-center items-center px-8"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? (
                  <BsArrowUpCircle className="animate-bounce mr-1" />
                ) : (
                  <BsArrowDownCircle className="animate-bounce mr-1" />
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
