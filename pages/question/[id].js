import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import QDMain from '../../components/QuestionDetails/QDMain';

const Id = () => {
    const router = useRouter();
    const id = router?.query?.id;
    const [data, setData] = useState();
    useEffect(() => {
      if (id) {
        fetch(`https://incognito-prime.herokuapp.com/questions/${id}`)
          .then((res) => res.json())
          .then((data) => setData(data))
          .then((data) => console.log(data))
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        router.replace("/");
      }
    }, [id, !data]);
    console.log(data);
    return (
        <div>
            <QDMain data={data}></QDMain>
        </div>
    );
};

export default Id;