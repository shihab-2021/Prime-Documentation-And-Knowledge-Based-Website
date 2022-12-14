import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BloggerHeroSection from "../BloggerHeroSecton/BloggerHeroSection";
import BloggerInfo from "../BloggerInfo/BloggerInfo";

const BloggerMain = () => {
  // next js hooks for dynamic routing
  const router = useRouter();
  const id = router?.query?.id;
  const [data, setData] = useState();
  useEffect(() => {
    if (id) {
      fetch(`https://prime-api-5jzf.onrender.com/blogger/${id}`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      router.replace("/");
    }
  }, [id]);
  return (
    <div>
      <BloggerHeroSection></BloggerHeroSection>
      <BloggerInfo data={data}></BloggerInfo>
    </div>
  );
};

export default BloggerMain;
