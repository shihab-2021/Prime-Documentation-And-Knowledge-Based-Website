/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

const VideoList = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("https://incognito-prime.herokuapp.com/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);
  let allBlogs = blogs;
  allBlogs?.sort(
    (firstItem, secondItem) =>
      firstItem?.comment?.length - secondItem?.comment?.length
  );
  allBlogs?.reverse();
  console.log(allBlogs);
  const videos = allBlogs?.filter((td) => td?.video !== "");
  const video = allBlogs?.find((td) => td?.video !== "");
  console.log(video?.video);

  //here default video
  const [videoList, setVideoList] = useState(video);
  console.log(videoList);

  const handleVideo = (e) => {
    setVideoList(e);
  };
  return (
    <div>
      {/* bg-slate-100 mt-10 dark:bg-gray-800 */}
      <div className=" to-indigo-100 from-slate-300 bg-gradient-to-tl mt-14 dark:from-gray-900 dark:to-black">
        <div className="container px-4 mx-auto py-32">
          <div className=" grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-7">
              {!videoList && video && setVideoList(video)}
              {videoList && <video src={videoList?.video} controls></video>}
              <h1 className="text-xl mt-1">{videoList?.title}</h1>
            </div>

            <div className="col-span-12 md:col-span-5">
              <h2 className=" -mt-2 pb-2 font-medium text-xl">Prime Video List</h2>
              <ul
                style={{ height: "350px" }}
                className="overflow-y-auto bg-slate-400 rounded dark:bg-gray-900"
              >
                {videos?.map((video) => (
                  <div
                    key={video?._id}
                    className="m-2 rounded bg-slate-200 dark:bg-Dark"
                  >
                    {/* <button
                    className="m-0 h-full p-0"
                  
                  > */}
                    <div
                      onClick={() => handleVideo(video)}
                      className="flex rounded bg-slate-200 dark:bg-Dark"
                    >
                      <img
                        className="h-28 w-28 rounded object-cover"
                        src={video?.image}
                        alt=""
                      />
                      <button className="w-full">
                        <div className="px-2 text-left ">
                          <p className="cursor-pointer font-medium hover:underline">
                            {/* {otherPost?.title} */}
                            {video?.title?.length > 40
                              ? video?.title?.slice(0, 40) + "..."
                              : video?.title}{" "}
                            title
                          </p>
                          <div className=" flex justify-between  text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              {/* <PersonIcon className=" text-sm" /> */}
                              {video?.blogger?.displayName?.split(" ")[0]}
                            </div>
                            <div className="items flex gap-1">
                              {/* <DateRangeIcon className="text-sm" /> */}
                              {video?.uploadDate}
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                    {/* </button> */}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoList;
