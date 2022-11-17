import React from 'react';
import BlogDetailsMain from '../../../components/BlogDetails/BlogDetailsMain/BlogDetailsMain';
import authCheck from '../../../hook/authCheck';

const Id = () => {
    return (
        <div>
            <BlogDetailsMain></BlogDetailsMain>
        </div>
    );
};

export default authCheck(Id);