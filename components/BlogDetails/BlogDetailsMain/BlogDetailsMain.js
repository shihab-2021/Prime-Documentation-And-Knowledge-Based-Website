import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import BlogDetailsHeroSection from '../BlogDetailsHeroSection/BlogDetailsHeroSection';
import MainDetails from '../MainDetails/MainDetails';

const BlogDetailsMain = () => {
  // next js hooks for dynamic routuing
  const router = useRouter();
  const id = router?.query?.id;
  console.log(id);
  const [data, setData] = useState();
  useEffect(() => {
    fetch(`https://incognito-prime.herokuapp.com/blog/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  console.log(data);
  return (
    <div>
      <BlogDetailsHeroSection blog={data}></BlogDetailsHeroSection>
      <MainDetails blog={data}></MainDetails>
    </div>
  );
};

export default BlogDetailsMain;