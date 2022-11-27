import JoditEditor from "jodit-react";
import React, { useRef } from "react";

const TextEditor = ({ setValue }) => {
  const editor = useRef(null);
  return (
    <div>
      <JoditEditor ref={editor} onChange={(content) => setValue(content)} />
    </div>
  );
};

export default TextEditor;
