import BlogUploadMain from "../components/BlogUpload/BlogUploadMain";
import authCheck from "../hook/authCheck";


const blogUpload = () => {
    return (
        <div>
            <BlogUploadMain></BlogUploadMain>
        </div>
    );
};

export default authCheck(blogUpload);