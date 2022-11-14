import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useAuth from "../../../hook/useAuth";
import BlogDetailsHeroSection from "../BlogDetailsHeroSection/BlogDetailsHeroSection";
import MainDetails from "../MainDetails/MainDetails";

const BlogDetailsMain = () => {
  const { user } = useAuth()
  const [comment, setComment] = useState(false)
  // next js hooks for dynamic routing
  const router = useRouter();
  const id = router?.query?.id;
  const [data, setData] = useState();
  useEffect(() => {
    if (id){
      fetch(`https://incognito-prime.herokuapp.com/blog/${id}`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => {
          console.log(error.message);
        });
    }
    else{
      router.replace('/')
    }
  }, [id, router, comment]);

  const addComment = (payload) => {
    if (user?.email) {
      fetch(`https://incognito-prime.herokuapp.com/blog/${data?._id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((result) => {})
        .catch((e) => console.log("Something went wrong !"));
      setComment(true)
      console.log(comment);
      alert("Comment added!");
      console.log("loading....");
      if (id) {
        fetch(`https://incognito-prime.herokuapp.com/blog/${id}`)
          .then((res) => res.json())
          .then((data) => setData(data))
          .then(() => setComment(false))
          .catch((error) => {
            console.log(error.message);
          });
        
      }
      // reset();
    } else {
      return alert("Go and login to comment !");
    }
  }
  return (
    <div>
      <BlogDetailsHeroSection blog={data}></BlogDetailsHeroSection>
      <MainDetails blog={data} addComment={addComment} comment={comment}></MainDetails>
    </div>
  );
};

export default BlogDetailsMain;
