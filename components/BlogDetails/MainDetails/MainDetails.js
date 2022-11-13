import React from 'react';

const MainDetails = (props) => {
    const {blog} = props
    return (
      <div>
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-12 gap-6 py-8">
            {/* Main blog details start */}
            <div className="col-span-12 md:col-span-12 lg:col-span-8">
              {blog?.video && <video src={blog?.video} controls></video>}
              {/* Main documentation start */}
              <div
                id="documentation"
                dangerouslySetInnerHTML={{
                  __html: `${blog?.documentation}`,
                }}
              ></div>
              {/* Main documentation end */}
            </div>
            {/* Main blog details end */}
          </div>
        </div>
      </div>
    );
};

export default MainDetails;