import React, { useState } from 'react';

const Tags = (props) => {
    const [tags, setTags] = useState([]);
    const addTag = (e) => {
      if (e.key === "Enter") {
        if (e.target.value.length > 0) {
          if (e.target.value === "" || tags.indexOf(e.target.value) !== -1) {
            e.target.value = "";
            return;
          }
          setTags([...tags, e.target.value]);
          props.allTags([...tags, e.target.value]);
          e.target.value = "";
        }
      }
      if (e.key === ",") {
        if (e.target.value.length > 0) {
          if (
            e.target.value === "" ||
            tags.indexOf(
              e.target.value.substring(0, e.target.value.length - 1)
            ) !== -1 ||
            e.target.value === ","
          ) {
            e.target.value = "";
            return;
          }
          setTags([
            ...tags,
            e.target.value.substring(0, e.target.value.length - 1),
          ]);
          props.allTags([
            ...tags,
            e.target.value.substring(0, e.target.value.length - 1),
          ]);
          e.target.value = "";
        }
      }
    };
    const removeTag = (removedTag) => {
      const newTags = tags.filter((tag) => tag !== removedTag);
      setTags(newTags);
      props.allTags(newTags);
    };
    return (
      <div>
        <div className="py-8">
          <h1 className="pb-3 text-2xl">
            Please enter some Tags...
          </h1>
          <small className="">
            Press comma or click the add button to create a tag.
          </small>
          <div>
            <input
              className="rounded-md border-2 p-3 text-base dark:border-0"
              placeholder="Enter tags . . ."
              style={{ minWidth: 280 }}
              onKeyUp={addTag}
            />
          </div>
          {/* Show tags  */}
          <div
            style={{ minHeight: "150px", maxWidth: "500px" }}
            className="tag-container my-2 flex flex-wrap rounded-lg bg-slate-200 p-4 dark:bg-Dark"
          >
            {tags.map((tag, index) => {
              return (
                <div
                  // style={{ backgroundColor: 'aliceblue' }}
                  key={index}
                  className="m-1 h-fit rounded-lg bg-slate-300 p-2  dark:bg-slate-600"
                >
                  {tag}{" "}
                  <span
                    className="cursor-pointer pl-1 text-xl font-bold"
                    onClick={() => removeTag(tag)}
                  >
                    ×
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
};

export default Tags;