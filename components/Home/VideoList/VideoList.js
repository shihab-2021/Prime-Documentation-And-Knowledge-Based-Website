/* eslint-disable @next/next/no-img-element */


const VideoList = () => {
    return (
      <div>
        <div className="bg-slate-100  dark:bg-DarkGray">
          <div className="container px-4 mx-auto py-14">
            <div className=" grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-7">
                {/* {!videoList && video && setVideoList(video?.video)}
                {videoList && <video src={videoList} controls></video>} */}
                <video
                  src="https://res.cloudinary.com/dvszolotz/video/upload/v1647677978/Tesla_Giga_Berlin_Situation_CHANGED_Last_Moment_ev2p0g.mp4"
                  title="YouTube video player"
                  controls
                ></video>
              </div>

              <div className="col-span-12 text-Docy-Dark dark:text-white md:col-span-5">
                <h2 className=" -mt-2 pb-2 font-medium ">Prime Video List</h2>
                <ul
                  style={{ height: "330px" }}
                  className="overflow-y-auto bg-slate-300  dark:bg-gray-900"
                >
                  {/* {videos?.map((video) => ( */}
                  <div
                    //   key={video?._id}
                    className="m-2 rounded bg-slate-100 dark:bg-Dark"
                  >
                    {/* <button
                    className="m-0 h-full p-0"
                  
                  > */}
                    <div
                      // onClick={() => handleVideo(video?.video)}
                      className="flex rounded bg-slate-100 dark:bg-Dark"
                    >
                      <img
                        className="h-28 w-28 rounded object-cover"
                        //   src={video?.image}
                        alt=""
                      />
                      <button className="w-full">
                        <div className="px-2 text-left ">
                          <p className="cursor-pointer font-medium hover:underline">
                            {/* {otherPost?.title} */}
                            {/* {video?.title?.length > 40
                                ? video?.title?.slice(0, 40) + "..."
                                : video?.title} */}{" "}
                            title
                          </p>
                          <div className=" flex justify-between  text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              {/* <PersonIcon className=" text-sm" />
                                {video?.blogger?.displayName?.split(" ")[0]} */}
                            </div>
                            <div className="items flex gap-1">
                              {/* <DateRangeIcon className="text-sm" />
                                {video?.uploadDate} */}
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                    {/* </button> */}
                  </div>
                  {/* ))} */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default VideoList;