/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { BiVideoPlus } from "react-icons/bi";
import dynamic from "next/dynamic";
import Tags from "../../Shared/Tags/Tags";
import useAuth from "../../../hook/useAuth";
const TextEditor = dynamic(
  () => import("../../Shared/TextEditor/TextEditor.js"),
  {
    ssr: false,
  }
);

const BlogInfo = (props) => {
  const [title, setTitle] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const { user } = useAuth();
  const [videoLoading, setVideoLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [blogData, setBlogData] = useState({});
  const [value, setValue] = useState("");
  const [tags, setTags] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`https://incognito-prime.herokuapp.com/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, [data, user?.email]);

  const blogTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChange = (event) => {
    setCategoryName(event.target.value);
    // props.category(event.target.value);
    // console.log(event.target.value);
  };

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

  const imageFileDrop = async (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ml_default");
    setImageLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvszolotz/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    const field = "thumbnail";
    const value = file.secure_url;
    const newBlogData = { ...blogData };
    newBlogData[field] = value;
    setBlogData(newBlogData);

    setImage(file.secure_url);
    // setImage(files[0])
    // props.imgLink(file.secure_url);
    setImageLoading(false);
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ml_default");
    setImageLoading(true);
    console.log(e.target.files);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvszolotz/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    // console.log(file.public_id);
    const field = e.target.name;
    const value = file.secure_url;
    const newBlogData = { ...blogData };
    newBlogData[field] = value;
    setBlogData(newBlogData);
    console.log(blogData);

    console.log("something");
    setImage(file.secure_url);
    // setImage(files[0])
    // props.imgLink(file.secure_url);
    setImageLoading(false);
  };

  const allTags = (e) => {
    setTags(e);
    // console.log(...e);
    // console.log(tags);
  };

  let time = new Date();
  const date = new Date().toLocaleDateString();
  const currentTime = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const handleUpload = () => {
    if (!title || !image || !categoryName || !value || !tags) {
      alert(
        "Title, Thumbnail image, Category selection, Documentation or description writing, Tags giving are required. If any of those missing you can not submit you blog or documentation. Please enter the date if anyone is missing. Thank you."
      );
      return;
    }
    const uploadData = {
      title: title,
      image: image,
      video: video,
      category: categoryName,
      documentation: value,
      tags: tags,
      uploadTime: currentTime,
      uploadDate: date,
      blogger: data,
      comment: [],
      reports: [],
    };
    props.uploadBlog(uploadData);
  };

  return (
    <div>
      <div className="container px-6 mx-auto my-8">
        <div className="mt-5 rounded-md px-8 bg-slate-100 dark:bg-DarkGray">
          <div className="py-10">
            <div className="grid grid-cols-12 gap-6 pb-6">
              {/* Blog Title Input */}
              <div className="col-span-12 md:col-span-6">
                <div>
                  <label htmlFor="title">Title</label>
                  <input
                    onBlur={blogTitle}
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
                <select
                  value={categoryName}
                  onChange={handleChange}
                  className="h-14 w-full cursor-pointer rounded-lg border-2 p-3 text-lg"
                >
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
              {/* Thumbnail Upload Handling  */}
              <div className="col-span-12 md:col-span-6">
                <div className="rounded-lg border-2 border-dotted border-gray-400 p-3 text-center">
                  <label>
                    <div
                      // className="mt-12 text-center"
                      onDragOver={dragOver}
                      onDragEnter={dragEnter}
                      onDragLeave={dragLeave}
                      onDrop={imageFileDrop}
                    >
                      <div className="">
                        {imageLoading && (
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
                        {!imageLoading && (
                          <div>
                            <img
                              className="mx-auto animate-pulse"
                              style={{ height: "70px", width: "70px" }}
                              src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                              alt=""
                            />
                            <p className="text-xl text-gray-400">
                              Drag & Drop your thumbnail image
                            </p>
                          </div>
                        )}
                        <p className="py-4">
                          <span className="rounded-lg bg-gray-400 px-3 py-3 font-semibold  text-Docy-Dark dark:text-white">
                            Upload Thumbnail
                          </span>
                        </p>
                      </div>
                    </div>
                    <input
                      className="hidden"
                      type="file"
                      name="thumbnail"
                      placeholder="upload"
                      onChange={uploadImage}
                    />
                  </label>
                </div>
                <small className=" text-red-600 ">Required*</small>
                {/* <FormHelperText sx={{ color: "red" }}>Required*</FormHelperText> */}
                <div>
                  <div className="pt-4">
                    <div>
                      {image && (
                        <img
                          className="mx-auto"
                          style={{ maxWidth: "100%" }}
                          src={image}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Text editor */}
            <div className="py-4">
              <h2 className="mb-2 text-xl text-Docy-Dark dark:text-white">
                Write your documentation or blog below 🌝
              </h2>
              <div className="bg-white text-black">
                <TextEditor setValue={setValue}></TextEditor>
              </div>
            </div>
            {/* <p>{value}</p>
            <div dangerouslySetInnerHTML={{ __html: value }} /> */}
            {/* Add Tags */}
            <div>
              <Tags allTags={allTags}></Tags>
            </div>
            <div className="mb-7 rounded-b-md bg-Docy-PaleGrey  dark:bg-Docy-DarkGray">
              <button
                onClick={() => handleUpload()}
                className="mb-6 rounded-lg bg-indigo-500 py-2 px-4 text-lg font-semibold text-white"
              >
                {/* <BackupIcon className="animate-bounce" /> */}
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogInfo;
