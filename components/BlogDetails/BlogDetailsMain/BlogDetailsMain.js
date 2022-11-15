import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useAuth from "../../../hook/useAuth";
import Loading from "../../Shared/Loading/Loading";
import BlogDetailsHeroSection from "../BlogDetailsHeroSection/BlogDetailsHeroSection";
import MainDetails from "../MainDetails/MainDetails";

const BlogDetailsMain = () => {
  const { user } = useAuth();
  const [comment, setComment] = useState(false);
  const [report, setReport] = useState(false);
  // next js hooks for dynamic routing
  const router = useRouter();
  const id = router?.query?.id;
  const [data, setData] = useState();
  useEffect(() => {
    if (id) {
      fetch(`https://incognito-prime.herokuapp.com/blog/${id}`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      router.replace("/");
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
      setComment(true);
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
  };

  const addReport = (payload) => {
    setReport(true);
    if (user?.email) {
      fetch(
        `https://incognito-prime.herokuapp.com/blog/${data?._id}/reportBlog`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        }
      )
        .then(() => setReport(false))
        .then((res) => res.json())
        .then((result) => {
          if (result?.acknowledged) {
            alert("Reported successfully");
            console.log(result);
          }
        })
        .catch((e) => console.log(e.message));
      if (id) {
        fetch(`https://incognito-prime.herokuapp.com/blog/${id}`)
          .then((res) => res.json())
          .then((data) => setData(data))
          .then(() => setReport(false))
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        return alert("Go and login to comment !");
      }
    }
  };
  return (
    <div>
      {!data && <div className=" py-96"><Loading></Loading></div>}
      {data && (
        <div>
          <BlogDetailsHeroSection blog={data}></BlogDetailsHeroSection>
          <MainDetails
            blog={data}
            addComment={addComment}
            comment={comment}
            addReport={addReport}
            report={report}
          ></MainDetails>
        </div>
      )}
    </div>
  );
};

export default BlogDetailsMain;
