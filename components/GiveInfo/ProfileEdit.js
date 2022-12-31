/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

const ProfileEdit = (props) => {
  const { data } = props;
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState(data?.image);
  const [startDate, setStartDate] = useState(data?.birthDate);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const imageFileDrop = async (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

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
    setImage(file.secure_url);
    setImageLoading(false);
  };

  // Save User Information
  const submitHandler = (info) => {
    const userInfo = {
      email: data?.email,
      ...info,
      birthDate: Date.parse(startDate),
      image: image,
    };
    if (
      (startDate && startDate !== data?.birthDate) ||
      image !== data?.image ||
      (userInfo?.address && userInfo?.address !== data?.address) ||
      (userInfo?.biography && userInfo?.biography !== data?.biography) ||
      (userInfo?.displayName && userInfo?.displayName !== data?.displayName) ||
      (userInfo?.gender && userInfo?.gender !== data?.gender) ||
      (userInfo?.profession && userInfo?.profession !== data?.profession) ||
      (userInfo?.website && userInfo?.website !== data?.website) ||
      (userInfo?.facebook && userInfo?.facebook !== data?.facebook) ||
      (userInfo?.twitter && userInfo?.twitter !== data?.twitter) ||
      (userInfo?.linkedin && userInfo?.linkedin !== data?.linkedin) ||
      (userInfo?.instagram && userInfo?.instagram !== data?.instagram)
    ) {
      fetch("https://prime-api-5jzf.onrender.com/profile-update", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            alert("Profile updated successfully !");
          }
        });
    } else {
      alert("You didn't make any changes yet to update the profile !");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        style={{
          boxShadow: "0 0 2rem 0 rgb(136 152 170 / 15%)",
        }}
        className="my-5 rounded bg-slate-200 dark:bg-darkBlue p-6 text-Dark dark:text-white"
      >
        <div className="grid grid-cols-12 gap-3">
          {/* Profile picture  */}
          <div className="col-span-12 flex justify-center md:col-span-6">
            <div
              className="mx-auto flex self-center overflow-hidden rounded-full border-2 border-white sm:mx-0"
              style={{ height: "150px", width: "150px" }}
            >
              <img
                style={{ height: "150px", width: "150px" }}
                className="mx-auto rounded-full border-2 border-white object-cover"
                src={image}
                alt=""
              />
            </div>
          </div>
          {/* Profile Photo Update Handling  */}
          <div className="col-span-12 flex flex-col md:col-span-6">
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
                          style={{ height: "50px", width: "50px" }}
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
                          style={{ height: "50px", width: "50px" }}
                          src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                          alt=""
                        />
                        <p className="text-md text-gray-400">
                          Drag & Drop your profile photo
                        </p>
                      </div>
                    )}
                    <p className="py-4">
                      <span className="rounded-lg bg-gray-400 px-2 py-2 font-semibold  text-Docy-Dark dark:text-white">
                        Browse File
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
            {/* <small className=" text-red-600 ">Required*</small> */}
            {/* <FormHelperText sx={{ color: "red" }}>Required*</FormHelperText> */}
            {/* <div>
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
                </div> */}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 py-2">
          <div className="col-span-12 flex flex-col  md:col-span-6">
            <label htmlFor="displayName">Name</label>
            <input
              name="displayName"
              // onBlur={blogTitle}
              defaultValue={data?.displayName}
              required
              placeholder="Please enter your blog or documentation title"
              className="h-14 w-full rounded-md border-2 p-3 text-lg"
              type="text"
              {...register("displayName")}
            />
          </div>
          <div className="col-span-12 flex flex-col  md:col-span-6">
            <label htmlFor="title">Date of Birth</label>
            <DatePicker
              className="h-14 w-full rounded-md border-2 p-3 text-lg"
              selected={startDate}
              onChange={(date, Date) => {
                setStartDate(date);
                console.log(Date);
                console.log(date);
              }}
            />
          </div>
          <div className="col-span-12 flex flex-col  md:col-span-6">
            <label htmlFor="profession">Profession</label>
            <input
              className="rounded-md border p-2 text-lg"
              type="text"
              name="profession"
              {...register("profession")}
              defaultValue={data?.profession}
            />
          </div>
          <div className="col-span-12 flex flex-col  md:col-span-6">
            <label htmlFor="gender">Gender</label>
            <input
              className="rounded-md border p-2 text-lg"
              type="text"
              name="gender"
              {...register("gender")}
              defaultValue={data?.gender}
            />
          </div>
          <div className="col-span-12 flex flex-col  md:col-span-6">
            <label htmlFor="address">Address</label>
            <input
              className="rounded-md border p-2 text-lg"
              type="text"
              name="address"
              {...register("address")}
              defaultValue={data?.address}
            />
          </div>
          <div className="col-span-12 flex flex-col  md:col-span-6">
            <label htmlFor="website">Website</label>
            <input
              className="rounded-md border p-2 text-lg"
              type="text"
              name="website"
              {...register("website")}
              defaultValue={data?.website}
            />
          </div>
          <div className="col-span-12 flex flex-col  md:col-span-6">
            <label htmlFor="facebook">Facebook</label>
            <input
              className="rounded-md border p-2 text-lg"
              type="text"
              name="facebook"
              {...register("facebook")}
              defaultValue={data?.facebook}
            />
          </div>
          <div className="col-span-12 flex flex-col  md:col-span-6">
            <label htmlFor="twitter">Twitter</label>
            <input
              className="rounded-md border p-2 text-lg"
              type="text"
              name="twitter"
              {...register("twitter")}
              defaultValue={data?.twitter}
            />
          </div>
          <div className="col-span-12 flex flex-col  md:col-span-6">
            <label htmlFor="linkedin">Linkedin</label>
            <input
              className="rounded-md border p-2 text-lg"
              type="text"
              name="linkedin"
              {...register("linkedin")}
              defaultValue={data?.linkedin}
            />
          </div>
          <div className="col-span-12 flex flex-col  md:col-span-6">
            <label htmlFor="instagram">Instagram</label>
            <input
              className="rounded-md border p-2 text-lg"
              type="text"
              name="instagram"
              {...register("instagram")}
              defaultValue={data?.instagram}
            />
          </div>
        </div>
        <div className="pt-3">
          <label htmlFor="biography">Biography</label>
          <textarea
            name="biography"
            {...register("biography")}
            id=""
            className="w-full rounded-md border p-2 text-lg"
            rows="5"
            defaultValue={data?.biography}
          ></textarea>
        </div>
        <span className="">
          <input
            type="submit"
            className=" mt-5 rounded-lg bg-indigo-500 px-6 py-3 text-lg font-semibold text-white"
            value="Save changes"
          />
        </span>
      </form>
    </div>
  );
};

export default ProfileEdit;
