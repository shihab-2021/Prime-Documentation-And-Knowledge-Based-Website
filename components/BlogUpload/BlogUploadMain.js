import { useRouter } from "next/router";
import React from "react";
import BlogInfo from "./BlogInfo/BlogInfo";
import HeadSection from "./HeadSection/HeadSection";

const BlogUploadMain = () => {
  // router nextjs hook for routing
  const router = useRouter();
  const uploadBlog = (blog) => {
    console.log(blog);
    fetch("https://prime-api-5jzf.onrender.com/blogs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          window.alert("Your blog have been submitted.");
          router.replace("/blogs");
        }
      });
  };
  return (
    <div>
      <HeadSection></HeadSection>
      <BlogInfo uploadBlog={uploadBlog}></BlogInfo>
    </div>
  );
};

export default BlogUploadMain;
