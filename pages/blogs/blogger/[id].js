import React from 'react';
import BloggerMain from '../../../components/Blogger/BloggerMain/BloggerMain';
import authCheck from '../../../hook/authCheck';

const Id = () => {
    return (
        <div>
            <BloggerMain></BloggerMain>
        </div>
    );
};

export default authCheck(Id);