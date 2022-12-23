import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import QDBody from "./QDBody/QDBody";
import QDHeroSection from "./QDHeroSection/QDHeroSection";

const QDMain = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const [answered, setAnswered] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    if (id) {
      fetch(`https://prime-api-5jzf.onrender.com/questions/${id}`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .then(() => console.log(id))
        .then(() => console.log(data))
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      router.replace("/");
    }
  }, [id, !data, answered]);

  const submitAnswer = async (payload) => {
    setAnswered(false);
    fetch(`https://prime-api-5jzf.onrender.com/question/${data?._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.acknowledged) {
          alert("Answer added!");
        }
      })
      .catch((e) => console.log(e));
    if (id) {
      fetch(`https://prime-api-5jzf.onrender.com/questions/${id}`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .then(() => setAnswered(true))
        .then((data) => console.log(data))
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      router.replace("/");
    }
    // reset();
    console.log(payload);
  };
  return (
    <div>
      <QDHeroSection question={data}></QDHeroSection>
      <QDBody
        answered={answered}
        question={data}
        submitAnswer={submitAnswer}
      ></QDBody>
    </div>
  );
};

export default QDMain;
