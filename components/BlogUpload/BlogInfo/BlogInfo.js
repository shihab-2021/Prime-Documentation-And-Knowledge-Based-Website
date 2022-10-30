/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { BiVideoPlus } from "react-icons/bi";

const BlogInfo = () => {
  const [videoLoading, setVideoLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [blogData, setBlogData] = useState({});

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const videoFileDrop = async (e) => {
    console.log("videoFileDrop");
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ml_default");
    setVideoLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvszolotz/video/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    setVideo(file.secure_url);
    // props.videoLink(file.secure_url);
    console.log(video);
    setVideoLoading(false);
  };
  const uploadVideo = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ml_default");
    setVideoLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvszolotz/video/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(file);
    setVideo(file.secure_url);
    // props.videoLink(file.secure_url);
    console.log(video);
    setVideoLoading(false);
  };

  return (
    <div>
      <div className="container px-4 mx-auto">
        <div className="mt-5 rounded-t-md px-6 bg-DarkGray">
          <div className="py-10">
            <div className="grid grid-cols-12 gap-6 pb-6">
              {/* Blog Title Input */}
              <div className="col-span-12 md:col-span-6">
                <div>
                  <label htmlFor="title">Title</label>
                  <input
                    required
                    placeholder="Please enter your blog or documentation title"
                    className="h-14 w-full rounded-md border-2 p-3 text-lg"
                    type="text"
                  />
                </div>
              </div>
              {/* Category Selection Handing */}
              <div className="col-span-12 md:col-span-6">
                <label htmlFor="category">Category</label>
                <select className="h-14 w-full cursor-pointer rounded-lg border-2 p-3 text-lg">
                  <option className="hidden">Select Category</option>
                  <option>Creative</option>
                  <option>Inspiration</option>
                  <option>Lifestyle</option>
                  <option>News</option>
                  <option>Photography</option>
                  <option>Skill</option>
                  <option>Tourist Tours</option>
                  <option>Trending</option>
                  <option>Education</option>
                </select>
              </div>
            </div>
            {/* video and image upload section */}
            <div className="grid grid-cols-12 gap-6">
              {/* video upload handling */}
              <div className="col-span-12 md:col-span-6">
                <div className="rounded-lg border-2 border-dotted border-gray-400 p-3 text-center">
                  <label>
                    <div
                      onDragOver={dragOver}
                      onDragEnter={dragEnter}
                      onDragLeave={dragLeave}
                      onDrop={videoFileDrop}
                    >
                      <div className="">
                        {videoLoading && (
                          <div>
                            <img
                              className="mx-auto animate-ping"
                              style={{ height: "70px", width: "70px" }}
                              src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                              alt=""
                            />
                            <p className="text-xl text-gray-400">Loading ...</p>
                          </div>
                        )}
                        {!videoLoading && (
                          <div>
                            <img
                              className="mx-auto animate-pulse"
                              style={{ height: "70px", width: "70px" }}
                              src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                              alt=""
                            />
                            <p className="text-xl text-gray-400">
                              Drag & Drop your video content
                            </p>
                          </div>
                        )}
                        <p className="py-4">
                          <span className="rounded-lg bg-gray-400 px-3 py-3 font-semibold">
                            {/* <BiVideoPlus className="animate-bounce" /> */}
                            Upload Video
                          </span>
                        </p>
                      </div>
                    </div>
                    <input
                      className="hidden"
                      type="file"
                      name="video"
                      placeholder="upload"
                      onChange={uploadVideo}
                    />
                  </label>
                </div>
                <small className="text-gray-500">
                  Do you want to share a video documentation?(Not required*)
                </small>
                <div>
                  <div className="pt-4">
                    <div>
                      {video && (
                        <video
                          className="mx-auto"
                          style={{ maxWidth: "100%" }}
                          src={video}
                          controls
                        ></video>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogInfo;
