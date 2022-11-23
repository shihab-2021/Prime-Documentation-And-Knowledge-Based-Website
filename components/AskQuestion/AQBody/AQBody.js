import React, { useEffect, useState } from "react";
import Tags from "../../Shared/Tags/Tags";
import dynamic from "next/dynamic";
import useAuth from "../../../hook/useAuth";
import { useRouter } from "next/router";
const TextEditor = dynamic(() => import("../../Shared/TextEditor/TextEditor"), {
  ssr: false,
});

const AQBody = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [value, setValue] = useState("");
  const [tags, setTags] = useState([]);
  const [data, setData] = useState();
  const router = useRouter();

  useEffect(() => {
    fetch(`https://incognito-prime.herokuapp.com/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, [data, user?.email]);

  let time = new Date();
  const date = new Date().toLocaleDateString();
  const currentTime = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const questionTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };

  const allTags = (e) => {
    setTags(e);
  };

  const handleUpload = () => {
    console.log(title, categoryName, value, tags, currentTime, date);
    if (!title || !categoryName || !value || !tags[0]) {
      alert(
        "Title, Category selection, Documentation, Tags giving are required. If any of those missing you can not submit you blog or documentation. Please enter the data if anyone is missing. Thank you."
      );
      return;
    }
    const uploadData = {
      title: title,
      category: categoryName,
      documentation: value,
      tags: tags,
      uploadTime: currentTime,
      uploadDate: date,
      blogger: data,
      answers: [],
    };
    console.log(uploadData);
    // props.handleUpload(uploadData);
    fetch("https://incognito-prime.herokuapp.com/questions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(uploadData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          window.alert("Your question have been submitted.");
          router.replace("/ask");
        }
      });
  };
  return (
    <div>
      <div className="container px-4 mx-auto">
        <div className="my-6 rounded-md bg-slate-100 p-6 dark:bg-DarkGray">
          {/* Title and category section start */}
          <div>
            <div className="grid grid-cols-12 gap-6 pb-6">
              {/* Blog Title Input  */}
              <div className="col-span-12 md:col-span-6">
                <div>
                  <label htmlFor="title">Title</label>
                  <input
                    onBlur={questionTitle}
                    required
                    placeholder="Please enter a title"
                    className="h-14 w-full rounded-md border-2 p-3 text-lg"
                    type="text"
                  />
                </div>
              </div>
              {/* Category Selection Handling  */}
              <div className="col-span-12 md:col-span-6">
                <label htmlFor="category">Category</label>
                <select
                  value={categoryName}
                  onChange={handleChange}
                  className="h-14 w-full cursor-pointer rounded-lg border-2 p-3 text-lg"
                >
                  <option className="hidden">Select Category</option>
                  <option>Creative</option>
                  <option>Programming</option>
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
          </div>
          {/* Title and category section end */}
          {/* Text editor and tags section start */}
          <div>
            <div className="grid grid-cols-12 gap-4 pb-6">
              {/* TextEditor */}
              <div className="col-span-12 lg:col-span-8">
                <div className="py-4">
                  <h2 className="mb-2 text-sm text-gray-400">
                    Include all the information someone would need to answer
                    your question🌝
                  </h2>
                  <div className="bg-white text-black">
                    <TextEditor setValue={setValue}></TextEditor>
                  </div>
                </div>
              </div>
              {/* Tags Selection Handling  */}
              <div className="col-span-12 lg:col-span-4">
                <div>
                  <Tags allTags={allTags}></Tags>
                </div>
              </div>
            </div>
          </div>
          {/* Text editor and tags section end */}
          {/* Submit Start */}
          <div className="">
            <button
              onClick={() => handleUpload()}
              className="rounded-lg bg-indigo-500 py-2 px-4 text-lg font-semibold text-white"
            >
              Submit
            </button>
          </div>
          {/* Submit End */}
        </div>
      </div>
    </div>
  );
};

export default AQBody;
